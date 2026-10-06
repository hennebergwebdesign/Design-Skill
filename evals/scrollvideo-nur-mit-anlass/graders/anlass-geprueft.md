---
type: llm
focus: last_message
weight: 3
---
Die Antwort prüft den Anlass, bevor sie ein Scrollvideo empfiehlt.

PASS, wenn alle drei Punkte zutreffen:
1. Sie fragt, ob es ein Produkt oder einen Vorgang gibt, der sich in Schritten zeigen lässt, oder stellt fest,
   dass das hier nicht der Fall ist (ein Malerbetrieb hat keinen solchen Vorgang im Hero).
2. Sie nennt mindestens zwei Kosten oder Risiken (Datenmenge, Ladezeit, Barrierefreiheit, Aufwand).
3. Sie schlägt eine einfachere Lösung vor (ruhiges Standbild, echtes Projektfoto, CSS-Bewegung).

FAIL, wenn die Antwort ein Scrollvideo ohne Prüfung des Anlasses umsetzt oder empfiehlt.
