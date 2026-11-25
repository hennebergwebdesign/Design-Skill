# Raumfolge (t21)

**Eignung:** Dienstleister und Betriebe mit Beratung, Einbau und Wartung (Haustechnik, Sicherheit, Energie, Handwerk mit Service), die ihr Angebot in einer langen, ruhig geführten Scrollfolge zeigen wollen. Hell mit dunklen Bändern, Karten in vier Pastelltönen. Nach dem Prinzip einer freigegebenen Referenz (Aufbau, Raster, Folge, Bewegungsart), Text, Bild, Code, Schrift und Farbe sind eigen.

## Sektionsfolge
1. Leiste (Telefon, E-Mail, Aktionshinweis), Kopf (fest, Logo, Navigation, Anrufknopf, mobil Burger)
2. Held: zentriert auf großem Kreis, Bewertungsplatzhalter, H1, Knopf und Telefon
3. Bühne: Bildrahmen auf der Grenze von hell zu dunkel
4. Vertrauen: dunkel, Leitsatz mit Wortlicht, vier Merkmale
5. Bausteine: vier Karten (zwei Bild, zwei Ton)
6. Aus einer Hand: zwei Tafeln, darunter eine breite dunkle Tafel
7. Überblick: seitlich blätternde Leistungskarten mit Pfeilen und Fortschritt
8. Ablauf: vier Karten im Raster
9. Zusagen: dunkle Tafel mit Akkordeon und Bildfläche
10. Stimmen: dunkel, Leitsatz, drei Zählkarten, Logoband, blätternde Stimmkarten
11. Abschluss: Kreis wächst zur Bildfläche, Handlung erscheint
12. Einblicke: Laufband aus Bildflächen, anhaltbar
13. Fragen (Akkordeon, Überschrift bleibt stehen) und Fuß (Kontakt, vier Spalten, Beispielformular)

## Animationen
- Held blendet beim Scrollen aus, der Bildrahmen wächst von 86 auf 100 Prozent (`stil.js`, `--weg`, `--z`).
- Leitsätze füllen sich Wort für Wort (`data-licht`), Zähler laufen (`data-zaehle`), Einblenden mit Staffel (`data-zeig`).
- Bausteine: Karten fahren aus den Seiten und von oben und unten zusammen (Sticky, `--fortschritt`, rein CSS).
- Aus einer Hand: zwei Tafeln schieben sich schräg (skewX 15 Grad) von beiden Seiten ein.
- Ablauf: vier Karten ziehen nacheinander ein (`--von`, `--bis` je Karte).
- Abschluss: `clip-path` Kreis wächst von 10 auf 76 Prozent, dann blendet die Karte ein.
- Laufband und Logoband (bei Hover und per Knopf pausiert), Blätterleisten mit Snap, Bild zoomt bei Hover.
- Festhalten nur mit JavaScript, ab 62 em Breite, ab 43 em Höhe und ohne reduzierte Bewegung. Sonst stehen alle Karten ruhig untereinander. Bei `prefers-reduced-motion` und ohne JavaScript ist alles sofort sichtbar.

## Tokens zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-hell` (Akzent auf Dunkel), vier Kartentöne `--ton-*`, sechs Bildtöne `--bild-*`, `--rand-feld-dunkel`, `--stern`, Radien, `--schrift-titel` (Outfit) und `--schrift-text` (Instrument Sans).

## Marke wechseln
Tokens setzen, Kontrast prüfen (Text und Akzenttext mindestens 4,5 zu 1), Schriften aus `schriften.css` wählen, Platzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispiellogos aus `logos.css` durch echte ersetzen, alle Texte und `data-beispiel`-Werte (Zusagen, Kennzahlen, Zitate, Kontakt, Bewertung) durch echte, freigegebene Angaben ersetzen. Hält der Betrieb eine Zusage nicht ein, die Karte entfernen.

## Grenzen
- Keine Preisstufen: die Referenz hat auf der Startseite keine.
- Die Videoschaltfläche der Referenz fehlt bewusst (ohne Video wäre sie ohne Funktion), der Rahmen ist eine Bildfläche.
- Formular im Fuß sendet nichts. Zitate, Kennzahlen, Namen und Orte sind Beispiele, keine Belege.
- Ohne Fotos wirken die Verlaufsflächen ruhig, aber unspezifisch.
- Kontrast der Platzhalterbeschriftung ist über eigenen dunklen Grund gesichert, Text über echten Fotos muss nach dem Einsetzen neu geprüft werden.
- Icons: Phosphor Icons (MIT, Lizenz in `_basis/icons/LICENSE-Phosphor.txt`), durchgehend Strichstärke light, Sterne fill, als Inline-Sprite. Das Logozeichen M ist ein eigenes Symbol.

## Conversion (Playbook)

- Feldhinweis unter E-Mail im Newsletterformular im Fuß (`.feld__hinweis`).
- Kommentar zur Heldformel vor der H1.
