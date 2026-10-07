# Referenzgrammatik und Gap Audit

Zwei zusammengehörige Verfahren: Wie man **Referenzen so liefert, dass das Modell Gestaltung
nachvollziehen kann** (Abschnitt 1 und 2), und wie man bei „es fehlt etwas, ich kann nicht sagen
was" **misst statt rät** (Abschnitt 3). Beides sitzt zwischen `22-premium-designquellen.md`
(wo gesucht wird), `24-designsystem-vorrang.md` (was eine Referenz darf) und
`29-pruefdurchgaenge-und-vokabular.md` (wie geprüft wird).

Quelle: Erweiterungspaket mit Videoauswertungen. Der Kernsatz daraus: Der Prompt ist etwa zehn
Prozent des Ergebnisses, Regeln, Referenzen und Prüfschleife die übrigen neunzig. Das ist eine
Erfahrungsaussage, kein Messwert.

## 1. Warum Referenzen, nicht Adjektive

Ein Modell kann gute Gestaltung schlecht benennen und baut deshalb generisch. „Modern, clean,
hochwertig" trägt keine Information. Ein Beispiel trägt sie.

| Eingabe | Wirkung | Grund |
|---|---|---|
| Adjektive | Mittelmaß | jedes Modell deutet „hochwertig" gleich, nämlich als Durchschnitt |
| **eine** Referenz | Kopie dieser einen | Die Eigenheiten der Quelle werden als Regel gelesen |
| **drei bis fünf** Referenzen je Zielsektion | Muster | Was alle teilen, ist Grammatik, was einzeln auftaucht, ist Zufall |

## 2. Ablauf: Kollage, Auslesen, Grammatiktabelle

1. **Kollage** je Zielsektion: drei bis fünf freigegebene Referenzen (Screenshot oder Link).
   Entdecken ist nicht erfassen: Tor 1 aus `designrecherche-ablauf.md` gilt, erst vorlegen,
   dann abrufen.
2. **Vor dem Bauen auslesen:** Typoskala, Abstände, Raster, Radien, Farbtokens, Schatten,
   Bewegung. Das Ergebnis ist eine Tabelle im Markenbrief (`scripts/design-scan.mjs`,
   `scripts/design-dna.mjs`), jeder Wert mit Beleg.
3. **Übernommen wird die Grammatik**: Layout, Komposition, Rhythmus, Schnittlänge, Texteintritt.
   Nie Inhalt, Logo, Figuren oder Markenfarben der Referenz.

| Spalte der Grammatiktabelle | Beispiel |
|---|---|
| Merkmal | Headline Buchstabenabstand |
| Wert je Referenz | A: -0,02 em, B: -0,03 em, C: -0,02 em |
| Gemeinsamer Nenner | enger als Standard, etwa -0,02 em |
| Beleg | beobachtet (Computed Style), Quelle und Datum |
| Wirkt in der Marke? | ja, Display Schrift bleibt die des Kunden |

Zusätzliche Quellen für **Flows und Bewegung** stehen als ungeprüfte Kandidaten in
`22-premium-designquellen.md`.

## 3. Gap Audit: Vergleich ohne Schonung

Auslöser: Der Kunde sagt „es fehlt etwas" oder „es wirkt billiger als die anderen", ohne es zu
benennen. Rate nicht, messe.

**Eingabe:** die Kundenseite (Entwurf oder live) plus eine bis zwei **freigegebene** Referenzen,
je Screenshot und Computed Styles. Auf einer fremden Seite nur nach Freigabe (Tor 1).

**Messpunkte:**

| Punkt | Warum er verrät, was fehlt |
|---|---|
| Buchstabenabstand der Headlines | enge Display Schrift wirkt entschieden, Standardabstand wirkt Vorlage |
| Zeilenhöhe | zu offen wirkt unfertig, zu eng unlesbar |
| Gewichte der Display Schrift | ein Gewicht fehlt oft, wenn alles gleich laut ist |
| Eckenradien | gemischte Radien wirken zufällig |
| Schattenleiter (Elevation) | ein Schatten für alles, oder drei ungeordnete |
| Randstärken und Randfarben | feine, getönte Ränder statt hartem Schwarz |
| Weißraum zwischen Sektionen | meist der größte Unterschied zu „hochwertig" |
| Akzentfrequenz | wie oft die Akzentfarbe vorkommt, zu oft verliert sie die Wirkung |
| Konkurrenz zwischen Heldenart und Produkt | zwei Dinge fordern zugleich den ersten Blick |

**Ausgabe:** eine schlanke HTML Übersicht mit den Werten Seite an Seite, den **drei größten
Lücken oben** und je Lücke **einer konkreten Tokenänderung**. Hexwerte kopierbar. Nicht
übernommen wird, was die Marke verletzt: Farbe, Schrift und Logo bleiben Kundensache
(`24-designsystem-vorrang.md`). Nach der Änderung wird derselbe Vergleich wiederholt, sonst
bleibt es eine Vermutung.

Der Gap Audit ist auch als **kleines Einzelangebot vor einem Relaunch** tauglich
(`27-redesign-bestand.md`). Preise gehören ins Angebot.

**Status:** Ein Skript `scripts/design-gap-audit.mjs` neben `design-scan.mjs` ist hier **nicht
gebaut**. Bis dahin liefern `brand-extraktion.mjs` (eigene Seite) und `design-scan.mjs`
(freigegebene fremde Seite) die Rohwerte, die Gegenüberstellung entsteht von Hand.

## 4. Grenzen

* Ein Gap Audit zeigt, **was sich unterscheidet**, nicht, was besser ist. Der Unterschied zu
  einer Referenz ist kein Fehler, wenn die Marke ihn trägt.
* Drei Lücken schließen, nicht dreißig. Mehr ändert die Marke, nicht die Wirkung.
* Zwei Referenzen sind ein dünner Vergleich. Je mehr einzelne Werte voneinander abweichen,
  desto weniger sagt der Mittelwert.
* Ergebnisse der Messung sind Beobachtungen einer Momentaufnahme: Konfidenzmodell aus
  `25-designmuster-bibliothek.md` anwenden.

## Verwandte Kapitel

`22-premium-designquellen.md`, `24-designsystem-vorrang.md`, `25-designmuster-bibliothek.md`,
`26-geschmack-und-ki-tells.md`, `27-redesign-bestand.md`, `29-pruefdurchgaenge-und-vokabular.md`,
`40-polierschleife-mit-kritiker.md`, `41-motion-als-funktion-der-zeit.md`.
