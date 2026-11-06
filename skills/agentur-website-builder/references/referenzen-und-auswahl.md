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

Zwei Zielgruppen, Nische und Projektgeschäft (alle freigegeben, Erfassung vom 06.11.2026):
`electriccarscheme.com`, `siliconhillstalent.com`, `teifmoreaux.com`, `flo-corp.com`

Produkt und Softwareanbieter, stark in Struktur und Argumentationsaufbau:
`brand.ai`, `showit.com`, `luffu.com`, `pop.site`, `trymira.com`, `cofactr.com`,
`carcompany.ai`, `amp.framer.media`, `voltaskai.endover.ee/en`

Marke, Atmosphäre und Produktinszenierung:
`bynd.com/eu`, `onewhale.io`, `wattspet.com`, `rideradian.com`, `wegems.co`, `designbell.io`

Ruhe, Nähe und Dienstleistung am Menschen:
`kalmmoments.com`, `tropica.framer.website`

Verein, Community und Organisation:
`hadi-community.de`, `iwcf.org`, `pennywise.org` (freigegeben)

Angebote mit hoher Hürde und Bewerbung, nur als Strukturvorbild:
`danscryptomastermind.com` (freigegeben, Ton und Versprechen ausdrücklich nicht)

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

### Erfassungsrunde vom 06.11.2026

Sechs Seiten, vom Inhaber zur Aufnahme genannt (Tor 1, ganze Seite, ohne eigene Begründung, mit dem
Auftrag, Komposition, Layout, Farbgebung und Platzierung der Conversion zu betrachten). Anders als die
Runde vom 11.10.2026 ist das hier eine **eigene Erfassung**, keine Textauswertung: Playwright mit
Chromium, Desktop 1440 × 900 und Mobil 390 × 844, ganze Seite und zusätzlich Bildschirm für
Bildschirm gescrollt, weil drei Seiten Inhalte erst beim Scrollen einblenden. Farben, Schriften,
Überschriften und Knöpfe sind aus den berechneten Stilen ausgelesen, die Kontraste nachgerechnet.
Nicht erfasst: Unterseiten, Verhalten nach dem Absenden eines Formulars, Ladezeiten, Tastaturbedienung.
Fünf der sechs Seiten laufen auf Squarespace (im Quelltext erkennbar), Teif Moreaux ohne erkennbaren
Baukasten. Die Zahlen in den Tabellen beschreiben die Vorbilder, sie sind keine Belege für Kunden.

### The Electric Car Scheme

`electriccarscheme.com`, Stand 06.11.2026. Gehaltsumwandlung für Elektroautos in Großbritannien,
verkauft an Arbeitgeber, genutzt von Mitarbeitenden. Gilt für Dienstleister mit **zwei Zielgruppen**,
Finanzierungs- und Förderangebote, erklärungsbedürftige Modelle. Ergänzt BeeToGreen, das dieselbe
Lage nur als Text zeigte.

Sektionsfolge: Kopf mit Rechner-CTA, Bewertungszeile, Held mit zwei Knöpfen und vier Häkchen, zwei
Bildkarten (eine mit Ablauf 01 bis 03), Logoleiste, Bild und Text mit CTA, drei Preisbeispiele,
sechs Vorteilskarten, Kundenstimmen auf dunkler Fläche, CTA-Banner, Kennzahlen, FAQ für HR und
Finanzen, Fußzeile mit Registerangaben. Rund 9.900 px.

Farbe und Schrift: Weiß und Creme (#F9F5EC) als Flächen, Dunkelgrün (#285350) als Ankerfläche für
Belege, Mint (#61CCAC) als Handlungsfarbe, Gelb (#FEBC2F) genau einmal für den Kopf-CTA. Schwarz auf
Mint 10,7:1, auf Gelb 12,5:1. Überschriften fett, zentriert, H1 rund 85 px.

| Prinzip | Beobachtung |
|---|---|
| Beleg über der Überschrift | Bewertungszeile mit Wert, Anzahl und Quelle steht vor der H1, nicht darunter |
| Eine Farbe je Zielgruppe | Kopf-CTA für Mitarbeitende („Ersparnis berechnen") in Gelb, Held-CTA für Arbeitgeber („Demo buchen") in Mint |
| Primär und risikoarme Zweitoption | Demo gefüllt, Erklärdokument zum Herunterladen daneben, gleich groß |
| Spanne statt Zielgruppenfloskel | der Untertext nennt „von 10 bis 100.000 Mitarbeitende" und damit, für wen es passt |
| Ablauf im ersten Bild | drei Schritte als Oberflächenkarte über dem Foto, keine eigene Sektion |
| Preis konkret | drei Beispielkarten mit „ab"-Monatspreis, Reichweite und Ersparnis, jede mit eigenem Anfrageknopf |
| Belege in Schichten | Bewertungszeile, B Corp Siegel, Logoleiste, Stimmen mit Foto, Rolle und Firmenlogo |
| FAQ nach Rolle | „Häufige Fragen von HR und Finanzen", zehn Fragen zu Kosten, Austritt, Steuer |
| Rechtsangaben offen | Register, Aufsicht und Vermittlerstatus vollständig in der Fußzeile, Vertrauen bei Geldthemen |
| Mobil | Knöpfe in voller Breite im ersten Bildschirm |

Nicht übernommen: Kennzahlenkarten, die bei der Erfassung „0", „£0" und „0+" zeigten (siehe Gemeinsame
Befunde), Outfit und Poppins (Poppins ist gesperrt), die Kundenstimmen dreifach im DOM mit je einer H2
pro Name (Dubletten für Bildschirmleser, falsche Gliederung), sechs Menüpunkte mit vier Untermenüs,
die britischen Steuer- und Sparzahlen, Texte, Logos und Fotos.

### Teif Moreaux

`teifmoreaux.com`, Stand 06.11.2026. Eventagentur für Strategie, Gestaltung und Produktion. Gilt für
kreative Dienstleister und Projektgeschäft, bei dem das Foto der Arbeit der stärkste Beleg ist
(Veranstalter, Messebau, Architektur, Bühne, Ausstattung). Nächster Verwandter in dieser Liste:
Driessen Architectuur.

Sektionsfolge: Vollbildfoto einer echten Produktion mit H1 unten links und „Arbeiten ansehen" unten
rechts, ein Satz Positionierung, Kundenlogos, drei Leistungen nummeriert mit Kontakt-CTA, Projekt im
Vollbild als Schieber, vier Kennzahlen, Zitat, Blog. Rund 5.100 px, also kurz.

Farbe und Schrift: fast nur Schwarz (#0A0A0A) und Weiß, Warmgrau (#F4F3EF) als Wechselfläche, Magenta
nur für Zitatzeichen und das Plus einer Kennzahl. Geometrische Grotesk in leichtem Schnitt für
Überschriften, Monospace in Versalien für Labels und Knöpfe.

| Prinzip | Beobachtung |
|---|---|
| Das Foto ist der Beleg | echte Produktion in einem Stadion statt Illustration, Text auf der ruhigen Bildzone |
| Überschrift nennt nur die Leistung | drei Wörter für drei Leistungen, kein Versprechen |
| Diagonale Komposition | H1 unten links, CTA unten rechts: das Auge läuft über das Bild zum Knopf |
| CTA als Gespräch | „Lass uns reden" im Kopf, „Klingt passend? Schreib uns" direkt nach den Leistungen |
| Akzent fast unsichtbar | eine Akzentfarbe an zwei Stellen, sonst nur Schwarz, Weiß, Warmgrau |
| Kennzahlen mit Bezug | Gründungsjahr, Anzahl Events, Gäste, Anteil wiederkehrender Kunden |
| Zitat mit Anlass | Name, Rolle und die Veranstaltung mit Jahr |
| Kopf bleibt | „Lass uns reden" ist beim Scrollen sichtbar |

Nicht übernommen: Kontur- und Glasknöpfe als einzige Knopfform, auch für den Haupt-CTA (Konturbutton
nie als Primärknopf, `../../webdesign-conversion/references/26-geschmack-und-ki-tells.md`), kein
Formular, nur Mail, das Projektkarussell mit Zählung „02 / 04", die H1 in Kleinbuchstaben (Markenmanier,
im Deutschen mit Substantiven nicht übertragbar), Text auf unruhigem Foto ohne Abdunklung, auf Mobil der
Held-CTA ganz unten im Bild.

### Dan's Crypto Mastermind

`danscryptomastermind.com`, Stand 06.11.2026. Bezahlte Mitgliedschaft mit Bewerbung, zwei Stufen zu
10.000 und 25.000 US-Dollar im Jahr. Gilt nur als **Strukturvorbild** für Angebote mit hoher Hürde und
Bewerbungsverfahren (Coaching, Programm, Premiumberatung), **nie** für Ton und Versprechen.

Sektionsfolge: Held mit Ergebnisversprechen, Video, Beschreibung mit Gerätemockup, vier Strategien,
Leistungsumfang, Videostimmen, „Für wen", Gründerprofil, „Wer aufgenommen wird", Preise, weitere
Videostimmen, FAQ, zwei Bewerbungswege, Chatscreenshots. Rund 15.300 px, „Jetzt bewerben" zwölfmal.

Farbe und Schrift: Schwarz (#111) als Grund, Gold (#B89D51) als Akzent und Wechselfläche, weiße
Abschnitte für Stimmen und Preise. Gold auf Schwarz 7,2:1, Gold auf Weiß 2,6:1.

| Prinzip | Beobachtung |
|---|---|
| Ein Ziel, ein Wortlaut | derselbe CTA-Text in derselben Form nach jedem Argumentblock |
| Länge folgt der Hürde | hoher Preis, lange Seite, Belege früh und mehrfach (`../../webdesign-conversion/references/45-huerde-laenge-und-leserfuehrung.md`) |
| Qualifizieren statt überreden | drei Profile „für wen" und drei harte Voraussetzungen stehen vor dem Preis |
| Zwei Wege zur selben Handlung | Bewerbung per Gespräch oder per Formular nebeneinander, je ein Satz, was passiert |
| Preisstufen mit Entscheidungshilfe | der Satz über den Karten sagt, wer welche Stufe nimmt; die höhere ist farbig hervorgehoben |
| Videostimmen mit Ergebniszeile | Untertitel im Bild, darunter Name und ein Satz zum Ergebnis |

Nicht übernommen: Einkommens- und Renditeversprechen in Überschrift und Stimmen („7M+", „100x",
„84 % Trefferquote"), die bei uns als unbelegte Zahl und bei Geldanlage als irreführende Werbung gelten
würden (`../../webdesign-conversion/references/34-ueberzeugungsausloeser.md`, realistisch behaupten),
Chatscreenshots als Beleg (nicht prüfbar), die Pille „Willkommen bei" als Kicker und das farbige
Akzentwort in fast jeder Überschrift (beides meldet `pruefe-geschmack.mjs`), das Schwarz-Gold-Schema als
Luxusvorlage, Gold als Textfarbe auf Weiß, Poppins, eine Kontaktadresse bei einem Freemailer, das
Cookie-Banner ohne Ablehnen, auf Mobil ein erster Bildschirm mit neun Zeilen Überschrift und ohne CTA.

### Silicon Hills Talent

`siliconhillstalent.com`, Stand 06.11.2026. Personalvermittlung für KI-, Robotik- und Hardware-Startups,
Zielgruppe Gründer und technische Leitung. Gilt für B2B-Dienstleister mit enger Nische (Vermittlung,
Beratung, Fachplanung), bei denen das Verständnis der Branche das Argument ist.

Sektionsfolge: dunkler Held mit gedimmtem Foto und gerundeter Unterkante, Belegpille, zentrierte H1,
zwei Knöpfe, eine weiße Kennzahlenkarte überlappt die Kante, vier Schmerzpunkte auf dunkler Fläche,
Überleitungssatz mit CTA, lange Stimmen, Blog, CTA-Block, Abschluss mit großer Wortmarke. Rund 6.100 px.

Farbe und Schrift: Anthrazit (#1A1B1F) und fast Weiß (#F9F9FB) im Wechsel, Hellgrün (#B6FD86) als
einzige Handlungsfarbe, dunkler Text darauf 14,2:1. Grauer Nebentext (#808185) auf Hellgrau nur 3,7:1.

| Prinzip | Beobachtung |
|---|---|
| Nische ausgeschrieben | der Untertext zählt die vier Fachgebiete auf, kein „für Unternehmen jeder Größe" |
| Schmerzpunkte als Überschriften | vier Karten in der Sprache der Zielgruppe, jede mit einem Satz Folge |
| Überlappende Karte | die Kennzahlenkarte liegt halb auf dem Held und zieht den Blick in die nächste Sektion |
| Eine Handlungsfarbe | Hellgrün nur für Knöpfe und Symbolflächen, sonst neutral |
| Zweitknopf zur Methode | „So arbeiten wir" statt „Mehr erfahren" |
| Kennzahl mit Zeitbezug | Verbleibquote „nach 12 Monaten" statt einer nackten Prozentzahl |
| Abschluss als Frage | „Bereit, ein Team aufzubauen, das wächst?" mit einem Knopf vor der Fußzeile |

Nicht übernommen: Plus Jakarta Sans (gesperrt), die Pille mit Icon als Kicker, die Wortmarke als
Wasserzeichen in der Fußzeile (Mode), der Widerspruch „300+" im Held und „299 +" in der Kennzahl, der
graue Nebentext unter 4,5:1, die Handlungsfarbe auch auf den Cookie-Knöpfen (verwässert die Farbe),
der Kopf, der beim Scrollen verschwindet.

### Pennywise Foundation

`pennywise.org`, Stand 06.11.2026. Gemeinnützige Stiftung, Ziel ist die Spende. Gilt für Vereine,
Stiftungen und Initiativen mit einer einzigen Handlung (spenden, Mitglied werden, unterstützen).
Ergänzt `hadi-community.de` und `iwcf.org` in der Ausgangsliste.

Sektionsfolge: schwebender Kopf als weiße Karte mit Spendenknopf, Held mit Gruppenfoto und
zweifarbiger Versalienüberschrift, ein Satz und Spendenknopf, aktueller Anlass mit Fotos, Ort, Datum
und Zahl der Betroffenen, zwei Kennzahlen mit Karte, Schwerpunkte als nummerierte Fotokarten,
eingebettete Grafik zum Modell, Fußzeile mit Newsletter, Transparenzsiegel, Adresse. Rund 4.300 px.

Farbe und Schrift: Rotbraun (#79422F) als Fläche, Dunkelbraun (#453631) als Text, Orange (#FCB65A) als
Handlungsfarbe, Weiß. Brauner Text auf Orange 6,6:1, Weiß auf Rotbraun 8,0:1, das orange Akzentwort
auf Weiß nur 1,75:1. Schmale Versalgrotesk für alle Überschriften.

| Prinzip | Beobachtung |
|---|---|
| Eine Handlung, zweimal sofort | Spendenknopf im Kopf und im Held, gleiche Form und Farbe |
| Dringlichkeit belegt | der aktuelle Anlass nennt Ort, Datum und Zahl der Betroffenen, statt „jetzt helfen" zu rufen |
| Warme Erdfarben | Braun und Orange statt des üblichen Hilfsorganisationsblaus, passt zu Fotos von Menschen |
| Schwebender Kopf | weiße Karte mit Abstand zum Rand über dem Foto |
| Siegel am Ende | Transparenzsiegel einer unabhängigen Stelle neben Adresse und Telefon |
| Kurz | eine Handlung, wenig Text, keine Unterseite nötig, um zu spenden |

Nicht übernommen: das orange Akzentwort auf Weiß (Kontrastfehler, und Akzentwort als Manier), Versalien
auch in Navigation und Knöpfen (Lesbarkeit), die eingebettete Grafik von einem Fremdserver ohne
Einwilligung und ohne Textalternative (`../../webdesign-conversion/references/38-scrollvideo-und-einbettungen.md`),
Kennzahlen, die bei der Erfassung zwischen „101+", „127+" und „149+" lagen, der Schieber für die
Schwerpunkte, das Newsletterfeld ohne sichtbares Label, das Cookie-Banner ohne Ablehnen.

### FLO-CORP

`flo-corp.com`, Stand 06.11.2026. Hersteller von Füllstand- und Durchflussmesstechnik seit 1989, mit
Shop und Angebotsanfrage. Gilt für Mittelstand, Hersteller und technische B2B-Produkte, bei denen ein
Teil direkt kauft und ein Teil Beratung braucht. Nächster Verwandter: epple Verpackungsservice.

Sektionsfolge: rote Hinweisleiste „Nicht sicher, welches Gerät passt? Mit Fachleuten sprechen", Kopf
mit Telefon und Angebot, Held links mit Produktbild rechts und zwei Knöpfen, Kundenlogos, drei
Produktkarten, Kennzahlenraster, Leistungen mit Foto, 16 Branchen als Kacheln, Unternehmen auf Schwarz,
News, Stimmen, FAQ, Kontakt mit Formular, Newsletter, Fußzeile mit Werkzeugen. Rund 10.800 px.

Farbe und Schrift: Weiß, Hellgrau (#EEEEF2), Schwarz und Signalrot (#FC031C); die Markenfarbe ist
zugleich die Handlungsfarbe. Weiß auf Rot 4,06:1, also nur für große Schrift. Grotesk für Überschriften,
Monospace in Versalien für Labels und Knöpfe.

| Prinzip | Beobachtung |
|---|---|
| Unsicherheit vor der Navigation abfangen | die Hinweisleiste spricht genau den Zweifel bei einem Beratungsprodukt an und bietet das Gespräch |
| Drei Wege nach Reife | anrufen, Angebot anfragen, direkt kaufen; je Zone ist nur einer gefüllt |
| Unterscheidung im Untertitel | „einzige fünfjährige Garantie der Branche" steht im ersten Bildschirm |
| Produktkarte mit Fachangabe | Kategorie als Label, Name, ein Satz Technik, eigener Knopf |
| Branchen zur Selbstzuordnung | 16 Kacheln mit Icon, jede eine Einstiegsseite, gut für Suche |
| Formular, das qualifiziert | Anfrageart und Produkt als Pflichtauswahl, Adresse und Telefon auf roter Fläche daneben |
| Werkzeuge in der Fußzeile | Rechner, Glossar, FAQ und noch einmal beide CTAs |

Nicht übernommen: Kennzahlen, die bei der Erfassung „26+" statt „35+" und „4 Yr" statt „5 Yr" zeigten,
Copyright 2025 in der Fußzeile neben News vom November 2026 (`pruefe-aktualitaet.mjs`), Inter
(gesperrt), Weiß auf Rot für Kleintext, ein persönliches Glaubensbekenntnis im Unternehmensteil (Haltung
des Inhabers, nicht übertragbar), zwei Newsletterfelder auf einer Seite, das Cookie-Banner ohne Ablehnen,
auf Mobil eine zweizeilige Hinweisleiste und kein CTA im ersten Bildschirm.

### Gemeinsame Befunde der Runde vom 06.11.2026

Was sich über mehrere der sechs Seiten zeigt und für unsere Builds gilt:

| Befund | Wo | Folge für uns |
|---|---|---|
| Hochzählende Kennzahlen zeigen falsche Werte, solange die Animation nicht durchgelaufen ist | Electric Car Scheme („0"), Silicon Hills, Pennywise, FLO-CORP | der Endwert steht im HTML, die Animation zählt nur sichtbar, bei `prefers-reduced-motion` gar nicht; Zahl nur mit Beleg (`../../webdesign-conversion/references/09-motion-gsap.md`) |
| Einblenden beim Scrollen lässt ganze Sektionen leer | Dan's Crypto, Silicon Hills, Pennywise auf dem ganzseitigen Bild | Startzustand nie unsichtbar für Inhalt, Prüfung mit `pruefe-scrollstrecke.mjs` und Kapitel 30 |
| Eine gesättigte Handlungsfarbe, Rest neutral | alle sechs | stützt die Faustregel 60 30 10 in `../../webdesign-conversion/references/10-visuelle-richtung.md` |
| Cookie-Banner ohne gleichrangiges Ablehnen | vier der fünf Squarespace-Seiten | bei uns der eigene Banner aus `../assets/consent/`, Ablehnen auf derselben Ebene (`../../webdesign-conversion/references/07-recht-dsgvo.md`) |
| Banner deckt auf Mobil ein Drittel des ersten Bildschirms | alle fünf mit Banner | Banner kompakt, Kernbotschaft und CTA bleiben sichtbar |
| CTA im ersten Bildschirm auf Mobil | nur Electric Car Scheme, Silicon Hills, Pennywise | Pflicht bei uns, auch wenn die Desktopfassung ihn zeigt |
| Gesperrte Standardschriften | Poppins, Inter, Plus Jakarta Sans | Schrift aus der Marke oder nach `../../webdesign-conversion/references/10-visuelle-richtung.md`, nie aus der Referenz |
| Pille als Kicker, farbiges Akzentwort | Dan's Crypto, Silicon Hills, Pennywise | Tells nach Kapitel 26, `pruefe-geschmack.mjs` meldet beide |

Für alle sechs gilt: Aufnahme als **Muster** in `assets/musterbibliothek/` nur über Tor 2. Die
Erfassung liegt jetzt vor, Design DNA und Mustervergleich sind nicht gelaufen. Die Screenshots lagen
nur im Arbeitsordner der Sitzung und sind nicht im Repository, weil fremdes Bildmaterial nicht
mitgeliefert wird.

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
