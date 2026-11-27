# t116 Produktfamilie im Feldversuch

Prinzip nach https://www.farmminerals.com/ (Startseite eines Agrarprodukts mit Produktfamilie und offener Versuchsübersicht, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel am 27.11.2026), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Beispielbranche: mineralischer Bodenverbesserer für Ackerbau und Grünland in Deutschland, alle Zahlen und Angaben sind Beispiele.

## Eignung
Erklärungsbedürftiges Produkt mit Familie und noch unfertiger Beleglage: Dünger, Bodenverbesserer, Futterzusätze, Saatgut, Pflanzenschutz, Gartenbau, auch Materialien und Technik mit Feldtests. Die Seite führt vom Problem (eine große Zahl) über die Lösung und das Produkt zur ehrlichen Versuchsübersicht und zur Anfrage. Ansprache im Sie, nüchtern. Lebt davon, dass sie zeigt, was noch nicht belegt ist.

## Sektionsfolge
Kopfzeile (transparent auf dem Held, nach dem Scrollen Waldgrün); Held (Produkt auf Podesten, Überschrift oben links, Aussage und Knopf unten rechts, Presse und Partner Reihe am Rand); Problem (Foto, Überschrift, große Zahl mit Quelle); Lösung (Grünfläche, Frage weicht der Antwort); Merkmale (drei Karten versetzt); Einsatz (Bodenschnitt, Pellet sinkt, vier Beschriftungen); Name (Produktname riesig und blass); Feldversuch (Foto, Kennzahlen als Tabelle); Produkte (drei Kacheln); Standorte (Liste und schematische Karte); Transparenz (Versuchsübersicht, Warum wir das teilen); Beiträge (Kartenreihe); Fragen (sechs Einwände); Anfrage (Formular auf Grün); Fuß.

## Beobachtet an der Referenz (gemessen) und abgeleitet
| Was | Wert | Stand |
|---|---|---|
| H1 | 86,4 px Desktop, 48,8 px mobil, Gewicht leicht, Schrift Aeonik | gemessen (berechneter Stil) |
| Fließtext | 13,8 px, Großbuchstaben bei Randtexten | gemessen |
| Held | 1147 px hoch, Überschrift oben links, zweite Aussage unten rechts, Partnerreihe am unteren Rand | gemessen |
| Lösungsabschnitt | 3456 px hoch auf 900 px Fenster (3,84 Fensterhöhen), darin eine pinnende Bühne mit Produkt, Frage, Antwort, drei Karten, Wasserszene mit vier Beschriftungen | gemessen und in Aufnahmen gesehen |
| Produktname | eigene pinnende Bühne von 900 px (Position sticky) mit riesiger blasser Schrift | gemessen |
| Karten | Merkmale und Produkte auf unterschiedlicher Höhe versetzt | gesehen |
| Palette | Waldgrün, Olive, Salbei, Creme (rgb 244 237 230), kein Violett | gemessen |
| Ablauf der Bewegung, Hover, Zwischenbreiten | nicht erfasst | unbekannt |
Die Bühne mit Wasser und Tablette ist in der Referenz ein Film. Hier ersetzt ein gezeichneter Bodenschnitt, der Verlauf ist an den Scrollweg gekoppelt (abgeleitet).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Das gezeichnete Produkt schwebt leicht (sieben Sekunden Schleife) | CSS `transform`, nur bei `no-preference` |
| Lösung | Signatur 1: Bühne pinnt über 300 svh, die Frage blendet aus, das Produkt wird kleiner und dreht leicht, die Antwort mit Knopf blendet ein | `--fortschritt` aus `bewegung.js`, CSS (`transform`, `opacity`), `stil.js` setzt `data-phase`, damit der unsichtbare Teil nicht fokussierbar ist |
| Einsatz | Signatur 2: Bühne pinnt über 380 svh, das Pellet sinkt durch den Bodenschnitt, vier Beschriftungen blenden nacheinander ein und aus | `--fortschritt`, CSS (`transform`, `opacity`) |
| Name | Der Produktname driftet beim Scrollen höchstens 4 vw zur Seite, Bühne pinnt über 230 svh | `--fortschritt`, CSS (`transform`) |
| Merkmale, Produkte, Texte | Karten staffeln ein, heben sich beim Überfahren (nur mit Maus) | `data-zeig`, `data-staffel`, CSS |
| Standorte | Eintrag und Punkt gehören zusammen, ein Ring wächst am gewählten Punkt | `stil.js`, CSS (`transform`, `opacity`) |
| Beiträge | Reihe blättert per Knopf oder Wischen, Einrasten | `stil.js`, `scroll-snap` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige, Kopf wird nach 24 px Scroll fest grün | `bewegung.js`, Klasse `gescrollt` |

Bei reduzierter Bewegung und ohne JavaScript bleibt alles sichtbar und ruhig: die drei Bühnen pinnen nicht, Frage und Antwort stehen untereinander, die vier Beschriftungen als Karten unter der Zeichnung, der Produktname steht still, das Produkt schwebt nicht. Gemessen mit Playwright bei `reducedMotion: reduce` und mit `javaScriptEnabled: false`: kein unsichtbarer Text, kein waagerechter Überlauf bei 1440 und 390. Performance Budget der Bühnen: je Frame ein Skriptlauf (`requestAnimationFrame`), nur `transform` und `opacity`, höchstens drei bewegte Ebenen je Bühne, `will-change` nur an Pellet und Namenswort. Leistung auf schwachen Geräten ungemessen.

## Tokens (marke.css)
`--flaeche` (Creme), `--flaeche-alt`, `--flaeche-dunkel` (Waldgrün tief), `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--gruen` (Grünfläche), `--gruen-mitte`, `--salbei`, `--salbei-hell`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--pellet`, `--pellet-hell`, `--pellet-praegung`, `--erde-oben`, `--erde-mitte`, `--erde-tief`, `--schrift-titel` und `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`. Die Verläufe der gezeichneten Produkte stehen als Farbwerte im Symbolblock am Anfang von `index.html`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 13,3 zu 1, auf `--flaeche-alt` 11,7; `--text-leise` auf `--flaeche` 6,7, auf `--flaeche-alt` 5,9; `--text-auf-dunkel` auf `--flaeche-dunkel` 13,6, auf `--gruen` 6,8, auf `--gruen-mitte` 10,7; `--text-leise-dunkel` auf `--flaeche-dunkel` 9,7, auf `--gruen` 4,9, auf `--gruen-mitte` 7,6; `--akzent-text` auf `--akzent` 13,6; `--text` auf `--salbei-hell` 10,2; `--salbei` auf `--gruen` 3,7 (nur der riesige Produktname, großer Text, Mindestwert 3 zu 1) und auf `--flaeche-dunkel` 7,3. Rand der Eingabefelder 4,1 zu 1 auf Weiß (Bedienelement, Mindestwert 3 zu 1). Das Kontrastverhältnis der Texte auf den vier Fotos wurde nicht gemessen: Das Foto unter den Beiträgen liegt unter einem Verlauf von 82 bis 94 Prozent Waldgrün. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das gezeichnete Produkt (Symbol `pellet`) für ein anderes Produkt durch dessen Umriss ersetzen, Flasche und Sack ebenso.

## Offen
Formulare senden nichts. Alle Zahlen (30 Prozent, Kennzahlen, Versuche, Termine), Standorte, Kulturen, Produktnamen, Beiträge, Medien und Partner (Platzhaltertexte, keine echten Namen und keine Logos) und die Antworten der Fragen sind Beispiele, keine Belege. Die Problemzahl braucht vor der Auslieferung eine geprüfte Quelle mit Jahr. Die Aussagen zu Nährstoffabgabe und Wurzelraum sind als Ziel formuliert, nicht als Wirkversprechen; Wirkaussagen zu Dünger, Umwelt und Düngeverordnung sind rechtlich nicht geprüft. Die Karte ist eine grobe, schematische Umrisszeichnung und nicht maßstäblich. Vier Fotos sind Beispielfotos anderer Themen (Setzling, Hände, Hügel), keine Fotos eines Betriebs oder Produkts (Nachweis in `BILDER.md`); ein Foto mit Acker und Kultur fehlt. Das Produkt im Held und im Bodenschnitt ist eine eigene Zeichnung, kein Produktfoto oder 3D Modell. Kein Film, die Referenz nutzt Film für die Wasserszene, hier nicht nachgebaut. Nicht erfasst und deshalb nicht nachgebaut: Hover der Referenz, genauer Zeitverlauf, Verhalten bei Zwischenbreiten, Kontakt Overlay. Safari, Screenreader und echte Geräte nicht geprüft. Die Bühnen pinnen 300, 380 und 230 svh: die Seite wird dadurch lang (Desktop rund 16 800 px).

## Conversion (Playbook)
- Held: Landwirte im Ackerbau und Grünland, Problem Dünger geht vor der Pflanze verloren, Lösung mineralischer Bodenverbesserer in Pelletform, Beleg durch offene Versuchsübersicht statt Versprechen
- H1 "Dünger, der bei der Pflanze ankommt.", Unterzeile nennt Nutzen und Versuche
- Primär CTA "Produkte anfragen" in Kopf, Held, Lösung, Transparenz, Anfrage und Fuß
- Titel mit Produkt und Nutzen (59 Zeichen), Beschreibung mit Produkt, Versuchsübersicht, Beratung, Anfrage
- FAQ: Preis je Hektar, Technik, Belege, Düngeverordnung, Teilfläche testen, Lieferung
- Formularziel: Anfrage für den Betrieb (Name, E-Mail, Telefon, Fläche, Kultur und Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon
- Risikoumkehr: kleine Teilfläche zum Testen, offene Ergebnisse auch bei schwachem Ausfall
- Zahlen, Stimmen und Aussagen als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Leiste stört das Heldbild nicht, wird erst über Inhalt fest, Primärknopf immer erreichbar |
| held | hero | Gezeichnetes Produkt auf ruhiger Bühne als Mittelpunkt, Überschrift oben links, Aktion unten rechts, Presse am Rand |
| problem | problem | Eine große Zahl mit Quelle macht den Schmerz greifbar, das Foto bleibt Stimmung |
| loesung | interactive | Die Frage wird auf derselben Bühne beantwortet, das Produkt wird dabei kleiner |
| merkmale | features | Drei kurze Karten mit versetzter Höhe brechen das Raster, ohne zu unterhalten |
| einsatz | interactive | Das Produkt wandert durch eine gezeichnete Bodenschicht, jede Beschriftung steht dort, wo es passiert |
| name | editorial | Produktname als Fläche prägt sich ein und trennt Erklärung vom Beleg |
| feld | technical | Tabelle mit Wert, Bedeutung und Stand ist ehrlicher als Kacheln |
| produkte | product | Drei gleich gebaute Kacheln zeigen die Familie auf einen Blick |
| standorte | interactive | Liste und Karte hängen zusammen, Wahl in einem zeigt den anderen |
| transparenz | cases | Offen zeigen, was noch läuft, und begründen, warum, schafft mehr Vertrauen als Erfolgsmeldungen |
| beitraege | editorial | Seitlich blätterbare Reihe zeigt Lebendigkeit ohne die Seite zu verlängern |
| fragen | faq | Einwände vor der Anfrage im Akkordeon, Antworten nehmen Risiko weg |
| anfrage | forms | Der Abschluss wiederholt die Kernaktion auf ruhigem Grün mit fünf Feldern und sichtbarem Telefon |
| fuss | footer | Wiederholt Knopf und Kontakt, verlinkt auf die Inhalte |

Einzelheiten je Abschnitt (Selektor, CSS Präfix, Skript, Hinweis zum Herauslösen) stehen in `ABSCHNITTE.json`.
