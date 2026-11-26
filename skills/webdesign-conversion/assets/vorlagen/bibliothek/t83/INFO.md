# t83 Tennisclub Waldgrün mit Limette

Prinzip nach einem Pinterest Screenshot des Inhabers (Tennisclub Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Abgrenzung: t69 ist hell in Himmelblau mit Outfit, t82 eine dunkle Tennis App. t83 ist hell auf Grün und Limette, mit Lexend und Instrument Sans, runder Kopfleiste, Fotokarte als Held und marineblauem Fuß.

## Eignung
Tennis-, Padel- und Sportvereine und Racketclubs, die Plätze, Probetraining und Mitgliedschaft online verkaufen und Gemeinschaft zeigen wollen. Ansprache im Du. Lebt von echten Fotos von Spielern und Plätzen: die Beispielfotos zeigen Laufen und Training, weil die Bibliothek kein Tennisfoto hat.

## Sektionsfolge
Runde Kopfleiste (Logo, fünf Punkte, Telefon, Knopf, Menüknopf mobil), Held als große Fotokarte mit Titel in Versalien, Nummernpunkten 01 bis 03 und rundem Wiedergabeknopf in einer Ausbuchtung, zwei Hochformatkarten (Platz buchen, Training) neben Slogan mit drei Merkmalen und rundem Rundgangsknopf, Über den Club (grüne Karte mit Schalter, Foto, Kennzahlkarte mit Punktereihen), Zahlenband, Angebote auf Wischspur mit Pfeilen (Training, Platzverleih, Athletik, Padel), Mitgliedschaft (Hauptkarte und Zeilenkarten mit Tarifwahl), Gerätemockup mit Trainerprofil und grüne Karte mit Trainerwahl, Newsletter auf Foto, Stimmen mit Wortliste, Fragen, Probetraining Formular auf Foto, marineblauer Fuß mit Limette und großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Fotowechsel 01 bis 03 per Punkten und Pfeiltasten, Name des Fotos wechselt mit, ohne JavaScript steht Foto 01 und die Punkte fehlen | `stil.js`, CSS (`opacity`) |
| Wiedergabeknöpfe | Platzhalter ohne Video, schalten Symbol und Beschriftung (`aria-pressed`), Pause nach WCAG 2.2.2 vorgesehen | `stil.js` |
| Über den Club | Schalter schaltet Text und Zustand (`aria-pressed`), Foto driftet leicht | `stil.js`, `data-parallax` |
| Punktereihen | Punkte wachsen nacheinander ein, Endzustand steht im HTML | CSS (`transform`, `opacity`), `data-zeig` |
| Zahlen | zählen hoch, Endwert steht im Text | `data-zaehle` |
| Karten | heben sich beim Überfahren (`translate`), staffeln beim Einblenden ein | CSS, `data-zeig`, `data-staffel` |
| Angebote | Wischspur mit Pfeilknöpfen, Fokus und Wischen ohne JavaScript | `stil.js` |
| Mitgliedschaft | Zeilen schalten die Hauptkarte um (Name, Preis, Text, Liste), ohne JavaScript führen sie zum Formular | `stil.js` |
| Trainerwahl | Chips tauschen Foto, Name und Schwerpunkt im Laptop | `stil.js` |
| Stimmen | Wortliste, Überfahren, Fokus oder Klick wechselt Wort im Fokus und Zitat, ohne JavaScript stehen alle Zitate untereinander | `stil.js` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Fuß | Wortmarke fährt von links ein | `data-zeig="links"` |
| Menü und Anzeige | Menü als Panel mobil, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Es läuft nichts automatisch und nichts in Endlosschleife.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Waldgrün), `--text`, `--text-leise`, `--linie`, `--akzent` (Waldgrün, Hauptaktion auf Hell), `--akzent-text`, `--limette` (nur Fläche, Punkt, Ball und Text auf Dunkel, nie Text auf Hell oder Weiß, 1,29 zu 1 auf Weiß), `--text-auf-limette`, `--marine` (Fuß), `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--weiss`, `--schrift-titel` (Lexend), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Platzgrafiken.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-auf-limette` auf `--limette`, `--text-auf-dunkel` und `--text-leise-dunkel` auf `--flaeche-dunkel` und `--marine`. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Texte, Fuß); die große Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem`). Beispielwerte (`data-beispiel`) durch echte Angaben, Platzgrafiken und Fotos durch Material des Clubs.

## Offen
Formulare senden nichts. Zahlen, Preise, Tarife, Zitate, Bewertung, Öffnungszeiten, Trainerangaben und die Kennzahlen der Punktereihen sind Beispiele, keine Belege; Laufzeit, Kündigungsfrist, Preisangaben und Datenschutz sind je Club zu ergänzen und rechtlich nicht geprüft. Die Fotos zeigen keinen Tennissport, sechs ohne vollständigen Nachweis (siehe `BILDER.md`). Der Wiedergabeknopf ist ein Platzhalter ohne Video; kommt ein Video, braucht es Poster und einen echten Pausenknopf. Kontrast von Text über Fotos ist durch den Verlauf gestützt, aber nur im Browser gesehen, nicht für jedes Ersatzfoto gemessen. Beim Anspringen eines Ankers deckt die schwebende Kopfleiste den Abschnittsanfang um ihre Höhe (`scroll-margin-top` im Projekt ergänzen). Drei Links in der Fußzeile und die Folgen Links sind Platzhalter. Die Kopfleiste zeigt auf dem Handy nur "Probetraining". `pruefe-motion.mjs` meldet Warnungen für Hover ohne `@media (hover: hover)`, nicht behoben.

## Conversion (Playbook)
- Held: Erwachsene und Familien, die Tennis oder Padel spielen wollen, aber Platz und Partner suchen; Lösung ist online buchen, Probetraining ohne Vorkenntnisse und eine Clubgemeinschaft
- H1 "Platz buchen. Spielen. Dazugehören." (Versalien per CSS, Text im HTML in Normalschrift), Unterzeile unter 20 Wörtern
- Primär-CTA "Probetraining buchen" in Kopf, Held, Angebote, Mitgliedskarte, Trainerwahl, Formular und Fuß; "Platz buchen" ist zweite Aktion im Held
- Titel mit Keyword und Musterstadt (58 Zeichen), Beschreibung 157 Zeichen mit Problem, Nutzen und Aufruf
- FAQ: Vorkenntnisse, Platzbuchung, Kosten und Bindung, Kinder, Padel (fünf Fragen, Antworten als Beispiel markiert)
- Formularziel: Probetraining anfragen (Name, E-Mail, Telefon freiwillig, Interesse), vier Felder mit Feldhinweis unter E-Mail und Telefon, Turnstile Platzhalterkommentar; dazu ein Newsletter Feld
- Bewertung im Held als "(Beispiel)" gekennzeichnet; Telefon im Kopf, im Held und im Fuß
