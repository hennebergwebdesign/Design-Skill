# Aufzieh-Bühne (t14)

**Eignung:** Beratung, Coaching und digitale Dienste mit einem klaren Einstieg (Check, Test, Erstgespräch) und gestaffelten Paketen. Gedacht für Marken, die mit großen Bildflächen und einer Aufzieh-Bewegung wirken wollen. Nach dem Prinzip einer freigegebenen Referenz gebaut (Aufbau, Raster, Sektionsfolge, Art der Bewegung), Text, Bild, Code, Schrift und Farbe sind eigen.

## Sektionsfolge
1. Dunkle Kopfleiste (schwebend), Held mit Text mittig, Aktion und Telefon
2. Bildreihe aus fünf Spalten, das Mittelbild zieht sich beim Scrollen auf Vollbild auf, die Seitenspalten fahren hinaus
3. Kennzahlenkarte (vier Werte, zählen hoch)
4. Leistungen: drei Bildkarten mit Etikett, Text und Pfeillink
5. Einblick: Bildfläche beginnt als Vollbild, schrumpft zur Kachel, darunter erscheint der Text
6. Ablauf: drei Schritte, die große Ziffer bleibt je Schritt stehen
7. Stimme: Karte (Bild links, Zitat rechts) auf Bildgrund
8. Preise: drei Pakete, das mittlere dunkel und angehoben
9. FAQ als Akkordeon auf abgesetzter Fläche
10. Abschluss mit Handlung (E-Mail-Feld und Knopf) auf Bildgrund
11. Kontakt: Formular links, Bild rechts mit schwebender Beispielkarte
12. Fuß: dunkel, helle Karte mit Leitsatz und Links, Impressum und Datenschutz

## Animationen
- Bildreihe: Sticky-Bühne, `--fortschritt` aus `bewegung.js` (`data-fortschritt`), alles Weitere in `stil.css` (Spalten per `transform`, Mittelbild per Rand nach außen)
- Einblick: gleiche Technik rückwärts, Text blendet erst ein, wenn die Kachel fast steht
- Kennzahlen: `data-zaehle`, Endwert steht im HTML
- Ablauf: Ziffer `position: sticky` (ab 62rem), Linien ziehen sich beim Sichtbarwerden (`data-zeig`)
- Stimme und Abschluss: leichte Tiefenverschiebung des Bildgrunds (`data-parallax`)
- Karten und Pakete: gestaffelt einblenden, Hover hebt an (nur `transform` und Schatten)
- Menü, Akkordeon, Menüanzeige des Abschnitts (alles aus `bewegung.js`)
- Die Bühnen laufen nur mit JavaScript, ab 38rem Fensterhöhe und ohne reduzierte Bewegung. Sonst steht alles ruhig und sichtbar da (Bildreihe als Raster, Einblick als Kachel mit Text). Ohne JavaScript ist alles sichtbar.

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, Radien (`--radius-gross`, `--radius-karte`, `--radius-klein`, `--radius-knopf`), Schriften, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` und `--text-auf-dunkel` auf Platzhalter- und Fototönen mindestens 4,5 zu 1. `favicon.svg` mit den neuen Farben (Rundquadrat `--flaeche-dunkel`, Pfad `--akzent`) neu setzen.
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`, `object-fit` ist gesetzt). Das Mittelbild der Bildreihe (`.mitte__zoom`) wird zu Vollbild aufgezogen: Motiv in der Mitte wählen, Bild groß genug liefern (mindestens 2400 px Breite).
3. Alle Elemente mit `data-beispiel` (Kennzahlen, Zitat, Preise, Beispielkarte, Telefon, E-Mail) und alle Texte mit „Beispiel“ durch echte Angaben ersetzen oder löschen.
4. Formulare: `data-vorlage-form` entfernen, `action` setzen, den Block in `stil.js` löschen.
5. Titel, Beschreibung, Impressum und Datenschutz ergänzen. Einblick: Video erst nach Klick laden (Kapitel 38).

## Grenzen
- Keine echten Bilder, keine Logoleiste (die Referenz hat auf der Startseite keine). Kennzahlen, Zitat und Preise sind Beispiele und kein Beleg.
- Die Einblick-Kachel hat bewusst keinen Abspielknopf, ein Knopf ohne Funktion täuscht. Beim Einbau eines Videos einen echten Knopf mit Beschriftung setzen.
- Ziffern im Ablauf nur ab 62rem sticky, darunter normaler Fluss.
- Nicht geprüft: Screenreader, Safari und Firefox, echte Fotos hinter den Überlagerungen (Kontrast neu messen), Leistung auf schwachen Geräten (das Aufziehen verändert Größe und Rand eines Elements je Bild).

## Icons
Phosphor Icons (MIT, Lizenz in `_basis/icons/LICENSE-Phosphor.txt`), durchgehend in der Strichstärke bold (Referenz sportrik, kräftige Symbole). Die Vorlage hat keine Logoleiste.

## Conversion (Playbook)

- Held: Gründerinnen und Gründer, die nicht wissen, was zuerst zählt, Lösung Orientierungscheck mit drei nächsten Schritten
- Primär-CTA überall "Check starten" (Kopf, Held, Abschluss, Kontaktformular); die Paketknöpfe bleiben Auswahl ("Start wählen" usw.)
- Titel "Gründungsberatung Musterstadt | Erster Check | Markenname", Beschreibung mit Problem, Nutzen und Handlung
- FAQ: Nutzen, später Zeitpunkt, Kosten ohne Plan, Vorkenntnisse, Datensicherheit (Beispielantworten)
- Formularziel: Check anfordern, Feld "Ihr Vorhaben in zwei Sätzen"; Abschlussformular nur E-Mail
- Beleg im Held: Kennzahlenkarte und Beispielstimme, als Beispiel markiert
