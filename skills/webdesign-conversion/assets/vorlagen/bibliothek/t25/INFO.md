# Teamseite (t25)

**Eignung:** Über-uns-Unterseite für Heizungs-, Klima- und andere Handwerksbetriebe (auch Planung, Service, kleine Dienstleister), die Haltung, Zahlen, Geschichte und Team zeigen wollen. Mit Kopf, Abschluss und Fuß als vollständige Unterseite.

## Sektionsfolge
1. Notdienst-Streifen, Kopfzeile (Menü mit Abschnittsanzeige), Held: mittige Überschrift, drei Bildflächen (außen hoch, Mitte flach mit Bildunterschrift)
2. Haltung: Leitsatz, der sich wortweise füllt, kleines Bild mit Text, vier Zahlenkarten
3. Werte: dunkle Bildfläche, vier nummerierte Karten
4. Unser Weg: Überschrift bleibt stehen, rechts Zeitleiste mit wachsender Linie
5. Team: acht Karten mit Bildfläche, Name und Rolle
6. Fragen: Akkordeon (nur eine Antwort offen)
7. Abschluss: Telefon und Rückrufformular auf dunkler Bildfläche
8. Fuß mit Seiten, Kontakt, Impressum und Datenschutz

## Animationen
- Held und Karten erscheinen gestaffelt beim Laden und Scrollen (bewegung.js, `data-zeig`)
- Leitsatz füllt sich Wort für Wort (bewegung.js, `data-licht`, Farben aus `--text-blass` und `--text`)
- Zahlen zählen hoch, Endwert steht im HTML (bewegung.js, `data-zaehle`)
- Werte: die vier Karten steigen beim Scrollen verschieden weit auf (stil.js, `data-anheben`, Strecke je Karte `--weg`)
- Team: Karten steigen reihenweise auf (gleicher Mechanismus)
- Weg: Überschrift sticky ab 62em, Linie füllt sich bis 55 Prozent der Bildschirmhöhe, erreichte Punkte werden voll lesbar (stil.js)
- Hover und Fokus an Knöpfen, Karten, Links, Akkordeon (nur transform, opacity, Farbe, Schatten)
- Reduzierte Bewegung und ohne JavaScript: alles sichtbar, Linie voll, nichts versetzt

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--text-blass`, `--linie`, `--akzent`, `--akzent-text`, `--karte`, `--feld-rand`, Radien (`--radius-gross`, `--radius-karte`, `--radius-klein`), Schriften (Instrument Sans, Hanken Grotesk), Platzhaltertöne `--ton-1` bis `--ton-6` (alle dunkel genug für weiße Beschriftung).

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern. Kontrast prüfen: Text auf Fläche, `--akzent-text` auf `--akzent` mindestens 4,5 zu 1, `--text-blass` mindestens 3 zu 1, `--feld-rand` mindestens 3 zu 1 auf `--karte`. Der Akzent steht nie als Text auf dem dunklen Grund.
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`, bei Teamfotos Name und Rolle im Alt-Text).
3. Alle Beispielwerte (`data-beispiel`: Zahlen, Zeitleiste), Namen, Rollen, Telefon, Adresse und FAQ durch echte Angaben ersetzen oder löschen, die drei Hinweiszeilen entfernen.
4. Formular an einen echten Versand anbinden und Hinweis zum Datenschutz ergänzen, Titel, Beschreibung, Impressum und Datenschutz ergänzen.

## Grenzen
- Keine echten Bilder und kein Versand. Icons: Phosphor Icons (MIT), Strichstärke regular, als Sprite im Seitenanfang.
- Die Links im Fuß auf Impressum und Datenschutz sind `#`, die Menülinks gehen auf Abschnitte dieser Seite. Bei echter Website auf die Unterseiten zeigen lassen.
- Sticky Überschrift im Weg nur ab 62em, darunter normaler Fluss.
- Nicht geprüft: Screenreader, Safari, echte Fotos hinter den dunklen Flächen (Kontrast neu messen), echte Geräte.

## Conversion (Playbook)
- Held: Hausbesitzer mit ausgefallener Heizung, Lösung ist ein erreichbares Team, das kommt und vorab erklärt
- Primär-CTA: Rückruf anfordern (Kopfzeile und Formular), im Held selbst steht kein Knopf
- Titel und Beschreibung mit Keyword Heizung und Klima und Ort Musterstadt
- FAQ: Einzugsgebiet, Notfall bei Heizungsausfall, Angebot und Kosten des Wartens, Fördermittel
- Formular: Name, Telefon, Anliegen (was ausgefallen ist oder geplant wird), Hinweis zur Nutzung der Nummer
