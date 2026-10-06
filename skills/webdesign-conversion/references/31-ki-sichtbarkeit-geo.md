# Sichtbarkeit in KI-Antworten (GEO)

`05-seo-sichtbarkeit.md` sorgt dafür, dass Google die Seite versteht. Immer mehr Anfragen
enden aber nicht mehr im Klick auf ein Ergebnis, sondern in einer Antwort von ChatGPT, Claude,
Perplexity oder den KI-Übersichten von Google, die Quellen nennt oder nicht. Dieses Kapitel
beantwortet, was eine Kundenseite dafür tun kann, **ohne** eine zweite Disziplin neben SEO
aufzumachen.

Die Substanz stammt aus [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)
(MIT) und [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude)
(MIT). Übernommen sind die Trennung von Such- und Trainingscrawlern, die Struktur zitierfähiger
Absätze und die Haltung „jede Empfehlung mit Gegenprobe". Nicht übernommen sind die
Prozentwerte und Gewichtungen beider Quellen (Abschnitt 7), weil sie sich nicht belegen
ließen.

## 1. Grundhaltung: dasselbe Fundament, ein anderer Leser

KI-Suche liest dieselbe Seite wie Google, nur zerlegt sie sie in Absätze und prüft, ob ein
Absatz für sich eine Frage beantwortet. Was für Suchmaschinen und Menschen klar, belegt und
sauber ausgezeichnet ist, ist es für KI-Antworten auch. Es gibt keinen Trick, der eine schwache
Seite zitierfähig macht. Das ist die wichtigste Aussage dieses Kapitels und der Grund, warum
es kurz bleibt.

## 2. Wer darf was lesen: Such- und Trainingscrawler trennen

Die Betreiber trennen inzwischen den Crawler, der **Antworten mit Quelle** speist, von dem, der
**Modelle trainiert**. Ein einziges `User-agent: *` mit Verbot sperrt beides und kostet
Sichtbarkeit in Antworten, obwohl nur das Training gemeint war. Umgekehrt öffnet ein „alles
erlauben" auch das Training.

| Zweck | Crawler (Stand der Herstellerdokumentation, Namen prüfen) | Wirkung einer Sperre |
|---|---|---|
| Antworten mit Quelle | `OAI-SearchBot` (ChatGPT-Suche), `Claude-SearchBot`, `PerplexityBot` | Seite wird dort nicht zitiert |
| Abruf auf Zuruf eines Nutzers | `ChatGPT-User`, `Claude-User`, `Perplexity-User` | Nutzer, die die Seite direkt anfragen, bekommen keinen Inhalt |
| Training von Modellen | `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot` | Seite wird nicht fürs Training verwendet, Suche und Zitat bleiben unberührt |

`Google-Extended` betrifft Training und Gemini, **nicht** die Google-Suche. Wer es sperrt,
verschwindet nicht aus Google.

**Das ist eine Entscheidung des Kunden, kein Default des Skills.** Die Vorlage
`assets/vorlagen/robots.txt` lässt alles zu und nennt die KI-Crawler nicht. Soll ein Kunde das
Training ausschließen, aber zitiert werden, steht das so in der Datei:

```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: *
Allow: /
Disallow: /api/
```

Wichtig: `robots.txt` bittet, sie erzwingt nichts. Ob ein maschinenlesbarer Nutzungsvorbehalt
im Sinne von § 44b UrhG damit rechtlich abgedeckt ist, ist nicht abschließend geklärt und gehört
zum Anwalt des Kunden, nicht in dieses Kapitel. Namen und Zuständigkeiten ändern sich; vor dem
Livegang in der Dokumentation des jeweiligen Betreibers gegenlesen.

## 3. Was auf der Seite zitierfähig macht

| Merkmal | Gut | Schwach | Grund |
|---|---|---|---|
| Antwort zuerst | Der erste Satz unter der Überschrift beantwortet die Frage | Anlauf, Kontext, dann irgendwann die Antwort | Ein Absatz wird einzeln herausgezogen. Steht die Antwort erst im dritten Satz, wird er übersprungen |
| In sich verständlich | „Die Erstberatung bei Müller Steuer dauert 45 Minuten und kostet nichts." | „Sie dauert 45 Minuten, wie oben beschrieben." | Ohne den Absatz davor trägt „sie" nichts |
| Fragen als Überschriften, wo es echte Fragen sind | „Wie lange dauert die Erstberatung?" | „Unser Ablauf" | Entspricht der Formulierung, in der gefragt wird. Nicht erzwingen, wo keine Frage steht |
| Konkretes | Zahlen, Fristen, Orte, Preise, Namen | „viele", „zahlreiche", „langjährig" | Vage Mengen lassen sich nicht zitieren, Konkretes schon. Deckt sich mit `12-copywriting.md` |
| Vergleiche als Tabelle | Tabelle ab drei Vergleichspunkten | Fließtext mit drei Gegenüberstellungen | Tabellen lassen sich Zeile für Zeile auslesen |
| Datum und Urheber sichtbar | „Aktualisiert am 03.10.2026, Dr. Meier, Steuerberaterin" | kein Datum, kein Name | Aktualität und Verantwortliche sind Vertrauenssignale, auch für Menschen. Siehe auch Impressum und `07-recht-dsgvo.md` |
| Text im ausgelieferten HTML | Astro liefert den Text serverseitig | Inhalt, der erst nach JavaScript erscheint | Nicht jeder Crawler führt Skripte aus. Der Standardstack ist hier im Vorteil |

**Eine Länge für „den idealen Absatz" gibt es nicht.** Beide Quellen nennen Richtwerte um
130 bis 170 Wörter und werten sie als Heuristik. Ein Absatz ist lang genug, wenn er die Frage
vollständig beantwortet, und kurz genug, dass nichts Fremdes darin steht.

## 4. Strukturierte Daten und Entität

KI-Systeme ordnen eine Seite einer Organisation oder Person zu. Das geht über das, was
`05-seo-sichtbarkeit.md` ohnehin verlangt: `Organization` oder `LocalBusiness` mit Namen,
Adresse und Kontakt, identisch zum Impressum, dazu `sameAs` auf die Profile, die der Kunde
wirklich führt (Google-Unternehmensprofil, Branchenverzeichnis, LinkedIn). Das ist die
Verbindung zwischen der Seite und dem Rest des Webs.

Dieselben Regeln wie bisher: nur auszeichnen, was sichtbar steht. `FAQPage` nur mit Fragen und
Antworten, die genau so auf der Seite stehen. Das prüft `scripts/pruefe-geo.mjs`.

## 5. llms.txt: ehrlich einordnen

Der Vorschlag `llms.txt` (eine Datei im Stammverzeichnis, die einem Sprachmodell die
wichtigsten Seiten nennt) ist ein Community-Vorschlag. Laut den beiden Quellen hat Google
ausdrücklich gesagt, dass die Datei für die Google-Suche weder hilft noch schadet, und es ist
nicht belegt, dass ein großer KI-Anbieter sie auswertet. Die Aussage von Google selbst wurde für
dieses Kapitel nicht geprüft.

**Regel:** kostet eine Seite praktisch nichts, darf sie existieren, wird aber nie als
Maßnahme verkauft. Für Kunden gilt: erst Abschnitt 3, dann `robots.txt`, dann, wenn Zeit
bleibt, `llms.txt`. Ein Projekt, das zuerst `llms.txt` baut und den Text im JavaScript lässt, hat
die Reihenfolge verwechselt.

## 6. Jede Empfehlung mit Gegenprobe

Aus claude-seo übernommen, weil es GEO-Empfehlungen von Vermutungen trennt: jede Maßnahme
bekommt vier Angaben.

| Angabe | Beispiel |
|---|---|
| Beobachtung | „Die Leistungsseite beantwortet die Hauptfrage erst im vierten Absatz." |
| Maßnahme | „Die Antwort in zwei Sätzen an den Anfang." |
| Gegenprobe | „Woran würden wir merken, dass es nicht geholfen hat?" |
| Frühindikator | „Die Seite erscheint in einer Stichprobe von zehn Fragen an ChatGPT, Claude und Perplexity als Quelle." |

**Eine Stichprobe ist keine Messung.** Zehn Fragen an drei Systeme vor und nach der Änderung
zeigen eine Richtung, keinen Effekt. Wer einen Wert nennt, nennt ihn als ungemessen, wie überall
in diesem Skill. Systematische Messung von KI-Sichtbarkeit gehört zu `13-messung-optimierung.md`
und ist bisher nicht Teil des Pakets.

## 7. Was hier nicht steht

| Thema | Warum nicht |
|---|---|
| Markenerwähnungen auf Reddit, YouTube, Wikipedia | OffPage. Wirkt vermutlich, ist aber keine Maßnahme an der Kundenseite, und die Zahlen dazu stammen aus Quellen, die hier nicht nachgeprüft wurden |
| Gewichtete Scores („Citability 25 %, Struktur 20 %") | Die Gewichte sind Setzungen der Skill-Autoren, keine Messung. Ein Score mit zwei Nachkommastellen täuscht Genauigkeit vor |
| Plattformspezifische Rezepte („ChatGPT bevorzugt X") | Ändern sich mit jedem Modellwechsel und lassen sich ohne eigene Messung nicht tragen |
| `/seo agentic` (Bereitschaft für Browseragenten) | Nicht geprüft, Stand der Lighthouse-Funktion unklar |
| E-E-A-T als Prüfliste | Kein Rankingfaktor mit festen Kriterien. Die sichtbaren Teile (Urheber, Datum, Belege) stehen in Abschnitt 3 |

## 8. Prüfen

```bash
node scripts/pruefe-geo.mjs            # nach dem Build: dist/ mit robots.txt und Seiten
node scripts/pruefe-geo.mjs dist --llms
```

Das Skript meldet je KI-Crawler den Zustand in der `robots.txt` (erlaubt, gesperrt, über
`*` geregelt), und je Seite: leeres HTML (Inhalt erst per JavaScript), keine oder mehrere
`h1`, übersprungene Überschriftenebenen, ungültiges JSON-LD, und `FAQPage` mit Fragen, die
nicht sichtbar auf der Seite stehen. Ob eine Sperre gewollt ist, entscheidet es nicht: es
benennt sie.

## Verwandte Kapitel

- Grundlagen: `05-seo-sichtbarkeit.md`, JSON-LD-Bausteine: `../assets/vorlagen/jsonld-bausteine.md`
- `robots.txt`, Sitemap: `08-pflichtseiten-technik.md`
- Schreiben für Absätze, die einzeln tragen: `12-copywriting.md`
- Messung: `13-messung-optimierung.md`
- Prüfskript: `scripts/pruefe-geo.mjs`
