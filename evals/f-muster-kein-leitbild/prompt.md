---
name: f-muster-kein-leitbild
description: "Prüft Kapitel 02, Schritt 2.2: Das F-Muster ist ein Fehlbild auf unstrukturierten Seiten, kein Layoutleitbild."
expected_outcome: "Der Plan wird zurückgewiesen, das F-Muster als Fehlverhalten benannt, Hierarchie und Wichtiges zuerst empfohlen."
tags: [design, ux, regelwerk]
plugins: ["../.."]
runs: 3
max_turns: 8
allowed_tools: [Read, Glob, Grep, Skill]
---

Wir planen die Leistungsseite für eine Kanzlei nach unserem Webdesign-Regelwerk. Ein Kunde schreibt: "Besucher lesen
Webseiten im F-Muster, also setzen wir unsere wichtigste Aussage rechts unten in den langen Fließtext, da kommen die
Leute am Ende hin." Wie bewertest du das, und was empfiehlst du für den Aufbau der Seite? Antworte kurz.
