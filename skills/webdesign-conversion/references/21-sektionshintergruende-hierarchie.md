# Sektionshintergründe und visuelle Hierarchie

Eine Seite, bei der jede Sektion auf demselben Weiß ohne jede Trennung steht, wirkt wie eine
Word-Datei mit Überschriften. Zwei Werkzeuge lösen das, und keins davon ist optional:
Bildhintergründe an den richtigen Stellen, und eine erkennbare Trennung oder Hierarchie
zwischen aufeinanderfolgenden Abschnitten.

## Pflicht: Bildhintergründe, aber gezielt

Mindestens der Heldenbereich und der eine individuelle Custom-Abschnitt aus
`18-motion-handschrift.md` bekommen einen Bildhintergrund oder einen aus der Marke
abgeleiteten Farbverlauf, kein reines Weiß oder Grau. Weitere Kandidaten: der
Beweis-/Referenzabschnitt (Vorher-Nachher, laufende Anlage), ein Angebots- oder
Abschlussabschnitt kurz vor dem CTA.

**Nicht jede Sektion.** Ein Bildhintergrund in jeder zweiten Karte ist dieselbe Schablone wie
das SaaS-Karten-Set aus `10-visuelle-richtung.md`, nur mit Foto statt Farbe. Sparsamkeit mit
Mut gilt auch für Bildhintergründe: sie markieren, wo die Aussage der Seite sitzt, nicht wo
gerade Platz ist.

**Regeln, die ein Bildhintergrund erfüllen muss:**

- **Ruhig, nicht überladen.** Ein Motiv mit vielen Details unter Text verliert die Lesbarkeit
  und übertönt die Headline. Eine flache Fläche, ein leeres Werkstück, ein Himmel, eine
  unscharfe Tiefenebene funktionieren, ein dichtes Gruppenfoto nicht.
- **Kontrast über Overlay, nicht über Zufall.** Ein linearer oder radialer Verlauf
  (`background-image: linear-gradient(...), url(...)`) zwischen Bild und Text sichert die
  4,5:1-Kontrastregel aus `04-barrierefreiheit-bfsg.md`, unabhängig davon, welcher Bildausschnitt
  gerade hinter der Headline liegt. Ohne Overlay ist der Kontrast Glückssache und bricht bei
  jedem neuen Bild neu.
- **Gewicht wie ein Heldenbild behandeln:** `fetchpriority`, Formate, maximale Dateigröße aus
  `03-technik-performance.md` gelten für jeden Sektionshintergrund, nicht nur für das erste
  Bild der Seite. Ein Bildhintergrund unter der Falz bekommt `loading="lazy"` über die
  `background-image`-Alternative (ein `<img>` im Hintergrund mit `object-fit: cover` statt
  reinem CSS-Hintergrund), sonst lädt er ungebremst mit.
- **Text bleibt in `<h1>`–`<p>` im Vordergrund**, nie als Teil der Bilddatei. Eine Headline im
  Bild eingebrannt ist weder responsiv noch für Screenreader lesbar.

## Trennung zwischen Sektionen

Zwei Fälle, unterschiedliche Lösung:

### Fall 1: Sektionen mit unterschiedlicher Aussage

Zwischen Problem und Lösung, zwischen Leistungen und Beweis: ein Wechsel der Flächenfarbe
signalisiert „neuer Gedanke". Aus den 2–3 Flächenfarben in `10-visuelle-richtung.md`
(Weiß, eine getönte helle Fläche, eine dunkle Sektion) wird eine feste Abfolge, kein
Zufallsmuster. Eine dunkle Sektion nie zweimal direkt hintereinander, sonst verschwimmt die
Orientierung „wo bin ich gerade".

```
Held (Bild/Verlauf) → Trust (hell) → Problem (weiß) → Lösung (getönt) →
Leistungen (weiß) → Beweis (dunkel oder Bild) → Angebot (getönt) → FAQ (weiß) → CTA (Bild/Verlauf)
```

### Fall 2: Zusammenhängende Sektionen auf derselben Fläche

Manche Abschnitte gehören inhaltlich zusammen (z. B. Leistungsübersicht und die
Detailkarten direkt darunter) und ein Farbwechsel würde sie fälschlich trennen. Hier trägt
die **Hierarchie**, nicht die Fläche:

- **Typografische Stufe:** die übergeordnete Sektion bekommt die größere Headline-Stufe
  (`h2`), die zugehörige Unterebene eine kleinere (`h3`), nie gleich große Überschriften auf
  einer Ebene, die verschieden wichtig sind.
- **Abstand als Signal:** der Rhythmus aus `15-spacing-rhythmus.md` (`--raum-sektion` zwischen
  fremden Gedanken, `--raum-sektion-eng` innerhalb eines zusammengehörigen Blocks) macht die
  Zugehörigkeit sichtbar, ohne dass eine Linie gezogen werden muss.
- **Eine dünne Trennlinie oder ein leichter Schatten** (`border-block-start` in
  `--farbe-rahmen`, oder ein Schatten von 1–2 px) ist erlaubt, wenn weder Farbwechsel noch
  Abstand allein reichen. Sie bleibt ein Detail, kein Rahmen um jede Sektion.
- **Nie beides gleichzeitig ignorieren:** zwei inhaltlich verschiedene Sektionen auf
  gleicher Fläche, gleichem Abstand und gleicher Überschriftengröße sind für den Besucher
  nicht unterscheidbar, das ist der Befund „Seite ohne Struktur", nicht Minimalismus.

## Prüfen

Beim Screenshot-Rundgang (`10-visuelle-richtung.md`, „Selbstkritik beim Bauen") diese Frage
stellen: Sieht man beim schnellen Scrollen, wo ein Gedanke endet und der nächste beginnt,
ohne die Überschriften zu lesen? Wenn nein, fehlt entweder ein Flächenwechsel oder eine
klare Hierarchiestufe.

## Verwandte Kapitel

- Palette und Flächenfarben: `10-visuelle-richtung.md`
- Abstände und Rhythmus: `15-spacing-rhythmus.md`
- Kontrast bei Text auf Bild: `04-barrierefreiheit-bfsg.md`
- Bildgewicht und Ladezeit: `03-technik-performance.md`
- Der eine Custom-Abschnitt mit individuellem Verlauf: `18-motion-handschrift.md`
