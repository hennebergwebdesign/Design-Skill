/*
  pruefe-kennzahlen.test.mjs — harte Grenze: keine Kennzahlen unterhalb des Heldenbereichs.
  Läuft mit: node --test 'scripts/tests/*.test.mjs'
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import { seiteAnalysieren, kennzahlenUnterHero, quelleAnalysieren } from '../pruefe-geschmack.mjs';

const hero = '<section><h1>Titel</h1><dl><dd>1977</dd><dd>100 %</dd><dd>40 Jahre</dd></dl></section>';
const regeln = (r) => r.fehler.map((f) => f.regel);

test('Zahlen im Heldenbereich sind erlaubt', () => {
  assert.deepEqual(kennzahlenUnterHero(`${hero}<section><h2>Leistungen</h2><p>Text</p></section>`), []);
});

test('Kennzahlenleiste direkt unter dem Held ist ein Fehler', () => {
  const html = `${hero}<section class="trust"><ul><li><strong>1977</strong><span>seit</span></li><li><strong>2 Jahre</strong><span>Garantie</span></li><li><strong>1000 h+</strong><span>Salzsprühtest</span></li></ul></section>`;
  assert.ok(regeln(seiteAnalysieren(html)).includes('kennzahlen-unter-hero'));
});

test('Zähler mit data-zaehler wird gefunden', () => {
  const html = `${hero}<section><h2>Firmen</h2><span data-zaehler="16000">16.000</span></section>`;
  assert.equal(kennzahlenUnterHero(html)[0].art, 'Zähler');
});

test('Klasse kennzahlen oder stats wird gefunden', () => {
  assert.equal(kennzahlenUnterHero(`${hero}<section><div class="kennzahlen"><p>x</p></div></section>`).length, 1);
  assert.equal(kennzahlenUnterHero(`${hero}<section><div class="stats-grid"><p>x</p></div></section>`).length, 1);
});

test('Preise mit Eurozeichen sind keine Kennzahlen', () => {
  const html = `${hero}<section><h2>Preise</h2><strong>99 €</strong><strong>130 €</strong><strong>60 €</strong></section>`;
  assert.deepEqual(kennzahlenUnterHero(html), []);
});

test('Einzelne Zahl im Fließtext löst nichts aus', () => {
  const html = `${hero}<section><h2>Über uns</h2><p>Seit 1977 beschichten wir Felgen.</p></section>`;
  assert.deepEqual(kennzahlenUnterHero(html), []);
});

test('Quelltext mit Zählerattribut wird gemeldet', () => {
  const b = quelleAnalysieren('<span data-zaehler="40">40</span>');
  assert.ok(b.some((x) => x.regel === 'kennzahlen-zaehler'));
});
