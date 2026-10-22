# Interface-Regeln

`26-geschmack-und-ki-tells.md` fragt, ob eine Seite nach Maschine aussieht. Dieses Kapitel
fragt, ob sie sich richtig bedienen lässt: Fokus, Formulare, Zustände, Medien, Bewegung,
Touch. Es ist ein Regelkatalog zum Nachschlagen und am Ende ein Audit-Ablauf, der Befunde als
`datei:zeile` meldet.

Die Substanz stammt aus zwei Quellen, destilliert und auf Astro, CSS und die harten Grenzen
dieses Skills übertragen:

| Quelle | Lizenz | Was eingeflossen ist |
|---|---|---|
| [web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) von Vercel Labs, gelesen über den Skill `web-design-guidelines` aus [agent-skills](https://github.com/vercel-labs/agent-skills) | MIT | die Regelbereiche, das Befundformat `datei:zeile`, die Liste der Anti-Muster |
| [impeccable](https://github.com/pbakaus/impeccable) von Paul Bakaus | Apache 2.0 | der Abgleich mit rund 60 Detector-Regeln, die Trennung von sofortigen und späten Befunden, die Regel zum Umgang mit Fehlalarmen |

Wo eine Quelle diesem Regelwerk widerspricht, gilt dieses Regelwerk. Die Stellen stehen mit
Grund in Abschnitt 12.

**Rangfolge:** Die harten Grenzen aus `SKILL.md` und ein geliefertes Kundendesignsystem
(`24-designsystem-vorrang.md`) gehen vor. Die Spalte „Prüfen" nennt das Skript und die
Regel, die den Punkt maschinell findet. „Ansehen" heißt: kein Skript findet es sicher, also
im Browser nachsehen und im Audit als angesehen oder ungeprüft benennen.

## Inhalt

- 1\. Interaktion
- 2\. Fokus
- 3\. Formulare
- 4\. Navigation und Zustände
- 5\. Bilder und Medien
- 6\. Inhalte und Texte
- 7\. Dark Mode und Theming
- 8\. Bewegung und Performance im Interface
- 9\. Touch
- 10\. Abgleich mit den Detector-Regeln von impeccable
- 11\. Audit-Ablauf
- 12\. Was bewusst nicht übernommen wurde
- Verwandte Kapitel

## 1. Interaktion

```html
<!-- falsch: kein Tastaturfokus, keine Rolle, kein Mittelklick -->
<div class="karte" onclick="location.href='/leistungen/dach'">…</div>

<!-- richtig: die ganze Karte ist ein Link, der Titel ist sein Name -->
<article class="karte">
  <h3><a href="/leistungen/dach" class="karte__link">Flachdachsanierung</a></h3>
  …
</article>
```

```css
/* Klickfläche über die ganze Karte, ohne den Link um Block-Inhalt zu legen */
.karte { position: relative; }
.karte__link::after { content: ""; position: absolute; inset: 0; }
```

| Regel | Grund | Prüfen |
|---|---|---|
| Aktion ist `<button>`, Ziel ist `<a href>`. Kein `div` oder `span` mit Klickhandler | nur echte Bedienelemente sind fokussierbar, haben eine Rolle und lösen mit Enter oder Leertaste aus. Ein Link öffnet sich mit Strg und Mittelklick im neuen Tab | ansehen, Suche nach `onclick=` an `div`/`span` |
| Navigation über einen Link, nicht über `location.href` im Klickhandler | dieselben Gründe, und der Link ist für Suchmaschinen ein Link | ansehen |
| Jeder Button und jeder Link hat einen zugänglichen Namen: sichtbarer Text, `aria-label` oder `.sr-only`-Text. Ein Logo-Link braucht `alt` am Bild | ohne Namen liest der Screenreader nur „Schalter" oder die Adresse vor (WCAG 4.1.2) | `pruefe-geschmack` (`name-fehlt`, FEHLER) |
| Dekorative Icons in Bedienelementen bekommen `aria-hidden="true"` | sonst liest der Screenreader den Dateinamen oder den Pfad vor, zusätzlich zum Namen | ansehen |
| Hover, Fokus und Aktiv sind sichtbar verschieden und stärker als der Ruhezustand | ein Zustand, der sich schwächer abhebt als die Ruhe, sieht aus wie ausgeschaltet. Hover-Pflicht für Kacheln: `02-design-ux.md` | ansehen |
| Ein ausgeschalteter Button bleibt lesbar und sagt, warum er aus ist | ein grauer Knopf ohne Grund lässt raten, was fehlt | ansehen |
| Senden-Button bleibt aktiv, bis die Anfrage wirklich läuft, dann deaktiviert mit wechselnder Beschriftung | vorher deaktiviert verrät er nicht, welches Feld fehlt; während der Anfrage verhindert er doppeltes Absenden | ansehen, Ablauf in `../../agentur-website-builder/references/formulare-und-resend.md` |
| Zerstörende Aktionen (Löschen, Abmelden aus einem Konto) brauchen Bestätigung oder Rückgängig | ein Fehlklick darf nichts kosten, was sich nicht zurückholen lässt | ansehen |
| Ein Modal nur, wenn die Aufgabe Unterbrechung oder geschützten Fokus braucht | ein Modal aus Gewohnheit verdeckt die Seite und braucht Fokusfalle, Escape und Rückgabe des Fokus (`04-barrierefreiheit-bfsg.md`) | ansehen |

## 2. Fokus

```css
/* richtig: Ring gestalten, nicht entfernen */
:focus-visible { outline: 3px solid var(--farbe-fokus); outline-offset: 3px; }

/* richtig: Ring nur beim Mausklick unterdrücken */
:focus:not(:focus-visible) { outline: none; }

/* falsch: entfernt genau den Tastaturfokus, ohne Ersatz */
.knopf:focus-visible { outline: none; }
```

| Regel | Grund | Prüfen |
|---|---|---|
| Kein `outline: none`, `outline: 0` oder `outline-none` ohne Ersatz in derselben Regel oder einer `:focus-visible`-Regel | harte Grenze: Fokusringe werden gestaltet, nie entfernt | `pruefe-geschmack` (`fokus-entfernt`: FEHLER an `:focus-visible` ohne Ersatz, sonst WARNUNG) |
| `:focus-visible` statt `:focus` für den Ring | `:focus` zeigt den Ring auch nach jedem Mausklick, und dann wird er aus Ärger entfernt | ansehen |
| Zusammengesetzte Bedienelemente (Suchfeld mit Knopf, Mengenwahl) markieren die Gruppe mit `:focus-within` | der Ring am inneren Feld allein sitzt an der falschen Stelle | ansehen |
| Sticky Kopf, Cookie-Leiste und Chat-Knopf verdecken den fokussierten Punkt nie | ein Fokus unter der Kopfleiste ist für Tastaturnutzer verloren (WCAG 2.4.11). `scroll-padding-top` in Höhe der sticky Gruppe, siehe `02-design-ux.md` | Tab-Durchlauf |
| Skip-Link als erstes fokussierbares Element, Ziel `<main id="hauptinhalt" tabindex="-1">` | wer mit der Tastatur kommt, will nicht jede Seite durch das ganze Menü | Tab-Durchlauf, Details in `04-barrierefreiheit-bfsg.md` |
| Kein `tabindex` größer 0 | eine eigene Reihenfolge widerspricht der sichtbaren und wird bei jeder Änderung falsch | ansehen, Suche nach `tabindex="[1-9]` |
| Kein `autofocus` auf Unternehmensseiten | der Fokus springt beim Laden ins Feld, das Handy schiebt die Tastatur über den Inhalt, und der Screenreader beginnt mitten auf der Seite | `pruefe-geschmack` (`autofocus`, WARNUNG) |
| Sprungziele von Ankerlinks mit `scroll-margin-top` oder `scroll-padding-top` | sonst landet die Überschrift unter dem sticky Kopf | ansehen |

## 3. Formulare

Die Feldregeln, die Reihenfolge und die Fehlerbehandlung stehen in
`58-formulare-und-anfragestrecken.md`, der Versand in
`../../agentur-website-builder/references/formulare-und-resend.md`. Hier nur das, was sich am
Code ablesen lässt.

```html
<label for="email">E-Mail</label>
<input id="email" name="email" type="email" autocomplete="email" spellcheck="false"
       aria-describedby="email-hinweis">
<p id="email-hinweis">Für die Bestätigung Ihrer Anfrage.</p>
```

| Regel | Grund | Prüfen |
|---|---|---|
| Name, E-Mail und Telefon mit `autocomplete` (`name`, `email`, `tel`, bei B2B `organization`) | die Autofüllung erspart am Handy das Tippen, sie ist der kürzeste Weg zur Anfrage | `pruefe-geschmack` (`autocomplete`, WARNUNG; Honigtopf mit `tabindex="-1"` ausgenommen) |
| Richtiger `type` (`email`, `tel`, `url`) und bei Ziffern `inputmode="numeric"` | der Typ wählt die Handytastatur. `type="number"` nur für echte Mengen, nicht für Postleitzahl oder Telefon | ansehen |
| Jedes Feld hat ein sichtbares `<label>`, das mit `for` oder durch Umschließen verbunden ist | ein Platzhalter verschwindet beim Tippen; ein verbundenes Label vergrößert die Klickfläche | ansehen, `04-barrierefreiheit-bfsg.md` |
| Checkbox und Radio teilen sich mit ihrem Label eine Klickfläche ohne Lücke | die Lücke zwischen Kästchen und Text ist der häufigste Fehlklick am Handy | ansehen |
| Einfügen nie sperren | die Sperre bricht Passwortmanager und kopierte Adressen und trifft zuerst Menschen, die schwer tippen | `pruefe-geschmack` (`einfuegen-gesperrt`, WARNUNG) |
| `spellcheck="false"` an E-Mail, Codes und Benutzernamen | die Rechtschreibprüfung unterstreicht jede Adresse rot und schlägt falsche Korrekturen vor | ansehen |
| Fehler am Feld, verbunden über `aria-describedby`, Zustand über `aria-invalid`; nach dem Absenden Fokus auf das erste fehlerhafte Feld | eine Sammelmeldung oben findet niemand, der unten im Formular steht | ansehen |
| Statusmeldungen (gesendet, Fehler) in einem Bereich mit `aria-live="polite"` | sonst erfährt ein Screenreader nicht, dass etwas passiert ist | ansehen |
| Platzhalter zeigt ein Beispiel, nie die Beschriftung: „z. B. 0511 123456" | ein Beispiel klärt das Format, eine Beschriftung im Platzhalter ist beim Tippen weg | ansehen |
| Ungespeicherte Eingaben in langen Formularen vor dem Verlassen schützen | wer nach zehn Feldern auf einen Link tippt, gibt nicht ein zweites Mal ein | ansehen, nur bei mehrstufigen Formularen |

## 4. Navigation und Zustände

| Regel | Grund | Prüfen |
|---|---|---|
| Filter, Reiter und Seitenzahlen, die einen Inhalt auswählen, stehen in der Adresse (`?kategorie=dach`) | ein geteilter oder gemerkter Link zeigt dasselbe, und der Zurück-Knopf funktioniert | ansehen |
| Jede Seite hat genau eine `h1`, Überschriften ohne Sprung | Screenreader springen über Überschriften durch die Seite | ansehen, `04-barrierefreiheit-bfsg.md` |
| Leere, lange und fehlende Inhalte sind gebaut: leere Liste, sehr langer Name, fehlendes Bild | eine Komponente, die nur mit dem Musterinhalt funktioniert, bricht beim ersten echten Datensatz | ansehen, mit langem Testinhalt |
| Flex-Kinder mit Text bekommen `min-width: 0`, lange Wörter `overflow-wrap: anywhere` | sonst schiebt eine lange Adresse oder ein Kompositum die Spalte über den Rand | `pruefe-breakpoints` (Überlauf) |
| Ein Container mit `overflow: hidden` oder `clip` enthält keine Menüs, Tooltips oder Popover | sie werden am Rand abgeschnitten. Die Ebene gehört außerhalb des beschnittenen Rahmens | ansehen |
| Derselbe Text steht in einer Karte nicht dreimal (Status im Kopf, im Etikett und im Knopf) | Wiederholung im selben Kasten ist Schablonenfüllung, keine Information | ansehen |

## 5. Bilder und Medien

```astro
---
import { Image } from 'astro:assets';
import held from '../assets/held.jpg';
---
<Image src={held} alt="Montageteam auf einem Flachdach in Hannover" loading="eager"
       fetchpriority="high" widths={[640, 1280, 1920]} sizes="100vw" />
```

| Regel | Grund | Prüfen |
|---|---|---|
| Jedes `<img>` mit `width` und `height` (Astro `<Image>` setzt beides) | ohne Maße springt das Layout beim Laden (CLS unter 0,1 ist harte Grenze) | `pruefe-breakpoints` (Bilder ohne Maße), Regeln in `02-design-ux.md` |
| Heldenbild `fetchpriority="high"`, alles unter der Falz `loading="lazy"` | das größte Bild oben bestimmt den LCP | ansehen, `03-technik-performance.md` |
| Jedes Bild hat `alt`, dekorative `alt=""` | Regeln und Beispiele in `04-barrierefreiheit-bfsg.md` | ansehen |
| Kein `<img>` ohne `src` oder mit Platzhalterpfad | es geht als zerbrochener Rahmen live | `pruefe-platzhalter` für `[[FEHLT: …]]`, sonst Netzwerk-Reiter ansehen |
| Kein Bild unter einer fast deckenden Fläche oder mit Deckkraft nahe 0 | es kostet Ladezeit und kommt nie auf den Bildschirm | ansehen |
| Bewegte Bilder als `<video autoplay muted loop playsinline>` mit Standbild (`poster`), kein animiertes GIF | ein GIF ist ein Vielfaches größer und lässt sich nicht anhalten | ansehen |
| Selbstlaufende Bewegung über fünf Sekunden neben anderem Inhalt hat Pause oder Stopp | WCAG 2.2.2, und Bewegung am Rand stört das Lesen | ansehen |
| Dekorative Videoschleifen stehen unter `prefers-reduced-motion: reduce` still | die Einstellung gilt auch für Hintergrundvideo | ansehen, `18-motion-handschrift.md` |
| Videos mit Untertiteln, Audio mit Abschrift | `04-barrierefreiheit-bfsg.md` | ansehen |
| Eingebettete Fremdmedien erst nach Einwilligung | jeder Abruf von YouTube oder Vimeo überträgt Daten, siehe `07-recht-dsgvo.md` | ansehen |

## 6. Inhalte und Texte

| Regel | Grund | Prüfen |
|---|---|---|
| Auslassungszeichen `…` statt drei Punkte, auch in Ladezuständen: „Wird gesendet …" | drei Punkte brechen am Zeilenende auseinander und sehen nach Tastatur aus | ansehen |
| Deutsche Anführungszeichen „…", keine geraden `"` im Seitentext | gerade Zeichen sind Programmiersprache, nicht Satz. Siehe `12-copywriting.md` | ansehen |
| Geschütztes Leerzeichen zwischen Zahl und Einheit: `24&nbsp;h`, `10&nbsp;%`, `z.&nbsp;B.` | sonst steht die Einheit allein am Anfang der nächsten Zeile | ansehen |
| Zahlen in Tabellen und Preisvergleichen mit `font-variant-numeric: tabular-nums` | gleich breite Ziffern stehen untereinander, Vergleich ohne Springen | ansehen |
| `text-wrap: balance` an Überschriften, `pretty` am Fließtext | verhindert die einzelne Silbe in der letzten Zeile. Steht in `02-design-ux.md` | ansehen |
| Kein Blocksatz | ohne Silbentrennung (harte Grenze) reißt Blocksatz in schmalen Spalten Lücken zwischen die Wörter | ansehen |
| Knöpfe sagen, was passiert: „Anfrage senden", nicht „Weiter" oder „OK" | ein Knopf ohne Verb lässt offen, ob gesendet, gespeichert oder nur geblättert wird. Vokabular in `12-copywriting.md` | ansehen |
| Fehlermeldungen nennen Problem und Ausweg: „Bitte eine E-Mail-Adresse mit @ eingeben" | „Ungültige Eingabe" sagt nicht, was zu tun ist | ansehen |
| Markennamen und Produktkürzel mit `translate="no"` | die automatische Übersetzung im Browser macht sonst aus dem Firmennamen ein Wort | ansehen |
| Datum und Zahl mit `Intl.DateTimeFormat` und `Intl.NumberFormat` in `de-DE` formatieren, wenn sie aus Daten kommen | handgebaute Formate vertauschen Tag und Monat oder Komma und Punkt | ansehen |

## 7. Dark Mode und Theming

Ein Dunkelmodus wird nur gebaut, wenn er gepflegt wird (`10-visuelle-richtung.md`). Gibt es
ihn, gelten diese Regeln, und einige gelten auch ohne ihn.

```css
:root { color-scheme: light; accent-color: var(--farbe-akzent); }
:root[data-thema="dunkel"] { color-scheme: dark; }
::selection { background: var(--farbe-akzent); color: var(--farbe-akzent-auf); }
select { background-color: var(--farbe-flaeche); color: var(--farbe-text); }
```

| Regel | Grund | Prüfen |
|---|---|---|
| `color-scheme` am Wurzelelement passend zum Thema | sonst bleiben Bildlaufleiste, Formularfelder und Datumswähler hell auf dunkler Seite | ansehen |
| `<meta name="theme-color">` gleich der Seitenfläche, bei zwei Themen zweimal mit `media` | die Browserleiste am Handy gehört sonst zu einer anderen Seite | ansehen, Vorlage `head-meta.html` |
| Natives `<select>` mit ausdrücklicher Hinter- und Vordergrundfarbe | unter Windows im Dunkelmodus erscheint sonst weiße Schrift auf weißer Liste | ansehen |
| Browserflächen aus der Palette: `::selection`, `accent-color`, `caret-color` | die Teile, die niemand gezeichnet hat, verraten am schnellsten, dass die Seite zusammengesetzt wurde | ansehen |
| Farben nur über Rollen-Tokens, nie roh im Komponentencode | Theming, das an Rohwerten hängt, vergisst beim Umschalten die Hälfte | `pruefe-tokens`, Kontrast beider Themen mit `pruefe-kontrast` |
| Grauer Text nicht auf farbiger Fläche | Grau auf Farbe wirkt verwaschen und reißt oft den Kontrast; besser eine dunkle Stufe der Flächenfarbe | `pruefe-kontrast` für die Rollen, sonst ansehen |

## 8. Bewegung und Performance im Interface

```css
/* falsch */
.karte { transition: all .3s; }

/* richtig: nur, was sich ändert, und nur, was nicht das Layout neu rechnet */
.karte { transition: transform var(--dauer-normal) var(--kurve),
                     box-shadow var(--dauer-normal) var(--kurve); }
```

| Regel | Grund | Prüfen |
|---|---|---|
| Kein `transition: all`, kein `transition` ohne Eigenschaft, kein `transition-all` | „all" animiert auch Breite, Höhe und Abstände mit, rechnet dabei das Layout neu und ruckelt; dazu startet bei jeder Klassenänderung eine Bewegung, die niemand geplant hat | `pruefe-geschmack` (`transition-all`, WARNUNG), Bewegungsaudit in `30-motion-pruefung.md` |
| Animiert werden `transform` und `opacity`, für Hover zusätzlich `box-shadow` | sie laufen auf dem Compositor. Breite, Höhe, Rand und Abstand animieren erzwingt Layout in jedem Bild; Höhe eines Akkordeons über `grid-template-rows` | ansehen, `02-design-ux.md` |
| `transform-origin` passend zur Herkunft setzen, bei SVG `transform-box: fill-box` | ein Menü, das aus der Mitte statt aus dem Knopf wächst, wirkt losgelöst | ansehen |
| Jede Bewegung hat eine Fassung für `prefers-reduced-motion: reduce` | harte Grenze, gestufte Fassung in `18-motion-handschrift.md` | ansehen |
| Inhalt ist sichtbar, auch wenn die Einblendung nie läuft | eine Seite, deren Text auf `opacity: 0` wartet, ist bei einem Skriptfehler leer. Siehe `09-motion-gsap.md` | ansehen, Seite mit abgeschaltetem JavaScript laden |
| Bewegung lässt sich unterbrechen | wer während einer Animation klickt, will die Antwort sofort | ansehen |
| Keine Layoutabfragen (`getBoundingClientRect`, `offsetHeight`) in Schleifen oder pro Bild, Lesen und Schreiben bündeln | abwechselndes Lesen und Schreiben erzwingt in jedem Schritt eine neue Layoutrechnung | ansehen |
| `will-change` nur gezielt und nur während der Bewegung | dauerhaft gesetzt hält es Speicher fest und hilft nicht | ansehen |
| Lange Listen über 50 Einträge mit `content-visibility: auto` oder Seitenzahlen | sonst rechnet der Browser Dutzende unsichtbare Karten | ansehen |
| `preconnect` und `preload` nur auf die eigene Domain und die Heldenschrift | Schriften werden selbst gehostet (harte Grenze); ein `preconnect` auf ein Schrift-CDN zeigt einen Verstoß an | `pruefe-typografie` (`fremd-cdn`) |
| Konsole ohne Fehler nach dem Laden | ein Skriptfehler legt Einblendungen, Menü und Formular still, und man sieht es dem Entwurf nicht an | ansehen |

## 9. Touch

| Regel | Grund | Prüfen |
|---|---|---|
| Touchziele mindestens 44 × 44 px mit 8 px Abstand | kleinere Ziele werden am Handy verfehlt, siehe `03-technik-performance.md` | `pruefe-breakpoints` (Touchziele) |
| `touch-action: manipulation` an Bedienelementen | nimmt die Verzögerung für den Doppeltipp-Zoom, ohne das Zoomen zu verbieten | ansehen |
| `-webkit-tap-highlight-color` bewusst setzen, passend zur Markenfarbe oder durchsichtig mit eigenem Aktivzustand | das blaue Standardaufleuchten gehört zu keiner Marke | ansehen |
| `overscroll-behavior: contain` in Menü, Schublade und Modal | sonst scrollt die Seite dahinter mit, wenn das Menü zu Ende ist | ansehen |
| Hover-Effekte unter `@media (hover: hover)` | auf Touch bleibt `:hover` nach dem ersten Tipp hängen. Steht in `02-design-ux.md` | ansehen |
| Wischen, Ziehen und Kneifen haben eine Alternative per Tipp und Tastatur | ein Karussell, das nur auf Wischen reagiert, ist für Tastatur und Schalter unbedienbar (WCAG 2.5.1) | ansehen |
| Volle Breite am Rand mit `env(safe-area-inset-*)` | die Kamerakerbe schneidet sonst Knopf und Text an | ansehen, `16-responsive-container.md` |
| Zoom nie sperren | `user-scalable=no` und `maximum-scale` unter 2 verletzen WCAG 1.4.4 | `pruefe-typografie` (`zoom-gesperrt`) |

## 10. Abgleich mit den Detector-Regeln von impeccable

impeccable bringt einen Detector mit 60 eingebauten Regeln mit (gezählt im gelesenen Commit,
`crates/foundation/src/registry.rs`). Viele davon stehen hier schon. Die Tabelle sagt, wo jede steht,
damit nichts doppelt gepflegt wird.

| impeccable-Regel | Hier |
|---|---|
| `overused-font`, `italic-serif-display` | harte Grenze „Keine Standardschrift" in `SKILL.md`, Serifenreflex in `26` §8, `pruefe-geschmack` (`standardserife`) |
| `flat-type-hierarchy`, `tight-leading`, `wide-tracking`, `extreme-negative-tracking`, `line-length` | `55-typografie-system.md`, `pruefe-typografie` (`ordnung`, `zeile-px`, `laufweite-px`) |
| `tiny-text`, `undersized-ui-text` | harte Grenze 14 px, `pruefe-typografie` (`unter-boden`), `pruefe-breakpoints` (Text unter 14 px) |
| `gradient-text`, `dark-glow`, `radial-halo`, `radial-spotlight-glow`, `ai-color-palette` | `26` §7 „Glühen und Verlaufstext", §8 „Ein Akzent", `10-visuelle-richtung.md` |
| `cream-palette` | `26` §8, `pruefe-geschmack` (`standardpalette`) |
| `kicker-above-heading`, `hero-eyebrow-chip` | `26` §5, `pruefe-geschmack` (`kicker-quote`, `kicker-abstand`); Abweichung in Abschnitt 12 |
| `numbered-section-labels` | `pruefe-geschmack` (`nummer-statt-thema`) |
| `marquee` | `pruefe-geschmack` (`laufband`); Abweichung in Abschnitt 12 |
| `em-dash-overuse` | `pruefe-striche`, strenger: null statt Sättigung |
| `marketing-buzzword`, `aphoristic-cadence`, `theater-slop-phrase` | `deslop-check`, `12-copywriting.md`, Selbstprüfung in `26` §6 |
| `oversized-h1`, `first-viewport-column-overflow` | `26` §4 (Heldenüberschrift höchstens zwei Zeilen), `02-design-ux.md` |
| `codex-grid-background`, `repeating-stripes-gradient` | `26` §7 „Deko-Raster und Fadenkreuze" |
| `side-tab`, `border-accent-on-rounded`, `icon-tile-stack`, `gpt-thin-border-wide-shadow`, `nested-cards`, `pulsing-dot`, `blinking-cursor`, `shape-assembled-illustration` | neu im Katalog `26` §7 |
| `monotonous-spacing`, `cramped-padding`, `heading-rhythm` | `15-spacing-rhythmus.md` |
| `body-text-viewport-edge`, `edge-flush-cards`, `text-overflow` | `16-responsive-container.md`, `pruefe-breakpoints` (Überlauf) |
| `low-contrast`, `gray-on-color` | harte Grenze, `pruefe-kontrast`, hier §7 |
| `skipped-heading` | `04-barrierefreiheit-bfsg.md`, hier §4 |
| `all-caps-body` | `10-visuelle-richtung.md` (Versalien nicht für Labels und Text) |
| `justified-text` | hier §6, Abweichung in Abschnitt 12 |
| `layout-transition` | hier §8, `pruefe-geschmack` (`transition-all`) für den häufigsten Fall |
| `bounce-easing` | `18-motion-handschrift.md`: Federn nur im Profil `verspielt` |
| `broken-image`, `buried-raster` | hier §5 |
| `script-error`, `content-hidden-at-rest` | hier §8 |
| `text-occlusion`, `clipped-overflow-container`, `repeated-container-text` | hier §4, Screenshots aus `pruefe-breakpoints` |
| `organic-clip-path` | ansehen: ein `clip-path` mit vielen Punkten als Ersatz für ein freigestelltes Foto. Besser ein freigestelltes Bild oder keins |
| `design-system-font`, `design-system-color`, `design-system-radius`, `design-system-font-size` | `pruefe-tokens`, `24-designsystem-vorrang.md` |

Die Befehle von impeccable entsprechen hier Kapiteln, nicht Befehlen: `audit` ist Abschnitt
11, `harden` §4 und §6 plus `58-formulare-und-anfragestrecken.md`, `adapt`
`16-responsive-container.md`, `animate` `18-motion-handschrift.md`, `typeset`
`55-typografie-system.md`, `layout` `15-spacing-rhythmus.md`, `colorize`
`10-visuelle-richtung.md`, `clarify` `12-copywriting.md`, `distill` und `quieter` `26`,
`critique` `27-redesign-bestand.md`, `optimize` `03-technik-performance.md`, `init` und
`document` die `marke.json` mit `20-markenextraktion-bestandsseite.md`, `extract`
`24-designsystem-vorrang.md`. Was fehlt, steht in Abschnitt 12.

## 11. Audit-Ablauf

Prüft gebauten Code gegen diesen Katalog. Der Katalog liegt im Plugin, es wird zur Laufzeit
nichts aus dem Netz geholt.

**Schritt 1: Skripte.** Sie finden das Zählbare und liefern die Zeile gleich mit.

```bash
pnpm build
node scripts/pruefe-geschmack.mjs          # Seiten aus dist, Quellen aus src
node scripts/pruefe-typografie.mjs
node scripts/pruefe-tokens.mjs
node scripts/pruefe-kontrast.mjs
node scripts/pruefe-striche.mjs src
node scripts/pruefe-breakpoints.mjs http://localhost:4321   # braucht Playwright
```

**Schritt 2: Katalog lesen, Bereich für Bereich.** Die Dateien, die der Auftrag nennt, oder
alle Komponenten und Seiten unter `src/`. Für jede Regel mit „ansehen" gezielt suchen, etwa
`onclick=` an `div`, `tabindex="[1-9]`, `type="number"` an Telefon und Postleitzahl,
`...` im Seitentext, `<select` ohne Farben, `getBoundingClientRect` in Schleifen.

**Schritt 3: Im Browser.** Tab-Durchlauf über die Hauptwege, eine Seite mit abgeschaltetem
JavaScript, die Konsole, das Handy oder seine Simulation mit 375 px.

**Schritt 4: Befunde melden**, gruppiert nach Datei, eine Zeile je Befund, Regel kurz, Ersatz
nur, wenn er nicht offensichtlich ist:

```text
## src/components/Kopf.astro

src/components/Kopf.astro:41 - Menüknopf ohne Namen → aria-label="Menü öffnen"
src/components/Kopf.astro:58 - outline: none an .nav a:focus-visible ohne Ersatz

## src/components/Kontakt.astro

src/components/Kontakt.astro:22 - E-Mail ohne autocomplete="email"
src/components/Kontakt.astro:30 - Telefon als type="number" → type="tel"

## src/components/Fuss.astro

✓ ohne Befund
```

Ohne Zeilennummer, weil der Befund aus der gebauten Seite stammt, wird die Datei unter `dist/`
genannt und im Satz gesagt, aus welcher Komponente sie kommt. Am Ende steht, was nicht
angesehen wurde.

**Schwere.** FEHLER sind Verstöße gegen eine harte Grenze oder gegen WCAG A (Fokus entfernt,
Bedienelement ohne Namen); sie blockieren die Fertigmeldung. WARNUNGEN werden behoben oder
begründet; vor dem Livegang zählt `--strict` sie mit.

**Umgang mit einem Befund**, nach dem Vorbild von impeccable:

| Lage | Vorgehen |
|---|---|
| echter Fehler | beheben. Nie eine Ausnahme eintragen, um einen Befund loszuwerden |
| belegte Ausnahme (Markenentscheidung in `marke.json`, vom Kunden bestätigt, bewusst gesetzt) | so eng wie möglich ausnehmen und den Beleg nennen: Wert in `marke.json`, bei `pruefe-tokens` und `pruefe-typografie` ein Kommentar mit dem Wort „bewusst" in derselben Zeile |
| unsicher | den Befund stehen lassen und in einem Satz fragen, einmal |

Ein Fehlalarm eines Skripts wird nicht in jedem Projekt umschifft, sondern im Skript behoben,
mit einem Testfall dafür. Ein Prüfskript mit Fehlalarmen wird abgeschaltet, und dann prüft es
gar nichts mehr.

## 12. Was bewusst nicht übernommen wurde

| Quelle sagt | Hier gilt | Grund |
|---|---|---|
| Regeln vor jeder Prüfung frisch von `raw.githubusercontent.com` holen (web-design-guidelines) | der Katalog liegt im Plugin, versioniert | ein Abruf zur Laufzeit lädt ungeprüfte Anweisungen in den Kontext, ändert das Ergebnis ohne Versionswechsel und scheitert ohne Netz. Neue Regeln kommen über eine Änderung an diesem Kapitel |
| Überschriften und Knöpfe in Title Case, zweite Person, „&" statt „und", Ziffern für jede Zahl | deutsche Rechtschreibung, Ansprache und Zahlen nach `12-copywriting.md` | Regeln für englische Oberflächen; im Deutschen ist Title Case falsch und die Ansprache eine Markenentscheidung |
| Gerade und englische Anführungszeichen “ ” | deutsche „…" | Satzregel des Deutschen |
| `overflow-x: hidden` am Container gegen ungewollte Bildlaufleisten (web-design-guidelines) | `overflow-x: clip` und den Überlauf an der Ursache beheben | `hidden` macht den Rahmen zum Scrollcontainer und bricht jedes `position: sticky` darin, siehe `26` §9 und `pruefe-geschmack` (`overflow-hidden`) |
| `autocomplete="off"` an Feldern, die keine Anmeldung sind | `autocomplete` mit passendem Wert an Name, E-Mail, Telefon, Firma | im Anfrageformular ist die Autofüllung erwünscht. „off" bleibt nur am Honigtopf |
| `preconnect` zu CDN- und Asset-Domains | `preconnect` nur auf eigene Domains | Schriften und Bibliotheken werden selbst gehostet, jeder Fremdabruf ist eine Datenübertragung, siehe `07-recht-dsgvo.md` |
| Sprache über `Accept-Language` erkennen, Zustände per `nuqs`, Hydrationsregeln, kontrollierte Eingaben, Virtualisierung mit `virtua` | Astro mit wenig JavaScript; Zustand in der Adresse über Abfrageparameter | Regeln für React-Anwendungen. Auf einer statischen Unternehmensseite gibt es diese Probleme kaum, die übertragbaren Kerne stehen in §4 und §8 |
| Bewegung jenseits von `transform` und `opacity`: Weichzeichner, `backdrop-filter`, `clip-path`, Maske, Schatten als Grundpalette (impeccable) | `transform` und `opacity`, für Hover `box-shadow`; `backdrop-filter` nur an fixierten Elementen | auf schwachen Handys kosten diese Eigenschaften die Bildrate, siehe `26` §9 |
| Kicker über einer Überschrift ist ohne Ausnahme verboten (impeccable) | höchstens einer je drei Sektionen | harte Grenze in `SKILL.md`; der Kicker als bewusstes Markenelement bleibt möglich (`12-copywriting.md`), nur die Gewohnheit ist der Befund |
| Laufband grundsätzlich ein Tell (impeccable) | höchstens eines je Seite, dort, wo die Menge die Aussage ist | harte Grenze in `SKILL.md`; eine Logowand mit echten, freigegebenen Kunden kann als Band richtig sein |
| Gedankenstriche erst ab Sättigung melden, acht je Text (impeccable) | kein Gedankenstrich im Seitentext | harte Grenze, `pruefe-striche` |
| Schrift ab 12 px Fließtext, 11 px Bedientext (impeccable) | ab 14 px, in rem | harte Grenze, `55-typografie-system.md` |
| Blocksatz notfalls mit `hyphens: auto` (impeccable) | kein Blocksatz | harte Grenze: keine Silbentrennung |
| Eigene Bildlaufleisten aus der Palette (impeccable) | Systembildlaufleiste, `color-scheme` passend | eine eigene Leiste ist schmaler und schwerer zu greifen; die Palette reicht für Auswahl, Cursor und `accent-color` |
| Hook, der nach jeder Bearbeitung den Detector als `npx`-Binärdatei startet und Ausnahmen in `.impeccable/config.json` schreibt | Prüfskripte aus `scripts/` vor der Fertigmeldung, Ausnahmen in `marke.json` oder als „bewusst"-Kommentar | ein Hook mit nachgeladenem Programm ist eine Abhängigkeit, die das Plugin bewusst nicht hat (`CLAUDE.md`). Übernommen ist die Idee dahinter: sofort melden, was sicher falsch ist (FEHLER), und das Übrige gesammelt am Ende (WARNUNG, `--strict`) |
| Live-Varianten im Browser, `overdrive`, `bolder`, `delight` | `10-visuelle-richtung.md`, `18-motion-handschrift.md`, `22-premium-designquellen.md` | eine eigene Handschrift entsteht aus Marke und Gegenstand, nicht aus generierten Varianten; Live-Modus braucht einen eigenen Dienst |

## Verwandte Kapitel

- `26-geschmack-und-ki-tells.md`: was nach Maschine aussieht, Katalog der Tells, Vorflugcheck
- `04-barrierefreiheit-bfsg.md`: Kontrast, Alt-Texte, Tastatur, BFSG
- `02-design-ux.md`: Hover und Zustände, Bilder, Sticky-Kopf
- `58-formulare-und-anfragestrecken.md`: Felder, Reihenfolge, Fehler, Formulartypen
- `03-technik-performance.md`: Ladezeit, Bilder, Schriften, Touchziele
- `18-motion-handschrift.md` und `09-motion-gsap.md`: Bewegung mit Begründung, reduzierte Fassung
- `30-motion-pruefung.md`: Bewegung im Einzelnen prüfen, Befundtabelle mit Ersatz
- `55-typografie-system.md`: Größen, Zeilenhöhe, Laufweite, Zoom
- `16-responsive-container.md`: Umschaltbreiten, Überlauf, sichere Ränder
- `12-copywriting.md`: Knopftexte, ein Name je Aktion
