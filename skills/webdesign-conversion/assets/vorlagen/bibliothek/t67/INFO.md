# t67 Kanzlei klar

Prinzip nach der freigegebenen Referenz lexma-template.webflow.io (Startseite), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kanzleien, Steuer- und Unternehmensberatung, Notariate, Versicherungs- und Finanzberatung und andere Dienstleister, die Vertrauen über Ruhe, Klarheit und Erfahrung aufbauen. Eckige Formen und viel Weißraum, wenig Dekor. Ansprache im Du, für Sie im Text ersetzen (Kanzleien siedeln oft im Sie). Berufsrechtliche Vorgaben für Werbung (bei Rechtsanwälten etwa die Regeln zur Sachlichkeit und zu Erfolgsaussagen) sind je Kanzlei zu prüfen; die Beispieltexte versprechen bewusst kein Ergebnis.

## Sektionsfolge
Dunkle Kopfleiste über die ganze Breite, Held (Überschrift links, Text, Hauptknopf und Telefon rechts), breites Bild, das halb auf dunklem und halb auf hellem Grund liegt, mit ausgestanzter Wortmarke am unteren Bildrand, Über uns (Leitsatz, Bildkarte mit Kennzahl, Text und vier Vorzugszeilen), Leistungen als Zeilen mit Linie, Kennzahlen im dunklen Abschnitt mit Logolaufband, Anspruch (Text mit drei Zeilen links, hohes Bild rechts), Stimmen (Faktenkarte und dunkle Karte mit Wechsler), Beiträge (drei Karten), Fragen (Akkordeon, fünf Einwände), Aufruf mit zwei Zahlenkarten, Fuß mit großer, verblassender Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Überschrift und Text blenden ein, die Wortmarke steigt von unten ins Bild | `data-zeig`, CSS |
| Leistungen | Zeile färbt sich weiß und rückt nach rechts, ein Bild erscheint rechts am Rand (mobil steht es unter jeder Zeile), auch bei Tastaturfokus | CSS (`opacity`, `transform`) |
| Kennzahlen, Faktenkarte, Aufruf | Zähler, Endwert steht im HTML | `data-zaehle` |
| Kennzahlen | Logolaufband | `.band` |
| Stimmen | Pfeile wechseln die Stimme mit leichtem Einblenden, ohne JavaScript stehen alle Stimmen untereinander | `stil.js`, CSS |
| Beiträge | Karte färbt sich dunkel, Bild vergrößert sich leicht | CSS |
| Abschnitte | Einblenden und Staffeln | `data-zeig`, `data-staffel` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, mit JavaScript bleibt sie stehen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Sand, Fläche mit dunklem Text, auf Dunkel auch Text und Zeichen), `--akzent-text`, `--akzent-tief` (Fokusring auf Hell), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien (eckig), `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche`, `--flaeche-alt` und Weiß, `--text-leise-dunkel` auf `--flaeche-dunkel` und `--flaeche-dunkel-2`. Der Name "Markenname" steht an fünf Stellen (Titel, Logo, Wortmarke im Held, Wortmarke im Fuß, Fuß); die Wortmarken sind auf zehn Buchstaben abgestimmt (`font-size` in `cqw` und `vw`), ein kürzerer oder längerer Name braucht einen neuen Wert für `.held__marke` und `.fuss__marke`. Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Kein Formular (die Referenz hat auf der Startseite keines), der Hauptknopf führt zum Fuß mit Telefon und Mail; ein Rückrufformular ist im Projekt zu ergänzen. Zahlen, Namen, Stimmen, Logos und Datum sind Beispiele, keine Belege. Der Rechtsgebietsname je Zeile (Unternehmen, Immobilien, Familie, Streit) ist ein Beispiel. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen: Die Wortmarke im Held ist Seitenfarbe auf dem Foto und braucht im unteren Bilddrittel ein dunkles Motiv. Vier Links im Fuß sind Platzhalter.

## Conversion (Playbook)
- Held: Privatpersonen, Gründerinnen und Unternehmen mit einer Rechtsfrage, die sie nicht einordnen können
- H1 "Rechtsfrage im Alltag oder Betrieb? Wir ordnen sie", Unterzeile nennt Optionen, Zeitrahmen und Kosten nach dem Erstgespräch
- Primär-CTA "Erstgespräch anfragen" in Kopf, Held und Schluss, unverändert
- Titel mit Keyword und Musterstadt, Beschreibung mit Problem, Nutzen und Aufruf
- FAQ war schon branchengerecht (Kosten, Ablauf, Rechtsgebiete, offener Ausgang, Zeitpunkt), keine Erfolgszusage
- Formularziel: kein Formular auf der Seite; Erstgespräch über Knopf und Telefon
- Kein Beleg im Held, bewusst (Berufsrecht klären)
