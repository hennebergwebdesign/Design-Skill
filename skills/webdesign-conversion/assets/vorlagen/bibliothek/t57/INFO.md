# t57 Studio hell Karten

Prinzip nach der freigegebenen Referenz LiftHub (Tor 1 erteilt, Startseite erfasst, Unterseiten /about, /classes, /contact nur als Navigation gelesen), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Studios mit Kursplan, Gruppentraining, Yoga, Boxen, Tanz, Reha und Coaching mit drei Tarifen. Heller, ruhiger Auftritt mit großen Radien, grauen Karten und genau einem Akzent. Trägt auch Praxen und Kursanbieter außerhalb des Sports. Ohne gutes Foto oder Video im Held verliert die Seite ihren Einstieg. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Weiße Kopfpille mit Logo in der Mitte, eingerückte Bildkarte als Held (Mitgliederzeile, H1, Text, Hauptknopf, Telefon, Pause), Über uns (Überschrift links, Text rechts, drei versetzte Spalten aus Bild und Karte), Kurse (graue Zeilen mit Stufe, Text und rundem Pfeil), Film (Bild wächst beim Scrollen von der Mitte auf volle Breite), Team (Porträts schweben um die stehende Überschrift), Mitgliedschaft (drei Tarife, der mittlere gelb und höher), Banner (dunkle Karte mit Angebot), Fragen (Akkordeon), Stimmen (Bildkarte, zwei gegenläufige Reihen), Fuß als dunkle Karte mit Newsletter.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Hintergrund driftet langsam, Pause hält ihn an | CSS `transform`, `stil.js` setzt `.pausiert` |
| Abschnitte | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Film | Rahmen wächst mit dem Scrollweg auf volle Breite und bleibt dann stehen | `data-fortschritt` (`--fortschritt`), `position: sticky`, `transform: scale` |
| Team | Porträts laufen mit unterschiedlicher Geschwindigkeit, Überschrift bleibt stehen (ab 62rem, darunter Wischreihe) | `data-parallax`, `position: sticky` |
| Kurse | Zeile färbt sich, Pfeil rückt | CSS `:hover` |
| Mitgliedschaft | Auf dem Handy eine Spur mit Pfeilknöpfen | `stil.js`, Scroll Snap |
| Fragen | Akkordeon, Pfeil dreht | `details` mit `data-exklusiv` |
| Stimmen | zwei Reihen laufen gegeneinander, Pause beim Überfahren | `.band` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung steht der Film in voller Größe, die Stimmen sind wischbar und alles bleibt sichtbar. Ohne JavaScript sind alle Stände die Endstände.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt` (graue Karten), `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Gelb, Fläche mit dunklem Text, nie Text auf Hell), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--schrift-titel` (Outfit), `--schrift-text` (Manrope), `--titel-gewicht`, `--titel-spur`, Radien (`--radius-gross` für Bildkarten), `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent-tief` auf `--flaeche` und `--flaeche-alt`, `--akzent` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Funktion `.logo`, vier Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Wird ein Video eingesetzt, braucht es Pause (WCAG 2.2.2), Standbild und kein Autoplay mit Ton.

## Offen
Formular (Newsletter) sendet nichts. Zahlen, Namen, Stimmen, Preise und das Angebot sind Beispiele, keine Belege. Der Film im Held und in der Mitte ist eine Fläche, die Pause hält nur die Drift des Platzhalters an. Das Team schwebt nur ab 62rem Breite, die Positionen (`style` an `.coach`) sind für sechs Karten gesetzt: bei mehr oder weniger Personen neu verteilen. Die Telefonnummer steht im Held und im Menü, nicht in der Kopfpille. Zwei Links im Fuß (Impressum, Datenschutz) sind Platzhalter.
