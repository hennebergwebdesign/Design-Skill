# t105 Haushaltsbuch App Marine und Koralle

Prinzip nach der Startseite https://www.mojek.money/ (Finanz App für Privatpersonen, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, nur die Startseite). Aufbau, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Oberflächen, Icons, Marke, Code, Schrift und Farbe sind eigen (Marine, Koralle, Sonne, Himmel auf warmem Stein, Bricolage Grotesque und Instrument Sans statt Grün auf Lavendelgrau und Noto).

## Eignung
Finanz App, Haushaltsbuch, Konten Überblick, Budget oder Spar App für Privatpersonen, auch andere Apps mit vielen Oberflächen, die man zeigen statt erklären will. Ansprache im Du. Lebt von den HTML Oberflächen, nicht von Fotos. Abgesetzt von t44, t45, t49, t70 und t73 bis t74 durch hellen Stein statt Dunkel oder Blau, die Kachelwelle hinter dem Handy, zusammenfließende Karten und die Schrittgeschichte am Handy.

## Sektionsfolge
Schwebende weiße Kopfleiste mit App laden, Held (zentrierte H1, Handy aus HTML über Kachelwelle, drei Meldungskarten), Zusammenfluss (Satz mit Wortlicht, sechs Karten fliegen beim Scrollen heran), Alles an einem Ort (treibende Zeichen, Bento mit Buchungen, Kreditkarten, Sparzielen), Suche (Postenband in drei Reihen, funktionierendes Suchfeld mit Summe), Vermögen und Depot (Säulen und Aufteilung, Banner), Und noch mehr (Wischspur mit fünf Karten), Schrittgeschichte (sticky, Handy wechselt den Schirm), Sicherheit (dunkel, drei Karten), Stimmen (zwei gegenläufige Bänder), Fragen (sechs details), Schluss (Wortlicht, Formular mit drei Feldern), Fuß mit großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Kacheln klappen als Welle ein (Signaturbewegung), Satz und Knöpfe blenden gestaffelt ein, Meldungskarten treiben unterschiedlich schnell | CSS `animation` (transform, opacity), `data-zeig`, `data-parallax` |
| Zusammenfluss | Satz hellt Wort für Wort auf, sechs Karten wandern aus der Ferne an ihren Platz, drehen und blenden ein | `data-licht`, `data-fortschritt` setzt `--fortschritt`, CSS `transform`, `opacity`; nur Desktop mit Höhe ab 46 rem, sonst Raster |
| Ort | Zeichen treiben mit Parallaxe, Buchungen staffeln ein, Balken und Säulen wachsen beim Sichtbarwerden, Karten heben sich beim Überfahren | `data-parallax`, `data-staffel`, CSS (`scaleX`, `scaleY`) |
| Suche | Drei Reihen laufen gegenläufig, Pause per Schalter und beim Überfahren, Tippen lässt Treffer leuchten und zählt Beispielsummen | CSS (`transform`), `stil.js` |
| Und noch mehr | Wischspur mit Scroll Snap, Pfeile, ohne JavaScript wischbar | CSS, `stil.js` |
| Schritte | Sektion ist 300 vh hoch, Handy bleibt stehen, Schirm und Wort wechseln nach Scrollweg | `stil.js` setzt `data-schritt`, CSS (`opacity`, `transform`) |
| Stimmen | Zwei Bänder gegenläufig, Pause per Schalter und beim Überfahren, bei reduzierter Bewegung wischbar | CSS (`transform`) |
| Fuß | Wortmarke fährt ein | `stil.js`, CSS |

Bei reduzierter Bewegung und ohne JavaScript bleibt alles sichtbar: Kacheln stehen, Karten liegen im Raster, Bänder stehen (ohne Doppelung), Schritte zeigen Schirm 1 und alle drei Texte.

## Beobachtung der Referenz (was übernommen, was nicht)
Übernommen als Prinzip: zentrierter Held mit einem Handy über farbigen Kacheln, schwebende Meldungskarten, Satz mit Wortlicht und Karten, die zusammenfließen, treibende Zeichen über der Überschrift "alles an einem Ort", Bento aus Oberflächenkarten, Suchfeld mit Händlerband, Vermögen und Depot als Karten, Banner für Wunschfunktionen, Wischspur "und noch mehr", sticky Schrittgeschichte neben einem Handy, zwei Stimmenbänder, große Wortmarke im Fuß. Bewusst nicht: die Hand am Handy, echte Bank und Händlerlogos, Grün und Lavendel, farbiges Akzentwort in der H1 (Tell nach Kapitel 26), Sternebewertungen und Store Symbole, Chatassistent, das schwebende Video Fenster, Zahlen und Namen echter Nutzer.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent` (Marine, Fläche mit weißem Text), `--akzent-text`, `--koralle`, `--sonne`, `--himmel`, `--marine`, `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Instrument Sans), Radien.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (gerechnet): `--text` auf Stein 14,6 zu 1, auf Weiß 16,5; `--text-leise` auf Stein 6,9, auf Weiß 7,8, auf `--flaeche-alt` 6,2; Weiß auf Marine 13,5; `--text` auf Koralle 5,8, auf Sonne 10,6, auf Himmel 10,6; `--text-auf-dunkel` auf Dunkel 14,3; `--text-leise-dunkel` auf Dunkel 9,1 und auf Marine 7,6. Koralle ist nie Schriftfarbe auf Hell. Die Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt), ein anderer Name braucht einen neuen Wert für `.fuss__marke`. "Markenname" steht in Titel, Logo, Fuß, Wortmarke und JSON-LD.

## Offen
Formular sendet nichts. Beträge, Banknamen, Händler, Stimmen, Fragen und Antworten sind Beispiele, keine Belege. Die Sicherheitsaussagen (nur lesen, Zugriff bestätigen, Löschen) und Aussagen zu Konten, Depot und Datenschutz sind Beispieltexte, **nicht rechtlich geprüft** (Zahlungsdiensterecht und Kontozugriff, Datenschutz, Anlagehinweis). Kein Rendite oder Spar Versprechen, bei echten Produkten beibehalten. Text in den Oberflächen liegt teils unter 16 px (Illustration, per `role="img"` mit Beschreibung, nicht als Fließtext gedacht). Kontrast von Text über Kacheln wurde nicht nötig, das Handy deckt sie ab. Die Meldungskarten verdecken auf dem Handy einen Teil der Handyoberfläche. Safari, Screenreader und echte Geräte nicht geprüft. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen). Die Zusammenfluss Szene braucht auf Desktop mindestens 46 rem Fensterhöhe, darunter fällt sie auf das Raster zurück. `pruefe-motion` meldet Dauern über 300 ms an großen, nicht bedienten Flächen (bewusst, im CSS kommentiert).

## Conversion (Playbook)
- Held: Privatpersonen mit mehreren Konten, Karten und Sparzielen, Problem fehlender Überblick und übersehene Fristen, Lösung eine App mit allen Konten in einer Ansicht, automatisch sortiert, mit Erinnerungen
- H1 "Behalte dein Geld im Blick. Jeden Monat.", Unterzeile nennt Konten, Sortierung und Erinnerungen
- Primär-CTA "App laden" in Kopf, Held und Formular (Link per E-Mail, Gerät wählbar)
- Titel mit Keyword und Musterstadt, Beschreibung mit Nutzen und Aufruf
- FAQ: Kosten, Überweisen, Banken, Daten, Geräte, Löschen
- Formular: Vorname, E-Mail, Gerät, Hinweise unter E-Mail und Gerät
- Stimmen und Zahlen als Beispiel gekennzeichnet
