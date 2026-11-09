# Tracking umsetzen: eine Einwilligung, ein Ereignis, eine Zuordnung

`13-messung-optimierung.md` sagt, **was** gemessen wird und wie man die Zahlen liest, `07-recht-dsgvo.md` regelt, **wann** Tracking einwilligungspflichtig ist. Dieses Kapitel
ergänzt, was zwischen beiden fehlte: **wie Pixel, Server-Schnittstelle und eigene Datenbank so zusammenspielen, dass jede Bewerbung genau einmal zählt, nichts vor der Entscheidung
läuft und die Herkunft auch dann bekannt ist, wenn jemand ablehnt.**

Die Substanz stammt aus dem Kundenprojekt **Gewerbestrom** (Wehbe Group, Recruiting-Onepager und eine zweite Landingpage), dort live mit Meta Pixel, Conversions API und Google Analytics 4 und mit
Playwright gemessen (laut der Projektdokumentation 32 Prüfungen zu Kennungen und Einwilligung, 14 zu Analytics, dazu ein Test gegen die echte Schnittstelle mit `events_received: 1`).
**Hier ist davon nichts nachgelaufen.** Die Regeln sind aus der Projektdokumentation und dem Code gelesen und auf den Agenturstack übertragen, Vorlagen und Ablauf stehen in
`../../agentur-website-builder/references/tracking-einbauen.md` und `assets/tracking/`.

## Inhalt

- 1\. Wann überhaupt Tracking
- 2\. Zwei Wege, eine Entscheidung
- 3\. Die event_id ist die Klammer
- 4\. Wann das Lead-Ereignis feuert
- 5\. Kennungen: ohne sie findet das Ereignis niemanden
- 6\. Die Herkunft gehört in die eigene Datenbank
- 7\. Zählmeldung ohne Einwilligung: eine Option, kein Standard
- 8\. Ein Pixel, zwei Kampagnen
- 9\. Testen, ohne die Zahlen zu verfälschen
- 10\. Datenschutzerklärung und Dienstekatalog
- 11\. Prüfen
- 12\. Entschiedene Widersprüche
- Ungeprüft und offen
- Verwandte Kapitel

## Inhalt

## 1. Wann überhaupt Tracking

Die Frage kommt vor jedem Pixel. Eine Dienstleisterseite braucht oft nur die Search Console und ein cookieloses Analytics (`13-…`). Ein Pixel und eine Server-Schnittstelle gehören auf Seiten,
die **bezahlten Verkehr** bekommen und deren Anzeigen auf Anfragen optimieren sollen. Dann ist die Messung der Sinn der Seite, und der Aufwand lohnt. Ohne Anzeigen ist Meta Pixel in der Regel
ein Datenschutzthema ohne Gegenwert.

## 2. Zwei Wege, eine Entscheidung

Ein Lead geht auf zwei Wegen an Meta: im Browser über den Pixel und vom Server über die Conversions API. Beide Wege tragen **dieselbe Einwilligung**.

| Zustand | Browser | Server |
|---|---|---|
| noch keine Entscheidung | nichts geladen, nichts gespeichert, kein Netzverkehr zu Meta oder Google | nichts |
| abgelehnt | nichts | kein personenbezogenes Ereignis (Standard: gar keines, siehe Abschnitt 7) |
| zugestimmt | Pixel lädt, Kennungen werden angelegt | Ereignis mit gehashten Merkmalen |
| widerrufen | Kennungen werden gelöscht, Skripte werden nicht mehr nachgeladen | nichts mehr |

**Serverseitig heißt nicht einwilligungsfrei.** Dass der Server die Entscheidung des Besuchers kennt, ist die Aufgabe des Formulars: es schickt `marketing_consent` mit. Der Server vertraut diesem Wert
bewusst, weil nur der Browser die Auswahl kennt (sie liegt in `localStorage`, nicht in der Datenbank). Ohne diese Kopplung hätte die Seite ein Banner und trotzdem Tracking ohne Rechtsgrundlage.

## 3. Die event_id ist die Klammer

Meta führt Browser- und Serverereignis nur zusammen, wenn beide dieselbe `event_id` tragen. Das Formular erzeugt sie **einmal je Bewerbung**, feuert sie am Pixel als `eventID` und schickt sie
im Payload an den Server, der sie unverändert an die Schnittstelle weiterreicht.

| Fehler | Wirkung |
|---|---|
| `eventID` fehlt am Pixel | jede Bewerbung zählt doppelt |
| `event_id` fehlt am Server | dasselbe |
| neue ID bei jedem Sendeversuch | ein Wiederholungsversuch nach einem Fehler zählt als zweite Bewerbung |
| ID wird beim ersten Versuch erzeugt und nicht aufbewahrt | dasselbe |

Eine ID bleibt bei einem Wiederholungsversuch **gleich**. Das prüft `pruefe-tracking.mjs` nur an der Anwesenheit, nicht an der Wiederverwendung; die Wiederverwendung prüft ein Mensch.

## 4. Wann das Lead-Ereignis feuert

Erst wenn der Server die Anfrage gespeichert hat und der Besucher die Bestätigung sieht, nicht beim Klick auf „Absenden". Ein Klick, der an der Validierung scheitert, ist keine Bewerbung, und eine
Conversion, die nie stattfand, verschlechtert die Optimierung der Kampagne. Bei einer **Dublette** (gleiche Mail oder Telefonnummer in den letzten 30 Tagen) bleibt das Ereignis aus, auf beiden Wegen:
die Antwort der Route trägt `duplicate: true`, und der Browser feuert dann nichts. Die Anfrage selbst wird trotzdem gespeichert, weil die Historie zählt.

## 5. Kennungen: ohne sie findet das Ereignis niemanden

Drei Kennungen entscheiden, ob Meta ein Ereignis einem Klick zuordnen kann. Fehlen sie, kommt es an und zählt als Conversion ohne Klickbezug.

| Kennung | Herkunft | Falle |
|---|---|---|
| `_fbp` | setzt sonst nur der Pixel | bei geblocktem Pixel fehlt sie genau am Serverereignis, das trotzdem rausgeht |
| `_fbc` | wird aus dem `fbclid` der Anzeigenadresse gebildet | fehlt regelmäßig, weil der Pixel erst nach der Zustimmung lädt und die Adresse dann schon geladen ist |
| `external_id` | eigene, gleichbleibende Besucherkennung in `localStorage` | der Rohwert muss auf beiden Wegen derselbe sein, der Browser hasht ihn selbst, der Server hasht denselben |

Vier Regeln dazu:

1. **Nichts davon entsteht vor der Einwilligung.** Auch das `fbclid` wird nicht auf Vorrat gespeichert (§ 25 TDDDG). Es bleibt in der Adresse und im Arbeitsspeicher.
2. **Die Kennungen werden vor dem Pixel angelegt.** `fbevents.js` übernimmt vorhandene Cookies, statt eigene zu schreiben; sonst lägen zwei gleichnamige nebeneinander, und welche gelesen wird, ist Zufall.
3. **Cookie-Domain eine Ebene über dem Host**, wie Meta es selbst tut. Das gilt für `.de`, `.at`, `.ch`. Bei Endungen wie `.co.uk` stimmt die Faustformel nicht.
4. **Widerruf löscht die Kennungen.** Eine Kennung, die nach dem Widerspruch auf dem Gerät liegen bleibt, ist eine Speicherung ohne Rechtsgrundlage. Für Google Analytics wird über das Präfix `_ga` und `_gid`
   gelöscht, weil der Name von der Property abhängt.

**Format der Merkmale:** Meta normalisiert nichts nach. Ein Telefon steht als reine Ziffern mit Ländervorwahl ohne führende Null und ohne Plus („0151 234 56 78" wird „491512345678"), ein Name
klein geschrieben, eine Mail klein geschrieben, alles SHA-256-gehasht. Ein falsches Format hasht sauber durch und findet nie einen Treffer, **ohne dass irgendwo eine Fehlermeldung kommt.**
Ort, Postleitzahl und Land werden nicht mitgeschickt, wenn das Formular dafür keine verlässlichen Werte liefert: ein geratenes „de" senkt die Trefferquote, statt sie zu heben.

## 6. Die Herkunft gehört in die eigene Datenbank

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content` und `fbclid` werden bei **jeder** Anfrage in der eigenen Datenbank gespeichert, unabhängig von der Einwilligung: es geht dabei nichts an Dritte,
und die Herkunftszählung ist damit für alle Bewerbungen vollständig, auch für die, die abgelehnt haben und bei Meta gar nicht auftauchen. Dazu ein lesbares Feld `source`: `utm_source / utm_campaign`, sonst
„Meta Ad" bei vorhandenem `fbclid`, sonst „Direkt". Ohne die zweite Stufe ist jede Bewerbung aus einer nicht getaggten Anzeige „Direkt" und unsichtbar.

**Das ist die belastbare Zahl.** Wer wissen will, wie viele Bewerbungen aus welcher Anzeige kamen, nimmt diese Auswertung, nicht den Events Manager. Meta sieht nur die Eingewilligten und rechnet mit
eigener Zuordnung. Wer die beiden Zahlen verwechselt, sucht den Fehler an der falschen Stelle. Die UTM-Parameter gehören in das Creative der Anzeige (`url_tags`),
sonst bleibt die Herkunft leer.

Eine neue Spalte kommt nicht in die feste Feldliste des INSERT, sondern in eine **Optional-Liste**: fehlt die Spalte, weil die Migration nicht lief, wird sie weggelassen, statt den INSERT scheitern zu lassen.
Ein vergessener Migrationslauf darf keine Anfrage kosten, er kostet nur die Herkunft.

## 7. Zählmeldung ohne Einwilligung: eine Option, kein Standard

Das Projekt Gewerbestrom meldet bei Ablehnung an Meta nur noch, **dass** eine Bewerbung einging: ein Ereignis ohne IP, User Agent, Name, Mail, Telefon, Kennungen und ohne die Query der Adresse, nur mit dem
gehashten Land, weil Metas Schnittstelle mindestens einen Personenparameter verlangt. Das Ereignis lässt sich keiner Kampagne zuordnen. Es war dort eine **Kundenentscheidung** und ist über eine
Variable abschaltbar.

**In diesem Plugin ist die Meldung standardmäßig aus** (`META_ANON_SIGNAL=on` schaltet sie ein). Ob sie ohne Einwilligung zulässig ist, ist eine rechtliche Frage, die dieses Repository nicht beantwortet, und sie
braucht einen Absatz in der Datenschutzerklärung. Der Agent schaltet sie nie von sich aus ein.

## 8. Ein Pixel, zwei Kampagnen

Ein Pixel gehört zur Domain, nicht zur Kampagne. Ein zweiter Pixel würde die Signalhistorie zerteilen und die Zuordnung bei Besuchern zerlegen, die beide Seiten sehen. Getrennt wird auf der Ebene des
Ereignisses: beide Seiten feuern `Lead`, `content_name` und die Adresse unterscheiden sie, und zwei **Custom Conversions** (Regel auf die Adresse: enthält `/seite-a`, enthält nicht `/seite-a`) lassen die
Anzeigengruppen auf ihr eigenes Ziel optimieren.

Drei Fallen aus dem Projekt:

* `pixel_id` und `custom_conversion_id` **zusammen** in `promoted_object` weist Meta ab (laut Projektdokumentation). Bei einer Custom Conversion steht dort nur die `custom_conversion_id`.
* **Ein laufendes Optimierungsziel nicht nebenbei ändern.** Ein Wechsel setzt die Lernphase zurück. Das ist eine Entscheidung für einen ruhigen Moment und gehört dem Kunden.
* Eine zweite Conversion belegt einen der **acht priorisierten Ereignisplätze** der Domain für iOS (Aggregated Event Measurement). Wird sie nicht priorisiert, entscheidet Meta die Reihenfolge selbst.

## 9. Testen, ohne die Zahlen zu verfälschen

| Regel | Grund |
|---|---|
| Der Testcode (`META_TEST_EVENT_CODE`) wirkt nur bei einem Aufruf mit `?wg_test=1` | wäre er global aktiv, gingen alle echten Anfragen in den Testkanal und zählten nirgends, **ohne dass es auffiele** |
| Das Log nennt jeden Ausgang: gesendet mit `events_received` und `fbtrace_id`, abgelehnt mit Status und Text von Meta, übersprungen mit Grund | vorher sahen „gesendet" und „nicht konfiguriert" im Log gleich aus, nämlich nach nichts |
| Secrets greifen bei Cloudflare Pages erst mit dem **nächsten Deployment** | ein frisch gesetztes Secret wirkt sonst scheinbar nicht |
| Die Zeitzone des Werbekontos ist fest und nachträglich nicht änderbar | beim Abgleich von Insights mit der eigenen Datenbank ein Tag, der abweicht, ist kein Fehler |

## 10. Datenschutzerklärung und Dienstekatalog

Pixel **und** Schnittstelle stehen in der Datenschutzerklärung in einem Atemzug, ebenso die drei Kennungen mit ihrer Laufzeit (90 Tage), die Herkunftsspeicherung in der eigenen Datenbank und, falls aktiv, die
Zählmeldung. Ändert sich eine serverseitige Prüfung, zieht dieser Abschnitt mit. Steht ein Dienst im Code und nicht im Text, ist die Seite nicht fertig (`consent-und-dienste.md`). Eigentümer der Konten
(Meta Business, Pixel, Analytics-Property) ist der Kunde, nicht die Agentur.

## 11. Prüfen

1. `node scripts/pruefe-tracking.mjs`: Tracker ohne Parkung, Pixel und Schnittstelle ohne Einwilligungsbezug, fehlende `event_id`, Token hinter `PUBLIC_`, Testcode ohne Schalter, Datenschutz ohne Nennung.
2. Von Hand, mit `playwright-cli` (`../../agentur-website-builder/references/browser-pruefung-mit-playwright-cli.md`): Seite laden, **vor jedem Klick** Cookies, `localStorage` und Anfragen ansehen
   (kein Verkehr zu `connect.facebook.net`, `googletagmanager.com`, `graph.facebook.com`); „Ablehnen" und wiederholen; „Zustimmen": Pixel lädt, drei Kennungen im erwarteten Format; Formular absenden:
   **genau ein** Browserereignis, ein Serverereignis, gleiche `event_id`; Widerruf: Kennungen weg.
3. Im Testkanal des Events Managers: das Ereignis steht mit dem Vermerk „dedupliziert".

## 12. Entschiedene Widersprüche

| Im Projekt Gewerbestrom | In diesem Plugin | Grund |
|---|---|---|
| Zählmeldung ohne Einwilligung standardmäßig an (Kundenwunsch) | standardmäßig **aus** | Eine Voreinstellung der Agentur ist keine Entscheidung eines Kunden, und die Rechtsfrage ist offen (Abschnitt 7) |
| UTM-Parameter in `sessionStorage` über mehrere Seiten | im Arbeitsspeicher | ohne Einwilligung nichts auf dem Gerät ablegen; wer sie über Seiten tragen muss, entscheidet das bewusst |
| Pixel-ID und GA-ID fest im HTML einer statischen Seite | in Umgebungsvariablen | Test und Livegang ohne Eingriff in den Quelltext. Bei einer Seite ohne Build ist die feste ID in einer `window`-Zeile ein Hinweis, kein Fehler |
| Analytics über `gtag`, Skript erst nach Einwilligung | übernommen (Consent Mode Basic) | entspricht `consent-und-dienste.md`: vor der Entscheidung kein Skript |
| Token der Schnittstelle in der Abfragezeichenfolge der Adresse | übernommen, weil bewährt | ein Wechsel in den Anfragekörper ist ungeprüft; das Log schreibt nie die Adresse, nur den Text der Antwort |
| Dublette bleibt ohne Ereignis | übernommen | eine zweite Meldung derselben Bewerbung verfälscht die Optimierung |

## Ungeprüft und offen

* Kein Evalfall zu diesem Kapitel (`evals/tracking-nur-nach-einwilligung` ist angelegt, **nicht gelaufen**). Das Δ ist eine Vermutung.
* Die Vorlagen `assets/tracking/` sind aus dem Projektcode abgeleitet und mit dem TypeScript-Compiler auf Typen geprüft (strikt, ohne Fehler). Sie sind **nie gegen Meta, einen Browser oder eine
  Cloudflare-Umgebung gelaufen.** Die Graph-Version `v21.0` ist die des Projekts und kann veraltet sein.
* Alle Aussagen über das Verhalten von Meta (Deduplizierung über `event_id`, Pflicht zu mindestens einem Personenparameter, `pixel_id` plus `custom_conversion_id`, acht Ereignisplätze) stammen aus der
  Dokumentation des Projekts, nicht aus einer neuen Prüfung gegen Meta.
* **Der rechtliche Teil** (Einwilligung für die Server-Schnittstelle, Zählmeldung, Laufzeit der Kennungen, Wortlaut der Datenschutzerklärung) ist eigene Zusammenstellung und nicht anwaltlich geprüft.
* `pruefe-tracking.mjs` liest mit regulären Ausdrücken. Es erkennt keinen Pixel, der über einen Tag Manager eingebunden wird, und keine Server-Schnittstelle, die ein anderer Dienst als Meta anbietet
  (TikTok, LinkedIn, Google Enhanced Conversions). Für diese gibt es keine Vorlage.
* Google Analytics ist nur als Skript nach Einwilligung beschrieben, nicht als Server-Messung.

## Verwandte Kapitel

* Was gemessen wird, Reviews, A/B-Tests: `13-messung-optimierung.md`
* Einwilligung, Auftragsverarbeitung, Datenschutzerklärung: `07-recht-dsgvo.md`, `../../agentur-website-builder/references/consent-und-dienste.md`
* Sicherheit der Zugangsschlüssel und Formularrouten: `52-sicherheit-der-kundenseite.md`
* Formular, Turnstile, Mail: `../../agentur-website-builder/references/formulare-und-resend.md`
* Ablauf und Vorlagen: `../../agentur-website-builder/references/tracking-einbauen.md`
