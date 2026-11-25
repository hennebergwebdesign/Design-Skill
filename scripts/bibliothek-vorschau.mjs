#!/usr/bin/env node
/*
  bibliothek-vorschau.mjs — erzeugt die Vorschaubilder der Template-Bibliothek (Desktop und Mobil)

  WARUM: Die Übersicht lud zwölf ganze Seiten in Iframes, samt Schriften, Skripten und Bewegung.
  Das war langsam. Jetzt zeigt sie je Vorlage drei kleine JPEG Bilder (hohe Seitenvorschau, Abschnittsübersicht beim Überfahren, Mobil). Dieses Skript erzeugt sie neu,
  wenn sich eine Vorlage ändert. Ausgabe: <bibliothek>/vorschau/tNN-desktop.jpg, tNN-abschnitte.jpg und tNN-mobil.jpg.

  Aufruf: node scripts/bibliothek-vorschau.mjs [--qualitaet 80] [--nur t19,t20]
  Braucht Playwright (gefunden über lib/browser.mjs), sonst keine Abhängigkeit. Eigener lokaler
  Server, kein Netzzugriff. Bewegung ist auf "reduziert" gestellt, damit alle Inhalte stehen.
*/
import { createServer } from 'node:http';
import { readFile, mkdir, readdir } from 'node:fs/promises';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { playwrightLaden, PLAYWRIGHT_FEHLT, chromiumStarten } from './lib/browser.mjs';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills', 'webdesign-conversion', 'assets', 'vorlagen', 'bibliothek');
const qIdx = process.argv.indexOf('--qualitaet');
const qualitaet = qIdx > 0 ? Number(process.argv[qIdx + 1]) : 80;
const typen = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

const pw = await playwrightLaden();
if (!pw) { console.error(PLAYWRIGHT_FEHLT); process.exit(2); }

const server = createServer(async (req, res) => {
  const pfad = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  try {
    const datei = await readFile(join(wurzel, pfad.endsWith('/') ? pfad + 'index.html' : pfad));
    res.writeHead(200, { 'content-type': typen[extname(pfad)] || 'application/octet-stream' }); res.end(datei);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const basis = `http://127.0.0.1:${server.address().port}`;

const nurIdx = process.argv.indexOf('--nur');
const nur = nurIdx > 0 ? process.argv[nurIdx + 1].split(',') : null;
const ordner = (await readdir(wurzel)).filter((n) => /^t\d\d$/.test(n) && (!nur || nur.includes(n))).sort();
await mkdir(join(wurzel, 'vorschau'), { recursive: true });
const browser = await chromiumStarten(pw.chromium);
/* Desktop: hohe Vorschau (oberer Seitenteil, Format 4 zu 5) und Abschnittsübersicht (acht gleichmäßig verteilte Ausschnitte der ganzen Seite in zwei Spalten, erscheint beim Überfahren).
   Mobil: erster Bildschirm. Bewegung steht auf "reduziert", damit alle Inhalte stehen. */
const SEITE = { w: 1440, h: 1800, faktor: 0.6 };
const ABSCHNITTE = { spalten: 2, zeilen: 4, kachelB: 1440, kachelH: 900, faktor: 0.36, luecke: 6 };
const ctxD = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const ctxK = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: ABSCHNITTE.faktor, reducedMotion: 'reduce' });
const ctxS = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: SEITE.faktor, reducedMotion: 'reduce' });
const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });

/* Fotos laden: loading=lazy würde Bilder außerhalb des Bildschirms leer lassen, deshalb alle auf eager stellen, die Seite einmal durchscrollen und auf das Dekodieren warten. */
async function bilderLaden(p) {
  await p.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; i.decoding = 'sync'; });
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    scrollTo(0, 0);
    await Promise.all([...document.querySelectorAll('img')].map((i) => i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })));
    await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode ? i.decode().catch(() => {}) : null));
  });
  await p.waitForTimeout(300);
}
const montage = await ctxD.newPage();
for (const t of ordner) {
  const url = `${basis}/${t}/index.html`;
  // hohe Seitenvorschau
  let p = await ctxS.newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600); await bilderLaden(p);
  await p.screenshot({ path: join(wurzel, 'vorschau', `${t}-desktop.jpg`), type: 'jpeg', quality: qualitaet, fullPage: true, clip: { x: 0, y: 0, width: SEITE.w, height: SEITE.h } });
  await p.close();
  // Abschnittsübersicht
  p = await ctxK.newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600); await bilderLaden(p);
  const hoehe = await p.evaluate(() => document.documentElement.scrollHeight);
  const n = ABSCHNITTE.spalten * ABSCHNITTE.zeilen, schritt = Math.max(0, (hoehe - ABSCHNITTE.kachelH) / (n - 1)), bilder = [];
  // Anfänge der Abschnitte (Überschriften stehen dort), gleichmäßig ausgewählt; sonst gleichmäßige Abstände
  const tops = await p.evaluate(() => [...new Set([...document.querySelectorAll('body > section, main > section, main > div > section, body > footer, main > footer')].filter((e) => e.getBoundingClientRect().height > 240).map((e) => Math.round(e.getBoundingClientRect().top + scrollY)))].sort((a, b) => a - b));
  const ys = tops.length >= n ? Array.from({ length: n }, (_, i) => tops[Math.round(i * (tops.length - 1) / (n - 1))]) : Array.from({ length: n }, (_, i) => Math.round(i * schritt));
  for (let i = 0; i < n; i++) {
    const y = Math.max(0, Math.min(Math.max(0, hoehe - ABSCHNITTE.kachelH), ys[i]));
    const b = await p.screenshot({ type: 'jpeg', quality: qualitaet, fullPage: true, clip: { x: 0, y, width: ABSCHNITTE.kachelB, height: ABSCHNITTE.kachelH } });
    bilder.push('data:image/jpeg;base64,' + b.toString('base64'));
  }
  await p.close();
  const kb = Math.round(ABSCHNITTE.kachelB * ABSCHNITTE.faktor), kh = Math.round(ABSCHNITTE.kachelH * ABSCHNITTE.faktor), g = ABSCHNITTE.luecke;
  const bw = kb * ABSCHNITTE.spalten + g * (ABSCHNITTE.spalten + 1), bh = kh * ABSCHNITTE.zeilen + g * (ABSCHNITTE.zeilen + 1);
  await montage.setViewportSize({ width: bw, height: bh });
  await montage.setContent(`<body style="margin:0;background:#101214;display:grid;grid-template-columns:repeat(${ABSCHNITTE.spalten},${kb}px);gap:${g}px;padding:${g}px;width:${bw}px;box-sizing:border-box">${bilder.map((b) => `<img src="${b}" width="${kb}" height="${kh}" style="display:block;border-radius:6px">`).join('')}</body>`);
  await montage.waitForTimeout(150);
  await montage.screenshot({ path: join(wurzel, 'vorschau', `${t}-abschnitte.jpg`), type: 'jpeg', quality: qualitaet, clip: { x: 0, y: 0, width: bw, height: bh } });
  // Mobil
  p = await ctxM.newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600); await bilderLaden(p);
  await p.screenshot({ path: join(wurzel, 'vorschau', `${t}-mobil.jpg`), type: 'jpeg', quality: qualitaet });
  await p.close();
  console.log(t);
}
await browser.close(); server.close();
