# t95 Gadget Szenen mit Blasen

Prinzip nach einer Pinterest Referenz (Produktseite für ein tragbares KI Gerät, Screenshot des Inhabers, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Das Gerät, das Tablet und alle Blasen sind aus HTML, CSS und SVG gebaut.

## Eignung
Hardware Produkte kurz vor dem Start, die per Vorbestellung Interesse sammeln: tragbare Assistenz, Smart Gadgets, Wearables, Kameras, Sprachgeräte für Verbraucher. Lebt von Alltagsfotos mit Menschen und von kurzen Beispielsätzen in Sprechblasen. Ansprache im Du. Hauptaktion ist Vorbestellen ohne Zahlung, ein Shop ist nicht enthalten. Für Software ohne Gerät taugt die Folge ebenso, die Gerätezeichnung wird dann durch Oberflächen ersetzt.

## Sektionsfolge
Schwebende Kopfleiste, Held (Vollbildfoto mit Verlauf, Überschrift, zwei Knöpfe, Blase), sechs Funktionsszenen (Sofort wissen, Hilfe, Sprachen, In Kontakt bleiben, Momente festhalten, Unterwegs), je mit Zeichen, Überschrift, Foto in Karte und Blasen darüber; nach der Sprachenszene eine braune Fläche mit Sprachenliste; nach den Momenten ein dunkelgrüner Abschnitt mit Foto Collage; Produktschau mit Gerät und drei Karten; Sternenhimmel "Ein Betriebssystem, das sich dir anpasst"; Stimmen in drei Spalten mit Siegel Platzhalter; Tablet "Dein eigener digitaler Raum"; Technische Daten mit Gerät auf Platzhalterfläche, sechs Datenkarten und Aufnahmehinweis; Vorbestellung (Formular); Fragen; Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Szenen | Foto wächst beim Scrollen von etwa 60 Prozent Breite auf volle Breite, die Szene bleibt dabei stehen (ab 768 px) | `data-fortschritt`, CSS (`transform`, `position: sticky`) |
| Blasen | Chips, Frage und Antwort blenden nacheinander ein und bleiben stehen | CSS aus `--fortschritt` (`opacity`, `transform`), Endzustand ohne Animation im HTML |
| Chips | schalten durch (Beispiel wechselt), Selbstlauf alle 4,5 s, endet bei Klick, Fokus oder Pause | `stil.js` |
| Sprachenliste | ein Licht wandert durch die Liste, Überfahren setzt es dorthin | `stil.js`, CSS (`opacity`, `transform`) |
| Collage | Fotos driften leicht gegeneinander | `data-parallax` |
| Gerät | dreht leicht beim Scrollen (etwa minus 16 bis plus 16 Grad) | `stil.js` setzt `--dreh`, CSS `transform` |
| Sternenhimmel | zwei Sternschichten funkeln langsam gegeneinander | CSS `opacity`, 7 s und 11 s |
| Stimmen | äußere Spalten laufen gegenläufig und langsam (ab 992 px) | CSS `transform` |
| Tablet | schwebt leicht, Widgets staffeln ein | `data-parallax`, `data-zeig` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Alles Selbstlaufende | ein Knopf "Bewegung anhalten" (WCAG 2.2.2) stoppt Chips, Sprachenliste, Funkeln und Spalten | `stil.js`, Klasse `pausiert` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy stehen die Szenen als ruhige Karte mit Blasen im Bild (mobil) oder untereinander (ohne JavaScript, dort alle drei Beispiele), die Spalten sind ungeklemmt, der Himmel steht still. Alles bleibt sichtbar und bedienbar. Der Pause Knopf erscheint nur dort, wo sich etwas bewegt.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Orange, Fläche mit dunklem Text, nie Textfarbe auf Hell), `--akzent-text`, `--szene-orange`, `--szene-rosa`, `--szene-ocker`, `--szene-koralle`, `--szene-lime` (je Szene ein warmer Ton für Blasen, Chips und Zeichen, dunkler Text darauf), `--tint-*` (sehr helle Szenenflächen), `--braun`, `--gruen`, `--nacht` (dunkle Flächen), `--geraet-1`, `--geraet-2`, `--geraet-licht` (Gerät), `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--text` auf allen `--szene-*` (gemessen 6,3 bis 13,3 zu 1), `--text-leise` auf `--tint-*` (6,5 bis 7,0 zu 1), `--text-leise-dunkel` auf `--braun`, `--gruen`, `--nacht`. Der Name "Markenname" steht im Titel, Logo, Texten und Fuß. Das Gerät ist eine eigene Zeichnung (`.geraet`, Maße in `em` über `--g`), ein anderes Produkt braucht eine andere Form oder ein freigestelltes Foto an derselben Stelle.

## Offen
Formulare senden nichts. Alle Texte, Beispielantworten in den Blasen, Stimmen, Namen, technischen Werte (Gewicht, Maße, Kamera, Akku), Sprachenliste, Liefertermin und Preis sind Beispiele und mit "Beispiel" gekennzeichnet, keine Belege und keine Aussagen zu Genauigkeit, Akkulaufzeit oder Sprachenzahl. Je Kunde zu ergänzen und **rechtlich nicht geprüft**: DSGVO bei Kamera und Mikrofon (Rechtsgrundlage, Verarbeitung von Sprache und Bildern Dritter, Datenschutzerklärung, Auftragsverarbeitung), Aufnahmehinweise (Hinweis an Gesprächspartner, Kennzeichnung aktiver Aufnahme, § 201 StGB Vertraulichkeit des Wortes), CE Kennzeichnung und Funkanlagenrichtlinie, Batterie und Elektrogesetz, Vorbestellung (Preisangaben, Widerruf, Lieferzeit, Button Lösung erst beim späteren Kauf), Claims in Werbung (UWG). Das Siegel ist ein Platzhalter, keine Auszeichnung ist behauptet. Fotos sind Beispielfotos (siehe `BILDER.md`), Personen zeigen keine echten Nutzer. Das Feld "Foto: Gerät in der Hand" braucht ein Produktfoto. Der Foto Zuschnitt der Szenen ist auf Beispielbilder abgestimmt (`--pos` je Szene), bei eigenen Fotos nachziehen. Kontrast von Text auf dem Heldfoto nur über den Verlauf gesichert, bei hellem Foto nachmessen. Gerät und Blasen nicht auf echten Geräten, Safari und mit Screenreader geprüft.

## Conversion (Playbook)
- Held: Menschen, die unterwegs ständig aufs Handy schauen, Problem Blick nach unten und verpasste Momente, Lösung Clip am Kragen mit Hilfe per Sprache
- H1 "Schau auf die Welt, nicht aufs Display", Unterzeile nennt Nutzen und "unverbindlich vorbestellen, ohne Zahlung"
- Primär-CTA "Vorbestellen" in Kopf, Held, Produktschau und Formular, gleiches Verb
- Titel "Markenname Clip vorbestellen | Hilfe per Sprache" (48 Zeichen), Beschreibung 138 Zeichen mit Problem, Nutzen und Aufruf
- FAQ: Zahlung, Lieferung, Aufnahme, Handy, Daten (fünf Einwände, Antworten als Beispiel)
- Formularziel: Vorbestellung (Vorname, Farbe, E-Mail, Telefon freiwillig), vier Felder, Feldhinweise unter E-Mail und Telefon, Turnstile Platzhalter, Hinweis ohne Zahlung
- Telefon als `tel:` im Menü (mobil), in der Vorbestellung und im Fuß
- JSON-LD Product mit Beispielwerten und Verfügbarkeit Vorbestellung
