#!/usr/bin/env node
/*
  pruefe-claudemd.mjs — misst die Größe der CLAUDE.md, weil sie jede Runde Kontext kostet.

  WARUM ES DIESES SKRIPT GIBT
  Claude Code liest die CLAUDE.md bei jedem Start vollständig und hält sie in jeder
  Runde im Kontext. 70 KB sind rund 18.000 Token, bevor die Arbeit beginnt. Ein
  Änderungsverlauf in der CLAUDE.md wächst mit jeder Runde und wird nie gebraucht, bis
  jemand eine alte Entscheidung sucht. Dafür gibt es docs/.

  GRENZEN
    Ziel          unter 8 KB (8192 Bytes)     darüber: Hinweis
    Obergrenze    10 KB (10240 Bytes)         darüber: Fehler

  AUFRUF
    node scripts/pruefe-claudemd.mjs [ordner ...]    Standard: aktueller Ordner
    Geprüft werden CLAUDE.md und AGENTS.md im Ordner und in Unterordnern (ohne
    node_modules, .git, dist).

  EXIT
    0 = innerhalb der Ziele (bzw. nur Hinweise) · 1 = Obergrenze überschritten · 2 = nichts gefunden
*/

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ZIEL = 8192;
const OBERGRENZE = 10240;
const AUSGELASSEN = new Set(['node_modules', '.git', 'dist', '.astro', '.wrangler']);
const NAMEN = new Set(['CLAUDE.md', 'AGENTS.md']);

function sammle(ordner, treffer = []) {
  for (const name of readdirSync(ordner)) {
    if (AUSGELASSEN.has(name)) continue;
    const pfad = join(ordner, name);
    const info = statSync(pfad);
    if (info.isDirectory()) sammle(pfad, treffer);
    else if (NAMEN.has(name)) treffer.push({ pfad, bytes: info.size });
  }
  return treffer;
}

const ordner = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const funde = (ordner.length ? ordner : ['.']).flatMap((o) => sammle(o));

if (!funde.length) {
  console.log('Keine CLAUDE.md oder AGENTS.md gefunden.');
  process.exit(2);
}

let fehler = 0;
for (const { pfad, bytes } of funde) {
  const kb = (bytes / 1024).toFixed(1);
  if (bytes > OBERGRENZE) {
    fehler++;
    console.log(`FEHLER  ${pfad}: ${kb} KB, Obergrenze 10 KB. Änderungsverlauf und Detail nach docs/ auslagern.`);
  } else if (bytes > ZIEL) {
    console.log(`HINWEIS ${pfad}: ${kb} KB, Ziel unter 8 KB.`);
  } else {
    console.log(`OK      ${pfad}: ${kb} KB`);
  }
}
process.exit(fehler ? 1 : 0);
