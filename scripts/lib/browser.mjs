/*
  browser.mjs — findet Playwright und startet Chromium, für alle Skripte, die einen echten Browser steuern.

  WARUM ES DIESE DATEI GIBT
  `pruefe-breakpoints.mjs` und `brand-extraktion.mjs` brauchen beide einen Browser, und beide
  scheitern an denselben zwei Stellen: Playwright liegt nicht neben dem Skript, und die
  installierte Playwright-Version erwartet einen anderen Chromium-Build als den vorhandenen.
  Die Lösung dafür stand bis Version 4.1.0 nur in `pruefe-breakpoints.mjs`. Ein zweites
  Skript hätte sie kopiert, und zwei leicht verschiedene Kopien sind genau das, was
  `lib/abruf.mjs` für den Abruf beseitigt hat.

  Diese Datei hat keine Abhängigkeit. Playwright selbst wird nie Teil dieses Repositorys und
  nie Teil des `package.json` eines Kundenprojekts nur für ein Agenturwerkzeug.
*/

import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const NAMEN = ['playwright', '@playwright/test', 'playwright-core'];

/*
  Playwright kann an drei Orten liegen: als Abhängigkeit des Projekts, als Abhängigkeit
  dieses Skripts oder global installiert. Node löst Importe relativ zur importierenden Datei
  auf, ein global installiertes Playwright findet es deshalb NICHT von selbst. Darum die drei
  Stufen.

  Über eine Datei-URL importiertes CJS liefert den internen Namensraum, nicht die benannten
  Exporte: chromium hängt dann an .default. Deshalb werden beide Wege geprüft.
*/
function mitChromium(modul) {
  if (modul?.chromium) return modul;
  if (modul?.default?.chromium) return modul.default;
  return null;
}

/** Liefert das Playwright-Modul oder null. */
export async function playwrightLaden() {
  for (const n of NAMEN) {
    try {
      const m = mitChromium(await import(n));
      if (m) return m;
    } catch {}
  }

  /* Aus dem Projektordner auflösen, von dem aus das Skript aufgerufen wurde. */
  const anfrage = createRequire(join(process.cwd(), 'package.json'));
  for (const n of NAMEN) {
    try {
      const m = mitChromium(await import(pathToFileURL(anfrage.resolve(n)).href));
      if (m) return m;
    } catch {}
  }

  /* Globale npm-Wurzel. */
  try {
    const wurzel = execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    for (const n of NAMEN) {
      for (const pfad of [join(wurzel, n, 'index.js'), join(wurzel, n)]) {
        try {
          const m = mitChromium(await import(pathToFileURL(pfad).href));
          if (m) return m;
        } catch {}
      }
    }
  } catch {}

  return null;
}

export const PLAYWRIGHT_FEHLT = [
  'Playwright nicht gefunden. Installieren mit: npm i -g playwright',
  'Oder im Projekt: npm i -D playwright',
  'Der Browser ist in vielen Umgebungen schon vorhanden; dann reicht PLAYWRIGHT_BROWSERS_PATH.',
].join('\n');

/** Vorhandene Chromium-Builds, neueste zuerst. Nur für den Rückfall in chromiumStarten. */
export function chromiumKandidaten(basis = process.env.PLAYWRIGHT_BROWSERS_PATH) {
  const kandidaten = [];
  if (basis && existsSync(basis)) {
    /* Neueste Builds zuerst: chromium-1243 vor chromium-1194. */
    const ordner = readdirSync(basis).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    for (const o of ordner) {
      if (!/^chromium/.test(o)) continue;
      kandidaten.push(
        join(basis, o, 'chrome-linux', 'chrome'),
        join(basis, o, 'chrome-linux', 'headless_shell'),
        join(basis, o, 'chrome-headless-shell-linux64', 'chrome-headless-shell'),
        join(basis, o, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
      );
    }
    kandidaten.push(join(basis, 'chromium', 'chrome-linux', 'chrome'));
  }
  kandidaten.push('/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome');
  return kandidaten.filter((k) => existsSync(k));
}

export class BrowserFehler extends Error {
  constructor(nachricht) {
    super(nachricht);
    this.name = 'BrowserFehler';
  }
}

/*
  Chromium starten. Zwei Stufen, weil die Playwright-Version eines Projekts oft einen anderen
  Browser-Build erwartet als den, der auf dem System liegt (typisch in CI-Images und Containern
  mit PLAYWRIGHT_BROWSERS_PATH). Dann scheitert launch() mit "Executable doesn't exist" und
  verlangt einen Download, der in einer abgeschotteten Umgebung nicht gehen muss. Stufe 2 sucht
  deshalb selbst nach einem vorhandenen Chromium und übergibt es als executablePath.
*/
export async function chromiumStarten(chromium, optionen = {}) {
  try {
    return await chromium.launch(optionen);
  } catch (e) {
    if (!/Executable doesn't exist|playwright install/i.test(e.message)) throw e;
    const [pfad] = chromiumKandidaten();
    if (!pfad) {
      throw new BrowserFehler(
        [
          'Chromium nicht gefunden. Die installierte Playwright-Version erwartet einen',
          'anderen Browser-Build als den vorhandenen. Abhilfe: npx playwright install chromium',
          'oder eine Playwright-Version installieren, die zum vorhandenen Build passt.',
        ].join('\n')
      );
    }
    console.log(`Hinweis: Playwright-Build passt nicht, benutze ${pfad}\n`);
    return await chromium.launch({ ...optionen, executablePath: pfad });
  }
}
