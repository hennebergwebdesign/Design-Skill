# KI-Bildentwürfe als Vorlage

Ein Bildmodell kann in Minuten zeigen, wie eine Sektion aussehen könnte. Das ist nützlich, um
eine Richtung mit dem Kunden abzustimmen, bevor Code entsteht, oder um einen Tokenplan gegen
ein Bild statt gegen eine Beschreibung zu prüfen. Es ist gefährlich, sobald das Bild mehr
wird als eine Vorlage: dann landen erfundene Kundenstimmen, Preise und Logos auf einer echten
Seite.

Die Substanz stammt aus `imagegen-frontend-web`, `image-to-code` und `brandkit` von
[taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). Übernommen sind der Ablauf und
die Disziplin, nicht die Pakete mit Vertrauensleiste und Kennzahlenstreifen, die ein
Bildmodell zum Erfinden einladen.

## 1. Stellung im Ablauf

| Frage | Antwort |
|---|---|
| Ersetzt ein generierter Entwurf die Referenzrecherche? | Nein. Die harte Grenze zur Recherche auf einer Premium-Designquelle bleibt. Der Entwurf kommt danach, als Verdichtung dessen, was die Recherche ergeben hat |
| Welche Stufe in `24-designsystem-vorrang.md`? | Stufe 5, wie jede externe Referenz. Er beeinflusst Aufbau, Komposition, Rhythmus, nie Farbe, Schrift, Logo, Form |
| Braucht er eine Freigabe nach `../../agentur-website-builder/references/designrecherche-ablauf.md`? | Keine erste Freigabe, es wird keine fremde Seite abgerufen. Aber der Entwurf wird dem Kunden vorgelegt, bevor danach gebaut wird |
| Darf daraus ein Muster in die Musterbibliothek? | Nein. Ein generiertes Bild belegt kein Muster, das es in der Welt gibt. Die Bibliothek wächst nur aus beobachteten Referenzen über Tor 2, siehe `25-designmuster-bibliothek.md` |
| Welches Werkzeug? | Jedes Bildwerkzeug der Umgebung. Fehlt eines, entfällt dieses Kapitel, und es wird nicht mit gezeichneten SVG-Attrappen ersetzt |

## 2. Vor dem ersten Bild: die Sperren in den Auftrag

Bildmodelle driften. Was nicht im Auftrag steht, erfinden sie neu, und jedes Bild erfindet
anders. Deshalb gehen die Sperren aus `marke.json` vor dem ersten Bild in jeden Auftrag, als
feste Liste:

| Sperre | Aus | Wird im Auftrag genannt als |
|---|---|---|
| Palette | `farbe.rollen` | Hexwerte mit Rolle, „keine weiteren Farben" |
| Schrift | `typografie` | Charakter der Schrift (geometrische Groteske, Antiqua mit hohem Kontrast), Größenverhältnis Überschrift zu Text |
| Form | Radien, Schatten | „alle Ecken 4 px", „keine Schlagschatten" |
| Bildsprache | Markenbrief | Motiv, Licht, Ausschnitt, Farbbehandlung |
| Lesart und Regler | `gestaltung` | der Satz aus `26-geschmack-und-ki-tells.md`, die drei Werte |
| Tonalität | `sprache` | für die sichtbaren Textzeilen im Bild |

Liegt ein Kundendesignsystem vor (Stufe 1), wird es als Tokenliste mitgegeben. Weicht ein
Bild davon ab, gilt die Tokenliste, nicht das Bild.

## 3. Der Auftrag an das Bildmodell

**Ein Bild je Sektion, quer.** Nie mehrere Sektionen in einem Bild, nie die ganze Seite als
langes Hochformat: in einem gestauchten Gesamtbild sind Abstände und Schriftgrade nicht mehr
ablesbar, und genau die braucht die Umsetzung. Die Anzahl wird vorher genannt („acht Bilder,
eines je Sektion") und jedes Bild benannt („Sektion 3 von 8: Ablauf").

| Format | Wofür |
|---|---|
| 16:9 | Held, Standardsektion |
| 16:10 | dichte Inhaltssektionen, Karten, Formulare |
| 21:9 | breite Heldenbilder, Vollbildsektionen |

**Aufbau jedes Auftrags,** in dieser Reihenfolge:

```
Sektion ‹n› von ‹N›: ‹Name› · Aufgabe der Sektion: ‹Aufmerksamkeit | Beweis | Erklärung | Abschluss›
Unternehmen und Zielgruppe: ‹ein Satz aus dem Markenbrief›
Lesart: ‹der Satz aus 26›  ·  Regler: Varianz ‹v›, Bewegung ‹b›, Dichte ‹d›
Komposition: ‹Anker, zum Beispiel Text unten links über Vollbild› · Hintergrund: ‹Modus›
Palette: ‹Hexwerte mit Rolle›, keine weiteren Farben
Schrift: ‹Charakter›, Überschrift ‹Anteil› der Bildbreite, höchstens zwei Zeilen
Form: ‹Radien, Schatten, Linien›
Handlungsaufforderung: ‹Form, eine primäre›
Text im Bild: nur Überschrift, Unterzeile und Knopftext, groß und lesbar. Keine Namen,
Zitate, Logos, Preise, Zahlen, Bewertungssterne. Wo sie hingehören: neutrale graue Fläche.
Nicht: ‹die Tells aus 26, die für diesen Entwurf naheliegen›
```

Die Zeile zu Text im Bild ist der wichtigste Teil. Ohne sie füllt das Modell jede freie Fläche
mit glaubwürdig aussehenden Kundenstimmen, Logos und Kennzahlen, und diese Inhalte haben
danach die Tendenz, in den Code zu wandern.

**Vielfalt über die Serie, geprüft vor der Abgabe:**

| Regel | Maß |
|---|---|
| Kompositionsanker | derselbe Anker höchstens zwei Sektionen hintereinander, mindestens drei verschiedene je Seite |
| Hintergrundmodus | derselbe Modus (einfarbig, Bild vollflächig, Duoton, Verlauf aus der Palette) höchstens drei Sektionen hintereinander |
| Heldengröße | eine Entscheidung für die ganze Seite: groß, mittel oder sehr klein und ruhig |
| Erzählfaden | ein Motiv, das sich durch die Seite zieht (das Werkstück, der Weg, das Werkzeug), damit acht Bilder eine Seite ergeben und nicht acht Seiten |
| Zweiter Blick | genau ein Detail je Seite, das beim zweiten Hinsehen auffällt und der Marke dient |
| Handlungsaufforderung | eine unverwechselbare primäre je Bildschirmhöhe, sekundäre sehen sekundär aus |
| Kontinuität | Palette, Schriftcharakter, Radiussprache, Bildbehandlung und Tonalität sind in allen Bildern gleich |

Die Vielfaltsregeln entfallen, wenn die Lesart ausdrücklich Zurückhaltung verlangt. Dann ist
Zurückhaltung die Gestaltung.

**Neu erzeugen statt ausschneiden.** Ist ein Detail zu klein zum Ablesen, wird eine neue
Detailansicht derselben Sektion erzeugt, nie ein Ausschnitt aus einem älteren Bild
vergrößert. Ein Ausschnitt zerstört die Abstände und das Größenverhältnis der Schriften, die
er klären sollte. Die neue Ansicht behält Palette, Schrift, Form und Bildbehandlung und macht
nur Text und Abstände größer: sie ist kein neuer Entwurf.

**Deutsche Texte im Bild:** Bildmodelle setzen Umlaute und lange Komposita unzuverlässig. Im
Bild zählt, wie viel Platz eine Zeile braucht, nicht die Rechtschreibung. Der echte Text kommt
aus dem Markenbrief, nie aus dem Bild.

## 4. Vom Bild zum Code: die Auswertung

Zwischen Bild und Code steht eine schriftliche Auswertung je Sektion. Ohne sie baut das Modell
ab der dritten Sektion aus dem Gedächtnis, und die Seite wird wieder zur Schablone.

Jeder Wert bekommt dieselbe Belegmarkierung wie in `25-designmuster-bibliothek.md`:
**beobachtet** (im Bild abgelesen), **abgeleitet** (aus dem Bild begründet geschlossen) oder
**unbekannt**. Farbwerte und Schriftgrößen aus einem Bild sind höchstens abgeleitet, weil das
Modell sie nur näherungsweise rendert. Deshalb kommen sie **nie** aus dem Bild in die Tokens:
die Tokens kommen aus `marke.json`, das Bild zeigt nur, wie sie zueinander stehen.

| Bereich | Was ausgewertet wird |
|---|---|
| Komposition | Anker, Spaltenverhältnis, Brennpunkt, Weißraumverteilung |
| Typografie | Zeilenzahl der Überschrift, Größenverhältnis Überschrift zu Text, Gewichtskontrast, Umbruch |
| Abstände | Überschrift zu Text, Text zu Knopf, zwischen Karten, oben und unten in der Sektion, übersetzt in die Stufen der Raumskala |
| Bauteile | Knopfform und Rangfolge, Karten ja oder nein, Linien, Felder |
| Fläche | welche Flächenrolle, Bild oder Farbe, Überlagerung für Lesbarkeit |
| Offen | was im Bild nicht zu erkennen ist. Das wird nicht geraten, sondern mit einer Detailansicht geklärt oder als unbekannt gebaut und benannt |

**Unklarheiten in fester Reihenfolge auflösen:** erst die Designsprache wahren, dann die Logik
von Layout und Abständen, dann die Bauteilfamilie, dann die Stimmung. Reicht das nicht, eine
Detailansicht erzeugen, dann die Sektion neu erzeugen, und erst danach die baubarste Fassung
wählen, die dem Bild treu bleibt.

**Keine Drift beim Bauen.** Das Ziel ist nicht „vom Bild inspiriert", sondern „dem Bild treu,
innerhalb der Tokens". Typische Drift: Abstände schrumpfen auf Standardwerte, die
Schrifthierarchie wird flacher, verschachtelte Kästen kommen zurück, die das Bild gerade nicht
hatte.

## 5. Treue prüfen

Die Originalskills haben hier keine Schleife, es wird nur behauptet. Hier wird verglichen:

1. Seite bauen, dann `node scripts/pruefe-breakpoints.mjs http://localhost:4321` laufen
   lassen. Es legt Screenshots in acht Größen ab.
2. Den Screenshot bei 1440 px neben das Bild der jeweiligen Sektion legen und auf Proportion,
   Abstände, Schriftverhältnis und Anker vergleichen, nicht auf Pixelgleichheit. Derselbe
   Maßstab wie beim Abgleich mit einem Entwurf in
   `../../agentur-website-builder/references/qa-und-abnahme.md`.
3. Jede bewusste Abweichung in einem Satz begründen: meist Kontrast, Lesbarkeit mobil, eine
   fehlende Sektion im Trichter.

Einen automatischen Bildvergleich gibt es nicht. Der Abgleich ist Ansehen mit Maßstab, und so
wird er im Bericht auch benannt.

## 6. Was ein generiertes Bild nie ist

| Nie | Warum |
|---|---|
| **Quelle für Inhalte** | Namen, Zitate, Bewertungen, Preise, Zahlen, Logos und Zertifikate aus einem generierten Bild sind erfunden. Sie werden nicht abgeschrieben, auch nicht als „vorläufig". An ihre Stelle kommt `[[FEHLT: …]]`, siehe harte Grenze und § 5 UWG |
| **Beleg auf der Live-Seite** | ein KI-Bild als „unser Team", „unsere Werkstatt", „Projekt Musterstraße" oder als Vorher-Nachher behauptet etwas, das es nicht gibt. Seit dem 2. August 2026 verlangt Art. 50 der KI-Verordnung außerdem, dass täuschend echte KI-Bilder von real wirkenden Personen, Orten oder Ereignissen als künstlich erzeugt offengelegt werden. Keine Rechtsberatung, vor dem Einsatz prüfen lassen |
| **Fertiges Logo** | ein generiertes Zeichen ist eine Skizze. Es ist in der Regel nicht urheberrechtlich geschützt, weil § 2 Abs. 2 UrhG eine persönliche geistige Schöpfung verlangt, und seine Unterscheidungskraft ist ungeprüft. Vor jeder Lieferung: von Hand neu zeichnen und eine Markenrecherche beim DPMA oder EUIPO |
| **Ersatz für Projektfotos** | wo echte Arbeit gezeigt werden soll, steht bis zur Lieferung ein benannter Platzhalter mit Motiv und Maßen, siehe `public/images/BILDER.md` im Agenturablauf |

Erlaubt auf der Live-Seite sind generierte Bilder dort, wo sie erkennbar Stimmung oder
Illustration sind und nichts über das Unternehmen behaupten: eine Textur, ein abstrakter
Hintergrund, eine Illustration im Markenstil. Auch dann stehen sie mit Herkunft in
`BILDER.md`.

## 7. Markenentwürfe als Denkwerkzeug

Für einen Kunden ohne Marke kann ein Übersichtsbild (drei mal drei Felder: Zeichen,
Konstruktion, digitale Anwendung, Kernaussage, Farbe, Schrift, Anwendung auf Papier,
Bildsprache, Detail) helfen, eine Richtung zu besprechen. Nützlich daraus ist die Frage, die
jedes Markenbild beantworten muss: was die Marke steht, welches Bild sie trägt, wie das
Zeichen es ausdrückt, wie das System über Oberfläche, Druck und Bild skaliert, und warum es
nur diesem Unternehmen gehört.

Fünf Wege zum Zeichen, höchstens zwei kombiniert: Monogramm mit Bedeutung (Aussparung,
Schnitt, Faltung statt nacktem Buchstaben), die Haupttätigkeit als Zeichen, zwei Bilder
verschmolzen, Negativraum, Konstruktionsgeometrie. Das Ergebnis bleibt Gesprächsgrundlage,
siehe „Fertiges Logo" oben.

## Verwandte Kapitel

- `22-premium-designquellen.md`: die Recherche, die vor jedem Entwurf steht
- `24-designsystem-vorrang.md`: Stufe 5, und was sie nie überschreibt
- `25-designmuster-bibliothek.md`: Belegmarkierung und warum Entwürfe keine Muster werden
- `26-geschmack-und-ki-tells.md`: Lesart, Regler und die Tells, die in den Auftrag gehören
- `07-recht-dsgvo.md` und `06-conversion-architektur.md`: Belege, Vertrauen, Irreführung
- `39-ki-assets-bewegtbild-und-3d.md`: wenn KI ein Asset erzeugt, das auf die Seite kommt statt nur ein Entwurf
