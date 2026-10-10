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

test('Vorwurf an den Leser wird gefunden', () => {
  assert.ok(meldet('Die meisten Betriebe machen ihre Website falsch.', 'Vorwurf an den Leser'));
});

test('eine Lagebeschreibung ohne Vorwurf ist erlaubt', () => {
  assert.ok(!meldet('Für Betriebe, die ihre Website haben und mehr Anfragen wollen.', 'Vorwurf an den Leser'));
});

test('absolutes Versprechen wird gefunden', () => {
  assert.ok(meldet('Ihre Anfragen verdoppeln sich über Nacht, garantiert.', 'Absolutes Versprechen'));
});

test('ein Zeitrahmen mit Quote ist erlaubt', () => {
  assert.ok(!meldet('Bei neun von zehn Kunden stiegen die Anfragen innerhalb eines Jahres um mehr als die Hälfte.', 'Absolutes Versprechen'));
});

test('Weichmacher werden gefunden', () => {
  assert.ok(meldet('Wir können Ihnen eventuell weiterhelfen, das ist eigentlich unser Spezialgebiet.', 'Weichmacher'));
});

test('eine klare Aussage mit „finden“ ist kein Weichmacher', () => {
  assert.ok(!meldet('Wir finden die Ursache innerhalb von 48 Stunden und dokumentieren sie.', 'Weichmacher'));
});

test('ein sauberer, konkreter Text hat keinen Satzmusterbefund', () => {
  const erg = pruefe('Die Erstberatung dauert 45 Minuten und findet in Karlsruhe statt. Das Angebot kommt am selben Tag, seit 2014 für rund 300 Betriebe.');
  assert.ok(!/Floskeln/.test(erg.stdout));
});

test('Stakkato aus drei kurzen Sätzen wird gefunden', () => {
  assert.ok(meldet('Müde? Wir helfen. Unser Programm funktioniert. Echte Ergebnisse.', 'Stakkato'));
});

test('ein kurzer Satz zwischen langen ist Rhythmus, kein Stakkato', () => {
  assert.ok(!meldet('Wir sind da. Sie rufen an, und wir kommen innerhalb von 24 Stunden zu Ihnen nach Karlsruhe. Das ist alles.', 'Stakkato'));
});

test('Abkürzungen in Öffnungszeiten zerlegen den Text nicht in Stakkato', () => {
  assert.ok(!meldet('Geöffnet Mo. bis Fr. von 8 bis 17 Uhr. Sa. nach Vereinbarung. Rufen Sie an.', 'Stakkato'));
});

test('runde Kundenzahl mit „zufrieden" wird gefunden, eine echte krumme Zahl nicht', () => {
  assert.ok(meldet('Über 10.000 zufriedene Kunden vertrauen uns.', 'Runde Kundenzahl'));
  assert.ok(meldet('500+ glückliche Kunden in der Region.', 'Runde Kundenzahl'));
  assert.ok(!meldet('Seit 2011 haben wir 1.243 Dächer in Kassel gedeckt.', 'Runde Kundenzahl'));
});

test('Startliste des Pakets 2026: Rundum-Sorglos und Game Changer', () => {
  assert.ok(meldet('Unser Rundum-Sorglos-Paket für Ihr Dach.', 'rundum-sorglos'));
  assert.ok(meldet('Ein echter Game Changer für Ihren Betrieb.', 'game changer'));
});
