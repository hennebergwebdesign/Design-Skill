# Jev: Entscheidungsmodell (System 1) neben dem LLM

Quellen: Video 6 (21.09.2026) und Video 2 (04.10.2026). "Jev" ist die im Transkript erscheinende Schreibweise, Hersteller laut Video "Typesafe". Alle Messwerte stammen vom Autor oder von ihm zitierten Tests.

## Was es ist

Ein Modell, das nicht schreibt, sondern in drei Formen antwortet: wahr/falsch, Auswahl aus einer Liste, Skala (z. B. 0 bis 10), meist mit Konfidenz. Output Tokens sind laut Video gratis, Input ca. 4 Cent pro Million Token. Angegeben werden 20 bis 200 mal schneller und 40 bis 400 mal günstiger als große Modelle. Einordnung des Autors: System 1 (schnelle Entscheidung) kombiniert mit System 2 (LLM, Denken und Schreiben). OpenAI habe laut Video eine "Decisions API" mit ähnlichem Prinzip vorgestellt. Einschränkung aus Kommentaren: arbeitet nur auf Text, nicht auf Bildinhalt.

## Warum für den Design Skill relevant

Das Muster "viele kleine Entscheidungen billig und schnell treffen, nur die schwierigen an ein großes Modell" überträgt sich auch ohne Jev (Haiku oder Regeln).

## Use Cases mit Webdesign Bezug

* Skill Auswahl: bei 100+ Skills wählt das Entscheidungsmodell den passenden aus (Test: 14 Aufgaben, 145 Skills, ca. 5 Sekunden gesamt gegenüber ca. 30 Sekunden mit Opus).
* Modell Routing: Aufgabe lesen, Haiku, Sonnet oder Opus zuordnen. Demo: 12 Prompts, ca. 70 Prozent Ersparnis, 9 von 12 brauchten kein Topmodell. Per /jv an und aus schaltbar.
* Icon Auswahl: Nutzertext bestimmt das Icon aus einem festen Set (Habit Tracker: "mehr Wasser trinken" liefert Wasser Icon).
* Seiten aus Bausteinen: Das Modell wählt aus einer Bibliothek (Formulare, Buttons, Sign in, Fonts), welche Teile ein Besucher bekommt. Nur Auswahl, kein Code.
* Suche nach Bedeutung statt Wortlaut (Seiten oder Bildsuche, braucht Textbeschreibung oder Metadaten je Bild, notfalls ein günstiges Modell für Captions, Beispiel Gemini Flash Lite, ca. 50 Cent je 1.000 Bilder laut Video).
* Chrome Extension "Unclutter": entfernt Werbung, Cookie Banner und KI Müll im Feed.
* Backlinks: interne Verlinkung von 60 Blogposts in 2,5 Sekunden (SEO Nutzen, Review Pflicht).
* Anfragen Triage mit Konfidenz Schwelle (unter 60 Prozent geht an einen Menschen). Für Kontaktformulare von Kunden: Anfrage nach Gewerk, Dringlichkeit, Lead Qualität einordnen.
* Wettbewerber Anzeigen aus der Meta Ad Library taggen (Format, CTA, Funnel Stufe), als Swipe File.
* Kommentare nach Kaufabsicht sortieren, Clips aus langen Videos bewerten (411 Clips in 6,5 Sekunden), Churn Gruppen, Live Meeting Tags.
* Chatbot ohne LLM Aufruf: Frage wird einem vorbereiteten Inhaltsverzeichnis (z. B. Video Transkripte oder Firmendokumente) zugeordnet.

## Qualitätssicherung (Use Case 8)

Validierungsset mit bekannten richtigen Antworten (einige Dutzend bis Hundert), Modell ohne Lösung laufen lassen, Trefferquote zählen, Fehler analysieren, Kategorien und Schwellen nachjustieren.

## Setup laut Video

API Key bei Typesafe oder über OpenRouter. Claude einmal einrichten lassen und Zugriff bestätigen. Dann Skill oder Befehl zum Ein und Ausschalten bauen.

## Entscheidung für Henneberg Projekte

Kein Muss. Interessant als spätere Optimierung für das Kontaktformular Feature (Triage) und für Skill Routing. Vorher Datenschutz klären (Auftragsverarbeitung, Datenübermittlung in Drittländer), Kundendaten nicht ungeprüft an Drittanbieter geben.
