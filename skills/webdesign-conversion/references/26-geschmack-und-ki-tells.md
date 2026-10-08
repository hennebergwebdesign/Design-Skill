# Geschmacksregeln und KI-Tells

`10-visuelle-richtung.md` entscheidet die Richtung: Palette, Schrift, Layoutidee, Tokens.
Dieses Kapitel ist die Disziplin beim Bauen danach. Es sammelt die Muster, an denen man eine
maschinell gebaute Seite erkennt, obwohl die Richtung stimmt, und macht die zählbaren davon
prüfbar.

Die Substanz stammt aus [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT), dort aus
Produktionstests mit generierten Landingpages. Sie ist hier nicht übersetzt, sondern auf
Unternehmensseiten im DACH-Raum, auf Astro und auf die harten Grenzen dieses Skills
übertragen. Wo taste-skill und dieses Regelwerk sich widersprechen, gilt dieses Regelwerk; die
Stellen stehen mit Grund am Ende des Kapitels.

**Rangfolge:** Ein geliefertes Kundendesignsystem und die harten Grenzen aus `SKILL.md` gehen
jeder Regel hier vor, siehe `24-designsystem-vorrang.md`. Eine Regel hier ist eine
Voreinstellung gegen die Voreinstellung, keine Vorschrift gegen den Kunden.

## 1. Die Lesart vor dem Plan

Die meisten schlechten Entwürfe entstehen nicht aus schlechtem Geschmack, sondern weil vor der
ersten Entscheidung niemand gelesen hat, wofür die Seite ist. Deshalb steht vor Durchgang 1
aus `10-visuelle-richtung.md` ein Satz:

> **Ich lese das als:** ‹Seitentyp› für ‹Zielgruppe›, in einer ‹Stimmung›-Sprache, mit
> Tendenz zu ‹Richtung aus 10 oder Designsystem des Kunden›.

| Beispiel | Lesart |
|---|---|
| Dachdecker, Gewerbekunden | Homepage für Facility-Manager und Betriebsleiter, in einer sachlich-handwerklichen Sprache, mit Tendenz zu Industriell und klaren Rastern |
| Kinderarztpraxis | Homepage für Eltern unter Zeitdruck, in einer ruhigen, freundlichen Sprache, mit Tendenz zu Clean/Contemporary, barrierearm zuerst |
| Messtechnik-Hersteller mit Designsystem | Produktseite für Einkauf und Entwicklung, in der Sprache des gelieferten Designsystems, Stufe 1 nach `24-designsystem-vorrang.md` |
| Recruiting-Funnel Pflege | Funnel für Pflegefachkräfte am Handy, in einer direkten, wertschätzenden Sprache, mit Tendenz zu großen Flächen und wenig Text |

Woraus die Lesart entsteht, in dieser Reihenfolge:

| Signal | Frage |
|---|---|
| Seitentyp | Homepage, Landingpage oder Recruiting-Funnel? Das Playbook entscheidet mit |
| Zielgruppe | Wer entscheidet, wer liest, auf welchem Gerät? Die Zielgruppe wählt die Ästhetik, nicht der eigene Geschmack |
| Vorhandene Marke | Logo, Farbe, Schrift, Bildsprache. Bei einem Relaunch Ausgangsmaterial, nicht Option, siehe `20-markenextraktion-bestandsseite.md` |
| Stimmungswörter im Brief | „ruhig", „hochwertig", „mutig", „wie Apple", „nicht zu verspielt" |
| Referenzsignale | genannte Seiten, Screenshots, Wettbewerber |
| Stille Randbedingungen | öffentliche Hand, Gesundheit, ältere Zielgruppe, BFSG-Pflicht, regulierte Branche. **Sie schlagen jede Stilvorliebe** |

**Nachfragen nur, wenn die Lesart wirklich auseinanderläuft**, und dann genau eine Frage:
„Soll das eher nach ruhigem Industriebetrieb oder nach mutiger Handwerksmarke aussehen?" Lässt
sich die Lesart begründet ableiten, wird sie hingeschrieben und angewendet, nicht zur
Abstimmung gestellt. Dieselbe Lehre wie in `../playbooks/landingpage.md`: anwenden, in einem Satz
begründen, nicht um Erlaubnis fragen.

Die Lesart steht danach in `marke.json` unter `gestaltung.lesart`. Sonst liest die nächste
Sitzung die Seite neu und anders.

## 2. Drei Regler

Nach der Lesart werden drei Werte gesetzt, jeweils von 1 bis 10. Sie machen die Absicht
vergleichbar und verhindern, dass eine Sektion verspielt und die nächste streng wird.

| Regler | 1 bis 3 | 4 bis 7 | 8 bis 10 |
|---|---|---|---|
| **Varianz** | symmetrisch, gleiche Spalten, zentriert | versetzte Überlappungen, gemischte Bildformate, links gesetzte Köpfe über ruhigen Rastern | asymmetrische Raster (`2fr 1fr 1fr`), große Leerflächen, Masonry |
| **Bewegung** | keine selbstlaufende Bewegung, nur Zustände bei Hover und Fokus | CSS-Übergänge und gestaffelte Einblendungen über die Motion-Tokens | orchestrierte Scrollsequenzen, Pinning, Parallaxe mit GSAP |
| **Dichte** | Galerie: sehr viel Luft, oberes Ende von `--raum-sektion` | normale Unternehmensseite | Cockpit: eng, Linien statt Karten, Ziffern in Tabellenziffern |

Ausgangswerte für die Kundentypen der Agentur. Sie sind aus den Voreinstellungen von
taste-skill übertragen und **nicht gemessen**. Die Lesart darf jeden davon verschieben, mit
Begründung.

| Kundentyp | Varianz | Bewegung | Dichte |
|---|---|---|---|
| Handwerk, lokaler Dienstleister | 5 | 4 | 4 |
| Praxis, Gesundheit, Pflege | 3 | 3 | 4 |
| B2B Industrie und Technik | 5 | 4 | 5 |
| Kanzlei, Steuerberatung, Beratung | 4 | 3 | 4 |
| Agentur, Studio, Kreativwirtschaft | 8 | 7 | 3 |
| Premiumprodukt, Manufaktur | 7 | 5 | 3 |
| Recruiting-Funnel | 4 | 4 | 3 |
| Öffentliche Hand, Verband | 3 | 2 | 5 |
| Relaunch, Marke bewahren | wie Bestand | Bestand + 1 | wie Bestand |
| Relaunch, neue Bildsprache | Bestand + 2 | Bestand + 2 | wie Bestand |

**Was die Regler auslösen:**

- **Varianz ab 4 fällt mobil auf eine Spalte zurück.** Jede Asymmetrie wird unter der
  Umschaltbreite zu einem sauberen Stapel, festgelegt in derselben Komponente, nicht „das
  regelt das Raster schon". Wie, steht in `16-responsive-container.md`.
- **Bewegung behauptet heißt Bewegung gezeigt.** Steht der Regler über 4, bewegt sich die
  Seite auch: Einstieg im Heldenbereich, Einblenden an den Schlüsselstellen, Rückmeldung an
  den Handlungsaufforderungen. Lässt sich das im Rahmen nicht sauber bauen, wird der Regler
  auf 3 gesetzt und eine ruhige Seite geliefert. Halb gebaute Bewegung (abgeschnittene
  ScrollTrigger, springende Einstiege, fehlendes Aufräumen) ist schlechter als keine.
- **Bewegung über 3 heißt `prefers-reduced-motion` für alles.** Das ist ohnehin harte
  Grenze, hier nur die Kopplung: je höher der Regler, desto mehr muss die gestufte Fassung
  aus `18-motion-handschrift.md` tragen.
- **Bewegung und `motion.profil` gehören zusammen.** Regler 1 bis 3 passt zu
  `zurueckhaltend`, 4 bis 7 zu `praezise` oder `weich`, erst 8 bis 10 zu `verspielt`.
- **Dichte steuert Rhythmus, nicht Schriftgröße.** Sie wählt das obere oder untere Ende der
  Raumtokens aus `15-spacing-rhythmus.md`. Ab Dichte 8 gibt es keine Kartenkästen mehr,
  Linien trennen, Zahlen stehen in `font-variant-numeric: tabular-nums`.

Die drei Werte stehen in `marke.json` unter `gestaltung.regler`, jeder mit einem Satz
Begründung.

## 3. Drei Sperren

Drei Entscheidungen werden einmal getroffen und gelten dann für die ganze Seite. Genau hier
kippen generierte Seiten nach der dritten Sektion.

| Sperre | Regel | Der typische Bruch |
|---|---|---|
| **Akzent** | ein Akzent, auf der ganzen Seite derselbe | warmgraue Seite, und in Sektion sieben ist der Button plötzlich blau |
| **Form** | ein Radiussystem: alles kantig, alles weich oder Pille nur für Bedienelemente. Mischformen nur als dokumentierte Regel („Buttons Pille, Karten 16 px, Felder 8 px"), die dann überall gilt | runde Buttons in einem kantigen Layout |
| **Thema** | ein Thema je Seite, hell oder dunkel | eine einzelne dunkle Insel mitten in einer hellen Seite, die aussieht wie aus einer anderen Seite kopiert |

**Zur Themasperre und `21-sektionshintergruende-hierarchie.md`:** Flächenwechsel zwischen
Sektionen sind dort ausdrücklich gewollt. Kein Widerspruch: Abstufungen derselben Familie
(`flaeche`, `flaeche_alt`) sind Rhythmus. Eine dunkle Sektion ist erlaubt, wenn sie eine
feste Rolle im Tokenplan hat (`flaeche_dunkel`) und diese Rolle wiederkehrt, zum Beispiel
immer beim Abschlussaufruf oder immer beim einen Custom-Abschnitt. Der Tell ist die
**zufällige** Umkehr, nicht die geplante.

**Verschachtelte Radien:** Liegt eine Fläche mit Radius in einer anderen, ist der innere
Radius der äußere minus der Innenabstand dazwischen. Sonst laufen die Kurven nicht parallel,
und genau das sieht billig aus:

```css
.rahmen       { border-radius: var(--radius-l); padding: var(--raum-2); }
.rahmen > *   { border-radius: calc(var(--radius-l) - var(--raum-2)); }
```

## 4. Heldenbereich

Die Höhe ist harte Grenze (`100svh`, siehe `SKILL.md`). Hier geht es darum, was hineingehört.

| Element | Regel | Grund |
|---|---|---|
| Überschrift | höchstens zwei Zeilen auf Desktop | eine vierzeilige Heldenüberschrift ist immer ein Schriftgrößenfehler, nie ein Textlängenfehler. Erst die Größe senken oder den Container verbreitern, dann kürzen |
| Unterzeile | höchstens 20 Wörter und vier Zeilen | passt das Versprechen nicht in 20 Wörter, ist es unklar, nicht die Regel zu eng |
| Textelemente | höchstens vier: Kicker **oder** Markenzeile **oder** nichts, Überschrift, Unterzeile, Handlungsaufforderungen | der Held ist ein Moment, keine Leistungsliste |
| Handlungsaufforderungen | eine primäre, höchstens eine sekundäre | zwei gleich starke Knöpfe teilen die Aufmerksamkeit |
| Vertrauen | **genau ein** belegter Beweis darf im Held stehen, zum Beispiel die Google-Bewertung mit Quelle | `02-design-ux.md` verlangt Vertrauen über der Falz; eine Leiste aus Mikrotext, Preisteaser und Avatarreihe verlangt es nicht |
| Logowand | eigene Sektion direkt unter dem Held, nie in derselben Zeile wie die Heldencopy | der Held trägt Versprechen und Aufforderung, die Logowand trägt den Beweis |
| Oberer Innenabstand | begrenzt, der Inhalt schwebt nicht auf halber Höhe | braucht der Held mehr Luft, wird die Schrift oder das Bild größer, nicht der Abstand |

**Nicht in den Held:** Zeile unter den Knöpfen („Funktioniert mit allen gängigen …"),
Preisteaser, Featureliste, Avatarreihe, Versionslabel wie „Beta" oder „Neu 2026" ohne echten
Anlass.

**Die Gewohnheitsfrage vor jedem Held:** Baue ich Text links und Bild rechts, weil es passt,
oder aus Gewohnheit? Es ist die häufigste Aufteilung überhaupt. Alternativen: Text unten links
über dem Vollbild, gestapelt mittig über einem Motiv, das Bild als Fläche mit Text in einem
Freiraum, eine sehr kleine, sehr ruhige Überschrift auf viel Leere. Maßstab für die
Lesereihenfolge ist die Hierarchie aus `02-design-ux.md` (Schritt 2.2): Das F-Muster beschreibt
ein Fehlverhalten auf unstrukturierten Seiten und wird durch Struktur verhindert, nicht als
Layoutvorlage benutzt. Die Bildposition bleibt davon unberührt.

## 5. Sektionsfolge und Layoutfamilien

| Regel | Maß | Geprüft |
|---|---|---|
| **Layoutfamilie** | jede Familie (Text neben Bild, Kartenraster, Vollbreitenzitat, Bento, Liste, Zeitleiste, Galerie, Laufband, Vollbild, Formular) höchstens einmal je Seite; bei acht Sektionen mindestens vier verschiedene | angesehen |
| **Zickzack** | höchstens zwei Text-neben-Bild-Sektionen hintereinander, die dritte bricht das Muster | angesehen |
| **Kicker** | höchstens einer je drei Sektionen, der Held zählt mit; nach einem Kicker bleiben zwei Sektionen ohne | `pruefe-geschmack.mjs` |
| **Laufband** | höchstens eines je Seite, dort wo die Menge die Aussage ist | `pruefe-geschmack.mjs` |
| **Sektionskopf** | eine Aussage: Überschrift, darunter der Text. Links groß und rechts ein kleiner Erklärtext nur, wenn rechts etwas Eigenes steht (Bild, Bedienelement) | angesehen |
| **Bento** | genau so viele Zellen wie Inhalte, keine leere Zelle. Drei bis fünf gut gebaute Zellen schlagen acht beliebige. Mindestens zwei bis drei Zellen mit echtem Bild oder eigener Fläche, nicht Text auf Weiß in Weiß | angesehen |
| **Lange Listen** | ab sechs Einträgen ein anderes Bauteil: gruppiert in zwei, drei Blöcke, Karte je Eintrag, Reiter oder Akkordeon, waagerecht scrollbare Reihe | angesehen |
| **Datenblatt** | nicht zehn Zeilen mit Haarlinie unter jeder. Gruppieren, oder drei bis vier Kernwerte groß und der Rest hinter „Alle technischen Daten" | angesehen |
| **Navigation** | ab 1024 px in einer Zeile, Höhe 64 bis 72 px, höchstens 80 px | Screenshot aus `pruefe-breakpoints.mjs` ansehen |

Die drei gleich breiten Karten nebeneinander als Leistungszeile bleiben das bekannteste
Einzelmuster. Wenn drei Leistungen, dann in einer Form, die zeigt, welche die wichtigste ist:
eine große und zwei kleine, zwei Spalten mit Bild, oder ein Stapel mit echter Reihenfolge.

**Bento sauber schließen:** `grid-auto-flow: dense` füllt Lücken, ersetzt aber nicht die
Rechnung. Spalten- und Zeilenspannen vor dem Bauen addieren, je Umschaltbreite. Eine leere
Zelle am Ende heißt: falsch geplant, nicht „ein Platzhalter passt da noch hin".

## 6. Inhaltsdichte und Copy

| Regel | Maß |
|---|---|
| Sektion als Voreinstellung | Überschrift bis acht Wörter, Absatz bis 25 Wörter, ein Bild **oder** eine Aufforderung. Mehr muss die Aufgabe der Sektion begründen |
| Eine Absicht, ein Text | „Jetzt anfragen", „Kontakt aufnehmen", „Schreiben Sie uns", „Termin vereinbaren" sind dieselbe Absicht. Ein Text dafür, in Kopf, Held und Fuß gleich, steht in `marke.json` unter `sprache.cta_primaer`. Geprüft von `pruefe-geschmack.mjs` |
| Aufforderung bricht nie um | auf Desktop einzeilig. Lieber kürzen (bis drei Wörter, Verb vorn) als den Knopf schmal zwingen |
| Ein Register je Seite | nicht technisches Kürzel, Feuilleton und Werbesprech in derselben Komposition |
| Zitate | höchstens drei Zeilen, Name plus Rolle, typografische Anführungszeichen „…". Nur echte Zitate mit Freigabe, siehe harte Grenze |
| Für Besucher oder für uns? | zu jeder Sektion die Frage, ob sie dem Besucher bei seiner Entscheidung hilft oder dem Betrieb gefällt (Gründungsgeschichte vor dem Angebot, Teamfoto vor der Leistung, Auszeichnung ohne Bezug). Eine Sektion für „uns" rückt nach unten oder kürzt sich auf einen Satz. Die Fragen, die ein Besucher auf der Startseite zuerst hat („Bin ich hier richtig?" und „Was soll ich als Nächstes tun?"), beantwortet der Held, bevor irgendeine „uns" Sektion beginnt |
| Selbstprüfung | jeden sichtbaren Text einmal lesen: grammatisch schief, unklarer Bezug, bemühtes Wortspiel, gespielte Bescheidenheit? Dann durch einen schlichten, funktionalen Satz ersetzen. Generierte „kluge" Copy ist schlechter als langweilige |

**Poetische Etiketten sind derselbe Tell wie im Englischen.** „Aus der Werkstatt", „Notizen
vom Feld", „Gerade auf dem Tisch", „Leise im Einsatz bei", „Handverlesen" über Kundenstimmen
oder Neuigkeiten klingen nach gespieltem Handwerk. Schlicht benennen: „Kundenstimmen",
„Aktuelles", „Kunden", oder das Etikett weglassen.

**Schrittlabels sind der Inhalt, nicht die Nummer.** Nicht „Schritt 1, Schritt 2, Schritt 3",
sondern das Verb: „Anfragen", „Aufmaß", „Einbau". Nummern bleiben erlaubt, wo es wirklich
eine Reihenfolge gibt (`02-design-ux.md`), aber als Ordnung neben dem Verb, nicht an seiner
Stelle.

Die Prüfung auf Floskeln, Nominalstil und leere Superlative macht weiterhin
`scripts/deslop-check.mjs`, die Handwerkslehre steht in `12-copywriting.md`.

## 7. Katalog der Produktionstells

Muster, die in Tests mit generierten Seiten immer wieder auftauchten, auch wenn die Regel
danebenstand. Jedes ist für einen bestimmten Auftrag richtig; als Voreinstellung ist es ein
Befund.

| Tell | Beispiel | Stattdessen | Geprüft |
|---|---|---|---|
| Nummer statt Thema im Kicker | „00 / Index", „001 · Leistungen" | das Thema in Klartext oder nichts | `pruefe-geschmack.mjs` |
| Zählung auf Bildern und Kacheln | „01 / 04" | weglassen, außer bei einer bedienbaren Bildfolge | `pruefe-geschmack.mjs` |
| Scrollhinweis | „Scrollen ↓", „Mehr entdecken", animierte Maus | angeschnittene Kante der nächsten Sektion, siehe `02-design-ux.md` | `pruefe-geschmack.mjs` |
| Orts-, Zeit- und Wetterleiste | „Hannover 14:23 · 18 °C" | die Adresse im Fuß reicht. Nur bei echtem Ortsbezug (Hotel, Veranstaltungsort) | angesehen |
| Zierpunkt vor jedem Eintrag | farbiger Punkt vor jedem Menüpunkt, jeder Zeile, jedem Badge | nur bei echtem Zustand (geöffnet, verfügbar), einmal je Sektion. Ein Punkt als bewusstes Markenelement am Kicker (`12-copywriting.md`) ist eine Entscheidung, ein Punkt vor allem ist Deko | angesehen |
| Mittelpunktketten | „Beratung · Planung · Montage · Service" | höchstens ein Mittelpunkt je Zeile, sonst Zeilen, Spalten oder Linien | angesehen |
| Etiketten auf Fotos | „Projekt · 02" als Pille über dem Bild | das Bild allein, oder eine Bildunterschrift darunter | angesehen |
| Zier-Bildunterschrift | „Studie Nr. 12 · Fotografin M." unter einem Archivbild | nur echte Fotonachweise mit Recht; sonst eine funktionale Unterschrift oder keine | angesehen |
| Zierleiste unten im Held | „PLANUNG. BAU. SERVICE." in Versalien quer über den Boden | streichen, außer sie trägt echte Links | angesehen |
| Schwebender Erklärtext oben rechts | kleiner Absatz ohne Bezug in der Ecke des Sektionskopfs | unter die Überschrift, oder ein sauberer Zweispalter | angesehen |
| Haarlinie über und unter jeder Zeile | Liste mit `border-top` und `border-bottom` je Eintrag | eine Linie zwischen Einträgen oder eine über der Gruppe | angesehen |
| Balken mit gefüllter Spur als Vergleich | grauer Balken, halb gefüllt, „Kundenzufriedenheit" | Zahl mit Quelle; wenn Balken, dann ohne Hintergrundspur | angesehen |
| Oberflächenattrappe aus Kästen | nachgebautes Dashboard, Terminal oder Fenster mit drei Punkten aus `div` | echter Screenshot, echtes Bauteil in klein, Foto, oder gar keine Vorschau | angesehen |
| Umbruch plus Kursiv als Manier | „seit dreißig<br>*Jahren.*" | die Überschrift liest sich zuerst normal | angesehen |
| Senkrecht gedrehter Text | „Referenzen 2018 bis 2026" um 90° gedreht am Rand | nur bei ausdrücklich experimenteller Richtung | angesehen |
| Deko-Raster und Fadenkreuze | Linien, die nichts ordnen | Linien nur dort, wo sie Inhalt gliedern | angesehen |
| Eigener Mauszeiger | `cursor: none` plus Kreis, der der Maus folgt | Systemzeiger | `pruefe-geschmack.mjs` |
| Glühen und Verlaufstext | Neonschein um Knöpfe, Verlauf in großen Überschriften | getönter Schatten, Farbe aus der Rolle | angesehen |
| Mikro-Metasatz unter dem Kicker | „Jede dieser Leistungen bieten wir heute an, nicht erst morgen." | Kicker, Überschrift, Text reichen | angesehen |
| Pille über der Überschrift | gerundetes Badge „Neu" oder „Ihr Partner in Karlsruhe" über der H1 | streichen. Die Pille ist ein Kicker in anderer Form und zählt in der Kicker-Quote mit | `pruefe-geschmack.mjs` |
| Kreis-Icon mit Haarlinie | dünn gezeichnetes Icon in einem runden Rahmen, dazu dünne Ziffern in Kreisen | Icon aus dem eigenen Set mit der Strichstärke aus `marke.json` (`17-icons-eigenes-system.md`), Schritte mit Verb statt Kreisnummer | angesehen |
| Dünner Fließtext | Fließtext oder FAQ-Antworten in einem Schnitt unter 400, kleiner als die Absätze darüber | Fließtext ab Schnitt 400, FAQ-Antworten in der Größe des Fließtexts | angesehen |
| Alles in der Textspalte | Karten, Bilder und Belege in derselben schmalen Spalte wie der Fließtext, die Seite wirkt geschrumpft | Rahmen `--breite-inhalt` für Raster und Bilder, `--breite-text` nur für Fließtext (`45-huerde-laenge-und-leserfuehrung.md`, Abschnitt 10) | Screenshot aus `pruefe-breakpoints.mjs` ansehen |
| Generiertes Logo | ein Bildmodell erzeugt ein Signet als Platzhalter, und es bleibt stehen | Logo vom Kunden oder `[[FEHLT: Logo]]`. Ein generiertes Logo ist weder Marke noch geklärtes Recht (`39-ki-assets-bewegtbild-und-3d.md`) | angesehen |

Dazu die Muster, die schon in `10-visuelle-richtung.md` und `02-design-ux.md` stehen und hier
nicht wiederholt werden: Cremegrund mit Serife und Terrakotta, Neon auf Fast-Schwarz,
Schablonen-Chrome, „→" hinter jedem Link.

## 8. Typografie und Farbe: die zwei häufigsten Griffe

### Der Serifenreflex

„Kreativ, hochwertig, editorial, also Serife" ist der am häufigsten beobachtete Tell. Eine
Serife ist richtig, wenn der Brief oder die Marke sie nennt, oder wenn der Gegenstand sie
begründet (Kanzlei mit Tradition, Verlag, Manufaktur mit Geschichte) und sich in einem Satz
sagen lässt, warum genau diese Serife zu genau dieser Marke passt. Für Agentur, Studio,
Premiumprodukt oder Portfolio ist eine starke Groteske die Voreinstellung, nicht die
Verlegenheit.

- **Fraunces und Instrument Serif** sind die zwei Serifen, zu denen Modelle von selbst
  greifen. Ohne Markenvorgabe meldet sie `pruefe-geschmack.mjs`. Steht eine davon begründet
  in `marke.json`, ist es eine Entscheidung und kein Befund.
- **Playfair Display und Cormorant** gelten in verbreiteten Kursen als Voreinstellung für
  Premium, Makler und lokale Dienstleister. Das ist derselbe Reflex mit anderem Namen und
  braucht dieselbe Begründung aus dem Gegenstand. Gezählt wird das nicht, weil beide oft
  zu Recht in einer Marke stehen.
- **Nicht dieselbe Serife in zwei Agenturprojekten hintereinander.**
- **Betonung in der Überschrift:** kursiv oder fett **derselben** Familie. Nie ein einzelnes
  Wort in einer fremden Serife in eine Groteske-Überschrift setzen. Ob überhaupt betont wird,
  regelt `10-visuelle-richtung.md` (als Voreinstellung nein).
- **Kursive Unterlängen:** Steht ein kursives Wort mit g, j, p, q oder y in einer
  Display-Überschrift, braucht die Zeile mindestens `line-height: 1.1` und unten etwas Reserve, sonst
  schneidet der Container die Unterlänge ab.

### Die Premium-Standardpalette

Für hochwertige Produkte und Handwerk greifen Modelle fast immer zur selben Palette: warmes
Papier als Grund, Messing, Ton, Ochsenblut oder Ocker als Akzent, Espresso als Textfarbe. Jede
Seite, die so aussieht, verschwindet zwischen allen anderen.

| Rolle | Werte, die als Voreinstellung gemeldet werden |
|---|---|
| Grund (Papier, Creme, Knochen) | `#f5f1ea` `#f7f5f1` `#fbf8f1` `#efeae0` `#ece6db` `#faf7f1` `#e8dfcb` `#f4f1ea` |
| Akzent (Messing, Ton, Ochsenblut, Ocker, Terrakotta) | `#b08947` `#b6553a` `#9a2436` `#9c6e2a` `#bc7c3a` `#7d5621` `#d97757` |
| Text (Espresso, warmes Fast-Schwarz) | `#1a1714` `#1a1814` `#1b1814` |

Alternativen als Ausgangspunkt, nicht als Rezept: kühler Luxus (Silbergrau, Chrom, Rauch),
Wald (tiefes Grün, Knochen, ein Bernstein), Schwarz und Tabak ohne Beige, Kobalt auf einem
einzigen Neutralton, Terrakotta auf Schiefer statt auf Creme, Oliv mit Ziegel, reines
Monochrom mit einem einzigen gesättigten Farbsprung. Richtig ist die Familie, die aus dem
Gegenstand kommt, siehe „Vor dem Griff zur Richtung" in `10-visuelle-richtung.md`.

Erlaubt bleibt die Standardpalette, wenn die Marke sie hat oder die Identität wirklich
historisch-handwerklich ist und sich das begründen lässt. Dann steht sie in `marke.json`, und
das Skript schweigt.

**Ein Akzent, zurückhaltend gesättigt.** Kein violett-blauer KI-Verlauf und kein Glühen am
Knopf als Voreinstellung. Ist die Marke violett, bleibt sie violett, mit abgestimmten
Neutraltönen statt Neonverlauf.

## 9. Technik, die den Eindruck trägt

| Regel | Grund | Geprüft |
|---|---|---|
| `backdrop-filter` nur auf fixierten oder sticky Elementen (Kopfleiste, Overlay) | Weichzeichner auf scrollenden Flächen rechnen jedes Bild neu und kosten auf dem Handy die Bildrate | angesehen |
| Körnung und Rauschen nur auf einem fixierten Pseudo-Element mit `pointer-events: none` | aus demselben Grund | angesehen |
| Glasflächen mit Rückfall unter `prefers-reduced-transparency` und genug Kontrast **ohne** Weichzeichner | die Abfrage ist uneinheitlich unterstützt, der Kontrast muss auch ohne sie halten | `pruefe-kontrast.mjs` für die Rollen |
| Kein Scroll-Listener für Einblendungen | läuft in jedem Bild ohne Bündelung. IntersectionObserver, ScrollTrigger oder `animation-timeline: view()`. Wo die Scrollrichtung gebraucht wird (Kopfleiste), `{ passive: true }` und über `requestAnimationFrame` gedrosselt | `pruefe-geschmack.mjs` |
| `overflow-x: clip` statt `hidden` am Seitenrahmen | `hidden` macht den Rahmen zum Scrollcontainer, und jedes `position: sticky` darin hört auf zu haften | `pruefe-geschmack.mjs` |
| `z-index` nur aus einer Skala | `z-50` hier und `9999` dort verlieren sich beim ersten Modal | angesehen |
| Pinning startet bei `top top` | sonst beginnt die Bewegung, bevor die Sektion steht, und man sieht eine halbe Folie. Details in `09-motion-gsap.md` | angesehen |

**Bewegung braucht einen Satz Begründung.** Vor jeder Animation: was teilt sie mit?
Hierarchie, Erzählfolge, Rückmeldung oder Zustandswechsel. „Sah gut aus" ist keine Antwort.
Die Handschrift dazu steht in `18-motion-handschrift.md`.

## 10. Vorflugcheck

Vor jeder Fertigmeldung, zusätzlich zu den Prüfskripten. Was nicht angesehen wurde, wird als
ungeprüft benannt.

1. Lesart als ein Satz notiert, Regler gesetzt und begründet, beides in `marke.json`.
2. Akzent-, Form- und Themasperre halten über alle Sektionen.
3. Held: Überschrift höchstens zwei Zeilen auf 1440 und 1366 px, Unterzeile höchstens 20
   Wörter, höchstens vier Textelemente, Logowand darunter statt darin.
4. Keine Layoutfamilie doppelt, höchstens zwei Zickzacksektionen hintereinander.
5. Bento ohne leere Zelle, mit echtem Bildmaterial in mindestens zwei Zellen.
6. Keine Liste über fünf Einträge als nackte Liste, kein Datenblatt mit Haarlinie je Zeile.
7. Keine Aufforderung bricht auf Desktop um, eine Absicht hat einen Text.
8. Kein Tell aus dem Katalog in Abschnitt 7 ohne Begründung.
9. Jede Animation hat ihren Satz, und bei Bewegung über 4 bewegt sich die Seite wirklich.
10. `node scripts/pruefe-geschmack.mjs` nach dem Build ohne Fehler.
11. Alltagsprobe: Sieht die Seite so aus, wie ein Besucher diese Art Gegenstand aus der echten
    Welt kennt und lesen kann? Eine Speisekarte mit dunklem Grund und schwacher Schrift besteht
    sie nicht, eine mit hellem Grund und klarer Gliederung schon. Grund: Ein Modell wählt das
    Wahrscheinlichste, nicht das, was jemand am Tisch tatsächlich in die Hand bekommt. Die
    Frage wird je Branche des Kunden einmal gestellt und im Markenbrief beantwortet.
12. Tauschtest für das Logo: Wäre die Seite mit dem Logo eines Wettbewerbers unverändert
    brauchbar? Dann trägt nur das Logo die Marke, und die Seite ist austauschbar. Wenigstens ein
    Element (Bildsprache, Wortwahl, Form, Material) muss ohne das Logo erkennbar zu diesem
    Kunden gehören. Grund: Ein Modell baut das Wahrscheinliche, und das Wahrscheinliche gehört
    keinem. Ein Urteil, keine Messung.
13. Blinzeltest: Beim Verkleinern oder Zukneifen der Augen bleibt eine Rangfolge sichtbar
    (erst die Überschrift, dann die Handlung, dann der Rest). Verschwimmt alles zu gleich
    grauem Lärm, fehlt Hierarchie, siehe `21-sektionshintergruende-hierarchie.md`.
14. Video und Bewegtbild: einmal stumm, einmal ohne das Video ansehen. Trägt die Sektion ohne
    es dieselbe Aussage, ist das Video Schmuck und kostet Ladezeit (Lazy Load, Poster,
    Untertitel oder Ersatztext) ohne Gegenwert. Fehlt dem Bild ohne Ton die Aussage, braucht es
    Untertitel. Ungemessen, wie viele Besucher mit Ton schauen.
15. Farbabgleich: Passt die Farbstimmung jedes Fotos zur Palette? Ein Foto, das neben der Seite
    steht statt in ihr, bekommt Farbgrading oder Zuschnitt, die Palette bleibt (`02-design-ux.md`,
    Abschnitt Bilder). Ein Urteil, keine Messung.

```bash
pnpm build
node scripts/pruefe-geschmack.mjs          # dist (Seiten) und src (Quellen)
node scripts/pruefe-geschmack.mjs --strict # vor dem Livegang: Warnungen zählen mit
```

## 11. Was bewusst nicht übernommen wurde

taste-skill ist für React, Next.js und Tailwind geschrieben, für Produktseiten ohne
Rechtsrahmen, und seine Einzelskills widersprechen sich an mehreren Stellen. Diese Punkte
wurden nicht übernommen oder umgedreht:

| taste-skill sagt | Hier gilt | Grund |
|---|---|---|
| Platzhalterfotos von picsum.photos, Unsplash-Direktlinks | sichtbarer Platzhalter `[[FEHLT: Motiv, Format, Maße]]` | jeder Fremdabruf ist eine Verbindung zu einem Drittserver (`07-recht-dsgvo.md`), und ein Stockfoto an der Stelle eines Projektfotos ist ein Beleg, den es nicht gibt |
| Echte Firmenlogos über das CDN von Simple Icons, erfundene Marke mit erfundenem Signet | Logowand nur mit echten Kunden, mit Freigabe, selbst gehostet | eine Logowand behauptet eine Geschäftsbeziehung. Ohne sie ist das Irreführung nach § 5 UWG |
| „Organische", krumme Zahlen statt runder (47,2 % statt 50 %), realistisch klingende Namen, zufällig verteilte Blogdaten, „damit es echt wirkt" | keine erfundenen Zahlen, Namen, Daten. Fehlt ein Wert, steht `[[FEHLT: …]]` | das macht eine Erfindung nur glaubwürdiger. taste-skill selbst verbietet an anderer Stelle „fake-präzise" Zahlen; hier gilt die strengere Lesart als harte Grenze |
| Nie eigene SVG-Icons zeichnen | eigenes Icon-Set nach `17-icons-eigenes-system.md`, Systemicons aus einer Bibliothek | der Grund hinter dem Verbot stimmt (frei gezeichnete Pfade sehen schief aus), die Antwort darauf sind Raster, Strichstärke und Ableitung aus der Schrift, nicht der Verzicht |
| Dunkelmodus für jede Verbraucherseite Pflicht | nur, wenn er gepflegt wird (`10-visuelle-richtung.md`) | ein halber Dunkelmodus ist schlechter als keiner, und die meisten Kundenseiten werden nicht gepflegt |
| Auch der Bereichsstrich ist verboten, Spannen mit Bindestrich | der Bereichsstrich bei Zahlen bleibt („10–12 Uhr") | deutsche Typografie nach DIN 5008; die harte Grenze gegen den Gedankenstrich gilt unverändert |
| Heldenhöhe `min-h-[100dvh]` | `100svh` | `dvh` ändert sich während des Scrollens mit der Adressleiste, `svh` nicht. Siehe `16-responsive-container.md` |
| Zuordnung vom Brief zu Designsystemen (Material, Fluent, Carbon, GOV.UK, USWDS, Bootstrap für lokale Betriebe) | Astro nach Agenturstandard; ein Kundendesignsystem nach `24-designsystem-vorrang.md` | übernommen ist nur die Ehrlichkeitsregel: liefert der Kunde ein System, wird das offizielle Paket genutzt und nicht nachgebaut |
| Zufallswahl per simuliertem Python-Würfel (gpt-taste), „nie zweimal dasselbe" (soft-skill) | Ableitung aus dem Gegenstand | Zufall ersetzt eine Schablone durch zehn. Eine Handschrift entsteht aus Branche, Material und Zielgruppe, siehe `10-visuelle-richtung.md` |
| Jedes Element blendet beim Scrollen ein, statische Oberflächen sind verboten (soft-skill, gpt-taste) | Bewegung braucht einen Satz Begründung | so steht es auch in taste-skill v2 selbst; die älteren Einzelskills widersprechen ihm |
| Riesige feste Sektionsabstände (`py-32` bis `py-48`) | Raumtokens aus `15-spacing-rhythmus.md`, gesteuert über den Dichteregler | feste Werte außerhalb der Tokens sind ein Befund für `pruefe-tokens.mjs` |
| Kicker als Pille über jeder Überschrift (soft-skill), Fensterattrappe mit drei Punkten (minimalist) | Kicker-Quote, keine Attrappen | taste-skill v2 verbietet beides; die älteren Einzelskills sind hier überholt |
| Versalien für jede Mikrozeile, Pastelltöne mit dunkler Schrift als Etikett (brutalist, minimalist) | Kontrast nach `04-barrierefreiheit-bfsg.md`, Versalien nicht für Labels (`10-visuelle-richtung.md`) | die angegebenen Paare sind nicht geprüft; Versalienzeilen lesen sich schwer |
| FAQ-Akkordeons ersetzen (redesign-skill) | Akkordeon mit `details`/`summary` bleibt richtig | tastaturbedienbar ohne Skript, auffindbar, und ein FAQ wird gescannt, nicht gelesen |
| Schriften wie Satoshi, Cabinet Grotesk, Clash Display, Geist als Vorschlagsliste | Schriftwahl nach `10-visuelle-richtung.md`, Lizenz prüfen, selbst hosten | mehrere davon stehen unter eigener Lizenz (Fontshare, Vercel) und werden gern vom Anbieter-CDN geladen |

Die Originale lassen sich auf ausdrücklichen Wunsch zusätzlich installieren, siehe
`scripts/install-quellskills.sh`. Standardmäßig bleiben sie draußen, weil ein Modell mit
beiden Regelwerken im Kontext an genau den Stellen dieser Tabelle zwischen ihnen pendelt.

## Verwandte Kapitel

- `10-visuelle-richtung.md`: Richtung, Tokens, Schriftwahl, die bekannten Schablonen
- `02-design-ux.md`: Above the Fold, Heldenhöhe, Hover-Pflicht, Design-Tells
- `12-copywriting.md`: ein Name je Aktion, Kicker ohne Strich, Handwerkslehre
- `15-spacing-rhythmus.md`: Raumtokens, auf die der Dichteregler zugreift
- `18-motion-handschrift.md` und `09-motion-gsap.md`: Bewegung mit Begründung, Pinning
- `21-sektionshintergruende-hierarchie.md`: Flächenwechsel, geplante dunkle Sektion
- `24-designsystem-vorrang.md`: was jede Regel hier schlägt
- `27-redesign-bestand.md`: dieselben Regeln auf eine bestehende Seite angewendet
- `28-ki-bildentwuerfe.md`: generierte Entwürfe als Vorlage, und wo sie nichts belegen dürfen
- `45-huerde-laenge-und-leserfuehrung.md`: informative Überschriften statt Slogans, entschiedene Widersprüche zu Schriften, Palette und Breite
