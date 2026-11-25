# t40 Finanzen hell

Prinzip nach der freigegebenen Referenz finhero-fintech.webflow.io (Startseite, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Finanzberatung, Steuer und Buchhaltung, Zahlungsdienste, Software mit Dashboard und Beratung mit erklärungsbedürftigem Angebot. Wirkt hell, weich und produktnah, weil die Beispielkarten Oberflächen zeigen. Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Produktansichten oder Zahlen bleiben die Beispielkarten Dekoration und müssen durch echte Inhalte ersetzt oder gestrichen werden.

## Sektionsfolge
Schwebende weiße Leiste (Menü, Telefon, Hauptknopf), Held auf Verlaufsfläche mit Laufband aus Beispielkarten, Logoband, großer Satz mit Wortlicht über einer Mappengrafik, zwei große Leistungskarten (Formular mit Telefonansicht, Auswertungsliste), Über uns (Porträtkarte mit Kennzahl, Verlaufkarte mit Zahlenfeld), Prinzipien (drei Karten, die seitlichen gekippt, auf heller Bühne), Lösungen (graue Fläche, zwei Karten, eine breite Karte mit Plan), Werkzeuge (drei kleine Karten, breite Verlauffläche), Stimmen (Porträtreiter und große Zitatkarte), Fragen (Akkordeon), Aufruf mit Formular und Ansicht, dunkler Fuß mit Großschrift.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Karten laufen als Band, Pause beim Überfahren | `.band` |
| Überschriften und Karten | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Anspruchssatz | Wortlicht Wort für Wort | `data-licht` |
| Zahlenfeld | Zähler, Endwert steht im HTML | `data-zaehle` |
| Prinzipien | seitliche Karten richten sich beim Überfahren auf | CSS, nur `transform` |
| Stimmen | Reiter wechseln die Zitatkarte, Pfeiltasten | `stil.js` |
| Fragen | Akkordeon, Plus wird zum Minus | `details`, `data-exklusiv` |
| Aufruf | Ansicht schiebt sich leicht gegen die Scrollrichtung | `data-parallax` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Leiste mit, mit JavaScript bleibt sie stehen und ist in der Höhe der Seite sichtbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-hell`, `--tinte` (dunkler Hauptknopf), `--verlauf-tief`, `--verlauf-mitte`, `--verlauf-hell`, `--verlauf-warm` (Verläufe), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--positiv`, `--schrift-titel` und `--schrift-text` (Hanken Grotesk), Radien.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: weißer Text auf `--verlauf-tief` und `--verlauf-mitte` (Held, Verlaufkarte, Aufruf), `--akzent` auf `--akzent-hell`, `--akzent-text` auf `--akzent`. Name und Zeichen im Logo (Symbol `#i-zeichen`, mehrere Stellen), Bildplatzhalter durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Zahlen, Namen, Stimmen, Logos und Adresse sind Beispiele, keine Belege. Die Beispielkarten im Laufband und in den Leistungskarten sind erfundene Oberflächen, keine Produktabbildungen. Kontrast von Text über echten Fotos nach dem Einsetzen neu prüfen. Texte in den Beispielkarten sind teils kleiner als 16 Pixel, sie sind Abbildungen, kein Fließtext. Bei einer Finanzdienstleistung rechtliche Pflichtangaben (Erlaubnis, Aufsicht) ergänzen.
