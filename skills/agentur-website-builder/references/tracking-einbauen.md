# Tracking einbauen: der feste Arbeitsablauf

Dieser Ablauf gilt, **sobald der Nutzer Tracking erwähnt**: „Tracking", „Pixel", „Conversion Tracking", „Meta Ads messen", „Conversions API", „Google Analytics", „GA4", „Kampagne messen",
„Leads zuordnen". Er muss nicht erklärt werden, der Satz „wir wollen Tracking einführen" reicht. Der Agent arbeitet dann die Schritte unten ab, stellt die Fragen aus Abschnitt 1 gebündelt
und baut nichts, bevor Konten, Ereignisse und die Entscheidung zur Zählmeldung geklärt sind.

Das Wissen dahinter steht in `../../webdesign-conversion/references/56-tracking-umsetzung-einwilligung-ereignisse.md`, die Rechtsgrundlagen in `../../webdesign-conversion/references/07-recht-dsgvo.md`.
Dieses Kapitel ist der Ablauf und wiederholt sie nicht. Herkunft: das Projekt Gewerbestrom (Wehbe Group), siehe `CREDITS.md`, Abschnitt „Version 4.23".

## Inhalt

- 1\. Fragen, die zuerst kommen
- 2\. Trackingplan
- 3\. Bauen, in dünnen Scheiben
- 4\. Abnahme
- 5\. Zahlen lesen
- 6\. Was der Agent nie tut
- Ungeprüft und offen

## Inhalt

## 1. Fragen, die zuerst kommen

Gebündelt stellen, vor dem ersten Code. Jede Frage löst eine Entscheidung aus, die der Skill nicht selbst treffen kann.

| Frage | Warum |
|---|---|
| Läuft bezahlter Verkehr auf diese Seite, und auf welcher Plattform (Meta, Google, LinkedIn, TikTok)? | ohne Anzeigen ist ein Pixel meist ein Datenschutzthema ohne Gegenwert, dann reicht ein cookieloses Analytics (`../../webdesign-conversion/references/13-messung-optimierung.md`) |
| Gehören Meta Business, Pixel und Analytics-Property dem Kunden? Wer hat Zugang? | Eigentümer ist der Kunde. Ein Pixel im Konto der Agentur ist ein Übergabeproblem |
| Was zählt als Erfolg: Formular, Anruf, Termin, Kauf? Mehrere? | bestimmt die Ereignisse und den Trackingplan (Abschnitt 2) |
| Gibt es eine zweite Seite oder Kampagne auf derselben Domain? | ein Pixel je Domain, getrennt über zwei Custom Conversions (Kapitel 56, Abschnitt 8) |
| Besteht schon ein Consent Banner mit den Kategorien Statistik und Marketing? | sonst zuerst `consent-und-dienste.md`, Tracking ohne Banner wird nicht gebaut |
| Soll eine Zählmeldung ohne Einwilligung gesendet werden? | **Entscheidung des Kunden**, mit Absatz in der Datenschutzerklärung und Rechtsprüfung. Standard: nein |
| Wo werden Anfragen gespeichert (D1, Supabase, nur Mail)? Gibt es Spalten für die Herkunft? | ohne Speicher gibt es keine belastbare Herkunftszahl (Kapitel 56, Abschnitt 6) |
| Wer pflegt Anzeigen und Konten nach der Übergabe? | der Agent ändert nie ein Werbekonto (Abschnitt 6) |

## 2. Trackingplan

Vor dem Bau eine Tabelle im Projekt (`docs/trackingplan.md`), vom Kunden gegengelesen:

| Ereignis | Auslöser | Browser | Server | `event_id` | Parameter | Kategorie | Ziel in der Plattform |
|---|---|---|---|---|---|---|---|
| `Lead` | Anfrage gespeichert, Bestätigung sichtbar | `fbq('track','Lead')` | Conversions API | je Anfrage eine, gleich auf beiden Wegen | `content_name`, `content_category` | Marketing | Custom Conversion „Anfrage" |
| `PageView` | Seitenaufruf | `fbq('track','PageView')` | keiner | n. v. | keine | Marketing | Zielgruppen |
| `generate_lead` | wie `Lead` | `gtag('event',…)` | keiner | optional | `event_id` | Statistik | Ereignis in GA4 |

Weitere Ereignisse nur, wenn die Kampagne sie braucht. Jedes zusätzliche Ereignis ist eine Zeile im Plan, ein Eintrag im Test und ein Satz in der Datenschutzerklärung.

## 3. Bauen, in dünnen Scheiben

Je Schritt bauen, prüfen, committen (`arbeitsdisziplin.md`):

1. **Consent prüfen.** `src/scripts/consent.ts` hat die Kategorien `statistik` und `marketing` und das Ereignis `consent:geaendert`. Fehlt etwas, zuerst dort.
2. **Umgebung.** In `.env.example` und `stack-und-deployment.md` ergänzen:
   ```
   PUBLIC_META_PIXEL_ID=      # öffentlich, im Browser
   PUBLIC_GA4_ID=             # öffentlich, im Browser
   META_PIXEL_ID=             # Variable auf dem Server, dieselbe ID
   META_CAPI_TOKEN=           # GEHEIMNIS, nur als Secret, nie mit PUBLIC_
   META_TEST_EVENT_CODE=      # optional, Testkanal
   META_ANON_SIGNAL=          # leer lassen, "on" nur nach Entscheidung des Kunden
   ```
   Das Token kommt per `wrangler pages secret put META_CAPI_TOKEN --project-name <projekt>` und wirkt erst mit dem **nächsten Deployment**. Der Nutzer legt es an, nie im Chat nennen
   (harte Grenze Schlüssel, `sicherheitspruefung.md`).
3. **Browser.** `assets/tracking/tracking-client.ts` nach `src/scripts/tracking.ts` kopieren, im Layout einmal `initTracking()` aufrufen, nach dem Consent Modul. Vor der Einwilligung läuft nichts.
4. **Formular.** Beim Absenden `const id = neueEventId()` einmal erzeugen und bei einem Wiederholungsversuch **dieselbe** verwenden, `...trackingFelder(id)` in den Payload, nach der Antwort der Route
   `meldeLead(id, { duplicate: antwort.duplicate })`. Das Lead-Ereignis darf nie beim Klick feuern.
5. **Server.** `assets/tracking/meta-capi.ts` nach `src/lib/meta-capi.ts`, aus der Formularroute nach dem Speichern aufrufen (Ausschnitt am Ende der Datei), nicht blockierend über `waitUntil`, mit
   Dublettenprüfung. Ein Fehler bei Meta darf nie eine Anfrage kosten.
6. **Herkunft speichern.** Spalten `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `fbclid`, `source` (Kurzform, Fallback „Meta Ad" bei `fbclid`, sonst „Direkt") in einer **Optional-Liste** beim
   INSERT, damit ein vergessener Migrationslauf keine Anfrage kostet. Die Spalten stehen bei jeder Anfrage, unabhängig von der Einwilligung.
7. **Rechtstexte.** Datenschutzerklärung und Dienstekatalog (`consent-und-dienste.md`): Pixel und Schnittstelle in einem Atemzug, die drei Kennungen mit 90 Tagen, die Herkunftsspeicherung, ein
   Absatz zur Zählmeldung, falls aktiv. Auftragsverarbeitung (Art. 28) prüfen lassen.
8. **Testen** nach Abschnitt 4, **dann** erst das Token mit Produktionswert setzen.

## 4. Abnahme

Alle Punkte tatsächlich ausführen, nicht behaupten:

* [ ] `node scripts/pruefe-tracking.mjs` endet mit 0
* [ ] `node scripts/pruefe-sicherheit.mjs`: kein Token im Quelltext und im Build
* [ ] Seite laden, **vor jedem Klick**: keine Anfrage an `connect.facebook.net`, `googletagmanager.com`, `graph.facebook.com`, keine Cookies `_fbp`, `_fbc`, `_ga*`, kein Eintrag `tracking_vid`
      (`browser-pruefung-mit-playwright-cli.md`, „Consent prüfen")
* [ ] „Ablehnen": dasselbe, auch nach einem zweiten Seitenaufruf
* [ ] „Zustimmen": Pixel lädt, `_fbp` und `_fbc` im Format `fb.1.<ms>.<Wert>`, die Kennung bleibt über Seitenaufrufe stabil und verdoppelt sich nicht
* [ ] Anfrage absenden mit `?wg_test=1`: **ein** Browserereignis, **ein** Serverereignis, gleiche `event_id`, im Events Manager (Testereignisse) mit dem Vermerk „dedupliziert"
* [ ] Anfrage ohne `wg_test`: das Ereignis erscheint **nicht** im Testkanal
* [ ] gleiche Mail zum zweiten Mal: Antwort `duplicate: true`, kein zweites Ereignis
* [ ] Widerruf über den Link in der Fußzeile: Kennungen weg, kein weiterer Verkehr
* [ ] Log des Servers zeigt je Anfrage genau eine Zeile: gesendet mit `events_received`, abgelehnt mit Meldung, oder übersprungen mit Grund
* [ ] Herkunft steht in der Datenbank, auch bei einer Anfrage nach „Ablehnen"

Im Abschlussbericht steht, was davon gelaufen ist, und was nicht (zum Beispiel „Events Manager nicht gesehen, kein Zugang").

## 5. Zahlen lesen

| Frage | Quelle |
|---|---|
| Wie viele Anfragen kamen aus welcher Anzeige? | die eigene Datenbank (`source`, `utm_*`, `fbclid`), vollständig |
| Was zählt Meta? | nur die Eingewilligten, mit eigener Zuordnung, deshalb niedriger |
| Warum weicht ein Tag ab? | Zeitzone des Werbekontos, nicht änderbar |
| Warum fehlt eine Conversion? | zuerst das Log des Servers, dann Telefonformat, dann Kennungen |

## 6. Was der Agent nie tut

* **Kein Werbekonto ändern**, keine Kampagne starten, pausieren oder umbauen, kein Optimierungsziel wechseln (setzt die Lernphase zurück). Das ist Sache des Kunden oder der Betreuung. Wo eine Änderung
  an der Seite Anzeigen betrifft (neue Motive, neue Adresse), wird darauf **hingewiesen**.
* **Die Zählmeldung ohne Einwilligung nicht einschalten.** Weder als Voreinstellung noch „weil das Projekt X es auch tut".
* **Kein Tracking ohne Banner**, kein Tag Manager als Umweg um die Parkung der Skripte.
* **Keine Pixel-ID oder Token erfinden.** Fehlt eine Angabe, steht `[[FEHLT: Pixel-ID]]` im Code und im Bericht.

## Ungeprüft und offen

* Vorlagen und Ablauf sind an keinem Agenturprojekt erprobt, kein Evalfall gelaufen. Die Vorlagen sind vom TypeScript-Compiler geprüft, nie gegen Meta, einen Browser oder Cloudflare gelaufen.
* Gemessen ist nur das Prüfskript: `pruefe-tracking.mjs` besteht an den Vorlagen und am Quelltext des Projekts Gewerbestrom ohne Fehler (sechs Warnungen wegen fester IDs in statischem HTML).
* Nicht abgedeckt: Google Enhanced Conversions, TikTok, LinkedIn, ein Tag Manager als Container. Dafür gibt es keine Vorlage.
* Ob Metas Schnittstelle das Token im Anfragekörper statt in der Adresse annimmt, ist ungeprüft; die Vorlage bleibt bei der bewährten Form.
