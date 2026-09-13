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

### Auch nicht vorangestellt: Kicker und Eyebrow-Labels

Dieselbe Regel gilt für das kleine Label über der Headline (Kicker, Eyebrow, Vorspann):
kein Strich davor, egal ob als Textzeichen oder als dekoratives Linien-Element im Markup.

> „— Was wir machen" über „Acht Gewerke, ein Ansprechpartner"

ist derselbe Fehler wie ein Gedankenstrich in der Headline selbst, nur eine Zeile höher, und
fällt unter dasselbe Muster „Schablonen-Chrome" aus `10-visuelle-richtung.md`. Ein
Kicker-Label steht entweder ohne jedes Präfix, oder das Präfix ist ein bewusst gestaltetes
Element, das zur Marke gehört (ein farbiger Punkt, ein kurzer Balken in Akzentfarbe), nie ein
Strich- oder Bindestrich-Zeichen.

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

- **Frage nach dem Problem:** „Rückenschmerzen, die immer wiederkommen?"
- **Ergebnis mit Zeitraum:** „Rückenschmerzen weg in 6 Wochen"
- **Negativ-USP:** „Sanieren, ohne die Produktion anzuhalten"
- **Zielgruppe direkt:** „Für Gewerbebetriebe mit Flachdach"

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

Fehlermeldungen erklären, **was passiert ist und wie es weitergeht:** in der Stimme der
Oberfläche, nicht als Person. Sie entschuldigen sich nicht und sie bleiben nie vage.

| Statt | Besser |
|---|---|
| „Ein Fehler ist aufgetreten." | „Die Nachricht wurde nicht gesendet. Versuchen Sie es erneut oder schreiben Sie an info@…" |
| „Ungültige Eingabe." | „Diese E-Mail-Adresse fehlt ein @. Bitte prüfen." |
| „Leider ist etwas schiefgelaufen. Wir entschuldigen uns!" | „Das Formular ist gerade nicht erreichbar. Rufen Sie uns an: 0123 456789" |

Ein leerer Zustand ist eine Einladung zum Handeln, keine Stimmung. „Noch keine Anfragen.
Teilen Sie den Link, um die erste zu bekommen" statt „Hier ist es noch leer".

## Die Botschaftshierarchie

Eine Seite trägt genau **eine** Kernbotschaft. Alles andere stützt sie. Wer das nicht
festlegt, schreibt fünf gleich laute Aussagen, und der Besucher merkt sich keine.

```
Kernbotschaft         ein Satz, der den Nutzen trägt
  ↓
Drei Stützen          je eine Aussage, die die Kernbotschaft glaubhaft macht
  ↓
Je Stütze ein Beweis  Zahl, Referenz, Zitat oder Bild, mit Quelle
```

**Die Prüfung:** Deck die Seite ab und frag jemanden, was hängengeblieben ist. Kommt die
Kernbotschaft nicht, ist sie nicht die Kernbotschaft, sondern eine von fünf.

### Der Bogen, der auf jeder Verkaufsseite trägt

Nicht als Schema abarbeiten, sondern als Prüfung, ob etwas fehlt:

| Schritt | Frage, die der Besucher stellt | Wo es steht |
|---|---|---|
| 1 Er hat ein Problem | „Kennen die mein Problem?" | Held, Problemsektion |
| 2 Es kostet ihn etwas | „Was passiert, wenn ich nichts tue?" | Problemsektion |
| 3 Es gibt einen Weg | „Wie läuft das?" | Lösung, Ablauf |
| 4 Der Weg funktioniert | „Bei wem hat das geklappt?" | Beweis, Referenzen |
| 5 Er schafft das | „Ist das aufwendig für mich?" | Ablauf, Angebot |
| 6 Der nächste Schritt ist klein | „Was passiert, wenn ich klicke?" | CTA |

**Der am häufigsten fehlende Schritt ist 2.** Ohne die Kosten des Nichthandelns ist jede
Lösung nur ein Angebot unter vielen. Mit ihnen ist sie eine Antwort.

**Der am häufigsten überladene Schritt ist 6.** Der CTA macht den nächsten Schritt klein, er
verkauft nicht den ganzen Vertrag.

## Das Angebot formulieren

Ein Angebot ist nicht „unsere Leistung". Es ist das, was der Kunde bekommt, in seiner
Rechnung.

| Baustein | Frage | Beispiel |
|---|---|---|
| **Ergebnis** | Was ist danach anders? | „Sie wissen, wo das Dach undicht ist, mit Protokoll." |
| **Weg dorthin** | Was passiert konkret? | „Thermografie und Feuchtemessung, ein Termin, 3 Stunden." |
| **Zeit** | Wie lange? | „Ergebnis innerhalb von 48 Stunden." |
| **Preis** | Was kostet es? | „890 € netto pauschal, unabhängig von der Dachfläche." |
| **Risiko** | Was, wenn nicht? | „Finden wir keine Ursache, zahlen Sie die Hälfte." |

**Der Preis gehört dazu, wenn er möglich ist.** „Preis auf Anfrage" filtert nicht nur
schlechte Leads aus, sondern auch gute. Eine Spanne, ein Startpreis oder eine
Beispielrechnung ist besser als keine Angabe (`06-conversion-architektur.md`).

**Die Risikoumkehr ist der stärkste Baustein und der, bei dem am meisten schiefgeht.** Sie
muss echt und einlösbar sein. Eine Garantie, die der Kunde nicht halten kann oder will, ist
schlimmer als keine.

### Die Grenze zur Irreführung

Verkaufspsychologie liefert Werkzeuge, und einige davon sind in Deutschland rechtswidrig oder
grenzwertig. Diese Grenze gilt unabhängig davon, was ein Marketingratgeber empfiehlt:

| Werkzeug | Erlaubt, wenn | Verboten |
|---|---|---|
| Verknappung | Bestand oder Kapazität echt sind und stimmen | erfundene Stückzahlen, Dauerzähler, ein „nur heute", das jeden Tag steht |
| Dringlichkeit | die Frist echt ist (Aktionsende, Kontingent) | Countdown, der beim Neuladen zurückspringt |
| Sozialer Beweis | Zahlen und Stimmen belegt und freigegeben sind | erfundene Kundenstimmen, gekaufte Bewertungen, Fantasienamen |
| Autorität | Zertifikat, Mitgliedschaft oder Auszeichnung vorliegt | Siegel ohne Nutzungsrecht, „ausgezeichnet" ohne Auszeichnung |
| Preisanker | der Vergleichspreis real verlangt wurde | Streichpreis, der nie gegolten hat |

Unechte Verknappung und erfundene Bewertungen sind Irreführungen nach § 5 UWG, bei
Bewertungen inzwischen ausdrücklich geregelt. Das ist abmahnfähig, und es fliegt auf.

**Die Haltung dahinter:** Diese Werkzeuge sind nicht deshalb erlaubt, weil sie wirken,
sondern nur dann, wenn sie wahr sind. Ein Beweis, der stimmt, wirkt ohnehin stärker als einer,
der erfunden ist, weil er Rückfragen übersteht.

## Einwände beantworten, nicht umgehen

Die fünf Einwände aus `../assets/vorlagen/marke-brief.md` Abschnitt 4 gehören auf die Seite,
und zwar dort, wo sie entstehen, nicht gesammelt am Ende.

| Einwand | Wo die Antwort steht | Form |
|---|---|---|
| „Zu teuer" | direkt neben dem Preis | Was enthalten ist, was der Vergleich kostet |
| „Keine Zeit jetzt" | in der Problemsektion | Was das Warten kostet |
| „Machen wir selbst" | im Ablauf | Wo es üblicherweise scheitert, ohne Häme |
| „Funktioniert das?" | im Beweis | Ein belegter Fall, nicht drei behauptete |
| „Was, wenn es schiefgeht?" | am CTA | Risikoumkehr oder Ausstieg |

**Einen Einwand offen zu benennen wirkt stärker, als ihn zu umgehen.** „Wir sind nicht die
günstigsten" schafft Glaubwürdigkeit für alles, was danach kommt. Das ist derselbe Mechanismus
wie beim Negativ-USP.

**Die FAQ ist nicht die Restrampe für Einwände.** Sie beantwortet Fragen, die vor dem Kauf
wirklich gestellt werden. Ein Einwand, der die Kaufentscheidung blockiert, gehört in die
Sektion, in der er entsteht.

## Deutsch: sechs Eigenheiten, die Texte schwer machen

Zusätzlich zu den Grundregeln, und für deutsche Verkaufstexte besonders relevant.

### 1 Nominalstil auflösen

Das Hauptproblem deutscher Unternehmenstexte. Substantivierte Verben machen Sätze lang und
leer.

| Statt | Besser |
|---|---|
| „Die Durchführung der Sanierung erfolgt in drei Schritten." | „Wir sanieren in drei Schritten." |
| „Zur Optimierung Ihrer Ladezeit nehmen wir eine Analyse vor." | „Wir messen Ihre Ladezeit und machen sie schneller." |
| „Nach Eingang Ihrer Anfrage erfolgt eine Kontaktaufnahme." | „Wir rufen Sie an, meist am nächsten Werktag." |

**Die Erkennung:** Wörter auf `-ung`, `-heit`, `-keit`, `-nis`, `-tion`. Mehr als eines pro
Satz ist ein Befund.

### 2 Passiv aktivieren

„Ihre Daten werden verarbeitet" verschweigt, wer handelt. Auf einer Verkaufsseite ist das
immer ein Verlust, in Rechtstexten manchmal nötig.

### 3 Behördendeutsch streichen

```
diesbezüglich · seitens · im Rahmen von · zeitnah · gegebenenfalls
in Bezug auf · nach Rücksprache · vorbehaltlich · im Vorfeld
```

Jedes davon hat eine kürzere Entsprechung. „Zeitnah" heißt entweder „morgen", oder es heißt
nichts.

### 4 Komposita nicht überziehen

Deutsch kann beliebig zusammensetzen, und genau das macht Texte unlesbar.
„Kundenzufriedenheitsbefragungsergebnis" ist grammatisch korrekt und praktisch unbrauchbar.

**Faustregel: maximal zwei Glieder.** Bei drei oder mehr auflösen: „das Ergebnis der
Kundenbefragung".

Das hat auch einen technischen Grund: lange Komposita sprengen schmale Spalten, und
Silbentrennung ist verboten. Ein zu langes Kompositum ist deshalb ein Layoutproblem, nicht
nur ein Stilproblem.

**Durchkopplung beachten**, wo zusammengesetzt wird: „Website-Optimierung" oder
„Websiteoptimierung", nicht „Website Optimierung".

### 5 Anglizismen nur, wenn die Zielgruppe sie benutzt

Nicht die Branche entscheidet, sondern die Zielgruppe. Ein Softwareentwickler sagt
„Deployment". Ein Dachdecker sagt nicht „Roof Performance Audit". Die Frage aus
`../assets/vorlagen/marke-brief.md` Abschnitt 2 („wie er die Sache selbst nennt")
beantwortet das.

### 6 Gendern: eine Entscheidung, konsequent

Wie bei du oder Sie: eine Entscheidung, durch alles durchgezogen, im Markenbrief
festgehalten.

| Variante | Vorteil | Nachteil |
|---|---|---|
| Neutrale Formulierung („das Team", „Fachkräfte", „wer sich bewirbt") | funktioniert in jedem Screenreader, niemand stößt sich daran | nicht immer möglich |
| Doppelform („Mitarbeiterinnen und Mitarbeiter") | eindeutig, korrekt | lang, in Headlines schwer |
| Sonderzeichen (`:`, `*`, `_`) | kurz | Screenreader lesen es je nach Programm unterschiedlich vor |

**Empfehlung: neutrale Formulierung zuerst versuchen.** Sie löst das Problem ohne
Nebenwirkung und liest sich meist besser. Wo sie nicht geht, die Doppelform.

**In Stellenanzeigen ist es keine Stilfrage, sondern Recht.** Eine nicht geschlechtsneutrale
Bezeichnung ohne „(m/w/d)" begründet eine Vermutung nach dem AGG, siehe
`19-recruiting-funnel.md`.

## Verständlichkeit messen, nicht schätzen

Zwei Maße, die für deutsche Texte etwas aussagen:

| Maß | Zielwert | Warum |
|---|---|---|
| **Satzlänge im Schnitt** | unter 15 Wörtern | über 20 sinkt das Verständnis messbar |
| **Anteil Sätze über 25 Wörter** | unter 10 % | ein einzelner langer Satz ist Rhythmus, viele sind eine Wand |

**Die schnellste Prüfung ist das Vorlesen.** Wo man Luft holen muss, gehört ein Punkt. Wo man
stolpert, steht ein Nominalstil oder ein Kompositum.

**Die Zielgruppe entscheidet über das Niveau, nicht der Durchschnitt.** Ein Fachtext für
Ingenieure darf Fachbegriffe benutzen. Er darf sie nur nicht in Schachtelsätze verpacken.

## Die Copy-Überarbeitung in drei Durchgängen

Der erste Entwurf ist nie die Copy. Der Ablauf, der funktioniert:

1. **Inhalt.** Steht alles da, was der Bogen braucht? Fehlt Schritt 2 oder 5? Ist jeder
   Beweis belegt oder als `[[FEHLT]]` markiert?
2. **Kürzen.** Jeden Satz einmal ansehen: Trägt er etwas, das kein anderer trägt?
   Erfahrungswert ist ein Drittel weniger Text ohne Informationsverlust. Nominalstil und
   Behördendeutsch fallen in diesem Durchgang.
3. **Klang.** Laut vorlesen. Satzlängen variieren, Gedankenstriche entfernen, Anrede prüfen,
   Primär-CTA-Text überall gleich.

**Erst danach ins Layout.** Copy, die im Layout entsteht, passt sich dem Platz an statt der
Aussage, und dann steht dort ein Satz, weil er in zwei Zeilen passt.

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

Eine Entscheidung, konsequent durchgezogen, inklusive Formularhinweisen,
Fehlermeldungen, Bestätigungsmails und Rechtstexten, soweit dort möglich. Der häufigste
Bruch entsteht in Systemtexten, die jemand anders geschrieben hat.

Faustregel: B2B-Handwerk und -Dienstleistung in Deutschland eher „Sie", junge
Endkundenmarken und DTC eher „du". Im Zweifel beim Kunden erfragen, nicht raten.

## Nicht erfinden

Kein Zitat ohne Quelle, keine Bewertung ohne Beleg, keine Zahl ohne Rechenweg, keine
Referenz ohne Freigabe. Fehlt etwas, steht `[[FEHLT: …]]` im Text und der Punkt in der Liste
offener Punkte. Eine erfundene Kundenstimme ist nach § 5 UWG angreifbar, und sie fliegt
spätestens auf, wenn jemand den Namen sucht.

Für Texte, die als Vorschlag entstehen und noch abgestimmt werden müssen, hilft eine
sichtbare Entwicklungsmarkierung im CSS, die nie in Produktion erscheint:

```css
[data-copy-vorschlag] { outline: 2px dashed var(--farbe-fehler); }
[data-copy-vorschlag]::before { content: 'Copy Vorschlag, mit Kunde abstimmen'; /* … */ }
```
