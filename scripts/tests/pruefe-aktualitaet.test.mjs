/*
  pruefe-aktualitaet.test.mjs — prüft die Jahreszahl-Muster in pruefe-aktualitaet.mjs.

      node --test 'scripts/tests/*.test.mjs'
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-aktualitaet.mjs', import.meta.url));
const lauf = (inhalt) => {
  const ordner = mkdtempSync(join(tmpdir(), 'aktu-'));
  const datei = join(ordner, 'index.html');
  writeFileSync(datei, inhalt);
  return spawnSync('node', [SKRIPT, datei, '--jahr', '2026'], { encoding: 'utf8' });
};

test('altes Copyright-Jahr ist ein harter Befund', () => {
  const r = lauf('<footer>© 2023 Muster GmbH</footer>');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Copyright-Jahr 2023/);
});

test('Spanne mit altem Ende wird gefunden, aktuelles Ende nicht', () => {
  assert.equal(lauf('<p>© 2019 bis 2023 Muster</p>').status, 1);
  assert.equal(lauf('<p>© 2019–2026 Muster</p>').status, 0);
});

test('aktuelles Jahr und &copy; Entität', () => {
  assert.equal(lauf('<p>&copy; 2026 Muster</p>').status, 0);
  assert.equal(lauf('<p>&copy; 2024 Muster</p>').status, 1);
});

test('Gründungsjahr ist kein Befund', () => {
  const r = lauf('<p>Familienbetrieb seit 1998 in Köln.</p>');
  assert.equal(r.status, 0);
  assert.doesNotMatch(r.stdout, /1998/);
});

test('alte Stand-Angabe ist ein Hinweis, kein Fehler', () => {
  const r = lauf('<p>Stand: März 2022</p>');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Stand-Angabe 2022/);
});

test('Jahr im Titel wird als Hinweis gemeldet', () => {
  const r = lauf('<h1>Die besten Tools 2023</h1>');
  assert.match(r.stdout, /Jahr im Titel 2023/);
  assert.doesNotMatch(lauf('<h1>Die besten Tools 2026</h1>').stdout, /Jahr im Titel/);
});

test('erster Pfad wird ohne --jahr nicht verschluckt', () => {
  const ordner = mkdtempSync(join(tmpdir(), 'aktu-'));
  writeFileSync(join(ordner, 'a.html'), '<p>© 2001 Alt</p>');
  assert.equal(spawnSync('node', [SKRIPT, ordner], { encoding: 'utf8' }).status, 1);
});
