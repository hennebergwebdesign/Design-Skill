# t123 Eisdiele in Vollfarbflächen

Prinzip nach https://ringpopcandy.com/ (Startseite einer Süßwarenmarke, eigene Aufnahme mit Playwright am 27.11.2026 bei 1440 und 390 Pixel), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Die Beispielbranche ist eine Eismanufaktur in Deutschland.

## Eignung
Marken mit mehreren Sortengruppen, die jede ihren eigenen Auftritt tragen können: Eisdiele, Bonbonmanufaktur, Süßwaren, Getränke, Festival Merchandise. Die Seite ist laut, bunt und kurz im Text, geeignet für Familien, Feiern und Jugendliche. Ansprache im Sie. Nicht geeignet, wo Ruhe, Seriosität oder dichte Produktdaten gefragt sind. Die Farbe trägt die Gliederung: wer an der Farbe erkennt, wo er ist, braucht keine Zwischenüberschriften.

## Was an der Referenz beobachtet wurde, was abgeleitet, was unbekannt ist
| Art | Befund |
|---|---|
| beobachtet | Seitenhöhe 12177 px bei 1440. Versal gesetzte Überschriften: H1 250 px Desktop und 100 px mobil, Held 120 und 55 px, Kollektionstitel 250 px Desktop und 75 bis 100 px mobil, Anlassüberschrift 102 und 64 px, Newsletter 120 und 64 px. Drei Laufbänder in Rosa, Grün und Gelb, um etwa 2,5 Grad gedreht (Matrix 0,999 und 0,0436), Bewegung per `transform: translateX` über ein Karussellskript. Fünf Kollektionsflächen (Rot, Rosa auf Creme, Blau, Grün, Orange) mit Versalientitel, Produktbild und Knopf in Kontrastfarbe, vier davon in Pin Containern gemessen, Höhe 900 bis 1008 px bei Viewport 900. Danach Inspirationsband mit Hochformatkacheln und Pfeilen, gelbe Fläche mit Produktmuster und Aufklebern, Newsletter auf Creme, grüne Abschlussfläche, blauer Fuß mit drei Linkspalten. Auf 390 Pixel bricht der Titel "Wedding" Buchstabe für Buchstabe um (Schwäche, hier nicht übernommen). Kein horizontaler Überlauf bei 1440 und 390. |
| abgeleitet | Die Kollektionen schieben sich beim Scrollen übereinander (Pin Container, Klasse für gestapelte Abschnitte). Die Farben der Referenz sind sehr grell, Titel in Limette auf Grün und Gelb auf Rot sind zum Teil kontrastarm. Das Laufband läuft ohne Rücksicht auf Nutzerwünsche, ob eine Pause besteht, ist nicht erfasst. |
| unbekannt | Hover Zustände, Geschwindigkeit der Laufbänder, Autoplay des Karussells, Easing der Stapelbewegung, Verhalten bei Zwischenbreiten, Verhalten bei reduzierter Bewegung. |

## Sektionsfolge
Feste Kopfleiste (Creme, Schokokante) mit Menü, Telefon und Knopf "Eis vorbestellen"; Held auf Rosa (Versalien links, gezeichnete Eisgruppe rechts); Papierkarte auf Bildkarte (Torte, Karte schräg mit Innenrahmen); Anlässe (drei schräge Laufbänder, Pause); fünf Sortengruppen als ganze Farbflächen (Beere, Vanille, Sorbet, Pistazie, Saison), auf großen Bildschirmen übereinander schiebend; Eis im Alltag (Hochformatband mit Pfeilen); Muster mit drei Aufklebern auf Gelb; Fragen (sechs Einwände); Vorbestellung auf Rosa (fünf Felder); Newsletter auf Creme; Abschlussfläche in Grün; Fuß in Blau.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Anlässe | Signatur 1: Drei Bänder laufen langsam gegeneinander (46, 54 und 60 s je Durchlauf, mittleres Band gegenläufig), schräg gesetzt. Pause per Knopf, beim Überfahren, bei reduzierter Bewegung und ohne JavaScript steht alles still, die Wörter umbrechen dann und sind vollständig lesbar | `stil.js` (Knopf), CSS (`transform`, `animation-play-state`) |
| Sortengruppen | Signatur 2: Jede Fläche bleibt stehen, die nächste schiebt sich darüber. Nur bei Breite ab 56 rem, Höhe ab 48 rem und ohne reduzierte Bewegung, sonst normaler Fluss | CSS `position: sticky`, kein JavaScript |
| Held, Sorten, Papierkarte | Leichte Parallaxe der Zeichnungen (0,04 bis 0,05) | `data-parallax` |
| Fragen, Überschriften | Einblenden beim Scrollen | `data-zeig`, `data-staffel` |
| Inspiration | Pfeile scrollen um eine Kachel, einrastend | `stil.js`, `scroll-snap` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Das Übereinanderschieben ist kein JavaScript und kostet daher auf schwachen Geräten wenig (Browser kompositiert Sticky selbst), ist aber auf echten Geräten ungemessen. Pro Abschnitt gilt: Inhalt plus Abstand muss in `100svh` passen, sonst würde der untere Teil verdeckt. Gemessen: bei 1440 mal 900, 1280 mal 800, 1920 mal 1080 und 1024 mal 768 liegt der Inhalt jeder Fläche unter der Viewporthöhe (697 bis 867 px bei 768 bis 1080 px Viewporthöhe). Der Riesentitel richtet sich nach der Breite des Behälters (`cqw`) und nach der Buchstabenzahl `--n`, begrenzt auf 14 rem und 26 svh, sodass er auf 390 Pixel nicht umbricht.

## Tokens (marke.css)
Flächen: `--beere`, `--blau`, `--gruen`, `--mango`, `--creme` (Grundfläche, auch `--flaeche`), dazu `--rosa` (Held, Karte, Bestellung), `--zitrone` (Muster), `--pistazie`, `--rosa-tief`, `--schoko` (Text, Kanten, Knopf). Rollen: `--text`, `--text-leise`, `--akzent` (Beere), `--akzent-text`, `--feld-rand`. Schriften `--schrift-titel` (Archivo, Gewicht 900, Versalien), `--schrift-text` (Hanken Grotesk). Form: `--radius-knopf`, `--radius-karte`, `--radius-bild`. Zusatz: `--titel-gewicht`, `--titel-spur`, `--titel-zeile`, `--schwung` (Neigung der Bänder), `--papier-linie`, `--schatten-karte`, und die Eisfarben der Zeichnungen (`--waffel`, `--eis-*`, nie Textfarbe). Pro Sortengruppe stehen im Modifier `--s-grund`, `--s-titel`, `--s-text`, `--s-knopf`, `--s-knopf-text`.

## Marke wechseln
Nur `marke.css` ändern. Die Palette besteht aus fünf kräftigen Vollflächen (Beere, Blau, Grün, Mango, Creme) mit je einer Gegenfarbe für den Titel; mehr als fünf Gruppen brauchen eine sechste Fläche mit eigenem Paar, das vor dem Eintragen gerechnet wird. Kontrast (selbst gerechnet, WCAG):

| Paar | Verhältnis | Verwendung |
|---|---|---|
| Zitrone auf Beere | 4,8 zu 1 | Riesentitel, Knopf gegen Fläche (Bedienelement ab 3) |
| Creme auf Beere | 6,2 zu 1 | Text auf Beere |
| Zitrone auf Blau | 6,8 zu 1 | Riesentitel, Fußüberschriften |
| Creme auf Blau | 8,8 zu 1 | Text auf Blau, Fuß |
| Pistazie auf Grün | 6,5 zu 1 | Riesentitel, Knopf gegen Fläche |
| Creme auf Grün | 7,5 zu 1 | Text auf Grün |
| Schoko auf Mango | 7,0 zu 1 | Riesentitel, Text, Knopf gegen Fläche |
| Rosa Tief auf Creme | 5,3 zu 1 | Riesentitel Vanille |
| Beere (Knopf) auf Creme | 6,2 zu 1 | Hauptknopf, Cremetext darauf 6,2 |
| Schoko auf Creme | 15,5 zu 1 | Fließtext |
| Text leise auf Creme | 8,6 zu 1 | Nebentext; auf Rosa 5,1, auf Weiß 9,5 |
| Schoko auf Rosa | 9,2 zu 1 | Held, Bestellung |
| Schoko auf Zitrone | 12,0 zu 1 | Band Gelb, Knopf auf dem Muster |
| Grün auf Pistazie | 6,5 zu 1 | Band Grün |
| Beere auf Rosa | 3,7 zu 1 | Aufkleber, nur große Schrift (ab 3) |
| Zitrone auf Blau | 6,8 zu 1 | Aufkleber Blau |
| Feldrand auf Weiß | 4,9 zu 1 | Eingabefelder (Bedienelement ab 3) |

Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Die Zeichnungen sind SVG (`p-waffel`, `p-stiel`, `p-becher`, `p-torte`), für andere Produkte (Bonbon, Flasche, Shirt) die Symbole im Block am Seitenanfang ersetzen und die `<use>` Stellen beibehalten.

## Offen
Formulare senden nichts, auch das Newsletter Formular nicht. Preise, Fristen, Zeiten, Sorten, Fragen und Antworten sind Beispiele, keine Belege. Allergenkennzeichnung, Preisangaben, Impressum und Datenschutz sind rechtlich nicht geprüft und je Betrieb zu ergänzen. Die Produkte sind eigene Zeichnungen statt Fotos (siehe `BILDER.md`), im Projekt durch Fotos ersetzen. Die Referenz hat ein Titelkarussell im Held, ein Cookie Banner und Social Symbole, nicht nachgebaut. Die Pausenwahl der Bänder wird nicht gespeichert. Die Stapelbewegung ist nur bei großen Bildschirmen aktiv, auf Handy und Tablet ist es ein normaler Fluss. Leistung des Stapelns auf schwachen Geräten, Safari, Screenreader und echte Geräte nicht geprüft. Die Laufbänder bewegen sich ohne Zutun, solange sie nicht angehalten werden; die Geschwindigkeit ist Gestaltung und nicht an Nutzerstudien geprüft.

## Conversion (Playbook)
- Held: Familien und Vereine in Musterstadt, Problem kein Dessert für die Feier oder Stress damit, Lösung Eistorten, Partyeis und Becher aus der Manufaktur, mit Vorbestellung bis zum Vortag und Abholung oder Lieferung als Risikoumkehr
- H1 "Eis für jeden Anlass", Unterzeile nennt Torten, Partyeis und Becher, Beleg als Beispiel gekennzeichnet
- Primär-CTA "Eis vorbestellen" in Kopf, Held, Papierkarte, Inspiration, Muster, Vorbestellung und Abschluss, dazu Sortenknöpfe je Fläche
- Titel mit Angebot und Ort (höchstens 60 Zeichen, geprüft), Beschreibung mit Angebot, Ort und Aktion
- FAQ: Vorlauf, Haltbarkeit, Allergene, Beschriftung, Lieferung, Menge (sechs `details`, Antworten als Beispiel)
- Formularziel: Vorbestellung mit Name, E-Mail, Telefon, Wunschtermin, Anlass und Menge, fünf Felder, Hinweise unter E-Mail und Telefon
- Telefon sichtbar in Kopf (ab 1280), Held, Vorbestellung, Abschluss und Fuß

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Die Kopfzeile hält Orientierung, Telefon und die Hauptaktion in jedem Bildschirm erreichbar. |
| held | hero | Versalien in Riesengröße auf einer Vollfläche und eine gezeichnete Eisgruppe sagen in einem Blick, worum es geht. |
| karte | product | Eine schräg gelegte Papierkarte mit Innenrahmen auf einer Bildfläche macht aus einem Angebot ein Geschenk und trägt die Aktion. |
| anlaesse | services | Eine Liste als Typografie auf schräg gesetzten Farbbändern zeigt die Breite des Angebots in Sekunden, die Pause macht sie zugänglich. |
| sorte-beere, sorte-vanille, sorte-sorbet, sorte-pistazie, sorte-saison | product | Eine ganze Farbfläche mit Riesentitel, einem Produkt und einer Aktion macht jede Gruppe zu einem eigenen Ort, die Farbe trägt die Gliederung. Zum Stapeln liegen sie direkt im Behälter `.sorten`. |
| inspiration | portfolio | Ein seitlich scrollendes Band aus Hochformatkacheln mit Bildunterschrift zeigt das Produkt im Gebrauch und lädt zum Weiterschauen ein. |
| muster | cta | Ein Produktmuster als Tapete mit drei schräg aufgeklebten Aussagen macht den Abschluss spielerisch und führt zur Aktion. |
| fragen | faq | Einwände stehen als aufklappbare Fragen vor dem Formular, jede Antwort ist kurz und als Beispiel markiert. |
| bestellen | forms | Ein kurzes Formular mit Ablauf in drei Schritten und Telefon als Alternative senkt die Hürde zur Anfrage. |
| newsletter | forms | Ein einziges Feld und ein klarer Nutzen halten die Anmeldung leicht. |
| abschluss | cta | Eine letzte ganze Farbfläche mit Adresse, Zeiten, Aktion und Telefon fängt alle ab, die unten angekommen sind. |
| fuss | footer | Ein Fuß mit Linkspalten und dem Markennamen in groß schließt die Seite ab. |
