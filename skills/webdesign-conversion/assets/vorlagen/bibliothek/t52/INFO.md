# t52 Konzern, Stapelkarten

Prinzip nach der freigegebenen Referenz MNC (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Unternehmensgruppen, Holdings, Industrie, Energie, Logistik, Immobilien und Dienstleister mit mehreren Geschäftsfeldern, die Größe und Reichweite zeigen müssen. Nüchtern, kühl, viel Grau und Tinte, Kobaltblau nur als Signal. Ansprache im Du, für Sie im Text ersetzen. Trägt auch ohne viele Fotos, braucht aber ein gutes Bild oder Video im Held.

## Sektionsfolge
Weiße Leiste im gerahmten Vollbildheld (Chip, Titel, Text, Hauptknopf, Telefon), Aussage mit zweifarbigem Satz, vier Kennzahlkacheln, Partnerlaufband, dunkler Abschnitt mit fünf Stapelkarten (Nummer, Titel, Text, Bild mit überlagerter Punktekarte), Reichweite als Mosaik aus Zahlen und Bildern, Stimmen (große Karte mit Wertung, Zitat, drei Zahlen, Person und Reiter aus Logos), Blog (drei Beiträge, Bild über weißer Karte), Fuß als Rahmen aus Linien (Logozelle, Nach oben, Kontaktformular, Linkspalten, drei Kontaktzellen).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bild läuft leicht gegen die Scrollrichtung und dunkelt ab, Chip, Titel und Text staffeln ein | `data-parallax`, `data-abdunkeln`, `data-zeig`, `data-staffel` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| Partner | Logolaufband | `.band` |
| Geschäftsfelder | Karten bleiben stehen und die nächste schiebt sich darüber, die obere schrumpft um bis zu vier Prozent (nur ab 64 rem, mobil stehen sie untereinander) | `position: sticky`, `stil.js` setzt `transform` |
| Reichweite | Kacheln blenden gestaffelt ein | `data-zeig`, `data-staffel` |
| Stimmen | Reiter aus Logos wechselt die Stimme, Pfeiltasten gehen mit | `stil.js`, ohne JavaScript stehen alle Stimmen untereinander |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, mit JavaScript bleibt sie stehen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Tinte für Hauptknopf, dunklen Abschnitt, Fuß), `--flaeche-dunkel-2`, `--weiss`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Kobaltblau), `--akzent-text`, `--akzent-hell` (Akzent auf Dunkel), `--stern`, `--schrift-titel` (Archivo), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche` und `--weiss`, `--text-leise` auf `--flaeche-alt`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Platzhalterflächen durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Kennzahlen, Volumen, Stimmen, Wertungen, Namen, Telefon und Logos sind Beispiele, keine Belege; Wertungen nur zeigen, wenn es echte gibt. Die Kacheln der Reichweite zeigen Platzhalter statt Weltkarte. Kontrast von Text über Fotos im Held nach dem Einsetzen neu prüfen. Zwei Links im Fuß (Impressum, Datenschutz) sind Platzhalter. Karriere und Presse im Fuß führen ins Leere.

## Conversion (Playbook)
- Held: Zielgruppe Mittelstand in der Region, Problem der Wandel in Technik, Energie und Finanzierung, Lösung zusammen gedachte Geschäftsfelder.
- Primär CTA: Erstgespräch anfragen in Kopfzeile, Held und Fußformular.
- Titel mit Ort Platzhalter (Musterstadt), Beschreibung nach Formel.
- FAQ in Sie Ansprache wie bisher: Preis, Projektstart, Branchenerfahrung, Sicherheit, Kontrollfrage „Was kostet es, wenn wir das Vorhaben weiter aufschieben?“.
- Formularziel: Terminvorschlag für ein Erstgespräch, ein Feld.
- Neue Sektion Fragen (`#fragen`) am Ende vor dem Fuß, Akkordeon aus `details` mit `data-exklusiv`; Sektionsfolge: Fragen steht nach dem Blog.
