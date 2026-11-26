# Token sparen: CLAUDE.md, Skills und Arbeitsweise

Alles, was dauerhaft im Kontext steht, kostet in jeder Runde. Dieses Kapitel legt fest, was dauerhaft stehen darf und was nur bei Bedarf gelesen wird. Grund: Der Kontext wird nicht pro Sitzung, sondern pro Runde bezahlt, und ein voller Kontext macht das Modell zugleich ungenauer.

## Die Größenregel für CLAUDE.md

| Datei | Ziel | Obergrenze | Grund |
|---|---|---|---|
| `CLAUDE.md` im Projektrepo | unter 8 KB | 10 KB | wird bei jedem Start komplett gelesen und bleibt im Kontext |
| `AGENTS.md` | unter 8 KB | 10 KB | gleiche Wirkung |
| `SKILL.md` | unter 500 Zeilen | 500 Zeilen | wird beim Aufruf komplett geladen |
| Referenz im Skill | gezielt lesen | über 100 Zeilen mit „## Inhalt" | wird nur geladen, wenn der Wegweiser sie nennt |

Messen mit `node scripts/pruefe-claudemd.mjs` im Projektordner, oder von Hand mit `wc -c CLAUDE.md`. Über 8 KB ist ein Hinweis, über 10 KB ein Fehler.

## Was in die CLAUDE.md gehört

- Projekt in drei bis fünf Sätzen: Kunde, Ziel, Zielgruppe
- Stack und Befehle (Entwicklung, Build, Prüfung)
- Harte Regeln und Randbedingungen, die man beim Ändern kaputt machen kann, jeweils mit Grund
- Umgebungsvariablen nur als Namen mit Zweck, nie Werte
- Ein Wegweiser je ausgelagertem Dokument: wann lesen, welcher Pfad

## Was nach docs/ gehört

| Inhalt | Datei | Hinweis |
|---|---|---|
| Änderungsverlauf | `docs/AENDERUNGSVERLAUF.md` | neueste Einträge oben, neue Einträge nie in die CLAUDE.md |
| Offene Punkte, Backlog | `docs/OFFENE-PUNKTE.md` | |
| Tracking, Consent, Dienstetabelle im Detail | `docs/TRACKING-UND-DATENSCHUTZ.md` | Randbedingungen bleiben als Kurzfassung in der CLAUDE.md |
| Befehlslisten, Werkzeuge | `docs/BEFEHLE.md` | |
| Annahmen, Briefing | `docs/ANNAHMEN.md`, `docs/BRIEF.md` | |

Beim Auslagern wird nichts gelöscht und nichts umformuliert. Der Text wandert wörtlich, in der CLAUDE.md bleibt der Wegweiser. Zum Prüfen vorher und nachher die Zeilenanzahl vergleichen.

Beispiel für einen Wegweiser:

```
## Änderungsverlauf
Steht in `docs/AENDERUNGSVERLAUF.md`, neueste Einträge oben. Nur gezielt nach dem betroffenen Bereich suchen. Neue Einträge dort anfügen.
```

## Pflicht bei jeder Änderungsrunde

1. Eintrag in `docs/AENDERUNGSVERLAUF.md` schreiben, nicht in die CLAUDE.md.
2. Wenn sich ein harte Regel ändert, die Regel in der CLAUDE.md anpassen, den Grund dort ergänzen.
3. Vor dem Abschluss `node scripts/pruefe-claudemd.mjs` laufen lassen. Meldet es einen Fehler, wird zuerst ausgelagert, dann abgeschlossen.

## Skills und Werkzeuge sparsam laden

- Skill Beschreibungen sind bei jedem Start geladen. Plugins, die ein Kundenprojekt nicht braucht, bleiben aus.
- Skills mit Referenzen nie komplett lesen. Erst das Inhaltsverzeichnis der `SKILL.md`, dann nur die genannte Referenz.
- Große Fremd Skills (zum Beispiel Scraper mit mehreren hundert KB Referenzen) nicht in das Kundenrepo unter `.claude/skills` legen. Sie gehören in ein eigenes Werkzeugrepo oder werden bei Bedarf installiert.
- Doppelte Ordner mit gleichem Inhalt (zwei Fassungen desselben Skills) sind doppelte Beschreibungen. Eine Fassung behalten.

## Arbeitsweise im Projekt

- Suchen vor Lesen: erst `grep` oder Dateisuche, dann nur den Treffer mit Zeilenbereich lesen. Dateien über 300 Zeilen nie komplett öffnen, wenn ein Bereich reicht.
- Eine Datei pro Sitzung höchstens einmal lesen. Was schon im Gespräch steht, nicht noch einmal laden.
- Breite Suchen über viele Dateien gehören in einen Unteragenten, der nur das Ergebnis zurückgibt.
- Prüfskripte mit knapper Ausgabe laufen lassen. Lange Logs auf die letzten Zeilen oder die Fehlerzeilen kürzen.
- Screenshots nur, wenn eine Entscheidung davon abhängt, und in der kleinsten brauchbaren Größe.
- Zwischen unabhängigen Aufgaben den Kontext leeren oder zusammenfassen, statt eine lange Sitzung weiterzuführen.
- Keine Zusammenfassung dessen, was gerade getan wurde. Ergebnis in ein bis zwei Sätzen, dann offene Punkte.
