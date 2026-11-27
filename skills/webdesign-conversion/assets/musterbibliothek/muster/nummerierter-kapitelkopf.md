---
id: nummerierter-kapitelkopf
name: Nummerierter Kapitelkopf auf einer Rasterlinie
kategorie: editorial
sektionstyp: [editorial, about]
tags: [nummerierung, rasterlinie, kapitel, kopfzeile]
stil: [editorial, technical-mono]
branchenbezug: [agentur, beratung, software]
ux_zweck: ein langer Text bekommt Kapitel, jedes mit Nummer, Thema und Kontext in einer festen Kopfzeile
conversion_zweck: der Besucher weiß in einer langen Seite, wo er ist und was noch kommt
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: niedrig
barrierefreiheit: Die Nummer ist Text und Teil der Überschrift oder deren Beschriftung, nicht nur Dekoration. Kleine Mono Schrift braucht 4,5 zu 1
verwandt: [kennzahl-mit-eigenem-diagramm]
quelle_url: https://doemedia.com/cymbiotika/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Nummerierter Kapitelkopf auf einer Rasterlinie

## Prinzip

Jeder Abschnitt beginnt mit einer dünnen Zeile über einer Rasterlinie: Nummer in eckigen Klammern links, Thema in der Mitte, Kontext rechts. Darunter folgt die Überschrift.

## Warum es wirkt

Die Zeile ist ein Inhaltsverzeichnis, das mitwandert. Sie gibt einer sehr langen Seite die Gliederung eines Dokuments und macht die Erzählung als Folge von Kapiteln lesbar. Die Rasterlinie hält die Seite ruhig.

## Belege

| Aussage | Beleg |
|---|---|
| Kapitelkopf mit Nummer, Thema und Kontext je Abschnitt | beobachtet, Screenshots, doemedia.com |
| Raster mit 12 Spalten, Kapitelkopf in drei Teilen | beobachtet, berechnete Stile (laut Erfassung für t119) |
| Wirkung auf die Orientierung | unbekannt |

## Umsetzung

- Als `<p>` oder `<div>` mit drei Teilen über der Überschrift, die Nummer kommt aus dem Kapitelaufbau, nicht aus CSS Zählern, wenn sie im Menü wiederkehrt.
- Mono Schrift klein, aber mindestens 12 Pixel und mit gerechnetem Kontrast.
- Menüeinträge verweisen auf dieselben Kapitelnummern.
- Die Rasterlinie ist ein Rand, kein Zierstrich vor einer Überschrift, siehe Kapitel 26.

## Was nicht übernommen wird

Nummern, Themen und Gestaltung der Referenz. Der Zierstrich vor Kickern bleibt nach Kapitel 26 verboten, die Rasterlinie darüber ist eine Trennlinie.
