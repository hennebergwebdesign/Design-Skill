# t61 Klinik Pastellkarten

Prinzip nach der freigegebenen Referenz medura-oly.webflow.io (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Medizinische Zentren, Facharztgemeinschaften, Kliniken, Physiotherapie und Gesundheitsdienste mit mehreren Fachbereichen. Heller Grund, Pastellkarten, viel Vertrauensmaterial (Ärzte, Stimmen, Fragen). Terminbuchung steht im Kopf (immer sichtbar, auch auf dem Handy mit Telefon), im Held und als Formular am Ende. Ansprache im Du, für ein medizinisches Haus in der Regel auf Sie umstellen. Keine Heilversprechen im Beispieltext, bei echten Texten Heilmittelwerbegesetz und Berufsordnung beachten. Das Formular fragt bewusst keine Diagnosen ab (Hinweis im Platzhalter).

## Sektionsfolge
Weiße Kopfkarte, die über dem Pastellfeld des Helds liegt, Held (H1, zwei Knöpfe, Kennzahlkarte, Arzt im Bogen mit zwei schwebenden Karten und treibenden Kugeln), Laufband mit Beispiellogos, Über uns (Titel links, großer Satz rechts mit Wortlicht, Kennzahlen, zwei Bilder), Fachbereiche (getönte Karten in einer Spur mit Pfeilen), Gründe (Pastellfeld mit Zeilen, hohem Bild und zwei Karten), Ärzte (Porträtkarten mit Namensschild und Terminknopf), Stimmen (zweizeiliges Laufband), Gut erreichbar (Bild mit Videoleiste, Sandfeld mit zwei Karten), Fragen (Titel links, Akkordeon rechts), Ratgeber (drei Beiträge), Termin (Titel links, Formularkarte rechts), dunkler Fuß mit Newsletterkarte.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Kugeln treiben sanft auf und ab, Text und Bogen blenden gestaffelt ein | CSS `@keyframes schweben`, `data-zeig`, `data-staffel` |
| Held, Über uns | Zähler laufen hoch, Endwert steht im HTML | `data-zaehle` |
| Über uns | Wörter des großen Satzes hellen auf | `data-licht` |
| Partner | Logolaufband, hält bei Hover an | `.band` |
| Fachbereiche | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Stimmen | zwei Reihen laufen langsam seitlich, halten bei Hover und Fokus an | CSS `@keyframes lauf`, transform |
| Fragen | Plus dreht zum Kreuz, nur eine Antwort offen | `details` mit `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar: Kugeln stehen still, die Stimmen sind seitlich scrollbar statt automatisch laufend.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (nur der Fuß), `--text`, `--text-leise`, `--linie`, `--akzent` (Tintenblau, Hauptaktion mit weißem Text und Symbolscheiben), `--akzent-text`, `--schrift-titel` (Outfit), `--schrift-text` (Manrope), Radien, `--ton-himmel`, `--ton-minze`, `--ton-sand` (Kartenfarben), `--panel-von` und `--panel-bis` (Heldfeld), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf den drei Kartenfarben, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Der Arzt im Bogen funktioniert mit einem freigestellten Foto; der Bogen wird dann durch das Bild ersetzt.

## Offen
Formulare senden nichts. Zahlen, Bewertungen, Namen, Stimmen, Öffnungszeiten und Logos sind Beispiele, keine Belege; Logos sind Beispiellogos. Die Videoleiste im Bild ist Zierde (kein Anruf, aria-hidden). Termin und Datenschutz je Projekt anbinden und den Dienst im Datenschutz nennen. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Impressum und Datenschutz im Fuß sind Platzhalterlinks.

## Conversion (Playbook)
- Beschreibung auf 160 Zeichen gekürzt
- Kommentar zur Heldformel vor der H1
- Formular von sieben auf fünf Felder: Vor und Nachname zu "Name", Wunschtermin in die Nachricht (Platzhalter angepasst), Fachbereich über die ganze Breite
- Feldhinweise unter E-Mail und Telefon (`.feld__hinweis` in `stil.css`)
- Kopfknopf, Telefon, FAQ waren schon da
