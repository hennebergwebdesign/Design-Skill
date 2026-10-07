/*
  platzhalter-tweaks.test.mjs — prüft, dass ein Reglerpanel nicht live gehen kann.

      node --test 'scripts/tests/*.test.mjs'

  Das Tweaks-Panel (assets/vorlagen/prompts/tweaks-panel.md) ist ein Entwicklungswerkzeug.
  Es trägt die Markierung data-tweaks-panel, und pruefe-platzhalter.mjs --launch schlägt an,
  solange sie im Quelltext steht.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-platzhalter.mjs', import.meta.url));

function pruefe(dateien) {
  const ordner = mkdtempSync(join(tmpdir(), 'tweaks-'));
  try {
    mkdirSync(join(ordner, 'src'));
    for (const [name, inhalt] of Object.entries(dateien)) writeFileSync(join(ordner, 'src', name), inhalt);
    return spawnSync(process.execPath, [SKRIPT, '--launch'], { cwd: ordner, encoding: 'utf8' });
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
}

test('ein Tweaks-Panel im Quelltext schlägt im Launch-Modus an', () => {
  const r = pruefe({ 'Layout.astro': '<body><div data-tweaks-panel></div></body>' });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Tweaks-Panel/);
});

test('eine Seite ohne Panel besteht', () => {
  const r = pruefe({ 'Layout.astro': '<body><main><h1>Titel</h1></main></body>' });
  assert.equal(r.status, 0);
});

test('das Wort Tweaks im Fließtext schlägt nicht an', () => {
  const r = pruefe({ 'Text.astro': '<p>Kleine Tweaks am Abstand.</p>' });
  assert.equal(r.status, 0);
});
