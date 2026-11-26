# t94 Küchenstudio dunkel und gold

Prinzip nach einem Pinterest Screenshot des Inhabers (Küchenstudio, durchgehend dunkles Anthrazit mit Gold, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Abgesetzt von t91 (Innenarchitektur, hell mit dunklen Flächen, Outfit) und t36 (Restaurant): hier durchgehend dunkel, eckige Formen, Schibsted Grotesk und Instrument Sans.

## Eignung
Küchenstudios, Küchenbauer und Schreinereien mit Küchenplanung, die hochwertig wirken und Planungstermine gewinnen wollen. Lebt von echten Küchenfotos. Ansprache im Sie. Für andere Möbelgewerke (Bad, Einbauschränke) die Texte der Stilrichtungen und Küchen ersetzen.

## Sektionsfolge
Kopf (Wortmarke, Menü, Telefon, Goldknopf), Vollbildheld (drei Fotos, zentrierte Überschrift, Knopf, Beleg, Telefon, Pünktchen und Pause), Intro (Kennzahlrahmen, Überschrift, Text), vier Stilkarten im Hochformat, Warum wir (vier Symbole), Videokarte, Partnerleiste, Raster aus sechs Küchen, Ablaufkarte mit Foto und Goldsiegel, Stimmen in zwei Karten, Ansatz mit Foto, vier Kennzahlen, Ratgeber mit drei Karten, Fragen, Vollbildaufruf mit Anfrageformular, Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | drei Fotos wechseln alle 6 Sekunden, aktives Foto zoomt langsam, Pünktchen wählen, Pause hält an (WCAG 2.2.2) | `stil.js`, CSS (`transform`, `opacity`) |
| Stilkarten | Bild zoomt, Beschreibung und Link fahren beim Überfahren oder Fokus hoch, mobil Wischspur mit sichtbarem Text | CSS (`transform`, `opacity`) |
| Warum wir | Karten gestaffelt, Linien der Symbole zeichnen sich | `data-zeig`, `data-staffel`, CSS (`stroke-dashoffset`) |
| Video | Platzhalter mit Poster, Knopf schaltet Abspielen und Pause, das Poster fährt solange langsam | `stil.js`, CSS |
| Küchenraster | gestaffeltes Einblenden, Bildzoom, Goldrahmen und Beschriftung beim Überfahren | `data-staffel`, CSS |
| Goldsiegel | Schrift auf dem Ring dreht langsam, bei reduzierter Bewegung statisch | CSS (`transform`) |
| Zähler | Intro und Kennzahlen zählen auf, Endwert steht im HTML | `data-zaehle` |
| Ansatz, Aufruf | Foto driftet gegen die Scrollrichtung (Parallaxe) | `data-parallax` |
| Stimmen, Fragen | Karte hebt sich, Akkordeon mit einem offenen Eintrag | CSS, `data-exklusiv` |
| Seite | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige, Kopf wird beim Scrollen dunkel | `bewegung.js` |

Bei reduzierter Bewegung wechselt der Held nicht selbst (Pünktchen bleiben bedienbar), nichts zoomt, dreht oder driftet. Ohne JavaScript steht das erste Heldfoto, die Steuerung bleibt verborgen, alles andere ist sichtbar.

## Tokens (marke.css)
`--flaeche` (Anthrazit), `--flaeche-alt`, `--flaeche-tief`, `--text`, `--text-leise`, `--linie`, `--akzent` (Gold, Fläche mit dunklem Text, auf Dunkel auch Text und Zeichen), `--akzent-text`, `--akzent-stark` (Hover, große Zahlen), `--schleier` (Verlauf über Fotos), `--feld-rand`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-4` für Bildplatzhalter. Gemessene Kontraste: Text auf Fläche 13,7 zu 1, Leisetext 7,1 bis 9,2, Gold auf Fläche 7,4 und auf Alt 6,5, dunkler Text auf Gold 8,5, Feldrand 5,2.

## Marke wechseln
Nur `marke.css` ändern. Gold nie als Textfarbe auf einer hellen Fläche verwenden (die ganze Seite ist dunkel, das gilt, falls eine Marke helle Flächen einführt). Kontrast von `--akzent-text` auf `--akzent` prüfen. "Markenname" steht in Titel, Logo, Fuß und `aria-label`. Wortmarke und Favicon (`favicon.svg`) sind Platzhalter.

## Offen
Formulare senden nichts. 25 Jahre, 4,9 von 5 aus 120 Bewertungen, 350 Küchen, 12 im Team, Stimmen, Namen, Anschrift, Telefon und Ratgeberbeiträge sind Beispiele (`data-beispiel`), keine Belege. Küchenfotos sind knapp: Stilkarten, Video, Ablauf, Ansatz und Blog zeigen Räume statt Küchen, zwei Rasterfelder sind Platzhalter (`bilder/BILDER.md`). Das Video ist ein Platzhalter, ein echtes Video braucht Poster, Untertitel und Pausenknopf. Partnerleiste zeigt Kategorien mit neutralen Symbolen statt Herstellerlogos, echte Logos nur mit Freigabe der Hersteller. Die Siegelschrift (SVG, etwa 13 Pixel) ist Zierde ohne Information. Kontrast von Text über Fotos wurde für Held und Aufruf über den Schleier berechnet, mit echten Fotos neu prüfen. Preis-, Garantie- und Lieferaussagen in Fragen und Karten sind Beispielantworten und je Betrieb zu klären. Kein Safari und kein Screenreader getestet.

## Conversion (Playbook)
- Held: Paare und Hausbesitzer, die eine neue Küche wollen, aber Planungsfehler, offene Kosten und viele Ansprechpartner fürchten; Lösung eine Ansprechperson vom Entwurf bis zum Einbau mit festem Ablauf
- H1 "Eine Ansprechperson für Ihre Küche, von der Planung bis zum Einbau", Unterzeile nennt Planung nach Maß und klaren Ablauf
- Primär-CTA "Planungstermin vereinbaren" in Kopf (mobil und im Mittelbereich verkürzt), Held, Intro, Ablauf, Formular
- Titel mit Keyword und Musterstadt, Beschreibung mit Nutzen und Aufruf
- FAQ mit fünf Einwänden: Kosten, Dauer, vorhandene Geräte, alte Küche, Mängel nach dem Einbau
- Formularziel: Planungstermin (Name, E-Mail, Telefon freiwillig, Vorhaben, Nachricht), fünf Felder, Hinweise unter E-Mail und Telefon
- Beleg im Held als "(Beispiel)" gekennzeichnet
