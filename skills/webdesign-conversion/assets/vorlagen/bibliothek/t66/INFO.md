# t66 Kanzlei Dunkelknopf

Prinzip nach der freigegebenen Referenz fileon.webflow.io (Webflow Template, vom Inhaber zur Erfassung freigegeben), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kanzleien, Unternehmensberatung, Steuer, Versicherungsmakler, Treuhand und andere Beratung, die mit Porträts und großer Schrift Haltung zeigen will. Hell auf kühlem Papier, Serife für Titel, dunkle Knopfflächen, Fuß dunkel. Ansprache im Du, für Sie im Text ersetzen. Die Beispieltexte machen keine Erfolgsversprechen; bei Rechtsberatung gelten für Werbung die Berufsregeln, vor dem Einsatz klären. Der Held lebt von einem starken Porträtfoto; ohne gutes Bild wirkt das große Wort leer.

## Sektionsfolge
Kopf durchsichtig über dem Held (Schnellzugriff, Menüknopf öffnet die volle Liste, mobil auch Telefon), Vollbildheld mit Kerbe unten rechts (Bewertungszeile, Satz, Knopf, riesiges Wort mit Pfeil), laufendes Logoband mit Trennlinien, Über uns (Kicker links, große Aussage rechts, Porträt und Zahlkarte), Vorgehen (Fortschrittslinie mit Knopf, drei Schritte links, Mitte, rechts), Fälle (Karte bleibt stehen, drei große Bilder mit Infokarte), Leistungen (vier Zeilen in Abstufung), Bildfläche mit drei Zusagen, Warum wir (Karte, Zahlkarten, Porträt mit Kerbe), Stimmen (großes Zitat mit Pfeilen), Pakete (Reiter, Preis, Liste, Karte für Individuelles), Fragen (Akkordeon, fünf Einwände), Aufruf (Karte mit Aktenzeichen, dunkle Bildkarte), Ratgeber (drei Karten), Fuß mit Newsletterfeld und Spalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bewertung, Satz und Knopf staffeln ein | `data-zeig`, `data-staffel` |
| Logoband | läuft, hält beim Überfahren an | `.band` |
| Über uns | Aussage hellt Wort für Wort auf | `data-licht` |
| Vorgehen | Abschnitt bleibt stehen, Knopf wandert über die Linie, Schritte erscheinen nacheinander (nur ab 960 px) | `stil.js`, `transform` und `opacity` |
| Fälle | linke Karte bleibt stehen, Bilder laufen vorbei | CSS `position:sticky` |
| Leistungen | Zeilen unten im Bild schräg nach hinten gekippt, werden beim Hochscrollen flach | `stil.js`, `rotateX` |
| Bildfläche | wächst von 70 Prozent auf volle Größe | `stil.js`, `scale` |
| Stimmen | Spur mit Scroll Snap und Pfeilknöpfen | `stil.js`, ohne JavaScript wischbar |
| Pakete | Reiter mit Pfeiltasten | `stil.js` |
| Kopf | Papierfläche blendet nach dem Scrollen ein, Menü als dunkle Liste | `bewegung.js`, CSS |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar: Logoband wird zur umbrechenden Folge, Zeilen und Bildfläche stehen gerade, Vorgehen steht als Raster, beide Pakete stehen untereinander. Ohne JavaScript scrollt der Kopf mit.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--karte`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (dunkle Knopffläche, `--akzent-text` darauf), `--akzent-warm` (nur Zierpunkte und Skala, nicht für kleinen Text), `--schrift-titel` (Newsreader), `--schrift-text` (Schibsted Grotesk), `--seide` (Verlauf der Zahlkarten), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--text-leise` auf `--flaeche-alt` (5,8 zu 1), `--akzent-text` auf `--akzent` (15,6 zu 1), `--text-leise-dunkel` auf `--flaeche-dunkel-2` (7,5 zu 1). Name und Zeichen im Logo (Symbol `#zeichen`, drei Stellen), das große Wort im Held (`KLARHEIT`, bei längerem Wort `--h1-wort` in `stil.css` kleiner setzen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Bewertung, Zahlen, Fälle, Namen, Stimmen, Preise, Logos und Kontaktdaten sind Beispiele, keine Belege; die Fälle sind erfunden und müssen zu echten, freigegebenen Fällen werden. Die Kerbe ist ein `clip-path` mit festem Maß, bei anderen Bildformaten prüfen. Der Held liegt bei einem Foto unter einem dunklen Schleier, Kontrast von Text über echten Fotos neu prüfen. Die Bildfläche ist ein Bildplatz, kein Video, ein Video braucht Pausenknopf (WCAG 2.2.2). Zwei Links im Fuß sind Platzhalter. Nur die Startseite ist gebaut, die Unterseiten der Referenz nicht.

## Conversion (Playbook)
- Kommentar zur Heldformel vor der H1
- Primärknopf "Gespräch anfragen" in der Kopfzeile: über dem dunklen Held hell, nach dem Scrollen dunkel (`.kopf__knopf`)
- Hauptnavigation (Panel) von acht auf sechs Punkte, Fälle und Ratgeber stehen im Fuß, der Schnellzugriff behält Ratgeber und ist jetzt eine Reihe von Links ohne Liste
- Neuer Abschnitt "Fragen" vor dem Aufruf: fünf Einwände, Akkordeon mit rundem Plus (`.frage__plus`, nur CSS)
- Telefon und Bewertung im Held waren schon da; das einzige Formular ist der Newsletter im Fuß, unverändert
