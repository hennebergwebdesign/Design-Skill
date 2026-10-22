# Formulare und Anfragestrecken

Die Grundregeln stehen in `06-conversion-architektur.md` Schritt 6.2: höchstens drei bis
fünf Felder, je Feld ein Satz wozu, vier sichtbare Zustände, Spamschutz ohne Captcha-Hürde.
Die technische Umsetzung im Agenturstack steht in
`../../agentur-website-builder/references/formulare-und-resend.md`. Dieses Kapitel ist die
Feinarbeit dazwischen: welches Feld wie gebaut wird, wann ein Formular mehrstufig wird, wie
Fehler behandelt werden und was für Rückruf, Angebot, Download, Warteliste und Konto gilt.

Destilliert aus `cro` (Formularteil) und `signup` von coreyhaines31/marketingskills (MIT),
übertragen auf deutsches Recht und DACH-Zielgruppen. Was bewusst anders gilt, steht in
Abschnitt 9.

## Inhalt

- 1\. Erst fragen, dann Felder bauen
- 2\. Feld für Feld
- 3\. Aufbau und Reihenfolge
- 4\. Mehrstufig
- 5\. Fehler behandeln
- 6\. Vertrauen direkt am Formular
- 7\. Formulartypen
- 8\. Was am Formular gemessen wird
- 9\. Bewusst nicht übernommen
- Verwandte Kapitel

## 1. Erst fragen, dann Felder bauen

Vor dem ersten Feld drei Fragen an den Kunden. Ohne Antwort wird kein Pflichtfeld gesetzt.

| Frage | Warum |
|---|---|
| Was passiert mit der Anfrage, Schritt für Schritt? | Ein Feld, das im Ablauf niemand liest, kostet Anfragen und bringt nichts |
| Welche Angaben werden im ersten Rückruf wirklich gebraucht? | Alles andere klärt das Gespräch, siehe 6.2 |
| Gibt es rechtliche Pflichtangaben (Bewerbung, Vertrag, Gesundheitsdaten)? | Dann bestimmt das Recht das Feld, nicht die Conversion |

**Jedes Feld muss eine dieser Prüfungen bestehen:** Ohne die Angabe können wir nicht
antworten. Oder: die Angabe lässt sich nicht später im Gespräch klären. Besteht es keine,
fliegt es raus. Der Grund ist Datensparsamkeit nach Art. 5 Abs. 1 lit. c DSGVO genauso wie
Conversion: was nicht erhoben wird, muss nicht geschützt, nicht beschrieben und nicht
gelöscht werden.

## 2. Feld für Feld

| Feld | So | Nicht so | Grund |
|---|---|---|---|
| E-Mail | ein Feld, `type="email"`, `autocomplete="email"`, Prüfung beim Verlassen des Feldes | zweites Feld „E-Mail wiederholen" | die Wiederholung verdoppelt die Arbeit und fängt Tippfehler schlechter als ein Hinweis |
| Tippfehler in der Domain | Hinweis „Meinten Sie gmx.de?" bei Verdrehern der verbreiteten Anbieter wie `gmx.dee`, `wbe.de`, `t-onlien.de`; der Vorschlag ist ein Angebot, keine Korrektur | still korrigieren | die Person entscheidet, ob ihre Adresse stimmt |
| Name | ein Feld „Name", `autocomplete="name"`, oder nur „Vorname", wenn die Bestätigungsmail persönlich anspricht | Anrede, Titel, getrennte Pflichtfelder ohne Verwendung | jede Aufteilung ist eine Entscheidung mehr; die Anrede erzwingt ein Geschlecht |
| Telefon | optional, mit Grund darunter („Für Rückfragen zum Termin"), `type="tel"`, `autocomplete="tel"`, freie Schreibweise erlauben | Pflichtfeld ohne Grund, Eingabemaske, die „0511 / 12 34 56" ablehnt | Telefonnummern sind in DACH die sensibelste Angabe im Kontaktformular, und jede Schreibweise ist richtig |
| Firma | optional, nur bei B2B, `autocomplete="organization"` | Anreicherung über Drittanbieter im Hintergrund | eine Anreicherung ist eine eigene Verarbeitung mit eigener Rechtsgrundlage und Auftragsverarbeitung |
| Nachricht | optional, wächst beim Tippen mit, ein Satz als Beispiel im Platzhalter | Pflichtfeld mit Mindestlänge | wer anruft oder schreibt, will oft nur den Rückruf |
| Auswahl bis vier Optionen | Optionsfelder (`radio`), alle sichtbar | Ausklappliste | eine Ausklappliste versteckt die Antworten und braucht zwei Klicks |
| Auswahl ab fünf Optionen | Ausklappliste mit „Bitte wählen" als leerer erster Eintrag, „Sonstiges" mit Textfeld | vorausgewählter erster Eintrag | eine Vorauswahl erzeugt falsche Daten, weil niemand sie ändert |
| Mehrfachauswahl | Kontrollkästchen mit parallel gebauten Labels, Hinweis „Mehrfachauswahl möglich" | Mehrfachauswahlliste mit Strg-Klick | auf dem Handy und für Tastaturnutzer kaum bedienbar |

**`autocomplete` ist keine Kür.** Die Autofüllung des Browsers ist die größte Abkürzung, die
ein Formular haben kann, und WCAG 1.3.5 (Eingabezweck bestimmen, Stufe AA) verlangt den
passenden Wert für Angaben zur eigenen Person. Siehe `04-barrierefreiheit-bfsg.md`.

## 3. Aufbau und Reihenfolge

```
Leicht                      Mittel                      Sensibel
Name, E-Mail       →        Anliegen, Auswahl     →     Telefon, Firma, Budget
```

| Regel | Grund |
|---|---|
| Einspaltig. Zwei Felder nebeneinander nur, wenn sie zusammengehören (PLZ und Ort) | das Auge springt sonst zwischen Spalten und überspringt Felder; auf dem Handy ist es ohnehin eine Spalte |
| Labels stehen sichtbar über dem Feld | ein Platzhalter ist kein Label, siehe `04-barrierefreiheit-bfsg.md` |
| Platzhalter zeigt ein Beispiel, kein Label: `name@firma.de` | er verschwindet beim Tippen; als Beispiel fehlt er dann nicht |
| Hilfetext nur, wo er hilft, direkt am Feld | ein Hilfetext an jedem Feld wird an keinem gelesen |
| Pflicht oder optional einheitlich markieren, die Minderheit beschriftet | sind fast alle Felder Pflicht, steht „(optional)" an den anderen, nicht umgekehrt |
| Absendeknopf direkt unter dem letzten Feld, bündig mit den Feldern | ein Knopf am anderen Rand wird übersehen |
| Bedienflächen mindestens 24 × 24 px (WCAG 2.5.8), besser 44 px Höhe | Felder und Knopf werden mit dem Daumen getroffen |
| Passende Tastatur: `type="email"`, `type="tel"`, `inputmode="numeric"` für PLZ | spart auf dem Handy jeden Tastaturwechsel |
| Kein Autofokus auf das erste Feld beim Laden | der Bildschirmleser springt mitten in die Seite, und auf dem Handy öffnet sich die Tastatur über dem Heldenbereich |

## 4. Mehrstufig

Ein mehrstufiges Formular lohnt sich, wenn eine dieser Bedingungen zutrifft:

| Bedingung | Beispiel |
|---|---|
| mehr als fünf Felder sind wirklich nötig | Angebotsanfrage für eine Dachsanierung |
| die Fragen hängen voneinander ab | „Neubau" führt zu anderen Fragen als „Sanierung" |
| die Angaben zerfallen in getrennte Themen | Objekt, Umfang, Kontakt |

**Aufbau, der funktioniert:**

1. **Schritt 1 ist eine Auswahl, kein Textfeld.** „Worum geht es?" mit drei großen
   Optionsflächen. Eine Entscheidung mit einem Klick ist der leichteste Einstieg.
2. **Danach die Sachfragen**, ein Thema je Schritt.
3. **Zuletzt die Kontaktdaten.** Wer drei Schritte investiert hat, bricht beim vierten
   seltener ab als beim ersten, und die sensiblen Angaben kommen, wenn der Zweck klar ist.

| Pflicht im mehrstufigen Formular | Grund |
|---|---|
| Fortschritt als „Schritt 2 von 4", nicht nur als Balken | ein Balken ohne Zahl sagt nicht, wie viel noch kommt; der Text wird vorgelesen |
| Zurück ohne Datenverlust | wer eine Angabe korrigieren will und dabei alles verliert, geht |
| Zwischenstand nur für den Tab (`sessionStorage`) und nach dem Absenden gelöscht | siehe Rechtsrahmen unten |
| Fokus beim Schrittwechsel auf die Überschrift des neuen Schritts | sonst bleibt der Bildschirmleser am verschwundenen Knopf hängen |
| Ohne JavaScript ein einseitiges Formular mit allen Feldern | Grundsatz aus `formulare-und-resend.md`: ohne Skript keine verlorene Anfrage |

**Rechtsrahmen Zwischenstand:** Jeder Speicherzugriff im Browser fällt unter § 25 TDDDG,
auch `sessionStorage` (`07-recht-dsgvo.md`). Ein Zwischenstand, den die Person für ihre
eigene Anfrage braucht und der mit dem Tab verschwindet, ist mit dem Sitzungscookie für den
Warenkorb vergleichbar, das dort als einwilligungsfrei geführt wird. Ein Zwischenstand über
Tage in `localStorage` ist es nicht. Die Einordnung gehört in die Rechtsprüfung vor dem
Livegang, der Dienst in die Datenschutzerklärung.

## 5. Fehler behandeln

Die Formulierung der Meldungen steht in `12-copywriting.md` („Fehler und Leere als
Wegweiser"), die Auszeichnung mit `aria-invalid` und `aria-describedby` in
`04-barrierefreiheit-bfsg.md`. Hier der Ablauf:

| Zeitpunkt | Verhalten | Grund |
|---|---|---|
| während des Tippens | keine Fehlermeldung | „Ungültige E-Mail" nach dem ersten Buchstaben ist eine Rüge für etwas, das noch gar nicht fertig ist |
| beim Verlassen des Feldes | prüfen und Meldung direkt am Feld | dann ist die Eingabe abgeschlossen und die Korrektur noch nah |
| nach einer Korrektur | Meldung sofort entfernen, sobald der Wert gültig ist | eine stehengebliebene Meldung sieht aus wie ein neuer Fehler |
| beim Absenden | ein Fehler: Fokus auf das Feld; mehrere Fehler: Fokus auf die Liste oben mit Sprunglinks (Muster in `04-barrierefreiheit-bfsg.md`, Schritt 4.4) | wer nicht sieht, wo der Fehler ist, sucht nicht, sondern geht |
| immer | alle Eingaben bleiben stehen, auch nach einem Serverfehler | ein geleertes Formular ist der sicherste Weg, eine Anfrage zu verlieren |

**Gut:** „Bitte eine vollständige E-Mail-Adresse eingeben, zum Beispiel name@firma.de"
**Schlecht:** „Ungültige Eingabe"

## 6. Vertrauen direkt am Formular

| Element | Beispiel | Bedingung |
|---|---|---|
| Antwortzeit | „Antwort meist am nächsten Werktag" | nur wenn es stimmt; der Kunde muss es halten können |
| Was danach passiert | „Wir rufen an, klären Umfang und Termin. Unverbindlich." | der nächste Schritt muss klein sein (Bogen Schritt 6 in `12-copywriting.md`) |
| Datenhinweis | „Ihre Angaben nutzen wir nur für diese Anfrage. Details in der Datenschutzerklärung." mit Link | muss mit der Datenschutzerklärung übereinstimmen |
| Alternativer Weg | Telefonnummer und Mailadresse neben dem Formular | Pflicht im Fehlerfall (6.2), im Ruhezustand eine Wahl für alle, die nicht tippen wollen |
| Ein Beleg | eine echte Kundenstimme oder Bewertungszahl mit Stand | harte Grenze: nur belegt, sonst weglassen |
| Aufwand | „Drei Fragen, etwa eine Minute" | nur mit gezählten Feldern und selbst gestoppter Zeit, nie geschätzt |

## 7. Formulartypen

| Typ | Felder | Besonderheit |
|---|---|---|
| Kontakt | Name, E-Mail, Nachricht; Telefon optional | Antwortzeit nennen, Telefon daneben |
| Rückruf | Name, Telefon, Wunschzeitraum als Auswahl („vormittags", „nachmittags") | E-Mail optional; der Zweck ist der Anruf |
| Angebotsanfrage | mehrstufig nach Abschnitt 4 | Sachfragen vor Kontaktdaten; Fotos als optionaler Upload nur mit Größengrenze und Formatliste |
| Terminanfrage | eingebettetes Buchungstool oder Formular | Buchungstool erst nach Einwilligung laden, siehe `formulare-und-resend.md` |
| Download (Leitfaden, Checkliste) | nur E-Mail | Versand des Downloads und Newsletter sind zwei Zwecke, siehe unten |
| Warteliste, Vormerkung | nur E-Mail | Double-Opt-in, wenn später geworben wird |
| Bewerbung | eigene Regeln | `19-recruiting-funnel.md` |

### Download gegen E-Mail, Newsletter getrennt

Die Quelle behandelt „Inhalt gegen Adresse" als ein Feld. In Deutschland sind es zwei
Vorgänge:

1. **Zusendung des Downloads** an die angegebene Adresse. Das ist die Anfrage selbst.
2. **Werbung per Mail danach** braucht eine eigene, unvorbelegte Einwilligung mit
   Double-Opt-in (§ 7 Abs. 2 Nr. 2 UWG, Art. 7 DSGVO, Protokollierung nach
   `07-recht-dsgvo.md`).

```html
<label><input type="checkbox" name="newsletter"> Ich möchte zusätzlich den Newsletter
(etwa einmal im Monat). Abmeldung jederzeit über den Link in jeder Mail.</label>
```

Ob der Download vom Newsletter abhängig gemacht werden darf, ist eine Frage des
Kopplungsverbots nach Art. 7 Abs. 4 DSGVO und gehört in die Rechtsprüfung. Die
Voreinstellung hier: getrennt, damit die Frage gar nicht entsteht.

### Konto anlegen

Auf Dienstleisterseiten selten, im Shop und bei Portalen Pflichtthema.

| Regel | Grund |
|---|---|
| Bestellen als Gast ist die Voreinstellung, das Konto ein Angebot nach dem Kauf | ein Konto vor dem Wert ist Reibung (`06-conversion-architektur.md`, Weitere Conversion-Hebel) |
| Passwort: Einfügen erlaubt, Anzeigen-Schalter, Anforderungen vorher sichtbar und beim Tippen abgehakt | Passwortmanager brauchen das Einfügen; Regeln, die erst nach dem Fehler erscheinen, sind eine Falle |
| Anmeldung über Google, Apple, Microsoft nur als zusätzlicher Weg, das Skript erst nach Klick oder Einwilligung | das ist ein Drittanbieter mit Datenübermittlung, bei Google und Microsoft in die USA |
| Bestätigungsmail: was zu tun ist, „erneut senden", Hinweis auf den Spamordner, Adresse korrigierbar | eine unbestätigte Adresse ohne Ausweg ist ein verlorenes Konto |
| Rollen-, Team- und Firmenfragen nach der Anmeldung, nicht davor | sie verbessern die Ansprache, nicht die Anmeldung |

## 8. Was am Formular gemessen wird

Die Ereignisse und der Rechtsrahmen stehen in `13-messung-optimierung.md`. Für das Formular
zusätzlich:

| Kennzahl | Fragt | Einwilligung |
|---|---|---|
| Formular begonnen (erster Fokus) | Kommt überhaupt jemand bis hierher? | ja, wenn über ein Analysewerkzeug mit Speicherzugriff |
| Abbruch je Feld oder Schritt | Welches Feld kostet? | ja |
| Fehler je Feld | Welche Prüfung ist zu streng? | ja |
| Absendungen | Kommt die Anfrage an? | nein, wenn serverseitig gezählt ohne Personenbezug |

**Die Zahl der Absendungen gibt es ohne jedes Tracking**: sie steht im Posteingang. Wer kein
Analysewerkzeug einsetzt, zählt dort und vergleicht Monate.

**Inhalte von Eingabefeldern werden nie an ein Analysewerkzeug übertragen**, auch nicht
gekürzt. Aufzeichnungsdienste maskieren Felder (`13-messung-optimierung.md`).

## 9. Bewusst nicht übernommen

| Die Quelle sagt | Hier gilt | Grund |
|---|---|---|
| Jedes Feld kostet einen festen Anteil Abschlüsse (vier bis sechs Felder 10 bis 25 %, ab sieben 25 bis 50 %) | Felder zählen, Abbruch je Feld messen, keine Prozentzahl versprechen | ohne nachprüfbare Quelle angegeben. Die Richtung stimmt und steht schon in 6.2, die Zahlen wären erfundene Belege |
| Firma im Hintergrund über einen Anreicherungsdienst ergänzen (Clearbit und ähnliche) | nicht ohne eigene Rechtsgrundlage, AV-Vertrag und Hinweis in der Datenschutzerklärung | eine Anreicherung ist eine zweite Verarbeitung, die die Person nicht erwartet |
| Erstes Feld beim Laden automatisch fokussieren (als Testidee) | kein Autofokus | Bildschirmleser und Handytastatur, siehe Abschnitt 3 |
| „Wir geben Ihre Daten nie weiter" als Datenhinweis | nur, was die Datenschutzerklärung deckt | Hoster, Mailversand und Formularempfang sind Empfänger nach Art. 13 DSGVO; „nie" ist dann falsch |
| „Dauert 30 Sekunden" als Text | nur gemessene Angaben | eine unwahre Zeitangabe ist eine unwahre Werbeaussage |
| Kalendereinbettung erhöht die Terminquote | Buchungstool nach Einwilligung, mit Platzhalter und direktem Link | die Wirkung ist ohne Beleg behauptet, die Einwilligungspflicht nicht verhandelbar (`07-recht-dsgvo.md`) |
| Anmeldung mit Google als Hauptweg | zusätzlicher Weg, Skript erst nach Klick | Drittanbieter mit Drittlandübermittlung; die eigene Anmeldung bleibt der Grundweg |
| Kreditkarte für die Testphase verlangen oder nicht, Länge der Testphase | nicht übernommen | betrifft Softwareabos, nicht Kundenwebsites im DACH-Raum |

## Verwandte Kapitel

- `06-conversion-architektur.md`: Schritt 6.2 mit Feldzahl, Feldbegründung und technischer Pflicht
- `../../agentur-website-builder/references/formulare-und-resend.md`: Serverroute, Honigtopf, Turnstile, Zustände im Agenturstack
- `04-barrierefreiheit-bfsg.md`: Labels, Fehlerauszeichnung, Fokusführung
- `07-recht-dsgvo.md`: § 25 TDDDG, Newsletter, Auftragsverarbeitung
- `12-copywriting.md`: Fehlermeldungen, Buttontexte
- `13-messung-optimierung.md`: Formularereignisse, Einwilligung, Testen
- `19-recruiting-funnel.md`: Bewerbungsformular
