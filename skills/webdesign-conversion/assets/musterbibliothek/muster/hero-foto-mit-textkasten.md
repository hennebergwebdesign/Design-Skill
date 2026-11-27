---
id: hero-foto-mit-textkasten
name: Foto im Held mit der Aussage in einem hellen Textkasten
kategorie: hero
sektionstyp: [hero]
tags: [foto, textkasten, kontrast, label, logoreihe]
stil: [corporate, expressive]
branchenbezug: [bau, industrie, b2b, handwerk]
ux_zweck: die Aussage ist unabhängig vom Bildinhalt lesbar
conversion_zweck: eine Aussage und eine Handlung im ersten Bildschirm, mit Beleg in der Logoreihe darunter
responsiv: Aussage geht von 90 auf 33 Pixel, der Kasten bleibt, Zeilen brechen enger, gemessen bei 390
komplexitaet: niedrig
barrierefreiheit: Der Kasten ist die Kontrastlösung, Schrift schwarz auf hell mit mehr als 4,5 zu 1 unabhängig vom Foto. Der Kasten bricht pro Zeile, Zeilen müssen im Zoom lesbar bleiben
verwandt: [hero-vollbild-pillennavigation, partnerlogos-als-integrationsraster]
quelle_url: https://area.us/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Foto im Held mit der Aussage in einem hellen Textkasten

## Prinzip

Das Foto füllt den ersten Bildschirm. Die Aussage steht in einem hellen Kasten, der jede
Zeile einzeln hinterlegt, mit schwarzer Schrift. Der Primärknopf sitzt darunter im selben
Stil, die Logoreihe am unteren Rand.

## Warum es wirkt

Ein Bild, das sich beim Austausch verändert, kann keinen Kontrast garantieren. Der Kasten
löst das Problem an der Wurzel: die Lesbarkeit hängt nicht am Motiv. Die zeilenweise
Hinterlegung ist zugleich ein Gestaltungsmittel und gibt dem Foto Raum um die Schrift.

## Belege

| Aussage | Beleg |
|---|---|
| Aussage in hellem Kasten, zeilenweise hinterlegt | beobachtet, Screenshot 1440 |
| Aussage 90 px bei 1440, 33 px bei 390 | beobachtet, berechnete Schriftgröße |
| Logoreihe am unteren Heldrand | beobachtet, Screenshot 1440 |
| Handlung als Knopf unter der Aussage | beobachtet, ebenda |
| Einhalten von 4,5 zu 1 | abgeleitet, schwarz auf hellem Grund, nicht gemessen |

## Umsetzung

- Zeilenweise Hinterlegung über `box-decoration-break: clone` am Inline Element, nicht über
  einzelne Spans je Zeile.
- Kastenfarbe und Textfarbe als Tokens, beide mit gerechnetem Kontrast.
- Die Logoreihe nur mit echten Referenzen des Kunden, sonst entfällt sie.
- Höhe über `100svh`, mobil bleibt die Aussage unten im Bild, der Kasten umschließt sie.

## Was nicht übernommen wird

Foto, Aussage, Logos und die konkrete Kastenfarbe. Das Prinzip gilt mit jeder Farbe, die
den Kontrast trägt.
