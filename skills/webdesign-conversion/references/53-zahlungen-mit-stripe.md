# Zahlungen mit Stripe: Weg wählen, sauber anbinden, rechtlich tragen

`06-conversion-architektur.md` baut den Weg zur Handlung, `07-recht-dsgvo.md` regelt Datenschutz und Pflichtangaben,
`52-sicherheit-der-kundenseite.md` die Sicherheit. Dieses Kapitel gilt, sobald eine Kundenseite **Geld einnimmt**: Produkte, Termine
mit Anzahlung, Kurse, Spenden, Abonnements. Dann ist die Seite die Kasse eines Händlers, und drei Dinge hängen aneinander: die
**Technik** (welche Schnittstelle, welche Ereignisse), das **Recht** (Bestellknopf, Widerruf, Preisangaben, Datenschutz) und die
**Steuer** (wann Stripe überhaupt Umsatzsteuer berechnet). Die Umsetzung mit Code steht in
`../../agentur-website-builder/references/zahlungen-umsetzung.md`.

Die technische Substanz stammt aus dem Skill `stripe-best-practices` im Repository `stripe/ai` (MIT, Stand 11.10.2026, API-Version der
Quelle `2026-09-30.endive`), siehe `CREDITS.md`, Abschnitt „Version 4.21". Übernommen sind die Entscheidungen für Kundenseiten
(Zahlungen annehmen, Abonnements, Steuer, Sicherheit). Die rechtlichen Abschnitte sind **eigene Zusammenstellung** für den deutschsprachigen
Raum, nicht Inhalt der Quelle, und **keine Rechtsberatung**: Texte der Händlerseite (AGB, Widerrufsbelehrung, Datenschutz) schreibt
die Agentur nicht, sie liefert der Kunde oder eine Anwältin (wie in `07-…`).

## Inhalt

- 1\. Rollen und Voraussetzungen
- 2\. Welcher Weg
- 3\. Technische Regeln
- 4\. Recht in der Bestellstrecke
- 5\. Steuern
- 6\. Sicherheit
- 7\. Die Bestellstrecke als Conversionfläche
- 8\. Abonnements und Dauerschuldverhältnisse
- 9\. Testen, Livegang, Übergabe
- 10\. Entschiedene Widersprüche
- 11\. Bewusst nicht übernommen
- 12\. Ungeprüft
- Verwandte Kapitel

## 1. Rollen und Voraussetzungen

| Frage | Regel | Grund |
|---|---|---|
| Wessen Stripe-Konto? | das **des Kunden**, nie das der Agentur | Der Kunde ist Händler und haftet. Geld der Agentur zu mischen macht sie zum Zahlungsempfänger |
| Wer darf ins Dashboard? | die Agentur als Teammitglied mit der kleinsten nötigen Rolle, nach der Übergabe entfernt | Zugang ist Eigentum des Kunden (`qa-und-abnahme.md`, Schritt 10) |
| Ist Stripe im Konzept freigegeben? | ja, wie jeder neue Dienst (Phase 3) | Datenschutz, Auftragsverarbeitung, Einwilligung |
| Wer schreibt AGB, Widerruf, Datenschutz? | Kunde oder Anwältin | harte Grenze: keine erfundenen Rechtsangaben |
| Entwicklung gegen was? | eine eigene **Sandbox** je Entwicklung und Prüfung, nicht gegen das Live-Konto und nicht gegen den gemeinsamen Testmodus | Sandboxes trennen Einstellungen und Testdaten von Live; der gemeinsame Testmodus nur für Bestehendes, das ihn schon nutzt |
| B2B oder B2C? | steht im Konzept | Das Verbraucherrecht (Abschnitt 4) gilt nur gegenüber Verbrauchern, aber die Seite muss wissen, wen sie anspricht |

## 2. Welcher Weg

Vorrang: so wenig eigener Zahlungscode wie möglich. Reihenfolge der Quelle, ergänzt um die Entscheidung der Agentur.

| Fall | Weg | Entscheidung |
|---|---|---|
| ein oder wenige feste Produkte, kein Warenkorb | **Zahlungslink** (Payment Link) | ohne Code, die Seite verlinkt nur. Genügt für Anzahlung, Kurs, Spende |
| Produkte mit Auswahl auf der Seite | **Checkout, gehostet** (Weiterleitung zu Stripe) | **Standard der Agentur**: kein Drittskript auf der Seite, kein Consent dafür, Zahlarten und Steuer aus dem Dashboard |
| gleiche Kasse, aber auf der eigenen Seite | **Checkout, eingebettet** | nur auf Wunsch, mit Stripe.js nur auf der Kassenseite |
| eigene Maske mit Stripe-Feldern | **Payment Element** über Checkout Sessions (`ui_mode: 'custom'`) | nur mit Begründung im Konzept: mehr Code, mehr Prüfung |
| wiederkehrende Zahlung | **Billing + Checkout** (Modus Abonnement) + **Kundenportal** | Abschnitt 8 |
| Karte speichern für später | **Setup Intents** | nie Sources, nie `createToken` |
| Marktplatz mit Auszahlung an Dritte (Connect) | nicht im Umfang der Agentur | eigenes Projekt, eigene Haftung |
| Nutzungsbasierte Abrechnung | nicht im Umfang einer Kundenseite | eigenes Projekt |

**Nie:** die alte Charges-API, die Sources-API, das **Card Element** (auf das Payment Element wechseln) oder Karteneingabefelder in
eigenem Markup. Rohe Kartennummern berühren die Seite nie, sonst kommt der Kunde in einen höheren PCI-Fragebogen.

Warum gehostet als Standard: Der Besucher verlässt die Seite für die Zahlung, dafür muss die Seite weder Stripe.js laden noch
Karteneingabe tragen. Das spart die Einwilligungsfrage, die Inhaltsrichtlinie bleibt klein, und die wartungsintensiven Teile (Zahlarten,
3-D Secure, Steuer, Betrugsabwehr) liegen bei Stripe. Preis dafür: Der Übergang ist sichtbar. Die Marke lässt sich im Dashboard anpassen
(Logo, Farben).

## 3. Technische Regeln

| # | Regel | Grund |
|---|---|---|
| 1 | **Zahlarten nie im Aufruf festlegen.** `payment_method_types` entfällt (einzige Ausnahme: Terminal mit `card_present`). Zahlarten werden im Dashboard verwaltet; ausschließen mit `excluded_payment_method_types`, einschränken mit `payment_method_configurations`. Auch nie `['card']` | Stripe wählt aus über 100 Signalen die passenden Zahlarten je Besucher und ordnet sie nach Abschlusswahrscheinlichkeit. Ein fest codiertes `['card']` sperrt SEPA, PayPal und Klarna aus. `pruefe-sicherheit.mjs` meldet es als Fehler |
| 2 | **Webhooks sind Pflicht**, nicht Option. Erfüllung (Zugang, Mail, Bestand, Eintrag in die Datenbank) hängt am Ereignis, nicht an der Erfolgsseite | Wer nach der Zahlung die Verbindung verliert, sieht die Erfolgsseite nie. Ein Checkout ohne Handler ist nicht fertig, auch nicht als Entwurf |
| 3 | Beide Ereignisse behandeln: `checkout.session.completed` und `checkout.session.async_payment_succeeded`, jeweils nur bei `payment_status` ungleich `unpaid` erfüllen; `checkout.session.async_payment_failed` für Fehlschläge | SEPA-Lastschrift und Überweisung bestätigen verzögert: ohne den zweiten Fall wird nie erfüllt, was später bezahlt wird, und der erste allein erfüllt Zahlungen, die später scheitern |
| 4 | **Signatur prüfen**, vor allem anderen, gegen das Signaturgeheimnis (`whsec_`) und den **rohen** Anfragetext | sonst kann jeder eine Bestellung als bezahlt melden |
| 5 | Ereignis-Kennung merken (z. B. in D1 oder KV), jedes Ereignis **höchstens einmal** verarbeiten | Stripe liefert mindestens einmal, nicht genau einmal |
| 6 | Preis, Menge, Währung nur **serverseitig** aus einer Liste der Angebote | ein Preis aus dem Browser ist ein verhandelbarer Preis |
| 7 | Eine **Instanz des Clients** mit dem Schlüssel erzeugen und verwenden; nie die globale Schlüsselsetzung (`stripe.api_key = …`, `Stripe.setApiKey`) | in allen aktuellen SDKs veraltet |
| 8 | **API-Version im Projekt festlegen** und bewusst anheben (Quelle: immer die neueste, solange nichts anderes verlangt ist) | Ein unbemerkter Versionssprung ändert Antworten. Die Version steht in `CLAUDE.md` |
| 9 | Ab API-Version `2026-03-25.dahlia`: bei `checkout.sessions.create` den Parameter `integration_identifier` mit einer Kennung und 8 zufälligen Buchstaben als Endung setzen | trennt Kassenabläufe im Dashboard (Quelle) |
| 10 | Abonnement-Ereignisse und Risikoereignisse zusätzlich: `customer.subscription.*`, `invoice.paid`, `invoice.payment_failed`, `charge.dispute.created`, `charge.refunded`, `radar.early_fraud_warning.created` | Erneuerung, Fehlzahlung, Kündigung, Streit und Betrugswarnung passieren nach der Kasse und sind sonst unsichtbar. Nur abonnieren, worauf der Code reagiert |
| 11 | Für Rückfälle `client_reference_id` oder Metadaten setzen, damit eine Bestellung der Sitzung zuzuordnen ist | ohne Kennung lässt sich eine Zahlung nicht der Bestellung zuordnen |
| 12 | Die Erfolgsseite zeigt an, was sie über die Sitzungskennung abruft, und **tut nichts** | sie darf mehrfach oder nie erscheinen |

Fallen, die die Quelle namentlich nennt: Das Beschreiben von Webhooks als „optional" oder „für später"; Checkout-Integration ohne Handler als fertig melden;
`payment_method_types: ['card']`; das Card Element oder das Payment Element nur für Karten; Tokens, Sources, Charges; Schlüssel im Browsercode.

## 4. Recht in der Bestellstrecke

**Keine Rechtsberatung.** Die Punkte sind das, was ein Verbraucher-Shop im deutschsprachigen Raum in der Regel braucht; Wortlaut, Ausnahmen
und die Lage im jeweiligen Land entscheidet die Anwältin des Kunden. Österreich und die Schweiz haben eigene Vorschriften (Fernabsatz, Preisangaben,
Steuer); diese Tabelle gilt für Deutschland.

| Pflicht | Inhalt | Wo sie im Ablauf sitzt |
|---|---|---|
| **Button-Lösung** (§ 312j Abs. 3 BGB) | Die Schaltfläche, mit der der Vertrag geschlossen wird, trägt „zahlungspflichtig bestellen" oder eine ebenso eindeutige Formulierung. „Weiter" oder „Absenden" genügt nicht. Bei einem Vertrag ohne diese Beschriftung kommt kein Vertrag zustande | Bei Stripe Checkout steht der Knopf auf der Stripe-Seite („Bezahlen"). Den Hinweis ergänzt die Seite dort über `custom_text` (gegen die aktuelle Stripe-Dokumentation prüfen) und in der Bestellübersicht davor |
| **Bestellübersicht** (§ 312j Abs. 2 BGB) | unmittelbar vor der Bestellung: wesentliche Merkmale, Gesamtpreis mit allen Preisbestandteilen, bei Laufzeitverträgen Laufzeit und Kündigung | die Seite oder die Kasse davor |
| **Preisangaben** (Preisangabenverordnung) | Endpreis **inklusive Umsatzsteuer**, Versandkosten, Grundpreis bei Mengenwaren | Produktseite, Warenkorb, Kasse |
| **Widerrufsrecht** (§§ 312g, 355 ff. BGB) | 14 Tage bei Fernabsatz, Belehrung in Textform, Muster-Widerrufsformular; Ausnahmen für digitale Inhalte und Dienstleistungen nur mit ausdrücklicher Zustimmung und Bestätigung (§ 356 BGB) | Seite `/widerruf`, Link in der Kasse, Kopie in der Bestätigungsmail |
| **Elektronische Widerrufsfunktion** | Die Richtlinie (EU) 2023/2673 verlangt für Verträge im Netz eine elektronische Widerrufsfunktion, anwendbar seit dem 19.06.2026. **Wortlaut und deutsche Umsetzung vor der Auslieferung prüfen**, in dieser Zusammenstellung nicht verifiziert | Link und Funktion im Footer und in der Bestätigung |
| **Kündigungsbutton** (§ 312k BGB) | bei Dauerschuldverhältnissen mit Verbrauchern: eine Kündigungsschaltfläche, die leicht erreichbar ist | Abschnitt 8 |
| **Zusatzkosten nur mit Zustimmung** (§ 312a Abs. 3 BGB) | Zusatzprodukte oder Versicherungen nicht vorausgewählt; ein Häkchen setzt der Käufer selbst | Kasse |
| **Informationspflichten** (Art. 246a EGBGB) | Identität, Leistung, Preis, Zahlungsbedingungen, Lieferfrist, Widerruf, Gewährleistung, Streitbeilegung | AGB-Seite, Produktseite, Bestätigung |
| **AGB** | vor der Bestellung abrufbar und speicherbar; Zustimmung ausdrücklich, ohne Vorauswahl | Link in der Kasse |
| **Bestätigung** | Bestellbestätigung per E-Mail mit AGB, Widerruf und Rechnung | Webhook (`checkout.session.completed`), nicht Erfolgsseite |
| **Impressum** | `07-recht-dsgvo.md` | jede Seite |

**Datenschutz** (`07-…`). Die Datenschutzerklärung nennt Stripe: Anbieter (Stripe Payments Europe, Ltd., Dublin), Zweck (Zahlungsabwicklung,
Betrugsprävention), Rechtsgrundlage (Vertrag, Art. 6 Abs. 1 lit. b; Betrugsabwehr berechtigtes Interesse, lit. f), verarbeitete Daten,
Drittlandbezug (die Muttergesellschaft sitzt in den USA, **Grundlage der Übermittlung ist `[[FEHLT: aus dem Vertrag des Händlers mit Stripe]]`**) und
den Hinweis auf die Datenschutzerklärung von Stripe. Die Rollen (Verantwortlicher oder Auftragsverarbeiter, je nach Zweck) entscheidet der
Vertrag des Kunden mit Stripe; die Vorlage `assets/vorlagen/zahlung-rechtsbausteine.md` gibt den Baustein mit Lücken vor. Gehostetes Checkout lädt kein
Stripe-Skript auf der Seite des Kunden und erzeugt dort keinen Einwilligungsbedarf. Mit eingebettetem Checkout oder Payment Element lädt
Stripe.js (Stripe empfiehlt es auf jeder Seite wegen der Betrugsabwehr). In der Agentur: **nur auf den Seiten, auf denen bezahlt wird**, und die
Einordnung als „für den Vertrag erforderlich" steht in `consent-und-dienste.md`.

`pruefe-sicherheit.mjs` meldet, wenn bei Stripe keine Seite zu AGB oder Widerruf existiert, wenn der Text „zahlungspflichtig" im Projekt fehlt und wenn die
Datenschutzerklärung Stripe nicht erwähnt. Es kann nicht prüfen, ob die Texte stimmen.

## 5. Steuern

* **`automatic_tax` nur mit aktiver Registrierung.** Ohne Registrierung im Zielland berechnet und erhebt Stripe **keine** Steuer, während der Kunde glaubt, sie sei eingeschaltet. Das ist der häufigste Fehler mit Stripe Tax. Vor dem Einschalten (auch in einer eigenen Berechnung für ein PaymentIntent) klären, ob der Kunde registriert ist.
* **Der Steuerberater des Kunden entscheidet:** Kleinunternehmerregelung (§ 19 UStG, dann keine Umsatzsteuer und ein Hinweis auf der Rechnung), Steuersätze, Lieferschwellen und die One-Stop-Shop-Regelung der EU, Steuercodes der Produkte. Die Agentur setzt das um, was er festlegt.
* **Preise für Verbraucher brutto anzeigen** (Abschnitt 4). Der Preis in der Kasse entspricht dem auf der Seite.
* **Rechnung:** Pflichtangaben und Aufbewahrung klärt der Steuerberater; Stripe kann Rechnungen erzeugen, die Entscheidung darüber trifft der Kunde.
* Bei Abonnements gehört der Steuerhinweis in jede Einrichtung (Abschnitt 8).

## 6. Sicherheit

Allgemeines steht in `52-…`. Für Stripe zusätzlich:

| Regel | Grund |
|---|---|
| Ein **eingeschränkter Schlüssel** (`rk_`) mit den nötigen Rechten statt des vollen (`sk_`). Weg dorthin: Protokolle des vollen Schlüssels ansehen, einen eingeschränkten im Testmodus mit denselben Rechten anlegen, mit `stripe logs tail` beobachten, `403` mit fehlenden Rechten beheben, den Live-Schlüssel erstellen und den alten ablaufen lassen | ein gestohlener eingeschränkter Schlüssel kann weniger |
| Je Dienst und Umgebung ein eigener Schlüssel; **Zugriffsrichtlinien** (IP-Beschränkung) je Schlüssel | begrenzt den Schaden |
| Schlüssel nur in den Secrets des Hostings (Cloudflare), nie im Repository, nie im Browser (`pk_` ist der einzige öffentliche) | `52-…`, Abschnitt 4 |
| Nach einem Fund: erst den Schlüssel im Dashboard rollen, dann Protokolle prüfen, dann Stripe kontaktieren, wenn Unbekanntes auftaucht | Reihenfolge begrenzt den Schaden |
| **Webhook-Signaturgeheimnis** wie einen Schlüssel behandeln; zusätzlich die Adressen von Stripe als Quelle zulassen | doppelte Absicherung |
| **Inhaltsrichtlinie** mit `https://js.stripe.com`, `https://*.stripe.com` in `script-src`, `frame-src`, `connect-src` (bei Link-Elementen zusätzlich `https://*.link.com`); nie `default-src *`, nie weglassen | Stripe.js verlässt sich auf den XSS-Schutz der Seite |
| Dashboard des Kunden mit **Passkey oder Authenticator-App**, nicht per SMS | SMS-Zugang wird durch Nummernübernahme angreifbar. Das ist eine Empfehlung an den Kunden in der Übergabe |

## 7. Die Bestellstrecke als Conversionfläche

* **Zahlarten nach Markt:** im Dashboard freischalten, was der Kunde will und abwickeln kann: Karte, SEPA-Lastschrift, PayPal, Klarna, Apple Pay und Google Pay; in Österreich EPS, in der Schweiz TWINT. Nicht im Code erzwingen (Regel 1).
* **Preistransparenz vor der Kasse:** Versand, Steuer und Gesamtpreis stehen auf der Produkt- und Warenkorbseite, nicht erst am Ende. Überraschende Zusatzkosten sind der häufigste Abbruchgrund und zugleich ein Rechtsverstoß.
* **Vertrauen am Knopf** (`06-…`): Rückgaberecht, Zahlarten, Kontakt bei Fragen, Sicherheitshinweis in einem Satz, keine erfundenen Gütesiegel. Zahlungsarten-Symbole nur die, die tatsächlich aktiv sind (harte Grenze: keine Attrappen).
* **Abbruch ist ein Pfad:** `cancel_url` führt zur Seite zurück, mit erhaltenem Warenkorb und einem Satz, was passiert ist. Eine abgelehnte Zahlung nennt den nächsten Schritt.
* **Nach der Zahlung:** die Erfolgsseite sagt, was geschieht (Mail, Frist, Zugang), nennt die Bestellnummer und den Kontakt. Die Mail kommt aus dem Webhook.
* **Mobil zuerst:** die Kasse ist auf Handy und Tastatur bedienbar (`04-…`), Apple und Google Pay sichtbar, wo sie angeboten werden.
* **Keine Dunkelmuster:** keine vorausgewählten Zusätze, keine Verknappungsbehauptungen ohne Beleg (`12-…`, § 5 UWG), kein Countdown, der sich zurücksetzt.
* **Die Markenpassung der Kasse** (Logo, Akzentfarbe, Name auf dem Kontoauszug) wird im Stripe-Dashboard eingestellt und in der Übergabe festgehalten.

## 8. Abonnements und Dauerschuldverhältnisse

Billing mit Checkout (Modus Abonnement) übernimmt Erstzahlung, Testphase und Anteilsberechnung. **Kundenportal** für Tarifwechsel, Kündigung und Zahlungsmittel,
statt eine Verwaltung zu bauen. Pflicht: ein Handler für die Lebenszyklus-Ereignisse (Regel 10) und für Risiko-Ereignisse. Erneuerung, Fehlzahlung und Kündigung
passieren nach dem Kauf und sind ohne Handler unsichtbar. Keine eigene Erneuerungsschleife mit rohen PaymentIntents: Billing erledigt Wiederholungen
und Mahnwesen. Verbraucherrechtlich gehören dazu die Angaben zu Laufzeit und Kündigung in der Bestellübersicht und der **Kündigungsbutton** (Abschnitt 4). Auf jede
Billing-Einrichtung gehört ein Steuerhinweis (Abschnitt 5). Nutzungsabhängige Abrechnung ist nicht Gegenstand einer Kundenseite.

## 9. Testen, Livegang, Übergabe

| Schritt | Was | Ergebnis |
|---|---|---|
| 1 | In der **Sandbox**: erfolgreiche Zahlung, abgelehnte Karte, Abbruch, 3-D Secure | alle Pfade führen zur richtigen Seite |
| 2 | **Verzögerte Zahlart** (SEPA-Lastschrift, Überweisung) testen | Erfüllung erst nach `async_payment_succeeded`, nicht davor |
| 3 | Webhook lokal mit der Stripe CLI (`stripe listen`, `stripe trigger …`) und danach gegen die Vorschau-Adresse | Signatur geprüft, Ereignis-Kennung gespeichert |
| 4 | **Doppelte Zustellung** desselben Ereignisses senden | es wird nur einmal erfüllt |
| 5 | Falsche Signatur senden | `400`, nichts geschieht |
| 6 | Erstattung und Streitfall auslösen | das Ereignis kommt an, der Kunde wird informiert |
| 7 | Bestätigungsmail im Branding, Rechnung, Widerrufsfunktion | siehe Abschnitt 4 |
| 8 | Go-Live-Checkliste von Stripe durchgehen | |
| 9 | Live: **ein Betrag von wenigen Euro**, danach erstatten, im Beisein des Kunden | zeigt die echte Strecke |
| 10 | Übergabe: Schlüssel im Hosting, Rollen im Dashboard, Webhook-Endpunkt, API-Version in `CLAUDE.md`, Wer erhält Benachrichtigungen | der Kunde hält die Fäden in der Hand |

`node scripts/pruefe-sicherheit.mjs` läuft vorher; mit erkanntem Stripe prüft es zusätzlich die Regeln dieses Kapitels, soweit sie im Quelltext stehen.

## 10. Entschiedene Widersprüche

| Quelle sagt | Dieses Repository sagt | Entscheidung und Grund |
|---|---|---|
| Checkout, eingebettet oder mit Payment Element, ist der Weg für die meisten Webanwendungen | Kein Drittskript ohne Notwendigkeit, Consent nur wo nötig (`07-…`, `consent-und-dienste.md`) | Standard der Agentur ist das **gehostete** Checkout. Eingebettet nur auf Wunsch, mit Stripe.js nur auf der Kassenseite |
| Immer die neueste API-Version und das neueste SDK | Wartbare Projekte, Änderungen nur bewusst | Die Version wird im Projekt festgelegt und bewusst angehoben, der Stand steht in `CLAUDE.md` |
| Bei jeder Billing-Antwort einen Steuerhinweis anfügen | | Gilt als Pflichtpunkt der Einrichtung (Abschnitt 5), nicht als Textbaustein in jeder Antwort |
| Sandbox über die Stripe CLI anlegen, dann kein MCP | | Werkzeugdetail, nicht übernommen; der Kunde legt Konto und Sandbox an, die Agentur arbeitet mit deren Schlüsseln |
| Für nutzungsbasierte Abrechnung immer Metronome | | nicht Gegenstand einer Kundenseite |
| Webhooks nie „optional" nennen | | übernommen, auch für ein Beispiel oder einen Prototyp: „jetzt empfohlen, vor Livegang Pflicht" |
| Zugriffsrichtlinien und IP-Beschränkung je Schlüssel | Cloudflare Pages Functions laufen auf wechselnden Adressen | Die Beschränkung kann einen Funktionsaufruf aussperren. Erst prüfen, ob die Adressen des Hosters feststehen; sonst auf eingeschränkte Schlüssel und Signaturprüfung stützen |

## 11. Bewusst nicht übernommen

| Inhalt der Quelle | Grund |
|---|---|
| Connect (Plattformen, Konten v2, Onboarding, Haftung), Treasury, Metronome, Stripe Apps, Terminal | nicht Gegenstand von Kundenseiten |
| Listen der SDK-Versionen je Sprache | veralten in Wochen; gilt `package.json` des Projekts |
| Sandbox-Anlage per CLI und MCP-Regeln | Werkzeugdetail |
| Empfehlungen zu AWS, Google Cloud, Azure, Vercel für Geheimnisse | Stack ist Cloudflare Pages |
| SAML und SCIM für das Dashboard | Unternehmensthema des Kunden |
| Die Skills `connect-recommend`, `stripe-projects`, `upgrade-stripe`, `stripe-pay`, `stripe-docs`, `stripe-directory`, `stripe-apps` des Repositories | Plattform- und Werkzeugthemen; nicht gelesen |

## 12. Ungeprüft

* Kein Evalfall, das Δ ist eine Vermutung. Das Kapitel ist an keiner echten Bestellstrecke erprobt.
* **Der rechtliche Teil ist eigene Zusammenstellung, nicht anwaltlich geprüft.** Die Paragrafen (§ 312j, § 312a, § 312g, § 355 ff., § 356, § 312k BGB; Art. 246a
  EGBGB; Preisangabenverordnung; § 19 UStG) sind benannt, aber ihr aktueller Wortlaut ist nicht neu gelesen. Die Richtlinie (EU) 2023/2673 und ihre deutsche Umsetzung (elektronische
  Widerrufsfunktion, seit 19.06.2026) sind ungeprüft. Österreich und die Schweiz sind nicht abgedeckt.
* Die Parameter `custom_text`, `consent_collection` und `integration_identifier` sind aus der Quelle und der Erinnerung an die Stripe-Dokumentation beschrieben, nicht gegen die aktuelle API gelaufen.
* API-Version, SDK-Nummern, Zahlarten je Land und Gebühren sind der Stand der Quelle vom 11.10.2026. Bei der Umsetzung gegen die Dokumentation von Stripe prüfen.
* Die Codevorlagen zu diesem Kapitel sind nicht gegen eine echte Sandbox gelaufen (siehe `zahlungen-umsetzung.md`).
* Die Einordnung des gehosteten Checkouts als einwilligungsfrei folgt aus der Weiterleitung, wurde nicht mit einer Datenschutzbehörde oder Anwältin abgestimmt.

## Verwandte Kapitel

- Conversionstruktur, Vertrauen am Knopf, Formulare: `06-conversion-architektur.md`
- Datenschutz, Impressum, Pflichten je Seite, Auftragsverarbeitung: `07-recht-dsgvo.md`, `08-pflichtseiten-technik.md`
- Sicherheit, Schlüssel, Webhooks, CSP: `52-sicherheit-der-kundenseite.md`
- Versprechen, Verknappung, § 5 UWG: `12-copywriting.md`, `34-ueberzeugungsausloeser.md`
- Barrierefreiheit der Kasse: `04-barrierefreiheit-bfsg.md`
- Umsetzung mit Code und Vorlagen: `../../agentur-website-builder/references/zahlungen-umsetzung.md`
- Dienste und Einwilligung: `../../agentur-website-builder/references/consent-und-dienste.md`
- Rechtsbausteine als Vorlage: `assets/vorlagen/zahlung-rechtsbausteine.md`
