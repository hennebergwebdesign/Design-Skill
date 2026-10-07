# Tweaks-Panel: lokales Reglerpanel für den Feinschliff

Ein Entwicklungswerkzeug für die Abstimmung am Bildschirm. Es gehört nie in den Produktionsbuild.
`pruefe-platzhalter.mjs --launch` schlägt an, solange die Markierung `data-tweaks-panel` im Quelltext steht.

```
Baue ein Reglerpanel für [[FEHLT: Seite]] mit Reglern für Schriftgrößen, Zeilenhöhe, Sektionsabstand,
Farben (Rollen aus tokens.css) und Eckenradius. Das Panel schreibt nur CSS-Variablen auf :root.

Regeln:
- Das Wurzelelement trägt das Attribut data-tweaks-panel. Panel und Skript werden nur geladen,
  wenn import.meta.env.DEV wahr ist, nie im Build.
- Ein Button "Übernehmen" gibt die geänderten Werte als Diff für die Tokendatei aus. Ich trage sie
  ein, danach entfernst du Panel, Skript und Markierung.
- Kontrast und Mindestgrößen aus SKILL.md gelten auch im Panel: Werte, die 4,5:1 oder 14 px
  unterschreiten, werden abgelehnt.
```
