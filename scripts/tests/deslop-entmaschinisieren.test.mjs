/*
  deslop-entmaschinisieren.test.mjs — prüft die Muster aus 51-text-entmaschinisieren.md in deslop-check.mjs.

      node --test 'scripts/tests/*.test.mjs'

  Je Muster ein Satz, der es trifft, und einer, der ihm ähnlich sieht und durchgehen muss.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../deslop-check.mjs', import.meta.url));
const pruefe = (text) => spawnSync('node', [SKRIPT, '--text', text], { encoding: 'utf8' });
const meldet = (text, muster) => new RegExp(`Floskeln: .*${muster}`).test(pruefe(text).stdout);

test('Bedeutungsaufblähung wird gefunden', () => {
  assert.ok(meldet('Unsere Gründung 2009 war ein Meilenstein für die Region.', 'Bedeutungsaufblähung'));
  assert.ok(meldet('Handwerk spielt eine entscheidende Rolle in der Energiewende.', 'Bedeutungsaufblähung'));
});

test('die schlichte Tatsache ist erlaubt', () => {
  assert.ok(!meldet('Seit 2009 bauen wir Dachstühle in der Region Hildesheim.', 'Bedeutungsaufblähung'));
  assert.ok(!meldet('Der Stein spielt in diesem Bad die Hauptrolle.', 'Bedeutungsaufblähung'));
});

test('Tiefsinn-Floskel wird gefunden', () => {
  assert.ok(meldet('Im Kern geht es darum, ob Ihr Team Zeit hat.', 'Tiefsinn-Floskel'));
  assert.ok(meldet('Am Ende des Tages zählt das Ergebnis.', 'Tiefsinn-Floskel'));
});

test('eine Aussage ohne Tiefsinn-Floskel ist erlaubt', () => {
  assert.ok(!meldet('Es kommt darauf an, ob Ihr Team Zeit hat.', 'Tiefsinn-Floskel'));
});

test('inszenierter Anlauf wird gefunden', () => {
  assert.ok(meldet('Tauchen wir ein: Wie lange hält ein Flachdach?', 'Inszenierter Anlauf'));
  assert.ok(meldet('Das ist teuer. Mal ehrlich, es lohnt sich nur bei Altbauten.', 'Inszenierter Anlauf'));
});

test('ein Satz, der mit der Sache beginnt, ist erlaubt', () => {
  assert.ok(!meldet('Ein Flachdach hält je nach Abdichtung zwischen 25 und 40 Jahren.', 'Inszenierter Anlauf'));
});

test('Chatbot-Rest wird gefunden', () => {
  assert.ok(meldet('Gerne! Hier ist ein Entwurf für Ihre Startseite.', 'Chatbot-Rest'));
  assert.ok(meldet('Wir bauen Dächer. Ich hoffe, das hilft Ihnen weiter.', 'Chatbot-Rest'));
  assert.ok(meldet('Als Sprachmodell kann ich keine Preise nennen.', 'Chatbot-Rest'));
});

test('„Hier ist" in einer normalen Kontaktzeile ist erlaubt', () => {
  assert.ok(!meldet('Hier ist unsere Adresse: Marktstraße 4, Hildesheim.', 'Chatbot-Rest'));
});

test('Deutungsanhang wird gefunden', () => {
  assert.ok(meldet('Wir antworten innerhalb eines Tages, was unseren Anspruch an Servicequalität unterstreicht.', 'Deutungsanhang'));
});

test('ein Relativsatz ohne Deutung ist erlaubt', () => {
  assert.ok(!meldet('Wir antworten innerhalb eines Tages, was bei Notfällen auch am Wochenende gilt.', 'Deutungsanhang'));
});

test('drei Sätze mit demselben ersten Wort werden gefunden, zwei nicht', () => {
  assert.ok(meldet('Wir beraten Sie vor Ort. Wir planen den Ablauf mit Ihnen. Wir bauen in drei Wochen.', 'Wiederholter Satzanfang'));
  assert.ok(!meldet('Wir beraten Sie vor Ort. Wir planen den Ablauf mit Ihnen. Nach drei Wochen sind wir fertig.', 'Wiederholter Satzanfang'));
});

test('neue Wörter der Liste werden als Floskel gezählt', () => {
  const ausgabe = pruefe('Ein wahres Juwel inmitten von Hildesheim mit tiefgreifenden Änderungen.').stdout;
  assert.match(ausgabe, /Floskeln: .*(?:wahres juwel|inmitten von|tiefgreifend)/);
});
