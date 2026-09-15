# Leadsystem und Dashboard

Nur bauen, wenn im Intake ausdrücklich bestätigt. Ohne Bestätigung versendet das Formular
nur, siehe `formulare-und-resend.md`.

## Speicherort

Standard ist **Cloudflare D1**, weil Hosting, Datenbank und Serverrouten damit an einem Ort
liegen und keine weitere Auftragsverarbeitung entsteht.

**Supabase** nur, wenn der Kunde bereits einen Account hat. Dann liefert der Nutzer die
Zugangsdaten als Umgebungsvariablen, und in der Datenschutzerklärung wird Supabase als
Auftragsverarbeiter genannt, inklusive Serverstandort. Nie beide Systeme parallel für
dieselben Daten, sonst gibt es zwei Wahrheiten und doppelte Löschpflichten.

## Schema

```sql
CREATE TABLE IF NOT EXISTS leads (
  id            TEXT PRIMARY KEY,
  erstellt_am   TEXT NOT NULL,
  aktualisiert  TEXT NOT NULL,
  quelle        TEXT,              -- Seitenpfad
  kampagne      TEXT,              -- utm_campaign
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  telefon       TEXT,
  nachricht     TEXT,
  status        TEXT NOT NULL DEFAULT 'neu',   -- neu, kontaktiert, qualifiziert, gewonnen, verloren
  notiz         TEXT,
  zustaendig    TEXT,
  einwilligung  INTEGER NOT NULL DEFAULT 0,
  loeschen_ab   TEXT                            -- Aufbewahrungsfrist
);
CREATE INDEX IF NOT EXISTS idx_leads_erstellt ON leads (erstellt_am DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status  ON leads (status);
```

Migrationen als nummerierte SQL Dateien in `migrations/`, damit der Stand nachvollziehbar
bleibt. Keine IP Adressen und keine User Agents speichern, sie werden für den Zweck nicht
gebraucht.

Bei Bewerberdaten gilt zusätzlich der eigene Rahmen aus
`../../webdesign-conversion/references/19-recruiting-funnel.md`: andere Rechtsgrundlage,
kürzere Löschfrist, AGG-Dokumentation, getrennte Datenschutzerklärung. Vorlage:
`../../webdesign-conversion/assets/vorlagen/datenschutz-bewerber.md`.

## Reihenfolge im Formular

Erst speichern, dann Mails versenden. Schlägt der Versand fehl, ist der Lead trotzdem da.
Schlägt das Speichern fehl, trotzdem versenden und den Fehler protokollieren, damit keine
Anfrage verloren geht.

## Dashboard

Unter `/dashboard`, `export const prerender = false`, komplett aus der
Suchmaschinenindexierung ausgenommen über `robots.txt`, die Sitemap-Filterregel und
`<meta name="robots" content="noindex, nofollow">`. Alle drei, nicht nur eine.

Funktionsumfang, bewusst schlank:

* Liste der Leads, neueste zuerst, mit Seitenblättern
* Suche über Name, Mail und Nachricht
* Filter nach Status und Zeitraum
* Detailansicht mit allen Feldern
* Status ändern, Notiz und Zuständigkeit setzen
* CSV Export der gefilterten Auswahl
* Löschen eines Leads mit Rückfrage

Keine Auswertungsgrafiken, kein Rollenkonzept, keine Massenaktionen, außer der Nutzer
verlangt es. Ein Dashboard, das niemand nutzt, ist Wartungslast.

Das Dashboard ist eine Oberfläche wie jede andere: Tokens statt roher Werte, sichtbarer
Fokus, Tastaturbedienung, Lade- und Leerzustände. Es sieht nur deshalb oft lieblos aus, weil
es niemand von außen sieht. Der Kunde sieht es täglich.

## Anmeldung

Standard ist eine schlanke eigene Anmeldung, weil sie ohne weiteren Dienst auskommt:

* Zugangsdaten als Cloudflare Secrets, Passwort nur als Hash, nie im Klartext im Repo
* Sitzung über ein signiertes Cookie mit `HttpOnly`, `Secure`, `SameSite=Strict`, Laufzeit
  acht Stunden
* Wartezeit nach mehreren Fehlversuchen
* Abmelden vorhanden
* Middleware schützt `/dashboard` und alle zugehörigen API Routen. Der Schutz gehört an die
  Route, nicht an die Anzeige

Nutzt der Kunde Supabase, wird stattdessen Supabase Auth verwendet. Wenn der Nutzer
Cloudflare Access bevorzugt, ist das ebenfalls sauber, dann entfällt die eigene Anmeldung.

Ein Dashboard ohne geprüften Schutz an der API-Route ist offen. Die Prüfung gehört in die
Abnahme: geschützte Route ohne Sitzung aufrufen und sicherstellen, dass sie nichts
zurückgibt, nicht nur, dass die Seite leer aussieht.

## Datenschutz

Bei Speicherung von Leads ändert sich die Rechtslage gegenüber einem reinen
Versandformular. Immer mit umsetzen:

* Hinweis im Formular, dass die Anfrage gespeichert wird, und wofür
* Aufbewahrungsfrist festlegen, Vorschlag zwölf Monate nach letztem Kontakt, `loeschen_ab`
  beim Anlegen setzen
* Löschroutine als geplanter Cloudflare Auftrag oder mindestens als dokumentierter manueller
  Vorgang
* Datenschutzerklärung um Zweck, Rechtsgrundlage, Speicherdauer und Empfänger ergänzen,
  siehe `../../webdesign-conversion/references/07-recht-dsgvo.md`
* im Abschlussbericht darauf hinweisen, dass der Kunde für diese Verarbeitung verantwortlich
  ist und ein Auftragsverarbeitungsvertrag mit der Agentur nötig sein kann

Das ist Vorbereitung, keine Rechtsberatung. Die Prüfung bleibt beim Kunden.
