# t74 Finanz Pastell

Prinzip nach einer Referenz des Inhabers (Pinterest Screenshot einer Finanzsoftware Startseite, hell, keine Adresse bekannt), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Gestaltungsprinzip: weiße Seite, helle Pastellkarten, in jeder Karte eine kleine Oberfläche des Produkts aus HTML, CSS und SVG, ohne Foto.

## Eignung
Haushaltsbuch, Zahlungs App, Finanzsoftware und Kontoverwaltung für Privatkunden in Deutschland. Eignet sich auch für Software für Vereine oder Kleinunternehmen, wenn die Funktionen sich als kleine Oberflächen zeigen lassen. Ansprache im Du, für Sie im Text ersetzen. Braucht keine Fotos. Abgesetzt von den Finanzvorlagen t17, t39 bis t43, t53 und t54 durch die Pastellkarten und die Oberflächen als Hauptbild.

## Sektionsfolge
Kopfleiste mit Menü in der Mitte, Textlink und dunkler Pille. Held zweispaltig (Etikett als Punkt mit Text, H1, Intro, Primärknopf, Telefon) mit Beispiel Oberfläche (Abokarte, Kontostand, Aktionen, Balkendiagramm mit Tooltip). Bewertungsband auf Hellgrau (drei Beispielwerte, neutrale Quellen). Überschrift, Karte A (Saldokarte in Limette mit Balken, Haken Punkte), Karte B (Abokarte und Ringdiagramm mit Kategorien). "Geld senden" mit drei Pastellkarten (Länderliste, Währungsliste, Freunde). Überschrift, Karte C (gekippte Kreditkarten, zwei Punkte), Karte D (Werkzeugkreis). Einwand FAQ. Marine Banner mit angeschnittenen Karten. Zwei Kacheln (Gesprächsformular auf Indigo, Demo auf Limette). Fuß mit vier Linkspalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held, Karte A | Balken wachsen beim Einblenden von unten, der Kontostand zählt hoch (Endwert im HTML) | `transform: scaleY`, `data-zeig`, `data-zaehle` |
| Held | Tooltip am gewählten Balken, Auswahl per Maus, Fokus und Tipp | `stil.js`, `aria-pressed`, `opacity` und `transform` |
| Karte B | Ringdiagramm füllt sich, die Segmente nacheinander | `stroke-dashoffset` (`pathLength="100"`) |
| Pastellkarten | gestaffeltes Einblenden, Anheben beim Überfahren (nur mit Maus) | `data-staffel`, `data-zeig`, `transform` |
| Währungsliste | genau ein aktiver Eintrag, Haken blendet ein | `stil.js`, `aria-pressed` |
| Karte C | Kreditkarten kippen beim Scrollen flacher | `stil.js` setzt `--kipp`, CSS 3D `transform` (`data-kipp`, statt `data-fortschritt`, weil die Karte kürzer als der Bildschirm ist) |
| Karte D | Werkzeugkreis dreht langsam (90 s), die Symbole drehen gegen und bleiben aufrecht | CSS `@keyframes`, `transform` |
| Banner | Karten fahren von links, der Text von rechts ein | `data-zeig`, `transform` |
| Fragen | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Menü | Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Das Akzentwort der Überschriften wird nicht farbig oder kursiv hervorgehoben (KI Tell nach Kapitel 26). Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy bleibt alles sichtbar, die Drehung steht still, die Kippung ist fest, die Balken stehen im Endzustand. Hover Effekte nur mit `@media (hover: hover)`.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Banner, flach), `--text`, `--text-leise`, `--linie`, `--akzent` (Marine, dunkle Pille mit hellem Text), `--akzent-text`, `--blau` (Zeichen, Balken, Knopf auf Dunkel), `--cyan` (nur Ende des Blau Verlaufs der Karte), `--limette` (nur Fläche, Text darauf dunkel), `--indigo` (flache Einzelfläche, nie Verlauf), `--pastell-blau`, `--pastell-gruen`, `--pastell-lila`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--schatten`, `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Hanken Grotesk), Radien.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent` (14,6 zu 1), Text auf `--limette` (13,2), Weiß auf `--indigo` (8,4), `--text-leise` auf Pastellflächen (mindestens 6,1), `--blau` auf Weiß (6,4), `--feld-rand` auf Weiß (3,7). Der Name "Markenname" steht in Titel, Logo, Texten, JSON-LD und Fuß. Die Aboanbieter "Klangbox" und "Filmkanal" sind erfundene Beispielnamen. Die Kreise mit Kürzeln (FR, PL, ES, AK, BM, CS) sind Platzhalter für Flaggen und Porträts.

## Offen
Formulare senden nichts, Turnstile ist als Kommentar vorgesehen. Alle Zahlen (Kontostand, Saldo, Beträge, Abopreise, Bewertungen 4,8 und 4,9, Bewertungsportale A bis C), alle Namen, Funktionen (Karte sperren, Meldung bei Zahlung, Länderliste, Umrechnung, Kontakte) und die FAQ Antworten sind Beispiele, keine Belege. **Rechtlich nicht geprüft:** Aussagen zu Zahlungsdiensten, Kontoverbindung, Gebühren, Kursen, Auslandsüberweisung, Datenspeicherung in der EU und Kündigung; Angaben zu Aufsicht und Erlaubnis (BaFin) sind bewusst nicht erfunden und gehören mit Impressum, Datenschutz, Preisangaben und Pflichtangaben je Anbieter ins Projekt. Keine Renditeversprechen in der Vorlage, so lassen. Die Vorlage hat keinen Preisabschnitt. Das JSON-LD (`SoftwareApplication`) trägt Beispielwerte und keine Bewertung. Gemessen: 390 und 1440 Pixel ohne Konsolenfehler und Überlauf, mit reduzierter Bewegung alles sichtbar, Kontrast der Hauptpaare nachgerechnet. Ungemessen: Safari, Screenreader, echte Geräte, Leistung der 3D Kippung auf schwachen Geräten. Der Kopf zeigt mobil "Kostenlos" ohne "starten" (Platz). Flaggen und Porträts fehlen bewusst. Fußlinks sind Platzhalter.

## Conversion (Playbook)
- Held: Menschen, die am Monatsende nicht wissen, wohin das Geld ging; Lösung ist eine App, die Umsätze sortiert und Sparziele zeigt
- H1 "Wohin ging dein Geld? Ab jetzt weißt du es", Unterzeile nennt Konto verbinden oder von Hand eintragen, Abos, Sparziele, Überweisungen
- Primär-CTA "Kostenlos starten" in Kopf, Held, Karte A, Karte B, Karte D, Fragen und Banner (sieben Stellen), Formular "Gespräch anfragen", Kachel "Demo ansehen"
- Titel 48 Zeichen, Beschreibung 123 Zeichen
- FAQ vor dem Banner: Kosten, Datensicherheit, Konto verbinden, Auslandsüberweisung, Kündigung (Antworten als Beispiel gekennzeichnet; die Referenz hat keine FAQ)
- Formular: vier Felder (Name, E-Mail mit Feldhinweis, Telefon freiwillig, Anliegen) und Bestätigungshinweis in einer der Kacheln
- Belege: Bewertungsband und alle Beträge tragen "(Beispiel)" oder `data-beispiel`
