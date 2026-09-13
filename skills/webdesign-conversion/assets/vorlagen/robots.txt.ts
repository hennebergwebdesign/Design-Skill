/**
 * Astro: robots.txt zur Bauzeit erzeugen, damit die Sitemap-Adresse immer zur
 * konfigurierten Domain passt (astro.config.mjs → site aus PUBLIC_SITE_URL) und
 * nicht auf eine alte Vorschaudomain zeigt.
 *
 * Ablegen als: src/pages/robots.txt.ts
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  const inhalt = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(inhalt, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
