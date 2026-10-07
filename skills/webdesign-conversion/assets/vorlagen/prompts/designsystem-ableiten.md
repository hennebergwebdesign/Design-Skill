# Design System aus Material ableiten

Zwei erlaubte Quellen, nicht mehr:

1. **Das eigene Material des Kunden**: Logo, Styleguide, bestehende Seite des Kunden (Messung mit
   `scripts/brand-extraktion.mjs`, siehe `20-markenextraktion-bestandsseite.md`), gelieferte Dateien.
2. **Freigegebene Referenzen** aus der Designrecherche (`referenz-register.mjs`), nur als
   Inspirations-Eingabe der Stufe 5 aus `24-designsystem-vorrang.md`: Aufbau, Rhythmus, Hierarchie.

Nicht erlaubt: Farbwerte, Schrift oder Logo einer fremden Marke aus einem Screenshot oder einer URL
ableiten. Das ist die harte Grenze zur Markenextraktion in `SKILL.md`.

```
Leite aus [[FEHLT: Quelle 1 oder freigegebene Referenz mit Kennung]] ein Design System ab: Farben mit
Rollen, Typografie (Schrift, Skala, Zeilenhöhe), Abstände, Radien, Schatten, Motion-Prinzipien. Gib sie
als CSS-Variablen für tokens.css und als kurze Regelbeschreibung aus. Jeder Wert nennt seine Herkunft
(beobachtet, abgeleitet, gesetzt).

Mischen: Aufbau von [[FEHLT: Referenz A]], Rhythmus von [[FEHLT: Referenz B]]. Nenne, was verworfen
wurde, und wähle bei Widerspruch nach dem Konfliktformat aus 24-designsystem-vorrang.md.

Sperren: Schriftwahl nach 10-visuelle-richtung.md (Vorgabe des Kunden zuerst, dann zwei Kandidaten mit
Begründung, selbst gehostet). Kein cremefarbener Grund ohne Markenentscheidung, keine kursiven Zierwörter.

Texte: Analysiere die fünf stärksten Wettbewerber in [[FEHLT: Nische]] und leite Muster ab (Ansprache,
Satzlänge, Nutzenform, Stil der Handlungsaufforderung), nach copy-im-kundenprojekt.md. Keine Sätze
übernehmen.
```
