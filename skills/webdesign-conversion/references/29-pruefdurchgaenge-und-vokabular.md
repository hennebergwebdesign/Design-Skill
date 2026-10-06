# Prüfdurchgänge und Review-Vokabular

`26-geschmack-und-ki-tells.md` setzt Lesart und Regler. Dieses Kapitel ist das Vokabular für
den Durchgang danach: wie über eine gebaute Seite gesprochen wird, ohne bei jedem Feedback
einen Absatz Fließtext zu brauchen, und wie oft dabei nachjustiert wird, bevor der Befund als
offener Punkt in die Übergabe geht statt in einen weiteren Durchgang.

Die Substanz stammt aus [pbakaus/impeccable](https://github.com/pbakaus/impeccable)
(Apache-2.0): ein geteiltes Vokabular aus kurzen Befehlswörtern statt langer Beschreibungen,
vier Blickwinkel auf eine Oberfläche, und Prüfdurchgänge mit fester Obergrenze statt einer
endlosen Schleife. Übernommen sind die Begriffe und ihre Wirkung, kein Code und keine der 35
Playbook-Dateien des Originals: dieser Skill hat keine eigenen Slash-Commands, das Vokabular
bildet stattdessen auf bestehende Regler, Referenzen und Prüfskripte ab.

## 1. Acht Wörter statt eines Absatzes

| Wort | Bedeutung hier | Wirkt auf |
|---|---|---|
| **Lesart** | Schritt 1 aus `26-geschmack-und-ki-tells.md` wiederholen, wenn die Richtung nicht trägt | `26-geschmack-und-ki-tells.md` § 1 |
| **Kritik** | Bewertung nach Heldenregeln, Konsistenzsperren und Sektionsfolge, als Punktliste mit Grund, nicht als Meinung | `26-geschmack-und-ki-tells.md` §§ 3–9 |
| **Prüfung** | die acht Prüfskripte plus Vorflugcheck laufen lassen: ein technischer Befund, keine Einschätzung | `scripts/`, `26-geschmack-und-ki-tells.md` § 10 |
| **Feinschliff** | letzter Durchgang vor der Übergabe: Abstände, Kontraste, Zeilenlängen, Fokusreihenfolge. Kein neuer Inhalt, keine neue Sektion | `assets/checklisten/pre-launch.md` |
| **Mutiger** | Varianz und/oder Dichte einen Punkt höher, mit einem Satz Begründung. Akzent-, Form- und Themasperre bleiben stehen | `26-geschmack-und-ki-tells.md` § 2 |
| **Ruhiger** | zuerst Bewegung senken, dann Varianz, Begründung in `marke.json` | `26-geschmack-und-ki-tells.md` § 2 |
| **Bewegen** | den einen orchestrierten Moment ergänzen oder verfeinern. Keine zweite Stelle eröffnen | `18-motion-handschrift.md` |
| **Satzbild** | Skala, Zeilenlänge, Laufweite und Absatzabstand gegen `10-visuelle-richtung.md` halten | `10-visuelle-richtung.md` |

Der Nutzen ist derselbe wie bei den Reglern aus Kapitel 26: „mutiger" ist in drei Sekunden
gesagt und eindeutig, ein Absatz darüber, was gemeint sein könnte, kostet Zeit und bleibt
vage. Die Wörter ersetzen keine Begründung, sie verkürzen nur den Weg dorthin: jede Anwendung
bekommt trotzdem ihren einen Satz Grund, wie überall in diesem Skill.

## 2. Vier Blickwinkel auf dieselbe Seite

Ein Regler liest sich in jedem Kontext anders. Bewegung auf 7 wirkt im Heldenbereich einer
Landingpage stark und gewollt, im Datenschutztext wie ein Fehler. Deshalb wird vor der Kritik
festgelegt, aus welchem Blickwinkel geprüft wird.

| Blickwinkel | Leitfrage | Beispiel bei einer Unternehmensseite | Referenz |
|---|---|---|---|
| **Überzeugen** | Trifft der Besuch eine Entscheidung? | Landingpage, Heldenbereich, CTA-Strecke | `../playbooks/landingpage.md`, `06-conversion-architektur.md` |
| **Erledigen** | Schließt der Besuch eine Aufgabe ab? | Formular, Terminbuchung, Leadsystem-Dashboard | `06-conversion-architektur.md` |
| **Lesen** | Versteht der Besuch etwas? | Rechtstexte, Stellenanzeige, Blogartikel | `07-recht-dsgvo.md`, `19-recruiting-funnel.md` |
| **Erleben** | Steht das gezeigte Werk im Vordergrund? | Referenzgalerie, Portfolio, Vorher-Nachher | `21-sektionshintergruende-hierarchie.md` |

Die meisten Unternehmensseiten sind überwiegend „Überzeugen" mit einzelnen Abschnitten aus
„Lesen" (Rechtstexte, FAQ) und „Erledigen" (Formular). Der Fehler, den dieser Blickwinkel
verhindert: dieselbe Bewegungsintensität und Kartendichte über die ganze Seite zu ziehen, nur
weil sie im Heldenbereich richtig war.

## 3. Begrenzte Durchgänge, keine endlose Schleife

Diese Regel gilt für **subjektive** Durchgänge (Kritik, Feinschliff, mutiger/ruhiger), nicht
für das Beheben von Fehlern. Ein rotes Prüfskript wird so oft korrigiert und erneut
ausgeführt, bis es sauber ist, wie es Phase 5 in `agentur-website-builder` bereits verlangt.
Das hier betrifft die Geschmacksfrage danach, die sonst offen bleibt, weil sich immer noch
etwas verbessern lässt.

- **Höchstens zwei Durchgänge mit Screenshot vor der Übergabe.** Einer nach dem ersten
  vollständigen Build, einer nach dem Feinschliff. Jeder weitere subjektive Befund geht als
  offener Punkt in die Übergabe, nicht in einen dritten Durchgang.
- **Screenshots kommen von `scripts/pruefe-breakpoints.mjs --bilder`**, derselben
  Playwright-Stufe, die auch `scripts/lib/abruf.mjs` für Referenzseiten nutzt. Sie werden
  gegen den Tokenplan aus `10-visuelle-richtung.md` und den Vorflugcheck aus Kapitel 26
  gehalten, wie bei KI-Bildentwürfen bereits in `28-ki-bildentwuerfe.md` beschrieben. Diese
  Playwright-Stufe ist bislang nur gegen einen lokalen Testserver geprüft, nicht gegen ein
  echtes Kundenprojekt, siehe „Offene Punkte" in `../../../CLAUDE.md`.
- **Der Grund für die Grenze:** unbegrenztes Nachjustieren ist kein Qualitätsgewinn, sondern
  ein offen gehaltener Auftrag. Der Kunde sieht die Seite ohnehin im Feinschliff-Durchgang,
  spätere Wünsche sind eine neue Anfrage, keine Fortsetzung derselben Prüfung.

## 4. Eine zweite Meinung, die ohne KI läuft

Impeccable bringt seit der Aufnahme dieses Kapitels einen eigenständigen Detektor mit:
`npx impeccable detect <ordner|datei|url>` prüft laut Repository auf 60 feste Anti-Muster, ohne
Modell und ohne Schlüssel, darunter überstrapazierte Schriften, grauen Text auf farbigem Grund,
verschachtelte Karten und veraltete Easing-Kurven. Das ist dieselbe Art Befund wie bei
`pruefe-geschmack.mjs` und `pruefe-motion.mjs`, aus anderer Quelle und mit anderen Regeln.

- **Als Zweitmeinung nutzen, nicht als Ersatz.** Wo beide Werkzeuge dasselbe finden, ist es
  fast sicher ein Fehler. Wo nur eines meldet, entscheidet die harte Grenze dieses Skills.
- **Nie ins `package.json` des Kundenprojekts.** Der Aufruf läuft über `npx` und bleibt dabei,
  aus demselben Grund wie bei Playwright: ein Abhängigkeitsbaum im Kundenprojekt wird zum Problem.
- **Ein Befund, der gegen die Marke steht, bleibt als Entscheidung stehen,** mit dem Wort
  „bewusst" und einem Grund, wie bei den Tokenbefunden in `qa-und-abnahme.md`.
- **Ungeprüft hier:** der Detektor ist nicht gegen ein Kundenprojekt gelaufen, die Zahl 60 und
  die Regelnamen stammen aus der Beschreibung des Repositorys. Vor dem ersten Einsatz den
  Aufruf einmal ansehen, nicht blind übernehmen.

Das Original hat inzwischen 24 Befehle (`craft`, `shape`, `critique`, `audit`, `polish`,
`animate`, `typeset`, `layout`, `harden`, `clarify`, `adapt` und weitere). Aufgenommen ist weiter
nur das Vokabular aus Abschnitt 1, weil dieser Skill keine eigenen Slash-Commands hat; die
Befehle bilden auf Regler, Referenzen und Prüfskripte ab.

## Verwandte Kapitel

- Lesart, Regler, Vorflugcheck: `26-geschmack-und-ki-tells.md`
- Motion-Handschrift, der eine Moment: `18-motion-handschrift.md`, Motion-Review: `30-motion-pruefung.md`
- Tokenplan, Typografie: `10-visuelle-richtung.md`
- Ablauf und Prüfskripte im Bauprozess: `../../agentur-website-builder/references/qa-und-abnahme.md`
