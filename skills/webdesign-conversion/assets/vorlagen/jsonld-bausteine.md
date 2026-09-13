# JSON-LD Bausteine

Regeln zuerst:

- **Nur auszeichnen, was auf der Seite sichtbar steht.** Unsichtbares Markup ist ein
  Richtlinienverstoß und kann die Rich Results der ganzen Domain kosten.
- **`aggregateRating` gehört an das richtige Objekt.** Eine Unternehmens- oder
  Händlerbewertung (Google, Trustpilot) hängt an der Organisation, nicht am Produkt.
- **Platzhalter gehören nicht ins Markup.** Antworten mit `[[FEHLT: …]]` werden vor dem
  Erzeugen des JSON-LD herausgefiltert.
- Nach dem Livegang mit dem **Rich-Results-Test** und dem **Schema-Markup-Validator** prüfen.
- Einbindung: `<script type="application/ld+json">` im Head, ein Block je Objekt.

## LocalBusiness (regionaler Dienstleister)

Für Handwerk, Praxen, Kanzleien, Gastronomie — alles mit Ladenlokal oder Einzugsgebiet.
`@type` auf den spezifischsten passenden Untertyp setzen (`Dentist`, `Plumber`,
`LegalService`, `Restaurant`, `HomeAndConstructionBusiness` …).

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.beispiel.de/#organisation",
  "name": "[[FEHLT: Firmenname]]",
  "url": "https://www.beispiel.de",
  "logo": "https://www.beispiel.de/images/logo.png",
  "image": "https://www.beispiel.de/images/og/og.jpg",
  "description": "[[FEHLT: ein Satz, identisch mit der Meta-Beschreibung der Startseite]]",
  "telephone": "[[FEHLT: +49 …]]",
  "email": "[[FEHLT]]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[[FEHLT]]",
    "postalCode": "[[FEHLT]]",
    "addressLocality": "[[FEHLT]]",
    "addressCountry": "DE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 },
  "areaServed": [{ "@type": "City", "name": "[[FEHLT]]" }],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "[[FEHLT: z. B. €€ — oder weglassen]]",
  "sameAs": [
    "[[FEHLT: Google-Unternehmensprofil, LinkedIn, Instagram …]]"
  ]
}
```

**NAP-Regel:** Name, Adresse und Telefon müssen hier, im Impressum und im
Google-Unternehmensprofil **wortgleich** sein. Abweichungen kosten lokales Ranking.

## Organization (überregional, ohne Ladenlokal)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.beispiel.de/#organisation",
  "name": "[[FEHLT]]",
  "url": "https://www.beispiel.de",
  "logo": "https://www.beispiel.de/images/logo.png",
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer support",
    "telephone": "[[FEHLT]]",
    "email": "[[FEHLT]]",
    "availableLanguage": ["de"]
  }],
  "sameAs": ["[[FEHLT]]"]
}
```

### Bewertung an der Organisation

Nur ergänzen, wenn die Werte belegt und auf der Seite sichtbar sind — mit Stand:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.4",
  "reviewCount": "780",
  "bestRating": "5",
  "worstRating": "1"
}
```

## Service (Leistungsseite)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[[FEHLT: z. B. Flachdachsanierung]]",
  "provider": { "@id": "https://www.beispiel.de/#organisation" },
  "areaServed": { "@type": "City", "name": "[[FEHLT]]" },
  "description": "[[FEHLT]]",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Leistungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "[[FEHLT]]" } }
    ]
  }
}
```

## FAQPage

Nur mit Fragen und Antworten, die **genau so** auf der Seite stehen. Die Daten kommen aus
derselben Quelle wie die sichtbare FAQ-Sektion, nicht aus einer zweiten Liste.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[[FEHLT: Frage, wortgleich mit der Seite]]",
      "acceptedAnswer": { "@type": "Answer", "text": "[[FEHLT: Antwort, wortgleich]]" }
    }
  ]
}
```

## BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.beispiel.de/" },
    { "@type": "ListItem", "position": 2, "name": "Leistungen", "item": "https://www.beispiel.de/leistungen" },
    { "@type": "ListItem", "position": 3, "name": "Flachdachsanierung" }
  ]
}
```

Das letzte Element trägt kein `item` — es ist die aktuelle Seite.

## WebSite (Suchfeld in den Ergebnissen)

Nur sinnvoll, wenn die Seite wirklich eine Suche hat.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.beispiel.de",
  "name": "[[FEHLT]]",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://www.beispiel.de/suche?q={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
}
```

## Article / BlogPosting

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[[FEHLT: max. 110 Zeichen]]",
  "image": ["https://www.beispiel.de/images/beitrag.jpg"],
  "datePublished": "2026-01-15",
  "dateModified": "2026-02-03",
  "author": { "@type": "Person", "name": "[[FEHLT]]" },
  "publisher": { "@id": "https://www.beispiel.de/#organisation" },
  "mainEntityOfPage": "https://www.beispiel.de/blog/slug"
}
```

## Product

Nur bei echtem Produktverkauf. **Produktbewertungen nur, wenn sie sich auf das Produkt
beziehen** — eine Shopbewertung gehört an die Organisation, siehe oben.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[[FEHLT]]",
  "image": ["https://www.beispiel.de/images/produkt.jpg"],
  "description": "[[FEHLT]]",
  "brand": { "@type": "Brand", "name": "[[FEHLT]]" },
  "offers": {
    "@type": "Offer",
    "price": "39.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.beispiel.de/produkt"
  }
}
```

## JobPosting

Für Google for Jobs. In Deutschland seit 2019 aktiv; eine bezahlte Variante gibt es hier
nicht, der organische Weg über strukturierte Daten ist der einzige Kanal.

**Der häufigste Fehler:** `title` enthält den ganzen Seitentitel. Google braucht den reinen
Jobtitel. Also `"Elektriker"`, nicht `"Elektriker (m/w/d) gesucht in Dachau | Firma GmbH"`.

Pflichtfelder sind `title`, `description`, `datePosted`, `hiringOrganization` und
`jobLocation`. Ohne sie erscheint die Anzeige nicht. Alles Weitere ist empfohlen, und
`validThrough` sowie `baseSalary` sind in der Praxis entscheidend.

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",

  "title": "[[NUR DER JOBTITEL, z. B. Elektriker]]",
  "description": "<p>[[VOLLSTÄNDIGE BESCHREIBUNG ALS HTML]]</p><ul><li>[[AUFGABE]]</li></ul>",
  "datePosted": "[[JJJJ-MM-TT]]",
  "validThrough": "[[JJJJ-MM-TTT00:00:00+01:00]]",

  "identifier": {
    "@type": "PropertyValue",
    "name": "[[FIRMA]]",
    "value": "[[INTERNE STELLENNUMMER]]"
  },

  "hiringOrganization": {
    "@type": "Organization",
    "name": "[[FIRMA]]",
    "sameAs": "https://www.beispiel.de",
    "logo": "https://www.beispiel.de/images/logo.png"
  },

  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[[STRASSE UND HAUSNUMMER]]",
      "addressLocality": "[[ORT]]",
      "postalCode": "[[PLZ]]",
      "addressRegion": "[[BUNDESLAND]]",
      "addressCountry": "DE"
    }
  },

  "employmentType": "FULL_TIME",

  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 3400,
      "maxValue": 4100,
      "unitText": "MONTH"
    }
  },

  "directApply": true
}
```

### `employmentType`

`FULL_TIME`, `PART_TIME`, `CONTRACTOR`, `TEMPORARY`, `INTERN`, `VOLUNTEER`, `PER_DIEM`,
`OTHER`. Mehrere gehen als Array. Eine Ausbildungsstelle ist im deutschen Sinn am ehesten
`FULL_TIME` plus `INTERN`, kein eigener Wert.

### Remote und Hybrid

Bei vollständig remote entfällt `jobLocation` **nicht**, sondern kommt zusätzlich zu
`jobLocationType`, und die Regionen, aus denen bewerbbar ist, gehören dazu:

```json
{
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": {
    "@type": "Country",
    "name": "DE"
  }
}
```

Bei **hybrid** wird `jobLocationType` weggelassen und nur `jobLocation` gesetzt: der Ort ist
real, die Anwesenheit nur reduziert. Wer hier `TELECOMMUTE` setzt, erscheint in
Remote-Filtern und enttäuscht Bewerber.

### `baseSalary`

Bei einem Festbetrag statt einer Spanne:

```json
{
  "value": { "@type": "QuantitativeValue", "value": 3800, "unitText": "MONTH" }
}
```

`unitText` kennt `HOUR`, `DAY`, `WEEK`, `MONTH`, `YEAR`. Für deutsche Angaben ist `MONTH`
oder `YEAR` üblich; bei Stundenlohn `HOUR`, dann aber ohne Wochenstunden ist die Angabe
unvollständig und gehört in die `description`.

**Keine erfundene Gehaltsangabe.** Die harte Grenze aus `SKILL.md` gilt: Fehlt ein
freigegebener Wert, bleibt das Feld weg und der Punkt steht als `[[FEHLT: Gehaltsspanne]]`
in der Liste offener Punkte. Eine falsche Gehaltsangabe in strukturierten Daten ist
zugleich eine irreführende Angabe.

### Abgelaufene Anzeigen aktiv entfernen

Eine besetzte Stelle, die online bleibt, ist ein Ranking-Risiko und ärgert Bewerber. Drei
zulässige Wege:

1. `validThrough` auf ein Datum in der Vergangenheit setzen
2. die URL mit **404** oder **410** beantworten
3. das `JobPosting`-Markup von der Seite entfernen

Für schnelles Entfernen ist die Indexing API der Weg, nicht die Sitemap.

**Konsistenz beachten:** Wird die Stellenseite nach dem Besetzen auf `noindex` gesetzt, muss
sie aus der Sitemap verschwinden. Sonst meldet die Search Console „Übermittelte URL als
noindex gekennzeichnet", siehe `../../references/08-pflichtseiten-technik.md`.

### Prüfen

- Rich Results Test von Google für jede Stellenseite einzeln
- Search Console, Bericht zu Stellenangeboten, nach dem Livegang
- Nach dem Besetzen: prüfen, dass die Anzeige wirklich verschwunden ist

Weitere Regeln zum Funnel, zu AGG und zu Bewerberdaten:
`../../references/19-recruiting-funnel.md`.
