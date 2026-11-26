/*
  pruefe-claudemd.test.mjs — prüft die Größengrenzen der CLAUDE.md.

      node --test 'scripts/tests/*.test.mjs'

  Die Grenze ist nur dann etwas wert, wenn eine zu große Datei wirklich scheitert und eine
  kleine nicht. Geprüft werden Ziel, Obergrenze und das Ignorieren von node_modules.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-claudemd.mjs', import.meta.url));

function pruefe(bytes, unterordner = '') {
  const ordner = mkdtempSync(join(tmpdir(), 'claudemd-'));
  try {
    const ziel = join(ordner, unterordner);
    mkdirSync(ziel, { recursive: true });
    writeFileSync(join(ziel, 'CLAUDE.md'), 'a'.repeat(bytes));
    const r = spawnSync('node', [SKRIPT, ordner], { encoding: 'utf8' });
    return { code: r.status, ausgabe: r.stdout };
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
}

test('kleine Datei ist in Ordnung', () => {
  const r = pruefe(2000);
  assert.equal(r.code, 0);
  assert.match(r.ausgabe, /OK/);
});

test('über dem Ziel gibt nur einen Hinweis', () => {
  const r = pruefe(9000);
  assert.equal(r.code, 0);
  assert.match(r.ausgabe, /HINWEIS/);
});

test('über der Obergrenze scheitert', () => {
  const r = pruefe(11000);
  assert.equal(r.code, 1);
  assert.match(r.ausgabe, /FEHLER/);
});

test('node_modules wird ignoriert', () => {
  const r = pruefe(50000, 'node_modules');
  assert.equal(r.code, 2);
});
