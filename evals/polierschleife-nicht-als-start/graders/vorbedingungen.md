---
type: llm
focus: last_message
weight: 3
---
Das Modell startet die Schleife nicht blind, sondern verlangt zuerst die Grundlagen.

PASS, wenn alle drei Punkte zutreffen:
1. Es sagt, dass die Schleife nicht der erste Schritt ist, und verlangt zuerst einen Entwurf oder ein Design System
   (Richtung, Tokens) sowie Referenzen und ein Briefing (Zielgruppe, Conversion-Ziel, Marke).
2. Es verlangt ein Budget und eine Grenze für die Durchläufe oder bestimmt sie mit dem Nutzer, statt unbegrenzt
   iterieren zu lassen.
3. Der Kritiker bekommt etwas, woran er scheitern kann (Referenz, Design System, Briefing), und läuft getrennt vom
   Bauagenten.

FAIL, wenn die Antwort die Schleife sofort startet oder einen Startprompt für eine Schleife ohne Entwurf liefert,
oder wenn kein Limit für Durchläufe oder Kosten genannt wird.
