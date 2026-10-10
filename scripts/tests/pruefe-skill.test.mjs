/*
  pruefe-skill.test.mjs — prüft die Aufbauregeln für die Skills dieses Plugins.

      node --test 'scripts/tests/*.test.mjs'
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { skillAnalysieren, referenzAnalysieren, inhaltSetzen, inhaltLesen, verweise } from '../pruefe-skill.mjs';

const SKRIPT = fileURLToPath(new URL('../pruefe-skill.mjs', import.meta.url));
const regeln = (erg) => [...erg.fehler, ...erg.warnungen].map((b) => b.regel);
const kopf = (name, beschreibung = 'Prüft Dinge.') => `---\nname: ${name}\ndescription: ${beschreibung}\n---\n\n# Titel\n`;
const lang = (abschnitte, zeilenJe = 40) =>
  `# Kapitel\n\nEinleitung.\n\n${abschnitte.map((a) => `## ${a}\n\n${'Zeile.\n'.repeat(zeilenJe)}`).join('\n')}`;

test('SKILL.md über 500 Zeilen und falscher Name sind Fehler', () => {
  const erg = skillAnalysieren(kopf('Mein_Skill') + 'x\n'.repeat(510));
  assert.ok(regeln(erg).includes('skill-laenge'));
  assert.ok(regeln(erg).includes('skill-name'));
  assert.ok(regeln(skillAnalysieren(kopf('claude-helfer'))).includes('skill-name'));
  assert.deepEqual(regeln(skillAnalysieren(kopf('webdesign-conversion'))), []);
});

test('lange Beschreibung ist eine Warnung, nicht genannte Referenz auch', () => {
  const erg = skillAnalysieren(kopf('gut', 'x'.repeat(1100)) + 'Siehe `references/01-a.md`.', ['01-a.md', '02-b.md']);
  assert.deepEqual(erg.fehler, []);
  assert.ok(regeln(erg).includes('beschreibung-lang'));
  assert.equal(erg.warnungen.filter((w) => w.regel === 'nicht-verlinkt').length, 1);
});

test('Referenz über 100 Zeilen ohne Inhalt ist ein Fehler, kurze nicht', () => {
  assert.ok(regeln(referenzAnalysieren(lang(['1. Eins', '2. Zwei', '3. Drei']))).includes('inhalt-fehlt'));
  assert.deepEqual(regeln(referenzAnalysieren(lang(['Eins'], 5))), []);
});

test('inhaltSetzen legt das Verzeichnis vor dem ersten Abschnitt an und ist wiederholbar', () => {
  const text = lang(['1. Eins', '2. Zwei', 'Verwandte Kapitel']);
  const neu = inhaltSetzen(text);
  assert.ok(neu.indexOf('## Inhalt') < neu.indexOf('## 1. Eins'));
  assert.match(neu, /- 1\\\. Eins/);
  assert.deepEqual(inhaltLesen(neu), ['1. Eins', '2. Zwei', 'Verwandte Kapitel']);
  assert.equal(inhaltSetzen(neu), neu);
  assert.deepEqual(regeln(referenzAnalysieren(neu)), []);
});

test('veraltetes Verzeichnis ist eine Warnung', () => {
  const alt = inhaltSetzen(lang(['1. Eins', '2. Zwei']));
  const neu = alt.replace('## 2. Zwei', '## 2. Zwei neu');
  assert.ok(regeln(referenzAnalysieren(neu)).includes('inhalt-veraltet'));
});

test('Abschnitte in Codeblöcken zählen nicht', () => {
  const text = inhaltSetzen(lang(['1. Eins', '2. Zwei']) + '\n```\n## Kein Abschnitt\n```\n');
  assert.deepEqual(inhaltLesen(text), ['1. Eins', '2. Zwei']);
});

test('nur Verweise in die Skillordner zählen', () => {
  const v = verweise('Siehe `24-designsystem-vorrang.md`, `references/qa.md`, `CLAUDE.md` und `public/images/BILDER.md`.');
  assert.deepEqual(v.sort(), ['24-designsystem-vorrang.md', 'references/qa.md']);
});

test('Lauf über einen Skillordner findet toten Verweis und legt Verzeichnis an', () => {
  const wurzel = mkdtempSync(join(tmpdir(), 'skills-'));
  mkdirSync(join(wurzel, 'probe', 'references'), { recursive: true });
  writeFileSync(join(wurzel, 'probe', 'SKILL.md'), kopf('probe') + 'Siehe `references/01-lang.md` und `references/02-fehlt.md`.\n');
  writeFileSync(join(wurzel, 'probe', 'references', '01-lang.md'), lang(['1. Eins', '2. Zwei', '3. Drei']));
  const vorher = spawnSync('node', [SKRIPT, '--wurzel', wurzel], { encoding: 'utf8' });
  assert.equal(vorher.status, 1);
  assert.match(vorher.stdout, /02-fehlt\.md/);
  const nachher = spawnSync('node', [SKRIPT, '--wurzel', wurzel, '--inhalt'], { encoding: 'utf8' });
  assert.equal(nachher.status, 0);
  assert.match(readFileSync(join(wurzel, 'probe', 'references', '01-lang.md'), 'utf8'), /## Inhalt/);
});
