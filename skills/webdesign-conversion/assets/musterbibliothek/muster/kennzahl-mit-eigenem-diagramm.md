---
id: kennzahl-mit-eigenem-diagramm
name: Jede Kennzahl mit ihrem eigenen kleinen Diagramm
kategorie: cases
sektionstyp: [cases, trust]
tags: [kennzahl, diagramm, beleg-je-aussage, fallstudie]
stil: [editorial, clean]
branchenbezug: [agentur, beratung, software]
ux_zweck: eine Zahl wird nie allein behauptet, das Diagramm daneben zeigt ihren Verlauf
conversion_zweck: die Fallstudie überzeugt über Belege je Aussage statt über eine Wand aus Prozentwerten
responsiv: unbekannt, nur Desktop erfasst (Seitenhöhe mobil gemessen, Verhalten der Diagramme nicht)
komplexitaet: mittel
barrierefreiheit: Diagramm hat eine Textalternative mit den Werten (Tabelle oder Beschreibung), die Zahl steht als Text, nicht nur im SVG
verwandt: [nummerierter-kapitelkopf]
quelle_url: https://doemedia.com/cymbiotika/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Jede Kennzahl mit ihrem eigenen kleinen Diagramm

## Prinzip

Auf einer Fallstudienseite steht neben jeder Kernaussage eine große Kennzahl und ein kleines Liniendiagramm mit Vorher und Nachher, dazu ein bis drei Belegzahlen. Eine Aussage ist damit genau eine Zahl plus ein Verlauf.

## Warum es wirkt

Eine Zahl ohne Verlauf ist eine Behauptung, ein Verlauf ohne Zahl ist Dekoration. Zusammen lässt sich beides prüfen, und die Seite erzählt Ursache und Wirkung in kleinen Einheiten statt in einem Ergebnisabsatz.

## Belege

| Aussage | Beleg |
|---|---|
| große Kennzahl, Kurztext und Liniendiagramm je Abschnitt (sechs Abschnitte) | beobachtet, Screenshots und Überschriften, doemedia.com |
| neun Kennzahlen zusätzlich als Raster mit einer hervorgehobenen Zelle | beobachtet, Screenshot 1440 |
| Diagramme sind eigene Grafiken mit Achsenbeschriftung | abgeleitet, aus dem Screenshot |
| Richtigkeit der Zahlen der Referenz | unbekannt, nicht geprüft |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Jede Zahl braucht im Projekt eine Quelle (Auswertung, Zeitraum, Messmethode). Erfundene Erfolgszahlen sind ein Verstoß gegen § 5 UWG.
- Diagramme als SVG mit `role="img"` und Beschreibung, die Werte zusätzlich als Text.
- Eine Aussage, eine Zahl, ein Diagramm. Mehr in einer Einheit macht sie unlesbar.
- Zeitraum und Vergleichsbasis stehen sichtbar an der Zahl.

## Was nicht übernommen wird

Zahlen, Kunden, Diagramme und Texte der Referenz. Die Zahlen der Referenz sind nicht geprüft und gehören nicht in eine andere Seite.
