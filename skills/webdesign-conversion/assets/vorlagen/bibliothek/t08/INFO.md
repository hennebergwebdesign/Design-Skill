# t08 Bühnenkarten App

**Eignung:** Vorstellung einer App, eines Dienstes mit Plänen oder eines Programms mit Stufen, hell mit einem großen dunklen Block, Karten statt freier Flächen.

## Sektionsfolge
1. Kopf (Pille links, Wortmarke Mitte, Aktionen rechts) und Held aus zwei Karten
2. Telefon, das von Held in den dunklen Block ragt, dort Demo mit Video und drei gestapelten Funktionskarten
3. Anmeldung (Textkarte plus großes Bild mit QR Fläche)
4. Vorteile (große Karte mit Fotoreihen, vier kleine Karten)
5. Große Bildkarte mit Wochenkarten
6. Belohnungen (Telefon, Text, drei Zeilen)
7. Team in einer Karte auf Farbband
8. Stimmen (3 mal 3, mittlere Kachel dekorativ)
9. Personalisierung (dunkle Karte, helle Karte mit Uhr)
10. Preise (drei Stufen), FAQ (Gruppen), Abschlussblock, Fuß

## Animationen
- Einblenden und Staffeln über `data-zeig` und `data-staffel` (Basis)
- Textmarker unter der Hervorhebung wischt von links ein
- Video wächst beim Einscrollen (`stil.js`)
- Funktionskarten kleben (sticky) und sinken, wenn die nächste sie überdeckt (ab 62rem)
- Telefon im Held mit leichter Parallax, Ring und Batterie füllen sich beim Sichtbarwerden
- Marquee für Partner, Fotoreihen (gegenläufig) und Team, Funken im Abschluss
- Bei reduzierter Bewegung und ohne JavaScript steht alles in Endlage

## Tokens zum Umfärben (`marke.css`)
`--akzent`, `--akzent-text`, `--signal`, `--signal-text`, `--akzent-weich`, `--flaeche-alt`, `--flaeche-dunkel`, `--bild-a` bis `--bild-c`, Radien `--radius-karte`, `--radius-gross`, `--radius-klein`, Schriften `--schrift-titel` und `--schrift-text`.

## Bei Markenwechsel
Tokens und Schriften tauschen, Kontrast prüfen (Akzenttext auf Akzent mindestens 4,5 zu 1). Wortmarke `.logo` ersetzen, Texte, Preise, Namen und Stimmen durch echte, freigegebene Inhalte ersetzen. Alles mit `data-beispiel` ist Beispiel. Platzhalter `.bild` durch Bilder ersetzen.

## Grenzen
- Telefone, Uhr, QR und Batterie sind Flächen aus CSS, rein dekorativ. Die kleinen Texte darin sind nicht Teil des Inhalts (aria-hidden).
- Der Videoknopf ist ein Platzhalter ohne Funktion, Video samt Poster und Untertitel selbst einbinden.
- Gestapelte Karten kleben nur auf Desktop, mobil stehen sie untereinander.
- Das Team läuft als Band, das bei Hover pausiert; für Tastaturnutzer ist es nicht anhaltbar, bei Bedarf Pause Schalter ergänzen (WCAG 2.2.2).
