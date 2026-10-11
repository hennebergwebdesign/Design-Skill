# Referenzen und Seitenaufbau

Wo recherchiert wird, steht in
`../../webdesign-conversion/references/22-premium-designquellen.md`: Awwwards, Dribbble,
Land-book, recent.design, 21st.dev, und wofür jede Quelle taugt. Dieses Kapitel regelt, was
aus einer Referenz übernommen werden darf, welche Quelle im Projekt überhaupt gilt und
welche Sektionsreihenfolge den Ausgangspunkt bildet.

## Inhalt

- Wie Referenzwebsites genutzt werden
- Rangfolge der Quellen
- Auswahl pro Projekt
- Ausgangsliste
- Freigegebene Referenzen
- Abgelehnte Referenzen
- Vorrang der Conversion
- Universeller Aufbau: Unternehmenshomepage
- Universeller Aufbau: Landingpage
- Umgang mit fehlendem Material

## Wie Referenzwebsites genutzt werden

Referenzen sind eine Quelle für **Prinzipien**, nicht eine Vorlage zum Abzeichnen. Aus einer
Referenz wird abgeleitet, warum etwas funktioniert: wie viel Weißraum eine Aussage bekommt,
in welcher Reihenfolge Vertrauen aufgebaut wird, wie ruhig eine Navigation sein darf, wie
ein Beweis unmittelbar auf ein Versprechen folgt.

Nicht übernommen werden:

* Texte, Claims, Überschriften oder Formulierungen
* Logos, Wortmarken, Icons, Illustrationen, Fotos und andere Markenassets
* charakteristische Layoutkombinationen, die als Handschrift einer Marke erkennbar sind
* ganze Sektionen samt Aufbau, Bildsprache und Rhythmus

Der Prüfstein ist einfach: Würde jemand, der die Referenz kennt, die neue Seite als deren
Kopie erkennen, ist die Grenze überschritten. Übernommen wird das Prinzip, nicht die
Ausführung. Alles Sichtbare entsteht aus dem Branding und dem Material des Kunden.

## Rangfolge der Quellen

Diese Rangfolge beantwortet **welche Referenzquelle** im Projekt überhaupt gilt. Was eine
Referenz danach beeinflussen darf und was geschützt bleibt, beantwortet sie nicht: dafür gilt
die Fünf-Stufen-Rangfolge in
`../../webdesign-conversion/references/24-designsystem-vorrang.md`, und zwar unabhängig davon,
auf welcher Stufe hier das Projekt steht.

Vor jeder Referenzarbeit klären, welche Quelle das Projekt überhaupt hat. Die höhere Stufe
schlägt immer die niedrigere:

1. **Vollständiges Design liegt vor**, etwa aus Claude Design, Figma oder als
   Screenshotstrecke. Dann ist das Design die Quelle. Referenzwebsites werden nicht mehr
   herangezogen, außer für Fragen, die das Design offen lässt, typischerweise Zustände,
   leere Zustände, Fehlerfälle und Verhalten auf kleinen Geräten.
2. **Der Nutzer nennt eigene Referenzen für dieses Projekt.** Dann gelten diese, auch wenn
   sie der Ausgangsliste widersprechen. Nicht stillschweigend um Seiten aus der Liste
   ergänzen. Wenn eine zusätzliche Referenz sinnvoll erscheint, vorschlagen und begründen.
3. **Weder Design noch eigene Referenzen.** Erst dann greift die Ausgangsliste unten,
   ergänzt um eigene Recherche in der Branche des Kunden auf den Premium-Designquellen.

Wenn unklar ist, auf welcher Stufe das Projekt steht, einmal nachfragen. Das ist billiger
als eine visuelle Richtung, die am Ende verworfen wird.

Auch auf Stufe 1 bleibt die Marke des Kunden die erste Quelle: eine bestehende Seite wird
vor dem Neuentwurf ausgelesen, siehe
`../../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`. Und auf jeder
Stufe gilt: ein geliefertes Designsystem wird nie durch Werte aus einer Referenz ersetzt,
siehe `../../webdesign-conversion/references/24-designsystem-vorrang.md`.

## Auswahl pro Projekt

Vor dieser Auswahl entsteht intern ein Moodboard, das auch Quellen außerhalb des Webs enthält,
und zur Abnahme eine Stylescape (`moodboard-und-stylescape.md`). Beides ersetzt die Referenzen
und die zwei Freigabetore nicht, es ordnet die Richtung davor.

Im Umsetzungskonzept jeweils benennen und in einem Satz begründen:

1. **eine Referenz für Conversion und Informationsarchitektur**, also Reihenfolge der
   Argumente, Platzierung der Handlungsaufforderungen, Umgang mit Einwänden
2. **eine Referenz für die visuelle Richtung**, also Farbgefühl, Typografiehaltung,
   Bildsprache, Dichte
3. **optional eine Referenz für Interaktion und Motion**

Mehr als drei Referenzen führen zu einem Flickenteppich. Wenn der Kunde selbst eine Seite
nennt, die ihm gefällt, wird sie mit aufgenommen und derselben Regel unterworfen.

Vor der Nutzung die Referenz tatsächlich ansehen und die drei bis fünf Prinzipien benennen,
die übernommen werden, dazu das, was bewusst nicht übernommen wird. Eine Referenz, die nur
als Name im Konzept steht, hat nichts beigetragen.

Die Obergrenze von drei gilt für die **Gesamtrichtung** des Projekts. Für eine einzelne
komplexe Sektion sind mehrere Referenzen ausdrücklich erwünscht, je eine für Komposition,
Hierarchie, Darstellung und Interaktion, siehe „Mehrere Referenzen, eine Synthese" in
`designrecherche-ablauf.md`. Aus vier Prinzipien entsteht eine eigene Lösung, aus einer
Referenz eine Kopie.

Vorlegen und Freigeben gehen dem Ansehen nicht voraus, sondern dem **Abrufen**: eine Seite
wird erst vorgelegt und freigegeben, bevor sie mit einem Werkzeug erfasst wird, siehe
`designrecherche-ablauf.md`.

Ist die Referenz eine konkrete, bekannte oder alte Seite statt einer kuratierten Galerie,
liefert `scripts/design-scan.mjs` das Rohmaterial dafür: Sektionsreihenfolge, Wortzahl,
Bildbelegung, Farb- und Schriftkandidaten, optional ein Screenshot über die Firecrawl-API.
Siehe `firecrawl-recherche.md`. Das Skript ersetzt nicht das Ansehen und Benennen der
Prinzipien, es macht es konkreter.

## Ausgangsliste

Diese Liste kommt nur auf Stufe 3 der Rangfolge zum Einsatz. Sie beschreibt Richtungen,
keine Vorgaben, und ist bewusst nicht vollständig. Die Gruppen sind ein Einstiegsraster,
keine feste Zuordnung: eine Seite aus der Softwaregruppe kann für einen Handwerksbetrieb
genau die richtige Argumentationsstruktur liefern. Es ist ausdrücklich erwünscht,
projektbezogen weiter zu recherchieren, besonders in der Branche des Kunden.

Klarheit, Struktur und Vertrauensaufbau im geschäftlichen Umfeld:
`stripe.com/de`, `linear.app`, `vestris.ai`

Dienstleister, Handwerk und lokale Anbieter, also der häufigste Kundentyp der Agentur:
`comradeweb.com` und `hookagency.com` (freigegeben, siehe unten), `mdccinc.com`, `vs-epple.de` und
`driessenarchitectuur.nl` (alle drei freigegeben), `alliancemoving.com`, `hhjtrialattorneys.com`,
`coffee-tech.com`, `beetogreen.com/en` (freigegeben)

Produkt und Softwareanbieter, stark in Struktur und Argumentationsaufbau:
`brand.ai`, `showit.com`, `luffu.com`, `pop.site`, `trymira.com`, `cofactr.com`,
`carcompany.ai`, `amp.framer.media`, `voltaskai.endover.ee/en`

Marke, Atmosphäre und Produktinszenierung:
`bynd.com/eu`, `onewhale.io`, `wattspet.com`, `rideradian.com`, `wegems.co`, `designbell.io`

Ruhe, Nähe und Dienstleistung am Menschen:
`kalmmoments.com`, `tropica.framer.website`

Verein, Community und Organisation:
`hadi-community.de`, `iwcf.org`

Fallbeispiele und Referenzdarstellung, nützlich für die Case Study Sektion:
`showcase.nixtio.com/cases/board`, `xnrgyclub.com`

Eine Adresse aus dieser Liste kann offline sein oder sich verändert haben. Was sich nicht
abrufen lässt, wird nicht aus der Erinnerung beschrieben, sondern ersetzt.

## Freigegebene Referenzen

### Comrade

Stand 11.10.2026, vom Inhaber nach Ansicht der Live-Seite freigegeben (Tor 1, ganze Seite).
`comradeweb.com` war die erste ausdrücklich gutgeheißene Referenz. Sie gilt für
Dienstleister und Handwerk, wo Anfragen das Ziel sind. Am selben Tag kamen Hook Agency und
BeeToGreen dazu (unten).

Warum sie gefällt (Begründung des Inhabers): klare CTAs, die sich durch die Seite ziehen,
Vertrauen direkt neben dem Versprechen, die Seite sagt sofort, worum es geht, gute
Veranschaulichungen und Übersichten, ein ansprechendes Layout, dessen Teile ineinanderfließen,
und genügend Kontaktpunkte.

Prinzipien, die übernommen werden dürfen (aus der Textauswertung, **Optik noch nicht gesehen**):

| Prinzip | Beobachtung |
|---|---|
| Nutzenformel im Held | drei kurze Sätze, ein Angebot, ein CTA, der später mehrfach wiederkehrt |
| Problem vor Lösung | eine Sektion mit den Schmerzpunkten der Zielgruppe, bevor die Leistung kommt |
| Leistung in wenigen Karten | vier Karten statt einer Liste, dazu eine Übersicht des Kundenzugangs |
| Belege mit Zahl und Fall | Bewertungswert mit Anzahl, Jahre im Geschäft, Fallkarten mit Kennzahlen |
| Gründer sichtbar | Vorstellung mit Foto und persönlichem Ton |
| Formular, das qualifiziert | Pflichtfelder gering gehalten, Auswahlfelder für Anliegen und Rolle, Datenschutzhinweis über dem Knopf |
| Nach dem Absenden | „What Happens Next" in fünf Schritten nimmt die Unsicherheit nach der Anfrage |
| Kontaktpunkte | Telefon, Adresse, Formular und CTA an mehreren Stellen |

Nicht übernommen (harte Grenzen und Regelwerk):

* die Kennzahlen (z. B. „10.565 %") als Vorbild: unbelegte Zahlen sind bei uns verboten, eigene
  Belege nur mit Quelle und Freigabe des Kunden
* „AI-powered Revenue Engine" und ähnliche Schlagworte (`12-copywriting.md`, `26-geschmack-und-ki-tells.md`)
* Texte, Claims, Logos, Badges, Farben, Schriften und Bilder (Abschnitt „Wie Referenzwebsites genutzt werden")
* die Ankündigungsleiste über der Navigation mit Fremdangebot, wenn der Kunde keinen Zweitzweck hat

Offen: Die Aufnahme als **Muster** in `assets/musterbibliothek/` läuft über Tor 2 und setzt
Erfassung, Design DNA und Vergleich voraus. Das ist nicht geschehen. Bis dahin ist dies ein
Hinweis für die Auswahl, kein Muster.

### Hook Agency

`hookagency.com`, Stand 11.10.2026, vom Inhaber als gute Designquelle freigegeben (Tor 1, ganze
Seite, ohne eigene Begründung). Marketing für Handwerksbetriebe, damit dieselbe Lage wie Comrade.
Prinzipien aus der Textauswertung, **Optik nicht gesehen**:

| Prinzip | Beobachtung |
|---|---|
| Ein Primär-CTA mit Beleg-CTA daneben | „Book an Intro Call" und „View Contractor Results", beide mehrfach |
| Problem vor Leistung | Aussage, dass nicht die Anfragen fehlen, sondern die Wirkung nach außen, danach drei nummerierte Schmerzpunkte |
| Prozess mit Zeitangaben | fünf Schritte, 20 Minuten Erstgespräch, 60 Minuten Videogespräch, monatlicher Bericht: das senkt das Risiko des ersten Anrufs |
| Belege in Schichten | Logos, Bewertungszahl, Kurzzitate, Fallkarten, Langzitate |
| Offene Preise | Stufen mit „ab"-Preis, Ratenhinweis, Einwände in der FAQ |
| Versprechen als Grundsatz | ein kurzer, unterschriebener Grundsatz statt Garantiefloskeln |

Nicht übernommen: Umsatzbehauptungen von Dritten, Verben wie „dominate", doppelter Text bei den
Schmerzpunkten, Fallkarten ohne sichtbare Zahl, die Bindung über ein Jahr nur in der FAQ (der
Hinweis gehört neben den Preis), kein Formular auf der Seite (bei uns steht das Formular am CTA).

### BeeToGreen

`beetogreen.com`, Stand 11.10.2026, vom Inhaber als gute Designquelle freigegeben (Tor 1, ganze
Seite, ohne eigene Begründung). Software mit zwei Zielgruppen. Prinzipien aus der Textauswertung,
**Optik nicht gesehen**:

| Prinzip | Beobachtung |
|---|---|
| Aufteilung nach Zielgruppe | ein Block für Unternehmen, ein Block für Mitarbeitende, je mit eigenem Nutzen und eigenem CTA |
| Dreischritt | „ausrüsten, einsteigen, begleiten" als Prozessübersicht |
| Rechner als Beleg | Wirkung mit voreingestellten Werten, mit Handlungsaufruf nach dem Ergebnis |
| Logos in zwei Gruppen | Kunden und Partner getrennt |
| Zahlen zum Umfang | Anzahl Modelle, Anzahl Stellplätze, Anzahl Berater |
| FAQ gegen Einwände | sieben Fragen zu Umsetzung und Verwaltung |

Nicht übernommen: Hero ohne klaren Nutzensatz, mehrere CTAs mit gleichem Ziel, eine Überschrift
in anderer Sprache, die Steuer- und Förderzahlen als Muster (sie gelten nur für diesen Markt und
brauchen eine Quelle), Namen und Logos der Kunden.

### MDCC Inc.

`mdccinc.com`, Stand 11.10.2026, vom Inhaber nach dem Durchklicken der Live-Seite freigegeben
(Tor 1, ganze Seite). Renovierung, Bau und Reinigung in Maryland, damit die Lage des
Handwerksbetriebs, der eine Angebotsanfrage will. Aus einer Liste von 44 Referenzen
(Awwwards, Land-book, Dribbble, Webdesign Inspiration) ausgewählt.

Warum sie gefällt (Begründung des Inhabers): stark auf Conversion ausgelegt, Beweise,
aufgelistete Vorteile, geht auf die einzelnen Leistungsbereiche direkt ein, Social Media und
die Google-Bewertung sind eingebunden.

Prinzipien, die übernommen werden dürfen (aus der Textauswertung der Liste, die Optik hat der
Inhaber gesehen, ich nicht):

| Prinzip | Beobachtung |
|---|---|
| Hero aus Leistung und Region | die Überschrift nennt, was getan wird und wo, darunter zwei Zeilen zu Lizenz, Versicherung und Einzugsgebiet |
| Bewertung direkt am Knopf | Sterne, Anzahl und Quelle stehen unter dem Angebots-Button, nicht weiter unten |
| Telefon und Anfrage immer da | Nummer und Angebots-Button bleiben in der Navigation sichtbar |
| Leistungsbereiche als Tabs | je Bereich eine Checkliste, ein Foto und ein eigener CTA |
| Vorteile als kurze Spalten | vier Spalten mit je einem Nutzen („Warum wir") |
| Kundenstimmen mit Gewerk | Vor- und Nachname und die Arbeit (Boden, Trockenbau, Umbau) statt allgemeinem Lob |
| Notdienst getrennt | eigener Hinweis mit Telefonnummer, klar abgesetzt vom Regelgeschäft |
| echte Baustellenfotos | Fotos mit Firmenschild statt Stockbildern |

Nicht übernommen: die Ähnlichkeit zu Webflow-Vorlagen (zwei Karten mit gleichem Titel,
Beschreibung bei privat und gewerblich identisch, Wiederholung des Hero-Textes im ersten
Block), leere Flächen in den Vorteilsspalten durch spät sichtbare Inhalte, ein Laufband mit
Leistungs-Tags als zweites Laufband (die Grenze von einem je Seite gilt, `26-geschmack-und-ki-tells.md`),
Texte, Claims, Logos und Fotos. Die Referenz hat keinen Ablauf („wie läuft ein Auftrag") und kein
Vorher und Nachher auf der Startseite: beides bei uns ergänzen, statt die Lücke zu übernehmen.
Die Bewertungszeile gilt nur mit echter, belegter Zahl und Quelle (`google-bewertungen.md`).

### epple Verpackungsservice

`vs-epple.de`, Stand 11.10.2026, vom Inhaber nach dem Durchklicken freigegeben (Tor 1, ganze
Seite). B2B Verpackungsdienstleister in Deutschland, damit der Mittelstand mit Fertigung und
erklärungsbedürftigem Angebot, deutsche Ansprache.

Warum sie gefällt (Begründung des Inhabers): tritt professionell auf, beschreibt genau, worum es
geht, geht auf die einzelnen Bereiche ein, nennt Kennzahlen und Vorteile, zeigt Zertifikate und
Siegel.

Prinzipien aus der Textauswertung der Liste, Optik vom Inhaber gesehen:

| Prinzip | Beobachtung |
|---|---|
| Superlativ mit Beleg | die Überschrift behauptet, der Untertitel belegt („Seit über 60 Jahren") |
| Leistungsstruktur in Ebenen | drei Leistungen, dazu die Formen und Varianten als Liste, dazu die Arbeitsweise in vier Prinzipien |
| eine starke Kennzahl | eine einzige Zahl als Anker statt vieler schwacher |
| Qualität messbar | Qualitätsversprechen, das sich prüfen lässt, dazu die Zertifikate als eigenes Modul |
| Zitat der Geschäftsführung | mit Name und CTA „Lassen Sie uns sprechen" als persönlicher Abschluss |
| ruhiges Layout | große Schrift im Fließtext, viel Luft, hohe Lesbarkeit |
| Abschnittsmarke | kleines Label mit Punkt als Seitenmarker |

Nicht übernommen: der helle Geisterknopf als Hero-CTA (zu wenig Gewicht, `26-geschmack-und-ki-tells.md`,
Konturbutton nie als Primärknopf), der Text-Reveal mit hellgrauem Startzustand (Kontrast, und ohne
`prefers-reduced-motion`-Rückfall nicht zulässig, `30-motion-pruefung.md`), ein Untertitel im
Hero, der beim ersten Bildschirm hinter dem Cookie-Banner liegt, viel Fließtext bei wenigen
Bildbeweisen in den ersten Abschnitten. Kennzahlen, Jahre und Zertifikate des Vorbilds sind
nicht Belege des Kunden: übernommen wird die Form, nicht die Zahl.

### Driessen Architectuur

`driessenarchitectuur.nl`, Stand 11.10.2026, vom Inhaber nach dem Durchklicken freigegeben
(Tor 1, ganze Seite). Architekturbüro mit Wohnen, Büro, Zorg, Leisure und Bildung in der
Grenzregion zu NRW, damit regionale Premium-Dienstleister, Planer und Bauunternehmen mit
Referenzprojekten.

Warum sie gefällt (Begründung des Inhabers): ein Video gibt sofort einen Einblick in die
Arbeit, die Bereiche werden beschrieben, Projekte erscheinen mit Bildern und Videos, Kundenaussagen
sind mit guten Videos untermalt, es gibt überall einen klaren CTA und einen mitlaufenden CTA.

Prinzipien aus der Textauswertung der Liste, Optik vom Inhaber gesehen:

| Prinzip | Beobachtung |
|---|---|
| Video als Einblick | das Hero-Video zeigt die Arbeit selbst, ein Button „Film ansehen" öffnet es als Overlay |
| schwebender Kopf | weiße Karte mit Telefon (Kontur) und Kontakt (gefüllt, Pfeil), immer sichtbar |
| nummerierte Gliederung | Abschnitte 1.0 bis 1.4 mit Punktmarke, gut zu überblicken |
| Fachbereiche als Liste | sechs Bereiche nummeriert, gut für Zielgruppen und Suche |
| Projekte mit Ort und Kategorie | jedes Projekt mit Bild, Ort und Art, als Referenzsammlung |
| Stimmen mit Rolle und Firma | Name, Funktion und Unternehmen, dem Projekt zugeordnet |
| Abschluss mit offenen Daten | Adresse, Telefon, Mail, Verbandsmitgliedschaft und Registernummer |
| Cookie-Banner fair | „Weigern" gleichrangig zu „Akzeptieren" |

Nicht übernommen: das gepinnte Hero mit langem Weg bis zum ersten Inhalt, ein Video, das ohne
Poster zunächst leer lädt (Poster und träges Laden sind Pflicht, `38-scrollvideo-und-einbettungen.md`),
ein großer Cookie-Banner über dem Hero, schwacher Kontrast von Text auf Video im oberen Bereich,
Pin und schwebender Kopf auf Mobil ungeprüft (vor Übernahme testen). Zur Sticky-Gruppe siehe
`16-responsive-container.md`, Abschnitt 5.

Für alle fünf gilt wie bei Comrade: Aufnahme als **Muster** nur über Tor 2, Erfassung steht aus.
Die Prinzipien stammen aus einer Textauswertung der Referenzliste vom 11.10.2026, nicht aus einer
eigenen Erfassung; der Viewport der Auswertung war ca. 1536 mal 639, Mobil wurde nicht getestet.

## Abgelehnte Referenzen

Vom Inhaber am 11.10.2026 nach Ansicht abgelehnt („nicht gut"). Sie werden **nicht erneut
vorgeschlagen**, auch nicht in der Ausgangsliste oder bei einer Recherche in derselben Branche.
Einzelne Gründe hat der Inhaber nicht genannt; die Stichworte unten sind meine Beobachtungen
aus der Textauswertung und kein Urteil des Inhabers.

| Seite | Beobachtung aus der Textauswertung |
|---|---|
| `metriccivil.ca` | Held ohne CTA, „Request a bid" erst am Seitenende |
| `mercury.com` | Gedankenstriche und Jargon in der Copy, Branche weit weg von Handwerk |
| `become-a-yogi.com` | drei externe Dienste für Buchung, Community und Beratung, lange Seite |
| `odysseeclinic.com.au` | keine Bewertungen, keine Qualifikationen, abstrakte Copy |
| `twks.ch` | Leistungen nur im Menü |
| `lpas.com` | kein CTA, Karussell im Held |
| `oathbiome.com` | Reste einer Shopvorlage und unbelegte Zahl im Text |
| `drone.riotters.com` | Technikdemo einer Agentur, kein echter Anbieter |
| `royalsites.ie` | kein CTA, Tippfehler |

## Vorrang der Conversion

Gestaltung dient dem Ziel der Seite, nicht umgekehrt. Daraus folgen harte Regeln:

* Die primäre Handlung ist zu jedem Zeitpunkt sichtbar oder in einem Schritt erreichbar.
* Animationen dürfen Inhalte, Navigation, Formulare oder Handlungsaufforderungen weder
  verzögern noch verbergen. Ein Element, das erst nach dem Scrollen erscheint, muss auch
  ohne JavaScript vorhanden und lesbar sein.
* Kein Eingangsbildschirm, kein Ladebalken zur Inszenierung, keine Sektion, die erst nach
  einer Animation bedienbar wird.
* Bei Zielkonflikt zwischen Wirkung und Verständlichkeit gewinnt die Verständlichkeit. Die
  Abwägung im Abschlussbericht in einem Satz nennen.

Landingpages bekommen einen fokussierten Pfad mit einer Handlung und keine Navigation, siehe
`../../webdesign-conversion/playbooks/landingpage.md`. Unternehmenshomepages dürfen mehrere
Nutzerwege anbieten, etwa Leistungen, Karriere und Kontakt, definieren aber trotzdem genau
eine primäre Conversion, die überall gleich benannt wird.

## Universeller Aufbau: Unternehmenshomepage

Als Ausgangsstruktur, nicht als Zwang. Abweichungen sind erlaubt, wenn das Material sie
verlangt, und werden begründet. Die knappere Variante für B2B Dienstleister steht in
`../../webdesign-conversion/references/00-fahrplan.md` Schritt 2.

1. Navigation mit primärer Handlungsaufforderung
2. Hero mit Zielgruppe, Ergebnis und Handlungsaufforderung, auf voller Bildschirmhöhe
3. unmittelbarer Vertrauensbeweis
4. Problem oder Ausgangslage
5. zentrale Leistungen oder Lösung
6. konkreter Ablauf
7. Ergebnis und Nutzen
8. Referenzen oder Fallbeispiele
9. Differenzierung, also warum dieser Anbieter
10. Kundenstimmen und Kennzahlen
11. Einwandbehandlung oder häufige Fragen
12. abschließende Handlungsaufforderung
13. Footer mit Kontakt, Navigation und Rechtstexten

## Universeller Aufbau: Landingpage

1. präziser Hero
2. Haupt Handlungsaufforderung oder kurzes Formular
3. Vertrauenselemente direkt darunter
4. Problem und gewünschtes Ergebnis
5. Lösung mit konkreten Vorteilen
6. Ablauf
7. Beweise, Ergebnisse, Referenzen
8. Einwände
9. häufige Fragen
10. wiederholte Handlungsaufforderung oder Formular
11. rechtliche Hinweise und Footer

Bei beiden gilt: keine Folge von Sektionen auf identischer Fläche ohne Abstufung. Bildgrund,
Flächenwechsel oder typografische Hierarchie nach
`../../webdesign-conversion/references/21-sektionshintergruende-hierarchie.md` gehören in
den Plan, nicht in die Nacharbeit.

## Umgang mit fehlendem Material

Wenn für eine Sektion der Struktur nichts vorliegt, etwa keine Kundenstimmen und keine
Kennzahlen, wird die Sektion **nicht mit erfundenem Inhalt gefüllt**. Zwei zulässige Wege:
die Sektion entfällt und die Struktur bleibt tragfähig, oder sie wird als Platzhalter
angelegt und im Abschlussbericht mit der Angabe aufgeführt, was der Kunde liefern muss.

Eine belegte Quelle groß ist mehr wert als vier Kacheln, von denen drei leer sind. Die
Kennzeichnung eigener Textvorschläge regelt
`../../webdesign-conversion/references/12-copywriting.md`.
