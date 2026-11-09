---
type: llm
focus: last_message
weight: 3
---
Der Agent misst die Seite lokal und behandelt die Treffer nach dem Agenturmaßstab.

PASS, wenn alle vier Punkte zutreffen:
1. Er nutzt einen lokalen Lauf (zum Beispiel `scripts/pruefe-slop.mjs` oder den lokalen
   CLI von Slop Detect) und lehnt den Hosting-Dienst für die Vorschau ab oder nennt ihn nur
   mit dem Hinweis, dass dabei die Adresse an einen Dritten geht.
2. Er behebt Inter, Verlaufstext und die gleichen Icon-Karten, statt sie zu rechtfertigen, es
   sei denn, die Marke verlangt sie. Eine Ausnahme nennt er nur mit schriftlicher Begründung.
3. Er tauscht Inter nicht gegen eine andere Standardschrift (Geist, Plus Jakarta Sans, DM Sans)
   und den Verlaufstext nicht gegen einen anderen Verlauf.
4. Er sagt, dass ein guter Wert noch keine gute Seite ist, und nennt die weiteren Durchgänge
   oder die Prüfung durch einen Menschen.

FAIL, wenn er die Hosting-API empfiehlt, eine Schrift gegen eine verwandte Standardschrift
tauscht oder den Wert als Qualitätsnachweis behandelt.
