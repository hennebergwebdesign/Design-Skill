---
id: schraege-laufbaender-anlassliste
name: Schräge Laufbänder als Anlassliste mit Pause
kategorie: features
sektionstyp: [features, editorial]
tags: [laufband, schraeg, anlaesse, pause]
stil: [expressive, retro]
branchenbezug: [lebensmittel, event, handel]
ux_zweck: die Breite des Angebots wird in einem Blick spürbar, ohne eine Liste zu lesen
conversion_zweck: jeder Besucher findet seinen Anlass im Band wieder
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: niedrig
barrierefreiheit: Laufende Bewegung braucht ein Pausenmittel (WCAG 2.2.2), bei reduzierter Bewegung stehen die Bänder still und die Wörter umbrechen lesbar. Der Lauf ist kein Informationsträger
verwandt: [vollfarbflaechen-als-gliederung]
quelle_url: https://ringpopcandy.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Schräge Laufbänder als Anlassliste mit Pause

## Prinzip

Drei farbige Bänder laufen leicht gedreht gegeneinander, jedes mit einer Reihe von Anlässen in Versalien. Sie stehen zwischen Held und Angebot.

## Warum es wirkt

Eine Reihe von Anlässen ist eine Liste, die niemand liest. Als Band wird sie zum Muster: die Menge ist spürbar, einzelne Wörter bleiben hängen. Die Drehung nimmt der Reihe die Strenge.

## Belege

| Aussage | Beleg |
|---|---|
| drei Bänder in verschiedenen Farben, gedreht | beobachtet, Screenshot 1440, ringpopcandy.com |
| Drehung etwa 2,5 Grad, Bewegung per translateX über ein Karussellskript | beobachtet, berechnete Stile (laut Erfassung für t123) |
| Pause im Original | unbekannt |
| Tempo und Richtung | unbekannt |

## Umsetzung

- Lauf nur mit JavaScript und ohne `prefers-reduced-motion`, nur `transform`.
- Pausenknopf und Anhalten bei Hover und Fokus, siehe `18-motion-handschrift.md`.
- Ohne Lauf stehen die Wörter umgebrochen im Fluss.
- Die Wörter stehen auch als Liste im Quelltext, die Wiederholung für den Lauf ist `aria-hidden`.

## Was nicht übernommen wird

Anlässe, Farben und Schrift der Referenz. Ein Band, das nie anhält, ist kein Muster, sondern ein Verstoß.
