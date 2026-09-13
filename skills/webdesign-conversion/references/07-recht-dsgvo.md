# Recht: Impressum, Datenschutz, Consent

> **Kein Rechtsrat.** Dieser Abschnitt und die Vorlagen in `../assets/vorlagen/` sind
> Arbeitsgrundlagen und Entwürfe. Sie ersetzen keine anwaltliche Prüfung. Jeder Rechtstext
> geht vor dem Livegang zur Prüfung; das gehört so in die Übergabe an den Kunden.

Grundregel für die Arbeit: **Lücken bleiben sichtbar.** Jede Angabe, die nicht bestätigt
ist, steht als `[[FEHLT: …]]` oder `[[BESTÄTIGEN: …]]` im Text und in der Liste offener
Punkte. Eine erfundene Registernummer ist schlimmer als eine leere.

## Impressum

**Rechtsgrundlage:** § 5 DDG (seit Mai 2024 Nachfolger von § 5 TMG), bei journalistisch-
redaktionellen Inhalten zusätzlich § 18 MStV.

**Pflichtangaben:**

| Angabe | Hinweis |
|---|---|
| Name und Anschrift | vollständige ladungsfähige Anschrift, kein Postfach |
| Rechtsform | GmbH, UG, GbR, e. K., Einzelunternehmen … |
| Vertretungsberechtigte | Geschäftsführer, Vorstand, Inhaber |
| Kontakt | E-Mail **und** ein zweiter schneller Weg (Telefon oder Kontaktformular) |
| Registereintrag | Registergericht und Registernummer, falls eingetragen |
| USt-IdNr. | nach § 27a UStG, falls vorhanden |
| Aufsichtsbehörde | bei erlaubnispflichtigen Tätigkeiten |
| Kammer, Berufsbezeichnung, berufsrechtliche Regelungen | bei reglementierten Berufen (Ärzte, Anwälte, Steuerberater, Architekten, Handwerk) mit Fundstelle |
| Verantwortlich nach § 18 Abs. 2 MStV | bei redaktionellen Inhalten, mit Anschrift |
| Streitschlichtung | Hinweis auf Bereitschaft oder Nichtbereitschaft zur Teilnahme (§ 36 VSBG) |

Hinweise zur Praxis:

- Die **OS-Plattform der EU wurde zum 20.07.2025 eingestellt.** Ein Link darauf ist
  veraltet; einige Muster tragen ihn noch. Die Angabe zur Teilnahmebereitschaft nach § 36
  VSBG bleibt davon unberührt.
- Das Impressum ist von **jeder Seite aus mit einem Klick** erreichbar und heißt „Impressum"
  — nicht „Legal" oder „Über uns".
- **Nicht** in die Sitemap aufnehmen, wenn es `noindex` trägt.
- Bildnachweise gehören nicht zwingend ins Impressum, aber irgendwohin — Lizenzbedingungen
  vieler Bildquellen verlangen sie.

Vorlage: `../assets/vorlagen/impressum.md`.

## Datenschutzerklärung

**Rechtsgrundlage:** Art. 13 DSGVO. Sie muss die tatsächlich eingesetzten Dienste
beschreiben — nicht ein Muster mit 40 Diensten, von denen 38 nicht laufen. Das ist der
häufigste Fehler in Generator-Texten und in der Sache eine Falschangabe.

**Aufbau, der sich bewährt hat:**

1. Verantwortliche Stelle (und Datenschutzbeauftragter, falls bestellt)
2. Hosting und Serverprotokolle (Logdaten, Zweck, Speicherdauer, Auftragsverarbeitung)
3. Kontaktformular (Felder, Zweck, Rechtsgrundlage, Empfänger, Speicherdauer)
4. Versanddienstleister (z. B. Resend, Brevo) — eigener Unterpunkt mit Serverstandort
5. Spamschutz (z. B. Cloudflare Turnstile) — Rechtsgrundlage berechtigtes Interesse
6. Schriften (lokal gehostet → kein Drittkontakt; das ist ausdrücklich zu erwähnen)
7. Karten, Videos, Einbettungen — jeweils mit Anbieter, Datenübermittlung, Einwilligung
8. Einwilligungsverwaltung (welches Tool, welche Kategorien, Speicherdauer, Widerruf)
9. Statistik und Marketing (Analytics, Pixel, Tag Manager) — nur mit Einwilligung
10. Rechte der betroffenen Person (Auskunft, Berichtigung, Löschung, Einschränkung,
    Datenübertragbarkeit, Widerspruch, Beschwerde bei der Aufsichtsbehörde)
11. Stand des Dokuments

Für jeden Dienst gehören in den Abschnitt: **Zweck**, **Rechtsgrundlage** (Art. 6 Abs. 1
lit. a/b/f), **Empfänger**, **Drittlandübermittlung** falls zutreffend, **Speicherdauer**.

Vorlage: `../assets/vorlagen/datenschutz.md`.

## Consent: was wirklich verlangt ist

**§ 25 TDDDG** (früher TTDSG) verlangt eine Einwilligung für jeden Zugriff auf
Endgeräte-Informationen, der nicht **unbedingt erforderlich** ist — unabhängig davon, ob
personenbezogene Daten verarbeitet werden. Das trifft auch `localStorage` und ähnliche
Speicher, nicht nur Cookies.

**Einwilligungsfrei sind** in der Regel: Session-Cookie für den Warenkorb, Spracheinstellung,
Sicherheits- und Lastverteilungsmechanismen, die Speicherung der Consent-Entscheidung selbst.

**Einwilligungspflichtig sind:** Analytics, Tag Manager, Werbepixel, eingebettete Videos,
Karten von Drittanbietern, extern geladene Schriften, A/B-Testing-Tools, Heatmaps.

### Anforderungen an das Banner

- **Ablehnen ist genauso einfach wie Zustimmen** — gleichrangig, auf derselben Ebene, in
  vergleichbarer Gestaltung. Ein grauer Textlink neben einem großen bunten Button ist nicht
  gleichrangig.
- **Keine Vorauswahl.** Alle nicht notwendigen Kategorien stehen auf aus.
- **Keine Nutzungssperre** („Cookie-Wall") ohne gleichwertige Alternative.
- **Widerruf jederzeit** und genauso leicht wie die Erteilung — ein dauerhaft erreichbarer
  Link „Cookie-Einstellungen" im Footer.
- **Granular:** Kategorien einzeln wählbar, nicht nur alles oder nichts.
- **Dokumentiert:** Zeitpunkt, Version und Umfang der Einwilligung werden gespeichert.
- **Tastaturbedienbar**, mit Fokusfalle, ohne die Seite unlesbar zu machen.

### Blockierung muss echt sein

Ein Banner, das nichts blockiert, ist wertlos — die Daten sind bereits geflossen, bevor
jemand klickt. Das Muster, das trägt:

```html
<!-- Skript wird erst nach Einwilligung zu einem echten Skript -->
<script type="text/plain" data-consent="statistik"
        data-src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXX"></script>

<!-- Einbettung bekommt ihre Quelle erst nach Einwilligung -->
<iframe data-consent="medien"
        data-consent-src="https://www.youtube-nocookie.com/embed/…" hidden></iframe>
```

Nach der Einwilligung ersetzt das Consent-Skript den Platzhalter durch ein echtes Element.
Referenzimplementierung und Kategorienschnitt: `../assets/vorlagen/consent-muster.md`.

**Prüfung, die zählt:** Netzwerk-Tab öffnen, Seite ohne Entscheidung laden. Es darf **null**
Anfragen an den Drittanbieter geben. Erst nach „Akzeptieren" erscheinen sie. Alles andere
ist ein kosmetisches Banner.

### Google Consent Mode

Läuft ein Tag Manager, gehört ein `default`-Consent-Zustand **vor** das GTM-Skript, alles
auf `denied` außer `security_storage`, mit `wait_for_update`. Nach der Entscheidung folgt ein
`update`. Ohne diesen Default feuert der Tag Manager vor der Entscheidung.

## Weitere Pflichten je nach Seite

| Fall | Pflicht |
|---|---|
| Verkauf an Verbraucher | Widerrufsbelehrung + Muster-Widerrufsformular, AGB, Preisangaben inkl. MwSt. und Versand, Grundpreise, Lieferzeiten, Zahlungsarten |
| Buchungen/Termine mit Vertragscharakter | Informationspflichten nach Art. 246a EGBGB |
| Newsletter | Double-Opt-in, Abmeldelink in jeder Mail, Protokollierung |
| Werbeaussagen | Belegbarkeit; Testergebnisse mit Fundstelle; keine unechte Verknappung |
| Bewertungen | Angabe, ob und wie die Echtheit geprüft wird (§ 5b Abs. 3 UWG) |
| Barrierefreiheit | BFSG, siehe `04-barrierefreiheit-bfsg.md` |
| Beschäftigte ab 20 mit Datenverarbeitung | ggf. Datenschutzbeauftragter |

## Auftragsverarbeitung

Für jeden externen Dienst, der personenbezogene Daten verarbeitet, braucht es einen
**AV-Vertrag nach Art. 28 DSGVO**: Hosting, Mailversand, Formularempfang, Analytics,
CDN, Bewertungsdienste. Die Liste gehört ins Verzeichnis von Verarbeitungstätigkeiten
(Art. 30 DSGVO). Beim Livegang ist das eine Checklistenposition, kein Nebenschauplatz.

## Übergabe an den Kunden

In die Abschlussdokumentation gehören:

- welche Rechtstexte Entwürfe sind und noch geprüft werden müssen
- welche Angaben offen sind (`[[FEHLT: …]]`)
- welche Dienste eingebunden sind und welche davon einwilligungspflichtig sind
- für welche Dienste ein AV-Vertrag abzuschließen ist
- welche Bild- und Logorechte noch zu bestätigen sind
- welche Speicherfristen festzulegen sind
