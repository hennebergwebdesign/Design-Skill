# Vorlage t03: Vor Ort Service, hell und dunkel im Wechsel

**Eignung:** Anbieter mit Einsatz beim Kunden (mobile Dienstleistungen, Handwerk mit Paketpreisen), die Termine über ein Formular verkaufen.

## Sektionsfolge
Ankündigungsleiste, schwebende Kopfpille, Hero (Vollbild, Text unten links, Bewertungskarte unten rechts), Über uns (große Aussage und drei Kacheln), Leistungen (Tabs mit Preis), Einsatzorte (Raster), Ablauf (links klebend, rechts drei Karten), Vorher und Nachher (Regler), Referenzen (versetztes Raster), Vergleichstabelle, Stimmen (Slider), Fragen (zwei Spalten), Termin (Formular auf Bildfläche), Fuß aus Kacheln.

## Animationen
- Hero: Zeilen steigen aus der Maske, Bild zoomt langsam heraus und wandert per `data-parallax` (Basis).
- Kopf rückt beim Scrollen nach oben (Klasse `gescrollt` aus der Basis).
- Über uns: jedes Wort der Aussage wird nach Scrollstand heller (`stil.js`), Zähler zählen zum Endwert (`data-zaehle`, Endwert steht im HTML).
- Leistungen: Tabs ab 64em, Karte blendet ein, Listenpunkte gestaffelt. Mobil stehen alle Karten untereinander.
- Ablauf: linke Fläche klebt (`position: sticky`), Bild skaliert mit `--fortschritt`, Karten blenden gestaffelt ein.
- Vorher und Nachher: Regler (`input type=range`, per Tastatur bedienbar), Pfeile wechseln drei Paare.
- Referenzen: gegenläufiger Parallax je Kachel. Stimmen: Scroll Snap mit Pfeilen.
- Knöpfe: Text rollt beim Hover, Pfeilfeld rückt vor. Fragen: Plus wird zum Minus, Antwort blendet ein.
- Bei `prefers-reduced-motion` bleibt alles still und sichtbar, ohne JavaScript ebenfalls.

## Tokens zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--karte-dunkel`, `--karte-dunkel-aktiv`, `--text`, `--text-hell`, `--akzent` mit `--akzent-text`, `--akzent-ink` (Akzent als Schrift auf Hell), `--feldrand`, Radien, Bildverläufe `--bild-*`, Schrift (Instrument Sans).

## Bei Markenwechsel
Icons: Phosphor Icons (MIT), durchgehend Strichstärke bold, als Sprite im Seitenanfang (Lizenz in `_basis/icons/LICENSE-Phosphor.txt`); nur die Bewertungssterne nutzen die gefüllte Fassung, damit sie als Sterne lesbar bleiben. Die Vorlage hat keine Logoleiste.

Tokens und Schriftzeilen in `marke.css` ändern, `--akzent-ink` so wählen, dass es auf `--flaeche-alt` mindestens 4,5 zu 1 erreicht. Logo (Inline SVG, zweimal) und Name ersetzen. Alle Platzhalterflächen (`data-platzhalter`) durch Fotos ersetzen, dann das Attribut entfernen. Preise, Zahlen, Bewertung und Stimmen tragen `data-beispiel` und sind Beispielwerte: durch echte Angaben mit Quelle ersetzen oder streichen. Formular braucht `action` und Datenschutztext (Bauablauf, `formulare-und-resend.md`). Tabs und Einsatzorte an das echte Angebot anpassen.

## Grenzen
Der Akzent (Hellgrün) trägt Knöpfe nur auf dunklen Flächen. Auf hellen Flächen als Fläche zu schwach (Kontrast unter 3 zu 1). Das Hero Bild ist ein Verlauf, ohne Foto wirkt der Einstieg leer. Keine echte Karte, keine Videos. Die Tabs brauchen JavaScript, ohne stehen die Karten untereinander. Parallax liest den Scrollstand, bei sehr vielen Kacheln auf schwachen Geräten prüfen.

## Conversion (Playbook)

- Held: Autofahrer und Firmenfahrzeuge, Problem Zeitverlust durch den Weg zur Aufbereitung, Lösung mobile Aufbereitung am Stellplatz (neue Unterzeile `held__unter`)
- Primär-CTA „Termin anfragen“ in Kopfzeile, Held, allen Paketen und als Absendeknopf
- Titel „Fahrzeugaufbereitung Musterstadt | Mobil | Markenname“, Beschreibung mit Nutzen und Handlung
- Held-Beleg „Bewertungen unserer Kunden (Beispiel)“, Preise bleiben `data-beispiel`
- FAQ: Vorbereitung, Dauer, Kosten des Aufschiebens, Einsatzorte, Zahlung, Vorlauf, Arbeitsplatz, Schutzbehandlung
- Formular (5 Felder) für Terminanfrage: Paket, Fahrzeug und Wunschtermin in der Nachricht, Hinweise unter E-Mail und Telefon
