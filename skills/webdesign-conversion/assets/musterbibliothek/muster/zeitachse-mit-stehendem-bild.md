---
id: zeitachse-mit-stehendem-bild
name: Ablauf als Zeitachse mit stehendem Bild
kategorie: process
sektionstyp: [process]
tags: [zeitachse, sticky-bild, schritte, produktbild]
stil: [refined, clean]
branchenbezug: [produkt, beratung, labor]
ux_zweck: fünf Schritte lang lesen, ohne das Produkt aus dem Blick zu verlieren
conversion_zweck: der Ablauf wirkt kurz, weil jeder Schritt einen Satz hat und das Bild den Ort hält
responsiv: Referenz entfällt die stehende Bühne mobil nicht erfasst, nur Desktop gemessen
komplexitaet: mittel
barrierefreiheit: Die Schrittfolge ist eine nummerierte Liste im Quelltext, das stehende Bild ist Zierde und trägt keine Information, die nur dort steht
verwandt: [merkmalsliste-mit-stehender-tafel]
quelle_url: https://traced.life/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Ablauf als Zeitachse mit stehendem Bild

## Prinzip

Links bleibt ein Bild stehen, rechts läuft eine lange senkrechte Achse mit fünf Schritten, je mit Beschriftung und Satz. Das Bild wechselt mit dem Schritt, der gerade in der Mitte steht.

## Warum es wirkt

Lange Abläufe verlieren den Leser, wenn das Produkt verschwindet. Das stehende Bild ist der feste Punkt, die Achse gibt die Reihenfolge, und ein Satz je Schritt hält jeden Abschnitt kurz.

## Belege

| Aussage | Beleg |
|---|---|
| Bild steht, Achse läuft, fünf Schritte mit Beschriftung links des Texts | beobachtet, Screenshot und Überschriften, traced.life |
| stehendes Bild 688 mal 675 px bei 108 px Abstand oben, Schritte etwa 834 px auseinander | beobachtet, berechnete Stile (laut Erfassung für t120) |
| Wechsel des Bildes je Schritt | abgeleitet |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Schritte als `<ol>`, Bild mit `position: sticky`, Wechsel per IntersectionObserver.
- Ohne JavaScript und bei reduzierter Bewegung steht ein Bild je Schritt im Fluss.
- Mobil entfällt die stehende Bühne, jeder Schritt bringt sein Bild mit.
- Fünf Schritte sind die Obergrenze, mehr gehören in eine Zeitleiste ohne Bild.

## Was nicht übernommen wird

Schritte, Bilder und Beschriftungen der Referenz. Die Referenz verkauft einen Gesundheitstest, das Prinzip trägt auch für Wasser, Boden oder Material, nicht aber deren Aussagen.
