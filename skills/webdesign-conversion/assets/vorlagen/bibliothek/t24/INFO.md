# Jahreszeiten (t24)

**Eignung:** Heizung, Klima, Lüftung und ähnliche Handwerks- und Servicebetriebe mit mehreren Leistungen, Wartungsgeschäft und Bedarf nach einer schnellen Anfrage (Telefon, Rückruf). Als Prinzip nachgebaut, nicht als Kopie: Aufbau und Art der Bewegung stammen von einer freigegebenen Referenz (Tor 1), Text, Bild, Code, Schrift und Farbe sind eigen.

## Sektionsfolge
1. Akzentleiste mit Telefon, Kopf mit Logo, Navigation und Anfrageknopf
2. Held: mittig, Kicker, H1, zwei Aktionen, darunter Bildstreifen als Laufband (Bildkarten, Bewertungskarte, Notdienstkarte)
3. Leitsatz mit Wortlicht und zwei Bildern
4. Leistungen: dunkler Bildgrund steht, vier Karten (01 / 04 bis 04 / 04) ziehen darüber
5. Jahreszeiten: Überschrift und Aktion links, vier Karten gestaffelt rechts
6. Projekte: Laufband aus Bildkarten mit Namensschild
7. Ablauf: Bereich bleibt stehen, vier Schritte erscheinen nacheinander (gestrichelte Trennlinien)
8. Vorteile: Text mit Haken, Bild mit Kennzahlkarte
9. Stimmen: Akzentfläche, Karussell mit Pfeilen, drei Kennzahlen
10. Ratgeber (drei Karten) und FAQ als Akkordeon mit Bild
11. Abschluss mit dunklem Bild (Tiefenverschiebung), Fuß mit Links, Kontakt und Rückruffeld

## Animationen
- Held: Inhalt blendet beim Scrollen aus und schrumpft leicht (`data-abdunkeln`, CSS-Variable `--dunkel`); Bildstreifen läuft endlos, pausiert bei Hover
- Leitsatz färbt sich Wort für Wort (`data-licht`, bewegung.js)
- Leistungen: reines CSS, `position: sticky` für den Bildgrund, Karten laufen im normalen Fluss darüber, Einblenden mit Skalierung
- Ablauf: `data-fortschritt` setzt `--fortschritt`, jeder Schritt berechnet daraus `--p` (nur ab 62rem, mit JavaScript, bei normaler Bewegung)
- Kennzahlen zählen hoch (`data-zaehle`, Endwert steht im HTML), Projektband läuft endlos, Karussell mit Pfeilen (stil.js), Abschlussbild mit `data-parallax`
- Hover und Fokus: Knöpfe, Karten, Links, Pfeile, Akkordeon (nur transform, opacity, Farbe, Schatten, unter 300 ms)
- Reduzierte Bewegung: Bänder werden wischbare Leisten ohne Doppel, Ablauf und Held statisch, nichts bleibt unsichtbar. Ohne JavaScript ist alles sichtbar.

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--karte`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-hell`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--text-auf-akzent-leise`, Radien, Schriften (Instrument Sans, Hanken Grotesk), Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern. Kontrast prüfen: Text auf Fläche, Akzenttext auf Akzent, `--text-auf-akzent-leise` auf Akzent, `--text-leise-dunkel` auf Dunkel, jeweils mindestens 4,5 zu 1. Favicon-Farbe in `favicon.svg` nachziehen.
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`), dunkle Bildgründe behalten ihren Schleier für die Lesbarkeit.
3. Alle Elemente mit `data-beispiel` (Bewertung, Notdienst, 94 %, Stimmen, Projekte, Kennzahlen, Beiträge) und alle Texte mit „Beispiel" durch echte, belegbare Angaben ersetzen oder löschen.
4. Telefon, E-Mail, Adresse, Impressum und Datenschutz ergänzen; das Rückruffeld sendet nichts und braucht ein Backend samt Hinweis nach Datenschutzerklärung.

## Grenzen
- Keine echten Bilder, Platzhalter aus Tonverläufen. Icons: Phosphor (MIT), durchgehend Strichstärke regular, Sterne fill, als Sprite im Seitenanfang. Kein Cookie-Banner.
- Ablauf haftet nur ab 62rem; darunter normaler Fluss. Die Leistungsbühne nutzt `svh` mit `vh` als Rückfall.
- Die Referenz hat keine Logoleiste, deshalb gibt es hier keine.
- Nicht geprüft: Screenreader, Safari, echte Fotos hinter den Schleiern (Kontrast neu messen), echte Geräte, Leistung.

## Conversion (Playbook)
- Held: Kommentar mit der Heldenformel vor der H1 (sonst keine Lücke)
