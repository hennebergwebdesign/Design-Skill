# Zusatzskills: Auswahl, Prüfung, Lücken

Sechs Quellen wurden am 24.11.2026 geprüft (`coreyhaines31/marketingskills`, `Owl-Listener/designer-skills`, `jakubkrehel/skills`,
`AgriciDaniel/claude-seo`, `travisvaleri/fontpool`, `MengTo/Skills`). Ergebnis: **vier Skills und ein MCP-Server sind sinnvoll, der Rest nicht.**
Grund: Von jedem installierten Skill steht die Beschreibung in jedem Kontext, bei jeder Aufgabe, ob er gebraucht wird oder nicht. Die sechs Quellen
liefern zusammen 443 Skills mit rund 3,4 MB `SKILL.md`. Ein Regelwerk, das ohnehin rund 1 MB Referenzen trägt, wird davon nicht besser, nur
teurer und widersprüchlicher (Konvention „Fremde Skills werden destilliert").

## Prüfergebnis

| Quelle | Skills, Größe der `SKILL.md` | Lizenz | Skripte, Hooks, Netz | Versteckte Zeichen |
|---|---|---|---|---|
| marketingskills | 53, rund 850 KB | MIT | Prospecting und Werkzeug-Skripte, nur Doku mit `curl` | keine (geprüft: cro, popups, lead-magnets) |
| designer-skills | 111, rund 300 KB | MIT | Prüfskript für den Marketplace | nicht geprüft, nicht gewählt |
| jakubkrehel/skills | 16, rund 139 KB | MIT | keine | keine |
| claude-seo | 40 Skills, 20 Agenten, viele Python-Skripte | MIT | **PostToolUse-Hook bei jedem Schreiben** (Python), Installer je Erweiterung, API-Anbindungen | keine (geprüft: seo, seo-local, seo-technical, Hook) |
| fontpool | 1 Skill plus MCP-Server | MIT | **lädt aus dem Netz** (api.fontshare.com, api.fontsource.org), schreibt Dateien und hängt an ein Stylesheet an | keine |
| MengTo/Skills | 223, rund 1,6 MB | MIT | Videoskripte mit Prozessstart (Python, Node), Hunderte Effekte | keine (geprüft: ui) |

Geprüft heißt: Lizenzdatei gelesen, nach Skripten, Hooks, Prozessstart und Anweisungen an den Agenten gesucht, auf versteckte Unicode-Zeichen gescannt.
**Nicht geprüft:** der Inhalt der nicht gewählten Skills im Einzelnen, das Verhalten im Betrieb, `fontpool` gegen laufendes Netz.

## Entscheidung je Quelle

| Quelle | Entscheidung | Was | Grund |
|---|---|---|---|
| jakubkrehel/skills | **installieren** (`--zusatz`) | `better-interface` (Gesamtbericht, rangiert), `better-typography` | prüft fertige Oberflächen mit genauen Werten; überschneidet sich mit 29, 30, 32, ersetzt sie nicht. Nur als Prüfer nach dem Bau, nie als zweites Regelwerk beim Entwurf |
| marketingskills | **installieren** (`--zusatz`) | `cro`, `popups` | füllt Lücken (Popups, Lead Magnete fast nicht abgedeckt, 2 Treffer im Bestand). Auf Zuruf: `lead-magnets`, `offers`, `pricing`, `ab-testing` |
| marketingskills | nicht | `copywriting`, `marketing-psychology`, `seo-audit`, `ai-seo`, `schema`, die übrigen | stehen schon in 12, 34, 35, 36, 45, 49, 51, 05, 31, 46. `ai-seo` hat allein 190 KB. Anzeigen, E-Mail, Social, Vertrieb sind nicht das Agenturgeschäft |
| fontpool | **MCP, mit Zustimmung** | Schriftkatalog und Selbsthosting | löst die häufigste Schwäche (immer dieselben Schriften) an der Quelle. Läuft im Netz und schreibt Dateien, deshalb nie ohne Zustimmung. Lizenz jeder Schrift prüfen, Selbsthosting bleibt Pflicht |
| claude-seo | **nicht installieren** | nur auf Zuruf einzelne Skills (`seo-technical`, `seo-local`) in einem Audit-Projekt | der Hook läuft bei jedem `Write`, 40 Beschreibungen im Kontext, Python mit API-Schlüsseln. Unser Bestand (05, 31, 46, `pruefe-geo`) deckt den Bau ab. Übernommen ist nur der Hinweis zu `FAQPage` |
| MengTo/Skills | **nicht installieren** | `no-ai-design-slop` und `audit-ai-design-slop` nur zur Ansicht | decken sich mit 26 und 55. Die Effekt-Skills (WebGL, Shader, Partikel) nur auf ausdrücklichen Wunsch und mit Leistungsmessung |
| designer-skills | **nicht installieren** | | allgemeine UX-Prozesse (Recherche, Design Ops, Prototypen), nicht Websites für Handwerk und Dienstleister. Die Plugins `design:*` der Umgebung decken Kritik und Handover |

## Lücken im Skillset

| Lücke | Stand | Weg |
|---|---|---|
| Popups, Exit Intent, Lead Magnete | kaum abgedeckt | `cro`, `popups` per `--zusatz`; jede Einwilligung und jeder Einblendzeitpunkt bleibt unter den Regeln aus `consent-und-dienste.md` und 02 (keine Blocker) |
| Angebots- und Preisseiten | nur Randnotizen in 06 und 53 | `offers`, `pricing` auf Zuruf; Verknappung bleibt wegen § 5 UWG verboten (12, `wondelai`-Hinweis im Installer) |
| Schriftkatalog mit echten Schriften | Sperrliste, aber keine Suche | fontpool, mit Zustimmung |
| Prüfdurchlauf auf einer Änderung (PR) | `interface-review` aus jakubkrehel nicht gewählt | nur bei Bedarf, 29 und die Prüfskripte reichen für den Erstentwurf |
| Shader und WebGL als Gestaltung | Three.js in 38 nur mit freigegebener Erlebnisidee | MengTo-Effekte nur auf Wunsch |
| Programmatische SEO, Wettbewerbsseiten, Anzeigen, E-Mail | nicht im Agenturgeschäft | bewusst keine Abdeckung |

## Installation

```bash
bash scripts/install-quellskills.sh --zusatz
```

Der Schalter installiert genau vier Skills in `.claude/skills/` des Kundenprojekts und nennt den MCP-Befehl, ohne ihn auszuführen. Einzeln:
`npx --yes skills add jakubkrehel/skills --skill better-interface --agent claude-code`. Vorher gilt `arbeitsdisziplin.md` Abschnitt 9a (fremde Skills lesen).
Die Befehle sind **nicht in dieser Umgebung gelaufen**, `bash -n` ist bestanden, die Skills selbst sind nicht installiert.

## Verwandt

`arbeitsdisziplin.md` (9a), `slop-pruefung.md`, `../../webdesign-conversion/references/57-erstentwurf-kern.md`, `../../webdesign-conversion/references/26-geschmack-und-ki-tells.md`.
