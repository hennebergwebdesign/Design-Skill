---
id: partnerlogos-als-integrationsraster
name: Partner- und Integrationslogos als eigenes Raster
kategorie: trust
sektionstyp: [trust, features]
tags: [logoraster, datengetrieben, vertrauensbeweis]
stil: [clean, corporate, technical-mono]
branchenbezug: [b2b-software, industrie, dienstleistung]
ux_zweck: Anschlussfähigkeit und Zugehörigkeit auf einen Blick zeigen
conversion_zweck: den Einwand "passt das zu dem, was wir schon haben" ohne Text beantworten
responsiv: Rasterbreite über auto-fit statt fester Spaltenzahl, Logos behalten ihre optische Größe
komplexitaet: niedrig
barrierefreiheit: jedes Logo braucht einen Alternativtext mit dem Namen, nicht "Logo"
verwandt: [bewertungen-als-eigene-sektion]
quelle_url: https://21st.dev/
quelle_erfasst: 2026-09-17
konfidenz: niedrig
freigabe: bestand
aufgenommen: 2026-09-18
---

# Partner- und Integrationslogos als eigenes Raster

## Prinzip

Fremde Logos stehen in einem eigenen Abschnitt mit eigenem Datenformat, nicht als Bilderreihe
im Fließtext. Je Eintrag gibt es Name, Logo, optional eine Rolle und optional einen Link.

## Warum es wirkt

Ein Logoraster beantwortet zwei verschiedene Fragen mit derselben Form. Bei einem
Softwareanbieter heißt sie „funktioniert das mit unserem Bestand", bei einem Dienstleister
„mit wem arbeiten die zusammen". Beides ist ein Vertrauensbeweis, der ohne Text auskommt und
deshalb im ersten Bildschirmdrittel funktioniert, wo für Text kein Platz ist.

Das eigene Datenformat ist der eigentliche Gewinn. Logos kommen in unterschiedlichen
Seitenverhältnissen, und ohne gemeinsame optische Größe wirkt ein breites Logo dreimal so
wichtig wie ein quadratisches. Ein Datensatz erzwingt die Normalisierung an einer Stelle statt
in jeder Sektion neu.

## Belege

| Aussage | Beleg |
|---|---|
| eigener Abschnitt mit eigenem Datenformat | beobachtet, im vorgelegten Demo-Aufruf |
| Rasterdarstellung statt Reihe | abgeleitet aus dem Namen und der Aufrufsignatur |
| Aufbau der Basiskomponente | unbekannt, `integrations-5` lag nicht im Quelltext vor |
| optische Normalisierung der Logogrößen | abgeleitet, nicht in der Vorlage gesehen |

## Umsetzung

- Optische statt geometrischer Größe: jedes Logo bekommt eine maximale Höhe **und** eine
  maximale Breite, und die Feineinstellung erfolgt je Logo mit einem Kommentar „bewusst", sonst
  meldet `pruefe-tokens.mjs` den Wert zu Recht.
- Alternativtext ist der Name des Unternehmens, nicht „Logo". Ein Raster aus zwölf Bildern mit
  dem Alternativtext „Logo" ist für einen Screenreader wertlos.
- Graustufen für alle Logos sind eine Gestaltungsentscheidung, keine Voreinstellung. Sie
  vereinheitlichen, können aber die Marke eines Partners verfremden, was bei
  Markenrichtlinien ein Problem ist.
- Die Logos sind fremde Marken. Sie dürfen nur mit Erlaubnis verwendet werden, siehe die
  rechtliche Abgrenzung in `../../references/20-markenextraktion-bestandsseite.md`. Ohne
  geklärte Erlaubnis steht dort ein offener Punkt, kein stillschweigendes Ja.

## Was nicht übernommen wird

Die Demo-Logos der Registry und jedes Logo, für das keine Erlaubnis vorliegt. Ein Raster aus
bekannten Marken, mit denen der Kunde nicht zusammenarbeitet, ist eine Irreführung nach
§ 5 UWG und nicht nur ein Markenrechtsproblem.
