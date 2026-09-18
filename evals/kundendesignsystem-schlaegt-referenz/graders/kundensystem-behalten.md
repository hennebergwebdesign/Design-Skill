---
type: llm
focus: last_message
weight: 3
---
Der gelieferte Code hält sich an das Designsystem des Kunden und nicht an die Werte der
Referenz.

PASS, wenn alle vier Punkte zutreffen:
1. Als Schrift wird Inter verwendet, für Fließtext und für die Überschrift.
2. Die Flächenfarbe ist Weiß und nicht das Creme der Referenz.
3. Der Button nutzt den Akzent des Kunden und nicht Terrakotta.
4. Der Radius folgt dem Token des Kunden, also 4 px, nicht 24 px.

FAIL, sobald einer dieser vier Werte aus der Referenz übernommen wird, auch wenn er nur als
Alternative, als Kommentar oder als zweite Variante angeboten wird.
