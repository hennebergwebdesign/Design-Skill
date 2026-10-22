# Prüfung und Abnahme

Nur berichten, was tatsächlich ausgeführt wurde. Formulierungen wie "sollte funktionieren"
oder "ist produktionsreif" ohne Beleg sind der teuerste Fehler in diesem Ablauf, weil sie
erst beim Kunden auffallen.

Die vollständige Liste kurz vor dem Livegang steht in
`../../webdesign-conversion/assets/checklisten/pre-launch.md`, das Audit einer bestehenden
Seite in `conversion-audit.md` daneben. Dieses Kapitel ist der Ablauf während der Umsetzung.

## Inhalt

- Ablauf
- Abschlussbericht im Chat
- Design-Review
- Belastungsprobe mit Extremdaten

## Ablauf

### 1. Build und Typprüfung

```bash
pnpm build          # oder npm run build
pnpm astro check    # falls TypeScript im Projekt
```

Warnungen nicht ignorieren. Sie sind fast immer echte Fehler in der Ausgabe.

### 2. Die dreizehn Prüfskripte

```bash
node scripts/pruefe-striche.mjs                 # Gedankenstriche, Bindestrich mit Leerzeichen, hyphens: auto, verbotene Wörter
node scripts/pruefe-tokens.mjs                  # hartcodierte Farb-, Abstands- und Schriftwerte
node scripts/pruefe-kontrast.mjs                # Kontrastwerte der Rollen-Tokens
node scripts/pruefe-platzhalter.mjs --launch    # [[FEHLT]], data-copy-vorschlag, ausgelassener Code
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
node scripts/pruefe-geschmack.mjs               # nach dem Build: Kicker, Laufband, CTA-Texte, KI-Tells
node scripts/pruefe-typografie.mjs              # rem statt px, Zoomgrenze, 14-px-Boden, Schriftladen
node scripts/pruefe-motion.mjs                  # transition: all, scale(0), ease-in, Dauer, Reduzierung
node scripts/pruefe-geo.mjs                     # nach dem Build: robots.txt, KI-Crawler, Text im HTML, JSON-LD
node scripts/pruefe-aktualitaet.mjs             # nach dem Build: Copyright-Jahr, Stand-Angaben, Jahr im Titel
node scripts/pruefe-seitenbasis.mjs             # nach dem Build: lang, Viewport und Zoom, Alt-Texte, Labels, Fremdserver, Teilen-Ebene
node scripts/pruefe-sicherheit.mjs              # vor und nach dem Build: Schlüssel, öffentliche Geheimnisse, .env im Index, CSP, eval, bei Stripe Webhook und Zahlungsregeln
node scripts/pruefe-scrollstrecke.mjs http://localhost:4321   # Scrollseiten: tote Strecke, Text ohne volle Deckkraft, Überlauf; auch --mobil und --reduziert
```

`pruefe-typografie.mjs` meldet als Fehler Schriftgrößen in px, eine Schriftgröße auf `html`,
fließende Größen ohne rem-Anteil oder mit mehr als 2,5-facher Spanne, Stufen unter 14 px,
eine Skala, deren Stufen sich überholen, gesperrten Zoom und fremde Schriftdienste. Als
Warnung: Zeilenhöhe oder Laufweite in px, `@font-face` ohne `font-display`, benutzte
Gewichte ohne eigenen Schnitt und eigene Schriften ohne gemessene Ersatzschrift. Regeln und
Gründe: `../../webdesign-conversion/references/55-typografie-system.md`.

`pruefe-seitenbasis.mjs` liest `dist/` und meldet als Fehler: kein `lang`, kein oder zoomsperrender Viewport,
Bild ohne `alt`, Eingabefeld ohne Label und Schrift, Icons oder Skripte von einem Fremdserver (Google Fonts,
unpkg, jsDelivr, cdnjs). Als Warnung: kein `main`, Bild ohne Maße, keine `og:image`, `theme-color` oder
Favicon, toter Link. Titel, `h1` und Beschreibung prüft `pruefe-geo.mjs`. Es ist der statische Teil der
Fünf-Agenten-Prüfung aus `../../webdesign-conversion/references/47-claude-design-hacks.md`, Abschnitt 6.

`pruefe-sicherheit.mjs` liest Quellen und `dist/` und meldet als Fehler: Schlüssel im Quelltext (Stripe, AWS, GitHub, Resend, Slack,
Privatschlüssel), ein Geheimnis hinter einem öffentlichen Präfix (`PUBLIC_`, `VITE_`), eine `.env` oder `.dev.vars` im Git-Index, eine CSP mit
`unsafe-eval` oder Stern, `eval()` und `document.write()`. Bei Stripe zusätzlich `payment_method_types`, einen Webhook ohne Signaturprüfung und einen
Geheimschlüssel im Browsercode. Warnungen: HTML aus Variablen, fehlende Header, fehlendes Lockfile, Quellkarten in `dist/`, Formularroute ohne Turnstile,
Erfolgsseite, die selbst erfüllt, fehlende AGB und Widerrufsseite, Datenschutz ohne Stripe. Ablauf in `sicherheitspruefung.md`, Regeln in
`../../webdesign-conversion/references/52-sicherheit-der-kundenseite.md` und `53-…`.

`pruefe-scrollstrecke.mjs` läuft eine Seite von oben nach unten durch (Playwright) und meldet Scrollen ohne sichtbare Veränderung, Text, der nie volle
Deckkraft erreicht, horizontales Überlaufen, Konsolenfehler und mit `--reduziert` Inhalt, der unsichtbar bleibt. Es legt einen Kontaktbogen ab, den ein
Mensch liest (`../../webdesign-conversion/references/50-scroll-erlebnis-grammatik-und-gefuehl.md`, Abschnitt 12).

`pruefe-geschmack.mjs` zählt, was sich an Geschmack zählen lässt: höchstens ein Kicker je drei
Sektionen, höchstens ein Laufband, ein Text je Kontaktabsicht, dazu Warnungen für
`overflow-x: hidden`, eigene Mauszeiger, `100vh` ohne `svh`, die Standardserifen und die
Premium-Standardpalette. Als Warnung kommen hinzu: ein Primärbutton ohne Fläche (Konturbutton),
mehr als ein Primärbutton je Sektion, eine Logoleiste aus getippten Namen, ein kursives Akzentwort in
der Überschrift, ein Indigo- oder Violettverlauf ohne Markenvorgabe und Glas an vier oder mehr Stellen
einer Datei. Der Rest steht als Vorflugcheck in
`../../webdesign-conversion/references/26-geschmack-und-ki-tells.md` und wird angesehen.

`pruefe-motion.mjs` liest die Quellen und zählt, was an Bewegung zählbar ist: `transition: all`,
Start bei `scale(0)`, `ease-in`, Layoutwerte in `transition`, feste Dauern über 300 ms,
`:hover` mit Bewegung ohne `@media (hover: hover)`, und Animation ohne
`prefers-reduced-motion` im ganzen Projekt. Gibt es ein Scrollvideo oder eine Einbettung, prüft es
zusätzlich die Regeln aus Kapitel 38: Poster mit Maßen, Überschrift als Text, Behandlung der
reduzierten Bewegung im selben Modul, dynamischer Import, reservierte Größe. Zweck, Ursprung und Unterbrechbarkeit werden danach
angesehen, siehe den Review in `../../webdesign-conversion/references/30-motion-pruefung.md`.

`pruefe-geo.mjs` liest `dist/`: den Zustand der KI-Crawler in der `robots.txt`, Seiten mit
kaum Text im ausgelieferten HTML, `h1` und Ebenen, ungültiges JSON-LD und `FAQPage` mit
Fragen, die nicht sichtbar auf der Seite stehen, dazu jedes Bild ohne `alt`-Attribut als Fehler
(Schmuckbilder bekommen `alt=""`). Ob eine Sperre gewollt ist, entscheidet der
Kunde, siehe `../../webdesign-conversion/references/31-ki-sichtbarkeit-geo.md`.

`pruefe-breakpoints.mjs` rendert acht Größen, die fünf Breakpoints plus 320 px, 1366 × 768
und 1440 × 720, legt Screenshots ab und meldet horizontalen Überlauf mit dem Selektor des
äußersten Verursachers, zu kleine Touchziele, Schrift unter 14 px und Bilder ohne Maße.

Gefundene Punkte direkt beheben und erneut laufen lassen, bis nichts mehr gemeldet wird.
Danach die Screenshots ansehen und mit dem Entwurf abgleichen. Der automatische Teil findet
kaputte Layouts, nicht hässliche.

`pruefe-kontrast.mjs` rechnet die Rollen-Tokens. Paare außerhalb der Rollen (weißer Text auf der
Abdunklung eines Heldenbilds, Hoverzustand, Badge auf Akzent) kommen in eine Datei
`kontrast-paare.json` im Projekt und laufen mit `node scripts/pruefe-kontrast.mjs --paare
kontrast-paare.json`. Bei einem Bild zählt die hellste Stelle unter dem Text.

Ein Befund aus `pruefe-tokens.mjs`, der bewusst so bleibt, bekommt einen Kommentar mit dem
Wort "bewusst" und eine Begründung. Ohne diesen Kommentar bleibt es ein Befund, kein
Sonderfall.

### 2a. Die Strichregel als Hook

Die harte Grenze gegen Gedankenstriche wird nicht erst am Ende geprüft, sondern nach jedem Schreiben
einer Datei, deterministisch und ohne dass das Modell daran denken muss. In die
`.claude/settings.json` des Kundenprojekts (Einrichtung über den Skill `update-config`):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [{ "type": "command", "command": "node scripts/pruefe-striche.mjs --hook" }]
      }
    ]
  }
}
```

Der Hook liest den Pfad der geschriebenen Datei, prüft nur sie und meldet Fehler (Strich in
Überschrift, Button, Link, Kicker) mit Exit 2 zurück an das Modell, das sie dann behebt. Warnungen im
Fließtext halten nicht auf, sie kommen im vollen Lauf in Schritt 2. Eine nicht lesbare Eingabe oder
eine Datei ohne Text beendet den Hook still. Grund: Eine Regel, die nur im Text steht, gilt, solange das
Modell sie im Kontext hat. Ein Hook gilt immer und kostet keine Tokens. Der Aufbau der Hookkonfiguration
ist gegen die Dokumentation von Claude Code zum Stand Oktober 2026 geschrieben und nicht in einem
Kundenprojekt erprobt; vor dem Einsatz einmal mit einer Testdatei auslösen.

### 3. Abgleich mit dem Entwurf

Der Entwurf, meist aus Claude Design, gibt die verbindliche Richtung vor. Sinnvolle
Abweichungen sind erlaubt und erwünscht, wenn sie ein echtes Problem lösen: fehlende
Zustände, schlechte Lesbarkeit auf kleinen Geräten, zu geringer Kontrast, fehlende Sektion
für einen nötigen Schritt in der Nutzerführung. Jede bewusste Abweichung wird im
Abschlussbericht in einem Satz begründet.

Nicht erlaubt ist stilles Umgestalten, weil etwas anders schöner wirkt.

Bei dichten Sektionen wird je Sektion ein Ausschnitt bei 375 und 1440 px angesehen, bei Bedarf
vergrößert, nicht nur das Ganzseitenbild (`../../webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`,
Abschnitt 3).

Verglichen wird auf Proportion, Abstände, Schriftgrößen und Farbwerte, nicht auf
Pixelgleichheit.

### 4. Interaktion von Hand

* Navigation auf allen Breiten, Menü öffnen und schließen, Fokus bleibt gefangen, Escape
  schließt
* alle internen Links führen irgendwohin, keine Adresse ohne Ziel
* Akkordeons, Tabs, Schieberegler per Tastatur bedienbar
* jede Kachel reagiert sichtbar auf `:hover` und `:focus-visible`, abgeschaltet bei
  `prefers-reduced-motion: reduce`
* Formular: Erfolg, jeder Validierungsfehler, Serverfehler, Turnstile Fehler, doppeltes
  Absenden
* beide Mails im Posteingang kontrollieren, Darstellung und Absender
* Consent: ablehnen, dann prüfen, dass wirklich kein blockiertes Skript im
  Netzwerkprotokoll auftaucht. Danach zustimmen und prüfen, dass es lädt. Danach über den
  Footer widerrufen
* Bewertungen: Abruf liefert Daten, zweiter Aufruf kommt aus dem Cache, Fallback greift bei
  Fehler
* Dashboard, falls vorhanden: Anmeldung, falsche Zugangsdaten, geschützte API-Route ohne
  Sitzung, Abmelden
* Seite einmal ohne JavaScript laden: Inhalte lesbar, Navigation nutzbar, Formular
  absendbar
* Seite einmal mit `prefers-reduced-motion: reduce` laden: nichts fehlt, nichts bleibt
  unsichtbar
* Feinschliff der kleinen Dinge (Tastatur am Handy, Autofill, Einfügen, Safe Area, Anker unter
  der festen Kopfzeile): `../../webdesign-conversion/references/32-ui-details-katalog.md`

**Durchlauf wie ein Nutzer** vor der Übergabe, in echter Browserumgebung, als kurze Liste mit
Schweregrad: Anfrageformular absenden, Consent ablehnen und annehmen, Tastaturpfad, fünf
Breakpoints, Fehlerzustände, Danke Seite, Tracking nur nach Einwilligung, Links und Telefon.
Er ergänzt `pruefe-breakpoints.mjs` und `pruefe-motion.mjs`. Ein Skript `pruefe-flow.mjs` dafür
ist als Idee benannt und **nicht gebaut**, der Durchlauf ist bis dahin Handarbeit.

Zum Erkunden mit dem Agenten (Handy, reduzierte Bewegung, Consent vor dem Klick, Netzwerk, Formular mit erzwungenem Serverfehler, Bewegung Bild für Bild) gibt es
`playwright-cli`: `browser-pruefung-mit-playwright-cli.md`. Für Scrollseiten läuft zuerst `pruefe-scrollstrecke.mjs`.

Wer Playwright ohnehin im Projekt hat, kann die Punkte zu Formular und Consent als Ablauf
schreiben (Formular absenden, Consent ablehnen, im Netzwerkprotokoll nachsehen) und mit jedem
Build wiederholen. Der Skill `webapp-testing` verfolgt dasselbe Ziel. Er wurde hier nicht
eingebunden und nicht erprobt. Der Ablauf ersetzt die Handprüfung nicht, er spart nur die
Wiederholung.

### 5. Leistung

Lighthouse oder gleichwertig auf der Startseite und der wichtigsten Unterseite, mobil und
Desktop. Richtwerte: Leistung ab 90, Barrierefreiheit ab 95, empfohlene Vorgehensweisen und
SEO ab 95. Werte unter dem Richtwert entweder beheben oder mit Begründung im Bericht nennen.

Die Schwellen für LCP, INP und CLS und die Trennung von Feld- und Labordaten stehen in
`../../webdesign-conversion/references/03-technik-performance.md`.

**Seitengewicht und tote Dateien.** Alles in `public/` wird unverändert ausgeliefert, auch was keine
Seite mehr verwendet. Vor der Abnahme die großen Dateien der Auslieferung ansehen:

```bash
find dist -type f -size +300k -exec ls -lh {} + | sort -k5 -h
```

Jede Datei darin wird verwendet und ist komprimiert, sonst fliegt sie raus. Rohvideos, Originalfotos
und verworfene Entwürfe liegen außerhalb von `public/`. Grund: Cloudflare Pages lehnt einzelne
Dateien über 25 MiB beim Deploy ab, und eine direkt verlinkte, unkomprimierte Datei reißt die harte
Grenze für die Ladezeit, ohne dass Lighthouse auf der Startseite es zeigt.

### 6. Sicherheit

* `grep -rn "sk_\|api_key\|API_KEY\|password" src/ public/` ohne Treffer mit echten Werten
* `grep -rn "API_KEY\|SECRET" dist/` ohne jeden Treffer, das ist die Prüfung, die zählt
* `node scripts/pruefe-sicherheit.mjs` vor und nach dem Build ohne Fehler, Ablauf und Funde in `sicherheitspruefung.md`
* `.env`, `.dev.vars`, `.relaunch-inventory/`, `.scrollstrecke/` und `.playwright-cli/` stehen in der `.gitignore`
* Sicherheitsheader in `public/_headers` gesetzt, Vorlage in
  `../../webdesign-conversion/assets/vorlagen/_headers`
* Abhängigkeiten geprüft: `pnpm audit` oder `npm audit`, kritische Funde melden

### 7. Conversion

Jede Seite gegen die sieben teuren Fehler und die sechs Bereiche aus
`../../webdesign-conversion/SKILL.md` prüfen. Konkret nachmessen:

* Heldenbereich beantwortet ohne Scrollen alle vier Fragen, auf allen fünf Breakpoints, bei
  voller Bildschirmhöhe
* primäre Handlungsaufforderung mindestens zweimal pro Seite, überall gleich benannt
* Anfrage, Referenzen, Ablauf und Preise in höchstens drei Klicks erreichbar
* Vertrauenselement direkt unter dem Heldenbereich und vor jeder Handlungsaufforderung
* Formular auf notwendige Felder begrenzt, mit Hinweis je Feld
* Ladezeit unter zwei Sekunden, Bilder innerhalb der Größengrenzen
* mindestens ein Abschnitt, der für genau dieses Unternehmen gebaut ist, keine generische
  Sektion aus dem Baukasten

Treffer, die aus fehlendem Kundenmaterial entstehen, nicht selbst füllen, sondern im Bericht
auflisten.

### 8. Inhalt

* **vollständig ausgeliefert:** keine Komponente, die mit `// ...`, „Rest wie oben" oder
  „analog zu oben" endet, kein Gerüst, wo eine Umsetzung verlangt war. Die Zahl der
  verlangten Teile (Seiten, Sektionen, Dateien) vor der Fertigmeldung gegen das Gelieferte
  zählen. Reicht der Platz einer Antwort nicht, an einer sauberen Grenze anhalten (Ende einer
  Datei oder Sektion) und sagen, wie viele von wie vielen fertig sind, statt den Rest zu
  verdichten. `pruefe-platzhalter.mjs --launch` findet die Auslassungskommentare
* keine Platzhaltertexte aus der Entwicklung mehr im Markup
* alle `[[FEHLT: ...]]` gesammelt und im Bericht aufgeführt
* alle Copyvorschläge gesammelt, jeder mit `deslop-check.mjs` auf 5 von 5 geprüft
* `public/images/BILDER.md` aktuell, jedes Motiv mit Herkunft und Freigabestatus
* Datenschutzerklärung deckt jeden tatsächlich eingebauten Dienst ab, und keinen mehr
* bei Relaunch: jede alte URL hat ein Ziel, Stichprobe geprüft
* **ungefragte Ergänzungen geprüft:** Modelle bauen oft Dinge ein, die niemand verlangt hat
  (ein Minispiel, eine interaktive Bilderwand, eine zusätzliche Statistik, ein animiertes Detail).
  Jede wird einzeln entschieden: behalten, wenn sie dem Ziel der Seite dient und alle harten
  Grenzen besteht, sonst streichen. Eine ungefragte Zahl, Stimme oder Auszeichnung wird immer
  gestrichen oder `[[FEHLT: …]]`. Was bleibt, steht im Bericht unter „Gebaut", damit der Kunde es
  nicht als Versehen liest
* **generierter Code aufgeräumt:** Kommentare, die nur wiederholen, was die Zeile tut, raus;
  Kommentare, die einen Grund nennen, bleiben (Konvention „jede ungewöhnliche Entscheidung bekommt
  ihren Grund"). Auskommentierter Code, ungenutzte Komponenten, Stile und Abhängigkeiten raus. Grund:
  ein Zuschauerkommentar zu einem Video über generierte Seiten nennt aufgeblähten Code als Hauptmangel,
  und toter Code wird in der nächsten Sitzung für gültig gehalten

### 8a. Erinnerungstest und Aufgabentest

Zwei Tests mit einer Person, die das Projekt nicht kennt, vor der Abnahme durch den Kunden:
Erinnerungstest (woran erinnert sie sich nach wenigen Sekunden, in welcher Reihenfolge) und
Aufgabentest (löst sie eine echte Aufgabe wie Kontakt oder Termin ohne Hilfe, der Beobachter
schweigt). Ablauf und Maßstab: `../../webdesign-conversion/references/36-kundenpsychologie-erwartung-reiz-begruendung.md`,
Abschnitt 6, und `../../webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`, Abschnitt 5.

* Das Ergebnis steht im Bericht, auch ein negatives. Wird das Wichtige übersehen, wird die
  Sektion überarbeitet, nicht der Besucher belehrt.
* Wurde kein Test gemacht, steht „nicht getestet, keine Testperson" im Bericht. Der Skill
  erfindet kein Ergebnis.
* Der Befund gehört in die `CLAUDE.md` des Projekts.

Hat das Projekt ein Scrollvideo, gehört zu diesem Schritt außerdem: einmal ohne Video ansehen
(Poster und Text müssen dieselbe Aussage tragen) und einmal mit reduzierter Bewegung.

### 8b. Fehlermodi und Subtraktion

Was die Skripte nicht finden, weil die Seite nicht kaputt ist, sondern falsch: kontextfremdes Bild,
Funktion fehlt trotz richtigem Aussehen, Erzählbruch zwischen Heldbild, Überschrift und erster Sektion,
Layout bricht bei echtem Inhalt, erstes Foto zu spät. Je Fehlermodus Erkennen und Gegenmittel in
`../../webdesign-conversion/references/48-richtung-varianten-und-subtraktion.md`, Abschnitt 6.

* **Stresstest:** je Bauteil mit Textfeldern die kürzeste und die längste echte Zeichenfolge einsetzen
  (längster Leistungsname, Ortsname, längste Bewertung) und auf 375 und 1440 px ansehen.
* **Prüfer ohne Vorwissen:** ein Unteragent oder eine neue Sitzung bekommt nur die Screenshots und den
  Prüfprompt aus `../../webdesign-conversion/assets/vorlagen/prompts/pruefprompts.md`.
* **Subtraktionsrunde:** jedes Element gegen drei Fragen (hilft es der Zielgruppe bei ihrer Aufgabe,
  Information oder Dekoration, was fehlt ohne es). Ausgabe ist eine Liste, gestrichen wird nach
  Entscheidung. Sie ist Teil eines der zwei subjektiven Durchgänge, kein dritter.

### 9. Abnahme durch einen Menschen

Dieser Ablauf prüft mit Skripten und mit dem Modell, das gebaut hat. Beides ersetzt nicht die
letzte Sichtung: Das Modell, das etwas erzeugt hat, ist der schwächste Prüfer seiner eigenen
Arbeit, weil es dieselben Annahmen mitbringt. Vor der Übergabe an den Kunden liest ein Mensch
jeden Text und klickt jede Funktion durch.

* Der Bericht nennt, was der Mensch sich ansehen muss, nicht nur, was geprüft wurde: alle
  Texte, Formularpfade, Rechtstexte, Preise und Zahlen, und bei einem Chatbot die Gegenprobe
  aus `chatbot-auf-der-website.md`.
* Bereiche, in denen die prüfende Person selbst nicht Fachfrau oder Fachmann ist (Recht, Barrierefreiheit,
  Gestaltung), stehen ausdrücklich als „zur Prüfung durch eine Fachperson" im Bericht. Die
  Prüfung eines Bereichs, den niemand beurteilen kann, ist kein Qualitätsmerkmal.
* Wurde die Stylescape vom Kunden bestätigt (`moodboard-und-stylescape.md`), steht das Datum im
  Bericht. Eine Richtungsänderung danach läuft nur nach neuer Absprache.
* Das Modell meldet die Seite nie als abgenommen. Abgenommen ist sie, wenn ein Mensch es sagt.
* Läuft vor der Übergabe die Fünf-Agenten-Prüfung (`../../webdesign-conversion/assets/vorlagen/prompts/fuenf-agenten-pruefung.md`),
  lesen die Agenten nur. Die Fix-Liste geht an den Menschen, geändert wird erst nach seinem GO, danach von **einer**
  Instanz. Die Prüfung ersetzt weder die Skripte noch diese Sichtung.

Quelle: ein Video zum Umgang mit KI Ergebnissen, siehe `CREDITS.md`, Abschnitt „Version 4.6".

### 10. Aktualität und Eigentum

Eine Seite, die veraltet wirkt, verliert Vertrauen, bevor jemand den ersten Absatz liest: Ein
Copyright von 2023 im Jahr 2026 liest sich als „hier kümmert sich niemand". Und eine Seite,
die der Kunde nicht besitzt, ist eine Leihgabe der Agentur.

* `node scripts/pruefe-aktualitaet.mjs` gegen `dist/` ohne harten Befund. Das Copyright-Jahr
  entsteht beim Build (`new Date().getFullYear()`), steht nie von Hand im Markup. Stand-Angaben
  und Jahre in Titeln meldet das Skript als Hinweis: Dort entscheidet ein Mensch, ob der Inhalt
  noch stimmt.
* Übergabe mit Eigentum: Domain auf den Namen des Kunden registriert (oder die Übertragung
  im Bericht terminiert), Zugänge zu Hosting, DNS, Repository und Formularzustellung beim
  Kunden oder schriftlich an ihn übertragen. Was noch bei der Agentur liegt, steht im Bericht
  als „offen, bei uns". Grund: Wer die Domain nicht besitzt, kann die Seite nicht mitnehmen und
  bleibt abhängig, auch wenn der Vertrag etwas anderes sagt.
* Der Bericht nennt, wer die laufende Pflege übernimmt (Kunde, Agentur, niemand). „Niemand"
  ist eine zulässige Antwort, aber eine ausgesprochene.
* Bei einem Betrieb mit Einzugsgebiet: Name, Adresse und Telefon stehen in Impressum, Fuß,
  Kontaktseite und JSON-LD gleich geschrieben (`pruefe-geo.mjs` meldet Abweichungen zwischen Markup
  und Seite), und der Kunde bekommt die Prüfliste für sein Unternehmensprofil und den
  Bewertungsablauf aus `../../webdesign-conversion/references/46-lokale-sichtbarkeit.md`,
  Abschnitte 4 und 6. Das Profil pflegt der Kunde, der Bericht sagt das.

Quelle: Videos eines Webdesigners, siehe `CREDITS.md`, Abschnitt „Version 4.9". Ungeprüft: der
Ablauf ist an keiner echten Übergabe erprobt.

## Abschlussbericht im Chat

Kurz, sachlich, ohne Erfolgsprosa:

```
## Gebaut
## Geprüft mit Ergebnis
## Nicht geprüft und warum
## Fehlende Umgebungsvariablen
## Fehlende Bilder
## Fehlende Rechtsangaben
## Copyvorschläge zur Abstimmung mit dem Kunden
## Von einem Menschen noch zu prüfen
## Offene Rückmeldungen, nach Art sortiert (siehe `kundenabstimmung.md`)
## Bewusste Abweichungen vom Entwurf
## Nächste Schritte
```

"Geprüft mit Ergebnis" nennt das Werkzeug und den Befund, nicht das Gefühl: "Build grün,
zehn Prüfskripte ohne Fehler, Tastaturdurchlauf auf 375 und 1440 px, Formular mit allen vier
Zuständen getestet" ist überprüfbar, "funktioniert" nicht.

Zum Schluss ein Satz dazu, dass Rechtstexte und Datenschutzangaben vorbereitet, aber nicht
rechtlich geprüft sind.

## Design-Review

Sind Build und Prüfskripte grün, folgt vor dem Abschlussbericht das Design-Review nach
`design-review.md`: Aufnahmen auf festen Breiten mit `pruefe-breakpoints.mjs`, Befundliste
nach Schwere, ein Befund ein Commit, Vorher-nachher-Paare, Abgleich gegen Brief und
`marke.json`. Sein Ergebnis steht im Bericht unter „Geprüft mit Ergebnis". Grund: die Skripte
finden kaputte Layouts, das Review die hässlichen und die, die vom Entwurf abweichen.

Die Aufnahmen landen in `pruefung/`. Der Ordner gehört in die `.gitignore` des
Kundenprojekts: es sind Arbeitsbelege, keine Seiteninhalte.

## Belastungsprobe mit Extremdaten

Eine Komponente, die mit Beispieldaten gut aussieht, ist gegen freundliche Daten gebaut:
Namen, die in eine Zeile passen, Zahlen ohne Tausenderpunkt, jedes optionale Feld gefüllt.
Die Probe macht diese Auswahl rückgängig, Feld für Feld. Sie läuft vor dem Design-Review,
damit das Review nicht an Brüchen hängen bleibt, die Daten verursachen. Destilliert aus
`break-ui` in emilkowalski/skills (MIT).

### Regeln

| Regel | Grund |
|---|---|
| **Plausibel oder aus dem Schema, nie zufällig.** Jeder Extremwert ist realistisch oder die echte Grenze aus Formular (`maxlength`), Schema, CMS-Feld oder API | „aaaaaaaa" und 5.000 Zeichen beweisen nichts, der Kunde sagt zu Recht „kommt nie vor". Gibt es keine Grenze, ist das selbst ein Befund |
| **Die Daten ändern, nicht die Komponente.** Extremwerte kommen über dieselbe Stelle wie die Beispieldaten (Content Collection, JSON, Props) | wer Markup oder CSS von Hand bricht, prüft seine Änderung, nicht die Komponente |
| **Ein Datensatz, viele Brüche, über die ersten Zeilen verteilt** | was oben steht, ist auf dem Bildschirm; reale Daten mischen die Fälle |
| **Nur in der Entwicklung.** Extremdaten und Umschalter gehen nie live | es sind Prüfdaten, keine Inhalte. Für fehlende echte Inhalte gilt weiter `[[FEHLT: …]]` |
| **Erst berichten, dann beheben** | manche Brüche sind Entscheidungen (umbrechen oder kürzen?), die der Mensch trifft |
| **E-Mails und Adressen nur mit `example.com`, `example.org` oder `.test`** | eine Prüfdatei darf auf kein echtes Postfach und keine echte Seite zeigen |

### Ablauf

1. **Oberfläche kartieren.** Jeden dargestellten Wert mit Quelle, Typ, Grenze und „optional?"
   auflisten, auch die vergessenen: Zahl in der Überschrift („12 Bewertungen"), Datumsangaben,
   Buttontexte aus Daten, Alt-Texte, Avatare, die Länge der Liste selbst.
2. **Extremfall bauen** neben den Beispieldaten, gleich aufgebaut. Dazu drei Zustände, die
   kein einzelner Datensatz abdeckt: **leer** (0 Einträge), **eins** (jede Zahl genau 1,
   wegen der Mehrzahl), **viele** (realistische Obergrenze).
3. **Umschalter nur in der Entwicklung**, etwa eine Prüfroute, deren `getStaticPaths()` im
   Produktionsbuild nichts liefert, mit den Fällen `beispiel`, `extrem`, `leer`, `eins`,
   `viele`. Ungetestet, siehe `OFFENE-PUNKTE.md`.
4. **Brechen** in der echten Containerbreite, bei 320 px, in der größten Breite und mit 200 %
   Browserzoom. Liegt kein Browser vor: aus dem CSS schließen und ausdrücklich sagen, was
   gesehen und was gefolgert ist.
5. **Bericht, dann anhalten.** Behoben wird erst auf Ansage. Danach alle Zustände erneut
   durchschalten, auch „beispiel": eine Korrektur für den Extremfall darf den Normalfall nicht
   verschlechtern. Die Extremdaten bleiben als Regressionsprobe im Projekt.

### Werte, die auf Kundenseiten brechen

| Feld | Extremwert | Bricht |
|---|---|---|
| Name im Team | `Maximilian-Alexander von Hohenstein-Wettberg` | Zeilenumbruch, Kartenhöhe, Initialen |
| Name im Team | `Jo` | leere Namensspalte, Initialen „J" |
| Name | `Özlem Yıldırım-Schäfer`, `Đặng Thị Ngọc Hân` | gestapelte Diakritika werden bei knapper `line-height` mit `overflow: hidden` abgeschnitten |
| Berufsbezeichnung | `Rechtsanwaltsfachangestellte` | ein Wort ohne Umbruchstelle sprengt schmale Karten |
| Firma | `Steuerberatungsgesellschaft Müller & Partner mbB` | Fuß, Impressum, Kopfzeile auf 320 px |
| E-Mail | `bartholomaeus.fitzgerald@nordwest-industrieholding.example.com` | schiebt Nachbarn aus der Zeile |
| Leistungstitel | `Kraftfahrzeug-Haftpflichtversicherung` | Überschrift in einer Kachel, Navigation |
| Bewertung | 0, 1, Text mit 2.000 Zeichen, ohne Foto | Leerzustand, „1 Bewertungen", Kartenhöhe, Avatar-Rückfall |
| Stellen, Referenzen | 0, 1, 40 oder 60 Einträge | Leerzustand, Raster mit einer Karte, Seitenlänge, Paginierung |
| Zahl | `1284`, `12345678,9` | ohne `Intl.NumberFormat('de-DE')` kein Tausenderpunkt, falsches Dezimalzeichen |
| Zahl | `0`, `null`, `NaN` | „0 Mitglieder", Literal im Text |
| Zahl, die sich ändert | `99` zu `100` | springt ohne `font-variant-numeric: tabular-nums` |
| Datum | heute, vor 12 Tagen, in der Zukunft | „vor 0 Sekunden", „vor -3 Tagen" |
| Öffnungszeiten | geteilte Zeiten, Ruhetag, Feiertag | Tabellenbreite, leere Zelle |
| Bild | fehlt, 4000×200, 200×4000, transparentes Logo auf dunklem Grund | Rückfall, Verzerrung ohne `object-fit`, unsichtbares Logo, Sprung ohne `aspect-ratio` |
| Text aus Daten | `<script>`, `&amp;`, Zeilenumbruch in einem einzeiligen Feld | Escaping, doppelte Zeilenhöhe |
| Zustand | Ladefehler der Bewertungs-API, Serverfehler im Formular | verständliche Meldung statt `TypeError` |

### Bruchbilder und ihre Ursache

| Was man sieht | Ursache | Lösung |
|---|---|---|
| Avatar oder Icon gequetscht | Flex-Kind schrumpft | `flex-shrink: 0` |
| Text läuft aus dem Kasten | Flex- oder Grid-Kind mit `min-width: auto` | `min-width: 0`, im Grid `minmax(0, 1fr)` |
| E-Mail oder URL über den Rand | keine Umbruchstelle | `overflow-wrap: anywhere` an diesem Element, nie `hyphens: auto` (harte Grenze) |
| Avatar treibt neben dreizeiligem Namen | `align-items: center` bei wechselnder Höhe | oben ausrichten, sobald Text umbrechen kann |
| Falsche Initialen | `.split(' ')[0][0]` | Graphemcluster über `Intl.Segmenter`, Rückfall-Icon |
| „1 Bewertungen" | feste Mehrzahl | `Intl.PluralRules('de-DE')` oder Texte je Anzahl |
| Leere Zeile, wo die Rolle stand | Platzhalter für ein fehlendes optionales Feld | Zeile weglassen, nie einen Strich als Platzhalter (harte Grenze) |
| Diakritika abgeschnitten | knappe `line-height` mit `overflow: hidden` | großzügigere Zeilenhöhe, Textkästen nicht beschneiden |
| Gekürzter Text ohne Weg zum Volltext | nur `text-overflow: ellipsis` | Volltext sichtbar an anderer Stelle, nicht nur als `title` |
| `&amp;` erscheint roh | falsche Escaping-Ebene | einmal beim Ausgeben escapen, nie `set:html` mit Nutzerdaten |

### Umbrechen, kürzen oder begrenzen

| Wahl | Für | Grund |
|---|---|---|
| umbrechen | Namen, Titel, alles, woran man etwas erkennt | wer es nicht vollständig liest, verwechselt es |
| am Ende kürzen | Nebeninformation, deren Anfang trägt, immer mit Weg zum Volltext | der Anfang reicht zum Erkennen |
| begrenzen (`line-clamp`) | mehrzeilige Vorschauen in Karten | Kartenhöhen bleiben berechenbar |
| nie kürzen | Preise, Beträge, Daten, Telefonnummern | ein abgeschnittener Preis ist ein falscher Preis |

Bericht in drei Teilen: was brach (Schwere kaputt, unschön oder brüchig, mit Lösung als
`datei:zeile`), Entscheidungen für den Menschen mit Empfehlung, was gehalten hat.

