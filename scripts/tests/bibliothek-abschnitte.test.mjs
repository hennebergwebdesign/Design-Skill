/*
  bibliothek-abschnitte.test.mjs — prüft den Baukasten der Template Bibliothek.

      node --test 'scripts/tests/*.test.mjs'

  Arbeitet auf einer Wegwerf Bibliothek im Temp Ordner, nie auf der echten.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { seitenLaden, pruefen, uebersicht } from '../bibliothek-abschnitte.mjs';

function bibliothek(abschnitte, html) {
  const bib = mkdtempSync(join(tmpdir(), 'bib-'));
  mkdirSync(join(bib, 't900'));
  writeFileSync(join(bib, 't900', 'ABSCHNITTE.json'), JSON.stringify(abschnitte));
  writeFileSync(join(bib, 't900', 'KARTE.json'), JSON.stringify({ id: 't900', name: 'Testseite' }));
  writeFileSync(join(bib, 't900', 'index.html'), html);
  return bib;
}

const gut = { id: 'faq', name: 'FAQ', kategorie: 'faq', selektor: 'section[data-abschnitt=faq]', prinzip: 'p', css: '.faq__' };

test('vollständiger Abschnitt besteht', () => {
  const bib = bibliothek([gut], '<section data-abschnitt="faq"></section>');
  assert.deepEqual(pruefen(seitenLaden(bib), ['faq'], bib), []);
});

test('fehlendes Feld, unbekannte Kategorie und fehlendes data-abschnitt werden gemeldet', () => {
  const bib = bibliothek([{ ...gut, prinzip: '', kategorie: 'unsinn' }], '<section></section>');
  const b = pruefen(seitenLaden(bib), ['faq'], bib).join('\n');
  assert.match(b, /Feld prinzip fehlt/);
  assert.match(b, /Kategorie unsinn/);
  assert.match(b, /data-abschnitt="faq" steht nicht/);
});

test('doppelte Kennung wird gemeldet', () => {
  const bib = bibliothek([gut, gut], '<section data-abschnitt="faq"></section>');
  assert.match(pruefen(seitenLaden(bib), ['faq'], bib).join('\n'), /doppelt/);
});

test('Übersicht gruppiert nach Kategorie', () => {
  const bib = bibliothek([gut], '<section data-abschnitt="faq"></section>');
  const u = uebersicht(seitenLaden(bib));
  assert.match(u, /### faq/);
  assert.match(u, /t900 Testseite/);
});
