# Spacing und Rhythmus

Abstand ist das stärkste Hierarchiesignal, das eine Seite hat. Stärker als Farbe, stärker als
Schriftgröße, stärker als jeder Rahmen. Eine Seite mit richtigem Spacing und mittelmäßiger
Typografie wirkt professionell. Umgekehrt nie.

Der Grund: Nähe liest das Auge als Zusammengehörigkeit, bevor es überhaupt liest. Das ist
Vorverarbeitung, keine Entscheidung. Deshalb ist Spacing auch die häufigste Ursache dafür,
dass eine technisch korrekte Seite billig aussieht.

## Die sechs Regeln

### 1 Spacing gehört dem Elternteil, nie dem Kind

Eine Karte bringt keinen `margin-bottom` mit. Eine Überschrift bringt keinen `margin-top`
mit. Wer Abstand mitbringt, bestimmt über einen Kontext, den er nicht kennt: dieselbe Karte
steht morgen in einem Raster mit `gap`, und dann addieren sich beide Werte.

```css
/* falsch: das Kind bestimmt den Abstand */
.karte { margin-bottom: 1.5rem; }

/* richtig: der Container bestimmt ihn */
.kartenliste { display: grid; gap: var(--raum-spalte); }
```

Deshalb ist `space-y-*` in `11-komponenten-shadcn.md` verboten, und deshalb löst `gap` fast
jedes Abstandsproblem besser als `margin`. `gap` kennt keine kollabierenden Ränder, keine
Sonderregel für das letzte Element und keinen `:last-child`-Selektor.

**Die eine Ausnahme:** Fließtext. In einem Prosablock (`<p>` nach `<p>`) ist
`margin-block-end` am Absatz richtig, weil der Rhythmus zum Text gehört, nicht zum
Container. `global-basis.css` macht das so, inklusive `p:last-child { margin-bottom: 0 }`.

### 2 Verwandtschaft entsteht durch Abstand, nicht durch Rahmen

Drei Elemente, die zusammengehören, brauchen keine Karte. Sie brauchen weniger Abstand
zueinander als zur Umgebung. Das ist der ganze Trick.

```
FALSCH                          RICHTIG
┌──────────────┐                Überschrift
│ Überschrift  │                Text dazu
│ Text dazu    │
└──────────────┘
┌──────────────┐                Überschrift
│ Überschrift  │                Text dazu
│ Text dazu    │
└──────────────┘
```

Beide Varianten gruppieren. Die rechte kommt ohne Rahmen, ohne Radius und ohne Schatten
aus und sieht deshalb nicht aus wie jede andere Seite. Genau deshalb steht „alles in
identische, gleich abgerundete Karten mit demselben weichen grauen Schatten" in
`02-design-ux.md` auf der Liste der Schablonen-Tells: die Karte ist meist ein Abstand, den
jemand nicht hingekriegt hat.

**Prüffrage vor jeder Karte:** Trägt der Rahmen Information (abgrenzbare Einheit, klickbare
Fläche, unterschiedlicher Status)? Wenn nein, ist er Dekoration und der Abstand macht die
Arbeit besser.

### 3 Die Sprünge der Skala müssen groß werden

Eine lineare Leiter (4, 8, 12, 16, 20, 24, 28, 32) ist wertlos: den Unterschied zwischen
20 px und 24 px sieht niemand, aber man verbringt Zeit damit, sich zu entscheiden. Eine
Skala mit wachsenden Sprüngen erzwingt echte Entscheidungen.

```
4  8  12  16  24  32  48  64  96  128
```

Ab 16 verdoppelt sich der Abstand ungefähr. Das ist die Skala in `marke.json` unter
`raum.skala` und in `tokens.css` als `--raum-1` bis `--raum-32`.

**Wenn ein Wert dazwischen nötig scheint, ist meistens die Gruppierung falsch, nicht die
Skala.**

### 4 Ungleiche Abstände sind die Regel, nicht der Fehler

Eine Sektion mit Überschrift oben und Inhalt darunter braucht oben mehr Luft als unten,
weil die Überschrift optisch leichter ist als ein Kartenblock. `padding` als Kurzschrift ist
hier fast immer falsch:

```css
.sektion {
  padding-block-start: var(--raum-sektion);
  padding-block-end: calc(var(--raum-sektion) * 0.8);
}
```

Dasselbe gilt innerhalb von Elementen: ein Button mit Text braucht links und rechts mehr
Innenabstand als oben und unten, sonst wirkt er gedrungen. Ein Eingabefeld braucht oben
etwas weniger als unten, weil die Grundlinie tiefer sitzt als die optische Mitte.

### 5 Optisches Spacing schlägt mathematisches

Gleiche Zahlen sind nicht gleiche Abstände. Drei Fälle, die im Alltag auftreten:

- **Icon neben Text.** Bei `gap: 8px` sitzt ein rundes Icon optisch zu weit weg, weil seine
  Silhouette an den Rändern zurückweicht. 6 bis 7 px wirken richtig. Bei einem quadratischen
  Icon stimmen 8 px.
- **Text in einer Fläche mit Radius.** Ein großer Radius frisst Innenabstand an den Ecken.
  Bei `--radius-l` braucht der Text mehr Padding als bei `--radius-s`, sonst berührt die
  erste Zeile optisch die Rundung.
- **Überschrift über Text.** Der Zeilenabstand der Überschrift (`1.08`) erzeugt oben und
  unten weniger Luft als der des Fließtextes (`1.6`). Ein mathematisch gleicher Abstand
  wirkt deshalb oben zu eng.

**Regel für Abweichungen:** Eine Abweichung von der Skala ist erlaubt, wenn sie optisch
begründet ist. Dann bekommt sie einen Kommentar mit dem Grund, sonst dreht die nächste
Sitzung sie auf den Skalenwert zurück.

```css
/* 7px statt 8px: das runde Icon weicht an den Rändern zurück und
   wirkt bei 8px zu weit vom Text entfernt. Bewusste Abweichung. */
gap: 7px;
```

### 6 Mit zu viel Weißraum anfangen, dann wegnehmen

Andersrum wird es nie luftig. Wer mit knappen Abständen beginnt und sie vorsichtig
vergrößert, landet immer bei „dicht, aber irgendwie unruhig". Wer großzügig beginnt und
zusammenzieht, findet die Untergrenze, an der die Gruppierung gerade noch trägt.

Das ist dieselbe Bewegung wie die Chanel-Regel aus `10-visuelle-richtung.md`: hinzufügen und
dann eins wegnehmen.

## Die drei Ebenen des Rhythmus

Spacing arbeitet auf drei Ebenen, und sie dürfen sich nicht mischen:

| Ebene | Token | Wer setzt es |
|---|---|---|
| **Zwischen Sektionen** | `--raum-sektion`, `--raum-sektion-eng` | die Sektionsklasse, nie die Komponente |
| **Zwischen Blöcken in einer Sektion** | `--raum-block`, `--raum-spalte` | der Container in der Sektion |
| **Innerhalb einer Komponente** | `--raum-1` bis `--raum-8` | die Komponente selbst |

Die ersten beiden Ebenen sind fließend (`clamp()`), die dritte ist fest. Grund: ein
Kartenabstand von 16 px ist auf dem Handy genauso richtig wie auf dem Desktop, ein
Sektionsabstand nicht.

**Das erklärt auch den Spezifitätshinweis aus `10-visuelle-richtung.md`:** Wenn `.sektion`
und `.cta` beide `padding-block` setzen, heben sie sich auf. Lösung ist nicht `!important`,
sondern die Trennung der Ebenen: `.cta` setzt nur inneres Spacing, `.sektion` nur äußeres.

## Vertikaler Fluss statt Einzelregeln

Für Inhaltsbereiche mit wechselnden Elementen (Blog, Leistungsdetail, Rechtstext) lohnt ein
Fluss-Helfer statt einer Regel je Kombination:

```css
/*
  Jedes Element bekommt Abstand nach oben, außer dem ersten.
  Der Eulen-Selektor ist hier besser als :not(:first-child), weil er
  auf das VERHÄLTNIS zweier Elemente zeigt, nicht auf eine Position.
*/
.fluss > * + * { margin-block-start: var(--fluss-raum, var(--raum-6)); }

/* Ausnahmen als Verhältnis, nicht als Einzelwert: eine Überschrift steht
   NAH an dem, was sie überschreibt, und WEIT von dem, was vorher kam. */
.fluss > * + :is(h2, h3) { margin-block-start: var(--raum-12); }
.fluss > :is(h2, h3) + * { margin-block-start: var(--raum-3); }
```

Der zweite Block ist der wichtige: er kodiert Regel 2. Eine Überschrift gehört zu dem, was
unter ihr steht, nicht zu dem, was über ihr steht. Das falsch zu haben ist der häufigste
Spacing-Fehler in langen Texten.

## Was ein fehlendes Token ist

Jeder hartcodierte Abstand im Komponentencode ist ein Befund. `scripts/pruefe-tokens.mjs`
findet sie. Drei Fälle sind erlaubt und werden dort nicht gemeldet:

1. **Optische Korrektur mit Kommentar** (siehe Regel 5).
2. **`0`** braucht kein Token.
3. **`1px`** für Haarlinien und Rahmen ist keine Abstandsentscheidung.

Alles andere: entweder fehlt ein Token, oder die Komponente irrt sich.

## Prüfung

- **Zoomprüfung.** Seite auf 50 % verkleinern und zusammenkneifen. Was noch als Gruppe
  erkennbar ist, ist richtig gruppiert. Was zu einem Brei verschwimmt, hat zu wenig
  Kontrast im Abstand.
- **375 px und 1440 px**, beide Breiten. Fließende Abstände sind genau dort falsch, wo die
  `clamp()`-Kurve zu flach oder zu steil ist, siehe `16-responsive-container.md`.
- **Ein Screenshot ohne Text.** Wenn die Struktur in einer Graustufen-Blockansicht nicht
  lesbar ist, trägt das Spacing die Hierarchie nicht.
- `node scripts/pruefe-tokens.mjs` findet hartcodierte Werte.

Zur Herkunft der Skala und der Haltepunkte: `../assets/vorlagen/tokens.css`.
Zu Container Queries und Breakpoints: `16-responsive-container.md`.
