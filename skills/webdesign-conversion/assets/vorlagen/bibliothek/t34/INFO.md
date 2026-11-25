# t34 Bistro mit Bogenbildern

Prinzip nach der freigegebenen Referenz Bistrovia (Startseite und Home 2, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Zwei Varianten teilen `marke.css`, `stil.css` und `stil.js`.

## Eignung
Bistro, Restaurant, Café, Catering und Eventgastronomie mit Karte, Tischreservierung und Veranstaltungen. Lebt von Fotos mit Tellern, Gästen und Team: Die Bogenform macht aus jedem Foto eine Marke. Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Fotos verliert die Seite den Kern.

## Varianten
| Datei | Name | Aufbau |
|---|---|---|
| `index.html` | Bogenband dunkel | Dunkelgrüner Held mit Großtitel, Bogenband, Über uns mit drei Bögen, dunkle Karten, Tischformular, Galerie, Stimmen, Team |
| `v2.html` | Doppelbogen hell | Heller Held mit zwei gekippten Bögen, Über uns mit Kennzahlen, Karte als Liste, gerahmte Feier, Termine, Partnerband, Neuigkeiten, Bilderreihe |

Kopf, Fuß, Logo und Name sind in beiden gleich. Die Links „Variante 1, Variante 2“ im Fuß sind nur für die Vorschau und beim Einsatz zu entfernen.

## Sektionsfolge
**Variante 1:** Kopf (Logo mittig, Doppellinie, Menü, Hauptknopf), Held, Bogenband, Über uns (drei Bögen mit Zeichenkreis), Karte (acht Karten), Tisch reservieren (Formular, Bogenbild, Zeiten), Galerie (Spur mit Pfeilen), Stimmen (Zitat, zwei gekippte Bilder), Team (vier gekippte Karten), Fuß (Newsletter, vier Spalten, Großschrift).
**Variante 2:** Kopf, Held mit zwei Bögen, Über uns (Bild, Text, drei Kennzahlen), Karte als Liste, Feier (Rahmen, Großtitel, Bogenbild, zwei Spalten), Termine (vier Karten, versetzt), Partnerband, Neuigkeiten (Text und vier versetzte Karten), Bilderreihe, Fuß. Neu: Fragen (Akkordeon mit fünf Beispielantworten) nach dem Team, vor dem Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, Staffelung | `data-zeig`, `data-staffel` |
| Variante 1, Held | Bogenband läuft, pausiert beim Überfahren | `.band` |
| Variante 2, Held | Beide Bögen laufen leicht gegen die Scrollrichtung | `data-parallax` |
| Variante 2, Über uns | Zähler, Endwert steht im HTML | `data-zaehle` |
| Variante 2, Partner | Logolaufband | `.band` |
| Galerie, Stimmen | Spur mit Scroll Snap und Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Fuß | Großschrift wandert beim Scrollen nach links | `stil.js`, nur `translate` |
| Alle Seiten | Schnellleiste unten (Karte, Tisch, Galerie), schließbar | nur mit JavaScript |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Das Bogenband wird bei reduzierter Bewegung zur wischbaren Reihe.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Tannengrün), `--flaeche-dunkel-2` (Tintenblau), `--knopf-dunkel`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--linie-dunkel-2`, `--akzent` (Aprikose: auf Dunkel Fläche mit dunklem Text), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--schrift-titel` (Newsreader), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-tief` auf `--flaeche`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf beiden dunklen Flächen. Name und Zeichen im Logo (Kopf, Fuß, `favicon.svg`), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Die Großschrift im Fuß füllt sich über einen Verlauf aus den `--ton`-Werten, mit einem Foto als Hintergrund wird daraus eine Bildfüllung.

## Offen
Formulare senden nichts. Preise, Zeiten, Kennzahlen, Namen, Stimmen, Termine und Adresse sind Beispiele, keine Belege. Die Logos in Variante 2 sind Beispiellogos. Die Pfeile an den Karten führen nur zum Reservierungsabschnitt, es gibt keine Detailseiten. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Die Platzhalterbeschriftung ist nur ein Hinweis und verschwindet mit dem Foto.

## Conversion (Playbook)
- Fragen vor dem Besuch als Akkordeon (`#fragen`, fünf Fragen zu Preis, Dauer, Küche, Absage, Reservierung), Antworten als Beispiel markiert, in beiden Varianten
- Beleg im Held (Sterne mit Beispielwert) und Kommentar zur Heldenformel vor der H1
- Feldhinweis unter Mail oder Telefon im Reservierungsformular (`.feld__hinweis`), Formular bleibt bei fünf Feldern
