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
| `skills/webdesign-conversion/` | das Regelwerk: was gut ist und warum. 43 Referenzen, 3 Playbooks, Vorlagen, Checklisten | MIT |
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
node scripts/pruefe-platzhalter.mjs --launch  # auch data-tweaks-panel, das Reglerpanel darf nie live
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
node scripts/pruefe-geschmack.mjs            # nach dem Build: dist/ Seiten, src/ Quellen, auch Konturbutton als Primär-CTA
node scripts/pruefe-motion.mjs               # src/: transition: all, scale(0), ease-in, Dauer, Reduzierung, Scrollvideo, Einbettung
node scripts/pruefe-geo.mjs                  # nach dem Build: dist/ robots.txt, KI-Crawler, JSON-LD
node scripts/pruefe-aktualitaet.mjs          # dist/ und src/: Copyright-Jahr, Stand-Angaben, Jahr im Titel

# Agenturwerkzeuge
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
node scripts/brand-extraktion.mjs https://alte-kundenseite.de / /kontakt   # nur eigene Seite, braucht Playwright
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
und `brand-extraktion.mjs` brauchen Playwright, im Zielprojekt oder global, gefunden über
`scripts/lib/browser.mjs`. Kein `package.json`, und das bleibt so: ein
Abhängigkeitsbaum in einem Skill-Repository wird beim nächsten Audit zum Problem und bringt
hier nichts ein. Die Tests nutzen deshalb `node:test` und `node:assert` aus dem Standardumfang
von Node, keinen externen Testrunner. Die Verzeichnisform `node --test scripts/tests/` greift
nicht, es braucht das Glob-Muster in Anführungszeichen.

## Dateistruktur

```
.claude-plugin/       plugin.json, marketplace.json
skills/
  webdesign-conversion/     SKILL.md, references/00-43, playbooks/, assets/
                            assets/musterbibliothek/ ist das globale Musterwissen
                            assets/vorlagen/scrollvideo/ sind die Bausteine zu Kapitel 38
                            assets/vorlagen/prompts/ sind die Prompt-Vorlagen zu Kapitel 24, 38, 39, 40
  agentur-website-builder/  SKILL.md, references/, assets/consent|forms|reviews
scripts/              neun Prüfskripte, Agenturwerkzeuge, Designrecherche, ein Installer
  lib/abruf.mjs       die eine Abrufschicht, vier Rückfallstufen, robots.txt
  lib/browser.mjs     die eine Stelle, die Playwright sucht und Chromium startet
  tests/              node --test, lokaler Testserver statt Netzzugriff
evals/                achtzehn Fälle mit Gradern, results/ ist ausgenommen
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
- **Fremde Skills werden destilliert, nicht mitgeliefert.** Was eingeht, wird auf Deutsch,
  auf Astro und auf die harten Grenzen übertragen; wo die Quelle einer harten Grenze
  widerspricht, wird das umgedreht und mit Grund benannt (Beispiel: Abschnitt 11 in
  `26-geschmack-und-ki-tells.md`). Grund: zwei Regelwerke im Kontext, die sich an genau diesen
  Stellen widersprechen, lassen das Modell zwischen ihnen pendeln. Die Originale gibt es auf
  Wunsch über `scripts/install-quellskills.sh`.
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

- Version 4.13.0: Kapitel 43 ist an keinem Projekt erprobt, kein Evalfall, das Δ ist eine Vermutung.
  Der Scramble ohne Bildschirmleserlärm ist beschrieben, nicht in einer Vorlage umgesetzt, und
  `pruefe-motion.mjs` kennt ihn nicht. Die Adressen der sieben Beispielseiten sind aus der
  Videobeschreibung, ungeprüft und nicht verlinkt. Alle Aussagen der Videos sind Erfahrungswerte des
  Autors.
- Version 4.12.0: Kapitel 41 und 42 sind an keinem echten Projekt erprobt, kein Evalfall, das Δ ist eine
  Vermutung. `scripts/design-gap-audit.mjs` und `scripts/pruefe-flow.mjs` sind benannt und **nicht gebaut**:
  der Gap Audit und der Durchlauf wie ein Nutzer sind Handarbeit. Ob Loop Pause und Poster vorhanden
  sind, prüft kein Skript. Die Schwelle 8 und die fünf Runden der drei Kritiker, die Randwerte der
  Formate und die Namen der Quellen (Mobbin, Refero, Page Flows, Screens Design, whatships.com,
  skillery.dev, aus Videountertiteln) sind ungeprüft. Die Quellvideos sind Aussagen der Autoren.
- Version 4.11.0: Kapitel 40 und die Abschnitte zu Kosten (39), Storyboard (38) und Bausteinkandidaten
  (22) sind an keinem echten Projekt erprobt. Die zwei neuen Evalfälle sind klein gemessen
  (`polierschleife-nicht-als-start` Δ +0,13, `generator-kosten-vorab` Δ +0,20, je zwei Läufe je
  Arm), die Baseline besteht schon großenteils. Ob eine Polierschleife bessere Seiten liefert als ein
  einzelner Durchgang, ist ungemessen. Alle Aussagen der neun Videos (Kanal RoboNuggets) sind
  Aussagen des Autors, Modellnamen, Preise, Anbieterbedingungen und das Wasserzeichen sind nicht
  gegen Hersteller geprüft. Die Adressen der Kandidatentabelle in Kapitel 22 sind ungeprüft und nicht
  verlinkt. Das Henneberg Design System liegt im Repository `henneberg-homepage` und ist nicht
  eingesehen: ob es als Stufe 1 hier verlinkt werden soll, ist offen. Der Hook gegen zerstörerische
  Befehle ist als Regel beschrieben, nicht als fertige Konfiguration geliefert.
- Version 4.10.0: Die Kapitel 36 bis 39 und `moodboard-und-stylescape.md` haben keinen Evalfall zu
  ihrem Kern. Die drei neuen Fälle sind mit je zwei Läufen je Arm gemessen: Konturbutton Δ +0,75,
  F-Muster Δ +0,13, Scrollvideo Δ +0,25 (erst nach einer geschärften Auslöserzeile in `SKILL.md`,
  vorher 0,00). Vier Läufe je Fall sind keine belastbare Stichprobe. Die Erkennung des Konturbuttons in `pruefe-geschmack.mjs` ist
  eine Heuristik, sie kennt benannte Klassen (haupt, primary, primaer) und `data-variant`, keine
  anderen Primärmarker, und eine Fläche, die ein Stylesheet in einer anderen Datei setzt, sieht sie
  nicht. Die Scrollvideo- und Einbettungsprüfung in `pruefe-motion.mjs` ist gegen Fixtures und die
  eigenen Vorlagen geprüft, nicht gegen ein Kundenprojekt. Die Bausteine in
  `assets/vorlagen/scrollvideo/` sind nie mit der Bibliothek `scrolly-video` gelaufen, Version und
  Lizenz sind unbekannt. Zwei Abweichungen von der Spezifikation des Pakets: die Einbettungsprüfung
  liegt in `pruefe-motion.mjs` statt in `pruefe-breakpoints.mjs` (sie ist dort ohne Browser
  testbar), und der Test mit Menschen steht als Schritt 8a statt als neuer Schritt 9, damit kein
  Verweis auf Schritt 9 und 10 bricht. Zahlen aus den Videos (60 30 10, zwei Runden, 48 Stunden)
  sind Vorschläge. Aussagen der Videos sind Erfahrungswerte, keine Studien.
- Version 4.9.0: `pruefe-aktualitaet.mjs` kennt nur drei Formen (Copyright, Stand, Jahr im Titel)
  und weiß nicht, welche feste Jahreszahl Absicht ist, deshalb sind zwei davon nur Hinweise.
  Der Übergabeschritt (Domain, Zugänge, Pflege) und der Tauschtest, der Blinzeltest und der
  Videotest im Vorflugcheck sind an keinem echten Projekt erprobt. Kein Evalfall, das Δ ist eine
  Vermutung. Die Videos nennen Studien und Zahlen, keine davon ist übernommen.
- Version 4.8.0: Kapitel 35 hat keinen Evalfall, das Δ ist eine Vermutung. Die deutsche
  Weichmacherliste ist eine eigene Zusammenstellung, nicht aus dem Video. Das Satzmuster liefert
  Hinweise und keine Fehler: Ein „vielleicht“ in einer Besucherfrage oder ein Vorbehalt in einem Rechtstext
  ist berechtigt. Nicht geprüft, ob die FAQ Regeln mit `jsonld-bausteine.md` und der Akkordeon
  Vorlage zusammenpassen.
- Version 4.7.0: Kapitel 34 hat keinen Evalfall, das Δ ist eine Vermutung. Die beiden neuen
  Satzmuster sind gegen Testsätze geprüft, nicht gegen echte Kundentexte; „garantiert“ kann
  berechtigt dort stehen, wo der Kunde eine Garantie gibt, dann ist der Befund ein Hinweis, kein Fehler.
- Version 4.6.0: `chatbot-auf-der-website.md` hat keine Codevorlage, die Gegenprobe ist an keinem
  echten Bot gelaufen, und die Alltagsprobe in Kapitel 26 hat keinen Evalfall. Das Δ ist eine
  Vermutung. Ein Prüfskript für die Gegenprobe wäre der nächste Schritt, ist aber nicht gebaut.
- Version 4.5.0: Kapitel 33 und `kundenabstimmung.md` sind nicht an einem echten Kundentermin
  erprobt. Es gibt keinen Evalfall, ob das Kapitel das Verhalten beim Vorstellen eines Entwurfs
  ändert; das Δ ist eine Vermutung. Die Aussagen des Videos (Personen, Studien, ein Xbox Vorgehen)
  sind nicht gegen Primärquellen gelesen. Die Lens der Agentur fehlt bewusst und muss von der
  Agentur formuliert werden.
- Version 4.4.0: `pruefe-motion.mjs` und `pruefe-geo.mjs` sind gegen Fixtures und die eigenen
  Vorlagen geprüft, nicht gegen ein gebautes Kundenprojekt. Die Hover-Erkennung in
  `pruefe-motion.mjs` liest CSS mit einfacher Klammerzählung und kennt weder verschachteltes
  CSS mit `&` noch SCSS-Mixins. Zu beiden Kapiteln gibt es keinen Evalfall; ob Kapitel 30 und
  31 das Verhalten ändern, ist ungemessen. Die Quellen der neuen Kapitel wurden über
  abrufende Zusammenfassungen gelesen, nicht vollständig geklont; die Liste dessen, was nicht
  gelesen wurde, steht in `CREDITS.md`. Die Lizenz des Repositorys
  `vercel-labs/web-interface-guidelines` ist nicht verifiziert. Die Crawlernamen in Kapitel 31
  und die Behauptung zu `llms.txt` sind aus den Beschreibungen der Quellen übernommen, nicht
  gegen die Herstellerdokumentation geprüft.

- `consent-ohne-keks`, `leadsystem-nur-auf-bestaetigung`,
  `kundendesignsystem-schlaegt-referenz`, `referenz-erst-freigeben`,
  `nicht-beobachtetes-nicht-behaupten` und `keine-attrappen-als-beleg` sind noch nicht
  gelaufen. Ihr Δ ist eine Vermutung, kein Messwert.
- `pruefe-geschmack.mjs` ist gegen Fixtures und die eigenen Vorlagen geprüft, noch nicht
  gegen ein gebautes Kundenprojekt in `dist/`. Die Kicker-Erkennung kennt benannte Klassen
  und die Tailwind-Signatur aus Versalien plus Sperrung; ein Kicker mit anderer Klasse
  bleibt unsichtbar. Die Regler-Voreinstellungen je Kundentyp in Kapitel 26 sind übertragen,
  nicht gemessen.
- Die `description` in `webdesign-conversion/SKILL.md` ist mit rund 1190 Zeichen länger als
  die übliche Grenze von 1024. Sie wurde in 4.1.0 bewusst nicht verlängert. Falls Claude Code
  sie kürzt, fällt zuerst der Auslösersatz am Ende weg; dann kürzen, nicht ergänzen.
- Die Musterbibliothek startet mit fünf Mustern, alle aus derselben Quelle (21st.dev) und
  keines aus einer echten Projektrecherche. Der Ähnlichkeitsvergleich ist damit an einem
  schmalen Bestand erprobt.
- Die Suchmuster in `referenzquellen.json` sind mit `suchmuster_geprueft: false` markiert und
  bisher nicht aufgerufen worden. Lapa Ninja, Godly und SiteInspire sind neu aufgenommen und
  in keinem Projekt erprobt.
- `brand-extraktion.mjs` ist nur gegen eine lokale Testseite mit Chromium gelaufen, nie gegen
  eine echte Kundenseite in dieser Fassung. Die Firecrawl-Zweitmeinung (Format `branding`,
  API v2) ist nur gegen einen lokalen Ersatzserver geprüft. Der Evalwert Δ +1.00 für
  `brand-extraktion-nur-eigene-marke` stammt aus dem Quellrepository, hier nicht neu gemessen.
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

- **07.10.2026, Version 4.13.0** Erweiterungspaket aus vier Videos des Kanals BONT (Projektablauf, fünf
  Schlüssel, Layoutregeln, Inspirationsquellen), gegen 4.12.0 abgeglichen. Das meiste stand schon
  (Referenzkollage, Markenskill, wenige Zutaten, Layoutfamilien, Sticky Kopf). Neu: Kapitel
  `43-hierarchie-raster-komposition.md` (Hierarchie als Verhältnis, Titellänge, Führungskanten, Anteile
  je Sektion wechseln, Heldenidee als roter Faden, Animationssystem mit Scramble und Sticky Modul in drei
  Zonen) und Abschnitt 5a „Regeln laufend festhalten" in `moodboard-und-stylescape.md`. **Fünf
  Widersprüche entschieden, Tabelle in Kapitel 43 Abschnitt 8:** feste Pixelabstände nicht übernommen
  (fließende Tokens bleiben), Fläche nutzen nur für Bild, Fläche und Display Überschrift (Lesebreite
  bleibt), Titel mit 1 bis 5 Wörtern als Display Regel bei H1 mit Thema, Kleintext nur für Nebentext
  kleiner (Mindestgröße 16 px), Stil Skill je Marke ersetzt durch `marke.json` und Markenbrief. Scramble
  nur mit echtem Text im DOM. Nicht übernommen: Framer Bedienung, Lebenslauf und Preise des Autors,
  vier der elf Beispielseiten. Keine harte Grenze, kein Prüfskript, kein Evalfall. Versionen: Plugin
  4.13.0, Regelwerk 2.16.0, Bauablauf 2.13.0.
- **07.10.2026, Version 4.12.0** Erweiterungspaket „Referenz und Motion" (eine `SKILL.md`, neun Abschnitte),
  gegen 4.11.0 abgeglichen. Neu: Kapitel `41-motion-als-funktion-der-zeit.md` (Bewegtbild als `frame(t)`,
  Storyboard und Beatgrid als Tore vor dem Code, Look gegen die Schablone, Referenzvideo auswerten,
  Einsatz im Web mit Pause nach WCAG 2.2.2, Formate aus einer Szene) und
  `42-referenzgrammatik-und-gap-audit.md` (drei bis fünf Referenzen je Sektion, Grammatiktabelle, Gap
  Audit mit Messpunkten und Ausgabe). Ergänzt: Variante mit drei Kritikern in Kapitel 40 (3a), Kandidaten
  für Flows und Bewegung in 22, Interview vor dem Prompt in `intake-und-entscheidungen.md`, Durchlauf wie
  ein Nutzer in `qa-und-abnahme.md`. **Zwei Entscheidungen:** Die drei Kritiker sind eine Variante
  **eines** Durchgangs, die Grenze von zwei aus Kapitel 29 bleibt, und jeder Wert unter 10 muss einen
  Mangel nennen, weil eine bloße Bewertung nach Kapitel 40 zur Zustimmung führt. Die Videoproduktion,
  in 4.11.0 noch ausgeschlossen, ist jetzt als Lieferstück aufgenommen, ohne Skript und ohne neue
  Abhängigkeit. Nicht übernommen: Kosten-, Zeit- und Aufrufzahlen der Quellvideos, Werkzeugvergleich
  Remotion gegen HyperFrames. Keine neue harte Grenze, kein Prüfskript, kein Evalfall. Versionen:
  Plugin 4.12.0, Regelwerk 2.15.0, Bauablauf 2.12.0.
- **07.10.2026, Version 4.11.0** Neun Videos des Kanals RoboNuggets (Jay E) zu Claude Design, Prompting,
  Motion, Bildgenerierung, Plugins und Wasserzeichen, als Wissenspaket geliefert und gegen 4.10.0
  abgeglichen (30 Themen). Meist vorhanden (Design System vor dem Entwurf, Standardfont, Icons, Impeccable,
  Anti-Slop-Prüfung). Drei **Widersprüche entschieden:** Fontshare gilt als Quelle, aber Lizenz prüfen und selbst
  hosten (26 warnt vor dem Anbieter-CDN); die Gauntlet-Schleife ist ein Weg, einen der zwei subjektiven
  Durchgänge aus Kapitel 29 zu fahren, kein dritter; die Vorlage „Design System aus Referenz" gilt nur für
  das Material des Kunden und freigegebene Referenzen, wegen der harten Grenze zur Markenextraktion. Neu:
  Kapitel `40-polierschleife-mit-kritiker.md`, Kosten und Protokoll bei bezahlter Generierung (39, 3a),
  Storyboard vor Scroll-Animation (38, 2a), Kandidatentabelle mit Prüfpflicht (22), Mischen mit Herkunft je
  Merkmal (24), Wettbewerbermuster und Wasserzeichenhinweis in `copy-im-kundenprojekt.md`, Schutz vor
  zerstörerischen Befehlen, Checkliste bei langen Builds und zwei CLAUDE.md-Sätze im Bauablauf, Ausschnitt je
  Sektion in Kapitel 29 und `qa-und-abnahme.md`, fünf Prompt-Vorlagen unter `assets/vorlagen/prompts/`. Eine
  Prüfung: `pruefe-platzhalter.mjs` meldet `data-tweaks-panel` (3 Tests, insgesamt 220). Zwei Evalfälle. Nicht
  übernommen: Effort-, Cache- und Usage-Regeln, Jev, ADHD-Antwortstil, Apple-HIG-Skill, Videoproduktion aus
  Transkript, Anbieternamen und Preise. Siehe `CREDITS.md`, Abschnitt „Version 4.11". Versionen: Plugin 4.11.0,
  Regelwerk 2.14.0, Bauablauf 2.11.0.
- **07.10.2026, Version 4.10.0** Zehn weitere Videos des Kanals Self-Made Web Designer, als
  Erweiterungspaket geliefert (Abgleichmatrix mit 35 Themen) und umgesetzt. **Widerspruch behoben:**
  `02-design-ux.md` und `26-geschmack-und-ki-tells.md` führten das F-Muster als Maßstab, die
  Nielsen Norman Group beschreibt es als schädliches Scanverhalten auf unstrukturierten Seiten.
  Jetzt ist es ein Fehlerbild, das Struktur verhindert, auch in der Checkliste `conversion-audit.md`.
  Neu: Kapitel `36-kundenpsychologie-erwartung-reiz-begruendung.md`,
  `37-stilrichtung-nach-kundensprache.md`, `38-scrollvideo-und-einbettungen.md`,
  `39-ki-assets-bewegtbild-und-3d.md`, im Bauablauf `moodboard-und-stylescape.md`, dazu die
  Bausteine unter `assets/vorlagen/scrollvideo/`. Kleine Regeln in bestehenden Kapiteln: Abschnitt
  Buttons und Farbabgleich in 02, Faustwert 60 30 10 in 10, Quellen außerhalb des Webs in 22,
  Gerätekontext aus Kundendaten in 16, Schritt 1.4 Zielkonflikte in 01, Kundendashboard in 13,
  Erinnerungs- und Aufgabentest in 29 und als Schritt 8a in `qa-und-abnahme.md`, Korrekturrunden
  mit Frist in `kundenabstimmung.md`, Stilrichtungsblock im Markenbrief. Zwei neue Prüfungen:
  Konturbutton als Primär-CTA und mehrere Primärbuttons je Sektion in `pruefe-geschmack.mjs`,
  Scrollvideo und Einbettung in `pruefe-motion.mjs`, dazu 26 Tests, insgesamt 217. Drei neue
  Evalfälle (`f-muster-kein-leitbild`, `konturbutton-nicht-primaer`, `scrollvideo-nur-mit-anlass`),
  gemessen mit Δ +0,13, +0,75 und +0,25. In `evals/` außerdem die YAML-Köpfe der Fälle quotiert, ohne
  das lud `claude plugin eval .` den Fall `nicht-beobachtetes-nicht-behaupten` nicht. Nicht übernommen: Einkommens- und Preisbehauptungen, die Behauptung „85
  Prozent sehen nur den Hero", Werkzeugempfehlungen, Studien, Geschäfts- und Karrierethemen (im
  Paket unter `07_OPTIONAL`, nicht im Skill). Siehe `CREDITS.md`, Abschnitt „Version 4.10".
  Versionen: Plugin 4.10.0, Regelwerk 2.13.0, Bauablauf 2.10.0.
- **07.10.2026, Version 4.9.0** Die zehn neuesten Videos des Kanals @bycrawford (Sam Crawford,
  Webdesign), ausgewertet auf Lücken. Das meiste stand schon im Regelwerk (Held, Hierarchie,
  Weißraum, Kontrast, Formulare, Vertrauen am Knopf, Schriften, Mobil, Barrierefreiheit, GEO,
  A/B). Neu: `scripts/pruefe-aktualitaet.mjs` mit 7 Tests (insgesamt 191), QA Schritt 10
  „Aktualität und Eigentum" (Copyright-Jahr dynamisch, Domain und Zugänge beim Kunden, Pflege
  benannt), Vorflugcheck 12 bis 14 (Tauschtest fürs Logo, Blinzeltest, Videotest), die Frage
  „für Besucher oder für uns?" in Abschnitt 6 von Kapitel 26, in `kundenabstimmung.md` Material
  vor Entwurf, Startseite zuerst und der Vorschlag fester Korrekturrunden, in
  `27-redesign-bestand.md` „erst reparieren, dann neu bauen". Nicht übernommen: Studien,
  Prozentwerte und Anekdoten, Werbung für Kurse und Vorlagen. Siehe `CREDITS.md`, Abschnitt
  „Version 4.9". Versionen: Plugin 4.9.0, Regelwerk 2.12.0, Bauablauf 2.9.0.
- **07.10.2026, Version 4.8.0** Viertes Video derselben Referentin („Use Words Like This To Make
  Anyone Respect you"), auf Wunsch unter dem Copywriting, besonders für FAQ und Einwände. Nur die
  Teile, die sich auf geschriebene Seiten übertragen lassen. Neu: Kapitel `35-autoritaet-im-text.md`
  (Weichmacher streichen mit eigener deutscher Liste, Satzleiter Befund vor Grund, Präzision mit
  benanntem Fachwort, Rahmen vor dem Einwand, Fragen als Führung, acht Regeln für Antworten in der
  FAQ), ein weiteres Satzmuster „Weichmacher“ in `deslop-check.mjs` mit zwei Tests, insgesamt 184.
  Verweise in `12-copywriting.md` (auch an der FAQ Stelle), `copy-im-kundenprojekt.md` und
  `SKILL.md`. Nicht übernommen: Körpersprache, Stimme, Schweigen, alle Prozentwerte und Studien,
  „Rule of One“ als Doppelung. Siehe `CREDITS.md`, Abschnitt „Version 4.8“. Versionen: Plugin
  4.8.0, Regelwerk 2.11.0, Bauablauf 2.8.0.
- **06.10.2026, Version 4.7.0** Drittes Video derselben Referentin („Words That SELL"), nur die
  Lücken. Vieles stand schon im Regelwerk (Botschaftsbogen, Einwände, Risiko am Button, ein
  starker Beleg statt vieler, Grenze zur Irreführung) und wird nicht wiederholt. Neu: Kapitel
  `34-ueberzeugungsausloeser.md` (Zielgruppe ohne Vorwurf, Wirkprinzip benennen, realistisch
  behaupten, ruhige Einwandzeile, drei echte Optionen, ehrliche Einschränkung), drei neue Felder
  im Markenbrief (Wirkprinzip, stärkster Beleg, Einschränkung, alle optional), zwei neue
  Satzmuster in `deslop-check.mjs` („Vorwurf an den Leser", „Absolutes Versprechen") mit vier
  Tests, insgesamt 182. Verweise in `12-copywriting.md`, `copy-im-kundenprojekt.md` und
  `SKILL.md`. Keine neue harte Grenze. Nicht übernommen und warum: `CREDITS.md`, Abschnitt
  „Version 4.7". Versionen: Plugin 4.7.0, Regelwerk 2.10.0, Bauablauf 2.7.0.
- **06.10.2026, Version 4.6.0** Zweites Video derselben Referentin (KI Ergebnisse ohne „Slop"),
  nur der Teil, der beim Webseitenbau hilft. Neu: `agentur-website-builder/references/chatbot-auf-der-website.md`
  (nur bei Kundenwunsch: Systemprompt serverseitig, Wissensbasis vom Kunden, keine verbindlichen
  Erklärungen, Gegenprobe, Schutz wie beim Formular, Dienst im Datenschutz), Schritt 9 „Abnahme
  durch einen Menschen" in `qa-und-abnahme.md` mit Punkt in der Definition of Done, Zeile im
  Abschlussbericht, Auslöserzeile in `intake-und-entscheidungen.md`, Chatbot im Dienstekatalog,
  und Punkt 11 „Alltagsprobe" im Vorflugcheck von `26-geschmack-und-ki-tells.md`. Keine neue
  harte Grenze, kein Prüfskript. Nicht übernommen und warum: `CREDITS.md`, Abschnitt „Version
  4.6". Versionen: Plugin 4.6.0, Regelwerk 2.9.0, Bauablauf 2.6.0.
- **06.10.2026, Version 4.5.0** Auf Wunsch aus einem YouTube Video über Durchsetzungskraft in
  kreativen Teams (Joanna Wiebe, Transkript ausgewertet). Neu: Kapitel
  `33-kundenpraesentation-und-feedback.md` im Regelwerk (fünf Stellschrauben fürs Gespräch mit dem
  Kunden, Aussagen statt Geschmack, Ziele, Recherche, Erkenntnis, Entwurf als feste Reihenfolge,
  Rückfrage statt Verteidigung, Lens abgegrenzt von der Lesart, Rollen und Spielregeln für
  Rückmeldung) und `agentur-website-builder/references/kundenabstimmung.md` im Bauablauf
  (Markenbrief-Block für Rollen, Ablauf der Präsentation, Rückmeldungen nach Art einsortieren).
  Verweise in beiden `SKILL.md`, im Fragenkatalog (Frage 9, wer freigibt), im Konzeptgerüst der
  Phase 3 (neuer Kopf: Ziel, Belege, Erkenntnis) und im Abschlussbericht. Keine neue harte Grenze,
  kein neues Prüfskript, kein Evalfall: das Kapitel ist Haltung und Ablauf. Nicht übernommen und
  warum: `CREDITS.md`, Abschnitt „Version 4.5". Versionen: Plugin 4.5.0, Regelwerk 2.8.0,
  Bauablauf 2.5.0.

- **06.10.2026, Version 4.4.0** Auf Wunsch aus einer Recherche, welche Website-Skills gerade
  viel genutzt und besprochen werden. Neu: Kapitel `30-motion-pruefung.md` (Emil Kowalski: soll
  es animieren, Kurven, Dauer unter 300 ms, Review mit zehn Maßstäben), `31-ki-sichtbarkeit-geo.md`
  (Such-, Abruf- und Trainingscrawler, zitierfähige Absätze, `llms.txt` ehrlich eingeordnet),
  `32-ui-details-katalog.md` (Vercel Web Interface Guidelines, nur die Lücken). Zwei neue
  Prüfskripte, `pruefe-motion.mjs` und `pruefe-geo.mjs`; `deslop-check.mjs` erkennt jetzt
  Kontrastfigur, Verneinungsreihe und selbstbeantwortete Frage; `12-copywriting.md` bekommt
  sieben Prüfungen für fertige Texte; `03-technik-performance.md` die frameworkunabhängigen
  Regeln aus Vercels `react-best-practices`; `29-pruefdurchgaenge-und-vokabular.md` den
  Impeccable-Detektor als Zweitmeinung. 55 neue Tests, insgesamt 178. Dabei gefunden und
  behoben: der eigene Sprunglink in `global-basis.css` animierte `top`, jetzt `transform`. Zwei
  Widersprüche zwischen Kowalski und dem bestehenden Motion-System sind entschieden und in
  Kapitel 30 Abschnitt 8 benannt: `--kurve-austritt` ist eine ease-in-Kurve (gilt nur noch für
  dekorative Austritte), `--dauer-normal` mit 0,4 s trägt keine bedienbaren Elemente mehr.
  Die Kommentare in `tokens.css` sind nachgezogen, die Werte nicht. Nicht übernommen und
  warum: `CREDITS.md`, Abschnitt „Version 4.4". Versionen: Plugin 4.4.0, Regelwerk 2.7.0,
  Bauablauf 2.4.0.

- **04.10.2026, Version 4.3.0** Skill `brand-extraktion` von That's it. Marketing aufgenommen,
  aus einem Fork dieses Repositories (ZIP `Skill_Website-main`), der ihn parallel zu 4.2.0
  ergänzt hatte. Neu: `scripts/brand-extraktion.mjs` (Farben, Schriften, Typoskala, Buttons mit
  Hover, Logo der eigenen Bestandsseite, Ablage in `.brand-extraktion/`),
  `scripts/lib/browser.mjs` (Playwright finden, Chromium starten; `pruefe-breakpoints.mjs`
  nutzt sie jetzt auch), `firecrawlBranding()` in `lib/abruf.mjs`, Kapitel
  `agentur-website-builder/references/brand-extraktion.md`, Evalfall
  `brand-extraktion-nur-eigene-marke`, 12 neue Tests, insgesamt 123. Verweise in
  Phase 1, Definition of Done, Kapitel 20 und 27, `firecrawl-recherche.md` und
  `intake-und-entscheidungen.md`. Nicht übernommen: die Aufteilung von `CLAUDE.md` in
  `CHANGELOG.md` und `OFFENE-PUNKTE.md` aus dem Fork, weil das eine eigene Entscheidung ist.
  Der Fork steht auf 4.2.0 ohne das Kapitel 29 (Prüfdurchgänge), das hier bleibt. Versionen:
  Plugin 4.3.0, Regelwerk 2.6.1, Bauablauf 2.3.0.

- **27.09.2026, Version 4.2.0** Neues Kapitel
  `webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`, destilliert aus
  [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0): ein Kurzvokabular
  für Feedback (Lesart, Kritik, Prüfung, Feinschliff, mutiger, ruhiger, bewegen, Satzbild), die
  vier Blickwinkel Überzeugen, Erledigen, Lesen, Erleben, und eine Obergrenze von zwei
  subjektiven Prüfdurchgängen mit Screenshot vor der Übergabe, ausdrücklich getrennt vom
  Beheben von Fehlern, das weiterhin bis zur sauberen Prüfung wiederholt wird. Der Screenshot-
  Durchgang nutzt dieselbe optionale Playwright-Stufe wie `pruefe-breakpoints.mjs`, keine neue
  Abhängigkeit. Referenz in beiden `SKILL.md` ergänzt, Phase 5 in `agentur-website-builder`
  verweist jetzt auf die Grenze. `09-motion-gsap.md` bekommt eine Zeile zum Tastendruck
  (`scale(0.97)` bei `:active`) aus [delphi-ai/animate-skill](https://github.com/delphi-ai/animate-skill),
  dessen übrige goldene Regeln beim Abgleich bereits im bestehenden Motion-System standen,
  Lizenz dieses Repositoriums ungeprüft, es fehlt eine `LICENSE`-Datei. Geprüft und bewusst
  nicht eigenständig integriert: [senlindesign/taste-skill](https://github.com/senlindesign/taste-skill),
  weil dessen Belegmodell für Designextraktion bereits durch die kuratierte Designrecherche aus
  Version 4.0 abgedeckt ist, siehe `CREDITS.md`. Auslöser war ein TikTok-Video, das die vier
  Skills unter den Namen Emil Kowalski, Impeccable, Taste und Playwright nannte.
- **23.09.2026, Version 4.1.0** taste-skill (Leonxlnx, MIT, 13 Skills) aufgenommen, als
  Destillat statt als Kopie. Drei neue Kapitel im Regelwerk:
  `26-geschmack-und-ki-tells.md` (Lesart vor dem Plan, drei Regler mit Ausgangswerten je
  Kundentyp, Sperren für Akzent, Form und Thema, Heldenregeln, Sektionsfolge, Katalog der
  Produktionstells, Serifenreflex, Premium-Standardpalette, Vorflugcheck, und eine Tabelle mit
  allem, was bewusst nicht übernommen wurde), `27-redesign-bestand.md` (Modus erkennen, was
  sich nie still ändert, Hebel in Reihenfolge) und `28-ki-bildentwuerfe.md` (ein Bild je
  Sektion, Sperren aus `marke.json` im Auftrag, Auswertung mit Belegmarkierung, Treue per
  Screenshot, und was ein generiertes Bild nie ist). Neues Prüfskript
  `scripts/pruefe-geschmack.mjs`, `pruefe-platzhalter.mjs` findet zusätzlich ausgelassenen
  Code. Zwei harte Grenzen geschärft statt neu angelegt: die Handschrift bekommt mit
  Kicker-Quote und Laufbandgrenze einen messbaren Teil, das Verbot erfundener Belege gilt
  ausdrücklich für Logos, Stock- und KI-Bilder und Text aus Entwürfen, dazu der Evalfall
  `keine-attrappen-als-beleg`, noch nicht gelaufen. `marke.json` bekommt den optionalen Block
  `gestaltung` (Lesart, Regler, Sperren). In `09-motion-gsap.md` ein Abschnitt zu Pinning bei
  `top top` und `overflow-x: clip`. 21 neue Tests, insgesamt 111. Die Originale bleiben
  außerhalb der Voreinstellung im Installer, weil sie Platzhalterfotos von Drittservern,
  fremde Logos per CDN und „organische" erfundene Zahlen empfehlen. Die unbelegten Zahlen aus
  ihrem Ordner `research/` sind nicht übernommen.
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
