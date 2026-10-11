#!/usr/bin/env node
/*
  pruefe-sicherheit.mjs — prüft ein Kundenprojekt auf die Sicherheitsfehler, die sich ohne Ausführen finden lassen.

  WARUM ES DIESES SKRIPT GIBT
  Ein Schlüssel im Quelltext, ein Webhook ohne Signaturprüfung und ein Geheimnis in einer öffentlichen
  Umgebungsvariable sind keine Geschmacksfragen. Sie sind ein Satz im Code, und ein Agent übersieht sie
  in einer langen Sitzung, ein Skript nicht. Das Skript prüft nicht die Logik der Seite und ersetzt keinen
  Sicherheitsdurchgang (52-sicherheit-der-kundenseite.md, Abschnitt 8), es verhindert die Fehler, die am
  häufigsten und am teuersten sind. Die Zahlungsregeln stehen in 53-zahlungen-mit-stripe.md und werden nur
  geprüft, wenn das Projekt Stripe benutzt.

  WAS GEPRÜFT WIRD (src, functions, public, Konfiguration, dist; node_modules und .git nie)
  Fehler:
    1. Schlüssel im Quelltext oder in dist: Stripe (sk_live, rk_live, whsec), AWS, GitHub, Resend, Slack,
       Privatschlüssel. Auch in Entwürfen und Kommentaren, ein Schlüssel im Repository gilt als offengelegt.
    2. Geheimnis in einer öffentlichen Umgebungsvariablen (PUBLIC_, VITE_, NEXT_PUBLIC_ mit SECRET,
       PRIVATE, PASSWORD, TOKEN, API_KEY, WEBHOOK, SERVICE_ROLE im Namen). Erlaubt: PUBLISHABLE, SITE_KEY.
    3. .env, .dev.vars oder .env.production im Git-Index (nicht .example).
    4. eval(), new Function() und document.write() im Quelltext.
    5. Content-Security-Policy mit unsafe-eval oder Stern in script-src oder default-src.
    Bei Stripe zusätzlich:
    6. payment_method_types in einem Aufruf (außer card_present), siehe 53-…, Abschnitt 3.
    7. Ein Webhook-Handler für Zahlungsereignisse ohne constructEvent oder constructEventAsync.
    8. Ein Stripe-Schlüssel (sk_/rk_) in Code, der im Browser läuft (loadStripe, <script> in Seiten).
  Warnungen:
    9. innerHTML, set:html oder dangerouslySetInnerHTML mit einer Variablen (JSON.stringify bleibt erlaubt).
   10. Keine .gitignore für .env und .dev.vars (nur ohne Git).
   11. _headers fehlt oder ohne X-Content-Type-Options, Referrer-Policy oder Strict-Transport-Security.
   12. CSP mit unsafe-inline in script-src.
   13. Lockfile fehlt, oder eine Abhängigkeit mit latest oder * als Version.
   14. Quellkarten (.map) in dist.
   15. Eine Route mit Formulardaten ohne Turnstile (kein Missbrauchsschutz).
   16. Access-Control-Allow-Origin mit Stern.
    Bei Stripe zusätzlich:
   17. Zahlungsereignis checkout.session.completed behandelt, ohne payment_status zu lesen oder
       checkout.session.async_payment_succeeded zu behandeln (SEPA und Rechnung buchen später).
   18. Erfolgsseite, die selbst Mails verschickt oder freischaltet (Erfüllung gehört in den Webhook).
   19. Globaler Schlüssel (stripe.api_key =, Stripe.setApiKey), von den SDKs als veraltet geführt.
   20. Kein Text zur Zahlungspflicht (zahlungspflichtig) im Projekt (§ 312j BGB, Button-Lösung).
   21. Keine Seite zu AGB oder Widerruf, oder keine Erwähnung von Stripe in der Datenschutzerklärung.
    Hinweise (zählen nicht): automatic_tax ohne Registrierung wirkt nicht, siehe 53-…, Abschnitt 5.

  WAS NICHT GEPRÜFT WIRD
  Berechtigungen, Logik, Abhängigkeiten auf bekannte Lücken (dafür npm audit oder pnpm audit gegen das
  Lockfile, Netzzugriff nötig), das Verhalten im Betrieb. Ein ruhiger Lauf heißt nicht, dass die Seite
  sicher ist, sondern dass die häufigsten Fehler fehlen.

  AUFRUF
    node scripts/pruefe-sicherheit.mjs                 Standard: aktuelles Projekt
    node scripts/pruefe-sicherheit.mjs ../kunde --strict   Warnungen zählen wie Fehler

  EXIT
    0 = kein Fehler · 1 = Fehler gefunden · 2 = Aufrufproblem
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, basename, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const IGNORIERT = new Set(['node_modules', '.git', '.astro', '.wrangler', '.claude', '.designrecherche', '.brand-extraktion', '.design-scan', '.relaunch-inventory', '.scrollstrecke', '.vercel', '.next', 'coverage']);
const TEXT_ENDUNGEN = new Set(['.astro', '.ts', '.tsx', '.js', '.mjs', '.cjs', '.jsx', '.json', '.md', '.mdx', '.html', '.css', '.toml', '.yaml', '.yml', '.txt', '.svelte', '.vue', '.env', '.map', '']);
const MAX_GROESSE = 1_500_000;

/* Ordner, deren Inhalt Vorlage oder Dokumentation ist: dort stehen Platzhalter, keine Schlüssel. */
const VORLAGENORDNER = new Set(['vorlagen', 'templates']);

const SCHLUESSEL = [
  { regel: 'schluessel-stripe-live', re: /\b(?:sk|rk)_live_[A-Za-z0-9]{10,}/, name: 'Stripe Live-Schlüssel' },
  { regel: 'schluessel-stripe-webhook', re: /\bwhsec_[A-Za-z0-9]{16,}/, name: 'Stripe Webhook-Signaturgeheimnis' },
  { regel: 'schluessel-aws', re: /\bAKIA[0-9A-Z]{16}\b/, name: 'AWS Zugangsschlüssel' },
  { regel: 'schluessel-github', re: /\b(?:ghp|gho|ghs|ghu)_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}/, name: 'GitHub Token' },
  { regel: 'schluessel-resend', re: /\bre_[A-Za-z0-9]{20,}/, name: 'Resend API-Schlüssel' },
  { regel: 'schluessel-slack', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}/, name: 'Slack Token' },
  { regel: 'schluessel-privat', re: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |)PRIVATE KEY-----/, name: 'Privatschlüssel' },
];
const SCHLUESSEL_TEST = { regel: 'schluessel-stripe-test', re: /\b(?:sk|rk)_test_[A-Za-z0-9]{10,}/, name: 'Stripe Test-Schlüssel' };
const SCHLUESSEL_GEHEIM_NAME = /(?:SECRET|PRIVATE|PASSW|TOKEN|API_?KEY|WEBHOOK|SERVICE_ROLE)/i;
const SCHLUESSEL_OEFFENTLICH_ERLAUBT = /(?:PUBLISHABLE|SITE_?KEY|ANON)/i;
const OEFFENTLICHE_VARIABLE = /\b((?:PUBLIC|VITE|NEXT_PUBLIC|NUXT_PUBLIC|REACT_APP)_[A-Z0-9_]+)\b/g;

const ZAHLUNGSEREIGNIS = /\b(?:checkout\.session\.(?:completed|async_payment_succeeded)|payment_intent\.succeeded|invoice\.(?:paid|payment_succeeded)|customer\.subscription\.\w+)\b/;

function istText(pfad) {
  const name = basename(pfad);
  if (name === '_headers' || name.startsWith('.env') || name === '.dev.vars') return true;
  return TEXT_ENDUNGEN.has(extname(pfad).toLowerCase());
}

function sammeln(wurzel) {
  const dateien = [];
  const lauf = (ordner, ausVorlage) => {
    let eintraege;
    try { eintraege = readdirSync(ordner, { withFileTypes: true }); } catch { return; }
    for (const e of eintraege) {
      const voll = join(ordner, e.name);
      if (e.isDirectory()) {
        if (IGNORIERT.has(e.name)) continue;
        lauf(voll, ausVorlage || VORLAGENORDNER.has(e.name));
      } else if (e.isFile() && istText(voll)) {
        let groesse = 0;
        try { groesse = statSync(voll).size; } catch { continue; }
        if (groesse > MAX_GROESSE) continue;
        dateien.push({ voll, rel: relative(wurzel, voll).split(sep).join('/'), vorlage: ausVorlage });
      }
    }
  };
  lauf(wurzel, false);
  return dateien;
}

const lesen = (pfad) => { try { return readFileSync(pfad, 'utf8'); } catch { return ''; } };
const imBuild = (rel) => rel.startsWith('dist/') || rel.startsWith('.output/') || rel.startsWith('build/');
const kommentarlos = (text) => text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1');

/** Ob ein Treffer nach einem Platzhalter aussieht (in Beispielcode und Dokumentation). */
const PLATZHALTER = /(?:x{4,}|\.{3}|…|\[\[|<[^>]+>|your[_-]|beispiel|example|dummy|placeholder|\*{3,})/i;

/** Analysiert den Text einer Datei. Rückgabe: Befunde als { stufe, regel, datei, zeile, meldung, tipp }. */
export function dateiAnalysieren(rel, inhalt, optionen = {}) {
  const befunde = [];
  const { stripe = false } = optionen;
  const add = (stufe, regel, zeile, meldung, tipp) => befunde.push({ stufe, regel, datei: rel, zeile, meldung, tipp });
  const zeilen = inhalt.split('\n');
  const build = imBuild(rel);
  const istMap = rel.endsWith('.map');

  /* 1 Schlüssel, überall außer in Vorlagen (der Aufrufer filtert Vorlagen vorher) */
  zeilen.forEach((z, i) => {
    for (const s of SCHLUESSEL) {
      const m = z.match(s.re);
      if (m && !PLATZHALTER.test(m[0])) add('fehler', s.regel, i + 1, `${s.name} im Quelltext (${m[0].slice(0, 8)}…)`, 'Schlüssel entfernen, im Dienst widerrufen und neu ausstellen, in die Umgebungsvariablen des Hostings legen. Ein Schlüssel im Repository gilt als offengelegt, auch nach dem Löschen aus dem Verlauf.');
    }
    const t = z.match(SCHLUESSEL_TEST.re);
    if (t && !PLATZHALTER.test(t[0]) && !istMap) {
      add('warnung', SCHLUESSEL_TEST.regel, i + 1, 'Stripe Test-Schlüssel im Quelltext', 'Auch Testschlüssel gehören nicht ins Repository: sie gewöhnen daran, und ein Live-Schlüssel folgt dem Muster. In die Umgebungsvariablen legen.');
    }
  });

  if (istMap) return befunde;

  /* 2 Geheimnisse in öffentlichen Variablen */
  for (const m of inhalt.matchAll(OEFFENTLICHE_VARIABLE)) {
    const name = m[1];
    if (SCHLUESSEL_GEHEIM_NAME.test(name) && !SCHLUESSEL_OEFFENTLICH_ERLAUBT.test(name)) {
      const zeile = inhalt.slice(0, m.index).split('\n').length;
      add('fehler', 'geheimnis-in-oeffentlicher-variable', zeile, `${name} ist öffentlich (Präfix) und klingt nach einem Geheimnis`, 'Öffentliche Präfixe (PUBLIC_, VITE_, NEXT_PUBLIC_) landen im Browser jedes Besuchers. Das Geheimnis ohne Präfix nur serverseitig lesen. Öffentlich sind nur Publishable Keys und Site Keys.');
    }
  }

  if (build) return befunde;

  const code = kommentarlos(inhalt);
  const codeZeilen = code.split('\n');

  /* 4 gefährliche Aufrufe */
  const istCode = /\.(?:astro|ts|tsx|js|mjs|cjs|jsx|svelte|vue)$/.test(rel) && !/\/(?:tests?|__tests__)\//.test(rel);
  if (istCode) {
    codeZeilen.forEach((z, i) => {
      if (/\beval\s*\(/.test(z) || /\bnew\s+Function\s*\(/.test(z)) add('fehler', 'eval', i + 1, 'eval() oder new Function() im Quelltext', 'Nie mit Eingaben füttern. Meist reicht JSON.parse oder eine Tabelle von Funktionen.');
      if (/\bdocument\.write\s*\(/.test(z)) add('fehler', 'document-write', i + 1, 'document.write() im Quelltext', 'Blockiert das Parsen und öffnet XSS. Elemente erzeugen oder Markup rendern.');
      /* 9 HTML aus Variablen */
      const inner = z.match(/\.innerHTML\s*=\s*(.+)$/);
      if (inner && !/^\s*(['"`])(?:(?!\1|\$\{).)*\1\s*;?\s*$/.test(inner[1])) {
        add('warnung', 'html-aus-variable', i + 1, 'innerHTML wird aus einem Ausdruck gesetzt', 'Texte mit textContent setzen. Muss es Markup sein, vorher mit einer Allowlist bereinigen.');
      }
      if (/dangerouslySetInnerHTML/.test(z)) add('warnung', 'html-aus-variable', i + 1, 'dangerouslySetInnerHTML', 'Nur mit bereinigtem Inhalt.');
      const sethtml = z.match(/set:html=\{([^}]*)\}/);
      if (sethtml && !/JSON\.stringify\(/.test(sethtml[1]) && !/^\s*(['"`])/.test(sethtml[1])) {
        add('warnung', 'html-aus-variable', i + 1, `set:html={${sethtml[1].trim().slice(0, 40)}} gibt Markup ungeprüft aus`, 'Nur für eigene Konstanten und JSON-LD (JSON.stringify). Inhalt von Nutzern oder aus einem CMS bereinigen.');
      }
    });
  }

  /* 16 CORS mit Stern */
  if (istCode && /Access-Control-Allow-Origin['"]?\s*[:,]\s*['"]\*['"]/.test(code)) {
    add('warnung', 'cors-stern', 1, 'Access-Control-Allow-Origin mit Stern', 'Nur für öffentliche Daten vertretbar. Mit Cookies oder Zugangsdaten nie. Eine Liste erlaubter Ursprünge aus der Konfiguration.');
  }

  /* 15 Formularroute ohne Missbrauchsschutz */
  if (istCode && /(?:^|\/)(?:pages\/api|functions)\//.test(rel) && /(?:request|req)\.(?:formData|json)\s*\(/.test(code) && !/turnstile/i.test(code) && !/whsec|stripe-signature|constructEvent/i.test(code)) {
    add('warnung', 'formularroute-ohne-schutz', 1, 'Route liest Eingaben und verwendet kein Turnstile', 'Ein öffentliches Formular ohne Missbrauchsschutz wird als Spamschleuder benutzt. Turnstile serverseitig prüfen, dazu ein Honigtopf und eine Ursprungsprüfung (formulare-und-resend.md).');
  }

  if (stripe && istCode) befunde.push(...stripeDateiAnalysieren(rel, inhalt, code));
  return befunde;
}

/** Zusätzliche Regeln, nur in Projekten mit Stripe. */
function stripeDateiAnalysieren(rel, inhalt, code) {
  const befunde = [];
  const add = (stufe, regel, zeile, meldung, tipp) => befunde.push({ stufe, regel, datei: rel, zeile, meldung, tipp });
  const zeilen = code.split('\n');

  /* 6 payment_method_types */
  zeilen.forEach((z, i) => {
    if (/\bpayment_method_types\b\s*[:=]/.test(z) && !/card_present/.test(z) && !/allowed_payment_method_types|excluded_payment_method_types/.test(z)) {
      add('fehler', 'payment-method-types', i + 1, 'payment_method_types in einem Stripe-Aufruf', 'Weglassen: dann wählt Stripe über das Dashboard die passenden Zahlarten je Kunde (dynamische Zahlarten, höhere Abschlussquote). Einschränken mit excluded_payment_method_types (53-zahlungen-mit-stripe.md, Abschnitt 3).');
    }
    if (/\bstripe\.api_key\s*=|\bStripe\.setApiKey\b|\bstripe\.Key\s*=|StripeConfiguration\.ApiKey/.test(z)) {
      add('warnung', 'stripe-globaler-schluessel', i + 1, 'Globale Schlüsselsetzung für Stripe', 'Die SDKs führen das als veraltet. Eine Instanz des Clients mit dem Schlüssel erzeugen und diese verwenden.');
    }
  });

  /* 8 Geheimschlüssel im Browsercode */
  const imBrowser = /loadStripe\s*\(/.test(code) || (/\.astro$/.test(rel) && /<script\b/.test(inhalt));
  if (imBrowser) {
    zeilen.forEach((z, i) => {
      const m = z.match(/\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{6,}/);
      if (m && !PLATZHALTER.test(m[0])) add('fehler', 'stripe-schluessel-im-browser', i + 1, 'Geheimer Stripe-Schlüssel in Code, der im Browser läuft', 'Im Browser nur den Publishable Key (pk_). Alles mit dem Geheimschlüssel läuft auf dem Server oder in einer Funktion.');
    });
  }

  /* 7 Webhook ohne Signatur */
  const behandeltZahlung = ZAHLUNGSEREIGNIS.test(code);
  if (behandeltZahlung && !/constructEvent(?:Async)?\b/.test(code) && /(?:webhook|event\.type|stripe-signature)/i.test(code)) {
    add('fehler', 'webhook-ohne-signatur', 1, 'Stripe-Ereignisse werden verarbeitet, ohne die Signatur zu prüfen', 'Mit constructEvent oder constructEventAsync gegen das Signaturgeheimnis (whsec) und den ROHEN Anfragetext prüfen, bevor etwas geschieht. Sonst kann jeder eine Bestellung als bezahlt melden.');
  }

  /* 17 Erfüllung bei checkout.session.completed ohne payment_status */
  if (/checkout\.session\.completed/.test(code) && /constructEvent/.test(code)) {
    if (!/payment_status/.test(code)) {
      add('warnung', 'fulfillment-ohne-payment-status', 1, 'checkout.session.completed ohne Blick auf payment_status', 'Bei SEPA oder Rechnung ist die Sitzung abgeschlossen, bevor das Geld da ist. Nur bei payment_status ungleich unpaid erfüllen.');
    }
    if (!/checkout\.session\.async_payment_succeeded/.test(code)) {
      add('warnung', 'async-zahlung-nicht-behandelt', 1, 'checkout.session.async_payment_succeeded wird nicht behandelt', 'Zahlungen mit verzögerter Bestätigung (SEPA-Lastschrift, Überweisung) melden den Erfolg erst hierüber. Ohne diesen Fall wird nie erfüllt, was später bezahlt wird. Dazu checkout.session.async_payment_failed.');
    }
  }

  /* 18 Erfolgsseite erfüllt selbst */
  if (/(?:^|\/)pages\//.test(rel) && /(?:erfolg|success|danke|thanks?|bestellt|abgeschlossen)/i.test(basename(rel)) && /(?:resend|emails?\.send|sendMail|fulfill|grantAccess|freischalten)/i.test(code)) {
    add('warnung', 'erfuellung-auf-erfolgsseite', 1, 'Die Erfolgsseite verschickt Mails oder schaltet frei', 'Wer nach der Zahlung die Verbindung verliert, sieht die Seite nie, und die Bestellung geht verloren. Die Erfüllung gehört in den Webhook, die Erfolgsseite zeigt nur an.');
  }
  return befunde;
}

/* ------------------------------------------------------------------ Projekt */

function versioniert(wurzel) {
  try {
    const aus = execFileSync('git', ['-C', wurzel, 'ls-files'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 15000 });
    return aus.split('\n').filter(Boolean);
  } catch {
    return null;
  }
}

function stripeVerwendet(wurzel, dateien) {
  const paket = lesen(join(wurzel, 'package.json'));
  if (/"(?:stripe|@stripe\/[^"]+)"\s*:/.test(paket)) return true;
  return dateien.some((d) => !d.vorlage && !imBuild(d.rel) && /\.(?:astro|ts|tsx|js|mjs|jsx)$/.test(d.rel) && /\bnew\s+Stripe(?:Client)?\s*\(|checkout\.sessions\.create|js\.stripe\.com|loadStripe\s*\(/.test(lesen(d.voll)));
}

export function projektAnalysieren(wurzel, optionen = {}) {
  const dateien = sammeln(wurzel);
  const stripe = optionen.stripe ?? stripeVerwendet(wurzel, dateien);
  const befunde = [];
  const add = (stufe, regel, datei, meldung, tipp) => befunde.push({ stufe, regel, datei, zeile: 0, meldung, tipp });

  for (const d of dateien) {
    if (d.vorlage) continue;
    befunde.push(...dateiAnalysieren(d.rel, lesen(d.voll), { stripe }));
  }

  /* 3 und 10 Umgebungsdateien */
  const verfolgt = optionen.ohneGit ? null : versioniert(wurzel);
  if (verfolgt) {
    for (const f of verfolgt) {
      const n = basename(f);
      if ((n === '.env' || /^\.env\.(?!example|sample|template)/.test(n) || n === '.dev.vars') ) {
        add('fehler', 'env-datei-versioniert', f, `${f} ist im Git-Index`, 'Aus dem Index nehmen (git rm --cached), in die .gitignore, alle darin enthaltenen Schlüssel als offengelegt behandeln und erneuern.');
      }
    }
  } else if (existsSync(join(wurzel, '.git')) === false) {
    const gi = lesen(join(wurzel, '.gitignore'));
    if (!/(^|\n)\.env\b/.test(gi) || !/\.dev\.vars/.test(gi)) {
      add('warnung', 'gitignore-ohne-env', '.gitignore', 'Die .gitignore schützt .env oder .dev.vars nicht', '.env, .env.* (außer .env.example) und .dev.vars eintragen.');
    }
  }

  /* 5 und 11 und 12 Header */
  const kopfPfad = ['public/_headers', '_headers', 'dist/_headers'].map((p) => join(wurzel, p)).find((p) => existsSync(p));
  const hatSeite = existsSync(join(wurzel, 'src')) || existsSync(join(wurzel, 'dist')) || existsSync(join(wurzel, 'public'));
  if (hatSeite) {
    if (!kopfPfad) {
      add('warnung', 'header-datei-fehlt', '_headers', 'Keine _headers-Datei (Sicherheits-Header)', 'Vorlage: webdesign-conversion/assets/vorlagen/_headers (08-pflichtseiten-technik.md, Abschnitt Security-Header).');
    } else {
      const kopf = lesen(kopfPfad);
      for (const [n, h] of [['nosniff', 'X-Content-Type-Options'], ['referrer', 'Referrer-Policy'], ['hsts', 'Strict-Transport-Security']]) {
        if (!new RegExp(h, 'i').test(kopf)) add('warnung', `header-${n}-fehlt`, relative(wurzel, kopfPfad), `${h} fehlt`, 'Vorlage in vorlagen/_headers.');
      }
      const csp = kopf.match(/Content-Security-Policy(?!-Report-Only)\s*:\s*(.+)/i);
      if (csp) {
        const wert = csp[1];
        const skript = (wert.match(/(?:script-src|default-src)[^;]*/gi) ?? []).join(' ');
        if (/'unsafe-eval'/.test(wert) || /(?:script-src|default-src)[^;]*\s\*(?:\s|;|$)/i.test(wert + ';')) {
          add('fehler', 'csp-zu-offen', relative(wurzel, kopfPfad), "Content-Security-Policy mit 'unsafe-eval' oder Stern in script-src oder default-src", 'Eine CSP, die beliebige Skripte erlaubt, schützt nicht. Erst als Report-Only laufen lassen, Verstöße sammeln, dann eng schalten.');
        } else if (/'unsafe-inline'/.test(skript)) {
          add('warnung', 'csp-unsafe-inline', relative(wurzel, kopfPfad), "script-src mit 'unsafe-inline'", 'Inline-Skripte mit Hash oder Nonce freigeben statt pauschal.');
        }
        if (stripe && !/stripe\.com/i.test(wert)) {
          add('fehler', 'csp-ohne-stripe', relative(wurzel, kopfPfad), 'Das Projekt benutzt Stripe, die CSP erlaubt https://js.stripe.com und https://*.stripe.com nicht', 'In script-src, frame-src und connect-src ergänzen, sonst bleibt die Kasse leer (53-zahlungen-mit-stripe.md, Abschnitt 6).');
        }
      } else if (stripe) {
        add('warnung', 'csp-fehlt-bei-stripe', relative(wurzel, kopfPfad), 'Stripe wird benutzt, es gibt keine Content-Security-Policy', 'Stripe empfiehlt für jede Seite mit Stripe.js eine CSP. Erst Report-Only, dann scharf.');
      }
    }
  }

  /* 13 Abhängigkeiten */
  const paketText = lesen(join(wurzel, 'package.json'));
  if (paketText) {
    const lock = ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lock', 'bun.lockb'].some((l) => existsSync(join(wurzel, l)));
    if (!lock) add('warnung', 'lockfile-fehlt', 'package.json', 'Kein Lockfile', 'Ohne Lockfile ist die Installation nicht reproduzierbar, und ein untergeschobenes Paket kommt ungeprüft hinein.');
    try {
      const p = JSON.parse(paketText);
      for (const [n, v] of Object.entries({ ...p.dependencies, ...p.devDependencies })) {
        if (v === 'latest' || v === '*' || v === 'x') add('warnung', 'version-unfixiert', 'package.json', `${n}: "${v}"`, 'Eine feste Version oder einen Bereich verwenden und das Lockfile einchecken.');
      }
    } catch { /* ungültiges JSON meldet der Build */ }
  }

  /* 14 Quellkarten */
  if (dateien.some((d) => d.rel.startsWith('dist/') && d.rel.endsWith('.map'))) {
    add('warnung', 'sourcemap-ausgeliefert', 'dist', 'Quellkarten (.map) liegen in dist', 'Sie geben den Quelltext heraus. Für die Auslieferung abschalten (Astro: vite.build.sourcemap false).');
  }

  /* Stripe, rechtliche Seiten und Zahlungspflicht */
  if (stripe) {
    const quellen = dateien.filter((d) => !d.vorlage && !imBuild(d.rel) && /^(?:src|functions|public)\//.test(d.rel));
    const textGesamt = quellen.map((d) => lesen(d.voll)).join('\n').toLowerCase();
    const pfade = quellen.map((d) => d.rel.toLowerCase());
    if (/checkout\.sessions\.create|sessions\.create/.test(textGesamt) && !/zahlungspflichtig/.test(textGesamt)) {
      add('warnung', 'button-loesung-unklar', 'src', 'Kein Hinweis „zahlungspflichtig“ im Projekt', 'Bei Verbrauchern muss die Schaltfläche, die den Vertrag schließt, eindeutig auf die Zahlungspflicht hinweisen (§ 312j Abs. 3 BGB). Bei Stripe Checkout steht der Knopf auf der Zahlungsseite: Text dort per custom_text ergänzen, gegen die aktuelle Stripe-Dokumentation prüfen (53-…, Abschnitt 4).');
    }
    if (!pfade.some((p) => /agb|widerruf/.test(p))) {
      add('warnung', 'agb-widerruf-fehlen', 'src/pages', 'Keine Seite zu AGB oder Widerruf', 'Wer Verbrauchern online etwas verkauft, braucht Widerrufsbelehrung und in der Regel AGB, vor dem Kauf abrufbar (53-…, Abschnitt 4).');
    }
    const datenschutz = quellen.filter((d) => /datenschutz/.test(d.rel.toLowerCase()));
    if (datenschutz.length && !datenschutz.some((d) => /stripe/i.test(lesen(d.voll)))) {
      add('warnung', 'datenschutz-ohne-stripe', datenschutz[0].rel, 'Stripe wird benutzt, die Datenschutzerklärung nennt es nicht', 'Zahlungsdienstleister, Zweck, Rechtsgrundlage und Drittlandübermittlung ergänzen (07-recht-dsgvo.md, 53-…, Abschnitt 4).');
    }
    if (/automatic_tax/.test(textGesamt)) {
      add('hinweis', 'steuer-registrierung', 'src', 'automatic_tax ist gesetzt', 'Die Steuerberechnung wirkt nur mit einer aktiven Registrierung im Zielland. Ohne sie berechnet und erhebt Stripe nichts, und es sieht trotzdem eingeschaltet aus. Mit der Steuerberatung klären (53-…, Abschnitt 5).');
    }
  }

  return { befunde, stripe, dateien: dateien.length };
}

/* ------------------------------------------------------------------ Aufruf */

function main() {
  const args = process.argv.slice(2);
  const streng = args.includes('--strict');
  const ohneGit = args.includes('--ohne-git');
  const ziele = args.filter((a) => !a.startsWith('--'));
  if (ziele.length > 1) {
    console.error('Aufruf: node scripts/pruefe-sicherheit.mjs [verzeichnis] [--strict] [--ohne-git]');
    process.exit(2);
  }
  const wurzel = ziele[0] ?? '.';
  if (!existsSync(wurzel) || !statSync(wurzel).isDirectory()) {
    console.error(`Verzeichnis nicht gefunden: ${wurzel}`);
    process.exit(2);
  }
  const { befunde, stripe, dateien } = projektAnalysieren(wurzel, { ohneGit });
  const fehler = befunde.filter((b) => b.stufe === 'fehler');
  const warnungen = befunde.filter((b) => b.stufe === 'warnung');
  const hinweise = befunde.filter((b) => b.stufe === 'hinweis');

  console.log(`pruefe-sicherheit: ${dateien} Dateien geprüft${stripe ? ', Stripe erkannt (Zahlungsregeln aktiv)' : ''}`);
  const ausgabe = (symbol, liste, titel) => {
    for (const b of liste) {
      console.log(`\n  ${symbol} ${titel} ${b.regel}: ${b.meldung}`);
      console.log(`    ${b.datei}${b.zeile ? `:${b.zeile}` : ''}`);
      console.log(`    → ${b.tipp}`);
    }
  };
  ausgabe('✗', fehler, 'Fehler');
  ausgabe('!', warnungen, 'Warnung');
  ausgabe('i', hinweise, 'Hinweis');
  if (!befunde.length) console.log('\n  ✓ keine der geprüften Sicherheitsfehler gefunden');
  console.log('\nNicht geprüft: Logik und Berechtigungen, bekannte Lücken in Abhängigkeiten (npm audit oder pnpm audit gegen das Lockfile), Betrieb.');
  console.log('Ein ruhiger Lauf heißt nicht, dass die Seite sicher ist (52-sicherheit-der-kundenseite.md).');
  const zaehlen = fehler.length + (streng ? warnungen.length : 0);
  process.exit(zaehlen ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
