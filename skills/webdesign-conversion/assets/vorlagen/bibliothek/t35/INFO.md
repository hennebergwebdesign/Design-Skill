# t35 Restaurant ruhig und eckig

Prinzip nach der freigegebenen Referenz Eatly (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Restaurant, Café, Bäckerei mit Sitzplätzen und Catering mit Karte, Tischreservierung und Veranstaltungen. Ruhige, eckige Seite mit viel Fläche und wenig Schmuck, gedacht für Betriebe mit guten Fotos von Tellern, Menschen und Raum. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Klebende Kopfleiste (Logo, Menü, Hauptknopf), Held aus zwei Flächen mit schmalem Spalt (Text auf Dunkel, Foto), Gästezeile mit Bewertung, Wer wir sind (gekipptes Foto, Text, Zitatkasten), Spezialitäten als Liste mit Preislinie, sechs Bildkacheln, Galerie als Laufband auf dunklem Grund, Veranstaltung mit Zähler auf einer Bildbühne, Stimmen als Spur mit Pfeilen, Reservierung (Foto und Formularkarte), Fuß auf Dunkel mit Newsletter und angeschnittenem Markennamen. Neu: Fragen (Akkordeon) vor der Reservierung.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, Staffelung | `data-zeig`, `data-staffel` |
| Galerie | Laufband, pausiert beim Überfahren | `.band` |
| Bildkacheln | Bild wächst beim Überfahren leicht | CSS `transform` |
| Veranstaltung | Zähler läuft sekündlich bis zum Termin in `data-ziel` | `stil.js` |
| Stimmen | Spur mit Scroll Snap und Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Das Laufband wird bei reduzierter Bewegung zur wischbaren Reihe, der Zähler zeigt einmal den Stand und steht dann still.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-karte`, `--flaeche-dunkel` (Kakao), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Terrakotta, Fläche mit weißem Text, auf Hell auch Text), `--akzent-text`, `--akzent-hell` (Akzent auf Dunkel), `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), Radien (alle 0, eckig), `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche` und `--flaeche-karte`, `--akzent-text` auf `--akzent`, `--akzent-hell` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Kopf, Fuß, `favicon.svg`), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Rundungen: `--radius-knopf`, `--radius-karte`, `--radius-bild` auf einen Wert über 0 setzen, wenn die Marke weicher sein soll.

## Offen
Formulare senden nichts. Preise, Gästezahl, Namen, Stimmen, Termin und Adresse sind Beispiele, keine Belege. Der Zähler zielt auf ein Beispieldatum (24.12.2026) und zeigt Striche, sobald es vorbei ist; im Projekt `data-ziel` pflegen oder den Zähler entfernen. Die Karte hat keine Kategorien und keine Detailseiten. Kontrast von Text über Fotos (Kacheln, Platzhalterhinweise) nach dem Einsetzen neu prüfen.

## Conversion (Playbook)
- Held: Gäste, die einen ruhigen Tisch für Abend, Mittag oder Feier suchen; H1 "Ein ruhiger Tisch für jeden Anlass", Unterzeile mit Ergebnis (Reservierung in zwei Minuten)
- Primär-CTA "Tisch reservieren" in Kopf, Held, Veranstaltungsband und Formular
- Titel und Beschreibung mit Ortsplatzhalter "Musterstadt"
- Beleg im Held: Gästezahl als Beispielwert gekennzeichnet
- Fragen vor der Reservierung (Preis, Dauer, Allergien, Absage, spontaner Tisch), Antworten als Beispiel
- Formular Reservierung: vier Felder, Hinweis unter Telefon und E-Mail, Feld "Wunsch und Hinweise" für Allergien
