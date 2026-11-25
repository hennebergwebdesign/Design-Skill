# t48 App dunkel Neon

Prinzip nach der freigegebenen Referenz Nextlo (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Software und Apps mit Bild-, Medien- oder Dateibezug, Plattformen mit Tarifen, Produkte für Teams und Kreative. Funktioniert auch für Dienste mit Mitgliedschaft. Ohne gute Motive in der Bildwand und im Mosaik verliert die Seite ihren Kern. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Feste Kopfzeile (Logo links, Menü mittig mit Trennlinien, Hauptknopf rechts), Held mittig in Versalien mit zwei Knöpfen, fünf Bildspalten, die gegenläufig laufen, App Fenster mit Seitenleiste, Bildraster und Eingabefeld, Funktionen (vier Karten, jede zweite tiefer), Galerie als Mosaik, Einsatz (sechs nummerierte Karten), Stimmen (eine große Karte mit Pfeilen), Preise (Umschalter Monat oder Jahr, mittlere Karte in Akzent), Fragen als Akkordeon, Aufruf als Akzentkarte mit E-Mail Feld und schwebenden Bildern, Fuß über dunklem Bildgrund.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Text staffelt ein | `data-zeig`, `data-staffel` |
| Bildspalten | fünf Spalten laufen endlos, abwechselnd nach oben und unten | CSS `transform` Schleife, aus bei reduzierter Bewegung |
| App Fenster, Karten, Mosaik | Einblenden beim Scrollen | `data-zeig`, `data-staffel` |
| Karten, Mosaik | Anheben oder leichtes Vergrößern beim Überfahren | CSS `transform` |
| Einsatz | Ziffer wird beim Überfahren zum Akzent | CSS |
| Stimmen | wischbare Spur mit Scroll Snap, Pfeilknöpfe | `stil.js`, ohne JavaScript wischbar |
| Preise | Umschalter tauscht die Beträge | `stil.js`, ohne JavaScript gilt der Monatspreis |
| Fragen | Akkordeon, Plus dreht zum Kreuz | `details` mit `data-exklusiv`, CSS |
| Aufruf | fünf Bilder schweben langsam | CSS `transform`, ab 56 rem Breite |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--text`, `--text-leise`, `--linie`, `--akzent` (Neongelbgrün, als Fläche mit dunklem Text und als Text auf Dunkel), `--akzent-text`, `--karte`, `--karte-2`, `--ziffer` (nur Zierde), `--schrift-titel` (Archivo, Versalien), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche` und `--karte`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Wer einen helleren Akzent wählt, prüft die Karte in Akzent (Preis, Aufruf) auf lesbare Schrift.

## Offen
Formulare senden nichts. Preise, Namen, Stimmen und Antworten sind Beispiele, keine Belege. Das App Fenster ist ein Nachbau aus HTML, kein Screenshot, und gehört durch eine echte Ansicht des Produkts ersetzt. Die Bildspalten sind Platzhalterflächen und müssen echte Motive bekommen. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Links im Fuß (Impressum, Datenschutz, Nutzungsbedingungen) sind Platzhalter.

## Conversion (Playbook)
- Held: Zielgruppe Teams mit vielen Bildern, Videos und Dateien, Problem das Suchen in Ordnern und Mails, Lösung eine gemeinsame Bibliothek.
- Primär CTA: Kostenlos testen in Kopfzeile, Held und Abschluss, Tarifknöpfe heißen Tarif wählen.
- Titel und Beschreibung nach Formel, ohne Ort (Software).
- FAQ aus Sicht eines Teams: Dateiarten, Import bestehender Ordner, Speichergrenzen, Eigentum an Inhalten, Kontrollfrage „Was kostet es, wenn wir weiter in Ordnern und Mails suchen?“.
- Formularziel: Zugang zum kostenlosen Test per Mail, ein Feld.
