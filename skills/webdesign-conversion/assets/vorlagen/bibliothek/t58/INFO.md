# t58 Studio Nachtschicht

Prinzip nach der freigegebenen Referenz Hyperfit (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Fitnessstudios, Boxen, Yoga und Kursstudios, Personal Trainer und alle Angebote mit Tarifen, Team und Probetermin. Ganz dunkle Seite mit einer kräftigen Signalfarbe, gedacht für starke Fotos von Menschen im Training. Ohne gutes Bildmaterial verliert sie ihren Kern. Eine Alternative mit heller, ruhiger Seite und Programmliste ist t28. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Leiste mit Kontakt und Zeiten, Kopf mit Pillenmenü, Vollbildheld (Text unten links, zwei Merkmale unten rechts), Partnerzeile, Studio (Aussage, Kennzahlenpille, Bildcollage mit Gesichtern und Stimmen), Leistungen (Kopf bleibt stehen, nummerierte Liste), Team (drei Porträtkarten), Warum (Mittelbild mit beschrifteten Linien), Ablauf (fünf Karten, drei und zwei), Tarife (Umschalter Monat oder Jahr, mittlerer Tarif hervorgehoben), Stimmen (Karte mit Text und Bild, Pfeile), Fragen (Akkordeon), Kontakt (Angaben links, Formular mit Linienfeldern rechts), App Band mit Handy, Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Studio | Kennzahlen zählen, Endwert steht im HTML | `data-zaehle` |
| Collage | Gesichtskarten laufen leicht gegen die Scrollrichtung (nur ab 62rem) | `data-parallax` |
| Kopf | Kopfleiste bleibt stehen, wird nach dem Scrollen dunkel, Pille des Abschnitts im Blick | `position: sticky`, `bewegung.js` |
| Leistungen | Kopfblock bleibt beim Scrollen stehen, Zeile färbt die Zahl beim Berühren (ab 62rem sticky) | `position: sticky`, CSS `:hover` |
| Team | Bild zoomt beim Berühren leicht | CSS `:hover` |
| Ablauf | Karte hebt an, Rand in Akzent | CSS `:hover` |
| Tarife | Umschalter ändert Preise und Einheit | `stil.js` (ohne JavaScript bleibt er verborgen, Monatspreise stehen im HTML) |
| Stimmen | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Fragen | Akkordeon, Plus dreht zum Kreuz | `details` mit `data-exklusiv`, CSS |
| App | Handy läuft leicht gegen die Scrollrichtung | `data-parallax` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript steht das Menü als Zeile unter dem Kopf.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-karte`, `--flaeche-pille`, `--text`, `--text-leise`, `--linie`, `--akzent` (Limette, Fläche mit dunklem Text, auf Dunkel auch Text und Linie), `--akzent-text`, `--akzent-tief` (zweiter Ton im Verlauf des App Bandes), `--schrift-titel` (Archivo, Versalien, schwer und leicht im Wechsel), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` und auf `--akzent-tief`, `--text-leise` auf `--flaeche-alt` und `--flaeche-karte`. Bei einem dunkleren Akzent (zum Beispiel Rot) die Texte auf dem Akzent hell setzen. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Preise, Zahlen, Namen, Stimmen, Adressen, Öffnungszeiten und die Beispiellogos sind Beispiele, keine Belege. Die App Knöpfe zeigen auf keinen Store. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen (Schleier sind auf die Platzhalter abgestimmt). Drei Links im Fuß (Impressum, Datenschutz, Widerruf) sind Platzhalter, Rechtstexte fehlen bewusst. Tarife brauchen im echten Einsatz Pflichtangaben (Laufzeit, Kündigung, Gesamtpreis).

## Conversion (Playbook)
- Titel auf 48 Zeichen, Beschreibung auf 160 Zeichen gekürzt
- Kommentar zur Heldformel vor der H1
- Feldhinweise unter E-Mail und Telefon (`.feld__hinweis` in `stil.css`)
- Kopfknopf, Telefon, FAQ waren schon da. Kein eigener Beleg im Held: die zwei Merkmale (Preise, Probezeit) stehen dort, die Partnerzeile folgt direkt darunter
