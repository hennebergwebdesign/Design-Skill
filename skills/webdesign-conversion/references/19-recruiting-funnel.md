# Recruiting Funnel

Ein Recruiting-Funnel ist keine Landingpage mit anderem Text. Der Bewerber ist kein Käufer,
und fast jede Conversion-Regel aus `06-conversion-architektur.md` gilt hier in veränderter
Form.

**Rechtlicher Hinweis:** Die Abschnitte zu AGG, DSGVO und Bewerberdaten sind
Arbeitsgrundlagen und **keine Rechtsberatung.** Ein AGG-Verstoß in einer Stellenanzeige ist
unmittelbar entschädigungspflichtig, deshalb geht eine Anzeige vor Veröffentlichung durch
eine fachliche Prüfung. Rechercherstand: die im Text genannten Entscheidungen.

## Warum der Funnel anders ist

| | Kunde | Bewerber |
|---|---|---|
| Ausgangslage | hat ein Problem | hat einen Job |
| Risiko | Geld | Existenz, Familie, Ruf |
| Vergleicht mit | deinem Wettbewerber | seinem aktuellen Arbeitgeber |
| Entscheidet | allein oder im Team | mit Partner, Familie |
| Bewirbt sich | im Arbeitsalltag | abends, am Wochenende, vom Handy |
| Vertrauen entsteht durch | Ergebnisse | Menschen und Alltag |

Daraus folgen vier Dinge, die den Aufbau bestimmen:

1. **Der Bewerber hat keine Not.** Er sucht nicht dringend, er schaut. Ein Funnel, der auf
   Handlungsdruck setzt („Nur noch 3 Plätze"), ist hier nicht nur unglaubwürdig, sondern
   nach § 5 UWG angreifbar, wenn es keinen echten Bestand gibt.
2. **Das Risiko ist höher als bei jedem Kauf.** Deshalb trägt nicht das Angebot, sondern der
   Beweis: echte Gesichter, echter Alltag, echte Zahlen.
3. **Die Bewerbung passiert mobil und außerhalb der Arbeitszeit.** Ein Lebenslauf-Upload ist
   in dieser Situation die häufigste Abbruchursache.
4. **Der Vergleich ist der Status quo.** „Warum soll ich wechseln" ist die eigentliche Frage,
   nicht „warum ihr und nicht die anderen".

**Zur Mobilquote:** Die 73 % aus `SKILL.md` gelten für Websites allgemein. Für
Bewerbungsstrecken liegt der Anteil in der Regel höher, aber der genaue Wert ist projekt-
und branchenabhängig. Er wird gemessen, nicht behauptet: in GA4 als Gerätesegment auf der
Karriereseite. Bis die Messung vorliegt, steht in der Übergabe
`[[FEHLT: Mobilanteil Karrierestrecke]]`, und gebaut wird mobil zuerst.

## Die EVP statt einer Stellenanzeige

Die Employer Value Proposition ist die USP-Formel aus `01-strategie-positionierung.md`, auf
Arbeit übertragen:

> **Für wen** + **welches Arbeitsleben** + **welcher Beweis**

Beispiel:

> „Für Elektriker, die genug von Montagewochen haben: Feierabend um 16:30, jeden Tag im
> gleichen Umkreis von 40 Kilometern. Seit 2019 ist kein Monteur wegen der Fahrtzeiten
> gegangen."

Der letzte Satz ist der Teil, den fast niemand liefert, und der Teil, der die Sache
entscheidet.

### Die Ich-Ich-Ich-Falle des Recruitings

Diese Begriffe stehen auf praktisch jeder Karriereseite und sagen nichts:

```
familiäres Betriebsklima · flache Hierarchien · Obstkorb · Wasser und Kaffee
ein junges, dynamisches Team · abwechslungsreiche Tätigkeit
leistungsgerechte Bezahlung · spannende Projekte · Teamplayer gesucht
Weiterbildungsmöglichkeiten · Du bist Teil einer Familie
```

Sie gehören in die Verbotsliste in `marke.json` unter `sprache.verbotene_woerter`. Und zwei
davon sind zusätzlich ein AGG-Risiko, siehe unten.

**Der Ersatz ist immer konkret und prüfbar:**

| Statt | Konkret |
|---|---|
| „flache Hierarchien" | „Zwei Ebenen: Geschäftsführung und Team. Angebote bis 5.000 € gibst du selbst frei." |
| „familiäres Betriebsklima" | „Zwölf Leute, gemeinsames Frühstück am Freitag, die Hälfte ist über fünf Jahre da." |
| „leistungsgerechte Bezahlung" | „3.400 bis 4.100 € brutto nach Erfahrung, plus Urlaubs- und Weihnachtsgeld." |
| „Weiterbildungsmöglichkeiten" | „Fünf Tage Fortbildung im Jahr, bezahlt, Thema wählst du." |
| „abwechslungsreiche Tätigkeit" | „Kein Tag im Büro über zwei Stunden. Montag Aufmaß, Dienstag bis Donnerstag Montage." |

**Gehalt nennen.** Die Regel „Preise zeigen, wenn möglich" aus `06-conversion-architektur.md`
gilt hier stärker: eine Anzeige ohne Gehaltsangabe filtert nicht nur schlechte Bewerber
heraus, sondern vor allem die guten, die ihre Zeit nicht verschwenden wollen. Wenn kein
Festbetrag möglich ist: Spanne mit Begründung, was sie bestimmt.

## Der Funnel in Stufen

```
Anzeige oder Ad
   ↓  Message-Match: die Headline der Seite wiederholt das Versprechen der Anzeige
Karriere-Landingpage
   ↓  eine Stelle pro Seite, kein Stellenportal
Selbsteinschätzung (optional)  ──→  Job-Detail
   ↓  5 Fragen, sofortiges Ergebnis        ↓
Kurzbewerbung
   ↓  3 Felder, kein Upload, kein Anschreiben
Bestätigung
   ↓  sofort sichtbar, was wann passiert
Terminvorschlag
   ↓  konkrete Slots, nicht "wir melden uns"
Erinnerungsstrecke
```

### Regeln je Stufe

**Anzeige zur Landingpage.** Message-Match ist Pflicht: steht in der Anzeige „Feierabend um
16:30", ist das die H1 der Zielseite. Ein Klick auf eine Anzeige, der auf einer allgemeinen
Karriereseite landet, verliert den Großteil der Besucher.

**Eine Stelle pro Seite.** Ein Stellenportal mit Filtern ist für zwanzig offene Stellen
richtig und für drei falsch. Bei drei Stellen sind drei Seiten besser, weil jede eine eigene
EVP tragen kann und eigenständig ranken kann (`05-seo-sichtbarkeit.md`).

**Keine Navigation auf der Funnel-Seite.** Dieselbe Regel wie bei Landingpages
(`../playbooks/landingpage.md`): jeder Weg heraus ist ein Abbruch. Eine Ausnahme ist der Link
zum Impressum und zur Datenschutzerklärung, die rechtlich erreichbar bleiben müssen
(`07-recht-dsgvo.md`).

**Selbsteinschätzung als Vorqualifizierung.** Fünf Fragen, sofortiges Ergebnis, kein
Formular davor. „Passt die Stelle zu mir?" senkt die Hemmschwelle, weil der Bewerber etwas
über sich erfährt statt etwas abzugeben. Drei Regeln:

- **Das Ergebnis ist immer nützlich, auch bei Nichtpassung.** „Diese Stelle passt nicht,
  weil du Montage ausgeschlossen hast. Wir haben eine Werkstattstelle, die passt."
- **Kein Scheinergebnis.** Wenn jede Antwortkombination „Du passt perfekt" ergibt, merkt das
  jeder, und das Vertrauen ist weg.
- **Ohne JavaScript nutzbar oder sauber übersprungen.** Die harte Grenze aus `SKILL.md`
  gilt: die Seite bleibt vollständig bedienbar. Ein Test, der ohne JS ein leeres Feld ist,
  ist ein toter Pfad zur Bewerbung.

## Die Kurzbewerbung

Das 10-Sekunden-Formular aus `06-conversion-architektur.md`, verschärft.

| Was du brauchst | Was du **nicht** brauchst |
|---|---|
| Name | Anschreiben |
| Telefon **oder** E-Mail | Lebenslauf im ersten Schritt |
| Wann erreichbar | Anschrift, Geburtsdatum, Foto |
| *optional:* Lebenslauf, später nachreichbar | Zeugnisse |
| | Gehaltsvorstellung |
| | „Wie haben Sie von uns erfahren" |

**Drei Felder.** Alles Weitere klärt das Telefonat.

**Kein Foto, kein Geburtsdatum, keine Anschrift im Erstkontakt.** Das ist nicht nur
Conversion, sondern Datensparsamkeit nach Art. 5 Abs. 1 lit. c DSGVO: wer ein Foto abfragt,
verarbeitet ein Merkmal, das zu einer Diskriminierungsvermutung führen kann, und hat keinen
Zweck dafür.

**Der Upload kommt später.** Zwei Wege, die beide funktionieren:

1. **Nachreichen per Link** in der Bestätigungsmail. Der Bewerber ist dann am Rechner.
2. **Profil verlinken** (LinkedIn, Xing) als Alternative zum Upload.

**Wenn ein Upload sein muss:** Dateigröße und Formate vorher nennen, Fortschritt anzeigen,
Fehler nicht das ganze Formular verwerfen lassen, und auf dem Handy die Kamera als Quelle
zulassen (`accept="application/pdf,image/*" capture`).

### Technische Pflicht

Alles aus `06-conversion-architektur.md` gilt (Honigtopf, Zeitfeld, Origin-Prüfung,
Rate-Limit, serverseitige Validierung, vier Zustände, doppelte Mail, Escaping). Zusätzlich:

- **Die Bestätigung nennt den nächsten Schritt mit Zeitangabe.** „Wir melden uns" ist keine
  Information. „Wir rufen innerhalb von zwei Werktagen an, meist zwischen 16 und 18 Uhr" ist
  eine.
- **Ein Fehler hat immer einen Ausweg.** Telefonnummer neben der Fehlermeldung. Ein
  abgebrochenes Bewerbungsformular ohne Alternative ist ein verlorener Kandidat.
- **Eingaben bleiben nach einem Fehler stehen.** Ein Formular, das sich beim Serverfehler
  leert, wird nicht zweimal ausgefüllt.
- **Bewerberdaten gehören nicht in einen Analytics-Event.** Name, Telefonnummer und
  Freitextfeld niemals als GA4-Parameter senden.

## Recht

### AGG: die Anzeige selbst

Eine diskriminierende Stellenanzeige begründet eine Vermutung nach § 22 AGG, und der
Arbeitgeber muss das Gegenteil beweisen. Die Entschädigung nach § 15 Abs. 2 AGG ist **auf
drei Monatsgehälter begrenzt, aber nur dann**, wenn die Person auch bei
benachteiligungsfreier Auswahl nicht eingestellt worden wäre. Sonst ist sie nicht der Höhe
nach begrenzt, sondern „angemessen".

| Formulierung | Problem |
|---|---|
| ohne „(m/w/d)" oder geschlechtsneutrale Bezeichnung | Geschlecht |
| „junges, dynamisches Team", „Berufseinsteiger" als Anforderung | Alter |
| „Muttersprachler Deutsch" | ethnische Herkunft. Richtig: „Deutsch auf C1-Niveau" |
| „körperlich belastbar" ohne sachlichen Grund | Behinderung. Richtig: „Heben bis 25 kg mehrfach täglich" |
| Bewerbungsfoto verlangt | mehrere Merkmale gleichzeitig |
| „Deutsch als Muttersprache", „perfektes Deutsch" | Herkunft |
| Altersangaben, „bis 35 Jahre", „Digital Native" | Alter |
| „Teamplayer, der in unsere Familie passt" | mehrdeutig, in Kombination angreifbar |

**Die Regel:** jede Anforderung braucht einen sachlichen, tätigkeitsbezogenen Grund, und der
steht am besten daneben. „Führerschein Klasse B, weil du täglich zu Kunden fährst" ist
unangreifbar und liest sich zugleich besser.

**Schwerbehinderte Bewerber:** Öffentliche Arbeitgeber haben zusätzliche Pflichten
(Einladung zum Gespräch bei fachlicher Eignung, § 165 SGB IX). Bei öffentlichen Auftraggebern
gehört das geprüft.

### Bewerberdaten: Rechtsgrundlage

**Wichtig und häufig falsch in Vorlagen:** § 26 Abs. 1 Satz 1 BDSG ist als eigenständige
Rechtsgrundlage **nicht mehr anwendbar.** Der EuGH hat am 30.03.2023 (C-34/21) entschieden,
dass eine solche Norm die Anforderungen des Art. 88 DSGVO an eine „spezifischere Vorschrift"
nicht erfüllt; das Bundesarbeitsgericht hat das am 08.05.2025 (8 AZR 209/21) für
§ 26 Abs. 1 Satz 1 BDSG ausdrücklich nachgezogen und die Norm für unanwendbar erklärt. Ein
Beschäftigtendatengesetz ist angekündigt, aber nicht in Kraft.

**Praktische Folge für die Datenschutzhinweise:**

| Zweck | Rechtsgrundlage |
|---|---|
| Durchführung des Bewerbungsverfahrens | **Art. 6 Abs. 1 lit. b DSGVO** (Maßnahmen vor Vertragsschluss) |
| Aufbewahrung zur Abwehr von AGG-Ansprüchen | **Art. 6 Abs. 1 lit. f DSGVO** (berechtigtes Interesse), mit Interessenabwägung |
| Aufnahme in einen Talentpool | **Art. 6 Abs. 1 lit. a DSGVO** (Einwilligung), gesondert und widerruflich |
| Gesundheitsdaten, Schwerbehinderung | **Art. 9 Abs. 2 lit. b DSGVO** plus § 26 Abs. 3 BDSG |

Eine Vorlage, die „§ 26 BDSG" als Rechtsgrundlage für das Bewerbungsverfahren nennt, ist
veraltet. Vorlage mit der aktuellen Fassung:
`../assets/vorlagen/datenschutz-bewerber.md`.

### Löschfrist

Die verbreiteten sechs Monate stehen in keinem Gesetz. Sie leiten sich ab:

```
§ 15 Abs. 4 AGG      2 Monate, um einen Anspruch schriftlich geltend zu machen
                     (Frist beginnt mit Zugang der Ablehnung)
§ 61b Abs. 1 ArbGG   3 Monate danach, um Klage zu erheben
Puffer               Postlaufzeit, Zustellungsnachweis
                     ────────────────────────────────
                     rund 6 Monate nach Abschluss des Verfahrens
```

Das gehört genau so begründet in das Löschkonzept, nicht als nackte Zahl. Und es ist eine
Obergrenze, keine Pflicht: wer früher löschen kann, soll es.

**Eigene Datenschutzhinweise für Bewerber, nicht die allgemeine Erklärung.** Sie stehen an
der Bewerbungsstrecke verlinkt und nennen Zwecke, Rechtsgrundlagen, Empfänger (auch das ATS),
Löschfristen und die Betroffenenrechte.

### ATS-Anbindung

Personio, Recruitee, Softgarden, JOIN und Vergleichbares sind **Auftragsverarbeitung**
(Art. 28 DSGVO) und brauchen einen Vertrag. Drei technische Punkte, die im Bau regelmäßig
übersehen werden:

1. **Ein eingebettetes ATS-Formular lädt von einer Fremddomain** und ist damit
   consentrelevant, sobald es Cookies setzt oder Fingerprinting betreibt. Der Consent muss
   echt blockieren (`07-recht-dsgvo.md`), nicht kosmetisch.
2. **Die Barrierefreiheit des ATS-Formulars kontrollierst du nicht.** Es kann dein
   BFSG-Niveau unterlaufen (`04-barrierefreiheit-bfsg.md`), und du haftest trotzdem für die
   Seite. Vor der Entscheidung testen: Tastaturdurchlauf, Fokusring, Fehlermeldungen,
   Kontrast.
3. **Die Ladezeit des ATS ist deine Ladezeit.** Ein iframe mit eigenem Framework hebelt die
   2-Sekunden-Regel aus.

**Deshalb die Regel:** Der Einstieg passiert auf eigener Seite, mit eigenem Formular. Das
ATS kommt erst nach dem Commitment, oder es bekommt die Daten per API statt per iframe.

## JobPosting für Google for Jobs

Google for Jobs ist in Deutschland seit 2019 aktiv; eine bezahlte Variante gibt es hier
nicht, der organische Weg über strukturierte Daten ist der einzige. Baustein:
`../assets/vorlagen/jsonld-bausteine.md`.

**Pflichtfelder** (ohne sie erscheint die Anzeige nicht):

```
title              der Jobtitel, NICHT der Seitentitel
                   "Elektriker", nicht "Elektriker (m/w/d) gesucht in Dachau | Firma"
description        die vollständige Beschreibung als HTML
datePosted         ISO 8601
hiringOrganization das einstellende Unternehmen
jobLocation        der physische Arbeitsort
```

**Empfohlen, und in der Praxis entscheidend:**

```
validThrough                 Ablaufdatum. Fehlt es, bleibt die Anzeige zu lange sichtbar
baseSalary                   Google bewertet Gehaltsangaben positiv
employmentType               FULL_TIME, PART_TIME, CONTRACTOR …
identifier                   die interne Stellennummer
jobLocationType              TELECOMMUTE bei vollständig remote
applicantLocationRequirements bei remote: aus welchen Regionen bewerbbar
directApply                  true, wenn die URL direkt zur Bewerbung führt
```

**Der Fehler, der am häufigsten auffällt:** `title` enthält den ganzen Seitentitel. Google
braucht den reinen Jobtitel.

**Abgelaufene Anzeigen müssen weg**, und zwar aktiv: `validThrough` in die Vergangenheit
setzen, 404 oder 410 zurückgeben, oder das Markup entfernen. Eine Anzeige, die nach dem
Besetzen online bleibt, ist ein Ranking-Risiko und ärgert Bewerber. Für schnelles Entfernen
ist die Indexing API der Weg, nicht die Sitemap.

**Und die Konsistenzregel aus `08-pflichtseiten-technik.md` gilt:** eine Seite mit
`noindex` darf nicht in der Sitemap stehen. Das trifft Stellenseiten oft, weil sie nach dem
Besetzen auf `noindex` gesetzt und in der Sitemap vergessen werden.

## Messung

Ergänzt `13-messung-optimierung.md`. Die Funnel-Kennzahlen, die etwas aussagen:

| Kennzahl | Was sie zeigt |
|---|---|
| Bewerbungen je Kanal | wo das Budget wirkt |
| Cost per Application | ob die Anzeige trägt |
| **Abbruchquote im Formular je Feld** | welches Feld der Blocker ist |
| Time to Apply | ob die Strecke zu lang ist |
| Quote Kurzbewerbung zu vollständiger Unterlage | ob das Nachreichen funktioniert |
| Anteil mobil | die Zahl, die den Bau rechtfertigt |
| Quote Bewerbung zu Gespräch | ob die Vorqualifizierung stimmt |

**Die wichtigste ist die Abbruchquote je Feld.** Sie zeigt in der Regel dasselbe: der Upload
und das Freitextfeld kosten die Hälfte.

**Datenschutz bei der Messung:** Heatmaps und Sitzungsaufzeichnungen auf einer
Bewerbungsstrecke sind besonders heikel, weil dort besondere Kategorien von Daten eingegeben
werden können. Eingabefelder in der Aufzeichnung maskieren, und im Zweifel die Strecke
ausnehmen.

## Prüfliste vor dem Livegang

- [ ] Anzeige fachlich auf AGG geprüft, geschlechtsneutral, jede Anforderung begründet
- [ ] Eigene Datenschutzhinweise für Bewerber verlinkt, nicht die allgemeine Erklärung
- [ ] Rechtsgrundlagen aktuell (Art. 6 Abs. 1 lit. b DSGVO, **nicht** § 26 BDSG)
- [ ] Löschkonzept mit Begründung der Frist dokumentiert
- [ ] Auftragsverarbeitungsvertrag mit dem ATS liegt vor
- [ ] Talentpool nur mit gesonderter, widerruflicher Einwilligung
- [ ] Bewerbung ohne Upload und ohne Anschreiben möglich
- [ ] Formular auf 375 px mit einer Hand bedienbar, Tastaturdurchlauf ok
- [ ] Bestätigung nennt den nächsten Schritt mit Zeitangabe
- [ ] Alternativer Kontaktweg neben jeder Fehlermeldung
- [ ] JobPosting-JSON-LD validiert, `title` ist der reine Jobtitel
- [ ] `validThrough` gesetzt, Prozess zum Entfernen nach Besetzung festgelegt
- [ ] Bewerberdaten gehen in keinen Analytics-Event
- [ ] Heatmap-Aufzeichnung maskiert Eingaben oder ist ausgenommen
- [ ] Gehaltsangabe vorhanden oder die Entscheidung dagegen dokumentiert

## Verwandte Kapitel

- Ablauf und Playbook: `../playbooks/recruiting-funnel.md`
- CTA, Formulare, Trust: `06-conversion-architektur.md`
- Consent, Auftragsverarbeitung: `07-recht-dsgvo.md`
- JSON-LD-Bausteine: `../assets/vorlagen/jsonld-bausteine.md`
- Bewerber-Datenschutzhinweise: `../assets/vorlagen/datenschutz-bewerber.md`
