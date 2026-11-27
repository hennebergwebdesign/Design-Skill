# t115 Strandgut mit Wortmarke

Prinzip nach https://www.peligoni.com/ (Startseite eines Küstenresorts, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, langsames Scrollen, am 27.11.2026), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen.

## Eignung
Hotel, Landgut, Ferienhausanlage oder Gastronomie an Küste oder See, die Stimmung und Ort verkaufen, nicht Ausstattungslisten: Strandhotel, Gut mit Ferienwohnungen, Campingresort, Weingut mit Gästehaus. Die Seite führt in einer Folge von Fotos vom Gefühl (Wortmarke, Ankunftssatz) über die Orte (Wasser, Essen, Abende) und das Wohnen zur Saison und zur Anfrage. Ansprache im Sie. Lebt von guten, echten Fotos: Mit schwachen Bildern fällt sie flach. Abgegrenzt von t34 und t35 (Restaurantseiten): hier ein Haus mit Übernachtung und Saison, Verfügbarkeitssuche im Held. Beispielmarke: Gut mit Ferienhäusern an der Ostsee.

## Sektionsfolge
Kopf (nur Text, Telefon, Knopf; wird beim Scrollen zur festen Fläche); Held (Foto im Anschnitt, kleine Aussage, Verfügbarkeitssuche, Telefon, Wortmarke riesig und unten angeschnitten); Einstieg (Ankunftssatz auf Creme mit welliger Oberkante, Fotostreifen mit rissigen Kanten und Pfeilen); Bildstapel (drei Vollbilder mit Überschrift auf dem Foto, schieben sich übereinander); Wohnen (Farbband in Ostseedunst, drei Haustypen, Streifen mit Bildpaaren); Saison (großer Satz, drei hohe Papierkarten mit Datum über Fotos); Stimmen (gekippte Papierkarte über Foto, drei Beispielstimmen); Familien (vier Fotoabzüge, leicht gedreht); Fragen (sechs Einwände); Anfrage (fünf Felder); Fuß (Navigation in Großschrift, Anschrift, Wortmarke über die ganze Breite); Leiste unten (erscheint nach dem Held).

## Was an der Referenz gemessen wurde (beobachtet) und was nicht
Beobachtet (1440 und 390): Seitenhöhe 10232 und 8154 Pixel; feste Kopfleiste 85 und 53 Pixel hoch, ohne Hintergrund über dem Foto, Navigation nur Text; Wortmarke als SVG, 1344 mal 262 Pixel im Held und 1344 mal 189 im Fuß, in Großschrift, angeschnitten; vier gestapelte Bildbänder (Sticky, 740 und 590 Pixel hoch, mit Polygon `clip-path` als Oberkante, dazu sechs SVG Wellenkanten, 1200 mal 21 Viewbox); feste Leiste unten (93 und 91 Pixel hoch), startet unterhalb des Bildschirms und erscheint beim Scrollen; Überschriften der Bildbänder kursiv in Serifenschrift, 48 Pixel (33 mobil), Kicker in Großbuchstaben 16 Pixel; Seitengründe Creme (249, 245, 235), Hellblau (197, 221, 247) und Sand (242, 230, 216); Knöpfe 50 Pixel hoch mit schräg abgeschnittener Kante (`clip-path`); Cookie Dialog über dem Held. Die berechneten Transformationen der Bilder ergaben keine Drehung: Das Bild "Abzug" der Referenz entsteht durch Polygonkanten, nicht durch Rotation (abgeleitet aus Messung ohne Treffer, nicht aus dem Code geprüft).
Nicht erfassbar (unbekannt): Hover, Zeitverläufe, Verhalten bei Zwischenbreiten, das Video im Held (die Aufnahme zeigt Standbilder, es lief ein Film), Verhalten der Pfeile an den Bildleisten, Inhalt hinter dem Cookie Dialog.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Kopf | Bei Scroll wechselt der Kopf von durchsichtig mit Schleier zur festen Nachtfläche | `bewegung.js` setzt Klasse `gescrollt`, CSS (`opacity` auf Pseudoelementen) |
| Held | Foto wandert leicht langsamer als die Seite; Wortmarke steigt einmal beim Laden aus dem unteren Rand auf | `data-parallax` (`bewegung.js`), CSS Animation `aufsteigen` (`transform`, `opacity`, 1,3 s einmalig, bewusst lang: große, nicht bediente Fläche) |
| Einstieg, Wohnen, Saison | Streifen seitlich scrollbar mit Einrasten, Pfeile blättern um eine Kartenbreite | `stil.js`, `scroll-snap`, Tastatur und Wischen ohne Pfeile |
| Bildstapel | Signatur 1: Drei Vollbilder bleiben oben haften und schieben sich übereinander, Überschrift steht auf dem Foto | reines CSS (`position: sticky`), kein Skript |
| Saison | Papierkarten haben Grundneigung und richten sich bei Hover oder Fokus auf | CSS `transform` |
| Stimmen | Eine Stimme je Blick, Pfeile schalten durch, Karte ist gekippt | `stil.js`, `aria-live` |
| Familien | Signatur 2: Abzüge mit Drehung, richten sich bei Hover auf | CSS `transform`, `data-zeig` |
| Leiste | Gleitet nach dem Held von unten ein und weicht bei Anfrage und Fuß | `stil.js` (IntersectionObserver), CSS (`transform`) |
| Text | Einblenden der Überschriften und Absätze | `data-zeig`, `data-staffel` |

Bei reduzierter Bewegung fließen die Bildblätter normal (kein Sticky), nichts läuft, alles ist sichtbar. Ohne JavaScript stehen alle Stimmen untereinander, Pfeile und die Leiste unten bleiben verborgen, Streifen scrollen von Hand, das Menü ist offen. Pinnende Bühne: Der Bildstapel hält drei Blätter zu je 100 svh (92 svh mobil), es werden nur statische Bilder gestapelt und keine Eigenschaft animiert. Leistung auf schwachen Geräten ungemessen. Die welligen Kanten (`clip-path` mit Polygon) liegen nur auf Dekoration und nie über Text oder Bedienelementen, bei Zoom bleiben sie prozentual.

## Tokens (marke.css)
`--flaeche` (Salzcreme), `--flaeche-alt` (Sand), `--flaeche-blau` (Ostseedunst), `--flaeche-dunkel` (Nachtwasser), `--text`, `--text-leise`, `--linie`, `--akzent` (Tiefblau), `--akzent-text`, `--schrift-titel` (Newsreader, aufrecht), `--schrift-text` (Hanken Grotesk), `--schrift-marke` (Archivo, Wortmarke), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`, `--papier`, `--salz` (Schrift auf Fotos), `--schleier`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schatten-papier`, `--drehung`, `--kante` (wellige Oberkante), `--riss-1` bis `--riss-3` (rissige Bildkanten).

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet, WCAG): `--text` auf `--flaeche` 13,2 zu 1, auf Sand 11,6, auf Dunst 11,3, auf Papier 14,4; `--text-leise` auf `--flaeche` 6,4, auf Sand 5,6, auf Dunst 5,5, auf Papier 7,0; `--akzent-text` auf `--akzent` 8,5; `--akzent` als Linkfarbe auf `--flaeche` 8,5 und auf Dunst 7,3; `--text-auf-dunkel` auf `--flaeche-dunkel` 14,6; `--text-leise-dunkel` auf `--flaeche-dunkel` 8,1. Rand der Eingabefelder 4,3 zu 1 auf Papier (Bedienelement, Mindestwert 3 zu 1). Schrift auf Fotos (`--salz`), gemessen mit Playwright am Pixelbild hinter dem Text (95. Perzentil der Hintergrundhelligkeit, Bildschirm 1440 und 390): Überschrift im Held 3,5 und 4,4 (große Schrift, Mindestwert 3 zu 1), Held Unterzeile 7,0 und 8,0, Kopfnavigation 5,2, Überschriften der Bildblätter 5,6 bis 10,9 (groß), Absätze der Bildblätter 7,4 bis 13,4. Mit anderen Fotos neu messen: Die Schleier stehen in `stil.css` an `.hero::after`, `.blatt::after` und `.kopf::after`. Der Name "Markenname" steht in Titel, Logo, Wortmarke (SVG Text, zweimal), Fuß und JSON LD. Die Wortmarke ist `textLength` auf die Breite gezogen: Für einen längeren Namen die Schriftgröße im SVG (`font-size:170px` in `.wort text`) verkleinern.

## Offen
Formulare senden nichts (Suche im Held und Anfrage), Datum und Gäste der Suche werden nicht geprüft. Preise, Termine, Haustypen, Stimmen, Fragen samt Antworten, Mindestaufenthalt, Stornofristen und Anschrift sind Beispiele, keine Belege. Storno, Preisangaben und Kurtaxe sind rechtlich nicht geprüft. Die dreizehn Fotos sind Beispielfotos anderer Orte (Nachweis in `BILDER.md`), keine Fotos eines Gutes; die Küstenbucht zeigt Klippen, nicht die Ostsee. Kein Video im Held (die Referenz hat eines): hier ein Standbild; ein Video braucht Poster, `prefers-reduced-motion` Standbild und Pausenknopf. Kein Cookie Hinweis: Er wäre ohne echte Einwilligungsverwaltung irreführend, deshalb baut der Bauablauf das Consent Gerüst erst mit den Diensten, die es braucht. Die Referenz hat kursive Serifenzeilen als Effekt, hier bewusst aufrecht (Kapitel 26). Die Streifen mit Pfeilen sind scrollbare Bereiche mit Tabulator Fokus, nicht auf Screenreader geprüft. Datumsfelder zeigen die Sprache des Browsers. Die Neigung der Abzüge ist Rotation, die der Referenz ist (abgeleitet) Polygonform. Safari, Screenreader und echte Geräte nicht geprüft. Die Referenz zeigt viele Menschen im Wasser und am Tisch, die Beispielfotos hier fast keine: Der menschliche Anteil fehlt in dieser Vorlage.

## Conversion (Playbook)
- Held: Familien und Paare, Problem überfüllte Urlaubsorte und volle Programme, Lösung Ferienhäuser mit Gutsküche am eigenen Strandabschnitt, Verfügbarkeit direkt im Held prüfbar
- H1 "Ferienhäuser und Gutsküche an der Ostsee, für Sommer ohne Fahrplan", Unterzeile nennt Zielgruppe und Saison
- Primär CTA "Verfügbarkeit prüfen" in Kopf, Held, Einstieg, Bildstapel, Wohnen, Familien, Fuß und Leiste unten
- Titel mit Leistung und Ort, Beschreibung mit Zielgruppe, Saison und Handlung
- FAQ: Preis, Mindestaufenthalt, Hunde, Anreise ohne Auto, Storno, Barrierefreiheit
- Formularziel: Anfrage mit Wunschzeitraum (Name, E-Mail, Telefon, Zeitraum, Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon
- Telefon im Kopf (ab 80 rem), im Held, in der Leiste, in Anfrage und Fuß; Stimmen, Termine und Preise als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Nur Text in der Navigation und ein heller Knopf lassen das Foto atmen, der Kopf wird erst beim Scrollen fest |
| held | hero | Foto, kleine Aussage und ein angeschnittenes Wort in Plakatgröße machen den Ort zur Marke, die Suche steht schon im ersten Bild |
| einstieg | editorial | Ein langer ruhiger Satz erklärt den Ort, der Streifen mit rissigen Bildkanten lädt zum Weiterschauen ein |
| bildstapel | features | Vollflächige Fotos schieben sich übereinander und tragen ihre Beschreibung selbst |
| wohnen | product | Ein einziges Farbband hebt das wichtigste Angebot hervor, Bildpaare zeigen Raum und Detail |
| saison | services | Hohe Papierkarten mit Datum über dem Foto machen Termine greifbar |
| stimmen | testimonials | Eine gekippte Papierkarte über dem Foto wirkt wie eine hingelegte Postkarte |
| abzuege | portfolio | Weiße Rahmen und leichte Drehung geben dem Raster die Wärme des Urlaubsalbums |
| fragen | faq | Einwände vor der Buchung stehen offen und klappen ohne Skript auf |
| anfrage | forms | Fünf Felder mit Hinweisen senken die Hürde, Kontakt steht daneben |
| fuss | footer | Navigation in Großschrift und die Wortmarke über die ganze Breite geben dem Ende Gewicht |
| leiste | cta | Schmale feste Leiste hält den Weg zur Anfrage offen und weicht vor Eingaben |
