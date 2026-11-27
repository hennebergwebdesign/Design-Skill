---
id: tags-im-bild-projektkarte
name: Projektkarte mit Tags im Bild und Name auf dem Verlauf
kategorie: portfolio
sektionstyp: [portfolio, cases]
tags: [bildkarte, tags, verlauf, gestreckter-link, sparte]
stil: [refined, corporate]
branchenbezug: [bau, immobilien, architektur, handwerk]
ux_zweck: Sparte und Status werden vor dem Öffnen erkannt, ohne Text neben dem Bild
conversion_zweck: das Projekt wird über Bild und Einordnung angeklickt, die ganze Karte ist die Handlung
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: niedrig
barrierefreiheit: Gestreckter Link über die ganze Karte mit Namen im Linktext, Tags als Liste im Text und nicht nur im Bild. Text auf dem Foto liegt auf einem Verlauf mit gerechnetem Kontrast
verwandt: [fallstudienliste-mit-tags]
quelle_url: https://conwest.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Projektkarte mit Tags im Bild und Name auf dem Verlauf

## Prinzip

Jede Karte ist ein großes Bild. Oben im Bild sitzen kleine Tags für Sparte und Status, unten
auf einem Verlauf Ort, Beschreibung und Name, in der Ecke ein Pfeil. Die ganze Karte ist ein
einziger Link.

## Warum es wirkt

Wo die Bilder die Projekte sind, braucht es keinen Text daneben. Die Tags beantworten die
Frage "was für ein Projekt", bevor jemand öffnet, und der Verlauf hält den Namen lesbar,
egal wie das Foto aussieht. Die Karte als eine Fläche macht das Zielen leicht.

## Belege

| Aussage | Beleg |
|---|---|
| Projektraster in drei Spalten, Karten 449 mal 384 px, Radius 8 px | beobachtet, berechnete Stile, conwest.com |
| Tags oben im Bild, Name unten, Pfeil in der Ecke | beobachtet, Screenshot 1440 |
| Tagshöhe 24 px mit 11,2 px Schrift | beobachtet, berechnete Stile |
| Verhalten bei Auswahl und Hover | unbekannt |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Ein `article` je Karte, `h3` mit dem Namen, ein Link, der per `::after` die Karte füllt.
- Tags als Liste, Schrift mindestens 12 Pixel, Kontrast auf der Fläche gerechnet.
- Verlauf als Token, Kontrast des Namens am hellsten Bildbereich mindestens 4,5 zu 1.
- Sparten Filter nur, wenn es mehr als sechs Projekte gibt, sonst entfällt er.
- Projekte brauchen Freigabe des Kunden, Platzhalter sind als Beispiel gekennzeichnet.

## Was nicht übernommen wird

Projekte, Bilder, Namen und Texte der Referenz. Die Tags sind eigene Kategorien des Kunden.
