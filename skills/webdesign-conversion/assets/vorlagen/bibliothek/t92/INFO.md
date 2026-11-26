# t92 Zahnarzt Marine

Prinzip nach einem Pinterest Screenshot des Inhabers (Zahnarztpraxis Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Zahnarztpraxen und Kieferorthopädie, die Vertrauen und klare Abläufe zeigen, mehrere Leistungen, ein Team und Prophylaxe Pakete haben und Termine online anbieten. Ansprache im Sie. Lebt von echten Praxis und Teamfotos. Als Vorlage für Heilberufe ist sie bewusst ohne Heil, Erfolgs und Vorher Nachher Aussagen und ohne Superlative gebaut.

## Sektionsfolge
Kopfzeile mit Terminknopf, Held (Foto mit langsamem Zoom unter Marineverlauf, Überschrift, zwei Knöpfe, Telefon, drei Hinweiskarten), grauer Rundkasten mit Text und Knöpfen, Laufband mit Pause, Foto mit Kennzeichen, Leistungen (Foto und Liste), vier Kennzahlen, drei Leistungskarten mit Fotos, Vergleichstabelle in Marine, Diagnostik (dunkle Karte mit Gebissschema, zwei Kacheln), Team mit Namensband, Stimmen als Wischspur, Prophylaxe Pakete mit Umschalter, Fragen, Ratgeber (drei Karten), Termin mit Formular über Foto, Fuß mit Sprechzeiten und Mailanmeldung. Auf dem Handy eine feste Leiste unten (Anrufen, Termin vereinbaren).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto zoomt langsam (26 s, einmal), nur `transform` | CSS `@keyframes zoom` |
| Rundkasten | zwei Zahnscheiben driften leicht gegen die Scrollrichtung | `data-parallax` |
| Laufband | Wörter und Zahnzeichen laufen, Pause Knopf, Pause auch beim Überfahren; ohne JavaScript und bei reduzierter Bewegung ein ruhiger, umbrechender Satz | CSS `@keyframes lauf`, `stil.js` |
| Foto mit Kennzeichen | Bild driftet leicht | `data-parallax` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Leistungskarten | heben sich beim Überfahren, Foto vergrößert sich | CSS (`transform`, nur bei Maus) |
| Vergleichstabelle | Punkte erscheinen Zeile für Zeile (skalieren ein) | CSS mit `--r`, ausgelöst durch `data-zeig` |
| Diagnostik | Scanlinie wandert über das Gebissschema | CSS `@keyframes scan` (nur ohne reduzierte Bewegung) |
| Team | Foto vergrößert sich beim Überfahren, Karten staffeln ein | CSS, `data-staffel` |
| Stimmen | Wischspur mit Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Pakete | Umschalter monatlich oder jährlich, beide Werte im HTML, ohne JavaScript beide sichtbar | `stil.js`, CSS |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Handy | feste Leiste unten mit Sicherheitszone | CSS (`position: fixed`, `env(safe-area-inset-bottom)`) |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt` (Hellgrau), `--flaeche-dunkel` (Marine, bewusst gleich `--akzent`), `--flaeche-tiefer` (Fuß), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent`, `--akzent-text`, `--akzent-hell` (nur auf Marine: Punkte, Haken, Scanlinie), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-4` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent-hell` auf `--flaeche-dunkel`, `--text-leise` auf `--flaeche-alt`. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Texte, Fuß). Das Zahnzeichen ist ein eigenes SVG Symbol (`#i-zahn`), ein Logo der Praxis ersetzt es an vier Stellen (Kopf, Fuß, Laufband, Scheiben).

## Offen
Formulare senden nichts. Namen, Qualifikationen, Kennzahlen, Stimmen, Sprechzeiten, Ratgebertitel und Antworten sind Beispiele, keine Belege. **Rechtlich nicht geprüft:** Heilmittelwerbegesetz, zahnärztliche Berufsordnung und Preisangaben nach GOZ je Praxis prüfen lassen. Die Tabelle "Kassenleistung gegen Prophylaxe Paket" und die Aussage zum schriftlichen Kostenplan sind Beispiele und je Praxis anzupassen, ebenso Kammer, Aufsicht, Berufsbezeichnung und Notdienst (Fuß, FAQ). **Preise der Pakete sind bewusst Platzhalter** (00 €, 000 €), nichts erfunden; Bonusprogramm oder Paketstruktur je Praxis klären. Keine Vorher Nachher Bilder, keine Heil oder Erfolgsversprechen, keine Superlative: so lassen. Fotos zeigen allgemeine Praxismotive und Stockpersonen, keine Zahnbehandlung (außer dem Behandlungsraum im Held), Fachfotos je Praxis ergänzen. Das Heldfoto liegt nur mit 1000 Pixel Breite vor und wirkt bei 1440 Pixel leicht weich. Die Kopfleiste ist sticky, Anker haben `scroll-margin-top`. Zwei Textlinks (Telefon im Held, Anruf in den Fragen) sind Fließtextlinks unter 44 px Höhe.

## Conversion (Playbook)
- Held: Erwachsene und Familien in Musterstadt, die den Zahnarztbesuch aufschieben, weil Ablauf und Kosten unklar sind; Lösung Praxis, die jeden Schritt vorab erklärt, Kosten schriftlich nennt, Termin online
- H1 "Zahnarzt mit Zeit für Ihre Fragen" (Vorlage "Vertrauensvolle Zahnpflege"), Unterzeile benennt das Problem und den Nutzen
- Primär-CTA "Termin vereinbaren" in Kopf, Held, Rundkasten, Leistungen, Karten, Team, Paketen, Formular und fester Handyleiste; Telefon als zweiter Weg
- Titel (54 Zeichen) mit Keyword und Musterstadt, Beschreibung (151 Zeichen) mit Nutzen und Aufruf
- FAQ (5): Angst, Kosten, Kinder, Akutfall, Zahnspange für Erwachsene
- Formularziel: Terminanfrage (Name, E-Mail, Telefon, Wunschzeitraum, Anliegen), fünf Felder, Hinweis keine Gesundheitsdaten
- Belege: Kennzahlen, Stimmen und Team als Beispiel gekennzeichnet
