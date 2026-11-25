# t28 Training und Coaching

Prinzip nach der freigegebenen Referenz FitEdge (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Studios, Personal Trainer, Coaching und Kurse mit Programmen, sichtbarem Fortschritt und Team. Auch für andere betreute Angebote mit mehreren Paketen (Lernen, Therapie, Beratung). Ansprache im Du, für Sie im Text ersetzen.

## Sektionsfolge
Kopf auf Verlaufsrahmen, Held mit schwebender Karte, Partner (Laufband), Vorteile (Bento mit Zählern), Fortschritt (Treppe), Programme (Zeilenliste mit Preis), Team (Reiter), Kontakt (Verlaufsrahmen mit Formular), Wissen (Karten), Stimmen (Reiter), Fragen (Akkordeon), Abschluss und Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Karte läuft beim Scrollen gegen, Einblenden | `data-parallax`, `data-zeig` |
| Überschriften | Wortlicht Wort für Wort | `data-licht` |
| Vorteile | Zähler, Karte wird beim Berühren oder Fokus zum Bild | `data-zaehle`, CSS `:hover` und `:focus-within` |
| Fortschritt | Treppe schiebt sich beim Scrollen zusammen | `stil.js`, `--extra` (nur ab 62rem) |
| Team, Stimmen | Reiter mit Pfeilknöpfen | `stil.js`, Scroll-Snap, ohne JavaScript wischbar |
| Wissen | Karte hebt an | CSS |
| Fragen | Akkordeon, Überschrift bleibt stehen | `details`, `position: sticky` |
| Partner | Laufband | `.band` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar. Der Endwert der Zähler steht im HTML.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Mint, Fläche mit dunklem Text), `--akzent-text`, `--akzent-tief` (Beere für Text und Symbolkreise auf Hell), `--verlauf-von`, `--verlauf-bis`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: weiße Schrift auf `--verlauf-bis` und `--akzent-tief` mindestens 4,5 zu 1. Bildplatzhalter (`.bild[data-platzhalter]`) durch Kundenfotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Preise, Zahlen, Stimmen, Namen und Adresse sind Beispiele. Kontrast über den Bildflächen nach dem Einsetzen der Fotos neu prüfen.

## Conversion (Playbook)
- Held: Berufstätige mit wenig Zeit, Lösung ist ein persönlicher Plan mit Coach und sichtbarem Fortschritt
- Primär-CTA: Probetraining buchen (Kopfzeile, Held, Beratung, Abschluss, Formular)
- Titel und Beschreibung mit Keyword Personal Training und Ort Musterstadt
- FAQ: Wiedereinstieg, Kosten und Bindung nach dem Probetraining, Plan zum Arbeitsalltag, Erreichbarkeit des Coachs, Kündigung
- Formular: Name, E-Mail, Ziel, Wunschzeiten, Hinweis zur Terminbestätigung
