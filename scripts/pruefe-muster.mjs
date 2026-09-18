#!/usr/bin/env node
/*
  pruefe-muster.mjs — prüft die Musterbibliothek und erzeugt ihren Index.

  WARUM ES DIESES SKRIPT GIBT
  Die Regel aus der Repo-CLAUDE.md heißt: jede harte Grenze braucht eine Prüfung, sonst ist
  sie eine Checkbox. Die Musterbibliothek bringt drei harte Grenzen mit, die sich prüfen
  lassen, und genau die prüft dieses Skript:

    1. Kein Muster ohne Quelle und ohne Konfidenz. Ein Prinzip ohne Herkunft ist eine
       Behauptung, siehe die Regel gegen erfundene Belege.
    2. Kein Muster mit fremdem Material. Kein fremdes Bild, kein langer wörtlicher Fremdtext,
       kein fremder Markenname als Inhalt. Die Bibliothek beschreibt Prinzipien, sie lagert
       keine Kopien, siehe agentur-website-builder/references/referenzen-und-auswahl.md.
    3. Keine Taxonomie nach Gefühl. Kategorie, Stil, Konfidenz, Komplexität und Freigabe
       kommen aus taxonomie.json, nicht aus der Eingebung beim Schreiben.

  ZUSÄTZLICH
  Mit --index wird index.json aus den Frontmattern neu erzeugt. Der Index ist abgeleitet und
  wird nie von Hand gepflegt: eine zweite Wahrheit veraltet.

  AUFRUF
    node scripts/pruefe-muster.mjs                       prüft alle Muster
    node scripts/pruefe-muster.mjs --index               prüft und schreibt index.json
    node scripts/pruefe-muster.mjs --pfad <ordner>       andere Bibliothek, etwa im Test

  EXIT
    0 = sauber · 1 = Befunde · 2 = Aufrufproblem
*/

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PFLICHTFELDER = [
  'id',
  'name',
  'kategorie',
  'sektionstyp',
  'tags',
  'stil',
  'ux_zweck',
  'conversion_zweck',
  'responsiv',
  'komplexitaet',
  'barrierefreiheit',
  'quelle_url',
  'quelle_erfasst',
  'konfidenz',
  'freigabe',
  'aufgenommen',
];

export const PFLICHTABSCHNITTE = [
  '## Prinzip',
  '## Warum es wirkt',
  '## Belege',
  '## Umsetzung',
  '## Was nicht übernommen wird',
];

/**
 * Bewusst winziger Frontmatter-Leser: flache Schlüssel, Zeichenketten und Inline-Listen.
 * Mehr braucht ein Muster nicht, und ein halber YAML-Parser ohne Abhängigkeit wäre eine
 * Fehlerquelle ohne Gegenwert. Verschachtelung ist deshalb nicht erlaubt, nicht vergessen.
 */
export function frontmatterLesen(text) {
  const treffer = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!treffer) return { kopf: null, koerper: text, fehler: 'Kein Frontmatter zwischen --- gefunden' };
  const kopf = {};
  for (const zeile of treffer[1].split(/\r?\n/)) {
    if (!zeile.trim() || zeile.trimStart().startsWith('#')) continue;
    const doppelpunkt = zeile.indexOf(':');
    if (doppelpunkt < 0) return { kopf: null, koerper: treffer[2], fehler: `Zeile ohne Doppelpunkt: ${zeile}` };
    const schluessel = zeile.slice(0, doppelpunkt).trim();
    let wert = zeile.slice(doppelpunkt + 1).trim();
    if (wert.startsWith('[') && wert.endsWith(']')) {
      kopf[schluessel] = wert
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      kopf[schluessel] = wert.replace(/^["']|["']$/g, '');
    }
  }
  return { kopf, koerper: treffer[2], fehler: null };
}

// Fremdes Bildmaterial: eine absolute Adresse auf eine Bilddatei hat in einem Muster nichts
// verloren. Ein Muster beschreibt ein Prinzip, es zeigt kein fremdes Foto.
const FREMDBILD = /https?:\/\/[^\s)"']+\.(?:png|jpe?g|webp|avif|gif|svg)/i;
// Ein wörtliches Zitat von mehr als 200 Zeichen ist keine Prinzipbeschreibung mehr.
const LANGES_ZITAT = /^>\s?(.{200,})$/m;

export function musterPruefen(datei, inhalt, taxonomie, bekannteIds = []) {
  const befunde = [];
  const melde = (art, text) => befunde.push({ datei: basename(datei), art, text });

  const { kopf, koerper, fehler } = frontmatterLesen(inhalt);
  if (fehler || !kopf) {
    melde('fehler', fehler ?? 'Frontmatter nicht lesbar');
    return { befunde, kopf: null };
  }

  for (const feld of PFLICHTFELDER) {
    if (kopf[feld] === undefined || kopf[feld] === '' || (Array.isArray(kopf[feld]) && !kopf[feld].length)) {
      melde('fehler', `Pflichtfeld fehlt oder ist leer: ${feld}`);
    }
  }

  const erwarteteId = basename(datei).replace(/\.md$/, '');
  if (kopf.id && kopf.id !== erwarteteId) {
    melde('fehler', `id "${kopf.id}" passt nicht zum Dateinamen "${erwarteteId}"`);
  }

  const inTaxonomie = (feld, wert, topf) => {
    if (wert === undefined) return;
    if (!Object.prototype.hasOwnProperty.call(taxonomie[topf], wert)) {
      melde('fehler', `${feld} "${wert}" steht nicht in taxonomie.json unter ${topf}`);
    }
  };
  inTaxonomie('kategorie', kopf.kategorie, 'kategorien');
  inTaxonomie('konfidenz', kopf.konfidenz, 'konfidenz');
  inTaxonomie('komplexitaet', kopf.komplexitaet, 'komplexitaet');
  inTaxonomie('freigabe', kopf.freigabe, 'freigabe');
  for (const s of kopf.stil ?? []) inTaxonomie('stil', s, 'stil');
  for (const s of kopf.sektionstyp ?? []) inTaxonomie('sektionstyp', s, 'kategorien');

  for (const verwandt of kopf.verwandt ?? []) {
    if (bekannteIds.length && !bekannteIds.includes(verwandt)) {
      melde('warnung', `verwandt verweist auf ein unbekanntes Muster: ${verwandt}`);
    }
  }

  for (const abschnitt of PFLICHTABSCHNITTE) {
    if (!koerper.includes(abschnitt)) melde('fehler', `Abschnitt fehlt: ${abschnitt}`);
  }

  if (!/\b(beobachtet|abgeleitet|unbekannt)\b/i.test(koerper)) {
    melde('fehler', 'Kein einziger Beleg markiert. Jede Aussage braucht beobachtet, abgeleitet oder unbekannt');
  }

  const bild = koerper.match(FREMDBILD);
  if (bild) melde('fehler', `Fremdes Bildmaterial verlinkt: ${bild[0]}`);

  const zitat = koerper.match(LANGES_ZITAT);
  if (zitat) melde('fehler', `Woertliches Zitat von ${zitat[1].length} Zeichen. Prinzip beschreiben statt zitieren`);

  if (kopf.quelle_url && !/^https?:\/\//.test(kopf.quelle_url) && kopf.quelle_url !== 'intern') {
    melde('warnung', `quelle_url sieht nicht wie eine Adresse aus: ${kopf.quelle_url}`);
  }

  return { befunde, kopf };
}

export function bibliothekLesen(ordner) {
  const musterOrdner = join(ordner, 'muster');
  if (!existsSync(musterOrdner)) throw new Error(`Kein Ordner muster/ unter ${ordner}`);
  const taxonomiePfad = join(ordner, 'taxonomie.json');
  if (!existsSync(taxonomiePfad)) throw new Error(`taxonomie.json fehlt unter ${ordner}`);
  const taxonomie = JSON.parse(readFileSync(taxonomiePfad, 'utf8'));
  const dateien = readdirSync(musterOrdner)
    .filter((d) => d.endsWith('.md'))
    .sort()
    .map((d) => join(musterOrdner, d));
  return { taxonomie, dateien };
}

export function indexBauen(koepfe) {
  return {
    $kommentar: [
      'Erzeugt von scripts/pruefe-muster.mjs --index. Nicht von Hand pflegen.',
      'Die Wahrheit steht in muster/<id>.md, das hier ist die durchsuchbare Ableitung.',
    ],
    schema: 1,
    erzeugt: new Date().toISOString().slice(0, 10),
    anzahl: koepfe.length,
    muster: koepfe.map((k) => ({
      id: k.id,
      name: k.name,
      kategorie: k.kategorie,
      sektionstyp: k.sektionstyp ?? [],
      tags: k.tags ?? [],
      stil: k.stil ?? [],
      branchenbezug: k.branchenbezug ?? [],
      ux_zweck: k.ux_zweck,
      conversion_zweck: k.conversion_zweck,
      komplexitaet: k.komplexitaet,
      responsiv: k.responsiv,
      barrierefreiheit: k.barrierefreiheit,
      konfidenz: k.konfidenz,
      freigabe: k.freigabe,
      verwandt: k.verwandt ?? [],
      quelle_url: k.quelle_url,
      aufgenommen: k.aufgenommen,
    })),
  };
}

// -------------------------------------------------------------------- Aufruf

const istHauptprogramm = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (istHauptprogramm) {
  const args = process.argv.slice(2);
  const wert = (name, standard) => {
    const i = args.indexOf(name);
    return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : standard;
  };
  const standardPfad = fileURLToPath(
    new URL('../skills/webdesign-conversion/assets/musterbibliothek/', import.meta.url)
  );
  const ORDNER = wert('--pfad', standardPfad);

  let taxonomie;
  let dateien;
  try {
    ({ taxonomie, dateien } = bibliothekLesen(ORDNER));
  } catch (f) {
    console.error(f.message);
    process.exit(2);
  }

  const ids = dateien.map((d) => basename(d).replace(/\.md$/, ''));
  const alleBefunde = [];
  const koepfe = [];

  for (const datei of dateien) {
    const { befunde, kopf } = musterPruefen(datei, readFileSync(datei, 'utf8'), taxonomie, ids);
    alleBefunde.push(...befunde);
    if (kopf) koepfe.push(kopf);
  }

  console.log(`Musterbibliothek ${ORDNER}`);
  console.log(`${dateien.length} Muster geprüft\n`);

  const fehler = alleBefunde.filter((b) => b.art === 'fehler');
  const warnungen = alleBefunde.filter((b) => b.art === 'warnung');

  for (const b of [...fehler, ...warnungen]) {
    console.log(`${b.art === 'fehler' ? 'FEHLER ' : 'Hinweis'}  ${b.datei}: ${b.text}`);
  }

  if (args.includes('--index')) {
    if (fehler.length) {
      console.error('\nIndex nicht geschrieben, es gibt Fehler. Erst beheben.');
      process.exit(1);
    }
    const pfad = join(ORDNER, 'index.json');
    writeFileSync(pfad, `${JSON.stringify(indexBauen(koepfe), null, 2)}\n`, 'utf8');
    console.log(`\nIndex geschrieben: ${pfad} (${koepfe.length} Muster)`);
  }

  console.log(`\n${fehler.length} Fehler, ${warnungen.length} Hinweise.`);
  process.exit(fehler.length ? 1 : 0);
}
