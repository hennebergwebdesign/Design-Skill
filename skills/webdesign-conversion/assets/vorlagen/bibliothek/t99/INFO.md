# t99 Labor Eisgrün und Petrol

Prinzip nach einem Pinterest Screenshot des Inhabers (Pathologielabor, helle Seite mit Türkis, Kartenreihe, Paketumschalter), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Keine Adresse der Referenz bekannt.

## Eignung
Medizinische Labore und Diagnostik (Blut, Allergie, Infektion, Befundübermittlung), die Praxen als Einsender und Privatpatienten ansprechen. Auch Pathologie, Humangenetik, Veterinärlabore und Umweltanalytik mit Anpassung der Texte. Ansprache im Sie. Abgesetzt von t60, t61, t62 und t92 (Praxen, Zentren) durch Eisgrün mit Petrol und Sand, Paketumschalter, Einsender als zweite Zielgruppe und die Messwert Skala.

## Sektionsfolge
Sticky Kopfleiste mit Terminknopf und Telefon, Held (Text links, Arzt im Rahmen rechts über Sandkreis, Messwert Skala als Karte), Leistungen (fünf Karten, die letzte in Petrol), Zweispalte (drei Fortschrittsbalken, zwei Porträts mit Schild), Pakete (Umschalter mit drei Gruppen, mittlere Karte angehoben), Kennzahlenband in Petrol, Fälle als Wischspur, Termin (Formular auf Petrol), Fragen in zwei Spalten, Ratgeber (drei Karten), Partnerleiste (Beispielzeichen), Rundbrief, Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Kicker, H1, Text, Knöpfe blenden gestaffelt ein, Bühne von rechts, Sandkreis driftet | `data-zeig`, `data-parallax` |
| Signatur: Messwert Skala | Der Marker läuft einmal von links in den Referenzbereich, 1,6 s, ohne Wiederholung | CSS `@keyframes` auf `transform`, bei reduzierter Bewegung steht er am Ziel |
| Fortschrittsbalken | füllen sich beim Sichtbarwerden von links | `transform: scaleX`, Klasse `ist-da` aus `bewegung.js` |
| Paket Tabs | schalten mit kurzem Überblenden (0,22 s), Pfeiltasten, Pos1 und Ende; ohne JavaScript stehen alle Gruppen untereinander | `stil.js`, CSS (`opacity`, `transform`) |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Fälle | Wischspur mit Scroll Snap und Pfeilknöpfen, ohne JavaScript wischbar und per Tastatur scrollbar | CSS (`scroll-snap`), `stil.js` |
| Karten, Pakete, Fälle, Ratgeber | heben sich beim Überfahren (nur bei Zeigergerät) | CSS (`transform`) |
| Fragen | Akkordeon, je Spalte ein Eintrag offen | `details` mit `data-exklusiv` |
| Kopf | Leiste bekommt beim Scrollen eine weiße Fläche, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Die Dauern von 1,2 und 1,6 s liegen an Zierbewegungen (Balken, Marker), nicht an bedienbaren Elementen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Petrol), `--text`, `--text-leise`, `--linie`, `--akzent` (Petrol, Fläche mit weißem Text), `--akzent-text`, `--eis` (Eisgrün kräftiger), `--sand` (Gegenakzent), `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Outfit), `--schrift-text` (Manrope), Radien.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (gerechnet am 26.11.2026): `--text` auf `--flaeche` 13,9, `--text-leise` auf Fläche 7,1, auf `--flaeche-alt` 6,5, auf Weiß 7,5, auf `--eis` 5,8, Weiß auf `--akzent` 9,8, Weiß auf Petrol 12,3, `--text-leise-dunkel` auf Petrol 7,8, Petrol auf `--sand` 8,3, `--text-leise` auf Weiß als Platzhalterfarbe 7,5, Eingabefeldrand auf Weiß 5,6. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Kennzahlen, Prozentwerte, Fälle, Pakete, Fragen und Antworten, Artikel, Partnerzeichen, Öffnungszeiten und Leitung sind Beispiele, keine Belege. Alle Personenfotos sind Beispiele aus der Bibliothek, es gibt kein Laborfoto mit Nachweis (siehe `BILDER.md`); das Vorbild zeigt eine freigestellte Person, hier steht ein Rahmenfoto. **Rechtlich nicht geprüft:** Aussagen zu Untersuchungen, Befundübermittlung, Datenschutz bei Gesundheitsdaten, Abrechnung und Heilmittelwerbegesetz sind Beispieltexte ohne fachliche und anwaltliche Prüfung; Pflichtangaben (Impressum, Datenschutz, Leitung, Akkreditierung) je Kunde. Das Formular warnt vor Befunden im Freitext, die Verarbeitung von Gesundheitsdaten im Projekt klären. Kontrast der Sandfläche mit Zeichen und der Skala ist nur über Farbwerte gerechnet. Safari und Screenreader nicht geprüft. Tabs sind nach dem WAI Muster gebaut, nicht mit Screenreader getestet. Die Sektion Termin zeigt das Porträt erst ab 62 rem.

## Conversion (Playbook)
- Held: Praxen als Einsender und Privatpatienten, Problem lange Wartezeit auf Befunde und unklare Abläufe, Lösung genaue Laborwerte mit digitalem Befund, Beurteilung bleibt beim Arzt
- H1 "Genaue Laborwerte, Befunde schnell bei Ihnen", Unterzeile nennt Blut, Allergien und digitale Befunde
- Primär-CTA "Termin anfragen" in Kopf, Held, Zweispalte, Mittelkarte der Pakete, Formular und Fuß
- Titel mit Keyword und Musterstadt, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Nüchternheit, Dauer, Beurteilung durch den Arzt, Überweisung, Datensicherheit, Abholung, Kosten, Nachbestellung (Beispielantworten)
- Formularziel: Terminanfrage (Name, E-Mail, Telefon, Ich bin, Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon, Warnung vor Befunden im Freitext
- Kennzahlen, Balken, Fälle und Pakete als "Beispiel" gekennzeichnet, keine Heil oder Erfolgsversprechen
