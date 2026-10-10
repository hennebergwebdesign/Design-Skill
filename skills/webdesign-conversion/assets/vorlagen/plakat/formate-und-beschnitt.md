# Plakatformate und Beschnitt

Stand der Quelle: 05.10.2026 (Angabe der Blueprint-Autoren, nicht neu geprüft). **Zuerst die Druckerei
fragen**: Manche verlangen mehr Beschnitt oder einen anderen Dateityp.

## Die Regel in einer Zeile

Die Datei hat Endformat plus Beschnitt. Jedes Wort bleibt im Sicherheitsrand.

* Endformat: die Größe nach dem Schnitt.
* Beschnitt: Gestaltung über das Endformat hinaus, damit kein weißer Rand sichtbar wird. 3 mm auf allen vier Seiten.
* Sicherheitsrand: Text und Logos mindestens 6 mm innerhalb des Endformats.

## Formate der A-Reihe bei 300 dpi

| Format | Endformat (mm) | Endformat (Pixel) | Datei mit Beschnitt (mm) | Datei (Pixel) |
|---|---|---|---|---|
| A4 | 210 x 297 | 2480 x 3508 | 216 x 303 | 2551 x 3579 |
| A3 | 297 x 420 | 3508 x 4961 | 303 x 426 | 3579 x 5031 |
| A2 | 420 x 594 | 4961 x 7016 | 426 x 600 | 5031 x 7087 |
| A1 | 594 x 841 | 7016 x 9933 | 600 x 847 | 7087 x 10004 |
| A0 | 841 x 1189 | 9933 x 14043 | 847 x 1195 | 10004 x 14114 |

## Social-Zuschnitte

| Wo | Verhältnis | Größe | Hinweis |
|---|---|---|---|
| Instagram-Feed | 4:5 | 1440 x 1800 px | JPG oder PNG |
| Instagram-Story | 9:16 | 1440 x 2560 px | oben 14 Prozent, unten 35 Prozent und seitlich 6 Prozent frei von Text |
| Pinterest-Pin | 2:3 | 1000 x 1500 px | höher als 2:3 kann beschnitten werden |

Ein Druckplakat ist kein Social-Post. Je Platz ein eigener Zuschnitt, der Druckrand wird nicht
wiederverwendet. Die Randwerte sind Vorschläge der Quelle: vor Veröffentlichung gegen die aktuelle
Plattform prüfen.

## Export

Mit installiertem Chrome (Pfad je System anders):

```
chrome --headless=new --no-pdf-header-footer --print-to-pdf=plakat.pdf poster.html
pdftoppm -r 300 -png -singlefile plakat.pdf plakat
```

Laut Quelle am 05.10.2026 in Chrome 154 geprüft: eine Seite, Schriften eingebettet, keine Rasterbilder.
Die PDF-Seite kann rund 0,1 mm breiter sein als der Bogen. Dieser Streifen liegt im Beschnitt und wird
abgeschnitten. Für die Vorlage in diesem Repository ist das **nicht** nachgemessen.

## Vor dem Versand

- [ ] Dateigröße gleich Endformat plus Beschnitt
- [ ] Gestaltung läuft bis an den Rand des Beschnitts, kein weißer Streifen
- [ ] aller Text mindestens 6 mm innerhalb des Endformats
- [ ] Schriften im PDF eingebettet, Lizenz für Druck geprüft
- [ ] Fotos 300 dpi bei Endgröße (bei sehr großen Plakaten genügen 150 bis 250)
- [ ] Farbraum: Druckereien erwarten meist CMYK, die Druckerei konvertieren lassen, kleine Abweichungen einplanen
- [ ] Dateityp PDF
- [ ] Probedruck oder Proof angesehen
- [ ] jeder Social-Zuschnitt für seinen Platz gemacht
- [ ] Nur gelieferte Fakten auf dem Plakat: kein erfundenes Datum, kein Preis, kein Name

## Auftrag

```
R: Referenzplakat: [[FEHLT: Link oder Bilddatei, nur nach Freigabe]]. Meine Marke: [[FEHLT]]. Meine Fakten: [[FEHLT: Titel, Datum, Ort, eine Zeile]].
I: Baue ein [[FEHLT: A2 hoch]] Plakat für [[FEHLT]]. Studiere zuerst die Referenz und schreibe poster-notes.md:
   Raster, Schriftgrößen, Farben mit Hexwerten, Weißraum, der eine ungewöhnliche Zug. Schreibe dann drei
   Layoutideen in diesem Stil. Anhalten und auf meine Wahl warten.
S: Struktur und Gefühl kopieren, nie Bild, Worte, Logo oder Figuren. Nur meine Fakten, keine erfundenen
   Daten, Preise oder Namen. In HTML und CSS in Originalgröße in mm, 3 mm Beschnitt, 6 mm Sicherheitsrand.
   Ein großes Ding zum Zuerstansehen. Alle Schriften einbetten. Höchstens zwei Schriften.
E: Zeige zuerst eine kleine Vorschau. Prüfe, dass aller Text im Sicherheitsrand liegt und der Titel bei
   200 px Breite noch lesbar ist. Exportiere ein Vektor-PDF in Endformat plus Beschnitt, ein PNG mit 300 dpi
   und einen Zuschnitt 4:5. Jeder Punkt der Liste oben muss bestanden sein.
```
