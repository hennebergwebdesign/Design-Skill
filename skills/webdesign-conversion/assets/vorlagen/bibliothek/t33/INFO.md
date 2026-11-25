# t33 Haustechnik dunkel

Prinzip nach der freigegebenen Referenz Airstead (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Heizung, Lüftung, Klima, Sanitär, Elektro, Dach und weitere Gewerke mit Notdienst, Wartung und Neuanlagen. Auch für Betriebe, die auf Fotos im Abendlicht setzen können (Techniker, Außengeräte, Gebäude). Ansprache im Du, für Sie im Text ersetzen. Ohne gutes Bildmaterial verliert die Seite ihren Kern.

## Sektionsfolge
Schwebende Leistenleiste, Vollbildheld im Dunkeln (Plaketten, H1, zwei Knöpfe), Vertrauen (Bewertung, Siegel, Logolaufband), Kennzahlen als Zeilen, Anspruch (Wortlicht, Mosaik aus Bild und Schieferkarten), Leistungen (helle Kacheln, geöffnet dunkel), Ergebnisse (breite Bildkacheln in einer Spur mit Pfeilen), Stimmen (große Bildkarte, zwei Karten), Vollbildaufruf, Ratgeber (zwei Beiträge), Kontakt (Kontaktkarte, Formular mit Aktionsleiste), Fuß als dunkle Karte über einem Bildband.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bild dunkelt beim Scrollen ab, Plaketten und Text staffeln ein | `data-abdunkeln`, `data-zeig`, `data-staffel` |
| Überschriften | Wortlicht Wort für Wort | `data-licht` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| Vertrauen | Logolaufband | `.band` |
| Leistungen | Kachel öffnet und färbt sich dunkel, Plus dreht zum Kreuz, Escape schließt | `details` mit `data-exklusiv`, `stil.js`, CSS |
| Ergebnisse | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Aufruf | Bild läuft gegen die Scrollrichtung | `data-parallax` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, mit JavaScript bleibt sie stehen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--schiefer`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Bernstein, auf Dunkel Text und Fläche, auf Hell nur Fläche mit dunklem Text), `--akzent-text`, `--akzent-tief` (Text und Linie auf Hell), `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-tief` auf `--flaeche` und `--flaeche-alt`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf `--flaeche-dunkel` und `--schiefer`. Name und Zeichen im Logo (Symbol `#i-flamme`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Bewertung, Siegel, Kennzahlen, Namen, Stimmen und Adresse sind Beispiele, keine Belege; Siegel nur zeigen, wenn der Betrieb sie wirklich führt. Logos sind Beispiellogos. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen (Schleier sind auf die Platzhalter abgestimmt). Zwei Links im Fuß (Impressum, Datenschutz) sind Platzhalter.

## Conversion (Playbook)
- Held: Eigentümer und Verwaltungen mit ausgefallener Heizung, Lösung ist ehrliche Diagnose mit Festpreis und festem Termin; neue Unterzeile `.held__lead` (CSS ergänzt)
- Primär-CTA: Termin anfragen (Kopfzeile, Held, Leistungen, Abschluss, Formular)
- Titel und Beschreibung mit Keyword Heizung Lüftung und Ort Musterstadt
- Keine Einwand-FAQ vorhanden: die Details sind Leistungskacheln, eine FAQ-Sektion ist offen
- Formular: Mail für die Terminbestätigung, Frage nach dem Zustand der Anlage
- Einwand FAQ `#fragen` vor dem Kontakt: Kosten des Wartens, Notdienst, Termin, Ablauf, kleine Reparaturen (Beispielantworten, `data-beispiel`).
