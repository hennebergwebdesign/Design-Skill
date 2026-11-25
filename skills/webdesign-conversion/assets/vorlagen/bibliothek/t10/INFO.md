# Stapelseite Beratung (t10)

**Eignung:** Dienstleister mit erklärungsbedürftigem Angebot in mehreren Stufen (Beratung, Planung, Betreuung), ruhiger und nüchterner Auftritt, wenig Bildbedarf.

## Sektionsfolge
1. Kopfbereich: Vollbildfläche (Platzhalter für Bild oder Video), H1 oben links, vier nummerierte Sprungmarken am unteren Rand
2. Über uns: Beschriftung links, große Aussage rechts (Raster 4 zu 8 von 12), darunter vier Zahlen
3. Leistungen: drei vollhohe Felder, die sich beim Scrollen übereinanderlegen; je Feld Kopfzeile, Überschrift, Text, Bildfläche und drei aufklappbare Reihen
4. Vorgehen: Aussage und ein waagerecht laufendes Band mit sieben Schritten
5. Team: versetztes Raster aus zehn Porträtflächen
6. Stimmen: Linienraster aus 4 mal 2 Zellen, abwechselnd Zitat und Logofläche
7. Fragen: sechs nummerierte Aufklapp­reihen auf abgesetzter Fläche
8. Abschluss: große Schlusszeile und eine breite Linkzeile; danach Fuß

## Animationen
- Überschrift im Kopfbereich: Wörter steigen aus einer Maske auf (nur CSS, beim Laden)
- Kopfbereich: Hintergrund driftet langsam und läuft beim Scrollen leicht gegen (data-parallax), Linien über den Sprungmarken wachsen nacheinander
- Leistungsfelder: bleiben oben haften, das überdeckte Feld wird abgedunkelt und rutscht leicht nach oben (stil.js, `--abdeckung`); nur ab 56rem Breite und 46rem Höhe, sonst normaler Fluss
- Zahlen zählen hoch (Endwert steht im HTML), Elemente blenden gestaffelt ein (data-zeig)
- Band: läuft endlos, pausiert bei Hover und Fokus, Knopf „Bewegung anhalten"; bei reduzierter Bewegung wird es eine verschiebbare Liste
- Reihen: Plus dreht zum Kreuz, Antwort blendet ein, nur eine Reihe je Gruppe offen
- Linkzeile im Abschluss füllt sich beim Hover von links
- Menü mobil: Vollbildfläche, Einträge steigen gestaffelt auf

## Tokens zum Umfärben (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-alt-2`, `--flaeche-alt-3` (die drei Leistungsfelder, nach hinten heller), `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--schrift-titel`, `--schrift-text`, `--titel-gewicht`, `--radius-*`. Für die Platzhalterflächen: `--foto-hell`, `--foto-warm`, `--foto-dunkel`, `--schleier`.

## Bei Markenwechsel
1. Tokens und Schriften in marke.css tauschen, Kontrast prüfen (Text 4,5 zu 1)
2. Platzhalter ersetzen: Kopfbild (`.hero__bild`), Porträts, Logos, Leistungsbilder; Bilder mit `alt`, Maße setzen
3. Alle mit `data-beispiel` markierten Werte (Zahlen, Zitate, Logos) durch belegte Angaben ersetzen oder streichen; Namen, Rollen, Adresse, Kontaktdaten und Fragen sind Beispieltexte
4. Beschriftungen („Über uns", „Team") nur dort behalten, wo sie etwas leisten; die Prüfung erlaubt vier Kicker

## Grenzen
- Das Stapeln der Leistungsfelder verlangt Felder, die in eine Bildschirmhöhe passen; mehr als drei Reihen oder lange Texte je Feld brauchen den Fluss ohne Haften (Medienabfrage in stil.css anheben)
- Das Team-Raster ist auf zehn Personen ausgelegt; andere Zahlen brauchen neue Spaltenzuweisungen (`.p1` bis `.p10`)
- Kein Video eingebaut, nur Fläche; bei Videoeinbau Pause, Poster und Datenmenge nach Kapitel 38 beachten
- Die Zahlen in „Über uns" sind Beispielwerte, die Vorlage belegt nichts
- Icons: Phosphor Icons (MIT), durchgehend die Strichstärke light, als Sprite im HTML (Lizenz: `../_basis/icons/LICENSE-Phosphor.txt`). Die Logos in den Stimmen sind erfundene Beispiellogos aus `../_basis/logos.css`, vor dem Livegang durch echte, freigegebene ersetzen.

## Conversion (Playbook)

- Held: Unternehmen vor einer größeren Entscheidung, Problem Fehlentscheidungen und offene Punkte, Lösung Analyse, Konzept und Umsetzung mit festem Ansprechpartner (neue Unterzeile `hero__unter`)
- Primär-CTA „Erstgespräch anfragen“ in Kopfzeile, Held und Schlussbereich
- Titel „Unternehmensberatung Musterstadt | Klarheit | Beispielname“, Beschreibung mit Problem, Weg und Handlung
- Held-Beleg „98 % Weiterempfehlung durch Kunden“ als Beispielwert
- FAQ: Erstgespräch, Kosten des Aufschiebens, Zwischenstände, Unternehmensgröße, Kostenfestlegung, Übergabe (Beispielantwort)
- Kein Formular, Ziel ist das Erstgespräch per E-Mail
