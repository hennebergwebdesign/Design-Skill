#!/usr/bin/env node
/*
  pruefe-aktualitaet.mjs — findet Jahreszahlen, die eine Seite veraltet aussehen lassen.

  WARUM ES DIESES SKRIPT GIBT
  Ein Besucher liest ein Copyright von 2023 im Jahr 2026 als Zeichen, dass sich niemand mehr
  um die Seite kümmert. Das ist ein Urteil über den Betrieb, nicht über die Gestaltung, und es
  fällt schon vor dem ersten Absatz. Die Zahl ist fest im Markup geschrieben und wird von
  keinem Review bemerkt, weil sie zum Zeitpunkt des Baus stimmte.

  GEFUNDEN WERDEN
    Copyright-Jahr     © 2023 oder © 2019 bis 2023, wenn das letzte Jahr vor dem
                       laufenden liegt. Hart. Lösung: Jahr zur Laufzeit oder beim Build
                       setzen (new Date().getFullYear()), nicht eintippen.
    Stand-Angabe       „Stand: 2022", „Zuletzt aktualisiert 2021", wenn älter als das
                       Vorjahr. Hinweis: kann stimmen, dann steht dort besser ein Datum
                       aus dem Inhalt.
    Jahr im Titel      „Beste Tools 2023", „Preise 2022", wenn älter als das Vorjahr.
                       Hinweis: Das Jahr im Titel altert, der Titel bleibt.

  NICHT GEFUNDEN
    Gründungsjahre („seit 1998"), Veranstaltungsdaten, Jahre in Quellenangaben. Das Skript
    weiß nicht, welche Jahreszahl absichtlich fest ist, und meldet deshalb nur die drei
    Formen oben.

  AUFRUF
    node scripts/pruefe-aktualitaet.mjs [pfad ...]     Standard: dist, src, public
    node scripts/pruefe-aktualitaet.mjs --jahr 2026    laufendes Jahr festlegen (Tests)

  EXIT
    0 = nichts Hartes · 1 = veraltetes Copyright-Jahr · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ENDUNGEN = new Set(['.astro', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte',
  '.md', '.mdx', '.json', '.ts', '.js', '.txt', '.xml']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'build', '.astro', '.next', '.output',
  '.cache', 'coverage', 'vendor', 'results']);

const args = process.argv.slice(2);
const ji = args.indexOf('--jahr');
const jahr = ji >= 0 ? Number(args[ji + 1]) : new Date().getFullYear();
if (!Number.isInteger(jahr)) { console.error('--jahr braucht eine Zahl.'); process.exit(2); }
const pfade = args.filter((a, i) => !a.startsWith('--') && (ji < 0 || i !== ji + 1));

const STANDARD = ['dist', 'src', 'public'];
const wurzeln = (pfade.length ? pfade : STANDARD).filter(existsSync);
if (!wurzeln.length) {
  console.error('Kein Ordner gefunden. Erwartet einen von: ' + STANDARD.join(', '));
  process.exit(2);
}

const J = '(?:19|20)\\d\\d';
const MUSTER = [
  { art: 'Copyright-Jahr', hart: true,
    re: new RegExp(`(?:©|&copy;|\\(c\\)|copyright)\\s*(?:${J}\\s*(?:-|–|bis|to)\\s*)?(${J})`, 'gi'),
    ok: (y) => y >= jahr,
    tipp: 'Jahr zur Laufzeit oder beim Build setzen, nicht eintippen.' },
  { art: 'Stand-Angabe', hart: false,
    re: new RegExp(`(?:stand|zuletzt aktualisiert|letzte aktualisierung|aktualisiert)[^\\n\\d]{0,12}(?:\\d{1,2}\\.\\s*)?(?:\\d{1,2}\\.\\s*|[A-Za-zäöü]+\\s+)?(${J})`, 'gi'),
    ok: (y) => y >= jahr - 1,
    tipp: 'Prüfen, ob der Inhalt noch stimmt, dann das Datum ändern oder die Angabe entfernen.' },
  { art: 'Jahr im Titel', hart: false,
    re: new RegExp(`\\b(?:beste[nr]?|top\\s*\\d*|guide|trends?|preise?|ratgeber|vergleich|checkliste)\\b[^\\n.<>]{0,40}?\\b(${J})\\b`, 'gi'),
    ok: (y) => y >= jahr - 1,
    tipp: 'Jahr aus dem Titel nehmen oder den Inhalt prüfen. Das Jahr im Titel altert, der Titel bleibt.' },
];

function dateien(wurzel) {
  const out = [];
  const lauf = (p) => {
    let es; try { es = readdirSync(p, { withFileTypes: true }); } catch { return; }
    for (const e of es) {
      if (e.name.startsWith('.')) continue;
      const voll = join(p, e.name);
      if (e.isDirectory()) { if (!UEBERSPRINGEN.has(e.name)) lauf(voll); }
      else if (ENDUNGEN.has(extname(e.name))) out.push(voll);
    }
  };
  try { statSync(wurzel).isDirectory() ? lauf(wurzel) : out.push(wurzel); } catch {}
  return out;
}

const befunde = [];
let geprueft = 0;
for (const wurzel of wurzeln) {
  for (const datei of dateien(wurzel)) {
    let inhalt; try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
    geprueft++;
    const zeilen = inhalt.split('\n');
    zeilen.forEach((zeile, i) => {
      for (const m of MUSTER) {
        m.re.lastIndex = 0;
        let t;
        while ((t = m.re.exec(zeile))) {
          const y = Number(t[1]);
          if (!m.ok(y)) befunde.push({ art: m.art, hart: m.hart, y, datei: relative(process.cwd(), datei), zeile: i + 1, tipp: m.tipp });
        }
      }
    });
  }
}

for (const b of befunde) {
  console.log(`${b.hart ? 'FEHLER' : 'HINWEIS'}  ${b.art} ${b.y}  ${b.datei}:${b.zeile}\n         ${b.tipp}`);
}
const hart = befunde.filter((b) => b.hart).length;
console.log(`\n${geprueft} Dateien geprüft (Jahr ${jahr}): ${hart} harte Befunde, ${befunde.length - hart} Hinweise.`);
process.exit(hart ? 1 : 0);
