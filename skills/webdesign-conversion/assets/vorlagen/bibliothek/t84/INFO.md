# t84 Agrartechnik hell und dunkel mit Limette

Prinzip nach einem Pinterest Screenshot des Inhabers (Agrartechnik Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Lohnunternehmen, Agrarservice, Landtechnik, Hofläden sowie Garten und Landschaftsbau mit Technik, die Beratung und Einsatztermine verkaufen. Lebt von Feldbildern (Luft, Boden, Maschine). Ansprache im Sie. Limette ist Fläche (Knopf, aktive Zeile) und nur auf Dunkel Text, auf Weiß nie.

## Sektionsfolge
Kopf (Wortmarke, fünf Punkte, Telefon, Primärknopf), Held mit Foto und Überschrift, Intro mit großer Aussage und drei Bildkarten, Vorzugsliste 01 bis 03, Vollbildband, Netzwerk mit zwei Fotos, dunkler Abschnitt (drei Hochformatfotos, große Aussage, versetzte Fotos), Neue Ideen mit zwei Kennzahlen, Fragen, Kontakt mit Formular, Newsletter, Fuß mit riesiger Wortmarke und rundem Knopf nach oben.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto driftet langsamer als die Seite, zoomt in 26 s von 1 auf 1,12 | `data-parallax`, CSS `@keyframes` (`transform`) |
| Bildkarten | Einblenden mit Staffel, Bild vergrößert sich beim Überfahren | `data-zeig`, `data-staffel` |
| Vorzugsliste | aktiver Punkt in Limette wechselt beim Überfahren und beim Fokus, ohne JavaScript steht 03 aktiv | `stil.js`, CSS (`opacity`, `transform` am Hintergrund) |
| Vollbildband | Ausschnitt wächst beim Scrollen von 66 auf 100 Prozent, Text bleibt gleich groß (ab 64rem) | `data-fortschritt`, CSS `scale` mit Gegenskalierung |
| Netzwerk | zwei Fotos driften gegenläufig | `data-parallax` mit Vorzeichen |
| Dunkel | Aussage hellt Wort für Wort auf, drei versetzte Fotos driften gegenläufig | `data-licht`, `data-parallax` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Fuß | Wortmarke fährt von unten ein | `stil.js`, CSS |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar: das Band ist ein ruhiges Bild, Zoom, Drift und Wortlicht entfallen. Die drei Hochformatfotos sind auf dem Handy eine Wischspur.

## Tokens (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Schwarzgrün), `--text`, `--text-leise`, `--akzent` (Limette) mit `--akzent-text`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--ton-1` und `--ton-2` (Platzhalter in Blattgrün und Erde), `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Hanken Grotesk), Radien. Gemessene Kontraste: Text auf Weiß 17,9, Leisetext auf Weiß 7,2, Akzenttext auf Limette 14,2, Text auf Dunkel 16,3, Leisetext auf Dunkel 10,0 zu 1.

## Marke wechseln
Nur `marke.css`. Bei einem hellen Akzent bleibt Akzenttext dunkel; bei einem dunklen Akzent `--akzent-text` auf Weiß setzen und den Fokusring in `stil.css` prüfen.

## Offen
Kennzahlen (300 ha, 24 Stunden), Bewertung 4,9 von 5, Antwortzeit, Namen und Adresse sind Beispiele (`data-beispiel` beziehungsweise "Beispiel" im Text), keine Belege. Keine Ertrags, Spar oder Wirkungsversprechen eingebaut; wer sie ergänzt, belegt sie je Betrieb. Düngerecht und Pflanzenschutz (Sachkunde, Dokumentationspflichten, Auflagen) je Betrieb prüfen, die Antworten in der FAQ sind rechtlich nicht geprüft. Luftbilder und Drohnenfotos fehlen in der Bibliothek, die Beispielfotos sind Boden, Pflanzen, Wiese und Technik im Kleinen. Der Nachweis für das Heldfoto und das Setzlingsfoto fehlt (siehe `BILDER.md`). Das Formular sendet nichts, Turnstile ist nur als Kommentar markiert. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen). Das Vollbildband ist nur auf Desktop gepinnt und nicht auf echten Geräten, Safari oder mit Screenreader geprüft. Der Fokusring ist dunkel auf Hell und Limette auf Dunkel, nicht gemessen über Fotos.

## Conversion (Playbook)
- Held: Landwirte und Betriebsleiter mit Arbeitsspitzen, Lösung Lohnunternehmen mit GPS Technik und festem Einsatzfenster
- H1 "Arbeitsspitzen auf dem Feld? Wir kommen mit Technik und festem Termin.", Unterzeile 17 Wörter
- Primär-CTA "Beratung anfragen" in Kopf, Held, Fuß und Formular; Telefon im Held und im Kontakt
- Titel 52 und Beschreibung 149 Zeichen, mit Musterstadt
- FAQ: Buchungsfrist, Flächengröße, Nachweise, Einzelleistungen, Kosten (Beispielantworten)
- Formular: Name, E-Mail, Telefon, Anliegen (vier Felder), Feldhinweise unter E-Mail und Telefon; Newsletter mit einem Feld
- JSON-LD LocalBusiness mit Beispielwerten
