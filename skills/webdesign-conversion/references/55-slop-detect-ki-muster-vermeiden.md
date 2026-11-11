# Slop Detect: KI-Muster am gerenderten DOM messen und vorher vermeiden

`26-geschmack-und-ki-tells.md` sagt, woran man eine maschinell gebaute Seite erkennt, und `pruefe-geschmack.mjs` zählt, was sich im Quelltext zählen lässt.
Beides sieht nur, was im Code steht. Eine berechnete Schrift, ein Verlauf aus einer Utility-Klasse, ein Kartenraster aus verschachtelten Komponenten oder ein
Schatten, den ein Stylesheet in einer anderen Datei setzt, zeigen sich erst im gerenderten DOM. Dort misst
[Slop Detect](https://github.com/ravidsrk/slop-detect) (Ravindra Kumar, MIT): ein Katalog von Mustern, die sich bei Standardseiten von Baukästen und Modellen häufen,
ausgewertet in einem echten Chromium.

Dieses Kapitel hält fest, **was gemessen wird, wie man es als Entwurfsfilter nutzt, bevor gebaut wird, und wo das Werkzeug der Agentur widerspricht.**
Der Lauf selbst steht in `../../agentur-website-builder/references/slop-pruefung.md`, das Prüfskript ist `scripts/pruefe-slop.mjs`. Nach der Regel dieses Repositories
sind Wissen und Ablauf getrennt: hier die Muster und ihre Deutung, dort der Gang durch die Phasen.

**Stand und Herkunft.** Der Katalog dieses Kapitels folgt der `spec/patterns.md` des Repositories (Definitionen 2026.11: 45 Designmuster, 26 Textmuster, 9 Prüfungen
gegen eine `DESIGN.md`, 11 Handwerksprüfungen, 16 Prüfungen auf KI-Auffindbarkeit). Die über npm veröffentlichte Fassung 0.8.0 liegt dahinter: Definitionen 2026.09, 27 Designmuster, 9 Textmuster,
kein `--craft`. Am 09.11.2026 ist diese Fassung hier gegen zwei Testseiten gelaufen (eine Seite voller Muster: Heavy, 66 Punkte und 13 Treffer; eine ruhige Seite: Clean, 0 Punkte).
Die Muster, die erst in 2026.11 hinzukamen, sind **nach der Beschreibung des Repositories** übernommen, nicht gelaufen.

## Inhalt

- 1\. Was gemessen wird, und was nicht
- 2\. Fünf Achsen
- 3\. Vorbeugen: die Vermeideliste für den Entwurf
- 4\. Was das Werkzeug zusätzlich zu Kapitel 26 liefert
- 5\. Wo das Werkzeug der Agentur widerspricht
- 6\. Ablauf in Kürze
- Ungeprüft und offen
- Verwandte Kapitel

## Inhalt

## 1. Was gemessen wird, und was nicht

Slop Detect liest berechnete Stile und die Struktur der Seite und meldet je Muster `triggered` mit Beleg. Ein Treffer ist eine **Beobachtung mit Gewicht**, kein Urteil über
die Seite. Drei Dinge gelten immer:

1. **Sauber ist nicht gut.** Eine Seite ohne Treffer kann trotzdem das falsche Angebot, einen schwachen Beleg oder eine unklare Handlung haben. Der Wert misst Maschinenspuren, nicht Conversion.
2. **Ein Treffer ist nicht automatisch ein Fehler.** Das Muster zählt, was bei generierten Seiten häufig vorkommt. Eine Marke, die Creme als Grundfarbe vorgibt, trifft `cream_default_bg`
   zu Recht, und der Treffer ist trotzdem richtig. Deshalb gibt es begründete Ausnahmen (Abschnitt 5), und deshalb ist der Wert nie das Ziel.
3. **Der Katalog altert.** Mehrere Muster sind als „decaying" oder „retired" geführt, weil Modelle sie nicht mehr so häufig erzeugen. Wer nur gegen den Katalog baut, vermeidet die Muster von gestern.
   Der Maßstab bleibt die eigene Handschrift (`26-…`, `10-…`).

## 2. Fünf Achsen

| Achse | Richtung | Stufen | Was sie prüft | Gegenstück im Plugin |
|---|---|---|---|---|
| Design | niedrig ist gut | Clean 0 bis 9, Mild 10 bis 27, Heavy ab 28 | Muster im gerenderten DOM: Schrift, Farbe, Verlauf, Raster, Hero | Kapitel 26, `pruefe-geschmack.mjs` (Quelltext) |
| Text | niedrig ist gut | Clean 0 bis 7, Mild 8 bis 19, Heavy ab 20 | Floskeln, Dreierreihen, „nicht nur X, sondern Y", Gedankenstriche, **Artefakte** aus dem Modell | `deslop-check.mjs`, Kapitel 12, 34, 35, 51 |
| System | hoch ist gut | Aligned ab 80, Drifting 50 bis 79 | hält das DOM die eigene `DESIGN.md` oder DTCG-Tokens ein | `marke.json`, `pruefe-tokens.mjs`, `DESIGN.md` in den Vorlagen |
| Handwerk (Craft) | hoch ist gut | verändert die anderen Stufen nie | Darstellungs- und Zugänglichkeitshygiene | `pruefe-seitenbasis.mjs`, `pruefe-kontrast.mjs` |
| KI-Auffindbarkeit (AEO) | hoch ist gut | Eligible ab 80, Partial 50 bis 79, Restricted | kann eine Antwortmaschine die Seite abrufen, lesen, zitieren | Kapitel 31, `pruefe-geo.mjs` |

Für die Agentur zählen im Alltag Design und die Textartefakte. System, Handwerk und Auffindbarkeit sind Zweitmeinungen zu Prüfungen, die es hier schon gibt, und laufen nur, wenn sie etwas
Neues zeigen sollen. **Die Textachse bewertet englische Prosa.** Bei deutschem Text überspringt der Motor die statistischen Regeln und meldet kaum etwas; für deutschen Text bleibt `deslop-check.mjs` zuständig.
Nur die **Artefaktregeln** gelten sprachunabhängig: ein Platzhalter wie `[Insert Company Name]` oder `{{company_name}}`, rohes Markdown (`**fett**`, `### Überschrift`) im sichtbaren Text, Reste einer
Chatantwort („Gerne! Hier ist …"), ein Verweis wie `utm_source=chatgpt.com` in einem Link und unsichtbare Zeichen. Sie sind Defekte und gehören vor jeder Übergabe weg.

## 3. Vorbeugen: die Vermeideliste für den Entwurf

Der beste Zeitpunkt ist vor dem Bau. Was im Konzept (Phase 3) und im Prompt steht, entsteht gar nicht erst. Die Tabelle ist die Liste, die in den Auftrag an das Modell gehört,
neben den Sperren aus `marke.json` (`gestaltung.sperren`). Gewichte nach Repository (2026.11); die npm-Fassung 0.8.0 gewichtet einzelne Muster anders (`purple_accent` dort 8 statt 4).

| Muster | Gewicht | Was es ist | Stattdessen |
|---|---|---|---|
| `slop_fonts` | 8 | Inter, Geist, Space Grotesk, Plus Jakarta Sans, DM Sans, Manrope, Instrument Serif u. a. als Held- oder Hauptschrift | Schrift der Marke, sonst bewusst gewählt (`10-…`, Schriftsperre) |
| `cream_default_bg` | 7 | warmer Cremegrund als Standard | Grundfarbe aus der Marke, Creme nur mit Vorgabe |
| `low_contrast_text` | 7 | Fließtext unter 4,5:1 | `pruefe-kontrast.mjs`, Alpha-Stufen nicht unterschreiten |
| `gradient_text` | 6 | Verlauf in Überschriften (`background-clip: text`) | einfarbig aus der Rolle |
| `accent_stripe` | 6 | farbiger Streifen oben oder links an Karten | ein Rahmen in einer Farbe oder keiner |
| `hero_eyebrow_pill` | 5 | Pille „Neu" oder „Beta" über der H1 | streichen, sie zählt als Kicker |
| `gradient_letter_avatars` | 5 | Initialen im Farbkreis als Kundenstimme | echtes Foto mit Freigabe oder keine Stimme |
| `aurora_mesh_gradient` | 5 | verschwommene Farbflecken hinter dem Held | ruhige Fläche oder ein echtes Bild |
| `crushed_tracking` | 5 | Laufweite unter −0,05 em bei Überschriften | nicht unter −0,02 em |
| `purple_accent` | 4 | gefüllte Indigo- oder Violettknöpfe | Farbe aus den Rollen-Tokens |
| `gradient_backgrounds` | 4 | Verlaufsflächen über mehrere Sektionen | Fläche aus den Tokens |
| `glassmorphism` | 4 | Weichzeichner hinter durchscheinenden Flächen | Glas nur auf fixierten Elementen |
| `colored_glows` | 4 | farbiges Leuchten um Elemente | kleiner, getönter Schatten |
| `centered_hero` | 4 | mittig gesetzter Held in Standardschrift | Layout aus dem Entwurf |
| `perma_dark_mode` | 4 | dunkle Seite mit mittelgrauem Fließtext | hell oder Kontrast nachmessen |
| `icon_card_grid` | 4 | drei oder mehr gleiche Karten mit Icon obenauf | ungleich gewichten, nach Inhalt (`21-…`) |
| `bento_grid` | 4 | Raster aus gerundeten Karten mit gemischten Spannen | Raster nach Inhalt |
| `oversized_hero_h1` | 4 | H1 ab 72 px und 40 Zeichen | kürzen oder verkleinern |
| `nested_cards` | 4 | Karten in Karten | eine Ebene |
| `numbered_steps` | 3 | Schritte 1, 2, 3 als Raster | Schritte mit Verb, Zählung nur wenn sie ordnet |
| `stat_banner` | 3 | drei große Kennzahlen in einer Reihe | nicht als Band bauen; die Zahl gehört an den Fall, der sie belegt (harte Grenze: nur belegte Zahlen) |
| `ai_sparkle_badges` | 3 | „✨" an KI-Text | streichen |
| `flat_type_hierarchy` | 3 | Schriftgrößen liegen zu nah beieinander | Stufen mit Verhältnis ab 2:1 |
| `faq_accordion` | 2 | FAQ als Akkordeon im unteren Drittel | nur echte Fragen, Antworten im HTML (`31-…`, `35-…`) |

**Beobachtungsmuster mit Gewicht 0** (gelistet, ohne Punkte, bis sie sich bewähren): ausgelassene Standardwerte eines Gerüsts, Kursivwort in der H1, Chrome von 2026 (schwebende Glasleiste, überlappende
Avatare, drei Preisstufen mit hervorgehobener Mitte), gleiche Rundung und gleicher Schatten überall, Creme plus Serif plus Terrakotta, die Standardreihenfolge der Sektionen (Held, Logoleiste, Funktionen, Ablauf,
Stimmen, Preise, FAQ, Abschluss), pulsierender Statuspunkt, Monospace-Überschrift, Chips in vier Pastellfarben, nachgebautes Terminalfenster mit drei Punkten, Logoleiste aus grauen Einheitslogos,
endloses Laufband, derselbe Einblendeffekt auf sechs oder mehr Elementen, Mauslicht, gleicher Hover an allen Karten, drei gleich gebaute Sektionen in Folge, dunkle Seite ohne `color-scheme`.
Sie sind keine Fehler, aber ein guter Vorflugcheck: wer sechs davon in einer Seite zählt, hat sie nicht entworfen, sondern übernommen.

## 4. Was das Werkzeug zusätzlich zu Kapitel 26 liefert

Kapitel 26 und `pruefe-geschmack.mjs` decken Kicker, Laufband, Konturknopf, Standardschriften, Pille, getippte Logoleiste, Akzentwort, Violettverlauf und Glas. Neu als **Entwurfsregel** kommen:
verschachtelte Karten, flache Schrifthierarchie, Kennzahlenband als Reihe, nummerierte Schrittraster, Bento-Raster, Avatare im Farbkreis, gleiche Rundung und gleicher Schatten, derselbe Einblendeffekt auf
vielen Elementen, gleicher Hover an allen Karten, Wiederholung desselben Sektionsaufbaus und die Standardreihenfolge der Sektionen. Die Regel für Entwurf und Prompt lautet: **jede Sektion bekommt ihr eigenes
Maß, ihre eigene Gewichtung und ihre eigene Aufgabe.** Das ist die Antwort, die das Projekt Gewerbestrom auf eine Seite fand, die „trotz korrektem Brand Guide nach Template aussah": ungleiche Abstände, verschiedene
Satzbreiten, Kicker nur auf drei Sektionen, Einblenden auf elf statt dreiundfünfzig Elementen.

## 5. Wo das Werkzeug der Agentur widerspricht

| Fall | Entscheidung | Grund |
|---|---|---|
| Die Marke gibt Inter, Instrument Serif oder Creme vor | Ausnahme mit Begründung in `slop-ausnahmen.json`, der Treffer bleibt im Bericht | Markenvorgabe schlägt Katalog (`24-designsystem-vorrang.md`). Die Ausnahme gilt der Marke, nicht der Bequemlichkeit |
| Eine Schrift ist nur eine Zwischenlösung, bis die Markenschrift lizenziert ist | **keine** Ausnahme | Eine Zwischenlösung ist keine Vorgabe. Sie steht im Bericht als offener Punkt, bis die Lizenz geklärt ist |
| FAQ, Ablauf in Schritten oder Kennzahlenband tragen echten Inhalt | begründete Ausnahme je Muster, nie pauschal | Die Funktion zählt: FAQ für Suche und Antwortmaschinen (`31-…`), Ablauf als Entscheidungshilfe (`06-…`). Das Gewicht dieser Muster ist klein, das Risiko ist das Raster, nicht die Idee |
| Kennzahlenband trifft `stat_banner` | nur mit belegten Zahlen; unbelegte Zahlen sind ein Verstoß gegen die harte Grenze, auch wenn die Prüfung grün ist | `keine-erfundenen-belege`. Das Werkzeug kann nicht wissen, ob 80+ stimmt |
| Der Wert ist gut, die Seite ist schlecht | Wert ignorieren | Ein Wert unter 10 ist kein Beleg für Qualität (Abschnitt 1) |
| Ein Muster wird behoben, indem ein verwandtes eingesetzt wird | Treffer bleibt, Fix gilt nicht | Inter gegen Geist, Indigo gegen Violett, Linearverlauf gegen Radialverlauf bleiben in der Liste. Nie ein Muster gegen ein verwandtes tauschen |
| Das Werkzeug empfiehlt eine Korrektur per `--fix-prompt` | nur als Zweitmeinung lesen, nie unbesehen ausführen | Die Rezepte des Originals sind hier nicht gelesen. Maßgeblich bleiben die Gegenmittel in Abschnitt 3 und die harten Grenzen |
| Die Textachse meldet bei deutschem Text fast nichts | `deslop-check.mjs` und Kapitel 51 | Der Motor kennt englische Prosa. Nur die Artefakte gelten für alle Sprachen |
| Der Lauf liefert keine Bewertung (gesperrt, leer, Fehler) | **nicht geprüft**, nie als sauber werten | Der Motor selbst trennt das mit Exit 2 von einem sauberen Ergebnis; `pruefe-slop.mjs` übernimmt die Regel |
| Die Hosting-API (`slop-detect.com`) wäre bequemer | nicht für Kundenvorschauen | Sie überträgt die Adresse an einen Dritten. Der lokale Lauf braucht nur Chromium |

## 6. Ablauf in Kürze

1. **Konzept:** die Vermeideliste (`node scripts/pruefe-slop.mjs --vorbeugen`) in den Auftrag an das Modell und in die Sperren der `marke.json` aufnehmen.
2. **Nach dem Bau:** Vorschau starten, `node scripts/pruefe-slop.mjs http://localhost:4321 --copy`. Heavy und jedes Textartefakt sind Fehler, Mild wird je Treffer behoben oder begründet ausgenommen.
3. **Vor der Übergabe:** noch einmal mit `--streng`. Die Ausnahmen stehen im Abschlussbericht mit ihrem Grund.
4. **Danach** Kapitel 29 (zwei subjektive Durchgänge) und Kapitel 40 (Kritiker). Slop Detect ersetzt weder das eine noch das andere: es findet Spuren, es bewertet keine Gestaltung.

Befehle, Schwellen und Ausnahmedatei: `../../agentur-website-builder/references/slop-pruefung.md`.

## Ungeprüft und offen

* Kein Evalfall misst, ob das Kapitel das Verhalten ändert (`evals/slop-vor-auslieferung-pruefen` ist angelegt, **nicht gelaufen**). Das Δ ist eine Vermutung.
* Die 2026.11-Muster (45 Design, 26 Text) sind nach der Beschreibung des Repositories übernommen. Gelaufen ist nur die npm-Fassung 0.8.0 mit 27 Designmustern gegen zwei Testseiten, nicht gegen ein Kundenprojekt.
* Die Gewichte, Stufen und die Aussage, welche Muster „decaying" sind, stammen aus dem Repository des Werkzeugs und sind hier nicht nachgemessen.
* `pruefe-slop.mjs` zieht Ausnahmen selbst ab. Die bereinigte Punktzahl ist eine Näherung, weil der Motor Muster untereinander deckelt (zum Beispiel Schrift und mittiger Held auf höchstens 8).
* Die Fix-Rezepte (`fixes.ts`) und die Konfiguration über `.sloprc.json` mit Schwellen je Muster sind nicht gelesen. Die Ausnahmedatei dieses Repositories ist eine eigene, einfachere Form.
* Ob Slop Detect eine Seite mit starker Eigenart fälschlich als Heavy wertet, ist nicht gemessen. Bei einem Befund, der der Marke widerspricht, entscheidet ein Mensch, nicht der Wert.

## Verwandte Kapitel

* Geschmack, Tells und Vorflugcheck: `26-geschmack-und-ki-tells.md`
* Vorrang von Marke und Designsystem: `24-designsystem-vorrang.md`, `10-visuelle-richtung.md`
* Prüfdurchgänge und Vokabular: `29-pruefdurchgaenge-und-vokabular.md`, `40-polierschleife-mit-kritiker.md`
* Text entmaschinisieren: `51-text-entmaschinisieren.md`, `12-copywriting.md`
* Auffindbarkeit für KI: `31-ki-sichtbarkeit-geo.md`
* Lauf und Schwellen im Projekt: `../../agentur-website-builder/references/slop-pruefung.md`
