# Agenturwerkzeuge und Prüfskripte

Aus der `SKILL.md` ausgelagert (Zeilengrenze, siehe `scripts/pruefe-skill.mjs`). Hier steht, welches Skript was tut und wo der Ablauf dazu steht.

## Inhalt

- Skripte im Überblick

## Skripte im Überblick

`scripts/` im Repowurzelverzeichnis enthält dreizehn Prüfskripte (`pruefe-*.mjs`) und Agenturwerkzeuge, die nie Teil der
ausgelieferten Seite werden und nie in das `package.json` des Kundenprojekts wandern:

* `relaunch-inventory.mjs` inventarisiert eine alte Kundenseite (Ablage `.relaunch-inventory/`, `references/intake-und-entscheidungen.md`),
  `brand-extraktion.mjs` misst Farben, Schriften, Typoskala, Buttons und Logo der eigenen Bestandsseite im Browser
  (Ablage `.brand-extraktion/`, `references/brand-extraktion.md`), `design-scan.mjs` erfasst eine fremde oder vom Kunden genannte
  Referenz (Ablage `.design-scan/<host>/`, `references/firecrawl-recherche.md`).
* `referenz-register.mjs` führt den Freigabezustand jeder Designreferenz und ist die einzige Stelle, die ihn ändert; `referenz-crawl.mjs`
  erfasst nur Freigegebenes (sonst Exit 2); `design-dna.mjs`, `muster-vergleich.mjs`, `muster-paket.mjs` führen bis Tor 2, `pruefe-muster.mjs`
  prüft die Musterbibliothek. Keines schreibt in sie (`references/designrecherche-ablauf.md`).
* `deslop-check.mjs` prüft selbst formulierte Copy-Vorschläge (`references/qa-und-abnahme.md`), `pruefe-geschmack.mjs` zählt die messbaren
  KI-Tells (`../webdesign-conversion/references/26-geschmack-und-ki-tells.md`), `pruefe-sicherheit.mjs` findet Schlüssel, öffentliche Geheimnisse
  und die Zahlungsfehler (`references/sicherheitspruefung.md`), `pruefe-scrollstrecke.mjs` läuft eine Scrollseite durch (`references/qa-und-abnahme.md`, Schritt 4).
* `typoskala.mjs` rechnet die Typoskala, `schrift-metriken.mjs` misst die Ersatzschrift, `pruefe-typografie.mjs` prüft beides im Projekt
  (`../webdesign-conversion/references/55-typografie-system.md`). `pruefe-seitenbasis.mjs` prüft lang, Viewport, Alt-Texte, Labels und Fremdserver.
* `lib/abruf.mjs` ist die gemeinsame Abrufschicht der Erfassungswerkzeuge (vier Rückfallstufen, robots.txt, `references/firecrawl-recherche.md`),
  `lib/browser.mjs` die eine Stelle, die Playwright findet und Chromium startet.

Die Erfassungswerkzeuge laufen mit reinem `fetch()` ohne Abhängigkeit, optional über eine selbst gehostete Firecrawl-Instanz
(`FIRECRAWL_BASE_URL`), die Cloud (`FIRECRAWL_API_KEY`) oder ein vorhandenes Playwright. Playwright brauchen außerdem `brand-extraktion.mjs`,
`pruefe-breakpoints.mjs` und `pruefe-scrollstrecke.mjs`: berechnete Styles, Hoverzustände und Scrollen liefert nur ein Browser.
