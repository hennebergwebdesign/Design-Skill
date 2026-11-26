# t81 Sanitär hell mit Petrol

Prinzip nach einem Pinterest Screenshot des Inhabers (Sanitärbetrieb in Petrol und Marine, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Das Handschriftwort der Referenz ist bewusst weggelassen (KI Tell), die Hervorhebung läuft über Aufbau und Karten, nicht über Schrift oder Farbe.

## Eignung
Sanitär, Heizung, Rohrreinigung und Notdienst für Haus und Wohnung, auch Klempner und Installateure mit Hausverwaltungen als Kunden. Lebt davon, dass Telefon und WhatsApp immer erreichbar sind: Notleiste oben, Telefon in der Kopfzeile, feste Leiste am Handy. Ansprache im Sie.

## Sektionsfolge
Notleiste (Telefon, WhatsApp), Kopf (Logo, fünf Punkte, Telefon, Knopf), Held (Etikett, H1, zwei Knöpfe, drei Kennzahlen, Avatare mit Sternen, Foto in weicher Form mit schwebender Karte), Leistungen auf Marine (vier weiße Karten), Warum wir (Foto, drei Aussagen, Haken, Knopf), Ablauf in vier Kreisen auf hellem Petrol, Notdienstbanner in Petrol mit Bild, Stimmen (drei Karten), Unsere Arbeiten (Bildraster mit Projektkarte), Qualitätsstreifen, Team auf Marine, Ratgeber (drei Artikel), Fragen (fünf Einwände), Kontakt mit Anfrageformular, Fuß in Marine, feste Leiste am Handy.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto driftet leicht gegen die Scrollrichtung, schwebende Karte hebt und senkt sich | `data-parallax`, CSS (`transform`) |
| Held | Kennzahlen zählen hoch, der Endwert steht im HTML | `data-zaehle` |
| Leistungen | Karten erscheinen gestaffelt und heben sich beim Überfahren und bei Fokus | `data-staffel`, CSS (`translate`) |
| Ablauf | Kreise füllen sich nacheinander, die Linie dazwischen zeichnet sich (ab 896 px waagerecht, darunter senkrecht) | `stil.js` setzt `.lauf`, CSS (`transform`, `opacity`, Verzögerung über `--i`) |
| Notdienst | Anrufknopf pulsiert beim Sichtbarwerden zweimal (unter 5 Sekunden, WCAG 2.2.2), danach beim Überfahren | `stil.js` setzt `.sichtbar`, CSS (`transform`, `opacity`) |
| Stimmen, Ratgeber | gestaffeltes Einblenden | `data-staffel` |
| Arbeiten | Projektkarte blendet beim Überfahren und bei Tastaturfokus über dem Bild ein (nur Zeigergeräte, sonst immer sichtbar), Bild zoomt leicht | CSS (`opacity`, `transform`) |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Menü | Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf Touchgeräten steht alles sichtbar und bedienbar da: Ablauf fertig gefüllt, Karte ohne Schweben, Projektkarte immer sichtbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt` (helles Petrol), `--flaeche-dunkel` (Marine), `--text`, `--text-leise`, `--linie`, `--akzent` (Petrol, Fläche mit hellem Text, auf Hell auch Text und Linie), `--akzent-text`, `--akzent-hell` (nur auf Marine), `--stern` (nur Zeichen), `--notruf` (Banner, gleich `--akzent`), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), Radien, `--radius-organisch` (Form des Heldfotos), `--ton-1` bis `--ton-4` für Bildplatzhalter. Gemessene Kontraste (berechnet): Text auf Weiß 15,5, Leisetext auf Weiß 6,9 und auf hellem Petrol 6,1, Weiß auf Petrol 5,3, Petrol auf hellem Petrol 4,7, Hellpetrol auf Marine 9,1, Leisetext auf Marine 9,2.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Bei einem anderen Akzent `--akzent` auf Weiß und auf `--flaeche-alt` mit 4,5 zu 1 prüfen. "Markenname" steht in Titel, Logo, JSON-LD und Fuß. Das Zeichen (Tropfen) steht als Symbol `i-zeichen` und in `favicon.svg`.

## Offen
Formulare senden nichts. Alle Zahlen (25 Jahre, 24 Stunden, 480 Einsätze, 4,8 von 5 aus 120), Stimmen, Namen, Projektangaben, Zeiten, Notdienst rund um die Uhr, Haftpflicht, Gewährleistung und Antworten sind Beispiele (`data-beispiel`), keine Belege. Keine Innungsmitgliedschaft, Zertifikate oder Preise als Tatsache eingetragen, je Betrieb prüfen. Rechtlich nicht geprüft: Aussagen zu Haftpflicht, Gewährleistung und Preisangaben. Die Fotos sind Beispielfotos, zwei zeigen keinen Sanitärbezug im engen Sinn (Heizungstechnik, Fabrikrohre in Schwarzweiß). Der Link "Alle Projekte", Ratgeberlinks, "Mehr erfahren" und Fußlinks sind Platzhalter. WhatsApp Links nutzen die Beispielnummer. Kontrast von Text über Fotos ist nicht nötig (Text steht auf Flächen), die Teambeschriftung liegt auf Marine. Nicht geprüft: Safari, Screenreader, echte Geräte.

## Conversion (Playbook)
- Held: Hausbesitzer und Mieter mit Wasserschaden, verstopftem Abfluss oder kalter Heizung, Lösung ist ein Betrieb, der schnell kommt, vorab den Preis nennt und sauber arbeitet
- H1 "Wasser läuft falsch? Wir sind in Musterstadt schnell da.", Unterzeile mit 20 Wörtern
- Primär-CTA "Termin anfragen" in Kopf, Held, Warum wir, Qualitätsstreifen und Formular; Notdienst ruft über Telefon an, WhatsApp als zweiter Weg
- Telefon in Notleiste, Kopfzeile, Banner, Kontakt, Fuß und feste Leiste am Handy
- Titel (46 Zeichen) und Beschreibung (143) mit Keyword und Musterstadt
- FAQ: Notfallzeit, Kosten, Anwesenheit, Mieter und Verwaltungen, Angebot
- Formular: fünf Felder (Name, Telefon, E-Mail freiwillig, Anliegen, Nachricht), Feldhinweise unter Telefon und E-Mail, Turnstile Platzhalter, Bestätigungshinweis
- Beleg im Held (Kennzahlen, Sterne) als Beispiel gekennzeichnet; JSON-LD `Plumber` mit Beispielwerten
