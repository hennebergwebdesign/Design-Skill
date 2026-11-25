# t36 Restaurant Magazin

Prinzip nach der freigegebenen Referenz Ambrosia (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Restaurants mit Anspruch, Weinbars, Manufakturküchen und Gastronomie mit eigener Geschichte, die sich wie ein Magazin lesen soll: Großschrift, feine Linien, versetzte Bilder, viel Luft. Lebt von Fotos mit Stimmung und von einem Namen, der groß stehen darf. Ansprache im Du, für Sie im Text ersetzen. Mit schwachen Fotos wirkt die Seite leer.

## Sektionsfolge
Kopf (Logofeld, Pille, Menü, Reservieren), Held mit Namen in Großschrift und Hinweislinie, Öffnungszeile, Bogenstreifen aus Bildern mit Olivlinie, Über uns (Etikett links, Text rechts, Filmplatzhalter), dunkles Laufband mit Schlagworten, Kategorien (zwei Spalten, rechts versetzt, Großtitel über dem Bild), Reservierungsbanner mit senkrechtem Rand, Karte mit Reitern und drehendem Punktkreis, Stimmen mit Rundbildern, Küche (großes Bild, Namen, Geschichte), Warum wir (Liste, Text, Porträt), gekippte Karte „Heute frisch“ auf Bild, Bilderreihe mit versetzten Rahmen, Journal, Aufruf mit zwei Links, Fuß mit angeschnittenem Namen. Neu: Fragen (Akkordeon) vor dem abschließenden Aufruf.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, Staffelung | `data-zeig`, `data-staffel` |
| Held | Punkt fällt an der Hinweislinie | CSS `transform`, bei reduzierter Bewegung aus |
| Bogenstreifen, Schlagworte | Laufband, pausiert beim Überfahren | `.band` |
| Karte | Reiter wechseln die Tafel, Pfeiltasten gehen mit | `stil.js` |
| Karte | Punktkreis dreht sich langsam | CSS `transform` |
| Stimmen | Rundbilder schalten das Zitat um | `stil.js` |
| Über uns | Play Knopf zeigt nur einen Hinweis | `stil.js` |
| Listen, Links, Journal | Zeile rückt beim Überfahren, Bild wächst leicht | CSS `transform` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar: die Karte zeigt alle vier Tafeln untereinander, die Stimmen stehen untereinander, die Laufbänder werden wischbar.

## Tokens (marke.css)
`--flaeche` (Sand), `--flaeche-alt`, `--flaeche-dunkel` (Waldschwarz), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Olive: Fläche mit weißem Text, Linien und Text auf Hell), `--akzent-text`, `--akzent-hell` (Akzent auf Dunkel), `--schrift-titel` (Newsreader), `--schrift-text` (Instrument Sans), Radien (Knopf Pille, Karte und Bild eckig), `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche` und `--flaeche-alt`, `--akzent-text` auf `--akzent`, `--akzent-hell` auf `--flaeche-dunkel`. Name im Kopf, im Held, im Film, im Fuß und in `favicon.svg`, Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Der Name im Held ist Großschrift in Versalien, ein langer Name braucht eine kleinere Schriftgröße in `.held h1`.

## Offen
Es gibt kein Formular: Reservierung und Anfragen laufen über Mailtos als Platzhalter. Preise, Zeiten, Namen, Stimmen, Standorte und Auszeichnung sind Beispiele, keine Belege. Der Imagefilm ist ein Platzhalter ohne Video. Die Kategorie Links und die Pfeile in „Heute frisch“ führen nur zu Abschnitten der Seite. Der Bogen des Streifens ist ein `clip-path` und schneidet Bildinhalt an den Rändern ab, bei Fotos mit Motiv am Rand prüfen. Kontrast von Text über Fotos (Banner, Aufruf, Platzhalterhinweise) nach dem Einsetzen neu prüfen.

## Conversion (Playbook)
- Fragen als Akkordeon (`#fragen`) vor dem Aufruf Tisch buchen, fünf Beispielantworten
- Beleg unter der Unterzeile im Held (Stern mit Beispielwert), Kommentar zur Heldenformel vor der H1
- Das Symbol `#i-plus` wurde der Spritesheet ergänzt
