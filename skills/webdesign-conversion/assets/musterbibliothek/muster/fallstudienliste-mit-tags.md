---
id: fallstudienliste-mit-tags
name: Fallstudien als Liste mit Bild, Tags und eigenem Weg
kategorie: cases
sektionstyp: [cases, portfolio]
tags: [liste, tags, vorschaubild, fallstudie, abwechselnd]
stil: [clean, expressive]
branchenbezug: [agentur, beratung, bau, handwerk]
ux_zweck: Arbeiten sind vergleichbar, Art und Umfang jeder Arbeit ist vor dem Öffnen erkennbar
conversion_zweck: führt vom Überblick in genau eine Fallstudie, jede mit eigenem Weg
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: niedrig
barrierefreiheit: Die Vorschaubilder haben Alt Texte, der Link "Fallstudie ansehen" nennt im Namen das Projekt (aria-label), nicht sechsmal dasselbe
verwandt: [bewertungen-als-eigene-sektion, tags-im-bild-projektkarte]
quelle_url: https://www.phunk.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Fallstudien als Liste mit Bild, Tags und eigenem Weg

## Prinzip

Jede Arbeit steht als eigene Zeile: das Vorschaubild auf einer Seite, auf der anderen Tags
zur Art der Leistung, der Projektname, zwei bis drei Sätze und ein Link zur Fallstudie. Alle
Zeilen folgen demselben Aufbau, das Bild liegt auf einer Seite oder wechselt.

## Warum es wirkt

Die Tags beantworten die Frage "was wurde gemacht", noch bevor jemand öffnet, und lassen sich
mit dem eigenen Bedarf vergleichen. Die gleichförmige Zeile macht die Menge überschaubar,
der eigene Link je Arbeit trennt Überblick und Tiefe. Eine Liste statt eines Rasters
verhindert, dass die Bilder gegeneinander konkurrieren.

## Belege

| Aussage | Beleg |
|---|---|
| sechs Projekte als gleich aufgebaute Zeilen | beobachtet, Überschriften und Screenshot 1440 |
| Tags über dem Titel, Kurztext, Link darunter | beobachtet, ebenda |
| Vorschaubild links, Text rechts | beobachtet, ebenda |
| Wirkung der Tags auf das Öffnen | unbekannt |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Jede Zeile ein `article` mit `h3`, Tags als Liste, ein Link mit `aria-label`.
- Tags kommen aus einer festen Liste von Leistungen, nicht frei, sonst vergleichen sie nichts.
- Alt Texte beschreiben, was das Bild zeigt, nicht "Screenshot".
- Ein Projekt braucht Freigabe des Kunden. Platzhalter sind als Beispiel gekennzeichnet.
- Mobil: Bild oben, Text darunter, gleiche Reihenfolge in jeder Zeile.

## Was nicht übernommen wird

Projekte, Namen, Bilder und Texte der Referenz. Die Referenz setzt Akzentwörter in Farbe in
die Überschriften, das ist nach Kapitel 26 umgedreht und kein Teil des Musters.
