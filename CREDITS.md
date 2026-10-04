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

### In Version 3.0 zusätzlich eingeflossen

| Quelle | Was daraus eingeflossen ist |
|---|---|
| **Agentur-Lieferstandard von That's it. Marketing / VFDESIGN LTD** | Der komplette Skill `agentur-website-builder`: der Phasenablauf von der Analyse bis zur Übergabe, die festen Stackvorgaben (Astro auf Cloudflare Pages, Resend, Turnstile, D1, Google Places, Consent im Eigenbau), die Intake-Fragenkataloge mit Auslösern, der Umgang mit gelieferter Kundencopy, das Format des Abschlussberichts und die einsatzfertigen Vorlagen für Consent-Banner, Formularroute, Mailtemplate und Bewertungsabruf |

Beim Zusammenführen wurden die Inhalte des Agenturskills, die das Regelwerk bereits
abdeckte, nicht doppelt abgelegt, sondern durch Verweise ersetzt: Conversion-Framework,
Designsystem und Typografie, SEO und Barrierefreiheit, GSAP-Regeln, die rechtlichen
Consent-Anforderungen und die Copywriting-Handwerkslehre stehen weiterhin nur in
`webdesign-conversion`. Aus dem Agenturskill übernommen wurde alles, was dort neu war.

Drei Dinge wurden dabei bewusst korrigiert statt übernommen:

- Das Honigtopffeld der Formularvorlage hieß `firma` und kollidierte damit mit dem echten
  optionalen Feld „Firmenname". Es heißt jetzt `webadresse`.
- Die Turnstile-Prüfung ließ ohne gesetztes Geheimnis jede Anfrage durch, auch in der
  Produktion. Sie fällt jetzt außerhalb der lokalen Entwicklung zu.
- Die Formularroute hatte keine Origin-Prüfung, obwohl Astros eigener Schutz in Cloudflare
  Pages Functions nicht greift. Sie ist ergänzt.

Die beiden Skripte `relaunch-inventory.mjs` und `deslop-check.mjs` waren im Agenturskill
beschrieben, aber nicht vorhanden. Sie sind für dieses Repository neu geschrieben.

### In Version 3.2 zusätzlich eingeflossen

| Quelle | Was daraus eingeflossen ist |
|---|---|
| [21st.dev](https://21st.dev/), Registry-Komponenten des Nutzers | Fünf Beispielkomponenten (Hero, FAQ, schwebende Elemente, Bewertungen, Integrationen) als annotierte Referenzen in `webdesign-conversion/references/23-referenzkomponenten-21st.md` und `webdesign-conversion/assets/vorlagen/referenzkomponenten/`. Zwei davon (`hero-vollbild.tsx`, `faq-akkordeon.tsx`) mit vollständigem Quelltext wie geliefert. Drei weitere waren im Original nur Demo-Aufrufcode ohne die Basiskomponente (`hero-section-7`, `testimonial-v2`, `integrations-5`); deren Quelltext wurde nicht erfunden, sondern die Lücke im Skill selbst benannt |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl), Lizenz ungeprüft: siehe `LICENSE` im Quellrepository vor produktivem Einsatz | Neues Werkzeug `scripts/design-scan.mjs` und Kapitel `agentur-website-builder/references/firecrawl-recherche.md`: Struktur- und Designerfassung einer fremden, bekannten oder alten Referenzseite über die Firecrawl-API (`scrape`), optional mit Screenshot. Kein Code aus dem Firecrawl-Repository wurde übernommen, nur dessen REST-API angesprochen, im selben abhängigkeitsfreien `fetch()`-Stil wie das bestehende `relaunch-inventory.mjs`, das die Firecrawl-API bereits seit Version 3.0 optional nutzt |

Die Lizenz von Firecrawl wurde für diesen Eintrag nicht verifiziert, siehe die Regel gegen
erfundene Belege in dieser Datei selbst. Vor produktivem Einsatz, insbesondere bei
Selbsthosting, die `LICENSE`-Datei im Quellrepository prüfen, sie kann sich zwischen
Kernserver und Client-SDKs unterscheiden.

### In Version 4.0 zusätzlich eingeflossen

Für die kuratierte Designrecherche wurde **kein fremder Code übernommen**. Angesprochen oder
zugrunde gelegt wurden:

| Quelle | Art der Nutzung |
|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | weiterhin nur die REST-API, jetzt zusätzlich mit eigener Basis-URL für eine selbst gehostete Instanz. Kein Code übernommen |
| [RFC 9309, Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309) | Grundlage des kleinen robots.txt-Lesers in `scripts/lib/abruf.mjs`, insbesondere die längste passende Regel und die Behandlung eines Serverfehlers als Verbot. Eigene Implementierung |
| [Playwright](https://playwright.dev/) | optionale Abrufstufe für Breakpoints und Screenshots, wie schon bei `pruefe-breakpoints.mjs`. Keine Abhängigkeit im Repository |
| `node:test`, `node:assert` | Testrunner aus dem Standardumfang von Node, damit das Repository ohne `package.json` bleibt |

Die Galerien Lapa Ninja, Godly und SiteInspire sind als Entdeckungsquellen in
`referenzquellen.json` aufgenommen, bisher ohne Erprobung im Projekt. Aufgenommen wurden nur
Name, Adresse und der Weg der Entdeckung, keine Inhalte.

Die fünf Muster des Erstbestands in `assets/musterbibliothek/muster/` beschreiben Prinzipien
aus den 21st.dev-Referenzkomponenten der Version 3.2. Der Quelltext liegt weiterhin nur in
`assets/vorlagen/referenzkomponenten/`, die Muster selbst enthalten keinen fremden Code, kein
fremdes Bildmaterial und keine wörtlichen Zitate.

### In Version 4.1 zusätzlich eingeflossen

| Quelle | Was daraus eingeflossen ist |
|---|---|
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), MIT, © 2026 Leonxlnx, Stand 23.09.2026 (Commit `c184364`) | `taste-skill` v2 (`design-taste-frontend`): Lesart vor dem Plan, die drei Regler Varianz, Bewegung, Dichte, die Sperren für Akzent, Form und Thema, die Heldenregeln (zwei Zeilen, 20 Wörter, vier Textelemente, Logowand darunter), Kicker-Quote, Zickzack- und Laufbandgrenze, eine Absicht ein Text, der Katalog der Produktionstells, der Serifenreflex, die Premium-Standardpalette mit Hexwerten, Pinning bei `top top` und das Redesign-Protokoll. `redesign-skill`: Befundliste und die Reihenfolge der Hebel. `full-output-enforcement`: das Verbot von Auslassungen, übertragen in eine Prüfung in `pruefe-platzhalter.mjs`. `imagegen-frontend-web` und `image-to-code`: ein Bild je Sektion, Neu erzeugen statt ausschneiden, Kompositionsvielfalt über die Serie, feste Reihenfolge beim Auflösen von Unklarheiten, keine Drift beim Bauen. `brandkit`: die Fragen an ein Markenbild und fünf Wege zum Zeichen, als Denkwerkzeug |

Eingeflossen sind Prinzipien und Grenzwerte, kein Text und kein Code; die GSAP-Skelette sind
in `09-motion-gsap.md` als Regeln beschrieben, nicht übernommen. Neu geschrieben für dieses
Repository: `scripts/pruefe-geschmack.mjs` (zählt die messbaren Tells einer gebauten Seite),
die Auslassungsprüfung in `pruefe-platzhalter.mjs`, der Evalfall
`keine-attrappen-als-beleg` und die Schleife „Screenshot neben den Entwurf" in
`28-ki-bildentwuerfe.md`, die den Originalen fehlt.

**Mit Vorbehalt, wie schon bei den Buchdestillaten aus Version 2.0.** Mehrere Stellen in
taste-skill stehen gegen die harten Grenzen dieses Skills und wurden umgedreht statt
übernommen: Platzhalterfotos von picsum.photos und Unsplash, echte Firmenlogos über das CDN
von Simple Icons, „organische" krumme Zahlen und realistisch klingende Namen, damit Erfundenes
echt wirkt, Text aus generierten Entwürfen als Seiteninhalt, und das Verbot eigener Icons.
Dazu widersprechen sich die Einzelskills untereinander (Serifenwahl, Kicker als Pille,
Fensterattrappen, Bewegung an jedem Element). Die vollständige Gegenüberstellung mit Grund
steht in `webdesign-conversion/references/26-geschmack-und-ki-tells.md` Abschnitt 11.

**Nicht übernommen** wurden die Ausgangswerte und Zahlen aus dem Ordner `research/` des
Repositories: die dort genannten Studien und Prozentwerte sind ohne Quellenangabe und ließen
sich nicht nachprüfen. Die Regler-Voreinstellungen je Kundentyp in Kapitel 26 sind aus den
Voreinstellungen von taste-skill übertragen und dort als nicht gemessen markiert.
`imagegen-frontend-mobile` blieb außen vor, native Apps gehören nicht zum Leistungsumfang.

### In Version 4.3 zusätzlich eingeflossen

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Skill `brand-extraktion` von That's it. Marketing, claude.ai-Skill des Agenturkontos, Stand 25.09.2026, Skript `brand-extract.mjs` Version 1.0 (SHA-256 `ce4dcdc80a22e91dc1d434c9efad595377ec09a16aa5e4224e7b92690d50a6af`) | Neues Werkzeug `scripts/brand-extraktion.mjs` und Kapitel `agentur-website-builder/references/brand-extraktion.md`. Die Messung im Browser (`analyseImBrowser`, `hoverImBrowser`), die Farbrollen-Heuristik, die Schrift- und Lizenzerkennung und der Bericht sind übernommen. Neu für dieses Repository: Tokenvorschlag mit den Namen aus `assets/vorlagen/tokens.css` und ohne leere Werte, die Markenstufe mit 4,5:1 für Text, die Untergrenze von 14 px, der Start über `scripts/lib/browser.mjs`, die Firecrawl-Zweitmeinung über `scripts/lib/abruf.mjs` (selbst gehostet vor Cloud), Exitcodes und Tests |

Anders als bei fremden Skills wird hier Code übernommen statt destilliert: der Skill stammt aus
derselben Agentur, folgt schon den Regeln dieses Repositorys und hat keine Grenze, die
umgedreht werden müsste. Das Firecrawl-Format `branding` der API v2 ist aus dem Original
übernommen und nur gegen einen lokalen Testserver geprüft, nicht gegen die Firecrawl-Cloud
oder eine selbst gehostete Instanz, siehe `CLAUDE.md`, Offene Punkte.

### In Version 4.2 zusätzlich eingeflossen

| Quelle | Was daraus eingeflossen ist |
|---|---|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable), Apache-2.0, © 2025 Paul Bakaus | Neues Kapitel `webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`: das Kurzvokabular für Feedback (Lesart, Kritik, Prüfung, Feinschliff, mutiger, ruhiger, bewegen, Satzbild), die vier Blickwinkel Überzeugen/Erledigen/Lesen/Erleben, und die Obergrenze von zwei subjektiven Prüfdurchgängen mit Screenshot vor der Übergabe |
| [delphi-ai/animate-skill](https://github.com/delphi-ai/animate-skill), Lizenz ungeprüft: keine `LICENSE`-Datei und kein Lizenzhinweis im Repository gefunden, siehe die Regel gegen erfundene Belege in dieser Datei selbst | Geprüft und mit dem bestehenden Motion-System abgeglichen: die goldenen Regeln (Austritt kürzer als Eintritt, nur `transform`/`opacity`, GPU-Beschleunigung) standen inhaltlich bereits in `09-motion-gsap.md` und `18-motion-handschrift.md`. Neu ergänzt wurde nur die fehlende Zeile zum Tastendruck (`scale(0.97)` bei `:active`) in der Mustertabelle von `09-motion-gsap.md`. Kein Code übernommen |
| [Playwright](https://playwright.dev/) | wie bereits seit Version 4.0 keine neue Abhängigkeit. Der Screenshot-Durchgang in Kapitel 29 nutzt dieselbe optionale Stufe wie `pruefe-breakpoints.mjs` und `scripts/lib/abruf.mjs` |

**Geprüft, aber bewusst nicht eigenständig integriert:**
[senlindesign/taste-skill](https://github.com/senlindesign/taste-skill) (im auslösenden Video
ebenfalls als „Taste Skill" genannt) extrahiert Design-Tokens mit Beleg aus einer fremden
Seite. Das deckt sich mit dem, was `design-dna.mjs`, `muster-vergleich.mjs` und die kuratierte
Designrecherche aus Version 4.0 in diesem Repository bereits leisten, einschließlich des
Belegmodells beobachtet/abgeleitet/unbekannt. Eine zweite, parallele Umsetzung hätte denselben
Widerspruch erzeugt wie zwei Fassungen einer Rechnungsregel, siehe die Pflegeregel in
`../CLAUDE.md`. Die bereits in Version 4.1 integrierte
[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) ist ein anderes Repository
desselben Namens, siehe deren eigenen Eintrag oben.

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
