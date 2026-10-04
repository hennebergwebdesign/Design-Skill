/*
  brand-extraktion.test.mjs — prüft Tokenableitung, Untergrenzen und den Lauf gegen eine lokale Testseite.

      node --test 'scripts/tests/*.test.mjs'

  Zwei Teile. Die reinen Funktionen (Kontrast, Markenstufe für Text, Typoskala, Tokenvorschlag,
  Aufruf) laufen immer. Der Lauf im Browser braucht Playwright mit Chromium und wird
  übersprungen, wenn keins gefunden wird; das steht dann als übersprungen im Ergebnis und nicht
  als bestanden. Kein Netzzugriff nach außen: die Testseite liefert ein Server auf 127.0.0.1.
*/

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtempSync, rmSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  kontrast,
  markeFuerText,
  fluid,
  skalaAbleiten,
  tokensErzeugen,
  rollenAbleiten,
  argumenteLesen,
  anbieter,
  LIZENZ,
  KLEINSTE_SCHRIFT,
} from '../brand-extraktion.mjs';
import { firecrawlBranding, AbrufFehler } from '../lib/abruf.mjs';
import { playwrightLaden } from '../lib/browser.mjs';

const starten = promisify(execFile);
const SKRIPT = fileURLToPath(new URL('../brand-extraktion.mjs', import.meta.url));
const STRICHE = /[\u2013\u2014]/;

async function lauf(argumente, optionen = {}) {
  try {
    const { stdout, stderr } = await starten(process.execPath, [SKRIPT, ...argumente], { encoding: 'utf8', timeout: 240000, ...optionen });
    return { status: 0, stdout, stderr };
  } catch (f) {
    return { status: f.code ?? 1, stdout: f.stdout ?? '', stderr: f.stderr ?? String(f.message) };
  }
}

// ------------------------------------------------------------------ reine Funktionen

test('Kontrast nach WCAG: Schwarz auf Weiß ist 21:1, Grau #767676 knapp über 4,5:1', () => {
  assert.equal(kontrast('#000000', '#ffffff'), 21);
  assert.ok(kontrast('#767676', '#ffffff') >= 4.5);
  assert.ok(kontrast('#777777', '#ffffff') < 4.5);
});

test('eine helle Markenfarbe wird für Text abgedunkelt, bis sie 4,5:1 erreicht', () => {
  const ergebnis = markeFuerText('#6acc9a', '#ffffff');
  assert.ok(ergebnis, 'eine Textstufe muss sich finden lassen');
  assert.notEqual(ergebnis.hex, '#6acc9a');
  assert.ok(kontrast(ergebnis.hex, '#ffffff') >= 4.5);
  assert.match(ergebnis.quelle, /abgedunkelt/);
});

test('eine dunkle Markenfarbe bleibt für Text unverändert', () => {
  const ergebnis = markeFuerText('#0a5c8f', '#ffffff');
  assert.equal(ergebnis.hex, '#0a5c8f');
});

test('die Typoskala wird zwischen 375 und 1440 Pixel interpoliert', () => {
  assert.equal(fluid(16, 16), '1rem');
  assert.match(fluid(28, 48), /^clamp\(1\.75rem, .+vw, 3rem\)$/);
});

test('gemessene Schrift unter der kleinsten erlaubten Stufe wird angehoben und so markiert', () => {
  const klein = { klein: [{ groesse: 12 }], text: [{ groesse: 16 }] };
  const skala = skalaAbleiten(klein, klein);
  assert.equal(skala['text-sm'].angehoben, true);
  assert.equal(skala['text-sm'].wert, `${KLEINSTE_SCHRIFT / 16}rem`);
  assert.equal(skala['text-base'].angehoben, false);
});

test('eine CSS-Variable für die Primärfarbe schlägt die Gewichtung nach Fläche', () => {
  const F = {
    logo: [], flaeche: [{ hex: '#ffffff', anteil: 70 }, { hex: '#e8590c', anteil: 30 }], text: [{ hex: '#222222', anteil: 100 }],
    rahmen: [], interaktivBg: [], interaktivText: [], verlauf: [],
  };
  const { rollen } = rollenAbleiten({ F, variablenFarben: { '--e-global-color-primary': '#0a5c8f' } });
  assert.equal(rollen.marke.hex, '#0a5c8f');
  assert.match(rollen.marke.quelle, /--e-global-color-primary/);
});

test('der Tokenvorschlag nutzt die Namen der Vorlage und lässt nichts leer', () => {
  const vorlage = readFileSync(fileURLToPath(new URL('../../skills/webdesign-conversion/assets/vorlagen/tokens.css', import.meta.url)), 'utf8');
  const { css } = tokensErzeugen({
    herkunft: 'https://kunde.de',
    datum: '2026-10-02',
    rollen: { marke: { hex: '#6acc9a', quelle: 'Test' }, markeText: markeFuerText('#6acc9a', '#ffffff'), flaeche: { hex: '#ffffff', quelle: 'Test' }, text: { hex: '#151717', quelle: 'Test' } },
    familieText: 'Markenschrift',
    familieDisplay: '',
    typoDesktop: { text: [{ groesse: 16, zeilenhoehe: 1.6 }] },
    typoMobil: { text: [{ groesse: 16 }] },
  });
  const deklarationen = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]*);/g)];
  assert.ok(deklarationen.length >= 5);
  for (const [, name, wert] of deklarationen) {
    assert.ok(wert.trim(), `${name} darf nicht leer sein`);
    assert.ok(vorlage.includes(`${name}:`), `${name} gibt es in assets/vorlagen/tokens.css nicht`);
  }
  assert.match(css, /--farbe-marke-500: #6acc9a;/);
  assert.match(css, /\/\* --farbe-akzent: keine zweite Buntfarbe/);
  assert.match(css, /\/\* --schrift-display: nicht abgeleitet/);
  assert.doesNotMatch(css, STRICHE);
});

test('Lizenzhinweise: Adobe Fonts darf nicht selbst gehostet werden', () => {
  assert.equal(anbieter('https://use.typekit.net/abc.woff2', 'kunde.de'), 'Adobe Fonts');
  assert.match(LIZENZ['Adobe Fonts'], /NICHT erlaubt/);
  assert.equal(anbieter('https://kunde.de/fonts/a.woff2', 'kunde.de'), 'selbst gehostet');
  assert.equal(anbieter('https://fonts.gstatic.com/s/a.woff2', 'kunde.de'), 'Google Fonts');
});

test('Aufruf: höchstens vier Pfade, unbekannte Optionen werden abgewiesen', () => {
  assert.match(argumenteLesen(['kunde.de', '/a', '/b', '/c', '/d', '/e']).fehler, /Höchstens 4 Pfade/);
  assert.match(argumenteLesen(['kunde.de', '--irgendwas']).fehler, /Unbekannte Option/);
  assert.match(argumenteLesen([]).fehler, /Keine Adresse/);
  const gut = argumenteLesen(['kunde.de', '/', '/kontakt', '--aus', 'x']);
  assert.equal(gut.fehler, null);
  assert.equal(gut.ausgabe, 'x');
  assert.deepEqual(gut.pfade, ['/', '/kontakt']);
});

test('ohne Adresse endet das Skript mit Exit 2', async () => {
  const ergebnis = await lauf([]);
  assert.equal(ergebnis.status, 2);
  assert.match(ergebnis.stderr, /Aufruf:/);
});

// ------------------------------------------------------------------ Testseite

const MARKE = '#0a5c8f';
const CTA = '#e8590c';
const CTA_HOVER = '#c2410c';
const CONSENT_FARBE = '#ff00ff';

const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40"><rect width="40" height="40" fill="${MARKE}"/><path d="M50 10h60v20H50z" fill="#222222"/></svg>`;

const CSS = `
@font-face { font-family: 'Markenschrift'; src: url('/fonts/marke.woff2') format('woff2'); font-weight: 400; font-display: swap; }
:root { --primary: ${MARKE}; }
body { margin: 0; background: #ffffff; color: #222222; font-family: 'Markenschrift', Arial, sans-serif; font-size: 17px; line-height: 1.6; }
header { display: flex; justify-content: space-between; padding: 16px 32px; }
.inhalt { max-width: 1140px; margin: 0 auto; }
section { padding: 96px 32px; }
.band { background: #f2f6f9; }
h1 { font-size: 52px; line-height: 1.1; color: ${MARKE}; }
h2 { font-size: 36px; }
small { font-size: 12px; color: #555555; }
.knopf { display: inline-block; background: ${CTA}; color: #ffffff; padding: 14px 28px; border-radius: 999px; transition: background-color 0.25s ease-out; text-decoration: none; }
.knopf:hover { background: ${CTA_HOVER}; }
.karte { border: 1px solid #d0d7de; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); padding: 24px; width: 300px; }
input { border: 1px solid #8a959e; border-radius: 6px; padding: 12px; font-size: 16px; }
#cookie-banner { position: fixed; bottom: 0; left: 0; right: 0; background: ${CONSENT_FARBE}; padding: 40px; }
@media (max-width: 600px) { h1 { font-size: 34px; } h2 { font-size: 26px; } }
`;

const seite = (inhalt) => `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kunde Test</title><link rel="stylesheet" href="/stil.css"><link rel="icon" href="/favicon.svg"></head><body>
<header><a href="/" class="logo"><img src="/logo.svg" alt="Kunde Logo" width="120" height="40"></a><nav><a href="/kontakt">Kontakt</a></nav></header>
<main class="inhalt">${inhalt}</main>
<div id="cookie-banner"><p>Wir nutzen Cookies.</p><button>Alle akzeptieren</button></div>
<script>document.querySelector('#cookie-banner button').addEventListener('click', () => document.getElementById('cookie-banner').remove());</script>
</body></html>`;

const START = seite(`<section><h1>Willkommen beim Kunden</h1><p>Ein Absatz Fließtext, lang genug, damit er als Text zählt und gemessen wird.</p>
<a class="knopf" href="/kontakt">Termin anfragen</a></section>
<section class="band"><h2>Leistungen</h2><div class="karte"><p>Karte mit Rahmen und Schatten.</p></div><p><small>Kleingedrucktes unter vierzehn Pixel.</small></p></section>`);
const KONTAKT = seite(`<section><h2>Kontakt</h2><form><label>Name <input type="text" name="name"></label><button class="knopf" type="submit">Absenden</button></form></section>`);

let server;
let basis;

before(async () => {
  server = createServer((anfrage, antwort) => {
    const pfad = (anfrage.url ?? '/').split('?')[0];
    const senden = (typ, inhalt, status = 200) => { antwort.writeHead(status, { 'content-type': typ }); antwort.end(inhalt); };
    if (pfad === '/') return senden('text/html; charset=utf-8', START);
    if (pfad === '/kontakt') return senden('text/html; charset=utf-8', KONTAKT);
    if (pfad === '/stil.css') return senden('text/css', CSS);
    if (pfad === '/logo.svg' || pfad === '/favicon.svg') return senden('image/svg+xml', LOGO);
    if (pfad === '/fonts/marke.woff2') return senden('font/woff2', Buffer.from('wOF2-attrappe-fuer-den-test'));
    if (pfad === '/v2/scrape') {
      let roh = '';
      anfrage.on('data', (t) => { roh += t; });
      anfrage.on('end', () => {
        const auftrag = JSON.parse(roh);
        const branding = auftrag.formats?.[0]?.type === 'branding' ? { colors: { primary: MARKE }, fonts: [{ family: 'Markenschrift' }] } : null;
        senden('application/json', JSON.stringify({ success: true, data: { branding } }));
      });
      return undefined;
    }
    return senden('text/html; charset=utf-8', '<html><body>weg</body></html>', 404);
  });
  await new Promise((fertig) => server.listen(0, '127.0.0.1', fertig));
  basis = `http://127.0.0.1:${server.address().port}`;
});

after(() => server?.close());

test('Firecrawl-Zweitmeinung läuft über die Abrufschicht, selbst gehostet zuerst', async () => {
  const vorher = { basis: process.env.FIRECRAWL_BASE_URL, schluessel: process.env.FIRECRAWL_API_KEY };
  process.env.FIRECRAWL_BASE_URL = basis;
  delete process.env.FIRECRAWL_API_KEY;
  try {
    const ergebnis = await firecrawlBranding(`${basis}/`);
    assert.equal(ergebnis.quelle, 'Firecrawl selbst gehostet');
    assert.equal(ergebnis.branding.colors.primary, MARKE);
    delete process.env.FIRECRAWL_BASE_URL;
    await assert.rejects(firecrawlBranding(`${basis}/`), AbrufFehler);
  } finally {
    if (vorher.basis === undefined) delete process.env.FIRECRAWL_BASE_URL; else process.env.FIRECRAWL_BASE_URL = vorher.basis;
    if (vorher.schluessel !== undefined) process.env.FIRECRAWL_API_KEY = vorher.schluessel;
  }
});

const pw = await playwrightLaden();

test('Lauf im Browser gegen die Testseite', { skip: pw ? false : 'Playwright nicht gefunden' }, async () => {
  const ordner = mkdtempSync(join(tmpdir(), 'brand-'));
  const ausgabe = join(ordner, '.brand-extraktion');
  try {
    const umgebung = { ...process.env };
    for (const k of ['HTTPS_PROXY', 'https_proxy', 'HTTP_PROXY', 'http_proxy', 'FIRECRAWL_BASE_URL', 'FIRECRAWL_API_KEY']) delete umgebung[k];
    const ergebnis = await lauf([basis, '/', '/kontakt', '/gibt-es-nicht', '--aus', ausgabe], { env: umgebung });
    assert.equal(ergebnis.status, 0, ergebnis.stderr);

    for (const datei of ['BRAND.md', 'tokens-vorschlag.css', 'brand.json', 'assets/logo.svg', 'screenshots/start__held.png', 'screenshots/kontakt__mobil.png']) {
      assert.ok(existsSync(join(ausgabe, datei)), `${datei} fehlt`);
    }
    assert.ok(readdirSync(join(ausgabe, 'fonts')).some((d) => /markenschrift/i.test(d)), 'die geladene Schriftdatei liegt in fonts/');

    const tokens = readFileSync(join(ausgabe, 'tokens-vorschlag.css'), 'utf8');
    const bericht = readFileSync(join(ausgabe, 'BRAND.md'), 'utf8');
    const daten = JSON.parse(readFileSync(join(ausgabe, 'brand.json'), 'utf8'));

    assert.match(tokens, new RegExp(`--farbe-marke-500: ${MARKE};`), 'die CSS-Variable --primary ist die Markenfarbe');
    assert.match(tokens, new RegExp(`--farbe-akzent: ${CTA};`), 'der Hauptbutton ist der Akzent');
    assert.match(tokens, new RegExp(`--farbe-akzent-hover: ${CTA_HOVER};`), 'die Hoverfarbe ist gemessen');
    assert.match(tokens, /--schrift-text: 'Markenschrift'/);
    assert.match(tokens, /--text-sm: .*angehoben/, '12 px Kleingedrucktes wird auf 14 px angehoben');

    assert.ok(!daten.markenListe.some((m) => m.hex === CONSENT_FARBE), 'das Cookie-Banner fließt nicht in die Markenfarben');
    assert.match(bericht, /gibt-es-nicht: HTTP 404/);
    assert.match(bericht, /Lizenzhinweis/);
    assert.doesNotMatch(bericht, STRICHE, 'der Bericht hält die Regel gegen Gedankenstriche ein');
    assert.doesNotMatch(tokens, STRICHE);
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
});
