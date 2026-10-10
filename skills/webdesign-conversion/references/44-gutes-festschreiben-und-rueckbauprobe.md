# Gutes festschreiben: Rückbauprobe, Pilot, Entscheidungen beim Menschen

`25-designmuster-bibliothek.md` hält Muster aus **fremden** Referenzen fest, `40-polierschleife-mit-kritiker.md`
poliert einen Entwurf. Offen blieb: **Wie wird ein gutes Ergebnis des eigenen Projekts wiederholbar**,
sodass die nächste Sektion, Landingpage oder Kampagne der Marke nicht von vorn beginnt? Dieses Kapitel
beschreibt die Rückbauprobe, ergänzt Regeln für Pilot, Figurenwelt und Entscheidungen, die der Mensch behält.

Die Substanz stammt aus drei Videos (Jay E / RoboNuggets, 27.09.2026; Jack Roberts, 17.08. und 20.08.2026),
als Erweiterungspaket geliefert. Eigene Fassung in eigenen Worten. Die Aussagen sind Erfahrungswerte der
Autoren, nicht gemessen. Werkzeugnamen, Preise und Funktionen (zum Beispiel ein eingebautes Designkommando
in Claude Code) sind **nicht übernommen**, weil sie schnell veralten und ungeprüft sind.

## Inhalt

- 1\. Das Problem
- 2\. Die Rückbauprobe
- 3\. Pilot vor Vollproduktion
- 4\. Figurenwelt und Asset Inventar
- 5\. Was der Mensch behält
- 6\. Die Schleife erklärt sich selbst
- 7\. Eine eigene Referenzbibliothek
- 8\. Nicht übernommen (mit Grund)
- Verwandte Kapitel

## 1. Das Problem

Zehnmal „verbessere das Design" ergibt zehnmal neue Gründe, wenn kein Zielbild existiert. Und ein
gelungenes Ergebnis lässt sich ohne festgehaltene Regeln nicht wiederholen: Es war Glück mit Kontext.
Gegen das erste hilft ein Zielbild (Kapitel 40), gegen das zweite die Rückbauprobe.

## 2. Die Rückbauprobe

Zweistufig: erst das Design gut machen, dann festhalten, **warum** es gut ist.

| # | Schritt | Ergebnis | Grund |
|---|---|---|---|
| 1 | Ein Ergebnis wählen, das der Kunde und die Agentur freigegeben haben | Quelle der Probe | ein ungeliebtes Ergebnis festzuschreiben, verfestigt den Fehler |
| 2 | **Messen statt beschreiben**: Verhältnisse, Abstände, Radien, Schatten, Farbanteile, Kurven | Wertetabelle mit Beleg (`design-dna.mjs`, `42-referenzgrammatik-und-gap-audit.md`) | Adjektive tragen keine Information |
| 3 | Abwägen, welche Merkmale **tragen** und welche Zufall sind | Kurzliste | Alles festzuschreiben macht jede Variante zur Kopie |
| 4 | Regeln als Datei schreiben, benannte Layouts, bewusste Verzichte eingeschlossen | Regeldatei im Projekt | ein Verzicht ist oft die halbe Handschrift |
| 5 | **Prüfungen** schreiben, an denen eine schlechte Nachahmung scheitern würde | zum Beispiel Token-Skript, Farbanteil, Radiusliste | eine Regel ohne Prüfung ist eine Checkbox (`CLAUDE.md`) |
| 6 | Das Original **allein aus den Regeln** nachbauen lassen und mit dem Original vergleichen | Abweichungsliste | jede Abweichung zeigt eine fehlende Regel |
| 7 | Fehlende Regel ergänzen, Schritt 6 wiederholen | Probe bestanden | Ende, wenn der Nachbau nur noch in Details abweicht, die niemand vermisst |

Regelkategorien als Anhalt: Verhältnisse (Größenverhältnis, nicht nur Größe), Farbverteilung (Faustwert 60 30
10, `10-visuelle-richtung.md`), ungewöhnliche Entscheidungen, bewusste Verzichte, Schatten, Icons, Kurven,
benannte Layouts. Ein Goldener Schnitt oder ein anderes Zahlenverhältnis ist ein Fund, wenn er **gemessen**
wurde, keine Voraussetzung.

**Grenzen:**

* Die Probe läuft auf **eigenem, freigegebenem Material**. Mit einer fremden Referenz nur nach Tor 1, nur als
  Verständnis, und das Ergebnis geht über Tor 2 und den Qualitätsfilter aus Kapitel 25, nie direkt ins Projekt.
  Ein Nachbau einer fremden Seite ist keine Lieferung.
* Ein bestandener Rückbau zeigt, dass die Regeln das Ergebnis **beschreiben**, nicht, dass es **gut** ist.
  Die Güte kommt aus Kapitel 29 und der Abnahme durch einen Menschen.
* Die Regeln landen in Markenbrief und `marke.json` (`gestaltung`), nicht in einem fremden Markenskill
  (`../../agentur-website-builder/references/moodboard-und-stylescape.md`, Abschnitt 5a).
* Wo ein Kundenskill „im Stil einer bekannten Marke" bauen soll, gilt die harte Grenze zur Markenextraktion:
  Grammatik ja, Marke, Figuren, Inhalt nie.

Gilt für Seiten, Poster, HTML Mails und Bewegtgrafik. Die Probe kostet Zeit. Sie lohnt sich für Bausteine, die
mehrfach gebraucht werden (Heldenaufbau, Kartenfamilie, Mailkopf), nicht für eine einmalige Unterseite.

## 3. Pilot vor Vollproduktion

Bei teuren oder langen Assets (Bildserie, Video, Animation, Mailserie) zuerst **eine** Pilotvariante bauen und
freigeben lassen, dann den Rest. Grund: Ein Fehler in der Richtung wird sonst in jeder Variante bezahlt. Der
Pilot ist ein Tor, kein Entwurf zum Verwerfen: Seine Regeln werden Eingabe für den Rest (Anker aus
`39-ki-assets-bewegtbild-und-3d.md`, Schritt 3). Kosten und Budget: ebenda, Abschnitt 3a.

## 4. Figurenwelt und Asset Inventar

Braucht eine Marke wiederkehrende Figuren oder Objekte (Maskottchen, Illustrationsstil, Produktgrafik),
entsteht **vor** der Serie ein kleines System:

| Teil | Inhalt |
|---|---|
| Figurenliste | Wer und was kommt vor, mit Name |
| Bauregeln | Proportionen, Linienstärke, erlaubte Posen, Verzichte |
| Modellblatt | eine Ansicht, an der sich jedes neue Bild messen lässt |
| Palette | Farben aus `marke.json`, keine neuen |
| Bewegungsschleifen | zulässige Bewegungen (Dauer, Kurve), `41-motion-als-funktion-der-zeit.md` |
| Asset Inventar | Liste aller entstandenen Dateien mit Herkunft und Rechten (Protokoll aus Kapitel 39) |

Grund: Spätere Assets bleiben nur konsistent, wenn die Regeln nicht im Chatverlauf liegen. Für die Agentur: ein
Inventar je Kunde im Projekt, kein zentraler Bestand mit Kundenmaterial.

## 5. Was der Mensch behält

Vorschläge für Figur, Stil, Name, Richtung und Tonfall macht das Modell, **entschieden wird von einem
Menschen** (Kundenfreigabe, Tor 1). Merksatz aus den Videos: KI ersetzt Wiederholung im kreativen Prozess, nicht
die Entscheidung. Grund: Wer wählt, übernimmt die Verantwortung für die Marke, und eine Wahl, die niemand
getroffen hat, ist Zufall mit Freigabevermerk. Das gilt auch in der Polierschleife: Der Kritiker findet
Mängel, er wählt die Richtung nicht.

## 6. Die Schleife erklärt sich selbst

Nach einer Polierschleife (Kapitel 40) gehört zur Übergabe eine kurze zweite Datei: Was haben die Kritiker
geprüft, was haben sie gefunden, was wurde geändert, was blieb offen. Grund: Ohne sie weiß beim nächsten Mal
niemand, ob „bestanden" etwas bedeutet, und der Mensch, der abnimmt, liest den Bericht statt jedes Bild.

## 7. Eine eigene Referenzbibliothek

Wer Referenzen laufend sammelt (Screenshot, Adresse, Notiz), baut Geschmack auf. Im Projekt als Ordner mit
Notizen, die das Modell lesen darf. Zwei Regeln: Die Sammlung hat ein **Datum und eine Quelle je Eintrag**, und
Screenshots fremder Seiten sind **intern**, sie kommen nie auf eine Kundenseite und nie in die globale
Musterbibliothek (Bildrechte, `25-designmuster-bibliothek.md`, Grenze zur Kopie). Dass ein Mensch sie
gesammelt hat, ersetzt Tor 1 für das **Lesen**, nicht Tor 2 für die **Aufnahme als Muster**.

Ordnung, die das Wiederfinden trägt (aus dem Paket 4.18, dort „Taste Vault"): je Eintrag Designfamilie,
Quelle mit Adresse, Datum, Screenshotdatei, was übernommen wird (Rhythmus, Raster, Komposition), was nicht
(Inhalt, Logo, Figuren, Markenfarben) und ein Markenhinweis. Familiennamen sind Arbeitsbegriffe der Agentur,
kein Standard. Aus der Sammlung entstehen die Richtungen der Stufe A in
`48-richtung-varianten-und-subtraktion.md`, Abschnitt 3. Eine zentrale Sammlung der Agentur ist erlaubt,
solange sie kein Kundenmaterial enthält.

## 8. Nicht übernommen (mit Grund)

* Ein Skill, der „im Stil" einer bestehenden Marke erzeugt: harte Grenze zur Markenextraktion
* Bezahlte Community Angebote, Leitfäden, Werbe- und Affiliatehinweise der Videos
* Konkrete Zahlen zu Galeriegrößen, Preisen und Dauer: ungeprüft
* Das eingebaute Designkommando und der Apple Skill: Verfügbarkeit ungeprüft, siehe 4.11.0

Status: an keinem Projekt erprobt, kein Evalfall, das Δ ist eine Vermutung. Die Rückbauprobe hat in diesem
Repository kein Skript, `design-dna.mjs` liefert nur die Werte für Schritt 2.

## Verwandte Kapitel

`25-designmuster-bibliothek.md`, `29-pruefdurchgaenge-und-vokabular.md`, `39-ki-assets-bewegtbild-und-3d.md`,
`40-polierschleife-mit-kritiker.md`, `41-motion-als-funktion-der-zeit.md`, `42-referenzgrammatik-und-gap-audit.md`.
