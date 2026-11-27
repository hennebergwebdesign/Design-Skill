# t122 Fahrzeugwahl mit Technikbühne

Prinzip nach https://second-ride.de/en/fahrzeuge (Fahrzeugseite eines Umbauers von E-Mopeds, englisch, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel am 27.11.2026), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen, die Beispielbranche (Umbau und Verkauf von Elektrorollern, Lastenrädern und Stadträdern in Musterstadt) ist erfunden.

## Eignung
Hersteller, Umbauer und Händler mit wenigen, erklärungsbedürftigen Fahrzeugen oder Geräten, bei denen der Kunde eine Variante wählt (Modell, Akku, Farbe) und vor dem Kauf Vertrauen braucht: E-Roller, E-Bikes, Lastenräder, Kleinfahrzeuge, auch Geräte mit Wechselakku. Die Seite führt vom bewegten Bild über die Wahl zur Probefahrt. Ansprache im Sie. Lebt von Freistellern und wenigen starken Zahlen, nicht von langen Texten.

## Sektionsfolge
Schwebende Kopfzeile als Pille (Menü, Telefon, Knopf "Probefahrt buchen"); Held mit gezeichneter Straßenszene (Fahrer auf dem Roller, Streifen als Geschwindigkeit); Partnerleiste mit Beispiellogos; Fahrzeugwahl (Freisteller, Umschalter, Akkuregler mit Reichweite, Farbwahl); Aussage mit Bild; Kartenband (fünf Hochformatkarten, die Mittelkarte gerahmt und größer); Beschreibung mit zwei Kennzahlen mit Symbol; zwei große Bildkarten mit Text auf dem Bild; Technikbühne dunkel (Kennzahl links, Tachoring mit Zählwerk um den Akku in der Mitte, Kennzahl rechts, Technische Daten als Akkordeon); Stimmen (drei Karten mit Bild, mittlere höher); FAQ als Akkordeon mit Symbol je Frage; Probefahrt (Telefon, Zusagen, Ort); Newsletter Karte (Formular links, Bild rechts); Fuß mit Linkspalten.

## Aufnahme der Referenz
**Beobachtet** (Playwright, 1440 und 390): Seitenhöhe 11812 und 11453 px, 14 Abschnitte (Held 900 px, Fahrzeugwahl, Aussage, Kartenband 1000 px, Beschreibung, zwei Bildkarten 900 px, Technikbühne 900 px, Stimmen 906 px, FAQ 1830 px, Newsletter 1206 px, Fuß 530 px). Kopfzeile fix, abgerundet, 8 bis 16 px vom Rand, halbtransparent, Höhe 76 px. Held genau 100svh. Überschriften 48 px (H1) und 40 px (H2) bei 1440, 36 und 30 px bei 390, Gewicht 700, Knöpfe 62 px hoch mit Radius 18 px, einem Pfeilfeld im Knopf. Kein pinnender Bereich im Inhalt (nur Kopfzeile und Einwilligungskarte sind fix), die Technikbühne pinnt also nicht, der Zähler zeigt beim ersten Blick "0". Raster der Bildkarten 792 zu 528 px. Fuß schwarz.
**Abgeleitet:** Der Zähler und das Kartenband laufen scrollgesteuert beziehungsweise per Wischen, die Mittelkarte ist hervorgehoben, weil sie in der Mitte liegt. Die Fahrzeugwahl wechselt Fahrzeug und Reichweite über Umschalter und Regler.
**Unbekannt:** Hover, Autoplay oder Ziehen im Band, genaue Auslöser und Dauer des Zählers, Verhalten bei Zwischenbreiten, Inhalt hinter "Konfigurieren".

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Geschwindigkeitsstreifen ziehen in Schleife über die Szene, fünf Streifen mit eigener Dauer (Token `--dauer-streifen`) | CSS (`transform`, `opacity`), bei reduzierter Bewegung aus |
| Fahrzeugwahl | Signatur 1: Umschalter, Regler und Farbwahl stellen Fahrzeug, Reichweite, Balken und Farbe um, das Fahrzeug fährt von rechts ein, die Balkenfelder blenden ein | `stil.js` Block 1, CSS (`transform`, `opacity`) |
| Aussage, Bildkarten, Stimmen | Elemente blenden beim Sichtbarwerden ein | `data-zeig` aus `bewegung.js` |
| Kartenband | Signatur 2: Die Karte in der Mitte wird größer und bekommt den Rahmen, beim Wischen, Pfeilklick oder Tastendruck wandert er mit | `stil.js` Block 2, CSS (`transform`, `opacity` am Rahmen) |
| Beschreibung | Freisteller steigt leicht gegen die Scrollrichtung, drei Punkte pulsen | `data-parallax`, CSS (`transform`, `opacity`) |
| Technikbühne | Signatur 3: Tachozahl, Nadel und Skala laufen mit dem Scrollweg von 0 auf den Endwert, nicht gepinnt | `stil.js` Block 3, CSS (`transform`) |
| FAQ, Technische Daten | Akkordeon, ein Eintrag offen, Plus dreht zum Kreuz | `details` mit `data-exklusiv`, CSS (`transform`) |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung steht alles im Endzustand: keine Streifen, keine Pulse, das Zählwerk zeigt 45, nichts blendet ein (gemessen: 0 unsichtbare `data-zeig`, 0 laufende Dauerschleifen). Ohne JavaScript stehen die drei Fahrzeuge untereinander mit allen Reichweiten als Text, der Regler und der Umschalter entfallen, das Band ist seitlich scrollbar, das Zählwerk zeigt den Endwert. Nichts pinnt, deshalb kein Performance Budget für Bühnen. Fahrzeugwechsel und Zählwerk animieren nur `transform` und `opacity`, die Anzeige der Zahl ist Text.

## Tokens (marke.css)
`--flaeche` (Sandweiß), `--flaeche-alt`, `--flaeche-dunkel` (Tannenschwarz), `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--signal` (Kupfer), `--signal-weich`, `--text-auf-signal`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--karte-dunkel`, `--linie-dunkel`, `--feld-rand`, `--weiss`, `--foto-text`, `--verlauf`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Hanken Grotesk), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--titel-gewicht`, `--titel-spur`, Zeichenfarben `--fz-gruen`, `--fz-senf`, `--fz-dunkel`, `--fz-rad`, `--fz-glas`, `--fz-schatten`, `--fahrer-jacke`, `--fahrer-hose`, `--fahrer-helm` und Szenenfarben `--szene-wand`, `--szene-gruen`, `--szene-boden`, `--szene-himmel`, `--szene-warm`, `--szene-dunkel`.

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst gerechnet, WCAG 2.x): `--text` auf `--flaeche` 14,7 zu 1, auf `--flaeche-alt` 13,3; `--text-leise` auf `--flaeche` 5,9, auf `--flaeche-alt` 5,4; `--akzent-text` auf `--akzent` 14,7; `--text-auf-dunkel` auf Tannenschwarz 15,1, auf Szenenwand 6,6; `--text-leise-dunkel` auf Tannenschwarz 8,1, auf `--karte-dunkel` 6,9; `--signal` auf Tannenschwarz 6,2 (Zahlen der Technikbühne, Tachoring); `--text-auf-signal` auf `--signal` 5,8; `--text` auf `--signal-weich` 13,2. `--signal` auf Sandweiß nur 2,5 zu 1, deshalb nie als Textfarbe auf Hell, sondern als Fläche mit dunklem Text oder als Rahmen. Rand der Eingabefelder 4,5 zu 1 auf Weiß (Bedienelement, Mindestwert 3). Weiß auf dem Verlauf der Bildkarten 10,6 bis 12,9 zu 1 (gerechnet für 84 bis 88 Prozent Deckung über Weiß). **Per Pixel gemessen** (Hintergrund hinter dem Text ohne Text aufgenommen, ungünstigster Punkt des Textkastens, 1440 und 390): Held Kicker 10,9 und 11,5, Held H1 5,0 und 6,5, Held Unterzeile 4,9 und 5,6, Bildkarten Überschrift 5,9 und 6,8 (1440), 10,1 und 10,6 (390), Bildkarten Text 12,6 bis 13,9. Kartenband und Held Telefon per Pixel nicht verlässlich gemessen, nur gerechnet. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Die Fahrzeugzeichnungen (`fz-roller`, `fz-lastenrad`, `fz-stadtrad`) stehen als `symbol` im SVG Block am Seitenanfang und nehmen ihre Farben aus den Tokens, `--fz-farbe` stellt den Lack ein.

## Offen
Formulare senden nichts, auch der Termin Knopf ist nur ein `mailto` mit Beispieladresse. Preise, Reichweiten, Geschwindigkeiten, Ladezeiten, Technische Daten, Öffnungszeiten, Stimmen, Namen, Logos und alle Antworten der FAQ sind Beispiele, keine Belege. Die rechtliche Einordnung der Fahrzeugklassen (Führerschein, Zulassung, Versicherung, Betriebserlaubnis für Umbauten), Preisangaben, Widerruf und Gewährleistung sind nicht geprüft. Es gibt keine Fotos: Held, Aussage, Karten, Bildkarten, Stimmen und Newsletter nutzen gezeichnete Fahrzeuge und Szenen als Platzhalter (siehe `BILDER.md`), die Referenz lebt dort von Fotos mit Bewegungsunschärfe und Kundenfotos, im Projekt zu ersetzen. Abweichung: Die Referenz zeigt Sterne an den Stimmen, hier fehlen sie bewusst (keine erfundene Bewertungsleiste), ebenso die Einwilligungskarte unten links und Medienlogos echter Marken. Safari, Screenreader und echte Geräte nicht geprüft. Hotspots auf dem Freisteller der Beschreibung sind nur Zierpunkte ohne Inhalt. Das Band wandert nicht von selbst weiter.

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Die Kopfzeile schwebt über jedem Abschnitt und hält Orientierung, Telefon und die Hauptaktion in Reichweite. |
| held | hero | Ein bewegtes Bild trägt die Aussage, die Hauptaktion steht im ersten Bildschirm. |
| partner | trust | Bekannte Namen direkt unter dem ersten Bildschirm geben Vertrauen, bevor die Auswahl beginnt. |
| wahl | interactive | Wer Fahrzeug, Akkupaket und Farbe selbst einstellt und die Reichweite sofort sieht, entscheidet sich für ein konkretes Produkt. |
| aussage | editorial | Eine große Aussage mit kurzem Text und breitem Bild setzt die Haltung der Marke. |
| karten | features | Die Karte in der Mitte ist größer und gerahmt, so führt das Band den Blick auf genau eine Aussage. |
| besch | benefits | Zwei Kennzahlen mit Symbol unter einem Freisteller machen den Nutzen in Sekunden greifbar. |
| bildk | features | Zwei große Bilder mit je einer Zeile Text geben Stimmung, der dunkle Verlauf sichert die Lesbarkeit. |
| technik | technical | Ein Tachoring um das Bauteil, flankiert von zwei Kennzahlen, macht Technik als Zahl sichtbar. |
| stimmen | testimonials | Drei Stimmen mit Bild und Namen zeigen Menschen mit Anlässen, die mittlere Karte führt das Auge. |
| fragen | faq | Einwände stehen als Fragen mit eigenem Symbol und lassen sich einzeln öffnen. |
| probe | cta | Die Hauptaktion bekommt einen eigenen Abschnitt mit Telefon, Zusagen und Ort. |
| news | forms | Ein kurzes Formular mit Feldhinweisen und Einwilligung neben einem Bild fragt nur das Nötigste. |
| fuss | footer | Der Fuß wiederholt die Hauptaktion und ordnet Links in wenige Spalten. |

## Conversion (Playbook)
- Held: Stadtfahrer und Pendler (Zielgruppe), Tankkosten, Lärm und Parkplatzsuche (Problem), Elektroroller mit Wechselakku, Beratung und Probefahrt vor dem Kauf (Lösung)
- H1 "Elektroroller für Ihren Stadtalltag: leise, zugelassen und vorher Probe gefahren", Unterzeile nennt Wechselakku, Laden am Küchentisch und die drei Wege Beratung, Umbau, Neukauf
- Primär-CTA "Probefahrt buchen" in Kopf, Held, Fahrzeugwahl, Kartenband, Probefahrt und Fuß, Ziel `#probefahrt`
- Titel mit Produkt und Anlass, Beschreibung mit Fahrzeugarten, Ort und Probefahrt
- FAQ: Führerschein, Reichweite, Laden, Umbau des eigenen Rollers, Zulassung und Versicherung, Unterhalt; Antworten als "Beispielantwort" gekennzeichnet
- Formularziel: Newsletter (E-Mail, Vorname, Nachname, Einwilligung), vier Felder, Hinweis unter der E-Mail; die Probefahrt läuft über Telefon und E-Mail
- Telefon in Kopf (ab 1200 px), Held, Probefahrt, Fuß; Stimmen, Zahlen, Preise und Logos als "Beispiel" gekennzeichnet
