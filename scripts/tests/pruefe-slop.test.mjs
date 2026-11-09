/*
  pruefe-slop.test.mjs — prüft den Agenturmaßstab in pruefe-slop.mjs gegen einen Ersatz-CLI.

  Der echte CLI braucht einen Browser. Hier steht an seiner Stelle ein kleines Skript, das eine
  vorbereitete JSON-Antwort ausgibt, in der Form, die Slop Detect 0.8.0 tatsächlich liefert
  (am 09.11.2026 gegen den echten CLI gemessen). Ein Lauf gegen den echten CLI ist optional:

      SLOP_ECHT=http://localhost:4321 node --test scripts/tests/pruefe-slop.test.mjs

      node --test 'scripts/tests/*.test.mjs'
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-slop.mjs', import.meta.url));

const muster = (id, weight, extra = {}) => ({ id, label: id, weight, triggered: true, evidence: {}, ...extra });

function ersatzCli({ doku, flags = '--json --copy --aeo --craft --design-md' }) {
  const ordner = mkdtempSync(join(tmpdir(), 'slop-'));
  const antwort = join(ordner, 'antwort.json');
  writeFileSync(antwort, JSON.stringify(doku));
  const cli = join(ordner, 'cli.mjs');
  writeFileSync(cli, `
    import { readFileSync } from 'node:fs';
    if (process.argv.includes('--help')) { console.log('Options: ${flags}'); process.exit(0); }
    console.log(readFileSync(${JSON.stringify(antwort)}, 'utf8'));
  `);
  return { cli, ordner };
}

const lauf = (doku, args = [], opt = {}) => {
  const { cli, ordner } = ersatzCli({ doku, flags: opt.flags });
  const r = spawnSync('node', [SKRIPT, 'http://localhost:4321', ...args], {
    encoding: 'utf8', cwd: ordner, env: { ...process.env, SLOP_DETECT_BIN: cli },
  });
  return { ...r, ordner };
};

const gescannt = (score, patterns, copy) => ({
  url: 'http://localhost:4321', definitionsVersion: '2026.09', score, tier: score >= 28 ? 'Heavy' : score >= 10 ? 'Mild' : 'Clean',
  patterns,
  axes: { design: { score, tier: 'x', patterns }, ...(copy ? { copy } : {}) },
});

test('saubere Seite endet mit 0', () => {
  const r = lauf(gescannt(0, []));
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Keine offenen Treffer/);
});

test('Heavy im Design ist ein Befund, Exit 1', () => {
  const r = lauf(gescannt(40, [muster('slop_fonts', 8), muster('purple_accent', 8), muster('cream_default_bg', 7), muster('gradient_text', 6), muster('accent_stripe', 6), muster('colored_glows', 5)]));
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Design Heavy/);
  assert.match(r.stdout, /Standardschrift/);
});

test('Mild ist Warnung, mit --streng ein Fehler', () => {
  const doku = gescannt(15, [muster('slop_fonts', 8), muster('purple_accent', 7)]);
  assert.equal(lauf(doku).status, 0);
  const r = lauf(doku, ['--streng']);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /mit --streng/);
});

test('Ausnahme mit Begründung zieht das Gewicht ab und bleibt sichtbar', () => {
  const doku = gescannt(30, [muster('cream_default_bg', 7), muster('slop_fonts', 8), muster('gradient_text', 6), muster('accent_stripe', 6), muster('purple_accent', 3)]);
  const { cli, ordner } = ersatzCli({ doku });
  const datei = join(ordner, 'slop-ausnahmen.json');
  writeFileSync(datei, JSON.stringify({ ausnahmen: {
    cream_default_bg: 'Greige ist die Grundfarbe laut Brand Guide, Freigabe des Kunden liegt vor',
    slop_fonts: 'Inter ist die Markenschrift laut marke.json, vom Kunden vorgegeben',
  } }));
  const r = spawnSync('node', [SKRIPT, 'http://localhost:4321', '--ausnahmen', datei, '--json'], {
    encoding: 'utf8', env: { ...process.env, SLOP_DETECT_BIN: cli },
  });
  const j = JSON.parse(r.stdout);
  assert.equal(j.design.roh, 30);
  assert.equal(j.design.bereinigt, 15);
  assert.equal(j.design.stufe, 'Mild');
  assert.deepEqual(j.ausnahmen.map((a) => a.id).sort(), ['cream_default_bg', 'slop_fonts']);
  assert.equal(r.status, 0);
});

test('Ausnahme ohne Begründung bricht mit 2 ab', () => {
  const doku = gescannt(7, [muster('cream_default_bg', 7)]);
  const { cli, ordner } = ersatzCli({ doku });
  const datei = join(ordner, 'slop-ausnahmen.json');
  writeFileSync(datei, JSON.stringify({ ausnahmen: { cream_default_bg: 'ok' } }));
  const r = spawnSync('node', [SKRIPT, 'http://localhost:4321', '--ausnahmen', datei], {
    encoding: 'utf8', env: { ...process.env, SLOP_DETECT_BIN: cli },
  });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /keine Begründung/);
});

test('gesperrte oder leere Seite ist nie sauber', () => {
  const r = lauf({ url: 'x', blocked: true, code: 'empty_page', score: null, hint: 'zu wenig Inhalt' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /NICHT GEPRÜFT/);
});

test('Fehler im Lauf (Navigation) ist Exit 2, auch wenn der CLI selbst 0 liefert', () => {
  const r = lauf({ url: 'x', error: 'page.goto: net::ERR_CONNECTION_REFUSED' });
  assert.equal(r.status, 2);
});

test('Textartefakt ist ein Fehler, Floskel nur ein Hinweis', () => {
  const copy = { score: 12, tier: 'Mild', wordCount: 400, patterns: [muster('unfilled_placeholders', 0, { status: 'review' }), muster('filler_openers', 5)] };
  const r = lauf(gescannt(0, [], copy));
  assert.equal(r.status, 1);
  assert.match(r.stdout, /FEHLER\s+unfilled_placeholders|FEHLER/);
  assert.match(r.stdout, /Hinweis/);
  const nurFloskel = lauf(gescannt(0, [], { score: 5, tier: 'Clean', wordCount: 400, patterns: [muster('filler_openers', 5)] }));
  assert.equal(nurFloskel.status, 0);
});

test('Schalter, den der CLI nicht kennt, wird als nicht geprüft ausgewiesen', () => {
  const r = lauf(gescannt(0, []), ['--craft'], { flags: '--json --copy --aeo' });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Nicht geprüft/);
  assert.match(r.stdout, /--craft/);
});

test('--remote und --api werden abgelehnt', () => {
  for (const flag of ['--remote', '--api']) {
    const r = spawnSync('node', [SKRIPT, 'http://localhost:4321', flag], { encoding: 'utf8' });
    assert.equal(r.status, 2);
    assert.match(r.stderr, /Dritten/);
  }
});

test('file:// wird abgelehnt', () => {
  const r = spawnSync('node', [SKRIPT, 'file:///tmp/x.html'], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /http\(s\)/);
});

test('--vorbeugen listet die Muster mit Gegenmittel, ohne Lauf', () => {
  const r = spawnSync('node', [SKRIPT, '--vorbeugen'], { encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Verlaufstext/);
  assert.match(r.stdout, /stattdessen/);
});

test('optional: echter CLI gegen eine laufende Seite', { skip: !process.env.SLOP_ECHT }, () => {
  const r = spawnSync('node', [SKRIPT, process.env.SLOP_ECHT, '--json'], { encoding: 'utf8', timeout: 240000 });
  assert.ok([0, 1].includes(r.status), r.stderr);
  assert.ok(JSON.parse(r.stdout).design);
});
