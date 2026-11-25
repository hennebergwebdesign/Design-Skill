# t59 Studio Kobalt

Prinzip nach der freigegebenen Referenz Flexova (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Fitnessstudios, Trainingsräume, Crossfit und Kursstudios mit Coaches, Kursen und mehreren Mitgliedschaften. Ganz dunkle Seite, breit bis nah an den Rand, kräftige Versalienüberschriften und große Farbflächen als Panels. Lebt von starken Fotos oder einem kurzen Video im Held. Eine Alternative mit runden Formen und Pillenmenü ist t58, eine helle mit Programmliste t28. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Kopf mit Menü Wort und rundem Knopf (das Menü klappt daneben auf), Vollbildheld (Auszeichnung, H1 in zwei Tönen, zwei Knöpfe, Telefon), Studio (Bild links, Text, Haken, Knöpfe), Kennzahlen, Kurse (Kopf mittig, Spur mit breiten Karten aus Bild und Farbpanel, Punkte), Coaches (Karten stapeln sich beim Scrollen, links wächst eine Leiste), Mitgliedschaften (drei Tarife, der mittlere hervorgehoben, Partnerzeile), Ablauf (Zeitleiste mit drei Schritten), Stimmen (breite Zitate in einer Spur, Punkte), Fragen (Akkordeon), Kontakt (Bild mit zwei Bändern, Formular mit Linienfeldern), Schlussband in der Akzentfarbe mit Aufruf und Newsletter, Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Überschriften | Wortlicht, die Wörter hellen beim Scrollen auf | `data-licht` |
| Alle Abschnitte | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Held | Bild dunkelt beim Scrollen leicht ab | `data-abdunkeln` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| Kopf | Kopfleiste bleibt stehen, wird nach dem Scrollen dunkel, Menü klappt am Desktop daneben auf, am Handy als Panel | `position: sticky`, `bewegung.js`, `stil.js` |
| Kurse, Stimmen | Spur mit Scroll Snap, Punkte springen zur Karte | `stil.js`, ohne JavaScript wischbar (die Punkte entstehen erst mit JavaScript) |
| Coaches | Karten bleiben stehen und die nächste schiebt sich darüber, die Leiste links füllt sich (nur ab 62rem, darunter Liste) | `position: sticky`, `data-fortschritt` mit `--fortschritt` |
| Ablauf | Schritte, die die Bildschirmmitte erreicht haben, färben sich, Knoten und Linie werden hell | `stil.js` (ohne JavaScript sind alle gefärbt) |
| Fragen | Akkordeon, Plus wird zum Minus | `details` mit `data-exklusiv` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript steht das Menü als Zeile unter dem Kopf.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-karte`, `--flaeche-grau`, `--text`, `--text-leise`, `--linie`, `--akzent` (Kobalt, nur als Fläche mit heller Schrift), `--akzent-text`, `--akzent-hell` (Akzent als Text und Linie auf Dunkel), `--schrift-titel` (Lexend, Versalien, schwer), `--schrift-text` (Instrument Sans), Radien (klein, eckig), `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` (5,9 zu 1), `--akzent-hell` auf `--flaeche` und `--flaeche-karte`, die Schrift `#dfe4ff` der zweiten Titelwörter in den Kurskarten steht fest im CSS und gehört bei neuem Akzent mitgeprüft. Name und Punkt im Logo (zwei Stellen in `index.html`), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare (Kontakt und Newsletter) senden nichts. Preise, Zahlen, Namen, Stimmen, Adressen, Öffnungszeiten, Bewertung und die Beispiellogos sind Beispiele, keine Belege. Der Held ist ein Standbild, ein Video wäre einzusetzen (mit Pause, Poster und ohne Ton). Die Bänder im Kontakt haben keine Falte wie die Referenz. Der Newsletter braucht ein Double Opt In und eine Datenschutzangabe. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Drei Links im Fuß (Impressum, Datenschutz, Widerruf) und der Kartenlink sind Platzhalter.

## Conversion (Playbook)
- Held: Trainierende, die ohne Plan nicht vorankommen, Lösung Coach mit Plan, der zum Alltag passt
- H1 "Stärker werden mit Plan" (zwei Töne, Spans unverändert), Unterzeile beschreibt das Wie
- Primär-CTA "Probetraining buchen" in Kopfzeile, Held, Schlussband und Formular, zeigt auf das Kontaktformular
- Titel mit Keyword und Musterstadt, Beschreibung mit Problem, Nutzen und Aufruf
- FAQ: Einsteiger an Gewichten, Mitgliedschaft, Personal Training oder Plan, Pause und Kündigung, Kurse, Mitbringen
- Formularziel: Probetraining anfragen, Anliegen beginnt mit Probetraining, Feld "Dein Ziel", Hinweise unter Mail und Telefon
- Auszeichnung und Bewertung im Held bleiben als Beispiel markiert
