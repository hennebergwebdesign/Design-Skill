# Polierschleife mit getrenntem Kritiker

Nur starten, wenn alle vier Vorbedingungen aus `40-polierschleife-mit-kritiker.md` stehen: Entwurf und
Design System, Referenzen, Briefing, Budget mit Durchlaufgrenze. Eine Schleife ist ein subjektiver
Durchgang im Sinn von Kapitel 29, kein dritter.

```
Aufgabe: Polieren von [[FEHLT: Pfad und Sektionen, z. B. src/pages/index.astro, Hero bis Kontakt]].
Außerhalb dieses Pfads wird nichts geändert.

Kontext:
- Design System: [[FEHLT: Pfad zu tokens.css und marke.json]]
- Referenzen für den Kritiker: [[FEHLT: freigegebene Referenzen aus .designrecherche/ oder Bilder]]
- Briefing: Zielgruppe [[FEHLT]], Conversion-Ziel [[FEHLT]], Markenregeln [[FEHLT]]

Bauweise: Zerlege in Einheiten (je Sektion). Je Einheit ein Bauagent und ein getrennter Kritikagent.
Der Kritiker sieht nur Screenshots (375 und 1440 px, je Sektion als Ausschnitt), nicht die Gedanken
des Bauagenten, und ändert nichts selbst. Er soll das Ergebnis widerlegen und gilt im Zweifel als
durchgefallen.

Latte: Der Kritiker bestätigt erst, wenn keine dieser Prüfungen scheitert: Abweichung vom Design
System, Kontrast und Lesbarkeit, Abstand und Hierarchie, Abweichung vom Briefing, Vergleich mit der
Referenz. Die harten Grenzen aus SKILL.md und die Prüfskripte stehen über dem Urteil des Kritikers.

Grenze: höchstens [[FEHLT: Durchläufe je Einheit]] Durchläufe je Einheit, danach Stopp und Bericht.
Budget: [[FEHLT: Deckel für Zeit oder Kosten]]. Bei Überschreitung anhalten und fragen.

Abschluss: HTML-Bericht mit vorher und nachher, Status je Einheit (bestanden, durchgefallen, Grenze
erreicht) und offenen Punkten. Danach laufen die Prüfskripte. Melde die Seite nicht als abgenommen.
```
