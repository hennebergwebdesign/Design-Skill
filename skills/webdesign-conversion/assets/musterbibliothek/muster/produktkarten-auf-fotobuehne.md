---
id: produktkarten-auf-fotobuehne
name: Produktkarten über einer großen Fotobühne
kategorie: product
sektionstyp: [product, services]
tags: [fotobuehne, karussell, karten-ueber-bild, kategorie]
stil: [clean, refined]
branchenbezug: [onlinehandel, gesundheit, beratung, abo]
ux_zweck: die Kategorie wird als Stimmung gezeigt, die Auswahl als konkrete Karten, beides in einem Bildschirm
conversion_zweck: vom Gefühl zur Produktkarte ohne Seitenwechsel, jede Karte mit zwei Wegen, Kauf und Information
responsiv: unbekannt, nur Desktop erfasst, Karussell bei 390 Pixel nicht geprüft
komplexitaet: mittel
barrierefreiheit: Karussell braucht Pfeile als Buttons mit Namen, Wischen allein reicht nicht, und ein Pausenmittel, wenn es sich bewegt. Text auf dem Foto liegt nicht direkt auf dem Bild, sondern auf einer Fläche oder Abdunklung
verwandt: [schritte-auf-bildgrund]
quelle_url: https://www.goodlifemeds.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Produktkarten über einer großen Fotobühne

## Prinzip

Jede Kategorie bekommt eine abgerundete Fotobühne in voller Breite mit großer Überschrift.
Über die untere Bildhälfte liegen Produktkarten in einer Reihe, je mit Bild, Namen und zwei
Wegen. Unter der Bühne steht eine kurze Erklärung mit einem Sekundärweg zur Kategorie.

## Warum es wirkt

Das Foto liefert die Zielgruppe und den Anlass, die Karten die Entscheidung. Weil beides in
einer Fläche liegt, bleibt der Besucher im Gedanken der Kategorie, statt zwischen
Stimmungsbild und Katalog zu wechseln. Zwei Wege je Karte trennen den schnellen Kauf von der
Information und halten beide offen.

## Belege

| Aussage | Beleg |
|---|---|
| Fotobühne mit abgerundeten Ecken, Karten im unteren Teil | beobachtet, Screenshot 1440, zwei Kategorien |
| je Karte Bild, Name, zwei Knöpfe | beobachtet, ebenda |
| Pfeile am Kartenband | beobachtet, ebenda |
| kurze Erklärung mit Sekundärweg unter der Bühne | beobachtet, ebenda |
| Verhalten der Karten bei 390 Pixel | unbekannt |
| Bewegung des Karussells | unbekannt |

## Umsetzung

- Bühne als Bild mit `object-fit: cover` und fester Höhe in `svh`, Karten als Raster oder
  `scroll-snap` Spur, nicht als Skript Karussell, wenn es ohne geht.
- Pfeile als `button` mit `aria-label`, die Spur bleibt mit der Tastatur scrollbar.
- Die Karte trägt nur Name, Nutzen in einer Zeile und zwei Wege. Preise nur, wenn sie
  rechtlich vollständig angegeben werden können.
- Abdunklung am unteren Bildrand mit Tokenwert, damit Überschrift und Kartenrand lesbar sind.
- Ein Muster für Kategorien mit zwei bis vier Karten, bei mehr wird es ein Katalog.

## Was nicht übernommen wird

Produkte, Bildmotive und Texte der Referenz. Die Branche der Referenz unterliegt strengen
Werberegeln, das Muster wird nur in Bereichen ohne Heilversprechen übernommen.
