# Conversion-Audit einer bestehenden Website

Ablauf für die Prüfung einer vorhandenen Seite. Ergebnis ist eine priorisierte Liste, keine
Mängelsammlung. Reihenfolge der Befunde: **was am meisten Anfragen kostet, zuerst.**

## Vorbereitung

Vor dem ersten Blick auf die Seite:

- Wer ist die Zielgruppe? Was ist die primäre Conversion?
- Wie viele qualifizierte Anfragen kamen letzte Woche, letzten Monat, letztes Jahr über
  die Seite? (Die ehrliche Antwort ist meistens der eigentliche Auftrag.)
- Woher kommt der Traffic: organisch, bezahlt, direkt, Empfehlung?
- Gibt es Analytics-Zugang, Search Console, Heatmap?

## Durchgang 1: die sieben teuren Fehler

Schnellprüfung in 15 Minuten, gibt sofort die Grobrichtung.

| # | Fehler | Prüfung |
|---|---|---|
| 1 | „Ich-Ich-Ich" | Redet die Startseite über den Besucher oder über die Firma? Erste 50 Wörter zählen |
| 2 | Unsichtbare Zielgruppe | Steht irgendwo, für wen das Angebot ist? Könnte ein Wettbewerber denselben Text nutzen? |
| 3 | Mobile-Desaster | Auf einem echten Telefon öffnen. Bedienbar? Buttons erreichbar? Text lesbar? |
| 4 | Ladezeit | PageSpeed Insights mobil. Über 3 s = akuter Befund |
| 5 | Keine Trust-Elemente | Referenzen, Zahlen, Bewertungen, Logos, oder nur Behauptungen? |
| 6 | Formular | Wie viele Felder? Mehr als 5 = Befund |
| 7 | Kein klarer CTA | Wie viele verschiedene Handlungsaufforderungen gibt es? Welche ist die wichtigste? |

## Durchgang 2: die sechs Bereiche

### 1 Strategie
- [ ] Zielgruppe erkennbar benannt
- [ ] USP beantwortet „warum ihr und nicht die anderen"
- [ ] Einwände (Preis, Kompetenz, Timing) werden auf der Seite beantwortet
- [ ] Floskelquote: wie oft „kompetent", „professionell", „langjährige Erfahrung"?

### 2 Design & UX
- [ ] Above the Fold: vier Fragen in 5 Sekunden beantwortet?
- [ ] Wichtigster CTA links oben im F-Muster, nicht rechts oben versteckt
- [ ] Sticky Navigation mit den relevanten Zielen
- [ ] 3-Klick-Regel: Anfrage, Referenzen, Prozess, Preise
- [ ] Hero zeigt ein Ergebnis, kein Stock-Foto
- [ ] Visuelle Hierarchie: ist klar, was das Wichtigste auf jedem Bildschirm ist?

### 3 Technik
- [ ] LCP, CLS, INP (Lab und Feld)
- [ ] Bildgrößen und Formate
- [ ] Fünf Breakpoints plus 1366 × 768
- [ ] Ohne JavaScript noch nutzbar?
- [ ] Security- und Cache-Header

### 4 Barrierefreiheit
- [ ] BFSG-Betroffenheit: kann auf der Seite gekauft, gebucht oder vertraglich angefragt werden?
- [ ] Kontraste
- [ ] Tab-Durchlauf und Fokussichtbarkeit
- [ ] Alt-Texte
- [ ] axe/Lighthouse-Lauf

### 5 SEO
- [ ] Meta-Titel und -Beschreibungen: vorhanden, einmalig, in der Länge?
- [ ] URL-Struktur
- [ ] `robots.txt`, Sitemap, Canonicals, `noindex`-Konsistenz
- [ ] Interne Verlinkung: 2–4 Links je Seite, aussagekräftige Ankertexte?
- [ ] Search Console: Indexierungsfehler, verlorene Rankings, Core Web Vitals
- [ ] JSON-LD vorhanden und gültig?
- [ ] Verwaiste Seiten (in der Sitemap, aber nirgends verlinkt)

### 6 Conversion-Architektur
- [ ] CTA-Hierarchie: ein Primär-CTA, mehrfach, mit einheitlichem Text
- [ ] Formularlänge und Feldbegründungen
- [ ] Trust-Elemente: Anzahl, Platzierung, Belegbarkeit
- [ ] „Über uns"-Seite nach der Sechs-Schritte-Formel oder Firmenchronik?
- [ ] FAQ vorhanden, mit echten Vorkauffragen?
- [ ] Preise sichtbar oder zumindest eine Spanne?

## Durchgang 3: Recht

- [ ] Impressum vollständig nach § 5 DDG
- [ ] Datenschutzerklärung beschreibt genau die laufenden Dienste
- [ ] Consent blockiert wirklich (Netzwerk-Tab ohne Entscheidung)
- [ ] Ablehnen gleichrangig, keine Vorauswahl, Widerruf möglich
- [ ] Bei Verkauf: AGB, Widerruf, Preisangaben
- [ ] Erfundene oder unbelegte Werbeaussagen, Bewertungen, Verknappung?

## Bericht

Aufbau des Ergebnisses:

1. **Ein Satz Gesamtbefund.** Ist die Seite ein Vertriebs-Asset oder Dekoration?
2. **Die drei teuersten Befunde**, je mit geschätzter Wirkung und Aufwand.
3. **Vollständige Liste**, sortiert nach Wirkung, in vier Töpfe:
   - *Sofort* (unter einer Stunde, hohe Wirkung)
   - *Kurzfristig* (wenige Tage)
   - *Umbau* (Neubau einer Sektion oder Seite)
   - *Strategisch* (Positionierung, kompletter Relaunch)
4. **Was gut ist.** Ein Audit, das nur Mängel listet, wird nicht umgesetzt.
5. **Empfehlung mit Begründung:** optimieren oder neu bauen? Eine Seite ohne Strategie,
   ohne Mobiloptimierung und ohne Tokensystem zu flicken ist oft teurer als ein Neubau.

## Faustregeln für die Priorisierung

| Befund | Typische Wirkung | Typischer Aufwand |
|---|---|---|
| Kein klarer CTA / uneinheitlicher CTA-Text | hoch | niedrig |
| Formular von 9 auf 4 Felder | hoch | niedrig |
| Above the Fold neu texten | hoch | mittel |
| Trust-Elemente ergänzen | hoch | mittel (Material besorgen) |
| Bilder komprimieren | mittel | niedrig |
| Meta-Titel und -Beschreibungen | mittel | niedrig |
| Mobile Bedienbarkeit reparieren | hoch | hoch |
| Barrierefreiheit auf AA bringen | Pflicht | hoch |
| Positionierung schärfen | sehr hoch | hoch, aber Grundlage für alles |
