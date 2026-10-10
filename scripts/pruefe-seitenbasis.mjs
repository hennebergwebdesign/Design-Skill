#!/usr/bin/env node
/*
  pruefe-seitenbasis.mjs — prueft die statischen Grundlagen jeder gebauten Seite im HTML.

  WARUM ES DIESES SKRIPT GIBT
  Die Fuenf-Agenten-Pruefung (47-claude-design-hacks.md, Abschnitt 6) hat 20 Punkte. Ein Teil davon
  ist keine Geschmacksfrage, sondern steht im HTML oder fehlt: die Sprache der Seite, ein Hauptbereich,
  ein Viewport, der den Zoom sperrt, ein Bild ohne Alt-Text, ein Feld ohne Label, ein Schriftlink zu
  einem Fremdserver. Ein Agent kann das uebersehen, ein Skript nicht. Das Paket brachte dafuer ein
  Python-Skript mit; weil dieses Repository ohne Abhaengigkeiten bleibt, ist es hier in Node gebaut.

  WAS GEPRUEFT WIRD (je Seite, .html in dist)
  Fehler:
    1. <html> ohne lang-Attribut.
    2. Kein Viewport, oder einer, der den Zoom sperrt (user-scalable=no, maximum-scale=1).
    3. <img> ohne alt-Attribut (alt="" ist erlaubt, es markiert ein Zierbild).
    4. Eingabefeld ohne Label: weder <label for>, noch umschliessendes <label>, noch aria-label
       oder aria-labelledby. Ein Platzhalter ist kein Label.
    5. Schrift, Skript oder Stil von einem Fremdserver (Google Fonts, unpkg, jsDelivr, cdnjs,
       Typekit, Font Awesome Kit, Tailwind CDN). Fuer Kunden in Deutschland nicht freigabefaehig,
       siehe 07-recht-dsgvo.md. Im Entwurf erlaubt, in der Abnahme nicht.
  Warnungen:
    6. lang beginnt nicht mit "de" (bei mehrsprachigen Seiten gewollt).
    7. Kein <main>, oder weder Kopf/Navigation noch Fusszeile.
    8. <img> ohne width und height und ohne aspect-ratio im style: Layoutsprung (CLS).
    9. Keine og:image, keine theme-color, kein Favicon (nicht auf noindex- und 404-Seiten).
   10. Link mit href="#", leerem href oder javascript: ohne Ziel: ein toter Button.

  WAS NICHT GEPRUEFT WIRD
  Titel, Beschreibung, h1 und Ueberschriftenebenen pruefe-geo.mjs. Kontrast pruefe-kontrast.mjs,
  Bewegung pruefe-motion.mjs, Zielgroessen und Breakpoints pruefe-breakpoints.mjs. Tempo, Geschmack
  und Verstaendlichkeit pruft kein Skript.

  AUFRUF
    node scripts/pruefe-seitenbasis.mjs                 Standard: dist
    node scripts/pruefe-seitenbasis.mjs dist --strict   Warnungen zaehlen wie Fehler

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

export const FREMDSERVER = [
  'fonts.googleapis.com', 'fonts.gstatic.com', 'unpkg.com', 'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com', 'use.typekit.net', 'kit.fontawesome.com', 'cdn.tailwindcss.com',
];

/** Attribute eines Start-Tags als Objekt, Namen klein. */
function attribute(tag) {
  const a = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-\w:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    if (m.index === 0) continue; // der Tagname selbst
    a[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return a;
}

function tagsFinden(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => ({ roh: m[0], a: attribute(m[0].replace(/^<\w+/, 'x')), index: m.index }));
}

export function seiteBasisAnalysieren(html, datei = '') {
  const fehler = [];
  const warnungen = [];
  const f = (regel, meldung, tipp) => fehler.push({ regel, meldung, tipp });
  const w = (regel, meldung, tipp) => warnungen.push({ regel, meldung, tipp });

  // Skripte und Kommentare stoeren die Tag-Suche, deshalb vorher entfernen.
  const sauber = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi, '<script></script>')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '<style></style>');
  const keineIndexSeite = /noindex/i.test(sauber) || /^404(\.html)?$/i.test(basename(datei));

  const htmlTag = tagsFinden(sauber, 'html')[0];
  const lang = htmlTag?.a.lang;
  if (!lang) f('sprache-fehlt', 'Kein lang-Attribut am <html>-Element', 'lang="de" setzen. Bildschirmleser und Silbentrennung hängen daran.');
  else if (!/^de\b/i.test(lang)) w('sprache-nicht-de', `lang="${lang}"`, 'Bei einer deutschen Kundenseite lang="de". Bei mehrsprachigen Seiten ist die Abweichung gewollt.');

  const meta = tagsFinden(sauber, 'meta').map((m) => m.a);
  const viewport = meta.find((m) => (m.name || '').toLowerCase() === 'viewport')?.content;
  if (viewport === undefined) f('viewport-fehlt', 'Kein Viewport-Meta', '<meta name="viewport" content="width=device-width, initial-scale=1"> setzen.');
  else if (/user-scalable\s*=\s*(no|0)/i.test(viewport) || /maximum-scale\s*=\s*1(\.0)?\b/i.test(viewport)) {
    f('zoom-gesperrt', `Viewport sperrt den Zoom: ${viewport}`, 'user-scalable und maximum-scale entfernen. Zoom bis 200 Prozent ist WCAG 1.4.4.');
  }

  if (!/<main\b/i.test(sauber)) w('main-fehlt', 'Kein <main>-Bereich', 'Den Hauptinhalt in <main> legen, mit Sprunglink darauf (04-barrierefreiheit-bfsg.md).');
  if (!(/<(header|nav)\b/i.test(sauber) && /<footer\b/i.test(sauber))) w('kopf-oder-fuss-fehlt', 'Kopf/Navigation oder Fußzeile fehlt', '<header> oder <nav> und <footer> verwenden.');

  for (const { a, roh } of tagsFinden(sauber, 'img')) {
    const quelle = (a.src || a['data-src'] || roh).slice(0, 70);
    if (!('alt' in a)) f('bild-ohne-alt', `Bild ohne alt: ${quelle}`, 'alt beschreiben, bei reiner Zierde alt="" setzen.');
    const hatMasse = a.width && a.height;
    const hatVerhaeltnis = /aspect-ratio/i.test(a.style || '');
    if (!hatMasse && !hatVerhaeltnis) w('bild-ohne-masse', `Bild ohne width und height: ${quelle}`, 'width und height oder aspect-ratio setzen, sonst springt das Layout beim Laden (CLS).');
  }

  // Felder und ihre Labels
  const labelFuer = new Set(tagsFinden(sauber, 'label').map((l) => l.a.for).filter(Boolean));
  const umschlossen = [...sauber.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/gi)].map((m) => m[1]);
  let umschlosseneFelder = 0;
  for (const inhalt of umschlossen) umschlosseneFelder += (inhalt.match(/<(input|select|textarea)\b/gi) || []).length;
  const felder = ['input', 'select', 'textarea'].flatMap((n) => tagsFinden(sauber, n).map((t) => ({ ...t, name: n })))
    .filter((t) => !['hidden', 'submit', 'button', 'image', 'reset'].includes((t.a.type || 'text').toLowerCase()));
  const ohneLabel = felder.filter((t) => !(t.a.id && labelFuer.has(t.a.id)) && !t.a['aria-label'] && !t.a['aria-labelledby']);
  // Umschliessende Labels zaehlen nur, soweit Felder darin stehen (ein Feld je Label ist der Normalfall).
  const unbelegt = Math.max(0, ohneLabel.length - umschlosseneFelder);
  if (unbelegt > 0) {
    f('feld-ohne-label', `${unbelegt} Eingabefeld${unbelegt > 1 ? 'er' : ''} ohne Label`, 'Sichtbares <label for> an jedes Feld. Ein Platzhalter ersetzt kein Label (06-conversion-architektur.md).');
  }

  // Fremdserver in Stil-, Skript- und Fontlinks
  const gefunden = new Set();
  for (const t of [...tagsFinden(sauber, 'link'), ...tagsFinden(sauber, 'script')]) {
    const url = t.a.href || t.a.src || '';
    const host = FREMDSERVER.find((h) => url.includes(h));
    if (host) gefunden.add(host);
  }
  if (/@import\s+url\([^)]*(fonts\.googleapis|fonts\.gstatic)/i.test(html)) gefunden.add('fonts.googleapis.com');
  for (const host of gefunden) {
    f('fremdserver', `Ressource von ${host}`, 'Schrift, Icons und Skripte lokal ausliefern. Der Besucher überträgt sonst seine IP an einen Dritten (07-recht-dsgvo.md).');
  }

  if (!keineIndexSeite) {
    if (!meta.some((m) => (m.property || m.name || '').toLowerCase() === 'og:image' && m.content)) w('og-image-fehlt', 'Kein og:image', 'Teilen-Bild 1200 mal 630 px (head-meta.html).');
    if (!meta.some((m) => (m.name || '').toLowerCase() === 'theme-color')) w('theme-color-fehlt', 'Keine theme-color', '<meta name="theme-color"> setzen.');
    if (!tagsFinden(sauber, 'link').some((l) => /\bicon\b/i.test(l.a.rel || ''))) w('favicon-fehlt', 'Kein Favicon', '<link rel="icon"> setzen.');
  }

  const tot = tagsFinden(sauber, 'a').filter((t) => 'href' in t.a && (t.a.href.trim() === '' || t.a.href.trim() === '#' || /^javascript:\s*(void\(0\))?;?$/i.test(t.a.href.trim())));
  if (tot.length) w('toter-link', `${tot.length} Link${tot.length > 1 ? 's' : ''} ohne Ziel (href="#" oder leer)`, 'Ein Ziel setzen oder statt des Links einen <button> verwenden.');

  return { fehler, warnungen };
}

function htmlSammeln(wurzel) {
  const liste = [];
  const gehe = (ordner) => {
    for (const name of readdirSync(ordner)) {
      const pfad = join(ordner, name);
      const s = statSync(pfad);
      if (s.isDirectory()) { if (name !== 'node_modules') gehe(pfad); }
      else if (extname(name).toLowerCase() === '.html') liste.push(pfad);
    }
  };
  gehe(wurzel);
  return liste;
}

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const ziel = args.filter((a) => !a.startsWith('--'))[0] || 'dist';
  if (!existsSync(ziel)) {
    console.error(`Nichts zu prüfen: ${ziel} existiert nicht. Erst bauen, dann prüfen.`);
    console.error('Aufruf: node scripts/pruefe-seitenbasis.mjs [dist] [--strict]');
    process.exit(2);
  }
  const fehler = [];
  const warnungen = [];
  const seiten = htmlSammeln(ziel);
  for (const datei of seiten) {
    const rel = relative(process.cwd(), datei);
    let inhalt;
    try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
    const r = seiteBasisAnalysieren(inhalt, datei);
    r.fehler.forEach((b) => fehler.push({ ...b, ort: rel }));
    r.warnungen.forEach((b) => warnungen.push({ ...b, ort: rel }));
  }
  console.log(`Geprüft: ${seiten.length} Seiten`);
  const ausgeben = (titel, liste) => {
    if (!liste.length) return;
    console.log(`\n${titel} (${liste.length})`);
    for (const b of liste) {
      console.log(`  ${b.ort}  [${b.regel}] ${b.meldung}`);
      console.log(`    → ${b.tipp}`);
    }
  };
  ausgeben('FEHLER', fehler);
  ausgeben('WARNUNGEN', warnungen);
  if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
  else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.${strict ? ' (--strict: Warnungen zählen)' : ''}`);
  console.log('Kontrast, Bewegung, Breakpoints und Tempo prüfen die anderen Skripte und ein Mensch: 47-claude-design-hacks.md, Abschnitt 6.');
  process.exit((strict ? fehler.length + warnungen.length : fehler.length) ? 1 : 0);
}

const istHauptprogramm = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (istHauptprogramm) main();
