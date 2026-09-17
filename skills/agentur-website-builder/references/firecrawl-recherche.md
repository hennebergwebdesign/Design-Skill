# Firecrawl: bekannte oder alte Seiten crawlen und scrapen

Zwei Werkzeuge im Repository rufen fremde oder alte Websites ab, für zwei unterschiedliche
Zwecke. Beide können optional über die Firecrawl-API laufen
(Quelle: [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl), Cloud unter
[firecrawl.dev](https://firecrawl.dev)), keines braucht sie zwingend.

| Werkzeug | Erfasst | Zweck | Ziel |
|---|---|---|---|
| `scripts/relaunch-inventory.mjs` | die **eigene** alte Kundenseite, möglichst vollständig | Bestandsaufnahme vor dem Relaunch: welche URLs, welche Texte, welche Rechtstexte, welche Weiterleitungen | `.relaunch-inventory/` im Kundenprojekt |
| `scripts/design-scan.mjs` | eine **fremde** Seite, Wettbewerber, Inspirationsquelle oder eine vom Kunden genannte Referenz | Struktur- und Design-Rohmaterial für die Referenzrecherche: Sektionsreihenfolge aus der Überschriftenhierarchie, Wortzahl, Bildbelegung, Farb- und Schriftkandidaten aus dem Code, optional ein Screenshot | `.design-scan/<host>/` im Kundenprojekt |

Beide gehören zum Repowurzelverzeichnis `scripts/`, nicht in das Kundenprojekt, und wandern
nie in dessen `package.json`, siehe die Regel dazu in der Repo-`CLAUDE.md`.

## Was Firecrawl beiträgt

Ohne `FIRECRAWL_API_KEY` arbeiten beide Skripte mit einem eingebauten Direktabruf: einfacher
`fetch()` auf die HTML-Antwort, das genügt für die meisten serverseitig gerenderten Seiten
(WordPress, klassische Baukästen, statische Seiten). Mit gesetztem Schlüssel läuft der Abruf
stattdessen über die Firecrawl-API und bringt drei Dinge, die der Direktabruf nicht kann:

1. **Seiten, die erst im Browser rendern** (React-, Vue- oder sonstige JS-Apps ohne
   Server-Rendering), weil Firecrawl selbst einen Browser ausführt.
2. **Einen Screenshot** der gerenderten Seite (`design-scan.mjs`), als visueller Ankerpunkt
   neben der Textstruktur.
3. **Eine Sitemap unabhängige Seitenkarte** über den `/map`-Endpunkt (aktuell von
   `relaunch-inventory.mjs` genutzt), für Seiten ohne brauchbare `sitemap.xml`.

## Einrichtung

```bash
export FIRECRAWL_API_KEY=fc-...
node scripts/design-scan.mjs https://wettbewerber-oder-inspiration.de
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
```

Der Schlüssel kommt von [firecrawl.dev](https://firecrawl.dev) (kostenloses Kontingent für
Tests) oder aus einer selbst gehosteten Instanz nach der Anleitung im
[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)-Repository, dann mit eigener
Basis-URL statt der Cloud-API. Kein Schlüssel im Repository, auch nicht in einer `.env`, die
versehentlich eingecheckt wird, siehe die harte Grenze „keine Schlüssel im Repository" in der
`SKILL.md` dieses Skills.

Ohne Schlüssel funktionieren beide Skripte weiter, nur ohne die drei Punkte oben. Das
Fehlen des Schlüssels ist kein Blocker, im Bericht aber als eingeschränkte Erfassung
benennen, wenn eine Seite deshalb nicht vollständig erfasst werden konnte.

## Wann welches Werkzeug

* **Vor einem Relaunch**, sobald die alte Kundenseite feststeht: `relaunch-inventory.mjs`,
  siehe `references/intake-und-entscheidungen.md`. Anschließend Marke und CI nach
  `../webdesign-conversion/references/20-markenextraktion-bestandsseite.md` auslesen.
* **Vor dem Tokensystem-Plan**, wenn eine konkrete Seite als Referenz dient statt einer
  kuratierten Galerie: `design-scan.mjs`, siehe
  `../webdesign-conversion/references/22-premium-designquellen.md` und die Rangfolge der
  Quellen in `references/referenzen-und-auswahl.md`. Das gilt für Wettbewerberseiten, vom
  Kunden genannte Vorbilder und für „bekannte" Seiten, die als Diskussionsgrundlage dienen,
  bevor sie in der Ausgangsliste von `referenzen-und-auswahl.md` gesucht werden.
* **Beides zusammen** bei einem Relaunch mit gleichzeitiger Neuausrichtung: erst
  `relaunch-inventory.mjs` für das, was bleiben muss, dann `design-scan.mjs` für die neuen
  Referenzen, die die Richtung vorgeben.

## Grenzen, die nicht verhandelbar sind

* **Rohmaterial, kein Liefergegenstand.** Beide Ausgaben (`.relaunch-inventory/`,
  `.design-scan/`) enthalten fremde Texte, Bildadressen und bei `design-scan.mjs` einen
  Screenshot der fremden Seite. Sie gehören in die `.gitignore` des Kundenprojekts und nie in
  die ausgelieferte Seite.
* **Prinzip, nie Kopie.** Was aus einer erfassten Seite in ein Kundenprojekt übernommen
  werden darf, regelt `references/referenzen-und-auswahl.md`: ein Prinzip, benannt und
  begründet, nie Text, Logo, Bildmaterial oder eine charakteristische Layoutkombination im
  Ganzen. `design-scan.mjs` liefert Farb- und Schriftkandidaten als grobe Heuristik aus dem
  Code, keinen Tokenwert. Die Marke des Kunden selbst wird trotzdem nach
  `../webdesign-conversion/references/20-markenextraktion-bestandsseite.md` ausgelesen, nicht
  nach diesem Kapitel.
* **`design-scan.mjs` bewertet nicht.** Es liefert Struktur, keine Einschätzung, ob etwas
  gut ist. Die drei bis fünf Prinzipien benennen bleibt eigene Sichtung, siehe
  `../webdesign-conversion/references/22-premium-designquellen.md`.
* **Ungetestet gegen die echte Firecrawl-API.** `design-scan.mjs` ist gegen Direktabruf
  geprüft, noch nicht mit gesetztem `FIRECRAWL_API_KEY` gegen die echte API, ebenso wie
  `relaunch-inventory.mjs`, siehe die Offenen Punkte in der Repo-`CLAUDE.md`. Beim ersten
  Einsatz mit Schlüssel die Ausgabe stichprobenartig gegen die Originalseite prüfen.

## Verwandte Kapitel

- Bestandsaufnahme vor dem Relaunch: `intake-und-entscheidungen.md`
- Rangfolge der Referenzquellen, was übernommen werden darf:
  `referenzen-und-auswahl.md`
- Referenzrecherche vor dem Tokensystem-Plan:
  `../webdesign-conversion/references/22-premium-designquellen.md`
- Marke und CI aus einer bestehenden Seite auslesen:
  `../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`
