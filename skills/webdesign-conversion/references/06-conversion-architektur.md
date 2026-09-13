# Bereich 6: Conversion-Architektur

Conversion-Architektur ist das System, das Besucher zu Handlungen bewegt. Klare
Positionierung, stimmiges Design, schnelle Seite, Barrierefreiheit und SEO-Grundlagen sind
da, aber ohne Conversion-Architektur wird aus keinem Besucher eine Anfrage.

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
- **Reibung zählen, nicht Klicks feiern.** Jeder Pflichteintrag, jede Weiterleitung, jede
  Registrierung vor dem Wert ist ein Ausstieg.
