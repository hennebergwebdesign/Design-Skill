# Motion als Funktion der Zeit: Logoanimation, Loops, Kurzvideo

`09-motion-gsap.md` und `18-motion-handschrift.md` regeln Bewegung **in** einer Seite,
`30-motion-pruefung.md` prüft sie, `38-scrollvideo-und-einbettungen.md` behandelt Scrollvideo.
Dieses Kapitel behandelt Bewegtbild als **eigenes Lieferstück**: ein Logo, das sich in drei
Sekunden aufbaut, ein Loop für den Hero, ein Kurzvideo für Launch oder Pitch, dieselbe Szene in
mehreren Formaten. Es ist kein Pflichtkapitel für jede Seite, sondern gilt, sobald ein solches
Stück gebaut wird (Zusatzleistung, siehe Abschnitt 9).

Die Substanz stammt aus einem Erweiterungspaket mit Videoauswertungen (Referenzarbeit, Motion,
Designloop). Zahlen und Aussagen daraus sind Erfahrungswerte der Autoren, nicht gemessen und
nicht gegen Hersteller geprüft. Werkzeugnamen veralten, die Regeln sind werkzeugneutral.

## Inhalt

- 1\. Das Prinzip: ein Bild ist `frame(t)`
- 2\. Reihenfolge, jede Stufe mit Tor
- 3\. Look: gegen die Schablone
- 4\. Referenzvideo auswerten
- 5\. Einsatz im Web
- 6\. Mehrere Formate aus einer Szene
- 7\. Rechte und Kennzeichnung
- 8\. Checkliste vor Freigabe
- 9\. Als Zusatzleistung
- 10\. Nicht übernommen (mit Grund)
- Verwandte Kapitel

## 1. Das Prinzip: ein Bild ist `frame(t)`

Jedes Bild der Animation ist eine reine Funktion der Zeit: gleiches `t`, gleiches Bild. Kein
verstecktes Zustandsgedächtnis, kein ungesetzter Zufall.

| Folge | Grund |
|---|---|
| Jedes Frame lässt sich einzeln rendern, ansehen und neu zeichnen | Ein Fehler bei 1,3 s wird bei 1,3 s behoben, nicht durch Abspielen gesucht |
| Zufall nur mit festem Seed | Sonst sieht der zweite Render anders aus als der freigegebene erste |
| Eine Szene, viele Formate: `frame(t, format)` für 16:9, 1:1, 9:16 und Hero | Vier getrennte Entwürfe driften auseinander, ein Parameter nicht |
| Die Szene steht in **einer HTML Datei ohne Abhängigkeiten**, solange kein Framework verlangt ist | Sie bleibt in zwei Jahren noch renderbar. Remotion oder HyperFrames nur auf ausdrücklichen Wunsch |

Renderkontrakt: Playwright rendert Frame für Frame (Zeit von außen gesetzt, nicht Echtzeit),
FFmpeg setzt das MP4 zusammen. 60 Bilder pro Sekunde bei Bewegungsdesign, 30 genügen bei
Erklärvideos. Playwright und FFmpeg gehören zum Zielprojekt, nicht zu diesem Repository
(Abhängigkeitsregel in `CLAUDE.md`).

## 2. Reihenfolge, jede Stufe mit Tor

| # | Schritt | Ergebnis | Mensch gibt frei? |
|---|---|---|---|
| 1 | Format und Länge festlegen (3 s Logo als Loop, 15 s Launch, 9:16 oder 16:9) | eine Zeile im Auftrag | ja |
| 2 | Marke holen: Logo, Farben, Schrift, echte Oberflächenbilder über `scripts/brand-extraktion.mjs` oder aus Kundendateien | Material mit Herkunft | nein, aber nichts erfinden |
| 3 | **Storyboard** mit 6 bis 8 Einzelbildern, vor jeder Zeile Code | Bildfolge mit je einem Satz | **ja, Pflicht** |
| 4 | **Beatgrid** als Tabelle (Zeit, Zustand, Ton) | Tabelle | **ja, Pflicht** |
| 5 | Ton: Sprache zuerst und Bild folgt, oder Musik im Takt (zum Beispiel 120 BPM) mit `beats.json`, Bewegungen auf Beats gelegt | Tonspur und Beatdatei | ja |
| 6 | Rendern, Kontaktbogen per FFmpeg ziehen, ansehen, korrigieren, neu rendern | MP4 plus Kontaktbogen | ja, vor Übergabe |

Grund für die zwei Tore vor dem Code: Ein Storyboard ändert man in Minuten, ein gebautes
Video in Stunden. Das Tor aus `38-scrollvideo-und-einbettungen.md`, Abschnitt 2a, gilt hier
genauso. **Aufwand vorab nennen:** Hohe Qualität kann Stunden Renderzeit kosten, das steht im
Auftrag, bevor gestartet wird (Kostenlogik wie in `39-ki-assets-bewegtbild-und-3d.md`, 3a).

Beispiel Beatgrid, Logoanimation 3 s, 60 fps:

| Zeit | Zustand | Ton |
|---|---|---|
| 0,0 bis 0,4 s | Fläche leer, Marke nicht sichtbar | Stille |
| 0,4 bis 1,2 s | Bildmarke baut sich auf, `--kurve-eintritt` | leiser Anschlag bei 0,4 |
| 1,2 bis 2,2 s | Wortmarke tritt ein, versetzt 80 ms je Buchstabe | Klang trägt aus |
| 2,2 bis 3,0 s | Ruhe, Loop-Übergang zum Anfangsbild | Ausklang |

## 3. Look: gegen die Schablone

| Regel | Grund |
|---|---|
| Kein zentrierter Text auf Standardverlauf | die meistgesehene Maschinenoptik, gleicher Befund wie in `26-geschmack-und-ki-tells.md` |
| Keine Standardschrift des Modells ohne Wahl: Schrift kommt aus der Marke | Marke schlägt Voreinstellung (`24-designsystem-vorrang.md`) |
| **Eine** Handschrift aus Palette, Radien und Kurven des Projekts | Mehrere Bewegungssprachen in einem Stück wirken zufällig (`18-motion-handschrift.md`) |
| Text tritt ein und geht ab nach **einem festen Muster** | Wiedererkennung, und der Besucher lernt, wo er hinsehen muss |
| Kamera und Schnitte benennen: Schnittlänge, Übergangsart, Bewegung | Ohne Benennung entsteht Mittelmaß |

## 4. Referenzvideo auswerten

1. Frames alle 0,5 Sekunden ziehen (FFmpeg).
2. Styleguide schreiben: Palette, Typografie, Schnittlängen, Übergänge, Kamera, Texteintritt und
   Austritt, je Eintrag mit der Zeitmarke des Belegframes.
3. Daraus eine **Kurzliste** für das neue Video ableiten.

Was von einer fremden Vorlage gilt: Grammatik (Schnittlänge, Rhythmus, Texteintritt). Was nie
gilt: Figuren, Logos, Musik, Markenfarben der Vorlage. Eine fremde Seite oder ein fremdes Video
wird nur nach Freigabe erfasst (Tor 1, `designrecherche-ablauf.md`), die Beobachtungen tragen die
Belegmarken aus `25-designmuster-bibliothek.md`: beobachtet, abgeleitet, unbekannt.

## 5. Einsatz im Web

| Fall | Regel | Grund |
|---|---|---|
| Hero Loop, Footer Animation | zuerst CSS oder leichtes Canvas, MP4 nur mit Poster und Ersatz bei `prefers-reduced-motion: reduce` | Gewicht und Barrierefreiheit (`03-technik-performance.md`, `04-barrierefreiheit-bfsg.md`) |
| Bewegung über 5 Sekunden, die automatisch startet | **Pause oder Stopp** anbieten | WCAG 2.2.2, Kriterium der Stufe A |
| Dauerloop neben Fließtext | vermeiden oder stoppbar halten | Bewegung im Randbereich lenkt vom Lesen ab |
| Video mit Ton | nie automatisch mit Ton | Browser sperren es ohnehin, Besucher wollen es nicht |
| Bedienbare Elemente | bleiben bei 300 ms und darunter (`30-motion-pruefung.md`) | gilt unabhängig vom Lieferstück |

`pruefe-motion.mjs` prüft Scrollvideo, Einbettung, Reduzierung und Dauer im Quelltext. Ob ein
Loop eine Pause bietet und ein Poster hat, **prüft derzeit kein Skript**, das steht in der
Checkliste (Abschnitt 8).

## 6. Mehrere Formate aus einer Szene

| Format | Einsatz | Sicherer Rand |
|---|---|---|
| 16:9 | Website, Präsentation, YouTube | Text im mittleren 90 Prozent Bereich |
| 1:1 | Feed, Kachel | Text im mittleren 80 Prozent Bereich |
| 9:16 | Reel, Story | oben und unten je 15 Prozent frei für die Oberfläche der Plattform |
| Hero (breit, niedrig) | Seitenkopf | Motiv entkoppelt vom Text, siehe `38-scrollvideo-und-einbettungen.md`, Abschnitt 6 |

Die Randwerte sind Vorschläge, keine Plattformvorgabe. Vor Veröffentlichung gegen die aktuelle
Plattform prüfen.

## 7. Rechte und Kennzeichnung

Wie in `39-ki-assets-bewegtbild-und-3d.md`, Abschnitt 4. Dazu: Ob KI erzeugte Bilder und
Videos gekennzeichnet werden müssen oder Herkunftsmetadaten (C2PA) mitgeführt werden sollen,
hängt von Inhalt, Plattform und Land ab. **Arbeitsdokument, keine Rechtsberatung**, im Zweifel
rechtlich klären, bevor Motion Material des Kunden veröffentlicht wird. Zahlen zu Kosten, Zeit
und Aufrufen aus Quellvideos kommen nie als Tatsache in Kundentexte.

**Stimme:** Eine synthetische Stimme ist eine Entscheidung mit Rechtsfolgen. Keine Stimme einer realen Person
ohne deren schriftliche Einwilligung, Nutzungsbedingungen des Dienstes für Kundenprojekte lesen und ablegen,
Schlüssel nur in `.env`, nie im Chat (Regeln wie `39-ki-assets-bewegtbild-und-3d.md`, 3a). Wortgenaue
Zeitstempel aus einem Transkript können als Quelle für `beats.json` dienen, wenn das Bild der Sprache folgt.

## 8. Checkliste vor Freigabe

1. Storyboard und Beatgrid freigegeben, Kontaktbogen angesehen
2. jedes Frame ein Ergebnis von `frame(t)`, Zufall mit Seed, zweiter Render gleich dem ersten
3. Marke aus Kundenmaterial, keine erfundenen Logos oder Oberflächen
4. Poster, Ersatz bei `prefers-reduced-motion: reduce`, Pause oder Stopp bei langen Loops
5. Gewicht gemessen, Quelle der Musik und Schrift mit Lizenz abgelegt
6. Kennzeichnungsfrage geklärt oder als offener Punkt im Bericht

## 9. Als Zusatzleistung

Logoanimation (3 Sekunden, Loop) als Extra und Aufmerksamkeitsgewinn im Pitch, mit Markenfarben
aus `marke.json`. Social Paket aus einer Szene: Reel 9:16, Quadrat, Header Loop. Preise und
Leistungsbeschreibung gehören ins Angebot, nicht in diesen Skill.

## 10. Nicht übernommen (mit Grund)

* Kosten, Dauer und Aufrufzahlen der Quellvideos: Erfahrungswerte, hier ungeprüft
* Die Frage, ob Remotion oder HyperFrames das bessere Werkzeug ist: veraltet schnell
* Ein Skript, das Frames rendert: gehört ins Kundenprojekt, nicht in dieses Repository ohne
  Abhängigkeiten

Status: an keinem echten Kundenprojekt erprobt, kein Evalfall, das Δ ist eine Vermutung.

## Verwandte Kapitel

`09-motion-gsap.md`, `18-motion-handschrift.md`, `30-motion-pruefung.md`,
`38-scrollvideo-und-einbettungen.md`, `39-ki-assets-bewegtbild-und-3d.md`,
`40-polierschleife-mit-kritiker.md`, `42-referenzgrammatik-und-gap-audit.md`.
