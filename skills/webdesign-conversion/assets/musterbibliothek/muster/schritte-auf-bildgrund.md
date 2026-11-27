---
id: schritte-auf-bildgrund
name: Drei Schritte auf ruhigem Bildgrund mit großer Überschrift
kategorie: process
sektionstyp: [process]
tags: [drei-schritte, bildgrund, abdunklung, versetzte-anordnung]
stil: [refined, luxus]
branchenbezug: [dienstleistung, beratung, abo, onlinehandel]
ux_zweck: der Ablauf ist in drei Schritten überschaubar, der Bildgrund gibt Ruhe statt Diagramm
conversion_zweck: nimmt die Angst vor dem Aufwand, bevor die Handlung verlangt wird
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: niedrig
barrierefreiheit: Text auf Bild nur über Abdunklung mit Tokenwert, die Reihenfolge der Schritte steht im Quelltext als nummerierte Liste, nicht nur in der Anordnung
verwandt: [produktkarten-auf-fotobuehne]
quelle_url: https://www.goodlifemeds.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Drei Schritte auf ruhigem Bildgrund

## Prinzip

Über einem abgedunkelten Foto steht links die große Überschrift, rechts ziehen sich drei
Schritte in versetzter Anordnung durch die Fläche, jeder mit Titel und einem Satz. Das Bild
zeigt das Ergebnis, nicht den Vorgang.

## Warum es wirkt

Drei Schritte sind die Obergrenze dessen, was als Weg verstanden wird, bevor er als Aufwand
zählt. Die versetzte Anordnung zeigt Fortschritt ohne Pfeile und Zahlen. Das ruhige Bild
nimmt der Strecke den Verwaltungscharakter und kündigt die Belohnung an.

## Belege

| Aussage | Beleg |
|---|---|
| genau drei Schritte, je mit Titel und Satz | beobachtet, Überschriftenstruktur und Screenshot |
| abgedunkeltes Foto als Grund, Überschrift links groß | beobachtet, Screenshot 1440 |
| versetzte Anordnung der drei Schritte | beobachtet, ebenda |
| Verhalten bei 390 Pixel | unbekannt |
| ob sich die Schritte beim Scrollen verändern | unbekannt |

## Umsetzung

- Schritte als `<ol>`, die Versetzung über Grid Bereiche, nicht über absolute Positionen.
- Abdunklungsschicht mit Token, Kontrast des Schritttextes mindestens 4,5 zu 1 gegen den
  hellsten Bildbereich dahinter.
- Mobil untereinander in Leserichtung, das Bild bleibt Hintergrund mit fester Höhe.
- Jeder Schritt nennt, was der Kunde tut, nicht was die Firma tut.
- Direkt darunter gehört die Handlung, siehe `06-conversion-architektur.md`.

## Was nicht übernommen wird

Bild, Schrittinhalte und Überschrift der Referenz. Mehr als drei Schritte tragen das Muster
nicht, dann ist eine Zeitleiste das richtige Muster.
