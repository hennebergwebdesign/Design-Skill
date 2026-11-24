#!/usr/bin/env node
/*
  branchenprofil.mjs — gibt das Designprofil EINER Branche aus, nicht das ganze Regelwerk.

  WARUM ES DIESES SKRIPT GIBT
  Der erste Entwurf wurde schlecht, weil der Agent die Branche aus 80 Referenzdateien selbst
  zusammensuchen musste und dabei bei der Voreinstellung landete. Das Profil legt je Branche
  Richtung, Hauptaktion, Farbstimmung, Schriftcharakter, Bildwelt, Heldmuster, Sektionsfolge
  und Fehlbilder fest. Ein Aufruf kostet rund 600 Token, das Kapitel dazu ein Vielfaches.

  AUFRUF
    node scripts/branchenprofil.mjs liste                 alle Branchen mit Suchwörtern
    node scripts/branchenprofil.mjs dachdecker            Profil als Text (Suchwort, Name oder Schlüssel)
    node scripts/branchenprofil.mjs dachdecker --landing  mit der Folge für eine Landingpage statt der Startseite
    node scripts/branchenprofil.mjs dachdecker --marke    Block "gestaltung" für marke.json als JSON
    node scripts/branchenprofil.mjs dachdecker --json     das Profil roh

  Exit 0 bei Treffer, 2 bei unbekannter Branche (dann steht die Liste in der Ausgabe) oder
  fehlender Datendatei. Das Skript erfindet nichts: was nicht im Profil steht, bleibt offen.
*/

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HIER = dirname(fileURLToPath(import.meta.url));
export const DATEI = join(HIER, '..', 'skills', 'webdesign-conversion', 'assets', 'branchenprofile.json');

export function laden(pfad = DATEI) {
  return JSON.parse(readFileSync(pfad, 'utf8'));
}

function norm(s) {
  return String(s).toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Findet den Schlüssel: exakter Schlüssel, dann Suchwort, dann Teiltreffer im Namen. */
export function finde(daten, wort) {
  const w = norm(wort);
  if (!w) return null;
  const eintraege = Object.entries(daten.branchen);
  for (const [k] of eintraege) if (norm(k) === w) return k;
  for (const [k, p] of eintraege) if ((p.aliasse || []).some((a) => norm(a) === w)) return k;
  for (const [k, p] of eintraege) {
    if ((p.aliasse || []).some((a) => (w.length >= 4 && norm(a).includes(w)) || (norm(a).length >= 6 && w.includes(norm(a))))) return k;
    if (norm(p.name).includes(w)) return k;
  }
  return null;
}

function zeile(l, t) {
  return `${l}: ${t}`;
}

export function alsText(daten, key, landing = false) {
  const p = daten.branchen[key];
  const g = daten.gemeinsam;
  const folge = landing ? p.landing : p.sektionen;
  const r = p.regler;
  return [
    `Branchenprofil: ${p.name} (${key})`,
    zeile('Typ', p.typ),
    zeile('Richtung', p.richtung),
    zeile('Hauptaktion', p.hauptaktion),
    zeile('Regler', `Varianz ${r.varianz}, Bewegung ${r.bewegung}, Dichte ${r.dichte}`),
    zeile('Farbstimmung', p.farbwelt),
    zeile('Schrift', p.schrift),
    zeile('Bildwelt', p.bildwelt),
    zeile('Held', `${p.held}. Immer: ${g.held}`),
    zeile(landing ? 'Folge Landingpage' : 'Folge Startseite', folge.join(' > ')),
    zeile('Belege', p.belege),
    zeile('Verboten in dieser Branche', p.verboten.join('; ')),
    zeile('Verboten immer', g.verboten_immer.join('; ')),
    zeile('Freigegebene Referenzen', p.referenzen.length ? p.referenzen.join(', ') : 'keine passende, bei Bedarf Tor 1'),
    '',
    'Die Marke des Kunden schlägt jede Zeile dieses Profils (24-designsystem-vorrang.md). Farbe und Schrift sind Charakter, kein Hexwert und kein Zwang.',
  ].join('\n');
}

export function alsMarke(daten, key) {
  const p = daten.branchen[key];
  return {
    gestaltung: {
      lesart: `[[FEHLT: Ich lese das als: ${p.typ}, Richtung ${p.richtung}, mit dem Kunden abstimmen]]`,
      regler: { ...p.regler, begruendung: `Ausgangswerte des Branchenprofils ${key}, nicht gemessen` },
      branchenprofil: key,
      hauptaktion: p.hauptaktion,
    },
  };
}

export function liste(daten) {
  return Object.entries(daten.branchen)
    .map(([k, p]) => `${k.padEnd(22)} ${p.name}\n${' '.repeat(23)}Suchwörter: ${p.aliasse.slice(0, 8).join(', ')}`)
    .join('\n');
}

function main(argv) {
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const rest = argv.filter((a) => !a.startsWith('--'));
  let daten;
  try {
    daten = laden();
  } catch (e) {
    console.error(`Datendatei nicht lesbar: ${e.message}`);
    return 2;
  }
  if (rest.length === 0 || rest[0] === 'liste') {
    console.log(liste(daten));
    return rest.length === 0 ? 2 : 0;
  }
  const key = finde(daten, rest.join(' '));
  if (!key) {
    console.error(`Keine Branche zu "${rest.join(' ')}" gefunden. Die nächstliegende wählen oder ohne Profil nach 26-geschmack-und-ki-tells.md arbeiten.\n`);
    console.error(liste(daten));
    return 2;
  }
  if (flags.has('--json')) console.log(JSON.stringify({ key, ...daten.branchen[key], gemeinsam: daten.gemeinsam }, null, 2));
  else if (flags.has('--marke')) console.log(JSON.stringify(alsMarke(daten, key), null, 2));
  else console.log(alsText(daten, key, flags.has('--landing')));
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exit(main(process.argv.slice(2)));
}
