---
id: schrumpfender-held
name: Held, der beim Scrollen von Vollbild zur Karte schrumpft
kategorie: hero
sektionstyp: [hero]
tags: [pinnen, skalierung, vollbild, bewegtbild, uebergang]
stil: [luxus, expressive]
branchenbezug: [bau, immobilien, industrie, tourismus]
ux_zweck: ein weicher Übergang vom Bild in den Inhalt, ohne harte Kante
conversion_zweck: das Bild prägt den ersten Eindruck, der Text und die Knöpfe bleiben dabei stehen
responsiv: unbekannt, die Referenz wurde mobil nur am Seitenanfang erfasst, dort Vollbild
komplexitaet: mittel
barrierefreiheit: Ohne Skript und bei reduzierter Bewegung steht die Karte fertig, nichts pinnt. Text und Knöpfe bleiben im Fluss und fokussierbar. Ein Video braucht Poster und Pause
verwandt: [hero-wortmarke-angeschnitten]
quelle_url: https://conwest.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Held, der beim Scrollen von Vollbild zur Karte schrumpft

## Prinzip

Der Held beginnt als Vollbild und bleibt beim Scrollen stehen, während der Bildrahmen zu einer
abgerundeten Karte mit Rand schrumpft. Aussage und Knöpfe bleiben stehen, dann gibt die
Bühne den Weg frei.

## Warum es wirkt

Der Übergang vom Vollbild zur Karte zeigt, dass das Bild nicht der Inhalt ist, sondern
dessen Auftakt. Er ersetzt eine harte Kante zwischen Held und erstem Abschnitt und lässt
das Bild nachwirken, ohne dass es Platz kostet.

## Belege

| Aussage | Beleg |
|---|---|
| gepinnte Bühne, Abschnitt 1638 px bei 900 px Fensterhöhe | beobachtet, berechnete Stile, conwest.com |
| Rahmen schrumpft auf 1401 mal 764 px mit 20 px Rand und 12 px Radius | beobachtet, ebenda |
| Bewegtbild läuft stumm, in Schleife, 30 Sekunden | beobachtet, ebenda |
| Verhalten mobil beim Scrollen | unbekannt |
| Zeitverlauf und Easing | unbekannt |

## Umsetzung

- Schrumpfen über `transform: scale()` aus dem Scrollfortschritt, nicht über Rand und Radius,
  nur `transform` und `opacity` werden animiert.
- Ohne Skript und bei `prefers-reduced-motion`: die Karte steht im Endzustand.
- Video nur mit Poster und Budget, im Zweifel Standbild. Ein Video braucht ein Pausenmittel.
- Höhe über `100svh`, siehe `16-responsive-container.md`.
- Der Inhalt, auch die Aussage, steht im statischen HTML und nicht erst nach JavaScript.

## Was nicht übernommen wird

Bild, Aussage und Marke der Referenz. Deren statisches HTML enthält fast keinen Text, das ist
ein SEO und GEO Befund und kein Muster.
