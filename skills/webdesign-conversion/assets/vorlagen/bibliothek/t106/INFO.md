# t106 Finanz App Koralle und Petrol

Prinzip nach der Startseite von https://www.possiblefinance.com/ (eigene Aufnahme am 26.11.2026, Playwright, 1440 und 390 Pixel, nur Startseite), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert.

## Eignung
Fintech und Finanz Apps für kleine Beträge (Überbrückung, Gehaltsvorschuss), Haushalts- und Zahlungsnachweis Apps, auch Beratungsstellen mit digitalem Antrag, die über Handyoberflächen, klare Euro Kosten und Gesichter Vertrauen schaffen. Ansprache im Du (App, wie die Referenz). Lebt von echten Produktoberflächen und einer belegbaren Kennzahl. Abgesetzt von t39, t42, t53, t54, t73, t74 (Finanz) und t44, t45, t49, t70, t78 (Software) durch Koralle als Heldfläche, gestapelte Produktpanels, Ziffernwalze und stehende Reiterkarten.

## Sektionsfolge
Feste dunkle Kopfleiste mit Primärknopf, Held (Koralle links mit großer Zeile, Porträt bis an den Rand rechts), vier Linkfelder mit Haarlinien, Produktbühne (drei Panels: Petrol links mit Text und vier Merkmalen, Farbfläche rechts mit Handyoberfläche in HTML und CSS), Ergebnisse (Kennzahl in Zifferzellen, Rechenbeispiel), Stimmen (Haarliniengitter mit Geschichten Karte, drei Zitaten, Bewertungsleiste), Haltung (drei Karten mit Reiter, dunkel), Prüfband, Fragen (Akkordeon mit Plus), Kontakt auf Koralle mit Formular, Fuß in Petrol mit riesiger Wortmarke und Rechtshinweisen.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Satz, Text, Knöpfe blenden gestaffelt ein, Foto von rechts | `data-zeig`, `bewegung.js` |
| Produktbühne (Signatur) | Panels bleiben oben stehen und das nächste schiebt sich darüber. Beim Sichtbarwerden fährt das Handy hoch, der Hinweis rutscht von links ein, der Fortschrittsbalken füllt sich | CSS `position: sticky`, `transform` und `opacity`, `data-zeig="skala"` |
| Kennzahl (Signatur) | Jede Ziffer läuft als Walze von 0 auf ihren Endwert, gestaffelt von links nach rechts. Der Endwert steht im HTML | `stil.js` baut das Band, CSS `transform` |
| Haltung | Karten mit Reiter bleiben als Streifen stehen, die nächste schiebt sich darüber (ab 64 rem, darunter normal untereinander) | CSS `position: sticky` |
| Stimmen, Fragen | Zellen staffeln ein, Akkordeon mit Plus, das sich dreht, ein Eintrag offen | `data-staffel`, `details` mit `data-exklusiv`, `transform` |
| Prüfband | zwei Sterne drehen langsam, bei reduzierter Bewegung still | CSS `transform` |
| Fuß | Wortmarke fährt ein | `stil.js`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Die Stapel (Produktbühne, Haltung) sind nur ab 64 rem Breite Sticky. Die Referenz zeigt dieselbe Art von Bewegung (Stapel, hochzählende Ziffern), die Ausführung ist eigen.

## Tokens (marke.css)
`--flaeche` (Creme), `--flaeche-alt`, `--flaeche-dunkel` (Petrol), `--text`, `--text-leise`, `--linie`, `--akzent` (Petrol, Fläche mit hellem Text), `--akzent-text`, `--koralle` (Held, Kontakt, Knopf auf Dunkel), `--lila`, `--rose`, `--sand` (Panelflächen), `--lila-hell` (Zifferzellen), `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--kopf-hoehe`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), Radien (klein, eckig).

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst nachgerechnet): `--text` auf Creme 16,6 zu 1; `--text-leise` auf Creme 6,6, auf `--flaeche-alt` 5,9, auf Weiß 7,0; `--text` auf `--koralle` 6,3 (Held, Kontakt); `--flaeche-dunkel` auf `--koralle` (Knopf) 5,8; `--akzent-text` auf `--akzent` 15,4; `--text` auf den Panelflächen 11,8 bis 12,6, `--text-leise` auf ihnen 6,7 bis 7,1; `--text-leise-dunkel` auf Petrol 8,8; Eingaberand auf Weiß 4,0 (Mindestwert für Bedienelemente 3,0). Die Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt), ein anderer Name braucht einen neuen Wert für `.fuss__marke`. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Alle Beträge, Gebühren, Raten, die Kennzahl, Bewertungen, Stimmen, Namen, Fragen und Antworten sind Beispiele, keine Belege. Alle Personenfotos sind Beispiele aus der Bibliothek, vor Abgabe durch Fotos mit Einwilligung ersetzen (Nachweis in `BILDER.md`). Der Film der Geschichten Karte ist ein Platzhalter ohne Video (kommt eines, dann ohne Autostart und mit Pause Knopf nach WCAG 2.2.2). **Rechtlich nicht geprüft:** Kreditangebot und Vorschuss unterliegen in Deutschland unter anderem Verbraucherkreditrecht, Preisangabenverordnung (effektiver Jahreszins), Widerrufsrecht, Erlaubnispflicht und Werberegeln für Kredite; die Hinweise im Fuß, die Aussagen zu Gebühren, zur Bonitätsprüfung und zum Verschieben sind Beispieltexte und müssen aus den echten Bedingungen des Anbieters übernommen werden. Keine Aussage der Seite ist eine Zusage von Auszahlung oder Konditionen. Kontrast von Weiß über dem Foto im Held ist über den Verlauf geschätzt, nicht gemessen. Beim Stapel sind Panels bei sehr niedrigen Fenstern (unter etwa 36 rem Höhe) höher als der Bildschirm, dort scrollt der Inhalt des Panels nicht eigenständig. Safari, Screenreader und echte Geräte nicht geprüft. Die Kopfleiste ist fest, `scroll-margin-top` im Projekt ergänzen (Ankerziele liegen sonst unter der Leiste). Die Handyoberflächen sind als `role="img"` mit Beschreibung ausgezeichnet, kein bedienbarer Inhalt.

## Conversion (Playbook)
- Held: Angestellte, deren Geld vor dem nächsten Gehalt knapp wird, Problem die Lücke bis zum Zahltag und Angst vor versteckten Kosten, Lösung kleiner Betrag in Raten mit allen Kosten vorab in Euro, Eignung vorab prüfbar
- H1 "Der Monat ist länger als das Geld? Wir überbrücken das." Unterzeile nennt Raten und Kosten vorab, darunter der Vorbehalt Bonitätsprüfung
- Primär-CTA "Jetzt Rahmen prüfen" in Kopf, Held, erstem Panel, Prüfband, Formular und Fuß
- Titel mit Keyword und Ort, Beschreibung mit Nutzen und Aufruf
- FAQ: Tempo, Kosten, Verschieben, Bonität, Zahlungsprobleme, Anbieter (alle als Beispielantwort gekennzeichnet)
- Formularziel: Eignungsprüfung (Name, E-Mail, Telefon, Wunschbetrag), vier Felder, Hinweise unter E-Mail und Telefon
- Beleg im Held, Kennzahl, Stimmen und Bewertungen als "Beispiel" gekennzeichnet, keine Rendite oder Genehmigung versprochen

## Referenz: übernommen und bewusst nicht
Übernommen (Prinzip): Heldfläche in Vollfarbe mit riesiger Zeile links und Porträt rechts, Streifen aus vier Linkfeldern darunter, Produktpanels mit Text links und Handyoberfläche auf Farbfläche rechts, die sich beim Scrollen überlagern, Kennzahl in einzelnen Zifferzellen, Haarlinien statt Schatten als Gliederung, Zitatgitter mit Quadrat vor dem Zitat, dunkle Karten mit Reiter, die sich überlagern, Akkordeon mit Plus, Fuß mit großer Zeile und Rechtstext. Bewusst nicht: Blau und Neongrün, Schrift, Marke, Texte und Fotos der Referenz, farbige Akzentwörter in Überschriften (Kapitel 26), getippte Logoleiste der Bewertungsportale (hier neutrale Beispielzellen), das Wort "Bullshit" im Held, Kartenumriss und Zeichen der Referenz, Zusagen wie "Geld in Sekunden" ohne Vorbehalt.
