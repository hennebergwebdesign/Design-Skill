/*
  pruefe-tracking.test.mjs — prüft die Regeln in pruefe-tracking.mjs gegen kleine Projekte.

      node --test 'scripts/tests/*.test.mjs'
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKRIPT = fileURLToPath(new URL('../pruefe-tracking.mjs', import.meta.url));
const VORLAGEN = fileURLToPath(new URL('../../skills/agentur-website-builder/assets/tracking', import.meta.url));

function projekt(dateien) {
  const ordner = mkdtempSync(join(tmpdir(), 'track-'));
  for (const [pfad, inhalt] of Object.entries(dateien)) {
    mkdirSync(dirname(join(ordner, pfad)), { recursive: true });
    writeFileSync(join(ordner, pfad), inhalt);
  }
  return ordner;
}
const lauf = (dateien, args = []) => {
  const cwd = projekt(dateien);
  return spawnSync('node', [SKRIPT, ...args], { cwd, encoding: 'utf8' });
};

test('Seite ohne Tracking: nichts zu prüfen, Exit 0', () => {
  const r = lauf({ 'src/pages/index.astro': '<h1>Hallo</h1>' });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Kein Tracking/);
});

test('Pixel-Schnipsel im Kopfbereich lädt vor der Entscheidung', () => {
  const r = lauf({ 'src/layouts/Basis.astro': '<head><script src="https://connect.facebook.net/en_US/fbevents.js"></script></head>' });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /lädt vor der Entscheidung/);
});

test('geparktes Skript mit data-consent ist in Ordnung', () => {
  const r = lauf({
    'src/layouts/Basis.astro': '<script type="text/plain" data-consent="marketing" data-src="https://connect.facebook.net/en_US/fbevents.js"></script>',
    'src/pages/datenschutz.astro': '<p>Meta Pixel der Meta Platforms Ireland</p>',
  });
  assert.equal(r.status, 0);
});

test('GA4 per gtag im Kopfbereich ohne Bezug zur Einwilligung ist ein Fehler', () => {
  const r = lauf({ 'src/layouts/Basis.astro': `<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABCDEF1234"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-ABCDEF1234');</script>` });
  assert.equal(r.status, 1);
});

test('Lead ohne eventID und Server ohne event_id werden gemeldet', () => {
  const r = lauf({
    'src/scripts/a.ts': "const consent = true; if (consent) fbq('track', 'Lead');",
    'functions/api/b.ts': "const marketing_consent = 1; fetch(`https://graph.facebook.com/v21.0/${id}/events?access_token=${t}`)",
  });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /ohne eventID/);
  assert.match(r.stdout, /ohne event_id/);
});

test('Conversions API ohne Einwilligungsprüfung ist ein Fehler', () => {
  const r = lauf({ 'functions/api/c.ts': "const event_id = 1; fetch(`https://graph.facebook.com/v21.0/${id}/events?access_token=${t}`)" });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /ohne Prüfung der Einwilligung/);
});

test('Token hinter PUBLIC_ und Token im Build werden gemeldet', () => {
  const a = lauf({ 'src/x.ts': 'const t = import.meta.env.PUBLIC_META_CAPI_TOKEN;' });
  assert.equal(a.status, 1);
  assert.match(a.stdout, /öffentlichen Präfix/);
  const b = lauf({ 'dist/index.html': '<script>var t="META_CAPI_TOKEN"</script>' });
  assert.equal(b.status, 1);
});

test('Testcode ohne test_mode ist eine Warnung, kein Fehler', () => {
  const r = lauf({ 'functions/api/d.ts': "const consent=1,event_id=1; const c = env.META_TEST_EVENT_CODE; body = { test_event_code: c }; // graph.facebook.com/v21.0/x/events" });
  assert.match(r.stdout, /WARNUNG.*\n.*Testkanal|Testkanal/);
  assert.equal(r.status, 0);
});

test('Tracking ohne Nennung in der Datenschutzerklärung wird gewarnt', () => {
  const r = lauf({
    'src/scripts/t.ts': "const marketing = lesen(); const PIXEL = 'x'; if (marketing) fbq('init', id)",
    'src/pages/datenschutz.astro': '<p>Hosting bei Cloudflare.</p>',
  });
  assert.match(r.stdout, /nennt Meta nicht/);
});

test('die mitgelieferten Vorlagen bestehen ihre eigene Prüfung ohne Fehler', () => {
  const r = spawnSync('node', [SKRIPT, VORLAGEN], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout);
});

test('ohne Ordner: Exit 2', () => {
  const r = spawnSync('node', [SKRIPT], { cwd: mkdtempSync(join(tmpdir(), 'leer-')), encoding: 'utf8' });
  assert.equal(r.status, 2);
});
