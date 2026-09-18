# Visuelle Richtung, Tokens, Typografie

Arbeite wie die Designleitung eines Studios, das für jeden Kunden eine eigene Handschrift
entwickelt. Der Kunde hat Entwürfe abgelehnt, die nach Schablone aussahen, und bezahlt für
eine Haltung: bewusste, begründete Entscheidungen zu Palette, Typografie und Layout, die zu
genau diesem Auftrag gehören.

## Erst den Gegenstand verstehen

Steht im Briefing nicht, worum es geht, klär das zuerst: **ein konkretes Thema, die Zielgruppe
und die primäre Aufgabe der Seite**: als Vorschlag formuliert, nicht als Fragebogen.

Aus der Branche, dem Material, dem Vokabular der Zielgruppe kommen die eigentlichen
Entscheidungen. Eine Seite für einen Dachdecker sieht anders aus als eine für eine
Kinderarztpraxis, und beide anders als eine für einen Biotech-Spin-off. Wer diese Unterschiede
nicht im Entwurf sieht, hat die Schablone gebaut.

## Zwei Durchgänge, nicht einer

**Durchgang 1: Plan.** Ein kompaktes Tokensystem in vier Punkten:

- **Farbe:** 4–6 benannte Hex-Werte mit Rolle. Nicht mehr.
- **Typografie:** die Schriften und ihre Rollen. Eine Familie reicht oft; bei zweien müssen
  sie deutlich unterschiedlich sein.
- **Layout:** das Konzept in einem Satz Prosa plus ASCII-Skizze, mit Aussage zur Ausrichtung
  (links, zentriert, Blocksatz).
- **Prinzipien:** drei Sätze dazu, was diese Seite einzigartig macht.

**Durchgang 2: Prüfung gegen den Brief.** Lies den Plan noch einmal. Liest sich ein Teil
davon wie das, was du für jede beliebige Seite dieser Art produzieren würdest: ersetze ihn
und schreibe dazu, was du geändert hast und warum. Erst danach Code.

Wo der Brief eine Richtung festlegt, gilt der Brief, auch wenn er genau einen der unten
genannten Standards verlangt. Liegt ein Designsystem des Kunden vor, schlägt es beides, und
Durchgang 1 entwirft dann kein neues Tokensystem, sondern übernimmt das vorhandene. Die
vollständige Rangfolge steht in `24-designsystem-vorrang.md`.

## Die Standards, die man erkennt

Generisch wirkende Seiten fallen in wenige Muster. Jedes ist für manche Aufträge richtig; als
Voreinstellung statt als Entscheidung sind sie das Problem:

1. cremefarbener Hintergrund (~`#F4F1EA`), hochkontrastige Serifen-Display, Terrakotta-Akzent
   (~`#D97757`)
2. fast schwarzer Hintergrund mit einem grellen Neon- oder Zinnoberakzent
3. Broadsheet-Layout mit Haarlinien, null Radius, dichten Zeitungsspalten
4. das SaaS-Karten-Set: alles in gleich abgerundeten Karten, ein Radius für alles, überall
   derselbe weiche graue Schatten, Farbverlauf als Deko
5. Schablonen-Chrome: gesperrte VERSALIEN über jeder Überschrift, „A · B · C"-Ketten,
   „WORT — Fragment" mit gesperrtem Gedankenstrich, getöntes Fast-Schwarz (`#0B0B0B`, `#111`)
   statt Schwarz, Monospace für kleine Datenlabels, „→" hinter jedem Link

**Sparsamkeit mit Mut:** Ein Element darf das Merkwürdige sein. Alles drumherum bleibt still
und diszipliniert. Streiche eine Verzierung, die dem Auftrag nicht dient.

## Farbe

### Aufbau einer Palette

- **Eine Markenfarbe**, dazu eine Rampe von hell bis dunkel (5–9 Stufen). Die Rampe entsteht
  nicht durch Aufhellen mit Weiß, sondern durch gezielte Kontrolle von Helligkeit und
  Sättigung: OKLCH ist dafür das bessere Werkzeug als HSL.
- **Ein neutraler Dunkelton** für Text und dunkle Flächen. Kein reines Schwarz, aber auch
  kein getöntes Fast-Schwarz als Manier, wenn getönt, dann erkennbar zur Marke passend.
- **Zwei bis drei Flächenfarben:** Weiß, eine getönte helle Fläche, eine dunkle Sektion.
- **Mindestens ein individueller Verlauf, aus der Markenfarbe abgeleitet**, nicht aus einem
  generischen „Glass/Gradient"-Preset kopiert. Er gehört in den einen Custom-Abschnitt aus
  `18-motion-handschrift.md`, nicht auf jede Karte verteilt: Sparsamkeit mit Mut gilt auch
  hier.
- **Semantik:** Erfolg, Fehler, Warnung: abgeleitet aus derselben Logik, nicht aus Bootstrap.

### Rollen statt Werte

Komponenten greifen nie auf `--farbe-gruen-500` zu, sondern auf `--farbe-akzent`,
`--farbe-text`, `--farbe-flaeche`. Die Rampe ist die Palette, die Rollen sind die Schnittstelle.

### Die Kontrastregel, die jede Markenpalette trifft

Eine helle gesättigte Markenfarbe ist eine **Flächenfarbe**, keine Textfarbe. Daraus folgen
drei Dinge, die als Kommentar in die Tokendatei gehören:

1. Text auf der Markenfläche ist der dunkle Neutralton, nicht Weiß.
2. Für Text auf hellen Flächen braucht die Rampe eine **eigene dunkle Stufe** mit mindestens
   4,5:1. Sie trägt Links, Kicker, Haken, Zahlen.
3. Der **Fokusring** wird je Fläche umgeschaltet: dunkel auf hellem Grund, markenfarbig auf
   dunklem. Ein Fokusring mit 2:1 reißt WCAG 1.4.11.

Details und Beispielwerte: `04-barrierefreiheit-bfsg.md`.

### Dunkelmodus

Nur bauen, wenn er gepflegt wird. Ein halber Dunkelmodus ist schlechter als keiner. Wenn:
über dieselben Rollen-Tokens, nicht über `dark:`-Überschreibungen in jeder Komponente.
Flächen im Dunkelmodus werden nicht invertiert, sondern neu bestimmt: reines Schwarz auf
OLED erzeugt harte Kanten, und Schatten funktionieren dort nicht, dort trennen Flächenhelligkeiten.

## Typografie

Typografie trägt die Persönlichkeit der Seite. Eine Familie reicht; bei zwei müssen sie
klar unterscheidbar sein: nicht zwei Grotesken, die man verwechselt.

- **Bewusst wählen**, nicht die Familie, zu der man ohnehin greift.
- **Zeilenlänge unter 80 Zeichen.** Serifen vertragen etwas mehr und brauchen dann mehr
  Zeilenhöhe als Groteske.
- **Skala mit `clamp()`, kleinste Stufe 14 px.** Eine einzige Kurve von 320 bis 1920 lässt
  Schriften zwischen 768 und 1200 px zu schnell wachsen: dort wird die Heldenüberschrift
  vierzeilig und der Heldenbereich höher als das Fenster. Zwei Stufen (bis 1200 px eine
  Kurve mit Deckel, darüber die großen Grade) lösen das.
- Ist eine Schrift Bildelement (Headline, Signet), wird die Satzform selbst Teil der
  Gestaltung, nicht neutraler Transportweg.

### Die Schriftwahl, in dieser Reihenfolge

1. **Steht eine Schrift im Branding des Kunden, wird sie genutzt.** Auch Inter, Roboto oder
   Open Sans. Ein bestehendes Corporate Design schlägt jede Geschmacksfrage. Woher die
   bestehende Schrift kommt und wie sie ausgelesen wird:
   `20-markenextraktion-bestandsseite.md`.
2. **Ohne Vorgabe sind Inter, Roboto, Open Sans, Poppins, Montserrat und Lato gesperrt.**
   Nicht weil sie schlecht wären, sondern weil sie der Grund sind, warum Seiten
   austauschbar wirken. Sie sind die typografische Entsprechung der Schablonen weiter oben.
3. **Ohne Vorgabe zwei Kandidaten vorschlagen**, jeweils mit einem Satz Begründung, die sich
   auf Branche und Zielgruppe bezieht, nicht auf Geschmack. Beispiel: eine Schrift mit hoher
   x-Höhe und offenen Punzen für einen Handwerksbetrieb mit älterer Zielgruppe.
4. **Höchstens zwei Familien**, eine für Fließtext, eine für Überschriften. Eine dritte nur,
   wenn das Design sie eindeutig verlangt.
5. **Immer selbst hosten** aus `public/fonts/`, WOFF2, nur die genutzten Schnitte,
   `@font-face` mit `font-display: swap` und passendem `size-adjust`, damit der Wechsel
   nicht springt. Nie über ein fremdes CDN: das ist eine Verbindung zu einem Drittserver und
   damit einwilligungspflichtig, siehe `07-recht-dsgvo.md`.

**Drei typografische Voreinstellungen vermeiden:**

- ein einzelnes hervorgehobenes Wort in der Headline (kursiv, fett oder andersfarbig)
- Versalien für Labels
- ein typografisches Label über jedem Inhaltsblock, das nichts hinzufügt

Wenn eine Hervorhebung in Überschriften zum System gehört, dann konsequent und in **einer**
Form: Farbe **oder** Balken **oder** Unterstrich, nie mehrere. Semantisch `<em>` mit
`font-style: normal`, wenn die Betonung stimmt, die Optik aber über Farbe läuft.

**Lizenz prüfen.** Eine kommerzielle Schrift (Moderat, Söhne, GT-Familien …) ist ohne
Lizenz nicht einsetzbar, auch nicht „erstmal für den Entwurf". Freie Alternative wählen
oder Lizenz einholen; der Tausch verschiebt später jede Zeilenlänge.

## Tokensystem

Vollständige, kommentierte Vorlage: `../assets/vorlagen/tokens.css`. Der Schnitt:

```
Farbrampe        → Rollen (akzent, text, flaeche, rahmen, fokus, semantisch)
Typografie       → Familien, Zeilenhöhen, Skala (clamp, zwei Stufen)
Raum             → feste Skala --raum-1 … --raum-32 + fließende Rhythmen
Layout           → Inhaltsbreite, Textbreite, Seitenrand, Kopfhöhe
Form             → Radien, Schatten, Dauer, Kurve
```

**Regel:** Kein Farb- oder Größenwert im Komponentencode ohne Token. Kommt eine Komponente
mit einem eigenen Wert, fehlt entweder ein Token oder die Komponente irrt sich.

**Haltepunkte als Kommentar dokumentieren.** Custom Properties gelten nicht in Media
Queries: die Werte stehen also mehrfach im Code. Ein Kommentarblock in der Tokendatei, der
die Haltepunkte samt Bedeutung nennt, verhindert, dass jede Sektion eigene erfindet.

## Stilrichtungen als Startpunkt

Grobe Orientierung, wenn ein Briefing eine Richtung nennt. Jede Zeile ist ein Ausgangspunkt,
kein Rezept:

| Richtung | Typisch | Passt zu |
|---|---|---|
| **Minimal** | viel Weißraum, wenig Farbe, ruhige Groteske | Beratung, Architektur, Premium |
| **Editorial** | starke Display-Serife, Spalten, Bildunterschriften | Publikationen, Kanzleien, Magazine |
| **Corporate/Enterprise** | klare Raster, gedämpfte Palette, dichte Information | B2B, Industrie, Software |
| **Clean/Contemporary** | weiche Radien, freundliche Groteske, viel Luft | Dienstleistung, Gesundheit, lokale Anbieter |
| **Expressive/Dramatic** | große Typo, hoher Kontrast, ein Signalton | Agenturen, Marken mit Haltung |
| **Refined/Impeccable** | feine Abstufungen, präzise Raster, zurückhaltende Bewegung | Premium-Handwerk, Luxus, Manufaktur |
| **Technical/Mono** | Monospace-Akzente, Raster sichtbar, Daten im Vordergrund | Entwicklerwerkzeuge, Messtechnik |
| **Material/Flat** | klare Flächen, definierte Erhebungen, Systemkomponenten | Anwendungen, Portale, Dashboards |
| **Glass/Gradient** | Transparenz, Verläufe, Tiefe | Produktseiten mit starkem Visual |
| **Retro/Vintage** | zeitgebundene Palette, Textur, historische Schriften | Gastronomie, Handwerk mit Geschichte |

Dieselben zehn Richtungen stehen maschinenlesbar in
`../assets/musterbibliothek/taxonomie.json` unter `stil`, dort ergänzt um vier weitere. Wer
hier etwas ändert, zieht dort nach und umgekehrt: es sind zwei Fassungen derselben Liste,
keine zwei Listen.

**Vor dem Griff zur Richtung:** Was am Gegenstand selbst ist bildwürdig? Ein Dachdecker hat
Materialien, Schichten, Wasser, Gefälle. Ein Labor hat Proben, Messreihen, Maßstäbe. Daraus
entsteht eine Handschrift; aus einer Stilkarte entsteht eine Schablone.

## Selbstkritik beim Bauen

- Screenshots ansehen, wenn die Umgebung es erlaubt. Ein Bild sagt mehr als tausend Token.
- Die Chanel-Regel: vor dem Verlassen des Hauses in den Spiegel sehen und ein Accessoire
  ablegen.
- Auf CSS-Spezifität achten. Klassen wie `.sektion` und `.cta` heben sich gegenseitig auf,
  besonders bei Abständen zwischen Sektionen.
- Qualitätsuntergrenze ohne Ankündigung einhalten: responsiv bis zum Handy, sichtbarer
  Tastaturfokus, reduzierte Bewegung respektiert, Kontraste geprüft, Palette stimmig.
