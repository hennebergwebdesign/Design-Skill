#!/usr/bin/env node
/*
  pruefe-striche.mjs — findet Gedankenstriche im Seitentext.

  WARUM ES DIESES SKRIPT GIBT
  Der Gedankenstrich als Satzzeichen ist das stärkste Erkennungsmerkmal maschinell
  geschriebener Texte, im Deutschen noch mehr als im Englischen:

      "Schnelle Websites — die auch Anfragen bringen"
      "Ihr Partner für Sanierung – zuverlässig, termingerecht"

  Beides liest sich sofort generiert. Eine Regel ohne Prüfung wird in Sitzung drei
  zurückgedreht, deshalb prüft das hier eine Maschine.

  WAS GEPRÜFT WIRD
    1. Halbgeviertstrich (–, U+2013) und Geviertstrich (—, U+2014) im Textinhalt.
       In Überschriften, Buttons und Links ist der Befund ein FEHLER,
       im Fließtext eine WARNUNG.
    2. hyphens: auto im CSS — trennt deutsche Komposita mitten im Wort
       ("Ethy-len", "Verschmut-zung").
    3. Verbotene Wörter aus marke.json → sprache.verbotene_woerter.

  WAS NICHT GEPRÜFT WIRD
    Der echte Bindestrich im Kompositum ("E-Mail-Adresse") bleibt erlaubt.
    Das Skript kennt ihn nicht als Befund.

  AUFRUF
    node scripts/pruefe-striche.mjs [pfad ...]        Standard: src content app pages
    node scripts/pruefe-striche.mjs --marke pfad/marke.json
    node scripts/pruefe-striche.mjs --strict          Warnungen zählen wie Fehler

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

const HALBGEVIERT = '–';
const GEVIERT = '—';
const MINUS = '−';
const STRICHE = [HALBGEVIERT, GEVIERT, MINUS];
const STRICH_NAME = { [HALBGEVIERT]: 'Halbgeviertstrich –', [GEVIERT]: 'Geviertstrich —', [MINUS]: 'Minuszeichen −' };

const TEXT_ENDUNGEN = new Set(['.astro', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.md', '.mdx', '.json', '.yaml', '.yml', '.ts', '.js']);
const CSS_ENDUNGEN = new Set(['.css', '.scss', '.pcss', '.astro', '.vue', '.svelte']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'dist', 'build', '.astro', '.next', '.output', '.cache', 'coverage', 'vendor']);

const args = process.argv.slice(2);
const strict = args.includes('--strict');
let markePfad = null;
const mi = args.indexOf('--marke');
if (mi !== -1) markePfad = args[mi + 1];
const pfade = args.filter((a, i) => !a.startsWith('--') && i !== mi + 1);

const STANDARD_PFADE = ['src', 'content', 'app', 'pages', 'components'];
const wurzeln = (pfade.length ? pfade : STANDARD_PFADE).filter(existsSync);

if (!wurzeln.length) {
  console.error('Kein Quellordner gefunden. Erwartet einen von: ' + STANDARD_PFADE.join(', '));
  console.error('Oder Pfad angeben: node scripts/pruefe-striche.mjs pfad/zum/ordner');
  process.exit(2);
}

/* Verbotene Wörter aus dem Markenbrief laden, wenn vorhanden. */
let verboteneWoerter = [];
let markeQuelle = null;
for (const kandidat of [markePfad, 'marke.json', 'src/marke.json', 'src/data/marke.json'].filter(Boolean)) {
  if (!existsSync(kandidat)) continue;
  try {
    const marke = JSON.parse(readFileSync(kandidat, 'utf8'));
    verboteneWoerter = (marke?.sprache?.verbotene_woerter ?? []).filter((w) => typeof w === 'string' && w.trim());
    markeQuelle = kandidat;
  } catch (e) {
    console.error(`Warnung: ${kandidat} ist kein gültiges JSON (${e.message}), Wortliste übersprungen.`);
  }
  break;
}

function dateienSammeln(wurzel) {
  const gefunden = [];
  const lauf = (p) => {
    let eintraege;
    try { eintraege = readdirSync(p, { withFileTypes: true }); } catch { return; }
    for (const e of eintraege) {
      if (e.name.startsWith('.') && e.name !== '.well-known') continue;
      const voll = join(p, e.name);
      if (e.isDirectory()) {
        if (!UEBERSPRINGEN.has(e.name)) lauf(voll);
      } else if (TEXT_ENDUNGEN.has(extname(e.name)) || CSS_ENDUNGEN.has(extname(e.name))) {
        gefunden.push(voll);
      }
    }
  };
  try { statSync(wurzel).isDirectory() ? lauf(wurzel) : gefunden.push(wurzel); } catch {}
  return gefunden;
}

/*
  Kontextbewertung. Ein Strich in einer Überschrift oder einem Button ist ein Fehler,
  im Fließtext eine Warnung: dort ist er manchmal ein Zitat oder ein Bereichsstrich
  ("10–12 Uhr"), und das soll ein Mensch entscheiden.
*/
const HART = [
  { re: /<h[1-6][^>]*>/i, was: 'Überschrift' },
  { re: /<button[^>]*>/i, was: 'Button' },
  { re: /<a\b[^>]*>/i, was: 'Link' },
  { re: /\b(title|headline|subheadline|ueberschrift|titel|cta|buttontext|label|alt|aria-label)\s*[:=]/i, was: 'Titel- oder Buttonfeld' },
  { re: /^\s{0,3}#{1,6}\s/, was: 'Markdown-Überschrift' },
];

function kontext(zeile) {
  for (const h of HART) if (h.re.test(zeile)) return h.was;
  return null;
}

/* Bereichsangaben sind legitim: 10–12, 2013–2026, 5–7 Tage. */
const BEREICH = new RegExp(`\\d\\s?[${HALBGEVIERT}${GEVIERT}]\\s?\\d`);

const fehler = [];
const warnungen = [];
let dateienGeprueft = 0;

for (const wurzel of wurzeln) {
  for (const datei of dateienSammeln(wurzel)) {
    let inhalt;
    try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
    dateienGeprueft++;
    const rel = relative(process.cwd(), datei);
    const zeilen = inhalt.split('\n');
    const istCss = CSS_ENDUNGEN.has(extname(datei));

    zeilen.forEach((zeile, i) => {
      const nr = i + 1;

      /* 1 Gedankenstriche */
      for (const s of STRICHE) {
        if (!zeile.includes(s)) continue;
        const ort = kontext(zeile);
        const nurBereich = BEREICH.test(zeile) && (zeile.match(new RegExp(`[${HALBGEVIERT}${GEVIERT}${MINUS}]`, 'g')) || []).length === (zeile.match(new RegExp(BEREICH, 'g')) || []).length;
        if (nurBereich && !ort) continue;
        const befund = {
          datei: rel, zeile: nr, auszug: zeile.trim().slice(0, 110),
          meldung: `${STRICH_NAME[s]}${ort ? ` in ${ort}` : ' im Text'}`,
          tipp: 'Ersatz: Doppelpunkt, Komma oder zwei Sätze.',
        };
        (ort ? fehler : warnungen).push(befund);
      }

      /* 2 hyphens: auto */
      if (istCss && /hyphens\s*:\s*(auto|manual)/i.test(zeile) && !/hyphens\s*:\s*none/i.test(zeile)) {
        fehler.push({
          datei: rel, zeile: nr, auszug: zeile.trim().slice(0, 110),
          meldung: 'hyphens: auto trennt deutsche Komposita mitten im Wort',
          tipp: 'Stattdessen overflow-wrap: break-word plus text-wrap: pretty.',
        });
      }

      /* 3 Verbotene Wörter */
      for (const w of verboteneWoerter) {
        const re = new RegExp(`(^|[^\\p{L}])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'iu');
        if (re.test(zeile)) {
          warnungen.push({
            datei: rel, zeile: nr, auszug: zeile.trim().slice(0, 110),
            meldung: `Verbotenes Wort aus marke.json: „${w}"`,
            tipp: 'Konkret benennen, was gemeint ist.',
          });
        }
      }
    });
  }
}

function ausgeben(titel, liste) {
  if (!liste.length) return;
  console.log(`\n${titel} (${liste.length})`);
  for (const b of liste) {
    console.log(`  ${b.datei}:${b.zeile}  ${b.meldung}`);
    console.log(`    ${b.auszug}`);
    console.log(`    → ${b.tipp}`);
  }
}

console.log(`Geprüft: ${dateienGeprueft} Dateien in ${wurzeln.join(', ')}`);
if (markeQuelle) console.log(`Wortliste aus ${markeQuelle}: ${verboteneWoerter.length} Einträge`);
else console.log('Keine marke.json gefunden, Wortprüfung übersprungen.');

ausgeben('FEHLER', fehler);
ausgeben('WARNUNGEN', warnungen);

const zaehlt = strict ? fehler.length + warnungen.length : fehler.length;
if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.${strict ? ' (--strict: Warnungen zählen)' : ''}`);
process.exit(zaehlt ? 1 : 0);
