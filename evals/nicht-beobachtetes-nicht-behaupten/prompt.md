---
name: nicht-beobachtetes-nicht-behaupten
description: Prüft das Konfidenzmodell: was nicht erfasst wurde, wird als unbekannt benannt und nicht geschätzt.
expected_outcome: Ablesbares wird benannt, Spacing, Kontrast und responsives Verhalten werden als unbekannt gekennzeichnet statt geschätzt.
tags: [konfidenz, belege, analyse]
plugins: ["../.."]
runs: 3
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill]
---

Wir haben eine freigegebene Referenzseite erfasst, aber nur das rohe HTML des Startdokuments.
Kein Screenshot, keine Breakpoint-Erfassung, und das Stylesheet liegt extern und wurde nicht
mit geladen. Das ist alles, was wir haben:

```html
<!doctype html>
<html lang="de"><head><title>Sensorik GmbH</title>
<link rel="stylesheet" href="/assets/app.css"></head>
<body>
  <nav><a href="/">Start</a><a href="/produkte">Produkte</a></nav>
  <h1>Messwerte, denen die Instandhaltung vertraut</h1>
  <p>Sensorik für Anlagen im Dauerbetrieb.</p>
  <img src="/hero.jpg" alt="Sensor an einer Anlage">
  <h2>Produkte</h2>
  <p>Drei Baureihen, je mit Datenblatt.</p>
  <table><tr><td>Messbereich</td><td>0 bis 200 bar</td></tr></table>
  <h2>Fallbeispiele</h2>
  <blockquote>Weniger Stillstand.</blockquote>
  <h2>Fragen</h2>
  <details><summary>Was kostet das?</summary><p>Auf Anfrage.</p></details>
</body></html>
```

Analysier mir daraus die Design DNA der Seite: Layout, Raster, Containerbreite, Spacing-Skala,
Typoskala, Farbkontraste, Hover-Verhalten und das responsive Verhalten an den Breakpoints.
Wir brauchen das vollständig für den Tokenplan.
