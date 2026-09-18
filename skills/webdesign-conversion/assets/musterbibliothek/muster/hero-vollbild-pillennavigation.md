---
id: hero-vollbild-pillennavigation
name: Vollbild-Held mit freistehender Pillennavigation
kategorie: hero
sektionstyp: [hero, navigation]
tags: [vollbild, bildhintergrund, gestaffelte-animation, navigation-ueber-bild]
stil: [expressive, clean]
branchenbezug: [dienstleistung, gastronomie, immobilien, tourismus]
ux_zweck: eine Aussage vor allem anderen, Orientierung ohne eigene Kopfzeile
conversion_zweck: die primäre Handlung liegt im ersten Bildschirm und bleibt über dem Bild lesbar
responsiv: Pillennavigation weicht auf ein Menü, Textblock rückt nach unten, Bild bleibt Hintergrund
komplexitaet: niedrig
barrierefreiheit: Kontrast nur über eine Abdunklungsschicht sicherstellen, Fokusring muss auf dem Bild sichtbar bleiben
verwandt: [hero-schwebende-produktbilder]
quelle_url: https://21st.dev/
quelle_erfasst: 2026-09-17
konfidenz: mittel
freigabe: bestand
aufgenommen: 2026-09-18
---

# Vollbild-Held mit freistehender Pillennavigation

## Prinzip

Der erste Bildschirm ist ein Bild in voller Höhe. Die Navigation sitzt nicht in einer eigenen
Kopfzeile mit eigener Fläche, sondern schwebt als abgerundete Leiste über dem Bild. Darunter
folgen Überschrift, ein kurzer Satz und die Handlungsaufforderung, alle mit leicht versetztem
Eintritt. Unmittelbar unter dem Held steht eine Reihe Partnerlogos.

## Warum es wirkt

Eine eigene Kopfzeile kostet den oberen Bildstreifen und teilt den Bildschirm in zwei
Zonen: oben Verwaltung, unten Aussage. Die freistehende Leiste verzichtet auf diese Teilung,
das Bild beginnt oben und die Aussage bekommt den ganzen Raum. Der Preis dafür ist Kontrast,
und der ist der eigentliche Prüfpunkt dieses Musters.

Der versetzte Eintritt macht eine Rangfolge sichtbar, die im Standbild nur typografisch
vorhanden wäre: zuerst die Aussage, dann die Erklärung, dann die Handlung. Die Logoreihe
direkt darunter beantwortet die Frage nach dem Beweis, bevor sie gestellt wird, und ist der
Grund, warum das Muster über reine Wirkung hinaus trägt.

## Belege

| Aussage | Beleg |
|---|---|
| Held über volle Bildschirmhöhe, Bild als Hintergrund | beobachtet, im vorgelegten Quelltext `hero-vollbild.tsx` |
| Navigation als freistehende Pillenleiste über dem Bild | beobachtet, ebenda |
| gestaffelter Eintritt in vier Stufen | beobachtet, Klassen `animate-fade-slide-in-1` bis `-4` |
| Partnerlogoreihe direkt unter dem Held | beobachtet, ebenda |
| Verhalten auf kleinen Geräten | unbekannt, die Vorlage wurde nicht im Browser erfasst |
| Kontrastwerte von Text auf Bild | unbekannt, hängt am jeweiligen Bild |

Die Einordnung als Vertrauensbeweis an dieser Stelle ist abgeleitet, nicht gemessen: sie
folgt der Reihenfolge in `06-conversion-architektur.md`, nicht einer Messung an dieser Seite.

## Umsetzung

- Höhe über `100svh`, nicht `100vh`, siehe die harte Grenze in `SKILL.md` und
  `16-responsive-container.md`.
- Kontrast entsteht über eine Abdunklungsschicht mit Tokenwert, nicht über einen Textschatten.
  Ohne diese Schicht ist der Text auf einem hellen Bildbereich unlesbar, und die Grenze von
  4,5:1 gilt auch hier.
- Der Fokusring der Pillennavigation braucht eine eigene Farbe gegen das Bild, der
  Standardring verschwindet auf dunklen Motiven.
- Der gestaffelte Eintritt gehört an die Motion-Tokens des Projekts, siehe
  `18-motion-handschrift.md`, nicht an die Keyframes der Vorlage.
- Bei `prefers-reduced-motion: reduce` entfällt der Versatz, die Opazität bleibt.

## Was nicht übernommen wird

Das Bildmotiv, die Partnerlogos und jede Beschriftung der Vorlage. Die Logoreihe wird mit
echten Partnern des Kunden gefüllt oder entfällt, ein erfundener Beweis ist ein Verstoß gegen
§ 5 UWG, siehe die harte Grenze gegen erfundene Zahlen. Farben und Schriften kommen aus dem
Designsystem des Kunden, siehe `../../references/24-designsystem-vorrang.md`.
