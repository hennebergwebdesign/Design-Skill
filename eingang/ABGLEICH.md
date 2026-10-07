# Abgleich: Wissenspaket RoboNuggets gegen Version 4.10.0

Status: neu, teilweise, vorhanden, Widerspruch. Gelesen: alle 12 Referenzen, Addon, 8 Vorlagen,
und die Zielkapitel 10, 17, 24, 26, 28, 29, 38, 39 im Repository.

| Nr | Thema (Paketdatei) | Status | Entscheidung | Ziel |
|---|---|---|---|---|
| 1 | Design System vor dem Entwurf (01, Addon 1) | vorhanden | `marke.json`, 10, 24 leisten das | nichts doppeln |
| 2 | Standardfont und Standardlook verboten (01, Addon) | vorhanden | Sperrliste in 10, Serifenreflex in 26 | nichts |
| 3 | Fontshare, Fontesk, Fontjoy als Quelle (01, 02) | **Widerspruch** | 26 Abschnitt 11 warnt vor dem Anbieter-CDN und eigener Lizenz. Gilt: Quelle ja, Lizenz prüfen, selbst hosten | Kandidatentabelle in 22 |
| 4 | Cremefarbener Default, kursive Zierwörter (01, 04 R11) | vorhanden | 26 führt es als Tell, mit Ausnahme als Markenentscheidung. Die pauschale Härte des Addons wird nicht übernommen | nichts |
| 5 | Ein Icon Pack, SVG, keine selbst gezeichneten Icons (01, 02) | teilweise | 17 trennt Bibliothek (Systemicons) und eigenes Set (Leistungen). Gilt weiter, Addon wäre zu pauschal | Kandidaten (Iconify, Lordicon) in 22 |
| 6 | Komponenten zuerst (21st.dev, React Bits, Canvas UI) (01, 02) | teilweise | 21st.dev steht in 22 und 23. React Bits und Canvas UI ergänzen, mit Prüfpflicht | 22 |
| 7 | Referenzbibliothek, Shortlist, Systeme mischen (01) | teilweise | Referenzrecherche mit Freigabetoren ist stärker. Mischen mit Herkunft je Merkmal ergänzen | 24 |
| 8 | Design System aus fremder Referenz extrahieren (Vorlage) | **Widerspruch** | harte Grenze: Markenextraktion nur von der eigenen Seite des Kunden. Vorlage nur mit dieser Sperre | Vorlage mit Sperre |
| 9 | Copy Regeln aus den fünf stärksten Wettbewerbern (01 T6) | neu | Muster notieren, keine Sätze übernehmen (UWG, Urheberrecht) | copy-im-kundenprojekt |
| 10 | Tone of Voice, Anti Slop (08, Vorlage) | vorhanden | `deslop-check.mjs`, 12, 35. Die Vorlage nennt Bindestriche als Stilmittel, das Repository verbietet nur Gedankenstriche | nichts, Vorlage nicht übernommen |
| 11 | Impeccable, Audit Skill (01) | vorhanden | 29 | nichts |
| 12 | Gauntlet Loop (03, Vorlage, Addon) | **Widerspruch** zu 29 | 29 begrenzt subjektive Durchgänge auf zwei. Gilt: Gauntlet ist eine Art, diese Durchgänge auszuführen, nicht ein dritter. Mit Budget, Durchlaufgrenze, Referenz für den Critic, nie als erster Prompt | neues Kapitel 40 |
| 13 | Review mit Crop und Zoom je Sektion (04 R12) | teilweise | 29 verlangt Screenshots, nicht den Ausschnitt je Sektion | qa-und-abnahme, 29 |
| 14 | Checkliste für lange Builds, Zwischenstand nicht als Abschluss (04 R8) | teilweise | Fertigmeldung ist an Definition of Done gebunden, die Checkliste je Sektion fehlt | SKILL Phase 4 |
| 15 | Zwei Sätze zu erledigten Antworten in der Projekt CLAUDE.md (04 R7) | neu | Zeile in die Vorlage der Projekt CLAUDE.md | SKILL |
| 16 | Effort, Cache, Usage Resets, reasoning extraction (04 R1 bis R6, R9, R10) | nicht übernommen | modell und preisabhängig, im Video als Beta, an keiner Doku geprüft | CREDITS |
| 17 | Storyboard vor Scroll Animation, Annotation am Screenshot (03, 05) | neu | in 38 und `kundenabstimmung.md` | 38 |
| 18 | Videoproduktion aus Transkript, Hyperframes, Whisper, Rohvideo (05, 01 T24) | nicht übernommen | Videoschnitt ist kein Webseitenbau | CREDITS |
| 19 | SVG als Format, GSAP (05) | vorhanden | 09, 17, 18 | nichts |
| 20 | Tweaks Panel (01 T23, Vorlage) | neu | nur als lokales Werkzeug, nie im Produktionsbuild | Vorlage mit Sperre |
| 21 | Bildgenerierung als Skill mit Anbietern (06, Vorlage) | teilweise | 28 und 39 regeln Inhalt und Rechte, Kosten fehlen. Anbieternamen und Preise nicht übernommen | 39, Vorlage |
| 22 | Kosten vorab, Budget Deckel, Bestätigung bei Menge, Log, Keys in .env (06) | neu | Abschnitt in 39, Evalfall | 39, Eval |
| 23 | Wasserzeichen im KI Text (09) | neu | kurzer Hinweis, Quellen ungeprüft | copy-im-kundenprojekt |
| 24 | DCG, Schutz vor zerstörerischen Shellbefehlen (08) | neu | werkzeugneutral: deterministischer Hook, Freigabe, Backup, Commit vor großen Läufen | Bauablauf Phase 0 und 4 |
| 25 | Ressourcenbibliothek (02) | teilweise | Kandidaten mit Prüfpflicht, keine Empfehlung, Adressen ungeprüft | 22 |
| 26 | Jev, System 1 Modell, Routing, Triage (02, 06, 07) | nicht übernommen | Drittanbieter, Datenschutz und Auftragsverarbeitung ungeklärt, Messwerte vom Kanal. Prinzip Konfidenzschwelle steht in den offenen Punkten | CREDITS |
| 27 | "I have ADHD" Antwortstil, /quick (08) | nicht übernommen | Persönlicher Arbeitsstil, kein Regelwerk | CREDITS |
| 28 | Apple HIG als Skill, WCAG als Skill (01 T20, Vorlage) | nicht übernommen | Tap Targets stehen in 04 und 32. Ein Regelwerk als Skill zu bauen ist ein eigenes Projekt | CREDITS |
| 29 | Eigenes Design Betriebssystem (01 T25) | nicht übernommen | Agenturintern, nicht Regelwerk | CREDITS |
| 30 | Henneberg Design System (10) | offen | liegt in einem anderen Repository, nicht eingesehen | offene Punkte |
