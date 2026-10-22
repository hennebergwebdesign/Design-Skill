#!/usr/bin/env node
/*
  pruefe-typografie.mjs — prüft das Typografiesystem eines Projekts: rem statt px, Zoomfestigkeit
  der fließenden Skala, Untergrenze, Ordnung der Stufen, Schriftladen.

  WARUM ES DIESES SKRIPT GIBT
  Die Regeln aus 55-typografie-system.md entscheiden, ob Text bei 200 % Zoom und bei
  geänderter Browserschriftgröße noch funktioniert (WCAG 1.4.4, BFSG). Ansehen lässt sich das
  kaum: eine Skala aus px oder reinem vw sieht im Entwurf genauso aus wie eine aus rem und
  fällt erst bei der Person auf, die ihre Schrift größer gestellt hat. Deshalb zählt das eine
  Maschine.

  WAS GEPRÜFT WIRD (FEHLER)
    px-schrift       font-size oder --text-* in px. px ignoriert die Schriftgröße, die jemand
                     im Browser eingestellt hat.
    wurzel-px        font-size in px auf html oder :root. Setzt die Browsereinstellung für die
                     ganze Seite außer Kraft.
    nur-vw           fließende Größe ohne rem-Anteil (5vw, clamp(1rem, 4vw, 3rem)). Wächst beim
                     Zoomen nicht mit.
    zoomgrenze       clamp, dessen Höchstwert mehr als das 2,5-fache des Mindestwerts ist.
    unter-boden      Schriftgröße oder Untergrenze einer Stufe unter 14 px (0.875rem).
    ordnung          eine Stufe der Skala ist bei 360, 768, 1200 oder 1440 px nicht größer als
                     die darunter (--text-xs < sm < base < lg < h4 < h3 < h2 < h1).
    zoom-gesperrt    meta viewport mit user-scalable=no oder maximum-scale unter 2.
    fremd-cdn        Schriften von fonts.googleapis.com, fonts.gstatic.com, use.typekit.net
                     oder fonts.bunny.net. Selbst hosten, siehe 07-recht-dsgvo.md.
  WAS GEPRÜFT WIRD (WARNUNG)
    wurzel-prozent   html { font-size: 62.5% } und ähnliche. Rechnet um die Browsereinstellung
                     herum und verlangt überall Umrechnung.
    zeile-px         line-height in px oder rem. Wächst nicht mit der Schrift; ohne Einheit
                     schreiben (1.5).
    laufweite-px     letter-spacing in px oder rem. Gehört in em, damit es mit der Größe skaliert.
    ohne-display     @font-face ohne font-display.
    fehlender-schnitt  ein benutztes Gewicht hat keine @font-face. Der Browser verfettet dann
                     künstlich.
    ohne-ersatz      eigene Schriften, aber keine Ersatzschrift mit size-adjust. Der Wechsel
                     springt, siehe scripts/schrift-metriken.mjs.

  AUSNAHMEN
    Eine Zeile mit einem Kommentar, der das Wort "bewusst" enthält, wird nicht gemeldet.
    Ordner wie in den anderen Prüfskripten (node_modules, dist ...) werden übersprungen.
    Die Silbentrennung prüft pruefe-striche.mjs, den Kontrast pruefe-kontrast.mjs.

  AUFRUF
    node scripts/pruefe-typografie.mjs                 Standard: src
    node scripts/pruefe-typografie.mjs src public
    node scripts/pruefe-typografie.mjs --strict        Warnungen zählen wie Fehler

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const CSS_ENDUNGEN = new Set(['.css', '.scss', '.pcss']);
const MARKUP_ENDUNGEN = new Set(['.astro', '.html', '.htm', '.vue', '.svelte']);
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'dist', 'build', '.astro', '.next', '.output',
  '.cache', 'coverage', 'vendor', 'results']);

export const BODEN_PX = 14;
export const ZOOMGRENZE = 2.5;
export const PRUEFFENSTER = [360, 768, 1200, 1440];
export const SKALA_ORDNUNG = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-h4', 'text-h3', 'text-h2', 'text-h1'];
const FREMDE_SCHRIFTDIENSTE = /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net/i;

/* ------------------------------------------------------------------ Werte rechnen */

/* Ein linearer Ausdruck wie "1.2rem + 0.5vw" oder "calc(1rem - 2px)" als
   { px, rem, vw, em, unbekannt }. px und rem werden getrennt geführt, weil nur der
   rem-Anteil mit der Browserschrift wächst. */
export function linear(ausdruck, tokens = {}, tiefe = 0) {
  const t = { px: 0, rem: 0, vw: 0, em: 0, prozent: 0, unbekannt: false };
  let s = ausdruck.trim();
  while (/^calc\(/i.test(s) && s.endsWith(')')) s = s.slice(5, -1).trim();
  const teile = s.match(/[+-]?\s*(?:var\([^)]*\)|[\d.]+[a-z%]*)/gi);
  if (!teile || teile.join('').replace(/\s/g, '') !== s.replace(/\s/g, '')) return { ...t, unbekannt: true };
  for (const roh of teile) {
    const vz = roh.trim().startsWith('-') ? -1 : 1;
    const w = roh.replace(/^[+-]\s*/, '').trim();
    const v = w.match(/^var\(\s*--([\w-]+)\s*(?:,\s*(.+))?\)$/i);
    if (v) {
      const ziel = tokens[v[1]] ?? v[2];
      if (!ziel || tiefe > 4) { t.unbekannt = true; continue; }
      const u = linear(ziel, tokens, tiefe + 1);
      for (const k of ['px', 'rem', 'vw', 'em', 'prozent']) t[k] += vz * u[k];
      t.unbekannt ||= u.unbekannt;
      continue;
    }
    const m = w.match(/^([\d.]+)([a-z%]*)$/i);
    if (!m) { t.unbekannt = true; continue; }
    const zahl = vz * Number(m[1]);
    const einheit = m[2].toLowerCase();
    if (einheit === 'px') t.px += zahl;
    else if (einheit === 'rem') t.rem += zahl;
    else if (einheit === 'em') t.em += zahl;
    else if (einheit === 'vw' || einheit === 'vi' || einheit === 'cqi' || einheit === 'cqw') t.vw += zahl;
    else if (einheit === '%') t.prozent += zahl;
    else if (einheit === '' && zahl === 0) { /* 0 */ } else t.unbekannt = true;
  }
  return t;
}

const inPx = (l, fenster) => l.px + (l.rem + l.em) * 16 + (l.vw * fenster) / 100;

/* Argumente einer Funktion auf oberster Ebene trennen. */
function argumente(innen) {
  const liste = [];
  let tiefe = 0, start = 0;
  for (let i = 0; i < innen.length; i++) {
    const c = innen[i];
    if (c === '(') tiefe++;
    else if (c === ')') tiefe--;
    else if (c === ',' && tiefe === 0) { liste.push(innen.slice(start, i)); start = i + 1; }
  }
  liste.push(innen.slice(start));
  return liste.map((a) => a.trim());
}

/* Beschreibt einen font-size-Wert: { art: 'fest'|'fluessig'|'unbekannt', ... } */
export function schriftwert(wert, tokens = {}) {
  const w = wert.trim().replace(/\s*!important$/i, '');
  const c = w.match(/^clamp\((.*)\)$/is);
  if (c) {
    const [a, b, d] = argumente(c[1]);
    if (!d) return { art: 'unbekannt' };
    const min = linear(a, tokens), mitte = linear(b, tokens), max = linear(d, tokens);
    if (min.unbekannt || mitte.unbekannt || max.unbekannt) return { art: 'unbekannt', mitte };
    return { art: 'fluessig', min, mitte, max };
  }
  if (/^(min|max)\(/i.test(w) || /^var\(/i.test(w) && !tokens[w.match(/--([\w-]+)/)?.[1]]) return { art: 'unbekannt' };
  const l = linear(w, tokens);
  if (l.unbekannt) return { art: 'unbekannt' };
  return { art: l.vw ? 'fluessig' : 'fest', wert: l, min: l, mitte: l, max: l };
}

/* Größe in px bei einer Fensterbreite, oder null, wenn nicht rechenbar. */
export function groesseBei(wert, fenster, tokens = {}) {
  const s = schriftwert(wert, tokens);
  if (s.art === 'unbekannt') return null;
  if (s.art === 'fest') return inPx(s.wert, fenster);
  const v = inPx(s.mitte, fenster);
  return Math.min(Math.max(v, inPx(s.min, fenster)), inPx(s.max, fenster));
}

/* ------------------------------------------------------------------ CSS lesen */

/* Kommentare durch Leerzeichen ersetzen, Zeilen bleiben erhalten. Zeilen mit einem
   Kommentar, der "bewusst" enthält, werden gemerkt. */
function kommentareEntfernen(css) {
  const bewusst = new Set();
  const ohne = css.replace(/\/\*[\s\S]*?\*\//g, (k, pos) => {
    if (/bewusst/i.test(k)) {
      const zeile = css.slice(0, pos).split('\n').length;
      bewusst.add(zeile);
      bewusst.add(zeile + k.split('\n').length - 1);
    }
    return k.replace(/[^\n]/g, ' ');
  });
  return { ohne, bewusst };
}

/* Läuft durch Blöcke und liefert jede Deklaration mit Selektor, Media-Kontext und Zeile. */
export function deklarationen(css, zeilenVersatz = 0) {
  const { ohne, bewusst } = kommentareEntfernen(css);
  const liste = [];
  const stapel = [];
  let puffer = '', pufferStart = 0;
  const zeileVon = (pos) => ohne.slice(0, pos).split('\n').length + zeilenVersatz;
  const ablegen = (text, pos) => {
    const m = text.match(/^\s*(--[\w-]+|[a-z-]+)\s*:\s*([\s\S]+?)\s*$/i);
    if (!m || !stapel.length) return;
    const voran = text.match(/^\s*/)[0].length;
    const zeile = zeileVon(pos + voran);
    const media = stapel.filter((b) => b.media !== null).map((b) => b.media);
    liste.push({
      eigenschaft: m[1].toLowerCase().startsWith('--') ? m[1] : m[1].toLowerCase(),
      wert: m[2],
      selektor: stapel[stapel.length - 1].prelude,
      ab: media.length ? Math.max(...media) : 0,
      mediaUnbekannt: stapel.some((b) => b.mediaUnbekannt),
      zeile,
      bewusst: bewusst.has(zeile - zeilenVersatz),
    });
  };
  for (let i = 0; i < ohne.length; i++) {
    const c = ohne[i];
    if (c === '{') {
      const prelude = puffer.trim();
      let media = null, mediaUnbekannt = false;
      if (/^@media/i.test(prelude)) {
        const mw = prelude.match(/min-width\s*:\s*([\d.]+)(px|em|rem)/i);
        if (mw && !/max-width|,|\bor\b/i.test(prelude)) media = Number(mw[1]) * (mw[2] === 'px' ? 1 : 16);
        else mediaUnbekannt = true;
      }
      stapel.push({ prelude, media, mediaUnbekannt });
      puffer = ''; pufferStart = i + 1;
    } else if (c === '}') {
      ablegen(puffer, pufferStart);
      stapel.pop();
      puffer = ''; pufferStart = i + 1;
    } else if (c === ';') {
      ablegen(puffer, pufferStart);
      puffer = ''; pufferStart = i + 1;
    } else {
      puffer += c;
    }
  }
  return liste;
}

/* <style>-Blöcke aus Markup mit ihrem Zeilenversatz. */
function styleBloecke(inhalt) {
  const bloecke = [];
  for (const m of inhalt.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const start = m.index + m[0].indexOf('>') + 1;
    bloecke.push({ css: m[1], versatz: inhalt.slice(0, start).split('\n').length - 1 });
  }
  return bloecke;
}

/* ------------------------------------------------------------------ Regeln je Datei */

const befund = (regel, zeile, meldung, tipp) => ({ regel, zeile, meldung, tipp });
const istSkalaToken = (e) => /^--(text|schrift-groesse|font-size|fs)-/i.test(e);
const istWurzel = (sel) => /(^|,)\s*(html|:root)\s*(,|$)/i.test(sel);

export function dateiAnalysieren(inhalt, endung, tokens = {}) {
  const fehler = [], warnungen = [];
  const css = CSS_ENDUNGEN.has(endung) ? [{ css: inhalt, versatz: 0 }]
    : MARKUP_ENDUNGEN.has(endung) ? styleBloecke(inhalt) : [];
  const decls = css.flatMap((b) => deklarationen(b.css, b.versatz));
  const faces = [];
  const gewichte = [];

  for (const d of decls) {
    if (d.bewusst) continue;
    const istSchrift = d.eigenschaft === 'font-size' || istSkalaToken(d.eigenschaft);
    if (d.selektor.startsWith('@font-face')) continue;

    if (istSchrift) {
      const wert = d.wert;
      if (d.eigenschaft === 'font-size' && istWurzel(d.selektor)) {
        const p = wert.match(/^([\d.]+)%$/);
        if (/px\b/i.test(wert)) {
          fehler.push(befund('wurzel-px', d.zeile, `font-size: ${wert} auf ${d.selektor}`, 'Die Wurzel bekommt keine Schriftgröße oder 100 %. Skala in rem darauf aufbauen.'));
          continue;
        }
        if (p && Number(p[1]) < 100) {
          warnungen.push(befund('wurzel-prozent', d.zeile, `font-size: ${wert} auf ${d.selektor}`, 'Der 62,5-%-Trick verkleinert jede fremde Komponente mit. Wurzel bei 100 % lassen, in rem rechnen.'));
          continue;
        }
      }
      if (/^(inherit|initial|unset|revert|smaller|larger|[a-z-]+-?small|medium|[a-z-]*large)$/i.test(wert.trim())) continue;
      if (/^[\d.]+(em|%)$/i.test(wert.trim())) {
        /* relativ zum Elternelement: unter dem Boden nur, wenn deutlich kleiner */
        const f = parseFloat(wert) / (wert.includes('%') ? 100 : 1);
        if (f < BODEN_PX / 16 - 0.001 && !/^(sub|sup|small|code|kbd)\b/i.test(d.selektor)) {
          warnungen.push(befund('unter-boden', d.zeile, `font-size: ${wert} auf ${d.selektor}`, 'Relativ zum Elternelement kann das unter 14 px fallen. Auf eine Stufe der Skala legen.'));
        }
        continue;
      }
      const s = schriftwert(wert, tokens);
      if (/\d(\.\d+)?px/i.test(wert) && !(s.art === 'fluessig' && s.mitte.rem)) {
        fehler.push(befund('px-schrift', d.zeile, `${d.eigenschaft}: ${wert}`, 'In rem schreiben (px ÷ 16). px ignoriert die eingestellte Browserschrift.'));
        continue;
      }
      if (s.art === 'unbekannt') continue;
      if (s.art === 'fluessig') {
        if (!s.mitte.rem && !s.mitte.em) {
          fehler.push(befund('nur-vw', d.zeile, `${d.eigenschaft}: ${wert}`, 'Der fließende Teil braucht einen rem-Anteil: clamp(min, Xrem + Yvw, max). Mit scripts/typoskala.mjs rechnen.'));
        }
        const lo = inPx(s.min, 0), hi = inPx(s.max, 0);
        if (lo > 0 && hi / lo > ZOOMGRENZE + 1e-9) {
          fehler.push(befund('zoomgrenze', d.zeile, `${d.eigenschaft}: ${wert} (Höchstwert ${(hi / lo).toFixed(2)}-fach)`, `Höchstwert höchstens ${ZOOMGRENZE}-fach des Mindestwerts, sonst kein 200-%-Zoom in jedem Fenster.`));
        }
        if (lo > 0 && lo < BODEN_PX - 0.01) {
          fehler.push(befund('unter-boden', d.zeile, `${d.eigenschaft}: ${wert} (Mindestwert ${lo.toFixed(1)} px)`, 'Kleinste Stufe ist 0.875rem (14 px).'));
        }
      } else {
        const px = inPx(s.wert, 0);
        if (px > 0 && px < BODEN_PX - 0.01) {
          fehler.push(befund('unter-boden', d.zeile, `${d.eigenschaft}: ${wert} (${px.toFixed(1)} px)`, 'Kleinste Stufe ist 0.875rem (14 px).'));
        }
      }
      continue;
    }

    if (d.eigenschaft === 'line-height' || /^--zeilenhoehe/i.test(d.eigenschaft)) {
      if (/\d(px|rem)\b/i.test(d.wert) && !/^calc\(.*\bem\b/i.test(d.wert)) {
        warnungen.push(befund('zeile-px', d.zeile, `${d.eigenschaft}: ${d.wert}`, 'Ohne Einheit schreiben (z. B. 1.5), dann wächst die Zeilenhöhe mit der Schrift.'));
      }
    }
    if (d.eigenschaft === 'letter-spacing' || /^--laufweite/i.test(d.eigenschaft)) {
      if (/[1-9]\d*(\.\d+)?(px|rem)\b|0?\.\d*[1-9]\d*(px|rem)\b/i.test(d.wert)) {
        warnungen.push(befund('laufweite-px', d.zeile, `${d.eigenschaft}: ${d.wert}`, 'In em schreiben (z. B. -0.02em), dann bleibt die Sperrung bei jeder Größe gleich.'));
      }
    }
    if (d.eigenschaft === 'font-weight' || /^--gewicht/i.test(d.eigenschaft)) {
      gewichte.push({ wert: d.wert, zeile: d.zeile });
    }
  }

  /* @font-face getrennt einsammeln: Deklarationen gehören zum Block */
  for (const b of css) {
    const { ohne } = kommentareEntfernen(b.css);
    for (const m of ohne.matchAll(/@font-face\s*\{([^}]*)\}/gi)) {
      const block = m[1];
      const zeile = ohne.slice(0, m.index).split('\n').length + b.versatz;
      const familie = block.match(/font-family\s*:\s*['"]?([^;'"]+)/i)?.[1]?.trim() ?? '?';
      const gewicht = block.match(/font-weight\s*:\s*([^;]+)/i)?.[1]?.trim() ?? '400';
      const lokal = /src\s*:[^;]*\blocal\(/i.test(block) && !/url\(/i.test(block);
      const ersatz = lokal && /size-adjust\s*:/i.test(block);
      faces.push({ familie, gewicht, zeile, lokal, ersatz });
      if (!lokal && !/font-display\s*:/i.test(block)) {
        warnungen.push(befund('ohne-display', zeile, `@font-face '${familie}' ${gewicht} ohne font-display`, 'font-display: swap setzen, sonst bleibt Text bis zu drei Sekunden unsichtbar.'));
      }
    }
  }

  const zeilen = inhalt.split('\n');
  zeilen.forEach((z, i) => {
    if (/bewusst/i.test(z)) return;
    if (FREMDE_SCHRIFTDIENSTE.test(z) && /(@import|url\(|<link|href=|src=)/i.test(z)) {
      fehler.push(befund('fremd-cdn', i + 1, z.trim().slice(0, 140), 'Schrift selbst hosten aus public/fonts/. Ein fremder Schriftdienst ist eine einwilligungspflichtige Verbindung.'));
    }
    const vp = z.match(/<meta[^>]+name=["']viewport["'][^>]*>/i) || (/name=["']viewport["']/i.test(z) ? [z] : null);
    if (vp) {
      const max = vp[0].match(/maximum-scale\s*=\s*([\d.]+)/i);
      if (/user-scalable\s*=\s*(no|0)/i.test(vp[0]) || (max && Number(max[1]) < 2)) {
        fehler.push(befund('zoom-gesperrt', i + 1, vp[0].trim().slice(0, 140), 'Zoom nie sperren: user-scalable und maximum-scale entfernen.'));
      }
    }
  });

  return { fehler, warnungen, decls, faces, gewichte };
}

/* ------------------------------------------------------------------ Projektweite Regeln */

/* Tokens aus allen Dateien, getrennt nach Media-Kontext (min-width). */
export function tokenKarte(alleDecls) {
  const basis = {}, stufen = new Map();
  for (const d of alleDecls) {
    if (!d.eigenschaft.startsWith('--') || d.mediaUnbekannt) continue;
    if (!/^(:root|html)$/i.test(d.selektor.trim())) continue;
    if (!d.ab) basis[d.eigenschaft.slice(2)] = d.wert;
    else {
      if (!stufen.has(d.ab)) stufen.set(d.ab, {});
      stufen.get(d.ab)[d.eigenschaft.slice(2)] = d.wert;
    }
  }
  return { basis, stufen };
}

export function tokensBei(karte, fenster) {
  const t = { ...karte.basis };
  for (const ab of [...karte.stufen.keys()].sort((a, b) => a - b)) {
    if (ab <= fenster) Object.assign(t, karte.stufen.get(ab));
  }
  return t;
}

export function ordnungPruefen(karte) {
  const fehler = [];
  for (const f of PRUEFFENSTER) {
    const t = tokensBei(karte, f);
    const vorhanden = SKALA_ORDNUNG.filter((n) => t[n]);
    for (let i = 1; i < vorhanden.length; i++) {
      const a = groesseBei(t[vorhanden[i - 1]], f, t), b = groesseBei(t[vorhanden[i]], f, t);
      if (a === null || b === null) continue;
      /* zwei Stufen dürfen am Boden zusammenfallen, darüber nicht */
      if (b < a - 0.01 || (b <= a + 0.01 && a > BODEN_PX + 0.01)) {
        fehler.push({ regel: 'ordnung', meldung: `--${vorhanden[i]} (${b.toFixed(1)} px) ist bei ${f} px nicht größer als --${vorhanden[i - 1]} (${a.toFixed(1)} px)`, tipp: 'Skala mit scripts/typoskala.mjs neu rechnen statt Stufen einzeln zu setzen.' });
      }
    }
  }
  return fehler;
}

const GEWICHT_WORTE = { normal: 400, bold: 700 };
function gewichtZahl(wert, tokens) {
  const v = wert.trim().match(/^var\(\s*--([\w-]+)/);
  const w = v ? tokens[v[1]] : wert;
  if (!w) return null;
  const s = w.trim().toLowerCase();
  if (GEWICHT_WORTE[s]) return GEWICHT_WORTE[s];
  return /^\d{3}$/.test(s) ? Number(s) : null;
}

export function schnittePruefen(faces, gewichte, tokens) {
  const warnungen = [];
  const eigene = faces.filter((f) => !f.lokal);
  if (!eigene.length) return warnungen;
  const abgedeckt = (g) => eigene.some((f) => {
    const [a, b] = f.gewicht.split(/\s+/).map((x) => gewichtZahl(x, tokens));
    return b ? g >= a && g <= b : g === a;
  });
  const gemeldet = new Set();
  for (const g of gewichte) {
    const zahl = gewichtZahl(g.wert, tokens);
    if (zahl === null || gemeldet.has(zahl) || abgedeckt(zahl)) continue;
    gemeldet.add(zahl);
    warnungen.push({ regel: 'fehlender-schnitt', ort: g.ort, meldung: `Gewicht ${zahl} benutzt, aber keine @font-face dafür`, tipp: 'Schnitt selbst hosten oder das Gewicht auf einen geladenen Schnitt legen. Sonst verfettet der Browser künstlich.' });
  }
  if (!faces.some((f) => f.ersatz)) {
    warnungen.push({ regel: 'ohne-ersatz', ort: eigene[0].ort, meldung: `${eigene.length} eigene Schriftschnitte, aber keine Ersatzschrift mit size-adjust`, tipp: 'node scripts/schrift-metriken.mjs <datei.woff2> erzeugt sie. Ohne sie springt das Layout beim Schriftwechsel.' });
  }
  return warnungen;
}

/* ------------------------------------------------------------------ Lauf */

function* dateienIn(pfad) {
  const st = statSync(pfad);
  if (st.isFile()) { yield pfad; return; }
  for (const e of readdirSync(pfad)) {
    if (UEBERSPRINGEN.has(e) || e.startsWith('.')) continue;
    yield* dateienIn(join(pfad, e));
  }
}

export function projektPruefen(wurzeln) {
  const dateien = [];
  for (const w of wurzeln) {
    for (const d of dateienIn(w)) {
      const e = extname(d).toLowerCase();
      if (CSS_ENDUNGEN.has(e) || MARKUP_ENDUNGEN.has(e)) dateien.push({ pfad: d, endung: e, inhalt: readFileSync(d, 'utf8') });
    }
  }
  /* erster Durchgang: Tokens sammeln, damit var() in jeder Datei auflösbar ist */
  const roh = dateien.map((d) => ({ ...d, ...dateiAnalysieren(d.inhalt, d.endung) }));
  const karte = tokenKarte(roh.flatMap((r) => r.decls));
  const fehler = [], warnungen = [], faces = [], gewichte = [];
  for (const d of dateien) {
    const r = dateiAnalysieren(d.inhalt, d.endung, karte.basis);
    const ort = (z) => `${relative(process.cwd(), d.pfad)}:${z}`;
    for (const b of r.fehler) fehler.push({ ...b, ort: ort(b.zeile) });
    for (const b of r.warnungen) warnungen.push({ ...b, ort: ort(b.zeile) });
    faces.push(...r.faces.map((f) => ({ ...f, ort: ort(f.zeile) })));
    gewichte.push(...r.gewichte.map((g) => ({ ...g, ort: ort(g.zeile) })));
  }
  for (const b of ordnungPruefen(karte)) fehler.push({ ...b, ort: 'Skala' });
  warnungen.push(...schnittePruefen(faces, gewichte, karte.basis));
  return { dateien: dateien.length, fehler, warnungen };
}

function main(argv) {
  const args = argv.slice(2);
  const strict = args.includes('--strict');
  const pfade = args.filter((a) => !a.startsWith('--'));
  const wurzeln = (pfade.length ? pfade : ['src']).filter(existsSync);
  if (!wurzeln.length) {
    console.error(`Kein Quellordner gefunden (${(pfade.length ? pfade : ['src']).join(', ')}).`);
    return 2;
  }
  const { dateien, fehler, warnungen } = projektPruefen(wurzeln);
  console.log(`Geprüft: ${dateien} Dateien in ${wurzeln.join(', ')}`);
  for (const [titel, liste] of [['FEHLER', fehler], ['WARNUNGEN', warnungen]]) {
    if (!liste.length) continue;
    console.log(`\n${titel} (${liste.length})`);
    for (const b of liste) {
      console.log(`  ${b.ort}  [${b.regel}] ${b.meldung}`);
      console.log(`    → ${b.tipp}`);
    }
  }
  if (!fehler.length && !warnungen.length) console.log('\nKein Befund.');
  else console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen.${strict ? ' (--strict: Warnungen zählen)' : ''}`);
  return fehler.length || (strict && warnungen.length) ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main(process.argv));
