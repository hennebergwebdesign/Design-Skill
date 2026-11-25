# Abo Dunkelstart (t13)

**Eignung:** Dienstleister mit laufender Betreuung im Monatsabo und gestaffelten Paketen (Beratung, Pflege, Agenturleistungen, Praxisbetreuung), die Vertrauen über Erfolgsgeschichten, Preise und einen klaren Ablauf aufbauen. Gebaut nach dem Prinzip einer freigegebenen Referenz (Tor 1), Text, Bild, Code, Schrift und Farbe sind eigen.

## Sektionsfolge
1. Kopfleiste (dunkel, fest) und Held: mittig, Bewertungszeile, H1, Aktion, Lichtwelle, schwebende Stimme
2. Logoleiste als Laufband (Platzhalter)
3. Idee: Abo statt Einzelauftrag, Bild mit Karte
4. Leistungen: Bild bleibt stehen, Akkordeon rechts, Diagrammkarte wächst
5. Referenzen: Reiter mit Pfeilen und Punkten (Ausgangslage, Bild, Kennzahl und Zitat)
6. Warum das Abo: dunkle Tafel mit laufenden Reihen, vier Karten
7. Preise: Schalter monatlich oder jährlich, drei Pakete (das dritte dunkel)
8. Ablauf: dunkel, drei Schritte leuchten beim Scrollen nacheinander auf
9. Stimmen: große Zitate im Reiter
10. Kontakt: Daten links, Formular rechts (ohne Versand)
11. FAQ als Akkordeon
12. Dunkler Fuß mit Eintrag, Linkliste, großem Namenszug

## Animationen
- Held: Welle zeichnet sich beim Laden und driftet, Inhalt blendet beim Scrollen ab und verwischt (`data-abdunkeln`, bewegung.js), die helle Fläche schiebt sich darüber (Held ist ab 48rem sticky)
- Diagrammkarte wächst beim Scrollen, Balken heben sich (stil.js, `data-wachs`, `--wachs`)
- Reiter per scroll-snap, Pfeile und Punkte nur mit JavaScript (stil.js)
- Preisschalter: Zahlen laufen auf den neuen Wert, Schalter mit `role="switch"` (stil.js)
- Ablauf: Sticky, Schritte und Fortschrittslinie folgen `--fortschritt` (bewegung.js, `data-fortschritt`), nur ab 62rem und 46rem Höhe
- Tafel: Reihen laufen gegenläufig, Logoleiste läuft endlos, Kennzahlen zählen (`data-zaehle`)
- Reduzierte Bewegung und ohne JavaScript: alles statisch und sichtbar, Preise stehen mit jährlichem Hinweis im HTML

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-tief` (Text auf hell), `--akzent-mittel` (Symbole auf hell), `--akzent-hell` (auf dunkel), Radien, Schriften (Lexend, Manrope), Platzhaltertöne `--ton-1` bis `--ton-4`.

## Marke wechseln
1. Werte in `marke.css` und die zwei Schriftzeilen ändern. Kontrast prüfen: `--akzent-tief` auf hell und `--akzent-hell` auf dunkel mindestens 4,5 zu 1.
2. Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen (`<img>` mit `alt`).
3. Logoleiste mit freigegebenen Kundenlogos füllen oder entfernen.
4. Alle Elemente mit `data-beispiel` (Bewertung, Stimmen, Kennzahlen, Preise) und alle Zeilen mit „Beispiel" durch echte Angaben ersetzen oder löschen. Die Fußzeile nennt noch alle Angaben als Beispiele.
5. Formulare an einen Versand anbinden, Impressum und Datenschutz verlinken, Telefon, E-Mail und Adresse eintragen.

## Grenzen
- Keine echten Bilder, keine Belege. Formulare senden nichts.
- Preise, Laufzeiten und Reaktionszeiten sind Beispielangaben.
- Nicht geprüft: Screenreader, Safari, echte Fotos unter Overlays (Kontrast neu messen).

## Icons und Logos
Icons: Phosphor Icons (MIT, Lizenz in `_basis/icons/LICENSE-Phosphor.txt`), durchgehend in der Strichstärke duotone (Referenz marketo-agency, runde Symbolflächen). Beispiellogos aus `_basis/logos.css` in der Logoleiste und bei den Erfolgsgeschichten, durch freigegebene Kundenlogos ersetzen.

## Conversion (Playbook)

- Held: Selbstständige und kleine Betriebe, deren Website mangels Zeit veraltet, Lösung laufende Betreuung zum festen Monatsbetrag
- Primär-CTA überall "Erstgespräch anfragen" (Kopf, Held, Pakete, Formular)
- Titel "Website-Betreuung Musterstadt | Monatspreis | Markenname", Beschreibung mit Problem, Nutzen und Handlung
- FAQ: Abo gegen Einmalprojekt, Bindung, erste Wochen, Kosten des Nichtstuns, Zuständigkeit (Beispielantworten)
- Formularziel: Erstgespräch, Feld "Was soll Ihre Website leisten?", drei Felder plus Einwilligung
- Beleg im Held: Bewertung der Abo-Kunden und Beispielstimme, beides als Beispiel markiert
