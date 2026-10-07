# Polierschleife mit Kritiker (Gauntlet Loop)

`29-pruefdurchgaenge-und-vokabular.md` begrenzt die subjektiven Durchgänge vor der Übergabe auf
zwei. Dieses Kapitel beschreibt, **wie man einen solchen Durchgang mit mehreren Agenten
ausführt**, wenn der Aufwand es rechtfertigt: ein Bauagent und ein getrennter Kritikagent, die
gegeneinander iterieren, bis eine vorher festgelegte Latte erreicht ist. Es ist kein dritter
Durchgang, sondern eine Art, einen der zwei Durchgänge zu fahren.

Die Substanz stammt aus einem Video von Jay E (Kanal RoboNuggets, 06.08.2026), das ein Muster
von Matt Shumer beschreibt und sich auf den Artikel „Building effective agents" von Anthropic
(2024) beruft. Beide Quellen sind hier nicht im Original gelesen, der Inhalt ist aus dem
Transkript übernommen. Die Testergebnisse des Videos (3D Wohnung, Produktseite) sind
Einzelfälle des Autors, hier keine Belege. Die Vorlage ist eine eigene Formulierung.

## 1. Das Prinzip

| Teil | Inhalt | Grund |
|---|---|---|
| Aufgabe | was verbessert oder gebaut wird, auf einen Pfad und einen Umfang begrenzt | ohne Grenze verändert der Loop Dinge, die niemand prüfen wollte |
| Bauweise | der Hauptagent zerlegt in kleine Einheiten (eine Sektion), je Einheit ein Bauagent und ein **getrennter** Kritikagent, der nur das Ergebnis sieht (Screenshots), nicht die Gedanken des Bauagenten | ein Modell hält die eigene Ausgabe tendenziell für gut genug, ein getrennter Prüfer nicht |
| Latte | die Bedingung, ab der gestoppt wird, mit **Referenz**: Design System, Referenzseiten, Briefing | ohne etwas, woran der Kritiker scheitern kann, stimmt er zu |

## 2. Vorbedingungen, alle vier

Fehlt eine, wird die Schleife nicht gestartet.

1. Ein Entwurf steht (MVP) und das Design System liegt vor (`24-designsystem-vorrang.md`,
   `marke.json`). Die Schleife poliert, sie erfindet die Richtung nicht. Grund: Optimiert sie ohne
   Richtung, optimiert sie in die falsche.
2. Referenzen für den Kritiker sind benannt (freigegebene Referenzen aus der Designrecherche,
   Bilder, die Marke).
3. Das Briefing steht im Auftrag: Zielgruppe, Conversion-Ziel, Markenregeln. Grund: Im Beispiel des
   Videos sah die Seite am Ende gut aus, entsprach aber nicht der echten Marke. Gut aussehen ist
   nicht die Latte.
4. **Budget und Durchlaufgrenze stehen im Auftrag**: höchstens eine feste Zahl Durchläufe je
   Einheit, danach Stopp und Bericht. Der Wert ist `[[FEHLT: Durchläufe je Einheit]]`, bis das
   Projekt ihn festlegt. Kosten und Laufzeit sind im Video nicht genannt und hier ungemessen.

## 3. Der Kritiker

| Regel | Grund |
|---|---|
| Er soll das Ergebnis **widerlegen**, nicht bewerten, und gilt im Zweifel als durchgefallen | Bewerten führt zur Zustimmung. Das ist eine Ergänzung aus Zuschauerkommentaren, plausibel, nicht vom Kanal |
| Er prüft gegen feste Punkte: Abweichung vom Design System, Kontrast und Lesbarkeit, Abstand und Hierarchie, Abweichung vom Briefing, Vergleich mit der Referenz | ein Urteil ohne Maßstab ist Geschmack (`33-kundenpraesentation-und-feedback.md`) |
| Er sieht Screenshots bei 375 und 1440 px (`scripts/pruefe-breakpoints.mjs --bilder`), je Sektion als Ausschnitt | ein Ganzseitenbild verliert Details, ein Ausschnitt mit Zoom nicht |
| Er ändert nichts selbst | wer prüft, baut nicht, sonst fehlt die Trennung |

Die harten Grenzen aus `SKILL.md` und die Prüfskripte stehen **über** dem Kritiker. Ein Kritiker, der
ein Element lobt, das `pruefe-kontrast.mjs` verwirft, hat unrecht. Skripte laufen weiter nach jedem
Durchgang.

## 4. Verhältnis zur Obergrenze aus Kapitel 29

* Eine Schleife zählt als **ein** subjektiver Durchgang. Die Grenze von zwei bleibt.
* Die Durchlaufgrenze der Schleife ersetzt nicht die Grenze der Durchgänge, sie begrenzt nur den
  Aufwand innerhalb eines Durchgangs.
* Was der Kritiker nach der Grenze noch findet, geht als offener Punkt in die Übergabe.
* Nie als erster Prompt eines Projekts und nie auf der ganzen Seite auf einmal ohne Pfadgrenze.

## 5. Bericht und Mensch

Die Schleife liefert einen Bericht: vorher und nachher je Einheit, Status je Einheit (bestanden,
durchgefallen, Grenze erreicht), offene Punkte. Ein Mensch liest ihn und sieht die Seite an
(`../../agentur-website-builder/references/qa-und-abnahme.md`, Schritt 9). Das Modell, das gebaut hat, meldet
die Seite nicht als abgenommen.

## 6. Wann sich der Aufwand lohnt

| Lage | Schleife? |
|---|---|
| Heldenbereich oder Kernsektion mit Referenzbild, das erreicht werden soll | ja |
| Standardseite mit festem Design System und wenigen Sektionen | meist nein, ein Durchgang nach Kapitel 29 genügt |
| Kein Design System, keine Referenz | nein, erst Richtung klären |
| Rechtstexte, Formulare, Consent | nein, das prüfen Skripte und ein Mensch |

Ob die Schleife bessere Ergebnisse liefert als ein einzelner Durchgang, ist für dieses Repository
ungemessen. Das Δ ist eine Vermutung.

## 7. Nicht übernommen (mit Grund)

* Die Ergebnisse der beiden Tests des Videos als Beleg für Qualität: Einzelfälle.
* Der Name „Warp Drive" und die Wertung als Fähigkeit der neuesten Modelle: Werbesprache.
* Eine feste Zahl von Durchläufen: im Video nicht genannt, im Projekt festzulegen.

## Verwandte Kapitel

`29-pruefdurchgaenge-und-vokabular.md`, `24-designsystem-vorrang.md`, `26-geschmack-und-ki-tells.md`,
`33-kundenpraesentation-und-feedback.md`, Vorlage `../assets/vorlagen/prompts/polierschleife.md`.
