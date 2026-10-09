# Prüfprompts: Prüfer ohne Vorwissen, Subtraktion, Erzählbruch

Nach `47-richtung-varianten-und-subtraktion.md`, Abschnitte 5, 6 und 6a. Alle drei laufen in frischem
Kontext (Unteragent oder neue Sitzung) und ändern nichts. Sie sind eine Art, einen der zwei
subjektiven Durchgänge aus `29-pruefdurchgaenge-und-vokabular.md` zu fahren, kein zusätzlicher.
Die harten Grenzen und die Prüfskripte stehen über jedem Urteil hier.

## Prüfer ohne Vorwissen

Eingabe: nur Screenshots bei 375 und 1440 px aus `node scripts/pruefe-breakpoints.mjs --bilder`, je
Sektion als Ausschnitt. Kein Code, kein Verlauf, kein Briefing außer dem einen Satz zur Zielgruppe.

```
Du siehst diese Seite zum ersten Mal. Zielgruppe: [[FEHLT: ein Satz]].
Beurteile die Screenshots ohne Schonung. Je Punkt: Wert von 1 bis 10, Beleg im Bild (Sektion,
Element), kleinste Korrektur. Jeder Wert unter 10 nennt einen Mangel.
1. Was ist das, für wen, was soll ich tun? Antworte nach drei Sekunden Blick auf den ersten Bildschirm.
2. Verkleinere gedanklich auf ein Viertel: bleibt eine Rangfolge (Überschrift, Handlung, Rest)?
3. Passt jedes Bild zur Aussage seiner Überschrift, auch ohne den Text daneben?
4. Welche Elemente sind Rauschen?
5. Welche dieser Muster siehst du: Kicker über jeder Überschrift, Nummern statt Themen, drei gleiche
   Karten, getippte Logoleiste, kursives Akzentwort, Violettverlauf, Glas auf jeder Karte,
   Attrappe einer Oberfläche, Scrollhinweis?
Ändere nichts.
```

## Subtraktion

```
Gehe jedes Element der Seite [[FEHLT: Pfad]] durch. Zielgruppe [[FEHLT]], Aufgabe [[FEHLT]].
Je Element drei Fragen: Hilft es dieser Zielgruppe bei dieser Aufgabe? Ist es Information oder
Dekoration? Was fehlt dem Besucher, wenn es fehlt?
Liste nur Elemente, die entfallen oder leiser werden können, mit Grund. Elemente, die der Kunde
ausdrücklich verlangt hat, markierst du als „vom Kunden", nicht als Streichung. Ändere nichts.
```

## Erzählbruch

```
Vergleiche Heldbild, Überschrift und erste Sektion. Erzählen sie dieselbe Geschichte?
Wohin geht der Blick zuerst: auf das Angebot oder auf ein Nebenelement?
Kommt das erste echte Foto auf dem Handy innerhalb der ersten zwei Bildschirme?
Antworte je Frage mit Ja oder Nein, Beleg und kleinster Korrektur. Ändere nichts.
```
