# Motion prüfen: Entscheidung, Kurven, Dauer, Review

`09-motion-gsap.md` sagt, wie animiert wird, `18-motion-handschrift.md`, wie die Bewegung zur
Marke passt. Dieses Kapitel fragt davor und danach: **Soll das überhaupt animieren, und hält
die fertige Animation einer strengen Prüfung stand?** Es ist die Lücke zwischen „Regeln für
Bewegung" und „jemand sagt Nein, wenn sie falsch ist".

Die Substanz stammt aus [emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT):
`emil-design-eng`, `review-animations` und `animation-vocabulary`. Übernommen sind Entscheidungsfolge,
Grenzwerte und der Review-Maßstab, kein Text. Die Originale zielen auf Produkt-UI in React; hier
gilt es für Unternehmensseiten in Astro mit CSS und GSAP, deshalb sind Dauer und Kurven an die
Tokens aus `assets/vorlagen/tokens.css` gebunden und zwei Widersprüche offen benannt (Abschnitt 8).

## Inhalt

- 1\. Zuerst: soll es animieren?
- 2\. Kurve und Dauer
- 3\. Fünf Bauregeln für Bedienelemente
- 4\. Was animiert wird und was nicht
- 5\. Zugänglichkeit
- 6\. Der Review, in zehn Maßstäben
- 7\. Prüfen, nicht nur ansehen
- 8\. Wo dieses Kapitel dem bestehenden Motion-System widerspricht
- 9\. Kurzvokabular für Animationsfeedback
- Verwandte Kapitel

## 1. Zuerst: soll es animieren?

Die Frage kommt vor der Frage nach der Kurve. Ein Element, das nicht animiert, kann keine
falsche Kurve haben.

| Wie oft sieht ein Besucher es | Entscheidung | Grund |
|---|---|---|
| Bei jeder Eingabe oder per Tastatur (Menü per Tastenkürzel, Suchfeld) | keine Animation | Wer es hundertmal am Tag auslöst, zahlt die Wartezeit hundertmal |
| Bei jedem Hover, jedem Klick in Listen | stark kürzen oder entfernen | Aus einem Effekt wird Rauschen |
| Gelegentlich (Dialog, Akkordeon, Toast, Off-Canvas) | normale Animation | Orientierung lohnt die Zeit |
| Einmal pro Besuch (Heldenauftritt, Zahlen zählen) | darf Eindruck machen | Hier sitzt der eine orchestrierte Moment aus `18-motion-handschrift.md` |

**Jede Animation braucht einen Zweck**, in einem Satz: räumliche Orientierung (woher kommt das
Menü), Zustand (gesendet, Fehler), Rückmeldung (Taste wurde gedrückt), Erklärung (so läuft der
Ablauf) oder ein Sprung, der ohne sie hart wäre. „Sieht gut aus" ist kein Zweck und trägt bei
häufigen Elementen nie.

## 2. Kurve und Dauer

| Situation | Kurve | Grund |
|---|---|---|
| Eintritt und Austritt eines Elements | `ease-out`, besser eine eigene Kurve | Der Start reagiert sofort, der Besucher sieht den ersten Moment am genauesten |
| Bewegung oder Verwandlung auf dem Bildschirm | `ease-in-out` | natürliche Beschleunigung und Abbremsung |
| Hover und Farbwechsel | `ease` | kurz genug, dass es keine Rolle spielt |
| Dauerbewegung (Laufband) | `linear` | jede andere Kurve ruckelt in der Schleife |
| Beliebiges UI-Element | **nie `ease-in`** | beginnt langsam, genau dann, wenn hingesehen wird |

Die Browservorgaben sind schwach. Ein eigener Kurvensatz wirkt sofort besser; hier sind es die
Tokens `--kurve-eintritt`, `--kurve-wechsel` und die Regel aus Abschnitt 8 für den Austritt.

| Element | Dauer | Token |
|---|---|---|
| Tastendruck, Zustandsfarbe, Fokusring | 100 bis 160 ms | `--dauer-sofort` |
| Tooltip, kleines Popover | 125 bis 200 ms | `--dauer-schnell` |
| Dropdown, Select, Menü | 150 bis 250 ms | `--dauer-schnell` |
| Dialog, Off-Canvas, Schublade | 200 bis 400 ms, Austritt kürzer | `--dauer-lang` mit `--dauer-aus-lang` |
| Erklärende und große Flächen, Heldenauftritt | länger, mit Absicht | `--dauer-sequenz` |

**Obergrenze für alles, was ein Besucher bedient: 300 ms.** Ein Dropdown mit 180 ms wirkt
reaktionsfreudiger als eines mit 400 ms, bei gleicher tatsächlicher Ladezeit. Alles darüber
braucht einen Satz Begründung im Code, am einfachsten mit dem Wort „bewusst" im Kommentar, wie
bei den Tokenbefunden in `qa-und-abnahme.md`.

## 3. Fünf Bauregeln für Bedienelemente

1. **Taste ist spürbar.** Jeder Button bekommt `transform: scale(0.97)` bei `:active`, 100 bis
   160 ms. Ohne das fühlt sich der Klick abgeschaltet an. (Stand schon in `09-motion-gsap.md`,
   gilt hier als Prüfpunkt.)
2. **Nie bei `scale(0)` beginnen.** Nichts in der Wirklichkeit verschwindet vollständig. Start
   bei `scale(0.95)` mit `opacity: 0`.
3. **Popover wächst aus dem Auslöser.** `transform-origin` auf die Stelle des Buttons, nicht
   auf die Mitte. Ausnahme: Dialoge in der Bildschirmmitte, die haben keinen Auslöser als
   Ursprung.
4. **Wiederholt auslösbares ist unterbrechbar.** Was ein Besucher schnell hintereinander antippt
   (Toggle, Karussell, Akkordeon), nutzt CSS-`transition`, die von ihrem aktuellen Stand
   umkehrt. `@keyframes` starten immer bei null und ruckeln.
5. **Gestaffelt, aber kurz.** Mehrere Elemente, die zusammen erscheinen, bekommen 30 bis 80 ms
   Versatz. Länger wirkt langsam. Interaktion bleibt währenddessen möglich.

Eintritte ohne JavaScript gehen mit `@starting-style`, der Rückfall ist ein `data-`Attribut, das
nach dem ersten Frame gesetzt wird.

## 4. Was animiert wird und was nicht

| Regel | Grund |
|---|---|
| Nur `transform` und `opacity` | Alles andere zwingt zum Neuberechnen von Layout oder Zeichnen und ruckelt auf schwächeren Geräten |
| Nie `transition: all` | fängt Eigenschaften mit, an die niemand gedacht hat, und animiert bei der nächsten CSS-Änderung Dinge, die stillstehen sollten |
| Keine Animation von `width`, `height`, `margin`, `padding`, `top`, `left` | Layoutarbeit pro Frame. Für Höhenwechsel `grid-template-rows: 0fr` zu `1fr` oder `interpolate-size` |
| CSS-Variable auf einem Elternelement pro Frame ändern vermeiden | die Änderung kostet die Stilberechnung aller Kinder. Besser `transform` direkt am Element setzen |
| `filter: blur()` bis höchstens 20 px | teuer, besonders in Safari. Ein kurzer Blur von 2 px kaschiert überlappende Zustände beim Überblenden |
| Vorhersehbares in CSS, Dynamisches in JS | CSS läuft außerhalb des Hauptthreads, JS-Animation verliert Frames, sobald die Seite beschäftigt ist |

## 5. Zugänglichkeit

- **Reduzierte Bewegung wird gedämpft, nicht abgeschaltet.** Weg fällt Bewegung (Verschiebung,
  Skalierung, Parallaxe), bleiben dürfen Deckkraft und Farbe, die beim Verstehen helfen. Die
  GSAP-Variante steht in `09-motion-gsap.md`, Abschnitt „Reduzierte Bewegung sauber behandeln".
- **Hover nur dort, wo es Hover gibt:** `@media (hover: hover) and (pointer: fine)`. Auf Touch
  löst ein Tipp sonst einen hängenden Hoverzustand aus.
- **Autoplay ab 5 Sekunden hat Pause**, und dekorative Schleifen stoppen bei reduzierter
  Bewegung. Das ist WCAG 2.2.2, die Pflicht steht in `04-barrierefreiheit-bfsg.md`.

## 6. Der Review, in zehn Maßstäben

Wer Motion prüft, geht diese zehn der Reihe nach durch und beanstandet im Zweifel, statt zu
genehmigen. Ein Prüfer, der standardmäßig zustimmt, prüft nicht.

| # | Maßstab | Beanstandet wird |
|---|---|---|
| 1 | Begründet | kein Zweck nennbar |
| 2 | Der Häufigkeit angemessen | Animation an Tastatur- oder Hundertmalaktionen |
| 3 | Reaktionsfreudige Kurve | `ease-in` an UI, schwache Browserkurve |
| 4 | Unter 300 ms | bedienbares Element über 300 ms ohne Begründung |
| 5 | Ursprung und Körperlichkeit | `scale(0)`, Popover aus der Mitte |
| 6 | Unterbrechbar | Keyframes an schnell wiederholten Elementen |
| 7 | Nur GPU-Eigenschaften | Layoutwerte in `transition` oder `animation` |
| 8 | Zugänglich | fehlende Reduktion, Hover ohne Medienabfrage |
| 9 | Asymmetrisch | gleiche Zeit für bewusstes Auslösen und Antworten des Systems |
| 10 | Stimmig | Bewegung passt nicht zur Handschrift aus `18-motion-handschrift.md` |

Asymmetrie heißt: langsam, wo der Besucher entscheidet (gedrückt halten zum Löschen, 2 s linear),
schnell, wo das System antwortet (Loslassen, 200 ms `ease-out`).

**Ausgabeform des Reviews:** eine Tabelle mit den Spalten Vorher, Nachher, Grund, dann ein
Urteil nach Gewicht sortiert, zuletzt eine ausdrückliche Entscheidung: **Blockiert** oder
**Freigegeben**. Ohne Entscheidung ist es ein Gespräch, kein Review.

## 7. Prüfen, nicht nur ansehen

Zwei Wege, die sich ergänzen:

1. **`node scripts/pruefe-motion.mjs`** findet in den Quellen, was sich zählen lässt:
   `transition: all`, `scale(0)`, `ease-in`, Layoutwerte in `transition-property`, Dauern über
   300 ms ohne Token und ohne „bewusst", fehlende Reduzierung, Hover ohne Medienabfrage. Ein
   Fund ist ein Befund, keine Meinung.
2. **Zeitlupe.** Dauer im Browser auf das Zwei- bis Fünffache setzen und ansehen: stimmt der
   Ursprung, laufen zusammengehörige Eigenschaften gleichzeitig an, ruckelt ein Farbwechsel. Für
   Touchgesten ein echtes Gerät, kein Simulator. Am nächsten Tag noch einmal ansehen, frische
   Augen sehen, was beim Bauen verschwimmt.

## 8. Wo dieses Kapitel dem bestehenden Motion-System widerspricht

Beide Stellen sind entschieden, nicht offen gelassen, und beide haben einen Grund.

| Stelle | Bisher | Kowalski | Entscheidung |
|---|---|---|---|
| `--kurve-austritt: cubic-bezier(0.4, 0, 1, 1)` ist eine ease-in-Kurve | der Austritt „blockiert nicht" | Austritt ebenfalls `ease-out`, `ease-in` an UI nie | **Bedienelemente** (Menü, Dropdown, Dialog schließen) bekommen `--kurve-eintritt` auch beim Austritt, weil der Besucher die Antwort sofort sehen will. `--kurve-austritt` bleibt für **dekorative** Austritte, die nichts beantworten (Bild verlässt den Bildschirm beim Scrollen, Hero-Elemente beim Verlassen der Sektion) |
| `--dauer-normal: 0.4s` für Akkordeon und Karte anheben | gilt für alles Mittlere | UI unter 300 ms | **Akkordeon, Menüs, Karten bei Hover** nehmen `--dauer-schnell` (0,2 s). `--dauer-normal` bleibt für Eintritte großer Flächen und Bildzoom, die nichts bedienen. Der Kommentar in `tokens.css` ist entsprechend nachgezogen |

Dass die Prüfung hier zugunsten der Quelle ausfällt, hat denselben Grund wie der Rest dieses
Kapitels: die Austritte und Akkordeons sind die Stellen, an denen Besucher am häufigsten
warten, ohne es zu merken.

## 9. Kurzvokabular für Animationsfeedback

Vage Wünsche („mach es flüssiger") führen zu vagen Ergebnissen. Genaue Wörter sparen Runden.
Die Tabelle ist eine eigene Zusammenstellung gängiger Begriffe, nicht aus einer der Quellen.

| Wort | Gemeint |
|---|---|
| Ease-out | schnell los, sanft ankommen |
| Springen (Spring) | federnd, mit Schwung, behält Geschwindigkeit bei Unterbrechung |
| Stagger | gestaffelter Einsatz einer Gruppe |
| Origin | Ankerpunkt, von dem aus ein Element wächst |
| Clip-Reveal | Enthüllen durch `clip-path: inset()` statt Einblenden |
| Crossfade | Überblenden zweier Zustände, mit kurzem Blur kaschiert |
| Friction | zunehmender Widerstand am Rand statt harter Wand |

Das Vokabular für Seitenfeedback insgesamt steht in `29-pruefdurchgaenge-und-vokabular.md`,
dieses ergänzt es für Bewegung.

## Verwandte Kapitel

- Wie animiert wird, GSAP, ScrollTrigger: `09-motion-gsap.md`
- Handschrift und Tokens je Marke: `18-motion-handschrift.md`, `assets/vorlagen/tokens.css`
- Reduzierte Bewegung als Pflicht: `04-barrierefreiheit-bfsg.md`
- Vokabular und Prüfdurchgänge: `29-pruefdurchgaenge-und-vokabular.md`
- Prüfskript: `scripts/pruefe-motion.mjs`
