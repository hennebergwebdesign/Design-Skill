# Prüfung und Abnahme

Nur berichten, was tatsächlich ausgeführt wurde. Formulierungen wie "sollte funktionieren"
oder "ist produktionsreif" ohne Beleg sind der teuerste Fehler in diesem Ablauf, weil sie
erst beim Kunden auffallen.

Die vollständige Liste kurz vor dem Livegang steht in
`../../webdesign-conversion/assets/checklisten/pre-launch.md`, das Audit einer bestehenden
Seite in `conversion-audit.md` daneben. Dieses Kapitel ist der Ablauf während der Umsetzung.

## Ablauf

### 1. Build und Typprüfung

```bash
pnpm build          # oder npm run build
pnpm astro check    # falls TypeScript im Projekt
```

Warnungen nicht ignorieren. Sie sind fast immer echte Fehler in der Ausgabe.

### 2. Die neun Prüfskripte

```bash
node scripts/pruefe-striche.mjs                 # Gedankenstriche, hyphens: auto, verbotene Wörter
node scripts/pruefe-tokens.mjs                  # hartcodierte Farb-, Abstands- und Schriftwerte
node scripts/pruefe-kontrast.mjs                # Kontrastwerte der Rollen-Tokens
node scripts/pruefe-platzhalter.mjs --launch    # [[FEHLT]], data-copy-vorschlag, ausgelassener Code
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
node scripts/pruefe-geschmack.mjs               # nach dem Build: Kicker, Laufband, CTA-Texte, KI-Tells
node scripts/pruefe-motion.mjs                  # transition: all, scale(0), ease-in, Dauer, Reduzierung
node scripts/pruefe-geo.mjs                     # nach dem Build: robots.txt, KI-Crawler, Text im HTML, JSON-LD
node scripts/pruefe-aktualitaet.mjs             # nach dem Build: Copyright-Jahr, Stand-Angaben, Jahr im Titel
```

`pruefe-geschmack.mjs` zählt, was sich an Geschmack zählen lässt: höchstens ein Kicker je drei
Sektionen, höchstens ein Laufband, ein Text je Kontaktabsicht, dazu Warnungen für
`overflow-x: hidden`, eigene Mauszeiger, `100vh` ohne `svh`, die Standardserifen und die
Premium-Standardpalette. Der Rest steht als Vorflugcheck in
`../../webdesign-conversion/references/26-geschmack-und-ki-tells.md` und wird angesehen.

`pruefe-motion.mjs` liest die Quellen und zählt, was an Bewegung zählbar ist: `transition: all`,
Start bei `scale(0)`, `ease-in`, Layoutwerte in `transition`, feste Dauern über 300 ms,
`:hover` mit Bewegung ohne `@media (hover: hover)`, und Animation ohne
`prefers-reduced-motion` im ganzen Projekt. Zweck, Ursprung und Unterbrechbarkeit werden danach
angesehen, siehe den Review in `../../webdesign-conversion/references/30-motion-pruefung.md`.

`pruefe-geo.mjs` liest `dist/`: den Zustand der KI-Crawler in der `robots.txt`, Seiten mit
kaum Text im ausgelieferten HTML, `h1` und Ebenen, ungültiges JSON-LD und `FAQPage` mit
Fragen, die nicht sichtbar auf der Seite stehen. Ob eine Sperre gewollt ist, entscheidet der
Kunde, siehe `../../webdesign-conversion/references/31-ki-sichtbarkeit-geo.md`.

`pruefe-breakpoints.mjs` rendert acht Größen, die fünf Breakpoints plus 320 px, 1366 × 768
und 1440 × 720, legt Screenshots ab und meldet horizontalen Überlauf mit dem Selektor des
äußersten Verursachers, zu kleine Touchziele, Schrift unter 14 px und Bilder ohne Maße.

Gefundene Punkte direkt beheben und erneut laufen lassen, bis nichts mehr gemeldet wird.
Danach die Screenshots ansehen und mit dem Entwurf abgleichen. Der automatische Teil findet
kaputte Layouts, nicht hässliche.

Ein Befund aus `pruefe-tokens.mjs`, der bewusst so bleibt, bekommt einen Kommentar mit dem
Wort "bewusst" und eine Begründung. Ohne diesen Kommentar bleibt es ein Befund, kein
Sonderfall.

### 3. Abgleich mit dem Entwurf

Der Entwurf, meist aus Claude Design, gibt die verbindliche Richtung vor. Sinnvolle
Abweichungen sind erlaubt und erwünscht, wenn sie ein echtes Problem lösen: fehlende
Zustände, schlechte Lesbarkeit auf kleinen Geräten, zu geringer Kontrast, fehlende Sektion
für einen nötigen Schritt in der Nutzerführung. Jede bewusste Abweichung wird im
Abschlussbericht in einem Satz begründet.

Nicht erlaubt ist stilles Umgestalten, weil etwas anders schöner wirkt.

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

### 6. Sicherheit

* `grep -rn "sk_\|api_key\|API_KEY\|password" src/ public/` ohne Treffer mit echten Werten
* `grep -rn "API_KEY\|SECRET" dist/` ohne jeden Treffer, das ist die Prüfung, die zählt
* `.env` und `.relaunch-inventory/` stehen in der `.gitignore`
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
* Das Modell meldet die Seite nie als abgenommen. Abgenommen ist sie, wenn ein Mensch es sagt.

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
neun Prüfskripte ohne Fehler, Tastaturdurchlauf auf 375 und 1440 px, Formular mit allen vier
Zuständen getestet" ist überprüfbar, "funktioniert" nicht.

Zum Schluss ein Satz dazu, dass Rechtstexte und Datenschutzangaben vorbereitet, aber nicht
rechtlich geprüft sind.
