/*
  pruefe-striche.test.mjs — prüft den Bindestrich als Gedankenstrich und den Hook-Modus.

      node --test 'scripts/tests/*.test.mjs'

  Der Hook läuft nach jedem Schreiben einer Datei. Ein Fehlalarm dort hält jede Sitzung auf,
  deshalb je Regel auch die Fälle, die durchgehen müssen.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-striche.mjs', import.meta.url));

function datei(name, inhalt) {
  const ordner = mkdtempSync(join(tmpdir(), 'striche-'));
  const pfad = join(ordner, name);
  writeFileSync(pfad, inhalt);
  return { ordner, pfad };
}
const lauf = (pfad) => spawnSync('node', [SKRIPT, pfad], { encoding: 'utf8', cwd: tmpdir() });
const hook = (eingabe) => spawnSync('node', [SKRIPT, '--hook'], { encoding: 'utf8', cwd: tmpdir(), input: eingabe });

test('Bindestrich mit Leerzeichen in der Überschrift ist ein Fehler', () => {
  const { pfad } = datei('Held.astro', '<h1>Dach - Sanierung in Kassel</h1>\n');
  const r = lauf(pfad);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Bindestrich mit Leerzeichen als Gedankenstrich in Überschrift/);
});

test('im Fließtext eine Warnung, in Markdown auch', () => {
  assert.equal(lauf(datei('Text.astro', '<p>Wir sanieren - schnell und sauber.</p>\n').pfad).status, 0);
  assert.match(lauf(datei('Text.astro', '<p>Wir sanieren - schnell und sauber.</p>\n').pfad).stdout, /im Text/);
  assert.match(lauf(datei('seite.md', 'Unser Ablauf - einfach erklärt.\n').pfad).stdout, /Bindestrich mit Leerzeichen/);
});

test('Code, Aufzählung und Kompositum sind kein Befund', () => {
  const inhalt = [
    '<div style="width: calc(100% - 2rem)">Breite</div>',
    '<p>{preis - rabatt}</p>',
    '<p>Ihre E-Mail-Adresse</p>',
    '<script>const x = a - b;</script>',
  ].join('\n');
  const r = lauf(datei('Code.astro', inhalt).pfad);
  assert.doesNotMatch(r.stdout, /Bindestrich mit Leerzeichen/);
  assert.doesNotMatch(lauf(datei('liste.md', '- erster Punkt\n- zweiter Punkt\n').pfad).stdout, /Bindestrich mit Leerzeichen/);
});

test('Hook meldet Fehler auf stderr mit Exit 2', () => {
  const { pfad } = datei('Held.astro', '<h2>Leistungen — Überblick</h2>\n');
  const r = hook(JSON.stringify({ tool_name: 'Write', tool_input: { file_path: pfad } }));
  assert.equal(r.status, 2);
  assert.match(r.stderr, /Geviertstrich/);
});

test('Hook bleibt still bei sauberer Datei, Warnung, Fremdendung und leerer Eingabe', () => {
  assert.equal(hook(JSON.stringify({ tool_input: { file_path: datei('ok.astro', '<h2>Leistungen im Überblick</h2>\n').pfad } })).status, 0);
  assert.equal(hook(JSON.stringify({ tool_input: { file_path: datei('w.astro', '<p>Wir sanieren - schnell.</p>\n').pfad } })).status, 0);
  assert.equal(hook(JSON.stringify({ tool_input: { file_path: datei('bild.png', '—').pfad } })).status, 0);
  assert.equal(hook('').status, 0);
  assert.equal(hook('kein json').status, 0);
});

test('Frontmatter und mehrzeiliges Skript in Astro sind Code', () => {
  const inhalt = ['---', 'const titel = name - 1;', '---', '<script>', '  const rest = gesamt - teil;', '</script>', '<p>Text</p>'].join('\n');
  assert.doesNotMatch(lauf(datei('Seite.astro', inhalt).pfad).stdout, /Bindestrich mit Leerzeichen/);
});
