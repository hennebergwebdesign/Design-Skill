# 12 Prompting Regeln für Opus 5.5

Quelle: Video 4 (24.09.2026), nach eigener Aussage des Autors aus Anthropics Prompting Guide gezogen. Modell und Details laut Video, vor produktivem Einsatz gegen die offizielle Doku prüfen.

1. Standard Effort auf medium setzen. Nur bei Bedarf erhöhen. Medium sei der Sweet Spot aus Leistung und Tempo.
2. Effort Level am eigenen Arbeitsablauf testen: Claude nimmt eine echte Aufgabe, fährt sie auf jedem Level, legt Ergebnisse nebeneinander (Vorlage: templates/effort-test-prompt.md).
3. AGENTS.md wird in Claude Code gelesen, wenn keine CLAUDE.md vorhanden ist. Eine einzige Instruktionsdatei für mehrere Coding Agents möglich.
4. Effort Wechsel mitten im Gespräch löscht den Cache nicht mehr (laut Video noch Beta). Vorher testen.
5. Gespeicherte Usage Resets (Einstellungen, Usage) aufheben, bis das Limit erreicht ist. Ablaufdatum beachten (im Video: 23. Oktober).
6. Anweisungen, die Claude zum Ausschreiben seines Denkens zwingen, können als "reasoning extraction" abgelehnt werden. Kein Reasoning Dump im System Prompt verlangen.
7. In langen Chats zwei Sätze in die CLAUDE.md: frühere Antworten gelten als erledigt, außer es wird danach gefragt. Verhindert unnötiges Nachgrübeln bei kurzen Folgefragen. Alternativ als Skill auf Abruf.
8. Bei langen Aufgaben eine Checkliste führen lassen, die am Ende jedes Turns geprüft wird. Zwischenstände können sonst fälschlich als Abschluss gelten.
9. Zeitbudget nennen ("in 3 Minuten fertig"), das Modell taktet sich danach.
10. Ohne Zeitbudget reichen die Worte "time matters". Laut Anthropic Tests beenden Agent Teams dann schneller.
11. Design Defaults bleiben (cremefarbener Hintergrund, kursive Wörter in Copy). Gegenmittel: Design System liefern oder konkret verbotene Stile auflisten.
12. Bei dichten Bildern (technische Zeichnungen, Charts) Crop und Zoom Werkzeuge geben (PIL, OpenCV), Bild in höchster Auflösung liefern. Spart Tokens, erhöht Genauigkeit.

## Daraus für den Design Skill

* Regel 11 und 12 sind direkt relevant: Design System Pflicht vor jedem Entwurf. Screenshot Reviews mit Crop und Zoom pro Sektion statt Ganzseiten Bild.
* Regel 8 für lange Seiten Builds: Checkliste aller Sektionen, Breakpoints, Meta Daten, die abgehakt werden.
* Regel 7 als Zusatz in die Projekt CLAUDE.md übernehmen.
