/**
 * Stripe Webhook, Serverroute. Kopieren nach src/pages/api/stripe-webhook.ts.
 *
 * STAND: ungeprueft. Nicht gegen eine Sandbox gelaufen. Vor dem Einsatz gegen die aktuelle
 * Stripe-Dokumentation (Webhooks, Signaturpruefung in Workers) und die SDK-Version des
 * Projekts pruefen. Test mit der Stripe CLI: stripe listen --forward-to localhost:4321/api/stripe-webhook
 *
 * Regeln (53-zahlungen-mit-stripe.md, Abschnitt 3):
 *  1. Signatur ZUERST pruefen, gegen den ROHEN Text (request.text(), nie request.json()).
 *  2. Erfuellt wird hier, nicht auf der Danke-Seite.
 *  3. checkout.session.completed UND checkout.session.async_payment_succeeded behandeln,
 *     jeweils nur bei payment_status ungleich "unpaid" erfuellen.
 *  4. Jedes Ereignis hoechstens einmal verarbeiten (Ereignis-Kennung in D1, schema.sql).
 *     Fehlt D1, muss erfuellen() selbst wiederholbar sein.
 *  5. Antwort 200 nur, wenn alles gut ging. Bei einem Fehler 500, Stripe versucht es erneut.
 */
import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

const STRIPE_API_VERSION = '[[FEHLT: API-Version aus der Stripe-Dokumentation]]' as unknown as Stripe.LatestApiVersion;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env ?? import.meta.env;

  for (const name of ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'] as const) {
    if (!env[name]) {
      console.error(`Umgebungsvariable ${name} fehlt`);
      return antwort(503, { fehler: 'nicht konfiguriert' });
    }
  }

  const signatur = request.headers.get('stripe-signature');
  if (!signatur) return antwort(400, { fehler: 'Signatur fehlt' });

  const roh = await request.text(); // roher Text, keine Umformung vor der Pruefung

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createFetchHttpClient(),
  });

  let ereignis: Stripe.Event;
  try {
    // In Workers gibt es kein node:crypto, deshalb die asynchrone Variante mit SubtleCrypto.
    ereignis = await stripe.webhooks.constructEventAsync(roh, signatur, env.STRIPE_WEBHOOK_SECRET, undefined, Stripe.createSubtleCryptoProvider());
  } catch {
    return antwort(400, { fehler: 'Signatur ungültig' });
  }

  if (await schonVerarbeitet(env, ereignis.id)) return antwort(200, { ok: true, doppelt: true });

  try {
    switch (ereignis.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const sitzung = ereignis.data.object as Stripe.Checkout.Session;
        // Bei verzoegerten Zahlarten (SEPA, Ueberweisung) ist "completed" schon da, das Geld noch nicht.
        if (sitzung.payment_status !== 'unpaid') await erfuellen(env, sitzung);
        break;
      }
      case 'checkout.session.async_payment_failed':
        await zahlungFehlgeschlagen(env, ereignis.data.object as Stripe.Checkout.Session);
        break;
      case 'charge.dispute.created':
      case 'charge.refunded':
        await interneMeldung(env, ereignis);
        break;
      default:
        break; // nur abonniert, worauf reagiert wird (53-…, Regel 10)
    }
    await markiereVerarbeitet(env, ereignis.id, ereignis.type);
  } catch (fehler) {
    console.error('Webhook fehlgeschlagen', ereignis.type, fehler instanceof Error ? fehler.message : fehler);
    return antwort(500, { fehler: 'Verarbeitung fehlgeschlagen' });
  }
  return antwort(200, { ok: true });
};

function antwort(status: number, koerper: unknown) {
  return new Response(JSON.stringify(koerper), { status, headers: { 'content-type': 'application/json' } });
}

/** Zugang freischalten, Bestaetigung senden, Bestand mindern. Muss wiederholbar sein. */
async function erfuellen(env: any, sitzung: Stripe.Checkout.Session) {
  // [[FEHLT: Erfuellung laut Konzept, zum Beispiel Bestaetigungsmail ueber Resend mit AGB, Widerruf und Rechnung]]
  console.info('Zu erfüllen:', sitzung.id, sitzung.client_reference_id);
}

async function zahlungFehlgeschlagen(env: any, sitzung: Stripe.Checkout.Session) {
  // [[FEHLT: Mail an den Kaeufer mit dem naechsten Schritt]]
  console.info('Zahlung fehlgeschlagen:', sitzung.id);
}

async function interneMeldung(env: any, ereignis: Stripe.Event) {
  // [[FEHLT: Mail an den Kunden bei Streitfall oder Erstattung]]
  console.info('Meldung:', ereignis.type, ereignis.id);
}

async function schonVerarbeitet(env: any, id: string) {
  if (!env.DB) return false;
  const zeile = await env.DB.prepare('SELECT 1 FROM stripe_ereignisse WHERE id = ?').bind(id).first();
  return Boolean(zeile);
}

async function markiereVerarbeitet(env: any, id: string, typ: string) {
  if (!env.DB) return;
  await env.DB.prepare('INSERT OR IGNORE INTO stripe_ereignisse (id, typ, verarbeitet_am) VALUES (?, ?, ?)').bind(id, typ, new Date().toISOString()).run();
}
