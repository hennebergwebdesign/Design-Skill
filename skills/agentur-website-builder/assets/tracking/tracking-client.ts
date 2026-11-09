/**
 * Tracking im Browser: Meta Pixel und Google Analytics 4, ausschließlich nach Einwilligung.
 * Kopieren nach src/scripts/tracking.ts. Setzt assets/consent/consent.ts voraus (Kategorien
 * `marketing` und `statistik`, Ereignis `consent:geaendert`).
 *
 * Herkunft: abgeleitet aus dem Projekt Gewerbestrom (Wehbe Group), dort live und mit Playwright
 * gemessen. Hier an den Consent Manager der Agentur angepasst und ohne Kundendaten. Die Vorlage
 * selbst ist in diesem Repository gegen keinen Pixel und keinen Browser gelaufen.
 *
 * Die vier Regeln, die dieses Modul trägt (Begründung in references/tracking-einbauen.md):
 *  1. Vor der Einwilligung wird kein Skript geladen und nichts auf dem Gerät abgelegt, auch das
 *     fbclid der Adresse nicht. Der Browser sendet nichts an Meta oder Google.
 *  2. Eine Bewerbung hat genau eine event_id. Browser und Server melden mit derselben, sonst
 *     zählt Meta jede Bewerbung doppelt.
 *  3. Das Lead-Ereignis feuert erst, wenn der Server die Anfrage gespeichert hat.
 *  4. Beim Widerruf verschwinden die Kennungen wieder.
 *
 * Einbinden: einmal im Layout, nach dem Consent Manager.
 *   <script>import { initTracking } from '../scripts/tracking'; initTracking();</script>
 * Im Formular: trackingFelder() beim Absenden mitschicken, meldeLead(id) nach dem Erfolg.
 */

import { lesen } from './consent';

const PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined;
const GA4_ID = import.meta.env.PUBLIC_GA4_ID as string | undefined;

const VID_KEY = 'tracking_vid';
const COOKIE_TAGE = 90; // dieselbe Frist, die fbevents.js selbst verwendet

type FbqFn = (...argumente: unknown[]) => void;
type Fenster = Window & { fbq?: FbqFn; _fbq?: FbqFn; dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
const w = window as Fenster;

/* ---------- Herkunft der Anzeige: nur im Arbeitsspeicher ---------- */

/*
 * Das fbclid steht in der Adresse und bleibt dort. Es wird gelesen, im Speicher gehalten und beim
 * Absenden mitgesendet, aber nicht in sessionStorage oder in eine Cookie geschrieben, solange keine
 * Einwilligung vorliegt. UTM-Parameter ebenso: wer sie über mehrere Seiten tragen muss, braucht
 * dafür eine Entscheidung (technisch notwendig oder Einwilligung), nicht eine Gewohnheit.
 */
const herkunft = { utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', fbclid: '' };
try {
  const p = new URLSearchParams(location.search);
  (Object.keys(herkunft) as (keyof typeof herkunft)[]).forEach((k) => { herkunft[k] = (p.get(k) || '').slice(0, 200); });
} catch { /* ohne URLSearchParams eben ohne Herkunft */ }

/** Testkanal im Events Manager: nur bei ?wg_test=1, damit echte Anfragen nie dort landen. */
let testModus = false;
try {
  if (new URLSearchParams(location.search).get('wg_test') === '1') {
    testModus = true;
    sessionStorage.setItem('tracking_test', '1'); // reine Entwicklerfunktion, keine Besucherdaten
  } else {
    testModus = sessionStorage.getItem('tracking_test') === '1';
  }
} catch { /* ohne sessionStorage gilt nur der aktuelle Aufruf */ }

/* ---------- Cookies und Kennungen ---------- */

function cookieLesen(name: string): string {
  try {
    const treffer = document.cookie.split('; ').find((teil) => teil.startsWith(name + '='));
    return treffer ? decodeURIComponent(treffer.slice(name.length + 1)) : '';
  } catch { return ''; }
}

/*
 * Cookie-Domain eine Ebene über dem Host, wie Meta es selbst tut. Host-only gesetzt lägen unsere
 * und die von fbevents geschriebene Cookie nebeneinander, und welche gelesen wird, wäre Zufall.
 * Grenze: slice(-2) trifft .de, .at, .ch. Bei Endungen wie .co.uk wäre das falsch.
 */
function cookieDomain(): string {
  const host = location.hostname;
  if (!host.includes('.') || /^[\d.]+$/.test(host)) return ''; // localhost und IP-Adressen
  return '; domain=.' + host.split('.').slice(-2).join('.');
}

function cookieSchreiben(name: string, wert: string, tage: number) {
  try {
    document.cookie = `${name}=${encodeURIComponent(wert)}; max-age=${tage * 86400}; path=/${cookieDomain()}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  } catch { /* Cookies gesperrt: die Serverseite läuft ohne Browserkennung weiter */ }
}

function zufallsziffern(): string {
  try { const b = new Uint32Array(1); crypto.getRandomValues(b); return String(b[0]); }
  catch { return String(Math.floor(Math.random() * 4294967295)); }
}

function besucherId(anlegen: boolean): string {
  try {
    let id = localStorage.getItem(VID_KEY) || '';
    if (!id && anlegen) {
      id = crypto.randomUUID ? crypto.randomUUID() : 'v-' + Date.now().toString(36) + '-' + zufallsziffern();
      localStorage.setItem(VID_KEY, id);
    }
    return id;
  } catch { return ''; }
}

/**
 * Drei Kennungen entscheiden, ob Meta ein Lead-Ereignis jemandem zuordnen kann:
 *   _fbp  Browserkennung, setzt sonst nur fbevents.js (fehlt bei geblocktem Pixel)
 *   _fbc  Klickkennung aus dem fbclid (fehlt, weil der Pixel erst nach der Zustimmung lädt)
 *   vid   eigene, gleichbleibende Besucherkennung, geht als external_id mit
 * Muss VOR ladeMeta() laufen: fbevents übernimmt vorhandene Cookies, statt eigene zu schreiben.
 * Format der beiden Meta Cookies gibt Meta vor: fb.1.<Zeitstempel in ms>.<Wert>
 */
function kennungenAnlegen() {
  if (!cookieLesen('_fbc') && herkunft.fbclid) cookieSchreiben('_fbc', `fb.1.${Date.now()}.${herkunft.fbclid}`, COOKIE_TAGE);
  if (!cookieLesen('_fbp')) cookieSchreiben('_fbp', `fb.1.${Date.now()}.${zufallsziffern()}`, COOKIE_TAGE);
  besucherId(true);
}

/** Widerruf: die Kennungen wieder entfernen. Eine Kennung ohne Rechtsgrundlage bleibt nie liegen. */
function kennungenLoeschen() {
  for (const name of ['_fbp', '_fbc']) {
    if (!cookieLesen(name)) continue;
    cookieSchreiben(name, '', -1);
    try { document.cookie = `${name}=; max-age=0; path=/`; } catch { /* nichts zu löschen */ }
  }
  try { localStorage.removeItem(VID_KEY); } catch { /* nicht verfügbar */ }
}

/** GA setzt _ga und _ga_<Property>, deshalb über das Präfix löschen statt über eine feste Liste. */
function analyseKennungenLoeschen() {
  let namen: string[] = [];
  try { namen = document.cookie.split('; ').map((t) => t.split('=')[0]); } catch { return; }
  for (const name of namen.filter((n) => n.startsWith('_ga') || n.startsWith('_gid'))) {
    cookieSchreiben(name, '', -1);
    try { document.cookie = `${name}=; max-age=0; path=/`; } catch { /* nichts zu löschen */ }
  }
}

/* ---------- Skripte laden, nur nach Einwilligung ---------- */

let metaGeladen = false;
function ladeMeta() {
  if (metaGeladen || !PIXEL_ID) return;
  metaGeladen = true;
  if (!w.fbq) {
    const fbq: FbqFn & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown; callMethod?: FbqFn } =
      function (...a: unknown[]) { (fbq.callMethod ? fbq.callMethod(...a) : fbq.queue!.push(a)); } as never;
    fbq.queue = []; fbq.loaded = true; fbq.version = '2.0'; fbq.push = fbq;
    w.fbq = fbq; w._fbq = fbq;
    const s = document.createElement('script');
    s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
  }
  const vid = besucherId(false);
  // Advanced Matching: die Besucherkennung hängt so an jedem Ereignis. fbevents hasht sie selbst,
  // die Serverseite hasht denselben Rohwert (meta-capi.ts), sonst passen beide Wege nicht zusammen.
  w.fbq!('init', PIXEL_ID, vid ? { external_id: vid } : {});
  w.fbq!('track', 'PageView');
}

let ga4Geladen = false;
function ladeGa4() {
  if (ga4Geladen || !GA4_ID) return;
  ga4Geladen = true;
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function (...a: unknown[]) { w.dataLayer!.push(a); };
  const s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
  document.head.appendChild(s);
  w.gtag('js', new Date());
  w.gtag('config', GA4_ID);
}

/* ---------- Einwilligung anwenden ---------- */

type Kategorien = { marketing?: boolean; statistik?: boolean };

function anwenden(k: Kategorien | null | undefined) {
  if (k?.marketing) { kennungenAnlegen(); ladeMeta(); } else if (k) { kennungenLoeschen(); }
  if (k?.statistik) ladeGa4(); else if (k) analyseKennungenLoeschen();
}

export function marketingErlaubt(): boolean {
  return !!lesen()?.kategorien.marketing;
}

/** Einmal aufrufen. Wendet eine vorhandene Entscheidung an und hört auf spätere Änderungen. */
export function initTracking() {
  anwenden(lesen()?.kategorien);
  window.addEventListener('consent:geaendert', (e) => anwenden((e as CustomEvent<Kategorien>).detail));
}

/* ---------- Ereignisse ---------- */

export function neueEventId(): string {
  try { if (crypto.randomUUID) return crypto.randomUUID(); } catch { /* alte Browser */ }
  return 'lead-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

/**
 * Felder, die mit der Anfrage an den Server gehen. Pro Bewerbung EINMAL erzeugen und bei einem
 * zweiten Sendeversuch wiederverwenden, sonst gibt es zwei Ereignisse für eine Bewerbung.
 * Die Herkunft (utm, fbclid) geht unabhängig von der Einwilligung in die EIGENE Datenbank: es geht
 * nichts an Dritte, und die Herkunftszählung ist dort für alle Anfragen vollständig.
 */
export function trackingFelder(eventId: string) {
  const erlaubt = marketingErlaubt();
  const fbclid = herkunft.fbclid;
  return {
    event_id: eventId,
    marketing_consent: erlaubt,
    test_mode: testModus,
    page: location.href,
    // Kennungen nur mit Einwilligung. Rückfall für _fbc: aus dem fbclid der Adresse, falls Cookies gesperrt sind.
    fbp: erlaubt ? cookieLesen('_fbp') : '',
    fbc: erlaubt ? cookieLesen('_fbc') || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : '') : '',
    external_id: erlaubt ? besucherId(false) : '',
    utm_source: herkunft.utm_source, utm_medium: herkunft.utm_medium,
    utm_campaign: herkunft.utm_campaign, utm_content: herkunft.utm_content,
    fbclid,
  };
}

/**
 * Lead melden, genau einmal, nachdem der Server die Anfrage gespeichert hat. `duplicate` kommt aus
 * der Antwort der Route: bei einer Wiederholung derselben Anfrage kein zweites Ereignis.
 */
const gemeldet = new Set<string>();
export function meldeLead(eventId: string, optionen: { duplicate?: boolean; inhalt?: string; kategorie?: string } = {}) {
  if (gemeldet.has(eventId) || optionen.duplicate) return;
  gemeldet.add(eventId);
  // Ohne Einwilligung ist fbq nie geladen worden: nichts geht raus.
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Lead', { content_name: optionen.inhalt, content_category: optionen.kategorie }, { eventID: eventId });
  }
  if (typeof w.gtag === 'function' && ga4Geladen) {
    w.gtag('event', 'generate_lead', { event_id: eventId });
  }
}
