#!/usr/bin/env node
/*
  muster-paket.mjs — schnürt nach Tor 2 ein transportierbares Musterpaket.

  WARUM ES DIESES SKRIPT GIBT
  Das globale Wissen liegt im Plugin, gearbeitet wird im Kundenprojekt, wo das Plugin nur
  installiert ist. Ein Schreibzugriff dorthin wäre entweder wirkungslos (eine
  Marketplace-Installation wird beim nächsten Update überschrieben) oder unsichtbar (eine
  Kopie unter .claude/skills/ ohne Git-Bezug). Deshalb schreibt dieses Skript NICHT in die
  Musterbibliothek. Es legt im Projekt ein Paket ab, das jemand bewusst in das Repository
  Design-Skill übernimmt.

  Das ist kein Umweg, sondern genau die Kuratierung, um die es geht: der letzte Schritt ins
  dauerhafte Wissen ist ein Commit, den ein Mensch macht.

  ZWEI SPERREN
    1. Ohne Entscheidung an Tor 2 passiert nichts. Steht der Eintrag nicht auf GLOBAL oder
       ERWEITERT, bricht der Aufruf mit Exit 2 ab. NUR_PROJEKT und ABGELEHNT erzeugen
       ausdrücklich kein Paket.
    2. Ein Entwurf, der die Prüfung aus pruefe-muster.mjs nicht besteht, wird nicht
       eingepackt. Ein fehlerhaftes Muster im Paket wäre ein fehlerhaftes Muster in der
       Bibliothek, nur einen Schritt später.

  ABGELEGT WIRD IN .designrecherche/muster-vorschlag/<muster-id>/
    <muster-id>.md    die fertige Musterdatei, bereit zum Kopieren
    HERKUNFT.md       Referenz, Freigaben mit Zeitstempel, Grenzen der Erfassung
    EINBAUEN.md       die drei Schritte zur Aufnahme, mit Befehlen

  AUFRUF
    node scripts/muster-paket.mjs --id ref-01-beispiel-de
    node scripts/muster-paket.mjs --id ref-01-beispiel-de --ziel .designrecherche/muster-vorschlag

  EXIT
    0 = Paket erstellt · 1 = nichts zu packen · 2 = Aufrufproblem, fehlende Entscheidung oder
    fehlerhafter Entwurf
*/

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerLesen, finden } from './referenz-register.mjs';
import { musterPruefen, frontmatterLesen } from './pruefe-muster.mjs';

const args = process.argv.slice(2);
const opt = (name, standard = null) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : standard;
};
const raus = (text, code) => {
  (code ? console.error : console.log)(text);
  process.exit(code);
};

const PFAD = opt('--register', join('.designrecherche', 'register.json'));
const WURZEL = opt('--ablage', join('.designrecherche', 'referenzen'));
const ZIEL = opt('--ziel', join('.designrecherche', 'muster-vorschlag'));
const BIBLIOTHEK = opt(
  '--bibliothek',
  fileURLToPath(new URL('../skills/webdesign-conversion/assets/musterbibliothek/', import.meta.url))
);

const id = opt('--id');
if (!id) raus('Aufruf: node scripts/muster-paket.mjs --id <kennung>', 2);

let register;
try {
  register = registerLesen(PFAD);
} catch (f) {
  raus(f.message, 2);
}

const eintrag = finden(register, id);
if (!eintrag) raus(`Kein Eintrag mit der Kennung ${id} im Register ${PFAD}.`, 1);

// --------------------------------------------------------------- Sperre 1

if (eintrag.zustand === 'NUR_PROJEKT') {
  raus(
    `${id} ist an Tor 2 als NUR_PROJEKT entschieden. Es wird bewusst kein Paket erzeugt.\n` +
      'Das Wissen bleibt in .designrecherche/ und wandert nicht in die Musterbibliothek.',
    2
  );
}
if (eintrag.zustand === 'ABGELEHNT') {
  raus(`${id} ist abgelehnt. Es wird kein Paket erzeugt. Grund im Register nachlesen.`, 2);
}
if (!['GLOBAL', 'ERWEITERT'].includes(eintrag.zustand)) {
  raus(
    `${id} steht auf ${eintrag.zustand}. Ein Paket entsteht erst nach der Entscheidung an Tor 2:\n` +
      `  node scripts/referenz-register.mjs wissen --id ${id} --entscheidung global\n` +
      `  node scripts/referenz-register.mjs wissen --id ${id} --entscheidung erweitern --muster <muster-id>`,
    2
  );
}
if (!eintrag.wissen?.zeit || eintrag.wissen.durch !== 'mensch') {
  raus(`${id} trägt keinen Freigabevermerk eines Menschen an Tor 2. Kein Paket.`, 2);
}

// --------------------------------------------------------------- Sperre 2

const entwurfPfad = join(WURZEL, id, 'muster-entwurf.md');
if (!existsSync(entwurfPfad)) raus(`Kein Musterentwurf unter ${entwurfPfad}.`, 1);

const inhalt = readFileSync(entwurfPfad, 'utf8');
const { kopf, fehler } = frontmatterLesen(inhalt);
if (fehler || !kopf) raus(`Entwurf nicht lesbar: ${fehler}`, 2);
if (JSON.stringify(kopf).includes('FEHLT')) {
  raus('Der Entwurf hat noch offene Platzhalter. Ein Muster mit [[FEHLT]] gehört nicht in die Bibliothek.', 2);
}

const musterId = kopf.id;
const taxonomiePfad = join(BIBLIOTHEK, 'taxonomie.json');
if (!existsSync(taxonomiePfad)) raus(`taxonomie.json fehlt unter ${BIBLIOTHEK}.`, 2);
const taxonomie = JSON.parse(readFileSync(taxonomiePfad, 'utf8'));

const { befunde } = musterPruefen(`${musterId}.md`, inhalt, taxonomie);
const harteBefunde = befunde.filter((b) => b.art === 'fehler');
if (harteBefunde.length) {
  raus(
    `Der Entwurf besteht die Prüfung nicht. Kein Paket:\n` +
      harteBefunde.map((b) => `  ${b.text}`).join('\n'),
    2
  );
}

// ----------------------------------------------------------------- Packen

const ordner = join(ZIEL, musterId);
const schreiben = (pfad, text) => {
  mkdirSync(dirname(pfad), { recursive: true });
  writeFileSync(pfad, text, 'utf8');
};

let grenzen = [];
let abrufart = 'unbekannt';
const metaPfad = join(WURZEL, id, 'meta.json');
if (existsSync(metaPfad)) {
  const meta = JSON.parse(readFileSync(metaPfad, 'utf8'));
  grenzen = meta.grenzen ?? [];
  abrufart = meta.abrufart ?? 'unbekannt';
}

const erweitert = eintrag.zustand === 'ERWEITERT';
const zielMuster = eintrag.wissen?.muster_id ?? null;
if (erweitert && !zielMuster) {
  raus('Entscheidung erweitern, aber kein Zielmuster vermerkt. Mit --muster <muster-id> erneut entscheiden.', 2);
}

schreiben(join(ordner, `${musterId}.md`), inhalt);

schreiben(
  join(ordner, 'HERKUNFT.md'),
  [
    `# Herkunft von ${musterId}`,
    '',
    '| Feld | Wert |',
    '|---|---|',
    `| Referenz | \`${eintrag.id}\` |`,
    `| Name | ${eintrag.name} |`,
    `| Adresse | ${eintrag.url} |`,
    `| gefunden über | ${eintrag.gefunden_ueber ?? 'direkt genannt'} |`,
    `| Abrufart | ${abrufart} |`,
    `| Entscheidung an Tor 2 | ${eintrag.wissen.entscheidung}${zielMuster ? ` (Ziel: \`${zielMuster}\`)` : ''} |`,
    '',
    '## Freigaben',
    '',
    '| Tor | Zeitpunkt | Umfang |',
    '|---|---|---|',
    `| Tor 1, Erfassung | ${eintrag.freigabe?.zeit ?? 'nicht vermerkt'} | ${
      eintrag.freigabe?.umfang === 'teilweise'
        ? [...(eintrag.freigabe.sektionen ?? []), ...(eintrag.freigabe.komponenten ?? [])].join(', ')
        : 'ganze Website'
    } |`,
    `| Tor 2, Wissen | ${eintrag.wissen.zeit} | ${eintrag.wissen.entscheidung} |`,
    '',
    '## Grenzen der Erfassung',
    '',
    'Diese Punkte konnten nicht erfasst werden. Sie sind der Grund für jedes `unbekannt` im',
    'Muster und dürfen dort nicht nachträglich gefüllt werden.',
    '',
    grenzen.length ? grenzen.map((g) => `- ${g}`).join('\n') : '- keine vermerkt',
    '',
    '## Zustandsverlauf',
    '',
    ...(eintrag.verlauf ?? []).map((v) => `- ${v.zeit} ${v.zustand}${v.notiz ? ` (${v.notiz})` : ''}`),
    '',
  ].join('\n')
);

schreiben(
  join(ordner, 'EINBAUEN.md'),
  [
    `# ${musterId} in die Musterbibliothek aufnehmen`,
    '',
    erweitert
      ? `Entscheidung an Tor 2: **bestehendes Muster \`${zielMuster}\` erweitern.** Es entsteht keine\nneue Datei. Die Inhalte dieses Pakets wandern als Ausprägung in das bestehende Muster.`
      : 'Entscheidung an Tor 2: **neues Muster.** Die Datei wird übernommen wie sie ist.',
    '',
    'Dieser Schritt passiert **im Repository `Design-Skill`**, nicht im Kundenprojekt. Das ist',
    'Absicht: das globale Wissen ist versioniert und kuratiert, und der letzte Schritt hinein',
    'ist ein Commit, den ein Mensch macht.',
    '',
    '## Schritte',
    '',
    '```bash',
    '# 1. Im Repository Design-Skill, Datei übernehmen',
    erweitert
      ? `#    Ausprägung in skills/webdesign-conversion/assets/musterbibliothek/muster/${zielMuster}.md\n#    einarbeiten, Konfidenz und verwandt nachziehen`
      : `cp ${join(ordner, `${musterId}.md`)} \\\n   skills/webdesign-conversion/assets/musterbibliothek/muster/${musterId}.md`,
    '',
    '# 2. Prüfen und Index neu erzeugen',
    'node scripts/pruefe-muster.mjs --index',
    '',
    '# 3. Committen, mit der Herkunft aus HERKUNFT.md in der Nachricht',
    '```',
    '',
    '## Vor dem Commit prüfen',
    '',
    '- [ ] `freigabe` im Frontmatter steht auf `global` beziehungsweise `erweitert`',
    '- [ ] `konfidenz` ist ehrlich gesetzt, nicht optimistisch',
    '- [ ] jedes `unbekannt` aus HERKUNFT.md steht auch im Muster und wurde nicht gefüllt',
    '- [ ] kein fremdes Bildmaterial, kein wörtliches Zitat, kein fremder Markenname als Inhalt',
    '- [ ] `verwandt` ist beidseitig gepflegt, auch im verlinkten Muster',
    '- [ ] `node scripts/pruefe-muster.mjs` läuft ohne Fehler',
    '',
    'Regeln und Schwellen: `skills/webdesign-conversion/references/25-designmuster-bibliothek.md`.',
    '',
  ].join('\n')
);

console.log(`Paket erstellt: ${ordner}/`);
console.log(`  ${musterId}.md, HERKUNFT.md, EINBAUEN.md`);
console.log('');
console.log('Die Musterbibliothek wurde NICHT verändert. Die Aufnahme ist ein Commit im');
console.log('Repository Design-Skill, siehe EINBAUEN.md.');
process.exit(0);
