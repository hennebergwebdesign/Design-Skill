# Designrecherche: der kuratierte Ablauf mit zwei Freigaben

Referenzrecherche ist Pflicht vor dem Tokenplan, siehe die harte Grenze in
`../../webdesign-conversion/SKILL.md`. Dieses Kapitel regelt, **wie** sie abläuft, damit aus
„eine Seite angesehen" eine nachvollziehbare Kette wird: entdecken, vorlegen, freigeben,
erfassen, analysieren, vergleichen, zweite Freigabe, und erst dann dauerhaft aufnehmen.

Der Grund für den Aufwand: Ein Modell, das Referenzen selbstständig sucht, abruft und in sein
eigenes Wissen schreibt, sammelt in drei Projekten einen Haufen unsortierter Beobachtungen
und produziert im vierten eine Seite, die nach Referenz drei aussieht. Zwei menschliche
Freigaben brechen das auf. Sie kosten je eine Minute und sind der Unterschied zwischen einem
Rechercheagenten und einem Scraper.

## Die zwei Tore

| Tor | Wann | Was der Mensch entscheidet | Ohne Freigabe passiert |
|---|---|---|---|
| **Tor 1** | nach der Entdeckung, **vor** jedem Abruf | welche Referenz überhaupt erfasst wird, und ob ganz, nur eine Sektion oder nur eine Komponente | kein Crawl, kein Screenshot, keine Ablage |
| **Tor 2** | nach Analyse und Ähnlichkeitsprüfung | ob ein Muster dauerhaft ins globale Skillwissen wandert, ein bestehendes erweitert, nur im Projekt bleibt oder verworfen wird | nichts wird dauerhaft aufgenommen, alles bleibt im Projekt |

Beide Tore sind nicht nur beschrieben, sondern durchgesetzt: `scripts/referenz-register.mjs`
ist die einzige Stelle, die Zustände ändert, und jeder nicht vorgesehene Übergang bricht mit
Exit 2 ab. Ein Aufruf von `referenz-crawl.mjs` auf einen Eintrag im Zustand `ENTDECKT`
scheitert, nicht mit einer Warnung, sondern mit einem Abbruch.

## Stand der Werkzeuge

Diese Tabelle ist ehrlich gepflegt. Was hier nicht als vorhanden steht, ist Handarbeit.

| Stufe | Werkzeug | Stand |
|---|---|---|
| Brief | `../../webdesign-conversion/assets/vorlagen/designrecherche-brief.md` | vorhanden |
| Entdeckung | `assets/recherche/referenzquellen.json`, Suche von Hand oder über WebSearch | Quellenliste vorhanden, kein Suchskript |
| Tor 1 | `scripts/referenz-register.mjs` | vorhanden, mit Tests |
| Erfassung | `scripts/referenz-crawl.mjs`, `scripts/lib/abruf.mjs` | vorhanden, mit Tests |
| Design DNA | `scripts/design-dna.mjs` | ab Version 3.6.0 |
| Vergleich | `scripts/muster-vergleich.mjs` | ab Version 3.6.0 |
| Tor 2 | `scripts/muster-paket.mjs` | ab Version 4.0.0 |

## Die sieben Stufen

```
1 Brief          →  2 Entdeckung  →  3 TOR 1  →  4 Erfassung
                                                      ↓
7 TOR 2          ←  6 Vergleich   ←  5 Design DNA
```

### 1 Design-Research-Brief

Vor der ersten Suche. Nicht „schöne Websites finden", sondern eine Suche nach **Funktion**.
Vorlage: `../../webdesign-conversion/assets/vorlagen/designrecherche-brief.md`, Ablage im
Kundenprojekt unter `.designrecherche/brief.md`.

Der Brief hält fest, was aus Phase 1 und 2 des Bauablaufs ohnehin vorliegt (Branche,
Zielgruppe, Positionierung, Conversionziel, Designsystem, Sektionsinventar) und beantwortet
zusätzlich die eine Frage, die den Rest bestimmt: **welche Sektionen brauchen überhaupt eine
Referenz.** Ein Footer braucht keine. Ein Konfigurator, eine technische Spezifikation oder
eine Fallstudienstrecke fast immer.

Der Unterschied in der Suchformulierung:

| statt | besser |
|---|---|
| „schöne Industrie-Websites" | „B2B-Industrie mit technischer Produktdarstellung, asymmetrischer Held, Fallstudien mit Messwerten" |
| „moderne Heroes" | „Held für erklärungsbedürftiges Produkt, Bild trägt Kontext statt Dekoration" |

### 2 Entdeckung

Quellen kommen aus `assets/recherche/referenzquellen.json`, siehe
`referenzquellen-konfiguration.md`. Dabei gilt eine Regel, die den Unterschied zum
Bildersammeln macht:

> **Eine Galerie ist eine Entdeckungsquelle, kein Beleg.** Ist die Originalseite erreichbar,
> ist sie die Referenz. Ein Galerie-Screenshot zeigt einen Zustand, oft nur Desktop, oft
> veraltet, nie das responsive Verhalten.

Für jeden Kandidaten wird ein Registereintrag angelegt:

```bash
node scripts/referenz-register.mjs anlegen \
  --name "Beispiel GmbH" --url https://beispiel.de --quelle land-book \
  --fuer hero,produktdarstellung \
  --grund "asymmetrischer Held bei erklärungsbedürftigem Produkt" \
  --extraktion raster,inhaltshierarchie,bild-text-verhaeltnis,cta-platzierung \
  --risiko "vermutlich clientseitig gerendert"
```

Mehrere Referenzen je Sektion sind erwünscht, siehe „Mehrere Referenzen, eine Synthese" unten.
Die Obergrenze von drei Referenzen aus `referenzen-und-auswahl.md` gilt für die
**Gesamtrichtung** des Projekts, nicht für die Zahl der Kandidaten, die vorgelegt werden.

### 3 Tor 1: Vorlage und Freigabe

```bash
node scripts/referenz-register.mjs vorlegen --alle
```

Das Skript erzeugt je Kandidat einen Block und setzt den Zustand auf `VORGELEGT`. Der Block
enthält Name, Adresse, Fundquelle, Ebene, Zielsektion, Begründung, geplante Extraktion, die
Ausschlussliste und die Risiken. Die Ausschlussliste ist vorbelegt und steht in jedem Block,
damit sichtbar bleibt, was nicht übernommen wird: Farbwerte, Schriften, Logo, Texte,
Bildmaterial, charakteristische Layoutkombinationen als Ganzes.

Danach **stoppen**. Nicht weiterarbeiten, nicht schon einmal abrufen, nicht „vorbereitend"
crawlen. Der Mensch antwortet mit einem von fünf Dingen:

| Antwort | Befehl |
|---|---|
| ganze Website freigeben | `freigeben --id ref-01-…` |
| nur eine Sektion | `freigeben --id ref-01-… --sektionen hero` |
| nur eine Komponente | `freigeben --id ref-01-… --komponenten cta` |
| ablehnen | `ablehnen --id ref-01-… --grund "…"` |
| Alternativen anfordern | neue Kandidaten anlegen und erneut vorlegen |

Eine Teilfreigabe ist keine Formsache: `referenz-crawl.mjs` erfasst dann nur den freigegebenen
Teil, und `design-dna.mjs` analysiert auch nur diesen.

### 4 Erfassung

```bash
node scripts/referenz-crawl.mjs --id ref-01-beispiel-de --breakpoints 375,768,1440 --screenshot
node scripts/referenz-crawl.mjs --alle
```

Das Skript arbeitet ausschließlich auf Einträgen im Zustand `FREIGEGEBEN` und bricht sonst mit
Exit 2 ab. Abrufstufen, robots.txt und Einrichtung: `firecrawl-recherche.md`.

Abgelegt wird in `.designrecherche/referenzen/<id>/`:

| Datei | Inhalt |
|---|---|
| `roh/seite.html` | das HTML der erfolgreichen Abrufstufe |
| `roh/seite.md` | Markdown, wenn die Stufe es liefert |
| `roh/screenshot.png` | nur mit `--screenshot` und nur, wenn eine Stufe es kann |
| `roh/<breite>.html`, `roh/<breite>.png` | je Breakpoint, nur über Playwright |
| `meta.json` | Abrufart, Status, erfasste Breakpoints, Analyseumfang, Grenzen |

**Eine Teilfreigabe beschränkt die Analyse, nicht den technischen Abruf.** Eine einzelne
Sektion lässt sich bei einer fremden Seite nicht getrennt anfordern, geliefert wird immer das
ganze Dokument. Der freigegebene Umfang steht deshalb in `meta.json` unter `analyse_umfang`,
und die Analyse wertet nur diesen aus. Das ehrlich zu benennen ist besser, als eine
technische Beschränkung zu behaupten, die es nicht gibt.

**Was nicht erfasst werden konnte, steht in `meta.json` unter `grenzen`**, im Klartext. Diese
Liste ist die Grundlage für die `unbekannt`-Belege der Design DNA.

### 5 Design DNA

Ab Version 3.6.0 über `scripts/design-dna.mjs`. Jeder Wert bekommt einen Beleg
(`beobachtet`, `abgeleitet`, `unbekannt`). Eine Eigenschaft, die nicht erfasst werden konnte,
wird als `unbekannt` geführt und nicht geschätzt.

### 6 Vergleich

Ab Version 3.6.0 über `scripts/muster-vergleich.mjs` gegen die globale Musterbibliothek.

### 7 Tor 2: dauerhaftes Wissen

Ab Version 4.0.0. Vier Ausgänge, nur die ersten beiden ändern das globale Skillwissen:

```bash
node scripts/referenz-register.mjs wissen --id ref-01-… --entscheidung global
node scripts/referenz-register.mjs wissen --id ref-01-… --entscheidung erweitern --muster hero-asymmetrisch-produkt
node scripts/referenz-register.mjs wissen --id ref-01-… --entscheidung projekt
node scripts/referenz-register.mjs wissen --id ref-01-… --entscheidung ablehnen
```

## Mehrere Referenzen, eine Synthese

Eine komplexe Sektion bekommt bewusst mehrere Referenzen, weil eine einzelne sonst zur
Vorlage wird:

| Referenz | liefert |
|---|---|
| A | Komposition des Heldenbereichs |
| B | typografische Hierarchie |
| C | Produktdarstellung |
| D | Verhalten der Handlungsaufforderung |

Aus vier Prinzipien entsteht eine eigene Lösung. Aus einer Referenz entsteht eine Kopie. Das
ist keine Geschmacksfrage, sondern die Anwendung der Anti-Kopie-Regel aus
`referenzen-und-auswahl.md`: der Prüfstein ist, ob jemand, der die Referenz kennt, die neue
Seite als deren Kopie erkennt.

## Projektwissen und globales Wissen

Die Trennung ist strikt und hat einen Grund: Projektwissen enthält fremdes Material und
Kundendaten, globales Wissen ist ein kuratiertes Nachschlagewerk.

| | Projektwissen | Globales Wissen |
|---|---|---|
| liegt in | `.designrecherche/` im Kundenprojekt | `../../webdesign-conversion/assets/musterbibliothek/` im Plugin |
| enthält | Register, Rohdaten, Screenshots, DNA, Vergleiche, Briefs | benannte Muster mit Prinzip und Metadaten |
| Lebensdauer | Projektlaufzeit | dauerhaft, versioniert |
| Git | gehört in die `.gitignore` des Kundenprojekts | wird bewusst committet |
| kommt hinein | automatisch, im Ablauf | nur über Tor 2, nur durch einen Menschen |

**Warum die Aufnahme ein eigener Commit im Plugin-Repository ist:** Das globale Wissen liegt
im Plugin, gearbeitet wird im Kundenprojekt, wo das Plugin nur installiert ist. Ein
Schreibzugriff dorthin wäre entweder wirkungslos (Marketplace-Installation wird beim nächsten
Update überschrieben) oder unsichtbar (`.claude/skills/`-Kopie ohne Git-Bezug). Tor 2 erzeugt
deshalb ein transportierbares Musterpaket im Kundenprojekt, und die Aufnahme ist ein bewusster
Commit im Repository `Design-Skill`. Das ist kein Umweg, sondern genau die Kuratierung, um die
es geht.

## Fehlerbehandlung

Nichts davon wird erfunden, alles wird benannt.

| Fall | Verhalten |
|---|---|
| Seite nicht erreichbar | Zustand bleibt `FREIGEGEBEN`, Grund im Bericht, Referenz ersetzen statt aus der Erinnerung beschreiben |
| `robots.txt` verbietet den Pfad | nicht abrufen, im Bericht benennen, Seite von Hand ansehen und Prinzipien selbst notieren |
| JavaScript-Anwendung ohne Server-Rendering | Direktabruf liefert nichts Brauchbares, Rückfallstufe nutzen, siehe `firecrawl-recherche.md` |
| unvollständiges HTML, externes CSS nicht erreichbar | betroffene DNA-Felder auf `unbekannt`, nicht schätzen |
| kein Screenshot möglich | responsive Aussagen auf `unbekannt`, nicht vom Desktop ableiten |
| Rate Limit, 429 | Pause und ein Wiederholungsversuch, danach abbrechen und benennen |
| Referenz doppelt | `anlegen` weist dieselbe Adresse ab, Exit 1 |
| Quelle nicht erreichbar | andere Quelle aus `referenzquellen.json`, das Fehlen im Bericht benennen |
| Firecrawl nicht verfügbar | Rückfall auf die nächste Stufe, der Abruf bricht nicht ab |

## Verwandte Kapitel

- Quellen konfigurieren und ergänzen: `referenzquellen-konfiguration.md`
- Rangfolge der Quellen, Anti-Kopie, Sektionsaufbau: `referenzen-und-auswahl.md`
- Abrufschicht, Firecrawl, Selbsthosting: `firecrawl-recherche.md`
- Was eine Referenz beeinflussen darf: `../../webdesign-conversion/references/24-designsystem-vorrang.md`
- Welche Quelle wofür taugt: `../../webdesign-conversion/references/22-premium-designquellen.md`
