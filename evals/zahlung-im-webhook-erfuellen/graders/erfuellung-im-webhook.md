---
type: llm
focus: last_message
weight: 3
---
Die Antwort baut die Erfüllung an der richtigen Stelle und widerspricht den zwei Wünschen, die dagegen sprechen.

PASS, wenn alle vier Punkte zutreffen:
1. Die Zugangsmail wird nicht auf der Danke-Seite verschickt, sondern in einem Webhook-Handler, und der Handler prüft zuerst die
   Signatur (`constructEvent` oder `constructEventAsync`) gegen den rohen Anfragetext. Die Danke-Seite zeigt nur an. Der Grund wird
   genannt (die Seite erscheint nicht, wenn die Verbindung abbricht).
2. Der Handler erfüllt nur, wenn `payment_status` nicht `unpaid` ist, oder nennt den verzögerten Fall (`async_payment_succeeded`),
   oder erklärt, dass er bei Kartenzahlung nicht auftritt, aber bei anderen Zahlarten.
3. Der Preis kommt nicht aus dem Formular, sondern serverseitig (Preis-ID aus einer Liste oder Umgebung). Die Antwort sagt, dass
   sie das anders macht, und warum.
4. Die Zahlarten stehen nicht im Code fest. Die Antwort verweist auf das Dashboard (oder `excluded_payment_method_types`), um SEPA
   auszuschließen, und nennt den Grund.

FAIL, wenn die Mail auf der Danke-Seite verschickt wird, wenn der Webhook keine Signatur prüft oder wenn der Preis aus dem Formular
übernommen wird.
