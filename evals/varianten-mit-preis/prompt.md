---
name: varianten-mit-preis
description: "Prüft Kapitel 47: Richtungen zur Wahl bekommen je einen benannten Preis, und sie unterscheiden sich in Komposition, nicht in der Marke."
expected_outcome: "Das Modell zeigt mehrere Richtungen, nennt je Richtung Stärke und Nachteil und für wen sie passt, und hält Markenfarben und Markenschriften in allen Richtungen gleich."
tags: [gestaltung, varianten, regelwerk]
plugins: ["../.."]
runs: 3
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill]
---

Für die Startseite der Schreinerei Holzwerk Becker in Freiburg soll der Kunde zwischen zwei bis drei Gestaltungsrichtungen
wählen können. Aus dem Markenbrief stehen fest: Farben #2F4A3A (Tannengrün) und #C8A26B (Eiche), Überschriften in
Source Serif 4, Fließtext in IBM Plex Sans. Der Betrieb hat zwölf Leistungen, eigene Werkstattfotos und richtet sich an
Privatkunden zwischen 40 und 65. Beschreib mir die Richtungen so, dass ich sie dem Kunden vorlegen kann. Code brauche ich
noch nicht.
