# t39 Finanzwerkzeug mit Bühnen

Prinzip nach der freigegebenen Referenz Lomma (Startseite, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Apps, Fintech, Software und Beratung mit einem erklärungsbedürftigen Produkt, das in Bildschirmen, Karten und Zahlen zu zeigen ist. Ansprache im Du, für Sie im Text ersetzen. Die Seite lebt von eigenen Produktbildern und Fotos; mit Platzhaltern zeigt sie nur das Gerüst. Für Finanzdienste gelten Aufsichts- und Werberegeln (Preisangaben, Risikohinweise), die diese Vorlage nicht liefert.

## Sektionsfolge
Kopf transparent über dem Held, später dunkel, Vollbildheld in Versalien mit schwebender Kontokarte, Logoreihe, Finanzzentrale (Bento aus vier Karten: dunkel mit Telefon, hell mit Anbindungen, himmelblau, Bildkarte), Geld einfach gemacht (Bento aus vier Karten), Bühne mit Himmel und Fenster (Karte steigt beim Scrollen), Meilensteine (drei Bildkarten mit Zahlen), Zahlungsbild, das stehen bleibt, bis die dunkle Fläche Teams darüberschiebt, vier Funktionskarten neben hohem Bild, Fragen auf Dunkel, Stimmen als Laufband aus Fotokarten, Anbindungen mit Akkordeon neben Telefon, Szene (Bilder wandern zusammen und wachsen zum Vollbild), Aufruf mit Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bild bewegt sich leicht gegen die Scrollrichtung, Karte blendet ein | `data-parallax`, `data-zeig` |
| Kopf | Transparent über dem Held, nach dem Scrollen dunkel, Menü als Panel auf dem Handy | `bewegung.js` (Klasse `gescrollt`), CSS |
| Bühne Fenster | Karte steigt beim Scrollen auf, Fenster schiebt leicht nach | `data-fortschritt`, `--fortschritt`, `transform` in CSS, Sticky |
| Meilensteine | Zähler, Endwert steht im HTML | `data-zaehle` |
| Zahlungsbild | Bleibt stehen, die Teamfläche schiebt sich mit runden Ecken darüber | CSS Sticky, kein Skript |
| Stimmen | Laufband aus Fotokarten, pausiert beim Überfahren | `.band` (Dopplung ist `aria-hidden`) |
| Fragen und Anbindungen | Plus dreht zum Kreuz, Gruppe schließt die anderen | `details` mit `data-exklusiv` |
| Szene | Kacheln gleiten zur Mitte und drehen sich gerade, dann wächst der Stapel zum Vollbild, der Satz blendet aus | `data-fortschritt`, `--fortschritt`, `transform` und `opacity` in CSS |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar: die Bühnen sind ruhige Abschnitte ohne Sticky (Bühne und Szene), das Zahlungsbild steht bei reduzierter Bewegung normal im Fluss.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Himmelblau, Fläche mit dunklem Text, auf Dunkel auch Text), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--himmel-1` bis `--himmel-3` (Bühne), `--schrift-titel` (Archivo), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent-tief` auf `--flaeche` und `--flaeche-alt`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-logo`), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, das gezeichnete Telefon (`.telefon`) durch echte App Bilder, Beispielwerte (`data-beispiel`) durch echte Angaben. Die Überschriften stehen per CSS in Versalien (`text-transform` in `stil.css`), bei langen Wörtern prüfen.

## Offen
Beispielwerte (Kontostand, Zahlen, Namen, Stimmen, Siegel) sind Beispiele, keine Belege; das Siegel "Beispielsiegel" nur durch eine echte, belegbare Auszeichnung ersetzen. Beispiellogos sind keine Kunden. Das Formular im Fuß sendet nichts. Die Referenz lässt das Bild in der Szene weich in den Aufruf wachsen, hier wächst eine Fläche aus dem Stapel (Näherung). Kontrast von Text über Fotos und über den Bühnenverläufen nach dem Einsetzen neu prüfen. Auf sehr kleinen Höhen (unter 600 Pixel, Querformat am Handy) sind die Bühnen eng. Links im Fuß (Datenschutz, Impressum) sind Platzhalter.
