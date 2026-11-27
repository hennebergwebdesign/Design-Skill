# t113 Nachunternehmerprüfung im Bau

Prinzip nach https://area.us/ (Startseite einer Software zur Prüfung und Überwachung von Auftragnehmern im Bau, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Beispielbranche: Prüfung von Nachunternehmern für Generalunternehmer und Bauträger in Deutschland.

## Eignung
B2B Software und Dienste mit erklärungsbedürftigem Prozess und Kaufentscheidung im Team: Compliance, Qualifizierung, Dokumentenprüfung, Lieferantenmanagement, Versicherungs und Handwerksdienste für Firmenkunden. Die Seite zeigt statt zu behaupten: jede Funktion als gezeichnete Oberfläche, Einwände als Chat. Ansprache im Sie. Abgesetzt von t111 (Einzelprodukt mit Scrollgeschichte): hier ein Prozess in drei Bausteinen und fünf Funktionen, helle Flächen, Foto nur im Held.

## Sektionsfolge
Kopf (Logofläche links, Menütafel mit Telefon und Knopf rechts, liegt fest über dem Foto); Held (Foto im Rahmen, Überschrift im hellen Textkasten, Knopf und Telefon im Kasten, Beispiellogos am unteren Rand); Einleitung (zwei Sätze, Wortlicht); Karten (drei Funktionsblöcke auf grauen Karten mit gezeichneter Oberfläche: Tablet mit Betriebsakte, Risikoblatt, Betriebsliste); Stimme (schwarze Karte, Beispiel); Funktionsliste (fünf Funktionen auf pinnender Bühne, Gerät daneben); Vergleich (große Aussage links bleibt stehen, rechts vier Karten: Prüfpunkte, Telefonmeldung, Balken auf Signalgelb, Siegel); Fragen als Chat (sechs `details`); Kontakt (dunkel, Formular mit fünf Feldern); Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Einleitung | Wörter hellen beim Scrollen von Hellgrau auf Schwarz | `data-licht` (`bewegung.js`), Farbe, kein Layout |
| Karten, Stimme, Vergleich | Einblenden von unten, Balken wachsen von unten (`scaleY`) | `data-zeig`, `ist-da`, CSS (`opacity`, `transform`) |
| Funktionsliste | Signatur: Bühne pinnt (560 svh), der Scrollweg wählt eine von fünf Funktionen, Text blendet auf, der passende Bildschirm im Gerät überblendet und hebt sich um 24 px | `stil.js` (`data-buehne`), CSS (`opacity`, `transform`) |
| Vergleich | Siegel dreht langsam mit dem Scrollen | `stil.js`, `transform: rotate` |
| Fragen | Antwortblase fährt 12 px von links ein, Pfeil dreht | CSS `@keyframes` (`opacity`, `transform`), natives `details` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript pinnt nichts: Liste und fünf Bildschirme stehen untereinander, Wörter stehen schwarz, Balken stehen fertig, Siegel steht. Auf Schirmen unter 1024 Pixel entfällt die Bühne ebenfalls (Liste, darunter Bildschirmkarten). Leistung der pinnenden Bühne auf schwachen Geräten ungemessen. Die abgeblendeten Funktionen der Bühne (Deckkraft 0,32) sind absichtlich leise, sie bleiben im Text lesbar, ihr Kontrast ist in diesem Zustand nicht für Fließtext gedacht und nicht gemessen.

## Tokens (marke.css)
`--flaeche` (Papierweiß), `--flaeche-alt` (Sand), `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Schwarz, heller Text), `--akzent-text`, `--karte` (graue Karte), `--karte-hell`, `--signal` (Kennzahlkarte), `--marke` (Baugrün, Logofläche und Telefon), `--marke-text`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--dunkel-karte`, `--chip`, `--linie-dunkel`, `--licht-aus`, `--ok`, `--warnung`, `--offen`, `--stumm` (Statuspunkte), `--feld-rand`, `--rahmen`, `--schrift-titel` und `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht` (300), `--titel-gewicht-gross` (200), `--titel-spur`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 16,1 zu 1, auf `--flaeche-alt` 14,4, auf `--karte` 11,2, auf `--signal` 9,4; `--text-leise` auf `--flaeche` 7,0, auf `--flaeche-alt` 6,3, auf `--karte` 4,8; `--akzent-text` auf `--akzent` 16,8; `--marke-text` auf `--marke` 8,0; `--text-auf-dunkel` auf `--flaeche-dunkel` 16,8, auf `--dunkel-karte` 14,1, auf `--chip` 11,0; `--text-leise-dunkel` auf `--flaeche-dunkel` 8,7, auf `--dunkel-karte` 7,3. Rand der Eingabefelder `--feld-rand` auf `--flaeche` 3,9 zu 1 (Bedienelement, Mindestwert 3 zu 1), die Felder stehen aber auf dunkler Karte mit hellem Rand `--text-leise-dunkel` (auf `--dunkel-karte` 7,3). `--text-leise` auf `--signal` nur 4,1: dort nie verwenden. Statuspunkte sind nie allein, immer mit Wort. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das Foto im Held ist ein Beispielfoto.

## Beobachtet an der Referenz (gemessen bei 1440 und 390)
Held 100 svh (900 px), Überschrift 90 px Gewicht 200 im weißen Kasten (mobil 32,5 px Gewicht 300), Kasten beginnt bei x 173; H2 der Funktionskarten 30 px Gewicht 300 (mobil 24,4 px), H2 Vergleich 120 px Gewicht 200 (mobil 65 px), H2 Fragen 60 px Gewicht 300 (mobil 32,5 px); Fließtext 15 px (mobil 16,25 px); Inhaltsspalte der Karten 930 px; Kontaktknopf und Knöpfe schwarz mit Radius 7,5 px; FAQ: Frage in schwarzer Blase 7,5 px Radius rechts, Antwort in grauer Blase links, im Aufnahmezustand alle Antworten offen, 0 `details`, 18 Buttons. Wortlicht im Einleitungsabsatz und in der Funktionsliste (Wörter und Einträge grau, aktiver schwarz).
Abgeleitet: Funktionsliste pinnt, ein Scrollweg wählt den Eintrag; Siegel dreht beim Scrollen (nicht bestätigt); Vergleichsabschnitt hält die Aussage links stehen.
Nicht erfassbar: Hover, Zeitverläufe, Easing, genaue Länge der pinnenden Strecke (die Sektionshöhen schwanken zwischen zwei Läufen, 881 und 3281 px), Zwischenbreiten, wie die Antworten der Referenz auf und zugehen, Karussell der Funktionsliste auf dem Handy (dort Punktanzeige beobachtet, Verhalten unbekannt).
Nicht übernommen: Cookiebanner als gelbes Dreieck, Partnerlogos der Referenz, Produkt Screenshots, Zahlenversprechen.

## Offen
Formulare senden nichts. Alle Namen, Firmen, Daten, Zahlen (30 Tage, Minuten, Fristen), Siegel, Stimme, Fragen samt Antworten sind Beispiele, keine Belege. Rechtliche Aussagen zu Bescheinigungen (Freistellung nach § 48b EStG, Unbedenklichkeit der Kasse, Handwerksrolle) sind nicht geprüft, ebenso welche Abfragen ein echtes Produkt tatsächlich automatisch durchführen kann. Datenschutz, Auftragsverarbeitung, Standort der Daten und Zertifikat im Siegel sind Platzhalter. Rechtslinks im Fuß zeigen auf `#top`. Das Foto (Beispielfoto, 1000 Pixel breit) ist für große Schirme zu klein, ersetzen. Safari, Screenreader und echte Geräte nicht geprüft. Die pinnende Funktionsbühne (560 svh) ist auf schwachen Geräten ungemessen. Die Referenz hat kein `details` im FAQ, hier sind es echte `details` mit `summary` (bewusste Abweichung wegen Barrierefreiheit).

## Conversion (Playbook)
- Held: Generalunternehmer und Bauträger, Problem Nachweise fehlen oder laufen unbemerkt ab, Lösung Software prüft und überwacht, Demo ohne Verpflichtung als Risikoumkehr
- H1 "Nachunternehmer prüfen, bevor es teuer wird.", Unterzeile in der Einleitung (Nachweise anfordern, prüfen, überwachen)
- Primär-CTA "Demo anfragen" in Kopf, Held, Vergleich, Kontakt (Absenden) und Fuß, Telefon sichtbar in Kopf, Held, Kontakt
- Titel mit Nutzen und Zielgruppe, Beschreibung mit Leistung und Angebot
- FAQ: Produkt, Anforderungen, Freistellung und Unbedenklichkeit, Anbindung, Preis, Daten (sechs Einwände, als Beispiel markiert)
- Formularziel: Demo Termin (Name, Unternehmen, E-Mail, Telefon, Zahl der Nachunternehmer), fünf Felder, Hinweise unter E-Mail und Telefon
- Stimme und Zahlen als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Zwei getrennte Flächen über dem Foto lassen das Bild frei, der Primärknopf bleibt erreichbar |
| hero | hero | Heller Textkasten gibt der Überschrift auf jedem Foto Kontrast, der Knopf sitzt im selben Kasten |
| wortlicht | benefits | Zwei Sätze Nutzen, Wort für Wort gelesen statt überflogen |
| karten | features | Jede Funktion als echte Oberfläche gezeigt statt beschrieben |
| stimme | testimonials | Ein Zitat auf dunkler Karte als Ruhepunkt vor der Detailstrecke |
| funktionsliste | interactive | Eine Funktion im Fokus, das Gerät zeigt den passenden Bildschirm, ohne Klick |
| vergleich | comparison | Aussage bleibt stehen, vier Belegkarten mit je anderem Beweis ziehen vorbei |
| fragen | faq | Einwände als Gespräch, Frage rechts, Antwort links, echte `details` |
| kontakt | forms | Letzter Schritt auf dunkler Fläche, fünf Felder, direkte Telefonnummer |
| fuss | footer | Drei Linkspalten und wiederholter Primärknopf |

Einzeln herauslösbar: Jeder Abschnitt trägt `data-abschnitt` und sein CSS Präfix. Gemeinsam benutzt werden nur `marke.css`, `basis.css`, der Block "Oberflächen" (`.ui`, `.punkt`) von karten und funktionsliste, der Knopf und `.feld`. Details je Abschnitt in `ABSCHNITTE.json`.
