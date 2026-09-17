#!/usr/bin/env node
/*
  design-scan.mjs — erfasst eine bekannte oder alte Website als Design- und Struktur-Referenz.

  WARUM ES DIESES SKRIPT GIBT
  `relaunch-inventory.mjs` inventarisiert die EIGENE alte Kundenseite vor dem Relaunch: jede
  URL, jeder Rechtstext, jede Weiterleitung. Dieses Skript ist etwas anderes: es erfasst eine
  FREMDE Seite, Wettbewerber, Inspirationsquelle oder eine vom Kunden genannte Referenz, für
  die Recherche aus `references/22-premium-designquellen.md`. Gebraucht wird dort nicht der
  vollständige Text, sondern die Struktur: welche Sektionen in welcher Reihenfolge, wie viele
  Wörter pro Abschnitt, welche Bilder, welche Schriften und Farben tauchen im Code auf.

  Wer das aus dem Gedächtnis oder aus einem Screenshot heraus beschreibt, erfindet Details.
  Dieses Skript ruft die Seite tatsächlich ab und legt eine strukturierte Zusammenfassung als
  Arbeitsmaterial ab. Es entscheidet nichts und bewertet nichts als "gut": das bleibt die
  eigene Sichtung nach `references/22-premium-designquellen.md`, Schritt 3 (Prinzipien
  benennen, mit Begründung, was übernommen wird und was bewusst nicht).

  RECHTLICHE GRENZE, siehe `references/22-premium-designquellen.md` und
  `../agentur-website-builder/references/referenzen-und-auswahl.md`: übernommen wird ein
  Prinzip, nie Text, Bildmaterial, Logo oder eine charakteristische Layoutkombination im
  Ganzen. Dieses Skript liefert Rohmaterial für die Prinzipien-Analyse, keine Textbausteine
  zum Copy-Paste. Die abgelegten Texte und Bildadressen sind fremdes Material und gehören in
  die `.gitignore` des Kundenprojekts, nie in die ausgelieferte Seite.

  ABGELEGT WIRD IN .design-scan/<host>/
    struktur.md         Überschriftenbaum, Wortzahl je Abschnitt, Bilder, Formvermutung
    seite.json           dieselben Daten maschinenlesbar, plus erkannte Farben und Schriften
    screenshot-url.txt   Firecrawl-Screenshot-Adresse, falls FIRECRAWL_API_KEY gesetzt

  AUFRUF
    node scripts/design-scan.mjs https://referenz-seite.de
    node scripts/design-scan.mjs https://referenz-seite.de --verzeichnis .design-scan/wettbewerb-a

  Mit gesetztem FIRECRAWL_API_KEY läuft der Abruf über die Firecrawl-API (https://firecrawl.dev,
  Quelle https://github.com/firecrawl/firecrawl) und liefert zusätzlich einen Screenshot sowie
  Seiten, die erst im Browser rendern. Ohne Schlüssel arbeitet ein Direktabruf des HTML, das
  genügt für die meisten serverseitig gerenderten Seiten, aber nicht für reine JS-Apps und
  liefert keinen Screenshot.

  EXIT
    0 = Struktur erfasst · 1 = Seite nicht erreichbar · 2 = Aufrufproblem
*/

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

const args = process.argv.slice(2);
const start = args.find((a) => !a.startsWith('--'));
const wert = (name, standard) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : standard;
};

if (!start) {
  console.error('Aufruf: node scripts/design-scan.mjs https://referenz-seite.de [--verzeichnis .design-scan/name]');
  process.exit(2);
}

let ziel;
try {
  ziel = new URL(start.startsWith('http') ? start : `https://${start}`);
} catch {
  console.error(`Keine gültige Adresse: ${start}`);
  process.exit(2);
}

const SCHLUESSEL = process.env.FIRECRAWL_API_KEY;
const ZIEL_VERZEICHNIS = wert('--verzeichnis', join('.design-scan', ziel.hostname.replace(/^www\./, '')));
const KOPF = { 'user-agent': 'design-scan (Referenzrecherche, https://thatsit.marketing)' };

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

async function holen(url) {
  if (SCHLUESSEL) {
    try {
      const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: { authorization: `Bearer ${SCHLUESSEL}`, 'content-type': 'application/json' },
        body: JSON.stringify({ url, formats: ['html', 'markdown', 'screenshot'], onlyMainContent: false }),
      });
      if (res.ok) {
        const d = await res.json();
        const html = d?.data?.html ?? '';
        if (html) {
          return {
            status: 200,
            html,
            markdown: d?.data?.markdown ?? '',
            screenshot: d?.data?.screenshot ?? '',
            quelle: 'Firecrawl API',
          };
        }
      }
      console.warn(`Firecrawl ${res.status}, fällt auf Direktabruf zurück`);
    } catch (f) {
      console.warn(`Firecrawl nicht erreichbar (${f.message}), fällt auf Direktabruf zurück`);
    }
  }
  const res = await fetch(url, { headers: KOPF, redirect: 'follow' });
  const typ = res.headers.get('content-type') ?? '';
  return {
    status: res.status,
    html: typ.includes('html') ? await res.text() : '',
    markdown: '',
    screenshot: '',
    quelle: 'Direktabruf',
  };
}

// -------------------------------------------------------- Strukturanalyse

function ueberschriftenbaum(html) {
  const treffer = [...html.matchAll(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)];
  return treffer
    .map((m) => ({ ebene: Number(m[1]), text: nurText(m[2]).replace(/\s+/g, ' ').trim() }))
    .filter((h) => h.text);
}

function bildAnalyse(html) {
  const bilder = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => ({
    src: eins(m[0], /src=["']([^"']+)["']/i) || eins(m[0], /data-src=["']([^"']+)["']/i),
    alt: eins(m[0], /alt=["']([^"']*)["']/i),
  }));
  return { anzahl: bilder.length, ohneAlt: bilder.filter((b) => !b.alt.trim()).length, beispiele: bilder.slice(0, 8) };
}

// Grobe Annäherung, kein CSS-Parser: findet Hex-Farben und Schriftnamen in Inline-Styles,
// <style>-Blöcken und gängigen Font-Provider-Links. Liefert Kandidaten, keine Wahrheit; der
// tatsächliche Tokenwert eines Kundenprojekts kommt nie von hier, siehe
// `references/20-markenextraktion-bestandsseite.md` für die saubere Markenextraktion.
function farbUndSchriftKandidaten(html) {
  const styleBloecke = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const inlineStyles = [...html.matchAll(/style=["']([^"']*)["']/gi)].map((m) => m[1]).join('\n');
  const css = `${styleBloecke}\n${inlineStyles}`;

  const farben = [...new Set((css.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []))].slice(0, 20);
  const rgbFarben = [...new Set((css.match(/rgba?\([^)]+\)/g) ?? []))].slice(0, 10);

  const schriftKandidaten = new Set();
  for (const m of css.matchAll(/font-family\s*:\s*([^;"'}]+)/gi)) {
    schriftKandidaten.add(m[1].trim());
  }
  for (const m of html.matchAll(/fonts\.googleapis\.com\/css2?\?family=([^"'&]+)/gi)) {
    schriftKandidaten.add(decodeURIComponent(m[1]).replace(/\+/g, ' '));
  }

  return { farben: [...farben, ...rgbFarben], schriften: [...schriftKandidaten].slice(0, 10) };
}

function schreiben(pfad, inhalt) {
  mkdirSync(dirname(pfad), { recursive: true });
  writeFileSync(pfad, inhalt, 'utf8');
}

// ---------------------------------------------------------------- Ablauf

console.log(`Design-Scan für ${ziel.toString()}`);
console.log(SCHLUESSEL ? 'Quelle: Firecrawl API (mit Screenshot)' : 'Quelle: Direktabruf, kein FIRECRAWL_API_KEY gesetzt (kein Screenshot)');

let ergebnis;
try {
  ergebnis = await holen(ziel.toString());
} catch (f) {
  console.error(`Fehler beim Abruf: ${f.message}`);
  process.exit(1);
}

if (!ergebnis.html || ergebnis.status < 200 || ergebnis.status >= 400) {
  console.error(`Seite nicht erreichbar, Status ${ergebnis.status}. Adresse und Netzzugang prüfen.`);
  process.exit(1);
}

const { html, screenshot, quelle } = ergebnis;
const text = nurText(html);
const ueberschriften = ueberschriftenbaum(html);
const bilder = bildAnalyse(html);
const { farben, schriften } = farbUndSchriftKandidaten(html);

const daten = {
  quelle: ziel.toString(),
  abgerufen: new Date().toISOString(),
  abrufart: quelle,
  titel: eins(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
  description: eins(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
  sprache: eins(html, /<html[^>]+lang=["']([^"']*)["']/i),
  woerterGesamt: text.split(/\s+/).filter(Boolean).length,
  ueberschriften,
  bilder,
  farbKandidaten: farben,
  schriftKandidaten: schriften,
  screenshot,
};

schreiben(join(ZIEL_VERZEICHNIS, 'seite.json'), JSON.stringify(daten, null, 2));

const gliederung = ueberschriften.length
  ? ueberschriften.map((h) => `${'  '.repeat(h.ebene - 1)}- H${h.ebene}: ${h.text}`).join('\n')
  : '(keine H1 bis H4 gefunden, Struktur vermutlich über Markup ohne Überschriften-Tags gebaut, das selbst ein SEO-Befund ist)';

const md = [
  `# Design-Scan ${ziel.toString()}`,
  '',
  `Abgerufen ${new Date().toLocaleString('de-DE')} über ${quelle}.`,
  '',
  'Arbeitsmaterial für die Referenzrecherche, kein Text zum Übernehmen. Prinzip ableiten und',
  'begründen, nicht kopieren, siehe `references/22-premium-designquellen.md` und',
  '`../agentur-website-builder/references/referenzen-und-auswahl.md`.',
  '',
  `**Titel:** ${daten.titel || '(kein <title>)'}`,
  `**Description:** ${daten.description || '(keine)'}`,
  `**Wörter im sichtbaren Text:** ${daten.woerterGesamt}`,
  `**Bilder:** ${bilder.anzahl}, davon ${bilder.ohneAlt} ohne Alt-Text`,
  '',
  '## Vermutete Sektionsreihenfolge (aus Überschriften-Hierarchie)',
  '',
  gliederung,
  '',
  '## Farb- und Schriftkandidaten aus dem Code',
  '',
  'Grobe Heuristik, kein CSS-Parser. Dient als Ausgangspunkt für die eigene Sichtung, nicht',
  'als Tokenwert.',
  '',
  `Farben: ${farben.length ? farben.join(', ') : '(keine im Inline-CSS gefunden, vermutlich externes Stylesheet)'}`,
  `Schriften: ${schriften.length ? schriften.join(', ') : '(keine gefunden)'}`,
  '',
  screenshot ? `## Screenshot\n\n${screenshot}\n` : '## Screenshot\n\nKein Screenshot, dafür FIRECRAWL_API_KEY setzen.\n',
  '## Nächster Schritt',
  '',
  '2 bis 3 Prinzipien benennen, die übernommen werden, und was bewusst nicht übernommen wird,',
  'dann erst den Plan aus `references/10-visuelle-richtung.md` entwerfen.',
  '',
].join('\n');

schreiben(join(ZIEL_VERZEICHNIS, 'struktur.md'), md);
if (screenshot) schreiben(join(ZIEL_VERZEICHNIS, 'screenshot-url.txt'), `${screenshot}\n`);

console.log(`\nAbgelegt in ${ZIEL_VERZEICHNIS}/`);
console.log(`  struktur.md, seite.json${screenshot ? ', screenshot-url.txt' : ''}`);
console.log(`\n${ZIEL_VERZEICHNIS}/ in die .gitignore des Kundenprojekts eintragen. Es enthält fremdes Material.`);
