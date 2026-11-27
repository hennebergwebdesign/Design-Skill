---
id: manifest-buehne-ein-satz-pro-bildschirm
name: Pinnende Bühne, ein Satz oder eine Aussage pro Bildschirm
kategorie: interactive
sektionstyp: [interactive, about, features]
tags: [pinnen, scrollfortschritt, manifest, ein-satz, bühne]
stil: [expressive, experimentell]
branchenbezug: [app, produkt, marke]
ux_zweck: eine Aussage nach der anderen, gesteuert vom Scrollen, ohne Wischen oder Klicken
conversion_zweck: Haltung und Nutzen werden gelesen statt überflogen, bevor die Handlung kommt
responsiv: unbekannt, Verhalten der Referenzen bei 390 Pixel nur teilweise erfasst
komplexitaet: mittel
barrierefreiheit: Grundzustand ist statisch, alle Aussagen stehen im Fluss. Pinnen nur mit JavaScript und ohne reduzierte Bewegung. Unsichtbare Aussagen sind nicht fokussierbar und nicht vorlesbar versteckt, wenn sie inhaltlich nötig sind
verwandt: []
quelle_url: https://pocketchangethe.world/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Pinnende Bühne, ein Satz pro Bildschirm

## Prinzip

Ein Abschnitt bleibt über mehrere Bildschirmhöhen stehen. Während gescrollt wird, wechselt
die Aussage: jeweils ein Satz erscheint, der vorige geht. Die Zeit gehört dem Besucher, die
Reihenfolge der Seite.

## Warum es wirkt

Ein langer Absatz wird überflogen, ein Satz auf einem leeren Bildschirm wird gelesen. Das
Scrollen ersetzt den Klick und gibt dem Text ein Tempo, das der Besucher selbst bestimmt.
Dasselbe Prinzip trägt auch Funktionslisten, bei denen der Scrollweg einen Eintrag und das
passende Bild wählt.

## Belege

| Aussage | Beleg |
|---|---|
| lange Seite mit gepinnten Ebenen von 900 Pixel Höhe | beobachtet, berechnete Stile, pocketchangethe.world |
| Seitenhöhe 22977 px Desktop, 11274 px mobil | beobachtet, ebenda |
| gepinnter Produktbereich als eigene Bühne | beobachtet, berechnete Stile, farmminerals.com |
| hoher Abschnitt mit Funktionsliste und Gerät (Höhe bis 3281 px bei 900 px Fenster, zwischen zwei Läufen schwankend) | beobachtet, berechnete Stile, area.us |
| Strecke je Aussage und Zeitverlauf | unbekannt, Sektionshöhen schwankten zwischen zwei Läufen |
| Leistung auf schwachen Geräten | unbekannt |

## Umsetzung

- Sichtbarkeit je Aussage aus einer CSS Variable für den Fortschritt (`data-fortschritt` in
  `_basis/bewegung.js`), nur `opacity` und `transform`, siehe `18-motion-handschrift.md`.
- Grundzustand ohne Skript und bei `prefers-reduced-motion`: alle Aussagen untereinander.
- Pinnen nur ab einer Breite, bei der es trägt, mobil gestapelt (`position: sticky` mit
  gestaffeltem `top`).
- Performance Budget: je Bühne eine feste Strecke in `svh`, keine Layout Animation.
- Wenige Bühnen je Seite. Drei bis vier gepinnte Abschnitte reichen für die ganze Seite.

## Was nicht übernommen wird

Aussagen, Zeichen und Bildmotive der Referenzen. Das Muster ist riskant für Leistung und
Bedienung, es braucht den statischen Rückfall.
