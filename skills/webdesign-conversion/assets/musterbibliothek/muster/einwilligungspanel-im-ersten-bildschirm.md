---
id: einwilligungspanel-im-ersten-bildschirm
name: Einwilligung als offenes Panel mit gleich gewichteten Wegen
kategorie: forms
sektionstyp: [forms, hero]
tags: [einwilligung, schalter, panel, gleichgewicht]
stil: [clean, material-flat]
branchenbezug: [alle]
ux_zweck: die Wahl über Daten liegt offen im Blick, nicht hinter einem Überlagerungsfenster
conversion_zweck: vermeidet das Wegklicken per Reflex und hält die Einwilligung belastbar
responsiv: unbekannt, nur Desktop erfasst
komplexitaet: mittel
barrierefreiheit: Schalter sind echte Bedienelemente mit Namen und Zustand, Ablehnen und Annehmen haben dieselbe Größe und Betonung. Nichts ist vorausgewählt
verwandt: []
quelle_url: https://www.phunk.com/
quelle_erfasst: 2026-11-27
konfidenz: niedrig
freigabe: global
aufgenommen: 2026-11-27
---

# Einwilligung als offenes Panel mit gleich gewichteten Wegen

## Prinzip

Statt eines Überlagerungsfensters steht die Einwilligung als Panel mit Schaltern im ersten
Bildschirm, im Fluss der Seite. Jede Kategorie hat einen eigenen Schalter, am Ende stehen
Ablehnen und Annehmen als gleichwertige Knöpfe.

## Warum es wirkt

Ein Panel im Fluss verdeckt nichts und lässt sich lesen, ohne dass die Seite blockiert
wird. Die gleichwertigen Wege verhindern, dass eine Einwilligung durch Gestaltung erzwungen
wird. Das Panel ist damit die gestalterische Seite der rechtlichen Pflicht.

## Belege

| Aussage | Beleg |
|---|---|
| Panel mit Schaltern sichtbar im ersten Bildschirm | beobachtet, Screenshot 1440 |
| Schalter je Kategorie, am Ende zwei Knöpfe | beobachtet, ebenda |
| Gleichgewicht der beiden Knöpfe | abgeleitet, aus dem Standbild, nicht gemessen |
| Rechtliche Tragfähigkeit der Referenz | unbekannt, nicht geprüft |
| Verhalten bei 390 Pixel | unbekannt |

## Umsetzung

- Das Muster ist nur die Form. Die Funktion (Skripte erst nach Einwilligung laden) kommt aus
  dem Consent Baustein des Agenturstacks, siehe `07-recht-dsgvo.md`. Ein Panel ohne
  diese Funktion täuscht eine Einwilligung vor und wird nicht gebaut.
- Nichts vorausgewählt, Ablehnen so groß und so farbig wie Annehmen.
- Schalter als Checkbox oder `role="switch"` mit sichtbarem Zustand, Fokus sichtbar.
- Das Panel steht im Fluss und verdeckt weder Aussage noch Handlung.

## Was nicht übernommen wird

Texte, Kategorien und Gestaltung der Referenz. Die Rechtslage der Referenz wurde nicht
geprüft. Jedes Projekt braucht die eigene, rechtlich geprüfte Einwilligungslösung.
