# Design Loop: Latte aus Mechanismen, drei Kritiker, Bestanden oder Nicht bestanden

Nur nach `40-polierschleife-mit-kritiker.md`, Abschnitt 3c, und nur, wenn alle vier Vorbedingungen aus
Abschnitt 2 stehen. Vier Phasen, keine überspringen, in den Phasen 1 bis 3 wird **nichts gebaut**. Der
Loop läuft in Claude Code, Claude Design kann keine frischen Kritiker starten. Zählt als ein subjektiver
Durchgang nach Kapitel 29.

## Phase 1: Interview (genau diese drei Fragen, zusammen, dann warten)

```
1. Was wird gebaut, und wie groß oder wie lang?
2. Was macht das schon brillant? Etwas, das ich öffnen kann: Seite, Video, Dokument.
   Fällt nichts ein, sag "überspringen".
3. Mit welchen Dateien soll ich arbeiten? Designsystem, Markenbrief, Text, Entwurf.
```

Nennt die Antwort etwas Vages („Apples Website"), **einmal** nach der konkreten Seite oder Datei
fragen. Bei „überspringen" drei Kandidaten mit je einer Zeile Begründung vorschlagen und warten. Kommt
keine Antwort, den härtesten nehmen. Eine fremde Seite erst nach Tor 1 abrufen.

## Phase 2: Preflight (eine Prüfung, keine Frage, ein Block als Bericht)

```
- Referenz jetzt abrufen (Screenshot der Adresse oder Datei lesen). Gesperrt oder fehlend: sagen, andere erfragen.
- Prüfen, ob die Ausgabe gerendert werden kann: Screenshots bei 375 und 1440 px für eine Seite,
  Bilderreihe für Bewegtbild, PDF-Ausgabe für ein Dokument. Ohne Rendering gibt es keinen Handwerkskritiker.
- Benötigte Generatoren (Bild, Video, Stimme) nennen und prüfen, ob sie verbunden sind.
- Eingabedateien prüfen: tokens.css, marke.json, Markenbrief, Text.
Dann ausgeben: was geht, was fehlt, welcher Kritiker blind wäre. Nie still mit einem blinden Kritiker weitermachen.
```

## Phase 3: Zerlegung (`bar.md` schreiben, dem Menschen zeigen, auf Freigabe warten)

```
# bar.md: was an [Referenz] gut ist
Referenz: [Name und Adresse oder Datei]
Teil, das ich baue: [was, wie groß]
Datum:

Schreibe 5 bis 7 Mechanismen. Ein Mechanismus ist eine Regel, die ein Kritiker am Rendering durch
Ansehen prüfen kann. Nur Sichtbares, nie Code.
  Unbrauchbar: "wirkt hochwertig".
  Brauchbar:   "Die Überschrift ist fünfmal so groß wie der Fließtext, insgesamt drei Schriftgrößen."

1. Typografie: [Größen, Gewichte, wie viele Stile]
2. Farbe: [wie viele Farben, wo der Akzent sitzt, wie oft]
3. Raster: [Spalten, Ausrichtung, was wo sitzt]
4. Raum: [wie viel Luft, wo]
5. Bewegung: [was sich bewegt, wie lange, in welche Richtung]
6. Detail: [eine Kleinigkeit, die die Referenz tut und die man leicht übersieht]
7. (optional) [alles, was ein Kritiker durch Ansehen prüfen kann]

Beispiele für den Stil der Zeilen:
- Die Überschrift ist fünfmal so groß wie der Fließtext, drei Schriftgrößen insgesamt.
- Eine Akzentfarbe, höchstens zweimal je Bildschirm.
- Bewegung löst sich immer in eine Richtung auf.
- Nichts animiert kürzer als 150 ms.
- Der Weißraum über dem Falz beträgt mindestens 40 Prozent der Fläche.
```

Die Beispielzeilen sind Stilmuster, keine Werte für das Projekt. Die Zahlen kommen aus der Referenz.

## Phase 4: Schleife

```
Zerlege das Ziel in die kleinsten Teile, die sich einzeln verbessern und beurteilen lassen. Du wählst die Teile.
Höchstens drei oder vier, jedes weitere vervielfacht den Lauf.

Je Teil: ein Bauagent, danach drei Kritiker, jeder mit frischem Kontext und ohne Wissen, wie der
Bauagent gearbeitet hat. Schreibe den Auftrag jedes Kritikers selbst, zugeschnitten auf dieses Ziel.

- Brief-Kritiker: beurteilt nur das genannte Ziel. Leistet es, was verlangt ist? Ästhetik ignorieren.
- System-Kritiker: beurteilt nur gegen [[FEHLT: Pfad zu marke.json, Markenbrief oder DESIGN.md]]. Fehlt die Datei, überspringen und das sagen.
- Handwerks-Kritiker: beurteilt nur gegen bar.md und das Rendering. Stellt unser Ergebnis neben die Referenz,
  Beschriftungen entfernt, sagt, welches besser ist, und nennt die eine größte Lücke.
  Stärkstes verfügbares Modell, ein schwaches winkt alles durch.

Regeln:
- Kritiker sind streng. Lob hilft nicht.
- Kritiker beurteilen das Rendering, nie den Code.
- Urteil: bestanden oder nicht bestanden, nie eine Zahl. Zahlen driften nach oben.
- Alle drei müssen bestehen. Jedes "nicht bestanden" geht mit der einen größten Lücke zurück an den Bauagent.
- Die harten Grenzen aus SKILL.md und die Prüfskripte stehen über jedem Urteil.
- Durchlaufgrenze: höchstens [[FEHLT: Runden je Teil, Vorschlag 5]] Runden je Teil, danach Stopp und
  offener Bericht der Restlücken. Budget: [[FEHLT: Deckel für Zeit oder Kosten]]. Beim Überschreiten
  anhalten und fragen.
- Zeige Rundenzahl und erledigte Teile, keine Kosten. Das Modell sieht seinen Verbrauch nicht.

Halte eine Fortschrittsübersicht aktuell: Teil, Urteil je Kritiker, Verlauf der größten Lücke, Rundenzahl.
```

## Rundenprotokoll (im Projekt führen)

| Runde | Teil | Brief | System | Handwerk | Größte Lücke |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

## Was die Methode bricht

* Ein vager Maßstab. Mit Abstand der häufigste Fall.
* Der Bauagent beurteilt sein Werk selbst. Kritiker brauchen frischen Kontext.
* Ein weicher Kritiker. Sein Auftrag ist binär, keine Note.
* Zu viele Zusatzanweisungen. Jede steht an der Stelle, an der das Modell selbst urteilen könnte.

Quelle der Methode und des Wortlauts: `CREDITS.md`, Abschnitt „Version 4.18".
