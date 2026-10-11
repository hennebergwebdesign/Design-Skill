/*
  pruefe-scrollstrecke.test.mjs — prüft die Auswertung und den Lauf von pruefe-scrollstrecke.mjs.

      node --test 'scripts/tests/*.test.mjs'

  Zwei Teile. Die reinen Funktionen (tote Strecke, Deckkraft, Aufruf, Kontaktbogen) laufen immer.
  Der Lauf im Browser braucht Playwright mit Chromium und wird übersprungen, wenn keins gefunden
  wird. Kein Netzzugriff nach außen: die Testseiten liefert ein Server auf 127.0.0.1.
*/

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  toteStreckenFinden,
  deckkraftAuswerten,
  kontaktbogenHtml,
  argumenteLesen,
  durchlaufen,
  auswerten,
  OPAZITAET_MIN,
} from '../pruefe-scrollstrecke.mjs';
import { playwrightLaden } from '../lib/browser.mjs';

const pos = (hashes) => hashes.map((hash, i) => ({ index: i, y: i * 450, hash }));

// ------------------------------------------------------------------ reine Funktionen

test('tote Strecke: drei gleiche Bilder in Folge, zwei nicht', () => {
  assert.deepEqual(toteStreckenFinden(pos(['a', 'b', 'c', 'd'])), []);
  assert.deepEqual(toteStreckenFinden(pos(['a', 'b', 'b', 'c'])), [], 'zwei gleiche sind noch keine Strecke');
  const lauf = toteStreckenFinden(pos(['a', 'b', 'b', 'b', 'c']));
  assert.equal(lauf.length, 1);
  assert.deepEqual([lauf[0].erste, lauf[0].letzte, lauf[0].positionen], [1, 3, 3]);
});

test('tote Strecke: mehrere Läufe und ein Lauf bis zum Ende werden gefunden', () => {
  const lauf = toteStreckenFinden(pos(['a', 'a', 'a', 'b', 'c', 'c', 'c', 'c']));
  assert.deepEqual(lauf.map((l) => [l.erste, l.letzte]), [[0, 2], [4, 7]]);
});

test('tote Strecke: eine kürzere Schwelle ist einstellbar', () => {
  assert.equal(toteStreckenFinden(pos(['a', 'b', 'b', 'c']), 2).length, 1);
});

test('Deckkraft: ein Text unter OPAZITAET_MIN bleibt blass, einer nahe null ist unsichtbar', () => {
  const texte = new Map([
    [1, { text: 'normal', max: 1 }],
    [2, { text: 'Nebentext', max: OPAZITAET_MIN }],
    [3, { text: 'zu blass', max: 0.3 }],
    [4, { text: 'weg', max: 0 }],
  ]);
  const n = deckkraftAuswerten(texte);
  assert.deepEqual(n.fehler, []);
  assert.deepEqual(n.warnungen.map((w) => w.regel).sort(), ['text-bleibt-blass', 'text-nie-sichtbar']);
});

test('Deckkraft: bei reduzierter Bewegung ist unsichtbarer Text ein Fehler, kein Hinweis', () => {
  const texte = new Map([[1, { text: 'Preise', max: 0 }]]);
  const r = deckkraftAuswerten(texte, { reduziert: true });
  assert.deepEqual(r.fehler.map((f) => f.regel), ['inhalt-unsichtbar-reduziert']);
  assert.deepEqual(r.warnungen, []);
});

test('Kontaktbogen markiert tote Positionen und escaped Titel', () => {
  const p = pos(['a', 'b', 'b', 'b']).map((x) => ({ ...x, datei: `pos-${x.index}.jpg` }));
  const html = kontaktbogenHtml(p, toteStreckenFinden(p), 'Test <x>');
  assert.match(html, /<figure class="tot">/);
  assert.match(html, /<figure class="">/);
  assert.match(html, /Test &lt;x&gt;/);
});

test('Aufruf: Adresse Pflicht, file:// abgelehnt, mobil setzt die Größe, falsche Zahl abgelehnt', () => {
  assert.throws(() => argumenteLesen([]), /Adresse fehlt/);
  assert.throws(() => argumenteLesen(['file:///x.html']), /http/);
  assert.throws(() => argumenteLesen(['http://a', '--schritt', '0']), /positive Zahl/);
  assert.throws(() => argumenteLesen(['http://a', '--unbekannt']), /Unbekannte Option/);
  const a = argumenteLesen(['http://a.test', '--mobil', '--reduziert']);
  assert.deepEqual([a.breite, a.hoehe, a.reduziert], [390, 844, true]);
});

// ------------------------------------------------------------------ Lauf im Browser

const KOPF = '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>T</title>';
const SEITEN = {
  '/normal': `${KOPF}<style>body{margin:0;font:20px sans-serif}section{height:100vh;padding:20px}
    section:nth-child(odd){background:#fde}section:nth-child(even){background:#def}</style></head>
    <body><section><h1>Erste</h1></section><section><p>Zweite</p></section><section><p>Dritte</p></section><section><p>Vierte</p></section></body></html>`,
  // 500vh hoher Block mit festem Inhalt: beim Scrollen ändert sich nichts
  '/pin': `${KOPF}<style>body{margin:0;font:20px sans-serif}.spur{height:600vh}.buehne{position:sticky;top:0;height:100vh;background:#cde}
    .davor,.danach{height:100vh;background:#fed}</style></head>
    <body><div class="davor"><h1>Davor</h1></div><div class="spur"><div class="buehne"><p>Steht still</p></div></div><div class="danach"><p>Danach</p></div></body></html>`,
  '/breit': `${KOPF}<style>body{margin:0}</style></head><body><h1>Titel</h1><div style="width:3000px;height:40px;background:#c33"></div><div style="height:200vh"></div></body></html>`,
  '/versteckt': `${KOPF}<style>body{margin:0}.ein{opacity:0}</style></head>
    <body><h1>Titel</h1><p class="ein">Dieser Preis wird nie sichtbar</p><div style="height:150vh"></div></body></html>`,
  '/fehler': `${KOPF}</head><body><h1>Titel</h1><script>throw new Error('kaputt')</script><div style="height:150vh"></div></body></html>`,
};

let server;
let basis;
let pw;
let ausgabe;

before(async () => {
  pw = await playwrightLaden();
  server = createServer((anfrage, antwort) => {
    const seite = SEITEN[anfrage.url?.split('?')[0] ?? ''];
    antwort.writeHead(seite ? 200 : 404, { 'content-type': 'text/html; charset=utf-8' });
    antwort.end(seite ?? 'weg');
  });
  await new Promise((fertig) => server.listen(0, '127.0.0.1', fertig));
  basis = `http://127.0.0.1:${server.address().port}`;
  ausgabe = mkdtempSync(join(tmpdir(), 'scrollstrecke-'));
});

after(() => {
  server?.close();
  if (ausgabe) rmSync(ausgabe, { recursive: true, force: true });
});

async function lauf(pfad, extra = []) {
  const a = argumenteLesen([`${basis}${pfad}`, '--warten', '80', '--ausgabe', join(ausgabe, pfad.slice(1) + extra.join('')), ...extra]);
  const l = await durchlaufen(a, pw.chromium);
  return { l, befund: auswerten(l, { reduziert: a.reduziert }), a };
}

const regeln = (b) => [...b.fehler, ...b.warnungen].map((x) => x.regel);

test('Browser: eine normale Seite besteht ohne Befund und legt Bilder ab', { skip: !process.env.PLAYWRIGHT_BROWSERS_PATH && !(await playwrightLaden()) }, async () => {
  const { l, befund, a } = await lauf('/normal');
  assert.deepEqual(regeln(befund), []);
  assert.ok(l.positionen.length >= 4, 'mehrere Positionen erwartet');
  assert.ok(existsSync(join(a.ausgabe, 'pos-00.jpg')));
});

test('Browser: eine gepinnte Strecke ohne Veränderung wird als tote Strecke gemeldet', { skip: !(await playwrightLaden()) }, async () => {
  const { befund } = await lauf('/pin');
  assert.ok(regeln(befund).includes('tote-strecke'), `Befunde: ${regeln(befund)}`);
});

test('Browser: horizontales Überlaufen ist ein Fehler', { skip: !(await playwrightLaden()) }, async () => {
  const { befund } = await lauf('/breit');
  assert.ok(befund.fehler.map((f) => f.regel).includes('horizontaler-ueberlauf'));
});

test('Browser: unsichtbarer Text ist bei normaler Bewegung eine Warnung, bei reduzierter ein Fehler', { skip: !(await playwrightLaden()) }, async () => {
  const normal = await lauf('/versteckt');
  assert.ok(normal.befund.warnungen.map((w) => w.regel).includes('text-nie-sichtbar'));
  assert.equal(normal.befund.fehler.length, 0);
  const reduziert = await lauf('/versteckt', ['--reduziert']);
  assert.ok(reduziert.befund.fehler.map((f) => f.regel).includes('inhalt-unsichtbar-reduziert'));
});

test('Browser: ein Skriptfehler wird als Konsolenfehler gemeldet', { skip: !(await playwrightLaden()) }, async () => {
  const { befund } = await lauf('/fehler');
  assert.ok(befund.fehler.map((f) => f.regel).includes('konsolenfehler'));
});
