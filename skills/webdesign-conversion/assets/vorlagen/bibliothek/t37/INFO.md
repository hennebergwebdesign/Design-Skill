# t37 Akademie mit Kursen

Prinzip nach der freigegebenen Referenz beautco.webflow.io (Startseite, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Akademien, Schulen und Kursanbieter mit mehreren buchbaren Programmen (Beauty, Handwerk, Coaching, Fitness, Gastronomie), die Vorher-Nachher-Arbeitsproben und Absolventenstimmen zeigen können. Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Arbeitsproben und Porträts verliert die Seite ihre Beweisführung.

## Sektionsfolge
Dunkle Leiste mit Adresse und Telefon, fester Kopf, Vollbildheld mit Serifenüberschrift, zwei Knöpfen und Bewertung, Merkmalsband in Akzentfarbe (vier Zellen), Über uns (Überschrift, Zitat, hohes Bild), Kurse (drei Karten mit Dauer, Stufe, Preis, zwei Knöpfen), Warum wir (Bild mit Hinweiskarte, helle Karte, dunkle Karte mit Haken), Ergebnisse (Vorher und Nachher in Zeilen mit Etikett und Linie), Ablauf als Zeitleiste in drei Schritten, Stimmen (Text- und Bildkarten im Wechsel), Fragen (Überschrift links, Akkordeon rechts), Aufruf mit Bild, Fuß mit großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bild bewegt sich leicht gegen die Scrollrichtung, Text staffelt ein | `data-parallax`, `data-zeig` |
| Karten, Zeilen, Stimmen | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Zeitleiste | Linie füllt sich beim Scrollen, Punkte stehen fest | `stil.js`, `--fuell`, `transform: scaleY` |
| Fragen | Plus dreht zum Kreuz, Gruppe schließt die anderen | `details` mit `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar, die Zeitleiste steht voll.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Terrakotta, Fläche mit weißem Text, auf Hell auch Text und Sterne), `--akzent-text`, `--akzent-hell` (Akzent auf Dunkel), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--schrift-titel` (Newsreader), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche` und `--flaeche-alt`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-logo`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Beispielwerte (Bewertung, Abschlussquote, Preise, Namen, Stimmen, Adresse) sind Beispiele, keine Belege. Siegel wie "staatlich anerkannt" nur zeigen, wenn sie wirklich gelten. Die Referenz zeigt Videostimmen mit Abspielknopf, hier stehen Bildkarten ohne Video, damit kein Knopf ohne Funktion bleibt. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Links im Fuß (Datenschutz, Impressum) sind Platzhalter. Kurspreise nach Preisangabenverordnung mit Bruttoangabe führen.
