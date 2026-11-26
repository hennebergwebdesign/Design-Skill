# t101 Reinigung Marine und Zitrone

Prinzip nach einem Pinterest Screenshot des Inhabers (Reinigungsservice, Symbolkarten mit hervorgehobener Mittelkarte, Foto im stark gerundeten Rahmen mit Preistafeln, Kachelcluster, große dekorative Kreise), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Keine Adresse der Referenz bekannt. Das Vorbild hat keinen Held, der Held ist eigen.

## Eignung
Gebäude- und Wohnungsreinigung für Privathaushalte und kleine Büros, auch Hausmeisterdienste, Fensterreinigung und Umzugsservice, die Anfragen über Festpreis, feste Reinigungskraft und ein Terminformular gewinnen wollen. Ansprache im Sie. Abgesetzt von t09 (frische Dienstleistung) und t31 (Gebäudeservice für Gewerbe) durch Marine mit Zitronengelb auf Blaugrau, SVG Symbolkarten statt Fotoleistungen, Preistafeln und große Kreise.

## Sektionsfolge
Schlanke Kopfzeile mit Telefon und Termin Knopf, Held (Satz, zwei Knöpfe Termin und WhatsApp, Telefon, drei Vertrauenszeilen, Foto im stark gerundeten Rahmen mit schwebender Terminkarte, zwei große Kreise), Leistungen als Reihe von drei Symbolkarten (mittlere angehoben mit Knopf), Preise (Foto im gerundeten Rahmen mit zwei Preistafeln, Haken, Termin Knopf), Kundenstimme groß mit Kachelcluster aus Beispielzeichen, Über uns (Foto im Rundrahmen, drei Kennzahlen), Fragen (Akkordeon, sechs Einträge), Kontakt in Marine mit Terminformular, Fuß (hell).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, alle Abschnitte | Texte und Karten blenden gestaffelt ein | `data-zeig`, `data-staffel`, `bewegung.js` |
| Große Kreise (Held, Leistungen, Preise, Stimmen, Über uns, Kontakt) | driften langsam gegenläufig zum Scrollen, Vorzeichen von `data-parallax` wechselt | `data-parallax`, nur `transform` |
| Leistungskarten | mittlere Karte schiebt sich beim Sichtbarwerden nach oben, Hervorhebung wechselt beim Überfahren und per Tab (`:hover`, `:focus-within`, Rückfall auf die Mittelkarte über `:has`) | CSS (`transform`, `opacity` einer Ebene), kein JavaScript |
| Preistafeln | fahren gestaffelt von rechts ein, wippen nicht | `data-zeig="rechts"`, `data-staffel` |
| Foto im Held und bei den Preisen | Signaturbewegung: ein Glanzstreifen fährt einmal über das Foto | CSS `@keyframes glanz` (`transform`, `opacity`), startet mit `.ist-da` |
| Kachelcluster | schwebt leicht, langsam, versetzt | CSS `@keyframes schwebe` (`transform`) |
| Terminkarte im Held | schwebt leicht | CSS (`transform`) |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Karten (Stimmen, Fragen) | Pfeil im Akkordeon dreht sich | CSS (`transform`) |
| Kopf | Fläche und Schatten blenden beim Scrollen ein (Ebene mit `opacity`), Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |

Bei reduzierter Bewegung (Glanz, Schweben, Aufschieben aus, Kreise still) und ohne JavaScript bleibt alles sichtbar und bedienbar. Ohne JavaScript scrollt das Menü als Zeile unter dem Kopf, die mittlere Karte bleibt angehoben.

## Tokens (marke.css)
`--flaeche` (helles Blaugrau), `--flaeche-alt`, `--flaeche-dunkel` und `--marine-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Marine, Fläche mit weißem Text), `--akzent-text`, `--marine-mittel` (Kreise), `--zitrone` (Gegenakzent: Fläche, Kreis, Punkt im Knopf, Haken, nie Textfarbe auf Hell), `--weiss`, `--feld-rand`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Hanken Grotesk), Radien (`--radius-gross` 56 px für Fotorahmen).

## Marke wechseln
Nur `marke.css` ändern. Selbst nachgerechnet (WCAG, Verhältnis zu 1): `--akzent-text` auf `--akzent` 11,6; `--text` auf `--flaeche` 14,9, auf `--flaeche-alt` 13,3; `--text-leise` auf `--flaeche` 6,5, auf Weiß 7,0, auf `--flaeche-alt` 5,8; Weiß auf `--marine-dunkel` 15,2; `--text-leise-dunkel` auf `--marine-dunkel` 10,3; `--text` auf `--zitrone` 11,7; Eingabefeldrand `--feld-rand` auf Weiß 5,1. Zitrone steht nur als Fläche oder Zeichen, nie als Text auf Hell. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Preise, Kennzahlen, Stimmen, Namen, Beispielzeichen, Terminangaben, Fragen und Antworten sind Beispiele, keine Belege, und so gekennzeichnet. Alle Fotos sind Beispiele aus t09 (Nachweis in `BILDER.md`), vor Abgabe durch Fotos des Betriebs mit Einwilligung ersetzen. Es gibt kein Foto zu Fensterreinigung und Team, die Leistungskarten tragen SVG Symbole. Das Foto bei den Preisen zeigt einen Flur mit Schutzkleidung, nicht typisch Büro. Der WhatsApp Link (`wa.me`) ist ein Platzhalter, ein Aufruf öffnet erst beim Klick einen Fremdserver, ein Hinweis in der Datenschutzerklärung ist nötig. Rechtstexte (Impressum, Datenschutz, Versicherung, Kündigungsfristen) sind nicht rechtlich geprüft. Kontrast von Text über den Kreisen entfällt, kein Text liegt auf ihnen (am Rand geprüft per Screenshot, nicht per Messung). Die mittlere Karte ist die Standardhervorhebung, ohne `:has` (ältere Browser) bleibt sie dauerhaft hervorgehoben, auch wenn eine andere überfahren wird. Safari, Screenreader und echte Geräte nicht geprüft. Die Kopfleiste haftet oben, `scroll-margin-top` ist gesetzt (5,5 rem).

## Conversion (Playbook)
- Held: Privathaushalte und kleine Büros in Musterstadt, Problem keine Zeit und wechselnde, unzuverlässige Reinigungskräfte, Lösung feste Reinigungskraft zum festen Termin mit Festpreis nach Besichtigung
- H1 "Wohnung und Büro sauber, zum festen Termin und zum Festpreis", Unterzeile nennt feste Kraft, Wunschtermin und verbindlichen Preis
- Primär CTA "Termin anfragen" in Kopf, Held, Preisen, Formular und Fuß, dazu Telefon und WhatsApp sichtbar
- Titel mit Keyword und Musterstadt, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Kosten, Schlüssel, Material, Versicherung, Terminfrist, Verschieben und Kündigen
- Formularziel: Terminanfrage (Name, E-Mail, Telefon, Leistung, Wunschtermin), fünf Felder, Hinweise unter E-Mail und Telefon
- Preise, Kennzahlen und Stimmen als "Beispiel" gekennzeichnet
