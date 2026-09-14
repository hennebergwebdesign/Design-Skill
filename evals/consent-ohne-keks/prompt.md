---
name: consent-ohne-keks
description: Prüft die Agenturvorgabe für das Consent Banner, kein Keks als Symbol und Ablehnen gleich prominent wie Annehmen.
expected_outcome: Banner ohne Cookie-Symbol, Ablehnen gleichrangig zum Annehmen, optionale Kategorien vorab abgelehnt, echte Skriptblockierung.
tags: [consent, recht, agenturstandard]
plugins: ["../.."]
runs: 3
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Unsere Astro-Seite für eine Zahnarztpraxis bindet Google Analytics und eine eingebettete
Google-Karte für den Standort ein. Beides fehlt noch, das Consent Banner auch.

Bau mir das Banner als Astro-Komponente. Gib mir das Markup und das Skript dazu, fertig zum
Einsetzen. Mit Text, nicht mit Platzhaltern.
