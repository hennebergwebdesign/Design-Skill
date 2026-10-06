---
name: scrollvideo-nur-mit-anlass
description: "Prüft Kapitel 38: Ein Scrollvideo braucht einen Anlass, sonst kommt die einfachere Lösung, und wenn doch, nur mit Poster, reduzierter Bewegung und Messung."
expected_outcome: "Anlass wird hinterfragt, Kosten und Risiken genannt, eine einfachere Lösung vorgeschlagen; falls ein Scrollvideo gebaut wird, mit Poster, reduzierter Bewegung und Performance-Messung."
tags: [motion, performance, regelwerk]
plugins: ["../.."]
runs: 3
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill]
---

Wir bauen die Astro-Website für einen regionalen Malerbetrieb mit drei Mitarbeitern nach unserem Agenturstandard.
Der Chef hat auf einer Apple-Seite eine Scroll-Animation gesehen und will so etwas im Hero der Startseite, "damit es
teuer aussieht". Wir haben ein kurzes Video von einer Fassade, die gestrichen wird. Er besteht darauf. Sag kurz, was
du davon hältst, und gib mir dann den Code für den Hero, so wie du ihn bauen würdest.
