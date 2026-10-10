# Prompt-Vorlagen

Eigene Formulierungen nach Mustern aus Videos von Jay E (RoboNuggets), siehe `CREDITS.md`, Abschnitt
„Version 4.11", `varianten.md` und `pruefprompts.md` nach dem Paket aus Abschnitt „Version 4.19", und aus dem Paket „Claude Design Hacks" (Abschnitt „Version 4.18"). Der Ordner heißt `vorlagen`, deshalb nimmt `pruefe-platzhalter.mjs` ihn aus und
`[[FEHLT: …]]` darf hier stehen. Beim Einsetzen im Projekt wird jeder Platzhalter gefüllt.

| Datei | Wofür | Regelwerk |
|---|---|---|
| `polierschleife.md` | Bauagent und getrennter Kritikagent, mit Budget und Durchlaufgrenze | `40-polierschleife-mit-kritiker.md` |
| `storyboard.md` | statische Frames und Beschreibung vor jeder Scroll-Animation | `38-scrollvideo-und-einbettungen.md`, Abschnitt 2a |
| `tweaks-panel.md` | lokales Reglerpanel für den Feinschliff, nie im Produktionsbuild | `pruefe-platzhalter.mjs` |
| `bildgenerierung.md` | Kosten, Budget, Protokoll bei bezahlter Bild- und Videogenerierung | `39-ki-assets-bewegtbild-und-3d.md`, Abschnitt 3a |
| `textkritik.md` | vier Fachkritiker (Copy, Conversion, SEO, GEO) und ein Bewerter für Seitentexte, nur lesend | `40-polierschleife-mit-kritiker.md`, Abschnitt 3b |
| `design-loop.md` | Design Loop: Interview, Preflight, `bar.md` aus prüfbaren Mechanismen, drei Kritiker mit Bestanden oder Nicht bestanden | `40-polierschleife-mit-kritiker.md`, Abschnitt 3c |
| `fuenf-agenten-pruefung.md` | 20 Prüfpunkte in fünf lesenden Aufträgen, Zusatzblock Recht und Auslieferung, Fix-Liste mit GO | `47-claude-design-hacks.md`, Abschnitt 6 |
| `fuenf-versionen.md` | fünf Entwürfe oder fünf einfachere Fassungen, Ein-Bildschirm-Test, Formular kürzen | `47-claude-design-hacks.md`, Abschnitte 4 und 5 |
| `abschnitt-remix.md` | eine Referenz je Sektion, Ablauf eines Flusses | `47-claude-design-hacks.md`, Abschnitt 3 |
| `varianten.md` | Richtungen und Varianten der Startsektion, je mit Preiszeile, Wahl in `marke.json` | `48-richtung-varianten-und-subtraktion.md`, Abschnitte 3 und 4 |
| `pruefprompts.md` | Prüfer ohne Vorwissen mit Screenshots, Subtraktion, Erzählbruch, nur lesend | `48-richtung-varianten-und-subtraktion.md`, Abschnitte 5 bis 6a |
| `designsystem-ableiten.md` | Tokens aus dem eigenen Material des Kunden und aus freigegebenen Referenzen | `24-designsystem-vorrang.md`, `20-markenextraktion-bestandsseite.md` |

Nicht aufgenommen: Vorlagen für Effort-Tests, Apple-HIG-Skill und Tone-of-Voice-Skill. Gründe in
`CREDITS.md`, Abschnitt „Version 4.11".
