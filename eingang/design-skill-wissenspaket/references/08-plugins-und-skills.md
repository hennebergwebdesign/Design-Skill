# Plugins und Skills: Guardrails, Writing, Antwortstil

Quelle: Video 1 (ca. Aug 2026).

## 1. DCG (Destructive Command Guard): Pflicht Setup

Anlass im Video: Ein bekannter KI Entwickler (Matt Shumer) berichtete, dass ein Frontier Modell per rm -rf fast seine ganzen Mac Dateien löschte. Mehrere ähnliche Berichte. Lehre: Bei jedem neuen Modell bleibt dieses Restrisiko.

* Funktionsweise: Hook in Claude Code, der gefährliche Shell Befehle blockiert, sofern nicht ausdrücklich freigegeben. Läuft deterministisch im Hintergrund, kostet null Tokens, unabhängig davon, was der Agent "denkt".
* Test im Video: Opferordner, "alles in einem Befehl löschen". Ergebnis: "blocked by DCG", Befehl muss von Hand ausgeführt werden. Regeln anpassbar (nur bestimmte Befehle oder Bereiche).
* Übernahme: In jedes Projekt und besonders in Umgebungen mit Zugriff auf Kundenordner, Deploy Skripte und Cloudflare Zugänge. Zusätzlich: Löschen nie ohne Freigabe, Backups, Git Commit vor großen Läufen.

## 2. Canvas UI und Loading Orbs

Siehe 02-ressourcen-bibliothek.md. Workflow: im Browser Parameter einstellen (weniger Iridescence, weniger Grain, statisch statt schwebend), Code kopieren, Claude geben. Ein Beispiel Einsatz war eine Produktseite des Kanals.

## 3. no AI slop (Peter Yang)

Open Source Skill, entfernt über 20 Muster maschinell wirkender Texte: Gegensatz Konstruktionen ("nicht X, sondern Y"), Aufmacher wie "Was dir niemand sagt". Empfehlung des Autors: bestehenden eigenen Humanizer Skill nicht ersetzen, sondern mit der Quelle verbessern lassen (Versionsstand pflegen). Wer keinen Skill hat, importiert ihn direkt.

Übertragbar auf Deutsch: eigene Liste verbotener Muster aufbauen (Beispiele unten in templates/tone-of-voice-skill-prompt.md).

## 4. "I have ADHD" Antwortstil

Open Source Skill, 10 Regeln: Aktion zuerst, Mehrschritt Aufgaben nummerieren, weniger Ausführlichkeit, Antwort nicht vergraben. Als Modus per Slash Befehl. Autor kombiniert mit eigenem /quick Skill: /quick3 liefert genau drei Stichpunkte mit fettem Titel je Punkt.

Übernahme: kurzer Modus für Statusberichte an den Kunden und für Agent Antworten in Projekten.

## Prinzipien aus dem Video

* Bestehende Skills lieber veredeln als ersetzen (Versionsbaum).
* Deterministische Hooks für Sicherheit, Skills für Stil.
* Installationsanleitung als PDF an den Agenten geben, er richtet es ein (Setup Prompt Prinzip).
