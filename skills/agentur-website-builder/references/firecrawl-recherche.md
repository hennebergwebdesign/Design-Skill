# Firecrawl: bekannte oder alte Seiten crawlen und scrapen

Drei Werkzeuge im Repository rufen fremde oder alte Websites ab, für drei unterschiedliche
Zwecke. Alle drei nutzen dieselbe Abrufschicht und können optional über Firecrawl laufen
(Quelle: [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl), Cloud unter
[firecrawl.dev](https://firecrawl.dev), selbst gehostet über `FIRECRAWL_BASE_URL`), keines
braucht es zwingend.

| Werkzeug | Erfasst | Zweck | Ziel | Freigabe nötig |
|---|---|---|---|---|
| `scripts/relaunch-inventory.mjs` | die **eigene** alte Kundenseite, möglichst vollständig | Bestandsaufnahme vor dem Relaunch: welche URLs, welche Texte, welche Rechtstexte, welche Weiterleitungen | `.relaunch-inventory/` im Kundenprojekt | nein, es ist die Seite des Auftraggebers |
| `scripts/design-scan.mjs` | eine **fremde** Seite, als Einzelblick | Struktur- und Design-Rohmaterial: Sektionsreihenfolge, Wortzahl, Bildbelegung, Farb- und Schriftkandidaten, optional ein Screenshot | `.design-scan/<host>/` im Kundenprojekt | nein, aber es ist auch kein Bibliothekseintrag |
| `scripts/referenz-crawl.mjs` | eine **freigegebene** Designreferenz aus dem Projektregister | die kuratierte Recherche: Rohdaten, Breakpoints, Grenzen, Analyseumfang | `.designrecherche/referenzen/<id>/` | **ja**, bricht ohne Freigabe mit Exit 2 ab |

Alle drei gehören zum Repowurzelverzeichnis `scripts/`, nicht in das Kundenprojekt, und wandern
nie in dessen `package.json`, siehe die Regel dazu in der Repo-`CLAUDE.md`.

Der Unterschied zwischen den beiden letzten ist nicht technischer, sondern organisatorischer
Natur: `design-scan.mjs` ist der schnelle Blick auf eine Seite, `referenz-crawl.mjs` ist der
Schritt in einem Ablauf mit zwei Freigaben, siehe `designrecherche-ablauf.md`. Ein Scan
ersetzt keine Freigabe und erzeugt keinen Eintrag in der Musterbibliothek.

## Die Abrufschicht: vier Stufen mit Rückfall

Seit Version 3.5.0 ruft keines der Skripte selbst ab. Sie nutzen alle `scripts/lib/abruf.mjs`,
die einzige Stelle im Repository, die eine fremde Seite holt. Der Rest des Systems kennt nur
das Ergebnisobjekt, nie Firecrawl. Ein Austausch des Crawlers ist damit eine neue Stufe in
einer Datei, kein Eingriff in Analyse, Vergleich oder Musterbibliothek.

| Stufe | Voraussetzung | Kann | Kosten |
|---|---|---|---|
| 1 Firecrawl selbst gehostet | `FIRECRAWL_BASE_URL` gesetzt | JS-Seiten, Screenshot, Markdown, `/map` | keine |
| 2 Firecrawl Cloud | `FIRECRAWL_API_KEY` gesetzt | dasselbe | Kontingent |
| 3 Playwright lokal | im Projekt installiert | JS-Seiten, Screenshot, **Breakpoints** | keine |
| 4 Direktabruf `fetch()` | immer | serverseitig gerendertes HTML | keine |

Die Reihenfolge ist Absicht: **selbst gehostet vor Cloud**, weil ein kostenpflichtiger Dienst
hier nie die Voreinstellung ist. Scheitert eine Stufe, wird der Grund vermerkt und die nächste
versucht. Der Abruf bricht erst ab, wenn keine Stufe Inhalt liefert.

Stufe 3 wird nur eingehängt, wenn ein Screenshot oder Breakpoints angefragt sind. Für reines
HTML wäre ein Browserstart Verschwendung.

### Was nicht erfasst werden konnte, steht im Ergebnis

Jeder Abruf liefert eine Liste `grenzen` im Klartext, zum Beispiel „Playwright lokal nicht
nutzbar: Playwright ist nicht installiert" oder „keine Breakpoint-Erfassung über Direktabruf,
responsives Verhalten bleibt unbekannt". Diese Liste landet in `meta.json` neben den Rohdaten
und in `struktur.md` unter „Was nicht erfasst werden konnte". Die nachgelagerte Analyse führt
die betroffenen Eigenschaften als `unbekannt`, sie schätzt sie nicht. Das ist die Anwendung
der Regel gegen erfundene Belege auf die Technik.

### robots.txt

Vor jedem Abruf einer fremden Seite wird die `robots.txt` der Zielseite gelesen und befolgt.
Nach RFC 9309 gilt ein `robots.txt`, das mit einem Serverfehler antwortet, als vollständiges
Verbot. Das ist streng, aber diese Agentur verkauft Rechtssicherheit, und ein verweigerter
Abruf ist ein Befund, kein Schaden.

`--ohne-robots` übergeht die Prüfung und ist nur zulässig, wenn der Seitenbetreiber
zugestimmt hat. Das Übergehen wird als Grenze mitgeschrieben. `relaunch-inventory.mjs` prüft
bewusst nicht, weil es die Seite des Auftraggebers inventarisiert und eine Disallow-Regel für
Suchmaschinen keine Bestandsaufnahme der eigenen Inhalte verbietet.

## Einrichtung

### Selbst gehostet, der bevorzugte Weg

Firecrawl ist quelloffen ([firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)) und
lässt sich lokal betreiben. Dann fallen keine Kosten an, und es verlässt kein Adressmaterial
den eigenen Rechner.

```bash
git clone https://github.com/firecrawl/firecrawl
cd firecrawl && docker compose up -d          # Einrichtung siehe das dortige README
export FIRECRAWL_BASE_URL=http://localhost:3002
node scripts/design-scan.mjs https://referenz-seite.de
```

Der Port und die genauen Schritte stehen im Repository von Firecrawl und ändern sich dort,
nicht hier. Diese Zeilen sind der Weg, nicht die Garantie: **die selbst gehostete Instanz ist
aus diesem Repository heraus noch nicht getestet worden**, siehe die offenen Punkte in der
Repo-`CLAUDE.md`. Beim ersten Einsatz die Ausgabe gegen die Originalseite prüfen.

### Cloud

```bash
export FIRECRAWL_API_KEY=fc-...
node scripts/referenz-crawl.mjs --id ref-01-beispiel-de --screenshot
```

Der Schlüssel kommt von [firecrawl.dev](https://firecrawl.dev), kostenloses Kontingent für
Tests. Kein Schlüssel im Repository, auch nicht in einer `.env`, die versehentlich eingecheckt
wird, siehe die harte Grenze „keine Schlüssel im Repository" in der `SKILL.md` dieses Skills.

Ist `FIRECRAWL_BASE_URL` gesetzt, gewinnt die eigene Instanz, auch wenn zusätzlich ein
Schlüssel gesetzt ist.

### Playwright für Breakpoints

Responsives Verhalten lässt sich aus HTML allein nicht ablesen. Wer es erfassen will, braucht
einen Browser:

```bash
pnpm add -D playwright && pnpm exec playwright install chromium
node scripts/referenz-crawl.mjs --id ref-01-beispiel-de --breakpoints 375,768,1440 --screenshot
```

Playwright liegt ohnehin in jedem Projekt, das `pruefe-breakpoints.mjs` nutzt. Ohne Playwright
und ohne Firecrawl bleibt das responsive Verhalten `unbekannt`, und genau so steht es dann in
der Design DNA.

Ohne jede dieser drei Voraussetzungen funktionieren alle Skripte weiter, nur eingeschränkt.
Das Fehlen ist kein Blocker, im Bericht aber als eingeschränkte Erfassung zu benennen.

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
* **In der kuratierten Recherche**, sobald eine Referenz vorgelegt und freigegeben wurde:
  `referenz-crawl.mjs`, siehe `designrecherche-ablauf.md`. Das ist der Normalfall in einem
  Projekt. `design-scan.mjs` bleibt für den schnellen Einzelblick, etwa wenn im Gespräch eine
  Adresse fällt und die Struktur sofort interessiert.
* **Beides zusammen** bei einem Relaunch mit gleichzeitiger Neuausrichtung: erst
  `relaunch-inventory.mjs` für das, was bleiben muss, dann die Referenzrecherche für die neue
  Richtung.

## Grenzen, die nicht verhandelbar sind

* **Rohmaterial, kein Liefergegenstand.** Alle Ausgaben (`.relaunch-inventory/`,
  `.design-scan/`, `.designrecherche/`) enthalten fremde Texte, Bildadressen und teilweise
  Screenshots der fremden Seite. Sie gehören in die `.gitignore` des Kundenprojekts und nie in
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
* **Ungetestet gegen die echte Firecrawl-API.** Alle drei Werkzeuge sind gegen Direktabruf
  geprüft, `design-scan.mjs` und `relaunch-inventory.mjs` zusätzlich gegen einen lokalen
  Testserver. Weder die Cloud-API noch eine selbst gehostete Instanz noch die Playwright-Stufe
  sind aus diesem Repository heraus getestet, siehe die Offenen Punkte in der
  Repo-`CLAUDE.md`. Beim ersten Einsatz die Ausgabe stichprobenartig gegen die Originalseite
  prüfen.
* **Kein Abruf ohne Freigabe, außer beim Einzelblick.** `referenz-crawl.mjs` verweigert den
  Dienst, wenn der Registereintrag nicht auf `FREIGEGEBEN` steht. Wer stattdessen
  `design-scan.mjs` benutzt, um die Freigabe zu umgehen, hat den Ablauf verlassen und muss das
  im Bericht benennen.

## Verwandte Kapitel

- Bestandsaufnahme vor dem Relaunch: `intake-und-entscheidungen.md`
- Rangfolge der Referenzquellen, was übernommen werden darf:
  `referenzen-und-auswahl.md`
- Referenzrecherche vor dem Tokensystem-Plan:
  `../webdesign-conversion/references/22-premium-designquellen.md`
- Marke und CI aus einer bestehenden Seite auslesen:
  `../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`
- Ablauf mit beiden Freigabetoren: `designrecherche-ablauf.md`
