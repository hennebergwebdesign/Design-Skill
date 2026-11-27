# t120 Bodentest per Probe mit Zeitachse

Prinzip nach https://traced.life/ (Produktseite eines Heimtests per Einsendeprobe, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Beispielbranche: Bodentest für Hausgärten (Deutschland). Das Rabatt Popup der Referenz beim Seitenstart ist bewusst NICHT nachgebaut: Überlagerungen beim Start sind ein Conversion und Bedienproblem.

## Eignung
Erklärungsbedürftiges Einsendeprodukt mit klarem Ablauf und Fachbezug: Bodentest, Wasseranalyse, Raumluftcheck, Futtermittel oder Saatguttest, Laborservice für Privatkunden. Die Seite führt vom Gedanken (Manifest) über den Unterschied (Kartenband) und den Ablauf (Zeitachse) zur Fachperson, zu den Einwänden und zum Kauf. Ansprache im Sie, ruhiger Ton, keine Heilsversprechen. Nicht geeignet für Produkte mit Gesundheits oder Wirkaussagen, solange diese rechtlich nicht geklärt sind: Der Aufbau suggeriert Autorität, der Inhalt muss sie tragen.

## Sektionsfolge
Schwebende Kopfpille (Menü, Telefon, Knopf); Held (geteilt: links unscharfer Farbgrund mit Aussage, Knopf, Telefon und drei Kurzfakten, rechts gezeichneter Bodenschnitt, dünne Zeitlinie mit Messwert Beschriftung); Manifest (zwei Absätze, Wortlicht auf dunklem Grund); Unterschied (Kartenband, aktive Karte scharf, Nachbarn unscharf, zwei Pfeile); Ablauf (Zeitachse in fünf Schritten, links stehendes Bild, rechts Schritte); Fachperson (Platzhalter in Kapsel mit Unterschrift und Methodenkarte); Fragen (fünf Einwände); Beratung (Rückruf Formular); Abschluss (weicher Verlauf, Fortschrittslinie, ein Knopf); Fußkarte (schwebende Karte mit Linkspalten); dazu die feste Bestellkarte unten rechts, auf dem Handy als Leiste.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Die Bühne bleibt stehen (Sticky, 170 svh, mobil 150 svh); die Balken der Zeitlinie laufen nach links, zwei weiche Farbflecke driften | `--fortschritt` aus `bewegung.js`, CSS (`transform`) |
| Manifest | Wörter hellen beim Scrollen von leise auf voll auf | `data-licht` |
| Unterschied | Aktive Karte scharf, Nachbarn kleiner, blasser und (ab 768 px) unscharf; Pfeile und Pfeiltasten schieben um eine Karte | `stil.js` (Scrollposition), CSS (`opacity`, `transform`, statischer `filter`) |
| Ablauf | Der Schritt in der Bildschirmmitte schaltet das stehende Bild um (Überblendung), andere Schritte dimmen | `stil.js` (IntersectionObserver), CSS (`opacity`) |
| Abschluss | Fortschrittslinie füllt sich über den Scrollweg, Farbflecke driften | `--fortschritt`, CSS (`transform`) |
| Bestellkarte | Blendet aus, wenn der Abschluss im Blick ist | `stil.js` (IntersectionObserver) |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung pinnt nichts: Held und Abschluss stehen als normale Abschnitte, Flecke und Balken stehen still, Karten sind alle scharf, alle Schritte voll sichtbar, die Fußkarte überlappt nicht. Ohne JavaScript stehen die Schritte des Ablaufs mit eigenem Bild untereinander, das Manifest ist voll lesbar, alle Karten sind scharf, das Menü bleibt offen sichtbar. Pinnende Bühnen (Held, Abschluss) enthalten nur Text und wenige SVG und CSS Flächen, `filter: blur` steht statisch auf Flecken (kein Animieren des Filters), Leistung auf schwachen Geräten ungemessen.

## Tokens (marke.css)
`--flaeche` (Kreide), `--flaeche-alt` (Moosnebel), `--flaeche-dunkel` (Humus), `--text`, `--text-leise`, `--linie`, `--akzent` (Tannengrün), `--akzent-text`, `--schrift-titel` (Newsreader, Gewicht 400), `--schrift-text` (Instrument Sans), `--schrift-mono` (Systemschrift für Beschriftungen), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`, `--ocker`, `--terra`, `--salbei`, `--tuerkis`, `--karte`, `--fach-grund`, `--humus-warm`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--ende-hell`, `--feld-rand`, `--weiss`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 14,9 zu 1, auf `--flaeche-alt` 13,2; `--text-leise` auf `--flaeche` 6,4, auf `--flaeche-alt` 5,6, auf `--karte` 6,9, auf `--fach-grund` 6,6; `--akzent-text` auf `--akzent` 8,7; `--text-auf-dunkel` auf Humus 14,9, auf `--humus-warm` 9,6; `--text-leise-dunkel` auf Humus 9,9; `--ocker` auf Humus 7,0; `--text` auf `--ende-hell` 9,4. Rand der Eingabefelder und Pfeilknöpfe 4,0 zu 1 (Bedienelement, Mindestwert 3 zu 1). Die Abschnitte Held (Verlauf von Humus nach Ocker, Text darauf), Manifest und Abschluss (Text auf Verlauf aus `--ende-hell` und `--tuerkis`, dunkler Text) sind nur an den hellsten und dunkelsten Stellen gerechnet, nicht über den ganzen Verlauf. Der Name "Markenname" steht in Titel, Kopf, Fuß und JSON-LD. Die Zeichnungen (Bodenschnitt, Tafeln, Kartenbilder) sind SVG, für ein anderes Produkt (Wasser, Luft) durch eigene Motive ersetzen.

## Beobachtet, abgeleitet, unbekannt
Beobachtet (live, scrollend, 1440 und 390): Held mit Schrift Serife Gewicht 400, 48 px (mobil 40 px); Held, Wortlicht und Verlauf sind ein Abschnitt von 4050 px Höhe (1440) bzw. 2532 px (390); Zeitachse mit stehendem Bild links (Sticky bei 108 px, 688 mal 675 px) und fünf Schritten rechts mit je etwa 834 px Abstand; Kartenband mit zwei unscharf angeschnittenen Nachbarn; Fachperson in Kapselform (Radius 9999 px, 723 mal 371 px am Desktop); Abschluss auf Verlauf mit dünner Linie; mobil wird das stehende Bild zum Bild je Schritt. Abgeleitet: Das Wortlicht läuft auf einer pinnenden Bühne, hier bewusst ohne Pin (das Wort Licht misst die Lage des Textes selbst). Unbekannt: Zeitverläufe, Hover, Verhalten zwischen 390 und 1440 Pixel, die Auslöser der Videos im Held.

## Offen
Formulare senden nichts. Preise, Fristen, Zahlen (zwölf Werte, zehn Werktage), Fachperson (Name, Fachgebiet, Einrichtung, Unterschrift, Porträt, Zitat) und Fragen samt Antworten sind Beispiele, keine Belege. Es ist keine Institution genannt und keine erfunden, Platzhalter vor der Abgabe durch echte Angaben ersetzen. Widerruf, Rücksendung, Preisangabenverordnung und Hinweis zur Aussagekraft der Auswertung sind rechtlich nicht geprüft. Keine Fotos, alle Bilder sind eigene SVG Zeichnungen (siehe `BILDER.md`). Kein Video, die Referenz hat einen Film im Held, nicht nachgebaut. Safari, Screenreader und echte Geräte nicht geprüft.

## Conversion (Playbook)
- Held: Hausgärtnerinnen und Hausgärtner, Problem düngen und kalken ohne zu wissen, was dem Boden fehlt, Lösung Probe einschicken und zwölf Werte lesen
- H1 "Was im Beet fehlt, steht im Boden. Wir lesen es für Sie.", Unterzeile nennt Zielgruppe, Probe, Werte und Plan
- Primär CTA "Probenset bestellen" in Kopf, Held, Unterschied, Ablauf (zweimal), Abschluss und Bestellkarte
- Titel mit Produkt und Weg, Beschreibung mit Probe, Bericht und Pflegeplan
- FAQ: Preis, Erdmenge, mehrere Beete, Dauer, Rückgabe
- Formularziel: Rückruf (Name, E-Mail, Telefon freiwillig, Garten), vier Felder, Hinweise unter E-Mail und Telefon
- Zusagen und Zahlen als "Beispiel" gekennzeichnet; keine Gesundheits oder Wirkaussagen, keine Bewertungsleiste, kein Logo Fremder

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Eine kleine schwebende Leiste hält Menü, Telefon und Hauptaktion erreichbar, ohne Fläche zu verbrauchen. |
| held | hero | Aussage und Hauptaktion vor allem anderen; die dünne Zeitlinie zeigt, dass hier über Zeit gelesen wird. |
| manifest | editorial | Ein Gedanke wird Wort für Wort heller, damit er gelesen statt überflogen wird. |
| unterschied | features | Nur eine Karte steht scharf, die Nachbarn deuten das Weiterblättern an, jedes Merkmal wird als Warum erklärt. |
| ablauf | process | Ein Bild bleibt stehen und wechselt mit dem Schritt in der Mitte, das Auge folgt dem Ablauf ohne Orientierungsverlust. |
| fachperson | about | Eine benannte Person mit Fachgebiet macht aus dem Versprechen eine Zuständigkeit, die Methodenkarte führt zur Quelle. |
| fragen | faq | Einwände werden an der Stelle beantwortet, an der sie auftauchen. |
| beratung | forms | Ein kurzes Formular mit Feldhinweisen senkt die Hürde für Besucher mit offener Frage. |
| abschluss | cta | Eine Aussage, ein Knopf, ein ruhiger Verlauf, der Zeit zum Entscheiden lässt. |
| fusskarte | footer | Linkspalten auf einer Karte über dem Verlauf halten den Seitenschluss in der Geschichte. |
| bestellkarte | ecommerce | Hauptaktion mit Produkt und Preis bleibt in Daumenreichweite, ohne den Inhalt zu überdecken. |
