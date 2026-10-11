# Scroll-Erlebnis: Seitengrammatik, Gefühlskurve, Signaturbewegung

`18-motion-handschrift.md` und `09-motion-gsap.md` regeln, wie Bewegung technisch sauber läuft, `38-scrollvideo-und-einbettungen.md`
sagt, wann sich ein Scrollvideo lohnt, `43-hierarchie-raster-komposition.md` ordnet Hierarchie und Raster. Dieses Kapitel ergänzt
die Frage davor: **Was ist diese Seite als Ganzes, was soll der Besucher beim Scrollen fühlen, und was gibt es nur hier?** Es gilt
für Marken-, Kampagnen- und Produktseiten mit Erlebnisanspruch. Für Handwerk, Praxis, Gastronomie und lokale Dienste bleibt
es bei der dezenten Bewegung aus `38-…`, Abschnitt 1, weil der Besucher dort Leistung, Ort und Kontakt sucht.

Die Substanz stammt aus dem Repository `scroll-craft` von Nate Herk (MIT, Stand 30.09.2026), siehe `CREDITS.md`, Abschnitt
„Version 4.21". Übernommen sind Denkweise, Prüfreihenfolge und Fehlerbilder, kein Text und keine Engine. Wo die Quelle einer
harten Grenze oder einer Regel dieses Repositories widerspricht, steht die Entscheidung in Abschnitt 14.

## Inhalt

- 1\. Struktur ist eine eigene Achse
- 2\. Wann das Kapitel gilt
- 3\. Die acht Seitengrammatiken
- 4\. Die Gefühlskurve
- 5\. Der eine Gipfel
- 6\. Der Erzählsatz
- 7\. Mittendrin statt zuschauen
- 8\. Tempo als Gefühl
- 9\. Die Signaturbewegung
- 10\. Das Fingerabdruck-Register
- 11\. Tiefe im Heldbereich
- 12\. Prüfen durch Scrollen
- 13\. Verbotsliste und ihre Entsprechung im Bestand
- 14\. Entschiedene Widersprüche
- 15\. Bewusst nicht übernommen
- 16\. Ungeprüft
- Verwandte Kapitel

## 1. Struktur ist eine eigene Achse

Vier Seiten, gebaut mit demselben Werkzeug, für vier Branchen, sahen nebeneinander aus wie eine Vorlage (Befund des Autors der Quelle an seinen eigenen Bauten): gleiche Kopfleiste,
gleicher Held mit Video, gleiche gepinnte Textsektion, gleiche Kartenreihe, gleicher Abschluss. Geändert hatten sich Reihenfolge
der mittleren Sektionen und die Farbe. Der Grund: Die Bausteine bestimmen, **wie** eine Seite aussieht. **Was** eine Seite ist,
hatte niemand entschieden, also entstand überall dieselbe Form.

> Die Welt (Bild, Farbe, Stoff) ändert, wie eine Seite aussieht. Die Grammatik ändert, was eine Seite ist. Ein Projekt, das nur die
> Welt ändert, ist ein neuer Anstrich.

Daraus folgen drei Pflichten vor dem ersten Code: eine **Grammatik** wählen (Abschnitt 3), eine **Gefühlskurve** mit einem Gipfel
schreiben (4 und 5) und eine **Signaturbewegung** erfinden (9). Alle drei gehören in den Markenbrief
(`assets/vorlagen/marke-brief.md`, Block „Erlebnis") und in das Umsetzungskonzept der Phase 3.

## 2. Wann das Kapitel gilt

| Lage | Was gilt |
|---|---|
| Marke, Produktlaunch, Kampagne, Event, Software mit Erlebnisanspruch, und eine Erlebnisidee ist freigegeben (`38-…`, 1a) | das ganze Kapitel |
| Alle anderen Seiten | nur Abschnitt 4 und 5 als Denkhilfe für den Bogen der Seite, keine Grammatik außer der klassischen Landingpage |
| Der Kunde will „etwas Besonderes", die Zielgruppe ist mobil und die Seite soll Anfragen liefern | die Grammatik „Kapitel" oder „Galerie", keine filmische Seite: Bewegung kostet Ladezeit und Konversion, siehe `03-technik-performance.md` |

Grund für die Eingrenzung: Jede Erlebnisgrammatik kostet Daten, Aufwand und Barrierefreiheitsarbeit. Sie lohnt, wenn die Seite selbst
Teil der Marke ist, nicht wenn sie nur Anfragen einsammeln soll.

## 3. Die acht Seitengrammatiken

Eine Grammatik ist die Ordnung der Seite: was eine Sektion ist, wofür der Rahmen dient, woran der Besucher merkt, wo er ist, und wie
die Seite endet. Jede Grammatik **verbietet** etwas. Die Verbote sind der Zweck: Sie verhindern, dass der Bau auf halber Strecke
in den filmischen Standard zurückrutscht. **Eine wählen, nie zwei mischen.** Eine Kapitelseite mit einer durchgehenden Welt
darunter ist ein filmischer Durchlauf mit Zwischenüberschriften.

| Grammatik | Passt zu | Scrollen fühlt sich an wie | Verbietet | Navigation, Held, Schluss |
|---|---|---|---|---|
| **Filmischer Durchlauf** | ein linearer Gedankengang mit einem Gefühlsbogen: Verbrauchsprodukt, Launch | ein Film, durch den man schiebt, ohne Naht | sichtbare Zählung (Kapitelnummer, Fortschritt), harte Schnitte zwischen Flächen, mehr als einen Einstieg | schmale feste Leiste mit Wortmarke und einer Handlung, Vollbild-Held mit Scrub, Schluss mit Fokus auf die Handlung |
| **Kapitel (redaktionell)** | lange Substanz: Methode, Haltung, Gründergeschichte, belegtes Produkt | Seiten umblättern: Zwischentitel, dann dichte, asymmetrische Aufschläge | durchlaufende Verläufe der Fläche, Vollbild-Held, gepinnte Überblendungen, magnetische Handlung, zentrierter Held | keine feste Leiste, ein Randvermerk mit Kapitelnummer, der Held ist eine **Titelseite** aus Schrift, der Schluss eine Impressumszeile mit der Handlung als Textzeile |
| **Lebende Oberfläche** | Software, Werkzeug, Dashboard: die Vorführung ist das Argument | etwas bedienen: Panels füllen sich, ein Verlauf wächst | Marketingrahmen jeder Art, Vollbildfotos, riesige Überschriften | die Oberfläche selbst ist Navigation, der Held ist die Oberfläche in einem Zustand, der Schluss ist ein echtes Eingabefeld |
| **Durchgehende Welt** | eine Reise mit echter Geografie: Lieferkette, Ort, Bauprozess | Bewegung durch einen einzigen Raum ohne Schnitt | jede Sektionsgrenze, zweite Bühne, Stufenwechsel der Fläche; nichts scrollt über die Fläche | die Navigation ist eine **anklickbare Karte** der Wegpunkte, der Held ist ein Standort in der Welt, die Handlung ist ein Gegenstand am Ziel |
| **Typografisches Plakat** | eine Marke, deren Wert ein Satz ist; Manifest, Agentur mit starker Sprache | Wörter in stark wechselnden Gewichten | Fotofläche, Scrub, Karten, Zierbewegung | die Wortmarke gehört zur Komposition, der Held ist ein Wort oder eine Zeile in Bildschirmgröße (mit echtem `<h1>`), der Schluss kehrt die Seite um: kleinste Schrift, Handlung als unterstrichener Link |
| **Galerie / Katalog** | ein Sortiment: Varianten, Portfolio, Speisekarte, Materialien | durch einen Raum gehen, seitlich versetzt | Argument-Textsektion, ein einzelner Heldanspruch, Überzeugungssprache in Objektschildern | die Navigation ist ein **Index der Objekte**, der Held ist Objekt eins mit Schild, der Schluss ist das letzte Objekt oder eine Anfrage im Format der Schilder |
| **Geteilte Bühne** | ein Argument mit zwei Seiten: vorher und nachher, Kosten und Ersparnis | eine Waage, die kippt | Vollbild vor der Auflösung, zentrierter Text, symmetrischer Schluss | keine Leiste, die **Trennlinie** ist der Rahmen, der Held zeigt beide Hälften 50 zu 50, der Schluss ist das Zusammenfalten zur gewinnenden Seite |
| **Schnittfolge** | Energie: Streetwear, Sport, Events, Musik, Getränke | ein Schnitt pro Sekunde, zwölf bis zwanzig kurze Sektionen | Pinning, Verweilen, Überblendung, jede Sektion über etwa 1,4 Bildschirmhöhen | laute Leiste, ein Held, der nach unter einer Bildschirmhöhe weiterschneidet, ein abrupter Schluss mit der Handlung in voller Breite |

Der **filmische Durchlauf** ist der Standard, in den Bauten landen, wenn niemand entscheidet. Wer ihn wählt, schreibt im Konzept einen
Satz dazu, warum die anderen sieben nicht passten. Die Beweislast liegt bei ihm.

**Ein Gipfel trotz Verbot.** Verbietet die Grammatik das Mittel, das der Gipfel braucht (Schnittfolge verbietet Pinning, der Gipfel
will Verweilen), wird der Gipfel **aus dem Sektionsstapel herausgenommen**, nicht die Grammatik gebrochen: Er läuft in der festen
Leiste, die zu keiner Sektion gehört, gesteuert vom Seitenscroll. Die Verbote gelten für das, was Sektionen tun, nicht für das, was die
Seite tun darf.

**Die Ehrlichkeitsregel der lebenden Oberfläche.** Die Oberfläche ist echtes Markup, das echte Logik rechnet, mit echten Daten oder
ausdrücklich beschrifteten Beispieldaten („Beispielszenario"). Verboten bleibt das Gemalte: ein Bild oder Blindelemente, die vorgeben,
etwas zu laufen. Das ist dieselbe Grenze wie „keine Attrappen als Beleg" (`26-…`, `28-…`). Kann die Oberfläche nicht rechnen, ist
die Grammatik nicht verfügbar.

## 4. Die Gefühlskurve

Eine Seite ist eine Folge von Zuständen, durch die jemand mit der Hand am Mausrad geht. Wer zuerst die Sektionen plant, bekommt
eine Liste von Dingen, die passieren, und niemand kann danach beschreiben, was die Seite getan hat. Deshalb: **erst das Gefühl,
dann die Sektion.**

Die Kurve ist ein eigenes Dokument im Markenbrief, **vor** der Sektionsliste, eine Zeile je Abschnitt: das Gefühl, danach, was auf dem
Bildschirm es auslöst. Die Spalte „Gefühl" ist die Vorgabe. Die Spalte „Auslöser" ist die einzige Stelle, an der ein Mittel
(Pinning, Wischen, Zeigerreaktion) vorkommt, und sie steht an zweiter Stelle, weil das Gefühl das Mittel wählt und nie umgekehrt.

Brauchbare Zustände, keine geschlossene Liste: Neugier, Wiedererkennen, Unruhe, Zweifel, Spannung, Staunen, Freude, Erleichterung,
Nähe, Zuversicht, Entschluss, Ruhe.

| Nr | Gefühl | Was es auslöst |
|---|---|---|
| 1 | Ruhe | die fertige Küche am frühen Morgen, fast nichts bewegt sich, lange gehalten |
| 2 | Sehnsucht | ein Satz, der den Platz benennt, den der Besucher wirklich hat, klein und ehrlich |
| 3 | Neugier | der Grundriss baut sich selbst auf, von der Vermessung bis zur Planung |
| 4 | Gewicht | Materialfakten als Museumsschilder: Eiche, Naturstein, Messing |
| 5 | Wärme | dieselbe Küche nach fünf Jahren, Menschen darin |
| 6 | Entschluss | eine ruhige Textzeile mit dem Termin, keine Schaltflächeninsel |

(Eigenes Beispiel für ein Küchenstudio, an keinem Projekt erprobt.)

**Zwei benachbarte Abschnitte mit demselben Gefühl: einer ist Füller.** Streichen oder verändern, was er tut. Zwei Mal Staunen in
Folge sind ein Staunen und ein Leser, der sich daran gewöhnt hat. Jedes Gefühl entsteht aus dem, was davor war: Erleichterung
braucht Spannung davor, Staunen braucht Ruhe davor, Nähe braucht Größe davor.

Die Kurve **schlägt** die Reisestationen aus `01-strategie-positionierung.md`: Die Stationen sagen, was der Besucher lernt, die
Kurve sagt, was er dabei fühlt. Widersprechen sie sich, gewinnt die Kurve, weil sich niemand merkt, was er auf einer Seite gelernt
hat, die nichts in ihm ausgelöst hat.

## 5. Der eine Gipfel

Menschen erinnern einen Höhepunkt und das Ende. Die Mitte schrumpft zu einem Gesamteindruck. Darum hat jede Erlebnisseite **genau
einen** gebauten Gipfel, im Markenbrief als der Satz formuliert, den ein Besucher einem Freund sagen würde, mit Vorher und Nachher:
„Der Bildschirm wurde schwarz, und dann leuchtete der ganze Ozean unter mir auf." Nicht: „Der Held ist beeindruckend."

| Der Gipfel bekommt | Grund |
|---|---|
| das Bildbudget | die besten erzeugten Bilder oder das einzige echte Filmmaterial gehören hierher, nicht in Abschnitt zwei |
| die Stille davor | ein ruhiger Abschnitt oder eine leere Bildschirmhöhe, damit die Veränderung etwas hat, wovon sie sich abhebt |
| die meiste Scrollstrecke | die deutlich größte Strecke der Seite, mit Verweilen, damit sich das Bild genau dort setzt |

**Eine Seite mit drei Gipfeln hat keinen.** Drei starke Abschnitte schwächen einander, und der Besucher kann hinterher sagen, die
Seite sei schön gewesen, aber nicht, was passiert ist. Konkurriert ein zweiter, wird er zurückgestuft: kürzere Strecke, weniger
Material, einfacheres Mittel.

**Der Schluss löst auf.** Das letzte Gefühl ist das, das jemand mitnimmt. Eine Seite, die in einer Fußzeile ausläuft, überschreibt
den Gipfel. Auflösen heißt: Die Seite kommt irgendwo an und bleibt stehen (die Trennlinie faltet sich zusammen, die Welt landet an
einem Ort, die Schrift schrumpft auf ihre leiseste Größe, die Oberfläche übergibt ein Feld). Der letzte Bildschirm muss mit Inhalt
stehen bleiben können. Ein Abschluss, der zu einer leeren Fläche ausblendet, ist eine Seite, die sich für ihr Dasein entschuldigt.

Auf Seiten, deren Zweck Anfragen sind, ist der Gipfel **die Handlung selbst** oder der Beleg unmittelbar davor, nie ein Effekt, der
sie verzögert (harte Grenze: Conversion vor Inszenierung).

## 6. Der Erzählsatz

Vor dem Bau wird dieser Satz vervollständigt und in den Markenbrief geschrieben:

> Es ist die Seite, auf der …

Was in der Lücke steht, muss **dem Besucher passiert** sein, aus seiner Sicht.

| Füllung | Urteil |
|---|---|
| „… es ein Scrollvideo gibt" | Name eines Mittels. Noch kein Merkhaken |
| „… sich der Hintergrund färbt" | ein Mittel in Verkleidung |
| „… man in den Meeresgrund taucht und die Druckanzeige weiter steigt" | ein Erlebnis. Das ist ein Haken |
| „… man die Buchstaben des Logos auseinanderzieht und sie exakt einrasten" | ein Erlebnis. Das ist ein Haken |

Ergibt der Satz nur für jemanden Sinn, der den Bauordner gelesen hat, ist er durchgefallen. Der Satz ist zugleich die schnellste
Fingerabdruckprüfung (Abschnitt 10): Gälte er genauso für eine Seite im Register, ist die Seite noch nicht neu. Und er gehört zur
Signaturbewegung: Zeigen beide auf verschiedene Momente, ist einer Dekoration. Zusammenführen oder den streichen, der nicht der
Gipfel ist.

## 7. Mittendrin statt zuschauen

Ein Film läuft, ob jemand da ist oder nicht. Der Unterschied zwischen Zuschauer und Beteiligtem: Die Seite merkt, dass jemand
Bestimmtes da ist, wie schnell er sich bewegt, wo sein Zeiger ist, ob er stehen geblieben ist.

| Technik | Wirkung |
|---|---|
| Zeigerparallaxe auf der **Welt**, nicht auf einer Karte | die Umgebung verschiebt sich leicht mit dem Zeiger, wie ein Raum, wenn man sich beugt |
| Verweilen belohnen | steht der Scrollfortschritt einige Bilder lang still, erscheint ein Detail, das fürs Verstehen nie nötig war |
| Scrollgeschwindigkeit formt die Intensität | schnell: mehr Körnung, Unschärfe, Farbversatz; langsam: setzt sich. Kostet eine abgeleitete CSS-Variable |
| genau eine Ansprache mit „Sie" an der Wendestelle | wirkt, weil sie die einzige ist. Durchgehend ist es nur Werbetext |
| eine Spur dessen, was schon durchlaufen wurde | wer am Ende ankommt, hat eine Aufzeichnung, keine Fußzeile |

**Würze, nicht Hauptgericht: eins oder zwei pro Seite.** Eine Seite, die auf alles reagiert, wirkt besessen, nicht lebendig:
Der Besucher hört auf zu lesen und beginnt zu stochern. Alles hier läuft nur unter `(hover: hover) and (pointer: fine)` und fällt bei
reduzierter Bewegung weg. **Eine Technik, die es nur am Desktop gibt, darf nie die Bedeutung der Seite tragen.** Den Zeiger
des Besuchers fängt oder sperrt die Seite nie.

## 8. Tempo als Gefühl

Scrollstrecke ist emotionale Zeit, die einzige Uhr dieses Mediums, vollständig steuerbar und deshalb das billigste Werkzeug, das
am häufigsten auf Standard bleibt.

| Tempo | Wirkung | Mittel |
|---|---|---|
| kurze Abschnitte, harte Schnitte | Adrenalin, Puls, Ungeduld | Abschnitte unter 1,4 Bildschirmhöhen, kein Pinning, kein Verweilen |
| lange gepinnte Strecke | angehaltener Atem, Druck, Aufmerksamkeit | große Strecke, überlappende Einblendungen, ein Gedanke |
| leere Bildschirmhöhe vor einer Enthüllung | Stille vor dem Einsatz | nur Fläche, kein Text bis zum nächsten Abschnitt |
| langsames Setzen mitten im Abschnitt | der Schuss landet | Verweilen mit dem Höhepunkt der Einblendung auf der Ruhestelle |
| schnelle Einblendung mit langem Plateau | Selbstsicherheit, Ankunft | kurze Anstiege, langes Halten |
| langsames Einblenden | Zögern, Dämmern | einmal verwenden, es ist nah an „kaputt" |

Drei Folgerungen. **Der Gipfel bekommt Platz:** Die größte Strecke der Seite, deutlich größer als die übrigen, sonst hat die Seite
keine Form, egal was die Kurve sagt. **Verwaltungsteile werden verkürzt:** Leistungsdaten, Ablauf, FAQ, Zertifikate sind Information,
kein Erlebnis. Kurze Einblendungen, kein gepinnter Abschnitt, denn Scrollstrecke ist die Geduld des Besuchers. **Stille ist
geschrieben, nicht übrig:** Eine leere Fläche, die gemeint ist, wirkt wie Erwartung, eine ungewollte wie eine Seite, die nicht
geladen hat. Gemeinte Stille steht im Markenbrief, damit die Prüfung sie von toter Strecke unterscheidet.

**Länge.** Die Quelle hält für lange filmische Seiten acht bis vierzehn Bildschirmhöhen als Bezugswert, nicht als Ziel. Kürzere
Grammatiken (Kapitel, Galerie, lebende Oberfläche) bleiben kurz, wenn der Gedankengang vollständig ist. Nie Füllmaterial oder leeres
Pinning, um ein Maß zu erreichen. Braucht die Kurve mehr, sind es zu viele Abschnitte, nicht zu wenig Platz.

**Blitzgrenze.** Bei harten Schnitten (Schnittfolge) wechselt der Inhalt, die Seite blitzt nicht: nicht mehr als drei Wechsel
zwischen sehr hellen und sehr dunklen Vollflächen pro Sekunde (WCAG 2.3.1). Das ist eine eigene Ergänzung, nicht Teil der Quelle.

## 9. Die Signaturbewegung

Jede Erlebnisseite hat **eine** eigens gebaute Interaktion, die es nur auf dieser Seite gibt. Nicht aus dem Baukasten, nicht aus einem
früheren Projekt, kein Parameterwechsel. Sie macht die Seite nach dem Schließen des Tabs erinnerbar und ist der einzige Teil, den
man nicht durch Befolgen von Regeln erreicht. Sie erfüllt zugleich die Pflicht „eigene Handschrift je Projekt" aus
`18-motion-handschrift.md`.

| Gilt | Beschreibung |
|---|---|
| Der Scrollwert als Abspielkopf über einer festen Spur | eine dünne Spur am unteren Rand, auf der ganzen Seite sichtbar, die eine echte Wellenform, Route oder Zeitleiste zeichnet. Wer einen Abschnitt passiert, stempelt eine Markierung, am Ende ist die Spur das Protokoll des Weges und zugleich Navigation |
| Eine Wortmarke, die der Zeiger auseinanderziehen kann | die Buchstaben folgen mit verschiedenen Massen, trennen sich beim Ziehen und rasten beim Loslassen exakt ein. Nur im Held, nur einmal, das Einrasten muss stimmen |
| Eine Linienzeichnung, die sich selbst aufbaut | eine technische SVG-Zeichnung, deren Strichlänge vom Scrollfortschritt abhängt: erst der Gegenstand, dann Maßlinien, dann Beschriftungen |
| Ein laufender Beleg | ein kleines festes Feld, das bei jeder Aussage eine Zeile ergänzt, mit **echten** Zahlen, sodass der Schluss mit einer summierten Rechnung des eben Gelesenen ankommt. Funktioniert nur mit echten Zahlen, das ist die Probe |
| Ein Regler, der die ganze Seite neu einfärbt | Tageszeit, Temperatur, Auslastung: ein Eingabewert, und Bild, Fläche und Akzent verschieben sich gemeinsam. Er muss alles zugleich betreffen, sonst ist er ein Widget |

| Gilt nicht | Grund |
|---|---|
| ein umgefärbter Lichtkegel, zwei Lichtkegel | derselbe Baustein mit anderem Wert |
| `tilt` mit 9 statt 6 | Parameterwechsel |
| eine andere Kurve für laufende Textzeilen | Parameterwechsel |
| fünf Karten in der Leiste statt drei, oder in die Gegenrichtung | mehr vom Gleichen |
| ein drittes Scrollvideo | mehr von einem Mittel ist kein neues Mittel |
| etwas, das die Bibliothek schon kann, mit eigenem Klassennamen | Umbenennung |

**Die Probe:** Jemandem beschreiben, der die anderen Seiten der Agentur kennt. Kann er sie nicht von einem vorhandenen Baustein
unterscheiden, ist es keine Signaturbewegung. Auch hier gilt: Tastatur erreicht, was die Bewegung auslöst; Bedeutung steckt im
Text, nicht in der Bewegung; bei reduzierter Bewegung bleibt die Funktion in ruhiger Form erhalten (`18-…`).

## 10. Das Fingerabdruck-Register

Die Agentur führt eine Tabelle ihrer gebauten Erlebnisseiten, damit sie sich nicht selbst wiederholt. Vorlage:
`assets/vorlagen/fingerabdruecke.md`. Das Register steht beim Agenturwissen, nicht im Kundenprojekt, und enthält keine Kundendaten
(Projektkürzel und Branche statt Name), die Ordnung aus `44-gutes-festschreiben-und-rueckbauprobe.md` und `48-…` gilt.

| Nr | Dimension | Was eingetragen wird |
|---|---|---|
| 1 | Grammatik | eine der acht oder eine benannte neue |
| 2 | Navigation | was der Rahmen ist und wofür |
| 3 | Held | was der erste Bildschirm tut |
| 4 | Form der Abschnittsfolge | Reihenfolge der Mittel, Anzahl, Gesamtlänge in Bildschirmhöhen |
| 5 | Schluss | wie der letzte Bildschirm endet, worin die Handlung sitzt |
| 6 | Signaturbewegung | die eine Interaktion in einem Satz |

**Das Tor:** Eine neue Seite muss sich von **jeder** vorhandenen Zeile in mindestens **vier von sechs** Dimensionen unterscheiden,
gegen jede Zeile einzeln, nicht im Durchschnitt. Dimension 6 ist frei, denn eine Signaturbewegung ist per Definition einzigartig. Das
Tor verlangt also drei weitere Unterschiede von fünf. Wer nur Grammatik und Welt wechselt, fällt durch.

**Fällt ein Plan durch, wird der Plan geändert, nie das Register.** Eine Zeile umzuschreiben, damit der Bau passt, macht die Datei
wertlos: Sie ist ein Protokoll dessen, was existiert, keine Beschreibung dessen, was man sich wünscht. **Nach der Auslieferung** wird
eine Zeile angehängt, mit allen sechs Dimensionen, und ehrlich, was sie mit früheren Zeilen teilt.

Zählt eine Seite für die Lage eines Kunden gegen eine Kundenvorgabe (Designsystem, Marke), geht die Vorgabe vor und die Zeile
vermerkt es (`24-designsystem-vorrang.md`). Das Register ist ein Hilfsmittel gegen Wiederholung, kein Auftrag, einen Kunden
gegen seine Marke anders aussehen zu lassen.

## 11. Tiefe im Heldbereich

Für einen Held mit Erlebnisanspruch gehört **Tiefe zur Grundausstattung, nicht zum Feinschliff**. Ein schönes Vollbild mit einer
Parallaxe und eingeblendetem Text wirkt flach. Gilt für den Held, nicht für jede Sektion, und nicht gegen ausdrücklich einfachere
Vorgaben. Eine Arbeitsoberfläche (Dashboard) braucht keinen erfundenen Marketing-Held.

**Vor der Bilderzeugung planen:** Hintergrund, Hauptmotiv, Vordergrund und eine Atmosphärenebene. Festlegen, was sich unabhängig
bewegt, was sich überlappt und was körperlich verbunden bleiben muss. Mehrere Ebenen, die gemeinsam wie ein Bild wandern, sind keine
Tiefe. Tiefe entsteht durch sichtbar verschiedene Verschiebungs- oder Skalierungsraten, Verdeckung und Nähe gegen Ferne. Die
Überschrift bleibt lesbar, die Szene erzählt eine einzige Geschichte.

| Schritt | Regel | Grund |
|---|---|---|
| 1 Hintergrundplatte | das Motiv entfernen und den Raum dahinter ergänzen | sonst zeigt das bewegte Ausschnittsmotiv ein Doppelbild oder ein Loch |
| 2 Echte Alphakanäle | den Alphakanal ansehen. Ein erzeugtes Schachbrettmuster oder ein weißer Hintergrund ist keine Transparenz | die Kante flackert sonst vor jedem Hintergrund |
| 3 Perspektive halten | Bildausschnitt, Größe, Licht, Farbe und Kamerablick der Ebenen angleichen, auch wenn der Auftrag „gleiche Platzierung" lautete | getrennt erzeugte Ebenen weichen fast immer ab und brauchen gemessenen Abgleich |
| 4 Kontaktpunkte verankern | eine Person bleibt auf dem Felsen, ein Produkt auf seinem Sockel | ein gemeinsamer Drehpunkt trägt verschiedene Skalen, ohne dass das Motiv schwebt |
| 5 Kanten prüfen | gegen kontrastreiche Hintergründe und in der Bewegung: Säume, Zacken, abgeschnittener Stoff, Nähte im Vordergrund | Säume fallen erst in der Bewegung auf |
| 6 Originale behalten | optimierte Auslieferungsdateien ohne Verlust des Alphakanals | spätere Änderungen brauchen die Quelle |

**Bewegung maßvoll.** Eine zusammenhängende Kameraidee, gezielte Übergänge. Hochwertig heißt kontrollierte Bewegung und gutes
Timing, nicht dauernde Bewegung überall. Mit nativem `position: sticky` und unabhängig transformierten Ebenen entsteht Tiefe ohne
WebGL und ohne erzeugtes Video; schwerere Mittel nur, wenn sie das Verlangte verbessern. Wesentlicher Text und Handlungen bleiben
semantisches HTML, mit bewusst gesetzter Ebenenordnung für Schrift, Motiv, Vordergrund und Atmosphäre. Nur `transform` und
`opacity`, ein gemeinsamer Fortschrittswert, Updates per `requestAnimationFrame`, nicht die ganze Seite bei jedem Scrollschritt neu
zeichnen. Zeigerreaktion ist Zugabe und nie der einzige Weg. Außerhalb des Sichtfelds pausiert Dauerbewegung. Bei reduzierter
Bewegung entsteht eine vollständige, ruhige Komposition ohne zusätzliche gepinnte Strecke und ohne versteckten Inhalt. Alle
Ebenen laden gemeinsam, bevor vom Poster umgeschaltet wird; ein Teilbild, ein Aufblitzen oder ein Geistermotiv bei Ausfall einer
Ebene ist ein Fehler.

**Mobil eigens gestalten.** Nicht die Desktopkomposition verkleinern: Ausschnitt, Motivposition, Drehpunkt, Schriftgröße,
Ebenenreihenfolge, Weg und Scrolldauer anpassen. Die Schrift darf mobil über dem Motiv liegen, auch wenn sie am Desktop dahinter
läuft. Tiefe bleibt, ohne die Überschrift zu verdecken, das Motiv aus dem Bild zu schieben oder horizontal zu überlaufen.

**Abnahme.** Den echten Anfang, eine Zwischenposition, den letzten Übergang und die mobile Komposition ansehen. Verschiedene
Ebenen bewegen sich sichtbar verschieden; kein Doppelmotiv, kein Loch, kein Saum, kein schwebender Kontaktpunkt; die Überschrift
ist beim Öffnen lesbar; die Szene mündet sauber in die nächste Sektion; mobil und ohne Bewegung bleibt alles vollständig und
bedienbar. Ein erfolgreicher Build ersetzt diese Sichtprüfung nicht. Konnte sie nicht stattfinden, steht das im Bericht.

Erzeugung der Ebenen: `28-ki-bildentwuerfe.md` und `39-ki-assets-bewegtbild-und-3d.md`. Parallax über eine Tiefenkarte:
`38-…`, Abschnitt 6a.

## 12. Prüfen durch Scrollen

Eine Scrollseite hat keinen einzelnen Zustand. Jede Position ist ein anderes Bild, und die Fehler leben zwischen den zwei
Positionen, die man zufällig angesehen hat. Deshalb wird sie mechanisch **durchlaufen**:

```bash
node scripts/pruefe-scrollstrecke.mjs http://localhost:4321                  # Desktop
node scripts/pruefe-scrollstrecke.mjs http://localhost:4321 --mobil          # Handy
node scripts/pruefe-scrollstrecke.mjs http://localhost:4321 --reduziert      # Bewegung reduziert
```

Das Skript meldet **tote Strecke** (Scrollen ohne sichtbare Veränderung), **Text, der nie volle Deckkraft erreicht**, horizontales
Überlaufen, Konsolenfehler und, bei reduzierter Bewegung, Inhalt, der unsichtbar bleibt. Es legt einen **Kontaktbogen** ab, weil ein
toter Mittelteil nur in nebeneinanderliegenden Bildern auffällt. Den Kontaktbogen **lesen**: Das Skript beweist, dass eine Seite
läuft, nicht, dass sie etwas bedeutet.

Voraussetzungen, die sonst einen Durchlauf entwerten:

* **Über HTTP laden, nicht per `file://`.** Sonst scheitern Abrufe der Seite still, und der Durchlauf prüft nur Platzhalter.
* **Ein echter Chrome statt des mitgelieferten Chromium**, wenn die Seite H.264-Video enthält: das gebündelte Chromium hat keinen
  H.264-Decoder, jedes Video bleibt auf dem Poster, und der Durchlauf besteht gegen Poster. Das Skript startet mit
  `--chrome <Pfad>` (oder der Umgebungsvariable `PRUEFE_CHROME`) einen installierten Chrome.
* **Ein grüner Durchlauf deckt kein echtes Handy ab.** Ein gebautes Projekt bestand vier Runden grün, während der Held-Clip auf dem
  Gerät eingefroren war. Headless-Chrome gibt weder den Videodecoder, die Autoplay-Regeln, den Stromsparmodus noch das
  Berührungsscrollen eines iPhones wieder. Bei jedem Mobilfehler zuerst eine Diagnoseseite neben die Seite stellen und das Gerät
  antworten lassen, statt am Rechner zu spekulieren. Im Bericht steht, was nicht gesichtet wurde.

**Die Gefühlsprobe, kalt.** Nach dem Skript, ohne den Markenbrief zu öffnen:

1. Die Seite einmal von oben nach unten in normalem Lesetempo scrollen, ohne anzuhalten und zu reparieren.
2. Für jeden Abschnitt **ein Wort** aufschreiben, was man gefühlt hat. Löst ein Abschnitt kein Wort aus, bleibt die Zeile leer. Das ist der Befund.
3. Erst jetzt die Kurve im Markenbrief öffnen und beide vergleichen.

**Wo sie abweichen, ist die Seite falsch, nicht der Brief.** Die Kurve nachträglich an das Gebaute anzupassen ist derselbe Fehler wie
das Umschreiben einer Registerzeile: Das Dokument beschreibt dann den Zufall. Dazu drei Fragen:

* Liest sich der Gipfel als Gipfel? Im Kontaktbogen ist er die größte Veränderung der Seite und hat die meiste Strecke. Ist ein
  anderer Abschnitt das Größte, ist dieser der wahre Gipfel, und der Plan hat verloren.
* Gibt es Stille vor dem Gipfel? Ist der Abschnitt davor so laut wie er, hat der Gipfel nichts, woraus er ankommen kann.
* Löst das Ende auf? Ein leeres letztes Bild, eine ausgeblendete Einblendung oder eine Fußzeile, die einfach beginnt, heißt: Die Seite hat geendet, statt zu schließen.

Zwei benachbarte Abschnitte mit demselben Wort sind der Fund „Füller" aus Abschnitt 4, spät gefunden. Streichen verbessert meist
zugleich die Länge. Im Bericht stehen beide Kurven, die vorgesehene und die gefühlte, und was geändert wurde. Wer sie auf Anhieb
identisch meldet, hatte Glück oder hat nicht kalt geprüft.

## 13. Verbotsliste und ihre Entsprechung im Bestand

| Die Quelle verbietet | Entsprechung hier |
|---|---|
| Ton-in-Ton-Knetfiguren, Low-Poly oder Diorama als Voreinstellung | `26-…`, `39-…`: Fotografisch, außer die Marke ist wirklich illustriert |
| ein „Scroll"-Hinweis, Pfeil oder animierte Maus | `pruefe-geschmack.mjs` (Scrollhinweis), `26-…` |
| Zähler wie „01 / 06" | `pruefe-geschmack.mjs` (Nummern statt Themen) |
| eine Vorzeile über jeder Überschrift | `pruefe-geschmack.mjs` (Kicker-Quote) |
| Gedankenstrich im sichtbaren Text | `pruefe-striche.mjs` |
| zentrierter Text in jeder Sektion | Verankerung wechseln: führend, nachlaufend, zentriert, geteilt (`43-…`) |
| dieselbe Bewegung zweimal hintereinander | Abschnitt 3 und 8, Prüfung im Konzept |
| eine Vollflächen-Abdunklung gegen schlechten Kontrast | Abdunklung nur dort, wo Text sitzt (`pruefe-kontrast.mjs`) |
| Text, ins Bild eingebrannt | immer echtes Markup, auswählbar, übersetzbar, scharf (`28-…`) |
| erfundene Zahlen in einem Zähler | harte Grenze „keine erfundenen Zahlen"; keine Zahl, kein Zähler |
| `transition: all`, Animation von Breite, Höhe, `top`, `left` | `pruefe-motion.mjs`; `transform`, `opacity`, `clip-path` für Wischer |
| Verlaufstext, Neonleuchten, Heiligenschein ohne Versatz | `pruefe-geschmack.mjs` (Violettverlauf, Glas), `26-…` |
| automatisch spielender Ton, Ton auf einem Scrub-Clip | `38-…`: Tonspur entfernen |
| eine Seite ohne Gipfel oder mit dreien | Abschnitt 5 |
| ein Schluss, der ausläuft | Abschnitt 5 |
| ein Bau ohne Signaturbewegung | Abschnitt 9 |
| ohne Abschlussprüfung ausliefern | Abschnitt 12 |

## 14. Entschiedene Widersprüche

| Quelle sagt | Dieses Repository sagt | Entscheidung und Grund |
|---|---|---|
| Lebende Oberfläche: kein Anspruch im Held, die Oberfläche selbst ist der Einstieg | Kernbotschaft im ersten Bildschirm (`45-…`, Abschnitt 6; harte Grenze zum Held) | Die Kernbotschaft steht als echter Text im ersten Bildschirm, in der Sprache der Oberfläche (Titelzeile, Statuszeile, Beschriftung), nicht als Display-Überschrift. Wer in drei Sekunden nicht versteht, was die Seite anbietet, geht |
| Typografisches Plakat und Kapitelseite: gar keine feste Navigation | Navigation erreichbar per Tastatur, Barrierefreiheit (`04-…`), Playbook „Landingpage ohne Navigation" | Der Verzicht auf eine feste Leiste gilt nur für das, was sie optisch ist. Sprungmarken, Tastaturbedienung, Menü oder Index bleiben erreichbar. Bei einer Landingpage mit Anzeigenverkehr gilt das Playbook |
| Durchgehende Welt: nichts darf über die Fläche scrollen, alles ist ein Wegpunkt | Inhalt im Dokumentfluss, bei reduzierter Bewegung vollständig und ohne Video | Die Grammatik braucht einen statischen Rückfall: dieselben Wegpunkte als normal gescrollte Sektionen mit Standbild. Ohne Rückfall ist sie nicht verfügbar. Die Quelle verlangt die klickbare Karte selbst, damit die Welt kein Video ist |
| Schnittfolge: harte Schnitte im Sekundentakt | WCAG 2.3.1 (nicht mehr als drei Blitze pro Sekunde) | Schnitte wechseln Inhalt, sie blitzen nicht. Siehe Blitzgrenze in Abschnitt 8 |
| Erzeugung von Fotos und Clips über einen Dienst mit Schlüssel | Kosten vorab (`39-…`, 3a), keine Kundendaten an Dritte ohne Vertrag, kein Schlüssel im Repository | Das Verfahren steht in `39-…`. Der Dienst der Quelle ist ein Beispiel, kein Pflichtwerkzeug |
| „Die Welt ist fotografisch" | Marken können illustriert sein | Fotografisch als Voreinstellung bleibt, mit der Ausnahme der Quelle: wirklich illustrierte Marke. Die Entscheidung steht im Markenbrief |
| Eine neue Grammatik ist erlaubt, wenn Navigation, Folge, Schluss und Verbote eine andere Struktur beschreiben | Wissen und Ablauf getrennt | Gilt. Die neue Grammatik wird im Register unter eigenem Namen geführt und nach dem zweiten Einsatz hier ergänzt |

## 15. Bewusst nicht übernommen

| Inhalt der Quelle | Grund |
|---|---|
| die Engine (`scrollcraft.js`, `scrollcraft.css`) mit ihren Bausteinen und Attributen | Das Repository ist ohne Abhängigkeit und ohne mitgelieferten Laufzeitcode; der Bauablauf nutzt GSAP und die Vorlagen aus `assets/vorlagen/scrollvideo/`. Eine zweite Bewegungsbibliothek im Kundenprojekt wäre ein zweiter Wartungsstrang |
| Anbindung an einen Bilddienst (`kie.mjs`), Kostenangaben | Anbieter und Preise wechseln; das Verfahren steht in `39-…` |
| das Prüfwerkzeug `shoot.mjs` mit `npm i playwright-core` im Bauordner | Ersetzt durch `pruefe-scrollstrecke.mjs` mit der gemeinsamen Browserschicht `lib/browser.mjs` |
| die zehn Beispielseiten mit Namen, Bildern und Entscheidungen | Kundenmaterial anderer, nicht gesehen, nur als Beschreibung gelesen (Tor 1 der Designrecherche gilt auch hier) |
| Reden über Zuschauerzahlen, Mitglieder und Anbieter in der README | Werbung |
| der Abschnitt zu Pointer-Lock und nativem Cursor in der Prüfumgebung | Eine Eigenheit der Windows-Testumgebung der Quelle; hier gilt schlicht: den Zeiger des Besuchers nie fangen |

## 16. Ungeprüft

* Kein Evalfall, das Δ ist eine Vermutung. Das Kapitel ist an keinem Projekt erprobt.
* Die acht Grammatiken stammen aus den Bauten eines Autors, vor allem im US-Markt für Marken und Software. Dass sie sich auf
  DACH-Marken und auf kleinere Budgets übertragen lassen, ist eine Annahme. Die Zuordnung „passt zu" ist eine Ableitung.
* Das Fingerabdruck-Register hat nie ein zweites Projekt bewertet, die Schwelle vier von sechs ist ein Vorschlag der Quelle.
* `pruefe-scrollstrecke.mjs` erkennt tote Strecke über identische Bilder zweier Positionen, nicht über Bedeutung; eine gewollte
  Stille sieht für das Skript genauso aus wie ein Defekt und muss im Markenbrief stehen. Die Deckkraft misst es an Text-Elementen,
  nicht an Kindern, die im Text geteilt werden (zeilenweise Einblendung per Teilung), dort kann es Text als nie voll sichtbar melden,
  der es ist, oder umgekehrt.
* Die Bildpositions- und Ebenenregeln (Abschnitt 11) sind aus der Beschreibung eines Beispielprojekts gelesen, nicht nachgebaut.
* Die Blitzgrenze (WCAG 2.3.1) ist eine eigene Ergänzung. Eine Messung steht aus.

## Verwandte Kapitel

- Bewegung technisch, Handschrift, Grenzen: `09-motion-gsap.md`, `18-motion-handschrift.md`, `30-motion-pruefung.md`
- Scrollvideo, Erlebnisidee, 3D-Szene, Tiefenkarte: `38-scrollvideo-und-einbettungen.md`
- Hierarchie, Raster, Sektionsanteile, Animationssystem: `43-hierarchie-raster-komposition.md`
- Bewegtbild als Funktion der Zeit, Storyboard: `41-motion-als-funktion-der-zeit.md`
- Kundenpsychologie: Erwartung, Reiz, Begründung: `36-kundenpsychologie-erwartung-reiz-begruendung.md`
- Tells und Vorflugcheck: `26-geschmack-und-ki-tells.md`
- Ebenen aus KI-Bildern: `28-ki-bildentwuerfe.md`, `39-ki-assets-bewegtbild-und-3d.md`
- Richtungen als Varianten, Subtraktion, Fehlermodi: `48-richtung-varianten-und-subtraktion.md`
- Hürde, Länge, offene Schleifen: `45-huerde-laenge-und-leserfuehrung.md`
- Barrierefreiheit der Bewegung: `04-barrierefreiheit-bfsg.md`
- Vorrang von Kundenvorgaben: `24-designsystem-vorrang.md`
- Durchlauf im Bauablauf: `../../agentur-website-builder/references/qa-und-abnahme.md`
