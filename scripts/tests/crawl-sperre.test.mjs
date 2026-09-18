/*
  crawl-sperre.test.mjs — prüft, dass ohne Freigabe nichts abgerufen und nichts abgelegt wird.

      node --test 'scripts/tests/*.test.mjs'

  Das ist der Test, auf den es bei der ganzen Freigabemechanik ankommt. Eine Regel, die nur in
  einer Referenzdatei steht, wird umgangen. Hier scheitert der Aufruf tatsächlich, mit Exit 2,
  und auf der Platte liegt danach nichts.
*/

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtempSync, rmSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { neuerEintrag, leeresRegister } from '../referenz-register.mjs';

// Bewusst asynchron statt spawnSync: der Testserver läuft im selben Prozess, und ein
// blockierender Aufruf würde seinen Event-Loop anhalten. Das Kind wartet dann auf eine
// Antwort, die erst nach seinem eigenen Ende käme.
const starten = promisify(execFile);
async function lauf(argumente) {
  try {
    const { stdout, stderr } = await starten(process.execPath, argumente, { encoding: 'utf8' });
    return { status: 0, stdout, stderr };
  } catch (f) {
    return { status: f.code ?? 1, stdout: f.stdout ?? '', stderr: f.stderr ?? String(f.message) };
  }
}

const CRAWL = fileURLToPath(new URL('../referenz-crawl.mjs', import.meta.url));
const SEITE =
  '<!doctype html><html lang="de"><head><title>Referenzseite</title></head><body><h1>Held</h1><p>Text</p></body></html>';

let server;
let basis;

before(async () => {
  server = createServer((anfrage, antwort) => {
    if (anfrage.url === '/robots.txt') {
      antwort.writeHead(200, { 'content-type': 'text/plain' });
      antwort.end('User-agent: *\nDisallow:\n');
      return;
    }
    antwort.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    antwort.end(SEITE);
  });
  await new Promise((fertig) => server.listen(0, '127.0.0.1', fertig));
  basis = `http://127.0.0.1:${server.address().port}`;
});

after(() => server?.close());

function umgebung(zustand, zusatz = {}) {
  const ordner = mkdtempSync(join(tmpdir(), 'crawl-sperre-'));
  const eintrag = neuerEintrag({
    id: 'ref-01-testseite',
    name: 'Testseite',
    url: `${basis}/`,
    quelle: 'direkt',
    fuer: ['hero'],
    grund: 'Test',
    extraktion: ['raster'],
    risiken: [],
  });
  eintrag.zustand = zustand;
  Object.assign(eintrag, zusatz);
  const register = leeresRegister('test');
  register.referenzen.push(eintrag);
  const pfad = join(ordner, 'register.json');
  mkdirSync(ordner, { recursive: true });
  writeFileSync(pfad, JSON.stringify(register, null, 2));
  return { ordner, pfad, ablage: join(ordner, 'referenzen') };
}

function crawl(umg, ...zusatz) {
  return lauf([CRAWL, '--id', 'ref-01-testseite', '--register', umg.pfad, '--ablage', umg.ablage, ...zusatz]);
}

function aufraeumen(umg) {
  rmSync(umg.ordner, { recursive: true, force: true });
}

test('ohne Freigabe wird nicht abgerufen und nichts abgelegt', async () => {
  for (const zustand of ['ENTDECKT', 'VORGELEGT', 'ABGELEHNT', 'GECRAWLT', 'NUR_PROJEKT']) {
    const umg = umgebung(zustand);
    try {
      const ergebnis = await crawl(umg);
      assert.equal(ergebnis.status, 2, `${zustand} müsste den Abruf verweigern`);
      assert.match(ergebnis.stderr, /nicht auf FREIGEGEBEN/);
      assert.equal(existsSync(join(umg.ablage, 'ref-01-testseite')), false, 'es darf nichts abgelegt werden');
      const register = JSON.parse(readFileSync(umg.pfad, 'utf8'));
      assert.equal(register.referenzen[0].zustand, zustand, 'der Zustand bleibt unverändert');
    } finally {
      aufraeumen(umg);
    }
  }
});

test('die Fehlermeldung nennt den Weg zur Freigabe', async () => {
  const umg = umgebung('ENTDECKT');
  try {
    const ergebnis = await crawl(umg);
    assert.match(ergebnis.stderr, /referenz-register\.mjs vorlegen/);
    assert.match(ergebnis.stderr, /referenz-register\.mjs freigeben/);
  } finally {
    aufraeumen(umg);
  }
});

test('mit Freigabe wird erfasst, abgelegt und der Zustand fortgeschrieben', async () => {
  const umg = umgebung('FREIGEGEBEN', {
    freigabe: { umfang: 'website', sektionen: [], komponenten: [], durch: 'mensch', zeit: 'jetzt' },
  });
  try {
    const ergebnis = await crawl(umg);
    assert.equal(ergebnis.status, 0, ergebnis.stderr);
    const ordner = join(umg.ablage, 'ref-01-testseite');
    assert.ok(existsSync(join(ordner, 'roh', 'seite.html')));
    assert.match(readFileSync(join(ordner, 'roh', 'seite.html'), 'utf8'), /Referenzseite/);

    const meta = JSON.parse(readFileSync(join(ordner, 'meta.json'), 'utf8'));
    assert.equal(meta.abrufart, 'Direktabruf');
    assert.equal(meta.analyse_umfang.umfang, 'website');
    assert.ok(Array.isArray(meta.grenzen));

    const register = JSON.parse(readFileSync(umg.pfad, 'utf8'));
    assert.equal(register.referenzen[0].zustand, 'GECRAWLT');
    assert.ok(register.referenzen[0].roh);
  } finally {
    aufraeumen(umg);
  }
});

test('eine Teilfreigabe beschränkt den Analyseumfang und sagt das ausdrücklich', async () => {
  const umg = umgebung('FREIGEGEBEN', {
    freigabe: { umfang: 'teilweise', sektionen: ['hero'], komponenten: [], durch: 'mensch', zeit: 'jetzt' },
  });
  try {
    assert.equal((await crawl(umg)).status, 0);
    const meta = JSON.parse(readFileSync(join(umg.ablage, 'ref-01-testseite', 'meta.json'), 'utf8'));
    assert.equal(meta.analyse_umfang.umfang, 'teilweise');
    assert.deepEqual(meta.analyse_umfang.sektionen, ['hero']);
    assert.match(meta.analyse_umfang.$hinweis, /Nur diese Teile sind freigegeben/);
  } finally {
    aufraeumen(umg);
  }
});

test('eine nicht erreichbare Seite lässt den Zustand auf FREIGEGEBEN und erfindet nichts', async () => {
  const umg = umgebung('FREIGEGEBEN', {
    url: 'http://127.0.0.1:1/',
    freigabe: { umfang: 'website', sektionen: [], komponenten: [], durch: 'mensch', zeit: 'jetzt' },
  });
  try {
    const ergebnis = await crawl(umg);
    assert.equal(ergebnis.status, 1);
    assert.match(ergebnis.stderr, /nicht erfasst/);
    assert.match(ergebnis.stderr, /Nicht aus der Erinnerung beschreiben/);
    assert.equal(existsSync(join(umg.ablage, 'ref-01-testseite', 'meta.json')), false);
    const register = JSON.parse(readFileSync(umg.pfad, 'utf8'));
    assert.equal(register.referenzen[0].zustand, 'FREIGEGEBEN');
  } finally {
    aufraeumen(umg);
  }
});

test('eine unbekannte Kennung meldet 1, ein Aufruf ohne Kennung meldet 2', async () => {
  const umg = umgebung('FREIGEGEBEN');
  try {
    const fehlt = await lauf([CRAWL, '--id', 'gibt-es-nicht', '--register', umg.pfad]);
    assert.equal(fehlt.status, 1);
    const ohne = await lauf([CRAWL, '--register', umg.pfad]);
    assert.equal(ohne.status, 2);
  } finally {
    aufraeumen(umg);
  }
});

test('--alle erfasst nur die freigegebenen Einträge', async () => {
  const umg = umgebung('ENTDECKT');
  try {
    const ergebnis = await lauf([CRAWL, '--alle', '--register', umg.pfad, '--ablage', umg.ablage]);
    assert.equal(ergebnis.status, 1);
    assert.match(ergebnis.stderr, /Kein Eintrag im Zustand FREIGEGEBEN/);
    assert.equal(existsSync(umg.ablage), false);
  } finally {
    aufraeumen(umg);
  }
});
