# Vorlage t02: Panorama Hell Dunkel

**Eignung:** Unternehmen mit mehreren Leistungen und einem erklärungsbedürftigen Ablauf, die ruhig, großzügig und vertrauenswürdig auftreten wollen (Beratung, Technik, Dienstleistung, Produktion).

## Sektionsfolge
1. Schwebende dunkle Kopfleiste (Burger mit `aria-expanded` unter 64rem)
2. Held als große gerundete Bildfläche: H1 unten links, zwei Knöpfe, Partnerband, Kennzahlkarte unten rechts mit Pausenknopf
3. Über uns: heller Block mit Chips, vier Kennzahlen, Leitgedanke, daneben vier dunkle Karten (2 mal 2)
4. Leistungen: drei Medienkarten, Überschrift mittig
5. Ablauf: große dunkle Fläche, Sticky, fünf Schritte links, Bildstapel und Kennzahlkarte rechts
6. Beiträge: Liste mit Trennlinien, Datum, Titel, Anreißer, Pfeil
7. Fragen: helle Fläche, links Titel, rechts Akkordeonkarten
8. Kontakt: Zitat, farbige Handlungskarte, hohe Bildkarte mit Kennzahl und Personenchip
9. Fuß: dunkle Fläche, Spalten, riesiger Schriftzug mit Farbverlauf nach unten

## Animationen
- Held: langsame Bildfahrt (Zoom und Drift), Partnerband läuft, beides per Pausenknopf anhaltbar
- Einblenden und Staffeln der Karten (`data-zeig`, `data-staffel` aus der Basis), Zähler (`data-zaehle`, Endwert steht im HTML)
- Ablauf: Scrollfortschritt in der Sticky-Fläche wählt den Schritt; der Eintrag klappt auf, Bilder stapeln sich (vorherige ragen oben heraus), Kennzahl zählt zum neuen Wert. Auf Mobil und Tablet wechselt der Schritt per Tipp. Klick am Desktop scrollt zum Schritt.
- Beitragszeilen und Pfeile, Plus im Akkordeon, Pfeilknöpfe (Hover nur mit Zeigegerät), Fußzeilen-Schriftzug steigt beim Erscheinen auf, Handlungskarte mit langsam treibender Fläche
- Reduzierte Bewegung: alles statisch. Ohne JavaScript: voller Inhalt, alle Schrittbeschreibungen offen.

## Tokens zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--linie-dunkel`, `--akzent`, `--akzent-text`, `--akzent-hell` (Akzent auf Dunkel), `--auf-dunkel`, `--auf-dunkel-leise`, `--bild-a` bis `--bild-e` (Farben der Bildplatzhalter), Radien `--radius-panel`, `--radius-karte`, `--radius-klein`, `--radius-knopf`, Schrift `--schrift-titel` und `--schrift-text` (Hanken Grotesk).

## Marke wechseln
1. Werte in `marke.css` ändern, Kontrast prüfen (Text 4,5 zu 1, `--akzent-text` auf `--akzent`, `--akzent-hell` auf `--flaeche-dunkel`).
2. Name, Zeichen (inline SVG in `.marke` und im Fuß), Texte und Menü ersetzen. Der Schriftzug im Fuß steht dreimal als Text, Größe `14cqw` passt für zehn Buchstaben, bei anderer Länge anpassen.
3. Bildplatzhalter (`.bild` mit `data-platzhalter`) durch echte Bilder mit `alt` ersetzen. Das Heldenbild gehört in `.held__tiefe` als Hintergrund oder als `img`, die Abdunklung `.held::before` bleibt für die Lesbarkeit.
4. Alle Elemente mit `data-beispiel` (Kennzahlen) durch belegte Werte ersetzen oder streichen. Schritte im Ablauf: `data-zahl` und `data-zahltext` je Eintrag.

## Grenzen
- Ablauf-Sticky ist auf genau fünf Schritte und fünf Bilder gebaut (Höhe 4,2 Bildschirme); mehr oder weniger Schritte brauchen Anpassung in `stil.js` und `stil.css`.
- Partnerband enthält nur Platzhalterflächen, keine Logos.
- Kein Formular, kein Consent, keine Unterseiten.
