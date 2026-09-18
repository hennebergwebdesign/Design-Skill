# Die Musterbibliothek: Prinzipien statt Kopien

Ein Muster in dieser Bibliothek beantwortet **warum etwas funktioniert**, nicht wie es
aussieht. Das ist der ganze Unterschied zwischen wiederverwendbarem Wissen und einem Ordner
voller Screenshots.

| statt | so |
|---|---|
| „Held hat großen Text links und ein Bild rechts." | „Die asymmetrische Aufteilung gibt der Kernaussage den dominanten horizontalen Raum, während das Bild Kontext liefert statt um Aufmerksamkeit zu konkurrieren." |
| „FAQ ist zweispaltig." | „Die Trennung von Liste und Kontaktausweg hält die Einwandbehandlung lesbar und fängt die nicht gelistete Frage auf, ohne das Lesen zu unterbrechen." |

Die linke Spalte veraltet mit der Mode. Die rechte gilt auch in einem anderen Stil, einer
anderen Branche und einem anderen Stack. Nur die rechte kommt in die Bibliothek.

## Wo sie liegt

```
assets/musterbibliothek/
  taxonomie.json     Kategorien, Stile, Belege, Konfidenz, Komplexität, Freigabe
  muster/<id>.md     ein Muster je Datei: Frontmatter plus Prosa
  index.json         erzeugt aus den Frontmattern, nie von Hand gepflegt
```

**Warum Markdown mit Frontmatter und nicht eine große JSON:** Das Prinzip braucht Prosa. Eine
JSON-Bibliothek wäre nach zwanzig Mustern unlesbar und würde die Prinzipien zu Stichworten
verkürzen, also genau das zerstören, worum es geht. Der Index ist die durchsuchbare Ableitung
und lässt sich jederzeit neu erzeugen:

```bash
node scripts/pruefe-muster.mjs           # prüft alle Muster
node scripts/pruefe-muster.mjs --index   # prüft und schreibt index.json neu
```

## Global oder nur im Projekt

Die wichtigste Unterscheidung der ganzen Recherche.

| | Projektwissen | Diese Bibliothek |
|---|---|---|
| liegt in | `.designrecherche/` im Kundenprojekt | `assets/musterbibliothek/` im Plugin |
| enthält | Register, Rohdaten, Screenshots, DNA, Vergleiche | benannte Muster mit Prinzip und Metadaten |
| Lebensdauer | Projektlaufzeit | dauerhaft, versioniert |
| kommt hinein | automatisch, im Ablauf | nur über Tor 2, nur durch einen Menschen |

Eine projektbezogene Beobachtung wird **nie** automatisch globales Wissen. Der Ablauf mit
beiden Toren steht in `../../agentur-website-builder/references/designrecherche-ablauf.md`.

## Pflichtfelder eines Musters

Geprüft von `scripts/pruefe-muster.mjs`. Ein fehlendes Feld ist ein Fehler, kein Hinweis.

| Feld | Bedeutung |
|---|---|
| `id` | Kennung, identisch mit dem Dateinamen |
| `name` | sprechender Name, kein Registry-Name |
| `kategorie` | genau eine, aus `taxonomie.json` |
| `sektionstyp` | in welchen Sektionen es vorkommt, aus derselben Liste |
| `tags` | freie Merkmale für den Vergleich |
| `stil` | Stilrichtungen aus `taxonomie.json` |
| `branchenbezug` | wo es erfahrungsgemäß trägt, optional |
| `ux_zweck` | welches Nutzungsproblem es löst |
| `conversion_zweck` | was es für die Conversion tut |
| `responsiv` | Verhalten auf kleinen Geräten, oder ausdrücklich `unbekannt` |
| `komplexitaet` | niedrig, mittel, hoch |
| `barrierefreiheit` | die eine Sache, die beim Nachbauen schiefgeht |
| `verwandt` | Kennungen anderer Muster, beidseitig gepflegt |
| `quelle_url` | woher das Muster stammt |
| `quelle_erfasst` | Datum der Erfassung |
| `konfidenz` | hoch, mittel, niedrig |
| `freigabe` | global, erweitert oder bestand |
| `aufgenommen` | Datum der Aufnahme |

Der Körper braucht fünf Abschnitte, ebenfalls geprüft: `## Prinzip`, `## Warum es wirkt`,
`## Belege`, `## Umsetzung`, `## Was nicht übernommen wird`.

Der Abschnitt **Belege** ist der, der die Bibliothek ehrlich hält: je Aussage eine Zeile mit
`beobachtet`, `abgeleitet` oder `unbekannt`. Ein Muster ohne eine einzige Belegmarkierung
fällt durch die Prüfung.

## Das Konfidenzmodell

| Beleg | heißt |
|---|---|
| **beobachtet** | direkt im erfassten Material abgelesen, mit Fundstelle |
| **abgeleitet** | aus Beobachtetem begründet geschlossen, nicht selbst gemessen |
| **unbekannt** | nicht erfassbar gewesen. Wird nie durch eine Schätzung ersetzt |

Eine Ableitung wird **nie** als Beobachtung ausgegeben. Der Unterschied klingt akademisch und
ist es nicht: „die Seite bricht bei 768 px einspaltig um" ist eine Beobachtung, wenn bei
768 px erfasst wurde, und eine Erfindung, wenn nur das Desktop-HTML vorlag. Aus HTML allein
sind Spacing-Skala, Rasterbreite, Kontrastwerte und responsives Verhalten **nicht** ablesbar,
siehe `../../agentur-website-builder/references/firecrawl-recherche.md`.

Die Konfidenz eines ganzen Musters folgt daraus:

| Konfidenz | wann |
|---|---|
| **hoch** | mehrere beobachtete Belege, Prinzip in mehr als einer Referenz gesehen |
| **mittel** | ein beobachteter Beleg oder ein gut begründeter Schluss |
| **niedrig** | Prinzip plausibel, Beleg dünn. Vor dem Einsatz prüfen |

Drei der fünf Muster des Erstbestands stehen auf `niedrig`, weil für sie nur der Demo-Aufruf
vorlag und nicht der Quelltext, siehe `23-referenzkomponenten-21st.md`. Das ist kein Mangel
der Bibliothek, sondern ihr Zweck: die Schwäche steht im Muster und nicht im Nachhinein in
einem Projekt.

## Ein Muster aufnehmen

Nur über Tor 2, nie nebenbei.

1. Referenz ist analysiert, `muster-entwurf.md` liegt im Projekt und ist gefüllt.
2. `node scripts/muster-vergleich.mjs --id <kennung>` legt die Ähnlichkeiten vor.
3. Der Mensch entscheidet zwischen neuem Muster, Erweiterung, nur Projekt und Ablehnung.
4. Bei neuem Muster oder Erweiterung entsteht ein Musterpaket im Projekt, und die Aufnahme
   ist ein **bewusster Commit im Repository `Design-Skill`**. Grund: das globale Wissen liegt
   im Plugin, gearbeitet wird im Kundenprojekt, und ein Schreibzugriff dorthin wäre entweder
   wirkungslos oder unsichtbar.
5. `node scripts/pruefe-muster.mjs --index` prüft und zieht den Index nach.

## Wann erweitern statt neu anlegen

Die Frage, die über den Wert der Bibliothek entscheidet. Vier Varianten desselben Helden sind
schlechter als ein Muster mit vier benannten Ausprägungen.

| Ähnlichkeit | Einstufung | Regel |
|---|---|---|
| ab 85 % | Duplikat | nicht aufnehmen |
| 65 bis 85 % | Beinahe-Duplikat | bestehendes Muster erweitern |
| 40 bis 65 % | verwandt | erweitern, außer der Unterschied **ist** ein eigenes Prinzip |
| 20 bis 40 % | ergänzend | eigenes Muster, beidseitig unter `verwandt` verlinken |
| unter 20 % | unverwandt | eigenes Muster |

Der Prüfsatz für die mittlere Zeile: **Ließe sich der Unterschied in einem Satz unter
„Ausprägungen" des bestehenden Musters unterbringen, ist es kein eigenes Muster.**

## Der Qualitätsfilter

Vor der Aufnahme, und schon vor der Empfehlung an Tor 1. Eine gestalterisch beeindruckende
Seite, die das Problem des Projekts nicht löst, wird nicht vorgeschlagen.

- [ ] löst ein benanntes Nutzungs- oder Conversionproblem, nicht nur einen optischen Eindruck
- [ ] im Agenturstack umsetzbar, ohne schwere Abhängigkeit
- [ ] responsiv tragfähig, nicht nur auf dem Desktop gedacht
- [ ] barrierefrei umsetzbar, Fokus und Tastatur bleiben möglich
- [ ] das Prinzip gilt auch in einer anderen Farbwelt und mit einer anderen Schrift
- [ ] Beleg vorhanden, Konfidenz ehrlich gesetzt

Der vorletzte Punkt ist der schärfste. Ein „Muster", das nur mit genau dieser Schrift und
genau dieser Farbe funktioniert, ist kein Muster, sondern eine Kopie.

## Die Grenze zur Kopie

`scripts/pruefe-muster.mjs` setzt zwei davon technisch durch, den Rest die Sichtung:

- kein fremdes Bildmaterial, keine absolute Adresse auf eine Bilddatei
- kein wörtliches Zitat über 200 Zeichen
- keine fremden Texte, Claims oder Überschriften
- kein Logo, keine Wortmarke, keine Illustration
- keine charakteristische Layoutkombination als Ganzes

Der Prüfstein bleibt der aus
`../../agentur-website-builder/references/referenzen-und-auswahl.md`: Würde jemand, der die
Referenz kennt, die neue Seite als deren Kopie erkennen, ist die Grenze überschritten.

## Erweiterungspunkte, bewusst noch nicht gebaut

Damit späteres Wachstum die Struktur nicht sprengt. Keiner dieser Punkte ist umgesetzt, und
keiner wird auf Vorrat gebaut.

| Erweiterung | Wo sie andockt | Warum jetzt nicht |
|---|---|---|
| Vektor- oder Einbettungssuche statt Merkmalsvergleich | `muster-vergleich.mjs`, Funktion `aehnlichkeit` | braucht ein Modell oder eine Bibliothek, dieses Repository bleibt abhängigkeitsfrei |
| Screenshot- und Bildanalyse | neue Stufe in `lib/abruf.mjs`, neues Feld in der DNA | ohne Browser kein Bild, und die Auswertung wäre ein eigenes Projekt |
| automatische Komponentenerkennung im DOM | `design-dna.mjs`, Funktion `komponenten` | zählt heute Elemente, Erkennung braucht berechnete Stile |
| Tokenextraktion aus fremden Stylesheets | neue Funktion neben `inlineCss` | fremde Tokens sind ohnehin nicht übernehmbar, siehe `24-designsystem-vorrang.md` |
| Zuordnung Muster zu shadcn- oder Tailwind-Bausteinen | neues Frontmatter-Feld | erst sinnvoll, wenn die Bibliothek mehr als zwanzig Muster hat |
| Empfehlung aus früheren Projekten | neues Feld `eingesetzt_in` plus Auswertung | braucht mehrere abgeschlossene Projekte als Datengrundlage |

## Verwandte Kapitel

- Was eine Referenz beeinflussen darf: `24-designsystem-vorrang.md`
- Die fünf Muster des Erstbestands im Zusammenhang: `23-referenzkomponenten-21st.md`
- Quellen und wofür sie taugen: `22-premium-designquellen.md`
- Stilrichtungen im Fließtext: `10-visuelle-richtung.md`
- Ablauf mit beiden Freigabetoren:
  `../../agentur-website-builder/references/designrecherche-ablauf.md`
- Anti-Kopie und Rangfolge der Quellen:
  `../../agentur-website-builder/references/referenzen-und-auswahl.md`
