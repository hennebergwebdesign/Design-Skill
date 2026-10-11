/**
 * Stripe Checkout (gehostet), Serverroute. Kopieren nach src/pages/api/checkout.ts.
 *
 * STAND: ungeprueft. Nicht gegen eine Sandbox und nicht gegen die SDK-Version eines Projekts
 * gelaufen. Vor dem Einsatz Aufrufe, Parameternamen und Typen gegen die aktuelle Stripe-
 * Dokumentation und die installierte SDK-Version pruefen (arbeitsdisziplin.md, Quellenprinzip),
 * und die Quelle im Commit nennen.
 *
 * Regeln (53-zahlungen-mit-stripe.md, Abschnitt 3):
 *  - Preise kommen NIE aus dem Browser. Die Seite schickt eine Kennung, der Server schlaegt die
 *    Preis-ID nach (STRIPE_PREISE, ein JSON je Umgebung, Sandbox und Live haben andere IDs).
 *  - KEIN payment_method_types. Zahlarten verwaltet das Dashboard.
 *  - Ein eingeschraenkter Schluessel (rk_) in STRIPE_SECRET_KEY, nur als Secret des Hostings.
 *  - Die Erfuellung geschieht im Webhook (stripe-webhook-route.ts), nicht auf der Danke-Seite.
 *
 * Aufruf aus der Seite: <form method="post" action="/api/checkout"> mit verstecktem Feld
 * "angebot" und, wo das Konzept es verlangt, dem Turnstile-Widget.
 */
import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

/** Die API-Version steht im Projekt fest und wird bewusst angehoben (53-…, Regel 8). */
const STRIPE_API_VERSION = '[[FEHLT: API-Version aus der Stripe-Dokumentation]]' as unknown as Stripe.LatestApiVersion;

const KONTAKTWEG = 'Bitte melde dich telefonisch oder per Mail bei uns.';

export const POST: APIRoute = async ({ request, locals, site, clientAddress }) => {
  const env = (locals as any).runtime?.env ?? import.meta.env;

  for (const name of ['STRIPE_SECRET_KEY', 'STRIPE_PREISE'] as const) {
    if (!env[name]) {
      console.error(`Umgebungsvariable ${name} fehlt`);
      return antwort(503, { fehler: `Die Kasse ist gerade nicht erreichbar. ${KONTAKTWEG}` });
    }
  }

  if (!herkunftErlaubt(request, site)) return antwort(403, { fehler: 'Ungültige Herkunft' });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return antwort(400, { fehler: 'Ungültige Anfrage' });
  }

  // Missbrauchsschutz. Wo das Konzept kein Turnstile vorsieht, setzt die Seite die Variable
  // nicht, und die Route verlaesst sich auf Origin und die Zahlungsabwehr von Stripe.
  if (env.TURNSTILE_SECRET_KEY) {
    const ok = await turnstileGueltig(String(form.get('cf-turnstile-response') ?? ''), env.TURNSTILE_SECRET_KEY, clientAddress);
    if (!ok) return antwort(400, { fehler: 'Die Sicherheitsprüfung ist fehlgeschlagen. Bitte lade die Seite neu.' });
  }

  // Angebot aus der Liste, nie ein Preis aus dem Browser.
  let preise: Record<string, { preis: string; modus?: 'payment' | 'subscription' }>;
  try {
    preise = JSON.parse(env.STRIPE_PREISE);
  } catch {
    console.error('STRIPE_PREISE ist kein gültiges JSON');
    return antwort(503, { fehler: `Die Kasse ist gerade nicht erreichbar. ${KONTAKTWEG}` });
  }
  const kennung = String(form.get('angebot') ?? '');
  const angebot = Object.hasOwn(preise, kennung) ? preise[kennung] : undefined;
  if (!angebot) return antwort(422, { fehler: 'Dieses Angebot gibt es nicht.' });

  const menge = Math.min(10, Math.max(1, Math.trunc(Number(form.get('menge') ?? 1)) || 1));
  const basis = (site?.origin ?? new URL(request.url).origin).replace(/\/$/, '');

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createFetchHttpClient(), // Cloudflare Workers: fetch statt node:http
  });

  try {
    const sitzung = await stripe.checkout.sessions.create({
      mode: angebot.modus ?? 'payment',
      line_items: [{ price: angebot.preis, quantity: menge }],
      success_url: `${basis}/danke?sitzung={CHECKOUT_SESSION_ID}`,
      cancel_url: `${basis}/abgebrochen`,
      locale: 'de',
      // Nur einschalten, wenn der Kunde im Zielland registriert ist (53-…, Abschnitt 5).
      automatic_tax: { enabled: env.STRIPE_STEUER === 'ja' },
      // Verweis auf die AGB. Verlangt eine hinterlegte URL der AGB im Stripe-Dashboard.
      consent_collection: { terms_of_service: 'required' },
      // Hinweis zur Zahlungspflicht neben dem Knopf (Button-Loesung, 53-…, Abschnitt 4).
      custom_text: {
        submit: { message: `Mit Klick auf den Knopf bestellen Sie zahlungspflichtig. Ihr Widerrufsrecht: ${basis}/widerruf` },
      },
      // Kennung zur Zuordnung im Webhook.
      client_reference_id: kennung,
      metadata: { angebot: kennung },
      // Ab API 2026-03-25.dahlia: Kennung mit 8 zufaelligen Buchstaben am Ende (53-…, Regel 9).
      // integration_identifier: `kasse-[[FEHLT: Name]]-abcdefgh`,
    });
    if (!sitzung.url) throw new Error('Keine Adresse der Sitzung');
    return Response.redirect(sitzung.url, 303);
  } catch (fehler) {
    console.error('Checkout-Sitzung fehlgeschlagen', fehler instanceof Error ? fehler.message : fehler);
    return antwort(502, { fehler: `Die Zahlung konnte nicht gestartet werden. ${KONTAKTWEG}` });
  }
};

function antwort(status: number, koerper: unknown) {
  return new Response(JSON.stringify(koerper), { status, headers: { 'content-type': 'application/json' } });
}

/** Origin oder Referer muessen zur eigenen Domain gehoeren. */
function herkunftErlaubt(request: Request, site: URL | undefined) {
  const eigene = new Set([new URL(request.url).host]);
  if (site) eigene.add(site.host);
  const quelle = request.headers.get('origin') ?? request.headers.get('referer');
  if (!quelle) return false;
  try {
    return eigene.has(new URL(quelle).host);
  } catch {
    return false;
  }
}

async function turnstileGueltig(token: string, geheim: string, ip?: string) {
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret: geheim, response: token, remoteip: ip }),
  });
  return ((await res.json()) as { success: boolean }).success === true;
}
