# t76 Ladeinfrastruktur kühl

Prinzip nach einem Pinterest Screenshot des Inhabers (Produktseite für Ladestationen von Elektrofahrzeugen, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Säule, Stecker, Auto und Fotos sind KI erzeugte Beispielbilder (Figma generate_image), keine Produktfotos des Kunden, Nachweis in `BILDER.md`.

## Eignung
Anbieter von Ladesäulen und Wallbox Installation für Gewerbe, Kommunen und Hausverwaltungen, die Planung, Einbau und Betrieb in sechs Schritten erklären und mit einer starken Produktfigur auftreten wollen. Ansprache im Sie. Lebt von einer guten Säulengrafik oder einem freigestellten Produktfoto.

## Sektionsfolge
Kopfzeile mit Primär-CTA, Held (Großwort, freigestellte Säule mit Ladeanzeige, Pfeilknopf, schlanke Leiste), Über uns (Satz in Versalien mit Wortlicht, Auto fährt ein), Warum wir (drei Hochformatkarten, die mittlere dunkel mit Säule), Schnell laden (Großschrift, Stecker überlappt, Kapsel mit Foto), So geht's (Wortband, sechs Schritte links und rechts um eine Säule), Vollbild mit Säulenreihe und Angebotskachel, Anschlüsse (geteilt: Stecker links, Text rechts), Fragen (Akkordeon), Anfrage (Linienfelder), schlanker Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Säule steigt beim Scrollen, steht erst hinter, dann vor der Großschrift (Ebenenwechsel bei etwa 45 Prozent), Großwort driftet leicht nach oben (ab 768 px, Bühne pinnt) | `data-fortschritt`, CSS (`transform`, `z-index` über Klasse `vor` in `stil.js`) |
| Held, Ablauf | Ladeanzeige zählt auf den Endwert, der im HTML steht | `data-zaehle` |
| Über uns | Wörter des Satzes hellen beim Scrollen von grau auf schwarz | `data-licht` |
| Über uns | Auto fährt von links ein | `data-einlauf` (`stil.js`, setzt `--einlauf`), CSS `transform` |
| Schnell laden | Großschrift mit leichter Parallaxe, Stecker senkt sich, Kapsel wächst von 82 auf 100 Prozent | `data-parallax`, `data-einlauf`, CSS |
| So geht's | Wortband läuft langsam, Pause Knopf (WCAG 2.2.2), Schritte bauen sich nacheinander um die Säule auf, blauer Ladebalken wächst mit dem Fortschritt (ab 1000 px Breite und 700 px Höhe, Bühne pinnt) | `.band`, `stil.js`, `data-fortschritt`, `transform: scaleY` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy stehen Held und Ablauf als ruhiger Stapel, alle Schritte voll sichtbar, das Wortband steht still und der Pause Knopf entfällt. Ohne JavaScript scrollt die Kopfzeile mit.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Schwarz, Hauptaktion), `--akzent-text`, `--blau` und `--blau-hell` (nur Zeichen: Leuchtkante, Ladebalken, Anzeige, nie Textfarbe auf Hell), `--gross-wort` (Großschrift im Held, nur Dekor), `--schrift-titel` (Archivo), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-5`. Säule, Stecker und Auto sind freigestellte webp Bilder in `bilder/`, ihre Farben stehen im Bild. Die Ladeanzeige ist HTML (dunkle Fläche mit Zahl) über dem Display des Bildes und deckt dessen aufgemalte Zahl ab.

## Marke wechseln
Werte in `marke.css` ändern, der Blauton der Bilder ist fest. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das Großwort "LADEPUNKT" (Schriftgröße in `vw`) ist auf neun Buchstaben abgestimmt, ein anderes Wort braucht einen neuen Wert für `.held__wort`. Eine andere Säule: Seitenverhältnis in `.saeule` (aspect-ratio 333/1117) und Lage der Anzeige in `.saeule__anzeige` und des Balkens in `.saeule__balken` (Prozent des Bildes) anpassen.

## Offen
Formulare senden nichts, Turnstile ist ein Kommentar. Ladeanzeige (72 Prozent), Texte, Antworten, Anschrift, Telefon und Öffnungszeiten sind Beispiele, keine Belege. Es stehen keine Preise, Leistungswerte, Förderzusagen oder Zeiträume im Text. Förderung, Netzanschluss, Eichrecht und Abrechnung von Ladevorgängen sind je Kunde fachlich und rechtlich zu prüfen und nicht geprüft (Aussagen zu Typ 2 und CCS als gängige Anschlüsse sind allgemein gehalten). KI erzeugte Bilder (acht Stück) sind Beispiele für die Vorschau, vor Abgabe durch Produktfotos des Kunden ersetzen, Kennzeichnung und Nutzungsrechte je Einsatz prüfen. Das Auto sieht einem real existierenden Modell ähnlich, vor Livegang prüfen oder ersetzen. Die Karte "Betrieb" nennt eine Solaranlage im Text, das Bild zeigt ein Auto. Kontrast des weißen Titels über dem Vollbild nicht gemessen. Kapselfoto ist auf 3:2 (mobil) und 21:9 (Desktop) zugeschnitten. Kontrast der Großschrift im Held ist Dekor (nicht gemessen, Text liegt nicht darauf), Kontrast der Linienfeldränder 3,6 zu 1. Safari, Screenreader und echte Geräte nicht geprüft. Die Schritte beim Pinnen erscheinen als Folge, ohne JavaScript alle sofort.

## Conversion (Playbook)
- Held: Betriebe, Hausverwaltungen und Kommunen ohne klaren Plan für Netzanschluss, Förderung und Einbau, Lösung ein Partner für Planung, Einbau und Störungsdienst
- H1 "Ladepunkte für Ihren Betrieb: von der Standortprüfung bis zum Störungsdienst", Unterzeile nennt Zielgruppe und Leistungen, das Großwort ist Dekor (aria-hidden)
- Primär-CTA "Angebot anfragen" in Kopf, Held, Warum wir, Angebotskachel und Formular
- Titel mit Keyword und Musterstadt, Beschreibung mit Leistung, Nutzen und Aufruf
- FAQ: Kosten, Förderung, Netzanschluss, Dauer, Abrechnung (Antworten als Beispiel gekennzeichnet, keine Zahlen)
- Formularziel: Angebotsanfrage (Name, E-Mail, Telefon, Auftraggeberart, Standort und Fahrzeuge), fünf Felder mit Feldhinweis unter E-Mail und Telefon
- Belege: keine erfundenen, Beispielkennzeichnung an Anzeige, Kontakt und Texten; echte Referenzprojekte und Zertifikate je Kunde ergänzen
