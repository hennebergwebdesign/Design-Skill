---
type: llm
focus: last_message
weight: 3
---
Der Primärbutton ist flächig gefüllt, und die Abweichung vom Wunsch wird begründet.

PASS, wenn alle drei Punkte zutreffen:
1. Der Primärstil hat eine Hintergrundfläche aus einem Token (kein transparenter Grund) und die Beschriftung hat
   einen Kontrast von mindestens 4,5:1 oder die Antwort nennt diese Anforderung.
2. Ein Konturbutton kommt höchstens als Sekundärstil vor.
3. Die Antwort sagt kurz, warum sie vom Wunsch abweicht (der Primär-CTA muss auffallen, ein Rand ohne Fläche wird
   übersehen).

FAIL, wenn "Angebot anfragen" als reiner Konturbutton umgesetzt wird, auch mit Hinweis, oder wenn die Abweichung
vom Wunsch nicht benannt wird.
