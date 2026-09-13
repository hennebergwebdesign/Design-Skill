# Copywriting

Worte stehen aus einem Grund in einem Design: damit es leichter zu verstehen und zu benutzen
ist. Sie sind Inhalt, keine Dekoration. Dieselbe Absicht und dieselbe Sparsamkeit wie bei
Abständen und Farbe.

Copy kann eine Gestaltung genauso schablonenhaft wirken lassen wie das Layout selbst.

## Grundregeln

- **Aus Sicht des Nutzers schreiben.** Dinge heißen, wie die Zielgruppe sie nennt, nicht wie
  das System sie führt. Jemand verwaltet Benachrichtigungen, keine Webhook-Konfiguration.
- **Beschreiben statt verkaufen.** Was etwas ist und tut, in klaren Worten. Konkret und für
  Neue verständlich schlägt klug.
- **Aktiv.** Ein CTA sagt, was passiert: „Änderungen speichern", nicht „Absenden".
- **Ein Name je Aktion, durch den ganzen Ablauf.** Der Button „Veröffentlichen" erzeugt die
  Meldung „Veröffentlicht". Das Vokabular der Oberfläche ist die Beschilderung.
- **Ein Element, eine Aufgabe.** Keine Headline, die gleichzeitig erklärt, verkauft und
  zum Klick auffordert.
- **Gesprochener Ton:** einfache Verben, normale Groß-/Kleinschreibung, kein Füllwerk,
  angepasst an Marke und Publikum.

## Keine Gedankenstriche

Der Gedankenstrich als Satzzeichen ist das stärkste Erkennungsmerkmal maschinell
geschriebener Texte, im Deutschen noch deutlicher als im Englischen:

> „Schnelle Websites — die auch Anfragen bringen"
> „Ihr Partner für Sanierung – zuverlässig, termingerecht, sauber"

Beides liest sich sofort generiert. Deshalb gilt als harte Grenze:

- **Kein Halbgeviertstrich (–) und kein Geviertstrich (—) in Headlines, Subheadlines,
  Buttontexten, Linktexten, Alt-Texten und `aria-label`.** Dort ist der Befund ein Fehler.
- **Im Fließtext ebenfalls nicht** als Einschub oder Gedankenpause. Ein Einschub mit
  Strichen ist fast immer ein Satz, der zu viel gleichzeitig will.
- **Erlaubt bleibt der Bereichsstrich** bei Zahlen: „10–12 Uhr", „5–7 Tage", „2013–2026".
  Das ist Typografie, keine Rhetorik.
- **Der echte Bindestrich im Kompositum bleibt erlaubt**, wo die Rechtschreibung ihn
  verlangt: „E-Mail-Adresse", „Leckage-Ortung", „Web-App".

### Der Ersatz macht den Text besser, nicht nur regelkonform

| Statt | Besser | Warum |
|---|---|---|
| „Flachdach sanieren — ohne Produktionsstopp" | „Flachdach sanieren, ohne Produktionsstopp" | das Komma trägt denselben Bruch |
| „Leckage-Ortung in 48 Stunden – dokumentiert" | „Leckage-Ortung in 48 Stunden: dokumentiert" | der Doppelpunkt hat eine Richtung, der Strich nicht |
| „Wir prüfen das Dach — und finden die Ursache" | „Wir prüfen das Dach. Und finden die Ursache." | zwei Sätze, doppelte Betonung |
| „Unsere Leistung — Ihr Vorteil" | „Unsere Leistung, Ihr Vorteil" | der Strich war nur Dekoration |

**Der Doppelpunkt ist in Headlines meist der richtige Ersatz**, weil er eine Richtung hat:
links die Behauptung, rechts der Beweis. Der Gedankenstrich kann beides und entscheidet
sich für nichts.

Geprüft wird das nicht per Auge, sondern mit `scripts/pruefe-striche.mjs`. Eine Regel ohne
Prüfung wird in der dritten Sitzung zurückgedreht.

Zur Silbentrennung am Zeilenende siehe `02-design-ux.md` und
`../assets/vorlagen/global-basis.css`: `hyphens: auto` ist aus demselben Grund verboten,
aber das ist eine CSS-Frage, keine Textfrage.

## Above the Fold

| Element | Formel | Beispiel |
|---|---|---|
| **Headline** | Zielgruppe + Problem + Lösung | „Flachdach undicht? Wir finden die Ursache, bevor Sie das Dach erneuern." |
| **Subheadline** | Wie + konkretes Ergebnis | „Leckage-Ortung in 48 Stunden, dokumentiert, ohne Betriebsausfall." |
| **CTA** | Was passiert | „Termin zur Leckage-Ortung anfragen" |

### Headline-Muster, die tragen

- **Frage nach dem Problem** — „Rückenschmerzen, die immer wiederkommen?"
- **Ergebnis mit Zeitraum** — „Rückenschmerzen weg in 6 Wochen"
- **Negativ-USP** — „Sanieren, ohne die Produktion anzuhalten"
- **Zielgruppe direkt** — „Für Gewerbebetriebe mit Flachdach"

**Nicht:** „Herzlich willkommen", „Ihr Partner für …", „Wir über uns", „Qualität seit 1987",
„Innovative Lösungen für Ihren Erfolg".

## Buttontexte

| Statt | Besser |
|---|---|
| Absenden | Anfrage senden |
| Mehr | Leistungen ansehen |
| Hier klicken | Termin buchen |
| Kontakt | Kostenloses Erstgespräch buchen |
| Weiter | Zur Kasse |

Ein Button beschreibt sein Ergebnis. „Jetzt" ist erlaubt, „Jetzt hier klicken" nicht.
Der Primär-CTA behält seinen Text über die ganze Seite (siehe `06-conversion-architektur.md`).

## Fehler und Leere als Wegweiser

Fehlermeldungen erklären, **was passiert ist und wie es weitergeht** — in der Stimme der
Oberfläche, nicht als Person. Sie entschuldigen sich nicht und sie bleiben nie vage.

| Statt | Besser |
|---|---|
| „Ein Fehler ist aufgetreten." | „Die Nachricht wurde nicht gesendet. Versuchen Sie es erneut oder schreiben Sie an info@…" |
| „Ungültige Eingabe." | „Diese E-Mail-Adresse fehlt ein @. Bitte prüfen." |
| „Leider ist etwas schiefgelaufen. Wir entschuldigen uns!" | „Das Formular ist gerade nicht erreichbar. Rufen Sie uns an: 0123 456789" |

Ein leerer Zustand ist eine Einladung zum Handeln, keine Stimmung. „Noch keine Anfragen.
Teilen Sie den Link, um die erste zu bekommen" statt „Hier ist es noch leer".

## Struktur langer Texte

- **Zwischenüberschriften alle 2–4 Absätze**, die für sich gelesen die Geschichte erzählen.
- **Absätze mit maximal 3–4 Sätzen.** Auf dem Handy wirkt ein fünfzeiliger Absatz wie eine
  Wand.
- **Listen für Aufzählungen**, Fließtext für Zusammenhänge. Eine Liste aus Halbsätzen, die
  eigentlich ein Argument ist, verliert das Argument.
- **Fett für Begriffe, nicht für Betonung.** Wenn alles wichtig ist, ist nichts wichtig.
- **Zahlen konkret:** „34 % mehr Anfragen im Schnitt über 350 Projekte" statt „deutlich mehr
  Anfragen". Und nur, wenn die Zahl belegbar ist.

## Duzen oder siezen

Eine Entscheidung, konsequent durchgezogen — inklusive Formularhinweisen,
Fehlermeldungen, Bestätigungsmails und Rechtstexten, soweit dort möglich. Der häufigste
Bruch entsteht in Systemtexten, die jemand anders geschrieben hat.

Faustregel: B2B-Handwerk und -Dienstleistung in Deutschland eher „Sie", junge
Endkundenmarken und DTC eher „du". Im Zweifel beim Kunden erfragen, nicht raten.

## Nicht erfinden

Kein Zitat ohne Quelle, keine Bewertung ohne Beleg, keine Zahl ohne Rechenweg, keine
Referenz ohne Freigabe. Fehlt etwas, steht `[[FEHLT: …]]` im Text und der Punkt in der Liste
offener Punkte. Eine erfundene Kundenstimme ist nach § 5 UWG angreifbar — und sie fliegt
spätestens auf, wenn jemand den Namen sucht.

Für Texte, die als Vorschlag entstehen und noch abgestimmt werden müssen, hilft eine
sichtbare Entwicklungsmarkierung im CSS, die nie in Produktion erscheint:

```css
[data-copy-vorschlag] { outline: 2px dashed var(--farbe-fehler); }
[data-copy-vorschlag]::before { content: 'Copy Vorschlag, mit Kunde abstimmen'; /* … */ }
```
