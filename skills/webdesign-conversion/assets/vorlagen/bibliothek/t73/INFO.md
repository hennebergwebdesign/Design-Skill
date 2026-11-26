# t73 Finanz App, Tiefgrün und Limette

Prinzip nach einem Pinterest Screenshot des Inhabers (PDF, Startseite einer Finanz App mit virtuellen Karten, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Telefon und Karten sind selbst aus HTML und CSS gebaut, es gibt keine Fremdlogos und keine Markennamen der Referenz.

## Eignung
Neobanken, Konto mit virtuellen Karten, Zahlungsdienste und Finanz Apps für Privatkunden und Selbständige, auch für Kartenherausgeber und Reisedienste mit App. Lebt von einem klaren Produktbild (App, Karten) und einer Preisübersicht mit drei Stufen. Ansprache im Du, für Sie im Text ersetzen. Mit Anlageteil nur, wenn der Anbieter das tatsächlich anbietet, sonst Abschnitt „Wertpapiere“ samt Risikohinweis entfernen. Abgesetzt von t39 bis t43, t53 und t54: Tiefgrün mit Limette statt Blau, ein Reiterbereich mit Telefonbild, drei Preiskarten auf dunkler Fläche mit Umschalter, wischbare Kartenreihe, Fotoband statt Kartenstimmen.

## Sektionsfolge
Feste dunkle Kopfleiste mit Konto Knopf, Held (zentrierte Überschrift, zwei Knöpfe, Telefon mit Kontostand und zwei schwebenden Karten, unten angeschnitten), Partnerleiste aus neutralen Symbolen (als Beispiel), Kernfunktionen mit vier Reitern und Telefonbild, Anwendungsfälle als vier Fotokarten, Reise eSIM mit Telefon, vier Merkmale, Wertpapiere (Aufklapper, Telefon mit Kursverlauf, Ablauf in drei Schritten, Risikohinweis), Preise in drei Karten (mittlere in Limette) mit Umschalter, Kartenreihe, Stimmen als Fotoband, Newsletter und Fragen, dunkler Abschluss mit Telefon, Fuß mit Kontakt, Links und großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | zwei Karten schweben von den Seiten ein, danach heben und senken sie sich leicht, das Telefon steigt auf, der Kontostand zählt hoch (Endwert steht im HTML) | CSS (`translate`, `opacity`), `data-zaehle` |
| Kernfunktionen | Reiter wechseln Text und Telefonbild, Pfeiltasten, Home und Ende, ohne JavaScript steht der erste Reiter | `stil.js`, CSS (`opacity`, `transform`) |
| Anwendungsfälle | Fotokarte wächst beim Überfahren, Bild zoomt, die Nachbarn treten leicht zurück (ab 768 px, nur mit Maus) | CSS (`transform`) |
| Reise eSIM | Ring hinter dem Telefon driftet gegen die Scrollrichtung | `data-parallax` |
| Merkmale | Kacheln blenden gestaffelt ein, heben sich beim Überfahren | `data-zeig`, `data-staffel`, CSS |
| Wertpapiere | Aufklapper, einer offen, Plus dreht zum Kreuz | `details` mit `data-exklusiv`, CSS (`transform`) |
| Preise | Umschalter monatlich oder jährlich, beide Beträge im HTML, Betrag blendet kurz ein | `stil.js`, CSS |
| Kartenreihe | wischbar mit Einrasten, Pfeilknöpfe, Karten driften beim Scrollen mit unterschiedlicher Stärke gegeneinander | `stil.js` (`--drift`), CSS (`transform`) |
| Stimmen | Fotoband als Wischspur mit Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Fuß | große Wortmarke fährt von unten ein, sobald der Fuß sichtbar wird | `stil.js` (`marke-vor`), CSS (`transform`, `opacity`) |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Animiert werden nur `transform`, `opacity` und die Einzeleigenschaft `translate`, nie `transition: all`. Bedienelemente reagieren in 180 bis 280 ms mit `--kurve` (ease out). Die einzigen `ease-in-out` Kurven gehören dem Schweben der Karten (Dauerbewegung, kein Eintritt). Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar: Reiterleiste und Preisumschalter erscheinen erst mit JavaScript (ohne sie steht der erste Reiter, die Preise stehen monatlich, die übrigen drei Reiterfelder tragen `hidden`), Hover Effekte gibt es nur mit Maus ab 768 px, die Anwendungsfälle sind auf dem Handy eine Wischspur, der Kontostand steht fertig im HTML.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Tiefgrün: Kopf, Held, Preisfläche, Abschluss, Fuß), `--text`, `--text-leise`, `--linie`, `--akzent` (Limette: Fläche mit dunklem Text, auf Dunkelgrün auch Text und Haken), `--akzent-text`, `--gruen-2`, `--gruen-3`, `--gruen-licht`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--fokus` (Fokusring auf Hell), `--feld-rand`, `--sand`, `--telefon-rahmen`, `--negativ` (Abbuchung im Mockup), `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Instrument Sans), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--radius-gross`.
Gemessene Kontraste (WCAG): Text auf Weiß 17,4 zu 1, leiser Text auf Weiß 8,1, auf Hellgrün 6,8, Text auf Dunkelgrün 14,1, leiser Text auf Dunkelgrün 8,7 und auf Mittelgrün 7,2, Limette auf Dunkelgrün 12,2, dunkler Text auf Limette 12,2, Feldrand auf Weiß 4,6, Abbuchung auf Weiß 7,3. Weißer Text auf den Fotokarten und im Fotoband liegt auf einem dunklen Verlauf, an der Stelle gemessen (Screenshot) mindestens 10 zu 1.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Limette ist ein Akzent, kein Textton auf Weiß: ein anderer Akzent braucht `--akzent-text` mit mindestens 4,5 zu 1 darauf, und als Text auf `--flaeche-dunkel` ebenfalls. Der Fokusring auf Hell kommt aus `--fokus`, auf Dunkel aus `--akzent`. Der Name „Markenname“ steht an mehreren Stellen (Titel, Logo, Karten, Fuß, JSON-LD); die große Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem`, Höhe als Anteil), ein anderer Name braucht neue Werte für `.fuss__marke` und `.fuss__huelle`. Beispielwerte (`data-beispiel`, „Beispiel“ im Text) durch echte Angaben ersetzen. Beispielfotos ersetzen, Telefonbilder durch echte Bildschirmfotos der App (dann mit Alt Text).

## Offen
Formulare senden nichts (Turnstile Platzhalter als Kommentar, Bestätigungsmail im Projekt). **Finanzrecht, nicht geprüft:** Alle Angaben zu Preisen, Entgelten, Währungen, eSIM, Depot, Karten, Limits und Support sind Beispiele und keine Belege. Angaben zu Zulassung und Aufsicht (zum Beispiel BaFin), zur Einlagensicherung, zu Wertpapierdienstleistungen, Geldwäsche Identifizierung, Preisangaben und Widerruf sind je Anbieter zu ergänzen und rechtlich zu prüfen, hier steht nur ein Platzhalter in FAQ und Fuß. Der Risikohinweis im Abschnitt „Wertpapiere“ ist ein Mindesttext und kein Ersatz für die vorgeschriebenen Angaben des Anbieters; wer nichts anbietet, entfernt den Abschnitt. Keine Renditeangaben, keine Zinsen, keine „risikofrei“ Aussage. Die Stimmen sind erfundene Beispiele mit Beispielfotos, die Partnerleiste zeigt neutrale Symbole und keine echten Partner. Die Bildschirmtexte der Telefon und Karten Attrappen sind Dekor (`role="img"` mit Beschreibung) und teils unter 16 px, sie sind kein Fließtext. Der Kontrast der Fließtexte ist gemessen, nicht der von Text über Fotos außerhalb der geprüften Stellen und nicht auf echten Geräten (Safari, Screenreader, Leistung ungeprüft). Kopfleiste ist `position: sticky`, `scroll-margin-top` für Anker ist gesetzt. Vier Links im Fuß und die Links der Navigation im Fuß sind Platzhalter. Eine Seite mit Anlageteil braucht eine eigene Prüfung durch die Rechtsberatung des Kunden.

## Conversion (Playbook)
- Held: Selbständige und Vielreisende, die Abos, Auslandszahlungen und Firmenausgaben nicht überblicken, Lösung Konto mit virtuellen Karten und Limit je Karte, in der App eröffnet
- H1 "Ein Konto, viele virtuelle Karten: jede Ausgabe im Griff", Unterzeile nennt Abos, Reisen, Team und Limit je Karte
- Primär-CTA "Konto eröffnen" in Kopf, Held, allen vier Reiterfeldern, Reise eSIM, allen drei Preiskarten und Abschluss; Zweitaktionen ("Funktionen ansehen", "Fragen zur eSIM") sind sekundär
- Titel mit Keyword und Zielgruppe (57 Zeichen), Beschreibung mit Nutzen und Aufruf (147 Zeichen)
- FAQ: Konto eröffnen, Kosten, Sicherheit virtueller Karten, Schutz des Guthabens, Zahlung im Ausland (Antworten als Beispiel gekennzeichnet)
- Formularziel: Newsletter (nur E-Mail, ein Feld) mit Feldhinweis zur Bestätigung; Konto eröffnet wird in der App, nicht auf der Seite
- Beleg im Held (Bewertung) und alle Stimmen als "(Beispiel)" gekennzeichnet; Telefon im Held und Fuß (`tel:`)
- Strukturierte Daten: JSON-LD `FinancialService` mit Beispielwerten
