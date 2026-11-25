# t68 Gastro warm und bewegt

Prinzip nach der freigegebenen Referenz lunabistro-template.webflow.io (Startseite), als Aufbau, Raster, Sektionsfolge und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen.

## Eignung
Restaurants, Bistros, Cafés und Imbisse mit Speisekarte, Tischreservierung und Catering, die mit Bewegung und großen Fotos Appetit machen. Lebt von gutem Bildmaterial (Speisen, Gäste, Küche, Terrasse). Ansprache im Du, für Sie im Text ersetzen. Zeigt die Karte in einem Raster mit Reitern, bei langen Karten stattdessen eine eigene Kartenseite verlinken.

## Sektionsfolge
Schwebende Kopfleiste, Held (zentrierte Überschrift mit kleinem Bild im Satz, zwei Knöpfe, Telefon), Bühne mit Bild, das beim Scrollen auf volle Breite wächst, Großschrift mit gekippten Fotos, Geschichte (Zeichen, Leitsatz, zwei kleine Fotos am Rand), Vorzüge als Kartenzeile, Speisekarte (Reiter, neun Karten mit Zutaten zum Aufklappen), Team in weißer Karte, gekipptes Galerieraster mit Textkachel, Stimmen in dunkler Karte mit Wischspur, Kontakt (Daten, Reservierungsformular, Folgen), Vollbild mit Catering und Lieferung, Fragen, Fuß mit Welle, Standorten, Mailanmeldung und großer Wortmarke.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Bild wächst beim Scrollen von etwa einem Drittel auf volle Breite, die Bühne bleibt dabei stehen (ab 768 px) | `data-fortschritt`, CSS (`transform`, `position: sticky`) |
| Großschrift | Überschrift steht fest, sechs gekippte Fotos fahren mit unterschiedlicher Geschwindigkeit darüber (ab 768 px) | `data-fortschritt`, CSS |
| Vorzüge | Titel und Karten wandern beim Scrollen nach links (ab 992 px, darunter Wischspur) | `data-fortschritt`, CSS |
| Geschichte | zwei Randfotos driften leicht gegen die Scrollrichtung | `data-parallax` |
| Speisekarte | Reiter filtern, Karte hebt sich beim Überfahren, Zutaten klappen auf, Escape schließt | `stil.js`, CSS |
| Galerie | Raster ist gekippt und richtet sich beim Scrollen auf, Spalten driften gegenläufig | `stil.js` (`--gerade`), `data-parallax` |
| Stimmen | Wischspur mit Pfeilknöpfen, ohne JavaScript wischbar | `stil.js` |
| Fragen und Standorte | Akkordeon, ein Eintrag offen | `details` mit `data-exklusiv` |
| Abschnitte | Einblenden und Staffeln, Menü als Panel auf dem Handy, Abschnittsanzeige im Menü | `bewegung.js` |

Bei reduzierter Bewegung, ohne JavaScript und auf dem Handy stehen die drei Bühnen als ruhiger Stapel oder Wischspur, die Galerie ist gerade. Alles bleibt sichtbar und bedienbar. Ohne JavaScript scrollt die Kopfleiste mit.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (bewusst gleich `--akzent`), `--text`, `--text-leise`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie`, `--linie-dunkel`, `--akzent` (Tintenblau, Fläche mit hellem Text, auf Hell auch Text und Linie), `--akzent-text`, `--akzent-warm` (nur Zeichen: Sterne, Punkt, Lichtfleck), `--weiss`, `--schrift-titel` (Bricolage Grotesque), `--schrift-text` (Manrope), Radien, `--ton-1` bis `--ton-6` für Bildplatzhalter.

## Marke wechseln
Nur die Werte in `marke.css` ändern. Kontrast prüfen: `--akzent-text` auf `--akzent`, `--text-leise` auf `--flaeche-alt` und Weiß, `--akzent` auf `--flaeche-alt`. Der Name "Markenname" steht an mehreren Stellen (Titel, Logo, Texte, Fuß); die große Wortmarke im Fuß ist auf zehn Buchstaben abgestimmt (`font-size` in `vw`, gedeckelt in `rem`), ein anderer Name braucht einen neuen Wert für `.fuss__marke`. Bildplatzhalter (`.bild[data-platzhalter]`) durch Fotos ersetzen, das Bild der Bühne darf ein kurzes Video sein (dann mit Pause nach WCAG 2.2.2). Beispielwerte (`data-beispiel`) durch echte Angaben.

## Offen
Formulare senden nichts. Gerichte, Preise, Zutaten, Bewertungswerte, Namen, Stimmen, Standorte und Lieferdienste sind Beispiele, keine Belege; Allergenkennzeichnung und Preisangaben (Preisangabenverordnung) sind je Betrieb zu ergänzen. Die Bühne mit dem wachsenden Bild und die Großschrift mit Fotos brauchen echte, helle bis mittlere Fotos, damit die Beschriftungen und die Überschrift lesbar bleiben; Kontrast von Text über Fotos nach dem Einsetzen neu prüfen. Die Kopfleiste verdeckt beim Anspringen eines Ankers den Abschnittsanfang um ihre Höhe (`scroll-margin-top` im Projekt ergänzen). Vier Links im Fuß und die Folgen Links sind Platzhalter.
