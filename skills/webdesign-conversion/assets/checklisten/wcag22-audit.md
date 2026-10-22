# WCAG-2.2-Audit (Stufe A und AA)

Prüfliste je Erfolgskriterium für eine gebaute Website. Sie ergänzt den Abschnitt
Barrierefreiheit der `pre-launch.md`: dort steht, was vor jedem Livegang abgehakt wird, hier
steht der vollständige Durchgang, wenn eine Seite unter das BFSG fällt, ein Kunde einen
Nachweis braucht oder eine Bestandsseite geprüft wird.

Maßstab ist WCAG 2.2 Stufe AA: 31 Kriterien der Stufe A und 24 der Stufe AA. Wer 2.2
erfüllt, erfüllt auch 2.1. Begründung und Umsetzung in Astro stehen in
`../../references/04-barrierefreiheit-bfsg.md`. Die deutschen Namen der Kriterien sind
sinngemäß; maßgeblich ist die Nummer.

## Ablauf

| Schritt | Werkzeug | Deckt ab |
|---|---|---|
| 1 | `node scripts/pruefe-kontrast.mjs src/styles/tokens.css` | Kontrast der Token-Paare |
| 2 | `node scripts/pruefe-typografie.mjs src` | Zoomfestigkeit, gesperrter Zoom |
| 3 | `node scripts/pruefe-breakpoints.mjs http://localhost:4321` (je Hauptseite) | Umbruch bei 320 px, Touchziele, Mindestschrift |
| 4 | `node scripts/pruefe-geschmack.mjs dist src` nach dem Build | Bedienelemente ohne Namen, fehlendes `autocomplete`, entfernter Fokusring, gesperrtes Einfügen |
| 5 | axe DevTools oder Lighthouse je Hauptseite | Alt-Attribut, Labels, Sprache, Seitentitel, ARIA-Syntax |
| 6 | Tastatur von Hand: Tab, Shift+Tab, Enter, Leertaste, Escape, Pfeiltasten | Bedienbarkeit, Reihenfolge, Fallen, verdeckter Fokus |
| 7 | Screenreader von Hand (NVDA mit Firefox oder Chrome, VoiceOver mit Safari) über die Hauptwege | Namen, Zustände, Statusmeldungen, Lesereihenfolge |
| 8 | Zoom 200 % und 400 %, Textabstände per Nutzerstylesheet, Telefon gedreht | Vergrößerung, Textabstand, Ausrichtung |

**Hauptwege** sind mindestens: Startseite, eine Leistungsseite, Anfrage oder Buchung bis zur
Bestätigung, Fehlerfall im Formular, Consent-Banner beim ersten Besuch, 404-Seite.

**Spalte „Art":**

| Art | Bedeutung |
|---|---|
| automatisch | ein Skript oder axe findet den Verstoß zuverlässig; ohne Befund gilt das Kriterium als geprüft |
| teilweise | ein Skript findet einen Teil der Verstöße; ohne Befund ist das Kriterium **nicht** erfüllt, sondern nur vorgeprüft |
| Hand | nur mit Tastatur, Screenreader oder Ansehen prüfbar |

Grund für die Trennung: ein grüner Skriptlauf über ein Kriterium der Art „teilweise" wird
sonst als Nachweis übergeben. Das wäre eine Behauptung ohne Beleg. In der Spalte „Befund"
steht deshalb immer eins von: `erfüllt`, `Befund: …`, `entfällt: Grund`, `ungeprüft`.

## 1 Wahrnehmbar

| Kriterium | Stufe | Prüfung | Art | Befund |
|---|---|---|---|---|
| 1.1.1 Nicht-Text-Inhalt | A | axe meldet fehlendes `alt`. Von Hand: stimmt der Alt-Text, ist Dekor `alt=""`, ist eine KI-Illustration als solche benannt; Icon-Buttons über `pruefe-geschmack` (Bedienelement ohne Namen) | teilweise | |
| 1.2.1 Reines Audio und reines Video | A | Hand: Podcast mit Transkript, stummes Video mit Beschreibung | Hand | |
| 1.2.2 Untertitel (aufgezeichnet) | A | Hand: `<track kind="captions">` oder Untertitelspur beim Anbieter, gegengelesen | Hand | |
| 1.2.3 Audiodeskription oder Medienalternative | A | Hand: Sichtbares, das nicht gesagt wird, steht als Text daneben | Hand | |
| 1.2.4 Untertitel (live) | AA | Hand; entfällt ohne Livestream | Hand | |
| 1.2.5 Audiodeskription (aufgezeichnet) | AA | Hand: entfällt praktisch, wenn alles Sichtbare im Ton gesagt wird | Hand | |
| 1.3.1 Info und Beziehungen | A | axe für Labels, Listen, Tabellenköpfe. Von Hand: Überschriftenliste im Screenreader, Landmarks, `fieldset`/`legend` bei Optionsgruppen | teilweise | |
| 1.3.2 Bedeutungstragende Reihenfolge | A | Hand: Lesereihenfolge im Screenreader gegen die Optik, besonders bei `order`, Grid-Platzierung und umgedrehten Spalten | Hand | |
| 1.3.3 Sensorische Eigenschaften | A | Hand: Texte wie „rechts im Kasten", „der grüne Knopf" | Hand | |
| 1.3.4 Ausrichtung | AA | Hand: Telefon drehen, nichts gesperrt | Hand | |
| 1.3.5 Eingabezweck bestimmen | AA | `pruefe-geschmack` meldet Name, E-Mail, Telefon ohne `autocomplete`. Von Hand: Firma, Adresse, PLZ, Ort | teilweise | |
| 1.4.1 Benutzung von Farbe | A | Hand: Links im Fließtext unterstrichen, Fehler mit Text, aktueller Navigationspunkt nicht nur farbig; Seite einmal in Graustufen ansehen | Hand | |
| 1.4.2 Audio-Steuerelement | A | Hand: kein Ton startet von selbst, sonst Stopp oder Lautstärke | Hand | |
| 1.4.3 Kontrast (Minimum) | AA | `pruefe-kontrast` für die Token-Paare. Von Hand mit Farbwähler: Text auf Bildern, Verläufen, Videos, Platzhaltertext, deaktiviert wirkende Texte | teilweise | |
| 1.4.4 Textgröße ändern | AA | `pruefe-typografie` (rem, Zoomgrenze, gesperrter Zoom). Von Hand: Zoom 200 % auf 360 und 1440 px, nichts abgeschnitten | teilweise | |
| 1.4.5 Bilder von Text | AA | Hand: Text in Grafiken, Bannern, Heldenbildern; Logos sind ausgenommen | Hand | |
| 1.4.10 Umbruch | AA | `pruefe-breakpoints` meldet waagerechten Überlauf bei 320 px. Von Hand: abgeschnittener Inhalt (`overflow: clip`), fixierte Leisten, die bei 400 % den Bildschirm füllen | teilweise | |
| 1.4.11 Nicht-Text-Kontrast | AA | `pruefe-kontrast` für Fokus und starken Rahmen. Von Hand: Feldrahmen, Icons mit Bedeutung, Zustände von Checkbox und Schalter | teilweise | |
| 1.4.12 Textabstand | AA | Hand: Nutzerstylesheet mit Zeilenhöhe 1,5, Absatzabstand 2em, Laufweite 0,12em, Wortabstand 0,16em; nichts überlappt oder verschwindet. Hinweis: `pruefe-typografie` meldet feste Zeilenhöhen | Hand | |
| 1.4.13 Inhalt bei Hover oder Fokus | AA | Hand: Untermenü und Tooltip schließen mit Escape, lassen sich mit dem Zeiger betreten, bleiben stehen | Hand | |

## 2 Bedienbar

| Kriterium | Stufe | Prüfung | Art | Befund |
|---|---|---|---|---|
| 2.1.1 Tastatur | A | Hand: jede Funktion mit Tab, Enter, Leertaste, Pfeiltasten; auch Karussell, Vorher-Nachher-Regler, Filter, Consent | Hand | |
| 2.1.2 Keine Tastaturfalle | A | Hand: eingebettete Karte, Video, Chat-Widget, Buchungs-iframe wieder verlassen | Hand | |
| 2.1.4 Tastaturkürzel | A | Hand; entfällt ohne Kürzel aus einer einzelnen Taste | Hand | |
| 2.2.1 Zeiteinteilung anpassbar | A | Hand: Sitzungsablauf, Countdown, Hinweise, die von selbst verschwinden | Hand | |
| 2.2.2 Pausieren, beenden, ausblenden | A | Hand: Hintergrundvideo, Laufband, Autoplay-Karussell länger als 5 Sekunden haben eine Pause | Hand | |
| 2.3.1 Grenzwert von dreimaligem Blitzen | A | Hand: kein Blitzen, kein Stroboskopeffekt in Videos | Hand | |
| 2.4.1 Blöcke umgehen | A | Hand: Skip-Link ist das erste Element und springt in `main`. axe meldet fehlende Landmarks | teilweise | |
| 2.4.2 Seite mit Titel | A | axe meldet fehlenden `<title>`. Von Hand: eindeutig je Seite, sprechend | teilweise | |
| 2.4.3 Fokusreihenfolge | A | Hand: Tab-Reihenfolge folgt der Optik; Dialog und Off-Canvas-Menü geben den Fokus zurück | Hand | |
| 2.4.4 Linkzweck (im Kontext) | A | `pruefe-geschmack` und axe melden Links ohne Namen. Von Hand: „Mehr", „Hier", gleich lautende Links zu verschiedenen Zielen | teilweise | |
| 2.4.5 Mehrere Wege | AA | Hand: Navigation plus Sitemap-Seite oder Suche; Schritte einer Anfragestrecke sind ausgenommen | Hand | |
| 2.4.6 Überschriften und Beschriftungen | AA | Hand: Überschriften und Labels sagen, worum es geht | Hand | |
| 2.4.7 Fokus sichtbar | AA | `pruefe-geschmack` meldet `outline: none` ohne Ersatz. Von Hand: Fokusring auf heller, dunkler und Bildfläche sichtbar | teilweise | |
| 2.4.11 Fokus nicht verdeckt (Minimum) | AA | Hand: Tab vorwärts und rückwärts mit sichtbarem Consent-Banner, sticky Kopf, Mobil-CTA-Balken, Chat-Knopf | Hand | |
| 2.5.1 Zeigergesten | A | Hand: Wischen und Zwei-Finger-Gesten haben Buttons als Alternative | Hand | |
| 2.5.2 Zeigerabbruch | A | Hand und Code: keine Aktion auf `pointerdown` oder `mousedown`, Ausnahme mit Begründung | Hand | |
| 2.5.3 Beschriftung im Namen | A | Hand: ein `aria-label` enthält den sichtbaren Text („Anfrage senden" heißt nicht „Formular abschicken") | Hand | |
| 2.5.4 Auslösung durch Bewegung | A | Hand; entfällt ohne Schütteln oder Neigen | Hand | |
| 2.5.7 Ziehbewegungen | AA | Hand: Vorher-Nachher-Regler, Ziehkarussell, Karte lassen sich mit einfachem Klick bedienen | Hand | |
| 2.5.8 Zielgröße (Minimum) | AA | `pruefe-breakpoints` meldet Touchziele unter 44 px unter 861 px Breite (strenger als die Pflicht). Auf Desktopbreiten von Hand: 24 × 24 px oder genug Abstand, Links im Fließtext ausgenommen | teilweise | |

## 3 Verständlich

| Kriterium | Stufe | Prüfung | Art | Befund |
|---|---|---|---|---|
| 3.1.1 Sprache der Seite | A | axe meldet fehlendes oder ungültiges `lang`; dass der Wert `de` (oder `de-AT`, `de-CH`) lautet, zeigt ein Blick in den Quelltext | automatisch | |
| 3.1.2 Sprache von Teilen | AA | Hand: englische Zitate, Produktnamen in ganzen Sätzen mit eigenem `lang` | Hand | |
| 3.2.1 Bei Fokus | A | Hand: Fokus allein öffnet nichts, sendet nichts, wechselt keine Seite | Hand | |
| 3.2.2 Bei Eingabe | A | Hand: Auswahlfeld wechselt nicht sofort die Seite, Formular sendet nicht beim letzten Feld | Hand | |
| 3.2.3 Konsistente Navigation | AA | Hand: Navigation auf allen Seiten in derselben Reihenfolge | Hand | |
| 3.2.4 Konsistente Erkennung | AA | Hand: dieselbe Funktion trägt überall denselben Namen und dasselbe Symbol. Hinweis: `pruefe-geschmack` meldet mehrere Texte für dieselbe Kontaktabsicht auf einer Seite | Hand | |
| 3.2.6 Konsistente Hilfe | A | Hand: Telefon, E-Mail, Kontaktformular, Chat stehen auf jeder Seite an derselben Stelle der Reihenfolge | Hand | |
| 3.3.1 Fehlererkennung | A | Hand: Formular leer und falsch absenden; jeder Fehler steht als Text am Feld | Hand | |
| 3.3.2 Beschriftungen oder Anweisungen | A | axe meldet Felder ohne Label. Von Hand: Label sichtbar, Format erklärt, wo es eins gibt | teilweise | |
| 3.3.3 Fehlerempfehlung | AA | Hand: Fehlertext sagt, wie es richtig geht | Hand | |
| 3.3.4 Fehlervermeidung (rechtlich, finanziell, Daten) | AA | Hand: Prüfseite, Bestätigung oder Storno bei Kauf, Buchung, Vertrag; entfällt bei reiner Anfrage | Hand | |
| 3.3.7 Redundante Eingabe | A | Hand: mehrstufige Strecke fragt nichts zweimal, Zurück behält die Werte | Hand | |
| 3.3.8 Barrierefreie Authentifizierung (Minimum) | AA | `pruefe-geschmack` meldet gesperrtes Einfügen. Von Hand: Passwortmanager füllt aus, kein Rätsel-Captcha, Einmalcode in einem Feld; entfällt ohne Login | teilweise | |

## 4 Robust

| Kriterium | Stufe | Prüfung | Art | Befund |
|---|---|---|---|---|
| 4.1.2 Name, Rolle, Wert | A | `pruefe-geschmack` meldet Buttons und Links ohne Namen, axe falsche ARIA-Attribute. Von Hand im Screenreader: `aria-expanded`, `aria-selected`, `aria-current` ändern sich mit dem Zustand | teilweise | |
| 4.1.3 Statusmeldungen | AA | Hand im Screenreader: Erfolg nach dem Absenden, Trefferzahl im Filter, Ladezustand werden angesagt, ohne dass der Fokus springt | Hand | |

4.1.1 Syntaxanalyse ist in WCAG 2.2 entfallen und wird nicht geprüft. Doppelte IDs bleiben
trotzdem ein Befund unter 1.3.1 oder 4.1.2, sobald sie eine Verknüpfung brechen
(`aria-describedby`, `for`, `aria-controls`).

## Zählung

| Art | Anzahl |
|---|---|
| automatisch | 1 |
| teilweise | 15 |
| Hand | 39 |

Ein Audit, das nur Skripte laufen lässt, hat damit ein einziges Kriterium vollständig
geprüft. Der Rest braucht Tastatur, Screenreader und Augen. Das gehört so in die Übergabe.

## Bericht

| Schwere | Bedeutung | Beispiel |
|---|---|---|
| kritisch | eine Hauptaufgabe ist nicht abschließbar | Absenden-Button nicht per Tastatur erreichbar, Consent-Banner ist eine Tastaturfalle |
| hoch | eine Aufgabe gelingt nur mit Umweg oder Rätselraten | Fehler nur rot markiert, Dialog gibt den Fokus nicht zurück |
| mittel | Mehraufwand, aber lösbar | Fokus kurz unter dem sticky Kopf, Untermenü schließt nicht mit Escape |
| gering | Schönheitsfehler ohne Folge für die Aufgabe | doppelte Ansage eines dekorativen Symbols |

Je Befund: Kriterium mit Nummer und Stufe, Fundstelle (Seite und Selektor oder Datei mit
Zeile), was eine betroffene Person erlebt, die Lösung mit Verweis auf den Abschnitt in
`04-barrierefreiheit-bfsg.md`. Sortiert nach Schwere, innerhalb der Schwere nach Hauptweg
vor Nebenseite. Keine Punktzahl: Gewichte für eine Gesamtnote wären gesetzt, nicht gemessen.

Ergebnis für den Kunden: die Tabelle mit allen 55 Zeilen, keine leere Befundzelle. Was nicht
geprüft wurde, steht als `ungeprüft` darin und wird so übergeben. Die Erklärung zur
Barrierefreiheit, die das BFSG verlangt, stützt sich auf diese Tabelle, nicht auf einen
Lighthouse-Wert.

## Verwandte Kapitel

- `../../references/04-barrierefreiheit-bfsg.md`: Begründung und Umsetzung jedes Musters
- `pre-launch.md`: Kurzfassung vor dem Livegang
- `conversion-audit.md`: Barrierefreiheit als ein Bereich von sechs im Audit einer Bestandsseite
- `design-kritik.md`: Barrierefreiheit schon im Entwurf
- `../../references/55-typografie-system.md`: Zoom und Schriftgrößen
- `../../references/58-formulare-und-anfragestrecken.md`: Ablauf im Formular
