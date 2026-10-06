# Bausteine zu Kapitel 38: Scrollvideo, Einbettung, Textur

Vier einzelne Schnipsel zu `../../../references/38-scrollvideo-und-einbettungen.md`. Bewusst kein
fertiges Paket: Jeder Baustein steht für sich und wird beim Einbau an die Tokens des Projekts
angepasst (`../tokens.css`, Rollen statt Werte). Der Ordner heißt `vorlagen`, deshalb nimmt
`pruefe-platzhalter.mjs` ihn aus.

Vor dem Einbau:

* `scrolly-video`: Importpfad, Optionen, aktuelle Version und Lizenz in der README der
  Bibliothek prüfen. Die Angaben folgen der npm-Seite vom 07.10.2026 und sind **nicht gegen die
  Bibliothek getestet**. Version und Lizenz sind `[[unbekannt]]`.
* Alle Bausteine im Projekt mit `pruefe-motion.mjs`, `pruefe-tokens.mjs` und
  `pruefe-breakpoints.mjs` durchlaufen lassen. `pruefe-motion.mjs` prüft auch diese Vorlagen
  (`scripts/tests/pruefe-scrollvideo.test.mjs`).

| Datei | Zweck |
|---|---|
| `scrollvideo.html` | Markup mit Poster und Fallbacktext |
| `scrollvideo.js` | lädt die Bibliothek erst bei Sichtbarkeit, überspringt bei reduzierter Bewegung |
| `blend.css` | Maske gegen den Blendfehler |
| `korn.css` | Körnung als Textur über Token, `--textur-korn` gehört danach in `tokens.css` |
| `lazy-embed.js` | Drittanbieter-Einbettung erst bei Sichtbarkeit, hinter die Consent-Logik (`consent-und-dienste.md`) |
