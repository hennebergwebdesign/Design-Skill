# t119 Fallstudie als Kennzahlen Erzählung

Prinzip nach https://doemedia.com/cymbiotika/ (Fallstudie einer Marketingagentur, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, 27.11.2026), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild, keine Zahl, kein Name und kein Text der Referenz ist gespeichert oder übernommen. Beispielbranche: Online Marketing einer kleinen Agentur für einen Regionalhändler (Fahrradhaus). Alle Zahlen, Namen und Anzeigen sind als Beispiel gekennzeichnet; erfundene Erfolgszahlen als Beleg wären ein Verstoß gegen § 5 UWG und stehen nur als erkennbare Vorlagenwerte da.

## Eignung
Agenturen, Berater und Dienstleister, die eine Fallstudie als Geschichte erzählen wollen: Ausgangslage, Problem, Maßnahmen, Ergebnis. Lebt davon, dass neben jeder Kennzahl ihr Beleg steht (Diagramm) und dass die Kapitel nummeriert sind. Ansprache im Sie. Vor dem Einsatz alle Beispielwerte durch belegte Werte ersetzen oder entfernen und den Kunden um Freigabe bitten.

## Sektionsfolge
Kopf (Kapitelmenü, Telefon, Knopf); Held (blauer Bildgrund, Aussage unten links, drei Kennzahlen); Kennzahlenband; Kapitel 01 Betrieb; 02 Herausforderung (große Aussage, vier Zeilen mit Wortlicht); 03 Lösung (sechs Züge, klebende Übersicht links, Liste mit Diagramm rechts); 03.1 Verlauf (klebende Anzeigentafel, vier Phasen); 03.2 Anzeigen nach Lebenslage (vier Handy Anzeigen); 04 Ergebnis (drei Aussagen, Diagramm daneben); 04.1 neun Kennzahlen (eine Zelle hervorgehoben); 05 Team mit Filmfläche; 06 Fragen (sechs Einwände); 06.1 Kontakt (fünf Felder); Abschluss (Wortmarke, Linkspalten).

## Erfassung der Referenz
| Was | Stand | Wert |
|---|---|---|
| Seitenhöhe | beobachtet | 29967 px bei 1440, 29354 px bei 390 |
| H1 | beobachtet | 78,7 px, Gewicht 500, Zeilenhöhe 75,5 px, Laufweite minus 2,75 px; mobil 62,4 px |
| H2 | beobachtet | 53 bis 107 px, Gewicht 500; H3 der Züge 41,8 px (mobil 30 px) |
| Raster | beobachtet | 12 Spalten, Abstand 20 px, Kapitelkopf 3 Spalten (257, 514, 514 px) |
| Kapitelfolge | beobachtet | 01 bis 06 mit Unterkapiteln (01.1, 03.1, 03.2, 04.1), je eine Rasterlinie oben |
| Kleben (sticky) | beobachtet | vier Bereiche: Übersicht der Züge (oben 92 px, 776 px hoch), Wochenanzeigetafel, Kennzahlenstufe, Schlussbühne |
| Held | beobachtet | blauer Foto Grund, Menü als Pillen, Knopf oben rechts, Kennzahlen am Fuß; davor ein Ladebildschirm mit Zähler (100) |
| Seitenfarben | beobachtet | Papier, Tinte, Dunkelgrün, Gelbgrün als Signal; Schriften Neue Haas Display und Inter |
| Gelbe Wortmarkierung, aufhellender Absatz | beobachtet | Markierung nach Kapitel 26 bewusst nicht nachgebaut; das Aufhellen ist übernommen (Wortlicht) |
| Partikel und 3D Ring, Zahl aus Punkten | beobachtet | nicht nachgebaut (Canvas, Leistung) |
| Hover, Zeitverläufe, Zwischenbreiten, Videos | nicht erfasst | unbekannt |

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Kopf | über dem Held durchsichtig, nach 24 px auf Papier; Menü als Panel mobil, Abschnittsanzeige | `bewegung.js` (`gescrollt`, `data-menue`), CSS |
| Held | Zahl zählt hoch, Laden schiebt sich leicht nach oben | `data-zaehle`, `data-parallax` |
| Kennzahlenband | läuft endlos, Knopf hält es an, ohne JavaScript und bei reduzierter Bewegung steht es ruhig umbrochen | CSS (`transform`), `stil.js` |
| Herausforderung | Wörter hellen beim Scrollen von leise auf voll auf | `data-licht` |
| Züge | die Übersicht klebt, der Zug in Bildschirmmitte schaltet Nummer, Name, Knoten und Striche um | `stil.js` (IntersectionObserver), CSS (`opacity`, `transform`) |
| Diagramme | Deckfläche fährt von rechts weg, Linie und Fläche erscheinen | CSS (`transform`), Klasse `ist-da` aus `bewegung.js` |
| Verlauf | die Tafel klebt, die Phase in Mitte setzt Woche, Umsatz, Meilenstein und Aufdeckung (`--rest`) | `stil.js`, CSS (`transform`, `opacity`) |
| Neun Kennzahlen | Zahlen zählen hoch | `data-zaehle` |
| Team | Zeile wählen schaltet Name, Rolle, Zähler | `stil.js` |
| Fragen | ein Eintrag offen, Plus dreht zum Kreuz | `data-exklusiv`, CSS |

Bei reduzierter Bewegung steht alles im Endbild: Band umbrochen, Wörter voll, Diagramme aufgedeckt, Verlaufstafel im Endstand (Woche 12). Ohne JavaScript stehen Diagramme aufgedeckt, Tafel und Übersicht im Anfangsstand der Liste, nichts ist verborgen. Es pinnt nichts über die volle Höhe, nur `position: sticky` an Übersicht und Tafel (Leistung unkritisch, auf schwachen Geräten ungemessen). Auf dem Handy kleben die Übersicht und die Tafel als schmale Leiste unter der Kopfzeile.

## Tokens (marke.css)
`--flaeche` (Papier), `--flaeche-alt`, `--karte`, `--kachel`, `--flaeche-dunkel` (Nachtblau), `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--kennzahl` (Ultramarin), `--signal`, `--signal-hell`, `--himmel-1` bis `--himmel-3` (Held), `--anz-1` bis `--anz-4` (Anzeigen), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Hanken Grotesk), `--schrift-text` (Instrument Sans), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-gewicht-leicht`, `--titel-spur`, `--h1-fall`, `--h2-fall`, `--h2-gross`, `--zahl-gross`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet, WCAG): `--text` auf `--flaeche` 16,3 zu 1, auf `--flaeche-alt` 14,6, auf `--karte` 17,6; `--text-leise` auf `--flaeche` 7,2, auf `--flaeche-alt` 6,5, auf `--karte` 7,8, auf `--kachel` 6,5; `--kennzahl` auf `--flaeche` 8,3, auf `--karte` 9,0, auf `--flaeche-alt` 7,4; `--akzent-text` auf `--akzent` 16,3; `--text-auf-dunkel` auf Nachtblau 15,1, auf `--flaeche-dunkel-2` 13,1, auf dem Himmel 9,4 bis 5,0; `--text-leise-dunkel` auf Nachtblau 8,4 (nie auf dem Himmel, dort 2,8); `--signal` auf Nachtblau 6,7, Tinte auf `--signal` 7,0; `--signal-hell` auf Nachtblau 9,0; weißer Text auf `--anz-1` 9,1, `--anz-2` 5,5, `--anz-3` 6,6, `--anz-4` 17,1; Rand der Felder auf Karte 4,6 (Bedienelement, Mindestwert 3 zu 1). Rasterlinien (`--linie`, 1,5 zu 1) sind Zierde, nie einziges Zeichen. Während das Wortlicht läuft, sind noch nicht erreichte Wörter bewusst gedimmt (unter 4,5 zu 1), im Endzustand voll. Der Name "Markenname" und "Beispiel Radhaus" stehen in Titel, Kopf, Wortmarke, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Alle Zahlen, Diagramme, Namen, Anzeigentexte, Zusagen und Antworten sind Beispiele, keine Belege; Diagramme tragen "Beispieldaten". Kein Foto: der Laden, die Räder, Anzeigen, Skizzen und die Filmfläche sind eigene Zeichnungen oder Platzhalter (Film folgt). Der Ladebildschirm, die Partikelgrafik und der 3D Ring der Referenz sind nicht nachgebaut. Kennzahlenband: Pause Knopf ist Pflicht (WCAG 2.2.2). Rechtstexte, Einwilligung, Zugangsdaten und Freigabe des Kunden fehlen. Safari, Screenreader und echte Geräte nicht geprüft. Auf Zwischenbreiten (um 1000 Pixel) nur die Haltepunkte 48 und 62 rem gesehen.

## Conversion (Playbook)
- Held: Regionalhändler und kleine Betriebe, Problem online kaum gefunden, Lösung lokale Suche, Anzeigen, klare Landingpage, Gespräch in einem Tag
- H1 "Vom Geheimtipp zur ersten Adresse im Umkreis", Unterzeile nennt den Weg
- Primär CTA "Gespräch vereinbaren" in Kopf, Held, Ergebnis, Formular und Abschluss
- Titel mit Thema und Zielgruppe, Beschreibung mit Weg und Hinweis auf Beispielwerte
- FAQ: Kosten, Wirkung, Bindung, Technik, Zahlen, Branche (sechs Einträge, Antworten als Beispiel)
- Formularziel: Gespräch (Name, E-Mail, Telefon, Betrieb, Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Nummerierte Menüpunkte zeigen die Kapitelfolge, Telefon und Hauptaktion bleiben erreichbar |
| held | hero | Aussage, Hauptaktion und drei Kennzahlen stehen im ersten Bildschirm |
| band | trust | Ein durchlaufendes Band trägt die Kernzahlen weiter |
| betrieb | about | Die Fallstudie beginnt beim Kunden, damit jede Zahl einen Zusammenhang hat |
| problem | problem | Große Aussage und je Problem eine beschriftete Zeile: erst der Mangel |
| zuege | features | Jede Maßnahme trägt Kennzahl und eigenes Diagramm, klebende Übersicht zeigt die Position |
| verlauf | cases | Klebende Anzeigetafel folgt der gelesenen Phase |
| persona | portfolio | Gleich gebaute Handy Anzeigen zeigen ein Argument je Zielgruppe |
| ergebnis | cases | Diagramm neben jeder Kennzahl macht die Aussage nachprüfbar |
| neun | benefits | Raster mit einer hervorgehobenen Zelle fasst zusammen |
| team | team | Personenliste mit Film macht Menschen greifbar |
| faq | faq | Einwände werden vor dem Kontakt beantwortet |
| formular | forms | Fünf Felder und Telefon halten die Hürde niedrig |
| abschluss | footer | Riesige Wortmarke als Signatur, darunter Aktion und Linkspalten |
