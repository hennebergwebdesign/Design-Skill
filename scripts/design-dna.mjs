#!/usr/bin/env node
/*
  design-dna.mjs — macht aus erfassten Rohdaten eine Design DNA mit Belegen.

  WARUM ES DIESES SKRIPT GIBT
  Zwischen "wir haben die Seite abgerufen" und "wir haben verstanden, warum sie funktioniert"
  liegt der Schritt, an dem üblicherweise erfunden wird. Aus einem HTML-Dokument lassen sich
  Sektionsfolge, Komponenten und Bildbelegung ablesen. Spacing-Skala, Rasterbreite und
  responsives Verhalten lassen sich daraus NICHT ablesen. Wer sie trotzdem angibt, hat sie
  geschätzt.

  Dieses Skript trennt beides hart. Jeder Wert bekommt einen Beleg:

    beobachtet   direkt im erfassten Material gefunden, mit Fundstelle
    abgeleitet   aus Beobachtetem begründet geschlossen, nicht gemessen
    unbekannt    nicht erfassbar gewesen. Wird nie durch eine Schätzung ersetzt

  WAS ES NICHT TUT
  Es benennt keine Prinzipien und bewertet nichts als gut. Das bleibt die eigene Sichtung,
  siehe `../skills/webdesign-conversion/references/25-designmuster-bibliothek.md`. Das Skript
  legt dafür einen Musterentwurf mit offenen Feldern an, statt sie zu füllen.

  ABGELEGT WIRD IN .designrecherche/referenzen/<id>/
    dna.json            alle Beobachtungen, je Wert mit Beleg
    dna.md              dieselben Daten lesbar, mit der Liste der unbekannten Felder
    muster-entwurf.md   Frontmatter-Gerüst für die Musterbibliothek, Prinzipien offen

  AUFRUF
    node scripts/design-dna.mjs --id ref-01-beispiel-de
    node scripts/design-dna.mjs --alle

  EXIT
    0 = analysiert · 1 = nichts zu analysieren · 2 = Aufrufproblem oder falscher Zustand
*/

import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

import { registerLesen, registerSchreiben, finden, uebergang } from './referenz-register.mjs';

// ------------------------------------------------------------------ Hilfen

export const BELEG = { beobachtet: 'beobachtet', abgeleitet: 'abgeleitet', unbekannt: 'unbekannt' };

export function wert(inhalt, beleg, quelle = '') {
  return { wert: beleg === BELEG.unbekannt ? null : inhalt, beleg, quelle };
}

const ohneTags = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const zaehle = (html, re) => (html.match(re) ?? []).length;

/** Sektionsfolge aus der Überschriftenhierarchie plus Wortzahl und Bildern je Abschnitt. */
export function sektionen(html) {
  const marken = [...html.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi)];
  const ergebnis = [];
  marken.forEach((m, i) => {
    const start = m.index + m[0].length;
    const ende = i + 1 < marken.length ? marken[i + 1].index : html.length;
    const stueck = html.slice(start, ende);
    ergebnis.push({
      ebene: Number(m[1]),
      ueberschrift: ohneTags(m[2]),
      woerter: ohneTags(stueck).split(/\s+/).filter(Boolean).length,
      bilder: zaehle(stueck, /<img\b/gi) + zaehle(stueck, /<picture\b/gi),
    });
  });
  return ergebnis;
}

/** Welche Bausteine im Dokument tatsächlich vorkommen. Zählbar, also beobachtet. */
export function komponenten(html) {
  const gefunden = {
    navigation: zaehle(html, /<nav\b/gi),
    formular: zaehle(html, /<form\b/gi),
    akkordeon: zaehle(html, /<details\b/gi) + zaehle(html, /aria-expanded=/gi),
    tabelle: zaehle(html, /<table\b/gi),
    video: zaehle(html, /<video\b/gi),
    einbettung: zaehle(html, /<iframe\b/gi),
    schaltflaeche: zaehle(html, /<button\b/gi),
    bild: zaehle(html, /<img\b/gi),
    vektor: zaehle(html, /<svg\b/gi),
    liste: zaehle(html, /<ul\b/gi) + zaehle(html, /<ol\b/gi),
    zitat: zaehle(html, /<blockquote\b/gi),
  };
  return Object.fromEntries(Object.entries(gefunden).filter(([, n]) => n > 0));
}

/** Inline-CSS ist die einzige Stelle, an der ohne zweiten Abruf CSS sichtbar ist. */
export function inlineCss(html) {
  const bloecke = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const attribute = [...html.matchAll(/style=["']([^"']*)["']/gi)].map((m) => m[1]).join('\n');
  return `${bloecke}\n${attribute}`;
}

export function externeStylesheets(html) {
  return [...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)].length;
}

export function medienabfragen(css) {
  const werte = new Set();
  for (const m of css.matchAll(/@media[^{]*?\(\s*(?:min|max)-width\s*:\s*([\d.]+)(px|rem|em)/gi)) {
    const zahl = Number(m[1]);
    werte.add(m[2] === 'px' ? zahl : Math.round(zahl * 16));
  }
  return [...werte].sort((a, b) => a - b);
}

export function bewegungsbibliotheken(html) {
  const treffer = [];
  for (const [name, re] of [
    ['GSAP', /gsap|ScrollTrigger/i],
    ['Framer Motion', /framer-motion/i],
    ['Lenis', /lenis/i],
    ['AOS', /\baos\b/i],
    ['Swiper', /swiper/i],
    ['Locomotive', /locomotive/i],
  ]) {
    if (re.test(html)) treffer.push(name);
  }
  return treffer;
}

// --------------------------------------------------------------- Analyse

export function dnaBauen(html, meta, breakpointDateien = []) {
  const css = inlineCss(html);
  const externe = externeStylesheets(html);
  const abschnitte = sektionen(html);
  const bausteine = komponenten(html);
  const mq = medienabfragen(css);
  const bewegung = bewegungsbibliotheken(html);
  const cssUnvollstaendig = externe > 0;

  const grundCssBeleg = cssUnvollstaendig ? BELEG.unbekannt : BELEG.beobachtet;
  const cssQuelle = cssUnvollstaendig
    ? `${externe} externe Stylesheets wurden nicht mit erfasst, aus dem Dokument allein nicht ablesbar`
    : 'Inline-CSS des Dokuments';

  const containerTreffer = css.match(/max-width\s*:\s*([\d.]+(?:px|rem))/i);
  const rasterTreffer = css.match(/grid-template-columns\s*:\s*([^;}]+)/i);

  const responsiv = {};
  if (breakpointDateien.length) {
    for (const bp of breakpointDateien) {
      responsiv[bp.breite] = {
        sektionen: wert(sektionen(bp.html).length, BELEG.beobachtet, `Erfassung bei ${bp.breite} px`),
        navigation: wert(
          komponenten(bp.html).navigation ?? 0,
          BELEG.beobachtet,
          `Erfassung bei ${bp.breite} px`
        ),
      };
    }
  }

  return {
    referenz: meta.referenz,
    adresse: meta.adresse,
    erzeugt: new Date().toISOString(),
    grundlage: {
      abrufart: meta.abrufart,
      breakpoints_erfasst: meta.breakpoints_erfasst ?? [],
      analyse_umfang: meta.analyse_umfang,
      grenzen_aus_dem_abruf: meta.grenzen ?? [],
    },

    struktur: {
      sektionsfolge: wert(
        abschnitte.map((a) => `H${a.ebene} ${a.ueberschrift}`),
        abschnitte.length ? BELEG.beobachtet : BELEG.unbekannt,
        'Überschriftenhierarchie des Dokuments'
      ),
      sektionen_mit_dichte: wert(abschnitte, abschnitte.length ? BELEG.beobachtet : BELEG.unbekannt, 'Wortzahl und Bilder je Abschnitt'),
      bild_text_verhaeltnis: wert(
        abschnitte.length
          ? Number(
              (
                abschnitte.reduce((s, a) => s + a.bilder, 0) /
                Math.max(1, abschnitte.reduce((s, a) => s + a.woerter, 0) / 100)
              ).toFixed(2)
            )
          : null,
        abschnitte.length ? BELEG.abgeleitet : BELEG.unbekannt,
        'Bilder je 100 Wörter, aus den beobachteten Abschnitten gerechnet'
      ),
    },

    layout: {
      containerbreite: containerTreffer
        ? wert(containerTreffer[1], grundCssBeleg, cssQuelle)
        : wert(null, BELEG.unbekannt, cssQuelle),
      raster: rasterTreffer
        ? wert(rasterTreffer[1].trim(), grundCssBeleg, cssQuelle)
        : wert(null, BELEG.unbekannt, cssQuelle),
      spacing_skala: wert(null, BELEG.unbekannt, 'aus HTML allein nicht ablesbar, dafür brauchte es berechnete Stile'),
      sektionsrhythmus: wert(null, BELEG.unbekannt, 'siehe spacing_skala'),
    },

    typografie: {
      hierarchietiefe: wert(
        [...new Set(abschnitte.map((a) => a.ebene))].sort(),
        abschnitte.length ? BELEG.beobachtet : BELEG.unbekannt,
        'verwendete Überschriftenebenen'
      ),
      schriftkandidaten: wert(
        [...new Set([...css.matchAll(/font-family\s*:\s*([^;"'}]+)/gi)].map((m) => m[1].trim()))].slice(0, 10),
        grundCssBeleg,
        cssQuelle
      ),
      groessenverhaeltnisse: wert(null, BELEG.unbekannt, 'brauchte berechnete Stile, nicht aus dem Dokument ablesbar'),
      $hinweis:
        'Schriften sind Kandidaten, nie Tokenwerte. Das Designsystem des Kunden geht vor, siehe 24-designsystem-vorrang.md.',
    },

    farbe: {
      kandidaten: wert(
        [...new Set((css.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).concat(css.match(/rgba?\([^)]+\)/g) ?? []))].slice(0, 20),
        grundCssBeleg,
        cssQuelle
      ),
      kontrastverhaeltnisse: wert(null, BELEG.unbekannt, 'brauchte berechnete Stile je Textknoten'),
      $hinweis:
        'Nur Verhältnisse sind übertragbar, nie die Werte. Kundenfarben werden nie ersetzt, siehe 24-designsystem-vorrang.md.',
    },

    komponenten: wert(bausteine, BELEG.beobachtet, 'Auszählung der Elemente im Dokument'),

    interaktion: {
      bewegungsbibliotheken: wert(bewegung, bewegung.length ? BELEG.beobachtet : BELEG.unbekannt, 'Skript- und Klassennamen im Dokument'),
      klebende_elemente: wert(
        /position\s*:\s*sticky/i.test(css) ? true : null,
        /position\s*:\s*sticky/i.test(css) ? BELEG.beobachtet : BELEG.unbekannt,
        cssQuelle
      ),
      hover_verhalten: wert(null, BELEG.unbekannt, 'Hover ist ohne berechnete Stile und ohne Browser nicht erfassbar'),
    },

    responsiv: breakpointDateien.length
      ? responsiv
      : {
          $hinweis: wert(
            null,
            BELEG.unbekannt,
            'keine Breakpoint-Erfassung vorhanden. Mit --breakpoints und Playwright erneut erfassen'
          ),
          medienabfragen_im_inline_css: wert(mq, mq.length ? BELEG.beobachtet : BELEG.unbekannt, cssQuelle),
        },

    prinzipien: [],
    $prinzipien_hinweis:
      'Bewusst leer. Ein Prinzip zu benennen ist eine Bewertung, und dieses Skript bewertet nicht. Siehe muster-entwurf.md und 25-designmuster-bibliothek.md.',
  };
}

export function unbekannteFelder(dna, pfad = '') {
  const treffer = [];
  for (const [schluessel, inhalt] of Object.entries(dna)) {
    if (!inhalt || typeof inhalt !== 'object') continue;
    const voll = pfad ? `${pfad}.${schluessel}` : schluessel;
    if (inhalt.beleg === BELEG.unbekannt) treffer.push({ feld: voll, grund: inhalt.quelle });
    else if (!inhalt.beleg) treffer.push(...unbekannteFelder(inhalt, voll));
  }
  return treffer;
}

// -------------------------------------------------------------------- Aufruf

const istHauptprogramm = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (istHauptprogramm) {
  const args = process.argv.slice(2);
  const opt = (name, standard = null) => {
    const i = args.indexOf(name);
    return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : standard;
  };
  const PFAD = opt('--register', join('.designrecherche', 'register.json'));
  const WURZEL = opt('--ablage', join('.designrecherche', 'referenzen'));

  const raus = (text, code) => {
    (code ? console.error : console.log)(text);
    process.exit(code);
  };

  let register;
  try {
    register = registerLesen(PFAD);
  } catch (f) {
    raus(f.message, 2);
  }

  let ziele;
  if (args.includes('--alle')) {
    ziele = register.referenzen.filter((r) => r.zustand === 'GECRAWLT');
    if (!ziele.length) raus('Kein Eintrag im Zustand GECRAWLT. Erst erfassen.', 1);
  } else {
    const id = opt('--id');
    if (!id) raus('Aufruf: node scripts/design-dna.mjs --id <kennung> | --alle', 2);
    const eintrag = finden(register, id);
    if (!eintrag) raus(`Kein Eintrag mit der Kennung ${id}.`, 1);
    if (eintrag.zustand !== 'GECRAWLT') {
      raus(`${id} steht auf ${eintrag.zustand}, nicht auf GECRAWLT. Es wird nichts analysiert.`, 2);
    }
    ziele = [eintrag];
  }

  const schreiben = (pfad, inhalt) => {
    mkdirSync(dirname(pfad), { recursive: true });
    writeFileSync(pfad, inhalt, 'utf8');
  };

  let fertig = 0;
  for (const eintrag of ziele) {
    const ordner = join(WURZEL, eintrag.id);
    const metaPfad = join(ordner, 'meta.json');
    const seitePfad = join(ordner, 'roh', 'seite.html');
    if (!existsSync(metaPfad) || !existsSync(seitePfad)) {
      console.error(`${eintrag.id}: Rohdaten fehlen unter ${ordner}. Erst erfassen.`);
      continue;
    }

    const meta = JSON.parse(readFileSync(metaPfad, 'utf8'));
    const html = readFileSync(seitePfad, 'utf8');
    const breakpointDateien = readdirSync(join(ordner, 'roh'))
      .filter((d) => /^\d+\.html$/.test(d))
      .map((d) => ({ breite: Number(d.replace('.html', '')), html: readFileSync(join(ordner, 'roh', d), 'utf8') }))
      .sort((a, b) => a.breite - b.breite);

    const dna = dnaBauen(html, meta, breakpointDateien);
    schreiben(join(ordner, 'dna.json'), `${JSON.stringify(dna, null, 2)}\n`);

    const offen = unbekannteFelder(dna);
    const md = [
      `# Design DNA ${eintrag.name}`,
      '',
      `Referenz ${eintrag.id}, erfasst über ${meta.abrufart}, analysiert ${new Date().toLocaleString('de-DE')}.`,
      '',
      `Freigegebener Analyseumfang: ${meta.analyse_umfang?.umfang ?? 'unbekannt'}` +
        (meta.analyse_umfang?.sektionen?.length ? ` (${meta.analyse_umfang.sektionen.join(', ')})` : ''),
      '',
      '## Beobachtete Sektionsfolge',
      '',
      dna.struktur.sektionsfolge.wert?.length
        ? dna.struktur.sektionsfolge.wert.map((s) => `- ${s}`).join('\n')
        : '- keine Überschriften gefunden, das ist selbst ein Befund',
      '',
      '## Beobachtete Komponenten',
      '',
      Object.entries(dna.komponenten.wert ?? {})
        .map(([k, n]) => `- ${k}: ${n}`)
        .join('\n') || '- keine',
      '',
      '## Was unbekannt bleibt',
      '',
      'Diese Felder wurden **nicht** erfasst. Sie werden nicht geschätzt und nicht aus dem',
      'Gedächtnis ergänzt. Wer sie braucht, erfasst erneut mit Browser oder Firecrawl.',
      '',
      offen.length ? offen.map((o) => `- **${o.feld}**: ${o.grund}`).join('\n') : '- nichts, die Erfassung war vollständig',
      '',
      '## Nächster Schritt',
      '',
      'Prinzipien benennen, in `muster-entwurf.md`. Das Skript tut das bewusst nicht: ein',
      'Prinzip ist eine Bewertung, und die trifft ein Mensch.',
      '',
    ].join('\n');
    schreiben(join(ordner, 'dna.md'), md);

    const entwurfPfad = join(ordner, 'muster-entwurf.md');
    if (!existsSync(entwurfPfad)) {
      const entwurf = [
        '---',
        `id: [[FEHLT: kleingeschriebene Kennung, wird der Dateiname]]`,
        'name: [[FEHLT: sprechender Name des Musters]]',
        'kategorie: [[FEHLT: ein Schlüssel aus taxonomie.json]]',
        'sektionstyp: []',
        'tags: []',
        'stil: []',
        'branchenbezug: []',
        'ux_zweck: [[FEHLT]]',
        'conversion_zweck: [[FEHLT]]',
        `responsiv: ${
          breakpointDateien.length ? '[[FEHLT: aus den erfassten Breakpoints beschreiben]]' : 'unbekannt, keine Breakpoint-Erfassung'
        }`,
        'komplexitaet: [[FEHLT: niedrig, mittel oder hoch]]',
        'barrierefreiheit: [[FEHLT]]',
        'verwandt: []',
        `quelle_url: ${eintrag.url}`,
        `quelle_erfasst: ${new Date().toISOString().slice(0, 10)}`,
        'konfidenz: [[FEHLT: hoch, mittel oder niedrig]]',
        'freigabe: [[FEHLT: erst nach Tor 2 setzen]]',
        `aufgenommen: ${new Date().toISOString().slice(0, 10)}`,
        '---',
        '',
        '# [[FEHLT: Name]]',
        '',
        '## Prinzip',
        '',
        '[[FEHLT: was das Muster tut, in drei bis fünf Sätzen]]',
        '',
        '## Warum es wirkt',
        '',
        '[[FEHLT: die eigentliche Frage. Nicht wie es aussieht, sondern warum es funktioniert]]',
        '',
        '## Belege',
        '',
        '| Aussage | Beleg |',
        '|---|---|',
        '| [[FEHLT]] | beobachtet, siehe dna.json |',
        '| [[FEHLT]] | abgeleitet |',
        '| [[FEHLT]] | unbekannt |',
        '',
        '## Umsetzung',
        '',
        '- [[FEHLT: was beim Nachbauen im Agenturstack zu beachten ist]]',
        '',
        '## Was nicht übernommen wird',
        '',
        '[[FEHLT: Texte, Bildmaterial, Logo, Farben und Schriften der Referenz]]',
        '',
      ].join('\n');
      schreiben(entwurfPfad, entwurf);
    }

    try {
      uebergang(eintrag, 'ANALYSIERT', 'design-dna.mjs');
      eintrag.dna = join(ordner, 'dna.json');
    } catch (f) {
      raus(f.message, 2);
    }
    fertig += 1;
    console.log(`${eintrag.id}: analysiert, ${offen.length} Felder bleiben unbekannt.`);
  }

  if (fertig) registerSchreiben(PFAD, register);
  console.log(`\n${fertig} analysiert.`);
  process.exit(fertig ? 0 : 1);
}
