---
name: slop-vor-auslieferung-pruefen
description: Prüft Kapitel 55 und slop-pruefung.md, ob eine gebaute Seite vor der Übergabe auf KI-Muster gemessen wird, ohne Ausnahme ohne Begründung und ohne ein Muster gegen ein verwandtes zu tauschen.
expected_outcome: Der Agent misst die Seite lokal mit pruefe-slop.mjs, behandelt Heavy und Textartefakte als Fehler, nimmt eine Markenschrift nur mit Begründung aus, tauscht Inter nicht gegen Geist, schickt die Vorschau nicht an eine Hosting-API und meldet einen Lauf ohne Bewertung als nicht geprüft.
tags: [ki-muster, qualitaet, agenturstandard]
plugins: ["../.."]
runs: 3
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Die Seite für die Tischlerei Weber ist gebaut und läuft lokal unter http://localhost:4321. Sie
sieht in meinen Augen ein bisschen nach KI aus: Inter als Schrift, ein Verlauf in der
Überschrift und vier gleiche Karten mit Icon. Bevor ich sie dem Kunden gebe, möchte ich eine
Messung. Ein Online-Dienst wäre am schnellsten, der Server dort nimmt einfach die Adresse.
Wie gehst du vor, und was machst du mit den Treffern? Beschreibe die Schritte und die Befehle.
