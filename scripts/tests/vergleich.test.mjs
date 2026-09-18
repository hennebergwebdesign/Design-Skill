/*
  vergleich.test.mjs — prüft die Ähnlichkeitsrechnung und die Trennung der Wissensstände.

      node --test 'scripts/tests/*.test.mjs'

  Zwei Dinge stehen hier auf dem Spiel. Erstens: erkennt die Rechnung ein Duplikat als
  Duplikat und ein unverwandtes Muster als unverwandt. Zweitens, und wichtiger: schreibt der
  Vergleich wirklich nur ins Projekt und nicht in die globale Bibliothek.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtempSync, rmSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { jaccard, aehnlichkeit, einstufen, vergleichen, unterschiede, berichtBauen, GEWICHTE } from '../muster-vergleich.mjs';

const starten = promisify(execFile);
const VERGLEICH = fileURLToPath(new URL('../muster-vergleich.mjs', import.meta.url));
const BIBLIOTHEK = fileURLToPath(
  new URL('../../skills/webdesign-conversion/assets/musterbibliothek/', import.meta.url)
);

const BESTAND = {
  id: 'hero-split-editorial',
  name: 'Split-Held, editorial',
  kategorie: 'hero',
  sektionstyp: ['hero'],
  tags: ['asymmetrisch', 'zweispaltig', 'bildrechts'],
  stil: ['editorial'],
  ux_zweck: 'Aussage bekommt den dominanten Raum',
  conversion_zweck: 'Handlungsaufforderung im Lesepfad',
  responsiv: 'einspaltig ab 768',
  komplexitaet: 'niedrig',
};

// ------------------------------------------------------------------ Rechnung

test('die Gewichte summieren sich auf eins', () => {
  assert.equal(
    Number(Object.values(GEWICHTE).reduce((a, b) => a + b, 0).toFixed(3)),
    1
  );
});

test('Jaccard rechnet Schnitt durch Vereinigung und verträgt leere Mengen', () => {
  assert.equal(jaccard(['a', 'b'], ['a', 'b']), 1);
  assert.equal(jaccard(['a', 'b'], ['c']), 0);
  assert.equal(jaccard(['a', 'b'], ['b', 'c']), 1 / 3);
  assert.equal(jaccard([], []), 0);
  assert.equal(jaccard('hero', 'hero'), 1, 'ein einzelner Wert zählt wie eine Menge mit einem Element');
});

test('ein identisches Muster wird als Duplikat eingestuft', () => {
  const { gesamt } = aehnlichkeit(BESTAND, BESTAND);
  assert.equal(gesamt, 1);
  assert.equal(einstufen(gesamt).name, 'Duplikat');
});

test('ein Muster mit gleicher Kategorie und anderem Detail ist ein Beinahe-Duplikat', () => {
  const entwurf = { ...BESTAND, tags: ['asymmetrisch', 'zweispaltig', 'produktfokus'], stil: ['corporate'] };
  const { gesamt } = aehnlichkeit(entwurf, BESTAND);
  assert.ok(gesamt >= 0.65 && gesamt < 0.85, `erwartet Beinahe-Duplikat, ist ${gesamt}`);
  assert.equal(einstufen(gesamt).name, 'Beinahe-Duplikat');
});

test('ein Muster aus einer anderen Kategorie ist unverwandt oder ergänzend', () => {
  const entwurf = {
    id: 'footer-kompakt',
    kategorie: 'footer',
    sektionstyp: ['footer'],
    tags: ['kompakt', 'rechtstexte'],
    stil: ['minimal'],
    ux_zweck: 'Rechtstexte erreichbar halten',
    conversion_zweck: 'keine',
  };
  const { gesamt } = aehnlichkeit(entwurf, BESTAND);
  assert.ok(gesamt < 0.4, `erwartet unter 0.4, ist ${gesamt}`);
});

test('die Einstufung ist über den ganzen Wertebereich definiert', () => {
  for (const wert of [1, 0.9, 0.85, 0.7, 0.65, 0.5, 0.4, 0.3, 0.2, 0.1, 0]) {
    const stufe = einstufen(wert);
    assert.ok(stufe && stufe.name && stufe.rat, `für ${wert} fehlt eine Einstufung`);
  }
  assert.equal(einstufen(0).name, 'unverwandt');
});

test('die Unterschiede nennen Feld, Entwurf und Bestand', () => {
  const zeilen = unterschiede({ ...BESTAND, stil: ['corporate'] }, BESTAND);
  const stil = zeilen.find((z) => z.feld === 'Stil');
  assert.ok(stil);
  assert.equal(stil.entwurf, 'corporate');
  assert.equal(stil.bestand, 'editorial');
  assert.equal(zeilen.find((z) => z.feld === 'Kategorie'), undefined, 'gleiche Felder tauchen nicht auf');
});

test('Treffer kommen sortiert und unter der Schwelle fällt nichts durch', () => {
  const index = { muster: [BESTAND, { ...BESTAND, id: 'zweit', tags: ['ganz', 'andere'], stil: ['retro'] }] };
  const treffer = vergleichen(BESTAND, index);
  assert.equal(treffer[0].muster.id, 'hero-split-editorial');
  assert.ok(treffer[0].gesamt >= (treffer[1]?.gesamt ?? 0));
});

test('ohne Treffer nennt der Bericht die Gegenprobe statt nur zu schweigen', () => {
  const bericht = berichtBauen({ name: 'X', kategorie: 'footer', tags: [] }, [], 5);
  assert.match(bericht, /Kein Muster/);
    assert.match(bericht, /Tags/);
});

test('der Bericht nennt die vier Ausgänge von Tor 2', () => {
  const bericht = berichtBauen(BESTAND, vergleichen(BESTAND, { muster: [BESTAND] }), 1);
  for (const ausgang of ['global', 'erweitern', 'projekt', 'ablehnen']) {
    assert.match(bericht, new RegExp(`--entscheidung ${ausgang}`));
  }
});

// -------------------------------------------------- Trennung der Wissensstände

function verzeichnisStand(ordner) {
  const stand = {};
  for (const eintrag of readdirSync(ordner, { withFileTypes: true })) {
    const voll = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) Object.assign(stand, verzeichnisStand(voll));
    else stand[voll] = `${statSync(voll).size}:${readFileSync(voll, 'utf8').length}`;
  }
  return stand;
}

test('der Vergleich schreibt nur ins Projekt, nie in die globale Bibliothek', async () => {
  const vorher = verzeichnisStand(BIBLIOTHEK);
  const ordner = mkdtempSync(join(tmpdir(), 'vergleich-'));
  try {
    const entwurf = join(ordner, 'muster-entwurf.md');
    writeFileSync(
      entwurf,
      [
        '---',
        'id: probe',
        'name: Probe',
        'kategorie: hero',
        'sektionstyp: [hero]',
        'tags: [vollbild, bildhintergrund]',
        'stil: [expressive]',
        'ux_zweck: eine Aussage vor allem anderen',
        'conversion_zweck: Handlung im ersten Bildschirm',
        'responsiv: unbekannt',
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
        '# Probe',
        '',
      ].join('\n')
    );
    await starten(process.execPath, [VERGLEICH, '--entwurf', entwurf]);

    assert.ok(existsSync(join(ordner, 'vergleich.md')), 'der Bericht liegt im Projekt');
    assert.deepEqual(verzeichnisStand(BIBLIOTHEK), vorher, 'die globale Bibliothek bleibt unverändert');

    const bericht = readFileSync(join(ordner, 'vergleich.md'), 'utf8');
    assert.match(bericht, /hero-vollbild-pillennavigation/, 'das nächstliegende Bestandsmuster wird gefunden');
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
});

test('ein Entwurf mit offenen Platzhaltern wird nicht verglichen', async () => {
  const ordner = mkdtempSync(join(tmpdir(), 'vergleich-'));
  try {
    const entwurf = join(ordner, 'muster-entwurf.md');
    mkdirSync(ordner, { recursive: true });
    writeFileSync(entwurf, '---\nid: [[FEHLT: Kennung]]\nname: Probe\nkategorie: hero\n---\n\n# Probe\n');
    let fehlgeschlagen = false;
    try {
      await starten(process.execPath, [VERGLEICH, '--entwurf', entwurf]);
    } catch (f) {
      fehlgeschlagen = true;
      assert.equal(f.code, 2);
      assert.match(f.stderr, /offene Felder/);
      assert.match(f.stderr, /misst nichts/);
    }
    assert.ok(fehlgeschlagen, 'der Vergleich gegen Platzhalter muss abbrechen');
    assert.equal(existsSync(join(ordner, 'vergleich.md')), false);
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
});

test('ein fehlender Entwurf meldet 1 und kein Aufruf ohne Argument meldet 2', async () => {
  for (const [argumente, code] of [
    [['--entwurf', '/gibt/es/nicht.md'], 1],
    [[], 2],
  ]) {
    let gesehen = null;
    try {
      await starten(process.execPath, [VERGLEICH, ...argumente]);
    } catch (f) {
      gesehen = f.code;
    }
    assert.equal(gesehen, code);
  }
});
