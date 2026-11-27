# t125 Frischfutter Abo mit schrumpfendem Heldrahmen

Prinzip nach https://www.voldogfood.com/ (griechischer Onlineshop für Frischfutter nach dem BARF Prinzip für Hunde und Katzen, Startseite, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, Seitenhöhe 11236 und 8754 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Die Seite ist griechisch, gelesen wurde die Struktur, nicht der Text.

## Eignung
Onlineshop mit Abo für verderbliche Ware in kleinen Chargen: Frischfutter und Leckerli für Tiere, Feinkost, Menükisten, Metzgerei und Hofladen mit Versand. Ansprache im Du. Lebt von einer klaren Reihenfolge Aussage, Finder, Sortiment, Ablauf, Beleg, Einwand, Probierpaket. Abgesetzt von t90 (Leuchtenshop): hier Lebensmittelnähe, Rezepte statt Modelle, ein Abo als Bestellweg.

## Kernprinzipien der Referenz (selbst herausgearbeitet)
| Prinzip | Beobachtet oder abgeleitet | In t125 |
|---|---|---|
| Heldrahmen: abgerundete Fläche (Rand 35 px, Radius 88 px innen, 120 px außen), riesige Wortmarke, freigestelltes Tier überlappt die Buchstaben, Hauptaktion als weiße Pille mit Pfeilkreis unten links, Tierwahl unten rechts | beobachtet (Aufnahme, berechnete Werte) | `.held` mit Wortmarke, gezeichnetem Hund, Pille |
| Der Rahmen schrumpft beim Scrollen, die Wortmarke geht in das Logo der Kopfzeile über, der Kopf wird von durchsichtig auf weiß | beobachtet: äußeres Modul 1440 px bei Scroll 0, 1389 bei 400, 1183 bei 600, 1080 bei 800, Kopf 140 px hoch, danach 110 px, `position: fixed` | `--schrumpf` aus `stil.js`, Skalierung auf 78 Prozent, Logo blendet ein |
| Finder statt Katalog: vier Auswahlfelder (Alter in Monaten, Gewicht, Aktivität, kastriert) und ein Knopf, direkt unter dem Held | beobachtet | `.finder`, vier Felder, Beispielvorschlag |
| Einheitliche Produktkarten: graue Karte (Radius 30 px, 398 mal 450 px, drei Spalten bei 1440, eine bei 390), Packung freigestellt, Name, Preisspanne, auf dem Handy Größen als Chips | beobachtet; Hover und Warenkorbweg unbekannt | `.karte`, Chips, Preis, Knopf |
| Eine Farbe je Sorte auf der Packung, gleiche Packungsform | beobachtet | Token `--sorte-*`, ein Symbol `#i-beutel` |
| Zwei Sortimente: Hauptfutter im Raster, Leckerli im Querlauf mit Pfeil | beobachtet | `.sortiment` und `.extras` |
| Nutzen als Napf von oben mit vier schwebenden Karten, Zutaten und gelber Bogen als Dekor | beobachtet | `.warum`, Inhalte ohne Gesundheitsaussagen |
| Gewölbte Abschnittskanten und Wechsel zwischen Weiß und warmem Creme (Fläche 244, 241, 235) | beobachtet; Umsetzung der Wölbung abgeleitet, die Abschnitte haben Radius 0 | Klasse `bogen` mit Ellipse in Abschnittsfarbe |
| Laufendes Band (geschwungen, Text mit Sternen) als Trenner vor den Stimmen | beobachtet; Lauf und Tempo unbekannt | `.schleife` als schräges gerades Band |
| Beleg: Bewertungskarten mit Sternen und Gesamtnote, FAQ zweispaltig mit Plus (links Überschrift, Text, Knopf, rechts Liste), Ende mit Bild und Hauptaktion, dunkler Fuß mit vier Spalten, Öffnungszeiten, Zahlungsarten, Förderhinweis | beobachtet | `.stimmen`, `.faq`, `.starter`, `.fuss` ohne Sterne und Förderhinweis |
| Bestellweg: Shop mit Konto, Suche, Warenkorb, Hauptaktion "Shop online" in der Kopfzeile; ein Abo ist auf der Startseite nicht erklärt | abgeleitet aus dem Sichtbaren | t125 ergänzt einen Ablauf in drei Schritten für das Abo (Abweichung) |

## Sektionsfolge
Kopfzeile (durchsichtig über dem Rahmen, Menü, Telefon, Knopf "Probierpaket bestellen"); Held (Rahmen mit Wortmarke, Hund, Aussage, Pille, Chip mit Telefon); Finder (vier Angaben); Sortiment (Filter, sechs Karten); Ablauf (drei Schritte); Warum frisch (Napf mit vier Zusagen); Extras (Leckerli im Querlauf); Schleife (laufendes Band); Stimmen (drei Beispielstimmen); Fragen (sechs Einwände); Starter (dunkle Fläche mit Packungen, Hauptaktion); Kontakt (Rückruf Formular); Fuß.

## Gemessen an der Referenz (Zahlen)
- Seitenhöhe 11236 px bei 1440, 8754 px bei 390. Schrift der Referenz: eine proprietäre Variable Grotesk, Gewicht 500; h2 36,4 px bei 1440 und 23 px bei 390, Fließtext 20,6 px mit Zeilenhöhe 33 px bei 1440, 15 px mit 24 px bei 390. Textfarbe dunkles Grün (32, 78, 74), Akzent ein gelbliches Limettengrün. Alles davon ist nicht übernommen.
- Abschnittshöhen bei 1440 (Raster mit eigenen Zwischenstücken von 400 px): Held 900, Finder etwa 400, Produktraster 1890, Umlauf mit Zusagen 1546, Leckerli 1074, Stimmen, FAQ und Bildabschluss zusammen 2104, Fuß 1473.
- Kopfzeile fest (`position: fixed`), 140 px am Seitenanfang, 110 px danach, Menü links, Logo mittig, Suche, Konto, Warenkorb und Knopf rechts; auf dem Handy Burger, Logo, Konto, Warenkorb.
- Sieben aufklappbare Fragen im Quelltext, sechs sichtbar in der Aufnahme.

## Nicht erfassbar (unbekannt)
Hover und Fokus der Referenz, Dauer und Kurve der Übergänge, Tempo des Bandes, Verhalten bei 768 bis 1100 Pixel, Warenkorb, Konto und Zahlungsweg, Auswahl des Finders und seine Ergebnisseite, Verhalten des Querlaufs der Leckerli, der Tierschalter Hund und Katze und sein Ziel, Ladeanimation (ein Ladeelement ist im Quelltext, nicht gesehen).

## Abweichungen vom Prinzip
Kein Schalter Hund und Katze (nur Hund). Kein Bewertungswidget mit Sternen und Gesamtnote (erfundene Bewertungsleisten sind ausgeschlossen), stattdessen drei Beispielstimmen ohne Note. Kein Förderhinweis, keine Zahlungslogos (Text). Das Band ist gerade und schräg, die Referenz hat ein geschwungenes Band. Der Bildabschluss der Referenz (Foto, eigene Rezeptur zusammenstellen) ist ein Probierpaket mit gezeichneten Packungen. Ein Ablauf in drei Schritten ist neu. Die Wortmarke "Markenname" hat zehn statt sechs Buchstaben und steht deshalb kleiner im Rahmen.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Signatur 1: Der Rahmen schrumpft über den ersten Scrollweg auf 78 Prozent, die Kopfzeile wird hell, das Logo blendet ein | `stil.js` (`--schrumpf`), CSS (`transform`, `opacity`), Klasse `gescrollt` aus `bewegung.js` |
| Sortiment | Karten staffeln ein, beim Überfahren hebt sich die Karte und die Packung kippt leicht; Filter blendet Karten aus | `data-staffel`, `stil.js`, CSS (`transform`), nur bei `hover: hover` |
| Finder | Der Vorschlag hebt die passende Karte hervor und scrollt sie in die Mitte | `stil.js` |
| Warum frisch | Napf, Erbsen, Scheibe und Bogen verschieben sich leicht gegeneinander, Zusagen staffeln ein | `data-parallax`, `data-staffel` |
| Extras | Querlauf mit Einrasten, Pfeile schieben um eine Karte | CSS `scroll-snap`, `stil.js` |
| Schleife | Signatur 2: schräges Band läuft endlos, hält beim Überfahren an | `.band` aus `basis.css` |
| Fragen | Akkordeon, ein Eintrag offen, Plus dreht zum Kreuz | `details` mit `data-exklusiv`, CSS |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Nichts pinnt, nichts springt im Layout, nur `transform` und `opacity`. Bei reduzierter Bewegung bleibt der Rahmen voll groß, Band und Einblenden stehen still und alles ist sichtbar. Ohne JavaScript steht der Kopf hell mit offenem Menü, alle Karten, Fragen und Zusagen sind sichtbar, der Finder zeigt kein Ergebnis.

## Tokens (marke.css)
`--flaeche` (Hafer), `--flaeche-alt`, `--flaeche-dunkel` (Petrol), `--text`, `--text-leise`, `--linie`, `--akzent` (Senf, Fläche mit dunklem Text), `--akzent-text`, `--akzent-tief`, `--rahmen` (Ziegel, Heldrahmen), `--text-auf-rahmen`, `--karte`, `--preis`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--weiss`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Hanken Grotesk), `--schrift-marke` (Archivo), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--radius-rahmen`, `--titel-gewicht`, `--titel-spur`, Packungsfarben `--sorte-huhn`, `--sorte-gemuese`, `--sorte-kartoffel`, `--sorte-rind`, `--sorte-lamm`, `--sorte-pute`, `--kraft`, Zeichnung Hund `--hund-*`, Zeichnung Napf `--zutat-*`, `--napf-rand`, `--napf-innen`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet): `--text` auf `--flaeche` 12,7 zu 1, auf `--flaeche-alt` 11,3, auf `--karte` 11,2, auf Weiß 13,7; `--text-leise` auf `--flaeche` 6,1, auf `--flaeche-alt` 5,4, auf `--karte` 5,3, auf Weiß 6,6; `--akzent-text` auf `--akzent` 8,1, auf `--akzent-tief` 6,3; `--text-auf-rahmen` auf `--rahmen` 4,9 (Held, Wortmarke und H1 sind groß, der Fließtext im Held ebenfalls über 4,5); `--text-auf-dunkel` auf Petrol 11,3; `--text-leise-dunkel` auf Petrol 7,1; `--preis` auf `--karte` 5,3; `--akzent` auf Petrol 6,5 (Pfeilkreise, Band, Hervorhebung). Rand der Eingabefelder 4,2 zu 1 auf `--flaeche` und 4,5 auf Weiß (Bedienelement, Mindestwert 3 zu 1). Der Senfknopf liegt mit 2,8 zu 1 gegen den Ziegelrahmen und hat deshalb im Held eine helle Pille mit Senf nur im Pfeilkreis. Packungsfarben und Zutatenfarben sind Zeichnung, nie Textfarbe. Der Name "Markenname" steht in Titel, Logo, Wortmarke, Fuß und JSON-LD. Hund, Napf, Beutel und Tüte sind SVG, für ein anderes Produkt durch dessen Zeichnung oder Foto ersetzen.

## Offen
Formulare und Finder senden nichts. Preise, Größen, Rezepte, Lieferzeit, Öffnungszeiten, Stimmen, Name und Fragen samt Antworten sind Beispiele, keine Belege. Kein Foto: Hund, Napf und Packungen sind eigene Zeichnungen (siehe `BILDER.md`), im Projekt durch Fotos zu ersetzen, der Hund am besten freigestellt, damit er die Wortmarke überlappt.
Rechtlich ungeprüft, vor der Auslieferung zu klären: Futtermittelrecht und Kennzeichnung (Einstufung als Alleinfuttermittel oder Ergänzungsfuttermittel, Zusammensetzung, analytische Bestandteile, Chargenangabe, Herstellerangabe, Zusatzstoffe), Hygiene und Registrierung beim Umgang mit rohem Fleisch und tierischen Nebenprodukten, Hinweise zur Lagerung und Kühlkette, Herkunftsangabe "Region" (Irreführung), Grundpreis je Kilogramm (Preisangabenverordnung), Widerruf bei verderblichen Waren, Abo Bedingungen und Kündigungsbutton, Preise und Versandkosten, Datenschutz und Einwilligung zum Rückruf. Gesundheits und Heilversprechen für Tiere sind bewusst nicht enthalten (kein Fell, keine Abwehrkräfte, keine Verdauung, keine Studien); die Beispielstimmen und der Finder sagen nichts über Gesundheit und der Finder ist keine Fütterungsberatung. Chromium geprüft, Safari, Firefox, Screenreader und echte Geräte nicht. Leistung auf schwachen Geräten ungemessen (die Schrumpfung schreibt bei jedem Scroll eine Variable und skaliert eine Fläche von etwa einem Bildschirm).

## Conversion (Playbook)
- Held: Hundehalter, Problem Futter schleppen und Zutatenlisten rätseln, Lösung gekühlt geliefertes Frischfutter aus der Region mit offener Deklaration im Abo, Risiko weg durch Pause jederzeit
- H1 "Frisches Hundefutter vom Metzger deiner Region, gekühlt bis an die Haustür", Unterzeile nennt den Rhythmus und die Pause
- Primär CTA "Probierpaket bestellen" in Kopf, Held, Sortiment, Stimmen, Starter und Fuß; Hilfs CTAs "Vorschlag ansehen", "Frage stellen", "Mehr zur Herstellung"
- Titel mit Produkt und Nutzen, Beschreibung mit Kühlung, Rhythmus und Probierpaket
- FAQ: Abo, Lagerung, Hygiene bei rohem Fleisch, Menge, Versand, Probieren
- Formularziel: Rückruf (Name, E-Mail, Telefon, Gewicht des Hundes, Frage), fünf Felder, Hinweise unter E-Mail und Telefon
- Stimmen und Zusagen als "Beispiel" gekennzeichnet

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Die Kopfzeile ist am Seitenanfang durchsichtig über der Heldfläche und wird nach dem Scrollen hell, so bleibt die Hauptaktion immer erreichbar |
| held | hero | Eine abgerundete Fläche mit riesiger Wortmarke, überlappender Figur und einer Hauptaktion macht Marke und Angebot in einem Bildschirm greifbar, das Schrumpfen leitet ins Scrollen über |
| finder | interactive | Wenige Auswahlfelder in einer Leiste führen vom Sortiment zu einem konkreten Vorschlag |
| sortiment | ecommerce | Gleich gebaute Karten mit Packung, Größen, Preis und Aktion machen den Vergleich leicht, der Filter verkürzt die Liste ohne Seitenwechsel |
| ablauf | process | Drei nummerierte Schritte nehmen die Angst vor dem Abo, indem sie die Kleinheit des ersten Schritts und den leichten Ausstieg zeigen |
| warum | features | Ein großes Bild des Produkts, um das vier kurze Zusagen schweben, verbindet Nutzen und Beleg an einer Stelle |
| extras | product | Ein seitlich scrollbares Band zeigt Zusatzprodukte, ohne die Seite zu verlängern |
| schleife | editorial | Ein schräges laufendes Band wiederholt die Kernaussagen als Trenner ohne Platz für Text |
| stimmen | testimonials | Kurze Zitate mit unspektakulären Details wirken glaubwürdiger als Superlative |
| faq | faq | Sechs Einwände mit kurzer Antwort nehmen Zweifel vor der Bestellung, ohne die Seite zu verlängern |
| starter | cta | Eine dunkle gewölbte Fläche mit klarer Hauptaktion und kleinem Einstieg setzt am Ende einen Kontrast |
| kontakt | forms | Ein kurzes Formular mit fünf Feldern und sichtbarer Telefonnummer bietet einen zweiten Weg für Menschen, die vor dem Kauf sprechen wollen |
| fuss | footer | Ein vollständiger Fuß mit Kontakt, Wegweisern, Zeiten und Rechtslinks fängt alle ab, die unten Vertrauen und Hilfe suchen |
