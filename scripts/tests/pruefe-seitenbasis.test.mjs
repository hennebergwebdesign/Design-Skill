/*
  pruefe-seitenbasis.test.mjs — prüft die statischen Grundlagen in pruefe-seitenbasis.mjs.

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und einer, der ähnlich aussieht und durchgehen muss.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { seiteBasisAnalysieren } from '../pruefe-seitenbasis.mjs';

const KOPF = '<meta name="viewport" content="width=device-width, initial-scale=1"><meta property="og:image" content="/og.jpg"><meta name="theme-color" content="#fff"><link rel="icon" href="/f.svg">';
const seite = (koerper = '<p>Text</p>', kopf = KOPF, lang = 'de') =>
  `<!doctype html><html lang="${lang}"><head><title>T</title>${kopf}</head><body><header>K</header><main>${koerper}</main><footer>F</footer></body></html>`;
const regeln = (e) => [...e.fehler, ...e.warnungen].map((b) => b.regel);

test('saubere Seite besteht ohne Befund', () => {
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite())), []);
});

test('fehlendes lang ist ein Fehler, lang="en" nur eine Warnung', () => {
  const ohne = seiteBasisAnalysieren(seite().replace(' lang="de"', ''));
  assert.deepEqual(ohne.fehler.map((b) => b.regel), ['sprache-fehlt']);
  assert.deepEqual(seiteBasisAnalysieren(seite('<p>x</p>', KOPF, 'en')).warnungen.map((b) => b.regel), ['sprache-nicht-de']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<p>x</p>', KOPF, 'de-AT'))), []);
});

test('Viewport: fehlt, sperrt den Zoom, oder ist in Ordnung', () => {
  assert.deepEqual(seiteBasisAnalysieren(seite('<p>x</p>', KOPF.replace(/<meta name="viewport"[^>]*>/, ''))).fehler.map((b) => b.regel), ['viewport-fehlt']);
  const gesperrt = KOPF.replace('initial-scale=1', 'initial-scale=1, user-scalable=no');
  assert.deepEqual(seiteBasisAnalysieren(seite('<p>x</p>', gesperrt)).fehler.map((b) => b.regel), ['zoom-gesperrt']);
  const maximal = KOPF.replace('initial-scale=1', 'maximum-scale=1');
  assert.deepEqual(seiteBasisAnalysieren(seite('<p>x</p>', maximal)).fehler.map((b) => b.regel), ['zoom-gesperrt']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<p>x</p>', KOPF.replace('initial-scale=1', 'initial-scale=1, maximum-scale=5')))), []);
});

test('Bild ohne alt ist ein Fehler, alt="" für Zierbilder nicht; Maße fehlen nur als Warnung', () => {
  assert.deepEqual(seiteBasisAnalysieren(seite('<img src="a.jpg" width="10" height="10">')).fehler.map((b) => b.regel), ['bild-ohne-alt']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<img src="a.jpg" alt="" width="10" height="10">'))), []);
  assert.deepEqual(seiteBasisAnalysieren(seite('<img src="a.jpg" alt="Dach">')).warnungen.map((b) => b.regel), ['bild-ohne-masse']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<img src="a.jpg" alt="Dach" style="aspect-ratio: 4 / 3">'))), []);
});

test('Eingabefeld: Label per for, umschließend oder aria-label besteht; Platzhalter allein nicht', () => {
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<label for="m">Mail</label><input id="m" type="email">'))), []);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<label>Mail <input type="email"></label>'))), []);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<input type="search" aria-label="Suche">'))), []);
  assert.deepEqual(seiteBasisAnalysieren(seite('<input type="email" placeholder="Ihre Mail">')).fehler.map((b) => b.regel), ['feld-ohne-label']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<input type="hidden" name="t"><button type="submit">Los</button><input type="submit" value="Los">'))), []);
});

test('Fremdserver in Schrift-, Stil- und Skriptlinks sind ein Fehler, eigene Pfade nicht', () => {
  const kopf = KOPF + '<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet"><script src="https://unpkg.com/lucide@1"></script>';
  const e = seiteBasisAnalysieren(seite('<p>x</p>', kopf));
  assert.deepEqual(e.fehler.map((b) => b.regel), ['fremdserver', 'fremdserver']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<p>x</p>', KOPF + '<link rel="stylesheet" href="/fonts/inter.css"><script src="/js/lucide.js"></script>'))), []);
});

test('Hauptbereich, Kopf und Fußzeile fehlen als Warnung', () => {
  const nackt = '<!doctype html><html lang="de"><head>' + KOPF + '</head><body><p>x</p></body></html>';
  assert.deepEqual(seiteBasisAnalysieren(nackt).warnungen.map((b) => b.regel), ['main-fehlt', 'kopf-oder-fuss-fehlt']);
});

test('Teilen-Ebene fehlt als Warnung, auf noindex- und 404-Seiten nicht', () => {
  const kopf = '<meta name="viewport" content="width=device-width, initial-scale=1">';
  assert.deepEqual(seiteBasisAnalysieren(seite('<p>x</p>', kopf)).warnungen.map((b) => b.regel), ['og-image-fehlt', 'theme-color-fehlt', 'favicon-fehlt']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<p>x</p>', kopf + '<meta name="robots" content="noindex">'))), []);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<p>x</p>', kopf), 'dist/404.html')), []);
});

test('toter Link: href="#" und leer werden gemeldet, echte Ziele und Anker nicht', () => {
  assert.deepEqual(seiteBasisAnalysieren(seite('<a href="#">Mehr</a><a href="">X</a>')).warnungen.map((b) => b.regel), ['toter-link']);
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite('<a href="#kontakt">Kontakt</a><a href="/leistungen">L</a>'))), []);
});

test('Tags in Kommentaren und Skripten werden nicht gezählt', () => {
  const k = '<!-- <img src="x.jpg"> --><script>const h = "<img src=y>";</script>';
  assert.deepEqual(regeln(seiteBasisAnalysieren(seite(k))), []);
});
