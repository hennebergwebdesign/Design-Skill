#!/usr/bin/env node
/*
  bibliothek-vorschau.mjs — erzeugt die Vorschaubilder der Template-Bibliothek (Desktop und Mobil)

  WARUM: Die Übersicht lud zwölf ganze Seiten in Iframes, samt Schriften, Skripten und Bewegung.
  Das war langsam. Jetzt zeigt sie je Vorlage zwei kleine JPEG Bilder. Dieses Skript erzeugt sie neu,
  wenn sich eine Vorlage ändert. Ausgabe: <bibliothek>/vorschau/tNN-desktop.jpg und tNN-mobil.jpg.

  Aufruf: node scripts/bibliothek-vorschau.mjs [--qualitaet 78]
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
const qualitaet = qIdx > 0 ? Number(process.argv[qIdx + 1]) : 78;
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

const ordner = (await readdir(wurzel)).filter((n) => /^t\d\d$/.test(n)).sort();
await mkdir(join(wurzel, 'vorschau'), { recursive: true });
const browser = await chromiumStarten(pw.chromium);
const ansichten = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, faktor: 960 / 1440 },
  { name: 'mobil', viewport: { width: 390, height: 844 }, faktor: 0.75 },
];
for (const a of ansichten) {
  const ctx = await browser.newContext({ viewport: a.viewport, deviceScaleFactor: a.faktor, reducedMotion: 'reduce' });
  for (const t of ordner) {
    const seite = await ctx.newPage();
    await seite.goto(`${basis}/${t}/index.html`, { waitUntil: 'load' });
    await seite.evaluate(() => document.fonts.ready);
    await seite.waitForTimeout(600);
    await seite.screenshot({ path: join(wurzel, 'vorschau', `${t}-${a.name}.jpg`), type: 'jpeg', quality: qualitaet });
    await seite.close();
    console.log(`${t} ${a.name}`);
  }
  await ctx.close();
}
await browser.close(); server.close();
