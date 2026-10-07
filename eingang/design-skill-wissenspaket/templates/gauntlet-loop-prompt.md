# Gauntlet Loop Vorlage (eigene Formulierung nach dem Muster aus Video 8)

Nur anwenden, wenn ein MVP, ein Design System und Referenzen existieren.

```
Task: [Was verbessert oder gebaut werden soll, z. B. "Polish der Landingpage /pfad, Sektionen Hero bis Footer"].
Kontext: Design System liegt unter [Pfad]. Referenzseiten: [URLs oder Bilder]. Briefing: [Zielgruppe, Conversion Ziel, Markenregeln].

Build Method: Teile das Ziel in kleinste Einheiten (je Sektion). Starte pro Einheit einen Worker Subagent. Starte pro Worker einen getrennten Critic Subagent, der nur das Ergebnis sieht (Screenshots Desktop und Mobil), nicht die Gedanken des Workers. Der Critic soll versuchen, das Ergebnis zu widerlegen, und gilt im Zweifel als durchgefallen.

Bar to Hit: Kein Critic bestätigt, solange eine dieser Prüfungen scheitert: Abweichung vom Design System, Lesbarkeit und Kontrast, Abstand und Hierarchie, Abweichung vom Briefing, Vergleich mit den Referenzen. Maximal [3] Durchläufe pro Einheit, danach Stopp und Bericht.

Abschluss: Erstelle einen HTML Bericht (vorher und nachher, Status je Einheit, offene Punkte). Ändere nichts außerhalb von [Pfad].
```
