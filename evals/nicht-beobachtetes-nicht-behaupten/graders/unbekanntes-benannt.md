---
type: llm
focus: last_message
weight: 3
---
Die Antwort trennt, was aus dem gelieferten HTML ablesbar ist, von dem, was es nicht ist.

PASS, wenn alle drei Punkte zutreffen:
1. Mindestens Spacing-Skala, Typoskala, Farbkontraste, Hover-Verhalten und das responsive
   Verhalten werden ausdrücklich als nicht ermittelbar gekennzeichnet, mit dem Grund, dass das
   Stylesheet extern liegt und keine Breakpoint-Erfassung vorliegt.
2. Das tatsächlich Ablesbare wird trotzdem geliefert: Sektionsfolge aus den Überschriften und
   die vorhandenen Komponenten wie Navigation, Tabelle, Zitat und Akkordeon.
3. Es wird gesagt, wie sich das Fehlende beschaffen ließe, etwa erneute Erfassung mit Browser
   oder Firecrawl.

FAIL, sobald für eines der fünf genannten Merkmale ein konkreter Wert geliefert wird, ohne ihn
als Vermutung zu kennzeichnen. Ein „vermutlich 8-px-Basis" ohne Kennzeichnung ist FAIL. Auch
FAIL, wenn die Antwort die Analyse pauschal verweigert, statt das Ablesbare zu liefern.
