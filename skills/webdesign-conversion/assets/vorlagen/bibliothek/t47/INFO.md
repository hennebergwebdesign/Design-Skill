# t47 Startseite blau

Prinzip nach der freigegebenen Referenz LaunchKit (webflow.io Vorlage, Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge, Proportionen und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Erfasst wurden die Startseite, `/post-launch` und `/waitlist`.

## Eignung
Produktstart mit Warteliste, Software und Dienste mit Preisen, Gründerinnen und Gründer, Beta Phasen. Drei Varianten teilen `marke.css`, `stil.css` und `stil.js`: **Vor dem Start** (`index.html`), **Nach dem Start** (`v2.html`), **Warteliste** (`v3.html`, ein Bildschirm mit Zähler und Mailfeld). Ansprache im Du, für Sie im Text ersetzen. Ohne Produktbilder bleibt der Held eine Platzhalterfläche.

## Sektionsfolge
**Vor dem Start:** schwebende weiße Leiste, blauer Held mit Rand (Kicker mit Starttermin, H1, Mailfeld, Hinweiszeile, Oberfläche auf Dämmerungsverlauf mit Dock), Vertrauen (fünf Beispiellogos), Zählerkarte, Funktionen als Raster (zwei halbe, eine breite, drei Drittel), Teil eins (Bühne links, Text rechts), Teil zwei (Text links, Hinweiskarten rechts), Stimmen als Laufband mit Zahlenreihe, dunkle Startkarte mit Mailfeld, Preise (Starter, Profi hervorgehoben, Lebenslang, mit Startpreisen), Fragen, Bekannt aus, Abschlusskarte über dem Fuß.
**Nach dem Start:** Held mit zwei Knöpfen statt Mailfeld, Zahlenleiste direkt unter den Logos, keine Zählerkarte, dafür drei Schritte auf dunkler Karte, Stimmen ohne Zahlenreihe, Preise ohne Startangebot, keine Startkarte.
**Warteliste:** nur Logo, Kicker, zwei Zeilen H1, großer Zähler, Starttermin, Mailfeld, schmale Fußzeile.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, Raster, Teile | Einblenden, gestaffelt, von der Seite | `data-zeig`, `data-staffel` |
| Held und Warteliste | Licht im Blau treibt langsam, mit Pausenknopf (WCAG 2.2.2), nur mit JavaScript | CSS `treiben`, `stil.js`, Klasse `steht` |
| Zähler | tickt sekündlich bis zum Termin in `data-countdown`, Beispieldatum im HTML und in `stil.js` ersetzen | `stil.js` |
| Zahlenreihe | zählt hoch, Endwert steht im HTML | `data-zaehle` |
| Stimmen | Laufband, hält beim Überfahren und bei Fokus an, bei reduzierter Bewegung wischbare Reihe | `.band`, CSS |
| Fragen | Akkordeon, Plus dreht zum Kreuz | `details` mit `data-exklusiv` |
| Preise | Jahresschalter tauscht Beträge und durchgestrichene Preise | `stil.js` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar. Ohne JavaScript steht das Licht still und der Zähler zeigt die Beispielwerte.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--flaeche-blau`, `--flaeche-himmel`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Bernstein: Fläche mit dunklem Text), `--akzent-text`, `--blau` und `--blau-hell` (zweite Farbe auf Hell und Dunkel), `--warm` (Dämmerung), `--gut`, `--warn`, `--schrift-titel` (Outfit), `--schrift-text` (Manrope), Radien.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--blau` auf `--flaeche` und `--flaeche-alt`, `--akzent-text` auf `--akzent`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Name und Zeichen im Logo (Symbol `#i-zeichen`, mehrere Stellen je Seite), Bildplatzhalter (`data-platzhalter`) durch Bilder ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben, Starttermin in `data-countdown`.

## Offen
Formulare senden nichts. Zahlen, Namen, Stimmen, Preise, Termin, Plätze und die Verzeichnisse unter Bekannt aus sind Beispiele, keine Belege; Sterne und Bewertung nur zeigen, wenn es sie wirklich gibt. Oberfläche, Dock, Karten und Kurven sind aus HTML und SVG gebaut und nur Platzhalter für echte Produktbilder. Die Referenz hinterlegt das Blau im Held mit einem Video, hier ersetzt ein CSS Verlauf es. Kontrast von Text über Verläufen nach dem Einsetzen echter Bilder neu prüfen. Das Stimmenband pausiert per Maus und Fokus, einen eigenen Pausenknopf hat es nicht. Weitere Unterseiten der Referenz (Über uns, Fahrplan, Kontakt, Rechtliches) sind nicht gebaut.

## Conversion (Playbook)
- `v3.html` (Warteliste): Knopf „Zugang sichern“ in der Kopfleiste, Fragen (`#fragen`, fünf Einwände, dunkle Karten im Ton der Seite) unter dem Held mit Knopf „Frühen Zugang sichern“ am Ende, Telefon in der Fußzeile. Regeln in `stil-v3.css`.
- `index.html` und `v2.html` hatten die Punkte schon, nicht geändert.
