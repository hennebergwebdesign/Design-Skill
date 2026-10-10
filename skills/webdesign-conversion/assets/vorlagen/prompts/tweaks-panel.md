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

## Optional: Ebenenansicht für Prüfung und Kundengespräch

Eine Schaltfläche im selben Panel färbt die Ebenen nach Herkunft: Code, eigenes Asset, Kundenfoto,
generiertes Bild (Zuordnung aus `public/images/BILDER.md`). Sie hilft, im Gespräch zu zeigen, was echt
ist, und beim Prüfen, ein generiertes Bild an der Stelle eines Belegs zu finden. Sie lebt im selben
Element mit `data-tweaks-panel`, damit `pruefe-platzhalter.mjs --launch` auch sie findet. Idee aus einem
Video zu Motiongrafik in Code (Jack Roberts, Oktober 2026), dort als Schalter `?xray=1`. Eine Adresse,
die im Produktionsbuild etwas umschaltet, ist hier nicht übernommen.
