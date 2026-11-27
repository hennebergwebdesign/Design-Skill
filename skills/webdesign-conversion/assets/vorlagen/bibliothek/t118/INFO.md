# t118 Projektentwickler mit Bewegtbild Held

Prinzip nach https://conwest.com/ (Startseite eines Projektentwicklers, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, scrollend in Schritten von 600 px), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen.

## Eignung
Projektentwickler, Bauunternehmen und Immobilienanbieter mit mehreren Sparten (Gewerbe, Industrie, Wohnen), die ihre Arbeit über Projekte beweisen und Anfragen von Betrieben, Käufern und Grundstückseigentümern wollen. Ansprache im Sie. Lebt von wenigen großen Bildern und einer ruhigen Palette, nicht von vielen Bausteinen. Die Beispielmarke ist ein Entwickler in Musterstadt.

## Sektionsfolge
Schwebende Glasleiste (Menü, Telefon, Knopf "Projekt anfragen"); Held (Vollbild Standbild mit sehr großer, oben angeschnittener Wortmarke, Aussage in drei Zeilen unten links, zwei Knöpfe unten rechts, schrumpft beim Scrollen zur Karte); Haltung (Aussage in Plakatgröße, drei Fotos schieben sich davor, darunter ein Satz mit aufhellenden Wörtern); Team (Salbeiband, hohes Bild links, Satz rechts); Projekte (Filter, sechs Bildkarten mit Tags im Bild, Pfeil unten rechts, Knopf "Alle Projekte"); Großkarte eines Projekts; Fragen (sechs Einwände); Abschlusskarte (Text links, Bild rechts, zwei Knöpfe); Anfrage (Formular, fünf Felder); dunkler Fuß.

## Die Referenz als Gegenbeispiel (SEO und GEO)
Beobachtet: Das statische HTML der Referenz enthält etwa 8 sichtbare Wörter, keine einzige Überschrift (H1 bis H4: keine) und kein Bild; Titel und Description stehen im Kopf, der gesamte Inhalt entsteht erst per JavaScript. Ein Crawler ohne Rendering, ein KI Assistent, der die Seite abruft, und jede Vorschau sehen praktisch eine leere Seite. Diese Vorlage hat alles im statischen HTML: eine H1, saubere H2 und H3, Alt Texte, Fragen als `details`, JSON-LD. Hinweis für den Projektbau: Bewegung darf Inhalt nie erzeugen, nur zeigen.

## Erfasst an der Referenz
Beobachtet (gemessen, 1440 und 390): Held mit stehender Bühne (Sticky, Abschnitt 1638 px bei 900 px Höhe, 1536 px bei 844 px) und Video (mp4, 30 s, Stumm, Schleife, Autoplay), Video mit Skalierung 1,1; Rahmen schrumpft auf 1401 mal 764 px (Rand 20 px, Radius 12 px, Kopfleiste 66 px hoch, schwebend, Glas); Aussage in 92,8 px (mobil 51 px), Gewicht 400, Zeilenabstand 0,94, Zeichenabstand minus 0,06 em, Familie Geist; drei Fotos 449 mal etwa 670 px in drei Spalten mit 18 px Abstand, auch mobil in drei Spalten; Absatz mit Wörtern, die beim Scrollen aufhellen; Teamband in Salbei (#d2dcda) mit Bild links (44 Prozent); Projektraster drei Spalten, 18 px Abstand, Karten 449 mal 384 px, Radius 8 px, Pillen 24 px hoch mit Schrift 11,2 px, Name 35,2 px, runder Pfeil unten rechts; eine breite Karte 1382 mal 702 px; Abschlusskarte weiß, Radius 8 px, Text links, Video rechts; dunkler Fuß (#1f1f1f) liegt als `position: fixed` unter der Seite (Vorhang). Zwischen den Abschnitten gibt es keine Zahlen und keine Sparten Kacheln. Abgeleitet: Das Schrumpfen des Rahmens hängt am Scrollweg; die Wortmarke blendet dabei aus. Unbekannt: Verhalten bei Zwischenbreiten, Hover, Zeitverläufe, Videoinhalt über 30 s hinaus, Text der Unterseiten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Signatur: Die Bühne bleibt stehen (Sticky, 185 svh), der Rahmen schrumpft vom Vollbild zur Karte (Skala 1 auf 0,94, mobil 0,918), das Bild zoomt von 1,08 auf 1, die Wortmarke hebt sich und blendet aus, ein heller Grund erscheint | `--fortschritt` aus `bewegung.js`, CSS (`transform`, `opacity`) |
| Haltung | Drei Fotos laufen mit verschiedener Geschwindigkeit und schieben sich über die Aussage (nur ab 48 rem) | `data-parallax` 0,05 / 0,12 / 0,2, CSS (`transform`) |
| Haltung, Team, Abschluss | Wörter hellen beim Scrollen von leise auf voll auf | `data-licht` |
| Projekte | Karten staffeln ein, Bild zoomt beim Überfahren leicht, Pfeil rückt (nur mit Maus) | `data-staffel`, `data-zeig`, CSS (`transform`, `opacity`, in `@media (hover:hover)`) |
| Projekte | Filter nach Sparte blendet Karten ein und aus | `stil.js`, Attribut `hidden` |
| Fragen | Akkordeon, ein Eintrag offen, Plus dreht zum Kreuz | `details` mit `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript bleibt alles sichtbar und ruhig: Der Held pinnt nicht und steht als Karte im Endzustand (Wortmarke ausgeblendet, die Kopfleiste trägt den Namen), die Fotos überlappen nicht, nichts läuft. Ohne JavaScript steht das Menü auf dem Handy unter der Leiste, die Leiste scrollt mit, der Filter fehlt und alle Karten stehen da.

Performance Budget des pinnenden Helds: Scrollweg 85 svh, ein einziges Bild (126 KB), kein Video, nur `transform` und `opacity`, `will-change` nur am Rahmen. Leistung auf schwachen Geräten ungemessen.

Video statt Standbild (nicht gebaut, im Zweifel Standbild): Nur mit Posterbild (das jetzige Held Foto), `muted loop playsinline preload="none"`, höchstens 2 MB, 1280 mal 720, H.264; erst nach dem ersten Paint nachladen, nicht bei `prefers-reduced-motion` und nicht bei Datensparmodus (`navigator.connection.saveData`); der Text liegt weiter im HTML, nicht im Video.

## Tokens (marke.css)
`--flaeche` (warmes Hellgrau), `--flaeche-alt` (Salbei), `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--signal` (Hinweispille), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--pille-hell`, `--pille-dunkel`, `--pille-text-hell`, `--feld-rand`, `--weiss`, `--bild-schleier` (Verlauf unter Text auf Bildern), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), `--schrift-marke` (Lexend, nur Wortmarke), `--radius-knopf` (Pille), `--radius-karte`, `--radius-bild`, `--titel-gewicht` (400), `--titel-spur`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 14,4 zu 1, auf `--flaeche-alt` 12,9, auf Weiß 16,8; `--text-leise` auf `--flaeche` 6,2, auf `--flaeche-alt` 5,6, auf Weiß 7,3; `--akzent-text` auf `--akzent` 15,2; `--text-auf-dunkel` auf Fuß 16,8; `--text-leise-dunkel` auf Fuß 8,5; Pille hell mit Tinte 12,9, Pille dunkel mit hellem Text 14,4, `--signal` mit Tinte 6,4. Rand der Eingabefelder 4,1 auf Fläche und 4,8 auf Weiß (Bedienelement, Mindestwert 3 zu 1). Weiße Schrift auf Bildern: über dem Verlauf (0,78 Deckkraft unten) mindestens 7 zu 1 im ungünstigsten Fall eines weißen Fotos, gerechnet, nicht an den Pixeln gemessen. Der Name "Markenname" steht in Titel, Logo, Wortmarke, Fuß und JSON-LD. Die Wortmarke ist so dimensioniert, dass "Markenname" (zehn Buchstaben, Lexend 600) die Breite füllt (Teiler 7,4 in `.held__wortmarke`); ein anderer Name braucht einen neuen Teiler (Breite des Textes bei 100 px gemessen, geteilt durch 100).

## Offen
Formulare senden nichts. Zusagen, Antwortzeit, Projekte, Ortsangaben, Status, Texte der Fragen und Antworten sind Beispiele, keine Belege; Fertigstellungstermin und Ausgleich (Frage 6) sind rechtlich nicht geprüft. Alle dreizehn Fotos sind Beispielfotos anderer Themen und Personen (Nachweis in `BILDER.md`); das Heldbild ist hochskaliert. Kein Video. Die Referenz lässt den Fuß als Vorhang unter der Seite stehen (`fixed`), das ist nicht nachgebaut, weil dafür die Fußhöhe gemessen werden müsste. Die Referenz schrumpft den Rahmen in Rand und Radius, hier schrumpft er per Skala (nur `transform`), dadurch bleibt der Rand etwas breiter und die Rundung skaliert mit. Auf dem Handy schrumpft der Held ebenfalls (in der Referenz nur am Anfang erfasst, dort Vollbild). Sparten Filter und Anfrageformular sind Zusatz, die Referenz hat beides nicht. "Offene Stellen" führt ins Leere (`#`). Safari, Screenreader und echte Geräte nicht geprüft; Zwischenbreiten (768 bis 1200) nur auf Überlauf gesichtet, nicht Bild für Bild.

## Conversion (Playbook)
- Held: Betriebe, Eigentümer und Käufer in Musterstadt, Problem Fläche, die nicht passt oder zu spät kommt, Lösung Entwicklung, Bau und Übergabe aus einer Hand mit zugesagtem Termin
- H1 "Fläche, die passt. Termin, der hält. Übergabe ohne Reste." in drei Zeilen, Unterzeile nennt die drei Sparten und den Ort
- Primär-CTA "Projekt anfragen" in Kopf, Held, Fragen, Abschlusskarte, Formular und Fuß; Telefon in Kopf (ab 1248 px, sonst im Menü), Held, Anfrage und Fuß
- Titel mit Leistung und Sparten, Beschreibung mit Ort und Handlung
- FAQ: Dauer, Sonderwünsche, Kosten, Grundstücksankauf, Ansprechpartner, Terminsicherheit
- Formularziel: Anfrage (Name, E-Mail, Telefon, Anliegen, Nachricht), fünf Felder, Hinweise unter E-Mail und Telefon
- Zusagen, Zahlen und Projekte als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Eine abgesetzte Leiste bleibt über jedem Abschnitt erreichbar und trägt Menü, Telefon und Primär CTA. |
| held | hero | Das Bild füllt zuerst alles und tritt beim Scrollen zurück, Aussage und zwei Knöpfe bleiben stehen. |
| aussage | editorial | Eine Zeile in Plakatgröße, vor die sich Menschen auf Fotos schieben, gibt der Marke ein Gesicht. |
| team | team | Ein farbiges Band mit hohem Bild und einem Satz, der beim Lesen aufhellt, setzt einen Atemzug. |
| projekte | portfolio | Große Bildkarten tragen Sparte und Status als Pillen im Bild, der Besucher ordnet ohne Klick ein. |
| projekt-gross | cases | Ein Projekt in voller Breite gibt dem Besten mehr Gewicht und beendet die Liste mit einem Bild. |
| faq | faq | Die Fragen, die vor einer Anfrage bremsen, stehen beantwortet vor dem Formular. |
| abschluss | cta | Eine ruhige weiße Karte mit einem Satz, zwei Wegen und einem Bild schließt die Seite menschlich ab. |
| anfrage | forms | Fünf Felder mit Hinweisen und sichtbarem Telefon senken die Hürde. |
| fuss | footer | Ein dunkler Fuß mit Adresse, Übersicht, Telefon und Wortmarke gibt der hellen Seite einen festen Abschluss. |
