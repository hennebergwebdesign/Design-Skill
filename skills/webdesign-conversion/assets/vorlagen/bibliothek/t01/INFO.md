# Bildbühne (t01)

**Eignung:** Dienstleister mit Projekten und Beratungsanteil (Bau, Energie, Handwerk, Planung), die mit großen Bildtafeln statt Textblöcken wirken wollen.

## Sektionsfolge
1. Schwebende Pillen-Kopfzeile, Held als große Bildtafel (Aktion und H1 unten links, Kurztext oben rechts, Kennzahl unten rechts)
2. Leitsatz mit Avatar-Gruppe, darunter Logoleiste als Laufband
3. Leistungen: dunkle Bildtafel mit Überschrift, Kurztext, Knopf und drei weißen Karten
4. Arbeiten: versetztes Raster aus großen und schmalen Bildern (8 zu 4, dann 4 zu 8)
5. Warum wir: Kicker, Überschrift, zwei Kacheln (hell mit Zahl, Bild mit Zahl)
6. Ablauf: schwarzes Panel, Überschrift bleibt stehen, drei Karten ziehen darüber
7. Beiträge (zwei) und FAQ als Akkordeon auf heller Fläche
8. Dunkler Fuß mit Anfrage, Linkliste mit Pfeilen und Rechtelinks

## Animationen
- Held: Bild zoomt beim Laden ein, Inhalt erscheint gestaffelt (bewegung.js)
- Zifferrolle bei Kennzahlen (stil.js, `data-rolle`, Endwert steht im HTML)
- Leitsatz färbt sich Wort für Wort beim Scrollen (stil.js, `data-wortfarbe`)
- Bildtafeln: leichte Tiefenverschiebung (stil.js, `data-tiefe`, begrenzt)
- Leistungskarten gestaffelt, Hover hebt an; Projektbilder öffnen sich per Maske und zoomen im Hover
- Ablauf: sticky Überschrift (CSS), Karten ziehen darüber
- Logoleiste läuft endlos, Menü, Akkordeon, Pfeile im Fuß
- Reduzierte Bewegung: alles statisch, Zahlen und Text sofort sichtbar. Ohne JavaScript ist alles sichtbar.

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--text-blass`, `--linie`, `--akzent`, `--akzent-text`, Radien (`--radius-gross`, `--radius-karte`, `--radius-klein`), Schriften, sowie die Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern, Kontrast prüfen (`--text-blass` mindestens 3 zu 1, nur große Schrift).
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`, `object-fit` ist gesetzt), Overlay-Verläufe bleiben für die Lesbarkeit.
3. Beispiellogos der Leiste durch freigegebene Kundenlogos ersetzen oder die Leiste entfernen.
4. Alle Elemente mit `data-beispiel` (Kennzahlen 650, 800+, 98%, Projekte, Beiträge, Daten, FAQ) durch echte Angaben ersetzen oder löschen.
5. Titel, Beschreibung, Kontaktadresse, Impressum und Datenschutz ergänzen.

## Grenzen
- Keine echten Bilder. Logoleiste zeigt erfundene Beispiellogos (`_basis/logos.css`), vor Livegang durch freigegebene Kundenlogos ersetzen. Icons: Phosphor Icons (MIT), durchgehend Strichstärke light, als Sprite im Seitenanfang (Lizenz in `_basis/icons/LICENSE-Phosphor.txt`). Kein Cookie-Banner, kein Formular.
- Drei Karten in Sektion 3 sind bewusst wie in der Aufbauvorlage; bei anderem Angebot Anzahl anpassen.
- Sticky Überschrift im Ablauf nur ab 62rem, darunter normaler Fluss.
- Nicht geprüft: Screenreader, Safari, echte Fotos als Hintergrund hinter Overlays (Kontrast neu messen).
