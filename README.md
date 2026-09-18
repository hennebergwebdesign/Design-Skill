# Webdesign Conversion Skill

Zwei Claude-Skills in einem Plugin, für conversion-orientiertes Webdesign im DACH-Raum.

| Skill | Rolle |
|---|---|
| **`webdesign-conversion`** | das Regelwerk: was gut ist und warum. Strategie, Design, Technik, Barrierefreiheit, SEO, Conversion, Recht |
| **`agentur-website-builder`** | der Lieferablauf: wie eine Kundenseite tatsächlich entsteht, von der Analyse bis zur Übergabe |

Das Regelwerk vereint mehrere öffentliche Design- und Animations-Skills mit dem
Website-Conversion-Playbook, den rechtlichen Pflichten (DSGVO, DDG, BFSG) und den
Hausstandards aus produktiven Astro-Projekten. Der Bauablauf setzt darauf auf und schreibt
den Agenturstack fest: Astro auf Cloudflare Pages, Formulare über Resend und Turnstile,
eigenes Consent Banner, Google Bewertungen, optional ein Leadsystem mit Dashboard.

Beide gehören zusammen. Der Bauablauf verweist an jeder inhaltlichen Stelle in das
Regelwerk, statt es zu wiederholen. Wer nur einen der beiden Ordner in ein Projekt kopiert,
verliert diese Verweise.

## Was drin ist

**Das Sechs-Bereiche-System:** Strategie & Positionierung, Design & UX, Technik &
Performance, Barrierefreiheit, SEO & Sichtbarkeit, Conversion-Architektur. Eine Website
funktioniert nur, wenn alle sechs ineinandergreifen.

**Der komplette Grundaufbau:** Impressum, Datenschutzerklärung, Consent mit echter
Skriptblockierung, 404-Seite, `robots.txt`, Sitemap samt gebrandeter Ansicht,
301-Weiterleitungen, Security- und Cache-Header, Designtokens, Meta- und JSON-LD-Bausteine.

**Drei Playbooks** für die drei Produkttypen. Eine Landingpage hat keine Navigation, eine
Homepage braucht sie, ein Recruiting-Funnel hat mehrere Stufen und einen rechtlichen Rahmen,
der bei einem Fehler unmittelbar Geld kostet. Ein gemeinsamer Fahrplan trägt das nicht.

**Ein Markenbrief als einzige Quelle.** `marke.json` und `marke-brief.md` halten Farbrollen,
Schriften, Motion-Profil, Icon-Profil und Sprachprofil an einer Stelle. Das ist der Grund,
warum bei maschinell gebauten Seiten Design, Animation und Text selten zusammenpassen: sie
kommen aus vier getrennten Entscheidungen statt aus einer Datei.

**Eigene Icons und eine eigene Motion-Handschrift.** Ein Icon-Set wird abgeleitet, nicht
ausgewählt: Strichstärke folgt dem Gewicht der Display-Schrift, Ecken folgen den Radien der
Tokens, Formensprache folgt dem Gegenstand. Motion bekommt fünf Dauern und drei benannte
Kurven statt zwei Werte, und Austritte sind kürzer als Eintritte.

**Ein Lieferablauf in sieben Phasen.** Projektskills installieren, analysieren, gesammelt
rückfragen, Umsetzungskonzept zur Freigabe, bauen in einer Reihenfolge, die Nacharbeit spart,
prüfen mit Werkzeug, übergeben mit Abschlussbericht. Der häufigste Grund für eine Seite, die
nachgearbeitet werden muss, ist nicht fehlendes Wissen, sondern eine übersprungene Phase.

**Fester Agenturstack statt Entscheidung pro Projekt.** Astro auf Cloudflare Pages,
Formulare über Resend mit Turnstile, Honigtopf, Zeitfeld und Rate Limit, eigenes Consent
Banner mit echter Skriptblockierung, Google Bewertungen serverseitig über die Places API mit
KV-Cache, optional ein Leadsystem auf D1 mit schlankem Dashboard. Zu jedem Punkt liegt
einsatzfertiger Code bei, keine Beschreibung.

**Prüfskripte statt Checkboxen.** Eine Regel ohne Prüfung wird in der dritten Sitzung
zurückgedreht. Fünf Skripte prüfen Gedankenstriche, Tokens, Kontrast, Platzhalter und acht
Bildschirmgrößen samt horizontalem Überlauf. Zwei weitere beschaffen das Relaunch-Inventar
und bewerten selbst formulierte Texte auf generischen KI-Klang.

**Vorlagen zum Übernehmen** statt Beschreibungen zum Nachbauen.

```
skills/
├─ webdesign-conversion/            das Regelwerk
│  ├─ SKILL.md                      Einstieg, Typwahl, sechs Bereiche, harte Grenzen
│  ├─ playbooks/
│  │  ├─ homepage.md                vollständige Unternehmenswebsite
│  │  ├─ landingpage.md             eine Seite, ein Ziel, keine Navigation
│  │  └─ recruiting-funnel.md       mehrstufig, mobil zuerst, AGG und Bewerberdaten
│  ├─ references/
│  │  ├─ 00-fahrplan.md             Strategie → Struktur → Copy → Design → Bau → Test → Launch
│  │  ├─ 01-strategie-positionierung.md  Zielgruppenformel, USP-Formel, Einwände
│  │  ├─ 02-design-ux.md            Above the Fold, F-Pattern, 3-Klick-Regel, Layout
│  │  ├─ 03-technik-performance.md  2-Sekunden-Regel, Bilder, Caching, fünf Breakpoints
│  │  ├─ 04-barrierefreiheit-bfsg.md  BFSG, Kontrast, Alt-Texte, Tastatur, WCAG 2.2 AA
│  │  ├─ 05-seo-sichtbarkeit.md     Keywords, URLs, Meta, interne Links, JSON-LD
│  │  ├─ 06-conversion-architektur.md  CTA-Hierarchie, 10-Sekunden-Formular, Trust, Über uns
│  │  ├─ 07-recht-dsgvo.md          Impressum, Datenschutz, Consent, Auftragsverarbeitung
│  │  ├─ 08-pflichtseiten-technik.md  404, robots.txt, Sitemap, Redirects, Header
│  │  ├─ 09-motion-gsap.md          GSAP, ScrollTrigger, reduzierte Bewegung, Performance
│  │  ├─ 10-visuelle-richtung.md    Tokens, Typografie, Schriftwahl, Anti-Schablone
│  │  ├─ 11-komponenten-shadcn.md   shadcn/ui-Regeln für React und Next.js
│  │  ├─ 12-copywriting.md          Botschaftshierarchie, Angebot, Einwände, Deutsch, Striche
│  │  ├─ 13-messung-optimierung.md  GA4, Heatmaps, monatlicher Review, A/B
│  │  ├─ 14-projektstruktur-astro.md  Referenzstack, CLAUDE.md, Fallstricke
│  │  ├─ 15-spacing-rhythmus.md     Abstand als Hierarchiesignal, drei Rhythmus-Ebenen
│  │  ├─ 16-responsive-container.md Eskalationspfad, Container Queries, svh/dvh
│  │  ├─ 17-icons-eigenes-system.md Icon-Set ableiten, 24er Raster, optische Korrektur
│  │  ├─ 18-motion-handschrift.md   Motion-Tokens, vier Profile, Scroll-Animation in CSS
│  │  ├─ 19-recruiting-funnel.md    EVP, Funnel-Stufen, AGG, Bewerberdaten, JobPosting
│  │  ├─ 20-markenextraktion-bestandsseite.md  Logo, Farben, Schrift aus der alten Seite
│  │  ├─ 21-sektionshintergruende-hierarchie.md  Bildgrund, Trennung, Abstufung
│  │  ├─ 22-premium-designquellen.md  Awwwards, Dribbble, Land-book, recent.design, 21st.dev
│  │  ├─ 23-referenzkomponenten-21st.md  fünf annotierte 21st.dev-Beispielkomponenten
│  │  └─ 24-designsystem-vorrang.md  fünf Stufen, was eine Referenz beeinflussen darf
│  └─ assets/
│     ├─ vorlagen/                  marke.json, marke-brief.md, impressum.md, datenschutz.md,
│     │                             datenschutz-bewerber.md, consent-muster.md,
│     │                             robots.txt(.ts), sitemap.xsl, _headers, 404.astro,
│     │                             tokens.css, global-basis.css, head-meta.html,
│     │                             jsonld-bausteine.md,
│     │                             referenzkomponenten/ (Hero, FAQ, schwebende Elemente,
│     │                             Bewertungen, Integrationen)
│     └─ checklisten/               pre-launch.md, conversion-audit.md
└─ agentur-website-builder/         der Lieferablauf
   ├─ SKILL.md                      Phasen 0 bis 6, feste Agenturvorgaben, Definition of Done
   ├─ references/
   │  ├─ intake-und-entscheidungen.md  Projektart, Relaunch-Inventar, Bilder, Fragenkatalog
   │  ├─ stack-und-deployment.md    Node, Astro, wrangler.toml, Variablen, Git, Budget
   │  ├─ referenzen-und-auswahl.md  Rangfolge der Quellen, Ausgangsliste, Seitenaufbau
   │  ├─ copy-im-kundenprojekt.md   gelieferte Texte, Copy-Vorschläge kennzeichnen
   │  ├─ formulare-und-resend.md    Serverroute, Honigtopf, Turnstile, Rate Limit, Zustände
   │  ├─ leadsystem-dashboard.md    D1-Schema, Dashboard, Anmeldung, Löschfrist
   │  ├─ consent-und-dienste.md     Eigenbau, fünf Kategorien, Consent Mode, Dienstekatalog
   │  ├─ google-bewertungen.md      Places API serverseitig, KV-Cache, Darstellung
   │  ├─ qa-und-abnahme.md          Prüfablauf in acht Schritten, Abschlussbericht
   │  └─ firecrawl-recherche.md     bekannte/alte Seiten crawlen und scrapen, Firecrawl-API
   └─ assets/
      ├─ consent/                   ConsentBanner.astro, consent.ts
      ├─ forms/                     kontakt-route.ts, mail-template.ts
      └─ reviews/                   bewertungen-route.ts

scripts/
├─ pruefe-striche.mjs               Gedankenstriche, hyphens: auto, verbotene Wörter
├─ pruefe-tokens.mjs                hartcodierte Farb-, Abstands- und Schriftwerte
├─ pruefe-kontrast.mjs              Kontrastwerte der Rollen-Tokens
├─ pruefe-platzhalter.mjs           [[FEHLT]] und data-copy-vorschlag vor dem Livegang
├─ pruefe-breakpoints.mjs           acht Größen, Überlauf, Touchziele, Schriftgröße, CLS
├─ relaunch-inventory.mjs           Bestandsaufnahme der alten Kundenseite vor dem Relaunch
├─ design-scan.mjs                  Struktur- und Design-Scan einer fremden Referenzseite
├─ deslop-check.mjs                 selbst formulierte Copy auf generischen KI-Klang prüfen
└─ install-quellskills.sh           Quell-Skills zusätzlich installieren
```


## Installation

### Als Plugin-Marketplace

```bash
/plugin marketplace add hennebergwebdesign/Design-Skill
/plugin install webdesign-conversion@hennebergwebdesign
```

### Direkt in ein Projekt kopieren

Immer beide Ordner, sonst brechen die Querverweise zwischen ihnen:

```bash
mkdir -p .claude/skills
cp -r /pfad/zu/Design-Skill/skills/webdesign-conversion .claude/skills/
cp -r /pfad/zu/Design-Skill/skills/agentur-website-builder .claude/skills/
```

Danach greifen die Skills automatisch, sobald es um Website, Landingpage, Conversion,
Ladezeit, Barrierefreiheit, SEO oder Rechtstexte geht, und der Bauablauf zusätzlich, sobald
tatsächlich gebaut, überarbeitet oder relauncht wird. Direkt aufrufen geht auch:
`/webdesign-conversion` und `/agentur-website-builder`.

## Prüfen

Fünf Skripte, weil eine Regel ohne Prüfung in der dritten Sitzung zurückgedreht wird. Alle
laufen ohne Abhängigkeiten außer Node; nur das Breakpoint-Skript braucht Playwright.

```bash
node scripts/pruefe-striche.mjs       # Gedankenstriche, hyphens: auto, verbotene Wörter
node scripts/pruefe-tokens.mjs        # hartcodierte Farb-, Abstands- und Schriftwerte
node scripts/pruefe-kontrast.mjs      # rechnet die Kontrastwerte der Rollen-Tokens nach
node scripts/pruefe-platzhalter.mjs --launch   # [[FEHLT]] und data-copy-vorschlag
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
```

`pruefe-breakpoints.mjs` rendert acht Größen (die fünf Breakpoints plus 320 px, 1366 × 768 und
1440 × 720) und meldet horizontalen Überlauf mit dem Selektor des äußersten Verursachers, zu
kleine Touchziele, Schrift unter 14 px und Bilder ohne Maße.

Dazu drei Werkzeuge, die kein Ergebnis prüfen, sondern Material beschaffen und Texte
bewerten:

```bash
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
node scripts/design-scan.mjs https://wettbewerber-oder-inspiration.de
node scripts/deslop-check.mjs src/components/sektionen/Hero.astro
node scripts/deslop-check.mjs --text "Wir begleiten Sie ganzheitlich."
```

`relaunch-inventory.mjs` liest Sitemap oder interne Links, legt Seitenliste, Texte,
Rechtstext-Kandidaten und einen Weiterleitungsentwurf in `.relaunch-inventory/` ab. Mit
gesetztem `FIRECRAWL_API_KEY` läuft es über die Firecrawl API und erreicht auch Seiten, die
erst im Browser rendern, ohne Schlüssel über den eingebauten Crawler.

`design-scan.mjs` erfasst eine fremde, bekannte oder vom Kunden genannte Referenzseite für
die Recherche vor dem Tokensystem-Plan: Sektionsreihenfolge aus der Überschriftenhierarchie,
Wortzahl, Bildbelegung sowie Farb- und Schriftkandidaten aus dem Code, mit
`FIRECRAWL_API_KEY` zusätzlich ein Screenshot. Ablage in `.design-scan/<host>/`, siehe
`skills/agentur-website-builder/references/firecrawl-recherche.md`. Rohmaterial für die
eigene Sichtung, kein Text zum Übernehmen.

`deslop-check.mjs` bewertet fünf Kriterien und gibt eine Punktzahl von 0 bis 5: Floskeln,
Nominalstil, leere Superlative, fehlende Belege und die Dreierfigur. Er gilt für **eigene**
Textvorschläge. Gelieferte Kundentexte werden nicht geprüft und nicht umgeschrieben.

## Eval-Suite

`evals/` prüft mit `claude plugin eval`, ob der Skill seine eigenen Regeln tatsächlich
durchsetzt, und zwar im Vergleich zu einem Lauf **ohne** Skill.

```bash
claude plugin eval .
```

Gemessen (zwei Läufe je Arm): beim Gedankenstrich-Fall setzt das Modell ohne Skill in jedem
Lauf einen Halbgeviertstrich in deutsche Headlines und mit Skill in keinem (Δ +0.50). Beim
Landingpage-Fall übernimmt es ohne Skill zuverlässig die Hauptnavigation der bestehenden Seite
(Δ +0.75).

Die Suite hat dabei schon einen echten Fehler gefunden: das Landingpage-Playbook war so
formuliert, dass das Modell die Navigationsregel erkannte, dann aber um Erlaubnis fragte statt
zu liefern. Details in `evals/README.md`.

Neun Fälle insgesamt, davon zwei für den Agenturstandard: `consent-ohne-keks` und
`leadsystem-nur-auf-bestaetigung`. Diese beiden und der neue Fall
`kundendesignsystem-schlaegt-referenz` sind noch nicht gelaufen, ihr Δ ist damit eine
Vermutung und kein Messwert.

## Quell-Skills nachinstallieren

Dieser Skill ist eine Destillation. Wer die volle Tiefe braucht: die komplette
GSAP-Dokumentation, die durchsuchbaren UI/UX-Datensätze, die shadcn-Registry-Anbindung:
installiert die Originale zusätzlich:

```bash
bash scripts/install-quellskills.sh
```

Das legt sie unter `.claude/skills/` im aktuellen Projekt ab und schließt sie von
Volltextsuchen aus. In einem shadcn-Projekt bringt die shadcn-CLI ihren Skill selbst mit
(`npx shadcn@latest info`).

## Die Grundsätze in Kurzform

1. **Design ohne Strategie ist Dekoration.** Ohne Zielgruppe, Kernproblem und USP wird
   nicht gestaltet.
2. **Reihenfolge zählt:** Strategie → Struktur → Copy → Design → Bau → Test → Launch →
   Pflege. Wer mit Design anfängt, baut Dekoration.
3. **Harte Grenzen:** Kontrast 4,5:1, volle Tastaturbedienbarkeit, unter 2 Sekunden
   Ladezeit, Consent blockiert echt, `prefers-reduced-motion` wird respektiert.
4. **Keine erfundenen Zahlen.** Was nicht belegt ist, steht als `[[FEHLT: …]]` im Text und
   in der Liste offener Punkte: niemals als plausibel klingender Erfindungswert.
5. **Jede Regel bekommt ihren Grund.** Im Projekt-`CLAUDE.md` steht nicht nur, wie etwas
   gebaut ist, sondern warum. Das verhindert, dass die nächste Sitzung es zurückdreht.
6. **Prüfen statt behaupten.** Was nicht geprüft wurde, wird als ungeprüft benannt. Dafür
   liegen Skripte bereit, nicht nur Checklisten.
7. **Keine Gedankenstriche im Seitentext.** Der Strich als Satzzeichen ist das stärkste
   Erkennungsmerkmal maschinell geschriebener Texte, im Deutschen noch mehr als im
   Englischen. Ersatz: Doppelpunkt, Komma oder zwei Sätze. Bereichsstriche bei Zahlen und
   echte Bindestriche im Kompositum bleiben erlaubt.
8. **Eine Handschrift, vier Ausdrucksformen.** Palette, Spacing, Icons und Motion kommen aus
   derselben Entscheidung.
9. **Der Bauablauf ist Teil des Standards, nicht Beiwerk.** Analyse vor Rückfrage, Rückfrage
   vor Konzept, Konzept vor Code, Prüfung vor Fertigmeldung. Wer das überspringt, liefert
   Nacharbeit statt einer Seite.

## Rechtlicher Hinweis

Die Abschnitte zu DSGVO, DDG, BFSG, UWG und AGG sowie die Vorlagen für Impressum,
Datenschutzerklärung und Bewerberdatenschutz sind Arbeitsgrundlagen und Entwürfe. Sie stellen **keine
Rechtsberatung** dar. Für eine rechtsverbindliche Einschätzung ist ein Fachanwalt für
IT-Recht zuständig. Keine Haftung für Vollständigkeit, Richtigkeit oder Aktualität.

## Herkunft

Siehe [CREDITS.md](CREDITS.md).

## Lizenz

`webdesign-conversion`, die Prüfskripte und die Eval-Suite stehen unter MIT.

`agentur-website-builder` bildet den internen Lieferstandard von That's it. Marketing ab und
steht unter der Lizenz, die in seiner `SKILL.md` genannt ist. Wer das Plugin öffentlich
weitergibt und diesen Teil nicht mitveröffentlichen will, entfernt den Ordner
`skills/agentur-website-builder/`. Das Regelwerk bleibt dann für sich lauffähig, nur die
Verweise aus dem Bauablauf entfallen mit ihm.
