# /generate Skill Blueprint (Video 9)

```
Baue einen Skill "generate" für Bild und Videogenerierung.

Anbieter: [fal.ai, WaveSpeed, Kie.ai]. API Keys liegen in .env, nie im Chat oder Repo.
Routing: günstigster verfügbarer Anbieter zuerst, bei Fehler nächster.
Ablauf je Aufruf: 1) Modell wählen, 2) Referenzen laden, Prompt schreiben und mir zeigen, 3) Kosten berechnen und nennen, 4) nach Bestätigung generieren, 5) Prompt, Modell, Kosten, Datei in generations/log.json speichern, 6) Galerie (Masonry Grid) aus generations/ automatisch aktualisieren.
Harte Regeln: Budget Deckel pro Auftrag [3 USD], bei mehr als [10] Bildern Rückfrage, nie ohne Kostenangabe senden.
Styles Tab: gespeicherte Stile mit Prompt und Referenzpfad, per Klick kopierbar.
Erweiterung: neue Modelle durch Einfügen der "Content for LLMs" Seite des Anbieters ergänzen.
Rechte: Notiere pro Datei Modell und Nutzungsbedingungen für Kundenprojekte.
```
