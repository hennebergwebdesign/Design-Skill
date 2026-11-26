# t100 Ärztevertretung Marine und Korall

Prinzip nach einem Pinterest Screenshot des Inhabers (Ärzteplattform mit Schichten, großer Farbblock mit Arzt, Handymockups, Länderkarte, drei Schritte), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Keine Adresse der Referenz bekannt, der Markenname der Referenz ist nicht übernommen.

## Eignung
Vermittlung von Honorarärztinnen, Honorarärzten und Vertretungsdiensten an Kliniken und Praxen, auch Personalvermittler im Gesundheitswesen, Plattformen mit zwei Zielgruppen (Anbieter und Einrichtung) und Dienstleister mit Schichtplanung. Ansprache im Sie. Lebt von klarer Aufteilung nach Zielgruppe, einem Dienstkalender und einer Karte. Abgesetzt von t61, t62 (Praxis und Klinik für Patienten) durch den Plattformaufbau mit Handymockups und von t98 (Beratung Pastell) durch Marine, Korall und Sand.

## Sektionsfolge
Schwebende Kopfleiste mit Primärknopf, Held (Marineblock mit Satz, zwei Knöpfen, Telefon, Arzt im Bogenrahmen, der oben aus dem Block ragt, zwei Meldekarten), Für Ärzte (Bühne mit Ärztin und Handymockup, vier Vorteilskarten), Für Einrichtungen (Text und Dienstkalender), Bundesweit (Punktekarte Deutschland mit Standortpunkten, vier Regionenknöpfen und drei Aussagekarten), Ablauf (Marineblock mit drei Handymockups und Verbindungslinie), Kennzahlen (drei Beispielwerte), Fragen (sechs Einwände als Akkordeon), Kontakt (Marineblock mit Formular), Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Arzt steigt aus dem Block (Weg 2,5 rem, Deckkraft), Meldekarten blenden von links ein | CSS `@keyframes`, `data-zeig` |
| Handy bei Ärzte | vier Dienstkarten schieben nacheinander von rechts ein, die letzte bestätigt | `data-zeig`, `data-staffel` |
| Dienstkalender (Signatur) | besetzte Dienste rasten nacheinander in ihre Felder ein (fallen aus 1,4 rem Höhe mit leichtem Überschwingen), offene Felder bleiben leer | `data-zeig`, `data-staffel`, CSS (`transform`, `opacity`, Kurve mit Überschwingen) |
| Karte | Standortpunkte und Porträtchips erscheinen gestaffelt, Regionenknöpfe blenden die Punkte der anderen Regionen ab | `data-zeig="skala"`, `stil.js`, CSS (`opacity`) |
| Aussage- und Vorteilskarten | blenden gestaffelt ein, heben sich beim Überfahren | `data-staffel`, CSS (`transform`) |
| Drei Schritte | Verbindungslinie zeichnet sich beim Scrollen (`scaleX`), die drei Handys heben sich gestaffelt | `stil.js`, `data-zeig` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Kopf | Leiste bekommt beim Scrollen eine weiße Fläche (Deckkraft einer Schicht), Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS (`opacity`) |

Animiert werden nur `transform` und `opacity`, nie `transition: all`. Bedienbares dauert unter 300 ms. Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, die Regionenknöpfe sind verborgen, die Linie der Schritte steht ganz.

## Tokens (marke.css)
`--flaeche` (Sand), `--flaeche-alt`, `--flaeche-dunkel` (Marine tief), `--text`, `--text-leise`, `--linie`, `--akzent` (Marine, Fläche mit weißem Text), `--akzent-text`, `--marine`, `--marine-mittel`, `--korall` (Knopf auf Marine, Text Marine), `--korall-kraeftig` (Flächen und Pins, nie Textfarbe), `--korall-text` (Korall als Textfarbe auf Hell), `--blau-hell`, `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--karte-punkt`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), Radien.

## Kontrast (berechnet nach WCAG)
Weiß auf Marine 14,98 zu 1, Text auf Sand 13,67, Text leise auf Sand 6,08 und auf Weiß 7,01, Text leise auf Sand dunkel 5,53, Marine auf Korall (Knopf) 6,61, Korall hell auf Marine 7,29, Korall Text auf Sand 5,59 und auf Weiß 6,44, Text leise dunkel auf Marine 9,93 und auf Marine tief 11,56, Weiß auf Marine tief 17,45. Text auf dem Foto steht nirgends, im Held liegt der Text auf der Marinefläche, die Meldekarten sind weiß mit dunklem Text. Rand der Eingabefelder `--feld-rand` auf Weiß ist nicht nachgemessen (geschätzt über 3 zu 1).

## Marke wechseln
Nur `marke.css` ändern. Kontrast der oben genannten Paare nachrechnen. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das Zeichen (`#i-zeichen`, halb gefüllter Kreis als Tag und Nacht) steht als Symbol im Kopf der `index.html` und in `favicon.svg`. Die Karte (`<path>` in `index.html`, Pins mit Prozentwerten) ist eine grobe Umrissform aus 57 Punkten, eigene Zeichnung, keine Kartenvorlage.

## Offen
Formulare senden nichts. Kennzahlen, Orte der Karte, Fragen und Antworten, Meldekarten und Dienstkarten in den Handys sind Beispiele, keine Belege. Alle Personenfotos sind Beispiele aus der Bibliothek, vor Abgabe ersetzen (Nachweis in `BILDER.md`). Es gibt kein freigestelltes Foto eines Arztes mit Laptop und keine Ärztin mit Smartphone, an deren Stelle stehen Porträts im Bogenrahmen, die ein Foto der Plattform ersetzen sollte. **Rechtliches nicht geprüft:** Vermittlung von Honorarärzten berührt Arbeitnehmerüberlassung, Scheinselbständigkeit, Vergütungsregeln und Werberecht (Vermittlungsprovisionen und Aussagen zu Vergütung sind je Anbieter zu prüfen). Die Aussagen in der FAQ zu Kosten, Status und Reaktionszeit sind Beispiele ohne Rechtsprüfung. Es gibt bewusst keine Garantie und keine Zusage zu Besetzung oder Diensten. Die Handymockups tragen Text unter 16 px (mindestens 14 px) in aria-hidden Oberflächen, sie sind Illustration. Die Deutschlandkarte ist ein Umriss aus Hand gesetzten Punkten, Pins sind als Prozent gesetzt und bei anderer Breite nicht nachgemessen. Safari, Screenreader und echte Geräte nicht geprüft. Die Kopfleiste ist bei 390 Pixel ohne sichtbaren Markennamen (nur Zeichen, Name über `aria-label`), damit Knopf und Menü Platz haben. Die Bogenrahmen der Fotos sind nicht freigestellt.

## Conversion (Playbook)
- Held: Ärztinnen und Ärzte, Kliniken und Praxen, Problem Dienste suchen oder Lücken im Dienstplan füllen kostet Zeit, Lösung persönliche Vermittlung bundesweit
- H1 "Den richtigen Dienst finden. Die richtige Vertretung besetzen.", Unterzeile nennt Honorarärzte, Kliniken, Praxen, persönliche Beratung
- Primär-CTA "Gespräch vereinbaren" in Kopf, Held, Für Ärzte, Für Einrichtungen, Ablauf, Formular und Fuß
- Titel und Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Ablauf, Kosten, Status als Honorararzt, Fachgebiete, Reaktionszeit, Daten
- Formularziel: Gespräch (Name, E-Mail, Telefon, Rolle), vier Felder, Hinweise unter E-Mail und Telefon
- Kennzahlen, Orte, Antworten als "Beispiel" gekennzeichnet, keine Bewertungen, keine Garantien
