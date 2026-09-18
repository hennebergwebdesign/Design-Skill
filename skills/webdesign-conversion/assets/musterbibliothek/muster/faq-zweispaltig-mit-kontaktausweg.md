---
id: faq-zweispaltig-mit-kontaktausweg
name: Zweispaltiges FAQ mit Kontaktausweg
kategorie: faq
sektionstyp: [faq, cta]
tags: [akkordeon, zweispaltig, einwandbehandlung, ausweich-cta]
stil: [clean, corporate]
branchenbezug: [dienstleistung, b2b-software, handwerk, gesundheit]
ux_zweck: Einwände abräumen und den Weg für die nicht beantwortete Frage offen halten
conversion_zweck: wer nach dem Lesen noch zögert, findet den Kontakt ohne zu suchen
responsiv: einspaltig ab etwa 900 px, Kontextspalte über das Akkordeon, CTA bleibt am Ende sichtbar
komplexitaet: niedrig
barrierefreiheit: natives details/summary oder korrekte aria-expanded-Auszeichnung, Tastaturbedienung ohne Zusatzcode
verwandt: []
quelle_url: https://21st.dev/
quelle_erfasst: 2026-09-17
konfidenz: mittel
freigabe: bestand
aufgenommen: 2026-09-18
---

# Zweispaltiges FAQ mit Kontaktausweg

## Prinzip

Der Bereich ist zweigeteilt. Links steht der Kontext: eine Überschrift, ein Satz und eine
Handlungsaufforderung für alle Fragen, die in der Liste nicht vorkommen. Rechts steht das
Akkordeon mit den Fragen selbst. Beides bleibt getrennt, statt einen Kontaktbaustein zwischen
die Fragen zu schieben.

## Warum es wirkt

Ein FAQ hat zwei Aufgaben, die sich gegenseitig stören, wenn sie im selben Element stecken.
Die Liste räumt bekannte Einwände ab, siehe `06-conversion-architektur.md`. Der Kontakt fängt
den Fall auf, den die Liste nicht kennt. Vermischt man beides, unterbricht der Kontaktbaustein
das Lesen der Liste, und wer eine Antwort sucht, verliert die Spur.

Die Trennung hält außerdem die Liste kurz. Eine FAQ-Liste wächst sonst, weil jede unbeantwortete
Frage als weiterer Eintrag nachgereicht wird, bis niemand mehr etwas findet. Der Ausweg nach
links ist das Ventil, das diesen Druck nimmt.

## Belege

| Aussage | Beleg |
|---|---|
| zweispaltiger Aufbau, links Kontext, rechts Akkordeon | beobachtet, im vorgelegten Quelltext `faq-akkordeon.tsx` |
| eigener CTA in der Kontextspalte | beobachtet, ebenda |
| Umbruchverhalten und Breakpoint | abgeleitet aus der Spaltenbreite, nicht im Browser geprüft |
| Wirkung auf die Zahl der Anfragen | unbekannt, nicht gemessen |

## Umsetzung

- Natives `details`/`summary` reicht und bringt Tastaturbedienung, Suchbarkeit im Browser und
  korrekte Semantik mit. Eine eigene Akkordeonmechanik lohnt erst bei animierter Höhe.
- Die Fragen werden in der Sprache der Zielgruppe gestellt, nicht in der des Unternehmens,
  siehe `12-copywriting.md`. „Was kostet das?" schlägt „Preisgestaltung".
- Der Ausweich-CTA nutzt denselben Wortlaut wie die primäre Handlung der Seite, siehe die
  Regel zur einheitlichen Benennung in `06-conversion-architektur.md`.
- Sind es weniger als fünf Fragen, trägt die Zweiteilung nicht. Dann einspaltig bleiben.

## Was nicht übernommen wird

Die Fragen und Antworten der Vorlage. Ein FAQ mit erfundenen Fragen ist Dekoration: die Fragen
kommen aus dem Vertrieb des Kunden, aus E-Mails und aus Telefonaten. Fehlen sie, steht dort
`[[FEHLT: fünf echte Fragen aus dem Vertrieb]]` und keine plausible Erfindung.
