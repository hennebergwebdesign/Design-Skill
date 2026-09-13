# Responsive Design und Container Queries

Die fünf Breakpoints aus `03-technik-performance.md` sind die Prüfliste. Sie sind nicht das
Bauprinzip. Wer mit Media Queries anfängt, baut für Fenstergrößen; wer für Komponenten baut,
braucht sie kaum.

## Der Eskalationspfad

Jede Responsive-Entscheidung läuft diese Leiter von oben nach unten. Erst wenn eine Stufe
nicht reicht, geht es zur nächsten.

```
1  intrinsisches CSS      auto-fit, flex-wrap, clamp(), minmax(), min(), max()
                          → braucht keine Breite zu kennen

2  Container Queries      @container, cqi-Einheiten
                          → die Komponente fragt ihren Container

3  Media Queries          @media (min-width: …)
                          → nur für die Seitenstruktur, zuletzt
```

**Warum die Reihenfolge:** Eine Teaser-Karte weiß nicht, ob sie in einer dreispaltigen
Sektion, in einer Sidebar oder allein in einem Dialog steht. Ein `@media (min-width: 640px)`
in dieser Karte behauptet, sie wüsste es. Bei 1440 px Fensterbreite in einer 320 px breiten
Sidebar ist die Behauptung falsch, und dann steht das zweispaltige Innenlayout in einer
Spalte, die es nicht tragen kann.

Media Queries sind richtig für Dinge, die wirklich vom Fenster abhängen: die
Hauptnavigation, der Mobilbalken, die Seitenränder, die Typoskala.

## Stufe 1: intrinsisches CSS

### Ein Raster ohne einen einzigen Haltepunkt

```css
/*
  auto-fit plus minmax bricht selbst um. 18rem ist die Mindestbreite, unter der
  eine Karte ihren Inhalt nicht mehr trägt; darüber füllt sie auf.

  min() ist die Notbremse für schmale Fenster: ohne sie erzwingt 18rem bei
  320px Viewport einen horizontalen Überlauf.
*/
.karten {
  display: grid;
  gap: var(--raum-spalte);
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
}
```

Der `.raster`-Helfer in `global-basis.css` löst denselben Fall mit Haltepunkten, weil er die
**Spaltenzahl** festlegen können muss (drei Leistungen sollen nicht als 2+1 brechen). Beide
Varianten sind richtig, für unterschiedliche Fälle:

| Fall | Werkzeug |
|---|---|
| Unbekannt viele gleichartige Elemente (Blogliste, Logos) | `auto-fit` |
| Feste, gestaltete Anzahl (drei Leistungen, vier Prozessschritte) | `.raster` mit `--spalten` |

### Die drei Mindestbreiten-Fallen

1. **`min-width: 0` bei Grid- und Flex-Kindern**, die überlaufenden Inhalt enthalten
   (Marquee, lange Tabelle, `<pre>`). Das voreingestellte `min-width: auto` lässt die
   `max-content`-Breite durch und erzeugt horizontalen Überlauf auf der ganzen Seite. Steht
   schon in `02-design-ux.md`, ist aber die häufigste Einzelursache.
2. **Lange Wörter ohne Umbruchmöglichkeit** (E-Mail-Adressen, URLs, deutsche Komposita)
   sprengen schmale Spalten. `overflow-wrap: break-word` ist in `global-basis.css` gesetzt,
   `hyphens: auto` bleibt verboten.
3. **`width` statt `max-width`** an Bildern und Kästen. `max-width: 100%` gehört auf alles,
   was ein `aspect-ratio` hat.

### Fließende Werte mit Deckel

```css
/* Die Kurve muss zwei Deckel haben, nicht einen.
   Ohne obere Grenze wächst der Wert auf 2560px absurd,
   ohne untere unterschreitet er auf 320px die Lesbarkeit. */
--rand-seite: clamp(1.125rem, 0.6rem + 2.4vw, 3rem);
```

**Die Falle, die 1366 px betrifft:** eine einzige `clamp()`-Kurve von 320 bis 1920 wächst
zwischen 768 und 1200 px zu schnell. Deshalb hat `tokens.css` eine zweistufige Typoskala.
Dasselbe Problem gilt für Abstände, fällt dort aber weniger auf.

## Stufe 2: Container Queries

Seit 2023 in allen relevanten Browsern, seit 2024 Baseline. Es gibt keinen Grund mehr,
Komponenten nach Fensterbreite zu bauen.

```css
/*
  Der Container muss sich ANMELDEN. Ohne container-type fragt @container
  ins Leere und die Regel greift nie — der häufigste Fehler beim Einstieg.

  inline-size = nur die Breite wird beobachtet. Das ist fast immer richtig:
  container-type: size verlangt eine feste Höhe und bricht Inhalt, der wächst.
*/
.karten { container-type: inline-size; container-name: kartenbahn; }

/* Die Karte fragt ihre BAHN, nicht das Fenster. */
@container kartenbahn (min-width: 30rem) {
  .karte { display: grid; grid-template-columns: 8rem 1fr; gap: var(--raum-4); }
}
```

### Wann Container Queries, wann nicht

| Element | Werkzeug | Grund |
|---|---|---|
| Teaser-, Leistungs-, Referenzkarte | Container Query | steht in verschieden breiten Bahnen |
| Formularfeldgruppe | Container Query | steht mal einspaltig, mal in einer Sidebar |
| Zitat mit Bild | Container Query | Bild neben Text nur ab ausreichender Bahnbreite |
| Hauptnavigation | Media Query | hängt echt am Fenster |
| Mobilbalken mit Primär-CTA | Media Query | Gerätefrage, nicht Containerfrage |
| Seitenrand, Inhaltsbreite | Media Query oder `clamp()` | Seitenstruktur |
| Typoskala | Media Query | siehe die Zweistufigkeit in `tokens.css` |

### `cqi` statt `vw` in Komponenten

```css
/* 1cqi = 1 % der Inline-Größe des Containers.
   Eine Überschrift in einer Karte skaliert damit mit der KARTE,
   nicht mit dem Fenster. In einer schmalen Sidebar bleibt sie klein. */
.karte__titel { font-size: clamp(1.125rem, 0.9rem + 2cqi, 1.5rem); }
```

**Vorsicht:** `cqi` ohne angemeldeten Container fällt auf den kleinen Viewport zurück und
ergibt unerwartet kleine Werte. Immer prüfen, dass `container-type` gesetzt ist.

### Die drei Container-Query-Fallen

1. **Ein Element kann seinen eigenen Container nicht abfragen.** `container-type` und
   `@container`-Regel müssen an verschiedenen Elementen hängen. Wer beides an `.karte`
   setzt, wundert sich, dass nichts passiert.
2. **`container-type: inline-size` erzeugt einen neuen Containing Block und einen
   Layout-Containment-Kontext.** Ein `position: absolute`-Kind orientiert sich danach am
   Container, nicht mehr am Seitenkörper. Bei Tooltips und Dropdowns ist das die Ursache für
   plötzlich falsch positionierte Overlays. Gleiche Ursache wie beim Off-Canvas-Panel in
   einem transformierten Element (`02-design-ux.md`).
3. **`container-name` vergeben, wenn Container verschachtelt sind.** Ohne Namen greift die
   Regel auf den nächsten passenden Vorfahren, und bei einer Karte in einer Karte ist das
   der falsche.

## Stufe 3: Media Queries, sparsam

Die Haltepunkte des Projekts stehen als Kommentar in `tokens.css`, weil Custom Properties in
Media Queries nicht gelten. **Eine Sektion erfindet keine eigenen Haltepunkte.** Braucht sie
einen, ist das ein Hinweis auf Stufe 1 oder 2.

```
480 px   kleines Handy
640 px   großes Handy, ab hier zweispaltige Karten
861 px   Umschaltpunkt Menü und Mobilbalken
1100 px  kleiner Laptop, volle Zweispaltigkeit
1200 px  Desktop, große Typostufe
```

## Viewport-Einheiten: svh, lvh, dvh

| Einheit | Bedeutung | Einsatz |
|---|---|---|
| `svh` | kleinster Viewport, Browserleisten **eingeblendet** | Heldenbereich, alles mit fester Höhe |
| `lvh` | größter Viewport, Leisten ausgeblendet | fast nie |
| `dvh` | dynamisch, ändert sich beim Scrollen | **nur ohne Animation** |
| `vh` | Altlast, entspricht `lvh` auf Mobil | nicht mehr verwenden |

**Die Falle bei `dvh`:** Auf iOS Safari und Chrome Android wächst und schrumpft der Wert
beim Scrollen, wenn die Adressleiste ein- und ausfährt. Jedes Element mit `height: 100dvh`
springt dabei. Für einen Heldenbereich ist das sichtbar und störend. `dvh` ist richtig für
ein Off-Canvas-Panel, das den Bildschirm füllen soll, und falsch für alles, was während des
Scrollens sichtbar ist.

**Und die Regel aus `02-design-ux.md` gilt weiter:** `min-height: 100svh` am Heldenbereich
erzwingt auf 13-Zoll-Notebooks (etwa 720 px Fensterhöhe) entweder eine Lücke oder Beschnitt.
Besser ab mittleren Desktopbreiten `min-height: auto` plus vh-basiertes
`padding-block-start`.

```css
.held { min-height: 100svh; }
@media (min-width: 861px) and (min-height: 800px) {
  .held { min-height: auto; padding-block-start: 12vh; }
}
```

Die zweite Bedingung ist der Punkt: **auch die Fensterhöhe abfragen.** Ein
Breitbild-Notebook mit 1440 × 720 braucht andere Behandlung als ein 1440 × 1080-Monitor.

## Acht Szenarien, die immer weh tun

### 1 Hauptnavigation zu Off-Canvas

Media Query bei 861 px. Drei Details aus `02-design-ux.md` gelten: die Leiste bleibt unter
dem Breakpoint immer sichtbar, das Panel liegt **außerhalb** jedes transformierten Elements,
und Sprungziele brauchen `scroll-padding-top` in Höhe der gesamten sticky Gruppe
(`--hoehe-kopf-gruppe`).

### 2 Tabelle auf 375 px

Drei Wege, in dieser Reihenfolge:

```css
/* a) Scrollbehälter — immer richtig, immer erlaubt.
      tabindex macht ihn tastaturscrollbar, role und aria-label machen
      ihn für Screenreader als Region auffindbar. Ohne das ist eine
      scrollende Tabelle für Tastaturnutzer nicht erreichbar. */
.tabellenrahmen { overflow-x: auto; }
```
```html
<div class="tabellenrahmen" tabindex="0" role="region" aria-label="Preisübersicht">
```

b) **Spalten priorisieren:** unwichtige Spalten unter 640 px ausblenden, aber nur, wenn die
Information woanders erreichbar ist. Eine versteckte Spalte ist Informationsverlust.

c) **Karten statt Zeilen** unter 640 px, mit `<dt>`/`<dd>` je Feld. Aufwendig und nur
lohnend bei wenigen Zeilen mit vielen Feldern. Nie mit CSS-generierten Labels
(`content: attr(data-label)`) arbeiten: das ist Inhalt im Stylesheet und in
Screenreadern unzuverlässig.

### 3 Zweispaltiges Formular

Container Query, nicht Media Query. Ein Formular steht mal in der Seitenmitte, mal in einem
Dialog von 420 px.

```css
.feldgruppe { container-type: inline-size; }
@container (min-width: 34rem) {
  .feldpaar { display: grid; grid-template-columns: 1fr 1fr; gap: var(--raum-4); }
}
```

**Nie** Vorname und Nachname nebeneinander erzwingen, wenn die Bahn es nicht trägt: das
10-Sekunden-Formular aus `06-conversion-architektur.md` hat 3 bis 5 Felder, die dürfen
untereinander stehen.

### 4 Logoleiste mit unterschiedlichen Seitenverhältnissen

Der Fehler aus `06-conversion-architektur.md`: auf gleiche Höhe gesetzt verschwindet ein
Hochformat-Logo als Streifen neben einer Wortmarke. Über die **Fläche** normalisieren:
Zielfläche festlegen, Faktor aus dem Seitenverhältnis rechnen, deckeln.

### 5 Sticky-Koordination

Topleiste plus Kopfleiste plus Sprungziel plus eventuell eine sticky Bühne. Jede Stelle
rechnet mit `--hoehe-kopf-gruppe`, nie mit `--hoehe-kopf` allein. Das ist in `tokens.css`
vorbereitet und der Grund, warum es dort zwei Tokens gibt.

### 6 Dashboard oder mehrspaltiger Inhaltsbereich

Subgrid, damit Karten über Spalten hinweg auf einer Linie sitzen:

```css
.bahn { display: grid; grid-template-rows: subgrid; grid-row: span 3; }
```

Ohne Subgrid richtet man Karten mit fester Höhe aus, und dann bricht die erste zu lange
Überschrift das Bild.

### 7 Bildergalerie mit unterschiedlichen Formaten

`aspect-ratio` plus `object-fit: cover` vereinheitlicht. **Ausnahme aus `02-design-ux.md`:**
Motive mit eingebranntem Text nie beschneiden, sondern `object-fit: contain` einpassen.

### 8 Heldenbereich mit Bild neben Text

Unter dem Umschaltpunkt steht das Bild **unter** dem Text, nie darüber: über dem Text
verdrängt es Headline und CTA aus dem ersten Bildschirm, und damit ist Above the Fold
verloren. In der DOM-Reihenfolge steht der Text zuerst; das Desktop-Layout dreht bei Bedarf
per `grid-template-areas` um, nicht per `order` (`order` verschiebt die Tastaturreihenfolge
nicht mit und erzeugt einen Fokussprung).

## Prüfen, nicht behaupten

```bash
node scripts/pruefe-breakpoints.mjs http://localhost:4321
```

Das Skript rendert acht Größen (die fünf Breakpoints plus 1366 × 768, 1440 × 720 und
320 px), legt Screenshots ab und meldet drei Dinge automatisch:

- **horizontaler Überlauf** (`scrollWidth > innerWidth`) — findet die Fälle, die man auf dem
  eigenen Monitor nie sieht
- **Elemente breiter als der Viewport**, mit Selektor
- **Touchziele unter 44 × 44 px**, siehe `04-barrierefreiheit-bfsg.md`

Zusätzlich von Hand: Tastaturdurchlauf auf 375 px mit offenem Menü, und einmal bei 200 %
Browserzoom (WCAG 1.4.4) plus einmal bei 400 % (WCAG 1.4.10 Reflow, entspricht etwa 320 px
Breite).

## Verwandte Kapitel

- Abstände und Rhythmus: `15-spacing-rhythmus.md`
- Breakpoints, Bilder, Ladezeit: `03-technik-performance.md`
- Touchziele, Zoom, Reflow: `04-barrierefreiheit-bfsg.md`
- Tokens und Haltepunktliste: `../assets/vorlagen/tokens.css`
