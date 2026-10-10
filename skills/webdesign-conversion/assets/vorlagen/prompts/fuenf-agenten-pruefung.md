# Fünf-Agenten-Prüfung: 20 Punkte, ein Zusatzblock, eine Fix-Liste

Ablauf und Entscheidungen gegen die Quelle: `47-claude-design-hacks.md`, Abschnitt 6. Die Agenten **lesen
nur** und ändern keine Datei. Jeder Befund: Regelnummer, Fundort, Schwere (hoch, mittel, niedrig), Lösung in
einer Zeile. Jeder Agent meldet außerdem tote Buttons, kaputte Links und übrig gebliebene Platzhaltertexte.
Die Skripte laufen vorher: `pruefe-seitenbasis.mjs`, `pruefe-breakpoints.mjs`, `pruefe-motion.mjs`,
`pruefe-geo.mjs`, `pruefe-kontrast.mjs`. Ein Agent hebt keinen Skriptfehler auf.

## Auftrag

```
R: Meine Seite: [[FEHLT: Datei, Ordner oder Adresse]]. Prüfliste: diese Datei. Markenbrief: [[FEHLT]].
I: Prüfe die Seite. Starte fünf Unteragenten, einen je Block der Liste, dazu einen sechsten für Recht und
   Auslieferung. Jeder prüft seine Punkte und meldet Befunde. Agenten lesen nur.
S: Jeder Agent liefert eine Liste: Regelnummer, Fundort, Schwere (hoch, mittel, niedrig), Lösung in einer Zeile.
   Teste bei 375 und 1280 px Breite.
E: Führe die Listen zu einer Fix-Liste zusammen und zeige sie mir. Ändere nichts, bis ich "GO" schreibe. Danach
   behebe alles selbst, damit nie zwei Agenten an einer Datei arbeiten. Lasse die fehlgeschlagenen Prüfungen
   erneut laufen. Zeige Vorher-Nachher-Bilder.
```

## Agent 1: Layout und Handy

- [ ] 1. Mobile first: Das Layout bei 360 px ist die Grundlage. Seitenrahmen höchstens 1200 bis 1440 px, Textspalten höchstens 75 ch.
- [ ] 2. Breakpoints folgen dem Inhalt: Jeder existiert, weil das Layout dort bricht. Test bei 320, 768, 1024 und 1440 px. Kein seitliches Scrollen.
- [ ] 3. Fließende Schrift und Abstände mit `clamp()`, keine Sprünge an Breakpoints, Zoom bis 200 Prozent möglich, Viewport sperrt den Zoom nicht.
- [ ] 4. Fließtext mindestens 16 px. Bedienflächen mindestens 44 mal 44 px, 8 px Abstand (WCAG 2.5.8 verlangt mindestens 24 mal 24).

## Agent 2: Schrift und Rhythmus

- [ ] 7. Fließtext linksbündig, nie Blocksatz. Der Held liest sich in Z-Form, der Hauptbutton sitzt am Ende des Blicks. Überschriften beginnen mit dem Schlüsselwort.
- [ ] 8. Zeilenlänge 45 bis 75 Zeichen, Textblöcke `max-width: 65ch`.
- [ ] 9. Zeilenhöhe im Fließtext mindestens 1,5, in großen Überschriften 1,0 bis 1,2. Absatzabstand mindestens 0,75 em.
- [ ] 10. **Eine** Abstandsskala und **eine** Schriftskala aus `tokens.css`. Keine Zwischenwerte wie 13 oder 27 px.

## Agent 3: Farbe und Zustände

- [ ] 11. Kontrast: Text 4,5:1 (große Schrift 3:1), Icons, Rahmen und Fokusring mindestens 3:1. Farbe ist nie das einzige Signal.
- [ ] 12. Farb-Tokens: Komponenten nutzen Namen wie `--bg`, `--fg`, `--akzent`. Keine losen Hexwerte in Komponenten. Dunkelmodus ändert nur Tokens.
- [ ] 13. Fünf Zustände: Jeder Button, Link und jedes Feld hat Ruhe, Hover, `:focus-visible`, Gedrückt, Deaktiviert. Fokusring mindestens 2 px und 3:1.
- [ ] 14. Leer-, Lade- und Fehlerzustand sind gestaltet. Laden zeigt ein Skelett, leer sagt, was hierher gehört und was als Nächstes zu tun ist, ein Fehler steht am Feld und sagt, wie er zu beheben ist.

## Agent 4: Bewegung, Tempo, Zugang

- [ ] 15. Bewegung 150 bis 300 ms mit ease-out. `prefers-reduced-motion` gilt. Nichts blitzt mehr als dreimal je Sekunde. Kein Autoplay ohne Pause.
- [ ] 16. Platz ist reserviert: Bilder und Einbettungen mit `width` und `height` oder `aspect-ratio`. CLS unter 0,1.
- [ ] 17. Tempo auf einem Mittelklasse-Handy: LCP unter 2,5 s, INP unter 200 ms, CLS unter 0,1. Budget für Heldenbild und JavaScript: im Projekt festlegen (Vorschlag der Quelle: 200 KB und 300 KB gzip, ungemessen). Höchstens zwei Schriftfamilien.
- [ ] 18. Struktur: Kopf, Navigation, `main`, Fußzeile. Sprunglink. Genau eine `h1`, keine übersprungene Ebene. Die ganze Seite funktioniert mit der Tastatur.

## Agent 5: Botschaft und Handlung

- [ ] 5. Eine Hauptaktion je Bildschirm: ein gefüllter Akzentbutton je Bildschirmhöhe, mindestens 44 px hoch. Derselbe Button wiederholt sich auf langen Seiten.
- [ ] 6. Der erste Bildschirm beantwortet in fünf Sekunden: Was ist das, für wen, was tue ich als Nächstes. Prüfen bei 1366 mal 768 und bei 375 px.
- [ ] 19. Formulare: sichtbares Label an jedem Feld, richtiger Eingabetyp und `autocomplete`, Prüfung beim Verlassen des Felds, so wenige Felder wie möglich.
- [ ] 20. Teilen-Ebene: Titel höchstens 60 Zeichen, Beschreibung höchstens 155, ein Teilen-Bild 1200 mal 630 px, Favicon-Satz, `theme-color`, JSON-LD für das Hauptthema der Seite.

## Agent 6: Recht und Auslieferung (Zusatz dieses Skills, nicht Teil der Quelle)

- [ ] A. Impressum und Datenschutzerklärung sind von jeder Seite erreichbar (`07-recht-dsgvo.md`, `08-pflichtseiten-technik.md`).
- [ ] B. Kein Tracking und keine Fremdeinbettung vor der Einwilligung. Ablehnen ist so leicht wie Zustimmen.
- [ ] C. Keine Schriften, Icons oder Skripte von Fremdservern (Google Fonts, unpkg, jsDelivr, cdnjs) in der Auslieferung. Im Entwurf erlaubt, in der Abnahme nicht.
- [ ] D. `lang="de"` gesetzt, Formular mit Einwilligungstext, Telefon- und Mail-Links getestet.

## Was ein Skript davon sieht

`pruefe-seitenbasis.mjs` deckt Teile von 3, 16, 18, 19, 20 und von A bis D ab. Kontrast prüft
`pruefe-kontrast.mjs`, Bewegung `pruefe-motion.mjs`, Breakpoints und Ziele `pruefe-breakpoints.mjs`. Nicht
automatisch prüfbar sind Geschmack, Verständlichkeit und Tempo auf einem echten Gerät (Lighthouse oder
Messung auf dem Handy).

## Fix-Liste

Seite: [[FEHLT]]  Datum: [[FEHLT]]

Regeln: Agenten tragen Zeilen ein, sie ändern die Seite nie. Der Behebende ändert nichts, bevor der
Auftraggeber unten GO schreibt. Eine Zeile je Fix: sagen, was zu tun ist, nicht nur, was falsch ist.

| # | Agent (1 bis 6) | Regel | Ort | Problem | Fix | Schwere | Status |
|---|---|---|---|---|---|---|---|
| 1 | 1 | 4 | Anmelde-Button, Handy | Beispiel: Bedienfläche 32 px hoch | auf 44 px erhöhen | hoch | offen |
| 2 | | | | | | | |

Schwere: hoch heißt, die Aufgabe ist nicht schaffbar. Mittel heißt, es sieht oder funktioniert schlecht.
Niedrig heißt Feinschliff. Status: offen, behoben oder übersprungen (mit Grund).

GO: [ja / nein]  Datum:

Nach dem Fix: jede fehlgeschlagene Prüfung läuft erneut und besteht, Vorher-Nachher-Bilder bei 375 und
1280 px liegen ab, jede übersprungene Zeile hat einen Grund.
