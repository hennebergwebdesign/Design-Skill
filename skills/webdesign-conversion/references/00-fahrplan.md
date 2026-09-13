# Fahrplan: von der Idee zur laufenden Seite

Die Reihenfolge ist das eigentliche Produkt. Ein Architekt baut den Keller vor dem ersten
Stock. Wer eine Kampagne auf eine Seite schaltet, die nicht konvertiert, verbrennt nicht das
Anzeigenbudget, sondern hat den Fehler eine Etage tiefer.

```
1 Strategie  →  2 Struktur  →  3 Copy  →  4 Design  →  5 Bau  →  6 Test  →  7 Launch  →  8 Pflege
```

## 1 Strategie (Kickoff)

**Ziel:** Klarheit über vier Punkte, bevor irgendetwas entsteht.

1. Wer ist die Zielgruppe?
2. Was ist ihr größtes Problem?
3. Warum löst du es besser als andere?
4. Warum sollte man dir vertrauen?

**Artefakte:** Zielgruppenformel, USP-Formel, Einwandliste, Wettbewerbsblick, primäre und
sekundäre Conversion. Siehe `01-strategie-positionierung.md`.

**Existiert bereits eine Marke oder eine alte Seite**, wird sie in diesem Schritt ausgelesen:
Logo, Farben, Schrift, Formsprache, siehe `20-markenextraktion-bestandsseite.md`. Das
Ergebnis geht in `marke-brief.md` Abschnitt 7 und `marke.json` unter `herkunft`.

**Abbruchkriterium:** Ohne diese vier Antworten wird nicht weitergearbeitet. Eine erfundene
Zielgruppe ist schlimmer als keine, weil sie sich durch jede spätere Entscheidung zieht.

## 2 Struktur (Informationsarchitektur)

**Ziel:** Seitenbaum und Sektionsreihenfolge, bevor eine einzige Farbe feststeht.

- Welche Seiten gibt es (Start, Leistungen, Referenzen, Über uns, Kontakt, Rechtliches)?
- Welche Sektionen in welcher Reihenfolge auf der Startseite?
- Wo liegt die primäre Conversion, wo die sekundäre?
- 3-Klick-Regel geprüft: Anfrage, Referenzen, Prozess, Preise je in maximal drei Klicks.

**Artefakt:** Seitenbaum plus Sektionsliste als Text, keine Skizze. Erst wenn die Liste in
Worten überzeugt, lohnt ein Layout.

**Bewährte Sektionsreihenfolge für eine B2B-Dienstleisterseite:**
Hero → Trust-Streifen → Problem → Lösung/Prozess → Leistungen → Beweis (Cases, Zahlen) →
Über uns/Team → Bewertungen → Angebot/Preise → FAQ → CTA-Abschluss.

## 3 Copy

**Ziel:** Der Text steht vor dem Layout. Ein Layout, das für Blindtext gebaut wurde, passt
nie zum echten Text.

Above-the-Fold-Formel, Headline-Formeln, CTA-Wortwahl und Fehlermeldungen stehen in
`12-copywriting.md`. Alles, was nicht belegt ist, bekommt `[[FEHLT: …]]` und wandert in die
Liste offener Punkte.

## 4 Design

**Ziel:** Ein Tokensystem und ein Layoutkonzept, die zu genau diesem Kunden gehören.

**Vor dem ersten Durchgang:** Referenzrecherche auf mindestens einer Premium-Designquelle
(Awwwards, Dribbble, Land-book, recent.design, 21st.dev), 2–3 passende Referenzen notiert,
siehe `22-premium-designquellen.md`.

Zwei Durchgänge: erst Plan (4–6 Farben mit Namen und Hex, Schriften mit Rollen,
Layoutkonzept in einem Satz plus ASCII-Skizze, drei Prinzipien), dann Prüfung gegen den
Brief, dann erst Code. Siehe `10-visuelle-richtung.md`. Bildhintergründe und die Trennung
oder Hierarchie zwischen Sektionen werden Teil des Plans, nicht Nachgedanke beim Bauen,
siehe `21-sektionshintergruende-hierarchie.md`.

## 5 Bau

**Ziel:** Sauberer, tokengetriebener Code. Kein Farb- oder Größenwert im Komponentencode
ohne Token.

Projektstruktur, Layout-Basis, Komponentenschnitt: `14-projektstruktur-astro.md` (Astro)
beziehungsweise `11-komponenten-shadcn.md` (React/Next mit shadcn/ui). Pflichtseiten und
technische Dateien parallel anlegen, nicht am Ende: `08-pflichtseiten-technik.md`.

## 6 Test

Vor jeder Abnahme, nicht erst vor dem Launch:

| Prüfung | Womit |
|---|---|
| Build und Typen | `pnpm build`, `astro check` bzw. `tsc --noEmit` |
| Fünf Breakpoints | 375 / 768 / 1024 / 1440 / 1920 px |
| Tastatur | Tab-Durchlauf über jede Funktion, Fokus immer sichtbar |
| Kontrast | Jede neue Farbkombination gegen 4,5:1 (Text) und 3:1 (UI) |
| Ladezeit | Lighthouse oder PageSpeed, LCP < 2,5 s, CLS < 0,1 |
| Formular | Erfolg, Fehler, Validierung, Spamschutz, Bestätigungsmail |
| Ohne JavaScript | Seite bleibt lesbar und bedienbar |
| Reduzierte Bewegung | Keine nicht ausgelöste Animation, nichts fehlt |
| 404 | Liefert wirklich HTTP 404, nicht 200 |
| Consent | Drittanbieter feuert nachweislich erst nach Zustimmung |

Die vollständige Liste: `../assets/checklisten/pre-launch.md`.

## 7 Launch

DNS, SSL, `PUBLIC_SITE_URL` auf die echte Domain, Sitemap in der Search Console einreichen,
301-Weiterleitungen für jede geänderte URL, Analytics-Ziel scharf stellen, Rechtstexte
final zur Prüfung gegeben, Bildrechte bestätigt.

## 8 Pflege

Eine Website ist nie fertig. Monatlich: Headlines, CTAs, Trust-Elemente, Content und
Performance ansehen, Zahlen aus GA4 und Heatmap gegenlesen, Updates einspielen. Siehe
`13-messung-optimierung.md`.

## Zeitrahmen, ehrlich

Eine vollständige Überarbeitung in Eigenregie kostet realistisch 4–5 Monate und 80–120
Stunden Eigenleistung, plus laufende Verantwortung für Störungen, Auswertung und
Optimierung. Das gehört in jedes Angebotsgespräch, weil die Alternative „wird schon" die
häufigste Ursache für abgebrochene Projekte ist.
