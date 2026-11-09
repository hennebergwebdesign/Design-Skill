#!/usr/bin/env node
/*
  pruefe-tracking.mjs — prüft, ob Tracking nur nach Einwilligung läuft und sauber gemeldet wird.

  WARUM ES DIESES SKRIPT GIBT
  Die harte Grenze „echte Skriptblockierung" gilt für jedes Tracking, aber der verbreitetste Fehler
  steckt nicht im Banner, sondern daneben: der Schnipsel von Meta oder Google, den jemand in den
  Kopfbereich kopiert hat, lädt vor jeder Entscheidung. Zweiter Fehler: Browser und Server melden
  dieselbe Bewerbung ohne gemeinsame event_id, Meta zählt dann doppelt. Dritter: ein Server
  sendet ein Ereignis, ohne die Einwilligung zu kennen. Alle drei sind lesbar, deshalb prüft sie
  ein Skript und nicht ein Vorsatz.

  GEFUNDEN WERDEN
  Fehler
    * Tracker-Skript im Markup ohne type="text/plain" und data-consent (Meta, GA4, GTM, Clarity,
      Hotjar, LinkedIn, TikTok, X)
    * Inline-Skript mit fbq('init'), gtag('config') oder dataLayer-Start des Trackers ohne jeden
      Bezug zur Einwilligung
    * Datei mit Pixel-Code (fbq, connect.facebook.net), die das Wort Einwilligung/consent/marketing
      nirgends erwähnt
    * Aufruf der Conversions API (graph.facebook.com .../events) ohne Einwilligungsprüfung
    * Lead-Ereignis im Browser ohne eventID, Server-Ereignis ohne event_id
    * Zugangsschlüssel der Conversions API hinter einem öffentlichen Präfix oder in dist/
  Warnung
    * test_event_code ohne Schalter (landet sonst jede echte Anfrage im Testkanal)
    * Pixel-ID oder GA4-ID fest im Code statt in einer Umgebungsvariable
    * Tracking im Quelltext, aber die Datenschutzerklärung nennt den Dienst nicht

  NICHT GEFUNDEN
  Ob der Banner gleichwertig ablehnen lässt, ob das Netzwerkprotokoll vor der Entscheidung leer ist
  und ob die Rechtstexte stimmen. Das Netzwerkprotokoll prüft ein Mensch mit playwright-cli
  (browser-pruefung-mit-playwright-cli.md, „Consent prüfen"). Das Skript liest Text mit regulären
  Ausdrücken, nicht mit einem Parser: Code, der den Bezug zur Einwilligung nur über einen
  importierten Namen herstellt, ohne dass ein Wort davon in der Datei steht, wird gemeldet, und
  ein Wort in einem Kommentar zählt als Bezug.

  AUFRUF
    node scripts/pruefe-tracking.mjs [pfad ...]      Standard: src, dist, public, functions
  EXIT
    0 = kein Fehler (Warnungen möglich) · 1 = mindestens ein Fehler · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ENDUNGEN = new Set(['.astro', '.html', '.htm', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue', '.svelte', '.md', '.mdx']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', '.astro', '.next', '.output', '.cache', 'coverage', 'results', 'vendor']);
const MARKUP = new Set(['.astro', '.html', '.htm', '.vue', '.svelte']);

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const STANDARD = ['src', 'dist', 'public', 'functions'];
const wurzeln = (args.length ? args : STANDARD).filter(existsSync);
if (!wurzeln.length) {
  console.error('Kein Ordner gefunden. Erwartet einen von: ' + STANDARD.join(', '));
  process.exit(2);
}

function dateien(ordner, aus = []) {
  const st = statSync(ordner);
  if (st.isFile()) return ENDUNGEN.has(extname(ordner)) ? [...aus, ordner] : aus;
  for (const name of readdirSync(ordner)) {
    if (UEBERSPRINGEN.has(name)) continue;
    const pfad = join(ordner, name);
    const s = statSync(pfad);
    if (s.isDirectory()) dateien(pfad, aus);
    else if (ENDUNGEN.has(extname(name)) && s.size < 3_000_000) aus.push(pfad);
  }
  return aus;
}

/* Dienste, die vor der Einwilligung nichts laden dürfen. */
const TRACKER_QUELLE = /(connect\.facebook\.net|googletagmanager\.com|google-analytics\.com|clarity\.ms|static\.hotjar\.com|snap\.licdn\.com|analytics\.tiktok\.com|static\.ads-twitter\.com)/i;
const EINWILLIGUNG = /(consent|einwillig|marketing|statistik|kategorien)/i;
const PIXEL_CODE = /(\bfbq\s*\(|connect\.facebook\.net)/;
const CAPI_AUFRUF = /graph\.facebook\.com[^\n'"`]*\/events|\/events\?access_token/;

const befunde = [];
const melde = (stufe, datei, text) => befunde.push({ stufe, datei, text });

const alle = wurzeln.flatMap((w) => dateien(w));
let trackingGefunden = { meta: false, ga: false };

for (const datei of alle) {
  const rel = relative(process.cwd(), datei) || datei;
  const inhalt = readFileSync(datei, 'utf8');
  const endung = extname(datei);
  const istDist = /(^|[\\/])dist[\\/]/.test(rel);

  /* 1. Skripte im Markup */
  if (MARKUP.has(endung)) {
    for (const m of inhalt.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const attrs = m[1];
      const koerper = m[2];
      const geparkt = /type\s*=\s*["']text\/plain["']/i.test(attrs) && /data-consent/i.test(attrs);
      const quelle = (attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i) || [])[1] || '';
      if (TRACKER_QUELLE.test(quelle)) {
        trackingGefunden[/facebook/i.test(quelle) ? 'meta' : 'ga'] = true;
        if (!geparkt) melde('Fehler', rel, `Tracker-Skript im Markup lädt vor der Entscheidung: ${quelle.slice(0, 80)}. Als type="text/plain" data-consent="…" parken oder aus dem Consent-Modul laden.`);
        continue;
      }
      if (geparkt) continue;
      const startet = /(fbq\s*\(\s*['"]init['"]|gtag\s*\(\s*['"]config['"]|gtm\.start|dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\s*\][\s\S]{0,200}googletagmanager)/.test(koerper);
      if (startet) {
        trackingGefunden[/fbq/.test(koerper) ? 'meta' : 'ga'] = true;
        if (!EINWILLIGUNG.test(koerper)) melde('Fehler', rel, 'Inline-Skript startet einen Tracker ohne Bezug zur Einwilligung. Es läuft beim Seitenaufruf.');
      }
    }
  }

  const hatPixel = PIXEL_CODE.test(inhalt);
  const hatCapi = CAPI_AUFRUF.test(inhalt);
  if (hatPixel) trackingGefunden.meta = true;
  if (/gtag\s*\(|googletagmanager\.com\/gtag/.test(inhalt)) trackingGefunden.ga = true;

  /* 2. Pixel-Code ohne Einwilligungsbezug (ausserhalb der gebauten Bündel, die den Bezug mitbringen) */
  if (hatPixel && !EINWILLIGUNG.test(inhalt) && !MARKUP.has(endung)) {
    melde('Fehler', rel, 'Pixel-Code ohne jeden Bezug zur Einwilligung. Der Aufruf gehört hinter die Prüfung der Kategorie „marketing".');
  }

  /* 3. Conversions API ohne Einwilligungsprüfung */
  if (hatCapi && !/(marketing_consent|consent|einwillig)/i.test(inhalt)) {
    melde('Fehler', rel, 'Conversions API wird ohne Prüfung der Einwilligung aufgerufen. Serverseitig heißt nicht einwilligungsfrei.');
  }

  /* 4. Deduplizierung */
  if (/fbq\s*\(\s*['"]track['"]\s*,\s*['"]Lead['"]/.test(inhalt) && !/eventID/.test(inhalt)) {
    melde('Fehler', rel, 'Lead-Ereignis im Browser ohne eventID. Ohne gemeinsame ID zählt Meta jede Anfrage doppelt, sobald auch der Server meldet.');
  }
  if (hatCapi && !/event_id/.test(inhalt)) {
    melde('Fehler', rel, 'Conversions API ohne event_id. Meta kann Browser und Server nicht zusammenführen.');
  }

  /* 5. Schlüssel */
  if (/PUBLIC_[A-Z0-9_]*(CAPI|ACCESS_TOKEN|API_SECRET)/.test(inhalt)) {
    melde('Fehler', rel, 'Zugangsschlüssel der Conversions API hinter einem öffentlichen Präfix. Er gehört als Geheimnis auf den Server, nie mit PUBLIC_ benennen.');
  }
  if (istDist && /META_CAPI_TOKEN|EAA[A-Za-z0-9]{40,}/.test(inhalt)) {
    melde('Fehler', rel, 'Conversions API Token im ausgelieferten Build.');
  }

  /* 6. Testcode ohne Schalter */
  if (/test_event_code/.test(inhalt) && /META_TEST_EVENT_CODE/.test(inhalt) && !/test_mode/.test(inhalt)) {
    melde('Warnung', rel, 'test_event_code ohne Schalter: ist die Variable gesetzt, landen alle echten Anfragen im Testkanal und zählen nirgends als Conversion.');
  }

  /* 7. Kennungen im Code */
  if (/fbq\s*\(\s*['"]init['"]\s*,\s*['"]\d{10,}['"]/.test(inhalt) || /(PIXEL_ID|pixelId)\s*=\s*['"]\d{10,}['"]/.test(inhalt)) {
    melde('Warnung', rel, 'Pixel-ID fest im Code. In eine Umgebungsvariable (PUBLIC_META_PIXEL_ID) legen, damit Test und Livegang nicht im Quelltext getrennt werden müssen.');
  }
  if (/['"]G-[A-Z0-9]{8,12}['"]/.test(inhalt) && !istDist) {
    melde('Warnung', rel, 'GA4-Mess-ID fest im Code. In eine Umgebungsvariable (PUBLIC_GA4_ID) legen.');
  }
}

/* 8. Datenschutz nennt die Dienste */
if (trackingGefunden.meta || trackingGefunden.ga) {
  const seiten = alle.filter((d) => /datenschutz/i.test(d) && (MARKUP.has(extname(d)) || /\.mdx?$/.test(d)));
  if (!seiten.length) {
    melde('Warnung', '(Projekt)', 'Tracking vorhanden, aber keine Datei mit Datenschutzerklärung gefunden.');
  } else {
    const text = seiten.map((d) => readFileSync(d, 'utf8')).join('\n');
    if (trackingGefunden.meta && !/meta|facebook/i.test(text)) melde('Warnung', relative(process.cwd(), seiten[0]), 'Meta Pixel im Code, die Datenschutzerklärung nennt Meta nicht.');
    if (trackingGefunden.ga && !/google analytics|google tag|gtag/i.test(text)) melde('Warnung', relative(process.cwd(), seiten[0]), 'Google Analytics im Code, die Datenschutzerklärung nennt es nicht.');
  }
}

/* ---------- Ausgabe ---------- */
const fehler = befunde.filter((b) => b.stufe === 'Fehler');
const warnungen = befunde.filter((b) => b.stufe === 'Warnung');
for (const b of [...fehler, ...warnungen]) console.log(`${b.stufe.toUpperCase().padEnd(8)} ${b.datei}\n         ${b.text}`);

if (!trackingGefunden.meta && !trackingGefunden.ga && !befunde.length) {
  console.log('Kein Tracking im Code gefunden. Nichts zu prüfen.');
} else if (!befunde.length) {
  console.log('Keine Befunde. Das Netzwerkprotokoll vor der Entscheidung prüft ein Mensch (browser-pruefung-mit-playwright-cli.md).');
} else {
  console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.`);
}
process.exit(fehler.length ? 1 : 0);
