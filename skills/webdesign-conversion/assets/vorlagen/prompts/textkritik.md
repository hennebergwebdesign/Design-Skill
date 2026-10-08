# Textkritik mit Fachkritikern und Bewerter

Für Seitentexte nach `40-polierschleife-mit-kritiker.md`, Abschnitt 3b. Die Rollen laufen als getrennte
Agenten oder nacheinander in getrennten Sitzungen. Keiner der Kritiker und nicht der Bewerter schreibt
im Text, sie prüfen nur. Die Schleife zählt als ein subjektiver Durchgang (Kapitel 29).

## Vorher, einmal

```
Seite: [[FEHLT: Pfad, z. B. src/pages/leistungen/dach.astro]]
Briefing: Markenbrief [[FEHLT: Pfad]], Ziel der Seite [[FEHLT]], Hürde [[FEHLT: Stufe aus Kapitel 45]],
Herkunft der Besucher [[FEHLT]], Hauptkeyword [[FEHLT]], Ort [[FEHLT oder „keiner"]]
Strategie in sechs Zeilen: wer, Problem, wie weit er ist, Kernbotschaft, Primär-CTA, drei Einwände
Durchlaufgrenze: [[FEHLT: Runden]], Budget: [[FEHLT]]
```

## Vor jeder Bewertung

```bash
pnpm build
node scripts/pruefe-striche.mjs
node scripts/pruefe-platzhalter.mjs
node scripts/pruefe-geo.mjs
node scripts/deslop-check.mjs [[FEHLT: Dateien mit eigenen Textvorschlägen]]
```

Die Ausgaben gehen an alle Kritiker und an den Bewerter.

## Kritiker, je einer

```
Rolle: [[Copy | Conversion | SEO | GEO]]-Kritiker. Du prüfst, du schreibst nichts um. Den Autor
kennst du nicht. Maßstab sind die Kapitel aus 40, Abschnitt 3b, für dein Fach.
Lies Briefing, Strategie, die Fassung und die Ausgaben der Prüfskripte.
Gib nummerierte Befunde aus: Priorität (hoch, mittel, niedrig), Fundstelle als Zitat, Begründung,
Vorschlag in einem Satz. Jede Zahl, Bewertung oder Garantie ohne Beleg im Markenbrief ist ein Befund
mit hoher Priorität. Was du nicht prüfen kannst (echte Ladezeit, Rankings), nennst du als nicht
prüfbar. Keine Lobrede, keine umgeschriebenen Absätze, keine Rankingversprechen.
```

## Bewerter

```
Rolle: Bewerter. Keine Schreibrechte. Bei Zweifel die niedrigere Zahl.
Lies Briefing, Strategie, Fassung, Ausgaben der Prüfskripte und die Befunde der vier Kritiker.
Gib ausschließlich dieses JSON aus:
{"copy": {"wert": 0, "mangel": ""}, "conversion": {"wert": 0, "mangel": ""},
 "seo": {"wert": 0, "mangel": ""}, "geo": {"wert": 0, "mangel": ""},
 "skriptfehler": 0, "unbelegte_aussagen": [], "fertig": false}
Jeder Wert unter 10 nennt seinen Mangel. "fertig" ist nur true, wenn jeder Wert mindestens 8 ist,
skriptfehler 0 ist und unbelegte_aussagen leer ist.
```

## Zusammenführen

Der Hauptagent führt die Befunde zu einer nummerierten Änderungsliste zusammen. Bei Widerspruch:
Wahrheit vor Wirkung, Verständlichkeit vor Keyword, Briefing vor Geschmack. Ein fehlender Beleg wird
`[[FEHLT: …]]`, nie ergänzt. Nach der Überarbeitung zurück zu „Vor jeder Bewertung".

Stopp bei `fertig`, bei der Durchlaufgrenze oder nach zwei Runden ohne Fortschritt. Bericht: Endfassung,
Werte je Runde, offene Belege, Annahmen, ein Testvorschlag mit Hypothese (`13-messung-optimierung.md`).
Nichts wird veröffentlicht, die Freigabe gibt ein Mensch.
