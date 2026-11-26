# t85 Praxis für mentale Gesundheit, hell mit Marineblau

Prinzip nach einem Pinterest Screenshot des Inhabers (Online und Präsenz Praxis für psychische Gesundheit, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Praxen, Beratungsstellen und Coaching für mentale Gesundheit mit Online und Präsenzterminen in Deutschland, die ruhig, respektvoll und ohne Heil oder Erfolgsversprechen zum Erstgespräch einladen. Ansprache im Du, für Sie im Text ersetzen. Die Sprache vermeidet Diagnosen und Krankheitsnamen, die Themenchips nennen Lebenslagen. Nicht geeignet für Angebote, die Heilung oder Besserung bewerben wollen: das verbietet das Heilmittelwerbegesetz, die Vorlage ist darauf nicht ausgelegt.

## Sektionsfolge
Schwebende weiße Kopfleiste (Logo, fünf Menüpunkte, Knopf mit Pfeilkreis), Held als große Fotokarte mit blauem Verlauf (Überschrift links, Knopf, Telefon, Kachel mit Zähler und Avatarreihe, Themenchips unten rechts), "Über uns" zentriert mit zwei Fotos links und rechts und Kontaktzeile, Angebot (großes Foto mit Textkarte, drei Infokarten: Sitzungen online, Vertraulichkeit, Erreichbarkeit), Fachleute (Foto, vier Personenkarten, kleines Foto, Teamkachel mit Avataren), Stimmen im dunkelblauen Band mit Foto und Zitat, Ratgeber mit Artikelkarte und Vor Zurück, Einwand FAQ, Kontakt (Formular, Foto mit Hinweiskarte), marineblauer Fuß mit deutlichem Notfallhinweis, Mailanmeldung und Rechtslinks.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto zoomt langsam (30 s, hin und zurück), Kachel schwebt nach 0,5 s ein, Zahl zählt auf den Endwert (steht im HTML) | CSS (`transform`, `opacity`), `data-zaehle` |
| Held, Text | Überschrift, Unterzeile und Knöpfe blenden gestaffelt ein | `data-zeig` |
| Über uns | zwei Randfotos driften leicht gegenläufig (ab 992 px) | `data-parallax` |
| Angebot | drei Infokarten blenden gestaffelt ein | `data-staffel`, `data-zeig` |
| Fachleute | Personenkarten blenden gestaffelt ein und heben sich beim Überfahren (nur mit Zeiger) | `data-staffel`, CSS (`transform`) |
| Stimmen | Wechsler mit Pfeilen, ohne JavaScript wischbare Spur | `stil.js`, `scroll-snap` |
| Ratgeber | Vor und Zurück wechseln den Beitrag im Kreis, der neue fährt sanft ein, Zähler "n von 3" | `stil.js`, CSS (`opacity`, `transform`) |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy steht alles sichtbar und bedienbar: kein Zoom, keine schwebende Kachel, kein Heben. Ohne JavaScript stehen alle drei Ratgeberbeiträge untereinander, die Pfeile bleiben verborgen, die Kopfleiste scrollt mit.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Marineblau: Kachel im Held, Stimmenband, Fuß), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Fläche mit hellem Text, auf Hell auch Text und Linie), `--akzent-text`, `--akzent-hell` (nur Zeichen und Fokus auf Dunkel), `--weiss`, `--feld-rand`, `--verlauf-held` und `--verlauf-held-mobil` (Verlauf über dem Heldfoto), `--signal-flaeche` und `--signal-text` (nur Notfallhinweis), `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-4` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche-alt` und Weiß, `--text-leise-dunkel` auf `--flaeche-dunkel`, weiße Schrift über dem Verlauf des Heldfotos (Foto wechselt, Wert neu messen). Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Fuß, JSON-LD). Das Zeichen (`#i-zeichen`) und `favicon.svg` ersetzen. Bildplätze durch eigene Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Rechtlich nicht geprüft, je Kunde zu ergänzen und mit der Berufsordnung abzugleichen:
- Berufsbezeichnung, Approbation, Heilerlaubnis, Kassenzulassung und Abrechnungsweg sind nicht angegeben und nicht erfunden. Ob "Beratung", "Coaching" oder "Psychotherapie" gesagt werden darf, hängt von der Qualifikation ab (Psychotherapeutengesetz, Heilpraktikergesetz); Titel steht je Person auf deren Seite.
- Heilmittelwerbegesetz: keine Heil oder Erfolgsversprechen, keine Prozentwerte zu Besserung, keine Berichte von Klienten über Behandlungserfolge. Die Stimmen sind als Beispiel gekennzeichnet und handeln nur von Atmosphäre und Ablauf; echte Stimmen nur mit schriftlicher Einwilligung und ohne Aussagen zu Krankheit oder Heilerfolg (§ 11 HWG). Die Zahl "3.500 Beratungsgespräche" und "5,0 von 5" sind Beispiele und nur mit belegbaren Angaben zu ersetzen.
- Notfallhinweis im Fuß: Notruf 112 und Telefonseelsorge 0800 111 0 111 (kostenfrei, rund um die Uhr, Angabe zum Stand der Vorlage) je Kunde und zum Zeitpunkt der Auslieferung prüfen und regional ergänzen (Krisendienste). Der Hinweis bleibt auf jeder Seite.
- Vertraulichkeit: der Satz im Infokasten ist keine Zusicherung der Schweigepflicht, ob und wie sie gilt, hängt vom Beruf ab. Datenschutzerklärung mit Videodienst und Auftragsverarbeitung, Gesundheitsdaten im Formular ausgeschlossen (Hinweis steht unter dem Feld), Einwilligung je Kunde.
- Preis und Kassenfrage, Absagefrist und Erreichbarkeit stehen in der FAQ als Beispielantwort.
- Formulare senden nichts, Turnstile ist ein Kommentar. Namen, Rollen, Beitragstitel, Lesezeiten, Kennenlerngespräch (20 Minuten) und Adresse sind Beispiele. Vier Links im Fuß sind Platzhalter.
- Fotos sind Beispielfotos, Personen keine echten Fachleute oder Klienten, vier Nachweise fehlen (siehe BILDER.md). Das Heldfoto ist 1000 Pixel breit, ein größeres einsetzen.
- Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang um ihre Höhe (`scroll-margin-top` im Projekt ergänzen).
- Nicht gemessen: Screenreader, Safari, echte Geräte, Leistung.

## Conversion (Playbook)
- Held: Erwachsene, die gerade viel tragen und den ersten Schritt scheuen, Lösung ein ruhiges Erstgespräch ohne Druck, online oder vor Ort
- H1 "Raum für das, was dich beschäftigt", Unterzeile nennt Beratung, Coaching, online oder Musterstadt und das Erstgespräch
- Primär-CTA "Erstgespräch vereinbaren" in Kopf, Held, Angebot, Fachleute, Formular und Fuß
- Titel mit Keyword und Musterstadt (46 Zeichen), Beschreibung mit Problem, Nutzen und Aufruf (133 Zeichen)
- FAQ: Kosten und Kasse, Vorbereitung, online und Vertraulichkeit, Unsicherheit, Absage (fünf Fragen, Beispielantworten)
- Formularziel: Erstgespräch (Name, E-Mail, Telefon freiwillig, Anliegen), vier Felder, Feldhinweise unter E-Mail, Telefon und Anliegen
- Kennzahl und Bewertung im Held und in den Stimmen als "(Beispiel)" gekennzeichnet
- JSON-LD als LocalBusiness mit Beispielwerten
