#!/usr/bin/env node
/*
  bibliothek-conversion.mjs — prüft die Vorlagen der Template-Bibliothek gegen das Conversion Raster

  WARUM: Das Raster steht im README der Bibliothek ("Conversion Raster"), geprüft wurde es bisher von Hand durch Zählen.
  Eine Regel ohne Prüfung ist eine Checkbox. Dieses Skript zählt dieselben Punkte für jede Vorlage und Variante.

  Aufruf: node scripts/bibliothek-conversion.mjs [t69 t70 ...] [--ab t69] [--json]
  Ohne Angabe: alle Vorlagen. Exit 1 bei mindestens einem Fehler, Warnungen brechen nicht ab.
  Keine Abhängigkeit. Liest HTML mit regulären Ausdrücken: Kopfzeile, Navigation und Knöpfe werden über Namen
  und Reihenfolge erkannt, nicht über einen Parser. Ein Treffer ist ein Hinweis auf die Stelle, nicht ihr Beweis.

  Fehler:  Title über 60, Description über 160 oder fehlend, nicht genau eine h1, lang nicht de, mehr als 6 Navigationspunkte,
           kein tel: Link, weniger als 5 details, kein Formular, mehr als 5 Felder je Formular, E-Mail Feld ohne Feldhinweis,
           kein Primär CTA mit gleichem Text in der Kopfzeile und mindestens dreimal auf der Seite, Bild über 200 KB.
  Warnung: Heldformel nicht als Kommentar vor der h1, kein JSON-LD.
*/
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills', 'webdesign-conversion', 'assets', 'vorlagen', 'bibliothek');
const args = process.argv.slice(2);
const json = args.includes('--json');
const abIdx = args.indexOf('--ab');
const ab = abIdx > -1 ? args[abIdx + 1] : null;
const wahl = args.filter((a, i) => /^t\d\d$/.test(a) && i !== abIdx + 1);
let ordner = readdirSync(wurzel).filter((n) => /^t\d\d$/.test(n)).sort();
if (wahl.length) ordner = ordner.filter((n) => wahl.includes(n));
if (ab) ordner = ordner.filter((n) => n >= ab);

const text = (h) => h.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function seite(html) {
  const f = [], w = [], info = {};
  const titel = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]?.trim();
  const beschr = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1];
  info.title = titel ? titel.length : 0; info.description = beschr ? beschr.length : 0;
  if (!titel) f.push('Title fehlt'); else if (titel.length > 60) f.push(`Title ${titel.length} Zeichen (höchstens 60)`);
  if (!beschr) f.push('Description fehlt'); else if (beschr.length > 160) f.push(`Description ${beschr.length} Zeichen (höchstens 160)`);
  if (!/<html[^>]*\slang="de"/i.test(html)) f.push('lang="de" fehlt');
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1 !== 1) f.push(`${h1} h1 (genau eine)`);

  const nav = html.match(/<nav[^>]*(?:Hauptnavigation|hauptnav)[^>]*>([\s\S]*?)<\/nav>/i) || html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/i);
  /* Knöpfe (Primär CTA, Telefon) in der Navigation sind keine Menüpunkte */
  const navPunkte = nav ? [...nav[1].matchAll(/<a\b([^>]*)>/gi)].filter((m) => !/class="[^"]*(knopf|btn|button|cta|primaer)/i.test(m[1]) && !/href="tel:/i.test(m[1])).length : 0;
  info.nav = navPunkte;
  if (!nav) f.push('keine Hauptnavigation (nav)'); else if (navPunkte > 6) f.push(`${navPunkte} Navigationspunkte (höchstens 6)`);

  const tel = (html.match(/href="tel:/gi) || []).length; info.tel = tel;
  if (!tel) f.push('kein tel: Link');
  const details = (html.match(/<details[\s>]/gi) || []).length; info.details = details;
  if (details < 5) f.push(`${details} details (mindestens 5 für die Einwand FAQ)`);

  const formulare = [...html.matchAll(/<form[\s\S]*?<\/form>/gi)].map((m) => m[0]);
  info.formulare = formulare.length;
  if (!formulare.length) f.push('kein Formular');
  let email = false;
  formulare.forEach((fo, i) => {
    const felder = [...fo.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)].filter((m) => {
      if (m[1].toLowerCase() !== 'input') return true;
      const t = (m[2].match(/type="([^"]+)"/i) || [, 'text'])[1].toLowerCase();
      if (['hidden', 'submit', 'button', 'checkbox', 'radio'].includes(t)) return false;
      if (/tabindex="-1"/.test(m[2]) && /(hp|honig|website|url)/i.test(m[2])) return false;
      return true;
    }).length;
    (info.felder ||= []).push(felder);
    if (felder > 5) f.push(`Formular ${i + 1}: ${felder} Felder (höchstens 5)`);
    if (/type="email"/i.test(fo)) email = true;
  });
  if (email && !/feld__hinweis/.test(html)) f.push('E-Mail Feld ohne Feldhinweis (class feld__hinweis)');
  if (/type="tel"/i.test(html) && !/feld__hinweis/.test(html)) f.push('Telefonfeld ohne Feldhinweis');

  /* Primär CTA: Text, der in der Kopfzeile an einem Knopf steht und mindestens dreimal an Knöpfen vorkommt */
  const kopf = (html.match(/<header[\s\S]*?<\/header>/i) || [''])[0];
  const knoepfe = (s) => [...s.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)]
    .filter((m) => /class="[^"]*(knopf|btn|button|cta|primaer)/i.test(m[2]))
    .map((m) => text(m[3]).replace(/[↗→←↑↓›»]/g, '').trim().toLowerCase()).filter(Boolean);
  const imKopf = new Set(knoepfe(kopf));
  const alle = knoepfe(html);
  const zahl = {};
  alle.forEach((t) => { zahl[t] = (zahl[t] || 0) + 1; });
  const cta = [...imKopf].filter((t) => zahl[t] >= 3).sort((a, b) => zahl[b] - zahl[a])[0];
  info.cta = cta ? `${cta} (${zahl[cta]}x)` : null;
  if (!cta) f.push('kein Primär CTA mit gleichem Text in der Kopfzeile und mindestens dreimal auf der Seite');

  const h1pos = html.search(/<h1[\s>]/i);
  const davor = h1pos > -1 ? html.slice(Math.max(0, h1pos - 2500), h1pos) : '';
  const kommentare = [...davor.matchAll(/<!--([\s\S]*?)-->/g)].map((m) => m[1]);
  if (!kommentare.some((k) => /held|formel|zielgruppe/i.test(k))) w.push('Heldformel nicht als Kommentar vor der h1');
  if (!/application\/ld\+json/.test(html)) w.push('kein JSON-LD');
  return { f, w, info };
}

const ergebnis = [];
for (const n of ordner) {
  const dir = join(wurzel, n);
  const seiten = readdirSync(dir).filter((d) => /^(index|v\d)\.html$/.test(d)).sort();
  for (const s of seiten) {
    const r = seite(readFileSync(join(dir, s), 'utf8'));
    ergebnis.push({ vorlage: `${n}/${s}`, ...r });
  }
  const bd = join(dir, 'bilder');
  if (existsSync(bd)) {
    for (const b of readdirSync(bd)) {
      const g = statSync(join(bd, b)).size;
      if (/\.(webp|jpe?g|png|avif)$/i.test(b) && g > 200 * 1024) ergebnis.push({ vorlage: `${n}/bilder/${b}`, f: [`${Math.round(g / 1024)} KB (höchstens 200)`], w: [], info: {} });
    }
  }
}
const fehler = ergebnis.filter((e) => e.f.length);
if (json) { console.log(JSON.stringify(ergebnis, null, 1)); process.exit(fehler.length ? 1 : 0); }
for (const e of ergebnis) {
  if (!e.f.length && !e.w.length) continue;
  console.log(`${e.f.length ? 'FEHLER ' : 'Warnung'} ${e.vorlage}`);
  e.f.forEach((x) => console.log(`   Fehler: ${x}`));
  e.w.forEach((x) => console.log(`   Warnung: ${x}`));
}
const seitenAnzahl = ergebnis.filter((e) => /\.html$/.test(e.vorlage)).length;
console.log(`\n${seitenAnzahl} Seiten geprüft, ${fehler.length} mit Fehler, ${ergebnis.filter((e) => e.w.length).length} mit Warnung.`);
process.exit(fehler.length ? 1 : 0);
