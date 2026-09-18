/*
  dna-konfidenz.test.mjs — prüft, dass die Design DNA nichts behauptet, was sie nicht gesehen hat.

      node --test 'scripts/tests/*.test.mjs'

  Der Kern der ganzen Analyse ist eine einzige Eigenschaft: kein Wert ohne Beleg, und ein
  nicht erfassbarer Wert bleibt null statt geschätzt zu werden. Genau das steht hier.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { dnaBauen, sektionen, komponenten, medienabfragen, inlineCss, unbekannteFelder, BELEG } from '../design-dna.mjs';

const META = {
  referenz: 'ref-01-test',
  adresse: 'https://beispiel.de/',
  abrufart: 'Direktabruf',
  breakpoints_erfasst: [],
  analyse_umfang: { umfang: 'website', sektionen: [], komponenten: [] },
  grenzen: ['kein Screenshot über Direktabruf'],
};

const SEITE = `<!doctype html><html lang="de"><head><title>T</title>
<style>@media (min-width:768px){.a{display:flex}} .w{max-width:1200px} .g{grid-template-columns:2fr 1fr}
h1{font-family:"Outfit",sans-serif;color:#0F172A} .s{position:sticky;top:0}</style></head>
<body><nav></nav><h1>Held</h1><p>Eins zwei drei</p><img src="/a.jpg" alt="a">
<h2>Produkte</h2><p>Vier fünf</p><details><summary>F</summary></details><form></form></body></html>`;

const MIT_EXTERNEM_CSS = SEITE.replace('<style>', '<link rel="stylesheet" href="/s.css"><style>');

// ---------------------------------------------------------------- Bausteine

test('die Sektionsfolge kommt aus der Überschriftenhierarchie', () => {
  const s = sektionen(SEITE);
  assert.deepEqual(s.map((a) => a.ueberschrift), ['Held', 'Produkte']);
  assert.equal(s[0].ebene, 1);
  assert.ok(s[0].woerter > 0, 'Wortzahl je Abschnitt wird gezählt');
  assert.equal(s[0].bilder, 1);
});

test('Komponenten werden gezählt, nicht vermutet', () => {
  const k = komponenten(SEITE);
  assert.equal(k.navigation, 1);
  assert.equal(k.formular, 1);
  assert.equal(k.akkordeon, 1);
  assert.equal(k.video, undefined, 'was nicht vorkommt, taucht nicht auf');
});

test('Medienabfragen werden aus dem Inline-CSS gelesen und rem umgerechnet', () => {
  assert.deepEqual(medienabfragen(inlineCss(SEITE)), [768]);
  assert.deepEqual(medienabfragen('@media (min-width: 48rem){}'), [768]);
});

// ------------------------------------------------------------------- Belege

test('jeder Wert der DNA trägt einen Beleg aus der erlaubten Menge', () => {
  const dna = dnaBauen(SEITE, META);
  const pruefe = (knoten, pfad = '') => {
    for (const [schluessel, inhalt] of Object.entries(knoten)) {
      if (!inhalt || typeof inhalt !== 'object' || Array.isArray(inhalt)) continue;
      const voll = pfad ? `${pfad}.${schluessel}` : schluessel;
      if ('beleg' in inhalt) {
        assert.ok(Object.values(BELEG).includes(inhalt.beleg), `${voll} hat einen unbekannten Beleg`);
      } else {
        pruefe(inhalt, voll);
      }
    }
  };
  pruefe({ struktur: dna.struktur, layout: dna.layout, typografie: dna.typografie, farbe: dna.farbe, interaktion: dna.interaktion });
});

test('ein unbekannter Wert ist null und trägt einen Grund', () => {
  const dna = dnaBauen(SEITE, META);
  assert.equal(dna.layout.spacing_skala.beleg, BELEG.unbekannt);
  assert.equal(dna.layout.spacing_skala.wert, null, 'unbekannt heißt null, nicht geschätzt');
  assert.ok(dna.layout.spacing_skala.quelle.length > 10, 'der Grund steht im Klartext daneben');
  assert.equal(dna.typografie.groessenverhaeltnisse.wert, null);
  assert.equal(dna.farbe.kontrastverhaeltnisse.wert, null);
  assert.equal(dna.interaktion.hover_verhalten.wert, null);
});

test('mit externem Stylesheet werden CSS-Werte unbekannt statt halb beobachtet', () => {
  const ohne = dnaBauen(SEITE, META);
  const mit = dnaBauen(MIT_EXTERNEM_CSS, META);
  assert.equal(ohne.layout.containerbreite.beleg, BELEG.beobachtet);
  assert.equal(ohne.layout.containerbreite.wert, '1200px');
  assert.equal(mit.layout.containerbreite.beleg, BELEG.unbekannt);
  assert.equal(mit.layout.containerbreite.wert, null);
  assert.match(mit.layout.containerbreite.quelle, /externe Stylesheets/);
});

test('ohne Breakpoint-Erfassung bleibt das responsive Verhalten unbekannt', () => {
  const dna = dnaBauen(SEITE, META);
  assert.equal(dna.responsiv.$hinweis.beleg, BELEG.unbekannt);
  assert.ok(unbekannteFelder(dna).some((o) => o.feld.startsWith('responsiv')));
});

test('mit Breakpoint-Erfassung wird das responsive Verhalten beobachtet', () => {
  const dna = dnaBauen(SEITE, { ...META, breakpoints_erfasst: [375, 1440] }, [
    { breite: 375, html: SEITE },
    { breite: 1440, html: SEITE },
  ]);
  assert.equal(dna.responsiv[375].sektionen.beleg, BELEG.beobachtet);
  assert.equal(dna.responsiv[1440].navigation.wert, 1);
});

test('die DNA benennt keine Prinzipien, das bleibt dem Menschen', () => {
  const dna = dnaBauen(SEITE, META);
  assert.deepEqual(dna.prinzipien, []);
  assert.match(dna.$prinzipien_hinweis, /bewertet nicht/i);
});

test('die Grenzen des Abrufs wandern in die DNA und gehen nicht verloren', () => {
  const dna = dnaBauen(SEITE, META);
  assert.deepEqual(dna.grundlage.grenzen_aus_dem_abruf, META.grenzen);
  assert.deepEqual(dna.grundlage.analyse_umfang, META.analyse_umfang);
});

test('Farb- und Schriftkandidaten sind als Kandidaten gekennzeichnet, nicht als Token', () => {
  const dna = dnaBauen(SEITE, META);
  assert.match(dna.farbe.$hinweis, /nie die Werte/);
  assert.match(dna.typografie.$hinweis, /nie Tokenwerte/);
  assert.ok(dna.farbe.kandidaten.wert.includes('#0F172A'));
});

test('ein Dokument ohne Überschriften liefert unbekannt statt einer leeren Behauptung', () => {
  const dna = dnaBauen('<html><body><div>nur Text</div></body></html>', META);
  assert.equal(dna.struktur.sektionsfolge.beleg, BELEG.unbekannt);
  assert.equal(dna.struktur.bild_text_verhaeltnis.wert, null);
});
