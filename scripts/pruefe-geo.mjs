#!/usr/bin/env node
/*
  pruefe-geo.mjs — prueft, ob eine gebaute Seite fuer KI-Antworten lesbar und zitierfaehig ist.

  WARUM ES DIESES SKRIPT GIBT
  31-ki-sichtbarkeit-geo.md sagt, dass es keinen Trick gibt, nur ein sauberes Fundament: Text
  im ausgelieferten HTML, eine klare Gliederung, gueltige strukturierte Daten und eine
  robots.txt, die bewusst entscheidet, wer lesen darf. Genau diese vier Dinge gehen in
  Projekten still kaputt, ohne dass jemand es sieht: ein Skript rendert den Inhalt erst im
  Browser, ein FAQ-Markup zeigt Fragen, die auf der Seite nicht stehen, eine pauschale Sperre
  in der robots.txt schliesst auch die Crawler aus, die zitieren.

  WAS GEPRUEFT WIRD
  robots.txt (dist/robots.txt):
    1. User-agent: * mit Disallow: / und ohne Allow: /: FEHLER. Die Seite ist fuer alle gesperrt.
    2. Je KI-Crawler der Zustand: erlaubt, gesperrt, oder ueber * geregelt. Nur Information.
    3. Ein Crawler, der Antworten mit Quelle speist (OAI-SearchBot, Claude-SearchBot,
       PerplexityBot), ist gesperrt: WARNUNG. Das kostet Zitate. Gewollt ist es erlaubt, aber
       es muss eine Entscheidung sein.
  Je Seite (.html, ohne noindex, ohne 404 und Weiterleitungsseiten):
    4. Kaum sichtbarer Text im ausgelieferten HTML (unter 40 Woerter): WARNUNG. Meist
       clientseitig gerenderter Inhalt, den nicht jeder Crawler sieht.
    5. Keine oder mehrere h1: WARNUNG.
    6. Uebersprungene Ueberschriftenebene (h2 direkt auf h4): WARNUNG.
    7. JSON-LD, das sich nicht parsen laesst: FEHLER.
    8. FAQPage mit Fragen oder Antworten, die nicht sichtbar auf der Seite stehen: FEHLER.
       Unsichtbares Markup ist ein Richtlinienverstoss, siehe 05-seo-sichtbarkeit.md.
    9. Article oder BlogPosting ohne dateModified oder datePublished: WARNUNG.
  Mit --llms: ob llms.txt existiert, nur als Information.

  WAS NICHT GEPRUEFT WIRD
  Ob ein Absatz die Frage im ersten Satz beantwortet, steht im Abschnitt 3 von
  31-ki-sichtbarkeit-geo.md und wird gelesen, nicht gezaehlt. Ob eine Sperre gewollt ist,
  entscheidet das Skript nicht, es benennt sie.

  AUFRUF
    node scripts/pruefe-geo.mjs                 Standard: dist
    node scripts/pruefe-geo.mjs dist --llms
    node scripts/pruefe-geo.mjs --strict        Warnungen zaehlen wie Fehler

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

export const KI_CRAWLER = [
  { name: 'OAI-SearchBot', zweck: 'suche' },
  { name: 'Claude-SearchBot', zweck: 'suche' },
  { name: 'PerplexityBot', zweck: 'suche' },
  { name: 'ChatGPT-User', zweck: 'abruf' },
  { name: 'Claude-User', zweck: 'abruf' },
  { name: 'Perplexity-User', zweck: 'abruf' },
  { name: 'GPTBot', zweck: 'training' },
  { name: 'ClaudeBot', zweck: 'training' },
  { name: 'Google-Extended', zweck: 'training' },
  { name: 'Applebot-Extended', zweck: 'training' },
  { name: 'CCBot', zweck: 'training' },
];

// ------------------------------------------------------------------ robots.txt

/** Zerlegt robots.txt in Gruppen { agenten: [], regeln: [{ art, pfad }] }. */
export function robotsLesen(text) {
  const gruppen = [];
  let aktuell = null;
  let letzteWarAgent = false;
  for (const roh of text.split(/\r?\n/)) {
    const zeile = roh.replace(/#.*/, '').trim();
    if (!zeile) continue;
    const m = zeile.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const feld = m[1].toLowerCase();
    const wert = m[2].trim();
    if (feld === 'user-agent') {
      if (!aktuell || !letzteWarAgent) { aktuell = { agenten: [], regeln: [] }; gruppen.push(aktuell); }
      aktuell.agenten.push(wert.toLowerCase());
      letzteWarAgent = true;
    } else if (feld === 'allow' || feld === 'disallow') {
      if (aktuell) aktuell.regeln.push({ art: feld, pfad: wert });
      letzteWarAgent = false;
    } else {
      letzteWarAgent = false;
    }
  }
  return gruppen;
}

/** Ist die Wurzel / fuer diese Gruppe gesperrt? Allow gewinnt bei gleicher Laenge (RFC 9309). */
function wurzelGesperrt(gruppe) {
  const treffer = gruppe.regeln.filter((r) => r.pfad === '/' || r.pfad === '');
  const sperre = treffer.some((r) => r.art === 'disallow' && r.pfad === '/');
  const erlaubt = treffer.some((r) => r.art === 'allow' && r.pfad === '/');
  return sperre && !erlaubt;
}

/**
 * Zustand eines Crawlers: 'gesperrt', 'erlaubt' (eigene Gruppe) oder 'ueber-stern' mit dem
 * Zustand der *-Gruppe.
 */
export function crawlerZustand(gruppen, name) {
  const eigene = gruppen.find((g) => g.agenten.includes(name.toLowerCase()));
  if (eigene) return { quelle: 'eigene', gesperrt: wurzelGesperrt(eigene) };
  const stern = gruppen.find((g) => g.agenten.includes('*'));
  if (stern) return { quelle: 'stern', gesperrt: wurzelGesperrt(stern) };
  return { quelle: 'keine', gesperrt: false };
}

export function robotsAnalysieren(text) {
  const gruppen = robotsLesen(text);
  const fehler = [];
  const warnungen = [];
  const infos = [];
  const stern = gruppen.find((g) => g.agenten.includes('*'));
  if (stern && wurzelGesperrt(stern)) {
    fehler.push({ regel: 'robots-alles-gesperrt', meldung: 'User-agent: * mit Disallow: / und ohne Allow: /',
      tipp: 'Auf einer Produktionsdomain entfernen. Eine Vorschaudomain schützt man mit HTTP-Auth oder X-Robots-Tag, nicht mit robots.txt.' });
  }
  for (const c of KI_CRAWLER) {
    const z = crawlerZustand(gruppen, c.name);
    const wort = z.gesperrt ? 'gesperrt' : 'erlaubt';
    const via = z.quelle === 'stern' ? ' (über *)' : z.quelle === 'keine' ? ' (nicht erwähnt)' : '';
    infos.push(`${c.name.padEnd(18)} ${c.zweck.padEnd(9)} ${wort}${via}`);
    if (c.zweck === 'suche' && z.gesperrt && !(stern && wurzelGesperrt(stern))) {
      warnungen.push({ regel: 'suchcrawler-gesperrt', meldung: `${c.name} ist gesperrt: die Seite wird dort nicht als Quelle genannt`,
        tipp: 'Gewollt ist das erlaubt, dann als Entscheidung des Kunden festhalten. Soll nur das Training ausgeschlossen werden, GPTBot, ClaudeBot und Google-Extended sperren, nicht die Suchcrawler.' });
    }
  }
  return { fehler, warnungen, infos };
}

// ------------------------------------------------------------------ Seiten

function sichtbarerText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim();
}

const normal = (s) => s.toLowerCase().replace(/\s+/g, ' ').replace(/[„“”"'’]/g, '').trim();

function typenVon(knoten, liste = []) {
  if (!knoten || typeof knoten !== 'object') return liste;
  if (Array.isArray(knoten)) { knoten.forEach((k) => typenVon(k, liste)); return liste; }
  const t = knoten['@type'];
  if (t) (Array.isArray(t) ? t : [t]).forEach((x) => liste.push({ typ: x, knoten }));
  if (knoten['@graph']) typenVon(knoten['@graph'], liste);
  for (const k of ['mainEntity', 'hasPart']) if (knoten[k]) typenVon(knoten[k], liste);
  return liste;
}

/**
 * Prueft eine gebaute Seite. Liefert { fehler: [], warnungen: [] } mit { regel, meldung, tipp }.
 * Seiten mit noindex und Weiterleitungsseiten liefern leere Listen.
 */
export function seiteAnalysieren(html, dateiname = 'index.html') {
  const fehler = [];
  const warnungen = [];
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) return { fehler, warnungen };
  if (/<meta[^>]+http-equiv=["']refresh["']/i.test(html)) return { fehler, warnungen };
  if (/^404(\.html)?$/i.test(basename(dateiname))) return { fehler, warnungen };

  const text = sichtbarerText(html.replace(/^[\s\S]*?<body\b[^>]*>/i, ''));
  const woerter = text ? text.split(' ').length : 0;

  // 4 leeres HTML
  if (woerter < 40) {
    warnungen.push({ regel: 'kaum-text', meldung: `Nur ${woerter} Wörter sichtbarer Text im ausgelieferten HTML`,
      tipp: 'Inhalt serverseitig ausliefern. Nicht jeder KI-Crawler führt JavaScript aus. In Astro: Komponenten ohne client:only.' });
  }

  // 5 und 6 Ueberschriften
  const ohneSkript = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  const ebenen = [...ohneSkript.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  const h1 = ebenen.filter((e) => e === 1).length;
  if (h1 !== 1) {
    warnungen.push({ regel: 'h1-anzahl', meldung: h1 === 0 ? 'Keine h1' : `${h1} h1 auf einer Seite`,
      tipp: 'Genau eine h1 je Seite, sie benennt das Thema der Seite.' });
  }
  for (let i = 1; i < ebenen.length; i++) {
    if (ebenen[i] > ebenen[i - 1] + 1) {
      warnungen.push({ regel: 'ebene-uebersprungen', meldung: `h${ebenen[i - 1]} folgt direkt h${ebenen[i]}`,
        tipp: 'Keine Ebene überspringen. Die Gliederung ist das, woran ein Absatz seiner Frage zugeordnet wird.' });
      break;
    }
  }

  // 7 bis 9 JSON-LD
  const blocke = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const sichtbar = normal(text);
  blocke.forEach((roh, i) => {
    let daten;
    try { daten = JSON.parse(roh); } catch (e) {
      fehler.push({ regel: 'jsonld-ungueltig', meldung: `JSON-LD-Block ${i + 1} ist kein gültiges JSON (${e.message.slice(0, 60)})`,
        tipp: 'Mit dem Schema-Markup-Validator prüfen. Meist ein fehlendes Komma oder ein Platzhalter.' });
      return;
    }
    for (const { typ, knoten } of typenVon(daten)) {
      if (typ === 'FAQPage') {
        const fragen = typenVon(knoten.mainEntity).filter((x) => x.typ === 'Question');
        const fehlend = [];
        for (const { knoten: q } of fragen) {
          const name = q.name ? normal(sichtbarerText(String(q.name))) : '';
          const antwort = q.acceptedAnswer?.text ? normal(sichtbarerText(String(q.acceptedAnswer.text))) : '';
          if (name && !sichtbar.includes(name)) fehlend.push(`Frage „${String(q.name).slice(0, 50)}"`);
          else if (antwort && !sichtbar.includes(antwort.slice(0, Math.min(antwort.length, 60)))) fehlend.push(`Antwort zu „${String(q.name).slice(0, 40)}"`);
        }
        if (fehlend.length) {
          fehler.push({ regel: 'faq-nicht-sichtbar', meldung: `FAQPage-Markup nennt, was nicht sichtbar auf der Seite steht: ${fehlend.join('; ')}`,
            tipp: 'Nur auszeichnen, was genau so auf der Seite steht. Markup und Sichtbares aus derselben Quelle erzeugen.' });
        }
      }
      if ((typ === 'Article' || typ === 'BlogPosting' || typ === 'NewsArticle') && !knoten.dateModified && !knoten.datePublished) {
        warnungen.push({ regel: 'artikel-ohne-datum', meldung: `${typ} ohne datePublished und dateModified`,
          tipp: 'Beide Daten angeben und sichtbar auf der Seite zeigen. Aktualität ist ein Vertrauenssignal.' });
      }
    }
  });

  return { fehler, warnungen };
}

// ------------------------------------------------------------------ Aufruf

function htmlSammeln(pfad, liste = []) {
  let st;
  try { st = statSync(pfad); } catch { return liste; }
  if (st.isFile()) { if (extname(pfad) === '.html') liste.push(pfad); return liste; }
  for (const name of readdirSync(pfad)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    htmlSammeln(join(pfad, name), liste);
  }
  return liste;
}

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const llms = args.includes('--llms');
  const ziel = args.filter((a) => !a.startsWith('--'))[0] || 'dist';

  if (!existsSync(ziel)) {
    console.error(`Nichts zu prüfen: ${ziel} existiert nicht. Erst bauen, dann prüfen.`);
    console.error('Aufruf: node scripts/pruefe-geo.mjs [dist] [--llms] [--strict]');
    process.exit(2);
  }

  const fehler = [];
  const warnungen = [];

  const robotsPfad = join(ziel, 'robots.txt');
  if (existsSync(robotsPfad)) {
    const r = robotsAnalysieren(readFileSync(robotsPfad, 'utf8'));
    console.log('KI-Crawler laut robots.txt');
    r.infos.forEach((z) => console.log(`  ${z}`));
    r.fehler.forEach((b) => fehler.push({ ...b, ort: 'robots.txt' }));
    r.warnungen.forEach((b) => warnungen.push({ ...b, ort: 'robots.txt' }));
  } else {
    warnungen.push({ ort: 'robots.txt', regel: 'keine-robots', meldung: 'Keine robots.txt im Ausgabeordner',
      tipp: 'Vorlage assets/vorlagen/robots.txt.ts. Ohne Datei gilt alles als erlaubt, auch das Training.' });
  }

  if (llms) console.log(`\nllms.txt: ${existsSync(join(ziel, 'llms.txt')) ? 'vorhanden' : 'nicht vorhanden'} (Information, keine Maßnahme, siehe 31-ki-sichtbarkeit-geo.md § 5)`);

  const seiten = htmlSammeln(ziel);
  for (const datei of seiten) {
    const rel = relative(process.cwd(), datei);
    let inhalt;
    try { inhalt = readFileSync(datei, 'utf8'); } catch { continue; }
    const r = seiteAnalysieren(inhalt, datei);
    r.fehler.forEach((b) => fehler.push({ ...b, ort: rel }));
    r.warnungen.forEach((b) => warnungen.push({ ...b, ort: rel }));
  }
  console.log(`\nGeprüft: ${seiten.length} Seiten`);

  const ausgeben = (titel, liste) => {
    if (!liste.length) return;
    console.log(`\n${titel} (${liste.length})`);
    for (const b of liste) {
      console.log(`  ${b.ort}  [${b.regel}] ${b.meldung}`);
      console.log(`    → ${b.tipp}`);
    }
  };
  ausgeben('FEHLER', fehler);
  ausgeben('WARNUNGEN', warnungen);

  const zaehlt = strict ? fehler.length + warnungen.length : fehler.length;
  if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
  else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.${strict ? ' (--strict: Warnungen zählen)' : ''}`);
  console.log('Ob ein Absatz die Frage im ersten Satz beantwortet, wird gelesen: 31-ki-sichtbarkeit-geo.md § 3.');
  process.exit(zaehlt ? 1 : 0);
}

const istHauptprogramm = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (istHauptprogramm) main();
