# t43 Rechnungswesen hell

Prinzip nach der freigegebenen Referenz ledgerly-fintech-template.webflow.io (Startseite, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Buchhaltung, Rechnungsstellung, Steuerberatung, Zahlungssoftware und Dienstleister, die mit Belegen und Abläufen werben. Ruhig, hell und sachlich, mit dunklen Bändern als Rhythmus. Trägt auch ohne Produktbilder, weil die Oberflächen aus einfachen Karten bestehen. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Einfache weiße Kopfleiste (Menü mittig, Telefon, Hauptknopf), Held mit großem Titel und breiter Bildszene mit schwebenden Karten, vier Karten mit Oberflächen, Logoband, sechs Zellen mit Rahmenlinien, dunkles Band mit zwei wechselnden Zeilen (Rechnung, Umsatzkurve), sechs Spalten mit Knopf, dunkle Partnerliste (Bühne bleibt stehen, Zeilen hellen auf), drei Tarife (der mittlere dunkel), dunkle Stimmen (Bewertungskarte und wischbare Zitate), Journal mit drei Beiträgen, Aufruf auf breiter Bildfläche, dunkler Fuß. Neu: Fragen (Akkordeon) vor dem Schlussaufruf.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Überschriften, Karten, Zellen | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Logoband | läuft, Pause beim Überfahren | `.band` |
| Partnerliste | Bühne bleibt stehen (ab 64 rem), Zeilen hellen nacheinander auf | `stil.js`, `position: sticky` |
| Stimmen | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript sind alle Zeilen der Partnerliste voll sichtbar und die Bühne scrollt normal. Die Kopfleiste bleibt auch ohne JavaScript oben stehen (`position: sticky`).

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--karte-dunkel`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Haken, Kurve, Chips auf Hell), `--akzent-hell` (Haken und Text auf Dunkel), `--akzent-zart`, `--akzent-text`, `--tinte` (dunkler Hauptknopf), `--gold` (nur Sterne), `--ton-1` bis `--ton-6` (Bildplatzhalter), `--schrift-titel` und `--schrift-text` (Outfit), Radien.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche`, `--flaeche-alt` und `--akzent-zart`, `--akzent-hell` auf `--flaeche-dunkel`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, mehrere Stellen), Bildplatzhalter durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Preise, Zahlen, Namen, Bewertung, Logos und Adresse sind Beispiele, keine Belege. Die Oberflächen (Zahlungsliste, Überweisung, Rechnung, Kurve) sind erfundene Illustrationen. Die Landschaft im Held ist ein Platzhalter aus Verläufen, kein Bild. Texte in den Beispieloberflächen sind teils kleiner als 16 Pixel. Kontrast der Aufrufzeile über einem späteren Foto neu prüfen (der Schleier ist auf den Platzhalter abgestimmt).

## Conversion (Playbook)
- Held: Selbständige und kleine Teams, Problem Rechnungen von Hand nachhalten; H1 "Nie wieder Rechnungen von Hand schreiben", Unterzeile mit Ergebnis (schreibt, verschickt, gleicht ab)
- Primär-CTA "Rechnung testen" im Kopf, Held, Mittelteil, Tarifen und Schluss; "Zu den Rechnungen" und "Termin vereinbaren" (Unternehmen) bleiben eigene Ziele
- Titel und Beschreibung ohne Ortsbezug (Software), Keyword Rechnungssoftware am Anfang
- Beleg im Held als Kundenbewertung (Beispielwert)
- Fragen zu Kosten, Einrichtung, Buchhaltungsanbindung, Kündigung und kleinen Teams, Antworten als Beispielantwort markiert
- Kein Formular außer Newsletter, Ziel ist der Test
