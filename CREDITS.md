# Herkunft und Danksagung

Dieser Skill ist eine eigenständige, deutschsprachige Synthese. Er zitiert die folgenden
Quellen nicht wörtlich, sondern führt ihre Substanz in einem System zusammen. Alle
eingeflossenen Skills stehen unter MIT-Lizenz beziehungsweise sind öffentlich verfügbar.

## Eingeflossene Skills

| Quelle | Was daraus eingeflossen ist |
|---|---|
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills), MIT, © GreenSock | Motion-Kapitel: Kern-API, Timelines, ScrollTrigger, `matchMedia` für reduzierte Bewegung, Performanceregeln (`transform`/`opacity`, `will-change`, `stagger`, `quickTo`), React-Cleanup |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills), MIT, © Bergside / typeui.sh | Stilrichtungen als Ausgangspunkte, Struktur von Design-System-Leitfäden, Qualitätsgates |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), MIT, © Next Level Builder | Priorisierung der UX-Regelkategorien (Barrierefreiheit vor Interaktion vor Performance vor Stil), Touchziele, Formular- und Navigationsregeln |
| [anthropics/claude-code → plugins/frontend-design](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) | Anti-Schablonen-Kapitel: die wiederkehrenden generischen Muster, Zwei-Durchgänge-Verfahren (Plan → Prüfung → Code), Typografie-Tells, Schreibregeln für Interface-Texte |
| [shadcn-ui/ui → skills/shadcn](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn), MIT, © shadcn | Komponentenkapitel: Kompositionsregeln, Styling-Regeln, Formularprimitive, CLI-Ablauf, Projektkontext-Felder |

### In Version 2.0 zusätzlich eingeflossen

| Quelle | Was daraus eingeflossen ist |
|---|---|
| [kylezantos/responsive-craft](https://github.com/kylezantos/responsive-craft), MIT | Eskalationspfad intrinsisches CSS → Container Queries → Media Queries, die Responsive-Szenarien (Tabelle auf 375 px, Sidebar-Kollaps, Sticky-Koordination), der Gedanke der gleichzeitigen Mehr-Breakpoint-Prüfung |
| [wondelai/skills](https://github.com/wondelai/skills), MIT | `refactoring-ui` (Wathan/Schoger): Spacing als primäres Hierarchiesignal, mit zu viel Weißraum anfangen, große Skalensprünge. `storybrand-messaging` und `cro-methodology`: der Bogen aus sechs Schritten und die Botschaftshierarchie. `scorecard-marketing`: der Selbsttest als Vorqualifizierung im Recruiting-Funnel. `web-typography`: Zeilenlänge und Skalen |
| [iart-ai/web-animation-skills](https://github.com/iart-ai/web-animation-skills), MIT | `accessible-animation`: gestufte `prefers-reduced-motion`-Behandlung statt Alles-oder-nichts. `svg-animation`: Strich-Zeichnen über `pathLength`, Morphing nur bei echtem Zustandswechsel |
| [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills), MIT | Die Trennung von Feld- und Labordaten und die Schwellenwerte für LCP, INP und CLS, zusätzlich als Nachschlagewerk installierbar |
| [jezweb/claude-skills](https://github.com/jezweb/claude-skills), MIT | `icon-set-generator`: Rasterausrichtung und konsistente Strichstärke im Icon-Set |
| [Anthropic `theme-factory`](https://mcpservers.org/agent-skills/anthropic/theme-factory) | Die Methode zur Erzeugung vollständiger Token-Skalen (Rampe über mehrere Stufen, 4-px-Basis, Elevation). Das Skill selbst ist bewusst **nicht** installiert, weil es Anthropics eigene Marke anwendet und damit genau die Schablone ist, gegen die `10-visuelle-richtung.md` steht |

**Zwei Quellen mit Vorbehalt.** `influence-psychology` (Cialdini) und
`hundred-million-offers` (Hormozi) aus derselben Sammlung liefern Beweisführung und
Angebotsaufbau, enthalten aber Verknappung und Dringlichkeit als Werkzeug. Das kollidiert mit
der UWG-Regel dieses Skills. Übernommen wurde der Angebotsaufbau, nicht die Druckmittel; die
Grenze steht ausdrücklich als Tabelle in `12-copywriting.md`.

## Rechtsrecherche für Version 2.0

Der Recruiting-Teil stützt sich auf nachgeprüfte Quellen, nicht auf Erinnerung. Die beiden
Punkte, die in verbreiteten Vorlagen falsch stehen:

- **§ 26 Abs. 1 Satz 1 BDSG ist als eigenständige Rechtsgrundlage nicht mehr anwendbar.**
  EuGH vom 30.03.2023, C-34/21, zu § 23 HDSIG: keine „spezifischere Vorschrift" im Sinne des
  Art. 88 DSGVO. BAG vom 08.05.2025, 8 AZR 209/21, zieht das für § 26 Abs. 1 Satz 1 BDSG
  ausdrücklich nach. Bewerbungsverfahren stützen sich daher auf Art. 6 Abs. 1 lit. b DSGVO.
- **Die Löschfrist von sechs Monaten steht in keinem Gesetz.** Sie leitet sich aus
  § 15 Abs. 4 AGG (zwei Monate zur schriftlichen Geltendmachung) und § 61b Abs. 1 ArbGG
  (drei Monate zur Klage) plus Puffer ab. Die Entschädigungsgrenze von drei Monatsgehältern
  nach § 15 Abs. 2 AGG gilt nur unter der Bedingung, dass die Person auch bei
  benachteiligungsfreier Auswahl nicht eingestellt worden wäre.

Die Pflicht- und Empfehlungsfelder für `JobPosting` sind an der Google-Dokumentation für
strukturierte Daten geprüft.

**Das bleibt trotzdem keine Rechtsberatung.** Vor dem Einsatz anwaltlich prüfen lassen.

## Inhaltliche Grundlage

**Website-Conversion-Playbook 2026** (That's it. Marketing, Victor & Tim): das
Sechs-Bereiche-Framework, die sieben teuersten Website-Fehler, die fünf Umsetzungsfehler,
die Zielgruppen- und USP-Formeln, die Above-the-Fold-Formel, das F-Pattern, die
3-Klick-Regel, die 2-Sekunden-Regel, die fünf Breakpoints, die OnPage-SEO-Formeln, die
CTA-Hierarchie, das 10-Sekunden-Formular, die Trust-Elemente und der Aufbau der
„Über uns"-Seite gehen auf dieses Playbook zurück.

## Hausstandards

Die Kapitel zu Projektstruktur, Designtokens, Pflichtseiten und die technischen Vorlagen
sind aus produktiven Astro-Projekten von Henneberg Webdesign destilliert, unter anderem
`vitesy` und `foamlab`. Von dort stammen die Regeln, die sich nur im echten Bau zeigen:
der Umgang mit deutschem Textumbruch, die zweistufige Typoskala, die Kontrastregel für
helle Markenfarben, das Off-Canvas-Panel außerhalb transformierter Container, das
Aufräumen nach `gsap.from()` mit `once: true`, das Scoping-Problem bei dynamisch erzeugten
Knoten und die Sitemap-`noindex`-Konsistenz.

## Rechtliche Inhalte

Die Abschnitte zu DSGVO, DDG, TDDDG, BFSG und UWG sind nach bestem Wissen zusammengestellt
und **stellen keine Rechtsberatung dar**. Stand der Recherche: die in den Texten genannten
Daten. Vor dem Einsatz anwaltlich prüfen lassen.
