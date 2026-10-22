#!/usr/bin/env node
/*
  schrift-metriken.mjs — liest die Metriken einer Schriftdatei und erzeugt die
  Ersatzschrift mit size-adjust und Overrides, damit der Schriftwechsel nicht springt.

  WARUM ES DIESES SKRIPT GIBT
  Mit font-display: swap steht der Text zuerst in der Systemschrift und springt beim
  Eintreffen der Webschrift auf neue Zeilenlängen und Zeilenhöhen. Das ist Layoutverschiebung
  (CLS) und auf dem Handy oft eine ganze Zeile. Die Abhilfe ist eine zweite @font-face, die
  eine lokale Systemschrift so skaliert, dass sie die Webschrift in Breite und Höhe nachbildet.
  Die Werte dafür stehen in der Schriftdatei. Geschätzt sind sie wertlos, deshalb liest sie
  dieses Skript aus, statt sie aus einem Blogartikel abzuschreiben.

  WAS GELESEN WIRD
  head (unitsPerEm), hhea (Ober- und Unterlänge, Zeilenabstand), OS/2 (x-Höhe,
  Versalhöhe, Gewicht), cmap und hmtx (Laufweite je Zeichen). Formate: WOFF2, WOFF, TTF, OTF.
  Die mittlere Breite wird an einem deutschen Mustertext gemessen, nicht am Feld
  xAvgCharWidth: das mittelt über alle Glyphen einschließlich Sonderzeichen und trifft die
  Breite echten Fließtexts schlecht.

  ERSATZSCHRIFTEN
    arial  (Voreinstellung)  Werte gelesen aus LiberationSans-Regular.ttf, das metrisch mit
                             Arial übereinstimmt (gleiche Laufweiten und Höhen).
    arial-fett               dasselbe aus LiberationSans-Bold.ttf. Für eine Display-Schrift
                             ab Gewicht 600: sonst vergleicht man fett mit normal, und der
                             Browser setzt den Ersatz zusätzlich künstlich fett.
    times, times-fett        aus LiberationSerif-Regular.ttf und -Bold.ttf, metrisch gleich
                             Times New Roman. Für Serifen.
    pfad/zur/datei.ttf       eigene Ersatzschrift messen.

  AUFRUF
    node scripts/schrift-metriken.mjs public/fonts/marke-400.woff2
    node scripts/schrift-metriken.mjs public/fonts/marke-400.woff2 --name "Marke" --ersatz times
    node scripts/schrift-metriken.mjs datei.woff2 --json

  EXIT
    0 = erzeugt · 2 = Aufrufproblem oder Datei nicht lesbar
*/

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { brotliDecompressSync, inflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

/* Ein gewöhnlicher deutscher Absatz. Echter Text gewichtet die Buchstaben so, wie sie im
   Fließtext vorkommen, ohne dass eine Häufigkeitstabelle behauptet werden muss. */
export const MUSTERTEXT = 'Wir planen und bauen Ihre neue Küche, vom ersten Aufmaß bis zur Übergabe. '
  + 'Unsere Tischlerei arbeitet seit vielen Jahren in der Region und kennt die Wünsche ihrer Kunden genau. '
  + 'Fragen Sie uns nach einem Termin, wir melden uns schnell zurück und beraten Sie gern persönlich.';

/* Gemessen mit diesem Skript (Funktion schriftLesen) aus den Liberation-Dateien in
   /usr/share/fonts/truetype/liberation, gemessen am 06.10.2026. Liberation Sans und Serif sind
   metrisch kompatibel zu Arial und Times New Roman, deshalb stehen sie hier für diese. */
export const ERSATZ = {
  arial: {
    name: 'Arial', lokal: ['Arial', 'ArialMT', 'Liberation Sans'], generisch: 'sans-serif',
    einheiten: 2048, oberlaenge: 1854, unterlaenge: -434, zeilenabstand: 67, mittelbreite: 0.461,
  },
  'arial-fett': {
    name: 'Arial Bold', lokal: ['Arial Bold', 'Arial-BoldMT', 'Liberation Sans Bold'], generisch: 'sans-serif',
    einheiten: 2048, oberlaenge: 1854, unterlaenge: -434, zeilenabstand: 67, mittelbreite: 0.4932,
  },
  times: {
    name: 'Times New Roman', lokal: ['Times New Roman', 'TimesNewRomanPSMT', 'Liberation Serif'], generisch: 'serif',
    einheiten: 2048, oberlaenge: 1825, unterlaenge: -443, zeilenabstand: 87, mittelbreite: 0.416,
  },
  'times-fett': {
    name: 'Times New Roman Bold', lokal: ['Times New Roman Bold', 'TimesNewRomanPS-BoldMT', 'Liberation Serif Bold'], generisch: 'serif',
    einheiten: 2048, oberlaenge: 1825, unterlaenge: -443, zeilenabstand: 87, mittelbreite: 0.4452,
  },
};

const WOFF2_TAGS = ['cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm',
  'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern', 'LTSH', 'PCLT',
  'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH', 'CBDT', 'CBLC',
  'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat',
  'fmtx', 'fvar', 'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf',
  'Silf', 'Glat', 'Gloc', 'Feat', 'Sill'];

const tag = (b, o) => String.fromCharCode(b[o], b[o + 1], b[o + 2], b[o + 3]);

/* Liefert { tabellen: Map<tag, Buffer>, hmtxTransformiert } aus einer beliebigen Schriftdatei. */
export function tabellenLesen(buf) {
  const sig = tag(buf, 0);
  const tabellen = new Map();
  if (sig === 'wOF2') {
    const anzahl = buf.readUInt16BE(12);
    const komprimiert = buf.readUInt32BE(20);
    let o = 48;
    const base128 = () => {
      let w = 0;
      for (let i = 0; i < 5; i++) {
        const b = buf[o++];
        w = w * 128 + (b & 0x7f);
        if (!(b & 0x80)) return w;
      }
      throw new Error('WOFF2: ungültige Längenangabe');
    };
    const eintraege = [];
    for (let i = 0; i < anzahl; i++) {
      const flags = buf[o++];
      const t = (flags & 0x3f) === 63 ? (o += 4, tag(buf, o - 4)) : WOFF2_TAGS[flags & 0x3f];
      const version = (flags >> 6) & 3;
      const laenge = base128();
      /* glyf und loca: Version 0 heißt transformiert, 3 heißt unverändert. Alle anderen
         Tabellen umgekehrt: 0 unverändert, alles andere transformiert. */
      const transformiert = (t === 'glyf' || t === 'loca') ? version !== 3 : version !== 0;
      const gespeichert = transformiert ? base128() : laenge;
      eintraege.push({ t, gespeichert, transformiert });
    }
    if (tag(buf, 4) === 'ttcf') throw new Error('WOFF2-Sammlungen (ttcf) werden nicht unterstützt');
    const daten = brotliDecompressSync(buf.subarray(o, o + komprimiert));
    let p = 0;
    let hmtxTransformiert = false;
    for (const e of eintraege) {
      tabellen.set(e.t, daten.subarray(p, p + e.gespeichert));
      if (e.t === 'hmtx' && e.transformiert) hmtxTransformiert = true;
      p += e.gespeichert;
    }
    return { tabellen, hmtxTransformiert, format: 'WOFF2' };
  }
  if (sig === 'wOFF') {
    const anzahl = buf.readUInt16BE(12);
    for (let i = 0; i < anzahl; i++) {
      const e = 44 + i * 20;
      const off = buf.readUInt32BE(e + 4), komp = buf.readUInt32BE(e + 8), orig = buf.readUInt32BE(e + 12);
      const roh = buf.subarray(off, off + komp);
      tabellen.set(tag(buf, e), komp < orig ? inflateSync(roh) : roh);
    }
    return { tabellen, hmtxTransformiert: false, format: 'WOFF' };
  }
  if (sig === 'OTTO' || sig === 'true' || buf.readUInt32BE(0) === 0x00010000) {
    const anzahl = buf.readUInt16BE(4);
    for (let i = 0; i < anzahl; i++) {
      const e = 12 + i * 16;
      const off = buf.readUInt32BE(e + 8), len = buf.readUInt32BE(e + 12);
      tabellen.set(tag(buf, e), buf.subarray(off, off + len));
    }
    return { tabellen, hmtxTransformiert: false, format: sig === 'OTTO' ? 'OTF' : 'TTF' };
  }
  throw new Error(`unbekanntes Schriftformat (Signatur "${sig}")`);
}

/* Zeichen → Glyph über cmap Format 4 oder 12, Plattform 3 (Windows) oder 0 (Unicode). */
function cmapLesen(c) {
  const anzahl = c.readUInt16BE(2);
  let beste = null;
  for (let i = 0; i < anzahl; i++) {
    const pl = c.readUInt16BE(4 + i * 8), en = c.readUInt16BE(6 + i * 8), off = c.readUInt32BE(8 + i * 8);
    const fmt = c.readUInt16BE(off);
    const rang = fmt === 12 ? 3 : (fmt === 4 && (pl === 3 || pl === 0) ? 2 : 0);
    if (rang && (!beste || rang > beste.rang)) beste = { off, fmt, rang, pl, en };
  }
  if (!beste) throw new Error('keine nutzbare cmap-Tabelle (Format 4 oder 12)');
  const { off, fmt } = beste;
  if (fmt === 12) {
    const gruppen = c.readUInt32BE(off + 12);
    return (cp) => {
      for (let g = 0; g < gruppen; g++) {
        const b = off + 16 + g * 12;
        const start = c.readUInt32BE(b), ende = c.readUInt32BE(b + 4);
        if (cp >= start && cp <= ende) return c.readUInt32BE(b + 8) + (cp - start);
      }
      return 0;
    };
  }
  const seg = c.readUInt16BE(off + 6) / 2;
  const ende = off + 14, start = ende + seg * 2 + 2, delta = start + seg * 2, bereich = delta + seg * 2;
  return (cp) => {
    for (let s = 0; s < seg; s++) {
      if (cp > c.readUInt16BE(ende + s * 2)) continue;
      const st = c.readUInt16BE(start + s * 2);
      if (cp < st) return 0;
      const d = c.readInt16BE(delta + s * 2), r = c.readUInt16BE(bereich + s * 2);
      if (r === 0) return (cp + d) & 0xffff;
      const g = c.readUInt16BE(bereich + s * 2 + r + (cp - st) * 2);
      return g === 0 ? 0 : (g + d) & 0xffff;
    }
    return 0;
  };
}

/* Liest alle Werte, die für Ersatzschrift und Typografie zählen. */
export function schriftLesen(buf, text = MUSTERTEXT) {
  const { tabellen, hmtxTransformiert, format } = tabellenLesen(buf);
  for (const t of ['head', 'hhea', 'hmtx', 'cmap']) {
    if (!tabellen.get(t)?.length) throw new Error(`Tabelle ${t} fehlt`);
  }
  const head = tabellen.get('head'), hhea = tabellen.get('hhea'), os2 = tabellen.get('OS/2');
  const hmtx = tabellen.get('hmtx');
  const einheiten = head.readUInt16BE(18);
  const metriken = hhea.readUInt16BE(34);
  /* Transformiertes hmtx in WOFF2: ein Flagbyte, danach die Vorschubbreiten unverändert. */
  const hmtxStart = hmtxTransformiert ? 1 : 0;
  const schritt = hmtxTransformiert ? 2 : 4;
  const vorschub = (g) => hmtx.readUInt16BE(hmtxStart + Math.min(g, metriken - 1) * schritt);
  const glyph = cmapLesen(tabellen.get('cmap'));

  let summe = 0, gezaehlt = 0;
  const fehlend = new Set();
  for (const z of text) {
    const g = glyph(z.codePointAt(0));
    if (!g) { fehlend.add(z); continue; }
    summe += vorschub(g);
    gezaehlt++;
  }
  if (!gezaehlt) throw new Error('kein Zeichen des Mustertexts in der Schrift');

  const os = os2 && os2.length >= 78 ? {
    gewicht: os2.readUInt16BE(4),
    typoMetrikenNutzen: Boolean(os2.readUInt16BE(62) & 0x80),
    typoOber: os2.readInt16BE(68), typoUnter: os2.readInt16BE(70), typoAbstand: os2.readInt16BE(72),
    winOber: os2.readUInt16BE(74), winUnter: os2.readUInt16BE(76),
    xHoehe: os2.readUInt16BE(0) >= 2 && os2.length >= 90 ? os2.readInt16BE(86) : null,
    versalHoehe: os2.readUInt16BE(0) >= 2 && os2.length >= 90 ? os2.readInt16BE(88) : null,
  } : null;

  return {
    format,
    einheiten,
    oberlaenge: hhea.readInt16BE(4),
    unterlaenge: hhea.readInt16BE(6),
    zeilenabstand: hhea.readInt16BE(8),
    mittelbreite: +(summe / gezaehlt / einheiten).toFixed(4),
    fehlendeZeichen: [...fehlend],
    os2: os,
  };
}

const prozent = (w) => `${(w * 100).toFixed(2)}%`;

/* Overrides nach dem Verfahren von Capsize und fontaine: Höhen in Anteilen der Geviertgröße,
   geteilt durch size-adjust, weil size-adjust auch die Overrides mitskaliert. */
export function ersatzBerechnen(schrift, ersatz) {
  const groesse = schrift.mittelbreite / ersatz.mittelbreite;
  return {
    sizeAdjust: groesse,
    ascent: schrift.oberlaenge / schrift.einheiten / groesse,
    descent: Math.abs(schrift.unterlaenge) / schrift.einheiten / groesse,
    lineGap: schrift.zeilenabstand / schrift.einheiten / groesse,
  };
}

/* font-weight steht im Ersatz, weil eine Fläche ohne Gewicht als 400 gilt: eine fette
   Überschrift würde den Ersatz Arial Bold dann zusätzlich künstlich verfetten. */
export function ersatzCss(name, ersatz, werte, gewicht = 400) {
  const lokal = ersatz.lokal.map((l) => `local('${l}')`).join(', ');
  return `/* Ersatzschrift für '${name}': ${ersatz.name}, auf deren Laufweite und Höhen skaliert.
   Erzeugt mit scripts/schrift-metriken.mjs. Nur mit neu gemessenen Werten ändern. */
@font-face {
  font-family: '${name} Ersatz';
  src: ${lokal};
  font-weight: ${gewicht};
  size-adjust: ${prozent(werte.sizeAdjust)};
  ascent-override: ${prozent(werte.ascent)};
  descent-override: ${prozent(werte.descent)};
  line-gap-override: ${prozent(werte.lineGap)};
}
/* Im Token: '${name}', '${name} Ersatz', ${ersatz.generisch} */`;
}

function main(argv) {
  const args = argv.slice(2);
  const wert = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };
  const benutzt = new Set(['--name', '--ersatz'].flatMap((n) => {
    const i = args.indexOf(n); return i === -1 ? [] : [i, i + 1];
  }));
  const datei = args.find((a, i) => !a.startsWith('--') && !benutzt.has(i));
  if (!datei) {
    console.error('Aufruf: node scripts/schrift-metriken.mjs <schrift.woff2> [--name "Familie"] [--ersatz arial|arial-fett|times|times-fett|pfad] [--json]');
    return 2;
  }
  let schrift, ersatz;
  try {
    schrift = schriftLesen(readFileSync(datei));
    const e = wert('--ersatz') || 'arial';
    if (ERSATZ[e]) ersatz = ERSATZ[e];
    else {
      const m = schriftLesen(readFileSync(e));
      ersatz = { name: basename(e), lokal: [basename(e).replace(/\.[^.]+$/, '')], generisch: 'sans-serif', ...m };
    }
  } catch (err) {
    console.error(`Nicht lesbar: ${err.message}`);
    return 2;
  }
  const name = wert('--name') || basename(datei).replace(/[-_](latin|ext|\d{3}|normal|italic|regular).*$/i, '')
    .replace(/[-_]/g, ' ').replace(/\b\w/g, (b) => b.toUpperCase());
  const werte = ersatzBerechnen(schrift, ersatz);
  if (args.includes('--json')) {
    console.log(JSON.stringify({ datei, name, schrift, ersatz: ersatz.name, werte }, null, 2));
    return 0;
  }
  console.log(`${basename(datei)} (${schrift.format}), ${schrift.einheiten} Einheiten je Geviert`);
  console.log(`  Oberlänge ${schrift.oberlaenge}, Unterlänge ${schrift.unterlaenge}, Zeilenabstand ${schrift.zeilenabstand} (hhea)`);
  if (schrift.os2?.xHoehe) {
    console.log(`  x-Höhe ${(schrift.os2.xHoehe / schrift.einheiten).toFixed(3)} em, Versalhöhe ${(schrift.os2.versalHoehe / schrift.einheiten).toFixed(3)} em, Gewicht ${schrift.os2.gewicht}`);
  }
  console.log(`  mittlere Breite am Mustertext ${schrift.mittelbreite} em, ${ersatz.name} ${ersatz.mittelbreite} em`);
  if (schrift.os2?.typoMetrikenNutzen) {
    console.log('  HINWEIS: USE_TYPO_METRICS ist gesetzt. Browser rechnen dann mit den OS/2-Typo-Werten,');
    console.log(`           nicht mit hhea: Ober ${schrift.os2.typoOber}, Unter ${schrift.os2.typoUnter}, Abstand ${schrift.os2.typoAbstand}. Im Browser gegenprüfen.`);
  }
  if (schrift.fehlendeZeichen.length) {
    console.log(`  WARNUNG: im Schnitt fehlen ${schrift.fehlendeZeichen.join(' ')}. Falsche Teilmenge? Für Deutsch braucht es mindestens latin.`);
  }
  console.log('');
  console.log(ersatzCss(name, ersatz, werte, schrift.os2?.gewicht || 400));
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main(process.argv));
