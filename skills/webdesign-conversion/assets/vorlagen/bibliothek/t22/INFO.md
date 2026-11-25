# Handwerk vor Ort (t22)

**Eignung:** Handwerks- und Servicebetriebe mit Einsatzgebiet, Notdienst und Wartungspaketen (Installation, Technik, Gebäudeservice), die Anrufe und Terminanfragen wollen. Aufbau nach dem Prinzip einer freigegebenen Referenz (Tor 1), Text, Bild, Code, Schrift und Farbe sind eigen.

## Sektionsfolge
1. Hinweisleiste, Kopf über dem Held (Telefon und Termin immer sichtbar), Held mit H1, zwei Knöpfen, Beispielangaben und Stimmenkarte
2. Leitsatz (Wortlicht), drei Kontaktwege, Logoleiste als Laufband
3. Leistungen: Akzentband mit Karussell aus sechs Bildkarten
4. Vorteile: Überschrift, Bild, vier Vorteile, Siegelkarte (Platzhalter)
5. Ablauf: Bild mit Bewertungskarte, vier Schritte als Akkordeon
6. Fallbeispiele: Vollbild mit Überblendung und Zähler
7. Wartungspakete: eine helle, eine dunkle Karte
8. Einsatzgebiet mit Ortsliste und Kartenfläche, vier Kennzahlen
9. Stimmen: Akzentband mit Karussell
10. Ratgeber (zwei Beiträge), FAQ, Anfrageformular (ohne Versand)
11. Abschluss mit Handlung, dunkler Fuß mit Riesenwort

## Animationen
- Held bleibt beim Scrollen stehen (sticky ab 62rem und 44rem Höhe), die nächste Fläche schiebt sich darüber, Bild zoomt und dunkelt ab (`data-abdunkeln` aus bewegung.js)
- H1 steigt Wort für Wort auf (stil.js), Endzustand und aria-label vollständig
- Wortlicht in Leitsatz und fünf Überschriften (`data-licht`, bewegung.js)
- Leistungskarten: Beschreibung und Pfeil öffnen sich bei Hover und Fokus (nur transform und opacity), auf Touchgeräten dauerhaft sichtbar
- Karussells (Leistungen, Stimmen): Scroll Snap, Pfeile per stil.js, ohne JavaScript per Wischen
- Fallbeispiele: Überblendung per Pfeil, ohne JavaScript untereinander
- Zähler (`data-zaehle`, Endwert steht im HTML), Akkordeon mit Einblenden, Kartenmarker pulsieren
- Reduzierte Bewegung und ohne JavaScript: alles sichtbar, nichts läuft

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, Radien, Schriften (Familjen Grotesk, Instrument Sans), Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern. Kontrast prüfen: Akzenttext auf Akzent und Text auf Fläche mindestens 4,5 zu 1, Weiß auf den Platzhaltertönen ebenso. Das Favicon folgt den Farben von `--akzent` und `--akzent-text` von Hand.
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`), Verlauf über Heldbild und Karten bleibt für die Lesbarkeit.
3. Beispiellogos durch freigegebene Kundenlogos ersetzen oder die Leiste entfernen.
4. Alles mit `data-beispiel` und der Zusatz „(Beispiel)“ (Siegel, Bewertungen, Preise, Zahlen, Stimmen, Fallbeispiele, Orte, Telefon, Adresse) durch echte, belegte Angaben ersetzen oder löschen.
5. Titel, Beschreibung, Impressum, Datenschutz, Formularversand und Einwilligungstext ergänzen.

## Grenzen
- Keine echten Bilder, Formulare senden nichts. Icons: Phosphor Icons (MIT), Strichstärke bold, Sterne fill, als Sprite im Seitenanfang.
- Das Karussell der Leistungen und der Stimmen hat keine Selbstfahrt. Die Fallbeispiele wechseln nur auf Klick.
- Das stehende Bild im Ablauf bleibt nicht stehen: die Textspalte ist nie höher als das Bild, ein Sticky Effekt wäre wirkungslos.
- Nicht geprüft: Screenreader, Safari, echte Fotos hinter den Overlays (Kontrast neu messen), Leistung.

## Conversion (Playbook)

- Formular auf fünf Felder: Adresse des Einsatzorts in die Nachricht verlegt, Platzhalter der Nachricht entsprechend.
- Feldhinweise unter Telefon und E-Mail (`.feld__hinweis`).
- Kommentar zur Heldformel vor der H1.
