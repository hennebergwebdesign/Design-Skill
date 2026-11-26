# t87 Coaching App Creme und Gelb

Prinzip nach einem Pinterest Screenshot des Inhabers (Personal Training per App mit Coach, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Die Überschrift ist einheitlich in einer Grotesk gesetzt (zwei Gewichte), kein kursives Akzentwort.

## Eignung
Personal Training, Online Coaching und Fitnessstudios mit App, die Funktionen zeigen wollen (Plan, Video, Smartwatch, Rückmeldung) und Probetraining oder Coachwahl verkaufen. Ansprache im Du, für Sie im Text ersetzen. Telefon, Uhr und Chat sind Mockups aus HTML und CSS und gegen die echte App auszutauschen.

## Sektionsfolge
Feste dunkle Kopfleiste mit Primär CTA, Vollbildheld mit Foto (Zoom), Überschrift in zwei Gewichten, Preiszeile, gelber Knopf, schwebende Aktionskarte, Einstieg mit Knopf, Bento Raster aus sechs Karten (Foto mit Symbolreihe, zwei Fotos mit Chips, Telefonmockup, Foto mit Trainingstagen, Smartwatch mit Übungsliste, Video Platzhalter mit Coachantwort), große schwarze Karte mit wachsendem Telefon und Chatblasen, Fahrplan mit Foto und Auswahlkarten, Fragen, Anfrageformular, gelbe Zeile mit Mailfeld, schwarzer Fuß mit riesigem Wort.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto zoomt von 1,18 auf 1 | CSS `transform`, einmal |
| Held | Aktionskarte schwebt nach 1,2 s ein, lässt sich schließen | CSS, `stil.js` |
| Bento | Karten gestaffelt, beim Überfahren leichte Tiefe (Kippen, Schatten, Foto wächst) | `data-zeig` mit `data-staffel`, CSS (nur mit Maus) |
| Karte A | Symbolreihe schaltet alle 2,2 s durch, Klick übernimmt | `stil.js` |
| Karte D | Trainingstage antippen, Zähler folgt | `stil.js`, `aria-pressed` |
| Karte E | Haken in der Übungsliste setzen sich nacheinander | `data-schritt`, CSS |
| Karte F | Standbild atmet, Aufnahmepunkt pulsiert, Pause Knopf | CSS, `stil.js` (WCAG 2.2.2) |
| Schwarze Karte | Telefon wächst beim Scrollen (ab 768 px, Bühne pinnt), Blasen erscheinen nacheinander | `data-fortschritt` (`--fortschritt`), `data-schritt` |
| Fahrplan | Auswahlkarten klappen beim Antippen auf, eine offen | `details` mit `name` und `data-exklusiv` |
| Fuß | Buchstaben des Worts fahren nacheinander ein | `data-schritt`, CSS |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy (Telefon wächst nicht) steht der Endzustand im HTML: Blasen und Haken sichtbar, Wort komplett, keine Animation. Der Zustand "vorher" gilt nur mit JavaScript.

## Tokens (marke.css)
`--flaeche` (Cremeweiß), `--flaeche-alt` (Karten), `--flaeche-dunkel`, `--text`, `--text-leise`, `--akzent` (Gelb, nur Fläche mit Schwarz), `--akzent-text`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), `--titel-gewicht` und `--titel-gewicht-leicht`, Radien, `--ton-1`, `--ton-2` für Bildgrund.

## Marke wechseln
Nur `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche-alt`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Gelb ist nie Textfarbe auf Hell. Der Name "Markenname" steht in Titel, Logo, Texten und im Wort im Fuß; das Wort ist auf zehn Buchstaben abgestimmt (`font-size` in `vw` in `.fuss__wort`, Buchstaben als einzelne `span`), ein anderer Name braucht neue Spans und einen neuen Wert.

## Offen
Formulare senden nichts, Turnstile ist Platzhalter. Preise, Angebot, Namen, Nachrichten, Puls und Übungslisten sind Beispiele, keine Belege; Preisangaben (Preisangabenverordnung), Vertragslaufzeit und Kündigung je Betrieb ergänzen. Keine Gesundheits, Abnehm oder Erfolgsversprechen; Hinweis auf ärztlichen Rat steht im Fahrplan und in den Fragen und ist je Kunde zu prüfen, rechtlich nicht geprüft. Sechs Fotos ohne Einzelnachweis (siehe `BILDER.md`). Die Kopfleiste verdeckt Anker nicht (`scroll-margin-top` gesetzt). Kontrast von weißem Text über den Fotos nach Austausch neu prüfen. Safari, Screenreader und echte Geräte nicht geprüft.

## Conversion (Playbook)
- Held: Berufstätige, die Training nicht in den Alltag bekommen, Lösung persönlicher Coach in der App
- H1 "Dein Coach passt sich an. Nicht dein Alltag.", Preiszeile als Beispiel gekennzeichnet
- Primär CTA "Coach finden" in Kopf, Held, Einstieg, Formular und Fuß, Telefon als Alternative im Held, Menü, Formularbereich und Fuß
- FAQ mit fünf Einwänden (Kosten, Geräte, Antwortzeit, Kündigung, Einstieg), Antworten als Beispiel
- Formular mit vier Feldern, Feldhinweise unter E-Mail und Telefon, Bestätigungshinweis
- Titel 55 und Beschreibung 142 Zeichen, vier Menüpunkte, JSON-LD SportsActivityLocation mit Beispielwerten
