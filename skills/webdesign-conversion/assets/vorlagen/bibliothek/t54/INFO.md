# t54 Finanz Plattform (drei Varianten)

Prinzip nach der freigegebenen Referenz Neurex (Startseiten 1, 2 und 3, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Eine Marke, drei Aufbauten: `marke.css` und `stil.css` gelten für alle, `stil-v1.css`, `stil-v2.css` und `stil-v3.css` nur für die jeweilige Seite.

## Eignung
Steuer- und Unternehmensberatung, Finanzdienstleister, Buchhaltungs- und Planungssoftware, B2B Plattformen mit erklärungsbedürftigem Produkt. Lebt von Oberflächen als Bild (Kennzahlkarten, Diagramme) und von Beweisen in Zahlen. Ansprache im Du, für Sie im Text ersetzen. Ohne echte Kennzahlen und Kundenstimmen verliert die Seite ihren Beweis.

## Varianten
| Datei | Name | Aufbau |
|---|---|---|
| `index.html` | Held mit Kippbild | Held mit Text links und rechts, Logoband im Held, große geneigte Bildfläche mit schwebenden Karten, vier Kennzahlkarten, schräges Zitat, Reiter, sechs Leistungen in einer Karte, dunkler Abschnitt mit drei Karten, Logoreiter, drei Beiträge |
| `v2.html` | Held mit Bildkollage | Held mit Text links und Bildkollage rechts, Logoband auf Weiß, Textkarte neben Bild, Bild in der Mitte mit je drei Feldern, dunkel mit Zitat, Kennzahlen unter Gesichtern in der Überschrift, zwei Schieber |
| `v3.html` | Held zentriert mit Brett | Held zentriert mit Brett aus Bild, Oberflächen und Bild, Logoband, Fächer auf Grau, drei Schrittkarten, dunkle Reiter mit großer Tafel, drei Kennzahlspalten, Mauer aus sechs Stimmen, zwei Beiträge |

Kopf, Fuß, Logo und Name sind in allen drei gleich. Der Fuß verlinkt die drei Startseiten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held (v1) | Bildfläche liegt geneigt und richtet sich beim Hochscrollen auf, Karten laufen leicht gegen | `data-kipp` in `stil.js` (`--k`, nur transform), `data-parallax` |
| Überall | Einblenden, Staffeln | `data-zeig`, `data-staffel` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| Logobänder | Laufband, Pause beim Überfahren | `.band` |
| Reiter, Logoreiter, Schieber | Tafel wechseln, Pfeiltasten, Pfeile | `data-schieber` in `stil.js`; ohne JavaScript stehen alle Tafeln untereinander |
| Fächer (v3) | Akkordeon, Pfeil dreht | `details` mit `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Hauptknopf, Fläche mit dunklem Text), `--akzent-text`, `--marke-tief` und `--marke-hell` (Verlauf im Held und im Aufruf), `--marke-text` (Marke als Text auf Hell), `--tint`, `--graf`, `--graf-hell`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--marke-text` auf `--flaeche` und `--tint`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf `--flaeche-dunkel`, weißer Text auf `--marke-tief`. Der Verlauf läuft von `--flaeche-dunkel` über `--marke-tief` und `--marke-hell` nach `--flaeche`; Weiß steht nur im oberen, dunklen Teil. Name und Zeichen (Symbol `#i-marke`, Kopf und Fuß), Bildplatzhalter durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare gibt es nicht, der Aufruf `#kontakt` ist ein Platz für Formular oder Terminbuchung. Alle Zahlen, Namen, Stimmen und Oberflächenkarten sind Beispiele, keine Belege. Logos sind Beispiellogos. Die Videostimme in v3 ist ein Standbild ohne Video. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Links im Fuß (Impressum, Datenschutz, Netzwerke) sind Platzhalter. Reiter in v1 wechseln nur den Text, nicht das Bild.

## Conversion (Playbook)
- Beschreibung in `index.html` und `v2.html` auf unter 160 Zeichen gekürzt.
- `index.html` und `v2.html`: neue Sektion Fragen (`#fragen`) vor dem Schlussbereich, fünf Einwände im Fächer Stil der Variante 3 (Symbol, Pfeil). Regeln `.fragen__liste` in `stil-v1.css` und `stil-v2.css`.
- Telefon im Schlussbereich (`.cta__tel`) in allen drei Varianten.
- Sektionsfolge: Fragen steht zwischen Ratgeber und Schlussbereich (v1 und v2).
