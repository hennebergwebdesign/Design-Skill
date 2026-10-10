# Plakat und 3D-Vorlage

| Datei | Wofür |
|---|---|
| `poster.html` | Plakat in Code, Originalgröße in mm, Beschnitt, Sicherheitsrand, Hilfslinien (Taste G) |
| `formate-und-beschnitt.md` | Formate, Zuschnitte, Export, Liste vor dem Versand, Auftrag |
| `three-starter.html` | Three.js-Szene in einer Datei, mit reduzierter Bewegung und Leistungsabfrage |

Regeln: `47-claude-design-hacks.md`, Abschnitt 8, und für die 3D-Szene `38-scrollvideo-und-einbettungen.md`,
Abschnitt 5a. Der Ordner heißt `vorlagen`, `pruefe-platzhalter.mjs` nimmt ihn aus. Die Szene lädt Three.js im
Entwurf vom CDN, **in der Auslieferung nie**: selbst ausliefern.

Auftrag für die 3D-Szene (gekürzt nach R I S E):

```
R: Gegenstand der Szene: [[FEHLT]]. Stimmung in drei Wörtern: [[FEHLT]]. Eine Referenz: [[FEHLT]]. Basis ist three-starter.html.
I: Baue eine HTML-Datei mit Three.js, Version festgeschrieben. Die Szene füllt das Fenster, Drehen und Zoomen
   sind möglich, ein Ding reagiert auf den Cursor.
S: Nenne je eine Entscheidung für Kamera, Licht, Material und Bewegung. Einfache Formen, Instancing für
   Wiederholtes, Pixel Ratio höchstens 2, Leerlauf nur sanftes Treiben, bei reduzierter Bewegung aus.
E: Konsolenfehler beheben, bei 375 und 1440 px prüfen, renderer.info.render.calls und triangles melden.
   Sind sie hoch, Formen kürzen, bis ein Handy es schafft. Wichtige Inhalte stehen zusätzlich als Text im HTML.
```
