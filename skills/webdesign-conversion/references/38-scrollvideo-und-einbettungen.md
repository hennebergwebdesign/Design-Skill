# Scrollvideo, 3D Einbettungen und Szenen, Tiefe und Textur

`09-motion-gsap.md` (Abschnitt „Scrollgebundenes Video") und `18-motion-handschrift.md` regeln, wie scrollgebundene
Bewegung technisch sauber läuft. Dieses Kapitel ergänzt vier Dinge, die dort fehlen: **wann sich ein Scrollvideo überhaupt
lohnt**, ein Aufbauablauf von der Idee bis zur Prüfung, der **Blendfehler** zwischen Video und Seitenhintergrund und die Regeln
für **3D und Effekt Einbettungen** von Drittanbietern. Dazu zwei kleine Gestaltungsmittel: Tiefe durch Text hinter dem
Motiv und Körnung als Textur.

Quellen: Video „Give Me 9 Minutes & Make INSANE Website Animations" (06.08.2026) und „The ONLY 5 Tools You Need to
Build Insane Sites" (04.06.2026) von Self-Made Web Designer, dazu die Dokumentation der Bibliothek `scrolly-video`
(npm, am 07.10.2026 eingesehen). Übernommen sind Ablauf, Grenzen und Fehlerbilder, kein Text. Abgleich mit `09-motion-gsap.md`
beim Einpflegen: Beide Kapitel widersprechen sich nicht. Abschnitte 1a, 5a und 6a kommen aus dem Video „Opus 5.5:
Webdesign macht ENDLICH wieder Spaß" von Alex Sprogis (28.09.2026), Kritikpunkte aus Zuschauerkommentaren dazu
getrennt gekennzeichnet, Herkunft in `CREDITS.md`, Version 4.16. Kapitel 09 beschreibt die Eigenbauvariante
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

Dieselbe Frage gilt für eine eigene 3D-Szene (Abschnitt 5a). Als Ausgangspunkt nach Art des Auftrags:

| Auftrag | Ausgangspunkt | Grund |
|---|---|---|
| Marke, Produktlaunch, Kampagne, Event, digitales Produkt mit Erlebnisanspruch | Scrollerzählung oder 3D-Szene kommt in Frage, wenn es eine Erlebnisidee gibt (Abschnitt 1a) | die Seite ist selbst Teil des Produkts oder der Kampagne |
| Handwerk, Praxis, Gastronomie, lokale Dienstleistung | dezente Bewegung (Einblenden, Hover, ein orchestrierter Moment), keine 3D-Szene | der Besucher will Leistung, Ort und Kontakt, oft auf dem Handy und unterwegs |
| Unklar | ohne 3D bauen, die Erlebnisidee als Option im Konzept nennen | nachrüsten ist billiger als zurückbauen |

## 1a. Erlebnisidee vor Effekt

Ein Effekt auf einem Standardlayout bleibt ein Standardlayout mit Effekt. Was trägt, ist eine
Idee, die den Gegenstand erzählt: der Abend im Restaurant aus Sicht der Reservierungssoftware, der
Produktionsweg einer Agentur als Fabrik, ein Notizbuch, das sich beim Scrollen öffnet. Die
Erlebnisidee ist die Heldenidee aus `43-hierarchie-raster-komposition.md`, Abschnitt 6, auf die ganze
Seite ausgedehnt.

Vor dem Bau stehen im Konzept (Phase 3 im Bauablauf) **drei Ideen zur Wahl**, je mit:

| Feld | Inhalt |
|---|---|
| Idee | ein Satz, was der Besucher erlebt und was das mit dem Angebot zu tun hat |
| Ablauf | fünf Scrollstufen, je ein Satz, danach normale Sektionen mit Angebot und CTA |
| Technik | CSS, GSAP, eigene 3D-Szene oder Scrollvideo, mit Grund |
| Aufwand | grob, in Tagen |
| Risiko | Leistung auf schwachen Geräten, Barrierefreiheit, Inhalt, der nur in der Szene stünde |

Die gewählte Idee geht danach durch das Storyboard (Abschnitt 2a). Nach dem Erlebnis kommt die Seite
mit Angebot, Beleg und Anfrage. Ein Erlebnis ersetzt keine dieser Sektionen.

## 2. Das Prinzip

Das Video spielt nicht ab, es wird je nach Scrollposition vor und zurück gespult, wie ein Daumenkino. Rohes Video im
Browser spulen ruckelt, weil Browser auf Abspielen optimiert sind, nicht auf Springen. Die Bibliothek `scrolly-video` löst
das in drei Stufen (Angaben laut Dokumentation, vor dem Einbau erneut prüfen):

1. Chromium: alle Einzelbilder werden vorab dekodiert und auf eine Fläche gezeichnet (flüssig, braucht Anlaufzeit).
2. Fallback: Abspielgeschwindigkeit des Videos wird an die Scrollrichtung gekoppelt (rückwärts nicht möglich).
3. Fallback: Sprünge per Zeitstempel, das Video braucht dafür möglichst viele Schlüsselbilder (Encoding mit Schlüsselbild bei jedem Bild).

Version und Lizenz der Bibliothek sind hier `[[unbekannt]]` und werden vor dem Einbau auf der Paketseite geprüft. Laut Dokumentation wird die Funktion auf iOS im Energiesparmodus abgeschaltet. **Folge für uns:** Ein Poster und ein Text,
der ohne Video funktioniert, sind Pflicht, keine Kür. Inhalte stehen nie nur im Video.

## 2a. Storyboard vor jeder Scroll-Animation

Bevor Tokens und Zeit in die Animation fließen: erst statische Frames. Quelle ist ein Video zu
Motion Graphics mit Code (Jay E, RoboNuggets, 29.09.2026), das Storyboard und Feedback am Bild
beschreibt. Übertragen auf Webseiten:

| Schritt | Inhalt | Grund |
|---|---|---|
| 1 Frames | je Scroll-Stufe ein statischer Zustand der Sektion (Screenshot oder HTML ohne Bewegung), mit Kennung | Feedback bezieht sich auf einen Frame, nicht auf eine Erinnerung |
| 2 Beschreibung | je Frame ein Satz zur Bewegung zum nächsten (was bewegt sich, wie lange, mit welcher Kurve nach `30-motion-pruefung.md`) | Timing und Zweck werden vor dem Code abgestimmt |
| 3 Rückmeldung | Kommentare mit Frame-Kennung und Position (Annotation am Screenshot), gesammelt in einem Zug | ein Rutsch statt zehn Rückfragen, Ablauf in `kundenabstimmung.md` |
| 4 Umsetzung | erst nach Rückmeldung GSAP mit ScrollTrigger (`09-motion-gsap.md`), `prefers-reduced-motion` von Anfang an | die Bewegung ist teuer, die Frames sind billig |

Vorlage: `../assets/vorlagen/prompts/storyboard.md`. Der Autor des Videos nennt für das Video nach Storyboard 80 bis 90 Prozent Trefferquote. Das ist
seine Schätzung für Video, für Webseiten ungemessen.

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

## 5a. Eigene 3D-Szene mit Three.js

Eine Szene im eigenen Code statt einer Einbettung: Modelle, Kamera, Licht, gesteuert durch den
Scroll. Three.js baut die Szene, GSAP mit ScrollTrigger steuert den Ablauf (`09-motion-gsap.md`).
Three.js ist keine Standardabhängigkeit des Agenturstacks. Es kommt nur mit einer freigegebenen
Erlebnisidee (Abschnitt 1a) ins Projekt.

| Regel | Umsetzung | Grund |
|---|---|---|
| Schlanke Szene | stilisierte Formen mit wenigen Flächen (Low Poly), wenige Lichter, komprimierte Modelle (glTF mit Draco oder Meshopt), Texturen klein | läuft auf schwachen Geräten flüssig und lädt schnell |
| Spät laden | Poster als echtes Bild, `import('three')` erst bei Sichtbarkeit | die Bibliothek ist die größte Datei, die ein Agenturprojekt bekommen kann. LCP hängt nie an ihr |
| Inhalt im HTML | Überschriften, Texte, Preise und Knöpfe stehen als HTML über oder neben der Fläche, nie nur im `<canvas>` | Bildschirmleser, Suchmaschinen und KI-Crawler lesen keinen Canvas (`31-ki-sichtbarkeit-geo.md`) |
| Reduzierte Bewegung | bei `prefers-reduced-motion: reduce` keine Kamerafahrt und keine Dauerdrehung, ein Standbild der Szene | harte Grenze |
| Kein WebGL, schwaches Gerät | Prüfung auf WebGL, sonst Poster. Auf dem Handy eine vereinfachte Fassung oder das Poster | Inhalt bleibt erreichbar, Akku und Wärme bleiben im Rahmen |
| Tastatur | Interaktion in der Szene (anklickbare Objekte) hat ein HTML-Gegenstück, das per Tab erreichbar ist | harte Grenze, ein Canvas hat keinen Fokus |
| Pinning | gepinnte Strecke mit Ende, keine Fokusfalle, Scrollen bleibt nicht die einzige Navigation | Abschnitt 8 |
| Budget | Datenmenge und Bildrate im Konzept festgelegt, vor und nach dem Einbau gemessen | ein Zuschauerkommentar zum Quellvideo nennt Ruckeln und lange Ladezeiten auf dem Handy, das ist zu messen, nicht zu vermuten |

`scripts/pruefe-motion.mjs` prüft, was sich zählen lässt: `prefers-reduced-motion` im selben Modul wie
der Import von `three` (Fehler) und den statischen Import (Warnung). Ob die Szene flüssig läuft und
ob Inhalt nur im Canvas steht, wird angesehen und gemessen.

Wie die Kamerafahrten im Quellvideo entstanden sind (eigene Modelle, ein 3D-Programm, generiert), wird
dort nicht erklärt. Modelle, die ein Modell erzeugt, sind KI-Assets nach `39-ki-assets-bewegtbild-und-3d.md`.

## 6. Tiefe: Text hinter dem Motiv

Ein freigestelltes Motiv (Produkt, Büste, Objekt) liegt vor einem Teil der Überschrift. Das gibt Ebenen statt flacher Fläche.

| Regel | Grund |
|---|---|
| Motiv als Bild mit Transparenz (WebP oder AVIF mit Alphakanal) | scharfe Kanten ohne zusätzliche Maske |
| Überschrift bleibt echter HTML Text und lesbar, nur ein Teil wird verdeckt | Zugänglichkeit und Suchmaschine |
| Kontrast des sichtbaren Teils mindestens 4,5:1 | harte Grenze |
| Das Motiv bekommt einen `alt` Text oder `alt=""`, wenn es rein dekorativ ist | Screenreader |
| Das Motiv ist oft das größte Bild: Größe und `fetchpriority` bewusst setzen | LCP |

## 6a. Parallax über eine Tiefenkarte

Ein einzelnes Foto bekommt Tiefe: eine Tiefenkarte (Graustufenbild, hell ist nah, dunkel ist fern)
verschiebt die Bildteile je nach Zeiger oder Scroll unterschiedlich stark. Das wirkt räumlich, ohne
3D-Modell.

| Regel | Grund |
|---|---|
| Die Tiefenkarte wird erzeugt und **angesehen**, bevor die Animation gebaut wird | eine falsche Karte zeigt sich erst in Bewegung, als Riss oder Schliere |
| Kleine Ausschläge, wenige Pixel | große Verschiebungen reißen Kanten auf |
| Gesichter und Hände ausnehmen oder flach halten | Verzerrung an Menschen fällt sofort auf und wirkt unheimlich |
| Nur mit Zeigergerät oder Scroll, bei `prefers-reduced-motion: reduce` das ruhige Foto | harte Grenze, auf Touch ohne Zeiger sinnlos |
| Das Foto selbst bleibt das LCP-Bild, der Effekt lädt danach | die Tiefe ist Zugabe, nicht Inhalt |

Ist das Foto ein Beleg (Team, Projekt, Werkstatt), darf die Tiefe es nicht verändern. Ein generiertes
Bild als Tiefenmotiv bleibt Stimmung, nie Beleg (harte Grenze).

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
- Aus dem Video von Alex Sprogis (Abschnitte 1a, 5a, 6a): der Stack des Autors (Next.js, Supabase, Hostinger),
  die Consent-Lösung eines Sponsors (Agenturvorgabe ist der eigene Consent Banner), der Nachbau einer
  ausgezeichneten Seite als Übung (kein Kundenprojekt, harte Grenze zur Referenzfreigabe) und die Aussage, ein
  bestimmtes Modell beende den KI-Look (Momentaufnahme, ungemessen).

## Verwandte Kapitel

`03-technik-performance.md`, `09-motion-gsap.md`, `18-motion-handschrift.md`, `30-motion-pruefung.md`,
`37-stilrichtung-nach-kundensprache.md`, `39-ki-assets-bewegtbild-und-3d.md`, `43-hierarchie-raster-komposition.md`,
`31-ki-sichtbarkeit-geo.md`, `consent-und-dienste.md`.
