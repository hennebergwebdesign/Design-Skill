#!/usr/bin/env node
/*
  muster-vergleich.mjs — vergleicht einen Musterentwurf mit der bestehenden Bibliothek.

  WARUM ES DIESES SKRIPT GIBT
  Eine Bibliothek, in die jede neue Beobachtung als eigenes Muster wandert, hat nach zehn
  Projekten vier Varianten desselben Heldenbereichs und keine Aussage mehr. Vor Tor 2 steht
  deshalb die Frage: gibt es das schon, und wenn ja, wie nah.

  WAS VERGLICHEN WIRD
  Deklarierte Merkmale gegen deklarierte Merkmale: Kategorie, Sektionstypen, Tags, Stil und
  die beiden Zweckfelder. Bewusst kein Bildvergleich und keine Einbettung: dieses Repository
  hat keinen Abhängigkeitsbaum, und eine halbe Ähnlichkeitssuche wäre schlechter als eine
  ehrliche Merkmalsrechnung. Vektorsuche steht als Erweiterungspunkt in
  `../skills/webdesign-conversion/references/25-designmuster-bibliothek.md`.

  WAS ES NICHT TUT
  Es entscheidet nicht. Es legt die Zahlen und die Unterschiede vor, damit ein Mensch an Tor 2
  zwischen neuem Muster, Erweiterung, nur Projekt und Ablehnung wählen kann.

  AUFRUF
    node scripts/muster-vergleich.mjs --entwurf .designrecherche/referenzen/<id>/muster-entwurf.md
    node scripts/muster-vergleich.mjs --id ref-01-beispiel-de      nimmt den Entwurf aus der Ablage
    node scripts/muster-vergleich.mjs --entwurf … --bibliothek <ordner>

  EXIT
    0 = verglichen · 1 = Entwurf oder Bibliothek fehlt · 2 = Aufrufproblem
*/

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { frontmatterLesen } from './pruefe-muster.mjs';
import { registerLesen, registerSchreiben, finden, uebergang } from './referenz-register.mjs';

// Gewichte. Summe 1.0. Kategorie wiegt am schwersten, weil zwei Muster derselben Kategorie
// konkurrieren und zwei aus verschiedenen Kategorien nebeneinander bestehen können.
export const GEWICHTE = { kategorie: 0.3, sektionstyp: 0.2, tags: 0.3, stil: 0.1, zweck: 0.1 };

export const STUFEN = [
  { ab: 0.85, name: 'Duplikat', rat: 'nicht aufnehmen. Das Muster steht schon in der Bibliothek' },
  { ab: 0.65, name: 'Beinahe-Duplikat', rat: 'als Erweiterung des bestehenden Musters aufnehmen, nicht als neues' },
  { ab: 0.4, name: 'verwandt', rat: 'Erweiterung prüfen. Neues Muster nur, wenn der Unterschied ein eigenes Prinzip ist' },
  { ab: 0.2, name: 'ergänzend', rat: 'eigenes Muster, im Feld verwandt gegenseitig verlinken' },
  { ab: 0, name: 'unverwandt', rat: 'eigenes Muster' },
];

const alsListe = (x) => (Array.isArray(x) ? x : x === undefined || x === null || x === '' ? [] : [x]);

export function jaccard(a, b) {
  const mengeA = new Set(alsListe(a).map((s) => String(s).toLowerCase()));
  const mengeB = new Set(alsListe(b).map((s) => String(s).toLowerCase()));
  if (!mengeA.size && !mengeB.size) return 0;
  const schnitt = [...mengeA].filter((x) => mengeB.has(x)).length;
  return schnitt / (mengeA.size + mengeB.size - schnitt);
}

const WORTTRENNER = /[^a-zäöüß0-9]+/i;
const FUELLWOERTER = new Set(['und', 'oder', 'der', 'die', 'das', 'ein', 'eine', 'den', 'dem', 'des', 'im', 'in', 'auf', 'fuer', 'für', 'mit', 'ohne', 'zum', 'zur', 'als', 'nicht', 'ist', 'wird']);

export function worte(text) {
  return String(text ?? '')
    .toLowerCase()
    .split(WORTTRENNER)
    .filter((w) => w.length > 3 && !FUELLWOERTER.has(w));
}

export function aehnlichkeit(entwurf, muster) {
  const teile = {
    kategorie: entwurf.kategorie && entwurf.kategorie === muster.kategorie ? 1 : 0,
    sektionstyp: jaccard(entwurf.sektionstyp, muster.sektionstyp),
    tags: jaccard(entwurf.tags, muster.tags),
    stil: jaccard(entwurf.stil, muster.stil),
    zweck: jaccard(
      [...worte(entwurf.ux_zweck), ...worte(entwurf.conversion_zweck)],
      [...worte(muster.ux_zweck), ...worte(muster.conversion_zweck)]
    ),
  };
  const gesamt = Object.entries(GEWICHTE).reduce((s, [feld, g]) => s + teile[feld] * g, 0);
  return { gesamt: Number(gesamt.toFixed(3)), teile };
}

export function einstufen(gesamt) {
  return STUFEN.find((s) => gesamt >= s.ab) ?? STUFEN.at(-1);
}

export function unterschiede(entwurf, muster) {
  const zeilen = [];
  const vergleich = (feld, beschriftung) => {
    const a = alsListe(entwurf[feld]).join(', ') || '(leer)';
    const b = alsListe(muster[feld]).join(', ') || '(leer)';
    if (a !== b) zeilen.push({ feld: beschriftung, entwurf: a, bestand: b });
  };
  vergleich('kategorie', 'Kategorie');
  vergleich('sektionstyp', 'Sektionstyp');
  vergleich('tags', 'Tags');
  vergleich('stil', 'Stil');
  vergleich('ux_zweck', 'UX-Zweck');
  vergleich('conversion_zweck', 'Conversion-Zweck');
  vergleich('komplexitaet', 'Komplexität');
  vergleich('responsiv', 'Responsiv');
  return zeilen;
}

export function vergleichen(entwurf, index, grenze = 0.2) {
  return index.muster
    .map((muster) => {
      const { gesamt, teile } = aehnlichkeit(entwurf, muster);
      return { muster, gesamt, teile, stufe: einstufen(gesamt), unterschiede: unterschiede(entwurf, muster) };
    })
    .filter((t) => t.gesamt >= grenze)
    .sort((a, b) => b.gesamt - a.gesamt);
}

export function berichtBauen(entwurf, treffer, anzahlBibliothek) {
  const kopf = [
    `# Ähnlichkeitsprüfung: ${entwurf.name ?? entwurf.id ?? '(ohne Namen)'}`,
    '',
    `Verglichen gegen ${anzahlBibliothek} Muster der Bibliothek, ${new Date().toLocaleString('de-DE')}.`,
    '',
    'Verglichen werden deklarierte Merkmale, nicht Bilder. Die Zahl ist ein Hinweis, keine',
    'Entscheidung. Entschieden wird an Tor 2, siehe designrecherche-ablauf.md.',
    '',
  ];

  if (!treffer.length) {
    return [
      ...kopf,
      '## Ergebnis',
      '',
      'Kein Muster der Bibliothek erreicht auch nur eine schwache Ähnlichkeit. Das spricht für',
      'ein eigenes Muster. Gegenprobe: ist die Kategorie richtig gewählt, und sind die Tags',
      'überhaupt gesetzt? Ein Entwurf ohne Tags ist zu allem unähnlich.',
      '',
    ].join('\n');
  }

  const tabelle = [
    '| Bestehendes Muster | Ähnlichkeit | Einstufung | Empfehlung |',
    '|---|---|---|---|',
    ...treffer.map(
      (t) =>
        `| \`${t.muster.id}\` | ${(t.gesamt * 100).toFixed(0)} % | ${t.stufe.name} | ${t.stufe.rat} |`
    ),
    '',
  ];

  const bloecke = treffer.slice(0, 3).map((t) => {
    const anteile = Object.entries(t.teile)
      .map(([feld, w]) => `${feld} ${(w * 100).toFixed(0)} %`)
      .join(', ');
    return [
      `### ${t.muster.name} (\`${t.muster.id}\`)`,
      '',
      `Ähnlichkeit ${(t.gesamt * 100).toFixed(0)} %, davon ${anteile}.`,
      '',
      t.unterschiede.length ? '| Feld | Entwurf | Bestand |\n|---|---|---|' : '(keine Feldunterschiede)',
      ...t.unterschiede.map((u) => `| ${u.feld} | ${u.entwurf} | ${u.bestand} |`),
      '',
    ].join('\n');
  });

  return [
    ...kopf,
    '## Treffer',
    '',
    ...tabelle,
    '## Die drei nächsten im Detail',
    '',
    ...bloecke,
    '## Entscheidung an Tor 2',
    '',
    '```bash',
    'node scripts/referenz-register.mjs wissen --id <kennung> --entscheidung global',
    'node scripts/referenz-register.mjs wissen --id <kennung> --entscheidung erweitern --muster <muster-id>',
    'node scripts/referenz-register.mjs wissen --id <kennung> --entscheidung projekt',
    'node scripts/referenz-register.mjs wissen --id <kennung> --entscheidung ablehnen',
    '```',
    '',
  ].join('\n');
}

// -------------------------------------------------------------------- Aufruf

const istHauptprogramm = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (istHauptprogramm) {
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
  const BIBLIOTHEK = opt(
    '--bibliothek',
    fileURLToPath(new URL('../skills/webdesign-conversion/assets/musterbibliothek/', import.meta.url))
  );

  const id = opt('--id');
  const entwurfPfad = opt('--entwurf', id ? join(WURZEL, id, 'muster-entwurf.md') : null);
  if (!entwurfPfad) raus('Aufruf: node scripts/muster-vergleich.mjs --entwurf <datei> | --id <kennung>', 2);
  if (!existsSync(entwurfPfad)) raus(`Kein Musterentwurf unter ${entwurfPfad}. Erst design-dna.mjs laufen lassen.`, 1);

  const indexPfad = join(BIBLIOTHEK, 'index.json');
  if (!existsSync(indexPfad)) {
    raus(`Kein Index unter ${indexPfad}. Erst node scripts/pruefe-muster.mjs --index laufen lassen.`, 1);
  }

  const { kopf, fehler } = frontmatterLesen(readFileSync(entwurfPfad, 'utf8'));
  if (fehler || !kopf) raus(`Entwurf nicht lesbar: ${fehler}`, 2);

  // JSON.stringify statt String: ein Platzhalter wie "[[FEHLT: …]]" wird vom Frontmatter-Leser
  // als Inline-Liste erkannt, und String(['[FEHLT: …']) verliert die aeussere Klammer.
  const offen = Object.entries(kopf).filter(([, w]) => JSON.stringify(w).includes('FEHLT'));
  if (offen.length) {
    raus(
      `Der Entwurf hat noch ${offen.length} offene Felder: ${offen.map(([k]) => k).join(', ')}.\n` +
        'Ein Vergleich gegen Platzhalter misst nichts. Erst den Entwurf füllen.',
      2
    );
  }

  const index = JSON.parse(readFileSync(indexPfad, 'utf8'));
  const treffer = vergleichen(kopf, index);
  const bericht = berichtBauen(kopf, treffer, index.muster.length);

  const zielOrdner = id ? join(WURZEL, id) : dirname(entwurfPfad);
  const berichtPfad = join(zielOrdner, 'vergleich.md');
  mkdirSync(zielOrdner, { recursive: true });
  writeFileSync(berichtPfad, bericht, 'utf8');

  console.log(bericht);
  console.log(`\nBericht abgelegt: ${berichtPfad}`);

  if (id && existsSync(PFAD)) {
    const register = registerLesen(PFAD);
    const eintrag = finden(register, id);
    if (eintrag && eintrag.zustand === 'ANALYSIERT') {
      uebergang(eintrag, 'OFFEN_FUER_WISSEN', 'muster-vergleich.mjs');
      eintrag.vergleich = berichtPfad;
      registerSchreiben(PFAD, register);
      console.log(`${id} steht jetzt auf OFFEN_FUER_WISSEN. Tor 2 entscheidet ein Mensch.`);
    }
  }
  process.exit(0);
}
