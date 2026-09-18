---
id: hero-schwebende-produktbilder
name: Held mit schwebenden Produktbildern um eine zentrierte Aussage
kategorie: hero
sektionstyp: [hero, product]
tags: [zentriert, freigestellt, schwebende-elemente, motion-statt-bildgrund]
stil: [clean, expressive]
branchenbezug: [handel, konsumgueter, produktanbieter]
ux_zweck: Produkt und Aussage gleichzeitig zeigen, ohne dass eines das andere verdeckt
conversion_zweck: die Handlungsaufforderung steht in der optischen Mitte, nicht am Rand
responsiv: schwebende Elemente werden auf kleinen Geräten zu wenigen oder entfallen, Aussage bleibt zentriert
komplexitaet: mittel
barrierefreiheit: die Bewegung ist dekorativ und entfällt bei prefers-reduced-motion vollständig
verwandt: [hero-vollbild-pillennavigation]
quelle_url: https://21st.dev/
quelle_erfasst: 2026-09-17
konfidenz: niedrig
freigabe: bestand
aufgenommen: 2026-09-18
---

# Held mit schwebenden Produktbildern um eine zentrierte Aussage

## Prinzip

Statt eines Bildhintergrunds oder einer Zweiteilung steht die Überschrift zentriert, und
freigestellte Produktbilder verteilen sich um sie herum. Sie bewegen sich langsam und leicht
versetzt. Die Tiefe entsteht aus Bewegung und Überlappung, nicht aus einem Foto im
Hintergrund.

## Warum es wirkt

Ein Bildhintergrund zwingt zu einem Kompromiss: entweder das Bild ist ruhig genug für lesbaren
Text, oder es ist stark genug, um zu wirken. Freigestellte Elemente umgehen den Konflikt, weil
zwischen Text und Bild Fläche bleibt. Das Produkt ist dabei mehrfach und aus verschiedenen
Blickwinkeln zu sehen, was bei einem Sortiment mehr trägt als ein einzelnes Motiv.

Die Bewegung ist hier nicht Zierde, sondern der Träger der Tiefe. Steht sie still, bleibt eine
Collage. Das ist zugleich die Schwäche des Musters: bei `prefers-reduced-motion` fällt genau
das weg, was es trägt, und der Held muss auch dann noch funktionieren.

## Belege

| Aussage | Beleg |
|---|---|
| zentrierte Aussage, freigestellte Elemente ringsum | abgeleitet, die Vorlage enthielt nur den Aufrufcode |
| langsame, versetzte Bewegung der Elemente | abgeleitet aus den Klassennamen der Vorlage |
| Aufbau der Basiskomponente | unbekannt, der Quelltext von `hero-section-7` lag nicht vor |
| responsives Verhalten | unbekannt |

**Dieses Muster steht bewusst auf Konfidenz niedrig.** Die Nutzervorlage enthielt nur den
Demo-Aufruf, nicht den Quelltext der Komponente, siehe die Notiz in
`../../references/23-referenzkomponenten-21st.md`. Der fehlende Quelltext wurde nicht
nachgebaut. Vor dem Einsatz die echte Komponente über `npx shadcn@latest search` oder auf der
Registry nachschlagen.

## Umsetzung

- Freistellung braucht echte Produktfotos mit transparentem Hintergrund. Liegen die nicht vor,
  trägt das Muster nicht, und ein Platzhalter sieht hier schlechter aus als in jedem anderen
  Held.
- Die Bewegung über Transform und Opazität, nie über Positions- oder Größenwerte, sonst
  entstehen Layoutverschiebungen und ein CLS-Befund, siehe `03-technik-performance.md`.
- Bei `prefers-reduced-motion: reduce` stehen die Elemente still. Der Held muss auch dann eine
  klare Hierarchie haben, sonst ist das Muster für dieses Projekt falsch.
- Auf schmalen Geräten drei bis vier Elemente statt acht. Mehr wird zum Rauschen um den Text.

## Was nicht übernommen wird

Die Demo-Bilder der Registry. Jede Adresse auf `cdn.21st.dev` ist Demomaterial ohne Lizenz für
ein Kundenprojekt. Ebenso die Keyframes der Vorlage: die Bewegungssignatur wird aus der Marke
abgeleitet, siehe `../../references/18-motion-handschrift.md` und die harte Grenze zur eigenen
Handschrift.
