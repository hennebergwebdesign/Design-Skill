# UI-Details: der Katalog der kleinen Dinge

Die großen Entscheidungen stehen in `02-design-ux.md` und `04-barrierefreiheit-bfsg.md`. Dieses
Kapitel sammelt, was dort fehlt: die vielen kleinen Browser- und Eingabedetails, die keine
Seite schlecht aussehen lassen, aber jede Seite ein Stück weniger fertig wirken lassen. Es ist
ein Nachschlagewerk für den Feinschliff, keine Strategie.

Die Substanz stammt aus den
[Web Interface Guidelines von Vercel](https://github.com/vercel-labs/web-interface-guidelines)
(rund 100 Regeln in elf Gruppen), geladen über den Skill `web-design-guidelines` aus
[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (MIT). Die Lizenz des
Regelrepositorys selbst steht im abgerufenen Dokument nicht; deshalb ist hier nichts wörtlich
übernommen, sondern auf deutsche Unternehmensseiten in Astro übertragen. Was **bereits** in
anderen Kapiteln steht (sichtbarer Fokus, Alt-Texte, Labels, `user-scalable`, `text-wrap`,
`fetchpriority`, Bildmaße, `color-scheme`, `theme-color`), steht hier nicht noch einmal.

## 1. Eingabe und Formulare

| Regel | Grund |
|---|---|
| `type` und `inputmode` passend wählen: `type="email"`, `type="tel"`, `inputmode="numeric"` bei Postleitzahl | Das Handy zeigt die richtige Tastatur, die Eingabe wird schneller und fehlerärmer |
| `autocomplete` mit den echten Werten: `name`, `email`, `tel`, `street-address`, `postal-code`, `organization` | Der Browser füllt aus. Jedes Feld weniger zu tippen ist ein Abbruch weniger, siehe `06-conversion-architektur.md` |
| **Einfügen nie blockieren** (kein `preventDefault` auf `paste`) | Wer eine Adresse oder einen Code einfügt, wird sonst gezwungen, ihn abzutippen. Betrifft besonders Passwortmanager |
| Rechtschreibprüfung aus bei E-Mail, Codes, Nutzernamen: `spellcheck="false"` | Rote Wellenlinien unter einer korrekten Adresse wirken wie ein Fehler |
| Platzhalter zeigen ein Beispiel und enden mit `…`: „z. B. Mustermann GmbH…" | Ein Platzhalter erklärt nicht das Feld, das erledigt das Label |
| Sendebutton bleibt bis zum Absenden aktiv, danach Ladezustand mit Text („Wird gesendet…") | Ein ausgegrauter Button sagt nicht, was fehlt. Ein stiller Button sagt nicht, ob etwas passiert |
| Fehler am Feld, Fokus auf das erste fehlerhafte Feld | Der Besucher muss nicht suchen. Kein Fokus bedeutet für Screenreader keine Fehlermeldung |
| Statusmeldungen asynchroner Vorgänge in `aria-live="polite"` | „Nachricht gesendet" ist ohne Region für Screenreader unsichtbar |
| Checkbox und Label sind ein einziges Klickziel | Das Kästchen allein ist ein kleines Ziel, die ganze Zeile trifft man auch mit dem Daumen |

## 2. Touch und Fläche

| Regel | Grund |
|---|---|
| `touch-action: manipulation` auf Bedienelementen | Nimmt dem Browser das Warten auf einen möglichen Doppeltipp zum Zoomen |
| `overscroll-behavior: contain` in Dialog, Menü und Schublade | Sonst scrollt nach dem Ende der Schublade die Seite dahinter weiter |
| Hintergrund hinter einem offenen Dialog mit `inert` sperren | Tastatur und Screenreader springen sonst hinter den Dialog. Gilt ebenso für ein geöffnetes Mobilmenü |
| Fest verankerte Leisten unten: `padding-bottom: env(safe-area-inset-bottom)`, im `<meta name="viewport">` `viewport-fit=cover` | Sonst verdeckt die Home-Anzeige eines iPhones den Button |
| Jede Geste hat eine Alternative per Tipp und Tastatur | Wer nicht wischen kann, kommt sonst nicht weiter. WCAG 2.5.1 |
| `autofocus` nur sparsam: nur ein Feld, nur Desktop, nie auf dem Handy | Auf dem Handy klappt die Tastatur auf und verdeckt den Inhalt, den der Besucher lesen wollte |
| Text beim Ziehen nicht markierbar: `user-select: none` nur während der Geste | Sonst markiert jede Wischbewegung Text |

## 3. Inhalt und Sprache

| Regel | Grund |
|---|---|
| Lange Wörter und Eingaben abfangen: `overflow-wrap: break-word`, bei Flex-Kindern `min-width: 0` | Deutsch hat lange Komposita, ein Flex-Kind ohne `min-width: 0` weitet die Zeile über den Rand. Kein `hyphens: auto`, das ist hier gesperrt (`pruefe-striche.mjs`) |
| Leere Zustände ausgestalten: kein Ergebnis, keine Bewertungen, kein Termin | Eine leere Fläche liest sich wie ein Fehler. Siehe `12-copywriting.md`, „Fehler und Leere als Wegweiser" |
| Kurz, mittel und sehr lang prüfen: ein Name, ein Name mit 40 Zeichen, kein Name | Layouts werden mit dem Beispieltext gebaut und brechen am echten Inhalt |
| Zahlen und Daten mit `Intl`: `Intl.NumberFormat('de-DE')`, `Intl.DateTimeFormat('de-DE')` | Handgeschriebene Formate sind schnell falsch, und der Kunde, der später Englisch ergänzt, bekommt das Richtige gratis |
| Unveränderliche Namen (Marke, Produkt, Code) mit `translate="no"` | Übersetzungsfunktionen im Browser übersetzen sonst den Firmennamen |
| Wirkliches Auslassungszeichen `…`, deutsche Anführungszeichen „…", geschütztes Leerzeichen zwischen Zahl und Einheit (`10&nbsp;€`) | Ein Umbruch zwischen „10" und „€" ist ein Satzfehler |
| `font-variant-numeric: tabular-nums` bei Zahlen, die sich ändern oder untereinander stehen: Preistabelle, Zähler, Uhrzeiten | Proportionale Ziffern lassen Spalten wackeln und zählende Zahlen zucken |
| Ziele für Anker mit `scroll-margin-top` in der Höhe der festen Kopfzeile | Der Sprunglink landet sonst unter der Navigation |

## 4. Navigation und Zustand

| Regel | Grund |
|---|---|
| Ein Zustand, den man teilen würde (Filter, aktiver Reiter, Seite), steht in der URL | Wer einen gefilterten Referenzbereich verschickt, soll denselben Bereich beim Empfänger sehen. Wirkt auch auf Zurück-Taste |
| Navigation ist ein `<a>`, kein `<div onclick>` | Strg-Klick, Mittelklick, Rechtsklick und Crawler funktionieren nur mit echtem Link |
| Zerstörendes (Löschen, Absagen) fragt nach oder bietet Rückgängig | Ein Rückgängig ist freundlicher als eine Rückfrage, die man aus Gewohnheit wegklickt |
| Hover-Zustand an jedem klickbaren Element, mit mehr Kontrast als im Ruhezustand | Der Besucher soll vor dem Klick sehen, dass es klickbar ist. Auf Touch greift er nicht, deshalb nie als einziger Hinweis |
| Windows-Hochkontrast (`forced-colors: active`) mitdenken: Begrenzung über echte Ränder, nicht nur über Schatten und Hintergrundfarbe | Im Hochkontrastmodus verschwinden Schatten und Hintergründe, ein Button ohne Rand ist dann unsichtbar |

## 5. Was bewusst anders ist als in der Quelle

| Quelle sagt | Hier | Grund |
|---|---|---|
| `preconnect` auf CDNs und Drittserver | **nur auf Domains unter eigener Kontrolle.** Nie auf Drittanbieter vor der Einwilligung | Ein `preconnect` baut die Verbindung zum fremden Server auf, und damit liegt die IP-Adresse offen, bevor jemand eingewilligt hat. Das ist dieselbe Lage wie bei einem Skript, das zu früh lädt, siehe „Blockierung muss echt sein" in `07-recht-dsgvo.md`. Die Folgerung ist technisch, keine Rechtsauskunft. Schriften sind ohnehin selbst gehostet |
| Überschriften und Buttons in Title Case | Deutsche Groß- und Kleinschreibung, keine Versalien in jedem Wort | Title Case gibt es im Deutschen nicht. „Jetzt Termin Buchen" ist ein Rechtschreibfehler |
| Liste ab 50 Einträgen virtualisieren, uncontrolled inputs, Hydrationsregeln | nicht übernommen | React-spezifisch, im Astro-Standardstack ohne Inhalt. Wer React nutzt, liest `11-komponenten-shadcn.md` |
| `&` statt „und" bei Platzmangel | nicht übernommen | Im Deutschen ist „und" der Normalfall, ein kaufmännisches Und steht nur in Firmennamen |
| Zweite Person und aktive Sprache | schon in `12-copywriting.md` | Duzen oder Siezen ist dort eine Entscheidung mit Begründung |

## 6. Prüfen

Der Katalog hat kein eigenes Skript, weil sich das meiste nur im Browser zeigt. Zwei Wege:

1. Die Spalten dieses Kapitels beim Feinschliff durchgehen (`29-pruefdurchgaenge-und-vokabular.md`,
   Wort „Feinschliff") und, was zählbar ist, mit `pruefe-breakpoints.mjs` gegenlesen
   (Touchziele, Überlauf, Schrift unter 14 px).
2. Formulare einmal mit Tastatur und Handy ausfüllen: Tastatur passt, Autofill greift, Fehler
   springen an die richtige Stelle, Einfügen funktioniert.

## Verwandte Kapitel

- Design und Eingabe: `02-design-ux.md`, `06-conversion-architektur.md`
- Barrierefreiheit: `04-barrierefreiheit-bfsg.md`
- Drittanbieter vor Consent: `07-recht-dsgvo.md`
- Formularvorlage: `../../agentur-website-builder/references/formulare-und-resend.md`
- Bewegung: `30-motion-pruefung.md`
