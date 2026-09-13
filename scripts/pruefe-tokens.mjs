#!/usr/bin/env node
/*
  pruefe-tokens.mjs — findet hartcodierte Farb- und Abstandswerte im Komponentencode.

  WARUM ES DIESES SKRIPT GIBT
  Die Regel aus 10-visuelle-richtung.md heißt: kein Farb- oder Größenwert im
  Komponentencode ohne Token. Kommt eine Komponente mit einem eigenen Wert, fehlt
  entweder ein Token oder die Komponente irrt sich.

  Ohne Prüfung sammelt ein Projekt in drei Wochen vierzehn Grautöne, und keiner
  davon ist der aus der Palette.

  WAS GEMELDET WIRD
    1. Hex-Farben, rgb(), rgba(), hsl() im Komponentencode
    2. px- und rem-Abstände bei margin, padding, gap, inset, top/right/bottom/left
    3. font-size mit festem Wert
    4. Abstandswerte, die nicht auf der Skala aus marke.json liegen

  WAS ERLAUBT IST UND NICHT GEMELDET WIRD
    - 0 und 0px          keine Abstandsentscheidung
    - 1px und 2px        Haarlinien, Rahmen, Outline-Offsets
    - 100%, auto, inherit, Prozentwerte, ch, ex, vw, vh, svh, dvh, cqi
    - alles in var(...)
    - alles in derselben Zeile wie ein Kommentar mit dem Wort "bewusst"
      → so werden optische Korrekturen (15-spacing-rhythmus.md, Regel 5) begründet
    - die Tokendatei selbst und die globale Basis

  AUFRUF
    node scripts/pruefe-tokens.mjs [pfad ...]
    node scripts/pruefe-tokens.mjs --marke pfad/marke.json
    node scripts/pruefe-tokens.mjs --nur-farbe

  EXIT
    0 = kein Befund · 1 = Befund · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

const ENDUNGEN = new Set(['.css', '.scss', '.pcss', '.astro', '.vue', '.svelte', '.jsx', '.tsx']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'dist', 'build', '.astro', '.next', '.output', '.cache', 'coverage', 'vendor']);
/* Diese Dateien DÜRFEN rohe Werte enthalten: sie definieren die Tokens. */
const AUSGENOMMEN = new Set(['tokens.css', 'global-basis.css', 'global.css', 'reset.css', 'theme.css']);

const args = process.argv.slice(2);
const nurFarbe = args.includes('--nur-farbe');
let markePfad = null;
const mi = args.indexOf('--marke');
if (mi !== -1) markePfad = args[mi + 1];
const pfade = args.filter((a, i) => !a.startsWith('--') && i !== mi + 1);

const STANDARD_PFADE = ['src', 'app', 'components', 'pages'];
const wurzeln = (pfade.length ? pfade : STANDARD_PFADE).filter(existsSync);
if (!wurzeln.length) {
  console.error('Kein Quellordner gefunden. Erwartet einen von: ' + STANDARD_PFADE.join(', '));
  process.exit(2);
}

/* Erlaubte Abstandswerte aus der Skala des Markenbriefs. */
let skalaPx = [0, 1, 2];
let markeQuelle = null;
for (const k of [markePfad, 'marke.json', 'src/marke.json', 'src/data/marke.json'].filter(Boolean)) {
  if (!existsSync(k)) continue;
  try {
    const m = JSON.parse(readFileSync(k, 'utf8'));
    const skala = m?.raum?.skala;
    if (Array.isArray(skala)) { skalaPx = [0, 1, 2, ...skala]; markeQuelle = k; }
  } catch {}
  break;
}
const skalaRem = skalaPx.map((v) => v / 16);

const ABSTANDS_EIGENSCHAFTEN = /\b(margin|padding|gap|row-gap|column-gap|inset|top|right|bottom|left)(-(block|inline)(-(start|end))?|-(top|right|bottom|left))?\s*:/i;
const FARBWERT = /(#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(|\boklch\s*\()/i;
const FONT_SIZE = /\bfont-size\s*:\s*([0-9.]+)(px|rem)/i;
const LAENGE = /(-?[0-9]*\.?[0-9]+)(px|rem)/g;

function dateien(wurzel) {
  const out = [];
  const lauf = (p) => {
    let es; try { es = readdirSync(p, { withFileTypes: true }); } catch { return; }
    for (const e of es) {
      if (e.name.startsWith('.')) continue;
      const voll = join(p, e.name);
      if (e.isDirectory()) { if (!UEBERSPRINGEN.has(e.name)) lauf(voll); }
      else if (ENDUNGEN.has(extname(e.name)) && !AUSGENOMMEN.has(e.name)) out.push(voll);
    }
  };
  try { statSync(wurzel).isDirectory() ? lauf(wurzel) : out.push(wurzel); } catch {}
  return out;
}

function aufSkala(zahl, einheit) {
  const liste = einheit === 'px' ? skalaPx : skalaRem;
  return liste.some((v) => Math.abs(v - Math.abs(zahl)) < 0.001);
}

const befunde = [];
let dateienGeprueft = 0;

for (const wurzel of wurzeln) {
  for (const datei of dateien(wurzel)) {
    let inhalt; try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
    dateienGeprueft++;
    const rel = relative(process.cwd(), datei);

    inhalt.split('\n').forEach((zeile, i) => {
      const nr = i + 1;
      /* Bewusste Abweichungen sind begründet und werden nicht gemeldet. */
      if (/bewusst/i.test(zeile)) return;
      /* Deklarationen, die schon ein Token benutzen, sind in Ordnung. */
      const ohneVar = zeile.replace(/var\([^)]*\)/g, 'VAR');

      /* 1 Farben */
      if (FARBWERT.test(ohneVar)) {
        const treffer = ohneVar.match(FARBWERT)[0];
        /* transparent und currentColor sind keine Farbentscheidungen. */
        if (!/^(#0000|#00000000)$/i.test(treffer)) {
          befunde.push({
            datei: rel, zeile: nr, art: 'Farbe',
            auszug: zeile.trim().slice(0, 100),
            meldung: `Roher Farbwert ${treffer.replace(/\s*\($/, '(…)')}`,
            tipp: 'Auf eine Rolle aus tokens.css umstellen (--farbe-text, --farbe-akzent, …). Fehlt die Rolle, gehört sie in tokens.css und in marke.json.',
          });
        }
      }
      if (nurFarbe) return;

      /* 2 Abstände */
      if (ABSTANDS_EIGENSCHAFTEN.test(ohneVar)) {
        for (const m of ohneVar.matchAll(LAENGE)) {
          const zahl = parseFloat(m[1]);
          const einheit = m[2];
          if (zahl === 0) continue;
          /* In px umrechnen, bevor gegen die 2px-Grenze geprüft wird:
             1.5rem sind 24px und damit eine Abstandsentscheidung, auch wenn
             die Rohzahl 1.5 unter 2 liegt. */
          const px = einheit === 'rem' ? zahl * 16 : zahl;
          if (!aufSkala(zahl, einheit)) {
            befunde.push({
              datei: rel, zeile: nr, art: 'Abstand',
              auszug: zeile.trim().slice(0, 100),
              meldung: `${m[0]} liegt nicht auf der Raumskala`,
              tipp: 'Token aus tokens.css nehmen (--raum-*). Ist die Abweichung optisch begründet, das Wort "bewusst" in den Kommentar der Zeile schreiben, siehe 15-spacing-rhythmus.md Regel 5.',
            });
          } else if (Math.abs(px) > 2) {
            befunde.push({
              datei: rel, zeile: nr, art: 'Abstand',
              auszug: zeile.trim().slice(0, 100),
              meldung: `${m[0]} ist ein Skalenwert, aber hartcodiert`,
              tipp: 'Als Token schreiben, damit eine Änderung an einer Stelle wirkt.',
            });
          }
        }
      }

      /* 3 font-size */
      const fs = ohneVar.match(FONT_SIZE);
      if (fs) {
        befunde.push({
          datei: rel, zeile: nr, art: 'Schriftgröße',
          auszug: zeile.trim().slice(0, 100),
          meldung: `font-size: ${fs[1]}${fs[2]} ohne Token`,
          tipp: 'Stufe aus tokens.css nehmen (--text-*). Die Skala ist zweistufig, damit Schriften zwischen 768 und 1200 px nicht zu schnell wachsen.',
        });
      }
    });
  }
}

console.log(`Geprüft: ${dateienGeprueft} Dateien in ${wurzeln.join(', ')}`);
console.log(markeQuelle ? `Raumskala aus ${markeQuelle}: ${skalaPx.slice(3).join(', ')} px` : 'Keine marke.json gefunden, Standardskala angenommen.');

const nachArt = {};
for (const b of befunde) (nachArt[b.art] ??= []).push(b);
for (const [art, liste] of Object.entries(nachArt)) {
  console.log(`\n${art.toUpperCase()} (${liste.length})`);
  for (const b of liste) {
    console.log(`  ${b.datei}:${b.zeile}  ${b.meldung}`);
    console.log(`    ${b.auszug}`);
    console.log(`    → ${b.tipp}`);
  }
}

console.log(befunde.length ? `\n${befunde.length} Befunde.` : '\nKein Befund.');
process.exit(befunde.length ? 1 : 0);
