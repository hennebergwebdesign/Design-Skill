# Baukasten: Abschnitte der Vorlagen

Erzeugt von `scripts/bibliothek-abschnitte.mjs --schreiben`, nicht von Hand pflegen. Quelle ist je Vorlage die Datei `ABSCHNITTE.json`.
Auswahl: Vorlage und Kennung nennen ("t113, faq"), das Skript liefert Selektor, CSS, JS und Hinweis zum Herauslösen.
Ein Abschnitt wird als Prinzip übernommen und in die Marke des Kunden gesetzt (`marke.css`), nicht mit Text, Bild oder Farbe der Vorlage.

## Nach Kategorie

### about

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t114 Kaffeeabo mit Karten über Fotobühne | `einstieg` | Eine ruhige Zweispalte erklärt in einem Satz, was der Dienst dem Besucher abnimmt, bevor das Angebot beginnt. |
| t117 Studiobühne mit Fallstudienliste | `intro` | Eine kleine Figur und drei Sätze geben dem Studio ein Gesicht, bevor die Leistungen kommen. |

### benefits

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t113 Nachunternehmerprüfung im Bau | `wortlicht` | Der Absatz fasst den Nutzen in zwei Sätzen und wird beim Scrollen Wort für Wort gelesen, statt überflogen zu werden. |
| t117 Studiobühne mit Fallstudienliste | `werte` | Vier gleich große Karten mit Nummer und Symbol machen Haltung in Sekunden erfassbar, Scroll Snap und Pfeile lassen den Rest zu. |

### cases

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t116 Produktfamilie im Feldversuch | `transparenz` | Wer offen zeigt, was noch läuft, und begründet, warum, gewinnt mehr Vertrauen als mit fertigen Erfolgsmeldungen. |
| t117 Studiobühne mit Fallstudienliste | `projekte` | Jede Zeile gibt Bild, Branche, Titel, Kurztext und genau eine Handlung, die Überschrift bleibt oben stehen und gibt Orientierung. |
| t118 Projektentwickler mit Bewegtbild Held | `projekt-gross` | Ein Projekt in voller Breite nach dem Raster gibt dem Besten mehr Gewicht und beendet die Liste mit einem Bild, an das man sich erinnert. |

### comparison

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t113 Nachunternehmerprüfung im Bau | `vergleich` | Die Aussage bleibt stehen, während rechts vier Belegkarten vorbeiziehen, jede mit einem anderen Beweis (Prüfpunkte, Erinnerung, Zeitgewinn, Nachweis). |

### cta

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `schluss` | Eine Aussage und ein einziger, übergroßer Knopf auf dem Verlauf des Anfangs schließen den Bogen, zwei schwebende Taler halten das Zeichen des Manifests. |
| t115 Strandgut mit Wortmarke | `leiste` | Eine schmale feste Leiste hält den Weg zur Anfrage offen, sobald der Held verlassen ist, und weicht, wo sie Eingaben verdecken würde. |
| t117 Studiobühne mit Fallstudienliste | `abschluss` | Ein Lichtverlauf von unten schließt die dunkle Bühne, die Karte bündelt Aussage, vier Felder und einen Knopf. |
| t118 Projektentwickler mit Bewegtbild Held | `abschluss` | Eine ruhige weiße Karte mit einem Satz, zwei Wegen (Projekt, Stellen) und einem Bild schließt die Seite menschlich ab. |

### editorial

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `manifest` | Pro Bildschirm ein einziger Satz, gepinnt und vom Scrollweg gesteuert, macht aus Lesen ein Blättern, und fallende Zeichen geben dem Weg ein Tempo, ohne dass ein Wort mehr dasteht. |
| t112 Wertegemeinschaft App mit Manifest | `satzband` | Ein riesiger Satz, der über den Scrollweg quer durchs Bild läuft, erzeugt Tempo und Betonung mit einer einzigen Zeile und kostet nur einen transform. |
| t114 Kaffeeabo mit Karten über Fotobühne | `ratgeber` | Fünf Beitragskarten mit eigenen Zeichnungen zeigen Fachwissen und halten Besucher im Haus, die noch nicht kaufen. |
| t115 Strandgut mit Wortmarke | `einstieg` | Ein langer, ruhiger Satz auf Creme erklärt den Ort in einem Atemzug, der Streifen mit rissigen Bildkanten lädt zum Weiterschauen ein. |
| t116 Produktfamilie im Feldversuch | `name` | Der Produktname als Fläche prägt sich ein und trennt die Erklärung vom Beleg, die langsame Drift gibt Tiefe. |
| t116 Produktfamilie im Feldversuch | `beitraege` | Eine seitlich blätterbare Reihe zeigt Lebendigkeit und lässt Platz für mehr, ohne die Seite zu verlängern. |
| t118 Projektentwickler mit Bewegtbild Held | `aussage` | Eine einzige Zeile in Plakatgröße, vor die sich Menschen auf Fotos schieben, gibt der Marke ein Gesicht, bevor Zahlen oder Leistungen kommen. |

### faq

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `fragen` | Sechs Einwände vor dem Laden (Kosten, Geld, Auswahl, Daten, Einlösen, fehlender Betrieb) räumen die Gründe für Zögern ab, Antworten sind als Beispiel markiert. |
| t113 Nachunternehmerprüfung im Bau | `fragen` | Einwände lesen sich wie ein Gespräch: Frage rechts, Antwort links, das senkt die Hemmung nachzufragen, und echte details bleiben für Tastatur und Screenreader bedienbar. |
| t114 Kaffeeabo mit Karten über Fotobühne | `fragen` | Titel links und Akkordeon rechts halten die Einwände kurz und überfliegbar, das Telefon steht daneben. |
| t115 Strandgut mit Wortmarke | `fragen` | Die häufigsten Einwände vor der Buchung stehen offen im Seitenverlauf und lassen sich ohne Skript aufklappen. |
| t116 Produktfamilie im Feldversuch | `fragen` | Die sechs Einwände vor der Anfrage stehen im Akkordeon, die Antworten nehmen Risiko weg. |
| t117 Studiobühne mit Fallstudienliste | `faq` | Die sechs häufigsten Einwände stehen vor dem Gespräch, jeweils eine Antwort offen, die anderen zu. |
| t118 Projektentwickler mit Bewegtbild Held | `faq` | Die sechs Fragen, die vor einer Anfrage bremsen, stehen beantwortet vor dem Formular und nehmen ihm die Hürde. |

### features

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `funktionen` | Vier schlichte Karten um ein Handy in der Mitte zeigen fünf Funktionen mit je einer Zeichnung und zwei Sätzen, auf dem Handy stapeln sich die Karten beim Scrollen. |
| t113 Nachunternehmerprüfung im Bau | `karten` | Jede Funktion wird als echte Oberfläche gezeigt statt beschrieben, drei Kartenformate halten das Auge in Bewegung. |
| t115 Strandgut mit Wortmarke | `bildstapel` | Vollflächige Fotos schieben sich übereinander und tragen ihre Beschreibung selbst, so wird jede Rubrik ein Ort statt einer Kachel. |
| t116 Produktfamilie im Feldversuch | `merkmale` | Drei kurze Karten mit versetzter Höhe tragen die Kernmerkmale, der Versatz bricht das Raster auf, ohne zu unterhalten. |

### footer

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `fuss` | Der Fuß sagt offen, dass die Seite keine Cookies setzt, und beschreibt, wie ein echter Einwilligungsdialog aussehen müsste, statt eine Leiste vorzutäuschen. |
| t113 Nachunternehmerprüfung im Bau | `fuss` | Drei Linkspalten und ein wiederholter Primärknopf: wer bis hier liest, findet den Abschluss ohne Zurückscrollen. |
| t114 Kaffeeabo mit Karten über Fotobühne | `fuss` | Der Fuß wiederholt den Hauptknopf auf einer dunklen Bühne und verzeichnet Kategorien, Wissen und Kontakt. |
| t115 Strandgut mit Wortmarke | `fuss` | Navigation in Großschrift und die Wortmarke über die ganze Breite geben dem Seitenende ein Gewicht, das bleibt. |
| t116 Produktfamilie im Feldversuch | `fuss` | Die Fußzeile wiederholt Knopf und Kontakt und verlinkt auf die Inhalte, statt Rechtliches zu verstecken. |
| t117 Studiobühne mit Fallstudienliste | `fuss` | Kontakt, Seiten und Pflichtangaben stehen ruhig an einer Stelle, der Knopf wiederholt die Handlung. |
| t118 Projektentwickler mit Bewegtbild Held | `fuss` | Ein dunkler Fuß mit Adresse, Übersicht, Telefon und Wortmarke gibt der hellen Seite einen festen Abschluss. |

### forms

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `betriebe` | Die zweite Zielgruppe bekommt einen eigenen dunklen Abschnitt mit Gespräch statt Formularkrieg, fünf Felder und Feldhinweisen. |
| t112 Wertegemeinschaft App mit Manifest | `brief` | Ein Feld und ein Haken: die kleinste mögliche Anmeldung, mit Hinweis auf Bestätigung und Abmeldung statt Versprechen. |
| t113 Nachunternehmerprüfung im Bau | `kontakt` | Letzter Handlungsschritt auf dunkler Fläche, fünf Felder mit Hinweisen unter E-Mail und Telefon, daneben die direkte Telefonnummer. |
| t114 Kaffeeabo mit Karten über Fotobühne | `beratung` | Das Foto zeigt den Menschen hinter dem Gespräch, das kurze Formular senkt die Hürde zum ersten Kontakt. |
| t115 Strandgut mit Wortmarke | `anfrage` | Fünf Felder mit Hinweis unter E-Mail und Telefon senken die Hürde, der Kontakt steht daneben für alle, die lieber anrufen. |
| t116 Produktfamilie im Feldversuch | `anfrage` | Der Abschluss wiederholt die Kernaktion auf ruhigem Grün mit fünf Feldern und sichtbarem Telefon, die Kacheln geben Fläche ohne Ablenkung. |
| t117 Studiobühne mit Fallstudienliste | `einwilligung` | Datenschutzwahl liegt offen im ersten Bildschirm, nichts vorausgewählt, Ablehnen und Annehmen gleich gewichtet. |
| t118 Projektentwickler mit Bewegtbild Held | `anfrage` | Fünf Felder mit Hinweisen und sichtbarem Telefon senken die Hürde und zeigen, was nach dem Absenden passiert. |

### hero

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `held` | Eine große, leichte Überschrift links gegen zwei überlappende, leicht gekippte Handys rechts zeigt Produkt und Haltung auf einen Blick, der Vollflächenverlauf gibt Stimmung ohne Foto. |
| t113 Nachunternehmerprüfung im Bau | `hero` | Ein heller Kasten gibt der Überschrift auf jedem Foto Kontrast, und der Knopf sitzt im selben Kasten, also dort, wo der Blick endet. |
| t114 Kaffeeabo mit Karten über Fotobühne | `hero` | Ein Foto füllt die Fläche, eine große Aussage steht mittig, und die Produktkarte unten links gibt dem Besucher sofort etwas Konkretes zum Anklicken. |
| t115 Strandgut mit Wortmarke | `held` | Ein vollflächiges Foto, eine kleine Aussage und ein Wort in Plakatgröße, das unten abgeschnitten wird, machen den Ort zur Marke, bevor etwas erklärt wird. |
| t116 Produktfamilie im Feldversuch | `held` | Ein gezeichnetes Produkt auf einer ruhigen Bühne gibt dem Auge einen Mittelpunkt, die Überschrift steht oben links, die Aktion unten rechts, Presse und Partner am Rand schaffen Vertrauen ohne Raum zu nehmen. |
| t117 Studiobühne mit Fallstudienliste | `held` | Zentrierte Aussage mit Zielgruppe, Problem und Lösung auf ruhiger Bühne, der Lichtverlauf führt den Blick zur Überschrift und zu zwei Handlungen. |
| t118 Projektentwickler mit Bewegtbild Held | `held` | Das Bild füllt zuerst alles und tritt beim Scrollen zurück, sodass der Besucher vom Eindruck in die Seite geführt wird, während Aussage und zwei Knöpfe stehen bleiben. |

### interactive

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t113 Nachunternehmerprüfung im Bau | `funktionsliste` | Eine Funktion nach der anderen im Fokus, das Gerät zeigt zu jedem Punkt den passenden Bildschirm, ohne dass jemand klicken muss. |
| t116 Produktfamilie im Feldversuch | `loesung` | Die Frage aus dem Problem wird auf derselben Bühne beantwortet, während das Produkt kleiner wird; der Wechsel erzählt die Wende ohne Seitenwechsel. |
| t116 Produktfamilie im Feldversuch | `einsatz` | Das Produkt wandert durch eine gezeichnete Bodenschicht, vier Beschriftungen erklären jeden Schritt genau dort, wo er passiert. |
| t116 Produktfamilie im Feldversuch | `standorte` | Liste und Karte hängen zusammen: wer einen Eintrag wählt, sieht den Ort, wer den Punkt wählt, liest die Kultur. |

### navigation

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `kopf` | Die Leiste liegt als helle Schrift auf dem Verlauf und nimmt keinen eigenen Balken, damit der erste Bildschirm ganz der Aussage gehört und der Download Knopf trotzdem oben bleibt. |
| t113 Nachunternehmerprüfung im Bau | `kopf` | Zwei getrennte Flächen über dem Foto (Marke links, Menü und Knopf rechts) lassen das Bild frei, und der Primärknopf bleibt immer erreichbar. |
| t114 Kaffeeabo mit Karten über Fotobühne | `ankuendigung` | Eine schmale Zeile über allem trägt das eine zeitlich begrenzte Angebot, ohne den Held zu verdrängen. |
| t114 Kaffeeabo mit Karten über Fotobühne | `kopf` | Die Leiste schwebt als dunkle Karte über dem Foto und bleibt beim Scrollen oben, der Hauptknopf ist immer erreichbar. |
| t115 Strandgut mit Wortmarke | `kopf` | Nur Text in der Navigation und ein heller Knopf rechts lassen das Foto atmen, der Kopf wird erst beim Scrollen zur festen Fläche. |
| t116 Produktfamilie im Feldversuch | `kopf` | Die Leiste stört das Heldbild nicht und wird erst fest, wenn sie über Inhalt liegt; der Primärknopf bleibt immer erreichbar. |
| t117 Studiobühne mit Fallstudienliste | `kopf` | Menü in der Mitte, Primärknopf rechts bleiben beim Scrollen erreichbar und tragen Telefon und Handlung. |
| t118 Projektentwickler mit Bewegtbild Held | `kopf` | Eine abgesetzte Leiste bleibt über jedem Abschnitt erreichbar und trägt Menü, Telefon und Primär CTA, ohne den Bildschirm zu teilen. |

### portfolio

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t115 Strandgut mit Wortmarke | `abzuege` | Weiße Rahmen mit Bildunterschrift und leichte Drehung erinnern an Abzüge aus dem Urlaubsalbum und geben dem Raster Wärme. |
| t118 Projektentwickler mit Bewegtbild Held | `projekte` | Große Bildkarten tragen Sparte und Status als Pillen direkt im Bild, sodass der Besucher ohne Klick einordnet, was fertig, im Bau oder frei ist. |

### problem

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t116 Produktfamilie im Feldversuch | `problem` | Eine einzige große Zahl mit Quelle macht den Schmerz greifbar und glaubwürdig, das Foto bleibt Stimmung. |

### process

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `ablauf` | Vier Schritte, von denen einer offen steht, beantworten die Frage nach dem Download in drei Minuten Lesezeit und nehmen die Scheu vor dem Anfangen. |
| t114 Kaffeeabo mit Karten über Fotobühne | `ablauf` | Eine riesige Überschrift auf dunklem Bild und drei versetzte Schritt Tafeln machen den Ablauf überschaubar und merkbar. |

### product

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `aufruf` | Nach dem Manifest kommt die Handlung: eine Aussage, ein Handy mit echtem Inhalt und ein Knopf, der Gedanke und Download direkt nebeneinander stellt. |
| t114 Kaffeeabo mit Karten über Fotobühne | `kat-espresso` | Produktkarten liegen über einer abgerundeten Fotobühne, so verbindet das Bild die Stimmung mit dem Angebot, ohne dass die Karten leiden. |
| t114 Kaffeeabo mit Karten über Fotobühne | `kat-filter` | Dieselbe Bauart mit anderem Foto macht jede Kategorie zu einer eigenen Bühne, ohne neues Muster lernen zu müssen. |
| t115 Strandgut mit Wortmarke | `wohnen` | Ein einziges farbiges Band im sonst cremigen Seitenverlauf hebt das wichtigste Angebot hervor, Bildpaare zeigen Raum und Detail zusammen. |
| t116 Produktfamilie im Feldversuch | `produkte` | Drei gleich gebaute grüne Kacheln zeigen die Familie auf einen Blick, der Höhenversatz führt das Auge von links nach rechts. |

### services

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t112 Wertegemeinschaft App mit Manifest | `branchen` | Fünf leicht gedrehte, überlappende Karten mit großem Zeichen und kurzer Beschriftung zeigen die Bandbreite sofort, die Schräge wirkt von Hand gelegt statt gerastert. |
| t115 Strandgut mit Wortmarke | `saison` | Hohe Papierkarten mit Datum über dem Foto machen Termine greifbar und lassen Gäste ihren Zeitraum selbst finden. |
| t117 Studiobühne mit Fallstudienliste | `leistungen` | Zwei große, nummerierte Karten mit gezeigter Oberfläche oben erklären das Angebot, bevor man liest. |

### team

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t118 Projektentwickler mit Bewegtbild Held | `team` | Ein farbiges Band mit hohem Bild und einem Satz, der beim Lesen aufhellt, setzt einen Atemzug zwischen Haltung und Projekte. |

### technical

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t116 Produktfamilie im Feldversuch | `feld` | Eine Tabelle mit Wert, Bedeutung und Stand ist ehrlicher als Kacheln, weil sie Unfertiges sichtbar lässt. |

### testimonials

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t113 Nachunternehmerprüfung im Bau | `stimme` | Ein einziges Zitat auf dunkler Karte unterbricht die hellen Flächen und setzt einen Ruhepunkt vor der Detailstrecke. |
| t114 Kaffeeabo mit Karten über Fotobühne | `stimmen` | Hochformatige Bildkacheln mit kurzem Zitat und versetzter Höhe machen Stimmen lebendig, ohne ein Video zu verlangen. |
| t115 Strandgut mit Wortmarke | `stimmen` | Eine leicht gekippte Papierkarte über einem Foto wirkt wie eine hingelegte Postkarte, eine Stimme je Blick hält den Text lesbar. |
| t117 Studiobühne mit Fallstudienliste | `stimmen` | Kurze Zitate mit Person und Betrieb auf Karten, seitlich blätterbar, als Beispiel gekennzeichnet. |

### trust

| Vorlage | Kennung | Prinzip |
|---|---|---|
| t114 Kaffeeabo mit Karten über Fotobühne | `vertrauen` | Vier kurze Zusagen mit Icon stehen vor dem Angebot und räumen Zweifel aus, bevor Produkte gezeigt werden. |
| t117 Studiobühne mit Fallstudienliste | `logos` | Eine ruhige Reihe gleich großer Felder zeigt Größenordnung der Kundschaft ohne Behauptung. |

## Nach Vorlage

### t112 Wertegemeinschaft App mit Manifest

Referenz: https://pocketchangethe.world/ Startseite, eigene Aufnahme

`kopf` (navigation), `held` (hero), `branchen` (services), `manifest` (editorial), `aufruf` (product), `satzband` (editorial), `funktionen` (features), `ablauf` (process), `betriebe` (forms), `fragen` (faq), `schluss` (cta), `brief` (forms), `fuss` (footer)

### t113 Nachunternehmerprüfung im Bau

Referenz: https://area.us/ Startseite, eigene Aufnahme

`kopf` (navigation), `hero` (hero), `wortlicht` (benefits), `karten` (features), `stimme` (testimonials), `funktionsliste` (interactive), `vergleich` (comparison), `fragen` (faq), `kontakt` (forms), `fuss` (footer)

### t114 Kaffeeabo mit Karten über Fotobühne

Referenz: https://www.goodlifemeds.com/ Startseite, eigene Aufnahme

`ankuendigung` (navigation), `kopf` (navigation), `hero` (hero), `einstieg` (about), `vertrauen` (trust), `kat-espresso` (product), `kat-filter` (product), `stimmen` (testimonials), `beratung` (forms), `ablauf` (process), `ratgeber` (editorial), `fragen` (faq), `fuss` (footer)

### t115 Strandgut mit Wortmarke

Referenz: https://www.peligoni.com/ Startseite, eigene Aufnahme

`kopf` (navigation), `held` (hero), `einstieg` (editorial), `bildstapel` (features), `wohnen` (product), `saison` (services), `stimmen` (testimonials), `abzuege` (portfolio), `fragen` (faq), `anfrage` (forms), `fuss` (footer), `leiste` (cta)

### t116 Produktfamilie im Feldversuch

Referenz: https://www.farmminerals.com/ Startseite, eigene Aufnahme

`kopf` (navigation), `held` (hero), `problem` (problem), `loesung` (interactive), `merkmale` (features), `einsatz` (interactive), `name` (editorial), `feld` (technical), `produkte` (product), `standorte` (interactive), `transparenz` (cases), `beitraege` (editorial), `fragen` (faq), `anfrage` (forms), `fuss` (footer)

### t117 Studiobühne mit Fallstudienliste

Referenz: https://www.phunk.com/ Startseite, eigene Aufnahme

`kopf` (navigation), `held` (hero), `einwilligung` (forms), `intro` (about), `leistungen` (services), `werte` (benefits), `projekte` (cases), `logos` (trust), `stimmen` (testimonials), `faq` (faq), `abschluss` (cta), `fuss` (footer)

### t118 Projektentwickler mit Bewegtbild Held

Referenz: https://conwest.com/ Startseite, eigene Aufnahme

`kopf` (navigation), `held` (hero), `aussage` (editorial), `team` (team), `projekte` (portfolio), `projekt-gross` (cases), `faq` (faq), `abschluss` (cta), `anfrage` (forms), `fuss` (footer)

