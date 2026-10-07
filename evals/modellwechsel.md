# Modellwechsel: Skills und Anweisungen auf den Prüfstand

Gilt für **dieses Repository**, nicht für Kundenprojekte. Ein neues Modell kann Anweisungen überflüssig
machen, die für ein älteres nötig waren, und überflüssige Anweisungen bremsen. Jede Regel kostet bei jeder
Aufgabe Kontext. Deshalb ist der Bestand keine einmalige Installation, sondern wird bei einem Modellwechsel
geprüft, mit den Evals als Messinstrument.

Quelle des Gedankens: ein Video von Nate Herk (Oktober 2026) mit Aussagen aus einem Interview mit Boris
Cherny (Claude Code), im Paket `skill-pflege-und-modelltests` geliefert. Die Aussagen sind **Erfahrungswerte
aus der Softwareentwicklung**, hier nicht nachgeprüft. Das Video nennt keinen Testplan, das Verfahren unten ist
eine eigene Ableitung. Konkrete Zahlen daraus (zum Beispiel wie stark ein Systemprompt gekürzt wurde) sind
nicht übernommen.

## Wann

* bei jedem neuen Hauptmodell,
* spätestens nach sechs Monaten (ein Vorschlag, kein Messwert),
* sobald Ergebnisse spürbar schlechter werden oder das Modell sich an eine Regel nicht mehr hält.

## Ablauf

| # | Schritt | Wie hier |
|---|---|---|
| 1 | Ausgangslage sichern | Branch anlegen, Liste aller Regeln, Hooks und Anweisungen führen |
| 2 | Lauf A und B | `claude plugin eval .` mit Baseline (`--ablation with-without`, Voreinstellung): A ist mit Skill, B ohne. Die Suite macht den Zweiarmvergleich schon |
| 3 | Zusätzliche Aufgaben | drei bis fünf echte Aufgaben je Skill (Landingpage Struktur, Copy für Handwerker, Audit, Komponente), frische Sitzungen, gleiche Prompts |
| 4 | Vergleichen | Inhalt, Struktur, Markentreue, Fehlerquote, Tokenverbrauch, Bedienaufwand (musste ich mich wiederholen?) |
| 5 | Je Regel entscheiden | Tabelle unten |
| 6 | Protokoll | Zeile im Änderungsprotokoll unten, Modell und Datum nennen |
| 7 | Übernehmen | erst im Branch prüfen, dann zusammenführen. Version nachziehen (`CLAUDE.md`, Konventionen) |

## Entscheidung je Regel

| Befund | Entscheidung |
|---|---|
| Ohne Skill gleich gut und die Regel ist **Ablauf oder Korrektur** eines früheren Fehlers | verschlanken oder streichen |
| Ohne Skill fehlen nur Marke, Stil, Pflichtbausteine | auf diese Teile reduzieren |
| Skill macht das Ergebnis messbar besser (Δ deutlich über 0) | behalten |
| Selten gebraucht oder doppelt | zusammenführen oder löschen (zuerst prüfen, ob der Inhalt an anderer Stelle steht) |
| Das Modell wirkt durch die Regel gehemmt oder abgelenkt | umschreiben auf Ziel, Standard, Leitplanken, Abschlusskriterien |
| Regel besteht ohne Skill, **aber der Fall ist zu leicht** | Fall verschärfen (Regel in dieser README: ein Fall ohne Δ misst nichts), Regel nicht vorschnell streichen |

## Was nie nach einem Δ von 0 gestrichen wird

Ein Δ von 0 heißt nur, dass **dieses Modell bei diesem Prompt** die Regel von allein trifft. Es heißt nicht,
dass die Regel überflüssig ist. Deshalb bleiben, mit Grund:

* **Rechtliche und fachliche Pflichten** (Consent, Impressum, Datenschutz, BFSG): Die Pflicht hängt nicht vom
  Modell ab, ein späteres Modell oder ein anderer Prompt kann sie wieder verfehlen.
* **Harte Grenzen** aus `SKILL.md` (erfundene Belege, Freigabetore, Markenextraktion): Sie schützen vor
  einem Schaden, der teurer ist als der Kontext, den sie kosten. Ein Befund ändert hier höchstens den Eval,
  nicht die Grenze.
* **Marke und Agenturvorgaben** (Stack, Tokens, Handschrift): Sie sind Entscheidungen, keine Korrekturen.
* **Freigabereihenfolge** der Phasen im Bauablauf: Sie ist ein Tor-System, keine Schrittliste für schwache Modelle.

Gestrichen oder verschlankt werden können vor allem Anleitungen, **wie** etwas zu tun ist, wenn das Modell es
nachweislich allein gut macht, und Korrekturen für Fehler, die es nicht mehr macht.

## Grenzen des Verfahrens

* Zwei bis drei Läufe je Arm sind keine belastbare Stichprobe, ein einzelner Befund ist ein Hinweis.
* Weniger Anweisungen können mehr Nacharbeit und damit mehr Tokens bedeuten. Verbrauch **mitmessen**, nicht nur Qualität.
* Der Rat aus der Softwareentwicklung (Orchestrierung und Build Skills überflüssig) gilt nicht automatisch für
  Markenarbeit. Testen, nicht blind löschen.
* Eine Schlussformel wie „kein Prototyp, sondern ein Ergebnis, das morgen live gehen könnte" soll laut Quelle
  besser wirken als eine neutrale Fassung. Das ist **ungetestet** und kann als Variante in einem Fall laufen, nicht als Dogma.
* Die Evals messen nur, was sie abfragen. Dass alle bestehen, beweist nicht, dass die Kapitel ohne Skill nichts beitragen.

## Verifikation in den Regeln selbst

Eine Regel, die ein Ergebnis verlangt, nennt auch, **woran es belegt wird** (Skript, Screenshot, Eval, Mensch).
Das ist die Pflicht „jede harte Grenze braucht eine Prüfung" aus `CLAUDE.md`. Bei der Durchsicht wird jede Regel
auf diesen Beleg geprüft: Steht er nicht da, wird er ergänzt oder die Regel als Checkbox benannt.

## Änderungsprotokoll

Die erste Prüfung nach diesem Verfahren **steht aus**. Die bisherigen Messwerte in `README.md` stammen von
verschiedenen Tagen, das jeweilige Modell ist dort nicht durchgehend vermerkt und gilt als unbekannt.

| Datum | Modell | Regel oder Skill | Entscheidung | Grund |
|---|---|---|---|---|
| | | | | |
