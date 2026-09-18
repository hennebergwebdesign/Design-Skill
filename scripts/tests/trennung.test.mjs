/*
  trennung.test.mjs — prüft die strikte Trennung von Projektwissen und globalem Wissen.

      node --test 'scripts/tests/*.test.mjs'

  Die Zusage des ganzen Systems lautet: nichts wandert ohne zwei menschliche Freigaben ins
  dauerhafte Skillwissen, und eine Entscheidung "nur Projekt" bleibt folgenlos für die
  Bibliothek. Hier steht, dass das auch stimmt, wenn jemand das Gegenteil versucht.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import {
  mkdtempSync,
  rmSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { neuerEintrag, leeresRegister } from '../referenz-register.mjs';

const starten = promisify(execFile);
const PAKET = fileURLToPath(new URL('../muster-paket.mjs', import.meta.url));
const BIBLIOTHEK = fileURLToPath(
  new URL('../../skills/webdesign-conversion/assets/musterbibliothek/', import.meta.url)
);

const ENTWURF = [
  '---',
  'id: probe-muster-paket',
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
  '## Prinzip',
  '',
  'Text.',
  '',
  '## Warum es wirkt',
  '',
  'Text, beobachtet.',
  '',
  '## Belege',
  '',
  '| Aussage | Beleg |',
  '|---|---|',
  '| Etwas | beobachtet |',
  '',
  '## Umsetzung',
  '',
  'Text.',
  '',
  '## Was nicht übernommen wird',
  '',
  'Text.',
  '',
].join('\n');

function stand(ordner) {
  const ergebnis = {};
  for (const eintrag of readdirSync(ordner, { withFileTypes: true })) {
    const voll = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) Object.assign(ergebnis, stand(voll));
    else ergebnis[voll] = `${statSync(voll).size}:${readFileSync(voll, 'utf8').length}`;
  }
  return ergebnis;
}

function umgebung(zustand, { wissen = null, entwurf = ENTWURF } = {}) {
  const ordner = mkdtempSync(join(tmpdir(), 'trennung-'));
  const eintrag = neuerEintrag({
    id: 'ref-01-beispiel-de',
    name: 'Beispiel',
    url: 'https://beispiel.de',
    quelle: 'direkt',
    fuer: ['hero'],
    grund: 'Test',
    extraktion: ['raster'],
    risiken: [],
  });
  eintrag.zustand = zustand;
  eintrag.freigabe = { umfang: 'website', sektionen: [], komponenten: [], durch: 'mensch', zeit: '2026-09-18T10:00:00Z' };
  eintrag.wissen = wissen;
  const register = leeresRegister('test');
  register.referenzen.push(eintrag);
  const pfad = join(ordner, 'register.json');
  writeFileSync(pfad, JSON.stringify(register, null, 2));
  const ablage = join(ordner, 'referenzen');
  mkdirSync(join(ablage, 'ref-01-beispiel-de'), { recursive: true });
  if (entwurf) writeFileSync(join(ablage, 'ref-01-beispiel-de', 'muster-entwurf.md'), entwurf);
  return { ordner, pfad, ablage, ziel: join(ordner, 'muster-vorschlag') };
}

async function paket(umg) {
  const argumente = [
    PAKET,
    '--id',
    'ref-01-beispiel-de',
    '--register',
    umg.pfad,
    '--ablage',
    umg.ablage,
    '--ziel',
    umg.ziel,
  ];
  try {
    const { stdout, stderr } = await starten(process.execPath, argumente, { encoding: 'utf8' });
    return { status: 0, stdout, stderr };
  } catch (f) {
    return { status: f.code ?? 1, stdout: f.stdout ?? '', stderr: f.stderr ?? String(f.message) };
  }
}

const MENSCH = { entscheidung: 'global', muster_id: null, notiz: '', durch: 'mensch', zeit: '2026-09-18T11:00:00Z' };

// ------------------------------------------------------------------ Sperren

test('ohne Entscheidung an Tor 2 entsteht kein Paket', async () => {
  for (const zustand of ['ANALYSIERT', 'OFFEN_FUER_WISSEN', 'GECRAWLT', 'FREIGEGEBEN']) {
    const umg = umgebung(zustand);
    try {
      const lauf = await paket(umg);
      assert.equal(lauf.status, 2, `${zustand} müsste abgewiesen werden`);
      assert.match(lauf.stderr, /Tor 2/);
      assert.equal(existsSync(umg.ziel), false, 'es darf kein Paket entstehen');
    } finally {
      rmSync(umg.ordner, { recursive: true, force: true });
    }
  }
});

test('eine Entscheidung nur Projekt erzeugt ausdrücklich kein Paket', async () => {
  const umg = umgebung('NUR_PROJEKT', {
    wissen: { ...MENSCH, entscheidung: 'projekt' },
  });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 2);
    assert.match(lauf.stderr, /bewusst kein Paket/);
    assert.match(lauf.stderr, /bleibt in \.designrecherche/);
    assert.equal(existsSync(umg.ziel), false);
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

test('eine abgelehnte Referenz erzeugt kein Paket', async () => {
  const umg = umgebung('ABGELEHNT', { wissen: { ...MENSCH, entscheidung: 'ablehnen' } });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 2);
    assert.equal(existsSync(umg.ziel), false);
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

test('ein Zustand GLOBAL ohne Freigabevermerk eines Menschen reicht nicht', async () => {
  const umg = umgebung('GLOBAL', { wissen: null });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 2);
    assert.match(lauf.stderr, /Freigabevermerk/);
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

test('ein Entwurf mit offenen Platzhaltern wird nicht eingepackt', async () => {
  const umg = umgebung('GLOBAL', {
    wissen: MENSCH,
    entwurf: ENTWURF.replace('name: Probe', 'name: [[FEHLT: Name]]'),
  });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 2);
    assert.match(lauf.stderr, /Platzhalter/);
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

test('ein Entwurf, der die Musterprüfung nicht besteht, wird nicht eingepackt', async () => {
  const umg = umgebung('GLOBAL', {
    wissen: MENSCH,
    entwurf: ENTWURF.replace('kategorie: hero', 'kategorie: gibt-es-nicht'),
  });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 2);
    assert.match(lauf.stderr, /besteht die Prüfung nicht/);
    assert.equal(existsSync(umg.ziel), false);
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

// ------------------------------------------------------------------ Trennung

test('ein freigegebenes Muster wird gepackt, die Bibliothek bleibt unangetastet', async () => {
  const vorher = stand(BIBLIOTHEK);
  const umg = umgebung('GLOBAL', { wissen: MENSCH });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 0, lauf.stderr);

    const paketOrdner = join(umg.ziel, 'probe-muster-paket');
    assert.ok(existsSync(join(paketOrdner, 'probe-muster-paket.md')));
    assert.ok(existsSync(join(paketOrdner, 'HERKUNFT.md')));
    assert.ok(existsSync(join(paketOrdner, 'EINBAUEN.md')));

    assert.deepEqual(stand(BIBLIOTHEK), vorher, 'die globale Bibliothek darf sich nicht ändern');
    assert.match(lauf.stdout, /NICHT verändert/);

    const herkunft = readFileSync(join(paketOrdner, 'HERKUNFT.md'), 'utf8');
    assert.match(herkunft, /Tor 1, Erfassung/);
    assert.match(herkunft, /Tor 2, Wissen/);
    assert.match(herkunft, /2026-09-18T11:00:00Z/, 'der Zeitpunkt der zweiten Freigabe steht drin');

    const einbauen = readFileSync(join(paketOrdner, 'EINBAUEN.md'), 'utf8');
    assert.match(einbauen, /pruefe-muster\.mjs --index/);
    assert.match(einbauen, /Repository `Design-Skill`/);
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

test('bei erweitern nennt das Paket das Zielmuster statt eine neue Datei anzulegen', async () => {
  const umg = umgebung('ERWEITERT', {
    wissen: { ...MENSCH, entscheidung: 'erweitern', muster_id: 'hero-vollbild-pillennavigation' },
  });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 0, lauf.stderr);
    const einbauen = readFileSync(join(umg.ziel, 'probe-muster-paket', 'EINBAUEN.md'), 'utf8');
    assert.match(einbauen, /hero-vollbild-pillennavigation/);
    assert.match(einbauen, /erweitern/);
    assert.doesNotMatch(einbauen, /^cp /m, 'bei einer Erweiterung wird nichts kopiert');
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

test('erweitern ohne Zielmuster wird abgewiesen', async () => {
  const umg = umgebung('ERWEITERT', { wissen: { ...MENSCH, entscheidung: 'erweitern', muster_id: null } });
  try {
    const lauf = await paket(umg);
    assert.equal(lauf.status, 2);
    assert.match(lauf.stderr, /kein Zielmuster/);
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});

test('kein Werkzeug der Kette schreibt in die Musterbibliothek', async () => {
  const vorher = stand(BIBLIOTHEK);
  const umg = umgebung('GLOBAL', { wissen: MENSCH });
  try {
    await paket(umg);
    assert.deepEqual(stand(BIBLIOTHEK), vorher);
    const dateien = Object.keys(stand(umg.ordner));
    assert.ok(dateien.length > 0, 'im Projekt entsteht sehr wohl etwas');
    assert.ok(
      dateien.every((d) => d.startsWith(umg.ordner)),
      'alles Geschriebene liegt im Projektordner'
    );
  } finally {
    rmSync(umg.ordner, { recursive: true, force: true });
  }
});
