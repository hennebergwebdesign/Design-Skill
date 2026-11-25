# t56 Fitness Kobalt Kontrast

Prinzip nach der freigegebenen Referenz LiftLab (Tor 1 erteilt, Startseite und Startseite Variante 2 erfasst), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Zwei Varianten teilen `marke.css`, `stil.css` und `stil.js`.

## Eignung
Fitnessstudios, Studios mit Kursen und Personal Training, Yoga, Boxen, Tanz und andere Mitgliedschaftsmodelle mit zwei Tarifen. Kräftiger Auftritt mit großen Versalien, Kobalt als Signalfarbe und Porträtfotos. Ohne gute Fotos von Menschen in Bewegung verliert die Seite ihre Wirkung. Ansprache im Du, für Sie im Text ersetzen.

## Varianten
| Datei | Name | Aufbau |
|---|---|---|
| `index.html` | Dunkler Held mit Tarifen | Vollbildheld, Über uns, vier Leistungskarten, Vorher Nachher, Preise mit Umschalter, Stimmenmosaik, Team, Anfrageformular, Aufruf, Blog |
| `v2.html` | Heller Held mit Leistungsliste | Zweispaltiger Held mit Schwebekarten, Kennzahlen, Leistungsliste, Galerie, Kartenstapel, zwei Laufbänder, Vorteile, Aufruf, Bildband, Fragen, Blog |

## Sektionsfolge
Variante 1: Kopf (Logo, Menü, Telefon, Beitreten), Vollbildheld mit Aktionschip und Siegeln, Über uns (Leitsatz, Bild, Kennzahl, Bild), Leistungen (dunkel, vier Karten, eine in Kobalt), Warum wir, Vorher Nachher (Regler), Preise (dunkel, Tarife mit Bild), Stimmen (Mosaik) mit Beispiellogos in Pillen, Team (Porträts mit Namensschild), Beitreten (Bild mit Kontaktchips, Formular), Aufruf als Karte, Blog (Spur), Fuß mit Bildband.
Variante 2: Held (Überschrift mit eingebettetem Bild, Hochformat, zwei Schwebekarten), Über uns (vier Kennzahlen, zwei Bilder), Leistungen (Zeilen mit Vorschau, Titel, Text), Galerie (dunkel, Spur), Stimmen (Stapel), Laufbänder, Vorteile, Aufruf, Bildband, Fragen (Akkordeon), Blog, Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| V1 Vorher Nachher | Regler fährt beim Sichtbarwerden einmal, jede Eingabe bricht ihn ab | `data-selbstlauf`, `stil.js` setzt `--pos` |
| V1 Preise | Umschalter Monat oder Jahr tauscht die Werte | `stil.js`, `data-m`, `data-j`, ohne JavaScript bleibt der Monatspreis |
| V1 Warum wir, Fuß | Bild läuft leicht gegen die Scrollrichtung | `data-parallax` |
| V2 Held | Schwebekarten laufen gegen das Bild | `data-parallax` |
| V2 Leistungsliste | Zeile färbt sich, Pfeil dreht und rückt | CSS `:hover`, `transform` |
| V2 Stimmen | Kartenstapel, Pfeile holen die nächste Karte nach vorn | `stil.js`, `data-pos`, ohne JavaScript untereinander |
| V2 Laufbänder | zwei Streifen, gegenläufig, Pause beim Überfahren | `.band` |
| V2 Fragen | Akkordeon, offener Eintrag dunkel mit Bild | `details` mit `data-exklusiv` |
| Galerie, Blog | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--akzent` (Kobalt, Fläche mit weißem Text, auf Hell auch Text), `--akzent-text`, `--akzent-hell` (Akzent als Text auf Dunkel), `--schrift-titel` (Lexend), `--schrift-text` (Hanken Grotesk), `--titel-gewicht`, `--titel-spur`, Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern, beide Varianten folgen. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent` als Text auf `--flaeche`, `--akzent-hell` auf `--flaeche-dunkel`. Name und Zeichen im Logo (zwei Stellen im Kopf, eine im Fuß, der Buchstabe im Zeichen ist ein Strichzug im SVG), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Die Beispiellogos in den Pillen (V1) sind Platzhalter und durch echte Partner zu ersetzen oder zu streichen.

## Offen
Formulare senden nichts. Zahlen, Namen, Stimmen, Preise, Siegel und Bewertungen sind Beispiele, keine Belege; Siegel nur zeigen, wenn der Betrieb sie wirklich führt. Fotos im Vorher Nachher nur mit Einwilligung der Person und ohne Heilversprechen (Werbung für Körperveränderungen ist rechtlich heikel, vorab prüfen). Die Überschriften stehen in Versalien und in einer breiten Schrift: lange Wörter bei der Schriftwahl prüfen. Die Variante 2 hat kein Formular, der Hauptknopf verweist auf den Aufruf. Telefonnummer im Kopf erscheint erst ab 26rem Breite, darunter im Menü. Zwei Links im Fuß (Impressum, Datenschutz) sind Platzhalter.

## Conversion (Playbook)
- Held: Zielgruppe Menschen nach einer Trainingspause, Problem der schwere Neustart ohne Betreuung, Lösung fester Plan und Coach. `index.html`: „Wieder starten mit Plan und Coach.“ (mit neuer Unterzeile), `v2.html`: „Zurück ins Training, mit Plan und Coach.“
- Primär CTA: Probetraining buchen in Kopfzeile, Held, Aufruf und Formular beider Varianten; die Tarifknöpfe in `index.html` bleiben Jetzt beitreten.
- Titel mit Ort Platzhalter (Musterstadt), Beschreibung nach Formel, je Variante eigen.
- FAQ: `index.html` unverändert natürlich (Preis, Ablauf, Fitnessstand, Bindung, Kontrollfrage „Lohnt sich der Einstieg gerade jetzt?“); `v2.html` jetzt als Beispielantwort markiert, Frage zu Zeitmangel statt Öffnungszeiten.
- Formularziel `index.html`: Probetraining mit Wunschstandort und Wunschtermin, fünf Felder, Feldhinweise unter Mail und Telefon. `v2.html` hat kein Formular.
- Siegel und Bewertungen im Held bleiben Beispiele, Siegel nur zeigen, wenn der Betrieb sie wirklich führt.
