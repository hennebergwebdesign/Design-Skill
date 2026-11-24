# Lehrpfad

**Eignung:** Online-Kurs, Weiterbildung, Akademie oder Workshopreihe mit festem Lehrplan, Dozentin, Teilnehmerstimmen und einem Preis. Hell mit dunklen Inseln, ruhig und klar, branchenneutral als Kursvorlage.

## Sektionsfolge
1. Kopfzeile: schwebende dunkle Pille, Logo, Menü, Knopf, mobil Burger mit aufklappendem Panel
2. Held: Bewertung mit Avataren, Überschrift, Text, Knopf, großes Bildfeld mit drei Zählern und Bildunterschrift
3. Vertrauen: Laufband mit Beispiellogos
4. Vorteile: Wortlicht-Überschrift, sechs Karten mit Bildfeld
5. Lehrplan (dunkle Insel): fünf Module als Akkordeon, rechts Preiskarte (Sticky) mit Leistungsliste
6. Zielgruppe: vier Karten um ein hohes Bildfeld
7. Dozentin: dunkle Karte mit Text, Fakten und Bildfeld
8. Stimmen: Mauerwerk aus Karten (Video, hell, dunkel), gekürzt mit Mehr anzeigen
9. Vorher und Nachher: eine helle, eine dunkle Karte, Knopf
10. Fragen: Akkordeon mit fünf Einträgen, Telefon und Anfrage
11. Abschluss: Bildpanel mit Überschrift, Knopf und Bewertung
12. Fuß: dunkle Insel mit Kontakt, Links, Impressum, Datenschutz, Beispielformular

## Animationen
- Kopfzeile blendet beim Scrollen nach unten aus und nach oben ein (Menü offen oder Fokus drin: bleibt sichtbar).
- Held: Überschrift läuft Wort für Wort ein, Bildfeld wächst beim Scrollen von 90 auf 100 Prozent (`--z`), der Knopf bleibt als Sticky oben stehen, bis das Bildfeld endet, Zähler laufen beim Sichtbarwerden (`data-zaehle`).
- Überschriften der Abschnitte füllen sich Wort für Wort (`data-licht`).
- Karten blenden gestaffelt ein, Vorher und Nachher kommen von links und rechts, Dozentin skaliert ein.
- Preiskarte bleibt beim Scrollen durch den Lehrplan stehen (ab 64 em).
- Module und Fragen: Plus wird zum Minus, Inhalt blendet ein, jeweils nur eines offen.
- Laufband der Logos, bei Hover pausiert. Parallax im Abschlussbild.
- Bei `prefers-reduced-motion` und ohne JavaScript: alles sichtbar und ruhend, Stimmen ungekürzt.

## Tokens zum Umfärben (`marke.css`)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--akzent` und `--akzent-text`, `--akzent-hell` (Akzent auf Dunkel), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--fokus`, `--stern`, Radien, `--schrift-titel` und `--schrift-text` (Bricolage Grotesque, Instrument Sans).

## Marke wechseln
Tokens in `marke.css` setzen, Kontrast prüfen, Schrift aus `schriften.css` wählen, Platzhalterbilder (`.bild[data-platzhalter]`) durch Kundenfotos ersetzen, Beispiellogos durch echte ersetzen, alle Texte, Zahlen, Preise, Namen, Zitate, Telefon und Adresse (`data-beispiel` und Hinweise mit Beispiel) durch freigegebene Angaben ersetzen.

## Grenzen
- Alle Zahlen (Bewertung, Teilnehmende, Abschlussquote, Preis, Garantie), die Dozentin und alle Stimmen sind Beispiele, keine Belege.
- Bildfelder sind Verläufe aus Tokens, keine Fotos. Das Videofeld hat keinen Player, das Play-Zeichen ist Dekoration.
- Formular im Fuß sendet nichts. Knöpfe führen zu Ankern, es gibt keinen Bezahlvorgang.
- Die Zähler zeigen kurz den Endwert, bevor sie von vorn zählen (Verhalten von `bewegung.js`).
- Stimmen hinter Mehr anzeigen sind gekürzt, nicht ausgeblendet; ohne JavaScript stehen sie offen.
- Icons: Phosphor Icons (MIT, Lizenz in `_basis/icons/LICENSE-Phosphor.txt`), durchgehend Strichstärke light, Sterne fill, als Inline-Sprite.
