# t108 Marktbeobachtung Trichter und Werkzeugleiste

Prinzip nach https://www.dropship.io/ (Startseite, eigene Aufnahme am 26.11.2026, Desktop 1440 und Mobil 390, vom Inhaber freigegeben). Übernommen sind Aufbau, Sektionsfolge, Dichte und Art der Bewegung. Text, Bild, Icons, Marke, Code, Schrift und Farbe sind eigen. Referenz: weiß mit Blau und Plus Jakarta Sans, hier Grün, Sonnengelb und Koralle mit Schibsted Grotesk und Instrument Sans.

## Eignung
Software oder Dienste für Onlinehändler, Produktrecherche, Preis und Marktbeobachtung, auch andere Werkzeugsammlungen (Analyse, Anzeigen, Lieferanten), die mit Dashboard Ansichten, Browser Erweiterung und Testanmeldung arbeiten. Ansprache im Du. Abgesetzt von t44, t45, t49, t70, t78 (dunkel oder blau, ein Produktbild) durch hellen Grund, drei gegenläufige Produktreihen, grünen Bogen mit Werkzeugleiste und wechselnden Ansichten.

## Sektionsfolge
Kopfleiste (Menü, Anmelden, Primärknopf), Held (zentriert, Meldung mit Punkt, H1, Text, zwei Knöpfe, Telefon, darunter drei Reihen Produktkarten, die in einen Trichterstrom münden), dunkler Bogen mit Titel, Werkzeugleiste (sechs Reiter) mit Ansicht aus HTML und drei Punkten, zwei Funktionskarten (fallende Produkte, Umsatzringe), KI Suche (dunkel, Strahlen, Eingabefeld, laufende Beispielfragen), sechs Vorteilskarten mit kleinen HTML Zeichnungen, Browser Erweiterung (Fenster mit aufpoppenden Umsatzmeldungen), Artikel (große Karte und Liste), Fragen (sechs details), Abschluss (dunkel, Werkzeugfächer, Formular), weißer Fuß mit Linkspalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Meldung, Titel, Text und Knöpfe blenden gestaffelt ein | `data-zeig`, `bewegung.js` |
| Produktreihen (Signatur) | drei Reihen laufen gegenläufig und in verschiedenem Tempo, Tropfen fallen den Strom hinab in den Bogen | CSS (`transform`, `opacity`), echte Elemente, Reihe nur als Dekoration (`aria-hidden`) |
| Werkzeugleiste | Reiter mit Pfeiltasten, Symbol hebt sich, Balken der Umsatzansicht wachsen beim Wechsel | `stil.js`, CSS (`transform`) |
| Funktionskarten | Produkte fallen in die Kiste, Ringe pulsieren, Umsatzmeldungen blenden nacheinander ein | CSS (`transform`, `opacity`) |
| KI Suche | Strahlen atmen, Beispielfragen heben der Reihe nach an | CSS (`opacity`, `transform`) |
| Vorteile | Karten staffeln ein und heben sich beim Überfahren, kleine Zeichnungen laufen leise | `data-staffel`, CSS |
| Erweiterung | Umsatzmeldungen poppen nacheinander im Browserfenster auf | CSS (`transform`, `opacity`) |
| Abschluss | Werkzeugfächer spreizt sich beim Überfahren | CSS (`transform`) |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |

Bei reduzierter Bewegung steht alles still und sichtbar (Produktreihen wischbar, Meldungen eingeblendet). Ohne JavaScript stehen alle sechs Werkzeugansichten untereinander, die Reiterleiste ist verborgen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (tiefes Grün, Fläche mit weißem Text), `--akzent-text`, `--himmel`, `--sonne`, `--koralle` (nur Fläche und Zeichen), `--gruen-hell`, `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien. Nachgerechnete Kontraste (WCAG) stehen in `marke.css`: Weiß auf Akzent 7,9, Text auf Fläche 14,6, Leisetext auf Fläche 6,6 und auf Weiß 7,3, Text auf Dunkel 14,3, Leisetext auf Dunkel 7,6, dunkler Text auf Sonnengelb (Knopf der KI Suche) über 12.

## Marke wechseln
Nur `marke.css` ändern. Kontrast der oben genannten Paare neu prüfen. Die Kachelfarben der Werkzeuge stehen als `--k` im Markup (`style`), die Produktfarben als `--c`. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formular sendet nichts. Alle Produkte, Preise, Umsätze, Shopnamen, Artikel, Antworten und Zahlen sind Beispiele, keine Belege. Die Aussagen zu Datenherkunft und Erlaubnis in den Fragen sind nicht rechtlich geprüft (Auswertung fremder Shopdaten, Anzeigenarchive, Schätzungen von Umsätzen: je Anbieter klären, keine Genauigkeit zusagen). Kein Gewinn oder Erfolgsversprechen, keine Bewertungsleiste und keine Nutzerzahl, weil unbelegt. Keine Fotos, die Oberflächenzeichnungen sind einfach gehalten und im Projekt durch echte Produktansichten zu ersetzen. Die Reiter zeigen sechs statt zehn Werkzeuge der Referenz. Bewegung nach Beobachtung der Startseite, nicht Bild für Bild. Kontrast von Text auf dem Verlauf im Held ist nicht gemessen (Fläche hell). Safari, Screenreader und echte Geräte nicht geprüft. Die Kopfleiste ist sticky, bei Ankern `scroll-margin-top` im Projekt ergänzen. Die Produktreihen laufen dauerhaft, ein Pause Schalter fehlt (Dekoration, nach WCAG 2.2.2 im Projekt prüfen, ob einer nötig ist).

## Conversion (Playbook)
- Held: Onlinehändler, Problem Produkte nach Bauchgefühl wählen, Lösung Umsätze, Anzeigen und Wettbewerber anderer Shops sehen, Handlung kostenlos testen
- H1 "Finde Produkte, die sich wirklich verkaufen", Unterzeile nennt Umsätze, Bestseller, Anzeigen und die Entscheidung mit Zahlen
- Primär-CTA "Kostenlos testen" in Kopf, Held, jeder Werkzeugansicht, KI Suche, Erweiterung, Formular und Fuß
- Titel mit Keyword, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Preis nach der Testphase, Karte nötig, Genauigkeit, Datenherkunft, Vorkenntnisse, Löschen
- Formularziel: Testzugang (Name, E-Mail, Shopadresse freiwillig, erstes Ziel), vier Felder, Hinweise unter E-Mail und Shopadresse
- Alle Zahlen und Antworten als Beispiel gekennzeichnet
