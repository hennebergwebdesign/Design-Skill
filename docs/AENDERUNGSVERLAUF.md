# Design-Skill: Änderungsverlauf

Ausgelagert aus CLAUDE.md, Inhalt unverändert. Nur gezielt nach dem betroffenen Bereich suchen, nicht komplett lesen. Neue Einträge hier oben anfügen.

## Änderungsverlauf

- **26.11.2026, ohne Versionsänderung, Bibliothek t99 bis t111, Screenshots und genannte Webseiten** Auf Wunsch des Inhabers 13 weitere Vorlagen, parallel von Agenten nach einem gemeinsamen Auftrag gebaut (Prinzip statt Kopie, eigene Farbe, Schrift, Text, Bild und Marke). **Nach drei Screenshots (Tor 1 durch Nennung):** t99 Labor (Patholab), t100 Ärztevertretung (Repasse), t101 Reinigung, t102 Pflegedienst (Heritage Home Health), t103 Zahnarzt (Smilifye). **Nach sieben genannten Adressen, je Startseite mit Playwright bei 1440 und 390 Pixel erfasst, nichts gespeichert:** t104 tipalti.com, t105 mojek.money, t106 possiblefinance.com, t107 rocket-saas.io, t108 dropship.io, t109 contiant.com, t110 ideapeel.com; dazu t111 heavn-one.webflow.io (Webflow Template, keine Webflow Klassen im Ergebnis). Hauptbranche je Vorlage in `KARTE.json`. **Gemessen:** je Vorlage bei 390 und 1440 Pixel ohne Konsolenfehler und ohne Überlauf, bei reduzierter Bewegung alles sichtbar, Tab Durchlauf mit sichtbarem Fokus, `bibliothek-conversion.mjs` (13 Seiten, 0 Fehler, 0 Warnungen), `pruefe-striche` ohne Befund, `pruefe-geschmack` und `pruefe-motion` je Vorlage ohne Fehler; Kontrast der Textpaare von den Agenten gerechnet und in `marke.css` und `INFO.md` eingetragen. **Skripte angepasst:** `bibliothek-conversion.mjs` und `bibliothek-vorschau.mjs` erkannten nur zweistellige Nummern (`/^t\d\d$/`), das erste Argument `t103` hätte alle Vorlagen statt t103 geprüft; jetzt `\d{2,3}`. Galerie auf 111 Karten, 39 neue Vorschaubilder. **Bewusst umgedreht** (Kapitel 26): farbige Akzentwörter, Zierstriche, Pillen, Fremdlogos und Bewertungsleisten der Referenzen. **Ungemessen / offen:** Kontrast von Text über Fotos nur über Verläufe geschätzt, Safari, Screenreader, echte Geräte, Leistung der pinnenden Bühnen (t109, t110, t111). Die Bewegung ist aus Beobachtung geschätzt, nicht Bild für Bild erfasst. **Fotos:** es gibt in der Bibliothek keine Fotos zu Labor, Pflege beim Hausbesuch, Zahnbehandlung, Ärzten mit Laptop; dort stehen Beispielfotos anderer Themen oder eigene SVG und HTML Oberflächen, viele ohne Nachweis schon in den Ursprungsvorlagen. **Rechtstexte** (Labor, Pflege, Zahnarzt, Vermittlung, Zahlung, Kredit, Händlerdaten, Rückgabe) sind nicht rechtlich geprüft. Abschlussdurchgang am selben Tag: Kicker in t100 und t102 auf das erlaubte Maß gekürzt (`pruefe-geschmack` ohne Fehler), `:hover`-Bewegung in t101, t102, t103, t105, t108 in `@media (hover:hover) and (pointer:fine)` gelegt (`pruefe-motion` meldet ohne Fehler, übrig sind lange dekorative Dauern und einzelne Hover in verschachtelten Regeln), Browserlauf aller 13 bei 390 und 1440 Pixel normal und reduziert ohne Fehler, Überlauf oder versteckte Inhalte, Galerie ohne kaputtes Bild; Tests 368 von 369 bestanden (kein Fehlschlag), `pruefe-skill` ohne Fehler. Offene Einzelpunkte je Vorlage in `INFO.md`; bekannt: t104 und t108 Bänder, `scroll-margin-top` fehlt bei schwebenden Kopfleisten (t105, t106, t107, t108), t108 Produktreihen ohne Pause Schalter (WCAG 2.2.2 im Projekt prüfen), `wa.me` als Platzhalterlink auf einen Fremdserver in t101. Kein Evalfall.
- **26.11.2026, ohne Versionsänderung, Bibliothek t76, t90, t96, erzeugte Produktbilder** Auf Wunsch des Inhabers sollten die Bilder der Pinterest Screenshots "1:1" übernommen werden (Ladeinfrastruktur, Lampen, Smartwatch). **Nicht geschehen, Grund:** Auflösung (Screenshots 190 bis 740 Pixel breit, Ausschnitt 3 bis 7 mal zu klein), unbekannte Rechte, keine Adressen der Quellen. Der Inhaber hat **"neu erzeugen"** gewählt: Bilder mit Figma `generate_image` (28 Erzeugungen auf seinem Starter Plan), Produkte per Farbschlüssel freigestellt (Chroma Grün, Skript im Arbeitsordner, nicht im Repository, Repository bleibt ohne Python), in t76 Säule, Stecker, Auto, Hand, Säulenreihe, in t90 acht Lampen, Held, Regal, Film Poster, in t96 vier Gehäusefarben, Teile, Szene eingebaut, Bewegung angepasst (Ebenenwechsel Produkt und Großschrift, Zähler auf dem Display, Konfigurator über Bildwechsel). Kennzeichnung "KI erzeugt" je Bild in `BILDER.md`. **Gefunden:** `bibliothek-conversion.mjs` verwarf das erste Argument (`t76` prüfte alle Vorlagen), behoben. **Ungemessen:** Kontrast von Text über den neuen Fotos, Rechte und Kennzeichnung erzeugter Bilder, Safari. **Offen:** das Auto in t76 und die Uhr in t96 ähneln bekannten Produkten (Tesla Model 3, Apple Watch), vor Livegang prüfen; in t90 liegt die Heldlampe mobil großenteils hinter dem Text; die anderen 27 Vorlagen aus t69 bis t98 tragen weiter fachfremde Beispielfotos oder SVG Formen.
- **26.11.2026, ohne Versionsänderung, Bibliothek t69 bis t98, Pinterest Screenshots** Auf Wunsch des Inhabers 30 weitere Vorlagen nach Pinterest Screenshots (Sportclub, Videotool, Koch App, Wellness, Finanz App, Finanzsoftware, Logistik, Ladeinfrastruktur, Weiterbildung, Gehaltssoftware, Podcast, Kreativagentur, Sanitär, Tennis App, Tennisclub, Agrartechnik, Praxis für mentale Gesundheit, Bauunternehmen, Personal Training, Reisebüro, Rad App, Leuchtenshop, Innenarchitektur, Zahnarzt, Kfz Werkstatt, Küchenstudio, KI Gadget, Smartwatch Zubehör, Finanzberatung, IT Beratung), parallel von bis zu 16 Agenten nach einem gemeinsamen Auftrag gebaut, Prinzip statt Kopie, keine Adresse und keine Lizenz zu den Quellen (siehe `HERKUNFT.md`). **Neu:** `scripts/bibliothek-conversion.mjs` prüft das Conversion Raster je Seite (auf ausdrücklichen Wunsch des Inhabers: immer prüfen). Ergebnis am 26.11.2026: alle 30 Vorlagen (30 Seiten) ohne Fehler und ohne Warnung, `pruefe-striche` ohne Befund, Galerie mit 98 Karten ohne kaputtes Vorschaubild und ohne Konsolenfehler, 294 Vorschaubilder erzeugt. Bei t84 blieb mobil eine Karte der Wischspur unsichtbar (Selbstfund bei der Abnahme, behoben). Arbeitsweise geändert: Der Inhaber hat die Arbeit **direkt auf `main`** freigegeben. **Bewusst umgedreht** (KI Tells nach Kapitel 26): farbige Akzentwörter, Pillen hinter Wörtern, kursive Serifenzeilen, handschriftliche Unterstreichung, Violettverlauf. **Gemessen:** je Vorlage bei 1440 und 390 Pixel ohne Konsolenfehler und ohne Überlauf, bei reduzierter Bewegung alles sichtbar, `pruefe-striche`. **Ungemessen:** Kontrast von Text über Fotos, Safari, Screenreader, echte Geräte, Leistung der Scrollbühnen, Bewegung (aus Standbildern geschätzt). **Offen:** Die Bibliothek hat keine Fotos zu Tennis, Rad, Auto, Zahnbehandlung, Luftbild, Lampen und Hardware, dort stehen Beispielfotos anderer Themen oder eigene SVG Formen; bei mehreren Fotos fehlt der Nachweis schon in den Ursprungsvorlagen. Rechtstexte (Psychotherapie, Zahnarzt, Finanzen, Bildung, Reise, Shop, Hardware mit Kamera) sind nicht rechtlich geprüft. Kein Evalfall.
- **25.11.2026, ohne Versionsänderung, Bibliothek t01 bis t68, Formeln je Seite ausgeführt** Auf Wunsch des Inhabers die Conversion Formeln nicht als allgemeinen Platzhalter, sondern je Seite natürlich an Branche, Ansprache und Layout angepasst (sechs Agenten): H1 nach Zielgruppe, Problem und Lösung (Länge höchstens 30 Prozent über der alten, bei Großwort-H1 in t04, t06, t36, t66 steht die Formel in der Unterzeile), Unterzeile, ein branchenspezifischer Primär-CTA an allen Stellen, Titel und Beschreibung nach Formel mit „Musterstadt“, FAQ und Formular auf die Branche, Beleglabels als Beispiel, Held-Kommentar je Seite, `INFO.md` Abschnitt „Conversion (Playbook)“ je Vorlage. Neue FAQ-Abschnitte in t33, t42 v3, t51, t53, t54 v3, t55 (die Lückenliste zählte Leistungs-Akkordeons als FAQ, geprüft wird jetzt zusätzlich von Hand). Gemessen: 390 und 1440 Pixel ohne Konsolenfehler; Helden angesehen, Seiten darunter großenteils nur auf Überlauf geprüft. **Offen:** Texte (Finanz, Recht, Arzt, Heizung und Elektrik) fachlich und rechtlich nicht geprüft, `deslop-check` nur stichprobenartig; t34 v2 H1 berührt das rechte Bogenbild; t47 und t56 Kopfknopf mobil zweizeilig; t55 und t07 Unterzeile auf Foto mobil mit schwachem Kontrast, nicht gemessen; t25 ohne Primär-CTA im Held; t09 Held-Text über dem Foto jetzt mit Verlauf lesbar gemacht (Eingriff in `stil.css`).
- **25.11.2026, ohne Versionsänderung, Bibliothek t01 bis t68, Conversion Playbook** Auf Wunsch des Inhabers das Website Conversion Playbook 2027 (That's it. Marketing, 31 Seiten) auf alle 79 Seiten der Bibliothek angewendet, **je im eigenen Stil der Vorlage** (neue Regeln nur in deren `stil*.css`), sechs Agenten parallel, gegengeprüft mit einer Lückenliste (Titel, Beschreibung, Kopf-CTA, FAQ, Telefon, Felderzahl, Feldhinweise, Navigation, Bildgewicht): alle 79 ohne Lücke. Ergänzt: Einwand-FAQ in rund 25 Vorlagen, Formulare auf höchstens 5 Felder, Feldhinweise, Primärknöpfe in der Kopfzeile (t29, t38, t47 v3, t57, t59, t66), Telefonlinks, Belegzeilen im Held (als Beispiel markiert), Menüs auf höchstens 6 Punkte, Heldformel als Kommentar, 39 Bilder unter 200 KB (10,8 auf 5,5 MB). **Nicht übernommen:** F-Muster (Fehlbild nach Kapitel 26), Exit-Intent-Popup, Kennzahlen und Prozentwerte des Playbooks. **Durchgang über alle 79 Seiten am 25.11.2026:** bei 390 und 1440 Pixel ohne Konsolenfehler und ohne Überlauf durch die Ergänzungen, Tab-Durchlauf (40 Stopps) mit sichtbarem Fokus außer bei Eingabefeldern in t28 (Link), t29, t34, t66 (Rahmen statt Outline, vorbestehend, nicht nachgemessen); FAQ und Mobilmenüs von t46, t48, t53 v2, t54 v2, t57, t59, t62, t66 und die Helden von t42 v3 und t47 v3 angesehen. Vorbestehend und nicht behoben: Telefonlinks und Kicker unter 16 px in t15, t19, t21, t24, t25, t26, t32, t37, t56, Knöpfe unter 44 px in t13, t31, t32, t42 v3. **Ungemessen / offen:** Kontrast von t28 und einigen Belegen über Bild nicht gemessen; t40 `.held__text` liegt vorbestehend bei etwa 3,3 zu 1; t47 v3 Pausenknopf sieht im Screenshot ungewöhnlich aus; die Beispielantworten sind rechtlich nicht geprüft (Kanzlei, Arzt). Das Playbook nennt Zahlen ohne Quelle (Absprung nach Ladezeit, Folgen je Fehler), keine ist übernommen. Kein Evalfall, kein neues Prüfskript.
- **25.11.2026, ohne Versionsänderung, Bibliothek t34 bis t68, Varianten** 35 weitere Vorlagen nach 41 freigegebenen Webflow Referenzen (Gastro, Beauty, Finanz, Software, Beratung, Kanzlei, Praxis, Fitness), parallel von acht Agenten nach einem Auftrag gebaut, Prinzip statt Kopie. **Neu: Varianten.** Mehrere Startseiten einer Referenz sind ein Template mit wählbaren Varianten (`index.html`, `v2.html`, `v3.html`, gemeinsame `marke.css`), Auswahl in `ansicht.html` (`?t=…&v=…`), Abzeichen in der Galerie, neue Filter Gastro und Beauty. Varianten: t34, t38, t42, t47, t53, t54, t56, t64. Gemessen: 390 und 1440 Pixel ohne Überlauf und Konsolenfehler, `pruefe-striche` ohne Befund. Ungemessen: Kontrast über Bildern, Safari, Screenreader. Bewegung aus Standbildern geschätzt, nur Startseiten erfasst, keine Stockbilder. Bekannt: `scroll-margin-top` fehlt bei schwebender Kopfleiste (t67, t68), t60 wächst ein Bild über `clip-path`, Oberflächenbilder in t48 bis t50 haben unter 16 px Text. Kein Evalfall, kein neues Prüfskript.
- **25.11.2026, ohne Versionsänderung, Bibliothek t29 bis t33** Fünf weitere Vorlagen nach freigegebenen Referenzen (wilun, escapora, klener, roofex, airstead), Prinzip statt Kopie, Erfassung über Bildschirmaufnahmen des Inhabers und Playwright. Gemessen: 390 und 1440 Pixel ohne Überlauf und Konsolenfehler, `pruefe-striche` ohne Befund. Ungemessen: Kontrast über Bildern, Safari, Leistung. Stockbilder sind **nicht** eingebaut: Unsplash, Pexels und Pixabay sperren automatisierte Browser aus der Cloud, der Ablauf steht als Prompt in `bibliothek/BILDSUCHE-PROMPT.md` und braucht einen Browser auf dem Rechner des Inhabers.
- **24.11.2026, Version 4.26.0** Template-Bibliothek unter `skills/webdesign-conversion/assets/vorlagen/bibliothek/`: zwölf eigenständige, branchenneutrale Startseiten (`t01` bis `t12`) mit gemeinsamer Basis (`_basis/`: selbst gehostete Schriften, `basis.css`, `bewegung.js`, `marke.css`) und Galerie (`index.html`). Auf Wunsch des Inhabers nach zwölf Referenzseiten, **als Prinzip nachgebaut, nicht als Kopie**: Aufbau, Raster, Sektionsfolge und Art der Bewegung übernommen, Text, Bild, Code, Schrift und Farbe eigen (Grund und Rechtslage in `HERKUNFT.md`). Die Erfassung lief mit Playwright, Desktop und Mobil. Zusatzskills: `references/zusatzskills.md` und `install-quellskills.sh --zusatz` (vier Skills, fontpool nur mit Zustimmung; claude-seo, designer-skills, MengTo/Skills nicht). **Gemessen:** alle zwölf bei 390 und 1440 ohne Überlauf und ohne Konsolenfehler, `pruefe-striche` ohne Befund. **Ungemessen:** Kontrast über Bildern und Verläufen, Rand der Eingabefelder, Safari, Screenreader, echte Geräte, Leistung. Bekannt: `t06` nicht gefüllte Überschriftwörter (Schätzung 3,5 zu 1), `t04` Verlaufstext im Großwort, `t08` Videoknopf ohne Funktion, Formulare senden nichts, Platzhalterbilder nur Verläufe. Kein Evalfall, kein neues Prüfskript (`pruefe-tokens` passt nicht auf diese Bibliothek, es erwartet das `tokens.css`-System). Versionen: Plugin 4.26.0, Regelwerk 2.29.0, Bauablauf 2.25.0.
- **24.11.2026, Version 4.25.0** Auf Wunsch des Inhabers: Ergebnisse zu schwach, zu viele Überarbeitungen, zu viele Token. Analyse in `evals/token-analyse.md`
  (gemessen: Zeichen und Zeilen, geschätzt: Token). Neu: Kapitel `57-erstentwurf-kern.md` (Lesebudget, Startseite zuerst, Landingpage direkt, Protokoll ohne Wartestopp, Grundaufbau,
  Anti-Slop-Regelsatz mit 21 Regeln als Gate vor dem Schreiben), `assets/branchenprofile.json` (15 Branchenprofile mit Richtung, Hauptaktion, Regler, Farbstimmung, Schriftcharakter,
  Bildwelt, Held, Folge für Startseite und Landingpage, Belege, Fehlbilder, freigegebene Referenzen), `scripts/branchenprofil.mjs` (liefert nur ein Profil, 12 Tests). Bauablauf: Schnellpfad,
  Phase 0 installiert keine Zusatzskills mehr vorab, `referenzen-und-auswahl.md`, Intake und QA nicht mehr „immer". **Entschieden:** (1) Das Branchenprofil ersetzt beim Erstentwurf die Referenzrecherche
  je Entwurf (Auslegung der harten Grenze, Grund im Kapitel); Tor 1 bleibt für neue Seiten. (2) `ui-ux-pro-max` (MIT) ist destilliert, nicht installiert; die Stilnamen Glassmorphism, Liquid Glass,
  Neumorphism, Dark Mode OLED und Vibrant und Block sind nicht übernommen (Tells). (3) `awesome-design-skills` (MIT, 67 Stile) ist nicht eingebunden, nur auf Kundenwunsch einzeln. (4) `claude-seo`
  (MIT, Python, viele API Anbindungen) ist nicht eingebunden; übernommen nur der Hinweis, dass `FAQPage` kein Google Rich Result mehr erwarten lässt (Quelle nennt 07.05.2026, **nicht gegen Google
  geprüft**), deshalb in den Playbooks optional. Die Aussagen der Quelle zu `HowTo` und weiteren Typen sind nicht geprüft. **Ungemessen:** die Ersparnis an Token und Runden, Regler und Folgen der Profile,
  Farb- und Schriftvorschläge (nie als Seite gebaut). Kein Evalfall. Versionen: Plugin 4.25.0, Regelwerk 2.28.0, Bauablauf 2.25.0.
- **23.11.2026, Version 4.24.0** Auf Hinweis des Inhabers: ein gelber Strich vor dem Kicker („━━ Hersteller aus Bielefeld, seit 2005") ging auf einer Kundenseite live, obwohl die Regel gegen Striche vor dem Kicker
  schon in `SKILL.md` stand. **Zwei Ursachen, beide behoben.** (1) `12-copywriting.md` erlaubte ausdrücklich „einen kurzen Balken in Akzentfarbe" als Präfix und widersprach damit der harten Grenze; die Ausnahme ist gestrichen,
  erlaubt bleibt nur ein runder Punkt. (2) `pruefe-striche.mjs` las nur Zeichen (`–`, `—`), kein CSS: der Strich war ein `::before` mit leerem content und sah für die Prüfung wie nichts aus. Neu: Prüfung 5, Zierstrich,
  dateiweit über CSS (`::before` und `::after` an Kicker- und Überschriftselektoren, leerer content, Höhe bis 8 px, Breite mindestens doppelt so groß wie die Höhe, Fläche oder Rand), Markup (leeres Strichelement als erstes
  Kind eines Kickers oder direkt davor) und Tailwind (`before:` und `after:` mit Breite, Höhe und Fläche). Am Kicker Fehler, an einer Überschrift Warnung; Punkt, Menüunterstreichung und Vollflächenverlauf bestehen.
  Auch `content: '—'` am Kicker ist ein Fehler. 11 neue Tests, insgesamt 357. Eintrag im Katalog der KI-Tells (`26-…`). **Gegengeprüft** an der Kundenseite: der alte Stand von `global.css` wird als Fehler gemeldet, der
  bereinigte Stand besteht. **Nicht geprüft:** Striche aus Hintergrundbildern, SVG und `border-image`, ein Strich als eigenes Element mit beliebigem Klassennamen (nur Wörter wie strich, balken, line, bar, rule, divider),
  Komponentenbibliotheken, die den Strich erst zur Laufzeit erzeugen. Kein Evalfall. Versionen: Plugin 4.24.0, Regelwerk 2.27.0, Bauablauf 2.24.0.
- **09.11.2026, Version 4.23.0** Auf Wunsch des Inhabers zwei Dinge eingearbeitet. **(1) Slop Detect** (`ravidsrk/slop-detect`, MIT), um KI-Muster zu vermeiden und vor der Übergabe zu messen. Destilliert
  und als Aufruf eingebunden, nicht kopiert (Konvention „Fremde Skills werden destilliert", kein `package.json`): Kapitel `55-slop-detect-ki-muster-vermeiden.md` (fünf Achsen, Vermeideliste für den Entwurf mit Gegenmitteln,
  was über Kapitel 26 hinausgeht, Entscheidungstabelle für Konflikte), `agentur-website-builder/references/slop-pruefung.md` (Zeitpunkte, Aufruf, Schwellen, Ausnahmen mit Grund, Behebungsschleife, Bericht) und
  `scripts/pruefe-slop.mjs` (startet den Original-CLI lokal, wendet die Agenturgrenzen an). **(2) Tracking aus dem Projekt Gewerbestrom** (`Thatsitmarketing/gewerbestrom`, Wehbe Group, eigenes Kundenprojekt der Agentur,
  Code und `CLAUDE.md` gelesen, keine Kundendaten, keine Pixel-ID und keine Domain übernommen) als fester Arbeitsablauf, der mit dem Satz „wir wollen Tracking einführen" anläuft: Kapitel
  `56-tracking-umsetzung-einwilligung-ereignisse.md` (Wissen), `agentur-website-builder/references/tracking-einbauen.md` (Fragen, Trackingplan, Schritte, Abnahme, was der Agent nie tut),
  `assets/tracking/tracking-client.ts` und `meta-capi.ts` (Vorlagen für Astro und Cloudflare Pages) und `scripts/pruefe-tracking.mjs`. Auslöser in der `description` des Bauskills, in
  `intake-und-entscheidungen.md`, in `SKILL.md` (Bauschritt 6 und Referenztabelle), in `consent-und-dienste.md` und `formulare-und-resend.md`. **Entschieden:** (1) `pruefe-slop.mjs` lehnt `--remote` und `--api` ab, weil sie die Adresse
  einer Kundenvorschau an `slop-detect.com` schicken. (2) Ein Lauf ohne Bewertung ist Exit 2, nie sauber; der CLI meldet das ohne `--fail-on` nur im JSON und beendet sich mit 0. (3) Ausnahmen nur mit Begründung in
  `slop-ausnahmen.json`, eine Markenvorgabe trägt eine Ausnahme, eine Zwischenlösung nicht. (4) Der Original-Skill von Slop Detect ist nicht voreingestellt, der Befehl steht kommentiert im Installer. (5) Die
  Zählmeldung ohne Einwilligung, im Projekt Gewerbestrom eine Kundenentscheidung und dort an, ist in der Vorlage **aus** und wird nie vom Agenten eingeschaltet. (6) UTM-Parameter bleiben im Arbeitsspeicher statt in
  `sessionStorage`. (7) Der Agent ändert nie ein Werbekonto (im Projekt Gewerbestrom ausdrücklich pausiert). **Nicht übernommen:** die Plattformen des Werkzeugs (MCP-Server, GitHub Action, Netlify- und Lighthouse-Plugin,
  Vale-Regeln, Hosting-API), die Backoffice-, Close- und Funnelteile von Gewerbestrom, der Meta-Ads-MCP. Gefunden: die npm-Fassung 0.8.0 liegt hinter dem Repository (27 statt 45 Muster, kein `--craft`), und der
  Playwright-Chromium muss zur Version des CLI passen. Gewerbestrom besteht `pruefe-tracking.mjs` ohne Fehler. 23 neue Tests, insgesamt 346. Versionen: Plugin 4.23.0, Regelwerk 2.26.0, Bauablauf 2.23.0.
  Siehe `CREDITS.md`, Abschnitt „Version 4.23".
- **11.10.2026, Version 4.22.0** Auf Wunsch des Inhabers sechs Quellen eingearbeitet, alle MIT: `ItsssssJack/SlopMonster`, `cloudflare/security-audit-skill`, `citrolabs/ego-lite`, `morluto/rea`,
  `vercel-labs/skills`, `stablyai/orca`. Alle destilliert oder beschrieben, nichts mitgeliefert, die Originale nur als Befehle im Installer. **Eingearbeitet:** Kapitel 51 Abschnitt 7a (Kontext vor den Mustern,
  Zweitdurchgang durch ein Modell anderer Herkunft, Prüfwert ist kein Urteil) mit der Vorlage `textueberarbeitung-zweitmodell.md`; `sicherheitspruefung.md` Abschnitt 6a (Beratung gegen Vollprüfung, drei Befundstufen,
  Schweregradanker, neun Prüfregeln, Prüfklassen für Clientseite und Auslieferung); `browser-pruefung-mit-playwright-cli.md` Abschnitt 6a (ego-browser); `firecrawl-recherche.md` (REA, mit Grenze);
  `arbeitsdisziplin.md` Abschnitte 9a (fremde Skills vor der Installation prüfen) und 9b (parallele Arbeit in getrennten Arbeitsbäumen, Gestaltungsmodus). **Entschieden:** (1) Der Zweitdurchgang durch ein anderes
  Modell ist erlaubt, aber nur mit Wissen des Kunden und Auftragsverarbeitung; SlopMonsters `cleanse.sh` wird nicht mitgeliefert, weil es Text ohne menschliche Entscheidung an einen Anbieter schickt. In Version 4.18 war
  SlopMonster als Pflichtwerkzeug ausgeschlossen; das bleibt, es ist jetzt als Ablauf destilliert. (2) Der Strich bleibt verboten, auch wenn die Quelle ihn als angemessene Zeichensetzung ansieht. (3) Der Prüfwert von
  `deslop-check.mjs` ist ein Hinweis, keine Sperre der Auslieferung. (4) Die Cloudflare-Disziplin gilt für die Prüfung von Hand und für den Tiefenscan; der volle Sechs-Phasen-Ablauf nur auf ausdrücklichen Auftrag. Die eigene
  Vorschau mit Testdaten bleibt Prüfumgebung, die Produktionsadresse des Kunden ist nie Ziel. (5) ego-browser ist ein Ausnahmewerkzeug für Aufgaben, die eine echte Anmeldung brauchen; Standard bleiben Skript und `playwright-cli`.
  Die App ist Closed Source, deshalb entscheidet die Agentur vor dem Einsatz mit Kundenkonten über das Vertrauen. (6) REA wird nicht zum Nachbauen fremder Funktionen genutzt; das widerspricht Tor 1, Tor 2 und „Prinzip, nie Kopie".
  (7) Kein Agent installiert einen Skill ohne Zustimmung des Nutzers. **Nicht übernommen:** `deslop.py`, `cleanse.sh`, die Beispiele von SlopMonster; sechs Phasen, Deckungsbuch, JSON-Schema und Prüfskripte von
  Cloudflare; die Klartext-API und die Benchmarks von ego lite; Werkzeugkatalog und Fallstudien von REA; Agententabelle von `skills`; Anwendung, Koordination und Umgebungen von Orca. Kein Skript, kein Evalfall, 322 Tests
  unverändert. Versionen: Plugin 4.22.0, Regelwerk 2.25.0, Bauablauf 2.22.0. Siehe `CREDITS.md`, Abschnitt „Version 4.22".
- **11.10.2026, Version 4.21.0** Auf Wunsch des Inhabers sieben Quellen eingearbeitet: `nateherkai/scroll-craft` (MIT), `blader/humanizer` (MIT),
  `addyosmani/agent-skills` (MIT), `anthropics/claude-plugins-official` → `claude-security` (**proprietär, nicht übernommen**), `stripe/ai` →
  `stripe-best-practices` (MIT), `microsoft/playwright-cli` (Apache-2.0), `heygen-com/hyperframes` (Apache-2.0). Alle destilliert, nichts
  mitgeliefert, die Originale nur als Befehle im Installer. **Neu im Regelwerk:** `50-scroll-erlebnis-grammatik-und-gefuehl.md` (acht
  Seitengrammatiken mit Verboten, Gefühlskurve, ein Gipfel, Erzählsatz, Signaturbewegung, Fingerabdruck-Register mit Tor vier von sechs, Tiefe im
  Held, Prüfen durch Scrollen), `51-text-entmaschinisieren.md` (Muster in sechs Gruppen auf Deutsch, Ablauf in vier Schritten, Stimme, wann nicht
  eingreifen), `52-sicherheit-der-kundenseite.md`, `53-zahlungen-mit-stripe.md`, `54-video-aus-html-mit-hyperframes.md`. **Neu im Bauablauf:**
  `arbeitsdisziplin.md` (Annahmen, Verwirrung melden, widersprechen, dünne Scheiben, Belege, nach Quelle bauen, Zweifel-Durchgang nur für
  Sachentscheidungen, Kontext führen), `browser-pruefung-mit-playwright-cli.md`, `sicherheitspruefung.md`, `zahlungen-umsetzung.md`, dazu
  `assets/stripe/`. **Neue Prüfungen:** `pruefe-sicherheit.mjs` (24 Tests; hinter zwei neuen harten Grenzen: keine Geheimnisse im Repository, im
  Browser oder im Chat weiterverwenden; bezahlt ist, was der Webhook bestätigt), `pruefe-scrollstrecke.mjs` (12 Tests, davon fünf im Browser),
  sechs neue Satzmuster und eine Wortliste in `deslop-check.mjs` (12 Tests), insgesamt 322 Tests. Vier Evalfälle, nicht gelaufen. **Entschieden:**
  (1) Das Plugin `claude-security` ist nicht kopierbar (Lizenz), also nur beschrieben. (2) Gehostetes Checkout ist der Standard der Agentur, weil
  dann kein Stripe-Skript auf der Kundenseite läuft und keine Einwilligung nötig wird; die Quelle empfiehlt eingebettet oder Payment Element.
  (3) Der Zweifel-Durchgang aus agent-skills gilt nur für Sachentscheidungen, nie als dritter Geschmacksdurchgang (die Grenze von zwei aus Kapitel
  29 bleibt). (4) Schreibprobe des Kunden schlägt die Humanizer-Muster, aber nicht die Strichregel und nicht die Regel gegen erfundene Angaben;
  gerade Anführungszeichen statt deutscher sind nicht übernommen. (5) Kapitel 41 erlaubt HyperFrames jetzt als Agenturwerkzeug ab etwa 10
  Sekunden und mehreren Szenen oder Formaten, darunter bleibt eine HTML-Datei. (6) Die Lebende-Oberfläche-Grammatik behält die Kernbotschaft im
  ersten Bildschirm (Kapitel 45), und die Grammatik „Durchgehende Welt" braucht einen statischen Rückfall. (7) Erfassen mit `playwright-cli`,
  `hyperframes capture` oder Firecrawl unterliegt Tor 1 der Designrecherche. (8) Annahmen aussprechen ergänzt den gebündelten Fragenkatalog,
  statt ihn durch eine Frage nach der anderen zu ersetzen. **Nicht übernommen:** die Engine von scroll-craft, ihr Bildgenerator `kie.ai`, die
  zehn Beispielseiten; die Skills `talking-head-recut`, `slideshow` und weitere von HyperFrames; Connect, Treasury, Metronome, Apps und die
  Sandbox-Anlage per CLI von Stripe; SQL-, Auth- und SSRF-Muster als Regeln eines Datenbankprojekts; die 24 übrigen Skills und neun Befehle von
  agent-skills; die englischen Wortlisten des Humanizer. Gefunden: das Eval `generator-kosten-vorab` enthält absichtlich einen Schlüssel der Form
  `sk_live_…`, den `pruefe-sicherheit.mjs` bei einem Lauf gegen dieses Repository meldet (das Skript läuft gegen Kundenprojekte, nicht gegen
  dieses). Versionen: Plugin 4.21.0, Regelwerk 2.24.0, Bauablauf 2.21.0. Siehe `CREDITS.md`, Abschnitt „Version 4.21".
- **11.10.2026, Version 4.20.0** Paket „Video Analyse für Skill Repo" (ein Video von Joanna Wiebe über Storytelling, acht
  Prinzipien mit Selbsttest, Transkript und zwölf Frames), gegen 4.19.0 abgeglichen und destilliert. Das meiste stand schon
  (Botschaftsbogen in 12, offene Schleifen in 45, Belege früh, Vorwurf an den Leser in 34, Konkretheit als Prüfung 5 in 12).
  Neu: Kapitel `49-geschichte-im-text.md` (Erwartung im ersten Satz, die Lage aufbauen, Wortbilder mit Augen-zu-Probe, Struktur
  nach Zielgefühl, Job je Zeile, Gegner in vier Schritten, Zuckerguss, Anfang und Schluss spiegeln, Sammelprobe in sechs
  Schritten), Verweise in 12, 35, 45, `SKILL.md` und `copy-im-kundenprojekt.md`. **Entschieden:** Hook und offene Frage gehören
  in Erzählstellen, nicht in den Held; der Gegner ist eine Lage, nie ein benannter Mitbewerber (§ 6 UWG) und nie der Leser;
  eine Kundengeschichte nur mit echtem, freigegebenem Fall, sonst als typischer Ablauf gekennzeichnet; Strichregel des
  Repositories gilt statt „gar keine Bindestriche". Nicht übernommen: die drei Prozentzahlen, Theorienamen, Beispielclips,
  Werbung. Kein Skript, kein Evalfall. Versionen: Plugin 4.20.0, Regelwerk 2.23.0, Bauablauf 2.20.0.
- **06.11.2026, ohne Versionsänderung, Menüseiten und Abstände** Zweiter Durchgang zur dritten Freigaberunde: alle 54 Hauptseiten aus den Menüs der sechs Referenzen (ohne Blog, News, Ratgeber; von 15 gleichen Branchenseiten bei FLO-CORP zwei) komplett geladen, langsam durchgescrollt und als Video aufgenommen, Desktop und Mobil, 108 Aufnahmen. Danach im Browser gemessen: Abschnittsabstände, Seitenrand, Abstand unter Überschriften, Karten, Knöpfe, Kopfzeile, Schriftgrößen und Zeilenhöhen. Neuer Abschnitt „Abstände und Seitensystem" in `referenzen-und-auswahl.md` mit zwei Messtabellen, Folgerungen und einer Tabelle zu den Unterseiten. Befunde: fünf Seiten nutzen 58 px und 23 px Seitenrand (Squarespace-Standard, 4 % und 6 % der Breite), unser `--rand-seite` ergibt 44 px und 19 px; `--raum-sektion` (96 und 48 px) trifft die Messung. Bei Electric Car Scheme springt die H1 in der ersten Sekunde von einer Ersatzschrift um. Tokens nicht geändert. Videos nicht im Repository.
- **06.11.2026, ohne Versionsänderung, dritte Freigaberunde** Sechs Seiten vom Inhaber zur Aufnahme genannt (Tor 1): `electriccarscheme.com`, `teifmoreaux.com`, `danscryptomastermind.com`, `siliconhillstalent.com`, `pennywise.org`, `flo-corp.com`. Erstmals eigene Erfassung statt Textauswertung: Playwright, Desktop 1440 und Mobil 390, ganze Seite und Bildschirm für Bildschirm gescrollt, Farben, Schriften, Überschriften und Knöpfe aus den berechneten Stilen, Kontraste nachgerechnet. Eingetragen in `referenzen-und-auswahl.md` je mit Lage, Sektionsfolge, Farbe und Schrift, Prinzipien und Ausschlüssen, dazu eine Tabelle „Gemeinsame Befunde" und zwei neue Gruppen in der Ausgangsliste. **Entschieden:** Dan's Crypto Mastermind gilt nur als Strukturvorbild für Angebote mit hoher Hürde, Ton und Renditeversprechen ausdrücklich nicht. Befunde aus der Erfassung: hochzählende Kennzahlen zeigen auf vier Seiten falsche Werte, solange die Animation nicht durchgelaufen ist; drei Seiten lassen beim Einblenden ganze Sektionen leer; vier von fünf Squarespace-Bannern haben kein gleichrangiges Ablehnen; nur drei von sechs zeigen auf Mobil einen CTA im ersten Bildschirm. Keine Regel im Regelwerk geändert, kein Skript, kein Evalfall. Screenshots nicht im Repository (fremdes Bildmaterial). Nicht in der Musterbibliothek, Design DNA und Mustervergleich nicht gelaufen (Tor 2 offen).
- **11.10.2026, ohne Versionsänderung, zweite Freigaberunde** Referenzliste mit 44 Einträgen (Awwwards, Land-book, Dribbble, Webdesign Inspiration, als PDF, Textauswertung ohne eigene Erfassung, Mobil nirgends getestet) ausgewertet, zehn Favoriten vorgelegt, der Inhaber hat nach dem Durchklicken drei freigegeben (Tor 1): `mdccinc.com`, `vs-epple.de`, `driessenarchitectuur.nl`. Eingetragen in `referenzen-und-auswahl.md` mit Prinzipien, Ausschlüssen und der Begründung des Inhabers, dazu in der Ausgangsliste. Nicht in der Musterbibliothek (Tor 2 offen). Die übrigen 41 Einträge sind nicht freigegeben und nicht abgelehnt; die Liste liegt nur im Gespräch, nicht im Repository. Aus der Liste nicht übernommen: Prozentwerte aus Dribbble-Fallstudien (unbelegt) und die Empfehlung „übernehmen" für Clinika (kursives Serif-Akzentwort und Glaskarten sind Tells nach Kapitel 26).
- **11.10.2026, ohne Versionsänderung** Zusätzlich `hookagency.com` und `beetogreen.com` vom Inhaber als gute Designquellen freigegeben (ohne eigene Begründung, Prinzipien aus meiner Textauswertung). Erste Referenzfreigabe durch den Inhaber (Tor 1): `comradeweb.com` als freigegebene Referenz mit Prinzipien und Ausschlüssen in `referenzen-und-auswahl.md`, neun Seiten ausdrücklich abgelehnt und aus der Ausgangsliste entfernt (metriccivil.ca, mercury.com, become-a-yogi.com). Nur aus der Textauswertung beschrieben, Optik nicht gesehen, kein Crawl, nicht in der Musterbibliothek (Tor 2 offen).
- **09.10.2026, Version 4.19.0** Paket „Webdesign Workflow 2026" (ein Skillordner mit elf Referenzen, drei Skripten,
  Wortliste und Szenarien, dazu 27 Quellnotizen zu Videos über Webdesign mit Claude, Claude Design und Skills), gegen 4.17.0
  abgeglichen und destilliert, nicht als dritter Skill mitgeliefert, obwohl das Paket das vorschlägt. Das meiste stand
  (Interview, zwei Tore, Grammatiktabelle, Gap Audit, Polierschleife mit Latte, Pilot, Tweaks Panel, Blinzeltest,
  Änderungsauftrag, KI-Tells, Consent). Neu: Kapitel `48-richtung-varianten-und-subtraktion.md` (Struktur mit Zuständen,
  Richtungen und Varianten in zwei Stufen mit Preiszeile, Subtraktionsrunde, Fehlermodi nach dem Bau mit Stresstest und
  Erzählbruch, Prüfer ohne Vorwissen, Signaturbewegung, Rechner nur mit echten Formeln, elf entschiedene Widersprüche und ein offener),
  Vorlagen `varianten.md` und `pruefprompts.md`, Ebenenansicht im Tweaks Panel, `gestaltung.richtungswahl` in `marke.json`,
  Ergänzungen in 04, 05, 22, 26 (drei Tells, Vorflugcheck 16 und 17), 39 (Standbilder und Entwurfsauflösung vor Bewegung,
  Musik und Stimme), 44 (Ordnung der Sammlung) und im Bauablauf (Hook, Fehlermodi und Subtraktion als Schritt 8b,
  Asset Inventar in `BILDER.md`, Interviewfragen, Zählung der Änderungsrunde, Wireframe nur bei Auslöser, fremde Inhalte
  sind Daten, zweites Modell nur mit Auftragsverarbeitung, Textbeispiele in der Projekt-`CLAUDE.md`). Skripte:
  `pruefe-striche.mjs` meldet den Bindestrich mit Leerzeichen und läuft mit `--hook` als PostToolUse-Hook,
  `pruefe-geschmack.mjs` meldet getippte Logoleiste, kursives Akzentwort, Violettverlauf und Glasflächen,
  `pruefe-geo.mjs` Bilder ohne `alt` (Fehler), `pruefe-kontrast.mjs --paare` freie Farbpaare, `deslop-check.mjs` die
  runde Kundenzahl und fünf Floskeln. Neues `pruefe-skill.mjs` für den Aufbau dieses Repositorys, damit 60
  Inhaltsverzeichnisse angelegt und drei tote Verweise auf `moodboard-und-stylescape.md` in 37, 39 und 43 korrigiert. Tests
  von 239 auf 264. **Entschieden:** ein Markenbrief statt `design.md` und `copy.md`, `[[FEHLT]]` statt „Bestätigen", kein
  Tor 3, Zählung statt einer Änderung je Auftrag, Schriftpaarungen mit gesperrten Schriften nicht übernommen. Gefunden:
  die Korrektur des Pakets auf „watchships.com" ist falsch (Ferienwohnung), `whatships.com` stimmt; dafür war
  `styles.referero.design` ein Tippfehler für `styles.refero.design` (beides am 09.10.2026 per Seitentitel geprüft).
  Evalfall `varianten-mit-preis`, gemessen, misst nichts (siehe Offene Punkte). Versionen: Plugin 4.19.0,
  Regelwerk 2.22.0, Bauablauf 2.19.0.
- **10.10.2026, Version 4.18.0** Paket „Claude Design Hacks" (Video von Jack Roberts, 09.10.2026, und die Seite „The Claude
  Design Blueprint": 15 Hacks, 15 Prompts, 47 Vorlagen) samt dem Skill „design-loop", gegen 4.17.0 abgeglichen und
  destilliert. Das meiste stand (Referenzclip und Storyboard in 41, Grammatik und Gap Audit in 42, Mobbin und Refero in 22,
  Schriftsperre in 10 und 26, 3D-Szene in 38, Kritiker in 40). Neu: Kapitel `47-claude-design-hacks.md` (Prompt-Gerüst
  R I S E, `DESIGN.md` als abgeleitete Fassung von `marke.json`, Remix je Sektion, fünf Versionen, Ein-Bildschirm-Test,
  Fünf-Agenten-Prüfung mit Fix-Liste und GO, Mikrobewegung, Plakat in Code, Abbildung des Design-Ordners auf vorhandene Teile,
  Regel „jede Korrektur wird als Regel festgehalten"), Abschnitt 3c in Kapitel 40 (Design Loop: Interview, Preflight,
  `bar.md`, drei Kritiker mit Bestanden oder Nicht bestanden), Tabelle „Galerien je Sektion" in 22, Vorlagen unter
  `assets/vorlagen/` (`prompts/design-loop.md`, `fuenf-agenten-pruefung.md`, `fuenf-versionen.md`, `abschnitt-remix.md`,
  `DESIGN.md`, `motion/`, `plakat/`). Eine Prüfung: `pruefe-seitenbasis.mjs`, der statische Teil der Fünf-Agenten-Prüfung
  als Node-Skript (Fehler: lang, Viewport, Zoom, Alt, Label, Fremdserver), 10 Tests, insgesamt 249. **Entschieden:** der
  Design Loop ist **kein dritter Skill**, sondern eine Variante der Polierschleife (zwei Skills, Wissen und Ablauf getrennt);
  Bestanden oder Nicht bestanden gilt für diese Variante, aber die **Durchlaufgrenze bleibt** (Vorschlag fünf Runden), die
  Quelle kennt keine; `preship.py` ist nicht mitgeliefert, weil das Repository ohne Python bleibt, die Punkte sind in Node
  nachgebaut; feste 8-Punkt-Abstände der Quelle nicht übernommen (fließende Tokens), Google Fonts und unpkg nur im Entwurf,
  nie in der Auslieferung; die englischen Prompts der Quelle sind ins Deutsche übertragen; der Design-Ordner `design-os/`
  wird nicht angelegt, weil Markenbrief, Referenzregister und Prüfskripte dieselben Schichten bereits tragen. Nicht
  übernommen: Zahlen des Videos, Werbung für Kurse, Scroll Film Studio, Slop Monster als Pflichtwerkzeug, der Ausgabestil
  ELI5 (betrifft Antworten an den Auftraggeber, nicht die Seite). Kein Evalfall. Versionen: Plugin 4.18.0, Regelwerk 2.21.0,
  Bauablauf 2.18.0.
- **08.10.2026, Version 4.17.0** Skillpaket `webcopyseo` (Router, neun Referenzen, sechs Agenten, ein Python-Prüfer,
  aus rund 35 Videos zu Copywriting, Verkaufspsychologie, Conversion, SEO, lokalem SEO, GEO und Kritikschleifen),
  gegen 4.16.0 abgeglichen und destilliert, nicht mitgeliefert. Das meiste stand (Bogen, Botschaftshierarchie,
  Einwände, Preisanker, drei Optionen, Formular, Trust, Keywords, Meta, Schema, GEO, Bewusstseinsstufe,
  Kritikschleife). Neu: Kapitel `46-lokale-sichtbarkeit.md` (drei Orte des lokalen Findens, NAP überall gleich,
  Ortsseiten gegen Brückenseiten, Bewertungsablauf beim Kunden, Verzeichnisse, Prüfliste fürs Unternehmensprofil,
  Messung), Abschnitt 3b in Kapitel 40 mit vier Fachkritikern und einem Bewerter, Vorlage
  `assets/vorlagen/prompts/textkritik.md`, in 01 die Herkunft des Besuchers als Hinweis auf seine Stufe und die
  Umfrage beim Kunden, in 12 „die Headline entsteht zuletzt", in 05 Suchintention aus den ersten zehn Treffern,
  keine Pauschallänge, Bing Webmaster Tools, in 06 kleiner Schritt vor dem großen und Angebot für noch nicht
  Kaufbereite, in 13 Testreihenfolge und Hypothesensatz, Ortsfelder im Markenbrief, im Bauablauf NAP und
  Übergabe des Profils in `qa-und-abnahme.md`, Auslöser im Intake, Verweis in `google-bewertungen.md`. Eine
  Prüfung: `pruefe-geo.mjs` meldet fehlenden Titel (Fehler), zu langen Titel, fehlende oder zu lange
  Beschreibung, doppelte Titel über Seiten und ein LocalBusiness-Markup, dessen Telefon oder Straße nicht
  sichtbar ist (Warnungen), 8 Tests, insgesamt 239. **Entschieden:** die Bindestrich-Hausregel der Quelle
  („Email", „Call to Action") ist nicht übernommen, die Strichregel bleibt (Gedankenstrich nein, Bindestrich im
  Kompositum ja); die Rubrik mit 100 gewichteten Punkten und Schwelle 90 ist durch Fächer mit je 1 bis 10 und
  Schwelle 8 ersetzt, weil gewichtete Summen Genauigkeit vortäuschen (31) und Schwächen verdecken; „Hero nicht
  über den ganzen Bildschirm" widerspricht der harten Grenze und ist nicht übernommen; Kritiker als eigene
  Agentendateien nicht mitgeliefert. Nicht übernommen: Zahlen aus Herstellerstudien, Werkzeugnamen,
  `learning.md` (dafür gibt es die eigene Sammlung aus 44 und `evals/modellwechsel.md`). Kein Evalfall.
  Versionen: Plugin 4.17.0, Regelwerk 2.20.0, Bauablauf 2.17.0.
- **08.10.2026, Version 4.16.0** Wissenspaket zum Video „Opus 5.5: Webdesign macht ENDLICH wieder Spaß" von Alex
  Sprogis (28.09.2026, vier Schritte: Inspiration, Designsystem in Claude Design, Assets, GSAP und Three.js), dazu
  Kritik aus den Kommentaren und eigene Ergänzungen des Paketautors, gegen 4.15.0 abgeglichen. Das meiste stand
  (Referenzen und Tor 1, Designsystem vor Entwurf, KI-Assets, Scrollvideo, Storyboard, Heldenidee, Consent). Neu
  in Kapitel 38: Ausgangspunkt nach Art des Auftrags (Marke und Kampagne gegen Handwerk und Praxis), Abschnitt 1a
  Erlebnisidee vor Effekt mit drei Ideen im Konzept, Abschnitt 5a eigene 3D-Szene mit Three.js (schlank, spät
  geladen, Inhalt im HTML, reduzierte Bewegung, kein WebGL, Tastatur), Abschnitt 6a Parallax über Tiefenkarte.
  In Kapitel 24 die Stufe eines Designsystems aus Claude Design nach Herkunft, in 22 Mobbin über MCP nur nach
  Tor 1 und Lummi mit Prüfpflicht. Im Bauablauf: ungefragte Ergänzungen und Codeaufräumen in `qa-und-abnahme.md`
  Schritt 8, kleine Schritte bei Erlebnissektionen in `aenderungsrunden-und-layoutschutz.md`, Three.js in den
  Agenturvorgaben nur mit freigegebener Erlebnisidee, Erlebnisideen im Konzept, Claude Design in Phase 1. Eine
  Prüfung: `pruefe-motion.mjs` meldet `three` ohne `prefers-reduced-motion` (Fehler) und statisch importiert
  (Warnung), 4 Tests, insgesamt 231. **Entschieden:** viele kleine Schritte (Video) gegen einen gebündelten
  Auftrag (4.15) gelöst nach Art der Änderung; Kommentare im Code, die einen Grund nennen, bleiben, nur
  wiederholende raus; ein aus einer Beschreibung erzeugtes Designsystem ist keine Stufe 1. Nicht übernommen:
  Stack des Autors, Cookiebot als Sponsor, Nachbau einer ausgezeichneten Seite, „das Modell beendet den KI-Look".
  Kein Evalfall. Versionen: Plugin 4.16.0, Regelwerk 2.19.0, Bauablauf 2.16.0.
- **08.10.2026, Version 4.15.0** Wissensbasis zu einem zehnstündigen Kurs von Jakub Papert (verkaufsstarke
  Websites mit Claude, 18 Dateien), gegen 4.14.0 abgeglichen. Das meiste stand (Bogen, ein Ziel, Kicker,
  Bildentwürfe, Belege, Startseite zuerst). Neu: Kapitel `45-huerde-laenge-und-leserfuehrung.md` (Hürde der
  Handlung bestimmt Länge und Sektionsfolge in drei Stufen, Belege früh und zweimal, „andere Wege" nur über
  Lösungsarten wegen § 6 UWG, informative Überschriften, offene Schleifen mit sechs Regeln, Satzband und
  Stakkato, „kostenlos" bei Premium, Überarbeitung eines KI-Entwurfs), Schritt 1.5 „Recherche vor dem Text"
  in Kapitel 01 mit Feldern im Markenbrief, Abschnitt 3a in Kapitel 28 (Varianten für eine gebaute Sektion),
  fünf Tells in Kapitel 26, im Bauablauf `aenderungsrunden-und-layoutschutz.md` mit Block für die
  Projekt-`CLAUDE.md`, Seitengewicht in `qa-und-abnahme.md` Schritt 5, Abschnitt zu Modellentwürfen in
  `copy-im-kundenprojekt.md`. **Harte Grenze erweitert:** Plus Jakarta Sans in der Schriftsperre, und die
  Sperre hat jetzt eine Prüfung: `pruefe-geschmack.mjs` meldet alle sieben Schriften ohne Markenvorgabe
  (vorher prüfte kein Skript die Grenze). Außerdem zählt die Pille über der Überschrift als Kicker, und
  `deslop-check.mjs` kennt das Satzmuster „Stakkato". 7 neue Tests, insgesamt 227. **Zehn Widersprüche
  entschieden,** Tabelle in Kapitel 45 Abschnitt 10, darunter: Layout vor Text nicht übernommen, Montserrat
  und Inter für Coaches nicht übernommen, Playfair und Cormorant nur mit Begründung, „Apple-Animationen"
  nicht als Auftrag. Nicht übernommen: Akquise, Verkaufsgespräch, Preise, Hosting außerhalb des Stacks,
  Werkzeug- und Sitzungsregeln. Kein Evalfall. Versionen: Plugin 4.15.0, Regelwerk 2.18.0, Bauablauf 2.15.0.
- **07.10.2026, ohne Versionsänderung** Paket `skill-pflege-und-modelltests` (ein Video von Nate Herk mit Aussagen
  von Boris Cherny, Community Hinweise getrennt) aufgenommen als Pflegeverfahren für dieses Repository, nicht
  als Regelwerk für Kundenprojekte: neue Datei `evals/modellwechsel.md` (Ablauf, Entscheidungstabelle,
  Schutzliste, Grenzen, leeres Änderungsprotokoll), Konvention in dieser Datei, Verweis in `evals/README.md`.
  Die Evals mit Baseline sind der Lauf A und B des Pakets, deshalb kein neues Werkzeug. **Entschieden:** Das
  Paket empfiehlt zu löschen, was ohne Skill gleich gut klappt. Für Pflichten, harte Grenzen und Agenturvorgaben
  gilt das nicht, ein schwacher Fall wird verschärft statt die Regel gestrichen. Nicht übernommen: Zahlen zur
  Kürzung von Systemprompts, die Erwartung, dass Löschen pauschal besser wirkt, der Rat aus der Softwareentwicklung
  für Orchestrierung. Kein Skillinhalt geändert, deshalb keine neue Version. Siehe `CREDITS.md`.
- **07.10.2026, Version 4.14.0** Erweiterungspaket aus drei Videos (Jay E, Jack Roberts: 25 Tricks, Slop,
  Konsistenz), gegen 4.13.0 abgeglichen. Der größte Teil stand seit 4.11.0 (Galerien als Kandidaten, Schriften,
  Iconpakete, Polierschleife, Komponenten, Tweaks Panel, Wettbewerbermuster). Neu: Kapitel
  `44-gutes-festschreiben-und-rueckbauprobe.md` (Rückbauprobe in sieben Schritten, Pilot vor Serie,
  Figurenwelt mit Asset Inventar, was der Mensch entscheidet, Erklärung nach der Schleife, eigene
  Referenzbibliothek), in `copy-im-kundenprojekt.md` der Zweitdurchgang mit anderem Modell und fünf
  Prinzipien mit Gegengewicht, Stimme und Zeitstempel in 41, Pilot in 39 (3b), Savee und Fonts In Use als
  Kandidaten in 22. **Entschieden:** Die Rückbauprobe gilt auf eigenem, freigegebenem Material, eine fremde
  Referenz nur nach Tor 1 und Tor 2. Ein Skill „im Stil einer bekannten Marke" ist wegen der harten Grenze zur
  Markenextraktion nicht übernommen, Regeln landen in `marke.json` und im Markenbrief. Screenshots einer
  eigenen Sammlung sind intern. „Eine Aussage je Bildschirm" gilt, die Kernbotschaft bleibt im ersten
  Bildschirm. Nicht übernommen: bezahlte Angebote der Autoren, Zahlen, das Designkommando und der Apple Skill
  (ungeprüft). Keine harte Grenze, kein Skript, kein Evalfall. Versionen: Plugin 4.14.0, Regelwerk 2.17.0,
  Bauablauf 2.14.0.
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
