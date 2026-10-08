# Änderungsrunden und Layoutschutz

Eine gebaute Seite wird danach oft geändert: Rückmeldung des Kunden, eine schwache Sektion, ein
Bild wird getauscht, ein Absatz fällt weg. Genau dabei geht am häufigsten etwas kaputt, was vorher
stand. Das Modell nimmt den kürzesten Weg: am Desktop sieht die Änderung richtig aus, auf dem Handy
bricht die Sektion, oder nach dem Löschen eines Bildes fällt das Raster zusammen. Dieses Kapitel
regelt, wie eine Änderung läuft, damit sie nur ändert, was sie soll.

Quelle: Kurs von Jakub Papert (Oktober 2026), dort als eigene Regeldatei im Projektordner geführt.
Die Datei selbst wird im Kurs nicht gezeigt, die Regeln hier sind auf den Agenturstack übertragen.
Herkunft in `CREDITS.md`, Version 4.15.

**Zwei Quellen, ein scheinbarer Widerspruch.** Der Kurs aus 4.15 rät, Rückmeldungen in einem großen
Auftrag zu bündeln, das Video aus 4.16 (Alex Sprogis) rät zu vielen kleinen Schritten statt eines
Riesenauftrags. Entschieden: Korrekturen einer Runde werden gebündelt, weil sie unabhängig sind und
gemeinsam geprüft werden. Eine Sektion, deren Wirkung erst entsteht (Abschnitt 1, letzte Zeile), wird in
kleinen Schritten entwickelt. Der erste Bau einer Seite folgt dem freigegebenen Konzept, zuerst als
Pilot einer Sektion (`../../webdesign-conversion/references/44-gutes-festschreiben-und-rueckbauprobe.md`).

## 1. Rückmeldungen bündeln

| Regel | Grund |
|---|---|
| Rückmeldungen einer Runde in **einem** Auftrag, nach Sektion sortiert | zehn Einzelaufträge erzeugen zehn Gelegenheiten, Nachbarn zu beschädigen, und zehn Prüfungen |
| Erst einsortieren, dann ändern (`kundenabstimmung.md`, Abschnitt 3) | Geschmacksfragen und Fehler brauchen verschiedene Antworten |
| Größere Umbauten (neue Sektion, neues Layout) getrennt von kleinen Korrekturen (Größe, Farbe, Zuschnitt) | ein Umbau braucht einen Bauauftrag mit Bild und Prüfung, eine Korrektur nicht |
| Eine Erlebnissektion (3D-Szene, Scrollerzählung, Interaktion) in kleinen Schritten entwickeln, je Schritt eine Wirkung, je Schritt angesehen | wer fünf Änderungen an einer Szene auf einmal macht, sieht nicht, welche das Ruckeln oder den Fehler gebracht hat |

## 2. Der Änderungsauftrag

Jeder Auftrag nennt vier Dinge. Fehlt eines, rät das Modell.

```
Sektion:       ‹Name aus der Seitenstruktur der CLAUDE.md›, Datei ‹src/components/sektionen/…›
Änderung:      ‹was genau, mit Pfad zum Bild oder Asset, falls vorhanden›
Bleibt:        Text, Farben, Abstände und alle anderen Sektionen. Nichts anderes anfassen.
Prüfung:       1440, 768 und 375 px, Nachbarsektionen, danach Bericht
```

Die Zeile „Bleibt" ist der wichtigste Teil. Ohne sie verbessert das Modell nebenbei, was niemand
bestellt hat, und der Kunde findet in der nächsten Runde Änderungen, die er nicht kennt.

## 3. Während der Änderung

| Regel | Statt | Grund |
|---|---|---|
| Nur die genannte Sektion und ihre Dateien | „bei der Gelegenheit" globale Stile anpassen | eine Änderung in `global-basis.css` trifft jede Seite |
| Werte aus den Tokens | feste Pixelwerte, neue Farben, neue Schatten | harte Grenze „kein Wert ohne Token", geprüft von `pruefe-tokens.mjs` |
| Wird ein Element entfernt, Raster und Abstände der Umgebung neu ausrichten | Lücke stehen lassen oder leere Zelle | eine leere Bentozelle oder ein halbes Raster ist ein falsch geplantes Layout (`../../webdesign-conversion/references/26-geschmack-und-ki-tells.md`, Abschnitt 5) |
| Bilder und Videos mit Seitenverhältnis und Maßen | Bild ohne `width` und `height` einsetzen | Layoutsprung, CLS, harte Grenze Ladezeit |
| Eine Desktopgrafik bekommt eine eigene Mobilfassung | dieselben Elemente untereinander stapeln | gestapelt verliert die Grafik ihre Aussage (`../../webdesign-conversion/references/28-ki-bildentwuerfe.md`, Abschnitt 3a) |
| Ein Problem lösen, nicht verdecken | `overflow: hidden`, `display: none` auf dem Handy, Text abschneiden | was versteckt wird, fehlt dem Besucher. `overflow-x: hidden` bricht zudem `position: sticky` (`pruefe-geschmack.mjs`) |

## 4. Nach der Änderung

1. `node scripts/pruefe-breakpoints.mjs http://localhost:4321` und die Screenshots der geänderten
   Sektion bei 1440, 768 und 375 px ansehen: horizontales Scrollen, abgeschnittener Text,
   überlappende Elemente, Hover und Verbindungslinien.
2. Die Nachbarsektion darüber und darunter ansehen. Dort zeigt sich, ob ein Abstand mitgewandert ist.
3. `node scripts/pruefe-tokens.mjs` und, wenn Text betroffen war, `node scripts/pruefe-striche.mjs`.
4. Kurz berichten: was geändert wurde, was geprüft wurde, was ungeprüft blieb.

Logos und Porträts wirken auf dem Handy oft schlechter als am Desktop (zu klein, falscher Ausschnitt).
Sie gehören bei jeder Runde, die sie betrifft, in die Sichtprüfung bei 375 px.

## 5. Eigene Sitzungen für Text und Leistung

Zwei Arbeiten bekommen eine frische Sitzung mit eigenem Auftrag, statt am Ende einer langen
Bausitzung zu laufen:

| Arbeit | Grund |
|---|---|
| Text einsetzen oder überarbeiten | der Bauverlauf mit Layoutentscheidungen lenkt vom Text ab, und der Text braucht den Markenbrief als Quelle, nicht den Chatverlauf (`copy-im-kundenprojekt.md`) |
| Leistung optimieren | die Aufgabe ist eng (Bilder, Videos, Schriften, Skripte) und soll Gestaltung nicht anfassen. Maßstab ist die harte Grenze Ladezeit, geprüft nach `qa-und-abnahme.md`, Schritt 5 |

Der Startauftrag der neuen Sitzung entsteht aus der `CLAUDE.md` des Projekts, nicht aus einer
Zusammenfassung des alten Verlaufs. Grund: was nicht in der `CLAUDE.md` steht, ist nicht entschieden.
Eine feste Höchstzahl an Nachrichten je Sitzung ist nicht übernommen, sie hängt am Werkzeug und
veraltet mit ihm.

## 6. Block für die CLAUDE.md des Projekts

Damit die Regeln in jeder Sitzung gelten, ohne dass jemand daran denkt, kommt dieser Block in die
`CLAUDE.md` des Kundenprojekts, unter „Designsystem" oder einen eigenen Abschnitt:

```
## Änderungsregeln
- Nur die genannte Sektion ändern. Text, Farben, Abstände und andere Sektionen bleiben, außer der Auftrag nennt sie.
- Werte nur aus den Tokens. Keine neuen Farben, Schriften, Schatten ohne Auftrag.
- Entfernte Elemente: Raster und Abstände der Umgebung neu ausrichten, keine Lücke.
- Nichts verstecken, um ein Layout zu retten. Desktopgrafiken bekommen eine eigene Mobilfassung.
- Nach jeder Änderung: pruefe-breakpoints.mjs, Screenshots bei 1440, 768 und 375 px ansehen, Nachbarsektionen prüfen, kurz berichten.
```

## 7. Grenzen

* Die Obergrenze von zwei subjektiven Durchgängen vor der Übergabe
  (`../../webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`) und die
  Korrekturrunden mit Frist (`kundenabstimmung.md`) gelten unverändert. Dieses Kapitel regelt, **wie**
  eine Runde läuft, nicht wie viele es gibt.
* Ungeprüft: ob der Block in der `CLAUDE.md` die Zahl beschädigter Nachbarsektionen messbar senkt. Kein
  Evalfall, das Δ ist eine Vermutung.

## Verwandte Kapitel

`kundenabstimmung.md`, `qa-und-abnahme.md`, `copy-im-kundenprojekt.md`,
`../../webdesign-conversion/references/28-ki-bildentwuerfe.md`,
`../../webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`.
