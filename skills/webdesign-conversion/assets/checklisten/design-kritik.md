# Designkritik

Aufbau für die Kritik eines Entwurfs, einer gebauten Seite oder einer Bestandsseite. Ergebnis
ist eine nach Schwere geordnete Liste mit Vorschlägen, keine Sammlung von Eindrücken.

Abgrenzung: `conversion-audit.md` fragt, was eine Seite an Anfragen kostet, `wcag22-audit.md`
prüft jedes Erfolgskriterium. Die Designkritik fragt, ob die Gestaltung trägt: Wirkung,
Ordnung, Bedienung und Übergabe. Sie verweist für Tiefe auf beide Listen, statt sie zu
wiederholen.

## Vor dem ersten Blick

| Frage | Grund |
|---|---|
| Was ist es, für wen, mit welcher primären Conversion? | ohne Ziel ist jede Kritik Geschmackssache |
| In welcher Phase: Richtung, Entwurf, gebaut, Bestand? | eine Richtung braucht andere Kritik als ein fertiger Bau (Tabelle unten) |
| Gibt es ein Kundendesignsystem oder eine `marke.json`? | was dort steht, ist kein Befund, sondern Vorgabe (`24-designsystem-vorrang.md`) |
| Worauf soll der Fokus liegen? | „nur die Navigation" bringt mehr Tiefe als alles auf einmal |
| Was liegt vor: Bild, Link, Quelltext? | was nicht gesehen wurde, wird als ungeprüft benannt, nicht geschätzt |

| Phase | Kritik konzentriert sich auf | Nicht in dieser Phase |
|---|---|---|
| Richtung | Lesart, Regler, Palette, Schriftpaar (`10-visuelle-richtung.md`, `26-geschmack-und-ki-tells.md` Abschnitt 1 und 2) | Pixelabstände, Texte im Detail |
| Entwurf | Hierarchie, Sektionsfolge, Zustände, Texte im Interface | Ladezeit, Codequalität |
| Gebaut | alles, dazu Skripte und Tastatur | Grundsatzfragen der Richtung, außer sie sind ein kritischer Befund |
| Bestand | erst `27-redesign-bestand.md`: was darf sich nicht still ändern | Neuentwurf ohne Auftrag |

## 1 Erster Eindruck

Startseite oder Zielseite öffnen, fünf Sekunden ansehen, nicht scrollen.

| Prüfung | Kapitel |
|---|---|
| Was zieht den Blick zuerst an? Ist es das, was zuerst gesehen werden soll? | `02-design-ux.md`, Schritt 2.1 |
| Sind die vier Fragen beantwortet: Was macht ihr, mein Problem, mein Nutzen, wohin der CTA? | `02-design-ux.md`, Schritt 2.1 |
| Wirkt die Seite wie für genau dieses Unternehmen gemacht oder wie eine Vorlage? | `10-visuelle-richtung.md` „Die Standards, die man erkennt", `26-geschmack-und-ki-tells.md` Abschnitt 7 |
| Passt die Wirkung zur Lesart in `marke.json`? | `26-geschmack-und-ki-tells.md` Abschnitt 1 |
| Heldenbereich: volle Höhe in `svh`, Überschrift höchstens zwei Zeilen, ein Ergebnis statt Stockfoto | harte Grenze, `02-design-ux.md`, `26-geschmack-und-ki-tells.md` Abschnitt 4 |

Grund für fünf Sekunden statt einer gründlichen Durchsicht: so lange gibt ein Besucher der
Seite, bevor er entscheidet. Was in dieser Zeit falsch ankommt, rettet keine Detailarbeit.

## 2 Hierarchie

| Prüfung | Kapitel |
|---|---|
| Gibt es je Bildschirm genau ein Wichtigstes? | `21-sektionshintergruende-hierarchie.md` |
| Folgt die Leserichtung dem F-Muster, steht der CTA dort, wo das Auge ankommt? | `02-design-ux.md`, Schritt 2.2 |
| Trägt die Typoskala die Rangfolge, mit deutlichen Sprüngen zwischen den Stufen? | `55-typografie-system.md` Abschnitt 2 |
| Entsteht Zusammengehörigkeit durch Abstand, nicht durch Rahmen? | `15-spacing-rhythmus.md`, Regel 2 |
| Sind die drei Abstandsebenen (Sektion, Block, Komponente) getrennt? | `15-spacing-rhythmus.md` „Die drei Ebenen des Rhythmus" |
| Sind Sektionen erkennbar voneinander getrennt? | harte Grenze, `21-sektionshintergruende-hierarchie.md` |
| Liest sich die Seite auch in Graustufen in der richtigen Reihenfolge? | Farbe darf Rang unterstützen, nicht allein tragen (`04-barrierefreiheit-bfsg.md`, 1.4.1) |

## 3 Konsistenz

| Prüfung | Kapitel |
|---|---|
| Kommt jeder Wert aus einem Token: Farbe, Abstand, Schriftgröße, Radius, Dauer? | harte Grenze „Kein Wert ohne Token", `10-visuelle-richtung.md` „Tokensystem", `pruefe-tokens.mjs` |
| Verhalten sich gleiche Elemente gleich: Karten, Buttons, Links, Hover? | `02-design-ux.md` „Hover und Zustände" |
| Hat eine Absicht genau einen Text (der Primär-CTA überall gleich)? | `06-conversion-architektur.md`, `pruefe-geschmack.mjs` |
| Halten Akzent-, Form- und Themasperre über alle Sektionen? | `26-geschmack-und-ki-tells.md` Abschnitt 3 |
| Höchstens ein Kicker je drei Sektionen, höchstens ein Laufband je Seite? | harte Grenze, `pruefe-geschmack.mjs` |
| Ist keine Layoutfamilie doppelt? | `26-geschmack-und-ki-tells.md` Abschnitt 5 |
| Folgt die Seite einem gelieferten Kundendesignsystem, statt es mit Referenzwerten zu überschreiben? | `24-designsystem-vorrang.md` |

## 4 Nutzbarkeit

| Prüfung | Kapitel |
|---|---|
| Erreicht die Zielperson ihr Ziel (Anfrage, Termin, Kauf) ohne Umweg? | `06-conversion-architektur.md` |
| Sind Anfrage, Referenzen, Ablauf und Preise in höchstens drei Klicks erreichbar? | `02-design-ux.md`, Schritt 2.3 |
| Ist erkennbar, was klickbar ist, und reagiert jede Karte sichtbar auf Hover und Fokus? | harte Grenze, `02-design-ux.md` |
| Sind alle Zustände entworfen: Ruhe, Hover, Fokus, aktiv, deaktiviert, Laden, Fehler, Erfolg, leer? | `06-conversion-architektur.md` „Technische Pflicht am Formular" |
| Funktioniert es auf 375 px mit dem Daumen: Menü, CTA-Balken, Formular? | `16-responsive-container.md`, `pruefe-breakpoints.mjs` |
| Gibt es überflüssige Schritte, Felder oder Entscheidungen? | `58-formulare-und-anfragestrecken.md` |

## 5 Barrierefreiheit nach WCAG 2.2

Im Entwurf geprüft, nicht erst im Code. Was hier durchrutscht, wird im Bau teuer.

| Prüfung | Kriterium | Kapitel |
|---|---|---|
| Text 4,5:1, große Schrift und Bedienelemente 3:1, Markenfarbe nicht als Textfarbe | 1.4.3, 1.4.11 (AA) | `04-barrierefreiheit-bfsg.md` Schritt 4.1, `pruefe-kontrast.mjs` |
| Fokusring ist entworfen, auf heller und dunkler Fläche sichtbar | 2.4.7 (AA) | `04-barrierefreiheit-bfsg.md` Schritt 4.3 |
| Sticky Kopf, Consent-Banner und CTA-Balken können ein fokussiertes Element nicht vollständig verdecken | 2.4.11 (AA) | `04-barrierefreiheit-bfsg.md` Schritt 4.5 |
| Klickziele mindestens 24 × 24 px, auf Touchbreiten 44 px | 2.5.8 (AA) | `04-barrierefreiheit-bfsg.md` Schritt 4.5 |
| Alles, was gezogen wird (Vorher-Nachher, Karussell), hat eine Klick-Alternative | 2.5.7 (AA) | `04-barrierefreiheit-bfsg.md` Schritt 4.5 |
| Kontaktwege stehen auf allen Seiten an derselben Stelle | 3.2.6 (A) | `04-barrierefreiheit-bfsg.md` Schritt 4.5 |
| Mehrstufige Strecke fragt nichts zweimal | 3.3.7 (A) | `58-formulare-und-anfragestrecken.md` |
| Fehler, Pflicht und aktueller Zustand nicht nur über Farbe | 1.4.1 (A) | `04-barrierefreiheit-bfsg.md` |
| Kein Text in Bildern, außer im Logo | 1.4.5 (AA) | `04-barrierefreiheit-bfsg.md` |
| Kein Autoplay, Hintergrundvideo mit Pause | 2.2.2 (A) | `04-barrierefreiheit-bfsg.md` Schritt 4.6, `18-motion-handschrift.md` |
| Schriftgrößen in rem, nichts unter 14 px | 1.4.4 (AA) | `55-typografie-system.md`, `pruefe-typografie.mjs` |

Bei einer gebauten Seite oder vor einem Nachweis nach BFSG: vollständig nach
`wcag22-audit.md`.

## 6 Texte im Interface

Werbetext, Headlines und Angebot gehören in `12-copywriting.md`. Hier nur die Texte, die
bedient werden.

| Prüfung | Statt | So | Grund |
|---|---|---|---|
| Button nennt sein Ergebnis | „Absenden" | „Anfrage senden" | die Person weiß vor dem Klick, was passiert (`12-copywriting.md` „Buttontexte") |
| Bestätigungsdialog nennt die Aktion im Titel und auf beiden Buttons | „Sind Sie sicher?", „OK" / „Abbrechen" | „Termin am 12. März absagen?", „Termin absagen" / „Termin behalten" | „OK" bestätigt nichts Bestimmtes; wer nur die Buttons liest, muss trotzdem wissen, was passiert |
| Folge steht im Dialog | nichts | „Der Termin wird freigegeben und kann nicht wiederhergestellt werden." | eine Entscheidung ohne Folge ist keine |
| Fehlermeldung sagt, was passiert ist und wie es weitergeht | „Ungültige Eingabe." | „Hier fehlt ein @. Bitte prüfen." | `12-copywriting.md` „Fehler und Leere als Wegweiser" |
| Leerer Zustand lädt zum Handeln ein | „Keine Einträge." | „Noch keine Termine. Ersten Termin buchen" | ein leerer Zustand ist eine Einladung, keine Stimmung |
| Ladezustand sagt, was passiert | Kreisel ohne Text | „Anfrage wird gesendet" | Unsicherheit beim Warten führt zum zweiten Klick und zur doppelten Anfrage |
| Ein Begriff für eine Sache, auf allen Seiten | „Anfrage", „Kontakt", „Nachricht" für dasselbe Formular | ein Wort | 3.2.4 (AA), und jedes Synonym ist eine Frage mehr |
| `aria-label` enthält den sichtbaren Text | Button „Senden" mit `aria-label="Formular abschicken"` | gleiche Worte | 2.5.3 (A); Sprachsteuerung sagt, was sie sieht |
| Anrede durchgehend | gesiezt im Text, geduzt in der Fehlermeldung | eine Entscheidung | `12-copywriting.md` „Duzen oder siezen" |
| Kein Gedankenstrich, auch nicht im Microcopy | Gedankenstrich zwischen „Gesendet" und „danke!" | „Gesendet. Danke!" | harte Grenze, `pruefe-striche.mjs` |

## 7 Übergabe an die Entwicklung

Gilt, wenn Entwurf und Bau getrennt laufen (eigener Entwurf, Kundendesign, KI-Bildentwurf
nach `28-ki-bildentwuerfe.md`). Was nicht festgelegt ist, wird beim Bau geraten.

| Punkt | Inhalt | Grund |
|---|---|---|
| Tokens statt Werte | `--raum-6`, `--farbe-marke-text`, `--text-h2`, nie „24 px, #356a4f" | ein Wert ohne Token ist im Bau ein Befund (harte Grenze) |
| Alle Zustände | Ruhe, Hover, Fokus, aktiv, deaktiviert, Laden, Fehler, Erfolg, leer | fehlende Zustände baut jemand nach Gefühl, und genau dort fehlt dann der Fokusring |
| Verhalten je Breite | was sich bei 375, 768, 1024, 1440 px ändert, was in Container Queries hängt | `16-responsive-container.md`; „wird schon umbrechen" ist keine Angabe |
| Randfälle | lange deutsche Komposita, zweizeilige Buttons, fehlendes Bild, null Bewertungen, sehr langer Name | deutsche Texte sind länger als jeder Platzhalter; was bricht, bricht auf der echten Seite |
| Bewegung | Auslöser, Dauer- und Kurventoken, Verhalten bei `prefers-reduced-motion` | `18-motion-handschrift.md`; „sanft einblenden" hat keine Dauer |
| Tastatur und Screenreader | Fokusreihenfolge, Namen für Icon-Buttons, welches Muster (Dialog, Disclosure, Reiter) aus `04-barrierefreiheit-bfsg.md` Schritt 4.4 | ohne Angabe baut jemand ein `div` mit Klick |
| Das Warum | ein Satz je ungewöhnlicher Entscheidung („auf dem Handy eingeklappt, weil die Liste sonst den CTA verdrängt") | wer den Grund kennt, entscheidet im Randfall richtig |
| Was offen ist | `[[FEHLT: …]]` für fehlendes Material, offene Fragen als Liste | ein stilles Platzhalterbild geht live |

## Befunde aufschreiben

| Regel | Grund |
|---|---|
| Konkret: „Der Sekundär-CTA im Kopf ist gleich stark wie der Primär-CTA" statt „unruhig" | ein unbestimmter Befund lässt sich nicht beheben |
| Mit Grund: Prinzip, Nutzerin oder Kapitel des Regelwerks | ohne Grund wird der Befund in der nächsten Runde zurückgedreht |
| Mit Vorschlag | ein Befund ohne Ausweg ist eine Beschwerde |
| Was trägt, steht drin | eine Kritik, die nur Mängel listet, wird nicht umgesetzt, und das Gute wird beim Überarbeiten versehentlich entfernt |
| Gesehen, abgeleitet oder unbekannt kennzeichnen | harte Grenze: nichts wird als beobachtet ausgegeben, was nicht beobachtet wurde |

### Schwere

| Schwere | Bedeutung | Beispiel |
|---|---|---|
| kritisch | verhindert die Conversion oder reißt eine harte Grenze | CTA unter der Falz unsichtbar, Kontrast der Fließtextfarbe 2:1, Formular nicht per Tastatur absendbar |
| hoch | kostet deutlich Wirkung oder Vertrauen, oder reißt ein Kriterium der Stufe A oder AA | zwei gleichstarke CTAs, Sektionen ohne Trennung, Fokusring fehlt in dunklen Sektionen |
| mittel | sichtbare Unruhe oder Mehraufwand | uneinheitliche Kartenabstände, zweiter Kicker in Folge |
| gering | Feinschliff | Ersatzschrift springt minimal, Icon optisch nicht zentriert |

## Ergebnis

```markdown
## Designkritik: [Seite oder Entwurf], [Phase], [Datum]

**Gesamteindruck:** [ein Satz: was trägt, wo die größte Chance liegt]

### Was trägt
- [konkret, mit Grund]

### Befunde
| Nr. | Bereich | Befund | Schwere | Grund | Vorschlag | Kapitel |
|---|---|---|---|---|---|---|
| 1 | Hierarchie | … | kritisch | … | … | `02-design-ux.md` |

### Die drei wichtigsten Änderungen
1. [Änderung]: [warum, wie]

### Ungeprüft
- [was nicht angesehen werden konnte, mit Grund]
```

Sortierung: nach Schwere, innerhalb der Schwere nach Wirkung auf die primäre Conversion.
Keine Gesamtnote: eine Zahl wie „7 von 10" sieht nach Messung aus und ist keine.

## Verwandte Kapitel

- `../../references/26-geschmack-und-ki-tells.md`: Lesart, Sperren, Katalog der KI-Tells, Vorflugcheck
- `../../references/02-design-ux.md`: Above the Fold, F-Muster, Hover und Zustände
- `../../references/15-spacing-rhythmus.md`: Abstand als Hierarchie, drei Ebenen
- `../../references/55-typografie-system.md`: Skala, Sprünge, Zoomfestigkeit
- `../../references/10-visuelle-richtung.md`: Richtung, Tokens, Selbstkritik beim Bauen
- `../../references/04-barrierefreiheit-bfsg.md`: Muster und WCAG-2.2-Kriterien
- `../../references/12-copywriting.md`: Buttontexte, Fehler und Leere
- `wcag22-audit.md`, `conversion-audit.md`, `pre-launch.md`: die anderen Prüflisten
