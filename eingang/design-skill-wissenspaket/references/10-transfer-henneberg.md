# Transfer in den Henneberg Workflow

Abgeleitet aus allen 9 Videos. Das sind Empfehlungen, keine Aussagen der Videos. Stack laut Projektstand: Astro auf Cloudflare Pages, teils Next.js, Tailwind, GSAP.

## Was in den Design Skill gehört (nach Priorität)

| Prio | Baustein | Quelle | Wirkung |
|---|---|---|---|
| 1 | Design System Pflicht vor jedem Entwurf (Fonts, Farben, Abstände, Copy Regeln, verbotene Defaults) | V4 R11, V5 T1 bis T7 | Weg vom Vibe Coded Look |
| 1 | Font Regel: nie Standard Font, immer Fontshare, Fontesk oder Kundenfont, Pairing prüfen | V5 T5 | Schnellster Qualitätshebel |
| 1 | Komponenten zuerst (21st.dev, React Bits, Canvas UI), Neuentwurf zuletzt | V5 T13 bis T15 | Tokens und Konsistenz |
| 1 | Icon Regel: ein Pack, SVG, keine KI gezeichneten Icons | V5 T16 bis T18 | Konsistenz |
| 1 | Sicherheit: DCG oder gleichwertiger Hook, Backup vor großen Läufen | V1 | Schutz von Kundenprojekten |
| 2 | Copy Regeln pro Kunde aus Wettbewerber Analyse, Tone of Voice Skill, Anti Slop Liste | V5 T6, T12, V1 | Weniger KI Sound |
| 2 | Referenzbibliothek pro Branche (Handwerk, Bau, Gastronomie, Coaching, Betreuung) | V5 T10 | Geschmack und Tempo |
| 2 | Checkliste für lange Builds (Sektionen, Breakpoints, Meta, Schema, Formulare) | V4 R8 | Vollständigkeit |
| 2 | Review per Screenshot Crop und Zoom je Sektion | V4 R12 | Genauigkeit |
| 3 | Gauntlet Loop nur zum Polieren, nie als Start | V8 | Qualität mit Budget Deckel |
| 3 | Storyboard vor Scroll Animation, Annotation direkt am Screenshot | V3 | Weniger Rückfragen |
| 3 | Tweaks Panel zum Feinschliff mit Kunde | V5 T23 | Live Abstimmung |
| 3 | /generate Skill für Bildmaterial mit Budget Deckel und Log | V9 | Kosten, Rechte, Archiv |
| 4 | Entscheidungsmodell für Formular Triage und Skill Routing | V6, V2 | Später, nach Datenschutz Prüfung |

## Konkrete Regeln für den Skill Text (Entwurf)

1. Starte nie mit "mach eine schöne Seite". Lege zuerst das Design System an oder lade das des Kunden. Für Henneberg Marken Arbeit gilt das Henneberg Design System aus dem Repo henneberg-homepage.
2. Verbiete Defaults ausdrücklich: Creme Hintergrund, kursive Zierwörter in Headlines, Standard Font, Gradient Blobs ohne Funktion, generische Icon Sets, Stock Gesten.
3. Branchenpassung vor Effekt: Effekte (Hex Grid, Shader) nur, wenn sie zur Zielgruppe passen. Handwerk, Bau, Betreuung und Gastronomie brauchen Vertrauen, Klarheit und Lesbarkeit zuerst.
4. Barrierefreiheit und Performance sind Teil der Fertigstellung: Kontrast, Tap Targets (Apple HIG als Orientierung), reduzierte Bewegung, Lighthouse, Bildformate.
5. Tests gegen das Briefing: Jede Abnahme prüft Marke, Zielgruppe, Conversion Ziel, nicht nur Optik (Lehre des Ketone IQ Beispiels).
6. Motion: GSAP, erst Frames dann Animation, `prefers-reduced-motion` respektieren.
7. Copy Regel Mike: in geschriebenen Texten grundsätzlich keine Bindestriche verwenden.
8. Rechtliches: Cookie Consent und Datenverarbeitung nach Standard Lösung, keine Kundendaten an unbewertete Drittanbieter (Jev, Aggregatoren) ohne Prüfung.

## Offene Punkte zur Prüfung

* Repo Struktur des Design Skills nicht eingesehen. Dateien ggf. umbenennen oder zusammenführen.
* Modellnamen und Preise aus den Videos aktualisieren, bevor sie in Angebote oder Kundendokumente wandern.
* Kanal PDFs (n67, n68, n70, n74, n75, n76, n79) enthalten laut Beschreibung Prompts. Optional separat herunterladen und ergänzen.
