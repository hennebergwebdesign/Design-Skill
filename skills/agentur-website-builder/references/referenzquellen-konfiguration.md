# Referenzquellen konfigurieren

Die Quellen für die Entdeckung stehen in `assets/recherche/referenzquellen.json`, nicht im
Code und nicht als Aufzählung in einem Fließtext. Eine Quelle ergänzen heißt: einen Eintrag
anlegen. Kein Skript ändern, keine Referenzdatei umschreiben.

Warum als Datei und nicht als Liste im Kapitel: Bis Version 3.3.0 standen dieselben fünf
Quellen an drei Stellen (Kapitel, Skillbeschreibung, Enum in `marke.json`). Jede Ergänzung
musste dreimal gemacht werden, und nach der zweiten vergisst man eine.

## Pflichtfelder je Quelle

| Feld | Bedeutung | Bei Unsicherheit |
|---|---|---|
| `schluessel` | Kurzname, wird in `marke.json` und im Register verwendet | kleingeschrieben, ohne Leerzeichen |
| `name` | Anzeigename | |
| `url` | Einstiegsadresse | `null` bei der Pseudoquelle `direkt` |
| `rolle` | `galerie`, `registry` oder `direkt` | siehe unten |
| `aktiv` | ob die Quelle im Projekt verwendet wird | `false` statt löschen, damit die Historie bleibt |
| `wofuer` | wofür diese Quelle taugt, in einem Satz | ohne diesen Satz wird sie nie gezielt genutzt |
| `entdeckungsweg` | wie dort tatsächlich gesucht wird | |
| `suchmuster` | Adressmuster mit `{frage}` | `null`, wenn keines bekannt ist |
| `suchmuster_geprueft` | ob das Muster tatsächlich aufgerufen wurde | **immer `false`, bis es jemand aufgerufen hat** |
| `crawlbar` | `ja`, `nein` oder `unbekannt` | `unbekannt` ist eine gültige Antwort |
| `grenzen` | was diese Quelle nicht kann, als Liste | leere Liste nur, wenn wirklich nichts bekannt ist |
| `notizen` | Herkunft, seit wann, Erfahrungen | |

## Die drei Rollen

| Rolle | Bedeutung | Konsequenz |
|---|---|---|
| `galerie` | Entdeckungsquelle | Die Galerie selbst wird nie als Designreferenz erfasst. Erfasst wird die Originalseite. Ist sie nicht erreichbar, ist der Kandidat unbrauchbar, nicht „halb brauchbar mit Screenshot" |
| `registry` | Komponentenquelle mit Quelltext | Lizenz je Block einzeln prüfen, Tokens ummünzen, Demobilder ersetzen |
| `direkt` | vom Kunden genannt, Wettbewerber, bekannte Seite | keine Suche nötig, aber dieselbe Freigabepflicht |

## Warum `suchmuster_geprueft` fast immer `false` ist

Ein Suchmuster ist eine Annahme über die Adressstruktur einer fremden Website. Sie kann
stimmen, kann veraltet sein, und die Seite kann sie morgen ändern. Trägt jemand ein Muster
ein und markiert es als geprüft, ohne es aufgerufen zu haben, entsteht genau die Sorte Beleg,
die dieses Repository nicht führt, siehe die Regel gegen erfundene Belege in der
Repo-`CLAUDE.md`.

Beim ersten tatsächlichen Einsatz gilt deshalb:

1. Muster aufrufen.
2. Führt es zu Treffern: `suchmuster_geprueft` auf `true`, Datum in `notizen`.
3. Führt es nicht zu Treffern: Muster korrigieren oder auf `null` setzen und den
   `entdeckungsweg` als Handarbeit beschreiben. **Nicht** das Ergebnis aus der Erinnerung
   beschreiben.

## Eine Quelle aufnehmen

1. Prüfen, ob sie etwas kann, was die vorhandenen nicht können. Eine zehnte Galerie mit
   denselben Seiten ist kein Zugewinn, sondern eine weitere Zeile zum Pflegen.
2. Eintrag in `referenzquellen.json` anlegen, mit allen Pflichtfeldern,
   `suchmuster_geprueft: false` und einer ehrlichen `grenzen`-Liste.
3. Beim ersten Einsatz im Projekt die Felder `crawlbar` und `suchmuster_geprueft` nachziehen.
4. Wenn die Quelle sich im Projekt bewährt hat, in
   `../../webdesign-conversion/references/22-premium-designquellen.md` eine Zeile ergänzen,
   die sagt, **wofür** sie taugt. Erst dann ist sie auffindbar.

## Eine Quelle stilllegen

`aktiv: false` statt löschen. Der Eintrag bleibt als Historie stehen, mit einer Notiz warum.
Ein gelöschter Eintrag wird in einem halben Jahr erneut vorgeschlagen und erneut verworfen.

Die Adressen fremder Domains veralten. Die Liste gehört einmal jährlich durchgesehen, dieselbe
Pflicht gilt für die Ausgangsliste in `referenzen-und-auswahl.md`.

## Verwandte Kapitel

- Ablauf mit beiden Freigaben: `designrecherche-ablauf.md`
- Was aus einer Referenz übernommen werden darf: `referenzen-und-auswahl.md`
- Wofür jede Quelle taugt: `../../webdesign-conversion/references/22-premium-designquellen.md`
