# t63 Kanzlei Kartenraster

Prinzip nach der freigegebenen Referenz Lawtide (Tor 1 erteilt, `lawtide-webflow-template.webflow.io`), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kanzleien, Steuer- und Unternehmensberatung, Notariate, Mediation, Versicherungs- und Finanzberatung, alle Beratung mit erklärungsbedürftigen Leistungen und vertraulichem Erstgespräch. Ruhige helle Seite, dunkle Karten als Gegengewicht. Ansprache im Du, für Kanzleien meist auf Sie umstellen. Ohne gute Porträts und Bürofotos verliert die Seite ihre Wärme.

**Berufsrecht:** Die Beispieltexte machen bewusst keine Erfolgszusage und keine Erfolgsquote. Stimmen von Mandanten, Kennzahlen, Vergleiche mit anderen Kanzleien und Fachanwaltstitel nur setzen, wenn Berufsrecht (BRAO, BORA, UWG) und Mandantenzustimmung das erlauben. Die Vorlage ist keine Rechtsberatung.

## Sektionsfolge
Weiße Leiste über die Breite (Logo, Menü, Telefon, Hauptknopf), gerahmte Bildkarte als Held (Text links unten, schwebende Rückrufkarte), Vertrauen als Reihe weißer Logokacheln, Haltung (Bild links, dunkle Textkarte rechts), Rechtsgebiete (vier Bildkarten, beim Überfahren erscheint die Liste, darunter gepunktete Linie, Satz und Knopf), Warum wir (Text, Rundbild mit zwei Ringen, dunkle Kennzahlenleiste), Ablauf (dunkle Karte mit nummerierter Schrittfolge, Bild rechts), Stimmen (Kreis aus Porträts, Zitatkarte mit Pfeilen), Fragen (Pillen Akkordeon), Wissen (dunkle Karte mit Beitragsliste, hohes Bild), Kontakt auf braunem Verlauf mit Rückrufformular, Newsletter und Fußzeile.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Alle Abschnitte | Einblenden, Karten von links und rechts, Staffelung in Reihen | `data-zeig`, `data-staffel` |
| Rechtsgebiete | Titel rutscht hoch, Liste blendet ein (nur mit Maus ab 992 px, sonst immer sichtbar) | CSS `:hover` und `:focus-within`, nur transform und opacity |
| Kennzahlen | Zähler, Endwert steht im HTML | `data-zaehle` |
| Fragen | Pille färbt sich dunkel, Zeichen dreht zum Kreuz, geöffnet ist nur eine | `details` mit `data-exklusiv` |
| Stimmen | Spur mit Scroll Snap und Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, mit JavaScript bleibt sie stehen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Terrakotta, Fläche mit weißem Text, auch Text auf Hell), `--akzent-text`, `--akzent-hell` (Text und Punkt auf Dunkel), `--knopf-dunkel`, `--fuss-unten`, `--schrift-titel` und `--schrift-text` (Hanken Grotesk), Radien, `--titel-gewicht`, `--titel-spur`, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent` auf `--flaeche` (Text) und auf Weiß, `--akzent-text` auf `--akzent`, `--akzent-hell` und `--text-leise-dunkel` auf `--flaeche-dunkel` und `--flaeche-dunkel-2`. Name und Zeichen im Logo (zwei Stellen, Kopf und Fuß), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Mitgliedschaften, Kennzahlen, Namen, Stimmen und Adresse sind Beispiele, keine Belege. Logos sind Beispiellogos. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen (Schleier sind auf die Platzhalter abgestimmt). Newsletter braucht Double Opt-in und einen Eintrag in der Datenschutzerklärung. Drei Links im Fuß (Soziale Netzwerke) und Impressum, Datenschutz sind Platzhalter.
