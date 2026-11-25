# t64 Kanzlei Messing und Nachtblau (zwei Varianten)

Prinzip nach der freigegebenen Referenz Legality (Tor 1 erteilt), Variante 1 nach `legality-template.webflow.io/home/home-v1`, Variante 2 nach `home-v2`. Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Ein Template, zwei Startseiten: `marke.css`, `stil.css` und `stil.js` sind gemeinsam, das Besondere steht in `stil-v1.css` und `stil-v2.css`.

## Varianten
| Datei | Name | Unterschied |
|---|---|---|
| `index.html` | Held im Vollbild | Logo links, Menü in der Leiste, Vollbildheld mit Text unten links, Aussage mit Wortlicht und drei Kennzahlenkarten, Bild im Rahmen mit Text, Team mit Namen unter dem Bild, gestapelte Stimmen, Blog, Laufband unten |
| `v2.html` | Held mit Bildrahmen | Logo mittig, Menü nur als Panel, dunkler Held mit Muster und gerahmtem Bild, Laufband gleich darunter, versetzte Kartenspalten, Team mit Namen im Bild, Warum wir, Fälle mit überlappender Karte |

Gemeinsam sind Kopf und Fuß, Logo, Name und der dunkle Abschnitt Rechtsgebiete (in der Referenz in beiden Varianten gleich).

## Eignung
Kanzleien, Notariate, Steuerberatung, Unternehmensberatung und Beratungen mit gediegenem, traditionellem Auftritt. Serif in den Titeln, Messing auf Nachtblau. Ansprache im Du, für Kanzleien meist auf Sie umstellen. Ohne gute Porträts verliert vor allem Variante 1 ihren Kern.

**Berufsrecht:** Die Beispieltexte machen bewusst keine Erfolgszusage und keine Erfolgsquote. Stimmen, Weiterempfehlungsquote, Fallbeispiele und Fachanwaltstitel nur setzen, wenn Berufsrecht (BRAO, BORA, UWG) und Zustimmung der Mandanten das erlauben, Fälle nur anonymisiert. Die Vorlage ist keine Rechtsberatung.

## Sektionsfolge
**Variante 1:** Kopfleiste (transparent, beim Scrollen dunkel), Vollbildheld, Aussage mit Wortlicht und Kennzahlen, Über uns (Rahmenbild, drei Zeilen), Rechtsgebiete (dunkle Zeilen), Team, Stimmen, Blog, Fragen, Laufband, Fuß mit Newsletter.
**Variante 2:** Kopfleiste mit mittigem Logo, dunkler Held, Laufband, Über uns (zentrierter Kopf, drei Spalten), Rechtsgebiete (dunkle Zeilen), Team, Warum wir, Fälle, Fragen, Fuß mit Newsletter.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, Staffelung in Reihen, Karten von links und rechts | `data-zeig`, `data-staffel` |
| V1 Held | Bild dunkelt beim Scrollen ab | `data-abdunkeln` |
| V1 Aussage | Wortlicht Wort für Wort | `data-licht` |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| V1 Stimmen | Karten stapeln sich beim Scrollen (ab 992 px, ohne JavaScript) | `position: sticky` |
| Laufband | Fachgebiete laufen durch, hält beim Überfahren an | `.band` |
| Rechtsgebiete | Nummernkreis füllt sich beim Überfahren (nur mit Maus) | CSS |
| Kopf | Fläche blendet beim Scrollen ein, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, `.gescrollt` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, mit JavaScript bleibt sie stehen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Messing, Fläche mit dunklem Text, auf Dunkel auch Text), `--akzent-text`, `--akzent-tief` (Messing als Text und Linie auf Hell), `--schrift-titel` (Newsreader), `--schrift-text` (Manrope), Radien, `--titel-gewicht`, `--titel-spur`, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern, beide Varianten folgen. Kontrast prüfen: `--akzent-tief` auf `--flaeche` und `#fff`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf `--flaeche-dunkel` und `--flaeche-dunkel-2`. Name und Zeichen im Logo (Kopf und Fuß, je Seite zwei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Der Rahmen (`.rahmen`) braucht ein Hochformatfoto.

## Offen
Formulare senden nichts. Kennzahlen, Namen, Stimmen, Bewertung und Adresse sind Beispiele, keine Belege. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Auf dem Handy unter 480 px zeigt die Leiste Telefon und Menü, der Hauptknopf steht im Held. Das Wortlicht dunkelt die noch nicht erreichten Wörter ab, bis zum Ende des Scrollens. Newsletter braucht Double Opt-in und einen Eintrag in der Datenschutzerklärung. Die Links im Fuß (Soziale Netzwerke, Impressum, Datenschutz) sind Platzhalter.

## Conversion (Playbook)
- Beide Varianten (`index.html`, `v2.html`): Beschreibung auf 160 Zeichen gekürzt
- Kommentar zur Heldformel vor der H1
- Neuer Abschnitt "Fragen" in beiden Varianten vor dem Laufband und Fuß (Variante 1 nach Blog, Variante 2 nach Fälle): fünf Einwände zu Kosten, Ablauf, Zuständigkeit, Ausgang und Frist, Akkordeon mit Plus im Kreis, Serifentitel; CSS gemeinsam in `stil.css`, Hintergrund in `stil-v1.css`
- Kopfknopf und Telefon waren schon da. Berufsrecht: Antworten sagen keinen Ausgang zu
