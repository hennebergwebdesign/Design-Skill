# t50 Produkt hell Raster

Prinzip nach der freigegebenen Referenz Stoic (Startseite, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Software und Produkte mit langer Seite: Aufgaben, Planung, Zusammenarbeit, Abläufe. Passt für Start ups mit erklärungsbedürftigem Produkt, die Funktionen, Tarife, Team und Fragen auf einer Seite zeigen. Die Oberflächenbilder sind aus HTML gebaut und gehören durch echte Ansichten ersetzt. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Rote Ankündigungsleiste, helle Kopfzeile mit Hauptknopf (schwarz, rotes Pfeilfeld), Held auf Rasterlinien mit rot angelegten Zellen und Pillen am Rand, Oberfläche im roten Rahmen, Aussagesatz mit Wortlicht und Werkzeugzeile, drei Karten mit kleinem Beispiel, Funktionen (Überblick, drei Zeilen abwechselnd mit Bild im roten Feld), schwarzer Abschnitt mit roter Kante (Pillenfeld um die Frage, Lösung in sechs Punkten, dunkelrote Leiste), Integrationen als Kachelfeld mit Mittelpunkt, Beiträge als dunkle Spur mit Pfeilen, Preise (zwei Tarife im Rahmen, Umschalter, Zeile für größeren Bedarf), Team (große Zitatkarte, drei Gründungskarten), Stimmen als Kachelfeld mit Logozellen, Fragen als Akkordeon, Fuß mit Aufruf, großem Zeichen und Linkspalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | rot angelegte Rasterzellen glimmen, Pillen schweben | CSS `opacity` und `transform` |
| Aussagesatz | Wörter hellen beim Scrollen auf | `data-licht` |
| Abschnitte | Einblenden, Staffeln | `data-zeig`, `data-staffel` |
| Oberflächenbilder | Einblenden mit leichtem Vergrößern | `data-zeig="skala"` |
| Dunkler Abschnitt | Pillen schweben um die Frage | CSS `transform`, ab 56 rem |
| Integrationen | Symbolkacheln heben sich versetzt | CSS `transform` |
| Beiträge | Spur mit Scroll Snap, Pfeilknöpfe | `stil.js`, ohne JavaScript wischbar |
| Preise | Umschalter tauscht die Beträge | `stil.js`, ohne JavaScript gilt der Monatspreis |
| Fragen | Akkordeon, Plus dreht zum Kreuz | `details` mit `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--tinte` (Hauptknopf), `--text`, `--text-leise`, `--linie`, `--akzent` (Zinnoberrot, Fläche mit weißem Text, auf Hell auch Text), `--akzent-text`, `--akzent-hell`, `--akzent-auf-dunkel`, `--akzent-dunkel` (Leiste), `--zelle` (Kantenlänge der Rasterzelle), `--schatten`, `--schrift-titel` (Hanken Grotesk, Versalien), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` (Pillen, Pfeilfeld), `--akzent` als Text auf `--flaeche`, `--akzent-auf-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, mehrere Stellen, Datei `favicon.svg`), Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Zahlen, Namen, Stimmen, Preise, Beiträge und Logos sind Beispiele, keine Belege. Der Text in den Oberflächenbildern skaliert mit dem Rahmen, ist auf dem Handy kleiner als 16 px und für Bildschirmleser ausgeblendet. Ob die Referenz Pillen und Kacheln beim Scrollen per Physik oder per Scrollsteuerung bewegt, war aus der Erfassung nicht sicher zu erkennen, hier schweben die Pillen nur leicht. Links im Fuß sind Platzhalter.

## Conversion (Playbook)
- Telefon im Schlussbereich über dem Fuß (`.fuss__tel`).
