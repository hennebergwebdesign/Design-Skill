## Erweiterung: Design Wissen aus Video Analyse (Oktober 2026)

Dieser Abschnitt ergänzt die bestehende SKILL.md. Details liegen in `references/` (Ordner relativ anpassen).

### Wann anwenden

Bei jedem neuen Entwurf, Redesign oder Polishing einer Kundenwebsite, bei Motion Konzepten, bei Bildgenerierung und beim Aufsetzen von Agent Umgebungen.

### Pflichtablauf

1. Design System klären (references/01). Ohne System kein Entwurf. Bei Henneberg Marken Arbeit das Henneberg Design System nutzen.
2. Referenzen und Wettbewerber sammeln. Copy Muster der Top 5 der Nische notieren.
3. Fonts, Farben, Icon Pack festlegen (references/02). Standard Font und Standard Look sind verboten.
4. Komponenten aus Bibliotheken wählen, bevor etwas neu gebaut wird.
5. MVP bauen. Checkliste aller Sektionen und Breakpoints führen und abhaken.
6. Review mit Screenshot, pro Sektion Crop und Zoom. Abgleich mit Briefing, Marke, Zielgruppe, Conversion Ziel.
7. Polieren: Audit Skill, optional Gauntlet Loop (references/03) mit Budget und Durchlauf Limit, Tweaks Panel für Feinschliff.
8. Motion zuletzt, erst Storyboard Frames, dann GSAP (references/05).
9. Copy redaktionell überarbeiten, Anti Slop Liste und Tone of Voice anwenden (templates/tone-of-voice-skill-prompt.md).

### Harte Regeln

* Kein cremefarbener Default Hintergrund, keine kursiven Zierwörter, keine KI gezeichneten Icons, ein Icon Pack pro Projekt.
* Gauntlet Loop nie als erster Prompt. Immer Referenz und Limit mitgeben.
* Zerstörerische Shell Befehle nur mit Freigabe (DCG oder gleichwertiger Hook), Backup vor großen Läufen.
* Kosten bei Generatoren vorab nennen, Budget Deckel setzen, keine API Keys in Chat oder Repo.
* Geschriebene Texte ohne Bindestriche.
* Modell, Preis und Rechtsaussagen aus den Videos vor Kundeneinsatz prüfen.

### Prompt Vorlagen

templates/gauntlet-loop-prompt.md, design-system-from-reference.md, tone-of-voice-skill-prompt.md, generate-skill-blueprint.md, storyboard-prompt.md, effort-test-prompt.md, hig-skill-prompt.md, tweaks-panel-skill-prompt.md.
