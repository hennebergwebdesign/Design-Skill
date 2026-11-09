#!/usr/bin/env node
/*
  pruefe-slop.mjs — lässt Slop Detect (ravidsrk/slop-detect, MIT) gegen die laufende Seite laufen
  und wendet darauf den Agenturmaßstab an.

  WARUM ES DIESES SKRIPT GIBT
  Das Regelwerk (Kapitel 26 und 55) sagt, woran man eine maschinell gebaute Seite erkennt. Ob die
  fertige Seite diese Merkmale tatsächlich trägt, zeigt erst das gerenderte DOM: berechnete
  Schriften, Verläufe, Schatten, Kartenraster. Slop Detect misst das in einem echten Chromium. Dieses
  Skript startet den Original-CLI, prüft das Ergebnis gegen die Grenzen der Agentur und gibt es
  auf Deutsch aus. Die Mustererkennung selbst wird NICHT nachgebaut, sie bleibt beim Original.

  WAS ES BEWUSST ANDERS MACHT ALS DER CLI
  1. Ein Lauf, der nichts bewerten konnte (gesperrt, leer, Fehler), ist Exit 2 und nie sauber.
     Der CLI der Version 0.8.0 meldet das nur im JSON und beendet sich ohne --fail-on mit 0.
  2. Kein --remote und kein --api. Beides schickt die Adresse an slop-detect.com. Eine Vorschau
     des Kunden gehört nicht an einen Dritten. Wer eine öffentliche Seite prüfen will, startet
     den lokalen Lauf, der funktioniert genauso.
  3. Ausnahmen nur mit Begründung, in `slop-ausnahmen.json` im Projekt. Eine Markenvorgabe
     (Greige als Grundfarbe, Instrument Serif aus dem Brand Guide) darf ein Muster ausnehmen,
     eine Ausnahme ohne Begründung ist ein Umgehen und bricht mit Exit 2 ab.
  4. Fehler sind Heavy im Design und jedes Artefakt im Text (Platzhalter, rohes Markdown,
     Chatbotreste, versteckte Zeichen). Mild bleibt Warnung, mit --streng ein Fehler.

  AUFRUF
    node scripts/pruefe-slop.mjs http://localhost:4321
    node scripts/pruefe-slop.mjs http://localhost:4321 --copy --aeo --craft --streng
    node scripts/pruefe-slop.mjs http://localhost:4321 --ausnahmen slop-ausnahmen.json
    node scripts/pruefe-slop.mjs --vorbeugen          Vermeideliste für den Entwurf, kein Lauf
    --json    Zusammenfassung maschinenlesbar    --timeout <ms>    Navigationszeit (Standard 30000)

  CLI FINDEN (in dieser Reihenfolge)
    $SLOP_DETECT_BIN  ·  ./node_modules/.bin/slop-detect  ·  npx --yes slop-detect@0.8.0
  Playwright-Chromium muss zur Playwright-Version des CLI passen; sonst `npx playwright install chromium`.

  GRENZEN
    Der CLI scannt nur http(s)-Adressen, kein file://. Für dist/ vorher `astro preview` starten.
    Die Ausnahmen werden von diesem Skript abgezogen, nicht vom Motor: die bereinigte Punktzahl ist
    eine Näherung (der Motor deckelt Muster untereinander), der Befund selbst bleibt sichtbar.
    Die Textachse bewertet englische Prosa. Bei deutschem Text meldet sie wenig; dafür gibt es
    scripts/deslop-check.mjs. Nur die Artefaktregeln gelten sprachunabhängig.

  EXIT
    0 = in Ordnung (Warnungen möglich) · 1 = Befund über der Grenze · 2 = nicht geprüft (Aufruf,
    Browser, gesperrte Seite, Ausnahme ohne Begründung)
*/

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const FESTE_VERSION = '0.8.0';
const MILD_AB = 10;
const HEAVY_AB = 28;

/* Artefakte sind Defekte, keine Stilfragen: sie gehören vor der Übergabe weg. */
const ARTEFAKT_IDS = new Set([
  'unfilled_placeholders', 'leaked_markdown', 'chatbot_markup_leak', 'chatbot_reply_residue',
  'context_leak_copy', 'hidden_tag_characters', 'invisible_characters', 'fake_bold_math_alnum',
  'ai_referral_utm_links',
]);

/* Kurzname und Gegenmittel je Muster, abgestimmt auf Kapitel 26 und 55. Unbekannte IDs
   (der Katalog wächst) bekommen die Bezeichnung des Motors. */
const DEUTSCH = {
  slop_fonts: ['Standardschrift (Inter, Geist, Space Grotesk, Plus Jakarta Sans u. a.)', 'Schrift aus der Marke, sonst bewusst gewählt (10-visuelle-richtung.md)'],
  slop_fonts_2026: ['Erweiterte Standardschriften 2026', 'Schrift aus der Marke, mit Begründung'],
  purple_accent: ['Indigo oder Violett als Knopffarbe', 'Farbe aus den Rollen-Tokens, nicht Violett gegen Indigo tauschen'],
  gradient_text: ['Verlaufstext', 'einfarbige Überschrift aus der Rolle'],
  gradient_backgrounds: ['Verlaufsflächen über mehrere Sektionen', 'Fläche aus den Tokens, Verlauf nur aus der Marke abgeleitet'],
  accent_stripe: ['Farbiger Streifen oben oder links an Karten', 'Rahmen in einer Farbe oder gar keiner'],
  accent_stripe_2026: ['Farbstreifen an Karten (erweitert)', 'Rahmen in einer Farbe'],
  glassmorphism: ['Glas (Weichzeichner hinter Flächen)', 'Fläche aus den Tokens, Glas nur auf fixierten Elementen'],
  colored_glows: ['Farbiges Leuchten um Elemente', 'getönter, kleiner Schatten'],
  centered_hero: ['Mittig gesetzter Held in Standardschrift', 'Layout aus dem Entwurf, nicht aus Gewohnheit'],
  hero_eyebrow_pill: ['Pille über der Überschrift („Neu“, „Beta“)', 'streichen, sie ist ein Kicker in anderer Form'],
  all_caps_labels: ['Versal-Labels', 'Thema in Klartext'],
  eyebrow_label: ['Kicker über den meisten Überschriften', 'höchstens ein Kicker je drei Sektionen'],
  perma_dark_mode: ['Dauerhaft dunkel mit grauem Fließtext', 'Kontrast nachmessen, Grundfarbe aus der Marke'],
  icon_card_grid: ['Gleiche Karten mit Icon obenauf', 'ungleich gewichten, nach Inhalt (21-sektionshintergruende-hierarchie.md)'],
  numbered_steps: ['Nummerierte Schritte 1, 2, 3', 'Schritte mit Verb, Zählung nur wenn sie etwas ordnet'],
  stat_banner: ['Kennzahlenband („10k+“, „99,9 %“)', 'nur belegte Zahlen, sonst streichen'],
  faq_accordion: ['FAQ als Akkordeon im unteren Drittel', 'nur wenn echte Fragen vorliegen, Antworten sichtbar im HTML'],
  gradient_letter_avatars: ['Initialen im Farbkreis als Kundenstimme', 'echtes, freigegebenes Foto oder keine Stimme'],
  bento_grid: ['Bento-Raster aus gerundeten Karten', 'Raster nach Inhalt, nicht nach Mode'],
  aurora_mesh_gradient: ['Aurora- oder Mesh-Verlauf als Hintergrund', 'ruhige Fläche oder echtes Bild'],
  ai_sparkle_badges: ['Funkel-Symbole („✨“) an KI-Text', 'streichen'],
  cream_default_bg: ['Cremefarbener Standardgrund', 'Markenfarbe, oder mit Begründung ausnehmen'],
  low_contrast_text: ['Zu blasser Text', 'Kontrast auf 4,5:1 anheben (pruefe-kontrast.mjs)'],
  crushed_tracking: ['Zu enge Laufweite bei Überschriften', 'Laufweite nicht unter −0,02 em'],
  oversized_hero_h1: ['Überlange Überschrift in Riesengröße', 'kürzen oder verkleinern'],
  nested_cards: ['Karten in Karten', 'eine Ebene'],
  flat_type_hierarchy: ['Schriftgrößen zu nah beieinander', 'Verhältnis mindestens 2:1 zwischen Stufen'],
  gray_on_color: ['Grauer Text auf Farbfläche', 'Textfarbe aus der Rolle für diese Fläche'],
  wide_tracking: ['Weite Laufweite im Fließtext', 'Laufweite 0'],
  buzzword_density: ['Modewörter („nahtlos“, „leistungsstark“)', 'konkrete Aussage (12-copywriting.md)'],
  em_dash_overload: ['Gedankenstriche', 'harte Grenze: keine'],
  antithesis_construction: ['„Nicht nur X, sondern Y“', 'die Aussage direkt'],
  filler_openers: ['Floskel als Einstieg', 'mit der Aussage beginnen'],
  formulaic_closers: ['Fazit-Floskel am Ende', 'streichen'],
  rule_of_three: ['Dreierreihen aus Adjektiven', 'eine belegbare Aussage'],
  whether_youre: ['„Egal ob X oder Y“', 'die Zielgruppe konkret nennen'],
  emoji_bullet_headers: ['Emoji vor Überschriften oder Zeilen', 'streichen'],
};

const args = process.argv.slice(2);

function fehler(text, code = 2) {
  console.error(text);
  process.exit(code);
}

function wert(name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
const hat = (name) => args.includes(name);

/* ---------- Vermeideliste für den Entwurf ---------- */
if (hat('--vorbeugen')) {
  console.log('Vermeideliste für den Entwurf (Quelle: Slop Detect, Katalog und Gegenmittel in Kapitel 55)\n');
  for (const [id, [name, statt]] of Object.entries(DEUTSCH)) {
    if (id.endsWith('_2026')) continue;
    console.log(`  ${name}\n      stattdessen: ${statt}`);
  }
  console.log('\nTausche kein Muster gegen ein verwandtes: Inter gegen Geist, Indigo gegen Violett und');
  console.log('Linearverlauf gegen Radialverlauf bleiben Treffer.');
  process.exit(0);
}

/* ---------- Aufruf prüfen ---------- */
if (hat('--remote') || hat('--api')) {
  fehler('Abgelehnt: --remote und --api schicken die Adresse an slop-detect.com. Eine Kundenvorschau\n'
    + 'gehört nicht an einen Dritten. Der lokale Lauf braucht nur Chromium.');
}

const flagMitWert = new Set(['--ausnahmen', '--timeout', '--design-md']);
const url = args.find((a, i) => !a.startsWith('--') && !flagMitWert.has(args[i - 1]));
if (!url) fehler('Aufruf: node scripts/pruefe-slop.mjs <http(s)-Adresse> [--copy] [--aeo] [--craft] [--streng]');
if (!/^https?:\/\//i.test(url)) {
  fehler(`Nur http(s)-Adressen: ${url}\nFür dist/ zuerst \`npx astro preview\` starten und die lokale Adresse übergeben.`);
}

/* ---------- Ausnahmen mit Begründung ---------- */
function ausnahmenLesen() {
  const pfad = resolve(wert('--ausnahmen') || 'slop-ausnahmen.json');
  if (!existsSync(pfad)) {
    if (wert('--ausnahmen')) fehler(`Ausnahmedatei nicht gefunden: ${pfad}`);
    return {};
  }
  let roh;
  try { roh = JSON.parse(readFileSync(pfad, 'utf8')); } catch (e) { fehler(`${pfad} ist kein gültiges JSON: ${e.message}`); }
  const eintraege = roh.ausnahmen ?? roh;
  const aus = {};
  for (const [id, grund] of Object.entries(eintraege)) {
    const text = typeof grund === 'string' ? grund : grund?.grund;
    if (!text || text.trim().length < 12) {
      fehler(`Ausnahme „${id}“ in ${pfad} hat keine Begründung (mindestens ein Satz). Eine Ausnahme ohne Grund `
        + 'ist ein Umgehen der Prüfung und wird nicht angewendet.');
    }
    aus[id] = text.trim();
  }
  return aus;
}
const ausnahmen = ausnahmenLesen();

/* ---------- CLI finden und starten ---------- */
function cliBefehl() {
  const env = process.env.SLOP_DETECT_BIN;
  if (env) {
    return /\.(m?js|cjs)$/.test(env) ? [process.execPath, [env]] : [env, []];
  }
  const lokal = join(process.cwd(), 'node_modules', '.bin', 'slop-detect');
  if (existsSync(lokal)) return [lokal, []];
  return [process.platform === 'win32' ? 'npx.cmd' : 'npx', ['--yes', `slop-detect@${FESTE_VERSION}`]];
}

const [exe, basis] = cliBefehl();
const umgebung = { ...process.env, SKIP_PLAYWRIGHT_DOWNLOAD: process.env.SKIP_PLAYWRIGHT_DOWNLOAD ?? '1' };

function lauf(zusatz, ms = 180000) {
  return spawnSync(exe, [...basis, ...zusatz], { encoding: 'utf8', env: umgebung, timeout: ms, maxBuffer: 64 * 1024 * 1024 });
}

const hilfe = lauf(['--help'], 120000);
if (hilfe.error || (hilfe.status !== 0 && !hilfe.stdout)) {
  fehler('Slop Detect lässt sich nicht starten: ' + (hilfe.error?.message || hilfe.stderr || 'unbekannter Fehler')
    + '\nOffline? Dann `npm i -D slop-detect@' + FESTE_VERSION + '` im Projekt oder $SLOP_DETECT_BIN setzen.');
}
const unterstuetzt = (flag) => (hilfe.stdout + hilfe.stderr).includes(flag);

const cliArgs = [url, '--json'];
const nichtGeprueft = [];
const timeoutMs = wert('--timeout');
if (timeoutMs) cliArgs.push('--timeout', timeoutMs);
if (hat('--copy')) cliArgs.push('--copy');
for (const flag of ['--aeo', '--craft']) {
  if (!hat(flag)) continue;
  if (unterstuetzt(flag)) cliArgs.push(flag);
  else nichtGeprueft.push(`${flag}: diese Version von Slop Detect kennt den Schalter nicht (npm hinkt dem Repository hinterher)`);
}
if (wert('--design-md')) {
  if (unterstuetzt('--design-md')) cliArgs.push('--design-md', wert('--design-md'));
  else nichtGeprueft.push('--design-md: nicht unterstützt');
}

const roh = lauf(cliArgs);
if (roh.error) fehler('Lauf fehlgeschlagen: ' + roh.error.message);
if (roh.status === 2 && !roh.stdout.trim()) fehler('Slop Detect meldet einen Aufruffehler:\n' + roh.stderr.trim());

let doku;
try {
  const parsed = JSON.parse(roh.stdout);
  doku = Array.isArray(parsed) ? parsed[0] : parsed;
} catch {
  fehler('Die Ausgabe von Slop Detect war kein JSON:\n' + (roh.stdout || roh.stderr).slice(0, 600));
}

/* Ein Lauf, der nichts bewerten konnte, ist nie sauber. */
if (!doku || doku.error || doku.blocked || typeof doku.score !== 'number') {
  fehler('NICHT GEPRÜFT: ' + (doku?.error || doku?.hint || doku?.code || 'kein Ergebnis')
    + '\nEin Lauf ohne Bewertung zählt nicht als sauber. Meist hilft: Seite im Browser öffnen, prüfen, ob sie ohne Anmeldung\n'
    + 'rendert, und die Adresse der Vorschau statt der Live-Adresse übergeben. Fehlt Chromium, `npx playwright install chromium`.');
}

/* ---------- Auswerten ---------- */
const achsen = doku.axes ?? { design: { score: doku.score, tier: doku.tier, patterns: doku.patterns } };
const entwurf = achsen.design ?? { score: doku.score, patterns: doku.patterns };
const text = achsen.copy;

const ausgeloest = (liste) => (liste ?? []).filter((p) => p.triggered && (p.status ? p.status === 'fail' || p.status === 'review' : true));
const bezeichnung = (p) => (DEUTSCH[p.id]?.[0] ?? p.short ?? p.label ?? p.id);
const gegenmittel = (p) => DEUTSCH[p.id]?.[1];

const designTreffer = ausgeloest(entwurf.patterns);
const ausgenommen = designTreffer.filter((p) => ausnahmen[p.id]);
const offen = designTreffer.filter((p) => !ausnahmen[p.id]);
const abzug = ausgenommen.reduce((s, p) => s + (p.weight ?? 0), 0);
const bereinigt = Math.max(0, Math.round(entwurf.score - abzug));
const stufe = (n) => (n >= HEAVY_AB ? 'Heavy' : n >= MILD_AB ? 'Mild' : 'Clean');
const designStufe = stufe(bereinigt);

const textTreffer = text ? ausgeloest(text.patterns) : [];
const artefakte = textTreffer.filter((p) => ARTEFAKT_IDS.has(p.id) && !ausnahmen[p.id]);
const textHinweise = textTreffer.filter((p) => !ARTEFAKT_IDS.has(p.id));

const streng = hat('--streng');
const probleme = [];
if (designStufe === 'Heavy') probleme.push(`Design Heavy (bereinigt ${bereinigt}, Grenze ${HEAVY_AB})`);
if (streng && designStufe === 'Mild') probleme.push(`Design Mild (bereinigt ${bereinigt}), mit --streng ein Fehler`);
for (const p of artefakte) probleme.push(`Textartefakt: ${bezeichnung(p)}`);

/* ---------- Ausgabe ---------- */
const zusammenfassung = {
  url, definitionen: doku.definitionsVersion, design: { roh: entwurf.score, bereinigt, stufe: designStufe },
  treffer: offen.map((p) => ({ id: p.id, gewicht: p.weight ?? 0 })),
  ausnahmen: ausgenommen.map((p) => ({ id: p.id, grund: ausnahmen[p.id] })),
  textartefakte: artefakte.map((p) => p.id), textHinweise: textHinweise.map((p) => p.id),
  nichtGeprueft, ergebnis: probleme.length ? 'befund' : 'ok',
};

if (hat('--json')) {
  console.log(JSON.stringify(zusammenfassung, null, 2));
  process.exit(probleme.length ? 1 : 0);
}

console.log(`Slop Detect (Definitionen ${doku.definitionsVersion ?? 'unbekannt'}) gegen ${url}\n`);
console.log(`Design: ${designStufe}, bereinigt ${bereinigt} von 100 (Motor: ${entwurf.score}, ${entwurf.tier ?? stufe(entwurf.score)})`);
if (offen.length) {
  console.log('\nOffene Treffer:');
  for (const p of offen.sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))) {
    console.log(`  +${String(p.weight ?? 0).padStart(2)}  ${bezeichnung(p)}`);
    if (gegenmittel(p)) console.log(`       stattdessen: ${gegenmittel(p)}`);
  }
}
if (ausgenommen.length) {
  console.log('\nBegründet ausgenommen:');
  for (const p of ausgenommen) console.log(`  ${bezeichnung(p)}\n       Grund: ${ausnahmen[p.id]}`);
}
if (text) {
  console.log(`\nText: ${text.tier ?? 'n. v.'} (${text.score ?? 'n. v.'}), ${text.wordCount ?? '?'} Wörter${text.thin ? ', zu kurz für die Statistik' : ''}`);
  for (const p of artefakte) console.log(`  FEHLER  ${bezeichnung(p)}`);
  for (const p of textHinweise) console.log(`  Hinweis ${bezeichnung(p)}${gegenmittel(p) ? ` (${gegenmittel(p)})` : ''}`);
  console.log('  Die Textachse bewertet englische Prosa; für deutschen Text zusätzlich scripts/deslop-check.mjs.');
}
if (nichtGeprueft.length) {
  console.log('\nNicht geprüft:');
  for (const n of nichtGeprueft) console.log(`  ${n}`);
}

console.log('');
if (probleme.length) {
  console.log('BEFUND: ' + probleme.join('; '));
  console.log('Beheben und erneut laufen lassen. Ein Muster nicht gegen ein verwandtes tauschen.');
  process.exit(1);
}
console.log(offen.length ? 'In Ordnung, mit Warnungen. Vor der Übergabe mit --streng wiederholen.' : 'Keine offenen Treffer.');
process.exit(0);
