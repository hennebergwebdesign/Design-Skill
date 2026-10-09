# Brand Extraktion: Marke der Bestandsseite messen

Bei jedem Relaunch und jeder Brandingübernahme per URL wird das Branding der bestehenden
Kundenseite gemessen statt geschätzt: Farben, Schriften samt Dateien, Typoskala für Desktop
und Mobil, Buttons mit Hoverzustand, Eingabefelder, Radien, Schatten, Containerbreite, Logo,
Favicon. Das Werkzeug ist `scripts/brand-extraktion.mjs`. Was mit dem Ergebnis geschehen
darf und was nicht, regelt
`../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`; dieses Kapitel
beschreibt nur den Ablauf im Agenturprojekt.

Herkunft: der eigenständige Skill `brand-extraktion` von That's it. Marketing, Skript
`brand-extract.mjs` 1.0. Die Messung im Browser ist unverändert übernommen. Angepasst sind
Tokennamen und Untergrenzen (Vorlage `../webdesign-conversion/assets/vorlagen/tokens.css`),
der Start von Playwright (`scripts/lib/browser.mjs`) und die Firecrawl-Zweitmeinung
(`scripts/lib/abruf.mjs`). Das Auspacken des Skripts aus der SKILL.md mit Prüfsumme entfällt,
weil das Skript jetzt im Plugin liegt.

## Inhalt

- Wann
- Abgrenzung zu den anderen Erfassungswerkzeugen
- Einrichten, einmal pro Rechner
- Ausführen
- Was entsteht
- Auswerten, Pflicht
- Übernahme ins Projekt
- Pitch für Leads
- Grenzen
- Verwandte Kapitel

## Wann

| Lage | Einsatz |
|---|---|
| Relaunch, alte URL bekannt | Phase 1, direkt nach `relaunch-inventory.mjs` |
| „Übernimm das Branding von kunde.de", „welche Farben und Schriften nutzt die Seite", „Logo von der alten Seite holen" | sofort, vor jeder Tokenentscheidung |
| Pitch für einen Lead: Entwurf im Look seiner bestehenden Seite | auf der Seite des Leads, Ergebnis als Pitch markieren |
| Vollständiger Entwurf aus Claude Design liegt vor | nur noch für Logo, Favicon und die CI-Schriften, der Entwurf gilt |
| Wettbewerber, Inspirationsseite, Referenz aus der Recherche | **nie**, dafür `design-scan.mjs` oder die Designrecherche mit Freigabe |

Grund für die letzte Zeile: das Skript legt Logo, Schriftdateien und exakte Farbwerte ab. Von
einer fremden Marke wird genau das nie übernommen, siehe „Rechtlich" in Kapitel 20 und
„Referenzen liefern Prinzipien, keine Vorlagen" in `../SKILL.md`.

## Abgrenzung zu den anderen Erfassungswerkzeugen

| Werkzeug | Seite | Liefert |
|---|---|---|
| `relaunch-inventory.mjs` | eigene alte Seite | Inhalte: URLs, Texte, Rechtstexte, Weiterleitungen |
| `brand-extraktion.mjs` | eigene alte Seite | Marke: gemessene Farben, Schriften, Formen, Logo |
| `design-scan.mjs` | fremde Seite | Struktur: Sektionsfolge, Wortzahl, Bildbelegung |

Texte und Bilder der alten Seite laufen über das Relaunch-Inventar, nicht über dieses
Werkzeug.

## Einrichten, einmal pro Rechner

Playwright mit Chromium, global, damit es nie im `package.json` des Kundenprojekts landet:

```bash
npm i -g playwright && npx playwright install chromium
```

Ein Playwright, das das Projekt ohnehin für `pruefe-breakpoints.mjs` hat, wird ebenso
gefunden. Die Suche und der Rückfall auf einen vorhandenen Chromium-Build stehen in
`scripts/lib/browser.mjs`. In einer Cloud-Sitzung mit eingeschränktem Netz sind die meisten
Kundenseiten nicht erreichbar; dann lokal laufen lassen.

## Ausführen

Im Projektroot des Kundenrepos, vorher `.brand-extraktion/` in die `.gitignore`:

```bash
node scripts/brand-extraktion.mjs https://kunde.de / /leistungen /kontakt
```

| Option | Wirkung |
|---|---|
| Pfade | höchstens vier: Startseite, eine typische Inhaltsseite, die Kontaktseite für Formularstile. 404 wird übersprungen und gemeldet |
| `--aus ordner` | anderer Ausgabeordner, Standard `.brand-extraktion` |
| `--firecrawl` | zusätzlich das Firecrawl-Format `branding` als Zweitmeinung, selbst gehostet (`FIRECRAWL_BASE_URL`) vor Cloud (`FIRECRAWL_API_KEY`). Nur bei gemeldetem Bot-Schutz oder blockiertem CSS, die Cloud kostet Kontingent |

Pro Pfad etwa 20 bis 40 Sekunden. Exit 0 erfasst, 1 keine Seite ladbar, 2 Aufrufproblem oder
kein Browser.

## Was entsteht

| Datei | Inhalt |
|---|---|
| `BRAND.md` | Bericht: Warnungen zuerst, Farbrollen mit Herleitung, Kontraste nach WCAG, alle Farben nach Anteil, CSS-Farbvariablen (etwa Elementor oder WordPress), Schriften mit Quelle und Lizenzhinweis, Typografie Desktop und Mobil, Buttons mit Hover, Eingabefelder, Radien, Schatten, Containerbreite, Übergänge, Logo |
| `tokens-vorschlag.css` | Tokens mit den Namen aus `tokens.css` der Vorlage. Nicht Abgeleitetes steht als Kommentar da: der Wert der Vorlage bleibt |
| `brand.json` | alle Rohdaten |
| `screenshots/` | je Pfad `__held.png` (erster Bildschirm), `__desktop.png` und `__mobil.png` (ganze Seite) |
| `assets/` | `logo.*` plus bis zu zwei Kandidaten, Favicons, OG-Bild |
| `fonts/` | die tatsächlich geladenen Schriftdateien, benannt nach Familie, Gewicht und Stil |

Zwei Anpassungen an die Vorlage nimmt der Tokenvorschlag selbst vor, beide mit Kommentar:

| Anpassung | Grund |
|---|---|
| Die Markenfarbe wird `--farbe-marke-500`, eine Stufe mit mindestens 4,5:1 auf der Fläche wird `--farbe-marke-750`, nötigenfalls abgedunkelt | Kapitel 20: eine Markenfarbe unter 4,5:1 bleibt Flächenfarbe. Die Vorlage führt Text in Markenfarbe nur über diese Stufe |
| Gemessene Schriftgrößen unter 14 px werden auf 14 px angehoben | kleinste erlaubte Stufe der Vorlage, `pruefe-breakpoints.mjs` meldet alles darunter |

## Auswerten, Pflicht

Die Farbrollen sind Heuristik. Sie werden nie ungeprüft übernommen.

1. `BRAND.md` vollständig lesen, die Warnungen zuerst. Meldet das Skript eine ungestylte
   Seite, Bot-Schutz oder viele nicht geladene Stylesheets, sind die Werte unbrauchbar. Dann
   mit `--firecrawl` erneut versuchen oder Screenshots beim Kunden anfordern.
2. `screenshots/*__held.png` ansehen und jede Farbrolle gegen das Bild prüfen. Typische
   Fehler: Markenfarbe und Farbe des Hauptbuttons vertauscht, eine Pastellfläche als
   Markenfarbe erkannt, Fläche oder Text aus einem dunklen Heldenbereich. Jede Korrektur im
   Konzept mit einem Satz begründen.
3. Gibt es Farbvariablen wie `--e-global-color-primary` oder
   `--wp--preset--color--primary`, sind sie meist die verlässlichste Quelle: so hat der Kunde
   oder die alte Agentur die CI hinterlegt. Das Skript bevorzugt sie bereits.
4. Logo prüfen: `assets/logo.*` ansehen, ein SVG kurz im Browser rendern. Ist es falsch, die
   Kandidaten 2 und 3 prüfen. Bei einem Rasterlogo oder einem SVG mit echtem Text die
   Originaldatei beim Kunden anfragen und als offenen Punkt führen.
5. Lizenz jeder Schrift klären, nach dem Lizenzhinweis im Bericht und der Lizenzpflicht in
   `../webdesign-conversion/references/10-visuelle-richtung.md`:

   | Quelle laut Bericht | Vorgehen |
   |---|---|
   | Google Fonts | frei, WOFF2 aus `fonts/` nehmen oder frisch laden, selbst hosten |
   | Adobe Fonts | an das Adobe-Abo gebunden, selbst hosten nicht erlaubt: beim Kunden nachfragen oder begründete Alternative vorschlagen |
   | selbst gehostet, nicht bei Google Fonts, oder Monotype und ähnliche | kommerziell: Webfont-Lizenz beim Kunden anfragen, bis dahin offener Punkt |
   | Icon Font | nie als Textschrift übernehmen |

6. Kontraste: Paare ohne AA werden nicht eins zu eins übernommen, siehe Kapitel 20. Im
   Relaunch den Farbton anpassen, meist dunkler, und die Abweichung im Konzept nennen.

## Übernahme ins Projekt

1. Die gemessenen Zeilen aus `tokens-vorschlag.css` in die `tokens.css` des Projekts
   übertragen, Kommentarzeilen bedeuten: Wert der Vorlage behalten. Die Markenrampe
   `--farbe-marke-50` bis `-700` aus der neuen `--farbe-marke-500` neu bilden, wie im
   Kommentar der Vorlage beschrieben.
2. Die gemessene Typoskala ist die der alten Seite. Die Regeln des Regelwerks gelten trotzdem:
   genau eine h1, alle Größen aus der Skala. Ist die alte Skala schwach, etwa eine h2 kaum
   größer als der Fließtext, verbessern und begründen.
3. Freie Schriften als WOFF2 nach `public/fonts/`, nur die genutzten Schnitte,
   `@font-face` mit `font-display: swap`.
4. Logo nach `public/images/`, Favicon nach `public/`.
5. Ergebnis in `marke-brief.md` Abschnitt 7 und `marke.json` unter
   `herkunft.bestehende_marke` eintragen: Quelle mit Datum, je Feld übernommen oder bewusst
   geändert, mit Grund. Damit steht die Marke auf Stufe 2 der Rangfolge in
   `../webdesign-conversion/references/24-designsystem-vorrang.md`.
6. Im Umsetzungskonzept (Phase 3) im Abschnitt Designsystem je Token kennzeichnen: aus der
   Bestandsseite übernommen oder bewusst geändert. In der Projekt-`CLAUDE.md` im Abschnitt
   Designsystem die Quelle nennen: Brand Extraktion von der URL mit Datum.

## Pitch für Leads

Für einen Entwurf im Look eines Leads das Skript auf dessen eigener Seite laufen lassen und
die Tokens für den Entwurf nutzen. Das Ergebnis intern als Pitch markieren und nicht als
fertiges Design ausgeben. Logo und Schriftdateien des Leads bleiben im Pitch, bis er Kunde
ist und die Rechte geklärt sind.

## Grenzen

| Grenze | Folge |
|---|---|
| Bot-Schutz wie die Cloudflare Challenge, Seiten hinter einem Login | `--firecrawl` versuchen oder Screenshots vom Kunden anfordern |
| Inhalte, die erst per Animation erscheinen | das Skript scrollt einmal durch. Wirken die Screenshots leer, erneut laufen lassen und nur die Typografie nutzen |
| Dark Mode oder mehrere Themes | gemessen wird das Theme eines Browsers mit Standardeinstellungen |
| Cookie-Banner | wird weggeklickt und bei der Farbanalyse ignoriert. Taucht es trotzdem im Screenshot auf, stammen einzelne Farben eventuell daraus |
| Firecrawl selbst gehostet | ob die Instanz das Format `branding` kennt, hängt von ihrer Version ab; kennt sie es nicht, steht das als Warnung im Bericht |

## Verwandte Kapitel

* `../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`: was ausgelesen
  wird, wohin es geht, Rechtliches
* `../webdesign-conversion/references/27-redesign-bestand.md`: weiterentwickeln, neu
  gestalten oder Neuanfang
* `intake-und-entscheidungen.md`: Relaunch-Inventar in Phase 1
* `firecrawl-recherche.md`: die übrigen Erfassungswerkzeuge und die Abrufschicht
