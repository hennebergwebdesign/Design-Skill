---
type: llm
focus: last_message
weight: 3
---
Der gelieferte Hero-Code folgt den Bedingungen für ein Scrollvideo aus dem Regelwerk.

PASS, wenn der Code alle vier Punkte erfüllt:
1. Es gibt ein Posterbild (echtes img mit width und height) und einen Text als HTML, der ohne Video dieselbe
   Aussage trägt.
2. prefers-reduced-motion wird behandelt: bei reduzierter Bewegung kein Scrubbing, das Poster bleibt stehen.
3. Das Video oder die Bibliothek wird erst bei Sichtbarkeit oder nach dem load-Ereignis geladen, nicht im head
   und nicht als src im Markup.
4. Die Antwort nennt Datenmenge oder Ladezeit als Kosten und verlangt eine Messung vor der Freigabe.

FAIL, wenn einer der vier Punkte fehlt, oder wenn gar kein Code geliefert und stattdessen nur abgelehnt wird.
