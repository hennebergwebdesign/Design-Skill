# Gauntlet Loop (Generator und Critic Subagents)

Quelle: Video 8 (06.08.2026). Ursprung: Matt Shumer, Post auf X. Andrej Karpathy ordnete solche "hyper custom worlds" als neue Fähigkeit ein, weil niemand so viel Handarbeit investieren würde, Modelle aber Ausdauer haben.

## Das Prinzip in drei Zeilen

1. Task: Was soll gebaut werden.
2. Build Method: Hauptagent teilt das Ziel in kleinste Teile, startet pro Teil einen Subagent, und je Teil einen separaten Critic Subagent, der das Ergebnis prüft (bei visuellen Aufgaben per Screenshot).
3. Bar to Hit: Messlatte, ab wann gestoppt werden darf, mit Referenz ("utterly wowed", Vergleich mit einem realen Produkt).

## Die drei Ebenen der Orchestrierung (laut Video)

1. Mensch prüft jede Ausgabe selbst.
2. Agent baut, Critic Agent prüft, beide iterieren bis zur Latte, erst dann kommt das Ergebnis zum Menschen.
3. Hauptagent verteilt an viele Worker, jeder mit eigenem Critic Partner, plus Abschlussphase (Judging).

Belegt wird das mit Anthropics Artikel "Building effective agents" (2024): Ein separater Evaluator verbessert Ergebnisse, weil Modelle ihre eigene Ausgabe tendenziell als gut genug ansehen.

## Tests im Video

* 3D Wohnungsrundgang aus Grundriss und Referenzfotos: rund 2 Stunden Laufzeit, Vergleichsbericht als HTML (Foto links, Screenshot rechts, Status bestanden oder durchgefallen). Ergebnis nah am Foto, Texturen noch verbesserbar.
* Produkt Landingpage (Ketone IQ): rund 1 Std 19 Min, Recherche Agents prüften Zahlen, dunkler und heller Modus, Animationen. Sah deutlich weniger nach KI aus, war aber nicht auf Markenbriefing (Designsystem der echten Marke wich ab).

## Grenzen (wichtig für Kundenprojekte)

* Nicht als Start Prompt einsetzen. Erst MVP oder Design System festlegen, dann Loop als "Warp Drive" zum Polieren. Sonst optimiert der Loop in die falsche Richtung.
* Hoher Tokenverbrauch und lange Laufzeit. Vorher Budget und Abbruch festlegen.
* Der Critic braucht ein Referenzbild oder eine Marken Spezifikation, gegen die er scheitern kann. Ohne Referenz stimmt er dem Generator zu (Kommentar im Video Umfeld, passt zur Aussage "Ketone Beispiel sah gut aus, war aber off brief").
* Ergänzungen aus Community Kommentaren (nicht vom Kanal, plausibel): Critic auf Widerlegen statt Bewerten trimmen, im Zweifel "durchgefallen", maximale Anzahl Durchläufe festlegen.

## Einsatz im Design Skill

Vorlage: templates/gauntlet-loop-prompt.md. Vorbedingungen: Design System liegt vor, Referenzseiten sind verlinkt, Budget und Durchlauf Limit stehen im Prompt. Ergebnis immer gegen Kundenbriefing und Markenregeln prüfen, nicht nur gegen "sieht gut aus".
