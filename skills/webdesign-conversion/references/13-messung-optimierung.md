# Messung und laufende Optimierung

Ohne Daten keine Verbesserung. Eine Website ist nie fertig; ohne Pflege und Optimierung
stagniert alles.

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

## Was nicht gemessen werden soll

- Verweildauer als Erfolgsgröße. Lange Verweildauer kann auch heißen: findet nichts.
- Absprungrate isoliert. Eine Landingpage mit einem CTA und hoher „Absprungrate" kann
  hervorragend konvertieren.
- Seitenaufrufe als Ziel. Mehr Klicks bis zur Anfrage sind ein Problem, kein Erfolg (siehe
  3-Klick-Regel).
