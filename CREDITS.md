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

### In Version 4.10 zusätzlich eingeflossen

Stand der Quellen: 07.10.2026. Ausgewertet wurden die Transkripte der zehn neuesten Videos des
Kanals Self-Made Web Designer (YouTube, keine Lizenz genannt, nur inhaltlich destilliert, nichts
wörtlich) und eine ältere Vorgängerfassung eines der Videos. Die Auswertung kam als
Erweiterungspaket und ist hier umgesetzt, die Abgleichmatrix steht im Änderungsverlauf in
`CLAUDE.md`.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| „The Psychology of a PERFECT Website" | `36-kundenpsychologie-erwartung-reiz-begruendung.md`: Reihenfolge Erwartung, Reiz, Begründung, mentale Modelle, MAYA, Gruppieren, Preisstufen im Muster. Das Drei-Instanzen-Modell steht als Denkmodell mit Warnhinweis (es vereinfacht das überholte Dreihirnmodell) |
| „The ONLY 6 Web Design Styles that Matter (2026)" | `37-stilrichtung-nach-kundensprache.md`: Zuordnung Kundensatz zu Richtung, Signaturelement wiederholen. Die Stile heißen neutral, nicht nach Personen |
| „Give Me 9 Minutes & Make INSANE Website Animations", „The ONLY 5 Tools You Need to Build Insane Sites" | `38-scrollvideo-und-einbettungen.md` und `39-ki-assets-bewegtbild-und-3d.md`: Anlass, Aufbau, Blendfehler, Einbettungen, Tiefe, Körnung, KI-Assets. Die Angaben zur Bibliothek `scrolly-video` stammen von deren npm-Seite (07.10.2026) und sind nicht getestet, Version und Lizenz unbekannt. Eines der Videos ist vom Werkzeuganbieter gesponsert, Werkzeugnamen sind deshalb keine Empfehlung |
| „Give Me 11 Minutes I'll Show You How to Design $10k Sites" | `agentur-website-builder/references/moodboard-und-stylescape.md`, Korrekturrunden mit Frist in `kundenabstimmung.md`. Der Verzicht auf Wireframes ist nicht als Pflicht übernommen (Baukasten gegen Code) |
| „11 years of web design knowledge in 7 minutes", „11 Years of Brutally Honest Web Design Advice in 7 Minutes" | Konturbutton nicht als Primär-CTA, Farbabgleich Foto und Palette, Faustwert 60 30 10, Erinnerungs- und Aufgabentest, Zielkonflikte festlegen, Gerätekontext aus Kundendaten |
| „The Impending Downfall of Web Designers" | Kundendashboard als optionale Leistung (Idee eines anderen Webdesigners, nicht geprüft) |
| „I studied 100's of web design legends" | Quellen außerhalb des Webs fürs Moodboard in `22-premium-designquellen.md`. Genannte Seiten und Studios nicht geprüft, nicht verlinkt |
| Nielsen Norman Group, „F-Shaped Pattern For Reading Web Content" (`nngroup.com/articles/f-shaped-pattern-reading-web-content`), laut Seite zuletzt geprüft am 19.08.2026 | Primärquelle für die Korrektur des F-Musters in `02-design-ux.md` und `26-geschmack-und-ki-tells.md`: reales, aber schädliches Scanverhalten bei unstrukturierten Seiten, ein Fehlerbild und kein Gestaltungsziel. Die Aussage eines Videos allein („veraltet") ist dafür zu grob und nicht übernommen |

**Widerspruch aufgelöst:** Bis Version 4.9 führten zwei Kapitel das F-Muster als Maßstab der
Lesereihenfolge. Seit 4.10 ist der Maßstab die Hierarchie, das F-Muster wird durch Struktur
verhindert. Der Evalfall `f-muster-kein-leitbild` prüft das Verhalten des Modells.

**Nicht übernommen, mit Grund:**

* Einkommens- und Preisbehauptungen („10.000 Euro Seiten"): ohne Beleg, nicht Teil des Skills
* „85 Prozent sehen nur den ersten Bildschirm": im Video ohne Beleg, ein Zuschauerkommentar
  dazu ist eine Einzelmeinung
* die Aussage zum KI-Hype mit Beitrag auf einer Plattform: nicht geprüft
* Zahlenangabe zur Sinnesverarbeitung im Video „Psychology": ohne Primärquelle
* Namen von Werkzeugen, Modellen und Schriftanbietern als Empfehlung: veralten, zwei Videos sind gesponsert
* Kundengruppen, Leistungsleiter, Arbeitsblöcke, Gewohnheiten der Legenden, Karriere und Mentoring:
  Agenturgeschäft und persönliche Methodik, nicht Regelwerk
* Werbung für Kurse, Vorlagen und Wartelisten des Kanals

**Ungeprüft:** Bücher, Personen, Studios, Beispielseiten und Studien, die in den Videos fallen,
wurden nicht gelesen und nicht nachgeprüft. Die Zahlen zwei Runden, 48 Stunden und 60 30 10 sind
Vorschläge aus den Videos, keine harten Grenzen.

### In Version 4.11 zusätzlich eingeflossen

Stand der Quellen: 07.10.2026. Neun Videos des Kanals RoboNuggets (Jay E, YouTube, keine Lizenz
genannt), aus den automatisch erzeugten Transkripten, nichts wörtlich. Eigennamen im Transkript wurden vom
Paketersteller korrigiert. Die Videos nennen eigene Produkte und Affiliate-Links des Kanals, diese sind nicht
übernommen.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| „This NEW Claude Prompting Technique (gauntlet-loop)", 06.08.2026 | `40-polierschleife-mit-kritiker.md` mit Vorbedingungen, Kritikerregeln, Verhältnis zu Kapitel 29. Ursprung laut Video: Matt Shumer, Einordnung durch Andrej Karpathy, Artikel „Building effective agents" von Anthropic (2024), alle drei **nicht im Original gelesen**. Die Ergänzungen zum Widerlegen und zur Durchlaufgrenze stammen aus Zuschauerkommentaren |
| „25 Tricks to Level Up Claude Design", 27.09.2026 | Kandidatentabelle in `22-premium-designquellen.md`, Mischen mit Herkunft je Merkmal in `24-designsystem-vorrang.md`, Wettbewerbermuster in `copy-im-kundenprojekt.md`, Vorlage `designsystem-ableiten.md`, `tweaks-panel.md` mit Sperre |
| „Opus 5.5 Motion Graphics is Unbelievably Good", 29.09.2026 | Storyboard vor Scroll-Animation in Kapitel 38, Annotation am Frame in `kundenabstimmung.md`, Vorlage `storyboard.md` |
| „This 1 Claude Skill fully replaces your Higgsfield Subscription", 31.07.2026 | Kosten, Deckel, Protokoll und Schlüssel in `.env` in Kapitel 39, Vorlage `bildgenerierung.md`. Anbieternamen, Preise und Nutzungsbedingungen aus dem Video sind nicht übernommen |
| „Anthropic Just Revealed 12 New Rules for Prompting Opus 5.5", 24.09.2026 | Checkliste bei langen Builds, zwei CLAUDE.md-Sätze, Ausschnitt je Sektion bei dichten Bildern. Quelle laut Video: Anthropics Prompting Guide, nicht gelesen |
| „5 Powerful Claude Plugins that Nobody is Talking About" | Schutz vor zerstörerischen Befehlen im Bauablauf, werkzeugneutral als deterministischer Hook. Der Anlass im Video ist ein Einzelbericht, nicht geprüft |
| „Claude's Invisible Watermark", 17.08.2026 | Hinweis zu KI-Text und Wasserzeichen in `copy-im-kundenprojekt.md`. Die Angaben zu Zeitpunkt, Verfahren und Prüfwerkzeug sind nicht gegen die Hersteller geprüft |

**Widersprüche entschieden:** Fontshare als Quelle gegen die Warnung vor dem Anbieter-CDN in Kapitel 26,
die Gauntlet-Schleife gegen die Obergrenze von zwei Durchgängen in Kapitel 29, die Vorlage „Design System aus
Referenz" gegen die harte Grenze zur Markenextraktion. Wie sie aufgelöst sind, steht im Änderungsverlauf in
`CLAUDE.md`.

**Nicht übernommen, mit Grund:**

* Effort-Stufen, Cache, Usage-Resets und „reasoning extraction": modell- und preisabhängig, im Video teils als Beta, nicht geprüft
* „Jev", das Entscheidungsmodell mit Routing und Triage: Drittanbieter, Datenschutz und Auftragsverarbeitung ungeklärt, Messwerte vom Kanal
* „I have ADHD"-Antwortstil und das Kürzel /quick: persönlicher Arbeitsstil
* Apple-HIG- und WCAG-Skill als Vorlage, Effort-Test und Tone-of-Voice-Skill: Tap Targets und Kontrast stehen in den Kapiteln 04 und 32, die Anti-Slop-Prüfung in `deslop-check.mjs`, die Vorlage zum Tone of Voice nennt Bindestriche als Stilmittel, das Repository verbietet nur Gedankenstriche
* Videoproduktion aus Transkript, Rohvideo, Hyperframes, Remotion: kein Webseitenbau
* Preise, Anbieterlisten und Modellnamen: ändern sich laufend
* die gratis PDFs des Kanals: nicht abgerufen

**Ungeprüft:** Die genannten Personen, Projekte und Artikel, die Zahlen zu Geschwindigkeit und Kosten des
Entscheidungsmodells und die Testergebnisse der Videos (3D-Wohnung, Produktseite).

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

### In Version 4.4 zusätzlich eingeflossen

Stand der Quellen: 06.10.2026. Gelesen wurden die genannten Dateien **über abrufende
Zusammenfassungen**, nicht als vollständiger Klon der Repositories. Wo etwas nur aus einer
Repository-Übersicht stammt, steht es unten ausdrücklich so.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| [emilkowalski/skills](https://github.com/emilkowalski/skills), MIT, 43,9k Sterne laut Repositoryseite: `emil-design-eng`, `review-animations` | Neues Kapitel `30-motion-pruefung.md`: die Entscheidungsfolge nach Häufigkeit und Zweck, Easing-Auswahl, die Obergrenze von 300 ms für Bedienbares, `scale(0.97)` bei `:active`, nie bei `scale(0)` beginnen, `transform-origin` am Auslöser, Unterbrechbarkeit über Transitions, nur `transform` und `opacity`, die zehn Maßstäbe und das Ausgabeformat des Reviews mit Entscheidung Blockiert oder Freigegeben, Zeitlupenprüfung. Neu für dieses Repository: `scripts/pruefe-motion.mjs` mit 27 Tests, die Bindung an die Tokens aus `tokens.css` und die offene Benennung von zwei Widersprüchen zum bestehenden Motion-System (Abschnitt 8) |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), MIT, `web-design-guidelines` und `react-best-practices`; Regeln aus [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines), **Lizenz im abgerufenen Dokument nicht genannt** | Neues Kapitel `32-ui-details-katalog.md`: nur, was in den bestehenden Kapiteln fehlte (Eingabe, Touch, Safe Area, `Intl`, `translate="no"`, Hochkontrast, Zustand in der URL), auf Deutsch übertragen, nichts wörtlich. Aus `react-best-practices` nur die frameworkunabhängigen Regeln (Wasserfälle, Bündelgröße, Vorladen), als Abschnitt in `03-technik-performance.md`, übertragen auf Astro |
| [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo), MIT; [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude), MIT: nur die GEO-Teile (`seo-geo`, `geo-citability`) | Neues Kapitel `31-ki-sichtbarkeit-geo.md`: die Trennung von Such-, Abruf- und Trainingscrawlern, die Struktur zitierfähiger Absätze, die Einordnung von `llms.txt`, die Vierergruppe Beobachtung, Maßnahme, Gegenprobe, Frühindikator. Neu für dieses Repository: `scripts/pruefe-geo.mjs` mit 21 Tests |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), MIT, 53,5k Sterne laut Repositoryseite: `copywriting`, `copy-editing` | Die sieben Prüfungen für fertige Texte und die KI-Satzmuster in `12-copywriting.md`; die Muster Kontrastfigur, Verneinungsreihe und selbstbeantwortete Frage zusätzlich in `scripts/deslop-check.mjs` (7 Tests). Die Prüfungen „Gefühl" und „Risiko" sind an die Regeln gegen Druckmittel und erfundene Belege gebunden |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable), Apache-2.0, 77,6k Sterne laut Repositoryseite | Aktualisierung von `29-pruefdurchgaenge-und-vokabular.md`: der eigenständige Detektor `npx impeccable detect` als Zweitmeinung, nicht eingebunden und nicht ausgeführt |

**Nicht übernommen, mit Grund.** Die Liste ist ehrlich gemeint: sie enthält auch, was ich nicht
gelesen habe.

| Quelle | Grund |
|---|---|
| Kowalski: `animate-expo`, `write-swift`, `mobile-native` | native Apps gehören nicht zum Leistungsumfang |
| Kowalski: `animate`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`, `pick-ui-library`, `prototype`, `break-ui`, `ask-sonner` | nur aus der Repositoryübersicht bekannt, die Dateien nicht gelesen. Das Vokabular in Abschnitt 9 von Kapitel 30 ist eine eigene Zusammenstellung der gängigen Begriffe und **nicht** aus `animation-vocabulary` übernommen, dessen Inhalt ich nicht kenne |
| Vercel: `vercel-optimize`, `react-view-transitions`, `composition-patterns`, `writing-guidelines`, `vercel-deploy-claimable` | nur aus der Übersicht bekannt, nicht gelesen. Die Deploy-Vorgaben der Agentur sind Cloudflare Pages |
| Vercel: React-spezifische Regeln (Re-Renders, Suspense, Server Components), Title Case, Virtualisierung | im Astro-Standardstack ohne Inhalt, Title Case ist im Deutschen falsch |
| Vercel: `preconnect` auf Drittserver | stünde gegen die Regel „Blockierung muss echt sein" in `07-recht-dsgvo.md`, deshalb umgedreht, siehe Kapitel 32 Abschnitt 5 |
| claude-seo: 24 weitere Unterskills (lokale Suche, Handel, hreflang, Google-APIs, Drift-Überwachung), `/seo agentic` | nicht gelesen. Lokale Suche steht schon in `05-seo-sichtbarkeit.md`. `/seo agentic` ist hier nicht geprüft |
| claude-seo und geo-seo-claude: Gewichtungen und Prozentwerte („Citability 25 %", „3-fach stärker als Backlinks", „134 bis 167 Wörter", „2,1-fach") | die Gewichte sind Setzungen der Autoren, die Studienverweise ließen sich nicht nachprüfen. Wie bei den `research/`-Werten von taste-skill nicht übernommen |
| marketingskills: 58 weitere Skills (CRO, `ai-seo`, `schema`, `site-architecture`, Preise, E-Mail und mehr) | nicht gelesen. `ai-seo`, `schema` und `site-architecture` sind die nächsten Kandidaten für eine spätere Runde |
| [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) | Präsentationen sind kein Websitebau |
| Playwright / `webapp-testing` | Breakpoints und Screenshots sind über `pruefe-breakpoints.mjs` abgedeckt, ein Ablauf für Formular und Consent steht als Hinweis in `qa-und-abnahme.md`. Der Skill selbst wurde nicht gelesen |
| Owl-Listener (63 Designerskills), Julian Oczkowski (Design-Prozess), Composio, Accesslint, Figma-Implement-Design | nur aus einer Aufstellung bekannt, nicht gelesen. Anforderungsabfrage vor dem Code steht schon in Phase 0 und 1 des Bauablaufs, Kontrast prüft `pruefe-kontrast.mjs`. Figma-Anbindung hat die Agentur über den Figma-Connector |
| taste-skill: `minimalist-ui`, `industrial-brutalist-ui`, `high-end-visual-design`, `gpt-taste`, `stitch-design-taste`; `ui-ux-pro-max`: seit 4.1 nicht neu abgeglichen | Stilrichtungen stehen bereits als Taxonomie in `assets/musterbibliothek/taxonomie.json`. Ein erneuter Abgleich der beiden Repositories mit dem Stand von 4.1 wurde **nicht** gemacht, nur deren Repositoryübersicht gesehen |

### In Version 4.5 zusätzlich eingeflossen

Stand der Quelle: 06.10.2026. Gelesen wurde das **automatisch erzeugte Transkript** des Videos, nicht
das Video selbst. Das Transkript enthält Erkennungsfehler bei Eigennamen, die hier nach bestem
Wissen berichtigt sind. Nichts ist wörtlich übernommen.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Joanna Wiebe (Copyhackers), YouTube Video „How To Speak Like a CEO So People ACTUALLY Listen To You", `youtube.com/watch?v=x7fZV-ZObYI`, **keine Lizenz genannt**, nur inhaltlich destilliert | Neues Kapitel `webdesign-conversion/references/33-kundenpraesentation-und-feedback.md`: die fünf Stellschrauben (Meinung herunter, Systemdenken herauf, Verteidigung herunter, Urteilskraft herauf, Rückmeldeschleifen herauf), auf Entwurfspräsentation vor Kunden übertragen. Neu für dieses Repository: die Tabelle „Aussagen statt Geschmack" mit Bezug auf die vorhandenen Prüfskripte und Regeln, die Abgrenzung der Lens von der Lesart aus Kapitel 26, die Rollentabelle, die Spielregeln für Rückmeldung, die Abgrenzung zur Obergrenze der Durchgänge in Kapitel 29. Neuer Ablauf `agentur-website-builder/references/kundenabstimmung.md` mit Markenbrief-Block, Ablauf der Präsentation, Einsortieren von Rückmeldungen |

**Nicht geprüft.** Die im Video genannten Personen und Studien (Kahneman, Adam Grant, Teresa Amabile,
Ed Catmull, Jeff Bezos, ein Vorgehen eines Xbox Teams mit dem Namen GRID, eine Harvard Studie von 2026,
der Verkauf von Zappos an Amazon) sind nur als Aussage des Videos wiedergegeben und nicht gegen
Primärquellen gelesen. Keine Regel in Kapitel 33 hängt allein an einer davon.

**Nicht übernommen, mit Grund:** Karriere- und Beförderungsrahmen, der Brillenworkshop,
Hinweis auf Buch und Hörbuch der Referentin. Siehe Kapitel 33, Abschnitt 7.

### In Version 4.6 zusätzlich eingeflossen

Stand der Quelle: 06.10.2026, wieder aus dem automatisch erzeugten Transkript, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Joanna Wiebe (Copyhackers), YouTube Video „The #1 Problem With AI Creative (And How To Fix It)", `youtube.com/watch?v=ct8kRihRigI`, **keine Lizenz genannt**, nur inhaltlich destilliert | Neu: `agentur-website-builder/references/chatbot-auf-der-website.md` (Leitplanken, Wissensbasis, keine verbindlichen Erklärungen, Gegenprobe, technischer Schutz, Datenschutz; die Struktur des Systemprompts folgt dem Video, alles Übrige ist für dieses Repository ergänzt). Neu: Schritt 9 „Abnahme durch einen Menschen" in `qa-und-abnahme.md`, ein Punkt in der Definition of Done und eine Zeile im Abschlussbericht. Neu: Punkt 11 „Alltagsprobe" im Vorflugcheck von Kapitel 26 |

**Nicht geprüft.** Die Beispiele des Videos (Paketdienst, Autohaus, Hersteller von Schnellrestaurants, Getränkehersteller) sind nur als Aussage des Videos wiedergegeben.

**Nicht übernommen, mit Grund:**

| Teil des Videos | Grund |
|---|---|
| Kontrastfigur („nicht X, sondern Y") als Erkennungsmerkmal von KI Text | steht seit 4.4 in `scripts/deslop-check.mjs` und `12-copywriting.md` |
| Farbübung zur Aufteilung des eigenen Prozesses, Papier und Stift vor dem Rechner, Retreats | Arbeitsweise der Person, kein Webseitenbau |
| „Nutze KI nicht in Bereichen ohne eigene Fachkenntnis" | als Haltung nicht prüfbar; nur der Teil mit dem Bericht „zur Prüfung durch eine Fachperson" in `qa-und-abnahme.md` ist übernommen |

### In Version 4.7 zusätzlich eingeflossen

Stand der Quelle: 06.10.2026, aus dem automatisch erzeugten Transkript, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Joanna Wiebe (Copyhackers), YouTube Video „Words That SELL (Psychology-Backed)", `youtube.com/watch?v=7gjtI1rnds4`, **keine Lizenz genannt**, nur inhaltlich destilliert | Neues Kapitel `webdesign-conversion/references/34-ueberzeugungsausloeser.md`: aus den neun Auslösern des Videos nur die, die im Regelwerk fehlten (Zielgruppe ohne Vorwurf, Wirkprinzip, realistisch behaupten, ruhige Einwandzeile, drei Optionen, Einschränkung selbst nennen), mit Grenzen gegen erfundene Belege und Irreführung. Neu für dieses Repository: die Zuordnung zu Stellen der Seite, drei Felder im Markenbrief, zwei Satzmuster in `scripts/deslop-check.mjs` mit vier Tests |

**Bereits im Repository, deshalb nicht neu aufgenommen:** der Botschaftsbogen und das Auflösen von
Einwänden (`12-copywriting.md`), das Risiko am Button (Prüfung 7), ein belegter Fall statt drei
behaupteter und der Vorrang einer starken Quelle vor vier Kacheln (`06-conversion-architektur.md`).

**Nicht übernommen, mit Grund:**

| Teil des Videos | Grund |
|---|---|
| die psychologische Begründung über zwei Denksysteme | nicht nachgelesen, jede Regel hat einen eigenen Grund |
| Prozentwert eines Anstiegs bei einem Unternehmen, Beispiele mit großen Marken | nicht prüfbar, belegt nichts für einen anderen Betrieb |
| Hinweis auf Buch und Hörbuch der Referentin | Werbung |

### In Version 4.8 zusätzlich eingeflossen

Stand der Quelle: 07.10.2026, aus dem automatisch erzeugten Transkript, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Joanna Wiebe (Copyhackers), YouTube Video „Use Words Like This To Make Anyone Respect you", `youtube.com/watch?v=bvvh-HZiQqo`, **keine Lizenz genannt**, nur inhaltlich destilliert | Neues Kapitel `webdesign-conversion/references/35-autoritaet-im-text.md`: Weichmacher streichen, die Satzleiter (Befund, dann Befund mit Grund), Präzision mit benanntem Fachwort, Rahmen vor dem Einwand („Frame Control“), die drei Fragearten als Folgen-, Umdeutungs- und Annahmenfrage. Neu für dieses Repository: die deutsche Weichmacherliste, die Übertragung der Rahmenidee auf Preis und Passung ohne Verknappung, die acht Regeln für Antworten in der FAQ mit Bezug auf `05-seo-sichtbarkeit.md` und `31-ki-sichtbarkeit-geo.md`, das Satzmuster „Weichmacher“ in `scripts/deslop-check.mjs` mit zwei Tests |

**Nicht übernommen, mit Grund:** Körperhaltung, Mimik, Stimme und „Autoritätsgesicht“ (betrifft das
Auftreten im Raum), strategisches Schweigen nach der Preisnennung (Verhandlungstaktik im Gespräch),
alle Prozentwerte und Studien (nicht nachgelesen), „Rule of One“ (deckt sich mit der Kernbotschaft in
`12-copywriting.md`), der Hinweis auf Buch und Hörbuch der Referentin.

### In Version 4.9 zusätzlich eingeflossen

Stand der Quelle: 07.10.2026, aus den automatisch erzeugten Transkripten, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Sam Crawford, YouTube Kanal `@bycrawford`, die zehn neuesten Videos zu Webdesign, **keine Lizenz genannt**, nur inhaltlich destilliert | `scripts/pruefe-aktualitaet.mjs` mit Tests (veraltetes Copyright-Jahr, Stand-Angaben, Jahr im Titel), QA Schritt 10 „Aktualität und Eigentum" in `qa-und-abnahme.md`, Vorflugcheck 12 bis 14 (Tauschtest fürs Logo, Blinzeltest, Videotest) und die Frage „für Besucher oder für uns?" in `26-geschmack-und-ki-tells.md`, Material vor Entwurf, Startseite zuerst und feste Korrekturrunden in `kundenabstimmung.md`, „erst reparieren, dann neu bauen" in `27-redesign-bestand.md`. Neu für dieses Repository sind die Prüfregeln, die Begründungen und die Einordnung als Urteil oder Messung |

**Bereits im Repository, deshalb nicht erneut aufgenommen:** Held und Hierarchie, Weißraum, Kontrast,
Formulare, Vertrauen am Knopf, Schriftwahl, Mobil, Barrierefreiheit, GEO, A/B Tests.

**Nicht übernommen, mit Grund:** Studien, Prozentwerte und Anekdoten (nicht nachgelesen),
Werbung für Kurse, Vorlagen und Dienstleistungen des Kanals.

### In Version 4.12 zusätzlich eingeflossen

Stand der Quelle: 07.10.2026, Erweiterungspaket `design-skill-erweiterung-referenz-motion`, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Erweiterungspaket mit Auswertungen mehrerer Videos (Autoren und Lizenz nicht genannt), nur inhaltlich destilliert | Kapitel 41 (Motion als Funktion der Zeit), Kapitel 42 (Referenzgrammatik, Gap Audit), Variante mit drei Kritikern in Kapitel 40, Kandidaten in Kapitel 22, Interview vor dem Prompt, Durchlauf wie ein Nutzer |

**Bereits im Repository, deshalb nicht erneut aufgenommen:** Marke schlägt Referenz, zwei Freigabetore,
Storyboard vor Animation (38, 2a), Kennzeichnung KI erzeugter Medien (39, 4).

**Nicht übernommen, mit Grund:** Kosten, Zeit und Aufrufzahlen der Quellvideos (Erfahrungswerte,
ungeprüft), Preise und Leistungsbeschreibung der Zusatzleistungen (gehören ins Angebot), Vergleich
der Renderwerkzeuge (veraltet schnell).

### In Version 4.13 zusätzlich eingeflossen

Stand der Quelle: 07.10.2026, Erweiterungspaket `bont-webdesign-prozess`, automatisch erzeugte Untertitel, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| BONT (YouTube Kanal), vier Videos: „Watch me design a phone website landing from scratch" (22.09.2026), „4 Web Design layout pro tips that took me YEARS to master" (02.06.2026), „5 keys to design AWWWARD winning websites" (25.02.2026), „11 inspirational websites for 2026" (17.12.2025), **keine Lizenz genannt**, nur inhaltlich destilliert | Kapitel 43, Abschnitt 5a in `moodboard-und-stylescape.md`, sieben Kandidatenseiten ungeprüft |

**Bereits im Repository, deshalb nicht erneut aufgenommen:** Referenzkollage und Stilprofil (42), Layoutfamilien (26),
Sticky Kopf (02), Art Direction „richtig statt trendig" (10, 26), Pinning (09).

**Nicht übernommen, mit Grund:** Framer Bedienung und Marktplatz (nicht der Agenturstack), Lebenslauf, Auszeichnungen
und Preise des Autors, feste Pixelstufen und Punktraster (Einzelfall), vier der elf Beispielseiten (Alter, Konzept, Adresse).

### In Version 4.14 zusätzlich eingeflossen

Stand der Quelle: 07.10.2026, Erweiterungspaket `claude-design-workflow`, automatisch erzeugte Transkripte, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Jay E (RoboNuggets), „25 Tricks to Level Up Claude Design in 13 Mins" (27.09.2026); Jack Roberts, „Claude Design Now Builds Beautiful $10,000 Websites (NO AI Slop)" (17.08.2026) und „Claude Design Just Solved its #1 Problem... I Quit" (20.08.2026), **keine Lizenz genannt**, nur inhaltlich destilliert | Kapitel 44, Zweitdurchgang und fünf Prinzipien in `copy-im-kundenprojekt.md`, Pilot in Kapitel 39 (3b), Stimme in Kapitel 41, zwei Kandidaten in Kapitel 22 |

**Bereits im Repository, deshalb nicht erneut aufgenommen:** Designsystem aus Referenzen und Mischen (24), Schriften mit Lizenz
(10, 22), Iconpakete (17, 22), Komponentenkandidaten (22), Polierschleife (40), Tweaks Panel (Vorlage), Wettbewerbermuster
(`copy-im-kundenprojekt.md`).

**Nicht übernommen, mit Grund:** Skill im Stil einer bekannten Marke (harte Grenze Markenextraktion), bezahlte Community Angebote
und Leitfäden, Galeriegrößen und Preise (ungeprüft), das eingebaute Designkommando und der Apple Skill (Verfügbarkeit ungeprüft).

### Pflegeverfahren, ohne Versionsänderung

Stand der Quelle: 07.10.2026, Erweiterungspaket `skill-pflege-und-modelltests`, eigene Zusammenfassung, nichts wörtlich.

| Quelle | Was daraus eingeflossen ist |
|---|---|
| Nate Herk (AI Automation), YouTube „I Deleted All My Claude Skills... And Claude Got Smarter" (`youtube.com/watch?v=XNQBCRcwXV4`) mit Aussagen aus einem Interview mit Boris Cherny, **keine Lizenz genannt**, nur inhaltlich destilliert; Kommentare der Community getrennt und ungeprüft | `evals/modellwechsel.md`, Konvention in `CLAUDE.md` |

**Nicht übernommen, mit Grund:** Zahlen zur Kürzung von Systemprompts (nicht geprüft), pauschales Löschen aller Anweisungen (gilt nicht für
Pflichten und harte Grenzen), Ratschläge aus der Softwareentwicklung für Orchestrierung und Build Skills (andere Arbeit), die
Managerbildsprache (Haltung, keine Regel).

