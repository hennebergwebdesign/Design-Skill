# Playbook: Landingpage

Eine Seite, ein Ziel, eine Handlung. Zielgruppe kommt aus einer Anzeige, einer Mail oder
einem QR-Code und hat eine konkrete Erwartung.

**Der Unterschied zur Startseite in einem Satz:** Eine Startseite bedient mehrere Zielgruppen
mit mehreren Absichten. Eine Landingpage bedient eine Zielgruppe mit einer Absicht, und jedes
zusätzliche Angebot senkt die Abschlussquote.

## Die harte Regel: keine Navigation

**Eine Landingpage hat keine Hauptnavigation, kein Menü und kein Footer-Menü.**

Jeder Weg heraus ist ein Abbruch. Wer aus der Anzeige kommt und in den Leistungen landet,
kommt nicht zurück. Im Kopf steht das Logo, nicht verlinkt oder verlinkt auf die Landingpage
selbst.

Erlaubt und nötig bleiben nur:

- **Impressum** und **Datenschutzerklärung** im Fuß. Die Impressumspflicht nach § 5 DDG gilt
  auch hier, und die Erreichbarkeit ist nicht verhandelbar (`../references/07-recht-dsgvo.md`).
- Ein **Sprungankerlink** innerhalb der Seite, wenn sie lang ist.

Das ist die Regel, gegen die am häufigsten verstoßen wird, weil die Landingpage als Unterseite
im bestehenden Layout gebaut wird und das Layout die Navigation mitbringt. Dann ist es keine
Landingpage, sondern eine Unterseite mit anderem Text.

## Reihenfolge

```
Anzeige verstehen  →  Message-Match  →  Struktur  →  Copy  →  Design  →  Bau  →  Test
```

**Die Anzeige kommt zuerst, immer.** Eine Landingpage ohne Kenntnis der Anzeige, die auf sie
zeigt, ist Raten. Liegt die Anzeige nicht vor, ist das eine Rückfrage, kein Grund
weiterzubauen.

## Phase 1: Message-Match

**Artefakt:** Anzeigentext und H1 der Seite nebeneinander in einer Datei.

| Anzeige sagt | H1 der Seite |
|---|---|
| „Flachdach sanieren ohne Produktionsstopp" | „Flachdach sanieren, ohne die Produktion anzuhalten" |
| „Leckage in 48 Stunden geortet" | „Leckage-Ortung in 48 Stunden" |

**Die Regel:** Der Besucher muss in unter einer Sekunde erkennen, dass er richtig ist. Nicht
sinngemäß, sondern wörtlich oder nahezu wörtlich. Das ist der billigste Conversion-Hebel
überhaupt und der am häufigsten ungenutzte.

**Ein Ziel, eine Handlung.** Zwei CTAs mit unterschiedlichen Zielen („Anfragen" und „Whitepaper
herunterladen") halbieren beide.

## Phase 2: Struktur

**Artefakt:** Sektionsliste mit je einem Satz Zweck.

| # | Sektion | Zweck | Pflicht |
|---|---|---|---|
| 1 | Held | Message-Match, Nutzen, Primär-CTA, ein Trust-Signal | ja |
| 2 | Problem | das Problem in den Worten der Zielgruppe, ohne Lösung | ja |
| 3 | Lösung | was passiert und was dabei herauskommt | ja |
| 4 | Beweis | Referenz, Zahl, Kundenstimme, alles mit Quelle | ja |
| 5 | Einwände | die drei aus dem Markenbrief, jeder mit Antwort | ja |
| 6 | Ablauf | 3 bis 5 Schritte von der Anfrage bis zum Ergebnis | ja |
| 7 | Angebot | was genau, zu welchem Preis oder in welcher Spanne | wenn möglich |
| 8 | CTA-Block | Formular oder Terminbuchung, direkt auf der Seite | ja |
| 9 | Fragen | 5 bis 8 Fragen, die wirklich vorher kommen | ja |
| 10 | Fuß | Impressum, Datenschutz, Kontakt. Kein Menü | ja |

**Der Primär-CTA erscheint mindestens dreimal:** im Heldenbereich, in der Seitenmitte und am
Ende. Mit **einem** Text (`../references/06-conversion-architektur.md`).

**Auf dem Handy ein fester Balken** mit dem Primär-CTA ab Ende des Heldenbereichs.

**Das Formular steht auf der Seite**, nicht auf einer eigenen Kontaktseite. Jeder Seitenwechsel
kostet.

## Phase 3: Copy

**Artefakt:** Copy-Dokument, jeder Vorschlag mit `data-copy-vorschlag` markiert.

Volles Programm aus `../references/12-copywriting.md`. Für diesen Typ besonders:

- **Keine Gedankenstriche** (harte Grenze, geprüft mit `scripts/pruefe-striche.mjs`)
- **Der Primär-CTA benennt das Ergebnis**, nicht die Handlung: „Termin zur Leckage-Ortung
  anfragen", nicht „Absenden"
- **Keine unechte Verknappung.** „Nur noch 3 Plätze" ohne echten Bestand ist eine
  Irreführung nach § 5 UWG, und das gilt auch, wenn ein Marketingberater es empfiehlt
- **Kein Beweis ohne Quelle.** Eine Landingpage lebt von Beweisen, und genau deshalb ist die
  Versuchung hier am größten. Fehlt ein Wert, fliegt das Element raus statt einen Platzhalter
  zu zeigen (`../references/06-conversion-architektur.md`)

## Phase 4: Design

Voller Durchgang aus `../references/10-visuelle-richtung.md`, mit zwei Abweichungen:

- **Keine Kopfnavigation heißt mehr Raum im Heldenbereich.** Das nutzen, nicht die Lücke
  stehen lassen.
- **Der eine orchestrierte Moment** sitzt beim Angebot oder bei der Zahl, die den Wert zeigt,
  nicht im Heldenbereich, wenn der nur Text trägt
  (`../references/18-motion-handschrift.md`).

## Phase 5: Bau

- [ ] Keine Hauptnavigation, kein Footer-Menü
- [ ] Impressum und Datenschutzerklärung im Fuß erreichbar
- [ ] Ein Primär-CTA-Text, mindestens dreimal
- [ ] Mobiler CTA-Balken ab Ende des Heldenbereichs
- [ ] Formular auf der Seite, 3 bis 5 Felder, vier Zustände
- [ ] Spamschutz ohne Captcha-Hürde
- [ ] Alternativer Kontaktweg neben der Fehlermeldung
- [ ] Heldenbild per `preload` und `fetchpriority="high"`
- [ ] Auf kurzen Landingpages alles sofort laden: `loading="eager"` plus
      `fetchpriority="low"` unter der Falz (`../references/02-design-ux.md`)
- [ ] `FAQPage`-JSON-LD für die Fragen

## SEO: meist nicht das Ziel

Eine Kampagnen-Landingpage soll nicht ranken, und oft **darf** sie nicht: zwei Seiten mit
demselben Angebot konkurrieren miteinander.

| Fall | Umgang |
|---|---|
| Kampagnenseite, nur über Anzeige erreichbar | `noindex, follow`, **nicht in der Sitemap** |
| Landingpage, die auch organisch ranken soll | normal indexieren, volles Programm aus `05-seo-sichtbarkeit.md` |
| Mehrere Varianten für A/B-Tests | eine kanonisch, die anderen `canonical` darauf |

**Die Konsistenzregel gilt:** `noindex` und Sitemap schließen sich aus, sonst meldet die
Search Console „Übermittelte URL als noindex gekennzeichnet"
(`../references/08-pflichtseiten-technik.md`).

## Phase 6: Test

```bash
node scripts/pruefe-striche.mjs
node scripts/pruefe-tokens.mjs
node scripts/pruefe-platzhalter.mjs
node scripts/pruefe-breakpoints.mjs http://localhost:4321/aktion --bilder
```

Von Hand:

- **Fünf-Sekunden-Test:** Seite jemandem zeigen, der die Anzeige gesehen hat. Ist er richtig?
- **Tastaturdurchlauf** bis zum abgeschickten Formular
- **Formular fehlschlagen lassen:** Eingaben stehen? Telefonnummer sichtbar?
- **Ladezeit gemessen**, nicht geschätzt. Eine Landingpage hinter bezahltem Traffic ist der
  Ort, an dem Ladezeit direkt Geld kostet

## Drei Fehler, die genau bei diesem Typ passieren

1. **Die Landingpage ist eine Unterseite mit Navigation.** Siehe oben. Der häufigste Fehler,
   weil das bestehende Layout die Navigation mitbringt.
2. **Zwei Ziele auf einer Seite.** „Anfragen" plus „Newsletter" plus „Broschüre" ergibt drei
   halbe Conversions statt einer ganzen.
3. **Kein Message-Match.** Die Anzeige verspricht Konkretes, die Seite begrüßt allgemein.
   Der bezahlte Klick ist dann bezahlt und verloren.
