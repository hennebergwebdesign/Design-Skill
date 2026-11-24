# t07 Beratung Dunkel

**Eignung:** Beratung, Coaching und Expertendienstleistung mit wenigen, klar gestaffelten Angeboten und hoher Erklärungsbedürftigkeit; dunkle, ruhige Tonalität.

## Sektionsfolge
Kopfzeile mit Termin Knopf und Menü, Vollbildheld (Text links unten), Vertrauensband (Platzhalter), Für wen (drei Karten), Ansatz (Bild und Akkordeon), Angebote (Reiter), Wirkung (drei Kennzahlen), Bildband über volle Breite, Preise (zwei Karten, eine hell), Ablauf (vier Schritte), Stimmen (Spur mit Pfeilen), Fragen (Akkordeon), Kontakt (Formular), Newsletter über Bildfläche, Fuß.

## Animationen
- Held: Bild beruhigt sich beim Laden (Zoom), Text blendet gestaffelt ein, Bild mit leichter Tiefenverschiebung.
- Einblenden beim Scrollen und gestaffelte Karten, Kennzahlen, Preiskarten (`bewegung.js`).
- Kennzahlen zählen hoch, Endwerte stehen im HTML.
- Vertrauensband läuft als Laufband, pausiert bei Hover.
- Bildband und Ansatzbild mit Parallax.
- Reiter: Bild wird von oben aufgedeckt, Text fährt gestaffelt ein.
- Ablauf: Linien füllen sich nacheinander beim Scrollen, Schrittnummern färben sich.
- Knöpfe: Füllung fährt von links ein, Pfeil rückt diagonal.
- Menü: Vollflächenpanel, Einträge fahren aus der Kante ein; Burger wird zum Kreuz.
- Akkordeon: Pfeil dreht, Text blendet ein. Stimmen: Pfeile blättern.
- Bei reduzierter Bewegung ist alles statisch; ohne JavaScript ist alles sichtbar (Menü als Linkliste, Reiter als gestapelte Blöcke).

## Zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, Schriften, Radien. Zusatz: `--hell`, `--hell-text`, `--hell-leise` (helle Karte, Menüknopf, Reiter), `--akzent-hell` (Akzent auf heller Fläche), `--linie-stark`, `--bild-*` (Platzhalterverläufe).

## Bei Markenwechsel
Werte in `marke.css` tauschen, Kontrast prüfen (Akzent auf Fläche und `--akzent-text` auf Akzent mindestens 4,5 zu 1, `--akzent-hell` auf `--hell` ebenso). Bei hellem Markenauftritt `--flaeche` und `--text` tauschen, dann `--hell` als dunkle Fläche umdeuten. Markenzeichen im Kopf ist ein CSS Kreis, durch Logo ersetzen.

## Vor dem Livegang
Alle `data-beispiel` Texte, Zahlen, Preise, Zitate, Kontaktdaten ersetzen oder Abschnitt entfernen. Platzhalterflächen (`data-platzhalter`) durch echte Bilder ersetzen. Vertrauensband nur mit echten, freigegebenen Referenzen behalten. Formularziel (`action`) und Datenschutzhinweis ergänzen.

## Grenzen
Kein Sticky Abschnitt und kein Hintergrundvideo wie bei Vorlagen mit Scrollbühne. Die Stimmenspur zeigt auf Desktop drei von fünf Karten. Helles Thema nicht vorgesehen. Hero und Newsletter sind ohne echtes Foto flächig und wirken erst mit Bildmaterial.
