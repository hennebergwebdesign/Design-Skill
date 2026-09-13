# Playbook: Homepage

Eine vollständige Unternehmenswebsite. Mehrere Zielgruppen, mehrere Absichten, organische
Sichtbarkeit als tragende Quelle.

**Der Unterschied zur Landingpage:** Hier ist Navigation Pflicht, nicht Fehler. Besucher
kommen aus der Suche mit verschiedenen Absichten und müssen sich orientieren können. Die
Aufgabe ist nicht, einen Weg zu erzwingen, sondern den richtigen Weg naheliegend zu machen.

## Reihenfolge

```
Strategie → Struktur → Copy → Design → Bau → Test → Launch → Pflege
```

Vollständig mit Artefakten je Phase: `../references/00-fahrplan.md`.

## Phase 1: Strategie

**Artefakt:** `marke-brief.md` und `marke.json`, Abschnitte 1 bis 6 gefüllt.

Ohne Zielgruppe, Kernproblem und USP wird nicht gestaltet. Das ist die erste harte Grenze
aus `../SKILL.md`. Formeln in `../references/01-strategie-positionierung.md`.

**Bei mehreren Zielgruppen:** eine ist die primäre. Die Startseite gehört ihr, die anderen
bekommen eigene Unterseiten. „Wir helfen allen" spricht niemanden an.

## Phase 2: Struktur

**Artefakt:** Seitenbaum plus Sektionsliste der Startseite.

### Seitenbaum, typischer Umfang

```
/                        Startseite
/leistungen              Übersicht
/leistungen/[thema]      je Leistung eine Seite, das ist die SEO-Substanz
/referenzen              Übersicht
/referenzen/[projekt]    je Projekt eine Seite mit Ausgangslage, Vorgehen, Ergebnis
/ueber-uns               Vertrauen, nicht Firmengeschichte
/kontakt                 Formular, Anfahrt, Zeiten
/impressum               Pflicht nach § 5 DDG
/datenschutz             Pflicht
/404                     eigene Seite, nicht die des Hosters
```

**Eine Seite je Leistung, nicht eine Seite mit allen.** Das ist die wichtigste
Strukturentscheidung: nur so kann jede Leistung für ihre eigenen Suchbegriffe ranken und eine
eigene Anfrage erzeugen (`../references/05-seo-sichtbarkeit.md`).

**Die 3-Klick-Regel** gilt für jede wichtige Information
(`../references/02-design-ux.md`).

### Startseite, Sektionsliste

| # | Sektion | Zweck | Pflicht |
|---|---|---|---|
| 1 | Held | Zielgruppe, Problem, Lösung, Primär-CTA, ein Trust-Signal | ja |
| 2 | Trust-Leiste | Logos, Bewertung mit Stand, Zahlen | ja |
| 3 | Problem | das Kernproblem in den Worten der Zielgruppe | ja |
| 4 | Leistungen | 3 bis 6, jede verlinkt auf ihre eigene Seite | ja |
| 5 | Warum wir | der USP, mit Beweis | ja |
| 6 | Referenzen | 2 bis 3 Fälle, verlinkt auf die Detailseiten | ja |
| 7 | Ablauf | 3 bis 6 Schritte von der Anfrage bis zum Ergebnis | ja |
| 8 | Stimmen | Kundenstimmen mit Name, Funktion, Unternehmen | ja |
| 9 | Fragen | 6 bis 10, jede mit echter Antwort, plus `FAQPage`-JSON-LD | ja |
| 10 | CTA-Block | Formular oder direkter Weg zum Kontakt | ja |
| 11 | Fuß | Navigation, Kontakt, Pflichtlinks | ja |

**Die Startseite trägt so viele Trust-Elemente wie möglich**, und sie wiederholen sich auf
Unterseiten (`../references/06-conversion-architektur.md`).

**Navigation:** Leistungen, Referenzen, Ablauf oder Über uns, Kontakt. Sticky, mit den drei
Details aus `../references/02-design-ux.md` (Ausblenden beim Runterscrollen, immer sichtbar
unter dem Mobil-Breakpoint, Off-Canvas-Panel außerhalb transformierter Elemente).

## Phase 3: Copy

**Artefakt:** Copy-Dokument je Seite, Vorschläge mit `data-copy-vorschlag` markiert.

Volles Programm aus `../references/12-copywriting.md`. Für diesen Typ besonders:

- **Above the Fold entscheidet in 3 bis 5 Sekunden.** Die vier Fragen aus
  `../references/02-design-ux.md` müssen ohne Scrollen beantwortet sein
- **Keine Gedankenstriche** (harte Grenze)
- **Meta-Titel je Seite einmalig**, Trenner ist `|` oder ein Doppelpunkt
  (`../references/05-seo-sichtbarkeit.md`)
- **Die Über-uns-Seite baut Vertrauen, sie erzählt keine Firmengeschichte.** Sechs Schritte in
  `../references/06-conversion-architektur.md`
- **Verbotsliste** aus `marke.json`

## Phase 4: Design

Zwei Durchgänge aus `../references/10-visuelle-richtung.md`: erst der Plan (Farbe,
Typografie, Layout, drei Prinzipien), dann die Prüfung gegen den Brief. Erst danach Code.

- **Tokens vor Komponenten.** `../assets/vorlagen/tokens.css` als Ausgangspunkt, Werte
  ersetzen, Kommentare behalten
- **Spacing-Ebenen trennen** (`../references/15-spacing-rhythmus.md`): Sektion, Block,
  Komponente. Nicht mischen, sonst heben sich `.sektion` und `.cta` gegenseitig auf
- **Container Queries für Karten** (`../references/16-responsive-container.md`), Media
  Queries nur für Navigation, Seitenränder und Typoskala
- **Icons ableiten** (`../references/17-icons-eigenes-system.md`): eigenes Set für die
  Leistungssektion, Bibliothek für Systemicons
- **Der eine orchestrierte Moment** ist hier die Heldensequenz beim Laden
  (`../references/18-motion-handschrift.md`). Nicht zusätzlich an jeder Sektion

## Phase 5: Bau

Projektstruktur und Referenzstack: `../references/14-projektstruktur-astro.md`.

- [ ] Projekt-`CLAUDE.md` mit den Regeln **und ihren Gründen**
- [ ] Tokens und globale Basis eingebaut, keine rohen Werte in Komponenten
- [ ] Ein Container (`.inhalt`), kein `max-width` je Sektion
- [ ] Ein Primär-CTA-Text auf der ganzen Seite, mindestens zweimal je Seite
- [ ] Formular mit 3 bis 5 Feldern, vier Zustände, Spamschutz, doppelte Mail
- [ ] Skip-Link, Fokusringe sichtbar, Tastatur vollständig
- [ ] Bilder mit `width`/`height`, WebP oder AVIF, unter 200 KB (Held unter 500 KB)
- [ ] Schriften selbst gehostet, nur genutzte Schnitte, zwei per `preload`
- [ ] Consent blockiert echt, nicht kosmetisch (`../references/07-recht-dsgvo.md`)
- [ ] Impressum, Datenschutz, 404, `robots.txt`, Sitemap, Security-Header
      (`../references/08-pflichtseiten-technik.md`)
- [ ] `Organization` plus `LocalBusiness` plus `FAQPage`-JSON-LD
      (`../assets/vorlagen/jsonld-bausteine.md`)
- [ ] Interne Verlinkung: jede Leistungsseite verlinkt auf verwandte und auf Kontakt

## Phase 6: Test

```bash
node scripts/pruefe-striche.mjs
node scripts/pruefe-tokens.mjs
node scripts/pruefe-kontrast.mjs
node scripts/pruefe-platzhalter.mjs
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
```

Volle Liste: `../assets/checklisten/pre-launch.md`. Von Hand zusätzlich:

- **Der Fremden-Test:** Startseite öffnen, nicht scrollen, jemandem fünf Sekunden zeigen.
  Was macht die Firma? Für wen? Was ist der nächste Schritt?
- **Tastaturdurchlauf** über die ganze Seite, inklusive Mobilmenü
- **Ladezeit gemessen**, Felddaten nach dem Livegang aus der Search Console
- **Alle fünf Breakpoints plus 1366 × 768 plus niedrige Fensterhöhe**
- **`prefers-reduced-motion` umschalten**, alles sichtbar und an der richtigen Stelle
- **JavaScript aus**, Seite vollständig lesbar und bedienbar

## Phase 7: Launch und Pflege

- [ ] Alle `[[FEHLT: …]]` aufgelöst oder Element entfernt
- [ ] Alle `data-copy-vorschlag` entfernt
- [ ] Rechtstexte anwaltlich geprüft
- [ ] Schriftlizenzen und Logo-Nutzungsrechte geklärt
- [ ] 301-Weiterleitungen von alten URLs eingerichtet und geprüft
- [ ] GA4 mit Conversion-Zielen, Heatmap (`../references/13-messung-optimierung.md`)
- [ ] Search Console verifiziert, Sitemap eingereicht

**Eine Website ist nie fertig.** Monatliches Review mit Anfragen, Core Web Vitals,
Suchbegriffen und Heatmap-Auffälligkeiten. Ohne Pflege ist der Launch der Anfang des
Verfalls, nicht das Ende des Projekts.

## Drei Fehler, die genau bei diesem Typ passieren

1. **Eine Seite mit allen Leistungen statt einer Seite je Leistung.** Kostet die gesamte
   organische Sichtbarkeit für die einzelnen Leistungen und macht jede Anfrage unspezifisch.
2. **Die Startseite redet über das Unternehmen.** Die Ich-Ich-Ich-Falle. Der Besucher sucht
   nach seinem Problem, nicht nach eurer Geschichte.
3. **Die Über-uns-Seite ist eine Chronik.** Sie ist der zweitstärkste Vertrauensbaustein nach
   den Referenzen, und sie wird verschenkt.
