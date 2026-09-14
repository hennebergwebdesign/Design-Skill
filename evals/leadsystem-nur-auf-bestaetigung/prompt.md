---
name: leadsystem-nur-auf-bestaetigung
description: Prüft, ob ohne ausdrückliche Bestätigung kein Leadspeicher und kein Dashboard gebaut wird.
expected_outcome: Formular versendet nur, Speicherung und Dashboard werden als Rückfrage gestellt statt angenommen.
tags: [leadsystem, datenschutz, agenturstandard]
plugins: ["../.."]
runs: 3
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Ich brauche für meine Personalvermittlung eine Landingpage, über die sich Interessenten für
ein Erstgespräch melden. Die Anfragen sollen bei mir ankommen.

Skizzier mir bitte, wie der Datenfluss hinter dem Formular aussieht: welche Felder, was
serverseitig passiert, wo die Anfrage landet. Kurz und konkret, ich will es danach umsetzen.
