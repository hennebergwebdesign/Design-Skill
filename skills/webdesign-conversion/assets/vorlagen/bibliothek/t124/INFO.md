# t124 Geländerad Vorbestellung

Prinzip nach https://www.rideradian.com/ (Startseite eines Elektro Enduro Motorrads mit Vorbestellung, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, Seitenhöhe 11295 px bei 1440), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen, das Einwilligungsbanner der Referenz ist bewusst nicht nachgebaut.

## Beobachtet, abgeleitet, unbekannt
Beobachtet (Messung bei 1440 mal 900): Held 2250 px hoch mit klebender Bühne von 900 px (Scrollweg 1350 px), darin ein Canvas über einem Video; Merkmalsabschnitt zweispaltig (648 und 648 px), Liste 426 px breit, klebende Bildspalte 648 mal 765 px mit 64 px Abstand oben, sieben Überschriften mit 48 px, Gewicht 500, Spur minus 1,2 px, die nicht aktiven mit Alpha 0,2; Geländeabschnitt 3089 px hoch mit Routen SVG 1344 mal 2161 px und Bildern in 240 mal 320, 360 mal 240 und 560 mal 373 px; Abschluss mit 96 px Überschrift und einer Skala aus 50 Strichen mit Zähler 01/50 bis 50/50; Preiszeile direkt über zwei Knöpfen (Hauptknopf gelb); Wechsel von hellen und dunklen Abschnitten (Grund 245 243 239, Text 18 23 20); Seite mit 8 Videos, 1 Canvas, 34 Bildern. Auf 390 Pixel: Seitenhöhe 7317 px, Held 844 px, Bildspalte entfällt.
Abgeleitet: Die Skala und das Fahrzeug im Abschluss laufen über den Scrollweg (Bildfolge oder Video), die Liste schaltet nach dem Abschnitt in Bildschirmmitte. Die Routenlinie läuft mit dem Scrollen.
Unbekannt: Bildzahl und Zeitverlauf der Folgen, Hover, Verhalten bei Zwischenbreiten, Ladeverhalten der Videos, Messwerte der Leistung.

## Eignung
Einzelfahrzeug oder Gerät mit hohem Preis, langer Lieferzeit und Vorbestellung gegen Anzahlung: Elektrorad, Lastenrad, Kleinfahrzeug, Boot, Maschine. Die Seite führt von der Aussage (Rad rollt ins Bild) über Merkmale, Haltung und Gelände zu Zahlen, Geschichte und Vorbestellung. Ansprache im Du. Lebt von wenigen großen Gesten und einem klaren Weg zur Anzahlung. Abgesetzt von t111 (Produktleuchte, Tagesverlauf): hier ein Fahrzeug mit Vorbestellweg, Route und Skala statt Tageszeit.

## Sektionsfolge
Kopfzeile (durchsichtig, nach dem Scrollen Waldschwarz, Menü, Telefon, Knopf "Jetzt vorbestellen"); Held (Studiobühne, Rad rollt ins Bild); Merkmalsliste (sechs Merkmale links, Tafel rechts bleibt stehen); Haltung (Vollbild Aussage); Gelände (Route mit verstreuten Aufnahmen, Punkt wandert); Zahlen (vier Kennzahlen); Geschichte (Dreierreihe, zwei Textspalten); Vorbestellung (Skala, Preis, zwei Knöpfe, Rad rollt durch den Wald); Vorbestellweg (vier Schritte, Formular mit fünf Feldern); Fragen (sechs Einwände); Fuß mit großer Schlusszeile.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Signatur 1: Die Bühne bleibt stehen (Sticky, 230 svh), das Rad rollt von rechts ins Bild und wächst leicht, die Räder drehen | `--fortschritt` aus `bewegung.js`, CSS (`transform`) |
| Merkmalsliste | Signatur 2: das Merkmal in Bildschirmmitte schaltet Tafel (Überblendung) und Markierung um, die anderen Überschriften dimmen | `stil.js` Teil 1 (IntersectionObserver), CSS (`opacity`, `transform`) |
| Haltung | Wörter hellen beim Scrollen auf, das Bild zieht leicht gegen die Scrollrichtung | `data-licht`, `data-parallax` |
| Gelände | Ein Punkt wandert an der Routenlinie entlang, Kilometer als Beispielzahl | `stil.js` Teil 2 (`getPointAtLength`, nur `transform`) |
| Zahlen | Ziffern zählen beim Sichtbarwerden hoch, Endwert steht im HTML | `data-zaehle`, `data-staffel` |
| Vorbestellung | Bühne bleibt stehen (260 svh), die Skala füllt sich, das Rad rollt von links in die Mitte | `stil.js` Teil 3, `--fortschritt`, CSS (`transform`, `opacity`) |
| Weg, Geschichte | Einblenden in Staffelung | `data-zeig`, `data-staffel` |
| Kopf | durchsichtig über dem Held, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung bleibt alles sichtbar: Held und Vorbestellung pinnen nicht, Rad steht im Endzustand, Skala ist voll, Punkt steht bei 45 Prozent der Route. Ohne JavaScript stehen alle Merkmale untereinander mit eigener Tafel, Rad und Skala im Endzustand, der Routenpunkt entfällt. Auf dem Handy pinnen Held und Vorbestellung ebenfalls, die stehende Tafel entfällt zugunsten einer Tafel je Merkmal. Leistungshinweis: Zwei pinnende Bühnen (230 svh und 260 svh) mit einer großen SVG Zeichnung, die per `transform` bewegt wird; auf schwachen Geräten ungemessen.

## Tokens (marke.css)
`--flaeche` (Kalkweiß), `--flaeche-alt`, `--flaeche-dunkel` (Waldschwarz), `--text`, `--text-leise`, `--linie`, `--akzent` (Waldschwarz, Hauptaktion auf Hell), `--akzent-text`, `--signal` (Hauptaktion auf Dunkel, Markierungen), `--signal-hell`, `--studio` (Held), `--karte-dunkel`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--rahmen-rad`, `--reifen`, `--felge`, `--speiche` (Zeichnung), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 15,4 zu 1, auf `--flaeche-alt` 13,5; `--text-leise` auf `--flaeche` 6,8, auf `--flaeche-alt` 6,0; `--akzent-text` auf `--akzent` 15,8; `--flaeche-dunkel` auf `--signal` 6,4; `--flaeche-dunkel` auf `--signal-hell` 7,4; `--signal` auf Waldschwarz 6,4, auf `--karte-dunkel` 5,6; `--text-auf-dunkel` auf Waldschwarz 15,8, auf `--karte-dunkel` 14,0, auf `--studio` 11,5; `--text-leise-dunkel` auf Waldschwarz 8,6, auf `--karte-dunkel` 7,6, auf `--studio` 6,2. Rand der Eingabefelder 3,9 zu 1 (Bedienelement, Mindestwert 3 zu 1). Die gedimmten Merkmalsüberschriften (Deckkraft 0,5, großer Text) liegen bei etwa 3,3 zu 1. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das Rad ist eine SVG Zeichnung (`.rad`), für ein anderes Fahrzeug durch dessen Umriss ersetzen.

## Offen
Formulare senden nichts. Preis, Anzahlung, Fristen, Lieferzeit, Reichweite, Gewicht, Drehmoment, Kilometer der Route, Geschichte, Name und Fragen samt Antworten sind Beispiele, keine Belege. Rückerstattung der Anzahlung, Widerruf, Preisangaben und die Frage nach Kennzeichen oder Führerschein (je nach Motorleistung und Unterstützungsgrenze) sind rechtlich nicht geprüft. Alle Aufnahmen (Wald, Staub, Hang) sind gezeichnete Platzhalterflächen und durch eigene Fotos oder Videos zu ersetzen (siehe `BILDER.md`). Die Referenz setzt Video und Bildfolgen ein, hier nur Zeichnung und Verläufe. Kontrast des Textes über den gezeichneten Aufnahmen ist über das dunkle Overlay geschätzt, nicht gemessen. Auf dem Handy entfällt die Skala der Vorbestellung. Safari, Screenreader und echte Geräte nicht geprüft.

## Conversion (Playbook)
- Held: Menschen, die im Gelände fahren, Problem Warten am Ladekabel und schwere Räder, Lösung Wechselakku in 30 Sekunden mit Mittelmotor, Risikoumkehr Anzahlung bis zur Konfiguration kostenfrei stornierbar (Beispiel)
- H1 "Elektrisch durchs Gelände, ohne am Ladekabel zu warten"
- Primär-CTA "Jetzt vorbestellen" in Kopf, Held, Merkmalsliste, Gelände, Vorbestellung ("Jetzt reservieren") und Fuß, Ziel `#reservieren`
- Titel mit Produkt und Handlung, Beschreibung mit Akku, Anzahlung und Lieferung
- Preis und Anzahlung offen neben dem Hauptknopf (Vorbestellung), Beispiel gekennzeichnet
- FAQ: Anzahlung, Lieferung, Reichweite, Kennzeichen, Service, Probefahrt
- Formularziel: Reservierung (Name, E-Mail, Telefon, Postleitzahl, Rahmengröße), fünf Felder, Hinweise unter E-Mail und Telefon

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Der Hauptknopf steht in jedem Bildschirm erreichbar neben Logo, Menü und Telefon, über dem Held durchsichtig. |
| held | hero | Die Bühne bleibt stehen, während das Produkt über den Scrollweg ins Bild rollt. |
| wechsel | features | Eine lange Merkmalsliste wird lesbar, weil immer nur eines im Fokus ist und die stehende Tafel dazu passt. |
| haltung | editorial | Eine einzige Aussage auf ruhigem Bild setzt zwischen Produkt und Beweis den Ton. |
| strecke | interactive | Eine Linie verbindet verstreute Bilder zu einer Strecke, ein wandernder Punkt gibt dem Scrollen ein Ziel. |
| zahlen | trust | Wenige große Zahlen mit Einheit lassen sich vergleichen, ohne Datenblatt. |
| geschichte | about | Drei Aufnahmen und ein kurzer Ursprungstext machen aus Technik eine Haltung. |
| finale | cta | Preis und Anzahlung stehen offen neben dem Hauptknopf, die Skala macht den Weg zur Entscheidung spürbar. |
| weg | process | Vier kurze Schritte nehmen die Angst vor der Bindung, das Formular daneben hat nur fünf Felder. |
| fragen | faq | Die Einwände vor einer Anzahlung werden beantwortet, bevor sie zum Abbruch führen. |
| fuss | footer | Der Fuß wiederholt die Hauptaktion unter einer großen Schlusszeile. |
