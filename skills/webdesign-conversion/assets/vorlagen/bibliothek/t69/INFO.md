# t69 Sportclub hell mit Zählwerk

Prinzip nach einer Pinterest Webdesign Vorlage eines hellen Tennisclubs (Pinterest Screenshot des Inhabers, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Tennis-, Padel- und Fitnessclubs, Sportvereine und Freizeitanlagen in Deutschland, die Probetraining und Mitgliedschaft verkaufen. Lebt von Zahlen, Karten und Stimmen als Vertrauen und von Fotos der eigenen Anlage. Ansprache im Du, für Sie im Text ersetzen. Die Beispielfotos zeigen Laufen und Training, es gibt in der Bibliothek kein Tennis oder Padelfoto.

## Sektionsfolge
Weiße Kopfleiste mit Menü und Knopf, Held (Foto in großer Karte, Überschrift, Knopf, Telefon, Bewertung als Beispiel), Über uns (Kicker links, Leitsatz rechts, drei Karten: dunkle Info Karte mit Schalter, Fotokarte, Zahlenkarte mit Balken), Kennzahlenzeile, Angebote (Text und zwei Fotokarten), Mitgliedschaft (blaue Hauptkarte, zwei aufklappbare Zeilenkarten, Platzzeichnung), Stimmen (Wechsler mit Pfeilen und Zähler), Fragen (Foto und Akkordeon), Probetraining (Formular auf Foto), dunkler Fuß mit großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto driftet beim Scrollen gegen die Scrollrichtung (Bild überragt die Karte, kein Spalt) | `data-parallax`, `transform` |
| Über uns | Leitsatz hellt Wort für Wort auf | `data-licht` |
| Karten | blenden ein und staffeln | `data-zeig`, `data-staffel` |
| Zahlen | zählen hoch, der Endwert steht im HTML | `data-zaehle` |
| Balken | füllen sich beim Einblenden der Karte (`scaleX`) | CSS über `.ist-da`, Wert in `--w` |
| Info Karte | Schalter Hallenmodus ändert die Statuszeile | `stil.js` |
| Mitgliedskarte | hebt sich beim Scrollen und bekommt Schatten | `stil.js` (`--hub`), CSS (`transform`, `opacity`) |
| Stimmen | Wechsel mit Pfeilen, Pfeiltasten und Zähler, Überblendung und leichtes Gleiten | `stil.js`, CSS |
| Fragen, Pläne | Akkordeon, Plus dreht sich, Antwort blendet ein | `details`, `data-exklusiv`, CSS |
| Fuß | Wortmarke fährt von unten ein | `data-zeig` am Rahmen, CSS (`transform`) |
| Abschnitte | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Nur `transform` und `opacity` werden animiert. Bei reduzierter Bewegung und ohne JavaScript stehen alle Zahlen, Balken, Stimmen (untereinander) und die Wortmarke fertig da. Ohne JavaScript fehlen Pfeile und Schalter, nichts wird verdeckt.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Marine), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Blau, Fläche mit hellem Text, auf Hell auch Text und Linie), `--akzent-text`, `--akzent-himmel` (nur Zeichen und Flächen), `--weiss`, `--feld-rand`, `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent` auf `--flaeche` und `--flaeche-alt`, `--text-leise` auf allen Flächen. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Fuß, JSON-LD); die große Wortmarke ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem` bei `.fuss__marke`), ein anderer Name braucht einen neuen Wert. Platzhalter (`.bild[data-platzhalter]`) und Beispielfotos durch eigene ersetzen. Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formular sendet nichts (Turnstile Platzhalter im Kommentar vor dem Formular). Zahlen, Preise, Bewertungen, Stimmen, Namen und Öffnungszeiten sind Beispiele, keine Belege. Der Text über den Foto im Held und im Probetraining liegt auf einer Marineschicht (Held 62 bis 78 Prozent, Probetraining 82 Prozent), Kontrast über dem Foto ist nicht gemessen. Abweichung von der Referenz: Die Mailanmeldung auf dem Foto ist hier das Probetraining Formular, ein Newsletter fehlt. Die Kopfleiste verdeckt Anker nur dank `scroll-margin-top` auf `section[id]`. Drei Fußlinks (Folgen, Rechtstexte) sind Platzhalter, Rechtstexte fehlen. Die Zeile Stimmen 3 trägt einen Platzhalter statt Foto.

## Conversion (Playbook)
- Held: Berufstätige und Familien in Musterstadt, die Sport immer wieder verschieben; Problem fehlender fester Termin und Einstiegshürde; Lösung feste Zeiten, Trainer, Probetraining vorab
- H1 "Endlich dranbleiben: Training mit festen Terminen und Trainern, die dich kennen", Unterzeile nennt Tennis, Padel, Fitness und den Ablauf
- Primär-CTA "Probetraining buchen" in Kopf (kurz "Probetraining" auf dem Handy), Held, Angebote, Hauptkarte, Formular und Fuß
- Titel mit Sportarten und Musterstadt, Beschreibung mit Nutzen und Aufruf
- FAQ (fünf Einwände): Können, Ausrüstung, Kosten, Pausieren, Kinder und Senioren; Antworten als Beispiel gekennzeichnet
- Formularziel: Probetraining (Name, E-Mail, Telefon, Sportart, Nachricht), fünf Felder, Hinweise unter E-Mail und Telefon
- Bewertung im Held und Zahlen als Beispiel gekennzeichnet, JSON-LD `SportsActivityLocation` mit Beispielwerten
