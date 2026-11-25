# t41 Analyse dunkel

Prinzip nach der freigegebenen Referenz goldify.webflow.io (Startseite, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen (Kupferorange statt Gold, Schibsted Grotesk).

## Eignung
Software, Datenanalyse, Marktforschung, Beratung mit Dashboard, Plattformen mit Tarifen. Wirkt technisch und dicht, weil viele Oberflächen gezeigt werden. Trägt nur, wenn echte Produktansichten oder Auswertungen vorliegen. Ansprache im Du, für Sie im Text ersetzen. Die Anlage- und Handelsbezüge der Referenz sind bewusst entfernt, bei Finanzprodukten gelten zusätzliche Pflichtangaben und Warnhinweise.

## Sektionsfolge
Schwebende dunkle Leiste, Held mit Lichtvorhang und aufsteigender Oberfläche, Logoband, Vorteile (drei Spalten, mittig eine hohe Akzentkarte mit Anzeige), Funktionen (Raster aus Karten mit Kerzenchart, Lichtkegel, Vorher und Nachher, Liniendiagramm), Prinzipien (sechs Karten), Ablauf (links bleibt die Aufrufkarte stehen, rechts drei Schritte), Anbindungen (zwei gegenläufige Kachelbänder, mittig ein Ring), Preise (Umschalter, drei Tarife, der mittlere hervorgehoben), Stimmen (zwei gegenläufige Bänder), Fragen, Journal (links bleibt der Titel stehen, rechts vier Beiträge), Aufruf mit Glühen und Scheibe, Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Oberfläche schiebt sich leicht gegen die Scrollrichtung, Elemente staffeln ein | `data-parallax`, `data-zeig` |
| Vertrauen, Anbindungen, Stimmen | Bänder laufen, die zwei Reihen gegenläufig, Pause beim Überfahren | `.band`, `animation-direction: reverse` |
| Ablauf, Journal | linke Spalte bleibt stehen (ab 64 rem) | `position: sticky`, CSS |
| Preise | Umschalter tauscht Monats und Jahrespreise | `stil.js`, ohne JavaScript steht der Monatspreis |
| Fragen | Akkordeon, Plus wird zum Minus, offene Frage mit Akzentrand | `details`, `data-exklusiv` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung stehen die Bänder still und sind seitlich abgeschnitten, alles andere ist sichtbar. Ohne JavaScript scrollt die Leiste mit.

## Tokens (marke.css)
`--flaeche`, `--karte`, `--karte-hoch`, `--text`, `--text-leise`, `--linie`, `--akzent` (Hauptaktion, auf Dunkel auch Text), `--akzent-text`, `--akzent-tief`, `--akzent-hell` (Verlauf der Knöpfe und Scheiben), `--positiv`, `--negativ` (Kerzen und Signale), `--schrift-titel` und `--schrift-text` (Schibsted Grotesk), Radien.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` und `--akzent-hell`, `--akzent` als Text auf `--flaeche` und `--karte`, `--text-leise` auf `--karte`. Name und Zeichen im Logo (Symbol `#i-zeichen`), Bildplatzhalter durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Der gesamte Seitenaufbau ist dunkel, eine helle Fassung braucht eigene Werte für Karten und Linien.

## Offen
Formulare senden nichts. Preise, Namen, Stimmen, Logos, Kurse und Kennzahlen sind Beispiele, keine Belege. Die Oberflächen, Kerzenchart und Anzeige sind erfundene Illustrationen, keine Produktabbildungen. Die Anbindungskacheln zeigen Symbole, keine echten Marken. Texte in den Beispieloberflächen sind teils kleiner als 16 Pixel. Der Preisumschalter steht über den Karten, nicht in der mittleren Karte. Kontrast des Glühens hinter dem Aufruf nach dem Austausch der Farben neu messen.
