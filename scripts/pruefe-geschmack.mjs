#!/usr/bin/env node
/*
  pruefe-geschmack.mjs — findet die messbaren KI-Tells einer gebauten Seite.

  WARUM ES DIESES SKRIPT GIBT
  Die meisten Geschmacksregeln aus 26-geschmack-und-ki-tells.md lassen sich nur ansehen,
  nicht messen. Einige aber zaehlen sich: das kleine Versalienlabel ueber jeder Ueberschrift,
  das zweite Laufband, fuenf verschiedene Texte fuer dieselbe Kontaktabsicht. Genau diese
  Muster sind in Produktionstests am haeufigsten zurueckgekehrt, obwohl die Regel dastand.
  Eine Regel ohne Pruefung wird in Sitzung drei zurueckgedreht, deshalb zaehlt das hier eine
  Maschine.

  WAS GEPRUEFT WIRD
  Je gebauter Seite (.html, am besten aus dist/ nach dem Build):
    1. Kicker-Quote: hoechstens ein Kicker oder Eyebrow-Label je drei Sektionen,
       der Heldenbereich zaehlt mit. Ueberschritten ist ein FEHLER. Die Pille ueber der
       Ueberschrift (badge, pill, chip oder rounded-full mit kleiner Schrift, gefolgt von
       einer h1 bis h3) ist derselbe Kicker in anderer Form und zaehlt mit.
    2. Kicker in zu kurzem Abstand (in einer der zwei Folgesektionen): WARNUNG.
    3. Mehr als ein Laufband (Marquee) je Seite: FEHLER.
    4. Scrollhinweis als Text ("Scrollen", "Scroll to explore"): WARNUNG.
    5. Nummer statt Thema im Kicker ("01 / Leistungen", "001 · Ablauf"): WARNUNG.
    6. Mehrere Texte fuer dieselbe Kontaktabsicht ("Jetzt anfragen" und
       "Kontakt aufnehmen" auf einer Seite): WARNUNG.
    7. Unterzeile im Heldenbereich ueber 20 Woertern: WARNUNG.
  Je Quelldatei, zeilenweise, Kommentare ausgenommen:
    8. overflow-x: hidden, bricht position: sticky im Inneren. Ersatz: clip.
    9. cursor: none, eigener Mauszeiger.
   10. Scroll-Listener ohne passive.
   11. 100vh oder h-screen ohne svh/dvh daneben. Projektstandard ist 100svh.
   12. Fraunces und Instrument Serif, die zwei Serifen, zu denen Modelle von selbst greifen.
   13. Die Premium-Standardpalette aus Creme, Messing und Espresso.
  Je Quelldatei, Blockweise, Kommentare ausgenommen (02-design-ux.md, Abschnitt Buttons):
   14. Primaerbutton als Konturbutton: eine Klasse oder ein Attribut mit haupt, primary oder
       primaer (btn--haupt, btn-primary, data-variant="primary"), deren Standardzustand keine
       Flaeche hat (background transparent oder none, oder gar keine Angabe, wenn auch kein
       Grundstil wie .btn eine Flaeche setzt) und die einen Rand tragt. WARNUNG. Hover und
       Fokus zaehlen nicht, sie wechseln nur den Zustand. Tailwind: bg-transparent plus border.
  Je gebauter Seite, zusaetzlich:
   15. Mehr als ein Primaerbutton in einer Sektion: WARNUNG (Hinweis, genau ein Primaer-CTA).
  Je Quelldatei, zeilenweise (harte Grenze Standardschrift, 10-visuelle-richtung.md):
   16. Inter, Roboto, Open Sans, Poppins, Montserrat, Lato und Plus Jakarta Sans ohne
       Markenvorgabe. WARNUNG.
  Je gebauter Seite, aus dem Paket Webdesign Workflow 2026 (48-richtung-varianten-und-subtraktion.md):
   17. Logoleiste ohne Bild: ein Block mit logo, kunden, client, partner oder marquee in der
       Klasse, der Namen enthaelt, aber kein img und kein svg. Getippte Firmennamen als
       Logowand behaupten eine Kundenbeziehung, ohne sie zu zeigen. WARNUNG.
   18. Ein einzelnes kursives Akzentwort in h1 oder h2 (<em> oder <i> neben normalem Text),
       eine der drei typografischen Voreinstellungen aus 10-visuelle-richtung.md. WARNUNG.
  Je Quelldatei, zeilenweise:
   19. Indigo- oder Violettverlauf (gradient mit den Tailwind-Werten indigo und violet oder den
       Woertern indigo, violet, purple), ohne dass der Wert in marke.json steht. WARNUNG.
  Je Quelldatei, gezaehlt:
   20. backdrop-filter an vier oder mehr Stellen einer Datei. Glas gehoert auf fixierte oder
       sticky Elemente (26-geschmack-und-ki-tells.md, Abschnitt 9), nicht auf jede Karte. WARNUNG.
  8 bis 20 sind WARNUNGEN. 12, 13, 16 und 19 entfallen, wenn der Wert in marke.json steht:
  dann ist er eine Markenentscheidung, keine Voreinstellung.

  WAS NICHT GEPRUEFT WIRD
  Layoutfamilien, Zickzackfolgen und leere Bentozellen sind aus dem Markup nicht sicher
  ablesbar. Sie stehen im Vorflugcheck von 26-geschmack-und-ki-tells.md und werden
  angesehen, nicht gezaehlt.

  AUFRUF
    node scripts/pruefe-geschmack.mjs                 Standard: dist (Seiten) und src (Quellen)
    node scripts/pruefe-geschmack.mjs dist src/styles
    node scripts/pruefe-geschmack.mjs --marke pfad/marke.json
    node scripts/pruefe-geschmack.mjs --strict        Warnungen zaehlen wie Fehler

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const QUELL_ENDUNGEN = new Set(['.astro', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte',
  '.ts', '.js', '.mjs', '.css', '.scss', '.pcss']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'build', '.astro', '.next', '.output',
  '.cache', 'coverage', 'vendor', 'results']);

const KICKER_KLASSEN = new Set(['kicker', 'eyebrow', 'overline', 'ueberzeile', 'vorspann', 'dachzeile']);
/* Die Pille ueber der Ueberschrift. Allein kein Kicker (ein Badge kann auch ein Zustand sein),
   erst mit einer Ueberschrift dicht dahinter. */
const PILLEN_KLASSEN = new Set(['badge', 'pill', 'pille', 'chip']);
const LAUFBAND_KLASSEN = new Set(['marquee', 'laufband', 'ticker']);

/* Alles, was dieselbe Absicht hat: Kontakt aufnehmen. Ein Text dafuer, auf der ganzen Seite. */
const KONTAKT_ABSICHT = /(kontakt|anfrag|schreiben sie|sprechen sie|sprechen wir|termin|beratung|erstgespr|r(ü|ue)ckruf|melden sie|angebot anfordern|get in touch|contact|let'?s talk)/i;

const SCROLLHINWEIS = /^(↓\s*)?(scroll|scrollen|scroll down|scroll to explore|nach unten scrollen|runterscrollen|weiterscrollen|weiter scrollen|mehr entdecken)(\s*↓)?$/i;
const NUMMER_STATT_THEMA = /^\s*\d{1,3}\s*[\/·|:.]\s*\S/;
const PAGINIERUNG = /^\s*\d{1,2}\s*\/\s*\d{1,2}\s*$/;

/* Die Premium-Standardpalette nach taste-skill, dazu das Creme und Terrakotta aus
   10-visuelle-richtung.md. Als Voreinstellung ein Tell, als Markenentscheidung erlaubt. */
export const STANDARDPALETTE = [
  '#f5f1ea', '#f7f5f1', '#fbf8f1', '#efeae0', '#ece6db', '#faf7f1', '#e8dfcb', '#f4f1ea',
  '#b08947', '#b6553a', '#9a2436', '#9c6e2a', '#bc7c3a', '#7d5621', '#d97757',
  '#1a1714', '#1a1814', '#1b1814',
];
export const STANDARDSERIFEN = ['Fraunces', 'Instrument Serif', 'Instrument_Serif'];
/* Die Schriften, die ohne Kundenvorgabe gesperrt sind (harte Grenze in SKILL.md). Plus Jakarta
   Sans kam in 4.15.0 dazu: die Groteske, zu der Modelle fuer Landingpages von selbst greifen. */
export const STANDARDGROTESKEN = ['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Lato', 'Plus Jakarta Sans'];

// ------------------------------------------------------------------ Hilfen

function klassenVon(tag) {
  const m = tag.match(/\bclass(?:Name)?\s*=\s*["']([^"']*)["']/i);
  return m ? m[1].split(/\s+/).filter(Boolean) : [];
}

function textVon(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function ohneSkripte(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
}

/*
  Findet alle Kicker einer Seite samt Position. Zwei Wege:
  eine benannte Klasse (kicker, eyebrow ...) oder die Signatur uppercase plus tracking
  an einem kurzen Element, auf das innerhalb von 300 Zeichen eine h1 bis h3 folgt.
*/
function kickerFinden(html) {
  const funde = [];
  const re = /<(p|span|div|small|strong)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = `<${m[1]}${m[2]}>`;
    const ende = m.index + m[0].length;
    /* Nur hinter das oeffnende Tag weiterspringen, nicht hinter das ganze Element. Sonst
       verschluckt ein umschliessendes <div class="kopf"> den Kicker, der darin steht. */
    re.lastIndex = m.index + tag.length;
    const klassen = klassenVon(tag);
    const text = textVon(m[3]);
    if (!text || text.length > 80) continue;
    let treffer = klassen.some((k) => KICKER_KLASSEN.has(k.toLowerCase()));
    if (!treffer) {
      /* Die Tailwind-Signatur: Versalien plus Sperrung. Allein reicht sie nicht, auf das
         Element muss innerhalb von 300 Zeichen eine Ueberschrift folgen. Dasselbe gilt fuer
         die Pille: eine benannte Klasse oder rounded-full mit kleiner Schrift. */
      const versal = klassen.includes('uppercase');
      const gesperrt = klassen.some((k) => /^tracking-(wide|wider|widest|\[)/.test(k));
      const pille = klassen.some((k) => PILLEN_KLASSEN.has(k.toLowerCase())) ||
        (klassen.includes('rounded-full') && klassen.some((k) => /^text-(xs|sm)$/.test(k)));
      if (versal && gesperrt) treffer = /<h[1-3]\b/i.test(html.slice(ende, ende + 300));
      /* Bei der Pille strenger: zwischen ihr und der Ueberschrift steht kein Text, nur Tags.
         Sonst wird ein Zustandsbadge in einer Liste zum Kicker der naechsten Sektion. */
      else if (pille) treffer = /^(?:\s|<\/?[a-z][a-z0-9-]*\b[^>]*>){0,6}<h[1-3]\b/i.test(html.slice(ende, ende + 300));
    }
    if (treffer) funde.push({ pos: m.index, text });
  }
  return funde;
}

/* Zerlegt die Seite in Abschnitte: der Teil vor der ersten <section> zaehlt nur, wenn er
   eine h1 enthaelt (Heldenbereich im <header>), danach jede <section>. */
function abschnitteFinden(html) {
  const starts = [];
  const re = /<section\b/gi;
  let m;
  while ((m = re.exec(html))) starts.push(m.index);
  const abschnitte = [];
  if (!starts.length) return abschnitte;
  const vorher = html.slice(0, starts[0]);
  const koerper = vorher.search(/<body\b/i);
  if (/<h1\b/i.test(vorher.slice(Math.max(0, koerper)))) abschnitte.push({ von: Math.max(0, koerper), bis: starts[0] });
  starts.forEach((s, i) => abschnitte.push({ von: s, bis: starts[i + 1] ?? html.length }));
  return abschnitte;
}

// ------------------------------------------------------------------ Primaerbutton

const PRIMAER_KLASSE = /(?:haupt|primary|primaer)/i;
const PRIMAER_SELEKTOR = /(?:\.[\w-]*(?:haupt|primary|primaer)[\w-]*|\[\s*data-variant\s*=\s*["']?(?:haupt|primary|primaer)["']?\s*\])/i;
const GRUNDSTIL_SELEKTOR = /^(?:\.btn|\.button|\.knopf|button|\.btn-base)$/i;
const ZUSTAND = /:(?:hover|focus|focus-visible|focus-within|active|disabled|visited)|::|\[disabled\]|\[aria-disabled/i;

const istTransparent = (wert) =>
  /^(?:transparent|none)\b/i.test(wert.trim()) ||
  /^(?:rgba?|hsla?)\([^)]*[,/\s]\s*0(?:\.0+)?\s*\)\s*$/i.test(wert.trim());

/**
 * Findet Primaerbuttons, die im Standardzustand keine Flaeche haben und einen Rand tragen.
 * Liest Blockweise (selektor { deklarationen }), nicht Zeile fuer Zeile, weil eine Flaeche
 * und ein Rand fast nie in derselben Zeile stehen. Liefert { zeile, regel, meldung, tipp, auszug }.
 */
export function konturbuttonAnalysieren(inhalt) {
  const sauber = inhalt
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
  const befunde = [];
  const bloecke = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(sauber))) {
    const selektoren = m[1].split(',').map((x) => x.trim().replace(/\s+/g, ' ')).filter(Boolean);
    const deklarationen = {};
    for (const d of m[2].split(';')) {
      const i = d.indexOf(':');
      if (i > 0) deklarationen[d.slice(0, i).trim().toLowerCase()] = d.slice(i + 1).trim();
    }
    bloecke.push({ selektoren, deklarationen, index: m.index + m[1].length - m[1].trimStart().length });
  }

  /* Grundstil: setzt .btn oder button eine echte Flaeche, erbt der Primaerbutton sie. */
  const grundFlaeche = bloecke.some((b) => b.selektoren.some((x) => GRUNDSTIL_SELEKTOR.test(x)) &&
    ['background', 'background-color'].some((k) => b.deklarationen[k] && !istTransparent(b.deklarationen[k])));

  const nachSelektor = new Map();
  for (const b of bloecke) {
    for (const x of b.selektoren) {
      if (!PRIMAER_SELEKTOR.test(x) || ZUSTAND.test(x)) continue;
      const e = nachSelektor.get(x) || { deklarationen: {}, index: b.index };
      Object.assign(e.deklarationen, b.deklarationen);
      nachSelektor.set(x, e);
    }
  }

  for (const [selektor, { deklarationen: d, index }] of nachSelektor) {
    const flaeche = d['background-color'] ?? d.background;
    const hatFlaeche = flaeche !== undefined && !istTransparent(flaeche) && !/^none\b/i.test(flaeche);
    const randWert = d.border ?? d['border-color'] ?? d['border-width'];
    const hatRand = randWert !== undefined && !/^(?:none|0)\b/i.test(randWert) && !/\btransparent\b/i.test(randWert);
    if (hatFlaeche || !hatRand) continue;
    if (flaeche === undefined && grundFlaeche) continue;
    befunde.push({
      zeile: sauber.slice(0, index).split('\n').length,
      regel: 'konturbutton-primaer',
      meldung: `Primärbutton ${selektor} ist ein Konturbutton (Rand ohne Fläche)`,
      tipp: 'Der Primär-CTA ist flächig gefüllt, mit Kontrast zur Umgebung. Der Konturbutton ist die Sekundäraktion. Siehe 02-design-ux.md, Abschnitt Buttons.',
      auszug: selektor,
    });
  }
  return befunde;
}

/* Bloecke mit Logo-, Kunden- oder Partnerklasse, die Text, aber kein Bild enthalten. */
function logoleistenOhneBild(html) {
  const treffer = [];
  const re = /<(ul|ol|div|section)\b([^>]*\bclass\s*=\s*["'][^"']*\b(?:logos?|logoleiste|logowand|kunden|clients?|partner|marquee)\b[^"']*["'][^>]*)>([\s\S]{0,2000}?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const inneres = m[3];
    if (/<(img|svg|picture)\b/i.test(inneres)) continue;
    const namen = (inneres.match(/<(li|span|div|p)\b[^>]*>[^<]{2,}</gi) || []).length;
    if (namen >= 3) treffer.push(klassenVon(`<x${m[2]}>`).join(' ') || m[1]);
  }
  return treffer;
}

/* Alle Primaerbuttons innerhalb einer <section>, gezaehlt je Sektion. */
function primaerbuttonsJeSektion(html) {
  const ergebnisse = [];
  const re = /<section\b[\s\S]*?<\/section>/gi;
  let s;
  let nr = 0;
  while ((s = re.exec(html))) {
    nr++;
    const tags = s[0].match(/<(?:a|button)\b[^>]*>/gi) || [];
    const anzahl = tags.filter((t) =>
      klassenVon(t).some((k) => PRIMAER_KLASSE.test(k)) ||
      /\bdata-variant\s*=\s*["']?(?:haupt|primary|primaer)/i.test(t)).length;
    if (anzahl > 1) ergebnisse.push({ sektion: nr, anzahl });
  }
  return ergebnisse;
}

// ------------------------------------------------------------------ Seiten

/**
 * Prueft eine gebaute Seite. Liefert { fehler: [], warnungen: [] } mit { regel, meldung, tipp }.
 * kontext.ctaPrimaer: optional der verbindliche CTA-Text aus marke.json.
 */
export function seiteAnalysieren(roh, kontext = {}) {
  const html = ohneSkripte(roh);
  const fehler = [];
  const warnungen = [];

  // 1 und 2 Kicker
  const abschnitte = abschnitteFinden(html);
  const kicker = kickerFinden(html);
  if (abschnitte.length) {
    const erlaubt = Math.ceil(abschnitte.length / 3);
    if (kicker.length > erlaubt) {
      fehler.push({
        regel: 'kicker-quote',
        meldung: `${kicker.length} Kicker bei ${abschnitte.length} Sektionen, erlaubt sind ${erlaubt}: ${kicker.map((k) => `„${k.text}"`).join(', ')}`,
        tipp: 'Kicker streichen. Die Überschrift reicht, die Position auf der Seite ordnet die Sektion schon ein.',
      });
    }
    const mitKicker = abschnitte
      .map((a, i) => (kicker.some((k) => k.pos >= a.von && k.pos < a.bis) ? i : -1))
      .filter((i) => i >= 0);
    for (let j = 1; j < mitKicker.length; j++) {
      if (mitKicker[j] - mitKicker[j - 1] < 3) {
        warnungen.push({
          regel: 'kicker-abstand',
          meldung: `Kicker in Sektion ${mitKicker[j - 1] + 1} und ${mitKicker[j] + 1}, dazwischen weniger als zwei Sektionen ohne`,
          tipp: 'Nach einem Kicker bleiben die nächsten zwei Sektionen ohne.',
        });
      }
    }
  }

  // 5 Nummer statt Thema
  for (const k of kicker) {
    if (NUMMER_STATT_THEMA.test(k.text)) {
      warnungen.push({
        regel: 'nummer-statt-thema',
        meldung: `Kicker mit Nummer: „${k.text}"`,
        tipp: 'Das Thema in Klartext nennen oder den Kicker streichen. Nummern nur bei echter Abfolge.',
      });
    }
  }

  // 3 Laufband
  let laufbaender = (html.match(/<marquee\b/gi) || []).length;
  const tagRe = /<[a-z][a-z0-9-]*\b[^>]*>/gi;
  let t;
  while ((t = tagRe.exec(html))) {
    const tag = t[0];
    if (/\bdata-(laufband|marquee)\b/i.test(tag) || klassenVon(tag).some((k) => LAUFBAND_KLASSEN.has(k.toLowerCase()))) laufbaender++;
  }
  if (laufbaender > 1) {
    fehler.push({
      regel: 'laufband',
      meldung: `${laufbaender} Laufbänder auf einer Seite`,
      tipp: 'Höchstens eins. Das eine dorthin, wo die Menge die Aussage ist, die anderen bekommen ein anderes Layout.',
    });
  }

  // 4 Scrollhinweis und Paginierung
  const textknoten = html.match(/>([^<>]{1,60})</g) || [];
  for (const roher of textknoten) {
    const text = roher.slice(1, -1).replace(/&darr;/g, '↓').replace(/\s+/g, ' ').trim();
    if (!text) continue;
    if (SCROLLHINWEIS.test(text)) {
      warnungen.push({
        regel: 'scrollhinweis',
        meldung: `Scrollhinweis als Text: „${text}"`,
        tipp: 'Streichen. Eine angeschnittene Kante der nächsten Sektion lädt zum Scrollen ein, siehe 02-design-ux.md.',
      });
    } else if (PAGINIERUNG.test(text)) {
      warnungen.push({
        regel: 'paginierung',
        meldung: `Zählung als Dekoration: „${text}"`,
        tipp: 'Wer zählen kann, braucht das Label nicht. Nur bei einer echten Bildfolge mit Steuerung.',
      });
    }
  }

  // 6 Kontaktabsicht
  const labels = new Map();
  const ctaRe = /<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let c;
  while ((c = ctaRe.exec(html))) {
    const klassen = klassenVon(`<${c[1]}${c[2]}>`).join(' ');
    const istKnopf = c[1].toLowerCase() === 'button' || /(^|\s|-|_)(btn|button|cta|knopf)/i.test(klassen);
    if (!istKnopf) continue;
    const text = textVon(c[3]);
    if (!text || text.length > 60 || !KONTAKT_ABSICHT.test(text)) continue;
    labels.set(text.toLowerCase(), text);
  }
  if (labels.size > 1) {
    const soll = kontext.ctaPrimaer && !/\[\[/.test(kontext.ctaPrimaer) ? ` Verbindlich laut marke.json: „${kontext.ctaPrimaer}".` : '';
    warnungen.push({
      regel: 'cta-absicht',
      meldung: `${labels.size} Texte für dieselbe Kontaktabsicht: ${[...labels.values()].map((l) => `„${l}"`).join(', ')}`,
      tipp: `Eine Absicht, ein Text, in Kopf, Held und Fuß gleich.${soll}`,
    });
  }

  // 7 Unterzeile im Heldenbereich
  if (abschnitte.length) {
    const held = html.slice(abschnitte[0].von, abschnitte[0].bis);
    const absaetze = [...held.matchAll(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi)]
      .filter((p) => !klassenVon(`<p${p[1]}>`).some((k) => KICKER_KLASSEN.has(k.toLowerCase())));
    if (absaetze.length) {
      const woerter = textVon(absaetze[0][2]).split(' ').filter(Boolean).length;
      if (woerter > 20) {
        warnungen.push({
          regel: 'held-unterzeile',
          meldung: `Unterzeile im Heldenbereich mit ${woerter} Wörtern`,
          tipp: 'Höchstens 20 Wörter. Passt das Versprechen nicht hinein, ist es unklar, nicht die Regel zu eng.',
        });
      }
    }
  }

  // 17 Logoleiste aus getipptem Text
  for (const block of logoleistenOhneBild(html)) {
    warnungen.push({
      regel: 'logoleiste-text',
      meldung: `Logoleiste ohne Bild: ${block}`,
      tipp: 'Getippte Firmennamen sind keine Logowand. Echte Logos mit Freigabe der Kunden einsetzen oder die Leiste streichen (harte Grenze keine erfundenen Belege).',
    });
  }

  // 18 einzelnes kursives Akzentwort in der Ueberschrift
  const akzente = [...html.matchAll(/<h([12])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .filter((m) => /<(em|i)\b[^>]*>[^<]{1,40}<\/\1>/i.test(m[2]) && textVon(m[2].replace(/<(em|i)\b[^>]*>[\s\S]*?<\/\1>/gi, '')).trim().length > 0);
  if (akzente.length) {
    warnungen.push({
      regel: 'akzentwort',
      meldung: `Kursives Akzentwort in ${akzente.length} Überschrift(en) h1/h2`,
      tipp: 'Eine der drei typografischen Voreinstellungen (10-visuelle-richtung.md). Nur, wenn die Hervorhebung zum System gehört, dann in einer Form durchgehend.',
    });
  }

  // 15 mehrere Primaerbuttons in einer Sektion
  for (const { sektion, anzahl } of primaerbuttonsJeSektion(html)) {
    warnungen.push({
      regel: 'mehrere-primaer',
      meldung: `${anzahl} Primärbuttons in Sektion ${sektion}`,
      tipp: 'Genau ein Primär-CTA je Sektion. Zwei gleich starke Aufrufe schwächen beide, der zweite wird zur Sekundäraktion.',
    });
  }

  return { fehler, warnungen };
}

// ------------------------------------------------------------------ Quellen

/**
 * Prueft eine Quelldatei zeilenweise. Liefert eine Liste { zeile, regel, meldung, tipp }.
 * kontext.markeText: der Inhalt von marke.json in Kleinbuchstaben, fuer die Ausnahmen.
 */
export function quelleAnalysieren(inhalt, kontext = {}) {
  const marke = (kontext.markeText || '').toLowerCase();
  const befunde = [];
  const zeilen = inhalt.split('\n');
  let imBlock = false;

  zeilen.forEach((zeile, i) => {
    const nr = i + 1;
    /* Kommentare ausnehmen, sonst meldet das Skript genau die Zeile, die erklaert,
       warum etwas verboten ist. Derselbe Zustandsautomat wie in pruefe-striche.mjs. */
    const startetBlock = /\/\*|<!--/.test(zeile) && !/\*\/|-->/.test(zeile);
    const istKommentar = imBlock || /^\s*(\/\*|\*|\/\/|<!--)/.test(zeile);
    if (startetBlock) imBlock = true;
    else if (imBlock && /\*\/|-->/.test(zeile)) { imBlock = false; return; }
    if (istKommentar) return;

    const melde = (regel, meldung, tipp) => befunde.push({ zeile: nr, regel, meldung, tipp, auszug: zeile.trim().slice(0, 110) });

    // 8 overflow-x: hidden
    if (/overflow-x\s*:\s*hidden/i.test(zeile) || /(^|[\s"'`])overflow-x-hidden([\s"'`]|$)/.test(zeile)) {
      melde('overflow-hidden', 'overflow-x: hidden bricht position: sticky in allen Kindelementen',
        'overflow-x: clip verwenden, das begrenzt ohne neuen Scrollcontainer. Siehe global-basis.css.');
    }
    // 9 eigener Mauszeiger
    if (/cursor\s*:\s*none/i.test(zeile) || /(^|[\s"'`])cursor-none([\s"'`]|$)/.test(zeile)) {
      melde('mauszeiger', 'Eigener Mauszeiger (cursor: none)',
        'Streichen. Er versteckt die Position, stört Hilfstechnik und kostet Leistung.');
    }
    // 10 Scroll-Listener
    if (/addEventListener\(\s*['"]scroll['"]/.test(zeile) && !/passive/.test(zeile)) {
      melde('scroll-listener', 'Scroll-Listener ohne passive',
        'Für Einblendungen IntersectionObserver, ScrollTrigger oder animation-timeline: view(). Sonst { passive: true } und rAF-gedrosselt.');
    }
    // 11 100vh
    const nachbarn = `${zeilen[i - 1] || ''} ${zeile} ${zeilen[i + 1] || ''}`;
    if ((/\b100vh\b/.test(zeile) || /(^|[\s"'`])h-screen([\s"'`]|$)/.test(zeile)) && !/\b100[sdl]vh\b|h-(svh|dvh|lvh)|min-h-(svh|dvh)/.test(nachbarn)) {
      melde('viewport-hoehe', '100vh ohne svh daneben',
        'Projektstandard ist 100svh, siehe 16-responsive-container.md. 100vh springt auf dem Handy mit der Adressleiste.');
    }
    // 12 Standardserifen
    for (const s of STANDARDSERIFEN) {
      const re = new RegExp(`(font-family[^;]*|fontsource/|@import[^;]*|family=)${s.replace(/[ _]/g, '[ _+-]?')}`, 'i');
      if (re.test(zeile) && !marke.includes(s.replace('_', ' ').toLowerCase())) {
        melde('standardserife', `${s.replace('_', ' ')} ohne Markenvorgabe`,
          'Die Serife, zu der Modelle von selbst greifen. Nur mit Begründung aus Marke oder Gegenstand, dann in marke.json eintragen.');
        break;
      }
    }
    // 16 Standardgrotesken, die Sperrliste der harten Grenze
    for (const s of STANDARDGROTESKEN) {
      const name = s.replace(/ /g, '[ _+-]?');
      /* Hinter dem Namen darf kein weiteres Wort folgen: Inter Tight, Roboto Slab und Lato
         Hairline sind eigene Familien. Ausnahme ist der Zusatz Variable der Variablen Fassung. */
      const re = new RegExp(`(font-family[^;]*|fontFamily[^;]*|--(?:schrift|font)[\\w-]*\\s*:[^;]*|fontsource(?:-variable)?/|@import[^;]*|family=)['"]?(?<![\\w-])${name}(?![\\w-]|[ _+](?!variable\\b)[a-z])`, 'i');
      const inMarke = new RegExp(`\\b${name}\\b`, 'i').test(marke);
      if (re.test(zeile) && !inMarke) {
        melde('standardschrift', `${s} ohne Markenvorgabe`,
          'Ohne Kundenschrift gesperrt (harte Grenze). Zwei Kandidaten mit Begründung aus Branche und Zielgruppe vorschlagen, siehe 10-visuelle-richtung.md. Steht die Schrift im Branding, in marke.json eintragen.');
        break;
      }
    }
    // 19 Indigo- oder Violettverlauf
    const css = /gradient/i.test(zeile) && zeile.match(/#(?:6366f1|4f46e5|4338ca|8b5cf6|7c3aed|6d28d9|a855f7|9333ea)\b|\b(?:indigo|violet|purple)\b/i);
    const tw = zeile.match(/(?:^|[\s"'`])(?:from|via|to)-((?:indigo|violet|purple)-\d{2,3})(?=[\s"'`]|$)/);
    const wert = css ? css[0].toLowerCase() : tw ? tw[1].toLowerCase() : null;
    if (wert && !marke.includes(wert)) {
      melde('violettverlauf', `Indigo- oder Violettverlauf (${wert}) ohne Markenvorgabe`,
        'Der Verlauf, den Modelle von selbst setzen. Farbe aus den Rollen-Tokens, ein Verlauf nur aus der Marke abgeleitet (harte Grenze eigene Handschrift). Steht der Wert in marke.json, entfällt die Warnung.');
    }
    // 13 Standardpalette
    const hexe = zeile.match(/#[0-9a-f]{6}\b/gi) || [];
    const treffer = [...new Set(hexe.map((h) => h.toLowerCase()))].filter((h) => STANDARDPALETTE.includes(h) && !marke.includes(h));
    if (treffer.length) {
      melde('standardpalette', `Premium-Standardpalette: ${treffer.join(', ')}`,
        'Creme, Messing und Espresso sind die Palette, die jede Premiumseite bekommt. Nur als Markenentscheidung, dann in marke.json.');
    }
  });

  // 20 Glasflaechen, gezaehlt je Datei
  const glas = zeilen.filter((z) => /backdrop-filter\s*:\s*blur|(^|[\s"'`])backdrop-blur/.test(z) && !/^\s*(\/\/|\*|\/\*|<!--)/.test(z));
  if (glas.length >= 4) {
    const erste = zeilen.findIndex((z) => z === glas[0]);
    befunde.push({
      zeile: erste + 1, regel: 'glasflaechen',
      meldung: `backdrop-filter an ${glas.length} Stellen`,
      tipp: 'Glas nur auf fixierten oder sticky Elementen (Kopfleiste, Overlay). Auf scrollenden Karten kostet es Bildrate und wirkt wie Effekt statt Zweck. Siehe 26-geschmack-und-ki-tells.md, Abschnitt 9.',
      auszug: glas[0].trim().slice(0, 110),
    });
  }

  // 14 Primaerbutton als Konturbutton, Blockweise, danach Tailwind je Zeile
  befunde.push(...konturbuttonAnalysieren(inhalt));
  zeilen.forEach((zeile, i) => {
    if (/\bbg-transparent\b/.test(zeile) && /(^|[\s"'`])border(?:-[\w[\]#-]+)?(?=[\s"'`])/.test(zeile) &&
        /(haupt|primary|primaer)/i.test(zeile) && !/^\s*(\/\/|\*|<!--)/.test(zeile)) {
      befunde.push({
        zeile: i + 1, regel: 'konturbutton-primaer',
        meldung: 'Primärbutton mit bg-transparent und Rand (Konturbutton)',
        tipp: 'Der Primär-CTA ist flächig gefüllt. Der Konturbutton ist die Sekundäraktion. Siehe 02-design-ux.md, Abschnitt Buttons.',
        auszug: zeile.trim().slice(0, 110),
      });
    }
  });

  return befunde.sort((a, b) => a.zeile - b.zeile);
}

// ------------------------------------------------------------------ Aufruf

function dateienSammeln(wurzel, nurSeiten) {
  const gefunden = [];
  const lauf = (p) => {
    let eintraege;
    try { eintraege = readdirSync(p, { withFileTypes: true }); } catch { return; }
    for (const e of eintraege) {
      if (e.name.startsWith('.')) continue;
      const voll = join(p, e.name);
      if (e.isDirectory()) { if (!UEBERSPRINGEN.has(e.name)) lauf(voll); continue; }
      const endung = extname(e.name);
      if (nurSeiten ? endung === '.html' : QUELL_ENDUNGEN.has(endung)) gefunden.push(voll);
    }
  };
  try { statSync(wurzel).isDirectory() ? lauf(wurzel) : gefunden.push(wurzel); } catch {}
  return gefunden;
}

function markeLaden(pfad) {
  for (const k of [pfad, 'marke.json', 'src/marke.json', 'src/data/marke.json'].filter(Boolean)) {
    if (!existsSync(k)) continue;
    try {
      const text = readFileSync(k, 'utf8');
      const json = JSON.parse(text);
      return { quelle: k, text: text.toLowerCase(), ctaPrimaer: json?.sprache?.cta_primaer ?? null };
    } catch (e) {
      console.error(`Warnung: ${k} ist kein gültiges JSON (${e.message}), Ausnahmen übersprungen.`);
      return null;
    }
  }
  return null;
}

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const mi = args.indexOf('--marke');
  const markeIndex = mi === -1 ? -1 : mi + 1;
  const pfade = args.filter((a, i) => !a.startsWith('--') && i !== markeIndex);

  /* Ohne Angabe: die gebauten Seiten aus dist fuer die Seitenregeln, die Quellen aus src
     fuer die Zeilenregeln. dist wird dann nicht zeilenweise geprueft, sonst meldet jede
     Regel zweimal, einmal im Quelltext und einmal im gebauten Ergebnis. */
  const auftraege = pfade.length
    ? pfade.filter(existsSync).map((p) => ({ pfad: p, seiten: true, quellen: true }))
    : [
        { pfad: 'dist', seiten: true, quellen: false },
        { pfad: 'src', seiten: false, quellen: true },
      ].filter((a) => existsSync(a.pfad));

  if (!auftraege.length) {
    console.error('Nichts zu prüfen. Erwartet dist (nach dem Build) oder src.');
    console.error('Oder Pfad angeben: node scripts/pruefe-geschmack.mjs dist');
    process.exit(2);
  }

  const marke = markeLaden(mi === -1 ? null : args[markeIndex]);
  const fehler = [];
  const warnungen = [];
  let seiten = 0;
  let quellen = 0;

  for (const a of auftraege) {
    for (const datei of dateienSammeln(a.pfad, !a.quellen)) {
      let inhalt;
      try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
      const rel = relative(process.cwd(), datei);
      if (a.seiten && extname(datei) === '.html') {
        seiten++;
        const erg = seiteAnalysieren(inhalt, { ctaPrimaer: marke?.ctaPrimaer });
        erg.fehler.forEach((b) => fehler.push({ ...b, ort: rel }));
        erg.warnungen.forEach((b) => warnungen.push({ ...b, ort: rel }));
      }
      if (a.quellen) {
        quellen++;
        quelleAnalysieren(inhalt, { markeText: marke?.text }).forEach((b) => warnungen.push({ ...b, ort: `${rel}:${b.zeile}` }));
      }
    }
  }

  console.log(`Geprüft: ${seiten} Seiten, ${quellen} Quelldateien`);
  if (marke) console.log(`Markenentscheidungen aus ${marke.quelle} berücksichtigt`);
  else console.log('Keine marke.json gefunden, jede Standardschrift, Standardserife und Standardfarbe wird gemeldet.');
  if (!seiten) console.log('Keine gebaute Seite gefunden. Kicker, Laufband und CTA-Texte erst nach dem Build prüfbar.');

  const ausgeben = (titel, liste) => {
    if (!liste.length) return;
    console.log(`\n${titel} (${liste.length})`);
    for (const b of liste) {
      console.log(`  ${b.ort}  [${b.regel}] ${b.meldung}`);
      if (b.auszug) console.log(`    ${b.auszug}`);
      console.log(`    → ${b.tipp}`);
    }
  };
  ausgeben('FEHLER', fehler);
  ausgeben('WARNUNGEN', warnungen);

  const zaehlt = strict ? fehler.length + warnungen.length : fehler.length;
  if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
  else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.${strict ? ' (--strict: Warnungen zählen)' : ''}`);
  process.exit(zaehlt ? 1 : 0);
}

const istHauptprogramm = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (istHauptprogramm) main();
