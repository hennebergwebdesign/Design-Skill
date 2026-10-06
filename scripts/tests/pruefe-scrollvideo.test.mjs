/*
  pruefe-scrollvideo.test.mjs — prüft die Regeln aus Kapitel 38 in pruefe-motion.mjs.

      node --test 'scripts/tests/*.test.mjs'

  Je Zeile der Tabelle ein bestandener und ein fehlschlagender Fall. Die Vorlagen unter
  assets/vorlagen/scrollvideo/ müssen die Prüfung selbst bestehen.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { scrollvideoAnalysieren, motionAnalysieren } from '../pruefe-motion.mjs';

const regeln = (inhalt) => scrollvideoAnalysieren(inhalt).map((b) => b.regel);
const vorlage = (name) => readFileSync(fileURLToPath(new URL(`../../skills/webdesign-conversion/assets/vorlagen/scrollvideo/${name}`, import.meta.url)), 'utf8');

const MARKUP_GUT = `<section data-scrollvideo data-src="/v.mp4">
  <img class="scrollvideo__poster" src="/p.webp" width="1600" height="900" alt="Produkt">
  <h2>Überschrift</h2>
</section>`;

// ------------------------------------------------------------------ reduzierte Bewegung

test('Scrollvideo mit Behandlung von prefers-reduced-motion besteht', () => {
  const js = `const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;\nconst { default: S } = await import('scrolly-video');`;
  assert.deepEqual(regeln(js), []);
});

test('Scrollvideo ohne prefers-reduced-motion ist ein Fehler', () => {
  const b = scrollvideoAnalysieren(`const { default: S } = await import('scrolly-video'); new S({});`);
  assert.equal(b.find((x) => x.regel === 'scrollvideo-ohne-reduzierung').schwere, 'fehler');
});

// ------------------------------------------------------------------ Poster

test('Poster mit Breite und Höhe besteht', () => {
  assert.deepEqual(regeln(MARKUP_GUT), []);
});

test('fehlt das Poster oder seine Größe, ist es ein Fehler', () => {
  assert.ok(regeln(MARKUP_GUT.replace(/<img[^>]*>/, '')).includes('scrollvideo-ohne-poster'));
  assert.ok(regeln(MARKUP_GUT.replace(' width="1600" height="900"', '')).includes('scrollvideo-ohne-poster'));
});

// ------------------------------------------------------------------ Text

test('Überschrift in der Sektion besteht, ohne Überschrift ist es ein Fehler', () => {
  assert.equal(regeln(MARKUP_GUT).includes('scrollvideo-ohne-text'), false);
  assert.ok(regeln(MARKUP_GUT.replace('<h2>Überschrift</h2>', '<p>nur Fließtext</p>')).includes('scrollvideo-ohne-text'));
});

test('eine Überschrift in einer anderen Sektion gilt nicht', () => {
  const html = `${MARKUP_GUT.replace('<h2>Überschrift</h2>', '')}<section><h2>Etwas anderes</h2></section>`;
  assert.ok(regeln(html).includes('scrollvideo-ohne-text'));
});

// ------------------------------------------------------------------ Laden

test('dynamischer Import besteht, statischer Import ist eine Warnung', () => {
  const gut = `window.matchMedia('(prefers-reduced-motion: reduce)');\nconst m = await import('scrolly-video');`;
  assert.deepEqual(regeln(gut), []);
  const schlecht = scrollvideoAnalysieren(`window.matchMedia('(prefers-reduced-motion: reduce)');\nimport ScrollyVideo from 'scrolly-video';`);
  assert.equal(schlecht[0].regel, 'scrollvideo-statischer-import');
  assert.equal(schlecht[0].schwere, 'warnung');
});

test('synchrones Script wird gemeldet, defer und type=module nicht', () => {
  const kopf = (attr) => `<script ${attr} src="https://cdn.example/scrolly-video.js"></script><!-- prefers-reduced-motion -->`;
  const mitMotion = (attr) => `${kopf(attr)}<style>@media (prefers-reduced-motion: reduce) { a { transition: none } }</style>`;
  assert.ok(regeln(mitMotion('')).includes('scrollvideo-synchrones-script'));
  assert.equal(regeln(mitMotion('defer')).includes('scrollvideo-synchrones-script'), false);
  assert.equal(regeln(mitMotion('type="module"')).includes('scrollvideo-synchrones-script'), false);
});

test('Kommentare zählen nicht als Fund', () => {
  assert.deepEqual(regeln('<!-- data-scrollvideo ohne Poster -->\n/* import "scrolly-video" */'), []);
});

// ------------------------------------------------------------------ Einbettungen

test('Einbettung mit aspect-ratio besteht, ohne Größe ist es eine Warnung', () => {
  const gut = '<div class="einbettung" data-embed-src="https://x.example/e" style="aspect-ratio: 16 / 9"><img src="p.webp" alt=""></div>';
  assert.deepEqual(regeln(gut), []);
  const schlecht = scrollvideoAnalysieren(gut.replace(' style="aspect-ratio: 16 / 9"', ''));
  assert.equal(schlecht[0].regel, 'einbettung-ohne-groesse');
  assert.equal(schlecht[0].schwere, 'warnung');
});

test('iframe auf fremde Adresse braucht Breite und Höhe', () => {
  assert.ok(regeln('<iframe src="https://viewer.example/3d"></iframe>').includes('einbettung-ohne-groesse'));
  assert.deepEqual(regeln('<iframe src="https://viewer.example/3d" width="800" height="450"></iframe>'), []);
  assert.deepEqual(regeln('<iframe src="/lokal/seite.html"></iframe>'), []);
});

// ------------------------------------------------------------------ Einbindung und Vorlagen

test('motionAnalysieren reicht die Befunde mit Zeile durch', () => {
  const b = motionAnalysieren('\n\n<section data-scrollvideo><p>x</p></section>');
  assert.ok(b.every((x) => x.zeile === 3));
  assert.deepEqual(b.map((x) => x.regel).sort(), ['scrollvideo-ohne-poster', 'scrollvideo-ohne-text']);
});

test('die mitgelieferten Vorlagen bestehen ihre eigene Prüfung', () => {
  for (const name of ['scrollvideo.html', 'scrollvideo.js', 'lazy-embed.js']) {
    assert.deepEqual(scrollvideoAnalysieren(vorlage(name)), [], name);
  }
});
