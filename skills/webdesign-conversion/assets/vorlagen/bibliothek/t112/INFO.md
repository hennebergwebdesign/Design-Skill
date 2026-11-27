# t112 Wertegemeinschaft App mit Manifest

Prinzip nach https://pocketchangethe.world/ (Startseite einer App zum Entdecken wertegeleiteter Betriebe, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Beispielbranche: App für regionale Handwerks und Gastro Betriebe in Deutschland.

## Eignung
Apps, Plattformen und Bewegungen mit Haltung, die ein Gefühl verkaufen, bevor sie eine Funktion zeigen: Regionalmärkte, Genossenschaften, Nachhaltigkeits und Gemeinwohl Apps, Mitgliedschaften. Lebt von wenig Text pro Bildschirm, einem klaren Download als Ziel und einer zweiten Zielgruppe (Betriebe). Ansprache im Du. Ungeeignet für erklärungsintensive Produkte mit vielen Daten, dafür trägt die Seite zu wenig Text.

## Sektionsfolge
Kopfzeile auf dem Verlauf (Menü, Telefon, Knopf "App laden"); Held (Verlauf, Überschrift links, zwei überlappende Handys rechts, Store Knöpfe); Branchenkarten als gedrehter Fächer; Manifest (gepinnt, fünf Sätze, fallende Taler); Aufruf (Aussage, Handy, Knopf); Satzband (ein Satz läuft waagerecht); Funktionen (fünf H3 im Raster mit Handy); Ablauf (Akkordeon, vier Schritte); Für Betriebe (Formular); Fragen (sechs Einwände); Schluss (großer Knopf); Newsletter; Fuß mit Datenhinweis.

## Beobachtet, abgeleitet, unbekannt
Beobachtet (Live Aufnahme, 1440 und 390): Seitenhöhe 22977 px Desktop und 11274 px mobil; Held als roter bis oranger Vollflächenverlauf, H1 96 px Gewicht 300, mobil 48 px; zwei überlappende, gekippte Handys; Store Knöpfe; Branchenkarten als überlappender, gedrehter Fächer mit Bildern und Beschriftung; Taler fallen über die Aussagen; Aussagen in großer Typo, je eine pro Bildschirm; große Überschrift läuft waagerecht durchs Bild; fünf Funktionen als H3 in Karten, mobil gestapelt (sticky, Karten je 360 px hoch); Schritte als Akkordeon; Schlussknopf, Newsletter; Cookie Leiste fest unten; vier Canvas Elemente Desktop und zwei mobil, kein Video. Abgeleitet: Taler laufen über den Scrollweg, Aussagen sind gepinnt (mehrere sticky und fixed Ebenen mit 900 px Höhe gemessen). Unbekannt: Hover, Zeitverläufe, Verhalten bei Zwischenbreiten, genaue Scrollstrecke je Aussage.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Zwei Handys schweben gegenläufig, 7 s, 0,9 rem | CSS `transform` (Schweben), nur bei no-preference |
| Branchen | Karten staffeln ein, beim Überfahren richtet sich die Karte auf | `data-zeig`, `data-staffel`, CSS `rotate` und `translate` |
| Manifest | Signatur 1: Bühne pinnt (600 svh), je ein Satz pro Fünftel des Scrollwegs blendet ein und aus, sechs Taler fallen mit unterschiedlichem Tempo und drehen sich | `--fortschritt` aus `bewegung.js`, Sichtbarkeit rein in CSS (`opacity`, `transform`) |
| Aufruf | Handy steigt leicht gegen die Scrollrichtung | `data-parallax` |
| Satzband | Signatur 2: Bühne pinnt (320 svh), ein riesiger Satz läuft waagerecht von links nach rechts durchs Bild | `--fortschritt`, CSS `transform` |
| Funktionen | Auf dem Handy stapeln sich die Karten beim Scrollen | CSS `position: sticky` |
| Ablauf, Fragen | Akkordeon, ein Eintrag offen, Pfeil dreht | `data-exklusiv`, CSS |
| Schluss | Zwei Taler schweben | CSS `transform` |
| Kopf | Menü als Panel auf dem Handy | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript pinnt nichts: Sätze stehen untereinander (je 70 svh), Taler stehen still im Fluss, das Satzband bricht um, nichts läuft. Gemessen: Seitenhöhe mit Pinnen 16549 px Desktop und 18297 px mobil, ohne 11936 px und 13761 px. Performance Budget: zwei Bühnen pinnen (600 svh und 320 svh), sechs Taler und ein Satz bewegen sich, nur `transform` und `opacity`, `will-change` nur dort. Leistung auf schwachen Geräten ungemessen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--verlauf-a`, `--verlauf-b`, `--verlauf-c`, `--verlauf-licht`, `--muenze`, `--muenze-tief`, `--muenze-text`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--karte-dunkel`, `--feld-rand`, `--kachel-1` bis `--kachel-5`, `--schrift-titel` (Outfit), `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht` (300), `--titel-spur`. Der Verlauf selbst steht als `--verlauf` in `stil.css` und liest die drei Verlauf Tokens.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet, WCAG): Weiß auf `--verlauf-a` 12,1 zu 1, auf `--verlauf-b` 8,0, auf `--verlauf-c` 5,3 (hellste Textstufe, der Lichtfleck `--verlauf-licht` liegt nur hinter den Handys); `--text-auf-dunkel` auf `--verlauf-c` 4,7; `--text` auf `--flaeche` 14,4, auf `--flaeche-alt` 13,1; `--text-leise` auf `--flaeche` 6,3, auf `--flaeche-alt` 5,7; `--akzent-text` auf `--akzent` 10,7; `--muenze-text` auf `--muenze` 9,7; `--muenze` auf Tannennacht 9,8 (Satzband, Knöpfe); `--text-auf-dunkel` auf Tannennacht 14,5, auf `--karte-dunkel` 12,7; `--text-leise-dunkel` auf Tannennacht 9,2, auf `--karte-dunkel` 8,1; Weiß auf den Branchenkacheln am unteren Rand (Kachel mit 50 Prozent Schwarz) mindestens 10,5. Rand der Eingabefelder auf Weiß 4,4 zu 1 (Bedienelement, Mindestwert 3 zu 1). Taler, Kachelfarben und Lichtfleck sind nie Textfarbe auf Hell. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Wird der Verlauf heller, Text auf `--verlauf-c` neu rechnen. Statt Tannengrün trägt auch ein anderer dunkler Verlauf, wichtig sind drei Stufen, auf denen Weiß mindestens 4,5 zu 1 hat.

## Offen
Formulare senden nichts. Store Knöpfe sind Textknöpfe ohne Fremdlogos und verlinken nirgendwohin, Store Links einsetzen und die Markenrichtlinien der Stores beachten. Preise, Modell, Punkteregeln, Name, Betriebe, Zahlen und Antworten sind Beispiele, keine Belege. Cookie Hinweis: Die Referenz zeigt eine feste Cookie Leiste unten. Sie ist bewusst nicht nachgebaut, weil diese Vorlage keine Cookies setzt und eine solche Leiste Tracking vortäuschen würde. Statt dessen steht im Fuß ein ehrlicher Hinweis; setzt das Projekt Statistik oder Einbettungen ein, gehört ein echter Einwilligungsdialog her, der erst nach Zustimmung lädt, "Alle akzeptieren" und "Nur notwendige" gleichwertig anbietet und widerrufbar ist. Die Referenz nutzt Canvas Elemente für die Taler, hier sind es SVG Zeichen, kein Video, keine Fotos von Betrieben (Branchenkarten sind Flächen mit Zeichen). Datenschutz, Punkte und Einlösung (Gutscheinrecht), Newsletter Einwilligung und Barrierefreiheitserklärung sind rechtlich nicht geprüft. Die Handys sind dekorativ und für Screenreader ausgeblendet, die Aussagen stehen im Text daneben. Das Kontrollkästchen des Newsletters ist 24 px groß, der Klickbereich ist die ganze Beschriftung. Safari, Screenreader und echte Geräte nicht geprüft.

## Conversion (Playbook)
- Held: Menschen, die vor Ort einkaufen wollen (Zielgruppe), gute Betriebe sind schwer zu finden (Problem), eine App zeigt Betriebe mit gleichen Werten und belohnt den Einkauf (Lösung), kostenlos (Risikoumkehr, als Beispiel)
- H1 "Finde die Betriebe, die du unterstützen willst", Unterzeile nennt Gewerke, Nutzen und Preis
- Primär CTA "App laden" in Kopf, Held, Aufruf, Ablauf, Schluss und Fuß
- Titel mit Nutzen, Beschreibung mit Zielgruppe und Handlung
- FAQ: Kosten, Geschäftsmodell, Auswahl der Betriebe, Daten, Einlösen, fehlender Betrieb
- Formularziel: Aufnahme für Betriebe (Name, Gewerk, E-Mail, Telefon, Text), fünf Felder, Hinweise unter E-Mail und Telefon; zweites Ziel Newsletter mit einem Feld
- Zusagen, Zahlen und Antworten als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
Ausführlich in `ABSCHNITTE.json`.

| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Leiste liegt als Schrift auf dem Verlauf, der erste Bildschirm gehört der Aussage |
| held | hero | Große leichte Überschrift gegen zwei gekippte Handys, Verlauf gibt Stimmung ohne Foto |
| branchen | services | Gedrehter, überlappender Kartenfächer zeigt Bandbreite sofort |
| manifest | editorial | Ein Satz pro Bildschirm, gepinnt, fallende Zeichen geben Tempo |
| aufruf | product | Aussage, Handy mit Inhalt und Knopf direkt nebeneinander |
| satzband | editorial | Ein riesiger Satz läuft über den Scrollweg quer durchs Bild |
| funktionen | features | Vier Karten um ein Handy, mobil gestapelt |
| ablauf | process | Vier Schritte, einer offen, nimmt die Scheu vor dem Anfangen |
| betriebe | forms | Zweite Zielgruppe mit eigenem Abschnitt und fünf Feldern |
| fragen | faq | Sechs Einwände vor dem Laden |
| schluss | cta | Eine Aussage, ein übergroßer Knopf, Zeichen des Manifests |
| brief | forms | Ein Feld und ein Haken |
| fuss | footer | Ehrlicher Datenhinweis statt vorgetäuschter Cookie Leiste |
