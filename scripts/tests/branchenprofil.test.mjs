/*
  branchenprofil.test.mjs — prüft die Branchenprofile und das Abrufskript.

  Der wichtigste Test ist der gegen die eigenen Sperren: ein Profil darf keine Schrift
  empfehlen, die die harte Grenze verbietet, und keinen Gedankenstrich enthalten. Sonst
  baut der Erstentwurf den Fehler ein, den der Skill sonst verhindert.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { laden, finde, alsText, alsMarke, DATEI } from '../branchenprofil.mjs';

const SKRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'branchenprofil.mjs');
const daten = laden();
const profile = Object.entries(daten.branchen);

const PFLICHT = ['name', 'aliasse', 'typ', 'richtung', 'hauptaktion', 'regler', 'farbwelt', 'schrift', 'bildwelt', 'held', 'sektionen', 'landing', 'belege', 'verboten', 'referenzen'];
const GESPERRT = ['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Lato', 'Plus Jakarta'];

test('jedes Profil hat alle Pflichtfelder', () => {
  for (const [k, p] of profile) for (const f of PFLICHT) assert.ok(p[f] !== undefined, `${k}: Feld ${f} fehlt`);
});

test('Regler liegen zwischen 1 und 10', () => {
  for (const [k, p] of profile) for (const r of ['varianz', 'bewegung', 'dichte']) {
    assert.ok(Number.isInteger(p.regler[r]) && p.regler[r] >= 1 && p.regler[r] <= 10, `${k}: ${r}`);
  }
});

test('Bewegung über 4 nur dort, wo die Richtung es trägt', () => {
  for (const [k, p] of profile) {
    if (p.regler.bewegung > 6) assert.match(p.richtung, /Editorial|Signatur|Wow/, `${k}: Bewegung ${p.regler.bewegung} ohne ausdrucksstarke Richtung`);
  }
});

test('kein Profil empfiehlt eine gesperrte Schrift als Vorschlag', () => {
  for (const [k, p] of profile) {
    const vorschlag = (p.schrift.split('Vorschlag:')[1] || '');
    for (const s of GESPERRT) assert.ok(!vorschlag.includes(s), `${k} schlägt ${s} vor`);
  }
});

test('keine Gedankenstriche und keine Bindestriche mit Leerzeichen im Profiltext', () => {
  const text = readFileSync(DATEI, 'utf8');
  assert.ok(!/[–—]/.test(text), 'Gedankenstrich gefunden');
  assert.ok(!/ - /.test(text.replace(/"\$kommentar"[\s\S]*?\],/, '')), 'Bindestrich mit Leerzeichen gefunden');
});

test('Sektionsfolgen beginnen mit dem Held und enden mit dem Fuß oder dem Abschluss', () => {
  for (const [k, p] of profile) {
    assert.match(p.sektionen[0], /^held/, `${k}: Startseite beginnt nicht mit dem Held`);
    assert.match(p.landing[0], /^held/, `${k}: Landingpage beginnt nicht mit dem Held`);
  }
});

test('Suche findet über Suchwort, Umlaut und Teiltreffer', () => {
  assert.equal(finde(daten, 'Dachdecker'), 'dach-bau');
  assert.equal(finde(daten, 'Bäckerei'), 'gastro');
  assert.equal(finde(daten, 'Steuerberater'), 'kanzlei-beratung');
  assert.equal(finde(daten, 'zahnarzt'), 'praxis-gesundheit');
  assert.equal(finde(daten, 'gastro'), 'gastro');
  assert.equal(finde(daten, 'raumschiffbau'), null);
});

test('Textausgabe nennt Vorrang der Marke und bleibt kurz', () => {
  const t = alsText(daten, 'sanitaer-heizung');
  assert.match(t, /Marke des Kunden schlägt/);
  assert.ok(t.length < 3500, `Ausgabe zu lang: ${t.length} Zeichen`);
});

test('Landingpage gibt die Landingfolge aus', () => {
  assert.match(alsText(daten, 'gastro', true), /Folge Landingpage: held > angebot/);
  assert.match(alsText(daten, 'gastro', false), /Folge Startseite: held > karte/);
});

test('marke.json Block enthält Regler und eine offene Lesart', () => {
  const m = alsMarke(daten, 'tischler-manufaktur');
  assert.equal(m.gestaltung.regler.varianz, 7);
  assert.match(m.gestaltung.lesart, /\[\[FEHLT/);
});

test('Referenzen verweisen nur auf Namen, die im Register der freigegebenen stehen', () => {
  const quelle = readFileSync(join(dirname(DATEI), '..', '..', 'agentur-website-builder', 'references', 'referenzen-und-auswahl.md'), 'utf8').toLowerCase();
  const stichwort = { 'comrade': 'comradeweb', 'hook-agency': 'hookagency', 'mdcc': 'mdccinc', 'epple': 'vs-epple', 'driessen': 'driessenarchitectuur', 'teif-moreaux': 'teifmoreaux', 'silicon-hills': 'siliconhillstalent', 'pennywise': 'pennywise', 'flo-corp': 'flo-corp', 'electric-car-scheme': 'electriccarscheme' };
  for (const [k, p] of profile) for (const r of p.referenzen) {
    assert.ok(stichwort[r], `${k}: unbekannter Verweis ${r}`);
    assert.ok(quelle.includes(stichwort[r]), `${k}: ${r} steht nicht in referenzen-und-auswahl.md`);
  }
});

test('Aufruf: Treffer Exit 0, unbekannt Exit 2, ohne Argument Exit 2 mit Liste', () => {
  const ok = spawnSync(process.execPath, [SKRIPT, 'dachdecker'], { encoding: 'utf8' });
  assert.equal(ok.status, 0);
  assert.match(ok.stdout, /Branchenprofil: Dachdecker/);
  const nein = spawnSync(process.execPath, [SKRIPT, 'raumschiffbau'], { encoding: 'utf8' });
  assert.equal(nein.status, 2);
  const leer = spawnSync(process.execPath, [SKRIPT], { encoding: 'utf8' });
  assert.equal(leer.status, 2);
  const liste = spawnSync(process.execPath, [SKRIPT, 'liste'], { encoding: 'utf8' });
  assert.equal(liste.status, 0);
  assert.match(liste.stdout, /gastro/);
});
