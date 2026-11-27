# t117 Studiobühne mit Fallstudienliste

Prinzip nach https://www.phunk.com/ (Startseite einer Webagentur, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Beispielbranche: kleines Webdesign Studio in Deutschland mit sechs Platzhalterprojekten, Marke "Markenname".

## Eignung
Agenturen, Designstudios, Berater und Dienstleister, die ihre Arbeit über Fallstudien verkaufen: viele Referenzen, zwei klar getrennte Leistungen, ein Ziel (Erstgespräch). Ansprache im Sie. Lebt von der dunklen Bühne und ruhigen Lichtverläufen an den Abschnittsgrenzen, nicht von Bewegung. Abgesetzt von t111 (Einzelprodukt, hell und dunkel im Wechsel, Scrollgeschichte): hier ein Studio, eine lange Liste, durchgehend dunkel.

## Sektionsfolge
Kopfzeile (Pille mit fünf Punkten, Telefon, Knopf); Held (zentrierte Überschrift, Lichtverlauf von oben, Raster am unteren Rand); Einwilligung (Panel mit vier Schaltern im ersten Bildschirm); Vorstellung (schwebende Figur, Text); Leistungen (zwei große Karten 01 und 02 mit gezeichneter Oberfläche oben); Werte (vier Karten als Karussell); Projekte (Fallstudienliste, sechs Zeilen: Vorschau links, rechts Tags, Titel, Kurztext, Link "Fallstudie ansehen"); Kundenlogos (acht Textplatzhalter); Stimmen (Karussell, vier Beispiele); Fragen (sechs Einwände); Abschluss (Karte mit Lichtverlauf von unten, vier Felder, Knopf); Fuß.

## Beobachtet an der Referenz (gemessen, 27.11.2026)
| Was | Wert |
|---|---|
| Grund, Textfarbe | rgb(3,3,3), Fließtext rgb(150,150,150) |
| H1 | 64 px Desktop, 38,1 px bei 390, Gewicht 500, Zeilenhöhe 80,6 px (Desktop) |
| H2 | 56 px Desktop, 38,1 px mobil, Gewicht 500 |
| Abschnitte (Höhe 1440) | Held 900, Vorstellung 631, Leistungen 1185, Werte 753, Projekte 4808, Logos 670, Stimmen 666, Abschluss 557, Fuß 417 |
| Seitenhöhe | 10612 px Desktop, 11461 px mobil, kein Überlauf (scrollWidth gleich Fensterbreite) |
| Pinnende Elemente | Desktop: Maske der Projektliste und Bilder (position sticky), mobil: ein Container der Projektliste |
| Navigation | schwebende Pille in der Mitte, Primärknopf rechts, Logo links |
| Einwilligungspanel | liegt fest am unteren Rand des ersten Bildschirms und verdeckt dort den Inhalt |
| Akzentwörter | in den Überschriften blau gefärbt (hier bewusst umgedreht, siehe unten) |

Nicht gemessen: Hover, Zeitverläufe und Dauer der Animationen, Verhalten bei Zwischenbreiten, das Maskottchen als Objekt (3D, bewusst nicht nachgebaut), Inhalt der Karussells nach dem Blättern.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Lichtverlauf wandert leicht gegen die Scrollrichtung, Text blendet ein | `data-parallax` und `data-zeig` aus `bewegung.js`, CSS (`transform`, `opacity`) |
| Kopf | Verlauf hinter der Kopfzeile erscheint nach dem Scrollen; Menü als Panel auf dem Handy; Abschnittsanzeige im Menü | `bewegung.js` (Klasse `gescrollt`, `data-menue`) |
| Einwilligung | Schalter: Knopf gleitet, Spur färbt sich um | CSS (`transform`), kurz (unter 300 ms) |
| Vorstellung | Figur schwebt 10 px auf und ab, die Linse wandert leicht (Signatur 1, nur Zierde) | CSS Keyframes (`transform`), stoppt bei reduzierter Bewegung |
| Leistungen, Logos | Karten und Felder staffeln ein, Karte hebt sich beim Überfahren | `data-staffel`, `data-zeig`, CSS |
| Werte, Stimmen | Karussell: Scroll Snap, Pfeile scrollen eine Kartenbreite | `stil.js`, native Scrollleiste bleibt |
| Projekte | Signatur 2: die Überschrift bleibt oben stehen, die Zeilen laufen darunter durch und blenden an ihrem Rand aus; Bild zoomt beim Überfahren, Pfeil im Link rückt | `position: sticky` (ab 56 rem), `data-zeig`, CSS (`transform`) |
| Fragen | Plus dreht zum Kreuz, ein Eintrag offen | `details` mit `data-exklusiv`, CSS |

Bei reduzierter Bewegung steht alles sichtbar, nichts schwebt, nichts zoomt. Ohne JavaScript stehen alle Inhalte, Karussells sind seitlich scrollbar (Pfeile fehlen), das Menü steht aufgeklappt in der Kopfzeile und scrollt mit, Panel und Formular sind sichtbar. Pinnend ist nur die Überschrift der Projektliste (sticky, ohne Scrollhöhe zu verlängern), Leistungsbudget unauffällig; auf schwachen Geräten ungemessen.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`, `--linie-hell`, `--licht`, `--licht-tief`, `--licht-hell`, `--schalter-aus`, `--schalter-an`, `--feld-rand`, `--hell`, `--text-auf-akzent`, `--weiss`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet, WCAG): `--text` auf `--flaeche` 18,7 zu 1, auf `--flaeche-alt` 16,9; `--text-leise` auf `--flaeche` 9,0, auf `--flaeche-alt` 8,1, auf dem hellsten Punkt des Heldverlaufs (Mischung 55 Prozent `--licht`) 4,6; `--akzent-text` auf `--akzent` 7,3; `--akzent` als Linie oder Fläche auf `--flaeche` 7,8; `--hell` mit `--akzent-text` 17,3; `--licht-hell` auf `--flaeche` 10,6; Schalter und Feldrand (`--schalter-aus`, `--feld-rand`) auf `--flaeche-alt` 4,1 (Bedienelement, Mindestwert 3 zu 1). `--licht` und `--licht-tief` sind nur Flächen für Verläufe, nie Textfarbe. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD.

Abgesetzt von der Referenz, bewusst: Überschriften sind einfarbig, der Akzent liegt auf Fläche und Linie (Knopf, Link Unterstrich, Tag Rand, Plus), nicht auf einzelnen Wörtern (Kapitel 26). Kein Violett: Lichtfarbe ist ein ruhiges Blau.

## Offen
Formulare und Einwilligungspanel senden und speichern nichts. Das Panel ist eine Demo der Gestaltung (nichts vorausgewählt, drei gleich gewichtete Knöpfe) und ersetzt kein Consent Werkzeug. Die Referenz legt ihr Panel fest über den Inhalt, hier steht es im Fluss unter dem Held, damit es nichts verdeckt. Die sechs Projekte, ihre Namen, Texte, Stimmen, Antworten und Fristen sind Beispiele, keine Belege. Die Projektvorschauen sind schematische SVG Platzhalter, keine Fotos (siehe `BILDER.md`). Die Kundenlogo Reihe besteht aus Textplatzhaltern und löst die Prüfwarnung "Logoleiste ohne Bild" aus: vor der Auslieferung freigegebene Logos einsetzen oder den Abschnitt streichen. Die Figur ist eine eigene einfache Zeichnung, kein Nachbau des 3D Maskottchens der Referenz. Die Links "Fallstudie ansehen" zeigen auf den Kontaktabschnitt, im Projekt auf Einzelseiten verlinken. Impressum und Datenschutz sind Ankerplätze. Die sticky Überschrift der Projektliste überdeckt beim Durchlaufen den oberen Rand der Zeilen (gewollt, mit Verlauf). Safari, Screenreader, echte Geräte und Zwischenbreiten nicht geprüft.

## Conversion (Playbook)
- Held: kleine Betriebe, Problem schöne Seite ohne Anfragen, Lösung Studio baut selbst, schnell, barrierearm und rechtlich sauber, Festpreis und fester Termin als Risikoumkehr
- H1 "Websites für kleine Betriebe, die Anfragen bringen"
- Primär-CTA "Erstgespräch anfragen" in Kopf, Held, Vorstellung, Leistungen, Projekte, Abschluss und Fuß, Telefon in Kopf, Held, Abschluss und Fuß
- Titel mit Leistung und Zielgruppe, Beschreibung mit Projekten, Festpreis und Antwortzeit
- FAQ: Preis, Dauer, Texte und Bilder, Datenschutz, spätere Änderungen, Betreuung
- Formularziel: Erstgespräch (Name, E-Mail, Telefon, Anliegen), vier Felder, Hinweise unter E-Mail und Telefon
- Zusagen, Stimmen und Antworten als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
Jeder Abschnitt ist ein eigenes Element mit `id` und `data-abschnitt`, mit eigenem CSS Präfix. Maschinenlesbar in `ABSCHNITTE.json`.

| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Menü in der Mitte, Primärknopf rechts bleiben erreichbar |
| held | hero | Zentrierte Aussage mit Zielgruppe, Problem, Lösung auf ruhiger Bühne |
| einwilligung | forms | Datenschutzwahl offen im ersten Bildschirm, nichts vorausgewählt, gleich gewichtete Knöpfe |
| intro | about | Eine kleine Figur gibt dem Studio ein Gesicht |
| leistungen | services | Zwei große nummerierte Karten mit gezeigter Oberfläche oben |
| werte | benefits | Vier gleiche Karten, Scroll Snap statt Auto Karussell |
| projekte | cases | Jede Zeile hat Bild, Tags, Titel, Kurztext und genau eine Handlung, Überschrift bleibt stehen |
| logos | trust | Ruhige Reihe gleich großer Felder ohne Behauptung |
| stimmen | testimonials | Kurze Zitate mit Person, seitlich blätterbar, als Beispiel markiert |
| faq | faq | Häufigste Einwände vor dem Gespräch, ein Eintrag offen |
| abschluss | cta | Lichtverlauf von unten schließt die Bühne, Karte bündelt Aussage, Felder, Knopf |
| fuss | footer | Kontakt, Seiten, Pflichtangaben an einer Stelle |
