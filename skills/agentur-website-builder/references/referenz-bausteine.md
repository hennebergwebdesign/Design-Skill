# Bausteine aus freigegebenen Referenzen

Diese Datei macht aus den freigegebenen Referenzen wiederverwendbare Abschnitte. Je Baustein steht,
**warum** er wirkt, **wie** er aufgebaut ist und **wann** er passt. Gebaut wird immer mit Material,
Marke und Belegen des Kunden; übernommen wird das Prinzip, nie Text, Bild, Farbe oder die erkennbare
Kombination einer Referenz (Abschnitt „Wie Referenzwebsites genutzt werden" in
`referenzen-und-auswahl.md`).

Quelle: die Erfassungsrunde vom 06.11.2026 in `referenzen-und-auswahl.md` (Electric Car Scheme,
Teif Moreaux, Dan's Crypto Mastermind, Silicon Hills Talent, Pennywise, FLO-CORP), 54 Menüseiten im
Browser aufgenommen und vermessen. Die Begründungen sind eigene Ableitung aus dem Aufbau der Seiten
und aus dem Regelwerk, keine gemessene Conversion der Vorbilder; deren Zahlen kennen wir nicht.

## Inhalt

- So wird ein Baustein benutzt
- Das Seitengerüst hinter allen sechs
- Die Logik der CTA-Platzierung
- Farbe als Rollen, nicht als Palette
- Layout und Rhythmus
- Bausteine für den Held
- Bausteine für Beleg und Ablauf
- Bausteine für Angebot und Preis
- Bausteine für Entscheidung und Kontakt
- Bausteine für Unterseiten und Fußzeile
- Welche Bausteine zu welchem Kunden passen
- Verwandte Kapitel

## So wird ein Baustein benutzt

1. Im Konzept (Phase 3) je Sektion festlegen, welche Aufgabe sie im Bogen hat (Versprechen, Beleg,
   Ablauf, Angebot, Einwand, Abschluss).
2. Den Baustein wählen, der diese Aufgabe für **diesen** Kunden am besten löst (Tabelle am Ende).
3. Im Konzept den Baustein mit Kürzel nennen, zum Beispiel „Held: B1, Beleg: B5 und B11", und
   die Begründung aus der Spalte „Warum" in eigenen Worten auf den Kunden übertragen.
4. Aufbauen mit den eigenen Tokens (`marke.json`, `tokens.css`), nicht mit den Maßen des Vorbilds.
5. Fehlt dem Kunden das Material, das ein Baustein braucht (Bewertungen, Preise, Fotos), wird er
   nicht mit Attrappen gefüllt, sondern ein anderer gewählt.

## Das Seitengerüst hinter allen sechs

Alle sechs Startseiten folgen derselben Reihenfolge der Fragen, die ein Besucher stellt, nur
unterschiedlich lang. Das ist der eigentliche Grund, warum sie sich leicht lesen.

| Frage des Besuchers | Antwort auf der Seite | Beispiel |
|---|---|---|
| Bin ich hier richtig? | Held: was, für wen, ein Beleg | Electric Car Scheme: Bewertung über der H1, Spanne „10 bis 100.000 Mitarbeitende" |
| Glaube ich das? | Beleg direkt danach: Logos, Kennzahl, Siegel | Silicon Hills: Kennzahlenkarte überlappt den Held |
| Versteht ihr mein Problem? | Schmerzpunkte oder Lage | Silicon Hills: vier Karten, Pennywise: aktueller Anlass |
| Wie läuft das? | Ablauf oder Leistungen | Electric Car Scheme: drei Schritte im Bild, Teif: drei nummerierte Leistungen |
| Was kostet es, was bekomme ich? | Preisbeispiel, Produkt, Stufen | Electric Car Scheme: drei Karten mit Monatspreis, Dan's: zwei Stufen |
| Wer hat es schon gemacht? | Stimmen mit Gesicht und Rolle | alle sechs |
| Was, wenn …? | FAQ | Electric Car Scheme, FLO-CORP, Dan's |
| Was tue ich jetzt? | Abschluss mit einem Knopf oder Formular | Silicon Hills: Frage vor der Fußzeile, FLO-CORP: Formular |

**Die Länge folgt der Hürde.** Pennywise (eine Spende, 4.300 px) und Teif (ein Erstkontakt,
5.100 px) sind kurz; Electric Car Scheme (Arbeitgeber führt ein Programm ein, 9.900 px) mittel;
Dan's Crypto (10.000 US-Dollar Einstieg, 15.300 px) lang. Je größer die Entscheidung, desto mehr
Fragen müssen vor dem Knopf beantwortet sein. Regel und Stufen: `../../webdesign-conversion/references/45-huerde-laenge-und-leserfuehrung.md`.

## Die Logik der CTA-Platzierung

Ein Knopf steht dort, wo eine Frage des Besuchers gerade beantwortet ist. Daraus ergeben sich
immer dieselben Stellen.

| Stelle | Warum dort | Vorbild | Regel für uns |
|---|---|---|---|
| Kopf rechts, bleibt beim Scrollen stehen | die Entscheidung kann jederzeit fallen, der Weg darf nicht erst gesucht werden | Electric Car Scheme, Teif | ein Knopf, gefüllt, gleicher Wortlaut wie der Haupt-CTA |
| Held: Haupthandlung plus risikoarme Zweitoption | wer noch nicht bereit ist, bekommt einen kleineren Schritt statt abzuspringen | Demo und Erklärdokument; Gespräch und „So arbeiten wir"; Kaufen und Angebot | Zweitoption als Textlink oder sekundärer Knopf, nie gleich stark, nie Kontur als Haupt-CTA |
| nach jedem Argumentblock | wer gerade überzeugt wurde, soll nicht zurückscrollen müssen | Dan's zwölfmal, Electric Car Scheme nach Text und Vorteilen | derselbe Wortlaut, gleiche Form; nach einem Beleg, nie mitten in eine Aufzählung |
| an jeder Angebotskarte | der Klick fällt beim konkreten Ding, nicht beim Allgemeinen | Preisbeispiele, Produktkarten, Leistungskarten | Knopf am Kartenfuß, gleiche Höhe in allen Karten |
| Hinweisleiste über der Navigation | fängt den Zweifel „welches passt zu mir?" ab, bevor er zum Absprung wird | FLO-CORP | nur bei Beratungsprodukten, ein Satz und ein Knopf zum Gespräch |
| zwei Wege zur selben Handlung | Menschen unterscheiden sich darin, ob sie lieber sprechen oder schreiben | Dan's: Gespräch oder Formular, Teif: Mail oder Formular, Pennywise: online oder Post | nebeneinander, je ein Satz, was danach passiert |
| Abschluss vor der Fußzeile | wer bis unten liest, ist interessiert und braucht einen letzten, klaren Schritt | Silicon Hills, Electric Car Scheme | Frage als Überschrift, ein Knopf, kein neues Argument |
| Formular am Ende jeder Seite | auf Unterseiten landet man über die Suche; dort muss der Abschluss genauso da sein | FLO-CORP | bei Betrieben mit Anfrage als Ziel, höchstens fünf bis sieben Felder |
| je Zielgruppe eine Farbe | zwei Zielgruppen mit zwei Handlungen dürfen sich nicht gegenseitig verwechseln | Electric Car Scheme: Gelb für Mitarbeitende, Mint für Arbeitgeber | nur bei echten zwei Zielgruppen, sonst eine Handlungsfarbe |

Was alle sechs gemeinsam haben: **eine** Handlung ist die Hauptsache, und sie heißt überall gleich.
Ein wechselnder Wortlaut („Kontakt", „Jetzt anfragen", „Loslegen") lässt den Besucher glauben, es
seien verschiedene Wege. Regelwerk: `../../webdesign-conversion/references/06-conversion-architektur.md`.

## Farbe als Rollen, nicht als Palette

Die Seiten wirken ruhig, weil jede Farbe genau eine Aufgabe hat. Gebaut wird mit Rollen, die
Werte kommen aus der Marke des Kunden.

| Rolle | Aufgabe | Vorbilder | Anteil |
|---|---|---|---|
| Neutralfläche | Lesen, Ruhe | Weiß, Creme (Electric Car Scheme), Warmgrau (Teif), fast Weiß (Silicon Hills) | der größte Teil |
| Ankerfläche | Kapitel trennen, Belege rahmen | Dunkelgrün, Anthrazit, Rotbraun, Schwarz | einzelne ganze Sektionen |
| Handlungsfarbe | nur Knöpfe und was klickbar ist | Mint, Hellgrün, Orange, Signalrot | klein, aber überall gleich |
| Signalpunkt | ein einziger Akzent, der auffällt, weil er selten ist | Gelb für den Kopf-CTA, Magenta für Zitatzeichen | ein bis zwei Stellen je Seite |

Drei Regeln, die sich aus den Messungen ergeben:

1. **Die Handlungsfarbe gehört nur der Handlung.** Silicon Hills färbt auch die Cookie-Knöpfe in
   Hellgrün; damit verliert die Farbe ihre Bedeutung. Bei uns trägt nichts anderes die Handlungsfarbe.
2. **Text auf der Handlungsfarbe dunkel, wenn die Farbe hell ist.** Schwarz auf Mint 10,7:1, Dunkel
   auf Hellgrün 14,2:1; Weiß auf Signalrot nur 4,1:1, also nur für große Schrift.
3. **Eine Akzentfarbe als Textfarbe auf Weiß geht fast immer schief** (Gold 2,6:1, Orange 1,75:1).
   Akzente als Fläche einsetzen, Text dunkel lassen. Harte Grenze Kontrast:
   `../../webdesign-conversion/SKILL.md`, Faustwert 60 30 10: `../../webdesign-conversion/references/10-visuelle-richtung.md`.

## Layout und Rhythmus

| Prinzip | Wie es aussieht | Warum | Aufbau bei uns |
|---|---|---|---|
| Wechsel hell und dunkel als Kapitel | Electric Car Scheme: weiß, creme, dunkelgrün, mint, dunkelgrün; Silicon Hills: dunkel, hell, dunkel, hell | jeder Wechsel sagt „neues Thema", der Leser merkt den Fortschritt ohne Überschrift | höchstens zwei Flächenfarben neben Weiß, dunkle Fläche für Belege und Abschluss (`../../webdesign-conversion/references/21-sektionshintergruende-hierarchie.md`) |
| zentriert für Versprechen, linksbündig für Inhalt | Held und Abschnittstitel mittig, Karten und Fließtext links | Mitte bündelt den Blick auf eine Aussage; langer Text liest sich nur links ausgerichtet | zentriert nur bis zwei Zeilen Text darunter |
| überlappende Karte | eine Karte ragt halb aus dem Held in die nächste Sektion | das Auge folgt der Kante nach unten, der Übergang wirkt gewollt statt abgeschnitten | negativer Abstand oben in Höhe von etwa einem Drittel der Karte, mobil ohne Überlappung |
| gerundete Unterkante des Helds | Silicon Hills, Pennywise | trennt den Held als Bühne vom Inhalt, ohne Linie | Rundung aus dem Token der Karten, nicht größer |
| ruhige Abstände | Abschnitte 95 px Desktop, 56 px mobil; Überschrift zum Text 32 px | gleiche Abstände lesen sich als Ordnung, ungleiche als Zufall | `--raum-sektion` und ein fester Abstand unter Überschriften |
| Seitenrand großzügig | 58 px bei 1440, 23 px bei 390 | Text klebt nicht am Rand, Karten haben Luft | `--rand-seite`, Abgleich offen (siehe Messung in `referenzen-und-auswahl.md`) |
| Karten mit Luft | 20 bis 28 px Abstand, 20 bis 40 px innen, Rundung 8 bis 20 | eng gesetzte Karten verschmelzen zu einem Block | Kartenabstand nie unter 16 px |

## Bausteine für den Held

### B1 Held mit Beleg über der Überschrift

Vorbild Electric Car Scheme. **Warum:** Der Beleg steht vor der Behauptung, also liest der Besucher
die Überschrift schon mit Vertrauen. **Aufbau:** Bewertungszeile (Wert, Anzahl, Quelle) klein über
der H1; H1 zentriert, zwei Zeilen; ein Absatz mit Nutzen und Spanne der Zielgruppe; Haupt-CTA und
Zweitoption gleich groß nebeneinander; darunter vier Häkchen mit je einer Zusage; darunter zwei
Bildkarten. **Passt für:** Dienstleister mit echten Bewertungen, mehrere Zielgruppengrößen.
**Nicht ohne:** echte, verlinkbare Bewertung (`google-bewertungen.md`).

### B2 Bildheld mit diagonaler Führung

Vorbild Teif Moreaux. **Warum:** Das Foto der eigenen Arbeit ist der stärkste Beleg und braucht die
ganze Fläche; Überschrift unten links und Knopf unten rechts lassen das Auge einmal quer über das Bild
laufen und am Knopf ankommen. **Aufbau:** Vollbildfoto, unteres Drittel abgedunkelt; H1 kurz (die
Leistung in drei bis fünf Wörtern) unten links; Knopf unten rechts auf gleicher Höhe; Kopf
transparent mit Kontakt-Knopf. **Passt für:** Projektgeschäft mit starken eigenen Fotos (Bau,
Architektur, Events, Handwerk mit Sichtergebnis). **Nicht ohne:** echtes Foto in hoher Qualität;
Haupt-CTA gefüllt, nicht als Glas- oder Konturknopf wie beim Vorbild.

### B3 Dunkler Held mit überlappender Kennzahlenkarte

Vorbild Silicon Hills. **Warum:** Der dunkle Held sammelt die Aufmerksamkeit auf eine Aussage; die
helle Karte mit drei Kennzahlen, die in den Held hineinragt, liefert den Beweis im selben Blick und
zieht in die nächste Sektion. **Aufbau:** gedimmtes Foto, gerundete Unterkante; ein Beleg als kurze
Zeile über der H1; H1 zentriert; Untertitel nennt die Nische ausgeschrieben; zwei Knöpfe (Gespräch,
Methode); weiße Karte mit Aussage in einem Satz und drei Kennzahlen mit Bezug („nach 12 Monaten").
**Passt für:** B2B-Dienstleister, Beratung, Vermittlung. **Nicht ohne:** belegte Kennzahlen mit
Endwert im HTML; die Zahl im Held und in der Karte muss gleich sein.

### B4 Produktheld mit drei Wegen

Vorbild FLO-CORP. **Warum:** Bei technischen Produkten gibt es drei Reifegrade: wer weiß, was er
will, kauft; wer vergleicht, fragt an; wer unsicher ist, ruft an. Für jeden ein Weg, und die
Hinweisleiste fängt die Unsicheren schon vor der Navigation. **Aufbau:** Hinweisleiste mit einem Satz
und Knopf zum Gespräch; Kopf mit Telefon (sekundär) und Angebot (gefüllt); H1 links, Produktbild
rechts; Untertitel mit dem einen Unterscheidungsmerkmal (Garantie, Zertifizierung); zwei Knöpfe;
Kundenlogos direkt darunter. **Passt für:** Hersteller, Händler mit Beratung, Mittelstand.

## Bausteine für Beleg und Ablauf

### B5 Ablauf im Bild

Vorbild Electric Car Scheme. **Warum:** Drei Schritte als kleine Oberflächenkarte über einem Foto
zeigen den Ablauf, ohne eine eigene Sektion zu kosten, und verbinden „wie es geht" mit „wie es sich
anfühlt". **Aufbau:** Bildkarte, darauf eine helle Karte mit drei Zeilen „01 Schritt, 02 Schritt,
03 Schritt", je mit kleinem Symbol. **Passt für:** jede Leistung mit einfachem Ablauf in drei
Schritten.

### B6 Schmerzpunkte als Karten

Vorbild Silicon Hills. **Warum:** Wer sein eigenes Problem in seiner eigenen Sprache liest, fühlt sich
verstanden und liest weiter; die Lösung danach wirkt als Antwort, nicht als Werbung. **Aufbau:**
Sektionstitel aus Sicht des Kunden; vier Karten auf dunkler Fläche, je Symbol, eine Überschrift als
Problem, ein Satz Folge; danach ein Überleitungssatz und ein Knopf zur Methode. **Passt für:**
Beratung, B2B, alle, bei denen der Kunde das Problem kennt, die Lösung noch nicht.

### B7 Stimmen mit Gesicht, Rolle und Firma

Vorbild Electric Car Scheme (Bildkarten mit Zitat, Name, Rolle, Firmenlogo), Dan's (Video mit
Ergebniszeile). **Warum:** Ein Zitat wird glaubwürdig durch die Person dahinter; Rolle und Firma
sagen dem Leser, ob die Person ihm ähnlich ist. **Aufbau:** Karte mit Foto als Hintergrund oder
Kopf, Zitat in zwei bis drei Zeilen, Name, Rolle, Firma; bei Video Untertitel im Bild und Poster.
**Nicht ohne:** echte, freigegebene Stimmen; nie dreifach im DOM für ein Laufband.

### B8 Aktueller Anlass als Beleg der Dringlichkeit

Vorbild Pennywise. **Warum:** Dringlichkeit, die mit Ort, Datum und Zahl belegt ist, überzeugt;
„jetzt handeln" ohne Anlass nicht. **Aufbau:** direkt nach dem Held eine Sektion mit zwei bis drei
Fotos, ein Absatz mit Ort, Datum und Zahl der Betroffenen, ein Knopf „Mehr erfahren" oder direkt zur
Handlung. **Passt für:** Vereine, Spendenaufrufe, Aktionen mit echtem Anlass, Notdienst.

### B9 Kennzahlen mit Bezug

Vorbilder Teif, Silicon Hills. **Warum:** Eine nackte Zahl sagt wenig; Gründungsjahr, Anteil
wiederkehrender Kunden oder Verbleib nach zwölf Monaten sagen etwas über Verlässlichkeit.
**Aufbau:** drei bis vier Zahlen in einer Reihe, darunter je ein Label in Kleinschrift. **Nicht
ohne:** Beleg je Zahl; Endwert im HTML, hochzählen nur als Darstellung (Gemeinsame Befunde in
`referenzen-und-auswahl.md`).

## Bausteine für Angebot und Preis

### B10 Preisbeispiele mit Anfrage je Karte

Vorbild Electric Car Scheme, ähnlich die Produktkarten von FLO-CORP. **Warum:** Ein konkreter
„ab"-Preis an einem konkreten Ding nimmt die größte Unsicherheit; der Knopf an der Karte macht aus
Interesse sofort eine Anfrage. **Aufbau:** drei Karten gleicher Höhe; oben Kategorie oder Marke, ein
bis zwei kleine Merkmale als Etikett; Bild; „ab"-Preis groß mit Einheit; Knopf am Kartenfuß.
**Passt für:** Produkte, Pakete, Leistungen mit Festpreis. Preisangaben nach `../../webdesign-conversion/references/53-zahlungen-mit-stripe.md`
und dem Preisrecht beim Kunden prüfen.

### B11 Rechenbeispiel

Vorbild Electric Car Scheme (Monatsrate, Steuer, Sozialabgaben, Nettobetrag als Karte). **Warum:**
Ein durchgerechnetes Beispiel macht ein abstraktes Versprechen („bis zu 50 % sparen") nachprüfbar.
**Aufbau:** Karte mit Produkt oder Fall, Zeilen mit Posten und Beträgen, letzte Zeile hervorgehoben,
darunter ein Satz zu den Annahmen. **Nicht ohne:** echte Zahlen des Kunden und die Annahmen sichtbar;
sonst ist es eine erfundene Zahl.

### B12 Leistungskarten mit Checkliste und eigenem Knopf

Vorbild Silicon Hills (Leistungen). **Warum:** Drei klar getrennte Leistungen lassen den Besucher sich
selbst einordnen; die Checkliste zeigt den Umfang, der Knopf an jeder Karte macht die Wahl gleich
zur Anfrage. **Aufbau:** drei Karten, je Symbol, Name, zwei Sätze für wen, drei bis vier Häkchen,
Knopf am Fuß. **Passt für:** Dienstleister mit zwei bis vier Angeboten.

### B13 Leistungen nummeriert mit Kontakt direkt danach

Vorbild Teif. **Warum:** Drei Leistungen mit je einem Satz sind in Sekunden erfasst; die Frage
„Klingt passend?" mit Knopf direkt darunter fängt den Moment, in dem der Besucher sich wiedererkennt.
**Aufbau:** drei Spalten mit Nummer, Name, einem Label und einem Satz; darunter Frage und Knopf.

### B14 Für wen und Voraussetzungen vor dem Preis

Vorbild Dan's Crypto. **Warum:** Wer vor dem Preis liest, dass er gemeint ist (oder nicht), kommt
vorqualifiziert an; das spart dem Kunden schlechte Anfragen und dem Besucher Zeit. **Aufbau:** drei
Profile mit Überschrift und zwei Sätzen; danach eine kurze Liste harter Voraussetzungen; danach der
Preis. **Passt für:** Angebote mit hoher Hürde, Beratung, Programme, Ausbildung, Stellen.

### B15 Zwei Stufen mit Entscheidungssatz

Vorbild Dan's Crypto. **Warum:** Zwei Stufen sind schneller entschieden als drei, und ein Satz über
den Karten („bis Summe X die erste, darüber die zweite") nimmt die Entscheidung ab. **Aufbau:**
Entscheidungssatz; zwei Karten, die höhere farbig und leicht größer; je Leistungsliste mit Häkchen;
ein Knopf darunter. Bei drei echten Optionen: `../../webdesign-conversion/references/34-ueberzeugungsausloeser.md`.

### B16 Feste Beträge statt freier Eingabe

Vorbild Pennywise (Spendenseite). **Warum:** Vorgeschlagene Beträge nehmen die Frage „wie viel ist
angemessen?", ein freies Feld bleibt als Ausweg; andere Wege daneben (Überweisung, Post) fangen
alle, die online nicht zahlen wollen. **Aufbau:** Auswahlknöpfe mit drei bis vier Beträgen und
„eigener Betrag", einmalig oder regelmäßig, Summe sichtbar, Knopf; links die anderen Wege mit
Anschrift. **Passt für:** Spenden, Mitgliedsbeiträge, Gutscheine.

## Bausteine für Entscheidung und Kontakt

### B17 FAQ nach Rolle des Lesers

Vorbild Electric Car Scheme („Häufige Fragen von HR und Finanzen"). **Warum:** Eine FAQ, die ihre
Leser benennt, wird von genau diesen gelesen; die Fragen sind die Einwände, die sonst im Gespräch
kommen. **Aufbau:** Titel mit Zielgruppe, acht bis zehn Fragen als Akkordeon, je Seite eigene
Fragen. Antworten nach `../../webdesign-conversion/references/35-autoritaet-im-text.md`.

### B18 Zwei Wege nebeneinander

Vorbilder Dan's (Gespräch oder Formular), Silicon Hills (Kontaktdaten links, Formular rechts).
**Warum:** Wer telefonieren will, sucht keine Nummer im Fußbereich; wer schreiben will, will kein
Telefonat. Beide Wege gleich sichtbar senken die Hürde. **Aufbau:** zwei Spalten; links Telefon und
E-Mail mit Symbol und ein Satz, wann man erreichbar ist; rechts die Formularkarte mit höchstens
sechs Feldern und Datenschutzhinweis über dem Knopf.

### B19 Kontaktblock am Ende jeder Seite

Vorbild FLO-CORP. **Warum:** Wer über die Suche auf einer Unterseite landet, sieht die Startseite
nie; der Abschluss muss dort genauso stehen. **Aufbau:** farbige Ankerfläche, links Überschrift,
ein Satz, Adresse und Telefon; rechts weiße Formularkarte. **Bei uns:** fünf bis sieben Felder statt
neun, Anfrageart als Auswahl, kein zweites Newsletterfeld auf derselben Seite.

### B20 Abschluss als Frage

Vorbild Silicon Hills („Bereit, ein Team aufzubauen, das wächst?"). **Warum:** Die Frage spricht den
Besucher an der Stelle an, an der er entscheidet, und verlangt nur eine Antwort: den Knopf.
**Aufbau:** Überschrift als Frage links, ein Knopf rechts, Linie darunter, dann die Fußzeile.

## Bausteine für Unterseiten und Fußzeile

### B21 Feste Eröffnung für alle Unterseiten

Vorbilder Electric Car Scheme, Silicon Hills. **Warum:** Wer auf einer Unterseite landet, erkennt in
einer Sekunde, dass er auf derselben Seite ist; das Gerüst muss nicht neu gelernt werden. **Aufbau:**
ein Unterseiten-Held in kleiner Höhe (rund halbe Bildschirmhöhe) mit Label, H1, einer Zeile und dem
Haupt-CTA; am Ende jeder Unterseite FAQ der Seite und derselbe Abschluss (B20). Lange Unterseiten
bekommen eine Reiternavigation zu ihren Abschnitten (Electric Car Scheme).

### B22 Fußzeile als Vertrauensbeleg

Vorbilder Electric Car Scheme (Register, Aufsicht, Zertifikate), Pennywise (Transparenzsiegel),
FLO-CORP (Werkzeuge und beide CTAs). **Warum:** Wer bis ganz unten scrollt, prüft oft gezielt die
Seriosität; vollständige Angaben dort bestätigen, was die Seite verspricht. **Aufbau:** Spalten für
Leistungen, Unternehmen, Kontakt; Siegel und Mitgliedschaften als Logoreihe; Pflichtangaben;
Copyright-Jahr dynamisch (`pruefe-aktualitaet.mjs`).

## Welche Bausteine zu welchem Kunden passen

| Kundentyp | Held | Beleg und Ablauf | Angebot | Abschluss |
|---|---|---|---|---|
| Handwerk und lokaler Dienstleister | B1 oder B2 | B5, B7, B9 | B12 oder B10 | B18, B19, B20 |
| Hersteller, technischer Mittelstand | B4 | B9, B7 | B10, B11 | B19, B17 |
| Beratung, Vermittlung, B2B | B3 | B6, B9, B7 | B12 oder B13 | B18, B20 |
| Angebot mit hoher Hürde (Programm, Coaching, Ausbildung) | B3 oder B1 | B6, B7 | B14, B15 | B18, B17, B20 |
| Verein, Stiftung, Initiative | B2 | B8, B9 | B16 | B22 |
| Kreativ- und Projektgeschäft | B2 | B9, B7 | B13 | B18, B20 |
| Zwei Zielgruppen (Arbeitgeber und Mitarbeitende, Käufer und Händler) | B1 mit zwei Farben | B5, B7 | B10, B11 | B17 je Zielgruppe |

Für Unterseiten gilt immer B21 und B22.

## Verwandte Kapitel

- Freigaben, Messwerte, Ausschlüsse je Referenz: `referenzen-und-auswahl.md`
- Conversion-Architektur und CTA: `../../webdesign-conversion/references/06-conversion-architektur.md`
- Länge und Sektionsfolge nach Hürde: `../../webdesign-conversion/references/45-huerde-laenge-und-leserfuehrung.md`
- Hierarchie, Raster, Komposition: `../../webdesign-conversion/references/43-hierarchie-raster-komposition.md`
- Sektionshintergründe: `../../webdesign-conversion/references/21-sektionshintergruende-hierarchie.md`
- Musterbibliothek, falls ein Baustein über Tor 2 zum Muster wird: `../../webdesign-conversion/references/25-designmuster-bibliothek.md`
