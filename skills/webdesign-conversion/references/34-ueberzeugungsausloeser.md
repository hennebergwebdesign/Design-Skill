# Überzeugungsauslöser nach Stufe der Seite

`12-copywriting.md` sagt, wie ein Text gebaut und geprüft wird, `06-conversion-architektur.md`
sagt, was wohin gehört. Dieses Kapitel enthält nur, was dort fehlte: sechs Auslöser, die
bestimmen, **wie** ein Satz an einer bestimmten Stelle der Seite formuliert wird. Alles, was
dort schon steht (Botschaftsbogen, Einwände, Risiko am Button, ein starker Beleg statt vieler,
die Grenze zur Irreführung), wird nicht wiederholt, sondern verlinkt.

Die Substanz stammt aus dem YouTube Video „Words That SELL (Psychology-Backed)" von Joanna Wiebe
(Copyhackers), siehe `CREDITS.md`, Abschnitt „Version 4.7". Das Video ordnet neun Auslöser den
drei Stufen eines Verkaufstrichters zu. Die psychologische Erklärung dahinter (zwei Denksysteme,
ein schnelles und ein prüfendes) ist hier nicht nachgelesen und trägt keine Regel allein: jede
Regel unten steht auch ohne sie, mit eigenem Grund.

## 1. Die drei Stufen als Stellen der Seite

| Stufe | Frage des Besuchers | Stelle auf der Seite | Auslöser in diesem Kapitel |
|---|---|---|---|
| Oben | „Bin ich hier richtig?" | Heldenbereich, erste Sektion | Abschnitte 2 und 3 |
| Mitte | „Klappt das bei jemandem wie mir?" | Leistung, Ablauf, Beweis, Einwände | Abschnitte 4, 5 und 6 |
| Unten | „Was mache ich jetzt?" | Angebot, Preise, Abschluss | Abschnitte 7 und 8 |

Die Stufen sind kein neuer Seitenaufbau: Sie stehen quer zum Botschaftsbogen in
`12-copywriting.md`. Wer etwas verkaufen will, bevor die Stufe darüber geklärt ist, bekommt
Skepsis statt einer Anfrage.

## 2. Oben: Die Zielgruppe ansprechen, ohne ihr etwas vorzuwerfen

Der Heldenbereich muss in einer Sekunde sagen, für wen die Seite ist. Zwei Fehler kosten hier
am meisten:

| Fehler | Beispiel | Besser | Grund |
|---|---|---|---|
| Zu breit | „Lösungen für Ihr Unternehmen" | „Flachdach undicht? Für Hallenbetreiber in NRW" | wer sich nicht sofort einordnen kann, scrollt weiter |
| Vorwurf in der Anrede | „Die meisten Betriebe machen ihre Seite falsch." | „Für Betriebe, die ihre Seite schon haben und mehr Anfragen wollen." | wer sich angegriffen fühlt, verteidigt sich, statt weiterzulesen |

Zwei Fragen vor jeder Überschrift und Unterzeile im Heldenbereich:

* Erkennt sich die Zielgruppe in einem Satz wieder, in ihren eigenen Worten (Vokabular aus
  Abschnitt 2 des Markenbriefs)?
* Impliziert der Satz, dass die Leser etwas falsch machen, falsch verstanden haben oder
  nachlässig waren? Wenn ja, umschreiben: die Lage benennen, nicht die Person.

Das Vorwurfsmuster ist messbar und in `scripts/deslop-check.mjs` als Satzmuster
„Vorwurf an den Leser" hinterlegt, ebenso „Absolutes Versprechen" für Abschnitt 5. Ausgenommen ist, was der Kunde so liefert: gelieferte Texte
werden nach `copy-im-kundenprojekt.md` gemeldet und nicht still geändert.

## 3. Oben: Leicht lesen vor überzeugend lesen

Im oberen Teil gibt es noch nichts zu verkaufen, deshalb gilt: kurze Sätze, bekannte Wörter,
ein gleichmäßiger Rhythmus. Die Satzlängen und Zielwerte stehen in `12-copywriting.md` unter
„Verständlichkeit messen". Neu ist nur die Probe:

* **Laut vorlesen und markieren, wo man stolpert.** Jede Stolperstelle ist Reibung und wird
  umgeschrieben, nicht erklärt.
* **Drei Fragen an jeden Satz oben:** verlangt er, dass der Leser etwas entscheidet? Impliziert er,
  dass der Leser falschliegt? Macht er dem Leser etwas schwerer? Bei jedem Ja neu schreiben.

Grund: Wer oben schon abwägen muss, hat noch keinen Anlass, weiterzulesen.

## 4. Mitte: Das Wirkprinzip benennen

Eine Behauptung wie „Wir machen Ihre Seite schneller" löst die Frage „Wie denn?" aus. Hat die
Leistung ein echtes Verfahren, das erklärt, warum sie funktioniert, bekommt es einen Namen und
einen Satz, bevor die Frage entsteht.

Satzgerüst: „Das funktioniert, weil **[Name des Verfahrens]**, das **[konkretes Ergebnis]**."

| Statt | Besser | Bedingung |
|---|---|---|
| „Wir finden jede Leckage." | „Wir orten Leckagen per Thermografie und Feuchtemessung: Sie sehen im Protokoll, wo das Wasser eintritt." | das Verfahren ist wirklich das, was der Betrieb einsetzt |
| „Ihre Website bringt mehr Anfragen." | „Jede Seite hat genau eine Handlung. Besucher wissen, was als Nächstes passiert." | die Aussage beschreibt, was gebaut wird |

* **Der Test:** Lässt sich das Gerüst nicht in etwa zehn Wörtern füllen, gibt es noch kein
  Wirkprinzip, und der Text bleibt bei der konkreten Leistung (`12-copywriting.md`, „Das Angebot
  formulieren").
* **Der Name kommt vom Kunden.** Ein Wirkprinzip wird nie erfunden, um besser zu klingen, und ein
  Fantasiename für ein gewöhnliches Verfahren ist Irreführung, siehe „Die Grenze zur Irreführung".
  Fehlt es, steht `[[FEHLT: Wirkprinzip, falls vorhanden]]` im Markenbrief.
* **Grund:** Wer erklären kann, warum etwas funktioniert, nimmt dem Zweifel den Anlass, und
  zwar, bevor er laut wird.

## 5. Mitte: Realistisch behaupten

Absolute Versprechen wecken Misstrauen, noch bevor der Besucher den Rest gelesen hat.

| Statt | Besser |
|---|---|
| „Verdoppeln Sie Ihre Anfragen, garantiert." | „Bei neun von zehn Kunden stiegen die Anfragen innerhalb eines Jahres um mehr als die Hälfte." |
| „Ihre Seite in 24 Stunden online." | „Die meisten Seiten gehen nach sechs Wochen live." |
| „Alle Kunden sind begeistert." | „4,8 von 5 bei 123 Bewertungen, Stand 06.10.2026." |

Drei Merkmale machen eine Behauptung glaubwürdig: ein **Zeitrahmen**, eine **Quote statt „alle"**
und **„mehr als" statt einer exakten, zu glatten Zahl**.

**Die Grenze davor:** Diese Zahlen müssen echt sein. Sie stammen aus Daten des Kunden, nie aus
dem Modell (`12-copywriting.md`, „Nicht erfinden"). Ist keine Quote belegt, bleibt die Aussage
qualitativ („Die meisten Kunden …" nur, wenn es stimmt) oder entfällt. Heilversprechen, Garantien
und Erfolgszusagen unterliegen zusätzlich dem Recht, siehe `07-recht-dsgvo.md` und „Die Grenze zur
Irreführung" in `12-copywriting.md`. Alle Zahlen in den Beispielen dieses Kapitels sind erfunden, um die
Form zu zeigen, und gehören nie auf eine Kundenseite.

## 6. Mitte: Den Einwand in einem ruhigen Satz erledigen

Weiche Einwände („Ist das kompliziert?", „Muss ich mich dauerhaft binden?", „Ersetzt das meine
Arbeit?") bekommen keinen Absatz. Ein einziger sachlicher Satz in neutralem Ton nimmt ihnen die
Spannung, und wer sie dramatisiert, verstärkt sie.

Vorgehen: die drei größten Einwände des Zielgruppenprofils aufschreiben (Abschnitt 4 des
Markenbriefs), je einen Satz ohne Ausrufezeichen, ohne Beteuerung und ohne Aufzählung.

| Einwand | Ruhiger Satz |
|---|---|
| „Bin ich danach vertraglich gebunden?" | „Der Vertrag läuft einen Monat und verlängert sich nicht von selbst." |
| „Muss ich dafür ein Techniker sein?" | „Sie pflegen Texte und Bilder in einer Eingabemaske, mehr nicht." |

Wo er steht, steht in `12-copywriting.md`, „Einwände beantworten, nicht umgehen". Neu ist nur die
Form. Der Satz stimmt oder er steht nicht da: Ein Satz, der etwas verspricht, was der Vertrag
nicht hält, ist ein Verstoß, keine Beruhigung.

## 7. Unten: Drei echte Optionen, wenn es sie gibt

Hat der Kunde tatsächlich mehrere Wege, zeigt der Abschluss drei, mit dem passenden als erkennbar
vernünftige Mitte. Die Gerüstform: **nichts tun**, **extern vergeben**, **selbst aufbauen** oder
die drei Pakete des Betriebs (Basis, Standard, Komplett).

* **Nur echte Optionen.** Ein Paket, das der Kunde nicht anbietet, wird nicht erfunden, um eine
  Dreierstruktur zu bekommen, und kein Preis wird zum Anker konstruiert, siehe die Tabelle zum
  Preisanker in `12-copywriting.md`.
* **Genau drei sind die Regel, aber kein Zwang.** Bietet der Betrieb zwei Leistungen an, stehen
  zwei da. Mehr als vier Optionen lähmen, die Auswahl wird vorab verengt.
* **Die Mitte ist eine Entscheidung, keine Falle.** Sie wird begründet („für die meisten
  Betriebe in dieser Größe"), nicht optisch erzwungen. Eine hervorgehobene Karte folgt den
  Heldenregeln und Sperren aus `26-geschmack-und-ki-tells.md`.

Grund: Menschen wollen einen gangbaren Weg, den sie vor anderen vertreten können, keine
unendliche Auswahl.

## 8. Unten: Die Einschränkung selbst nennen

Wer den Preis des Ergebnisses verschweigt, wirkt, als verberge er etwas. Wer ihn einmal
vor dem Abschluss selbst nennt, gewinnt Vertrauen.

Formel: **Ergebnis, aber Einschränkung oder Aufwand.**

| Statt | Besser |
|---|---|
| „Ihre neue Seite, fertig in sechs Wochen." | „Ihre neue Seite in sechs Wochen, wenn Texte und Bilder bis Woche zwei bei uns sind." |
| „Mehr Anfragen über Google." | „Mehr Anfragen über Google, sichtbar nach etwa drei bis sechs Monaten." |

* **Einmal, direkt vor dem Abschluss**, nicht in jedem Absatz. Sie ist die Antwort auf
  Prüfung 7 (Risiko) aus `12-copywriting.md`: nennt, was stimmt.
* **Die Einschränkung ist wahr.** Eine erfundene Einschränkung, die den Rest stärker aussehen
  lässt, ist ebenso Täuschung wie ein erfundener Vorteil.
* Das ist **keine** Rechtsklausel: Pflichtangaben, Preisangaben und Widerrufsinformationen sind
  davon unberührt und stehen nach `07-recht-dsgvo.md`.

## 9. Was bewusst nicht übernommen ist

| Teil des Videos | Grund |
|---|---|
| Die Erklärung über zwei Denksysteme als Begründung jeder Regel | hier nicht nachgelesen, jede Regel hat einen eigenen Grund |
| Der Prozentwert, den das Video für einen Anstieg nennt | nicht prüfbar, keine Regel hängt daran |
| Das Beispiel mit Namen großer Unternehmen als Beleg | gehört in keine Kundenseite, belegt nichts für einen anderen Betrieb |
| Der Hinweis auf Buch und Hörbuch der Referentin | Werbung |
| „Ein Beweis, die anderen streichen" als absolute Regel | in `06-conversion-architektur.md` gilt: Vertrauenselemente dürfen sich wiederholen. Hier zählt nur: pro Stelle ein starker Beleg, nicht vier schwache nebeneinander |

## 10. Ungeprüft

Es gibt keinen Evalfall dazu, ob dieses Kapitel die Texte verbessert, das Δ ist eine Vermutung.
Die Beispiele sind nicht an echten Kundentexten erprobt. Maschinell geprüft ist nur, was das
Skript prüfen kann: die beiden Satzmuster aus Abschnitt 2 und 5, mit Tests.

## Verwandte Kapitel

- Aufbau, Einwände, Angebot, Prüfungen: `12-copywriting.md`
- Trust-Elemente, Platzierung: `06-conversion-architektur.md`
- Zielgruppe, „Warum dieses Unternehmen": `01-strategie-positionierung.md`
- Markenbrief mit Feldern für Wirkprinzip, stärksten Beleg, Einschränkung: `../assets/vorlagen/marke-brief.md`
- Texte im Kundenprojekt: `../../agentur-website-builder/references/copy-im-kundenprojekt.md`
- Gespräch mit dem Kunden darüber: `33-kundenpraesentation-und-feedback.md`
