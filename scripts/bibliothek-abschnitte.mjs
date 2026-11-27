#!/usr/bin/env node
/*
  bibliothek-abschnitte.mjs — der Baukasten der Template Bibliothek: Abschnitte einzeln finden.

  WARUM ES DIESES SKRIPT GIBT
  Eine Vorlage ist eine ganze Seite, gebraucht wird oft nur ein Abschnitt: "nimm von dieser Seite
  den Held, von jener die FAQ". Jede Vorlage ab t112 liefert dafür ABSCHNITTE.json (Kennung,
  Kategorie, Selektor, Prinzip, CSS, JS, Hinweis zum Herauslösen). Dieses Skript liest sie und
  beantwortet die Frage, ohne dass jemand vierzig Ordner durchsucht.

  AUFRUF
    node scripts/bibliothek-abschnitte.mjs --kategorie faq            alle FAQ Abschnitte aller Vorlagen
    node scripts/bibliothek-abschnitte.mjs --seite t113               alle Abschnitte einer Vorlage
    node scripts/bibliothek-abschnitte.mjs --seite t113 --abschnitt faq   ein Abschnitt mit Herauslöse Hinweis
    node scripts/bibliothek-abschnitte.mjs --schreiben                schreibt ABSCHNITTE.md (Übersicht)
    node scripts/bibliothek-abschnitte.mjs --pruefen                  prüft alle ABSCHNITTE.json

  EXIT
    0 = sauber · 1 = Befunde · 2 = Aufrufproblem
*/

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const BIB = join(WURZEL, 'skills', 'webdesign-conversion', 'assets', 'vorlagen', 'bibliothek');
const TAXONOMIE = join(WURZEL, 'skills', 'webdesign-conversion', 'assets', 'musterbibliothek', 'taxonomie.json');

const PFLICHT = ['id', 'name', 'kategorie', 'selektor', 'prinzip', 'css'];

const args = process.argv.slice(2);
const wert = (n) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null;
};

export function seitenLaden(bib = BIB) {
  const seiten = [];
  for (const ordner of readdirSync(bib).filter((d) => /^t\d{2,3}$/.test(d)).sort()) {
    const datei = join(bib, ordner, 'ABSCHNITTE.json');
    if (!existsSync(datei)) continue;
    let abschnitte;
    try {
      abschnitte = JSON.parse(readFileSync(datei, 'utf8'));
    } catch (e) {
      seiten.push({ seite: ordner, fehler: `ABSCHNITTE.json nicht lesbar: ${e.message}`, abschnitte: [] });
      continue;
    }
    let karte = {};
    try {
      karte = JSON.parse(readFileSync(join(bib, ordner, 'KARTE.json'), 'utf8'));
    } catch { /* KARTE.json fehlt, wird in --pruefen gemeldet */ }
    seiten.push({ seite: ordner, name: karte.name ?? ordner, referenz: karte.referenz ?? '', abschnitte });
  }
  return seiten;
}

export function pruefen(seiten, kategorien, bib = BIB) {
  const befunde = [];
  for (const s of seiten) {
    if (s.fehler) { befunde.push(`${s.seite}: ${s.fehler}`); continue; }
    if (!Array.isArray(s.abschnitte) || s.abschnitte.length === 0) befunde.push(`${s.seite}: keine Abschnitte`);
    const ids = new Set();
    const htmls = {};
    const laden = (datei) => (htmls[datei] ??= existsSync(join(bib, s.seite, datei)) ? readFileSync(join(bib, s.seite, datei), 'utf8') : '');
    for (const a of s.abschnitte) {
      const html = laden(a.datei ?? 'index.html');
      for (const f of PFLICHT) if (!a[f]) befunde.push(`${s.seite}/${a.id ?? '?'}: Feld ${f} fehlt`);
      const schluessel = `${a.datei ?? 'index.html'}#${a.id}`;
      if (ids.has(schluessel)) befunde.push(`${s.seite}: Kennung ${a.id} doppelt`);
      ids.add(schluessel);
      if (kategorien && a.kategorie && !kategorien.includes(a.kategorie)) befunde.push(`${s.seite}/${a.id}: Kategorie ${a.kategorie} nicht in taxonomie.json`);
      if (html && a.id && !html.includes(`data-abschnitt="${a.id}"`)) befunde.push(`${s.seite}/${a.id}: data-abschnitt="${a.id}" steht nicht in ${a.datei ?? 'index.html'}`);
    }
  }
  return befunde;
}

export function uebersicht(seiten) {
  const z = [];
  z.push('# Baukasten: Abschnitte der Vorlagen');
  z.push('');
  z.push('Erzeugt von `scripts/bibliothek-abschnitte.mjs --schreiben`, nicht von Hand pflegen. Quelle ist je Vorlage die Datei `ABSCHNITTE.json`.');
  z.push('Auswahl: Vorlage und Kennung nennen ("t113, faq"), das Skript liefert Selektor, CSS, JS und Hinweis zum Herauslösen.');
  z.push('Ein Abschnitt wird als Prinzip übernommen und in die Marke des Kunden gesetzt (`marke.css`), nicht mit Text, Bild oder Farbe der Vorlage.');
  z.push('');
  const nachKat = {};
  for (const s of seiten) for (const a of s.abschnitte ?? []) (nachKat[a.kategorie] ??= []).push({ ...a, seite: s.seite, seitenname: s.name });
  z.push('## Nach Kategorie');
  z.push('');
  for (const k of Object.keys(nachKat).sort()) {
    z.push(`### ${k}`);
    z.push('');
    z.push('| Vorlage | Kennung | Prinzip |');
    z.push('|---|---|---|');
    for (const a of nachKat[k]) z.push(`| ${a.seite} ${a.seitenname} | \`${a.id}\` | ${String(a.prinzip).replace(/\|/g, '/')} |`);
    z.push('');
  }
  z.push('## Nach Vorlage');
  z.push('');
  for (const s of seiten) {
    z.push(`### ${s.seite} ${s.name}`);
    z.push('');
    if (s.referenz) z.push(`Referenz: ${s.referenz}`, '');
    z.push(s.abschnitte.map((a) => `\`${a.id}\` (${a.kategorie})${a.datei ? ` in ${a.datei}` : ''}`).join(', '));
    z.push('');
  }
  return z.join('\n');
}

function main() {
  const seiten = seitenLaden();
  const kategorien = existsSync(TAXONOMIE) ? Object.keys(JSON.parse(readFileSync(TAXONOMIE, 'utf8')).kategorien) : null;

  if (args.includes('--pruefen')) {
    const b = pruefen(seiten, kategorien);
    for (const x of b) console.log('Befund: ' + x);
    console.log(`${seiten.length} Vorlagen mit Abschnitten, ${b.length} Befunde.`);
    process.exit(b.length ? 1 : 0);
  }
  if (args.includes('--schreiben')) {
    writeFileSync(join(BIB, 'ABSCHNITTE.md'), uebersicht(seiten) + '\n');
    console.log(`ABSCHNITTE.md geschrieben (${seiten.length} Vorlagen).`);
    return;
  }
  const kat = wert('--kategorie');
  const seite = wert('--seite');
  const abschnitt = wert('--abschnitt');
  if (!kat && !seite) {
    console.error('Aufruf: --kategorie <name> | --seite <tNNN> [--abschnitt <kennung>] | --schreiben | --pruefen');
    process.exit(2);
  }
  let treffer = 0;
  for (const s of seiten) {
    if (seite && s.seite !== seite) continue;
    for (const a of s.abschnitte) {
      if (kat && a.kategorie !== kat) continue;
      if (abschnitt && a.id !== abschnitt) continue;
      treffer++;
      console.log(`${s.seite} ${s.name}  ·  ${a.id}  (${a.kategorie})${a.datei ? '  in ' + a.datei : ''}`);
      console.log(`  Prinzip:  ${a.prinzip}${a.prinzip_quelle === 'kategorie-standard' ? '  [Standardsatz, keine Analyse dieses Abschnitts]' : ''}`);
      if (abschnitt || seite) {
        console.log(`  Selektor: ${a.selektor}`);
        console.log(`  CSS:      ${a.css}`);
        console.log(`  JS:       ${a.js ?? 'keines'}`);
        console.log(`  Hinweis:  ${a.hinweis ?? ''}`);
      }
    }
  }
  if (!treffer) { console.error('Nichts gefunden.'); process.exit(1); }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
