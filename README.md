# Webdesign Conversion Skill

Ein zusammengeführter Claude-Skill für conversion-orientiertes Webdesign im DACH-Raum.
Er vereint mehrere öffentliche Design- und Animations-Skills mit dem
Website-Conversion-Playbook, den rechtlichen Pflichten (DSGVO, DDG, BFSG) und den
Hausstandards aus produktiven Astro-Projekten.

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

**Prüfskripte statt Checkboxen.** Eine Regel ohne Prüfung wird in der dritten Sitzung
zurückgedreht. Fünf Skripte prüfen Gedankenstriche, Tokens, Kontrast, Platzhalter und acht
Bildschirmgrößen samt horizontalem Überlauf.

**Vorlagen zum Übernehmen** statt Beschreibungen zum Nachbauen.

```
skills/webdesign-conversion/
├─ SKILL.md                         Einstieg, Typwahl, sechs Bereiche, harte Grenzen
├─ playbooks/
│  ├─ homepage.md                   vollständige Unternehmenswebsite
│  ├─ landingpage.md                eine Seite, ein Ziel, keine Navigation
│  └─ recruiting-funnel.md          mehrstufig, mobil zuerst, AGG und Bewerberdaten
├─ references/
│  ├─ 00-fahrplan.md                Strategie → Struktur → Copy → Design → Bau → Test → Launch
│  ├─ 01-strategie-positionierung.md  Zielgruppenformel, USP-Formel, Einwände
│  ├─ 02-design-ux.md               Above the Fold, F-Pattern, 3-Klick-Regel, Layout
│  ├─ 03-technik-performance.md     2-Sekunden-Regel, Bilder, Caching, fünf Breakpoints
│  ├─ 04-barrierefreiheit-bfsg.md   BFSG, Kontrast, Alt-Texte, Tastatur, WCAG 2.2 AA
│  ├─ 05-seo-sichtbarkeit.md        Keywords, URLs, Meta, interne Links, JSON-LD
│  ├─ 06-conversion-architektur.md  CTA-Hierarchie, 10-Sekunden-Formular, Trust, Über uns
│  ├─ 07-recht-dsgvo.md             Impressum, Datenschutz, Consent, Auftragsverarbeitung
│  ├─ 08-pflichtseiten-technik.md   404, robots.txt, Sitemap, Redirects, Header
│  ├─ 09-motion-gsap.md             GSAP, ScrollTrigger, reduzierte Bewegung, Performance
│  ├─ 10-visuelle-richtung.md       Tokens, Typografie, Stilrichtungen, Anti-Schablone
│  ├─ 11-komponenten-shadcn.md      shadcn/ui-Regeln für React und Next.js
│  ├─ 12-copywriting.md             Botschaftshierarchie, Angebot, Einwände, Deutsch, Striche
│  ├─ 13-messung-optimierung.md     GA4, Heatmaps, monatlicher Review, A/B
│  ├─ 14-projektstruktur-astro.md   Referenzstack, CLAUDE.md, Fallstricke
│  ├─ 15-spacing-rhythmus.md        Abstand als Hierarchiesignal, drei Rhythmus-Ebenen
│  ├─ 16-responsive-container.md    Eskalationspfad, Container Queries, svh/dvh, acht Szenarien
│  ├─ 17-icons-eigenes-system.md    Icon-Set ableiten, 24er Raster, optische Korrektur
│  ├─ 18-motion-handschrift.md      Motion-Tokens, vier Profile, Scroll-Animation in CSS
│  └─ 19-recruiting-funnel.md       EVP, Funnel-Stufen, AGG, Bewerberdaten, JobPosting
└─ assets/
   ├─ vorlagen/                     marke.json, marke-brief.md, impressum.md, datenschutz.md,
   │                                datenschutz-bewerber.md, consent-muster.md,
   │                                robots.txt(.ts), sitemap.xsl, _headers, 404.astro,
   │                                tokens.css, global-basis.css, head-meta.html,
   │                                jsonld-bausteine.md
   └─ checklisten/                  pre-launch.md, conversion-audit.md

scripts/
├─ pruefe-striche.mjs               Gedankenstriche, hyphens: auto, verbotene Wörter
├─ pruefe-tokens.mjs                hartcodierte Farb-, Abstands- und Schriftwerte
├─ pruefe-kontrast.mjs              Kontrastwerte der Rollen-Tokens
├─ pruefe-platzhalter.mjs           [[FEHLT]] und data-copy-vorschlag vor dem Livegang
├─ pruefe-breakpoints.mjs           acht Größen, Überlauf, Touchziele, Schriftgröße, CLS
└─ install-quellskills.sh           Quell-Skills zusätzlich installieren
```


## Installation

### Als Plugin-Marketplace

```bash
/plugin marketplace add hennebergwebdesign/Design-Skill
/plugin install webdesign-conversion@hennebergwebdesign
```

### Direkt in ein Projekt kopieren

```bash
mkdir -p .claude/skills
cp -r /pfad/zu/Design-Skill/skills/webdesign-conversion .claude/skills/
```

Danach greift der Skill automatisch, sobald es um Website, Landingpage, Conversion,
Ladezeit, Barrierefreiheit, SEO oder Rechtstexte geht. Direkt aufrufen geht auch:
`/webdesign-conversion`.

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

## Rechtlicher Hinweis

Die Abschnitte zu DSGVO, DDG, BFSG, UWG und AGG sowie die Vorlagen für Impressum,
Datenschutzerklärung und Bewerberdatenschutz sind Arbeitsgrundlagen und Entwürfe. Sie stellen **keine
Rechtsberatung** dar. Für eine rechtsverbindliche Einschätzung ist ein Fachanwalt für
IT-Recht zuständig. Keine Haftung für Vollständigkeit, Richtigkeit oder Aktualität.

## Herkunft

Siehe [CREDITS.md](CREDITS.md).

## Lizenz

MIT.
