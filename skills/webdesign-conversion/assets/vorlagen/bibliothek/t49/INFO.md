# t49 SaaS hell Dashboard

Prinzip nach der freigegebenen Referenz SaaSFlow (Startseite, dazu Preis- und Funktionsseite erfasst, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Software als Dienst, Auswertungs-, Planungs- und Versandwerkzeuge, Plattformen mit Integrationen und Tarifen. Auch für Beratungen, die ein Produkt erklären müssen. Die Oberflächenbilder sind aus HTML gebaut und müssen durch echte Ansichten des Produkts ersetzt werden. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Ankündigungsleiste, feste Kopfzeile (Logo, Menü, Anmelden, Hauptknopf), Held mit Text links und überlagerten Oberflächenkarten rechts, Kennzahlen in drei Spalten mit Trennlinien, Funktion 1 (Bild links, Text mit zwei Häkchenpunkten rechts), Funktion 2 dunkel (drei Reiter links, Fläche rechts), Integrationen (zwei Reihen Karten, die gegeneinander laufen), Funktion 3 (Text links, Bild rechts), Akzentband mit sechs Punkten, Stimmen (zwei Reihen, gegenläufig), Ratgeber (ein großer, zwei kleine Beiträge), Aufruf als Akzentkarte, die in den dunklen Fuß ragt, Fuß mit Brief und drei Linkspalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, Abschnitte | Einblenden und Staffeln | `data-zeig`, `data-staffel` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| Oberflächenbilder | Einblenden mit leichtem Vergrößern | `data-zeig="skala"` |
| Funktion 2 | Reiter wechseln die Fläche, Pfeiltasten gehen | `stil.js`, ohne JavaScript stehen alle Flächen untereinander |
| Integrationen | zwei Reihen laufen endlos gegeneinander, Pause beim Überfahren und bei Fokus | CSS `transform` |
| Stimmen | zwei Reihen laufen endlos gegeneinander, Pause beim Überfahren | CSS `transform` |
| Ratgeber | Karte hebt sich beim Überfahren | CSS `transform` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung stehen die Reihen still und lassen sich seitlich scrollen, die doppelten Hälften sind ausgeblendet. Ohne JavaScript ist alles sichtbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Petrolgrün, Fläche mit weißem Text, auf Hell auch Text), `--akzent-text`, `--akzent-hell`, `--akzent-auf-dunkel`, `--flaeche-dunkel-2`, `--punkt` (Zierpunkte), `--schatten`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter. Das Diagramm und der Tacho im HTML tragen ihre Farben fest im SVG (`#0f766e`, `#e8590c`), bei einem Markenwechsel dort nachziehen.

## Marke wechseln
Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` (Band, Aufruf, Knöpfe), `--akzent-auf-dunkel` auf `--flaeche-dunkel`, `--text-leise` auf `--flaeche-alt`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Zahlen, Namen, Stimmen, Integrationen und Beiträge sind Beispiele, keine Belege. Der Text in den Oberflächenbildern skaliert mit dem Rahmen und ist auf dem Handy kleiner als 16 px, er ist Bild und für Bildschirmleser ausgeblendet. Die Preisseite und die Funktionsseite der Referenz sind erfasst, aber nicht gebaut (Tarifkarten gibt es in t48). Links im Fuß sind Platzhalter.

## Conversion (Playbook)
- Held: Zielgruppe wachsende Unternehmen mit mehreren Marketingkanälen, Problem der verlorene Überblick, Lösung Auswertung, Planung und Versand in einer Software.
- Primär CTA: 14 Tage kostenlos testen in Kopfzeile, Held und Abschluss.
- Titel und Beschreibung nach Formel, ohne Ort (Software).
- FAQ: Preis nach der Testphase, Datenübernahme, IT Wissen, Kündigung, Kontrollfrage „Was kostet es uns, wenn wir bei Tabellen bleiben?“.
- Formularziel: Testzugang per Mail, ein Feld; der Wochenbrief im Fuß ist ein eigenes Formular und kein Primärziel.
