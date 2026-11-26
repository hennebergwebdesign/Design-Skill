# t91 Innenarchitektur dunkel und gold

Prinzip nach dem Pinterest Screenshot des Inhabers (Innenarchitekturbüro in Grau, Schwarz und Gold, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Das 3D Modell des Ablaufs ist durch eine eigene SVG Isometrie ersetzt.

## Eignung
Innenarchitekturbüros, Küchenplaner, Raumausstatter und Innenausbauer mit Projekten, die sich zeigen lassen, und Erstgespräch als Ziel. Lebt von guten, hellen Raumfotos (Hochformat für den Slider, ein breites für das Panorama). Ansprache im Sie. Für Anbieter ohne eigenes Bildmaterial ungeeignet.

## Sektionsfolge
Dunkle Kopfleiste, Held (dunkles Foto, Überschrift, Bewertungskachel, Pünktchen), vier Leistungskarten, dunkler Abschnitt mit Text, großem Raumfoto und Wasserzeichen Wort, Leistungsliste (Foto wechselt mit der aktiven Zeile, Zeile 1 in Gold), vier Kennzahlen, Ablauf mit Isometrie Grundriss und vier Schritten, Projekt Slider (Hochformat) mit Panoramaband, Stimmen mit Raumfoto und Wertung 4,80 sowie Partnersymbolen, Rundblick zum Verschieben, Team Liste mit Porträt, Vollbild mit wachsendem Ausschnitt, Journal (drei Karten), Galerie mit Wasserzeichen Wort, Fragen, Kontakt (dunkel), Newsletter, dunkler Fuß mit riesigem Wort.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto driftet beim Scrollen leicht gegen die Richtung | `data-parallax` auf dem Bild (Bild ist 20 Prozent höher als der Rahmen) |
| Wasserzeichen Wörter (Raum, Ablauf, Interieur, Galerie) | driften gegen die Scrollrichtung | `data-parallax`, `aria-hidden` |
| Leistungsliste | Foto und Tafel wechseln mit der aktiven Zeile (Klick, Fokus, Maus darüber), ohne JavaScript steht Zeile 1 | `stil.js`, Überblendung per `opacity` |
| Team | Porträt wechselt mit der aktiven Zeile, ohne JavaScript steht Zeile 1 | `stil.js`, `opacity` |
| Kennzahlen, Wertung | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Isometrie | sechs Schichten (Platte, Böden, Wände, Möbel Wohnen, Möbel Räume, Leuchten) bauen sich nacheinander auf, Endzustand im HTML | `stil.js` setzt `data-bereit` und `gebaut`, CSS `opacity` und `transform` |
| Projekt Slider | Pfeile schieben um eine Karte, Wischspur und Pfeiltasten gehen ohne JavaScript | `stil.js`, `scroll-snap` |
| Panoramaband | Foto ist breiter als das Fenster und fährt beim Scrollen seitlich | `stil.js` setzt `--p`, CSS `transform` |
| Stimmen | Wischspur mit Pfeilen | wie der Slider |
| Rundblick | breites Foto, mit der Maus ziehen, per Touch wischen oder Pfeiltasten | `overflow-x`, `stil.js` für das Ziehen |
| Vollbild | Ausschnitt wächst beim Scrollen auf volle Breite, Poster bewegt sich ruhig, Pause Knopf | `data-fortschritt`, CSS `transform`, Pause in `stil.js` |
| Karten | Hebung und Goldkante beim Überfahren (nur mit Maus) | CSS `translate`, `transform` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar: Isometrie und Elemente stehen fertig, das Vollbild ist ein ruhiger Block ohne Pinning, Foto und Tafel bleiben auf Zeile 1 (mit JavaScript wechseln sie auch bei reduzierter Bewegung, das ist eine Bedienung und keine Animation).

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Gold als Fläche mit dunklem Text), `--akzent-text`, `--gold-hell` (Text und Zeichen auf Dunkel), `--gold-tief` (Sterne auf Hell), `--feld-rand`, `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-3` für Bildplatzhalter und `--iso-*` für die Materialfarben des Grundrisses.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` (gemessen 7,45 zu 1), `--text-leise` auf `--flaeche-alt` (6,08), `--gold-hell` auf `--flaeche-dunkel` (10,41). **Gold ist nie Textfarbe auf Hell** (Gold auf `--flaeche` hätte etwa 2,2 zu 1); ein hellerer oder anderer Akzent braucht dunklen Text, ein dunklerer hellen. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Fuß); das große Wort im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem`), ein anderer Name braucht einen neuen Wert für `.fuss__wort`. Die Wasserzeichen Wörter (Raum, Ablauf, Interieur, Galerie) sind Dekor und frei wählbar. Die Isometrie ist eine eigene SVG (sechs `g` Gruppen mit `--s`), neu erzeugt oder von Hand angepasst werden die Möbel.

## Offen
Formulare senden nichts, das Turnstile Widget fehlt. Alle Zahlen (Kennzahlen, Wertung 4,8 und 4,80, Bewertungsanzahl), Namen, Rollen, Stimmen, Projektbezeichnungen, Flächen, Öffnungszeiten und FAQ Antworten sind Beispiele (`data-beispiel`), keine Belege. Die Porträts sind Beispielfotos fremder Personen. Das "360°" Foto ist ein normales Querformat, keine echte 360 Grad Ansicht. Das Vollbild zeigt ein Poster statt eines Videos (Hinweis im Quelltext, ein echtes Video braucht Untertitel oder Transkript, kein Autoplay mit Ton und den Pause Knopf). Kein `og:image`. Honorar, Leistungsphasen und Preisangaben sind je Büro zu ergänzen und rechtlich nicht geprüft (HOAI, Preisangabenverordnung).

## Conversion (Playbook)
- Held: Eigentümer und Bauherren, deren Räume nicht zum Leben passen und deren Planung sich zwischen vielen Handwerkern verliert, Lösung ein Büro für Entwurf, Abstimmung und Ausbau
- H1 "Räume, die zu Ihrem Leben passen, von einem Büro gebaut", Unterzeile nennt Entwurf, Ausbau und einen Ansprechpartner
- Primär-CTA "Erstgespräch buchen" in Kopf, Held, dunklem Abschnitt, Vollbild und Formular; das Gold ist ausschließlich dieser Aktion und kleinen Zeichen vorbehalten
- Titel "Innenarchitektur Musterstadt | Erstgespräch buchen" (50 Zeichen), Beschreibung 132 Zeichen
- FAQ: Erstgespräch, Dauer, eigene Handwerker, nur Planung, Angebot (fünf Fragen, Antworten als Beispiel)
- Formularziel: Erstgespräch (Name, E-Mail, Telefon, Vorhaben, Nachricht), fünf Felder, Feldhinweise unter E-Mail und Telefon
- Wertung im Held als "(Beispiel)" gekennzeichnet, JSON-LD LocalBusiness mit Beispielwerten
