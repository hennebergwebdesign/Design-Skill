#!/usr/bin/env node
/*
  brand-extraktion.mjs — misst Farben, Schriften, Typoskala, Buttons und Logo der eigenen Bestandsseite eines Kunden und schlägt Tokens vor.

  WARUM ES DIESES SKRIPT GIBT
  `20-markenextraktion-bestandsseite.md` verlangt, Marke und CI einer bestehenden Seite
  auszulesen, bevor neu entworfen wird. Aus Quelltext und Screenshot geht das nur ungefähr:
  Hex-Werte nach Augenmaß, Schriften ohne Herkunft, keine Hoverfarbe, keine Typoskala für
  Mobil. Dieses Skript öffnet die Seite in einem echten Browser, misst die berechneten Styles
  auf 1440 und auf 375 Pixel und legt einen Bericht, einen Tokenvorschlag und die
  Markenassets ab. Es rät nicht: was es nicht sicher ableiten kann, bleibt im Tokenvorschlag
  als Kommentar stehen und der Wert aus der Vorlage gilt weiter.

  Übernommen aus dem Skill `brand-extraktion` von That's it. Marketing (brand-extract.mjs
  Version 1.0, Prüfsumme ce4dcdc8…a6af). Die Messung im Browser ist unverändert, angepasst
  wurden der Tokenvorschlag (Namen und Untergrenzen aus `assets/vorlagen/tokens.css`), der
  Start von Playwright (`lib/browser.mjs`) und die Firecrawl-Zweitmeinung (`lib/abruf.mjs`).

  ABGRENZUNG ZU DEN ANDEREN ERFASSUNGSWERKZEUGEN
    relaunch-inventory.mjs   eigene alte Seite   Inhalte: URLs, Texte, Rechtstexte, Weiterleitungen
    brand-extraktion.mjs     eigene alte Seite   Marke: gemessene Farben, Schriften, Formen, Logo
    design-scan.mjs          fremde Seite        Struktur: Sektionsfolge, Wortzahl, Bildbelegung

  RECHTLICHE GRENZE, siehe `20-markenextraktion-bestandsseite.md`, Abschnitt „Rechtlich“:
  nur die eigene Seite des Kunden oder, für einen Pitch, die eigene Seite eines Leads. Nie
  eine Wettbewerber- oder Inspirationsseite: von dort werden Logo, Schriftdateien und
  Farbwerte nicht übernommen, und genau das legt dieses Skript ab. Für fremde Seiten gilt
  `design-scan.mjs` beziehungsweise die Designrecherche mit Freigabe. Weil es die Seite des
  Auftraggebers ist, wird wie bei relaunch-inventory.mjs keine robots.txt geprüft.

  ABGELEGT WIRD IN .brand-extraktion/ (gehört in die .gitignore des Kundenprojekts)
    BRAND.md               Bericht: Warnungen zuerst, dann Farbrollen mit Herleitung,
                           Kontraste, Schriften mit Lizenzhinweis, Typografie, Buttons, Logo
    tokens-vorschlag.css   Tokens mit den Namen aus assets/vorlagen/tokens.css
    brand.json             alle Rohdaten
    screenshots/           je Pfad __held.png, __desktop.png, __mobil.png
    assets/                logo.* plus bis zu zwei Kandidaten, Favicons, OG-Bild
    fonts/                 die tatsächlich geladenen Schriftdateien

  AUFRUF, im Projektroot des Kundenrepos
    node scripts/brand-extraktion.mjs https://kunde.de / /leistungen /kontakt
    node scripts/brand-extraktion.mjs https://kunde.de --aus .brand-extraktion
    node scripts/brand-extraktion.mjs https://kunde.de --firecrawl

  Höchstens vier Pfade: Startseite, eine Inhaltsseite, die Kontaktseite für Formularstile.
  `--firecrawl` holt zusätzlich das Firecrawl-Format `branding` über lib/abruf.mjs, selbst
  gehostet vor Cloud. Nur nutzen, wenn der Bericht Bot-Schutz oder blockiertes CSS meldet.

  VORAUSSETZUNG
    Playwright mit Chromium, global oder im Projekt, siehe lib/browser.mjs:
      npm i -g playwright && npx playwright install chromium

  EXIT
    0 = erfasst · 1 = keine Seite ladbar · 2 = Aufrufproblem oder kein Browser
*/

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { playwrightLaden, chromiumStarten, BrowserFehler, PLAYWRIGHT_FEHLT } from './lib/browser.mjs';
import { adresseNormalisieren, firecrawlBranding, AbrufFehler } from './lib/abruf.mjs';

export const VERSION = '1.1';
export const HOECHSTENS_PFADE = 4;

/* ---------- Hilfen, rein und getestet ---------- */
export const sauber = (s) => String(s).replace(/^https?:\/\//, '').replace(/[^a-z0-9._-]+/gi, '_').replace(/^_+|_+$/g, '').slice(-80) || 'start';
const ENDUNGEN = {
  'svg+xml': 'svg', png: 'png', jpeg: 'jpg', jpg: 'jpg', webp: 'webp', gif: 'gif', avif: 'avif',
  'x-icon': 'ico', 'vnd.microsoft.icon': 'ico', woff2: 'woff2', woff: 'woff', ttf: 'ttf', otf: 'otf',
  'font-woff2': 'woff2', 'font-woff': 'woff', 'x-font-ttf': 'ttf', 'x-font-otf': 'otf', 'font-sfnt': 'ttf', sfnt: 'ttf',
};
export function endung(typ, url) {
  const t = (typ || '').split(';')[0].split('/')[1];
  if (t && ENDUNGEN[t]) return ENDUNGEN[t];
  const m = String(url).split(/[?#]/)[0].match(/\.([a-z0-9]{2,5})$/i);
  return m ? m[1].toLowerCase() : 'bin';
}
const hexZuRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const abstand = (a, b) => { const [x, y] = [hexZuRgb(a), hexZuRgb(b)]; return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
function hsl(h) {
  const [r, g, b] = hexZuRgb(h).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  const s = d === 0 ? 0 : l > 0.5 ? d / (2 - max - min) : d / (max + min);
  return { s, l };
}
export const chromatisch = (h) => { const { s, l } = hsl(h); return s > 0.25 && l > 0.12 && l < 0.86; };
export function abdunkeln(h, faktor = 0.82) {
  return '#' + hexZuRgb(h).map((v) => Math.round(v * faktor).toString(16).padStart(2, '0')).join('');
}
function addiere(ziel, quelle) { for (const [k, v] of Object.entries(quelle || {})) ziel[k] = (ziel[k] || 0) + v; return ziel; }
export function cluster(map, schwelle = 16) {
  const gesamt = Object.values(map).reduce((a, b) => a + b, 0) || 1;
  const gruppen = [];
  for (const [hex, w] of Object.entries(map).sort((a, b) => b[1] - a[1])) {
    const g = gruppen.find((x) => abstand(x.hex, hex) < schwelle);
    if (g) g.gewicht += w; else gruppen.push({ hex, gewicht: w });
  }
  return gruppen.map((g) => ({ hex: g.hex, anteil: Math.round((g.gewicht / gesamt) * 1000) / 10 }));
}
const rang = (map, n = 6) => Object.entries(map || {}).sort((a, b) => b[1] - a[1]).slice(0, n);
const px = (v) => parseFloat(v) || 0;
const rem = (v) => `${+(v / 16).toFixed(3)}rem`;

/* Kontrast nach WCAG 2.2, relative Leuchtdichte mit dem Grenzwert 0,04045 wie pruefe-kontrast.mjs */
const lum = (h) => { const [r, g, b] = hexZuRgb(h).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const kontrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100; };

/*
  Eine Markenfarbe unter 4,5:1 auf der Fläche bleibt nach 20-markenextraktion-bestandsseite.md
  eine Flächenfarbe und wird nicht als Textfarbe weitergeführt. Für Text braucht die Vorlage
  deshalb --farbe-marke-text: dieselbe Farbe, schrittweise abgedunkelt, bis sie 4,5:1 erreicht.
*/
export function markeFuerText(marke, flaeche) {
  if (!marke || !flaeche) return null;
  if (kontrast(marke, flaeche) >= 4.5) return { hex: marke, quelle: `Markenfarbe selbst, ${kontrast(marke, flaeche)}:1 auf der Fläche` };
  let h = marke;
  for (let i = 0; i < 40 && kontrast(h, flaeche) < 4.5; i++) h = abdunkeln(h, 0.95);
  if (kontrast(h, flaeche) < 4.5) return null;
  return { hex: h, quelle: `Markenfarbe abgedunkelt, weil sie nur ${kontrast(marke, flaeche)}:1 erreicht; jetzt ${kontrast(h, flaeche)}:1` };
}

/** Typoskala als clamp zwischen den Messungen auf 375 und 1440 Pixel. */
export function fluid(m, d) {
  if (!d && !m) return null;
  if (!m || !d || Math.abs(d - m) < 0.5) return rem(d || m);
  const steigung = (d - m) / (1440 - 375);
  const basis = m - steigung * 375;
  return `clamp(${rem(Math.min(m, d))}, ${rem(basis)} + ${(steigung * 100).toFixed(2)}vw, ${rem(Math.max(m, d))})`;
}

/* 14 px ist die kleinste erlaubte Stufe der Vorlage; pruefe-breakpoints.mjs meldet alles darunter. */
export const KLEINSTE_SCHRIFT = 14;

/* ---------- Analyse im Browser, unverändert aus brand-extract.mjs 1.0 ---------- */
/* Läuft IM Browser. Muss ohne Abhängigkeiten auskommen und darf nichts aus dem Modulscope benutzen. */
const analyseImBrowser = () => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const zuHex = (wert) => {
    if (!wert || wert === 'transparent' || wert === 'none' || wert.startsWith('url(')) return null;
    if (cache.has(wert)) return cache.get(wert);
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = wert; cx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data;
    const erg = a < 128 ? null : '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
    cache.set(wert, erg); return erg;
  };
  const add = (map, k, w) => { if (k) map[k] = (map[k] || 0) + w; };
  const px = (v) => parseFloat(v) || 0;
  const erste = (fam) => (fam || '').split(',')[0].trim().replace(/^["']|["']$/g, '');
  const klasse = (el) => (typeof el.className === 'string' ? el.className : el.className?.baseVal || '');

  const skipMuster = /cookie|consent|cmplz|usercentrics|borlabs|cookiebot|gdpr|onetrust|klaro|real-cookie|iubenda|termly|cky-/i;
  let wurzeln = [...document.querySelectorAll('body *')].filter((el) => skipMuster.test((el.id || '') + ' ' + klasse(el)));
  wurzeln = wurzeln.filter((el) => !wurzeln.some((o) => o !== el && o.contains(el)));
  const uebersprungen = (el) => wurzeln.some((w) => w.contains(el));
  const sichtbar = (el, s = getComputedStyle(el)) => {
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect(); return r.width >= 1 && r.height >= 1;
  };
  const direkterText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).reduce((a, n) => a + n.textContent.trim().length, 0);

  const seiteBreite = document.documentElement.clientWidth;
  const farben = { flaeche: {}, text: {}, rahmen: {}, interaktivBg: {}, interaktivText: {}, verlauf: {}, logo: {} };
  const schriftNutzung = {}, groessen = {}, radien = {}, schatten = {}, maxBreiten = {}, sektionsAbstaende = {}, uebergaenge = {};

  const seitenBg = zuHex(getComputedStyle(document.body).backgroundColor) || zuHex(getComputedStyle(document.documentElement).backgroundColor) || '#ffffff';
  add(farben.flaeche, seitenBg, (seiteBreite * Math.min(document.documentElement.scrollHeight, 20000)) / 1000);

  const alle = [...document.querySelectorAll('body *')].slice(0, 8000);
  for (const el of alle) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK', 'BR', 'TEMPLATE', 'IFRAME'].includes(el.tagName)) continue;
    if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
    if (uebersprungen(el)) continue;
    const s = getComputedStyle(el);
    if (!sichtbar(el, s)) continue;
    const r = el.getBoundingClientRect();
    const flaeche = (Math.min(r.width, seiteBreite) * Math.min(r.height, 5000)) / 1000;
    add(farben.flaeche, zuHex(s.backgroundColor), flaeche);
    if (s.backgroundImage.includes('gradient')) for (const f of s.backgroundImage.match(/rgba?\([^)]+\)|#[0-9a-f]{3,8}/gi) || []) add(farben.verlauf, zuHex(f), flaeche);
    const t = direkterText(el);
    if (t) {
      add(farben.text, zuHex(s.color), t);
      add(schriftNutzung, erste(s.fontFamily), t);
      add(groessen, Math.round(px(s.fontSize)), t);
    }
    if (px(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') add(farben.rahmen, zuHex(s.borderTopColor), (r.width + r.height) / 100);
    else if (px(s.borderBottomWidth) > 0 && s.borderBottomStyle !== 'none') add(farben.rahmen, zuHex(s.borderBottomColor), r.width / 100);
    const interaktiv = el.matches('a, button, [role=button], input[type=submit]');
    if (interaktiv) {
      add(farben.interaktivBg, zuHex(s.backgroundColor), 10);
      if (el.textContent.trim()) add(farben.interaktivText, zuHex(s.color), 3);
      if (s.transitionDuration !== '0s') add(uebergaenge, `${s.transitionDuration.split(',')[0]} ${s.transitionTimingFunction.split(',')[0]}`, 1);
    }
    if (s.borderRadius !== '0px' && r.width > 8) add(radien, s.borderRadius, 1);
    if (s.boxShadow !== 'none') add(schatten, s.boxShadow, 1);
    if (s.maxWidth !== 'none' && r.width > 500) add(maxBreiten, s.maxWidth, 1);
  }

  for (const el of document.querySelectorAll('section, main > *, [class*="section"]')) {
    const r = el.getBoundingClientRect();
    if (r.height < 200 || r.width < seiteBreite * 0.8 || uebersprungen(el)) continue;
    const s = getComputedStyle(el);
    if (px(s.paddingTop) >= 16) add(sektionsAbstaende, s.paddingTop, 1);
  }

  /* Typografie je Elementtyp */
  const typoZiele = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6', text: 'p', link: 'p a, li a',
    navigation: 'nav a, header a', label: 'label', klein: 'small, figcaption',
  };
  const typo = {};
  for (const [name, sel] of Object.entries(typoZiele)) {
    const sigs = {};
    for (const el of document.querySelectorAll(sel)) {
      if (uebersprungen(el)) continue;
      const s = getComputedStyle(el);
      const text = el.textContent.trim();
      if (!text || !sichtbar(el, s)) continue;
      const lh = s.lineHeight === 'normal' ? 'normal' : +(px(s.lineHeight) / px(s.fontSize)).toFixed(2);
      const sig = [erste(s.fontFamily), Math.round(px(s.fontSize) * 10) / 10, s.fontWeight, lh, s.letterSpacing, s.textTransform, s.fontStyle, zuHex(s.color)].join('|');
      if (!sigs[sig]) sigs[sig] = { anzahl: 0, beispiel: text.slice(0, 50) };
      sigs[sig].anzahl++;
    }
    typo[name] = Object.entries(sigs).sort((a, b) => b[1].anzahl - a[1].anzahl).slice(0, 3).map(([sig, v]) => {
      const [familie, groesse, gewicht, zeilenhoehe, laufweite, transform, stil, farbe] = sig.split('|');
      return { familie, groesse: +groesse, gewicht, zeilenhoehe, laufweite, transform, stil, farbe, ...v };
    });
  }

  /* Buttons */
  const knoepfe = {};
  for (const el of document.querySelectorAll('a, button, input[type=submit], [role=button]')) {
    if (uebersprungen(el)) continue;
    const s = getComputedStyle(el);
    if (!sichtbar(el, s)) continue;
    const text = (el.value || el.textContent || '').trim().replace(/\s+/g, ' ');
    if (text.length < 2 || text.length > 40) continue;
    const r = el.getBoundingClientRect();
    const bg = zuHex(s.backgroundColor);
    const rahmen = px(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none';
    if (!(bg || rahmen) || px(s.paddingLeft) + px(s.paddingRight) < 16 || r.height < 28 || r.height > 90 || r.width > 520) continue;
    const sig = [bg, zuHex(s.color), s.borderRadius, rahmen ? `${s.borderTopWidth} ${zuHex(s.borderTopColor)}` : ''].join('|');
    if (!knoepfe[sig]) {
      const id = String(Object.keys(knoepfe).length);
      el.setAttribute('data-brandx-knopf', id);
      knoepfe[sig] = {
        id, anzahl: 0, imHeld: false, text,
        stil: {
          hintergrund: bg, text: zuHex(s.color), radius: s.borderRadius, innenabstand: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
          hoehe: Math.round(r.height), schrift: erste(s.fontFamily), groesse: s.fontSize, gewicht: s.fontWeight,
          transform: s.textTransform, laufweite: s.letterSpacing, rahmen: rahmen ? `${s.borderTopWidth} ${s.borderTopStyle} ${zuHex(s.borderTopColor)}` : 'keiner',
          schatten: s.boxShadow, uebergang: `${s.transitionDuration} ${s.transitionTimingFunction}`,
        },
      };
    }
    knoepfe[sig].anzahl++;
    if (r.top + scrollY < innerHeight) knoepfe[sig].imHeld = true;
  }
  const buttons = Object.values(knoepfe).sort((a, b) => b.anzahl - a.anzahl).slice(0, 5);

  /* Eingabefelder */
  const eingabeSigs = {};
  for (const el of document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=checkbox]):not([type=radio]):not([type=button]), textarea, select')) {
    if (uebersprungen(el)) continue;
    const s = getComputedStyle(el);
    if (!sichtbar(el, s)) continue;
    const stil = {
      hintergrund: zuHex(s.backgroundColor) || 'transparent', text: zuHex(s.color),
      rahmen: `${s.borderTopWidth} ${s.borderTopStyle} ${zuHex(s.borderTopColor)}`, rahmenUnten: `${s.borderBottomWidth} ${s.borderBottomStyle} ${zuHex(s.borderBottomColor)}`,
      radius: s.borderRadius, innenabstand: `${s.paddingTop} ${s.paddingRight}`, hoehe: Math.round(el.getBoundingClientRect().height), groesse: s.fontSize,
    };
    const sig = JSON.stringify(stil);
    eingabeSigs[sig] = eingabeSigs[sig] || { anzahl: 0, stil };
    eingabeSigs[sig].anzahl++;
  }
  const eingaben = Object.values(eingabeSigs).sort((a, b) => b.anzahl - a.anzahl).slice(0, 3);

  /* CSS Variablen auf html oder body */
  const variablen = {}, variablenFarben = {};
  const bodyStil = getComputedStyle(document.body);
  const lauf = (liste) => {
    for (const regel of liste) {
      if (regel.cssRules && !regel.selectorText) { lauf(regel.cssRules); continue; }
      if (!regel.selectorText || !regel.style) continue;
      let trifft = false;
      try { trifft = document.documentElement.matches(regel.selectorText) || document.body.matches(regel.selectorText); } catch {}
      if (!trifft) continue;
      for (const name of regel.style) {
        if (!name.startsWith('--') || Object.keys(variablen).length >= 400) continue;
        const wert = bodyStil.getPropertyValue(name).trim() || regel.style.getPropertyValue(name).trim();
        variablen[name] = wert.slice(0, 200);
        if (/^(#|rgb|hsl|oklch|oklab|lab\(|lch\(|color\()/i.test(wert)) { const h = zuHex(wert); if (h) variablenFarben[name] = h; }
      }
    }
  };
  for (const blatt of document.styleSheets) { try { lauf(blatt.cssRules); } catch {} }

  /* Logo */
  const serialisiereSvg = (svg) => {
    const klon = svg.cloneNode(true);
    const orig = [svg, ...svg.querySelectorAll('*')];
    const kopie = [klon, ...klon.querySelectorAll('*')];
    orig.forEach((o, i) => {
      if (!(o instanceof SVGElement)) return;
      const s = getComputedStyle(o);
      const teile = [];
      if (s.fill && s.fill !== 'none' && !s.fill.startsWith('url')) teile.push(`fill:${s.fill}`);
      else if (s.fill === 'none') teile.push('fill:none');
      if (s.stroke && s.stroke !== 'none' && !s.stroke.startsWith('url')) teile.push(`stroke:${s.stroke}`);
      if (s.opacity !== '1') teile.push(`opacity:${s.opacity}`);
      if (teile.length && i > 0) kopie[i].setAttribute('style', teile.join(';') + ';' + (kopie[i].getAttribute('style') || ''));
    });
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    for (const use of klon.querySelectorAll('use')) {
      const ref = (use.getAttribute('href') || use.getAttribute('xlink:href') || '').trim();
      if (ref.startsWith('#')) { const ziel = document.querySelector(ref); if (ziel) defs.appendChild(ziel.cloneNode(true)); }
    }
    if (defs.childNodes.length) klon.insertBefore(defs, klon.firstChild);
    klon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const r = svg.getBoundingClientRect();
    if (!klon.getAttribute('viewBox')) klon.setAttribute('viewBox', `0 0 ${Math.round(r.width)} ${Math.round(r.height)}`);
    klon.setAttribute('width', Math.round(r.width)); klon.setAttribute('height', Math.round(r.height));
    klon.removeAttribute('class');
    return klon.outerHTML.slice(0, 400000);
  };
  const svgFarben = (svg) => {
    const m = {};
    for (const el of svg.querySelectorAll('path, circle, rect, polygon, ellipse, line, polyline, text, tspan, g')) {
      const s = getComputedStyle(el);
      add(m, zuHex(s.fill), 1); if (s.stroke !== 'none') add(m, zuHex(s.stroke), 1);
    }
    return m;
  };
  const kandidaten = [];
  const pruefe = (el, art, url) => {
    if (uebersprungen(el)) return;
    const s = getComputedStyle(el);
    if (!sichtbar(el, s)) return;
    const r = el.getBoundingClientRect();
    if (r.width < 16 || r.height < 10) return;
    const oben = r.top + scrollY;
    const a = el.closest('a');
    const text = [el.id, klasse(el), el.getAttribute('alt'), el.getAttribute('aria-label'), el.getAttribute('title'), url,
      a && klasse(a), a && a.getAttribute('aria-label'), el.parentElement && klasse(el.parentElement)].join(' ').toLowerCase();
    let punkte = 0;
    if (/logo|brand|marke|wordmark|signet/.test(text)) punkte += 5;
    if (a) { try { const z = new URL(a.href, location.href); if (z.origin === location.origin && /^\/((index\.(html?|php))|[a-z]{2}\/?)?$/.test(z.pathname)) punkte += 3; } catch {} }
    if (el.closest('header, [class*="header"], [role=banner], nav')) punkte += 2;
    if (oben < 200) punkte += 2;
    if (r.left < seiteBreite / 2) punkte += 1;
    if (art === 'svg') punkte += 1;
    if (r.width > 600 || r.height > 250) punkte -= 4;
    if (/icon|burger|menu|search|suche|close|arrow|pfeil|social|facebook|instagram|linkedin|whatsapp|youtube|tiktok|xing/.test(text)) punkte -= 4;
    if (punkte < 3) return;
    kandidaten.push({
      art, url: url || null, punkte, breite: Math.round(r.width), hoehe: Math.round(r.height), oben: Math.round(oben),
      svg: art === 'svg' ? serialisiereSvg(el) : null, farben: art === 'svg' ? svgFarben(el) : {},
    });
  };
  for (const img of document.querySelectorAll('img')) pruefe(img, 'img', img.currentSrc || img.src);
  for (const svg of document.querySelectorAll('svg')) if (!svg.parentElement?.closest('svg')) pruefe(svg, 'svg', null);
  for (const el of document.querySelectorAll('header *, [class*="logo"], [id*="logo"]')) {
    const bi = getComputedStyle(el).backgroundImage;
    const m = bi && bi.match(/url\(["']?([^"')]+)["']?\)/);
    if (m) pruefe(el, 'hintergrund', new URL(m[1], location.href).href);
  }
  kandidaten.sort((a, b) => b.punkte - a.punkte || a.oben - b.oben);
  const logoKandidaten = kandidaten.slice(0, 5);
  if (logoKandidaten[0]) for (const [k, v] of Object.entries(logoKandidaten[0].farben)) add(farben.logo, k, v);

  const meta = (sel) => document.querySelector(sel)?.getAttribute('content') || null;
  return {
    titel: document.title, sprache: document.documentElement.lang || null,
    themeColor: meta('meta[name="theme-color"]'), ogImage: meta('meta[property="og:image"]') ? new URL(meta('meta[property="og:image"]'), location.href).href : null,
    manifest: document.querySelector('link[rel="manifest"]')?.href || null,
    icons: [...document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"]')].map((l) => ({ rel: l.rel, href: l.href, sizes: l.getAttribute('sizes') })),
    farben, schriftNutzung, groessen, typo, buttons, eingaben, radien, schatten, maxBreiten, sektionsAbstaende, uebergaenge,
    variablen, variablenFarben, logoKandidaten,
    schriftenGeladen: [...new Map([...document.fonts].filter((f) => f.status === 'loaded').map((f) => {
      const o = { familie: f.family.replace(/["']/g, ''), gewicht: f.weight, stil: f.style }; return [JSON.stringify(o), o];
    })).values()],
    fontFaceInline: [...document.querySelectorAll('style')].map((s) => (s.textContent.match(/@font-face\s*{[^}]*}/g) || []).join('\n')).join('\n').slice(0, 200000),
    hatConsentReste: wurzeln.length,
  };
};

const hoverImBrowser = (el) => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const zuHex = (w) => {
    if (!w || w === 'transparent') return null;
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = w; cx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data;
    return a < 128 ? null : '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };
  const s = getComputedStyle(el);
  return { hintergrund: zuHex(s.backgroundColor), text: zuHex(s.color), rahmen: zuHex(s.borderTopColor), schatten: s.boxShadow, transform: s.transform };
};

/* ---------- Schriftquellen ---------- */
export function parseFontFaces(css, basis) {
  const liste = [];
  for (const block of css.match(/@font-face\s*{[^}]*}/g) || []) {
    const hole = (n) => (block.match(new RegExp(`${n}\\s*:\\s*([^;}]+)`, 'i')) || [])[1]?.trim();
    const familie = (hole('font-family') || '').replace(/\\(.)/g, '$1').replace(/["']/g, '').trim();
    const urls = [...block.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)].map((m) => { try { return new URL(m[2], basis).href; } catch { return m[2]; } });
    if (familie) liste.push({ familie, gewicht: hole('font-weight') || '400', stil: hole('font-style') || 'normal', display: hole('font-display') || null, urls });
  }
  return liste;
}
export function anbieter(url, eigeneHerkunft) {
  const h = (() => { try { return new URL(url).host; } catch { return ''; } })();
  if (/fonts\.(googleapis|gstatic)\.com/.test(h)) return 'Google Fonts';
  if (/typekit\.net|use\.typekit|adobe/.test(h)) return 'Adobe Fonts';
  if (/fonts\.bunny\.net/.test(h)) return 'Bunny Fonts';
  if (/fonts\.net|fonts\.com|monotype/.test(h)) return 'Monotype';
  if (/typography\.com/.test(h)) return 'Hoefler&Co';
  if (/fontawesome|kit\.fontawesome/.test(h) || /fontawesome|fa-(solid|brands|regular)/i.test(url)) return 'Icon Font';
  if (h === eigeneHerkunft || h.endsWith('.' + eigeneHerkunft.replace(/^www\./, ''))) return 'selbst gehostet';
  return h || 'unbekannt';
}
/* Lizenzhinweise nach der Lizenzpflicht in 10-visuelle-richtung.md. Ein Hinweis, keine Freigabe. */
export const LIZENZ = {
  'Google Fonts': 'Open Font License, selbst hosten erlaubt',
  'Bunny Fonts': 'meist Open Font License, Familie prüfen',
  'Adobe Fonts': 'an ein Adobe Abo gebunden, selbst hosten NICHT erlaubt, Lizenz über den Kunden klären oder Alternative wählen',
  Monotype: 'kommerziell, Webfont Lizenz beim Kunden anfragen',
  'Hoefler&Co': 'kommerziell, Webfont Lizenz beim Kunden anfragen',
  'selbst gehostet': 'Herkunft unklar, prüfen ob Google Font (frei) oder gekaufte Lizenz des Kunden',
  'Icon Font': 'Icon Font, nicht als Textschrift übernehmen',
};

/* ---------- Farbrollen ---------- */
/**
 * Ordnet die gemessenen Farben Rollen zu. Heuristik, kein Befund: jede Rolle trägt ihre
 * Herleitung mit, und BRAND.md verlangt den Abgleich mit dem Screenshot.
 * F: geclusterte Farben je Herkunft (logo, flaeche, text, rahmen, interaktivBg, interaktivText, verlauf)
 */
export function rollenAbleiten({ F, variablenFarben = {}, buttons = [] }) {
  const punkte = {};
  const gib = (liste = [], faktor) => { for (const c of liste) if (chromatisch(c.hex)) { const g = Object.keys(punkte).find((h) => abstand(h, c.hex) < 24) || c.hex; punkte[g] = (punkte[g] || 0) + c.anteil * faktor; } };
  gib(F.logo, 3); gib(F.flaeche, 2); gib(F.interaktivBg, 1.5); gib(F.interaktivText, 1); gib(F.verlauf, 0.8); gib(F.text, 0.5);
  const markenListe = Object.entries(punkte).sort((a, b) => b[1] - a[1]).map(([hex, p]) => ({ hex, punkte: Math.round(p) }));
  const flaeche = F.flaeche?.[0]?.hex || '#ffffff';
  const textKandidat = (F.text || []).find((c) => abstand(c.hex, flaeche) > 120);
  const text = textKandidat?.hex || F.text?.[0]?.hex || '#111111';
  const varPrimaer = Object.entries(variablenFarben).find(([n, h]) => /(global-color-primary|preset--color--primary|color-primary|primary-color|--primary$|--brand(-color)?$|--marke$|--main-color$)/i.test(n) && chromatisch(h));
  const marke = varPrimaer?.[1] || markenListe[0]?.hex || null;
  const markeQuelle = varPrimaer ? `CSS Variable ${varPrimaer[0]} der Seite` : 'Buntfarbe mit dem meisten Gewicht aus Logo, Flächen, Buttons und Links';
  const ctaKnopf = buttons.filter((b) => b.stil.hintergrund && chromatisch(b.stil.hintergrund)).sort((a, b) => (b.imHeld - a.imHeld) || (b.anzahl - a.anzahl))[0] || null;
  const ctaFarbe = ctaKnopf?.stil.hintergrund || null;
  const ctaHover = ctaKnopf?.hover?.hintergrund && ctaKnopf.hover.hintergrund !== ctaFarbe ? ctaKnopf.hover.hintergrund : null;
  const akzentAusCta = ctaFarbe && marke && abstand(ctaFarbe, marke) > 70 ? ctaFarbe : null;
  const akzent = akzentAusCta || markenListe.find((m) => marke && abstand(m.hex, marke) > 70 && m.punkte >= Math.max(3, markenListe[0].punkte * 0.05))?.hex || null;
  const primaerKnopf = buttons.find((b) => b.stil.hintergrund && marke && abstand(b.stil.hintergrund, marke) < 30);
  const markeDunkel = primaerKnopf?.hover?.hintergrund && primaerKnopf.hover.hintergrund !== primaerKnopf.stil.hintergrund
    ? { hex: primaerKnopf.hover.hintergrund, quelle: 'Hoverfarbe des Buttons in Markenfarbe' }
    : marke ? { hex: abdunkeln(marke), quelle: 'berechnet, 18 Prozent dunkler' } : null;
  const rollen = {
    marke: marke && { hex: marke, quelle: markeQuelle },
    markeText: markeFuerText(marke, flaeche),
    markeDunkel,
    akzent: akzent ? { hex: akzent, quelle: akzentAusCta ? `Hintergrund des Hauptbuttons${ctaHover ? `, Hover ${ctaHover}` : ''}` : 'zweite deutlich andere Buntfarbe' } : null,
    akzentAuf: ctaKnopf?.stil.text ? { hex: ctaKnopf.stil.text, quelle: 'Textfarbe des Hauptbuttons' } : null,
    akzentHover: ctaHover ? { hex: ctaHover, quelle: 'gemessene Hoverfarbe des Hauptbuttons' } : null,
    flaeche: { hex: flaeche, quelle: 'größte Hintergrundfläche' },
    flaecheAlt: (() => { const c = (F.flaeche || []).find((c) => abstand(c.hex, flaeche) > 12 && (!chromatisch(c.hex) || hsl(c.hex).l > 0.8) && c.anteil >= 1); return c ? { hex: c.hex, quelle: `zweite Hintergrundfläche, ${c.anteil} Prozent` } : null; })(),
    text: { hex: text, quelle: textKandidat ? 'häufigste gut lesbare Textfarbe auf der Hauptfläche' : 'häufigste Textfarbe' },
    textLeise: (() => { const c = (F.text || []).find((c) => abstand(c.hex, text) > 30 && abstand(c.hex, flaeche) > 90 && !chromatisch(c.hex) && c.anteil >= 0.5); return c ? { hex: c.hex, quelle: `zweite neutrale Textfarbe, ${c.anteil} Prozent` } : null; })(),
    rahmen: F.rahmen?.[0] ? { hex: F.rahmen[0].hex, quelle: 'häufigste Rahmenfarbe' } : null,
  };
  return { rollen, markenListe, ctaKnopf };
}

/* ---------- Tokenvorschlag ---------- */
const SKALA = [['text-sm', 'klein'], ['text-base', 'text'], ['text-h4', 'h4'], ['text-h3', 'h3'], ['text-h2', 'h2'], ['text-h1', 'h1']];

/** Misst die Skala und hebt alles unter KLEINSTE_SCHRIFT auf die Untergrenze der Vorlage an. */
export function skalaAbleiten(typoDesktop = {}, typoMobil = {}) {
  const groesse = (t, k) => t[k]?.[0]?.groesse || null;
  const skala = {};
  for (const [token, k] of SKALA) {
    const desktop = groesse(typoDesktop, k), mobil = groesse(typoMobil, k);
    const angehoben = [desktop, mobil].some((g) => g && g < KLEINSTE_SCHRIFT);
    const boden = (g) => (g ? Math.max(g, KLEINSTE_SCHRIFT) : g);
    skala[token] = { desktop, mobil, angehoben, wert: fluid(boden(mobil), boden(desktop)) };
  }
  return skala;
}

/**
 * Schreibt den Tokenvorschlag mit den Namen aus assets/vorlagen/tokens.css. Was nicht sicher
 * abgeleitet ist, wird kein leerer Wert, sondern ein Kommentar: der Wert der Vorlage gilt weiter.
 */
export function tokensErzeugen({ herkunft, datum, rollen, familieText, familieDisplay, typoDesktop = {}, typoMobil = {}, layout = {} }) {
  const BEHALTEN = 'nicht abgeleitet, Wert aus der Vorlage behalten';
  const farbe = (name, rolle, fehlt = BEHALTEN) => (rolle?.hex
    ? `  ${name}: ${rolle.hex};${' '.repeat(Math.max(1, 24 - name.length - rolle.hex.length))}/* ${rolle.quelle} */`
    : `  /* ${name}: ${fehlt} */`);
  const wert = (name, w, notiz = '') => (w ? `  ${name}: ${w};${notiz ? ` /* ${notiz} */` : ''}` : `  /* ${name}: ${notiz || BEHALTEN} */`);
  const zeile = (t, k) => (t[k]?.[0]?.zeilenhoehe && t[k][0].zeilenhoehe !== 'normal' ? t[k][0].zeilenhoehe : null);
  const skala = skalaAbleiten(typoDesktop, typoMobil);
  const { breite, abstaendeRang = [], radius = {}, pille = false, schattenWeich, schattenHoch, hauptUebergang = [] } = layout;

  const css = `/* Tokenvorschlag aus ${herkunft}, erzeugt mit brand-extraktion.mjs ${VERSION} am ${datum}
   VORSCHLAG, nicht ungeprüft übernehmen. Jede Farbe gegen screenshots/*__held.png prüfen.
   Namen wie in assets/vorlagen/tokens.css: nur die gemessenen Zeilen dort ersetzen,
   alles andere aus der Vorlage bleibt stehen. Auswertung: references/brand-extraktion.md */
:root {
  /* Farben */
${[
    farbe('--farbe-marke-500', rollen.marke, 'nicht gefunden, Vorlage behalten und beim Kunden nachfragen'),
    farbe('--farbe-marke-750', rollen.markeText, 'keine Markenstufe mit 4,5:1 auf der Fläche gefunden'),
    rollen.marke ? '  /* Stufen 50 bis 700 aus --farbe-marke-500 neu bilden, wie im Kommentar der Vorlage beschrieben.\n     Die Rollen --farbe-marke, --farbe-marke-hell und --farbe-marke-text folgen dann von selbst. */' : null,
    farbe('--farbe-akzent', rollen.akzent, 'keine zweite Buntfarbe, bleibt var(--farbe-marke-500) wie in der Vorlage'),
    farbe('--farbe-akzent-auf', rollen.akzentAuf),
    farbe('--farbe-akzent-hover', rollen.akzentHover),
    farbe('--farbe-flaeche', rollen.flaeche),
    farbe('--farbe-flaeche-alt', rollen.flaecheAlt),
    farbe('--farbe-text', rollen.text),
    farbe('--farbe-text-leise', rollen.textLeise),
    farbe('--farbe-rahmen', rollen.rahmen),
    '  /* --farbe-erfolg, --farbe-fehler, --farbe-warnung: aus der Seite nicht ableitbar, Vorlage behalten */',
  ].filter(Boolean).join('\n')}

  /* Typografie */
${[
    familieText ? `  --schrift-text: '${familieText}', system-ui, sans-serif;` : `  /* --schrift-text: ${BEHALTEN} */`,
    familieDisplay ? `  --schrift-display: '${familieDisplay}', var(--schrift-text);` : `  /* --schrift-display: ${BEHALTEN} */`,
    wert('--zeilenhoehe-eng', zeile(typoDesktop, 'h1'), 'gemessen an der h1'),
    wert('--zeilenhoehe-normal', zeile(typoDesktop, 'text'), 'gemessen am Fließtext'),
  ].join('\n')}

  /* Typoskala aus Mobil 375 und Desktop 1440 gemessen */
${Object.entries(skala).map(([k, s]) => (s.wert
    ? `  --${k}: ${s.wert}; /* ${s.mobil ?? '?'}px mobil, ${s.desktop ?? '?'}px desktop${s.angehoben ? `, auf ${KLEINSTE_SCHRIFT}px angehoben, kleinste erlaubte Stufe` : ''} */`
    : `  /* --${k}: nicht gefunden, Wert aus der Vorlage behalten */`)).join('\n')}

  /* Layout */
${wert('--breite-inhalt', breite, breite ? 'häufigste Containerbreite' : 'keine Containerbreite gefunden, Vorlage behalten')}
  /* Sektionsabstände auf der Seite: ${abstaendeRang.map(([w, n]) => `${w} (${n}x)`).join(', ') || 'keine erkannt'}. Nicht als Token übernommen, der Rhythmus folgt 15-spacing-rhythmus.md */

  /* Form${pille ? ', Buttons oder Badges nutzen zusätzlich die Pillenform, in der Vorlage --radius-pille' : ''} */
${[
    wert('--radius-s', radius.s),
    wert('--radius-m', radius.m),
    wert('--radius-l', radius.l),
    wert('--schatten-weich', schattenWeich),
    wert('--schatten-hoch', schattenHoch),
  ].join('\n')}

  /* Bewegung */
${hauptUebergang[0]
    ? `  --dauer-schnell: ${hauptUebergang[0]}; /* häufigster Übergang an Links und Buttons, also ein Hover */\n  /* Kurve dort: ${hauptUebergang.slice(1).join(' ') || 'keine Angabe'}. Die Kurven der Vorlage bleiben, siehe 18-motion-handschrift.md */`
    : '  /* keine Übergänge erkannt, Dauer und Kurven aus der Vorlage behalten */'}
}
`;
  return { css, skala };
}

/* ---------- Aufruf ---------- */
export function argumenteLesen(argv) {
  const erg = { ausgabe: '.brand-extraktion', mitFirecrawl: false, basis: null, pfade: [], version: false, fehler: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--aus' || a === '--out') erg.ausgabe = argv[++i];
    else if (a === '--firecrawl') erg.mitFirecrawl = true;
    else if (a === '--version') erg.version = true;
    else if (a.startsWith('/')) erg.pfade.push(a);
    else if (a.startsWith('--')) erg.fehler = `Unbekannte Option ${a}`;
    else if (!erg.basis) erg.basis = a;
  }
  if (erg.version) return erg;
  if (!erg.basis) erg.fehler = erg.fehler || 'Keine Adresse angegeben';
  if (!erg.ausgabe) erg.fehler = '--aus braucht einen Ordner';
  if (erg.pfade.length > HOECHSTENS_PFADE) erg.fehler = `Höchstens ${HOECHSTENS_PFADE} Pfade, angegeben ${erg.pfade.length}. Startseite, eine Inhaltsseite und die Kontaktseite reichen.`;
  return erg;
}

const AUFRUF = 'Aufruf: node scripts/brand-extraktion.mjs https://kunde.de [/pfad ...] [--aus ordner] [--firecrawl]';
const LEER = 'nicht erfasst';

async function main(argv) {
  const a = argumenteLesen(argv);
  if (a.version) { console.log(VERSION); return 0; }
  if (a.fehler) { console.error(`${a.fehler}\n${AUFRUF}`); return 2; }

  let startUrl;
  try { startUrl = adresseNormalisieren(a.basis); } catch (e) { console.error(`${e.message}\n${AUFRUF}`); return 2; }
  const ausgabe = a.ausgabe;
  const pfade = a.pfade.length ? a.pfade : [startUrl.pathname || '/'];

  const pw = await playwrightLaden();
  if (!pw) { console.error(PLAYWRIGHT_FEHLT); return 2; }

  for (const d of ['', 'screenshots', 'assets', 'fonts']) await mkdir(path.join(ausgabe, d), { recursive: true });

  /* ---------- Browser ---------- */
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  let browser;
  try {
    browser = await chromiumStarten(pw.chromium, proxy ? { proxy: { server: proxy, bypass: 'localhost,127.0.0.1' } } : {});
  } catch (e) {
    if (!(e instanceof BrowserFehler)) throw e;
    console.error(e.message);
    return 2;
  }
  /*
    Ein gewöhnlicher Browser statt der Kennung aus lib/abruf.mjs: gemessen wird, was ein
    Besucher der eigenen Kundenseite sieht, und manche Seiten liefern einer unbekannten
    Kennung anderes Markup oder eine Bot-Abfrage.
  */
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
  const schriftDateien = new Map();
  const stylesheets = new Map();

  const fehlgeschlagen = new Set();
  function beobachte(seite) {
    seite.on('requestfailed', (req) => {
      if (['stylesheet', 'font'].includes(req.resourceType())) fehlgeschlagen.add(`${req.resourceType()} ${req.url().slice(0, 120)}`);
    });
    seite.on('response', async (res) => {
      try {
        const url = res.url();
        const typ = res.headers()['content-type'] || '';
        const art = res.request().resourceType();
        if (art === 'stylesheet' && !stylesheets.has(url) && stylesheets.size < 40) {
          stylesheets.set(url, ''); stylesheets.set(url, (await res.text().catch(() => '')).slice(0, 3_000_000));
        } else if ((art === 'font' || /\.(woff2?|ttf|otf)(\?|#|$)/i.test(url) || /^font\//.test(typ)) && !schriftDateien.has(url) && schriftDateien.size < 40) {
          schriftDateien.set(url, { url, typ, body: null });
          schriftDateien.get(url).body = await res.body().catch(() => null);
        }
      } catch {}
    });
  }
  async function lade(seite, url) {
    const antwort = await seite.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await seite.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await seite.waitForTimeout(800);
    return antwort;
  }
  /*
    Das Cookie-Banner wird weggeklickt, damit es Screenshot und Farbanalyse nicht verfälscht.
    Das ist eine Messung auf der Seite des Auftraggebers, keine Einwilligung eines Besuchers.
  */
  const CONSENT = /^(alle akzeptieren|alles akzeptieren|alle cookies akzeptieren|alle zulassen|alles zulassen|alle erlauben|akzeptieren|zustimmen|alle annehmen|annehmen|einverstanden|verstanden|ok|accept all|accept all cookies|accept cookies|accept|allow all|agree|i agree|got it)$/i;
  async function consentWeg(seite) {
    for (const frame of seite.frames()) {
      for (const loc of [frame.getByRole('button', { name: CONSENT }), frame.locator('a, [role=button], div[tabindex]').filter({ hasText: CONSENT })]) {
        try {
          const k = loc.first();
          if ((await k.count()) && (await k.isVisible())) { await k.click({ timeout: 2500 }); await seite.waitForTimeout(900); return true; }
        } catch {}
      }
    }
    return false;
  }
  async function scrolle(seite) {
    await seite.evaluate(async () => {
      const schritt = Math.max(400, innerHeight * 0.8);
      for (let y = 0; y < Math.min(document.documentElement.scrollHeight, 30000); y += schritt) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 130)); }
      scrollTo(0, 0);
    }).catch(() => {});
    await seite.waitForTimeout(600);
  }

  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: 'de-DE', deviceScaleFactor: 1 });
  const mobil = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, locale: 'de-DE', deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });

  const seiten = [];
  const warnungen = [];
  for (const pfad of pfade) {
    const url = new URL(pfad, startUrl).href;
    const name = sauber(pfad === '/' ? 'start' : pfad);
    console.log(`Analysiere ${url}`);
    const seite = await desktop.newPage();
    beobachte(seite);
    let status = null;
    try { status = (await lade(seite, url))?.status() ?? null; } catch (e) { warnungen.push(`${url}: Abruf fehlgeschlagen (${String(e).split('\n')[0]})`); await seite.close(); continue; }
    const titel = await seite.title().catch(() => '');
    if (status === 404 || status === 410) { warnungen.push(`${url}: HTTP ${status}, Seite existiert nicht und wurde übersprungen.`); await seite.close(); continue; }
    if ((status && status >= 400) || /just a moment|attention required|access denied|captcha|forbidden|checking your browser/i.test(titel)) {
      warnungen.push(`${url}: HTTP ${status}, Titel "${titel}". Vermutlich Bot Schutz. Mit --firecrawl erneut versuchen.`);
    }
    const consent = await consentWeg(seite);
    await scrolle(seite);
    await seite.screenshot({ path: path.join(ausgabe, 'screenshots', `${name}__held.png`) });
    await seite.screenshot({ path: path.join(ausgabe, 'screenshots', `${name}__desktop.png`), fullPage: true }).catch(() => {});
    const analyse = await seite.evaluate(analyseImBrowser);
    for (const k of analyse.buttons.slice(0, 3)) {
      const loc = seite.locator(`[data-brandx-knopf="${k.id}"]`).first();
      try {
        await loc.scrollIntoViewIfNeeded({ timeout: 2000 });
        await seite.mouse.move(0, 0); await seite.waitForTimeout(150);
        await loc.hover({ timeout: 2000 }); await seite.waitForTimeout(500);
        k.hover = await loc.evaluate(hoverImBrowser);
      } catch { k.hover = null; }
    }
    await seite.close();

    const handy = await mobil.newPage();
    let mobilTypo = null;
    try {
      await lade(handy, url); await consentWeg(handy); await scrolle(handy);
      await handy.screenshot({ path: path.join(ausgabe, 'screenshots', `${name}__mobil.png`), fullPage: true }).catch(() => {});
      mobilTypo = (await handy.evaluate(analyseImBrowser)).typo;
    } catch (e) { warnungen.push(`${url}: Mobilansicht fehlgeschlagen (${String(e).split('\n')[0]})`); }
    await handy.close();

    seiten.push({ pfad, url, status, consentGeklickt: consent, analyse, mobilTypo });
  }

  if (fehlgeschlagen.size) warnungen.push(`${fehlgeschlagen.size} Stylesheets oder Schriften konnten nicht geladen werden, die Werte sind dann unvollständig: ${[...fehlgeschlagen].slice(0, 4).join(', ')}`);
  if (!seiten.length) { console.error('Keine Seite konnte geladen werden.\n' + warnungen.join('\n')); await browser.close(); return 1; }

  /* ---------- Zusammenführen ---------- */
  const erste = seiten[0].analyse;

  /* Assets */
  async function holeAsset(url, ziel) {
    if (!url) return null;
    try {
      if (url.startsWith('data:')) {
        const m = url.match(/^data:([^;,]+)?(;base64)?,(.*)$/s); if (!m) return null;
        const body = m[2] ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3]));
        const datei = `assets/${ziel}.${endung(m[1], '')}`; await writeFile(path.join(ausgabe, datei), body); return datei;
      }
      const res = await desktop.request.get(url, { timeout: 20000 });
      if (!res.ok()) return null;
      const datei = `assets/${ziel}.${endung(res.headers()['content-type'], url)}`;
      await writeFile(path.join(ausgabe, datei), await res.body()); return datei;
    } catch { return null; }
  }
  const logos = [];
  for (const [i, k] of erste.logoKandidaten.slice(0, 3).entries()) {
    const ziel = i === 0 ? 'logo' : `logo-kandidat-${i + 1}`;
    let datei = null;
    if (k.art === 'svg' && k.svg) {
      datei = `assets/${ziel}.svg`; await writeFile(path.join(ausgabe, datei), k.svg, 'utf8');
      if (i === 0 && /<text[\s>]/.test(k.svg)) warnungen.push('Das Logo SVG enthält echten Text statt Pfaden und sieht ohne die Webfont anders aus. Originaldatei beim Kunden anfragen.');
    }
    else datei = await holeAsset(k.url, ziel);
    logos.push({ datei, art: k.art, quelle: k.url, breite: k.breite, hoehe: k.hoehe, punkte: k.punkte, farben: cluster(k.farben).slice(0, 5) });
  }
  const icons = [];
  for (const [i, ic] of erste.icons.slice(0, 4).entries()) icons.push({ ...ic, datei: await holeAsset(ic.href, `favicon-${i + 1}${ic.sizes ? '-' + sauber(ic.sizes) : ''}`) });
  if (!icons.length) icons.push({ rel: 'standard', href: new URL('/favicon.ico', startUrl).href, datei: await holeAsset(new URL('/favicon.ico', startUrl).href, 'favicon') });
  const ogBild = erste.ogImage ? { url: erste.ogImage, datei: await holeAsset(erste.ogImage, 'og-image') } : null;
  let manifest = null;
  if (erste.manifest) { try { const r = await desktop.request.get(erste.manifest); if (r.ok()) { const j = await r.json(); manifest = { theme_color: j.theme_color, background_color: j.background_color, name: j.name }; } } catch {} }

  /* Farben aus heruntergeladenen SVG Logos zählen, oft die eigentlichen Markenfarben */
  {
    const l = logos[0];
    if (l?.datei?.endsWith('.svg') && l.art !== 'svg') {
      const svg = await readFile(path.join(ausgabe, l.datei), 'utf8').catch(() => '');
      const zaehl = {};
      for (const m of svg.matchAll(/(?:fill|stroke|stop-color)\s*[:=]\s*["']?\s*(#[0-9a-f]{6}|#[0-9a-f]{3})\b/gi)) {
        let h = m[1].toLowerCase(); if (h.length === 4) h = '#' + [...h.slice(1)].map((c) => c + c).join('');
        zaehl[h] = (zaehl[h] || 0) + 1;
      }
      l.farben = cluster(zaehl).slice(0, 5);
      for (const s of seiten.slice(0, 1)) Object.assign(s.analyse.farben.logo, zaehl);
    }
  }
  const summe = (feld) => seiten.reduce((acc, s) => addiere(acc, s.analyse[feld]), {});
  const farbSumme = (feld) => seiten.reduce((acc, s) => addiere(acc, s.analyse.farben[feld]), {});
  const F = {};
  for (const k of Object.keys(erste.farben)) F[k] = cluster(farbSumme(k));

  const alleVarFarben = seiten.reduce((acc, x) => Object.assign(acc, x.analyse.variablenFarben), {});
  const { rollen, markenListe, ctaKnopf } = rollenAbleiten({ F, variablenFarben: alleVarFarben, buttons: erste.buttons });

  const typoMerge = (quelle) => {
    const erg = {};
    for (const s of seiten) for (const [k, liste] of Object.entries((quelle(s)) || {})) {
      erg[k] = erg[k] || [];
      for (const e of liste) {
        const x = erg[k].find((y) => y.familie === e.familie && y.groesse === e.groesse && y.gewicht === e.gewicht);
        if (x) x.anzahl += e.anzahl; else erg[k].push({ ...e });
      }
    }
    for (const k of Object.keys(erg)) erg[k].sort((a, b) => b.anzahl - a.anzahl);
    return erg;
  };
  const typoDesktop = typoMerge((s) => s.analyse.typo);
  const typoMobil = typoMerge((s) => s.mobilTypo);
  const schriftRang = rang(summe('schriftNutzung'), 5);
  const familieDisplay = typoDesktop.h1?.[0]?.familie || typoDesktop.h2?.[0]?.familie || schriftRang[0]?.[0] || '';
  const familieText = typoDesktop.text?.[0]?.familie || schriftRang[0]?.[0] || '';
  if (/^times|^serif$/i.test(familieText || '') && rollen.marke?.hex === '#0000ee') warnungen.push('Die Seite wirkt ungestylt (Times und Standardlinkblau). CSS wurde vermutlich blockiert. Ergebnis nicht verwenden, mit --firecrawl oder im normalen Browser prüfen.');

  /* Schriften, Dateien, Anbieter */
  const faces = [];
  for (const [url, css] of stylesheets) faces.push(...parseFontFaces(css, url));
  for (const s of seiten) faces.push(...parseFontFaces(s.analyse.fontFaceInline, s.url));
  const genutzteFamilien = new Set([...schriftRang.map(([f]) => f.toLowerCase()), ...Object.values(typoDesktop).flat().map((t) => t.familie.toLowerCase())]);
  const schriftDateiListe = [];
  for (const [url, d] of schriftDateien) {
    if (!d.body) continue;
    const face = faces.find((f) => f.urls.some((u) => u === url || u.split(/[?#]/)[0] === url.split(/[?#]/)[0]));
    const basis = face ? `${face.familie}-${face.gewicht}-${face.stil}` : path.basename(url.split(/[?#]/)[0]).replace(/\.[a-z0-9]+$/i, '');
    const datei = `fonts/${sauber(basis)}.${endung(d.typ, url)}`;
    await writeFile(path.join(ausgabe, datei), d.body);
    schriftDateiListe.push({ datei, url, familie: face?.familie || null, gewicht: face?.gewicht || null, stil: face?.stil || null, anbieter: anbieter(url, startUrl.host), genutzt: face ? genutzteFamilien.has(face.familie.toLowerCase()) : null });
  }
  const familien = {};
  for (const [fam, gewicht] of schriftRang) {
    const dateien = schriftDateiListe.filter((d) => d.familie && d.familie.toLowerCase() === fam.toLowerCase());
    const quellen = [...new Set([...dateien.map((d) => d.anbieter), ...faces.filter((f) => f.familie.toLowerCase() === fam.toLowerCase()).flatMap((f) => f.urls.map((u) => anbieter(u, startUrl.host)))])];
    const generisch = /^(system-ui|-apple-system|blinkmacsystemfont|segoe ui|arial|helvetica|helvetica neue|sans-serif|serif|georgia|times new roman|roboto)$/i.test(fam) && !quellen.length;
    familien[fam] = { textanteil: gewicht, quellen: quellen.length ? quellen : generisch ? ['Systemschrift'] : ['unbekannt'], dateien: dateien.map((d) => `${d.datei} (${d.gewicht} ${d.stil})`) };
  }

  await browser.close();

  /* Firecrawl als Zweitmeinung, über lib/abruf.mjs: selbst gehostet vor Cloud */
  let firecrawl = null;
  if (a.mitFirecrawl) {
    try {
      const fc = await firecrawlBranding(new URL(pfade[0], startUrl).href);
      firecrawl = fc.branding;
      await writeFile(path.join(ausgabe, 'firecrawl-branding.json'), JSON.stringify(fc.roh, null, 2));
    } catch (e) {
      warnungen.push(`Firecrawl Zweitmeinung nicht verfügbar: ${e instanceof AbrufFehler ? e.message : String(e.message || e)}`);
    }
  }

  /* ---------- Tokenvorschlag ---------- */
  const radienRang = rang(summe('radien'), 12).map(([w, n]) => ({ v: w, n, zahl: w.includes('%') ? 9999 : px(w) }));
  const pille = radienRang.some((r) => r.zahl >= 999);
  const nimm = (f) => radienRang.filter((r) => f(r.zahl)).sort((x, y) => y.n - x.n)[0]?.v || null;
  const radius = { s: nimm((z) => z > 0 && z <= 6), m: nimm((z) => z > 6 && z <= 16), l: nimm((z) => z > 16 && z < 200) };
  const schattenRang = rang(Object.fromEntries(Object.entries(summe('schatten')).filter(([w]) => !/^(rgba?\([^)]*\)\s*)?0px 0px 0px/.test(w))), 4).map(([w, n]) => ({ v: w, n, max: Math.max(...(w.match(/-?\d+(\.\d+)?px/g) || ['0']).map(px)) }));
  const [schattenWeich, schattenHoch] = schattenRang.slice(0, 2).sort((x, y) => x.max - y.max);
  const breiteRang = rang(summe('maxBreiten'), 5);
  const breite = breiteRang.find(([w]) => px(w) >= 900 && px(w) <= 1800)?.[0] || null;
  const abstaendeRang = rang(summe('sektionsAbstaende'), 5);
  const uebergangRang = rang(summe('uebergaenge'), 4);
  const hauptUebergang = uebergangRang[0]?.[0]?.split(' ') || [];

  const { css: tokens, skala } = tokensErzeugen({
    herkunft: startUrl.origin, datum: new Date().toISOString().slice(0, 10), rollen, familieText, familieDisplay, typoDesktop, typoMobil,
    layout: { breite, abstaendeRang, radius, pille, schattenWeich: schattenWeich?.v, schattenHoch: (schattenHoch || schattenWeich)?.v, hauptUebergang },
  });

  /* ---------- Kontraste nach WCAG ---------- */
  const paare = [
    ['Text auf Fläche', rollen.text?.hex, rollen.flaeche?.hex],
    ['Leiser Text auf Fläche', rollen.textLeise?.hex, rollen.flaeche?.hex],
    ['Markenfarbe als Linkfarbe auf Fläche', rollen.marke?.hex, rollen.flaeche?.hex],
    ['Markenstufe für Text auf Fläche', rollen.markeText?.hex, rollen.flaeche?.hex],
    ['Weiß auf Markenfarbe', '#ffffff', rollen.marke?.hex],
    ['Buttontext auf Hauptbutton', ctaKnopf?.stil.text, ctaKnopf?.stil.hintergrund],
  ].filter(([, x, y]) => x && y).map(([n, x, y]) => ({ paar: n, vorne: x, hinten: y, wert: kontrast(x, y) }));

  /* ---------- Bericht ---------- */
  const zeile = (...z) => `| ${z.map((x) => (x === null || x === undefined || x === '' ? LEER : String(x).replace(/\|/g, '/'))).join(' | ')} |`;
  const typoZeilen = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'link', 'navigation', 'label', 'klein'].filter((k) => typoDesktop[k]?.length).map((k) => {
    const d = typoDesktop[k][0], m = typoMobil[k]?.[0];
    return zeile(k, d.familie, `${d.groesse}px`, m ? `${m.groesse}px` : null, d.gewicht, d.zeilenhoehe, d.laufweite, d.transform, d.farbe, `${d.anzahl}x`, d.beispiel);
  });
  const alleFarben = cluster(addiere(addiere(addiere({}, farbSumme('flaeche')), farbSumme('interaktivBg')), farbSumme('text'))).slice(0, 14);
  const angehoben = Object.entries(skala).filter(([, s]) => s.angehoben).map(([k]) => `--${k}`);
  const bericht = `# Brand Extraktion ${startUrl.host}

Erzeugt am ${new Date().toISOString().slice(0, 16).replace('T', ' ')} mit brand-extraktion.mjs ${VERSION}. Geprüfte Seiten: ${seiten.map((s) => `${s.pfad} (HTTP ${s.status ?? '?'}${s.consentGeklickt ? ', Consent weggeklickt' : ''})`).join(', ')}.
Seitentitel: ${erste.titel || LEER}, Sprache: ${erste.sprache || LEER}

Alle Werte sind gemessen, die Rollen darunter sind ein Vorschlag. Auswertung und Übernahme nach
\`references/brand-extraktion.md\` im agentur-website-builder, Regeln in
\`20-markenextraktion-bestandsseite.md\`.

${warnungen.length ? `## Warnungen\n\n${warnungen.map((w) => `> ${w}`).join('\n>\n')}\n` : ''}
## Screenshots

${seiten.map((s) => { const n = sauber(s.pfad === '/' ? 'start' : s.pfad); return `\`screenshots/${n}__held.png\` erster Bildschirm, \`screenshots/${n}__desktop.png\` ganze Seite 1440, \`screenshots/${n}__mobil.png\` ganze Seite 375`; }).join('  \n')}

## Farbrollen (Vorschlag)

| Rolle | Wert | Herleitung |
| --- | --- | --- |
${Object.entries(rollen).map(([k, r]) => zeile(k, r?.hex, r?.quelle || 'nicht gefunden')).join('\n')}

Rangliste Markenfarben nach Punkten: ${markenListe.slice(0, 6).map((m) => `${m.hex} (${m.punkte})`).join(', ') || 'keine Buntfarben gefunden'}
${erste.themeColor ? `\nmeta theme-color: ${erste.themeColor}` : ''}${manifest?.theme_color ? `  \nManifest theme_color: ${manifest.theme_color}, background_color: ${manifest.background_color}` : ''}

## Kontraste nach WCAG 2.2

| Paar | Vordergrund | Hintergrund | Verhältnis | Bewertung |
| --- | --- | --- | --- | --- |
${paare.map((k) => zeile(k.paar, k.vorne, k.hinten, `${k.wert}:1`, k.wert >= 4.5 ? 'AA erfüllt' : k.wert >= 3 ? 'nur für große Schrift und Bedienelemente' : 'nicht barrierefrei, im Relaunch anpassen')).join('\n')}

## Alle Farben nach Anteil

| Farbe | Anteil |
| --- | --- |
${alleFarben.map((c) => zeile(c.hex, `${c.anteil} %`)).join('\n')}

${Object.keys(alleVarFarben).length ? `## Farbvariablen im CSS der Seite\n\nOft die sauberste Quelle, etwa bei Elementor (--e-global-color-*) oder WordPress (--wp--preset--color--*).\n\n| Variable | Wert |\n| --- | --- |\n${Object.entries(alleVarFarben).slice(0, 40).map(([k, h]) => zeile(k, h)).join('\n')}\n` : ''}
## Schriften

| Familie | Textanteil | Quelle | Lizenzhinweis | Heruntergeladene Dateien |
| --- | --- | --- | --- | --- |
${Object.entries(familien).map(([f, x]) => zeile(f, x.textanteil, x.quellen.join(', '), x.quellen.map((q) => LIZENZ[q]).filter(Boolean).join('; ') || (x.quellen.includes('Systemschrift') ? 'Systemschrift, keine Datei nötig' : 'prüfen'), x.dateien.join(', '))).join('\n')}

Geladene Schnitte laut Browser: ${[...new Map(seiten.flatMap((s) => s.analyse.schriftenGeladen).map((f) => [`${f.familie} ${f.gewicht} ${f.stil}`, f])).keys()].join(', ') || 'keine'}
${schriftDateiListe.filter((d) => d.genutzt === false).length ? `\nGeladen, aber im Text nicht genutzt (meist Icons oder Reste): ${schriftDateiListe.filter((d) => d.genutzt === false).map((d) => d.datei).join(', ')}` : ''}

## Typografie

| Element | Familie | Desktop | Mobil | Gewicht | Zeilenhöhe | Laufweite | Transform | Farbe | Vorkommen | Beispiel |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${typoZeilen.join('\n')}

Häufigste Schriftgrößen nach Textmenge: ${rang(summe('groessen'), 8).map(([g]) => `${g}px`).join(', ')}
${angehoben.length ? `\nUnter ${KLEINSTE_SCHRIFT} px gemessen und im Tokenvorschlag angehoben: ${angehoben.join(', ')}.` : ''}

## Buttons

| Nr | Text | Hintergrund | Text | Radius | Innenabstand | Höhe | Schrift | Rahmen | Hover | Vorkommen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${erste.buttons.map((b, i) => zeile(i + 1 + (b.imHeld ? ' Held' : ''), b.text, b.stil.hintergrund, b.stil.text, b.stil.radius, b.stil.innenabstand, `${b.stil.hoehe}px`, `${b.stil.schrift} ${b.stil.groesse} ${b.stil.gewicht} ${b.stil.transform !== 'none' ? b.stil.transform : ''}`.trim(), b.stil.rahmen, b.hover ? `bg ${b.hover.hintergrund || 'transparent'}, text ${b.hover.text}${b.hover.transform !== 'none' ? ', bewegt' : ''}` : null, `${b.anzahl}x`)).join('\n') || zeile('keine Buttons erkannt')}

## Eingabefelder

${erste.eingaben.length ? `| Hintergrund | Text | Rahmen | Rahmen unten | Radius | Höhe | Schriftgröße |\n| --- | --- | --- | --- | --- | --- | --- |\n${erste.eingaben.map((e) => zeile(e.stil.hintergrund, e.stil.text, e.stil.rahmen, e.stil.rahmenUnten, e.stil.radius, `${e.stil.hoehe}px`, e.stil.groesse)).join('\n')}` : 'Auf den geprüften Seiten keine Formularfelder. Für Formularstile die Kontaktseite als Pfad mitgeben.'}

## Radien, Schatten, Layout, Bewegung

| Merkmal | Häufigste Werte |
| --- | --- |
${zeile('Radien', radienRang.slice(0, 6).map((r) => `${r.v} (${r.n}x)`).join(', '))}
${zeile('Schatten', schattenRang.map((s) => `${s.v} (${s.n}x)`).join('; '))}
${zeile('Containerbreiten', breiteRang.map(([w, n]) => `${w} (${n}x)`).join(', '))}
${zeile('Sektionsabstand oben', abstaendeRang.map(([w, n]) => `${w} (${n}x)`).join(', '))}
${zeile('Übergänge', uebergangRang.map(([w, n]) => `${w} (${n}x)`).join(', '))}

## Logo und Markenassets

${logos.length ? `| Datei | Art | Größe auf der Seite | Farben im Logo | Punkte |\n| --- | --- | --- | --- | --- |\n${logos.map((l) => zeile(l.datei || 'Download fehlgeschlagen', l.art, `${l.breite}x${l.hoehe}`, l.farben.map((f) => f.hex).join(', '), l.punkte)).join('\n')}\n\n\`assets/logo.*\` ist der wahrscheinlichste Treffer, die Kandidaten 2 und 3 nur prüfen, wenn der erste falsch ist. Ein Rasterlogo (png, jpg, webp) beim Kunden als SVG anfragen.` : 'Kein Logo erkannt. Beim Kunden anfragen.'}

Favicons: ${icons.map((i) => i.datei || `${i.href} (nicht geladen)`).join(', ') || 'keine'}
OG Bild: ${ogBild ? ogBild.datei || ogBild.url : 'keins'}

${firecrawl ? `## Abgleich mit Firecrawl\n\nFirecrawl Farben: ${Object.entries(firecrawl.colors || {}).map(([k, x]) => `${k} ${x}`).join(', ') || LEER}  \nFirecrawl Schriften: ${(firecrawl.fonts || []).map((f) => f.family || f).join(', ') || LEER}  \nVollständig in \`firecrawl-branding.json\`. Bei Abweichungen gilt der Screenshot.\n` : ''}
## Nächste Schritte

1. Farbrollen gegen \`screenshots/*__held.png\` prüfen, besonders marke und akzent.
2. Die gemessenen Zeilen aus \`tokens-vorschlag.css\` in die \`tokens.css\` des Projekts übertragen, Kommentarzeilen bedeuten: Wert der Vorlage behalten.
3. Ergebnis in \`marke-brief.md\` Abschnitt 7 und \`marke.json\` unter \`herkunft.bestehende_marke\` eintragen, je Feld übernommen oder bewusst geändert, mit Grund.
4. Schriften mit freier Lizenz als WOFF2 nach \`public/fonts/\` übernehmen, alle anderen beim Kunden klären.
5. Logo nach \`public/images/\` übernehmen, bei Rasterlogo SVG anfragen.
`;

  await writeFile(path.join(ausgabe, 'tokens-vorschlag.css'), tokens, 'utf8');
  await writeFile(path.join(ausgabe, 'BRAND.md'), bericht, 'utf8');
  for (const s of seiten) { for (const l of s.analyse.logoKandidaten) delete l.svg; delete s.analyse.fontFaceInline; }
  await writeFile(path.join(ausgabe, 'brand.json'), JSON.stringify({
    version: VERSION, quelle: startUrl.href, erstellt: new Date().toISOString(), warnungen, rollen, markenListe, farben: F, variablenFarben: alleVarFarben,
    familien, schriftDateien: schriftDateiListe, fontFaces: faces.filter((f) => genutzteFamilien.has(f.familie.toLowerCase())),
    typoDesktop, typoMobil, skala, kontraste: paare, radien: radienRang, schatten: schattenRang, logos, icons, ogBild, manifest, firecrawl, seiten,
  }, null, 2), 'utf8');

  console.log(`\nFertig. Ergebnisse in ${ausgabe}/`);
  console.log(`  Marke ${rollen.marke?.hex || LEER}, Akzent ${rollen.akzent?.hex || LEER}, Fläche ${rollen.flaeche.hex}, Text ${rollen.text.hex}`);
  console.log(`  Schriften: Display ${familieDisplay || LEER}, Text ${familieText || LEER}; ${schriftDateiListe.length} Schriftdateien geladen`);
  console.log(`  Logo: ${logos[0]?.datei || 'nicht gefunden'}; Buttons: ${erste.buttons.length}; Warnungen: ${warnungen.length}`);
  for (const w of warnungen) console.log(`  WARNUNG ${w}`);
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = await main(process.argv.slice(2));
}
