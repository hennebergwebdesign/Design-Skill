# DESIGN.md: das Designsystem als Übergabedokument

`DESIGN.md` ist ein offenes Format für ein Designsystem in einer Textdatei: oben Tokens als
YAML, darunter Prosa mit Begründungen. Werkzeuge wie Google Stitch, die gstack-Skills
`/design-consultation` und `/design-review` oder fremde Agenten lesen es, bevor sie
gestalten. Dieses Kapitel klärt, wie die Datei zu `marke.json` und `tokens.css` steht, wann
sie entsteht und wie sie aufgebaut ist.

Die Substanz stammt aus der Spezifikation
[google-labs-code/design.md](https://github.com/google-labs-code/design.md) (Apache 2.0,
Stand „alpha"), dem Skill `design-md` aus
[google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)
(Apache 2.0) und `/design-consultation` aus [garrytan/gstack](https://github.com/garrytan/gstack)
(MIT). Übernommen sind Aufbau, Abschnittsfolge und die Pflicht zur Begründung. Umgedreht ist
die Rangfolge, siehe Abschnitt 1.

## Inhalt

- 1\. Die Entscheidung: Abzug, nicht Quelle
- 2\. Wann sie entsteht
- 3\. Aufbau
- 4\. Regeln für den Abzug
- 5\. Prüfen
- 6\. Was bewusst nicht übernommen wurde
- Verwandte Kapitel

## 1. Die Entscheidung: Abzug, nicht Quelle

Die Spezifikation nennt die Tokens in `DESIGN.md` „normativ". In diesem Plugin ist das schon
`marke.json`, und `tokens.css` leitet sich daraus ab. Eine dritte Datei mit eigenen Werten
wäre eine zweite Wahrheit, und bei zwei Wahrheiten gewinnt in der dritten Sitzung die
bequemste (dasselbe Argument wie in `24-designsystem-vorrang.md`). Deshalb gilt:

```
marke.json  ──►  tokens.css  ──►  DESIGN.md
 (Quelle)        (Umsetzung)       (Abzug für Menschen und fremde Werkzeuge)
```

| Datei | Rolle | Wer schreibt | Wer liest |
|---|---|---|---|
| `marke.json` | einzige Quelle für Rollen, Schriften, Raum, Motion, Sprache | Projekt, Skripte setzen nur Prüffelder | `pruefe-striche`, `pruefe-tokens`, jede Sitzung |
| `marke-brief.md` | Strategie, Zielgruppe, Begründungen in Prosa | Projekt | Menschen, jede Sitzung |
| `tokens.css` | die Werte als Custom Properties, mit Kommentaren | Projekt, `typoskala.mjs` | Browser, `pruefe-kontrast`, `pruefe-typografie` |
| `DESIGN.md` | lesbarer Abzug aller drei | wird erzeugt, nie von Hand gepflegt | Designteam des Kunden, Fremdagentur, Stitch, gstack |

Daraus folgen drei Regeln:

| Regel | Grund |
|---|---|
| Eine Änderung geht zuerst in `marke.json` oder `tokens.css`, danach wird `DESIGN.md` neu abgezogen | sonst laufen Code und Dokument auseinander, und niemand weiß, welcher Wert gilt |
| Widersprechen sich `DESIGN.md` und `marke.json`, gilt `marke.json` | die Prüfskripte lesen `marke.json` und `tokens.css`, nicht `DESIGN.md` |
| Kein `npx @google/design.md export` nach `tokens.css` | der Export schreibt Tailwind- oder DTCG-Namen, verliert die Kommentare, die zwei Typokurven und die Rollennamen, die `pruefe-kontrast.mjs` erwartet |

## 2. Wann sie entsteht

| Anlass | Erzeugen | Grund |
|---|---|---|
| normaler Agenturbau | nein | `CLAUDE.md`, `marke.json` und `marke-brief.md` reichen; jede weitere Datei kann veralten |
| Übergabe an ein Designteam des Kunden oder eine Fremdagentur | ja, in Phase 6 | wer das System weiterführt, braucht es ohne unsere Skripte lesbar |
| der Kunde arbeitet mit Stitch, gstack oder einem anderen Werkzeug, das `DESIGN.md` liest | ja, vor dessen erstem Einsatz | sonst rät das Werkzeug ein eigenes System |
| externer Design-Review mit gstack `/design-review` | ja, vorher neu abziehen | gstack bewertet Abweichungen von `DESIGN.md` strenger; ein veralteter Abzug erzeugt Scheinbefunde |
| der Kunde **liefert** ein `DESIGN.md` | keine eigene, seine bleibt unverändert | es ist Designsystem-Eingabe nach `24-designsystem-vorrang.md`, meist Stufe 1. Werte nach `marke.json` übernehmen, Quelle unter `herkunft.designsystem.quelle` eintragen |
| Bildmodell oder UI-Generator soll Entwürfe machen | nein, die Sperren aus `marke.json` gehen direkt in den Auftrag | `28-ki-bildentwuerfe.md` regelt den Auftrag; ein Abzug dazwischen ist eine Fehlerquelle mehr |

Liefert der Kunde eine Datei und soll trotzdem ein Abzug von uns entstehen, bekommt er einen
anderen Namen (`DESIGN.agentur.md`), damit nie eine Kundendatei überschrieben wird.

## 3. Aufbau

Vorlage: `../assets/vorlagen/DESIGN.md`, mit denselben Beispielwerten wie `marke.json` und
`tokens.css`.

### Das Front Matter: woher jeder Wert kommt

| Gruppe | Quelle | Übertragung |
|---|---|---|
| `name`, `description` | `projekt.kunde`, `gestaltung.lesart` | wörtlich |
| `colors` | `farbe.rollen`, aufgelöst zu Hex | Rollennamen ohne `farbe-`, dazu `primary` als Alias der Rolle `akzent` |
| `typography` | `typografie` und die `--text-*`, `--gewicht-*`, `--zeilenhoehe-*`, `--laufweite-*` | `fontSize` ist der Höchstwert bei 1440 px in rem |
| `rounded` | `--radius-*` | wörtlich |
| `spacing` | `raum.skala`, als `--raum-*` | in rem |
| `components` | Bausteine, die es im Code gibt | nur Farbpaare als Verweis `{colors.…}` |

`primary` steht dabei, weil der Prüfer der Spezifikation (`missing-primary`) sonst warnt und
fremde Werkzeuge eine eigene Hauptfarbe erfinden. Die übrigen Namen bleiben deutsch, weil sie
dieselben sind wie in `tokens.css`: wer im Abzug `marke-text` liest, findet
`--farbe-marke-text` im Code.

Fließende Größen haben im Front Matter keinen Platz: die Spezifikation kennt als Maß nur px,
em und rem, kein `clamp()`. Deshalb steht dort der Höchstwert und in der Prosa die Spanne von
360 bis 1440 px. Wer den Abzug liest, bekommt so das Verhältnis der Stufen, und wer baut,
nimmt die Werte aus `tokens.css`.

### Die Prosa: Abschnitte nach Spezifikation

Die Überschriften bleiben englisch und in dieser Reihenfolge, weil Werkzeuge und der Prüfer
die Abschnitte an ihrem Namen erkennen (`section-order`). Der Text darunter ist deutsch.

| Abschnitt | Inhalt | Quelle |
|---|---|---|
| Overview | Lesart, Gegenstand, Zielgruppe, die drei Regler, Designsystem-Stufe | `gestaltung`, `marke-brief.md` 1, 2, 7 |
| Colors | Rolle, Wert, wofür, Kontrast | `farbe.rollen`, Kommentare in `tokens.css` |
| Typography | Familien, Schnitte, Spanne je Stufe, Lizenz und Hosting | `typografie`, `55-typografie-system.md` |
| Layout | Breiten, Raumskala, Rhythmus, Haltepunkte, Layoutkonzept | `raum`, `layout`, `marke-brief.md` 7 |
| Elevation & Depth | Schatten und Flächenwechsel | `--schatten-*`, `21-sektionshintergruende-hierarchie.md` |
| Shapes | Radien, Formsperre | `--radius-*`, `gestaltung.sperren.form` |
| Components | Baustein, Datei im Projekt, Zustände | `src/components/ui/` |
| Do's and Don'ts | Sperren, Verworfenes, die harten Grenzen in einer Zeile | `marke-brief.md` 7, `26-geschmack-und-ki-tells.md` |
| Motion | Profil, Kurven, der eine orchestrierte Moment | `motion`, `18-motion-handschrift.md` |
| Iconography | Bibliothek, eigenes Set, Raster, Stil | `icons`, `17-icons-eigenes-system.md` |
| Voice | Anrede, Ton, zwei echte Beispielzeilen, verbotene Wörter | `sprache`, `marke-brief.md` |

`Motion`, `Iconography` und `Voice` sind keine Abschnitte der Spezifikation: `Motion` stammt aus
gstack, `Iconography` und `Voice` aus dem Blueprint in `47-claude-design-hacks.md`, Abschnitt 2.
Sie stehen nach den Abschnitten der Spezifikation, damit die geprüfte Reihenfolge davor
unberührt bleibt. Der Prüfer meldet sie nicht.

### Farben beschreiben

Aus dem Stitch-Skill übernommen: jede Farbe bekommt einen beschreibenden Namen, den Hexwert
und ihre Rolle, weil ein Mensch „Tannengrün für Links" behält und „#356a4f" nicht.

| So | Nicht so | Grund |
|---|---|---|
| Tannengrün (#356a4f): Links, Kicker, Zahlen auf hellen Flächen, 6,31:1 auf Weiß | „Ein ruhiges, vertrauensvolles Waldgrün, das Natürlichkeit ausstrahlt" | der Abzug ist ein Nachschlagewerk; Werbesprache trägt keine Regel |
| Markengrün (#6acc9a): nur Fläche, nie Text auf Hell | „Primary (#6acc9a)" | ohne Rolle wird die Markenfarbe als Textfarbe benutzt und reißt den Kontrast |

## 4. Regeln für den Abzug

| Regel | Grund |
|---|---|
| Erste Zeilen kennzeichnen den Abzug mit Datum und Quelle | wer die Datei öffnet, muss sehen, dass hier nichts geändert wird |
| Werte nur aus `marke.json` und `tokens.css`, nie aus einem Bild, einer Referenz oder einem Figma-Screenshot | Stufe 5 überschreibt nie Stufe 1 oder 2 (`24-designsystem-vorrang.md`); Farben aus Bildern sind höchstens abgeleitet (`28-ki-bildentwuerfe.md`) |
| Keine Bausteine erfinden | ein Abzug, der Komponenten nennt, die es im Code nicht gibt, wird als Auftrag gelesen. gstack sagt dasselbe: „omit invented `components` entries" |
| Fehlende Angaben als `[[FEHLT: …]]`, nie plausibel ergänzt | harte Grenze gegen erfundene Inhalte, gilt auch für Dokumente |
| Schriften mit Lizenz und „selbst gehostet" | ein Leser außerhalb des Projekts bindet sonst das Google-CDN ein |
| Keine Gedankenstriche im Text | Bildmodelle und Agenten übernehmen den Stil des Dokuments in ihre Ausgabe |
| Kein Dunkelmodus im Abzug, den es im Code nicht gibt | ein halber Dunkelmodus ist schlechter als keiner (`10-visuelle-richtung.md`) |

## 5. Prüfen

```bash
npx --yes @google/design.md lint DESIGN.md
```

Der Prüfer der Spezifikation meldet unauflösbare Verweise (`broken-ref`, Fehler), fehlendes
`primary`, Kontrast unter 4,5:1 bei Farbpaaren in `components`, Farben ohne Baustein
(`orphaned-tokens`) und die Abschnittsfolge. Die Vorlage ergibt mit Version 0.4.0 null
Fehler und sieben Warnungen `orphaned-tokens`: Rollen wie `fokus` oder `warnung` gehören zu
keinem Farbpaar eines Bausteins. Diese Warnungen sind erwartet und bleiben stehen, statt dass
Bausteine erfunden werden.

Der Prüfer ersetzt keine Kontrastprüfung im Projekt: er sieht nur die Paare, die im Abzug
stehen. Maßgeblich bleibt `scripts/pruefe-kontrast.mjs` gegen `tokens.css`.

Einen Abgleich zwischen Abzug und Quelle gibt es noch nicht als Skript. Bis dahin vor jeder
Übergabe die Hexwerte und Schriftfamilien des Abzugs gegen `marke.json` lesen.

## 6. Was bewusst nicht übernommen wurde

| Quelle sagt | Hier gilt | Grund |
|---|---|---|
| Tokens in `DESIGN.md` sind normativ (Spezifikation) | `marke.json` ist die Quelle, `DESIGN.md` ein Abzug | Abschnitt 1 |
| `DESIGN.md` per `export` in Tailwind-Theme oder `tokens.json` wandeln | nie in `tokens.css` exportieren | Abschnitt 1; Tailwind nur, wenn es im Projekt schon ist |
| gstack: `/design-consultation` schreibt `DESIGN.md` und ergänzt `CLAUDE.md` um „Read DESIGN.md before visual work" | `CLAUDE.md` verweist auf `marke.json` und `tokens.css` | die nächste Sitzung soll die Quelle lesen, nicht den Abzug |
| gstack: Schriften per Websuche verifizieren, Vorschau mit Google Fonts | Schriftwahl nach `10-visuelle-richtung.md`, Lizenz prüfen, selbst hosten | harte Grenze, kein fremdes CDN |
| gstack: KI-Entwurfsbild als Quelle der Tokens (`$D extract`) | Tokens nie aus einem Bild | `28-ki-bildentwuerfe.md`, Abschnitt 4 |
| Stitch `design-md`: Stimmung mit Adjektiven wie „Whisper-soft", „Airy" ausmalen | Rolle und Wert, Stimmung einmal als Lesart | die Lesart aus `26-geschmack-und-ki-tells.md` ist schon der eine Satz; Adjektivketten laden Bildmodelle zum Ausschmücken ein |
| Stitch `enhance-prompt`: vage Wünsche mit Stimmungswörtern aufladen („vibrant, playful") und den Designsystem-Block aus `DESIGN.md` voranstellen | Sperren aus `marke.json` nach `28-ki-bildentwuerfe.md` | dort steht der Auftrag schon vollständig, mit der Zeile gegen erfundene Inhalte, die `enhance-prompt` fehlt |
| gstack-Vorlage: Dunkelmodus immer beschreiben, Körpertext 1rem fest | nur, was im Code existiert; Skala fließend | `10-visuelle-richtung.md`, `55-typografie-system.md` |

Übernommen aus `enhance-prompt` ist nur das Vokabular für UI-Begriffe, wenn ein Kunde einen
Wunsch vage formuliert: „Menü oben" heißt Navigationsleiste mit Logo und Menüpunkten, „Liste"
heißt Kartenraster oder Liste mit Vorschaubild, „Bildbereich" heißt Heldenbereich mit
Vollbild. Das gehört in den Auftrag nach `28-ki-bildentwuerfe.md`, nicht in den Abzug.

## Verwandte Kapitel

- `24-designsystem-vorrang.md`: Rangfolge, und warum ein geliefertes `DESIGN.md` Stufe 1 ist
- `10-visuelle-richtung.md`: Rollen statt Werte, Kontrastregel, Dunkelmodus
- `55-typografie-system.md`: fließende Skala, warum `clamp()` nicht in den Abzug passt
- `28-ki-bildentwuerfe.md`: Sperren in den Auftrag an ein Bildmodell
- `26-geschmack-und-ki-tells.md`: Lesart und Regler im Abschnitt Overview
- `47-claude-design-hacks.md`: DESIGN.md im Prompt-Gerüst für Claude Design, Abschnitt 2
- `../assets/vorlagen/marke.json`, `marke-brief.md`, `tokens.css`: die Quellen des Abzugs
- `../../agentur-website-builder/references/design-review.md`: Review gegen `marke.json`
- `../../agentur-website-builder/references/figma-zu-code.md`: Figma-Variablen nach `tokens.css`
