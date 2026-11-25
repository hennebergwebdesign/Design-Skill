# t45 Automatisierung dunkel

Prinzip nach der freigegebenen Referenz BotFlow (webflow.io Vorlage, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge, Proportionen und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Erfasst wurde nur die Startseite.

## Eignung
Beratung und Dienstleister, die Abläufe automatisieren, Software einführen oder Büroarbeit verschlanken: Prozessberatung, IT Dienstleister, Agenturen mit einem Werkzeug, SaaS Anbieter. Funktioniert, wo ein Angebot in Schritten, Anbindungen und Tarifen erklärbar ist. Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Produktbilder tragen die Verlaufsflächen die Seite nur als Platzhalter.

## Sektionsfolge
Kopfzeile transparent über dem Dunkel (Logo, Menü mittig, Anmelden und Hauptknopf rechts), dunkler Held (Kicker, H1, Text, ein Knopf) mit drei Karten, die in den hellen Teil ragen (Ablaufdiagramm, Oberfläche, Auslöserkarte), Anspruchssatz mit Logolaufband, Funktionen als Kartenraster 7 zu 5 und 5 zu 7, Ablauf in drei gestapelten Schritten, dunkler Mittelteil (geneigtes Produktbild, Zitat, vier Vorteile, Anbindungen mit Symbolband), Stimmen (Zitat mit Pfeilen, Bildkarte, drei Kennzahlkacheln auf Punktraster), Preise (Basiskarte links, dunkle Hauptkarte mit Jahresschalter), Daten (Tabellenbild links, Text rechts), Abschlusskarte mit Mailfeld, dunkler Fuß mit riesigem Markenwort.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, Karten, Funktionen | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Anspruch | Logolaufband, hält beim Überfahren an | `.band` |
| Ablauf | Titel bleibt stehen, die drei Schritte pinnen nacheinander und stapeln sich zu einer Reihe (nur ab 56 rem, darunter normal untereinander) | CSS `position: sticky`, kein JavaScript |
| Mittelteil | Produktbild läuft leicht gegen die Scrollrichtung | `data-parallax` |
| Anbindungen | Symbolband läuft ohne Pause | CSS `band` aus `basis.css`, bei reduzierter Bewegung aus |
| Stimmen | Pfeile wechseln die Stimme, Kennzahlen zählen hoch, Endwert steht im HTML | `stil.js`, `data-zaehle` |
| Preise | Schalter tauscht Monats und Jahreswert | `stil.js` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü, dunkle Fläche nach dem Scrollen | `bewegung.js`, `.gescrollt` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar. Ohne JavaScript stehen die drei Stimmen untereinander, der Preis zeigt den Monatswert, die Kopfzeile scrollt mit.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--flaeche-dunkel-3`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Minze: Fläche mit dunklem Text, auf Dunkel auch Text und Punkt), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-7` für die Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-tief` auf `--flaeche` und `--flaeche-alt`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Bilder ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Kennzahlen, Namen, Stimmen, Preise, Tarifumfang und Logos sind Beispiele, keine Belege. Die Oberflächen in Held, Mittelteil und Tabelle sind aus HTML gebaut und nur Platzhalter für echte Produktbilder. Kontrast von Text über Verläufen nach dem Einsetzen echter Bilder neu prüfen. Links im Fuß (Impressum, Datenschutz, Netzwerke) sind Platzhalter. Die Referenz hat weitere Unterseiten (Über uns, Funktionen, Preise, Blog, Kontakt), die hier nicht gebaut sind.
