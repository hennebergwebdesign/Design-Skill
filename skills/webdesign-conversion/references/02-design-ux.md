# Bereich 2: Design & User Experience

Die Seite muss nicht schön aussehen, sie muss funktionieren, und dabei einen hochwertigen,
professionellen Eindruck vermitteln. Schafft das Design das nicht, ist der erste Eindruck
negativ und die Absprungrate hoch. Der Satz dazu: sie muss dem Fisch schmecken, nicht dem
Angler.

## Schritt 2.1: Above the Fold entscheidet

Above the Fold ist alles, was ohne Scrollen sichtbar ist. Hier fällt die Entscheidung in
3–5 Sekunden.

**Der Test:** Startseite öffnen, nicht scrollen. Diese vier Fragen müssen beantwortet sein:

1. Was macht das Unternehmen?
2. Wird mein Problem direkt adressiert?
3. Welchen Nutzen habe ich?
4. Wohin führt der CTA?

**Die Formel:**

| Element | Inhalt |
|---|---|
| **Headline** | Zielgruppe + Problem + Lösung |
| **Subheadline** | Wie + konkretes Ergebnis |
| **Visual** | Bild oder Video, das das Ergebnis zeigt: nicht das Gebäude, nicht das Team beim Händeschütteln |
| **CTA** | eine klare Handlungsaufforderung |
| **Trust** | Kundenlogos, Bewertungen, Zahlen |

Ein Stock-Foto eines lachenden Teams am Konferenztisch zeigt kein Ergebnis. Ein Vorher-
Nachher, ein Screenshot des Resultats, das fertige Werk, die laufende Anlage: das zeigt eins.

### Höhe des Heldenbereichs

**Projektstandard: der Heldenbereich liegt auf jeder Breite und jeder Fensterhöhe bei 100 %
der sichtbaren Bildschirmhöhe.** `min-height: 100svh` ist die Basis (kleinster Viewport,
Browserleisten eingeblendet, kein Sprung während des Scrollens). Details zu `svh`/`dvh` und
den acht Standard-Breiten in `16-responsive-container.md`.

Das reißt auf niedrigen Fenstern (13"/14"-Notebooks, ~720 px Fensterhöhe) leicht in eine
Lücke oder in Beschnitt, wenn der Inhalt selbst starr bleibt. Deshalb passt sich der
**Inhalt** an, nicht der Container:

- Headline-, Abstands- und Bildgrößen im Heldenbereich an die Fensterhöhe koppeln
  (`clamp()` mit einer `vh`-Komponente, oder eine `@media (max-height: 750px)`-Anpassung der
  Innenabstände), statt eine einzige feste Größe zu erzwingen.
- Above the Fold bleibt die Priorität: Passt bei geringer Fensterhöhe nicht mehr alles auf
  den ersten Bildschirm, weicht die niedrigste Priorität (z. B. die Trust-Leiste) knapp unter
  die Falz, nie der Heldenbereich selbst wird verkleinert oder auf `min-height: auto`
  zurückgestuft.
- Ein Stück der nächsten Sektion als Scroll-Anreiz kommt über einen kleinen negativen
  Rand-Trick oder eine sichtbare Kante am unteren Ende des Heldenbereichs, nicht darüber,
  dass der Heldenbereich selbst kürzer als der Viewport ist.

## Schritt 2.2: F-Pattern und Navigation

Besucher lesen nicht, sie scannen im F-Muster: erste Zeile links nach rechts, zweite Zeile
links nach rechts, danach nur noch links hinunter.

**So geht es richtig:**

- Logo links oben
- Headline links, direkt unter dem Logo
- Subheadline darunter
- wichtigster CTA direkt unter der Subheadline

**Fehler, die ständig auftauchen:**

- wichtigster CTA rechts oben versteckt
- USP in der Seitenmitte
- Zielgruppe erst nach drei Absätzen erwähnt
- wichtige Informationen rechtsbündig

**Sticky Navigation** mit direkten Links zu Leistungen, Referenzen/Cases, Prozess und
Kontakt/CTA.

### Sticky-Kopf, drei Details, die sonst weh tun

1. Kopfleiste beim Runterscrollen ausblenden, beim Hochscrollen sofort wieder einblenden
   (`transform: translateY(-100%)`, nicht `display`). Nahe am Seitenanfang und bei offenem
   Mobilmenü bleibt sie stehen.
2. **Unter dem Mobil-Breakpoint bleibt die Leiste immer sichtbar.** Der Menüknopf hängt
   darin; ohne ständigen Zugriff ließe sich das Menü mitten im Scrollen nicht öffnen.
3. **Ein Off-Canvas-Panel gehört nicht in ein Element mit aktivem `transform`.** Ein
   transformiertes Element wird zum Containing Block für `position: fixed`-Nachfahren; das
   Panel springt dann während der Ein-/Ausfahrt an eine falsche Position. Panel als
   Geschwister der Kopfgruppe rendern.
4. Sprungziele brauchen `scroll-padding-top` in Höhe der gesamten sticky Gruppe, sonst
   verschwindet die Zielüberschrift darunter.

## Schritt 2.3: Die 3-Klick-Regel

Jede wichtige Information ist in maximal drei Klicks erreichbar. Jeder zusätzliche Klick
kostet 20–30 % der Besucher.

**Der Test: wie viele Klicks braucht es, um …**

- eine Anfrage zu stellen?
- Referenzen zu sehen?
- den Prozess zu verstehen?
- Preise zu finden (falls gezeigt)?

Mehr als drei → Problem.

## Layout-Grundlagen

### Raster und Breiten

- Ein Container: `width: min(100% - 2 * var(--rand-seite), var(--breite-inhalt))`,
  `margin-inline: auto`. Kein `max-width` in jeder Sektion einzeln.
- Textspalten auf `--breite-text: 64ch` begrenzen. Zeilenlängen über 80 Zeichen sind
  schwerer lesbar; Serifenschrift verträgt etwas mehr, braucht dann aber mehr Zeilenhöhe.
- Ein Rasterhelfer statt Haltepunkte in jeder Sektion: eine Spalte mobil, zwei ab 640 px,
  die Zielspaltenzahl ab 1100 px über eine Custom Property.
- Grid-Elemente, die überlaufenden Inhalt enthalten (Marquee, lange Tabellen), brauchen
  `min-width: 0`: das voreingestellte `min-width: auto` lässt sonst die `max-content`-Breite
  durch.

### Abstände

Ein flüssiger Rhythmus (`clamp`) statt fester Stufen mit Umschaltpunkt. Dann springt
zwischen Handy und Desktop nichts:

```css
--raum-sektion:     clamp(3rem, 1.4rem + 6.4vw, 6rem);
--raum-sektion-eng: clamp(2.25rem, 1.25rem + 4vw, 4rem);
```

### Deutscher Textumbruch: keine Silbentrennung

`hyphens: auto` trennt lange deutsche Komposita an fast jeder Spaltenkante mitten im Wort
(„Ethy-len", „Verschmut-zung"). Das gehört nicht auf eine Verkaufsseite.

```css
p, li, dd, dt, figcaption, th, td, label {
  overflow-wrap: break-word;   /* Notbremse, nur bei zu breiten Einzelwörtern, ohne Trennstrich */
  text-wrap: pretty;           /* verhindert Schusterjungen, verteilt Zeilenenden */
}
h1, h2, h3 { text-wrap: balance; }
```

Wird eine Spalte so schmal, dass es ohne Trennung nicht geht, ist die Spalte falsch, nicht
der Umbruch.

### Hover und Zustände

**Jede Kachel bekommt einen Hover-Effekt, das ist keine Kür.** Leistungs-, Team-, Referenz-
und Prozesskacheln müssen auf `:hover` und `:focus-visible` sichtbar reagieren, sonst wirkt
die Seite statisch und unfertig. Zwei globale Klassen statt einer Regel je Sektion: eine hebt
Karten um 4 px an und vertieft den Schatten, eine zoomt das Bild in einem
`overflow: hidden`-Kasten auf 1,04.

Drei Regeln dazu, jede mit Grund:

- Beide hängen an `@media (hover: hover)`. Auf Touch bliebe `:hover` am ersten Tipp hängen
  und die Karte stünde angehoben, bis woanders getippt wird.
- Bewegt werden nur `transform` und `box-shadow`: nichts, was Layout neu rechnet. Rahmen
  liegen schon im Ruhezustand durchsichtig an, sonst ruckt der Text im Moment des Zeigens.
- Bei `prefers-reduced-motion: reduce` entfällt das Anheben, der Schatten bleibt. Es gibt
  weiter eine Rückmeldung, nur ohne Bewegung.

### Bilder

- Bilder unter der Falz mit `loading="lazy"`: außer auf kurzen Landingpages, wo alles sofort
  geladen werden soll; dann `loading="eager"` plus `fetchpriority="low"` unterhalb des
  Heldenbereichs und `fetchpriority="high"` plus `<link rel="preload">` für das Heldenbild.
- `width` und `height` immer setzen, sonst springt das Layout (CLS).
- Motive mit eingebranntem Text nie beschneiden, sondern `object-fit: contain` einpassen.
- Eine Einblendanimation gehört an den beschnittenen **Rahmen**, nie an das `<img>` darin.
  Steht die Bewegung am Bild und der Rahmen still, fährt das Bild sichtbar im Rahmen herum.

## Häufige Design-Tells, die es zu vermeiden gilt

Generische, „KI-gemachte" Seiten clustern um wenige Muster. Jedes davon ist für manche
Briefings legitim. Als Voreinstellung statt als Entscheidung sind sie ein Problem:

- cremefarbener Hintergrund plus hochkontrastige Serifen-Display plus Terrakotta-Akzent
- fast schwarzer Hintergrund mit einem grellen Neon-Akzent
- alles in identische, gleich abgerundete Karten mit demselben weichen grauen Schatten
- gesperrte VERSALIEN-Labels über jeder Überschrift
- Meta-Angaben mit Mittelpunkten verkettet („A · B · C")
- ein „→" hinter jedem Link- und Buttontext
- ein einzelnes hervorgehobenes Wort in jeder Headline
- nummerierte Marker 01 / 02 / 03 für Inhalte, die keine Reihenfolge haben

Strukturelemente wie Rahmen, Linien, Nummern und Labels kodieren Information. Nummerierte
Marker sind richtig, wenn der Inhalt wirklich eine Abfolge ist (Prozess, Zeitleiste), sonst
sind sie Dekoration.

Mehr zur visuellen Richtung: `10-visuelle-richtung.md`.
