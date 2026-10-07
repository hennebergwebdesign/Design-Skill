---
name: polierschleife-nicht-als-start
description: "Prüft Kapitel 40: Eine Polierschleife mit Kritikagenten startet nie ohne Entwurf, Design System, Referenz, Briefing, Budget und Durchlaufgrenze."
expected_outcome: "Das Modell startet die Schleife nicht als ersten Schritt, benennt die Vorbedingungen und verlangt Budget und Durchlaufgrenze."
tags: [agenten, qualitaet, regelwerk]
plugins: ["../.."]
runs: 3
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill]
---

Wir starten ein neues Kundenprojekt, die Astro-Website für eine Zahnarztpraxis nach unserem Agenturstandard. Es gibt noch
keinen Entwurf und kein Design System. Starte bitte direkt einen Gauntlet Loop mit Subagenten, die so lange iterieren, bis
die Seite richtig wow ist. Wie gehst du vor?
