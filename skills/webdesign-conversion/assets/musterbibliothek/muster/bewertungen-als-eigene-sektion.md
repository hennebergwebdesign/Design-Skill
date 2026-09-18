---
id: bewertungen-als-eigene-sektion
name: Kundenstimmen als eigene Komponente mit eigenem Datenformat
kategorie: testimonials
sektionstyp: [testimonials, trust]
tags: [datengetrieben, wiederverwendbar, beleg-pflicht]
stil: [clean, corporate]
branchenbezug: [dienstleistung, handwerk, gesundheit, b2b-software]
ux_zweck: Beweis in immer gleicher Form, damit er vergleichbar bleibt
conversion_zweck: Einwand gegen die Glaubwürdigkeit direkt vor der Handlungsaufforderung abräumen
responsiv: drei Spalten auf Desktop, eine auf dem Handy, Zitatlänge bleibt begrenzt
komplexitaet: niedrig
barrierefreiheit: Zitate als blockquote mit cite, Sterne nicht nur farblich, sondern auch als Text
verwandt: [partnerlogos-als-integrationsraster]
quelle_url: https://21st.dev/
quelle_erfasst: 2026-09-17
konfidenz: niedrig
freigabe: bestand
aufgenommen: 2026-09-18
---

# Kundenstimmen als eigene Komponente mit eigenem Datenformat

## Prinzip

Die Kundenstimmen stehen nicht als Markup in der Seite, sondern als Datensatz, den eine eigene
Komponente rendert. Name, Rolle, Unternehmen, Zitat, Quelle und Datum sind Felder, nicht
Absätze.

## Warum es wirkt

Der Nutzen ist nicht optisch, sondern redaktionell. Sobald die Stimmen Daten sind, hat jede
denselben Satz Felder, und ein fehlendes Feld fällt auf, statt sich in der Formulierung zu
verstecken. Genau das ist bei Beweisen entscheidend: `marke.json` verlangt zu jedem Beleg eine
Quelle, und ein Eintrag ohne Quelle wird gestrichen, nicht geschätzt.

Zweitens hält das Format die Zitate kurz und vergleichbar. Frei geschriebene Kundenstimmen
werden ungleich lang, und die längste wirkt dann am wichtigsten, ohne es zu sein.

Drittens lässt sich derselbe Datensatz an mehreren Stellen ausspielen, etwa eine Stimme im
Held und drei in der eigenen Sektion, ohne den Text zu duplizieren.

## Belege

| Aussage | Beleg |
|---|---|
| eigene Komponente statt Inline-Markup | beobachtet, im vorgelegten Demo-Aufruf |
| eigenes Datenformat je Stimme | abgeleitet aus der Aufrufsignatur |
| Aufbau und Gestaltung der Basiskomponente | unbekannt, `testimonial-v2` lag nicht im Quelltext vor |
| Wirkung auf die Conversion | unbekannt, nicht gemessen |

Konfidenz niedrig aus demselben Grund wie bei `hero-schwebende-produktbilder`: nur der
Aufrufcode lag vor. Das Prinzip trägt trotzdem, weil es nicht am Aussehen hängt.

## Umsetzung

- Pflichtfelder je Stimme: Name, Rolle oder Unternehmen, Zitat, Quelle, Datum, Freigabe des
  Kunden. Ohne Freigabe wird eine echte Stimme nicht veröffentlicht.
- Fehlt eine echte Stimme, bleibt die Sektion leer oder entfällt. Eine erfundene Kundenstimme
  ist eine Irreführung nach § 5 UWG, siehe die harte Grenze gegen erfundene Belege.
- Zitatlänge im Datenformat begrenzen, etwa auf 240 Zeichen. Längere Zitate werden gekürzt und
  die Kürzung gekennzeichnet.
- Bei Google-Bewertungen kommt derselbe Datensatz aus der Places API, siehe
  `../../../agentur-website-builder/references/google-bewertungen.md`, und wird nicht doppelt
  gepflegt.

## Was nicht übernommen wird

Die Beispielstimmen der Vorlage, jedes Porträtfoto und jeder Firmenname daraus. Das Layout der
Registry-Komponente wird an das Tokensystem des Projekts angepasst, nicht übernommen.
