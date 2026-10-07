# KI Assets für Bewegtbild und 3D

`28-ki-bildentwuerfe.md` behandelt Bildmodelle als **Denkwerkzeug**: Entwürfe zeigen, wie eine Sektion aussehen könnte,
sie sind nie Beleg und nie Inhalt. Dieses Kapitel behandelt den zweiten Fall: KI erzeugt ein **Gestaltungsasset, das auf die
Seite kommt** (ein Motiv für ein Scrollvideo, ein Objekt für eine 3D Einbettung, ein Hintergrundbild). Die Sperren aus
Kapitel 28 gelten weiter.

Quelle: Video „Give Me 9 Minutes & Make INSANE Website Animations" (06.08.2026) und „The ONLY 5 Tools You Need to Build
Insane Sites" (04.06.2026) von Self-Made Web Designer. Übernommen sind Arbeitsweise und Grenzen, kein Text. Die im Video
genannten Modelle und Werkzeuge sind **Stand Juni bis August 2026** und veralten schnell; die Regeln sind deshalb
werkzeugneutral. Eines der Videos wurde vom Anbieter gesponsert, das ist bei der Gewichtung der Werkzeugnamen zu
berücksichtigen.

## 1. Was ein KI Asset sein darf und was nicht

| Asset | erlaubt | nicht erlaubt | Grund |
|---|---|---|---|
| Motiv als Gestaltungselement (Objekt, Skulptur, abstraktes Produktbild) | ja, wenn klar als gestalterisches Element gedacht | als „Foto unseres Produkts", wenn es das Produkt so nicht gibt | keine Attrappen als Beleg |
| Hintergrund, Textur, Verlauf | ja | Abbildung realer Orte oder Menschen als Kundenmaterial | Täuschung |
| Team, Kunden, Referenzen, Gebäude des Kunden | nein | jede KI Darstellung als Realität | Vertrauensbruch, UWG Risiko |
| Marken, Logos, Personen mit Wiedererkennung | nein | auch nicht „im Stil von" | Rechte Dritter |

## 2. Die Arbeitsweise

Kernaussage des Videos: **Mit einem einzigen Auftrag klappt es nie.** Wer gute Ergebnisse sieht, hat meist mehrfach
nachgeschärft. Der Ablauf unten ist ein Weg dorthin, nicht eine Garantie.

| Schritt | Eingabe | Ergebnis | Prüfung | Grund |
|---|---|---|---|---|
| 1 Referenzen sammeln | Bilder, die Material, Licht und Stimmung zeigen (Moodboard/Stylescape) | Auswahl von wenigen Referenzen | gehört zur Richtung im Markenbrief | Wörter beschreiben Visuelles schlecht |
| 2 Handskizze mitgeben | grobe Zeichnung, darf schlecht sein | Modell versteht Komposition | Skizze und Ergebnis nebeneinander | eine grobe Skizze ersetzt viele Sätze |
| 3 Erstes brauchbares Ergebnis als Anker | bestes Ergebnis wird Referenz für alle weiteren | Serie bleibt konsistent | Serie nebeneinander ansehen | Konsistenz entsteht durch Anker, nicht durch Glück |
| 4 Teilbearbeitung statt Neuauftrag | Markierungen und Pfeile direkt im Bild, kurze Anweisung | gezielte Korrektur | Änderung nur an der markierten Stelle | gegen störrisches Verhalten des Modells hilft Zeigen mehr als Streiten |
| 5 Winkelvarianten für 3D | mehrere Ansichten desselben Motivs | Eingabe für 3D Umwandlung | Ansichten stimmen geometrisch | 3D Umwandlung braucht konsistente Ansichten |
| 6 Video aus Start und Endbild | erstes Bild, letztes Bild, sehr konkrete Beschreibung der Bewegung | saubere mechanische Bewegung | Vorwärts und Rückwärts ansehen | Bewegung zwischen zwei festen Bildern bleibt kontrollierbar |
| 7 Modell nach Test wählen | gleiche Eingabe an mehrere Videomodelle | das Modell, das die Bewegung sauber löst | Vergleichsraster | Eignung hängt von der Aufgabe ab, nicht vom Namen |

**Aufwand und Kosten:** Im Video nicht genannt, ein Kommentar fragt danach. Zeit je Asset und Kosten je Serie:
`[[unbekannt]]`, im Projekt festhalten und für die nächste Kalkulation nutzen.

## 3. Wann abbrechen

Eine Grenze gehört ins Konzept (Tor 1), damit nicht ein Nachmittag verbrennt. Vorschlag (nicht aus dem Video):

- nach mehreren erfolglosen Neuaufträgen auf Teilbearbeitung wechseln,
- danach auf Skizze plus Referenz,
- danach das Motiv vereinfachen oder ein Foto beziehungsweise Standbild einsetzen.

Die Zahl der Versuche je Stufe wird im Projekt festgelegt und im Projekt `CLAUDE.md` dokumentiert.

## 3a. Kosten, Budget, Protokoll

Wenn KI Assets über eine bezahlte Schnittstelle entstehen (Bild oder Video über einen
Anbieter oder Aggregator), gelten diese Regeln. Quelle ist ein Video zu einem eigenen
Generierungsskill (Jay E, RoboNuggets, 31.07.2026). Anbieternamen, Preise und Nutzungsbedingungen
darin sind Stand Video und hier **nicht übernommen**: sie ändern sich laufend und sind ungeprüft.

| Regel | Grund |
|---|---|
| **Kosten vor dem Senden berechnen und nennen** | Pay as you go ohne Vorabzahl endet bei einer Rechnung, die niemand freigegeben hat |
| **Budget-Deckel je Auftrag** im Konzept (Tor 1), Betrag `[[FEHLT: Deckel je Auftrag]]` | ein Deckel, der nicht dasteht, wird nicht gehalten |
| **Bestätigung bei Mengen** (Vorschlag: ab zehn Bildern, Wert im Projekt festlegen) | Serien laufen sonst durch |
| **Prompt vorher zeigen** | der Kunde und die Agentur sehen, was ins Werkzeug geht, auch Kundenmaterial |
| **Protokoll je Datei**: Prompt, Modell, Kosten, Datei, Nutzungsbedingungen für Kundenprojekte | Rechte und Kalkulation der nächsten Serie hängen daran (Abschnitt 4) |
| **Schlüssel nur in `.env`**, nie im Chat, nie im Repository | `pruefe-platzhalter.mjs` und die Regel „keine Schlüssel im Repository" aus der Definition of Done |
| **Bedingungen des Anbieters zu Speicherung, Training und Löschfrist lesen**, bevor Kundenmaterial hochgeladen wird | das Video nennt einen Anbieter, dessen Bedingungen Inhalte für den Betrieb und die Modellverbesserung nutzbar machen, die Aussage ist ungeprüft |

Vorlage: `../assets/vorlagen/prompts/bildgenerierung.md`. Ob ein Anbieter günstiger oder zuverlässiger ist als ein anderer, steht im Video als Aussage des
Autors und ist hier ungemessen. Ein Modellvergleich gehört in die Serie des Projekts, nicht in das Regelwerk.

## 3b. Pilot und Figurenwelt

Teure Serien beginnen mit **einer** freigegebenen Pilotvariante. Wiederkehrende Figuren brauchen vorab
Figurenliste, Bauregeln, Modellblatt und Asset Inventar. Beides: `44-gutes-festschreiben-und-rueckbauprobe.md`,
Abschnitte 3 und 4. Figur, Stil und Name wählt ein Mensch.

## 4. Rechte und Kennzeichnung

- Nutzungsbedingungen des Werkzeugs für kommerzielle Verwendung der Ergebnisse prüfen und im Projekt ablegen.
- Ob und wie KI erzeugte Inhalte gekennzeichnet werden müssen, ist abhängig vom Inhalt und Einsatz zu prüfen.
  Arbeitsdokument, keine Rechtsberatung; im Zweifel rechtlich klären lassen.
- Kundenmaterial (Logos, Produktfotos) nur mit Freigabe in ein externes Werkzeug laden.

## 5. Nicht übernommen (mit Grund)

- Namen einzelner Modelle als Empfehlung: veralten schnell.
- Werkzeugspezifische Bedienung (Menüs, Preismodelle): nicht Teil des Regelwerks.
- Die Aussage, Prompting Genies gebe es nicht: als Erfahrungswert übernommen („mehrere Runden einplanen"), nicht als Beleg.

## Verwandte Kapitel

`28-ki-bildentwuerfe.md`, `38-scrollvideo-und-einbettungen.md`, `22-premium-designquellen.md`,
`agentur-website-builder/references/moodboard-und-stylescape.md`.
