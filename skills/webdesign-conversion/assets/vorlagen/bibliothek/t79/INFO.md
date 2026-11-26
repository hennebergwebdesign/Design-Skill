# t79 Podcast hell und schwarz

Prinzip nach einem Pinterest Screenshot des Inhabers (Podcast Startseite, hell mit Schwarz, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Podcaststudios zum Mieten, Audio und Videoproduktion und Medienagenturen, die Hörproben, Team und eine Anfrage für Studio oder Produktion zeigen. Auch für Firmenpodcasts und Sendungen mit Folgenübersicht. Ansprache im Du, für Sie im Text ersetzen. Lebt von zwei echten Fotos (Sprecher am Mikrofon im Held, Mikrofon im Raum in Über uns); die Vorlage trägt Beispielfotos und eine gezeichnete Mikrofonfigur.

## Sektionsfolge
Kopfleiste (Menü, Telefon, Primärknopf), Held (Foto mit Verlauf, zentrierte Überschrift, zwei Knöpfe, Beleg als Beispiel), weiße Karte "Hör uns auf" mit vier Plattformknöpfen, Beliebte Folgen (vier Bildkarten, Abspielkarte als Attrappe), Über uns (Mikrofonbild, Kennzahlen, Partnersymbole, Gästeavatare), drei Sprecherkarten, schwarze Abonnierkarte mit Mikrofon, Warum wir (Foto, schwarzes Akkordeon), Stimmen als Wischspur, Themenraster mit acht Folgen, Fragen, Kontakt mit Formular, Sponsorkarte, schwarzer Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto zoomt beim Laden einmal leicht heraus | CSS (`transform`), nur mit JavaScript |
| Folgenkarten | Foto zoomt beim Überfahren, runder Abspielknopf erscheint (auf Touchgeräten immer sichtbar) | CSS (`transform`, `opacity`) |
| Abspielkarte | Pegelbalken laufen, Knopf hält sie an oder startet sie (WCAG 2.2.2), bei reduzierter Bewegung stehen sie | CSS (`transform: scaleY`), `stil.js` |
| Über uns | Kennzahlen zählen hoch, Endwert steht im HTML; Mikrofon driftet leicht gegen die Scrollrichtung | `data-zaehle`, `stil.js` (ab bewegung.js) |
| Sprecherkarten, Themenraster | gestaffeltes Einblenden | `data-staffel`, `data-zeig` |
| Abonnierkarte | Mikrofon steigt beim Scrollen von unten auf (ab 896 px) | `stil.js` (`--steig`), CSS (`transform`) |
| Warum wir, Fragen | Akkordeon, ein Eintrag offen, die anderen schließen | `details` mit `data-exklusiv`; auf dem Desktop bleibt das Akkordeon beim Scrollen stehen (`position: sticky`) |
| Stimmen | Wischspur mit Punkten (Punkte erst mit JavaScript, ohne sie wischbar), auf dem Desktop drei Karten nebeneinander | `stil.js` |
| Menü | Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Es gibt keine Audiodatei und keinen Ton.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (das Schwarz der Marke: Abonnierkarte, Akkordeon, Fuß), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Schwarz, Primärknopf auf Hell), `--akzent-text`, `--signal` (Primärknopf auf Schwarz und Foto, Pegelbalken, Abspielknopf), `--signal-text`, `--weiss`, `--feld-rand`, `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für die Folgencover.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--signal-text` auf `--signal`, `--text-leise` auf `--flaeche-alt`, `--text-leise-dunkel` auf `--flaeche-dunkel`, `--feld-rand` auf Weiß. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, JSON-LD, Fuß). Die Plattformknöpfe sind neutrale Zeichen "Plattform A bis D" und durch die echten Dienste des Kunden zu ersetzen (deren Logos nur nach Markenrichtlinie). Die gezeichnete Mikrofonfigur (`#i-mikro-gross`) darf durch ein Foto ersetzt werden.

## Offen
Formulare senden nichts, die Abspielkarte ist eine Attrappe ohne Audiodatei (Platzhalter, deutlich beschriftet). Folgen, Titel, Dauer, Zahlen (Shows, Studiostunden, Gäste), Namen, Stimmen, Adresse, Öffnungszeiten und Antworten der FAQ sind Beispiele, keine Belege. Rechte an Aufnahmen und Mietbedingungen sind je Betrieb zu klären, die Antwort dazu ist keine Rechtsauskunft und nicht rechtlich geprüft; Werbekennzeichnung beim Sponsoring ist je Kunde zu ergänzen. Die Fotos sind Beispielfotos (Unsplash), es gibt kein Mikrofon oder Studiofoto im Bestand. Der Text über dem Heldfoto ist mit einem Verlauf lesbar gemacht und nach dem Einsetzen eines anderen Fotos neu zu prüfen. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang um ihre Höhe (`scroll-margin-top` im Projekt ergänzen). Die Folgenkarten springen zur Abspielkarte und setzen dort den Titel, spielen aber nichts ab.

## Conversion (Playbook)
- Held: Unternehmen, Vereine und Kreative, die einen Podcast starten und an Technik, Schnitt und Veröffentlichung scheitern; Lösung ist ein Studio zum Mieten, auf Wunsch mit Produktion
- H1 "Dein Podcast klingt nach Profis, ohne dass du schneidest", Unterzeile nennt Studio zum Mieten, Schnitt und Veröffentlichung
- Primär-CTA "Studio anfragen" in Kopf, Held, Akkordeon und Formular; "Abonnieren" ist die Newsletteraktion, "Sponsor werden" die Nebenaktion
- Titel mit Keyword und Musterstadt (55 Zeichen), Beschreibung mit Problem, Nutzen und Aufruf (141 Zeichen)
- FAQ: Vorerfahrung, Kosten, Dauer bis zur Folge, Rechte an Aufnahmen, mehrere Gäste und Kamera (Antworten als Beispiel)
- Formularziel: Studioanfrage (Name, E-Mail, Telefon freiwillig, Vorhaben, Nachricht), fünf Felder, Feldhinweise unter E-Mail und Telefon
- Beleg im Held als "(Beispiel)" gekennzeichnet, JSON-LD LocalBusiness mit Beispielwerten
