# Hierarchie, Raster und Komposition: der Blick hinter den Regeln

Die Kapitel 02, 10, 15 und 26 geben Maße und Grenzwerte. Dieses Kapitel ergänzt, **wie man
entscheidet, wenn die Maße erfüllt sind und die Seite trotzdem nach Vorlage aussieht**:
Hierarchie als Verhältnis, Raster als Werkzeug, Komposition als Wechsel, Animation als System.
Es ersetzt keine Regel aus diesen Kapiteln, es sagt, wo man von der Mathematik abweichen darf
und wo nie.

Die Substanz stammt aus vier Videos des Kanals BONT (2025 und 2026, Gestalter mit Agenturhintergrund),
als Erweiterungspaket geliefert. Übernommen sind Verfahren und Beobachtungen in eigenen Worten.
Zahlen und Aussagen sind Erfahrungswerte des Autors, keine Messungen. Seitenadressen und Namen aus
den Videos stammen aus automatischen Untertiteln und sind nicht geprüft.

## 1. Wenige Zutaten

| Zutat | Richtwert | Wo geregelt |
|---|---|---|
| Schriften | eine, höchstens zwei bewährte. Energie in den Einsatz, nicht in die Suche nach der besonderen | `10-visuelle-richtung.md`, `pruefe-tokens.mjs` |
| Farben | zwei bis drei Vollfarben, Schwarz und Weiß zählen nicht mit | `10-visuelle-richtung.md` (eine Markenfarbe mit Rampe) |
| Hierarchiestufen | drei bis fünf, deutlich unterscheidbar | Abschnitt 2 |
| Bildsprache | **eine**: ein Illustrationsstil, ein Fotostil, eine Technik | `26-geschmack-und-ki-tells.md` |

Grund: Zusammenhalt entsteht durch Wiederholung. Jede zusätzliche Zutat muss sich gegen die
bestehenden behaupten. Ausnahme: Hat der Kunde eine Hausschrift, gilt sie (`24-designsystem-vorrang.md`).

## 2. Hierarchie ist ein Verhältnis

Nicht die absolute Größe macht eine Überschrift stark, sondern der Abstand zum Kleintext und der
Weißraum um sie.

| Beobachtung | Folge | Grund |
|---|---|---|
| Kleintext von 16 auf 24 px erhöht, Überschrift unverändert: die Überschrift wirkt schwächer | Wirkung der Überschrift prüfen, bevor Kleintext vergrößert wird | der Kontrast zwischen groß und klein trägt die Stufe |
| Text ohne Weißraum neben sich wirkt leicht | eher die Schrift verkleinern und Raum schaffen | Weißraum zeigt auf das Wichtige |
| Großer Titel gegen kleinen Text erzeugt Tiefe | Sprünge deutlich setzen, nicht „etwas größer" | Vordergrund und Hintergrund brauchen Abstand |

**Grenze:** Kleintext fällt nie unter die Mindestgrößen aus `04-barrierefreiheit-bfsg.md`
(Fließtext 16 px). Der Satz „kleiner wirkt manchmal stärker" gilt für Beschriftungen und
Nebentexte, nicht für Lesetext.

### Titellänge

| Stufe | Wörter | Wenn länger |
|---|---|---|
| Display Überschrift | 1 bis 3, höchstens 5 | in Überschrift plus Unterzeile oder kurzen Absatz teilen |

Grund: Die Länge bestimmt, welche Größe passt. Ein langer Titel frisst den Weißraum, der bei der
Größenwahl eingeplant war. Verhältnis zu den Heldenregeln: `26-geschmack-und-ki-tells.md`, Abschnitt 4,
erlaubt höchstens zwei Zeilen. **H1 und Suchanfrage:** Die Überschrift muss weiter das Thema
tragen (`05-seo-sichtbarkeit.md`). Ist sie kürzer als der Nutzen, trägt die Unterzeile ihn, die
Kernbotschaft steht nach `12-copywriting.md` im ersten Bildschirm.

## 3. Der Gestalter führt das Raster

| Schritt | Inhalt |
|---|---|
| 1 | Zuerst Struktur über äußeren Rand, Hälften und Drittel, ohne Spaltenraster |
| 2 | Raster einblenden und Details justieren, Abstände über Padding und `gap` (`15-spacing-rhythmus.md`) |
| 3 | Wenige durchgehende **Führungskanten** setzen, zum Beispiel eine Linie von der Überschrift zum Knopf |

Nicht jede Spaltenkante ausnutzen: Wenige Linien, die über die Sektionen hinweg wiederkehren,
geben dem Scrollen Halt. **Prüfen:** eine Kante markieren und zählen, wie oft sie wiederkehrt.
Keine Kante, die nur einmal vorkommt, ist keine Führungskante. Grund: Rasterzwang erzeugt
Starrheit, Rasterlosigkeit Beliebigkeit, die Führungskante liegt dazwischen.

## 4. Fläche nutzen, Anteile wechseln

**Fläche nutzen:** Bilder, Vollflächen und die Display Überschrift dürfen bis nahe an den Rand,
sie gehören nicht zwingend in eine Spalte mit breiten Rändern. Das trennt Vorlagenlook von
Entwurf. **Grenze:** Fließtext bleibt in der Lesebreite (`--breite-text`, `02-design-ux.md`), und der
seitliche Rand `--rand-seite` bleibt für Bedienelemente und Texte bestehen. Grund: Lesbarkeit und
Berührbarkeit schlagen die Optik.

**Anteile wechseln:** Wie viel Bild, Text und Farbe eine Sektion trägt, ändert sich von Sektion zu
Sektion.

| Folge | Urteil |
|---|---|
| Bild und etwas Text, dann nur Text, dann ganz Bild, dann 40 % Text und 20 % Bild, dann Foto als Hintergrund, dann Weiß, dann Vollfarbe | gewünscht: der Besucher kann nicht vorhersagen, was kommt |
| Text, Bild, Text, Bild | vorhersehbar, führt zum Abbruch |

Das ergänzt die Layoutfamilien aus `26-geschmack-und-ki-tells.md`, Abschnitt 5: Die Familien
begrenzen die Wiederholung der **Form**, der Anteilswechsel die des **Gewichts**. Die Trennung der
Sektionen nach Aussage regelt `21-sektionshintergruende-hierarchie.md`.

## 5. Optik schlägt Mathematik, bis eine harte Grenze trifft

| Fall | Entscheidung |
|---|---|
| Button rechnerisch zentriert, wirkt wegen einer leichten Zeile schief | optisch nachjustieren |
| Große Titel | Zeilenhöhe 1,1 bis 1,2 statt 1,5 |
| Gesicht im Bild soll dominieren | Platzierung nach Wirkung, nicht nach Raster |

Die Faustwerte der Anfänger (Zeilenhöhe 1,5, doppelte Größe, 30 px Mindestgröße für Knöpfe) ordnen
die Hauptentscheidungen, der Blick darf sie überstimmen. **Nie überstimmbar:** Kontrast
(`pruefe-kontrast.mjs`), Trefferflächen, Mindestgrößen, Lesbarkeit bei 200 % Zoom. Wer nach Wirkung
entscheidet, nennt die Wirkung im Umsetzungskonzept der Phase 3, sonst ist es Geschmack
(`33-kundenpraesentation-und-feedback.md`).

## 6. Die Heldenidee ist der rote Faden

Eine starke Idee im Held (ein Objekt, eine Kante, eine Bewegung) verliert ihre Wirkung, wenn die
Seite danach in Standard kippt. Prüffrage am Entwurf: **Taucht die Idee des Held in mindestens zwei
weiteren Sektionen wieder auf** (Form, Bewegungsart, Bildbehandlung)? Wenn nein, ist sie Dekoration
und kein Konzept. Das Signaturelement aus `37-stilrichtung-nach-kundensprache.md` ist derselbe Gedanke.

## 7. Animation als System

| Regel | Inhalt | Grund |
|---|---|---|
| Ein großer Moment beim Laden | Intro oder große Bewegung, danach nur kleine | holt Aufmerksamkeit, ohne zu überfordern (`18-motion-handschrift.md`) |
| Drei Arten | Erscheinen (Laden), Verhalten beim Scrollen, Mikrointeraktion (Hover, Menü) | jede Art bekommt ein Muster statt Einzelfälle |
| Bewegung stützt die Hierarchie | steht ein Video im Fokus, bleiben Titel und Absatz ruhig | sonst weiß das Auge nicht, wohin |
| Ein Muster je Textart | kleine Texte und Zahlen (Scramble), Titel und Absätze zeilenweise, Karten per Fade Up, Hervorhebung wortweise | Wiedererkennung, wenig Code |
| Einfach halten | Fade, kein Blur, keine Spielereien | Blur kostet Leistung, wirkt verwaschen und verzögert die Lesbarkeit |
| Dauer einmal festlegen | als Token (`tokens.css`), nicht je Element | `pruefe-motion.mjs`, `30-motion-pruefung.md` |
| Navigation | beim Runterscrollen ausblenden, beim Hochscrollen sofort zurück (`02-design-ux.md`, Sticky-Kopf) | Platz für Inhalt, Orientierung bleibt erreichbar |

**Scramble und Bildschirmleser:** Ein Text, dessen Zeichen durchlaufen, wird sonst als Buchstabensalat
vorgelesen. Der echte Text steht im DOM (`aria-label` oder visuell versteckt), die Animation ist
`aria-hidden`, bei `prefers-reduced-motion: reduce` erscheint der Endtext sofort. Zahlen, die der
Besucher lesen muss (Preis, Frist), nie scramblen.

**Sticky Modul in drei Zonen:** Haltebühne (die Fläche bleibt stehen), Laufstrecke (leere Höhe, die den
Scrollfortschritt steuert), Freigabe (danach läuft die Seite weiter). Text kann so über einem Video
stehen. Pinning und Überlauf: `09-motion-gsap.md`, Abschnitt Pinning. Scrollvideo nur mit Anlass:
`38-scrollvideo-und-einbettungen.md`.

## 8. Entschieden: was das Paket anders sagt als der Bestand

| Aussage im Paket | Entscheidung | Grund |
|---|---|---|
| Abstandsskala in festen Pixelstufen (10, 20, 40, 80, 120, 160, 200) | **nicht übernommen**, es bleiben die fließenden Tokens aus `15-spacing-rhythmus.md` | `clamp` verhindert Sprünge zwischen Breiten. Die Zahlen stammen aus einem Framer Projekt |
| Elemente bis an den Rand, nicht in eine Spalte | **eingeschränkt** auf Bild, Fläche und Display Überschrift (Abschnitt 4) | Lesebreite und Trefferflächen |
| Überschrift 1 bis 5 Wörter | **als Display Regel übernommen**, H1 trägt weiter das Thema (Abschnitt 2) | SEO und Kernbotschaft |
| Kleintext nicht reflexartig vergrößern | **eingeschränkt** auf Nebentext | Mindestgröße 16 px |
| Hintergrund mit 2 px Punktraster | **nicht übernommen** | Stilmittel einer Beispielmarke |
| Stil Skill je Marke in Framer | übertragen auf `marke.json` und den Markenbrief, siehe `agentur-website-builder/references/moodboard-und-stylescape.md`, Abschnitt 5a | Der Bestand hat dafür schon einen Ort |

## 9. Beispielseiten aus dem Video (Kandidaten, ungeprüft)

Aus der Videobeschreibung, **nicht verlinkt, nicht geprüft**, Tor 1 gilt (erst vorlegen, dann
freigeben, `designrecherche-ablauf.md`). Namen können falsch verstanden sein, und eine Seite von
2018 sagt nichts über 2026.

| Merkmal, das die Quelle daran hervorhebt | Seite laut Beschreibung |
|---|---|
| mehrere Wege zum Inhalt statt Standardraster (E-Commerce) | becaneparis.com |
| Weißraum als Gruppierung nach Nähe | norgram.co |
| Magazinanmutung, wenige Hintergrundelemente | negeurra.com |
| Wechsel von Bild zu Grafik, große Titel gegen kleine Absätze | godaylight.com |
| eine einzige Technik (3D), keine Mischung | glyphic.bio |
| verspielt und minimal, Pflichtbausteine vorhanden | yomy.care |
| Heldenidee, danach Standard (Gegenbeispiel aus Abschnitt 6) | pendragoncycle.com |

Vier weitere Seiten des Videos (wakawaka.world, repponen.com, c2mtl.koki-kiko.com, Shopify Editions)
bleiben weg: Alter, fehlende Konzeptidee oder unvollständige Adresse. Übergreifend nennt das Video:
alle Seiten haben Wertversprechen, meist einen klaren Knopf, Produktdetails und Belege. Mobil prüfen
bleibt Pflicht, Zuschauer wiesen darauf hin.

## 10. Nicht übernommen (mit Grund)

* Lebenslauf, Auszeichnungen und Kundenlisten des Autors, Anekdote vom abgelehnten Neonentwurf als
  Beleg: Einzelaussagen, nicht nachgeprüft (der Gedanke „richtig statt trendig" steht in
  `10-visuelle-richtung.md` und `26-geschmack-und-ki-tells.md`)
* Bedienung von Framer und dessen Agent, Komponentenmarktplatz: nicht der Agenturstack
* Dauer „eine Stunde bis zur Homepage": im Video ein Einzelfall

## 11. Checkliste

1. höchstens zwei Schriften, zwei bis drei Vollfarben, drei bis fünf Stufen, eine Bildsprache
2. Verhältnis groß zu klein geprüft, Lesetext nicht unter Mindestgröße
3. Display Überschrift 1 bis 5 Wörter, H1 trägt das Thema
4. ein bis drei Führungskanten, jede kehrt mehrfach wieder
5. Anteil Bild, Text, Farbe wechselt von Sektion zu Sektion
6. Idee des Held kehrt in mindestens zwei Sektionen wieder
7. ein großer Ladeeffekt, Rest klein, Dauer als Token, Scramble mit echtem Text im DOM
8. jede Abweichung von einer Regel mit Wirkung begründet, keine harte Grenze verletzt

Status: an keinem Kundenprojekt erprobt, kein Prüfskript, kein Evalfall, das Δ ist eine Vermutung.

## Verwandte Kapitel

`02-design-ux.md`, `10-visuelle-richtung.md`, `15-spacing-rhythmus.md`, `18-motion-handschrift.md`,
`21-sektionshintergruende-hierarchie.md`, `22-premium-designquellen.md`, `26-geschmack-und-ki-tells.md`,
`30-motion-pruefung.md`, `37-stilrichtung-nach-kundensprache.md`, `42-referenzgrammatik-und-gap-audit.md`.
