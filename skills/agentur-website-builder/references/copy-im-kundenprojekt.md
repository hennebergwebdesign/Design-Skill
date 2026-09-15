# Copy im Kundenprojekt

Wie gute Texte entstehen, steht in
`../../webdesign-conversion/references/12-copywriting.md`: Botschaftshierarchie,
Headline-Formeln, Buttontexte, Fehlermeldungen, deutsche Eigenheiten, die Strichregel.
Dieses Kapitel regelt den Umgang mit Texten, die vom Kunden kommen.

## Grundregel

Gelieferte Texte werden übernommen, nicht umgeschrieben. Der Kunde hat sie freigegeben, oft
nach mehreren Runden. Ein eigenmächtig verbesserter Satz kostet mehr Zeit in der Abstimmung,
als er einbringt.

Erlaubt ohne Nachfrage:

* offensichtliche Rechtschreib und Zeichenfehler korrigieren
* Umlaute korrekt setzen, ae, oe und ue zu ä, ö und ü, ss zu ß wo es hingehört
* Zeilenumbrüche und Absätze für die Ausgabe anpassen
* eine Überschrift kürzen, wenn sie im Layout dreifach umbricht, bei gleicher Aussage

Nicht erlaubt:

* neue Behauptungen, Zahlen, Zeitangaben, Garantien, Preise, Auszeichnungen oder Referenzen
* Umformulierung, die die Aussage verschiebt
* erfundene Kundenstimmen oder Zertifikate
* Leistungen ergänzen, die nirgends belegt sind

Ein Gedankenstrich im gelieferten Text ist kein Fehler des Kunden, sondern seine
Entscheidung. `scripts/pruefe-striche.mjs` meldet ihn trotzdem. Solche Treffer werden nicht
still geändert, sondern im Abschlussbericht benannt und zur Entscheidung gestellt. Für
selbst formulierte Texte gilt die harte Grenze unverändert.

## Prüfung gelieferter Texte

Gelieferte Texte einmal gegen diese Fragen lesen und Auffälligkeiten melden, nicht selbst
ändern:

* Ist in den ersten fünf Sekunden klar, was angeboten wird und für wen?
* Steht der Nutzen vor der Methode?
* Gibt es genau eine Hauptaktion, oder konkurrieren mehrere?
* Sind die Aktionsschaltflächen konkret, also `Kostenlose Beratung anfragen` statt
  `Mehr erfahren`?
* Werden die naheliegenden Einwände behandelt, Preis, Aufwand, Dauer, Risiko?
* Gibt es Vertrauenselemente, und sind sie belegbar?
* Passt die Ansprache zur Zielgruppe des Kunden, du oder Sie durchgehend gleich?

## Ergänzte Abschnitte kennzeichnen

Wenn eine Sektion inhaltlich fehlt, damit die Seite funktioniert, etwa ein Ablauf in drei
Schritten oder ein Abschnitt gegen typische Einwände, darf ein Vorschlag geschrieben werden.
Er wird dann dreifach sichtbar gemacht, Markup und CSS stehen in
`../../webdesign-conversion/references/12-copywriting.md`:

1. als Kommentar `<!-- COPY-VORSCHLAG: nicht vom Kunden freigegeben -->` direkt darüber
2. als Attribut `data-copy-vorschlag` am Sektionselement, mit einer Markierung, die nur in
   der Entwicklungsansicht erscheint und nie in die Produktionsausgabe gelangt
3. als Eintrag im Abschlussbericht: welche Sektion, welcher Vorschlag, was der Kunde
   bestätigen muss

`node scripts/pruefe-platzhalter.mjs --launch` findet beides, `[[FEHLT: …]]` und
`data-copy-vorschlag`, und schlägt vor dem Livegang fehl, solange noch etwas offen ist.

Fehlende Angaben, die nur der Kunde liefern kann, kommen als
`[[FEHLT: Anzahl abgeschlossener Projekte]]` in den Text und in dieselbe Liste. Nie eine
plausible Zahl einsetzen.

## Selbst formulierte Texte gegen den KI-Klang prüfen

Jeder selbst formulierte Vorschlag geht durch:

```bash
node scripts/deslop-check.mjs src/components/sektionen/Leistungen.astro
node scripts/deslop-check.mjs --text "Wir begleiten Sie ganzheitlich auf Ihrem Weg."
```

Das Skript bewertet fünf Kriterien und gibt eine Punktzahl von 0 bis 5 aus: Füllfloskeln,
Substantivketten, leere Superlative, austauschbare Behauptungen ohne Beleg und die
Dreierfigur, die in jedem generierten Text auftaucht. Erst 5 von 5 geht in den Vorschlag an
den Kunden.

Ein Text, der dabei durchfällt, wird nicht geglättet, sondern konkret gemacht: Zahl statt
Adjektiv, Vorgang statt Substantiv, Zielgruppe statt Allgemeinheit.
