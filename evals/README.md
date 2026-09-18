# Eval-Suite

Neun Fälle, jeder gegen eine Regel, die sich erfahrungsgemäß in der dritten Sitzung
zurückdreht. Sieben prüfen das Regelwerk aus `webdesign-conversion`, zwei den Agenturstandard
aus `agentur-website-builder`. Format und Grader-Typen: `claude plugin eval`.

```bash
claude plugin eval .                                   # alle Fälle, 3 Läufe, mit Baseline
claude plugin eval . --case keine-gedankenstriche      # ein Fall
claude plugin eval . --runs 1 --ablation none          # schnell, ohne Baseline
```

Der Bericht landet unter `results/<zeitstempel>/report.html`. `results/` ist ausgenommen.

## Die Fälle

| Fall | Prüft | Grader |
|---|---|---|
| `keine-gedankenstriche` | harte Grenze gegen `–` und `—` im Seitentext | 2 × regex `not_contains` |
| `landingpage-ohne-navigation` | Landingpage-Playbook, obwohl das bestehende Layout eine Navigation mitbringt | 2 × llm |
| `keine-erfundenen-belege` | harte Grenze gegen erfundene Zahlen und Kundenstimmen | regex auf `[[FEHLT`, llm |
| `strategie-vor-design` | Reihenfolge Strategie vor Design, Anti-Schablone | 2 × llm |
| `icons-abgeleitet` | Icon-Set wird abgeleitet statt aus einer Bibliothek gezogen | llm |
| `stellenanzeige-agg` | geschlechtsneutrale Anzeige, keine Altersbezüge | regex, llm |
| `consent-ohne-keks` | Agenturvorgabe: kein Keks als Symbol, Ablehnen gleichrangig, echte Blockierung | regex `not_contains`, llm |
| `leadsystem-nur-auf-bestaetigung` | kein Leadspeicher und kein Dashboard ohne ausdrückliche Bestätigung | 2 × llm |
| `kundendesignsystem-schlaegt-referenz` | Vorrang des gelieferten Designsystems vor jeder externen Referenz | regex `not_contains`, 2 × llm |

Jeder Fall hat zusätzlich einen `tool_used: Skill`-Grader. Der zählt in einem
Zwei-Arm-Lauf nicht zur Bewertung, sondern zeigt nur, dass der Skill überhaupt gegriffen hat.

## Die wichtigste Regel beim Schreiben eines Falls

**Ein Fall, der ohne den Skill genauso besteht, misst nichts.** Deshalb immer mit Baseline
laufen lassen (`--ablation with-without`, die Voreinstellung) und auf das Δ sehen, nicht auf
die Punktzahl.

Der erste Entwurf von `landingpage-ohne-navigation` fragte nur nach einem Sektionsplan. Δ war
**0.00**: das Modell lässt bei einer geplanten Landingpage auch ohne Skill die Navigation weg.
Erst die Verschärfung machte den Fall aussagekräftig: eine bestehende Seite mit fünf
Navigationspunkten, ein Auftrag „im selben Layout", und HTML als Ergebnis. Dann kommt die
Navigation ohne Skill zuverlässig mit.

## Gemessene Werte

Stand 13.09.2026, Claude Code 2.1.270, zwei Läufe je Arm:

| Fall | mit Skill | ohne Skill | Δ |
|---|---|---|---|
| `keine-gedankenstriche` | 1.00 | 0.50 | **+0.50** |
| `landingpage-ohne-navigation` | 1.00 | 0.25 | **+0.75** |

Beim Strich-Fall setzte das Modell ohne Skill in **jedem** Lauf einen Halbgeviertstrich in die
deutschen Headlines, mit Skill in keinem. Das ist der Beleg dafür, dass die Regel nötig ist und
dass sie wirkt.

Die vier übrigen Fälle der ersten Runde bestehen mit Skill (je ein Lauf, Punktzahl 1.00). Ihr
Δ ist noch nicht gemessen. Wer sie schärfen will, prüft zuerst, ob sie ohne Skill nicht
ohnehin bestehen.

`kundendesignsystem-schlaegt-referenz` ist mit der harten Grenze zum Vorrang des
Kundendesignsystems hinzugekommen und **noch nicht gelaufen**. Die Erwartung ist ein hohes Δ,
weil ein Modell ohne Skill die auffälligen Werte der Referenz (Serife, Cremeton, Terrakotta,
großer Radius) zuverlässig übernimmt, obwohl daneben eine Tokendatei steht. Bis zur ersten
Auswertung ist das eine Vermutung, kein Messwert.

`consent-ohne-keks` und `leadsystem-nur-auf-bestaetigung` sind mit dem Agenturskill
hinzugekommen und **noch nicht gelaufen**. Beide sind bewusst auf ein messbares Δ angelegt:
ohne Skill greift ein Modell beim Cookie-Banner zuverlässig zum Keks-Emoji, und bei einer
Leadseite baut es das Lead-Schema samt Dashboard ungefragt mit. Vor der ersten Auswertung
gilt das aber als Vermutung, nicht als Messwert.

## Was die Suite bereits gefunden hat

`landingpage-ohne-navigation` deckte einen echten Fehler im Playbook auf. Das Modell erkannte
die Regel korrekt, **fragte dann aber um Erlaubnis, statt zu liefern**:

> „Soll ich es so bauen (empfohlen), oder bestehst du auf dem identischen Kopf und Fuß der
> Hauptseite mit voller Navigation?"

Damit entstand keine Seite, keine Überschrift und kein Ergebnis. Die Regel war so formuliert,
dass sie wie eine Geschmacksentscheidung las, die Zustimmung braucht. `landingpage.md` sagt
jetzt ausdrücklich: anwenden, in einem Satz begründen, nicht nachfragen. Danach Δ +0.75 und
beide Läufe bei 1.00.

Das ist der Zweck der Suite: nicht die Punktzahl, sondern der Befund.

## Einen Fall hinzufügen

```
evals/<name>/
├─ prompt.md              Frontmatter plus der Prompt als Text
└─ graders/<name>.md      ein Grader je Datei
```

`prompt.md` braucht `plugins: ["../.."]`, damit das Plugin auch dann gefunden wird, wenn die
automatische Erkennung nicht greift. `allowed_tools` auf das Nötige begrenzen; die Fälle hier
laufen mit `[Read, Glob, Grep, Skill]` und schreiben nichts.

Grader-Typen: `regex`, `tool_used`, `tool_order`, `file_exists`, `llm`, `baseline`.

**Bei einem `llm`-Grader die FAIL-Bedingung genauso ausschreiben wie die PASS-Bedingung.**
Ein Rubrik-Text, der nur sagt, was gut ist, lässt den Richter raten. Und der Prompt muss das
verlangen, was der Grader prüft: `message-match` schlug zuerst fehl, weil der Prompt ein
„Grundgerüst" verlangte und Platzhalterüberschriften dafür legitim sind.
