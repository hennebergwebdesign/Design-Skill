/*
  pruefe-konturbutton.test.mjs — prüft die Erkennung von Primärbuttons ohne Fläche.

      node --test 'scripts/tests/*.test.mjs'

  Die Regel ist eine Heuristik (02-design-ux.md, Abschnitt Buttons): Je Fall einer, der sie
  verletzt, und einer, der ihr ähnlich sieht und durchgehen muss. Deshalb bleibt der Befund
  eine Warnung und bricht keinen Build.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { konturbuttonAnalysieren, quelleAnalysieren, seiteAnalysieren } from '../pruefe-geschmack.mjs';

const regeln = (liste) => liste.map((b) => b.regel);

test('gefüllter Primärbutton mit Token ist in Ordnung', () => {
  const css = '.btn--haupt { background: var(--farbe-akzent); border: 1px solid var(--farbe-akzent); }';
  assert.deepEqual(konturbuttonAnalysieren(css), []);
});

test('Primärbutton mit transparentem Grund und Rand wird gemeldet', () => {
  const css = '.btn--haupt { background: transparent; border: 1px solid var(--farbe-text); }';
  const b = konturbuttonAnalysieren(css);
  assert.deepEqual(regeln(b), ['konturbutton-primaer']);
  assert.equal(b[0].zeile, 1);
});

test('Primärbutton mit Rand und ganz ohne Hintergrundangabe wird gemeldet', () => {
  assert.deepEqual(regeln(konturbuttonAnalysieren('.btn-primary { border: 2px solid currentColor; }')), ['konturbutton-primaer']);
});

test('fehlende Angabe ist kein Befund, wenn der Grundstil .btn eine Fläche setzt', () => {
  const css = '.btn { background: var(--farbe-akzent); }\n.btn--haupt { border: 1px solid var(--farbe-text); }';
  assert.deepEqual(konturbuttonAnalysieren(css), []);
});

test('Konturbutton als Sekundäraktion ist erlaubt', () => {
  const css = '.btn--zweit { background: transparent; border: 1px solid var(--farbe-text); }\n.btn--geist { border: 1px solid currentColor; }';
  assert.deepEqual(konturbuttonAnalysieren(css), []);
});

test('transparenter Hover- oder Fokuszustand eines gefüllten Primärbuttons zählt nicht', () => {
  const css = [
    '.btn--haupt { background: var(--farbe-akzent); }',
    '.btn--haupt:hover { background: transparent; border: 1px solid var(--farbe-akzent); }',
    '.btn--haupt:focus-visible { background: transparent; border: 2px solid var(--farbe-text); }',
  ].join('\n');
  assert.deepEqual(konturbuttonAnalysieren(css), []);
});

test('Rand in Transparent hält den Button nicht für einen Konturbutton', () => {
  const css = '.btn--haupt { background: transparent; border: 1px solid transparent; }';
  assert.deepEqual(konturbuttonAnalysieren(css), []);
});

test('Block im Kommentar wird nicht gemeldet', () => {
  assert.deepEqual(konturbuttonAnalysieren('/* .btn--haupt { background: transparent; border: 1px solid red; } */'), []);
});

test('data-variant="primary" wird erkannt, auch in Medienabfragen', () => {
  const css = '@media (min-width: 40rem) { [data-variant="primary"] { background: none; border: 1px solid #111; } }';
  assert.deepEqual(regeln(konturbuttonAnalysieren(css)), ['konturbutton-primaer']);
});

test('Tailwind: bg-transparent plus Rand am Primärbutton wird gemeldet', () => {
  const zeile = '<a class="btn btn--haupt bg-transparent border border-current px-4">Angebot anfragen</a>';
  assert.deepEqual(regeln(quelleAnalysieren(zeile)), ['konturbutton-primaer']);
  assert.deepEqual(quelleAnalysieren('<a class="btn btn--zweit bg-transparent border px-4">Mehr</a>'), []);
});

test('quelleAnalysieren reicht den Befund aus dem Stylesheet durch', () => {
  const css = '.btn--haupt {\n  background: transparent;\n  border: 1px solid #111;\n}';
  assert.deepEqual(regeln(quelleAnalysieren(css)), ['konturbutton-primaer']);
});

test('zwei Primärbuttons in einer Sektion ergeben einen Hinweis', () => {
  const html = '<main><section><a class="btn btn--haupt">A</a><a class="btn btn--haupt">B</a></section></main>';
  assert.deepEqual(regeln(seiteAnalysieren(html).warnungen).filter((r) => r === 'mehrere-primaer'), ['mehrere-primaer']);
});

test('ein Primärbutton je Sektion, auch bei mehreren Sektionen, bleibt ohne Hinweis', () => {
  const html = '<main><section><a class="btn btn--haupt">A</a><a class="btn btn--zweit">B</a></section>' +
    '<section><a class="btn btn--haupt">C</a></section></main><div role="dialog"><button class="btn btn--haupt">Ja</button><button class="btn btn--haupt">Nein</button></div>';
  assert.equal(regeln(seiteAnalysieren(html).warnungen).includes('mehrere-primaer'), false);
});
