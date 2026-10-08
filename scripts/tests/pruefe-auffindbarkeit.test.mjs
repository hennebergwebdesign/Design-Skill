/*
  pruefe-auffindbarkeit.test.mjs — prüft Titel, Meta-Beschreibung, doppelte Titel und die
  Sichtbarkeit von Name, Adresse und Telefon in pruefe-geo.mjs (Regeln 10 bis 14).

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und einer, der ähnlich aussieht und durchgehen muss.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { auffindbarkeitAnalysieren, titelDoppelt, kopfLesen } from '../pruefe-geo.mjs';

const BESCHREIBUNG = '<meta name="description" content="Dach undicht? Leckortung in 48 Stunden, dokumentiert. Termin anfragen.">';
const seite = (kopf, koerper = '<h1>Dachdecker Karlsruhe</h1>') =>
  `<!doctype html><html lang="de"><head>${kopf}</head><body>${koerper}</body></html>`;
const regeln = (erg) => [...erg.fehler, ...erg.warnungen].map((b) => b.regel);

test('Seite mit Titel und Beschreibung im Rahmen besteht', () => {
  assert.deepEqual(regeln(auffindbarkeitAnalysieren(seite(`<title>Dachdecker Karlsruhe | Leckortung in 48 Stunden</title>${BESCHREIBUNG}`))), []);
});

test('fehlender Titel ist ein Fehler, fehlende Beschreibung eine Warnung', () => {
  const erg = auffindbarkeitAnalysieren(seite('<title> </title>'));
  assert.deepEqual(erg.fehler.map((b) => b.regel), ['titel-fehlt']);
  assert.deepEqual(erg.warnungen.map((b) => b.regel), ['beschreibung-fehlt']);
});

test('zu langer Titel und zu lange Beschreibung werden gemeldet, Entitäten zählen als ein Zeichen', () => {
  const lang = 'Dachdecker Karlsruhe und Umgebung | Leckortung, Sanierung, Wartung &amp; Notdienst rund um die Uhr';
  const erg = auffindbarkeitAnalysieren(seite(`<title>${lang}</title><meta name="description" content="${'x'.repeat(170)}">`));
  assert.deepEqual(regeln(erg), ['titel-lang', 'beschreibung-lang']);
  assert.equal(kopfLesen('<title>A &amp; B</title>').titel, 'A & B');
});

test('noindex und 404 werden nicht geprüft', () => {
  assert.deepEqual(regeln(auffindbarkeitAnalysieren(seite('<meta name="robots" content="noindex">'))), []);
  assert.deepEqual(regeln(auffindbarkeitAnalysieren(seite(''), 'dist/404.html')), []);
});

test('doppelte Titel über Seiten hinweg werden gefunden, Groß und Klein egal', () => {
  const d = titelDoppelt(new Map([['a.html', 'Leistungen | Muster'], ['b.html', 'leistungen | muster'], ['c.html', 'Kontakt | Muster']]));
  assert.equal(d.length, 1);
  assert.deepEqual(d[0].seiten, ['a.html', 'b.html']);
});

const LOKAL = (tel, strasse) => `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'RoofingContractor', name: 'Muster Dach',
  telephone: tel, address: { '@type': 'PostalAddress', streetAddress: strasse, addressLocality: 'Karlsruhe' },
})}</script>`;
const KOPF = `<title>Dachdecker Karlsruhe | Muster Dach</title>${BESCHREIBUNG}`;

test('Telefon und Straße aus dem Markup sichtbar, auch in anderer Schreibweise', () => {
  const html = seite(KOPF + LOKAL('+49 721 123456', 'Hauptstraße 12'), '<h1>Dach</h1><footer>Hauptstraße 12, 76131 Karlsruhe, Tel. 0721 / 12 34 56</footer>');
  assert.deepEqual(regeln(auffindbarkeitAnalysieren(html)), []);
});

test('Telefon im Markup, aber nicht auf der Seite, wird gemeldet', () => {
  const html = seite(KOPF + LOKAL('+49 721 123456', 'Hauptstraße 12'), '<h1>Dach</h1><footer>Hauptstraße 12, Karlsruhe</footer>');
  const erg = auffindbarkeitAnalysieren(html);
  assert.deepEqual(regeln(erg), ['nap-nicht-sichtbar']);
  assert.match(erg.warnungen[0].meldung, /Telefon/);
});

test('ein Schnipsel ohne head bekommt keinen Kopfbefund', () => {
  assert.deepEqual(regeln(auffindbarkeitAnalysieren('<section><h2>Ablauf</h2><p>Text</p></section>')), []);
});
