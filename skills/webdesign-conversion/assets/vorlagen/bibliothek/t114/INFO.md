# t114 Kaffeeabo mit Karten über Fotobühne

Prinzip nach https://www.goodlifemeds.com/ (Startseite eines Online Angebots mit Beratung, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, dazu Scan und Screenshots vom 27.11.2026), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Die Beispielbranche ist ein Kaffeeabo mit Beratung, bewusst ohne Gesundheits oder Wirkaussagen (die Referenz ist ein Anbieter von Medikamenten, das wird nicht nachgebaut).

## Eignung
Abo oder Sortimentsseite mit erklärungsbedürftiger Auswahl: Kaffee, Tee, Pflege, Ernährung, Sportartikel, Pflanzen, Beratungsprodukte. Das Muster trägt, wenn es zwei bis vier Kategorien mit je vier bis sechs Produkten gibt und ein Beratungsschritt die Wahl erleichtert. Ansprache im Sie. Warm, ruhig, fotogetragen. Nicht geeignet für Sortimente mit Hunderten Artikeln (dort Filter und Raster statt Karussell) und nicht für Angebote, deren Wirkung rechtlich eingeschränkt beworben werden darf, ohne dass der Kunde die Texte prüft.

## Sektionsfolge
Schmale Ankündigungsleiste; schwebende Kopfleiste (Menü, Anmelden, Hauptknopf); Held (ganze Fläche Foto, Aussage mittig, Produktkarte unten links); Einstieg (Zeichnung links, Aussage rechts); Vertrauensreihe (vier Zusagen); Kategoriebühne Espresso (Foto, Überschrift, Kartenkarussell, Fußzeile mit Aussage); Kategoriebühne Filterkaffee (gleiche Bauart); Stimmen (vier Bildkacheln mit Zitat); Beratung (Foto, Text, Rückrufformular); Ablauf (dunkle Fotobühne, große Überschrift, drei Schritte); Ratgeber (Textspalte, fünf Karten); Fragen (zweispaltig); Fuß (dunkle Bühne).

## Messung an der Referenz
| Angabe | Wert | Stand |
|---|---|---|
| Held | 900 px hoch bei 900 px Fenster, 844 bei 844, Foto oder Video vollflächig | beobachtet, gemessen |
| Fotobühnen | Abstand zum Rand 13 px bei 1440 (10 px bei 390), Radius 9,6 px, Höhen 1057 bis 1129 px (Desktop), 861 bis 892 px (390) | beobachtet, gemessen |
| Produktkarten | 337 mal 397 px (Desktop), 321 mal 431 px (390), Radius 9,6 px, vier Karten sichtbar bei 1440 | beobachtet, gemessen |
| Überschriften der Bühnen | 72 px, Zeilenhöhe 68,4 px, Spur minus 1,44 px (Desktop), 42,9 px (390) | beobachtet, gemessen |
| Kennzeichen | Monoschrift, 9,6 bis 9,8 px, Großbuchstaben, weite Spur | beobachtet, gemessen |
| Kopfleiste | schwebende dunkle Karte, Ankündigungsleiste 48 px darüber | beobachtet (Aufnahme) |
| Pinnende Bereiche | keine (sticky Elemente je Abschnitt: 0) | beobachtet, gemessen |
| Ratgeber, FAQ | Ratgeber mit Textspalte und fünf Karten, FAQ zweispaltig | beobachtet (Aufnahme) |
| Palette | Creme, Terrakotta, Salbei, Sand, Kohle | beobachtet (Farbwerte im Code), eigene Werte gesetzt |
| Hover, Zeitverläufe, Karussell Gleiten, Videoverhalten, Zwischenbreiten | nicht erfasst | unbekannt |
| Warum die Bühnen keine Pins brauchen | Karten tragen die Bewegung, das Bild bleibt ruhig | abgeleitet |

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Schleier dunkelt beim Scrollen von 90 auf 100 Prozent | `data-abdunkeln`, CSS (`opacity`) |
| Kategoriebühnen, Ablauf | Foto steigt leicht gegen die Scrollrichtung (Foto 12 Prozent höher als die Bühne, kein Spalt) | `data-parallax` 0,05 bis 0,06, `transform` |
| Karussell | Signatur: Pfeile scrollen um eine Kartenbreite, Strich zeigt den Weg, Pfeile dimmen am Ende, Wischen und Pfeiltasten gehen ohne JavaScript | `stil.js`, `scroll-snap`, CSS (`transform`) |
| Karten | Beutel hebt sich beim Überfahren leicht (nur bei `hover: hover`) | CSS (`transform`) |
| Vertrauen, Stimmen, Schritte, Ratgeber | Staffelndes Einblenden | `data-staffel`, `data-zeig` |
| Fragen | Akkordeon, ein Eintrag offen, Plus dreht zum Kreuz | `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Nichts pinnt, es gibt kein Performance Budget zu beachten außer den Fotos (acht Bilder, je unter 110 KB, nur der Held lädt sofort). Bei reduzierter Bewegung und ohne JavaScript bleibt alles sichtbar: kein Parallax, Karten stehen, das Karussell lässt sich per Wischen oder Tastatur bedienen, nur die Pfeile fehlen ohne JavaScript.

## Tokens (marke.css)
`--flaeche` (Creme), `--flaeche-alt`, `--flaeche-karte`, `--flaeche-dunkel` (Kohle), `--text`, `--text-leise`, `--linie`, `--akzent` (Salbei tief, Fläche mit hellem Text), `--akzent-text`, `--schrift-titel` (Schibsted Grotesk, Gewicht 400, enge Spur), `--schrift-text` (Hanken Grotesk), `--schrift-kenn` (Systemmonoschrift, nichts geladen), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--radius-buehne`, `--buehne-rand`, `--terrakotta`, `--terrakotta-hell`, `--salbei`, `--sand`, `--schleier` (RGB des Fotoschleiers), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--weiss`.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Selbst gerechnet (WCAG) mit den Ausgangswerten:

| Paar | Verhältnis | Soll |
|---|---|---|
| `--text` auf `--flaeche` | 13,8 zu 1 | 4,5 |
| `--text` auf `--flaeche-alt` | 12,4 zu 1 | 4,5 |
| `--text-leise` auf `--flaeche` | 6,5 zu 1 | 4,5 |
| `--text-leise` auf `--flaeche-alt` | 5,8 zu 1 | 4,5 |
| `--text-leise` auf `--flaeche-karte` | 7,0 zu 1 | 4,5 |
| `--akzent-text` auf `--akzent` | 6,4 zu 1 | 4,5 |
| `--akzent` auf `--flaeche` (Fokusring, Linkfarbe) | 5,9 zu 1 | 3 |
| `--terrakotta` auf `--flaeche` | 5,6 zu 1 | 4,5 |
| `--terrakotta` auf `--flaeche-karte` | 6,0 zu 1 | 4,5 |
| `--text-auf-dunkel` auf `--flaeche-dunkel` | 13,8 zu 1 | 4,5 |
| `--text-leise-dunkel` auf `--flaeche-dunkel` | 8,9 zu 1 | 4,5 |
| `--terrakotta-hell` auf `--flaeche-dunkel` | 7,2 zu 1 | 4,5 |
| `--feld-rand` auf `--flaeche-karte` | 4,7 zu 1 | 3 |
| Text auf Foto | Schleier mit mindestens 66 Prozent Deckung von `--schleier` (Held 0,66 bis 0,74, Bühnen 0,5 bis 0,84 zum Rand des Textes hin): bei hellstem Foto (Weiß) rechnerisch mindestens 5,5 zu 1 im Held, 4,5 zu 1 bei Bühnentext (nur am dunklen Rand der Verläufe, nicht je Foto gemessen) | 4,5 |

Beutelfarben (`--salbei`, `--sand`, `--terrakotta`, `#4a423b`) sind Flächen, nie Textfarbe. Logo ist Schrift (`Markenname`), `favicon.svg` trägt Bohne auf Kohle.

## Offen
Formulare senden nichts. Beispielprodukte, Namen, Aktion, Fristen, Lieferzeiten, Stimmen und Antworten sind Beispiele, keine Belege; Preise stehen bewusst nicht auf den Karten (Preisangabenverordnung, Grundpreis und Versand je Shop prüfen). Rechtstexte, Widerruf und Abo Bedingungen (Kündigungsbutton, Laufzeit) sind rechtlich nicht geprüft. Acht von neun Fotos sind Beispielfotos anderer Vorlagen ohne Einzelnachweis (siehe `BILDER.md`), alle Fotos zeigen keine echten Sorten und keine echten Kunden. Held und Bühnen sind 800 bis 1600 Pixel breit und wirken bei 1440 Pixel weich. Beutel sind eigene Zeichnungen, im Projekt durch Produktfotos ersetzen. Kein Video, die Referenz hat Videostimmen und einen Film im Held, beides nicht nachgebaut (Stimmen als Bildkacheln). Kein Login, die Schaltfläche Anmelden ist ein Platzhalter. Kontrast von Text auf Foto ist über den Schleier gerechnet, nicht je Foto gemessen. Karussell ist mit Tastatur (Pfeiltasten im fokussierten Streifen) und Wischen bedienbar, Screenreader nicht getestet. Safari und echte Geräte nicht getestet. Keine Gesundheitsaussagen im Text, bei Übernahme für Lebensmittel gelten trotzdem die Regeln der Health Claims Verordnung.

## Conversion (Playbook)
- Held: Kaffeetrinker zu Hause und im Büro, Problem zu viele Sorten und alte Bohnen, Lösung Abo mit Beratung und frischer Röstung, Risikoumkehr Pausieren jederzeit
- H1 "Der richtige Kaffee, ohne ihn lange zu suchen", Unterzeile nennt Beratung, Röstung, Abo, Pausieren
- Primär-CTA "Abo starten" in Kopf, Held, Karten, Einstieg, Kategoriebühnen, Beratung, Ablauf und Fuß
- Titel mit Nutzen und Marke, Beschreibung mit Beratung, Röstung, Pausieren, Lieferort
- FAQ: Anbieter, Laufzeit und Kündigung, Preis, Lieferung, Sorte tauschen, Mahlen
- Formularziel: Rückruf zur Beratung (Name, E-Mail, Telefon, Zubereitung), vier Felder, Hinweise unter E-Mail und Telefon
- Beispielstimmen, Beispielangaben und Beispielproduktkennzeichen sind als Beispiel gekennzeichnet

## Abschnitte (Baukasten)
Jeder Abschnitt ist ein eigenes Element mit `id` und `data-abschnitt`, eigenem CSS Präfix und steht einzeln in `ABSCHNITTE.json` (mit Selektor, CSS, Skript und was beim Herauslösen mitzunehmen ist).

| Kennung | Kategorie | Prinzip |
|---|---|---|
| ankuendigung | navigation | Eine schmale Zeile trägt das eine begrenzte Angebot, ohne den Held zu verdrängen |
| kopf | navigation | Die Leiste schwebt als dunkle Karte über dem Foto, der Hauptknopf bleibt erreichbar |
| hero | hero | Foto füllt die Fläche, große Aussage mittig, Produktkarte unten links gibt etwas Konkretes zum Anklicken |
| einstieg | about | Zweispalte erklärt in einem Satz, was der Dienst abnimmt, bevor das Angebot beginnt |
| vertrauen | trust | Vier kurze Zusagen mit Icon stehen vor dem Angebot und räumen Zweifel aus |
| kat-espresso | product | Produktkarten liegen über einer abgerundeten Fotobühne, das Bild trägt die Stimmung |
| kat-filter | product | Dieselbe Bauart mit anderem Foto macht jede Kategorie zur eigenen Bühne |
| stimmen | testimonials | Hochformatige Bildkacheln mit Zitat und versetzter Höhe, ohne Video |
| beratung | forms | Foto zeigt den Menschen hinter dem Gespräch, kurzes Formular senkt die Hürde |
| ablauf | process | Riesige Überschrift auf dunklem Bild und drei versetzte Tafeln machen den Ablauf merkbar |
| ratgeber | editorial | Fünf Beitragskarten mit Zeichnungen zeigen Fachwissen und halten Zögernde im Haus |
| fragen | faq | Titel links, Akkordeon rechts, Telefon daneben |
| fuss | footer | Der Fuß wiederholt den Hauptknopf auf dunkler Bühne und verzeichnet Kategorien |
