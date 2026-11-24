# App Bühne (t18)

**Eignung:** Produktseite einer App oder Software mit Oberfläche (Finanzen, Banking, Budget, Verwaltung), dunkel, mit Telefon als Bühne. Branchenneutral: Beispieltexte statt echter Angaben.

## Sektionsfolge
1. Schwebende dunkle Kopfleiste, Held: zentrierte H1, Text, Aktion, Telefon mit schwebenden Karten vor Farbverlauf
2. Vertrauen: Laufband mit Beispiellogos (aus `_basis/logos`, durch freigegebene Partnerlogos ersetzen)
3. Funktionen: Überschrift und drei Karten mit Mini-Oberfläche, gestaffelt
4. Leitsatz, Wörter hellen beim Scrollen auf
5. App: Telefon bleibt stehen (sticky), drei Schritte ziehen vorbei und schalten die Ansicht, zwei Kennzahlen
6. Erleben: vier Reiter, die Ansicht im Telefon wechselt
7. Bausteine: Kachelraster (Icons, Bildplatzhalter, Geräte, Schutz)
8. FAQ als Akkordeon
9. Abschluss mit Verlauf, Beispielformular ohne Versand, Telefon und Anfrage sichtbar
10. Fuß mit Spalten, Impressum und Datenschutz

Nicht enthalten, weil die Referenz sie nicht hat: Preise, Stimmen.

## Animationen
- Held: beim Scrollen hebt und vergrößert sich das Telefon, Text blendet aus, schwebende Karten driften unterschiedlich schnell (stil.js, `--p`)
- Einblenden gestaffelt (bewegung.js), Zähler bei Kennzahlen (bewegung.js, Endwert steht im HTML)
- Wortlicht im Leitsatz (bewegung.js, `data-licht`)
- Sticky Telefon mit Schrittumschaltung (CSS `position:sticky` ab 62rem, Umschaltung stil.js)
- Reiter mit Pfeiltasten (stil.js), Laufband, Akkordeon, Menü, Hover für Karten, Knöpfe, Links
- Reduzierte Bewegung: nichts Animiertes, Zustände (Schritt, Reiter) schalten trotzdem. Ohne JavaScript steht alles sichtbar, Reiter als Textliste.

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-karte`, `--flaeche-hell`, `--text`, `--text-leise`, `--text-auf-hell`, `--linie`, `--akzent`, `--akzent-text`, Radien, Schriften (Outfit, Instrument Sans), Verlauf `--verlauf-a` bis `--verlauf-d`, Platzhaltertöne `--ton-1` bis `--ton-3`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern. Kontrast prüfen: Text und Akzenttext mindestens 4,5 zu 1.
2. Das Verlaufsset ohne Violett halten, sonst greift die Sperre gegen Violettverläufe.
3. Telefonansichten in `index.html` durch echte Oberflächen ersetzen (Screenshots als `<img>` mit `alt`) und Beispielwerte entfernen.
4. Bildplatzhalter durch Fotos ersetzen, Logos nur freigegebener Partner einsetzen oder die Sektion löschen.
5. Elemente mit `data-beispiel`, Beispieltexte, Telefon, Anfrageadresse, Impressum und Datenschutz ersetzen. Formular anbinden (derzeit ohne Versand).

## Grenzen
- Telefonoberflächen sind eigene Beispiele aus HTML, keine Produktbilder. Keine echten Bilder, kein Cookie-Banner.
- Sticky nur ab 62rem, darunter normaler Fluss mit der ersten Ansicht.
- Schwebende Karten im Held nur ab 62rem.
- Nicht geprüft: Safari, Screenreader, echte Geräte, Leistung, Kontrast über dem Verlauf per Messung (nur Sichtprüfung).

## Icons
Phosphor Icons (MIT, siehe `_basis/icons/LICENSE-Phosphor.txt`), durchgehend Strichstärke duotone, inline als SVG mit `currentColor` (App-Oberfläche im Telefon, Funktionen, Akkordeon).
