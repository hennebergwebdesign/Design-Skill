# Intake und Entscheidungen

## Zwei Projektarten

Der wichtigste Unterschied im ganzen Skill. Alles Weitere hängt daran.

### Homepage

Unternehmensauftritt, mehrere Seiten oder Onepager, Ziel ist Sichtbarkeit, Vertrauen und
Kontaktanfragen. Kontaktformular versendet per Resend, es wird **nichts gespeichert**, kein
Dashboard, keine Datenbank. Das ist der Standardfall. Playbook:
`../../webdesign-conversion/playbooks/homepage.md`.

### Leadseite mit Leadsystem

Landingpage, deren Zweck das Einsammeln von Leads ist, typischerweise Recruiting,
Dienstleistungsanfragen oder Kampagnenseiten. Nur wenn der Nutzer das ausdrücklich sagt oder
das Projekt offensichtlich darauf hinausläuft, und dann **nachfragen, nicht annehmen**:

> Soll diese Seite ein Leadsystem bekommen, also Speicherung der Anfragen und ein
> passwortgeschütztes Dashboard?

Bei Ja gilt zusätzlich `leadsystem-dashboard.md`. Ohne ausdrückliche Bestätigung wird kein
Dashboard gebaut. Ein Dashboard, das niemand bestellt hat, ist ein Datenschutzrisiko und
keine Zusatzleistung. Playbook: `../../webdesign-conversion/playbooks/landingpage.md`, bei
Bewerbern zusätzlich `recruiting-funnel.md` samt AGG und Bewerberdatenschutz.

## Neubau oder Überarbeitung

Bei einer Überarbeitung liefert der Nutzer den Link der alten Seite. Dann immer:

1. Alte Seite inventarisieren: Seiten, URLs, Leistungen, Texte, Kontaktdaten,
   Öffnungszeiten, Zertifikate, Referenzen. Werkzeug siehe unten.
2. Marke und CI auslesen, bevor etwas Neues entworfen wird: Logo, Farben, Schrift,
   Formsprache. Verfahren in
   `../../webdesign-conversion/references/20-markenextraktion-bestandsseite.md`. Ergebnis in
   `marke-brief.md` Abschnitt 7 und `marke.json` unter `herkunft`.
3. Impressum und Datenschutzerklärung der alten Seite übernehmen und an die neue Technik
   anpassen. Dienste, die es nicht mehr gibt, streichen. Neue Dienste ergänzen, siehe
   `consent-und-dienste.md`.
4. Fehlende Pflichtangaben nicht erfinden, sondern als `[[FEHLT: Handelsregisternummer]]`
   einsetzen und im Abschlussbericht auflisten, damit der Kunde darauf angesprochen werden
   kann.
5. Bestehende URLs erfassen und Weiterleitungen planen, siehe
   `../../webdesign-conversion/references/05-seo-sichtbarkeit.md` und
   `08-pflichtseiten-technik.md`.

### Werkzeug: relaunch-inventory.mjs

```bash
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de --max 80 --verzeichnis .relaunch-inventory
```

Das Skript liest die Sitemap, folgt internen Links und legt in `.relaunch-inventory/` ab:

| Datei | Inhalt |
|---|---|
| `inventar.json` | je Seite URL, Titel, Description, H1, Wortzahl, Bilder, Statuscode |
| `inventar.md` | dieselbe Liste als lesbare Tabelle für das Konzept |
| `seiten/*.txt` | der extrahierte Textinhalt je Seite, Grundlage für die Copyübernahme |
| `rechtstexte/` | erkannte Kandidaten für Impressum, Datenschutz, AGB, Widerruf |
| `redirects-entwurf.txt` | Vorschlag für `public/_redirects`, jede Zeile geprüft werden muss |

Mit gesetztem `FIRECRAWL_API_KEY` nutzt das Skript die Firecrawl API und kommt auch an
Seiten, die clientseitig rendern. Ohne Schlüssel läuft es mit dem eingebauten Fetch-Crawler
weiter, das reicht für die üblichen WordPress- und Baukastenseiten.

`.relaunch-inventory/` gehört in die `.gitignore` des Kundenprojekts. Es ist Arbeitsmaterial,
kein Liefergegenstand, und enthält fremde Texte und Bildadressen.

Der Entwurf in `redirects-entwurf.txt` wird nie ungeprüft übernommen. Jede alte URL bekommt
ein inhaltlich passendes Ziel. Pauschal alles auf die Startseite zu leiten wertet Google als
Soft 404 und kostet genau die Rankings, die der Relaunch erhalten soll.

## Bilder

Immer `public/images/` anlegen, mit Unterordnern nach Sektion oder Seite. Ablauf:

* Bilder schon im Repo vorhanden: passend einsetzen, keine Dopplung erzwingen.
* Zu wenige Bilder: die vorhandenen an den wirkungsvollsten Stellen einsetzen, den Rest mit
  Platzhaltern füllen, statt dasselbe Bild dreimal zu zeigen.
* Keine Bilder: durchgehend Platzhalter, aber im richtigen Seitenverhältnis und mit
  sinnvollem Alternativtext, damit später nur die Datei getauscht werden muss.

Platzhalter als lokal generiertes SVG mit sichtbarem Dateinamen und Zielmaß, nie externe
Dienste wie placehold.co, weil das eine Verbindung zu einem Drittserver aufbaut und damit
einwilligungspflichtig wäre.

Immer `public/images/BILDER.md` pflegen. Die Datei führt je Motiv Herkunft, Rechteinhaber,
Freigabestatus, Verwendung und Besonderheiten wie eingebrannten Text oder KI-Erzeugung, und
je fehlendem Bild eine Zeile mit Dateiname, Zweck, Seitenverhältnis und Mindestbreite. Vor
dem Livegang ist sie die Checkliste für die Bildrechte. Diese Liste im Abschlussbericht
verlinken.

## Fragen, die immer geklärt sein müssen

Wenn sich das nicht aus dem Auftrag oder den Dateien ergibt, fragen:

1. Homepage oder Leadseite mit Leadsystem
2. primäre Conversion, also die eine Aktion, an der die Seite gemessen wird
3. Zielgruppe, Region und Sprache
4. Tonalität und Ansprache, du oder Sie
5. welche Seiten gebraucht werden
6. wie verbindlich der Designentwurf ist
7. wer die Rechtstexte liefert
8. Domain, und ob sie schon läuft

Die vier Strategiefragen aus
`../../webdesign-conversion/references/01-strategie-positionierung.md` (Zielgruppe,
größtes Problem, Abgrenzung, Vertrauensgrund) sind damit nicht abgedeckt und stehen davor.
Ohne ihre Antworten wird nicht gestaltet.

## Fragen, die nur bei Auslöser kommen

| Auslöser | Frage |
| --- | --- |
| Nutzer erwähnt Leads, Bewerber, Anfragenverwaltung | Leadspeicher und Dashboard, D1 oder vorhandener Supabase Account |
| Nutzer erwähnt Termine oder Beratungsgespräche | Cal.com oder Calendly, eingebettet oder verlinkt |
| Landingpage für Kampagne | Meta Pixel, Conversions API, GTM Container ID |
| Newsletter oder Leadmagnet | Double Opt in nötig, welcher Anbieter |
| mehrere Sprachen im Material | Mehrsprachigkeit und Sprachumschaltung |
| Blog, Referenzen, Stellenanzeigen | Content Collections oder CMS |
| Standorte, Filialen | Kartenintegration, erst nach Einwilligung laden |
| bestehende Domain mit Rankings | Weiterleitungskonzept, Zugriff auf Search Console |
| Stellenanzeige oder Karriereseite | Bewerberdatenschutz, Löschfrist, JobPosting-Auszeichnung |

## Was ohne Rückfrage entschieden wird

Nicht fragen, einfach ordentlich machen: Komponentenstruktur, semantisches Markup,
Breakpoints, Lade und Fehlerzustände, Ordnerstruktur, Bildformate und Größen,
Alternativtexte, Fokuszustände, Namensgebung von Umgebungsvariablen, Teststruktur,
Commitnachrichten.
