# Formulare, Resend und Turnstile

Die Conversionregeln für das Formular stehen in
`../../webdesign-conversion/references/06-conversion-architektur.md`: höchstens drei bis
fünf Felder, je Feld ein Satz wozu, vier sichtbare Zustände, Bestätigung statt grüner Haken.
Dieses Kapitel regelt die technische Umsetzung im Agenturstack.

## Grundsatz

Versand und Speicherung sind zwei getrennte Entscheidungen. Ein Kontaktformular versendet
standardmäßig nur. Gespeichert wird ausschließlich bei einem bestätigten Leadsystem, siehe
`leadsystem-dashboard.md`.

Jede Anfrage löst zwei Mails aus:

1. **Interne Benachrichtigung** an den Kunden, mit allen Feldern, Zeitstempel und der Seite,
   von der die Anfrage kam.
2. **Bestätigung an den Interessenten**, im Branding des Kunden, mit Logo, Markenfarbe und
   einem Satz dazu, wann er mit einer Antwort rechnen kann. Diese Mail ist Standard, nicht
   Zusatz.

## Serverroute

`src/pages/api/kontakt.ts` mit `export const prerender = false`. Ablauf in fester
Reihenfolge:

1. Umgebungsvariablen prüfen, fehlt eine, verständlicher Fehler mit alternativem Kontaktweg
2. Origin prüfen, fremde Herkunft wird abgewiesen
3. Honigtopffeld prüfen, ist es gefüllt, mit Erfolg antworten und nichts tun
4. Zeitfeld prüfen, Absenden unter zwei Sekunden nach dem Laden verwerfen
5. Turnstile Token serverseitig prüfen
6. Eingaben serverseitig validieren, unabhängig von der Prüfung im Browser
7. Rate Limit prüfen
8. nur bei bestätigtem Leadsystem speichern
9. Mails versenden
10. Antwort mit klarer Statusangabe

Die geprüfte Vorlage liegt in `../assets/forms/kontakt-route.ts`, das Mailtemplate in
`../assets/forms/mail-template.ts`.

Astros eingebauter Schutz gegen Cross-Site-Anfragen greift in Cloudflare Pages Functions
nicht. Die Origin-Prüfung in der Vorlage ersetzt ihn und wird nie entfernt.

## Honigtopf

Das versteckte Feld heißt in der Vorlage `webadresse` und ist bewusst **nicht** `firma`. Ein
Honigtopf, der so heißt wie ein echtes optionales Feld, verwirft irgendwann eine echte
Anfrage, und niemand merkt es, weil die Route mit Erfolg antwortet.

```html
<div class="hp" aria-hidden="true">
  <label for="webadresse">Webadresse</label>
  <input id="webadresse" name="webadresse" type="text" tabindex="-1" autocomplete="off" />
</div>
<input type="hidden" name="ts" value="" data-zeitfeld />
```

```css
/* nicht display:none, sonst ignorieren manche Bots das Feld */
.hp { position: absolute; inset-inline-start: -9999px; width: 1px; height: 1px; overflow: hidden; }
```

Das Zeitfeld wird beim Laden per Skript mit `Date.now()` gefüllt. Ohne JavaScript bleibt es
leer, und die Route lässt die Anfrage dann durch, statt Besucher ohne JavaScript
auszusperren.

## Validierung

Serverseitig immer, auch wenn der Browser bereits prüft. Ein abgesendetes Formular kann von
überall kommen.

* Pflichtfelder vorhanden und nicht nur Leerzeichen
* E-Mail auf plausibles Format, Länge begrenzen
* Telefonnummer, falls Pflicht, auf erlaubte Zeichen prüfen, nicht auf ein starres Format
* Freitext auf Länge begrenzen, etwa 5000 Zeichen
* Einwilligungshäkchen zur Datenschutzerklärung muss gesetzt sein
* alle Werte vor dem Einsetzen in HTML Mails maskieren

Fehler kommen feldbezogen zurück und werden am Feld angezeigt, mit `aria-describedby` und
`aria-invalid`, nicht als Sammelmeldung oben.

Zum Einwilligungshäkchen: In
`../../webdesign-conversion/references/06-conversion-architektur.md` steht es in der Spalte
"brauchst du nicht", mit dem Zusatz "außer wenn gesetzlich erforderlich". Bei einem
Kontaktformular mit Mailversand über einen Auftragsverarbeiter ist genau das der Fall. Das
Häkchen bleibt, unvorbelegt, mit Link auf die Datenschutzerklärung, und wird nicht als
optionales Conversionelement behandelt.

## Turnstile

Widget im Formular über `PUBLIC_TURNSTILE_SITE_KEY`, Prüfung des Tokens serverseitig gegen
`TURNSTILE_SECRET_KEY`. Turnstile ist ein Cloudflare Dienst und für den Betrieb des
Formulars erforderlich, läuft also in der Kategorie Notwendig und wird nicht durch das
Consent Banner blockiert. In der Datenschutzerklärung wird er trotzdem genannt.

Fehlt `TURNSTILE_SECRET_KEY`, prüft die Vorlage nur in der lokalen Entwicklung nicht weiter.
In der Produktion wird die Anfrage abgewiesen und der Fehler protokolliert. Ein
Spamschutz, der bei fehlender Konfiguration stillschweigend durchlässt, ist kein Spamschutz.

## Rate Limit

Einfach und wirksam über Cloudflare KV, Binding `RATE_LIMIT`: Schlüssel aus der IP,
höchstens fünf Anfragen in zehn Minuten. Bei Überschreitung Status 429 und eine ruhige
Meldung, keine Fehlerseite.

## Zustände im Frontend

Alle vier müssen tatsächlich existieren und getestet sein:

* Ruhe
* Senden läuft, Schaltfläche deaktiviert, Beschriftung wechselt, doppeltes Absenden
  ausgeschlossen
* Erfolg, Formular wird durch eine Bestätigung ersetzt, die den nächsten Schritt nennt
* Fehler, verständliche Meldung plus alternativer Kontaktweg mit Telefonnummer oder
  Mailadresse, damit eine Anfrage nicht verloren geht

Bei Erfolg das Ereignis für Tracking auslösen, aber nur, wenn eine Einwilligung für
Marketing vorliegt.

Das Formular funktioniert auch ohne JavaScript: `<form method="post" action="/api/kontakt">`
als Grundlage, die Zustandslogik legt sich darüber. Ohne diesen Weg verliert die Seite jede
Anfrage von Besuchern mit blockiertem Skript.

## Datenschutz im Formular

* Häkchen zur Datenschutzerklärung mit Verlinkung, unvorbelegt
* nur Felder abfragen, die gebraucht werden. Jedes zusätzliche Pflichtfeld kostet Anfragen
  und muss begründet sein
* keine Speicherung ohne Leadsystem, das gehört auch so in die Datenschutzerklärung
* keine IP-Adresse und kein User Agent in der Mail oder im Speicher, sie werden für den
  Zweck nicht gebraucht. Die IP im Rate Limit ist ein flüchtiger Schlüssel mit Ablauf, kein
  gespeichertes Merkmal
* Absenderdomain bei Resend verifizieren, sonst landen die Bestätigungen im Spam

## Terminbuchung

Nur wenn im Intake bestätigt. Cal.com oder Calendly, je nach Kunde. Das Widget wird erst
nach Einwilligung der Kategorie Externe Medien geladen, davor steht eine Platzhalterfläche
mit Erklärung, einer Schaltfläche zum Laden und einem direkten Link zum Buchungssystem.
Siehe `consent-und-dienste.md`.
