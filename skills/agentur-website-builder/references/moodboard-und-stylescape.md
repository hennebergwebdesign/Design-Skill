# Moodboard und Stylescape vor dem Bau

Die Phasen 1 bis 3 klären Material, Fragen und Konzept, die Referenzen laufen durch zwei Freigabetore
(`referenzen-und-auswahl.md`, `designrecherche-ablauf.md`). Was bisher fehlt, ist der Schritt dazwischen, in dem
**die Richtung sichtbar wird, bevor Code entsteht**: erst viele Ideen sammeln (Moodboard), dann prüfen, ob sie zusammen
tragen (Stylescape). Der Kunde kann keine Gedanken lesen und deutet ein Moodboard oft anders als der Designer.

Quelle: Videos „Give Me 11 Minutes I'll Show You How to Design $10k Sites" (07.05.2026) und „The ONLY 5 Tools You Need to
Build Insane Sites" (04.06.2026) von Self-Made Web Designer. Übernommen ist der Ablauf, kein Text.

## Inhalt

- 1\. Stellung im Ablauf
- 2\. Das Moodboard: Menge vor Politur
- 3\. Die Stylescape: Passt das zusammen?
- 4\. Entscheidung zu Wireframes und Mockups
- 5\. Erster Entwurf: Tempo vor Perfektion
- 5a. Regeln laufend festhalten
- 6\. Nicht übernommen (mit Grund)
- Verwandte Kapitel

## 1. Stellung im Ablauf

| Phase | Neu |
|---|---|
| 2 Intake | Kundensätze zur Richtung abfragen (Tabelle in `../../webdesign-conversion/references/37-stilrichtung-nach-kundensprache.md`) |
| 3 Konzept | Moodboard intern, Stylescape zur Abnahme |
| 4 Umsetzung | Reihenfolge wie bisher, aber Stylescape ist Maßstab für Token und Sektionen |
| Definition of Done | Stylescape vom Kunden bestätigt, wenn der Kunde über Design entscheidet |

## 2. Das Moodboard: Menge vor Politur

| Regel | Grund |
|---|---|
| Ziel ist Menge, es darf unaufgeräumt sein | je mehr Ideen, desto leichter fällt das Aussortieren |
| Inhalte: Inspiration, Schriften, Schriftkombinationen, Farben, Paletten, Formen, Bildstimmung | deckt die Dimensionen ab, die später Tokens werden |
| mindestens ein Teil der Quellen stammt **nicht aus dem Web** (Poster, Verpackung, Architektur, Buchgestaltung, Beschilderung) | Pinterest und Awards benutzen alle, das Ergebnis wird eine Kopie einer Kopie |
| Ein Motiv aus dem Logo des Kunden ableiten | im Beispiel des Videos zogen sich Formen aus dem Logo durch die ganze Seite |
| Nach dem Sammeln streichen, was nicht zum Kunden passt | das Moodboard ist ein Werkzeug, kein Ergebnis |
| Vorsicht vor Inspirationsschleifen | endloses Weiterscrollen ersetzt keine Entscheidung; Zeitfenster setzen |

**Wichtig:** Bilder und Schriften auf dem Moodboard sind Fremdmaterial. Sie landen **nie** auf der Kundenseite, ohne dass
Lizenz und Freigabe geklärt sind. Wird eine Seite als Referenz erfasst, läuft sie durch `referenz-register.mjs` und die
zwei Tore, wie bisher.

## 3. Die Stylescape: Passt das zusammen?

Die Stylescape setzt ausgewählte Elemente des Moodboards zu **einem** Bild zusammen, damit Designer und Kunde dasselbe
sehen: Schriftpaarung, Palette, Bildsprache, Formen, eine Beispielsektion, gegebenenfalls das Signaturelement.

| Regel | Grund |
|---|---|
| Sie ist ein Abnahmedokument, kein Entwurf der Seite | sie klärt Richtung, nicht Layout |
| Nichts wird gelöscht, Varianten werden kopiert und daneben gelegt | spielerisches Erkunden ohne Verlust |
| Der Kunde bekommt konkrete Fragen („Passt die Richtung? Was fehlt oder stört?"), keine Geschmacksfrage | `../../webdesign-conversion/references/33-kundenpraesentation-und-feedback.md`: Aussagen statt Geschmack |
| Lehnt der Kunde ab, ist das ein Erfolg | die Richtung wird vor dem Bau korrigiert, nicht danach; im Beispiel des Videos sparte das viel Zeit |
| Danach werden Tokens und Sektionen aus der Stylescape abgeleitet | eine Quelle der Wahrheit (`marke.json`, `tokens.css`) |
| Werden mehrere Richtungen gezeigt, bekommt jede die Preiszeile (Struktur, Stärke, Preis, Passt wenn), die Wahl steht in `marke.json` unter `gestaltung.richtungswahl` | wer nur Bilder vergleicht, wählt nach Geschmack. Stufen und Vorlage: `../../webdesign-conversion/references/48-richtung-varianten-und-subtraktion.md`, Abschnitte 3 und 4 |

**Format:** zwei gleichwertige Wege.

| Weg | Vorteil | Nachteil |
|---|---|---|
| Designdatei oder Bildtafel | schnell, Kunde sieht ein Bild | Werte müssen später in Tokens übertragen werden |
| Interne statische Seite im Projekt (nicht indexiert, nicht verlinkt) | Tokens sind schon echt, Schriften laden aus dem Projekt | mehr Vorarbeit, Zugang für den Kunden regeln |

## 4. Entscheidung zu Wireframes und Mockups

Das Video lässt Wireframes und hochauflösende Mockups weg und baut direkt in einem visuellen Baukasten, der sich wie ein
Gestaltungswerkzeug bedient. **Das ist hier nur teilweise übertragbar**: Astro Code ist kein Baukasten, Layoutänderungen
kosten mehr als dort. Das Video nennt selbst den Gegenpol (bei den meisten Baukästen wäre ein Mockup billiger).
Entscheidung: Die Layoutskizze als ASCII Skizze aus `../../webdesign-conversion/references/10-visuelle-richtung.md` (Durchgang 1) bleibt. Kein zusätzlicher Pflichtschritt
für Wireframes oder Mockups, aber auch kein Verbot, wenn der Kunde sie braucht.

Das Paket 4.18 fordert das Gegenteil, ein Wireframe-Tor als Pflicht. Übernommen ist der Auslöser, nicht die
Pflicht: Entscheidet der Kunde über Struktur oder entsteht mehr als ein Seitentyp, gibt es eine
Graustufenskizze mit den Zuständen der Formulare (leer, Laden, Fehler, Erfolg), sonst bleibt es bei der
ASCII Skizze im Konzept. Begründung und warum es kein „Tor 3" heißt:
`../../webdesign-conversion/references/48-richtung-varianten-und-subtraktion.md`, Abschnitte 2 und 8.

## 5. Erster Entwurf: Tempo vor Perfektion

Aus dem Video, passend zu den zwei subjektiven Durchgängen aus `kundenabstimmung.md` und der Reihenfolge in Phase 4:

1. alle Sektionen der Startseite grob anlegen, von oben (Held) nach unten,
2. je Sektion die erste Idee, nicht die perfekte,
3. weiter, statt an einer Sektion zu kleben (Ideen für den Helden kommen oft beim Schlussaufruf),
4. dann wenige Verfeinerungsdurchgänge,
5. erst danach zum Kunden.

Grund: Der erste Entwurf wird nicht gezeigt, er soll von nichts zu etwas führen.

## 5a. Regeln laufend festhalten

Was beim Bauen als Regel entsteht (zwei fast gleiche Module nie nebeneinander, Anteil Bild und Text
wechselt, Dauer der Textanimation), wird nicht nur im Chat gesagt. Es wandert nach jedem Systemschritt
(Typografie, Farben, Abstände, Animation) in den Markenbrief und, soweit maschinenlesbar, in
`marke.json` (Block `gestaltung`, Sperren). Grund: Die nächste Sitzung und jede spätere Landingpage
der Marke starten aus dem Festgehaltenen statt von einer leeren Fläche, und die Seite bleibt in einem
Universum. Ein eigener Skill je Marke ist dafür **nicht nötig**, dieser Ort besteht schon. Systemwerte
und Prüffragen: `../../webdesign-conversion/references/43-hierarchie-raster-komposition.md`.

## 6. Nicht übernommen (mit Grund)

- Verzicht auf Wireframes und Mockups als Pflichtregel: siehe Abschnitt 4. Ebenso das Gegenteil, ein
  Wireframe-Tor als Pflicht (Paket 4.18).
- Der Baukasten, in dem das Video arbeitet: Stack ist fest.
- Die Behauptung, die Methode führe zu einem bestimmten Preisniveau: kein Beleg im Video, Einkommen und Preise sind
  nicht Teil des Skills.

## Verwandte Kapitel

`referenzen-und-auswahl.md`, `designrecherche-ablauf.md`, `kundenabstimmung.md`, `intake-und-entscheidungen.md`,
`../../webdesign-conversion/references/10-visuelle-richtung.md`,
`../../webdesign-conversion/references/37-stilrichtung-nach-kundensprache.md`,
`../../webdesign-conversion/references/39-ki-assets-bewegtbild-und-3d.md`,
`../../webdesign-conversion/references/43-hierarchie-raster-komposition.md`,
`../../webdesign-conversion/references/22-premium-designquellen.md` (Quellen außerhalb des Webs).
