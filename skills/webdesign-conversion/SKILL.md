---
name: webdesign-conversion
description: Vollständiges System für conversion-orientiertes Webdesign im DACH-Raum. Deckt Homepages, Landingpages und Recruiting-Funnel ab: Strategie und Positionierung, Design und UX, Spacing und Rhythmus, Responsive Design mit Container Queries, Technik und Performance, Barrierefreiheit (BFSG/WCAG 2.2 AA), SEO, Conversion-Architektur, Copywriting, eigene Icon-Systeme, Motion mit GSAP und CSS, Marken-/CI-Extraktion aus bestehenden Seiten (Logo, Farben, Schrift), Referenzrecherche auf Premium-Designquellen (Awwwards, Dribbble, Land-book, recent.design, 21st.dev), Bildhintergründe und visuelle Sektionshierarchie sowie den rechtlichen und technischen Pflichtaufbau (Impressum, Datenschutzerklärung, Consent, 404-Seite, robots.txt, Sitemap, Weiterleitungen, Security-Header). Nutze diesen Skill beim Planen, Bauen, Überarbeiten oder Prüfen einer Website, Landingpage, Karriereseite oder Stellenanzeige, bei Fragen zu Ladezeit, Above the Fold, CTA, Formularen, Trust-Elementen, Abständen, Breakpoints, Meta-Titeln, interner Verlinkung, Designtokens, Icons, SVG, Animationen, Headlines, Buttontexten, Bewerberdaten, AGG, Markenübernahme aus einer bestehenden Website oder Rechtstexten.
license: MIT
metadata:
  author: Henneberg Webdesign
  version: 2.0.0
---

# Webdesign Conversion System

Eine Website ist entweder ein Vertriebs-Asset oder eine teure Dekoration. Dazwischen gibt es
nichts. Dieser Skill baut die erste Variante: eine Seite, die qualifizierte Anfragen erzeugt,
rechtssicher ist und technisch trägt.

**Kernsatz für jede Entscheidung:** Design ohne Strategie ist Dekoration. Technik ohne
Conversion-Logik ist eine schöne Sackgasse. Erst wenn alle sechs Bereiche ineinandergreifen,
arbeitet die Seite.

## Zuerst: welcher Typ

Drei Produkttypen, drei verschiedene Regelwerke. **Bei jedem neuen Projekt zuerst das
passende Playbook lesen**, es führt durch alle Phasen und verweist auf die Referenzen.

| Typ | Playbook | Der entscheidende Unterschied |
|---|---|---|
| **Homepage** | `playbooks/homepage.md` | Navigation ist Pflicht, mehrere Zielgruppen, SEO trägt |
| **Landingpage** | `playbooks/landingpage.md` | **keine** Navigation, ein Ziel, Message-Match zur Anzeige |
| **Recruiting Funnel** | `playbooks/recruiting-funnel.md` | mehrstufig, mobil zuerst, AGG und Bewerberdatenschutz |

Bei einem Audit einer bestehenden Seite: `assets/checklisten/conversion-audit.md`.

## Der Markenbrief als einzige Quelle

Bevor gestaltet wird, entsteht **eine** Datei pro Projekt. Sie speist Design, Motion, Icons
und Copy gemeinsam.

```
assets/vorlagen/marke-brief.md   Prosa: Zielgruppe, Problem, USP, Einwände, Beweise
assets/vorlagen/marke.json       maschinenlesbar: Farbrollen, Schriften, Motion, Icons, Sprache
```

Das ist der Grund, warum bei maschinell gebauten Seiten Design, Animation und Text selten
zusammenpassen: sie kommen aus vier getrennten Entscheidungen statt aus einer Datei. Die
Icon-Strichstärke erbt aus derselben Quelle wie die Motion-Kurve und der Anredeton.

**Was beim Bauen entschieden wird und dort nicht steht, gehört dorthin.** Sonst dreht die
nächste Sitzung es zurück.

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
Anfragenmaschine ohne Anfragen. Der Ablauf mit Artefakten je Phase steht in
`references/00-fahrplan.md`.

## Wann welche Referenz

Lies gezielt nach, statt alles zu laden.

**Strategie und Text**

| Aufgabe | Referenz |
|---------|----------|
| Neues Projekt, Kickoff, Angebot | `00-fahrplan.md`, dann das Playbook |
| Zielgruppe, USP, Einwände | `01-strategie-positionierung.md` |
| Headlines, Buttontexte, Fehlermeldungen, Angebot, Einwände, Deutsch | `12-copywriting.md` |
| CTA, Formulare, Trust, Über-uns-Seite | `06-conversion-architektur.md` |
| Stellenanzeige, Karriereseite, EVP, AGG, Bewerberdaten | `19-recruiting-funnel.md` |

**Gestaltung**

| Aufgabe | Referenz |
|---------|----------|
| Hero, Navigation, Seitenaufbau, F-Pattern | `02-design-ux.md` |
| Visuelle Richtung, Tokens, Typografie, Anti-Schablone | `10-visuelle-richtung.md` |
| Abstände, Rhythmus, Hierarchie durch Spacing | `15-spacing-rhythmus.md` |
| Breakpoints, Container Queries, svh/dvh, Responsive-Szenarien | `16-responsive-container.md` |
| Eigenes Icon-Set, SVG, Favicon | `17-icons-eigenes-system.md` |
| Motion-Handschrift, Motion-Tokens, Scroll-Animation in CSS | `18-motion-handschrift.md` |
| GSAP, ScrollTrigger, Timelines, Performance | `09-motion-gsap.md` |
| React- und Next-Komponenten, shadcn/ui | `11-komponenten-shadcn.md` |
| Marke/CI aus bestehender Seite auslesen (Logo, Farben, Schrift) | `20-markenextraktion-bestandsseite.md` |
| Bildhintergründe, Sektionstrennung, visuelle Hierarchie | `21-sektionshintergruende-hierarchie.md` |
| Referenzrecherche vor dem Entwurf: Awwwards, Dribbble, Land-book, recent.design, 21st.dev | `22-premium-designquellen.md` |

**Technik, Recht, Messung**

| Aufgabe | Referenz |
|---------|----------|
| Ladezeit, Bilder, Caching, Schriften | `03-technik-performance.md` |
| Kontrast, Tastatur, Alt-Texte, BFSG-Pflicht | `04-barrierefreiheit-bfsg.md` |
| Keywords, URLs, Meta, interne Links, JSON-LD | `05-seo-sichtbarkeit.md` |
| Impressum, Datenschutz, Consent, Auftragsverarbeitung | `07-recht-dsgvo.md` |
| 404, robots.txt, Sitemap, Redirects, Header | `08-pflichtseiten-technik.md` |
| GA4, Heatmaps, Conversion-Ziele, A/B | `13-messung-optimierung.md` |
| Astro-Projekt aufsetzen, Dateistruktur | `14-projektstruktur-astro.md` |
| Kurz vor dem Livegang | `assets/checklisten/pre-launch.md` |

Fertige Vorlagen (Markenbrief, Rechtstexte, Bewerber-Datenschutz, robots.txt,
Sitemap-Stylesheet, Tokens, globale Basis, Meta-Head, JSON-LD samt JobPosting, 404-Seite,
Security-Header) liegen in `assets/vorlagen/`.

## Prüfskripte

„Prüfen statt behaupten" braucht Werkzeug, sonst wird die Checkbox abgehakt statt geprüft.
Alle Skripte laufen ohne Abhängigkeiten außer Node, das Breakpoint-Skript braucht Playwright.

```bash
node scripts/pruefe-striche.mjs       # Gedankenstriche, hyphens: auto, verbotene Wörter
node scripts/pruefe-tokens.mjs        # hartcodierte Farb-, Abstands- und Schriftwerte
node scripts/pruefe-kontrast.mjs      # Kontrastwerte der Rollen-Tokens
node scripts/pruefe-platzhalter.mjs   # [[FEHLT]] und data-copy-vorschlag vor dem Livegang
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
```

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
- **Keine Gedankenstriche im Seitentext.** Kein `–` und kein `—` in Headlines,
  Subheadlines, Buttons, Links, Alt-Texten oder Fließtext. Das gilt auch **vorangestellt**:
  kein Strich, kein Bindestrich und kein dekoratives Strich-Element vor einer Headline,
  Subheadline oder einem Kicker-/Eyebrow-Label (das „— Was wir machen" über einer
  Überschrift). Ersatz: Doppelpunkt, Komma, zwei Sätze oder das Label steht einfach ohne
  Strich davor. Der Bereichsstrich bei Zahlen („10–12 Uhr") und der echte Bindestrich im
  Kompositum („E-Mail-Adresse") bleiben erlaubt. Geprüft mit
  `scripts/pruefe-striche.mjs`, Begründung in `references/12-copywriting.md`.
- **Keine Silbentrennung.** `hyphens: auto` trennt deutsche Komposita mitten im Wort und
  gehört nicht auf eine Verkaufsseite.
- **Heldenbereich immer auf voller Bildschirmhöhe.** Auf jeder Breite und jeder Fensterhöhe
  liegt der Heldenbereich bei 100 % der sichtbaren Höhe (`100svh`, siehe `02-design-ux.md`
  und `16-responsive-container.md`), keine Ausnahme für kurze Laptop-Fenster. Passt sich an:
  der Inhalt darin, nie der Container.
- **Kacheln und Karten bekommen immer einen Hover-Effekt.** Leistungs-, Team-, Referenz- und
  Prozesskacheln reagieren sichtbar auf `:hover`/`:focus-visible` (Anheben, Zoom, Farb- oder
  Randwechsel), abgeschaltet bei `prefers-reduced-motion: reduce`. Details in
  `02-design-ux.md`.
- **Jedes Projekt bekommt eine eigene Handschrift, keine Wiederverwendung von Sektion zu
  Sektion.** Dazu gehören: mindestens ein individueller Farbverlauf oder eine individuelle
  visuelle Eigenschaft, die aus der Marke abgeleitet ist (nicht aus einer Bibliothek
  kopiert), eine eigene Bewegungssignatur (siehe `18-motion-handschrift.md`) und mindestens
  ein Custom- oder Animationsabschnitt, der für genau dieses Unternehmen gebaut ist, keine
  generische Sektion aus dem Baukasten.
- **Existiert bereits eine Marke oder eine alte Seite, wird sie zuerst ausgelesen, nicht
  ignoriert.** Logo, Farben, Schrift und Formsprache kommen vor dem Neuentwurf auf den Tisch,
  geprüft und bewusst fortgeschrieben oder bewusst verworfen, nie stillschweigend ersetzt.
  Siehe `references/20-markenextraktion-bestandsseite.md`.
- **Vor dem Tokensystem-Plan steht eine Referenzrecherche auf mindestens einer
  Premium-Designquelle** (Awwwards, Dribbble, Land-book, recent.design, 21st.dev), damit der
  Plan an echten aktuellen Premium-Beispielen entsteht, nicht am ersten Einfall. Siehe
  `references/22-premium-designquellen.md`.
- **Jede Sektion braucht entweder einen Bildhintergrund an den entscheidenden Stellen
  (mindestens Held und der eine Custom-Abschnitt) oder eine erkennbare Trennung zur
  Nachbarsektion**, per Flächenfarbwechsel oder, wo Sektionen zusammengehören, per
  typografischer und räumlicher Hierarchie. Keine Folge von Sektionen auf identischer
  Fläche ohne jede Abstufung. Siehe `references/21-sektionshintergruende-hierarchie.md`.
- **Keine erfundenen Zahlen.** Keine Kundenstimmen, Bewertungen, Zertifikate, Preise,
  Lieferzeiten oder Referenzen ohne Beleg. Fehlt ein Wert, steht dort ein sichtbarer
  Platzhalter `[[FEHLT: …]]`, niemals ein plausibel klingender Erfindungswert. Unechte
  Verknappung („nur noch 3 verfügbar") ohne echten Bestand ist eine Irreführung nach
  § 5 UWG.
- **Kein Wert ohne Token.** Keine rohe Farbe, kein hartcodierter Abstand, keine feste
  Schriftgröße im Komponentencode. Eine optisch begründete Abweichung bekommt einen
  Kommentar mit dem Wort „bewusst", sonst ist es ein Befund.
- **Kein Drittanbieter-Skript, kein externes Medium ohne Einwilligung.** Consent blockiert
  echt, nicht kosmetisch (siehe `references/07-recht-dsgvo.md`).
- **Rechtstexte sind Entwürfe**, keine Rechtsberatung. Sie gehen vor dem Livegang zur
  Prüfung. Das steht auch so in der Übergabe. Für Stellenanzeigen gilt das verschärft: ein
  AGG-Verstoß ist unmittelbar entschädigungspflichtig.
- **Bei `prefers-reduced-motion: reduce`** entfällt jede nicht ausgelöste Bewegung. Die
  Seite bleibt vollständig nutzbar und vollständig lesbar ohne JavaScript.

## Arbeitsweise

1. **Erst verstehen, dann bauen.** Ohne Zielgruppe, Kernproblem und USP wird nichts
   gestaltet. Fehlen die Angaben, frage sie ab, mit der Formel aus Bereich 1 und nicht mit
   einem leeren Fragebogen. Die Antworten gehen in `marke-brief.md`, nicht in den Chat.
   Existiert bereits eine Marke oder eine alte Seite, wird sie in diesem Schritt ausgelesen,
   siehe `references/20-markenextraktion-bestandsseite.md`.
2. **Referenz vor Plan, Plan vor Code.** Erst mindestens eine Premium-Designquelle nach
   Branche und Stilrichtung durchsuchen (`references/22-premium-designquellen.md`), dann ein
   kompaktes Tokensystem (Farben, Schrift, Layoutidee, Prinzipien) entwerfen und gegen den
   Brief prüfen. Liest sich ein Teil wie der Standard, den du für jede beliebige Seite
   produzieren würdest, ersetze ihn und sage warum. Details in
   `references/10-visuelle-richtung.md`.
3. **Eine Handschrift, vier Ausdrucksformen.** Palette, Spacing, Icons und Motion kommen aus
   derselben Entscheidung. Ein Icon-Set mit fremder Strichstärke oder eine Motion-Kurve ohne
   Bezug zur Marke verrät die Schablone genauso wie eine Standardfarbe.
4. **Jede Regel bekommt einen Grund.** Im Projekt-`CLAUDE.md` steht nicht nur, wie etwas
   gebaut ist, sondern warum. Das verhindert, dass die nächste Sitzung es zurückdreht.
5. **Prüfen statt behaupten.** Vor jeder Fertigmeldung: Build grün, `astro check`/`tsc`
   ohne Befund, die Prüfskripte gelaufen, Tastaturdurchlauf, Kontrolle auf 375 px und
   1440 px. Was nicht geprüft wurde, wird als ungeprüft benannt.
6. **Ehrlich über Lücken.** Offene Punkte kommen in eine sichtbare Liste, nicht in eine
   Fußnote. `scripts/pruefe-platzhalter.mjs` findet, was noch offen ist.
