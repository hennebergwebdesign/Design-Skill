# t82 Sport App dunkel mit Telefonmockups

Prinzip nach einem Pinterest Screenshot des Inhabers (Tennis Video Analyse App, Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Setzt sich ab von t69 (heller Sportclub) durch dunkle Fläche, Limette als Aktion und Telefonmockups.

## Eignung
Apps und digitale Angebote für Vereine, Trainer und Sportler (Video-Analyse, Trainingspläne, Coaching), die Downloads, Vereinsdemos oder ein Abo gewinnen wollen. Ansprache im Du. Lebt von echten Screenshots der App (die Mockups sind Attrappen) und von Personenfotos aus dem Sport.

## Sektionsfolge
Kopfleiste mit Menü (sechs Punkte) und Knopf, Held als große Fotokarte (Titel unten links in Limette, eigene Store Knöpfe unten rechts, neutrale Symbole oben rechts), So funktioniert es (Erklärung links, fünf Schrittkarten im Raster, Fortschrittslinie), Für Spieler (Funktionsliste, zwei Fotos), Telefonkarte mit Download und Wirkung in Spalten, Stimmen mit Avatarstapel und Wischspur, Für Trainer (Fotos, Funktionsliste, Wirkung, Telefonkarte), Preise (Basis, Premium mit Banderole), Limettefarbene Downloadkarte mit Telefon, Vereinsdemo mit Formular und Telefon, Fragen mit Foto, Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Schrittkarten | bauen sich nacheinander auf, die Linie darüber füllt sich mit | `stil.js` (`.an`, `--geschafft`), `transform`, `opacity` |
| Telefone | steigen beim Scrollen und kippen leicht gerade | `stil.js` (`--p`), CSS `transform` |
| Analyse im Telefon (Attrappe) | Schlagbahn zeichnet sich, Marker erscheinen, Winkelbogen, Zeitleiste läuft; Balken und Werte in den anderen Telefonen | CSS `stroke-dashoffset`, `transform`, Pause Knopf (WCAG 2.2.2) |
| Funktionsliste | aktiver Punkt wird hervorgehoben (Scrollmitte, Überfahren, Fokus) | `stil.js`, CSS |
| Held | Foto driftet leicht | `data-parallax` |
| Stimmen | Wischspur mit Pfeilen, ohne JavaScript wischbar | `stil.js`, `scroll-snap` |
| Preise | Karten heben sich beim Überfahren | CSS |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar: Telefone stehen gerade, Linien und Marker sind gezeichnet, Karten stehen da.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Limette, nur auf Dunkel, nie als Text auf Hell), `--akzent-text`, `--karte`, `--karte-hoch`, `--rahmen-telefon`, `--akzent-kalt` (nur Zeichen im Telefon), `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-4`.

## Marke wechseln
Nur `marke.css` ändern. Ein hellerer Akzent als Limette braucht dunklen `--akzent-text`; ein dunkler Akzent als Text auf Dunkel ist zu prüfen (Kontrast mindestens 4,5 zu 1). Der Name "Markenname" steht in Titel, Kopf, Fuß. Die Mockup Inhalte (Texte, Zahlen) in `index.html` anpassen oder durch echte Screenshots ersetzen, dann die Klasse `telefon__schirm` mit einem `<img>` füllen.

## Offen
Formulare senden nichts. Zahlen, Preise, Bewertungen, Namen, Telefonnummer und Antworten sind Beispiele (`data-beispiel`), keine Belege. Datenschutz bei Videos von Minderjährigen, Einwilligung der Eltern, Speicherort und Auftragsverarbeitung sind je Anbieter zu klären und nicht rechtlich geprüft. Store Knöpfe sind neutral und ohne Fremdlogos; Store Badges nach den Richtlinien der Stores einsetzen. Social Symbole sind eigene Platzhalter. Gemessen: 390 und 1440 Pixel, keine Konsolenfehler, kein Überlauf; Kontrast über dem Heldfoto nicht gemessen (Verlauf unterlegt), Safari, Screenreader nicht geprüft.

## Conversion (Playbook)
- Held: Spieler und Trainer im Verein, Training ohne Rückmeldung, Lösung Video-Analyse per Handy mit Auswertung in Minuten
- H1 "Weniger raten. Schneller besser werden.", Unterzeile nennt Aufnahme, Auswertung und Kommentar
- Primär-CTA "Kostenlos starten" in Kopf, Held, beiden Preiskarten, daneben Store Knöpfe
- Titel mit Keyword (Video-Analyse, Vereine), Beschreibung mit Nutzen und Aufruf
- FAQ: Preis, Kamera, Speicherort und Sichtbarkeit, Jugendliche, Verein
- Formular: Vereinsdemo anfragen (Name, Verein, E-Mail, Telefon, Anzahl), fünf Felder, Feldhinweise unter E-Mail und Telefon
- JSON-LD SoftwareApplication mit Beispielwerten
