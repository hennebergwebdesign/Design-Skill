# t102 Pflegedienst Pflaume und Honig

Prinzip nach einem Pinterest Screenshot des Inhabers (Hausbesuchspflege, englischer Text, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Ambulante Pflegedienste, Betreuung und Alltagshilfe zu Hause, auch Tagespflege, Hausnotruf und Beratungsstellen, deren Besucher vor allem Angehörige sind und ein Erstgespräch wollen. Ansprache im Sie, warm, großzügige Größen für ältere Besucher (Text ab 17 px, Knöpfe ab 48 px). Abgesetzt von t19, t60 bis t62, t85, t92 (Praxen, Arzt, kühl oder klinisch) durch Pflaumenrot, Honiggelb, Creme und eine Serifenschrift für Titel.

**Schrift, Begründung (Serifenreflex nach Kapitel 26):** Titel in Newsreader, Text in Hanken Grotesk. Die Serife ist hier begründet: Wärme und Verlässlichkeit gegenüber Angehörigen, die eine Entscheidung für ein Familienmitglied treffen, und Abgrenzung von klinischen Sans Serif Auftritten der Praxisvorlagen. Gewicht 500, keine Kursive, kein Akzentwort, keine Pille hinter Wörtern.

## Sektionsfolge
Kopfzeile mit Logo und Menü (fünf Punkte), darunter schwebende Infoleiste (Telefon, Adresse, Knopf Pflegeberatung vereinbaren), Held (Vollbild Foto, Farbkarte links mit Kicker, H1, Untertitel, Knopf, Telefon), Willkommen (Porträt, Text, drei Beispielkennzahlen, Knopf), Leistungen auf Pflaumenfläche (vier Karten mit Foto, die vierte honiggelb als "Alle Leistungen", Karten ragen unten heraus), Leitbild (Text, Foto im Bogen über Kreiswellen), Fragen (fünf `details`), zwei Direktkarten (Verordnung übermitteln, Entlassung vorbereiten) die in den Kontaktbereich ragen, Kontakt (Vollbild Foto, hochgesetzte Karte mit Formular und Rundknopf), Fuß in Pflaume (Kontaktdaten, große Wortmarke).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Farbkarte schiebt sich von links ein, Foto zoomt 18 s langsam (Scale 1 auf 1,14), bei reduzierter Bewegung still | CSS `transform`, `opacity` |
| Kopf | Leiste bekommt beim Scrollen eine Fläche mit Schatten, Infoleiste blendet aus, der Knopf erscheint in der Leiste, Menüpanel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |
| Willkommen | Foto fährt von links ein, Text staffelt, Kennzahlen zählen hoch (Endwert im HTML) | `data-zeig`, `data-staffel`, `data-zaehle` |
| Leistungen | vier Karten staffeln ein, heben sich beim Überfahren | `data-staffel`, CSS `transform` |
| Leitbild | Kreiswellen driften und drehen minimal (30 s), honiggelbe Scheibe mit Parallaxe | CSS `transform`, `data-parallax` |
| Direktkarten | staffeln ein, heben sich beim Überfahren (kein Wippen), Pfeil wandert | CSS `transform` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Kontakt | Karte blendet beim Sichtbarwerden ein, Rundknopf mit sanftem Puls (Ring aus `opacity` und `transform`), bei reduzierter Bewegung aus | `data-zeig="skala"`, CSS |
| Fuß (Signatur) | Wortmarke fährt von links ein, sobald sie sichtbar wird | `stil.js`, CSS `transform`, `opacity` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, der Knopf in der Leiste bleibt am Desktop verborgen, der in der Infoleiste ist sichtbar.

## Tokens (marke.css)
`--flaeche` (Creme), `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Pflaumenrot), `--akzent-text`, `--honig` (Gegenakzent), `--rosa`, `--weiss`, `--feld-rand`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--schrift-titel` (Newsreader), `--schrift-text` (Hanken Grotesk), Radien, `--titel-gewicht`, `--titel-spur`.

## Marke wechseln
Nur `marke.css` ändern. Selbst nachgerechneter Kontrast (WCAG): `--text` auf Creme 15,5 zu 1, auf `--flaeche-alt` 13,8; `--text-leise` auf Creme 7,1, auf `--flaeche-alt` 6,3, auf Weiß 7,7; Creme auf Pflaume 10,2, Weiß auf Pflaume 11,1; `--text-leise-dunkel` auf Pflaume 7,9; `--text` auf Honig 9,4; Pflaume auf Honig 6,2; Pflaume auf Weiß 11,1; Feldrand auf Weiß 5,0 (verlangt 3). Honig steht nie als Textfarbe auf Hell, nur als Fläche, Zeichen und Fokusring auf Pflaume. Die Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `.fuss__marke`). Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Kennzahlen, Antworten, Einzugsgebiet, Adresse und Telefon sind Beispiele, keine Belege. Alle Personenfotos sind Beispiele aus der Bibliothek, vor Abgabe durch Fotos mit Einwilligung ersetzen (Nachweis in `BILDER.md`); die Bibliothek hat kein Foto einer Pflegekraft beim Hausbesuch, das Heldfoto zeigt einen Praxisraum, das Leitbildfoto einen Arzt, das Kontaktfoto ein Gespräch auf dem Sofa. Fünf von acht Fotos haben schon in den Ursprungsvorlagen keinen Nachweis. Rechtliches ist nicht geprüft: Aussagen zu Pflegegrad, Pflegekasse und Leistungen nach SGB XI, Heilmittelwerbung (keine Heilversprechen gewollt), Datenschutz für Gesundheitsdaten im Formular (der Hinweis, keine Gesundheitsdaten zu schreiben, ersetzt keine Prüfung), Einwilligung und Auftragsverarbeitung des Formularversands. Der WhatsApp Hinweis im Fuß ist ein Platzhalter ohne Link, ein Einsatz braucht Einwilligung und Datenschutzprüfung. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen). Kontrast von Text über Foto wurde nicht gemessen, Text steht nur auf Flächen. Safari und Screenreader nicht geprüft. Das Heldfoto ist gespiegelt (Bild enthält keinen Text).

## Conversion (Playbook)
- Held: Angehörige und pflegebedürftige Menschen in Musterstadt, Problem Sorge, ob der Alltag zu Hause noch gelingt, Lösung Pflege und Hilfe zu Hause mit kostenlosem Erstgespräch, ohne Heilversprechen
- H1 "Pflege zu Hause, die zu Ihrem Alltag passt", Unterzeile nennt Unterstützung für Sie und Angehörige und das kostenlose Erstgespräch
- Primär-CTA "Pflegeberatung vereinbaren" in Kopfleiste, Infoleiste, Held, Willkommen, Leistungskarte 4 und Fuß, Telefon in Infoleiste, Held, Willkommen, Fragen und Fuß
- Titel mit Keyword und Musterstadt, Beschreibung mit Zielgruppe, Leistungen und Erstgespräch
- FAQ: Kosten und Pflegekasse, Pflegegrad, Ablauf, Einzugsgebiet, Vertretung bei Krankheit (als Beispielantwort gekennzeichnet)
- Formularziel: Erstgespräch (Name, Telefon, E-Mail, Wer braucht Unterstützung, Nachricht), fünf Felder, Hinweise unter Telefon, E-Mail und Nachricht
- Kennzahlen als "Beispiel" gekennzeichnet
