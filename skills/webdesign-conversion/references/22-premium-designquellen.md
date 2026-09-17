# Premium-Designquellen: erst suchen, dann entwerfen

`10-visuelle-richtung.md` verlangt einen bewussten Plan statt der Schablone, zu der man
ohnehin greift. Ein bewusster Plan braucht einen Vergleichspunkt: was gilt aktuell als
Premium, in genau dieser Branche oder Stilrichtung. Deshalb gehört eine kurze Recherche in
kuratierten Design-Galerien **vor** Durchgang 1 (Tokensystem-Plan), nicht danach als
Nachträgliche Inspiration.

**Pflicht bei Homepage- und Landingpage-Projekten:** mindestens eine der fünf Quellen unten
nach Branche, Zielgruppe oder Stilrichtung durchsuchen, 2–3 passende Referenzen mit Link und
„was übernommen wird" in `marke-brief.md` Abschnitt 7 notieren, danach erst den Plan
entwerfen. Ohne Netzzugriff in der Sitzung ersatzweise auf dokumentiertes Wissen zu
aktuellen Mustern dieser Quellen zurückgreifen und das als „ungeprüft, aus Trainingswissen"
kennzeichnen, siehe die Ehrlichkeitsregel in `SKILL.md`.

## Die fünf Quellen und wofür sie taugen

| Quelle | Was dort steht | Wofür nutzen |
|---|---|---|
| **[Awwwards](https://www.awwwards.com/)** | Prämierte Volltextseiten (Site of the Day/Month/Year), filterbar nach Branche und Technik (GSAP, WebGL, Framer, 3D) | Referenz für die **Gesamtkomposition**: wie eine ganze Seite orchestriert ist, wie der eine Motion-Moment aus `18-motion-handschrift.md` gesetzt wird |
| **[Dribbble](https://dribbble.com/)** | Einzelne Shots: Buttons, Karten, Icons, Farbpaletten, Micro-Interactions | Referenz für **Details**, nicht für die Gesamtstruktur einer Seite. Gut für Icon-Stil (`17-icons-eigenes-system.md`) und Farbstimmungen |
| **[Land-book](https://land-book.com/)** | Handkuratierte Landingpages nach Kategorie (Landings, Portfolios, Blogs, Stores), eigene Galerien für isolierte **Sections**, Motion und Headlines | Direkter Fundus für **Abschnittsauswahl**: welche Sektionstypen in dieser Branche gerade überzeugen, bevor die Sektionsliste aus `00-fahrplan.md` Schritt 2 feststeht |
| **[recent.design/websites](https://recent.design/websites)** | Täglich aktualisierte Auswahl frischer Website-Launches, breites Spektrum | **Frischecheck:** ob eine Richtung schon Standard ist, weil sie überall auftaucht (Abgleich gegen die Schablonen-Liste in `10-visuelle-richtung.md`) |
| **[21st.dev](https://21st.dev/)** | Community-Registry für React/Tailwind/shadcn-Komponenten mit fertigem Code: Marketing-Blocks (Heroes, Bento-Grids, Verläufe, Footer), UI-Komponenten | Bei React/Next-Projekten mit shadcn/ui (`11-komponenten-shadcn.md`) direkt einsetzbarer **Code-Startpunkt** für einen Abschnitt, danach an die Handschrift des Projekts angepasst |

## Wie recherchiert wird

1. **Branche und Stilrichtung aus dem Markenbrief nehmen**, nicht raten. Ein Dachdecker und
   ein Biotech-Spin-off suchen in unterschiedlichen Kategorien.
2. **Auf mindestens einer Quelle gezielt filtern** (Branche, Kategorie, Technik), nicht die
   Startseite nach dem ersten Eindruck durchscrollen.
3. **2–3 Referenzen konkret benennen:** Name/Link, welcher Abschnitt oder welches Detail
   übernommen wird, und was bewusst nicht übernommen wird (siehe die Anti-Schablonen-Prüfung
   in `10-visuelle-richtung.md`).
4. **Erst danach** den Plan aus `10-visuelle-richtung.md` Durchgang 1 entwerfen. Die
   Referenzen sind der Ausgangspunkt für „was ist aktuell Premium", der Plan bleibt trotzdem
   eine eigene Entscheidung für genau dieses Projekt.

## Inspiration, kein Copy-Paste

- Eine Referenz liefert **ein Prinzip** (Bildhintergrund im Held, ein Bento-Grid für
  Leistungen, ein bestimmter Übergang zwischen Sektionen), nie eine 1:1-Kopie aus Layout,
  Farbe und Text zusammen. Sonst entsteht dieselbe Schablonenhaftigkeit, die
  `10-visuelle-richtung.md` vermeiden will, nur mit einem einzigen Vorbild statt vielen.
- **Fremdes Logo, fremde Produktfotos und fremder Text** aus einer Referenzseite werden nie
  übernommen, siehe die rechtlichen Grenzen in `20-markenextraktion-bestandsseite.md`. Farbe,
  Layout-Idee und Motion-Prinzip sind Stil, kein geschütztes Asset.
- **Code von 21st.dev** ist meist unter freizügiger Lizenz, aber vor Übernahme trotzdem auf
  die Lizenz des konkreten Blocks prüfen und in jedem Fall an Tokensystem, Farbpalette und
  Motion-Handschrift des Projekts anpassen, nicht unverändert einfügen (kein Wert ohne
  Token, siehe die harte Grenze in `SKILL.md`).

## Eine bekannte oder alte Seite als Referenz erfassen

Manchmal ist die Referenz keine kuratierte Galerie, sondern eine konkrete, bekannte Seite,
etwa ein Wettbewerber oder eine Seite, die der Kunde nennt. Für Struktur, Sektionsreihenfolge
und Inhaltsumfang einer solchen Seite steht `scripts/design-scan.mjs` bereit, siehe
`../../agentur-website-builder/references/firecrawl-recherche.md`. Es liefert Rohmaterial für
Punkt 3 unten (Prinzipien benennen), ersetzt die eigene Sichtung nicht.

## Verwandte Kapitel

- Visuelle Richtung, Anti-Schablone, Durchgang 1/2: `10-visuelle-richtung.md`
- Sektionsliste und Reihenfolge: `00-fahrplan.md`
- Bildhintergründe und Sektionstrennung: `21-sektionshintergruende-hierarchie.md`
- React/Next-Komponenten, shadcn/ui: `11-komponenten-shadcn.md`
- Fünf annotierte 21st.dev-Beispielkomponenten: `23-referenzkomponenten-21st.md`
- Bekannte oder alte Seiten per Firecrawl erfassen:
  `../../agentur-website-builder/references/firecrawl-recherche.md`
