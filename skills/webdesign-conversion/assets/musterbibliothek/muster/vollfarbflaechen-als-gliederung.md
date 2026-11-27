---
id: vollfarbflaechen-als-gliederung
name: Jede Produktgruppe als ganze Farbfläche mit Riesentitel
kategorie: services
sektionstyp: [services, product]
tags: [vollfarbflaeche, versalien, grosstitel, stapeln]
stil: [expressive, experimentell]
branchenbezug: [lebensmittel, event, handel]
ux_zweck: die Farbe gliedert die Seite, der Titel nennt die Gruppe, das Produkt steht allein
conversion_zweck: jede Gruppe bekommt einen eigenen Bildschirm und einen eigenen Weg
responsiv: Referenz bricht auf 390 Pixel Wörter Buchstabe für Buchstabe um, das ist kein Vorbild
komplexitaet: mittel
barrierefreiheit: Kontrast je Flächenpaar rechnen, Gegenfarbe zur Fläche. Der Titel ist echter Text, das Stapeln nur mit Fallback in den normalen Fluss
verwandt: [schraege-laufbaender-anlassliste]
quelle_url: https://ringpopcandy.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Jede Produktgruppe als ganze Farbfläche mit Riesentitel

## Prinzip

Jede Kollektion ist eine ganze Farbfläche über mindestens einen Bildschirm, mit Titel in Versalien und riesiger Größe, einem Produktbild und einem Knopf in Kontrastfarbe.

## Warum es wirkt

Farbe ist die schnellste Gliederung: wer scrollt, merkt am Wechsel der Fläche, dass etwas Neues beginnt. Eine Gruppe pro Bildschirm hält die Entscheidung klein, und der Riesentitel macht die Gruppe zum Ort.

## Belege

| Aussage | Beleg |
|---|---|
| fünf Kollektionen als eigene Vollfarbflächen mit Titeln in Versalien | beobachtet, Screenshot 1440, ringpopcandy.com |
| Titel 250 px Desktop, 75 bis 100 px mobil, Pin Container 900 bis 1008 px hoch | beobachtet, berechnete Stile (laut Erfassung für t123) |
| Flächen schieben sich beim Scrollen übereinander | abgeleitet, aus Pin Containern, nicht als Bewegung beobachtet |
| Kontrast der Flächenpaare | unbekannt, nicht gemessen |

## Umsetzung

- Palette aus vier bis fünf Flächen, jedes Paar mit gerechnetem Kontrast, siehe `24-designsystem-vorrang.md`.
- Stapeln über `position: sticky`, nur wenn der Inhalt je Fläche in `100svh` passt, sonst normaler Fluss.
- Titelgröße aus Behälterbreite und Buchstabenzahl, mit Obergrenze, damit nichts umbricht.
- Knopf und Titel in Gegenfarbe der Fläche.

## Was nicht übernommen wird

Farbwerte, Titel, Produkte und Marke der Referenz. Die grelle Palette der Referenz wird nicht übernommen, das Prinzip gilt mit jeder Palette, die den Kontrast trägt.
