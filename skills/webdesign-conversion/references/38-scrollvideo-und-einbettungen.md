# Scrollvideo, 3D Einbettungen, Tiefe und Textur

`09-motion-gsap.md` (Abschnitt „Scrollgebundenes Video") und `18-motion-handschrift.md` regeln, wie scrollgebundene
Bewegung technisch sauber läuft. Dieses Kapitel ergänzt vier Dinge, die dort fehlen: **wann sich ein Scrollvideo überhaupt
lohnt**, ein Aufbauablauf von der Idee bis zur Prüfung, der **Blendfehler** zwischen Video und Seitenhintergrund und die Regeln
für **3D und Effekt Einbettungen** von Drittanbietern. Dazu zwei kleine Gestaltungsmittel: Tiefe durch Text hinter dem
Motiv und Körnung als Textur.

Quellen: Video „Give Me 9 Minutes & Make INSANE Website Animations" (06.08.2026) und „The ONLY 5 Tools You Need to
Build Insane Sites" (04.06.2026) von Self-Made Web Designer, dazu die Dokumentation der Bibliothek `scrolly-video`
(npm, am 07.10.2026 eingesehen). Übernommen sind Ablauf, Grenzen und Fehlerbilder, kein Text. Abgleich mit `09-motion-gsap.md`
beim Einpflegen: Beide Kapitel widersprechen sich nicht. Kapitel 09 beschreibt die Eigenbauvariante
(Video an `currentTime`, ein Schlüsselbild je Bild, Quelle erst nach `load`, drei Ebenen), dieses
Kapitel ergänzt Anlass, Blendfehler, Einbettungen und die Bibliotheksvariante mit demselben
Schlüsselbildrat. Die Regel zum Schlüsselbild steht bewusst nur in 09 voll ausgeführt.

## 1. Zuerst: lohnt sich ein Scrollvideo?

Ein Scrollvideo ist kein Stilmittel für jede Seite. Es erzählt Schritte (ein Produkt zerlegt sich, ein Gerät dreht sich),
und es kostet Datenvolumen, Aufwand und Barrierefreiheitsarbeit.

| Frage | Ja bedeutet | Nein bedeutet |
|---|---|---|
| Gibt es ein Produkt oder einen Vorgang, der sich in Schritten zeigen lässt? | Scrollvideo kommt in Frage | Dekoration, weglassen |
| Ist das Produkt physisch und soll räumlich erlebbar werden? | passt gut | bei abstrakten Angeboten (Software, Beratung) fehlt der Anker, der Effekt kann schaden |
| Gibt es Zeit, Budget und Messung für Performance? | machbar | statt Video: ein ruhiges Standbild plus eine CSS Bewegung nach `18-motion-handschrift.md` |
| Ist die Zielgruppe überwiegend mobil mit schwachen Geräten? | Poster als Hauptlösung, Video nur Desktop | Video auf allen Geräten prüfen |

Der Hinweis zur Passung kommt nicht vom Video selbst, sondern aus einem Zuschauerkommentar dazu; er ist plausibel, aber
**eine Einzelmeinung**, deshalb als Fragenliste und nicht als Verbot formuliert.

## 2. Das Prinzip

Das Video spielt nicht ab, es wird je nach Scrollposition vor und zurück gespult, wie ein Daumenkino. Rohes Video im
Browser spulen ruckelt, weil Browser auf Abspielen optimiert sind, nicht auf Springen. Die Bibliothek `scrolly-video` löst
das in drei Stufen (Angaben laut Dokumentation, vor dem Einbau erneut prüfen):

1. Chromium: alle Einzelbilder werden vorab dekodiert und auf eine Fläche gezeichnet (flüssig, braucht Anlaufzeit).
2. Fallback: Abspielgeschwindigkeit des Videos wird an die Scrollrichtung gekoppelt (rückwärts nicht möglich).
3. Fallback: Sprünge per Zeitstempel, das Video braucht dafür möglichst viele Schlüsselbilder (Encoding mit Schlüsselbild bei jedem Bild).

Version und Lizenz der Bibliothek sind hier `[[unbekannt]]` und werden vor dem Einbau auf der Paketseite geprüft. Laut Dokumentation wird die Funktion auf iOS im Energiesparmodus abgeschaltet. **Folge für uns:** Ein Poster und ein Text,
der ohne Video funktioniert, sind Pflicht, keine Kür. Inhalte stehen nie nur im Video.

## 3. Aufbauablauf

| Schritt | Ergebnis | Prüfung | Grund |
|---|---|---|---|
| 1 Design ohne Animation | Seite wirkt auch statisch hochwertig | Screenshot ohne Video abnehmen | Animation rettet kein schwaches Design |
| 2 Reduktion | höchstens zwei Schriften, eine Akzentfarbe, großzügige Abstände | Token Prüfung (`pruefe-tokens.mjs`) | ruhige Fläche macht das Video zum Ereignis |
| 3 Start und Endbild festlegen | zwei Einzelbilder, die den Anfang und das Ende der Bewegung zeigen | beide Bilder nebeneinander ansehen | das Video ergibt sich aus Anfang und Ende, Details in `39-ki-assets-bewegtbild-und-3d.md` |
| 4 Video erzeugen und kürzen | kurze, saubere mechanische Bewegung, die vorwärts und rückwärts einheitlich wirkt | Vorwärts und Rückwärts durchsehen | Rückwärtslauf entscheidet über Qualität |
| 5 Encoding | Schlüsselbild bei jedem Bild für die Fallback Stufe, Dateigröße im Konzept begrenzen | Dateigröße und Ladezeit messen | `scrolly-video` Fallback verlangt das; Größe ist der Preis |
| 6 Einbinden | Container mit Klasse, Bibliothek erst bei Sichtbarkeit laden, Poster bis dahin | Netzwerkansicht: nichts lädt vor dem Falz | Core Web Vitals (`03-technik-performance.md`) |
| 7 Blendfehler beheben | Videohintergrund und Seitenhintergrund verschmelzen | auf zwei Bildschirmen ansehen | Abschnitt 4 |
| 8 Prüfen | Tastatur, reduzierte Bewegung, mobil, Messung | Abschnitt 8 | harte Grenzen bleiben hart |

Code Bausteine: `../assets/vorlagen/scrollvideo/` (getrennte Schnipsel, nicht als fertiges Paket, mit eigener `README.md`).

## 4. Der Blendfehler

Auch wenn die KI den Hintergrund „gleich" erzeugt, rendert das Video leicht anders als der Seitenhintergrund, und
Bildschirme stellen Farben unterschiedlich dar. Auf einem schwächeren Gerät entsteht ein sichtbares Rechteck um das Motiv.

| Lösung | Aufwand | Wann |
|---|---|---|
| Rand des Videos per CSS Maske ausblenden (Verlauf) | gering | **zuerst**, in den meisten Fällen genug |
| Alle Einzelbilder exportieren, Hintergrund freistellen, Bildfolge statt Video | hoch | nur wenn die Maske nicht reicht oder das Motiv auf wechselndem Grund läuft |

Alternative ohne Nacharbeit: Seitenhintergrund in der Szene bewusst als Fläche mit Abstand zum Rand führen, damit der Rand
nie in sichtbaren Kontrast läuft. Der Weg per Maske steht in `../assets/vorlagen/scrollvideo/blend.css`.

## 5. Einbettungen von Drittanbietern (3D, Effektflächen)

Im Video werden zwei Werkzeuge genutzt: ein 3D Editor mit Einbettungscode (Objekt reagiert auf den Zeiger) und ein
Effektwerkzeug für bildbasierte Hintergründe (Wolken, Rauschen, Körnung). Beide liefern einen Einbettungscode, der in die
Seite kommt. Das ist schnell gebaut und teuer im Betrieb.

| Regel | Umsetzung | Grund |
|---|---|---|
| Nie im ersten Bildschirm ohne Poster | Poster als echtes Bild, Einbettung lädt nach Sichtbarkeit oder Nutzeraktion | Größte Inhaltsdarstellung (LCP) darf nicht an einem Drittskript hängen |
| Platz reservieren | feste Höhe oder `aspect-ratio` | sonst springt das Layout (CLS) |
| Nach dem `load` Ereignis einhängen | `IntersectionObserver`, siehe `../assets/vorlagen/scrollvideo/lazy-embed.js` | passt zu `03-technik-performance.md` |
| Zeiger Folgen nur bei Zeigergeräten | `(hover: hover) and (pointer: fine)` | auf Touch sinnlos und teuer |
| Reduzierte Bewegung | Einbettung statisch lassen oder durch Poster ersetzen | `prefers-reduced-motion` ist hart |
| Datenschutz prüfen | Drittanbieter, der Daten laden kann, gehört in die Consent Logik (`consent-und-dienste.md`) | siehe Abschnitt „Recht" unten |
| Messen statt vermuten | vor und nach Einbau Lighthouse und `pruefe-breakpoints.mjs` | ein Zuschauerkommentar zum Video warnt vor spürbar schlechterer Performance, das ist unbelegt und genau deshalb zu messen |

**Recht:** Ob eine eingebettete Fläche personenbezogene Daten überträgt (zum Beispiel die IP Adresse an einen Drittserver),
hängt vom Anbieter und der Einbindung ab. Das ist im Einzelfall zu prüfen. Arbeitsdokument, keine Rechtsberatung.
Eigene Auslieferung der Datei (Export als Datei statt Einbettung per Drittserver), wenn der Anbieter das erlaubt, senkt
Risiko und Ladezeit; das ist eine Prüffrage, keine Zusage.

**Performance Budget:** Im Video steht kein Wert. Ein Budget wird je Projekt im Konzept festgelegt (Tor 1) und gegen die
bestehenden Ziele aus `03-technik-performance.md` (LCP unter 2,5 s, INP unter 200 ms, CLS unter 0,1) gemessen.

## 6. Tiefe: Text hinter dem Motiv

Ein freigestelltes Motiv (Produkt, Büste, Objekt) liegt vor einem Teil der Überschrift. Das gibt Ebenen statt flacher Fläche.

| Regel | Grund |
|---|---|
| Motiv als Bild mit Transparenz (WebP oder AVIF mit Alphakanal) | scharfe Kanten ohne zusätzliche Maske |
| Überschrift bleibt echter HTML Text und lesbar, nur ein Teil wird verdeckt | Zugänglichkeit und Suchmaschine |
| Kontrast des sichtbaren Teils mindestens 4,5:1 | harte Grenze |
| Das Motiv bekommt einen `alt` Text oder `alt=""`, wenn es rein dekorativ ist | Screenreader |
| Das Motiv ist oft das größte Bild: Größe und `fetchpriority` bewusst setzen | LCP |

## 7. Textur: Körnung

Eine leichte Körnung schließt die Lücke zwischen digitaler Fläche und Materialwelt. Sie ist Textur, kein Effekt.

| Regel | Grund |
|---|---|
| als Token führen (zum Beispiel `--textur-korn` für die Deckkraft) | alle Werte laufen über Tokens (`10-visuelle-richtung.md`) |
| Overlay über der Seite mit `pointer-events: none` | blockiert sonst Klicks |
| keine Animation der Körnung | Dauerbewegung kostet Akku und stört beim Lesen |
| Kontrast nach dem Einbau erneut messen | Körnung verringert Kontrast leicht, `pruefe-kontrast.mjs` prüft nur Tokenpaare, nicht Overlays |

Baustein: `../assets/vorlagen/scrollvideo/korn.css`.

## 8. Prüfung

| Prüfpunkt | Sollwert | Grund |
|---|---|---|
| Poster und Text ohne Video verständlich | ja | iOS Energiesparmodus, schwache Geräte, Datenspar |
| `prefers-reduced-motion: reduce` | kein Scrubbing, Poster oder Standbild | harte Grenze |
| Tastaturbedienung | Scrollen ist nicht die einzige Navigation, keine Fokusfalle in gepinnten Bereichen | harte Grenze |
| Nichts lädt vor dem Falz außer dem Poster | Netzwerkansicht | LCP |
| Blendfehler | auf zwei Bildschirmen kein sichtbares Rechteck | Abschnitt 4 |
| Datenmenge | im Konzept festgelegt, im Test eingehalten | Messung statt Vermutung |

Was sich zählen lässt, prüft `scripts/pruefe-motion.mjs` im Quelltext: Behandlung von
`prefers-reduced-motion` im selben Modul, Poster mit `width` und `height`, Überschrift als
HTML-Text in der Sektion, dynamischer Import statt statischem Laden, und bei jeder Einbettung eine
reservierte Größe. Die tatsächliche Verschiebung misst `scripts/pruefe-breakpoints.mjs`. Ob die
Datenmenge im Budget bleibt und ob der Blendfehler sichtbar ist, wird gemessen und angesehen,
nicht gezählt. Ein Evalfall (`scrollvideo-nur-mit-anlass`) prüft, ob das Modell den Anlass
hinterfragt, bevor es ein Scrollvideo baut.

## 9. Nicht übernommen (mit Grund)

- Einbindung über einen bestimmten Baukasten: Stack ist fest (Astro auf Cloudflare Pages).
- Die Namen der Werkzeuge als Empfehlung: Die Regeln sind werkzeugneutral, Namen stehen im Quellenverzeichnis des Pakets.
- Die Aussage „das kann jeder in einem Nachmittag": nicht überprüft, Aufwand ist projektabhängig (Zeit: `[[unbekannt]]`).
- Fester Prozentwert oder Dateigrößenwert: im Video nicht genannt, nicht erfunden.

## Verwandte Kapitel

`03-technik-performance.md`, `09-motion-gsap.md`, `18-motion-handschrift.md`, `30-motion-pruefung.md`,
`37-stilrichtung-nach-kundensprache.md`, `39-ki-assets-bewegtbild-und-3d.md`, `consent-und-dienste.md`.
