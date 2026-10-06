/*
  pruefe-geo.test.mjs — prüft die Lesbarkeit für KI-Antworten.

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und ein Fall, der ihr ähnlich sieht und trotzdem
  durchgehen muss. Ein Prüfskript mit Fehlalarmen wird abgeschaltet.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { robotsAnalysieren, robotsLesen, crawlerZustand, seiteAnalysieren } from '../pruefe-geo.mjs';

const SKRIPT = fileURLToPath(new URL('../pruefe-geo.mjs', import.meta.url));
const FUELLTEXT = Array.from({ length: 60 }, (_, i) => `wort${i}`).join(' ');
const seite = (koerper, kopf = '') => `<!doctype html><html lang="de"><head><title>T</title>${kopf}</head><body>${koerper}</body></html>`;
const regeln = (erg) => [...erg.fehler, ...erg.warnungen].map((b) => b.regel);

// ------------------------------------------------------------------ robots.txt

test('Disallow: / für * ist ein Fehler', () => {
  const r = robotsAnalysieren('User-agent: *\nDisallow: /\n');
  assert.equal(r.fehler[0].regel, 'robots-alles-gesperrt');
});

test('Disallow: /api/ für * ist kein Fehler', () => {
  assert.deepEqual(robotsAnalysieren('User-agent: *\nAllow: /\nDisallow: /api/\n').fehler, []);
});

test('Allow: / hebt Disallow: / bei gleicher Länge auf', () => {
  assert.deepEqual(robotsAnalysieren('User-agent: *\nDisallow: /\nAllow: /\n').fehler, []);
});

test('ein gesperrter Suchcrawler gibt eine Warnung', () => {
  const r = robotsAnalysieren('User-agent: OAI-SearchBot\nDisallow: /\n\nUser-agent: *\nAllow: /\n');
  assert.equal(r.warnungen[0].regel, 'suchcrawler-gesperrt');
});

test('gesperrte Trainingscrawler sind keine Warnung', () => {
  const r = robotsAnalysieren('User-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: *\nAllow: /\n');
  assert.deepEqual(r.warnungen, []);
  assert.deepEqual(r.fehler, []);
});

test('mehrere User-agent-Zeilen vor den Regeln bilden eine Gruppe', () => {
  const g = robotsLesen('User-agent: GPTBot\nUser-agent: ClaudeBot\nDisallow: /\n');
  assert.equal(g.length, 1);
  assert.equal(crawlerZustand(g, 'ClaudeBot').gesperrt, true);
  assert.equal(crawlerZustand(g, 'PerplexityBot').quelle, 'keine');
});

test('Namen werden ohne Rücksicht auf Groß- und Kleinschreibung erkannt', () => {
  const g = robotsLesen('user-agent: gptbot\ndisallow: /\n');
  assert.equal(crawlerZustand(g, 'GPTBot').gesperrt, true);
});

test('Kommentare in der robots.txt stören nicht', () => {
  const r = robotsAnalysieren('# User-agent: * Disallow: /\nUser-agent: *\nAllow: /\n');
  assert.deepEqual(r.fehler, []);
});

// ------------------------------------------------------------------ Seiten

test('eine Seite mit Text, einer h1 und sauberer Gliederung hat keinen Befund', () => {
  const html = seite(`<h1>Thema</h1><p>${FUELLTEXT}</p><h2>Unterthema</h2><h3>Punkt</h3>`);
  assert.deepEqual(regeln(seiteAnalysieren(html)), []);
});

test('fast leeres HTML wird gemeldet', () => {
  assert.ok(regeln(seiteAnalysieren(seite('<h1>App</h1><div id="root"></div>'))).includes('kaum-text'));
});

test('Text in Skripten zählt nicht als sichtbarer Text', () => {
  const html = seite(`<h1>App</h1><script>const t = "${FUELLTEXT}";</script>`);
  assert.ok(regeln(seiteAnalysieren(html)).includes('kaum-text'));
});

test('keine h1 und zwei h1 werden gemeldet', () => {
  assert.ok(regeln(seiteAnalysieren(seite(`<h2>A</h2><p>${FUELLTEXT}</p>`))).includes('h1-anzahl'));
  assert.ok(regeln(seiteAnalysieren(seite(`<h1>A</h1><h1>B</h1><p>${FUELLTEXT}</p>`))).includes('h1-anzahl'));
});

test('h2 direkt auf h4 wird gemeldet, h4 zurück auf h2 nicht', () => {
  assert.ok(regeln(seiteAnalysieren(seite(`<h1>A</h1><h2>B</h2><h4>C</h4><p>${FUELLTEXT}</p>`))).includes('ebene-uebersprungen'));
  assert.ok(!regeln(seiteAnalysieren(seite(`<h1>A</h1><h2>B</h2><h3>C</h3><h2>D</h2><p>${FUELLTEXT}</p>`))).includes('ebene-uebersprungen'));
});

test('noindex-Seiten, Weiterleitungen und die 404 werden übersprungen', () => {
  const leer = '<h1>x</h1>';
  assert.deepEqual(regeln(seiteAnalysieren(seite(leer, '<meta name="robots" content="noindex">'))), []);
  assert.deepEqual(regeln(seiteAnalysieren(seite(leer, '<meta http-equiv="refresh" content="0; url=/">'))), []);
  assert.deepEqual(regeln(seiteAnalysieren(seite(leer), '404.html')), []);
});

// ------------------------------------------------------------------ JSON-LD

const ld = (obj) => `<script type="application/ld+json">${typeof obj === 'string' ? obj : JSON.stringify(obj)}</script>`;

test('ungültiges JSON-LD ist ein Fehler', () => {
  const html = seite(`<h1>A</h1><p>${FUELLTEXT}</p>${ld('{ "@type": "Organization", }')}`);
  assert.ok(seiteAnalysieren(html).fehler.some((b) => b.regel === 'jsonld-ungueltig'));
});

const faq = (fragen) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: fragen.map(([f, a]) => ({ '@type': 'Question', name: f, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

test('FAQ-Markup mit sichtbaren Fragen und Antworten ist sauber', () => {
  const html = seite(`<h1>A</h1><p>${FUELLTEXT}</p><h2>Was kostet die Erstberatung?</h2><p>Sie ist kostenlos und dauert 45 Minuten.</p>`
    + ld(faq([['Was kostet die Erstberatung?', 'Sie ist kostenlos und dauert 45 Minuten.']])));
  assert.deepEqual(seiteAnalysieren(html).fehler, []);
});

test('FAQ-Markup mit einer Frage, die nicht auf der Seite steht, ist ein Fehler', () => {
  const html = seite(`<h1>A</h1><p>${FUELLTEXT}</p><h2>Was kostet die Erstberatung?</h2><p>Kostenlos.</p>`
    + ld(faq([['Was kostet die Erstberatung?', 'Kostenlos.'], ['Gibt es einen Rabatt?', 'Ja, 20 Prozent.']])));
  const b = seiteAnalysieren(html).fehler.find((x) => x.regel === 'faq-nicht-sichtbar');
  assert.ok(b);
  assert.match(b.meldung, /Rabatt/);
});

test('FAQ-Markup mit anderer Antwort als sichtbar ist ein Fehler', () => {
  const html = seite(`<h1>A</h1><p>${FUELLTEXT}</p><h2>Was kostet es?</h2><p>Das hängt vom Umfang ab, ein Festpreis wird vorab genannt.</p>`
    + ld(faq([['Was kostet es?', 'Es kostet immer genau 99 Euro im Monat ohne Ausnahme.']])));
  assert.ok(seiteAnalysieren(html).fehler.some((b) => b.regel === 'faq-nicht-sichtbar'));
});

test('FAQ in einem @graph wird ebenfalls geprüft', () => {
  const graph = { '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', name: 'X' }, faq([['Unsichtbar?', 'Ja.']])] };
  const html = seite(`<h1>A</h1><p>${FUELLTEXT}</p>${ld(graph)}`);
  assert.ok(seiteAnalysieren(html).fehler.some((b) => b.regel === 'faq-nicht-sichtbar'));
});

test('Article ohne Datum wird gemeldet, mit Datum nicht', () => {
  const ohne = seite(`<h1>A</h1><p>${FUELLTEXT}</p>${ld({ '@type': 'Article', headline: 'A' })}`);
  const mit = seite(`<h1>A</h1><p>${FUELLTEXT}</p>${ld({ '@type': 'Article', headline: 'A', dateModified: '2026-10-03' })}`);
  assert.ok(regeln(seiteAnalysieren(ohne)).includes('artikel-ohne-datum'));
  assert.ok(!regeln(seiteAnalysieren(mit)).includes('artikel-ohne-datum'));
});

// ------------------------------------------------------------------ Aufruf

test('Exit 1 bei Fehler, 0 bei sauberem Build, 2 ohne Ordner', () => {
  const wurzel = mkdtempSync(join(tmpdir(), 'geo-'));
  try {
    writeFileSync(join(wurzel, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
    writeFileSync(join(wurzel, 'index.html'), seite(`<h1>A</h1><p>${FUELLTEXT}</p>`));
    const rot = spawnSync('node', [SKRIPT, wurzel], { encoding: 'utf8' });
    assert.equal(rot.status, 1);
    assert.match(rot.stdout, /robots-alles-gesperrt/);

    writeFileSync(join(wurzel, 'robots.txt'), 'User-agent: *\nAllow: /\n');
    const gruen = spawnSync('node', [SKRIPT, wurzel, '--llms'], { encoding: 'utf8' });
    assert.equal(gruen.status, 0);
    assert.match(gruen.stdout, /llms\.txt: nicht vorhanden/);

    assert.equal(spawnSync('node', [SKRIPT, join(wurzel, 'gibt-es-nicht')]).status, 2);
  } finally {
    rmSync(wurzel, { recursive: true, force: true });
  }
});
