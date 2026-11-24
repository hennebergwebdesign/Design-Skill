# Mitgliedschaft (t23)

**Eignung:** Betriebe mit wiederkehrender Leistung (Wartung, Pflege, Prüfung, Abo für Haus und Technik), die Pakete, Preise und einen Vergleich auf einer eigenständigen Seite verkaufen wollen. Branchenneutral, Beispieltexte klar gekennzeichnet.

## Sektionsfolge
1. Hinweisleiste, Kopf (bleibt oben stehen, Telefon und Anfrage immer sichtbar), dunkler Held mit Überschrift links, Text und Aktion rechts, darunter wächst die Bildtafel
2. Vertrauen: Laufband mit erfundenen Beispiellogos
3. Pakete: dunkler Rahmen mit zwei Karten (Basis hell, Komfort dunkel mit Hinweis "Beliebteste Wahl")
4. Vorteile: Überschrift färbt sich Wort für Wort, darunter ein Reiter zum Wischen mit Pfeilknöpfen
5. Vergleich: Akzentfläche mit heller Karte, echte Tabelle, Kopfzeile bleibt beim Scrollen stehen
6. Prüfumfang: Bildtafel und Liste auf abgesetzter Fläche
7. Ablauf in drei Schritten, Stimmen (Beispielzitate), FAQ als Akkordeon
8. Abschluss mit Bildfläche und zwei Aktionen, Fuß mit Formular (ohne Versand), Links, Impressum, Datenschutz und riesigem Schriftzug

## Animationen
- Held: Bildtafel wächst beim Scrollen von 88 auf 100 Prozent und hellt dabei auf (`stil.js`, Variable `--auf`, nur transform und opacity)
- Wortlicht in der Vorteil-Überschrift (`data-licht`, bewegung.js)
- Reiter mit Scroll-Snap, Pfeilknöpfe schieben um eine Karte (`stil.js`), ohne JavaScript per Wischen und Tastatur bedienbar
- Tabelle: Kopfzeile sticky (CSS), Zeilen mit Hover
- Einblenden gestaffelt (`data-zeig`), Logo-Laufband, Akkordeon, Menü mit Abschnittsanzeige, Schriftzug im Fuß steigt auf
- Reduzierte Bewegung und ohne JavaScript: alles sichtbar, Bildtafel in voller Größe, Reiter bleibt scrollbar

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-blass`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--spalte-hell`, Radien, Schriften (Archivo und Instrument Sans), Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern. Kontrast prüfen: `--akzent` ist nur Fläche (nie Text auf Hell), dafür gibt es `--akzent-tief`.
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`), Overlays bleiben für die Lesbarkeit.
3. Alle Elemente mit `data-beispiel` (Preise, Tabellenwerte, Listen, Zitate, Hinweisleiste) und die Beispiellogos durch echte Angaben ersetzen oder löschen.
4. Telefon, E-Mail, Adresse, Titel, Beschreibung, Impressum und Datenschutz ergänzen. Das Formular im Fuß sendet nichts und braucht ein Ziel.

## Grenzen
- Keine echten Bilder, keine echten Belege. Icons: Phosphor Icons (MIT), Strichstärke bold, als Sprite im Seitenanfang.
- Zwei Pakete wie in der Aufbauvorlage; bei drei Paketen die Tabellenspalten und das Raster anpassen.
- Nicht geprüft: Screenreader, Safari, echte Fotos hinter Overlays (Kontrast neu messen), Leistung.
