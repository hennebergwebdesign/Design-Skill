/**
 * Meta Conversions API: Lead-Ereignis vom Server, passend zu tracking-client.ts.
 * Kopieren nach src/lib/meta-capi.ts und aus der Formularroute aufrufen (Ausschnitt unten).
 *
 * Herkunft: abgeleitet aus dem Projekt Gewerbestrom (Wehbe Group), dort live, gegen die echte API
 * geprüft (events_received: 1). Hier ohne Kundendaten und ohne Datenbankanteil. Die Vorlage selbst
 * ist in diesem Repository nicht gegen Meta gelaufen.
 *
 * Was dieses Modul erzwingt:
 *  1. Ohne Einwilligung geht kein personenbezogenes Ereignis raus. Serverseitig heißt nicht
 *     einwilligungsfrei: dieselbe Entscheidung gilt für Browser und Server.
 *  2. Die event_id des Browsers wird übernommen, daran dedupliziert Meta.
 *  3. Personenbezogene Merkmale werden vor dem Versand SHA-256-gehasht, in dem Format, das Meta
 *     verlangt (Telefon nur Ziffern mit Ländervorwahl, Name klein geschrieben). Meta normalisiert
 *     nichts nach: ein falsches Format hasht sauber durch und findet nie einen Treffer.
 *  4. Der Testcode wirkt nur bei test_mode. So darf META_TEST_EVENT_CODE dauerhaft gesetzt bleiben,
 *     ohne dass echte Anfragen im Testkanal verschwinden und nirgends als Conversion zählen.
 *  5. Das Log sagt immer, was passiert ist: gesendet, abgelehnt, übersprungen mit Grund.
 *
 * Umgebung (Cloudflare Pages):
 *   META_PIXEL_ID          Variable, die ID ist öffentlich
 *   META_CAPI_TOKEN        Geheimnis, `wrangler pages secret put META_CAPI_TOKEN`, wirkt erst nach
 *                          dem nächsten Deployment. Nie mit PUBLIC_ benennen.
 *   META_TEST_EVENT_CODE   optional, aus dem Events Manager, Reiter Testereignisse
 *   META_ANON_SIGNAL       "on" schaltet die Zählmeldung ohne Einwilligung ein. Standard: aus.
 *                          Das ist eine Entscheidung des Kunden mit Datenschutztext, siehe
 *                          references/tracking-einbauen.md, Abschnitt 6.
 */

export type LeadDaten = {
  name: string;
  email: string;
  phone: string;
  // aus tracking-client.ts, trackingFelder()
  event_id?: string;
  fbp?: string;
  fbc?: string;
  external_id?: string;
  page?: string;
  marketing_consent?: boolean;
  test_mode?: boolean;
  // Inhalt des Ereignisses
  content_name?: string;     // je Kampagne verschieden, damit Custom Conversions sie trennen können
  content_category?: string;
};

// Die Graph API wird versioniert und alte Versionen laufen aus. Vor dem Einsatz die aktuelle
// Version in der Dokumentation von Meta prüfen. Gewerbestrom lief mit v21.0.
const GRAPH = 'https://graph.facebook.com/v21.0';

export async function sha256(wert: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(wert));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** "0151 / 234 56 78" wird "491512345678". Nur für Deutschland als Vorgabe, andere Länder ergänzen. */
export function telefonNormalisieren(roh: string): string {
  let ziffern = String(roh || '').replace(/\D/g, '');
  if (!ziffern) return '';
  if (ziffern.startsWith('00')) ziffern = ziffern.slice(2);
  else if (ziffern.startsWith('0')) ziffern = '49' + ziffern.slice(1);
  return ziffern;
}

function namenTeilen(roh: string): { vor: string; nach: string } {
  const teile = String(roh || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  return { vor: teile[0] ?? '', nach: teile.length > 1 ? teile[teile.length - 1] : '' };
}

/** Adresse ohne Query und Fragment: die Anzeigenadresse trägt das fbclid. */
function ohneQuery(seite?: string): string | undefined {
  if (!seite) return undefined;
  try { const u = new URL(seite); return u.origin + u.pathname; } catch { return undefined; }
}

export async function sendeLead(env: Record<string, string | undefined>, lead: LeadDaten, request: Request): Promise<void> {
  if (!env.META_PIXEL_ID || !env.META_CAPI_TOKEN) {
    const fehlt = [env.META_PIXEL_ID ? '' : 'META_PIXEL_ID', env.META_CAPI_TOKEN ? '' : 'META_CAPI_TOKEN'].filter(Boolean).join(' + ');
    console.warn(`Meta CAPI übersprungen: ${fehlt} fehlt in der Umgebung.`);
    return;
  }
  const testcode = lead.test_mode ? env.META_TEST_EVENT_CODE || undefined : undefined;
  const url = `${GRAPH}/${env.META_PIXEL_ID}/events?access_token=${env.META_CAPI_TOKEN}`;

  if (!lead.marketing_consent) {
    // Ohne Einwilligung kein personenbezogenes Ereignis. Optional nur die Zählmeldung.
    if (String(env.META_ANON_SIGNAL || '').toLowerCase() !== 'on') {
      console.log('Meta CAPI übersprungen: keine Marketing-Einwilligung.');
      return;
    }
    return zaehlmeldung(url, lead, testcode);
  }

  try {
    const { vor, nach } = namenTeilen(lead.name);
    const [em, ph, fn, ln, ext] = await Promise.all([
      sha256(lead.email.toLowerCase()),
      sha256(telefonNormalisieren(lead.phone)),
      vor ? sha256(vor) : Promise.resolve(''),
      nach ? sha256(nach) : Promise.resolve(''),
      // Derselbe Rohwert, den tracking-client.ts dem Pixel als external_id gibt.
      lead.external_id ? sha256(lead.external_id.toLowerCase()) : Promise.resolve(''),
    ]);
    const user_data: Record<string, unknown> = {
      em: [em], ph: [ph],
      client_ip_address: request.headers.get('CF-Connecting-IP') || undefined,
      client_user_agent: request.headers.get('User-Agent') || undefined,
    };
    if (fn) user_data.fn = [fn];
    if (ln) user_data.ln = [ln];
    if (ext) user_data.external_id = [ext];
    if (lead.fbp) user_data.fbp = lead.fbp;
    if (lead.fbc) user_data.fbc = lead.fbc;
    // Ort, Postleitzahl und Land werden bewusst nicht mitgeschickt, wenn das Formular keine
    // verlässlichen Werte liefert: ein geratener Wert hasht sauber durch und senkt die Trefferquote.

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: lead.event_id || undefined,
          action_source: 'website',
          event_source_url: lead.page || request.headers.get('Referer') || undefined,
          user_data,
          custom_data: { content_name: lead.content_name, content_category: lead.content_category },
        }],
        test_event_code: testcode,
      }),
    });
    if (!res.ok) {
      // Der Fehlertext von Meta nennt das konkrete Feld, ohne ihn sucht man blind.
      console.error('Meta CAPI abgelehnt:', res.status, (await res.text()).slice(0, 500));
      return;
    }
    const antwort = (await res.json().catch(() => null)) as { events_received?: number; fbtrace_id?: string } | null;
    console.log('Meta CAPI ok:', JSON.stringify({ events_received: antwort?.events_received, fbtrace_id: antwort?.fbtrace_id, testkanal: !!testcode }));
  } catch (fehler) {
    console.error('Meta CAPI fehlgeschlagen:', (fehler as Error).message);
  }
}

/**
 * Zählmeldung ohne Einwilligung: meldet nur, DASS eine Anfrage einging. Enthalten ist ausschließlich
 * das gehashte Land, der eine Parameter, den Metas API für ein Website-Ereignis zwingend verlangt.
 * Nicht enthalten: IP, User Agent, Name, Mail, Telefon, fbp, fbc, external_id, Query der Adresse.
 * Sie lässt sich keiner Kampagne zuordnen. Die Herkunft kommt aus der eigenen Datenbank.
 * Ob diese Meldung ohne Einwilligung zulässig ist, ist eine rechtliche Frage, die dieses Repository
 * nicht beantwortet. Standard ist deshalb aus.
 */
async function zaehlmeldung(url: string, lead: LeadDaten, testcode?: string) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: lead.event_id || undefined,
          action_source: 'website',
          event_source_url: ohneQuery(lead.page),
          user_data: { country: [await sha256('de')] },
          custom_data: { content_name: lead.content_name, consent_state: 'denied' },
        }],
        test_event_code: testcode,
      }),
    });
    if (!res.ok) { console.error('Meta Zählmeldung abgelehnt:', res.status, (await res.text()).slice(0, 500)); return; }
    console.log('Meta Zählmeldung ok (ohne Einwilligung, nicht zuordenbar).');
  } catch (fehler) {
    console.error('Meta Zählmeldung fehlgeschlagen:', (fehler as Error).message);
  }
}

/* ------------------------------------------------------------------------------------------
   Einbau in die Formularroute (assets/forms/kontakt-route.ts), nach dem Speichern des Leads.
   Nicht blockierend, ein Fehler bei Meta darf nie eine Anfrage kosten. Bei einer Dublette
   (gleiche Mail oder Telefonnummer in den letzten 30 Tagen) kein zweites Ereignis.

     const daten = await request.json();                  // oder formData(), je nach Route
     const dublette = await findeDublette(env, daten.email, daten.phone);  // eigene Funktion
     if (!dublette) {
       const senden = sendeLead(env, {
         name: daten.name, email: daten.email, phone: daten.phone,
         event_id: String(daten.event_id || '').slice(0, 100),
         fbp: String(daten.fbp || '').slice(0, 200),
         fbc: String(daten.fbc || '').slice(0, 400),
         external_id: String(daten.external_id || '').slice(0, 100),
         page: String(daten.page || '').slice(0, 500),
         // Dem Client wird hier bewusst vertraut: nur er kennt die Auswahl (localStorage).
         marketing_consent: daten.marketing_consent === true,
         test_mode: daten.test_mode === true,
         content_name: 'Kontaktanfrage Beispielkampagne',   // je Kampagne anpassen
       }, request);
       (locals as any).runtime?.ctx?.waitUntil(senden);
     }
     return new Response(JSON.stringify({ ok: true, duplicate: !!dublette }), { status: 201 });
   ------------------------------------------------------------------------------------------ */
