# Motion und Animation (GSAP)

Bewegung hat eine Aufgabe: zeigen, was sich geändert hat, und Aufmerksamkeit dorthin lenken,
wo sie hingehört. Alles andere ist Lärm.

## Grundhaltung

- **Bewegung, die auf eine Handlung antwortet** (öffnen, ausklappen, bestätigen), ist fast
  immer willkommen.
- **Nicht ausgelöste Bewegung** ist sparsam und gezielt einzusetzen. Ein einziger
  orchestrierter Moment, etwa eine Ladesequenz oder eine Enthüllung, wirkt stärker als
  Effekte überall.
- Eine Fade-and-slide-up-Einblendung an jeder Sektion plus Hover-Transition an jeder Karte
  ist der generische Standard und liest sich als maschinell erzeugt.
- **Bei `prefers-reduced-motion: reduce` entfällt jede nicht ausgelöste Bewegung.** Die Seite
  bleibt vollständig: nichts bleibt unsichtbar, nichts bleibt verschoben.
- Die Seite ist **ohne JavaScript vollständig lesbar und bedienbar**. Animation ist eine
  Schicht darüber, kein Träger von Inhalt.

## Wann GSAP

GSAP ist die Voreinstellung, wenn eine der folgenden Anforderungen besteht:

- Sequenzen aus mehreren Schritten (Timeline)
- Steuerung zur Laufzeit (pausieren, umkehren, springen)
- scrollgebundene Animation (ScrollTrigger)
- SVG-Animation, besonders Morphing
- koordinierte Bewegung über mehrere Elemente hinweg

CSS-Transitions reichen für einfache Zustandswechsel: Hover, Fokus, Ein- und Ausblenden.
Dafür kein Framework laden.

GSAP ist framework-agnostisch (Astro, React, Vue, Svelte, vanilla) und treibt unter anderem
Webflow Interactions.

## Kern-API

```js
gsap.to(ziel, vars)              // vom Ist-Zustand zu vars: der Normalfall
gsap.from(ziel, vars)            // von vars zum Ist-Zustand: gut für Auftritte
gsap.fromTo(ziel, von, nach)     // beides explizit, liest nichts aus dem DOM
gsap.set(ziel, vars)             // sofort, ohne Dauer
```

Eigenschaftsnamen in camelCase: `backgroundColor`, `marginTop`, `rotationX`.

Wichtige `vars`:

| Eigenschaft | Bedeutung |
|---|---|
| `duration` | Sekunden, Standard 0.5 |
| `delay` | Verzögerung in Sekunden |
| `ease` | `"power1.out"` (Standard), `"power3.inOut"`, `"back.out(1.7)"`, `"none"` |
| `stagger` | Zahl oder `{ amount: 0.3, from: "center" }` / `{ each: 0.1, from: "random" }` |
| `onComplete` | Callback |

**Timeline** für Abfolgen:

```js
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } });
tl.from('.held__titel', { y: 24, autoAlpha: 0 })
  .from('.held__text',  { y: 16, autoAlpha: 0 }, '-=0.35')   // überlappt
  .from('.held__cta',   { y: 12, autoAlpha: 0 }, '-=0.3');
```

`autoAlpha` statt `opacity`: es setzt zusätzlich `visibility`, das Element ist bei 0 also
auch für Screenreader und Klicks weg.

## Reduzierte Bewegung sauber behandeln

`gsap.matchMedia()` ist der Weg, nicht ein `if` am Anfang. Es räumt beim Wechsel auf:

```js
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const tl = gsap.timeline();
  tl.from('[data-anim="auf"]', { y: 24, autoAlpha: 0, stagger: 0.08 });
  return () => tl.kill();          // Aufräumen beim Verlassen der Bedingung
});

mm.add('(min-width: 861px)', () => { /* nur Desktop */ });
```

## ScrollTrigger

```js
gsap.registerPlugin(ScrollTrigger);

gsap.from('.karte', {
  y: 24, autoAlpha: 0, stagger: 0.08,
  scrollTrigger: {
    trigger: '.sektion',
    start: 'top 75%',       // "Position im Trigger  Position im Viewport"
    once: true,
  },
});
```

| Option | Wofür |
|---|---|
| `start` / `end` | `"top 75%"`, `"bottom top"`, `"+=300"`, `"clamp(top bottom)"` |
| `scrub` | bindet den Fortschritt an die Scrollposition; `scrub: 1` glättet |
| `pin` | heftet ein Element fest. Nie das gepinnte Element selbst animieren, nur Kinder |
| `once` | räumt den Trigger nach dem ersten Durchlauf ab |
| `markers` | nur in der Entwicklung |
| `toggleActions` | `"play none none none"` (Standard) bis `"play reverse play reverse"` |

`ScrollTrigger.batch()` fasst Callbacks vieler Elemente zusammen: die bessere Wahl
gegenüber vielen Einzel-Triggern für dieselbe Listenanimation.

### Drei Fallen, die in echten Projekten Zeit gekostet haben

1. **`gsap.from()` mit `once: true` braucht ein Aufräumen.** `ScrollTrigger.refresh()` setzt
   `from()`-Animationen kurz auf den Anfangswert zurück, um die natürliche Höhe zu messen,
   und stellt sie danach wieder her. Ein Trigger mit `once: true` ist dann schon abgeräumt
   und stellt nichts mehr zurück: Karten bleiben dauerhaft 24 px zu tief, Balken bleiben
   auf `scaleX: 0` unsichtbar. Deshalb: am Ende jeder solchen Animation die Startwerte
   explizit zurücksetzen (`gsap.set(...)` oder `clearProps`).
2. **Ein gepinntes Element in einem Grid pinnt nur seine eigene Zeile.** Die Bahn muss
   `display: block` sein, sonst ist der Haftbereich viel kürzer als erwartet.
3. **Die Höhe einer gepinnten Bühne fest setzen, nicht aus dem Inhalt ableiten.** Hängt sie
   am Inhalt, wandert mit jedem nachgeladenen Bild der Endpunkt des Scrollwegs.

### Scrollgebundenes Video

Ein Video an `currentTime` zu hängen ist die eindrucksvollste und zugleich teuerste
Scroll-Animation. Wenn, dann richtig:

- **Jedes Bild ein Schlüsselbild** (`-g 1` beim Kodieren). Sonst muss der Browser für jede
  Scrollposition ab dem letzten Keyframe dekodieren und das Spulen ruckelt. Preis: grob die
  siebenfache Dateigröße. Bei einer scrollgebundenen Animation ist das der übliche Handel.
- **Quelle in einem `data-`Attribut parken** und erst nach dem `load`-Ereignis einhängen.
  Im Markup würde das Video gegen jedes Bild um die Leitung laufen.
- **Drei Ebenen**, damit nie etwas fehlt: (1) im Markup ein statisches Bild, das dieselbe
  Aussage trägt; (2) läuft JavaScript, ist Bewegung erlaubt und meldet das Video
  `loadeddata`, wird auf die Scroll-Fassung umgeschaltet; (3) geht dabei etwas schief,
  bleibt Ebene 1 stehen.
- **Welcher Textblock hervorgehoben wird, wird gemessen, nicht gerechnet:** der Block,
  dessen Mitte der Bezugslinie am nächsten liegt. Eine feste Formel aus dem Scrollfortschritt
  läuft bei jeder Layoutänderung aus dem Takt.

## Performance

- **Nur `transform` und `opacity` animieren** (`x`, `y`, `scale`, `rotation`). Diese laufen
  auf dem Compositor, ohne Layout und meist ohne Paint.
- **Nicht animieren:** `width`, `height`, `top`, `left`, `margin`, `padding`: jedes davon
  löst Layout aus.
- `will-change: transform` **nur** auf Elementen, die wirklich animieren, nie vorsorglich.
- `stagger` statt vieler Einzel-Tweens mit manuellen Delays.
- `gsap.quickTo()` für häufig aktualisierte Werte (Mausfolger).
- `ScrollTrigger.refresh()` nur aufrufen, wenn sich das Layout tatsächlich geändert hat
  (nach dem Nachladen von Inhalten), entprellt.
- Animationen außerhalb des Sichtbereichs pausieren oder killen.

## In React

```jsx
import { useGSAP } from '@gsap/react';

useGSAP(() => {
  gsap.from('.karte', { y: 24, autoAlpha: 0, stagger: 0.08 });
}, { scope: container });      // scope begrenzt die Selektoren, useGSAP räumt automatisch auf
```

Ohne `useGSAP` gilt: jede Animation und jeder ScrollTrigger wird im Cleanup des Effekts
gekillt, sonst laufen nach einem Re-Render Geister weiter.

## Bewährte Muster für Unternehmensseiten

| Muster | Einsatz | Hinweis |
|---|---|---|
| Hero-Timeline | einmal beim Laden, gestaffelt | der eine orchestrierte Moment |
| Einblenden je Sektionsgruppe | `data-anim-gruppe` + `data-anim="auf"` | sparsam, nicht an jeder Sektion |
| Zahlen hochzählen | Kennzahlen | nur wenn die Zahl belegt ist |
| Balken wachsen | Vergleiche | `scaleX` mit `transform-origin: left` |
| Parallaxe | großes Bild | nur Desktop, kleine Amplitude |
| Kartenstapel | Prozessschritte | nur ab ausreichender Fenstergröße und -höhe |
| Marquee-Logoleiste | Presse, Partner | CSS statt GSAP; Liste doppelt, Spur um exakt 50 % verschieben, bei reduzierter Bewegung still und scrollbar |

Für die vollständige GSAP-Dokumentation lohnt zusätzlich die Installation der offiziellen
GSAP-Skills, siehe `../../../README.md` → Quell-Skills nachinstallieren.
