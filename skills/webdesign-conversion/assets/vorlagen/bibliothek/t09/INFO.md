# Vorlage t09: Frische Dienstleistung

**Eignung:** Dienstleister mit Privat- und Gewerbekunden und klarem Preisrahmen (Reinigung, Pflege, Haushaltsnahes, Wartung), der Termin und Vertrauen auf einer langen, freundlichen Startseite verkauft.

## Sektionsfolge
1. Kopf mit schwebender Menüpille und Kontaktknopf (Burger mobil)
2. Held: große gerundete Bildfläche mit Überschrift, Satz, Knopf
3. Aussagenband (Akzent, laufend)
4. Über uns: vier nummerierte Vorteile um ein hohes Mittelbild
5. Leistungen (dunkel): Bild links, drei Einträge rechts, aktiver Eintrag in Akzent, Preisschild auf dem Bild
6. Aussagenband (Akzent, Gegenrichtung)
7. Team: vier Bildkarten mit dunkler Namensleiste
8. Preise: Überschrift links, zwei Karten, die zweite leicht gedreht, treibende Kreise
9. Aussage auf Bildfläche mit zwei hervorgehobenen Wörtern
10. Stimmen: laufende Kartenreihe mit Sternen
11. Termin: dunkles Formular mit Eckband, daneben Bild mit Wechselaussage und Pfeilen
12. Aussagenband (dunkel)
13. FAQ: Akzentkarte links, Akkordeon rechts
14. Vorher und Nachher: Vergleichsregler
15. Fuß mit Schnellzugriff, Kontakt und riesigem Markennamen

## Animationen
- Einblenden beim Scrollen (`data-zeig`, gestaffelt, von links, rechts oder skaliert), Held beim Laden
- Drei Laufbänder und die Stimmenreihe (Pause bei Hover)
- Versatz der Vorteilskarten und des Aussagengrundes beim Scrollen, nur breit (`stil.js`)
- Leistungsreiter: Überblenden des Bildes, Preisschild wechselt (Klick, Maus, Pfeiltasten)
- Aussagenwechsel mit Pfeilen, Vergleichsregler (Tastatur über echtes Rangefeld), Plus im Akkordeon dreht, schwebende Kreise
- Reduzierte Bewegung: alles steht, Bänder laufen nicht. Ohne JavaScript bleibt der Inhalt sichtbar.

## Tokens zum Umfärben (`marke.css`)
`--akzent`, `--akzent-hell` (Akzent auf Dunkel), `--akzent-zart` (Kopfband, aktiver Menüpunkt), `--flaeche-dunkel`, `--flaeche-dunkel-2`, `--flaeche-alt`, `--stern`, `--platz-1` bis `--platz-4` (Tonwerte der Platzhalterbilder), Radien, zwei Schriften (Outfit und Hanken Grotesk).

## Marke wechseln
Tokens setzen, Kontrast prüfen (weiße Schrift auf `--akzent` mindestens 4,5 zu 1, `--akzent-hell` auf Dunkel mindestens 3 zu 1), Markennamen in Kopf und Fuß tauschen, alle `.bild` durch Fotos ersetzen (`data-platzhalter` entfernen), Marker `data-beispiel` (Preise, Team, Stimmen, Eckband, Preisschild) durch echte Angaben ersetzen, Preise und Leistungsnamen in `index.html` und die drei Preistexte in den `data-preis` anpassen, Aussagen in `stil.js` (Liste `saetze`) und im Laufband ersetzen, Formular an den Bauablauf anbinden (Einwilligung, Versand).

## Grenzen
- Formular ist nur Oberfläche, ohne Versand. Alle Texte, Namen, Preise und Stimmen sind Beispiele, keine Belege.
- Das Aussagenband setzt die Schrift dekorativ und ist für Hilfstechnik ausgeblendet; der Inhalt darf nicht nur dort stehen.
- Der Markenname im Fuß skaliert nach Breite des Textes "Markenname"; bei längerem Namen Divisor in `.fuss__marke` anpassen.
- Mehr als drei Leistungen oder Aussagen erfordern Anpassung von HTML und `stil.js`.

## Icons
Phosphor Icons (MIT), durchgehend Strichstärke fill, als Sprite am Seitenanfang (Lizenz in `../_basis/icons/LICENSE-Phosphor.txt`). Die Laufbänder tragen Aussagen statt Kundenlogos, deshalb gibt es in dieser Vorlage keine Logoleiste; wer eine ergänzt, nimmt die Beispiellogos aus `../_basis/logos/` (Beispiel in `t07`).
