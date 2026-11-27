#!/usr/bin/env node
/*
  bibliothek-abschnitte-migration.mjs — zieht ältere Vorlagen in den Baukasten nach.

  WARUM ES DIESES SKRIPT GIBT
  Ab t112 liefert jede Vorlage ABSCHNITTE.json und data-abschnitt Marken, von Hand und mit einem
  eigenen Satz zum Prinzip je Abschnitt. t01 bis t111 entstanden davor. Dieses Skript holt sie
  mechanisch nach, damit `bibliothek-abschnitte.mjs` über alle Vorlagen antworten kann.

  WAS ES TUT
  - findet je HTML Datei (index.html, v2.html, v3.html ...) die Abschnitte der obersten Ebene
    (header, section, footer), in Reihenfolge
  - vergibt eine Kennung aus der CSS Klasse (die erste Klasse, die nicht nur "sektion" heißt)
  - setzt die Kategorie aus Klasse, Anker und Überschrift nach einer Wortliste (taxonomie.json)
  - schreibt `data-abschnitt="<kennung>"` in das öffnende Tag, sonst ändert es nichts am HTML
  - schreibt ABSCHNITTE.json je Vorlage

  WAS ES NICHT TUT, UND DAS STEHT IN DER DATEI
  Der Satz zum Prinzip ist ein Standardsatz je Kategorie, keine Analyse dieses Abschnitts
  (`prinzip_quelle: "kategorie-standard"`). Die Kategorie ist eine Vermutung aus Wörtern
  (`kategorie_quelle: "wortliste"`). Beides ist Wegweiser, kein Befund. Wer einen Abschnitt
  wirklich übernimmt, liest ihn und die INFO.md der Vorlage. Von Hand gepflegte Dateien
  (ohne diese Marker) werden nie überschrieben, und Vorlagen mit vorhandener ABSCHNITTE.json
  werden übersprungen, außer mit --neu.

  AUFRUF
    node scripts/bibliothek-abschnitte-migration.mjs --trocken     zeigt, was passieren würde
    node scripts/bibliothek-abschnitte-migration.mjs               führt aus
    node scripts/bibliothek-abschnitte-migration.mjs --nur t01,t30
    node scripts/bibliothek-abschnitte-migration.mjs --neu         erzeugt auch vorhandene neu,
                                                                   die selbst automatisch erzeugt wurden

  EXIT
    0 = erledigt · 1 = Befunde · 2 = Aufrufproblem
*/

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const BIB = join(WURZEL, 'skills', 'webdesign-conversion', 'assets', 'vorlagen', 'bibliothek');
const TAXONOMIE = join(WURZEL, 'skills', 'webdesign-conversion', 'assets', 'musterbibliothek', 'taxonomie.json');

const args = process.argv.slice(2);
const trocken = args.includes('--trocken');
const neu = args.includes('--neu');
const nurIdx = args.indexOf('--nur');
const nur = nurIdx >= 0 ? args[nurIdx + 1].split(',') : null;

const STANDARDSATZ = {
  navigation: 'Die Kopfzeile hält Orientierung und die Hauptaktion in jedem Bildschirm erreichbar.',
  hero: 'Der erste Bildschirm trägt eine Aussage und eine Hauptaktion, bevor etwas anderes gelesen wird.',
  trust: 'Ein unmittelbarer Beleg beantwortet die Frage nach Seriosität, bevor sie gestellt wird.',
  problem: 'Die Ausgangslage wird benannt, damit die Lösung als Antwort und nicht als Behauptung gelesen wird.',
  features: 'Merkmale werden als überschaubare Einheiten gezeigt, jede mit einem Nutzen statt nur einer Eigenschaft.',
  benefits: 'Der Nutzen wird aus Sicht der Zielgruppe benannt, nicht aus Sicht des Anbieters.',
  product: 'Das Angebot wird konkret gezeigt, mit Auswahl und einem klaren nächsten Schritt.',
  services: 'Leistungen stehen als vergleichbare Einheiten nebeneinander, jede mit eigenem Weg.',
  process: 'Ein überschaubarer Ablauf nimmt die Angst vor dem Aufwand, bevor die Handlung verlangt wird.',
  about: 'Haltung und Herkunft geben dem Anbieter ein Gesicht, bevor Leistungen verglichen werden.',
  team: 'Namen und Gesichter machen Ansprechpartner greifbar und senken die Hürde zum Kontakt.',
  cases: 'Konkrete Arbeiten belegen die Aussage besser als eine Behauptung, jede mit eigenem Weg.',
  portfolio: 'Bilder zeigen das Ergebnis, die Auswahl ist überschaubar und vergleichbar.',
  testimonials: 'Fremde Stimmen belegen, was der Anbieter selbst nur behaupten könnte.',
  pricing: 'Preise oder Pakete werden offen und vergleichbar gezeigt, damit die Entscheidung ohne Anruf möglich ist.',
  comparison: 'Ein Vergleich macht den Unterschied sichtbar, den eine Aufzählung nur behauptet.',
  faq: 'Einwände werden vor der Handlung beantwortet, in der Reihenfolge ihres Gewichts.',
  forms: 'Der Weg zur Anfrage ist kurz, erklärt jedes Feld und nennt, was danach geschieht.',
  cta: 'Die Handlung steht als eigener Abschnitt, mit einem Grund, jetzt zu handeln.',
  footer: 'Der Fuß liefert Kontakt, Pflichtseiten und die zweite Chance zur Handlung.',
  interactive: 'Eine bedienbare Fläche lässt die Besucher das Angebot selbst ausprobieren.',
  editorial: 'Inhalte zeigen Fachwissen und halten die Seite für Suche und Wiederkehr lebendig.',
  technical: 'Daten und Spezifikation stehen nachprüfbar nebeneinander.',
  ecommerce: 'Produkte stehen mit Auswahl und Kaufweg im Blick.',
  recruiting: 'Stellen und Arbeitgeberversprechen stehen mit klarem Bewerbungsweg nebeneinander.',
};

// Reihenfolge zählt: das erste Treffermuster gewinnt.
const WORTLISTE = [
  ['faq', /faq|fragen|haeufig|einwand/],
  ['testimonials', /stimme|bewertung|rezension|zitat|testimonial|kundenmeinung|erfahrung/],
  ['pricing', /preis|paket|tarif|abo|mitglied|kosten|honorar/],
  ['process', /prozess|vorgehen|ablauf|schritte|so-arbeit|weg-|ablauf|werkstatt-ablauf|programm|reiter|zeitachse|kurs/],
  ['comparison', /vergleich|vorher|nachher|gegenueber/],
  ['team', /team|menschen|mannschaft|koepfe|ansprechpartner|praxis-team/],
  ['recruiting', /karriere|stellen|jobs|bewerb/],
  ['forms', /kontakt|anfrage|termin|formular|buchung|rueckruf|reservier|angebot-anfordern|beratung-buchen|newsletter|rundbrief|anmeld/],
  ['trust', /zahlen|kennzahl|logos|partner|siegel|zertifik|presse|vertrauen|auszeichnung|zusagen|garantie|belege|marken/],
  ['cases', /faelle|projekte|ergebnisse|referenz|fallstud|erfolge|arbeiten/],
  ['portfolio', /galerie|portfolio|bilder|film|fotos|impressionen/],
  ['editorial', /ratgeber|beitraege|blog|journal|magazin|news|artikel|wissen/],
  ['problem', /problem|schmerz|ausgangslage|herausforderung|warum-jetzt/],
  ['benefits', /warum|vorteile|nutzen|mehrwert|darum|versprechen|werte/],
  ['features', /funktion|merkmal|feature|leistungsmerkmale|technik|ausstattung|details/],
  ['product', /produkt|sortiment|shop|angebote|menue|karte-speise|speisekarte|zimmer|wohnen|modelle/],
  ['services', /leistung|angebot|services|kacheln|ziele|behandlung|bereiche|loesung|themen|kurse|tafel|felder|sparten|schwerpunkte/],
  ['about', /ueber|leitsatz|haltung|geschichte|einstieg|intro|philosophie|wir-|manifest|aussage|standort|anfahrt|oeffnungszeiten/],
  ['cta', /abschluss|aufruf|cta|schluss|bereit/],
];

const GENERISCH = new Set(['sektion', 'sek', 'wrap', 'container', 'abschnitt', 'block', 'bereich']);
const slug = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const entitaeten = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&shy;/g, '').replace(/&#?\w+;/g, ' ');
const text = (html) => entitaeten(html.replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

export function abschnitteFinden(html) {
  const re = /<(\/?)(section|header|footer|article)\b([^>]*)>/gi;
  const gefunden = [];
  let tiefe = 0, offen = null, m;
  while ((m = re.exec(html))) {
    const [ganz, schluss, tag, attr] = m;
    if (!schluss) {
      if (tiefe === 0) offen = { tag: tag.toLowerCase(), attr, start: m.index, endeTag: m.index + ganz.length };
      tiefe++;
    } else {
      tiefe--;
      if (tiefe === 0 && offen) {
        gefunden.push({ ...offen, ende: m.index, innen: html.slice(offen.endeTag, m.index) });
        offen = null;
      }
    }
  }
  return gefunden.filter((a) => a.tag !== 'article');
}

export function kategorieRaten(tag, klassen, anker, ueberschrift) {
  if (tag === 'header') return 'navigation';
  if (tag === 'footer') return 'footer';
  if (/(^| )(held|hero)( |$)/.test(klassen) || anker === 'top') return 'hero';
  const heu = `${klassen} ${anker}`;
  // erst Klasse und Anker, dann die Überschrift: die Klasse ist die Absicht des Bauenden
  for (const quelle of [heu, ueberschrift]) {
    const s = slug(quelle);
    for (const [kat, re] of WORTLISTE) if (re.test(s)) return kat;
  }
  return 'features';
}

export function abschnittEintrag(a, benutzt, kategorien) {
  const klasse = (a.attr.match(/class="([^"]*)"/) || [, ''])[1];
  const anker = (a.attr.match(/\bid="([^"]*)"/) || [, ''])[1];
  const toks = klasse.split(/\s+/).filter(Boolean);
  const ueb = text((a.innen.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i) || [, ''])[1]);
  const basis = a.tag === 'header' ? 'kopf' : a.tag === 'footer' ? 'fuss'
    : slug(toks.find((t) => !GENERISCH.has(t)) || anker || ueb.split(' ').slice(0, 2).join(' ') || 'abschnitt') || 'abschnitt';
  let id = basis, n = 2;
  while (benutzt.has(id)) id = `${basis}-${n++}`;
  benutzt.add(id);
  let kategorie = kategorieRaten(a.tag, klasse, anker, ueb);
  if (!kategorien.includes(kategorie)) kategorie = 'features';
  const attrs = [...a.attr.matchAll(/\b(data-[a-z0-9-]+)/g)].map((x) => x[1]).filter((x) => x !== 'data-abschnitt');
  const erste = toks.find((t) => !GENERISCH.has(t));
  return {
    id,
    name: (ueb || id).slice(0, 70),
    kategorie,
    selektor: `${a.tag}[data-abschnitt="${id}"]`,
    prinzip: STANDARDSATZ[kategorie],
    prinzip_quelle: 'kategorie-standard',
    kategorie_quelle: 'wortliste',
    css: erste ? `.${erste}` : `[data-abschnitt="${id}"]`,
    js: attrs.length ? `bewegung.js oder stil.js über ${[...new Set(attrs)].join(', ')}` : null,
    hinweis: 'marke.css, ../_basis/basis.css und die Regeln der Klasse aus stil.css mitnehmen, Symbole aus dem SVG Block am Seitenanfang nur, wenn der Abschnitt sie nutzt. Vor dem Übernehmen INFO.md der Vorlage lesen.',
  };
}

export function seiteMigrieren(html, kategorien) {
  const benutzt = new Set();
  const liste = abschnitteFinden(html);
  const eintraege = [];
  let neuesHtml = '', pos = 0;
  for (const a of liste) {
    const e = abschnittEintrag(a, benutzt, kategorien);
    eintraege.push(e);
    const oeffnend = html.slice(a.start, a.endeTag);
    neuesHtml += html.slice(pos, a.start);
    neuesHtml += /data-abschnitt=/.test(oeffnend) ? oeffnend : oeffnend.replace(/>$/, ` data-abschnitt="${e.id}">`);
    pos = a.endeTag;
  }
  neuesHtml += html.slice(pos);
  return { eintraege, html: neuesHtml };
}

function main() {
  const kategorien = Object.keys(JSON.parse(readFileSync(TAXONOMIE, 'utf8')).kategorien);
  const ordner = readdirSync(BIB).filter((d) => /^t\d{2,3}$/.test(d) && (!nur || nur.includes(d))).sort();
  let seiten = 0, abschnitte = 0, uebersprungen = 0;
  for (const o of ordner) {
    const ziel = join(BIB, o, 'ABSCHNITTE.json');
    if (existsSync(ziel)) {
      let vorhanden = [];
      try { vorhanden = JSON.parse(readFileSync(ziel, 'utf8')); } catch { /* wird neu erzeugt */ }
      const automatisch = vorhanden.length > 0 && vorhanden.every((e) => e.prinzip_quelle === 'kategorie-standard');
      if (!(neu && automatisch)) { uebersprungen++; continue; }
    }
    const dateien = readdirSync(join(BIB, o)).filter((f) => /^(index|v\d+)\.html$/.test(f)).sort();
    const alle = [];
    for (const f of dateien) {
      const html = readFileSync(join(BIB, o, f), 'utf8');
      const { eintraege, html: neuesHtml } = seiteMigrieren(html, kategorien);
      for (const e of eintraege) alle.push(f === 'index.html' ? e : { ...e, datei: f });
      if (!trocken && neuesHtml !== html) writeFileSync(join(BIB, o, f), neuesHtml);
      abschnitte += eintraege.length;
    }
    if (!alle.length) { console.log(`Befund: ${o} ohne erkennbare Abschnitte`); continue; }
    if (!trocken) writeFileSync(ziel, JSON.stringify(alle, null, 2) + '\n');
    seiten++;
    if (trocken || nur) console.log(`${o}: ${alle.map((e) => `${e.id}(${e.kategorie})`).join(' ')}`);
  }
  console.log(`${seiten} Vorlagen ${trocken ? 'würden migriert' : 'migriert'}, ${abschnitte} Abschnitte, ${uebersprungen} übersprungen.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
