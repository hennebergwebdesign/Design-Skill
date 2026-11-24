# Vorlage t11: Dunkle Dienstleistungsseite mit Stapelkarten

**Eignung:** Dienstleister und Handwerksbetriebe mit mehreren klar getrennten Leistungen, die eine ruhige, dunkle und bildstarke Startseite wollen.

**Sektionsfolge:** schwebende Kopfpille, Held (zentrierte H1, zwei Knöpfe, breites Bild), Logoband, Über uns (Titel links, Text und Knopf rechts, ein großes und ein schmales Bild), Ergebnisse (Text mittig, fünf gestreute Bilder), Leistungen (vier gestapelte Karten mit Bild, Schwerpunkten, Titel, Knopf), Werte (große Bildkarte plus vier Wertkarten), Kundenstimmen (zwei gegenläufige Reihen), Kontakt (Bild und Formular), Fuß mit Newsletterfeld.

**Animationen:** Einblenden beim Scrollen mit Staffelung (Basis, `data-zeig`); Logoband läuft endlos und hält bei Hover an (Basis); Ergebnisbilder bewegen sich begrenzt mit eigener Geschwindigkeit (`data-versatz`, stil.js, nur ab 1024 px); Leistungskarten haften bei 6 rem und werden von der nächsten überdeckt, die überdeckte dunkelt ab (CSS sticky plus stil.js, ab 768 px); Stimmenreihen wandern beim Scrollen gegenläufig (stil.js). Bei reduzierter Bewegung steht alles still, die Stimmenreihen sind dann von Hand scrollbar. Ohne JavaScript ist alles sichtbar.

**Tokens zum Umfärben** (`marke.css`): `--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--rahmen-feld`, `--akzent`, `--akzent-text`, Schriften, Radien. Ein heller Auftritt: Flächen hell, Text dunkel setzen und `--akzent-text` neu prüfen.

**Marke wechseln:** Name und Logo (Inline SVG) in Kopf und Fuß, Farben und Schriften in `marke.css`, Texte, Bildplatzhalter (`.bild` mit `data-platzhalter` durch `<img>` ersetzen, Alt-Text ergänzen), Logoband mit echten, freigegebenen Logos füllen oder entfernen, Kundenstimmen durch echte ersetzen, Formular und Newsletter anbinden (Formularvorlage des Bauablaufs, Newsletter nur mit Double Opt in), Impressum und Datenschutz verlinken.

**Grenzen:** Alle Texte, Stimmen, Namen und Bewertungen sind Beispiele. Keine Zähler enthalten. Die Kontaktformulare senden nichts. Sticky und Parallax sind auf Mobil bewusst aus. Bei sehr langen Leistungstexten wird die Stapelkarte höher als der Bildschirm, dann Text kürzen. Kontrast und Klickflächen sind für die Ausgangsfarben geprüft, nicht für neue.
