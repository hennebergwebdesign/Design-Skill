---
name: landingpage-ohne-navigation
description: Prüft, ob das Landingpage-Playbook die Navigation weglässt, obwohl ein bestehendes Layout eine mitbringt.
expected_outcome: Grundgerüst ohne Hauptnavigation, obwohl die bestehende Seite eine hat, mit Begründung.
tags: [landingpage, playbook]
plugins: ["../.."]
runs: 3
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Unsere Website hat Startseite, Leistungen, Referenzen, Über uns und Kontakt, alle fünf in der
Hauptnavigation im Kopf. Der Fuß wiederholt diese Links und hat zusätzlich Impressum und
Datenschutz.

Ich schalte jetzt Google Ads auf die Anzeige „Flachdach sanieren ohne Produktionsstopp" und
brauche dafür eine eigene Landingpage im selben Layout.

Gib mir das HTML-Grundgerüst dieser Seite, mit Kopf, Sektionen und Fuß. Die Überschriften
schreib im Klartext, nicht als Platzhalter.
