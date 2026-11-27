---
id: faq-als-chatverlauf
name: FAQ als Gesprächsverlauf mit Frage und Antwort als Sprechblasen
kategorie: faq
sektionstyp: [faq]
tags: [sprechblasen, gespraechsform, einwandbehandlung, titel-links]
stil: [clean, expressive]
branchenbezug: [software, dienstleistung, b2b]
ux_zweck: Fragen und Antworten lesen sich wie ein Dialog, die Rollen sind ohne Beschriftung erkennbar
conversion_zweck: Einwände wirken wie eine Antwort an die Besucherin oder den Besucher, nicht wie ein Kleingedrucktes
responsiv: unbekannt, nur bei 1440 Pixel gesehen, mobiles Umbrechen der Blasen nicht erfasst
komplexitaet: niedrig
barrierefreiheit: Die Blasen sind nur Optik. Als Quelltext bleibt es eine Liste aus Frage und Antwort, am besten als details mit summary, sonst ist der Verlauf für Tastatur und Screenreader eine Wand aus Text
verwandt: [faq-zweispaltig-mit-kontaktausweg]
quelle_url: https://area.us/
quelle_erfasst: 2026-11-27
konfidenz: mittel
freigabe: global
aufgenommen: 2026-11-27
---

# FAQ als Gesprächsverlauf

## Prinzip

Der FAQ Abschnitt zeigt jede Frage als dunkle Sprechblase auf der einen Seite und die
Antwort als helle Blase auf der anderen. Die Überschrift des Abschnitts steht links
daneben, am Ende lädt eine letzte Zeile zu einer weiteren Frage ein.

## Warum es wirkt

Ein Dialog ist die ursprüngliche Form, in der Einwände geklärt werden. Die Rollen müssen
nicht beschriftet werden, weil Seite und Farbe sie tragen. Das senkt die Hürde, überhaupt
zu lesen, und macht aus Einwandbehandlung ein Gespräch statt einer Rechtfertigung. Der Preis
ist Länge: Blasen brauchen mehr Fläche als ein Akkordeon, deshalb trägt das Muster bei
fünf bis acht Fragen und nicht bei zwanzig.

## Belege

| Aussage | Beleg |
|---|---|
| Frage dunkel auf der einen, Antwort hell auf der anderen Seite | beobachtet, Screenshot Desktop |
| Abschnittstitel links neben dem Verlauf | beobachtet, ebenda |
| Schlusszeile lädt zu einer weiteren Frage ein | beobachtet, ebenda |
| im Quelltext ohne details Elemente, ein einziges aria-expanded | beobachtet, Rohquelltext der Startseite |
| Tastaturbedienung der Blasen | unbekannt |
| Verhalten auf kleinen Geräten | unbekannt |

Dass die Antworten dauerhaft offen stehen, ist abgeleitet aus dem Fehlen von Schaltern im
Quelltext, nicht geprüft.

## Umsetzung

- Als `details` mit `summary` bauen, die Blasenform ist reines CSS. Ein Verlauf ohne
  Schalter ist erlaubt, wenn alle Antworten kurz sind und dauerhaft offen stehen.
- Zwei Tokens genügen: Blasenfläche dunkel und hell, beide mit 4,5 zu 1 gegen ihren Text.
- Antworten bleiben unter etwa 60 Wörtern, sonst kippt der Verlauf in einen Textblock.
- Der Kontaktweg gehört in die Schlusszeile, siehe `faq-zweispaltig-mit-kontaktausweg`.
- Strukturierte Daten für FAQ nur, wenn die Antworten im sichtbaren Text stehen, siehe
  `05-seo-geo.md`.
- Mobil: Blasen auf volle Breite, Rollen über Einzug und Farbe unterscheiden.

## Was nicht übernommen wird

Die Fragen und Antworten, die Überschrift und die Farben der Referenz. Der Verlauf ist
Prinzip, die dunkle Blase auf hellem Grund ist es nicht. Antworten sind Beispiele und je
Kunde fachlich und rechtlich zu prüfen.
