/**
 * Kontaktformular, Serverroute. Kopieren nach src/pages/api/kontakt.ts.
 *
 * Reihenfolge: Konfiguration, Origin, Honigtopf, Zeitfeld, Turnstile, Validierung,
 * Rate Limit, optional speichern, Mails.
 *
 * Ohne bestaetigtes Leadsystem wird NICHT gespeichert.
 *
 * Das Honigtopffeld heisst bewusst "webadresse" und nicht "firma": ein Honigtopf mit dem
 * Namen eines echten optionalen Feldes verwirft irgendwann eine echte Anfrage, und niemand
 * merkt es, weil die Route mit Erfolg antwortet.
 */
import type { APIRoute } from 'astro';
import { interneMail, bestaetigungsMail } from '../../lib/mail-template';

export const prerender = false;

type Eingabe = {
  name: string;
  email: string;
  telefon?: string;
  nachricht?: string;
  datenschutz?: string;
  webadresse?: string; // Honigtopf
  ts?: string;         // Zeitfeld
};

const KONTAKTWEG = 'Bitte melde dich telefonisch oder per Mail bei uns.';

const trimmen = (wert: unknown, max: number) => String(wert ?? '').trim().slice(0, max);

export const POST: APIRoute = async ({ request, locals, clientAddress, site }) => {
  const env = (locals as any).runtime?.env ?? import.meta.env;

  // 0. Konfiguration. Eine fehlende Variable darf keinen leeren 500er erzeugen.
  for (const name of ['RESEND_API_KEY', 'MAIL_FROM', 'MAIL_TO'] as const) {
    if (!env[name]) {
      console.error(`Umgebungsvariable ${name} fehlt`);
      return antwort(503, { fehler: `Das Formular ist gerade nicht erreichbar. ${KONTAKTWEG}` });
    }
  }

  // 1. Origin. Astros Schutz gegen Cross-Site-Anfragen greift in Pages Functions nicht.
  if (!herkunftErlaubt(request, site)) return antwort(403, { fehler: 'Ungültige Herkunft' });

  let daten: Eingabe;
  try {
    const form = await request.formData();
    daten = Object.fromEntries(form) as Eingabe;
  } catch {
    return antwort(400, { fehler: 'Ungültige Anfrage' });
  }

  // 2. Honigtopf: gefuellt bedeutet Bot. Erfolg vortaeuschen, nichts tun.
  if (daten.webadresse) return antwort(200, { ok: true });

  // 3. Zu schnell abgeschickt. Ohne JavaScript bleibt ts leer, dann nicht pruefen.
  if (daten.ts && Date.now() - Number(daten.ts) < 2000) return antwort(200, { ok: true });

  // 4. Turnstile
  const token = (daten as any)['cf-turnstile-response'];
  if (!(await turnstileGueltig(token, env.TURNSTILE_SECRET_KEY, clientAddress))) {
    return antwort(400, { fehler: 'Die Sicherheitsprüfung ist fehlgeschlagen. Bitte lade die Seite neu.' });
  }

  // 5. Validierung, serverseitig und unabhaengig vom Browser
  const name = trimmen(daten.name, 120);
  const email = trimmen(daten.email, 180);
  const telefon = trimmen(daten.telefon, 40);
  const nachricht = trimmen(daten.nachricht, 5000);

  const felder: Record<string, string> = {};
  if (name.length < 2) felder.name = 'Bitte gib deinen Namen an.';
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) felder.email = 'Bitte prüfe die E-Mail-Adresse.';
  if (telefon && !/^[0-9+()\/\s.-]{5,40}$/.test(telefon)) felder.telefon = 'Bitte prüfe die Telefonnummer.';
  if (!daten.datenschutz) felder.datenschutz = 'Bitte stimme der Datenschutzerklärung zu.';
  if (Object.keys(felder).length) return antwort(422, { felder });

  // 6. Rate Limit ueber KV, Binding RATE_LIMIT. Der Schluessel laeuft ab, er wird nicht gespeichert.
  if (env.RATE_LIMIT) {
    const schluessel = `kontakt:${clientAddress}`;
    const anzahl = Number((await env.RATE_LIMIT.get(schluessel)) || 0);
    if (anzahl >= 5) return antwort(429, { fehler: 'Zu viele Anfragen. Bitte versuche es in einigen Minuten erneut.' });
    await env.RATE_LIMIT.put(schluessel, String(anzahl + 1), { expirationTtl: 600 });
  }

  const herkunft = new URL(request.url).searchParams.get('von') || request.headers.get('referer') || '';

  // 7. Nur bei bestaetigtem Leadsystem: hier zuerst in D1 speichern.
  //    Fehler beim Speichern nicht zum Abbruch fuehren lassen, Mails trotzdem senden.

  // 8. Mails. Die Bestaetigung an den Interessenten ist Standard, nicht Zusatz.
  try {
    await Promise.all([
      resendSenden(env, {
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        reply_to: email,
        subject: `Neue Anfrage über die Website: ${name}`,
        html: interneMail({ name, email, telefon, nachricht, herkunft, zeit: new Date().toLocaleString('de-DE') }),
      }),
      resendSenden(env, {
        from: env.MAIL_FROM,
        to: email,
        subject: 'Deine Anfrage ist angekommen',
        html: bestaetigungsMail({ name }),
      }),
    ]);
  } catch (fehler) {
    console.error('Mailversand fehlgeschlagen', fehler);
    return antwort(502, { fehler: `Die Anfrage konnte nicht versendet werden. ${KONTAKTWEG}` });
  }

  return antwort(200, { ok: true });
};

function antwort(status: number, koerper: unknown) {
  return new Response(JSON.stringify(koerper), { status, headers: { 'content-type': 'application/json' } });
}

/** Origin oder Referer muessen zur eigenen Domain gehoeren. */
function herkunftErlaubt(request: Request, site: URL | undefined) {
  const eigene = new Set([new URL(request.url).host]);
  if (site) eigene.add(site.host);

  const quelle = request.headers.get('origin') ?? request.headers.get('referer');
  if (!quelle) return false; // ein Browserformular sendet immer eines von beiden
  try {
    return eigene.has(new URL(quelle).host);
  } catch {
    return false;
  }
}

/**
 * Turnstile serverseitig pruefen. Fehlt das Geheimnis, wird nur in der lokalen Entwicklung
 * durchgelassen. In der Produktion faellt die Pruefung zu, statt still zu oeffnen.
 */
async function turnstileGueltig(token: string | undefined, geheim: string | undefined, ip?: string) {
  if (!geheim) {
    if (import.meta.env.DEV) return true;
    console.error('TURNSTILE_SECRET_KEY fehlt, Anfrage abgewiesen');
    return false;
  }
  if (!token) return false;

  const pruefung = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret: geheim, response: token, remoteip: ip }),
  });
  const ergebnis = (await pruefung.json()) as { success: boolean };
  return ergebnis.success === true;
}

async function resendSenden(env: any, nachricht: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify(nachricht),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}
