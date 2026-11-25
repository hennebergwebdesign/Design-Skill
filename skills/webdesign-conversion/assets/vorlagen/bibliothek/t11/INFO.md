# Vorlage t11: Dunkle Dienstleistungsseite mit Stapelkarten

**Eignung:** Dienstleister und Handwerksbetriebe mit mehreren klar getrennten Leistungen, die eine ruhige, dunkle und bildstarke Startseite wollen.

**Sektionsfolge:** schwebende Kopfpille, Held (zentrierte H1, zwei Knöpfe, breites Bild), Logoband, Über uns (Titel links, Text und Knopf rechts, ein großes und ein schmales Bild), Ergebnisse (Text mittig, fünf gestreute Bilder), Leistungen (vier gestapelte Karten mit Bild, Schwerpunkten, Titel, Knopf), Werte (große Bildkarte plus vier Wertkarten), Kundenstimmen (zwei gegenläufige Reihen), Häufige Fragen (fünf Akkordeons), Kontakt (Bild und Formular), Fuß mit Newsletterfeld.

**Animationen:** Einblenden beim Scrollen mit Staffelung (Basis, `data-zeig`); Logoband läuft endlos und hält bei Hover an (Basis); Ergebnisbilder bewegen sich begrenzt mit eigener Geschwindigkeit (`data-versatz`, stil.js, nur ab 1024 px); Leistungskarten haften bei 6 rem und werden von der nächsten überdeckt, die überdeckte dunkelt ab (CSS sticky plus stil.js, ab 768 px); Stimmenreihen wandern beim Scrollen gegenläufig (stil.js). Bei reduzierter Bewegung steht alles still, die Stimmenreihen sind dann von Hand scrollbar. Ohne JavaScript ist alles sichtbar.

**Tokens zum Umfärben** (`marke.css`): `--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--rahmen-feld`, `--akzent`, `--akzent-text`, Schriften, Radien. Ein heller Auftritt: Flächen hell, Text dunkel setzen und `--akzent-text` neu prüfen.

**Marke wechseln:** Name und Logo (Inline SVG) in Kopf und Fuß, Farben und Schriften in `marke.css`, Texte, Bildplatzhalter (`.bild` mit `data-platzhalter` durch `<img>` ersetzen, Alt-Text ergänzen), Logoband mit echten, freigegebenen Logos füllen oder entfernen, Kundenstimmen durch echte ersetzen, Formular und Newsletter anbinden (Formularvorlage des Bauablaufs, Newsletter nur mit Double Opt in), Impressum und Datenschutz verlinken.

**Grenzen:** Alle Texte, Stimmen, Namen und Bewertungen sind Beispiele. Keine Zähler enthalten. Die Kontaktformulare senden nichts. Sticky und Parallax sind auf Mobil bewusst aus. Bei sehr langen Leistungstexten wird die Stapelkarte höher als der Bildschirm, dann Text kürzen. Kontrast und Klickflächen sind für die Ausgangsfarben geprüft, nicht für neue.
- Icons: Phosphor Icons (MIT), Strichstärke light als Sprite im HTML; nur die Sterne der Bewertung nutzen fill, damit sie gefüllt wirken (Lizenz: `../_basis/icons/LICENSE-Phosphor.txt`). Das Logoband zeigt erfundene Beispiellogos aus `../_basis/logos.css`, durch echte, freigegebene ersetzen. Die Kürzel der Netzwerke im Fuß (f, ig, in) sind Textplatzhalter, Markenzeichen liefert der Kunde.

## Conversion (Playbook)

- Held: Eigentümer von Wohnhäusern und Gewerbeobjekten, Problem Baustellenchaos und unklare Kosten, Lösung Planung, Sanierung und Pflege nach festem Ablauf
- Primär-CTA „Beratung vereinbaren“ in Kopfzeile, Menü, Held, Über uns, Ergebnis, Werten, Stimmen und Formular; die vier Leistungsknöpfe bleiben leistungsbezogen und leiser
- Titel „Sanierung Musterstadt | Planung bis Pflege | Musterbetrieb“, Beschreibung mit Nutzen und Handlung
- Held-Beleg „4,9 von 5 Sternen, Bewertungen unserer Kunden“ als Beispielwert
- FAQ: Kosten, Dauer, Wohnen während der Arbeiten, Mängel nach Abnahme, Kosten des Wartens (Beispielantwort)
- Formular (3 Felder) für die Beratungsanfrage: Nachricht fragt nach Aufgabe, Ort und Zeitraum, Absendeknopf gleich dem Primär-CTA
