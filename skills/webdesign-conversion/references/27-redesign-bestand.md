# Redesign einer bestehenden Seite

Eine bestehende Seite zu überarbeiten ist eine andere Aufgabe als eine neue zu bauen. Der
häufigste Fehler dabei ist nicht schlechtes Design, sondern der falsch erkannte Auftrag: eine
Seite, die weiterentwickelt werden sollte, wird neu erfunden, oder eine, die neu gedacht
werden musste, bekommt nur neue Farben.

Dieses Kapitel ist die Denkweise. Der Ablauf im Agenturprojekt, mit Inventar und
Weiterleitungen, steht in `../../agentur-website-builder/SKILL.md` Phase 1. Das Auslesen von
Logo, Farbe und Schrift in `20-markenextraktion-bestandsseite.md`. Die Substanz stammt aus dem
Redesign-Protokoll von [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT) und seinem
`redesign-skill`, übertragen auf deutsche Unternehmensseiten.

## 1. Zuerst den Auftrag erkennen

| Modus | Woran erkennbar | Was bleibt | Was sich ändert |
|---|---|---|---|
| **Weiterentwickeln** | „moderner", „frischer", die Seite funktioniert im Grunde | Marke, Struktur, Inhalte, Adressen, Tonalität | Typografie, Abstände, Farbkalibrierung, Zustände, Bewegung |
| **Neu gestalten** | „sieht nicht mehr nach uns aus", Inhalte und Struktur sind in Ordnung | Inhalte, Seitenstruktur, Adressen | die ganze Bildsprache, auf dem bestehenden Inhalt |
| **Neuanfang** | neue Marke, neue Positionierung, neues Angebot | nur Rechtliches und was bewusst übernommen wird | alles, dann gilt der Fahrplan für Neubauten |

Ist der Modus nicht ableitbar, wird **einmal** gefragt: „Soll die Überarbeitung die
bestehende Marke erkennbar weiterführen, oder fangen wir optisch neu an?" Dann gilt die
Antwort, und sie steht im Markenbrief.

**Entscheidungshilfe:**

- Informationsarchitektur, Inhalte und Suchmaschinensichtbarkeit tragen: **weiterentwickeln**.
  Der meiste Wert bei dem geringsten Risiko.
- Die Schulden sind strukturell (kaputte Mobilansicht, keine erkennbare Ordnung, kein
  Designsystem, falsche Seitenstruktur): **neu gestalten**, bei strengem Erhalt der Inhalte
  und Adressen.
- Die Marke selbst ändert sich: **Neuanfang**.

## 2. Befund vor dem ersten Eingriff

Erst festhalten, was da ist. Wer sofort baut, weiß am Ende nicht mehr, was er verbessert hat.

| Bereich | Was festgehalten wird | Werkzeug |
|---|---|---|
| Markenwerte | Farben, Schriften, Logoeinsatz, Radien | `20-markenextraktion-bestandsseite.md`, gemessen mit `scripts/brand-extraktion.mjs` |
| Struktur | Seitenbaum, Hauptnavigation, Wege zur Anfrage | `scripts/relaunch-inventory.mjs` |
| Inhalte | was arbeitet, was Füllstoff ist | Inventar plus Lesen |
| Bewahrenswertes | eine wiedererkennbare Heldenidee, eine eigene Interaktion, der Ton | Ansehen |
| Abzulösendes | KI-Tells aus `26-geschmack-und-ki-tells.md`, kaputte Layouts, tote Links, beliebige Stockbilder, Leistungsbremsen | `pruefe-geschmack.mjs`, `pruefe-breakpoints.mjs` gegen die alte Seite |
| Regler | wo steht die Seite heute bei Varianz, Bewegung, Dichte | Ablesen. **Das ist der Ausgangspunkt, nicht die Voreinstellung** |
| Sichtbarkeit | rankende Seiten, Titel, strukturierte Daten, Vorschaukarten | `05-seo-sichtbarkeit.md`. Der Umzug der Sichtbarkeit ist das größte Risiko jeder Überarbeitung |

## 3. Was sich nie still ändert

Diese Dinge ändern sich nur mit ausdrücklicher Zustimmung, und die Zustimmung steht im
Markenbrief. Jedes davon hat einen Grund, der außerhalb der Gestaltung liegt.

| Gegenstand | Warum er geschützt ist |
|---|---|
| Adressen und Seitenpfade | Rankings, Verlinkungen, Lesezeichen. Ändert sich eine, braucht sie eine Weiterleitung, siehe `08-pflichtseiten-technik.md` |
| Beschriftung der Hauptnavigation | Wiedererkennung und Gewohnheit der Bestandskunden |
| Namen und Reihenfolge von Formularfeldern | Auswertung, Autofill, das Schema im Leadsystem, Anbindungen an Dritte |
| Logo und Wortmarke | Markenrecht und Wiedererkennung. Siehe Stufe 2 in `24-designsystem-vorrang.md` |
| Rechtstexte und Consent-Texte | sie sind geprüft oder sollten es sein. Eine gestalterische Überarbeitung ist keine Rechtsprüfung |
| Kennungen, an denen Messung hängt | Ereignisnamen, Sektions-IDs, Sprungziele. Sonst bricht die Auswertung unbemerkt ab |
| Erreichte Barrierefreiheit | Fokuszustände, Alternativtexte, Tastaturwege, Kontraste gehen nie zurück |
| Die Tonalität | eine optische Modernisierung ist keine Neutextung, außer sie ist beauftragt |

## 4. Die Hebel, in dieser Reihenfolge

Von oben nach unten anwenden und aufhören, sobald der Auftrag erfüllt ist. Oben steht der
größte sichtbare Gewinn je Risiko.

| # | Hebel | Was konkret | Verweis |
|---|---|---|---|
| 1 | **Typografie** | Schrift mit Charakter statt Systemschrift, Zwischenschnitte (500, 600) statt nur 400 und 700, negative Laufweite für große Grade, Zeilenlänge unter 80 Zeichen, `text-wrap: balance` und `pretty` gegen Schusterjungen, Tabellenziffern bei Zahlen | `10-visuelle-richtung.md` |
| 2 | **Abstände und Rhythmus** | mehr Luft zwischen Sektionen, ein durchgehender Rhythmus, optisch statt rechnerisch mittig (unten meist etwas mehr als oben) | `15-spacing-rhythmus.md` |
| 3 | **Farbe nachkalibrieren** | ein Akzent statt mehrerer, eine Graufamilie statt warm und kalt gemischt, Schatten in der Tönung des Grundes statt Schwarz, eine Lichtrichtung für alle Schatten, Markenakzent bleibt | `10-visuelle-richtung.md` |
| 4 | **Zustände** | Hover, gedrückt, Fokus an jedem Bedienelement, Laden als Skelett in der Form des Ergebnisses statt Kreisel, leere und fehlerhafte Zustände gestaltet, aktive Seite in der Navigation markiert, keine Links auf `#` | `04-barrierefreiheit-bfsg.md`, `02-design-ux.md` |
| 5 | **Bewegung** | eine Schicht passend zum Bewegungsregler auf die bestehenden Bauteile, mit Begründung je Animation | `18-motion-handschrift.md` |
| 6 | **Held und Schlüsselsektionen neu komponieren** | der obere Teil des Trichters nach `26-geschmack-und-ki-tells.md` Abschnitt 4 und 5 | `02-design-ux.md` |
| 7 | **Bausteine ersetzen** | erst, wenn ein Block nicht zu retten ist | `21-sektionshintergruende-hierarchie.md` |

**Kartengruppen richten:** Bei nebeneinanderstehenden Karten mit unterschiedlich langem
Inhalt stehen die Knöpfe unten auf einer Linie, und Merkmalslisten in Preis- oder
Vergleichskarten beginnen auf derselben Höhe. Sonst sieht das Raster kaputt aus, obwohl jede
Karte für sich stimmt.

## 5. Arbeitsweise im Bestand

- **Mit dem vorhandenen Stack arbeiten, solange weiterentwickelt wird.** Keine Migration von
  Framework oder Styling ohne Auftrag. Beim Relaunch in den Agenturstack gilt dagegen
  `../../agentur-website-builder/SKILL.md`, dort ist Astro auf Cloudflare Pages gesetzt.
- **Erst reparieren, dann neu bauen.** Zeigt der Befund, dass der Schaden an drei Stellen sitzt
  (Held, Formular, Ladezeit), ist die Reparatur dieser drei Stellen oft der kleinere und
  schnellere Auftrag als ein Neubau. Der Befund nennt beide Wege mit Aufwand, und der Kunde
  entscheidet. Ungemessen, ab wann sich der Neubau lohnt.
- **Vor jeder neuen Bibliothek die Abhängigkeiten prüfen.** Ein Import, der im Projekt nicht
  existiert, ist ein Fehler, keine Kleinigkeit.
- **Nach jedem Hebel prüfen, ob noch alles funktioniert.** Kleine, nachvollziehbare
  Änderungen statt eines großen Umbaus, den niemand mehr prüfen kann.
- **Jede Abweichung vom Bestand bekommt einen Satz Begründung**, im Abschlussbericht und im
  Markenbrief. Was nicht begründet ist, dreht die nächste Sitzung zurück.

## Verwandte Kapitel

- `20-markenextraktion-bestandsseite.md`: Logo, Farbe, Schrift der Bestandsseite auslesen
- `24-designsystem-vorrang.md`: bestehende Marke als Stufe 2
- `26-geschmack-und-ki-tells.md`: welche Muster abgelöst werden und die Regler
- `05-seo-sichtbarkeit.md` und `08-pflichtseiten-technik.md`: Sichtbarkeit und Weiterleitungen
- `../assets/checklisten/conversion-audit.md`: das Audit der Bestandsseite aus Conversionsicht
