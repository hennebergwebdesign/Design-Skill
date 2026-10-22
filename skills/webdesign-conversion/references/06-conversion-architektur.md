# Bereich 6: Conversion-Architektur

Conversion-Architektur ist das System, das Besucher zu Handlungen bewegt. Klare
Positionierung, stimmiges Design, schnelle Seite, Barrierefreiheit und SEO-Grundlagen sind
da, aber ohne Conversion-Architektur wird aus keinem Besucher eine Anfrage.

## Inhalt

- Schritt 6.1: Die CTA-Hierarchie
- Schritt 6.2: Das 10-Sekunden-Formular
- Schritt 6.3: Trust-Elemente strategisch platzieren
- Schritt 6.4: Der Aufbau der „Über uns"-Seite
- Schritt 6.5: Eine Seite nach Wirkung prüfen
- Schritt 6.6: Pop-ups und Overlays
- Schritt 6.7: Preisseiten und Preisblöcke
- Weitere Conversion-Hebel
- Bewusst nicht übernommen
- Verwandte Kapitel

## Schritt 6.1: Die CTA-Hierarchie

Nicht alle Calls-to-Action sind gleich wichtig. Drei Ebenen:

**1. Primär-CTA** (der wichtigste)
- Beispiel: „Kostenloses Erstgespräch buchen"
- sollte auf jeder Seite **mindestens 2×** vorkommen
- Kontrastfarbe (z. B. Orange auf blauer Website)

**2. Sekundär-CTA**
- Beispiel: „Mehr erfahren"
- für Leute, die noch nicht bereit sind
- dezentere Farbe, z. B. nur Outline-Button

**3. Exit-Intent-CTA**
- Popup, wenn jemand die Seite verlassen will
- Beispiel: „Warte! Hol dir unseren kostenlosen Website-Check"

**Die Regel:** Der Primär-CTA kommt **5× häufiger** vor als der Sekundär-CTA.

### Umsetzungsregeln

- **Ein** Primär-CTA-Text auf der ganzen Seite, nicht drei Varianten. „Erstgespräch buchen"
  im Header, „Jetzt anfragen" im Hero und „Kontakt aufnehmen" im Footer sind für den
  Besucher drei verschiedene Angebote.
- Der CTA sagt, was passiert: „Termin buchen", nicht „Absenden". Die Aktion behält ihren
  Namen durch den gesamten Ablauf: der Button „Veröffentlichen" erzeugt die Meldung
  „Veröffentlicht".
- Auf Mobilgeräten gehört der Primär-CTA in einen festen Balken am unteren Rand, sichtbar
  ab dem Ende des Heldenbereichs.
- Exit-Intent nur auf dem Desktop (es gibt keinen Mauszeiger auf dem Handy), nur einmal je
  Sitzung, mit sichtbarem Schließen, tastaturbedienbar und mit Fokusfalle.

## Schritt 6.2: Das 10-Sekunden-Formular

Lange Kontaktformulare töten Conversions. Menschen sind faul und geben ungern private Daten
heraus.

**Maximal 3–5 Felder.** Frage nur ab, was nötig ist, um Kontakt aufzunehmen. Alles Weitere
klärt das 1:1-Gespräch.

| Was du brauchst | Was du **nicht** brauchst |
|---|---|
| Vorname | Anrede |
| E-Mail | Nachname |
| Telefon | Straße, PLZ |
| *optional:* Firmenname | „Wie haben Sie von uns gehört?" |
| *optional:* Nachricht | Datenschutz-Checkbox (außer wenn gesetzlich erforderlich) |

**Pro-Tipp:** Unter jedem Feld begründen, wozu die Angabe dient. Wer weiß, warum er seine
Daten eingibt, hat eine deutlich geringere Hemmschwelle.

- E-Mail: „Damit wir dir die Bestätigung schicken können"
- Telefon: „Für Rückfragen"

**Ziel:** dem Lead jede Ausrede nehmen, sich nicht einzutragen.

**Wichtig:** Das gilt für das allgemeine Kontaktformular. Für gezielte Projektanfragen ist
eine Vorqualifizierung mit den richtigen Fragen sinnvoll, aber auch dort gilt: je weniger
Aufwand für den Lead, desto besser. Mehrstufige Formulare (ein Schritt je Bildschirm, mit
Fortschrittsanzeige) konvertieren bei vielen Feldern besser als ein langes Formular.

### Technische Pflicht am Formular

- **Spamschutz ohne Captcha-Hürde:** Honigtopf-Feld (unsichtbar, für Menschen leer),
  Zeitfeld (Absenden unter ~2 s wird verworfen), Origin-Prüfung, Rate-Limit
  (z. B. 5 Anfragen je IP in 10 Minuten), optional Cloudflare Turnstile.
- **Serverseitige Validierung** mit feldbezogenen Fehlern, nicht nur clientseitig.
- **Vier sichtbare Zustände:** Ruhe, Senden, Erfolg, Fehler. Im Erfolgsfall ersetzt die
  Bestätigung das Formular. Im Fehlerfall steht ein alternativer Kontaktweg daneben
  (Telefon, E-Mail): ein Fehler ohne Ausweg ist ein verlorener Lead.
- **Doppelte Mail:** interne Benachrichtigung und Bestätigung an die absendende Person.
- **Datensparsamkeit:** Was nicht gespeichert werden muss, wird nicht gespeichert. Wird
  doch gespeichert, steht das mit Zweck, Rechtsgrundlage und Löschfrist in der
  Datenschutzerklärung.
- **Escaping:** Eingaben, die irgendwo wieder ausgegeben werden (Bestätigungsseite,
  interne Übersicht, Mail-HTML), müssen escaped werden. Ein `<script>` im Namensfeld ist
  der Standardweg zu gespeichertem XSS.

Feld für Feld (E-Mail, Telefon, Auswahl, `autocomplete`), mehrstufige Anfragestrecken,
Fehlerablauf, Rückruf, Angebotsanfrage, Download mit getrenntem Newsletter und Kontoanlage:
`58-formulare-und-anfragestrecken.md`.

## Schritt 6.3: Trust-Elemente strategisch platzieren

Wer behauptet, die perfekte Lösung zu bieten, ohne einen einzigen Beweis zu liefern, erntet
Skepsis, und 40–60 % weniger Conversions.

**Die sechs wichtigsten Trust-Elemente:**

1. **Kundenstimmen** mit Name, Funktion, Unternehmen und möglichst Foto
2. **Referenzen/Case Studies** mit Ausgangslage, Vorgehen und Ergebnis
3. **Zahlen** (Projekte, Jahre, Kunden, messbare Ergebnisse)
4. **Logos** von Kunden, Partnern, Presse
5. **Bewertungen** von Google, Trustpilot, ProvenExpert, mit Schnitt, Anzahl und Datum
6. **Zertifikate, Auszeichnungen, Mitgliedschaften**

**Wo platzieren:** Die Startseite trägt so viele Trust-Elemente wie möglich. Auf Unterseiten
und der Kontaktseite dürfen sie sich wiederholen: sie **sollen** öfter als einmal
vorkommen, weil nicht jeder Besucher die komplette Seite ansieht.

### Regeln für Trust-Elemente

- **Keine erfundenen Belege.** Kein Fantasiename unter einem Zitat, keine ausgedachte
  Bewertungszahl, kein Logo ohne Nutzungsrecht. Das ist nicht nur unredlich, sondern nach
  § 5 UWG abmahnfähig, und bei Bewertungen inzwischen ausdrücklich geregelt.
- **Stand dazuschreiben.** Bewertungszahlen wachsen. „4,4 von 5 bei 780 Bewertungen, Stand
  10.09.2026" ist überprüfbar, eine nackte Zahl nicht.
- **Eine belegte Quelle groß ist mehr wert als vier Kacheln, von denen drei leer sind.**
  Fehlt für eine Plattform ein echter Wert, fliegt die Kachel raus statt einen Platzhalter
  zu zeigen.
- **Die Bewertung gilt dem, wofür sie erhoben wurde.** Eine Unternehmensbewertung ist keine
  Produktbewertung, siehe `05-seo-sichtbarkeit.md`.
- **Logos brauchen Nutzungsrechte.** Presselogos und Zertifizierungssiegel sind oft
  vertraglich gebunden. Vor dem Livegang klären.
- **Logogrößen über die Fläche normalisieren, nicht über die Höhe.** Auf gleiche Höhe
  gesetzt verschwindet ein Hochformat-Logo als schmaler Streifen neben einer breiten
  Wortmarke. Faktor aus dem Seitenverhältnis rechnen und deckeln.

## Schritt 6.4: Der Aufbau der „Über uns"-Seite

Die „Über uns"-Seite ist nicht dafür da, die Firmengeschichte zu erzählen. Sie ist dafür da,
noch mehr Vertrauen aufzubauen.

**Die Formel, sechs Schritte:**

1. **Problem adressieren** (2–3 Sätze): „Wir kennen das Problem: Du hast eine Website, aber
   sie bringt keine Anfragen …"
2. **Lösung anbieten** (4–5 Sätze): „Deshalb haben wir … gegründet. Nach 350+ Projekten
   haben wir ein System entwickelt, das …"
3. **Proof zeigen** (3–4 Bulletpoints): warum ihr der richtige Ansprechpartner seid
4. **Team präsentieren** (Fotos + kurze Beschreibung): Menschen kaufen von Menschen
5. **Unternehmenserfolge/-geschichte:** deutlich machen, dass ihr etabliert seid
6. **CTA:** „Jetzt kostenloses Strategiegespräch buchen"

Features beschreiben, was etwas ist. Benefits beschreiben, was der Kunde davon hat: „Du
bekommst einen festen Ansprechpartner" statt „Wir arbeiten mit festen Zuständigkeiten".

## Schritt 6.5: Eine Seite nach Wirkung prüfen

Für die ganze Website gibt es `../assets/checklisten/conversion-audit.md`. Dieser Schritt ist
die Prüfung **einer** Seite, die nicht konvertiert, in der Reihenfolge, in der Befunde
Anfragen kosten.

**Vorher drei Angaben, sonst ist jeder Befund geraten:**

| Angabe | Beispiel | Warum |
|---|---|---|
| Seitentyp | Startseite, Landingpage, Leistungsseite, Preisseite, Blogartikel | jeder Typ hat eine andere Aufgabe, siehe Tabelle unten |
| Primäre Conversion | Rückruf anfragen | ohne festgelegtes Ziel wird jede Sektion nach einem anderen Maß bewertet |
| Herkunft der Besucher | Google-Anzeige zu „Flachdach undicht" | eine Seite für Anzeigenklicks muss die Anzeige fortsetzen, eine für Suchtreffer die Suchanfrage beantworten |

**Die Prüfreihenfolge:**

| # | Prüfen | Frage | Typischer Befund |
|---|---|---|---|
| 1 | Wertversprechen | Versteht ein Fremder in fünf Sekunden, was das ist und warum es ihn betrifft? | Leistung statt Ergebnis, Firmensprache statt Kundensprache |
| 2 | Headline | Trägt sie die Kernbotschaft und passt sie zur Herkunft? | allgemein, wo die Anzeige konkret war; klug statt klar |
| 3 | Primär-CTA | Eine Handlung, ohne Scrollen sichtbar, Text nennt das Ergebnis? | drei gleich laute Knöpfe, „Absenden", „Mehr erfahren" als Hauptweg |
| 4 | Hierarchie | Liest jemand, der nur überfliegt, die Hauptaussage? | alles gleich groß, Bild ohne Bezug zur Aussage |
| 5 | Belege | Steht ein Beleg dort, wo eine Behauptung steht, und am CTA? | Belege gesammelt am Ende, Behauptungen ohne Quelle |
| 6 | Einwände | Werden Preis, Eignung, Aufwand und Risiko beantwortet? | FAQ als Restrampe, siehe `12-copywriting.md` |
| 7 | Reibung | Was hält auf dem Weg zur Anfrage auf? | Felder, Ladezeit, Navigation auf der Landingpage, Pop-up vor dem Inhalt |

**Warum diese Reihenfolge:** Ein Fehler weiter oben macht alle darunter wertlos. Ein perfektes
Formular hilft nicht, wenn der Besucher nach fünf Sekunden nicht weiß, ob er richtig ist.
Dieselbe Logik hat die Optimierungsreihenfolge im monatlichen Review in
`13-messung-optimierung.md`.

### Was je Seitentyp zusätzlich zählt

| Seitentyp | Prüfen | Ausführlich in |
|---|---|---|
| Startseite | Weg zur häufigsten Anfrage in einem Klick; wer schon entschieden hat und wer noch vergleicht, finden beide ihren Einstieg | `../playbooks/homepage.md` |
| Landingpage | Message-Match zur Anzeige, keine Navigation, ein Ziel, das ganze Argument auf einer Seite | `../playbooks/landingpage.md` |
| Leistungsseite | jede Eigenschaft mit dem, was der Kunde davon hat; ein Anwendungsfall aus seiner Branche; CTA am Ende jeder Leistung | `12-copywriting.md` |
| Preisseite | Wahl zwischen den Paketen in Sekunden möglich, Preise als Text | Schritt 6.7 |
| Blogartikel | CTA zum Thema des Artikels an einer natürlichen Pause, nicht der allgemeine Kontakt-CTA | `05-seo-sichtbarkeit.md` |
| Über uns | Vertrauen statt Chronik | Schritt 6.4 |

### Das Ergebnis

Jeder Befund in derselben Form, damit er umgesetzt und nicht diskutiert wird:

```
Befund     Der Primär-CTA steht dreimal mit drei Texten.
Wirkung    hoch (Begründung: der Besucher sieht drei Angebote)
Änderung   Ein Text, „Rückruf anfragen", in Kopf, Held und Fuß.
Aufwand    niedrig
```

**Die Wirkung wird als hoch, mittel oder niedrig mit Begründung angegeben, nie als
Prozentzahl.** Eine geschätzte Steigerung um 20 % ist ein erfundener Beleg, und der Kunde
hält sie später gegen die Zahlen.

Gegliedert wird in vier Gruppen:

1. **Sofort:** unter einer Stunde, hohe Wirkung
2. **Umbau:** Sektion oder Seite neu
3. **Testideen:** Annahmen, die gemessen statt entschieden werden sollten, nur bei genug
   Volumen (`13-messung-optimierung.md`), sonst nacheinander ändern und vergleichen
4. **Textalternativen:** für Headline und Primär-CTA je zwei bis drei Fassungen, jede mit
   einem Satz, was sie anders macht

## Schritt 6.6: Pop-ups und Overlays

Ein Pop-up unterbricht. Es ist nur dann gerechtfertigt, wenn das Angebot darin mehr wert ist
als die Unterbrechung. Deshalb zuerst der Auslöser, dann der Inhalt.

### Auslöser

| Auslöser | Einsatz | Bewertung |
|---|---|---|
| Klick (Knopf „Checkliste anfordern" öffnet das Formular im Dialog) | Download, Rückruf, Terminwunsch | erste Wahl: die Person hat danach gefragt |
| Scrolltiefe | Ratgeberartikel, langer Inhalt | zweite Wahl: zeigt Interesse, unterbricht aber beim Lesen |
| Exit-Intent | nur Desktop, siehe Schritt 6.1 | einmal je Sitzung, mit anderem Angebot als die Seite selbst |
| Zeit nach dem Laden | allgemeine Seiten | nie vor der ersten Interaktion mit dem Inhalt; ein Pop-up beim Laden verdeckt genau das, wofür jemand gekommen ist |
| Seitenzahl, wiederholter Besuch | Vergleichsphase | braucht Wiedererkennung über Seiten oder Besuche, also Einwilligung, siehe Rechtsrahmen |

### Formen

| Form | Wann | Regel |
|---|---|---|
| Dialog in der Mitte | Klickauslöser, Download | Fokusfalle, ESC schließt, Fokus zurück an den Auslöser (`04-barrierefreiheit-bfsg.md`) |
| Einschub von unten oder aus der Ecke | Hinweis, der nicht blockieren darf | verdeckt keinen Inhalt, auf dem Handy höchstens das untere Drittel |
| Hinweisleiste oben | echte Neuigkeit (Betriebsferien, neue Telefonnummer) | schließbar, mit Enddatum, nicht dauerhaft |
| Vollbild | nicht | auf dem Handy aggressiv, und Google Search Central nennt aufdringliche Interstitials auf Mobilgeräten als Problem für die Nutzererfahrung |

### Bau und Text

- **Aufbau:** Headline mit dem Nutzen, ein Satz, was genau kommt und wie oft, ein Feld, ein
  Knopf, sichtbares Schließen. Mehr nicht.
- **Schließen ist leicht:** Kreuz oben rechts, mindestens 24 × 24 px (WCAG 2.5.8), dazu ESC,
  Klick daneben und ein Textlink „Nein, danke". Wer das Schließen nicht findet, schließt den
  Tab.
- **Ablehnen ohne Beschämung.** Nicht „Nein, ich will kein Geld sparen". Das ist
  Manipulation, und sie fällt auf die Marke zurück.
- **Nicht über dem Consent-Banner.** Solange die Einwilligungsabfrage offen ist, erscheint
  kein Pop-up. Zwei Overlays übereinander verwirren und drängen in die schnellste
  Entscheidung.
- **Nicht auf Kontakt-, Formular- und Danke-Seiten.** Wer dort ist, hat schon gehandelt oder
  ist dabei.
- **Eigenbau statt Pop-up-Dienst.** Ein Dialog ist ein `<dialog>`-Element mit wenigen Zeilen
  Skript. Ein Pop-up-Dienst ist ein Drittanbieterskript und braucht eine Einwilligung.

### Rechtsrahmen

| Thema | Regel | Grundlage |
|---|---|---|
| Schließen merken | Speicherung im Browser ist ein Zugriff nach § 25 TDDDG. Ohne Einwilligung höchstens: einmal je Sitzung, gemerkt im Arbeitsspeicher der Seite oder in `sessionStorage`. Frequenzsteuerung über Tage, Besuchszähler und „schon konvertiert"-Kennungen brauchen Einwilligung | `07-recht-dsgvo.md` |
| Newsletter im Pop-up | Kontrollkästchen unvorbelegt oder eindeutiger Knopftext, Zweck und Häufigkeit genannt, Double-Opt-in, Abmeldung in jeder Mail, Protokoll | § 7 Abs. 2 Nr. 2 UWG, Art. 7 DSGVO |
| Rabatt für die Anmeldung | erlaubt, wenn klar ist, dass die Anmeldung die Gegenleistung ist; Abmeldung bleibt jederzeit möglich. Einordnung beim Kopplungsverbot in die Rechtsprüfung | Art. 7 Abs. 4 DSGVO |
| Frist und Countdown | nur mit echtem Enddatum, das beim Neuladen nicht zurückspringt | § 5 UWG, `12-copywriting.md` |
| „Nur noch heute", „nur für die ersten 50" | nur, wenn es stimmt | § 5 UWG, harte Grenze |
| Barrierefreiheit | Tastatur, Fokusfalle, Kontrast, Name für das Schließkreuz | BFSG, `04-barrierefreiheit-bfsg.md` |

## Schritt 6.7: Preisseiten und Preisblöcke

Ob Preise gezeigt werden, steht unter „Weitere Conversion-Hebel" und in
`12-copywriting.md` (Das Angebot formulieren). Hier geht es darum, **wie**.

| Regel | Grund |
|---|---|
| Preise stehen als Text im HTML, nicht im Bild, nicht erst nach Skript oder Klick | Bildschirmleser, Suchmaschinen und KI-Antwortdienste lesen sonst keinen Preis, und die Seite verliert den Vergleich gegen eine, deren Preis lesbar ist |
| Höchstens drei Pakete, je Paket ein Satz „für wen" | wer zwischen fünf Paketen wählen soll, vertagt die Entscheidung |
| Unterschiede in Worten: „bis 3 Standorte", nicht nur ✓ und ✗ | eine Häkchenspalte sagt nicht, wo die Grenze liegt; als `<table>` mit Kopfzellen und vorlesbarem Text („enthalten", „nicht enthalten") |
| Ein Paket als „Empfohlen" markieren nur mit sachlichem Grund, „am häufigsten gewählt" nur mit Beleg | eine Empfehlung ist eine Werbeaussage (§ 5 UWG) |
| Gegenüber Verbrauchern Gesamtpreise inklusive Umsatzsteuer, gegenüber Unternehmen netto mit „zzgl. USt." | Preisangabenverordnung, siehe `07-recht-dsgvo.md` |
| Streichpreis bei einer Preisermäßigung gegenüber Verbrauchern: der niedrigste Preis der letzten 30 Tage | § 11 PAngV; ein Streichpreis, der nie galt, ist zusätzlich irreführend (`12-copywriting.md`) |
| Monats- und Jahrespreis: Ersparnis in Euro nennen, die Voreinstellung sichtbar | „17 % sparen" muss man nachrechnen, „38 € im Jahr gespart" nicht |
| Fragen zum Preis direkt unter den Paketen: Laufzeit, Kündigung, was nicht enthalten ist | Einwand „zu teuer" gehört neben den Preis (`12-copywriting.md`) |
| `Offer`-JSON-LD nur mit dem Preis, der sichtbar auf der Seite steht | `05-seo-sichtbarkeit.md`, Strukturierte Daten |

**Die Probe:** Seite ohne JavaScript oder als reinen Text öffnen (Leseansicht, `curl`). Stehen
dort alle Pakete mit Preis und Grenzen? Wenn nicht, sieht ein Teil der Leser und Maschinen
keinen Preis.

## Weitere Conversion-Hebel

- **FAQ als Conversion-Element**, nicht als Restrampe: zehn Fragen, die wirklich vor dem
  Kauf gestellt werden, jede mit einer echten Antwort. Zusätzlich als FAQPage-JSON-LD.
- **Preise zeigen, wenn möglich.** „Preis auf Anfrage" filtert nicht nur schlechte Leads
  aus, sondern auch gute. Wenn kein Festpreis möglich ist: Spanne, Startpreis oder
  Beispielrechnung.
- **Prozess sichtbar machen.** Drei bis sechs Schritte von der Anfrage bis zum Ergebnis
  nehmen dem Erstkontakt die Unsicherheit.
- **Zwei Optionen gegenüberstellen** (mit uns / ohne uns) macht den Wert konkret, ohne den
  Wettbewerb zu nennen.
- **Ein kleiner Schritt vor dem großen.** Ein Rechner, eine Auswahl („Worum geht es?") oder ein
  Selbsttest kann den Einstieg erleichtern, weil ein kleines Ja das nächste leichter macht. Nur wenn
  er dem Besucher etwas zurückgibt (eine Spanne, eine Einordnung), nie als vorgeschaltete Hürde vor
  dem Formular.
- **Ein Angebot für die, die noch nicht so weit sind.** Ein Leitfaden oder eine Checkliste als
  Sekundäraktion fängt Besucher auf, die heute nicht anfragen. Er konkurriert nicht mit dem
  Primär-CTA und braucht bei E-Mail-Versand ein Double Opt-in.
- **Reibung zählen, nicht Klicks feiern.** Jeder Pflichteintrag, jede Weiterleitung, jede
  Registrierung vor dem Wert ist ein Ausstieg.

## Bewusst nicht übernommen

Die Schritte 6.5 bis 6.7 und `58-formulare-und-anfragestrecken.md` sind aus `cro`, `popups`,
`signup` und `pricing` von coreyhaines31/marketingskills (MIT) destilliert. Diese Punkte gelten
hier anders:

| Die Quelle sagt | Hier gilt | Grund |
|---|---|---|
| Pop-up nach 30 bis 60 Sekunden ist „bewährt", Richtwerte für Pop-up-Abschlüsse (E-Mail 2 bis 5 %, Exit 3 bis 10 %, Klick über 10 %) | keine Richtwerte, eigene Zahlen messen | ohne nachprüfbare Quelle angegeben; als Maßstab übernommen würden sie zu erfundenen Belegen im Kundenbericht |
| Schließen per Cookie oder `localStorage` merken, 7 bis 30 Tage Pause, Konvertierte ausschließen | ohne Einwilligung nur je Sitzung | § 25 TDDDG, siehe Rechtsrahmen in Schritt 6.6 |
| Rabatt-Pop-up mit Frist „schafft Dringlichkeit", Countdown als Testidee, steigende Rabatte über mehrere Besuche | Frist nur, wenn sie echt ist; kein Rabatt, der mit jedem Besuch wächst | § 5 UWG; ein wachsender Rabatt erzieht zum Warten und braucht Wiedererkennung |
| „Join 10,000+ teams" als Headlineformel für Seite und Pop-up | Zahl nur mit Beleg und Stand, sonst `[[FEHLT: …]]` | harte Grenze „Keine erfundenen Zahlen" |
| Köderpaket in der Mitte, damit das gewünschte Paket günstig wirkt | jedes Paket ist echt buchbar und für jemanden das richtige | Verkaufspsychologie nur, wenn sie wahr ist (`12-copywriting.md`, Die Grenze zur Irreführung) |
| Jahresrabatt 17 bis 20 % als Standard | Rabatt aus der eigenen Kalkulation | ohne Quelle, und eine Branchenzahl aus Softwareabos sagt nichts über Handwerk und Dienstleistung |
| Geschätzte Wirkung je Befund | hoch, mittel, niedrig mit Begründung | siehe Schritt 6.5 |
| „Paste-Test": Preisseite einem KI-Dienst geben und fragen, was sie kostet | Probe ohne JavaScript oder als Text, siehe Schritt 6.7 | dasselbe Ziel ohne Abhängigkeit von einem Dienst, dessen Abruf sich ändert, und ohne Kundenseite bei einem Dritten |
| Onboarding nach der Anmeldung (Checklisten, Produkttouren, Aktivierung) | nicht übernommen | betrifft Software nach dem Login, nicht die Kundenwebsite |

Die Originale lassen sich auf ausdrücklichen Wunsch zusätzlich installieren, je Skill mit
`npx --yes skills add coreyhaines31/marketingskills --skill <name> --agent claude-code`
(`cro`, `popups`, `signup`, `pricing`).

## Verwandte Kapitel

- `58-formulare-und-anfragestrecken.md`: Felder, mehrstufige Strecken, Fehlerablauf, Formulartypen
- `12-copywriting.md`: CTA-Texte, Angebot, Einwände, Grenze zur Irreführung
- `13-messung-optimierung.md`: was gemessen wird, A/B-Tests
- `07-recht-dsgvo.md`: § 25 TDDDG, Newsletter, Preisangaben
- `04-barrierefreiheit-bfsg.md`: Overlays, Fokusfalle, Formularauszeichnung
- `05-seo-sichtbarkeit.md`: FAQPage und Offer als JSON-LD
- `../playbooks/landingpage.md` und `../playbooks/homepage.md`: Seitentypen im Ablauf
- `../assets/checklisten/conversion-audit.md`: Prüfung der ganzen Website
