# t103 Zahnarzt Anthrazit und Salbei

Prinzip nach einem Pinterest Screenshot des Inhabers (Zahnarztseite, englischer Text, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Bewusst umgedreht (KI Tells nach Kapitel 26): die Referenz färbt Wörter in den Überschriften, hier steht jede Überschrift einfarbig. Die Zahlen der Referenz sind nicht übernommen, alle Werte sind eigene Beispiele.

## Eignung
Zahnarztpraxen und Kinderzahnheilkunde mit mehreren Schwerpunkten (Prophylaxe, Zahnerhalt, Zahnersatz, Notfall), einem kleinen Team und Online Terminanfrage, die über Porträts, klare Abläufe und eine sichtbare Notfallnummer Vertrauen aufbauen. Auch für Hausarzt und Physiotherapie anpassbar (Texte und Fotos tauschen). Ansprache im Sie. Lebt von echten Teamfotos. Ohne Heil, Erfolgs und Vorher Nachher Aussagen und ohne Superlative gebaut. Abgesetzt von t92 (Zahnarzt Marine) und t60 bis t62 (Praxis) durch dunkles Anthrazit statt Marine, Salbei und Sand, einen Held mit Zahnbogen und Infoleiste, ein Laufband aus Kennzahlen Fotokarten, zwei gegenläufige Leistungskarten, Porträts mit Namensschild und ein Terminformular im dunklen Schlussband.

## Sektionsfolge
Kopfzeile mit Terminknopf, Held (dunkles Vollbild mit langsam zoomendem Foto, Zahnbogen aus Linien, Überschrift, ein Knopf, Infoleiste mit Termin, Notfall und Sprechzeiten), Intro mit Laufband aus fünf Fotokarten mit Kennzahlen, Leistungen (zwei große nummerierte Karten mit Foto und Schlagwörtern), Team (drei Porträts mit Namensschild auf Salbei), Warum wir (Liste mit Häkchen, Foto), Stimmen (Karte über Vollbildfoto mit Wischspur und Punkten), Ratgeber (drei Bildkarten mit Text auf dem Bild), Fragen (Akkordeon neben Kontaktkarte), Schlussband (dunkel, Formular), heller Fuß mit Kontaktdaten und Sprechzeiten. Auf dem Handy eine feste Terminleiste unten (Termin anfragen, Anrufen).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto zoomt langsam (24 s, einmal), nur `transform`, bei reduzierter Bewegung still | CSS `@keyframes held-zoom` |
| Held, Signatur | Zahnbogen aus 14 Linienzähnen baut sich einmal auf (Zahn für Zahn von links nach rechts, 0,9 s je Zahn), dekorativ, `aria-hidden`, nur Desktop ab 56 rem, bei reduzierter Bewegung sofort fertig | CSS `@keyframes zahn-auf` (`transform`, `opacity`) |
| Held, Infoleiste | Überschrift, Text, Knopf und die drei Infopunkte staffeln ein | `data-zeig`, `data-staffel`, `bewegung.js` |
| Laufband | fünf Fotokarten laufen als Band, Pause per Schalter (Checkbox, ohne JavaScript) und beim Überfahren, bei reduzierter Bewegung statisch und wischbar, echte Elemente, Doppelung `aria-hidden` | CSS (`transform`), `.band` aus `basis.css` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Leistungen | die zwei Karten schieben sich beim Scrollen leicht gegenläufig (Faktor 0,05 gegenläufig), auf dem Handy aus | `data-parallax` auf dem äußeren Element, `data-zeig` auf der Karte |
| Team | Karte heißt beim Überfahren und Fokus: Namensschild fährt hoch, Foto skaliert leicht | CSS (`transform`) |
| Stimmen | Wischspur mit Scroll Snap, Punkte als Anker (ohne JavaScript wischbar und sprungfähig), mit JavaScript zeigen sie die sichtbare Karte | CSS, `stil.js` |
| Ratgeber | Karten staffeln ein, Bild skaliert und Pfeil wandert beim Überfahren | `data-staffel`, CSS |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Kopf | Fläche blendet beim Scrollen ein (`opacity` auf einer Unterlage), Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |
| Terminleiste | feste Leiste auf dem Handy, verschwindet, sobald das Formular im Bild ist | CSS (`transform`), `stil.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit. Animiert wird nur `transform` und `opacity`, kein `transition: all`, bedienbare Elemente höchstens 0,28 s.

## Tokens (marke.css)
`--flaeche` (Sand hell), `--flaeche-alt` (Sand), `--flaeche-dunkel` (Anthrazit), `--salbei` (Fläche für Team, Karten, Kontaktkarte), `--salbei-tief` (Ende des Verlaufs im Schlussband), `--text`, `--text-leise`, `--linie`, `--akzent` (gedecktes Koralle, nur Knöpfe und Bedienelemente), `--akzent-text` (Weiß), `--akzent-link` (dunkleres Koralle für Textlinks auf Hell), `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Manrope), Radien.

## Marke wechseln
Nur `marke.css` ändern. Kontrast prüfen (gerechnet am 26.11.2026): `--akzent-text` auf `--akzent` 4,7 zu 1; `--text` auf Sand, Sand dunkel und Salbei 14,0 / 12,3 / 10,8; `--text-leise` auf Sand, Sand dunkel, Salbei und Weiß 6,7 / 5,9 / 5,2 / 7,5; `--akzent-link` auf Sand 5,4 und Sand dunkel 4,7, **auf Salbei nur 4,1, dort steht der Link in `--text`**; `--text-auf-dunkel` und `--text-leise-dunkel` auf Anthrazit 13,0 und 9,1, auf `--salbei-tief` 10,0 und 7,1; Eingaberand 4,6 zu 1 auf Weiß. Ändert die Marke das Koralle, den Text auf dem Knopf neu rechnen (Weiß braucht mindestens `#c05038` in der Helligkeit). Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Kennzahlen, Stimmen, Namen, Rollen, Artikeltitel, Sprechzeiten, Notfallnummer, Fragen und Antworten sind Beispiele, keine Belege. Alle Personenfotos sind Beispiele aus der Bibliothek (Stockpersonen), vor Abgabe durch Fotos der Praxis mit Einwilligung ersetzen (Nachweis in `BILDER.md`). Zahnbehandlungsfotos fehlen in der Bibliothek: das Heldfoto zeigt einen Behandlungsraum, die Leistungs und Laufbandfotos allgemeine Arztpraxen und Instrumente, das Foto der Leistung 01 trägt ein Namensschild mit fachfremdem Aufdruck. **Rechtliches nicht geprüft:** Heilmittelwerbegesetz (keine Heil, Erfolgs oder Schmerzfreiheitsversprechen, keine Vorher Nachher Bilder, in der Vorlage eingehalten, nicht juristisch gegengeprüft), Berufsordnung der Zahnärzte, Angaben zu Kasse, Festzuschuss und Notdienst in den Antworten, Impressums und Datenschutzpflichten (Links sind Platzhalter), Einwilligung zur Terminanfrage. Kontrast von Weiß über dem Held und den Fotokarten ist über die Verläufe (mindestens 80 Prozent Anthrazit unter dem Text) auf etwa 7 zu 1 geschätzt, nicht pixelgenau gemessen. Safari, Screenreader und echte Geräte nicht geprüft. Der Zahnbogen ist auf dem Handy ausgeblendet (zu wenig Platz neben der Überschrift), dort trägt die Infoleiste die Bewegung. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen). Auf Telefonen unter 28 rem Breite fehlt der Terminknopf in der Kopfzeile (Platz), er steht dort in der festen Leiste unten. Das Heldfoto ist 1000 Pixel breit und bei 1440 Pixel sichtbar vergrößert. Die Zähne des Zahnbogens sind schematische Formen, kein Gebissschema.

## Conversion (Playbook)
- Held: Familien und Berufstätige in Musterstadt, Problem Unsicherheit vor dem Termin und unklare Kosten, Lösung Zahnmedizin von der Kontrolle bis zum Zahnersatz mit erklärten Schritten und Kostenplan vorab
- H1 "Zahnmedizin für die ganze Familie, ruhig erklärt und klar geplant", Unterzeile nennt Kontrolle bis Zahnersatz, Erklärung vorab und Kosten vorab
- Primär-CTA "Termin anfragen" in Kopf, Held, Warum wir, Fragen, Formular und fester Leiste unten auf dem Handy
- Titel mit Keyword und Musterstadt, Beschreibung mit Leistungen, Notfallnummer und Aufruf
- Notfallnummer in der Infoleiste im Held, im Schlussband, im Fuß und in der Antwort zum Notfall
- FAQ: Kosten und Kasse, Angst vor der Behandlung, Notfall, Zuzahlung, Termin
- Formularziel: Terminanfrage (Name, E-Mail, Telefon, Anliegen, Nachricht), fünf Felder, Hinweise unter E-Mail und Telefon, Hinweis auf Anruf bei akuten Beschwerden
- Kennzahlen, Stimmen, Namen und Zeiten als "Beispiel" gekennzeichnet
