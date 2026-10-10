# Kundenpsychologie: Erwartung, Reiz, Begründung

`02-design-ux.md` sagt, was über dem Falz stehen muss, `34-ueberzeugungsausloeser.md`, wie Texte überzeugen. Dieses Kapitel
beantwortet davor die Frage, **in welcher Reihenfolge ein Besucher eine Seite innerlich prüft** und warum eine
sauber gebaute, aber ungewohnte Seite trotzdem Anfragen kostet.

Die Substanz stammt aus dem Video „The Psychology of a PERFECT Website" von Self-Made Web Designer (16.07.2026).
Übernommen sind Reihenfolge, Beispiele und Prüfweg, kein Text. **Das Modell der drei Instanzen ist ein Denkmodell**,
keine Neurowissenschaft: Es vereinfacht das alte Dreihirnmodell, das in der Hirnforschung als überholt gilt. Es dient hier
nur als Merkhilfe für eine Reihenfolge. Die Zahlenangabe aus dem Video (eine Milliarde Informationseinheiten pro Sekunde,
zehn davon bewusst) hat dort keine Primärquelle und ist nicht übernommen.

## Inhalt

- 1\. Die Reihenfolge: Erwartung, Reiz, Begründung
- 2\. Erwartung: Konventionen sind Material, kein Hindernis
- 3\. Reiz: das Prinzip „am weitesten fortgeschritten, aber noch akzeptabel"
- 4\. Begründung: der rationale Teil kommt zuletzt und braucht Futter
- 5\. Gruppieren: drei bis vier Dinge auf einmal
- 6\. Prüfen statt behaupten
- 7\. Nicht übernommen (mit Grund)
- Verwandte Kapitel

## 1. Die Reihenfolge: Erwartung, Reiz, Begründung

| Stufe | Frage des Besuchers (unbewusst) | Aufgabe der Seite | Umsetzung | Grund |
|---|---|---|---|---|
| 1 Erwartung | Bin ich hier sicher und richtig? | Bekannte Muster bedienen | Struktur und Navigation nach Konvention | Wer das Muster nicht findet, sucht nicht, er geht |
| 2 Reiz | Ist das hier interessant? | Kleine, angenehme Abweichung | Mikrointeraktionen innerhalb der Struktur | Reine Vorhersagbarkeit langweilt und senkt die Verweildauer |
| 3 Begründung | Warum ist Ja die kluge Entscheidung? | Argumente liefern, geordnet | Belege, Garantie, Zeitersparnis, gruppiert | Die Entscheidung fällt meist vorher, die Begründung rechtfertigt sie nachträglich |

Die Reihenfolge ist zwingend: Stufe 2 ohne Stufe 1 wirkt wie Chaos, Stufe 3 ohne Stufe 2 liest niemand.

## 2. Erwartung: Konventionen sind Material, kein Hindernis

Besucher bringen ein inneres Bild von „Website" mit, gebaut aus allen Seiten, die sie je gesehen haben (Fachwort:
mentale Modelle). Weicht die Seite davon ab, entscheidet der erste Eindruck gegen sie, noch vor dem Inhalt.

| Element | Erwartete Position | Regel | Grund |
|---|---|---|---|
| Logo | oben links, verlinkt auf die Startseite | nicht verlegen | wird zum Zurückkommen genutzt |
| Hauptnavigation | im Kopfbereich, nahe am Logo | Landingpages ausgenommen (siehe Playbook) | Orientierung vor Inhalt |
| Fußbereich | unten, mit Rechtstexten und Kontakt | Pflichtseiten bleiben dort (`08-pflichtseiten-technik.md`) | Besucher suchen Impressum und Datenschutz dort |
| Mobiles Menü | die Position, die das Repo bereits festlegt | Abweichung nur nach Test mit echten Personen | siehe Fallbeispiel unten |

**Fallbeispiel aus dem Video:** Ein Anbieter verlegte das mobile Menü in die untere Ecke, weil es dort näher am Daumen liegt.
Auf dem Papier ist das die bessere Bedienung, nach dem Start fand es niemand, das Menü wurde zurückgesetzt. Die Quelle
(ein Spieleportal) ist im Video genannt und hier nicht geprüft. Die Lehre gilt unabhängig davon: Ergonomie schlägt
Gewohnheit erst, wenn die Gewohnheit gemessen und widerlegt ist.

**Konsequenz für die Handschrift:** Die Struktur bleibt konventionell, die Persönlichkeit sitzt im Detail (Abschnitt 3 und
`26-geschmack-und-ki-tells.md`). Wer beides in der Struktur austobt, verliert Stufe 1.

## 3. Reiz: das Prinzip „am weitesten fortgeschritten, aber noch akzeptabel"

Ein Besucher, der nur Vorhersagbares sieht, langweilt sich. Ein Besucher, der Unerwartetes sieht, das angenehm statt
störend ist, bekommt einen kleinen Belohnungsreiz. Die Fachwörter dafür: MAYA (most advanced yet acceptable) und
Mikrointeraktion. Der Reiz muss klein bleiben, sonst kippt er in Stufe 1 zurück.

| Element | erlaubte Abweichung | Grenze | Grund |
|---|---|---|---|
| Button beim Überfahren | Füllung wandert, Pfeil verschiebt sich, Schatten hebt sich | Dauer nach `30-motion-pruefung.md`, nie über 300 ms | Rückmeldung ohne Wartezeit |
| Bild beim Scrollen | minimale Skalierung oder Verschiebung | nur `transform`, kein Layoutsprung (`09-motion-gsap.md`) | Tiefe ohne Rucken |
| Link | Unterstreichung wandert oder zeichnet sich | Kontrast bleibt in jedem Zustand mindestens 4,5:1 | Lesbarkeit zuerst |
| Karte | Rand, Schatten oder Hintergrund wechselt | kein gleichzeitiger Farb und Größenwechsel | ein Reiz pro Element |

Zwei Vorschläge, die **nicht aus dem Video stammen** und als Arbeitsregel gelten, bis ein Test sie belegt oder kippt:
ein überraschendes Detail pro Sektion statt pro Element, und kein Reiz, der das Lesen einer Zeile unterbricht.

Bei `prefers-reduced-motion: reduce` entfällt der Reiz, der Zustand bleibt (Farbe, Unterstreichung). Der Reiz darf nie
der einzige Hinweis auf ein klickbares Element sein.

## 4. Begründung: der rationale Teil kommt zuletzt und braucht Futter

Besucher suchen vor einer Entscheidung Gründe, die sie sich und anderen nennen können („hält lange", „spart Zeit",
„viele gute Bewertungen"). Die Seite muss diese Gründe liefern, geordnet und dort, wo die Entscheidung fällt.

| Ort | Inhalt | Grenze |
|---|---|---|
| direkt unter dem Primär CTA | ein bis zwei Belege (Bewertung, Garantie, Zeitangabe) | keine erfundenen Zahlen, fehlende Daten als `[[FEHLT: …]]` |
| auf Entscheidungsseiten (Leistung, Preis, Kontakt) | gruppierte Argumente (Abschnitt 5) | höchstens vier Gruppen pro Block |
| nach dem Einwand | Beleg, der den Einwand auflöst | Satzmuster nach `34-ueberzeugungsausloeser.md` |

## 5. Gruppieren: drei bis vier Dinge auf einmal

Das Arbeitsgedächtnis hält nur wenige Einheiten zugleich. Wer sieben Vorteile untereinander setzt, hat beim
Weiterscrollen die Hälfte vergessen. Die Lösung heißt Gruppieren (Fachwort: Chunking).

| Fall | Regel | Grund |
|---|---|---|
| Vorteilsleiste, Argumentblock | höchstens vier Punkte, sonst Gruppen mit Überschrift | Merkbarkeit |
| Telefonnummer, Kontodaten, Artikelnummern | in Blöcken schreiben, nicht am Stück | gleiches Prinzip, sofort erkennbar |
| Leistungsliste mit vielen Punkten | nach Kategorien teilen, jede Kategorie mit eigener Überschrift | Überblick vor Detail |
| Preisstufen | **nicht** jede Stufe komplett ausschreiben, sondern „enthält alles aus der Stufe darunter, dazu: …" | der Unterschied zwischen den Stufen ist die Information |

**Preisstufen im Muster:** Basis zeigt die volle Liste, jede höhere Stufe zeigt nur den Zusatz. Der Besucher vergleicht dann
Zusätze statt zwei lange Listen Zeile für Zeile. Das passt zur Regel „drei echte Optionen" aus `34-ueberzeugungsausloeser.md`.

## 6. Prüfen statt behaupten

Zwei einfache Tests mit einer Person, die das Projekt nicht kennt. Kein Labor nötig.

| Test | Ablauf | Bestanden, wenn | Grund |
|---|---|---|---|
| Erinnerungstest | Sektion oder Startseite wenige Sekunden zeigen, wegnehmen, fragen: Woran erinnerst du dich, in welcher Reihenfolge? | das Wichtigste kommt zuerst und vollständig | prüft Hierarchie und Gruppierung |
| Aufgabentest | Person löst eine echte Aufgabe (Kontakt aufnehmen, Termin anfragen, Testbestellung), Beobachter schweigt | sie findet den Weg ohne Hilfe | prüft Erwartung, Stufe 1 |

Fragen für den Erinnerungstest: Wohin ging der Blick zuerst, was fiel als Zweites auf, was wurde ganz übersehen? Wird das
Wichtige übersehen, wird die Sektion überarbeitet, nicht der Besucher belehrt. Protokoll in `29-pruefdurchgaenge-und-vokabular.md`
und `qa-und-abnahme.md` ablegen, damit der Befund im Projekt `CLAUDE.md` landet.

## 7. Nicht übernommen (mit Grund)

- Zahlenangabe zur Sinnesverarbeitung: im Video ohne Primärquelle.
- Hinweis auf einen bestimmten Baukasten als Lösung für schwierige Änderungen: Der Stack ist fest (Astro auf Cloudflare Pages).
- Aussage, dass reine Kreativität in der Struktur schade, als absolute Regel: gilt für Standardseiten, Landingpages
  mit einem Ziel und ausdrücklich gewünschte Wow Auftritte (`37-stilrichtung-nach-kundensprache.md`) dürfen mehr abweichen,
  wenn der Aufgabentest bestanden ist.

## Verwandte Kapitel

`02-design-ux.md` (Falz, Hierarchie), `09-motion-gsap.md`, `26-geschmack-und-ki-tells.md`, `30-motion-pruefung.md`,
`34-ueberzeugungsausloeser.md`, `29-pruefdurchgaenge-und-vokabular.md`.
