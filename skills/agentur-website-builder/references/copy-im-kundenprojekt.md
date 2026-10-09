# Copy im Kundenprojekt

Wie gute Texte entstehen, steht in
`../../webdesign-conversion/references/12-copywriting.md`: Botschaftshierarchie,
Headline-Formeln, Buttontexte, Fehlermeldungen, deutsche Eigenheiten, die Strichregel.
Dieses Kapitel regelt den Umgang mit Texten, die vom Kunden kommen. Wie ein Satz je nach Stelle
der Seite gebaut wird (Zielgruppe ohne Vorwurf, Wirkprinzip, realistische Behauptung, ruhige
Einwandzeile, drei echte Optionen, ehrliche Einschränkung), steht in
`../../webdesign-conversion/references/34-ueberzeugungsausloeser.md`. Wirkprinzip, stärkster
Beleg und Einschränkung liefert immer der Kunde.

## Inhalt

- Grundregel
- Prüfung gelieferter Texte
- Ergänzte Abschnitte kennzeichnen
- Entwurf aus einem Modell einsetzen
- Muster der stärksten Wettbewerber, nicht ihre Sätze
- KI-Text und Wasserzeichen
- Zweiter Durchgang und fünf Prinzipien
- Selbst formulierte Texte gegen den KI-Klang prüfen

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
* Beginnt die FAQ jede Antwort mit der Antwort, und stehen dort Weichmacher („eigentlich“, „vielleicht“), die
  nichts aussagen? Regeln in `../../webdesign-conversion/references/35-autoritaet-im-text.md`.
* Wirft der Heldenbereich der Zielgruppe etwas vor („die meisten machen es falsch“), und ist jedes
  absolute Versprechen („garantiert“, „über Nacht“) belegt oder vom Kunden zugesagt?

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

## Entwurf aus einem Modell einsetzen

Entsteht ein Textvorschlag mit einem Modell, kommt er als reiner Text mit dem Sektionsnamen als
Überschrift, nie als Markup. Das Modell füllt nur die Lücken der Seitenstruktur, erfindet keine neuen
Sektionen und fasst das HTML nicht an. Danach wird er Satz für Satz gelesen, mit der Kurzprobe aus
`../../webdesign-conversion/references/45-huerde-laenge-und-leserfuehrung.md`, Abschnitt 9: gesprochen,
Nutzen für den Leser, wahr laut Markenbrief. Typische Funde: Klassennamen oder `span` im Text,
Zwischenzeilen im Akkordeon, die nichts sagen, und eine Leistung, die das Modell aus der Liste
herausgegriffen hat, als wäre sie das ganze Angebot. Eingesetzt wird in einer eigenen Sitzung, siehe
`aenderungsrunden-und-layoutschutz.md`, Abschnitt 5.

## Muster der stärksten Wettbewerber, nicht ihre Sätze

Vor dem eigenen Text lohnt der Blick auf die Texte der fünf stärksten Wettbewerber der Nische
(Quelle: ein Video zu Claude Design, Jay E, RoboNuggets, 27.09.2026). Notiert werden **Muster**:
Ansprache, Satzlänge, Form der Nutzenaussage, Stil der Handlungsaufforderung, Umgang mit Einwänden.
Daraus entstehen Regeln für den Markenbrief (`sprache`), keine Formulierungen.

* Kein Satz eines Wettbewerbers wird übernommen oder nur umgestellt. Grund: Urheberrecht und
  Irreführung (§ 5 UWG), und ein Text, der wie der Wettbewerber klingt, trägt keine Position.
* Ruft der Skill dafür fremde Seiten ab, gilt Tor 1 der Designrecherche: erst vorlegen, dann abrufen
  (`designrecherche-ablauf.md`).
* Die Regeln stehen im Markenbrief, damit jede spätere Sitzung dieselbe Stimme trifft.

## KI-Text und Wasserzeichen

Anthropic und andere Anbieter haben laut einem Video (Jay E, RoboNuggets, 17.08.2026) statistische
Textwasserzeichen angekündigt, die sich auf die Wortwahl legen und nicht aus sichtbaren Zeichen
bestehen. Die Angaben im Video (Zeitpunkt, Modelle, Verfahren, Prüfwerkzeug) sind hier **nicht gegen
die Hersteller geprüft**. Für die Arbeit folgt daraus nur, was ohnehin Standard ist:

* Jede KI-Copy wird redaktionell überarbeitet: Fakten, Kundensprache, eigener Ton.
* Kein Angebotstext verspricht „nicht als KI erkennbar". Das ist weder belegt noch ein Leistungsversprechen,
  das die Agentur halten kann.
* Hat ein Kunde Vorgaben zu „von Menschen geschrieben" (Verbände, Wissenschaft, Ausschreibungen), wird das
  vor dem Schreiben geklärt, nicht danach.
* Ob und wie KI-erzeugte Inhalte gekennzeichnet werden müssen, hängt vom Einsatz ab und ist im Einzelfall
  zu klären. Arbeitsdokument, keine Rechtsberatung.

## Zweiter Durchgang und fünf Prinzipien

Nach `deslop-check.mjs` ein zweiter Durchgang von Hand oder mit einem **anderen Modell**, als es den Text
geschrieben hat: Es erkennt die Muster des ersten weniger als dessen Ausgabe. Jede Änderung wird mit
Begründung vorgelegt und Zeile für Zeile geprüft, nicht pauschal übernommen.

| Prinzip | Prüffrage | Gegengewicht |
|---|---|---|
| Ohne Denkarbeit verständlich | Muss der Leser rechnen oder übersetzen? | Fachwort nur mit Erklärung (`35-autoritaet-im-text.md`) |
| Den Schmerz zuerst | Beginnt die Sektion beim Problem des Besuchers? | Kein Vorwurf an den Leser (`34-ueberzeugungsausloeser.md`) |
| Konkrete Aufgabe statt Allgemeinplatz | Welche Zahl, welcher Ort, welche Frist? | nur Belegtes, nichts erfinden |
| Eine Aussage je Bildschirm | Trägt die Sektion genau einen Gedanken? | Die Kernbotschaft bleibt im ersten Bildschirm (`12-copywriting.md`) |
| Bildhafte Sprache | Zeigt der Satz eine Situation? | keine Bilder, die der Kunde nicht belegen kann |

Quelle: drei Videos (Jay E, Jack Roberts, 2026), Prinzipien in eigenen Worten, siehe `CREDITS.md`, Version 4.14.

Läuft der zweite Durchgang bei einem anderen Anbieter, gilt für Kundentexte dasselbe wie für jeden Dienst:
nur mit geklärter Auftragsverarbeitung, und personenbezogene Angaben (Namen in Kundenstimmen,
Teamseiten) bleiben draußen (`../../webdesign-conversion/references/07-recht-dsgvo.md`). Der Text ist
danach wieder ein Entwurf: `deslop-check.mjs` und der Abgleich mit den Belegen laufen erneut.

**Gute Paare sammeln.** Wird ein Vorher-Nachher-Paar freigegeben (schwacher Satz, starker Satz mit
Beleg des Kunden), kommt es mit Datum in die Projekt-`CLAUDE.md` unter „Textbeispiele". Fünf echte
Paare zeigen Stil und Tiefe besser als eine weitere Regel, und die nächste Sitzung schreibt im selben
Ton. In eine Sammlung über Projekte hinweg nur ohne Kundennamen und erst nach Rückfrage.

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
