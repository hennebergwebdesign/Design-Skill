# Marke und CI aus einer bestehenden Seite ziehen

Bei einem Relaunch existiert fast immer schon etwas: eine alte Website, ein Print-Auftritt,
zumindest ein Logo und eine Visitenkarte. Das wird nicht ignoriert und nicht blind kopiert,
sondern zuerst ausgelesen, dann geprüft, dann bewusst fortgeschrieben. Das ist Teil von
Schritt 1 (Strategie) im Fahrplan, `00-fahrplan.md`, bevor `10-visuelle-richtung.md` einen
neuen Plan entwirft.

**Voraussetzung:** Es handelt sich um die eigene Marke des Kunden, oder er hat ausdrücklich
zugestimmt. Eine fremde Marke (Wettbewerber, Inspirationsseite) wird nie auf Logo- oder
Asset-Ebene ausgelesen, siehe „Rechtlich" unten.

Was hier ausgelesen wird, steht danach auf Stufe 2 der Rangfolge in
`24-designsystem-vorrang.md` und wird von keiner externen Referenz überschrieben.

## Was ausgelesen wird

| Merkmal | Woher | Werkzeug |
|---|---|---|
| **Logo** | `<link rel="icon">`/`apple-touch-icon`, Header-`<img>` oder Inline-`<svg>` mit Klassenname/`alt` wie „logo", `og:image` | Seitenquelltext lesen (WebFetch, `curl`, Browser-DevTools) |
| **Primärfarbe(n)** | `meta[name=theme-color]`, CSS-Custom-Properties (`--brand`, `--primary` o. ä.), computed Style von Header, primärem Button, Links | Quelltext/CSS lesen; wenn nur ein Bild vorliegt, dominante Farbe aus dem Logo-SVG/PNG ablesen |
| **Typografie** | `font-family`-Deklarationen, `@font-face`, eingebundene Google-Fonts-/Adobe-Fonts-Links | `<link>`- und `<style>`-Tags im Quelltext |
| **Formsprache** | Radien an Buttons/Karten, Rahmenstärken, Foto- oder Illustrationsstil, Icon-Stil (Linie/Fläche) | Screenshot ansehen, computed Styles zentraler Komponenten |
| **Tonalität** | vorhandene Headlines, Anrede (Sie/du), wiederkehrende Formulierungen | vorhandene Texte lesen, nicht übernehmen, nur einordnen |

**Technischer Zugriff:** Erste Wahl ist WebFetch/`curl` auf die bestehende Seite und direktes
Lesen von HTML, CSS und Meta-Tags. Steht kein Netzzugriff zur Verfügung oder liefert die
Seite serverseitig gerendertes, generisches Markup (Baukasten wie Wix, Squarespace,
Framer), reicht ein Screenshot: Farben und Formen lassen sich auch daraus ablesen, nur die
exakten Hex-Werte dann per Augenmaß statt Stylesheet.

## Wohin es geht

Ergebnis in `marke-brief.md` Abschnitt 7 (Unterabschnitt „Bestehende Marke") und in
`marke.json` unter `herkunft.bestehende_marke`: Quelle (URL oder „nur Print/Logo-Datei"),
Datum der Prüfung, und je Feld ein Vermerk **übernommen** oder **bewusst geändert, weil …**.
Diese Begründungsspalte ist keine Formalie: Sie ist der Unterschied zwischen einer
Kontinuitätsentscheidung und einer vergessenen Prüfung.

## Auslesen ist der Ausgangspunkt, nicht das Ergebnis

Dieselbe Prüfung wie in `10-visuelle-richtung.md` gilt auch hier: eine 1:1-Übernahme der
alten Palette und Typografie ist keine Weiterentwicklung, sondern eine Altlast mit neuem
Anstrich. Konkret zu prüfen:

- **Kontrast.** Eine alte Markenfarbe, die als Text auf Weiß unter 4,5:1 liegt, bleibt eine
  Flächenfarbe (siehe die Kontrastregel in `10-visuelle-richtung.md`), sie wird nicht als
  Textfarbe weitergeführt, nur weil sie „schon immer" so war.
- **Lizenz.** Eine alte Schrift ohne geklärte Weblizenz wird nicht unverändert übernommen,
  siehe die Lizenzpflicht in `10-visuelle-richtung.md`.
- **Icon-Stil.** Ein altes Icon-Set aus fremder Bibliothek ohne einheitliche Strichstärke ist
  ein Befund, kein Bestandsschutz, siehe `17-icons-eigenes-system.md`.
- **Wo die alte Seite selbst schablonenhaft war**, wird das nicht fortgeschrieben. Auslesen
  heißt Wiedererkennbarkeit sichern (Farbfamilie, Formensprache, Ton), nicht jeden
  technischen Mangel konservieren.

Was übernommen bleibt, ist eine bewusste Entscheidung mit Begründung im Markenbrief; was
geändert wird, ebenso. Was nicht dokumentiert ist, dreht die nächste Sitzung zurück.

## Rechtlich

- Das Logo und die Farben der **eigenen** Marke des Kunden zu übernehmen ist unproblematisch,
  es ist seine Marke.
- Eine **fremde** Marke (Wettbewerbsanalyse, Inspirationsseite aus `22-premium-designquellen.md`)
  liefert nur Stil-Inspiration: Farbstimmung, Layout-Idee, Motion-Prinzip. Ihr Logo, ihre
  Wortmarke, ihre Produktfotos werden nie kopiert oder in einem eigenen Projekt
  weiterverwendet.
- Liegt für ein übernommenes Logo oder Bildmaterial kein geklärtes Nutzungsrecht vor, steht
  in `marke-brief.md` Abschnitt 11 ein offener Punkt, kein stillschweigendes Ja.
