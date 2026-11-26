# t110 Produktagentur Graphit und Bernstein

Prinzip nach https://www.ideapeel.com/ (Startseite, eigene Aufnahme bei 1440 und 390 Pixel, nur zur Analyse): Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Code, Marke, Schrift und Farbe sind eigen, keine Datei der Referenz im Repository.

## Eignung
UI/UX Design, Web-App-Entwicklung und Websites für SaaS-Teams und Technikfirmen, auch Produktstudios und Freelancer-Kollektive, die über Festpreis, einen greifbaren Ansprechpartner und gezeigte Oberflächen Scoping-Gespräche gewinnen wollen. Ansprache im Sie. Abgesetzt von t44, t45, t49, t70, t78 (Software, dunkel oder blau, Produkt im Mittelpunkt) dadurch, dass hier eine Dienstleisterin ihre Arbeit zeigt: Graphit mit Olivton und Bernstein, Bühne aus Beispieloberflächen, Preistafel mit Umschalter, Gründerkarte.

## Sektionsfolge
Schwebende Kopfleiste mit Rahmen und Primärknopf, Held (zentrierte H1 unter Bogen aus Linien, Hinweiszeile, zwei Knöpfe, Telefon), Bühne (fünf Spalten Beispieloberflächen in Schräglage, die sich beim Scrollen aufrichten), Beispielzeichen (acht Kacheln), Was wir liefern (Gründerkarte klebt links, vier Großwort-Kacheln rechts), Projekte (Filter, sechs Karten mit Mini-Oberflächen), Leistungen (Bento 3 plus 2), Preise (Umschalter Einmalig und Laufend, drei Pakete, mittleres hervorgehoben), Stimmen (drei Karten), Warum wir (Wischspur), Fragen (Karte links, Akkordeon rechts), Kontakt (Gründer links, Formular rechts), Fuß (Aufruf, Linkkacheln, Wortmarke).

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Texte blenden gestaffelt ein, die zwei inneren Bögen atmen (Skalierung 1 bis 1,035, 9 s, gegenläufig) | `data-zeig`, CSS (`transform`) |
| Bühne (Signatur) | Beispieloberflächen liegen in Schräglage (Neigung 54 Grad, Drehung minus 13 Grad) und richten sich beim Scrollen durch einen klebenden Bildschirm auf, dabei wachsen sie leicht | `data-fortschritt` setzt `--fortschritt`, CSS `transform` mit `calc`, Sticky |
| Beispielzeichen, Kacheln, Karten, Pakete | staffeln ein, heben sich beim Überfahren um 3 bis 4 px | `data-staffel`, CSS (`transform`) |
| Projekte | Filter blendet Karten aus, Mini-Oberfläche steigt beim Überfahren und wächst um 3 Prozent | `stil.js` (`hidden`), CSS (`transform`) |
| Preise | Schieber gleitet unter den Umschalter, Sätze tauschen sich, ohne JavaScript | Radiofelder, `:checked`, CSS (`transform`) |
| Warum wir | Wischspur mit Scroll Snap, Pfeilknöpfe, per Tastatur scrollbar | CSS (`scroll-snap`), `stil.js` |
| Fragen | Akkordeon, ein Eintrag offen, Pluszeichen dreht sich | `details` mit `data-exklusiv`, CSS (`transform`) |
| Fuß | Wortmarke steigt ein, sobald sie sichtbar wird | `stil.js`, CSS (`transform`, `opacity`) |
| Kopf | Abschnittsanzeige als Unterstrich, Menü als Panel auf dem Handy | `bewegung.js`, CSS |

Bei reduzierter Bewegung und ohne JavaScript bleibt alles sichtbar: die Bühne wird zu einem festen, flachen Ausschnitt ohne Kleben, der Filter bleibt verborgen und alle Projekte stehen, beide Preissätze sind über die Radiofelder bedienbar, die Wischspur ist wischbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-karte`, `--flaeche-hoch`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--linie-stark`, `--akzent` (Bernstein, Fläche mit dunklem Text), `--akzent-text`, `--salbei` (zweite Fläche für Kennzeichen und hervorgehobenes Paket), `--kupfer` (nur Zeichen in Beispieloberflächen), `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), Radien.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 16,2 zu 1, `--text-leise` auf `--flaeche` 9,4, auf `--flaeche-karte` 8,7, auf `--flaeche-hoch` 7,9, `--akzent` auf `--flaeche` 10,1, `--akzent-text` auf `--akzent` 10,2, `--salbei` auf `--flaeche-karte` 9,4, `--akzent-text` auf `--salbei` 10,2. Die Karten der Projekte und Mini-Oberflächen tragen eigene helle Flächen in `stil.css` (zum Wechseln dort `.projekt--a` bis `--f` und `.mini` anfassen). Die Wortmarke im Fuß ist auf elf Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt), ein anderer Name braucht einen neuen Wert für `.fuss__marke`. "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

## Offen
Formulare senden nichts. Preise, Stimmen, Namen, Projekte, Zeichen und Antworten sind Beispiele, keine Belege. Die vier Fotos sind Beispiele aus der Bibliothek (Gründer, Gesichter, Stimmen), vor Abgabe durch Fotos der Beteiligten mit Einwilligung ersetzen. Rechtliches (Preisangaben, Festpreisversprechen, Widerruf bei Verbrauchern, Datenschutz) ist nicht geprüft. Die Referenz zeigt Videovorschau, echte Kundenlogos und Sterne, hier bewusst als Bühne aus HTML, neutrale Zeichen und Text ohne Bewertung. Kontrast wurde nur für die Tokenpaare gerechnet, nicht über den Bögen im Held und nicht für die hellen Karten der Projekte (dort tragen die Mini-Oberflächen keinen Text). Safari, Screenreader und echte Geräte nicht geprüft. Die Bühne läuft über `perspective` und `will-change: transform`, die Leistung auf schwachen Geräten ist nicht gemessen. Bühne und Mobil: ab 48 Rem Breite fünf Spalten, darunter drei. Die Kopfleiste verdeckt beim Anspringen einen Abschnittsanfang nicht (`scroll-padding-top` gesetzt).

## Conversion (Playbook)
- Held: SaaS-Gründer und Produktteams im DACH-Raum, Problem schwer bedienbares Produkt und Website ohne Anfragen, Lösung UI/UX und Entwicklung aus einer Hand zum Festpreis
- H1 "Produktdesign und Entwicklung für SaaS-Teams, zum Festpreis", Unterzeile nennt Gründer als Ansprechpartner und feste Summe vor Projektbeginn
- Primär-CTA "Scoping-Gespräch buchen" in Kopf, Held, Gründerkarte, Fragenkarte, Formular und Fuß
- Titel mit Keyword und Musterstadt, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Kosten Produktdesign, Zielgruppe, Kosten Website, Dauer, Web-Apps, Bestandsprodukt, Einstieg (Antworten als Beispiel)
- Formularziel: Scoping-Gespräch (Name, E-Mail, Telefon, Vorhaben, Idee), fünf Felder, Hinweise unter E-Mail und Telefon
- Preise, Stimmen und Zeichen als "Beispiel" gekennzeichnet
