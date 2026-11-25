# t60 Praxis Terminfokus

Prinzip nach der freigegebenen Referenz mediclinicp.webflow.io (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Arztpraxen, Zahnarztpraxen, Physiotherapie, Heilpraktiker, Kliniken und Gesundheitsdienste mit Terminbuchung als wichtigster Aktion. Hell, ruhig, viel Luft. Der Termin ist von jeder Stelle aus erreichbar (Kapsel im Kopf, Terminkarte im Held, Terminarten, Fragen, Fächer am Schluss). Ansprache im Du, für eine Praxis in der Regel auf Sie umstellen. Keine Heilversprechen im Beispieltext, bei echten Texten Heilmittelwerbegesetz und Berufsordnung beachten.

## Sektionsfolge
Kopf mit Doppelkapsel (Termin und Telefon), Held (H1, Hauptknopf, Bewertungszeile, Bild mit schwebender Karte der nächsten freien Termine), Über uns (Wortlicht, danach wächst ein Bild beim Scrollen von der Form zum Vollbild), Leistungen (breite Zeilen mit Bild, auf dem Handy eine Spur mit Pfeilen), Unser Unterschied (vier Karten um die Überschrift, Hatchring), Team (drei Porträts), Arztporträt (Bild, Liste, Zitat), Praxisprofil (abgesetzte Karte), Ablauf (vier Schritte um einen Ring), Alles an einem Ort (breites Bild mit Tiefenbewegung), Patientenstimmen (eine große Karte mit Pfeilen an den Seiten), Terminarten (drei Karten, die mittlere hervorgehoben), Fragen (Karte links, Akkordeon rechts), Termin (Fächer aus gekippten Bildkarten, Rückrufformular), Fuß mit Großschrift der Marke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Über uns | Wörter hellen beim Scrollen auf | `data-licht` |
| Bildbühne | Bild wächst von der Form zum Vollbild, Knopf bleibt sichtbar | `data-fortschritt`, `clip-path` aus `--fortschritt` in `stil.css`, 220vh Sticky |
| Held, Abschnitte | Einblenden, gestaffelt | `data-zeig`, `data-staffel` |
| Ort | Bild läuft gegen die Scrollrichtung | `data-parallax` |
| Leistungen, Team (Handy) | Spur mit Scroll Snap, Pfeilknöpfe | `stil.js`, ohne JavaScript wischbar |
| Stimmen | eine Stimme sichtbar, Pfeile wechseln, Einblenden | `stil.js`, `data-aktiv`, opacity und transform |
| Fragen | Plus dreht zum Kreuz, nur eine Antwort offen | `details` mit `data-exklusiv`, CSS |
| Ablauf | Halo pulsiert am Ring (nur Desktop) | CSS `@keyframes halo`, transform und opacity |
| Termin | Bildkarten fächern sich beim Sichtbarwerden auf | `data-zeig` am Fächer, `--s` und `transform` in CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar: die Bildbühne zeigt dann ein ruhiges Bild ohne Wachsen, alle Stimmen stehen untereinander.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (nur der Terminabschnitt), `--text`, `--text-leise`, `--linie`, `--akzent` (Petrol, Hauptaktion mit weißem Text), `--akzent-text`, `--signal` und `--signal-text` (warmes Gelb für Kapsel, Scheiben, Punkt, immer mit dunklem Text), `--akzent-hell`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--signal-text` auf `--signal`, `--text-leise` auf `--flaeche-alt`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Bewertung, Zeiten, Telefon, Namen, Stimmen, Dauer und Adresse sind Beispiele, keine Belege. Preise stehen bewusst nicht in den Terminarten, dort steht die Dauer. Die echte Terminbuchung (Praxissoftware, Doctolib oder ähnlich) ist je Projekt anzubinden und im Datenschutz zu nennen. Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Impressum und Datenschutz im Fuß sind Platzhalterlinks.

## Conversion (Playbook)
- Beschreibung auf 160 Zeichen gekürzt
- Kommentar zur Heldformel vor der H1
- Feldhinweis unter Telefon im Terminformular (es hat kein E-Mail Feld), Knopf in der Reihe neu ausgerichtet
- Kopfknopf mit Telefon, FAQ und Bewertung im Held waren schon da
