# Typografiesystem: Skala, rem, Zeilen, Schriftladen

Welche Schrift zur Marke passt, entscheidet `10-visuelle-richtung.md`. Dieses Kapitel regelt,
wie sie gesetzt wird: als System aus wenigen Zahlen, aus dem sich jede Größe, Zeilenhöhe und
Sperrung ableitet. Ziel ist eine Seite, die bei 360 und bei 1440 px gleich geordnet wirkt, bei
200 % Zoom und bei größer eingestellter Browserschrift lesbar bleibt und beim Laden nicht
springt.

Werkzeuge: `scripts/typoskala.mjs` rechnet die Skala, `scripts/schrift-metriken.mjs` misst
die Ersatzschrift, `scripts/pruefe-typografie.mjs` prüft das Ergebnis im Projekt. Die Vorlage
mit allen Tokens: `../assets/vorlagen/tokens.css` und `../assets/vorlagen/global-basis.css`.

## Inhalt

- 1\. Die fünf Grundregeln
- 2\. Die Skala: modular und fließend
- 3\. Was mit der Größe wandert
- 4\. Schriften laden ohne Sprung
- 5\. Deutscher Satz
- 6\. Ablauf im Projekt
- 7\. Abgleich mit taste-skill
- Verwandte Kapitel

## 1. Die fünf Grundregeln

| Regel | Warum | Geprüft von |
|---|---|---|
| Schriftgrößen in `rem`, nie in `px` | `rem` folgt der Schriftgröße, die eine Person im Browser eingestellt hat. `px` überschreibt sie. Wer 20 px statt 16 eingestellt hat, braucht das, und WCAG 1.4.4 verlangt Text, der sich auf 200 % vergrößern lässt | `pruefe-typografie` (`px-schrift`) |
| `html` bekommt keine Schriftgröße | Jeder Wert dort (10 px, 62,5 %) setzt die Einstellung der Person außer Kraft oder rechnet um sie herum. Der 62,5-%-Trick macht zusätzlich jede fremde Komponente zu klein | `wurzel-px`, `wurzel-prozent` |
| Fließend nur mit `rem`-Anteil: `clamp(min, Xrem + Yvw, max)` | `vw` wächst beim Zoomen nicht mit. Ein reines `5vw` bleibt bei 200 % Zoom gleich groß | `nur-vw` |
| Höchstwert höchstens das 2,5-fache des Mindestwerts | Browser zoomen höchstens auf 500 %. Liegt der Höchstwert über dem 2,5-fachen, gibt es Fensterbreiten, in denen 200 % Vergrößerung nicht erreichbar ist (Herleitung: Maxwell Barvian, Smashing Magazine 2023, „Addressing Accessibility Concerns With Using Fluid Type") | `zoomgrenze`, auch `typoskala.mjs` |
| Keine Schrift unter 14 px (0.875rem) | Darunter lesen Menschen über 50 auf dem Handy nicht mehr ohne Zoom. Gilt auch für Fußnoten, Formularhinweise und Cookie-Texte | `unter-boden`, zur Laufzeit `pruefe-breakpoints` |

Zeilenhöhe ohne Einheit (`1.5`), Laufweite in `em` (`-0.02em`): beides wächst dann mit der
Schrift. Ein `line-height: 24px` passt nur zu genau einer Größe (`zeile-px`, `laufweite-px`).

## 2. Die Skala: modular und fließend

Jede Stufe ist **Grundgröße × Verhältnis hoch Stufe**. Statt neun Größen werden zwei Zahlen
je Fensterbreite entschieden, alles andere folgt. Zwischen den Fensterbreiten wird linear
interpoliert, das Verfahren stammt von Utopia (utopia.fyi).

### Voreinstellung des Plugins

| Stützpunkt | Grundgröße | Verhältnis | Begründung |
|---|---|---|---|
| 360 px | 16 px | 1.2 (kleine Terz) | Heldenzeile mit langen deutschen Wörtern muss auf 324 px Satzbreite passen |
| 1200 px | 17 px | 1.333 (Quarte) | Hierarchie über Größe statt über Farbe oder Fettung |
| 1440 px | 18 px | 1.414 | Breite der meisten Entwurfsdateien: hier entspricht die Seite dem Entwurf |

| Token | Stufe | 360 px | 1200 px | 1440 px | Einsatz |
|---|---|---|---|---|---|
| `--text-xs` | -1 | 14 | 14 | 14 | Rechtliches, Formularhinweise. Am Boden |
| `--text-sm` | -0,5 | 14,6 | 14,7 | 15,1 | Bildunterschrift, Metazeile, `small` |
| `--text-base` | 0 | 16 | 17 | 18 | Fließtext |
| `--text-lg` | 0,5 | 17,5 | 19,6 | 21,4 | Einleitungsabsatz (`.text-gross`) |
| `--text-h4` | 1 | 19,2 | 22,7 | 25,5 | Kartentitel |
| `--text-h3` | 2 | 23 | 30,2 | 36 | Unterabschnitt |
| `--text-h2` | 3 | 27,6 | 40,3 | 50,9 | Sektionsüberschrift |
| `--text-zahl` | 3,5 | 30,3 | 46,5 | 60,5 | Kennzahl in einer Zahlenleiste |
| `--text-h1` | 4 | 33,2 | 53,7 | 72 | Heldenüberschrift |

Alle Werte in px gerechnet bei 16 px Browserschrift. Größte Spanne hat `--text-h1` mit dem
2,17-fachen, unter der Grenze von 2,5.

### Warum zwei Kurven

Eine einzige Kurve von 360 bis 1440 px lässt h1 zwischen 768 und 1200 px so schnell wachsen,
dass die Heldenzeile vierzeilig und der Heldenbereich höher als das Fenster wird. Die erste
Kurve endet deshalb bei 1200 px und steht in `:root`, die zweite steht in
`@media (min-width: 1200px)` und trägt nur die großen Grade weiter. An der Nahtstelle sind
beide Kurven gleich, es springt nichts.

### Eine andere Marke, eine andere Skala

Nicht einzelne Stufen von Hand verschieben, sondern die zwei Zahlen ändern und neu rechnen:

```bash
node scripts/typoskala.mjs --basis 16,17,18 --verhaeltnis 1.2,1.25,1.333     # ruhiger, für Kanzlei, Praxis
node scripts/typoskala.mjs --basis 16,18,19 --verhaeltnis 1.25,1.414,1.5     # expressiv, für Agentur, Marke mit Haltung
node scripts/typoskala.mjs --vorschau typo-vorschau.html                     # Musterblatt zum Fensterziehen und Zoomen
```

| Richtung aus `10-visuelle-richtung.md` | Verhältnis Desktop | Grundgröße Desktop |
|---|---|---|
| Ruhig, seriös, viel Text | 1.2 bis 1.25 | 17 bis 18 px |
| Ausgewogen (Voreinstellung) | 1.333 | 17 bis 18 px |
| Expressiv, große Typo | 1.414 bis 1.5 | 18 px, Display als eigene Stufe 5 |

Eine Displaystufe über h1 (`--stufen "…,text-display:5"`) reißt mit der Voreinstellung die
Zoomgrenze (2,56-fach). Dann die kleinste Größe dieser Stufe anheben, also auf dem Handy
nicht zu klein anfangen, oder auf 1440 px kleiner enden. Der Generator meldet das.

Der Generator überschreibt nichts. Seine Ausgabe ersetzt den Block mit `--text-*` in
`tokens.css` und die Media Query am Dateiende. Ein Wert aus `brand-extraktion.mjs` ist eine
Messung der alten Seite, kein Ersatz für die Skala: gemessene Größen sind Ausgangspunkt für
Grundgröße und Verhältnis, siehe `20-markenextraktion-bestandsseite.md`.

## 3. Was mit der Größe wandert

Größe allein ist keine Stufe. Zeilenhöhe, Laufweite und Gewicht gehören dazu, sonst steht eine
72-px-Zeile mit der Sperrung einer 16-px-Zeile da.

| Stufe | Zeilenhöhe | Laufweite | Gewicht | Zeilenlänge |
|---|---|---|---|---|
| h1, Zahl | `--zeilenhoehe-eng` 1.08 | `--laufweite-display` `-0.025em` | `--gewicht-display` 700 | `--breite-titel` 22ch |
| h2, h3 | `--zeilenhoehe-titel` 1.18 | `--laufweite-titel` `-0.015em` | `--gewicht-titel` 600 | 22ch |
| h4, Buttons, Navigation | `--zeilenhoehe-mittel` 1.3 | 0 | 600 | |
| Einleitung (`lg`) | `--zeilenhoehe-lead` 1.5 | 0 | 400 | `--breite-lead` 52ch |
| Fließtext | `--zeilenhoehe-normal` 1.6 | `--laufweite-text` 0 | `--gewicht-text` 400 | `--breite-text` 64ch |
| klein (`sm`, `xs`) | 1.6 | `--laufweite-klein` 0.01em | 400 | |
| Versalsatz, Abkürzungen | wie Umgebung | `--laufweite-versal` 0.06em | | |

Gründe:

- **Große Grade enger.** Schriften sind für Lesegrößen zugerichtet; vergrößert wirken
  Zwischenräume zu weit. Die Werte sind Ausgangspunkte, je Schrift im Musterblatt prüfen:
  manche Displayschnitte sind schon eng zugerichtet und laufen mit `-0.025em` zu.
- **Fließtext 1.6.** Deutsch hat lange Wörter und damit weniger Wortzwischenräume je Zeile;
  das Auge braucht mehr Durchschuss, um die Folgezeile zu finden.
- **Kleine Grade leicht gesperrt.** Unter 15 px laufen Buchstaben sonst ineinander.
- **Überschrift auf 22ch.** Eine Überschrift wird als Block gelesen. Läuft sie über die ganze
  Breite, zerfällt sie in eine lange und eine kurze Zeile. `text-wrap: balance` gleicht aus,
  ersetzt die Begrenzung aber nicht. `--breite-titel` ist bewusst nicht global gesetzt, weil
  ein Heldenbereich mit Bild daneben eine eigene Breite hat; in Textsektionen anwenden.
- **Abstand der Überschrift in `em`.** `margin: 0 0 0.5em` wächst mit der Stufe, und im Fluss
  (`.fluss`) steht über h2 und h3 `1.6em`, darunter wenig. Eine Überschrift gehört zu dem, was
  unter ihr steht, siehe `15-spacing-rhythmus.md`.

## 4. Schriften laden ohne Sprung

| Schritt | Umsetzung | Grund |
|---|---|---|
| Selbst hosten | WOFF2 aus `public/fonts/`, nie über `fonts.googleapis.com`, `use.typekit.net` oder `fonts.bunny.net` | Verbindung zu einem Drittserver, einwilligungspflichtig, siehe `07-recht-dsgvo.md` (`fremd-cdn`) |
| Nur benutzte Schnitte | eine `@font-face` je Gewicht aus `--gewicht-*`, ab vier Schnitten einer Familie eine variable Schrift | jeder Schnitt kostet 15 bis 40 KB. Fehlt ein benutzter Schnitt, verfettet der Browser künstlich (`fehlender-schnitt`) |
| Teilmenge `latin` | enthält Umlaute, ß und die deutschen Anführungszeichen „“ | `latin-ext` nur bei Namen mit ł, ő, č und ähnlichen |
| `font-display: swap` | in jeder `@font-face` der Webschrift | ohne Angabe bleibt Text bis zu drei Sekunden unsichtbar (`ohne-display`) |
| Eine Vorladung | `<link rel="preload" as="font" type="font/woff2" crossorigin>` für die Schrift der Heldenüberschrift, höchstens eine zweite | jede Vorladung konkurriert mit dem Heldenbild um die Leitung |
| Ersatzschrift | zweite `@font-face` auf `local('Arial')` mit `size-adjust` und Overrides, im Token an zweiter Stelle | sonst springt beim Wechsel jede Zeile, das ist CLS (`ohne-ersatz`) |

### Die Ersatzschrift messen

```bash
node scripts/schrift-metriken.mjs public/fonts/marke-400-normal.woff2
node scripts/schrift-metriken.mjs public/fonts/display-700-normal.woff2 --ersatz arial-fett
node scripts/schrift-metriken.mjs public/fonts/serife-400-normal.woff2 --ersatz times
```

Das Skript liest Ober- und Unterlänge aus der Datei und misst die Laufweite an einem deutschen
Mustertext. Ausgabe:

```css
@font-face {
  font-family: 'Instrument Sans Ersatz';
  src: local('Arial'), local('ArialMT'), local('Liberation Sans');
  font-weight: 400;
  size-adjust: 101.95%;
  ascent-override: 95.14%;
  descent-override: 24.52%;
  line-gap-override: 0.00%;
}
```

```css
--schrift-text: 'Instrument Sans', 'Instrument Sans Ersatz', system-ui, sans-serif;
```

Drei Fehler, die dabei oft passieren:

| Fehler | Folge | Richtig |
|---|---|---|
| `size-adjust` in der `@font-face` der **Webschrift** | die echte Schrift wird skaliert, 1rem ist nicht mehr 1rem | nur in der Ersatz-`@font-face` |
| Werte aus einem Blogartikel oder geschätzt | der Sprung bleibt, nur anders | je Schrift und Schnitt messen |
| Ersatz für eine fette Displayschrift gegen Arial Regular gemessen | der Browser verfettet den Ersatz zusätzlich, die Breite stimmt nicht | `--ersatz arial-fett`, `font-weight` steht in der Ausgabe |

Meldet das Skript `USE_TYPO_METRICS`, rechnen Browser mit den OS/2-Werten statt mit hhea. Die
Ausgabe nutzt hhea; ist der Unterschied groß, die Zeilenlage im Browser gegenprüfen. Auf
Android gibt es weder Arial noch Liberation Sans: dort greift die nächste Schrift im Stapel
ohne Anpassung. Das ist bekannt und hinnehmbar, weil Android die Webschrift aus dem Cache
meist schneller hat als der erste Satz steht.

## 5. Deutscher Satz

| Thema | Regel | Grund |
|---|---|---|
| Silbentrennung | keine, `hyphens: auto` ist gesperrt (harte Grenze, `pruefe-striche`) | trennt Komposita mitten im Wort. Ist die Spalte zu schmal, ist die Spalte falsch |
| Umbruch | `text-wrap: balance` für Überschriften, `pretty` für Absätze, `overflow-wrap: break-word` als Notbremse | keine Einzelwörter in der letzten Zeile, kein Überlauf bei sehr langen Wörtern |
| Anführungszeichen | „so“ und ‚so‘, `<q>` über `:lang(de) { quotes: … }` | "so" ist englisch und auf einer deutschen Seite ein Tell |
| Geschützte Leerzeichen | zwischen Zahl und Einheit (`10&nbsp;%`, `14&nbsp;Tage`), in `z.&nbsp;B.`, in Telefonnummern | sonst steht „%" allein am Zeilenanfang |
| Ziffern | `tabular-nums` in Tabellen, Preisen, Zählern (`.zahl`, `.preis`) | Proportionalziffern lassen hochzählende Zahlen seitlich springen |
| Abkürzungen | `<abbr>` mit `--laufweite-versal` | Versalien ohne Sperrung laufen zu |
| Gedankenstrich | nicht im Seitentext, Bereichsstrich bei Zahlen erlaubt | harte Grenze, siehe `12-copywriting.md` |
| Hervorhebung | eine Form im ganzen Projekt, `<em>` oder `<strong>` derselben Familie | `10-visuelle-richtung.md`, `26-geschmack-und-ki-tells.md` Abschnitt 8 |

## 6. Ablauf im Projekt

1. Schrift nach `10-visuelle-richtung.md` wählen, Lizenz prüfen, WOFF2 nach `public/fonts/`.
2. Skala rechnen: `node scripts/typoskala.mjs` mit der Richtung aus Abschnitt 2, Block in
   `tokens.css` ersetzen.
3. Musterblatt öffnen (`--vorschau`), Fenster von 360 bis 1440 px ziehen, auf 200 % zoomen,
   die Heldenzeile mit dem echten Text prüfen: auf 1440 und 1366 px höchstens zwei Zeilen.
4. Ersatzschrift je Familie messen und in `global-basis.css` eintragen.
5. Laufweite der Displaystufen am echten Schnitt prüfen und in `tokens.css` anpassen.
6. Nach dem Bau: `node scripts/pruefe-typografie.mjs` ohne Fehler, `pruefe-breakpoints.mjs`
   ohne Schrift unter 14 px.

Ein Wert, der beim Bauen entschieden wird und davon abweicht, steht mit Grund in `marke.json`
oder als Kommentar mit dem Wort „bewusst" in der Zeile. Sonst dreht ihn die nächste Sitzung
zurück.

## 7. Abgleich mit taste-skill

taste-skill (destilliert in `26-geschmack-und-ki-tells.md`) setzt Typografie als
Tailwind-Klassen. Übernommen ist die Richtung, die Werte sind auf dieses System übertragen:

| taste-skill | Hier | Grund |
|---|---|---|
| Display `tracking-tighter leading-none` | `--laufweite-display` `-0.025em`, `--zeilenhoehe-eng` 1.08 | `leading-none` (1.0) lässt Umlautpunkte und Akzente großer Versalien in die Unterlängen der Zeile darüber laufen; `-0.05em` ist für die meisten Textschriften zu eng. Für einen eng zugerichteten Displayschnitt im Musterblatt nachschärfen |
| Fließtext `leading-relaxed max-w-[65ch]` | 1.6 und `--breite-text` 64ch | übereinstimmend |
| Held `text-4xl md:text-6xl`, Sprünge an Haltepunkten | eine fließende Stufe `--text-h1` | Haltepunktsprünge erzeugen genau die Breiten, in denen die Zeile vierzeilig wird |
| `clamp(3rem, 5vw, 5.5rem)` für h1 (gpt-taste) | rem-Anteil Pflicht, Spanne höchstens 2,5 | reines vw wächst beim Zoomen nicht mit (WCAG 1.4.4) |
| Labels 10 bis 14 px mit +0.05 bis +0.1em (brutalist) | nichts unter 14 px, Versalien nicht für Labels | Boden aus Abschnitt 1, Versalienregel aus `10-visuelle-richtung.md` |
| Vierzeilige Heldenzeile ist ein Größenfehler, kein Textfehler | übernommen | steht als Heldenregel in `26-geschmack-und-ki-tells.md` |
| Große Grade negativ, kleine positiv sperren (redesign) | übernommen als Laufweitentokens | Abschnitt 3 |

## Verwandte Kapitel

- `10-visuelle-richtung.md`: Schriftwahl, gesperrte Standardschriften, Tokensystem
- `03-technik-performance.md`: Schriften im Ladebudget, Caching
- `04-barrierefreiheit-bfsg.md`: Zoom bis 200 %, Kontrast für große und kleine Schrift
- `15-spacing-rhythmus.md`: Abstände um Überschriften, Fluss in langen Texten
- `16-responsive-container.md`: Haltepunkte, Container Queries
- `20-markenextraktion-bestandsseite.md`: gemessene Typoskala einer Bestandsseite
- `26-geschmack-und-ki-tells.md`: Serifenreflex, Betonung, Heldenregeln
- `56-interface-regeln.md`: Inhalte und Texte im Interface, Theming
- `../../agentur-website-builder/references/figma-zu-code.md`: Figma-Schriftgrößen als Stützpunkte für `typoskala.mjs`
