# t127 Ökosystem aus Geräten und App

Prinzip nach https://www.mypifi.com/ (Startseite eines Geräte und App Systems für Haustiere, eigene Aufnahme mit Playwright bei 1440 und 390 Pixel, Seitenlänge gemessen 8435 px bei 1440), als Aufbau, Raster, Sektionsfolge, Dichte und Art der Bewegung nachgebaut. Text, Bild, Icon, Logo, Marke, Code, Schrift und Farbe sind eigen. Kein Bild und kein Text der Referenz ist gespeichert oder übernommen. Beispielbranche: Pflanzenpflege im Haushalt (Messstab, Gießstation, Pflanzenlicht, App).

## Kernprinzipien (aus der Referenz herausgearbeitet)
| Prinzip | Beleg | Status |
|---|---|---|
| Ein System statt eines Geräts: drei Produkte gleicher Kartenform, darüber eine Plattform (App, Auswertung), die sie verbindet | drei Karten à 451 x 649 px bei 1440, Radius 20 px, danach "Intelligenz" und "App" als eigene Abschnitte | beobachtet |
| Das Individuum zählt, nicht der Durchschnitt: Profil je Tier mit Erkennung als Leitidee der gesamten Seite | Überschrift und Merkmalsschilder im Abschnitt nach den Karten | beobachtet |
| Lebensaufnahmen füllen den Raum, die Oberfläche (Handy) liefert den Beweis | Held mit Handy auf Videobühne, Handyreihe 5 Stück | beobachtet |
| Zwei Schriftregister: Groteskschrift für Aussagen, Monospace für Erklärtext, dazu abgesetzte Pillen als Wegweiser | Fließtext 15 px Monospace, Titel 72 px, H3 33 bis 36 px | beobachtet |
| Schwebende dunkle Kopfleiste über allem, pastellener Seitenverlauf, Schlussbild plus Newsletter im dunklen Fuß | Kopf `position: fixed`, Abstand oben 40 px (mit Hinweisleiste), Seite mit Hintergrundbild | beobachtet |
| Wenig Pinning: Abschnitte laufen normal, Bewegung steckt in waagerechten Spuren (Auswertung, Stimmen, Partner) | keine `sticky` Sektion; Spuren mit Überlauf: 1956, 2146 und 1321 px Breite | beobachtet |
| Ruhe als Versprechen (Sorge abnehmen statt Technik zeigen) | Ton der Überschriften | abgeleitet |

Nicht erfasst: Videoinhalte und ihr Zeitverlauf, Hover, genaue Spurmechanik (Wischen oder Pfeile), Verhalten bei Zwischenbreiten, Animation beim Eintritt der Handys (unbekannt). Der Scan über `design-scan.mjs` lieferte in diesem Lauf nur eine andere Seite (Lauf im gemeinsamen Verzeichnis überschrieben, keine Playwright Messung), die Aussagen oben stammen aus der eigenen Playwright Erfassung.

## Eignung
Haushaltsprodukte mit mehreren Geräten und einer App, bei denen jedes Einzelne (Pflanze, Tier, Raum, Kind) einen eigenen Bedarf hat: Pflanzenpflege, Haustier, Garten, Smart Home, Aquaristik. Verkauft wird über Starterset und Beratung, die Seite führt von der Idee (Profil) über die Geräte und die App zum Rückruf. Ansprache im Du. Keine Heil oder Leistungsversprechen: die Seite nennt Messwerte und Hinweise, keine Wirkung auf die Pflanze. Abgesetzt von t111 (ein Produkt, eine Scrollgeschichte): hier ein System, helle Seite, Spuren statt Pinning.

## Sektionsfolge
Schwebende Kopfleiste; Held (bildfüllende Bühne, Messrahmen um die Pflanze, Handy mit Profil); Geräte (drei hohe Karten); Pflanzenprofil (Aussage mit Wortlicht, Merkmalsschilder, dunkle Bühne mit Profilwechsel); Auswertung (vier Karten in waagerechter Spur); App (fünf Handys); Vertrauen (Mosaik, Partnerband als Platzhalter); Nachweise (vier Beispielzahlen); Stimmen (sechs Beispielkarten in Spur); Fragen (sechs Einwände); Starterset (bildfüllender Abschluss); Kontakt (Rückruf, fünf Felder); Fuß mit Newsletter.

## Animationen
| Wo | Was | Wie |
|---|---|---|
| Held | Messrahmen atmet leicht, Schleier dunkelt beim Scrollen, Handy driftet gegen die Scrollrichtung | CSS Keyframes (`transform`, `opacity`), `data-abdunkeln`, `data-parallax` |
| Geräte | Karten staffeln ein, Zeichnung hebt sich beim Überfahren | `data-staffel`, `data-zeig`, CSS (`transform`) |
| Profil | Wörter der Aussage hellen beim Scrollen auf, Bühne skaliert ein, Knöpfe wechseln das Profil | `data-licht`, `data-zeig="skala"`, `stil.js` |
| Auswertung, Stimmen | Waagerechte Spur mit Einrasten, Pfeile scrollen eine Karte; Hinweisring atmet | CSS `scroll-snap`, `stil.js` (`scrollBy`), CSS (`transform`) |
| App | Fünf Handys staffeln ein, jedes zweite sitzt tiefer | `data-staffel`, `data-zeig` |
| Vertrauen | Partnerband läuft langsam, hält beim Überfahren an | `.band` aus `basis.css` |
| Nachweise | Zahlen zählen beim Sichtbarwerden hoch | `data-zaehle` |
| Abschluss | Hintergrund driftet leicht | `data-parallax` |
| Kopf | Menü als Panel auf dem Handy, Abschnittsanzeige | `bewegung.js` |

Nichts pinnt, deshalb gibt es kein Scroll Budget zu verwalten. Bei reduzierter Bewegung stehen alle Zustände im Endbild, nichts läuft. Ohne JavaScript stehen alle drei Profile untereinander, Spuren bleiben mit Wischen und Tastatur bedienbar (Pfeile entfallen), Wortlicht und Staffel sind sichtbar.

## Tokens (marke.css)
`--flaeche`, `--flaeche-alt`, `--flaeche-dunkel` (Waldtinte), `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--schrift-titel` (Schibsted Grotesk), `--schrift-text` (Instrument Sans), `--schrift-mono` (Systemschrift), `--radius-knopf`, `--radius-karte`, `--radius-bild`, `--radius-kopf`, `--titel-gewicht`, `--titel-spur`, `--mint`, `--salbei`, `--pfirsich`, `--himmel`, `--verlauf-seite`, `--blatt`, `--blatt-dunkel`, `--topf`, `--geraet`, `--geraet-schatten`, `--wasser`, `--licht-warm`, `--marke-ton`, `--nacht-grund`, `--text-auf-dunkel`, `--text-leise-dunkel`, `--linie-dunkel`, `--feld-rand`, `--weiss`, `--glas`.

## Marke wechseln
Nur `marke.css` ändern, bei einem anderen Produktthema zusätzlich die Zeichnungen (Symbole `z-*`) tauschen. Kontrast (selbst gerechnet, WCAG):
| Paar | Wert |
|---|---|
| `--text` auf `--flaeche` / `--flaeche-alt` | 14,1 zu 1 / 13,2 zu 1 |
| `--text-leise` auf `--flaeche` / `--flaeche-alt` | 7,0 zu 1 / 6,6 zu 1 |
| `--text-leise` auf Seitenverlauf (hellste und dunkelste Stelle) | 6,4 bis 6,6 zu 1 |
| `--akzent-text` auf `--akzent` | 13,5 zu 1 |
| `--text` auf `--mint`, `--pfirsich`, `--himmel` (Karten) | 11,9 / 11,2 / 12,2 zu 1 |
| `--text-auf-dunkel` auf `--flaeche-dunkel` | 13,5 zu 1 |
| `--text-leise-dunkel` auf `--flaeche-dunkel` / `--nacht-grund` | 8,5 zu 1 / 7,0 zu 1 |
| `--marke-ton` auf `--flaeche-dunkel` (Rahmen, Fokus, Zeiger) | 12,2 zu 1 |
| `--flaeche-dunkel` auf `--marke-ton` (Chips) | 12,2 zu 1 |
| `--feld-rand` auf `--flaeche` (Bedienelement) | 4,1 zu 1 |
Nicht gerechnet: Text im Held über dem Schleier (Verlauf, Wert hängt von der Zeichnung dahinter ab; Schleier an der Textstelle ist nahezu Waldtinte).

## Offen
- Echte Fotos oder Videoschleifen für Held, Karten, Mosaik und Abschluss (siehe BILDER.md). Die Zeichnungen sind Platzhalter mit eigener Handschrift.
- Formulare senden nichts (Rückruf, Newsletter). Turnstile, Versand, Bestätigungsmail und Double Opt In baut der Bauablauf.
- Beispielzahlen (400 Arten, 30 Tage), Antworten, Stimmen, Partnernamen, Preis und Lieferzeit sind Beispiele. Keine Fremdlogos, keine Bewertungssterne.
- Produktaussagen (Messwerte, Gießrhythmus) vor Auslieferung fachlich prüfen lassen, keine Wirkversprechen ergänzen.
- App Store Symbole der Referenz bewusst nicht nachgebaut (Fremdmarken). Im Projekt echte Badges nach Vorgaben der Stores einsetzen.
- Spur und Pfeile sind nicht mit Screenreader getestet. Das Partnerband ist `aria-hidden`.
- Nicht getestet: echte Geräte, Zwischenbreiten, Safari.

## Conversion Playbook
Titel 56 Zeichen, Beschreibung unter 160. Primär CTA "Starterset ansehen" in der Kopfzeile, im Held, in der App, im Abschluss und im Fuß. Telefon in Kopf (ab 1200 px), Held, Abschluss, Kontakt und Fuß. Einwand FAQ mit sechs `details`, Antworten als Beispiel markiert. Formular mit fünf Feldern, Feldhinweise unter E-Mail und Telefon. Heldformel als Kommentar vor der H1 (Zielgruppe, Problem, Lösung, Risiko weg). Beispielbelege tragen `data-beispiel`.

## Abschnitte (Baukasten)
| Kennung | Kategorie | Prinzip |
|---|---|---|
| kopf | navigation | Abgesetzte dunkle Leiste bleibt über jedem Bild lesbar, Hauptaktion und Telefon in Reichweite |
| held | hero | Bildfüllender Raum: Aussage links, Beweis (Handy mit Profil) rechts |
| system | product | Drei hohe Karten gleicher Form machen ein Ökosystem lesbar |
| profil | interactive | Das Einzelne zählt: Auswahl wechselt Erkennung, Werte und Bild |
| ki | features | Vier gleich große Karten in waagerechter Spur halten die Seite kurz |
| app | product | Versetzte Handyreihe zeigt die Plattform als Ganzes |
| vertrauen | trust | Mosaik der Zielgruppen Wirklichkeit und Partnerband als Fachbeleg |
| nachweise | trust | Vier kurze Zahlen belegen Umfang auf einen Blick (Beispielwerte) |
| stimmen | testimonials | Situationen statt Sterne in hohen Karten, klar als Beispiel |
| fragen | faq | Einwände direkt vor der Aktion beantworten |
| starterset | cta | Ruhiger Bildraum wiederholt Angebot und Aktion vor dem Formular |
| kontakt | forms | Fünf Felder mit Hinweisen senken die Hürde zur Beratung |
| fuss | footer | Navigation, Telefon und leise zweite Aktion (Newsletter) |
