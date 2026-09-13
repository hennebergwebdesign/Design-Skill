# Markenbrief: [KUNDE]

Diese Datei ist die einzige Quelle für alles, was projektspezifisch ist: Zielgruppe, Problem,
Versprechen, Beweise, Tonfall. `marke.json` daneben hält die maschinenlesbaren Werte
(Farbrollen, Schriften, Motion-Profil, Icon-Profil, Sprachprofil).

**Regel:** Wird beim Bauen eine Entscheidung getroffen, die hier nicht steht, gehört sie
hierher, sonst dreht die nächste Sitzung sie zurück. Fehlt eine Angabe, steht
`[[FEHLT: …]]`, niemals ein plausibel klingender Erfindungswert.

Stand: [DATUM] · Bearbeitet von: [NAME]

---

## 1 Gegenstand

Was verkauft, vermittelt oder besetzt dieses Unternehmen, in einem Satz ohne Adjektive.

> [[FEHLT: ein Satz, was das Unternehmen tatsächlich tut]]

**Was am Gegenstand selbst bildwürdig ist:** Material, Prozess, Werkzeug, Ergebnis. Daraus
kommt die visuelle Handschrift, nicht aus einer Stilkarte (siehe `10-visuelle-richtung.md`).

> [[FEHLT: 3–5 konkrete Dinge, die man fotografieren oder zeichnen könnte]]

## 2 Zielgruppe

Nicht „kleine und mittlere Unternehmen". Wer genau, in welcher Situation, mit welchem Druck.

| Feld | Wert |
|---|---|
| Wer | [[FEHLT]] |
| Situation beim ersten Besuch | [[FEHLT]] |
| Was er stattdessen gerade tut | [[FEHLT]] |
| Wovor er Angst hat | [[FEHLT]] |
| Wie er die Sache selbst nennt | [[FEHLT]] |

Die letzte Zeile ist die wichtigste: das Vokabular der Zielgruppe schlägt das Vokabular des
Unternehmens. Jemand sucht „Dach undicht", nicht „Bauwerksabdichtung im Bestand".

## 3 Kernproblem und Versprechen

**Kernproblem** (was ihn wach hält, in seinen Worten):

> [[FEHLT]]

**Versprechen** (was nach der Zusammenarbeit anders ist, konkret und prüfbar):

> [[FEHLT]]

**Warum dieses Unternehmen** (was ein Wettbewerber nicht behaupten könnte, ohne zu lügen):

> [[FEHLT]]

Lässt sich der letzte Punkt nicht füllen, ist das kein Copy-Problem, sondern ein
Positionierungsproblem. Dann zurück zu `01-strategie-positionierung.md`, nicht weiterbauen.

## 4 Die fünf Einwände

Jeder Einwand, der real vor einer Anfrage kommt, mit der Antwort, die auf die Seite gehört.

| Einwand | Antwort auf der Seite | Wo sie steht |
|---|---|---|
| „Zu teuer" | [[FEHLT]] | |
| „Kein Zeit / kein Anlass jetzt" | [[FEHLT]] | |
| „Machen wir selbst" | [[FEHLT]] | |
| „Woher weiß ich, dass das funktioniert" | [[FEHLT]] | |
| [[FEHLT: branchenspezifisch]] | [[FEHLT]] | |

## 5 Beweise: nur mit Quelle

Kein Eintrag ohne Belegspalte. Ein Eintrag ohne Beleg wird gestrichen, nicht geschätzt.
Siehe die harte Grenze in `SKILL.md`: erfundene Belege sind nach § 5 UWG angreifbar.

| Beweis | Wert | Quelle / Beleg | Freigabe liegt vor |
|---|---|---|---|
| Kundenstimme | | | ☐ |
| Referenz / Case | | | ☐ |
| Zahl | | | ☐ |
| Bewertung (mit Stand) | | | ☐ |
| Logo | | | ☐ Nutzungsrecht geklärt |
| Zertifikat | | | ☐ |

## 6 Sprachprofil

Diese Angaben gehören zusätzlich in `marke.json`, damit Prüfskripte sie lesen können.

| Feld | Wert |
|---|---|
| Anrede | ☐ Sie ☐ du: **eine** Entscheidung, durchgezogen bis in Fehlermeldungen und Bestätigungsmails |
| Tonfall in drei Adjektiven | [[FEHLT]] |
| Primär-CTA-Text, wörtlich | [[FEHLT]] |
| Sekundär-CTA-Text, wörtlich | [[FEHLT]] |

**Verbotene Wörter für dieses Projekt.** Die Liste ist der wirksamste Copy-Hebel überhaupt,
weil sie projektspezifisch ist. Basisliste plus alles, was dieser Kunde nicht hören will:

```
Lösung · innovativ · ganzheitlich · maßgeschneidert · Synergie · nachhaltig (ohne Bezug)
Ihr Partner für · Herzlich willkommen · Wir über uns · Qualität seit
[[FEHLT: kundenspezifische Ergänzungen]]
```

**Gedankenstriche sind auf der ganzen Seite verboten** (– und —), siehe
`12-copywriting.md`. Geprüft mit `scripts/pruefe-striche.mjs`.

## 7 Visuelle Richtung

**Bestehende Marke/CI**, falls vorhanden. Ableitung in
`20-markenextraktion-bestandsseite.md`, ausgefüllt vor Durchgang 1.

| Feld | Wert | Übernommen / bewusst geändert, weil … |
|---|---|---|
| Quelle (URL oder „nur Print/Logo") | [[FEHLT]] | |
| Logo | [[FEHLT]] | |
| Primärfarbe(n) | [[FEHLT]] | |
| Schrift | [[FEHLT]] | |
| Formsprache/Ton | [[FEHLT]] | |

**Referenzen aus Premium-Designquellen**, siehe `22-premium-designquellen.md`. Vor Durchgang
1 recherchiert, nicht danach als Nachgedanke:

| Quelle | Link | Was übernommen wird |
|---|---|---|
| [[FEHLT: Awwwards/Dribbble/Land-book/recent.design/21st.dev]] | [[FEHLT]] | [[FEHLT]] |
| [[FEHLT]] | [[FEHLT]] | [[FEHLT]] |

Erst füllen, nachdem Durchgang 1 und 2 aus `10-visuelle-richtung.md` gelaufen sind.

**Layoutkonzept in einem Satz Prosa:**

> [[FEHLT]]

**Drei Prinzipien, die genau diese Seite einzigartig machen:**

1. [[FEHLT]]
2. [[FEHLT]]
3. [[FEHLT]]

**Was ich verworfen habe und warum:** die Zeile, die verhindert, dass die nächste Sitzung
die Schablone zurückholt:

> [[FEHLT]]

## 8 Motion-Handschrift

Drei Sätze, wie Bewegung bei dieser Marke klingt. Ableitung in `18-motion-handschrift.md`.

> [[FEHLT]]

**Der eine orchestrierte Moment** sitzt bei: [[FEHLT]]

## 9 Icon-Profil

Ableitung in `17-icons-eigenes-system.md`. Strichstärke folgt der Schrift, Radius den Tokens.

| Feld | Wert |
|---|---|
| Eigenes Set nötig für | [[FEHLT: welche Icons: meist die Leistungssektion]] |
| Systemicons aus Bibliothek | [[FEHLT: welche]] |
| Stil | ☐ Linie ☐ Fläche ☐ gemischt |
| Strichstärke | [[FEHLT]] px auf 24er Raster |
| Kappen / Ecken | ☐ rund ☐ kantig |

## 10 Offene Punkte

Alles, was noch fehlt, blockiert oder abzustimmen ist. Diese Liste geht mit in die Übergabe.

- [ ] [[FEHLT]]

## 11 Vor dem Livegang zu klären

- [ ] Rechtstexte anwaltlich geprüft (Entwürfe, keine Rechtsberatung)
- [ ] Schriftlizenzen vorhanden
- [ ] Logo-Nutzungsrechte für alle gezeigten Fremdlogos
- [ ] Alle `[[FEHLT: …]]` aufgelöst oder Element entfernt
- [ ] Alle `data-copy-vorschlag` entfernt
