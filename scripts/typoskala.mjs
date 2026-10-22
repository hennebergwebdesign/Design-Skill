#!/usr/bin/env node
/*
  typoskala.mjs — rechnet eine fließende, modulare Typoskala in rem aus und schreibt sie als
  Tokens im Format von assets/vorlagen/tokens.css.

  WARUM ES DIESES SKRIPT GIBT
  Von Hand gesetzte clamp()-Werte sehen plausibel aus und stimmen selten: eine Stufe wächst
  schneller als die darüber, das Verhältnis zwischen h2 und h3 ist auf dem Handy ein anderes
  als auf dem Desktop, und niemand kann sagen, warum h1 genau 3.25rem ist. Eine Skala aus
  Grundgröße und Verhältnis je Fensterbreite macht jede Stufe ableitbar und jede Änderung zu
  einer Änderung an zwei Zahlen statt an neun.

  VERFAHREN (nach Utopia, utopia.fyi)
  An jedem Stützpunkt (Fensterbreite) gelten eine Grundgröße und ein Verhältnis. Stufe n hat
  dort die Größe Grundgröße × Verhältnis^n. Zwischen zwei Stützpunkten wird linear
  interpoliert, das ergibt clamp(min, a rem + b vw, max). Der rem-Anteil in der Mitte ist
  Pflicht: ein reiner vw-Wert wächst beim Zoomen nicht mit (WCAG 1.4.4).
  Mit drei Stützpunkten entstehen zwei Kurven: die erste in :root, die zweite in einer
  Media Query ab dem mittleren Stützpunkt. Grund steht in tokens.css und
  55-typografie-system.md (Heldenzeile zwischen 768 und 1200 px).

  PRÜFUNGEN BEIM RECHNEN
    Boden:      keine Stufe unter --boden (Voreinstellung 14 px), sie wird angehoben.
    Zoomgrenze: größter Wert ÷ kleinster Wert einer Stufe über alle Stützpunkte höchstens 2,5.
                Darüber lässt sich Text nicht in jedem Fenster auf 200 % vergrößern, weil
                Browser höchstens 500 % zoomen und der vw-Anteil nicht mitwächst.
                Herleitung: Maxwell Barvian, Smashing Magazine 2023, „Addressing
                Accessibility Concerns With Using Fluid Type".
    Ordnung:    jede Stufe ist an jedem Stützpunkt größer als die darunter.

  AUFRUF
    node scripts/typoskala.mjs                                   Voreinstellung des Plugins
    node scripts/typoskala.mjs --fenster 360,1200,1440 --basis 16,17,18 --verhaeltnis 1.2,1.333,1.414
    node scripts/typoskala.mjs --stufen "text-base:0,text-h2:3,text-display:5"
    node scripts/typoskala.mjs --json
    node scripts/typoskala.mjs --vorschau typo-vorschau.html    zusätzlich ein Musterblatt

  EXIT
    0 = erzeugt, keine Grenze verletzt · 1 = erzeugt, aber Zoomgrenze oder Ordnung verletzt
    2 = Aufrufproblem
*/

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const VOREINSTELLUNG = {
  fenster: [360, 1200, 1440],
  basis: [16, 17, 18],
  verhaeltnis: [1.2, 1.333, 1.414],
  boden: 14,
  stufen: {
    'text-xs': -1,
    'text-sm': -0.5,
    'text-base': 0,
    'text-lg': 0.5,
    'text-h4': 1,
    'text-h3': 2,
    'text-h2': 3,
    'text-zahl': 3.5,
    'text-h1': 4,
  },
};

const ZOOMGRENZE = 2.5;
const rund = (w, s = 4) => +w.toFixed(s);
const rem = (px) => `${rund(px / 16)}rem`;

/* Größe einer Stufe in px an jedem Stützpunkt, mit Boden. */
export function stufeGroessen(stufe, { basis, verhaeltnis, boden }) {
  return basis.map((b, i) => {
    const roh = b * verhaeltnis[i] ** stufe;
    return { px: rund(Math.max(roh, boden), 2), angehoben: roh < boden };
  });
}

/* clamp() für die Strecke von Fenster v1 bis v2 mit den Größen s1 bis s2 (alles px). */
export function clampAusdruck(v1, s1, v2, s2) {
  if (s1 === s2) return rem(s1);
  const steigung = (s2 - s1) / (v2 - v1);
  const achse = s1 - steigung * v1;
  const vw = rund(steigung * 100);
  const mitte = `${rund(achse / 16)}rem ${vw < 0 ? '-' : '+'} ${Math.abs(vw)}vw`;
  return `clamp(${rem(Math.min(s1, s2))}, ${mitte}, ${rem(Math.max(s1, s2))})`;
}

export function skalaBerechnen(einstellung = VOREINSTELLUNG) {
  const e = { ...VOREINSTELLUNG, ...einstellung };
  const n = e.fenster.length;
  if (n < 2 || e.basis.length !== n || e.verhaeltnis.length !== n) {
    throw new Error('fenster, basis und verhaeltnis brauchen gleich viele Werte, mindestens zwei');
  }
  for (let i = 1; i < n; i++) {
    if (e.fenster[i] <= e.fenster[i - 1]) throw new Error('fenster müssen aufsteigend sein');
  }
  const stufen = Object.entries(e.stufen).sort((a, b) => a[1] - b[1]).map(([name, stufe]) => {
    const groessen = stufeGroessen(stufe, e);
    const kurven = [];
    for (let i = 0; i < n - 1; i++) {
      kurven.push(clampAusdruck(e.fenster[i], groessen[i].px, e.fenster[i + 1], groessen[i + 1].px));
    }
    const pxWerte = groessen.map((g) => g.px);
    const spanne = rund(Math.max(...pxWerte) / Math.min(...pxWerte), 2);
    return { name, stufe, groessen, kurven, spanne, angehoben: groessen.some((g) => g.angehoben) };
  });

  const befunde = [];
  for (const s of stufen) {
    if (s.spanne > ZOOMGRENZE) {
      befunde.push(`--${s.name}: größter Wert ist das ${s.spanne}-fache des kleinsten, erlaubt sind ${ZOOMGRENZE}. Kleinste Größe anheben oder größte senken.`);
    }
  }
  for (let k = 1; k < stufen.length; k++) {
    const a = stufen[k - 1], b = stufen[k];
    e.fenster.forEach((f, i) => {
      if (b.groessen[i].px <= a.groessen[i].px && !(a.angehoben && b.angehoben)) {
        befunde.push(`--${b.name} ist bei ${f} px nicht größer als --${a.name} (${b.groessen[i].px} ≤ ${a.groessen[i].px} px).`);
      }
    });
  }
  return { einstellung: e, stufen, befunde };
}

export function cssErzeugen({ einstellung: e, stufen }) {
  const kopf = e.fenster.map((f, i) => `${f} px: ${e.basis[i]} px × ${e.verhaeltnis[i]}`).join(', ');
  const zeile = (s, k) => {
    const g = s.groessen;
    const notiz = `${g[k].px} bis ${g[k + 1].px} px${s.angehoben ? `, Boden ${e.boden} px` : ''}`;
    return `  --${s.name}: ${s.kurven[k]};${' '.repeat(Math.max(1, 58 - s.name.length - s.kurven[k].length))}/* ${notiz} */`;
  };
  let css = `  /* Typoskala, erzeugt mit scripts/typoskala.mjs. Stützpunkte: ${kopf}.
     Nicht von Hand ändern, sondern neu rechnen. */\n`;
  css += stufen.map((s) => zeile(s, 0)).join('\n');
  for (let k = 1; k < e.fenster.length - 1; k++) {
    const geaendert = stufen.filter((s) => s.kurven[k] !== s.kurven[k - 1]);
    css += `\n\n/* Kurve ${k + 1} ab ${e.fenster[k]} px, erzeugt mit scripts/typoskala.mjs */\n@media (min-width: ${e.fenster[k]}px) {\n  :root {\n`;
    css += geaendert.map((s) => `  ${zeile(s, k)}`).join('\n');
    css += '\n  }\n}';
  }
  return css;
}

/* Ein Musterblatt, das jede Stufe mit echtem deutschem Text zeigt. Lokal öffnen, Fenster
   ziehen, auf 200 % zoomen. Keine externen Ressourcen. */
export function vorschauErzeugen(ergebnis) {
  const css = cssErzeugen(ergebnis);
  const proben = ergebnis.stufen.slice().reverse().map((s) => `<div class="probe"><code>--${s.name} · ${s.groessen.map((g) => g.px).join(' / ')} px</code>
<p style="font-size: var(--${s.name})">Ihre Wärmepumpe vom Meisterbetrieb, geplant und eingebaut in 14 Tagen</p></div>`).join('\n');
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Typoskala</title>
<style>
:root {
${css.split('\n\n')[0]}
}
${css.split('\n\n').slice(1).join('\n\n')}
body { margin: 0; padding: 1.5rem; font-family: system-ui, sans-serif; line-height: 1.3; }
.probe { border-top: 1px solid #ddd; padding-block: 1rem; }
.probe p { margin: 0.25rem 0 0; text-wrap: balance; }
code { font-size: 0.875rem; color: #555; }
#breite { position: fixed; inset: auto 1rem 1rem auto; background: #111; color: #fff; padding: 0.25rem 0.5rem; font: 0.875rem monospace; }
</style></head><body>
${proben}
<div id="breite"></div>
<script>const b=document.getElementById('breite');const z=()=>b.textContent=innerWidth+' px';addEventListener('resize',z);z();</script>
</body></html>
`;
}

function zahlen(s) {
  return s.split(',').map((w) => Number(w.trim()));
}

function main(argv) {
  const args = argv.slice(2);
  const wert = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };
  const e = { ...VOREINSTELLUNG };
  try {
    if (wert('--fenster')) e.fenster = zahlen(wert('--fenster'));
    if (wert('--basis')) e.basis = zahlen(wert('--basis'));
    if (wert('--verhaeltnis')) e.verhaeltnis = zahlen(wert('--verhaeltnis'));
    if (wert('--boden')) e.boden = Number(wert('--boden'));
    if (wert('--stufen')) {
      e.stufen = Object.fromEntries(wert('--stufen').split(',').map((p) => {
        const [k, v] = p.split(':');
        if (!k || v === undefined || Number.isNaN(Number(v))) throw new Error(`Stufe "${p}" hat nicht die Form name:zahl`);
        return [k.trim().replace(/^--/, ''), Number(v)];
      }));
    }
    if ([...e.fenster, ...e.basis, ...e.verhaeltnis, e.boden].some((w) => !Number.isFinite(w) || w <= 0)) {
      throw new Error('alle Zahlen müssen positiv sein');
    }
  } catch (err) {
    console.error(`Aufrufproblem: ${err.message}`);
    return 2;
  }
  let ergebnis;
  try {
    ergebnis = skalaBerechnen(e);
  } catch (err) {
    console.error(`Aufrufproblem: ${err.message}`);
    return 2;
  }
  if (args.includes('--json')) {
    console.log(JSON.stringify(ergebnis, null, 2));
  } else {
    console.log(cssErzeugen(ergebnis));
  }
  const vorschau = wert('--vorschau');
  if (vorschau) {
    writeFileSync(vorschau, vorschauErzeugen(ergebnis));
    console.error(`Musterblatt geschrieben: ${vorschau}`);
  }
  for (const b of ergebnis.befunde) console.error(`FEHLER ${b}`);
  return ergebnis.befunde.length ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main(process.argv));
