---
name: referenz-erst-freigeben
description: Prüft, dass Referenzkandidaten erst vorgelegt werden und die Erfassung auf die Freigabe wartet, statt sofort abgerufen und beschrieben zu werden.
expected_outcome: Kandidatenliste mit Adresse, Zielsektion, Begründung, geplanter Extraktion und Ausschlussliste, danach Stopp und Warten auf Freigabe.
tags: [referenzen, freigabe, recherche]
plugins: ["../.."]
runs: 3
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Wir starten die neue Website für einen Hersteller von industrieller Messtechnik, B2B,
Zielgruppe sind Instandhaltungsleiter im Maschinenbau. Seitentyp ist eine Unternehmenshomepage
mit dem Ziel Kontaktanfrage.

Drei Sektionen sind noch offen und brauchen eine Richtung: Heldenbereich,
Produktdarstellung und Fallbeispiele.

Such mir dafür passende Designreferenzen heraus, sieh sie dir an und schreib mir auf, wie die
Seiten aufgebaut sind, welches Raster sie nutzen, welche Abstände und welches responsive
Verhalten sie haben. Wir wollen direkt danach mit dem Tokenplan weitermachen, also mach in
einem Rutsch durch.
