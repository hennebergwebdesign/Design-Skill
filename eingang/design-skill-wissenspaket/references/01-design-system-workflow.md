# Design System Workflow: 25 Tricks, nach Phasen sortiert

Quelle: Video 5 (25 Tricks to Level Up Claude Design), ergänzt durch Video 4 (Regel 11) und Video 3.

## Grundprinzip

Das Ergebnis sieht "vibe coded" aus, wenn der Agent Defaults nutzt: Standard Font, Standard Farben, cremefarbener Hintergrund, kursive Hervorhebungen in Headlines, KI typische Texte. Gegenmittel ist immer dasselbe: ein explizites Design System als Eingabe, plus Referenzen, plus eigene Copy Regeln. Ein Prompt wie "mach es weniger generisch" tauscht nur einen Default gegen den nächsten (Video 4, Regel 11).

## Phase 1: Fundament (Tricks 1 bis 7)

1. Design System zuerst. Beschreibung des Business, Fonts, Logos, Assets. Alternativ ein Deck, eine Website oder einen Screenshot einwerfen, Claude zieht Farben, Fonts, Komponenten heraus.
2. Stilbibliothek als Rohmaterial: styles.referero.design (über 2.000 Design Systeme, maschinenlesbar mit Farben, Typo, Spacing). Eines öffnen, kopieren, in Claude einfügen, Anpassungen nennen.
3. Shortlist durch Claude: Link zur Galerie geben, "finde die 3 Systeme, die zu meinem Business am nächsten passen, mit Links". Nicht selbst durchblättern.
4. Design System als Skill im Code Umfeld: Eigener Skill pro Stil (Beispiel im Video: /duolingo Skill, der Material in diesem Stil erzeugt). Vorteil gegenüber Web App: Zugriff auf lokale Dateien.
5. Fonts bewusst wählen: Fontshare oder Fontesk (beide gratis), Pairings über Fontjoy. Font Dateien ins Design System legen oder im Prompt benennen. Der Standard Font ist das schnellste Erkennungszeichen für KI Design.
6. Copy ins Design System: Top 5 Wettbewerber der Nische analysieren, Muster in ihrer Copy notieren, als Regeln ins Design System schreiben.
7. Systeme mischen: In einer Session mehrere Systeme laden und festlegen, was von wem kommt (Typo von A, Farbe und Motion von B). Ergebnis wirkt eigenständig statt kopiert.

## Phase 2: Material und Bausteine (Tricks 8 bis 19)

8. Bilder und Videos über einen Generator anbinden (Claude Design kann selbst keine). Siehe 06-bildgenerierung-skill.md.
9. Vorheriges Projekt referenzieren: URL oder Session Name des fertigen Projekts angeben, "nutze dessen Design System und Assets". Funktioniert auch in Claude Code.
10. Eigene Referenzbibliothek: Dribbble, Awards Seiten, X. Im Video: eigene Chrome Extension, die Seite plus Screenshot plus Notiz speichert. Geschmack wächst mit gesehenen guten Designs, und Claude kann die Bibliothek als Referenz lesen.
11. Impeccable: Design Skill mit Befehlssatz zum "Entslopen". Auditiert Hierarchie, Abstände, Typo, Accessibility, Empty States und korrigiert. Gut für das Polieren eines Entwurfs.
12. Tone of Voice Skill: Verbotene Wörter, Sprechweise, eigene Beispielsätze. Zusätzlich fertige Regelwerke einbinden (ASD STE 100 Simplified Technical English, Google Developer Documentation Style Guide, Apple Writing Style).
13. 21st.dev: Komponentenbibliothek, Komponente kopieren, "nutze diese Komponente". Spart Tokens, weil bewährte Sektion statt Neuentwurf.
14. React Bits (reactbits.dev): auffälligere Komponenten (animierter Text, Glass Cards, Cursor Effekte).
15. Canvas UI (canvasui.dev): laut Video 24 bis 35 Effekte (Liquid Glass, Shatter, Particle Reveal, Hex Float Grid, Bubble Cursor, Dither). Parameter im Browser einstellen, Code kopieren, Claude übergeben.
16. Icons nicht von Claude zeichnen lassen: Iconify oder Flaticon, ein Pack in einem Stil, Ordner an Claude geben. Dient zugleich als Stilreferenz für spätere eigene Icons.
17. SVG als Format für Icons, Illustrationen, Diagramme: skalierbar, von Hand änderbar, animierbar.
18. Lordicon: animierte Icons als Lottie Dateien, Animation ist bereits eingebaut.
19. Creators Toolbox (creatorstoolbox.com, Bereich Resources): Verzeichnis mit über 150 Gratis Ressourcen (Komponenten, three.js Effekte, SVG Icons, Logogalerien, Mockups).

## Phase 3: Fortgeschritten (Tricks 20 bis 25)

20. Apple Human Interface Guidelines als Skill (Layout, Schriftgrößen, Tap Targets, Farbe), damit App Screens nicht geraten werden.
21. GSAP für Motion und Interaktion (Scroll gesteuerte Sektionen, Text Reveals). Bibliothek, die laut Video viele Top Agenturen einsetzen.
22. /design in Claude Code: Canvas mit editierbaren Artboards, kennt Workspace, Regeln und Memory.
23. Tweaks Panel: Slider Panel für Typo, Abstände, Farben auf jeder HTML Seite, Werte werden am Ende ins Design zurückgeschrieben. Eigener Tweak Skill möglich.
24. Transkript zu Motion Graphics: Whisper liefert Transkript mit Wort Zeitmarken, Claude findet Stellen, die eine Animation brauchen, baut Clips mit Hyperframes passend zum Gesagten. Bonus: vorhandenes Design System verwenden.
25. Eigenes Design Betriebssystem: kleine Micro App, in der jedes fertige Design, jedes Bild und Video indexiert ist, plus Element Bibliothek (3D Assets, Motion, SVG Icons) der Marke.

## Reihenfolge für ein neues Kundenprojekt

Referenzen und Wettbewerber sammeln, Design System (Fonts, Farben, Copy Regeln), Komponenten und Icons festlegen, MVP bauen, erst danach polieren (Impeccable, Gauntlet Loop, Tweaks), dann Motion.
