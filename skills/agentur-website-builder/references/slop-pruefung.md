# Slop-Prüfung: KI-Muster vor der Übergabe messen

Ergänzt Phase 3 (Vermeideliste im Konzept) und Phase 5 (Prüfung). Die Muster, ihre Deutung und die Fälle, in denen das Werkzeug der Agentur widerspricht, stehen in
`../../webdesign-conversion/references/55-slop-detect-ki-muster-vermeiden.md`. Dieses Kapitel ist der Ablauf und wiederholt sie nicht. Das Werkzeug ist
[Slop Detect](https://github.com/ravidsrk/slop-detect) (MIT), aufgerufen über `scripts/pruefe-slop.mjs`.

## Inhalt

- 1\. Wann
- 2\. Einrichten und aufrufen
- 3\. Schwellen der Agentur
- 4\. Ausnahmen mit Grund
- 5\. Behebungsschleife
- 6\. Bericht im Abschlussbericht
- 7\. Was nicht eingebaut ist
- 8\. Der Original-Skill
- Ungeprüft und offen

## Inhalt

## 1. Wann

| Zeitpunkt | Was | Warum |
|---|---|---|
| Phase 3, Konzept | `node scripts/pruefe-slop.mjs --vorbeugen`, die Liste in den Auftrag an das Modell und in `gestaltung.sperren` der `marke.json` | was im Auftrag steht, entsteht nicht |
| Relaunch, Phase 1 | Lauf gegen die **eigene** Bestandsseite des Kunden, Ergebnis ablegen | Ausgangswert, damit der Abschlussbericht ein Vorher und Nachher zeigt. Eine **fremde** Seite zu messen ist Erfassen und unterliegt Tor 1 der Designrecherche |
| Phase 5, nach dem Bau | Lauf gegen die Vorschau | findet, was erst im gerenderten DOM sichtbar wird |
| Vor der Übergabe | derselbe Lauf mit `--streng` | Mild wird zum Fehler, jede Ausnahme steht mit Grund im Bericht |
| Nach jeder größeren Änderung | wiederholen | Änderungsrunden bringen Muster zurück, siehe `aenderungsrunden-und-layoutschutz.md` |

## 2. Einrichten und aufrufen

Der CLI scannt nur `http(s)`. Für `dist/` zuerst die Vorschau starten:

```bash
pnpm build && pnpm preview                            # Astro Vorschau, meist http://localhost:4321
npm i -D slop-detect@0.8.0                            # einmal im Projekt, sonst lädt npx die Version selbst
node scripts/pruefe-slop.mjs http://localhost:4321 --copy
node scripts/pruefe-slop.mjs http://localhost:4321 --copy --aeo --craft --streng   # vor der Übergabe
```

Voraussetzungen und Fallen:

* **Chromium muss zur Playwright-Version des CLI passen.** Passt es nicht, meldet der CLI „Executable doesn't exist". Dann `npx playwright install chromium`. Bei einem Lauf ohne Bewertung
  endet das Skript mit Exit 2 und der Meldung „NICHT GEPRÜFT", nie mit einem Ergebnis.
* **`--craft` kennt die npm-Fassung 0.8.0 nicht.** Das Skript erkennt das über die Hilfe des CLI und weist es als „nicht geprüft" aus, statt abzubrechen.
* **`--remote` und `--api` lehnt das Skript ab.** Beide schicken die Adresse an `slop-detect.com`. Eine Vorschau des Kunden gehört nicht an einen Dritten, siehe `../../webdesign-conversion/references/52-sicherheit-der-kundenseite.md`.
* Die Seite muss ohne Anmeldung rendern, sonst meldet der Motor „empty_page".
* Der CLI läuft mit den Rechten des Agenten. Er ist über `slop-detect@0.8.0` festgeschrieben, nicht auf „latest" (`arbeitsdisziplin.md`, Abschnitt 9a, fremde Skripte vor der Nutzung lesen). Für diese
  Einbindung sind README, Spezifikation, Skill und die Ausgabe des CLI gelesen, nicht sein Quelltext.

## 3. Schwellen der Agentur

| Befund | Stufe | Folge |
|---|---|---|
| Design Heavy (ab 28 Punkten, nach Abzug begründeter Ausnahmen) | Fehler | beheben, Exit 1 |
| Design Mild (10 bis 27) | Warnung, mit `--streng` Fehler | jeder Treffer wird behoben oder begründet ausgenommen, bevor übergeben wird |
| Textartefakt: Platzhalter, rohes Markdown, Chatbotrest, versteckte Zeichen, KI-Verweis in einem Link | Fehler | immer beheben, kein Wert und keine Ausnahme ersetzt das |
| Textachse bei deutschem Text: Floskeln und Dreierreihen | Hinweis | `deslop-check.mjs` und Kapitel 51 sind zuständig, der Motor kennt englische Prosa |
| Auffindbarkeit (`--aeo`) | Hinweis | Zweitmeinung zu `pruefe-geo.mjs`, kein eigenes Tor |
| Handwerk (`--craft`), System (`--design-md`) | Hinweis | Zweitmeinung zu `pruefe-seitenbasis.mjs` und `pruefe-tokens.mjs` |
| Lauf ohne Bewertung | **nicht geprüft**, Exit 2 | nie als sauber berichten |

Diese Schwellen sind ein Vorschlag der Agentur und mit dem Stand 2026.09 des Motors an zwei Testseiten gesehen, nicht an Kundenprojekten kalibriert.

## 4. Ausnahmen mit Grund

Eine Marke kann ein Muster zu Recht auslösen (Greige als Grundfarbe, eine Markenschrift aus dem Katalog). Dann steht im Projekt eine Datei `slop-ausnahmen.json`:

```json
{
  "ausnahmen": {
    "cream_default_bg": "Greige #D9D3C9 ist die Grundfarbe laut Brand Guide, Freigabe des Kunden vom 01.11.2026",
    "slop_fonts": "Instrument Serif und Inter sind Markenschriften laut marke.json"
  }
}
```

Regeln dazu:

1. **Ohne Begründung wird die Ausnahme nicht angewendet.** Das Skript bricht mit Exit 2 ab. Eine Ausnahme ohne Grund ist ein Umgehen der Prüfung.
2. **Eine Markenvorgabe trägt eine Ausnahme, eine Zwischenlösung nicht.** „Inter, bis die Markenschrift lizenziert ist" bleibt ein offener Treffer und steht im Bericht (siehe Kapitel 55, Abschnitt 5).
3. **Ausnahmen gelten je Muster, nie pauschal**, und für Muster mit echter Funktion (FAQ, Ablauf, Kennzahlen) nur, wenn der Inhalt belegt ist. Ein Kennzahlenband mit unbelegten Zahlen wird nicht durch eine
   Ausnahme gerettet, sondern streicht die Zahlen (harte Grenze).
4. Die Ausnahmen stehen im Abschlussbericht mit Grund, damit der Kunde sie sieht. Der Treffer selbst bleibt im Bericht des Skripts sichtbar, die Ausnahme zieht nur sein Gewicht ab.
5. Eine Ausnahme verändert die Punktzahl **nur in diesem Skript**. Der Motor deckelt Muster untereinander, die bereinigte Zahl ist eine Näherung.

## 5. Behebungsschleife

1. Lauf, Treffer lesen, nach Gewicht sortiert.
2. **Gebündelt beheben** nach `aenderungsrunden-und-layoutschutz.md`: Sektion benennen, sagen, was bleibt, mit dem Gegenmittel aus Kapitel 55, Abschnitt 3. Die Gegenmittel sind abgestimmt auf die harten Grenzen.
3. **Kein Muster gegen ein verwandtes tauschen.** Inter gegen Geist, Indigo gegen Violett, Linearverlauf gegen Radialverlauf bleiben Treffer.
4. Nach der Behebung `pruefe-geschmack.mjs`, `pruefe-breakpoints.mjs` und `pruefe-kontrast.mjs` erneut laufen lassen: ein behobenes Muster kann Layout oder Kontrast brechen.
5. Erneut `pruefe-slop.mjs`. **Höchstens drei Durchläufe**, danach entscheidet ein Mensch. Die Grenze ist ein Vorschlag, sie verhindert, dass der Agent einen Wert jagt statt eine Seite zu entwerfen.
6. Ein Wert unter 10 ist kein Abschluss. Danach folgen die zwei subjektiven Durchgänge (`../../webdesign-conversion/references/29-pruefdurchgaenge-und-vokabular.md`).

## 6. Bericht im Abschlussbericht

Unter „Geprüft mit Ergebnis": Stufe und Punktzahl roh und bereinigt, Definitionsversion des Motors, die offenen Warnungen, die Ausnahmen mit Grund, bei Relaunch der Ausgangswert der Bestandsseite.
Unter „Nicht geprüft und warum": Achsen, die der CLI nicht kannte oder die nicht liefen, und die Textachse bei deutschem Text.

## 7. Was nicht eingebaut ist

* **Kein Hook.** Der Lauf braucht eine laufende Vorschau und einen Browser, das passt nicht zu einem Hook nach jedem Schreiben. Was nie brechen darf, läuft als Hook (`pruefe-striche.mjs --hook`), dies ist eine
  Prüfung vor der Übergabe.
* **Keine GitHub Action** (`ravidsrk/slop-detect` bietet eine an). Sie würde jede Vorschau als Pull-Request-Kommentar bewerten. Das ist eine Entscheidung für ein Agenturprojekt mit Pull Requests, nicht für dieses Repository.
* **Keine Plattform-Integrationen** (MCP-Server, Netlify-Plugin, Lighthouse-Plugin, Vale-Regeln).
* Der Original-Skill ist nicht voreingestellt (Abschnitt 8).

## 8. Der Original-Skill

Auf ausdrücklichen Wunsch lässt sich der Skill des Werkzeugs zusätzlich installieren, der Befehl steht kommentiert in `scripts/install-quellskills.sh` (Block „Version 4.23"):
`npx --yes skills add ravidsrk/slop-detect --skill slop-detect --agent claude-code`. Er ist **nicht Teil der Voreinstellung**: im Agenturablauf gilt `pruefe-slop.mjs` (lokal, mit Agenturschwellen,
ohne Weitergabe der Adresse), nicht der Hosting-Pfad des Originals. Der Befehl ist nicht gelaufen, vorher lesen (`arbeitsdisziplin.md`, Abschnitt 9a). Der CLI selbst braucht keine Skill-Installation.

## Ungeprüft und offen

* Der Ablauf ist an keinem Kundenprojekt erprobt, der Evalfall `slop-vor-auslieferung-pruefen` ist **nicht gelaufen**.
* Gelaufen ist nur das Skript gegen den echten CLI 0.8.0 an zwei kleinen Testseiten (Heavy 66, Clean 0) und mit Tests gegen einen Ersatz-CLI.
* Ob die Schwellen (Heavy als Fehler, Mild als Warnung, drei Durchläufe) die richtigen sind, ist ungemessen.
* Die Konfiguration des Originals (`.sloprc.json` mit Schwellen und Ausnahmen je Muster, Baselines mit `--compare-to`) ist nicht genutzt, weil die npm-Fassung sie nicht kennt oder sie nicht geprüft ist.
