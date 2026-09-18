/*
  pruefe-muster.test.mjs — prüft den Wächter der Musterbibliothek.

      node --test 'scripts/tests/*.test.mjs'

  Ein Prüfskript, das nur den guten Fall kennt, prüft nichts. Deshalb steht hier je Regel ein
  Muster, das sie verletzt, und die Erwartung, dass es auffällt.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  frontmatterLesen,
  musterPruefen,
  bibliothekLesen,
  indexBauen,
  PFLICHTFELDER,
  PFLICHTABSCHNITTE,
} from '../pruefe-muster.mjs';

const BIBLIOTHEK = fileURLToPath(
  new URL('../../skills/webdesign-conversion/assets/musterbibliothek/', import.meta.url)
);

const { taxonomie, dateien } = bibliothekLesen(BIBLIOTHEK);

const KOPF = [
  '---',
  'id: probe-muster',
  'name: Probe',
  'kategorie: hero',
  'sektionstyp: [hero]',
  'tags: [probe]',
  'stil: [minimal]',
  'ux_zweck: etwas',
  'conversion_zweck: etwas anderes',
  'responsiv: einspaltig ab 768',
  'komplexitaet: niedrig',
  'barrierefreiheit: Fokus sichtbar',
  'verwandt: []',
  'quelle_url: https://beispiel.de',
  'quelle_erfasst: 2026-09-18',
  'konfidenz: mittel',
  'freigabe: global',
  'aufgenommen: 2026-09-18',
  '---',
  '',
  ...PFLICHTABSCHNITTE.flatMap((a) => [a, '', 'Text, beobachtet.', '']),
].join('\n');

const fehlerTexte = (datei, inhalt) =>
  musterPruefen(datei, inhalt, taxonomie)
    .befunde.filter((b) => b.art === 'fehler')
    .map((b) => b.text);

// ------------------------------------------------------------- Frontmatter

test('der Frontmatter-Leser kennt Zeichenketten und Inline-Listen', () => {
  const { kopf } = frontmatterLesen('---\na: eins\nb: [x, y]\nc: "mit Anführung"\n---\nText\n');
  assert.equal(kopf.a, 'eins');
  assert.deepEqual(kopf.b, ['x', 'y']);
  assert.equal(kopf.c, 'mit Anführung');
});

test('ohne Frontmatter gibt es einen Fehler statt eines leeren Kopfes', () => {
  const { kopf, fehler } = frontmatterLesen('# Nur Text\n');
  assert.equal(kopf, null);
  assert.match(fehler, /Kein Frontmatter/);
});

// ---------------------------------------------------------------- Regeln

test('ein vollständiges Muster ist ohne Fehler', () => {
  assert.deepEqual(fehlerTexte('probe-muster.md', KOPF), []);
});

test('jedes fehlende Pflichtfeld wird einzeln gemeldet', () => {
  for (const feld of PFLICHTFELDER) {
    const kaputt = KOPF.split('\n')
      .filter((z) => !z.startsWith(`${feld}:`))
      .join('\n');
    const fehler = fehlerTexte('probe-muster.md', kaputt);
    assert.ok(
      fehler.some((f) => f.includes(feld)),
      `${feld} müsste als fehlend gemeldet werden`
    );
  }
});

test('jeder fehlende Pflichtabschnitt wird gemeldet', () => {
  for (const abschnitt of PFLICHTABSCHNITTE) {
    const kaputt = KOPF.replace(abschnitt, '## Etwas anderes');
    assert.ok(fehlerTexte('probe-muster.md', kaputt).some((f) => f.includes(abschnitt)));
  }
});

test('eine Kategorie außerhalb der Taxonomie ist ein Fehler', () => {
  const kaputt = KOPF.replace('kategorie: hero', 'kategorie: irgendwas');
  assert.ok(fehlerTexte('probe-muster.md', kaputt).some((f) => /taxonomie\.json/.test(f)));
});

test('ein Stil außerhalb der Taxonomie ist ein Fehler', () => {
  const kaputt = KOPF.replace('stil: [minimal]', 'stil: [minimal, schoen]');
  assert.ok(fehlerTexte('probe-muster.md', kaputt).some((f) => /stil "schoen"/.test(f)));
});

test('eine id, die nicht zum Dateinamen passt, ist ein Fehler', () => {
  assert.ok(fehlerTexte('anderer-name.md', KOPF).some((f) => /passt nicht zum Dateinamen/.test(f)));
});

test('ein Muster ohne einen einzigen markierten Beleg ist ein Fehler', () => {
  const kaputt = KOPF.replaceAll('Text, beobachtet.', 'Text ohne Belegmarkierung.');
  assert.ok(fehlerTexte('probe-muster.md', kaputt).some((f) => /Beleg markiert/.test(f)));
});

test('fremdes Bildmaterial im Muster ist ein Fehler', () => {
  const kaputt = `${KOPF}\n![Bild](https://cdn.fremde-seite.de/held.jpg)\n`;
  assert.ok(fehlerTexte('probe-muster.md', kaputt).some((f) => /Fremdes Bildmaterial/.test(f)));
});

test('ein langes wörtliches Zitat ist ein Fehler', () => {
  const kaputt = `${KOPF}\n> ${'Fremder Fliesstext '.repeat(15)}\n`;
  assert.ok(fehlerTexte('probe-muster.md', kaputt).some((f) => /Zitat/.test(f)));
});

test('ein verwandtes Muster, das es nicht gibt, ist ein Hinweis und kein Fehler', () => {
  const kaputt = KOPF.replace('verwandt: []', 'verwandt: [gibt-es-nicht]');
  const befunde = musterPruefen('probe-muster.md', kaputt, taxonomie, ['probe-muster']).befunde;
  assert.equal(befunde.filter((b) => b.art === 'fehler').length, 0);
  assert.ok(befunde.some((b) => b.art === 'warnung' && /unbekanntes Muster/.test(b.text)));
});

// ------------------------------------------------------- echte Bibliothek

test('die ausgelieferte Musterbibliothek ist fehlerfrei', () => {
  const ids = dateien.map((d) => d.split('/').at(-1).replace(/\.md$/, ''));
  const alle = dateien.flatMap((d) => musterPruefen(d, readFileSync(d, 'utf8'), taxonomie, ids).befunde);
  assert.deepEqual(
    alle.filter((b) => b.art === 'fehler'),
    [],
    'kein ausgeliefertes Muster darf einen Fehler haben'
  );
  assert.ok(dateien.length >= 5, 'die Bibliothek startet nicht leer');
});

test('der Index deckt sich mit den Musterdateien', () => {
  const index = JSON.parse(readFileSync(join(BIBLIOTHEK, 'index.json'), 'utf8'));
  const ausDateien = readdirSync(join(BIBLIOTHEK, 'muster'))
    .filter((d) => d.endsWith('.md'))
    .map((d) => d.replace(/\.md$/, ''))
    .sort();
  assert.deepEqual(index.muster.map((m) => m.id).sort(), ausDateien, 'Index und Ordner müssen übereinstimmen');
  assert.equal(index.anzahl, ausDateien.length);
});

test('der Index trägt die Felder, die der Vergleich braucht', () => {
  const koepfe = dateien.map((d) => frontmatterLesen(readFileSync(d, 'utf8')).kopf);
  const index = indexBauen(koepfe);
  for (const eintrag of index.muster) {
    for (const feld of ['kategorie', 'sektionstyp', 'tags', 'stil', 'ux_zweck', 'conversion_zweck', 'responsiv']) {
      assert.notEqual(eintrag[feld], undefined, `${eintrag.id}: ${feld} fehlt im Index`);
    }
  }
});
