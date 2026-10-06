# Autorität im Text: Aussagen, Rahmen, FAQ

`12-copywriting.md` baut und prüft Texte, `34-ueberzeugungsausloeser.md` sagt, welcher Satz an
welche Stelle der Seite gehört. Dieses Kapitel regelt den Ton darunter: woran ein Besucher
erkennt, dass hier jemand weiß, wovon er spricht, und warum er deshalb einer Aussage glaubt.
Besonders wichtig ist das in der FAQ, im Preisabschnitt und überall dort, wo ein Einwand
beantwortet wird.

Die Substanz stammt aus dem YouTube Video „Use Words Like This To Make Anyone Respect you" von
Joanna Wiebe (Copyhackers), siehe `CREDITS.md`, Abschnitt „Version 4.8". Das Video richtet sich an
Menschen im Gespräch, Verkauf und Verhandlung. Übernommen ist, was sich auf geschriebene Seiten
übertragen lässt. Körpersprache, Stimme und Schweigen in einem Termin gehören nicht dazu (Abschnitt 8).

## 1. Autorität ist Genauigkeit, nicht Lautstärke

Respekt entsteht im Text aus drei Dingen: Aussagen ohne Absicherung, Zahlen und Namen statt
Allgemeinheiten, und ein Rahmen, den die Seite setzt, bevor jemand ihn setzt. Ausrufezeichen,
Superlative und Beteuerungen gehören nicht dazu, sie wirken wie das Gegenteil und sind in
`12-copywriting.md` und `deslop-check.mjs` schon ausgeschlossen.

## 2. Weichmacher streichen

Jedes Wort, das eine Aussage abschwächt, sagt dem Leser: Der Schreibende glaubt sich selbst nicht
ganz. Gestrichen werden Wörter, die nichts zur Information beitragen.

| Streichen | Statt | Grund |
|---|---|---|
| eigentlich, irgendwie, quasi, sozusagen, gewissermaßen | die Aussage ohne das Wort | das Wort verwässert, ohne etwas zu sagen |
| vielleicht, eventuell, möglicherweise (ohne echten Grund) | die Aussage, oder die Bedingung konkret | „vielleicht" ist keine Auskunft |
| ein bisschen, ein wenig | die Menge, wenn bekannt | Menge ist Information |
| „wir denken, dass", „ich glaube", „wir glauben" | „Das Ergebnis:", „Wir haben gemessen:" | Meinung wird zur Aussage, siehe `33-kundenpraesentation-und-feedback.md`, Abschnitt 2 |
| „es scheint, dass", „es kann sein" | was wirklich bekannt ist | Unsicherheit ist keine Haltung, sondern eine Lücke |

**Die Grenze davor.** Echte Unsicherheit wird nicht überspielt, sondern **einmal und konkret**
benannt: „Ob die Fassade trocken ist, wissen wir nach der Messung am ersten Termin", nicht
„vielleicht lässt sich das eventuell klären". Rechtliche und medizinische Vorbehalte („keine
Rechtsberatung") bleiben stehen, weil sie vorgeschrieben oder sachlich nötig sind. Das Skript `scripts/deslop-check.mjs`
meldet Weichmacher als Satzmuster „Weichmacher"; ob einer berechtigt ist, entscheidet, wer den Text verantwortet.

Der Grund für die Streichung ist die Wirkung, nicht der Stil: Ein Text voller Absicherungen
unterstellt dem Leser, er müsse selbst herausfinden, was stimmt.

## 3. Die Satzleiter: Befund, dann Grund

Die stärkste Form einer Behauptung ist ein belegter Befund. Der Grund macht sie nachvollziehbar.

| Stufe | Form | Beispiel |
|---|---|---|
| 1 | Befund, kurz | „Die Anfragen stiegen um die Hälfte." |
| 2 | Befund mit Grund | „Die Anfragen stiegen um die Hälfte, weil jede Seite nur noch eine Handlung hat." |
| nie | Gefühl oder Möglichkeit | „Wir glauben, dass sich mehr Anfragen ergeben könnten." |

* **Standard sind kurze, sichere Aussagen.** Lange, verschachtelte Sätze schwächen eher, als sie
  stützen.
* **Stufe 1 und 2 nur mit echten Daten des Kunden.** Das Beispiel oben zeigt die Form und enthält
  erfundene Zahlen. Ohne Beleg bleibt die Aussage qualitativ oder entfällt, siehe „Nicht erfinden"
  in `12-copywriting.md`.
* **Vor dem Livegang gibt es keine eigenen Messwerte.** Dann stützt sich die Aussage auf die Regel
  oder das Verfahren, nicht auf ein Ergebnis, das es noch nicht gibt.

## 4. Präzision, die man benennen kann

Zahlen und Namen zeigen, dass jemand gemessen hat. Das Video setzt „47 Unternehmen, im Schnitt 34 %
mehr" gegen „vielen Unternehmen deutlich geholfen". Die Regel dazu steht schon in `12-copywriting.md`
(Prüfung 5, Konkretheit) und in `34-ueberzeugungsausloeser.md`, Abschnitt 4 (Wirkprinzip). Neu ist
nur ein Satz: **Ein Fachwort, das der Betrieb wirklich benutzt und erklärt, ist ein Beleg für Wissen.**
„Thermografie" mit einem Halbsatz zur Erklärung trägt mehr als „modernste Verfahren". Das Wort muss
das Verfahren des Kunden sein.

## 5. Rahmen setzen, bevor der Einwand kommt

Das Video nennt es „Frame Control": Wer das Gespräch beginnt, bestimmt, worüber geredet wird. Wer
auf einen fremden Rahmen antwortet („Es geht um den Preis"), verteidigt. Auf einer Seite heißt das:
Die Antwort steht dort, wo die Frage entsteht, und sie beginnt mit der Passung, nicht mit der
Rechtfertigung.

| Statt | Besser | Wirkung |
|---|---|---|
| „Unsere Preise sind fair, wir bieten Qualität." | „Wir arbeiten mit Betrieben, die eine Seite wollen, die Anfragen bringt, nicht nur Besucher. Das Honorar richtet sich nach dem Umfang: …" | die Seite beschreibt, für wen sie ist, statt zu verteidigen |
| „Warum sind wir teurer als andere?" | „Für wen das passt: Betriebe, die …" | Auswahl statt Rechtfertigung |

* **Nur wenn es stimmt.** Eine Passungszeile („für wen" und „für wen nicht") ist nur dann ehrlich,
  wenn der Betrieb tatsächlich so auswählt. Ein Betrieb, der jeden Auftrag annimmt, schreibt sie
  nicht, um exklusiv zu wirken. Das ist die Grenze zur Irreführung aus `12-copywriting.md`.
* **Kein Druck.** Der Rahmen schließt nicht aus, um Verknappung zu erzeugen, siehe dieselbe Tabelle.
* **Vor dem Einwand, nicht danach.** Der Satz „Das ist eine Investition" gehört neben den Preis, bevor
  „zu teuer" gedacht wird, nicht in eine Rechtfertigung darunter. Wohin welcher Einwand gehört, steht
  in `12-copywriting.md`, „Einwände beantworten, nicht umgehen".

## 6. Fragen, die führen

Eine gute Frage wirkt überlegener als eine Behauptung, weil sie zeigt, dass jemand weiter denkt.
Das Video nennt drei Arten:

| Art | Zweck | Beispiel | Wo auf der Seite |
|---|---|---|---|
| Folgenfrage | benennt ein Risiko, das der Leser nicht bedacht hat | „Was passiert, wenn der nächste Frost kommt, bevor das Dach dicht ist?" | Problemsektion, Schritt 2 des Bogens |
| Umdeutungsfrage | rückt das Problem in einen anderen Zusammenhang | „Ist das ein Dachproblem oder ein Feuchteproblem?" | Überleitung zum Wirkprinzip |
| Annahmenfrage | fragt, worauf eine Meinung beruht, ohne zu widersprechen | „Woran machen Sie fest, dass Ihre Kunden mehr Seiten wollen?" | Briefinggespräch, nicht Seitentext |

* **Sparsam, höchstens eine je Sektion.** Eine Reihe von Fragen wirkt wie Rhetorik. Eine Frage, die der Text
  gleich selbst beantwortet, meldet `deslop-check.mjs` als „Selbstbeantwortete Frage".
* **Nie als Angstmittel.** Eine Folgenfrage nennt eine echte, benennbare Folge. Eine übertriebene oder
  erfundene Gefahr ist Druck und nach der Tabelle zur Irreführung ausgeschlossen.
* **Die Annahmenfrage ist ein Werkzeug des Gesprächs.** Sie gehört in die Abstimmung mit dem Kunden, siehe
  `33-kundenpraesentation-und-feedback.md`, Abschnitt 4, nicht auf die Seite.

## 7. Die FAQ

Eine FAQ ist die Stelle, an der ein Besucher am genauesten liest, was er wissen will. Hier entscheidet
der Ton, ob er dem Betrieb glaubt. Die Auswahl der Fragen steht in `12-copywriting.md` und
`06-conversion-architektur.md`; hier steht, wie geantwortet wird.

| Regel | Beispiel | Grund |
|---|---|---|
| **Die erste Antwort ist die Antwort.** Ja, Nein, die Zahl, die Dauer. Dann der Grund, dann der nächste Schritt. | „Ja. Die Messung dauert drei Stunden und findet in der Regel an einem Termin statt. Das Protokoll bekommen Sie am nächsten Werktag." | wer die Antwort suchen muss, glaubt der Antwort weniger |
| **Keine Weichmacher.** Eine Einschränkung genau einmal und konkret. | „Die Reparatur hält zwölf Jahre, vorausgesetzt der Untergrund ist trocken. Das prüfen wir vorher." | Abschnitt 2 und `34-ueberzeugungsausloeser.md`, Abschnitt 8 |
| **Die Frage in den Worten des Besuchers.** | „Was kostet eine Leckage-Ortung?", nicht „Preisgestaltung" | Vokabular der Zielgruppe, Markenbrief Abschnitt 2 |
| **Der Preiseinwand bekommt eine Antwort, kein Ausweichen.** Spanne, Startpreis oder Berechnungsgrundlage. | „Ab 890 € netto pauschal, unabhängig von der Dachfläche." | `06-conversion-architektur.md`: „Preis auf Anfrage" filtert auch gute Anfragen. Ohne Preis steht, wovon er abhängt und wann das Angebot kommt |
| **Antworten mit zwei bis vier Sätzen.** Mehr gehört in eine eigene Sektion mit Link. | | wird gescannt, nicht gelesen, und lange Antworten verbergen die Aussage |
| **Echte Fragen.** Aus Anfragen, E-Mails, Telefonaten des Kunden, nie aus der Vorstellung eines Modells. | | „Nicht erfinden" in `12-copywriting.md`, und `05-seo-sichtbarkeit.md`: FAQ-Markup nur mit Fragen und Antworten, die so auf der Seite stehen |
| **Keine Entschuldigung in der Antwort.** | nicht: „Leider können wir das nicht." Sondern: „Das machen wir nicht. Dafür empfehlen wir …" | `33-kundenpraesentation-und-feedback.md`, Abschnitt 4 |
| **Eine Antwort pro Absatz, zitierfähig.** | | `31-ki-sichtbarkeit-geo.md`, Abschnitt 3: ein Absatz trägt eine Aussage und steht für sich |

Die Zahlen in den Beispielen dieser Tabelle sind erfunden, um die Form zu zeigen, und gehören nie auf
eine Kundenseite.

## 8. Was bewusst nicht übernommen ist

| Teil des Videos | Grund |
|---|---|
| Körperhaltung, Mimik, Stimme, „Autoritätsgesicht" | betrifft das Auftreten im Raum, nicht den Text einer Seite |
| Strategisches Schweigen nach der Preisnennung | Verhandlungstaktik im Gespräch; für eine Seite ohne Gegenüber gibt es kein Äquivalent |
| Prozentwerte (47 %, 35 %, 30 %, 40 %) und die Studien, die das Video nennt | nicht nachgelesen, nicht prüfbar, keine Regel hängt daran |
| Anekdoten über Verkaufsgespräche mit großen Kunden | belegen nichts für einen anderen Betrieb |
| Der Hinweis auf Buch und Hörbuch der Referentin | Werbung |
| „Rule of One" (ein Leser, eine Idee, ein Versprechen, ein Angebot) als neue Regel | deckt sich mit der Kernbotschaft in `12-copywriting.md` und der einen Hauptaktion in `06-conversion-architektur.md`, daher nicht doppelt aufgenommen |

## 9. Ungeprüft

Es gibt keinen Evalfall dazu, ob das Kapitel Texte überzeugender macht, das Δ ist eine Vermutung. Die
deutsche Weichmacherliste ist eine eigene Zusammenstellung und nicht aus dem Video übernommen, das nur
englische Wörter nennt. Das Prüfskript kennt sie, aber nicht jeden Kontext: In einem Rechtstext oder
einer Frage des Besuchers ist ein „vielleicht" in Ordnung.

## Verwandte Kapitel

- Aufbau, Einwände, FAQ als Conversion Element, sieben Prüfungen: `12-copywriting.md`
- Auslöser nach Stelle der Seite: `34-ueberzeugungsausloeser.md`
- Aussagen statt Geschmack, Fragen statt Verteidigung: `33-kundenpraesentation-und-feedback.md`
- FAQ Platzierung, Preise zeigen: `06-conversion-architektur.md`
- FAQ Markup: `05-seo-sichtbarkeit.md`, `../assets/vorlagen/jsonld-bausteine.md`
- zitierfähige Absätze: `31-ki-sichtbarkeit-geo.md`
