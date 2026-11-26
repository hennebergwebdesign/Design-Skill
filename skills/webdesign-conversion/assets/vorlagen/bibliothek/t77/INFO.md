# t77 Weiterbildung Schwarz Limette

Prinzip nach einem Pinterest Screenshot des Inhabers (Online Weiterbildung, MBA Programm, Quelle und Adresse unbekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Online Weiterbildung, Fernlehrgänge, Akademien und Bildungsanbieter für Berufstätige, die mehrere Programme, Dozenten, Erfolgsgeschichten und ein Infopaket als Hauptaktion haben. Lebt von echten Porträts der Dozentinnen und Dozenten und von belegten Stimmen. Ansprache im Du, für Sie im Text ersetzen. Fast schwarz mit Limette als Kennzeichen; Limette steht nur als Fläche (Knopf, Kachel, Haken, Siegel) oder auf Dunkel als Linie und Zeichen, nie als Text auf Weiß. Rechtlich heikle Branche: siehe Offen.

## Sektionsfolge
Kopf (Wortmarke mit eigenem Zeichen, fünf Punkte, Telefon, Knopf Infopaket anfordern), Held (Überschrift, zwei Knöpfe, Telefon, Beispielwerte, Porträtreihe), Pressebandleiste mit neutralen eigenen Symbolen und Beispielzitat, Programmauswahl (drei Fotokarten, eine hervorgehoben), Dozenten in der Wischspur, hell abgesetzter Abschnitt "Das neue Erlebnis" (Collage mit Limettekacheln, Telefonmockup mit Fortschrittsring, Netzwerk aus Porträtpunkten, Stimmen als Wischspur), dunkle Zertifikatskarte, Vergleich "Klassisch gegen Wir" in zwei Karten, Gespräch mit Video Platzhalter, Wand mit Erfolgsgeschichten, drei Programmstufen mit Garantiekarte (Beispiel), Infopaket Formular, Fragen, Fuß mit Spalten und großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Porträtreihe wandert beim Scrollen nach links (ab 768 px, darunter wischbar) | `stil.js` (`--drift`), CSS (`transform`) |
| Programme und Stufen | Fokus wechselt beim Überfahren, Fokussieren und Antippen, Karte hebt sich, die anderen treten zurück (ab 992 px) | `stil.js`, CSS (`transform`, `opacity`) |
| Dozenten und Stimmen | Wischspur mit Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Erlebnis Collage | Fotos und Kacheln driften unterschiedlich schnell | `data-parallax` |
| Telefon und Netzwerk | Fortschrittsring füllt sich, Verbindungslinien zeichnen sich, Porträtpunkte schweben leicht | CSS (`stroke-dashoffset`, `transform`), `data-zeig` |
| Zertifikat | Karte kippt leicht mit dem Scrollen | `stil.js` (`--kipp`), CSS (`transform`) |
| Vergleich | Haken zeichnen sich gestaffelt | `data-staffel`, `data-zeig`, CSS (`stroke-dashoffset`) |
| Erfolgsgeschichten | Kartenraster baut sich gestaffelt auf | `data-staffel`, `data-zeig` |
| Video Platzhalter | Knopf wechselt Abspielen und Pause (WCAG 2.2.2), Balken läuft nur im Zustand Abspielen | `stil.js`, CSS (`transform`) |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy stehen Reihe und Spuren als Wischspur, Netzwerk, Ring, Haken und Karten ruhig und vollständig sichtbar. Es gibt kein Laufband und kein echtes Video.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--karte`, `--karte-hoch`, `--text`, `--text-leise`, `--linie`, `--akzent` (Limette, Fläche mit dunklem `--akzent-text`), `--hell`, `--hell-karte`, `--text-hell`, `--text-leise-hell`, `--linie-hell` (heller Abschnitt), `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter. Der helle Abschnitt hängt `--text` und `--text-leise` über die Klasse `.hell` um, kleine dunkle Inseln in ihm (Telefon) über `.insel`.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--karte` und `--karte-hoch`, `--text-leise-hell` auf `--hell`. Eine andere Akzentfarbe darf hell oder dunkel sein, steht aber nie als Text auf `--hell`. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Texte, Fuß); die große Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem`) und braucht bei anderer Länge einen neuen Wert für `.fuss__marke`. Das Zeichen im Logo und die vier Pressesymbole sind eigene Platzhalter, durch das echte Zeichen und echte Medienlogos (mit Erlaubnis) ersetzen. Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts, die Turnstile Stelle ist ein Kommentar. Programme, Dozenten, Zitate, Erfolgsgeschichten, Dauer, Aufwand, Preise, Zertifikat, Garantiekarte und Pressezitat sind Beispiele, keine Belege; Namen, Abschlüsse, Akkreditierungen, Zulassungen, Erfolgsquoten und Gründerzitate sind bewusst nicht erfunden. **Rechtlich nicht geprüft, je Kunde zu ergänzen:** Fernunterrichtsschutzgesetz (Zulassung des Lehrgangs durch die Staatliche Zentralstelle für Fernunterricht, Pflichtangaben, Kündigungsrechte), Widerrufsrecht und Widerrufsbelehrung, die Garantiekarte (Bedingungen, Verhältnis zum gesetzlichen Widerruf), Aussagen zu Abschluss, Anerkennung und Karrierewirkung, Preisangaben, Förderung und Bildungsurlaub, Werbung mit Erfolgsgeschichten (Einwilligung, Wahrheit), Presselogos (Nutzungsrecht). Die Porträts sind Beispielfotos und werden vor Abgabe ersetzt. Kontrast der zurücktretenden Programmkarten (Deckkraft 0,72) ist nicht nachgemessen. Die Kopfleiste ist sticky, Anker haben `scroll-margin-top`. Das Video ist ein Platzhalter mit Poster und Pause Knopf, im Projekt echtes Video mit Untertiteln einsetzen.

## Conversion (Playbook)
- Held: Berufstätige mit Führungsziel und knapper Zeit, Problem Weiterbildung die neben Job und Familie nicht passt, Lösung Online Lehrgang im eigenen Tempo mit Praktikern
- H1 "Führungswissen online lernen, ohne den Job zu pausieren", Unterzeile nennt Inhalt, Tempo und Praktiker
- Primär-CTA "Infopaket anfordern" in Kopf, Held, Programmkarte, Zertifikat, Vergleich, Gespräch, Stufen, Garantiekarte und Formular; "Details ansehen" ist Nebenaktion
- Titel mit Keyword und Musterstadt, Beschreibung mit Nutzen und Aufruf
- FAQ: Kosten und Raten, Zeitaufwand, Voraussetzungen, Abschluss und Anerkennung, Kündigung und Widerruf (alle als Beispielantwort)
- Formularziel: Infopaket mit Rückrufoption (Name, E-Mail, Telefon freiwillig, Interesse), vier Felder, Feldhinweise unter E-Mail und Telefon
- Beispielwerte im Held als "Beispiel" gekennzeichnet; JSON-LD EducationalOrganization mit Beispielwerten
