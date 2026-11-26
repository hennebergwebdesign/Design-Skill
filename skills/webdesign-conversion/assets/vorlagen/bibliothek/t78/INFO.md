# t78 Vergütungssoftware schwarz und Mint

Prinzip nach einem Pinterest Screenshot des Inhabers (Vergütungsplanung, HR Software, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Keine Markennamen und Fremdlogos.

## Eignung
Personal-, Gehalts- und Planungssoftware für den Mittelstand, auch Beratungen und Dienste mit erklärungsbedürftigem Produkt und wenigen, ruhigen Bildern. Lebt von Großschrift, drei Kennzahlen und einem Bildmaterial, das Menschen bei der Arbeit zeigt. Ansprache im Sie. Eher als Marketingseite für Produkt und Demo gedacht, nicht als Produktoberfläche (die Vorlage zeigt bewusst keine Oberflächenbilder).

## Sektionsfolge
Schwarze Kopfleiste (Logo, Uhr mit Ort, Menü, Telefon, Knopf), schwarzer Held mit großer leichter Zeile, Unterzeile und Knopf, Kachelreihe aus Funktionskachel in Mint, Foto und Zitatkarte (ragt in den Held, schwarze Schiene mit senkrechtem "Weiter nach unten"), Intro mit großem Satz und drei Kennzahlen, Band der Schnittstellen, Ablauf mit nummerierter Liste und großem Foto, Stimmen mit Querbild und weißer Zitatkarte, Wissen als Artikelzeilen mit Kennzahl, Bildstreifen "Folge uns", Fragen, Kontakt mit Formular, schwarzer Fuß mit großer Zeile, Linkspalten und rundem Knopf nach oben.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Zeile fährt beim Laden zeilenweise hoch, Text bleibt als normaler Text in der H1 | CSS (`transform`, `animation`), nur mit JavaScript, bei reduzierter Bewegung statisch |
| Kachelreihe | Kacheln driften beim Scrollen leicht gegenläufig (ab 768 px, darunter Wischspur) | `data-parallax` mit +0,06 und -0,05 |
| Intro | Wörter des großen Satzes hellen beim Scrollen auf | `data-licht` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Ablauf | Hover, Fokus oder Klick auf einen Punkt wechselt Bild und Text, Punkt aktiv unterstrichen, ohne JavaScript steht Punkt 01 | `stil.js`, CSS (`opacity`) |
| Stimmen | Querbild mit leichter Parallaxe, Zitatkarten als Wechsler mit Pfeilen, Fortschrittslinie und Zähler (ab 768 px Karte über dem Bild, ohne JavaScript stehen alle Karten untereinander) | `stil.js`, CSS (`transform`, `opacity`) |
| Wissen | Zeile hebt sich beim Überfahren und Fokussieren, Pfeil rückt vor | CSS (`transform`), Hover nur bei Mausgeräten |
| Bänder | Schnittstellen und Bildstreifen laufen langsam, Hover und Knopf "Band anhalten" pausieren, bei reduzierter Bewegung ein scrollbarer, ruhiger Streifen | `band` aus `basis.css`, `stil.js` |
| Kopf | Uhrzeit läuft live (Beispiel), bei reduzierter Bewegung steht ein fester Wert | `stil.js` |
| Abschnitte | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Das Video im Streifen ist nur ein Abspielzeichen auf einem Poster.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Held, Kopf, Fuß), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (schwarze Fläche des Hauptknopfs auf Hell), `--akzent-text`, `--mint` und `--mint-text` (Mint nur als Fläche: Funktionskachel, Hauptknopf auf Dunkel, Kontaktkarte, nie Textfarbe), `--zitat-karte`, `--weiss`, `--feld-rand`, `--schrift-titel` (Hanken Grotesk, Gewicht 300), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-3` für Bildflächen.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--text-leise` auf `--flaeche`, `--flaeche-alt` und `--zitat-karte`, `--mint-text` auf `--mint`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Gemessen mit den Ausgangswerten: 5,4 bis 16,2 zu 1. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Die Großzeile im Held ist auf zwei Zeilen abgestimmt (`font-size` in `vw`, gedeckelt in `rem`); ein längerer Titel braucht einen kleineren Wert. Foto und Beispielzahlen ersetzen, Stand der Uhr (`data-uhr`) bei Bedarf auf die Zeitzone des Kunden setzen.

## Offen
Formular sendet nichts. Alle Zitate, Namen, Kennzahlen (4,9, über 5 Mio. €, 1.200+), Artikel, Daten, Antworten und Schnittstellen sind Beispiele, keine Belege (mit `data-beispiel` und Hinweis im Text markiert). Die Antworten zu Datenort, Auftragsverarbeitung und Preisen sind je Anbieter zu klären und rechtlich nicht geprüft. Zur Vorlage gehört keine Oberflächenansicht der Software, dort gehört echtes Produktmaterial hin. Fotos sind Beispielfotos (Unsplash), vor Abgabe ersetzen. Kontrast von Text über dem Querbild liegt auf einer weißen Karte, Kontrast der Mint Kachel und des Fokusrings nicht über Bildern geprüft. Links im Fuß, bei den Artikeln und bei den Netzwerken sind Platzhalter. Die Schnittstellenzeichen sind eigene neutrale Symbole, keine Markenlogos. Safari, Screenreader und echte Geräte nicht geprüft. Die Uhr ist aria-hidden und nur Zierde.

## Conversion (Playbook)
- Held: Personalleitungen im Mittelstand, Gehaltsrunde in zwanzig Tabellen, Planung und Freigabe in einer Software; Formel steht in der Unterzeile, die H1 ist die kurze Großzeile "Vergütung ganz in Ihrer Hand"
- Primär-CTA "Demo buchen" in Kopf, Held, Ablauf, Formular und Fuß (fünfmal), Telefonlink im Kopf (ab 1280 px), Held, Kontakt
- Titel mit Keyword und Aufruf, Beschreibung mit Problem, Nutzen und Aufruf, JSON-LD SoftwareApplication mit Beispielwerten (ohne erfundene Bewertung)
- Fragen: Einführung, Datenort und Zugriff, Lohnabrechnung, Preis, Abläufe umbauen (fünf, Antworten als Beispiel)
- Formular: Name, Unternehmen, E-Mail, Telefon freiwillig, Mitarbeitende, fünf Felder, Hinweise unter E-Mail und Telefon, Platzhalter für Turnstile
- Beleg: drei Kennzahlen und drei Stimmen, alle als Beispiel gekennzeichnet
