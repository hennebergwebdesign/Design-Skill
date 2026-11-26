# t72 Wellness waldgrün

Prinzip nach einem Pinterest Screenshot des Inhabers (Wellness Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Nicht übernommen: der Markenname der Referenz, ihre Texte und ihre Behandlungsangebote.

## Eignung
Naturheilpraxen, Physiotherapie, Spas, Ernährungsberatung und Kosmetikstudios, die ruhig und hochwertig auftreten, Beratung und Entspannung zeigen und nebenbei ein kleines Sortiment (Pflege, Bad, Tee) führen. Ansprache im Du, für Sie im Text ersetzen. Die Texte sind bewusst als Begleitung, Beratung, Bewegung und Entspannung formuliert, ohne Heil-, Wirk- oder Erfolgsversprechen (Heilmittelwerbegesetz). Wer Behandlungen mit Krankheitsbezug anbietet, braucht eigene, rechtlich geprüfte Texte.

## Sektionsfolge
Zwei schwebende Leisten (Logo und Menü mit Knopf), Vollbildheld mit Foto, linksbündiger Leichtschrift und Textkarte mit Knopf und Telefon, Über uns (Zitat als Wortlicht, Porträtkarte, Raumfoto, Datenkarte mit Erstgespräch), Im Fokus (Ernährungsberatung mit Themenmarken, Beraterkarte, Foto mit Datenkarte), Angebote (großes Foto links wechselt mit dem geöffneten Eintrag, Liste mit fünf Einträgen rechts), Sortiment (Filterleiste, Karussell mit hervorgehobener Mitte aus sechs Flächenprodukten), Stimmen in grüner Karte mit Pfeilen, Fragen (fünf Einwände, Statusanzeige), Fuß mit Terminformular, Öffnungszeiten, Kontakt und großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto zoomt beim Laden langsam von 112 auf 100 Prozent, beim Scrollen driftet es leicht | CSS `animation` (`transform`), `data-parallax` |
| Über uns | Zitat hellt Wort für Wort auf, Datenkarte schwebt ein, Balken der vier Phasen füllen sich von links | `data-licht`, `data-zeig`, CSS (`transform`) |
| Über uns und Im Fokus | Kennzahl zählt hoch (Endwert steht im HTML), Tagesbalken füllen sich gestaffelt | `data-zaehle`, CSS (`transform`) |
| Angebote | Das geöffnete Akkordeon wechselt das Foto (Überblendung, `opacity`) und die Werte der Karte, Inhalt gleitet auf | `stil.js`, `details` mit `data-exklusiv` |
| Sortiment | Filter blenden Produkte aus, Karussell rastet ein (Scroll Snap), die mittlere Kachel ist größer, Pfeile und Pfeiltasten schieben | `stil.js`, CSS (`transform`, `opacity`) |
| Stimmen | Pfeile wechseln die Karte, die neue gleitet ein | `stil.js`, CSS (`transform`, `opacity`) |
| Fragen | Akkordeon, ein Eintrag offen, die Statusanzeige zählt gelesene Fragen und füllt ihren Balken | `stil.js`, `data-exklusiv` |
| Abschnitte und Fuß | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü, Wortmarke blendet ein | `bewegung.js` |

Nur `transform` und `opacity`, keine ease-in Kurven für Eintritte, Bedienelemente unter 300 ms. Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar: ohne JavaScript steht das erste Angebotsfoto, alle Produkte und alle drei Stimmen sind sichtbar, die Produktleiste ist wischbar, Filter und Statusanzeige erscheinen erst mit JavaScript. Ohne JavaScript scrollt die Kopfleiste mit.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (bewusst gleich `--akzent`), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Waldgrün, Fläche mit hellem Text), `--akzent-text`, `--gruen-licht` (helle Karten, Text darauf `--akzent`), `--gruen-signal` (nur Zeichen und Punkte auf Dunkelgrün), `--weiss`, `--feld-rand`, `--kachel`, `--flasche-1` bis `--flasche-6` (Produktflächen), `--schrift-titel` (Hanken Grotesk, Gewicht 300), `--schrift-text` (Instrument Sans), Radien.

Gemessene Kontraste (nachgerechnet): Text auf Beige 13,5 zu 1, gedämpfter Text auf Beige 6,1, auf der zweiten Fläche 5,5, heller Text auf Waldgrün 10,4, gedämpfter heller Text auf Waldgrün 7,2, Waldgrün auf Hellgrün 9,3, Signalgrün auf Waldgrün 6,5. Eingabefeldrand auf Weiß 3,8 zu 1 (Bedienelement, 3 zu 1 verlangt).

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent` auf `--gruen-licht`, `--text-leise` auf `--flaeche-alt` und `--kachel`, `--text-leise-dunkel` auf `--flaeche-dunkel`. Der Name "Markenname" steht an mehreren Stellen; die große Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem`). Produktflächen (`.flasche`) durch Produktfotos ersetzen, dann entfällt `--flasche-1` bis `--flasche-6`. Die Leichtschrift (Gewicht 300) braucht bei einer anderen Schrift eine Variablenschrift oder ein anderes `--titel-gewicht`. Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formular sendet nichts, das Turnstile Widget ist als Kommentar vermerkt. Alle Angaben sind Beispiele und keine Belege: Preise, Dauer, Öffnungszeiten, Namen, Bewertungen, Zitate, Produkte, die Kennzahlen der Datenkarten und das JSON-LD. **Ärztliche und heilkundliche Angaben (Beratung, Naturheilkunde, Zuschuss der Krankenkasse, Absagebedingungen, Massage) sind Beispiel und rechtlich nicht geprüft**; Heilmittelwerbegesetz, Berufsbezeichnungen (Heilpraktiker, Ernährungsberater) und Preisangabenverordnung je Betrieb prüfen. Das Formular warnt vor Gesundheitsdaten, ein echtes Formular braucht dafür eine eigene Datenschutzprüfung. Fünf Beispielfotos (Held, Dehnen, Salat, Tee, Hände) haben in der Ursprungsvorlage keinen Eintrag in `BILDER.md`, der Nachweis ist offen (siehe `BILDER.md`). Das Heldfoto zeigt eine Sportlerin, die Wirkung für Wellness ist Stimmung. Kontrast von Text über dem Heldfoto am hellsten Pixel nachgemessen (siehe unten), Kontrast über den anderen Fotos nicht. Die Kicker sind auf drei begrenzt (Über uns, Sortiment, kein weiterer), das Original nummeriert jede Sektion; die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen). Kein Evalfall, kein Test mit Screenreader oder echten Geräten. Das Produktkarussell ist mit Pfeiltasten bedienbar, die Tastaturbedienung der anderen Teile ist nur über Tab und Enter getestet.

## Conversion (Playbook)
- Held: Menschen mit vollem Alltag und wenig Zeit für sich, Lösung ein ruhiger Ort mit Beratung, Bewegung und Entspannung, online buchbar
- H1 "Wenig Zeit für dich selbst? Wir geben dir einen ruhigen Ort dafür." (Problem und Lösung), Unterzeile nennt die Zielgruppe und grenzt gegen ärztliche Behandlung ab
- Primär-CTA "Termin buchen" in Kopf, Held, Über uns, Beraterkarte, Angebotseinträgen, Fragen und Formular
- Titel mit Keyword und Musterstadt (45 Zeichen), Beschreibung mit Nutzen und Aufruf (138 Zeichen)
- FAQ: Überweisung, Ersatz für den Arztbesuch, Dauer und Kosten, Absage, Mitbringen (Antworten als Beispiel gekennzeichnet)
- Formularziel: Terminanfrage (Name, E-Mail, Telefon, Anliegen, Wunschzeit), fünf Felder mit Feldhinweis unter E-Mail und Telefon, Bestätigungshinweis unter dem Knopf
- Strukturierte Daten: JSON-LD `HealthAndBeautyBusiness` mit Beispielwerten
