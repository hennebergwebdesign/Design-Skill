# t80 Kreativagentur schwarz und Limette

Prinzip nach einem Pinterest Screenshot des Inhabers (Kreativagentur, fast schwarz mit Limettegrün, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Kreativagenturen, Designstudios, Brandingbüros und Beratungen mit gestalterischem Anspruch, die mit Kontrast, großer Schrift und Gesichtern auftreten. Lebt von echten Teamfotos und einem klaren Leistungsangebot. Ansprache im Sie. Vier Leistungen sind der Rahmen der Liste, mehr braucht ein zweites Raster.

## Sektionsfolge
Schwebende Kopfleiste als schwarze Kapsel (Menü links, Wortmarke mittig, Menü und Knopf rechts), Held auf weißer Fläche mit großem Radius an der Unterkante (zentrierte Überschrift, Person im Bogen, Zeichen links, Erfahrung rechts, zwei Knöpfe), Kennzahlenleiste in dunkler Kapsel, Meisterwerke (Überschrift, Text, zwei Schwarzweißfotos mit Etikett), Leistungen in dunkler Karte (Liste mit aktiver Zeile, Foto mit kreisendem Text, zwei Kacheln), großes Wortband mit Linie, Team (sechs weiße Karten), Stimmen als Wischspur, schräges Wortband, Fragen, Kontakt (Formular, Daten, Person im Bogen), limettegrüner Fuß mit Linkspalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Zeichen dreht langsam, Kreis hinter der Person driftet leicht, Inhalte blenden ein | CSS (`transform`), `data-parallax`, `data-zeig` |
| Kennzahlen | Zahlen zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Meisterwerke | Schwarzweißfotos färben sich beim Scrollen leicht auf (bis halbe Deckkraft), beim Überfahren und bei Fokus voll | `stil.js` (`--auf`), CSS (`opacity` eines Farbbildes darüber) |
| Leistungen | Zeile wählt Foto, aktive Zeile in Limette, Beschreibung nur bei der aktiven Zeile, Text kreist langsam auf einer Ellipse | `stil.js`, CSS (`opacity`, `transform`), SVG `textPath` |
| Wortbänder | zwei Bänder (groß und schräg) als Marquee aus echten Elementen, Pause Knopf je Band | CSS, `stil.js` |
| Team | Karten blenden gestaffelt ein | `data-staffel`, `data-zeig` |
| Stimmen | Wischspur mit Pfeilknöpfen, ohne JavaScript wischbar | `stil.js`, `scroll-snap` |
| Fragen | Akkordeon, ein Eintrag offen, Zeichen dreht beim Öffnen | `details` mit `data-exklusiv` |
| Seite | Einblenden, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung stehen Zeichen und Text still, die Bänder werden zu umbrechenden Reihen ohne Wiederholung (Pause Knopf entfällt), die Fotos färben sich nur beim Überfahren. Ohne JavaScript stehen die Bänder ebenfalls als Reihe, die Leistungsliste zeigt das erste Foto und alle Beschreibungen, die Kopfleiste scrollt mit dem Inhalt nicht mit (sie ist `fixed`).

## Tokens (marke.css)
`--flaeche` (fast Schwarz), `--flaeche-alt` (dunkle Karten), `--flaeche-karte`, `--flaeche-hell` (Weiß für Held, Teamkarten, schräges Band), `--flaeche-hell-alt`, `--text`, `--text-leise`, `--text-dunkel`, `--text-dunkel-leise`, `--linie`, `--akzent` (Limette), `--akzent-text` (Schwarz), `--schrift-titel` (Lexend), `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--radius-gross` (Held, große Karten), `--titel-gewicht`, `--titel-spur`.
Regel: Limette ist nie Textfarbe auf Weiß (Held, Teamkarten, schräges Band); dort stehen nur Zeichen in Limette, Text ist Schwarz. Auf Limette steht immer Schwarz.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Akzent wechseln: zuerst Kontrast `--akzent-text` auf `--akzent` und `--akzent` auf `--flaeche-alt` prüfen (aktuell 14,8 und 13,6 zu 1), bei einem dunklen Akzent auf Dunkel kippt die Lesbarkeit von Zahlen und Zeichen. Die Glühflecken in `stil.css` (`rgb(184 242 60 / .16)`) tragen die Akzentfarbe fest und müssen mitwechseln. Der Name "Markenname" steht in Titel, Logo und Fuß. Das Zeichen (Funke, zwölf Strahlen) ist ein eigenes SVG Symbol `i-funke`, ebenso in `favicon.svg`.

## Offen
Formulare senden nichts. Teamnamen, Rollen, Kennzahlen, Stimmen, Antworten und Adressen sind Beispiele, keine Belege (`data-beispiel`). Die Fotos sind Beispielfotos anderer Vorlagen. Der Held hat keinen Freisteller, die Person steht im Bogenrahmen. Zwei Wortbänder: `pruefe-geschmack.mjs` meldet es nicht, nach Kapitel 26 bleibt eines das Maß, bei Bedarf das schräge streichen. Kontrast der Limette Etiketten auf Fotos ist gemessen (Schwarz auf Limette), der Text auf der Ellipse hat eine dunkle Kontur und ist reine Dekoration (`aria-hidden`). Ellipsentext rotiert die ganze Ellipse, der Text läuft nicht entlang eines festen Pfades. Die Kopfleiste verdeckt beim Anspringen eines Ankers nichts (`scroll-margin-top` gesetzt). Nicht geprüft: Safari, Screenreader, echte Geräte, Leistung.

## Conversion (Playbook)
- Held: Unternehmen mit austauschbarem Auftritt, Problem Marke fällt nicht auf und die Website bringt keine Anfragen, Lösung Branding und Webdesign aus einer Hand
- H1 "Marken, die auffallen. Websites, die Anfragen bringen.", Unterzeile nennt Wiedererkennung, Webdesign, Branding und Deutschland
- Primär-CTA "Projekt anfragen" in Kopf, Held, Kachel und Formular
- Titel mit Keyword und Musterstadt, Beschreibung mit Nutzen und Aufruf
- FAQ: Kosten, Dauer, Texte und Bilder, Rechte, Betreuung (Antworten als Beispiel gekennzeichnet)
- Formularziel: Projektanfrage (Name, E-Mail, Telefon freiwillig, Projekt), vier Felder, Feldhinweise unter E-Mail und Telefon
- JSON-LD `ProfessionalService` mit Beispielwerten
- Kennzahlen und Erfahrung im Held als Beispiel gekennzeichnet
