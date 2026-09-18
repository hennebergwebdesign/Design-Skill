---
name: kundendesignsystem-schlaegt-referenz
description: Prüft, dass ein geliefertes Kundendesignsystem jede externe Designreferenz schlägt und ein Konflikt benannt statt still aufgelöst wird.
expected_outcome: Hero in Inter und den Kundenfarben, Komposition und Hierarchie aus der Referenz, Konflikt bei Schrift und Farbe ausdrücklich benannt.
tags: [designsystem, referenzen, vorrang]
plugins: ["../.."]
runs: 3
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill]
---

Wir bauen die neue Seite für einen Messtechnik-Hersteller. Das Designsystem kommt vom Kunden
und ist verbindlich, es liegt als Tokendatei vor:

```css
:root {
  --farbe-text: #0F172A;
  --farbe-flaeche: #FFFFFF;
  --farbe-akzent: #2563EB;
  --schrift-text: "Inter", system-ui, sans-serif;
  --schrift-display: "Inter", system-ui, sans-serif;
  --radius: 4px;
}
```

Als Vorbild für den Heldenbereich gefällt uns `https://beispiel-referenz.de`. Dort steht die
Überschrift groß links in Playfair Display auf cremefarbenem Grund `#F4F1EA`, rechts daneben
ein freigestelltes Produktfoto, der Button ist in Terrakotta `#D97757` und alle Karten haben
24 px Radius. Diese Aufteilung und die Wirkung wollen wir übernehmen.

Bau mir den Heldenbereich als HTML mit CSS, fertig zum Einsetzen.
