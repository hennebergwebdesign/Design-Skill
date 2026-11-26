# t90 Leuchtenshop warm in Olivschwarz

Prinzip nach einem Pinterest Screenshot des Inhabers (Onlineshop für handgefertigte Designerlampen, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Das Oval im Wort der Heldüberschrift der Referenz ist bewusst weggelassen.

## Eignung
Onlineshops für Leuchten, Wohnaccessoires und Kunsthandwerk mit überschaubarem Sortiment (acht bis zwölf Stücke auf der Startseite). Ruhig, warm, weiß mit Olivschwarz. Lebt vom Produktfoto: für jede Leuchte ein Hauptbild und ein zweites Bild mit Licht. Ansprache im Du. Warenkorb, Konto und Suche sind nur gestaltet, nicht gebaut (Shopsystem je Projekt).

## Sektionsfolge
Weiße Kopfleiste (Logo, Menü mit sechs Punkten, Suche, Merkliste, Warenkorb, Primärknopf), Held als große Fotokarte (Überschrift in Versalien, Unterzeile, Knopf, Kontur "Neue Kollektion", schwebende Produktkarte, Kundenfotos, Telefon) mit zwei schmalen Hochformatkarten (Bereiche, Konto), Chipzeile nach Leuchtenart, Shop mit Reitern nach Kollektion und acht Produktkarten, Werkstatt (Leitsatz, Filmplatzhalter, nummerierte Fragen als Akkordeon), Über uns (Text, Porträtplatz, Fotos, drei Kacheln, eine dunkel mit Bild), Beratungsformular, schlanker Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Lichtschein über der Lampe pulsiert sehr langsam (9 s), Produktkarte schwebt um 10 px (7 s), Knopf "Lichtspiel anhalten" stoppt beides | CSS (`opacity`, `transform`), `stil.js` setzt Klasse `still` |
| Chips und Reiter | filtern die Produktkarten, wirken zusammen, Zähler und Leerzustand mit Zurücksetzen | `stil.js` |
| Produktkarten | heben sich beim Überfahren und bei Fokus, "Licht an": warmer Überzug und Schein blenden ein (kein zweites Bild) | CSS (`opacity`, `transform`) |
| Werkstatt | Leitsatz hellt Wort für Wort auf | `data-licht` |
| Filmplatzhalter | langsame Kamerafahrt über dem Poster, Pause Knopf (WCAG 2.2.2) | CSS, `stil.js` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Über uns | Kacheln und Fotos staffeln sich ein | `data-zeig`, `data-staffel` |
| Menü | Abschnittsanzeige, Panel auf dem Handy | `bewegung.js` |

Bei reduzierter Bewegung stehen Schein und Karte still, Hover hebt nichts an (der Licht Zustand der Produktbilder blendet trotzdem ein, nur ohne Verzögerung), Leitsatz ist voll sichtbar. Ohne JavaScript sind alle Produkte sichtbar, die Filterleisten erscheinen erst mit JavaScript, das Menü steht unter der Leiste.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (bewusst gleich `--akzent`), `--text`, `--text-leise`, `--linie`, `--akzent` (Olivschwarz), `--akzent-text`, `--akzent-warm` (nur Licht: Schein, Flamme, Punkt), `--feld-rand`, `--schrift-titel` (Outfit), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` (Produktflächen), `--lampe-dunkel`, `--lampe-hell`, `--lampe-mittel` (Lampenformen, nicht mehr genutzt).

## Marke wechseln
Nur `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche-alt`, `--feld-rand` auf Weiß (gemessen 4,6 zu 1 mit dem Ausgangswert). Name "Markenname" steht in Titel, Logo, Text, Fuß und JSON-LD. Die Produktbilder sind `<img>` je Karte, "Licht an" ist Überzug `.pk__an` plus Schein `.pk__schein` (Lage über `--sx` und `--sy` an `.pk__bild`).

## Offen
Preise, Namen, Mengenangaben, Versandkosten, Lieferzeiten, Fristen und Antworten sind Beispiele (`data-beispiel` beziehungsweise "(Beispiel)"). **Shop Recht je Kunde zu ergänzen und nicht rechtlich geprüft:** Preise in Euro inklusive Mehrwertsteuer, Versandkosten vor Bestellabschluss, Widerrufsbelehrung und Muster (14 Tage), Button Lösung ("zahlungspflichtig bestellen"), Lieferzeit je Artikel, Impressum, Datenschutz, AGB. **Grundpreis** nach Preisangabenverordnung ist nur ein Hinweis (Textzeile unter dem Raster), er fehlt je Artikel und ist bei Waren nach Gewicht, Volumen oder Länge nötig. Der Knopf "In den Warenkorb" hat keine Funktion und zeigt das offen an. Anmeldung, Suche und Merkliste ohne Funktion. Formular sendet nichts (Turnstile Platzhalter). **KI erzeugte Bilder** (Figma generate_image, 26.11.2026) sind Beispiele für die Vorschau, vor Abgabe durch Produktfotos des Kunden ersetzen, Kennzeichnung und Nutzungsrechte je Einsatz prüfen. Das Heldfoto zeigt die Lampe schon leuchtend, der Schein darüber ist nur eine schwache Zugabe; mobil liegt die Lampe großteils hinter dem Text (Bildausschnitt nicht nachjustiert). Kontrast der Heldüberschrift über dem Foto gemessen etwa 4,4 zu 1 an der hellsten Stelle (Großschrift, Grenze 3 zu 1), nach dem Foto Tausch neu messen. Die Kopfleiste ist sticky, Anker haben `scroll-margin-top`. Der Filmplatzhalter ist kein Video: Poster mit Bewegung und Pause Knopf.

## Conversion (Playbook)
- Held: Menschen, die ihr Zuhause wohnlich machen wollen; Problem kaltes Licht und Massenware; Lösung handgefertigte Lampen aus Deutschland, online finden
- H1 "Handgefertigte Lampen, die dein Zuhause warm erleuchten", Unterzeile nennt Werkstätten und Wohlfühllicht
- Primär-CTA "Lampe finden" in Kopf, Held, Beratung (Karte 01) und Formular; "In den Warenkorb" bleibt Kartenaktion
- Titel (53 Zeichen) und Beschreibung (129 Zeichen) mit Keyword und Musterstadt
- FAQ mit fünf Einwänden (Herstellung, Anpassung, Versand, Rückgabe, Leuchtmittel), Antworten als Beispiel
- Formularziel: Lichtberatung, fünf Felder (Name, E-Mail, Telefon freiwillig, Raum, Wunsch), Feldhinweise unter E-Mail und Telefon
- Telefon als tel: Link im Held, in der Beratung und im Fuß; Preisangaben mit MwSt. und Versandhinweis an jeder Karte
