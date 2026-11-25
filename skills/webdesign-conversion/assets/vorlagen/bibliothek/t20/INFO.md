# Vorlage t20: Dunkle Software

**Eignung:** Software, Plattformen und digitale Dienste für Betriebe (Automatisierung, Verwaltung, Auswertung), die Funktionen, Anbindungen und gestaffelte Preise auf einer dunklen, ruhigen Startseite zeigen wollen. Prinzip einer freigegebenen Referenz (Aufbau, Raster, Folge, Bewegung), Text, Schrift, Farbe und Code sind eigen.

## Sektionsfolge
1. Kopf: Leiste mit Menü, Telefon, Anfrageknopf (Burger mobil)
2. Held: zweitönige Überschrift, Satz, zwei Knöpfe, Produktansicht (Platzhalter) kippt beim Scrollen flach, Sternschnuppen im Hintergrund
3. Vertrauen: Laufband mit acht Beispiellogos
4. Funktionen: vier Kacheln (Ablaufschritte, Messer mit Zähler, Netz, Trefferquote mit Balken)
5. Ablauf (dunkel): links Überschrift mit Wortlicht und Fortschrittsbalken, klebt am Rand, rechts drei Schrittkarten
6. Integrationen: Schema mit Mitte und sechs Anwendungen, Leitungen zeichnen sich, Punkte fahren, dazu Anbindungsliste
7. Preise: Wahl monatlich oder jährlich, drei Karten, die mittlere in Akzent
8. Stimmen: drei Beispielkarten mit Sternen
9. FAQ: Überschrift klebt links, Akkordeon rechts
10. Abschluss: Akzentkarte mit Handlung und Telefon, darunter Anfrage per E-Mail
11. Fuß mit Kontakt, Spalten, Impressum, Datenschutz und riesigem Markennamen

## Animationen
- Einblenden gestaffelt (`data-zeig`, `data-staffel`), Held-Aufrichten (`stil.js`, `--p`), Sternschnuppen, schwebende Chips
- Wortlicht (`data-licht`) und Fortschritt (`data-fortschritt`) im Ablauf, Überschrift klebt (sticky, ab 1024 px)
- Zähler (`data-zaehle`), Messer und Balken füllen sich beim Sichtbarwerden, Leitungen zeichnen sich, Punkte fahren (`offset-path`)
- Preiswahl, Akkordeon mit Plus und Minus, Hover und Fokus an Knöpfen, Karten, Links
- Reduzierte Bewegung und ohne JavaScript: alles sichtbar und lesbar, nichts läuft

## Tokens zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--karte`, `--karte-hoch`, `--signal`, `--stern`, `--leuchte`, Radien, zwei Schriften (Schibsted Grotesk, Instrument Sans).

## Marke wechseln
Tokens setzen, Kontrast prüfen (Text auf Fläche und `--akzent-text` auf `--akzent` mindestens 4,5 zu 1), Markenname in Kopf und Fuß tauschen, `favicon.svg` umfärben, Beispiellogos durch echte ersetzen, Preise, Leistungen und `data-monat` und `data-jaehrlich` anpassen, Beispielstimmen durch freigegebene Zitate ersetzen (Marker `data-beispiel`), Platzhalterbild im Held durch ein Foto oder eine Produktansicht ersetzen, Formular an den Bauablauf anbinden.

## Grenzen
- Formular ist nur Oberfläche, ohne Versand. Zahlen, Preise, Stimmen und Namen sind Beispiele, keine Belege.
- Das Netzschema nutzt `offset-path` in SVG (neuere Browser); ohne Unterstützung stehen die Leitungen still, die Anbindungsliste trägt den Inhalt.
- Der Markenname im Fuß skaliert nach Bildschirmbreite; bei längerem Namen `font-size` in `.fuss__marke` verkleinern.
- Das Schema ist bei 360 px klein (Symbole etwa 16 px), rein dekorativ.

## Icons
Phosphor Icons (MIT), Strichstärke regular durchgehend, Sterne als fill, als Sprite am Seitenanfang (Lizenz in `../_basis/icons/LICENSE-Phosphor.txt`). Beispiellogos aus `../_basis/logos/`.

## Conversion (Playbook)

- Held: Betriebe mit Handarbeit zwischen Anfrage, Angebot und Rechnung, Lösung ein selbst gebauter Ablauf ohne Code
- Primär-CTA überall "Kostenlos starten" (Kopf, Held, Preise, Abschluss, Formular), Sekundär "Vorführung buchen"
- Titel "Abläufe automatisieren | Ohne Programmieren | Markenname", Beschreibung mit Problem, Nutzen und Handlung
- FAQ: erste Frage jetzt Einwand "lohnt sich das für kleine Betriebe", übrige zu Einrichtung, Daten, Kündigung, Fehlerfall (Beispielantworten)
- Formularziel: Start per E-Mail-Adresse, ein Feld
- Beleg im Held: Kundenbewertung als Beispielwert markiert
