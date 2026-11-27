---
id: fahrzeugwahl-mit-freisteller-und-regler
name: Produktwahl mit Freisteller, Umschalter und Regler
kategorie: product
sektionstyp: [product, interactive]
tags: [freisteller, umschalter, regler, kennzahl-live]
stil: [clean, material-flat]
branchenbezug: [fahrzeug, technik, handel]
ux_zweck: Variante, Paket und Farbe selbst einstellen und die Kennzahl sofort sehen
conversion_zweck: der Besucher entscheidet sich für ein konkretes Produkt statt für eine Liste
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: mittel
barrierefreiheit: Umschalter und Regler sind echte Bedienelemente mit Namen und Zustand, ohne JavaScript stehen alle Varianten untereinander mit Werten als Text
verwandt: [technikbuehne-mit-zaehlwerk, finder-statt-katalog]
quelle_url: https://second-ride.de/en/fahrzeuge
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Produktwahl mit Freisteller, Umschalter und Regler

## Prinzip

Ein freigestelltes Produkt steht groß in der Mitte, darüber ein Umschalter für Varianten, daneben ein Regler, der eine Kennzahl live verändert. Ein Knopf führt in die Konfiguration.

## Warum es wirkt

Wer mit dem Produkt spielt, hat es schon halb gewählt. Der Regler macht die Kennzahl begreifbar (Reichweite statt Zahl), und die Konfiguration beginnt auf der Seite, nicht erst im Shop.

## Belege

| Aussage | Beleg |
|---|---|
| Freisteller, Umschalter und Regler mit Balkenanzeige im ersten Abschnitt | beobachtet, Screenshot 1440, second-ride.de |
| Knopf zur Konfiguration darunter | beobachtet, ebenda |
| Hotspots und Verhalten des Reglers | unbekannt, nicht geprüft |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Varianten als Radiogruppe, Regler als `input type="range"` mit Beschriftung und Ausgabe.
- Werte der Kennzahl im HTML hinterlegt, nicht berechnet erfunden. Reichweiten sind Angaben nach Prüfverfahren, nicht Versprechen.
- Produkte als SVG oder Fotos je Variante, Farben über Tokens.
- Ohne JavaScript alle Varianten untereinander mit ihren Werten.

## Was nicht übernommen wird

Fahrzeuge, Reichweiten, Texte und Gestaltung der Referenz. Fahrzeugdaten brauchen Zulassung und Messverfahren im Projekt.
