# t29 Pastellkarten

Prinzip nach der freigegebenen Referenz Wilun (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Dienstleister mit klaren Paketen und festen Preisen, die freundlich und modern auftreten wollen (Beratung, Verwaltung, Büro und Service, Software nahe Angebote). Helle Seite mit Pastellflächen und sehr fetten Großbuchstaben. Ansprache im Du, für Sie im Text ersetzen. Für Handwerk und Gastronomie nur mit anderer Bildwelt und anderen Farben sinnvoll.

## Sektionsfolge
Dunkler Reiter als Kopf, Held (Verlaufsrahmen, Ringe, Telefonbild mit schwebender Karte), Vorteile (Überschrift bleibt stehen, schräge Zettel stapeln sich), Leistungen (Farbwörter in der Überschrift, Bento aus fünf Kacheln), Preise (Überschrift links, drei Pastellpakete), Stimmen (drei Zettel öffnen sich zum Fächer), Abschluss (Blauverlauf mit Mailzeile) und Fuß als dunkle Karte.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Telefon und Karte laufen gegenläufig beim Scrollen, Zähler auf 80 | `data-parallax`, `data-zaehle` |
| Vorteile | Wortlicht in der Überschrift, Zettel bleiben kleben und stapeln sich (ab 62rem) | `data-licht`, `position: sticky` mit `--i` |
| Leistungen | Einblenden gestaffelt, Kachel hebt an, Bild kippt | `data-zeig`, CSS `:hover` |
| Preise | Paket hebt an, Pfeilkreis dreht | CSS |
| Stimmen | Fächer öffnet sich mit der Lage im Fenster (ab 48rem), Zettel unter dem Zeiger oder Fokus kommt nach vorn | `stil.js`, `--f`, `:hover`, `:focus-visible` |

Bei reduzierter Bewegung steht der Fächer offen und alles ruht, ohne JavaScript bleibt der Inhalt sichtbar.

## Umfärben (nur marke.css)
`--flaeche`, `--flaeche-dunkel`, `--akzent` (Pfeilkreise, Knöpfe, Punkte), `--pfirsich`, `--blau-hell`, `--lila`, `--gelb` (Kartenflächen) mit je einem tieferen Ton (`-tief`, `-mittel`) für Ringe und Bildchen, `--wort-orange` und `--wort-lila` (Akzentwörter auf Weiß), Schriften `--schrift-titel` und `--schrift-text`. Kontrast nach Wechsel prüfen: Text auf allen Pastellflächen und die zwei Wortfarben auf Weiß. Der Blauverlauf im Abschluss steht in `stil.css` (`.abschluss`, `.fuss`).

## Bei Markenwechsel
Name und Zeichen im Reiter und im Fuß, Texte, Telefonbild (CSS, durch echtes Produktbild ersetzen oder entfernen), kleine Zeichnungen in den Karten (Inline SVG, durch eigene Bilder ersetzen), Kennzahlen, Preise, Bewertung, Stimmen und Kontaktdaten. Alles mit `data-beispiel` ist Beispiel.

## Grenzen
Das Formular sendet nichts (`stil.js` verhindert das Absenden, Backend und Einwilligung fehlen). Bewertung, Preise, Zahlen und Zitate sind Platzhalter, keine Belege. Die Schrift ist Archivo in hohem Gewicht, die Referenz nutzt eine schmalere Plakatschrift, lange Wörter brechen deshalb früher um. Der Fächer verdeckt auf Desktop Teile der seitlichen Zitate, bis man sie berührt oder anwählt. Impressum und Datenschutz sind nur Linkplatzhalter.
