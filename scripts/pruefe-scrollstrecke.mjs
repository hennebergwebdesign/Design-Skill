#!/usr/bin/env node
/*
  pruefe-scrollstrecke.mjs — läuft eine Seite von oben nach unten durch und meldet, was beim Scrollen schiefgeht.

  WARUM ES DIESES SKRIPT GIBT
  Eine Scrollseite hat keinen einzelnen Zustand. Jede Position ist ein anderes Bild, und die Fehler
  leben zwischen den zwei Positionen, die man zufällig angesehen hat: eine gepinnte Strecke, in der
  nichts passiert, ein Text, der nie voll sichtbar wird, ein Inhalt, der bei reduzierter Bewegung
  unsichtbar bleibt. Ein Mensch sieht das nach dem dritten Durchlauf nicht mehr, ein Skript sieht es
  jedes Mal. Das Verfahren stammt aus der Prüfreihenfolge von scroll-craft (50-scroll-erlebnis-
  grammatik-und-gefuehl.md, Abschnitt 12), ist hier ohne Abhängigkeit in Node neu gebaut und nutzt
  die gemeinsame Browserschicht lib/browser.mjs.

  WAS GEPRÜFT WIRD (je Position, Schrittweite einstellbar)
  Fehler:
    1. Horizontales Überlaufen: der Seiteninhalt ist breiter als das Fenster.
    2. Konsolen- oder Seitenfehler beim Laden und Scrollen (auch nicht ladbare Dateien).
    3. Die Hauptüberschrift ragt am Seitenanfang über den Rand.
    4. Nur mit --reduziert: Text, der in keiner Position sichtbar wird. Bei reduzierter Bewegung
       muss jeder Inhalt stehen, nicht nur ohne Animation fehlen.
  Warnungen:
    5. Tote Strecke: mindestens drei aufeinanderfolgende Positionen mit identischem Bild, obwohl
       gescrollt wurde. Entweder ist die Strecke zu lang oder ihr fehlt eine Veränderung. Eine
       gemeinte Stille gehört in den Markenbrief; das Skript kann sie nicht von einem Defekt trennen.
    6. Text, der nie die Deckkraft OPAZITAET_MIN erreicht, obwohl er im Sichtfeld stand: eine
       Einblendung, die in ihrem Fenster nie ankommt, der Leser sieht den Text nur blass.

  WAS NICHT GEPRÜFT WIRD
  Kontrast auf dem zusammengesetzten Bild (pruefe-kontrast.mjs rechnet Farbpaare), Zielgrößen und
  Schrift (pruefe-breakpoints.mjs), die Bedeutung der Seite. Ein Mensch liest den Kontaktbogen.
  Ein grüner Lauf deckt kein echtes Handy ab: Videodecoder, Autoplay und Stromsparmodus eines
  iPhones gibt Headless-Chrome nicht wieder.

  AUFRUF
    node scripts/pruefe-scrollstrecke.mjs http://localhost:4321
    node scripts/pruefe-scrollstrecke.mjs http://localhost:4321/preise --mobil
    node scripts/pruefe-scrollstrecke.mjs http://localhost:4321 --reduziert
    optional: --schritt 0.5 (Anteil der Fensterhöhe) --max 80 (Positionen) --warten 200 (ms je Schritt)
              --breite 1440 --hoehe 900 --ausgabe .scrollstrecke --chrome /pfad/zu/chrome --streng
    --streng zählt Warnungen wie Fehler. Die Umgebungsvariable PRUEFE_CHROME ersetzt --chrome.

  AUSGABE
    <ausgabe>/pos-NN.jpg, kontaktbogen.html, bericht.json. Den Ordner in die .gitignore des Projekts.

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem oder kein Browser
*/

import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { playwrightLaden, chromiumStarten, BrowserFehler, PLAYWRIGHT_FEHLT } from './lib/browser.mjs';

/** Unter dieser Deckkraft gilt ein Text, der im Sichtfeld stand, als nie angekommen. Halbtransparenter Nebentext (0,6 und mehr) bleibt erlaubt. */
export const OPAZITAET_MIN = 0.6;
/** Ein Text unter dieser Deckkraft zählt als unsichtbar. */
export const UNSICHTBAR = 0.05;
/** So viele gleiche Bilder in Folge sind eine tote Strecke. */
export const TOTE_LAENGE = 3;

/**
 * Läufe aufeinanderfolgender Positionen mit demselben Bild. Positionen am Seitenende, an denen
 * nicht mehr weitergescrollt wurde, tauchen hier nicht auf (der Aufrufer lässt sie weg).
 * @param {{ index:number, y:number, hash:string }[]} positionen
 */
export function toteStreckenFinden(positionen, mindestLaenge = TOTE_LAENGE) {
  const laeufe = [];
  let start = 0;
  for (let i = 1; i <= positionen.length; i++) {
    const gleich = i < positionen.length && positionen[i].hash === positionen[start].hash;
    if (gleich) continue;
    if (i - start >= mindestLaenge) {
      laeufe.push({
        von: positionen[start].y,
        bis: positionen[i - 1].y,
        positionen: i - start,
        erste: positionen[start].index,
        letzte: positionen[i - 1].index,
      });
    }
    start = i;
  }
  return laeufe;
}

/**
 * Wertet die größte Deckkraft je Text aus.
 * @param {Map<string,{ text:string, max:number }>} texte
 * @param {{ reduziert?:boolean }} optionen
 */
export function deckkraftAuswerten(texte, { reduziert = false } = {}) {
  const fehler = [];
  const warnungen = [];
  const blass = [];
  const unsichtbar = [];
  for (const { text, max } of texte.values()) {
    if (max < UNSICHTBAR) unsichtbar.push(text);
    else if (max < OPAZITAET_MIN) blass.push({ text, max });
  }
  if (unsichtbar.length) {
    const meldung = {
      regel: reduziert ? 'inhalt-unsichtbar-reduziert' : 'text-nie-sichtbar',
      meldung: `${unsichtbar.length} Text(e) im Sichtfeld, aber in keiner Position sichtbar: ${unsichtbar.slice(0, 4).map((t) => `„${t}"`).join(', ')}`,
      tipp: reduziert
        ? 'Bei reduzierter Bewegung muss jeder Inhalt stehen. Den Anfangszustand der Einblendung per prefers-reduced-motion auf sichtbar setzen (18-motion-handschrift.md).'
        : 'Die Einblendung endet nie, oder der Text liegt hinter etwas. Das Fenster der Einblendung verlängern oder das Element prüfen.',
    };
    (reduziert ? fehler : warnungen).push(meldung);
  }
  if (blass.length) {
    warnungen.push({
      regel: 'text-bleibt-blass',
      meldung: `${blass.length} Text(e) erreichen nie volle Deckkraft (höchstens ${Math.round(Math.max(...blass.map((b) => b.max)) * 100)} Prozent): ${blass.slice(0, 4).map((b) => `„${b.text}"`).join(', ')}`,
      tipp: 'Das Fenster der Einblendung ist zu schmal oder die Anstiege fressen es auf. Fenster verbreitern oder das Plateau verlängern.',
    });
  }
  return { fehler, warnungen };
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Kontaktbogen als eine HTML-Datei, tote Strecken rot umrandet. */
export function kontaktbogenHtml(positionen, tote, titel = 'Kontaktbogen') {
  const markiert = new Set(tote.flatMap((t) => Array.from({ length: t.letzte - t.erste + 1 }, (_, i) => t.erste + i)));
  const kacheln = positionen
    .map((p) => `<figure class="${markiert.has(p.index) ? 'tot' : ''}"><img src="${esc(p.datei)}" alt="Position ${p.index}, ${p.y} Pixel"><figcaption>${p.index} · ${p.y} px</figcaption></figure>`)
    .join('\n');
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(titel)}</title>
<style>body{font:14px system-ui;margin:16px;background:#111;color:#eee}
.raster{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px}
figure{margin:0;border:3px solid transparent}figure.tot{border-color:#e5484d}
img{width:100%;display:block}figcaption{font-size:12px;padding:4px 0}</style></head>
<body><h1>${esc(titel)}</h1><p>Rote Rahmen: tote Strecke, mehrere Positionen ohne Veränderung.</p>
<div class="raster">${kacheln}</div></body></html>`;
}

/* ------------------------------------------------------------------ Lauf im Browser */

/** Läuft im Seitenkontext. Liefert die sichtbaren Texte mit ihrer wirksamen Deckkraft und ein paar Seitenwerte. */
function seitenMessung() {
  const hoehe = window.innerHeight;
  const breite = window.innerWidth;
  const wirksam = (el) => {
    let o = 1;
    for (let k = el; k && k.nodeType === 1; k = k.parentElement) {
      const s = getComputedStyle(k);
      if (s.display === 'none' || s.visibility === 'hidden') return 0;
      o *= parseFloat(s.opacity);
    }
    return o;
  };
  window.__szIds = window.__szIds || new WeakMap();
  window.__szNext = window.__szNext || 1;
  const texte = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  for (let el = walker.nextNode(); el; el = walker.nextNode()) {
    if (/^(SCRIPT|STYLE|NOSCRIPT|SVG|PATH|TEMPLATE)$/i.test(el.tagName)) continue;
    const eigener = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!eigener) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const sichtbarHoehe = Math.min(r.bottom, hoehe) - Math.max(r.top, 0);
    if (sichtbarHoehe < Math.min(r.height, hoehe) * 0.5) continue;
    if (!window.__szIds.has(el)) window.__szIds.set(el, window.__szNext++);
    texte.push({
      id: window.__szIds.get(el),
      text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 40),
      opazitaet: wirksam(el),
    });
  }
  const h1 = document.querySelector('h1');
  const h1r = h1?.getBoundingClientRect();
  return {
    y: Math.round(window.scrollY),
    ueberlauf: document.documentElement.scrollWidth > breite + 1,
    h1Abgeschnitten: !!h1r && h1r.width > 0 && (h1r.left < -1 || h1r.right > breite + 1),
    texte,
  };
}

export function argumenteLesen(argv) {
  const a = { url: null, schritt: 0.5, max: 80, warten: 200, breite: 1440, hoehe: 900, mobil: false, reduziert: false, streng: false, ausgabe: '.scrollstrecke', chrome: process.env.PRUEFE_CHROME || null };
  const wert = (name, i) => {
    if (argv[i + 1] === undefined) throw new Error(`${name} braucht einen Wert`);
    return argv[i + 1];
  };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--mobil') a.mobil = true;
    else if (t === '--reduziert') a.reduziert = true;
    else if (t === '--streng') a.streng = true;
    else if (t === '--schritt') a.schritt = Number(wert(t, i++));
    else if (t === '--max') a.max = Number(wert(t, i++));
    else if (t === '--warten') a.warten = Number(wert(t, i++));
    else if (t === '--breite') a.breite = Number(wert(t, i++));
    else if (t === '--hoehe') a.hoehe = Number(wert(t, i++));
    else if (t === '--ausgabe') a.ausgabe = wert(t, i++);
    else if (t === '--chrome') a.chrome = wert(t, i++);
    else if (t.startsWith('--')) throw new Error(`Unbekannte Option ${t}`);
    else if (!a.url) a.url = t;
    else throw new Error(`Zweite Adresse nicht erlaubt: ${t}`);
  }
  if (!a.url) throw new Error('Adresse fehlt');
  if (!/^https?:\/\//i.test(a.url)) throw new Error('Die Adresse muss mit http:// oder https:// beginnen (file:// lädt Abrufe der Seite nicht)');
  for (const [name, v] of [['--schritt', a.schritt], ['--max', a.max], ['--warten', a.warten], ['--breite', a.breite], ['--hoehe', a.hoehe]]) {
    if (!Number.isFinite(v) || v <= 0) throw new Error(`${name} muss eine positive Zahl sein`);
  }
  if (a.mobil) { a.breite = 390; a.hoehe = 844; }
  return a;
}

export async function durchlaufen(a, chromium) {
  const browser = await chromiumStarten(chromium, a.chrome ? { executablePath: a.chrome } : {});
  const fehlermeldungen = [];
  try {
    const kontext = await browser.newContext({
      viewport: { width: a.breite, height: a.hoehe },
      deviceScaleFactor: 1,
      reducedMotion: a.reduziert ? 'reduce' : 'no-preference',
      hasTouch: a.mobil,
      isMobile: a.mobil,
    });
    const seite = await kontext.newPage();
    seite.on('console', (m) => { if (m.type() === 'error') fehlermeldungen.push(m.text()); });
    seite.on('pageerror', (e) => fehlermeldungen.push(String(e.message ?? e)));
    await seite.goto(a.url, { waitUntil: 'load' });
    await seite.evaluate(() => document.fonts?.ready);
    await seite.waitForTimeout(500);
    await seite.mouse.move(a.breite / 2, a.hoehe / 2);

    mkdirSync(a.ausgabe, { recursive: true });
    const positionen = [];
    const texte = new Map();
    let ueberlaufBei = null;
    let h1Abgeschnitten = false;
    const schrittPx = Math.max(1, Math.round(a.hoehe * a.schritt));

    for (let i = 0; i < a.max; i++) {
      const bild = await seite.screenshot({ type: 'jpeg', quality: 60 });
      const messung = await seite.evaluate(seitenMessung);
      if (i === 0) h1Abgeschnitten = messung.h1Abgeschnitten;
      if (messung.ueberlauf && ueberlaufBei === null) ueberlaufBei = messung.y;
      for (const t of messung.texte) {
        const vorher = texte.get(t.id);
        if (!vorher || t.opazitaet > vorher.max) texte.set(t.id, { text: t.text, max: t.opazitaet });
      }
      const letzteY = positionen.length ? positionen[positionen.length - 1].y : -1;
      if (messung.y === letzteY) break; // Seitenende erreicht, nicht weiter gewandert
      const datei = `pos-${String(i).padStart(2, '0')}.jpg`;
      writeFileSync(join(a.ausgabe, datei), bild);
      positionen.push({ index: i, y: messung.y, hash: createHash('sha1').update(bild).digest('hex'), datei });

      await seite.mouse.wheel(0, schrittPx);
      await seite.waitForTimeout(a.warten);
      const nachRad = await seite.evaluate(() => Math.round(window.scrollY));
      if (nachRad === messung.y) {
        await seite.evaluate((px) => window.scrollBy(0, px), schrittPx);
        await seite.waitForTimeout(a.warten);
      }
    }
    return { positionen, texte, ueberlaufBei, h1Abgeschnitten, fehlermeldungen };
  } finally {
    await browser.close();
  }
}

export function auswerten(lauf, { reduziert = false } = {}) {
  const fehler = [];
  const warnungen = [];
  if (lauf.ueberlaufBei !== null) {
    fehler.push({ regel: 'horizontaler-ueberlauf', meldung: `Der Inhalt ist breiter als das Fenster (zuerst bei ${lauf.ueberlaufBei} px Scrollhöhe)`, tipp: 'Das überstehende Element suchen: oft ein Bild, eine Zeile ohne Umbruch oder ein 100vw mit Scrollleiste. overflow-x: clip auf dem Container verdeckt nur den Befund (15-spacing-rhythmus.md).' });
  }
  if (lauf.h1Abgeschnitten) {
    fehler.push({ regel: 'ueberschrift-abgeschnitten', meldung: 'Die Hauptüberschrift ragt am Seitenanfang über den Rand', tipp: 'Fluide Schriftgröße prüfen und lange Wörter umbrechen lassen (overflow-wrap). Mobil bei 375 px nachprüfen.' });
  }
  const eindeutig = [...new Set(lauf.fehlermeldungen)];
  if (eindeutig.length) {
    fehler.push({ regel: 'konsolenfehler', meldung: `${eindeutig.length} Fehler in der Konsole: ${eindeutig.slice(0, 3).map((m) => m.slice(0, 120)).join(' | ')}`, tipp: 'Nicht ladbare Dateien und Skriptfehler zuerst beheben, sie verfälschen jeden weiteren Befund dieses Laufs.' });
  }
  const tote = toteStreckenFinden(lauf.positionen);
  for (const t of tote) {
    warnungen.push({ regel: 'tote-strecke', meldung: `${t.positionen} Positionen ohne Veränderung zwischen ${t.von} und ${t.bis} px (Bilder ${t.erste} bis ${t.letzte})`, tipp: 'Strecke kürzen oder eine Veränderung einbauen. Ist die Stille gemeint, steht sie im Markenbrief (50-scroll-erlebnis-grammatik-und-gefuehl.md, Abschnitt 8).' });
  }
  const deckkraft = deckkraftAuswerten(lauf.texte, { reduziert });
  fehler.push(...deckkraft.fehler);
  warnungen.push(...deckkraft.warnungen);
  return { fehler, warnungen, tote };
}

async function main() {
  let a;
  try {
    a = argumenteLesen(process.argv.slice(2));
  } catch (e) {
    console.error(`${e.message}\nAufruf: node scripts/pruefe-scrollstrecke.mjs <http://…> [--mobil] [--reduziert] [--schritt 0.5] [--max 80] [--warten 200] [--ausgabe ordner] [--streng]`);
    process.exit(2);
  }
  const pw = await playwrightLaden();
  if (!pw) {
    console.error(PLAYWRIGHT_FEHLT);
    process.exit(2);
  }
  let lauf;
  try {
    lauf = await durchlaufen(a, pw.chromium);
  } catch (e) {
    console.error(e instanceof BrowserFehler ? e.message : `Lauf fehlgeschlagen: ${e.message}`);
    process.exit(2);
  }
  const befund = auswerten(lauf, { reduziert: a.reduziert });
  const ausgabe = resolve(a.ausgabe);
  writeFileSync(join(a.ausgabe, 'kontaktbogen.html'), kontaktbogenHtml(lauf.positionen, befund.tote, `Kontaktbogen ${a.url}`));
  writeFileSync(join(a.ausgabe, 'bericht.json'), JSON.stringify({ url: a.url, mobil: a.mobil, reduziert: a.reduziert, positionen: lauf.positionen.length, fehler: befund.fehler, warnungen: befund.warnungen }, null, 2));

  console.log(`pruefe-scrollstrecke: ${a.url}  (${a.breite}x${a.hoehe}${a.mobil ? ' mobil' : ''}${a.reduziert ? ', reduzierte Bewegung' : ''}, ${lauf.positionen.length} Positionen)`);
  for (const b of befund.fehler) console.log(`\n  ✗ Fehler ${b.regel}: ${b.meldung}\n    → ${b.tipp}`);
  for (const b of befund.warnungen) console.log(`\n  ! Warnung ${b.regel}: ${b.meldung}\n    → ${b.tipp}`);
  if (!befund.fehler.length && !befund.warnungen.length) console.log('\n  ✓ keine tote Strecke, kein Überlauf, alle Texte werden sichtbar');
  console.log(`\nKontaktbogen: ${join(ausgabe, 'kontaktbogen.html')}  (ansehen, das Skript beweist nur, dass die Seite läuft)`);
  console.log('Nicht abgedeckt: echtes Handy (Videodecoder, Autoplay, Stromsparmodus), Bedeutung der Seite.');
  const zaehlen = befund.fehler.length + (a.streng ? befund.warnungen.length : 0);
  process.exit(zaehlen ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
