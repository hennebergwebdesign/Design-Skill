# Polierschleife mit Kritiker (Gauntlet Loop)

`29-pruefdurchgaenge-und-vokabular.md` begrenzt die subjektiven Durchgänge vor der Übergabe auf
zwei. Dieses Kapitel beschreibt, **wie man einen solchen Durchgang mit mehreren Agenten
ausführt**, wenn der Aufwand es rechtfertigt: ein Bauagent und ein getrennter Kritikagent, die
gegeneinander iterieren, bis eine vorher festgelegte Latte erreicht ist. Es ist kein dritter
Durchgang, sondern eine Art, einen der zwei Durchgänge zu fahren.

Die Substanz stammt aus einem Video von Jay E (Kanal RoboNuggets, 06.08.2026), das ein Muster
von Matt Shumer beschreibt und sich auf den Artikel „Building effective agents" von Anthropic
(2024) beruft. Beide Quellen sind hier nicht im Original gelesen, der Inhalt ist aus dem
Transkript übernommen. Die Testergebnisse des Videos (3D Wohnung, Produktseite) sind
Einzelfälle des Autors, hier keine Belege. Die Vorlage ist eine eigene Formulierung.

## 1. Das Prinzip

| Teil | Inhalt | Grund |
|---|---|---|
| Aufgabe | was verbessert oder gebaut wird, auf einen Pfad und einen Umfang begrenzt | ohne Grenze verändert der Loop Dinge, die niemand prüfen wollte |
| Bauweise | der Hauptagent zerlegt in kleine Einheiten (eine Sektion), je Einheit ein Bauagent und ein **getrennter** Kritikagent, der nur das Ergebnis sieht (Screenshots), nicht die Gedanken des Bauagenten | ein Modell hält die eigene Ausgabe tendenziell für gut genug, ein getrennter Prüfer nicht |
| Latte | die Bedingung, ab der gestoppt wird, mit **Referenz**: Design System, Referenzseiten, Briefing | ohne etwas, woran der Kritiker scheitern kann, stimmt er zu |

## 2. Vorbedingungen, alle vier

Fehlt eine, wird die Schleife nicht gestartet.

1. Ein Entwurf steht (MVP) und das Design System liegt vor (`24-designsystem-vorrang.md`,
   `marke.json`). Die Schleife poliert, sie erfindet die Richtung nicht. Grund: Optimiert sie ohne
   Richtung, optimiert sie in die falsche.
2. Referenzen für den Kritiker sind benannt (freigegebene Referenzen aus der Designrecherche,
   Bilder, die Marke).
3. Das Briefing steht im Auftrag: Zielgruppe, Conversion-Ziel, Markenregeln. Grund: Im Beispiel des
   Videos sah die Seite am Ende gut aus, entsprach aber nicht der echten Marke. Gut aussehen ist
   nicht die Latte.
4. **Budget und Durchlaufgrenze stehen im Auftrag**: höchstens eine feste Zahl Durchläufe je
   Einheit, danach Stopp und Bericht. Der Wert ist `[[FEHLT: Durchläufe je Einheit]]`, bis das
   Projekt ihn festlegt. Kosten und Laufzeit sind im Video nicht genannt und hier ungemessen.

## 3. Der Kritiker

| Regel | Grund |
|---|---|
| Er soll das Ergebnis **widerlegen**, nicht bewerten, und gilt im Zweifel als durchgefallen | Bewerten führt zur Zustimmung. Das ist eine Ergänzung aus Zuschauerkommentaren, plausibel, nicht vom Kanal |
| Er prüft gegen feste Punkte: Abweichung vom Design System, Kontrast und Lesbarkeit, Abstand und Hierarchie, Abweichung vom Briefing, Vergleich mit der Referenz | ein Urteil ohne Maßstab ist Geschmack (`33-kundenpraesentation-und-feedback.md`) |
| Er sieht Screenshots bei 375 und 1440 px (`scripts/pruefe-breakpoints.mjs --bilder`), je Sektion als Ausschnitt | ein Ganzseitenbild verliert Details, ein Ausschnitt mit Zoom nicht |
| Er ändert nichts selbst | wer prüft, baut nicht, sonst fehlt die Trennung |

Die harten Grenzen aus `SKILL.md` und die Prüfskripte stehen **über** dem Kritiker. Ein Kritiker, der
ein Element lobt, das `pruefe-kontrast.mjs` verwirft, hat unrecht. Skripte laufen weiter nach jedem
Durchgang.

## 3a. Variante mit drei Kritikern

Für Assets, Sektionen und Mailings mit einem Benchmark (Screenshot einer starken Vorlage) kann der
eine Kritiker in drei getrennte Rollen zerlegt werden. Sie zählt weiter als **ein** Durchgang.

| Kritiker | Frage |
|---|---|
| Brief | trifft es Auftrag, Zielgruppe, Pflichtinhalt? |
| Gestaltung | Hierarchie, Typografie, Abstand, Farbe, Konsistenz mit den Tokens |
| Wirkung | visuelle Wirkung, Handschrift, Wiedererkennbarkeit, KI Tells (`26-geschmack-und-ki-tells.md`) |

Ablauf: Version 1 bauen, jeder Kritiker vergibt 1 bis 10 mit Begründung und konkreter Korrektur,
der Bauagent behebt die niedrigsten Werte, neu rendern, neu bewerten. Stopp bei allen Werten ab 8
oder bei der Durchlaufgrenze aus Abschnitt 2. Ein Vorschlag aus dem Quellpaket sind höchstens fünf
Runden, festgelegt wird die Zahl im Projekt. Die Scores kommen ins Projektprotokoll.

Zwei Regeln, damit die Zahl keine Zustimmung erkauft: Jeder Wert unter 10 nennt den konkreten
Mangel (wer eine Zahl ohne Mangel vergibt, bewertet nur), und ein Wert ab 8 hebt keinen Befund der
Prüfskripte auf. Endet die Schleife ohne Ziel, werden Stand und Restlücken offen berichtet. Die
Kritiker sehen den gerenderten Screenshot, nie nur den Code. Die Schwelle 8 ist ein Vorschlag, nicht
gemessen.

## 3b. Variante für Texte: Fachkritiker statt Gestaltungskritiker

Für Seitentexte (Held, Leistungsseite, Landingpage) prüfen nicht Gestaltung und Wirkung, sondern vier
Fächer. Aus dem Paket `webcopyseo` (Version 4.17) übernommen, an die Regeln dieses Skills angepasst.
Auch das zählt als **ein** Durchgang.

| Kritiker | Prüft | Maßstab |
|---|---|---|
| Copy | Klarheit im ersten Bildschirm, eine Kernbotschaft, Sprache der Kunden, Startpunkt nach Bewusstseinsstufe, Nutzen mit Beleg, unbeantwortete Einwände, Druck oder Übertreibung | `12-copywriting.md`, `34-ueberzeugungsausloeser.md`, `35-autoritaet-im-text.md`, `45-huerde-laenge-und-leserfuehrung.md` |
| Conversion | ein Ziel, ein Primär-CTA, Reihenfolge der Sektionen nach Hürde, Reibung im Formular, Vertrauen neben dem Knopf, mobile Reihenfolge, ein Testvorschlag mit Hypothese | `06-conversion-architektur.md`, `45-huerde-laenge-und-leserfuehrung.md`, `13-messung-optimierung.md` |
| SEO | Suchintention, Titel, Beschreibung, eine H1, Gliederung, Alt-Texte, interne Links, Markup deckt sich mit dem Sichtbaren, lokale Angaben | `05-seo-sichtbarkeit.md`, `46-lokale-sichtbarkeit.md` |
| GEO | Antwort zuerst, Absätze für sich verständlich, Fragen als Überschriften, wo es Fragen sind, Konkretes, Datum, Text im HTML | `31-ki-sichtbarkeit-geo.md` |

Ein fünfter Schritt, der **Bewerter**, liest Briefing, Fassung und die Befunde der Prüfskripte und gibt
je Fach eine Zahl von 1 bis 10 mit dem konkreten Mangel aus, als JSON, ohne Schreibrechte. Fertig ist
eine Fassung, wenn jedes Fach mindestens 8 hat, kein Prüfskript einen Fehler meldet und keine
Aussage ohne Beleg steht. Stopp außerdem bei der Durchlaufgrenze aus Abschnitt 2 oder nach zwei Runden
ohne Fortschritt. Beim Zusammenführen widersprüchlicher Befunde gilt: Wahrheit vor Wirkung,
Verständlichkeit vor Keyword, Briefing vor Geschmack.

**Entschieden gegen die Quelle:** Die Quelle gewichtet acht Kategorien zu 100 Punkten mit einer
Schwelle von 90. Übernommen sind die Fächer, nicht die Gewichte und nicht die Summe, weil eine
gewichtete Punktzahl Genauigkeit vortäuscht (`31-ki-sichtbarkeit-geo.md`, Abschnitt 7) und eine hohe
Summe einen schwachen Teil verdecken kann. Die Prüfung der Quelle auf Bindestriche ist durch die
Strichregel dieses Skills ersetzt: Gedankenstriche nein, der Bindestrich im Kompositum bleibt
(„E-Mail-Adresse", nicht „Email Adresse"). Die Kritiker als eigene Agentendateien mitzuliefern ist nicht
übernommen, die Rollen stehen in der Vorlage `../assets/vorlagen/prompts/textkritik.md`.

## 3c. Design Loop: Latte aus prüfbaren Mechanismen, Bestanden oder Nicht bestanden

Dritte Variante, aus dem Skill „design-loop" des Pakets `47-claude-design-hacks.md` (Jack Roberts,
Gauntlet-Muster von Matt Shumer, Zerlegung, feste Kritikerrollen und Preflight vom Paketautor
ergänzt). Sie zählt weiter als **ein** Durchgang. Sie lohnt sich, wenn es eine **konkrete Referenz**
gibt, die übertroffen werden soll, und ist sonst Aufwand ohne Maßstab.

| Phase | Inhalt | Tor |
|---|---|---|
| 1 Interview | genau drei Fragen auf einmal: Was wird gebaut und wie groß? Was macht das schon brillant, etwas, das sich öffnen lässt? Welche Dateien gelten (Designsystem, Markenbrief, Text, Entwurf)? Dann warten | ja |
| 2 Preflight | eine Prüfung, keine Frage: Referenz jetzt abrufen, prüfen, ob die Ausgabe gerendert werden kann (Screenshots, Frames, PDF), Eingabedateien vorhanden, benötigte Generatoren verbunden. Ein Block: was geht, was fehlt, **welcher Kritiker blind wäre**. Nie still mit einem blinden Kritiker weitermachen | ja |
| 3 Zerlegung | 5 bis 7 **prüfbare Mechanismen** in `bar.md` (Vorlage in `../assets/vorlagen/prompts/design-loop.md`), dem Menschen zeigen, dann erst weiter | ja |
| 4 Schleife | pro Teil ein Bauagent, danach drei Kritiker mit frischem Kontext | Durchlaufgrenze |

**Ein vages Vorbild** („Apples Website", „gutes SaaS-Design") wird **einmal** zur konkreten Seite oder
Datei nachgefragt. Grund: Mit vagem Maßstab erfindet der Kritiker einen Vergleich und winkt in Runde 1
alles durch. Das ist der häufigste Fehlerfall der Methode. Fehlt jede Referenz, werden drei Kandidaten
mit je einer Zeile Begründung vorgeschlagen, der Mensch wählt. Eine fremde Seite wird nur nach Tor 1
aus `designrecherche-ablauf.md` abgerufen.

**Mechanismen statt Adjektive:** „wirkt hochwertig" ist wertlos, „die Überschrift ist fünfmal so groß
wie der Fließtext, drei Schriftgrößen insgesamt" ist prüfbar. Jede Zeile muss ein Kritiker durch
**Ansehen** entscheiden können. Mechanismen gehören zur Gestaltung (Typografie, Farbe, Raster, Weißraum,
Bewegung, ein Detail), nicht zum Code.

| Kritiker | Maßstab | Sieht |
|---|---|---|
| Brief | nur das genannte Ziel: leistet es, was verlangt ist? Ästhetik ignorieren | Rendering, Auftrag |
| System | nur das Designsystem (`marke.json`, Markenbrief, `DESIGN.md`). Fehlt es, wird die Rolle übersprungen **und das gesagt** | Rendering, Systemdatei |
| Handwerk | nur `bar.md` und das Rendering: unsere Fassung neben die Referenz **ohne Beschriftung**, sagen, welche besser ist, **die eine größte Lücke** nennen. Stärkstes verfügbares Modell | Rendering beider |

Die Briefs der Kritiker werden **für das konkrete Ziel geschrieben**, nicht aus einem allgemeinen
Wortlaut wiederverwendet. Kritiker beurteilen das Rendering, nie den Code: Wer den Code liest, bewertet
die Absicht statt des Ergebnisses. Die Rolle „Brief" deckt den Teil von Abschnitt 3a ab, der den Auftrag
prüft, „System" den der Tokens, „Handwerk" den der Wirkung.

**Entschieden gegen die Quelle und gegen 3a:**

| Punkt | Quelle | Hier | Grund |
|---|---|---|---|
| Urteil | Bestanden oder Nicht bestanden, nie Punkte | **Bestanden oder Nicht bestanden je Kritiker** als Standard dieser Variante | Punkte driften von Runde zu Runde nach oben. 3a mit Werten 1 bis 10 bleibt für den Fall, dass der Mensch Abstufungen sehen will |
| Rundenzahl | „keine feste Rundenzahl, Ausstieg ist Gewinnen" | **Durchlaufgrenze bleibt** (Abschnitt 2, Vorbedingung 4), Vorschlag fünf Runden je Teil | Ohne Grenze läuft die Schleife bis zum Kostenlimit. Endet sie ohne Ziel, werden Stand und Restlücken offen berichtet |
| Jeder Fehlschlag | zurück zum Bauagent mit der einen größten Lücke | übernommen | eine Lücke je Runde ist umsetzbar, fünf nicht |
| Teile | drei bis vier je Lauf | übernommen | jedes weitere Teil vervielfacht den Lauf |
| Kosten | „keine Kostenangabe erfinden, Runden zeigen" | übernommen | das Modell sieht seinen eigenen Verbrauch nicht (`39-ki-assets-bewegtbild-und-3d.md`, 3a) |

Alle drei Kritiker müssen bestehen. Ein Bestanden hebt keinen Befund der Prüfskripte auf. Fortschritt:
eine Übersichtsseite oder Tabelle mit Teilen, Urteilen, Verlauf der größten Lücke und Rundenzahl. Läuft
der Loop in Claude Design, geht das nicht (dort starten keine frischen Kritiker): in Claude Code.
Die Weiterführung nach Bericht und Mensch ist Abschnitt 5.

## 4. Verhältnis zur Obergrenze aus Kapitel 29

* Eine Schleife zählt als **ein** subjektiver Durchgang. Die Grenze von zwei bleibt.
* Die Durchlaufgrenze der Schleife ersetzt nicht die Grenze der Durchgänge, sie begrenzt nur den
  Aufwand innerhalb eines Durchgangs.
* Was der Kritiker nach der Grenze noch findet, geht als offener Punkt in die Übergabe.
* Nie als erster Prompt eines Projekts und nie auf der ganzen Seite auf einmal ohne Pfadgrenze.

## 5. Bericht und Mensch

Die Schleife liefert einen Bericht: vorher und nachher je Einheit, Status je Einheit (bestanden,
durchgefallen, Grenze erreicht), offene Punkte. Ein Mensch liest ihn und sieht die Seite an
(`../../agentur-website-builder/references/qa-und-abnahme.md`, Schritt 9). Das Modell, das gebaut hat, meldet
die Seite nicht als abgenommen. Zum Bericht gehört eine kurze Erklärung, was die Kritiker geprüft haben
(`44-gutes-festschreiben-und-rueckbauprobe.md`, Abschnitt 6).

## 6. Wann sich der Aufwand lohnt

| Lage | Schleife? |
|---|---|
| Heldenbereich oder Kernsektion mit Referenzbild, das erreicht werden soll | ja |
| Standardseite mit festem Design System und wenigen Sektionen | meist nein, ein Durchgang nach Kapitel 29 genügt |
| Kein Design System, keine Referenz | nein, erst Richtung klären |
| Rechtstexte, Formulare, Consent | nein, das prüfen Skripte und ein Mensch |

Ob die Schleife bessere Ergebnisse liefert als ein einzelner Durchgang, ist für dieses Repository
ungemessen. Das Δ ist eine Vermutung.

## 7. Nicht übernommen (mit Grund)

* Die Ergebnisse der beiden Tests des Videos als Beleg für Qualität: Einzelfälle.
* Der Name „Warp Drive" und die Wertung als Fähigkeit der neuesten Modelle: Werbesprache.
* Eine feste Zahl von Durchläufen: im Video nicht genannt, im Projekt festzulegen.

## Verwandte Kapitel

`29-pruefdurchgaenge-und-vokabular.md`, `24-designsystem-vorrang.md`, `26-geschmack-und-ki-tells.md`,
`33-kundenpraesentation-und-feedback.md`, `41-motion-als-funktion-der-zeit.md`,
`47-claude-design-hacks.md`, Vorlagen `../assets/vorlagen/prompts/polierschleife.md`,
`../assets/vorlagen/prompts/textkritik.md` und `../assets/vorlagen/prompts/design-loop.md`.
