# t53 Finanzdienst, Rundbänder (zwei Varianten)

Prinzip nach der freigegebenen Referenz Corpotech (Tor 1 erteilt, Startseiten Variante 1 und Variante 2), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Die Geräte (Tablet, Telefon, Karten) sind aus CSS gezeichnete Platzhalter, keine Abbildungen.

Ein Template, zwei Varianten: `index.html` ist Variante 1 (Auf Hell), `v2.html` ist Variante 2 (Auf Dunkel). Beide teilen `marke.css` (Marke einmal einstellen), `stil.css` (Gemeinsames und Variante 1) und `stil.js`. Variante 2 lädt zusätzlich `stil-v2.css`. Kopf, Fuß, Name und Logo sind gleich.

## Eignung
Banken, Finanzberatung, Versicherungen, Fintech, Buchhaltung, Software mit Konto oder App. Passt, wo eine Anwendung gezeigt werden soll (Telefon, Tablet) und der Betrieb Vertrauen über Klarheit statt über Marmor und Gold aufbaut. Ansprache im Du, für Sie im Text ersetzen. Rechtlich heikel: Renditeaussagen, Zinssätze und Risikohinweise vor dem Einsatz prüfen lassen, die Platzhaltertexte sind keine Aussagen.

## Sektionsfolge

Variante 1, "Auf Hell" (`index.html`): transparente Kopfleiste, zentrierter Held (Titel, Satz, zwei Knöpfe), Tablet über einem dunklen Band mit runder Unterkante und Vertrauensleiste, Abgrenzung (Bild links, zwei Aussagen), Funktionen (zwei große Karten, eine breite), Ablauf (Titel, Karte mit Telefon, Akkordeon), Zahlenblock (dunkel, Bild links, versetzte Zahlen), Zielgruppen als Reiter, Safranband mit Formular, Stimmen (breite Karten mit Pfeilen), Ratgeber (zwei Beiträge), dunkler Fuß mit runder Oberkante.

Variante 2, "Auf Dunkel" (`v2.html`): Held auf dunkler Fläche (Text links, Telefon rechts, runde Unterkante), Funktionen als Raster aus sechs Karten (die letzte als Aufruf in Safran), Abgrenzung (Text und Logoraster links, Bild rechts), Zahlen (Text links, vier große Zahlen rechts auf hellem Grund), Schritte (dunkle Fläche, Bild links mit runder Ecke, Nummernliste 01 bis 03), Zielgruppen (Bild mit überlappender Karte, Punkte), Safranband mit Telefon links und Formular rechts, Stimmen (drei Karten sichtbar, Pfeile), Ratgeber (ein großer Beitrag), Fuß mit fünf Spalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, Staffelung, Zähler mit Endwert im HTML | `data-zeig`, `data-staffel`, `data-zaehle` |
| Kopf | transparent über dem Held, wird beim Scrollen fest (V1 weiß, V2 dunkel), Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` (`gescrollt`), CSS |
| Ablauf (V1) | Akkordeon, Plus dreht zum Kreuz, nur eines offen | `details` mit `data-exklusiv` |
| Zielgruppen | Reiter (V1) oder Punkte (V2) wechseln die Tafel, Pfeiltasten gehen mit, ohne JavaScript stehen alle Tafeln untereinander | `stil.js` |
| Stimmen | Spur mit Scroll Snap und Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Karten | heben sich beim Überfahren, Knopfpfeil rutscht schräg | CSS (`transform`) |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, mit JavaScript bleibt sie stehen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Safran, Fläche mit dunklem Text), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Hanken Grotesk), Radien (`--radius-karte`, `--radius-gross`), `--ton-1` bis `--ton-6`.

## Marke wechseln
Nur die Werte in `marke.css` ändern, beide Varianten folgen. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent-tief` auf `--flaeche` und `--flaeche-alt`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, je Datei drei Stellen), Platzhalterflächen durch Fotos oder echte Bildschirmbilder ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Zahlen, Salden, Buchungen, Stimmen, Namen, Telefon, Adresse und Logos sind Beispiele, keine Belege. Die CSS Geräte sind schematisch, echte Produktbilder fehlen. Kontrast der schwebenden Karten über den Platzhaltern nach dem Einsetzen echter Bilder neu prüfen. Links im Fuß (Impressum, Datenschutz, Karriere, Widerruf) sind Platzhalter. Die Varianten sind nicht untereinander verlinkt, die Auswahl macht die Galerie.

## Conversion (Playbook)
- Held in beiden Varianten: Zielgruppe Privatkunden, Gründende und kleine Betriebe, Problem unklare Gebühren und wechselnde Ansprechpartner, Lösung eine Anwendung mit fester Ansprechperson. `index.html`: „Dein Geld im Griff, jede Gebühr vorab klar“, `v2.html`: „Eine feste Ansprechperson für dein Geld“.
- Primär CTA: Beratung anfragen an allen Stellen (Kopfzeile, Held, Tafeln, Formular, Fuß).
- Titel mit Ort Platzhalter (Musterstadt), Beschreibung nach Formel, je Variante eigen.
- FAQ für Finanzkunden: Gebühren, Einrichtung, Vorwissen, Sicherheit, Kontrollfrage „Was kostet es mich, wenn ich nichts ändere?“. `index.html` hat die Sektion Fragen (`#fragen`) jetzt auch (vorher nur `v2.html`), Regeln `.fragen__liste` in `stil.css`.
- Formularziel: Terminbestätigung für eine Beratung, ein Feld (Mail).
- Rechtlich heikel: Zusagen zu Gebühren, Sicherheit und Konditionen in den Antworten sind Beispiele und vor dem Einsatz prüfen zu lassen.
