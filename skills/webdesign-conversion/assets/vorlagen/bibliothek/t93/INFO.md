# t93 Kfz Werkstatt Blau und Schwarz

Prinzip nach einem Pinterest Screenshot des Inhabers (Kfz Werkstatt, Startseite, Quelle unbekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kfz Werkstätten, Autolackierer und Reifenservice, die Anrufe, WhatsApp Nachrichten und Terminanfragen wollen. Lebt von Telefon und Öffnungszeiten ganz vorn, drei Kacheln direkt unter dem Held (Kontakt, Rückruf, Tipps), dem Ablauf in Pfeilfeldern und Leistungskarten. Auch für Reifenhandel, Karosserie, Fahrzeugpflege oder Autoglas geeignet. Ansprache im Sie.

## Sektionsfolge
Kopf mit Logo, Kontaktblöcken (Telefon, WhatsApp, Öffnungszeiten) und Hauptknopf, darunter blaue Menüleiste mit schrägem Anschnitt; Held (Halle als Hintergrund, Mechaniker rechts in schräger Form mit blauem Streifen, Überschrift, zwei Knöpfe, Beispielbewertung); drei Kacheln über der Held Kante (Kontakt und Öffnungszeiten, Rückruf mit zwei Feldern, Tipps mit Pfeilen); Warum wir (vier Vorzüge, Auto als Zeichnung); schwarz blauer Aktionsbanner mit schräger Kante (Beispielaktion, Über die Werkstatt, Kennzahlen, Mechaniker); Ablauf in drei Pfeilfeldern; Leistungen auf Marine (fünf Karten, Pfeile); Terminformular links mit fünf Feldern, Kundenstimmen rechts; Fragen; Streifen mit Erinnerung (E-Mail) und zweitem Knopf, schräge Kante; Tipps aus der Werkstatt (drei Beiträge); Partnerband mit Pause; Kontaktleiste (Adresse, Telefon, Mail); Fuß mit vier Spalten und Öffnungszeiten. Auf dem Handy feste Leiste unten (Anrufen, WhatsApp, Termin).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Hintergrund zoomt beim Laden von 1,14 auf 1, beim Scrollen wachsen Hintergrund und Mechanikerfoto leicht (ab Desktop) | CSS (`transform`), `stil.js` (`--schub`) |
| Kacheln | schieben sich beim Scrollen über die Held Kante nach oben, blenden gestaffelt ein | `stil.js` (`--schub`), `data-zeig` |
| Auto | fährt beim Scrollen von rechts ein, die Räder drehen sich | `stil.js` (`--lauf`), CSS (`transform`) |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Ablauf | die drei Pfeilfelder fahren nacheinander von links ein | `data-zeig="links"` mit `data-staffel` |
| Leistungen und Beiträge | Karte hebt sich beim Überfahren, Bild zoomt, Lichtstreifen wischt über das Bild (nur Zeiger) | CSS (`transform`) |
| Tipps, Leistungen, Stimmen, Beiträge | Wischspur mit Pfeilknöpfen (am Anfang und Ende gesperrt), bei Stimmen mit Punkten | `stil.js`, `scroll-snap` |
| Partnerband | läuft, Knopf hält es an | `.band`, `stil.js` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden, Menü auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy steht alles ruhig und sichtbar, Wischspuren bleiben wischbar, das Partnerband steht still (nur das erste Band, mit Wischleiste). Ohne JavaScript bleibt das Menü auf dem Handy aufgeklappt.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Marine), `--schwarz`, `--text`, `--text-leise`, `--linie`, `--akzent` (Hauptblau), `--akzent-dunkel` (Kacheln, Pfeilfelder), `--akzent-text`, `--signal` und `--signal-text` (Hauptknopf auf dunklem und blauem Grund), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--akzent-hell` (Zeichen und Kicker auf Dunkel), `--feld-rand`, `--schrift-titel` (Archivo), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6`.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` und `--akzent-dunkel` (gemessen 6,9 und 10,4 zu 1), `--signal-text` auf `--signal` (11,8), `--text-leise-dunkel` auf Marine und Schwarz (über 10), `--text-leise` auf `--flaeche-alt` (6,8). Der Name "Markenname" steht in Titel, Logo, Texten, Fuß und JSON-LD. Das Logozeichen (Pfeilsymbol `#i-zeichen`) ist eigen, das Favicon `favicon.svg` trägt die Markenfarben. Die schrägen Kanten stehen als `clip-path` in `stil.css` (Kopf, Held, Banner, Pfeilfelder, Streifen), die Schnitttiefe steuert `--schnitt`, die Spitze der Pfeilfelder `--spitze`.

## Offen
Formulare senden nichts. Rabattaktion, Prozentwert, Kennzahlen, Bewertungen, Stimmen, Namen, Öffnungszeiten, Adresse, Telefon und Partnerzeichen sind Beispiele, keine Belege. Preisangaben (Preisangabenverordnung), Werberecht, Aktionsbedingungen und der Hinweis "Meisterbetrieb" sind je Betrieb zu klären, rechtlich nicht geprüft; ohne Zeitdruck oder Zähler gebaut. Es gibt keine Fahrzeugfotos in der Bibliothek, das Auto ist eine Zeichnung, mehrere Beispielfotos zeigen Strom und Heizung statt Kfz. Das Heldfoto hat 600 Pixel Breite und wirkt auf großen Bildschirmen weich. Kontrast von Text über dem Hintergrundfoto im Held und im Banner nur mit Verlauf geschätzt, mit echten Fotos neu prüfen. Die Kopfzeile ist nicht fixiert (auf dem Handy trägt die untere Leiste den Kontakt). Zwölf Links (Beiträge, Rechtstexte) sind Platzhalter mit `href="#"`. WhatsApp Link `wa.me` ist eine Beispielnummer.

## Conversion (Playbook)
- Held: Autofahrer, deren Auto kaputt oder zerkratzt ist, Lösung Reparatur und Lackierung mit Festpreis vorab und festem Termin
- H1 "Auto kaputt oder zerkratzt? Wir bringen es zurück auf die Straße", Unterzeile nennt Inspektion, Lackierung, Reifen, Festpreis, alle Marken
- Primär-CTA "Termin vereinbaren" in Kopf, Held, Kachel, Banner, Ablauf (Leistungskarten), Formular, Streifen und fester Handyleiste; zweiter Weg "Jetzt anrufen" und WhatsApp
- Telefon in Kopf, Kachel, Kontaktleiste und Handyleiste als `tel:`
- Titel mit Keyword und Musterstadt, Beschreibung mit Problem, Nutzen und Aufruf
- FAQ: Kosten, Terminzeit, Marken, Bringservice, Mitbringen (Antworten als Beispiel gekennzeichnet)
- Formularziel: Terminanfrage (Name, Telefon, E-Mail, Fahrzeug, Wunschtermin), fünf Felder; Rückrufkachel mit zwei Feldern
- Beispielbewertung im Held als "(Beispiel)" gekennzeichnet; Aktion nur als Beispiel, kein Zeitdruck
- JSON-LD `AutoRepair` mit Beispielwerten
