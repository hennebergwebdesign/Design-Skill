---
id: route-als-scroll-ziel
name: Eine Route verbindet verstreute Bilder und gibt dem Scrollen ein Ziel
kategorie: interactive
sektionstyp: [interactive, portfolio]
tags: [route, svg-pfad, verstreute-bilder, scroll-ziel]
stil: [experimentell, expressive]
branchenbezug: [tourismus, fahrzeug, outdoor]
ux_zweck: Weite statt Raster, das Scrollen folgt einem Weg
conversion_zweck: die Aufnahmen werden als Strecke erlebt, nicht als Galerie
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: hoch
barrierefreiheit: Die Bilder haben Alt Texte, die Route ist `aria-hidden`, der Weg ist keine Information, die nur dort steht. Bei reduzierter Bewegung steht der Punkt am Ziel
verwandt: []
quelle_url: https://www.rideradian.com/
quelle_erfasst: 2026-11-27
konfidenz: niedrig
freigabe: global
aufgenommen: 2026-11-27
---

# Eine Route verbindet verstreute Bilder und gibt dem Scrollen ein Ziel

## Prinzip

Ein langer SVG Pfad schlängelt sich durch den Abschnitt, Bilder in verschiedenen Größen liegen verstreut daneben. Ein Punkt läuft beim Scrollen am Pfad entlang.

## Warum es wirkt

Ein Raster sagt: hier sind sechs Bilder. Ein Weg sagt: hier ist eine Strecke. Der Besucher hat ein Ziel, das Scrollen bekommt Richtung, und die Bilder wirken verteilt statt sortiert.

## Belege

| Aussage | Beleg |
|---|---|
| Routen SVG von 1344 mal 2161 px, Abschnitt 3089 px hoch | beobachtet, berechnete Stile (laut Erfassung für t124) |
| Bildgrößen 240 mal 320, 360 mal 240 und 560 mal 373 px verstreut | beobachtet, ebenda |
| Punkt läuft am Pfad | abgeleitet, nicht als Bewegung beobachtet |
| Leistung | unbekannt |

## Umsetzung

- Punkt per `getPointAtLength`, nur `transform`, Pfad statisch.
- Bilder mit Alt Text und Maßen, `loading="lazy"`.
- Ohne JavaScript und bei reduzierter Bewegung steht der Punkt am Ende.
- Mobil als gerade Spalte mit versetzten Bildern.

## Was nicht übernommen wird

Route, Bilder und Texte der Referenz. Der Pfad ist eigene Form.
