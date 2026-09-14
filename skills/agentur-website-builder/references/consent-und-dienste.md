# Consent und eingesetzte Dienste

Die rechtlichen Anforderungen an Einwilligung, Widerruf und Blockierung stehen in
`../../webdesign-conversion/references/07-recht-dsgvo.md`, der dokumentierte
Kategorienschnitt in `../../webdesign-conversion/assets/vorlagen/consent-muster.md`. Dieses
Kapitel regelt die Agenturentscheidungen darüber hinaus und verweist auf die einsatzfertigen
Dateien.

## Eigenbau statt Einwilligungsdienst

Der Consent Mechanismus wird selbst gebaut. Kein Cookiebot, kein Usercentrics, kein
CookieYes. Gründe: volle Kontrolle über das Aussehen, keine Fremdskripte, keine laufenden
Kosten, kein Ladeblocker vor dem ersten Bild.

Kopiervorlagen:

| Datei | Ziel im Kundenprojekt |
|---|---|
| `../assets/consent/consent.ts` | `src/scripts/consent.ts` |
| `../assets/consent/ConsentBanner.astro` | `src/components/ConsentBanner.astro` |

Beide an Branding, Projektschlüssel und tatsächlich eingesetzte Dienste anpassen.

## Aussehen

* **Nie ein Keks als Symbol.** Kein Cookie Emoji, keine Krümel, keine Keksgrafik. Das Symbol
  wird aus dem Branding des Kunden abgeleitet, meist ein reduziertes Zeichen aus dem Logo,
  ein Schieberegler oder gar kein Symbol.
* Banner nutzt die Tokens des Projekts, nicht ein Fremddesign. Kein roher Farbwert, kein
  fester Abstand.
* Ablehnen ist auf der ersten Ebene genauso leicht erreichbar wie Zustimmen, gleiche Größe,
  gleiche Sichtbarkeit. Ein optisch verstecktes Ablehnen ist der häufigste Abmahngrund.
* Dritte Schaltfläche für Einstellungen mit den Kategorien.
* Kein Sperrbildschirm über der ganzen Seite, wenn die Seite auch ohne Einwilligung nutzbar
  ist.

## Kategorien

Fünf Kategorien insgesamt, davon vier wählbar:

| Kategorie | Verhalten |
| --- | --- |
| Notwendig | immer aktiv, nicht abwählbar, erscheint als Information statt als Schalter |
| Funktional und Präferenzen | vorab abgelehnt |
| Statistik | vorab abgelehnt |
| Marketing | vorab abgelehnt |
| Externe Medien | vorab abgelehnt |

Alle optionalen Kategorien starten abgelehnt. Kein Vorabhaken, kein Zustimmen durch
Weiterscrollen, kein Zustimmen durch Schließen.

**Wenn ein Projekt ausschließlich notwendige Technik nutzt, wird kein Banner angezeigt** und
auch kein Footerlink gesetzt. Ein Banner ohne Einwilligungsbedarf schadet nur der
Conversion. Dann bleibt lediglich der Hinweis in der Datenschutzerklärung.

Einwilligungsfrei im Agenturstack, weil serverseitig oder betriebsnotwendig: Cloudflare
Hosting, Turnstile, der Bewertungsabruf über die eigene Route, selbst gehostete Schriften,
der Mailversand über Resend nach Absenden des Formulars.

## Speicherung der Entscheidung

Im `localStorage` unter einem Projektschlüssel, mit Version und Zeitstempel:

```json
{ "version": 1, "zeit": "2026-08-23T10:00:00Z", "kategorien": { "funktional": false, "statistik": true, "marketing": false, "medien": false } }
```

Kein serverseitiges Einwilligungsprotokoll, außer der Kunde verlangt es. Ändert sich die
Liste der Dienste, wird die Version erhöht und erneut gefragt. Gültigkeit sechs Monate,
danach erneut fragen.

Im Footer immer ein Link **Cookie Einstellungen**, der das Banner erneut öffnet. Ohne diesen
Link ist der Widerruf nicht so leicht wie die Einwilligung.

Der Consent Manager wandelt geparkte Skripte nur in eine Richtung um, vom Text zum echten
Skript. Ein Widerruf entfernt kein bereits geladenes Skript aus der laufenden Seite. Nach
dem Speichern einer engeren Auswahl wird die Seite darum neu geladen. Das steht so auch in
der Vorlage.

## Google Consent Mode

Standardmäßig im Basic Modus. Der `default` Zustand gehört **vor** das GTM Skript in den
Seitenkopf, sonst feuert der Tag Manager vor der Entscheidung:

```js
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500,
});
```

Nach Zustimmung folgt `gtag('consent', 'update', ...)` mit den gewählten Kategorien, das
erledigt `consent.ts`. Meta Pixel nur auf Kampagnenseiten und ausschließlich in der
Kategorie Marketing.

## Dienstekatalog abgleichen

Vor dem Abschluss die tatsächlich eingebauten Dienste durchgehen und einzeln gegen die
Datenschutzerklärung prüfen: Hosting bei Cloudflare, Serverprotokolle, Kontaktformular,
Resend als Versanddienstleister, Turnstile, Google Places für Bewertungen, Schriften lokal
gehostet, gegebenenfalls GTM, GA4, Meta Pixel, Buchungssystem, Leadspeicherung, eingebettete
Inhalte.

**Steht ein Dienst im Code, aber nicht im Text, ist die Seite nicht fertig.** Umgekehrt
genauso: ein Dienst im Text, der nicht mehr eingebaut ist, gehört gestrichen.

Die Prüfung, die zählt, ist nicht die Liste, sondern das Netzwerkprotokoll: Seite ohne
Entscheidung laden, es darf null Anfragen an einen Drittanbieter geben.

## Rechtstexte

Verantwortliche Stelle ist immer der Kunde, nicht die Agentur.

* **Überarbeitung:** Impressum und Datenschutzerklärung der alten Seite übernehmen, dann an
  die neue Technik anpassen. Dienste streichen, die es nicht mehr gibt, neue ergänzen. Das
  Inventar aus `relaunch-inventory.mjs` legt die Kandidaten in
  `.relaunch-inventory/rechtstexte/` ab.
* **Neubau:** aus den bestätigten Unternehmensdaten erzeugen, Vorlagen in
  `../../webdesign-conversion/assets/vorlagen/impressum.md` und `datenschutz.md`, deutlich
  als ungeprüften Entwurf gekennzeichnet.
* **Fehlende Angaben** nie erfinden. Format
  `[[FEHLT: Umsatzsteuer Identifikationsnummer]]`, außerdem in die Liste im
  Abschlussbericht.

Die Pflichtangaben im Impressum, die Pflichten bei Verkauf, Newsletter und Buchungen sowie
die Barrierefreiheitserklärung stehen vollständig in
`../../webdesign-conversion/references/07-recht-dsgvo.md`.

**Grenze:** Dieser Skill bereitet Rechtstexte vor und macht die Technik anschlussfähig. Er
leistet keine Rechtsberatung und garantiert keine Rechtskonformität. Das gehört in jeden
Abschlussbericht, in einem Satz, ohne Beschwörungsformel.
