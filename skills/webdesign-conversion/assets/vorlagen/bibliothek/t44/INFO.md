# t44 Software Start hell

Prinzip nach der freigegebenen Referenz SaaSly (Tor 1 erteilt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Die dreidimensionalen Figuren und Porträtfotos der Referenz sind durch einfache Formen und Platzhalterflächen ersetzt.

## Eignung
Landingpage für eine Software oder App (Aufgaben, Planung, Abrechnung, Vereinsverwaltung) und für jedes Angebot, das sich über Funktionen, drei Schritte und drei Preisstufen erklärt. Hell und verspielt, mit sehr großen Überschriften. Ansprache im Du, für Sie im Text ersetzen. Ohne eigene Produktbilder tragen die gebauten Oberflächen (Telefone, Fenster), mit echten Screenshots werden sie ersetzt. Preise, Testphase und Zahlarten sind je Angebot festzulegen.

## Sektionsfolge
Schwebende Kopfleiste, Held (riesige Zeile, zwei Knöpfe, Beleg, links und rechts je ein Telefon), Logolaufband, Produktfenster auf farbigem Rahmen, Funktionen (eine Pastellkarte mit Liste links, Blumenform in der Mitte, Text rechts, auf dem Handy drei Karten untereinander), Ablauf in drei Stufen (drei Pastellflächen stapeln sich beim Scrollen), Vorteile (vier Karten, rechte Spalte versetzt), Preise (drei Karten, die mittlere gefüllt, die äußeren gekippt), Aussage (riesiger Satz mit schwebenden Bildern), Team (drei Bildkarten mit Namensleiste), Stimmen (vier gegenläufig laufende Spalten), Ratgeber (drei Bildkarten), Fragen (Akkordeon in Pastellkarte), Fuß (Newsletter, Links, App laden).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Zeile und Knöpfe staffeln ein, Telefone verschieben sich leicht gegeneinander | `data-zeig`, `data-staffel`, `data-parallax` |
| Logoband | läuft seitlich, pausiert bei Mauszeiger | `.band` |
| Vorschau | Fenster skaliert beim Einblenden auf volle Größe | `data-zeig="skala"` |
| Funktionen | Reiter wechseln die Karte (Desktop), Pfeiltasten gehen mit | `stil.js`, Einblenden per Deckkraft |
| Ablauf | Stufen bleiben stehen und werden von der nächsten überdeckt, Formen schweben | CSS `position: sticky`, `translate` |
| Vorteile | Karten staffeln ein, Formen schweben | `data-staffel`, `.schwebt` |
| Preise | äußere Karten kippen und richten sich beim Scrollen auf | `stil.js` setzt `--kipp`, CSS rechnet `transform` |
| Aussage | Wörter hellen beim Scrollen auf, Bilder verschieben sich leicht | `data-licht`, `data-parallax` |
| Stimmen | Spalten laufen gegenläufig nach oben und unten, pausieren bei Mauszeiger | `translateY`, bei reduzierter Bewegung stehen sie ruhig |
| Fragen | Akkordeon, Plus dreht zum Kreuz | `details` mit `data-exklusiv` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung und ohne JavaScript ist alles sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit, die Funktionskarten stehen untereinander, die Preiskarten sind gerade.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-karte`, `--flaeche-dunkel` (nur für Telefonrahmen und Hinweise), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--akzent` (Mandarine, nur Fläche mit dunklem Text, auf Hell nie Textfarbe), `--akzent-text`, `--akzent-tief` (Akzent als Text auf Hell), `--schrift-titel` (Outfit), `--schrift-text` (Instrument Sans), Radien, `--pastell-pfirsich`, `--pastell-mint`, `--pastell-himmel`, `--pastell-butter`, `--pastell-rose` für Stufen, Karten und Fragen, `--ton-1` bis `--ton-6` für Bildplatzhalter und Formen.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--akzent-tief` auf `--flaeche`, `--text-leise` auf den Pastellflächen. Name und Zeichen im Logo (Symbol `#i-zeichen`, drei Stellen), Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos, Beispielwerte (`data-beispiel`) durch echte Angaben. Die Blumenform der Funktionsbilder ist eine Maske in `stil.css` (`--blume`), sie lässt sich gegen jede andere Form tauschen.

## Offen
Alle Zahlen, Namen, Preise, Bewertungen und Tarife sind Beispiele, keine Belege; die Beispiellogos sind Beispiellogos. Der Newsletter-Formular sendet nichts. Die gestapelten Stufen und die Formen sind Ersatz für die dreidimensionalen Figuren der Referenz und brauchen eigene Illustrationen, wenn die Marke sie will. Kontrast von Text über Bildern nach dem Einsetzen neu prüfen. Die Funktionsreiter sind auf Handybreite eine Liste untereinander und brauchen dort keine Bedienung. Drei Links im Fuß (Impressum, Datenschutz, App laden) sind Platzhalter. Rechtliche Angaben je Angebot (Preisangaben, Widerruf, Datenschutz) fehlen bewusst.

## Conversion (Playbook)
- Nur der Kommentar zur Heldenformel vor der H1 ergänzt. Beleg im Held, Fragen, Telefon und Knopf in der Kopfzeile waren schon vorhanden.
