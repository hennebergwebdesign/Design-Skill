# Bereich 3: Technik & Performance

Eine Zahl, die man sich merken muss: **2 Sekunden.** Das ist die maximale Ladezeit. Rund
80 % aller Websites sind langsamer.

| Ladezeit | Absprungrate |
|---|---|
| 2 Sekunden | ~9 % |
| 3 Sekunden | ~38 % |
| 5 Sekunden | ~60 % |

Zielwerte für die Core Web Vitals: **LCP < 2,5 s**, **CLS < 0,1**, **INP < 200 ms**.

## Schritt 3.1: Die 2-Sekunden-Regel

Die häufigste Einzelursache: ein 5-MB-Foto, hochgeladen, „weil es so schön hochauflösend
ist". Niemand sieht den Unterschied zwischen 5 MB und 200 KB auf einer Website.

## Schritt 3.2: Bildoptimierung

Jedes Bild auf der Seite:

- **maximal 200 KB** für normale Bilder
- **maximal 500 KB** für Hero-Images
- **WebP oder AVIF** statt JPG/PNG
- **Lazy Loading** aktiviert (Ausnahmen siehe `02-design-ux.md`)
- `width` und `height` gesetzt, damit nichts springt

Werkzeuge: TinyPNG, ImageOptim, `sharp` im Build, `squoosh`. In Astro erledigt
`astro:assets` Größen und Format automatisch; bei Bildern aus `public/` bleibt es Handarbeit.

**Faustwerte aus der Praxis:** AVIF spart gegenüber WebP nochmals 20–40 % bei gleicher
Wahrnehmung, kostet aber Encodierzeit. Für Fotos AVIF, für Logos und Flächen SVG, für
Screenshots mit Text WebP (AVIF verwischt feine Schrift stärker).

## Schritt 3.3: Caching

Beim ersten Besuch wird die Seite im Browser gespeichert, beim zweiten lädt sie sofort.
Ohne Caching ist jeder Besuch ein kompletter Neuaufbau, mit Caching sind es rund 0,5 s.

**Statisch gehostet (Cloudflare Pages, Netlify, Vercel):** über eine `_headers`-Datei.
Gehashte Build-Assets und Schriften ein Jahr `immutable`, Bilder eine Woche, HTML kurz.
Vorlage: `../assets/vorlagen/_headers`.

**WordPress:** WP Rocket oder W3 Total Cache; zusätzlich Objektcache und ein CDN.

## Schritt 3.4: Die fünf Breakpoints

| Breite | Gerät |
|---|---|
| 375 px | Smartphone |
| 768 px | Tablet Hochformat |
| 1024 px | Tablet Querformat |
| 1440 px | Laptop L |
| 1920 px | Desktop FullHD |

**Der Test:** Seite öffnen, F12, „Toggle Device Toolbar", alle fünf durchgehen. Sieht es
überall gut aus? Sind Buttons klickbar? Texte lesbar? Elemente sichtbar? Wenn nicht: fix it.

Zusätzlich prüfen: **1366 × 768**, die häufigste Notebookauflösung und die Breite, an der
zu großzügige `clamp()`-Kurven zuerst auffallen. Und **niedrige Fensterhöhen**: ein
Heldenbereich mit `100svh` bei 720 px Fensterhöhe schneidet gern die CTAs ab.

Touchziele mindestens **44 × 44 px** mit mindestens 8 px Abstand.

## Schriften

- **Selbst hosten**, nicht von Google Fonts laden. Das spart eine DNS-Auflösung, eine
  Verbindung und die datenschutzrechtliche Diskussion (siehe `07-recht-dsgvo.md`).
- Nur die wirklich benutzten Schnitte ausliefern, `font-display: swap`.
- Die zwei wichtigsten Schnitte per `<link rel="preload" as="font" crossorigin>` ankündigen.
- Variable Fonts, wenn mehr als drei Schnitte einer Familie gebraucht werden.
- `size-adjust` nutzen, wenn die Fallback-Schrift deutlich anders läuft: das reduziert den
  Sprung beim Schriftwechsel.

## JavaScript

- Alles, was ohne JS gehen kann, geht ohne JS: Akkordeons als `<details>/<summary>`,
  Navigation als Liste, Formulare als echte Formulare.
- Schwere Medien (scrollgebundene Videos, Karten, Einbettungen) erst nach dem `load`-Ereignis
  einhängen, Quelle bis dahin in einem `data-`Attribut parken.
- Drittanbieter-Skripte sind der teuerste Teil jeder Seite. Jedes einzelne begründen; was
  nicht begründbar ist, fliegt raus.
- Bei `prefers-reduced-motion: reduce` und ohne JS bleibt die Seite vollständig.

### Wasserfälle und Bündelgröße

Aus den `react-best-practices` von Vercel ([vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills),
MIT) sind die Regeln übernommen, die nicht an React hängen. Die Quelle stuft Wasserfälle und
Bündelgröße als die zwei kritischsten Ursachen ein, weil sie jeden Besucher bei jedem Aufruf
treffen. Die React-spezifischen Kategorien (Re-Renders, Suspense, Server Components) bleiben
außen, sie haben im Astro-Standardstack keinen Inhalt.

| Regel | Umsetzung in Astro | Grund |
|---|---|---|
| Unabhängige Abrufe parallel | Im Frontmatter `await Promise.all([a(), b()])` statt zwei `await` hintereinander | Zwei Abrufe zu je 200 ms kosten nacheinander 400 ms, parallel 200 ms. Jeder Abruf wartet sonst auf einen, der ihn nicht braucht |
| Billige Bedingung zuerst, dann `await` | `if (!aktiv) return` vor dem Abruf, nicht danach | Wer den Abruf nicht braucht, soll ihn auch nicht bezahlen |
| Direkt importieren, keine Sammeldateien | `import Hero from '../komponenten/Hero.astro'` statt `import { Hero } from '../komponenten'` | Eine Sammeldatei zieht alles, was darin steht, in das Bündel, auch was die Seite nie zeigt |
| Schweres erst bei Bedarf | Inseln mit `client:visible` oder `client:idle` statt `client:load`, schwere Bibliotheken per `import()` beim Klick | Der Besucher bezahlt für die Karte erst, wenn er sie sieht. Hängt mit „Schwere Medien erst nach `load`" oben zusammen |
| Vorladen auf Verdacht | `data-astro-prefetch="hover"` an internen Links | Zwischen Hover und Klick vergehen oft 100 bis 300 ms, die die nächste Seite schon laden kann |

**Gemessen ist das hier nicht.** Die Reihenfolge der Quelle ist eine Gewichtung der Autoren, kein
Messwert dieser Agentur. Wo es zählt, zeigt Lighthouse, ob ein Wasserfall im Netzwerkdiagramm
steht.

## Hosting und Auslieferung

- HTTP/2 oder HTTP/3, Brotli-Kompression, TLS erzwungen.
- Security-Header setzen: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`,
  `Permissions-Policy` mit leeren Erlaubnislisten für Geolocation, Mikrofon, Kamera,
  `Strict-Transport-Security`. Vorlage: `../assets/vorlagen/_headers`.
- Ein CDN vor den statischen Dateien. Bei einem statisch gebauten Astro-Projekt ist das der
  Normalfall, nicht die Ausnahme.

## Messen, nicht raten

| Werkzeug | Wofür |
|---|---|
| Lighthouse / PageSpeed Insights | Gesamtbild, Labordaten |
| Chrome DevTools → Performance | Wo genau die Zeit hingeht |
| WebPageTest | Wasserfall, echte Verbindungsprofile |
| Search Console → Core Web Vitals | Felddaten echter Besucher |

Felddaten schlagen Labordaten. Ein Lighthouse-Score von 100 bei 2 s Feld-LCP ist ein
Problem, kein Erfolg.
