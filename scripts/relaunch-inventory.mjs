#!/usr/bin/env node
/*
  relaunch-inventory.mjs — inventarisiert eine bestehende Kundenseite vor dem Relaunch.

  WARUM ES DIESES SKRIPT GIBT
  Der teuerste Fehler bei einer Überarbeitung ist nicht ein haessliches Layout, sondern der
  Verlust bestehender Rankings und bestehender Inhalte. Beides passiert leise: eine URL, an
  die niemand gedacht hat, ein Absatz mit den Oeffnungszeiten, die Handelsregisternummer im
  alten Impressum. Wer das aus dem Gedaechtnis nacharbeitet, erfindet.

  Das Skript ruft die alte Seite ab und legt den Bestand als Arbeitsmaterial ab. Es
  entscheidet nichts. Jede Weiterleitung und jeder uebernommene Text wird danach von Hand
  geprueft.

  ABGELEGT WIRD IN .relaunch-inventory/
    inventar.json          je Seite URL, Status, Titel, Description, H1, Wortzahl, Bilder
    inventar.md            dieselbe Liste als Tabelle fuer das Umsetzungskonzept
    seiten/<pfad>.txt      der extrahierte Textinhalt je Seite
    rechtstexte/           erkannte Kandidaten: Impressum, Datenschutz, AGB, Widerruf
    redirects-entwurf.txt  Vorschlag fuer public/_redirects, jede Zeile ist zu pruefen

  AUFRUF
    node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
    node scripts/relaunch-inventory.mjs https://alte-kundenseite.de --max 120
    node scripts/relaunch-inventory.mjs https://alte-kundenseite.de --verzeichnis .inventar

  Der Abruf laeuft seit Version 3.5.0 ueber lib/abruf.mjs mit vier Rueckfallstufen (Firecrawl
  selbst gehostet ueber FIRECRAWL_BASE_URL, Firecrawl Cloud ueber FIRECRAWL_API_KEY, Playwright
  lokal, Direktabruf). Die Seitenkarte ueber den /map-Endpunkt braucht weiterhin einen
  Firecrawl-Zugang. Siehe
  skills/agentur-website-builder/references/firecrawl-recherche.md.

  HINWEIS
  Das Ergebnis enthaelt fremde Texte und Bildadressen. Es ist Arbeitsmaterial, kein
  Liefergegenstand, und gehoert in die .gitignore des Kundenprojekts.

  EXIT
    0 = Inventar erstellt · 1 = keine Seite erreichbar · 2 = Aufrufproblem
*/

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

import { abrufen } from './lib/abruf.mjs';

const args = process.argv.slice(2);
const start = args.find((a) => !a.startsWith('--'));
const wert = (name, standard) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : standard;
};

if (!start) {
  console.error('Aufruf: node scripts/relaunch-inventory.mjs https://alte-seite.de [--max 60] [--verzeichnis .relaunch-inventory]');
  process.exit(2);
}

let basis;
try {
  basis = new URL(start.startsWith('http') ? start : `https://${start}`);
} catch {
  console.error(`Keine gültige Adresse: ${start}`);
  process.exit(2);
}

const MAX = Number(wert('--max', '60'));
const ZIEL = wert('--verzeichnis', '.relaunch-inventory');
const SCHLUESSEL = process.env.FIRECRAWL_API_KEY;
const PAUSE = 300;
const KOPF = { 'user-agent': 'relaunch-inventory (Agentur-Inventar, https://thatsit.marketing)' };

const RECHTSTEXTE = [
  { art: 'impressum', muster: /impressum|imprint|anbieterkennzeichnung/i },
  { art: 'datenschutz', muster: /datenschutz|privacy/i },
  { art: 'agb', muster: /\bagb\b|geschaeftsbedingungen|geschäftsbedingungen|terms/i },
  { art: 'widerruf', muster: /widerruf|rueckgabe|rückgabe/i },
  { art: 'cookies', muster: /cookie/i },
  { art: 'barrierefreiheit', muster: /barrierefreiheit|accessibility/i },
];

const schlafen = (ms) => new Promise((r) => setTimeout(r, ms));

function entschluesseln(text = '') {
  return text
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&auml;/gi, 'ä').replace(/&ouml;/gi, 'ö').replace(/&uuml;/gi, 'ü')
    .replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/gi, 'ß').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function nurText(html) {
  return entschluesseln(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<\/(p|div|section|article|li|h[1-6]|tr|br)>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

const eins = (html, re) => entschluesseln((html.match(re) ?? [])[1] ?? '').trim();

function intern(href, von) {
  try {
    const u = new URL(href, von);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    if (u.hostname.replace(/^www\./, '') !== basis.hostname.replace(/^www\./, '')) return null;
    if (/\.(jpe?g|png|gif|webp|avif|svg|pdf|zip|docx?|xlsx?|mp4|mp3)$/i.test(u.pathname)) return null;
    u.hash = '';
    return u.toString();
  } catch {
    return null;
  }
}

// Abruf über die gemeinsame Abrufschicht, siehe lib/abruf.mjs. Zwei Besonderheiten für das
// Inventar der EIGENEN Kundenseite: statusDurchreichen, weil ein 404 hier ein Befund ist und
// kein Fehlschlag, und keine robots.txt-Prüfung, weil es die Seite des Auftraggebers ist und
// eine Disallow-Regel für Suchmaschinen keine Bestandsaufnahme verbietet.
async function holen(url) {
  const ergebnis = await abrufen(url, { robots: false, statusDurchreichen: true, wiederholen: 0 });
  return { status: ergebnis.status, html: ergebnis.html, markdown: ergebnis.markdown };
}

async function adressenAusSitemap() {
  const gefunden = new Set();
  const kandidaten = [];

  try {
    const robots = await fetch(new URL('/robots.txt', basis), { headers: KOPF });
    if (robots.ok) {
      for (const z of (await robots.text()).split('\n')) {
        const m = z.match(/^\s*sitemap:\s*(\S+)/i);
        if (m) kandidaten.push(m[1]);
      }
    }
  } catch {}
  kandidaten.push(new URL('/sitemap.xml', basis).toString(), new URL('/sitemap_index.xml', basis).toString());

  const gelesen = new Set();
  const lesen = async (adresse, tiefe = 0) => {
    if (gelesen.has(adresse) || tiefe > 2) return;
    gelesen.add(adresse);
    try {
      const res = await fetch(adresse, { headers: KOPF });
      if (!res.ok) return;
      const xml = await res.text();
      const orte = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => entschluesseln(m[1].trim()));
      for (const ort of orte) {
        if (/\.xml(\.gz)?$/i.test(ort)) await lesen(ort, tiefe + 1);
        else { const u = intern(ort, basis); if (u) gefunden.add(u); }
      }
    } catch {}
  };

  for (const k of kandidaten) await lesen(k);
  return [...gefunden];
}

async function adressenAusFirecrawlMap() {
  try {
    const basisAdresse = (process.env.FIRECRAWL_BASE_URL ?? 'https://api.firecrawl.dev').replace(/\/$/, '');
    const res = await fetch(`${basisAdresse}/v1/map`, {
      method: 'POST',
      headers: { authorization: `Bearer ${SCHLUESSEL}`, 'content-type': 'application/json' },
      body: JSON.stringify({ url: basis.toString(), limit: MAX }),
    });
    if (!res.ok) return [];
    const d = await res.json();
    return (d?.links ?? []).map((l) => intern(typeof l === 'string' ? l : l.url, basis)).filter(Boolean);
  } catch {
    return [];
  }
}

function dateiname(url) {
  const pfad = new URL(url).pathname.replace(/\.(html?|php|aspx?)$/i, '').replace(/\/+$/, '') || '/startseite';
  return pfad.replace(/^\//, '').replace(/[^a-z0-9._-]+/gi, '-').replace(/-+/g, '-') || 'startseite';
}

function neuerPfad(alt) {
  return (
    alt
      .toLowerCase()
      .replace(/\.(html?|php|aspx?)$/i, '')
      .replace(/\/index$/, '/')
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\/-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/\/-|-\//g, '/')
      .replace(/\/{2,}/g, '/') || '/'
  );
}

function schreiben(pfad, inhalt) {
  mkdirSync(dirname(pfad), { recursive: true });
  writeFileSync(pfad, inhalt, 'utf8');
}

// ---------------------------------------------------------------- Ablauf

console.log(`Inventar für ${basis.origin}`);
console.log(
  SCHLUESSEL || process.env.FIRECRAWL_BASE_URL
    ? 'Firecrawl-Zugang vorhanden, Seitenkarte über /map möglich'
    : 'Kein Firecrawl-Zugang, Abruf über Sitemap und interne Links'
);

let warteschlange = SCHLUESSEL || process.env.FIRECRAWL_BASE_URL ? await adressenAusFirecrawlMap() : [];
if (!warteschlange.length) warteschlange = await adressenAusSitemap();
const ausSitemap = warteschlange.length;
console.log(ausSitemap ? `${ausSitemap} Adressen aus Sitemap oder Map` : 'Keine Sitemap gefunden, folge internen Links');
if (!warteschlange.length) warteschlange = [basis.toString()];

const gesehen = new Set();
const seiten = [];

while (warteschlange.length && seiten.length < MAX) {
  const url = warteschlange.shift();
  const schluessel = url.replace(/\/$/, '');
  if (gesehen.has(schluessel)) continue;
  gesehen.add(schluessel);

  let ergebnis;
  try {
    ergebnis = await holen(url);
  } catch (f) {
    console.log(`  Fehler ${url}: ${f.message}`);
    seiten.push({ url, status: 0, fehler: f.message });
    continue;
  }

  const { status, html } = ergebnis;
  if (!html) {
    seiten.push({ url, status });
    continue;
  }

  const text = nurText(html);
  const bilder = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => ({
    src: eins(m[0], /src=["']([^"']+)["']/i),
    alt: eins(m[0], /alt=["']([^"']*)["']/i),
  }));

  const seite = {
    url,
    pfad: new URL(url).pathname,
    status,
    titel: eins(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: eins(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
    canonical: eins(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    robots: eins(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
    sprache: eins(html, /<html[^>]+lang=["']([^"']*)["']/i),
    h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => nurText(m[1])).filter(Boolean),
    woerter: text.split(/\s+/).filter(Boolean).length,
    bilder: bilder.length,
    bilderOhneAlt: bilder.filter((b) => !b.alt.trim()).length,
  };
  seiten.push(seite);
  console.log(`  ${status}  ${seite.pfad}  ${seite.woerter} Wörter`);

  schreiben(join(ZIEL, 'seiten', `${dateiname(url)}.txt`), `${url}\n${'='.repeat(url.length)}\n\n${text}\n`);

  for (const art of RECHTSTEXTE) {
    if (art.muster.test(seite.pfad) || art.muster.test(seite.titel)) {
      schreiben(join(ZIEL, 'rechtstexte', `${art.art}.txt`), `Quelle: ${url}\nStand des Abrufs: ${new Date().toISOString()}\n\nUNGEPRÜFT. Vor der Übernahme gegen die neue Technik abgleichen,\nfehlende Pflichtangaben als [[FEHLT: …]] markieren.\n\n${text}\n`);
    }
  }

  if (!ausSitemap) {
    for (const m of html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)) {
      const u = intern(m[1], url);
      if (u && !gesehen.has(u.replace(/\/$/, ''))) warteschlange.push(u);
    }
  }

  await schlafen(PAUSE);
}

const erreichbar = seiten.filter((s) => s.status >= 200 && s.status < 400);
if (!erreichbar.length) {
  console.error('\nKeine Seite erreichbar. Adresse, Erreichbarkeit und Netzzugang prüfen.');
  process.exit(1);
}

schreiben(join(ZIEL, 'inventar.json'), JSON.stringify({ quelle: basis.origin, abgerufen: new Date().toISOString(), anzahl: seiten.length, seiten }, null, 2));

const md = [
  `# Inventar ${basis.origin}`,
  '',
  `Abgerufen ${new Date().toLocaleString('de-DE')}, ${seiten.length} Adressen, ${erreichbar.length} erreichbar.`,
  '',
  'Arbeitsmaterial. Texte, Zahlen und Rechtsangaben werden von hier übernommen, nicht neu erfunden.',
  '',
  '| Pfad | Status | Titel | H1 | Wörter | Bilder (ohne Alt) |',
  '|---|---|---|---|---|---|',
  ...seiten.map((s) =>
    `| \`${s.pfad ?? s.url}\` | ${s.status} | ${(s.titel ?? '').slice(0, 60)} | ${(s.h1?.[0] ?? '').slice(0, 50)} | ${s.woerter ?? 0} | ${s.bilder ?? 0} (${s.bilderOhneAlt ?? 0}) |`
  ),
  '',
  '## Offene Punkte für das Konzept',
  '',
  '- Welche dieser Seiten bleibt, welche entfällt, welche wird zusammengelegt?',
  '- Welche Texte übernimmt der Kunde unverändert?',
  '- Welche Pflichtangaben fehlen in den Rechtstexten und müssen als `[[FEHLT: …]]` markiert werden?',
  '- Welche Bilder sind nutzbar, welche brauchen Ersatz und einen Alternativtext?',
  '',
].join('\n');
schreiben(join(ZIEL, 'inventar.md'), md);

const redirects = [
  '# Entwurf, NICHT ungeprüft übernehmen.',
  '# Jede alte Adresse bekommt ein inhaltlich passendes Ziel. Pauschal alles auf die',
  '# Startseite zu leiten wertet Google als Soft 404 und kostet genau die Rankings,',
  '# die der Relaunch erhalten soll.',
  `# Quelle: ${basis.origin}, ${new Date().toLocaleDateString('de-DE')}`,
  '',
  ...erreichbar
    .map((s) => ({ alt: s.pfad, neu: neuerPfad(s.pfad) }))
    .filter((r) => r.alt && r.alt !== '/')
    .map((r) => (r.alt === r.neu ? `# unverändert: ${r.alt}` : `${r.alt}   ${r.neu}   301`)),
  '',
].join('\n');
schreiben(join(ZIEL, 'redirects-entwurf.txt'), redirects);

console.log(`\nAbgelegt in ${ZIEL}/`);
console.log(`  inventar.json, inventar.md, seiten/ (${erreichbar.length}), redirects-entwurf.txt`);
console.log(`\n${ZIEL}/ in die .gitignore des Kundenprojekts eintragen. Es enthält fremde Texte.`);
console.log('Nächster Schritt: Marken- und CI-Extraktion nach references/20-markenextraktion-bestandsseite.md.');
