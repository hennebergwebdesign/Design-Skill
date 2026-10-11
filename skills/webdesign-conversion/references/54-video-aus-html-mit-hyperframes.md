# Video aus HTML mit HyperFrames: Ablauf, Vertrag, Prüfung

`41-motion-als-funktion-der-zeit.md` beschreibt Bewegtbild als reine Funktion der Zeit, mit Storyboard und Beatgrid als Toren vor dem
Code, `39-ki-assets-bewegtbild-und-3d.md` die Erzeugung von Material und `38-scrollvideo-und-einbettungen.md` den Einsatz auf der Seite.
Dieses Kapitel benennt das **Werkzeug**, mit dem die Agentur solche Stücke baut, prüft und verbessert: **HyperFrames** (HeyGen, Apache-2.0,
Stand 11.10.2026). Es schreibt Videos und Animationssequenzen als HTML, spielt sie deterministisch Bild für Bild ab und kodiert MP4. Das
passt zu Kapitel 41, weil jedes Bild dort ohnehin `frame(t)` ist.

Damit ist die Vorbehaltsklausel aus Kapitel 41 (Remotion oder HyperFrames „nur auf ausdrücklichen Wunsch") für dieses Werkzeug erfüllt: Der
Auftraggeber hat es ausdrücklich verlangt. Eine einzelne Szene ohne Framework in einer HTML-Datei bleibt zulässig und ist für ein
Logoloop-Stück meist die schlankere Lösung (Abschnitt 2). Übernommen sind Ablauf, Vertrag und Prüfreihenfolge der Skills aus dem
Repository `heygen-com/hyperframes`, siehe `CREDITS.md`, Abschnitt „Version 4.21". Kein Text und kein Code der Quelle ist kopiert.

## Inhalt

- 1\. Wann Video, und wann dieses Werkzeug
- 2\. Wahl: eine HTML-Datei oder HyperFrames
- 3\. Voraussetzungen
- 4\. Der Ablauf mit Toren
- 5\. Der Vertrag einer Komposition
- 6\. Marke, Gestaltung und Sperren
- 7\. Optimieren und verbessern
- 8\. Prüfen und rendern
- 9\. Datenschutz, Rechte, Kosten
- 10\. Einsatz auf der Seite
- 11\. Entschiedene Widersprüche
- 12\. Bewusst nicht übernommen
- 13\. Ungeprüft
- Verwandte Kapitel

## 1. Wann Video, und wann dieses Werkzeug

Ein Video ist kein Pflichtbestandteil einer Kundenseite. Es lohnt, wenn jemand etwas sehen muss, was Text und Bild schlecht tragen: ein Ablauf,
ein Produkt in Bewegung, eine Marke, die sich bewegt. Die Prüffrage aus `38-…`, Abschnitt 1, gilt vorab. Wo sie zu „ja" führt, kommen diese Lieferstücke in Frage:

| Lieferstück | Länge | Typischer Einsatz |
|---|---|---|
| Logoanimation, Loop | 3 s | Pitch, Ladezustand, Held als stilles Loop |
| Produkt- oder Leistungsvideo aus der eigenen Seite | 15 bis 90 s | Startseite, Anzeige, Pitch |
| Kurzclip aus einer Szene in mehreren Formaten | 6 bis 30 s | Reel 9:16, Quadrat, Header |
| Erklärvideo aus Notizen oder Text | 30 bis 120 s | Leistungsseite, Social |
| Untertitelte Aufnahme (Sprecher, Interview) mit Einblendungen | beliebig | Referenz, Fallbeispiel |
| Taktgebundenes Stück zu Musik | 10 bis 60 s | Event, Marke |
| Animierte Folien, die man auch abspielen kann | beliebig | Pitch, Angebot |

HyperFrames deckt diese Fälle als eigene Arbeitsabläufe ab (Produktvideo aus einer Adresse, Erklärvideo, Untertitel, Einblendungen über Aufnahmen,
Musikvideo, Kurzstück, Folien, Umbau aus Remotion). Nicht jeder Ablauf wird in der Agentur gebraucht; die Tabelle nennt, was oft vorkommt.

## 2. Wahl: eine HTML-Datei oder HyperFrames

| Kriterium | Eine HTML-Datei (`41-…`) | HyperFrames |
|---|---|---|
| Umfang | eine Szene, 3 bis 15 s, ein Format | mehrere Szenen, Untertitel, Ton, Übergänge, mehrere Formate |
| Abhängigkeiten | keine | Node.js 22 oder neuer, FFmpeg, das Paket `hyperframes` über `npx` |
| Vorschau und Schnitt | eigene Mittel | Studio mit Zeitleiste, Momentaufnahmen, Vergleich |
| Wiederverwendung | von Hand | Variablen, Unterkompositionen, ein Verzeichnis fertiger Bausteine |
| Ton, Stimme, Untertitel | selbst | eingebaute Abläufe (Hosted-Dienste optional, siehe Abschnitt 9) |
| Wartbarkeit nach zwei Jahren | hoch | hängt an der Version, die im Projekt festliegt |

Entscheidung: **Bis etwa 10 Sekunden, eine Szene, ein Format: eine HTML-Datei.** Alles darüber: HyperFrames. Das Werkzeug ist ein **Agenturwerkzeug**,
es steht nicht im `package.json` der Kundenseite und nicht im Ordner des Astro-Builds, sondern in einem getrennten Ordner (`videos/<projekt>/`
mit eigenem `package.json`, aus dem Build ausgeschlossen). Gründe in `52-…`, Abschnitt 8.

## 3. Voraussetzungen

* Node.js 22 oder neuer und FFmpeg auf der Maschine, die rendert. Prüfen mit `npx hyperframes doctor` und `npx hyperframes info`.
* Skills für den Agenten: `npx hyperframes skills update` installiert den Kernsatz aus dem aktuellen Stand; die Abläufe für ein Lieferstück installiert der Eingangsskill bei Bedarf selbst.
  Für Claude Code gibt es ein Plugin (`claude plugin marketplace add heygen-com/hyperframes`, `claude plugin install hyperframes@hyperframes`). Wer es installiert, installiert damit fremde
  Anweisungen in die Sitzung. Der Abschnitt 11 hält fest, wie das mit den Regeln dieses Repositories zusammenspielt.
* Kein Schlüssel nötig für den lokalen Weg. Stimme, Musik und Untertitel können lokale Engines oder gehostete Dienste von HeyGen nutzen (Abschnitt 9).
* Der Eingangsskill prüft vor dem Start die verbleibende Nutzung (`npx hyperframes usage --json`). Ist sie unbekannt, steht das im Bericht, es wird nicht geschätzt.

## 4. Der Ablauf mit Toren

Der Eingangsskill von HyperFrames fragt vor jedem neuen Stück den Auftrag ab und schreibt ihn als `BRIEF.md`; alle späteren Schritte lesen nur diese Datei. Das passt zum
Markenbrief dieses Repositories: Der Auftrag für ein Video steht im Projekt neben `marke.json`, nicht im Gespräch.

| # | Schritt | Ergebnis | Tor |
|---|---|---|---|
| 0 | Auftrag klären: Zweck, Zielgruppe, Länge, Formate, Ton, Sprache, Quelle (Adresse, Text, Aufnahme, Musik), Aufwand | `BRIEF.md` | Mensch bestätigt |
| 1 | Projekt anlegen in `videos/<name>/` (`npx hyperframes init`) | Gerüst mit `hyperframes.json` | |
| 2 | Quelle erfassen. **Nur die eigene Seite oder freigegebene Referenzen** | Ordner `capture/` mit Bildschirmfotos, Text, Farben, Schriften | siehe Abschnitt 6 |
| 3 | Gestaltungsvorgabe festlegen (`frame.md`, aus `marke.json` und `DESIGN.md`) | eine Vorgabe | |
| 4 | **Storyboard** und, bei Sprache, Skript | `STORYBOARD.md`, `SCRIPT.md` | **Mensch gibt frei, Pflicht** (`41-…`, Abschnitt 2) |
| 5 | Ton: Sprache, Musik, Takt | `audio_meta.json` | |
| 6 | Bildfolge bauen, je Bild eine Datei, danach zusammensetzen | `compositions/…`, `index.html` | |
| 7 | Prüfen (Abschnitt 8) | grüne `check`-Meldung, Momentaufnahmen | |
| 8 | Vorschau im Studio, Rückmeldung einarbeiten | | **Mensch gibt frei, vor dem Rendern** |
| 9 | Rendern und die Ausgabe prüfen | `renders/video.mp4` | |

Das Storyboard ist ein Vorschlag, den der Mensch ändert, bevor Code entsteht: Ein Storyboard ändert man in Minuten, ein gebautes Video in Stunden (`41-…`). Rendern
**erst nach Freigabe**. Während der Arbeit auf `--quality draft`, für den ersten echten Lauf die Voreinstellung (`looks`), für die Auslieferung `delivery`. Der Aufwand
(Renderzeit, Nutzung) wird vorab genannt, Kostenlogik wie in `39-…`, Abschnitt 3a.

**Der Anfang sagt, worum es geht.** Aus der Erzählregel des Werkzeugs, die zu `45-…` und `49-…` passt (für ein Video, nicht für den Heldbereich einer Seite, dort gilt die Kernbotschaft im ersten Bildschirm): der Wert vor dem Beleg;
jede Einstellung hat einen Zweck; jede gezeigte Fläche stammt aus der echten Quelle. Das Stück zeigt nur, was die Seite oder das Produkt wirklich zeigt.

## 5. Der Vertrag einer Komposition

HyperFrames spielt eine Komposition nicht ab, es **springt** zu jeder Zeit und liest das Bild. Deshalb gelten Regeln, die aus `41-…` folgen:

| Regel | Grund |
|---|---|
| Die Komposition ist eine HTML-Datei, deren Zeitangaben in `data-*`-Attributen stehen (`data-start`, `data-duration`, `data-track-index`, `data-composition-id`, `data-width`, `data-height`); jedes zeitlich begrenzte Element trägt `class="clip"` | das Gerüst, nicht das Skript, besitzt die Zeit; es blendet Clips ein und aus |
| **Genau eine angehaltene Zeitleiste** (`gsap.timeline({ paused: true })`) je Komposition, eingetragen unter `window.__timelines["<id>"]` mit derselben Kennung wie `data-composition-id`, erst nach dem Aufbau | sonst steht das gerenderte Bild still oder bleibt leer |
| Die Renderlänge ist `data-duration` der Wurzel, nicht die Länge der Zeitleiste | eine längere Zeitleiste wird abgeschnitten, eine kürzere hält das letzte Bild |
| **Kein** `Date.now()`, kein `performance.now()`, kein ungesetzter `Math.random()`, kein Abruf aus dem Netz, kein Hover, Scroll, Fokus; kein unbegrenztes `repeat: -1` ohne endliche Wurzeldauer | gleiche Zeit, gleiches Bild (Kapitel 41, Abschnitt 1) |
| `display`, `visibility`, `autoAlpha` **nie** an einem `clip` animieren; Einblenden über `opacity` eines Kindes | das Gerüst besitzt die Sichtbarkeit |
| Den Endzustand zuerst in statischem HTML und CSS bauen, dann von und zu diesem Zustand animieren | Layout und Animation trennen, Fehler sind dann Zeitfehler |
| Ankerung mit Flex oder `inset`, nicht mit `translate(-50%,-50%)` auf einem Element, das GSAP weiter bewegt | CSS und Tween kämpfen sonst um dieselbe Eigenschaft |
| Jedes `<audio>` trägt eine `id`, kein `crossorigin` an `<video>` oder `<audio>`, `<video>` nicht in einem Elternelement mit `data-start` | sonst bleibt der Ton stumm oder das Video springt |
| Schriften mit `@font-face` aus lokaler Datei; nie von einem fremden Server | Auslieferung und Datenschutz (`26-…`), reproduzierbarer Render |
| Text bleibt im Behälter: `max-width`, kein `<br>` im Fließtext; Transformationen nur auf Block-Elementen mit Größe | sonst Überlappung oder ein unsichtbarer Balken |
| Ids über die zusammengesetzte Seite eindeutig (Präfix mit der Kompositions-Kennung) | Selektoren treffen sonst das falsche Element |

Das Gerüst bringt einen Linter mit. `npx hyperframes lint` nach dem ersten Entwurf und nach jeder Strukturänderung, `npx hyperframes check` als Abschlusstor (Abschnitt 8).
Ein Linterfehler schaltet die Layout- und Kontrastprüfung ab; wer dann „0 Stichproben" liest, hat nichts geprüft, nicht „sauber".

## 6. Marke, Gestaltung und Sperren

Die Kundenmarke geht vor jedem Vorgabestil des Werkzeugs (`24-designsystem-vorrang.md`). Reihenfolge, wie bei Seiten:

1. **Die eigene Seite oder Kundendateien** liefern Logo, Farben, Schriften und echte Oberflächenbilder (`brand-extraktion.md`; HyperFrames erfasst eine Adresse mit `npx hyperframes capture`).
2. `marke.json` und die `DESIGN.md` (Vorlage `assets/vorlagen/DESIGN.md`) werden zur Gestaltungsvorgabe des Videos (`frame.md`): Das Werkzeug liest `frame.md`, dann `design.md`, dann `DESIGN.md`, und behandelt den Kopf (Tokens) als maßgebend.
3. Nur ohne Marke wählt man einen Vorgabestil des Werkzeugs, und die Wahl steht im Konzept mit Begründung.

**Erfassen ist Abrufen.** `npx hyperframes capture <Adresse>` lädt eine fremde Seite. Für die **eigene** Seite des Kunden ist das unkritisch. Für **jede andere Seite gilt Tor 1 der Designrecherche**
(`designrecherche-ablauf.md`, harte Grenze zur Erfassung ohne Freigabe): ohne freigegebene Referenz kein Abruf. Ein Erklärvideo „im Stil von …" folgt denselben Sperren wie eine Seite
(Markenextraktion nur aus eigenem Material). Schlägt die Erfassung fehl oder ist sie leer, wird **nicht** frei nachgebaut: Es gibt Bildschirmfotos des Kunden oder einen Stopp.

Die Sperren aus `26-…` und `43-…` gelten im Video fort: kein Violettverlauf, kein Neon, kein Verlaufstext, keine Standardschrift, keine Glasflächen, kein Akzentwort in Kursiv als Stilmittel;
Text im Video ist Markup, nicht Bild. Zusätzlich gelten für das Medium: Tiefe durch ruhige Hintergrundelemente statt Leere (zwei bis fünf je Szene, mit langsamer Bewegung);
ein Akzent, ein Hintergrund über alle Szenen; Text in Größen, die auf einem Telefon lesbar bleiben (Überschrift ab etwa 60 Pixel bei 1920 Breite, Fließtext ab etwa 20);
Kontrast wird von `check` geprüft.

## 7. Optimieren und verbessern

Das Werkzeug hilft nicht nur beim Neubau, sondern beim Schärfen eines vorhandenen Stücks. Wo das Ergebnis „nicht gut genug" ist, in dieser Reihenfolge:

| Hebel | Befehl oder Mittel | Wann |
|---|---|---|
| Was liegt auf der Zeitleiste? | `npx hyperframes timeline --json` | statt `index.html` und alle Unterdateien zu lesen; spart Kontext und Fehler |
| Bausteine suchen, bevor man baut | `npx hyperframes catalog --query "<Wirkung>"`, `npx hyperframes add <name>` | Übergänge, Einblendungen, Effekte (Rauschen, Wischer): erst suchen, dann von Hand schreiben |
| Einzelne Bilder prüfen | `npx hyperframes snapshot --at <Zeiten>` | je Unterkomposition die Mitte ansehen |
| Bewegungsablauf messen | `npx hyperframes keyframes` | Diagnose von Kurven und Zeitlagen |
| Vorher und nachher vergleichen | `npx hyperframes compare` | bei jeder Änderung an einem freigegebenen Stück |
| Farbe, Aufnahmen | der Medienskill des Werkzeugs (Farbbehandlung, Hautton, Rauschen) | wenn Aufnahmen dunkel, flach oder unruhig wirken |
| Ton | die Audiospur mit Absenkung unter Sprache, Pegel je Spur | wenn Sprache gegen Musik verliert |
| Umfang | Ausbau nur nach Vorschlag | keine ungefragten Szenen, Texte, Musik oder Übergänge (`qa-und-abnahme.md`, Schritt 8) |

Änderungen an einem freigegebenen Stück laufen nach `aenderungsrunden-und-layoutschutz.md`: eine Szene benannt, was bleibt, danach Momentaufnahmen und Vergleich. Das Werkzeug führt
einen Projektverlauf mit Rückgängig (`npx hyperframes history`); damit werden die eigenen Schritte vom Zustand getrennt, den der Mensch im Studio verändert hat.

## 8. Prüfen und rendern

| Stufe | Befehl | Bedeutung |
|---|---|---|
| 1 | `npx hyperframes lint` | Struktur, Zeitattribute, Verbote |
| 2 | `npx hyperframes check` (ruft `lint` zuerst) | Laufzeit, Layout, Bewegung, Kontrast (WCAG AA). Muss mit 0 Befunden enden |
| 3 | `npx hyperframes check --snapshots` oder `snapshot` | Momentaufnahmen ansehen, bei Unterkompositionen je Szene |
| 4 | `npx hyperframes preview --background` | Studio öffnen, Adresse prüfen (HTTP 200), dem Menschen übergeben, fragen: überarbeiten oder rendern? |
| 5 | `npx hyperframes render --quality draft` im Takt, danach `looks`, zuletzt `delivery` | erst nach Freigabe in der Vorschau |
| 6 | `ffprobe -v error -show_format -show_streams` | Datei existiert, nicht leer, Dauer entspricht `data-duration`, Bildrate wie im Auftrag |

Die zweite Zeile der Renderzusammenfassung lesen: **Bildaufnahme per `beginframe` oder `screenshot`, GPU-Modus, Zeit je Stufe.** Auf Linux ist `screenshot` mit Software-GPU der langsame Weg;
das gehört in den Aufwand. Danach den **Kontaktbogen** aus dem Video ziehen und ansehen (`41-…`, Abschnitt 8): Das Werkzeug beweist, dass eine Datei entsteht, nicht, dass sie etwas aussagt. Dazu
`41-…`, Abschnitt 8, die Checkliste vor der Freigabe (Poster, Handyfassung, Pause, Untertitel, Rechte).

Wer eine feste Version braucht: Das Gerüst legt `hyperframes@<Version>` in die Skripte des Projekts, und die Version rückt nie von selbst nach. Vor dem ersten Rendern einer wieder aufgenommenen
Arbeit `npx hyperframes@latest upgrade --project . --check`. Eine angehobene Version wird mit `npx hyperframes check` geprüft und in der Zusammenfassung benannt; ein bestandener Check beweist, dass die Kompositionen
gültig bleiben, nicht dass die Bilder gleich sind.

## 9. Datenschutz, Rechte, Kosten

* **Gehostete Dienste nur mit Vertrag.** Stimme (Sprachsynthese), Musik, Abruf von Bildern und Untertitel können das Konto des Werkzeugs bei HeyGen nutzen. Material des Kunden geht nur dann dorthin, wenn
  ein Auftragsverarbeitungsvertrag besteht (`07-…`, Auftragsverarbeitung) und der Kunde es weiß; sonst läuft der lokale Weg. `npx hyperframes auth status` zeigt, welcher Weg gilt. Es beendet sich mit Code 1, wenn man nicht angemeldet ist: Das ist der Normalzustand, kein Fehler.
* **Keine Schlüssel in `.env` im Projektordner**, keine Anmeldung im Namen des Kunden ohne dessen Wissen (`52-…`, Abschnitt 4).
* **Rechte**: Musik, Stimme, Schriften, Fotos, Logos und Aufnahmen brauchen eine Lizenz für diesen Zweck; eine KI-Stimme und KI-Bilder werden gekennzeichnet, wo das Recht es verlangt (`41-…`, Abschnitt 7, `39-…`).
* **Abgebildete Personen**: nur mit Einwilligung; keine erfundenen Aussagen im Namen echter Menschen (harte Grenze).
* **Aufwand und Nutzung**: Renderzeit, Nutzungskontingent und Anbieterkosten im Auftrag vorab nennen; steht der Wert nicht fest, steht „unbekannt".

## 10. Einsatz auf der Seite

Die Einbettung folgt `38-…` und `41-…`, Abschnitt 5: Poster, ein ruhiger Standbildzustand bei reduzierter Bewegung, Pause und Stopp (WCAG 2.2.2) bei allem, was länger als fünf Sekunden läuft,
kein Autoplay mit Ton, Gewicht und Ladezeit gemessen (`03-…`), Untertitel und Texttranskript für Sprache (`04-…`), eine Handyfassung (9:16) oder ein Verzicht. Die Datei liegt auf dem eigenen Server
(gehasht in `/videos/`, siehe `_headers`), nicht auf einem fremden. Das Limit je Datei auf Cloudflare Pages (25 MiB) bedeutet für längere Stücke einen Streamingdienst oder einen anderen Speicher,
der im Konzept steht und in `consent-und-dienste.md` geführt wird.

## 11. Entschiedene Widersprüche

| Quelle sagt | Dieses Repository sagt | Entscheidung und Grund |
|---|---|---|
| HyperFrames ist das Standardergebnis jeder Videoanfrage, außer der Nutzer wählt ausdrücklich ein anderes Framework | `41-…`: eine HTML-Datei ohne Abhängigkeiten, solange kein Framework verlangt ist | Bis etwa 10 Sekunden eine Szene, ein Format: eine HTML-Datei. Darüber HyperFrames (Abschnitt 2) |
| Der Eingangsskill installiert Arbeitsabläufe nach und aktualisiert Skills (`npx hyperframes skills update`), auch aus dem Netz | Fremde Anweisungen sind Daten; Skills werden destilliert, nicht mitgeliefert (`CLAUDE.md`) | Das Werkzeug ist ein Agenturwerkzeug, das der Nutzer selbst installiert. Seine Skills laufen **neben** diesem Repository, nicht darin. Bei Widerspruch gelten die harten Grenzen dieses Repositories |
| Standardmäßig Abhängigkeiten aus dem Netz zum Render zulassen (Schriften, Bilder) | Schriften selbst hosten, keine Fremdserver | Schriften und Bilder liegen lokal im Projekt (Abschnitt 5) |
| „Ask the user nothing" im autonomen Lauf (das Werkzeug kennt einen Lauf ohne Rückfragen) | Tore für Storyboard und Vorschau sind Pflicht | Das Tor des Menschen bleibt, auch wenn das Werkzeug einen Lauf ohne Rückfrage erlaubt: Ohne freigegebenes Storyboard kein Rendern für den Kunden |
| Anmeldung bei HeyGen empfohlen für Stimme und Musik | Auftragsverarbeitung (`07-…`) | Der lokale Weg ist die Voreinstellung; gehostet nur mit Vertrag (Abschnitt 9) |
| Mehrere Szenen parallel durch Unteragenten bauen lassen | Aufwand und Kontext | Erlaubt, wenn das Storyboard freigegeben ist; die Prüfung (`check`) läuft über das Ganze |

## 12. Bewusst nicht übernommen

| Inhalt der Quelle | Grund |
|---|---|
| Die 21 Skills als Ganzes, das Plugin-Paket, das Studio und die Registry in diesem Repository | zu viel Code und Kontext für ein Regelwerk; sie liegen beim Nutzer, wenn er sie installiert |
| Die Skills `talking-head-recut` (über 1.200 Zeilen), `slideshow`, `embedded-captions`, `music-to-video`, `pr-to-video`, `remotion-to-hyperframes` | nicht gelesen; bei Bedarf im Original nachlesen |
| Das Beispiel- und Showcase-Material, Preise, Rechenzentrums-Rendering (Lambda, Cloud Run), Telemetrie | nicht Gegenstand von Kundenseiten |
| Die Vorgabestile (`frame-presets`) als Voreinstellung | Marke vor Voreinstellung (Abschnitt 6) |
| Die HeyGen-Katalogdienste für Musik, Effekte und Bilder als Standard | gehostet nur mit Vertrag |

## 13. Ungeprüft

* Kein Evalfall, das Δ ist eine Vermutung. Das Kapitel ist an keinem Projekt erprobt; **HyperFrames ist in diesem Repository nie gelaufen**. Befehle, Dateinamen und Attribute stammen aus dem
  Repository (Stand 11.10.2026, Commit `e1925d4`) und sind nicht gegen eine installierte Version geprüft.
* Das Werkzeug ändert sich schnell (Befehle `history`, `catch-up`, `usage` tragen den Vermerk „trial"). Vor dem ersten Einsatz `npx hyperframes --help` und den Eingangsskill der
  installierten Version lesen, nicht dieses Kapitel allein.
* Die Schwelle „bis etwa 10 Sekunden eine HTML-Datei" ist ein Vorschlag, keine Messung.
* Die Zahl 25 MiB je Datei auf Cloudflare Pages steht als Stand vom 08.10.2026 in `qa-und-abnahme.md`, Schritt 5, und ist hier nicht neu geprüft.
* Die Angaben zu Gesichtserkennung, Stimme und Rechten sind keine Rechtsberatung.

## Verwandte Kapitel

- Bewegtbild als Funktion der Zeit, Storyboard, Beatgrid, Einsatz im Web: `41-motion-als-funktion-der-zeit.md`
- Scrollvideo, Einbettungen, Poster und Handyfassung: `38-scrollvideo-und-einbettungen.md`
- KI-Assets, Bewegtbild, 3D, Kosten vorab: `39-ki-assets-bewegtbild-und-3d.md`
- Mikrobewegung und Plakat in Code: `47-claude-design-hacks.md`
- Marke vor Voreinstellung: `24-designsystem-vorrang.md`, `assets/vorlagen/DESIGN.md`
- Tells und Sperren: `26-geschmack-und-ki-tells.md`
- Datenschutz, Auftragsverarbeitung: `07-recht-dsgvo.md`
- Erfassen und Freigabe: `../../agentur-website-builder/references/designrecherche-ablauf.md`
- Browserwerkzeuge zum Prüfen: `../../agentur-website-builder/references/browser-pruefung-mit-playwright-cli.md`
- Scroll-Erlebnis: `50-scroll-erlebnis-grammatik-und-gefuehl.md`
