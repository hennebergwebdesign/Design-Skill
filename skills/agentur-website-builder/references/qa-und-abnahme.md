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

### 2. Die fünf Prüfskripte

```bash
node scripts/pruefe-striche.mjs                 # Gedankenstriche, hyphens: auto, verbotene Wörter
node scripts/pruefe-tokens.mjs                  # hartcodierte Farb-, Abstands- und Schriftwerte
node scripts/pruefe-kontrast.mjs                # Kontrastwerte der Rollen-Tokens
node scripts/pruefe-platzhalter.mjs --launch    # [[FEHLT]] und data-copy-vorschlag
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder
```

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

* keine Platzhaltertexte aus der Entwicklung mehr im Markup
* alle `[[FEHLT: ...]]` gesammelt und im Bericht aufgeführt
* alle Copyvorschläge gesammelt, jeder mit `deslop-check.mjs` auf 5 von 5 geprüft
* `public/images/BILDER.md` aktuell, jedes Motiv mit Herkunft und Freigabestatus
* Datenschutzerklärung deckt jeden tatsächlich eingebauten Dienst ab, und keinen mehr
* bei Relaunch: jede alte URL hat ein Ziel, Stichprobe geprüft

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
## Bewusste Abweichungen vom Entwurf
## Nächste Schritte
```

"Geprüft mit Ergebnis" nennt das Werkzeug und den Befund, nicht das Gefühl: "Build grün,
fünf Prüfskripte ohne Fehler, Tastaturdurchlauf auf 375 und 1440 px, Formular mit allen vier
Zuständen getestet" ist überprüfbar, "funktioniert" nicht.

Zum Schluss ein Satz dazu, dass Rechtstexte und Datenschutzangaben vorbereitet, aber nicht
rechtlich geprüft sind.
