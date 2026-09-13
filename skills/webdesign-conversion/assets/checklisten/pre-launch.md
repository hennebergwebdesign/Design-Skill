# Pre-Launch-Checkliste

Abzuarbeiten **vor** dem Livegang, nicht danach. Jeder Punkt wird geprüft, nicht
eingeschätzt. Was nicht geprüft wurde, wird als ungeprüft an den Kunden übergeben.

## 1 Strategie und Inhalt

- [ ] Zielgruppe, USP und Einwände stehen im Projekt-`CLAUDE.md` und sind auf der Seite
      wiedererkennbar
- [ ] Above the Fold beantwortet ohne Scrollen: Was macht ihr? Wird mein Problem
      adressiert? Was habe ich davon? Wohin führt der CTA?
- [ ] Kein `[[FEHLT: …]]` und kein `[[BESTÄTIGEN: …]]` mehr im sichtbaren Text
- [ ] Kein `data-copy-vorschlag` mehr im Markup
- [ ] Alle Zahlen, Zitate, Bewertungen und Referenzen sind belegt und freigegeben
- [ ] Duzen/Siezen durchgehend konsistent, auch in Formularhinweisen, Fehlermeldungen und
      Bestätigungsmails
- [ ] Rechtschreibung geprüft (auch in Alt-Texten, Meta-Beschreibungen und Buttontexten)

## 2 Conversion

- [ ] Primär-CTA mindestens 2× je Seite, identischer Text über die ganze Seite
- [ ] Sekundär-CTA visuell klar untergeordnet
- [ ] Mobiler Bestell-/Anfragebalken ab Ende des Heldenbereichs sichtbar
- [ ] Kontaktformular hat 3–5 Felder, jedes mit sichtbarem Label
- [ ] Formular getestet: Erfolg, Validierungsfehler, Serverfehler mit Ausweg
- [ ] Bestätigungsmail und interne Mail kommen an und sind lesbar (auch als Plaintext)
- [ ] Spamschutz aktiv: Honigtopf, Zeitfeld, Origin-Prüfung, Rate-Limit
- [ ] Trust-Elemente mehrfach platziert, nicht nur auf der Startseite
- [ ] 3-Klick-Regel geprüft: Anfrage, Referenzen, Prozess, Preise

## 3 Technik und Performance

- [ ] `pnpm build` bzw. der Buildbefehl läuft ohne Fehler
- [ ] `astro check` / `tsc --noEmit` ohne Befund
- [ ] LCP < 2,5 s, CLS < 0,1, INP < 200 ms (Lighthouse **und** Feldmessung nach ein paar Tagen)
- [ ] Kein Bild über 200 KB (Hero: 500 KB), alles als WebP/AVIF
- [ ] Jedes `<img>` hat `width` und `height`
- [ ] Schriften selbst gehostet, nur benutzte Schnitte, zwei per Preload angekündigt
- [ ] Fünf Breakpoints geprüft: 375, 768, 1024, 1440, 1920 px: zusätzlich 1366 × 768
- [ ] Keine horizontale Scrollleiste auf keiner Breite
- [ ] Seite bleibt ohne JavaScript lesbar und bedienbar
- [ ] Cache-Header gesetzt, Security-Header gesetzt
- [ ] HTTPS erzwungen, keine Mixed-Content-Warnung

## 4 Barrierefreiheit

- [ ] Kontrast jeder Text-/Flächenkombination geprüft: 4,5:1 Fließtext, 3:1 große Schrift
      und Bedienelemente
- [ ] Fokusring auf jeder Fläche sichtbar und kontraststark (3:1)
- [ ] Kompletter Tab-Durchlauf über jede Funktion, Reihenfolge entspricht der Optik
- [ ] Skip-Link vorhanden und funktionsfähig
- [ ] Overlays: Fokusfalle, Escape schließt, Fokus kehrt zurück
- [ ] Jedes Bild hat einen Alt-Text; dekorative Bilder `alt=""`
- [ ] Genau ein `h1` je Seite, Überschriftenhierarchie ohne Sprünge
- [ ] Landmarks gesetzt (`header`, `nav`, `main`, `footer`)
- [ ] Icon-only Buttons haben einen zugänglichen Namen
- [ ] `<html lang="de">`, Zoom bis 200 % ohne Verlust, kein `user-scalable=no`
- [ ] `prefers-reduced-motion: reduce` geprüft: keine nicht ausgelöste Bewegung, nichts fehlt
- [ ] axe DevTools oder Lighthouse-A11y ohne Befund, plus ein Screenreader-Durchgang
- [ ] BFSG-Betroffenheit geklärt und dokumentiert

## 5 SEO

- [ ] Jede Seite hat einen einmaligen Meta-Titel (≤ 60 Zeichen) und eine Meta-Beschreibung
      (≤ 160 Zeichen)
- [ ] Ein Haupt-Keyword je Seite, keine zwei Seiten auf denselben Begriff
- [ ] URLs kurz, mit Keyword, Bindestriche, keine Umlaute, Kleinschreibung
- [ ] Canonical absolut und selbstreferenzierend auf jeder Seite
- [ ] `noindex` auf Impressum, Datenschutz, Danke-Seiten, internen Bereichen
- [ ] Sitemap erzeugt, enthält **keine** `noindex`-Seiten, in der Search Console eingereicht
- [ ] `robots.txt` vorhanden, Sitemap-Adresse zeigt auf die **echte** Domain
- [ ] JSON-LD vorhanden und im Rich-Results-Test ohne Fehler
- [ ] Open Graph geprüft (absolutes Bild 1200 × 630, Vorschau in einem Messenger getestet)
- [ ] 2–4 interne Links je Seite mit aussagekräftigen Ankertexten
- [ ] Bei Relaunch: 301-Tabelle vollständig, stichprobenhaft geprüft (Status 301, keine Kette)
- [ ] Domainvarianten vereinheitlicht (http→https, www-Entscheidung, Trailing Slash)
- [ ] Vorschau-Umgebungen per Auth oder `X-Robots-Tag: noindex` abgesichert

## 6 Pflichtseiten

- [ ] `/impressum` vollständig, von jeder Seite verlinkt, Linktext „Impressum"
- [ ] `/datenschutz` beschreibt genau die eingesetzten Dienste, keinen einzigen mehr
- [ ] Cookie-Einstellungen jederzeit über den Footer erreichbar
- [ ] `/404` liefert wirklich HTTP 404 (`curl -I https://domain/gibtesnicht`)
- [ ] 404-Seite trägt Navigation und bietet konkrete Wege weiter
- [ ] AGB und Widerrufsbelehrung, falls an Verbraucher verkauft wird
- [ ] Favicon, Apple-Touch-Icon, OG-Bild vorhanden

## 7 Datenschutz und Recht

- [ ] Im Netzwerk-Tab geprüft: **ohne Einwilligung null Anfragen** an Drittanbieter
      (Screenshot als Nachweis)
- [ ] „Ablehnen" ist gleichrangig zu „Akzeptieren", keine Vorauswahl
- [ ] Widerruf funktioniert und wird gespeichert
- [ ] Google Consent Mode Default steht **vor** dem GTM-Skript
- [ ] AV-Verträge nach Art. 28 DSGVO für alle Auftragsverarbeiter abgeschlossen
- [ ] Bildrechte und Logonutzungsrechte bestätigt
- [ ] Schriftlizenzen geprüft
- [ ] Rechtstexte zur anwaltlichen Prüfung gegeben oder ausdrücklich als ungeprüft übergeben

## 8 Messung

- [ ] Analytics eingerichtet, interne Zugriffe ausgeschlossen
- [ ] Conversion-Ereignisse definiert und als Schlüsselereignis markiert
- [ ] Search Console eingerichtet und verifiziert
- [ ] Ein Test-Absenden des Formulars erscheint in der Auswertung

## 9 Deployment

- [ ] `PUBLIC_SITE_URL` (o. ä.) zeigt auf die echte Domain, in Production **und** Preview
- [ ] Buildbefehl und Ausgabeverzeichnis stimmen
- [ ] Alle Secrets in der Hosting-Umgebung gesetzt, keine im Repository
- [ ] DNS und SSL aktiv, Zertifikat gültig
- [ ] Ein vollständiger Durchlauf auf der Produktionsdomain, nicht nur auf der Vorschau

## 10 Übergabe

- [ ] Projekt-`CLAUDE.md` aktuell, mit Offenen Punkten und Änderungsverlauf
- [ ] Liste der offenen Punkte an den Kunden übergeben
- [ ] Zugänge dokumentiert und übergeben
- [ ] Pflegeplan vereinbart (monatlicher Review, siehe `../../references/13-messung-optimierung.md`)
