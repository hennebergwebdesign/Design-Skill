---
id: merkmalsliste-mit-stehender-tafel
name: Lange Merkmalsliste mit stehender Tafel daneben
kategorie: features
sektionstyp: [features, product]
tags: [sticky, merkmale, aktiver-punkt, zweispaltig]
stil: [refined, material-flat]
branchenbezug: [produkt, fahrzeug, technik]
ux_zweck: sieben Merkmale lesen, ohne das Bild zu wechseln, nur der aktuelle Punkt ist voll sichtbar
conversion_zweck: jedes Merkmal bekommt sein Bild, ohne dass die Liste gekürzt wird
responsiv: unbekannt, die Referenz wurde mobil nur am Seitenanfang erfasst
komplexitaet: mittel
barrierefreiheit: Alle Merkmale sind lesbar, auch inaktive (Kontrast), keine Information steht nur auf der Tafel. Mobil bringt jedes Merkmal sein Bild mit
verwandt: [zeitachse-mit-stehendem-bild]
quelle_url: https://www.rideradian.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Lange Merkmalsliste mit stehender Tafel daneben

## Prinzip

Links stehen die Merkmale untereinander, nur das in Bildschirmmitte ist hervorgehoben. Rechts bleibt eine Tafel stehen und wechselt mit dem aktiven Merkmal.

## Warum es wirkt

Eine lange Liste ist ermüdend, wenn alle gleich laut sind. Die Hervorhebung des aktiven Punktes gibt der Liste einen Fokus, die Tafel liefert den Beweis dazu, und der Leser bleibt in einer Spalte.

## Belege

| Aussage | Beleg |
|---|---|
| zweispaltig 648 und 648 px, Bildspalte 648 mal 765 px, klebt 64 px unter dem Rand | beobachtet, berechnete Stile (laut Erfassung für t124) |
| sieben Überschriften mit 48 px, inaktive mit Alpha 0,2 | beobachtet, ebenda |
| Schalten nach dem Abschnitt in Bildschirmmitte | abgeleitet |
| Kontrast der inaktiven Punkte | unbekannt, Alpha 0,2 ist rechnerisch unter 4,5 zu 1 |

## Umsetzung

- Hervorhebung über `opacity`, Tafelwechsel per IntersectionObserver.
- Inaktive Punkte nie unter lesbarem Kontrast setzen, Alpha nicht unter 0,5 bei Text, der gelesen werden muss.
- Ohne JavaScript, bei reduzierter Bewegung und mobil: je Merkmal eine Tafel im Fluss.
- Symbole der Tafeln einmal definieren (`<use>`).

## Was nicht übernommen wird

Merkmale, Tafeln und Marke der Referenz. Die Alpha 0,2 der Referenz für inaktive Punkte ist ein Kontrastproblem und nicht übernehmbar.
