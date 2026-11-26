# t109 Zahlung per Bank, Salbei und Tinte

Prinzip nach https://www.contiant.com/ (Startseite, eigene Aufnahme mit Playwright am 26.11.2026, Desktop 1440 und Mobil 390, nur Startseite), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Code, Marke, Schrift und Farbe sind eigen. Die Referenz ist ein Zahlungsdienst für Bankzahlung (Pay by Bank) in Nordamerika; hier ist es ein deutschsprachiges, branchenneutrales Fintech Angebot mit Beispielwerten.

## Eignung
Zahlungsanbieter, Fintech Start ups und Händler, die Bankzahlung (Open Banking, Zahlungsauslösung per Banklogin) anbieten oder vermitteln: Onlinehandel, Aufladen und Guthaben, Ratenkauf, Geldanlage, Versicherung. Auch für B2B Software mit Schnittstelle, die Produktoberflächen zeigen will und als Hauptaktion eine Demo verkauft. Ansprache im Sie. Lebt von Produktkarten aus HTML und braucht keine Fotos. Abgesetzt von t39, t42, t53, t54, t73, t74 (Finanz) und t44, t45, t49, t70, t78 (Software) durch gekippte Oberflächenkarten im Held, dunkle Tafel mit gestapelten Karten, eine Bühne, die beim Scrollen die Oberfläche wechselt, und die Farben Salbei, Butter und Tinte mit Orange als einziger Hauptfarbe.

## Sektionsfolge
Kopfleiste (mitlaufend, Telefon, Demo Knopf), Held (Satz links, rechts drei gekippte Karten: Bankwahl, Warenkorb, Bestätigung), Bankzeile mit Beispielzeichen, dunkle Tafel "Zu hohe Kartengebühren?" mit drei sich stapelnden Karten, Anschluss Diagramm (vier Banken, ein Knoten, Shop), sandfarbene Tafel mit drei gekippten Karten (Kontodaten), Telefon mit Zahlungsformular und Farbwahl, Zahlweg im Vergleich (Umschalter Bankzahlung gegen Karte), Schnittstellen Bühne (Code, Umsatzliste, Auswertung), sechs Branchen, Fragen (Akkordeon, sechs Einträge), Kontakt auf dunkler Tafel mit Ringen und Formular, Fuß mit drei Spalten.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Satz blendet gestaffelt ein, die drei Karten schweben nacheinander herein (je 0,9 s) | `data-zeig`, CSS `animation` mit `transform` und `opacity` |
| Held, Signatur | die gekippte Szene folgt dem Zeiger um höchstens 6 Grad, nur mit Maus, bei reduzierter Bewegung steht sie still | `stil.js`, CSS `transform` über `--kx`, `--ky` |
| Vorteile | drei Karten stapeln sich beim Scrollen, der Satz rechts bleibt stehen | CSS `position: sticky`, ohne JavaScript |
| Anschluss | Bankkarten staffeln ein, der Knoten sendet dreimal einen Ring | `data-staffel`, CSS `transform`, `opacity` |
| Kontodaten | drei Karten stehen schräg und richten sich beim Überfahren und bei Fokus auf | CSS `transform`, nur mit `hover: hover` |
| Zahlungsformular | Farbwahl ändert die Farbe des Telefons (Grün, Orange, Tinte) | Radiofelder, CSS `:has()`, ohne JavaScript |
| Zahlweg | Umschalter blendet die drei Schritte des anderen Wegs ein | Radiofelder, CSS, ohne JavaScript |
| Schnittstelle, Signatur | die Tafel bleibt stehen, der Scrollweg wechselt zwischen Code, Umsatzliste und Auswertung, die Säulen wachsen | `stil.js` setzt `data-schritt`, CSS `opacity`, `transform` (nur ohne reduzierte Bewegung) |
| Branchen, Fragen | Einblenden gestaffelt, Plus dreht sich zum Kreuz | `data-staffel`, CSS `transform` |
| Kontakt | drei Ringe wachsen hinter dem Formular von hinten nach vorn | `data-zeig`, CSS `transform` |

Bei reduzierter Bewegung und ohne JavaScript steht alles sichtbar da: die Schnittstellen Bühne zeigt die drei Oberflächen untereinander, die Szene im Held steht still, die Menü Schaltfläche fehlt und die Navigation läuft über.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Tinte), `--text`, `--text-leise`, `--linie`, `--akzent` (Orange, Fläche mit dunklem Text), `--akzent-text`, `--salbei`, `--butter`, `--himmel`, `--sand` (vier Flächen), `--weiss`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--tinte-2`, `--fokus`, `--fokus-dunkel`, `--ok`, `--schrift-titel` (Familjen Grotesk), `--schrift-text` (Instrument Sans), Radien (`--radius-tafel` 32 px).

## Kontrast (selbst nachgerechnet, WCAG)
`--text` auf `--flaeche` 15,1 zu 1; `--text-leise` auf `--flaeche` 7,2, auf `--flaeche-alt` 6,6, auf Salbei 5,8, Himmel 5,9, Butter 6,0, Sand 5,6; `--akzent-text` auf `--akzent` 7,3; `--text-auf-dunkel` auf Tinte 14,2; `--text-leise-dunkel` auf Tinte 8,6; `--akzent` auf Tinte 6,0; Fokusring 7,6 (hell) und 9,3 (auf Tinte). Weißer Text steht nur auf `--ok` und Tinte (Telefonknopf, Haken).

## Marke wechseln
Nur `marke.css` ändern. Kontrast der Rollen neu prüfen (Zahlen oben). Der Akzent trägt dunklen Text, ein dunklerer Akzent braucht `--akzent-text` hell. Der Name "Markenname" steht in Titel, Logo, Fuß und JSON-LD. Das Zeichen (Dreieck auf Tinte) ist ein Platzhalter in `favicon.svg` und im `symbol` `i-zeichen`.

## Offen
Formulare senden nichts. Zahlen, Beträge, Referenznummern, Banknamen, Fragen und Antworten sind Beispiele, keine Belege; Bankzeichen sind neutrale Formen. **Rechtliches nicht geprüft:** Aussagen zu Rückbuchung, Echtzeitüberweisung, Gebühren, Zahlungserlaubnis (ZAG), starker Kundenauthentifizierung, Kontodaten und Einwilligung sind eigene Beispielformulierungen ohne Rechtsprüfung, ebenso die Anwendungsfälle Ratenkauf, Geldanlage und Versicherung; kein Rendite, Genehmigungs oder Erfolgsversprechen enthalten. Der Code im Fenster ist erfunden (Adresse `api.beispiel.invalid`), keine echte Schnittstelle. Kontrast von Text auf den gekippten Karten ist rechnerisch geprüft, nicht im Gerät; Safari, Screenreader und echte Geräte sind nicht geprüft; `:has()` für die Farbwahl braucht einen aktuellen Browser (sonst bleibt das Telefon grün). Die Schnittstellen Bühne ist auf dem Handy auf Titel der Schritte verkürzt, die Beschreibungen erscheinen dort erst in der Auflistung ohne Bewegung. Die Kopfleiste bleibt sichtbar, Anker nutzen `scroll-padding-top`. Die Referenz zeigt eine handgezeichnete Unterstreichung in Überschriften und Zweifarb Überschriften; beides ist als KI Tell nach Kapitel 26 bewusst nicht übernommen. Echte Bankzeichen und Fotos fehlen (keine Rechte, keine Bilder der Referenz verwendet).

## Conversion (Playbook)
- Held: Onlinehändler und Zahlungsverantwortliche im Mittelstand, Problem Kartengebühren, Rückbuchungen und Abbrüche beim Bezahlen, Lösung Zahlung per Banklogin über eine Schnittstelle, mit Demo
- H1 "Ihre Kunden zahlen direkt per Bank", Unterzeile nennt Banklogin, Meldung ans System und Gebühren vorab
- Primär-CTA "Demo anfragen" in Kopf, Held, Vorteile, Kontodaten, Zahlungsformular und Kontakt
- Titel mit Keyword und Musterstadt, Beschreibung mit Zielgruppe, Nutzen und Aufruf
- FAQ: Kosten, Sicherheit, Dauer der Anbindung, Rückerstattung, Banken, Erlaubnis (Beispielantworten gekennzeichnet)
- Formularziel: Demo (Name, Unternehmen, E-Mail, Telefon, Zahlungen im Monat), fünf Felder, Hinweise unter E-Mail und Telefon
- Beträge, Banken und Antworten als "Beispiel" gekennzeichnet
