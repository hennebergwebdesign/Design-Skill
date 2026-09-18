#!/usr/bin/env node
/*
  referenz-crawl.mjs — erfasst eine freigegebene Designreferenz. Und nur eine freigegebene.

  WARUM ES DIESES SKRIPT GIBT
  design-scan.mjs ruft jede Adresse ab, die man ihm gibt. Das ist für einen Einzelblick
  richtig und für eine systematische Referenzrecherche falsch: sobald es einen kurzen Weg um
  die Freigabe herum gibt, wird er genommen. Dieses Skript hat keinen. Es liest den Zustand
  aus dem Register und bricht mit Exit 2 ab, wenn er nicht FREIGEGEBEN lautet.

  Die Freigabe ist damit kein Satz in einer Referenzdatei, sondern eine Bedingung im Code.

  WAS ERFASST WIRD
    roh/seite.html           das HTML, so wie es die erfolgreiche Abrufstufe geliefert hat
    roh/seite.md             Markdown, wenn die Stufe es liefert (Firecrawl)
    roh/screenshot.png       nur mit --screenshot und nur, wenn eine Stufe es kann
    roh/<breite>.html        je Breakpoint, nur über Playwright
    roh/<breite>.png         je Breakpoint, nur mit --screenshot
    meta.json                Abrufart, Zeit, Status, Grenzen, Analyseumfang

  TEILFREIGABE, ehrlich benannt
  Eine Freigabe nur für eine Sektion beschränkt die ANALYSE, nicht den technischen Abruf: eine
  einzelne Sektion lässt sich bei einer fremden Seite nicht getrennt anfordern, geliefert wird
  immer das ganze Dokument. Der freigegebene Umfang steht deshalb in meta.json unter
  `analyse_umfang`, und design-dna.mjs wertet nur diesen aus.

  ABGELEGT WIRD IN .designrecherche/referenzen/<id>/
  Projektwissen. Gehoert in die .gitignore des Kundenprojekts, nie in die ausgelieferte Seite
  und nie in die globale Musterbibliothek. Siehe
  `skills/agentur-website-builder/references/designrecherche-ablauf.md`.

  AUFRUF
    node scripts/referenz-crawl.mjs --id ref-01-beispiel-de
    node scripts/referenz-crawl.mjs --alle
    node scripts/referenz-crawl.mjs --id ref-01-beispiel-de --breakpoints 375,768,1440 --screenshot
    node scripts/referenz-crawl.mjs --id ref-01-beispiel-de --ohne-robots     nur mit Erlaubnis

  EXIT
    0 = erfasst · 1 = nichts zu erfassen oder Seite nicht erreichbar · 2 = Aufrufproblem oder
    fehlende Freigabe
*/

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { abrufen, AbrufFehler } from './lib/abruf.mjs';
import { registerLesen, registerSchreiben, finden, uebergang } from './referenz-register.mjs';

const args = process.argv.slice(2);
const wert = (name, standard = null) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : standard;
};
const dabei = (name) => args.includes(name);

const PFAD = wert('--register', join('.designrecherche', 'register.json'));
const WURZEL = wert('--ablage', join('.designrecherche', 'referenzen'));
const BREAKPOINTS = (wert('--breakpoints', '') || '')
  .split(',')
  .map((b) => Number(b.trim()))
  .filter((b) => Number.isFinite(b) && b > 0);

const raus = (text, code) => {
  (code ? console.error : console.log)(text);
  process.exit(code);
};

let register;
try {
  register = registerLesen(PFAD);
} catch (f) {
  raus(f.message, 2);
}

let ziele;
if (dabei('--alle')) {
  ziele = register.referenzen.filter((r) => r.zustand === 'FREIGEGEBEN');
  if (!ziele.length) raus('Kein Eintrag im Zustand FREIGEGEBEN. Erst vorlegen und freigeben lassen.', 1);
} else {
  const id = wert('--id');
  if (!id) raus('Aufruf: node scripts/referenz-crawl.mjs --id <kennung> | --alle', 2);
  const eintrag = finden(register, id);
  if (!eintrag) raus(`Kein Eintrag mit der Kennung ${id} im Register ${PFAD}.`, 1);
  if (eintrag.zustand !== 'FREIGEGEBEN') {
    raus(
      `${id} steht auf ${eintrag.zustand}, nicht auf FREIGEGEBEN. Es wird nichts abgerufen.\n` +
        'Erst vorlegen und freigeben lassen:\n' +
        `  node scripts/referenz-register.mjs vorlegen --id ${id}\n` +
        `  node scripts/referenz-register.mjs freigeben --id ${id} [--sektionen …]`,
      2
    );
  }
  ziele = [eintrag];
}

const schreiben = (pfad, inhalt) => {
  mkdirSync(join(pfad, '..'), { recursive: true });
  writeFileSync(pfad, inhalt);
};

let erfasst = 0;
let gescheitert = 0;

for (const eintrag of ziele) {
  const ordner = join(WURZEL, eintrag.id);
  const roh = join(ordner, 'roh');
  console.log(`\nErfasse ${eintrag.id}: ${eintrag.url}`);

  let ergebnis;
  try {
    ergebnis = await abrufen(eintrag.url, {
      screenshot: dabei('--screenshot'),
      breakpoints: BREAKPOINTS,
      robots: !dabei('--ohne-robots'),
    });
  } catch (f) {
    gescheitert += 1;
    const grund = f instanceof AbrufFehler ? `${f.art}: ${f.message}` : f.message;
    console.error(`  nicht erfasst. ${grund}`);
    console.error('  Der Zustand bleibt FREIGEGEBEN. Referenz ersetzen oder später erneut versuchen.');
    console.error('  Nicht aus der Erinnerung beschreiben, siehe designrecherche-ablauf.md.');
    continue;
  }

  mkdirSync(roh, { recursive: true });
  schreiben(join(roh, 'seite.html'), ergebnis.html);
  if (ergebnis.markdown) schreiben(join(roh, 'seite.md'), ergebnis.markdown);
  if (ergebnis.screenshot) {
    const daten = ergebnis.screenshot.startsWith('http')
      ? null
      : Buffer.from(ergebnis.screenshot.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    if (daten) schreiben(join(roh, 'screenshot.png'), daten);
    else schreiben(join(roh, 'screenshot-url.txt'), `${ergebnis.screenshot}\n`);
  }
  for (const bp of ergebnis.breakpoints ?? []) {
    if (bp.html) schreiben(join(roh, `${bp.breite}.html`), bp.html);
    if (bp.screenshot) schreiben(join(roh, `${bp.breite}.png`), Buffer.from(bp.screenshot, 'base64'));
  }

  const freigabe = eintrag.freigabe ?? { umfang: 'website', sektionen: [], komponenten: [] };
  const meta = {
    referenz: eintrag.id,
    adresse: ergebnis.adresse,
    erfasst: new Date().toISOString(),
    abrufart: ergebnis.quelle,
    status: ergebnis.status,
    breakpoints_erfasst: (ergebnis.breakpoints ?? []).map((b) => b.breite),
    breakpoints_angefragt: BREAKPOINTS,
    screenshot: Boolean(ergebnis.screenshot),
    analyse_umfang: {
      umfang: freigabe.umfang,
      sektionen: freigabe.sektionen ?? [],
      komponenten: freigabe.komponenten ?? [],
      $hinweis:
        freigabe.umfang === 'teilweise'
          ? 'Nur diese Teile sind freigegeben. Das Dokument wurde technisch ganz geladen, weil eine Sektion nicht getrennt angefordert werden kann. Ausgewertet wird nur der freigegebene Teil.'
          : 'ganze Website freigegeben',
    },
    grenzen: ergebnis.grenzen,
    $grenzen_hinweis:
      'Was hier steht, konnte nicht erfasst werden und wird in der Design DNA als unbekannt geführt, nicht geschätzt.',
  };
  schreiben(join(ordner, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);

  try {
    uebergang(eintrag, 'GECRAWLT', ergebnis.quelle);
    eintrag.roh = roh;
  } catch (f) {
    raus(f.message, 2);
  }
  erfasst += 1;

  console.log(`  ${ergebnis.quelle}, Status ${ergebnis.status}, abgelegt in ${ordner}/`);
  if (meta.breakpoints_erfasst.length) console.log(`  Breakpoints: ${meta.breakpoints_erfasst.join(', ')}`);
  for (const g of ergebnis.grenzen) console.log(`  Grenze: ${g}`);
}

if (erfasst) registerSchreiben(PFAD, register);

console.log(`\n${erfasst} erfasst, ${gescheitert} nicht erfasst.`);
if (erfasst) {
  console.log(`${WURZEL}/ in die .gitignore des Kundenprojekts eintragen. Es enthält fremdes Material.`);
}
process.exit(erfasst ? 0 : 1);
