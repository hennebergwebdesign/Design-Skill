# Bereich 5: SEO & Sichtbarkeit

Die beste Website bringt nichts, wenn sie niemand findet. Jeden Tag suchen Menschen nach
genau dem, was du anbietest, und finden die Konkurrenz. Nicht weil die besser ist, sondern
weil sie sichtbar ist.

Schwerpunkt hier: **OnPage-SEO**, also alles, was direkt auf der Website umsetzbar ist. Vier
Maßnahmen sorgen dafür, dass Google die Seite **versteht**, **indexiert** und **anzeigt**:

1. Keyword-Recherche
2. URL-Struktur
3. Meta-Titel & Meta-Beschreibung
4. Interne Verlinkung

## Schritt 5.1: Keyword-Recherche

Keywords sind die Suchbegriffe, die Kunden bei Google eingeben. Google vergleicht die Wörter
auf der Seite mit dem, was gesucht wird.

**Entscheidend ist Relevanz, nicht Suchvolumen.**

| | Beispiel Hausverwaltung Karlsruhe |
|---|---|
| **Schlecht** | „Hausverwaltung" (33.000 Suchen/Monat): zu allgemein, zu umkämpft, viele Suchen ohne Kaufabsicht |
| **Gut** | „Sondereigentumsverwaltung Karlsruhe" (10 Suchen/Monat): wenig Konkurrenz, hochqualifizierte Kunden |

Lieber 10 perfekt passende Kunden als 1.000 unpassende Besucher.

### Struktur der Keyword-Arbeit

- **Ein Haupt-Keyword je Seite.** Zwei Seiten auf dasselbe Keyword zu optimieren lässt sie
  gegeneinander konkurrieren (Keyword-Kannibalisierung).
- **Suchintention bestimmen:** informational (Blog), kommerziell (Vergleich, Leistungen),
  transaktional (Kontakt, Angebot), navigational (Marke). Eine Leistungsseite, die wie ein
  Ratgeber geschrieben ist, rankt für nichts richtig.
- **Lokales SEO:** bei regionalen Dienstleistungen gehört der Ort in Titel, H1, URL und
  Text, und ein gepflegtes Google-Unternehmensprofil mit identischen NAP-Daten (Name,
  Adresse, Telefon) wie im Impressum.
- **Longtail zuerst.** Kleine, spezifische Begriffe bringen früher Ergebnisse als Kopfbegriffe.

### Keyword-Stuffing vermeiden

```
Schlecht: „Physiotherapie Dachau bietet beste Physiotherapie in Dachau.
           Unsere Physiotherapie Dachau ist die beste Physiotherapie in Dachau."

Besser:   „Sie suchen einen Physiotherapeuten in Dachau? Wir helfen Ihnen bei
           Rückenschmerzen, Sportverletzungen und …"
```

Unnatürliche Häufung wird abgestraft. Sprich die Sprache der Zielgruppe.

## Schritt 5.2: URL-Struktur

Google liest die URL, bevor es den Inhalt liest. Menschen sehen sie in den Suchergebnissen:
eine klare URL schafft Vertrauen, eine kryptische wirkt unseriös.

**Die vier Regeln:**

1. **Kurz und prägnant:** Faustregel maximal 3–5 Wörter.
2. **Keyword einbauen:** das Haupt-Keyword steht in der URL.
3. **Bindestriche statt Unterstriche:** Google erkennt Bindestriche als Worttrenner,
   Unterstriche nicht.
4. **Keine Umlaute, keine Sonderzeichen:** Umlaute werden in kryptische Zeichen umgewandelt
   (`ü` → `%C3%BC`). Also `rueckenschmerzen`, nicht `rückenschmerzen`.

```
Gut:                                  Schlecht:
/physiotherapie-dachau                /?p=123
/leistungen                           /seite-42
/kontakt                              /2025/02/15/blogartikel-neu
/blog/rueckenschmerzen-tipps          /dienstleistungen/angebot-1/index.php
```

Zusätzlich: durchgehend Kleinschreibung, kein abschließender Slash-Mischmasch (eine Variante
wählen und per Redirect erzwingen), keine Session-IDs oder Tracking-Parameter in der
kanonischen URL.

### URLs ändern heißt Weiterleitungen einrichten

Wird eine bestehende URL geändert, braucht es eine **301-Weiterleitung**. Sonst landen
Besucher und Google auf einer **404-Fehlerseite** und das Ranking ist weg.

- **404** = Seite nicht gefunden. Google denkt: kaputt → Ranking sinkt.
- **301** = dauerhafte Umleitung. Besucher landen richtig, Google behält das Ranking, alte
  Links funktionieren weiter.

Bei einem Relaunch gehört eine vollständige **Redirect-Tabelle alt → neu** zum Projekt,
erstellt aus der alten Sitemap und den Top-Seiten der Search Console. Umsetzung je nach
Hosting in `public/_redirects`, `.htaccess` oder der Serverkonfiguration. Vorlage und
Details: `08-pflichtseiten-technik.md`.

## Schritt 5.3: Meta-Titel & Meta-Beschreibung

Bei Google ist der blaue/lila Link der **Meta-Titel**, der graue Text darunter die
**Meta-Beschreibung**. Beide zusammen sind die Schaufensterwerbung. Eine schlechte
Beschreibung kostet 50–70 % der Klicks, selbst bei Top-Rankings.

### Meta-Titel

**Formel:** `[Hauptkeyword] – [Benefit/USP] | [Standort/Marke]`

Beispiele:
- „Physiotherapie Dachau | Rückenschmerzen weg in 6 Wochen"
- „Steuerberater München Freelancer | Spare bis zu 8.400 € im Jahr"
- „Zahnarzt Berlin Mitte | Termin in 24h, auch samstags"

**Trenner ist der senkrechte Strich `|` oder der Doppelpunkt, nie ein Gedankenstrich.**
Der Meta-Titel ist Seitentext, für ihn gilt die Strichregel aus `12-copywriting.md`.


Regeln: maximal **60 Zeichen**, Keyword am Anfang, Benefit oder USP rein, keine Floskeln
(„Herzlich willkommen …"). Jeder Titel auf der Domain ist einmalig.

### Meta-Beschreibung

**Formel:** `[Problem lösen] + [3 Benefits mit ✓] + [CTA]`

Beispiele:
- „Rückenschmerzen? Wir helfen ohne OP. ✓ Termin in 48h ✓ Kassenleistung ✓ Erfahrene
  Therapeuten → Jetzt Termin buchen"
- „Spare bis zu 8.400 € Steuern pro Jahr. ✓ Spezialisiert auf Freelancer ✓ Erstberatung
  kostenlos ✓ Online & vor Ort → Jetzt Kontakt aufnehmen"

Regeln: maximal **160 Zeichen**, drei konkrete Benefits mit ✓, Call-to-Action am Ende,
Keyword einbauen (hilft, ist nicht zwingend).

**Wo eintragen:** in Astro/Next direkt im Head-Layout als Props je Seite (Vorlage:
`../assets/vorlagen/head-meta.html`). In WordPress über Yoast SEO oder Rank Math, Felder
„SEO-Titel" und „Meta-Beschreibung".

## Schritt 5.4: Interne Verlinkung

Google ist ein Crawler, der Links von Seite zu Seite folgt. Gut verlinkte Seiten werden
gefunden, verstanden und ranken besser. Nicht verlinkte Seiten werden nicht indexiert.

**Regel 1: Von starken Seiten auf schwache verlinken.** Starke Seiten (Startseite, beliebte
Blogartikel) haben Autorität. Ein Link von dort gibt einer neuen Unterseite einen Schub.

**Regel 2: Aussagekräftige Ankertexte.** Google liest den Ankertext und versteht daraus, worum
es auf der Zielseite geht.

```
Schlecht: „Klicken Sie hier"
Gut:      „Mehr über unsere Physiotherapie-Angebote"
```

**Regel 3: 2–4 interne Links je Seite.** Von Blogartikeln auf Leistungen und Über uns, von
Unterseiten auf verwandte Unterseiten, von der Startseite auf die wichtigsten Seiten.

## Technisches SEO

| Punkt | Anforderung |
|---|---|
| `robots.txt` | vorhanden, erlaubt das Crawlen, nennt die Sitemap-Adresse |
| `sitemap.xml` | automatisch erzeugt, enthält **nur** indexierbare Seiten |
| Canonical | jede Seite hat eine absolute, selbstreferenzierende `<link rel="canonical">` |
| `noindex` | für Rechtstexte, Dankeseiten, interne Bereiche, und diese Seiten **nicht** in der Sitemap |
| Strukturierte Daten | JSON-LD: Organization/LocalBusiness, Service, FAQPage, BreadcrumbList |
| Open Graph | Titel, Beschreibung, absolutes Bild 1200 × 630 |
| HTTPS | erzwungen, keine Mixed-Content-Warnungen |
| Mobile | responsiv, keine horizontale Scrollleiste |
| Core Web Vitals | Rankingfaktor, siehe `03-technik-performance.md` |

**Der häufigste Search-Console-Befund im Relaunch:** „Übermittelte URL als ‚noindex'
gekennzeichnet". Ursache ist fast immer, dass Impressum und Datenschutz `noindex` tragen und
trotzdem in der Sitemap stehen. Die Sitemap-Integration muss beides ausfiltern.

### Strukturierte Daten, Regeln

- Nur auszeichnen, was auf der Seite auch sichtbar steht. Unsichtbares Markup ist ein
  Richtlinienverstoß.
- **`aggregateRating` gehört an das richtige Objekt.** Eine Händler- oder Unternehmensbewertung
  (Trustpilot, Google) hängt an der **Organisation**, nicht am Produkt. Eine Händlerbewertung
  als Produktbewertung auszugeben, kann die Rich Results der ganzen Domain kosten.
- FAQ-Markup nur mit Fragen und Antworten, die genau so auf der Seite stehen. Antworten mit
  Platzhaltern gehören nicht ins Markup.
- Nach dem Livegang mit dem Rich-Results-Test und dem Schema-Markup-Validator prüfen.

Fertige JSON-LD-Bausteine: `../assets/vorlagen/jsonld-bausteine.md`.

## Was hier bewusst fehlt

Backlinks, Content-Cluster, digitale PR und technische Großbaustellen (Log-Analyse,
Crawl-Budget) sind OffPage- beziehungsweise Fortgeschrittenenthemen. Ohne sauberes OnPage
bringen sie nichts, mit sauberem OnPage sind sie der nächste Schritt.
