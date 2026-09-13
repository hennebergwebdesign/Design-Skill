# Bereich 4: Barrierefreiheit

Barrierefreiheit bedeutet, dass die Website für ALLE nutzbar ist, unabhängig von körperlichen
oder kognitiven Einschränkungen: Seh- und Hörbehinderungen, motorische und kognitive
Einschränkungen.

**Die Zahl:** 15–20 % der Bevölkerung haben eine Form von Behinderung. Eine nicht barrierefreie
Website schließt möglicherweise jeden fünften Besucher aus: zusätzlich zum rechtlichen Risiko.

## Barrierefreiheitsstärkungsgesetz (BFSG)

> **Rechtlicher Hinweis:** Die folgenden Angaben dienen der allgemeinen Information und
> stellen keine Rechtsberatung dar. Für eine rechtsverbindliche Einschätzung einer konkreten
> Situation ist ein Fachanwalt für IT-Recht zuständig. Keine Haftung für Vollständigkeit,
> Richtigkeit oder Aktualität.

Das BFSG setzt den European Accessibility Act in deutsches Recht um und gilt seit dem
**28. Juni 2025**. Verpflichtet ist, sobald auf der Website

- etwas gekauft werden kann,
- ein Termin gebucht werden kann,
- ein Vertrag abgeschlossen werden kann,
- eine Anfrage mit Vertragsabsicht gestellt wird.

Das trifft deutlich mehr Seiten als „Onlineshop". Ein Kontaktformular, über das eine
Dienstleistung angefragt wird, kann bereits darunter fallen.

**Ausnahme Kleinstunternehmen:** Dienstleistungen von Unternehmen mit weniger als 10
Beschäftigten **und** höchstens 2 Mio. € Jahresumsatz sind ausgenommen. Die Ausnahme gilt
für Dienstleistungen, nicht für Produkte, und sie ist im Zweifel anwaltlich zu klären, nicht
über den Daumen.

**Mögliche Konsequenzen:** Bußgelder bis 100.000 €, Abmahnungen (Kosten im vierstelligen
Bereich), Unterlassungsklagen mit Gerichtskosten, individueller Schadensersatz.

**Maßstab ist die Praxis:** EN 301 549, die auf WCAG 2.1/2.2 Level AA verweist. Wer AA
erfüllt, erfüllt den Kern.

## Schritt 4.1: Kontrast-Check

Graue Schrift auf weißem Grund sieht „modern" aus. Für Menschen mit Sehschwäche ist es Text
im Nebel.

**Die Regel:** mindestens **4,5:1** für normalen Text.

Was 4,5:1 heißt: Der Helligkeitsunterschied zwischen Text und Hintergrund liegt auf einer
Skala von 1:1 (unsichtbar) bis 21:1 (maximal). 4,5:1 ist das Minimum, damit Menschen mit
leichter Sehschwäche den Text noch lesen.

| Fall | Mindestwert |
|---|---|
| Fließtext | 4,5:1 |
| Große Schrift (ab 24 px, oder 18,66 px fett) | 3:1 |
| Bedienelemente, Zustände, Grafiken, die Information tragen | 3:1 |
| Fokusindikator gegen den angrenzenden Hintergrund | 3:1 |
| Rein dekorative Elemente | keine Anforderung |

Werkzeuge: contrast-ratio.com, die Farbwähler in den DevTools, axe DevTools, WAVE.

### Die Regel, die fast jedes Markenprojekt trifft

Eine helle, gesättigte Markenfarbe ist fast nie eine Textfarbe. Beispiel aus der Praxis:
ein Markengrün `#6acc9a` erreicht auf Weiß nur 1,96:1. Daraus folgt:

- Die Markenfarbe ist eine **Flächenfarbe**. Text darauf ist dunkel (`#151717`, 9,18:1),
  nie weiß.
- Für Text auf hellen Flächen braucht die Farbrampe eine **eigene dunkle Stufe**, etwa
  `#356a4f` mit 6,31:1. Diese Stufe trägt Links, Kicker, Haken und Zahlen.
- Der **Fokusring** auf hellen Flächen ist dunkel, nicht markenfarbig, sonst reißt er
  WCAG 1.4.11. In dunklen Sektionen wird er auf die Markenfarbe umgeschaltet, dort stimmt
  der Kontrast wieder.

Diese drei Sätze gehören als Kommentar in die Tokendatei, sonst dreht die nächste Sitzung
sie zurück.

## Schritt 4.2: Alt-Texte

„Alt" = Alternative: eine Textbeschreibung des Bildes im HTML, für sehende Besucher
unsichtbar. Screenreader lesen sie vor. Drei Gründe:

1. Screenreader für blinde Menschen lesen sie vor.
2. Google nutzt sie für SEO.
3. Lädt das Bild nicht, erscheint der Text.

```html
<!-- Schlecht -->
<img src="bild.jpg" alt="Bild">

<!-- Gut -->
<img src="team.jpg" alt="Tim von That's it. Marketing am Messestand">
```

Regeln:

- Beschreibe, was zu sehen ist und warum es hier steht, nicht was es für ein Dateityp ist.
- Kein „Bild von …", das sagt der Screenreader ohnehin.
- **Rein dekorative Bilder bekommen `alt=""`** (leer, nicht weggelassen) und verschwinden
  damit korrekt aus der Vorlesereihenfolge.
- Trägt das Bild Text, gehört dieser Text in den Alt-Text.
- Ist das Bild eine KI-Illustration und kein echtes Foto, sagt der Alt-Text das
  („Illustration: …"). Das ist keine Formalie, sondern verhindert, dass eine Darstellung als
  Produktbeleg gelesen wird.

## Schritt 4.3: Tastatur-Navigation

Nicht jeder kann eine Maus bedienen. Menschen mit motorischen Einschränkungen (Parkinson,
MS, Arthritis, Lähmungen) navigieren ausschließlich mit der Tastatur; die Tab-Taste ist ihre
Maus. 8–10 % der Bevölkerung haben motorische Einschränkungen.

Tastatur-Navigation heißt: jede Funktion (Links, Buttons, Formulare, Menüs) ist ohne Maus
erreichbar und bedienbar.

| Element | Tasten | Erwartetes Verhalten |
|---|---|---|
| Links | Tab → Enter | Link wird aktiviert, neue Seite lädt |
| Buttons | Tab → Enter | Aktion wird ausgeführt |
| Formulare | Tab | Fokus springt von Feld zu Feld |
| Checkboxen | Tab → Leertaste | Wird aktiviert/deaktiviert |
| Dropdowns | Tab → ↓/↑ | Menü öffnet, Optionen wählbar |
| Hauptmenü | Tab | Alle Punkte erreichbar |
| Pop-ups | ESC | Schließt sich |
| Modal/Overlay | Tab bleibt im Modal | Fokus springt nicht dahinter |

**Der Fokus muss bei jedem Tab-Druck deutlich sichtbar sein:** ein Rahmen, ein
Hintergrund-Highlight oder eine Umrandung. `outline: none` ohne gleichwertigen Ersatz ist
ein Fehler, kein Designentscheid.

```css
:focus-visible {
  outline: 3px solid var(--farbe-fokus);
  outline-offset: 3px;
  border-radius: var(--radius-s);
}
```

Dazu gehören:

- ein **Skip-Link** als erstes fokussierbares Element („Zum Inhalt springen"), sichtbar bei
  Fokus, der auf `<main id="hauptinhalt" tabindex="-1">` zielt
- eine **Fokusfalle** in jedem Overlay, das den Rest der Seite verdeckt, mit Rückgabe des
  Fokus an das auslösende Element beim Schließen
- eine **logische Tab-Reihenfolge**, die der visuellen Reihenfolge entspricht. Kein
  `tabindex` größer 0.

## Weitere AA-Punkte, die regelmäßig durchfallen

- **Sichtbare Labels** an jedem Feld. Ein Platzhalter ist kein Label: er verschwindet beim
  Tippen.
- **Fehlermeldungen am Feld**, nicht nur oben; verknüpft über `aria-describedby`, Zustand
  über `aria-invalid`.
- **Überschriftenhierarchie** ohne Sprünge: genau ein `h1` je Seite, danach h2, h3 in Folge.
- **Sprache ausgezeichnet**: `<html lang="de">`, fremdsprachige Passagen mit eigenem `lang`.
- **Landmarks**: `header`, `nav`, `main`, `footer`, `aside` statt `div`-Wüste.
- **Icon-only Buttons** brauchen einen zugänglichen Namen (`aria-label` oder `.sr-only`-Text).
- **Information nie nur über Farbe** transportieren: rot allein ist kein Fehlerhinweis.
- **Zoom bis 200 %** ohne Informationsverlust, kein `user-scalable=no`.
- **Videos** mit Untertiteln, Audio mit Transkript.
- **Bewegung respektieren**: `prefers-reduced-motion: reduce` schaltet nicht ausgelöste
  Bewegung ab.
- **Zeitbegrenzungen** vermeiden, sonst verlängerbar machen.

## Prüfwerkzeuge

| Werkzeug | Prüft |
|---|---|
| axe DevTools / Lighthouse | automatisierbare Regelverstöße (deckt ~30–40 % ab) |
| WAVE | visuelle Übersicht, Kontrast, Struktur |
| Screenreader (NVDA/Windows, VoiceOver/Mac) | was wirklich vorgelesen wird |
| Tab-Durchlauf von Hand | Reihenfolge, Sichtbarkeit, Fallen |

Automatische Tests finden nur einen Teil. Der Tab-Durchlauf und ein Screenreader-Durchgang
über die Hauptwege sind Pflicht, kein Extra.
