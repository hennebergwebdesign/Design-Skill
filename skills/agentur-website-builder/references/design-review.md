# Design-Review vor der Abnahme

Die Prüfskripte finden kaputte Layouts, nicht hässliche. Dieses Kapitel ist der Schritt
danach: die gebaute Seite wird angesehen wie von einer Gestalterin, jeder Befund bekommt eine
Schwere und einen Beleg, und jede Behebung wird einzeln committet und mit einem
Vorher-nachher-Paar belegt. Dazu kommt am Ende ein kurzer Review des Konzepts **vor** dem Bau,
mit Gegenfragen.

Die Substanz stammt aus `/design-review` von [garrytan/gstack](https://github.com/garrytan/gstack)
(MIT) und aus `design-review` und `grill-me` von
[julianoczkowski/designer-skills](https://github.com/julianoczkowski/designer-skills)
(Apache 2.0). Übernommen sind der Ablauf Aufnahme, Befund, Behebung, Beleg und die
Disziplin „ein Befund, ein Commit". Was umgedreht wurde, steht in Abschnitt 9.

## Inhalt

- Stellung im Ablauf
- 0\. Vorbedingungen
- 1\. Maßstab festlegen
- 2\. Vorher-Aufnahme
- 3\. Erster Eindruck
- 4\. Prüfbereiche
- 5\. Befundliste nach Schwere
- 6\. Ein Befund, ein Commit
- 7\. Abschluss
- 8\. Vor dem Bau: Gegenfragen an das Konzept
- 9\. Was bewusst nicht übernommen wurde
- Verwandte Kapitel

## Stellung im Ablauf

| Wann | Was | Ergebnis |
|---|---|---|
| Phase 3, vor der Freigabe | Gegenfragen an das Umsetzungskonzept, Abschnitt 8 | Lücken im Konzept geschlossen, bevor Code entsteht |
| Phase 5, nach Schritt 2 in `qa-und-abnahme.md` | Design-Review, Abschnitte 1 bis 7 | Befundliste, Commits je Befund, Vorher-nachher-Paare |
| Phase 6 | Ergebnis in den Abschlussbericht | Zeilen unter „Geprüft mit Ergebnis" und „Bewusste Abweichungen vom Entwurf" |
| Überarbeitung einer bestehenden Seite | dieselbe Aufnahme als Befund vor dem ersten Eingriff | Ausgangslage nach `../../webdesign-conversion/references/27-redesign-bestand.md` |

Das Review ersetzt keinen Teil von `qa-und-abnahme.md`. Es setzt voraus, dass Build und die
zehn Prüfskripte grün sind, weil ein Befund wie „Text läuft auf 320 px aus dem Bild" schon
von `pruefe-breakpoints.mjs` gemeldet wird und hier nur Zeit kostet.

## 0. Vorbedingungen

```bash
git status --porcelain        # muss leer sein
pnpm build                    # muss grün sein, siehe qa-und-abnahme.md
pnpm dev                      # Adresse merken, meist http://localhost:4321
```

| Bedingung | Grund |
|---|---|
| Arbeitsbaum sauber | jeder Befund wird ein eigener Commit. Liegt fremde Arbeit offen, landet sie im ersten Befund-Commit und ist nicht mehr einzeln zurückzunehmen. Offenes erst committen oder beiseitelegen, nach Rückfrage |
| Build und Prüfskripte grün | siehe oben |
| `pruefung/` in der `.gitignore` des Kundenprojekts | Screenshots sind Arbeitsmaterial, kein Liefergegenstand, und blähen das Repository |

Gearbeitet wird auf `main`, wie überall in diesem Ablauf. Gepusht wird erst, wenn der Nutzer
es anfordert.

## 1. Maßstab festlegen

Ein Review ohne Maßstab ist Geschmack. Bevor ein Bild angesehen wird, steht fest, wogegen:

| Maßstab | Datei | Prüft |
|---|---|---|
| Lesart, Regler, Sperren | `marke.json` unter `gestaltung` | ob die Seite so wirkt, wie sie gelesen werden sollte |
| Farbrollen, Schriften, Raum, Motion | `marke.json`, `src/styles/tokens.css` | ob Werte aus dem System kommen |
| Layoutkonzept, drei Prinzipien, Verworfenes | `marke-brief.md` Abschnitt 7 | ob die Handschrift gebaut wurde oder eine Schablone |
| Umsetzungskonzept | Phase 3, im Chat freigegeben | Sektionen, Zweck, Handlungsaufforderung je Sektion |
| Entwurf | Figma, Claude Design, Screenshotstrecke, KI-Bild | Proportion, Abstände, Schriftverhältnis, siehe `qa-und-abnahme.md` Schritt 3 |
| `DESIGN.md`, falls vorhanden | Abzug nach `../../webdesign-conversion/references/57-design-md.md` | nichts Eigenes: bei Widerspruch gilt `marke.json` |

Wie schwer welche Abweichung wiegt, steht in Abschnitt 5.

## 2. Vorher-Aufnahme

```bash
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder --aus pruefung/review/vorher/start
node scripts/pruefe-breakpoints.mjs http://localhost:4321/kontakt --bilder --aus pruefung/review/vorher/kontakt
```

Je Seite acht ganzseitige Aufnahmen mit festen Namen (`320-reflow.png` bis
`1920-desktop.png`). Feste Breiten und Namen sind der Grund, warum dieses Skript benutzt wird
und kein Browser von Hand: nur so liegen vorher und nachher Bild für Bild nebeneinander.

Angesehen werden nicht alle acht gleich genau:

| Aufnahme | Wofür sie im Review zählt |
|---|---|
| `375-handy` | mobile Gestaltung: ist es ein eigenes Layout oder gestapelte Desktopspalten |
| `768-tablet` | die Breite, an der Raster am häufigsten unentschlossen wirken |
| `1366-notebook` | Heldenzeile, Zeilenzahl, zu steile Typokurve |
| `1440-flach` | Heldenbereich bei 720 px Fensterhöhe: liegt die Handlungsaufforderung über der Falz |
| `1440-laptop` | Vergleich mit dem Entwurf, die meisten Entwurfsdateien sind 1440 px breit |

Zustände sieht kein ganzseitiger Screenshot. Von Hand aufnehmen und als
`pruefung/review/vorher/<seite>/zustand-<name>.png` ablegen: Hover und Fokus auf Knopf und
Kachel, Menü offen, Formular mit Fehlern, Formular abgeschickt, Consent-Banner.

Erst hier die Aufnahmen ansehen, noch nicht den Code. Bewertet wird, was gerendert ist; die
Quelle wird erst beim Beheben geöffnet. Grund (aus gstack): wer zuerst den Code liest, sieht
die Absicht statt des Ergebnisses.

## 3. Erster Eindruck

Geprüft wird nach `../../webdesign-conversion/assets/checklisten/design-kritik.md`
Abschnitt 1. Festgehalten wird er in vier Sätzen je Seite, bei 1440 und 375 px, bevor die
übrigen Abschnitte der Checkliste drankommen:

```
Die Seite sagt: <was sie auf einen Blick mitteilt>
Mir fällt auf: <was heraussticht, konkret, mit Element und Ort>
Das Auge geht zuerst zu: <1>, <2>, <3>
In einem Wort: <Urteil>
```

Der dritte Satz ist die Hierarchieprüfung. Sind die ersten drei Dinge nicht Kernaussage,
primäre Handlungsaufforderung und Vertrauenselement, sondern Logo, Dekorbild und Kicker, dann
lügt die Hierarchie, egal wie sauber die Werte sind. Das Wort am Ende wird gegen die Lesart
aus `marke.json` gelegt. Grund für die feste Form (aus gstack): ein Eindruck, der Element und
Ort nicht benennen kann, ist kein Blick auf die Seite, sondern eine Floskel.

Dazu der Bereichstest: auf jeden abgegrenzten Bereich zeigen und seinen Zweck in zwei
Sekunden benennen. Ein Bereich ohne benennbaren Zweck wird ein Befund.

## 4. Prüfbereiche

Die Prüfungen stehen in `design-kritik.md`, Abschnitte 2 bis 6, für die Phase „Gebaut". Sie
werden hier nicht wiederholt. Das Review ergänzt nur, was erst an der gebauten Seite und an
den Aufnahmen sichtbar wird:

| Zusätzlich im Review | Woran es sich zeigt | Maßstab |
|---|---|---|
| mobile Fassung gestaltet, nicht gestapelt | `375-handy`: Desktopspalten untereinander, Bild vor der Aussage, CTA am Ende | `../../webdesign-conversion/references/16-responsive-container.md` |
| Heldenbereich bei niedriger Fensterhöhe | `1440-flach`: CTA unter der Falz, Heldenzeile drei- oder vierzeilig | `../../webdesign-conversion/references/26-geschmack-und-ki-tells.md` Abschnitt 4 |
| Konsistenz über Seiten | Kopf, Fuß, Knöpfe, Sektionsabstände auf Start- und Unterseiten nebeneinander | Komponenten in `src/components/ui/` |
| Zustände, wie sie wirklich gerendert werden | Zustandsaufnahmen aus Abschnitt 2 | `design-kritik.md` Abschnitt 4 |
| Treue zum Entwurf | `1440-laptop` neben dem Entwurf | `qa-und-abnahme.md` Schritt 3, bei Figma `figma-zu-code.md` |
| Lesart und Sperren | das Wort aus Abschnitt 3 gegen `gestaltung` in `marke.json` | `26-geschmack-und-ki-tells.md` Abschnitte 1 bis 3 |

## 5. Befundliste nach Schwere

Die Schwere folgt der Skala aus `design-kritik.md` („Schwere"), damit Kritik und Review
dieselbe Sprache sprechen. Für das Review kommen Behandlung und ein Status dazu:

| Schwere | Behandlung im Review |
|---|---|
| kritisch | vor der Abnahme beheben, ohne Ausnahme |
| hoch | beheben; bleibt einer offen, steht er mit Grund unter „Bewusste Abweichungen vom Entwurf" |
| mittel | beheben, wenn die Änderung im Befund bleibt; sonst „Nächste Schritte" |
| gering | wenn Zeit bleibt |

Eine Abweichung von Stufe 1 oder 2 nach
`../../webdesign-conversion/references/24-designsystem-vorrang.md` ohne Grund ist mindestens
„hoch", eine Abweichung von `marke.json` mindestens „mittel". gstack hält es ebenso:
Abweichungen vom erklärten Designsystem wiegen schwerer.

Status je Befund: offen, behoben (mit Commit), ohne Beleg, zurückgenommen, zurückgestellt.
Zurückgestellt heißt: nicht im Code lösbar (fehlendes Kundenfoto, Text des Kunden zu lang,
Fremdwidget). Das geht in den Bericht und in `CLAUDE.md` unter „Offene Punkte".

Jeder Befund in dieser Form, fortlaufend nummeriert:

```
B-03 · kritisch · Typografie · Startseite, Heldenbereich
Gesehen: Heldenzeile auf 1366 × 768 vierzeilig, Knopf unter der Falz
Beleg: pruefung/review/vorher/start/1366-notebook.png
Maßstab: Heldenregel in 26, Abschnitt 4; Skala nach 29
Vorschlag: Skala mit kleinerem Desktopverhältnis neu rechnen, nicht h1 von Hand verkleinern
Status: offen
```

„Gesehen" beschreibt, was im Bild steht, nicht was gemeint war; Abgeleitetes wird so
gekennzeichnet. Ein Befund ohne Beleg und ohne Maßstab ist eine Meinung und kommt nicht auf
die Liste. Lieber fünf bis zehn belegte Befunde als zwanzig vage.

Die Liste liegt als `pruefung/review/befunde.md` neben den Aufnahmen, im Ergebnisformat aus
`design-kritik.md` mit „Was trägt" und „Ungeprüft", und wird während der Aufnahme
fortgeschrieben, nicht am Ende aus dem Gedächtnis.

## 6. Ein Befund, ein Commit

In der Reihenfolge der Schwere, je Befund:

1. **Quelle finden.** Erst jetzt den Code öffnen. Nur Dateien ändern, die zum Befund gehören.
2. **Kleinste Änderung.** Token vor Komponentenstil vor Struktur. Eine falsche Skala wird neu
   gerechnet, nicht an einer Stelle übersteuert; ein fehlender Abstand ist ein Token, kein
   neuer Wert.
3. **Betroffene Prüfung erneut.** Was der Befund berührt: `pruefe-tokens.mjs` nach jeder
   Stiländerung, `pruefe-kontrast.mjs` nach Farben, `pruefe-typografie.mjs` nach Schrift.
4. **Nachher-Aufnahme** mit derselben Seite und demselben Namen:

   ```bash
   node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder --aus pruefung/review/nachher/B-03
   ```

   Die betroffene Aufnahme neben die Vorher-Aufnahme legen und ansehen. Hat sich etwas auf
   einer anderen Breite verschlechtert, ist das ein neuer Befund, kein Erfolg.
5. **Commit**, nur die geänderten Dateien:

   ```bash
   git add src/styles/tokens.css
   git commit -m "design: B-03 Heldenzeile auf 1366 px zweizeilig"
   ```

6. **Einordnen:** behoben (Nachher-Aufnahme bestätigt), ohne Beleg (Änderung gemacht, Zustand
   nicht aufnehmbar, so benannt) oder zurückgenommen (`git revert HEAD`, Befund wird
   „zurückgestellt").

| Regel | Grund |
|---|---|
| Ein Befund, ein Commit, nie gebündelt | jede Behebung ist einzeln zurückzunehmen, und der Bericht kann auf einen Commit zeigen |
| Commitnachricht `design: B-<nr> <was>` auf Deutsch | die Liste und die Historie sprechen dieselbe Sprache, Konvention des Plugins |
| Verschlechtert sich etwas, sofort `git revert HEAD` | ein halb reparierter Befund ist schwerer zu finden als der ursprüngliche |
| Nach jedem fünften Befund und nach jeder Rücknahme anhalten und den Stand zeigen | gstack zählt dafür ein Risiko hoch; die Beobachtung dahinter gilt auch hier: Reparaturen in Komponentendateien und an fremden Dateien ziehen Folgefehler nach sich, und ab einer Rücknahme stimmt die Annahme über die Ursache oft nicht |
| Berührt die Behebung Dateien außerhalb des Befunds, anhalten und fragen | dann ist es kein Befund mehr, sondern ein Umbau, und der gehört zurück in Phase 4 |
| Mehr als zehn Befunde der Schwere „kritisch" | Review abbrechen, zurück in Phase 4. Das Review ist Feinschliff, keine zweite Umsetzung |

## 7. Abschluss

1. Alle zehn Prüfskripte erneut, wie in `qa-und-abnahme.md` Schritt 2.
2. Erster Eindruck aus Abschnitt 3 noch einmal, auf den Nachher-Aufnahmen. Ist das Urteil
   schlechter als vorher, ist etwas zurückgefallen, und das steht oben im Bericht.
3. Im Abschlussbericht unter „Geprüft mit Ergebnis" eine Zeile, die sich nachprüfen lässt:

```
Design-Review: 9 Befunde (2 kritisch, 3 hoch, 3 mittel, 1 gering), 7 behoben in 7 Commits,
1 ohne Beleg (Hover auf Touch), 1 zurückgestellt (Teamfoto fehlt).
Vorher-nachher angesehen auf 375, 1366, 1440 × 720 und 1440 × 900.
```

Bewusst nicht behobene Befunde der Schwere „hoch" stehen mit Grund unter „Bewusste
Abweichungen vom Entwurf". Zurückgestellte gehen in `CLAUDE.md` unter „Offene Punkte".

## 8. Vor dem Bau: Gegenfragen an das Konzept

Aus `grill-me`: einen Plan so lange befragen, bis jeder Ast des Entscheidungsbaums
entschieden ist, und abhängige Entscheidungen in der richtigen Reihenfolge klären. Billiger
als jedes Review danach, weil eine Lücke im Konzept sonst als zehn Befunde wiederkommt.

Drei Regeln aus der Quelle gelten schon in `intake-und-entscheidungen.md` und Phase 2 und
werden hier nur angewendet: erst Repository und Material lesen statt fragen, jede Frage mit
empfohlener Antwort, nur fragen, was eine Entscheidung auslöst.

Umgedreht ist das Tempo: `grill-me` fragt einzeln und ohne Ende, der Ablauf hier sammelt.
Deshalb in Runden, eine je Ebene, jede Runde in einer Nachricht:

| Runde | Gegenfragen, Beispiele | Landet in |
|---|---|---|
| 1 Strategie | Was soll sich ein Besucher nach dem ersten Besuch merken, in einem Satz? Woran ist die Seite in drei Monaten gescheitert? | `marke-brief.md` Abschnitt 3, `gestaltung.lesart` |
| 2 Struktur | Welche Seite trägt 80 % der Besuche? Wohin führt der Weg nach einem Formularfehler? Wie heißt die Hauptaktion, und heißt sie überall so? | Seitenstruktur im Konzept, `sprache.cta_primaer` |
| 3 Gestaltung | Wie soll es sich **nicht** anfühlen, mit einer Seite als Beispiel? Welche Sektion ist die eine, die nur für dieses Unternehmen gebaut wird? Wo sitzt der orchestrierte Moment? | `marke-brief.md` Abschnitt 7 „verworfen", `motion.signatur_moment` |

Die erste Frage stammt aus gstack `/design-consultation` („the one thing you want someone to
remember"). Jede spätere Entscheidung muss ihr dienen, deshalb steht ihre Antwort in der
Lesart und nicht im Chatverlauf.

Eine Runde endet, wenn jede offene Frage eine Antwort oder eine bestätigte Empfehlung hat.
Danach erst die nächste Ebene, weil Struktur ohne Strategie und Gestaltung ohne Struktur
geraten sind.

## 9. Was bewusst nicht übernommen wurde

| Quelle sagt | Hier gilt | Grund |
|---|---|---|
| gstack: Noten A bis F je Bereich, gewichtete Gesamtnote, eigene „AI Slop"-Note | Befundliste mit Schwere und Beleg, keine Note, wie in `design-kritik.md` | die Gewichte sind gesetzt, nicht gemessen. Eine Note sieht aus wie ein Messwert und wird im Bericht so gelesen; das wäre ein erfundener Beleg |
| gstack: Schwere hoch, mittel, Feinschliff; designer-skills: must, should, could | die vier Stufen aus `design-kritik.md` | eine Skala für Kritik und Review, sonst übersetzt jede Sitzung anders |
| gstack: Zielbild je Befund über die eigene Bild-API (OpenAI) erzeugen | kein generiertes Zielbild; wenn eine Richtung als Bild abgestimmt werden muss, gilt `../../webdesign-conversion/references/28-ki-bildentwuerfe.md` | externe API mit eigenem Schlüssel und Kosten, und ein Bild ist kein Maßstab, sondern höchstens Stufe 5 |
| gstack `/design-shotgun`: mehrere Bildvarianten mit Vergleichsbrett | nicht übernommen | dieselbe externe Bild-API; die Abstimmung über Bilder regelt Kapitel 28 mit den Sperren aus `marke.json` |
| gstack: Review auf einem Featurebranch nur für den Diff | ganze Seite oder benannte Seiten, auf `main` | Agenturvorgabe: keine Featurebranches |
| gstack: Schriften mit `preconnect` zum CDN | Schriften selbst gehostet | harte Grenze, Verbindung zu einem Drittserver |
| gstack und designer-skills: Fließtext mindestens 16 px, Beschriftung ab 12 px | keine Schrift unter 14 px, Fließtext nach Skala | `55-typografie-system.md`, Boden 14 px für jede Stufe |
| gstack: Skala fest 1.25 oder 1.333 | Skala aus `typoskala.mjs` mit Verhältnis je Fensterbreite | eine feste Skala erzeugt die vierzeilige Heldenzeile zwischen 768 und 1200 px |
| gstack: Breiten 375, 768, 1024, 1440; designer-skills: 375, 768, 1280 | die acht Größen aus `pruefe-breakpoints.mjs` | darin 1440 × 720, die einzige Aufnahme, auf der `100svh` scheitert, und 320 px für Reflow |
| gstack: „Trunk Test" mit der Frage nach der Suche | Suche nur prüfen, wo es eine gibt | eine Handwerkerseite mit sechs Seiten braucht keine Suche, ein Fehlen ist dort kein Befund |
| designer-skills: Dunkelmodus und benannte Stilphilosophie (Dieter Rams, Swiss) als Prüfmaßstab | Lesart und Regler aus `marke.json`; Dunkelmodus nur, wenn gepflegt | `10-visuelle-richtung.md`: Ableitung aus dem Gegenstand, nicht aus einer Stilkarte |
| designer-skills: `DESIGN_REVIEW.md` und Screenshots in `.design/<feature>/` im Repository | `pruefung/review/`, in der `.gitignore`; Ergebnis im Abschlussbericht | Agenturvorgabe: keine Übergabedokumente im Repo, `CLAUDE.md` ist der Projektstand |
| gstack: offene Befunde in `TODOS.md` | `CLAUDE.md` unter „Offene Punkte" | eine Stelle für Offenes, nicht zwei |
| gstack: fehlendes Testframework aufsetzen, Regressionstests je JS-Befund | nicht Teil des Reviews | Formular- und Consent-Pfade werden in `qa-und-abnahme.md` Schritt 4 von Hand geprüft |

## Verwandte Kapitel

- `qa-und-abnahme.md`: Build, Prüfskripte, Abgleich mit dem Entwurf, Abschlussbericht
- `intake-und-entscheidungen.md`: Fragen, Brief und Informationsarchitektur vor dem Bau
- `figma-zu-code.md`: Abgleich gegen einen Figma-Screenshot
- `../../webdesign-conversion/assets/checklisten/design-kritik.md`: die Prüfungen, die Schwere, das Ergebnisformat
- `../../webdesign-conversion/references/26-geschmack-und-ki-tells.md`: Katalog der KI-Tells und Vorflugcheck
- `../../webdesign-conversion/references/24-designsystem-vorrang.md`: welche Abweichung schwerer wiegt
- `../../webdesign-conversion/references/27-redesign-bestand.md`: Befund vor dem ersten Eingriff
- `../../webdesign-conversion/references/57-design-md.md`: `DESIGN.md` als Abzug, falls ein Werkzeug es verlangt
