# Produktbühne (t15)

**Eignung:** Produktseite für ein einzelnes Gerät oder Produkt mit Farbvarianten und Direktkauf (Technik, Haushalt, Werkzeug, Zubehör). Alle Texte, Preise und Werte sind Beispiele. Nach dem Prinzip einer freigegebenen Referenz (Produktseite mit durchlaufender Produktreihe, wachsender Tafel, Reitern und Farbwahl) gebaut: Aufbau, Raster, Sektionsfolge und Art der Bewegung übernommen, Text, Bild, Code, Schrift und Farbe eigen.

## Sektionsfolge
1. Kopfzeile (blendet beim Hinunterscrollen aus) mit Aktionsband und Telefon
2. Held: Überschrift, Produktreihe in fünf Farben läuft beim Scrollen durch, am Ende Preis und Kaufknopf
3. Höhepunkte: Tafel wächst, vier Folien wechseln, Fortschrittsleiste
4. Die Idee: Leitsatz mit Wortlicht, zwei Hochformatbilder, Absatz
5. Farbabschnitt mit Detailtext, großem Bild und drei Servicepunkten
6. Technik: sechs Karten, das Plus öffnet ein Fenster (natives `popover`)
7. Galerie: dunkel, Liste links, Bild und Text rechts wechseln beim Scrollen
8. Alltag: Bildreihe läuft beim Scrollen quer durch
9. Stimmen (Beispiele): dunkel, quer scrollbar, Pfeile
10. Kaufen: Farbwahl, Vorschau wechselt die Farbe, Preis, Lieferumfang, Service
11. FAQ als Akkordeon
12. Abschluss mit Handlung und Telefon, Fuß mit Impressum und Datenschutz

## Animationen
- Held: Produktreihe und Überschrift hängen am Scrollfortschritt (`data-fortschritt`, `--fortschritt`), Preis erscheint ab der Hälfte
- Höhepunkte und Galerie: `data-schritte`, Sticky-Bühne, Folie je Abschnitt des Scrollwegs, Knöpfe der Galerieliste springen zur Folie
- Alltag: Sticky, Reihe wird um `--weg` verschoben (stil.js misst die Breite)
- Kopf aus und ein nach Scrollrichtung, Wortlicht (`data-licht`), Einblenden, Parallax im Farbabschnitt und bei den Hochformatbildern
- Farbwahl rein in CSS (`:has()` auf Radios), Fenster per `popovertarget`, Akkordeon `data-exklusiv`
- Hover und Fokus an allen Knöpfen, Karten und Links (nur transform, Farbe, Schatten, unter 300 ms)
- Reduzierte Bewegung und ohne JavaScript: kein Sticky, alle Folien und Panels untereinander, Produktreihe statisch, nichts verborgen. Unter 56rem (Handy) ebenso: Höhepunkte und Galerie untereinander, Bildreihen und Stimmen per Wischen.

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-karte`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--flaeche-farbe`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-hell`, Radien, Schriften (Lexend, Manrope), Produktfarben `--farbe-a` bis `--farbe-e`, Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` ändern, `favicon.svg` auf die Akzentfarbe ziehen, Kontrast prüfen (Weiß auf `--akzent` und auf `--flaeche-farbe` mindestens 4,5 zu 1).
2. Das Gerätesymbol `#geraet` (Inline-SVG am Seitenanfang) und alle `.bild[data-platzhalter]` durch Produktfotos ersetzen (`<img>` mit `alt`, bei Farbvarianten je ein Bild pro Farbe und Umschaltung im CSS beibehalten).
3. Alle Beispielangaben (Preis, Rate, Laufzeit, Schutzklasse, Garantie, Aktion, Telefon, Adresse, Stimmen, FAQ) durch echte, belegte Angaben ersetzen oder löschen. Stimmen nur mit freigegebenem Wortlaut.
4. Titel, Beschreibung, Impressum und Datenschutz ergänzen, Kauf an das echte Shopsystem anbinden.

## Grenzen
- Kein Formular mit Versand, kein Warenkorb, kein Cookie-Banner. Der Kaufknopf springt nur zum Anker.
- Farbwahl braucht `:has()` für Vorschau und Farbname. Ohne `:has()` bleibt die erste Farbe sichtbar, die Auswahl bleibt wählbar.
- Fenster nutzt das `popover`-Attribut (aktuelle Browser).
- Nicht geprüft: Screenreader, Safari, echte Fotos hinter den Overlays (Kontrast neu messen), Leistung auf schwachen Geräten.

## Icons
Phosphor Icons (MIT, Lizenz in `_basis/icons/LICENSE-Phosphor.txt`), durchgehend in der Strichstärke light (Referenz vrtxs, feine Linien). Die Vorlage hat keine Logoleiste.
