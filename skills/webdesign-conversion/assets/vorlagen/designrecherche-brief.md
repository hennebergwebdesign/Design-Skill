# Design-Research-Brief: [KUNDE]

Ausgefüllt vor der ersten Referenzsuche, abgelegt im Kundenprojekt unter
`.designrecherche/brief.md`. Ablauf: `../../../agentur-website-builder/references/designrecherche-ablauf.md`.

Der Zweck dieser Datei ist eine Suche nach **Funktion** statt nach Geschmack. „Schöne
Websites" ist kein Suchauftrag. „Technische Produktdarstellung für erklärungsbedürftige
Messtechnik im B2B" ist einer.

Alles, was schon in `marke-brief.md` steht, wird hier nicht wiederholt, sondern verwiesen.

---

## 1 Ausgangslage

| Feld | Wert |
|---|---|
| Branche | [[FEHLT]] |
| Zielgruppe | siehe `marke-brief.md` Abschnitt 2 |
| Positionierung | siehe `marke-brief.md` Abschnitt 3 |
| Seitentyp | Homepage / Landingpage / Recruiting-Funnel |
| primäre Conversion | [[FEHLT]] |
| Sprache und Region | de-DE, [[FEHLT: Region]] |

## 2 Designsystem des Kunden

Stufe nach `../../references/24-designsystem-vorrang.md` eintragen. Das entscheidet, was eine
Referenz überhaupt beeinflussen darf.

| Frage | Antwort |
|---|---|
| Liegt ein vollständiges Designsystem vor? | ja / nein |
| Wenn ja, woraus (Tokendatei, Figma, Styleguide)? | [[FEHLT]] |
| Liegen Markenvorgaben vor (Logo, Farben, Schrift)? | ja / nein / teilweise |
| Woher stammen sie (geliefert, aus der Bestandsseite ausgelesen)? | [[FEHLT]] |
| Was ist damit geschützt? | Farbe, Typografie, Logo, Form, Raum, Bausteine |
| Was darf eine Referenz folglich beeinflussen? | Layout, Komposition, Struktur, Hierarchie, Rhythmus, Interaktion, Responsive, UX |

## 3 Technische Rahmenbedingungen

| Feld | Wert |
|---|---|
| Stack | Astro auf Cloudflare Pages (Agenturstandard) |
| Abweichung, falls vorhanden | [[FEHLT]] |
| Interaktionstiefe erwünscht | ruhig / mittel / ein orchestrierter Moment |
| Was technisch ausgeschlossen ist | z. B. WebGL, 3D, schwere Bibliotheken |
| Responsive Pflicht | 375, 768, 1440, zusätzlich die fünf Breakpoints aus `16-responsive-container.md` |

## 4 Sektionsinventar

Eine Zeile je Sektion, aus Sitemap und Copy abgeleitet. Die letzte Spalte ist die
wichtigste: sie entscheidet, wonach überhaupt gesucht wird.

| Seite | Sektion | Zweck der Sektion | Was sie leisten muss | Referenz nötig? |
|---|---|---|---|---|
| Startseite | Held | [[FEHLT]] | [[FEHLT]] | ja / nein |
| Startseite | Vertrauensbeweis | | | |
| Startseite | Leistungen | | | |
| Startseite | Ablauf | | | |
| Startseite | Fallbeispiele | | | |
| Startseite | Kundenstimmen | | | |
| Startseite | Häufige Fragen | | | |
| Startseite | Abschluss-CTA | | | |

**Faustregel für die letzte Spalte:** Eine Sektion braucht eine Referenz, wenn ihre
Darstellung nicht offensichtlich ist. Ein Footer ist offensichtlich. Eine technische
Spezifikation, ein Konfigurator, ein Vorher-Nachher, eine Fallstudie mit Messwerten und eine
Vergleichstabelle sind es nicht.

## 5 Suchaufträge

Je Sektion aus Spalte 5 ein Suchauftrag, ausformuliert. Nicht „Hero-Inspiration", sondern
der vollständige Satz mit Branche, Inhaltstyp und gesuchtem Prinzip.

| # | Sektion | Suchauftrag | Quelle(n) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |

## 6 Qualitätsfilter

Ein Kandidat wird nur vorgelegt, wenn er alle sechs Punkte erfüllt. Eine beeindruckende
Seite, die das UX-Problem dieses Projekts nicht löst, wird nicht vorgeschlagen.

- [ ] löst tatsächlich die Aufgabe aus Spalte 4 des Sektionsinventars
- [ ] passt zur Zielgruppe, nicht nur zum eigenen Geschmack
- [ ] im Agenturstack umsetzbar, ohne schwere Abhängigkeit
- [ ] responsiv tragfähig, nicht nur auf dem Desktop gedacht
- [ ] barrierefrei umsetzbar, Fokus und Tastatur bleiben möglich
- [ ] Originalseite erreichbar, nicht nur ein Galerie-Screenshot

## 7 Was ausdrücklich nicht übernommen wird

Gilt für jede Referenz dieses Projekts, unabhängig von der Freigabe:

- Farbwerte und Schriften, sie kommen aus dem Designsystem des Kunden
- Logo, Wortmarke, Bildmaterial, Illustrationen
- Texte, Claims, Überschriften
- charakteristische Layoutkombinationen als Ganzes

## 8 Offene Punkte

- [[FEHLT: was vor der Suche noch geklärt werden muss]]
