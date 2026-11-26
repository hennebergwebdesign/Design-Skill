# t104 Finanzautomatisierung Petrol und Koralle

Prinzip nach der Startseite von tipalti.com (Finanzautomatisierung für Unternehmen, B2B Software), eigene Aufnahme am 26.11.2026 mit Playwright bei 1440 und 390 Pixel (Schriftgrößen, Radien, Knopfformen und Sektionsfolge aus den berechneten Stilen, Bewegung aus Beobachtung). Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung sind übernommen. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen (Referenz: Inter, Schwarz, Amber und Salbei; hier Schibsted Grotesk, Instrument Sans, Petrol, Koralle und Himmelblau).

## Eignung
Software für Rechnungseingang, Freigabe und Zahlungen im Mittelstand, Buchhaltungs- und Spesenwerkzeuge, Finanzdienstleister und Beratungen mit erklärungsbedürftigem Produkt, die einen Ablauf mit Oberflächen statt Fotos zeigen und Demos gewinnen wollen. Ansprache im Sie. Abgesetzt von t44, t45, t49, t70, t78 (Software) und t39, t42, t53, t54, t73, t74 (Finanz) durch die Heldtafel mit laufendem Beleg, Wischspur auf Rasterbühnen, Datenfluss mit Punkten und Kundenfälle mit Foto und Zitat.

## Sektionsfolge
Schwebende helle Kopfleiste (Demo Knopf, Telefon), Held als dunkle Tafel mit großem Eckenradius (Satz, Primärknopf, zwei Wegekarten, rechts Oberfläche aus Rechnung, Zahllauf und Ring), Funktionen als Wischspur mit vier Bühnen auf Raster, Zahlungen als drei weiße Karten (Währungszeilen, Gesellschaftsliste, Regelschalter), Anbindungen auf dunkler Tafel (Datenfluss, Zeichenband mit Pause), Kundenfälle als Wischspur mit Foto und Zitat, Wirkung mit drei Zählwerten, helles Preisband, Fragen (Akkordeon), Kontakt auf dunkler Tafel mit Formular, heller Fuß mit großer Aussage.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, Beleglauf (Signatur) | Zeilen der Rechnung, vier Statusschritte, Stempel Bezahlt und Zahllaufzeilen blenden nacheinander ein und in gleicher Reihenfolge wieder aus, zehn Sekunden, wiederholt | CSS (`opacity`, `transform`), je Zeile `--d` als Versatz |
| Held | Satz, Text, Knöpfe und Wegekarten blenden gestaffelt ein, Karten driften leicht gegenläufig | `data-zeig`, `data-staffel`, `data-parallax` |
| Funktionen, Fälle | Wischspur mit Scroll Snap und Pfeilknöpfen, ohne JavaScript wischbar und mit Tastatur scrollbar, Karten heben sich beim Überfahren | CSS (`scroll-snap`, `transform`), `stil.js` |
| Funktionen, Auswertung | Säulen wachsen einmal beim Sichtbarwerden | `stil.js`, CSS (`transform`) |
| Zahlungen | Währungszeilen driften gegenläufig, Gesellschaftsliste wippt versetzt | CSS (`transform`) |
| Anbindungen | Punkte wandern von Quelle zu Ziel, Zeichenband läuft, Pause per Schalter | CSS (`transform`, `opacity`), echte Elemente |
| Wirkung | Werte zählen hoch, Endwert steht im HTML | `data-zaehle` |
| Kopf | Schatten beim Scrollen, Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js`, CSS |
| Seite | Kontrollkästchen "Bewegung auf der Seite anhalten" im Held stoppt alle Schleifen (WCAG 2.2.2), ohne JavaScript | CSS (`:has`) |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar und bedienbar. Bei reduzierter Bewegung stehen alle Schritte der Rechnung fertig, die Punkte stehen mittig.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--akzent` (Koralle, Fläche mit dunklem Text), `--akzent-text`, `--himmel` (Preisband), `--raster` (Bühnenfläche), `--gruen-flaeche`, `--gruen-text`, `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), Radien (`--radius-gross` 48 px für Tafeln und Karten).

## Marke wechseln
Nur `marke.css` ändern. Kontrast (selbst nachgerechnet): `--text` auf `--flaeche` 15,2 zu 1; `--text-leise` auf `--flaeche` 6,9, auf Weiß 7,6, auf `--flaeche-alt` 6,2, auf `--himmel` 5,8; `--akzent-text` auf `--akzent` 7,5; `--akzent` auf `--flaeche-dunkel` 5,7 (Fläche und Zeichen, nie Fließtext auf Hell, auf `--flaeche` nur 2,3 zu 1, deshalb trägt der Primärknopf immer eine Fläche mit dunklem Text); `--text-auf-dunkel` auf `--flaeche-dunkel` 12,9; `--text-leise-dunkel` auf `--flaeche-dunkel` 7,6 und auf `--flaeche-dunkel-2` 6,1; `--gruen-text` auf `--gruen-flaeche` 8,5; `--feld-rand` auf Weiß 4,4 (Rand der Eingabefelder, mindestens 3 zu 1). Der Name "Markenname" steht in Titel, Logo, Fuß, Zeichenband und JSON-LD. Das Zeichen (`#i-zeichen`) ist eine eigene Form aus zwei Balken und einem Punkt.

## Offen
Formulare senden nichts. Kennzahlen, Fälle, Zitate, Firmen, Beträge, Fragen und Antworten, Preisaussage und Beispielzeichen sind Beispiele, keine Belege (im HTML gekennzeichnet). Die drei Fotos sind Beispiele aus der Bibliothek, vor Abgabe durch Fotos des Kunden mit Einwilligung ersetzen (Nachweis in `BILDER.md`). Rechtliches nicht geprüft: Aussagen zu Zahlungsverkehr, Auslandszahlungen, Freigabe, Protokoll, Datensicherheit und Auftragsverarbeitung, je Produkt zu ergänzen und freizugeben (Software im Finanzbereich, keine Aussage zu Zulassung, Aufsicht, Rendite oder Ersparnis ist belegt). Kontrast der weißen Überschrift über den Fotos der Fälle ist über den Verlauf geschätzt, nicht gemessen. Kleinste Schrift in Oberflächen ist 16 px. Safari, Screenreader und echte Geräte nicht geprüft; die Oberfläche im Held trägt `role="img"` mit Beschreibung, ihr Inhalt ist für Hilfstechnik nicht einzeln lesbar. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang (`scroll-margin-top` im Projekt ergänzen). Die Referenz zeigt außerdem einen Chat Assistenten und eine Cookieleiste, beides ist hier bewusst nicht nachgebaut (Consent und Chat baut der Bauablauf). Aus der Referenz nicht übernommen: gelb leuchtende Heldzeile (Akzentwort), Unterstreichung unter dem Kicker (Zierstrich), Kundenlogos als Text und Bild, Leistungsversprechen in Prozent. Das Band der Anbindungen in der Referenz läuft ohne Pause Schalter, hier mit.

## Conversion (Playbook)
- Held: Finanzleitung und Buchhaltung im Mittelstand, Problem Rechnungsstapel, Freigaben per Mail und Auslandszahlungen von Hand, Lösung ein automatischer Ablauf von der Rechnung bis zur Zahlung mit selbst gesetzten Freigabegrenzen
- H1 "Rechnungen und Zahlungen, die ohne Nacharbeit durchlaufen", Unterzeile nennt Erfassen, Abgleichen, Freigeben und Zahllauf (19 Wörter)
- Primär CTA "Demo vereinbaren" in Kopf, Held, Fuß und Formular (vier Stellen), Zweitknöpfe tragen andere Texte
- Titel mit Keyword und Marke, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Kosten, Dauer, Wechsel der Buchhaltung, Freigabegrenzen, Datensicherheit
- Formularziel: Demo (Name, E-Mail, Telefon, Rechnungen pro Monat, Anliegen), fünf Felder, Hinweise unter E-Mail und Telefon
- Kennzahlen, Fälle und Zitate als "Beispiel" gekennzeichnet
