#!/usr/bin/env node
/*
  pruefe-striche.mjs — findet Gedankenstriche im Seitentext.

  WARUM ES DIESES SKRIPT GIBT
  Der Gedankenstrich als Satzzeichen ist das stärkste Erkennungsmerkmal maschinell
  geschriebener Texte, im Deutschen noch mehr als im Englischen:

      "Schnelle Websites — die auch Anfragen bringen"
      "Ihr Partner für Sanierung – zuverlässig, termingerecht"

  Beides liest sich sofort generiert. Eine Regel ohne Prüfung wird in Sitzung drei
  zurückgedreht, deshalb prüft das hier eine Maschine.

  WAS GEPRÜFT WIRD
    1. Halbgeviertstrich (–, U+2013) und Geviertstrich (—, U+2014) im Textinhalt.
       In Überschriften, Buttons, Links und Kicker-/Eyebrow-Labels ist der Befund
       ein FEHLER, im Fließtext eine WARNUNG.
    2. hyphens: auto im CSS — trennt deutsche Komposita mitten im Wort
       ("Ethy-len", "Verschmut-zung").
    3. Verbotene Wörter aus marke.json → sprache.verbotene_woerter.
    4. Bindestrich mit Leerzeichen auf beiden Seiten zwischen Wörtern ("Dach - Sanierung"),
       der Ersatz für den Gedankenstrich, wenn die Tastatur keinen hat. In Überschrift,
       Button, Link und Kicker ein FEHLER, im Text von Markup- und Markdowndateien eine
       WARNUNG. Code (calc, Subtraktion) wird nicht gelesen.
    5. Zierstrich: ein gestalteter Strich als Element, nicht als Zeichen. Gleiche Regel, anderer
       Weg ins Bild: das gelbe Linienstück vor dem Kicker ("━━ Hersteller aus Bielefeld, seit 2005"),
       gebaut als ::before oder ::after mit leerem content, kleiner Höhe, Breite und Fläche,
       als leeres Element vor dem Text oder als Tailwind before: und after: Klassen. Am Kicker ein
       FEHLER, an einer Überschrift eine WARNUNG. Ein Punkt (Breite gleich Höhe) ist kein Strich.
       Auch content: "—" oder "-" vor dem Kicker ist ein FEHLER. Die Unterstreichung eines
       Navigationspunkts oder Links gehört nicht dazu, sie hängt an keinem Kicker.

  HOOK
    Mit --hook liest das Skript die Eingabe eines Claude-Code-Hooks von stdin
    (tool_input.file_path) und prüft nur diese Datei. Fehler gehen nach stderr, Exit 2, damit
    das Modell sie sieht und behebt. Warnungen halten nicht auf. Einrichtung in
    agentur-website-builder/references/qa-und-abnahme.md, Abschnitt 2a.

  WAS NICHT GEPRÜFT WIRD
    Der echte Bindestrich im Kompositum ("E-Mail-Adresse") bleibt erlaubt.
    Das Skript kennt ihn nicht als Befund.

  AUFRUF
    node scripts/pruefe-striche.mjs [pfad ...]        Standard: src content app pages
    node scripts/pruefe-striche.mjs --marke pfad/marke.json
    node scripts/pruefe-striche.mjs --strict          Warnungen zählen wie Fehler
    node scripts/pruefe-striche.mjs --hook            als PostToolUse-Hook, Eingabe von stdin

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem, im Hook: Fehler gefunden
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

const HALBGEVIERT = '–';
const GEVIERT = '—';
const MINUS = '−';
const STRICHE = [HALBGEVIERT, GEVIERT, MINUS];
const STRICH_NAME = { [HALBGEVIERT]: 'Halbgeviertstrich –', [GEVIERT]: 'Geviertstrich —', [MINUS]: 'Minuszeichen −' };

const TEXT_ENDUNGEN = new Set(['.astro', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.md', '.mdx', '.json', '.yaml', '.yml', '.ts', '.js']);
const CSS_ENDUNGEN = new Set(['.css', '.scss', '.pcss', '.astro', '.vue', '.svelte']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'dist', 'build', '.astro', '.next', '.output', '.cache', 'coverage', 'vendor', 'results']);

const args = process.argv.slice(2);
const strict = args.includes('--strict');
let markePfad = null;
const mi = args.indexOf('--marke');
if (mi !== -1) markePfad = args[mi + 1];
/* Ohne --marke ist mi = -1, also mi + 1 = 0: ein naives i !== mi + 1 würde
   dann das ERSTE Pfadargument verschlucken. Deshalb der Index nur, wenn
   --marke wirklich vorkommt. */
const markeIndex = mi === -1 ? -1 : mi + 1;
const pfade = args.filter((a, i) => !a.startsWith('--') && i !== markeIndex);

const hook = args.includes('--hook');
let hookDatei = null;
if (hook) {
  /* Ein Hook darf nie wegen eines Lesefehlers die Arbeit blockieren: ohne lesbare
     Eingabe oder bei einer Datei, die kein Text ist, endet er still mit 0. */
  try { hookDatei = JSON.parse(readFileSync(0, 'utf8'))?.tool_input?.file_path ?? null; } catch { hookDatei = null; }
  const endung = hookDatei ? extname(hookDatei) : '';
  if (!hookDatei || !existsSync(hookDatei) || !(TEXT_ENDUNGEN.has(endung) || CSS_ENDUNGEN.has(endung))
      || hookDatei.split(/[\\/]/).some((teil) => UEBERSPRINGEN.has(teil))) process.exit(0);
}

const STANDARD_PFADE = ['src', 'content', 'app', 'pages', 'components'];
const wurzeln = hook ? [hookDatei] : (pfade.length ? pfade : STANDARD_PFADE).filter(existsSync);

if (!wurzeln.length) {
  console.error('Kein Quellordner gefunden. Erwartet einen von: ' + STANDARD_PFADE.join(', '));
  console.error('Oder Pfad angeben: node scripts/pruefe-striche.mjs pfad/zum/ordner');
  process.exit(2);
}

/* Verbotene Wörter aus dem Markenbrief laden, wenn vorhanden. */
let verboteneWoerter = [];
let markeQuelle = null;
for (const kandidat of [markePfad, 'marke.json', 'src/marke.json', 'src/data/marke.json'].filter(Boolean)) {
  if (!existsSync(kandidat)) continue;
  try {
    const marke = JSON.parse(readFileSync(kandidat, 'utf8'));
    verboteneWoerter = (marke?.sprache?.verbotene_woerter ?? []).filter((w) => typeof w === 'string' && w.trim());
    markeQuelle = kandidat;
  } catch (e) {
    console.error(`Warnung: ${kandidat} ist kein gültiges JSON (${e.message}), Wortliste übersprungen.`);
  }
  break;
}

function dateienSammeln(wurzel) {
  const gefunden = [];
  const lauf = (p) => {
    let eintraege;
    try { eintraege = readdirSync(p, { withFileTypes: true }); } catch { return; }
    for (const e of eintraege) {
      if (e.name.startsWith('.') && e.name !== '.well-known') continue;
      const voll = join(p, e.name);
      if (e.isDirectory()) {
        if (!UEBERSPRINGEN.has(e.name)) lauf(voll);
      } else if (TEXT_ENDUNGEN.has(extname(e.name)) || CSS_ENDUNGEN.has(extname(e.name))) {
        gefunden.push(voll);
      }
    }
  };
  try { statSync(wurzel).isDirectory() ? lauf(wurzel) : gefunden.push(wurzel); } catch {}
  return gefunden;
}

/*
  Kontextbewertung. Ein Strich in einer Überschrift oder einem Button ist ein Fehler,
  im Fließtext eine Warnung: dort ist er manchmal ein Zitat oder ein Bereichsstrich
  ("10–12 Uhr"), und das soll ein Mensch entscheiden.
*/
const HART = [
  { re: /<h[1-6][^>]*>/i, was: 'Überschrift' },
  { re: /<button[^>]*>/i, was: 'Button' },
  { re: /<a\b[^>]*>/i, was: 'Link' },
  { re: /\b(title|headline|subheadline|ueberschrift|titel|cta|buttontext|label|alt|aria-label)\s*[:=]/i, was: 'Titel- oder Buttonfeld' },
  { re: /^\s{0,3}#{1,6}\s/, was: 'Markdown-Überschrift' },
  { re: /class\s*=\s*["'][^"']*\b(kicker|eyebrow|overline|vorspann|ueberzeile)\b/i, was: 'Kicker- oder Eyebrow-Label' },
];

function kontext(zeile) {
  for (const h of HART) if (h.re.test(zeile)) return h.was;
  return null;
}

/* Bindestrich mit Leerzeichen zwischen zwei Wörtern: der Gedankenstrich der Tastatur.
   Links ein Buchstabe oder eine Ziffer, rechts ein Buchstabe, damit calc(100% - 2rem),
   x - 1 und Aufzählungen am Zeilenanfang nicht zählen. */
const LEER_STRICH = /[\p{L}\d][!?.,"“”]? - \p{L}/u;
const MARKUP_ENDUNGEN = new Set(['.astro', '.html', '.htm', '.vue', '.svelte', '.jsx', '.tsx']);
const MARKDOWN_ENDUNGEN = new Set(['.md', '.mdx']);

/* Sichtbarer Text einer Zeile: in Markdown die Zeile ohne Code, in Markup nur, was zwischen
   > und < steht und keine geschweifte Klammer enthält (Ausdrücke in Astro und JSX). */
function textTeile(zeile, endung) {
  if (MARKDOWN_ENDUNGEN.has(endung)) return [zeile.replace(/`[^`]*`/g, '')];
  if (!MARKUP_ENDUNGEN.has(endung)) return [];
  const ohneCode = zeile.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  return [...ohneCode.matchAll(/>([^<>{}]+)</g)].map((m) => m[1]);
}

/* Bereichsangaben sind legitim: 10–12, 2013–2026, 5–7 Tage. */
const BEREICH = new RegExp(`\\d\\s?[${HALBGEVIERT}${GEVIERT}]\\s?\\d`);


/*
  5 Zierstrich (Kicker und Überschrift). Liest den ganzen Text einer Datei, weil ein Selektor und
  sein Block über mehrere Zeilen laufen. Kommentare werden vorher durch Leerraum ersetzt.
*/
const KICKER_SEL = /(kicker|eyebrow|overline|ueberzeile|vorspann|dachzeile|tagline|subline|pretitle)/i;
const TITEL_SEL = /(^|[^\w-])h[1-6]\b|headline|sektionskopf|section-head|(^|[^\w-])title\b|(^|[^\w-])titel\b/i;
const STRICH_WORT = /(?:strich|balken|linie|line|dash|bar|rule|divider|trenner|marke)/i;
const STRICH_ZEICHEN = '[-–—−‒―]';

function ohneKommentare(t) {
  return t.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}
function zeileVon(text, index) { return text.slice(0, index).split('\n').length; }
/* Zahl mit Einheit in Pixel, grob: 1rem und 1em gelten als 16. Ohne lesbare Einheit null. */
function pixel(wert) {
  const m = /^\s*(-?[\d.]+)\s*(px|rem|em)?\s*$/.exec(wert || '');
  if (!m) return null;
  const n = parseFloat(m[1]);
  return m[2] === 'rem' || m[2] === 'em' ? n * 16 : n;
}
function eigenschaft(block, namen) {
  const m = new RegExp(`(?<![-\\w])(?:${namen})\\s*:\\s*([^;}]+)`, 'i').exec(block);
  return m ? m[1].trim() : null;
}

export function zierstricheFinden(roh) {
  const text = ohneKommentare(roh);
  const funde = [];

  // a) CSS: Pseudoelement an Kicker oder Überschrift
  for (const m of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].split('\n').pop().trim() && m[1];
    const teile = m[1].split(',').map((t) => t.trim()).filter(Boolean);
    const treffer = teile.filter((t) => /::?(before|after)\b/i.test(t));
    if (!treffer.length) continue;
    const alsKicker = treffer.some((t) => KICKER_SEL.test(t));
    const alsTitel = !alsKicker && treffer.some((t) => TITEL_SEL.test(t));
    if (!alsKicker && !alsTitel) continue;
    const block = m[2];
    const inhalt = eigenschaft(block, 'content');
    const index = m.index + m[1].length - m[1].trimStart().length;
    // Strichzeichen als Inhalt des Pseudoelements
    if (inhalt && new RegExp(`^(['"])\\s*${STRICH_ZEICHEN}`).test(inhalt)) {
      funde.push({ index, fehler: alsKicker, meldung: `Strichzeichen als content vor ${alsKicker ? 'Kicker' : 'Überschrift'}: ${inhalt}` });
      continue;
    }
    if (!inhalt || !/^(''|"")$/.test(inhalt)) continue;
    const h = pixel(eigenschaft(block, 'height|block-size'));
    const bRaw = eigenschaft(block, 'width|inline-size');
    const b = pixel(bRaw);
    const rand = eigenschaft(block, 'border-top|border-bottom|border-block-start|border-block-end');
    const rh = rand ? pixel((/^\s*([\d.]+(?:px|rem|em)?)/.exec(rand) || [])[1]) : null;
    const flaeche = eigenschaft(block, 'background|background-color|background-image');
    const dicke = h ?? rh;
    if (dicke === null || dicke > 8) continue;
    if (!bRaw) continue;
    if (b !== null && b < dicke * 2) continue; // Punkt, kein Strich
    if (!flaeche && !rand) continue;
    funde.push({ index, fehler: alsKicker, meldung: `Zierstrich (${bRaw} breit, ${Math.round(dicke)} px hoch) als ${/::?after/i.test(treffer[0]) ? '::after' : '::before'} an ${alsKicker ? 'Kicker' : 'Überschrift'}: ${treffer[0].slice(0, 60)}` });
  }

  // b) Markup: leeres Strichelement als erstes Kind eines Kickers oder direkt vor Kicker oder Überschrift
  const leer = `<(span|i|b|div|hr)\\b[^>]*?(?:class\\s*=\\s*["'][^"']*${STRICH_WORT.source}[^"']*["'])?[^>]*?(?:/>|>\\s*</\\1>)`;
  const kickerKlasse = '(?:kicker|eyebrow|overline|ueberzeile|vorspann|dachzeile|tagline)';
  const reInnen = new RegExp(`<(?:p|span|div|h[1-6])\\b[^>]*class\\s*=\\s*["'][^"']*${kickerKlasse}[^"']*["'][^>]*>\\s*(${leer.replace('\\1', '\\2')})`, 'gi');
  for (const m of text.matchAll(reInnen)) {
    const kind = m[1];
    if (/^<hr\b/i.test(kind) || STRICH_WORT.test(kind)) funde.push({ index: m.index, fehler: true, meldung: 'Leeres Strichelement als erstes Kind eines Kickers' });
  }
  const reDavor = new RegExp(`(<(?:span|i|b|div|hr)\\b[^>]*class\\s*=\\s*["'][^"']*${STRICH_WORT.source}[^"']*["'][^>]*?(?:/>|>\\s*</(?:span|i|b|div)>))\\s*<(h[1-6]|p[^>]*class\\s*=\\s*["'][^"']*${kickerKlasse})`, 'gi');
  for (const m of text.matchAll(reDavor)) {
    funde.push({ index: m.index, fehler: !/^h[1-6]/i.test(m[2]), meldung: `Leeres Strichelement direkt vor ${/^h[1-6]/i.test(m[2]) ? 'einer Überschrift' : 'einem Kicker'}` });
  }

  // c) Tailwind: before: und after: Klassen, die einen Strich bauen
  for (const m of text.matchAll(/<(\w+)\b[^>]*?class\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/gi)) {
    const k = m[2] ?? m[3] ?? m[4] ?? '';
    if (!/(?:before|after):content-\[(?:''|""|&quot;&quot;)\]/.test(k)) continue;
    const dick = /(?:before|after):h-(?:px|0\.5|1|\[[1-8]px\])\b/.test(k);
    const breit = /(?:before|after):w-(?!px\b|0\.5\b|1\b|\[[1-8]px\])/.test(k);
    const flaeche = /(?:before|after):bg-/.test(k);
    if (!(dick && breit && flaeche)) continue;
    const kicker = /(kicker|eyebrow|overline|uppercase|tracking-)/i.test(k) || KICKER_SEL.test(k);
    const titel = /^h[1-6]$/i.test(m[1]);
    if (kicker || titel) funde.push({ index: m.index, fehler: kicker && !titel, meldung: `Zierstrich über Tailwind (before: oder after:) an ${titel ? 'Überschrift' : 'Kicker'}` });
  }
  return funde.map((f) => ({ ...f, zeile: zeileVon(text, f.index), auszug: roh.split('\n')[zeileVon(text, f.index) - 1]?.trim().slice(0, 110) ?? '' }));
}

const fehler = [];
const warnungen = [];
let dateienGeprueft = 0;

for (const wurzel of wurzeln) {
  for (const datei of dateienSammeln(wurzel)) {
    let inhalt;
    try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
    dateienGeprueft++;
    const rel = relative(process.cwd(), datei);
    const zeilen = inhalt.split('\n');
    const istCss = CSS_ENDUNGEN.has(extname(datei));
    /*
      Blockkommentar-Zustand ueber Zeilen hinweg verfolgen. Ein Praefix-Test je
      Zeile reicht nicht: ein /* ... *​/-Block ohne fuehrende Sternchen sieht in
      der Mitte wie normaler Code aus. Genau daran meldete das Skript den
      Kommentar, der erklaert, warum hyphens: auto verboten ist.
    */
    let imBlock = false;
    /* Code innerhalb einer Markupdatei: Frontmatter zwischen ---, mehrzeilige <script>-
       und <style>-Blöcke. Dort ist " - " eine Subtraktion, kein Satzzeichen. */
    let imCode = false;
    let frontmatter = MARKUP_ENDUNGEN.has(extname(datei)) && zeilen[0]?.trim() === '---';

    zeilen.forEach((zeile, i) => {
      const nr = i + 1;

      /* 1 Gedankenstriche */
      for (const s of STRICHE) {
        if (!zeile.includes(s)) continue;
        const ort = kontext(zeile);
        const nurBereich = BEREICH.test(zeile) && (zeile.match(new RegExp(`[${HALBGEVIERT}${GEVIERT}${MINUS}]`, 'g')) || []).length === (zeile.match(new RegExp(BEREICH, 'g')) || []).length;
        if (nurBereich && !ort) continue;
        const befund = {
          datei: rel, zeile: nr, auszug: zeile.trim().slice(0, 110),
          meldung: `${STRICH_NAME[s]}${ort ? ` in ${ort}` : ' im Text'}`,
          tipp: 'Ersatz: Doppelpunkt, Komma oder zwei Sätze.',
        };
        (ort ? fehler : warnungen).push(befund);
      }

      /*
        2 hyphens: auto

        Kommentarzeilen ausnehmen. Sonst meldet das Skript genau den Kommentar,
        der erklaert, warum hyphens: auto verboten ist — ein Fehlalarm, der die
        Regel unglaubwuerdig macht.
      */
      const startetBlock = zeile.includes('/*') && !zeile.includes('*/');
      const istKommentar = imBlock
        || /^\s*(\/\*|\*|\/\/|<!--)/.test(zeile)
        || (zeile.includes('/*') && zeile.indexOf('/*') < zeile.search(/hyphens/i));
      if (startetBlock) imBlock = true;
      else if (imBlock && zeile.includes('*/')) imBlock = false;
      if (istCss && !istKommentar && /hyphens\s*:\s*(auto|manual)/i.test(zeile) && !/hyphens\s*:\s*none/i.test(zeile)) {
        fehler.push({
          datei: rel, zeile: nr, auszug: zeile.trim().slice(0, 110),
          meldung: 'hyphens: auto trennt deutsche Komposita mitten im Wort',
          tipp: 'Stattdessen overflow-wrap: break-word plus text-wrap: pretty.',
        });
      }

      /* 4 Bindestrich mit Leerzeichen als Gedankenstrich */
      const warImCode = imCode || frontmatter;
      if (frontmatter && i > 0 && zeile.trim() === '---') frontmatter = false;
      if (/<(script|style)\b/i.test(zeile) && !/<\/(script|style)>/i.test(zeile)) imCode = true;
      else if (imCode && /<\/(script|style)>/i.test(zeile)) imCode = false;
      if (!warImCode && (!istCss || MARKUP_ENDUNGEN.has(extname(datei)))) {
        const ort = kontext(zeile);
        const teile = ort ? [zeile.replace(/<[^>]*>/g, ' ')] : textTeile(zeile, extname(datei));
        if (!/^\s*(\/\/|\*|\/\*|<!--)/.test(zeile) && !imBlock && teile.some((t) => LEER_STRICH.test(t))) {
          (ort ? fehler : warnungen).push({
            datei: rel, zeile: nr, auszug: zeile.trim().slice(0, 110),
            meldung: `Bindestrich mit Leerzeichen als Gedankenstrich${ort ? ` in ${ort}` : ' im Text'}`,
            tipp: 'Derselbe Strich mit anderer Taste. Ersatz: Doppelpunkt, Komma oder zwei Sätze.',
          });
        }
      }

      /* 3 Verbotene Wörter */
      for (const w of verboteneWoerter) {
        const re = new RegExp(`(^|[^\\p{L}])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'iu');
        if (re.test(zeile)) {
          warnungen.push({
            datei: rel, zeile: nr, auszug: zeile.trim().slice(0, 110),
            meldung: `Verbotenes Wort aus marke.json: „${w}"`,
            tipp: 'Konkret benennen, was gemeint ist.',
          });
        }
      }
    });

    /* 5 Zierstrich: dateiweit, nicht zeilenweise */
    for (const z of zierstricheFinden(inhalt)) {
      (z.fehler ? fehler : warnungen).push({
        datei: rel, zeile: z.zeile, auszug: z.auszug, meldung: z.meldung,
        tipp: 'Kein Strich vor dem Kicker, auch kein Linienstück in Akzentfarbe. Der Kicker steht ohne Präfix, die Überschrift trägt die Sektion.',
      });
    }
  }
}

if (hook) {
  /* Im Hook zählen nur Fehler. Warnungen sind Urteilsfragen und gehören in den vollen Lauf. */
  if (fehler.length) {
    console.error(`pruefe-striche: ${fehler.length} Fehler in ${hookDatei}`);
    for (const b of fehler) console.error(`  Zeile ${b.zeile}: ${b.meldung}\n    ${b.auszug}\n    → ${b.tipp}`);
    console.error('Harte Grenze: keine Gedankenstriche im Seitentext (webdesign-conversion/SKILL.md). Bitte jetzt beheben.');
    process.exit(2);
  }
  process.exit(0);
}

function ausgeben(titel, liste) {
  if (!liste.length) return;
  console.log(`\n${titel} (${liste.length})`);
  for (const b of liste) {
    console.log(`  ${b.datei}:${b.zeile}  ${b.meldung}`);
    console.log(`    ${b.auszug}`);
    console.log(`    → ${b.tipp}`);
  }
}

console.log(`Geprüft: ${dateienGeprueft} Dateien in ${wurzeln.join(', ')}`);
if (markeQuelle) console.log(`Wortliste aus ${markeQuelle}: ${verboteneWoerter.length} Einträge`);
else console.log('Keine marke.json gefunden, Wortprüfung übersprungen.');

ausgeben('FEHLER', fehler);
ausgeben('WARNUNGEN', warnungen);

const zaehlt = strict ? fehler.length + warnungen.length : fehler.length;
if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.${strict ? ' (--strict: Warnungen zählen)' : ''}`);
process.exit(zaehlt ? 1 : 0);
