# t111 Produktleuchte im Tagesverlauf

Prinzip nach der Webflow Vorlage https://heavn-one.webflow.io/ (Startseite eines Einzelprodukts, eine Schreibtischleuchte, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen.

## Eignung
Einzelprodukt Launch mit hohem Preis und erklärungsbedürftigem Nutzen: Leuchten, Geräte, Möbel, Haushalts und Bürotechnik, auch Software mit Hardware. Die Seite führt in einer Scrollgeschichte vom Gefühl (Licht geht an) über den Nutzen (Tagesverlauf) und die Funktionen zur Bestellung und zur Beratung für Büros. Ansprache im Sie. Lebt von einer ruhigen Reihenfolge, nicht von vielen Bildern. Abgesetzt von t90 (Leuchtenshop mit Produktkarten): hier ein Produkt, eine Geschichte, dunkle Bühne.

## Sektionsfolge
Feste Kopfleiste (Tinte) mit Menü, Telefon und Knopf "Jetzt bestellen"; Held auf dunkler Bühne (Aussage links, gezeichnete Leuchte rechts, Licht geht beim Scrollen an); Sonne (eine Aussage, eine Scheibe wächst dahinter); Tagesverlauf (Bühne mit Foto, Uhrzeit und Lichtfarbe links, vier Stufen rechts); Funktionen (vier Karten: Reglerkarte als Handy aus HTML, Ladefläche, Frontlicht, Sensorkurve als SVG); Stimme (ein großes Zitat, Beispiel); Technik (Datenblatt als Akkordeon, Umrisszeichnung); Fragen (sechs Einwände); Bestellen (Zusagen, Knopf); Büros (Rückruf Formular); Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Signatur 1: Die Bühne bleibt stehen (Sticky, 240 vh), die Leuchte geht über den Scrollweg an: Lichtleiste, Schein, Lichtkegel (wächst von oben) und warmer Hintergrund | `--fortschritt` aus `bewegung.js`, CSS (`opacity`, `transform`) |
| Sonne | Eine Scheibe wächst hinter der Aussage von klein auf bildfüllend | `--fortschritt`, CSS (`transform`, `opacity`) |
| Tagesverlauf | Die Stufe in der Bildschirmmitte schaltet Foto (Überblendung), Uhrzeit (hebt ein) und Lichtpunkt um, die anderen Stufen dimmen | `stil.js` (IntersectionObserver), CSS (`opacity`, `transform`) |
| Funktionen | Karten staffeln ein und heben sich beim Überfahren; Ring, Strahl und Kurvenpunkt atmen | `data-staffel`, CSS (`transform`, `opacity`) |
| Reglerkarte | Signatur 2: Schieber und Knöpfe stellen Zeit, Lichtfarbe und Größe des Lichtpunkts im Handy ein | `stil.js`, CSS (`transform`) |
| Stimme | Wörter hellen beim Scrollen von leise auf voll auf | `data-licht` |
| Technik | Umrisszeichnung steigt leicht gegen die Scrollrichtung; Akkordeon, ein Eintrag offen, Plus dreht zum Kreuz | `data-parallax`, `details` mit `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung bleibt alles sichtbar: Held und Sonne pinnen nicht, Licht und Scheibe stehen im Endzustand, Stufen sind voll sichtbar, nichts läuft. Ohne JavaScript stehen die Stufen des Tagesverlaufs mit eigenem Foto untereinander, Held und Sonne stehen im Endzustand, der Regler zeigt den Mittag. Auf dem Handy pinnen Held und Sonne ebenfalls, die Tagesbühne entfällt zugunsten von Foto je Stufe.

## Tokens (marke.css)
`--flaeche` (Salbeiweiß), `--flaeche-alt`, `--flaeche-dunkel` (Tinte), `--text`, `--text-leise`, `--linie`, `--akzent` (Tinte, Fläche mit hellem Text), `--akzent-text`, `--sonne`, `--sonne-tief` (Scheibe, Zeitangabe auf Dunkel), `--morgen`, `--mittag`, `--abend`, `--nacht` (Lichtfarben der Stufen), `--nacht-grund`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Instrument Sans), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 14,5 zu 1, auf `--flaeche-alt` 13,1; `--text-leise` auf `--flaeche` 7,0, auf `--flaeche-alt` 6,4; `--akzent-text` auf `--akzent` 14,5; `--text-auf-dunkel` auf Tinte 15,5, auf `--nacht-grund` 13,6; `--text-leise-dunkel` auf Tinte 8,6, auf `--nacht-grund` 7,5; `--sonne` auf Tinte 8,5; `--text` auf `--sonne` 8,0. Rand der Eingabefelder 3,9 zu 1 (Bedienelement, Mindestwert 3 zu 1). Die Lichtfarben `--morgen` bis `--nacht` sind nur Farbpunkte, nie Textfarbe. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Die gezeichnete Leuchte im Held ist SVG (`.lampe`), für ein anderes Produkt durch dessen Umriss ersetzen und `.lampe__schein` neu positionieren.

## Offen
Formulare senden nichts. Preise, Fristen, Lieferzeit, Kelvinwerte, Maße, Stimme, Name und Fragen samt Antworten sind Beispiele, keine Belege. Die Rückgabe, Widerruf und Preisangaben (Button Lösung, Preisangabenverordnung) sind rechtlich nicht geprüft; vier Fotos sind Beispielfotos anderer Themen (Laptop am Schreibtisch, Lampe auf Buch), keine Fotos dieser Leuchte (Nachweis in `BILDER.md`). Das Zeigen der Leuchte im Held ist eine eigene Zeichnung, kein Produktfoto; im Projekt durch Fotos oder 3D Aufnahmen ersetzen. Kein Video, die Referenz hat einen Filmplatzhalter und ein Interview, beides nicht nachgebaut. Kontrast der Uhrzeit auf den Fotos der Tagesbühne ist über den Verlauf geschätzt, nicht gemessen. Die Wirkaussagen des Tagesverlaufs ("kühl und hell am Morgen") sind Gestaltung, keine Gesundheitsaussage; Schlaf und Wohlbefinden werden bewusst nicht behauptet. Safari, Screenreader und echte Geräte nicht geprüft. Die Held und Sonnenbühne pinnen 240 vh und 210 vh, Leistung auf schwachen Geräten ungemessen.

## Conversion (Playbook)
- Held: Menschen im Büro und Homeoffice, Problem Licht zu hell, zu kalt oder zu schwach über den Tag, Lösung Schreibtischleuchte, die ihr Licht mit dem Tag ändert, mit 30 Tagen Rückgabe als Risikoumkehr
- H1 "Die Leuchte, die den Tag am Schreibtisch mitgeht", Unterzeile nennt Verlauf (Morgen, Mittag, Abend) und 30 Tage Test
- Primär-CTA "Jetzt bestellen" in Kopf, Held, Sonne, Tagesverlauf, Funktionen, Bestellen und Fuß
- Titel mit Produkt und Nutzen, Beschreibung mit Verlauf, Test und Lieferung
- FAQ: Preis, Rückgabe, App, Standfläche, Lieferung, Mengenpreise, dazu sechs Einträge Datenblatt
- Formularziel: Rückruf für Büros (Name, E-Mail, Telefon, Zahl der Arbeitsplätze, Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon
- Zusagen, Stimme und Zahlen als "Beispiel" gekennzeichnet
