# Lokale Sichtbarkeit: Unternehmensprofil, Bewertungen, Ortsseiten

Für Handwerk, Praxis, Gastronomie und jede Dienstleistung mit Einzugsgebiet entscheidet sich ein
großer Teil der Anfragen, bevor jemand die Website öffnet: in der Kartenansicht, im
Unternehmensprofil, in den Bewertungen. `05-seo-sichtbarkeit.md` regelt den Ort in Titel, H1 und URL.
Dieses Kapitel ergänzt, was außerhalb der Seite liegt und doch zu ihr gehört, und was eine Ortsseite
von einer Brückenseite unterscheidet.

Quelle: Wissenspaket `webcopyseo` (Auswertung von rund 35 Videos zu Copywriting, SEO, lokalem SEO und
KI-Suche, Oktober 2026), hier vor allem die Teile zu lokalem SEO. Herkunft in `CREDITS.md`, Version 4.17.
Zahlen und Faktorenlisten aus den Videos (Whitespark Report, Bewertungsziele) sind Angaben der Quellen,
nicht geprüft, und stehen hier als Vorschlag.

Was schon an anderer Stelle steht:

| Thema | Wo |
|---|---|
| Ort in Titel, H1, URL, Text, NAP im Impressum | `05-seo-sichtbarkeit.md`, Schritt 5.1 |
| LocalBusiness-JSON-LD | `../assets/vorlagen/jsonld-bausteine.md` |
| Bewertungen auf der Seite zeigen, mit Stand und Echtheitsangabe | `06-conversion-architektur.md`, Schritt 6.3, und `07-recht-dsgvo.md` (§ 5b Abs. 3 UWG) |
| Bewertungen per Places API abrufen | `../../agentur-website-builder/references/google-bewertungen.md` |
| Karte erst nach Einwilligung | `../../agentur-website-builder/references/consent-und-dienste.md` |
| Sichtbarkeit in KI-Antworten | `31-ki-sichtbarkeit-geo.md` |

## 1. Drei Orte, an denen lokal gefunden wird

| Ort | Was dort zählt | Was die Agentur liefert |
|---|---|---|
| Kartenergebnisse | Unternehmensprofil: Kategorie, Nähe, Bewertungen, Vollständigkeit | Hinweise und Prüfliste, das Profil pflegt der Kunde (Abschnitt 6) |
| Lokale organische Treffer | Leistungsseiten und Ortsseiten mit echtem Ortsbezug | die Seiten selbst |
| KI-Antworten | Erwähnungen und Bewertungen auf mehreren Plattformen, eindeutige Angaben zur Firma | stimmige Daten auf der Seite und im Markup (`31-ki-sichtbarkeit-geo.md`) |

Die Gewichtung je Ort ist nicht bekannt und ändert sich. Zugesagt wird keine Position, nur ein sauberes
Fundament.

## 2. Name, Adresse, Telefon überall gleich

| Regel | Grund |
|---|---|
| Eine Schreibweise für Name, Adresse und Telefon, festgehalten im Markenbrief | jede Abweichung (Str. und Straße, mit und ohne GmbH) ist für Suchmaschinen eine mögliche zweite Firma |
| Gleich in Impressum, Fuß, Kontaktseite, JSON-LD, Unternehmensprofil und Verzeichnissen | dieselbe Firma, an jedem Ort erkennbar |
| Als Text auf der Seite, nicht nur im Bild oder nur im Markup | Bildschirmleser, Suchmaschine und Markup lesen dasselbe |
| Telefonnummer als `tel:`-Link | auf dem Handy der kürzeste Weg zur Anfrage |

`scripts/pruefe-geo.mjs` meldet ein LocalBusiness-Markup, dessen Telefonnummer oder Straße nicht
sichtbar auf der Seite steht (Regel 14). Ob Profil und Verzeichnisse gleich schreiben, prüft kein
Skript, das ist die Stichprobe in Abschnitt 7.

## 3. Leistungsseiten und Ortsseiten

Eine Seite je Kernleistung ist der Standard. Eine Seite je Ort nur dort, wo der Betrieb dort wirklich
arbeitet und etwas Eigenes zu sagen hat.

| Echte Ortsseite | Brückenseite (vermeiden) |
|---|---|
| Referenzen aus dem Ort, mit Freigabe | derselbe Text, nur der Ortsname getauscht |
| Anfahrt, Stadtteile, Einsatzzeiten, lokale Besonderheiten (Bauvorschriften, Bauweise, Lage) | Orte, in denen der Betrieb nie war |
| Fotos von Arbeiten vor Ort | Stockfotos mit Ortsnamen im Alt-Text |
| ein eigener Titel und eine eigene Beschreibung | Titel nach Schema, auf zwanzig Seiten gleich gebaut |

Grund: Austauschbare Ortsseiten sind ein bekanntes Spammuster und ziehen die ganze Domain nach unten.
Fehlt für einen Ort das Eigene, deckt die Leistungsseite das Einzugsgebiet im Text und im
`areaServed` des Markups ab. Wo es echte Referenzen gibt und wo nicht, steht als `[[FEHLT: …]]` im
Markenbrief, nicht als Vermutung auf der Seite.

## 4. Bewertungen: der Ablauf beim Kunden

Die Agentur baut die Darstellung, die Bewertungen sammelt der Kunde. Ein Ablauf, den die Agentur
übergibt:

| Schritt | Regel | Grund |
|---|---|---|
| Zeitpunkt | kurz nach dem Abschluss fragen, wenn die Zufriedenheit da ist (die Quelle nennt etwa zwei Wochen) | eine Bitte Monate später geht unter |
| Weg | Kurzlink oder QR-Code direkt auf das Bewertungsformular, auf Rechnung, Mail, Visitenkarte | jeder zusätzliche Klick kostet Bewertungen |
| Keine Gegenleistung | kein Rabatt, kein Gewinnspiel für eine Bewertung | verstößt gegen die Richtlinien der Plattformen und kann irreführend sein (`07-recht-dsgvo.md`) |
| Nicht filtern | nicht nur zufriedene Kunden um eine Bewertung bitten und unzufriedene auf ein Formular umleiten | das ist eine Auswahl, die das Gesamtbild verfälscht |
| Regelmäßig | lieber laufend wenige als einmal viele (die Quelle schlägt für Dienstleister zwei im Monat vor) | ein plötzlicher Schub wirkt unnatürlich und veraltet danach |
| Antworten | auf jede Bewertung zeitnah, freundlich und konkret, bei Kritik sachlich mit Lösung | Interessenten lesen die Antworten mit |
| Mehrere Plattformen | neben Google auch Branchenportale und die Plattformen, die die Zielgruppe nutzt | KI-Antworten ziehen aus mehreren Quellen (`31-ki-sichtbarkeit-geo.md`) |

Auf der Seite gelten die Regeln aus `06-conversion-architektur.md`: Schnitt, Anzahl und Stand, keine
ausgewählten Lieblingszitate ohne Hinweis, Bewertungs-Markup nur für echte, sichtbare Bewertungen und
nie als Selbstbewertung der eigenen Firma.

## 5. Verzeichnisse

Wenige saubere Einträge schlagen viele schwache: Bing Places, Apple Business Connect, die Kammer oder
der Verband der Branche, zwei oder drei Branchenportale mit Substanz, die Social-Profile, die der Kunde
wirklich pflegt. Alle mit denselben Daten aus Abschnitt 2. Bezahlte Eintragungspakete für hundert
Verzeichnisse bringen Pflegeaufwand und Abweichungen, keine Anfragen.

## 6. Das Unternehmensprofil: Prüfliste für die Übergabe

Das Profil gehört dem Kunden und wird von ihm gepflegt (Eigentum und Zugänge:
`../../agentur-website-builder/references/qa-und-abnahme.md`, Schritt 10). Die Agentur übergibt eine
Prüfliste:

* Hauptkategorie so genau wie möglich, Nebenkategorien nur für echte Leistungen.
* Leistungen vollständig, Beschreibung in der Sprache der Kunden, mit Einzugsgebiet, ohne
  Keyword-Häufung.
* Öffnungszeiten aktuell, auch Feiertage.
* Echte Fotos: Team, Arbeit, Räume, Ergebnisse. Kein Stockbild, kein generiertes Bild als Beleg
  (harte Grenze).
* Der Link führt auf die passende Leistungs- oder Standortseite, nicht pauschal auf die Startseite.
* Fragen und Antworten im Profil decken sich mit der FAQ der Website.
* Beiträge und neue Fotos in einem Rhythmus, den der Kunde halten kann.

Funktionen des Profils (Nachrichten, Buchung, Beiträge) ändern sich und sind nicht in jedem Land gleich.
Sie werden im Profil selbst geprüft, nicht aus einer Liste übernommen.

## 7. Messen und pflegen

| Was | Wo | Grund |
|---|---|---|
| Anrufe, Routenanfragen, Websiteklicks | Statistik im Unternehmensprofil | Ziel sind Anfragen, nicht Positionen |
| Anfragen über die Seite mit Quelle | `13-messung-optimierung.md` | zeigt, welche Seite trägt |
| Sichtbarkeit im Umkreis | ein Rasterbericht über mehrere Punkte im Einzugsgebiet, wenn der Kunde es bucht | eine einzelne Suche vom Büro aus zeigt nur einen Punkt |
| Stichprobe Name, Adresse, Telefon | Website, Profil, drei Verzeichnisse, einmal im Quartal | Abweichungen entstehen beim Umzug oder Nummernwechsel still |

Ein kurzer Wochenablauf für den Kunden: neue Bewertung beantworten, ein Foto oder Beitrag, Bitten um
Bewertung für abgeschlossene Aufträge verschicken.

## 8. Bewusst nicht übernommen

| Inhalt der Quelle | Grund |
|---|---|
| Feste Zahlen (Antwort binnen 24 Stunden, zehn Fotos, Faktorenzahl eines Reports) als Regel | Angaben der Quellen, ungeprüft. Sie stehen oben als Vorschlag, wo sie helfen |
| Werkzeugnamen für Rasterberichte und Bewertungsversand | Werkzeuge wechseln, die Messung zählt |
| Messengerfunktion im Profil als Empfehlung | Verfügbarkeit je Land und Zeit unklar, laut Quelle selbst zu prüfen |

## 9. Ungeprüft

* Kein Evalfall. Ob das Kapitel das Verhalten bei einem lokalen Projekt ändert, ist eine Vermutung.
* Die NAP-Prüfung in `pruefe-geo.mjs` vergleicht die letzten sieben Ziffern der Telefonnummer und die
  Straße als Text. Eine Straße, die auf der Seite abgekürzt steht („Hauptstr."), meldet sie als fehlend,
  das ist gewollt: genau diese Abweichung soll auffallen.

## Verwandte Kapitel

`05-seo-sichtbarkeit.md`, `06-conversion-architektur.md`, `07-recht-dsgvo.md`, `13-messung-optimierung.md`,
`31-ki-sichtbarkeit-geo.md`, `../../agentur-website-builder/references/google-bewertungen.md`.
