# t126 Notizclip, Produktseite mit Bühnen

Prinzip nach https://trymira.com/ (Produktseite für eine KI Brille mit Ring, 15702 px lang bei 1440, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Beispielprodukt: ein Clip für Sprachnotizen mit Ladeetui und App.

## Eignung
Einzelprodukt Launch mit Hardware und App, erklärungsbedürftig, mit Vorbestellung: tragbare Geräte, Notiz und Erinnerungsgeräte, Zubehör, Gadgets. Die Seite führt vom Produktbild über vier benannte Handgriffe und die Bauteile zur Vorbestellung. Ansprache im Sie. Lebt von zwei Bühnen und von Zeichnungen, nicht von vielen Bildern.

## Sektionsfolge
Feste Kopfleiste (Tinte) mit Menü, Telefon und Knopf "Jetzt vorbestellen"; Held (Produkt füllt die Bühne, Aussage davor); Verben (dunkle Bühne, vier Schritte, Ziffernchips); Bauteile (Umrisszeichnung, Markierung, klebender Index, vier Tafeln: Clip, Schutz, Etui, App); Stimmen (Beispielzitate in Querleiste); Einsatz (drei Orte); Vorbestellen (zwei Pakete auf Tinte); Fragen (drei Reiter, neun Einträge, Kontaktkasten); Kontakt (Formular, fünf Felder); Fuß (Akzentfläche).

## Gemessen an der Referenz (1440 und 390, eigene Aufnahme)
| Beobachtet | Wert |
|---|---|
| Seitenhöhe | 15702 px bei 1440, 15612 px bei 390 |
| Abschnitte | Held, Willkommen und Verben (dunkle Bühne), Bauteilbühne (weiß), Auszeichnungen, Erfahrung (Videos), Stimmen, Paketauswahl, Entwickleransprache, FAQ, Presse, Fuß |
| Pinnende Bereiche | vier Elemente mit `position:sticky`, Höhe je 900 px (Held, Willkommen, Verben, Bauteile) |
| Schrift | Geist Variable, Gewicht 500, H1 und H2 bei 70 px, H2 groß bei 52 px, H3 bei 30 px |
| Medien | 8 Videos, 1 Canvas, 65 Bilder, 75 SVG |
| Farben | Körper Hellgrau (rgb 247 247 247), Bühne Schwarz, Akzent Orange, Chips Neongrün, Fuß Orange |
| Beim ersten Besuch | Vollbild Hinweis mit Rabattangebot und E-Mail Feld über der Seite (nicht nachgebaut) |
Abgeleitet: Held und Verbenbühne stehen, der Scrollweg schaltet vier Schritte (Ziffernchips 1 bis 4 laufen mit). Die Bauteilbühne zeigt dieselbe Linienzeichnung je Teil mit orangenen Markierungen, rechts ein Index (Brille, Ring, App). Nicht erfassbar (unbekannt): Hover Verhalten, Zeitverläufe der Videos, Tastaturbedienung der Bühnen, Verhalten bei Zwischenbreiten, genaue Scrollwege der Bühnen in Pixel.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Signatur 1: Der Clip wächst beim Scrollen von 1 auf 1,32 und kippt leicht, der Leuchtpunkt strahlt auf, Text rückt nach oben (Sticky, 210 svh, nur ab 62 rem Breite) | `--fortschritt` aus `bewegung.js`, CSS (`transform`, `opacity`), Klasse `pin` aus `stil.js` |
| Verben | Signatur 2: Bühne steht (380 svh), der Scrollweg schaltet vier Schritte, Ziffernchip springt mit, Klick auf Chip scrollt an die Stelle | `stil.js`, CSS (`opacity`, `transform`) |
| Bauteile | Die Tafel in der Bildschirmmitte markiert ihren Eintrag im klebenden Index | `stil.js` (IntersectionObserver), CSS (`transform`) |
| Stimmen, Einsatz, Pakete | Einblenden gestaffelt | `data-zeig`, `data-staffel` |
| Fragen | Reiter zeigen je eine Gruppe, ein Eintrag offen, Plus dreht zum Kreuz | `stil.js`, `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript pinnt nichts: der Held steht 100 svh, die vier Schritte stehen als Karten untereinander, alle Fragen sind sichtbar. Der Held pinnt auf dem Handy nicht, die Verbenbühne schon (Schritte liegen übereinander, 380 svh). Performance: zwei pinnende Bühnen, nur `transform` und `opacity`, Leistung auf schwachen Geräten ungemessen.

## Tokens (marke.css)
`--flaeche` (Papier), `--flaeche-alt`, `--flaeche-dunkel` (Tinte), `--karte-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Kobalt), `--akzent-text`, `--signal` (Gelb, Chips und Leuchtpunkt), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--geraet-hell`, `--geraet-dunkel`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`, `--buehne-held`, `--buehne-verben`, `--kopfhoehe`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 15,6 zu 1, auf `--flaeche-alt` 14,0; `--text-leise` auf `--flaeche` 7,1, auf `--flaeche-alt` 6,4; `--akzent-text` auf `--akzent` 6,6; `--akzent` auf `--flaeche` 5,9; `--text-auf-dunkel` auf Tinte 16,4, auf `--karte-dunkel` 14,5; `--text-leise-dunkel` auf Tinte 8,3, auf Karte 7,4; `--signal` auf Tinte 12,7, auf Karte 11,2; Tinte auf `--signal` (Knopf) 12,7; Rand der Eingabefelder auf Fläche 4,3 (Bedienelement, Mindestwert 3). Signalgelb nie als Textfarbe auf Hell. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das Produkt ist als SVG Symbol gezeichnet (`clip-voll`, `clip-linie`, `etui-linie` im SVG Block am Seitenanfang), für ein anderes Produkt durch dessen Umriss ersetzen und die Markierungen (`.b-markiert`, `.bauteile__marke--*`) neu setzen.

## Offen
Formulare senden nichts. Preise, Fristen, Akkuzeit, Gewicht, Ladungen, Stimmen, Name und Fragen samt Antworten sind Beispiele, keine Belege. Rechtlich ungeprüft: Datenschutz und Aufnahmehinweise für ein Gerät mit Mikrofon (Einwilligung der Gesprächspartner, Strafbarkeit unbefugter Tonaufnahmen, Hinweispflichten, Informationspflichten nach DSGVO zu Spracherkennung und Speicherort, Auftragsverarbeitung bei Cloud Sicherung, Leuchtanzeige als Hinweis); Rückgabe, Widerruf, Vorbestellung, Preisangabenverordnung und Lieferfristen; Funkzulassung und CE Kennzeichnung des Geräts. Die Aussage, die App schreibe Sprache als Text mit und erkenne Erinnerungen, ist eine Funktionsbeschreibung ohne Beleg: Genauigkeit und unterstützte Sprachen im Projekt messen und benennen, kein KI Versprechen ohne Beleg. Keine Gesundheitsaussage. Keine Fotos (siehe `BILDER.md`), keine Presse und Logo Leiste (Fremdlogos und Auszeichnungen wären erfunden), kein Video, kein Entwicklerbereich, kein Vollbild Rabatthinweis. Safari, Screenreader und echte Geräte nicht geprüft. Kontrast der Zeichnungen (Linien auf Fläche alt) ist dekorativ, nicht gemessen.

## Conversion (Playbook)
- Held: Menschen, die unterwegs denken und reden, Problem Einfälle gehen verloren, Lösung Clip mit Aufnahmeknopf und App, 30 Tage Rückgabe als Risikoumkehr
- H1 "Einmal gesagt, nie wieder vergessen", Unterzeile nennt Knopf, App und 30 Tage Test
- Primär-CTA "Jetzt vorbestellen" in Kopf, Held, Einsatz, beiden Paketen und Fuß
- Titel mit Produkt und Nutzen, Beschreibung mit Aufnahme, App und Test
- FAQ: neun Einwände in drei Gruppen (Gerät, Datenschutz, Bestellung), Antworten als Beispiel markiert
- Formularziel: Rückfrage (Name, E-Mail, Telefon, Anliegen, Nachricht), fünf Felder, Hinweise unter E-Mail und Telefon
- Zusagen, Stimmen und Zahlen als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Orientierung, Telefon und Hauptaktion immer erreichbar |
| held | hero | Das Produkt ist der erste Eindruck, groß und mittig, und wächst beim Scrollen |
| verben | features | Stehende Bühne führt durch vier benannte Schritte, Ziffernchips zeigen den Stand |
| bauteile | product | Linienzeichnung mit Markierung erklärt ein Bauteil, klebender Index zeigt den Stand |
| stimmen | testimonials | Kurze Zitate in einrastender Leiste, ehrlich als Beispiel gekennzeichnet |
| einsatz | benefits | Drei Orte mit je einem Satz machen den Alltagsnutzen greifbar |
| bestellen | pricing | Zwei Pakete mit Preis und Rückgabe nehmen die Entscheidung ab |
| faq | faq | Einwände nach Themen hinter Reitern, Kasten holt Unentschiedene ans Telefon |
| kontakt | forms | Wenige Felder mit Hinweis senken die Hürde |
| fuss | footer | Volle Akzentfläche setzt einen Schlusspunkt mit letzter Aktion |
