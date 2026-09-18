# Referenzkomponenten von 21st.dev

`22-premium-designquellen.md` nennt 21st.dev als Quelle für einen direkt einsetzbaren
Code-Startpunkt bei React/Next-Projekten mit shadcn/ui. Dieses Kapitel dokumentiert fünf
konkrete Beispiele, die dem Skill vorgelegt wurden, mit dem Prinzip, das jedes zeigt, und was
vor der Übernahme in ein Kundenprojekt zu tun ist. Der Code liegt in
`../assets/vorlagen/referenzkomponenten/`.

## Warum das hier steht und nicht nur als Link

Ein Registry-Name im Konzept ("nimm eine 21st.dev-Hero") hat noch nichts beigetragen, siehe
die Regel dazu in `../../agentur-website-builder/references/referenzen-und-auswahl.md`. Diese
Dateien machen konkret, welches Prinzip an welcher Stelle steckt, damit es beim Entwerfen
tatsächlich benannt und bewusst übernommen oder verworfen wird, statt die ganze Komponente
unverändert einzufügen.

## Die fünf Beispiele

| Datei | Registry-Herkunft | Status | Prinzip |
|---|---|---|---|
| `hero-vollbild.tsx` | `hero-section` in ähnlicher Form, 21st.dev | vollständiger Quelltext | Vollbild-Hero mit Bildhintergrund, freistehende Pillennavigation über dem Bild statt eigener Kopfzeile, gestaffelte Eintrittsanimation (`animate-fade-slide-in-1` bis `-4`), Partnerlogoreihe als Vertrauensbeweis direkt unter dem Held |
| `faq-akkordeon.tsx` | `faq` (shadcn-Block), 21st.dev | vollständiger Quelltext | Zweispaltiges FAQ: links Kontext und ein Ausweich-CTA für Fragen außerhalb der Liste, rechts das Akkordeon. Trennt Einwandbehandlung (Liste) von Kontaktoption (CTA), statt beides zu vermischen |
| `hero-schwebende-elemente-demo.tsx` | `hero-section-7`, 21st.dev | **nur Demo-Aufruf**, Basiskomponente nicht geliefert | Produktbilder als freigestellte, leicht schwebende Elemente um eine zentrierte Headline, Reduktion auf Motion statt auf einen Bildhintergrund |
| `bewertungen-demo.tsx` | `testimonial-v2`, 21st.dev | **nur Demo-Aufruf**, Basiskomponente nicht geliefert | Testimonial-Sektion als eigene Komponente statt Inline-Markup, Platzhalter für Struktur, nicht für Inhalt |
| `integrationen-demo.tsx` | `integrations-5`, 21st.dev | **nur Demo-Aufruf**, Basiskomponente nicht geliefert | Logo-Grid für Partner/Integrationen als eigene Sektion mit eigenem Datenformat |

**Zu den drei Demo-Aufrufen:** Die Nutzervorlage enthielt nur den Aufrufcode, nicht den
Quelltext der referenzierten Komponente (`hero-section-7`, `testimonial-v2`,
`integrations-5`). Diese Datei erfindet den fehlenden Quelltext nicht, siehe die Regel gegen
erfundene Belege in der Repo-`CLAUDE.md`. Wird eine dieser drei gebraucht, sie über
`npx shadcn@latest search` oder direkt auf 21st.dev nachschlagen und den echten Quelltext
holen, siehe Ablauf in `11-komponenten-shadcn.md`.

## Vor der Übernahme in ein Kundenprojekt

Dieselben Regeln wie für jede fremde Referenz, siehe
`../../agentur-website-builder/references/referenzen-und-auswahl.md` und die harte Grenze
„Jedes Projekt bekommt eine eigene Handschrift" in `SKILL.md`:

1. **Kein Wert ohne Token.** Die Beispiele arbeiten mit Tailwind-Utility-Klassen und
   teilweise rohen Farben (`bg-white/10`, `text-neutral-900`). Vor der Übernahme auf
   Rollen-Tokens der Marke ummünzen, siehe `10-visuelle-richtung.md`.
2. **Bildmaterial ist Platzhalter.** Alle `cdn.21st.dev`-Bildadressen sind Demo-Assets der
   Registry, kein lizenziertes Bildmaterial für ein Kundenprojekt. Ersetzen, nie live lassen.
3. **Eigene Bewegungssignatur statt Standard-Keyframes.** `animate-float` und
   `animate-fade-slide-in-*` sind generische Registry-Animationen. Für den Einsatz gegen die
   Motion-Tokens des Projekts austauschen, siehe `18-motion-handschrift.md`. Sonst verrät die
   Seite die Schablone, siehe die harte Grenze dazu in `SKILL.md`.
4. **Barrierefreiheit nachprüfen**, nicht annehmen. Beispielsweise haben Bildhintergründe in
   `hero-vollbild.tsx` ein leeres `alt=""`, was hier korrekt ist, weil der Text im Held selbst
   steht, aber bei jeder Übernahme neu zu prüfen, siehe `04-barrierefreiheit-bfsg.md`.
5. **Englischer Beispieltext wird nicht übernommen.** Er ist Platzhalter der Registry. Texte
   kommen aus dem Markenbrief oder werden nach `12-copywriting.md` entworfen und markiert.

## Als Muster in der Bibliothek

Alle fünf sind seit Version 3.6.0 zusätzlich als Muster in `../assets/musterbibliothek/muster/`
geführt, mit Prinzip, Belegen und Metadaten:

| Datei hier | Muster |
|---|---|
| `hero-vollbild.tsx` | `hero-vollbild-pillennavigation.md` |
| `faq-akkordeon.tsx` | `faq-zweispaltig-mit-kontaktausweg.md` |
| `hero-schwebende-elemente-demo.tsx` | `hero-schwebende-produktbilder.md`, Konfidenz niedrig |
| `bewertungen-demo.tsx` | `bewertungen-als-eigene-sektion.md`, Konfidenz niedrig |
| `integrationen-demo.tsx` | `partnerlogos-als-integrationsraster.md`, Konfidenz niedrig |

Die drei Muster mit Konfidenz niedrig sind genau die drei, für die nur der Demo-Aufruf vorlag.
Die Schwäche steht im Muster selbst, damit sie beim Einsatz auffällt und nicht erst im
Projekt. Verfahren: `25-designmuster-bibliothek.md`.

## Verwandte Kapitel

- Recherche vor dem Entwurf, die fünf Quellen: `22-premium-designquellen.md`
- shadcn/ui-Regeln, Registry-Ablauf, Docs vor Code: `11-komponenten-shadcn.md`
- Visuelle Richtung, Tokens, Anti-Schablone: `10-visuelle-richtung.md`
- Motion-Tokens statt generischer Keyframes: `18-motion-handschrift.md`
- Rangfolge der Quellen und was aus einer Referenz übernommen werden darf:
  `../../agentur-website-builder/references/referenzen-und-auswahl.md`
