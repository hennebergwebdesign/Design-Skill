/*
  pruefe-geschmack.test.mjs — prüft den Zähler für die messbaren KI-Tells.

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und ein Fall, der ihr ähnlich sieht und trotzdem
  durchgehen muss. Ein Prüfskript mit Fehlalarmen wird abgeschaltet, und dann prüft es gar
  nichts mehr.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { seiteAnalysieren, quelleAnalysieren, bedienungAnalysieren } from '../pruefe-geschmack.mjs';

const SKRIPT = fileURLToPath(new URL('../pruefe-geschmack.mjs', import.meta.url));

const sektion = (inhalt) => `<section>${inhalt}</section>`;
const seite = (...sektionen) => `<!doctype html><html><body><main>${sektionen.join('\n')}</main></body></html>`;
const regeln = (liste) => liste.map((b) => b.regel);

// ------------------------------------------------------------------ Kicker

test('Kicker über jeder Sektion reißt die Quote', () => {
  const html = seite(
    ...['Leistungen', 'Ablauf', 'Referenzen', 'Team', 'Kontakt', 'Fragen'].map((k) =>
      sektion(`<p class="kicker">${k}</p><h2>Überschrift</h2>`))
  );
  const { fehler } = seiteAnalysieren(html);
  assert.deepEqual(regeln(fehler), ['kicker-quote']);
});

test('ein Kicker auf drei Sektionen ist erlaubt', () => {
  const html = seite(
    sektion('<p class="kicker">Leistungen</p><h2>A</h2>'),
    sektion('<h2>B</h2>'),
    sektion('<h2>C</h2>'),
    sektion('<p class="eyebrow">Ablauf</p><h2>D</h2>'),
    sektion('<h2>E</h2>'),
    sektion('<h2>F</h2>'),
  );
  const { fehler, warnungen } = seiteAnalysieren(html);
  assert.equal(fehler.length, 0);
  assert.ok(!regeln(warnungen).includes('kicker-abstand'));
});

test('Kicker in direkt aufeinanderfolgenden Sektionen wird gemeldet', () => {
  const html = seite(
    sektion('<p class="kicker">Leistungen</p><h2>A</h2>'),
    sektion('<p class="kicker">Ablauf</p><h2>B</h2>'),
    sektion('<h2>C</h2>'), sektion('<h2>D</h2>'), sektion('<h2>E</h2>'), sektion('<h2>F</h2>'),
  );
  assert.ok(regeln(seiteAnalysieren(html).warnungen).includes('kicker-abstand'));
});

test('ein Kicker in einem umschließenden div wird nicht verschluckt', () => {
  const kopf = (k) => sektion(`<div class="kopf"><p class="kicker">${k}</p><h2>Titel</h2></div>`);
  const html = seite(kopf('A'), kopf('B'), kopf('C'));
  assert.deepEqual(regeln(seiteAnalysieren(html).fehler), ['kicker-quote']);
});

test('Tailwind-Signatur zählt nur direkt vor einer Überschrift', () => {
  const vorUeberschrift = '<span class="text-xs uppercase tracking-widest">Leistungen</span><h2>A</h2>';
  const alleinstehend = '<span class="text-xs uppercase tracking-widest">Stand 2026</span><p>Text</p>';
  const drei = (inhalt) => seite(sektion(inhalt), sektion(inhalt), sektion(inhalt));
  assert.deepEqual(regeln(seiteAnalysieren(drei(vorUeberschrift)).fehler), ['kicker-quote']);
  assert.equal(seiteAnalysieren(drei(alleinstehend)).fehler.length, 0);
});

test('Nummer statt Thema im Kicker wird gemeldet', () => {
  const html = seite(sektion('<p class="kicker">01 / Leistungen</p><h2>A</h2>'), sektion('<h2>B</h2>'), sektion('<h2>C</h2>'));
  assert.ok(regeln(seiteAnalysieren(html).warnungen).includes('nummer-statt-thema'));
});

// ------------------------------------------------------------------ Laufband

test('zwei Laufbänder sind ein Fehler', () => {
  const band = '<div class="marquee"><div class="marquee__spur">Logo</div></div>';
  const { fehler } = seiteAnalysieren(seite(sektion(band), sektion(band)));
  assert.deepEqual(regeln(fehler), ['laufband']);
});

test('ein Laufband mit Unterelementen zählt einmal', () => {
  const band = '<div class="marquee" data-marquee><div class="marquee__spur">Logo</div><div class="marquee__spur">Logo</div></div>';
  assert.equal(seiteAnalysieren(seite(sektion(band))).fehler.length, 0);
});

// ------------------------------------------------------------------ Texte

test('Scrollhinweis als Text wird gemeldet, scroll-padding im CSS nicht', () => {
  const html = seite(sektion('<h1>A</h1><span>Scrollen ↓</span>'))
    .replace('<body>', '<head><style>html{scroll-padding-top:5rem}</style></head><body>');
  const w = regeln(seiteAnalysieren(html).warnungen);
  assert.deepEqual(w.filter((r) => r === 'scrollhinweis'), ['scrollhinweis']);
});

test('zwei Texte für dieselbe Kontaktabsicht werden gemeldet', () => {
  const html = seite(
    sektion('<h1>A</h1><a class="button" href="/kontakt">Jetzt anfragen</a>'),
    sektion('<h2>B</h2><a class="btn btn-primaer" href="/kontakt">Kontakt aufnehmen</a>'),
  );
  const w = seiteAnalysieren(html, { ctaPrimaer: 'Jetzt anfragen' }).warnungen;
  const befund = w.find((b) => b.regel === 'cta-absicht');
  assert.ok(befund);
  assert.match(befund.tipp, /Jetzt anfragen/);
});

test('derselbe CTA-Text mehrfach und ein reiner Navigationslink sind in Ordnung', () => {
  const html = seite(
    sektion('<nav><a href="/kontakt">Kontakt</a></nav><h1>A</h1><a class="button" href="/kontakt">Jetzt anfragen</a>'),
    sektion('<h2>B</h2><a class="button" href="/kontakt">Jetzt anfragen</a>'),
  );
  assert.ok(!regeln(seiteAnalysieren(html).warnungen).includes('cta-absicht'));
});

test('lange Unterzeile im Heldenbereich wird gemeldet', () => {
  const lang = 'Wir sanieren Flachdächer für Gewerbe und Industrie im Großraum Hannover, dokumentiert, termintreu und ohne dass Ihr Betrieb auch nur einen Tag stillstehen muss.';
  const kurz = 'Leckage-Ortung in 48 Stunden, dokumentiert, ohne Betriebsausfall.';
  assert.ok(regeln(seiteAnalysieren(seite(sektion(`<h1>A</h1><p>${lang}</p>`))).warnungen).includes('held-unterzeile'));
  assert.ok(!regeln(seiteAnalysieren(seite(sektion(`<h1>A</h1><p>${kurz}</p>`))).warnungen).includes('held-unterzeile'));
});

// ------------------------------------------------------------------ Quellen

test('overflow-x: hidden wird gemeldet, clip und ein Kommentar nicht', () => {
  assert.deepEqual(regeln(quelleAnalysieren('main { overflow-x: hidden; }')), ['overflow-hidden']);
  assert.deepEqual(quelleAnalysieren('body { overflow-x: clip; }'), []);
  assert.deepEqual(quelleAnalysieren('/* nie overflow-x: hidden, das bricht sticky */'), []);
  assert.deepEqual(quelleAnalysieren('/*\n  overflow-x: hidden bricht sticky\n*/\nbody { overflow-x: clip; }'), []);
});

test('eigener Mauszeiger und Scroll-Listener ohne passive', () => {
  assert.deepEqual(regeln(quelleAnalysieren('.seite { cursor: none; }')), ['mauszeiger']);
  assert.deepEqual(regeln(quelleAnalysieren("window.addEventListener('scroll', aktualisieren);")), ['scroll-listener']);
  assert.deepEqual(quelleAnalysieren("window.addEventListener('scroll', kopf, { passive: true });"), []);
});

test('100vh braucht svh daneben', () => {
  assert.deepEqual(regeln(quelleAnalysieren('.held { min-height: 100vh; }')), ['viewport-hoehe']);
  assert.deepEqual(quelleAnalysieren('.held {\n  min-height: 100vh;\n  min-height: 100svh;\n}'), []);
});

test('Standardserife nur ohne Markenvorgabe', () => {
  const css = "h1 { font-family: 'Fraunces', serif; }";
  assert.deepEqual(regeln(quelleAnalysieren(css)), ['standardserife']);
  assert.deepEqual(quelleAnalysieren(css, { markeText: '{"display":{"familie":"Fraunces"}}' }), []);
  assert.deepEqual(regeln(quelleAnalysieren('@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif");')), ['standardserife']);
});

test('Standardgrotesken der Sperrliste werden ohne Markenvorgabe gemeldet', () => {
  assert.deepEqual(regeln(quelleAnalysieren("body { font-family: 'Inter', sans-serif; }")), ['standardschrift']);
  assert.deepEqual(regeln(quelleAnalysieren("  --schrift-text: 'Plus Jakarta Sans', system-ui;")), ['standardschrift']);
  assert.deepEqual(regeln(quelleAnalysieren("import '@fontsource-variable/montserrat';")), ['standardschrift']);
  assert.deepEqual(regeln(quelleAnalysieren('<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400">')), ['standardschrift']);
});

test('ähnliche Familien und Markenvorgaben bleiben ohne Befund', () => {
  assert.deepEqual(quelleAnalysieren("h1 { font-family: 'Inter Tight', sans-serif; }"), []);
  assert.deepEqual(quelleAnalysieren("h2 { font-family: 'Roboto Slab', serif; }"), []);
  assert.deepEqual(quelleAnalysieren("p { font-family: 'Interstate', sans-serif; }"), []);
  assert.deepEqual(quelleAnalysieren("import '@fontsource/roboto-mono';"), []);
  assert.deepEqual(quelleAnalysieren("body { font-family: 'Inter', sans-serif; }", { markeText: '{"text":{"familie":"inter"},"zielgruppe":"interessenten"}' }), []);
  assert.deepEqual(regeln(quelleAnalysieren("body { font-family: 'Inter', sans-serif; }", { markeText: '{"zielgruppe":"interessenten aus dem internet"}' })), ['standardschrift']);
});

test('die Pille über der Überschrift zählt als Kicker', () => {
  const html = seite(
    sektion('<span class="badge">Neu</span><h1>A</h1>'),
    sektion('<span class="rounded-full px-3 text-xs">Leistungen</span><h2>B</h2>'),
    sektion('<h2>C</h2>'),
  );
  const { fehler } = seiteAnalysieren(html);
  assert.deepEqual(regeln(fehler), ['kicker-quote']);
});

test('ein Badge ohne Überschrift dahinter ist kein Kicker', () => {
  const html = seite(
    sektion('<h1>A</h1><p>Text</p>'),
    sektion('<h2>B</h2><ul><li><span class="badge">Geöffnet</span> Montag</li><li><span class="badge">Geschlossen</span> Sonntag</li></ul>'),
    sektion('<h2>C</h2>'),
  );
  const { fehler } = seiteAnalysieren(html);
  assert.equal(fehler.length, 0);
});

test('Premium-Standardpalette nur ohne Markenvorgabe', () => {
  const css = ':root { --flaeche: #F5F1EA; --akzent: #b08947; }';
  const befund = quelleAnalysieren(css);
  assert.deepEqual(regeln(befund), ['standardpalette']);
  assert.match(befund[0].meldung, /#f5f1ea, #b08947/);
  assert.deepEqual(quelleAnalysieren(css, { markeText: '"#f5f1ea" "#b08947"' }), []);
  assert.deepEqual(quelleAnalysieren(':root { --flaeche: #f5fbf8; }'), []);
});

// ------------------------------------------------------------------ Interface-Regeln (31)

test('Icon-Button ohne Namen ist ein Fehler, mit aria-label oder sr-only-Text nicht', () => {
  const ohne = seite(sektion('<h1>A</h1>\n<button class="menue"><svg aria-hidden="true"><use href="#menue"></use></svg></button>'));
  const { fehler } = bedienungAnalysieren(ohne);
  assert.deepEqual(regeln(fehler), ['name-fehlt']);
  assert.equal(fehler[0].zeile, 2);
  const mitLabel = seite(sektion('<button aria-label="Menü öffnen"><svg aria-hidden="true"></svg></button>'));
  const mitText = seite(sektion('<button><svg aria-hidden="true"></svg><span class="sr-only">Menü öffnen</span></button>'));
  assert.equal(bedienungAnalysieren(mitLabel).fehler.length, 0);
  assert.equal(bedienungAnalysieren(mitText).fehler.length, 0);
});

test('Logolink braucht alt am Bild, ein Sprungziel ohne href ist kein Link', () => {
  const leer = seite('<header><a href="/"><img src="/logo.svg" alt=""></a></header>');
  const benannt = seite('<header><a href="/"><img src="/logo.svg" alt="Dachbau Meier, Startseite"></a></header>');
  const anker = seite(sektion('<a id="leistungen"></a><h2>Leistungen</h2>'));
  assert.deepEqual(regeln(bedienungAnalysieren(leer).fehler), ['name-fehlt']);
  assert.equal(bedienungAnalysieren(benannt).fehler.length, 0);
  assert.equal(bedienungAnalysieren(anker).fehler.length, 0);
});

test('autofocus wird gemeldet, data-autofocus nicht', () => {
  const mit = seite(sektion('<form><input name="suche" type="search" autofocus></form>'));
  const ohne = seite(sektion('<form data-autofocus="aus"><input name="suche" type="search"></form>'));
  assert.deepEqual(regeln(bedienungAnalysieren(mit).warnungen), ['autofocus']);
  assert.deepEqual(bedienungAnalysieren(ohne).warnungen, []);
});

test('Name, E-Mail und Telefon ohne autocomplete, Honigtopf und Nachricht nicht', () => {
  const formular = (felder) => seite(sektion(`<form method="post">${felder}</form>`));
  const fehlt = formular('<input id="email" name="email" type="email"><input name="telefon" type="tel"><input name="name">');
  assert.deepEqual(regeln(bedienungAnalysieren(fehlt).warnungen), ['autocomplete', 'autocomplete', 'autocomplete']);
  const gut = formular([
    '<input name="name" autocomplete="name">',
    '<input name="email" type="email" autocomplete="email">',
    '<input id="webadresse" name="webadresse" type="text" tabindex="-1" autocomplete="off">',
    '<input name="name_hp" type="text" tabindex="-1">',
    '<input type="hidden" name="ts" value="">',
    '<input type="checkbox" name="datenschutz">',
    '<textarea name="nachricht"></textarea>',
  ].join(''));
  assert.deepEqual(bedienungAnalysieren(gut).warnungen, []);
});

test('outline: none an :focus-visible ohne Ersatz ist ein Fehler, mit box-shadow nicht', () => {
  const ohne = quelleAnalysieren('.knopf:focus-visible {\n  outline: none;\n}');
  assert.deepEqual(regeln(ohne), ['fokus-entfernt']);
  assert.equal(ohne[0].stufe, 'fehler');
  assert.equal(ohne[0].zeile, 2);
  assert.deepEqual(quelleAnalysieren('.knopf:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--farbe-fokus); }'), []);
});

test('outline: none ohne Fokusregel warnt, :focus:not(:focus-visible) und eine Fokusregel in der Datei nicht', () => {
  const ohne = quelleAnalysieren('button { outline: 0; }');
  assert.deepEqual(regeln(ohne), ['fokus-entfernt']);
  assert.equal(ohne[0].stufe, 'warnung');
  assert.deepEqual(quelleAnalysieren(':focus:not(:focus-visible) { outline: none; }'), []);
  assert.deepEqual(quelleAnalysieren('button { outline: none; }\n:focus-visible { outline: 3px solid var(--farbe-fokus); }'), []);
  assert.deepEqual(quelleAnalysieren('/* outline: none ist verboten */\na { outline-offset: 3px; }'), []);
});

test('Tailwind outline-none braucht einen focus-visible-Ersatz im selben class-Attribut', () => {
  const fehler = quelleAnalysieren('<button class="rounded focus-visible:outline-none">Senden</button>');
  assert.equal(fehler[0].stufe, 'fehler');
  assert.equal(quelleAnalysieren('<a class="outline-none" href="/">Start</a>')[0].stufe, 'warnung');
  assert.deepEqual(quelleAnalysieren('<button className="outline-none focus-visible:ring-2 focus-visible:ring-offset-2">Senden</button>'), []);
});

test('transition: all und transition ohne Eigenschaft warnen, benannte Eigenschaften nicht', () => {
  assert.deepEqual(regeln(quelleAnalysieren('.karte { transition: all 0.3s ease; }')), ['transition-all']);
  assert.deepEqual(regeln(quelleAnalysieren('.karte { transition: .3s; }')), ['transition-all']);
  assert.deepEqual(regeln(quelleAnalysieren('<div class="motion-safe:transition-all duration-300">')), ['transition-all']);
  assert.deepEqual(quelleAnalysieren('.karte { transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s; }'), []);
  assert.deepEqual(quelleAnalysieren('* { transition: none !important }'), []);
  assert.deepEqual(quelleAnalysieren('<div class="transition-colors duration-200">'), []);
  assert.deepEqual(quelleAnalysieren('<main transition:animate="fade">'), []);
});

test('Einfügen gesperrt wird gemeldet, ein paste-Listener ohne Sperre nicht', () => {
  assert.deepEqual(regeln(quelleAnalysieren('<input name="email2" onpaste="return false">')), ['einfuegen-gesperrt']);
  assert.deepEqual(regeln(quelleAnalysieren("feld.addEventListener('paste', (e) => e.preventDefault());")), ['einfuegen-gesperrt']);
  assert.deepEqual(quelleAnalysieren("feld.addEventListener('paste', () => pruefen(feld));"), []);
});

// ------------------------------------------------------------------ Aufruf

test('Aufruf: Fehler ergibt Exit 1, Warnungen nur mit --strict', () => {
  const ordner = mkdtempSync(join(tmpdir(), 'geschmack-'));
  try {
    const dist = join(ordner, 'dist');
    mkdirSync(dist);
    const band = sektion('<div class="laufband">Logo</div>');
    writeFileSync(join(dist, 'index.html'), seite(band, band));
    writeFileSync(join(dist, 'impressum.html'), seite(sektion('<h1>Impressum</h1><span>Scrollen</span>')));

    const alles = spawnSync(process.execPath, [SKRIPT, 'dist'], { cwd: ordner, encoding: 'utf8' });
    assert.equal(alles.status, 1, alles.stdout);
    assert.match(alles.stdout, /\[laufband\]/);

    rmSync(join(dist, 'index.html'));
    const nurWarnung = spawnSync(process.execPath, [SKRIPT, 'dist'], { cwd: ordner, encoding: 'utf8' });
    assert.equal(nurWarnung.status, 0, nurWarnung.stdout);
    const streng = spawnSync(process.execPath, [SKRIPT, 'dist', '--strict'], { cwd: ordner, encoding: 'utf8' });
    assert.equal(streng.status, 1, streng.stdout);

    writeFileSync(join(dist, 'kontakt.html'), seite(sektion('<h1>Kontakt</h1>\n<button><svg></svg></button>')));
    const ohneName = spawnSync(process.execPath, [SKRIPT, 'dist'], { cwd: ordner, encoding: 'utf8' });
    assert.equal(ohneName.status, 1, ohneName.stdout);
    assert.match(ohneName.stdout, /kontakt\.html:2 +\[name-fehlt\]/);
    rmSync(join(dist, 'kontakt.html'));

    const leer = spawnSync(process.execPath, [SKRIPT], { cwd: join(ordner, 'dist'), encoding: 'utf8' });
    assert.equal(leer.status, 2);
  } finally {
    rmSync(ordner, { recursive: true, force: true });
  }
});

// ------------------------------------------------------------------ 4.18: Paket Webdesign Workflow 2026

test('Logoleiste aus getippten Namen ist eine Warnung, mit Bildern nicht', () => {
  const getippt = seite(sektion('<h1>Dach</h1><ul class="kunden-leiste"><li>Müller GmbH</li><li>Schmidt AG</li><li>Bau KG</li></ul>'));
  assert.ok(regeln(seiteAnalysieren(getippt).warnungen).includes('logoleiste-text'));
  const echt = seite(sektion('<h1>Dach</h1><ul class="logos"><li><img src="a.svg" alt="Müller GmbH"></li><li><img src="b.svg" alt="Schmidt AG"></li><li><img src="c.svg" alt="Bau KG"></li></ul>'));
  assert.ok(!regeln(seiteAnalysieren(echt).warnungen).includes('logoleiste-text'));
});

test('kursives Akzentwort in der Überschrift, ganze kursive Überschrift nicht', () => {
  const akzent = seite(sektion('<h1>Dächer, die <em>bleiben</em></h1>'));
  assert.ok(regeln(seiteAnalysieren(akzent).warnungen).includes('akzentwort'));
  const ganz = seite(sektion('<h1><em>Dächer, die bleiben</em></h1>'));
  assert.ok(!regeln(seiteAnalysieren(ganz).warnungen).includes('akzentwort'));
});

test('Violettverlauf in CSS und Tailwind, mit Markenvorgabe still', () => {
  assert.ok(regeln(quelleAnalysieren('.held { background: linear-gradient(90deg, #6366f1, #a855f7); }')).includes('violettverlauf'));
  assert.ok(regeln(quelleAnalysieren('<div class="bg-gradient-to-r from-violet-500 to-white">')).includes('violettverlauf'));
  assert.ok(!regeln(quelleAnalysieren('.held { background: linear-gradient(90deg, #6366f1, #fff); }', { markeText: '"akzent": "#6366f1"' })).includes('violettverlauf'));
  assert.ok(!regeln(quelleAnalysieren('.held { color: #6366f1; }')).includes('violettverlauf'));
});

test('Glas an vier Stellen ist eine Warnung, auf der Kopfleiste allein nicht', () => {
  const vier = ['.a', '.b', '.c', '.d'].map((k) => `${k} { backdrop-filter: blur(8px); }`).join('\n');
  assert.ok(regeln(quelleAnalysieren(vier)).includes('glasflaechen'));
  assert.ok(!regeln(quelleAnalysieren('.kopf { position: sticky; backdrop-filter: blur(8px); }')).includes('glasflaechen'));
});
