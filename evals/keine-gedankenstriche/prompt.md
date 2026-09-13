---
name: keine-gedankenstriche
description: Prüft die harte Grenze aus SKILL.md gegen Gedankenstriche im Seitentext.
expected_outcome: Fünf Headlines ohne – und ohne —, stattdessen Doppelpunkt, Komma oder zwei Sätze.
tags: [copywriting, harte-grenze]
plugins: ["../.."]
runs: 3
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill]
---

Ich bin Flachdachsanierer und arbeite für Gewerbebetriebe, die ihre Produktion während der
Sanierung nicht anhalten können.

Schreib mir fünf Headline-Vorschläge für meine Startseite. Nur die Headlines, je eine pro
Zeile, ohne Erklärung dazu.
