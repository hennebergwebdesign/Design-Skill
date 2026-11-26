# t98 Beratung Pastell und Schwarz

Prinzip nach einem Pinterest Screenshot des Inhabers (Unternehmenssoftware und Beratung, warmes Creme mit Pastellkarten), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Keine Adresse der Referenz bekannt.

## Eignung
IT Beratung, Prozessautomatisierung und Softwareeinführung für den Mittelstand (hier Buchhaltungssoftware), auch Steuerbüros, Agenturen für Büroorganisation und digitale Dienstleister, die über Nähe, Porträts und klare Leistungen Erstgespräche gewinnen wollen. Ansprache im Sie. Lebt von Porträts und einem Teamfoto. Abgesetzt von t44, t45, t49, t70 (Software, dunkel oder blau, Oberflächen) durch Creme, vier Pastellflächen, Menschenfotos statt Produktbildern und schwarzen Fuß.

## Sektionsfolge
Schwebende Kopfleiste mit Erstgespräch Knopf, Held (Foto im gerundeten Rahmen mit Verlauf, Satz mit zwei Bildchips, zwei Knöpfe, Telefon, Filmplatzhalter rechts), Partnerleiste (neutrale Beispielzeichen), Leistungen als Wischspur mit vier Pastellkarten, weiße Zweispalte mit großem Porträt, Textband mit Pause, Zweispalte mit Foto links, Ergebnisse (Foto in Wellenform über zwei driftenden Farbflächen, drei Kennzahlen), Stimmen als Wischspur mit Zitatkarten, Ratgeber (drei Artikelkarten), Fragen (Akkordeon), Kontakt in Mint, Fuß in Schwarz (Knopf, Linkspalten, Kapsel, Wortmarke).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Satz, Text und Knöpfe blenden gestaffelt ein, Filmplatzhalter von rechts | `data-zeig`, `bewegung.js` |
| Leistungen, Stimmen | Wischspur mit Scroll Snap und Pfeilknöpfen, ohne JavaScript wischbar und mit Tastatur scrollbar, Karten heben sich beim Überfahren | CSS (`scroll-snap`, `transform`), `stil.js` |
| Ergebnisse | Pfirsich und Gelbfläche driften gegenläufig hinter dem Foto, Karte blendet ein | `data-parallax` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Textband | läuft, Pause per Schalter (Checkbox, ohne JavaScript) und beim Überfahren, bei reduzierter Bewegung statisch und wischbar | CSS (`transform`), echte Elemente |
| Ratgeber | Karten staffeln ein, heben sich beim Überfahren, Pfeil wandert | `data-staffel`, CSS |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Fuß | Wortmarke fährt ein, sobald sie sichtbar wird | `stil.js`, CSS (`transform`, `opacity`) |
| Kopf | Leiste bekommt beim Scrollen eine dunkle Fläche, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, die Pfeile der Wischspuren sind verborgen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Schwarz, Fläche mit hellem Text), `--akzent-text`, `--pfirsich`, `--blau`, `--gelb`, `--mint` (Pastellflächen), `--akzent-warm` (Gelb für Knopf auf Schwarz und Zeichen), `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--schrift-titel` (Lexend), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-4` für Platzhalter.

## Marke wechseln
Nur `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` (17,0 zu 1), `--text-leise` auf Creme, Weiß und `--flaeche-alt` (6,4 bis 7,8), `--text` auf den vier Pastellflächen (11,6 bis 13,6), `--text-leise-dunkel` auf Schwarz (9,4). Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt), ein anderer Name braucht einen neuen Wert für `.fuss__marke`. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Kennzahlen, Stimmen, Namen, Artikeltitel, Partnerzeichen, Fragen und Antworten sind Beispiele, keine Belege. Alle Personenfotos sind Beispiele aus der Bibliothek, vor Abgabe durch Fotos des Kunden mit Einwilligung ersetzen (Nachweis in `BILDER.md`). Das Vorbild zeigt im Held Eltern mit Kind im Park, hier steht ein Büroteam. Das Foto im Fuß ist ein Platzhalter. Der Film ist ein Platzhalter ohne Video (kommt eines, dann ohne Autostart und mit Pause Knopf nach WCAG 2.2.2). Die Leistungen und Antworten zu Steuerberatung, Datenübernahme und E-Rechnung sind fachlich und rechtlich nicht geprüft, je Kunde ergänzen. Kontrast von Weiß über dem Foto im Held ist über den Verlauf geschätzt, nicht gemessen. Safari und Screenreader nicht geprüft. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen).

## Conversion (Playbook)
- Held: Geschäftsführung und Büroleitung im Mittelstand, Problem Belege und Abläufe per Hand und in Insellösungen, Lösung Buchhaltungssoftware einführen und Abläufe automatisieren, mit Schulung
- H1 "Buchhaltung und Abläufe, die einfach laufen" (Bildchips im Satz), Unterzeile nennt Software, Automatisierung und Schulung
- Primär-CTA "Erstgespräch buchen" in Kopf, Held, beiden Zweispalten, Formular und Fuß
- Titel mit Keyword und Musterstadt, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Kosten, Dauer, Datenübernahme, Team, Steuerberatung
- Formularziel: Erstgespräch (Name, E-Mail, Telefon, Größe des Betriebs, Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon
- Kennzahlen und Stimmen als "Beispiel" gekennzeichnet
