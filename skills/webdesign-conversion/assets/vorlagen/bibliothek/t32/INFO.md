# t32 Dach und Bau

Prinzip nach der freigegebenen Referenz Roofex (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Dachdecker, Zimmerer, Spengler und verwandte Handwerksbetriebe mit Notdienst, Beratungstermin vor Ort und Festpreisangebot. Auch für Bau, Sanierung, Fenster und Haustechnik mit wiederkehrender Anfrage. Ansprache im Sie.

## Sektionsfolge
Kopf mit Notdienstleiste, Vollbildheld (Bild, Hauptaktion, WhatsApp, Telefon), Vertrauensleiste (Bewertung und fünf Siegel), Über uns auf Farbfläche (Wortlichtsatz, vier Kennzahlen, großes Bild), Stimmenlaufband, Leistungen (sechs Karten), Qualität (Bild bleibt stehen, Liste mit mitlaufendem Punkt), Ablauf (drei Schritte), Vorteil (Text, versetzte Bilder, schwebende Karte), Stimmen (Kartenmauer auf Farbfläche), Termin (Formular in Karte auf geteiltem Grund), Ratgeber (zwei Karten), Fuß mit Abschluss.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bild läuft beim Scrollen langsamer, dunkelt ab, Text staffelt ein | `data-abdunkeln`, `data-zeig`, `data-staffel` |
| Über uns | Wortlicht, Zähler mit Endwert im HTML | `data-licht`, `data-zaehle` |
| Siegel, Karten, Schritte | Einblenden gestaffelt | `data-zeig` |
| Stimmenband | Laufband, hält beim Berühren an | `.band` |
| Leistungen | Karte hebt an, Pfeil rückt | CSS `:hover` |
| Qualität | Punkt wandert an der Linie mit | `stil.js`, `--p` |
| Vorteil | Karte schwebt | CSS `@keyframes schweben` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar. Der Endwert der Zähler steht im HTML.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Aktion, Fläche mit dunklem Text), `--akzent-text`, `--ziegel` und `--ziegel-*` (Farbfläche für Über uns und Stimmen), `--karte`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: weiße Schrift auf `--ziegel` mindestens 4,5 zu 1, `--akzent-text` auf `--akzent`. Bildplatzhalter (`.bild[data-platzhalter]`) durch Kundenfotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Das Heldenbild braucht ein dunkles, ruhiges Foto, der Schleier sichert die Lesbarkeit.

## Offen
Formulare senden nichts. Bewertung, Siegel, Kennzahlen, Stimmen, Namen, Telefon, WhatsApp und Adresse sind Beispiele und keine Belege; Siegel nur zeigen, wenn der Betrieb sie wirklich führt. Kontrast über den Bildflächen nach dem Einsetzen der Fotos neu prüfen. Der Ratgeber verlinkt nur auf den Termin.
