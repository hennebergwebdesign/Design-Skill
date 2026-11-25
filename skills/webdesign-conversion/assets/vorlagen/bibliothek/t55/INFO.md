# t55 Kraftstudio Risskante

Prinzip nach der freigegebenen Referenz Fitova (Tor 1 erteilt, Startseite erfasst, Unterseiten nur nach Überschriften und Länge), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kraftstudios, Studios mit Programmen, Personal Training, Coaching mit Paketen und weitere betreute Angebote mit Plänen, Preisliste und Gemeinschaft (Kampfsport, Athletik, Reha, Kurse). Die Seite lebt von starken Fotos (Gesichter, Bewegung) und einer Marke, die laut sein darf. Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Kopf aus zwei Chips (Logo, Menü), Vollbildheld im Dunkeln (H1 mit Akzentzeile, Text in eckigen Klammern, Hauptknopf, Telefon), Anspruch (große Zweiton-Überschrift, Text, Hochformatvideo), Leistungen (helle Karten in einer Spur auf Raster), Programme (links die Einleitung, rechts nummerierte Liste, offener Eintrag zeigt Bild und Dauer), Vorteile (Bild, Zeilen mit Kennzahlen), Wandel (versetztes Raster aus Stimmenkarten und Bildern), Stimmen (Spur mit zweifarbigen Karten), Preise (Leitsatz, Zeilenliste, Aktion), Ratgeber (hohe Karte, zwei Beiträge), Laufband mit Bildern, Kontakt (Linienformular), Fuß. Jeder Wechsel zwischen hell und dunkel ist eine gerissene Kante.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, Abschnitte | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Große Überschriften | Wortlicht Wort für Wort (grau zu voll) | `data-licht` |
| Vorteile | Zähler, Endwert steht im HTML | `data-zaehle` |
| Programme | ein Eintrag bleibt offen, Inhalt blendet ein, linke Spalte bleibt stehen | `details` mit `data-exklusiv`, `stil.js`, `position: sticky` |
| Leistungen, Stimmen | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Laufband | Wort und Bilder laufen, Pause beim Überfahren | `.band` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--stein` (zweiter Dunkelton mit Raster), `--text`, `--text-leise`, `--linie`, `--akzent` (Glutorange, Fläche mit dunklem Text, auf Dunkel auch Text), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--karte-hell`, `--karte-hell-2`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), `--titel-gewicht`, `--titel-spur`, Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche-dunkel` und `--stein`, `--akzent-tief` auf `--flaeche`, `--akzent-text` auf `--akzent`, `--text-auf-dunkel` auf `--karte-hell-2`. Name und Zeichen im Logo (Symbol `#i-hantel`, eine Stelle), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben. Die Zackenkante steckt als Maske in `--zack` am Anfang von `stil.css`.

## Offen
Formulare senden nichts. Zahlen, Namen, Stimmen, Preise und die Aktion sind Beispiele, keine Belege. Das Video im Anspruch ist eine Fläche, der Pausenknopf hat keine Funktion. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Die Überschriften stehen in Versalien: lange Wörter prüfen, bevor die Marke wechselt. Zwei Links im Fuß (Impressum, Datenschutz) sind Platzhalter.
