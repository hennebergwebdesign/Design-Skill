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

## Werkzeuge außerhalb der Skills: MCP Server und CLI

Stand 27.11.2026, auf Wunsch des Inhabers. Gelesen wurden die Repositoryseiten (Lizenz, Tools, Schlüssel), **nicht** der Quelltext. Die Befehle stammen aus den READMEs und sind **nicht in dieser Umgebung gelaufen**.

| Werkzeug | Zweck | Lizenz, Schlüssel | Was nach außen geht | Entscheidung |
|---|---|---|---|---|
| Playwright MCP (`@playwright/mcp`, Microsoft) | echter Browser, Geräteemulation (`--device`, `--mobile`), Screenshots | Quelle offiziell, Lizenz auf der Seite nicht gelesen | nichts, lokal | global. Für Prüfschleifen bleibt `playwright-cli` Standard (weniger Kontext, laut Quelle), siehe `browser-pruefung-mit-playwright-cli.md` |
| Context7 (`@upstash/context7-mcp`) | aktuelle Dokumentation zu Astro, Tailwind, GSAP, Cloudflare | MIT, Schlüssel empfohlen (höhere Grenzen), nicht Pflicht | Frage, Bibliotheks-ID und Sprache an Upstash. Ob Projektdateien übertragen werden, steht nicht auf der Seite | global. Nie Kundendaten, Zugangsdaten oder Mailadressen in die Frage schreiben |
| Lighthouse MCP (`@danielsogl/lighthouse-mcp`) | Core Web Vitals, Barrierefreiheit, SEO, Budgetprüfung | MIT, kein Schlüssel, Node 22 und Chrome nötig | Seite sagt dazu nichts | global. Ersetzt `pruefe-breakpoints` und die Abnahme nicht, es misst nur |
| PageSpeed Insights MCP (`pagespeed-insights-mcp`, ruslanlap) | Labor und Felddaten von Google | Apache 2.0, **Google API Schlüssel Pflicht** | die geprüfte Adresse geht an Google, und Google ruft sie selbst ab | nur mit Schlüssel und nur für öffentlich erreichbare Seiten. Nicht für eine Kundenseite vor Freigabe. README nennt 6 Tools (Fassung 2), andere Quellen 18 oder 19 (Fassung 1) |
| Firecrawl MCP (`firecrawl-mcp`, offiziell) | lesen, durchsuchen, crawlen, strukturiert extrahieren | MIT, Cloud braucht `FIRECRAWL_API_KEY`, ohne Schlüssel nur scrape, search und parse mit Begrenzung, Selbsthosting über `FIRECRAWL_API_URL` | die Adresse und der Seiteninhalt an den Dienst | global nur mit Schlüssel. **`maxCredits` immer setzen**: beim Tool `agent` liegt die Grenze sonst bei 2.500 Credits. Die Abrufregeln (robots.txt, eigene Seite, Freigabe) stehen in `firecrawl-recherche.md` und gelten weiter |
| Agent Reach (`Panniantong/Agent-Reach`) | Web, YouTube, RSS, Exa Suche, Reddit, GitHub, viele Social Plattformen | MIT | Webseiten über Jina Reader (die Adresse geht an einen Dritten), Suche über Exa | **nicht automatisch**, Begründung unten |

### Agent Reach: warum nicht in der Voreinstellung

1. **Der Einstieg lässt den Agenten eine Installationsanleitung ausführen** (`docs/install.md`). Diese Datei wurde hier **nicht gelesen** (Abruf nicht freigegeben). Das widerspricht ohne Prüfung der Regel aus `arbeitsdisziplin.md`, Abschnitt 9a, fremden Anweisungen nicht blind zu folgen.
2. **Für angemeldete Plattformen wird laut Seite die Login Sitzung aus Chrome kopiert**, meist die des Hauptkontos. Ein Bericht über das Projekt rät zu einem Wegwerfkonto und nennt Verstöße gegen die AGB von Twitter/X, LinkedIn und anderen als Risiko. Für Kundenkonten oder das Agenturkonto kommt das nicht in Frage.
3. **Namensfalle:** Ein PyPI Paket `agent-reach` gehört laut Repositoryseite nicht zum Projekt. Manche Skill Verzeichnisse zeigen trotzdem `pip install agent-reach`. Nie so installieren.
4. **Lücke:** Instagram und Facebook stehen nicht in den gelesenen Beschreibungen. Für die Kundenrecherche löst es also die häufigste Frage nicht.
5. **Kein Freibrief gegen Sperren:** Zero-Config-Kanäle laufen ohne Anmeldung, aber ob eine Seite blockt, entscheidet die Seite. Umgehen von Schutzmaßnahmen ist nicht Teil des Agenturablaufs.

Wenn trotzdem: Repository klonen, auf einen Commit festlegen, `docs/install.md`, `scripts/` und `test.sh` lesen, nur Kanäle ohne Anmeldung aktivieren (Web, YouTube, RSS, Exa, GitHub), kein Cookie Import, in einem eigenen Ordner statt global. Nutzen: YouTube Untertitel und RSS, nicht Kundenseiten.

### Installation

```bash
bash scripts/install-quellskills.sh --werkzeuge
```

Der Schalter fragt vorher, registriert Playwright, Context7 und Lighthouse global (`claude mcp add --scope user`), Firecrawl und PageSpeed nur, wenn der Schlüssel in `FIRECRAWL_API_KEY` beziehungsweise `GOOGLE_API_KEY` steht, und bietet die globalen Grundregeln aus `token-sparsamkeit.md` an. Schlüssel landen dabei im Klartext in `~/.claude.json`: kein Schlüssel mit Zahlungsfunktion, nur eigene Konten mit Begrenzung. Agent Reach installiert er nie.

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
