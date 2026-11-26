# t96 Smartwatch Zubehör, Limette

Prinzip nach einem Pinterest Screenshot des Inhabers (Produktseite für ein Powerbank Gehäuse einer Smartwatch, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Uhr, Gehäuse, Armband, Kabel und Siegel sind eigene, abstrakte SVG Formen (kein Produktfoto, keine Marke). Abgesetzt von t76 (Ladesäule, kühl grau): hier Schwarz, Weiß, Hellgrau und Limette, runde Formen, ein Produkt in vier Farben.

## Eignung
Onlineshops für Zubehör zu Smartwatches und Wearables (Gehäuse mit Akku, Ladehüllen, Armbänder, Ladekabel) mit einem Hauptprodukt, das in Größen und Farben kommt. Geeignet, wenn ein Gerät erklärt und direkt gekauft werden soll. Ansprache im Du, für Sie im Text ersetzen. Mit mehreren Produkten ist die Seite die Produktseite des Hauptartikels, ein Katalog braucht eigene Seiten.

## Sektionsfolge
Schwebende weiße Kopfleiste, Held (Großwort "Erweitere deine Produktivität" mit Limettenbalken und rundem Kaufknopf, Produkt vor den Buchstaben, drei Vorteilszeilen, Bewertung mit Avataren), schwarze abgerundete Karte (Siegel, Anzeige, Text, Uhr unten angeschnitten), Vergleich zweier Uhren mit mAh Zahlen und Pegel, Wortband in Limette mit Pause, Ladekabel mit Prozentring und senkrechtem Kaufreiter, Karte "So setzt du die Teile an" mit Liste und Produktausschnitt, Konfigurator (Preis, Größe, Farbe, Knöpfe), Fragen 01 bis 05, Vollbild mit Foto, Siegel und Rückruf Formular, Fuß in Schwarz mit Mailanmeldung.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Produkt steigt beim Scrollen von unten, dreht sich auf, liegt erst hinter der Großschrift und springt dann davor (z-index Wechsel bei etwa 10 Prozent des Wegs), Bühne pinnt (ab 768 px) | `data-fortschritt`, CSS (`transform`), `stil.js` setzt `data-hinten` |
| Schwarze Karte, Vergleich, Fuß der Seite | Siegel und Tauschknopf drehen langsam | CSS (`transform`, Animation), bei reduzierter Bewegung aus |
| Vergleich | Zahlen zählen hoch (Endwert steht im Text), Pegel füllen sich, Akkuring füllt sich | `data-zaehle`, CSS (`transform`, `stroke-dashoffset`) beim Einblenden |
| Wortband | Limette Band läuft, Knopf hält es an, beim Überfahren Pause | `.band` aus `basis.css`, `stil.js` (Pause, WCAG 2.2.2) |
| Ladekabel | Kabel zeichnet sich bis zum Anschluss, Ring füllt sich auf 87 | CSS (`stroke-dashoffset`) |
| Teile | Liste schaltet den Ausschnitt (Gehäuse, Armband, Smartwatch) per Zoom, die Beschriftung wechselt | `stil.js`, CSS (`transform`) |
| Konfigurator | Größe skaliert die Uhr und ändert den Preis, Farbe setzt `--prod` und `--band` (die SVG Uhr folgt über CSS Variablen), Herz merkt | `stil.js` |
| Fragen | Akkordeon, ein Eintrag offen, Plus wird Minus | `details` mit `data-exklusiv`, CSS |
| Abschnitte | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy steht der Held als ruhiges Bild (Produkt vorn, keine Pinnung), das Wortband als umbrochene Zeile, Zähler und Ringe zeigen den Endwert, die Teile Liste alle drei Texte. Nichts startet bei Deckkraft 0 ohne Rückfall.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Schwarz, Fläche mit weißem Text), `--akzent-text`, `--limette` und `--limette-text` (Limette ist Fläche, Ring und Zeichen, Text darauf immer Schwarz, nie Limette als Text auf Weiß oder Hellgrau), `--buehne` (Fläche hinter dem Produkt), `--feld-rand`, `--prod-graphit|nebel|weiss|limette` und `--band-…` (Produktfarben), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: Schwarz auf Limette (gemessen 16,8 zu 1), `--text-leise` auf Hellgrau, Weiß und `--buehne` (6,8 bis 8,7 zu 1), Weiß auf Schwarz. Der Name "Markenname" und "Kraftgehäuse Volt" (Beispiel) stehen an mehreren Stellen. Das Siegel trägt Text im SVG (`#siegel-ring`, 266 Einheiten Länge auf dem Kreis), ein anderer Text braucht neue `textLength`. Eine Markenfarbe statt Limette in `--limette` setzen und `--limette-text` neu prüfen. Wer Fotos des Produkts hat, ersetzt die SVG Uhr (`#uhr-g` im Kopf der Datei) durch Freisteller und stellt den Farbumschalter auf Bildvarianten um. Die Anzeige auf der Uhr (`.anzeige`) liegt als HTML über der SVG.

## Offen
Preise, Größen, mAh Werte (225 und 675), Laufzeit (11 Std.), Bewertung (4,9, 218), Avatare, Fragen und Antworten sind Beispiele, keine Belege. Je Shop zu ergänzen und rechtlich nicht geprüft: Preisangabenverordnung (Gesamtpreis inklusive Umsatzsteuer, Versandkosten, gegebenenfalls Grundpreis), Widerrufsbelehrung und Muster Widerrufsformular, Hinweis auf die gesetzliche Gewährleistung, Herstellergarantie nur mit Bedingungen, Lieferzeit, Button Lösung (Beschriftung der Bestellschaltfläche vor Vertragsschluss), Batterierecht (Batteriegesetz, Rücknahme, Kennzeichnung Mülltonne, Hersteller Registrierung), CE Kennzeichnung und Konformität, Produktsicherheit von Akkus (Transport, Warnhinweise, Umgebungstemperatur), Angaben zur Eignung je Smartwatch Modell. Keine Markennamen anderer Hersteller nennen. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang um ihre Höhe (`scroll-margin-top` im Projekt ergänzen). Der Held pinnt nur mit JavaScript; die Höhe der Bühne (215 svh) ist ein Gefühlswert. Formulare, Warenkorb und Merkliste senden nichts. Das Foto im Vollbild zeigt keine Uhr und ist ein Beispiel. Links im Fuß und im Wortband sind Platzhalter.

## Conversion (Playbook)
- Held: Smartwatch Nutzer, deren Uhr schon am Nachmittag leer ist; Problem Akku reicht nicht durch den Tag; Lösung Kraftgehäuse mit Zusatzakku, lädt unterwegs nach
- H1 "Erweitere deine Produktivität" als Großwort, die Formel steht in der Unterzeile unter den Vorteilszeilen und im Kommentar vor der h1
- Primär-CTA "Jetzt kaufen" in Kopf, Held (runder Knopf), schwarzer Karte, Ladekabel (Reiter), Teile Karte und Konfigurator; "In den Warenkorb" ist die zweite Aktion
- Titel "Powerbank Gehäuse für Smartwatch | Markenname" (45 Zeichen), Beschreibung mit Nutzen und Aufruf (125 Zeichen)
- FAQ (fünf Einwände): Funktion, Laden, Armband, Laufzeit, Rückgabe und Garantie; Antworten als Beispiel gekennzeichnet
- Formularziel: Rückruf vor dem Kauf (Name, Smartwatch, E-Mail, Telefon, Frage), fünf Felder, Hinweise unter E-Mail und Telefon, dazu Mailanmeldung mit einem Feld im Fuß
- Bewertung, Preis, Zahlen als Beispiel gekennzeichnet (`data-beispiel`), JSON-LD `Product` mit Beispielwerten ohne Bewertungsmarkup
