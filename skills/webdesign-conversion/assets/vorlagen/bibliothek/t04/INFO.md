# Großwort und Stapelkarten (t04)

**Eignung:** Dienstleister und Anbieter mit mehreren Projekten oder Paketen, die eine bildstarke, ruhige Seite mit klarem Wechsel aus Hell, Dunkel und Ton wollen.

## Sektionsfolge
1. Hero: Vollbildfläche, Markenname als Großwort (h1), Lead mit Knopf, schwebende Karte
2. Einleitung: Satz mit Wortlicht, zwei versetzte Bilder
3. Kennzahlen: drei Karten, mittlere in Akzent (Beispielwerte, `data-beispiel`)
4. Projekte: feste Überschrift links, Stapelkarten in der Mitte, Fortschrittsliste rechts
5. Pakete (dunkel): vier waagerechte Karten, 2 mal 2
6. Leistungen: vier nummerierte Akkordeonzeilen
7. Einsatzbereiche: sechs Karten mit Bild oben rechts
8. Warum (getönt): feste Überschrift links, Stapelkarten rechts
9. Galerie: Bildlauf mit Mittenvergrößerung, Pausenknopf
10. Stimmen: eine Karte, drei Folien, Blätterknöpfe (Beispieltexte)
11. Fragen: Akkordeon
12. Abschluss: Vollbild mit Text links, danach dunkler Fuß mit Newsletter

## Animationen
- Großwort und Lead fahren beim Laden ein; beim Scrollen steigt das Großwort und blendet aus (`stil.js`, `--hs`)
- Wortlicht in der Einleitung: Wörter färben sich beim Scrollen vom leisen zum vollen Ton
- Zähler in den Kennzahlen (`data-zaehle`, Endwert steht im HTML), Einblenden und Staffeln (`data-zeig`), leichte Parallaxe an Bildern (`data-parallax`)
- Stapelkarten (`position: sticky`): die verdeckte Karte schrumpft und dunkelt ab, die Liste rechts markiert die aktuelle Karte und füllt ihre Linie
- Galerie: Dauerlauf (`.band` aus der Basis), Karte in der Mitte wächst und zeigt ihr Label
- Reduzierte Bewegung: alles steht still und sichtbar, die Galerie wird zur wischbaren Leiste. Ohne JavaScript bleibt alles lesbar (Stapel bleibt als CSS sticky, Stimmen stehen untereinander)

## Tokens zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-ton` (getönter Abschnitt), `--flaeche-dunkel`, `--karte-dunkel`, `--text`, `--text-leise`, `--akzent`, `--akzent-text`, `--auf-dunkel`, `--auf-dunkel-leise`, Radien, Schriften, Bildverläufe `--bild-1` bis `--bild-6` und `--bild-held`.

## Marke wechseln
1. Werte in `marke.css` ändern, Kontrast prüfen (Text 4,5 zu 1; weiße Beschriftung auf den Bildverläufen ebenfalls)
2. Name "Kontor" in Titel, Kopf, h1, Fuß ersetzen; das Großwort passt bei etwa 5 bis 8 Buchstaben, längere Namen verkleinern (`.grosswort`)
3. Platzhalterflächen (`.bild` mit `data-platzhalter`) durch echte `<img>` ersetzen, Alt-Texte setzen
4. Beispielwerte (`data-beispiel`: Kennzahlen, Preise, Laufzeiten, Stimmen) durch belegte Angaben ersetzen oder entfernen
5. Newsletterformular (`action="#"`) anbinden, Links in Fuß und Impressum setzen

## Grenzen
- Stapelkarten brauchen `sticky` ohne `overflow` an Vorfahren, `body` nutzt deshalb `overflow-x: clip`
- Nach höchstens vier Kickern gefragt: hier drei, mehr melden die Prüfskripte
- Ein einzelnes langes Wort als Name verkleinert das Großwort auf Mobil; zwei Wörter brechen um
- Keine Bilder, Logos oder Belege enthalten; Stimmen und Zahlen sind Beispiele
- Icons: Phosphor Icons (MIT, Lizenz in `_basis/icons/LICENSE-Phosphor.txt`), durchgehend Strichstärke light, als Inline-Sprite am Seitenanfang
