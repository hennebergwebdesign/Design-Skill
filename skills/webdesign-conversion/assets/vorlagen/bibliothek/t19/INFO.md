# Praxis (t19)

**Eignung:** Arzt-, Zahnarzt-, Therapie- und Gesundheitspraxen, Kliniken und Gesundheitsdienstleister mit mehreren Fachgebieten, Team, Terminanfrage und Ratgeber. Hell mit dunklen Tafeln.

## Sektionsfolge
1. Schwebende Kopfpille (dunkel, Punkt am aktiven Menüpunkt, Terminknopf, mobil Burger)
2. Held: dunkle Tafel, Kicker, H1, Text, Terminknopf und Telefon, auffächernder Bildfächer, Beispiel-Partnerleiste als Laufband
3. Fachgebiete: zwei gegenläufige Laufbänder mit Icon-Chips
4. Praxis: Stapel aus vier Tafeln (Praxis, Warum wir, Bildband, Alles an einem Ort), Bogenbilder
5. Team: waagerechte Karten mit Pfeilen, Name auf Verlauf
6. Leistungen: dunkle Tafel, vier Reiter mit Selbstlauf, Karte mit Dauer, Ort, Beispielpreis und Bild
7. Stimmen: Wortlicht-Überschrift, Zitatkarte mit Wechsel, Zahlenkarte mit Zähler
8. Ablauf: drei Schritte, die Mitte hervorgehoben, Hover wandert mit
9. Ratgeber: dunkle Tafel, ein großer und zwei kleine Beiträge
10. Fragen: Akkordeon, eine Antwort offen zugleich
11. Abschluss: Kontakt und Terminformular (ohne Versand), Fuß mit Notfallhinweis, Impressum, Datenschutz

## Animationen
- Bildfächer: Karten liegen übereinander und fächern beim Scrollen auf (`--f`, `stil.js`)
- Stapel: Tafeln kleben (sticky ab 64 em) und die vorige schrumpft leicht, wenn die nächste darüber zieht (`--s`); der Bildband wächst von 88 auf 100 Prozent (`--z`)
- Laufbänder gegenläufig, bei Hover pausiert; Wortlicht (`data-licht`), Einblenden und Staffeln (`data-zeig`), Zähler (`data-zaehle`, Endwert im HTML)
- Reiter: Balken füllt sich 6 s, dann nächster Bereich; pausiert bei Hover und Fokus; erste Eingabe beendet den Selbstlauf
- Stimmen: Überblenden per Pfeil; Team: Pfeile schieben um eine Karte; Schritte: Hover färbt die Karte, Akkordeon Plus zu Minus
- Reduzierte Bewegung und ohne JavaScript: alles sichtbar, keine Scroll-Animation, kein Selbstlauf, Bänder umbrechen statt zu laufen

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--flaeche-dunkel-3`, `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent`, `--akzent-text`, Radien, Schriften (Outfit, Instrument Sans), Platzhaltertöne `--ton-1` bis `--ton-6`.

## Marke wechseln
Werte in `marke.css` und die zwei Schriftzeilen ändern, Kontrast prüfen, Platzhalter `.bild[data-platzhalter]` durch Fotos ersetzen, alle Beispieltexte, Namen, Preise, Zahlen (`data-beispiel`), Zitate und Kontaktdaten durch freigegebene Angaben ersetzen. Beispiellogos aus `_basis/logos.css` durch echte ersetzen oder die Leiste entfernen.

## Grenzen
- Zitate, Namen, Preise, Zahlen und Kontaktdaten sind Beispiele, keine Belege. Formular ohne Auswertung (`action="#"`).
- Platzhalter sind Tonflächen, keine Porträts. Kontrast über den Bildverläufen nur bei den Text-auf-Verlauf-Stellen mit starkem Overlay ausgelegt, nicht nachgemessen.
- Icons: Phosphor Icons (MIT), durchgehend duotone, Sterne gefüllt, als Inline-Sprite.
- Rechtstexte, Heilmittelwerbung und Datenschutz sind vor Livegang zu prüfen.

## Conversion (Playbook)

- Held: Patienten, die schwer an einen Termin kommen, Lösung Terminanfrage online mit festen Ansprechpersonen (Hausarztpraxis als Beispiel)
- Primär-CTA überall "Termin anfragen" (Kopf, Held, Leistungen, Ablauf, Formular)
- Titel "Hausarztpraxis Musterstadt | Online-Termin | Praxisname", Beschreibung mit Problem, Nutzen und Handlung
- FAQ: Termin, Video, Kassen, Notfall (echte Nummern 112 und 116 117), Mitbringen, Warten mit Beschwerden (Beispielantworten)
- Formularziel: Terminanfrage mit Wunschzeit und Anliegen, vier Felder plus Einwilligung; Hinweis auf Notruf bleibt
- Beleg im Held: Patientenbewertung als Beispielwert markiert
