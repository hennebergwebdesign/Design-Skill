/*
  pruefe-kontrast.test.mjs — prüft die Rollenpaare und die freien Paare aus --paare.

      node --test 'scripts/tests/*.test.mjs'
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-kontrast.mjs', import.meta.url));
const ordner = () => mkdtempSync(join(tmpdir(), 'kontrast-'));
const lauf = (cwd, ...args) => spawnSync('node', [SKRIPT, ...args], { encoding: 'utf8', cwd });

function paare(dir, liste) {
  const pfad = join(dir, 'paare.json');
  writeFileSync(pfad, JSON.stringify({ paare: liste }));
  return pfad;
}

test('freies Paar unter 4,5:1 ist ein Verstoß, auch ohne tokens.css', () => {
  const dir = ordner();
  const r = lauf(dir, '--paare', paare(dir, [{ name: 'Grau auf Weiß', vorn: '#999999', hinten: '#ffffff', groesse: 'normal' }]));
  assert.equal(r.status, 1);
  assert.match(r.stdout, /FEHL .*Grau auf Weiß/);
});

test('große Schrift und Bedienelemente brauchen 3:1, nicht 4,5:1', () => {
  const dir = ordner();
  /* #949494 auf Weiß liegt bei rund 3,03:1 */
  const liste = [
    { name: 'Display', vorn: '#949494', hinten: '#ffffff', groesse: 'gross' },
    { name: 'Rahmen', vorn: '#949494', hinten: '#ffffff', groesse: 'ui' },
  ];
  assert.equal(lauf(dir, '--paare', paare(dir, liste)).status, 0);
});

test('Tokennamen werden aus tokens.css aufgelöst', () => {
  const dir = ordner();
  writeFileSync(join(dir, 'tokens.css'), ':root { --farbe-flaeche-dunkel: #111111; --farbe-text: #1a1a1a; --farbe-flaeche: #ffffff; }');
  const r = lauf(dir, join(dir, 'tokens.css'), '--paare', paare(dir, [{ name: 'Weiß auf Bildabdunklung', vorn: '#ffffff', hinten: '--farbe-flaeche-dunkel' }]));
  assert.equal(r.status, 0);
  assert.match(r.stdout, /ok .*Weiß auf Bildabdunklung/);
});

test('fehlende Paardatei ist ein Aufrufproblem', () => {
  assert.equal(lauf(ordner(), '--paare', 'gibt-es-nicht.json').status, 2);
});
