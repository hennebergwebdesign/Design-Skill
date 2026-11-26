# t97 Finanzberatung Tannengrün

Prinzip nach einem Pinterest Screenshot des Inhabers (Finanzberatung, Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Die handschriftliche Unterstreichung eines Wortes in der Überschrift ist bewusst nicht übernommen (KI Tell nach Kapitel 26).

## Eignung
Unabhängige Finanzberatung, Honorarberatung und Steuerberatung für Familien und Mittelstand, die über einen Leitfaden und Beispielprojekte erzählen. Ansprache im Du, für Sie im Text ersetzen. Abgesetzt von t17, t39 bis t43, t53, t54, t73, t74: hier Cremeweiß mit Tannengrün und Gelb, Erzählung über Leitfaden und Projekte statt Produkt oder App.

## Sektionsfolge
Schmale Kontaktleiste, Hauptleiste mit Primärknopf, Held (zentrierte Überschrift, E-Mail Feld mit Knopf, links und rechts gekippte Porträtkarten mit Formen, Register und Verbände als eigene Symbole), tannengrüne Kennzahlen mit Zeichen, drei Karten (mittlere hervorgehoben und angehoben), Leitfaden mit Foto, überlappender Plankarte und zwei Zahlen, vier Leistungskarten, hellgrüne Stimmen mit Wischspur, Projekte als Akkordeon mit offenem gelben Eintrag und Videoplatzhalter, zwei Ratgeberkarten, Fragen, tannengrüner Kontakt mit drehendem Sticker und Formular, Hinweise und Pflichtangaben, Fuß mit Porträtstreifen.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Porträtkarten schweben und kippen beim Scrollen weiter | CSS (`transform`, Keyframes), `stil.js` setzt `--kipp` |
| Sterne | Vierstrahl Deko dreht langsam | CSS Keyframes, bei reduzierter Bewegung aus |
| Kennzahlen, Leitfaden Zahlen | zählen hoch, Endwert steht im HTML | `data-zaehle`, Zahlen fahren mit `data-zeig="links"` ein |
| Drei Karten | mittlere Karte hebt sich beim Einblenden (ab 56 rem) | `data-zeig="hoch"`, CSS |
| Leistungen | gestaffeltes Einblenden, Karte hebt sich bei Maus | `data-staffel`, CSS |
| Plankarte | driftet leicht gegen die Scrollrichtung | `data-parallax` |
| Stimmen | Wischspur, Karte in der Mitte bekommt den Fokus (grün), Pfeilknöpfe | `stil.js`, ohne JavaScript ist die zweite Karte grün |
| Projekte | Akkordeon, ein Eintrag offen, Bild fährt beim Öffnen ein | `details` mit `data-exklusiv`, CSS; ohne JavaScript steht Eintrag 3 offen |
| Videoplatzhalter | Knopf schaltet Abspielen und Pause, Poster zoomt langsam | `stil.js` |
| Sticker | dreht im Kreis | CSS Keyframes |
| Abschnitte | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar.

## Tokens
`marke.css`: `--flaeche` (Cremeweiß), `--flaeche-alt` (helles Grün), `--flaeche-dunkel` und `--akzent` (Tannengrün), `--gelb` mit `--gelb-text`, `--gelb-weich`, `--schwarz` (nur Form hinter dem Porträt), `--feldrand`, `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6`.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: Gelbtext auf Gelb, Hellschrift auf Tannengrün (gemessen 9,2 zu 1), `--text-leise` auf Creme und Hellgrün (7,1 und 6,4 zu 1), Gelb auf Tannengrün (7,1 zu 1). Der Name "Markenname" steht in Titel, Logo und Fuß. Die Sticker Schrift ist auf den Satz "Erstgespräch vereinbaren" abgestimmt (`textLength` im SVG), ein anderer Verbtext braucht einen neuen Wert.

## Offen
Formulare senden nichts, das Video ist ein Platzhalter. **Rechtlich nicht geprüft, je Kunde zu ergänzen:** Erlaubnis nach § 34f oder § 34h GewO, Registernummer, zuständige Stelle, Berufsbezeichnung und Kammer, Aufsicht, Beschwerdestelle, Impressum Pflichtangaben, Risikohinweise, Aussagen zu Provision und Unabhängigkeit, Honorarmodell. Keine Renditeversprechen und keine Garantien, Beratung statt Anlagewerbung. Kennzahlen, Namen, Stimmen, Sterne, Fälle, Ratgeberbeiträge, Register und Verbände sind Beispiele. Die Beispielfotos zeigen Personen als Stimmung, nicht echte Berater oder Mandanten. Kontrast von Text über Fotos nicht nötig (Text steht auf Flächen). Safari und Screenreader nicht geprüft. Die Kopfleiste ist sticky und verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen).

## Conversion (Playbook)
- Held: Familien und Mittelständler mit Geldfragen und Skepsis gegenüber Produktverkauf, Lösung Honorarberatung mit Preis vorab
- H1 "Finanzberatung gegen festes Honorar, ohne Provisionsinteresse", Unterzeile nennt Zielgruppe, Ort und Preis vor Beginn
- Primär-CTA "Erstgespräch vereinbaren" in Kopf, Held, Leitfaden, Formular und Sticker
- Titel mit Keyword und Musterstadt, Beschreibung mit Nutzen und Aufruf
- FAQ: Kosten, Erstgespräch, Produktverkauf, Verluste, Daten
- Formular: Name, E-Mail, Telefon (freiwillig), Anliegen, Einwilligung, fünf Felder, Feldhinweise unter E-Mail und Telefon
- JSON-LD `FinancialService` mit Beispielwerten
