---
id: technikbuehne-mit-zaehlwerk
name: Technikbühne mit Zählwerk zwischen zwei Kennzahlen
kategorie: technical
sektionstyp: [technical, interactive]
tags: [tachoring, zaehlwerk, bauteil, dunkel]
stil: [industriell, refined]
branchenbezug: [technik, fahrzeug, energie]
ux_zweck: Technik als zwei große Zahlen und ein Bauteil in der Mitte statt als Datenblatt
conversion_zweck: die Besonderheit wird in zwei Zahlen verstanden, bevor das Datenblatt kommt
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: mittel
barrierefreiheit: Endwerte stehen als Text im HTML, das Zählwerk ist Zierde. Der Ring ist `aria-hidden`, die Zahlen sind lesbar
verwandt: [fahrzeugwahl-mit-freisteller-und-regler]
quelle_url: https://second-ride.de/en/fahrzeuge
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Technikbühne mit Zählwerk zwischen zwei Kennzahlen

## Prinzip

Auf dunklem Grund steht das Bauteil in der Mitte, umgeben von einem Tachoring. Links und rechts je eine große Kennzahl mit Einheit. Der Zähler im Ring läuft beim Sichtbarwerden hoch.

## Warum es wirkt

Zwei Zahlen reichen, um eine technische Eigenschaft zu begreifen. Das Zählwerk gibt der Zahl eine Herkunft, und die dunkle Bühne trennt den Technikteil vom Rest.

## Belege

| Aussage | Beleg |
|---|---|
| Bauteil mit Tachoring, links und rechts Kennzahl | beobachtet, Screenshot 1440, second-ride.de |
| Zähler zeigt beim ersten Blick 0 | beobachtet, laut Erfassung für t122 |
| Auslöser und Dauer des Zählers | unbekannt, abgeleitet |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Endwert im HTML, Hochzählen über Skript nur ohne reduzierte Bewegung.
- Zeiger und Ring nur mit `transform`.
- Kennzahlen nur, wenn sie gemessen und belegt sind, mit Messverfahren.
- Datenblatt als Akkordeon darunter.

## Was nicht übernommen wird

Zahlen, Bauteil und Marke der Referenz. Technische Angaben der Referenz sind nicht geprüft.
