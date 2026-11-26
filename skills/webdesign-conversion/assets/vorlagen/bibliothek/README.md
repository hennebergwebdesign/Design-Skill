# Template-Bibliothek

Hundertelf eigenständige Seitenvorlagen, branchenneutral, ohne Build, ohne Abhängigkeit, ohne Fremdserver. Jede Vorlage ist ein Ordner
(`t01` bis `t111`, Überblick in `index.html`) mit `index.html`, `marke.css`, `stil.css` und `INFO.md`. Gemeinsam genutzt wird `_basis/`.

## Benutzen

1. `index.html` dieses Ordners im Browser öffnen (Galerie, nur für den internen Gebrauch). Filter nach Helligkeit und Branche, Vorschau wahlweise Desktop oder Mobil. Eine Vorlage öffnet in einem neuen Tab (`ansicht.html`), zuerst in der Desktopansicht, mit Umschalter Tablet und Mobil, **Marke testen** (Akzent, Schriften, Ecken live überschreiben, Werte für `marke.css` kopieren, Kontrastwert) und **Vorlage übernehmen** (kopiert den `cp` Befehl für Vorlage und `_basis`). Die Markenvorschau ändert keine Datei.
2. Den Ordner der Vorlage samt `_basis/` in das Projekt kopieren. Die Pfade sind relativ (`../_basis/…`), beide Ordner bleiben nebeneinander.
3. **Marke einsetzen:** nur `marke.css` der Vorlage ändern (Farben, Radien, die zwei Schriftzeilen). Alle Gestaltung zieht ihre Werte aus diesen Tokens.
4. Texte und Bilder ersetzen. t01 bis t28 bringen Beispielfotos mit (`tNN/bilder/`, Nachweis in `tNN/BILDER.md`, selbst gehostet, Unsplash Lizenz). Sie zeigen die Wirkung und sind für die Auslieferung zu ersetzen oder je Kunde neu zu prüfen. Wo noch Platzhalterflächen stehen (`class="bild" data-platzhalter="…"`, so in t30 bis t33 und in einzelnen Plätzen anderer Vorlagen), dort `<img>` einsetzen. Die Regeln dazu stehen in `BILDSUCHE-PROMPT.md`.
5. Vor der Auslieferung die Prüfskripte des Plugins laufen lassen (`pruefe-striche`, `pruefe-kontrast`, `pruefe-seitenbasis`, `pruefe-breakpoints`).

In ein Astro-Projekt übernehmen: `index.html` in eine Seite überführen, `_basis/` und `marke.css` nach `public/` oder `src/styles/`, Schriften in
`public/fonts/`. Das Gerüst des Bauablaufs liefert Kopf, Fuß, Rechtstexte und Consent, die Vorlagen liefern die Gestaltung der Startseite.

## Varianten

Hat eine Referenz mehrere Startseiten, ist es **ein** Template mit Varianten: `tNN/index.html` ist Variante 1, `v2.html` und `v3.html` die weiteren. Marke (`marke.css`) und Gemeinsames (`stil.css`, `stil.js`) gelten für alle, das Besondere liegt in `stil-v2.css` und `stil-v3.css`. In `ansicht.html` erscheint die Variantenauswahl in der Leiste (`?t=t42&v=2`), in der Galerie das Abzeichen „n Varianten“. Varianten tragen t34, t38, t42, t47, t53, t54, t56 und t64. Eine neue Variante eintragen: Datei anlegen, Namen in `tNN/KARTE.json` unter `varianten` ergänzen und in `ansicht.html` in der Zuordnung `V` nachtragen.

## Conversion Raster (Stand 25.11.2026)

Jede Vorlage und Variante erfüllt nach dem Website Conversion Playbook 2027 (That's it. Marketing) diese messbaren Punkte, jeweils im eigenen Stil der Vorlage umgesetzt:
Titel höchstens 60 und Beschreibung höchstens 160 Zeichen, Primär-CTA in der Kopfzeile und mindestens zweimal je Seite, Hauptnavigation höchstens 6 Punkte, Telefon sichtbar, Einwand-FAQ (`details`, Antworten als Beispiel markiert), Kontaktformular höchstens 5 Felder mit Feldhinweis unter E-Mail und Telefon (`.feld__hinweis`, mindestens 16 px), Bilder höchstens 200 KB, Heldformel als Kommentar vor der H1. Nicht übernommen: F-Muster (Fehlbild), Exit-Intent-Popup, Kennzahlen des Playbooks (unbelegt). Beispielbelege im Held tragen `data-beispiel`. Nachprüfen: `node scripts/bibliothek-conversion.mjs` (alle Vorlagen, oder `t69 t70` einzeln, `--ab t69`) zählt Title, Description, h1, Navigationspunkte, `tel:`, `details`, Felder je Formular, Feldhinweis, Primär CTA in Kopfzeile und mindestens dreimal auf der Seite und Bildgewicht (Fehler) sowie Heldformel als Kommentar und JSON-LD (Warnung). Die Prüfung ist bei jeder neuen Vorlage und Variante zu laufen, bevor sie eingetragen wird. Für t01 bis t68 meldet sie teils fehlende Feldhinweise, weil dort eine andere Klasse verwendet wurde; das ist nicht nachgemessen.

## Was sie sind und was nicht

* **Eigenständige Umsetzung** nach dem Prinzip von rund siebzig Referenzseiten (Aufbau, Raster, Sektionsfolge, Art der Bewegung). Kein Text, kein Bild,
  kein Icon, kein Code der Referenzen ist übernommen. Die Referenzen sind in `HERKUNFT.md` genannt und wurden vom Inhaber zur Erfassung freigegeben.
* **Keine fertigen Seiten:** Beispieltexte sind Platzhalter, Beispielzahlen sind keine Belege. Rechtstexte, Consent, Formularversand, echte Bilder und
  Meta-Angaben je Kunde fehlen bewusst.
* **Kein Ersatz für die Prüfung:** Jede Vorlage ist im Browser auf 390 und 1440 Pixel gesehen, nicht auf echten Geräten und nicht mit Screenreader.

## Vorschaubilder erneuern

Die Galerie lädt keine Seiten, sondern kleine WebP Bilder aus `vorschau/` (333 Dateien). Geladen wird nach Bedarf: die Desktopvorschau beim Scrollen, die Abschnittsübersicht erst beim Überfahren, die Mobilansicht erst nach dem Umschalten (gemessen: 24 Bilder beim Öffnen, 1 beim Überfahren). Nach einer Änderung an einer Vorlage neu erzeugen, aus dem Repository Stamm: `node scripts/bibliothek-vorschau.mjs` (braucht Playwright, startet einen lokalen Server, Bewegung auf reduziert).

## Bewegung

`_basis/bewegung.js` liefert Einblenden (`data-zeig`), Staffelung (`data-staffel`), Zählen (`data-zaehle`, Endwert steht im HTML), Fortschritt für
Sticky-Abschnitte (`data-fortschritt`), leichte Parallaxe (`data-parallax`), Menü (`data-menue`) und Akkordeon (`data-exklusiv`). Dazu: Abschnittsanzeige im Menü (Hauptmenü-Links auf `#Anker` bekommen `aria-current="location"`, automatisch), Wortlicht (`data-licht` an einer Überschrift mit reinem Text, Wörter hellen beim Scrollen auf), Abdunkeln eines Bildabschnitts beim Scrollen (`data-abdunkeln`, setzt `--dunkel`) und Selbstlauf für Vorher Nachher Regler (`data-selbstlauf` am Rangefeld, bricht bei jeder Eingabe ab). Spezielle Bewegung steht in
`stil.js` der jeweiligen Vorlage. Bei `prefers-reduced-motion` und ohne JavaScript bleibt alles sichtbar und ruhig.

## Schriften

Selbst gehostet unter `_basis/schriften/` (Variablenschriften, Latein, Quelle Fontsource, SIL Open Font License 1.1): Archivo, Bricolage Grotesque, Familjen
Grotesk, Hanken Grotesk, Instrument Sans, Lexend, Manrope, Newsreader, Outfit, Schibsted Grotesk. Eine Markenschrift des Kunden wird in `marke.css` eingetragen
und selbst gehostet, nie über einen Anbieter geladen.

Herkunft, Messstand und Grenzen: `HERKUNFT.md`.
