# t86 Bauunternehmen Kapsel und Waldgrün

Prinzip nach einem Pinterest Screenshot des Inhabers (Bauunternehmen Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Die Hervorhebung der Überschrift durch farbige Pillen hinter Wörtern ist bewusst **nicht** übernommen (KI Tell nach Kapitel 26): stattdessen Gewichtswechsel (800 zu 300) und ein kleines Foto im Satz.

## Eignung
Bauunternehmen, Generalunternehmer, Hoch und Tiefbau, Sanierung und Gewerbebau, die Bauherren und Gewerbekunden über Fortschritt, festen Ansprechpartner und direkten Draht (Telefon, WhatsApp) zur Anfrage führen. Ansprache im Sie. Lebt von echten Baustellenfotos.

## Sektionsfolge
Schwebende schwarze Kopfkapsel (Menü, Telefon, Knopf), Held (Überschrift mit Gewichtswechsel und Foto im Satz, Intro mit drei Knöpfen Angebot, Anrufen, WhatsApp, großes Bild mit Statuschips, Knopf unten links, drehendes Siegel unten rechts), vier Kennzahlen, Reiter (Über uns, Kundenstimmen, Nachweise) mit Aussagesatz und Bildraster aus vier Fotos mit Text über Bild, Vorzüge mit Symbolen neben Foto, Kundengeschichten als Wischspur, Teamband der Gewerke mit Pause, Kontakt (große Telefon und WhatsApp Flächen, Anfrageformular mit fünf Feldern), Fragen (fünf), schwarzer Fuß, auf dem Handy feste Schnellleiste (Anrufen, WhatsApp, Angebot anfragen).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Statuschips haken nacheinander ab (Planung, Rohbau, Dach, Übergabe), sobald das Bild sichtbar ist | `stil.js`, CSS (`transform`, Farbe) |
| Held | Siegel dreht langsam, Foto driftet leicht | CSS `transform`, `data-parallax` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Reiter | wechseln Text und Bildraster (Pfeiltasten, Pos1, Ende), Inhalt blendet ein | `stil.js`, CSS (`opacity`, `transform`) |
| Bildraster | Fotos driften leicht in ihren Kacheln, Text steht auf dunklem Verlauf | `data-parallax`, CSS |
| Kundengeschichten | Wischspur mit Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Teamband | läuft endlos, Pause Knopf (WCAG 2.2.2), pausiert beim Überfahren | `basis.css` Band, `stil.js` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden, Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript: Chips stehen abgehakt, Kennzahlen stehen, Reiterinhalte stehen untereinander (ohne JavaScript), das Teamband ist ein ruhiges Raster, Siegel steht still.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Kopfkapsel, Fuß, Teamband), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Orange, Primärknöpfe, weißer Text), `--akzent-hell` (Orange auf Dunkel), `--wald` und `--wald-hell` (Zweitfarbe), `--weiss`, `--feld-rand`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-4`.
Gemessene Kontraste: Weiß auf Orange 5,18, Weiß auf Waldgrün 7,76, `--text-leise` auf Weiß 7,1 und auf `--flaeche-alt` 6,42, Hell auf Dunkel 16,75, `--akzent-hell` auf Dunkel 7,75, Feldrand auf Weiß 4,9.

## Marke wechseln
Nur `marke.css` ändern. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Texte, Fuß). Fotos in `bilder/` ersetzen, der Held und das Raster brauchen helle bis mittlere Fotos mit Menschen bei der Arbeit. Siegel (`.siegel`), Chips, Kennzahlen und Geschichten sind Beispiele (`data-beispiel`) und durch echte, belegbare Angaben zu ersetzen.

## Offen
Formulare senden nichts, WhatsApp Link und Telefonnummer sind Platzhalter. Kennzahlen, Stimmen, Namen, Bauabschnitte, Siegel und Nachweisplätze sind Beispiele, keine Belege; es sind keine Zertifikate, Mitgliedschaften oder Projektzahlen als Tatsache genannt. Antworten der FAQ zu Preis, Genehmigung, Gewährleistung und Terminverzug sind Beispiele und rechtlich nicht geprüft (Bauvertrag, VOB, Verbraucherrecht je Betrieb ergänzen). Alle Fotos sind Beispielfotos (Unsplash, anonyme Bauarbeiter als Stimmung, nicht das Team), vor Abgabe ersetzen. Das Teamband zeigt Gewerke, keine Personen des Betriebs. Kontrast des Textes über den Fotokacheln liegt über einem dunklen Verlauf, mit echten Fotos neu prüfen. Nicht in Safari und mit Screenreader geprüft.

## Conversion (Playbook)
- Held: Bauherren, Eigentümer und Gewerbekunden, deren Bau mit vielen Firmen aus dem Ruder läuft; Lösung Generalunternehmer mit festem Ansprechpartner und schriftlichem Terminplan
- H1 "Bauen Sie mit einem Ansprechpartner statt mit zehn Firmen", Unterzeile nennt Rohbau, Sanierung, Terminplan und Aufmaß
- Primär-CTA "Angebot anfragen" in Kopf, Held, Vorzügen, Formular und Schnellleiste; Telefon und WhatsApp als eigene Knöpfe im Held und als große Flächen im Kontakt
- Titel (58 Zeichen) und Beschreibung (unter 160) mit Branche, Musterstadt und Aufruf
- FAQ: Kosten, Dauer bis zum Angebot, Terminverzug, Genehmigungen, Mängel nach der Übergabe
- Formularziel: Angebotsanfrage (Name, Telefon, E-Mail, Vorhaben, Beschreibung), fünf Felder, Hinweise unter Telefon und E-Mail
- Belege (Kennzahlen, Stimmen, Siegel) alle als Beispiel gekennzeichnet
