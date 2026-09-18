# Design-Skill

Repository für das Claude-Code-Plugin `webdesign-conversion` von Henneberg Webdesign und
That's it. Marketing. Hier wird kein Kundenprojekt gebaut, hier wird das Werkzeug gepflegt,
mit dem Kundenprojekte gebaut werden.

## Kunde und Ziel

Nutzer sind die Agentur selbst und alle, die das Plugin über den Marketplace installieren.
Ziel ist eine Kundenseite, die ohne Nacharbeit ausgeliefert werden kann: conversionstark,
rechtlich tragfähig, barrierearm, schnell, und nicht wie von einer Maschine gebaut.

## Aufbau: zwei Skills, ein Plugin

| Skill | Rolle | Lizenz |
|---|---|---|
| `skills/webdesign-conversion/` | das Regelwerk: was gut ist und warum. 24 Referenzen, 3 Playbooks, Vorlagen, Checklisten | MIT |
| `skills/agentur-website-builder/` | der Lieferablauf: Phasen 0 bis 6, fester Agenturstack, einsatzfertiger Code | Agenturstandard, siehe seine `SKILL.md` |

Die Trennung ist die zentrale Entscheidung dieses Repositories: **Wissen und Ablauf sind
zwei Dinge.** Das Regelwerk gilt auch in einem fremden Stack, der Ablauf gilt nur für
Agenturprojekte. Wer beides in eine Datei legt, bekommt eine SKILL.md, die niemand mehr
liest, und Regeln, die sich beim ersten React-Projekt widersprechen.

Daraus folgt die wichtigste Pflegeregel: **Der Bauablauf wiederholt keine Inhalte des
Regelwerks, er verweist darauf.** Verweise haben die Form
`../webdesign-conversion/references/12-copywriting.md`. Wer einen Abschnitt in beiden
Skills findet, hat einen Fehler gefunden, keine Redundanz mit Absicht.

## Befehle

```bash
# Prüfskripte, laufen gegen ein Kundenprojekt, nicht gegen dieses Repository
node scripts/pruefe-striche.mjs
node scripts/pruefe-tokens.mjs
node scripts/pruefe-kontrast.mjs
node scripts/pruefe-platzhalter.mjs --launch
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder

# Agenturwerkzeuge
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
node scripts/design-scan.mjs https://wettbewerber-oder-inspiration.de
node scripts/deslop-check.mjs --text "Wir begleiten Sie ganzheitlich."

# Designrecherche: Freigabezustand der Referenzen, laeuft im Kundenprojekt
node scripts/referenz-register.mjs anlegen --name "Beispiel" --url https://beispiel.de --quelle land-book
node scripts/referenz-register.mjs vorlegen --alle
node scripts/referenz-register.mjs freigeben --id ref-01-beispiel-de --sektionen hero
node scripts/referenz-register.mjs status
node scripts/referenz-crawl.mjs --id ref-01-beispiel-de --breakpoints 375,768,1440 --screenshot
node scripts/design-dna.mjs --id ref-01-beispiel-de
node scripts/muster-vergleich.mjs --id ref-01-beispiel-de
node scripts/referenz-register.mjs wissen --id ref-01-beispiel-de --entscheidung projekt
node scripts/muster-paket.mjs --id ref-01-beispiel-de

# Musterbibliothek pruefen und Index neu erzeugen
node scripts/pruefe-muster.mjs
node scripts/pruefe-muster.mjs --index

# Tests der Skripte, eingebauter Node-Testrunner, ohne Abhaengigkeit
node --test 'scripts/tests/*.test.mjs'

# Eval-Suite
claude plugin eval .
claude plugin eval . --case consent-ohne-keks
claude plugin eval . --runs 1 --ablation none

# Quell-Skills in ein Kundenprojekt nachinstallieren
bash scripts/install-quellskills.sh
```

Alle Skripte laufen mit reinem Node, ohne Abhängigkeiten. Nur `pruefe-breakpoints.mjs`
braucht Playwright im Zielprojekt. Kein `package.json`, und das bleibt so: ein
Abhängigkeitsbaum in einem Skill-Repository wird beim nächsten Audit zum Problem und bringt
hier nichts ein. Die Tests nutzen deshalb `node:test` und `node:assert` aus dem Standardumfang
von Node, keinen externen Testrunner. Die Verzeichnisform `node --test scripts/tests/` greift
nicht, es braucht das Glob-Muster in Anführungszeichen.

## Dateistruktur

```
.claude-plugin/       plugin.json, marketplace.json
skills/
  webdesign-conversion/     SKILL.md, references/00-25, playbooks/, assets/
                            assets/musterbibliothek/ ist das globale Musterwissen
  agentur-website-builder/  SKILL.md, references/, assets/consent|forms|reviews
scripts/              fünf Prüfskripte, Agenturwerkzeuge, Designrecherche, ein Installer
  lib/abruf.mjs       die eine Abrufschicht, vier Rückfallstufen, robots.txt
  tests/              node --test, lokaler Testserver statt Netzzugriff
evals/                acht Fälle mit Gradern, results/ ist ausgenommen
README.md             Außendarstellung
CREDITS.md            Herkunft jeder eingeflossenen Quelle
```

## Konventionen

Diese Punkte haben einen Grund. Wer sie ändert, ändert damit auch den Grund.

- **Alles auf Deutsch**, Referenzen, Skripte, Ausgaben, Commits. Die Zielgruppe ist der
  DACH-Raum, und ein deutschsprachiger Skill erzeugt deutschsprachige Ausgaben.
- **Keine Gedankenstriche im Fließtext.** Das ist die Regel, die der Skill selbst durchsetzt,
  und sie gilt für ihn zuerst. Ausnahme, weil bereits Konvention: die Kopfzeile der
  Prüfskripte in `scripts/` folgt dem Muster `name.mjs — was es tut`.
- **Jede Regel bekommt ihren Grund.** Eine Regel ohne Begründung wird in der dritten Sitzung
  zurückgedreht. Das gilt für die Referenzen und für diese Datei.
- **Jede harte Grenze braucht eine Prüfung.** Wird in `SKILL.md` eine neue harte Grenze
  ergänzt, gehört dazu entweder ein Prüfskript oder ein Eval-Fall. Sonst ist es eine
  Checkbox.
- **Ein Eval-Fall, der ohne Skill genauso besteht, misst nichts.** Immer mit Baseline laufen
  lassen und auf das Δ sehen, nicht auf die Punktzahl. Siehe `evals/README.md`.
- **Referenzen sind Nachschlagewerke, keine Fließtexte.** Tabelle vor Absatz, Beispiel vor
  Beschreibung, und am Ende die Verweise auf verwandte Kapitel.
- **Keine erfundenen Belege**, auch nicht in den eigenen Unterlagen. Ein noch nicht
  gemessener Eval-Wert wird als ungemessen benannt.
- **Vorlagen dürfen Platzhalter enthalten**, deshalb nimmt `pruefe-platzhalter.mjs` Ordner
  namens `vorlagen` und `templates` aus.
- Versionsnummer in `.claude-plugin/plugin.json` und in der `metadata` der beiden `SKILL.md`
  bei inhaltlichen Änderungen nachziehen.

## Ein neues Designmuster aufnehmen

Anders als eine Referenz. Muster wachsen ausschließlich über Tor 2 der Designrecherche, nie
durch direktes Anlegen einer Datei.

1. Im Kundenprojekt entsteht ein Musterpaket (`node scripts/muster-paket.mjs --id …`).
2. Die Datei aus dem Paket nach
   `skills/webdesign-conversion/assets/musterbibliothek/muster/<id>.md` kopieren, oder bei
   einer Erweiterung in das bestehende Muster einarbeiten.
3. `node scripts/pruefe-muster.mjs --index` laufen lassen. Ohne Index ist das Muster für den
   Vergleich unsichtbar.
4. `verwandt` beidseitig pflegen, auch im verlinkten Muster.
5. Committen, mit der Herkunft aus `HERKUNFT.md` in der Nachricht.

Verfahren und Schwellen: `skills/webdesign-conversion/references/25-designmuster-bibliothek.md`.

## Eine neue Referenz aufnehmen

1. Entscheiden, in welchen Skill sie gehört: Wissen nach `webdesign-conversion`, Ablauf oder
   Agenturvorgabe nach `agentur-website-builder`.
2. Prüfen, ob der Inhalt schon irgendwo steht. Wenn ja, dort ergänzen statt neu anlegen.
3. Datei anlegen, im Regelwerk mit laufender Nummer (`23-...`), im Bauablauf mit sprechendem
   Namen.
4. In die Referenztabelle der zugehörigen `SKILL.md` eintragen, mit der Spalte „wann lesen".
5. Von den verwandten Kapiteln aus verlinken, sonst wird sie nicht gefunden.
6. `README.md` und diese Datei nachziehen.

## Offene Punkte

- `consent-ohne-keks`, `leadsystem-nur-auf-bestaetigung`,
  `kundendesignsystem-schlaegt-referenz`, `referenz-erst-freigeben` und
  `nicht-beobachtetes-nicht-behaupten` sind noch nicht gelaufen. Ihr Δ ist eine Vermutung,
  kein Messwert.
- Die Musterbibliothek startet mit fünf Mustern, alle aus derselben Quelle (21st.dev) und
  keines aus einer echten Projektrecherche. Der Ähnlichkeitsvergleich ist damit an einem
  schmalen Bestand erprobt.
- Die Suchmuster in `referenzquellen.json` sind mit `suchmuster_geprueft: false` markiert und
  bisher nicht aufgerufen worden. Lapa Ninja, Godly und SiteInspire sind neu aufgenommen und
  in keinem Projekt erprobt.
- Für vier der sechs älteren Eval-Fälle fehlt weiterhin die Baseline-Messung.
- `relaunch-inventory.mjs` ist gegen einen lokalen Testserver geprüft, noch nicht gegen eine
  echte Kundenseite und noch nicht gegen die Firecrawl API.
- Von den vier Abrufstufen in `lib/abruf.mjs` ist nur der Direktabruf tatsächlich gelaufen.
  Firecrawl selbst gehostet, Firecrawl Cloud und die Playwright-Stufe sind ungetestet. Damit
  ist auch die Breakpoint-Erfassung und der Screenshot ungetestet.
- `design-scan.mjs` ist gegen eine echte, öffentliche Seite ohne `FIRECRAWL_API_KEY` geprüft
  (Direktabruf), noch nicht mit gesetztem Schlüssel gegen die echte Firecrawl API und noch
  nicht gegen eine reine JS-Anwendung, die erst im Browser rendert.
- Die Referenzliste in `agentur-website-builder/references/referenzen-und-auswahl.md` enthält
  fremde Domains. Sie veraltet und gehört einmal jährlich durchgesehen.
- `muster-paket.mjs` ist gegen Fixtures geprüft, aber noch nie mit einem echten Muster durch
  die ganze Kette gelaufen. Die Musterbibliothek ist bisher nie über Tor 2 gewachsen.
- Die Lizenzlage ist gemischt: MIT für das Regelwerk, Agenturstandard für den Bauablauf.
  Falls das Plugin öffentlich bleiben soll, ist zu entscheiden, ob der Bauablauf mit
  veröffentlicht wird.

## Änderungsverlauf

- **18.09.2026, Version 4.0.0** Fünfte und letzte Phase: der Kreis schließt sich. Neues
  `scripts/muster-paket.mjs` schnürt nach Tor 2 ein transportierbares Paket aus Musterdatei,
  `HERKUNFT.md` (beide Freigabezeitpunkte, Grenzen der Erfassung, Zustandsverlauf) und
  `EINBAUEN.md`. Es schreibt bewusst **nicht** in die Musterbibliothek: das globale Wissen
  liegt im Plugin, gearbeitet wird im Kundenprojekt, und ein Schreibzugriff dorthin wäre
  wirkungslos oder unsichtbar. Die Aufnahme ist ein Commit in diesem Repository. Zwei Sperren
  im Code: ohne Entscheidung eines Menschen an Tor 2 entsteht kein Paket, und ein Entwurf,
  der `pruefe-muster.mjs` nicht besteht, wird nicht eingepackt. `NUR_PROJEKT` und `ABGELEHNT`
  erzeugen ausdrücklich gar nichts. Neue
  `agentur-website-builder/references/designrecherche-beispiele.md` mit zwei vollständig
  durchgespielten Abläufen (Neubau und Relaunch) und einer Störungstabelle mit elf
  Meldungen. Zehn neue Tests zur Trennung von Projekt- und globalem Wissen, insgesamt 90.
  Die Hauptversion springt, weil der Bauablauf mit der Recherche eine neue Pflichtstufe
  bekommt und `marke.json` um zwei Felder gewachsen ist. Bestehende Projekte bleiben
  lauffähig: alle neuen Felder sind optional, kein Aufruf und kein Ausgabeordner hat sich
  geändert.
- **18.09.2026, Version 3.6.0** Vierte von fünf Phasen: das globale Wissen bekommt eine Form.
  Neue `webdesign-conversion/assets/musterbibliothek/` mit `taxonomie.json` (25 Kategorien,
  14 Stile, dazu Belege, Konfidenz, Komplexität), fünf Mustern als Erstbestand und einem
  erzeugten `index.json`. Erstbestand sind die fünf 21st.dev-Referenzkomponenten aus
  `23-referenzkomponenten-21st.md`, drei davon ausdrücklich mit Konfidenz niedrig, weil für
  sie nur der Demo-Aufruf vorlag. Neue `references/25-designmuster-bibliothek.md` mit
  Pflichtfeldern, Konfidenzmodell, der Regel wann erweitert statt neu angelegt wird, dem
  Qualitätsfilter und sechs benannten Erweiterungspunkten, die bewusst nicht gebaut sind.
  Drei neue Skripte: `pruefe-muster.mjs` (Pflichtfelder, Taxonomie, fremdes Bildmaterial,
  lange Zitate, Index), `design-dna.mjs` (jeder Wert mit Beleg, Prinzipien bewusst offen) und
  `muster-vergleich.mjs` (deterministischer Merkmalsvergleich, fünf Einstufungen). Dazu 40
  neue Tests, insgesamt 80, neue harte Grenze zum Konfidenzmodell und der Evalfall
  `nicht-beobachtetes-nicht-behaupten`, noch nicht gelaufen. Die Stilrichtungen in
  `10-visuelle-richtung.md` und in `taxonomie.json` sind zwei Fassungen derselben Liste, das
  steht jetzt an beiden Stellen.
- **18.09.2026, Version 3.5.0** Dritte von fünf Phasen: die Abrufschicht. Die
  Firecrawl-Anbindung stand bis hierher zweimal im Repository, leicht verschieden, in
  `relaunch-inventory.mjs` und `design-scan.mjs`, und sprach beide Male die Cloud fest an,
  obwohl `firecrawl-recherche.md` eine selbst gehostete Instanz zusagt. Neues
  `scripts/lib/abruf.mjs` als einzige Stelle, die eine fremde Seite holt, mit vier
  Rückfallstufen (Firecrawl selbst gehostet über `FIRECRAWL_BASE_URL`, Firecrawl Cloud,
  Playwright lokal für Breakpoints und Screenshots, Direktabruf), robots.txt-Prüfung nach
  RFC 9309 und einer Liste `grenzen`, die benennt, was nicht erfasst werden konnte. Neues
  `scripts/referenz-crawl.mjs` erfasst ausschließlich freigegebene Referenzen und bricht
  sonst mit Exit 2 ab. `design-scan.mjs` und `relaunch-inventory.mjs` sind auf den Adapter
  umgestellt, Aufruf, Ausgabeordner und Exitcodes bleiben unverändert. Dazu 23 neue Tests
  gegen einen lokalen Testserver, insgesamt 40. Dabei gefunden und behoben: der
  robots.txt-Abruf hatte kein Zeitlimit und konnte an einer stillen Seite dauerhaft hängen.
- **18.09.2026, Version 3.4.0** Zweite von fünf Phasen: die erste Freigabe wird
  durchgesetzt statt beschrieben. Neues `scripts/referenz-register.mjs` als einzige Stelle,
  die den Freigabezustand einer Designreferenz ändert: zehn Zustände, sieben erlaubte
  Übergänge, jeder andere bricht mit Exit 2 ab. Von `ENTDECKT` führt kein Weg direkt nach
  `FREIGEGEBEN` oder `GECRAWLT`, auch eine vom Kunden genannte Seite wird erst vorgelegt.
  Dazu `scripts/tests/register.test.mjs` mit 17 Tests über `node --test`, ohne Abhängigkeit.
  Neue Referenzen `agentur-website-builder/references/designrecherche-ablauf.md` (sieben
  Stufen, zwei Tore, Fehlerbehandlung, Trennung von Projekt- und globalem Wissen) und
  `referenzquellen-konfiguration.md`. Die Quellenliste ist jetzt Konfiguration
  (`assets/recherche/referenzquellen.json`, neun Quellen, darunter Lapa Ninja, Godly und
  SiteInspire) statt einer Aufzählung an drei Stellen. Neue Vorlage
  `designrecherche-brief.md`, `marke.json` bekommt `herkunft.designsystem` als Design System
  Context und erweiterte Referenzeinträge. Neue harte Grenze gegen das Erfassen ohne
  Freigabe, dazu der Evalfall `referenz-erst-freigeben`, noch nicht gelaufen.
- **18.09.2026, Version 3.3.0** Erste von fünf Phasen der kuratierten Designrecherche.
  Bisher standen drei Ranglisten nebeneinander: die harte Grenze zur Markenextraktion, die
  Rangfolge der Quellen im Bauablauf und der Vorrang des Briefs in `10-visuelle-richtung.md`.
  Bei einem gelieferten Designsystem plus einer starken Referenz widersprachen sie sich.
  Neue `webdesign-conversion/references/24-designsystem-vorrang.md` als einzige kanonische
  Rangfolge aus fünf Stufen, mit der Trennung von Designsystem-Eingabe (geschützt) und
  Inspirations-Eingabe (wirksam) und einem festen Format für den Konfliktfall. Die drei
  Altstellen behalten ihren Spezialfall und verweisen dorthin. Neue harte Grenze in
  `webdesign-conversion/SKILL.md`, dazu der Evalfall `kundendesignsystem-schlaegt-referenz`
  mit vier Gradern, noch nicht gelaufen.

- **17.09.2026, Version 3.2.0** Zwei unabhängige Ergänzungen. Erstens: fünf vom Nutzer
  vorgelegte 21st.dev-Komponenten als annotierte Referenzen aufgenommen, neue
  `webdesign-conversion/references/23-referenzkomponenten-21st.md` mit Prinzip je Komponente
  und Übernahmeregeln, Code in `webdesign-conversion/assets/vorlagen/referenzkomponenten/`.
  Zwei der fünf Vorlagen enthielten nur Demo-Aufrufcode ohne die referenzierte
  Basiskomponente (`hero-section-7`, `testimonial-v2`, `integrations-5` betreffen drei
  Dateien); deren Quelltext wurde nicht nachgebaut, sondern die Lücke im Kapitel selbst
  benannt, siehe die Regel gegen erfundene Belege. Zweitens: Firecrawl
  (`github.com/firecrawl/firecrawl`) als optionale Abrufquelle für Referenzrecherche
  eingebunden, kein Code übernommen, nur die REST-API angesprochen. Neues Werkzeug
  `scripts/design-scan.mjs` erfasst eine fremde, bekannte oder alte Seite für die
  Struktur- und Design-Recherche vor dem Tokensystem-Plan (Sektionsreihenfolge, Bilder,
  Farb-/Schriftkandidaten, optional Screenshot), ergänzt `relaunch-inventory.mjs`, das
  weiterhin für die eigene Bestandsseite vor dem Relaunch zuständig bleibt. Neue
  `agentur-website-builder/references/firecrawl-recherche.md` grenzt beide Werkzeuge
  gegeneinander ab. `design-scan.mjs` ist gegen eine echte Seite ohne Firecrawl-Schlüssel
  geprüft, noch nicht mit gesetztem Schlüssel gegen die echte API.
- **15.09.2026, Version 3.1.0** Cloudflare Pages Astro als Standardstack ohne Rückfrage
  festgeschrieben. Bisher stand nur in der Tabelle „Feste Agenturvorgaben", was der Stack
  ist, aber nicht, was passiert, wenn Phase 1 kein bestehendes Projekt vorfindet. Neuer
  Abschnitt „Standardstack ohne Rückfrage" mit Gerüstbefehlen (`pnpm create astro@latest`,
  Cloudflare-Adapter, Sitemap, Wrangler) in `agentur-website-builder/references/stack-und-deployment.md`,
  Verweis darauf in Phase 1 der `SKILL.md` ergänzt.
- **14.09.2026, Version 3.0.0** Zweiter Skill `agentur-website-builder` aufgenommen und mit
  dem Regelwerk verzahnt: Phasenablauf, Agenturstack, neun Referenzen, fünf einsatzfertige
  Codevorlagen für Consent, Formular, Mail und Bewertungen. Doppelte Inhalte durch Verweise
  ersetzt. Neu geschrieben: `scripts/relaunch-inventory.mjs` und `scripts/deslop-check.mjs`
  (beide gegen lokale Fixtures geprüft). Im Regelwerk ergänzt: Schriftwahl mit Sperrliste in
  `10-visuelle-richtung.md` und als harte Grenze in `SKILL.md`. Zwei Eval-Fälle ergänzt.
  Drei Sicherheitskorrekturen an der übernommenen Formularvorlage, siehe `CREDITS.md`.
  Zwei Altlasten nebenbei behoben: `pruefe-platzhalter.mjs` meldete TOML-Tabellen wie
  `[[kv_namespaces]]` als offenen Platzhalter, und die `description` in
  `webdesign-conversion/SKILL.md` war wegen eines Doppelpunkts kein gültiges YAML. Ein
  toter Verweis in `19-recruiting-funnel.md` zeigt jetzt auf den richtigen Pfad.
- **Version 2.0.0** Marken- und CI-Extraktion, Premium-Designquellen, Sektionshierarchie,
  Recruiting-Funnel, Spacing- und Responsive-Kapitel, Icon-System, Motion-Handschrift,
  Prüfskripte und Eval-Suite.
