/*
  abruf.mjs — die Abrufschicht. Holt eine fremde Seite, über vier Stufen mit Rückfall.

  WARUM ES DIESE DATEI GIBT
  Bis Version 3.4.0 stand die Abruflogik zweimal im Repository, leicht verschieden, einmal in
  relaunch-inventory.mjs und einmal in design-scan.mjs. Beide sprachen die Firecrawl-Cloud fest
  an, obwohl firecrawl-recherche.md eine selbst gehostete Instanz zusagt. Diese Datei ist die
  eine Stelle, die abruft.

  Der Rest des Systems kennt nur das Ergebnisobjekt, nie Firecrawl. Ein Austausch des Crawlers
  ist damit eine neue Stufe in dieser Datei, kein Eingriff in Analyse, Vergleich oder
  Musterbibliothek.

  DIE VIER STUFEN, in dieser Reihenfolge

    1 Firecrawl selbst gehostet   FIRECRAWL_BASE_URL gesetzt   alles, kostenlos, bevorzugt
    2 Firecrawl Cloud             FIRECRAWL_API_KEY gesetzt    alles, Kontingent
    3 Playwright lokal            im Projekt installiert       JS-Seiten, Breakpoints, Bilder
    4 Direktabruf fetch()         immer                        nur serverseitig gerendertes HTML

  Selbst gehostet steht vor der Cloud, weil ein kostenpflichtiger Dienst hier nie die
  Voreinstellung ist. Scheitert eine Stufe, wird der Grund in `grenzen` vermerkt und die
  nächste versucht. Der Abruf bricht erst ab, wenn keine Stufe Inhalt liefert.

  WAS NIE PASSIERT
  Es wird nichts erfunden. Konnte eine Eigenschaft nicht erfasst werden, steht sie in
  `grenzen`, und die nachgelagerte Analyse führt sie als `unbekannt`. Siehe die Regel gegen
  erfundene Belege in der Repo-CLAUDE.md.

  ERGEBNISOBJEKT
    {
      adresse, status, html, markdown,
      screenshot,            Base64 oder Adresse, je nach Stufe, sonst ''
      breakpoints: [ { breite, hoehe, screenshot, html } ],
      quelle,                welche Stufe geliefert hat
      grenzen: [ … ]         was NICHT erfasst werden konnte, im Klartext
    }
*/

import { setTimeout as warte } from 'node:timers/promises';

export const KENNUNG = 'design-skill-abruf (Referenzrecherche, https://thatsit.marketing)';

export class AbrufFehler extends Error {
  constructor(art, nachricht) {
    super(nachricht);
    this.name = 'AbrufFehler';
    this.art = art; // adresse | robots | netz | status | leer
  }
}

export function adresseNormalisieren(eingabe) {
  try {
    return new URL(String(eingabe).startsWith('http') ? eingabe : `https://${eingabe}`);
  } catch {
    throw new AbrufFehler('adresse', `Keine gültige Adresse: ${eingabe}`);
  }
}

// ------------------------------------------------------------------- robots

/**
 * Sehr kleiner robots.txt-Leser. Kennt User-agent, Disallow, Allow und die Regel, dass die
 * längste passende Regel gewinnt und Allow bei gleicher Länge vorgeht.
 * Bewusst ohne Crawl-delay und ohne Wildcards außer dem abschließenden *, weil mehr hier
 * nicht gebraucht wird und ein halbgarer Parser schlimmer ist als ein kleiner.
 */
export function robotsLesen(text, kennung = KENNUNG) {
  const gruppen = [];
  let aktuell = null;
  for (const rohzeile of text.split(/\r?\n/)) {
    const zeile = rohzeile.replace(/#.*$/, '').trim();
    if (!zeile) continue;
    const [feldRoh, ...rest] = zeile.split(':');
    const feld = feldRoh.trim().toLowerCase();
    const wert = rest.join(':').trim();
    if (feld === 'user-agent') {
      if (!aktuell || aktuell.regeln.length) {
        aktuell = { agenten: [], regeln: [] };
        gruppen.push(aktuell);
      }
      aktuell.agenten.push(wert.toLowerCase());
    } else if ((feld === 'disallow' || feld === 'allow') && aktuell) {
      aktuell.regeln.push({ art: feld, pfad: wert });
    }
  }
  const name = kennung.split(' ')[0].toLowerCase();
  const eigene = gruppen.find((g) => g.agenten.some((a) => a !== '*' && name.includes(a)));
  const stern = gruppen.find((g) => g.agenten.includes('*'));
  return (eigene ?? stern ?? { regeln: [] }).regeln;
}

export function robotsErlaubt(regeln, pfad) {
  let treffer = null;
  for (const regel of regeln) {
    if (regel.pfad === '') continue; // leeres Disallow erlaubt alles
    const muster = regel.pfad.endsWith('*') ? regel.pfad.slice(0, -1) : regel.pfad;
    if (!pfad.startsWith(muster)) continue;
    if (!treffer || muster.length > treffer.laenge || (muster.length === treffer.laenge && regel.art === 'allow')) {
      treffer = { art: regel.art, laenge: muster.length };
    }
  }
  return !treffer || treffer.art === 'allow';
}

/**
 * Prüft robots.txt vor dem Abruf. Nach RFC 9309 gilt ein nicht erreichbares robots.txt mit
 * Serverfehler als vollständiges Verbot. Das ist streng, aber diese Agentur verkauft
 * Rechtssicherheit, und ein verweigerter Abruf ist ein Befund, kein Schaden.
 */
export async function robotsPruefen(ziel, kennung = KENNUNG, zeitlimit = 10000) {
  const adresse = `${ziel.origin}/robots.txt`;
  let antwort;
  try {
    // Mit Zeitlimit, sonst haengt der ganze Abruf an einer Seite, die robots.txt offen laesst
    // statt zu antworten. Ohne diese Zeile blockiert ein einziger stiller Server den Lauf.
    antwort = await fetch(adresse, {
      headers: { 'user-agent': kennung },
      redirect: 'follow',
      signal: AbortSignal.timeout(zeitlimit),
    });
  } catch (f) {
    return { erlaubt: true, hinweis: `robots.txt nicht erreichbar (${f.message}), keine Regeln anwendbar` };
  }
  if (antwort.status >= 500) {
    return { erlaubt: false, hinweis: `robots.txt antwortet mit ${antwort.status}, das gilt als Verbot (RFC 9309)` };
  }
  if (antwort.status >= 400) {
    return { erlaubt: true, hinweis: '' }; // kein robots.txt vorhanden, alles erlaubt
  }
  const regeln = robotsLesen(await antwort.text(), kennung);
  const erlaubt = robotsErlaubt(regeln, ziel.pathname || '/');
  return {
    erlaubt,
    hinweis: erlaubt ? '' : `robots.txt der Seite verbietet ${ziel.pathname || '/'}`,
  };
}

// ------------------------------------------------------------------- Stufen

function firecrawlBasis() {
  const eigen = process.env.FIRECRAWL_BASE_URL;
  if (eigen) return { basis: eigen.replace(/\/$/, ''), schluessel: process.env.FIRECRAWL_API_KEY ?? '', name: 'Firecrawl selbst gehostet' };
  if (process.env.FIRECRAWL_API_KEY) return { basis: 'https://api.firecrawl.dev', schluessel: process.env.FIRECRAWL_API_KEY, name: 'Firecrawl Cloud' };
  return null;
}

async function ueberFirecrawl(ziel, optionen, konfiguration) {
  const formate = ['html', 'markdown'];
  if (optionen.screenshot) formate.push('screenshot');
  const kopf = { 'content-type': 'application/json' };
  if (konfiguration.schluessel) kopf.authorization = `Bearer ${konfiguration.schluessel}`;

  const antwort = await fetch(`${konfiguration.basis}/v1/scrape`, {
    method: 'POST',
    headers: kopf,
    body: JSON.stringify({ url: ziel.toString(), formats: formate, onlyMainContent: false }),
    signal: AbortSignal.timeout(optionen.zeitlimit),
  });
  if (!antwort.ok) throw new AbrufFehler('status', `${konfiguration.name} antwortet mit ${antwort.status}`);
  const daten = await antwort.json();
  const html = daten?.data?.html ?? '';
  if (!html) throw new AbrufFehler('leer', `${konfiguration.name} liefert kein HTML`);
  return {
    status: 200,
    html,
    markdown: daten?.data?.markdown ?? '',
    screenshot: daten?.data?.screenshot ?? '',
    quelle: konfiguration.name,
  };
}

async function ueberPlaywright(ziel, optionen) {
  let playwright;
  try {
    playwright = await import('playwright');
  } catch {
    throw new AbrufFehler('netz', 'Playwright ist nicht installiert');
  }
  const browser = await playwright.chromium.launch();
  try {
    const kontext = await browser.newContext({ userAgent: optionen.kennung });
    const seite = await kontext.newPage();
    const antwort = await seite.goto(ziel.toString(), { waitUntil: 'networkidle', timeout: optionen.zeitlimit });
    const html = await seite.content();
    const breakpoints = [];
    for (const breite of optionen.breakpoints ?? []) {
      await seite.setViewportSize({ width: breite, height: optionen.hoehe ?? 900 });
      await seite.waitForTimeout(250);
      breakpoints.push({
        breite,
        hoehe: optionen.hoehe ?? 900,
        html: await seite.content(),
        screenshot: optionen.screenshot ? (await seite.screenshot({ fullPage: false })).toString('base64') : '',
      });
    }
    return {
      status: antwort?.status() ?? 200,
      html,
      markdown: '',
      screenshot: optionen.screenshot ? (await seite.screenshot({ fullPage: true })).toString('base64') : '',
      breakpoints,
      quelle: 'Playwright lokal',
    };
  } finally {
    await browser.close();
  }
}

async function ueberDirektabruf(ziel, optionen) {
  const antwort = await fetch(ziel.toString(), {
    headers: { 'user-agent': optionen.kennung },
    redirect: 'follow',
    signal: AbortSignal.timeout(optionen.zeitlimit),
  });
  const typ = antwort.headers.get('content-type') ?? '';
  // statusDurchreichen: für eine Bestandsaufnahme ist ein 404 ein Befund und kein Fehlschlag.
  // relaunch-inventory.mjs braucht deshalb den Statuscode, nicht eine Ausnahme.
  if (optionen.statusDurchreichen && (antwort.status >= 400 || !typ.includes('html'))) {
    return { status: antwort.status, html: '', markdown: '', screenshot: '', quelle: 'Direktabruf' };
  }
  if (antwort.status >= 400) throw new AbrufFehler('status', `Seite antwortet mit ${antwort.status}`);
  if (!typ.includes('html')) throw new AbrufFehler('leer', `Antwort ist kein HTML, sondern ${typ || 'ohne Typangabe'}`);
  const html = await antwort.text();
  if (!html.trim()) throw new AbrufFehler('leer', 'Antwort ist leer');
  return { status: antwort.status, html, markdown: '', screenshot: '', quelle: 'Direktabruf' };
}

/** Welche Stufen unter den aktuellen Bedingungen überhaupt in Frage kommen, in Reihenfolge. */
export function stufenfolge(optionen = {}) {
  const stufen = [];
  const fc = firecrawlBasis();
  if (fc) stufen.push({ name: fc.name, lauf: (z, o) => ueberFirecrawl(z, o, fc) });
  if (optionen.breakpoints?.length || optionen.screenshot) {
    stufen.push({ name: 'Playwright lokal', lauf: ueberPlaywright });
  }
  stufen.push({ name: 'Direktabruf', lauf: ueberDirektabruf });
  return stufen;
}

// -------------------------------------------------------------------- Abruf

/**
 * Ruft eine Seite ab. Wirft nur, wenn keine Stufe Inhalt liefert oder robots.txt es verbietet.
 * Alles andere landet in `grenzen` und wird von der Analyse als `unbekannt` gewertet.
 */
export async function abrufen(eingabe, optionen = {}) {
  const o = {
    screenshot: false,
    breakpoints: [],
    robots: true,
    zeitlimit: 20000,
    wiederholen: 1,
    pause: 1500,
    statusDurchreichen: false,
    kennung: KENNUNG,
    ...optionen,
  };
  const ziel = adresseNormalisieren(eingabe);
  const grenzen = [];

  if (o.robots) {
    const robots = await robotsPruefen(ziel, o.kennung, Math.min(o.zeitlimit, 10000));
    if (!robots.erlaubt) throw new AbrufFehler('robots', robots.hinweis);
    if (robots.hinweis) grenzen.push(robots.hinweis);
  } else {
    grenzen.push('robots.txt wurde auf ausdrücklichen Wunsch nicht geprüft');
  }

  const stufen = stufenfolge(o);
  let letzterFehler = null;

  for (const stufe of stufen) {
    for (let versuch = 0; versuch <= o.wiederholen; versuch += 1) {
      try {
        const ergebnis = await stufe.lauf(ziel, o);
        if (o.screenshot && !ergebnis.screenshot) grenzen.push(`kein Screenshot über ${ergebnis.quelle}`);
        if (o.breakpoints.length && !ergebnis.breakpoints?.length) {
          grenzen.push(
            `keine Breakpoint-Erfassung über ${ergebnis.quelle}, responsives Verhalten bleibt unbekannt`
          );
        }
        return {
          adresse: ziel.toString(),
          markdown: '',
          screenshot: '',
          breakpoints: [],
          ...ergebnis,
          grenzen,
        };
      } catch (f) {
        letzterFehler = f;
        const wiederholbar = f.art === 'netz' || /429|timeout|abort/i.test(f.message);
        if (versuch < o.wiederholen && wiederholbar && f.message !== 'Playwright ist nicht installiert') {
          await warte(o.pause);
          continue;
        }
        grenzen.push(`${stufe.name} nicht nutzbar: ${f.message}`);
        break;
      }
    }
  }

  const fehler = new AbrufFehler(
    letzterFehler?.art ?? 'netz',
    `Keine Abrufstufe lieferte Inhalt für ${ziel.toString()}. ${grenzen.join(' | ')}`
  );
  fehler.grenzen = grenzen;
  throw fehler;
}
