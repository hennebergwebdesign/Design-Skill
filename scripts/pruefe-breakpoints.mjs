#!/usr/bin/env node
/*
  pruefe-breakpoints.mjs — rendert eine Seite in acht Größen und meldet, was bricht.

  WARUM ES DIESES SKRIPT GIBT
  SKILL.md fordert "prüfen statt behaupten" und die Pre-Launch-Liste hat eine
  Checkbox für Breakpoints. Eine Checkbox wird abgehakt, ein Skript nicht.

  Horizontaler Überlauf ist der Fehler, den man auf dem eigenen Monitor NIE sieht
  und der auf dem Handy die halbe Seite zerstört. Genau den findet dieses Skript.

  GRÖSSEN
    320 x 720    kleinstes reales Gerät, entspricht WCAG 1.4.10 Reflow bei 400% Zoom
    375 x 812    Smartphone
    768 x 1024   Tablet Hochformat
    1024 x 768   Tablet Querformat
    1366 x 768   häufigste Notebookauflösung, hier fallen zu steile clamp-Kurven auf
    1440 x 720   Breitbild-Notebook mit NIEDRIGER Fensterhöhe, hier wird 100svh zum Problem
    1440 x 900   Laptop L
    1920 x 1080  Desktop FullHD

  GEPRÜFT WIRD
    1. horizontaler Überlauf der Seite (scrollWidth > innerWidth)
    2. einzelne Elemente breiter als der Viewport, mit Selektor
    3. Touchziele unter 44 x 44 px (nur unter 861 px Breite)
    4. Textknoten unter 14 px berechneter Schriftgröße
    5. Bilder ohne width/height (CLS-Risiko)

  AUFRUF
    node scripts/pruefe-breakpoints.mjs http://localhost:4321
    node scripts/pruefe-breakpoints.mjs http://localhost:4321/kontakt --bilder
    node scripts/pruefe-breakpoints.mjs http://localhost:4321 --aus ./pruefung

  VORAUSSETZUNG
    Playwright mit Chromium. Auf einem System ohne Playwright:
      npm i -D playwright   (Browser wird mitgeliefert oder ist vorinstalliert)

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { playwrightLaden, chromiumStarten, BrowserFehler, PLAYWRIGHT_FEHLT } from './lib/browser.mjs';

const GROESSEN = [
  { b: 320,  h: 720,  name: '320-reflow',    mobil: true  },
  { b: 375,  h: 812,  name: '375-handy',     mobil: true  },
  { b: 768,  h: 1024, name: '768-tablet',    mobil: true  },
  { b: 1024, h: 768,  name: '1024-tablet-q', mobil: false },
  { b: 1366, h: 768,  name: '1366-notebook', mobil: false },
  { b: 1440, h: 720,  name: '1440-flach',    mobil: false },
  { b: 1440, h: 900,  name: '1440-laptop',   mobil: false },
  { b: 1920, h: 1080, name: '1920-desktop',  mobil: false },
];

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
const machtBilder = args.includes('--bilder');
const ai = args.indexOf('--aus');
const ausgabe = ai !== -1 ? args[ai + 1] : 'pruefung/breakpoints';

if (!url) {
  console.error('Aufruf: node scripts/pruefe-breakpoints.mjs <url> [--bilder] [--aus ordner]');
  console.error('Beispiel: node scripts/pruefe-breakpoints.mjs http://localhost:4321');
  process.exit(2);
}

const pw = await playwrightLaden();
if (!pw) {
  console.error(PLAYWRIGHT_FEHLT);
  process.exit(2);
}
const { chromium } = pw;

if (machtBilder) mkdirSync(ausgabe, { recursive: true });

/*
  Läuft IM Browser. Muss deshalb ohne Abhängigkeiten auskommen und darf
  nichts aus dem Modulscope benutzen.
*/
function messen(mobil) {
  const sichtbar = (el) => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const pfad = (el) => {
    if (el.id) return `#${el.id}`;
    const teile = [];
    let k = el;
    while (k && k.nodeType === 1 && teile.length < 4) {
      let t = k.tagName.toLowerCase();
      if (k.classList.length) t += '.' + [...k.classList].slice(0, 2).join('.');
      teile.unshift(t);
      k = k.parentElement;
    }
    return teile.join(' > ');
  };

  const vw = window.innerWidth;
  const seitenbreite = Math.max(
    document.documentElement.scrollWidth,
    document.body ? document.body.scrollWidth : 0,
  );

  const zuBreit = [];
  const zuBreitKnoten = [];
  const kleineZiele = [];
  const kleinerText = [];
  const bilderOhneMasse = [];

  for (const el of document.querySelectorAll('*')) {
    if (!sichtbar(el)) continue;
    const r = el.getBoundingClientRect();

    /*
      Überlauf: 1px Toleranz gegen Rundungsfehler bei Subpixel-Layouts.

      Nur den ÄUSSERSTEN Verursacher melden. Eine zu breite Tabelle macht auch
      tbody und tr zu breit; das sind keine drei Befunde, sondern einer. Der
      Fix sitzt immer außen.
    */
    if (r.width > vw + 1 && zuBreit.length < 12) {
      if (!zuBreitKnoten.some((v) => v.contains(el))) {
        zuBreitKnoten.push(el);
        zuBreit.push({ sel: pfad(el), breite: Math.round(r.width) });
      }
    }

    /* Touchziele nur unter dem Mobil-Breakpoint: auf dem Desktop zeigt eine Maus. */
    if (mobil && /^(a|button|input|select|textarea|summary|label)$/i.test(el.tagName)) {
      const typ = (el.getAttribute('type') || '').toLowerCase();
      const istVersteckt = typ === 'hidden';
      /* Inline-Links im Fließtext sind keine Touchziele im Sinne von 2.5.8:
         sie stehen in einem Textblock und die Ausnahme greift. */
      const imText = el.tagName.toLowerCase() === 'a' &&
        el.parentElement &&
        /^(p|li|dd|td|figcaption|span)$/i.test(el.parentElement.tagName);
      if (!istVersteckt && !imText && (r.width < 44 || r.height < 44) && kleineZiele.length < 12) {
        kleineZiele.push({ sel: pfad(el), b: Math.round(r.width), h: Math.round(r.height) });
      }
    }

    /* Bilder ohne width/height erzeugen CLS. */
    if (el.tagName === 'IMG' && bilderOhneMasse.length < 12) {
      const hatMasse = (el.getAttribute('width') && el.getAttribute('height')) ||
        getComputedStyle(el).aspectRatio !== 'auto';
      if (!hatMasse) bilderOhneMasse.push({ sel: pfad(el), src: (el.currentSrc || el.src || '').slice(-60) });
    }
  }

  /* Zu kleine Schrift: nur Elemente mit echtem Textinhalt. */
  for (const el of document.querySelectorAll('p, li, span, td, th, dd, dt, small, label, figcaption, a, button')) {
    if (!sichtbar(el)) continue;
    const txt = (el.textContent || '').trim();
    if (txt.length < 3) continue;
    const px = parseFloat(getComputedStyle(el).fontSize);
    if (px && px < 14 && kleinerText.length < 12) {
      kleinerText.push({ sel: pfad(el), px: Math.round(px * 10) / 10 });
    }
  }

  return { vw, seitenbreite, zuBreit, kleineZiele, kleinerText, bilderOhneMasse };
}

let browser;
try {
  browser = await chromiumStarten(chromium);
} catch (e) {
  if (!(e instanceof BrowserFehler)) throw e;
  console.error(e.message);
  process.exit(2);
}
let fehler = 0;
let warnungen = 0;

console.log(`Prüfe ${url}\n`);

for (const g of GROESSEN) {
  const seite = await browser.newPage({ viewport: { width: g.b, height: g.h } });
  let ergebnis;
  try {
    await seite.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    /* Kurz warten, damit Einblendanimationen und Schriftwechsel durch sind. */
    await seite.waitForTimeout(400);
    ergebnis = await seite.evaluate(messen, g.mobil);
    if (machtBilder) {
      await seite.screenshot({ path: join(ausgabe, `${g.name}.png`), fullPage: true });
    }
  } catch (e) {
    console.log(`${g.b} x ${g.h}  FEHLER beim Laden: ${e.message.split('\n')[0]}`);
    fehler++;
    await seite.close();
    continue;
  }
  await seite.close();

  const kopf = `${String(g.b).padStart(4)} x ${String(g.h).padStart(4)}`;
  const zeilen = [];

  /* 1 Horizontaler Überlauf der Seite — immer ein Fehler. */
  if (ergebnis.seitenbreite > ergebnis.vw + 1) {
    zeilen.push(`  FEHLER  horizontaler Überlauf: Seite ist ${ergebnis.seitenbreite} px breit bei ${ergebnis.vw} px Viewport`);
    fehler++;
  }

  /* 2 Einzelne Elemente zu breit — die Ursache des Überlaufs. */
  for (const z of ergebnis.zuBreit) {
    zeilen.push(`  FEHLER  ${z.breite} px breit: ${z.sel}`);
    zeilen.push(`          → min-width: 0 am Grid-/Flex-Kind, oder max-width: 100%`);
    fehler++;
  }

  /* 3 Touchziele. */
  for (const z of ergebnis.kleineZiele) {
    zeilen.push(`  FEHLER  Touchziel ${z.b} x ${z.h} px (min. 44 x 44): ${z.sel}`);
    fehler++;
  }

  /* 4 Zu kleine Schrift. */
  for (const t of ergebnis.kleinerText) {
    zeilen.push(`  WARNUNG Schrift ${t.px} px (kleinste erlaubte Stufe ist 14 px): ${t.sel}`);
    warnungen++;
  }

  /* 5 Bilder ohne Maße — nur auf der ersten Größe melden, sonst achtfach. */
  if (g === GROESSEN[0]) {
    for (const b of ergebnis.bilderOhneMasse) {
      zeilen.push(`  WARNUNG Bild ohne width/height (CLS): ${b.sel}  …${b.src}`);
      warnungen++;
    }
  }

  console.log(zeilen.length ? `${kopf}\n${zeilen.join('\n')}` : `${kopf}  ok`);
}

await browser.close();

console.log(`\n${fehler} Fehler, ${warnungen} Warnungen.`);
if (machtBilder) console.log(`Screenshots in ${ausgabe}/`);
if (!fehler && !warnungen) console.log('Alle acht Größen sauber.');
process.exit(fehler ? 1 : 0);
