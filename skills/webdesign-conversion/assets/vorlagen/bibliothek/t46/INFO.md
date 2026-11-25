# t46 Studio hell

Prinzip nach der freigegebenen Referenz Draftr (webflow.io Vorlage, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge, Proportionen und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Erfasst wurde nur die Startseite.

## Eignung
Kreativstudios, Agenturen mit eigenem Werkzeug, Anbieter von Software oder Diensten für Gestaltung, Planung und Zusammenarbeit. Gut, wo das Angebot in Werkzeugen, einem kurzen Ablauf, Anbindungen und Tarifen erklärt wird und helle, freundliche Wirkung gewünscht ist. Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Oberflächenbilder bleibt der Hero eine Platzhalterfläche.

## Sektionsfolge
Kopfzeile hell (Logo, Menü mittig, Anmelden und Hauptknopf), Held auf warmem Verlauf (Kicker, riesige Überschrift, Text, Knopf mit Pfeilkreis) mit zwei Karten (breite Editoransicht, schmale Objektkarte), Logolaufband, Werkzeugkasten (drei gleiche Karten), Ablauf (Überschrift und drei nummerierte Zeilen links, graue Fläche mit Editor rechts), Anbindungen (Knotenbild mit gestrichelten Linien), Vorteile (zwei große, drei kleine Karten), Stimmen (Überschrift links, fünf Gesichter als Reiter rechts), Tarife (drei Karten, Jahresschalter, mittlere hervorgehoben), graue App Fläche (Telefon links, Text und Zielgruppen rechts), Abschluss auf Verlauf mit Editor, der in den dunklen Fuß ragt.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, Karten, Zeilen, Tarife | Einblenden, gestaffelt, die Referenz blendet zusätzlich unscharf ein (hier nur Deckkraft und Bewegung) | `data-zeig`, `data-staffel` |
| Logos | Laufband, hält beim Überfahren an | `.band` |
| Ablauf, Anbindungen, App | Fläche skaliert oder gleitet von der Seite ein | `data-zeig="skala"`, `"links"`, `"rechts"` |
| Stimmen | Gesichter als Reiter, Pfeiltasten, Pos1 und Ende | `stil.js`, ohne JavaScript stehen alle fünf Stimmen untereinander |
| Tarife | Schalter tauscht Monats und Jahreswerte | `stil.js`, ohne JavaScript steht der Monatswert |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü, weiße Fläche nach dem Scrollen | `bewegung.js`, `.gescrollt` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Koralle: Fläche mit dunklem Text), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--verlauf-held` (unterer Ton der Verläufe), `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für die Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-tief` auf `--flaeche` und `--flaeche-alt`, `--akzent-text` auf `--akzent`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Bilder ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Die Farben der Anbindungskacheln (`.k2` bis `.k6`) und des Farbfelds stehen in `stil.css`, nicht in den Tokens.

## Offen
Kennzahlen gibt es hier nicht, Namen, Stimmen, Preise und Tarifumfang sind Beispiele, keine Belege. Die Editoransichten, das Telefon und das Knotenbild sind aus HTML gebaut und nur Platzhalter für echte Produktbilder. Kontrast von Text über Verläufen nach dem Einsetzen echter Bilder neu prüfen. Links im Fuß sind Platzhalter. Die Referenz hat weitere Unterseiten (Funktionen, Preise, Über uns, Blog, Kontakt), die hier nicht gebaut sind.
