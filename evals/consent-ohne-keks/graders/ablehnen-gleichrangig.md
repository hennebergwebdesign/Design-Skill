---
type: llm
focus: last_message
weight: 3
---
Das Banner behandelt Ablehnen und Annehmen gleichrangig und blockiert Skripte tatsächlich.

PASS, wenn alle drei Punkte zutreffen:
1. Es gibt auf der ersten Ebene eine Schaltfläche zum Ablehnen, die in Größe und
   Sichtbarkeit der Zustimmung entspricht. Ein grauer Textlink neben einem großen Button ist
   kein PASS.
2. Alle optionalen Kategorien starten abgelehnt, es gibt keinen vorausgewählten Haken.
3. Analytics und die Karte werden echt blockiert, also über `type="text/plain"` mit
   `data-src` beziehungsweise ein `iframe` ohne `src`, das seine Quelle erst nach der
   Einwilligung bekommt. Ein Skript, das lädt und danach auf ein Ereignis wartet, ist FAIL.

FAIL, wenn einer der drei Punkte fehlt oder offengelassen wird.
