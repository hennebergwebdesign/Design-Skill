# t65 Kanzlei Serifenwärme

Prinzip nach der freigegebenen Referenz lorenza-wbs.webflow.io (Webflow Template, vom Inhaber zur Erfassung freigegeben), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kanzleien, Steuer und Unternehmensberatung, Notariate, Mediation, Coaching mit Vertrauensthema und andere Beratung, bei der Haltung und Klartext verkaufen. Hell, ruhig, mit großer Serife und warmen Sandflächen. Ansprache im Du, für Sie im Text ersetzen. Die Beispieltexte machen keine Erfolgsversprechen; bei Rechtsberatung gelten für Werbung die Berufsregeln, vor dem Einsatz mit der Kanzlei klären. Ohne gute Bilder (Porträts, Räume) verliert die Seite viel, die Bildflächen laufen nach unten in die Flächenfarbe aus.

## Sektionsfolge
Schwebende weiße Kopfleiste (Menü, Hauptknopf, mobil Telefon und Menüknopf), Held als Karte mit Textband, Bild mit Auslauf und Überschrift über dem Auslauf, Leistungen (weiße Karte ragt in den Held, drei Bildkarten), Schwerpunkte (Kreis mit zwei gegenläufigen Schilderreihen), Haltung (großes Wort hinter einem Porträt, Aussage, drei Kennzahlen), Stimmen (Rahmen mit weißer Karte, wischbare Stimmen, Beispiellogos), Über uns (festgehaltenes Bild, drei Aussagen wechseln beim Scrollen), Aufruf (breites Bild mit Auslauf, Leiste mit Knopf), Team (Überschrift und Namensband, zwei Porträtkarten), Ablauf (vier Ziffern auf Sand), Kontakt (Bild mit Telefon und Mail, Formularkarte im Rahmen), Fragen (Akkordeon), Fuß dunkel mit großem Satz.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Textband läuft, Überschrift und Zeile blenden ein | `.band`, `data-zeig` |
| Schwerpunkte | zwei Schilderreihen laufen gegenläufig hinter dem Kreis | `.band`, `animation-direction:reverse`, nur `transform` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| Stimmen | Spur mit Scroll Snap und Punkten, Logoband läuft | `stil.js`, `.band`, ohne JavaScript wischbar |
| Über uns | Abschnitt bleibt stehen, drei Aussagen und Strichanzeige wechseln mit dem Scrollweg (nur ab 960 px) | `stil.js`, `opacity` und `transform` |
| Aufruf | Bild läuft leicht gegen die Scrollrichtung | `data-parallax` |
| Team | Namensband läuft, Karten staffeln ein | `.band`, `data-staffel` |
| Fragen | Akkordeon, nur eine Antwort offen, Pfeil dreht | `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar: Bänder werden zu umbrechenden Folgen ohne Dopplung, die Schwerpunkte stehen unter dem Kreis, die drei Aussagen stehen als Liste untereinander. Ohne JavaScript scrollt die Kopfleiste mit.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt` (Sand für Held, Rahmen, Ablauf, Kontakt), `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Gold, Fläche mit dunklem Text, auf Dunkel auch Text), `--akzent-text`, `--akzent-tief` (Akzent als Text, Ziffern und Linie auf Hell), `--schrift-titel` (Newsreader), `--schrift-text` (Hanken Grotesk), `--titel-gewicht`, Radien (`--radius-gross` für Rahmen), `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-tief` auf `--flaeche` und `--flaeche-alt` (5,9 und 5,2 zu 1), `--akzent-text` auf `--akzent` (8,2 zu 1), `--text-leise` auf `--flaeche-alt` (5,7 zu 1), `--text-leise-dunkel` auf `--flaeche-dunkel` und `--flaeche-dunkel-2`. Name und Zeichen im Logo (Symbol `#zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Auszeichnung, Bewertung, Kennzahlen, Namen, Stimmen, Logos, Telefon und Adresse sind Beispiele, keine Belege. Der Auslauf der Bilder (Maske nach unten) ist auf die Platzhalter abgestimmt: Überschrift und Namen über echten Fotos auf Kontrast prüfen. Der festgehaltene Abschnitt ist nur im Desktopbrowser gesehen, das Umschalten beim Ändern der Fenstergröße ist im Skript vorgesehen, aber nicht auf echten Geräten geprüft. Zwei Links im Fuß (Impressum, Datenschutz) sind Platzhalter. Nur die Startseite ist gebaut, die Unterseiten der Referenz (Leistungen, Über uns, Fälle, Team, Kontakt) nicht.
