# Messung und laufende Optimierung

Ohne Daten keine Verbesserung. Eine Website ist nie fertig; ohne Pflege und Optimierung
stagniert alles.

## Inhalt

- Was gemessen wird
- Werkzeuge
- GA4 einrichten, das Minimum
- Heatmaps und Aufzeichnungen richtig lesen
- Der monatliche Review
- A/B-Tests, ehrlich betrachtet
- Optional: Kundendashboard
- Was nicht gemessen werden soll
- Bewusst nicht übernommen
- Verwandte Kapitel

## Was gemessen wird

**Nicht** Besucherzahlen. Die eine Zahl, die zählt, ist die **qualifizierte Anfrage**. Alles
andere ist Zwischenschritt.

| Ebene | Kennzahl | Fragt |
|---|---|---|
| Reichweite | Sitzungen, Quellen | Kommt überhaupt jemand? |
| Verhalten | Scrolltiefe, Verweildauer, Ausstiegsseiten | Passt Inhalt und Reihenfolge? |
| Mikro-Conversion | CTA-Klick, FAQ geöffnet, Formular begonnen | Wo bricht es ab? |
| Conversion | Formular abgesendet, Termin gebucht, Anruf | Kommt eine Anfrage? |
| Qualität | Anteil passender Anfragen, Abschlussquote | Kommen die richtigen? |

Die letzte Zeile ist die wichtigste und die, die fast nie gemessen wird. 100 Anfragen, von
denen 5 passen, sind schlechter als 20, von denen 12 passen, und nur der Kunde selbst kann
das rückmelden. Deshalb gehört ein einfacher Rückkanal ins Projekt: eine Spalte im CRM, ein
monatlicher Anruf, irgendetwas.

## Werkzeuge

| Werkzeug | Wofür | Einwilligung nötig |
|---|---|---|
| Google Analytics 4 | Sitzungen, Quellen, Conversions | ja |
| Google Tag Manager | Auslieferung der Tags | ja (Consent Mode) |
| Microsoft Clarity / Hotjar | Heatmaps, Sitzungsaufzeichnungen | ja |
| Google Search Console | Rankings, Klicks, Indexierung, Core Web Vitals | nein |
| Plausible, Matomo (self-hosted, anonymisiert) | Grundzahlen | je nach Konfiguration ggf. nein |
| Serverlogs | Fehler, Bots, Statuscodes | nein |

Für viele kleine Dienstleisterseiten reicht Search Console plus ein cookieloses Analytics
völlig aus, und spart die Consent-Diskussion. Das ist eine Empfehlung wert, bevor GA4
eingerichtet wird.

## GA4 einrichten, das Minimum

1. **Consent Mode Default vor dem GTM-Skript**, alles auf `denied` außer
   `security_storage`, mit `wait_for_update`. Siehe `07-recht-dsgvo.md`.
2. **Conversion-Ereignisse** definieren, nicht die Standardereignisse feiern:
   - `formular_gesendet` (mit Parameter: welches Formular)
   - `cta_klick` (mit Parameter: Position: Header, Hero, Angebot, Mobilbalken)
   - `telefon_klick`, `mail_klick`
   - `terminbuchung` bei externem Buchungstool
3. **Als Schlüsselereignis markieren**, sonst taucht es in keinem Bericht auf.
4. **Nach Quelle segmentieren.** Eine Conversion-Rate ohne Quelle ist nutzlos: organisch,
   bezahlt, direkt und Empfehlung verhalten sich völlig unterschiedlich.
5. **Interne Zugriffe ausschließen** (IP-Filter oder eigener Parameter).

## Heatmaps und Aufzeichnungen richtig lesen

- **Scroll-Heatmap:** Wo brechen 50 % ab? Steht die wichtigste Information darüber?
- **Klick-Heatmap:** Wird auf etwas geklickt, das kein Link ist? Dann erwartet der Besucher
  dort einen. Wird der Primär-CTA übersehen? Dann stimmt Kontrast oder Position nicht.
- **Aufzeichnungen:** 10 Sitzungen mit Formularabbruch ansehen sagt mehr als jede Statistik.
- **Rage Clicks** und wiederholtes Hin-und-her-Scrollen markieren genau die Stellen, an denen
  eine Information fehlt.

Datenschutz: Aufzeichnungen brauchen Einwilligung, Eingabefelder werden maskiert, und der
Dienst steht mit Zweck und Rechtsgrundlage in der Datenschutzerklärung.

## Der monatliche Review

Ein Termin, eine Stunde, immer dieselben Punkte:

1. **Zahlen:** Anfragen im Monat, Quelle, Qualität. Trend gegenüber Vormonat.
2. **Search Console:** neue Rankings, verlorene Rankings, Indexierungsfehler, Core Web Vitals.
3. **Heatmap:** eine Sektion gezielt ansehen, nicht alles.
4. **Eine Hypothese formulieren**, eine Änderung umsetzen, Wirkung im nächsten Monat prüfen.
5. **Technik:** Updates, defekte Links, 404-Aufkommen in den Logs, Ladezeit.
6. **Inhalt:** Sind Zahlen, Bewertungen, Referenzen und Teamfotos noch aktuell? Stände
   nachziehen.

Was in einem Review optimiert wird, in dieser Reihenfolge: Headline → Primär-CTA →
Trust-Elemente → Formular → Sektionsreihenfolge → Inhalt → Performance.

## A/B-Tests, ehrlich betrachtet

Ein A/B-Test braucht Volumen. Bei 300 Besuchern im Monat und 8 Anfragen ist ein Test
statistisch wertlos: dort wird nacheinander geändert und über mehrere Monate verglichen,
mit dem Wissen, dass Saison und Quelle mitreden.

Ab etwa 1.000 relevanten Sitzungen und 50 Conversions pro Variante und Monat lohnt ein
echter Test. Dann gilt: eine Variable je Test, vorher festgelegte Laufzeit, vorher
festgelegtes Erfolgskriterium, kein Abbruch beim ersten erfreulichen Zwischenstand.

### Erst die Hypothese, dann die Variante

```
Weil      wir beobachtet haben, dass  [Beobachtung mit Quelle: Heatmap, Aufzeichnung, Anruf]
glauben wir, dass                     [eine Änderung]
bei                                   [Zielgruppe, Gerät, Quelle]
zu                                    [erwartete Wirkung] führt.
Wir wissen es, wenn                   [Hauptkennzahl] sich ändert.
```

**Schwach:** „Ein grüner Knopf könnte mehr Klicks bringen."
**Stark:** „Weil in der Klick-Heatmap mobil kaum jemand den CTA im Heldenbereich trifft und
drei von zehn Aufzeichnungen dort zurückscrollen, glauben wir, dass ein fester CTA-Balken ab
Ende des Heldenbereichs bei mobilen Besuchern aus Anzeigen zu mehr Rückrufanfragen führt. Wir
wissen es, wenn die Anfragen je mobiler Sitzung steigen."

Die Beobachtung ist Pflicht. Ohne sie ist der Test Raten mit Statistik, und ein zufälliger
Gewinner wird zur Regel erklärt.

### Drei Arten von Kennzahlen

| Art | Aufgabe | Beispiel |
|---|---|---|
| Hauptkennzahl | entscheidet den Test, genau eine, vorher festgelegt | abgesendete Anfragen je Sitzung |
| Nebenkennzahl | erklärt, warum | CTA-Klicks, Formular begonnen |
| Schutzkennzahl | darf nicht schlechter werden, sonst Abbruch | Anteil passender Anfragen (Qualitätszeile oben), Fehlerquote im Formular |

Die Schutzkennzahl ist der Grund, warum die Qualitätszeile der Tabelle oben gepflegt werden
muss: Eine Variante, die mehr Anfragen bringt, aber mehr unpassende, hat verloren.

### Wie viele Besucher ein Test braucht

Benötigte Sitzungen **je Variante** bei 95 % Konfidenz (zweiseitig) und 80 % Teststärke,
gerechnet mit der Normalnäherung für zwei Anteile, gerundet:

| Ausgangsquote | +10 % relativ | +20 % relativ | +50 % relativ | +100 % relativ |
|---|---|---|---|---|
| 1 % | 163.100 | 42.700 | 7.750 | 2.320 |
| 2 % | 80.700 | 21.100 | 3.830 | 1.140 |
| 3 % | 53.200 | 13.900 | 2.520 | 750 |
| 5 % | 31.200 | 8.160 | 1.470 | 435 |
| 10 % | 14.800 | 3.840 | 690 | 200 |

```
n je Variante = (1,96 · √(2·p̄·(1 - p̄)) + 0,84 · √(p₁·(1 - p₁) + p₂·(1 - p₂)))² / (p₂ - p₁)²
p₁ = Ausgangsquote, p₂ = erwartete Quote, p̄ = Mittel aus beiden
```

Nachrechnen lässt sich das mit jedem Stichprobenrechner für Anteilstests. Die Werte oben sind
mit dieser Formel gerechnet, nicht aus einer fremden Tabelle übernommen.

```
Laufzeit in Tagen = n je Variante · Zahl der Varianten / Sitzungen am Tag im Test
```

**Das Beispiel, das die Schwelle oben erklärt:** 1.000 Sitzungen im Monat, 3 % Anfragequote.
Um eine Steigerung um die Hälfte (3 % auf 4,5 %) zu erkennen, braucht der Test 2 · 2.520 =
5.040 Sitzungen, also rund fünf Monate. Kleinere Effekte sind auf dieser Seite nicht messbar.
Deshalb dort nacheinander ändern und Monate vergleichen.

### Regeln für den Lauf

| Regel | Grund |
|---|---|
| Stichprobe und Laufzeit vor dem Start festlegen und aufschreiben | wer täglich nachsieht und beim ersten guten Stand stoppt, erklärt Zufall zum Gewinner. Das ist das häufigste Fehlurteil bei A/B-Tests |
| In ganzen Wochen laufen lassen | Montag und Samstag verhalten sich verschieden; eine halbe Woche verzerrt |
| Während des Laufs nichts ändern: keine neuen Anzeigen, keine Textkorrektur in einer Variante, keine neue Quelle | sonst misst der Test die Änderung des Umfelds, nicht die Variante |
| Ein Besucher sieht bei jedem Besuch dieselbe Variante | ein Wechsel verwässert beide Gruppen |
| Eine Variable je Test, aber eine spürbare | eine winzige Änderung erzeugt einen Effekt, den keine erreichbare Stichprobe erkennt |
| Variante serverseitig oder vor dem ersten Zeichnen ausliefern | eine Variante, die per Skript nach dem Laden umgebaut wird, flackert und verschlechtert CLS (`03-technik-performance.md`) |
| Varianten als eigene URLs: eine kanonisch, die anderen mit `canonical` darauf | siehe `../playbooks/landingpage.md` |

### Auswerten

| Prüfung | Frage |
|---|---|
| Stichprobe erreicht? | Wenn nicht, ist das Ergebnis vorläufig, egal wie deutlich es aussieht |
| Konfidenzintervall | Liegt die ganze Spanne der Differenz über null, oder nur ihr Mittelwert? |
| Größe des Effekts | Lohnt die Differenz die Umsetzung, oder ist sie nur „signifikant"? |
| Nebenkennzahlen | Erklären sie das Ergebnis, oder widersprechen sie ihm? |
| Schutzkennzahl | Ist irgendetwas schlechter geworden? |
| Segmente | Nur ansehen, wenn vorher festgelegt. Wer im Nachhinein so lange Segmente schneidet, bis eins gewinnt, findet immer eins |

**Was 95 % bedeutet:** Gäbe es keinen Unterschied, käme ein so deutliches Ergebnis in weniger
als 5 % der Fälle zufällig zustande. Es heißt nicht „zu 95 % ist die Variante besser". Bei
vielen Tests nacheinander ist deshalb auch jeder zwanzigste „Gewinner" ohne echten
Unterschied zu erwarten.

| Ergebnis | Folgerung |
|---|---|
| Variante klar besser | umsetzen, Muster dokumentieren |
| Variante klar schlechter | Original behalten, Grund suchen; das ist ebenfalls ein Ergebnis |
| Kein Unterschied | die Änderung war zu klein oder egal. Nicht verlängern, bis doch etwas erscheint |

### Nur mit Einwilligung

A/B-Testing-Werkzeuge sind einwilligungspflichtig (`07-recht-dsgvo.md`). Auch ein Eigenbau
braucht für die feste Zuteilung eine Kennung im Browser, und das ist ein Zugriff nach § 25
TDDDG.

| Folge | Umgang |
|---|---|
| Nur Besucher mit Einwilligung kommen in den Test | Stichprobe mit der Einwilligungsquote verkleinern. Bei 1.000 Sitzungen und der Hälfte Zustimmung sind es 500 |
| Wer zustimmt, ist nicht der Durchschnitt | Ergebnis gilt zunächst für Zustimmende; so in den Bericht schreiben |
| Ohne Einwilligung keine Zuteilung im Browser | Alternative: zeitlich wechseln (vier Wochen A, vier Wochen B), gezählt über Anfragen im Posteingang. Kein echter Test, weil Saison und Quelle mitreden, aber ehrlich und ohne Speicherzugriff |
| Testwerkzeug lädt vor der Entscheidung | Befund. Das Skript blockiert echt, nicht kosmetisch |

### Dokumentieren

Jeder Test bekommt einen Eintrag im Projekt, auch der verlorene:

```
Test          Fester CTA-Balken mobil
Zeitraum      03.08. bis 28.09.2026, 8 Wochen
Hypothese     [Text nach Vorlage oben]
Varianten     A ohne Balken, B mit Balken (Bildschirmfotos im Ordner)
Stichprobe    geplant 2.520 je Variante, erreicht [[FEHLT: Wert aus dem Bericht]]
Ergebnis      [Differenz mit Konfidenzintervall, oder „kein Unterschied"]
Schutz        [Anteil passender Anfragen vorher und nachher]
Entscheidung  umgesetzt / verworfen / Folgetest
Muster        [die übertragbare Lehre, ein Satz]
```

**Reihenfolge der Testideen** nach drei Fragen, je eins bis zehn, aus dem Bauch und dann
gegen die Daten geprüft: Wie viel bewegt es, wenn es wirkt? Wie gut ist die Beobachtung
belegt? Wie schnell ist es gebaut und gemessen? Die Summe sortiert die Liste. Sie ist eine
Hilfe für die Reihenfolge, keine Vorhersage, und gehört nicht in einen Kundenbericht.
**Was zuerst getestet wird:** Headline mit Unterzeile, dann das Bild im Heldenbereich, dann der
Knopftext, dann der Beleg. Der erste Bildschirm hat den größten Hebel. Wechselt die Headline, muss das
Bild noch dazu passen, sonst testet man zwei Dinge.

**Jeder Test bekommt einen Satz vorab:** „Wir glauben, dass Headline B mehr Anfragen bringt, weil
sie das Ergebnis konkret nennt." Ohne den Satz ist ein Gewinner ein Zufall, aus dem man nichts lernt.

**Vor jedem Test und bei zu wenig Besuchern:** fünf Fremden die Seite fünf Sekunden zeigen und fragen,
was angeboten wird und was sie als Nächstes tun würden (Erinnerungs- und Aufgabentest,
`36-kundenpsychologie-erwartung-reiz-begruendung.md`).

## Optional: Kundendashboard

Analytics-Oberflächen sind für Kunden schwer lesbar. Als optionale Zusatzleistung kann ein
vereinfachtes, gebrandetes Dashboard die wenigen Kennzahlen des monatlichen Reviews zeigen, mit
den qualifizierten Anfragen vorn (siehe „Was gemessen wird"). Vorher klären: Quelle der Daten
und Auftragsverarbeitung. Arbeitsdokument, keine Rechtsberatung. Herkunft: die Idee eines
anderen Webdesigners aus einem Video, nicht geprüft und nicht an einem Projekt erprobt.

## Was nicht gemessen werden soll

- Verweildauer als Erfolgsgröße. Lange Verweildauer kann auch heißen: findet nichts.
- Absprungrate isoliert. Eine Landingpage mit einem CTA und hoher „Absprungrate" kann
  hervorragend konvertieren.
- Seitenaufrufe als Ziel. Mehr Klicks bis zur Anfrage sind ein Problem, kein Erfolg (siehe
  3-Klick-Regel).

## Bewusst nicht übernommen

Der Teil „Erst die Hypothese" bis „Dokumentieren" ist aus `ab-testing` von
coreyhaines31/marketingskills (MIT) destilliert, die Formularkennzahlen in
`58-formulare-und-anfragestrecken.md` aus `cro` und `signup`. Diese Punkte gelten hier anders:

| Die Quelle sagt | Hier gilt | Grund |
|---|---|---|
| Stichprobentabellen als fertige Werte | eigene Rechnung mit offengelegter Formel | die beiden Tabellen der Quelle widersprechen sich (für 1 % Ausgangsquote und +10 % einmal rund 150.000, einmal 380.000 je Variante); die Werte hier sind nachrechenbar |
| 95 % Konfidenz heißt „weniger als 5 % Wahrscheinlichkeit, dass das Ergebnis Zufall ist" | Erklärung oben unter „Was 95 % bedeutet" | so formuliert ist es die verbreitetste Fehldeutung des p-Werts und führt zu überschätzten Gewinnern |
| Testwerkzeuge PostHog, Optimizely, VWO, LaunchDarkly ohne Hinweis auf Einwilligung | Werkzeug erst nach Einwilligung, Folgen für die Stichprobe einplanen | § 25 TDDDG, `07-recht-dsgvo.md` |
| Programm mit vier bis acht Tests im Monat, Gewinnquote 20 bis 30 %, Rückstau von 20 Ideen | nicht übernommen | ohne Quelle angegeben und für Seiten mit 1.000 Sitzungen im Monat unerreichbar; hier gilt der monatliche Review oben |
| Verteilung 90/10 zur Risikobegrenzung | 50/50 als Regel | bei kleinem Volumen verlängert jede ungleiche Verteilung den Test um ein Vielfaches |
| Beispielhypothese mit „+15 %" als erwarteter Wirkung | Richtung und Kennzahl, keine Prozentzahl vorab versprechen | die Zahl ist eine Schätzung, die im Kundengespräch wie eine Zusage klingt |

## Verwandte Kapitel

- `06-conversion-architektur.md`: Seitenprüfung nach Wirkung, Testideen aus dem Befund
- `58-formulare-und-anfragestrecken.md`: was am Formular gemessen wird
- `07-recht-dsgvo.md`: Consent, Consent Mode, § 25 TDDDG
- `03-technik-performance.md`: Ladezeit und CLS, die ein Testskript verschlechtern kann
- `../playbooks/landingpage.md`: Varianten und `canonical`
