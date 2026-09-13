# Herkunft und Danksagung

Dieser Skill ist eine eigenständige, deutschsprachige Synthese. Er zitiert die folgenden
Quellen nicht wörtlich, sondern führt ihre Substanz in einem System zusammen. Alle
eingeflossenen Skills stehen unter MIT-Lizenz beziehungsweise sind öffentlich verfügbar.

## Eingeflossene Skills

| Quelle | Was daraus eingeflossen ist |
|---|---|
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills) — MIT, © GreenSock | Motion-Kapitel: Kern-API, Timelines, ScrollTrigger, `matchMedia` für reduzierte Bewegung, Performanceregeln (`transform`/`opacity`, `will-change`, `stagger`, `quickTo`), React-Cleanup |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) — MIT, © Bergside / typeui.sh | Stilrichtungen als Ausgangspunkte, Struktur von Design-System-Leitfäden, Qualitätsgates |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — MIT, © Next Level Builder | Priorisierung der UX-Regelkategorien (Barrierefreiheit vor Interaktion vor Performance vor Stil), Touchziele, Formular- und Navigationsregeln |
| [anthropics/claude-code → plugins/frontend-design](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) | Anti-Schablonen-Kapitel: die wiederkehrenden generischen Muster, Zwei-Durchgänge-Verfahren (Plan → Prüfung → Code), Typografie-Tells, Schreibregeln für Interface-Texte |
| [shadcn-ui/ui → skills/shadcn](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn) — MIT, © shadcn | Komponentenkapitel: Kompositionsregeln, Styling-Regeln, Formularprimitive, CLI-Ablauf, Projektkontext-Felder |

## Inhaltliche Grundlage

**Website-Conversion-Playbook 2026** (That's it. Marketing, Victor & Tim) — das
Sechs-Bereiche-Framework, die sieben teuersten Website-Fehler, die fünf Umsetzungsfehler,
die Zielgruppen- und USP-Formeln, die Above-the-Fold-Formel, das F-Pattern, die
3-Klick-Regel, die 2-Sekunden-Regel, die fünf Breakpoints, die OnPage-SEO-Formeln, die
CTA-Hierarchie, das 10-Sekunden-Formular, die Trust-Elemente und der Aufbau der
„Über uns"-Seite gehen auf dieses Playbook zurück.

## Hausstandards

Die Kapitel zu Projektstruktur, Designtokens, Pflichtseiten und die technischen Vorlagen
sind aus produktiven Astro-Projekten von Henneberg Webdesign destilliert — unter anderem
`vitesy` und `foamlab`. Von dort stammen die Regeln, die sich nur im echten Bau zeigen:
der Umgang mit deutschem Textumbruch, die zweistufige Typoskala, die Kontrastregel für
helle Markenfarben, das Off-Canvas-Panel außerhalb transformierter Container, das
Aufräumen nach `gsap.from()` mit `once: true`, das Scoping-Problem bei dynamisch erzeugten
Knoten und die Sitemap-`noindex`-Konsistenz.

## Rechtliche Inhalte

Die Abschnitte zu DSGVO, DDG, TDDDG, BFSG und UWG sind nach bestem Wissen zusammengestellt
und **stellen keine Rechtsberatung dar**. Stand der Recherche: die in den Texten genannten
Daten. Vor dem Einsatz anwaltlich prüfen lassen.
