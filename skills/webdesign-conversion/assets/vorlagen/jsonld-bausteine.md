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
