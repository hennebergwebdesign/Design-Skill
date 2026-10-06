#!/usr/bin/env node
/*
  deslop-check.mjs — prueft selbst formulierte Copy auf generischen KI-Klang.

  WARUM ES DIESES SKRIPT GIBT
  pruefe-striche.mjs findet das auffaelligste Merkmal maschinell geschriebener Texte, den
  Gedankenstrich. Es findet nicht das zweitauffaelligste: einen Text, der auf jede beliebige
  Firma passt. "Wir begleiten Sie ganzheitlich und maßgeschneidert auf Ihrem Weg zu
  nachhaltigem Erfolg" ist grammatisch einwandfrei, strichfrei und vollstaendig leer.

  Der Skill erlaubt eigene Textvorschlaege nur dort, wo eine Sektion sonst nicht funktioniert.
  Genau diese Vorschlaege gehen hier durch, bevor sie dem Kunden vorgelegt werden. Gelieferte
  Kundentexte werden NICHT geprueft und nicht umgeschrieben.

  FUENF KRITERIEN, JE EIN PUNKT
    1 Floskeln          ganzheitlich, maßgeschneidert, aus einer Hand, Ihr Partner für …
                        dazu sieben Satzmuster, an denen man KI-Text und überzogene Verkaufssprache erkennt: die Kontrastfigur
                        ("nicht X, sondern Y"), die Verneinungsreihe ("Kein Aufwand, keine
                        Wartezeit"), die selbstbeantwortete Frage ("Das Ergebnis? ...") und
                        der Dauerbrenner "In der heutigen ...", der Vorwurf an den Leser ("Die meisten
                        machen es falsch") und das absolute Versprechen ("über Nacht", "garantiert"),
                        beide aus 34-ueberzeugungsausloeser.md, und der Weichmacher ("eigentlich",
                        "vielleicht") aus 35-autoritaet-im-text.md. Quelle: copywriting und
                        copy-editing aus coreyhaines31/marketingskills, auf Deutsch übertragen
    2 Nominalstil       Substantivketten auf -ung, -heit, -keit statt Verben
    3 Superlative       beste, führend, einzigartig, optimal, ohne Beleg daneben
    4 Belegdichte       Behauptungen ohne eine einzige Zahl, Frist, Menge oder Ortsangabe
    5 Dreierfigur       "schnell, zuverlässig und persönlich" in Serie

  AUFRUF
    node scripts/deslop-check.mjs datei.astro [datei ...]
    node scripts/deslop-check.mjs --text "Wir begleiten Sie ganzheitlich."
    node scripts/deslop-check.mjs --min 4 datei.astro     schwaechere Schwelle

  EXIT
    0 = Schwelle erreicht (Standard 5 von 5) · 1 = darunter · 2 = Aufrufproblem
*/

import { readFileSync, existsSync } from 'node:fs';
import { relative } from 'node:path';

const args = process.argv.slice(2);
const minIndex = args.indexOf('--min');
const SCHWELLE = minIndex >= 0 ? Number(args[minIndex + 1]) : 5;
const textIndex = args.indexOf('--text');
const direkterText = textIndex >= 0 ? args[textIndex + 1] : null;
const dateien = args.filter((a, i) => {
  if (a.startsWith('--')) return false;
  if (minIndex >= 0 && i === minIndex + 1) return false;
  if (textIndex >= 0 && i === textIndex + 1) return false;
  return true;
});

if (!direkterText && !dateien.length) {
  console.error('Aufruf: node scripts/deslop-check.mjs <datei ...> | --text "…"');
  process.exit(2);
}

const FLOSKELN = [
  'ganzheitlich', 'maßgeschneidert', 'massgeschneidert', 'aus einer hand', 'rundum sorglos',
  'individuell auf sie zugeschnitten', 'passgenau', 'zukunftssicher', 'nachhaltigen erfolg',
  'ihr zuverlässiger partner', 'ihr partner für', 'ihr starker partner', 'kompetent und zuverlässig',
  'wir freuen uns auf sie', 'gemeinsam zum erfolg', 'auf ihrem weg', 'begleiten sie',
  'in der heutigen', 'schnelllebigen zeit', 'es ist wichtig zu', 'nicht nur, sondern auch',
  'innovativ', 'revolutionär', 'nahtlos', 'state of the art', 'mit herz und verstand',
  'volle bandbreite', 'ein starkes team', 'setzen neue maßstäbe', 'wir leben',
];
const SUPERLATIVE = [
  'beste', 'bester', 'bestes', 'beste qualität', 'höchste qualität', 'hoechste qualitaet',
  'führend', 'fuehrend', 'marktführer', 'marktfuehrer', 'einzigartig', 'optimal', 'perfekt',
  'unschlagbar', 'weltklasse', 'premium-qualität', 'langjährige erfahrung', 'langjaehrige erfahrung',
  'jahrelange erfahrung', 'absolute', 'maximale',
];
/* Satzmuster, die nach Maschine klingen. Jedes hat eine Gegenprobe: der Satz sagt dasselbe, wenn
   man die Verneinung oder die Frage streicht und direkt aussagt. */
const SATZMUSTER = [
  { name: 'Kontrastfigur', re: /\bnicht\b[^.!?;]{2,60},\s*sondern\b(?![^.!?;]*\bauch\b)/i,
    tipp: 'Nur das Zweite sagen: „Wir bauen Ihre Seite" statt „Wir bauen nicht irgendeine Seite, sondern Ihre."' },
  { name: 'Verneinungsreihe', re: /\b(?:kein\w*|ohne)\b[^.!?;]{1,40}[,.]\s*(?:kein\w*|ohne)\b/i,
    tipp: 'Sagen, was passiert, nicht was alles entfällt: „Sie bekommen Ihr Angebot am selben Tag."' },
  { name: 'Selbstbeantwortete Frage', re: /(?:^|[.!?]\s+)(?:das\s+|und\s+)?(?:ergebnis|resultat|fazit|warum|wieso|weshalb|der\s+grund)\s*\?\s+\S/i,
    tipp: 'Die Antwort ohne die Frage schreiben: „Das Ergebnis? Drei Tage schneller" wird zu „Drei Tage schneller".' },
  { name: 'Vorwurf an den Leser', re: /\b(?:die\s+meisten|viele|fast\s+alle)\s+[A-Za-zÄÖÜäöüß]+\s+(?:machen|erledigen|bauen|schreiben|planen)\b[^.!?;]{0,50}\b(?:falsch|verkehrt|schlecht)\b|\bsie\s+machen\b[^.!?;]{0,40}\b(?:falsch|verkehrt)\b/i,
    tipp: 'Die Lage benennen, nicht den Leser: „Für Betriebe, die ihre Seite haben und mehr Anfragen wollen" statt „Die meisten machen es falsch".' },
  { name: 'Absolutes Versprechen', re: /\b(?:über\s+nacht|garantiert(?:e[nrms]?)?|jede[rn]?\s+(?:unserer\s+)?kunden?|ohne\s+jedes\s+risiko)\b/i,
    tipp: 'Zeitrahmen, Quote und „mehr als" statt „alle" und „garantiert", und nur mit belegten Zahlen des Kunden. Eine Garantie steht nur da, wenn der Kunde sie gibt.' },
  { name: 'Weichmacher', re: /\b(?:eigentlich|irgendwie|quasi|sozusagen|gewissermaßen|gewissermassen|eventuell|vielleicht|möglicherweise|moeglicherweise|ein\s+bisschen|ein\s+wenig|(?:ich|wir)\s+(?:denken|glauben)|es\s+scheint)\b/i,
    tipp: 'Die Aussage ohne das Wort schreiben. Echte Unsicherheit einmal und konkret benennen („Das wissen wir nach der Messung“), nicht mit „vielleicht“ andeuten.' },
];
const NOMINAL = /\b\w{4,}(?:ung|heit|keit|ierung|barkeit)\b/gi;
const BELEG = /(\d[\d.,]*\s*(?:%|prozent|jahre?n?|monate?n?|wochen?|tage?n?|stunden?|minuten?|std|kunden|projekte?n?|mitarbeiter|standorte?n?|euro|eur|€|km|m²|qm|kw|mwst)|\b(?:seit|ab)\s+\d{4}\b|\b\d{4}\b|\b\d{2}:\d{2}\b)/gi;
/* drei durch Komma getrennte Glieder, letztes mit "und": "schnell, sauber und pünktlich" */
const DREIER = /\b([A-Za-zÄÖÜäöüß]{4,})\s*,\s*([A-Za-zÄÖÜäöüß]{4,})\s+und\s+([A-Za-zÄÖÜäöüß]{4,})\b/g;

function textAus(inhalt) {
  return inhalt
    .replace(/^---[\s\S]*?---/m, ' ')          // Astro- und Markdown-Frontmatter
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')                  // Tags, Attribute bleiben draussen
    .replace(/\{[^}]*\}/g, ' ')                // JSX- und Astro-Ausdruecke
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function treffer(text, begriffe) {
  const klein = text.toLowerCase();
  return begriffe.filter((b) => klein.includes(b));
}

function pruefe(name, roh) {
  const text = textAus(roh);
  const woerter = text.split(/\s+/).filter(Boolean).length;
  const befunde = [];
  let punkte = 0;

  const floskeln = treffer(text, FLOSKELN);
  const muster = SATZMUSTER.filter((m) => m.re.test(text));
  floskeln.length || muster.length
    ? befunde.push({ k: 'Floskeln', fund: [...floskeln.slice(0, 6), ...muster.map((m) => m.name)].join(', '),
        tipp: muster.length ? muster.map((m) => `${m.name}: ${m.tipp}`).join(' ') : 'Die Floskel durch den konkreten Vorgang ersetzen, den der Kunde tatsächlich leistet.' })
    : punkte++;

  const nominal = text.match(NOMINAL) ?? [];
  const nominalAnteil = woerter ? nominal.length / woerter : 0;
  nominalAnteil > 0.06 && nominal.length >= 3
    ? befunde.push({ k: 'Nominalstil', fund: `${nominal.length} Substantivierungen auf ${woerter} Wörter: ${[...new Set(nominal)].slice(0, 6).join(', ')}`,
        tipp: 'Substantive in Verben zurückverwandeln: "Die Umsetzung erfolgt" wird zu "Wir setzen um".' })
    : punkte++;

  const superlative = treffer(text, SUPERLATIVE);
  superlative.length ? befunde.push({ k: 'Superlative', fund: superlative.slice(0, 6).join(', '),
    tipp: 'Superlativ streichen oder belegen. Ohne Beleg ist er nach § 5 UWG angreifbar.' }) : punkte++;

  const belege = text.match(BELEG) ?? [];
  woerter >= 25 && belege.length === 0
    ? befunde.push({ k: 'Belegdichte', fund: `keine einzige Zahl, Frist oder Ortsangabe auf ${woerter} Wörter`,
        tipp: 'Eine konkrete Angabe einsetzen. Fehlt sie, gehört dort [[FEHLT: …]] hin, kein Adjektiv.' })
    : punkte++;

  const dreier = [...text.matchAll(DREIER)].map((m) => m[0]);
  dreier.length >= (woerter > 120 ? 2 : 1)
    ? befunde.push({ k: 'Dreierfigur', fund: dreier.slice(0, 4).join(' | '),
        tipp: 'Eine Dreierfigur ist Rhythmus, zwei sind ein Muster. Eine davon auflösen.' })
    : punkte++;

  return { name, woerter, punkte, befunde };
}

const ergebnisse = [];
if (direkterText) ergebnisse.push(pruefe('--text', direkterText));
for (const datei of dateien) {
  if (!existsSync(datei)) { console.error(`Nicht gefunden: ${datei}`); process.exit(2); }
  ergebnisse.push(pruefe(relative(process.cwd(), datei), readFileSync(datei, 'utf8')));
}

let durchgefallen = 0;
for (const e of ergebnisse) {
  console.log(`\n${e.name}  (${e.woerter} Wörter)`);
  console.log(`  ${e.punkte} von 5`);
  for (const b of e.befunde) {
    console.log(`  ✗ ${b.k}: ${b.fund}`);
    console.log(`    → ${b.tipp}`);
  }
  if (!e.befunde.length) console.log('  ✓ alle fünf Kriterien erfüllt');
  if (e.punkte < SCHWELLE) durchgefallen++;
}

console.log(
  durchgefallen
    ? `\n${durchgefallen} von ${ergebnisse.length} unter der Schwelle von ${SCHWELLE} von 5. Nicht glätten, sondern konkret machen: Zahl statt Adjektiv, Vorgang statt Substantiv, Zielgruppe statt Allgemeinheit.`
    : `\nAlle ${ergebnisse.length} bei mindestens ${SCHWELLE} von 5.`
);

process.exit(durchgefallen ? 1 : 0);
