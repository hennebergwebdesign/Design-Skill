# Motion Graphics und Video mit Opus 5.5

Quellen: Video 3 (29.09.2026), Video 5 (Tipps 17, 18, 21, 23, 24).

## Wie es technisch funktioniert

Es wird kein generatives Videomodell benutzt. Bewegung, Text und 3D entstehen aus Code: HTML, CSS, JavaScript, dazu Bibliotheken wie three.js und ffmpeg. Bilder aus dem Workspace werden per JavaScript zu einem Zeitpunkt an eine Position gesetzt. Alle Elemente bleiben einzeln auswählbar und editierbar. Hyperframes und Remotion waren im Test nicht nötig.

## Drei Level

| Level | Methode | Nutzen | Grenze |
|---|---|---|---|
| 1 | One Shot Prompt | Fähigkeit eines Modells testen, Showreel fürs Portfolio. Derselbe Prompt dient als Benchmark bei neuen Modellen. | Selten produktionsreif |
| 2 | Storyboard zuerst | Claude erzeugt HTML Frames ohne Animation: Screenshots plus Beschreibung je Szene (z. B. "Kamera springt zu Panel 1"). Feedback direkt am Frame, bevor Tokens in Animation fließen. | Braucht Review Oberfläche |
| 3 | Regie am fertigen Video | Kommentare mit Zeitmarke und Bildposition, auch zu Ton und Soundeffekten. Alle Kommentare gesammelt zurück an Claude, dann rendern. Laut Autor erreicht man nach Storyboard ca. 80 bis 90 Prozent, Level 3 liefert den Rest. | Menschliches Review bleibt Pflicht |

## Feedback Oberfläche (Prinzip, nicht das Produkt)

Zwei Bausteine genügen: (a) Vorschau mit Bild plus Szenenbeschreibung, (b) Klick auf eine Stelle erzeugt Kommentar mit Zeitstempel und Koordinate. Kommentare sammeln, kopieren, in einem Rutsch an Claude. Für Webseiten übertragbar: Annotation direkt auf Screenshot einer Sektion statt freier Chat Beschreibung.

## Handwerkliche Regeln

* Grafiken als SVG anfordern (skalierbar, Farbe von Hand änderbar, animierbar).
* GSAP für Scroll und Reveal Motion. Lottie (Lordicon) für fertige animierte Icons.
* Transkript mit Wort Zeitmarken (Whisper) als Taktgeber: Claude markiert Stellen, an denen eine Animation hilft, und baut Clips passend zur Sprache.
* Mit vorhandenem Design System animieren, sonst sieht Motion generisch aus.
* Rohvideo: Claude lässt die besten Takes bestimmen, danach Level 3 Review (Zeitraffer 2x beim Prüfen).
* Differenzierung laut Autor: Geschmack plus eigenes Arbeitssystem für Feedback, nicht die Fähigkeit zum One Shot.

## Nutzen für Webprojekte

Storyboard Prinzip auf Scroll Animationen übertragen: erst statische Frames je Scroll Stufe mit Beschreibung abstimmen, danach GSAP ScrollTrigger Implementierung. Reduziert Nacharbeit bei Kunden.
