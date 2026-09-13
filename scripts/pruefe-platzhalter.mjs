#!/usr/bin/env node
/*
  pruefe-platzhalter.mjs — findet, was vor dem Livegang noch offen ist.

  WARUM ES DIESES SKRIPT GIBT
  Die harte Grenze aus SKILL.md verlangt: fehlt ein Wert, steht dort ein sichtbarer
  Platzhalter [[FEHLT: …]] und niemals ein plausibel klingender Erfindungswert. Das
  funktioniert nur, wenn die Platzhalter auch tatsaechlich alle wieder verschwinden.

  Ein [[FEHLT: Bewertungszahl]], das live geht, ist peinlich. Ein
  data-copy-vorschlag, das live geht, zeigt dem Besucher einen roten Rahmen mit
  "Copy-Vorschlag, mit Kunde abstimmen".

  GEFUNDEN WERDEN
    [[FEHLT: …]]              offener Wert, muss gefuellt oder das Element entfernt werden
    [[BESTÄTIGEN: …]]         Angabe, die der Kunde bestaetigen muss
    [[…]]                     jeder andere Platzhalter dieser Form
    data-copy-vorschlag       Entwicklungsmarkierung fuer noch abzustimmende Texte
    TODO, FIXME, XXX, HACK    in Seitenquellen
    lorem ipsum               Blindtext
    beispiel.de, example.com  Platzhalterdomains
    +49 123, 0123 456789      Platzhaltertelefonnummern

  AUFRUF
    node scripts/pruefe-platzhalter.mjs [pfad ...]
    node scripts/pruefe-platzhalter.mjs --launch    strenger Modus fuer den Livegang

  Im Launch-Modus zaehlt jeder Befund als Fehler. Im Normalmodus sind offene
  Platzhalter waehrend der Arbeit erwartbar und werden nur gezaehlt.

  EXIT
    0 = bereit (bzw. nur Hinweise) · 1 = Befunde im Launch-Modus · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ENDUNGEN = new Set(['.astro', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte',
  '.md', '.mdx', '.json', '.ts', '.js', '.css', '.txt', '.xml']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'dist', 'build', '.astro', '.next',
  '.output', '.cache', 'coverage', 'vendor', 'results']);
/* Vorlagen SOLLEN Platzhalter enthalten, das ist ihr Zweck. */
const AUSGENOMMEN = /(^|[\/\\])(vorlagen|templates)([\/\\]|$)/;

const args = process.argv.slice(2);
const launch = args.includes('--launch');
const pfade = args.filter((a) => !a.startsWith('--'));

const STANDARD = ['src', 'app', 'content', 'pages', 'public'];
const wurzeln = (pfade.length ? pfade : STANDARD).filter(existsSync);
if (!wurzeln.length) {
  console.error('Kein Quellordner gefunden. Erwartet einen von: ' + STANDARD.join(', '));
  process.exit(2);
}

const MUSTER = [
  { re: /\[\[\s*FEHLT\s*:?([^\]]*)\]\]/gi,    art: 'FEHLT',        hart: true,
    tipp: 'Wert einsetzen, oder das Element entfernen. Kein Erfindungswert.' },
  { re: /\[\[\s*BEST(?:Ä|AE)TIGEN\s*:?([^\]]*)\]\]/gi, art: 'BESTÄTIGEN', hart: true,
    tipp: 'Vom Kunden bestätigen lassen und eintragen.' },
  { re: /\[\[(?![\s]*(?:FEHLT|BEST))([^\]]+)\]\]/g, art: 'Platzhalter', hart: true,
    tipp: 'Platzhalter auflösen.' },
  { re: /data-copy-vorschlag/g,               art: 'Copy-Vorschlag', hart: true,
    tipp: 'Text mit dem Kunden abstimmen, dann das Attribut entfernen. Es ist auf der Seite sichtbar.' },
  { re: /\b(TODO|FIXME|XXX|HACK)\b/g,         art: 'TODO',         hart: false,
    tipp: 'Erledigen oder in die Liste offener Punkte übernehmen.' },
  { re: /lorem\s+ipsum/gi,                    art: 'Blindtext',    hart: true,
    tipp: 'Echten Text einsetzen.' },
  { re: /\b(?:www\.)?(?:beispiel\.de|example\.(?:com|org|net)|musterfirma\.de)\b/gi,
    art: 'Platzhalterdomain', hart: true, tipp: 'Echte Domain eintragen.' },
  { re: /(\+49\s?123\b|\b0123[\s/-]?456789\b|\b0000\b)/g, art: 'Platzhalternummer', hart: true,
    tipp: 'Echte Telefonnummer eintragen.' },
  { re: /\bJJJJ-MM-TT\b|\[\[DATUM\]\]/g,      art: 'Platzhalterdatum', hart: true,
    tipp: 'Datum setzen.' },
];

function dateien(wurzel) {
  const out = [];
  const lauf = (p) => {
    let es; try { es = readdirSync(p, { withFileTypes: true }); } catch { return; }
    for (const e of es) {
      if (e.name.startsWith('.')) continue;
      const voll = join(p, e.name);
      if (e.isDirectory()) { if (!UEBERSPRINGEN.has(e.name)) lauf(voll); }
      else if (ENDUNGEN.has(extname(e.name)) && !AUSGENOMMEN.test(voll)) out.push(voll);
    }
  };
  try { statSync(wurzel).isDirectory() ? lauf(wurzel) : out.push(wurzel); } catch {}
  return out;
}

const nachArt = new Map();
let dateienGeprueft = 0;

for (const wurzel of wurzeln) {
  for (const datei of dateien(wurzel)) {
    let inhalt; try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
    dateienGeprueft++;
    const rel = relative(process.cwd(), datei);
    inhalt.split('\n').forEach((zeile, i) => {
      for (const m of MUSTER) {
        m.re.lastIndex = 0;
        if (!m.re.test(zeile)) continue;
        if (!nachArt.has(m.art)) nachArt.set(m.art, { hart: m.hart, tipp: m.tipp, funde: [] });
        nachArt.get(m.art).funde.push({ datei: rel, zeile: i + 1, text: zeile.trim().slice(0, 100) });
      }
    });
  }
}

console.log(`Geprüft: ${dateienGeprueft} Dateien in ${wurzeln.join(', ')}`);
console.log(launch ? 'Modus: Livegang, jeder Befund ist ein Fehler.\n'
                   : 'Modus: Arbeit. Mit --launch zählt jeder Befund als Fehler.\n');

let hart = 0, weich = 0;
for (const [art, d] of nachArt) {
  console.log(`${art} (${d.funde.length})`);
  for (const f of d.funde.slice(0, 25)) console.log(`  ${f.datei}:${f.zeile}  ${f.text}`);
  if (d.funde.length > 25) console.log(`  … und ${d.funde.length - 25} weitere`);
  console.log(`  → ${d.tipp}\n`);
  d.hart ? (hart += d.funde.length) : (weich += d.funde.length);
}

if (!nachArt.size) {
  console.log('Kein offener Platzhalter. Bereit für den Livegang, soweit dieses Skript sieht.');
} else {
  console.log(`${hart} auflösungspflichtige Befunde, ${weich} ${weich === 1 ? 'Hinweis' : 'Hinweise'}.`);
  if (!launch && hart) console.log('Vor dem Livegang erneut mit --launch laufen lassen.');
}

process.exit(launch && hart ? 1 : 0);
