# Design-Skill: Befehle

Ausgelagert aus CLAUDE.md, Inhalt unverändert. Lesen, wenn ein Prüfskript, Werkzeug, Test oder die Eval Suite gebraucht wird.

## Befehle

```bash
# Prüfskripte, laufen gegen ein Kundenprojekt, nicht gegen dieses Repository
node scripts/pruefe-claudemd.mjs            # CLAUDE.md und AGENTS.md: Ziel unter 8 KB, Obergrenze 10 KB
node scripts/pruefe-striche.mjs              # Zeichen, Bindestrich mit Leerzeichen, Zierstrich vor dem Kicker (CSS, Markup, Tailwind), mit --hook als PostToolUse-Hook, Einrichtung in qa-und-abnahme.md, 2a
node scripts/pruefe-tokens.mjs
node scripts/pruefe-kontrast.mjs             # --paare kontrast-paare.json für Paare außerhalb der Rollen
node scripts/pruefe-platzhalter.mjs --launch  # auch data-tweaks-panel, das Reglerpanel darf nie live
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
node scripts/pruefe-geschmack.mjs            # nach dem Build: dist/ Seiten, src/ Quellen, auch Konturbutton als Primär-CTA, Standardschriften, Pille als Kicker, getippte Logoleiste, Akzentwort, Violettverlauf, Glas
node scripts/pruefe-motion.mjs               # src/: transition: all, scale(0), ease-in, Dauer, Reduzierung, Scrollvideo, Einbettung, 3D-Szene
node scripts/pruefe-geo.mjs                  # nach dem Build: dist/ robots.txt, KI-Crawler, JSON-LD, Titel, Beschreibung, NAP, Bild ohne alt
node scripts/pruefe-aktualitaet.mjs          # dist/ und src/: Copyright-Jahr, Stand-Angaben, Jahr im Titel
node scripts/pruefe-seitenbasis.mjs          # nach dem Build: dist/ lang, Viewport und Zoom, Alt-Texte, Labels, Fremdserver, Teilen-Ebene
node scripts/pruefe-sicherheit.mjs           # vor und nach dem Build: Schlüssel, öffentliche Geheimnisse, .env im Git-Index, CSP, eval, bei Stripe Webhook-Signatur und Zahlungsregeln
node scripts/pruefe-scrollstrecke.mjs http://localhost:4321   # Scrollseite durchlaufen (Playwright): tote Strecke, Deckkraft, Überlauf; --mobil, --reduziert
node scripts/pruefe-slop.mjs http://localhost:4321 --copy     # Slop Detect (Original-CLI, lokal) gegen die Vorschau: Heavy und Textartefakte sind Fehler, --streng, --ausnahmen slop-ausnahmen.json; --vorbeugen listet die Vermeideliste
node scripts/branchenprofil.mjs dachdecker   # Branchenprofil für den Erstentwurf (liste, --landing, --marke, --json), Daten in assets/branchenprofile.json
node scripts/pruefe-tracking.mjs             # Tracking nur nach Einwilligung: Tracker im Markup, Pixel und CAPI ohne Consent, event_id, Token hinter PUBLIC_, Datenschutz nennt den Dienst
node scripts/bibliothek-conversion.mjs      # Template-Bibliothek: Conversion Raster je Vorlage zählen (Title, Description, Navigation, tel:, FAQ, Formularfelder, Primär CTA, Bildgewicht); vor jeder neuen Vorlage, [t69 …] oder --ab t69

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

# Aufbau der Skills in diesem Repository: SKILL.md-Länge, Inhaltsverzeichnis ab 100 Zeilen, Verlinkung, tote Verweise
node scripts/pruefe-skill.mjs
node scripts/pruefe-skill.mjs --inhalt       # legt fehlende Inhaltsverzeichnisse an oder erneuert sie

# Tests der Skripte, eingebauter Node-Testrunner, ohne Abhaengigkeit
node --test 'scripts/tests/*.test.mjs'

# Eval-Suite
claude plugin eval .
claude plugin eval . --case consent-ohne-keks
claude plugin eval . --runs 1 --ablation none

# Quell-Skills in ein Kundenprojekt nachinstallieren
bash scripts/install-quellskills.sh
```

Alle Skripte laufen mit reinem Node, ohne Abhängigkeiten. Nur `pruefe-breakpoints.mjs`,
`pruefe-scrollstrecke.mjs`, `pruefe-slop.mjs` (über den CLI von Slop Detect, `npm i -D slop-detect@0.8.0` im Kundenprojekt oder `npx`) und `brand-extraktion.mjs` brauchen Playwright, im Zielprojekt oder global, gefunden über
`scripts/lib/browser.mjs`. Kein `package.json`, und das bleibt so: ein
Abhängigkeitsbaum in einem Skill-Repository wird beim nächsten Audit zum Problem und bringt
hier nichts ein. Die Tests nutzen deshalb `node:test` und `node:assert` aus dem Standardumfang
von Node, keinen externen Testrunner. Die Verzeichnisform `node --test scripts/tests/` greift
nicht, es braucht das Glob-Muster in Anführungszeichen.

