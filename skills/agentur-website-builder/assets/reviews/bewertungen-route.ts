/**
 * Google Bewertungen, serverseitig mit KV Cache. Kopieren nach src/pages/api/bewertungen.ts.
 *
 * Der Browser spricht nie mit Google. Cachelaufzeit 24 Stunden, danach frischer Abruf.
 * Bindings: KV Namespace REVIEWS_CACHE, Secret GOOGLE_PLACES_API_KEY, PUBLIC_GOOGLE_PLACE_ID.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const CACHE_SEKUNDEN = 60 * 60 * 24;
const CACHE_SCHLUESSEL = 'google-bewertungen';
const LETZTER_STAND = 'google-bewertungen-fallback';

type Bewertung = { autor: string; sterne: number; text: string; zeit: number; relativ: string };
type Ergebnis = { schnitt: number; anzahl: number; profil: string; bewertungen: Bewertung[]; stand: string };

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any).runtime?.env ?? import.meta.env;
  const kv = env.REVIEWS_CACHE;

  const zwischenspeicher = kv ? await kv.get(CACHE_SCHLUESSEL, 'json') : null;
  if (zwischenspeicher) return json(zwischenspeicher, 'treffer');

  try {
    const ergebnis = await abrufen(env);
    if (kv) {
      await kv.put(CACHE_SCHLUESSEL, JSON.stringify(ergebnis), { expirationTtl: CACHE_SEKUNDEN });
      await kv.put(LETZTER_STAND, JSON.stringify(ergebnis)); // ohne Ablauf, dient als Fallback
    }
    return json(ergebnis, 'frisch');
  } catch (fehler) {
    console.error('Bewertungsabruf fehlgeschlagen', fehler);
    const fallback = kv ? await kv.get(LETZTER_STAND, 'json') : null;
    if (fallback) return json(fallback, 'fallback');
    return new Response(JSON.stringify({ fehler: 'nicht verfügbar' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }
};

async function abrufen(env: any): Promise<Ergebnis> {
  const url = `https://places.googleapis.com/v1/places/${env.PUBLIC_GOOGLE_PLACE_ID}?languageCode=de`;
  const antwort = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
    },
  });
  if (!antwort.ok) throw new Error(`Places API ${antwort.status}: ${await antwort.text()}`);
  const daten = (await antwort.json()) as any;

  return {
    schnitt: Number(daten.rating ?? 0),
    anzahl: Number(daten.userRatingCount ?? 0),
    profil: daten.googleMapsUri ?? '',
    stand: new Date().toISOString(),
    bewertungen: (daten.reviews ?? []).map((r: any): Bewertung => ({
      autor: r.authorAttribution?.displayName ?? 'Google Nutzer',
      sterne: Number(r.rating ?? 0),
      text: (r.originalText?.text ?? r.text?.text ?? '').slice(0, 1200),
      zeit: Date.parse(r.publishTime ?? '') || 0,
      relativ: r.relativePublishTimeDescription ?? '',
      // Profilbilder bewusst nicht uebernehmen, sonst entsteht eine Verbindung zu Google
    })),
  };
}

function json(koerper: unknown, quelle: string) {
  return new Response(JSON.stringify(koerper), {
    headers: {
      'content-type': 'application/json',
      'cache-control': `public, max-age=600, s-maxage=${CACHE_SEKUNDEN}`,
      'x-cache': quelle,
    },
  });
}
