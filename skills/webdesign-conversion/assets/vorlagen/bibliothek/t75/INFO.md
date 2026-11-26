# t75 Logistik rot, Bildwechsler

Prinzip nach einem Pinterest Screenshot des Inhabers (Logistik Startseite mit rotem Vollflächenabschnitt, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Speditionen, Lagerlogistik, Kurier und Transportdienste mit mehreren Leistungen, einer Angebotsanfrage und einer Sendungsverfolgung. Sachlicher, starker Auftritt in Rot und Weiß mit eckigen Formen. Lebt von klaren Leistungskarten und einer Anfragekarte, die gut sichtbar ist. Ansprache im Sie. Für Betriebe ohne Sendungsverfolgung den Reiter streichen, das Formular bleibt allein.

## Sektionsfolge
Infoleiste mit Telefon, weiße Kopfleiste (klebt beim Scrollen) mit fünf Punkten und rotem Knopf, Held als Bildwechsler (drei Fotos, Pfeile, Pause, Zähler), Leiste mit Kontakt, Standort und roter Kachel mit zwei Vorzügen (überlappt den Held), Über uns mit Text, zwei Vorzügen, gezeichneter Unterschrift und Hochformatfoto mit roter Kennzahlenkarte, drei Leistungskarten mit Fotos und Haken, roter Vollflächenabschnitt mit Text und Haken und einer weißen Formularkarte mit Reitern (Angebot anfragen, Sendung verfolgen) plus dunkler Karriere Kachel, zwei Stimmen, Partnerband, roter Abschnitt Ablauf mit drei Symbolen und großem Foto mit Wiedergabeknopf über den rechten Rand, drei Artikelkarten, Einwand FAQ, dunkler Newsletterstreifen, dunkler Fuß mit vier Spalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bildwechsel alle 6 Sekunden (Überblenden), langsamer Zoom des aktiven Fotos, Pfeile, Pause, Zähler. Pausiert beim Überfahren, bei Fokus und in versteckten Tabs. Bei reduzierter Bewegung startet er angehalten | `stil.js`, `opacity` und `transform` |
| Kennzahl | Wert zählt hoch, Endwert steht im HTML | `data-zaehle` (`bewegung.js`) |
| Unterschrift | Zug wird beim Sichtbarwerden gezeichnet | `stroke-dashoffset`, nur mit JavaScript |
| Leistungskarten | heben sich beim Überfahren (nur Maus), Foto zoomt | CSS, in `@media (hover: hover)` |
| Formularkarte | schiebt beim Scrollen von unten über die Kante des roten Abschnitts hinein (ab Eintritt bis etwa halbe Höhe) | `data-einschub`, `stil.js`, `--einschub`, `transform` |
| Reiter | Umschalten Angebot und Sendung, Pfeiltasten, Home und Ende | `stil.js`, ARIA Tabs |
| Partnerband | läuft aus echten Elementen, Knopf zum Anhalten | `.band` (`basis.css`), Pause per `stil.js` |
| Ablauf | Foto wächst beim Scrollen von etwa 82 auf 100 Prozent, Knopf liegt auf der linken Fotokante | `data-waechst`, `stil.js`, `--wachs` |
| Beispielfilm | Knopf zeigt Wiedergabe und Pause am Poster (langsamer Zoom), ohne Videodatei | `stil.js` |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü, FAQ als Akkordeon | `bewegung.js`, `details` mit `data-exklusiv` |

Bei reduzierter Bewegung und ohne JavaScript steht alles sichtbar und ruhig: Held zeigt das erste Foto, die Formularkarte liegt fest, das Band ist eine umbrechende Reihe, beide Formulare stehen untereinander (ohne JavaScript erscheinen die Reiter nicht). Nur `transform`, `opacity` und `stroke-dashoffset` werden animiert.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Infoleiste, Newsletterstreifen, Fuß, Karriere Kachel), `--text`, `--text-leise`, `--linie`, `--akzent` (Rot `#c01610`, Hauptaktion und roter Vollflächenabschnitt), `--akzent-text`, `--akzent-dunkel` (Hover, Schattenton), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--weiss`, `--schrift-titel` (Archivo), `--schrift-text` (Hanken Grotesk), Radien (eckig: 4 und 6 px), `--ton-1` bis `--ton-3` für Platzhalterflächen.

Gemessene Kontraste: Weiß auf Rot 6,2 zu 1, Rot auf Weiß 6,2 zu 1, Rot auf Hellgrau `#f4f1ee` 5,6 zu 1, `--text-leise` auf Weiß 8,8 zu 1 und auf Hellgrau 7,8 zu 1, Weiß auf Dunkel 17 zu 1, `--text-leise-dunkel` auf Dunkel 9,8 zu 1.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` (er trägt Knopf, Kennzahlenkarte, roten Abschnitt und Kleintext darauf), `--akzent` als Text auf Weiß und auf `--flaeche-alt` (Kicker, Meta, Weiterlesen). Ein hellerer Akzent (Orange, Gelb) braucht dunklen `--akzent-text` und eine Prüfung der Texte im roten Abschnitt. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Texte, Newsletterstreifen, Fuß); das Zeichen ist ein eigenes SVG (`#i-zeichen` und `favicon.svg`). Fotos in `bilder/` ersetzen.

## Offen
Formulare senden nichts, Turnstile ist nur als Kommentar vermerkt. Die Sendungsabfrage ist ein Beispielfeld ohne Funktion und muss im Projekt an das Auskunftssystem angebunden werden. Kennzahl, Namen, Stimmen, Partnernamen, Artikel, Telefon, Adresse, Öffnungszeiten und Karriere Text sind Beispiele, keine Belege. Es sind keine Zertifikate, Zulassungen oder Haftungsaussagen genannt; Haftung, Versicherung und Geschäftsbedingungen sind je Betrieb zu ergänzen und rechtlich nicht geprüft. Die Fotos zeigen keine Logistikfahrzeuge (Hallen, Regale, Förderband, Straße, Fluss), die Hallenbilder im Held sind klein und werden gestreckt, siehe `BILDER.md`. Die Referenz zeigt eine Karte Luftfracht, hier ersetzt durch Wasserweg. Der Beispielfilm hat keine Datei; mit Datei Poster, Pause und Untertitel nach WCAG 2.2.2 ergänzen. Der Fließtext liegt bei 16 px, Tippflächen bei 44 px; Textlinks in Sätzen (Datenschutz) sind kleiner. Kontrast von Text über den Held Fotos ist über den Verlauf gesichert, aber nur mit den drei Beispielfotos gesehen, nicht messtechnisch pro Pixel. Nicht geprüft: Safari, Screenreader, echte Geräte.

## Conversion (Playbook)
- Held: Händler und Hersteller im Mittelstand, deren Ware zu spät oder ohne Status ankommt; Lösung ist Abholung zum festen Termin mit Sendungsnummer und einem Ansprechpartner
- H1 "Pünktlich beim Kunden: Spedition und Lager für den Mittelstand", Unterzeile mit 20 Wörtern
- Primär-CTA "Angebot anfragen" in Kopf, Held, allen drei Leistungskarten, Formular und; der Newsletter heißt bewusst "Anmelden"
- Titel (53 Zeichen) mit Branche, Ort und Aufruf, Beschreibung (132 Zeichen) mit Nutzen und Aufruf
- FAQ mit fünf Einwänden (Dauer bis zum Angebot, Preis, Verfolgung, Verspätung und Schaden, Mindestmenge), Antworten als Beispiel gekennzeichnet
- Formularziel: Angebotsanfrage mit fünf Feldern (Name, E-Mail, Telefon, Transportart, Strecke), Feldhinweis unter E-Mail und Telefon; Sendungsabfrage mit einem Feld
- Telefon: Infoleiste, Kontakt Leiste und Fuß als `tel:` Link
- JSON-LD `LocalBusiness` mit Beispielwerten im Kopf
