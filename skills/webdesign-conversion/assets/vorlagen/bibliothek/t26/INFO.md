# Stapelkarten (t26)

**Eignung:** Betriebe mit Paketpreisen und Wartung (Heizung, Klima, Haustechnik, ähnlich Reinigung, Gebäudeservice, Pflegedienste), die Preise offen zeigen und über Schnellzugriffe (Notdienst, Angebot, Wartung, E-Mail) Anfragen holen wollen. Prinzip nach der Referenz Ventraflow, Aufbau und Bewegung nachgebaut, Text, Bild, Code, Schrift und Farbe eigen.

## Sektionsfolge
1. Schwebende Kopfzeile, Vollbild-Held mit Überschrift links, zwei Knöpfen und vier Schnellzugriffen
2. Leitsatz mit Wortlicht, vier Zusagen
3. Große Bildkarte mit Aktion, darunter Stimmen als Laufband
4. Leistungen: drei Karten mit Bildfläche und Symbol
5. Preise auf dunkler Fläche: Umschalter monatlich/jährlich, drei leicht gekippte Karten, Partner als Laufband
6. Projekte: drei Karten, die mittlere versetzt
7. Ablauf: Überschrift bleibt stehen, vier gekippte Karten ziehen daneben vorbei
8. Fragen als Akkordeon, Ratgeber (zwei Beiträge)
9. Abschlusskarte mit Anfrage und Telefon, dunkler Fuß mit Newsletterfeld und Linkspalten

## Animationen
- Held: Bild zoomt ein, Überschrift steigt Wort für Wort auf, Rest erscheint gestaffelt (reines CSS)
- Leitsatz: Wortlicht beim Scrollen (`data-licht`, bewegung.js)
- Bildkarte: leichte Tiefenverschiebung (`data-parallax`)
- Stimmen: Laufband wandert mit dem Scrollweg seitlich (stil.js); bei reduzierter Bewegung ein normal wischbarer Streifen
- Preise und Ablauf: Karten alternierend um 1 Grad gekippt, Hover richtet sie auf; Ablauf-Überschrift sticky ab 62rem
- Preisumschalter ohne JavaScript (Auswahlknöpfe plus `:has`), Akkordeon, Partnerleiste läuft endlos
- Reduzierte Bewegung und ohne JavaScript: alles sichtbar, nichts animiert

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-tief` (Akzent als Textfarbe auf Hell), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, Radien, Schriften (Manrope, Instrument Sans), Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` ändern, Kontrast prüfen (Akzenttext auf Akzent, `--akzent-tief` auf Hell mindestens 4,5 zu 1).
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (Overlays im Held und in der Bildkarte bleiben für die Lesbarkeit).
3. Alle Elemente mit `data-beispiel` (Zusagen, Stimmen, Preise, Projekte, Beiträge), Beispiellogos, Telefon, Adresse ersetzen oder löschen.
4. Newsletterformular sendet nichts: Anbindung und Einwilligung ergänzen oder Block entfernen. Impressum, Datenschutz verlinken.

## Grenzen
- Keine echten Bilder, Logos sind erfundene Beispiellogos. Icons: Phosphor bold (MIT), als Sprite.
- Preisumschalter braucht `:has` (ältere Browser zeigen beide Preise).
- Nicht geprüft: Screenreader, Safari, echte Fotos hinter den Overlays (Kontrast neu messen).

## Conversion (Playbook)
- Held: Kommentar mit der Heldenformel vor der H1 (sonst keine Lücke)
