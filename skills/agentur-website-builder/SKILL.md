---
name: agentur-website-builder
description: Baut komplette Kundenwebsites mit Astro und Cloudflare Pages nach Agenturstandard von That's it. Marketing, inklusive Designsystem, GSAP Animation, Formularen über Resend, eigenem DSGVO Consent Banner mit echter Skriptblockierung, Google Bewertungen, SEO, Barrierefreiheit und optionalem Leadsystem mit Dashboard. Diesen Skill immer verwenden, sobald es um das Erstellen, Überarbeiten, Relaunchen oder Erweitern einer Website, Landingpage, Leadseite oder Unternehmensseite geht, auch wenn nur Teile davon genannt werden wie "Sektion bauen", "Seite umsetzen", "Design in Code", "Cookie Banner einbauen", "Kontaktformular anbinden", "Website überarbeiten" oder wenn ein Designentwurf, ein Linktree, eine alte Kundenseite oder ein Screenshot zur Umsetzung übergeben wird. Auch wenn Farben, Schriften oder Logo einer bestehenden Kundenseite per URL ausgelesen oder übernommen werden sollen.
license: Proprietär, That's it. Marketing / VFDESIGN LTD
metadata:
  author: That's it. Marketing / Henneberg Webdesign
  version: 2.23.0
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
6. **Arbeitsweise:** Annahmen aussprechen, Widersprüche melden statt raten, in dünnen Scheiben
   bauen, Frameworkcode nach Quelle, Sachentscheidungen mit Zweifel-Durchgang prüfen:
   `references/arbeitsdisziplin.md`. Sicherheit und Zahlung gehören in jedes Konzept:
   `references/sicherheitspruefung.md`, bei Geld `references/zahlungen-umsetzung.md`.

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

**Schutz vor zerstörerischen Befehlen.** Bevor der Agent in einem Projekt mit Zugriff auf
Kundenordner, Deploy-Skripte oder Cloudflare-Zugänge arbeitet:

* Löschen und Überschreiben (`rm -rf`, `git reset --hard`, `git clean`, Force-Push, `wrangler delete`)
  nur nach ausdrücklicher Freigabe. Besser als eine Bitte im Prompt ist ein **deterministischer
  Hook**, der solche Befehle blockiert, ohne dass der Agent darüber entscheidet (Konfiguration über den
  Skill `update-config`). Ein Hook kostet keine Tokens und gilt unabhängig davon, was der Agent
  gerade „denkt".
* Vor jedem großen Lauf (Relaunch, Umbau vieler Dateien, Polierschleife) ein Git-Commit, bei
  Kundendaten außerhalb von Git ein Backup.
* Modus ohne Rückfragen („Berechtigungen umgehen") nur in einer isolierten Umgebung, nie mit Kundenzugängen.
  Einen fremden Skill oder ein Plugin vor der Installation lesen, auch seine Skripte: sie laufen mit
  denselben Rechten wie der Agent.
* Der Anlass im Video (ein Entwickler berichtete, ein Modell habe beinahe seine Mac-Dateien gelöscht)
  ist ein Einzelbericht des Videos, hier nicht geprüft. Das Restrisiko besteht bei jedem Modell
  unabhängig davon.

### Phase 1: Analyse

Bevor irgendetwas gefragt wird:

1. Repository lesen. Gibt es schon eine `astro.config.*`, ein `package.json`, eine
   Lockdatei, ein Designsystem, eine `CLAUDE.md`? Bestehende Strukturen werden respektiert,
   nicht überschrieben. Fehlt eine `astro.config.*` und liegt kein anderer bestehender Stack
   vor, wird ohne Rückfrage ein neues Astro-Projekt mit Cloudflare-Adapter angelegt, siehe
   „Standardstack ohne Rückfrage" in `references/stack-und-deployment.md`. Cloudflare Pages
   Astro ist der Standardfall dieses Skills, keine Option unter mehreren.
2. Alle gelieferten Materialien auswerten: Designentwurf aus Claude Design, Screenshots,
   Linktree, Copydokumente, Logos, Bilder im Repo. Figma-Link: `references/figma-zu-code.md`,
   erst die Stufe nach `../webdesign-conversion/references/24-designsystem-vorrang.md`
   bestimmen, dann Variablen mit `tokens.css` abgleichen. Designsystem in Claude Design: über
   die Synchronisation holen und nach Herkunft einstufen, siehe „Ein Designsystem aus Claude
   Design" in derselben Datei.
3. Bei einer Überarbeitung die alte Seite abrufen und inventarisieren: Seitenstruktur, URLs,
   Texte, Rechtstexte, Kontaktdaten, Öffnungszeiten, Leistungen, bestehende Rankings. Dafür
   `node scripts/relaunch-inventory.mjs https://alte-seite.de`, siehe
   `references/intake-und-entscheidungen.md`. Marke und CI der Bestandsseite werden danach
   gemessen, nicht geschätzt:
   `node scripts/brand-extraktion.mjs https://alte-seite.de / /kontakt`,
   Auswertung und Übernahme in `references/brand-extraktion.md`, Regeln in
   `../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`. Nur auf der
   eigenen Seite des Kunden oder Leads, nie auf einer fremden.
   Welcher Modus gilt (weiterentwickeln, neu gestalten, Neuanfang) und was sich dabei nie
   still ändert, steht in `../webdesign-conversion/references/27-redesign-bestand.md`.
4. Bilder im Repo zählen und den Bedarf schätzen.
5. Seitentyp und Conversionziel bestimmen, dann das passende Playbook lesen:
   `../webdesign-conversion/playbooks/homepage.md`, `landingpage.md` oder
   `recruiting-funnel.md`. Bei einer Landingpage zusätzlich die Hürde der Handlung festlegen
   (niedrige Hürde, hohe Hürde, Kauf mit Vorwissen), sie bestimmt Länge und Sektionsfolge, siehe
   `../webdesign-conversion/references/45-huerde-laenge-und-leserfuehrung.md`.

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
* wer beim Kunden freigibt (genau eine Person) und wer Rückmeldung gibt, siehe
  `references/kundenabstimmung.md`

Die Antworten gehen in den Markenbrief des Projekts, nicht in den Chatverlauf. Vorlagen:
`../webdesign-conversion/assets/vorlagen/marke-brief.md` und `marke.json`.

### Phase 3: Umsetzungskonzept zur Freigabe

Immer vor der Implementierung. Kurz, im Chat, kein Dokument im Repo. Struktur:

```
## Ziel, Belege, Erkenntnis in je einem Satz
## Lesart in einem Satz, Regler für Varianz, Bewegung, Dichte
## Referenzen: Conversion, Visuell, optional Motion, je mit Begründung
## Seitenstruktur
## Sektionen pro Seite mit Zweck und CTA
## Designsystem: Farben, Schriftpaarung mit Begründung, Typoskala, Spacing
## Animationen und wo sie sitzen, bei Marke oder Kampagne drei Erlebnisideen zur Wahl
## Formulare und Datenfluss
## Consent und eingesetzte Dienste
## SEO Struktur: Titel, Description, Keywords je Seite
## Zielkonflikte mit Rangfolge, offene Entscheidungen als [[FEHLT: …]]
## Offene Punkte und Platzhalter
```

Lesart und Regler kommen aus
`../webdesign-conversion/references/26-geschmack-und-ki-tells.md` und gehen danach in
`marke.json` unter `gestaltung`. Soll die Richtung vor dem Code als Bild abgestimmt werden,
gilt `../webdesign-conversion/references/28-ki-bildentwuerfe.md`: ein Bild je Sektion, die
Sperren aus `marke.json` im Auftrag, kein Text aus dem Bild auf die Seite.

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

Moodboard intern, Stylescape zur Abnahme der Richtung, siehe `references/moodboard-und-stylescape.md`.
Werden mehrere Richtungen gezeigt, dann als Varianten mit Preiszeile, die Wahl in `marke.json`, siehe
`../webdesign-conversion/references/48-richtung-varianten-und-subtraktion.md`.
Soll die Seite ein Erlebnis sein (Marke, Launch, Kampagne), stehen im Konzept drei Erlebnisideen mit
Scrollablauf, Technik, Aufwand und Risiko, siehe
`../webdesign-conversion/references/38-scrollvideo-und-einbettungen.md`, Abschnitt 1a. Bei Handwerk,
Praxis und lokaler Dienstleistung ist der Ausgangspunkt dezente Bewegung ohne 3D.
Die Rangfolge bei Zielkonflikten steht im Konzept und in der `CLAUDE.md`, siehe
`../webdesign-conversion/references/01-strategie-positionierung.md`, Schritt 1.4.

Das Konzept wird mit Begründung zuerst und Spielregeln für die Rückmeldung vorgelegt, Ablauf in
`references/kundenabstimmung.md`.

Vor der Freigabe das Konzept mit den Gegenfragen aus `references/design-review.md`
Abschnitt 8 prüfen: gesammelt in einer Nachricht je Runde, jede mit Empfehlung.

Erst nach Freigabe bauen. Wenn der Nutzer ausdrücklich sagt, es soll direkt gebaut werden,
das Konzept trotzdem in Kurzform voranstellen und ohne Wartezeit weiterarbeiten.

### Phase 4: Umsetzung

Reihenfolge, weil sie Nacharbeit spart:

1. Designtokens und Basiskomponenten, siehe
   `../webdesign-conversion/references/10-visuelle-richtung.md` und
   `15-spacing-rhythmus.md`, Ausgangsdatei
   `../webdesign-conversion/assets/vorlagen/tokens.css`
   Typoskala mit `node scripts/typoskala.mjs` rechnen, Ersatzschrift je Familie mit
   `node scripts/schrift-metriken.mjs` messen, beides nach
   `../webdesign-conversion/references/55-typografie-system.md`
2. Layout, Navigation, Footer, Seitenstruktur nach `references/referenzen-und-auswahl.md`
   und `../webdesign-conversion/references/02-design-ux.md`
3. Sektionen von oben nach unten, mit Hintergrund- und Hierarchieplan nach
   `../webdesign-conversion/references/21-sektionshintergruende-hierarchie.md` und den
   Held- und Sektionsregeln aus
   `../webdesign-conversion/references/26-geschmack-und-ki-tells.md`. Texte
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
    `../webdesign-conversion/references/18-motion-handschrift.md` und `09-motion-gsap.md`.
    Bei Scroll-Animationen zuerst ein Storyboard aus statischen Frames
    (`../webdesign-conversion/references/38-scrollvideo-und-einbettungen.md`, Abschnitt 2a)

**Checkliste bei langen Builds.** Bei mehr als einer Seite oder acht Sektionen führt der Agent eine
Checkliste im Projekt (Sektionen je Seite, fünf Breakpoints, Metadaten, JSON-LD, Formulare, Consent,
Pflichtseiten) und prüft sie am Ende jedes Arbeitsschritts. Grund: Ein Zwischenstand gilt sonst
fälschlich als Abschluss. Geliefert ist, was in der Definition of Done steht, nicht, was sich fertig anfühlt.

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
node scripts/pruefe-geschmack.mjs
node scripts/pruefe-typografie.mjs
node scripts/pruefe-sicherheit.mjs                         # vor und nach dem Build
node scripts/pruefe-scrollstrecke.mjs http://localhost:4321   # nur Seiten mit Scroll-Bewegung
```

Die Strichregel läuft zusätzlich als Hook nach jedem Schreiben (`node scripts/pruefe-striche.mjs --hook`),
Einrichtung in `references/qa-und-abnahme.md`, Abschnitt 2a.

`pruefe-geschmack.mjs` läuft nach dem Build gegen `dist/` und meldet Kicker über der Quote,
ein zweites Laufband, mehrere Texte für dieselbe Kontaktabsicht und die messbaren KI-Tells.
`pruefe-platzhalter.mjs` findet zusätzlich ausgelassenen Code (`// ...`, „Rest wie oben"):
eine Auslassung ist kein offener Wert, sondern Arbeit, die als erledigt gemeldet wurde.

`pruefe-typografie.mjs` prüft, dass Schrift in rem steht, beim Zoomen mitwächst, nie unter
14 px fällt und selbst gehostet mit Ersatzschrift lädt.

`pruefe-breakpoints.mjs` prüft acht Größen, meldet horizontales Überlaufen, zu kleine
Klickflächen, Schrift unter 14 Pixel und Bilder ohne Maße. Gefundene Abweichungen direkt
korrigieren und den Check wiederholen, bis er sauber ist.

Danach die Belastungsprobe mit Extremdaten und das Design-Review nach
`references/qa-und-abnahme.md` und `references/design-review.md`: Aufnahmen auf festen
Breiten, Befundliste nach Schwere, ein Befund ein Commit, Vorher-nachher-Paare. Für
Barrierefreiheit gibt `../webdesign-conversion/assets/checklisten/wcag22-audit.md` den
Durchgang je Erfolgskriterium vor, für Bewegung
`../webdesign-conversion/references/30-motion-pruefung.md`. Erst danach berichten.

Das gilt für Fehler. Für die Geschmacksfrage danach (Kritik, Feinschliff, mutiger/ruhiger)
gibt es eine Obergrenze statt einer endlosen Schleife, siehe
`../webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`.

Jede Änderung an einer gebauten Seite, ob aus Prüfung, Feinschliff oder Rückmeldung des Kunden,
läuft nach `references/aenderungsrunden-und-layoutschutz.md`: gebündelt, mit benannter Sektion und
dem, was bleibt, danach Prüfung auf drei Breiten und der Nachbarsektionen. Text und
Leistungsoptimierung bekommen je eine eigene Sitzung.

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
| Animation | GSAP mit ScrollTrigger, weitere Plugins nur bei Bedarf. Three.js nur mit freigegebener Erlebnisidee, spät geladen, siehe `../webdesign-conversion/references/38-scrollvideo-und-einbettungen.md`, Abschnitt 5a |
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
## Änderungsregeln (Block aus references/aenderungsrunden-und-layoutschutz.md)
## Textbeispiele: freigegebene Vorher-Nachher-Paare (references/copy-im-kundenprojekt.md)
## Offene Punkte
## Änderungsverlauf mit Datum
```

Nie echte Werte von Schlüsseln oder Zugangsdaten hineinschreiben, nur die Namen der
Variablen. Jede ungewöhnliche Entscheidung bekommt ihren Grund direkt daneben, sonst dreht
die nächste Sitzung sie zurück.

Zwei Sätze gehören in jede lange Projektsitzung: frühere Antworten gelten als erledigt, außer es wird danach
gefragt, und bei langen Aufgaben wird die Checkliste am Ende jedes Schrittes geprüft. Grund: Kurze Folgefragen
lösen so keine langen Rückblicke aus. Wirkung ungemessen (Quelle: Jay E, RoboNuggets, 24.09.2026).

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
| `references/chatbot-auf-der-website.md` | nur wenn ein KI Chatbot auf die Seite soll: Leitplanken, Wissensbasis, Gegenprobe, Datenschutz |
| `references/moodboard-und-stylescape.md` | Phase 2 und 3, vor dem Bau: Moodboard intern, Stylescape zur Abnahme der Richtung |
| `references/kundenabstimmung.md` | Phase 2, 3 und 6: Rollen beim Kunden, Präsentation, Rückmeldungen einsortieren |
| `references/agenturwerkzeuge.md` | wenn unklar ist, welches Skript aus `scripts/` für eine Aufgabe zuständig ist, und welche Playwright oder Firecrawl brauchen |
| `references/design-review.md` | Phase 5 nach den Prüfskripten, immer; Abschnitt 8 in Phase 3 vor der Freigabe |
| `references/figma-zu-code.md` | sobald ein Figma-Link oder eine Figma-Bibliothek geliefert wird, Phase 1 bis 4 |
| `references/aenderungsrunden-und-layoutschutz.md` | jede Änderung an einer gebauten Seite: Rückmeldungen bündeln, Auftrag mit Sektion und „bleibt", Prüfung danach, eigene Sitzung für Text und Leistung, Block für die Projekt-`CLAUDE.md` |
| `references/brand-extraktion.md` | jeder Relaunch und jede Brandingübernahme per URL: Farben, Schriften, Logo der eigenen Bestandsseite messen |
| `references/firecrawl-recherche.md` | eine bekannte, alte oder fremde Seite crawlen oder scrapen, für Relaunch-Inventar oder Design-Referenz |
| `references/designrecherche-ablauf.md` | Phase 3, sobald Referenzen gesucht, vorgelegt oder freigegeben werden |
| `references/referenzquellen-konfiguration.md` | eine Referenzquelle ergänzen, stilllegen oder ihr Suchmuster prüfen |
| `references/designrecherche-beispiele.md` | beim ersten Durchlauf der Recherche, und bei jeder Störungsmeldung |
| `references/arbeitsdisziplin.md` | immer, ab Phase 2: Annahmen aussprechen, Verwirrung melden, dünne Scheiben, Belege, nach Quelle bauen, Zweifel-Durchgang, Kontext führen |
| `references/browser-pruefung-mit-playwright-cli.md` | eine Seite im Browser erkunden und testen: Handy, reduzierte Bewegung, Consent, Netzwerk, Formular, Bewegung Bild für Bild |
| `references/sicherheitspruefung.md` | Phase 4 bis 6, jedes Projekt: Prüfung, Funde einsortieren, Missbrauch testen, Schlüssel aufgetaucht, Tiefenscan, Übergabe |
| `references/zahlungen-umsetzung.md` | nur wenn die Seite Geld einnimmt (Stripe): Fragen, Dateien aus `assets/stripe/`, Umgebungsvariablen, Dashboard, Testplan |

| Datei im Schwesterskill | Wann lesen |
| --- | --- |
| `../webdesign-conversion/SKILL.md` | immer, die harten Grenzen |
| `../webdesign-conversion/playbooks/*.md` | Phase 1, je nach Seitentyp |
| `../webdesign-conversion/references/10-visuelle-richtung.md` | vor der ersten Zeile UI Code |
| `../webdesign-conversion/references/26-geschmack-und-ki-tells.md` | Phase 3 für Lesart und Regler, Phase 4 für Held und Sektionen, Phase 5 für den Vorflugcheck |
| `../webdesign-conversion/references/27-redesign-bestand.md` | jede Überarbeitung einer bestehenden Seite |
| `../webdesign-conversion/references/28-ki-bildentwuerfe.md` | sobald ein Bildmodell Entwürfe erzeugen soll |
| `../webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md` | Phase 5, für Kritik und Feinschliff nach dem Build, vor Phase 6 |
| `../webdesign-conversion/references/33-kundenpraesentation-und-feedback.md` | Phase 3 und 6, wenn ein Entwurf vor dem Kunden begründet oder Rückmeldung eingeordnet wird |
| `../webdesign-conversion/references/24-designsystem-vorrang.md` | sobald ein Designsystem, Branding oder eine Referenz im Spiel ist |
| `../webdesign-conversion/references/41-motion-als-funktion-der-zeit.md` | sobald Logoanimation, Loop oder Kurzvideo als eigenes Lieferstück gebaut wird |
| `../webdesign-conversion/references/42-referenzgrammatik-und-gap-audit.md` | Phase 2 und 3, wenn Referenzen ausgelesen werden, und bei „es fehlt etwas“ |
| `../webdesign-conversion/references/43-hierarchie-raster-komposition.md` | Phase 3 und 4, beim Entscheiden über Hierarchie, Raster, Sektionsanteile und Animationssystem |
| `../webdesign-conversion/references/44-gutes-festschreiben-und-rueckbauprobe.md` | Phase 5 und 6, wenn ein gutes Ergebnis für spätere Sektionen oder Kampagnen festgehalten wird |
| `../webdesign-conversion/references/48-richtung-varianten-und-subtraktion.md` | Phase 3, wenn Richtungen als Varianten gezeigt werden, und Phase 5 für Fehlermodi und Subtraktion |
| `../webdesign-conversion/references/12-copywriting.md` | sobald Texte eingesetzt werden |
| `../webdesign-conversion/references/45-huerde-laenge-und-leserfuehrung.md` | Phase 1 und 3 bei Landingpages: Länge und Sektionsfolge nach Hürde, Leserführung, Stakkato |
| `../webdesign-conversion/references/01-strategie-positionierung.md` | Phase 2, Schritt 1.5: Recherche vor dem Text, acht Fragen, Hebel |
| `../webdesign-conversion/references/07-recht-dsgvo.md` | Rechtstexte und Consentpflichten |
| `../webdesign-conversion/references/04-barrierefreiheit-bfsg.md` | vor der Abnahme |
| `../webdesign-conversion/references/05-seo-sichtbarkeit.md` | Metadaten und Relaunch |
| `../webdesign-conversion/references/47-claude-design-hacks.md` | Phase 5 vor der Abnahme (Fünf-Agenten-Prüfung, Fix-Liste mit GO, Ein-Bildschirm-Test), Phase 3 und 4 bei Remix pro Sektion und `DESIGN.md` für Claude Design |
| `../webdesign-conversion/references/46-lokale-sichtbarkeit.md` | jeder Betrieb mit Einzugsgebiet: Ortsseiten, NAP, Prüfliste für Profil und Bewertungsablauf in der Übergabe |
| `../webdesign-conversion/references/14-projektstruktur-astro.md` | Dateistruktur und Fallstricke |
| `../webdesign-conversion/references/50-scroll-erlebnis-grammatik-und-gefuehl.md` | Phase 3 und 4 bei Marken-, Kampagnen- und Produktseiten mit Erlebnisidee: Grammatik, Gefühlskurve, gewollter Gipfel, Signaturbewegung, Prüfen durch Scrollen |
| `../webdesign-conversion/references/51-text-entmaschinisieren.md` | sobald ein Modelltext (eigener Vorschlag, Entwurf, Blog) überarbeitet wird, nie bei gelieferten Kundentexten |
| `../webdesign-conversion/references/52-sicherheit-der-kundenseite.md` | Phase 3 (Vertrauensgrenzen), Phase 4 bei jeder Funktion, Phase 5 vor der Abnahme |
| `../webdesign-conversion/references/53-zahlungen-mit-stripe.md` | nur bei Zahlung: Weg, Recht der Bestellstrecke, Steuer, Webhooks |
| `../webdesign-conversion/references/54-video-aus-html-mit-hyperframes.md` | nur wenn Video oder eine Animationssequenz als Lieferstück gebaut oder verbessert wird |

`assets/` enthält geprüfte Vorlagen für Consent, Formularroute, Mailtemplate und Bewertungsabruf
(kopieren und anpassen, nicht neu schreiben). Rechtstexte, Tokens, Meta-Head, JSON-LD, 404 und
Security-Header liegen in `../webdesign-conversion/assets/vorlagen/`.

Die Skripte in `scripts/` im Repowurzelverzeichnis (dreizehn Prüfskripte `pruefe-*.mjs` und die Agenturwerkzeuge) werden nie Teil der ausgelieferten Seite und wandern nie in das `package.json` des Kundenprojekts. Welches Skript was tut und wo sein Ablauf steht: `references/agenturwerkzeuge.md`.

## Definition of Done

Erst wenn alle Punkte erfüllt sind, darf von einer fertigen Seite gesprochen werden:

* alle vereinbarten Seiten und Sektionen vorhanden, keine vergessenen Platzhaltertexte
* jeder selbst formulierte Copy-Vorschlag mit `scripts/deslop-check.mjs` auf 5 von 5 geprüft
* Build läuft ohne Fehler, `astro check` ohne Befund
* alle dreizehn Prüfskripte ohne Fehler, auch `pruefe-geschmack.mjs`, `pruefe-geo.mjs`, `pruefe-aktualitaet.mjs`, `pruefe-typografie.mjs`, `pruefe-seitenbasis.mjs` und `pruefe-sicherheit.mjs` gegen `dist/`, bei Scrollseiten `pruefe-scrollstrecke.mjs` auf Desktop, Handy und mit reduzierter Bewegung
* Vorflugcheck aus `26-geschmack-und-ki-tells.md` durchgegangen, Ungeprüftes benannt; Belastungsprobe mit Extremdaten, Design-Review, Fehlermodi und Subtraktionsrunde nach `references/qa-und-abnahme.md` (Schritt 8b), Befunde behoben oder als Entscheidung benannt
* Tastaturbedienung durch alle interaktiven Elemente, sichtbarer Fokus
* Formular getestet: Erfolg, Validierungsfehler, Serverfehler, Turnstile
* Bestätigungsmail und interne Benachrichtigung im Branding des Kunden
* Consent blockiert Skripte tatsächlich vor der Einwilligung, Auswahl über den Footer
  änderbar
* Bewertungsabruf liefert Daten oder sauberen Fallback
* Metadaten, Open Graph, Sitemap, robots.txt, 404 Seite vorhanden
* bei Relaunch: Weiterleitungen der alten URLs gesetzt und stichprobenartig geprüft
* bei Relaunch: Marke der Bestandsseite mit `brand-extraktion.mjs` gemessen, jede Übernahme
  und jede Änderung in `marke.json` unter `herkunft.bestehende_marke` begründet, offene
  Schriftlizenzen benannt, `.brand-extraktion/` in der `.gitignore`
* Schriften selbst gehostet, Bilder optimiert und mit Alternativtext
* keine Schlüssel im Repository, im Browsercode und in `dist/`, Audit gegen das Lockfile gelaufen (`references/sicherheitspruefung.md`)
* bei Zahlung: Webhook mit Signaturprüfung, Erfüllung im Webhook, Sandbox-Testplan durchlaufen, AGB, Widerruf und Datenschutz vom Händler geliefert (`references/zahlungen-umsetzung.md`)
* `CLAUDE.md` aktuell
* offene Punkte, fehlende Bilder, fehlende Rechtsangaben und Copyvorschläge im Chat benannt
* Stylescape vom Kunden bestätigt, sofern der Kunde über Design entscheidet, siehe
  `references/moodboard-und-stylescape.md`
* Erinnerungs- und Aufgabentest gemacht oder ausdrücklich als nicht getestet benannt
  (`references/qa-und-abnahme.md` Schritt 8a)
* im Bericht steht, was ein Mensch noch sichten muss, und das Modell meldet die Seite nicht als
  abgenommen, siehe `references/qa-und-abnahme.md` Schritt 9
* Aktualität und Eigentum nach `references/qa-und-abnahme.md` Schritt 10: Copyright-Jahr
  dynamisch, Domain und Zugänge beim Kunden oder als offen benannt, Pflege geklärt
* bei einem Chatbot: Systemprompt serverseitig, Wissensbasis vom Kunden, Gegenprobe durchgeführt
* jede genutzte Designreferenz steht mit Freigabe und Entscheidung im Register, keine wurde
  ohne Freigabe erfasst, und `.designrecherche/` ist in der `.gitignore` des Kundenprojekts
