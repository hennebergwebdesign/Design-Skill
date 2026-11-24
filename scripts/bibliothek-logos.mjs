#!/usr/bin/env node
/*
  bibliothek-logos.mjs — erzeugt die Beispiellogos der Template-Bibliothek (SVG) und _basis/logos.css

  WARUM: Logoleisten standen bisher als graue Kästen da. Beispiellogos mit erfundenen Namen und eigenen Zeichen
  lassen die Seiten fertig wirken. Die Zeichen sind eigen gezeichnet, die Namen sind frei erfunden (keine echten
  Firmen). Die Logos sind einfarbig und werden per CSS-Maske in der Textfarbe gesetzt (currentColor), damit sie zur
  Marke passen. Beim Kunden werden sie durch dessen echte Kundenlogos ersetzt.
  Aufruf: node scripts/bibliothek-logos.mjs
*/
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const basis = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills', 'webdesign-conversion', 'assets', 'vorlagen', 'bibliothek', '_basis');
const ziel = join(basis, 'logos'); await mkdir(ziel, { recursive: true });
// Zeichen: 40x40 Feld
const zeichen = {
  kreis: ['<circle cx="20" cy="20" r="16"/>', '<circle cx="20" cy="20" r="6"/>'],
  dreieck: ['<path d="M20 4 37 34H3z"/>', '<path d="M20 15 27 28H13z"/>'],
  sechseck: ['<path d="M20 3 35 11.5v17L20 37 5 28.5v-17z"/>', '<path d="M13 20h14" stroke-width="3"/>'],
  welle: ['<path d="M3 20Q11 8 20 18T37 16V35H3z"/>', '<path d="M3 29Q11 21 20 28T37 26" fill="none" stroke-width="2.5"/>'],
  quadrat: ['<rect x="4" y="4" width="32" height="32" rx="7"/>', '<path d="M14 11v18M14 21l12-10M14 21l12 10" stroke-width="3.5" fill="none"/>'],
  blatt: ['<path d="M6 34C6 16 16 6 34 6c0 18-10 28-28 28z"/>', '<path d="M8 32 24 16" stroke-width="2.5" fill="none"/>'],
  stern: ['<path d="m20 3 4.8 11.4L37 15.5l-9.3 8.1 2.9 12L20 29.7 9.4 35.6l2.9-12L3 15.5l12.2-1.1z"/>', ''],
  balken: ['<rect x="4" y="22" width="7" height="14"/><rect x="16.5" y="12" width="7" height="24"/><rect x="29" y="4" width="7" height="32"/>', ''],
};
const namen = [
  ['nordwerk', 'Nordwerk', 'kreis'], ['lichtbau', 'Lichtbau', 'dreieck'], ['talgrund', 'Talgrund', 'sechseck'], ['fjordstein', 'Fjordstein', 'welle'],
  ['kronwerk', 'Kronwerk', 'quadrat'], ['sonnenfeld', 'Sonnenfeld', 'blatt'], ['mareal', 'Mareal', 'stern'], ['quellwerk', 'Quellwerk', 'balken'],
];
let css = '/* logos.css: Beispiellogos (einfarbig, per Maske in currentColor). Klasse .beispiellogo plus ein Logo, z.B. <span class="beispiellogo logo-nordwerk" role="img" aria-label="Nordwerk (Beispiel)"></span>.\n   Beim Kunden durch echte Logos ersetzen. Erzeugt von scripts/bibliothek-logos.mjs, nicht von Hand ändern. */\n.beispiellogo{display:inline-block;height:var(--logo-h,1.75rem);aspect-ratio:var(--b);background:currentColor;-webkit-mask:var(--logo) center/contain no-repeat;mask:var(--logo) center/contain no-repeat;flex:none}\n';
for (const [id, name, z] of namen) {
  const breite = Math.round(52 + name.length * 15.5);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${breite} 40"><defs><mask id="m"><rect width="40" height="40" fill="#fff"/><g fill="#000" stroke="#000">${zeichen[z][1]}</g></mask></defs><g fill="#000" mask="url(#m)">${zeichen[z][0]}</g><text x="48" y="28" font-family="Hanken Grotesk,Arial,Helvetica,sans-serif" font-size="24" font-weight="700" letter-spacing="-.5" fill="#000">${name}</text></svg>\n`;
  await writeFile(join(ziel, `${id}.svg`), svg);
  css += `.logo-${id}{--logo:url(logos/${id}.svg);--b:${breite}/40}\n`;
}
await writeFile(join(basis, 'logos.css'), css);
console.log('Logos:', namen.length);
