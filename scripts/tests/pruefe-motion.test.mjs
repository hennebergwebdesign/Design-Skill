/*
  pruefe-motion.test.mjs — prüft den Zähler für die Bewegungsfehler.

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und ein Fall, der ihr ähnlich sieht und trotzdem
  durchgehen muss. Ein Prüfskript mit Fehlalarmen wird abgeschaltet, und dann prüft es gar
  nichts mehr.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { motionAnalysieren, projektAnalysieren } from '../pruefe-motion.mjs';

const SKRIPT = fileURLToPath(new URL('../pruefe-motion.mjs', import.meta.url));
const regeln = (css) => motionAnalysieren(css).map((b) => b.regel);

// ------------------------------------------------------------------ transition: all

test('transition: all ist ein Fehler', () => {
  const b = motionAnalysieren('.a { transition: all 0.2s ease-out; }');
  assert.equal(b.find((x) => x.regel === 'transition-all').schwere, 'fehler');
});

test('transition-all in Tailwind wird gefunden', () => {
  assert.ok(regeln('<a class="px-4 transition-all duration-200">').includes('transition-all'));
});

test('benannte Eigenschaften sind erlaubt', () => {
  assert.deepEqual(regeln('.a { transition: transform 0.2s ease-out, opacity 0.2s ease-out; }'), []);
});

// ------------------------------------------------------------------ scale(0)

test('Start bei scale(0) wird gemeldet', () => {
  assert.ok(regeln('.a { transform: scale(0); }').includes('scale-null'));
  assert.ok(regeln('gsap.from(el, { scale: 0, duration: 0.2 })').includes('scale-null'));
});

test('scale(0.95) und scale(0.97) sind erlaubt', () => {
  assert.deepEqual(regeln('.a { transform: scale(0.95); } .b:active { transform: scale(0.97); }'), []);
});

// ------------------------------------------------------------------ ease-in

test('ease-in wird gemeldet, ease-in-out und ease-out nicht', () => {
  assert.ok(regeln('.a { transition: opacity 0.2s ease-in; }').includes('ease-in'));
  assert.deepEqual(regeln('.a { transition: opacity 0.2s ease-in-out; }'), []);
  assert.deepEqual(regeln('.a { transition: opacity 0.2s ease-out; }'), []);
});

test('GSAP power2.in wird gemeldet, power2.out nicht', () => {
  assert.ok(regeln('gsap.to(el, { y: 8, ease: "power2.in" })').includes('ease-in'));
  assert.deepEqual(regeln('gsap.to(el, { y: 8, ease: "power2.out" })'), []);
});

test('ease-in mit „bewusst" im Kommentar davor geht durch', () => {
  const css = '/* bewusst: dekorativer Austritt beim Scrollen */\n.a { transition: opacity 0.2s ease-in; }';
  assert.deepEqual(regeln(css), []);
});

test('ease-in in einem Kommentar wird nicht gemeldet', () => {
  assert.deepEqual(regeln('/* nie ease-in an UI */\n.a { transition: opacity 0.2s ease-out; }'), []);
});

// ------------------------------------------------------------------ Layoutwerte

test('width und height in transition werden gemeldet', () => {
  assert.ok(regeln('.a { transition: height 0.2s ease-out; }').includes('layout-transition'));
  assert.ok(regeln('.a { transition-property: width, opacity; }').includes('layout-transition'));
});

test('transform und opacity sind keine Layoutwerte', () => {
  assert.deepEqual(regeln('.a { transition-property: transform, opacity; }'), []);
});

// ------------------------------------------------------------------ Dauer

test('feste Dauer über 300 ms wird gemeldet', () => {
  assert.ok(regeln('.a { transition: transform 0.4s ease-out; }').includes('dauer-ueber-300'));
  assert.ok(regeln('.a { transition: transform 400ms ease-out; }').includes('dauer-ueber-300'));
  assert.ok(regeln('.a { transition-duration: 500ms; }').includes('dauer-ueber-300'));
  assert.ok(regeln('<div class="duration-500">').includes('dauer-ueber-300'));
});

test('300 ms und darunter sind erlaubt, auch als Dezimalsekunden', () => {
  assert.deepEqual(regeln('.a { transition: transform 0.3s ease-out; }'), []);
  assert.deepEqual(regeln('.a { transition: transform 200ms ease-out; }'), []);
  assert.deepEqual(regeln('<div class="duration-200">'), []);
});

test('ein Dauer-Token wird nicht gemeldet, auch wenn es groß ist', () => {
  assert.deepEqual(regeln('.a { transition: transform var(--dauer-lang) var(--kurve-eintritt); }'), []);
});

test('eine Dauerschleife wird nicht gemeldet', () => {
  assert.deepEqual(regeln('.band { animation: lauf 30s linear infinite; }'), []);
});

test('lange Dauer mit „bewusst" davor geht durch', () => {
  const css = '/* bewusst: große Fläche, nichts bedienbar */\n.a { transition: transform 0.6s ease-out; }';
  assert.deepEqual(regeln(css), []);
});

test('die Verzögerung zählt nicht als Dauer', () => {
  assert.deepEqual(regeln('.a { transition: opacity 0.2s ease-out 0.5s; }'), []);
});

// ------------------------------------------------------------------ Hover

test('Hover mit transform ohne Medienabfrage wird gemeldet', () => {
  assert.ok(regeln('.karte:hover { transform: translateY(-4px); }').includes('hover-ohne-medienabfrage'));
});

test('Hover in @media (hover: hover) ist erlaubt', () => {
  const css = '@media (hover: hover) and (pointer: fine) {\n  .karte:hover { transform: translateY(-4px); }\n}';
  assert.deepEqual(regeln(css), []);
});

test('Hover nur mit Farbe ist erlaubt', () => {
  assert.deepEqual(regeln('.link:hover { color: var(--akzent); }'), []);
});

test('die Zeilennummer des Hover-Befunds stimmt', () => {
  const css = '.a { color: red; }\n\n.karte:hover {\n  transform: scale(1.02);\n}';
  const b = motionAnalysieren(css).find((x) => x.regel === 'hover-ohne-medienabfrage');
  assert.equal(b.zeile, 3);
});

// ------------------------------------------------------------------ Reduzierung

test('Animation ohne prefers-reduced-motion ist ein Fehler', () => {
  const b = projektAnalysieren([{ pfad: 'a.css', inhalt: '@keyframes lauf { to { transform: translateX(-50%); } }' }]);
  assert.equal(b[0].regel, 'keine-reduzierung');
  assert.equal(b[0].schwere, 'fehler');
});

test('mit prefers-reduced-motion irgendwo im Projekt ist es sauber', () => {
  const b = projektAnalysieren([
    { pfad: 'a.css', inhalt: '@keyframes lauf { to { transform: translateX(-50%); } }' },
    { pfad: 'b.css', inhalt: '@media (prefers-reduced-motion: reduce) { * { animation: none; } }' },
  ]);
  assert.deepEqual(b, []);
});

test('ein Projekt ohne Bewegung braucht keine Reduzierung', () => {
  assert.deepEqual(projektAnalysieren([{ pfad: 'a.css', inhalt: '.a { color: red; }' }]), []);
});

test('Reduzierung nur im Kommentar zählt nicht', () => {
  const b = projektAnalysieren([{ pfad: 'a.css', inhalt: '/* prefers-reduced-motion fehlt noch */\n@keyframes x { to { opacity: 1; } }' }]);
  assert.equal(b.length, 1);
});

// ------------------------------------------------------------------ Aufruf

test('Exit 1 bei Fehler, 0 bei sauberem Projekt, 2 ohne Ziel', () => {
  const wurzel = mkdtempSync(join(tmpdir(), 'motion-'));
  try {
    mkdirSync(join(wurzel, 'src'));
    writeFileSync(join(wurzel, 'src', 'a.css'), '.a { transition: all 0.2s ease-out; }');
    const rot = spawnSync('node', [SKRIPT, 'src'], { cwd: wurzel, encoding: 'utf8' });
    assert.equal(rot.status, 1);
    assert.match(rot.stdout, /transition-all/);

    writeFileSync(join(wurzel, 'src', 'a.css'), '.a { transition: transform 0.2s ease-out; }');
    const gruen = spawnSync('node', [SKRIPT, 'src'], { cwd: wurzel, encoding: 'utf8' });
    assert.equal(gruen.status, 0);

    const keins = spawnSync('node', [SKRIPT, 'gibt-es-nicht'], { cwd: wurzel, encoding: 'utf8' });
    assert.equal(keins.status, 2);
  } finally {
    rmSync(wurzel, { recursive: true, force: true });
  }
});

test('--strict zählt Warnungen wie Fehler', () => {
  const wurzel = mkdtempSync(join(tmpdir(), 'motion-'));
  try {
    mkdirSync(join(wurzel, 'src'));
    writeFileSync(join(wurzel, 'src', 'a.css'), '.a { transform: scale(0); }');
    assert.equal(spawnSync('node', [SKRIPT, 'src'], { cwd: wurzel }).status, 0);
    assert.equal(spawnSync('node', [SKRIPT, 'src', '--strict'], { cwd: wurzel }).status, 1);
  } finally {
    rmSync(wurzel, { recursive: true, force: true });
  }
});
