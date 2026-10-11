/*
  pruefe-sicherheit.test.mjs — prüft die Regeln in pruefe-sicherheit.mjs.

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und einer, der ähnlich aussieht und durchgehen muss.
  Die Fixtures entstehen in einem temporären Ordner, die Schlüssel darin sind bewusst nur
  zur Laufzeit zusammengesetzt, damit dieses Repository selbst nicht danach aussieht.
*/

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';

import { dateiAnalysieren, projektAnalysieren } from '../pruefe-sicherheit.mjs';

const live = ['sk', 'live', 'ABCDEFGHIJKLMNOPQRSTUVWX'].join('_');
const test_ = ['sk', 'test', 'ABCDEFGHIJKLMNOPQRSTUVWX'].join('_');
const whsec = ['whsec', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123'].join('_');
const regeln = (b) => b.map((x) => x.regel);

let wurzel;
before(() => { wurzel = mkdtempSync(join(tmpdir(), 'sicherheit-')); });
after(() => rmSync(wurzel, { recursive: true, force: true }));

function projekt(name, dateien) {
  const ordner = join(wurzel, name);
  for (const [pfad, inhalt] of Object.entries(dateien)) {
    mkdirSync(dirname(join(ordner, pfad)), { recursive: true });
    writeFileSync(join(ordner, pfad), inhalt);
  }
  return ordner;
}

// ------------------------------------------------------------------ Schlüssel

test('Live-Schlüssel im Quelltext ist ein Fehler, auch in einem Kommentar', () => {
  const b = dateiAnalysieren('src/lib/zahlung.ts', `const k = '${live}';`);
  assert.deepEqual(b.filter((x) => x.stufe === 'fehler').map((x) => x.regel), ['schluessel-stripe-live']);
  const k = dateiAnalysieren('src/lib/zahlung.ts', `// alt: ${live}\nexport const x = 1;`);
  assert.ok(regeln(k).includes('schluessel-stripe-live'));
});

test('ein Platzhalter und ein Verweis auf die Umgebung sind kein Schlüssel', () => {
  assert.deepEqual(regeln(dateiAnalysieren('src/lib/zahlung.ts', "const k = 'sk_live_xxxxxxxxxxxxxxxx'; const e = import.meta.env.STRIPE_SECRET_KEY;")), []);
  assert.deepEqual(regeln(dateiAnalysieren('src/lib/zahlung.ts', "const k = 'sk_live_...';")), []);
});

test('Test-Schlüssel ist eine Warnung, kein Fehler', () => {
  const b = dateiAnalysieren('src/lib/zahlung.ts', `const k = '${test_}';`);
  assert.deepEqual(b.map((x) => [x.stufe, x.regel]), [['warnung', 'schluessel-stripe-test']]);
});

test('Webhook-Signaturgeheimnis, AWS-Schlüssel und Privatschlüssel werden gefunden', () => {
  assert.ok(regeln(dateiAnalysieren('functions/a.ts', `const s = '${whsec}';`)).includes('schluessel-stripe-webhook'));
  assert.ok(regeln(dateiAnalysieren('functions/a.ts', "const id = 'AKIAABCDEFGHIJKLMNOP';")).includes('schluessel-aws'));
  assert.ok(regeln(dateiAnalysieren('src/a.txt', '-----BEGIN PRIVATE KEY-----\nMIIE')).includes('schluessel-privat'));
});

test('auch in dist wird nach Schlüsseln gesucht, andere Codeprüfungen laufen dort nicht', () => {
  const b = dateiAnalysieren('dist/_astro/app.js', `var k='${live}'; eval('1');`);
  assert.deepEqual(regeln(b), ['schluessel-stripe-live']);
});

// ------------------------------------------------------------------ öffentliche Variablen

test('Geheimnis in einer öffentlichen Variablen ist ein Fehler, Publishable Key und Site Key nicht', () => {
  assert.ok(regeln(dateiAnalysieren('src/a.ts', 'const k = import.meta.env.PUBLIC_STRIPE_SECRET_KEY;')).includes('geheimnis-in-oeffentlicher-variable'));
  assert.ok(regeln(dateiAnalysieren('.env', 'VITE_API_TOKEN=abc')).includes('geheimnis-in-oeffentlicher-variable'));
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'const k = import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY; const t = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;')), []);
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'const k = import.meta.env.STRIPE_SECRET_KEY;')), []);
});

// ------------------------------------------------------------------ Code

test('eval und document.write sind Fehler, JSON.parse nicht', () => {
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'eval(code);')), ['eval']);
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'const f = new Function("a", body);')), ['eval']);
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'document.write("x");')), ['document-write']);
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'JSON.parse(text); // eval(nichts)')), []);
});

test('innerHTML aus einer Variablen ist eine Warnung, aus einem festen Text nicht', () => {
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'el.innerHTML = kommentar;')), ['html-aus-variable']);
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', "el.innerHTML = '<b>fest</b>';")), []);
  assert.deepEqual(regeln(dateiAnalysieren('src/a.ts', 'el.innerHTML = `<b>${x}</b>`;')), ['html-aus-variable']);
});

test('set:html mit JSON.stringify (JSON-LD) ist erlaubt, mit einer Variablen nicht', () => {
  assert.deepEqual(regeln(dateiAnalysieren('src/a.astro', '<script type="application/ld+json" set:html={JSON.stringify(schema)} />')), []);
  assert.deepEqual(regeln(dateiAnalysieren('src/a.astro', '<div set:html={beitrag.inhalt} />')), ['html-aus-variable']);
});

test('CORS mit Stern ist eine Warnung', () => {
  assert.ok(regeln(dateiAnalysieren('functions/a.ts', "return new Response('x', { headers: { 'Access-Control-Allow-Origin': '*' } });")).includes('cors-stern'));
});

test('Formularroute ohne Turnstile ist eine Warnung, mit Turnstile nicht', () => {
  assert.ok(regeln(dateiAnalysieren('functions/api/kontakt.ts', 'const d = await request.formData(); await mail(d);')).includes('formularroute-ohne-schutz'));
  assert.ok(!regeln(dateiAnalysieren('functions/api/kontakt.ts', 'const d = await request.formData(); await verifyTurnstile(d);')).includes('formularroute-ohne-schutz'));
});

// ------------------------------------------------------------------ Stripe

const MIT_STRIPE = { stripe: true };

test('payment_method_types ist ein Fehler, ausgenommen Terminal und Ausschlussliste', () => {
  assert.deepEqual(regeln(dateiAnalysieren('functions/a.ts', "stripe.checkout.sessions.create({ payment_method_types: ['card'] });", MIT_STRIPE)), ['payment-method-types']);
  assert.deepEqual(regeln(dateiAnalysieren('functions/a.ts', "stripe.paymentIntents.create({ payment_method_types: ['card_present'] });", MIT_STRIPE)), []);
  assert.deepEqual(regeln(dateiAnalysieren('functions/a.ts', "stripe.checkout.sessions.create({ excluded_payment_method_types: ['paypal'] });", MIT_STRIPE)), []);
});

test('Webhook ohne Signaturprüfung ist ein Fehler, mit constructEventAsync nicht', () => {
  const ohne = "const event = await request.json(); if (event.type === 'checkout.session.completed') { /* stripe */ }";
  assert.ok(regeln(dateiAnalysieren('functions/api/webhook.ts', ohne, MIT_STRIPE)).includes('webhook-ohne-signatur'));
  const mit = "const event = await stripe.webhooks.constructEventAsync(body, sig, secret); if (event.type === 'checkout.session.completed') { if (s.payment_status !== 'unpaid') {} } if (event.type === 'checkout.session.async_payment_succeeded') {}";
  assert.deepEqual(regeln(dateiAnalysieren('functions/api/webhook.ts', mit, MIT_STRIPE)), []);
});

test('checkout.session.completed ohne payment_status und ohne async_payment_succeeded wird gemeldet', () => {
  const code = "const event = await stripe.webhooks.constructEventAsync(b, s, k); if (event.type === 'checkout.session.completed') { liefern(); }";
  assert.deepEqual(regeln(dateiAnalysieren('functions/api/webhook.ts', code, MIT_STRIPE)).sort(), ['async-zahlung-nicht-behandelt', 'fulfillment-ohne-payment-status']);
});

test('Geheimschlüssel in Browsercode ist ein Fehler', () => {
  const b = dateiAnalysieren('src/components/Kasse.astro', `---\n---\n<script>const s = loadStripe('${test_}');</script>`, MIT_STRIPE);
  assert.ok(regeln(b).includes('stripe-schluessel-im-browser'));
});

test('Erfolgsseite, die Mails verschickt, wird gemeldet', () => {
  const b = dateiAnalysieren('src/pages/danke.astro', '---\nawait resend.emails.send({ to });\n---\n<p>Danke</p>', MIT_STRIPE);
  assert.ok(regeln(b).includes('erfuellung-auf-erfolgsseite'));
  assert.ok(!regeln(dateiAnalysieren('src/pages/danke.astro', '<p>Danke für Ihre Bestellung</p>', MIT_STRIPE)).includes('erfuellung-auf-erfolgsseite'));
});

test('globaler Schlüssel wird gemeldet, eine Client-Instanz nicht', () => {
  assert.ok(regeln(dateiAnalysieren('functions/a.ts', 'stripe.api_key = env.KEY;', MIT_STRIPE)).includes('stripe-globaler-schluessel'));
  assert.ok(!regeln(dateiAnalysieren('functions/a.ts', 'const stripe = new StripeClient(env.KEY);', MIT_STRIPE)).includes('stripe-globaler-schluessel'));
});

// ------------------------------------------------------------------ Projekt

test('ein sauberes Projekt ohne Stripe besteht ohne Befund', () => {
  const dir = projekt('sauber', {
    'package.json': JSON.stringify({ dependencies: { astro: '^5.0.0' } }),
    'pnpm-lock.yaml': 'lockfileVersion: 9',
    'src/pages/index.astro': '<h1>Hallo</h1>',
    'public/_headers': '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Strict-Transport-Security: max-age=31536000\n',
  });
  const r = projektAnalysieren(dir, { ohneGit: true });
  assert.deepEqual(regeln(r.befunde).filter((x) => x !== 'gitignore-ohne-env'), []);
  assert.equal(r.stripe, false);
});

test('fehlende Header, Lockfile und unfixierte Version werden gemeldet', () => {
  const dir = projekt('luecken', {
    'package.json': JSON.stringify({ dependencies: { astro: 'latest' } }),
    'src/pages/index.astro': '<h1>Hallo</h1>',
  });
  const r = regeln(projektAnalysieren(dir, { ohneGit: true }).befunde);
  for (const e of ['header-datei-fehlt', 'lockfile-fehlt', 'version-unfixiert']) assert.ok(r.includes(e), e);
});

test('eine zu offene CSP ist ein Fehler, unsafe-inline eine Warnung, eine enge CSP besteht', () => {
  const kopf = (csp) => `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Strict-Transport-Security: max-age=1\n  Content-Security-Policy: ${csp}\n`;
  const lauf = (name, csp) => regeln(projektAnalysieren(projekt(name, { 'src/index.astro': 'x', 'public/_headers': kopf(csp), 'package.json': '{}', 'pnpm-lock.yaml': '' }), { ohneGit: true }).befunde);
  assert.ok(lauf('csp1', "default-src 'self'; script-src 'self' 'unsafe-eval'").includes('csp-zu-offen'));
  assert.ok(lauf('csp2', "default-src *").includes('csp-zu-offen'));
  assert.ok(lauf('csp3', "default-src 'self'; script-src 'self' 'unsafe-inline'").includes('csp-unsafe-inline'));
  assert.ok(!lauf('csp4', "default-src 'self'; script-src 'self'").some((r) => r.startsWith('csp-')));
});

test('Stripe im Projekt: CSP ohne Stripe ist ein Fehler, fehlende AGB und Zahlungspflicht werden gemeldet', () => {
  const dir = projekt('shop', {
    'package.json': JSON.stringify({ dependencies: { stripe: '^20.0.0' } }),
    'pnpm-lock.yaml': '',
    'functions/api/kasse.ts': "const s = await stripe.checkout.sessions.create({ mode: 'payment', automatic_tax: { enabled: true } });",
    'src/pages/datenschutz.astro': '<p>Wir erheben nichts.</p>',
    'public/_headers': "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Strict-Transport-Security: max-age=1\n  Content-Security-Policy: default-src 'self'\n",
  });
  const r = projektAnalysieren(dir, { ohneGit: true });
  assert.equal(r.stripe, true);
  const ids = regeln(r.befunde);
  for (const e of ['csp-ohne-stripe', 'button-loesung-unklar', 'agb-widerruf-fehlen', 'datenschutz-ohne-stripe', 'steuer-registrierung']) assert.ok(ids.includes(e), e);
  assert.equal(r.befunde.find((b) => b.regel === 'steuer-registrierung').stufe, 'hinweis');
});

test('Stripe im Projekt, alles vorhanden: keine rechtlichen Warnungen', () => {
  const dir = projekt('shop-ok', {
    'package.json': JSON.stringify({ dependencies: { stripe: '^20.0.0' } }),
    'pnpm-lock.yaml': '',
    'functions/api/kasse.ts': 'await stripe.checkout.sessions.create({ mode: "payment" }); // Hinweis: zahlungspflichtig bestellen',
    'src/pages/agb.astro': '<p>AGB</p>',
    'src/pages/widerruf.astro': '<p>Widerruf</p>',
    'src/pages/datenschutz.astro': '<p>Zahlungen verarbeitet Stripe Payments Europe, Ltd.</p>',
    'public/_headers': "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Strict-Transport-Security: max-age=1\n  Content-Security-Policy: default-src 'self'; script-src 'self' https://js.stripe.com; frame-src https://js.stripe.com https://*.stripe.com\n",
  });
  const ids = regeln(projektAnalysieren(dir, { ohneGit: true }).befunde);
  for (const e of ['csp-ohne-stripe', 'button-loesung-unklar', 'agb-widerruf-fehlen', 'datenschutz-ohne-stripe']) assert.ok(!ids.includes(e), e);
});

test('Vorlagenordner werden nicht auf Schlüssel geprüft', () => {
  const dir = projekt('mitvorlage', {
    'package.json': '{}', 'pnpm-lock.yaml': '',
    'src/vorlagen/beispiel.ts': `const k = '${live}';`,
    'src/pages/index.astro': 'x',
  });
  assert.ok(!regeln(projektAnalysieren(dir, { ohneGit: true }).befunde).includes('schluessel-stripe-live'));
});

test('Quellkarten in dist werden gemeldet', () => {
  const dir = projekt('karten', { 'package.json': '{}', 'pnpm-lock.yaml': '', 'dist/index.html': 'x', 'dist/a.js.map': '{"version":3}' });
  assert.ok(regeln(projektAnalysieren(dir, { ohneGit: true }).befunde).includes('sourcemap-ausgeliefert'));
});
