/*
  deslop-satzmuster.test.mjs — prüft die Satzmuster im Kriterium „Floskeln".

      node --test 'scripts/tests/*.test.mjs'

  Je Muster ein Satz, der es trifft, und einer, der ihm ähnlich sieht und durchgehen muss.
  Die Muster stehen in deslop-check.mjs und gehören zu 12-copywriting.md.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../deslop-check.mjs', import.meta.url));
const pruefe = (text) => spawnSync('node', [SKRIPT, '--text', text], { encoding: 'utf8' });
const meldet = (text, muster) => new RegExp(`Floskeln: .*${muster}`).test(pruefe(text).stdout);

test('Kontrastfigur „nicht X, sondern Y" wird gefunden', () => {
  assert.ok(meldet('Wir bauen nicht irgendeine Seite, sondern Ihre.', 'Kontrastfigur'));
});

test('„nicht nur, sondern auch" ist keine Kontrastfigur, sondern eine alte Floskel', () => {
  assert.ok(!meldet('Wir liefern nicht nur die Seite, sondern auch den Text.', 'Kontrastfigur'));
});

test('Verneinungsreihe wird gefunden', () => {
  assert.ok(meldet('Kein Aufwand, keine Wartezeit. Sie bekommen Ihr Angebot.', 'Verneinungsreihe'));
});

test('eine einzelne Verneinung ist erlaubt', () => {
  assert.ok(!meldet('Sie zahlen keine Anfahrt innerhalb von Karlsruhe.', 'Verneinungsreihe'));
});

test('selbstbeantwortete Frage wird gefunden', () => {
  assert.ok(meldet('Wir sind schneller. Das Ergebnis? Drei Tage weniger Wartezeit.', 'Selbstbeantwortete Frage'));
});

test('eine echte Frage als Überschrift ist erlaubt', () => {
  assert.ok(!meldet('Wie lange dauert die Erstberatung? Sie dauert 45 Minuten.', 'Selbstbeantwortete Frage'));
});

test('ein sauberer, konkreter Text hat keinen Satzmusterbefund', () => {
  const erg = pruefe('Die Erstberatung dauert 45 Minuten und findet in Karlsruhe statt. Das Angebot kommt am selben Tag, seit 2014 für rund 300 Betriebe.');
  assert.ok(!/Floskeln/.test(erg.stdout));
});
