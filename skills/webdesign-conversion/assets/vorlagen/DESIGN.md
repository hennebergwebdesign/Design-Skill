---
# ABZUG, NICHT QUELLE. Erzeugt aus marke.json und src/styles/tokens.css, siehe
# 57-design-md.md. Werte werden dort geändert und hier neu abgezogen, nie umgekehrt.
# Die Beispielwerte sind dieselbe grüne Marke wie in marke.json und tokens.css.
version: alpha
name: "[KUNDE]"
description: "[[FEHLT: gestaltung.lesart aus marke.json, ein Satz]]"
colors:
  # Rollen aus marke.json farbe.rollen, aufgelöst zu Hex. primary ist die Rolle akzent.
  primary: "#6acc9a"
  on-primary: "#151717"
  marke: "#6acc9a"
  marke-hell: "#d5f1e3"
  marke-text: "#356a4f"
  akzent-hover: "#9adcba"
  flaeche: "#ffffff"
  flaeche-alt: "#f5fbf8"
  flaeche-dunkel: "#151717"
  text: "#151717"
  text-leise: "#5c6360"
  text-invers: "#f6f7f6"
  rahmen: "#e3e8e5"
  rahmen-stark: "#cecece"
  fokus: "#151717"
  erfolg: "#356a4f"
  fehler: "#b52b2b"
  warnung: "#9a6700"
typography:
  # fontSize ist der Höchstwert bei 1440 px. Die Stufen sind fließend (clamp in tokens.css),
  # das Format kennt nur px, em und rem. Mindestwerte stehen im Abschnitt Typography.
  h1:
    fontFamily: Outfit
    fontSize: 4.4975rem
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.025em
  h2:
    fontFamily: Outfit
    fontSize: 3.1806rem
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: -0.015em
  h3:
    fontFamily: Outfit
    fontSize: 2.2494rem
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: -0.015em
  h4:
    fontFamily: Outfit
    fontSize: 1.5906rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0em
  lead:
    fontFamily: Instrument Sans
    fontSize: 1.3375rem
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Instrument Sans
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  klein:
    fontFamily: Instrument Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.01em
rounded:
  s: 0.5rem
  m: 1rem
  l: 1.75rem
  pille: 999px
spacing:
  # Raumskala aus marke.json raum.skala, als Tokens --raum-1 bis --raum-32.
  "1": 0.25rem
  "2": 0.5rem
  "3": 0.75rem
  "4": 1rem
  "6": 1.5rem
  "8": 2rem
  "12": 3rem
  "16": 4rem
  "24": 6rem
  "32": 8rem
components:
  # Nur Bausteine, die es im Projekt gibt. Fehlt einer im Code, fehlt er auch hier.
  button-primaer:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  button-primaer-hover:
    backgroundColor: "{colors.akzent-hover}"
    textColor: "{colors.on-primary}"
  link:
    textColor: "{colors.marke-text}"
  karte:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
  sektion-alt:
    backgroundColor: "{colors.flaeche-alt}"
    textColor: "{colors.text-leise}"
  sektion-dunkel:
    backgroundColor: "{colors.flaeche-dunkel}"
    textColor: "{colors.text-invers}"
  feld:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
  fehlermeldung:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.fehler}"
---

# Designsystem: [KUNDE]

Abzug vom [DATUM] aus `marke.json` und `src/styles/tokens.css`. Wer hier etwas ändern
will, ändert es dort und zieht diese Datei neu ab. Bei einem Widerspruch gilt `marke.json`.

## Overview

[[FEHLT: Lesart aus marke.json gestaltung.lesart, wörtlich]]

[[FEHLT: Gegenstand und Zielgruppe in zwei Sätzen aus marke-brief.md Abschnitt 1 und 2]]

| Regler | Wert | Begründung |
|---|---|---|
| Varianz | [[FEHLT]] | [[FEHLT: aus marke.json gestaltung.regler.begruendung]] |
| Bewegung | [[FEHLT]] | [[FEHLT]] |
| Dichte | [[FEHLT]] | [[FEHLT]] |

Designsystem-Stufe nach `24-designsystem-vorrang.md`: [[FEHLT: 1, 2 oder 3, mit Quelle]].
Geschützt sind Farbe, Typografie, Logo, Form, Raum und Bausteine. Eine Referenz darf daran
nichts ändern.

## Colors

Komponenten greifen nur auf Rollen zu, nie auf die Rampe. Die Rolle entscheidet, wofür eine
Farbe benutzt werden darf:

| Rolle | Wert | Wofür | Kontrast |
|---|---|---|---|
| Markengrün, Fläche (`marke`, `primary`) | #6acc9a | Flächen und primäre Knöpfe, nie Text auf Hell | 1,96:1 auf Weiß |
| Tannengrün (`marke-text`) | #356a4f | Links, Kicker, Haken, Zahlen auf hellen Flächen | 6,31:1 auf Weiß |
| Tiefschwarz (`text`, `on-primary`) | #151717 | Fließtext, Text auf Markengrün | 9,18:1 auf Markengrün |
| Schiefergrau (`text-leise`) | #5c6360 | Nebentext | 6,0:1 auf Weiß |
| Weiß und Mintweiß (`flaeche`, `flaeche-alt`) | #ffffff, #f5fbf8 | Sektionswechsel | |
| Tiefschwarz als Fläche (`flaeche-dunkel`) | #151717 | die eine wiederkehrende dunkle Sektion | |

Die Kontrastwerte stammen aus `tokens.css` und werden mit `scripts/pruefe-kontrast.mjs`
nachgerechnet, nicht aus dieser Datei übernommen. Thema: [[FEHLT: hell oder dunkel aus
gestaltung.sperren.thema]]. Ein Dunkelmodus existiert nur, wenn er gepflegt wird.

## Typography

| Rolle | Familie | Schnitt | Größe 360 bis 1440 px | Lizenz |
|---|---|---|---|---|
| Überschriften | Outfit | 600, h1 700 | h1 33 bis 72 px, h2 28 bis 51 px | OFL, selbst gehostet |
| Text | Instrument Sans | 400, 600 | 16 bis 18 px | OFL, selbst gehostet |

Die Skala ist modular und fließend, gerechnet mit `scripts/typoskala.mjs`
(Stützpunkte 360, 1200 und 1440 px; Verhältnis 1.2, 1.333 und 1.414). Keine Schrift liegt
unter 14 px. Alle Größen in rem, damit die Einstellung der Person gilt. Regeln:
`55-typografie-system.md`.

## Layout

Inhaltsbreite 1200 px, Textbreite 64ch. Abstände kommen aus der Raumskala mit Basis 4 px,
Sektionen atmen fließend von 48 bis 96 px (`--raum-sektion`). Haltepunkte 480, 640, 861,
1100 und 1200 px; Komponenten reagieren auf ihren Container, nicht auf das Fenster.

[[FEHLT: Layoutkonzept in einem Satz aus marke-brief.md Abschnitt 7]]

## Elevation & Depth

Zwei Schatten, sonst Flächenwechsel: `--schatten-weich` für ruhende Karten,
`--schatten-hoch` für angehobene beim Zeigen. Tiefe entsteht über Flächenrollen, nicht über
Leuchteffekte.

## Shapes

Radien 0.5, 1 und 1.75 rem sowie Pille. Formsprache: [[FEHLT: gestaltung.sperren.form aus
marke.json, kantig, weich oder dokumentierte Mischregel]]. Innenradius gleich Außenradius
minus Abstand.

## Components

| Baustein | Datei im Projekt | Zustände |
|---|---|---|
| [[FEHLT: Knopf primär]] | [[FEHLT: src/components/ui/…]] | Ruhe, Zeigen (heller), Fokus sichtbar, gedrückt, gesperrt |
| [[FEHLT: Karte]] | [[FEHLT]] | Hover und Fokus heben an, abgeschaltet bei reduzierter Bewegung |

## Do's and Don'ts

- Do: eine primäre Handlungsaufforderung, wörtlich „[[FEHLT: sprache.cta_primaer]]", überall
  gleich benannt.
- Do: Markengrün nur als Fläche, Tannengrün für Text.
- Don't: [[FEHLT: was verworfen wurde, aus marke-brief.md Abschnitt 7]]
- Don't: Gedankenstriche im Seitentext, Silbentrennung, Schrift unter 14 px.
- Don't: Werte aus einer Referenz oder einem generierten Bild übernehmen.

## Motion

Profil [[FEHLT: motion.profil]]. Eintritt `cubic-bezier(0.22, 1, 0.36, 1)`, Austritt
`cubic-bezier(0.4, 0, 1, 1)`, Austritte kürzer als Eintritte. Der eine orchestrierte Moment:
[[FEHLT: motion.signatur_moment]]. Bei reduzierter Bewegung bleibt die Deckkraft, die
Bewegung entfällt.

## Iconography

Systemicons aus `[[FEHLT: icons.bibliothek]]`, eigenes Set nur für
[[FEHLT: icons.eigenes_set_fuer]], abgeleitet nach `17-icons-eigenes-system.md`. Raster
[[FEHLT: icons.raster]] px, Stil [[FEHLT: icons.stil]], Strich in Textfarbe. Keine
Zierikonen. Firmenlogos kommen aus der echten Marke, nie von Hand gezeichnet.

## Voice

Anrede [[FEHLT: sprache.anrede]], Ton [[FEHLT: sprache.ton, drei Wörter]]. Zwei echte
Beispielzeilen der Marke: [[FEHLT: aus marke-brief.md, nie erfunden]]. Nie verwendet:
[[FEHLT: sprache.verbotene_woerter]]. Keine Gedankenstriche.
