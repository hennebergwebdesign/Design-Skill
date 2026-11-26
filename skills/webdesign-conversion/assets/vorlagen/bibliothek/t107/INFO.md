# t107 SaaS Agentur Nachtgrün

Prinzip nach https://rocket-saas.io/ (Marketingagentur für B2B SaaS, Startseite, eigene Aufnahme am 26.11.2026 bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Zeichen, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Marketingagenturen für B2B Software und SaaS, auch Beratungen für Wachstum und Demand Generation, Performance Agenturen und Freelance Teams, die als Verstärkung oder Abteilung auf Zeit auftreten und über Fallbeispiele und ein kostenloses Erstgespräch Anfragen gewinnen. Ansprache im Sie. Lebt von klarer Botschaft, Fallbeispielen und der dunklen Bühne. Abgesetzt von t44, t45, t49, t70, t78 (Software, Produktoberflächen) und t98 (Beratung, Pastell) durch dunkelgrünen Grund mit Bernstein, Orbit Szene statt Foto im Held, gestrichelte Rasterspalten und gekippte Fallbeispiel Oberflächen.

## Sektionsfolge
Kopfleiste (transparent über der Bühne, nach dem Scrollen hell über die volle Breite, Knopf Strategiegespräch), dunkle Bühne mit großem Radius unten: Held (H1, Unterzeile, Lead, zwei Knöpfe, Telefon, Orbit Szene rechts), Problem (drei Spalten, gestrichelte Linien), Einstieg (Leistungen in fünf Feldern, großer Ring), danach hell: Team (vier Porträtkarten mit Rahmen), Zielgruppen (zwei dunkle Karten mit SVG Zeichnung), Über uns (Foto in Rundform, Planet, Rasterlinien), Einzelzitat, Werkzeugband mit Pause, Fallbeispiele (zwei Karten mit gekippter Oberfläche, drei Kennzahlen, Zitat, Abschlusszeile mit Knopf), Preise (drei Pakete, mittleres abgesetzt), Fragen (Akkordeon), Kontakt (Rand in Dunkelgrün, darin Formular), Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Text staffelt ein, Szene skaliert ein | `data-zeig`, `bewegung.js` |
| Orbit Szene (Signatur) | drei Kanalzeichen kreisen auf einem Ring um die Anfragekarte und bleiben dabei aufrecht (Gegendrehung), Karte und Blasen schweben, Säulen der Karte wachsen nacheinander, Zahl zählt hoch | CSS (`transform`), `data-zaehle`, `stil.js` setzt nur den Index |
| Problem, Einstieg, Team, Fälle, Pakete | Felder und Karten blenden gestaffelt ein | `data-staffel`, `data-zeig` |
| Einstieg, Über uns | Ring und Planet driften leicht gegen die Scrollrichtung | `data-parallax` |
| Zielgruppen | Zeichnung hebt sich beim Überfahren | CSS (`transform`), nur mit Maus |
| Fallbeispiele | gekippte Oberfläche richtet sich beim Überfahren auf | CSS (`transform`), nur mit Maus |
| Fälle, Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Werkzeugband | läuft, Pause per Schalter (Checkbox, ohne JavaScript) und beim Überfahren, bei reduzierter Bewegung statisch | CSS (`transform`), echte Elemente |
| Pakete, Team | Karte hebt sich, Foto skaliert leicht beim Überfahren | CSS (`transform`), nur mit Maus |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Kopf | helle Leiste nach dem Scrollen, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |

Beobachtet an der Referenz (nur Beobachtung, kein Code): Felder blenden beim Scrollen gestaffelt von unten ein (etwa 0,5 bis 0,8 s), schwebende Blasen am Held, gestrichelte Spaltenlinien, Kopfleiste wird nach dem Scrollen weiß, laufendes Logoband, gekippte Fall Oberflächen. Die kreisende Szene, die wachsenden Säulen und die aufrichtende Oberfläche sind eigene Bewegung. Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Bernstein, Fläche mit dunklem Text), `--akzent-text`, `--dunkel-2`, `--dunkel-3`, `--mint`, `--koralle` (Zeichen und Icons), `--himmel` (helle Karte), `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), Radien (`--radius-gross` fließend).

## Marke wechseln
Nur `marke.css` ändern. Kontrast nachgerechnet (WCAG, 26.11.2026): `--text` auf Creme 13,9 und auf `--flaeche-alt` 12,4, `--text-leise` auf Creme 6,7, auf `--flaeche-alt` 5,9, auf `--himmel` 5,9, `--akzent-text` auf `--akzent` 8,3, `--text-auf-dunkel` auf Dunkelgrün 13,8 und auf `--dunkel-3` 15,9, `--text-leise-dunkel` auf Dunkelgrün 8,2, auf `--dunkel-2` 6,7, auf `--dunkel-3` 9,4, `--mint` auf Dunkelgrün 9,8. Fokusring: Bernstein auf Dunkel 8,3, Dunkelgrün auf Hell 13,9. Eingaberand `--feld-rand` auf `--dunkel-3` 4,2 (Feld ist hell gefüllt, der Rand ist nur Zusatz). Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das Markenzeichen ist ein SVG Symbol (`#i-zeichen`) in `index.html` und `favicon.svg`.

## Offen
Formulare senden nichts. Kennzahlen, Zitate, Namen, Fallbeispiele, Pakete und Preise, Fragen und Antworten, Werkzeugzeichen sind Beispiele, keine Belege. Alle Personenfotos sind Beispiele aus der Bibliothek, dasselbe Porträt steht bei Zitat und Kontakt; vor Abgabe durch Fotos des Teams mit Einwilligung ersetzen (Nachweis in `BILDER.md`). Das Vorbild zeigt eine 3D Rakete und Videostimmen, hier steht eine Orbit Szene aus HTML und CSS und kein Film. Die Leistungsversprechen (Ergebnisse, Kosten je Anfrage) sind Beispielwerte, vor Livegang auf Wettbewerbsrecht (UWG, Werbung mit Zahlen) und Einwilligung der genannten Kunden prüfen, rechtlich nicht geprüft. Preise netto ohne Gewähr. Der Kontrast des Rands der Eingabefelder auf dem dunklen Grund liegt bei 4,2 zu 1. Die Säulen in der Karte wachsen 0,9 s lang (bewusst, große Fläche, nicht bedient). Safari, Screenreader und echte Geräte nicht geprüft. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen). Die Szene ist für Bildschirmleser eine Beschreibung (figcaption), nicht bedienbar.

## Conversion (Playbook)
- Held: Marketingleitung und Geschäftsführung von B2B Software mit kleinem oder ohne Marketingteam, Problem zu wenige qualifizierte Demoanfragen und zu wenig Kapazität, Lösung Marketingagentur als Verstärkung oder Abteilung auf Zeit
- H1 "SaaS Marketing für B2B Software mit kleinem Marketingteam", Unterzeile nennt Agentur, Ort und Fach, Lead nennt Problem und Lösung
- Primär CTA "Strategiegespräch buchen" in Kopf, Held, Über uns, Fallbeispielen, Formular und Fuß, sonst nur Zweitknöpfe
- Titel mit Keyword und Musterstadt, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Zeit bis zu Ergebnissen, Werkzeuge, Kosten und Laufzeit, Erfolgsmessung, bestehendes Team, Ablauf des Gesprächs
- Formularziel: Strategiegespräch (Name, E-Mail, Unternehmen, Budget, Anliegen), fünf Felder, Hinweis unter E-Mail
- Kennzahlen, Zitate und Preise als "Beispiel" gekennzeichnet; keine Garantie, keine festen Ergebniszusagen
