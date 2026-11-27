# t121 Quellwasser Dosen Bühne

Prinzip nach https://morphowater.com/ (Startseite einer Getränkemarke, Quellwasser in Dosen, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, scrollend erfasst), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen.

## Beobachtet, abgeleitet, unbekannt
- Beobachtet (gemessen, Desktop 1440 x 900 und Handy 390 x 844): Seitenhöhe 24479 px (Desktop) und 21864 px (Handy); Grund dunkel (#101820); 7 pinnende Bühnen (`position: sticky`, Höhe 900 beziehungsweise 844 px, also je ein Bildschirm), 3 Canvas, 7 Videos; H1 97,9 px Gewicht 300 (Handy 48,8 px); H2 zwischen 51,8 und 133,9 px, fast alle Gewicht 300; Sektionsfolge Held, Ort, Orte der Welt (Globus), Lebensalltag, Mineralien (vier H3), Bildband, Abschlusszeile mit Linkliste, Newsletter, Fuß. Dose als 3D Objekt in der Mitte des Helds, Aussage links, kleine Zeile rechts, Kopfpille mit Menü, Play und Ton Schalter unten, Chat Knopf unten rechts, Kachelband mit zwei Pfeilen.
- Abgeleitet: Die Geschichte läuft über Scrollstrecken, die Szenen wechseln am Scrollweg; der Bildschirm bleibt dabei stehen. Der Deckelschnitt (Dose von oben) ist die Überleitung aus dem Held in die Geschichte.
- Unbekannt: Hover, Zeitverläufe der Videos und der 3D Dose, Verhalten bei Zwischenbreiten, Ton.

## Eignung
Einzelprodukt Marke mit Herkunftsgeschichte: Quellwasser, Craft Getränke, Saft, Bier, Kaffee in Dosen, auch Kosmetik mit Naturbezug. Die Seite führt in einer Scrollgeschichte vom Produkt über Ort und Weg zur Zusammensetzung und zur Bestellung. Ansprache im Du. Lebt von wenigen großen Bildern und viel Ruhe, nicht von vielen Texten. Abgrenzung zu t111 (Leuchte, Tagesverlauf, helle Abschnitte): hier ganz dunkel, Szenen statt Zeitstufen.

## Sektionsfolge
Kopfpille (Menü in der Mitte, Telefon, Knopf) · Held (Aussage links, gezeichnete Dose, kleine Zeile rechts) · Öffnen (Deckel von oben wächst) · Szenen (drei Stationen auf einer pinnenden Bühne) · Lage (Karte, drei Orte) · Weg (Tropfen fällt durch Schichten) · Mineralien (vier Einträge) · Anlässe (große Aussage, drei Situationen) · Sorten (Still und Medium) · Bildband (Kacheln mit Pfeilen) · Abschluss (große Zeile, Linkliste) · Fragen (sechs Einwände) · Anfrage (Gastro und Handel, fünf Felder) · Neuigkeiten (ein Feld) · Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Signatur 1: Die Bühne bleibt stehen (Sticky, 230 svh, ab 62rem), die Dose hebt sich, neigt sich leicht und wächst, der Schein wird stärker, der Text tritt zurück | `--fortschritt` aus `bewegung.js`, CSS (`transform`, `opacity`) |
| Öffnen | Der Dosendeckel wächst von klein auf bildfüllend und dreht sich leicht, der Text hellt auf (Sticky, 260 svh) | `--fortschritt`, CSS (`transform`, `opacity`) |
| Szenen | Signatur 2: Eine Bühne (Sticky) bleibt stehen, die Station in Bildschirmmitte schaltet Szene (Überblendung mit leichtem Zoom) und Zähler um | `stil.js` (IntersectionObserver), CSS (`opacity`, `transform`) |
| Lage | Knöpfe schalten Ort, Pin und Text, der Ring um den Pin wächst | `stil.js`, CSS (`transform`, `opacity`) |
| Weg | Der Tropfen fällt über den Scrollweg durch die Schichten, die drei Punkte hellen nacheinander auf (Sticky, 300 svh, ab 62rem) | `--fortschritt`, CSS (`transform`, `opacity`) |
| Mineralien | Karten staffeln ein, Zahlen zählen hoch | `data-staffel`, `data-zaehle` |
| Anlässe | Wörter hellen beim Scrollen auf, die Landschaft steigt leicht gegen die Scrollrichtung | `data-licht`, `data-parallax` |
| Sorten | Karten staffeln ein, Dose hebt sich bei Hover (nur mit Maus) | `data-staffel`, CSS |
| Bildband | Pfeile scrollen um eine Kachel, Pfeil am Ende inaktiv, Wischen und Pfeiltasten über Scrollbereich | `stil.js`, `scroll-snap` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript bleibt alles sichtbar: Held, Öffnen und Weg pinnen nicht und stehen im Endzustand, die Szenen zeigen je Station eine kleine Zeichnung im Text, alle drei Ortstexte stehen da, das Bildband scrollt von Hand. Auf dem Handy pinnen Öffnen und Szenen, Held und Weg stehen im Endzustand (der Held ist dort höher als ein Bildschirm).

Performance Budget: vier pinnende Bühnen (Held, Öffnen, Szenen, Weg), animiert werden nur `transform` und `opacity`, kein Canvas, kein Video, keine Bibliothek. Der Scrollhandler ist ein einziger `requestAnimationFrame` in `bewegung.js`. Leistung auf schwachen Geräten ungemessen.

## Abschnitte (Baukasten)
Jeder Abschnitt trägt `data-abschnitt`, eigenes Klassenpräfix und lässt sich mit `marke.css`, `basis.css` und seinen Regeln herauslösen. Maschinenlesbar in `ABSCHNITTE.json`.

| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Menü, Telefon und Hauptaktion bleiben erreichbar, die Pille hält sie zusammen |
| held | hero | Produkt allein auf dunkler Bühne in der Mitte, Aussage links, Nebenzeile rechts |
| oeffnen | product | Perspektivwechsel (Dose von oben) als Übergang in die Geschichte |
| szenen | editorial | Eine Bühne bleibt stehen, der Ort wechselt hinter dem Text |
| lage | interactive | Einfache Karte mit drei wählbaren Orten |
| weg | editorial | Ein bewegtes Bild erklärt den Prozess |
| mineralien | features | Vier gleich aufgebaute Einträge machen die Zusammensetzung vergleichbar |
| anlaesse | benefits | Große Aussage über ruhigem Bild, Nutzen als Alltagsbild |
| dosen | product | Zwei Varianten gleichwertig mit gleichen Datenzeilen |
| bildband | portfolio | Waagerechtes Kachelband mit Pfeilen |
| abschluss | cta | Übergroße Schlusszeile mit Hauptaktion und Linkliste |
| fragen | faq | Sechs Kaufeinwände als aufklappbare Antworten |
| anfrage | forms | Fünf Felder mit Feldhinweis für Großabnehmer |
| journal | forms | Ein Feld, klarer Hinweis auf die Bestätigungsmail |
| fuss | footer | Hauptaktion, Kontakt und Pflichtlinks am Ende |

## Tokens (marke.css)
`--flaeche` (Tiefwasser), `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Eisblau, Fläche mit dunklem Text), `--akzent-text`, `--quelle` (Wasserfarbe für Ziffern und Linien), `--tiefe`, `--moos`, `--nebel`, `--kachel` (Textkarten über Szenen), `--feld-rand`, `--dose-hell`, `--dose-mittel`, `--dose-dunkel`, `--dose-still`, `--dose-medium`, `--schrift-titel` (Outfit, Gewicht 300), `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`. Die Zeichnungen (Dose, Szenen) haben ihre Farben fest im SVG Block von `index.html`, bei einer neuen Marke dort mitziehen.

## Marke wechseln
`marke.css` ändern, dann im SVG Block am Seitenanfang Dose und Szenen anpassen. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 15,7 zu 1, auf `--flaeche-alt` 14,0, auf `--flaeche-dunkel` 16,6, auf `--kachel` 11,4; `--text-leise` auf `--flaeche` 8,6, auf `--flaeche-alt` 7,7, auf `--flaeche-dunkel` 9,1, auf `--kachel` 6,2; `--akzent-text` auf `--akzent` 14,6; `--quelle` auf `--flaeche` 8,3 (nur Ziffern, Linien, Zeichen); Rand der Eingabefelder `--feld-rand` auf `--flaeche-alt` 5,2 und auf `--flaeche` 5,9 (Bedienelement, Mindestwert 3 zu 1). Der Text auf den Szenen steht immer auf einer Karte (`--kachel`), nie frei auf dem Bild. Der Name "Markenname" steht in Titel, Logo, Fuß, Dose und JSON-LD.

## Offen
Formulare senden nichts. Preise, Pfand, Lieferzeit, Mengen, Analysewerte (Calcium, Magnesium, Kalium, Natrium), Hektar und Höhen, Ortsangaben, Name und Fragen samt Antworten sind Beispiele, keine Belege. Alle Bilder sind eigene Zeichnungen (Dose, Szenen, Karte, Querschnitt), keine Fotos; im Projekt durch Produktfotos und Aufnahmen der Quelle ersetzen. Nicht nachgebaut: 3D Dose, Videos, Ton, Chat Schaltfläche, Cookie Panel (ohne echte Funktion wäre es irreführend; Einwilligung baut der Bauablauf mit echter Funktion), Sprachumschalter. Rechtlich nicht geprüft: Bezeichnung "Mineralwasser" (nur mit amtlicher Anerkennung), Nährwert und Analyseangaben, Preisangabenverordnung (Grundpreis je Liter), Pfand, Widerruf. Safari, Screenreader und echte Geräte nicht geprüft. Die Zeichnung der Dose liest sich bei kleiner Größe nur als Form, die Schrift darauf ist Zierde.

Befund zur Referenz (nicht übernommen): Die Referenz verbindet Wohlbefinden und Langlebigkeit mit ihrem Wasser (Abschnitte zu Orten mit langem Leben, Überschriften wie "Mehr Jahre. Mehr Leben.") und beschreibt Mineralien mit körperlichen Wirkungen. Für Deutschland ist das heilmittelwerberechtlich (HWG) und lebensmittelrechtlich (Health Claims Verordnung) heikel. Diese Vorlage macht bewusst keine Gesundheits oder Lebensdauer Aussage: Mineralien erscheinen nur mit Herkunft und Geschmack. Umgedreht nach Kapitel 26 und nicht nachgebaut: kursive Serifenwörter in Überschriften.

## Conversion (Playbook)
- Held: Wasser Kenner, Büros und Gastro in Deutschland, Problem Plastikflasche oder schweres Glas unterwegs, Lösung Harzer Quellwasser in der Alu Dose, Lieferung in 2 bis 4 Werktagen als Risikoumkehr
- H1 "Quellwasser aus dem Harz, in der Dose dabei", Unterzeile nennt Sorten, Herkunft und Lieferung
- Primär CTA "Kasten bestellen" in Kopf, Held, Anlässe, Sorten (zweimal), Abschluss und Fuß
- Titel mit Produkt und Herkunft, Beschreibung mit Sorten, Mineralien und Bestellung
- FAQ: Preis, Anerkennung, Pfandrückgabe, Lieferung, Gastro, Analyse
- Formularziel: Angebot für Gastro und Handel (Name, E-Mail, Telefon, Menge, Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon; dazu Newsletter mit einem Feld
- Zusagen, Preise, Werte und Antworten als "Beispiel" gekennzeichnet
