# Playbook: Recruiting Funnel

Für eine Strecke, die aus einer Anzeige eine Bewerbung macht. Fachliche Grundlage:
`../references/19-recruiting-funnel.md`.

**Was diesen Typ von einer Landingpage unterscheidet:** mehrere Stufen statt einer Seite,
mobil zuerst statt mobil auch, und ein rechtlicher Rahmen (AGG, Bewerberdaten), der bei
einem Fehler unmittelbar Geld kostet.

## Reihenfolge

```
EVP  →  Anzeigentext  →  Struktur  →  Copy  →  Design  →  Bau  →  Test  →  Livegang
```

**Die EVP kommt vor dem Anzeigentext, und der Anzeigentext vor der Seite.** Wer die Seite
zuerst baut, schreibt die Anzeige später passend zur Seite statt umgekehrt, und dann fehlt
der Message-Match.

## Phase 1: EVP

**Artefakt:** `marke-brief.md` mit ausgefülltem Abschnitt 10 (`recruiting`), `marke.json` mit
`recruiting.aktiv: true` und `recruiting.evp`.

Die Formel: **für wen + welches Arbeitsleben + welcher Beweis.**

Drei Fragen an den Kunden, die die Sache entscheiden. Nicht als Fragebogen, sondern im
Gespräch:

1. **Warum ist der letzte Mitarbeiter gegangen, der gegangen ist?** Das ist die ehrlichste
   Quelle für die eigentlichen Einwände.
2. **Warum ist der Mitarbeiter geblieben, der am längsten da ist?** Das ist die EVP, in
   seinen Worten.
3. **Was ist an diesem Job objektiv schlechter als beim Wettbewerb?** Ein Negativ-USP, offen
   benannt, schafft mehr Vertrauen als jede Aufzählung von Vorteilen: „Wir zahlen nicht am
   oberen Rand. Dafür bist du jeden Abend zu Hause."

**Ohne belegbaren Beweis ist die EVP nicht fertig.** „Seit 2019 ist kein Monteur wegen der
Fahrtzeiten gegangen" ist einer. „Wir legen Wert auf Work-Life-Balance" ist keiner. Fehlt der
Beweis, steht `[[FEHLT: Beweis für EVP]]` im Brief, und die Aussage kommt nicht auf die Seite.

## Phase 2: Anzeigentext, AGG-geprüft

**Artefakt:** Anzeigentext als Datei, mit Prüfvermerk.

Reihenfolge im Text: **Versprechen, Alltag, Aufgabe, Anforderung, Gehalt, nächster Schritt.**
Nicht: Firmenvorstellung, Aufgabe, Anforderung, „wir bieten".

- [ ] Geschlechtsneutrale Bezeichnung oder „(m/w/d)"
- [ ] Jede Anforderung hat einen tätigkeitsbezogenen Grund, am besten daneben geschrieben
- [ ] Keine Altersbezüge („junges Team", „Digital Native", „Berufseinsteiger" als Muss)
- [ ] Kein „Muttersprachler", stattdessen ein Niveau („Deutsch C1")
- [ ] Kein Bewerbungsfoto verlangt
- [ ] Körperliche Anforderungen konkret statt „belastbar" („Heben bis 25 kg mehrfach täglich")
- [ ] Gehaltsangabe vorhanden oder die Entscheidung dagegen begründet
- [ ] Fachliche AGG-Prüfung erfolgt, mit Datum

**Die Prüfung ist keine Formalie.** Ein Verstoß begründet eine Vermutung nach § 22 AGG, und
der Arbeitgeber muss das Gegenteil beweisen.

## Phase 3: Struktur

**Artefakt:** Sektionsliste je Stufe.

### Karriere-Landingpage, eine Stelle

| # | Sektion | Inhalt | Pflicht |
|---|---|---|---|
| 1 | Held | H1 wiederholt das Versprechen der Anzeige, ein Bild vom echten Arbeitsplatz, Primär-CTA | ja |
| 2 | Der Alltag | ein Tag in dieser Stelle, konkret, mit Uhrzeiten | ja |
| 3 | Was du bekommst | 4 bis 6 Punkte, jeder prüfbar, Gehalt dabei | ja |
| 4 | Wer wir sind | Gesichter mit Namen und Funktion, keine Stockfotos | ja |
| 5 | Stimmen | 2 bis 3 Mitarbeiter, mit Name, Funktion, Dauer im Betrieb | ja |
| 6 | Aufgabe und Anforderung | in dieser Reihenfolge, nicht umgekehrt | ja |
| 7 | Selbsttest | 5 Fragen, sofortiges Ergebnis | optional |
| 8 | Ablauf | was nach der Bewerbung passiert, mit Zeitangaben | ja |
| 9 | Kurzbewerbung | 3 Felder, kein Upload | ja |
| 10 | Fragen | die 6 Fragen, die wirklich vorher kommen | ja |

**Keine Hauptnavigation.** Nur Impressum und Datenschutzhinweise im Fuß, weil sie rechtlich
erreichbar sein müssen.

**Der Primär-CTA hat einen Text, auf der ganzen Seite.** „In 2 Minuten bewerben" ist besser
als „Jetzt bewerben", weil er den Aufwand nennt und damit die Hemmschwelle senkt.

**Mobiler Balken mit dem Primär-CTA** ab Ende des Heldenbereichs, siehe
`../references/06-conversion-architektur.md`.

### Sektion 4 und 5 sind hier nicht optional

Bei einer Verkaufsseite sind Trust-Elemente ein Hebel. In einem Recruiting-Funnel sind sie
**der** Hebel: der Bewerber entscheidet über Menschen, nicht über Leistungen. Ein
Recruiting-Funnel ohne Gesichter mit Namen funktioniert nicht.

**Keine Stockfotos.** Ein lachendes Stockteam auf einer Karriereseite ist schlimmer als kein
Bild, weil es signalisiert, dass man das echte Team nicht zeigen will. Liegen keine Fotos
vor, steht `[[FEHLT: Teamfotos]]` in der Liste offener Punkte und in der Übergabe der Hinweis,
dass der Funnel bis dahin nicht seine Wirkung hat.

## Phase 4: Copy

**Artefakt:** Copy-Dokument, alle Vorschläge mit `data-copy-vorschlag` markiert.

- Anrede aus `marke.json` (`sprache.anrede`), konsequent bis in Bestätigungsmails
- Keine Gedankenstriche (harte Grenze, `scripts/pruefe-striche.mjs`)
- Verbotsliste aus `marke.json` plus die Recruiting-Floskeln
  (`19-recruiting-funnel.md`, Abschnitt EVP)
- Jede Zahl belegt oder `[[FEHLT]]`

**Beim Duzen aufpassen:** Im Recruiting ist „du" verbreiteter als auf der
Unternehmensseite. Ein Bruch zwischen Karriereseite („du") und Bestätigungsmail aus dem ATS
(„Sie") ist der häufigste Fall, und er fällt auf. Die Mailtexte im ATS gehören mit
angepasst; das ist Teil des Auftrags, nicht Sache des Kunden.

## Phase 5: Design

Voller Durchgang aus `../references/10-visuelle-richtung.md`. Zwei Besonderheiten:

- **Die Karriereseite darf von der Unternehmensseite abweichen**, muss aber erkennbar
  dieselbe Marke sein. Gleiche Tokens, gleiche Schrift, eventuell wärmere Flächen und mehr
  Bild.
- **Der eine orchestrierte Moment** sitzt beim Ergebnis des Selbsttests, wenn es einen gibt,
  sonst beim Alltag-Abschnitt. Nicht im Heldenbereich, siehe
  `../references/18-motion-handschrift.md`.

## Phase 6: Bau

- [ ] Mobil zuerst gebaut, nicht mobil nachgezogen
- [ ] Formular mit 3 Feldern, ohne Upload-Zwang, ohne Anschreiben
- [ ] Vier Formularzustände (Ruhe, Senden, Erfolg, Fehler), Eingaben bleiben bei Fehler stehen
- [ ] Alternativer Kontaktweg neben jeder Fehlermeldung
- [ ] Spamschutz: Honigtopf, Zeitfeld, Origin-Prüfung, Rate-Limit
- [ ] Doppelte Mail: intern und Bestätigung an den Bewerber
- [ ] Bestätigung nennt den nächsten Schritt mit Zeitangabe
- [ ] Selbsttest ohne JavaScript nutzbar oder sauber übersprungen, nie ein toter Pfad
- [ ] Bewerber-Datenschutzhinweise verlinkt, vor dem Absenden erreichbar
- [ ] Talentpool-Einwilligung als eigene, nicht vorausgewählte Checkbox
- [ ] JobPosting-JSON-LD, `title` ist der reine Jobtitel, `validThrough` gesetzt
- [ ] Bewerberdaten gehen in keinen Analytics-Event
- [ ] Eingaben in Heatmaps maskiert oder Strecke ausgenommen
- [ ] ATS, falls eingebettet: Consent greift, Tastatur geprüft, Ladezeit gemessen

## Phase 7: Test

```bash
node scripts/pruefe-striche.mjs
node scripts/pruefe-tokens.mjs
node scripts/pruefe-platzhalter.mjs
node scripts/pruefe-breakpoints.mjs http://localhost:4321/karriere/elektriker --bilder
```

Zusätzlich von Hand:

- **Bewerbung mit einer Hand auf einem echten Handy.** Nicht im Emulator. Wenn es mit dem
  Daumen nicht in unter zwei Minuten geht, ist die Strecke zu lang.
- **Tastaturdurchlauf** durch das ganze Formular, inklusive Fehlerfall.
- **Formular absichtlich fehlschlagen lassen.** Bleiben die Eingaben stehen? Ist der
  Telefonkontakt sichtbar?
- **Rich Results Test** für die Stellenseite.
- **Bestätigungsmail auf dem Handy lesen.** Stimmt die Anrede? Steht der nächste Schritt drin?

## Phase 8: Livegang und danach

Vollständige Liste: `../references/19-recruiting-funnel.md`, Abschnitt Prüfliste.

**Und der Punkt, der nach dem Livegang zählt:** Eine besetzte Stelle muss aktiv aus dem Netz.
`validThrough` in die Vergangenheit, 404 oder 410, oder Markup entfernen. Dazu gehört ein
Prozess, nicht ein guter Vorsatz. Ohne ihn bewerben sich Leute drei Monate später auf eine
besetzte Stelle, und das ist der schlechteste erste Eindruck, den ein Arbeitgeber machen kann.

**Monatliches Review** (`../references/13-messung-optimierung.md`) mit den Funnel-Kennzahlen.
Die Abbruchquote je Feld ist die Zahl, die zuerst angesehen wird.

## Drei Fehler, die genau bei diesem Typ passieren

1. **Die Karriereseite ist eine Unterseite der Unternehmensseite mit voller Navigation.**
   Jeder Weg heraus ist ein Abbruch. Ein Bewerber, der in den Leistungen landet, kommt nicht
   zurück.
2. **Der Bewerbungsbutton führt direkt in ein ATS-iframe.** Damit ist die Strecke aus der
   Hand gegeben: Ladezeit, Barrierefreiheit und Formularlänge kontrolliert jemand anders, und
   die Abbruchquote ist nicht messbar. Einstieg auf eigener Seite, ATS danach.
3. **Die Anzeige verspricht etwas, das die Seite nicht wiederholt.** Kein Message-Match, also
   Absprung im ersten Bildschirm. Die H1 ist das Versprechen aus der Anzeige, wörtlich.
