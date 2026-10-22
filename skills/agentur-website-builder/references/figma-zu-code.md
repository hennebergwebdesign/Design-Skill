# Figma-Entwurf in Astro umsetzen

Liegt ein Figma-Link vor, ist die Datei die Quelle des Designs. Dieses Kapitel ist der Weg
von der Figma-Datei zu Astro-Komponenten mit `tokens.css`: Variablen werden Tokens, Auto
Layout wird Flex oder Grid, Komponenten werden Astro-Komponenten, Bilder werden exportiert
statt durch Platzhalter ersetzt, und die Typografie wird an die fließende Skala angeglichen.

Die Substanz stammt aus den offiziellen Figma-Skills in
[figma/mcp-server-guide](https://github.com/figma/mcp-server-guide), vor allem
`figma-design-to-code`, dem Ablauf `implement-design` und den Abschnitten zu Variablen in
`figma-generate-library`. Das Repository hat keine eigene Lizenzdatei; die Nutzung des
Servers und der Skills steht laut README unter den Figma Developer Terms. Deshalb ist hier
nur der Ablauf beschrieben, kein Text übernommen. Was umgedreht wurde, steht in Abschnitt 10.

## Inhalt

- 1\. Was die Figma-Datei ist
- 2\. Voraussetzungen und Werkzeuge
- 3\. Ablauf
- 4\. Variablen zu `tokens.css`
- 5\. Auto Layout zu Flex und Grid, Komponenten zu Astro
- 6\. Typografie angleichen
- 7\. Bilder und Icons exportieren statt Platzhalter
- 8\. Abgleich und Bewegung
- 9\. Code Connect und die Gegenrichtung, eingeordnet
- 10\. Was bewusst nicht übernommen wurde
- Verwandte Kapitel

## 1. Was die Figma-Datei ist

Zuerst klären, welche Art Eingabe vorliegt. Davon hängt ab, wer bei einem Widerspruch
gewinnt, siehe `../../webdesign-conversion/references/24-designsystem-vorrang.md`.

| Vorliegt | Stufe | Folge |
|---|---|---|
| Bibliothek des Kunden mit Variablen und Komponenten | 1, Kundendesignsystem | `tokens.css` folgt den Figma-Variablen. Abweichung nur mit benanntem Grund |
| Entwurf der Agentur, vom Kunden freigegeben | 3, in diesem Projekt entschieden, ab Freigabe geschützt | `marke.json` wird aus dem Entwurf gefüllt, danach gilt `marke.json` |
| einzelne Screens ohne Variablen, Werte lose gesetzt | Entwurf, kein System | Tokens aus `marke.json`, der Entwurf zeigt nur Verhältnisse |
| Community-Datei, Vorlage eines Dritten | 5, Referenz | nur Aufbau und Komposition, nie Werte. Freigabe nach `designrecherche-ablauf.md` |

Die Stufe und die Datei gehen sofort in `marke.json` unter `herkunft.designsystem`
(`stufe`, `quelle`: „Figma-Bibliothek <Dateiname>", `geprueft_am`).

Nach der Rangfolge der Quellen in `referenzen-und-auswahl.md` ist ein vollständiger
Figma-Entwurf Stufe 1 der Quellen: Referenzseiten werden dann nur noch für Fragen
herangezogen, die der Entwurf offen lässt, typischerweise Zustände, Fehlerfälle und kleine
Geräte.

## 2. Voraussetzungen und Werkzeuge

Der Figma-MCP-Server muss verbunden sein (entfernter Server `https://mcp.figma.com/mcp`).
Laut README des Repositories sind Lesezugriffe begrenzt: mit Starter-Plan oder mit View- und
Collab-Plätzen auf bezahlten Plänen höchstens sechs Werkzeugaufrufe im Monat, mit Dev- oder
Full-Platz ein Minutenlimit. Bei einem kleinen Kontingent die Aufrufe vorher planen und je
Sektion einmal holen, nicht je Element.

| Werkzeug | Liefert | Einsatz |
|---|---|---|
| `get_metadata` | Knotenkarte der Auswahl | große Seiten zuerst kartieren, dann je Sektion abrufen |
| `get_design_context` | Struktur, Layout, Typografie, Farben, Assets, Code-Connect-Hinweise, meist als React mit Tailwind | Hauptwerkzeug. Die Ausgabe ist eine Referenz, kein Code für das Projekt |
| `get_screenshot` | Bild des Knotens | das Sollbild für den Abgleich, nie ein Asset auf der Seite |
| `get_variable_defs` | Variablen und Stile der Auswahl: Farben, Abstände, Typografie | Grundlage der Abgleichstabelle in Abschnitt 4 |
| `get_motion_context` | Animationen mit Keyframes und Kurven | nur bei animierten Knoten, siehe Abschnitt 8 |
| `get_code_connect_map` | Zuordnung Figma-Komponente zu Code | nur lesend, nur wenn der Kunde Code Connect nutzt, siehe Abschnitt 9 |

Ist der Skill `figma-design-to-code` installiert, wird er vor `get_design_context` geladen;
der Server verlangt das selbst. Installation:
`npx --yes skills add figma/mcp-server-guide --skill figma-design-to-code --agent claude-code`.

**Link zerlegen:** `figma.com/design/<fileKey>/<name>?node-id=12-345` ergibt
`fileKey` und `nodeId` `12:345` (Bindestrich wird Doppelpunkt). Bei einem Branch-Link
`figma.com/design/<fileKey>/branch/<branchKey>/…` ist `branchKey` der Schlüssel.

## 3. Ablauf

1. Stufe bestimmen und eintragen, Abschnitt 1.
2. `get_metadata` auf die Seite, Sektionen als Knoten erkennen. Je Sektion
   `get_design_context`, nicht die ganze Seite auf einmal: eine zu große Antwort wird
   abgeschnitten oder als dünn markiert, und dann fehlen genau die Werte, die gebraucht
   werden. Meldet die Antwort einen dünnen Knoten, die sichtbaren Kindknoten gesammelt
   nachladen.
3. `get_screenshot` je Sektion und für die ganze Seite, für jeden Frame, den es gibt
   (meist 1440 und 375 px). Ablage in `pruefung/figma/`.
4. `get_variable_defs`, dann die Abgleichstabelle in Abschnitt 4.
5. Typografie angleichen, Abschnitt 6.
6. Basiskomponenten, dann Sektionen von oben nach unten, wie Phase 4 im Bauablauf.
7. Assets exportieren, Abschnitt 7.
8. Abgleich gegen die Screenshots, Abschnitt 8.

Texte aus der Figma-Datei sind nur dann gelieferte Copy, wenn sie vom Kunden stammen.
Blindtext, „Headline here" und Platzhalterzahlen werden `[[FEHLT: …]]`, siehe
`copy-im-kundenprojekt.md`. Gedankenstriche in Figma-Texten werden beim Übernehmen ersetzt:
die harte Grenze gilt für die Seite, nicht für den Entwurf.

## 4. Variablen zu `tokens.css`

Beispiel einer Abgleichstabelle, die vor dem ersten Token im Chat steht:

| Figma-Variable | Wert | Rolle in `marke.json` | Token |
|---|---|---|---|
| `color/brand/500` | #6acc9a | `rampe.marke-500` | `--farbe-marke-500` |
| `color/bg/default` | #ffffff | `rollen.flaeche` | `--farbe-flaeche` |
| `color/text/brand` | #488b69 | `rollen.marke_text`, **reißt 4,5:1** | `--farbe-marke-text` auf neue Stufe `marke-750` |
| `spacing/md` | 16 | `raum.skala` 16 | `--raum-4` (1rem) |
| `radius/card` | 28 | | `--radius-l` (1.75rem) |
| lose Hexfarbe `#f4f4f4` ohne Variable | | keine | Befund, siehe unten |

| Regel | Grund |
|---|---|
| Die Rollennamen des Plugins bleiben die Schnittstelle der Komponenten, der Figma-Name steht als Kommentar daneben: `--farbe-flaeche: #ffffff; /* Figma: color/bg/default */` | `pruefe-kontrast.mjs` liest die Rollen-Tokens unter diesen Namen; der Kommentar hält die Spur zur Figma-Datei für das Designteam |
| Hat der Designer in Figma eine Code-Syntax gesetzt (`var(--…)`), bestimmt sie die Rampe; die Rollen verweisen darauf | dann spricht sein Team diese Namen, und ein zweiter Name für denselben Wert wäre eine Übersetzungsschicht ohne Nutzen |
| Abstände und Radien von px in rem (Wert durch 16) | Raumtokens stehen in rem, damit sie mit der Schriftgröße der Person mitgehen |
| Lose Werte ohne Variable der nächsten Rolle zuordnen; passt keine, als Frage an den Kunden, nicht still einen Token anlegen | ein loser Wert ist meist ein Versehen in der Datei. Wird er ein Token, wird das Versehen Teil des Systems |
| Eine Farbe, die als Text den Kontrast reißt, bleibt im System, wechselt aber die Rolle: Fläche statt Text, dazu eine dunklere Stufe für Text | harte Grenze Kontrast. Der Konflikt wird im Format aus `24-designsystem-vorrang.md` benannt, auch bei Stufe 1 |
| Modi Hell und Dunkel aus Figma nur übernehmen, wenn der Dunkelmodus gebaut und gepflegt wird | ein halber Dunkelmodus ist schlechter als keiner, `../../webdesign-conversion/references/10-visuelle-richtung.md` |

Danach `node scripts/pruefe-kontrast.mjs` und `node scripts/pruefe-tokens.mjs`.

## 5. Auto Layout zu Flex und Grid, Komponenten zu Astro

Die Ausgabe von `get_design_context` ist meist absolut positioniert oder in Tailwind-Klassen
geschrieben. Übersetzt wird die Absicht, nicht die Klasse:

| Figma | CSS im Projekt | Grund |
|---|---|---|
| Auto Layout horizontal, Abstand 24 | `display: flex; gap: var(--raum-6)` | Abstand zwischen Elementen ist `gap`, kein Rand am Kind |
| Auto Layout vertikal | `display: flex; flex-direction: column; gap: …` oder Fluss mit Abstand nach `15-spacing-rhythmus.md` | Textfluss braucht Abstände, die zur Schriftgröße passen |
| Auto Layout mit Umbruch, gleich breite Karten | `grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr))` | ein Raster ohne Haltepunkt, Stufe 1 in `16-responsive-container.md` |
| „Fill container" | `flex: 1` oder `width: 100%` im Raster | |
| „Hug contents" | Breite aus dem Inhalt, keine feste Breite | |
| feste Breite eines Containers | `max-width` mit Token (`--breite-inhalt`, `--breite-text`) | feste Breiten brechen zwischen den Frames |
| absolute Position | nur für echte Überlagerung (Dekor, Bild hinter Text), sonst Fluss | absolute Layouts brechen bei längerem deutschem Text und beim Zoomen |
| Constraints links und rechts, „Scale" | Container Query auf die Komponente | Komponenten reagieren auf ihren Container, nicht auf das Fenster |
| Frames 1440 und 375 | zwei Stützpunkte; dazwischen fließend, Haltepunkte aus `marke.json` | Figma-Framebreiten sind keine Haltepunkte, sondern Messpunkte |

| Figma-Komponente | Astro | Grund |
|---|---|---|
| Komponentenset mit Varianten (Größe, Art) | eine `.astro`-Datei in `src/components/ui/` mit Prop: `variante: 'primaer' \| 'sekundaer'` | eine Komponente je Baustein, nicht je Variante |
| Variante für Zustände (Hover, Pressed, Focus, Disabled) | `:hover`, `:active`, `:focus-visible`, `[disabled]` im Komponentenstil | Zustände sind CSS, kein Prop |
| Text-Eigenschaft | Prop oder `<slot />` | |
| Boolean-Eigenschaft (Icon zeigen) | optionales Prop | |
| Instance Swap für Icons | Prop mit Iconnamen für die `Icon`-Komponente | |
| Slot | `<slot />` oder benannter Slot | |
| interaktive Teile (Akkordeon, Menü) | `details`/`summary` oder ein kleines Skript im Bauteil, keine React-Insel | Astro liefert ohne JavaScript aus; eine Insel nur für eine Klappe kostet Ladezeit |

Vor jeder neuen Komponente in `src/components/` nachsehen, ob es sie schon gibt. Wiederverwenden
und erweitern geht vor neu bauen, das verlangt auch der Figma-Skill selbst.

## 6. Typografie angleichen

Figma setzt Schrift in px auf festen Frames. Das Projekt setzt sie fließend in rem nach
`../../webdesign-conversion/references/55-typografie-system.md`. Die Figma-Größen sind deshalb
Messpunkte für die Skala, keine Werte zum Abschreiben:

```bash
# Figma: Fließtext 16 px auf 375, 18 px auf 1440; h1 34 px auf 375, 72 px auf 1440
# Verhältnis aus h1 ÷ Fließtext, Stufe 4: (34/16)^(1/4) ≈ 1.21 und (72/18)^(1/4) ≈ 1.41
node scripts/typoskala.mjs --fenster 360,1200,1440 --basis 16,17,18 --verhaeltnis 1.2,1.333,1.414 --vorschau typo-vorschau.html
```

Die mittlere Stütze bei 1200 px kommt aus dem Kapitel 55, nicht aus Figma: dort gibt es
keinen Frame, und ohne sie wird die Heldenzeile zwischen 768 und 1200 px vierzeilig.

| Figma | Projekt | Grund |
|---|---|---|
| Schriftgröße px | Stufe der Skala in rem | zoomfest, harte Grenze |
| Zeilenhöhe in % (150 %) | ohne Einheit (1.5) | wächst mit der Schrift |
| Zeilenhöhe in px (24 bei 16) | ohne Einheit (24 ÷ 16 = 1.5) | ebenso |
| Laufweite in % (`-2%`) | em (`-0.02em`) | Figma rechnet Prozent der Schriftgröße, em ist dasselbe |
| Textstil unter 14 px (Labels 12 px) | auf 14 px anheben, Konflikt benennen | harte Grenze, auch gegen Stufe 1 |
| Familie aus Google Fonts | WOFF2 mit Lizenz nach `public/fonts/`, Ersatzschrift messen | Schriften immer selbst hosten |

Die gesperrten Standardschriften (Inter, Roboto und andere) sind nur ohne Vorgabe gesperrt.
Steht Inter in der Bibliothek des Kunden, ist sie Vorgabe und wird verwendet.

Generierter Code aus `get_design_context` kann einen Google-Fonts-Link oder eine Tailwind-
Schriftklasse enthalten. Beides kommt nicht ins Projekt.

## 7. Bilder und Icons exportieren statt Platzhalter

| Regel | Grund |
|---|---|
| Jedes sichtbare Bild und Icon aus der Antwort von `get_design_context` an genau der Stelle des Entwurfs einsetzen, heruntergeladen nach Anweisung der Antwort | der Figma-Skill verlangt das ebenso; ein selbst gesuchtes Ersatzbild ist eine stille Umgestaltung |
| Rasterbilder nach `src/assets/` und über `<Image>` von Astro ausliefern, Vektoren als SVG mit SVGO | Astro erzeugt AVIF und WebP mit Maßen; die Größengrenzen aus dem Regelwerk gelten |
| `width` und `height` exportierter SVGs nicht überschreiben | sonst verzerrt das Icon in einem Rahmen mit anderer Form |
| Keine Figma-Adresse bleibt im Code: `grep -rn "figma.com" src/ dist/` ohne Treffer | temporäre Asset-Adressen laufen ab, und jeder Abruf ist eine Verbindung zu einem Drittserver |
| Der Screenshot aus `get_screenshot` ist nie ein Asset | er ist das Sollbild; als Bild eingebaut wird er unscharf und nicht barrierefrei |
| Jedes Bild mit Herkunft in `public/images/BILDER.md`: „aus Figma-Datei <Name>", Rechteinhaber, Freigabe | Bilder in einer Figma-Datei sind nicht automatisch lizenziert. Stockfotos in Entwürfen sind oft Vorschaubilder mit Wasserzeichen oder ohne gekaufte Lizenz |
| Ist im Entwurf nur eine graue Fläche oder ein Beispielfoto, bleibt es ein lokaler SVG-Platzhalter mit `[[FEHLT: Motiv, Format, Maße]]` | siehe `intake-und-entscheidungen.md` unter „Bilder"; ein Beispielfoto an Stelle eines Projektfotos ist ein Beleg, den es nicht gibt |
| Icons aus der Figma-Datei nur übernehmen, wenn die Datei Stufe 1 oder 3 ist; sonst eigenes Set nach `../../webdesign-conversion/references/17-icons-eigenes-system.md` | ein Icon-Set aus einer Community-Vorlage ist Stufe 5 |

## 8. Abgleich und Bewegung

Nach dem Bau jeder Sektion:

```bash
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder --aus pruefung/figma/ist
```

`1440-laptop.png` neben den Figma-Screenshot der Sektion legen, `375-handy.png` neben den
Mobil-Frame. Verglichen wird auf Proportion, Abstände, Schriftverhältnis und Anker, nicht auf
Pixelgleichheit, mit demselben Maßstab wie in `qa-und-abnahme.md` Schritt 3. Jede bewusste
Abweichung wird in einem Satz begründet. Vor der Abnahme folgt das Review nach
`design-review.md`.

Bewegung aus Figma: `get_motion_context` liefert Keyframes, Kurven und Dauern, dazu Beispiele
für CSS und motion.dev. Übernommen werden Dauern und Kurven, übertragen auf die Motion-Tokens
in `marke.json`; umgesetzt wird mit GSAP nach
`../../webdesign-conversion/references/09-motion-gsap.md` und `18-motion-handschrift.md`, mit
gestufter reduzierter Bewegung.

## 9. Code Connect und die Gegenrichtung, eingeordnet

| Thema | Was es ist | Hier |
|---|---|---|
| Code Connect | ordnet veröffentlichten Figma-Komponenten Code-Schnipsel zu (`.figma.ts`-Vorlagen); braucht Organization- oder Enterprise-Plan und eine veröffentlichte Bibliothek | nur lesend nutzen, wenn der Kunde es schon eingerichtet hat: `get_code_connect_map` zeigt, welche Komponente im Code gemeint ist. Selbst keine Zuordnungen anlegen. Die Skills arbeiten mit parserlosen Vorlagen, deren Schnipsel reiner Text sind; als Sprache für die Anzeige gibt es unter anderem `html`, Astro wird nicht genannt. Ob Astro-Schnipsel brauchbar angezeigt werden, ist nicht getestet |
| `figma-generate-design`, `figma-generate-library`, `use_figma` | schreiben vom Code oder von einer Beschreibung zurück in Figma | nicht Teil des Bauablaufs. Nur auf ausdrücklichen Auftrag, etwa wenn der Kunde seine Bibliothek in Figma gepflegt haben will; dann vorher `figma-use` laden und den Schreibzugriff auf seine Datei freigeben lassen |

## 10. Was bewusst nicht übernommen wurde

| Figma sagt | Hier gilt | Grund |
|---|---|---|
| pixelgenaue Übereinstimmung mit dem Entwurf | Proportion, Abstände, Schriftverhältnis; dazwischen fließend | zwischen zwei Frames gibt es keinen Entwurf, und eine fließende Skala trifft die Frames nur an ihren Stützpunkten |
| fehlende Bilder mit `generate_image` erzeugen (Hinweis auf KI-Credits) | lokaler SVG-Platzhalter `[[FEHLT: …]]` | ein generiertes Bild ist nie Beleg, `../../webdesign-conversion/references/28-ki-bildentwuerfe.md` Abschnitt 6 |
| keine neuen Icon-Pakete, alle Assets aus der Figma-Antwort | gilt bei Stufe 1 und 3; sonst eigenes Set und Systemicons aus der Bibliothek | Kapitel 17 |
| React und Tailwind als Ausgabe | Astro-Komponenten mit CSS Custom Properties; Tailwind nur, wenn schon im Projekt | Agenturvorgabe Styling |
| Bewegung mit motion.dev | GSAP | Agenturvorgabe Animation |
| bei Widerspruch Designsystem-Token vor Figma-Wert, dann „minimal anpassen" | die Stufe nach `24-designsystem-vorrang.md` entscheidet, der Konflikt wird benannt | „minimal anpassen" ist eine stille Entscheidung; genau die soll es nicht geben |
| Schriftlinks aus dem generierten Code | selbst hosten | harte Grenze |

## Verwandte Kapitel

- `referenzen-und-auswahl.md`: vollständiges Design als Stufe 1 der Quellen
- `design-review.md`: Review vor der Abnahme, mit Vorher-nachher
- `qa-und-abnahme.md`: Abgleich mit dem Entwurf, Abschlussbericht
- `copy-im-kundenprojekt.md`: was aus Figma-Texten übernommen wird
- `../../webdesign-conversion/references/24-designsystem-vorrang.md`: Stufen und Konfliktformat
- `../../webdesign-conversion/references/55-typografie-system.md`: Skala, rem, Ersatzschrift
- `../../webdesign-conversion/references/16-responsive-container.md`: Raster ohne Haltepunkt, Container Queries
- `../../webdesign-conversion/references/17-icons-eigenes-system.md`: Icons, wenn die Datei keine liefert
- `../../webdesign-conversion/references/57-design-md.md`: falls der Kunde zusätzlich ein `DESIGN.md` will
