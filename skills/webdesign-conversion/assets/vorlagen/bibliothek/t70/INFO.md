# t70 Videotool Blau

Prinzip nach einem Pinterest Screenshot des Inhabers (Startseite eines KI Videotools, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Telefone und Oberflächenkarten sind aus HTML und CSS gebaut, es gibt keine fremden Screenshots, Logos oder Plattformmarken.

## Eignung
Software als Dienst, Apps und Werkzeuge mit Testzugang, die ein Produkt zeigen und in Stufen verkaufen (Video, Audio, Design, Planung, Auswertung). Lebt von einem Produktbild im Held (hier ein Fächer aus Telefonen, bei einer Desktop Anwendung ein Fenster) und von klaren Preisstufen. Ansprache im Du, für Sie im Text ersetzen. Nicht geeignet für Angebote mit Beratung vor dem Kauf oder für Handwerk und Praxis (dafür t01 bis t25).

## Sektionsfolge
Schwebende Kopfleiste mit Primärknopf, Held (Blauverlauf, Überschrift, Linkfeld mit Knopf, Fächer aus fünf Telefonen), Avatarband als Platzhalter für Nutzer, Funktionen (drei Blöcke, Text und Bild wechseln die Seite), Zielgruppen als Fotostreifen, Ablauf in drei Schritten mit Oberflächenkarten, Stimmen (Porträtreihe, ein Zitat im Fokus), Preise in drei Karten mit Umschalter monatlich oder jährlich, Fragen, Abschluss im Blauverlauf mit Anmeldung, Fuß mit großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | fünf Telefone starten gestapelt und fächern auf, danach schweben sie leicht, jedes versetzt | `data-zeig`, CSS (`transform`, Staffel über `--d`), Endlage steht im CSS |
| Held, Telefon Mitte | Untertitel hebt das gesprochene Wort Wort für Wort hervor, die Wertung zählt hoch (Endwert im HTML) | `stil.js` (`data-untertitel`), `data-zaehle` |
| Avatarband | langsames Band aus echten Elementen, pausiert beim Überfahren, Knopf „Bewegung anhalten“ hält alle Dauerbewegungen an | `stil.js` (Kopie nur mit JavaScript, `aria-hidden`), CSS (`transform`) |
| Funktionsblöcke | Text und Bild fahren abwechselnd von links und rechts ein | `data-zeig="links"` und `"rechts"` |
| Funktion 1 | drei Telefone schweben versetzt, Wertungen zählen hoch | CSS (`transform`), `data-zaehle` |
| Funktion 2 | der Bildausschnitt 9:16 wandert langsam über das Quellbild | CSS (`transform`, Wechsel hin und her) |
| Funktion 3 | der hervorgehobene Untertitelstil wechselt | `stil.js` |
| Zielgruppen | Fotostreifen, auf dem Handy wischbar, Foto wächst beim Überfahren (nur mit Maus) | CSS (`transform`) |
| Ablauf | Schritte bauen sich nacheinander auf (Karte, Balken, Treffer), eine Linie wächst mit dem Scrollen (ab 896 px) | `data-zeig`, `stil.js` (`--lauf`), CSS (`scaleY`, `scaleX`, `opacity`) |
| Stimmen | Porträt wählt das Zitat, das gewählte wächst, das Zitat blendet ein | `stil.js`, CSS |
| Preise | Umschalter tauscht die Beträge, beide Werte stehen im HTML, nur das Attribut `data-takt` wechselt | `stil.js`, CSS (`opacity`, `transform`) |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Fuß | große Wortmarke fährt von unten ein | `data-zeig`, CSS |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy steht alles sichtbar und bedienbar: Der Fächer steht fertig (auf dem Handy drei Telefone), der Untertitel hebt ein festes Wort hervor, die Avatare stehen als ruhige Reihe, die Preise zeigen monatlich, alle Zitate stehen untereinander (die Porträts führen als Links zum Zitat), die Ablauflinie ist ganz gefüllt. Bewegt werden nur `transform` und `opacity`.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Blau, Fläche mit hellem Text, auf Hell auch Text und Linie), `--akzent-text`, die drei Verlaufsstufen `--blau-tief`, `--blau-mitte`, `--blau-hell`, `--cyan` (nur Zeichen und Glanz), `--gelb` (nur das gesprochene Wort), `--gut` (Haken), `--weiss`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), Radien (`--radius-telefon` für die Telefonmockups), `--ton-1` bis `--ton-4` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Der Verlauf geht von `--blau-tief` über `--blau-mitte` nach `--blau-hell`; bleibt `--blau-hell` so dunkel, dass Weiß darauf mindestens 4,5 zu 1 erreicht (hier 5,4 zu 1), und führt der Verlauf nie Richtung Violett, bleibt die Seite lesbar und ohne KI Verlauf. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche-alt`, `--gut` auf Weiß. Der Name „Markenname“ steht an mehreren Stellen (Titel, Logo, Texte, Fuß); die große Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem`), ein anderer Name braucht einen neuen Wert für `.fuss__marke`. Die Telefone zeigen Porträts als Beispielclips: durch Standbilder aus dem eigenen Produkt oder echte Clips ersetzen. Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Das Linkfeld im Held und das Formular senden nichts, der Hinweis darauf erscheint beim Absenden. Preise, Leistungen, Zahlen, Namen, Zitate, die Nutzerzahl und die Wertung sind Beispiele, keine Belege, und nach Preisangabenverordnung und Widerrufsrecht je Produkt zu ergänzen (Kündigung, Laufzeit, Mehrwertsteuer). Die Antworten der Fragen sind Beispiele, die Datenschutzangaben (Ort der Verarbeitung, Löschung, Auftragsverarbeiter) sind je Produkt festzulegen. Strukturierte Daten (`SoftwareApplication`) tragen Beispielpreise und bewusst keine Bewertung. Alle Personenfotos sind Platzhalter aus anderen Vorlagen. Text in den Telefonen und in den Oberflächenkarten ist unter 16 px und dekorativ (verborgen für Hilfstechnik), die Karten sind keine bedienbaren Elemente. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang um ihre Höhe (`scroll-margin-top` im Projekt ergänzen). Rechtstexte, Turnstile (Platzhalterkommentar im Formular), Bestätigungsmail und Versand baut der Bauablauf. Nicht gemessen: Safari, echte Geräte, Screenreader, Leistung des schwebenden Fächers auf schwachen Handys.

## Conversion (Playbook)
- Held: Creator und Marketingteams mit langen Videos, die liegen bleiben, weil der Schnitt Tage kostet; Lösung ist ein Werkzeug, das Clips im Hochformat mit Untertiteln in Minuten erstellt
- H1 „Aus einem langen Video werden Clips für den ganzen Monat“, Unterzeile nennt den Ablauf (hochladen, finden, prüfen) in höchstens 20 Wörtern
- Primär-CTA „Kostenlos testen“ in Kopf, Held (Linkfeld), nach Zielgruppen und Ablauf, in den drei Preiskarten und im Abschluss, immer dasselbe Verb
- Titel und Beschreibung mit Nutzen und Aufruf, kein Ortsbezug (Software); Telefon des Vertriebs im Held, im Abschluss und im Fuß, im Menü auf dem Handy
- FAQ: Schnittkenntnisse, Daten und Datenschutz, Marke, Untertitel auf Deutsch, Kündigung (Antworten als Beispiel markiert)
- Formularziel: Testzugang (Name, E-Mail, Kanal oder Firma, Videos pro Monat), vier Felder, Feldhinweis unter der E-Mail, Bestätigungshinweis unter dem Knopf
- Nutzerzahl und Stimmen als „Beispiel“ gekennzeichnet, Wertung der Clips als Orientierung, ohne Garantie
