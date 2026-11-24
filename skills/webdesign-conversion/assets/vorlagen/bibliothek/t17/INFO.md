# Kontor (t17)

**Eignung:** Beratung und Dienstleister mit Kennzahlen, Fallbeispielen und Stimmen (Finanz, Steuer, Unternehmensberatung, Planung). Ruhig, hell mit dunklen Flächen, großzügig, bildgetragen.

## Sektionsfolge
1. Kopfzeile (fest, über dem Held durchsichtig, nach dem Scrollen dunkel, Anfrageknopf, mobil Burger)
2. Held: Vollbild, H1 oben links, Kurztext, zwei Knöpfe und Telefon unten rechts, Hinweis auf Zahl unten links
3. Über uns: Leitsatz, Bild mit zwei Kennzahlen, Laufband mit Platz für Logos
4. Leistungen: Überschrift mit Knopf, drei Bildkarten
5. Vorteile: hohes Bild, vier Karten mit Symbol
6. Fallbeispiele: drei Rahmen mit Bild und dunkler Karte, wechselnde Seite, stapeln sich
7. Stimmen: eine Aussage je Ansicht, Pfeile
8. Aufruf: Bildfläche mit Überschrift und zwei Knöpfen
9. Zitat auf Bildfläche
10. Fragen und Antworten (Akkordeon)
11. Kontakt: dunkle Karte mit heller Formularkarte
12. Fuß: Links, Kontakt, Newsletter, große Wortmarke, Impressum und Datenschutz

## Animationen
- Held bleibt stehen, die helle Fläche schiebt sich darüber, der Held dunkelt dabei ab (`data-abdunkeln`, `--dunkel` aus `bewegung.js`).
- Leitsatz erhellt sich Wort für Wort (`data-licht`, `bewegung.js`), Zähler laufen beim Sichtbarwerden (`data-zaehle`, Endwert steht im HTML).
- Einblenden und Staffeln (`data-zeig`, `data-staffel`), Laufband gegenläufig bei Hover pausiert.
- Fallbeispiele kleben ab 64 em übereinander, der überdeckte Rahmen schrumpft leicht und blasst ab (`stil.js`, `--abd`).
- Aufrufbild zoomt beim Einlaufen von 130 auf 100 Prozent (`--z`), Wortmarke im Fuß steigt auf.
- Stimmen blättern per Pfeil, Pfeiltasten und Wischen (Scroll Snap), am Rand gesperrt.
- Hover: Karten heben sich, Bild der Leistungskarte wächst, Pfeil rückt. Akkordeon: Plus wird zum Minus.
- Bei `prefers-reduced-motion`: Held scrollt normal, keine Stapel, kein Zoom, Wortmarke ruhend, alles voll sichtbar. Ohne JavaScript ist aller Inhalt sichtbar.

## Tokens zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--akzent` und `--akzent-text`, `--akzent-hell` (Rahmen der Fälle), `--text-blass` (noch nicht erhelltes Wort, mindestens 3 zu 1), `--fokus`, Radien, `--schrift-titel` und `--schrift-text` (Instrument Sans, Hanken Grotesk).

## Marke wechseln
Tokens in `marke.css` setzen, Kontrast prüfen, Schrift aus `schriften.css` wählen, Logo und `favicon.svg` anpassen, Platzhalterbilder (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispieltexte, Kennzahlen, Fälle, Stimmen und Kontaktdaten durch echte, freigegebene Angaben ersetzen. Laufband nur mit Logos echter Kunden und deren Freigabe, sonst entfernen.

## Grenzen
- Alle Bilder sind Verläufe. Kontrast von Text über echten Fotos ist nicht gemessen, die dunklen Verläufe darunter schon.
- Formulare haben keine Auswertung (`action="#"`), Impressum und Datenschutz verlinken auf `#`.
- Der Fallstapel nutzt `position: sticky` mit Skalierung per JavaScript, nur im Chromium geprüft.
- Zahlen, Fälle, Zitate und Namen sind Beispiele, keine Belege.
