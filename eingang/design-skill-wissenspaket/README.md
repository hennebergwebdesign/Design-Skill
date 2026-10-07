# Design Skill Wissenspaket (Stand 07.10.2026)

Verdichtetes Wissen aus 9 YouTube Videos (Kanal RoboNuggets, Jay E), analysiert aus den Browser Tabs von Mike. Ziel: Strategien, Skills und Prinzipien in den Design Skill (hennebergwebdesign/Design-Skill) übernehmen.

## Inhalt

| Datei | Zweck |
|---|---|
| SKILL-ADDON.md | Fertiger Abschnitt für die SKILL.md des Design Skills (Regeln, Workflow, Trigger) |
| references/00-quellen.md | Alle 9 Videos mit URL, Datum, Länge, Kapiteln, genannten Ressourcen |
| references/01-design-system-workflow.md | 25 Claude Design Tricks, sortiert nach Phasen |
| references/02-ressourcen-bibliothek.md | Tools, Libraries, Gallerien, Fonts, Icons mit Einsatzzweck |
| references/03-gauntlet-loop.md | Generator Critic Loop: Prinzip, Aufbau, Grenzen |
| references/04-opus-5-5-prompting.md | 12 Prompting Regeln für Opus 5.5 |
| references/05-motion-und-video.md | Motion Graphics: 3 Level, Storyboard, Feedback Loop, SVG, GSAP |
| references/06-bildgenerierung-skill.md | /generate Skill Blueprint (Higgsfield Alternative) |
| references/07-jev-system1-modelle.md | Entscheidungsmodelle für Routing, Klassifikation, UI Auswahl |
| references/08-plugins-und-skills.md | Guardrails und Schreib Skills (DCG, no AI slop, ADHD Modus) |
| references/09-watermark.md | SynthID Textwatermark: Fakten und Folgen für Kundencopy |
| references/10-transfer-henneberg.md | Konkrete Übernahme in den Agentur Workflow (Astro, Cloudflare, Kundenprojekte) |
| templates/*.md | Kopierfertige Prompts |

## Einbau ins Repo

1. Ordner `references/` und `templates/` in den Design Skill Ordner kopieren (z. B. `Design-Skill/knowledge/`).
2. Den Inhalt von `SKILL-ADDON.md` an die bestehende `SKILL.md` anhängen oder als eigenen Abschnitt einfügen. Pfade im Addon bei Bedarf anpassen.
3. Ich hatte keinen Zugriff auf die Repo Struktur. Die Pfade sind deshalb relativ gehalten.

## Hinweise zur Qualität

* Quelle sind die automatisch erzeugten YouTube Transkripte plus Beschreibungen. Eigennamen wurden korrigiert (Entropic = Anthropic, cloud code = Claude Code). Bei unsicheren Namen steht "laut Video" oder ein Prüfhinweis.
* Modellnamen (Opus 5.5, Fable, Jev, GPT 5.6) und Zahlen sind so übernommen, wie sie im jeweiligen Video genannt werden. Vor Einsatz in Kundenprojekten gegenprüfen.
* Es sind bewusst keine Volltranskripte enthalten, sondern verdichtete Notizen mit Zeitmarken. Die Originale gehören dem Kanal.
* Die gratis PDFs des Kanals (Skool Community) wurden nicht abgerufen. Alles hier stammt aus den Videos selbst.
