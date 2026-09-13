# Projektstruktur (Astro als Referenzstack)

Der bewährte Stack für Unternehmensseiten und Landingpages im DACH-Raum: **Astro, statisch
gebaut, auf Cloudflare Pages oder Workers, mit GSAP für Animation und ohne CSS-Framework.**
Er ist schnell, ohne Laufzeitkosten pro Besuch, und der Code bleibt lesbar.

Die Prinzipien lassen sich auf Next.js, SvelteKit oder Nuxt übertragen; die Dateinamen nicht.

## Verzeichnisbaum

```
projekt/
├─ CLAUDE.md                  ← das wichtigste Dokument, siehe unten
├─ astro.config.mjs           ← site-URL, Sitemap, Prefetch
├─ .env.example               ← alle Variablen mit Zweck, ohne Werte
├─ public/
│  ├─ _headers                ← Security- und Cache-Header
│  ├─ _redirects              ← 301-Tabelle beim Relaunch
│  ├─ favicon.svg
│  ├─ sitemap.xsl             ← gebrandete Sitemap-Ansicht
│  ├─ fonts/                  ← selbst gehostete Schriften + Lizenzdateien
│  └─ images/
│     └─ BILDER.md            ← Herkunft, Rechte, Zuordnung jedes Motivs
├─ src/
│  ├─ layouts/
│  │  ├─ Base.astro           ← Head, Meta, OG, Consent-Default, Skip-Link, Kopf, Fuß
│  │  └─ Rechtstext.astro     ← schmales Layout für Impressum/Datenschutz
│  ├─ components/
│  │  ├─ Header.astro, Footer.astro, MobilNav.astro, ConsentBanner.astro
│  │  ├─ sektionen/           ← eine Datei je Sektion der Startseite
│  │  └─ ui/                  ← Button, Ueberschrift, Akkordeon, Feld, Icon
│  ├─ lib/                    ← Daten: fragen.ts, bewertungen.ts, marken.ts, produkte.ts
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ kontakt.astro
│  │  ├─ impressum.astro, datenschutz.astro     ← noindex
│  │  ├─ 404.astro
│  │  └─ robots.txt.ts        ← zur Bauzeit erzeugt, Domain aus der Konfiguration
│  ├─ scripts/
│  │  ├─ animationen.ts       ← GSAP, matchMedia, alles gebündelt
│  │  └─ consent.ts           ← Consent-Logik und echte Skriptblockierung
│  └─ styles/
│     ├─ tokens.css           ← alle Designtokens, kommentiert
│     └─ global.css           ← Reset, Basistypografie, Helferklassen
├─ functions/ | src/pages/api/ ← Serverrouten (Formular, externe APIs)
└─ scripts/                    ← Prüf- und Hilfsskripte (responsive-check, Bildpipeline)
```

## `CLAUDE.md`: das wichtigste Dokument

Nicht eine Beschreibung, **was** gebaut ist, sondern **warum**. Das ist der Unterschied
zwischen einer Datei, die hilft, und einer, die jede Sitzung neu ignoriert wird.

Bewährte Gliederung:

```markdown
# Projektname
## Kunde und Ziel: wer, für wen, primäre und sekundäre Conversion
## Stack und Befehle: Technik, alle Befehle zum Kopieren, Fallstricke
## Deployment und Bindings: Hoster, Buildbefehl, Ausgabeverzeichnis, Variablen
## Seitenstruktur: Tabelle Pfad → Zweck, Sprungziele
## Designsystem: Farben mit Herkunft und Kontrastwerten, Schrift, Maß
## Komponenten: je Datei ein Satz: was sie tut und warum so
## Formulare und Datenfluss
## Umgebungsvariablen: was passiert, wenn sie fehlt
## Consent und Dienste
## Offene Punkte: jede Lücke, sichtbar
## Änderungsverlauf: was, warum, wie geprüft
```

Zwei Regeln, die den Unterschied machen:

1. **Jede ungewöhnliche Entscheidung bekommt ihren Grund direkt daneben.** „Kein
   `loading="lazy"` auf dieser Seite, weil …" verhindert, dass die nächste Sitzung es
   „repariert".
2. **Der Änderungsverlauf nennt, womit geprüft wurde.** „Build grün, Playwright-Durchlauf
   auf 1280 und 390 px, Kontrast geprüft" ist überprüfbar; „funktioniert" nicht.

## Basis-Layout

`Base.astro` trägt alles, was auf jeder Seite gleich ist. Props: `titel`, `beschreibung`,
`ogBild`, `noindex`, `vorladeBild`. Vollständige Vorlage:
`../assets/vorlagen/head-meta.html`.

Der Aufbau des `<body>`:

```html
<a class="sprunglink" href="#hauptinhalt">Zum Inhalt springen</a>
<div class="kopf-gruppe" data-kopf-gruppe> … Topbar + Header … </div>
<MobilNav />                                   <!-- Geschwister, nicht Kind, siehe 02 -->
<main id="hauptinhalt" tabindex="-1"><slot /></main>
<Footer />
<ConsentBanner />
```

## Konfiguration

```js
// astro.config.mjs (gekürzt)
export default defineConfig({
  site: domainPruefen(process.env.PUBLIC_SITE_URL),   // Fallback auf die Vorschaudomain
  output: 'static',
  integrations: [
    sitemap({
      xslURL: '/sitemap.xsl',
      // noindex-Seiten gehören nicht in die Sitemap
      filter: (s) => !s.includes('/impressum') && !s.includes('/datenschutz'),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  build: { inlineStylesheets: 'auto' },
});
```

**Die Domain kommt aus einer Variablen**, nie aus einem hart kodierten String. Sie steuert
canonical, Open Graph, Sitemap und `robots.txt` gleichzeitig. Ein Fallback auf die
Vorschaudomain sorgt dafür, dass ein frischer Deploy trotzdem gültige absolute URLs
ausliefert.

## Serverrouten

Für Formularempfang und API-Zugriffe mit Schlüsseln. Zwei Bauformen, je nach Ziel:

- **Cloudflare Pages Functions** (`functions/api/*.ts`): Einstieg `onRequestPost`,
  Variablen aus `context.env`, Astros Schutz gegen Cross-Site-Anfragen greift dort **nicht**
 : eine eigene Origin-Prüfung ersetzt ihn.
- **Astro-Serverrouten** (`src/pages/api/*.ts` mit `prerender = false`, Adapter nötig):
  Einstieg `POST`, Variablen über `import.meta.env` bzw. `cloudflare:workers`.

In beiden Fällen gilt die Formular-Checkliste aus `06-conversion-architektur.md`:
Honigtopf, Zeitfeld, Origin-Prüfung, Rate-Limit, serverseitige Validierung, zwei Mails,
Escaping bei jeder Rückgabe.

## Wiederkehrende Fallstricke

- **Dynamisch per `innerHTML` erzeugte Elemente bekommen kein Scoping-Attribut.** Astros
  `data-astro-cid-…` landet nur auf Markup, das zur Bauzeit existiert. Selektoren, die
  dynamisch erzeugte Knoten treffen, gehören vollständig in `:global()`. Der Fehler fällt
  optisch oft nicht auf, weil der Block-Fallback zufällig lesbar bleibt: prüfbar nur über
  `getComputedStyle().display`.
- **Jede Ausgabe von Nutzereingaben escapen.** Name, Adresse, Artikelbezeichnung in einem
  Template-Literal sind der direkte Weg zu gespeichertem XSS.
- **Nach Änderungen an `astro.config.mjs`, `tsconfig.json` oder `wrangler.toml`** den
  Dev-Server neu starten und `node_modules/.vite` löschen.
- **Das Ausgabeverzeichnis muss stimmen** (`dist`). Steht dort etwas anderes, liefert der
  Hoster keine `index.html` und jede Adresse antwortet mit 404.
- **Keine erfundenen Binding-IDs** in der Konfiguration. Ein Binding mit ungültiger ID lässt
  den Deploy abbrechen; lieber auskommentiert lassen und im Dashboard setzen.

## Prüfskripte, die sich lohnen

Kleine Playwright-Skripte im Projekt, nicht im Kopf:

| Skript | Prüft |
|---|---|
| `responsive-check.mjs` | Screenshots auf allen fünf Breakpoints, horizontale Scrollleiste |
| `interaktion-check.mjs` | Tastaturdurchlauf, Menü, Consent, Formular |
| `a11y-check.mjs` | axe-core über die Hauptseiten |

Sie laufen gegen die Vorschau (`wrangler pages dev dist` bzw. `astro preview`) und finden
genau die Fehler, die ein Screenshot nicht zeigt.

## Bilder- und Rechtedokumentation

`public/images/BILDER.md` führt je Motiv: Herkunft, Rechteinhaber, Freigabestatus, Verwendung
und Besonderheiten (eingebrannter Text, KI-generiert). Vor dem Livegang ist diese Datei die
Checkliste für die Bildrechte, und sie verhindert, dass eine KI-Illustration versehentlich
als Produktbeleg durchgeht.
