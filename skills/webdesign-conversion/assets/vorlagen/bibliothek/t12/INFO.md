# Klarwerk (t12)

**Eignung:** lokale Dienstleister mit Leistungsliste, Paketpreisen und Terminanfrage (Haushalt, Betrieb, Handwerk mit wiederkehrendem Einsatz), hell mit dunklen, abgerundeten Flächen.

## Sektionsfolge
Kopf mit Burger, Held (dunkle Fläche, Zweispalter, Bilderband, vier Kennzahlen), Logoleiste, Über uns (Bild mit schwebender Karte, Häkchenliste), Warum wir (2 mal 2 Karten versetzt), Leistungen (dunkel, nummerierte Zeilen mit Plus, Akkordeon), Ablauf (drei versetzte Karten), Preise (helle Grünfläche, Takt-Umschalter, drei Pakete), Stimmen (Bild plus dunkle Zitatkarte mit Pfeilen), Laufband, Fragen (Akkordeonkarten), Kontakt (dunkles Formular, Kontaktzeilen), Fuß mit Newsletter.

## Animationen
Zeilenweises Aufsteigen der H1 beim Laden; Einblenden und Staffelung (data-zeig); Zähler in den Kennzahlen (Endwert im HTML); Bilderband driftet beim Scrollen (stil.js); schwebende Karte; Pfeilkreis dreht beim Hover; Plus dreht, Titel rückt ein; Preis tickt beim Umschalten; Zitate blättern; Laufband; mobil kleben die Ablaufkarten gestapelt (sticky). Bei reduzierter Bewegung ruht alles, ohne JavaScript bleibt der Inhalt sichtbar.

## Umfärben (nur marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--lebhaft` (Aktion auf Dunkel), `--lebhaft-text`, `--gruen` (Akzentwörter auf Hell), `--bild-*` (Platzhalterverläufe), `--radius-*`, Schriften `--schrift-titel` und `--schrift-text`. Kontrast nach Wechsel prüfen: `--gruen` auf `--flaeche` und `--flaeche-alt`, `--lebhaft` auf `--flaeche-dunkel`.

## Bei Markenwechsel
Name und Stern im Logo (Symbol `#stern`, drei Stellen), Texte, Bilder (`.bild` mit `data-platzhalter` durch `<img>` ersetzen), Logoleiste nur mit echten, freigegebenen Logos, Kennzahlen, Preise, Zitate und Kontaktdaten ersetzen; alles mit `data-beispiel` ist Beispiel.

## Grenzen
Formulare senden nichts (stil.js verhindert das Absenden, Backend und Einwilligung fehlen). Kennzahlen, Preise, Bewertung und Zitate sind Platzhalter, keine Belege. Preisumschalter braucht JavaScript (ohne bleibt Takt "einmalig" sichtbar). Impressum und Datenschutz sind nur Linkplatzhalter.
- Icons: Phosphor Icons (MIT), durchgehend die Strichstärke fill (gefüllt, wie die Referenz), als Sprite im HTML (Lizenz: `../_basis/icons/LICENSE-Phosphor.txt`). Die Logoleiste zeigt erfundene Beispiellogos aus `../_basis/logos.css`, durch echte, freigegebene ersetzen.

## Conversion (Playbook)

- Held: Hausbesitzer und kleine Betriebe mit liegengebliebenen Mängeln, Lösung Handwerker mit festem Termin
- Primär-CTA überall "Termin anfragen" (Kopf, Held, Abschnitte, Pakete, Formular)
- Titel "Handwerker Musterstadt | Reparatur und Umbau | Klarwerk", Beschreibung mit Problem und Handlungsaufforderung
- FAQ aus Handwerkssicht: Anwesenheit, Kosten des Wartens, Ablauf, fester Preis, Arbeit im laufenden Betrieb (alles Beispielantworten)
- Formularziel: Terminanfrage mit Art des Auftrags und Schilderung des Mangels, fünf Felder
- Beleg im Held: Bewertung als Beispiel markiert; Formularhinweise: Terminbestätigung, kein Werbeanruf
