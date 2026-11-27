---
id: versuchsuebersicht-mit-transparenz
name: Laufende Versuche offen zeigen, mit Begründung, warum
kategorie: trust
sektionstyp: [trust, cases]
tags: [versuche, standorte, transparenz, kennzahlen-tabelle, naechstes-update]
stil: [editorial, industriell]
branchenbezug: [landwirtschaft, technik, forschung, industrie]
ux_zweck: der Stand der Belege ist sichtbar, auch dort, wo er noch nicht fertig ist
conversion_zweck: Vertrauen durch ehrlichen Zwischenstand, bevor Ergebnisse vorliegen, mit klarem Weg zur Anfrage
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: mittel
barrierefreiheit: Karte mit Standorten braucht eine Textliste derselben Orte, nie die Karte allein. Kennzahlen als echte Tabelle mit Kopfzellen
verwandt: [problem-grosse-zahl-mit-quelle]
quelle_url: https://www.farmminerals.com/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# Laufende Versuche offen zeigen

## Prinzip

Eine Kennzahlentabelle steht neben einem Foto aus dem Feld, danach folgt ein Abschnitt
mit den Standorten laufender Versuche als Liste und als Karte. Ein eigener Block erklärt,
warum der Zwischenstand veröffentlicht wird, und kündigt das nächste Update an.

## Warum es wirkt

Wer Ergebnisse erst nach Abschluss zeigt, hat bis dahin nichts zu belegen. Der offene
Zwischenstand beantwortet die Frage nach der Wirkung mit dem, was wirklich vorliegt, und die
Begründung, warum er geteilt wird, macht Unfertiges zur Haltung. Die Tabelle statt
Kennzahlenkacheln hält die Werte vergleichbar und nüchtern.

## Belege

| Aussage | Beleg |
|---|---|
| Kennzahlen als zeilenweise Liste neben dem Foto | beobachtet, Screenshot 1440 |
| Standortliste mit zehn Ländern und eine Karte | beobachtet, Überschriftenstruktur und Screenshot |
| eigener Begründungsblock zum Teilen des Zwischenstands, dazu Hinweis auf das nächste Update | beobachtet, Überschriften und Screenshot |
| Inhalte und Stand der Ergebnisse | unbekannt, nicht geprüft |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Nur Daten zeigen, die im Projekt vorliegen. Ein erfundener Zwischenstand ist ein Verstoß
  gegen § 5 UWG und gegen die Regel gegen erfundene Belege.
- Kennzahlen als `table` mit Datum und Herkunft je Zeile, Update Datum sichtbar.
- Standorte zuerst als Liste im Text, die Karte ist Ergänzung und trägt `role="img"` mit
  Beschreibung. Die Karte darf ohne Skript und ohne Fremdserver auskommen (Consent bei
  Kartendiensten, siehe `07-recht-datenschutz.md`).
- Der Begründungsblock nennt Zweck und Maßstab des Versuchs in zwei Sätzen.

## Was nicht übernommen wird

Länder, Kennzahlen, Texte und Produkte der Referenz. Das Muster trägt nur, wenn es echte
Zwischenstände gibt. Ohne Daten ist es leere Form.
