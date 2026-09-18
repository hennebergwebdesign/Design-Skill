---
name: agentur-website-builder
description: Baut komplette Kundenwebsites mit Astro und Cloudflare Pages nach Agenturstandard von That's it. Marketing, inklusive Designsystem, GSAP Animation, Formularen über Resend, eigenem DSGVO Consent Banner mit echter Skriptblockierung, Google Bewertungen, SEO, Barrierefreiheit und optionalem Leadsystem mit Dashboard. Diesen Skill immer verwenden, sobald es um das Erstellen, Überarbeiten, Relaunchen oder Erweitern einer Website, Landingpage, Leadseite oder Unternehmensseite geht, auch wenn nur Teile davon genannt werden wie "Sektion bauen", "Seite umsetzen", "Design in Code", "Cookie Banner einbauen", "Kontaktformular anbinden", "Website überarbeiten" oder wenn ein Designentwurf, ein Linktree, eine alte Kundenseite oder ein Screenshot zur Umsetzung übergeben wird.
license: Proprietär, That's it. Marketing / VFDESIGN LTD
metadata:
  author: That's it. Marketing / Henneberg Webdesign
  version: 2.0.0
---

# Agentur Website Builder

Dieser Skill setzt Kundenwebsites von That's it. Marketing um. Er läuft **innerhalb eines
bereits bestehenden Repositories**, in dem der Nutzer schon arbeitet. Es wird nie ein neues
Repository angelegt.

## Verhältnis zum Schwesterskill

Dieses Plugin enthält zwei Skills, die zusammengehören:

| Skill | Rolle | Wann er führt |
|---|---|---|
| **`webdesign-conversion`** | das Regelwerk: was gut ist und warum | Wissensfragen, Audit, Strategie, Copy, Recht, Motion, Icons, Tokens |
| **`agentur-website-builder`** (dieser) | der Ablauf: wie die Agentur liefert | sobald tatsächlich gebaut, überarbeitet oder ausgeliefert wird |

Beim Bauen führt dieser Skill, das Regelwerk liefert die Inhalte. Die harten Grenzen aus
`../webdesign-conversion/SKILL.md` gelten unverändert und werden hier nicht wiederholt.
Sie sind Abnahmekriterium, nicht Empfehlung: Kontrast, Tastaturbedienung, Ladezeit, keine
Gedankenstriche im Seitentext, keine Silbentrennung, Heldenbereich auf voller
Bildschirmhöhe, Hover auf Kacheln, eigene Handschrift je Projekt, Markenextraktion vor
Neuentwurf, Referenzrecherche vor dem Tokenplan, Vorrang des Kundendesignsystems vor jeder
Referenz, Sektionshierarchie, keine erfundenen Zahlen, kein Wert ohne Token, echte
Skriptblockierung.

Verweise auf `../webdesign-conversion/...` zeigen in den Schwesterordner desselben Plugins.
Wer nur einen der beiden Ordner in ein Projekt kopiert, verliert diese Verweise. Es werden
immer beide kopiert.

## Grundhaltung

Ziel ist eine Website, die ohne Nacharbeit ausgeliefert werden kann. Diese Punkte sind dabei
wichtiger als Geschwindigkeit:

0. **Der Agenturstandard gilt.** Die Conversionregeln sind verbindlich: sechs Bereiche,
   Strategie vor Design, Aufbau des Heldenbereichs, Rangfolge der Handlungsaufforderungen,
   kurzes Formular, mehrfach platzierte Vertrauenselemente, Ladezeit unter zwei Sekunden.
   Nachzulesen in `../webdesign-conversion/references/06-conversion-architektur.md` und
   `../webdesign-conversion/references/00-fahrplan.md`.
1. **Keine erfundenen Inhalte.** Texte, Zahlen, Referenzen, Versprechen und Rechtsangaben
   kommen vom Kunden oder werden als `[[FEHLT: …]]` markiert. Nie ausdenken.
2. **Kein generisches KI Aussehen.** Typografie, Farben und Rhythmus werden aus dem
   gelieferten Design abgeleitet, nicht aus Gewohnheit gesetzt. Siehe
   `../webdesign-conversion/references/10-visuelle-richtung.md`.
3. **Referenzen liefern Prinzipien, keine Vorlagen.** Aus fremden Seiten wird abgeleitet,
   warum etwas funktioniert. Texte, Markenassets und charakteristische Layoutkombinationen
   werden nie übernommen. Siehe `references/referenzen-und-auswahl.md`. Eine Referenz
   beeinflusst Aufbau und Komposition, nie das Designsystem des Kunden, siehe
   `../webdesign-conversion/references/24-designsystem-vorrang.md`.
4. **Conversion vor Inszenierung.** Die primäre Handlung bleibt jederzeit verständlich und
   erreichbar. Keine Animation verzögert oder verbirgt Inhalte, Navigation, Formulare oder
   Handlungsaufforderungen.
5. **Nichts als fertig melden, was nicht geprüft wurde.** Build, Prüfskripte und
   Formularpfade werden tatsächlich ausgeführt, nicht behauptet.

Rückfragen sind ausdrücklich erwünscht. Es gibt keine Obergrenze. Aber jede Frage muss eine
Entscheidung auslösen, die der Skill nicht selbst treffen kann. Erst alle gelieferten
Materialien lesen, dann fragen, und die Fragen gesammelt stellen statt einzeln nachzuhaken.

## Phasenablauf

### Phase 0: Projektskills installieren

Immer zuerst, im Projektroot:

```bash
bash scripts/install-quellskills.sh
```

Das Skript installiert die Quellskills nach `.claude/skills/`: GSAP, `ui-ux-pro-max`,
`impeccable`, `responsive-craft`, `accessible-animation`, `web-quality-audit` und
`icon-set-generator`. Es überspringt, was bereits vorhanden ist, und installiert nur beim
ersten Mal oder mit `--update` neu. Zwei Dinge sind dabei wichtig:

* Der Ordner wird über `.gitattributes` und eine `.ignore` Datei von Volltextsuchen
  ausgenommen. Die Datendateien von `ui-ux-pro-max` sind mehrere Megabyte groß, und
  Suchtreffer darin landen im Kontext, ohne etwas beizutragen. Bei einer Suche im Projekt
  nie in `.claude/skills/` mitsuchen.
* Auf die Daten wird ausschließlich über das mitgelieferte Suchskript zugegriffen, nie durch
  Einlesen ganzer Dateien.

Wenn das Skript fehlschlägt, dem Nutzer die Fehlermeldung zeigen und ohne die Zusatzskills
weiterarbeiten, nicht blockieren.

Diese Skills werden genutzt, wenn sie zur Aufgabe passen: `ui-ux-pro-max` für Designsystem
und Stilrecherche, ein passender Stil aus `awesome-design-skills` wenn der Nutzer ihn
benennt, `gsap-*` für jede Animationsarbeit.

### Phase 1: Analyse

Bevor irgendetwas gefragt wird:

1. Repository lesen. Gibt es schon eine `astro.config.*`, ein `package.json`, eine
   Lockdatei, ein Designsystem, eine `CLAUDE.md`? Bestehende Strukturen werden respektiert,
   nicht überschrieben. Fehlt eine `astro.config.*` und liegt kein anderer bestehender Stack
   vor, wird ohne Rückfrage ein neues Astro-Projekt mit Cloudflare-Adapter angelegt, siehe
   „Standardstack ohne Rückfrage" in `references/stack-und-deployment.md`. Cloudflare Pages
   Astro ist der Standardfall dieses Skills, keine Option unter mehreren.
2. Alle gelieferten Materialien auswerten: Designentwurf aus Claude Design, Screenshots,
   Linktree, Copydokumente, Logos, Bilder im Repo.
3. Bei einer Überarbeitung die alte Seite abrufen und inventarisieren: Seitenstruktur, URLs,
   Texte, Rechtstexte, Kontaktdaten, Öffnungszeiten, Leistungen, bestehende Rankings. Dafür
   `node scripts/relaunch-inventory.mjs https://alte-seite.de`, siehe
   `references/intake-und-entscheidungen.md`. Marke und CI der Bestandsseite werden dabei
   nach `../webdesign-conversion/references/20-markenextraktion-bestandsseite.md` ausgelesen.
4. Bilder im Repo zählen und den Bedarf schätzen.
5. Seitentyp und Conversionziel bestimmen, dann das passende Playbook lesen:
   `../webdesign-conversion/playbooks/homepage.md`, `landingpage.md` oder
   `recruiting-funnel.md`.

### Phase 2: Rückfragen

Nur das fragen, was sich nicht aus Phase 1 ergibt, gesammelt in einer Nachricht, jeweils mit
einem konkreten Vorschlag, damit der Nutzer nur bestätigen muss. Die vollständige Frageliste
mit Auslösern steht in `references/intake-und-entscheidungen.md`.

Immer explizit klären, sofern nicht eindeutig genannt:

* Homepage oder Leadseite mit Leadsystem und Dashboard
* primäre Conversion
* Tonalität und Ansprache für die Zielgruppe des Kunden
* ob ein vollständiges Design vorliegt, eigene Referenzen genannt werden oder die Richtung
  noch offen ist, siehe `references/referenzen-und-auswahl.md`
* welche Rechtstexte der Kunde liefert
* ob Terminbuchung gebraucht wird

Die Antworten gehen in den Markenbrief des Projekts, nicht in den Chatverlauf. Vorlagen:
`../webdesign-conversion/assets/vorlagen/marke-brief.md` und `marke.json`.

### Phase 3: Umsetzungskonzept zur Freigabe

Immer vor der Implementierung. Kurz, im Chat, kein Dokument im Repo. Struktur:

```
## Referenzen: Conversion, Visuell, optional Motion, je mit Begründung
## Seitenstruktur
## Sektionen pro Seite mit Zweck und CTA
## Designsystem: Farben, Schriftpaarung mit Begründung, Typoskala, Spacing
## Animationen und wo sie sitzen
## Formulare und Datenfluss
## Consent und eingesetzte Dienste
## SEO Struktur: Titel, Description, Keywords je Seite
## Offene Punkte und Platzhalter
```

Vor dem Konzept steht die Referenzrecherche auf mindestens einer Premium-Designquelle, siehe
`../webdesign-conversion/references/22-premium-designquellen.md`. Ein Konzept ohne
angesehene Referenz ist der erste Einfall, nicht der beste.

Die Recherche läuft nach `references/designrecherche-ablauf.md` und hat zwei Freigabetore.
Tor 1 liegt **vor** jedem Abruf einer fremden Seite:

```bash
node scripts/referenz-register.mjs anlegen --name "…" --url https://… --quelle land-book      --fuer hero --grund "…" --extraktion raster,hierarchie
node scripts/referenz-register.mjs vorlegen --alle     # danach warten, nicht crawlen
```

Kandidaten werden vorgelegt und **dann wird gestoppt**. Der Nutzer gibt ganze Websites,
einzelne Sektionen oder einzelne Komponenten frei, lehnt ab oder fordert Alternativen an.
Ohne Freigabe wird nichts abgerufen und nichts abgelegt. Tor 2 entscheidet später, ob ein
Muster dauerhaft ins Skillwissen wandert, siehe dasselbe Kapitel.

Erst nach Freigabe bauen. Wenn der Nutzer ausdrücklich sagt, es soll direkt gebaut werden,
das Konzept trotzdem in Kurzform voranstellen und ohne Wartezeit weiterarbeiten.

### Phase 4: Umsetzung

Reihenfolge, weil sie Nacharbeit spart:

1. Designtokens und Basiskomponenten, siehe
   `../webdesign-conversion/references/10-visuelle-richtung.md` und
   `15-spacing-rhythmus.md`, Ausgangsdatei
   `../webdesign-conversion/assets/vorlagen/tokens.css`
2. Layout, Navigation, Footer, Seitenstruktur nach `references/referenzen-und-auswahl.md`
   und `../webdesign-conversion/references/02-design-ux.md`
3. Sektionen von oben nach unten, mit Hintergrund- und Hierarchieplan nach
   `../webdesign-conversion/references/21-sektionshintergruende-hierarchie.md`. Texte
   nach `references/copy-im-kundenprojekt.md`: Geliefertes wird übernommen, Ergänztes wird
   markiert
4. Formulare und Serverrouten, siehe `references/formulare-und-resend.md`
5. Leadsystem und Dashboard, nur wenn bestätigt, siehe `references/leadsystem-dashboard.md`
6. Consent, Skriptblockierung und Rechtstexte, siehe `references/consent-und-dienste.md`
7. Google Bewertungen, siehe `references/google-bewertungen.md`
8. SEO, Pflichtseiten und Metadaten, siehe
   `../webdesign-conversion/references/05-seo-sichtbarkeit.md` und
   `08-pflichtseiten-technik.md`
9. Eigenes Icon-Set, siehe `../webdesign-conversion/references/17-icons-eigenes-system.md`
10. Animation zuletzt aufsetzen, damit sie auf fertiges Markup trifft, siehe
    `../webdesign-conversion/references/18-motion-handschrift.md` und `09-motion-gsap.md`

### Phase 5: Prüfung

Vollständig in `references/qa-und-abnahme.md`. Nicht optional, nicht abkürzen:

```bash
pnpm build                                              # oder npm run build
pnpm astro check
node scripts/pruefe-striche.mjs
node scripts/pruefe-tokens.mjs
node scripts/pruefe-kontrast.mjs
node scripts/pruefe-platzhalter.mjs --launch
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
```

`pruefe-breakpoints.mjs` prüft acht Größen, meldet horizontales Überlaufen, zu kleine
Klickflächen, Schrift unter 14 Pixel und Bilder ohne Maße. Gefundene Abweichungen direkt
korrigieren und den Check wiederholen, bis er sauber ist. Erst danach berichten.

### Phase 6: Übergabe

Keine `HANDOVER.md`. Stattdessen:

1. `CLAUDE.md` im Projektrepo aktualisieren, siehe unten.
2. Im Chat berichten, im Format aus `references/qa-und-abnahme.md`: was gebaut wurde, welche
   Umgebungsvariablen fehlen, welche Bilder fehlen, welche Rechtsangaben fehlen, welche
   Copyvorschläge mit dem Kunden abzustimmen sind, was tatsächlich geprüft wurde und was
   nicht.
3. Auf `main` committen und pushen, sobald der Nutzer einen Push anfordert.

## Feste Agenturvorgaben

Diese Punkte werden nicht neu verhandelt, auch nicht aus Bequemlichkeit.

| Bereich | Vorgabe |
| --- | --- |
| Framework | Astro, immer |
| Hosting | Cloudflare Pages, mit Buildbefehl und Wrangler Konfiguration im Repo |
| Repository | besteht bereits, Skill legt keines an |
| Branch | immer `main`, keine Featurebranches |
| Runtime | neue Projekte Node 24 LTS und pnpm, bestehende folgen ihrer Lockdatei |
| Styling | zentrale CSS Custom Properties plus komponentennahes Astro CSS, Tailwind nur wenn bereits vorhanden oder ausdrücklich gewünscht |
| Animation | GSAP mit ScrollTrigger, weitere Plugins nur bei Bedarf |
| Mailversand | Resend |
| Spamschutz | Cloudflare Turnstile, zusätzlich Honigtopf, Zeitfeld, Origin-Prüfung, Rate Limit |
| Leadspeicher | Cloudflare D1, Supabase nur wenn der Kunde bereits einen Account hat |
| Consent | Eigenbau, fünf Kategorien, echte Skriptblockierung, nie ein Keks als Symbol |
| Bewertungen | Google Places API serverseitig mit KV Cache, in jedem Projekt |
| Referenzen | erst vorlegen, dann freigeben, dann erfassen. Kein Abruf einer fremden Seite ohne Freigabe |
| Schriften | immer selbst hosten, nie über ein fremdes CDN |
| Barrierefreiheit | WCAG 2.2 AA als Ziel |

Ein React- oder Next-Projekt ist kein Agenturprojekt nach diesem Skill. Kommt der Kunde mit
einem bestehenden React-Stack, gilt weiter das Regelwerk aus `webdesign-conversion`, und
`../webdesign-conversion/references/11-komponenten-shadcn.md` übernimmt die
Komponentenregeln. Der Phasenablauf hier bleibt trotzdem gültig.

Details zu Stack, Buildbefehl, Umgebungsvariablen und Cloudflare Einrichtung stehen in
`references/stack-und-deployment.md`.

## Pflege der CLAUDE.md

Die `CLAUDE.md` im Projektrepo ist der laufende Projektstand, nicht ein Abschlussbericht.
Sie wird bei jeder inhaltlichen Änderung nachgezogen, nicht nur am Projektende. Die
bewährte Gliederung steht in
`../webdesign-conversion/references/14-projektstruktur-astro.md`. Mindestens diese
Abschnitte:

```
# Projektname
## Kunde und Ziel
## Stack und Befehle
## Deployment und Bindings
## Seitenstruktur
## Designsystem: Tokens, Schriften, Typoskala
## Komponenten und wo sie liegen
## Formulare und Datenfluss
## Umgebungsvariablen mit Zweck, ohne Werte
## Consent und eingesetzte Dienste
## Offene Punkte
## Änderungsverlauf mit Datum
```

Nie echte Werte von Schlüsseln oder Zugangsdaten hineinschreiben, nur die Namen der
Variablen. Jede ungewöhnliche Entscheidung bekommt ihren Grund direkt daneben, sonst dreht
die nächste Sitzung sie zurück.

## Referenzen

Nur lesen, was gebraucht wird. Die linke Spalte liegt in diesem Skill, die rechte im
Schwesterskill.

| Datei | Wann lesen |
| --- | --- |
| `references/intake-und-entscheidungen.md` | Phase 1 und 2, immer |
| `references/stack-und-deployment.md` | Projektaufbau, Build, Cloudflare, Umgebungsvariablen |
| `references/referenzen-und-auswahl.md` | Phase 3, vor jedem Konzept, immer |
| `references/copy-im-kundenprojekt.md` | sobald Texte eingesetzt oder ergänzt werden |
| `references/formulare-und-resend.md` | jedes Formular |
| `references/leadsystem-dashboard.md` | nur bei Leadseiten mit Dashboard |
| `references/consent-und-dienste.md` | jedes Projekt |
| `references/google-bewertungen.md` | jedes Projekt |
| `references/qa-und-abnahme.md` | Phase 5 und 6, immer |
| `references/firecrawl-recherche.md` | eine bekannte, alte oder fremde Seite crawlen oder scrapen, für Relaunch-Inventar oder Design-Referenz |
| `references/designrecherche-ablauf.md` | Phase 3, sobald Referenzen gesucht, vorgelegt oder freigegeben werden |
| `references/referenzquellen-konfiguration.md` | eine Referenzquelle ergänzen, stilllegen oder ihr Suchmuster prüfen |
| `references/designrecherche-beispiele.md` | beim ersten Durchlauf der Recherche, und bei jeder Störungsmeldung |

| Datei im Schwesterskill | Wann lesen |
| --- | --- |
| `../webdesign-conversion/SKILL.md` | immer, die harten Grenzen |
| `../webdesign-conversion/playbooks/*.md` | Phase 1, je nach Seitentyp |
| `../webdesign-conversion/references/10-visuelle-richtung.md` | vor der ersten Zeile UI Code |
| `../webdesign-conversion/references/24-designsystem-vorrang.md` | sobald ein Designsystem, Branding oder eine Referenz im Spiel ist |
| `../webdesign-conversion/references/12-copywriting.md` | sobald Texte eingesetzt werden |
| `../webdesign-conversion/references/07-recht-dsgvo.md` | Rechtstexte und Consentpflichten |
| `../webdesign-conversion/references/04-barrierefreiheit-bfsg.md` | vor der Abnahme |
| `../webdesign-conversion/references/05-seo-sichtbarkeit.md` | Metadaten und Relaunch |
| `../webdesign-conversion/references/14-projektstruktur-astro.md` | Dateistruktur und Fallstricke |

`assets/` enthält geprüfte Vorlagen für Consent, Formularroute, Mailtemplate und
Bewertungsabruf. Diese kopieren und an das Projekt anpassen, statt jedes Mal neu zu
schreiben. Rechtstexte, Tokens, Meta-Head, JSON-LD, 404 und Security-Header liegen in
`../webdesign-conversion/assets/vorlagen/`.

`scripts/` im Repowurzelverzeichnis enthält die fünf Prüfskripte sowie drei
Agenturwerkzeuge, die nie Teil der ausgelieferten Seite werden und nie in das `package.json`
des Kundenprojekts wandern:

* `relaunch-inventory.mjs` inventarisiert eine alte Kundenseite und legt Seitenliste,
  Texte, Rechtstext-Kandidaten und Weiterleitungsentwurf in `.relaunch-inventory/` ab, siehe
  `references/intake-und-entscheidungen.md`.
* `design-scan.mjs` erfasst eine fremde, bekannte oder vom Kunden genannte Referenzseite und
  legt Sektionsreihenfolge, Bildbelegung sowie Farb- und Schriftkandidaten in
  `.design-scan/<host>/` ab, siehe `references/firecrawl-recherche.md`.
* `deslop-check.mjs` prüft selbst formulierte Copy-Vorschläge auf generischen KI-Klang,
  siehe `references/qa-und-abnahme.md`.
* `referenz-register.mjs` führt den Freigabezustand jeder Designreferenz und ist die einzige
  Stelle, die ihn ändert. Ohne Freigabe kein Abruf, siehe `references/designrecherche-ablauf.md`.
* `referenz-crawl.mjs` erfasst eine freigegebene Referenz und bricht mit Exit 2 ab, wenn sie
  es nicht ist. Optional mit Breakpoints und Screenshot über Playwright.
* `lib/abruf.mjs` ist die gemeinsame Abrufschicht aller drei Erfassungswerkzeuge, mit vier
  Rückfallstufen und robots.txt-Prüfung, siehe `references/firecrawl-recherche.md`.
* `design-dna.mjs`, `muster-vergleich.mjs` und `muster-paket.mjs` führen von den Rohdaten über
  die Ähnlichkeitsprüfung bis zu Tor 2. Keines von ihnen schreibt in die Musterbibliothek des
  Skills, siehe `references/designrecherche-ablauf.md`.
* `pruefe-muster.mjs` prüft die Musterbibliothek und erzeugt ihren Index.

Alle Erfassungswerkzeuge laufen mit reinem `fetch()` ohne Abhängigkeit, optional über eine
selbst gehostete Firecrawl-Instanz (`FIRECRAWL_BASE_URL`), die Firecrawl-Cloud
(`FIRECRAWL_API_KEY`) oder ein im Projekt installiertes Playwright, siehe
`references/firecrawl-recherche.md`.

## Definition of Done

Erst wenn alle Punkte erfüllt sind, darf von einer fertigen Seite gesprochen werden:

* alle vereinbarten Seiten und Sektionen vorhanden, keine vergessenen Platzhaltertexte
* jeder selbst formulierte Copy-Vorschlag mit `scripts/deslop-check.mjs` auf 5 von 5 geprüft
* Build läuft ohne Fehler, `astro check` ohne Befund
* alle fünf Prüfskripte ohne Fehler
* Tastaturbedienung durch alle interaktiven Elemente, sichtbarer Fokus
* Formular getestet: Erfolg, Validierungsfehler, Serverfehler, Turnstile
* Bestätigungsmail und interne Benachrichtigung im Branding des Kunden
* Consent blockiert Skripte tatsächlich vor der Einwilligung, Auswahl über den Footer
  änderbar
* Bewertungsabruf liefert Daten oder sauberen Fallback
* Metadaten, Open Graph, Sitemap, robots.txt, 404 Seite vorhanden
* bei Relaunch: Weiterleitungen der alten URLs gesetzt und stichprobenartig geprüft
* Schriften selbst gehostet, Bilder optimiert und mit Alternativtext
* keine Schlüssel im Repository
* `CLAUDE.md` aktuell
* offene Punkte, fehlende Bilder, fehlende Rechtsangaben und Copyvorschläge im Chat benannt
* jede genutzte Designreferenz steht mit Freigabe und Entscheidung im Register, keine wurde
  ohne Freigabe erfasst, und `.designrecherche/` ist in der `.gitignore` des Kundenprojekts
