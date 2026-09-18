# Designrecherche: zwei durchgespielte Beispiele

`designrecherche-ablauf.md` beschreibt die sieben Stufen. Dieses Kapitel spielt sie zweimal
durch, einmal für einen Neubau und einmal für einen Relaunch, jeweils mit den Befehlen, dem,
was der Nutzer sieht, und dem, was er antwortet. Wer den Ablauf zum ersten Mal fährt, liest
hier und nicht dort.

## Beispiel 1: Neubau, Industrie-B2B

Ausgangslage: Hersteller von Messtechnik, Zielgruppe Instandhaltungsleiter, Ziel
Kontaktanfrage. Der Kunde liefert ein Designsystem als Tokendatei. Sitemap und Copy stehen.

### Stufe 1, Brief

`../../webdesign-conversion/assets/vorlagen/designrecherche-brief.md` nach
`.designrecherche/brief.md` kopieren und füllen. Das Sektionsinventar ergibt:

| Sektion | Referenz nötig | Begründung |
|---|---|---|
| Held | ja | erklärungsbedürftiges Produkt, Aussage und Bild konkurrieren |
| Vertrauensbeweis | nein | Logoreihe, Form ist offensichtlich |
| Produktdarstellung | ja | drei Baureihen mit Datenblatt, Darstellung ist die eigentliche Aufgabe |
| Technische Daten | ja | Messwerte lesbar machen, ohne eine Tabellenwüste |
| Fallbeispiele | ja | Ergebnis belegen, ohne Kundennamen zu nennen |
| Ablauf, FAQ, Footer | nein | Struktur bekannt |

Aus vier Zeilen werden vier Suchaufträge, ausformuliert nach Funktion:

> „Industrie-B2B mit erklärungsbedürftigem Produkt: Held, in dem das Produktbild Kontext
> liefert statt zu dekorieren, und die Kernaussage den dominanten Raum behält."

### Stufe 2, Entdeckung

Quellen aus `assets/recherche/referenzquellen.json`. Je Kandidat ein Registereintrag:

```bash
node scripts/referenz-register.mjs anlegen \
  --name "Beispiel Sensorik" --url https://beispiel-sensorik.de --quelle siteinspire \
  --fuer hero,produktdarstellung \
  --grund "asymmetrischer Held, Produktbild trägt Kontext" \
  --extraktion raster,inhaltshierarchie,bild-text-verhaeltnis,cta-platzierung \
  --risiko "vermutlich clientseitig gerendert"
```

### Stufe 3, Tor 1

```bash
node scripts/referenz-register.mjs vorlegen --alle
```

Der Nutzer sieht je Kandidat einen Block mit Adresse, Zielsektion, Begründung, geplanter
Extraktion, Ausschlussliste und Risiken. **Danach wird gestoppt.** Er antwortet zum Beispiel:

> „Referenz 1 komplett freigeben. Von Referenz 2 nur die Fallstudien. Referenz 3 ablehnen,
> die Branche passt nicht."

```bash
node scripts/referenz-register.mjs freigeben --id ref-01-beispiel-sensorik-de
node scripts/referenz-register.mjs freigeben --id ref-02-andere-de --sektionen cases
node scripts/referenz-register.mjs ablehnen  --id ref-03-dritte-de --grund "Branche passt nicht"
```

### Stufe 4 bis 6

```bash
node scripts/referenz-crawl.mjs --alle --breakpoints 375,768,1440 --screenshot
node scripts/design-dna.mjs --alle
```

`dna.md` trennt Beobachtetes von Unbekanntem. Dann die Prinzipien benennen, in
`muster-entwurf.md`, und vergleichen:

```bash
node scripts/muster-vergleich.mjs --id ref-01-beispiel-sensorik-de
```

> `hero-vollbild-pillennavigation` 79 %, Beinahe-Duplikat, als Erweiterung aufnehmen

### Stufe 7, Tor 2

Der Nutzer entscheidet:

> „Den Held als Erweiterung des bestehenden Musters aufnehmen. Die Fallstudien bleiben im
> Projekt."

```bash
node scripts/referenz-register.mjs wissen --id ref-01-beispiel-sensorik-de \
     --entscheidung erweitern --muster hero-vollbild-pillennavigation
node scripts/referenz-register.mjs wissen --id ref-02-andere-de --entscheidung projekt

node scripts/muster-paket.mjs --id ref-01-beispiel-sensorik-de
```

Für `ref-02` entsteht bewusst **kein** Paket. Das Wissen bleibt im Projekt.

### Danach

Die Synthese für den Held nutzt mehrere Quellen: Komposition aus Referenz 1, Hierarchie aus
dem bestehenden Muster, Farben und Schriften aus dem Designsystem des Kunden, Inhalte aus der
Copy. Konflikte werden im Format aus
`../../webdesign-conversion/references/24-designsystem-vorrang.md` benannt:

```
Konflikt: Displayschrift
Referenz beispiel-sensorik.de: kontraststarke Serife
Kundensystem: Inter, Schnitte 400 und 700
Übernommen: der Größensprung zwischen Held und Fließtext, die enge Zeilenhöhe
Nicht übernommen: die Serife selbst, Stufe 1 schlägt Stufe 5
```

## Beispiel 2: Relaunch mit Bestandsseite

Ausgangslage: Handwerksbetrieb, alte WordPress-Seite mit Rankings, kein Designsystem, nur ein
Logo und eine Hausfarbe.

### Erst der Bestand, dann die Richtung

```bash
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
```

Danach Marke und CI auslesen nach
`../../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`. Ergebnis geht in
`marke-brief.md` Abschnitt 7. Damit steht das Projekt auf **Stufe 2** der Rangfolge: es gibt
Markenvorgaben, aber kein System. Logo und Farbfamilie sind ab jetzt geschützt.

Die alte Seite ist dabei **keine** Designreferenz. Sie ist Quelle für Inhalte, Struktur, URLs
und Rechtstexte. Das ist der häufigste Fehler beim Relaunch: die alte Gestaltung wird
fortgeschrieben, weil sie ohnehin gerade auf dem Tisch liegt.

### Dann die Recherche

Dieselben sieben Stufen wie oben. Zwei Unterschiede:

1. Der Brief trägt in Abschnitt 2 die Stufe 2 ein, nicht 1. Eine Referenz darf also mehr
   beeinflussen als im ersten Beispiel, aber Logo und Farbfamilie bleiben geschützt.
2. Das Sektionsinventar kommt aus dem Relaunch-Inventar plus der neuen Sitemap, nicht aus
   der Sitemap allein. Sektionen, die es schon gibt und die funktionieren, brauchen keine
   Referenz.

### Wenn eine Referenz nicht erreichbar ist

```
  nicht erfasst. robots: robots.txt der Seite verbietet /
  Der Zustand bleibt FREIGEGEBEN. Referenz ersetzen oder später erneut versuchen.
  Nicht aus der Erinnerung beschreiben, siehe designrecherche-ablauf.md.
```

Richtig ist dann eines von zwei Dingen: die Seite von Hand ansehen und die Prinzipien selbst
notieren, mit dem Vermerk „ungeprüft, eigene Sichtung", oder die Referenz ersetzen. Falsch
ist, den Aufbau aus dem Gedächtnis zu beschreiben.

## Störungen und was dann

| Meldung | Bedeutung | Richtige Reaktion |
|---|---|---|
| `Übergang ENTDECKT nach GECRAWLT ist nicht vorgesehen` | Tor 1 übersprungen | erst `vorlegen`, dann auf die Freigabe warten |
| `steht auf VORGELEGT, nicht auf FREIGEGEBEN` | die Freigabe fehlt noch | warten, nicht mit `design-scan.mjs` ausweichen |
| `robots: robots.txt der Seite verbietet …` | die Seite untersagt den Abruf | von Hand ansehen oder ersetzen, `--ohne-robots` nur mit Erlaubnis |
| `robots.txt antwortet mit 503` | nach RFC 9309 ein Verbot | später erneut versuchen |
| `Playwright lokal nicht nutzbar` | kein Browser im Projekt | Playwright installieren oder responsives Verhalten als `unbekannt` führen |
| `Keine Abrufstufe lieferte Inhalt` | Seite nicht erreichbar oder reine JS-Anwendung | Firecrawl oder Playwright ergänzen, sonst Referenz ersetzen |
| `Der Entwurf hat noch offene Felder` | Vergleich gegen Platzhalter | Entwurf füllen, dann erneut vergleichen |
| `ist an Tor 2 als NUR_PROJEKT entschieden` | kein Paket, so gewollt | nichts tun, das Wissen bleibt im Projekt |
| `trägt keinen Freigabevermerk eines Menschen` | Zustand von Hand gesetzt | über `referenz-register.mjs wissen` entscheiden |
| `Diese Adresse steht bereits im Register` | Dublette | vorhandenen Eintrag nutzen |
| `Kein Index unter …/index.json` | Bibliothek nie gebaut | `node scripts/pruefe-muster.mjs --index` |

## Was in keinem der beiden Beispiele passiert

- Eine Referenz wird abgerufen, bevor sie freigegeben ist.
- Ein Muster wandert in die Bibliothek, ohne dass ein Mensch an Tor 2 entschieden hat.
- Eine nicht erfasste Eigenschaft wird geschätzt, weil der Plan sie braucht.
- Farben oder Schriften einer Referenz ersetzen das Designsystem des Kunden.
- Eine einzelne Referenz bestimmt eine ganze Sektion allein.

## Verwandte Kapitel

- Der Ablauf selbst: `designrecherche-ablauf.md`
- Quellen konfigurieren: `referenzquellen-konfiguration.md`
- Abrufstufen und Einrichtung: `firecrawl-recherche.md`
- Musterbibliothek und Konfidenzmodell:
  `../../webdesign-conversion/references/25-designmuster-bibliothek.md`
- Rangfolge und Konfliktformat:
  `../../webdesign-conversion/references/24-designsystem-vorrang.md`
