# Motion als Markenhandschrift

`09-motion-gsap.md` ist die Technik: wie eine Timeline aufgebaut wird, wann ScrollTrigger
richtig ist, welche Fallen Zeit kosten. Dieses Kapitel ist die Haltung: **wie Bewegung bei
genau dieser Marke klingt.**

Der Unterschied ist derselbe wie zwischen Farbrampe und Farbrolle. Zwei Seiten können
dieselbe GSAP-Timeline benutzen und völlig verschieden wirken, weil Dauer, Kurve und
Amplitude verschieden sind. Diese drei Werte sind Markenentscheidungen, keine Voreinstellungen.

## Motion-Tokens, nicht zwei Werte

Die meisten Projekte haben `--dauer-schnell`, `--dauer-normal` und eine Kurve. Das ist zu
wenig, um eine Handschrift zu tragen, und es führt dazu, dass jede Komponente eigene Werte
erfindet.

### Dauer folgt Distanz und Fläche

```
--dauer-sofort:  0.12s   Zustandsfarbe, Fokusring, Haken in einer Checkbox
--dauer-schnell: 0.2s    Hover, kleine Verschiebungen unter 8 px
--dauer-normal:  0.4s    Akkordeon, Karte anheben, Bild zoomen
--dauer-lang:    0.6s    Off-Canvas-Panel, Dialog, große Flächen
--dauer-sequenz: 0.9s    orchestrierte Heldensequenz, gesamte Laufzeit
```

**Die Regel dahinter:** ein Element, das weit reist oder groß ist, braucht länger. Ein
Fokusring, der 0,4 s braucht, fühlt sich kaputt an. Ein Off-Canvas-Panel, das in 0,2 s
einfährt, wirkt hektisch.

### Drei Kurven mit Bedeutung, nicht eine für alles

```
--kurve-eintritt: cubic-bezier(0.22, 1, 0.36, 1)     stark dezeleriert
--kurve-austritt: cubic-bezier(0.4, 0, 1, 1)          akzeleriert
--kurve-wechsel:  cubic-bezier(0.4, 0, 0.2, 1)        symmetrisch
```

| Kurve | Wofür | Warum |
|---|---|---|
| **Eintritt** | etwas erscheint, fährt ein, klappt auf | beginnt schnell, kommt weich zur Ruhe: das Element „landet" |
| **Austritt** | etwas verschwindet, fährt aus, klappt zu | beginnt langsam, beschleunigt heraus: das Element „geht weg" und blockiert nicht |
| **Wechsel** | Position, Farbe, Größe eines bleibenden Elements | keine Richtung, also keine Betonung an einem Ende |

### Die Regel, die fast nie steht: Austritte sind kürzer

```css
/* Ein Menü, das genauso lang schließt wie es öffnet, fühlt sich träge an.
   Der Nutzer hat sich schon entschieden; das Warten ist reine Verzögerung. */
.panel            { transition: transform var(--dauer-lang) var(--kurve-eintritt); }
.panel[hidden]    { transition: transform var(--dauer-normal) var(--kurve-austritt); }
```

Faustwert: **Austritt etwa 60 bis 70 % der Eintrittsdauer.** Das ist einer der wenigen
Motion-Werte, bei dem fast jedes Projekt dasselbe braucht, und einer der häufigsten
ungesehenen Fehler.

## Die Handschrift ableiten

Drei Sätze pro Auftrag, genau wie die drei Designprinzipien aus `10-visuelle-richtung.md`.
Sie stehen in `marke-brief.md` Abschnitt 8 und in `marke.json` unter `motion.handschrift`.

| Profil | Dauer | Kurve | Amplitude | Overshoot | Passt zu |
|---|---|---|---|---|---|
| **präzise** | kurz (0,15 bis 0,3 s) | nah an linear, leicht dezeleriert | klein (8 bis 16 px) | nein | Messtechnik, Präzisionsmechanik, Labor, Kanzlei |
| **weich** | mittel (0,4 bis 0,6 s) | stark dezeleriert | mittel (16 bis 24 px) | minimal | Gesundheit, Beratung, Premium-Dienstleistung |
| **verspielt** | mittel | `back.out(1.4)`, Federn | groß (24 bis 40 px) | ja | Kindermarken, Gastronomie, DTC, junge Endkundenmarken |
| **zurückhaltend** | kurz bis mittel | dezeleriert, sehr flach | sehr klein (4 bis 8 px) | nein | Luxus, Manufaktur, Architektur, Editorial |

**Der Unterschied ist hörbar, wenn man es laut sagt:** „schnapp" (präzise), „gleit" (weich),
„hopp" (verspielt), „kaum" (zurückhaltend). Wer das nicht benennen kann, hat noch keine
Handschrift, sondern Voreinstellungen.

**Overshoot ist eine Markenentscheidung, keine Verfeinerung.** Ein Element, das über sein
Ziel hinausschießt und zurückfedert, wirkt freundlich und ein bisschen albern. Bei einem
Präzisionsmesstechnik-Hersteller ist das ein Positionierungsfehler, nicht ein Detail.
`marke.json` hat dafür `motion.overshoot_erlaubt` als eigenes Feld.

## Der eine Moment

`09-motion-gsap.md` sagt: ein einziger orchestrierter Moment wirkt stärker als Effekte
überall. Dieses Kapitel sagt, **wie man ihn auswählt.**

Der Moment sitzt dort, wo die Kernaussage steht. Das ist in etwa 80 % der Fälle der
Heldenbereich, aber nicht immer:

| Seitentyp | Der Moment sitzt bei | Nicht bei |
|---|---|---|
| Startseite | Heldensequenz beim Laden | den Leistungskarten |
| Landingpage mit einem Angebot | dem Angebotsblock oder der Zahl, die den Wert zeigt | dem Hero, wenn der nur Text ist |
| Referenzseite | der Vorher-Nachher-Enthüllung | der Projektliste |
| Recruiting-Funnel | dem Ergebnis des Selbsttests | der Stellenliste |
| Prozess- oder Erklärseite | der Abfolge selbst (Zeitleiste, Kartenstapel) | dem Heldenbereich |

**Und dann nirgends sonst.** Alles andere auf der Seite bekommt Zustandsübergänge (Hover,
Fokus, Auf- und Zuklappen) und höchstens eine dezente Einblendung je Sektionsgruppe.

Der Grund ist nicht Geschmack, sondern Aufmerksamkeit: Bewegung zieht den Blick. Zwei
konkurrierende Bewegungen auf einem Bildschirm heben sich gegenseitig auf, und der Besucher
sieht keine von beiden.

### Pflicht: mindestens ein individueller Custom-Abschnitt

Jedes Projekt braucht **einen** Abschnitt, der nicht aus einer Bibliothek austauschbarer
Sektionen stammt, sondern für genau dieses Unternehmen gebaut ist: die Tabelle oben zeigt,
wo er sitzt. Er trägt den einen orchestrierten Moment, die individuelle Bewegungssignatur
aus diesem Kapitel und, wo passend, einen aus der Marke abgeleiteten Farbverlauf statt eines
generischen Verlaufs als Deko (siehe „Aufbau einer Palette" in `10-visuelle-richtung.md`).
Kein Projekt liefert nur die Standardsektionen aus dem Baukasten ohne diesen einen Abschnitt.

## Scroll-driven Animations: kein JavaScript nötig

Seit 2024 in Chromium und Safari, seit 2025 breit verfügbar. Für Einblendungen beim Scrollen
braucht es damit **kein GSAP und kein IntersectionObserver mehr.** Das spart auf einer
typischen Unternehmensseite die halbe Motion-Last.

```css
/*
  animation-timeline: view() bindet die Animation an die Sichtbarkeit des
  Elements im Viewport. Kein Skript, kein Observer, kein Cleanup.

  animation-range sagt, WANN im Durchlauf: entry 20% bis entry 60% heißt
  "beginnt, wenn das Element 20% weit hereingekommen ist, fertig bei 60%".
*/
@keyframes auf-einblenden {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

@supports (animation-timeline: view()) {
  [data-anim='auf'] {
    animation: auf-einblenden linear both;
    animation-timeline: view();
    animation-range: entry 20% entry 60%;
  }
}

/*
  KEIN @supports-Fallback, der Elemente auf opacity: 0 setzt.

  Wer die Startwerte außerhalb des @supports-Blocks setzt, macht Inhalt in
  Browsern ohne Unterstützung dauerhaft unsichtbar. Deshalb steht der
  Anfangszustand IN den Keyframes, nicht als Regel am Element.
*/

@media (prefers-reduced-motion: reduce) {
  [data-anim='auf'] { animation: none; }
}
```

### Wann trotzdem GSAP

| Anforderung | Werkzeug |
|---|---|
| Einblenden beim Scrollen, gestaffelt | **CSS**, `animation-delay` je Kind oder `sibling-index()` |
| Fortschrittsbalken am Seitenrand | **CSS**, `animation-timeline: scroll()` |
| Parallaxe mit kleiner Amplitude | **CSS**, `animation-timeline: view()` |
| Mehrstufige Sequenz mit Überlappung | **GSAP** Timeline |
| Pinning, gebundenes Video, Kartenstapel | **GSAP** ScrollTrigger |
| SVG-Morphing | **GSAP** MorphSVG |
| Steuerung zur Laufzeit (pausieren, umkehren) | **GSAP** |
| Koordination über mehrere entfernte Elemente | **GSAP** |

**Die Entscheidung fällt vor dem Laden der Bibliothek.** Eine Seite, die GSAP nur für
Sektionseinblendungen lädt, zahlt etwa 25 kB gzip für etwas, das CSS kann.

## View Transitions für Seitenwechsel

Passt zu `14-projektstruktur-astro.md`. Astro bringt es mit:

```astro
---
import { ClientRouter } from 'astro:transitions';
---
<head>
  <ClientRouter />
</head>
```

Drei Regeln:

1. **Nur zwischen Seiten mit gleicher Struktur.** Ein Wechsel von der Startseite auf eine
   Rechtstextseite braucht keine geteilte Bewegung, weil nichts geteilt ist.
2. **`transition:name` nur an Elementen, die wirklich dasselbe Objekt sind** (ein Bild, das
   auf der Detailseite größer erscheint). Ein `transition:name` an der Kopfleiste ist
   üblicherweise `transition:persist`, nicht `name`.
3. **Bei `prefers-reduced-motion: reduce` schaltet Astro selbst auf eine Überblendung um.**
   Trotzdem prüfen: ein Cross-Fade ist Bewegung von Deckkraft und für manche Nutzer
   ebenfalls störend.

**Achtung bei Formularen:** ein Client-Router führt Skripte auf neuen Seiten nicht
automatisch erneut aus. Formular- und Consent-Logik braucht `astro:page-load` statt
`DOMContentLoaded`, sonst ist das Kontaktformular ab der zweiten Navigation toter Code.

## Gestufte reduzierte Bewegung

`prefers-reduced-motion: reduce` heißt nicht „keine Rückmeldung". Es heißt „keine
vestibulär auslösende Bewegung". Der Unterschied ist wichtig, weil der harte Schnitt die
Oberfläche kaputt macht: ein Akkordeon, das ohne jede Animation aufspringt, wirkt wie ein
Fehler.

| Eigenschaft | Bei `reduce` |
|---|---|
| `opacity` | **erlaubt**, kurz (0,15 s) |
| `background-color`, `border-color`, `color` | **erlaubt** |
| `box-shadow` | **erlaubt** |
| `transform: translate` | **entfällt** |
| `transform: scale` | **entfällt** |
| `transform: rotate` | **entfällt** |
| Parallaxe, Pinning, scrollgebundene Bewegung | **entfällt vollständig** |
| Autoplay-Karussell, Marquee | **entfällt**, Inhalt bleibt scrollbar erreichbar |

```css
@media (prefers-reduced-motion: reduce) {
  /*
    Kein pauschales * { animation: none !important; transition: none !important }.

    Das killt auch die Deckkraftübergänge und lässt jeden Zustandswechsel
    sprunghaft aussehen. Stattdessen: Bewegung entfernen, Rückmeldung behalten.
  */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
  /* Deckkraft und Farbe dürfen weiter übergehen, nur kurz. */
  .hebt, .btn, a, button, input, [data-zustand] {
    transition-property: opacity, background-color, border-color, color, box-shadow !important;
    transition-duration: 0.15s !important;
  }
  .hebt:hover { transform: none; }
}
```

**Und die harte Grenze aus `SKILL.md` bleibt:** bei `reduce` entfällt jede nicht ausgelöste
Bewegung, und die Seite bleibt vollständig. Nichts bleibt unsichtbar, nichts bleibt
verschoben. Das ist der Grund für die Aufräumfalle in `09-motion-gsap.md`.

## Animierte Icons

Brücke zu `17-icons-eigenes-system.md`. Nur bei echtem Zustandswechsel.

### Der eine Fall, der immer lohnt: Menü zu Schließen

```css
/*
  Zwei Linien, die sich zum Kreuz drehen. Das Icon zeigt den ÜBERGANG und
  damit, dass derselbe Knopf zurückführt. Ein Icon, das per JavaScript
  ausgetauscht wird, zeigt das nicht.

  transform-origin: center ist Pflicht: ohne ihn dreht die Linie um die linke
  obere Ecke des SVG und wandert dabei aus dem Bild.
*/
.menue-icon line {
  transition: transform var(--dauer-schnell) var(--kurve-wechsel);
  transform-origin: center;
}
[aria-expanded='true'] .menue-icon .oben  { transform: translateY(6px) rotate(45deg); }
[aria-expanded='true'] .menue-icon .mitte { opacity: 0; }
[aria-expanded='true'] .menue-icon .unten { transform: translateY(-6px) rotate(-45deg); }
```

### Strich-Zeichnen

```css
/*
  pathLength normiert die Pfadlänge auf 1, unabhängig von der echten Geometrie.
  Ohne das muss man jede Pfadlänge einzeln per JavaScript messen.
*/
.haken path {
  pathLength: 1;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: zeichnen var(--dauer-normal) var(--kurve-eintritt) forwards;
}
@keyframes zeichnen { to { stroke-dashoffset: 0; } }
```

Einsatz: der Haken in einer Erfolgsmeldung nach dem Formularversand. Das ist eine **auf eine
Handlung antwortende** Bewegung und damit fast immer willkommen.

### Was nicht

- Icons, die beim Hovern wackeln, hüpfen oder rotieren, ohne dass sich ein Zustand ändert
- Ein Pfeil, der beim Hovern nach rechts rutscht, **an jedem Link der Seite** (einmal am
  Primär-CTA: ja)
- Dauerhaft laufende Icon-Animationen ohne Ladebezug
- Morphing zwischen Icons, die nicht dasselbe Objekt darstellen

## Prüfung

- **Einmal mit gedrosselter CPU** (DevTools, 4x slowdown). Eine Animation, die dort ruckelt,
  ruckelt auf dem Handy des Kunden auch.
- **`prefers-reduced-motion` in DevTools umschalten** und die ganze Seite durchscrollen. Ist
  alles sichtbar? Ist alles an der richtigen Stelle?
- **JavaScript abschalten** und die Seite durchgehen. Vollständig lesbar und bedienbar?
- **Alles zweimal ansehen.** Bewegung, die beim zweiten Mal störend wird, ist beim zehnten
  Besuch unerträglich. Der Kunde sieht seine Seite hundertmal.
- **Die Chanel-Regel aus `10-visuelle-richtung.md` auf Bewegung anwenden:** eine Animation
  streichen, bevor die Seite live geht.

## Verwandte Kapitel

- Technik, GSAP-API, ScrollTrigger, Fallen: `09-motion-gsap.md`
- Ableitung der visuellen Handschrift: `10-visuelle-richtung.md`
- Icons: `17-icons-eigenes-system.md`
- Tokens: `../assets/vorlagen/tokens.css`
