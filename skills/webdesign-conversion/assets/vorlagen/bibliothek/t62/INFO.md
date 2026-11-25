# t62 Klinik Großschrift

Prinzip nach der freigegebenen Referenz vitalex-ttm.webflow.io (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kliniken, Facharztzentren, Zahnarztpraxen und Gesundheitsdienste mit mehreren Leistungsfeldern, die selbstbewusst und kontrastreich auftreten wollen. Dunkler Einstieg mit Versalschrift, danach hell und ruhig. Termin steht im Kopf (Telefon und Hauptknopf immer sichtbar, auch auf dem Handy), im Held, im Buchungsabschnitt und im Formular. Braucht gute Bilder von Menschen und Räumen. Ansprache im Du, für ein medizinisches Haus in der Regel auf Sie umstellen. Keine Heilversprechen und keine Spitzenstellung (kein "Nummer eins") im Beispieltext, bei echten Texten Heilmittelwerbegesetz und Berufsordnung beachten.

## Sektionsfolge
Dunkler Kopf mit Vollbildmenü, Held (Vollbild, riesige Versalschrift mit Akzentwort, Zeile mit Text, Merkmalen und Bildausschnitt), Laufband mit Beispielwerten je Fachbereich, Über uns (Treppe aus Kennzahlkarten, Aussage, Vertrauenszeile), Leistungen (hohes Bild bleibt stehen, sechs Karten, auf dem Handy eine Spur), Ablauf (großes Laufband, drei Schritte A bis C mit Stufenanzeige), Buchung (dunkles Vollbild mit Öffnungszeiten und Hauptknopf), Preise (helle Karte mit Preisliste, hohes Bild), Team (sieben Porträts in zwei Reihen), dunkler Fuß mit Kontaktformular und Großschrift der Marke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bild dunkelt beim Scrollen ab, Text staffelt ein | `data-abdunkeln`, `data-zeig`, `data-staffel` |
| Kennzahlband | Karten laufen seitlich, halten bei Hover an | `.band` |
| Über uns | Zähler laufen hoch, Endwert steht im HTML | `data-zaehle` |
| Leistungen | Bild bleibt stehen (Sticky), auf dem Handy Spur mit Pfeilen | CSS, `stil.js` |
| Ablauf | Bühne bleibt stehen, der Scrollweg wechselt A, B, C, Stufen sind klickbar, großes Laufband | `data-fortschritt` plus `stil.js` (Klasse `gepinnt` nur ab 60rem und ohne reduzierte Bewegung), `@keyframes lauf` |
| Menü | Vollbild mit großen Links, Escape schließt | `bewegung.js`, CSS |

Bei reduzierter Bewegung, auf dem Handy und ohne JavaScript stehen die drei Schritte untereinander und alles ist sichtbar.

## Tokens (marke.css)
`--flaeche` (warmes Weiß), `--flaeche-alt`, `--flaeche-dunkel` (Kopf, Held, Buchung, Fuß), `--text`, `--text-leise`, `--linie`, `--akzent` (Koralle, Hauptaktion mit dunklem Text, auf Dunkel auch Text), `--akzent-text`, `--schrift-titel` (Archivo), `--schrift-text` (Instrument Sans), Radien (bewusst klein, `--radius-knopf` 10 px), `--flaeche-dunkel-2`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent` auf `--flaeche-dunkel` (Akzentwort, Kicker), `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen im Kopf, Fuß wiederholt den Namen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Das Akzentwort in der H1 sitzt in `.hl`.

## Offen
Formulare senden nichts. Kennzahlen, Zufriedenheitswerte, Preise, Öffnungszeiten, Namen und Adresse sind Beispiele, keine Belege; Preise sind keine Preisliste. Preisangaben und Kassenleistungen vor dem Einsatz rechtlich prüfen. Die Preisliste lässt sich auf Dauer statt Preis umstellen, wie in t60. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen (die Schleier sind auf die Platzhalter abgestimmt). Impressum und Datenschutz im Fuß sind Platzhalterlinks.
