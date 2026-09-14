# Stack und Deployment

Die Dateistruktur, das Basislayout, die Astro-Konfiguration und die wiederkehrenden
Fallstricke stehen in `../../webdesign-conversion/references/14-projektstruktur-astro.md`.
Dieses Kapitel ergänzt, was im Agenturprojekt festgeschrieben ist: Runtime, Cloudflare
Bindings, Umgebungsvariablen, Git und Performancebudget.

## Runtime

Neue Projekte: Node 24 LTS und pnpm. Festschreiben in `.nvmrc`, in `engines` und in
`packageManager`:

```json
{
  "packageManager": "pnpm@10.0.0",
  "engines": { "node": ">=24 <25" }
}
```

Bestehende Projekte folgen ihrer vorhandenen Lockdatei. Läuft dort npm mit
`package-lock.json`, bleibt es bei npm. Niemals zwei Lockdateien nebeneinander erzeugen, das
bricht den Cloudflare Build ohne verständliche Fehlermeldung. Lokal, CI und Cloudflare Pages
müssen dieselbe Node Major Version nutzen, in Cloudflare über die Umgebungsvariable
`NODE_VERSION`.

## Astro Konfiguration

Standard ist ein statischer Build mit einzelnen Serverrouten für Formular, Bewertungen und
Dashboard. Dafür der Cloudflare Adapter, alles andere bleibt vorgerendert:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://vorschau.pages.dev',
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [
    sitemap({
      xslURL: '/sitemap.xsl',
      filter: (s) => !s.includes('/impressum') && !s.includes('/datenschutz') && !s.includes('/dashboard'),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  build: { inlineStylesheets: 'auto' },
});
```

Die Domain kommt aus einer Variablen, nie aus einem hart kodierten String. Sie steuert
canonical, Open Graph, Sitemap und `robots.txt` gleichzeitig.

Seiten, die serverseitig laufen müssen, bekommen `export const prerender = false`. Das gilt
für die Formularroute, den Bewertungsabruf und das Dashboard, nicht für den Rest. Seiten mit
`noindex` gehören nicht in die Sitemap, sonst widersprechen sich Sitemap und Seitenkopf.

## Build und Deployment

Immer im Repo hinterlegen, damit Cloudflare Pages ohne Rückfragen baut:

| Einstellung | Wert |
| --- | --- |
| Buildbefehl | `pnpm build` oder `npm run build` |
| Ausgabeverzeichnis | `dist` |
| Node Version | über `NODE_VERSION` setzen |

`wrangler.toml` für Bindings, ohne Geheimnisse:

```toml
name = "kundenprojekt"
compatibility_date = "2026-08-01"
pages_build_output_dir = "dist"

# Cache fuer den Bewertungsabruf, in jedem Projekt
[[kv_namespaces]]
binding = "REVIEWS_CACHE"
id = "wird_in_cloudflare_angelegt"

# Rate Limit der Formularroute, in jedem Projekt mit Formular
[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "wird_in_cloudflare_angelegt"

# nur bei bestaetigtem Leadsystem
[[d1_databases]]
binding = "DB"
database_name = "kundenprojekt-leads"
database_id = "wird_in_cloudflare_angelegt"
```

Bindings gehören in die Konfiguration, Schlüssel und Passwörter ausschließlich in die
Cloudflare Umgebungsvariablen als Secret. Nie in das Repository, nie in eine `.env`, die
eingecheckt wird.

Keine erfundenen Binding-IDs eintragen. Ein Binding mit ungültiger ID lässt den Deploy
abbrechen. Lieber auskommentiert lassen und im Dashboard setzen.

## Umgebungsvariablen

Immer `.env.example` pflegen, mit Namen und Zweck, ohne Werte:

```
PUBLIC_SITE_URL=             # echte Domain, steuert canonical, OG, Sitemap, robots.txt
RESEND_API_KEY=              # Versand der Formularmails
MAIL_TO=                     # interne Empfängeradresse des Kunden
MAIL_FROM=                   # verifizierte Absenderdomain bei Resend
TURNSTILE_SECRET_KEY=        # serverseitige Prüfung
PUBLIC_TURNSTILE_SITE_KEY=   # Widget im Frontend
GOOGLE_PLACES_API_KEY=       # Bewertungsabruf, liegt bei der Agentur
PUBLIC_GOOGLE_PLACE_ID=      # Place ID des Kundenstandorts
PUBLIC_GTM_ID=               # Google Tag Manager, optional
PUBLIC_META_PIXEL_ID=        # nur bei Kampagnenseiten
DASHBOARD_BENUTZER=          # nur bei Leadsystem
DASHBOARD_PASSWORT_HASH=     # nur bei Leadsystem, niemals Klartext
DASHBOARD_SESSION_SECRET=    # nur bei Leadsystem, signiert das Sitzungscookie
```

Alles, was der Browser sehen darf, bekommt das Präfix `PUBLIC_`. Alles ohne dieses Präfix
darf niemals in eine Clientkomponente gelangen. Vor dem Abschluss prüfen:

```bash
grep -rn "PUBLIC_\|API_KEY\|SECRET" src/
grep -rn "sk_\|api_key\|API_KEY\|password" dist/
```

Der zweite Aufruf ist der wichtigere: er sucht im gebauten Ergebnis, nicht in der Quelle. Ein
Schlüssel, der es bis in `dist/` schafft, ist bereits ausgeliefert.

Zusätzlich gilt: eine fehlende Variable darf die Seite nicht still kaputt machen. Jede
Serverroute prüft ihre Variablen beim Eintritt und antwortet mit einer verständlichen
Fehlermeldung samt alternativem Kontaktweg, statt einen leeren 500er zu liefern. In der
`CLAUDE.md` steht je Variable, was passiert, wenn sie fehlt.

## Git

* Branch ist immer `main`. Keine Featurebranches, kein Pull Request, außer der Nutzer
  verlangt es ausdrücklich.
* Erst committen, wenn der Build lokal durchläuft.
* Commitnachrichten auf Deutsch, knapp und im Imperativ, zum Beispiel
  `Heldenbereich und Leistungssektion ergänzt`.
* Vor jedem Push prüfen, ob `.env` und `.relaunch-inventory/` in der `.gitignore` stehen.
  `.claude/skills/` gehört bewusst ins Repository, wird aber von Suchen ausgenommen.
* Push nur, wenn der Nutzer ihn anfordert.

## Performance Budget

Cloudflare ist schnell, das entbindet nicht von Sorgfalt. Die Zielwerte aus
`../../webdesign-conversion/references/03-technik-performance.md` gelten, hier die
Umsetzungsregeln:

* JavaScript im Erstaufruf unter 100 Kilobyte komprimiert, GSAP eingerechnet
* Bilder als AVIF oder WebP über Astros `<Image />`, mit `width` und `height` gegen
  Layoutsprünge. Normale Bilder höchstens 200 Kilobyte, Heldenbilder höchstens 500 Kilobyte
* Heldenbild `loading="eager"` und `fetchpriority="high"`, alles darunter `loading="lazy"`
* Schriften als WOFF2 aus `public/fonts/`, `font-display: swap`, passendes `size-adjust`,
  nur die tatsächlich genutzten Schnitte, nie über ein fremdes CDN
* keine Bibliothek für etwas, das drei Zeilen eigener Code lösen
* Security- und Cache-Header aus `../../webdesign-conversion/assets/vorlagen/_headers`
  übernehmen und an das Projekt anpassen
