# Richtung in Varianten, Subtraktion und Fehlermodi

Ein Entwurf in einem Schuss ist der wahrscheinlichste Entwurf, nicht der beste. Dieses Kapitel regelt
drei Dinge, die zwischen Konzept und Abnahme fehlten: wie eine Richtung **in Varianten mit benanntem
Preis** gewählt wird, wie vor der Abnahme **weggenommen** statt ergänzt wird, und an welchen
**Fehlermodi** eine gebaute Seite trotz bestandener Skripte scheitert.

Quelle: Paket „Webdesign Workflow 2026" (Auswertung von 27 Videos über Transkripte, Stand 09.10.2026,
Kanäle in `CREDITS.md`, Version 4.19), gegen den Bestand 4.17.0 abgeglichen. Der größte Teil stand
schon: Interview vor dem Prompt, Referenzen mit zwei Toren, Kollage und Grammatiktabelle, Gap Audit,
Polierschleife mit fester Latte, Pilot vor Serie, Tweaks Panel, Blinzeltest, Änderungsauftrag mit
„Bleibt", KI-Tells, Consent, selbst gehostete Schriften. Hier steht nur, was fehlte, und am Ende,
was bewusst anders entschieden ist. Aussagen der Videos sind Erfahrungswerte der Autoren, die
meisten Videos sind gesponsert oder bewerben eigene Angebote.

## Inhalt

- 1\. Stellung im Ablauf
- 2\. Struktur vor Optik
- 3\. Varianten in zwei Stufen
- 4\. Die Preiszeile
- 5\. Subtraktionsrunde
- 6\. Fehlermodi, die kein Skript findet
- 6a. Prüfer ohne Vorwissen
- 7\. Signaturbewegung und Rechner
- 8\. Entschiedene Widersprüche
- 9\. Nicht übernommen (mit Grund)
- 10\. Status
- Verwandte Kapitel

## 1. Stellung im Ablauf

| Phase im Bauablauf | Neu aus diesem Kapitel | Abschnitt |
|---|---|---|
| 3 Konzept | Seitenstruktur mit Zuständen, Richtungen als Varianten mit Preis | 2, 3, 4 |
| 3 Stylescape | Stufe A und B nebeneinander, Wahl mit Grund in `marke.json` | 3 |
| 4 Umsetzung | Signaturbewegung vor dem Bau entschieden, Rechner nur mit echten Formeln | 7 |
| 5 Prüfung | Stresstest mit echtem Inhalt, Erzählbruch, Prüfer ohne Vorwissen, Subtraktionsrunde | 5, 6 |
| jede Änderung | Auftrag nummeriert, am Ende gezählt | `../../agentur-website-builder/references/aenderungsrunden-und-layoutschutz.md` |

## 2. Struktur vor Optik

Die Freigabe der Seitenstruktur ist Teil der Konzeptfreigabe in Phase 3 (Seitenstruktur, Sektionen mit
Zweck und Aufforderung). Daran ändert sich nichts. Neu sind zwei Pflichtinhalte und ein Auslöser:

| Regel | Grund |
|---|---|
| Je Sektion steht im Konzept, welche Information wohin kommt, bevor eine Fläche gestaltet wird | wer „baue eine Website" schreibt, bekommt die Struktur des Modells statt der des Besuchers |
| Formulare, Buchung und Rechner bekommen ihre Zustände im Konzept: leer, Laden, Fehler, Erfolg | Zustände, die erst beim Bau auffallen, werden im Stil des ersten Einfalls gelöst |
| Eine Graustufenskizze (Wireframe) entsteht, wenn der Kunde über Struktur entscheidet oder mehr als ein Seitentyp entsteht | dort ist ein Fehler in der Skizze billig und im Code teuer. Sonst reicht die ASCII Skizze aus `10-visuelle-richtung.md` |
| Rückmeldungen zur Skizze werden gesammelt und an Elementen verankert, nicht einzeln | die Kommentarfunktion eines Werkzeugs schickt das markierte Element mit, ein Chatsatz nicht |

Ein drittes Tor für Wireframes ist **nicht** eingeführt, Begründung in Abschnitt 8.

## 3. Varianten in zwei Stufen

Mehrere Autoren kommen unabhängig auf denselben Schritt: nicht eine Fassung, sondern vergleichbare
Fassungen nebeneinander. Das gilt für die **Startsektion oder Startseite**, nicht für jede Unterseite.

| Stufe | Was | Menge (Vorschlag) | Entscheidet |
|---|---|---|---|
| A Richtungen | verschiedene Designfamilien desselben Inhalts, zum Beispiel aus den Richtungen in `37-stilrichtung-nach-kundensprache.md` oder der eigenen Sammlung (`44-gutes-festschreiben-und-rueckbauprobe.md`, Abschnitt 7) | bis zu fünf | Agentur, bei Bedarf Kunde über die Stylescape |
| B Varianten | innerhalb der gewählten Richtung, je ein Hebel: Bildanteil, Farbgewicht, Texteinstieg, Dichte | drei | Agentur oder Kunde |
| C Feinregler | einzelne Werte am Bildschirm über das Reglerpanel, nur im Entwurf | so viele wie nötig | Agentur, Werte danach in `tokens.css` |

Regeln, die für alle Stufen gelten:

| Regel | Grund |
|---|---|
| Richtungen unterscheiden sich in Komposition, Schriftgewicht, Dichte, Raster und Bildanteil, **nie** in Markenfarben, Markenschrift oder Logo | das Kundendesignsystem schlägt jede Variante wie jede Referenz (`24-designsystem-vorrang.md`) |
| Echte Inhalte aus Markenbrief und Copy, keine Platzhalterzahlen, Lücken als `[[FEHLT: …]]` | eine Variante, die mit erfundenem Inhalt besser aussieht, wird mit echtem schlechter |
| Jede Variante bekommt die Preiszeile aus Abschnitt 4, ohne sie keine Wahl | wer nur Bilder vergleicht, wählt nach Geschmack (`33-kundenpraesentation-und-feedback.md`) |
| Die Wahl steht danach mit Grund in `marke.json` unter `gestaltung.richtungswahl`, die verworfenen Richtungen mit einem Satz | sonst schlägt die nächste Sitzung eine verworfene Richtung erneut vor |
| Varianten vor dem Bau sind keine Prüfdurchgänge | die Obergrenze von zwei subjektiven Durchgängen aus `29-pruefdurchgaenge-und-vokabular.md` gilt nach dem Bau und bleibt |

Die Mengen fünf und drei sind Vorschläge der Autoren. Die Begründung eines Autors (eine Fassung ist
ein Schuss, zwei sind Entweder Oder, vier verwirren) ist Meinung, nicht gemessen. Ein Autor sah bei
einem starken Modell mit guten Referenzen kaum Unterschied zwischen Läufen mit und ohne Designskill,
ein Einzelbeispiel. Deshalb hängt die Qualität an Referenzen und Wahl, nicht an der Zahl.

Vorlage: `../assets/vorlagen/prompts/varianten.md`.

## 4. Die Preiszeile

Jede Variante, jede Richtung und jede Alternative in einer Sektion bekommt fünf Zeilen:

```
Variante:   ‹Name, sachlich, kein Werbewort›
Struktur:   ‹eine Spalte, Raster, Reiter, waagerecht scrollende Reihe, Text neben Bild›
Stärke:     ‹was sie leicht macht›
Preis:      ‹was sie schwer macht: mehr Scrollen, weniger Platz für viele Einträge, Bild erst spät›
Passt wenn: ‹Zielgruppe, Gerät, Inhaltsmenge›
```

| Beispiel | Stärke | Preis |
|---|---|---|
| Reiter mit Raster | gut scanbar, viel Inhalt auf wenig Höhe | Wechsel kostet einen Klick, Inhalte hinter Reitern werden seltener gesehen |
| eine Spalte | ruhig, gut auf dem Handy | ab etwa fünfzig Einträgen unübersichtlich |
| Schnellwechsel (Karussell, Umschalter) | spart Platz | zeigt immer nur einen Teil, Bedienung per Tastatur nötig |
| Text zuerst, Bild weiter unten | Aussage sofort lesbar | der erste Bildschirm ist ein Textblock, das erste Foto kommt spät |

Grund: Ein Preis, der ausgesprochen ist, wird bewusst bezahlt. Ein Preis, der nicht ausgesprochen ist,
fällt dem Kunden nach der Freigabe auf.

## 5. Subtraktionsrunde

Gestaltung beginnt unordentlich und wird durch Weglassen klar. Vor der Abnahme läuft eine Runde, in
der nur gestrichen wird, nicht ergänzt. Sie ist Teil eines der zwei subjektiven Durchgänge aus
`29-pruefdurchgaenge-und-vokabular.md` (Richtung „ruhiger"), kein dritter.

Drei Fragen je Element:

1. Hilft es der benannten Zielgruppe bei der benannten Aufgabe (Lesart, `26-geschmack-und-ki-tells.md`)?
2. Ist es Information oder Dekoration?
3. Was fehlt dem Besucher, wenn es fehlt?

| Typisches Rauschen | Prüfung |
|---|---|
| Kicker ohne Information, Zierzähler, Zählung auf Kacheln | `pruefe-geschmack.mjs`, Katalog in Kapitel 26 |
| eine zweite Animation in derselben Sektion | jede Bewegung hat einen Satz (`30-motion-pruefung.md`) |
| eine dritte Schriftfamilie | höchstens zwei (`10-visuelle-richtung.md`) |
| Sektion für „uns" statt für den Besucher | Abschnitt 6 in Kapitel 26 |
| ungefragte Ergänzung des Modells | `../../agentur-website-builder/references/qa-und-abnahme.md`, Schritt 8 |
| Glasflächen, Verläufe, Glühen ohne Aufgabe | `pruefe-geschmack.mjs`, Kapitel 26 Abschnitt 9 |

Ausgabe ist eine Liste mit Element, Grund und Vorschlag. Gestrichen wird nach Entscheidung, nicht von
selbst: Ein Element, das der Kunde verlangt hat, bleibt, bis er es streicht. Prüfprompt:
`../assets/vorlagen/prompts/pruefprompts.md`.

## 6. Fehlermodi, die kein Skript findet

Die Prüfskripte finden kaputte Seiten, nicht falsche. Diese Fehler bestehen jede Prüfung und fallen
erst dem Besucher auf:

| Fehlermodus | Erkennen | Gegenmittel |
|---|---|---|
| **Kontextfremdes Bild:** das Motiv passt nicht zur Aussage, oder ein Foto stammt von einem anderen Anlass | jedes Bild einzeln neben seine Überschrift legen, Herkunft in `public/images/BILDER.md` nachsehen | Motiv tauschen oder `[[FEHLT: Motiv]]`. Ein falsches echtes Foto ist ein Beleg, den es nicht gibt (harte Grenze) |
| **Funktion fehlt trotz richtigem Aussehen:** Bauteil sieht aus wie bestellt, ist aber statisch, reagiert nicht oder läuft auf dem Handy aus dem Rahmen | jedes interaktive Element bedienen, auf 375 und 1440 px, mit Tastatur | Verhalten so genau beschreiben wie Aussehen: was passiert bei Klick, Scroll, Fokus, auf dem Handy. Eine Referenz mit Bewegung nachreichen |
| **Erzählbruch:** Heldbild, Überschrift und erste Sektion erzählen verschiedene Geschichten, der Blick landet auf einem Nebenelement | Screenshot verkleinern: wohin geht der Blick zuerst? Passt das Bild zur Überschrift ohne Text daneben? | Bild oder Überschrift tauschen, Nebenelement leiser. Blinzeltest aus Kapitel 26, Punkt 13 |
| **Layout bricht bei echtem Inhalt:** Platzhalter waren kurz, echte Titel, Namen und Preise sind lang | Stresstest mit der kürzesten und der längsten echten Zeichenfolge je Feld (längster Leistungsname, längster Ortsname, längste Bewertung) | Umbruch, Mindest- und Höchstbreiten im Bauteil, nicht im Inhalt kürzen. Nie Text abschneiden, um ein Layout zu retten |
| **Text vor Bild:** das erste echte Foto kommt erst nach mehreren Bildschirmen | erste zwei Bildschirme auf dem Handy ansehen | echtes Bildmaterial früh, Text danach oder daneben |
| **Nachbardrift:** eine Änderung verschiebt Abstände anderer Sektionen | Nachbarsektionen nach jeder Änderung ansehen | Änderungsauftrag mit „Bleibt" und Zählung, `../../agentur-website-builder/references/aenderungsrunden-und-layoutschutz.md` |
| **Ziel fehlt:** Formular nicht angebunden, Knopf führt auf die falsche Seite | Durchlauf wie ein Nutzer | `../../agentur-website-builder/references/qa-und-abnahme.md`, Schritt 4 |

Der Stresstest nutzt echte Werte des Kunden. Gibt es sie noch nicht, wird mit der längsten
plausiblen Zeichenfolge geprüft, die **nicht** auf die Seite kommt.

## 6a. Prüfer ohne Vorwissen

Das Modell, das gebaut hat, ist der schwächste Prüfer seiner eigenen Arbeit (`../../agentur-website-builder/references/qa-und-abnahme.md`,
Schritt 9). Ein Prüfer in frischem Kontext (Unteragent oder neue Sitzung) bekommt nur Screenshots bei
375 und 1440 px, keinen Code und keinen Verlauf, und beantwortet je Punkt mit Wert, Beleg im Bild und
kleinster Korrektur:

1. Was ist das, für wen, was soll ich tun? (drei Sekunden)
2. Bleibt beim Verkleinern eine Rangfolge? (Blinzeltest)
3. Passt jedes Bild zur Aussage seiner Überschrift?
4. Welche Elemente sind Rauschen?
5. Welche Muster aus dem Katalog in Kapitel 26 siehst du?

Jeder Wert unter 10 nennt einen Mangel, sonst ist er Zustimmung (Kapitel 40, Abschnitt 3a). Der Prüfer
ändert nichts. Er ist eine Art, einen der zwei Durchgänge zu fahren, und steht unter den harten Grenzen
und den Skripten. Vorlage: `../assets/vorlagen/prompts/pruefprompts.md`.

## 7. Signaturbewegung und Rechner

Die eigene Handschrift verlangt einen Abschnitt, der für genau dieses Unternehmen gebaut ist (harte
Grenze), und `37-stilrichtung-nach-kundensprache.md` erlaubt ein Signaturelement. Wird es eine
Bewegung, sind vor dem Bau fünf Fragen beantwortet:

| Frage | Grund |
|---|---|
| Welche Aufgabe erfüllt sie für den Besucher (Beleg zeigen, Ablauf erklären, Material zeigen)? | ohne Aufgabe fliegt sie in der Subtraktionsrunde |
| Gesteuert durch Scrollen, automatisch im Hintergrund oder als eigene Sektion? | bestimmt Technik, Steuerung und Pause (WCAG 2.2.2, `41-motion-als-funktion-der-zeit.md`) |
| Bei einer Schleife: sind erstes und letztes Bild gleich? | sonst springt sie bei jedem Durchlauf |
| Poster, Datenmenge, Fassung für das Handy? | `38-scrollvideo-und-einbettungen.md` |
| Wo ist die Seite ruhig, wo intensiv? | eine intensive Stelle trägt nur, wenn die übrigen ruhig sind (`43-hierarchie-raster-komposition.md`) |

**Rechner und Angebotswerkzeuge** sind ein starker Baustein, wenn sie eine echte Frage des Besuchers
beantworten. Formeln, Preise und Spannen kommen vom Kunden. Im Entwurf stehen Beispielwerte nur
sichtbar als `[[FEHLT: Formel und Preise vom Kunden]]`, nie als plausible Zahl. Ein Rechner mit
erfundenen Preisen ist eine Preisangabe, die der Kunde nicht gemacht hat.

## 8. Entschiedene Widersprüche

| Das Paket sagt | Hier gilt | Grund |
|---|---|---|
| Eingabepaket aus vier Dateien: Markenbrief, `design.md`, `copy.md`, Asset Inventar | `marke-brief.md` und `marke.json` bleiben die eine Quelle, das Asset Inventar ist `public/images/BILDER.md` mit Lizenz und KI-Kennzeichnung | zwei Dateien für dieselbe Entscheidung laufen auseinander, und die Regel „der Markenbrief als einzige Quelle" in `SKILL.md` hat genau diesen Grund |
| Fehlende Angaben mit „Bestätigen" markieren | `[[FEHLT: …]]` | `pruefe-platzhalter.mjs --launch` findet die Markierung und hält den Livegang auf, ein frei gewähltes Wort nicht |
| Tor 3: Wireframe-Freigabe als Pflicht | Struktur wird mit dem Konzept in Phase 3 freigegeben, Graustufenskizze nur bei Auslöser (Abschnitt 2) | „Tor 1" und „Tor 2" bezeichnen hier die zwei Freigaben der Designrecherche. Ein drittes Tor mit anderer Bedeutung verwechselt beide, und `../../agentur-website-builder/references/moodboard-und-stylescape.md`, Abschnitt 4, hat den Pflichtschritt mit Grund abgelehnt |
| Eine Änderung je Prompt, fünf Aufgaben in einem Prompt werden zu zwei erledigten | Korrekturen einer Runde gebündelt, aber nummeriert und am Ende gegen den Auftrag gezählt | der Befund des Videos stimmt, die Antwort ist die Zählung, nicht zehn getrennte Durchläufe mit zehn Gelegenheiten für Nachbardrift |
| Schriftpaarungen Playfair Display mit Inter, Poppins mit Work Sans, DM Serif Display mit Inter, Merriweather mit Roboto | nicht übernommen | Inter, Poppins und Roboto sind ohne Markenvorgabe gesperrt (harte Grenze), Playfair nur mit Begründung (`45-huerde-laenge-und-leserfuehrung.md`, Abschnitt 10) |
| Hero „innerhalb von 100 vh" | `100svh` | harte Grenze und `16-responsive-container.md` |
| Humanisieren mit einem zweiten Modell | bleibt erlaubt (`../../agentur-website-builder/references/copy-im-kundenprojekt.md`), aber Kundentexte nur an einen Anbieter mit geklärter Auftragsverarbeitung | ein Text des Kunden ist nicht automatisch frei für jeden Dienst (`07-recht-dsgvo.md`) |
| Geschmackssammlung („Taste Vault") zentral | erlaubt, wenn sie keine Kundendaten enthält; Kundenmaterial bleibt im Projekt | `44-gutes-festschreiben-und-rueckbauprobe.md`, Abschnitte 4 und 7: fremde Screenshots sind intern, Kundenmaterial gehört dem Kunden |
| Glatter Scroll (Lenis), Scroll-Hijacking | nur nach Test mit Tastatur, Ankern, Fokus und reduzierter Bewegung | `09-motion-gsap.md`, `30-motion-pruefung.md` |
| Die Quelle heiße „watchships.com", die Schreibweise im Bestand sei ein Hörfehler | `whatships.com` bleibt | am 09.10.2026 geprüft: whatships.com ist ein Verzeichnis von Launchvideos, watchships.com eine Ferienwohnung. Dabei gefunden: `styles.referero.design` in Kapitel 22 war ein Tippfehler, richtig ist `styles.refero.design` |
| Schwere Schritte nur per Slash-Befehl starten (`disable-model-invocation`) | nicht für die zwei Skills dieses Plugins | sie müssen beim Bauen von selbst greifen, sonst gelten die harten Grenzen nur, wenn jemand daran denkt |
| Höchstens ein bis zwei fremde Skills, und nur als Prüfer | offen | Phase 0 installiert sieben Quellskills als Agenturvorgabe. Das kehrt dieses Kapitel nicht still um, die Entscheidung steht als offener Punkt in `CLAUDE.md` |

## 9. Nicht übernommen (mit Grund)

* Zahlen der Autoren (Kosten, Dauer, Sterne, Prozentwerte wie „176 Prozent mehr"): Eigenangaben, nicht geprüft.
* Modell-, Werkzeug- und Menünamen als Empfehlung: veralten in Wochen.
* Hosting auf Vercel, Netlify oder Replit und Next.js: der Stack ist fest.
* Der Interaktionskatalog (Vorhang im Fuß, Mauszeiger folgender Fuß, Minispiel auf der 404): Effekt vor
  Zweck. Eine Interaktion entsteht aus einer Erlebnisidee (`38-scrollvideo-und-einbettungen.md`, Abschnitt 1a).
* Seriflose Schrift als Pauschalregel: Autorenvorliebe, das Paket nennt sie selbst so.
* Drei Schriftkandidaten statt zwei: Kapitel 10 bleibt bei zwei mit Begründung, die dritte Schrift
  entsteht in Stufe B als Variante, wenn nötig.

## 10. Status

An keinem Projekt erprobt. Evalfall `varianten-mit-preis` am 09.10.2026 mit zwei Läufen je Arm gemessen:
ohne Skill 1,00, mit Skill 0,75, und der Skill wurde in keinem Lauf aufgerufen. Das heißt: Das aktuelle
Modell nennt Preise und hält die Marke bei dieser Frage schon allein, der Abschnitt 4 trägt dort messbar
nichts bei. Er bleibt vorerst, weil er die Wahl festhält (`gestaltung.richtungswahl`), ist aber
Kandidat zum Kürzen bei der nächsten Durchsicht nach `../../../evals/modellwechsel.md`. Der Rest des
Kapitels hat keinen Evalfall. Die neuen Prüfungen in `pruefe-geschmack.mjs` (getippte Logoleiste, kursives
Akzentwort, Violettverlauf, Glasflächen), `pruefe-geo.mjs` (Bild ohne alt) und `pruefe-striche.mjs`
(Bindestrich mit Leerzeichen, Hook) sind gegen Fixtures geprüft, nicht gegen ein Kundenprojekt.

## Verwandte Kapitel

`10-visuelle-richtung.md`, `24-designsystem-vorrang.md`, `26-geschmack-und-ki-tells.md`,
`29-pruefdurchgaenge-und-vokabular.md`, `33-kundenpraesentation-und-feedback.md`,
`37-stilrichtung-nach-kundensprache.md`, `40-polierschleife-mit-kritiker.md`,
`42-referenzgrammatik-und-gap-audit.md`, `44-gutes-festschreiben-und-rueckbauprobe.md`,
`../../agentur-website-builder/references/moodboard-und-stylescape.md`,
`../../agentur-website-builder/references/qa-und-abnahme.md`.
