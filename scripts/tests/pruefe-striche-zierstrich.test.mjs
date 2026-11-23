/*
  pruefe-striche-zierstrich.test.mjs: prüft den Zierstrich vor dem Kicker.

      node --test 'scripts/tests/*.test.mjs'

  Auslöser war eine Kundenseite, auf der vor dem Kicker "Hersteller aus Bielefeld, seit 2005" ein gelbes
  Linienstück stand, gebaut als .eyebrow::before. Die Regel gegen Striche vor dem Kicker gab es,
  aber das Skript las nur Zeichen, kein CSS. Je Regel auch die Fälle, die durchgehen müssen.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-striche.mjs', import.meta.url));
function lauf(name, inhalt) {
  const ordner = mkdtempSync(join(tmpdir(), 'zierstrich-'));
  const pfad = join(ordner, name);
  writeFileSync(pfad, inhalt);
  return spawnSync('node', [SKRIPT, pfad], { encoding: 'utf8', cwd: tmpdir() });
}

test('Linienstück als ::before am Kicker ist ein Fehler (der Fall der Kundenseite)', () => {
  const r = lauf('global.css', ".eyebrow { display: flex; gap: .85rem; }\n.eyebrow::before { content: ''; width: 2.5rem; height: 3px; background: var(--gelb); border-radius: 2px; flex: none; }\n");
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Zierstrich/);
  assert.match(r.stdout, /Kicker/);
});

test('auch in einer Astro-Datei, im Medienblock und über ::after', () => {
  const r = lauf('Held.astro', "<p class=\"kicker\">Hersteller</p>\n<style>\n  @media (min-width: 40rem) {\n    .kicker::after { content: \"\"; display: inline-block; width: 3rem; height: 2px; background: currentColor; }\n  }\n</style>\n");
  assert.equal(r.status, 1);
  assert.match(r.stdout, /::after/);
});

test('Strichzeichen als content vor dem Kicker ist ein Fehler', () => {
  assert.equal(lauf('a.css', ".overline::before { content: '— '; }\n").status, 1);
  assert.equal(lauf('b.css', ".eyebrow::before { content: \"- \"; }\n").status, 1);
});

test('ein Punkt am Kicker ist kein Strich', () => {
  const r = lauf('punkt.css', ".eyebrow::before { content: ''; width: .5rem; height: .5rem; border-radius: 50%; background: var(--gelb); }\n");
  assert.equal(r.status, 0);
  assert.doesNotMatch(r.stdout, /Zierstrich/);
});

test('die Unterstreichung eines Menüpunkts hängt an keinem Kicker und besteht', () => {
  const r = lauf('nav.css', ".nav a::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; width: 100%; background: var(--gelb); }\n");
  assert.equal(r.status, 0);
  assert.doesNotMatch(r.stdout, /Zierstrich/);
});

test('ein Hintergrundverlauf über die ganze Fläche am Kicker ist kein Strich', () => {
  const r = lauf('flaeche.css', ".hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(#000, transparent); }\n");
  assert.equal(r.status, 0);
});

test('an einer Überschrift ist der Zierstrich eine Warnung, kein Fehler', () => {
  const r = lauf('h2.css', "h2::after { content: ''; display: block; width: 4rem; height: 4px; background: var(--gelb); margin-top: 1rem; }\n");
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Zierstrich/);
  assert.match(r.stdout, /WARNUNGEN/);
});

test('leeres Strichelement als erstes Kind des Kickers ist ein Fehler', () => {
  const r = lauf('Held.astro', '<p class="eyebrow"><span class="strich"></span>Hersteller aus Bielefeld</p>\n');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Strichelement/);
});

test('leeres Strichelement direkt vor der Überschrift ist eine Warnung', () => {
  const r = lauf('Kopf.astro', '<span class="balken"></span>\n<h2>Unsere Leistungen</h2>\n');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /direkt vor einer Überschrift/);
});

test('Tailwind: before: und after: als Strich am Kicker ist ein Fehler', () => {
  const r = lauf('Kicker.astro', `<p class="uppercase tracking-widest before:content-[''] before:inline-block before:w-10 before:h-0.5 before:bg-amber-500 before:mr-3">Hersteller</p>\n`);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Tailwind/);
});

test('Kicker ohne jedes Präfix besteht', () => {
  const r = lauf('sauber.astro', '<p class="eyebrow">Hersteller aus Bielefeld, seit 2005</p>\n<style>.eyebrow { font-weight: 600; letter-spacing: .02em; }</style>\n');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Kein Befund/);
});
