---
id: hero-wortmarke-angeschnitten
name: Wortmarke als Bildelement, am Rand angeschnitten
kategorie: hero
sektionstyp: [hero, footer]
tags: [wortmarke, anschnitt, grossschrift, bewegtbild, fuss]
stil: [expressive, luxus]
branchenbezug: [bau, immobilien, tourismus, gastronomie]
ux_zweck: die Marke prägt sich ein, bevor ein Satz gelesen wird
conversion_zweck: Wiedererkennung und Haltung im ersten Bildschirm, ohne den Platz der Aussage zu verbrauchen
responsiv: unbekannt, nur das Umbrechen der Aussage ist bei 390 Pixel gesehen, die Wortmarke selbst nicht eigens geprüft
komplexitaet: niedrig
barrierefreiheit: Die Wortmarke bleibt echter Text oder ein SVG mit Titel, nie ein Bild ohne Alternative. Angeschnittene Schrift braucht Kontrast an der sichtbaren Kante, nicht am ganzen Wort
verwandt: [hero-vollbild-pillennavigation]
quelle_url: https://conwest.com/
quelle_erfasst: 2026-11-27
konfidenz: hoch
freigabe: global
aufgenommen: 2026-11-27
---

# Wortmarke als Bildelement, am Rand angeschnitten

## Prinzip

Der Markenname steht in sehr großer Schrift über die volle Breite und wird vom Bildrand
beschnitten, oben im Held oder unten im Fuß. Die eigentliche Aussage ist klein daneben oder
darunter gesetzt, die Handlung liegt als Knopf in der Ecke.

## Warum es wirkt

Ein angeschnittenes Wort liest das Auge trotzdem vollständig, die Ergänzung ist eine kleine
Handlung, die das Wort einprägt. Zugleich wird die Marke zur Grafik und braucht kein Logo
im Bild. Der Fuß mit dem Namen über die ganze Breite schließt die Seite so, wie der Held
sie eröffnet, und gibt der Marke einen Anfang und ein Ende.

## Belege

| Aussage | Beleg |
|---|---|
| Wortmarke oben im Held beschnitten, Aussage dreizeilig unten links | beobachtet, conwest.com, Screenshot 1440 |
| Wortmarke über die ganze Breite im Fuß, Navigation darüber | beobachtet, peligoni.com, Screenshot 1440 |
| Wortmarke am unteren Heldrand angeschnitten | beobachtet, peligoni.com, Screenshot 1440 |
| Aussage 93 px bei 1440, 51 px bei 390 | beobachtet, berechnete Schriftgröße, conwest.com |
| Wortmarke bei 390 Pixel | unbekannt |

## Umsetzung

- Die Wortmarke als SVG mit `<title>` oder als Text mit Größe in `vw`, über `overflow: hidden`
  am Abschnitt anschneiden, nicht über negative Ränder am Body.
- Eine Zeile `h1` mit der Aussage bleibt im Dokument, die Wortmarke ist `aria-hidden`, wenn
  der Name schon im Kopf steht.
- Höhe über `100svh`, siehe `16-responsive-container.md`.
- Kontrast an der Kante: eine Abdunklungsschicht unter der Schrift, nicht am ganzen Bild.
- Mobil: die Wortmarke bricht nicht um, sie skaliert mit `vw`, die Aussage bleibt lesbar.

## Was nicht übernommen wird

Die Wortmarken der Referenzen und ihre Schrift. Das Prinzip gilt nur für kurze Namen,
bei langen Firmennamen ist der Anschnitt unlesbar und das Muster passt nicht.
