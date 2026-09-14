# Google Bewertungen

Gehört in jedes Projekt, auch in eine reine Unternehmenshomepage. Bewertungen sind das
wirksamste Vertrauenselement, das ohne Zutun des Kunden aktuell bleibt. Die Platzierung
regelt `../../webdesign-conversion/references/06-conversion-architektur.md`: nicht einmal
irgendwo, sondern direkt unter dem Heldenbereich und vor jeder Handlungsaufforderung.

## Aufbau

Der Abruf läuft **serverseitig** in einer Astro Serverroute auf Cloudflare, das Ergebnis
liegt in Cloudflare KV. Der Browser spricht nie mit Google.

```
Besucher  ->  /api/bewertungen  ->  KV Cache
                                     |  bei Treffer: sofort zurück
                                     |  bei Ablauf: Places API abrufen,
                                     |              in KV schreiben, zurückgeben
                                     |  bei Fehler:  letzter bekannter Stand
```

Vorlage in `../assets/reviews/bewertungen-route.ts`. Bindings: KV Namespace
`REVIEWS_CACHE`, Secret `GOOGLE_PLACES_API_KEY`, dazu `PUBLIC_GOOGLE_PLACE_ID`.

## Aktualität

Die Cachelaufzeit beträgt 24 Stunden. Läuft der Eintrag ab, holt der nächste Aufruf frische
Daten. Sternewert und Gesamtzahl sind damit tagesaktuell, ohne dass jemand etwas pflegt.
Kürzere Laufzeiten bringen nichts, kosten aber Kontingent bei Google.

Die Places API liefert höchstens fünf Rezensionen. Das ist eine Grenze der Schnittstelle,
keine Einstellungssache. Darum immer zusätzlich die Gesamtbewertung und die Gesamtzahl
anzeigen sowie einen Link zum vollständigen Profil.

## Schlüssel und Konfiguration

* `GOOGLE_PLACES_API_KEY` ist der Agenturschlüssel, liegt als Cloudflare Secret, nie im
  Repo, nie im Frontend. In der Google Cloud Konsole auf die Places API begrenzen.
* `PUBLIC_GOOGLE_PLACE_ID` ist die Place ID des Kundenstandorts und wird pro Projekt
  gesetzt.
* Beim Einrichten die Place ID über den Place ID Finder ermitteln und mit dem Nutzer
  abgleichen. Die falsche Filiale fällt sonst erst dem Kunden auf.

## Darstellung

* Sternewert mit einer Nachkommastelle, Gesamtzahl der Bewertungen, Link zum Profil
* Stand dazuschreiben, also das Datum des Abrufs. Eine nackte Zahl ist nicht überprüfbar,
  siehe die Trust-Regeln in
  `../../webdesign-conversion/references/06-conversion-architektur.md`
* die gelieferten Rezensionen als Karten mit Name, Sternen, Text und relativem Datum
* lange Texte kürzen mit Möglichkeit zum Aufklappen, nicht hart abschneiden
* Profilbilder aus der Antwort nicht direkt vom Google Server einbinden, sondern durch die
  eigene Route leiten oder durch Initialen ersetzen, damit keine Verbindung zu Google
  entsteht
* leerer Zustand, wenn ein Standort noch keine Bewertungen hat, dann Sektion ausblenden
  statt eine leere Fläche zeigen
* die Karten sind Kacheln und bekommen damit einen Hover-Effekt, siehe die harte Grenze in
  `../../webdesign-conversion/SKILL.md`

## Datenschutz

Weil der Abruf serverseitig läuft und keine Daten des Besuchers an Google gehen, ist der
Block **einwilligungsfrei** und wird nicht vom Consent Banner blockiert. Diese Einordnung
setzt voraus, dass wirklich nichts nachgeladen wird, auch keine Profilbilder und keine
Schriften von Google. In der Datenschutzerklärung wird der Einsatz trotzdem beschrieben.

Googles Nutzungsbedingungen erlauben ein zeitlich begrenztes Zwischenspeichern zur Anzeige,
aber kein dauerhaftes Spiegeln in eine eigene Datenbank. Der Cache bleibt darum ein Cache
mit Ablauf, keine Kopie. Der zusätzliche Fallback-Eintrag ohne Ablauf in der Vorlage ist
bewusst nur der letzte bekannte Stand für den Störfall und wird bei jedem erfolgreichen
Abruf überschrieben.

## Strukturierte Daten

Aggregierte Bewertungen dürfen als strukturierte Daten ausgezeichnet werden, wenn sie sich
auf das Unternehmen beziehen und auf der Seite sichtbar sind. Sie werden aus derselben
Antwort erzeugt wie die Anzeige, damit Markup und Sichtbares nie auseinanderlaufen. Niemals
feste Werte hart eintragen. Bausteine:
`../../webdesign-conversion/assets/vorlagen/jsonld-bausteine.md`, Abgrenzung zwischen
Unternehmens- und Produktbewertung in
`../../webdesign-conversion/references/05-seo-sichtbarkeit.md`.
