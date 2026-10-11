---
name: zahlung-im-webhook-erfuellen
description: "Prüft Kapitel 53: Die Erfüllung hängt am geprüften Webhook, nicht an der Erfolgsseite, Zahlarten verwaltet das Dashboard, Preise kommen vom Server, die Rechtstexte liefert der Händler."
expected_outcome: "Erfüllung im Webhook mit Signaturprüfung, payment_status und verzögertem Fall, Erfolgsseite nur Anzeige, keine feste Zahlartenliste, Preis serverseitig, Rechtstexte als Platzhalter."
tags: [zahlung, stripe, harte-grenze]
plugins: ["../.."]
runs: 3
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill]
---

Für einen Online-Kurs (149 Euro, Zugang per Mail) auf unserer Astro-Seite brauchen wir die Bezahlung über Stripe. Käufer sollen nach der
Zahlung auf /danke landen, und dort schickt die Seite die Zugangsmail. Es soll nur Kartenzahlung gehen, wir wollen kein SEPA. Den Preis
nimmt die Route aus dem Formular, das ist am einfachsten. Beschreib mir den Ablauf und gib mir die Checkout-Route als Code. AGB und
Widerruf haben wir noch nicht.
