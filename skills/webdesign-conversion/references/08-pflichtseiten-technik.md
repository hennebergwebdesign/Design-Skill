# Pflichtseiten und technische Basisdateien

Diese Dateien entstehen **am Anfang** des Projekts, nicht am Ende. Am Ende werden sie
vergessen oder halbherzig nachgeschoben — und genau sie fallen beim ersten Search-Console-
Bericht und bei der ersten Abmahnwelle auf.

## Vollständigkeitsliste

| Datei / Seite | Pflicht | Vorlage |
|---|---|---|
| `/impressum` | ja (§ 5 DDG) | `../assets/vorlagen/impressum.md` |
| `/datenschutz` | ja (Art. 13 DSGVO) | `../assets/vorlagen/datenschutz.md` |
| Cookie-Einstellungen (Footer-Link) | sobald einwilligungspflichtige Dienste laufen | `../assets/vorlagen/consent-muster.md` |
| `/404` | faktisch ja | `../assets/vorlagen/404.astro` |
| `robots.txt` | ja | `../assets/vorlagen/robots.txt` |
| `sitemap.xml` / `sitemap-index.xml` | ja | Integration, siehe unten |
| `sitemap.xsl` | optional, empfohlen | `../assets/vorlagen/sitemap.xsl` |
| `_headers` / Security-Header | ja | `../assets/vorlagen/_headers` |
| `_redirects` / 301-Tabelle | bei jedem Relaunch | siehe unten |
| `favicon.svg`, `apple-touch-icon.png` | ja | — |
| OG-Bild 1200 × 630 | ja | — |
| `/agb`, `/widerruf` | bei Verkauf an Verbraucher | — |

## Die 404-Seite

Eine 404-Seite ist kein Fehlerbildschirm, sondern die letzte Chance, den Besucher zu halten.

**Anforderungen:**

- Sie liefert wirklich **HTTP-Status 404**, nicht 200. Eine „Soft-404" (Statuscode 200 mit
  Fehlertext) lässt Google die Seite indexieren und verwässert die Domain. Bei statischen
  Hosts prüfen: Cloudflare Pages und Netlify liefern `404.html` korrekt aus, manche
  SPA-Konfigurationen mit Catch-All-Rewrite nicht.
- Sie trägt dieselbe Navigation, denselben Kopf und Fuß wie die übrige Seite.
- Sie erklärt in einem Satz, was passiert ist — im Tonfall der Marke, ohne Entschuldigungs-
  arie.
- Sie bietet **konkrete Wege weiter**: Startseite, wichtigste Leistungsseite, Kontakt, ggf.
  Suche. Keine Sackgasse, keine externen Links.
- Sie trägt `noindex`.
- Sie ist genauso schnell und barrierefrei wie der Rest.

**Was nicht hineingehört:** ein riesiges Fehlerbild ohne Ausweg, technische Fehlercodes,
Humor, der die Ratlosigkeit verlängert, automatische Weiterleitung nach X Sekunden (nimmt
die Kontrolle und verwirrt Screenreader).

Vorlage: `../assets/vorlagen/404.astro` (Astro) — das Muster lässt sich direkt auf Next.js
(`app/not-found.tsx`) oder eine statische `404.html` übertragen.

## robots.txt

Zweck: Crawlern sagen, was sie dürfen, und wo die Sitemap liegt.

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.beispiel.de/sitemap-index.xml
```

Regeln:

- Die **Sitemap-Adresse ist absolut** und zeigt auf die echte Domain. Der häufigste Fehler:
  eine hart kodierte Vorschaudomain (`*.pages.dev`), die nach dem Livegang stehen bleibt.
  Lösung: `robots.txt` zur Bauzeit erzeugen und die Domain aus der Konfiguration ziehen
  (siehe Vorlage `../assets/vorlagen/robots.txt.ts`).
- **`Disallow` ist keine Zugriffssperre** und kein `noindex`. Eine per `Disallow` gesperrte
  Seite kann trotzdem im Index landen, wenn sie verlinkt ist — dann sogar ohne Snippet.
  Wer eine Seite aus dem Index halten will, nutzt `noindex` und lässt sie crawlen.
- Interne Bereiche, Vorschau-Umgebungen und Staging-Domains gehören zusätzlich per
  HTTP-Auth oder `X-Robots-Tag: noindex` geschützt.
- In `public/` abgelegte Dateien sind öffentlich. Nichts Vertrauliches dort ablegen.

## Sitemap

- **Automatisch erzeugen**, nicht pflegen. In Astro über `@astrojs/sitemap`, in Next über
  `app/sitemap.ts`, in WordPress über Yoast/Rank Math.
- Sie enthält **nur indexierbare Seiten**. Seiten mit `noindex` (Impressum, Datenschutz,
  Danke-Seiten, interne Bereiche) werden ausgefiltert. Stehen sie drin, meldet die Search
  Console „Übermittelte URL als ‚noindex' gekennzeichnet".
- URLs sind absolut, kanonisch und erreichbar (Status 200), keine Weiterleitungsketten.
- `lastmod` nur setzen, wenn es stimmt. Ein täglich neu gesetztes `lastmod` ohne Änderung
  ist ein Vertrauensverlust.
- Nach dem Livegang in der Google Search Console und der Bing Webmaster-Zentrale einreichen.

**Sitemap im Browser lesbar machen:** ein XSL-Stylesheet macht aus der nackten XML-Liste eine
gestaltete Tabelle. Crawler ignorieren die Verarbeitungsanweisung, für Menschen ist es
deutlich lesbarer. Vorlage: `../assets/vorlagen/sitemap.xsl`, eingebunden über die
`xslURL`-Option der Sitemap-Integration. Beim statischen Hosting braucht die `.xsl` zusätzlich
den richtigen Content-Type im Header (`application/xslt+xml`).

## Weiterleitungen beim Relaunch

Jede URL, die sich ändert, braucht eine **301**. Ohne sie geht das Ranking der alten Seite
verloren und Besucher aus alten Links, Mails und Verzeichnissen landen im Nichts.

**Vorgehen:**

1. Alte URLs sammeln: alte Sitemap, Search Console („Seiten" → indexiert), Analytics-Top-100,
   ein Crawl der alten Seite (Screaming Frog o. ä.).
2. Tabelle `alt → neu` bauen. Jede alte URL bekommt ein Ziel mit **inhaltlich passendem**
   Inhalt. Pauschal alles auf die Startseite umzuleiten wertet Google als Soft-404.
3. Umsetzen: `public/_redirects` (Cloudflare Pages, Netlify), `next.config.js` → `redirects()`,
   `.htaccess` (Apache), `nginx.conf`, oder Redirect-Plugin (WordPress).
4. Nach dem Livegang stichprobenhaft prüfen: Status muss 301 sein, nicht 302, und das Ziel
   direkt erreichbar — keine Kette 301 → 301 → 200.

```
# public/_redirects (Cloudflare Pages / Netlify)
/ueber-uns      /ueber                 301
/leistungen/*   /leistungen/:splat     301
/blog/*         /magazin/:splat        301
```

## Security-Header

Setzen, was ohne Risiko sofort geht:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

`Content-Security-Policy` ist der wirksamste Header und zugleich der, der eine Seite am
schnellsten zerlegt. Vorgehen: zuerst `Content-Security-Policy-Report-Only` mitlaufen lassen,
Verstöße sammeln, dann scharf schalten. Eine CSP, die Inline-Skripte pauschal per
`unsafe-inline` erlaubt, ist keine.

Dazu die Cache-Regeln, siehe Vorlage `../assets/vorlagen/_headers`: gehashte Build-Assets
und Schriften ein Jahr `immutable`, Bilder und Videos eine Woche, HTML kurz oder gar nicht.

## Kanonische Adresse und Domainvarianten

Eine Domain, eine Schreibweise. Alles andere wird per 301 dorthin geleitet:

- `http://` → `https://`
- `beispiel.de` → `www.beispiel.de` (oder umgekehrt, eine Entscheidung, konsequent)
- `/pfad/` und `/pfad` — eine Variante wählen
- Großschreibung in Pfaden vermeiden

Zusätzlich trägt jede Seite eine selbstreferenzierende, absolute `<link rel="canonical">`.

## Vorschau-Umgebungen

Vorschau-Deployments (`*.pages.dev`, `*.vercel.app`, Staging-Domains) sind eine
zuverlässige Quelle für Duplicate Content. Absichern über HTTP-Basic-Auth oder
`X-Robots-Tag: noindex` für die gesamte Vorschau-Domain — nicht über `robots.txt`, siehe oben.
