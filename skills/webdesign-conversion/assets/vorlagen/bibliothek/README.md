# Template-Bibliothek

Zwölf eigenständige Startseiten-Vorlagen, branchenneutral, ohne Build, ohne Abhängigkeit, ohne Fremdserver. Jede Vorlage ist ein Ordner
(`t01` bis `t12`, Überblick in `index.html`) mit `index.html`, `marke.css`, `stil.css` und `INFO.md`. Gemeinsam genutzt wird `_basis/`.

## Benutzen

1. `index.html` dieses Ordners im Browser öffnen (Galerie), eine Vorlage wählen.
2. Den Ordner der Vorlage samt `_basis/` in das Projekt kopieren. Die Pfade sind relativ (`../_basis/…`), beide Ordner bleiben nebeneinander.
3. **Marke einsetzen:** nur `marke.css` der Vorlage ändern (Farben, Radien, die zwei Schriftzeilen). Alle Gestaltung zieht ihre Werte aus diesen Tokens.
4. Texte und Bilder ersetzen. Bilder sind Platzhalterflächen (`class="bild" data-platzhalter="…"`), dort `<img>` einsetzen.
5. Vor der Auslieferung die Prüfskripte des Plugins laufen lassen (`pruefe-striche`, `pruefe-kontrast`, `pruefe-seitenbasis`, `pruefe-breakpoints`).

In ein Astro-Projekt übernehmen: `index.html` in eine Seite überführen, `_basis/` und `marke.css` nach `public/` oder `src/styles/`, Schriften in
`public/fonts/`. Das Gerüst des Bauablaufs liefert Kopf, Fuß, Rechtstexte und Consent, die Vorlagen liefern die Gestaltung der Startseite.

## Was sie sind und was nicht

* **Eigenständige Umsetzung** nach dem Prinzip von zwölf Referenzseiten (Aufbau, Raster, Sektionsfolge, Art der Bewegung). Kein Text, kein Bild,
  kein Icon, kein Code der Referenzen ist übernommen. Die Referenzen sind in `HERKUNFT.md` genannt und wurden vom Inhaber zur Erfassung freigegeben.
* **Keine fertigen Seiten:** Beispieltexte sind Platzhalter, Beispielzahlen sind keine Belege. Rechtstexte, Consent, Formularversand, echte Bilder und
  Meta-Angaben je Kunde fehlen bewusst.
* **Kein Ersatz für die Prüfung:** Jede Vorlage ist im Browser auf 390 und 1440 Pixel gesehen, nicht auf echten Geräten und nicht mit Screenreader.

## Bewegung

`_basis/bewegung.js` liefert Einblenden (`data-zeig`), Staffelung (`data-staffel`), Zählen (`data-zaehle`, Endwert steht im HTML), Fortschritt für
Sticky-Abschnitte (`data-fortschritt`), leichte Parallaxe (`data-parallax`), Menü (`data-menue`) und Akkordeon (`data-exklusiv`). Spezielle Bewegung steht in
`stil.js` der jeweiligen Vorlage. Bei `prefers-reduced-motion` und ohne JavaScript bleibt alles sichtbar und ruhig.

## Schriften

Selbst gehostet unter `_basis/schriften/` (Variablenschriften, Latein, Quelle Fontsource, SIL Open Font License 1.1): Archivo, Bricolage Grotesque, Familjen
Grotesk, Hanken Grotesk, Instrument Sans, Lexend, Manrope, Newsreader, Outfit, Schibsted Grotesk. Eine Markenschrift des Kunden wird in `marke.css` eingetragen
und selbst gehostet, nie über einen Anbieter geladen.

Herkunft, Messstand und Grenzen: `HERKUNFT.md`.
