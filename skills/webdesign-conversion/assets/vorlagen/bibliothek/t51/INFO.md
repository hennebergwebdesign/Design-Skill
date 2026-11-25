# t51 Beratung hell, Bogenblätter

Prinzip nach der freigegebenen Referenz Corporatex (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Beratung, Steuer, Finanzen, Recht, Agentur und andere Dienstleister mit erklärungsbedürftigem Angebot und gestaffelten Paketen. Funktioniert hell und ruhig, mit warmem Papierton, Salbeiflächen und runden Blättern, die über den vorigen Abschnitt schieben. Ansprache im Du, für Sie im Text ersetzen. Ohne ein gutes Porträtfoto im Held verliert die Seite ihren Einstieg.

## Sektionsfolge
Freistehende Salbeileiste, Vollbildheld (zwei Zeilen, Hauptknopf, Telefon, Unterschrift), Einstieg (Kicker, Satz, drei Spalten mit Symbol), Beratung (großer Titel mit Akkordeon neben Hochformatbild), Teiler eins (Bild links, Salbeifläche mit Rufkarte), Teiler zwei (Salbeifläche mit Haken, Bild mit großer Rundung), Leistungen (fünf Rahmenkarten und ein Aufruf auf Salbeiband), Schwerpunkte (vier große Bildkarten mit überlappender Textkarte), Preise (Bildband, Blatt mit drei Paketen, Vergleichstabelle, Kundenfläche), Stimmen (Reiter mit Punkten), Kontakt (Laptop links, Formular als Pille), Blog (zwei Beiträge), Folge uns (fünf Kacheln über die ganze Breite), Fuß als Salbeiblatt.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | zwei Zeilen laufen aus einer Maske ein, Bild dunkelt beim Scrollen ab | CSS Animation (`transform`, `opacity`), `data-abdunkeln` |
| Abschnitte | Blätter mit runden Oberkanten schieben über den Held und den vorigen Abschnitt | CSS (negativer Rand) |
| Karten, Pakete, Beiträge | blenden gestaffelt ein, Karten heben sich beim Überfahren | `data-zeig`, `data-staffel`, CSS |
| Beratung | Akkordeon, Plus dreht zum Kreuz, nur eines offen | `details` mit `data-exklusiv` |
| Stimmen | Reiter mit Scroll Snap, Punkte springen und folgen dem Wischen | `stil.js`, ohne JavaScript wischbar |
| Preise | Ecke "Beliebt" an der Mittelkarte | CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü, Nach-oben-Knopf erscheint beim Scrollen | `bewegung.js`, CSS |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, mit JavaScript bleibt sie stehen.

## Tokens (marke.css)
`--flaeche` (Papierton), `--flaeche-alt` (Salbei), `--flaeche-alt-2`, `--flaeche-hauch`, `--flaeche-dunkel` (Tinte für Hauptknopf), `--text`, `--text-leise`, `--linie`, `--akzent` (Tannengrün, nur Symbole, Haken, Reiterknöpfe), `--akzent-text`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien (`--radius-karte`, `--radius-gross`), `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche` und `--flaeche-alt`, `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche-alt`. Name und Punkt im Logo (zwei Stellen), Platzhalterflächen durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Der Hauptknopf ist Tinte, nicht der Akzent: das ist Absicht, damit eine neue Akzentfarbe nicht den Knopf kippt.

## Offen
Formulare senden nichts. Preise, Vergleich, Stimmen, Namen, Telefon, Adresse und Logos sind Beispiele, keine Belege. Die Unterschrift ist ein erfundenes Beispiel, vor dem Einsatz durch die echte oder streichen. Kontrast von Text über Fotos im Held nach dem Einsetzen neu prüfen. Zwei Links im Fuß (Impressum, Datenschutz) sind Platzhalter. Die Tabelle scrollt auf dem Handy seitlich.

## Conversion (Playbook)
- Beschreibung auf unter 160 Zeichen gekürzt.
- Feldhinweis unter E-Mail im Kontaktformular (`.feld__hinweis`). Das Formular hat zwei Felder. Auf Breiten ab 56 rem liegen die Felder jetzt nebeneinander und der Knopf in einer eigenen Zeile, statt als eine Pille, weil der Hinweis die Pille sonst verzerrt.
