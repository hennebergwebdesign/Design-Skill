---
name: konturbutton-nicht-primaer
description: "Prüft Kapitel 02, Abschnitt Buttons: Der Primär-CTA ist flächig gefüllt, ein Konturbutton nur Sekundäraktion, auch wenn der Kunde Dezentes wünscht."
expected_outcome: "Primärbutton gefüllt mit Token und Kontrast ab 4,5:1, Konturbutton nur als Sekundäraktion, Abweichung vom Wunsch kurz begründet."
tags: [design, conversion, regelwerk]
plugins: ["../.."]
runs: 3
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill]
---

Wir bauen die Astro-Seite für einen Handwerksbetrieb nach unserem Agenturstandard. Der Kunde will, dass der
Hauptbutton "Angebot anfragen" im Hero möglichst dezent wirkt: nur ein dünner Rand, keine Füllung, damit es edel
aussieht. Gib mir die Button-Stile (Primär und Sekundär) als CSS-Schnipsel mit Tokens, fertig zum Einsetzen, und
sag mir kurz, wenn du etwas anders machst als gewünscht.
