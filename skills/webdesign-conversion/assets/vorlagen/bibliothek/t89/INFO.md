# t89 Rad App sportlich

Prinzip nach einem Pinterest Screenshot des Inhabers (Fahrrad Fitness App, weiß mit Schwarz und einem Grün, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Apps und Angebote rund um Rad, Fitness und Vereinssport: Streckenplanung, Aufzeichnung, Ausfahrten, Vereinsgruppen, Videotraining, Radreisen. Passt auch für andere Apps mit Fortschrittsanzeige, wenn die Telefonansichten ausgetauscht werden. Ansprache im Du. Lebt von einem Foto, das die Sportart zeigt (Radfahrende), und von Telefonansichten, die echte Bildschirme der App abbilden.

## Sektionsfolge
Kopf (Wortmarke, vier Punkte und Telefon, Anmelden als Zweitknopf, App laden als Primärknopf), Held als Fotokarte mit zentrierter Überschrift und zwei Store Knöpfen, Einführung als großer Absatz mit drei Beispielkennzahlen und Knopf, Funktionen (Telefon links, nummerierte Liste rechts, 01 offen), dunkler geteilter Abschnitt mit Text links und Foto mit kippendem Telefon rechts, Stimmen als Kartenraster (linke Spalte läuft aus), Fragen, Kontakt (Link zur App per E-Mail, vier Felder), grüner Abschnitt mit Store Knöpfen und schwebendem Telefon, schwarzer Fuß mit vier Spalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto bewegt sich langsamer als die Seite (Parallaxe) | `data-parallax`, `bewegung.js` |
| Einführung | Wörter des Absatzes hellen beim Scrollen auf | `data-licht` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Funktionen | Telefon steigt beim Scrollen ein (`--steig`) | `stil.js`, CSS (`transform`) |
| Streckenlinie | zeichnet sich im Telefon (`stroke-dashoffset`), auch bei jedem Wechsel der Ansicht | `stil.js` setzt `gezeichnet`, CSS |
| Liste | Eintrag öffnen wechselt die Telefonansicht (01 Strecke, 02 Fortschritt, 03 Ausfahrten, 04 Verein) | `stil.js`, `details` mit `data-exklusiv` |
| Lernabschnitt | Telefon kippt leicht mit dem Scrollweg (`--kipp`) | `stil.js`, CSS (`transform`) |
| Stimmen | Karten gestaffelt | `data-staffel`, `data-zeig` |
| Grüner Abschnitt | Telefon schwebt (6 s), steigt ein, unten angeschnitten | CSS (`translate`), `stil.js` |
| Abschnitte | Einblenden, Menü als Fläche auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy: alles sichtbar und bedienbar, Streckenlinie gezeichnet, Telefone stehen still, Ansicht 01 steht ohne JavaScript. Die Karten der Stimmen stehen auf dem Handy als Einzelspalte, ohne Verlauf.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Grün, Fläche mit hellem Text, auch Fläche des grünen Abschnitts), `--akzent-text`, `--akzent-hell` (nur auf Dunkel), `--text-auf-dunkel`, `--text-leise-dunkel`, `--text-auf-gruen`, `--text-leise-gruen`, `--gerat` (Telefonrahmen, Store Knöpfe), `--karte-karte`, `--karte-wasser`, `--karte-park` (Kartenfarben im Telefon), `--feld-rand`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien. Gemessen: Weiß auf Akzent 6,6 zu 1, leiser Text auf Grün 5,6 zu 1, leiser Text auf Dunkel 11,1 zu 1, `--text-leise` auf Weiß 7,0 und auf `--flaeche-alt` 6,4 zu 1, Held Weiß über dem Foto mit Verlauf mindestens 8 zu 1 (Pixel gemessen bei 1440 und 390).

## Marke wechseln
Nur `marke.css` ändern. Der Name "Markenname" steht in Titel, Wortmarke, Fuß und Daten. Die Wortmarke nutzt das Radsymbol aus `#i-rad` (eigenes Zeichen, ersetzen). Die Telefone sind Bausteine aus HTML und CSS (`.phone`, `.screen`): Ansichten gegen echte Screenshots oder eigene Oberflächen tauschen, Größe über `--pw`. Die gezeichnete Karte (`#karte`) ist ein Platzhalter, keine echte Strecke.

## Offen
Formulare senden nichts. Alle Zahlen (Nutzer, Kilometer, Vereine), Bewertungen, Namen, Strecken, Termine, Tarife und Antworten sind Beispiele, keine Belege (`data-beispiel`, Hinweiszeilen). Das Heldfoto zeigt eine Person in den Bergen, **kein Rad**, vor der Abgabe durch ein Foto mit Radfahrenden ersetzen; es ist ein Hochformat und im Held leicht vergrößert. Texte in den Telefonen sind Bildschirmattrappe (`aria-hidden`) und kleiner als 16 Pixel, wie ein Bild. Die Store Knöpfe sind neutral und verweisen auf `#laden`: im Projekt die echten Store Adressen und die vorgeschriebenen Badges der Stores einsetzen. Datenschutz bei Standortdaten, Gesundheitsbezug und Einwilligung je Kunde prüfen und rechtlich nicht geprüft; es gibt bewusst keine Gesundheits-, Leistungs- oder Abnehmversprechen, der Lernabschnitt grenzt sich von Training mit Fachperson und ärztlicher Beratung ab (Formulierung je Kunde prüfen). Der Verlauf über den Fotos (Held, Lernabschnitt) ist für das gelieferte Foto gemessen, nach einem Fototausch neu prüfen. Die linke Spalte der Stimmen läuft ab 1000 Pixel Breite per Maske aus, ihr Kontrast ist dort bewusst nicht erfüllt (dekorativ, der Text bleibt im Dokument). Kopf ist `position: sticky`, Anker haben `scroll-margin-top`. Nicht getestet: Safari, Screenreader, echte Geräte.

## Conversion (Playbook)
- Held: Radfahrende, die Touren planen und dranbleiben wollen; Problem: Strecken, Training und Verein liegen in drei Apps; Lösung: eine Rad App
- H1 "Deine Touren, dein Training, dein Verein in einer Rad App", Unterzeile nennt Strecken planen, Fortschritt sehen, Ausfahrten finden
- Primär-CTA "App laden" in Kopf, Einführung und Lernabschnitt, dazu Store Knöpfe im Held und im grünen Abschnitt, Formular "Link zur App senden"
- Titel mit Keyword und Musterstadt, Beschreibung mit Nutzen und Aufruf
- FAQ: Kosten, Sensor, Standortdaten, Verein, Radreisen (fünf Einwände, Beispielantworten)
- Formularziel: Download Link per E-Mail (Vorname, E-Mail, Telefon freiwillig, Interesse), vier Felder, Feldhinweise unter E-Mail und Telefon
- Beleg: Kennzahlen und Bewertungen als Beispiel gekennzeichnet; Telefon im Kopf, in Fragen, Kontakt und Fuß
- JSON-LD: MobileApplication und FAQPage mit Beispielwerten
