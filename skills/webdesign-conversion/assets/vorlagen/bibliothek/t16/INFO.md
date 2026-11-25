# Gartenbühne (t16)

**Eignung:** Handwerk und Dienstleister mit sichtbarem Ergebnis (Garten und Landschaftsbau, Bau, Ausbau, Pflege), die mit einem riesigen Markenwort, großen Bildflächen und seitlich scrollbaren Karten wirken wollen. Aufbau nach dem Prinzip einer freigegebenen Referenz, Text, Bild, Code, Schrift und Farbe sind eigen.

## Sektionsfolge
1. Kopf: Logo, Navigation, Telefon, Knopf (auf dem Held durchsichtig, danach dunkel)
2. Held: Markenwort über die ganze Breite, Kurzsatz mit Rückrufformular (ohne Versand), Logoleiste als Laufband (Beispiellogos aus `_basis/logos`)
3. Über uns: Leitsatz mit Wortlicht, Bewertungsreihe, Bild und Stimme mit Zählerkennzahl, Merkmalsreihe
4. Leistungen: dunkel, fünf Karten in einer seitlich scrollbaren Schiene mit Tasten
5. Ablauf: Leitsatz mit Wortlicht, zwei Bilder mit Streifenöffnung, drei Schritte
6. Werte: Überschrift links, vier Karten rechts
7. Projekte: dunkel, drei große Karten in einer Schiene
8. Kundenstimmen: Bild und drei Zitate (Beispiele)
9. Warum wir: dunkel, Vorteilsliste links, Bild bleibt rechts stehen (ab 62rem)
10. Tipps: drei Beitragskarten, FAQ als Akkordeon
11. Abschluss: Bildfläche mit Wortlicht, Anfrage und Telefon, Fuß mit Kontakt, Impressum, Datenschutz und riesigem Markenwort

## Animationen
- Held: Bühne bleibt stehen (`data-fortschritt`, sticky), das Markenwort rutscht unter die Kopfkante, Bild zoomt leicht, Kurzsatz und Formular blenden aus (bewegung.js, CSS mit `--fortschritt`)
- Blatt am Markenwort: leichte Parallax (`data-parallax`)
- Wortlicht in Leitsätzen (`data-licht`), Einblenden gestaffelt (`data-zeig`), Zähler (`data-zaehle`, Endwert im HTML)
- Streifenöffnung der Bilder: senkrechte Balken öffnen sich beim Einblenden (CSS `@property --s`, nur mit JavaScript)
- Schienen mit Tasten und Pfeiltasten (stil.js), Karten heben im Hover an, Logoleiste läuft endlos
- Reduzierte Bewegung und ohne JavaScript: Held als ruhige Fläche, alles sichtbar, Schienen bleiben seitlich scrollbar

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-auf-dunkel`, `--flaeche-karte-dunkel`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--text-blass`, Radien, Schriften (Bricolage Grotesque, Instrument Sans), Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern, Kontrast prüfen (Akzenttext auf Akzent und Text auf Flächen mindestens 4,5 zu 1, `--akzent-auf-dunkel` auf Dunkel ebenso).
2. Das Markenwort (`h1` im Held und `.fuss__wort`) durch den echten Namen ersetzen; kurze Namen mit 4 bis 8 Buchstaben passen, `font-size` des Worts bei langen Namen verkleinern.
3. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`), Overlay-Verläufe für die Lesbarkeit behalten.
4. Alle Elemente mit `data-beispiel` (Telefon, Zahlen, Zitate, Projekte, Beiträge, FAQ) durch echte Angaben ersetzen oder löschen. Logoleiste mit freigegebenen Kundenlogos füllen oder entfernen.
5. Formulare (`data-beispielform`) an einen echten Versand anbinden, Titel, Beschreibung, Impressum und Datenschutz ergänzen.

## Grenzen
- Keine echten Bilder, Formulare senden nichts. Kein Cookie-Banner. Keine Preisliste (hat die Referenz nicht).
- Streifenöffnung braucht `@property`; ohne Unterstützung erscheint das Bild ohne Übergang.
- Nicht geprüft: Safari, Screenreader, echte Fotos hinter Overlays (Kontrast neu messen), Leistung auf schwachen Geräten.

## Icons
Phosphor Icons (MIT, siehe `_basis/icons/LICENSE-Phosphor.txt`), durchgehend Strichstärke thin, inline als SVG mit `currentColor`; Bewertungssterne in t16 als gefüllte Variante, weil ein Rating sonst leer wirkt.

## Conversion (Playbook)

- Held: Hausbesitzer mit ungenutzter Rasenfläche oder Garten ohne Zeit zur Pflege, Lösung Planung, Bau und Pflege; die sichtbare H1 ist das Markenwort, der Satz mit Zielgruppe und Lösung steht für Screenreader im H1
- Primär-CTA überall "Beratung buchen" (Kopf, Rückrufformular im Held, Abschluss)
- Titel "Gartenbau Musterstadt | Planung und Pflege | Markenname", Beschreibung mit Problem, Nutzen und Handlung
- FAQ: Pflanzzeit, Planungskosten, Pflegevertrag, Bauzeit, Kosten des Wartens (Beispielantworten)
- Formularziel: Rückruf für die Beratung vor Ort, ein Feld (Telefon)
- Beleg: Bewertungszeile im Abschnitt Über uns als Beispielwert markiert
