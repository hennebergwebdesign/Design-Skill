---
version: alpha
name: [[FEHLT: Markenname]]
description: [[FEHLT: Ein Satz. Für wen, und wie es sich anfühlen soll.]]
colors:
  primary: "#111827"      # Haupttextfarbe für Überschriften und Fließtext. Ersetzen.
  secondary: "#6B7280"    # gedämpfter Text und Linien. Ersetzen.
  tertiary: "#2563EB"     # die EINE Akzentfarbe, nur Buttons und Links. Ersetzen.
  neutral: "#F9FAFB"      # Seitenhintergrund. Ersetzen.
  surface: "#FFFFFF"      # Karten und Eingabefelder. Ersetzen.
  on-tertiary: "#FFFFFF"  # Text auf dem Akzent, mindestens 4,5:1. Ersetzen.
typography:
  headline-lg:
    fontFamily: [[FEHLT: Schrift für Überschriften]]
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  body-md:
    fontFamily: [[FEHLT: ruhige Schrift für Fließtext]]
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: [[FEHLT: dieselbe wie Fließtext]]
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.02em
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-tertiary}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 32px
  caption:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
---

# [[FEHLT: Markenname]]

Diese Datei wird aus `marke.json` und dem Markenbrief **abgeleitet** (`47-claude-design-hacks.md`,
Abschnitt 2). Weichen beide ab, gilt `marke.json`. Jede Zeile mit Zahl oder Hexwert, nie "schön" oder
"clean". Was die Markenunterlagen nicht sagen, steht als TODO. Nie einen Wert erfinden. Länge unter 250 Zeilen.

## Overview

[[FEHLT: Zwei bis drei Sätze. Für wen? Ruhig oder laut? Dicht oder luftig? Foto, Illustration oder Typografie? Eine reale Marke nennen, der es nahekommen soll, nur als Stilhinweis.]]

## Colors

- **Primary (#111827):** Haupttext. Überschriften und Fließtext.
- **Secondary (#6B7280):** gedämpfter Text, Linien, Bildunterschriften.
- **Tertiary (#2563EB):** der einzige Akzent. Buttons und Links. Sonst nichts.
- **Neutral (#F9FAFB):** Seitenhintergrund.
- **Surface (#FFFFFF):** Karten und Eingabefelder.

[[FEHLT: Regel, wie oft der Akzent vorkommt, zum Beispiel einmal je Bildschirm.]]

## Typography

Zwei Schriften. **[[FEHLT]]** (600) für Überschriften. **[[FEHLT]]** (400 und 600) für alles andere.
Fließtext 16 px, Zeilen unter 75 Zeichen. Beide frei für kommerzielle Nutzung, Lizenz geprüft und
**lokal ausgeliefert**, nicht vom Anbieter-Server. Freie Ersatzschrift: [[FEHLT]].

## Layout

[[FEHLT: Raster und Seitenbreite, zum Beispiel 12 Spalten, 1120 px.]] Abstände aus der Skala 8, 16, 32 und
64 px. Sektionen 64 px auseinander (im Projekt gelten die fließenden Tokens aus `tokens.css`).

## Elevation & Depth

[[FEHLT: Schatten oder flach? Zum Beispiel: keine Schatten, Tiefe durch 1 px Rand in der Sekundärfarbe.]]

## Shapes

Ecken 8 px bei Buttons, 16 px bei Karten. Pillenform (9999 px) nur für Tags.

## Components

- **Buttons:** Akzentfläche, Text label-md, 12 px Innenabstand. Hover dunkelt zur Primärfarbe.
- **Karten:** weiße Fläche, 16 px Ecken, 32 px Innenabstand.
- **Eingabefelder:** [[FEHLT: Rand, Höhe, Fokusring, Fehlerzustand.]]

## Do's and Don'ts

- Do: den Akzent einmal je Bildschirm auf die Hauptaktion setzen.
- Do: Textkontrast mindestens 4,5:1 halten.
- Don't: eine zweite Akzentfarbe.
- Don't: eine dritte Schrift.
- Don't: [[FEHLT: eine weitere Regel, die das Markenbuch zeigt, von der Seite zum Fehlgebrauch kopiert.]]

## Iconography

Ein Iconset: [[FEHLT: z. B. eigenes SVG-Set nach 17-icons-eigenes-system.md]]. 24 px, 2 px Strich, Textfarbe.
Keine Zierikonen. Firmenlogos kommen aus der echten Marke, nie von Hand gezeichnet.

## Voice

[[FEHLT: Drei Wörter für den Ton. Zwei echte Beispielzeilen der Marke. Fünf Wörter, die nie vorkommen.]]
Keine Gedankenstriche.
