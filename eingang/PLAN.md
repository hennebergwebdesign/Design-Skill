# Plan: Wissenspaket aus neun RoboNuggets Videos (Eingang)

Stand 07.10.2026. Der Ordner `eingang/` ist ein Zwischenlager, damit das Paket eine
Sitzungspause übersteht. Nach der Umsetzung wird er gelöscht. Dieser Plan wird beim Abarbeiten abgehakt.

## Vorher erledigt

Erweiterungspaket Self-Made Web Designer, Version 4.10.0, auf `claude/awesome-albattani-hai7pq`
gepusht. Offen davon: Regressionslauf der ganzen Eval-Suite (vom Nutzer abgebrochen, nur auf Wunsch).

## Vorgehen (Konventionen aus CLAUDE.md)

Deutsch, keine Gedankenstriche, jede Regel mit Grund, harte Grenze nur mit Skript oder Eval, nichts
Erfundenes, Ungemessenes als ungemessen benennen. Wissen gehört ins Regelwerk, Ablauf in den
Bauablauf, nichts doppelt. Fremdes wird destilliert, nicht kopiert. Pro Phase ein Commit und ein Push.

## Phasen

1. **Abgleich (erledigt, siehe `ABGLEICH.md`).** Alle 12 Dateien des Pakets lesen, gegen die vorhandenen Kapitel 01 bis 39 prüfen:
   neu, teilweise, vorhanden, Widerspruch. Ergebnis als Matrix in `CREDITS.md`/`CLAUDE.md`.
   Erwartete Überschneidungen: Anti Slop und Standard Fonts (26), Motion (09, 18, 30, 38),
   Bildgenerierung (28, 39), Referenzrecherche (22), Copy ohne Bindestriche (12, 35).
   Erwartete Widersprüche prüfen: cremefarbener Hintergrund ist in 26 nur bei Standardpalette ein Tell.
2. **Neue Kapitel nur für echte Lücken.** Kandidaten: Gauntlet Loop als Polierschleife mit Budget
   und Durchlaufgrenze (Verhältnis zu 29: zwei Durchgänge), Prompting für das aktuelle Modell
   (Rolle im Bauablauf, nicht im Regelwerk), Ressourcenbibliothek (als Konfiguration wie
   `referenzquellen.json`, Adressen ungeprüft markiert), Wasserzeichen im Kundentext (Hinweis
   mit Quelle, rechtlich ungeprüft), Sicherheit bei Shell Befehlen und Backups im Bauablauf.
3. **Bauablauf.** Pflichtablauf aus `SKILL-ADDON.md` auf Phasen 0 bis 6 abbilden, ohne Doppelung.
   Design System vor dem Entwurf, Checkliste für lange Builds, Review per Crop und Zoom je Sektion
   (an `pruefe-breakpoints.mjs` anbinden), Storyboard vor Scroll Animation, Tweaks Panel optional.
4. **Vorlagen.** Die acht Prompt Vorlagen unter `templates/` als Vorlagen im passenden
   `assets/`-Ordner ablegen, mit Platzhaltern als `[[FEHLT: …]]`, Verweis aus den Kapiteln.
5. **Prüfungen und Evals.** Jede neue harte Grenze bekommt Skript oder Evalfall. Kandidaten:
   Standardfont und kursive Zierwörter (Erweiterung `pruefe-geschmack.mjs`), Gauntlet nie als
   erster Prompt (Evalfall), Kosten und Budget vor Generatoren nennen (Evalfall), Tests je Skript.
6. **Verwaltung.** Versionen 4.11.0 / Regelwerk 2.14.0 / Bauablauf 2.11.0, README, CLAUDE.md
   (Struktur, Änderungsverlauf, Offene Punkte), CREDITS (Quellen, nicht übernommen, ungeprüft),
   `eingang/` löschen.
7. **Tests.** `node --test 'scripts/tests/*.test.mjs'`, `pruefe-striche.mjs`, neue Evalfälle
   mit Baseline messen, Δ ehrlich eintragen.

## Nicht übernehmen (vorab entschieden)

Werbung und Produkte des Kanals (Skool, getrubric, Affiliate Links), Kanal PDFs (nicht abgerufen),
Preis und Modellaussagen ohne Prüfung, Datenweitergabe an Aggregatoren ohne Datenschutzprüfung,
alles, was dem Stack (Astro auf Cloudflare Pages) oder den harten Grenzen widerspricht.

## Offene Fragen an den Eigentümer

Soll das Henneberg Design System (Repo `henneberg-homepage`) hier verlinkt werden? Es liegt
außerhalb dieses Repositories und ist nicht eingesehen.
