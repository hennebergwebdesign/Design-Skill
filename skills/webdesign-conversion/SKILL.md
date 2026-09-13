---
name: webdesign-conversion
description: Vollständiges System für conversion-orientiertes Webdesign im DACH-Raum. Deckt Strategie und Positionierung, Design und UX, Technik und Performance, Barrierefreiheit (BFSG/WCAG 2.2 AA), SEO, Conversion-Architektur, Motion mit GSAP, Komponenten mit shadcn/ui sowie den rechtlichen und technischen Pflichtaufbau ab (Impressum, Datenschutzerklärung, Consent, 404-Seite, robots.txt, Sitemap, Weiterleitungen, Security-Header). Nutze diesen Skill beim Planen, Bauen, Überarbeiten oder Prüfen einer Website oder Landingpage, bei Fragen zu Ladezeit, Above the Fold, CTA, Formularen, Trust-Elementen, Meta-Titeln, interner Verlinkung, Designtokens, Animationen oder Rechtstexten.
license: MIT
metadata:
  author: Henneberg Webdesign
  version: 1.0.0
---

# Webdesign Conversion System

Eine Website ist entweder ein Vertriebs-Asset oder eine teure Dekoration. Dazwischen gibt es
nichts. Dieser Skill baut die erste Variante: eine Seite, die qualifizierte Anfragen erzeugt,
rechtssicher ist und technisch trägt.

**Kernsatz für jede Entscheidung:** Design ohne Strategie ist Dekoration. Technik ohne
Conversion-Logik ist eine schöne Sackgasse. Erst wenn alle sechs Bereiche ineinandergreifen,
arbeitet die Seite.

## Die sechs Bereiche

| # | Bereich | Entscheidende Frage | Referenz |
|---|---------|--------------------|----------|
| 1 | Strategie & Positionierung | Wer ist die Zielgruppe, was ist das Versprechen, warum du? | `references/01-strategie-positionierung.md` |
| 2 | Design & User Experience | Versteht ein Fremder in 3–5 Sekunden, worum es geht? | `references/02-design-ux.md` |
| 3 | Technik & Performance | Unter 2 s Ladezeit, auf allen fünf Breakpoints? | `references/03-technik-performance.md` |
| 4 | Barrierefreiheit | Kann jeder die Seite nutzen, hält sie dem BFSG stand? | `references/04-barrierefreiheit-bfsg.md` |
| 5 | SEO & Sichtbarkeit | Findet Google sie, versteht Google sie? | `references/05-seo-sichtbarkeit.md` |
| 6 | Conversion-Architektur | Wird aus Besuch eine Anfrage? | `references/06-conversion-architektur.md` |

Die meisten Agenturen bedienen ein oder zwei davon. Webdesigner Bereich 2, SEO-Agenturen
Bereich 5, IT-Dienstleister Bereich 3. Genau daraus entsteht die Seite, die „okay aussieht"
und keine Anfragen liefert.

## Reihenfolge, nicht verhandelbar

```
Strategie  →  Struktur  →  Copy  →  Design  →  Bau  →  Test  →  Launch  →  Pflege
```

Wer mit Design anfängt, baut Dekoration. Wer mit Technik anfängt, baut eine
Anfragenmaschine ohne Anfragen. Der komplette Ablauf mit Artefakten je Phase steht in
`references/00-fahrplan.md` — **bei jedem neuen Projekt zuerst lesen.**

## Wann welche Referenz

Lies gezielt nach, statt alles zu laden:

| Aufgabe | Referenz |
|---------|----------|
| Neues Projekt, Kickoff, Angebot | `00-fahrplan.md`, dann `01-strategie-positionierung.md` |
| Zielgruppe, USP, Einwände, Angebotstext | `01-strategie-positionierung.md` |
| Hero, Navigation, Seitenaufbau, Layout | `02-design-ux.md` |
| Ladezeit, Bilder, Caching, Breakpoints | `03-technik-performance.md` |
| Kontrast, Tastatur, Alt-Texte, BFSG-Pflicht | `04-barrierefreiheit-bfsg.md` |
| Keywords, URLs, Meta, interne Links, JSON-LD | `05-seo-sichtbarkeit.md` |
| CTA, Formulare, Trust, Über-uns-Seite | `06-conversion-architektur.md` |
| Impressum, Datenschutz, Consent, Auftragsverarbeitung | `07-recht-dsgvo.md` |
| 404, robots.txt, Sitemap, Redirects, Header | `08-pflichtseiten-technik.md` |
| Animationen, Scroll-Effekte, GSAP | `09-motion-gsap.md` |
| Visuelle Richtung, Tokens, Typografie, Stile | `10-visuelle-richtung.md` |
| React/Next-Komponenten, shadcn/ui | `11-komponenten-shadcn.md` |
| Headlines, Buttontexte, Fehlermeldungen | `12-copywriting.md` |
| GA4, Heatmaps, Conversion-Ziele, A/B | `13-messung-optimierung.md` |
| Astro-Projekt aufsetzen, Dateistruktur | `14-projektstruktur-astro.md` |
| Audit einer bestehenden Seite | `assets/checklisten/conversion-audit.md` |
| Kurz vor dem Livegang | `assets/checklisten/pre-launch.md` |

Fertige Vorlagen (Rechtstexte, robots.txt, Sitemap-Stylesheet, Tokens, Meta-Head, JSON-LD,
404-Seite, Security-Header) liegen in `assets/vorlagen/`.

## Sieben Fehler, die Geld kosten

Bei jedem Audit und jedem Neubau zuerst gegen diese Liste prüfen. Die Prozentwerte sind
die Größenordnung, um die es geht, kein Messwert für den Einzelfall.

1. **Die „Ich-Ich-Ich"-Falle.** Die Startseite redet über das Unternehmen statt über das
   Problem des Besuchers. Er fühlt sich nicht verstanden und geht.
2. **Unsichtbare Zielgruppe.** „Wir helfen allen" spricht niemanden an. Wie der Italiener,
   der auch Schnitzel und Burger führt.
3. **Mobile-Desaster.** Rund 73 % der Besuche sind mobil. Ist die Seite dort unbenutzbar,
   springen 85–90 % ab.
4. **Ladezeit-Hölle.** Nach 3 Sekunden sind rund 32 % weg. Siehe Bereich 3.
5. **Keine Trust-Elemente.** Behauptung ohne Beweis kostet 40–60 % Conversion.
6. **Irreführendes Kontaktformular.** Zu viele Felder, zu viel Abfrage. Der kaufbereite
   Kontakt bricht ab.
7. **Keine klare Handlungsaufforderung.** Zu wenige oder zu viele verschiedene Buttons:
   25–40 % weniger Anfragen und ein verwirrter Besucher.

## Fünf Fehler in der Umsetzung

1. **Zu früh ins Design.** Fix: Strategie → Struktur → Design → Entwicklung.
2. **IT statt Marketing.** Technisch sauber, ohne Conversion-Logik. Fix: beides bedienen
   oder sauber trennen (Konzept extern, Umsetzung IT).
3. **Baukasten-DIY.** Das Werkzeug ersetzt kein Know-how in Strategie, Copy, Design,
   Technik und Testing.
4. **Launch ohne Pflege.** Eine Website ist nie fertig. Fix: monatliche Reviews.
5. **Keine Messung.** Ohne Daten keine Verbesserung. Fix: GA4 + Conversion-Ziele +
   Heatmap, siehe `references/13-messung-optimierung.md`.

## Harte Grenzen

Diese Regeln gelten immer und werden nicht wegdiskutiert:

- **Kontrast mindestens 4,5:1** für Fließtext, 3:1 für große Schrift und für die Begrenzung
  von Bedienelementen. Eine Markenfarbe, die das reißt, ist eine Flächenfarbe, keine
  Textfarbe.
- **Jede Funktion ist mit der Tastatur bedienbar**, mit sichtbarem Fokusring. Fokusringe
  werden nie entfernt, nur gestaltet.
- **Ladezeit unter 2 Sekunden**, LCP unter 2,5 s, CLS unter 0,1.
- **Keine erfundenen Zahlen.** Keine Kundenstimmen, Bewertungen, Zertifikate, Preise,
  Lieferzeiten oder Referenzen ohne Beleg. Fehlt ein Wert, steht dort ein sichtbarer
  Platzhalter `[[FEHLT: …]]`, niemals ein plausibel klingender Erfindungswert. Unechte
  Verknappung („nur noch 3 verfügbar") ohne echten Bestand ist eine Irreführung nach
  § 5 UWG.
- **Kein Drittanbieter-Skript, kein externes Medium ohne Einwilligung.** Consent blockiert
  echt, nicht kosmetisch (siehe `references/07-recht-dsgvo.md`).
- **Rechtstexte sind Entwürfe**, keine Rechtsberatung. Sie gehen vor dem Livegang zur
  Prüfung. Das steht auch so in der Übergabe.
- **Bei `prefers-reduced-motion: reduce`** entfällt jede nicht ausgelöste Bewegung. Die
  Seite bleibt vollständig nutzbar und vollständig lesbar ohne JavaScript.

## Arbeitsweise

1. **Erst verstehen, dann bauen.** Ohne Zielgruppe, Kernproblem und USP wird nichts
   gestaltet. Fehlen die Angaben, frage sie ab — mit der Formel aus Bereich 1, nicht mit
   einem leeren Fragebogen.
2. **Plan vor Code.** Bei neuem Design zuerst ein kompaktes Tokensystem (Farben, Schrift,
   Layoutidee, Prinzipien) entwerfen und gegen den Brief prüfen. Liest sich ein Teil wie
   der Standard, den du für jede beliebige Seite produzieren würdest, ersetze ihn und sage
   warum. Details in `references/10-visuelle-richtung.md`.
3. **Jede Regel bekommt einen Grund.** Im Projekt-`CLAUDE.md` steht nicht nur, wie etwas
   gebaut ist, sondern warum. Das verhindert, dass die nächste Sitzung es zurückdreht.
4. **Prüfen statt behaupten.** Vor jeder Fertigmeldung: Build grün, `astro check`/`tsc`
   ohne Befund, Tastaturdurchlauf, Kontrolle auf 375 px und 1440 px, Kontrastprüfung der
   geänderten Flächen. Was nicht geprüft wurde, wird als ungeprüft benannt.
5. **Ehrlich über Lücken.** Offene Punkte kommen in eine sichtbare Liste, nicht in eine
   Fußnote.
