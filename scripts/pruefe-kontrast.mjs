#!/usr/bin/env node
/*
  pruefe-kontrast.mjs — rechnet die Kontrastwerte der Rollen-Tokens nach.

  WARUM ES DIESES SKRIPT GIBT
  Die erste harte Grenze aus SKILL.md ist 4,5:1 für Fließtext und 3:1 für große
  Schrift und Bedienelementbegrenzungen. Sie wird in der Praxis genau dann gerissen,
  wenn eine helle gesättigte Markenfarbe als Textfarbe benutzt wird.

  tokens.css dokumentiert die Werte als Kommentar ("auf Weiß 6,0:1 — geprüft, nicht
  geschätzt"). Ein Kommentar veraltet, sobald jemand die Farbe ändert. Dieses Skript
  rechnet nach.

  WAS GEPRÜFT WIRD
    Jede Textrolle gegen jede Flächenrolle, auf der sie tatsächlich vorkommt:

      --farbe-text            auf flaeche, flaeche-alt            >= 4.5
      --farbe-text-leise      auf flaeche, flaeche-alt            >= 4.5
      --farbe-marke-text      auf flaeche, flaeche-alt            >= 4.5
      --farbe-akzent-auf      auf akzent                          >= 4.5
      --farbe-text-invers     auf flaeche-dunkel                  >= 4.5
      --farbe-fokus           auf flaeche, flaeche-alt            >= 3.0
      --farbe-rahmen-stark    auf flaeche                         >= 3.0
      --farbe-fehler/warnung  auf flaeche                         >= 4.5

    Zusätzlich der Hinweis, welche Stufe der Markenrampe als Textfarbe taugt.

  AUFRUF
    node scripts/pruefe-kontrast.mjs [pfad/zu/tokens.css]
    node scripts/pruefe-kontrast.mjs --rampe        zeigt die ganze Rampe gegen Weiß

  EXIT
    0 = alle Paare halten · 1 = Verstoß · 2 = Aufrufproblem
*/

import { readFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const zeigeRampe = args.includes('--rampe');
const pfade = args.filter((a) => !a.startsWith('--'));

const KANDIDATEN = [
  ...pfade,
  'src/styles/tokens.css',
  'src/styles/global.css',
  'src/css/tokens.css',
  'styles/tokens.css',
  'skills/webdesign-conversion/assets/vorlagen/tokens.css',
];
const datei = KANDIDATEN.find((p) => p && existsSync(p));
if (!datei) {
  console.error('tokens.css nicht gefunden. Pfad angeben:');
  console.error('  node scripts/pruefe-kontrast.mjs src/styles/tokens.css');
  process.exit(2);
}

/*
  Kommentare entfernen, BEVOR Bloecke geparst werden.

  Sonst klebt ein Kommentar vor einem Selektor an ihm ("/* … *​/ :root") und jeder
  Selektortest schlaegt fehl. tokens.css ist absichtlich stark kommentiert, das ist
  hier also der Normalfall und nicht die Ausnahme.
*/
const quelle = readFileSync(datei, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' ');

/* ---------- Farben lesen und auflösen ---------- */

/*
  NUR :root lesen.

  tokens.css setzt --farbe-fokus bewusst zweimal: dunkel in :root und markenfarbig
  in .sektion--dunkel und .fuss, weil der Ring je Flaeche umgeschaltet wird. Ein
  naives "letztes Vorkommen gewinnt" liest dann den Wert fuer dunkle Sektionen und
  prueft ihn gegen Weiss. Das ergibt einen Fehlalarm gegen ein richtiges Design.

  Bereichsbezogene Ueberschreibungen werden separat gesammelt und am Ende genannt,
  damit sie nicht unbemerkt ungeprueft bleiben.
*/
function bloeckeFinden(css, selektorTest) {
  const treffer = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    /* Mehrzeilige Selektorlisten (".sektion--dunkel,\n.fuss") zusammenfassen,
       damit nicht nur der letzte Selektor genannt wird. */
    const sel = m[1].trim().split('\n').map((t) => t.trim()).filter(Boolean).join(' ');
    if (selektorTest(sel)) treffer.push({ sel, koerper: m[2] });
  }
  return treffer;
}

function deklarationen(koerper) {
  const map = new Map();
  for (const m of koerper.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) map.set(m[1], m[2].trim());
  return map;
}

const roh = new Map();
for (const b of bloeckeFinden(quelle, (s) => /(^|,)\s*:root\s*$/.test(s) || s === ':root')) {
  for (const [k, v] of deklarationen(b.koerper)) roh.set(k, v);
}
if (!roh.size) {
  /* Kein :root gefunden: auf die ganze Datei zurueckfallen, aber sagen. */
  for (const m of quelle.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) roh.set(m[1], m[2].trim());
  console.log('Hinweis: kein :root-Block gefunden, alle Deklarationen der Datei gelesen.\n');
}

/* Ueberschreibungen ausserhalb von :root, die gepruefte Rollen betreffen. */
const ueberschreibungen = [];
for (const b of bloeckeFinden(quelle, (s) => !/:root/.test(s) && !s.startsWith('@'))) {
  for (const [k, v] of deklarationen(b.koerper)) {
    if (/^--farbe-/.test(k)) ueberschreibungen.push({ sel: b.sel, token: k, wert: v });
  }
}

/*
  var(--x) aufloesen. Tiefe begrenzen, damit ein versehentlicher Zirkelbezug
  (--a: var(--b); --b: var(--a)) nicht in eine Endlosschleife laeuft.
*/
function aufloesen(wert, tiefe = 0) {
  if (tiefe > 12 || !wert) return wert;
  const m = wert.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/);
  if (!m) return wert;
  const ziel = roh.get(m[1]);
  if (ziel === undefined) return m[2] ? aufloesen(m[2].trim(), tiefe + 1) : null;
  return aufloesen(ziel, tiefe + 1);
}

/* ---------- Farbwerte nach sRGB ---------- */

function nachRgb(wert) {
  if (!wert) return null;
  const w = wert.trim().toLowerCase();

  let m = w.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  m = w.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const t = m[1].split(/[\s,/]+/).filter(Boolean).slice(0, 3)
      .map((v) => (v.endsWith('%') ? Math.round(parseFloat(v) * 2.55) : parseFloat(v)));
    return t.length === 3 && t.every((n) => Number.isFinite(n)) ? t : null;
  }

  if (w === 'white') return [255, 255, 255];
  if (w === 'black') return [0, 0, 0];
  return null;   /* oklch, hsl, color-mix: nicht unterstuetzt, wird gemeldet */
}

/* WCAG 2.x relative Leuchtdichte. */
function leuchtdichte([r, g, b]) {
  const f = (v) => {
    const x = v / 255;
    return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function kontrast(a, b) {
  const la = leuchtdichte(a), lb = leuchtdichte(b);
  const [hell, dunkel] = la > lb ? [la, lb] : [lb, la];
  return (hell + 0.05) / (dunkel + 0.05);
}

/* ---------- Prüfpaare ---------- */

const PAARE = [
  ['--farbe-text',              '--farbe-flaeche',        4.5, 'Fließtext auf Weiß'],
  ['--farbe-text',              '--farbe-flaeche-alt',    4.5, 'Fließtext auf getönter Fläche'],
  ['--farbe-text-leise',        '--farbe-flaeche',        4.5, 'leiser Text auf Weiß'],
  ['--farbe-text-leise',        '--farbe-flaeche-alt',    4.5, 'leiser Text auf getönter Fläche'],
  ['--farbe-marke-text',        '--farbe-flaeche',        4.5, 'Links und Kicker auf Weiß'],
  ['--farbe-marke-text',        '--farbe-flaeche-alt',    4.5, 'Links auf getönter Fläche'],
  ['--farbe-akzent-auf',        '--farbe-akzent',         4.5, 'Buttontext auf der Akzentfläche'],
  ['--farbe-text-invers',       '--farbe-flaeche-dunkel', 4.5, 'Text in dunkler Sektion'],
  ['--farbe-fehler',            '--farbe-flaeche',        4.5, 'Fehlermeldung auf Weiß'],
  ['--farbe-warnung',           '--farbe-flaeche',        4.5, 'Warnung auf Weiß'],
  ['--farbe-erfolg',            '--farbe-flaeche',        4.5, 'Erfolgsmeldung auf Weiß'],
  ['--farbe-fokus',             '--farbe-flaeche',        3.0, 'Fokusring auf Weiß (WCAG 1.4.11)'],
  ['--farbe-fokus',             '--farbe-flaeche-alt',    3.0, 'Fokusring auf getönter Fläche'],
  ['--farbe-marke',             '--farbe-flaeche-dunkel', 3.0, 'Fokusring in dunkler Sektion'],
  ['--farbe-rahmen-stark',      '--farbe-flaeche',        3.0, 'Bedienelementbegrenzung (WCAG 1.4.11)', 'hinweis'],
];

/*
  Der Schweregrad des letzten Paares ist bewusst "hinweis".

  WCAG 1.4.11 verlangt 3:1 nur fuer Begrenzungen, die zum ERKENNEN eines
  Bedienelements noetig sind. Ein dekorativer Kartenrahmen oder eine Trennlinie
  fallen nicht darunter. Ob --farbe-rahmen-stark ein Eingabefeld umgrenzt oder eine
  Karte ziert, kann ein Skript nicht wissen. Es meldet den Wert, die Entscheidung
  bleibt beim Menschen.
*/

console.log(`Tokens aus ${datei}\n`);

let verstoesse = 0, ungeprueft = 0, geprueft = 0;

let hinweise = 0;

for (const [vorn, hinten, soll, was, grad = 'fehler'] of PAARE) {
  if (!roh.has(vorn) || !roh.has(hinten)) continue;

  const wv = aufloesen(roh.get(vorn));
  const wh = aufloesen(roh.get(hinten));
  const cv = nachRgb(wv), ch = nachRgb(wh);

  if (!cv || !ch) {
    const welche = !cv ? `${vorn} (${wv})` : `${hinten} (${wh})`;
    console.log(`  ?     ${was}`);
    console.log(`        ${welche} ist kein hex- oder rgb-Wert, nicht berechenbar`);
    ungeprueft++;
    continue;
  }

  const wert = kontrast(cv, ch);
  geprueft++;
  const haelt = wert >= soll;
  if (!haelt) grad === 'fehler' ? verstoesse++ : hinweise++;
  const marke = haelt ? '  ok  ' : grad === 'fehler' ? ' FEHL ' : ' HINW ';
  console.log(`${marke} ${wert.toFixed(2)}:1  (soll ${soll.toFixed(1)})  ${was}`);
  console.log(`        ${vorn} ${wv}  auf  ${hinten} ${wh}`);
  if (!haelt && grad === 'fehler') {
    console.log(`        → Die Farbe reicht hier nicht. Eine helle gesättigte Markenfarbe ist`);
    console.log(`          eine Flächenfarbe, keine Textfarbe: die Rampe braucht eine eigene`);
    console.log(`          dunkle Stufe für Text. Siehe 04-barrierefreiheit-bfsg.md.`);
  }
  if (!haelt && grad === 'hinweis') {
    console.log(`        → 3:1 ist nur Pflicht, wenn diese Begrenzung ein Bedienelement`);
    console.log(`          ERKENNBAR macht (Eingabefeld, Umschalter). Ziert sie eine Karte`);
    console.log(`          oder trennt sie Abschnitte, ist der Wert in Ordnung.`);
  }
}

/* ---------- Rampe gegen Weiß und gegen den Dunkelton ---------- */

if (zeigeRampe || verstoesse) {
  const weiss = nachRgb(aufloesen(roh.get('--farbe-flaeche'))) ?? [255, 255, 255];
  const dunkel = nachRgb(aufloesen(roh.get('--farbe-flaeche-dunkel')));
  const stufen = [...roh.keys()]
    .filter((k) => /^--farbe-[a-z]+-\d+$/.test(k))
    .sort((a, b) => parseInt(a.match(/\d+$/)[0]) - parseInt(b.match(/\d+$/)[0]));

  if (stufen.length) {
    console.log('\nRampe: welche Stufe taugt als Textfarbe');
    for (const k of stufen) {
      const c = nachRgb(aufloesen(roh.get(k)));
      if (!c) continue;
      const aufWeiss = kontrast(c, weiss);
      const aufDunkel = dunkel ? kontrast(c, dunkel) : null;
      const urteil = aufWeiss >= 4.5 ? 'Text auf hell erlaubt'
        : aufWeiss >= 3.0 ? 'nur große Schrift und Begrenzungen'
        : 'Flächenfarbe, NICHT für Text';
      const dz = aufDunkel ? `  auf dunkel ${aufDunkel.toFixed(2)}:1` : '';
      console.log(`  ${k.padEnd(22)} ${aufWeiss.toFixed(2)}:1 auf Weiß${dz}   ${urteil}`);
    }
  }
}

if (ueberschreibungen.length) {
  console.log('\nBereichsbezogene Überschreibungen (außerhalb von :root):');
  for (const u of ueberschreibungen) {
    console.log(`  ${u.sel}  ${u.token}: ${u.wert}`);
  }
  console.log('  Diese gelten nur in ihrem Bereich und sind oben NICHT mitgeprüft.');
  console.log('  Ein je Fläche umgeschalteter Fokusring ist richtig, siehe 10-visuelle-richtung.md.');
}

console.log(`\n${geprueft} Paare geprüft, ${verstoesse} Verstöße, ${hinweise} ${hinweise === 1 ? 'Hinweis' : 'Hinweise'}${ungeprueft ? `, ${ungeprueft} nicht berechenbar` : ''}.`);
if (ungeprueft) {
  console.log('Nicht berechenbare Werte (oklch, hsl, color-mix) von Hand prüfen.');
}
process.exit(verstoesse ? 1 : 0);
