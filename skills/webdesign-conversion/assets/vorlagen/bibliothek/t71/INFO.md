# t71 Koch App dunkel

Prinzip nach einem Pinterest Screenshot des Inhabers (Startseite einer Koch App mit Videorezepten, ganze Seite dunkel, Adresse nicht bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Die Auszeichnung ist ein neutrales Beispielband, keine Auszeichnung der Referenz.

## Eignung
Rezept Apps, Kochschulen, Lieferboxen und Feinkostmarken mit Videoinhalten, die den Download oder ein Abo verkaufen. Lebt von großen, dunklen oder warmen Speisefotos und echten Porträts. Ansprache im Du, für Sie im Text ersetzen. Für Marken mit wenig Bildmaterial ungeeignet, weil jede Karte ein Foto trägt.

## Sektionsfolge
Kopfleiste (Logo, fünf Punkte, Knopf), Vollbildheld mit Foto, Text unten links und Telefonoberfläche (aus HTML und CSS), weiße Karte mit Schleifenvideo und Pause, Rezeptkarte mit acht Hochformatkacheln, Foto mit Auszeichnungsband (Beispiel), weiße Karte mit Reihe aus Porträts, Vollbild mit Text über Foto, Angebotskarte mit Preis (Beispiel), Zeitgeber als Ring neben Foto, Filter Chips neben Foto mit Rezeptvorschlägen, Reihe mit Kursfotos über beide Ränder, Karte mit mehreren Rezepten gleichzeitig, Einwand Fragen, Fuß mit Download, Kundenservice, Mailanmeldung und Links.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Telefon steigt beim Scrollen leicht gegen den Text | `data-parallax` mit negativem Wert |
| Schleifenvideo | Poster driftet langsam, Balken zeigt die Schleife, Knopf hält an und startet (WCAG 2.2.2), bei reduzierter Bewegung nur Poster ohne Knopf | CSS (`transform`), `stil.js` (`data-schleife`) |
| Rezeptkacheln | fahren gestaffelt hoch, heben sich beim Überfahren, Foto zoomt leicht | `data-zeig` mit `data-staffel`, CSS (`transform`) |
| Auszeichnung | Foto driftet hinter dem Text | `data-parallax` |
| Köche und Kurse | Reihen laufen über den Rand, driften beim Scrollen seitlich (gegenläufig), jederzeit wischbar, nach der ersten Bedienung ruhig | `stil.js` (`data-drift`, `scrollLeft`) |
| Vollbild | Wörter der Überschrift hellen beim Scrollen auf | `data-licht` |
| Zeitgeber | Ring füllt sich beim Einblenden, Endzustand steht im HTML | `data-zeig`, CSS (`stroke-dashoffset`) |
| Filter | Chips schalten an und aus, Vorschläge filtern mit (alle Chips gelten zusammen) | `stil.js` (`data-chips`) |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü, Kopf wird deckend | `bewegung.js` |

Animiert werden nur `transform`, `opacity` und beim Ring `stroke-dashoffset`, Bedienelemente unter 300 ms, kein `transition: all`. Bei reduzierter Bewegung und ohne JavaScript steht alles sichtbar: Poster statt Bewegung, volle Liste statt Chips, Ring im Endzustand, Reihen zum Wischen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt` (dunkle Karten), `--text`, `--text-leise`, `--linie`, `--akzent` (Safran, Fläche mit dunklem Text, auf Dunkel auch Text), `--akzent-text`, `--karte-hell` (weiße Karten) mit `--text-auf-karte`, `--text-leise-auf-karte`, `--akzent-auf-karte` (Text und Fokus auf Hell), `--feld-rand`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-3` für Bildplatzhalter. Gemessene Kontraste der Hauptpaare: Text auf Fläche 17,1, leise auf Fläche 9,2, leise auf Karte 8,4, Akzenttext auf Akzent 9,9, Text auf heller Karte 16,7, leise auf heller Karte 6,8, Akzent auf heller Karte 5,7, Feldrand 4,7 (alle zu 1).

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche-alt`, `--akzent-auf-karte` auf `--karte-hell`, `--feld-rand` auf `--flaeche-alt`. Der Name "Markenname" steht an mehreren Stellen. Das echte Schleifenvideo ersetzt das Bild im Rahmen (Kommentar im HTML), `stil.js` schaltet es mit dem Knopf. Das Telefon ist HTML und CSS, ein Screenshot der App ersetzt `.telefon__schirm`.

## Offen
Formulare senden nichts, Store Knöpfe sind neutrale Platzhalter (offizielle Badges der Anbieter nach deren Richtlinien einsetzen). Rezepte, Zahlen, Bewertung, Preise, Köche, Auszeichnung, Abo Bedingungen und Antworten sind Beispiele, keine Belege; Allergenkennzeichnung, Preisangaben (Preisangabenverordnung, auch der durchgestrichene Preis) und Abo Informationen (Kündigung, Laufzeit) sind je Betrieb zu ergänzen. Der Satz zum Anteil der Köche am Abo ist ein Beispieltext und nur mit Beleg zu behalten. Personen sind Beispielfotos, keine echten Köche. Das Wortlicht im Vollbild hat im Zwischenzustand geringen Kontrast (Endzustand voll). Das Schleifenvideo ist ein Platzhalter mit Poster, nie mit echtem Video erprobt. Text über Fotos liegt auf Verläufen, Kontrast dort nicht flächendeckend nachgemessen. Die Kopfleiste ist ab Scrollen deckend, ohne JavaScript scrollt sie mit. Fußlinks sind Platzhalter.

## Conversion (Playbook)
- Held: Hobbyköche und Einsteiger, die an Rezepten im Fließtext scheitern, Lösung Videorezepte mit Schritt in Schleife
- H1 "Koch mit Profis, Schritt für Schritt im Video", Unterzeile nennt die Schleife und das Raten bei den Zwiebeln
- Primär-CTA "App kostenlos holen" in Kopf, Held, nach den Rezepten, im Angebot, bei mehreren Rezepten und im Fuß, dazu zwei neutrale Store Knöpfe
- Titel 52 und Beschreibung 142 Zeichen, JSON-LD MobileApplication mit Beispielwerten, keine erfundene Bewertung im Markup
- FAQ: Kosten, Abo und Kündigung, Offline, Ernährungsformen, Familienkonto (Antworten als Beispiel)
- Formular: Mailanmeldung mit zwei Feldern (Vorname freiwillig, E-Mail), Feldhinweis unter E-Mail, Bestätigungshinweis, Platzhalter für Turnstile
- Kundenservice per Telefonlink im Fuß
