# Icons: ein eigenes System ableiten

Ein Icon-Set wird **abgeleitet, nicht ausgewählt.** Wer Lucide installiert und zwölf Icons
herauszieht, hat dieselben zwölf Icons wie zehntausend andere Seiten. Das ist für
Systemicons richtig und für die Leistungssektion falsch.

Der Unterschied ist sichtbar: ein Icon-Set, dessen Strichstärke zur Display-Schrift passt und
dessen Ecken den Radius der Tokens aufnehmen, wirkt wie Teil der Marke. Ein
zusammengesuchtes Set wirkt wie Clipart, auch wenn jedes einzelne Icon gut ist.

## Erst die Entscheidung: Bibliothek oder eigenes Set

Ein komplettes eigenes Set von 80 Icons ist in den meisten Budgets nicht zu verantworten und
auch nicht nötig. Die Frage ist nicht „eigene Icons ja oder nein", sondern **wo man den
Unterschied sieht.**

| Verwendung | Herkunft | Grund |
|---|---|---|
| Menü, Schließen, Pfeil, Haken, Plus, Suche, Telefon, Mail | **Bibliothek** | Konventionen. Ein eigenes Menüicon ist kein Mehrwert, sondern ein Erkennungsrisiko |
| Leistungen, Nutzenversprechen, Prozessschritte auf der Startseite | **eigenes Set** | 4 bis 8 Icons, prominent platziert, groß dargestellt. Hier sieht man es |
| Branchenspezifische Gegenstände (Flachdach, Probe, Messreihe, Fräser) | **eigenes Set** | gibt es in keiner Bibliothek in der richtigen Form |
| Trust-Leiste, Fußzeile, Formularhinweise | **Bibliothek** | klein, funktional, niemand sieht hin |

Die Bibliothek richtet sich nach dem Projekt, nicht nach Gewohnheit. In einem
shadcn-Projekt gibt `npx shadcn@latest info --json` das Feld `iconLibrary` aus, und das
gilt (siehe `11-komponenten-shadcn.md`). **Nie `lucide-react` annehmen.**

**Die Sets nicht mischen, ohne sie anzupassen.** Ein eigenes Icon mit 2 px Strich neben einem
Lucide-Icon mit 2 px Strich passt nur, wenn auch Kappen, Ecken und optische Größe stimmen.
Sonst wirkt eines der beiden falsch, und man sieht nicht, welches.

## Die Ableitung, in vier Schritten

### 1 Strichstärke aus der Schrift

Die Strichstärke der Icons folgt dem Gewicht der Display-Schrift, nicht dem Zufall. Ein
Icon mit 1,5 px Strich neben einer Headline in 700 wirkt dünn und verloren.

| Display-Schrift | Strichstärke auf 24er Raster |
|---|---|
| 300 bis 400 (Light, Regular) | 1,5 px |
| 500 bis 600 (Medium, Semibold) | 1,75 px |
| 700 und mehr (Bold) | 2 px |
| Sehr fette Display-Schrift, kontrastreiche Serife | 2,25 px oder Flächenicons |

Der Wert steht in `marke.json` unter `icons.strichstaerke` und ist damit prüfbar.

**Bei sehr fetten Schriften lohnt der Wechsel zu Flächenicons** statt noch dickerer Striche:
ein 3 px starkes Linienicon verliert bei 24 px Größe seine Binnenformen.

### 2 Ecken und Kappen aus den Tokens

```
--radius-s: 0.5rem   → Icon-Ecken gerundet, stroke-linejoin: round, linecap: round
--radius-s: 0.125rem → Icon-Ecken fast kantig, linejoin: miter, linecap: butt
--radius-pille       → weiche Silhouetten, runde Kappen, organische Formen
```

**Der Eckenradius im Icon ist nicht derselbe Wert wie im Layout.** Eine Karte mit 16 px
Radius bedeutet für ein 24 px großes Icon etwa 2 px Radius: proportional zur Fläche, nicht
absolut. Deshalb gibt es `icons.eckenradius` als eigenen Wert in `marke.json`.

### 3 Formensprache aus dem Gegenstand

Das ist der Schritt, der aus einem konsistenten Set ein markenspezifisches macht, und er
kommt direkt aus dem Markenbrief (`marke-brief.md`, Abschnitt 1: was am Gegenstand
bildwürdig ist).

| Branche | Formenlogik | Konkret |
|---|---|---|
| Dachdecker, Bauwerksabdichtung | Schichten, Gefälle, Wasser | horizontale Lagen, schräge Kanten, Tropfenform, geschlossene Konturen |
| Labor, Messtechnik | Proben, Reihen, Maßstäbe | Raster, Skalenstriche, Kreise in Reihen, präzise Winkel |
| Kinderarztpraxis | Rundung, Weichheit | keine Ecke unter 45 Grad, runde Kappen, offene Formen |
| Präzisionsmechanik | Toleranz, Passung | konzentrische Kreise, Winkelmaße, harte Kanten, kein Radius |
| Kanzlei | Ordnung, Dokument | Rechtecke, Haarlinien, gleiche Abstände, keine Illustration |

**Die Prüffrage:** Könnte dieses Icon auf der Seite eines Steuerberaters stehen? Wenn ja und
der Kunde ist kein Steuerberater, ist es ein Bibliotheksicon geworden.

### 4 Das Raster, nicht verhandelbar

```
viewBox="0 0 24 24"
Sicherheitsrand:   2 px an allen vier Seiten → nutzbare Fläche 20 x 20
Strich auf halben Pixeln: eine 2px-Linie liegt bei y="12", nicht bei y="12.5"
stroke-linecap, stroke-linejoin: EIN Wert für das ganze Set
fill="none" bei Linienicons, stroke="currentColor"
```

**`currentColor` ist Pflicht.** Ein Icon mit fest eingebauter Farbe funktioniert nicht in
dunklen Sektionen, nicht im Hoverzustand und nicht im Fokusring. Alle Farben im Icon kommen
vom Elternteil.

## Optische Korrektur statt geometrischer Gleichheit

Dasselbe Prinzip wie beim Spacing (`15-spacing-rhythmus.md`, Regel 5): gleiche Zahlen sind
nicht gleiche Größen.

| Form | Geometrisch | Optisch richtig | Grund |
|---|---|---|---|
| Quadrat | 20 x 20 | 20 x 20 | Referenz |
| Kreis | 20 | **21 bis 22** | die Silhouette weicht an den Rändern zurück |
| Dreieck | 20 | **22 bis 23** | zwei Seiten laufen spitz zu, die Fläche ist kleiner |
| Liegendes Rechteck | 20 breit | 20 breit, aber Höhe anpassen | Breite dominiert die Wahrnehmung |

Ein Set, in dem alle Icons genau 20 x 20 belegen, sieht unruhig aus: die Kreise wirken zu
klein, die Dreiecke zu klein, nur die Quadrate sitzen. Diese Korrektur ist der Unterschied
zwischen „selbst gezeichnet" und „vom Profi".

**Optische Mitte statt geometrischer Mitte** gilt auch: ein Play-Dreieck sitzt in einem
runden Knopf minimal rechts von der Mitte, sonst wirkt es links angelehnt.

## Technische Umsetzung

### Astro-Komponente

```astro
---
/*
  Ein Icon ist Dekoration ODER Information, niemals beides.

  aria-hidden="true" ist der Normalfall: das Icon begleitet einen Text, und
  ein Screenreader, der "Pfeil rechts Leistungen ansehen" liest, ist schlechter
  als einer, der "Leistungen ansehen" liest.

  Trägt das Icon die EINZIGE Information (ein Knopf ohne Text), braucht es ein
  Textlabel — als .sr-only-Text oder aria-label am Knopf, NICHT als <title> im
  SVG: <title> wird von Screenreadern unterschiedlich behandelt und ist als
  einziger Träger unzuverlässig.
*/
interface Props {
  name: string;
  groesse?: number;
  klasse?: string;
}
const { name, groesse = 24, klasse } = Astro.props;
---
<svg
  class={klasse}
  width={groesse}
  height={groesse}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  <use href={`/icons/set.svg#${name}`} />
</svg>
```

`focusable="false"` ist gegen alten Edge und IE nicht mehr nötig, schadet aber nicht und
verhindert in manchen Screenreader-Kombinationen einen leeren Tabstopp.

### Sprite oder inline

| Anzahl Icons | Weg | Grund |
|---|---|---|
| bis etwa 15 | **inline** | kein zusätzlicher Request, `currentColor` funktioniert direkt |
| mehr als 15, mehrfach verwendet | **Sprite mit `<use>`** | einmal laden, überall referenzieren |
| animierte Icons | **immer inline** | `<use>` verhindert den Zugriff auf einzelne Pfade |

**Ein Sprite in `public/` wird nicht von `astro:assets` verarbeitet.** Es muss also selbst
optimiert und mit Cache-Header versehen sein (`assets/vorlagen/_headers`).

### Skalierung: die Strichstärken-Falle

```css
/*
  Ein Icon, das von 24 auf 48 px skaliert wird, hat danach 4px Strich statt 2px
  und wirkt plump. Zwei Wege:

  a) Die Strichstärke mitrechnen — der richtige Weg, weil das Icon bei jeder
     Größe die Strichstärke des Sets behält.
  b) vector-effect: non-scaling-stroke — hält den Strich auf GERÄTEpixeln
     konstant. Klingt richtig, ist es aber selten: bei 200% Browserzoom bleibt
     der Strich dann hauchdünn, während alles andere wächst. Nur für technische
     Zeichnungen, nie für UI-Icons.
*/
.icon { stroke-width: calc(2 * 24 / var(--icon-groesse, 24)); }
```

Einfacher und in der Praxis besser: **ein Icon je Größenklasse zeichnen**, wenn ein Icon
sowohl bei 20 als auch bei 48 px erscheint. Das machen professionelle Sets so, und es ist
der Grund, warum Lucide bei 16 px weniger Details zeigt als bei 32.

### SVGO

```js
// svgo.config.mjs
export default {
  plugins: [
    { name: 'preset-default', params: { overrides: {
      /* Darf NICHT laufen: entfernt viewBox und damit die Skalierbarkeit. */
      removeViewBox: false,
      /* IDs im Sprite müssen bleiben, sonst zeigt <use href="#name"> ins Leere. */
      cleanupIds: false,
    }}},
    /* currentColor erzwingen: eine eingebaute Farbe bricht dunkle Sektionen. */
    { name: 'convertColors', params: { currentColor: true } },
    'removeDimensions',
  ],
};
```

`removeDimensions` entfernt `width`/`height` aus der Datei, damit die Komponente sie setzt.
Bei einem Sprite ist das richtig, bei einem einzelnen `<img src="icon.svg">` falsch: dort
fehlt dann die Größe und das Layout springt (CLS).

## Barrierefreiheit

- **Ein rein dekoratives Icon bekommt `aria-hidden="true"`** und keinen Alternativtext. Ein
  Icon, das gar nichts beiträgt, fliegt raus statt `aria-hidden` zu bekommen.
- **Ein Icon als einziger Inhalt eines Knopfes braucht ein Textlabel.** Ein Knopf mit nur
  einem X ist ohne `aria-label="Menü schließen"` unbenutzbar.
- **Icon plus Text: nur der Text wird gelesen.** Doppelte Ansage ist eine Verschlechterung.
- **Ein Icon ist nie der einzige Statusträger.** Ein grüner Haken ohne Wort ist für
  Farbfehlsichtige mehrdeutig, siehe `04-barrierefreiheit-bfsg.md`.
- **Kontrast gilt auch für Icons:** ein Icon, das Information trägt, braucht 3:1 gegen seinen
  Hintergrund (WCAG 1.4.11). Ein dekoratives Icon nicht, aber ein zu blasses dekoratives Icon
  ist trotzdem schlechtes Design.
- **Emoji sind keine Icons.** Sie werden je Plattform anders gerendert, sind je nach
  Screenreader geschwätzig („Gesicht mit Freudentränen") und haben keine einheitliche
  Strichstärke.

## Favicon und App-Icons

Aus demselben Set abgeleitet, aber **neu gezeichnet, nicht skaliert.** Ein 24er-Icon bei
16 px ist Brei.

| Datei | Größe | Hinweis |
|---|---|---|
| `favicon.svg` | skalierbar | moderner Standard, dark-mode-fähig über `prefers-color-scheme` im SVG |
| `favicon.ico` | 32 x 32 | noch nötig für alte Browser und manche Feedreader |
| `apple-touch-icon.png` | 180 x 180 | **ohne Transparenz**, iOS füllt sonst schwarz |
| `icon-192.png`, `icon-512.png` | für Manifest | `maskable` braucht 20 % Sicherheitsrand |

Einbindung siehe `../assets/vorlagen/head-meta.html`.

## Prüfung

- **Alle Icons in einer Reihe nebeneinander bei 24 px ansehen.** Fällt eines heraus, stimmt
  seine optische Größe oder seine Strichstärke nicht.
- **Dasselbe bei 16 px und bei 48 px.** Ein Icon, das bei 16 px zu Brei wird, braucht eine
  eigene kleine Fassung.
- **In einer dunklen Sektion ansehen.** Ein Icon mit eingebauter Farbe fällt hier auf.
- **Mit Tastatur durch alle Knöpfe**, die nur ein Icon tragen. Wird etwas vorgelesen?
- `node scripts/pruefe-tokens.mjs` findet Icons mit hartcodierter Farbe.

## Animierte Icons

Nur bei echtem Zustandswechsel, nie als Dekoration. Details in `18-motion-handschrift.md`.
Der häufigste sinnvolle Fall ist Menü zu Schließen: zwei Linien, die sich zum Kreuz drehen.
Ein Icon, das beim Hovern wackelt, ist Lärm.

## Verwandte Kapitel

- Visuelle Ableitung, Tokens, Anti-Schablone: `10-visuelle-richtung.md`
- Icon-Regeln in React-Komponenten: `11-komponenten-shadcn.md`
- Alt-Texte, Kontrast, Statusträger: `04-barrierefreiheit-bfsg.md`
- Bewegung: `18-motion-handschrift.md`
