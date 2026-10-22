/*
  typografie.test.mjs — prüft Skalengenerator, Schriftmetriken und pruefe-typografie.mjs.

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und ein Fall, der ihr ähnlich sieht und trotzdem
  durchgehen muss. Dazu läuft die Prüfung gegen die eigenen Vorlagen: eine Vorlage, die ihre
  eigene Prüfung nicht besteht, lehrt das Falsche.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

import { skalaBerechnen, clampAusdruck, cssErzeugen, VOREINSTELLUNG } from '../typoskala.mjs';
import { schriftLesen, ersatzBerechnen, ersatzCss, ERSATZ } from '../schrift-metriken.mjs';
import { dateiAnalysieren, groesseBei, projektPruefen, tokenKarte, ordnungPruefen, deklarationen } from '../pruefe-typografie.mjs';

const WURZEL = fileURLToPath(new URL('../..', import.meta.url));
const VORLAGEN = join(WURZEL, 'skills/webdesign-conversion/assets/vorlagen');
const PRUEFER = fileURLToPath(new URL('../pruefe-typografie.mjs', import.meta.url));
const regeln = (liste) => liste.map((b) => b.regel);
const css = (inhalt) => dateiAnalysieren(inhalt, '.css');

// ------------------------------------------------------------------ typoskala

test('clamp trifft an beiden Stützpunkten genau die Stufengröße', () => {
  const ausdruck = clampAusdruck(360, 16, 1200, 17);
  assert.equal(groesseBei(ausdruck, 360), 16);
  assert.ok(Math.abs(groesseBei(ausdruck, 1200) - 17) < 0.01);
  assert.ok(Math.abs(groesseBei(ausdruck, 780) - 16.5) < 0.01);
});

test('die Voreinstellung ist geordnet, zoomfest und ohne Befund', () => {
  const e = skalaBerechnen();
  assert.deepEqual(e.befunde, []);
  for (const s of e.stufen) assert.ok(s.spanne <= 2.5, `${s.name} ${s.spanne}`);
  const h1 = e.stufen.find((s) => s.name === 'text-h1');
  assert.ok(h1.kurven.every((k) => /rem [+-] [\d.]+vw/.test(k)), 'jede Kurve hat einen rem-Anteil');
});

test('kleine Stufen werden auf 14 px angehoben, nicht darunter gerechnet', () => {
  const xs = skalaBerechnen().stufen.find((s) => s.name === 'text-xs');
  assert.ok(xs.angehoben);
  assert.ok(xs.groessen.every((g) => g.px === 14));
  assert.match(xs.kurven[0], /^0\.875rem$/);
});

test('eine Displaystufe über der Zoomgrenze wird gemeldet', () => {
  const e = skalaBerechnen({ stufen: { 'text-base': 0, 'text-display': 5 } });
  assert.equal(e.befunde.length, 1);
  assert.match(e.befunde[0], /text-display/);
});

test('die Tokenvorlage enthält genau die Skala, die der Generator rechnet', () => {
  const vorlage = readFileSync(join(VORLAGEN, 'tokens.css'), 'utf8');
  const erzeugt = cssErzeugen(skalaBerechnen(VOREINSTELLUNG));
  for (const zeile of erzeugt.split('\n').filter((z) => /--text-/.test(z))) {
    assert.ok(vorlage.includes(zeile.trim().split('/*')[0].trim()), `fehlt in tokens.css: ${zeile.trim()}`);
  }
});

// ------------------------------------------------------------------ schrift-metriken

/* Minimale TrueType-Datei aus head, hhea, OS/2, hmtx, cmap (Format 4, a und b). */
function testschrift({ upm = 1000, ober = 900, unter = -200, abstand = 0, breiteA = 500, breiteB = 600, gewicht = 400 } = {}) {
  const head = Buffer.alloc(54); head.writeUInt16BE(upm, 18);
  const hhea = Buffer.alloc(36); hhea.writeInt16BE(ober, 4); hhea.writeInt16BE(unter, 6); hhea.writeInt16BE(abstand, 8); hhea.writeUInt16BE(3, 34);
  const os2 = Buffer.alloc(96); os2.writeUInt16BE(4, 0); os2.writeUInt16BE(gewicht, 4); os2.writeInt16BE(480, 86); os2.writeInt16BE(700, 88);
  const hmtx = Buffer.alloc(12); hmtx.writeUInt16BE(0, 0); hmtx.writeUInt16BE(breiteA, 4); hmtx.writeUInt16BE(breiteB, 8);
  /* cmap: ein Segment 97..98 → Glyph 1..2 über delta, plus Abschlusssegment */
  const sub = Buffer.alloc(32);
  sub.writeUInt16BE(4, 0); sub.writeUInt16BE(32, 2); sub.writeUInt16BE(4, 6);
  sub.writeUInt16BE(98, 14); sub.writeUInt16BE(0xffff, 16);
  sub.writeUInt16BE(97, 20); sub.writeUInt16BE(0xffff, 22);
  sub.writeInt16BE(-96, 24); sub.writeInt16BE(1, 26);
  const cmap = Buffer.concat([Buffer.from([0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 12]), sub]);
  const tabellen = [['OS/2', os2], ['cmap', cmap], ['head', head], ['hhea', hhea], ['hmtx', hmtx]];
  return { tabellen, sfnt: () => {
    const kopf = Buffer.alloc(12 + tabellen.length * 16);
    kopf.writeUInt32BE(0x00010000, 0); kopf.writeUInt16BE(tabellen.length, 4);
    let off = kopf.length;
    tabellen.forEach(([t, b], i) => {
      kopf.write(t, 12 + i * 16, 'latin1'); kopf.writeUInt32BE(off, 20 + i * 16); kopf.writeUInt32BE(b.length, 24 + i * 16);
      off += b.length;
    });
    return Buffer.concat([kopf, ...tabellen.map(([, b]) => b)]);
  } };
}

function alsWoff({ tabellen }) {
  /* WOFF speichert eine Tabelle nur komprimiert, wenn das kleiner ist */
  const daten = tabellen.map(([t, b]) => { const k = deflateSync(b); return [t, b, k.length < b.length ? k : b]; });
  const kopf = Buffer.alloc(44 + daten.length * 20);
  kopf.write('wOFF', 0, 'latin1'); kopf.writeUInt16BE(daten.length, 12);
  let off = kopf.length;
  daten.forEach(([t, b, k], i) => {
    const e = 44 + i * 20;
    kopf.write(t, e, 'latin1'); kopf.writeUInt32BE(off, e + 4); kopf.writeUInt32BE(k.length, e + 8); kopf.writeUInt32BE(b.length, e + 12);
    off += k.length;
  });
  return Buffer.concat([kopf, ...daten.map(([, , k]) => k)]);
}

test('Metriken werden aus TTF und WOFF gleich gelesen', () => {
  const s = testschrift();
  const ttf = schriftLesen(s.sfnt(), 'ab');
  const woff = schriftLesen(alsWoff(s), 'ab');
  assert.equal(ttf.einheiten, 1000);
  assert.equal(ttf.oberlaenge, 900);
  assert.equal(ttf.unterlaenge, -200);
  assert.equal(ttf.mittelbreite, 0.55);
  assert.equal(ttf.os2.gewicht, 400);
  assert.deepEqual({ ...woff, format: 'TTF' }, ttf);
});

test('fehlende Zeichen werden benannt statt still als Breite 0 gezählt', () => {
  const r = schriftLesen(testschrift().sfnt(), 'abü');
  assert.deepEqual(r.fehlendeZeichen, ['ü']);
  assert.equal(r.mittelbreite, 0.55);
});

test('size-adjust folgt der Breite, die Overrides werden durch size-adjust geteilt', () => {
  const schrift = { einheiten: 1000, oberlaenge: 1000, unterlaenge: -250, zeilenabstand: 0, mittelbreite: 0.461 * 1.1 };
  const w = ersatzBerechnen(schrift, ERSATZ.arial);
  assert.ok(Math.abs(w.sizeAdjust - 1.1) < 1e-9);
  assert.ok(Math.abs(w.ascent - 1 / 1.1) < 1e-9);
  const block = ersatzCss('Marke', ERSATZ.arial, w, 700);
  assert.match(block, /font-family: 'Marke Ersatz'/);
  assert.match(block, /size-adjust: 110\.00%/);
  assert.match(block, /font-weight: 700/);
});

test('die Liberation-Werte stimmen mit den Dateien überein, falls vorhanden', (t) => {
  const datei = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf';
  if (!existsSync(datei)) { t.skip('Liberation Sans nicht installiert'); return; }
  const r = schriftLesen(readFileSync(datei));
  assert.equal(r.oberlaenge, ERSATZ.arial.oberlaenge);
  assert.equal(r.mittelbreite, ERSATZ.arial.mittelbreite);
});

// ------------------------------------------------------------------ pruefe-typografie, Einzelregeln

test('px-Schriftgröße ist ein Fehler, rem nicht', () => {
  assert.deepEqual(regeln(css('.a { font-size: 18px; }').fehler), ['px-schrift']);
  assert.deepEqual(css('.a { font-size: 1.125rem; }').fehler, []);
});

test('px in einem Token der Skala ist ein Fehler', () => {
  assert.deepEqual(regeln(css(':root { --text-h2: 40px; }').fehler), ['px-schrift']);
});

test('html mit px-Schriftgröße ist ein Fehler, 62,5 % eine Warnung, 100 % nichts', () => {
  assert.deepEqual(regeln(css('html { font-size: 10px; }').fehler), ['wurzel-px']);
  assert.deepEqual(regeln(css('html { font-size: 62.5%; }').warnungen), ['wurzel-prozent']);
  const r = css('html { font-size: 100%; }');
  assert.deepEqual([...r.fehler, ...r.warnungen], []);
});

test('reines vw ist ein Fehler, clamp mit rem-Anteil nicht', () => {
  assert.deepEqual(regeln(css('h1 { font-size: 5vw; }').fehler), ['nur-vw']);
  assert.deepEqual(regeln(css('h1 { font-size: clamp(2rem, 6vw, 4rem); }').fehler), ['nur-vw']);
  assert.deepEqual(css('h1 { font-size: clamp(2rem, 1.5rem + 2vw, 4rem); }').fehler, []);
});

test('Höchstwert über dem 2,5-fachen ist ein Fehler, genau 2,5 nicht', () => {
  assert.deepEqual(regeln(css('h1 { font-size: clamp(2rem, 1rem + 5vw, 6rem); }').fehler), ['zoomgrenze']);
  assert.deepEqual(css('h1 { font-size: clamp(2rem, 1rem + 5vw, 5rem); }').fehler, []);
});

test('unter 14 px ist ein Fehler, genau 0.875rem nicht', () => {
  assert.deepEqual(regeln(css('.k { font-size: 0.75rem; }').fehler), ['unter-boden']);
  assert.deepEqual(regeln(css('.k { font-size: clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem); }').fehler), ['unter-boden']);
  assert.deepEqual(css('.k { font-size: 0.875rem; }').fehler, []);
});

test('ein Kommentar mit "bewusst" nimmt die Zeile aus', () => {
  assert.deepEqual(css('.k { font-size: 0.75rem; /* bewusst: nur in der Entwicklung */ }').fehler, []);
});

test('Werte in Kommentaren werden nicht gemeldet', () => {
  assert.deepEqual(css('/* früher: .a { font-size: 12px; } */ .a { font-size: 1rem; }').fehler, []);
});

test('var() wird über die Tokens aufgelöst', () => {
  const tokens = { 'k': '0.6rem' };
  assert.deepEqual(regeln(dateiAnalysieren('.a { font-size: var(--k); }', '.css', tokens).fehler), ['unter-boden']);
  assert.deepEqual(dateiAnalysieren('.a { font-size: var(--unbekannt); }', '.css', {}).fehler, []);
});

test('line-height in px und letter-spacing in px sind Warnungen, ohne Einheit und em nicht', () => {
  assert.deepEqual(regeln(css('p { line-height: 24px; letter-spacing: 1px; }').warnungen), ['zeile-px', 'laufweite-px']);
  const r = css('p { line-height: 1.5; letter-spacing: -0.02em; } h1 { letter-spacing: 0; }');
  assert.deepEqual(r.warnungen, []);
});

test('fremder Schriftdienst ist ein Fehler, ein Kommentar darüber nicht', () => {
  assert.deepEqual(regeln(css("@import url('https://fonts.googleapis.com/css2?family=Outfit');").fehler), ['fremd-cdn']);
  const html = '<link href="https://fonts.googleapis.com/css2?family=X" rel="stylesheet">';
  assert.deepEqual(regeln(dateiAnalysieren(html, '.astro').fehler), ['fremd-cdn']);
  assert.deepEqual(css('/* nie fonts.googleapis.com einbinden */').fehler, []);
});

test('gesperrter Zoom ist ein Fehler, normales viewport nicht', () => {
  const gesperrt = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';
  assert.deepEqual(regeln(dateiAnalysieren(gesperrt, '.astro').fehler), ['zoom-gesperrt']);
  const nein = '<meta name="viewport" content="width=device-width, user-scalable=no">';
  assert.deepEqual(regeln(dateiAnalysieren(nein, '.html').fehler), ['zoom-gesperrt']);
  assert.deepEqual(dateiAnalysieren('<meta name="viewport" content="width=device-width, initial-scale=1">', '.astro').fehler, []);
});

test('style-Blöcke in .astro werden mit richtiger Zeile geprüft', () => {
  const astro = '---\nconst a = 1;\n---\n<h1>Titel</h1>\n<style>\n  h1 { font-size: 40px; }\n</style>\n';
  const r = dateiAnalysieren(astro, '.astro');
  assert.deepEqual(regeln(r.fehler), ['px-schrift']);
  assert.equal(r.fehler[0].zeile, 6);
});

test('@font-face ohne font-display ist eine Warnung, die lokale Ersatzschrift nicht', () => {
  const r = css(`@font-face { font-family: 'A'; src: url('/a.woff2'); }
@font-face { font-family: 'A Ersatz'; src: local('Arial'); size-adjust: 102%; }`);
  assert.deepEqual(regeln(r.warnungen), ['ohne-display']);
  assert.equal(r.faces.length, 2);
  assert.ok(r.faces[1].ersatz);
});

// ------------------------------------------------------------------ Projektweit

test('Media-Query-Stufen werden beim Ordnungsvergleich überlagert', () => {
  const decls = deklarationen(`:root { --text-h2: 2rem; --text-h1: 2.5rem; }
@media (min-width: 1200px) { :root { --text-h2: 3rem; } }`);
  const fehler = ordnungPruefen(tokenKarte(decls));
  assert.ok(fehler.length >= 1);
  assert.ok(fehler.every((f) => /bei (1200|1440) px/.test(f.meldung)));
});

function projekt(dateien) {
  const ordner = mkdtempSync(join(tmpdir(), 'typo-'));
  for (const [name, inhalt] of Object.entries(dateien)) {
    mkdirSync(join(ordner, name, '..'), { recursive: true });
    writeFileSync(join(ordner, name), inhalt);
  }
  return ordner;
}

test('benutztes Gewicht ohne Schnitt und fehlende Ersatzschrift werden gemeldet', () => {
  const ordner = projekt({
    'styles/fonts.css': "@font-face { font-family: 'A'; font-weight: 400; font-display: swap; src: url('/a.woff2'); }",
    'styles/tokens.css': ':root { --gewicht-betont: 600; }',
    'styles/basis.css': 'strong { font-weight: var(--gewicht-betont); } p { font-weight: 400; }',
  });
  try {
    const { warnungen } = projektPruefen([ordner]);
    assert.deepEqual(regeln(warnungen).sort(), ['fehlender-schnitt', 'ohne-ersatz']);
    assert.match(warnungen.find((w) => w.regel === 'fehlender-schnitt').meldung, /600/);
  } finally { rmSync(ordner, { recursive: true, force: true }); }
});

test('ein variabler Schnitt deckt seinen Gewichtsbereich ab', () => {
  const ordner = projekt({
    'a.css': `@font-face { font-family: 'A'; font-weight: 100 900; font-display: swap; src: url('/a.woff2'); }
@font-face { font-family: 'A Ersatz'; src: local('Arial'); size-adjust: 100%; }
strong { font-weight: 650; }`,
  });
  try {
    const { warnungen, fehler } = projektPruefen([ordner]);
    assert.deepEqual([...fehler, ...warnungen], []);
  } finally { rmSync(ordner, { recursive: true, force: true }); }
});

test('die eigenen Vorlagen bestehen die eigene Prüfung ohne Befund', () => {
  const { fehler, warnungen } = projektPruefen([VORLAGEN]);
  assert.deepEqual(fehler, []);
  assert.deepEqual(warnungen, []);
});

test('Aufruf: Exitcode 1 bei Fehler, 0 ohne, 2 ohne Ordner', () => {
  const schlecht = projekt({ 'a.css': 'h1 { font-size: 48px; }' });
  const gut = projekt({ 'a.css': 'h1 { font-size: 3rem; }' });
  try {
    assert.equal(spawnSync(process.execPath, [PRUEFER, schlecht]).status, 1);
    assert.equal(spawnSync(process.execPath, [PRUEFER, gut]).status, 0);
    assert.equal(spawnSync(process.execPath, [PRUEFER, join(gut, 'fehlt')]).status, 2);
  } finally {
    rmSync(schlecht, { recursive: true, force: true });
    rmSync(gut, { recursive: true, force: true });
  }
});
