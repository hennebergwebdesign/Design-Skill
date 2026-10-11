# Rechtsbausteine für Seiten mit Zahlung

Entwürfe mit Lücken, **keine Rechtsberatung**. AGB, Widerrufsbelehrung und Datenschutzerklärung des Händlers liefert der Kunde oder
seine Anwältin. Nichts davon wird ausgedacht: Jede Lücke bleibt `[[FEHLT: …]]`, bis der Kunde antwortet. Hintergrund:
`53-zahlungen-mit-stripe.md`, Abschnitt 4.

## Baustein für die Datenschutzerklärung: Zahlungsabwicklung mit Stripe

> **Zahlungsabwicklung über Stripe.** Für die Zahlung leiten wir Sie zu Stripe weiter. Anbieter für Kunden im Europäischen Wirtschaftsraum ist
> Stripe Payments Europe, Ltd., [[FEHLT: Anschrift laut Stripe-Vertrag des Händlers]]. Dabei werden Ihre Zahlungsdaten (zum Beispiel Name, E-Mail-Adresse,
> Rechnungsadresse, Zahlungsmittel, Betrag) verarbeitet. Zweck ist die Abwicklung Ihrer Bestellung und die Betrugsprävention. Rechtsgrundlage ist die
> Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und unser berechtigtes Interesse an der Vermeidung von Zahlungsausfällen und Betrug (Art. 6 Abs. 1 lit. f DSGVO).
> Eine Übermittlung in Drittländer, insbesondere in die USA, kann stattfinden; [[FEHLT: Grundlage der Übermittlung laut Vertrag des Händlers mit Stripe]].
> Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe: [[FEHLT: aktuelle Adresse]].
>
> **Rolle und Vertrag:** [[FEHLT: Einordnung von Stripe als Verantwortlicher oder Auftragsverarbeiter je Zweck, laut Vertrag und Rat der Anwältin]].

Hinweis zum Skript: Wird Stripe.js auf der eigenen Seite geladen (eingebettetes Checkout, Payment Element), steht zusätzlich in der Erklärung, auf welchen Seiten
und wozu (`consent-und-dienste.md`). Bei gehostetem Checkout lädt die eigene Seite kein Stripe-Skript.

## Hinweis neben dem Bestellknopf (Button-Lösung)

Bei eigener Bestellseite trägt der Knopf **„zahlungspflichtig bestellen"** oder eine ebenso eindeutige Formulierung. Bei gehostetem Checkout steht der Knopf auf der
Stripe-Seite; der Hinweis ergänzt sie (`custom_text`):

> Mit Klick auf den Knopf bestellen Sie zahlungspflichtig. Ihr Widerrufsrecht: [[FEHLT: Adresse der Widerrufsseite]]

## Bestellübersicht vor der Zahlung (unmittelbar davor sichtbar)

| Angabe | Inhalt |
|---|---|
| Leistung, wesentliche Merkmale | [[FEHLT]] |
| Gesamtpreis inklusive Umsatzsteuer, mit Versandkosten | [[FEHLT]] |
| Bei Abonnement: Laufzeit, Verlängerung, Kündigung (Kündigungsbutton) | [[FEHLT oder „entfällt"]] |
| Link zu AGB und Widerrufsbelehrung | [[FEHLT: Adressen]] |

## Seiten, die vor dem Livegang existieren

- [ ] `/agb` vom Händler geliefert, vor der Bestellung abrufbar
- [ ] `/widerruf` mit Belehrung und Muster-Widerrufsformular (oder Ausnahme begründet)
- [ ] Funktion zum elektronischen Widerruf geprüft (Richtlinie (EU) 2023/2673, seit 19.06.2026; Stand der Umsetzung klären)
- [ ] Impressum mit Angaben des Händlers
- [ ] Datenschutzerklärung mit dem Baustein oben
- [ ] Versand- und Lieferangaben, Zahlungsarten, Streitbeilegung (falls zutreffend)
- [ ] Bestätigungsmail mit AGB und Widerruf im Anhang oder Text
- [ ] Rechnung: Pflichtangaben und Steuersatz mit dem Steuerberater geklärt (`53-…`, Abschnitt 5)
