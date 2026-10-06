#!/usr/bin/env node
/*
  pruefe-motion.mjs — findet in den Quellen die Bewegungsfehler, die sich zaehlen lassen.

  WARUM ES DIESES SKRIPT GIBT
  30-motion-pruefung.md verlangt, dass Bewegung begruendet, schnell, unterbrechbar und
  zugaenglich ist. Das meiste davon sieht man erst, wenn man es langsam abspielt. Ein Teil
  aber steht als Zeichenfolge im Code: ein "transition: all", ein Start bei scale(0), eine
  ease-in-Kurve an einem Menue. Diese Muster kehren in jedem Projekt zurueck, deshalb zaehlt
  sie hier eine Maschine, und der Mensch sieht sich nur noch an, was uebrig bleibt.

  WAS GEPRUEFT WIRD
  Je Quelldatei, Kommentare ausgenommen:
    1. transition: all (auch transition-all in Tailwind): FEHLER. Es animiert Eigenschaften,
       an die niemand gedacht hat.
    2. Start bei scale(0), scale: 0 oder scale-0: WARNUNG. Nichts verschwindet vollstaendig,
       Start bei 0.95 mit opacity.
    3. ease-in oder power*.in an einer Kurve: WARNUNG. Beginnt langsam, wenn hingesehen wird.
       Erlaubt fuer dekorative Austritte, dann mit "bewusst" im Kommentar davor.
    4. Layoutwerte in transition oder transition-property (width, height, margin, padding,
       top, left, right, bottom, max-height): WARNUNG. Layoutarbeit in jedem Frame.
    5. Dauer ueber 300 ms als feste Zahl (transition, animation, duration-500 und so weiter):
       WARNUNG. Nicht gemeldet wird, was ueber ein --dauer-Token laeuft, was als Dauerschleife
       (infinite) laeuft, und was mit "bewusst" im Kommentar davor oder in der Zeile steht.
    6. :hover mit transform, translate, scale, rotate oder animation ausserhalb von
       @media (hover: hover): WARNUNG. Auf Touchgeraeten bleibt der Hoverzustand haengen.
       Tailwind v4 klammert hover: selbst, deshalb betrifft das nur geschriebenes CSS.
  Je Projekt (alle geprueften Dateien zusammen):
    7. Es gibt Keyframes, animation, gsap oder ScrollTrigger, aber nirgends
       prefers-reduced-motion: FEHLER. Das ist die Pflicht aus 04-barrierefreiheit-bfsg.md.

  WAS NICHT GEPRUEFT WIRD
  Zweck, Haeufigkeit, Ursprung eines Popovers und Unterbrechbarkeit lassen sich aus dem Code
  nicht sicher ablesen. Sie stehen als Maßstab 1, 2, 5, 6, 9 und 10 im Review von
  30-motion-pruefung.md und werden angesehen, nicht gezaehlt.

  AUFRUF
    node scripts/pruefe-motion.mjs                  Standard: src
    node scripts/pruefe-motion.mjs src/styles src/components
    node scripts/pruefe-motion.mjs --strict         Warnungen zaehlen wie Fehler

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ENDUNGEN = new Set(['.astro', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte',
  '.ts', '.js', '.mjs', '.css', '.scss', '.pcss']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'dist', 'build', '.astro', '.next',
  '.output', '.cache', 'coverage', 'vendor', 'results']);

const LAYOUTWERTE = new Set(['width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
  'margin', 'padding', 'top', 'left', 'right', 'bottom', 'inset', 'gap']);
const GRENZE_MS = 300;

/* Ersetzt Kommentare durch Leerzeichen und behaelt die Zeilenumbrueche, damit Zeilennummern
   stimmen. // zaehlt nur am Zeilenanfang, sonst zerlegt es https://. */
function ohneKommentare(inhalt) {
  return inhalt
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/^[ \t]*\/\/.*$/gm, (m) => ' '.repeat(m.length));
}

/* Zeilen, vor denen oder in denen ein Kommentar mit "bewusst" steht. */
function bewussteZeilen(inhalt) {
  const erlaubt = new Set();
  const zeilen = inhalt.split('\n');
  zeilen.forEach((z, i) => {
    if (/bewusst/i.test(z) && /(\/\*|\*\/|\/\/|<!--|-->)/.test(z)) { erlaubt.add(i + 1); erlaubt.add(i + 2); }
  });
  /* Ein mehrzeiliger Kommentar: das "bewusst" steht in einer Zeile, der Kommentar endet spaeter. */
  const re = /\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g;
  let m;
  while ((m = re.exec(inhalt))) {
    if (!/bewusst/i.test(m[0])) continue;
    const ende = inhalt.slice(0, m.index + m[0].length).split('\n').length;
    erlaubt.add(ende); erlaubt.add(ende + 1);
  }
  return erlaubt;
}

function zeitInMs(zahl, einheit) {
  return einheit === 's' ? Number(zahl) * 1000 : Number(zahl);
}

/** Alle Zeitangaben einer Wertangabe, in Millisekunden. */
function zeiten(wert) {
  return [...wert.matchAll(/(?<![\w.-])(\d*\.?\d+)(ms|s)\b/g)].map((m) => zeitInMs(m[1], m[2]));
}

/**
 * Prueft eine Quelldatei. Liefert eine Liste { zeile, regel, schwere, meldung, tipp, auszug }.
 * schwere ist 'fehler' oder 'warnung'.
 */
export function motionAnalysieren(inhalt) {
  const befunde = [];
  const sauber = ohneKommentare(inhalt);
  const bewusst = bewussteZeilen(inhalt);
  const zeilen = sauber.split('\n');

  zeilen.forEach((zeile, i) => {
    const nr = i + 1;
    const melde = (regel, schwere, meldung, tipp) =>
      befunde.push({ zeile: nr, regel, schwere, meldung, tipp, auszug: zeile.trim().slice(0, 110) });

    // 1 transition: all
    if (/transition(?:-property)?\s*:\s*all\b/i.test(zeile) || /(^|[\s"'`])transition-all([\s"'`]|$)/.test(zeile)) {
      melde('transition-all', 'fehler', 'transition: all animiert jede Eigenschaft, auch die, an die niemand gedacht hat',
        'Die Eigenschaften einzeln nennen, zum Beispiel transition: transform var(--dauer-schnell) var(--kurve-eintritt).');
    }

    // 2 scale(0)
    if (/scale\(\s*0\s*[,)]/.test(zeile) || /\bscale\s*:\s*0\s*[,;}\s]/.test(zeile) || /(^|[\s"'`:])scale-0([\s"'`]|$)/.test(zeile)) {
      melde('scale-null', 'warnung', 'Start bei scale(0): nichts in der Wirklichkeit verschwindet vollständig',
        'Bei scale(0.95) mit opacity: 0 beginnen.');
    }

    // 3 ease-in
    if ((/(?<![\w-])ease-in(?![\w-])/.test(zeile) || /["']power\d\.in["']|["'](?:sine|expo|circ|back|quad|cubic|quart|quint)\.in["']/.test(zeile)) && !bewusst.has(nr)) {
      melde('ease-in', 'warnung', 'ease-in beginnt langsam, genau dann, wenn der Besucher hinsieht',
        'ease-out oder var(--kurve-eintritt). Für einen dekorativen Austritt bleibt es, wenn davor „bewusst" im Kommentar steht.');
    }

    // 4 Layoutwerte in transition
    const tr = zeile.match(/transition(?:-property)?\s*:\s*([^;{}]+)/i);
    if (tr) {
      const namen = tr[1].split(/[,\s]+/).map((n) => n.trim().toLowerCase()).filter((n) => LAYOUTWERTE.has(n));
      if (namen.length) {
        melde('layout-transition', 'warnung', `Layoutwert in transition: ${[...new Set(namen)].join(', ')}`,
          'Nur transform und opacity animieren. Für Höhenwechsel grid-template-rows von 0fr auf 1fr.');
      }
    }
    if (/(^|[\s"'`])transition-\[(width|height|margin|padding|top|left|right|bottom|max-height)\]/.test(zeile)) {
      melde('layout-transition', 'warnung', 'Layoutwert in transition (Tailwind)', 'Nur transform und opacity animieren.');
    }

    // 5 Dauer ueber 300 ms als feste Zahl
    if (!/\binfinite\b/.test(zeile) && !bewusst.has(nr)) {
      let lang = null;
      const kurz = zeile.match(/(?:^|[\s;{])(transition|animation)\s*:\s*([^;{}]+)/i);
      if (kurz && !/var\(\s*--dauer/i.test(kurz[2])) {
        const z = zeiten(kurz[2]);
        if (z.length && z[0] > GRENZE_MS) lang = z[0];
      }
      const einzeln = zeile.match(/(?:transition|animation)-duration\s*:\s*([^;{}]+)/i);
      if (einzeln && !/var\(/i.test(einzeln[1])) {
        const z = zeiten(einzeln[1]).filter((t) => t > GRENZE_MS);
        if (z.length) lang = z[0];
      }
      const tw = zeile.match(/(?:^|[\s"'`:])duration-(\d+)(?=[\s"'`]|$)/);
      if (tw && Number(tw[1]) > GRENZE_MS) lang = Number(tw[1]);
      if (lang) {
        melde('dauer-ueber-300', 'warnung', `Feste Dauer von ${Math.round(lang)} ms, bedienbare Elemente bleiben unter ${GRENZE_MS} ms`,
          'Ein --dauer-Token verwenden oder kürzen. Bei einer großen, nicht bedienten Fläche mit „bewusst" im Kommentar belassen.');
      }
    }
  });

  // 6 :hover mit Bewegung ausserhalb von @media (hover: hover)
  const stapel = [];
  let start = 0;
  for (let p = 0; p < sauber.length; p++) {
    const c = sauber[p];
    if (c === '{') {
      stapel.push({ kopf: sauber.slice(start, p).trim(), von: p + 1, kinder: [] });
      start = p + 1;
    } else if (c === '}') {
      const block = stapel.pop();
      if (block) {
        const eigen = sauber.slice(block.von, p);
        const imHover = stapel.some((b) => /@media[^{]*hover\s*:\s*hover/i.test(b.kopf)) || /@media[^{]*hover\s*:\s*hover/i.test(block.kopf);
        if (/:hover\b/.test(block.kopf) && !/^@/.test(block.kopf) && !imHover) {
          /* Nur die eigenen Deklarationen, nicht die verschachtelter Regeln mitzaehlen. */
          const nurEigen = eigen.replace(/\{[^{}]*\}/g, '');
          if (/(?:^|[;\s])(?:transform|translate|scale|rotate|animation)\s*:/i.test(nurEigen)) {
            const zeile = sauber.slice(0, block.von).split('\n').length;
            befunde.push({
              zeile, regel: 'hover-ohne-medienabfrage', schwere: 'warnung',
              meldung: 'Bewegung bei :hover ohne @media (hover: hover) and (pointer: fine)',
              tipp: 'In die Medienabfrage klammern. Auf Touchgeräten löst sonst ein Tipp einen hängenden Hoverzustand aus.',
              auszug: block.kopf.slice(0, 110),
            });
          }
        }
      }
      start = p + 1;
    } else if (c === ';') {
      start = p + 1;
    }
  }

  return befunde.sort((a, b) => a.zeile - b.zeile);
}

/**
 * Prueft, was nur im Ganzen sichtbar ist: gibt es Bewegung, dann braucht es irgendwo die
 * Reduzierung. dateien: [{ pfad, inhalt }]. Liefert eine Liste von Befunden ohne Zeile.
 */
export function projektAnalysieren(dateien) {
  const alles = dateien.map((d) => ohneKommentare(d.inhalt)).join('\n');
  const hatBewegung = /@keyframes|(?:^|[\s;{])animation\s*:|animation-name\s*:|animation-timeline|\bgsap\.|\bScrollTrigger\b/.test(alles);
  const hatReduktion = /prefers-reduced-motion|reduce-motion|motion-reduce:/.test(alles);
  if (hatBewegung && !hatReduktion) {
    return [{
      regel: 'keine-reduzierung', schwere: 'fehler',
      meldung: 'Es gibt Keyframes, animation, gsap oder ScrollTrigger, aber nirgends prefers-reduced-motion',
      tipp: 'Bewegung dämpfen, nicht streichen: Verschiebung und Skalierung weg, Deckkraft und Farbe bleiben. Siehe 09-motion-gsap.md.',
    }];
  }
  return [];
}

function dateienSammeln(pfad, liste = []) {
  let st;
  try { st = statSync(pfad); } catch { return liste; }
  if (st.isFile()) { if (ENDUNGEN.has(extname(pfad))) liste.push(pfad); return liste; }
  for (const name of readdirSync(pfad)) {
    if (UEBERSPRINGEN.has(name)) continue;
    dateienSammeln(join(pfad, name), liste);
  }
  return liste;
}

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const pfade = args.filter((a) => !a.startsWith('--'));
  const ziele = (pfade.length ? pfade : ['src']).filter(existsSync);

  if (!ziele.length) {
    console.error('Nichts zu prüfen. Erwartet src oder einen angegebenen Pfad.');
    console.error('Aufruf: node scripts/pruefe-motion.mjs [pfad ...]');
    process.exit(2);
  }

  const dateien = [];
  for (const z of ziele) {
    for (const d of dateienSammeln(z)) {
      try { dateien.push({ pfad: relative(process.cwd(), d), inhalt: readFileSync(d, 'utf8') }); } catch { /* unlesbar */ }
    }
  }

  const fehler = [];
  const warnungen = [];
  for (const d of dateien) {
    for (const b of motionAnalysieren(d.inhalt)) {
      (b.schwere === 'fehler' ? fehler : warnungen).push({ ...b, ort: `${d.pfad}:${b.zeile}` });
    }
  }
  for (const b of projektAnalysieren(dateien)) {
    (b.schwere === 'fehler' ? fehler : warnungen).push({ ...b, ort: 'Projekt' });
  }

  console.log(`Geprüft: ${dateien.length} Quelldateien`);
  const ausgeben = (titel, liste) => {
    if (!liste.length) return;
    console.log(`\n${titel} (${liste.length})`);
    for (const b of liste) {
      console.log(`  ${b.ort}  [${b.regel}] ${b.meldung}`);
      if (b.auszug) console.log(`    ${b.auszug}`);
      console.log(`    → ${b.tipp}`);
    }
  };
  ausgeben('FEHLER', fehler);
  ausgeben('WARNUNGEN', warnungen);

  const zaehlt = strict ? fehler.length + warnungen.length : fehler.length;
  if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
  else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.${strict ? ' (--strict: Warnungen zählen)' : ''}`);
  console.log('Der Rest des Reviews (Zweck, Ursprung, Unterbrechbarkeit) wird angesehen: 30-motion-pruefung.md § 6.');
  process.exit(zaehlt ? 1 : 0);
}

const istHauptprogramm = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (istHauptprogramm) main();
