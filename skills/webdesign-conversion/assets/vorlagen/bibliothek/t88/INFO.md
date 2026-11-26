# t88 Reisebüro hell mit Fotokarten

Prinzip nach einem Pinterest Screenshot des Inhabers (Reisebüro Startseite, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Reisebüros, Reiseveranstalter und Anbieter von Erlebnisreisen in Deutschland, die mit großen Landschaftsfotos Fernweh wecken und Besucher über eine Suchleiste direkt zur Anfrage führen. Lebt von hellen Landschaftsfotos. Ansprache im Du, für Sie im Text ersetzen. Die Suchleiste ist kein Buchungssystem, sondern ein Anfrageformular mit fünf Feldern.

## Sektionsfolge
Held als Fotokarte (Kopfzeile in der Karte, zentrierte Überschrift, Suchleiste, Text und Link am Fuß), Über uns (Leitsatz mit Wortlicht, drei Kennzahlen), Service (ein Hochformatbild und zwei Querbilder, Text über Bild), Bausteinband (eigene Symbole, kein Partnerband), Reisepakete (drei Hochformatkarten und Knopf), Fragen (Text links, Akkordeon rechts), Stimmen (Wischspur in zwei Reihen), Vollbildabschnitt mit Foto, Überschrift und Mailfeld, dunkler Fuß.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Foto zoomt beim Laden von 1,12 auf 1 | CSS (`transform`), nur ohne reduzierte Bewegung |
| Über uns | Wörter des Leitsatzes hellen beim Scrollen von grau auf schwarz auf | `data-licht` |
| Kennzahlen | zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Service | Bilder driften leicht gegen die Scrollrichtung | `data-parallax` auf dem Bild, Bild 118 Prozent hoch |
| Bausteinband | läuft endlos, Knopf hält es an, bei reduzierter Bewegung und ohne JavaScript ein ruhiger Block | CSS (`band`), `stil.js` |
| Reisepakete | Karte hebt sich, Foto zoomt (auch bei Fokus) | CSS |
| Fragen | Akkordeon, ein Eintrag offen, Plus dreht sich zum Kreuz | `details` mit `data-exklusiv` |
| Stimmen | Wischspur, Ränder blenden aus, Pfeilknöpfe | `stil.js`, CSS (`mask-image`) |
| Vollbild | Foto wächst beim Scrollen von 74 auf 100 Prozent, die Bühne bleibt dabei stehen (ab 768 px) | `data-fortschritt`, CSS (`transform`, `position: sticky`) |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy steht das Vollbild als ruhiger Block, das Band als Block, die Stimmen als Wischspur. Alles bleibt sichtbar und bedienbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Petrol, Fläche mit weißem Text, auf Hell auch Text und Linie), `--akzent-text`, `--akzent-warm` (nur Zeichen: Punkt am Kicker, Logo), `--weiss`, `--schrift-titel` (Outfit, Gewicht 300), `--schrift-text` (Instrument Sans), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche` und Weiß, `--akzent` auf Weiß. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Fuß, JSON-LD). Beispielwerte (`data-beispiel`) durch echte Angaben ersetzen.

## Offen
Formulare senden nichts, Turnstile ist ein Kommentar. Kennzahlen, Namen, Stimmen, Preise (`ab 000 €`), Telefon und Adresse sind Beispiele, keine Belege. **Reiserecht je Kunde zu ergänzen und nicht rechtlich geprüft:** Informationspflichten bei Pauschalreisen (Formblatt vor Vertragsschluss), Preisangaben mit Gesamtpreis, Sicherungsschein, Reisebedingungen, Angaben zum Veranstalter im Impressum, Vermittlung von Reiseversicherungen (Beispieltext in der FAQ, Vermittlerstatus je Anbieter prüfen). Die FAQ Antworten sind Beispiele. Die Fotos zeigen nicht zwingend deutsche Ziele (Mittelmeerbucht, Hochgebirge), je Kunde ersetzen; Personenfotos der Stimmen sind Beispielbilder. Kontrast von Text über Fotos (Held, Service, Pakete, Vollbild) ist über Verläufe gesichert, aber nur am Beispielfoto gesehen, nach dem Austausch neu prüfen. Das Datumsfeld zeigt das Format des Browsers. Footerlinks sind Platzhalter. Die Kopfleiste liegt in der Karte und scrollt mit (kein fester Kopf).

## Conversion (Playbook)
- Held: Paare und Freunde, die Urlaub in Deutschland wollen, aber keine Zeit für Planung haben; Lösung persönlich geplante Erlebnisreise, Anfrage in einer Minute
- H1 "Deutschland neu erleben, ohne selbst zu planen", Unterzeile am Kartenfuß nennt Bahn, Unterkunft, Programm und Telefon
- Primär-CTA "Reise anfragen" in Kopf, Suchleiste, drei Paketkarten, Knopf unter den Paketen und im Vollbild
- Suchleiste als Anfrageformular mit fünf Feldern (Wunschziel, Reisezeit, Personen, E-Mail, Telefon freiwillig), Feldhinweise unter E-Mail und Telefon, Datenschutzzeile, Bestätigungshinweis
- Titel mit Keyword, Beschreibung mit Problem, Nutzen und Aufruf
- FAQ mit fünf Einwänden: Buchung, Preis und Sicherheit, Bestätigung, Gruppen, Versicherung
- Belege (Kennzahlen, Stimmen) als Beispiel gekennzeichnet
