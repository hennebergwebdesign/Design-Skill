# Claude Design Hacks: Prompt-Gerüst, DESIGN.md, Remix, Prüfen und Vereinfachen

Dieses Kapitel sammelt, was aus dem Paket „Claude Design Hacks" (Video „How to Use Claude Design Better
Than 99% of People" von Jack Roberts, 09.10.2026, dazu die Seite „The Claude Design Blueprint" mit 15
Hacks und 47 Vorlagen) **neu** war. Was schon im Regelwerk stand, ist nicht wiederholt, sondern
verlinkt (Abschnitt 11). Die Aussagen des Videos sind Erfahrungswerte des Autors, die Zahlen
(Aufrufe, Preise, Sterne, Limits) sind nicht geprüft und kommen nie in Kundentexte.

Der Design Loop des Pakets steht in `40-polierschleife-mit-kritiker.md`, Abschnitt 3c, weil er eine
Variante der Polierschleife ist und keine eigene Disziplin.

## 1. Prompt-Gerüst R I S E

Alle 15 Prompts der Quelle haben denselben Aufbau. Für jede größere Aufgabe an Claude Design oder
Claude Code gilt er als Gerüst:

| Buchstabe | Inhalt | Beispiel |
|---|---|---|
| **R** Referenz | was geliefert wird: Marke, Referenz, Dateien, Pfade | „Markenbrief liegt in `marke.json`, eine freigegebene Referenz: ref-02" |
| **I** Instruktion | was gebaut wird, in welcher Reihenfolge, wann angehalten und auf Freigabe gewartet wird | „erst drei Layouts, dann warten" |
| **S** Schranken | was verboten oder festgelegt ist, mit Zahlen statt Adjektiven | „Grammatik kopieren, nie Pixel, Worte, Logo oder Bilder", „höchstens zwei Schriften", „150 bis 300 ms, ease-out" |
| **E** Evaluation | woran fertig erkannt wird: feste Prüfpunkte, Breiten, Rundengrenze | „375 und 1440 px, jeder Wert unter 8 wird nachgebessert" |

Grund: Der Prompt ist ein kleiner Teil des Ergebnisses. Referenz, Regeldateien und Prüfschleife tragen
den Rest (derselbe Befund wie in `42-referenzgrammatik-und-gap-audit.md`). Fehlt **E**, prüft niemand,
ob die Schranken gehalten wurden.

Die Prompts der Quelle sind Englisch, weil das mit Claude Design am verlässlichsten läuft. Alles, was
ein Besucher liest, bleibt Deutsch und ohne Gedankenstriche.

## 2. DESIGN.md neben marke.json

Das Format stammt von Google Labs („DESIGN.md", Version alpha): YAML-Tokens oben, danach feste
Abschnitte. Es ist **die Fassung für Claude Design und fremde Werkzeuge**, `marke.json` bleibt die
Fassung dieses Skills.

| Datei | Zweck | Wer liest sie |
|---|---|---|
| `marke.json` und Markenbrief | die verbindliche Marke im Agenturprojekt (`24-designsystem-vorrang.md`) | Skills, Prüfskripte |
| `DESIGN.md` | dieselbe Marke als eine Datei im Format, das Claude Design und andere Werkzeuge kennen | Claude Design, Cursor, fremde Agenten |

**Eine Wahrheit:** Die `DESIGN.md` wird aus `marke.json` und dem Markenbrief **abgeleitet**, nie
umgekehrt und nie getrennt gepflegt. Weichen beide ab, gilt `marke.json`. Grund: zwei Quellen
derselben Werte driften auseinander (`CLAUDE.md`, Pflegeregel zu Doppelungen).

Reihenfolge der Abschnitte: Overview, Colors, Typography, Layout, Elevation und Depth, Shapes,
Components, Do's und Don'ts, danach Iconography und Voice. Vorlage: `../assets/vorlagen/DESIGN.md`.

| Regel beim Schreiben | Grund |
|---|---|
| Jede Farbe ein Hexwert mit Aufgabe, genau eine Akzentfarbe | sonst wählt das Modell selbst |
| Jede Schrift mit Schnitten und freier Ersatzschrift | die Marke bleibt baubar, wenn eine Lizenz fehlt |
| Regeln mit Zahlen: „16 px, Zeilen unter 75 Zeichen", nicht „gut lesbar" | prüfbar |
| Jedes Don't stammt aus den Quellen des Kunden. Was fehlt, steht als `TODO`, nie als erfundener Wert | harte Grenze zu erfundenen Belegen (`SKILL.md`) |
| unter 250 Zeilen | eine Datei, die niemand mehr liest, schützt nichts |

Prüfung: alle `{token}`-Verweise lösen auf, Buttontext hat 4,5:1 (`scripts/pruefe-kontrast.mjs`),
Abschnitte in Reihenfolge, alle `TODO` stehen in der Übergabe. Danach eine Testseite **nur** mit der
`DESIGN.md` bauen und je Entscheidung die befolgte Regel nennen lassen. Das optionale Werkzeug
`npx @google/design.md lint` führt fremden Code aus: Repository lesen, Version festlegen, nur im
Entwurf.

Referenz-Dateien Dritter (Refero Styles, „awesome design md") sind **Lesarten**, keine
Markenrichtlinien. Struktur übernehmen, nie deren Marke.

## 3. Eine Referenz je Sektion (Section Remix)

`42-referenzgrammatik-und-gap-audit.md` verlangt drei bis fünf Referenzen je Sektion, um eine
Grammatik zu lesen. Der Remix ist der **schnelle Weg für eine einzelne Sektion mit einem Treffer**,
wenn die Grammatik schon bekannt ist oder die Sektion klein ist (Navbar, Fußzeile, 404).

1. Ein Treffer je Sektion aus der passenden Galerie (`22-premium-designquellen.md`, Tabelle
   „Galerien je Sektion"). Der Treffer geht durch Tor 1, bevor er erfasst wird.
2. Fünf Zeilen über den Treffer: Layout, Abstände, Schriftgrößen, eine Bewegung, ein kleines Detail.
3. Die Sektion in der eigenen Marke neu bauen. Übernommen wird das Muster, nie Pixel, Worte, Logo
   oder Bilder.
4. Kommentar am Dateianfang: `Inspired by [Galerie], [Treffer]`. Entfernen, wenn der Kunde keine
   Quellenangabe im Code will.
5. Gegenüberstellung bei 1440 und 375 px: was behalten, was geändert. Erst dann die nächste Sektion.

Reihenfolge: Navbar, Hero, CTA, Fußzeile, 404. **Ein** Treffer je Sektion, zwei erzeugen Mischmasch.
Danach prüfen, ob die Sektionen noch eine Seite sind: erst Farben und Schrift angleichen, dann
Abstände. Vorlage: `../assets/vorlagen/prompts/abschnitt-remix.md`.

**Flüsse** (Anmeldung, Anfrage, Bestellung): fünf echte Abläufe der Kategorie zerlegen (Schritte,
Felder, Schritt des ersten Nutzens, überspringbare Schritte), erst die Tabelle zeigen, dann den
eigenen Ablauf neu bauen. Kopiert werden Reihenfolge und Logik, nie Bildschirme, Worte oder Logos.
Der Fluss darf nie mehr Felder haben als die Referenzen im Schnitt (`06-conversion-architektur.md`).

## 4. Fünf Versionen, die einfachste behalten

Größtes Problem vieler Kundenseiten ist Textdichte. Wenn eine Ansicht nicht trägt:

1. Der Ansicht **einen** Zweck geben, in zehn Wörtern sagbar.
2. Fünf Versionen erzeugen, jede auf **andere Art** einfacher. Bei Layoutfragen fünf vollständig
   verschiedene Entwürfe: Version 1 am sichersten, Version 5 am mutigsten, nebeneinander bei 1440 und
   375 px, mit einer Mischempfehlung („Hero von 2, Fußzeile von 4").
3. Mit dem Ein-Bildschirm-Test messen (Abschnitt 5), die kleinste Zahl gewinnt, danach **noch ein
   Element streichen** und prüfen, ob die Aufgabe weiter funktioniert.
4. Formulare kürzen: Felder nur für den heutigen Zweck, ein Button mit Verb und Ergebnis („Probe
   starten", nicht „Senden"), Fehler am Feld, Eingaben bleiben stehen.

Grenze: Fünf Entwürfe sind eine **Auswahl vor dem Bauen**, kein zusätzlicher Prüfdurchgang
(`29-pruefdurchgaenge-und-vokabular.md`). Der Mensch wählt, das Modell baut danach die Mischung.
Vorlage: `../assets/vorlagen/prompts/fuenf-versionen.md`.

## 5. Ein-Bildschirm-Test

Auf jede Version, ja oder nein. Gewinnt die Version mit den wenigsten Teilen und ohne „nein".

| # | Prüfung |
|---|---|
| 1 | **Ein Zweck**: in zehn Wörtern sagbar? |
| 2 | **Fünf Sekunden**: sagt ein Fremder, was es ist, für wen und was als Nächstes zu tun ist? |
| 3 | **Ein Hauptbutton**: genau ein gefüllter Akzentbutton, mindestens 44 px hoch? |
| 4 | Klickbares sieht klickbar aus, Text sieht nach Text aus |
| 5 | Jedes Feld hat ein sichtbares Label, nicht nur einen Platzhalter |
| 6 | Jedes Feld verdient seinen Platz für die heutige Aufgabe |
| 7 | Jedes Wort ist ohne Nachdenken klar |
| 8 | Ein Element streichen: die Aufgabe geht weiter |
| 9 | Logo oben links führt nach Hause, Menü an gewohnter Stelle |
| 10 | Bei 375 px mit einem Daumen zu schaffen, ohne seitliches Scrollen |

Dazu zählen: Felder, Buttons, Links, Wörter je Version. Der Test ergänzt die Erinnerungs- und
Aufgabenprobe in `29-pruefdurchgaenge-und-vokabular.md`, ersetzt sie nicht: Er misst die Dichte,
nicht, ob der Kunde sich erinnert. Punkt 3 deckt sich mit der harten Grenze zum Primär-CTA
(`pruefe-geschmack.mjs`).

## 6. Fünf-Agenten-Prüfung vor der Freigabe

Vor der Übergabe läuft die Seite durch fünf **lesende** Prüfer mit je vier Prüfpunkten, dazu ein
sechster Block für Recht und Auslieferung (Zusatz dieses Skills, nicht Teil der Quelle).
Vorlage mit allen 20 Punkten: `../assets/vorlagen/prompts/fuenf-agenten-pruefung.md`.

| Agent | Aufgabe | Punkte der Quelle |
|---|---|---|
| 1 | Layout und Handy | Mobile first, Breakpoints nach Inhalt, fließende Größen, 16 px und 44 px Ziele |
| 2 | Schrift und Rhythmus | linksbündig, 45 bis 75 Zeichen, Zeilenhöhe, eine Abstands- und eine Schriftskala |
| 3 | Farbe und Zustände | Kontrast, Farb-Tokens, fünf Zustände, Leer-, Lade- und Fehlerzustand |
| 4 | Bewegung, Tempo, Zugang | 150 bis 300 ms, reservierter Platz, Tempo-Budget, Struktur und Tastatur |
| 5 | Botschaft und Handlung | ein Hauptbutton, erster Bildschirm, Formulare, Teilen-Ebene |
| 6 | **Recht und Auslieferung** (Zusatz) | Impressum und Datenschutz erreichbar, Einwilligung vor Tracking, **keine Fremdserver**, `lang="de"`, Formular mit Einwilligungstext, Telefon- und Mail-Links |

Ablauf, mit den Regeln, die das Verfahren tragen:

1. Die Agenten **lesen nur**. Sie ändern keine Datei. Grund: Prüfer, die zugleich bauen, finden
   ihre eigenen Fehler nicht.
2. Jeder liefert je Befund: Regelnummer, Fundort, Schwere (hoch, mittel, niedrig), Lösung in einer
   Zeile. Zusätzlich meldet jeder tote Buttons, kaputte Links und Platzhaltertexte.
3. Zusammenführen in die Fix-Liste. **Geändert wird erst nach der Freigabe** durch den Menschen.
4. Danach behebt **eine** Instanz alles. Nie zwei Agenten an derselben Datei.
5. Die fehlgeschlagenen Prüfungen laufen erneut, Vorher-Nachher-Bilder bei 375 und 1280 px.

**Was ein Skript schon sieht:** `scripts/pruefe-seitenbasis.mjs` prüft die statischen Punkte
(Sprache, Landmarken, Viewport, Bildmaße, Alt-Texte, Labels, Teilen-Ebene, Fremdserver), zusammen
mit `pruefe-breakpoints.mjs`, `pruefe-motion.mjs`, `pruefe-geo.mjs` und `pruefe-kontrast.mjs`. Die
Agenten ergänzen, was kein Skript urteilen kann (Gestaltung, Verständlichkeit). Ein Agent, der ein
Element lobt, das ein Skript verwirft, hat unrecht (`40-polierschleife-mit-kritiker.md`, Abschnitt 3).

**Entschieden gegen die Quelle:**

| Quelle sagt | Hier | Grund |
|---|---|---|
| Abstände auf 8 Punkten fest (4, 8, 12 … 128 px) | fließende Tokens aus `tokens.css` bleiben | `43-hierarchie-raster-komposition.md`, Abschnitt 8: feste Pixelabstände nicht übernommen |
| Schutzmaß 44 px für Ziele (Apple) | 44 px als Ziel, 24 px nur als WCAG-Untergrenze | `04-barrierefreiheit-bfsg.md` |
| Farben in OKLCH | erlaubt, nicht verlangt | `10-visuelle-richtung.md`, Tokens in `tokens.css` sind maßgeblich |
| Schriften per Google-Fonts-Link, Icons und Skripte von unpkg oder jsDelivr | **nie in der Auslieferung**, lokal ausliefern | `07-recht-dsgvo.md` (Fremdserver, IP-Übertragung), `26-geschmack-und-ki-tells.md` (Schriften vom Anbieter-CDN), geprüft von `pruefe-seitenbasis.mjs` |
| JavaScript-Budget 300 KB und Heldenbild 200 KB | als Vorschlag, im Projekt festzulegen | ungemessene Zahlen des Autors; Gewicht misst `qa-und-abnahme.md`, Schritt 5 |

## 7. Bewegung: Mikro-Details und Kamerawörter

`30-motion-pruefung.md` regelt, ob animiert wird. Das Paket ergänzt eine **kleine Liste teuer
wirkender Details**, die ein Modell nicht von selbst baut. Fertige Dateien:
`../assets/vorlagen/motion/motion.css` und `count-up.js`.

| Detail | Wert | Grund |
|---|---|---|
| Anheben bei Hover (Karten) | 4 px, nur mit `@media (hover: hover)` | Hover gibt es auf dem Handy nicht |
| Drücken (Buttons) | `scale(0.97)` bei `:active` | steht schon in `09-motion-gsap.md`, hier als CSS |
| Staffelung beim Eintritt | 40 ms je Element, höchstens ein Dutzend | längere Ketten lassen die Seite träge wirken |
| Zahlen zählen hoch | einmal, unter 1 s, bei Sichtbarkeit | mehr lenkt vom Inhalt ab |
| Fokusring blendet weich ein | `outline-offset`, 180 ms | Zustandsfarbe ist nicht Bewegung |

Gemeinsame Schranken: 150 bis 300 ms mit ease-out, höchstens drei Dinge bewegen sich zugleich, Text
bewegt sich nie, während gelesen wird, und `prefers-reduced-motion` bleibt, jede ergänzte Bewegung
wird aufgelistet. Nur `transform` und `opacity` bewegen sich. Test bei 375 px.

**Kamerawörter** für Bewegtbild (`41-motion-als-funktion-der-zeit.md`, Abschnitt 3), mit Zahlen
benutzen: Push in („8 Prozent über 3 Sekunden"), Pull back, „alle Zooms auf 0,7x", harter Schnitt
auf den Beat, Whip Pan, Match Cut, Rack Focus, Parallax, Hold („1,5 s auf dem letzten Bild"),
Ease out. Ohne Zahl wird es Mittelmaß.

**Folien mit Schleife:** je Folie eine Idee und eine Grafik, Schleife 6 bis 10 s, letztes Bild gleich
erstes Bild, Zeichnen aus einer `render(t)`-Funktion, vorher drei Stilvarianten zur Wahl.
Überschrift höchstens 8 Wörter, Unterzeile höchstens 10. Liegt Musik unter der Schleife, die Länge
in **Takten** statt Sekunden festlegen (120 BPM, 8 Takte gleich 16 s). Das ist ein Hinweis aus einem
Kommentar zum Video, nicht vom Autor.

## 8. Plakat in Code, 3D-Szene, Nachbau aus Aufnahme

Zusatzleistungen, nicht Teil der Standardseite.

| Lieferstück | Vorgehen | Datei |
|---|---|---|
| Plakat | Referenz zerlegen (Raster, Schriftgrößen, Farben mit Hex, Weißraum, ein ungewöhnlicher Zug), drei Layouts, Auswahl, dann HTML und CSS in **mm**. Beschnitt 3 mm, Sicherheitsrand 6 mm, Schriften einbetten. Export: Vektor-PDF plus 300-dpi-PNG plus Zuschnitt 4:5. Nur gelieferte Fakten, keine erfundenen Daten oder Preise | `../assets/vorlagen/plakat/poster.html` |
| 3D-Szene | Eine Datei, Pixel Ratio höchstens 2, Instancing, `prefers-reduced-motion`, Draw Calls und Dreiecke messen. Regeln für Einsatz und Lieferung: `38-scrollvideo-und-einbettungen.md`, Abschnitt 5a | `../assets/vorlagen/plakat/three-starter.html` |
| Seite aus Aufnahme | Minute Bildschirmaufnahme einer Referenz plus gesprochene Erklärung: Frame alle 0,5 s, `motion-notes.md`, Referenz zurückerklären, Konzeptseite zeigen, **auf Freigabe warten**, erst dann Code. Kopiert wird nur die Bewegung. Ist ein erzeugtes 3D-Modell roh, Scrollvideo oder Fotos nehmen | Ablauf wie `38`, Abschnitt 2a |

Druckerei vorher nach Beschnitt und Farbraum (CMYK) fragen. Ein Plakat ist kein Social-Post: je
Platz ein eigener Zuschnitt, der Druckrand wird nicht wiederverwendet. Format- und Beschnittwerte
der Quelle (A-Reihe, US-Formate, Social-Größen) sind Stand 05.10.2026 und stehen in
`../assets/vorlagen/plakat/formate-und-beschnitt.md`.

## 9. Design-Ordner im Kundenprojekt

Die Quelle empfiehlt einen Ordner `design-os/` mit `CLAUDE.md`, `DESIGN.md`, `taste/inspo.md`,
`rules/`, `assets/`, `checks/`, `memory/corrections.md`, `projects/`. **Hier gibt es das schon in
anderer Form**, deshalb wird kein zweiter Ordner angelegt:

| Quelle | Entspricht hier |
|---|---|
| `CLAUDE.md` (Lesereihenfolge) | Projekt-`CLAUDE.md` mit dem Block aus `aenderungsrunden-und-layoutschutz.md` |
| `DESIGN.md` | `marke.json` und Markenbrief, `DESIGN.md` als abgeleitete Fassung (Abschnitt 2) |
| `taste/inspo.md` | `referenz-register.mjs` und die eigene Referenzbibliothek (`44-gutes-festschreiben-und-rueckbauprobe.md`, Abschnitt 7) |
| `rules/web-20.md` | Fünf-Agenten-Prüfung (Abschnitt 6) und `assets/checklisten/pre-launch.md` |
| `rules/bar.md` | `bar.md` des Design Loops (`40`, Abschnitt 3c) |
| `rules/words.md` | `deslop-check.mjs` und `12-copywriting.md` |
| `checks/preship.py` | `scripts/pruefe-seitenbasis.mjs` und die übrigen Prüfskripte |
| `memory/corrections.md` | übernommen: **jede Korrektur des Auftraggebers wird als eine Regel festgehalten**, im Projekt unter `CLAUDE.md` oder `korrekturen.md`, mit Datum. Grund: dieselbe Korrektur kommt sonst in jeder Sitzung wieder |
| `projects/[name]/brief.md` | Markenbrief und Konzept (Phase 3) |

Start jedes Projekts: erst lesen (Markenbrief, Referenzen, Regeln, Korrekturen), in sechs Zeilen
sagen, was gelesen wurde und welche Regeln gelten, nach der **einen** Referenz fragen, die
übertroffen werden muss, `brief.md` und `bar.md` schreiben, erst dann bauen. Bei Konflikt zwischen
Auftrag und Marke stoppen und fragen (`24-designsystem-vorrang.md`).

## 10. Sicherheit, Quellen, Lizenzen

* Befehle der Quelle (`npx`, `claude plugin install`, `claude mcp add`, `git clone` in den
  Skills-Ordner) führen fremden Code aus. Vor der Installation Repository lesen, Version festlegen,
  kleine Projekte mit wenigen Sternen besonders kritisch ansehen.
* Neue Werkzeuge und Galerien gehen durch Tor 1: als Kandidat vorschlagen, Mensch gibt frei.
* Kostenpflichtig oder mit Konto (Mobbin, Refero, Savee, Scrolltide, Linearity, Higgsfield): für
  Kunden nur vorschlagen, wenn der Nutzen klar ist. Links in der Videobeschreibung sind
  Empfehlungslinks des Autors.
* Fremde Designs, Videos, Plakate und Markenbücher sind Stilreferenz, nie Vorlage zum Nachbauen.
* KI-erzeugte Bilder und Videos: Kennzeichnung und Rechte klären (`39-ki-assets-bewegtbild-und-3d.md`,
  Abschnitt 4). Arbeitsdokument, keine Rechtsberatung.
* Lizenzen aus der Quelle (Stand 05.10.2026, vor Einsatz neu prüfen): Fontshare erlaubt Selbsthosting,
  aber kein Bearbeiten, Unterteilen oder Umwandeln der Dateien. Lucide ISC, Simple Icons CC0
  (Markenrechte bleiben bei den Marken), Lobe Icons MIT.
* Optionale editierbare Vektordateien über ein Brand-Handoff-Brief (Werkzeug Linearity, für MCP
  Enterprise): nur, wenn der Kunde Vektorlayer wirklich braucht, pro Lauf ein Format, Brief auf einer
  Seite, fehlende Angaben als `MISSING`, nie erfunden.

## 11. Was schon stand (nicht wiederholt)

| Thema des Pakets | Steht in |
|---|---|
| Referenzclip auswerten, `style.md`, Storyboard vor Code | `41-motion-als-funktion-der-zeit.md`, Abschnitte 2 und 4 |
| Referenzen statt Adjektive, Grammatiktabelle, Gap Audit | `42-referenzgrammatik-und-gap-audit.md` |
| Mobbin und Refero als Quellen, Flows | `22-premium-designquellen.md`, Kandidatentabelle |
| Schriftwahl, Sperrliste, zwei Schriften | `10-visuelle-richtung.md`, `26-geschmack-und-ki-tells.md` |
| Icon-System, Lucide | `17-icons-eigenes-system.md` |
| Slop-Test für Texte, Liste verdächtiger Wörter | `12-copywriting.md`, `scripts/deslop-check.mjs` |
| 3D-Szene mit Three.js | `38-scrollvideo-und-einbettungen.md`, Abschnitt 5a |
| Kritikerschleife mit Brief, System, Handwerk | `40-polierschleife-mit-kritiker.md` (3a und neu 3c) |
| Seite aus Aufnahme nachbauen | `38`, Abschnitt 2a, und `44`, Rückbauprobe |

**Einfache Sprache** (angelehnt an ASD-STE100, Issue 9, Januar 2025): kleine Wörter, aktive Sätze, ein
Gedanke je Satz, höchstens sechs Sätze je Absatz. Das ist nur der Geist des Standards, keine
offizielle STE, und der Ausgabestil des Pakets gilt für Antworten an den Auftraggeber, **nicht** für
Kundentexte. Kundentexte folgen dem Regelwerk (Deutsch, keine Gedankenstriche). Als Ausgabestil für
Claude Code ist er in `../assets/vorlagen/prompts/fuenf-versionen.md` nicht enthalten, weil er die
Antwortlänge, nicht die Seite betrifft.

## 12. Nicht übernommen (mit Grund)

| Was | Grund |
|---|---|
| Python-Skript `preship.py` | Das Repository hat keine Python-Abhängigkeit (`CLAUDE.md`). Die statischen Punkte sind als `pruefe-seitenbasis.mjs` in Node nachgebaut und mit Tests belegt |
| Englische Wortliste „Slop Monster" als Pflichtwerkzeug | englisch, fremder Code. Die deutsche Liste und das Satzmuster in `deslop-check.mjs` bleiben maßgeblich |
| Die Bindestrich-Hausregel englischer Quellen | Strichregel bleibt: Gedankenstrich nein, Bindestrich im Kompositum ja |
| Scroll Film Studio (Higgsfield) | Download nicht im Paket, braucht Konto bei einem Videodienst |
| Zahlen des Videos (Aufrufe, Kosten, Zeiten, Sterne) | Erfahrungswerte, nicht geprüft |
| Werbung für Kurse und Vorlagenpakete des Autors | kein Regelwerk |

Status: an keinem Kundenprojekt erprobt, kein Evalfall, das Δ ist eine Vermutung. Nicht jede
verlinkte Adresse der Quelle wurde einzeln geöffnet.

## Verwandte Kapitel

`22-premium-designquellen.md`, `24-designsystem-vorrang.md`, `29-pruefdurchgaenge-und-vokabular.md`,
`30-motion-pruefung.md`, `38-scrollvideo-und-einbettungen.md`, `40-polierschleife-mit-kritiker.md`,
`41-motion-als-funktion-der-zeit.md`, `42-referenzgrammatik-und-gap-audit.md`,
`43-hierarchie-raster-komposition.md`.
