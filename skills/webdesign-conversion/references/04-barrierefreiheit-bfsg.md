# Bereich 4: Barrierefreiheit

Barrierefreiheit bedeutet, dass die Website für ALLE nutzbar ist, unabhängig von körperlichen
oder kognitiven Einschränkungen: Seh- und Hörbehinderungen, motorische und kognitive
Einschränkungen.

**Die Zahl:** 15–20 % der Bevölkerung haben eine Form von Behinderung. Eine nicht barrierefreie
Website schließt möglicherweise jeden fünften Besucher aus: zusätzlich zum rechtlichen Risiko.

## Inhalt

- Barrierefreiheitsstärkungsgesetz (BFSG)
- Schritt 4.1: Kontrast-Check
- Schritt 4.2: Alt-Texte
- Schritt 4.3: Tastatur-Navigation
- Weitere AA-Punkte, die regelmäßig durchfallen
- Schritt 4.4: Muster für interaktive Bauteile
- Schritt 4.5: Die neuen Kriterien aus WCAG 2.2
- Schritt 4.6: Medien
- Prüfwerkzeuge
- Herkunft und was bewusst nicht übernommen wurde
- Verwandte Kapitel

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
- **Zoom bis 200 %** ohne Informationsverlust, kein `user-scalable=no`. Schriftgrößen in rem,
  fließende Größen mit rem-Anteil und höchstens 2,5-facher Spanne, siehe
  `55-typografie-system.md`; geprüft von `scripts/pruefe-typografie.mjs`.
- **Videos** mit Untertiteln, Audio mit Transkript.
- **Bewegung respektieren**: `prefers-reduced-motion: reduce` schaltet nicht ausgelöste
  Bewegung ab. Gedämpft statt gestrichen, siehe `30-motion-pruefung.md`.
- **Automatisch Bewegtes** (Autoplay, Karussell, Laufband), das länger als 5 Sekunden läuft und
  neben Inhalt steht, braucht Pause, Stopp oder Ausblenden (WCAG 2.2.2).
- **Zeitbegrenzungen** vermeiden, sonst verlängerbar machen.

## Schritt 4.4: Muster für interaktive Bauteile

Grundsatz vor jedem Muster: **natives HTML vor ARIA.** Ein `<button>` bringt Rolle, Fokus,
Enter und Leertaste mit, ein `<div role="button">` bringt nichts davon. Falsches ARIA ist
schlechter als keins, weil es dem Screenreader etwas verspricht, das die Seite nicht hält.

| Bauteil | Erste Wahl | ARIA nur, wenn | Tastatur |
|---|---|---|---|
| Dialog, Off-Canvas-Menü, Lightbox | `<dialog>` mit `showModal()` | nie nötig für Rolle und Modalität | Tab bleibt im Dialog, Escape schließt |
| Hauptnavigation mit Untermenü | `<button aria-expanded>` plus Linkliste | `aria-expanded`, `aria-controls`, `aria-current` | Tab durch alle Links, Escape schließt das offene Untermenü |
| Akkordeon, FAQ | `<details>`/`<summary>` | die Überschrift muss in der Überschriftennavigation auftauchen | Tab, Enter oder Leertaste |
| Reiter (Tabs) | Abschnitte mit Überschriften, per Skript zu Reitern | immer: `tablist`, `tab`, `tabpanel` | Pfeiltasten zwischen Reitern, Tab in das Panel |
| Karussell | waagerecht scrollbare Reihe mit `scroll-snap` | Folien mit Position („2 von 5") | Zurück- und Weiter-Buttons, kein Autoplay |
| Statusmeldung | `<p role="status">` | `role="alert"` nur für Fehler, die sofortiges Handeln verlangen | keine, der Fokus bleibt, wo er ist |

Die Pfeiltasten gehören nur in zusammengesetzte Bauteile (Reiter, Listbox, Radiogruppe). Eine
Website-Navigation ist **kein** `role="menu"`: dieses Muster stammt aus Desktopanwendungen,
schaltet viele Screenreader in einen Anwendungsmodus und verlangt Pfeiltasten, wo jeder
Besucher Tab erwartet.

### Dialog

```astro
---
// src/components/ui/Dialog.astro
interface Props { id: string; titel: string }
const { id, titel } = Astro.props;
---
<dialog id={id} class="dialog" aria-labelledby={`${id}-titel`}>
  <div class="dialog__kopf">
    <h2 id={`${id}-titel`}>{titel}</h2>
    <button type="button" class="dialog__schliessen" data-dialog-schliessen>
      <svg aria-hidden="true" focusable="false"><use href="/icons.svg#schliessen" /></svg>
      <span class="sr-only">Schließen</span>
    </button>
  </div>
  <slot />
</dialog>

<script>
  document.querySelectorAll<HTMLButtonElement>('[data-dialog-oeffnen]').forEach((knopf) => {
    const dialog = document.getElementById(knopf.dataset.dialogOeffnen!) as HTMLDialogElement;
    knopf.addEventListener('click', () => dialog.showModal());
  });
  document.querySelectorAll<HTMLDialogElement>('dialog.dialog').forEach((dialog) => {
    dialog.querySelector('[data-dialog-schliessen]')?.addEventListener('click', () => dialog.close());
    // Klick auf den Hintergrund schließt; der Klick landet dann auf dem dialog selbst
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  });
</script>
```

Auslöser: `<button type="button" data-dialog-oeffnen="beratung">Beratung anfragen</button>`.

| Regel | Grund |
|---|---|
| `showModal()`, nicht `show()` und nicht `open` als Attribut | nur `showModal()` macht den Rest der Seite träge, hält Tab im Dialog und schließt mit Escape, ohne eigene Fokusfalle |
| Kein `role="dialog"` und kein `aria-modal` zusätzlich | beides setzt der Browser bei `showModal()` selbst; doppelt gesetzt wird es beim nächsten Umbau falsch |
| `aria-labelledby` auf die Überschrift, Überschrift ab `h2` | der Dialog wird mit seinem Namen angesagt; `h1` bleibt der Seite |
| Sichtbarer Schließen-Button mit Namen | Escape kennt nicht jeder, und auf dem Telefon gibt es keins |
| Fokus beim Öffnen: Bestätigung auf die harmlose Aktion („Abbrechen"), langer Inhalt auf die Überschrift (`tabindex="-1"`), sonst das erste Bedienelement | ein Enter zu viel darf nichts löschen; bei langem Text soll die Person lesen, bevor sie handelt |
| Fokus beim Schließen zurück auf den Auslöser | Browser tun das bei `<dialog>` selbst. Im Tab-Durchlauf prüfen: verschwindet der Auslöser beim Öffnen aus dem DOM, landet der Fokus am Seitenanfang |
| `aria-describedby` nur für einen kurzen Satz | es liest den verknüpften Inhalt als einen Satz vor; Listen und Felder darin gehen verloren |
| Hintergrund nicht scrollen lassen: `body:has(dialog[open]) { overflow: hidden; }` | sonst verrutscht die Seite unter dem Dialog, und nach dem Schließen steht der Auslöser woanders |

Bestätigungsdialoge mit Folgen (Termin stornieren, Daten löschen) bekommen
`role="alertdialog"` und `aria-describedby` auf den einen Satz, der die Folge nennt. Auf
Unternehmensseiten ist das selten; ein Kontaktformular braucht keinen Bestätigungsdialog.

Das **Off-Canvas-Menü** ist derselbe Dialog mit anderer Position. Es gehört als Geschwister
neben die Kopfgruppe, nicht hinein (Grund in `02-design-ux.md`, Abschnitt Sticky-Kopf).

### Navigation mit Untermenü

```astro
<nav aria-label="Hauptnavigation">
  <ul class="nav">
    <li>
      <button type="button" aria-expanded="false" aria-controls="nav-leistungen" data-untermenue>
        Leistungen
      </button>
      <ul id="nav-leistungen" hidden>
        <li><a href="/leistungen/badsanierung">Badsanierung</a></li>
        <li><a href="/leistungen/heizung" aria-current="page">Heizung</a></li>
      </ul>
    </li>
    <li><a href="/referenzen">Referenzen</a></li>
  </ul>
</nav>

<script>
  document.querySelectorAll<HTMLButtonElement>('[data-untermenue]').forEach((knopf) => {
    const liste = document.getElementById(knopf.getAttribute('aria-controls')!)!;
    const setze = (offen: boolean) => { knopf.setAttribute('aria-expanded', String(offen)); liste.hidden = !offen; };
    knopf.addEventListener('click', () => setze(knopf.getAttribute('aria-expanded') !== 'true'));
    knopf.parentElement!.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') { setze(false); knopf.focus(); }
    });
    knopf.parentElement!.addEventListener('focusout', (e) => {
      if (!knopf.parentElement!.contains(e.relatedTarget as Node)) setze(false);
    });
  });
</script>
```

| Regel | Grund |
|---|---|
| Untermenü öffnet per Klick auf einen Button, Hover darf zusätzlich öffnen | Hover allein erreicht weder Tastatur noch Touch |
| Was bei Hover erscheint, bleibt stehen, solange der Zeiger darauf liegt, und schließt mit Escape | WCAG 1.4.13 (AA); wer mit Lupe arbeitet, muss mit dem Zeiger in das Menü fahren können |
| Die Oberseite „Leistungen" ist zusätzlich als Link im Untermenü erreichbar | der Button öffnet nur, er führt nirgendwohin |
| `aria-current="page"` auf dem Link der aktuellen Seite | die Position wird angesagt, nicht nur farbig gezeigt (WCAG 1.4.1) |
| Mehrere `<nav>` je Seite bekommen unterscheidbare `aria-label` | „Navigation, Navigation" in der Landmarkenliste hilft niemandem |
| Menüknopf mobil mit sichtbarem Wort „Menü" oder `aria-label="Menü"` und `aria-expanded` | der Zustand offen oder zu muss hörbar sein; die Animation des Symbols steht in `18-motion-handschrift.md` |

### Akkordeon

```astro
<div class="faq">
  <details name="faq">
    <summary>Was kostet eine Badsanierung?</summary>
    <p>…</p>
  </details>
  <details name="faq">
    <summary>Wie lange dauert der Umbau?</summary>
    <p>…</p>
  </details>
</div>
```

`<details>` funktioniert ohne Skript, ist mit Tab, Enter und Leertaste bedienbar, sagt den
Zustand offen oder zu selbst an, und die Suche im Browser findet auch zugeklappten Text. Das
gemeinsame `name` lässt immer nur einen Eintrag offen; Browser ohne Unterstützung öffnen
mehrere, was nichts kaputt macht.

Soll die Frage in der Überschriftennavigation erscheinen (lange FAQ mit Gruppen), braucht es
die Skriptvariante, weil eine Überschrift in `<summary>` nicht überall als Überschrift
angesagt wird:

```html
<h3>
  <button type="button" aria-expanded="false" aria-controls="faq-kosten">
    Was kostet eine Badsanierung?
  </button>
</h3>
<div id="faq-kosten" hidden>…</div>
```

Kein `role="region"` je Panel, sobald es mehr als eine Handvoll sind: jede Region landet in
der Landmarkenliste und verwässert sie.

### Reiter (Tabs)

Ohne Skript stehen alle Abschnitte untereinander, jeder mit eigener Überschrift. Das Skript
baut daraus Reiter. So bleibt der Inhalt ohne JavaScript vollständig, wie es die harte Grenze
verlangt.

```astro
<div class="reiter" data-reiter>
  <div role="tablist" aria-label="Pakete" hidden>
    <button type="button" role="tab" id="tab-basis" aria-controls="panel-basis" aria-selected="true">Basis</button>
    <button type="button" role="tab" id="tab-plus" aria-controls="panel-plus" aria-selected="false" tabindex="-1">Plus</button>
  </div>
  <section id="panel-basis" role="tabpanel" aria-labelledby="tab-basis" tabindex="0">
    <h3 class="reiter__titel">Basis</h3> …
  </section>
  <section id="panel-plus" role="tabpanel" aria-labelledby="tab-plus" tabindex="0">
    <h3 class="reiter__titel">Plus</h3> …
  </section>
</div>

<script>
  document.querySelectorAll<HTMLElement>('[data-reiter]').forEach((box) => {
    const liste = box.querySelector<HTMLElement>('[role="tablist"]')!;
    const tabs = [...box.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const waehle = (neu: HTMLButtonElement, fokus = true) => tabs.forEach((t) => {
      const an = t === neu;
      t.setAttribute('aria-selected', String(an));
      t.tabIndex = an ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')!)!.hidden = !an;
      if (an && fokus) t.focus();
    });
    liste.hidden = false;
    box.classList.add('ist-aktiv'); // blendet .reiter__titel per CSS aus
    waehle(tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0], false);
    tabs.forEach((t) => t.addEventListener('click', () => waehle(t)));
    liste.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
      const ziel = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (ziel === undefined) return;
      e.preventDefault();
      waehle(tabs[(ziel + tabs.length) % tabs.length]);
    });
  });
</script>
```

| Regel | Grund |
|---|---|
| Nur der aktive Reiter ist per Tab erreichbar, die anderen per Pfeiltaste | ein Tab-Druck verlässt die Reiterleiste und landet im Inhalt, statt zehn Reiter abzuklappern |
| Panel mit `tabindex="0"`, wenn es kein eigenes Bedienelement enthält | sonst springt Tab am Inhalt vorbei |
| Preise, Pflichtangaben und der Primär-CTA stehen nicht nur in einem verdeckten Reiter | was hinter einem Klick liegt, wird seltener gesehen; das kostet Anfragen und kann bei Preisangaben Ärger machen |

### Karussell

Voreinstellung ist eine waagerecht scrollbare Reihe mit `scroll-snap` und zwei Buttons, kein
Skript-Karussell. Sie ist ohne JavaScript nutzbar und mit Touch, Trackpad und Tastatur
bedienbar.

```astro
<section class="reihe" aria-roledescription="Karussell" aria-label="Referenzprojekte">
  <div class="reihe__steuerung">
    <button type="button" data-reihe="zurueck"><span class="sr-only">Vorherige Projekte</span>…</button>
    <button type="button" data-reihe="weiter"><span class="sr-only">Nächste Projekte</span>…</button>
  </div>
  <div class="reihe__spur scrollrahmen" tabindex="0" role="region" aria-label="Projekte, waagerecht scrollbar">
    <div role="group" aria-roledescription="Folie" aria-label="1 von 6">…</div>
  </div>
</section>
```

| Regel | Grund |
|---|---|
| **Kein automatisches Weiterschalten**, auch nicht mit Pausenknopf | WCAG 2.2.2 (A) verlangt für Bewegung über 5 Sekunden ohnehin eine Pause; automatisch wechselnde Folien liest niemand bis zur dritten, und bei `prefers-reduced-motion` entfällt es nach den harten Grenzen sowieso |
| Zurück und Weiter als Buttons **vor** den Folien | Wischen ist eine Pfadgeste, WCAG 2.5.1 (A) verlangt eine Bedienung mit einem einfachen Klick; Ziehen allein reißt WCAG 2.5.7 (AA) |
| Folie mit Position („3 von 6") | ohne sie weiß niemand mit Screenreader, wie viel noch kommt |
| Spur mit `tabindex="0"`, wenn die Folien keine Links enthalten | sonst lässt sie sich mit der Tastatur nicht scrollen |
| Besteht der Kunde auf Autoplay: Pausenknopf als erstes Element, Halt bei Hover und Fokus, keine Ansage per Live-Region während des Laufs | eine Live-Region, die alle paar Sekunden spricht, macht die Seite für Screenreader unbenutzbar |

### Live-Regionen

| Anlass | Mittel | Grund |
|---|---|---|
| Formular wird gesendet, Erfolg | `role="status"` (höflich) | wird angesagt, sobald der Screenreader fertig ist, ohne den Fokus zu ziehen |
| Filter oder Suche ändert die Trefferzahl | `role="status"`, entprellt (etwa eine halbe Sekunde) | jede Zwischenzahl einzeln anzusagen erzeugt Stimmensalat |
| Fehler, der sofort Handeln verlangt (Sitzung läuft ab, Zahlung abgelehnt) | `role="alert"` | unterbricht; deshalb nur hier |
| Fehler beim Absenden eines Formulars | Fokus auf die Fehlerzusammenfassung, keine Live-Region | siehe Formularfehler unten |
| Hinweis, der von selbst verschwindet (Toast) | `role="status"`, Text bleibt, bis er geschlossen wird, wenn er Wichtiges trägt | wer langsam liest oder vergrößert, sieht sonst nur das Verschwinden (WCAG 2.2.1, A) |

```astro
<form data-anfrage novalidate>
  …
  <p role="status" class="formular__status" data-status></p>
</form>
<script>
  const status = document.querySelector<HTMLElement>('[data-status]')!;
  // später, nach der Antwort des Servers:
  status.textContent = 'Danke, Ihre Anfrage ist angekommen. Wir melden uns bis morgen Mittag.';
</script>
```

| Regel | Grund |
|---|---|
| Die Region steht beim Laden schon im DOM, leer | eine Region, die mit ihrem Inhalt zusammen eingefügt wird, wird oft nicht angesagt |
| Text per `textContent` tauschen, das Element nicht ersetzen | ersetzte Elemente sind eine neue Region ohne Vorgeschichte |
| Nie `display: none` oder `hidden` auf die Region, zum Verstecken `.sr-only` | versteckte Elemente existieren für den Screenreader nicht |
| Kurz: das Ergebnis, nicht die Erklärung | die ganze Region wird bei jeder Änderung vorgelesen |
| Nicht mehrere Regionen gleichzeitig ändern | Screenreader sagen dann eine an und verschlucken die andere |

### Formularfehler

Der Ablauf (wann geprüft wird, was beim Absenden passiert, Pflicht oder optional, mehrere
Schritte) steht in `58-formulare-und-anfragestrecken.md`, die Formulierung der Meldungen in
`12-copywriting.md`, Zustände und serverseitige Prüfung in `06-conversion-architektur.md`.
Hier steht nur die Auszeichnung, die diesen Ablauf für Tastatur und Screenreader hörbar macht.

```astro
<div class="fehlerliste" data-fehlerliste tabindex="-1" hidden>
  <h2>Bitte zwei Angaben prüfen</h2>
  <ul>
    <li><a href="#feld-email">E-Mail-Adresse: Hier fehlt ein @.</a></li>
    <li><a href="#feld-telefon">Telefon: Bitte mit Vorwahl.</a></li>
  </ul>
</div>

<!-- Zustand nach fehlgeschlagener Prüfung; im Ruhezustand ohne aria-invalid und ohne Fehlertext -->
<label for="feld-email">E-Mail-Adresse</label>
<input id="feld-email" name="email" type="email" autocomplete="email" required
       aria-invalid="true" aria-describedby="feld-email-fehler">
<p id="feld-email-fehler" class="feld__fehler">Hier fehlt ein @. Bitte prüfen.</p>

<fieldset>
  <legend>Wie dürfen wir Sie erreichen?</legend>
  <label><input type="radio" name="weg" value="telefon"> Telefon</label>
  <label><input type="radio" name="weg" value="email"> E-Mail</label>
</fieldset>

<label for="feld-firma">Firma <span class="feld__optional">(optional)</span></label>
<input id="feld-firma" name="firma" autocomplete="organization">
```

| Regel | Grund |
|---|---|
| Fehlerliste mit `tabindex="-1"`, beim Absenden mit mehreren Fehlern Fokus darauf, jeder Eintrag verlinkt sein Feld | die Person erfährt sofort, dass und wo etwas fehlt, und kommt mit einem Klick hin (WCAG 3.3.1, A) |
| Fehlerliste ohne `role="alert"`, wenn der Fokus ohnehin hingeht | beides zusammen wird doppelt vorgelesen |
| `aria-invalid="true"` nur nach einer Prüfung, entfernt, sobald der Wert gültig ist | ein Feld, das schon beim Laden als ungültig gilt, meldet einen Fehler, den es nicht gibt |
| Hinweis und Fehler beide in `aria-describedby`, mit Leerzeichen getrennt (`"feld-tel-hinweis feld-tel-fehler"`) | sonst verschwindet der Hinweis genau dann, wenn er gebraucht wird |
| Fehlertext sichtbar als Text, Farbe und Symbol nur zusätzlich, Symbol mit `aria-hidden="true"` | WCAG 1.4.1 (A): ein roter Rahmen allein sagt nichts |
| `required` am Feld, kein zusätzliches `aria-required` | `required` sagt der Screenreader selbst an; beides zusammen ist Ballast |
| Radiogruppen und Checkboxgruppen in `<fieldset>` mit `<legend>` | ohne die Frage hört man nur „Telefon, Optionsfeld" |
| `autocomplete` an jedem Feld zur eigenen Person | WCAG 1.3.5 (AA); die Werte je Feld stehen in `58-formulare-und-anfragestrecken.md` |
| Erfolg ersetzt das Formular: Fokus auf die Überschrift der Bestätigung (`tabindex="-1"`) | das Element mit dem Fokus ist verschwunden; ohne Setzen landet der Fokus am Seitenanfang |
| Buchung, Kauf, Vertrag: Prüfseite vor dem Absenden oder Stornierung danach | WCAG 3.3.4 (AA); genau diese Seiten fallen unter das BFSG |
| Hinweise unter dem Feld sichtbar, nicht im Tooltip, verknüpft per `aria-describedby` | ein Tooltip ist für Touch und Tastatur oft unerreichbar |

## Schritt 4.5: Die neuen Kriterien aus WCAG 2.2

Das Plugin prüft gegen **WCAG 2.2 Stufe AA**. Grund: wer 2.2 erfüllt, erfüllt nach Aussage
des W3C auch 2.1 und 2.0, und die neuen Kriterien treffen genau die Bauteile von
Verkaufsseiten: Sticky-Kopf, Consent-Banner, Vorher-Nachher-Regler, mehrstufige Formulare.

| Kriterium | Stufe | Verlangt | Reißt typischerweise an |
|---|---|---|---|
| 2.4.11 Fokus nicht verdeckt (Minimum) | AA | ein fokussiertes Element ist nicht **vollständig** von Inhalt der Seite verdeckt | Sticky-Kopf, Consent-Banner, Chat-Knopf, Mobil-CTA-Balken |
| 2.4.12 Fokus nicht verdeckt (Erweitert) | AAA | gar nicht verdeckt | nicht verlangt, mit derselben Lösung meist erfüllt |
| 2.4.13 Fokusdarstellung | AAA | Fokusbereich mindestens so groß wie ein 2 CSS-px-Rahmen, 3:1 zwischen fokussiert und nicht fokussiert | nicht verlangt; der Fokusring aus Schritt 4.3 zielt in diese Richtung |
| 2.5.7 Ziehbewegungen | AA | was sich ziehen lässt, geht auch mit einem einfachen Klick | Vorher-Nachher-Regler, Ziehkarussell, Kartenausschnitt, sortierbare Liste |
| 2.5.8 Zielgröße (Minimum) | AA | Klickziele mindestens 24 × 24 CSS-px oder genug Abstand | Social-Icons im Footer, Punkte unter Karussells, Schließen-Kreuz, Sternbewertung |
| 3.2.6 Konsistente Hilfe | A | Kontaktwege, die auf mehreren Seiten stehen, stehen überall in derselben Reihenfolge | Telefonnummer mal im Kopf, mal nur im Footer; Chat nur auf einigen Seiten an anderer Stelle |
| 3.3.7 Redundante Eingabe | A | schon eingegebene Daten im selben Vorgang vorausfüllen oder zur Auswahl anbieten | mehrstufige Anfrage, Buchung, Checkout |
| 3.3.8 Barrierefreie Authentifizierung (Minimum) | AA | kein Gedächtnis- oder Rätseltest beim Anmelden ohne Hilfe oder Alternative | Kundenlogin, Captcha, Einmalcode in sechs Einzelfeldern, Einfügen gesperrt |
| 4.1.1 Syntaxanalyse | entfallen | in WCAG 2.2 als überholt gestrichen | doppelte IDs und kaputte Verschachtelung bleiben trotzdem Fehler, weil sie WCAG 1.3.1 und 4.1.2 reißen |

### 2.4.11: Fokus nicht verdeckt

```css
/* global-basis.css hat das schon für den Kopf, hier die Ergänzung für unten */
html {
  scroll-padding-top: calc(var(--hoehe-kopf-gruppe) + var(--raum-4));
  scroll-padding-bottom: var(--hoehe-unten-fixiert, 0px);
}
```

```js
// Consent-Banner oder Mobil-CTA-Balken melden ihre Höhe, solange sie stehen
const leiste = document.querySelector('[data-unten-fixiert]');
new ResizeObserver(([e]) => {
  document.documentElement.style.setProperty('--hoehe-unten-fixiert', `${e.contentRect.height}px`);
}).observe(leiste);
```

| Regel | Grund |
|---|---|
| `scroll-padding` oben und unten in Höhe der fixierten Leisten | der Browser scrollt ein fokussiertes Element dann so, dass es neben der Leiste liegt; im Tab-Durchlauf prüfen, nicht annehmen |
| Consent-Banner beim ersten Besuch entweder als modaler Dialog (Fokus darin) oder so flach, dass er nichts vollständig verdeckt | ein nicht modales Banner über dem halben Bildschirm verdeckt jedes Feld, zu dem jemand tabbt |
| Ein Kopf, der beim Runterscrollen ausblendet (`02-design-ux.md`), blendet beim Rückwärts-Tab nicht über das fokussierte Element ein | Shift+Tab scrollt nach oben und holt den Kopf zurück, genau über das Ziel |

### 2.5.7: Ziehen ersetzen

Der Vorher-Nachher-Regler ist das häufigste Ziehbauteil auf Handwerker- und
Sanierungsseiten. Mit einem nativen Schieberegler ist er klickbar, tastaturbedienbar und
ansagbar, ohne eigenes Ziehen:

```astro
<figure class="vergleich" style="--anteil: 50%">
  <img src={nachher.src} alt="Bad nach der Sanierung: bodengleiche Dusche, graue Fliesen" width="1200" height="800" />
  <img class="vergleich__vorher" src={vorher.src} alt="Dasselbe Bad vorher: Wanne, gelbe Fliesen" width="1200" height="800" />
  <label class="sr-only" for="vergleich-1">Anteil des Vorher-Bilds</label>
  <input id="vergleich-1" type="range" min="0" max="100" value="50"
         oninput="this.parentElement.style.setProperty('--anteil', this.value + '%')" />
  <figcaption>Badsanierung in Musterstadt, [[FEHLT: Jahr]]</figcaption>
</figure>
```

Ein Klick auf die Bahn des Schiebereglers setzt den Wert direkt, das erfüllt 2.5.7; Pfeiltasten
verschieben ihn. Ohne JavaScript stehen beide Bilder mit Alt-Text da. Inline-Handler sind hier
nur der Kürze halber; im Projekt gehört das in ein `<script>` der Komponente, sonst bricht es
eine strenge Content-Security-Policy.

### 2.5.8: Zielgröße

```css
/* Vorschlag für tokens.css, dort im :root */
--ziel-min: 1.5rem;     /* 24 px: WCAG 2.5.8, Untergrenze überall */
--ziel-touch: 2.75rem;  /* 44 px: Agenturstandard unter dem Mobil-Breakpoint */

.icon-link { min-inline-size: var(--ziel-min); min-block-size: var(--ziel-min); }
@media (width < 54rem) {
  .icon-link, .karussell-punkt { min-inline-size: var(--ziel-touch); min-block-size: var(--ziel-touch); }
}
```

24 px ist die Pflicht, 44 px auf Touchbreiten ist die strengere Hausregel, die
`scripts/pruefe-breakpoints.mjs` unter 861 px prüft. Ausgenommen sind Links im Fließtext.
Ein kleines Symbol kann bleiben, wenn der klickbare Bereich (Padding) groß genug ist.

### 3.2.6: Konsistente Hilfe

Telefon, E-Mail, Kontaktformular und Chat stehen auf jeder Seite an derselben Stelle der
Reihenfolge. In Astro heißt das: der Kontaktblock lebt einmal im Layout
(`src/layouts/Basis.astro`) und nicht als Kopie je Seite. Fehlt er auf einer Seite (Landingpage
ohne Navigation), dann ganz, nicht an anderer Stelle. Das deckt sich mit der Conversion-Regel
eines einheitlichen Primär-CTA aus `06-conversion-architektur.md`.

### 3.3.7: Redundante Eingabe

| Statt | So |
|---|---|
| Schritt 3 fragt die E-Mail-Adresse aus Schritt 1 noch einmal ab | Wert aus Schritt 1 übernehmen, als Zusammenfassung zeigen, änderbar |
| Rechnungsadresse neu eintippen | Checkbox „Wie Lieferadresse", vorausgewählt |
| Feld „E-Mail-Adresse wiederholen" | streichen; als Sicherheitsausnahme nennt das W3C das Wiederholen eines neuen Passworts, nicht der E-Mail-Adresse |

Autovervollständigen des Browsers zählt nicht: die Seite selbst muss die Angabe anbieten.
Zurück ohne Datenverlust und der Zwischenstand im Browser samt Rechtsrahmen stehen in
`58-formulare-und-anfragestrecken.md`, Abschnitt „Mehrstufig".

### 3.3.8: Anmelden ohne Gedächtnistest

| Regel | Grund |
|---|---|
| `autocomplete="username"` und `autocomplete="current-password"` an den Feldern | Passwortmanager füllen aus; das ist ein vom W3C ausdrücklich genannter Weg, das Kriterium zu erfüllen |
| Einfügen nie sperren | wer einen Passwortmanager außerhalb des Browsers nutzt, kopiert |
| Einmalcode in **einem** Feld mit `autocomplete="one-time-code"` und `inputmode="numeric"` | sechs Einzelfelder nehmen beim Einfügen nur die erste Ziffer |
| Kein Text- oder Rechen-Captcha im Anmeldeweg | ein Rätsel ist genau der Test, den das Kriterium ausschließt. 3.3.8 gilt nur für die Anmeldung; im Kontaktformular ist ein Captcha schon nach `06-conversion-architektur.md` ersetzt durch Honigtopf, Zeitfeld und Rate-Limit |
| Anmeldung per Link in der E-Mail oder Passkey als Alternative, wo es einen Login gibt | kein Gedächtnistest überhaupt |

## Schritt 4.6: Medien

| Medium | Pflicht | Umsetzung |
|---|---|---|
| Video mit Ton, vorproduziert | Untertitel (1.2.2, A), Audiodeskription (1.2.5, AA) | `<track kind="captions" srclang="de" label="Deutsch" default>`; Audiodeskription entfällt praktisch, wenn alles Sichtbare auch gesagt wird. Automatische Untertitel gegenlesen |
| Video ohne Ton mit Information | Textalternative oder Tonspur (1.2.1, A) | Beschreibung neben dem Video |
| Podcast, Audio | Transkript (1.2.1, A) | als Text auf der Seite, nicht als PDF |
| Livestream | Live-Untertitel (1.2.4, AA) | beim Anbieter des Streams einplanen, nicht nachträglich |
| Hintergrundvideo im Heldenbereich | Pause (2.2.2, A), bei Ton ab 3 Sekunden Stopp oder Lautstärke (1.4.2, A) | sichtbarer Pausenknopf, ohne Ton, bei `prefers-reduced-motion: reduce` nur das Posterbild |
| Eingebettetes YouTube- oder Vimeo-Video | wie oben, zusätzlich Consent | Zwei-Klick-Lösung nach `07-recht-dsgvo.md`; der Platzhalter ist ein Button mit Namen |

Ein Hintergrundvideo ohne Pausenknopf reißt 2.2.2 auch dann, wenn es dekorativ gemeint ist:
das Kriterium fragt nach Bewegung, nicht nach Bedeutung.

## Prüfwerkzeuge

| Werkzeug | Prüft |
|---|---|
| axe DevTools / Lighthouse | automatisierbare Regelverstöße (deckt ~30–40 % ab) |
| WAVE | visuelle Übersicht, Kontrast, Struktur |
| Screenreader (NVDA/Windows, VoiceOver/Mac) | was wirklich vorgelesen wird |
| Tab-Durchlauf von Hand | Reihenfolge, Sichtbarkeit, Fallen |
| `scripts/pruefe-geo.mjs` nach dem Build | Bilder ohne `alt`-Attribut (Fehler), fehlende oder doppelte `h1`, übersprungene Ebenen |
| `scripts/pruefe-kontrast.mjs --paare` | Farbpaare außerhalb der Rollen: Text auf Bildabdunklung, Hoverzustände, Badges |

Automatische Tests finden nur einen Teil. Der Tab-Durchlauf und ein Screenreader-Durchgang
über die Hauptwege sind Pflicht, kein Extra.


Die vollständige Prüfliste je Erfolgskriterium, mit Zuordnung zu Skript oder Handprüfung,
steht in `../assets/checklisten/wcag22-audit.md`.

## Herkunft und was bewusst nicht übernommen wurde

Die Schritte 4.4 bis 4.6 destillieren zwei Quellen: die Web-Skills aus
[accessibility-agents](https://github.com/Community-Access/accessibility-agents) (MIT) zu
Dialogen, Tastatur, ARIA, Live-Regionen, Formularen und Medien, und den Skill
`accessibility-review` aus dem Plugin `design` in
[knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) (Apache 2.0).
Stufen und Nummern der Erfolgskriterien sind gegen die Quelltexte der WCAG 2.2 im
Repository des W3C geprüft, nicht aus den Quellen übernommen. Diese Punkte wurden nicht
übernommen oder umgedreht:

| Quelle sagt | Hier gilt | Grund |
|---|---|---|
| WCAG 2.1 AA als Maßstab, Zielgröße nach 2.5.5 mit 44 × 44 px als AA (knowledge-work-plugins) | WCAG 2.2 AA; Zielgröße nach 2.5.8 mit 24 × 24 px als Pflicht, 44 px als Hausregel auf Touchbreiten | 2.5.5 ist Stufe AAA. Wer 44 px als AA ausgibt, beruft sich auf die falsche Norm, auch wenn der Wert gut ist |
| Konsistente Hilfe (3.2.6) als Stufe AA (accessibility-agents) | Stufe A | so steht es im Normtext; der Fehler würde eine A-Lücke als AA-Befund einsortieren |
| Fokusdarstellung als 2.4.12 (accessibility-agents) | 2.4.12 ist Fokus nicht verdeckt (Erweitert), Fokusdarstellung ist 2.4.13, beide AAA | falsche Nummer, falscher Verweis im Bericht |
| `<dialog role="dialog" aria-modal="true">` immer zusammen | `<dialog>` mit `showModal()`, ohne die zwei Attribute | der Browser setzt beides selbst; Doppeltes driftet beim Umbau auseinander |
| Fokus beim Öffnen immer auf den Schließen-Button (aria-specialist) | Fokus nach Art des Dialogs (Tabelle in Schritt 4.4) | die Quelle widerspricht sich selbst; modal-specialist folgt dem Dialogmuster der W3C-Praxisleitfäden, das hier übernommen ist |
| Akkordeon als Button mit `role="region"`-Panel, Escape schließt | `<details>`/`<summary>`, Skriptvariante nur für die Überschriftennavigation | harte Grenze: die Seite bleibt ohne JavaScript bedienbar. Escape am Akkordeon erwartet niemand |
| Karussell mit Autoplay, wenn ein Stoppknopf da ist | kein Autoplay | strenger als die Quelle: bei `prefers-reduced-motion` entfällt es ohnehin, und eine automatisch wechselnde Folie wird nicht gelesen |
| Menü mit Pfeiltasten auf/ab als Muster für Navigation | Disclosure-Navigation mit Tab | `role="menu"` ist für Anwendungsmenüs; auf einer Website bricht es die Erwartung jedes Tastaturnutzers |
| Fehlerzusammenfassung mit `role="alert"` **und** Fokus darauf | Fokus darauf, kein `role="alert"` | sonst doppelte Ansage |
| `required` plus `aria-required="true"` „zur Verstärkung" | nur `required` | Ballast, und zwei Quellen derselben Wahrheit laufen auseinander |
| Toast verschwindet nach 5 Sekunden | wichtiger Inhalt bleibt, bis er geschlossen wird | WCAG 2.2.1; die Quelle nennt das Kriterium selbst und baut das Gegenteil |
| Skip-Link und Beispiele mit festen Farbwerten (`#000`, `#fff`) | Tokens aus `tokens.css` | harte Grenze: kein Wert ohne Token |
| Punktesystem 0 bis 100 mit Abzügen je Schwere und Konfidenz, Notenstufen A bis F | Befunde nach Schwere ordnen, ohne Punktzahl | die Gewichte sind gesetzt, nicht gemessen. Eine Zahl wie „78 von 100" sieht nach Messung aus und ist keine |
| Prozentangaben zur Abdeckung automatischer Tests und zur Genauigkeit automatischer Untertitel | keine neuen Zahlen | in der Quelle ohne Beleg; die vorhandene Angabe in „Prüfwerkzeuge" bleibt eine grobe Einordnung |
| `prefers-contrast` und `prefers-color-scheme` als Voraussetzung für WCAG-Konformität | freiwillig, nach `10-visuelle-richtung.md` | kein Erfolgskriterium der Stufen A und AA verlangt sie |
| NVDA-Add-ons, Office, PDF, EPUB, Desktop-Apps, GitHub-Abläufe, Ausgabe als JSON | nicht übernommen | betrifft keine Website; das Ausgabeformat gehört zu deren Agentensystem |

Die Originale sind nicht Teil des Plugins. Grund wie in `26-geschmack-und-ki-tells.md`: zwei
Regelwerke im Kontext lassen das Modell an genau den Stellen dieser Tabelle pendeln.

## Verwandte Kapitel

- `55-typografie-system.md`: Schrift in rem und zoomfest, geprüft von `pruefe-typografie.mjs`
- `10-visuelle-richtung.md`: Farbrollen und die Kontrastregel der Markenpalette
- `02-design-ux.md`: Sticky-Kopf, `scroll-padding`, Hover und Zustände
- `06-conversion-architektur.md`: Formularlänge, vier Zustände, Spamschutz ohne Captcha
- `58-formulare-und-anfragestrecken.md`: Ablauf bei Fehlern, mehrstufige Formulare, `autocomplete` je Feld
- `12-copywriting.md`: Fehlertexte und Buttontexte
- `18-motion-handschrift.md`: reduzierte Bewegung, Menüsymbol
- `07-recht-dsgvo.md`: Consent für eingebettete Medien
- `../assets/checklisten/wcag22-audit.md`: Prüfliste je Erfolgskriterium
- `../assets/checklisten/design-kritik.md`: Barrierefreiheit als Teil der Designkritik
