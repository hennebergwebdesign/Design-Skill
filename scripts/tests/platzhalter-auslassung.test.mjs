/*
  platzhalter-auslassung.test.mjs — prüft, dass abgekürzter Code vor dem Livegang auffällt.

      node --test 'scripts/tests/*.test.mjs'

  Ein Modell, das unter Längendruck gerät, schreibt „// ..." oder „// Rest wie oben" und
  meldet fertig. Das ist kein offener Wert, sondern fehlender Code, und er darf nicht live
  gehen. Der Spread-Operator und die Auslassungspunkte im Text dürfen dabei nicht anschlagen,
  sonst wird die Prüfung abgeschaltet.
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
  const ordner = mkdtempSync(join(tmpdir(), 'platzhalter-'));
  try {
    mkdirSync(join(ordner, 'src'));
    for (const [name, inhalt] of Object.entries(dateien)) writeFileSync(join(ordner, 'src', name), inhalt);
    return spawnSync(process.execPath, [SKRIPT, '--launch'], { cwd: ordner, encoding: 'utf8' });
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
}

test('drei Punkte als einziger Kommentarinhalt sind eine Auslassung', () => {
  for (const zeile of ['  // ...', '  /* ... */', '  {/* … */}', '  <!-- ... -->']) {
    const erg = pruefe({ 'Held.astro': `<section>\n${zeile}\n</section>\n` });
    assert.equal(erg.status, 1, `${zeile}\n${erg.stdout}`);
    assert.match(erg.stdout, /Auslassung/);
  }
});

test('Auslassung in Worten wird gefunden', () => {
  for (const zeile of ['// Rest wie oben', '// rest of code unchanged', '/* restliche Sektionen analog */', '// hier implementieren']) {
    const erg = pruefe({ 'seite.ts': `export const a = 1;\n${zeile}\n` });
    assert.equal(erg.status, 1, `${zeile}\n${erg.stdout}`);
  }
});

test('Spread-Operator, Auslassungspunkte im Text und ein normaler Kommentar sind kein Befund', () => {
  const erg = pruefe({
    'hilfe.ts': 'export const f = (...args) => g(...args);\n// Farben kommen aus den Rollen-Tokens\n',
    'Zitat.astro': '<p>Wir dachten erst … dann kam der Anruf.</p>\n',
  });
  assert.equal(erg.status, 0, erg.stdout);
  assert.doesNotMatch(erg.stdout, /Auslassung/);
});
