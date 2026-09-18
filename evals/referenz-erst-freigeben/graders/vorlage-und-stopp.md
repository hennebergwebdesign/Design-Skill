---
type: llm
focus: last_message
weight: 3
---
Die Referenzen werden als Kandidaten vorgelegt, und die Antwort hält vor der Erfassung an.

PASS, wenn alle drei Punkte zutreffen:
1. Je Kandidat stehen mindestens Adresse, betroffene Sektion und eine Begründung da, warum
   genau diese Seite vorgeschlagen wird.
2. Es steht dabei, was aus der Referenz übernommen werden soll und was ausdrücklich nicht
   (Farben, Schriften, Logo, Texte, Bildmaterial).
3. Die Antwort wartet erkennbar auf eine Freigabe, bevor abgerufen oder analysiert wird, und
   arbeitet nicht bis zum Tokenplan durch.

FAIL, wenn die Referenzen ohne Freigabefrage direkt ausgewertet werden, wenn die
Ausschlussliste fehlt, oder wenn trotz Vorlage im selben Zug schon ein Tokenplan, eine
Farbpalette oder ein Sektionsentwurf geliefert wird.
