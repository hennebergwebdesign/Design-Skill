#!/usr/bin/env node
/*
  bibliothek-bilder.mjs — erzeugt die Entwurfsbilder der Template-Bibliothek als SVG

  WARUM: Die Vorlagen sollen wie fertige Seiten wirken, enthielten aber nur Farbverläufe als Bildflächen.
  Echte Fotos gehören nicht ins Repository (Rechte, keine Quelle). Diese Datei zeichnet stattdessen ruhige,
  eigene Motive (Landschaft, Stadt, Fassade, Dach, Innenraum, Bühne, Arbeitsplatz, Feld, Welle, Oberfläche,
  Porträts) in sechs Farbwelten. Alles ist Entwurf: beim Kunden werden die Dateien durch Fotos ersetzt.
  Ohne Zufall (feste Startwerte), also bei jedem Lauf identisch.
  Aufruf: node scripts/bibliothek-bilder.mjs
*/
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ziel = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills', 'webdesign-conversion', 'assets', 'vorlagen', 'bibliothek', '_basis', 'bilder');
await mkdir(ziel, { recursive: true });

/* feste Zufallsfolge */
function zufall(start) { let s = start >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

/* Farbwelten: himmel oben, himmel unten, fern, mitte, nah, licht, akzent */
const farben = {
  warm:  { o: '#f2d3b3', u: '#fbeee0', f: '#d9a98a', m: '#b3714f', n: '#6e3f2c', l: '#fff4de', a: '#e0824a' },
  kuehl: { o: '#a9c4d8', u: '#e4eef5', f: '#7f9fb8', m: '#4d6f8c', n: '#223b52', l: '#ffffff', a: '#e8a54b' },
  gruen: { o: '#bcd3c0', u: '#eef4ea', f: '#8fb09a', m: '#4f7b62', n: '#1f3f31', l: '#fffbe8', a: '#d9b44a' },
  nacht: { o: '#0f1f2e', u: '#2c4a5e', f: '#1b3446', m: '#10242f', n: '#07131a', l: '#ffd58a', a: '#f0b14a' },
  dunkel:{ o: '#1b1d1f', u: '#3a3f42', f: '#2a2e31', m: '#1d2023', n: '#101213', l: '#e9edf0', a: '#c9ff5b' },
  hell:  { o: '#e9e6df', u: '#faf9f6', f: '#cfcac0', m: '#a9a398', n: '#6c675e', l: '#ffffff', a: '#2d6a55' },
};

const kopf = (id, p, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><defs>
<linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.o}"/><stop offset="1" stop-color="${p.u}"/></linearGradient>
<radialGradient id="${id}s" cx="0.7" cy="0.35" r="0.6"><stop offset="0" stop-color="${p.l}" stop-opacity=".95"/><stop offset="1" stop-color="${p.l}" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>${extra}</defs>
<rect width="1600" height="1000" fill="url(#${id}h)"/><rect width="1600" height="1000" fill="url(#${id}s)"/>`;
const ende = (id) => `<rect width="1600" height="1000" fill="url(#${id}t)"/></svg>`;

const motive = {
  huegel(p) {
    const z = zufall(11); let s = kopf('a', p);
    s += `<circle cx="1120" cy="330" r="90" fill="${p.l}" opacity=".9"/>`;
    [[560, p.f, 90], [650, p.m, 120], [760, p.n, 150]].forEach(([y, c, h], i) => {
      let d = `M0 1000 L0 ${y}`;
      for (let x = 0; x <= 1600; x += 160) d += ` Q ${x + 80} ${y - h * (0.4 + z() * 0.9)} ${x + 160} ${y + (z() - .5) * 60}`;
      s += `<path d="${d} L1600 1000 Z" fill="${c}"/>`;
    });
    return s + ende('a');
  },
  stadt(p) {
    const z = zufall(23); let s = kopf('b', p);
    for (let layer = 0; layer < 3; layer++) {
      const c = [p.f, p.m, p.n][layer], hoehe = [380, 480, 600][layer];
      for (let x = -40; x < 1640; x += 70 + z() * 60) {
        const w = 70 + z() * 80, h = 140 + z() * (hoehe - 100), y = 1000 - h - layer * 40;
        s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 60).toFixed(0)}" fill="${c}"/>`;
        if (layer === 2) for (let wy = y + 24; wy < 960; wy += 36) for (let wx = x + 12; wx < x + w - 14; wx += 26) if (z() > 0.62) s += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="12" height="18" fill="${p.l}" opacity=".85"/>`;
      }
    }
    return s + ende('b');
  },
  fassade(p) {
    const z = zufall(37); let s = kopf('c', p);
    s += `<rect x="0" y="0" width="1600" height="1000" fill="${p.m}"/>`;
    for (let x = 0; x < 1600; x += 200) {
      s += `<rect x="${x}" y="0" width="12" height="1000" fill="${p.n}" opacity=".7"/>`;
      for (let y = 40; y < 1000; y += 180) {
        const hell = z() > 0.45;
        s += `<rect x="${x + 36}" y="${y}" width="128" height="140" fill="${hell ? p.l : p.f}" opacity="${hell ? 0.9 : 0.55}"/><rect x="${x + 36}" y="${y + 68}" width="128" height="6" fill="${p.n}" opacity=".6"/>`;
      }
    }
    s += `<polygon points="0,0 1600,0 1600,380 0,820" fill="${p.l}" opacity=".12"/>`;
    return s + ende('c');
  },
  dach(p) {
    let s = kopf('d', p);
    s += `<circle cx="1230" cy="260" r="110" fill="${p.l}" opacity=".9"/>`;
    s += `<path d="M0 760 Q 400 700 800 740 T 1600 720 L1600 1000 L0 1000Z" fill="${p.m}"/>`;
    s += `<polygon points="260,610 760,300 1260,610" fill="${p.n}"/><rect x="330" y="610" width="860" height="330" fill="${p.f}"/>`;
    s += `<polygon points="260,610 760,300 1260,610 1180,610 760,370 340,610" fill="${p.a}"/>`;
    for (let i = 0; i < 3; i++) s += `<rect x="${430 + i * 260}" y="700" width="130" height="150" fill="${p.l}" opacity=".9"/><rect x="${430 + i * 260}" y="770" width="130" height="5" fill="${p.n}"/>`;
    s += `<rect x="950" y="360" width="46" height="120" fill="${p.n}"/>`;
    return s + ende('d');
  },
  innen(p) {
    const z = zufall(53); let s = kopf('e', p);
    s += `<rect x="0" y="0" width="1600" height="1000" fill="${p.f}"/><rect x="0" y="740" width="1600" height="260" fill="${p.m}"/>`;
    s += `<rect x="900" y="110" width="520" height="560" fill="${p.o}"/><rect x="900" y="110" width="520" height="560" fill="url(#es)"/>`;
    s += `<rect x="1150" y="110" width="12" height="560" fill="${p.n}"/><rect x="900" y="380" width="520" height="12" fill="${p.n}"/>`;
    s += `<polygon points="900,670 1420,670 1160,1000 560,1000" fill="${p.l}" opacity=".35"/>`;
    s += `<rect x="150" y="520" width="520" height="40" fill="${p.n}"/><rect x="170" y="560" width="14" height="190" fill="${p.n}"/><rect x="636" y="560" width="14" height="190" fill="${p.n}"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${190 + i * 76}" y="${420 - (z() * 70) | 0}" width="${48}" height="${100 + (z() * 70) | 0}" fill="${i % 2 ? p.a : p.l}" opacity=".85"/>`;
    s += `<rect x="120" y="170" width="420" height="14" fill="${p.n}"/><circle cx="260" cy="130" r="30" fill="${p.a}"/><circle cx="360" cy="140" r="24" fill="${p.l}"/>`;
    s += `<path d="M1450 1000 Q 1380 800 1440 700 Q 1500 800 1450 1000Z" fill="${p.m}"/><path d="M1500 1000 Q 1560 820 1510 740 Q 1450 840 1500 1000Z" fill="${p.n}"/>`;
    return s + ende('e');
  },
  buehne(p) {
    const z = zufall(71); let s = kopf('f', p);
    s += `<rect width="1600" height="1000" fill="${p.n}"/>`;
    [[300, 0.35], [650, 0.5], [1000, 0.4], [1300, 0.3]].forEach(([x, o]) => s += `<polygon points="${x - 14},0 ${x + 14},0 ${x + 330},800 ${x - 330},800" fill="${p.l}" opacity="${o * 0.45}"/>`);
    s += `<rect x="0" y="720" width="1600" height="30" fill="${p.a}" opacity=".8"/>`;
    for (let x = 0; x < 1700; x += 62) { const r = 38 + z() * 14, y = 900 + z() * 40; s += `<circle cx="${x}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${p.m}"/><rect x="${x - r}" y="${y.toFixed(0)}" width="${(2 * r).toFixed(0)}" height="200" fill="${p.m}"/>`; }
    s += `<rect x="560" y="520" width="480" height="210" fill="${p.m}"/><rect x="590" y="545" width="420" height="140" fill="${p.l}" opacity=".18"/>`;
    return s + ende('f');
  },
  arbeitsplatz(p) {
    let s = kopf('g', p);
    s += `<rect x="0" y="0" width="1600" height="1000" fill="${p.f}"/><rect x="0" y="680" width="1600" height="320" fill="${p.m}"/>`;
    s += `<rect x="470" y="250" width="660" height="410" rx="22" fill="${p.n}"/><rect x="495" y="275" width="610" height="360" rx="8" fill="${p.o}"/>`;
    s += `<rect x="525" y="310" width="250" height="26" fill="${p.n}" opacity=".75"/><rect x="525" y="360" width="400" height="14" fill="${p.n}" opacity=".35"/><rect x="525" y="390" width="340" height="14" fill="${p.n}" opacity=".35"/><rect x="525" y="450" width="140" height="44" rx="22" fill="${p.a}"/>`;
    s += `<rect x="830" y="320" width="240" height="250" rx="12" fill="${p.l}" opacity=".8"/>`;
    s += `<polygon points="400,660 1200,660 1260,720 340,720" fill="${p.n}"/>`;
    s += `<rect x="1330" y="520" width="14" height="200" fill="${p.n}"/><path d="M1337 520 L1230 400 L1190 440 L1330 540Z" fill="${p.n}"/><ellipse cx="1195" cy="418" rx="55" ry="26" fill="${p.l}"/>`;
    s += `<rect x="140" y="560" width="120" height="130" rx="10" fill="${p.n}"/><rect x="152" y="572" width="96" height="40" fill="${p.a}"/>`;
    return s + ende('g');
  },
  feld(p) {
    let s = kopf('h', p);
    s += `<circle cx="800" cy="360" r="140" fill="${p.l}" opacity=".85"/>`;
    s += `<rect x="0" y="480" width="1600" height="520" fill="${p.m}"/>`;
    for (let i = 0; i < 16; i++) { const t = i / 16, y = 480 + 520 * t * t, h = 24 + 60 * t; s += `<rect x="0" y="${y.toFixed(0)}" width="1600" height="${h.toFixed(0)}" fill="${i % 2 ? p.n : p.f}" opacity="${(0.35 + 0.5 * t).toFixed(2)}"/>`; }
    s += `<path d="M0 480 Q 400 430 800 470 T 1600 450 L1600 520 L0 520Z" fill="${p.f}"/>`;
    return s + ende('h');
  },
  welle(p) {
    let s = kopf('i', p);
    for (let i = 0; i < 7; i++) {
      const y = 240 + i * 110, c = [p.f, p.m, p.a, p.n, p.m, p.f, p.n][i];
      s += `<path d="M0 ${y} C 300 ${y - 120} 500 ${y + 120} 800 ${y} S 1300 ${y - 110} 1600 ${y + 20} L1600 1000 L0 1000Z" fill="${c}" opacity="${(0.55 + i * 0.07).toFixed(2)}"/>`;
    }
    return s + ende('i');
  },
  oberflaeche(p) {
    let s = kopf('j', p);
    s += `<rect x="220" y="120" width="1160" height="760" rx="36" fill="${p.l}" opacity=".96"/><rect x="220" y="120" width="1160" height="76" rx="36" fill="${p.n}"/><rect x="220" y="160" width="1160" height="36" fill="${p.n}"/>`;
    [0, 1, 2].forEach((i) => s += `<circle cx="${270 + i * 34}" cy="158" r="9" fill="${[p.a, p.f, p.o][i]}"/>`);
    s += `<rect x="260" y="240" width="250" height="580" rx="18" fill="${p.o}"/><rect x="290" y="276" width="190" height="20" rx="10" fill="${p.n}" opacity=".7"/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="290" y="${330 + i * 56}" width="${150 + (i % 3) * 20}" height="14" rx="7" fill="${p.n}" opacity=".3"/>`;
    [0, 1, 2].forEach((i) => s += `<rect x="${560 + i * 270}" y="240" width="240" height="150" rx="18" fill="${[p.a, p.f, p.m][i]}" opacity=".9"/>`);
    s += `<polyline points="560,740 700,660 820,700 960,590 1100,640 1250,520 1340,560" fill="none" stroke="${p.a}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<rect x="560" y="440" width="780" height="14" rx="7" fill="${p.n}" opacity=".25"/><rect x="560" y="470" width="560" height="14" rx="7" fill="${p.n}" opacity=".18"/>`;
    return s + ende('j');
  },
};

for (const [mname, fn] of Object.entries(motive)) for (const [pname, p] of Object.entries(farben)) await writeFile(join(ziel, `${mname}-${pname}.svg`), fn(p));

/* Porträts: quadratisch, Kopf und Schultern */
const haut = ['#f0c9a8', '#d99b72', '#a96d4a', '#7a4a33', '#f3d5bd', '#c58a62'];
const haar = ['#2a1d16', '#6b4a2f', '#cfa56a', '#171717', '#8a8a8a', '#4a2a1a'];
const grund = ['#cfdad3', '#e9d9c3', '#c9d4e0', '#dcd3e0', '#d9e3c6', '#e8cfc6'];
const hemd = ['#1f3f31', '#2c4a5e', '#6e3f2c', '#222', '#4d6f8c', '#b3714f'];
for (let i = 0; i < 6; i++) {
  const lang = i % 2 === 1;
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="${grund[i]}"/>
<path d="M40 400 Q 60 290 200 280 Q 340 290 360 400Z" fill="${hemd[i]}"/><rect x="175" y="240" width="50" height="60" rx="18" fill="${haut[i]}"/>
${lang ? `<path d="M120 190 Q 110 90 200 85 Q 295 90 282 190 L292 300 Q 200 270 108 300Z" fill="${haar[i]}"/>` : ''}
<ellipse cx="200" cy="185" rx="70" ry="82" fill="${haut[i]}"/>
<path d="M126 170 Q 130 96 200 94 Q 272 96 274 170 Q 250 126 200 128 Q 150 126 126 170Z" fill="${haar[i]}"/>
<circle cx="174" cy="190" r="6" fill="#1b1b1b"/><circle cx="226" cy="190" r="6" fill="#1b1b1b"/><path d="M180 228 Q 200 244 220 228" stroke="#7a3b2b" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
  await writeFile(join(ziel, `person-${i + 1}.svg`), s);
}
console.log('Bilder geschrieben in', ziel);
