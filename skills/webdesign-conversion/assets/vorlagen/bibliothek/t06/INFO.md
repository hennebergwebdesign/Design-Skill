# Bühne

**Eignung:** Konferenz, Kongress, Branchentreffen, Festival oder Schulung mit Programm, Referenten, Partnern und Ticketstufen, dunkel und hell im Wechsel, großzügig und plakativ.

## Sektionsfolge
1. Kopfzeile (dunkel, fest oben, Logo mittig, Ticketknopf rechts, mobil Burger)
2. Hero: riesige Versalien-H1, gebogene Bilderleiste, Wann und Wo, Knopf, Teilnehmendenhinweis
3. Überblick: Überschrift links mit kleinem Bild, hohes Bild in der Mitte, zwei Infokarten (hell, dunkel)
4. Programm: Tage als Reiter, Sitzungskarten (Zeit, Bild, Titel und Text) in einem hellen Panel
5. Countdown: Vollbild, Ortschip, vier Zählkästen, Knopf
6. Referenten: Karussell mit Karten und Punkten
7. Partner: helles Panel, links Text und Knopf, rechts drei Karten mit Logolauf
8. Tickets: dunkel, drei Karten, die mittlere hervorgehoben
9. Stimmen: vier gekippte, überlappende Karten (hell, dunkel im Wechsel)
10. Laufband in zwei Reihen
11. Fragen und Antworten (Akkordeon, eine Antwort offen)
12. Abschluss mit Bildpanel und Knopf
13. Neuigkeiten: drei Karten
14. Fuß: dunkel mit Rasterlinien, Kontakt, Links, Newsletter

## Animationen
- Hero: Die Bilderleiste liegt gebogen (Perspektive) und wird beim Scrollen flach und füllt die Höhe, die Überschrift schiebt sich weg (Sticky, `--fortschritt` aus `bewegung.js`).
- Überschriften füllen sich Wort für Wort mit voller Farbe (`stil.js`).
- Einblenden und Staffeln der Karten (`data-zeig`), Parallax bei Countdown und Abschluss, Zähler läuft live (Beispieldatum).
- Stimmen richten sich beim Scrollen aus der Schräge auf (nur ab 64 em).
- Laufband und Logolauf, gegenläufig, bei Hover pausiert.
- Reiterwechsel mit gestaffeltem Einblenden, Plus wird zum Minus im Akkordeon.
- Bei `prefers-reduced-motion`: alles ruhend, Hero ohne Sticky, Überschriften voll gefärbt. Ohne JavaScript ist aller Inhalt sichtbar.

## Tokens zum Umfärben (`marke.css`)
`--flaeche-dunkel`, `--flaeche-dunkel-2`, `--akzent` und `--akzent-text` (Hauptwirkung), `--flaeche-tint` (helle Panels), `--text-blass` und `--text-blass-dunkel` (ungefüllte Wörter), `--fokus`, Radien, `--schrift-titel` und `--schrift-text` (Archivo, Hanken Grotesk).

## Marke wechseln
Tokens in `marke.css` setzen, Kontrast prüfen (Akzenttext auf Akzent, blasse Wörter mindestens 3 zu 1), Schrift aus `schriften.css` wählen, Platzhalterbilder (`.bild[data-platzhalter]`) ersetzen, alle Texte und `data-beispiel`-Werte (Daten, Preise, Namen, Zitate, Kontakt) durch echte, freigegebene Angaben ersetzen. Countdown: `data-ziel` auf das echte Datum, sonst Abschnitt entfernen.

## Grenzen
- Die Archivo-Datei ist nicht schmal wie eine Condensed-Schrift, die H1 wirkt dadurch breiter als die Referenz.
- Bilderleiste ist eine CSS-Perspektive, keine echte Kurve.
- Der Stimmenfächer ist mobil nur leicht gekippt und nicht überlappt, damit der Text lesbar bleibt.
- Formular im Fuß hat keine Auswertung (`action="#"`). Ticketknöpfe führen zu Ankern, ein Shop fehlt.
- Zitate, Namen, Preise und Orte sind Beispiele, keine Belege.
- Icons: Phosphor Icons (MIT, Lizenz in `_basis/icons/LICENSE-Phosphor.txt`), durchgehend Strichstärke bold, als Inline-Sprite am Seitenanfang; Partnerlogos sind erfundene Beispiellogos aus `_basis/logos.css`, beim Kunden ersetzen
