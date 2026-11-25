# t42 Finanz App, drei Varianten

Prinzip nach der freigegebenen Referenz Soltio (Tor 1 erteilt), alle drei Startseiten (home-one, home-two, home-three) als **ein Template mit drei Varianten** nachgebaut: Aufbau, Raster, Sektionsfolge und Art der Bewegung. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

| Datei | Variante | Kurzname |
|---|---|---|
| `index.html` | 1 | Karte im Fokus |
| `v2.html` | 2 | Bühne und Orbit |
| `v3.html` | 3 | App mit Karten |

Alle drei teilen `marke.css` (Marke einmal einstellen, alle folgen), `stil.css` (Kopf, Knöpfe, Kartenmotive, Laufschrift, Stimmen, Fuß), `stil.js`. Variantenspezifisch: `stil-v1.css`, `stil-v2.css`, `stil-v3.css`. Kopf und Fuß sind in allen drei gleich, der Fuß verlinkt die drei Ansichten.

## Eignung
Finanz-App, Konto und Karte, Zahlungsdienste, Buchhaltungswerkzeuge, Anlage- und Kreditberatung für Selbständige und kleine Betriebe. Auch für jedes Produkt, das sich über Oberflächen mit Zahlen erklärt (Dashboards, Auswertungen). Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Produktbilder tragen die Kartenmotive aus Flächen die Seite, mit echten Screenshots ersetzt man sie je Stelle. Rechtliche Angaben zu Finanzprodukten (Pflichtangaben, Risikohinweise, Aufsicht) gehören je Kunde dazu und fehlen hier bewusst.

## Sektionsfolge
**1 Karte im Fokus:** schwebende Kopfleiste, dunkle Bühne mit großer Zeile links und schwebender Bankkarte rechts, Logolaufband, Bildkarte mit Telefon neben Text und zwei Kennzahlen, vier Karten im Wechsel breit und schmal, riesige Laufschrift, Sammelzahlung mit Funktionsliste und Auswertungsrahmen, dunkle Bühne mit drei Auswertungskarten, Belegkarte neben Text, vier Werkzeugkarten, sechs Stimmen in drei versetzten Spalten, Aufruf und Fuß. Neu: Fragen (Akkordeon) vor dem Fuß.
**2 Bühne und Orbit:** mittiger Held, darunter ein Kartenfeld aus Karte und Zahlenkarten, das beim Scrollen aufsteigt, Logolaufband, schräges Telefon neben Text, Auslandsüberweisung (Abbild) mit Punktekarte, zwei Karten neben einer hohen Bildkarte, Halbkreise mit Anbindungen, Video mit Wortlicht und zwei dunkle Funktionspaneele, drei Stimmen, Aufruf und Fuß. Neu: Fragen (Akkordeon) vor dem Fuß.
**3 App mit Karten:** Held mit Telefon in der Mitte und drei farbigen Karten rechts (eine offen, wechselt von selbst), Logolaufband, Währungsliste neben Text und Akkordeon, Text und zwei Zahlen neben dunkler Bildfläche, drei nummerierte Karten, dunkle Bühne mit zwei Karten und einer breiten, riesige Laufschrift mit Reitern, Laptop und Anbindungen, Stimmenspur mit Pfeilen, Preisumschalter mit drei Tarifen, Aufruf und Fuß.

## Animationen
| Wo | Variante | Was | Wie |
|---|---|---|---|
| Held | 1 | Bankkarte schwebt, Text staffelt ein | `.schweben` (transform), `data-zeig`, `data-staffel` |
| Held | 2 | Bühne bleibt stehen, Kartenfeld steigt auf, Ringe weiten sich (nur Desktop, nur ohne reduzierte Bewegung) | `data-fortschritt` setzt `--fortschritt`, CSS rechnet transform |
| Held | 3 | drei Karten, eine offen, Wechsel alle fünf Sekunden, Stopp bei Mauszeiger, Fokus und Klick | `stil.js`, Einblenden per Deckkraft |
| Kopf | alle | dunkle Fläche blendet beim Scrollen ein, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, `.gescrollt` |
| Kennzahlen | 1, 3 | Zähler, Endwert steht im HTML | `data-zaehle` |
| Balken, Säulen | 1, 2, 3 | wachsen von unten beim Einblenden | `scaleY`, `.ist-da` |
| Laufschrift | 1, 3 | riesiger Text läuft seitlich, bei reduzierter Bewegung steht er umbrochen und mittig | `.laufschrift` |
| Anbindungen | 2 | Punkte auf Halbkreisen schweben leicht | `translate` |
| Aussage | 2 | Wörter hellen beim Scrollen auf | `data-licht` |
| Video | 2 | Knopf zeigt nur den Hinweis, dass hier ein Video eingebunden wird | `stil.js` |
| Währungen | 3 | Akkordeon, Plus dreht zum Kreuz | `details` mit `data-exklusiv` |
| Reiter | 3 | zwei Reiter, Pfeiltasten wechseln | `stil.js`, ohne JavaScript stehen beide Felder untereinander |
| Stimmen | 3 | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Preise | 3 | Umschalter monatlich oder jährlich tauscht die Zahlen | `stil.js`, im HTML steht der Monatspreis |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-karte`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--flaeche-dunkel-3`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Minze: auf Dunkel Text und Fläche, auf Hell nur Fläche mit dunklem Text), `--akzent-text`, `--akzent-tief` (Text und Linie auf Hell), `--akzent-2` (Limette) und `--signal` (Koralle) als weitere Flächen mit dunklem Text, `--knopf` und `--knopf-text` (Hauptknopf auf Hell), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter und Kartenmotive.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-tief` auf `--flaeche`, `--akzent-text` auf `--akzent`, `--akzent-text` auf `--akzent-2` und `--signal`, `--text-leise-dunkel` auf `--flaeche-dunkel-2`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen je Seite), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Alle Zahlen, Namen, Kartennummern, Preise, Bewertungen und Tarife sind Beispiele, keine Belege; die Beispiellogos sind Beispiellogos. Die Auslandsüberweisung in Variante 2 ist ein Abbild ohne Funktion (kein Formular), der Videoknopf zeigt nur einen Hinweis, die Preise in Variante 3 haben keinen Bestellweg. Die drei Kartenmotive je Variante sind aus Flächen und Text gebaut, keine Fotos; die Platzhalterflächen (`data-platzhalter`) brauchen Bilder. Kontrast von Text über Bildern nach dem Einsetzen neu prüfen. Die Varianten 1 bis 3 haben je eigene Stilteile, die Marke gilt für alle. Zwei Links im Fuß (Impressum, Datenschutz, Geschäftsbedingungen) sind Platzhalter. Ein Hinweis zu den Finanzangaben (Pflichtangaben, Aufsicht) fehlt je Kunde.

## Conversion (Playbook)
- Fragen als Akkordeon (`#fragen`, fünf Beispielantworten) in Variante 1 und 2; Variante 3 hatte schon ein Akkordeon
- Beleg (Avatare und Bewertung wie in Variante 1) im Held von Variante 2 und 3, Kommentar zur Heldenformel in allen drei Varianten
- Beschreibung von Variante 2 auf unter 160 Zeichen gekürzt
