/*
  register.test.mjs — prüft die Zustandsmaschine der Referenzfreigabe.

  Läuft mit dem eingebauten Testrunner von Node, ohne Abhängigkeit und ohne package.json:

      node --test scripts/tests/

  Der wichtigste Test ist nicht der glückliche Pfad, sondern die Sperre: jeder Übergang, der
  nicht in UEBERGAENGE steht, muss scheitern. Sonst ist die Freigabe eine Absichtserklärung.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ZUSTAENDE,
  ENDZUSTAENDE,
  UEBERGAENGE,
  NIE_UEBERNOMMEN,
  SCHRITTE,
  WISSEN,
  kennung,
  neuerEintrag,
  uebergang,
  registerLesen,
  registerSchreiben,
  leeresRegister,
  finden,
  vorlageText,
} from '../referenz-register.mjs';

const SKRIPT = fileURLToPath(new URL('../referenz-register.mjs', import.meta.url));

function frischerEintrag(zustand = 'ENTDECKT') {
  const e = neuerEintrag({
    id: 'ref-01-test-de',
    name: 'Test GmbH',
    url: 'https://test.de',
    quelle: 'land-book',
    fuer: ['hero'],
    grund: 'Beispielgrund',
    extraktion: ['raster'],
    risiken: [],
  });
  e.zustand = zustand;
  return e;
}

function mitTempVerzeichnis(fn) {
  const ordner = mkdtempSync(join(tmpdir(), 'designrecherche-'));
  try {
    return fn(ordner);
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
}

function cli(ordner, ...argumente) {
  return spawnSync(process.execPath, [SKRIPT, ...argumente, '--register', join(ordner, 'register.json')], {
    encoding: 'utf8',
  });
}

// ------------------------------------------------------------ Zustandsmaschine

test('jeder erlaubte Übergang funktioniert', () => {
  for (const [von, ziele] of Object.entries(UEBERGAENGE)) {
    for (const nach of ziele) {
      const e = frischerEintrag(von);
      uebergang(e, nach);
      assert.equal(e.zustand, nach, `${von} nach ${nach} sollte erlaubt sein`);
      assert.equal(e.verlauf.at(-1).zustand, nach, 'der Verlauf wird mitgeschrieben');
    }
  }
});

test('jeder nicht vorgesehene Übergang scheitert', () => {
  for (const von of ZUSTAENDE) {
    const erlaubt = UEBERGAENGE[von];
    for (const nach of ZUSTAENDE) {
      if (erlaubt.includes(nach)) continue;
      const e = frischerEintrag(von);
      assert.throws(() => uebergang(e, nach), /nicht vorgesehen/, `${von} nach ${nach} müsste scheitern`);
      assert.equal(e.zustand, von, 'bei einem verweigerten Übergang bleibt der Zustand unverändert');
    }
  }
});

test('von ENTDECKT führt kein Weg direkt zur Freigabe oder zum Crawl', () => {
  for (const ziel of ['FREIGEGEBEN', 'GECRAWLT', 'ANALYSIERT', 'GLOBAL']) {
    assert.throws(() => uebergang(frischerEintrag('ENTDECKT'), ziel), /nicht vorgesehen/);
  }
});

test('Endzustände lassen keinen weiteren Übergang zu', () => {
  for (const ende of ENDZUSTAENDE) {
    assert.deepEqual(UEBERGAENGE[ende], [], `${ende} ist ein Endzustand`);
    assert.throws(() => uebergang(frischerEintrag(ende), 'GECRAWLT'), /Endzustand/);
  }
});

test('ablehnen ist aus jedem Zwischenzustand möglich', () => {
  const zwischen = ZUSTAENDE.filter((z) => !ENDZUSTAENDE.includes(z));
  for (const z of zwischen) {
    const e = frischerEintrag(z);
    uebergang(e, 'ABGELEHNT', 'passt nicht');
    assert.equal(e.zustand, 'ABGELEHNT');
  }
});

test('ein unbekannter Zustand wird abgewiesen', () => {
  assert.throws(() => uebergang(frischerEintrag(), 'FREIGEGEBEN_IRGENDWIE'), /Unbekannter Zustand/);
});

test('die Schritttabelle deckt sich mit den erlaubten Übergängen', () => {
  for (const [name, regel] of Object.entries(SCHRITTE)) {
    assert.ok(UEBERGAENGE[regel.von].includes(regel.nach), `Schritt ${name} ist kein erlaubter Übergang`);
  }
  for (const ziel of Object.values(WISSEN)) {
    assert.ok(UEBERGAENGE.OFFEN_FUER_WISSEN.includes(ziel), `${ziel} fehlt in den Wissensübergängen`);
  }
});

// -------------------------------------------------------------------- Eintrag

test('ein neuer Eintrag startet in ENTDECKT und trägt die Ausschlussliste', () => {
  const e = frischerEintrag();
  assert.equal(e.zustand, 'ENTDECKT');
  assert.equal(e.freigabe, null);
  assert.deepEqual(e.ausgeschlossen, NIE_UEBERNOMMEN);
  assert.ok(e.ausgeschlossen.length >= 5, 'Farben, Schriften, Logo, Texte und Bildmaterial stehen drin');
});

test('die Kennung wird aus dem Host abgeleitet und fortlaufend nummeriert', () => {
  assert.equal(kennung('https://www.beispiel-referenz.de/pfad', []), 'ref-01-beispiel-referenz-de');
  assert.equal(kennung('https://zwei.de', [{}, {}]), 'ref-03-zwei-de');
});

test('die Vorlage benennt Zweck und Ausschluss', () => {
  const text = vorlageText(frischerEintrag(), 1);
  assert.match(text, /REFERENZ 01/);
  assert.match(text, /Vorgeschlagene Extraktion: raster/);
  assert.match(text, /Ausdrücklich nicht: Farbwerte/);
  assert.match(text, /Freigabe: ganze Website/);
});

// ------------------------------------------------------------------- Ablage

test('Register schreiben und wieder lesen erhält die Einträge', () =>
  mitTempVerzeichnis((ordner) => {
    const pfad = join(ordner, 'tief', 'register.json');
    const register = leeresRegister('kunde-xy');
    register.referenzen.push(frischerEintrag());
    registerSchreiben(pfad, register);
    const gelesen = registerLesen(pfad);
    assert.equal(gelesen.projekt, 'kunde-xy');
    assert.equal(finden(gelesen, 'ref-01-test-de').zustand, 'ENTDECKT');
    assert.equal(finden(gelesen, 'gibt-es-nicht'), null);
  }));

test('ein fehlendes Register ist kein Fehler, sondern ein leeres Register', () =>
  mitTempVerzeichnis((ordner) => {
    const r = registerLesen(join(ordner, 'nicht-da.json'));
    assert.deepEqual(r.referenzen, []);
  }));

// ---------------------------------------------------------------------- CLI

test('CLI: anlegen, vorlegen, freigeben, und die Sperre dazwischen', () =>
  mitTempVerzeichnis((ordner) => {
    const angelegt = cli(ordner, 'anlegen', '--name', 'Test GmbH', '--url', 'https://test.de',
      '--quelle', 'land-book', '--fuer', 'hero', '--grund', 'Beispiel', '--extraktion', 'raster');
    assert.equal(angelegt.status, 0, angelegt.stderr);

    const zuFrueh = cli(ordner, 'vermerken', '--id', 'ref-01-test-de', '--schritt', 'gecrawlt');
    assert.equal(zuFrueh.status, 2, 'Crawlen vor der Freigabe muss mit Exit 2 abbrechen');
    assert.match(zuFrueh.stderr, /nicht vorgesehen/);

    const ohneVorlage = cli(ordner, 'freigeben', '--id', 'ref-01-test-de');
    assert.equal(ohneVorlage.status, 2, 'Freigabe ohne vorherige Vorlage muss abbrechen');

    assert.equal(cli(ordner, 'vorlegen', '--alle').status, 0);
    const frei = cli(ordner, 'freigeben', '--id', 'ref-01-test-de', '--sektionen', 'hero');
    assert.equal(frei.status, 0, frei.stderr);
    assert.match(frei.stdout, /teilweise/);

    const register = JSON.parse(readFileSync(join(ordner, 'register.json'), 'utf8'));
    const e = register.referenzen[0];
    assert.equal(e.zustand, 'FREIGEGEBEN');
    assert.deepEqual(e.freigabe.sektionen, ['hero']);
    assert.equal(e.freigabe.durch, 'mensch');
  }));

test('CLI: dieselbe Adresse wird nicht zweimal angelegt', () =>
  mitTempVerzeichnis((ordner) => {
    cli(ordner, 'anlegen', '--name', 'A', '--url', 'https://test.de');
    const zweites = cli(ordner, 'anlegen', '--name', 'A nochmal', '--url', 'https://test.de');
    assert.equal(zweites.status, 1);
    assert.match(zweites.stderr, /bereits im Register/);
  }));

test('CLI: ablehnen ohne Grund wird abgewiesen', () =>
  mitTempVerzeichnis((ordner) => {
    cli(ordner, 'anlegen', '--name', 'A', '--url', 'https://test.de');
    const ohne = cli(ordner, 'ablehnen', '--id', 'ref-01-test-de');
    assert.equal(ohne.status, 2);
    const mit = cli(ordner, 'ablehnen', '--id', 'ref-01-test-de', '--grund', 'passt nicht zur Branche');
    assert.equal(mit.status, 0, mit.stderr);
  }));

test('CLI: eine unbekannte Kennung meldet 1, ein unbekannter Befehl meldet 2', () =>
  mitTempVerzeichnis((ordner) => {
    cli(ordner, 'anlegen', '--name', 'A', '--url', 'https://test.de');
    assert.equal(cli(ordner, 'status', '--id', 'gibt-es-nicht').status, 1);
    assert.equal(cli(ordner, 'quatsch').status, 2);
  }));

test('CLI: eine ungültige Adresse wird abgewiesen', () =>
  mitTempVerzeichnis((ordner) => {
    const r = cli(ordner, 'anlegen', '--name', 'A', '--url', 'kein::ding');
    assert.equal(r.status, 2);
  }));
