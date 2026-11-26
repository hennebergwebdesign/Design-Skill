# Design-Skill: Offene Punkte

Ausgelagert aus CLAUDE.md, Inhalt unverändert. Lesen, wenn offene Arbeit gesucht wird oder bevor ein Thema neu angefasst wird.

## Offene Punkte

- Die Bibliothek trägt Beispielfotos (Unsplash) auch für Personen und Szenen. Beispielfotos (Unsplash) vor Abgabe ersetzen, Nachweis je Vorlage in `bilder/BILDER.md`.

- Version 4.26.0: Die Bibliothek ist branchenneutral. Branchenvarianten (Farbe, Bildwelt, Folge nach `branchenprofile.json`) sind nicht gebaut. Kontrast über Bildern und Verläufen und Eingabefeldränder sind nicht nachgemessen.
- Version 4.23.0: Kapitel 55, `slop-pruefung.md`, Kapitel 56, `tracking-einbauen.md`, `assets/tracking/`, `pruefe-slop.mjs` und `pruefe-tracking.mjs` sind an keinem Kundenprojekt erprobt, die zwei neuen
  Evalfälle (`slop-vor-auslieferung-pruefen`, `tracking-nur-nach-einwilligung`) sind **nicht gelaufen**, das Δ ist eine Vermutung. **Gelaufen ist:** der Original-CLI von Slop Detect in der npm-Fassung
  0.8.0 (Definitionen 2026.09, 27 Designmuster, 9 Textmuster, kein `--craft`) gegen zwei kleine Testseiten (Heavy 66, Clean 0) und `pruefe-slop.mjs` gegen diesen CLI; dazu die Tests von
  beiden Skripten (23) und `pruefe-tracking.mjs` gegen den Quelltext des Projekts Gewerbestrom (kein Fehler, sechs Warnungen wegen fester IDs in statischem HTML). **Nicht gelaufen:** die 2026.11-Muster
  (45 Design, 26 Text, 9 System, 11 Handwerk, 16 Auffindbarkeit) sind nach `spec/patterns.md` und `spec/copy-axis.md` des Repositories übernommen, nicht gemessen; der Original-Skill, die Hosting-API, `.sloprc.json`,
  die Fix-Rezepte (`fixes.ts`) und der Quelltext des CLI sind **nicht gelesen** (gelesen: README, `spec/patterns.md`, `spec/copy-axis.md`, `docs/CLI_GUIDE.md`, `skills/slop-detect/SKILL.md`, `schemas/`). Die
  Schwellen der Agentur (Heavy als Fehler, Mild als Warnung, höchstens drei Durchläufe) und die Zuordnung der Gegenmittel sind eigene Überlegungen. Die bereinigte Punktzahl nach einer Ausnahme ist eine Näherung.
  Offen: ob die Textachse bei deutschem Text je etwas Brauchbares liefert (der Motor kennt englische Prosa), ob ein Lauf gegen die Vorschau von Astro stabil ist (späte Hydration, Schriftladen), und ob die npm-Fassung
  nachzieht, damit `--craft` und die 45 Muster verfügbar sind. **Tracking:** Die Vorlagen sind vom TypeScript-Compiler (strikt) geprüft, nie gegen Meta, einen Browser oder Cloudflare gelaufen; die Graph-Version
  `v21.0` ist die des Projekts und kann veraltet sein. Alle Aussagen zum Verhalten von Meta stammen aus der Projektdokumentation von Gewerbestrom, nicht aus einer neuen Prüfung. **Der rechtliche Teil ist
  nicht anwaltlich geprüft.** Offen: ob die Zählmeldung ohne Einwilligung zulässig ist (in der Vorlage standardmäßig aus, im Projekt Gewerbestrom an), TikTok, LinkedIn, Google Enhanced Conversions und Server-Messung
  für GA4 sind nicht abgedeckt. `pruefe-tracking.mjs` liest mit regulären Ausdrücken und sieht keinen Pixel hinter einem Tag Manager. Der Ablauf „Tracking einführen" ist ein Auslöser in der `description`
  des Bauskills und in `intake-und-entscheidungen.md`; ob der Skill bei dem Satz „wir wollen Tracking einführen" ohne Bauauftrag anspringt, ist ungeprüft.

- Messung vom 06.11.2026: Der Seitenrand aus `--rand-seite` (19 px mobil, 44 px bei 1440) ist schmaler als bei fünf von sechs freigegebenen Referenzen (23 px und 58 px). Offen, ob der Token angehoben wird; die Messung zeigt nur, was die Referenzen tun, nicht was besser konvertiert.
- Referenzrunde vom 06.11.2026 (sechs Seiten in `referenzen-und-auswahl.md`): offen, ob der Befund zu hochzählenden Kennzahlen (Endwert gehört ins HTML, Animation nur sichtbar, bei reduzierter Bewegung gar nicht) als Regel in `09-motion-gsap.md` und als Prüfung in `pruefe-motion.mjs` aufgenommen wird. Bisher steht er nur in der Tabelle „Gemeinsame Befunde". Die Erfassung lief nur gegen die Startseiten, ohne Unterseiten, Tastatur und Ladezeit; Design DNA und Mustervergleich sind nicht gelaufen.
- Version 4.22.0: Der Zweitdurchgang nach `51-…` Abschnitt 7a, die Vorlage `textueberarbeitung-zweitmodell.md`, die Befundstufen in `sicherheitspruefung.md` 6a, der Abschnitt 6a zu
  `ego-browser`, die REA-Beschreibung in `firecrawl-recherche.md` und die Abschnitte 9a und 9b in `arbeitsdisziplin.md` sind an keinem Projekt erprobt, kein Evalfall, das Δ ist eine Vermutung. Es gibt
  keine neue harte Grenze und kein neues Skript, deshalb auch keine neue Prüfung. **Nichts davon ist ausgeführt:** weder `npx skills`, `ego-browser`, `rea-agents` noch Orca sind in dieser Umgebung gelaufen;
  `ego lite` läuft nur unter macOS. Gelesen sind: SlopMonster `SKILL.md`, `references/principles.md`, `references/signs-of-ai-writing.md`, `prompts/cleanse.txt`, Anfang der `README.md`
  (nicht `tools/*`, nicht `references/sources.md`, nicht die Beispiele); Cloudflare `SKILL.md`, `README.md`, `ATTACK-CLASSES.md`, `CLIENT-SIDE.md`, `CLOUD-AND-DEPLOYMENT.md`, Anfang von
  `VALIDATION-AND-REPORTING.md` und `SUPPLY-CHAIN-AND-RELEASE.md` (nicht `HUNTING.md`, `RECONNAISSANCE.md`, die übrigen Begleitdateien, Schema, Prüfskripte); ego-lite `README.md`, `AGENTS.md` (Anfang), `SKILL.md`
  (bis Dialoge und Popups) (nicht `references/`, `spec/`, `docs/`, Paketquelltext); REA `README.md` (Anfang bis FAQ) und `DISCLAIMER.md` (nicht `docs/`, nicht der Quelltext); vercel-labs/skills `README.md` (bis zur
  Agententabelle) und `skills/find-skills/SKILL.md`; Orca `README.md` und die Wegweiser `orchestration`, `orca-cli`, `orca-per-workspace-env` (nicht `skill-guides/`, nicht `docs/`). **Closed Source:** die App
  von ego lite; was sie mit übernommenen Chrome-Daten tut, ist nicht prüfbar. Die Zuordnungen zu Kapitel 48, 40 und den Änderungsrunden in 9b sind eigene Überlegungen. Dass `npx skills add
  hennebergwebdesign/design-skill` beide Skills dieses Repositories findet, ist abgeleitet und ungeprüft. Die Faustwerte für Installationen und Sterne (1.000, 100) sind Angaben von `find-skills`, nicht geprüft.
  Die Aussage der Cloudflare-Quelle, ein Lauf finde etwa die Hälfte dessen, was wiederholte Läufe finden, und der Vergleich von ego lite mit `agent-browser` (bis zu 2,5-mal schneller) sind Herstellerangaben.
  Das Skript `deslop-check.mjs` ist nicht erweitert: SlopMonster bewertet gestapelte Bindestrich-Komposita und Semikolondichte, was im Deutschen kein Merkmal ist.
- Version 4.21.0: Die Kapitel 50 bis 54, `arbeitsdisziplin.md`, `browser-pruefung-mit-playwright-cli.md`, `sicherheitspruefung.md`,
  `zahlungen-umsetzung.md`, die Vorlagen `fingerabdruecke.md`, `zahlung-rechtsbausteine.md` und `assets/stripe/` sind an keinem Projekt
  erprobt, das Δ ist eine Vermutung. Die vier neuen Evalfälle (`schluessel-im-chat-nicht-verwenden`, `zahlung-im-webhook-erfuellen`,
  `grammatik-statt-schablone`, `text-entmaschinisieren-ohne-erfinden`) sind **nicht gelaufen**. **Die Stripe-Vorlagen sind nie gegen eine
  Sandbox oder eine SDK-Version gelaufen**; `createFetchHttpClient`, `createSubtleCryptoProvider`, `custom_text`, `consent_collection` und
  `integration_identifier` sind nach der Quelle beschrieben. **Der rechtliche Teil von Kapitel 53** (Button-Lösung, Widerruf, Preisangaben,
  Kündigungsbutton, elektronische Widerrufsfunktion nach Richtlinie (EU) 2023/2673 ab 19.06.2026) ist eigene Zusammenstellung, nicht
  anwaltlich geprüft, die Umsetzung der Richtlinie in deutsches Recht nicht nachgelesen. `pruefe-sicherheit.mjs` liest mit regulären
  Ausdrücken: Schlüssel in anderen Formaten, zusammengesetzte Zeichenketten und Logikfehler sieht es nicht, Treffer in Base64-Blöcken von `dist/`
  sind möglich. `pruefe-scrollstrecke.mjs` erkennt tote Strecke über identische Bilder, nicht über Bedeutung (gewollte Stille sieht aus wie ein
  Defekt) und läuft nur mit Playwright; gegen ein echtes Kundenprojekt ist es nicht gelaufen. Die sechs neuen Muster in `deslop-check.mjs` sind
  gegen Testsätze geprüft, nicht gegen Kundentexte. **HyperFrames, `playwright-cli`, `scroll-craft`, `humanizer` und `agent-skills` sind in
  dieser Umgebung nicht ausgeführt**, die Befehle stammen aus ihren READMEs und Skills (Stände: scroll-craft 30.09.2026, humanizer 27.09.2026,
  agent-skills 10.10.2026, stripe/ai 11.10.2026, playwright-cli 28.09.2026, hyperframes 11.10.2026). Gelesen sind von den Quellen: scroll-craft
  `SKILL.md` und die Referenzen `uniqueness`, `feel`, `hero-depth`, `verify` (Anfang), nicht `devices`, `worlds`, `worldflight`, `assets`,
  `taste`, `approved-collection` und nicht die Engine; humanizer `SKILL.md` vollständig, nicht README und CHANGELOG; agent-skills `using-agent-skills`, `security-and-hardening`,
  `doubt-driven-development`, `interview-me`, `source-driven-development`, `incremental-implementation`, `context-engineering` (Auszüge), die
  Definition of Done; stripe-best-practices mit `payments`, `security`, `billing`, nicht `connect`, `tax`, `treasury`; playwright-cli `SKILL.md`
  und `README.md`, nicht die Referenzen; hyperframes die Skills `hyperframes`, `hyperframes-core`, `hyperframes-cli`, `hyperframes-creative`,
  `product-launch-video` (Auszug), `determinism-rules`, `house-style`, nicht die übrigen 15 Skills. Das Plugin `claude-security` ist wegen der
  proprietären Lizenz nur beschrieben. Das Hook-Plugin `security-guidance` ist nicht bewertet, seine Lizenz ungeprüft. Die `description` von
  `webdesign-conversion` nennt Sicherheit, Zahlung und Video nicht; ob der Skill bei einer Stripe-Frage ohne Bauauftrag anspringt, ist
  ungeprüft (der Fall `varianten-mit-preis` hat gezeigt, dass die Beschreibung nicht alles trägt). Offen: ob die Agentur Fingerabdruck-Register,
  Geschmackssammlung und Textmuster zentral führt (Kapitel 48 erlaubt zentral ohne Kundendaten).
- Version 4.20.0: Kapitel 49 ist an keinem Projekt erprobt, kein Evalfall, das Δ ist eine Vermutung. Die Proben (Augen zu,
  Job je Zeile, Spiegel entfernen) sind Handarbeit, kein Skript prüft sie. Der Hook im Held ist anders als von der Quelle
  empfohlen **nicht** übernommen (Kernbotschaft im ersten Bildschirm, `45-…` Abschnitt 6); ob das an einer Landingpage
  schlechter konvertiert, ist ungemessen. Die Zahlen des Videos sind ohne Quelle und nicht übernommen. Das zweite Video,
  das die Paketnotiz ankündigt, lag nicht bei und ist nicht ausgewertet.
- Version 4.19.0: Kapitel 48, die Vorlagen `varianten.md` und `pruefprompts.md` und die Ergänzungen im Bauablauf sind an
  keinem Projekt erprobt. Der Evalfall `varianten-mit-preis` ist am 09.10.2026 gelaufen (zwei Läufe je Arm): ohne Skill 1,00,
  mit Skill 0,75, und der Skill wurde **in keinem Lauf aufgerufen**. Zwei Befunde daraus: das aktuelle Modell nennt Preise
  und hält die Marke bei dieser Frage allein, der Fall misst so nichts (verschärfen oder streichen); und die `description`
  von `webdesign-conversion` löst bei „Gestaltungsrichtungen für eine Startseite beschreiben" nicht aus. Die Beschreibung
  ist schon über 1024 Zeichen, eine Ergänzung dort ist nicht die Antwort; zu prüfen ist, ob die Beschreibung kürzer und
  schärfer werden kann. Der Strich-Hook ist gegen die Hook-Eingabe nach der Dokumentation von Claude Code geschrieben und mit
  simulierter Eingabe getestet, nicht in einer echten Sitzung ausgelöst. Die Erkennung des Bindestrichs mit Leerzeichen liest
  in Markupdateien nur Text zwischen `>` und `<`, ein Satz über mehrere Zeilen mit dem Strich am Zeilenanfang bleibt
  unsichtbar. Die Logoleiste erkennt nur Klassen mit logo, kunden, client, partner oder marquee und mindestens drei
  Textelementen. **Offen zur Entscheidung:** Das Paket rät zu höchstens ein bis zwei fremden Skills, und nur als Prüfer;
  Phase 0 installiert als Agenturvorgabe sieben Quellskills (`install-quellskills.sh`). Die Vorgabe ist nicht still
  geändert. Ebenfalls offen aus dem Paket: ob die Geschmackssammlung der Agentur zentral oder je Kunde liegt (Kapitel 48
  erlaubt zentral ohne Kundendaten), und ob das Tweaks Panel in Astro selbst gebaut oder übernommen wird. Das Paket nennt
  das Video von Flux Academy „I Tested Claude Skills for Web Design" und mehrere deutsche Videos als nicht ausgewertet, v25
  nur bis etwa Minute 15 gelesen.
- `pruefe-skill.mjs` prüft Aufbau und Verweise, nicht Inhalte. Die 60 Inhaltsverzeichnisse sind erzeugt, nicht von Hand
  formuliert; sie listen die Abschnitte zweiter Ebene.
- Version 4.18.0: Kapitel 47, Abschnitt 3c in Kapitel 40 (Design Loop) und die Vorlagen `design-loop.md`,
  `fuenf-agenten-pruefung.md`, `fuenf-versionen.md`, `abschnitt-remix.md`, `DESIGN.md`, `motion/` und `plakat/` sind an
  keinem Projekt erprobt, kein Evalfall, das Δ ist eine Vermutung. `pruefe-seitenbasis.mjs` liest HTML mit regulären
  Ausdrücken, nicht mit einem Parser: Felder in Komponenten, die erst im Browser entstehen, und Labels über
  `aria-describedby` sieht es nicht, ein umschließendes Label zählt es nur der Menge nach. Die Fremdserverliste ist
  fest und kennt keine Unterdomains anderer Anbieter. Die `DESIGN.md` ist eine Ableitung von `marke.json`, es gibt kein
  Skript, das sie erzeugt oder gegen `marke.json` prüft. Das Format (Google Labs, Version alpha) und `npx @google/design.md
  lint` sind nicht gelaufen. Die Plakatvorlage ist nicht in Chrome zu PDF exportiert und nicht nachgemessen, die
  Formate und Randwerte sind Stand der Quelle (05.10.2026). Das Skill „Scroll Film Studio" der Quelle fehlt im Paket und
  ist nicht aufgenommen. Die Adressen der Galerien in Kapitel 22 sind ungeprüft und nicht verlinkt. Die 20 Punkte der
  Fünf-Agenten-Prüfung stammen aus einem fremden Repository (power-design), das nicht gelesen wurde.
- Version 4.17.0: Kapitel 46, Abschnitt 3b in Kapitel 40 und die Vorlage `textkritik.md` sind an keinem
  Projekt erprobt, kein Evalfall, das Δ ist eine Vermutung. Die Fachkritiker sind nie als Schleife
  gelaufen, die Schwelle 8 je Fach ist ein Vorschlag. Die neuen Regeln in `pruefe-geo.mjs` sind gegen
  Fixtures geprüft: die Titellänge zählt Zeichen, nicht Pixel; die NAP-Prüfung kennt LocalBusiness und
  eine feste Liste von Untertypen, vergleicht die letzten sieben Ziffern der Telefonnummer und die Straße
  als Text, nicht den Firmennamen und nicht Profil oder Verzeichnisse. Die Zahlen der Quelle (Whitespark
  Report, Bewertungsziele, 24 Stunden, SparkToro, Ahrefs) sind nicht geprüft und nur als Vorschlag
  oder gar nicht übernommen. Der Python-Prüfer der Quelle ist nicht mitgeliefert.
- Version 4.16.0: Die Abschnitte 1a, 5a und 6a in Kapitel 38 sind an keinem Projekt erprobt, keine
  Three.js-Vorlage, kein Evalfall, das Δ ist eine Vermutung. `pruefe-motion.mjs` erkennt nur Importe von
  `three` und `three/...`, nicht Pakete wie `@react-three/fiber` oder eine Einbindung per Script-Tag, und
  sieht nicht, ob Inhalt nur im Canvas steht. Ob „design sync" Änderungen aus dem Code nach Claude Design
  zurückträgt, ist ungeprüft. Lummi und der MCP-Server von Mobbin sind Namen aus dem Video, ungeprüft. Die
  Kritik an Mobilleistung, Barrierefreiheit und Codeumfang stammt aus Zuschauerkommentaren, nicht vom Autor.
  Mit Abschnitt „Ein Designsystem aus Claude Design" in Kapitel 24 ist der offene Punkt zum Henneberg Design
  System für Kundenprojekte entschieden (keine Stufe, fremde Marke), für eigene Auftritte bleibt er offen.
- Version 4.15.0: Kapitel 45, Schritt 1.5 in Kapitel 01, Abschnitt 3a in Kapitel 28 und
  `aenderungsrunden-und-layoutschutz.md` sind an keinem Projekt erprobt, kein Evalfall, das Δ ist eine
  Vermutung. Die Sektionsfolgen für hohe Hürde und Kauf mit Vorwissen stammen aus drei Builds eines
  Autors im US-Markt. Die Stakkato-Erkennung in `deslop-check.mjs` zählt Satzzeichen und meldet auch
  eine gewollte Folge kurzer Sätze. Die Schriftprüfung in `pruefe-geschmack.mjs` findet Schriften in
  `font-family`, `fontFamily`, Tokens `--schrift-*` und `--font-*`, Fontsource und Google-Fonts-Adressen,
  nicht in einer Tailwind-Konfiguration über mehrere Zeilen. Die Pillenerkennung kennt die Klassen
  badge, pill, pille, chip und `rounded-full` mit `text-xs` oder `text-sm`. Die zwei Regeldateien des
  Kursautors sind nicht gesehen, die Regeln im Bauablauf sind Rekonstruktionen. Das Limit von 25 MiB
  je Datei bei Cloudflare Pages ist am 08.10.2026 gegen die Herstellerdokumentation geprüft.
  Ob Akquise und Verkaufsgespräch einen eigenen Skill bekommen, ist offen.
- Pflegeverfahren (`evals/modellwechsel.md`): noch nie gelaufen, das Änderungsprotokoll ist leer. Die Frist von
  sechs Monaten ist ein Vorschlag. Die Aussagen des Videos über Modelle und Systemprompts sind nicht geprüft.
- Version 4.14.0: Kapitel 44 ist an keinem Projekt erprobt, kein Evalfall, das Δ ist eine Vermutung. Die
  Rückbauprobe hat kein Skript: `design-dna.mjs` liefert nur die Werte für Schritt 2, den Nachbau und den
  Vergleich macht ein Mensch mit dem Modell. Dass ein anderes Modell weniger Muster des ersten übernimmt, ist
  eine Aussage der Videos, ungemessen. Die Aussagen der Videos sind Erfahrungswerte der Autoren.
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

