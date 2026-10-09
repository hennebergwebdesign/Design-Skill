# Kundenpräsentation, Begründung und Feedback

Die Kapitel davor regeln, was gut ist und wie es geprüft wird. Dieses Kapitel regelt den Moment
danach: wie ein Entwurf vor dem Kunden vertreten wird, wie Rückmeldungen entstehen und warum
ein fachlich richtiger Vorschlag trotzdem untergeht, wenn er als Geschmacksurteil auftritt.
Gemeint ist der Mensch, der die Seite vorstellt, ob Agenturinhaber, Freelancer oder Modell, das
den Entwurf im Chat begründet.

Die Substanz stammt aus einem YouTube Video von Joanna Wiebe (Copyhackers) über Durchsetzungskraft
in kreativen Teams, siehe `CREDITS.md`, Abschnitt „Version 4.5". Das Video richtet sich an Kreative
in Unternehmen. Übernommen ist, was auf die Lage einer Agentur gegenüber ihrem Kunden passt. Das
Gleiche gilt für die Prüfung in Kapitel 29: dort wird die Seite bewertet, hier das Gespräch darüber.

## Inhalt

- 1\. Fünf Stellschrauben für das Gespräch
- 2\. Aussagen statt Geschmack
- 3\. Ein fester Ablauf: Ziele, Recherche, Erkenntnis, Entwurf
- 4\. Verteidigen kostet, Fragen gewinnt
- 5\. Die Lens: der benannte Maßstab
- 6\. Rückmeldeschleifen gestalten
- 7\. Was nicht übernommen ist
- 8\. Ungeprüft in diesem Kapitel
- Verwandte Kapitel

## 1. Fünf Stellschrauben für das Gespräch

| # | Richtung | Gemeint | Wirkung im Kundenprojekt | Grund |
|---|---|---|---|---|
| 1 | Meinung herunter | keine Geschmacksurteile („gefällt mir", „finde ich schöner") | jede Aussage über den Entwurf ist begründet und prüfbar | wo Meinungen auf dem Tisch liegen, gewinnt keine, weil jeder seinem Bauchgefühl gleich stark traut |
| 2 | Systemdenken herauf | immer derselbe Ablauf von Ziel bis Entwurf | Abschnitt 3: Ziele, Recherche, Erkenntnis, Entwurf | wer der Reihenfolge folgt, muss nicht raten und wirkt deshalb nicht, als würde er raten |
| 3 | Verteidigung herunter | den Entwurf nicht schützen, die Frage stellen | Abschnitt 4: eine Rückfrage statt einer Rechtfertigung | die Idee ist nicht die Person; wer verteidigt, macht den Vorschlag schwächer |
| 4 | Urteilskraft herauf | ein benannter Maßstab statt Allerweltswissen | Abschnitt 5: die Lens | ein Modell kopiert Aussehen, nicht den Maßstab, nach dem entschieden wird |
| 5 | Rückmeldeschleifen herauf | Feedback gestalten, nicht erleiden | Abschnitt 6: Rollen, Reihenfolge, Spielregeln | unkontrollierte Einzelnotizen unterbrechen die Arbeit und liefern selten Brauchbares |

Die Stellschrauben 1 und 3 senken etwas, die übrigen heben etwas an. Das ist gewollt: Wer nur
Selbstsicherheit hochdreht, ohne Meinung und Abwehr zu senken, klingt nur lauter. Mit den drei
Reglern aus Kapitel 26 (Varianz, Bewegung, Dichte) haben sie nichts zu tun.

## 2. Aussagen statt Geschmack

Eine Aussage über den Entwurf bekommt ein Ergebnis oder eine Regel, die sich nachsehen lässt.
Gefühlswörter fallen weg, weil niemand ein Gefühl als richtig oder falsch belegen kann.

| Statt | Besser | Was nachprüfbar ist |
|---|---|---|
| „Der Heldenbereich gefällt mir." | „Der Heldenbereich beantwortet die vier Fragen ohne Scrollen." | `06-conversion-architektur.md`, Heldenregeln aus `26-geschmack-und-ki-tells.md` |
| „Ich finde die Schrift zu dünn." | „Die Schrift unterschreitet auf dem Handy die Lesbarkeit, gemessen mit `pruefe-breakpoints.mjs`." | Prüfskript, Befund mit Zahl |
| „Ich denke, ein zweiter Button wäre gut." | „Hier konkurrieren zwei Handlungen, die Rangfolge steht in `06-conversion-architektur.md`." | Rangfolge der Handlungsaufforderungen |
| „Das wirkt moderner." | „Das ist die Referenz, die der Kunde freigegeben hat, mit diesem Grund: …" | Eintrag im Referenzregister |

Zwei Grenzen, damit daraus keine Scheinpräzision wird:

- **Vor dem Livegang gibt es keine eigenen Messwerte.** „Mehr Leute klicken" lässt sich erst
  mit Daten sagen, siehe `13-messung-optimierung.md`. Vorher belegt der Entwurf sich mit Regeln,
  Prüfskripten und freigegebenen Referenzen, nie mit einer erfundenen Zahl. Das ist dieselbe
  harte Grenze wie in `SKILL.md`: keine erfundenen Zahlen.
- **Subjektives bleibt subjektiv und wird so benannt.** Ob eine Stilrichtung zur Marke passt, ist
  eine Entscheidung, keine Messung. Dann steht der Satz „das ist eine Entscheidung, und der Grund
  ist …" statt einer vorgetäuschten Messung.

Der Satzanfang trägt viel. „Ich denke" und „ich glaube" öffnen eine Meinung, „das habe ich
gefunden" und „die Prüfung zeigt" öffnen einen Befund.

## 3. Ein fester Ablauf: Ziele, Recherche, Erkenntnis, Entwurf

Das Video nennt als Beispiel ein Vorgehen mit den vier Stufen goals, research, insight, design
(Kurzform GRID), das laut Video ein Xbox Team nutzt. Ob das stimmt, ist hier nicht geprüft; das
Vorgehen selbst ist als Reihenfolge sinnvoll, und der Skill hat sie ohnehin in anderer Form.

| Stufe | Frage | Wo sie im Ablauf liegt | Ergebnis |
|---|---|---|---|
| Ziele | Was soll die Seite für den Kunden leisten? | Phase 2, Rückfragen: Conversion, Zielgruppe | primäre Handlung im Markenbrief |
| Recherche | Was belegt, dass wir nicht raten? | Phase 1 und 3: Bestand, Wettbewerb, freigegebene Referenzen | Register mit Belegen |
| Erkenntnis | Welche eine Einsicht folgt daraus? | Phase 3, Kopf des Umsetzungskonzepts | ein Satz, der vor der Seitenstruktur steht |
| Entwurf | Was bauen wir, weil das so ist? | Phase 3 und 4 | Struktur, Tokens, Sektionen mit Zweck |

Die Erkenntnis ist **nicht** die Lesart aus Kapitel 26. Die Erkenntnis sagt etwas über
Zielgruppe oder Markt („Besucher vergleichen drei Anbieter und lesen nur die Referenzen"), die
Lesart sagt etwas über die gestalterische Richtung. Aus der einen folgt die andere.

Der Gewinn liegt in der Reihenfolge der Begründung: Der Kunde bekommt zuerst die Ziele und die
Recherche, dann die Erkenntnis, dann erst das Bild. Wer mit dem Bild beginnt, bekommt Geschmack
als Antwort.

## 4. Verteidigen kostet, Fragen gewinnt

Sobald Kritik kommt, entsteht der Impuls, den Entwurf zu erklären. Das Video nennt zwei Wirkungen:
Verteidigung wirkt wie Empfindlichkeit, und sie macht die Idee schwächer, weil sie die Person an
sie bindet. Der Maßstab dahinter: starke Leute aktualisieren ihre Ansicht, schwache verteidigen ihre
Identität (so zitiert das Video den Psychologen Adam Grant, hier nicht gegengeprüft).

Zwei Änderungen genügen.

**Entschuldigende Vorreden streichen.** Sie entschuldigen den Vorschlag, bevor ihn jemand angreift.

| Streichen | Warum |
|---|---|
| „Entschuldigung, aber …" | stellt den Vorschlag unter Verdacht |
| „Ich weiß, das passt vielleicht nicht, aber …" | liefert den Einwand mit |
| „Nur ein kleiner Vorschlag …" | verkleinert, was gerade begründet werden soll |
| „Leider …" vor einer fachlichen Feststellung | macht aus einem Befund eine Bitte |

**Auf Kritik mit einer sauberen Frage antworten.** Danken, dann fragen, was dahinter liegt.

| Kritik des Kunden | Frage zurück |
|---|---|
| „Das Blau gefällt mir nicht." | „Danke. Woran machen Sie fest, dass es nicht zu Ihren Kunden passt?" |
| „Zu viel Text." | „Danke. Welche Information vermissen Ihre Besucher, die sie jetzt nicht finden?" |
| „Der Button ist zu klein." | „Danke. Auf welchem Gerät haben Sie das gesehen?" |

Der Grund: Eine Frage lässt den Kunden erklären, statt dass der Entwurf erklärt wird. Das bringt
oft das eigentliche Problem zutage, und es bleibt ein Gespräch über Sachverhalte. Eine Frage ist
**keine** Ausweichbewegung. Ist die Kritik sachlich richtig (falsche Öffnungszeit, nicht
barrierearm), wird sie ohne Gegenfrage übernommen.

Passt eine Rückmeldung nicht zur Aufgabe, etwa ein Wunsch, der gegen eine harte Grenze steht,
bleibt die Grenze stehen und bekommt ihren Grund in einem Satz, wie überall in diesem Skill.

## 5. Die Lens: der benannte Maßstab

Eine Lens ist die eigene, wiederholbare Art, etwas zu beurteilen. Das Video zeigt sie an einem
Beispiel: Ein Schuhhändler, dessen Maßstab nicht „wir verkaufen Schuhe" war, sondern ein
außergewöhnlicher Kundenservice. Alle Entscheidungen liefen durch diesen einen Satz. Der Gedanke
dahinter, den das Video nennt: Ein Modell kopiert, was gut aussieht, aber nicht den Maßstab, nach
dem entschieden wird. Die Behauptung einer Harvard Studie von 2026 dazu hat das Video geliefert,
sie ist hier nicht gelesen und wird nicht als Beleg verwendet.

| Frage | Antwort |
|---|---|
| Was ist eine Lens? | ein Satz, der sagt, woran sich Entscheidungen messen lassen |
| Wie unterscheidet sie sich von der Lesart? | die Lesart gilt für ein Projekt, die Lens bleibt über Projekte stehen |
| Von wem kommt sie? | von der Agentur oder vom Kunden, nie vom Modell |
| Was ist ein brauchbarer Satz? | konkret genug, dass er Dinge ausschließt |

Beispiele, die diesen Test bestehen: „Jede Seite beantwortet zuerst, was der Besucher als
Nächstes tun soll." Oder: „Wir zeigen nur, was der Kunde belegen kann." Nicht bestehen: „Wir
machen schöne, moderne Seiten." Sie schließt nichts aus.

- **Die Lens der Agentur steht nicht in diesem Skill.** Sie gehört der Agentur und wird von ihr
  formuliert. Fehlt sie, steht im Projekt `[[FEHLT: Lens der Agentur]]`, wie bei jeder anderen
  fehlenden Angabe. Der Skill setzt keine ein.
- **Die Lens des Kunden** ergibt sich aus dem Markenbrief, Abschnitt 3 („Warum dieses
  Unternehmen"), und wird dort als ein Satz festgehalten, wenn sie sich daraus ableiten lässt.
- **Ein Modell bekommt die Lens als Rolle.** Wer Texte oder Entwürfe von einem Modell erzeugen
  lässt, sagt ihm vorher, aus welchem Blickwinkel es urteilen soll („Du bist Texter für
  Handwerksbetriebe und glaubst, dass der erste Satz die Handlung nennt"). Das Beispiel im Video
  ist eine Texterrolle mit Berufserfahrung. Das ersetzt nicht die Prüfung mit
  `deslop-check.mjs`, es setzt vorher an.

## 6. Rückmeldeschleifen gestalten

Das Video sagt: Wer respektiert wird, bittet nicht weniger um Rückmeldung, sondern gestaltet sie.
Gemeint ist, wer wann zu welchem Gegenstand etwas sagen darf. Dahinter steht der Befund, den das
Video einer Forscherin zuschreibt (Teresa Amabile, 26 Teams, hier nicht gegengelesen): Kreative
Arbeit leidet, wenn ständig unterbrochen wird, ohne dass sich Fortschritt zeigt.

### Rollen im Kundenprojekt

| Rolle | Wer | Aufgabe |
|---|---|---|
| Treiber | die Agentur | führt das Projekt, legt Termine und Reihenfolge fest |
| Entscheider | **genau eine** Person beim Kunden | hat das letzte Wort zur Freigabe |
| Beitragende | wenige benannte Personen | liefern Fachwissen und Rückmeldung innerhalb der Spielregeln |
| Informierte | alle übrigen | erfahren den Stand, geben keine Freigabe |

Der Grund für genau eine entscheidende Person: Bei vielen gleichberechtigten Stimmen
widersprechen sich die Rückmeldungen, und am Ende zählt, wer zuletzt schrieb. Wer nicht Entscheider ist, kann wertvolle Beiträge liefern,
aber nicht freigeben. Wer entscheidet, steht im Markenbrief, vor dem ersten Entwurf.

### Reihenfolge der Präsentation

1. **Begründung zuerst.** Ziele, Recherche und Erkenntnis aus Abschnitt 3, vor dem Entwurf.
   Der Kunde soll sehen, dass hier gearbeitet und nicht geraten wurde.
2. **Dann der Entwurf**, und zu jeder Zeile und jedem Bild ein „weil". Sektion für Sektion
   mit dem Zweck, wie im Umsetzungskonzept aus Phase 3.
3. **Dann die Spielregeln für Rückmeldung**, vor dem Öffnen der Runde.
4. **Dann die Runde.**

### Spielregeln für Rückmeldung

| Art | Wie sie geäußert wird |
|---|---|
| Sachfehler (falsche Angabe, falscher Name, falsche Zeit) | direkt, als Feststellung |
| Rechtliches und Markenvorgaben | direkt, als Feststellung |
| Alles andere (Geschmack, Gefühl, Wunsch) | als Frage, am besten „Warum" oder „Wie kam es zu" |

Beispielfragen: „Warum steht im Heldenbereich kein Button?", „Wie kam es zu dieser Überschrift?".
Der Grund: Eine Frage zwingt zum Sachverhalt, ein Urteil ohne Begründung liefert nichts, womit man
arbeiten kann. Zusätzlich hilft eine Frage nach Jeff Bezos' Art zu fragen, die das Video nennt:
„Was müsste stimmen, damit das funktioniert?" Sie öffnet die Annahmen, ohne ein Urteil zu
verlangen.

Die Spielregeln lassen sich dem Kunden einmal beibringen, meist in einem Satz. Wer sie nicht
kennt, gibt kein schlechtes Feedback aus Absicht, sondern aus Gewohnheit.

### Gebündelt statt einzeln

Rückmeldungen kommen in der Runde, nicht als Einzelnotiz zwischendurch. Einzelne Nachrichten
verwischen, wer wozu etwas gesagt hat, und unterbrechen die Arbeit am Entwurf. Das passt zur
Obergrenze aus Kapitel 29, Abschnitt 3: Die Zahl der Durchgänge ist begrenzt, und jeder weitere
Wunsch ist eine neue Anfrage.

## 7. Was nicht übernommen ist

| Teil des Videos | Grund |
|---|---|
| Beförderung, Gehaltserhöhung, Karriere als Motiv | betrifft Angestellte, nicht den Verkauf eines Entwurfs an einen Kunden |
| Der Workshop mit Brillengestellen und Filzstift | ein Format der Referentin, hier nicht verlangt; der Satz zählt, nicht das Requisit |
| Der Hinweis auf Buch und Hörbuch der Referentin | Werbung |
| Zahlen und Studien aus dem Video (Harvard, Amabile, Kahneman, Grant, Bezos, Xbox) | nur als Aussage des Videos wiedergegeben, nicht nachgelesen; keine davon trägt eine Regel allein |
| „Der Experte hat die stärkste Meinung nie" als allgemeine Wahrheit | ist eine Beobachtung der Referentin und kein Beleg; die Regel in Abschnitt 2 steht auch ohne sie |

## 8. Ungeprüft in diesem Kapitel

Es gibt keinen Evalfall dazu, ob das Kapitel das Verhalten beim Vorstellen eines Entwurfs ändert.
Das Δ ist eine Vermutung, kein Messwert. Es gibt keine neue harte Grenze und kein Prüfskript:
Das Kapitel ist Haltung und Ablauf, keine messbare Grenze. Die Quelle ist ein Transkript, kein
Buch; zitiert wird nichts wörtlich.

## Verwandte Kapitel

- Prüfen, Vokabular, Obergrenze der Durchgänge: `29-pruefdurchgaenge-und-vokabular.md`
- Strategie, Zielgruppe, „Warum dieses Unternehmen": `01-strategie-positionierung.md`
- Lesart, Regler, Vorflugcheck: `26-geschmack-und-ki-tells.md`
- Messen nach dem Livegang: `13-messung-optimierung.md`
- Texte und KI Klang: `12-copywriting.md`
- Ablauf im Bauprozess, Termine und Rollen: `../../agentur-website-builder/references/kundenabstimmung.md`
