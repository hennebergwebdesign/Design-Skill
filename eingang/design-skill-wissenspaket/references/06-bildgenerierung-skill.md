# /generate Skill: Higgsfield Alternative

Quelle: Video 9 (31.07.2026). Preise, Konditionen und Terms ändern sich laufend. Alle Zahlen sind Stand Video und vor Nutzung zu prüfen.

## Kernidee

Higgsfield ist laut Video ein Wrapper (Aggregator) um Bild und Videomodelle. Ein eigener Skill in Claude spricht dieselben Modelle direkt über Aggregatoren mit Pay as you go an. Vorteile: keine Monatsgebühr, Prompts und Dateien lokal, volle Kontrolle über Löschung, kein Training auf eigenen Inhalten durch einen Dritten.

## Genannte Anbieter und Einordnung (Aussagen des Autors)

* fal.ai: Standard für die meisten Projekte, zuverlässig, ca. 500 Modelle.
* WaveSpeed: für Nischenmodelle, große Bibliothek.
* Kie.ai (im Transkript "KI/KAI"): am günstigsten, laut Autor teils Zuverlässigkeitsprobleme. Beispiel GPT Image 2: 3 Cent (1K), 5 Cent (2K), 8 Cent (4K). Spekulation des Autors zur Preisbildung, nicht bestätigt.
* Higgsfield zum Vergleich: ca. 31 bis 34 Cent für ein 2K Bild mit GPT Image 2, Pläne in Australien 49 und 79 Dollar pro Monat. Terms Update: Inhalte nutzbar für Betrieb und Modellverbesserung, Löschfrist bei Kündigung.

## Skill Aufbau (Ablauf bei jedem Aufruf)

1. Modell Routing: günstigster Anbieter aus den angebundenen Quellen zuerst, bei Ausfall nächster (Kie, dann fal, dann WaveSpeed).
2. Referenzen laden und Prompt formulieren (Prompt vorher einsehbar machen).
3. Generieren (Bild oder Video).
4. Logging: Prompt, Modell, Kosten und Datei lokal speichern.
5. Galerie: Masonry Grid mit allen Generierungen, plus Styles Tab (Klick kopiert Prompt und Pfad zu Stil Referenzen).

## Harte Regeln, die in den Skill gehören

* Kosten vor dem Senden berechnen und ausgeben.
* Budget Deckel pro Auftrag (Beispiel im Video: 3 Dollar für eine Bildserie).
* Bei Mengenaufträgen (z. B. 100 Bilder) Bestätigung verlangen.
* Mehrere Modelle gegeneinander laufen lassen, um Stil zu bestimmen (im Video: GPT Image 2, Nano Banana 2, Nano Banana Pro).
* Neue Modelle ergänzen: "Content for LLMs" der Modellseite kopieren und Claude zum Skill hinzufügen lassen.

## Bild zu Website (Demo)

Gefallenes Bild als Pfad an Claude Code geben, Website bauen lassen, Bild per Kling zu Hintergrundvideo animieren, Farben aus dem Bild ableiten, weitere Bilder im selben Stil erzeugen. Autor: One Shot bringt ca. 70 bis 80 Prozent.

## Übernahme

Blueprint als Prompt: templates/generate-skill-blueprint.md. Für Kundenprojekte Bildrechte und Kennzeichnungspflichten beachten (siehe 09-watermark.md). API Keys nie in Chat oder Repo, sondern .env.
