# Vorrang: Kundendesignsystem vor Referenz

Eine Referenz darf den **Aufbau** beeinflussen, nie die **Marke**. Dieses Kapitel ist die eine
Rangfolge, auf die sich alle anderen Stellen berufen.

Warum es sie braucht: Bis hierher standen drei Ranglisten nebeneinander. Die harte Grenze zur
Markenextraktion in `SKILL.md` („bestehende Marke wird zuerst ausgelesen"), die Rangfolge der
Quellen in `../../agentur-website-builder/references/referenzen-und-auswahl.md` (Design vor
Nutzerreferenz vor Ausgangsliste) und der Vorrang des Briefs in `10-visuelle-richtung.md`.
Drei Ranglisten heißt: in der dritten Sitzung gewinnt die bequemste. Ab hier gilt nur diese.

## Die fünf Stufen

Die höhere Stufe schlägt die niedrigere. Immer, ohne Abwägung im Einzelfall.

| Stufe | Was | Woher | Verhandelbar |
|---|---|---|---|
| **1** | **Kundendesignsystem** | geliefert: Tokendatei, Figma-Bibliothek, Styleguide, bestehende Komponenten | nein |
| **2** | **Markenvorgaben des Kunden** | Logo, Farbwelt, Hausschrift, Bildsprache, Tonalität, auch aus der Bestandsseite ausgelesen | nein, Abweichung nur mit benanntem Grund |
| **3** | **Sitemap, Inhaltshierarchie, Copy** | Seitenplan und Texte des Projekts | nur gemeinsam mit dem Kunden |
| **4** | **UX, Conversion, Informationsarchitektur** | das Regelwerk dieses Skills, die sechs Bereiche | nur mit Begründung im Konzept |
| **5** | **Externe Designreferenzen** | Galerien, Wettbewerber, vom Kunden genannte Seiten | ja, jederzeit ersetzbar |

Der Satz, auf den sich alles zurückführen lässt: **Eine Referenz auf Stufe 5 kann niemals
etwas auf Stufe 1 oder 2 überschreiben.** Sie kann es infrage stellen, und dann wird der
Konflikt benannt, nicht still aufgelöst.

## Zwei Arten von Eingabe, die nie verwechselt werden

Der häufigste Fehler ist nicht Ungehorsam, sondern Verwechslung: eine Referenz wird wie ein
Designsystem behandelt, weil sie als Erstes vorlag.

### Designsystem-Eingabe, geschützt

Was der Kunde liefert und was deshalb nicht aus einer Referenz ersetzt wird:

| Bereich | Konkret |
|---|---|
| Farbe | Palette, Rollen, Akzente, Flächenfarben, Zustandsfarben |
| Typografie | Familien, Schnitte, Gewichte, Typoskala, Zeilenhöhen |
| Marke | Logo, Wortmarke, Bildmarke, Schutzraum, Bildsprache, Illustrationsstil |
| Form | Radien, Rahmenstärken, Schatten, Erhebungen |
| Raum | Abstandsskala, Basiseinheit |
| Bausteine | bestehende Buttons, Formularfelder, Karten, Navigation |

### Inspirations-Eingabe, wirksam

Was eine Referenz sehr wohl beeinflussen darf, weil es Aufbau ist und nicht Marke:

| Bereich | Konkret |
|---|---|
| Layout | Raster, Spaltenverhältnisse, Containerbreiten, Asymmetrie |
| Komposition | Blickführung, Brennpunkte, Bild-Text-Verhältnis, Weißraumverteilung |
| Struktur | Sektionsreihenfolge, Sektionstypen, Dichte je Abschnitt |
| Hierarchie | relative Größensprünge, Rangfolge der Aussagen |
| Rhythmus | Wechsel von Enge und Weite über die Seite |
| Interaktion | Hover, Scrollverhalten, Übergänge, klebende Elemente |
| Responsiv | Umbruchverhalten, Stapelreihenfolge, Inhaltspriorisierung |
| UX | CTA-Rangfolge, Reihenfolge der Beweise, Einwandbehandlung |

Die Trennlinie in einem Satz: **Was die Marke wiedererkennbar macht, ist geschützt. Was die
Seite verständlich macht, ist übernehmbar.**

## Der Konfliktfall

Ein Konflikt wird benannt, nicht aufgelöst. Er gehört ins Umsetzungskonzept und in
`marke-brief.md` Abschnitt 7, nicht in eine stille Entscheidung im Code.

Format, wörtlich zu verwenden:

```
Konflikt: <Merkmal>
Referenz <Name/Link>: <was die Referenz macht>
Kundensystem: <was vorgegeben ist>
Übernommen: <das Prinzip, ohne das geschützte Merkmal>
Nicht übernommen: <das geschützte Merkmal, mit Verweis auf Stufe 1 oder 2>
```

Beispiel:

```
Konflikt: Displayschrift
Referenz beispiel.de: kontraststarke Serife für alle Überschriften
Kundensystem: Inter, Schnitte 400 und 700
Übernommen: der Größensprung von 4,5 zwischen Held und Fließtext, die enge Zeilenhöhe
Nicht übernommen: die Serife selbst, Stufe 1 schlägt Stufe 5
```

Das ist kein Formalismus. Ohne diesen Block steht im Ergebnis nur eine Schrift, und niemand
weiß mehr, ob sie gewählt oder übrig geblieben ist.

## Wenn keine Stufe 1 vorliegt

Der Normalfall bei kleineren Kunden. Dann rückt Stufe 2 nach oben, und es gilt der Reihe nach:

1. Bestandsseite und Printmaterial auslesen, siehe `20-markenextraktion-bestandsseite.md`.
   Auch ein einzelnes Logo ist Stufe 2.
2. Gibt es auch das nicht, entsteht das Designsystem in diesem Projekt neu, nach
   `10-visuelle-richtung.md`. Dann ist es ab dem Moment seiner Festlegung selbst Stufe 1 und
   wird ab da nicht mehr von einer Referenz aufgeweicht.

Punkt 2 ist der Grund, warum die Referenzrecherche **vor** dem Tokenplan steht und nicht
danach: danach wäre sie eine nachträgliche Rechtfertigung, davor ist sie ein Vergleichspunkt.

## Wie sich die bisherigen Stellen dazu verhalten

Keine der drei alten Stellen ist falsch. Jede behält ihren Spezialfall und verweist für die
Rangfolge hierher.

| Stelle | Behält | Verweist hierher für |
|---|---|---|
| harte Grenze „bestehende Marke" in `SKILL.md` | die Pflicht zum Auslesen vor dem Neuentwurf | den Vorrang gegenüber Referenzen |
| `referenzen-und-auswahl.md`, Rangfolge der Quellen | die Frage, **welche** Referenzquelle im Projekt überhaupt gilt | die Frage, **was** eine Referenz überhaupt beeinflussen darf |
| `10-visuelle-richtung.md`, Durchgang 1 und 2 | die Anti-Schablonen-Prüfung des eigenen Plans | den Umgang mit geliefertem Material |

## Verwandte Kapitel

- Marke aus der Bestandsseite auslesen: `20-markenextraktion-bestandsseite.md`
- Tokensystem und Anti-Schablone: `10-visuelle-richtung.md`
- Referenzquellen und was sie taugen: `22-premium-designquellen.md`
- Musterbibliothek und Design DNA: `25-designmuster-bibliothek.md`
- Rangfolge der Quellen, Anti-Kopie, Sektionsaufbau:
  `../../agentur-website-builder/references/referenzen-und-auswahl.md`
- Ablauf der kuratierten Referenzrecherche mit beiden Freigabetoren:
  `../../agentur-website-builder/references/designrecherche-ablauf.md`
