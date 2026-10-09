#!/usr/bin/env node
/*
  pruefe-skill.mjs — prüft den Aufbau der Skills in diesem Plugin, nicht ein Kundenprojekt.

  WARUM ES DIESES SKRIPT GIBT
  Ein Skill wirkt nur mit dem, was das Modell davon tatsächlich liest. Lange Dateien werden oft
  nur angelesen, Verweise über zwei Ebenen nur teilweise verfolgt, und eine Referenz, die von
  keiner SKILL.md aus genannt wird, existiert für das Modell praktisch nicht. Der Leitfaden von
  Anthropic zu Skills nennt dafür Grenzen (SKILL.md unter 500 Zeilen, Inhaltsverzeichnis ab 100
  Zeilen, Verweise eine Ebene tief), das Paket aus Version 4.18 hat sie übernommen. Eine Regel
  zum Aufbau ohne Prüfung bricht beim nächsten neuen Kapitel, deshalb zählt das hier eine Maschine.

  WAS GEPRÜFT WIRD
  Je Skill unter skills/<name>/:
    1. SKILL.md über 500 Zeilen: FEHLER.
    2. name im Frontmatter nicht aus Kleinbuchstaben, Ziffern und Bindestrichen, über 64 Zeichen
       oder mit „claude" oder „anthropic": FEHLER.
    3. description über 1024 Zeichen: WARNUNG. Claude Code kann sie kürzen, dann fällt das Ende weg.
    4. Eine Datei in references/ oder playbooks/, deren Name in der SKILL.md nicht vorkommt:
       WARNUNG. Sie ist nur über einen Umweg erreichbar.
  Je Datei in references/ und playbooks/:
    5. Über 100 Zeilen ohne „## Inhalt" vor dem ersten anderen Abschnitt: FEHLER.
    6. „## Inhalt" vorhanden, aber ein Abschnitt (## …) fehlt darin oder steht dort, ohne zu
       existieren: WARNUNG. Ein veraltetes Verzeichnis führt schlechter als keines.
  Je Markdowndatei unter skills/:
    7. Verweis in Backticks auf eine Skilldatei, die es nicht gibt: WARNUNG. Gezählt werden Pfade
       mit references/, playbooks/ oder assets/ und Kapitelnamen wie 24-designsystem-vorrang.md.
       Aufgelöst wird relativ zur Datei und zum Skillordner. Ein Kapitelname ohne Pfad gilt als
       gefunden, wenn er irgendwo in skills/ liegt. Dateien im Kundenprojekt (CLAUDE.md,
       BILDER.md, .designrecherche/…) zählen nicht, es gibt sie hier nicht.

  AUFRUF
    node scripts/pruefe-skill.mjs              prüfen
    node scripts/pruefe-skill.mjs --inhalt     Inhaltsverzeichnisse anlegen oder erneuern, dann prüfen
    node scripts/pruefe-skill.mjs --wurzel pfad/zu/skills

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename, resolve, relative } from 'node:path';

export const SKILL_MAX_ZEILEN = 500;
export const INHALT_AB_ZEILEN = 100;
export const BESCHREIBUNG_MAX = 1024;

/* ---------- Frontmatter ---------- */

export function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const felder = {};
  for (const zeile of m[1].split('\n')) {
    const t = zeile.match(/^([a-z_]+):\s*(.*)$/i);
    if (t) felder[t[1]] = t[2].trim().replace(/^"(.*)"$/s, '$1');
  }
  return felder;
}

export function skillAnalysieren(text, dateinamen = []) {
  const fehler = [];
  const warnungen = [];
  const zeilen = text.split('\n').length;
  if (zeilen > SKILL_MAX_ZEILEN) {
    fehler.push({ regel: 'skill-laenge', meldung: `SKILL.md mit ${zeilen} Zeilen, Grenze ${SKILL_MAX_ZEILEN}`,
      tipp: 'Details in eine Referenz verschieben und von der SKILL.md aus verlinken.' });
  }
  const fm = frontmatter(text);
  const name = fm.name ?? '';
  if (!/^[a-z0-9-]{1,64}$/.test(name) || /claude|anthropic/.test(name)) {
    fehler.push({ regel: 'skill-name', meldung: `name „${name}" entspricht nicht der Form`,
      tipp: 'Kleinbuchstaben, Ziffern, Bindestriche, höchstens 64 Zeichen, ohne claude und anthropic.' });
  }
  const beschreibung = fm.description ?? '';
  if (beschreibung.length > BESCHREIBUNG_MAX) {
    warnungen.push({ regel: 'beschreibung-lang', meldung: `description mit ${beschreibung.length} Zeichen, Grenze ${BESCHREIBUNG_MAX}`,
      tipp: 'Kürzen, nicht ergänzen. Was wann auslöst, gehört nach vorn.' });
  }
  for (const d of dateinamen) {
    if (!text.includes(d)) {
      warnungen.push({ regel: 'nicht-verlinkt', meldung: `${d} wird in der SKILL.md nicht genannt`,
        tipp: 'In die Referenztabelle mit „wann lesen" eintragen, sonst nur über Umwege erreichbar.' });
    }
  }
  return { fehler, warnungen };
}

/* ---------- Inhaltsverzeichnis ---------- */

/* Abschnitte zweiter Ebene außerhalb von Codeblöcken, ohne das Verzeichnis selbst. */
export function abschnitte(text) {
  const liste = [];
  let imCode = false;
  for (const zeile of text.split('\n')) {
    if (/^```/.test(zeile)) imCode = !imCode;
    if (imCode) continue;
    const m = zeile.match(/^## (.+?)\s*$/);
    if (m && m[1] !== 'Inhalt') liste.push(m[1]);
  }
  return liste;
}

export function inhaltLesen(text) {
  const m = text.match(/\n## Inhalt\n\n((?:- .*\n)+)/);
  return m ? m[1].trim().split('\n').map((z) => z.replace(/^- /, '').replace(/^(\d+)\\\./, '$1.')) : null;
}

export function referenzAnalysieren(text) {
  const fehler = [];
  const warnungen = [];
  const zeilen = text.split('\n').length;
  const teile = abschnitte(text);
  const inhalt = inhaltLesen(text);
  const posInhalt = text.indexOf('\n## Inhalt\n');
  const erster = text.search(/\n## (?!Inhalt\n)/);
  if (zeilen > INHALT_AB_ZEILEN && (posInhalt === -1 || (erster !== -1 && posInhalt > erster))) {
    fehler.push({ regel: 'inhalt-fehlt', meldung: `${zeilen} Zeilen ohne „## Inhalt" vor dem ersten Abschnitt`,
      tipp: 'node scripts/pruefe-skill.mjs --inhalt legt es an.' });
  }
  if (inhalt) {
    const fehlt = teile.filter((t) => !inhalt.includes(t));
    const zuviel = inhalt.filter((t) => !teile.includes(t));
    if (fehlt.length || zuviel.length) {
      warnungen.push({ regel: 'inhalt-veraltet',
        meldung: `Inhaltsverzeichnis passt nicht${fehlt.length ? `, fehlt: ${fehlt.join('; ')}` : ''}${zuviel.length ? `, ohne Abschnitt: ${zuviel.join('; ')}` : ''}`,
        tipp: 'node scripts/pruefe-skill.mjs --inhalt erneuert es.' });
    }
  }
  return { fehler, warnungen };
}

/* Legt das Verzeichnis vor dem ersten Abschnitt an oder ersetzt das vorhandene. */
export function inhaltSetzen(text) {
  const teile = abschnitte(text);
  if (!teile.length) return text;
  /* „- 1. Titel" würde Markdown als nummerierte Liste in der Aufzählung lesen, deshalb „1\." */
  const block = `## Inhalt\n\n${teile.map((t) => `- ${t.replace(/^(\d+)\./, '$1\\.')}`).join('\n')}\n`;
  if (inhaltLesen(text)) return text.replace(/## Inhalt\n\n(?:- .*\n)+/, block);
  const pos = text.search(/\n## /);
  return `${text.slice(0, pos + 1)}${block}\n${text.slice(pos + 1)}`;
}

/* ---------- Verweise ---------- */

export function verweise(text) {
  const liste = new Set();
  let imCode = false;
  for (const zeile of text.split('\n')) {
    if (/^```/.test(zeile)) { imCode = !imCode; continue; }
    if (imCode) continue;
    for (const m of zeile.matchAll(/`([^`\s*<>‹[\]]+\.md)`/g)) {
      if (SKILLVERWEIS.test(m[1])) liste.add(m[1]);
    }
  }
  return [...liste];
}

/* Nur Verweise in die Skillordner, nicht auf Dateien des Kundenprojekts. */
export const SKILLVERWEIS = /(^|\/)(references|playbooks|assets)\/|^(\.\.\/)*\d{2}-[\w-]+\.md$/;

/* ---------- Ablauf ---------- */

function mdDateien(ordner) {
  const liste = [];
  const lauf = (p) => {
    for (const e of readdirSync(p, { withFileTypes: true })) {
      const voll = join(p, e.name);
      if (e.isDirectory()) lauf(voll);
      else if (e.name.endsWith('.md')) liste.push(voll);
    }
  };
  lauf(ordner);
  return liste;
}

function main() {
  const args = process.argv.slice(2);
  const wi = args.indexOf('--wurzel');
  const wurzel = resolve(wi === -1 ? 'skills' : args[wi + 1] ?? '');
  const schreiben = args.includes('--inhalt');
  if (!existsSync(wurzel) || !statSync(wurzel).isDirectory()) {
    console.error(`Ordner nicht gefunden: ${wurzel}. Im Repositorywurzel aufrufen oder --wurzel angeben.`);
    process.exit(2);
  }

  const fehler = [];
  const warnungen = [];
  const merke = (ort, erg) => {
    erg.fehler.forEach((b) => fehler.push({ ...b, ort }));
    erg.warnungen.forEach((b) => warnungen.push({ ...b, ort }));
  };
  const alle = mdDateien(wurzel);
  const namen = new Set(alle.map((d) => basename(d)));
  let angelegt = 0;

  for (const skill of readdirSync(wurzel, { withFileTypes: true }).filter((e) => e.isDirectory())) {
    const ordner = join(wurzel, skill.name);
    const skillDatei = join(ordner, 'SKILL.md');
    if (!existsSync(skillDatei)) continue;
    const nachschlag = ['references', 'playbooks']
      .map((u) => join(ordner, u))
      .filter(existsSync)
      .flatMap((u) => readdirSync(u).filter((d) => d.endsWith('.md')).map((d) => join(u, d)));
    merke(relative(process.cwd(), skillDatei), skillAnalysieren(readFileSync(skillDatei, 'utf8'), nachschlag.map((d) => basename(d))));
    for (const datei of nachschlag) {
      let text = readFileSync(datei, 'utf8');
      if (schreiben && text.split('\n').length > INHALT_AB_ZEILEN) {
        const neu = inhaltSetzen(text);
        if (neu !== text) { writeFileSync(datei, neu); text = neu; angelegt++; }
      }
      merke(relative(process.cwd(), datei), referenzAnalysieren(text));
    }
  }

  for (const datei of alle) {
    const skillOrdner = join(wurzel, relative(wurzel, datei).split(/[\\/]/)[0]);
    const tote = verweise(readFileSync(datei, 'utf8')).filter((v) => {
      if (!v.includes('/')) return !namen.has(v);
      return ![dirname(datei), skillOrdner].some((basis) => existsSync(resolve(basis, v)));
    });
    if (tote.length) {
      warnungen.push({ ort: relative(process.cwd(), datei), regel: 'toter-verweis',
        meldung: `Verweis auf nicht vorhandene Datei: ${tote.join(', ')}`,
        tipp: 'Pfad relativ zur Datei prüfen oder den Verweis entfernen.' });
    }
  }

  const ausgeben = (titel, liste) => {
    if (!liste.length) return;
    console.log(`\n${titel} (${liste.length})`);
    for (const b of liste) console.log(`  ${b.ort}  ${b.meldung}\n    → ${b.tipp}`);
  };
  console.log(`Geprüft: ${alle.length} Markdowndateien in ${relative(process.cwd(), wurzel) || '.'}`);
  if (schreiben) console.log(`Inhaltsverzeichnisse angelegt oder erneuert: ${angelegt}`);
  ausgeben('FEHLER', fehler);
  ausgeben('WARNUNGEN', warnungen);
  if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
  else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.`);
  process.exit(fehler.length ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
