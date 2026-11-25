# t38 Studio mit Terminbuchung

Prinzip nach der freigegebenen Referenz HairLux (Startseite und zweite Startseite, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Zwei Varianten teilen `marke.css`, `stil.css`, `stil.js`, Kopf und Fuß.

## Eignung
Friseur, Kosmetik, Nagel, Massage, Fotostudio und andere Dienstleister, die nach Termin arbeiten und Leistungen, Preise, Team und Öffnungszeiten zeigen. Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Fotos von Team und Arbeit wirkt die Seite leer, die Platzhalter tragen sie nicht.

## Variante 1, Geteilter Einstieg (`index.html`)
Fester dunkler Kopf mit Telefonknopf, Held geteilt (links Text auf Dunkel, rechts Bild), großer Anspruchssatz mit Bild, Leistungen als wischbare Spur mit Pfeilen, Sandband mit Bildkarte und dunkler Angebotskarte, drei Ablaufkarten, Studio mit drehendem Siegel, Mosaik über dunklem Band, Stimmenfolie mit Pfeilen, Team als Laufband neben dunkler Karte mit Öffnungszeiten, Fragen, Kontaktleiste, Fuß.

## Variante 2, Vollbild mit Preisliste (`v2.html`)
Held als Vollbild mit Verlauf von links, Laufband in Akzentfarbe, Über uns mit Aufzählung, Kennzahlen, dunkles Feld mit vier Hauptleistungen, Ablauf in Nummern neben Terminformular (Siegel an der Ecke), Willkommensangebot im dunklen Feld mit zwei versetzten Bildern, Preisliste mit Reitern, Aufruf in Sand mit freigestelltem Personenbild, Ratgeber, Kontaktleiste, Fuß. Neu: Fragen als Akkordeon vor dem Schlussaufruf.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, Karten gestaffelt | `data-zeig`, `data-staffel` |
| V1 Leistungen | Spur mit Scroll Snap, Pfeilknöpfe schieben um eine Karte | `stil.js`, ohne JavaScript wischbar |
| V1 Stimmen | Eine Stimme sichtbar, Pfeile wechseln, Einblenden von rechts | `stil.js`, CSS, ohne JavaScript stehen alle untereinander |
| V1 Team | Laufband, pausiert beim Überfahren | `.band` (Dopplung ist `aria-hidden`) |
| V1 und V2 Siegel | Text auf dem Kreis dreht sich langsam | CSS, `transform` |
| V1 Karten | Knopf in der Kerbe kippt beim Überfahren | CSS, `transform` |
| V2 Held | Bild bewegt sich leicht gegen die Scrollrichtung | `data-parallax` |
| V2 Laufband | Hinweise laufen, pausiert beim Überfahren | `.band` |
| V2 Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| V2 Preisliste | Reiter mit Pfeiltasten, ohne JavaScript stehen alle Listen untereinander | `stil.js` |
| Fragen | Plus dreht zum Kreuz, Gruppe schließt die anderen | `details` mit `data-exklusiv` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt` (Karten), `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--sand` (helles Farbband), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Aprikose, Fläche mit dunklem Text, auf Dunkel auch Text), `--akzent-text`, `--akzent-tief` (Akzent als Text und Linie auf Hell), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-tief` auf `--flaeche`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-logo`, mehrere Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Die Kerbe in den Karten übernimmt ihre Hintergrundfarbe aus `--umgebung`: Sitzt eine Karte auf einer anderen Fläche, den Wert an der Karte anpassen.

## Offen
Beispielwerte (Preise, Angebote, Kennzahlen, Namen, Stimmen, Zeiten, Adresse) sind Beispiele, keine Belege. Das Formular in V2 sendet nichts. Preise nach Preisangabenverordnung mit Bruttoangabe führen. Die Leistungsnamen sind neutral gehalten und für den Betrieb zu präzisieren. Die Kerbe hat gerundete Innenecke, aber scharfe Außenecken (die Referenz rundet beide). Die Referenz zeigt Muster aus Werkzeugen als Hintergrund im Fuß und in Bändern, hier fehlen sie. Links im Fuß (Datenschutz, Impressum) sind Platzhalter. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen.

## Conversion (Playbook)
- Variante 1 und 2: Primärknopf in der Kopfzeile (auf dem Handy kurz als „Termin“), Telefonkreis bleibt
- Variante 1: zwei Fragen zu Preis und Absage ergänzt (Antworten als Beispiel markiert), Variante 2: Fragen als Akkordeon vor dem Schlussaufruf neu (`#fragen`, fünf Fragen)
- Beleg im Held (Sterne mit Beispielwert) und Kommentar zur Heldenformel in beiden Varianten
- Variante 2: Terminformular von sechs auf fünf Felder (Datum und Uhrzeit als ein Feld „Wunschtermin“), Feldhinweise unter E-Mail und Telefon; Schriftgrößen von Label und Rechtshinweis auf 1 rem
