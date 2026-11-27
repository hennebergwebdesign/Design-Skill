---
id: kartenband-mit-hervorgehobener-mitte
name: Kartenband mit hervorgehobener Mittelkarte
kategorie: features
sektionstyp: [features, portfolio]
tags: [kartenband, mittelkarte, nachbarkarten, pfeile]
stil: [refined, clean]
branchenbezug: [produkt, tourismus, handel]
ux_zweck: ein Band zeigt viele Karten, eine ist die Aussage
conversion_zweck: lenkt den Blick auf eine Karte, ohne die anderen zu verstecken
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: mittel
barrierefreiheit: Pfeile als Buttons mit Namen, Band per Tastatur und Wischen scrollbar. Unscharfe Nachbarn sind Dekoration und tragen keinen Inhalt, der nur dort steht
verwandt: []
quelle_url: https://traced.life/
quelle_erfasst: 2026-11-27
konfidenz: hoch
freigabe: global
aufgenommen: 2026-11-27
---

# Kartenband mit hervorgehobener Mittelkarte

## Prinzip

Die Karte in der Mitte ist größer, scharf und gerahmt, die Nachbarn sind kleiner, blasser und unscharf. Pfeile und Tastatur schalten weiter, die Mitte wandert mit.

## Warum es wirkt

Ein Band ohne Hierarchie ist eine Liste. Die Mittelkarte macht daraus eine Auswahl: der Blick hat einen Ort, und die Nachbarn zeigen nur, dass mehr da ist. Das Muster trägt, weil es in zwei unabhängigen Referenzen gleich gelöst ist.

## Belege

| Aussage | Beleg |
|---|---|
| Karte 436 px, zwei unscharfe Nachbarn 347 px, Pfeile | beobachtet, berechnete Stile, traced.life (laut Erfassung für t120) |
| größere, gerahmte Mittelkarte im Hochformatband | beobachtet, Screenshot 1440, second-ride.de |
| Verhalten bei Auswahl und Wischen | unbekannt |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- `scroll-snap` Spur mit Zustand `ist-mitte`, Rahmen per `opacity`, nicht per Größenanimation.
- Unschärfe nur statisch und nur ab einer Breite, bei der sie trägt, Leistung beachten.
- Pfeile erscheinen nur mit JavaScript, die Spur bleibt ohne scrollbar.
- Maximal fünf bis sieben Karten.

## Was nicht übernommen wird

Karteninhalte, Bilder und Rahmenfarbe der Referenzen.
