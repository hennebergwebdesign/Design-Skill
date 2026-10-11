# Zahlungen umsetzen: Stripe auf Astro und Cloudflare Pages

Das Regelwerk (`../../webdesign-conversion/references/53-zahlungen-mit-stripe.md`) entscheidet den Weg, die Technik, das Recht und die Steuer. Diese Datei ist der Ablauf im Projekt:
was in welcher Phase geschieht, welche Dateien aus `assets/stripe/` wohin kommen, welche Einstellungen im Stripe-Dashboard und im Hosting nötig sind und wie getestet wird.
**Auslöser:** der Nutzer erwähnt Verkauf, Bestellung, Bezahlen, Anzahlung, Spende, Abonnement, Kasse oder Stripe.

## Inhalt

- 1\. Vor dem Bauen
- 2\. Phasen
- 3\. Dateien
- 4\. Umgebungsvariablen
- 5\. Einstellungen im Stripe-Dashboard
- 6\. Testplan
- 7\. Fehlerbilder
- 8\. Übergabe
- 9\. Ungeprüft

## 1. Vor dem Bauen

Fragen (zusätzlich zu `intake-und-entscheidungen.md`), gebündelt in Phase 2:

| Frage | Wohin die Antwort geht |
|---|---|
| Hat der Kunde ein eigenes Stripe-Konto? Ist es freigeschaltet (Branche, Firmendaten geprüft)? | Konzept; ohne Konto kein Livegang |
| Verbraucher, Unternehmen oder beides? | Rechtsseiten, Preisanzeige (brutto/netto) |
| Was wird verkauft: Produkt, Termin, Kurs, Spende, Abonnement? Wie viele Angebote? | Wahl des Wegs (Zahlungslink, gehostetes Checkout, Billing) |
| Wer erfüllt wann: Versand, Zugang, Mail, Termin? | Handler im Webhook |
| Ist der Kunde umsatzsteuerlich in welchen Ländern registriert (Kleinunternehmer, OSS)? | `automatic_tax` ja oder nein, **nicht raten** |
| Welche Zahlarten sollen laufen und kann der Kunde sie abwickeln (Lastschrift, Klarna, PayPal)? | Dashboard-Einstellung |
| Wer liefert AGB, Widerrufsbelehrung, Datenschutzbaustein? | Seiten `/agb`, `/widerruf`; Platzhalter, bis geliefert |
| Wer bekommt Meldungen zu Streitfällen und Fehlzahlungen? | Adresse in Dashboard und Webhook |

Antworten, die der Kunde nicht kennt, werden `[[FEHLT: …]]`, nie ergänzt. Der Livegang mit einem Platzhalter an einer Rechtsangabe ist ausgeschlossen (`pruefe-platzhalter.mjs --launch`).

## 2. Phasen

| Phase | Was |
|---|---|
| 1 Analyse | Hinweis auf Zahlung erkennen (Auslöser oben); `package.json` auf `stripe` prüfen |
| 2 Rückfragen | die Fragen oben |
| 3 Konzept | Weg und Begründung, Liste der Angebote, Ereignisse, die behandelt werden, Rechtsseiten, Dienst „Stripe" im Abschnitt Consent und Dienste (gehostet: kein Skript auf der Seite), Steuerentscheidung, Annahmen ausgesprochen (`arbeitsdisziplin.md`, Abschnitt 1) |
| 4 Umsetzung | Reihenfolge in Abschnitt 3; Code **nach Quelle**: Aufrufe gegen die aktuelle Stripe-Dokumentation und die SDK-Version des Projekts prüfen und im Commit nennen (`arbeitsdisziplin.md`, Abschnitt 7) |
| 5 Prüfung | `pruefe-sicherheit.mjs` (erkennt Stripe an `package.json` und Aufrufen), Testplan (Abschnitt 6), Zweifel-Durchgang für Webhook und Erfüllung (`arbeitsdisziplin.md`, Abschnitt 8) |
| 6 Übergabe | Abschnitt 8 |

## 3. Dateien

Kopieren aus `assets/stripe/` und anpassen. **Die Vorlagen sind ungeprüft** (Kopf der Dateien): nicht gegen eine Sandbox gelaufen, Parameternamen gegen die Version des Projekts prüfen.

| Datei | Ziel im Projekt | Zweck |
|---|---|---|
| `checkout-route.ts` | `src/pages/api/checkout.ts` | legt eine Checkout-Sitzung an und leitet zu Stripe weiter. Preise nur aus `STRIPE_PREISE` |
| `stripe-webhook-route.ts` | `src/pages/api/stripe-webhook.ts` | prüft die Signatur, behandelt Ereignisse, merkt sich Kennungen |
| `schema.sql` | `migrations/` | Tabelle `stripe_ereignisse` für D1 (nur Kennung, Typ, Zeit) |
| Rechtsbausteine | `../../webdesign-conversion/assets/vorlagen/zahlung-rechtsbausteine.md` | Baustein für die Datenschutzerklärung, Hinweis zur Zahlungspflicht, Prüfliste der Rechtsseiten |

Reihenfolge:

1. Abhängigkeit: `pnpm add stripe` (feste Version, Lockfile einchecken).
2. `STRIPE_API_VERSION` in beiden Routen auf die geprüfte Version setzen und in der `CLAUDE.md` festhalten.
3. Binding `DB` (D1) und `schema.sql` einrichten; ohne D1 muss `erfuellen()` selbst wiederholbar sein.
4. Seite: ein Formular mit `method="post" action="/api/checkout"` und verstecktem Feld `angebot` je Angebot. Der Knopf nennt, was passiert („Weiter zur Zahlung"); die Beschriftung des Vertragsabschlusses steht auf der Stripe-Seite und im Hinweistext (Regelwerk, Abschnitt 4).
5. Seiten `/danke` (zeigt an, tut nichts), `/abgebrochen` (zurück zum Angebot, Satz zum Stand), `/agb`, `/widerruf`, Datenschutz mit dem Baustein.
6. `erfuellen()` im Webhook umsetzen: Bestätigungsmail im Branding des Kunden (`assets/forms/mail-template.ts`, mit AGB und Widerruf), interne Benachrichtigung, bei Bedarf Zugang. Wiederholbar schreiben.
7. `_headers`: CSP mit den Stripe-Adressen, falls Stripe.js geladen wird (nicht bei reiner Weiterleitung nötig).
8. `wrangler.toml`: Binding eintragen, ohne erfundene IDs (`stack-und-deployment.md`).

## 4. Umgebungsvariablen

Namen mit Zweck, ohne Werte; als Secret im Hosting, lokal in `.dev.vars`, in `.env.example` als Platzhalter:

| Name | Zweck | Hinweis |
|---|---|---|
| `STRIPE_SECRET_KEY` | Zugriff auf die Schnittstelle | **eingeschränkter Schlüssel** (`rk_`), nie `PUBLIC_`, getrennt für Sandbox und Live |
| `STRIPE_WEBHOOK_SECRET` | Signaturgeheimnis des Endpunkts (`whsec_`) | je Endpunkt ein eigenes; wie ein Schlüssel behandeln |
| `STRIPE_PREISE` | JSON `{"kurs-1":{"preis":"price_…","modus":"payment"}}` | Preis-IDs unterscheiden sich zwischen Sandbox und Live, deshalb Umgebung, nicht Code |
| `STRIPE_STEUER` | `ja` nur mit aktiver Registrierung | sonst nicht setzen |
| `TURNSTILE_SECRET_KEY` | Missbrauchsschutz am Bestellformular | wie beim Kontaktformular |

Der einzige öffentliche Wert wäre ein Publishable Key (`pk_`), und nur bei eingebettetem Checkout (`PUBLIC_STRIPE_PUBLISHABLE_KEY`). Bei gehostetem Checkout gibt es keinen.

## 5. Einstellungen im Stripe-Dashboard

Im Konto des Kunden, in der Sandbox und danach live; die Agentur arbeitet als Teammitglied mit kleinster Rolle:

* **Zahlarten** (Einstellungen → Zahlungsmethoden): freischalten, was der Kunde will; Standard bleibt die dynamische Auswahl.
* **Marke** (Logo, Akzentfarbe, Name auf dem Kontoauszug), **Shop-URLs** und die **AGB-Adresse** (nötig für `consent_collection`).
* **Webhook-Endpunkt** `https://<domain>/api/stripe-webhook` mit genau den Ereignissen, auf die der Code reagiert: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `charge.dispute.created`, `charge.refunded`, bei Abonnements die Lebenszyklus-Ereignisse (`customer.subscription.*`, `invoice.paid`, `invoice.payment_failed`). Nicht alles abonnieren.
* **Kundenportal** bei Abonnements (Kündigung, Zahlungsmittel, Rechnungen) und Kündigungsbutton auf der Seite.
* **Steuern**: Registrierung und Produktsteuercodes, nur nach Rücksprache mit dem Steuerberater.
* **Benachrichtigungen** (Streitfälle, fehlgeschlagene Zahlungen) an die Adresse des Kunden.
* **Zwei-Faktor-Anmeldung** für alle Teammitglieder, Passkey oder Authenticator-App.

## 6. Testplan

Alles in der **Sandbox** mit den Testdaten aus der Stripe-Dokumentation. Kein Test mit einer echten Karte außer dem letzten Schritt.

| # | Fall | Erwartung |
|---|---|---|
| 1 | erfolgreiche Zahlung | Weiterleitung auf `/danke`, Ereignis kommt an, einmal erfüllt, Mail im Branding |
| 2 | Karte abgelehnt | Meldung bei Stripe, kein Ereignis zur Erfüllung |
| 3 | Abbruch | `/abgebrochen`, nichts erfüllt, Warenkorb erhalten |
| 4 | 3-D Secure | Weiterleitung und Rückkehr klappen |
| 5 | verzögerte Zahlart (Lastschrift) | `completed` erfüllt noch nicht, `async_payment_succeeded` erfüllt |
| 6 | fehlgeschlagene verzögerte Zahlung | `async_payment_failed`, Mail an den Käufer |
| 7 | Webhook mit falscher Signatur | 400, nichts geschieht |
| 8 | dasselbe Ereignis doppelt | einmal verarbeitet |
| 9 | Erstattung, Streitfall | Meldung an den Kunden |
| 10 | Preis manipulieren (Feld `angebot` mit unbekannter Kennung) | 422, kein Preis aus dem Browser |
| 11 | `curl` ohne `Origin` | 403 |
| 12 | Mobil und Tastatur | Formular und Rückkehr bedienbar |
| 13 | Consent: vor der Einwilligung lädt die Seite nichts von Stripe (gehostet) | per `playwright-cli requests` geprüft |
| 14 | Livetest, nach Freigabe durch den Kunden | wenige Euro, danach erstatten, im Beisein des Kunden |

Webhook lokal mit der Stripe CLI: `stripe listen --forward-to localhost:4321/api/stripe-webhook` gibt das Signaturgeheimnis für den lokalen Test aus; `stripe trigger checkout.session.completed` löst ein Ereignis aus.

## 7. Fehlerbilder

| Bild | Wahrscheinliche Ursache | Abhilfe |
|---|---|---|
| Webhook antwortet 400 „Signatur ungültig" | falsches Signaturgeheimnis (Sandbox gegen Live, anderer Endpunkt), oder der Text wurde vor der Prüfung umgeformt | richtiges `whsec_` des Endpunkts; `request.text()`, nicht `request.json()` |
| Kasse bleibt leer oder lädt nicht | CSP blockiert Stripe | Adressen ergänzen (Regelwerk, Abschnitt 6) |
| Käufer zahlt, nichts passiert | Erfüllung hängt an der Erfolgsseite, oder der Webhook ist nicht konfiguriert | Erfüllung in den Webhook, Endpunkt im Dashboard prüfen |
| Lastschrift wird nie erfüllt | `async_payment_succeeded` nicht behandelt | Ereignis ergänzen |
| Steuer fehlt trotz Einstellung | `automatic_tax` ohne Registrierung | Registrierung klären (Regelwerk, Abschnitt 5) |
| Zahlarten fehlen (nur Karte) | `payment_method_types` im Code | entfernen, Dashboard verwalten |
| Doppelte Mails | doppelte Zustellung ohne Kennung | Tabelle `stripe_ereignisse`, `erfuellen()` wiederholbar |
| `403` bei einem Aufruf | eingeschränkter Schlüssel ohne die nötigen Rechte | fehlendes Recht ergänzen, nicht auf den vollen Schlüssel zurück |
| Abbruch beim Deploy, Funktion startet nicht | SDK ohne Unterstützung für den Fetch-Client oder Node-Module in Workers | SDK-Dokumentation für Workers prüfen, Version prüfen |

## 8. Übergabe

* Kunde ist Inhaber des Stripe-Kontos; Agentur-Zugang entfernt, wenn nichts mehr zu tun ist.
* Schlüsselliste (Name, Ort, Ausstellungsdatum, Erneuerung), Webhook-Endpunkt und seine Ereignisse, API-Version in der `CLAUDE.md`.
* Wer die Meldungen erhält, wie ein Streitfall abläuft, wer erstattet.
* Rechtsseiten vom Händler geliefert und geprüft; offene Punkte im Bericht (`qa-und-abnahme.md`).
* Hinweis an den Kunden: Passkey statt SMS, Schlüssel nie per Mail oder Chat teilen.
* Im Bericht: was in der Sandbox getestet ist, was **nicht** (Livetest, Steuer, rechtliche Texte).

## 9. Ungeprüft

* Die Vorlagen in `assets/stripe/` sind nie gelaufen. Das Verhalten von `createFetchHttpClient`, `createSubtleCryptoProvider`, `custom_text`, `consent_collection` und `integration_identifier` in der aktuellen SDK-Version ist ungeprüft.
* Die Abläufe sind für Astro auf Cloudflare Pages beschrieben und nicht gegen eine echte Bereitstellung gelaufen.
* Kein Evalfall, das Δ ist eine Vermutung.
