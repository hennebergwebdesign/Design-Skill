/*
  abruf.test.mjs — prüft die Abrufschicht gegen einen lokalen Testserver.

      node --test 'scripts/tests/*.test.mjs'

  Kein Netzzugriff nach außen: der Server läuft auf 127.0.0.1 und liefert Fixtures. Damit
  bleiben die Tests reproduzierbar und unabhängig davon, ob eine fremde Seite gerade erreichbar
  ist. Genau darum geht es hier auch inhaltlich: was nicht erfasst werden konnte, muss als
  Grenze auftauchen und nicht als geschätzter Wert.
*/

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

import { abrufen, AbrufFehler, robotsLesen, robotsErlaubt, adresseNormalisieren, stufenfolge } from '../lib/abruf.mjs';

const SEITE = '<!doctype html><html lang="de"><head><title>Testseite</title></head><body><h1>Hallo</h1></body></html>';

let server;
let basis;
let robotsInhalt = 'User-agent: *\nDisallow: /gesperrt\n';
let robotsStatus = 200;

before(async () => {
  server = createServer((anfrage, antwort) => {
    const pfad = anfrage.url ?? '/';
    if (pfad === '/robots.txt') {
      antwort.writeHead(robotsStatus, { 'content-type': 'text/plain' });
      antwort.end(robotsStatus === 200 ? robotsInhalt : 'Fehler');
      return;
    }
    if (pfad.startsWith('/json')) {
      antwort.writeHead(200, { 'content-type': 'application/json' });
      antwort.end('{"a":1}');
      return;
    }
    if (pfad.startsWith('/weg')) {
      antwort.writeHead(404, { 'content-type': 'text/html' });
      antwort.end('<html><body>weg</body></html>');
      return;
    }
    antwort.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    antwort.end(SEITE);
  });
  await new Promise((fertig) => server.listen(0, '127.0.0.1', fertig));
  basis = `http://127.0.0.1:${server.address().port}`;
});

after(() => server?.close());

// --------------------------------------------------------------- robots.txt

test('robots.txt: die längste passende Regel gewinnt', () => {
  const regeln = robotsLesen('User-agent: *\nDisallow: /a\nAllow: /a/b\n');
  assert.equal(robotsErlaubt(regeln, '/a/x'), false);
  assert.equal(robotsErlaubt(regeln, '/a/b/c'), true, 'die spezifischere Allow-Regel gewinnt');
  assert.equal(robotsErlaubt(regeln, '/b'), true);
  // Präfixvergleich nach RFC 9309: "Disallow: /a" sperrt auch /andere. Das ist kein Fehler
  // im Leser, sondern die Semantik der Datei, und deshalb steht es hier als Test.
  assert.equal(robotsErlaubt(regeln, '/andere'), false);
});

test('robots.txt: ein leeres Disallow erlaubt alles', () => {
  assert.equal(robotsErlaubt(robotsLesen('User-agent: *\nDisallow:\n'), '/beliebig'), true);
});

test('robots.txt: eine Gruppe für den eigenen Agenten schlägt die Sterngruppe', () => {
  const text = 'User-agent: *\nDisallow: /\n\nUser-agent: design-skill-abruf\nAllow: /\n';
  assert.equal(robotsErlaubt(robotsLesen(text), '/irgendwas'), true);
});

test('robots.txt: Kommentare und Leerzeilen stören nicht', () => {
  const regeln = robotsLesen('# Hinweis\n\nUser-agent: *   # alle\nDisallow: /privat\n');
  assert.equal(robotsErlaubt(regeln, '/privat/seite'), false);
});

// -------------------------------------------------------------------- Abruf

test('eine gültige Seite wird über den Direktabruf geliefert', async () => {
  const e = await abrufen(basis);
  assert.equal(e.status, 200);
  assert.equal(e.quelle, 'Direktabruf');
  assert.match(e.html, /Testseite/);
  assert.deepEqual(e.grenzen, []);
});

test('eine per robots.txt gesperrte Adresse wird nicht abgerufen', async () => {
  await assert.rejects(
    () => abrufen(`${basis}/gesperrt/seite`),
    (f) => f instanceof AbrufFehler && f.art === 'robots'
  );
});

test('--ohne-robots entspricht robots false und vermerkt das als Grenze', async () => {
  const e = await abrufen(`${basis}/gesperrt/seite`, { robots: false });
  assert.equal(e.status, 200);
  assert.ok(e.grenzen.some((g) => /robots\.txt wurde auf ausdrücklichen Wunsch nicht geprüft/.test(g)));
});

test('ein robots.txt mit Serverfehler gilt als Verbot', async () => {
  robotsStatus = 503;
  try {
    await assert.rejects(() => abrufen(basis), (f) => f.art === 'robots' && /503/.test(f.message));
  } finally {
    robotsStatus = 200;
  }
});

test('ein fehlendes robots.txt erlaubt den Abruf', async () => {
  robotsStatus = 404;
  try {
    const e = await abrufen(basis);
    assert.equal(e.status, 200);
    assert.deepEqual(e.grenzen, []);
  } finally {
    robotsStatus = 200;
  }
});

test('eine Antwort ohne HTML wird abgelehnt und nicht als Seite ausgegeben', async () => {
  await assert.rejects(() => abrufen(`${basis}/json`), (f) => f.art === 'leer');
});

test('ein 404 bricht ab, mit statusDurchreichen wird er als Befund zurückgegeben', async () => {
  await assert.rejects(() => abrufen(`${basis}/weg`), (f) => f.art === 'status');
  const e = await abrufen(`${basis}/weg`, { statusDurchreichen: true });
  assert.equal(e.status, 404);
  assert.equal(e.html, '');
});

test('ein angefragter Screenshot, den keine Stufe liefern kann, wird zur Grenze und nicht erfunden', async () => {
  const e = await abrufen(basis, { screenshot: true });
  assert.equal(e.screenshot, '');
  assert.ok(e.grenzen.some((g) => /Playwright/.test(g)), 'die nicht nutzbare Stufe wird benannt');
  assert.ok(e.grenzen.some((g) => /kein Screenshot/.test(g)));
});

test('angefragte Breakpoints ohne Browser machen das responsive Verhalten unbekannt', async () => {
  const e = await abrufen(basis, { breakpoints: [375, 1440] });
  assert.deepEqual(e.breakpoints, []);
  assert.ok(e.grenzen.some((g) => /responsives Verhalten bleibt unbekannt/.test(g)));
});

test('eine nicht erreichbare Adresse wirft und führt die versuchten Stufen mit', async () => {
  await assert.rejects(
    () => abrufen('http://127.0.0.1:1/seite', { robots: false, wiederholen: 0, zeitlimit: 2000 }),
    (f) => f instanceof AbrufFehler && Array.isArray(f.grenzen) && f.grenzen.length > 0
  );
});

test('eine ungültige Adresse wird sofort abgewiesen', () => {
  assert.throws(() => adresseNormalisieren('kein::ding'), (f) => f.art === 'adresse');
});

test('die Stufenfolge endet immer beim Direktabruf', () => {
  const ohne = stufenfolge();
  assert.equal(ohne.at(-1).name, 'Direktabruf');
  const mitBild = stufenfolge({ screenshot: true });
  assert.ok(mitBild.some((s) => s.name === 'Playwright lokal'));
  assert.equal(mitBild.at(-1).name, 'Direktabruf');
});
