# Sicherheitsprüfung im Projekt

Das Regelwerk (`../../webdesign-conversion/references/52-sicherheit-der-kundenseite.md`) sagt, was gilt und warum. Diese Datei ist der Ablauf: wann im Bau welche Prüfung läuft, wie ein Fund
einsortiert wird und was in den Bericht gehört. Zahlungen haben zusätzlich `zahlungen-umsetzung.md`.

## Inhalt

- 1\. Wann was läuft
- 2\. Die Prüfung
- 3\. Funde einsortieren
- 4\. Missbrauch von Hand testen
- 5\. Ein Schlüssel ist aufgetaucht
- 6\. Tiefenscan mit dem Plugin claude-security
- 6a. Gestufte Prüfung nach dem Muster von Cloudflare
- 7\. Übergabe
- 8\. Bericht

## 1. Wann was läuft

| Phase | Was |
|---|---|
| 1 Analyse | Konten des Kunden festhalten (Domain, DNS, Hosting, Mail, Stripe): wer hat Zugriff, ist Zwei-Faktor-Anmeldung an |
| 3 Konzept | Vertrauensgrenzen des Projekts benennen (Formulare, Webhooks, Dienste, Dashboard), jeder neue Dienst steht im Konzept |
| 4 Umsetzung | beim ersten Commit: `.gitignore` mit `.env`, `.dev.vars`; `.env.example` mit Platzhaltern; `_headers`. Bei jeder Funktion: Missbrauchsfall als erster Test (Abschnitt 4) |
| 5 Prüfung | `pruefe-sicherheit.mjs`, Audit gegen das Lockfile, Prüfliste, optional Tiefenscan |
| 6 Übergabe | Zugänge, Rotationsplan, Eigentum, Bericht |

## 2. Die Prüfung

```bash
node scripts/pruefe-sicherheit.mjs                    # Schlüssel, öffentliche Geheimnisse, .env im Index, CSP, eval, Webhook, Stripe-Regeln
pnpm audit                                            # oder npm audit: bekannte Lücken gegen das Lockfile, braucht Netzzugriff
curl -sI https://<vorschau-adresse>/ | head -20       # Header der ausgelieferten Seite
```

* **`pruefe-sicherheit.mjs` läuft vor dem Build** (Quellen) und **nach dem Build** (`dist/`). Zweiter Lauf, weil ein Schlüssel auch im Bundle landen kann.
* **Mit `--strict`** zählen Warnungen wie Fehler. Für die Übergabe gilt: Fehler null, jede Warnung entweder behoben oder im Bericht mit Grund.
* Der Audit meldet nur **bekannte** Lücken. Er findet keine neue Schadsoftware (Regelwerk, Abschnitt 8).
* `curl -I` zeigt, was wirklich ausgeliefert wird: die Header aus `public/_headers` greifen nur, wenn die Datei in `dist/` landet.

Ein Pre-commit-Hook fängt Schlüssel vor dem Commit ab. Einrichtung wie die Strichregel (`qa-und-abnahme.md`, 2a): ein Eintrag in `.git/hooks/pre-commit`, der `node scripts/pruefe-sicherheit.mjs` aufruft (Exit 1 bricht den Commit ab). Was nie brechen darf, läuft als Hook, nicht nur als Text.

## 3. Funde einsortieren

| Befund | Aktion |
|---|---|
| Fehler `schluessel-*` | Abschnitt 5: **erst** rotieren, dann entfernen |
| Fehler `geheimnis-in-oeffentlicher-variable` | Präfix entfernen, Wert nur serverseitig lesen; den Schlüssel als offengelegt behandeln, wenn er schon ausgeliefert war |
| Fehler `env-datei-versioniert` | `git rm --cached`, `.gitignore`, alle Werte darin erneuern |
| Fehler `csp-zu-offen` | CSP eng machen, über Report-Only eingrenzen |
| Fehler `eval`, `document-write` | ersetzen, nie mit Eingaben füttern |
| Fehler zur Zahlung | `zahlungen-umsetzung.md`; ein Webhook ohne Signaturprüfung ist nie ein Warnhinweis |
| Warnung `html-aus-variable` | prüfen: eigene Konstante oder JSON-LD ist in Ordnung, Inhalt von Besuchern oder CMS bereinigen |
| Warnung `formularroute-ohne-schutz` | Turnstile, Honigtopf, Ursprungsprüfung ergänzen (`formulare-und-resend.md`) |
| Warnung `lockfile-fehlt`, `version-unfixiert` | beheben |
| Warnung `sourcemap-ausgeliefert` | Quellkarten für die Auslieferung abschalten |
| Hinweis `steuer-registrierung` | Frage an den Kunden (Steuerberater) |

Treffer, die sich als Testdaten oder Beispiel erklären, werden nicht still hingenommen, sondern aus den Quellen entfernt oder in einen Vorlagenordner (`vorlagen/`) verschoben: Dort sucht das Skript nicht.

## 4. Missbrauch von Hand testen

Zu jeder Funktion der Seite ein Fall, der sie missbraucht. Für eine Formularroute:

| Fall | Erwartung |
|---|---|
| Anfrage ohne `Origin`, mit fremdem `Origin` | 403 |
| Honigtopf-Feld gefüllt | Antwort 200, nichts versendet |
| Ohne oder mit falschem Turnstile-Token | 400 |
| Feld mit 100.000 Zeichen | zugeschnitten oder 413, kein Absturz |
| Zeilenumbruch und weitere Empfänger im Namens- oder Betreff-Feld | in keiner Mail-Kopfzeile |
| 20 Anfragen hintereinander | ab der Grenze 429 |
| Fehler beim Mailversand erzwingen | generische Antwort ohne Stacktrace |
| `GET` auf die Route | 405 |

Für einen Webhook: falsche Signatur → 400, doppelte Zustellung → einmal erfüllt (`zahlungen-umsetzung.md`). Für jedes Gebiet, das Nutzereingaben als Markup ausgibt: ein `<script>` als Eingabe wird als Text sichtbar, nicht ausgeführt.
Ausführen mit `curl` gegen die Vorschau-Adresse oder mit `playwright-cli` (`browser-pruefung-mit-playwright-cli.md`); nie gegen fremde Server und nie mit echten Zahlungsdaten.

## 5. Ein Schlüssel ist aufgetaucht

1. **Nicht weiterverwenden.** Der Schlüssel gilt als offengelegt, egal ob er im Repository, in einer Datei, im Chat oder in einem Bildschirmfoto stand.
2. **Rotieren**: im Dienst widerrufen und einen neuen ausstellen (bei Stripe: den Schlüssel im Dashboard „rollen"), neuen Wert nur als Secret des Hostings ablegen.
3. **Protokolle des alten Schlüssels ansehen**: Gab es Aufrufe, die nicht von uns stammen? Bei Unbekanntem den Dienst kontaktieren.
4. **Dann erst aufräumen**: aus dem Quelltext entfernen, den Verlauf bereinigen, wenn das Repository öffentlich ist oder geteilt wird.
5. **Ursache beheben**: Warum konnte er dorthin? (öffentliches Präfix, eingecheckte Datei, Kopie im Chat) Hook einrichten.
6. Im Bericht festhalten: was, wann, rotiert (ja/nein), Ursache.

Fügt der Nutzer im Gespräch einen Live-Schlüssel ein: nicht in eine Datei schreiben, nicht benutzen, den Nutzer um Erneuerung bitten und zeigen, wie ein Platzhalter und ein Secret des Hostings aussehen.

## 6. Tiefenscan mit dem Plugin claude-security

Optional, bei Zahlung, Anmeldung oder Leadsystem sinnvoll. Der Nutzer installiert selbst (`/plugin install claude-security@claude-plugins-official`, danach `/claude-security`); das Plugin steht unter einer proprietären Lizenz ohne
Weitergaberecht und liegt deshalb nicht in diesem Repository.

* Gescannt wird **eigener Code** im Projekt. Für fremden Code läuft die Sitzung in einer Sandbox.
* Der Scan kostet Zeit und Tokens, fragt einmal nach der Bestätigung. Der Nutzer wird vorher gefragt, nicht nach dem Start überrascht.
* `Scan changes` für eine Änderung (bei größeren Funktionen mit hohem Aufwand), `Scan codebase` für das ganze Projekt.
* Der Berichtsordner `CLAUDE-SECURITY-<Zeitstempel>/` trägt eine eigene `.gitignore`; vor dem Teilen lesen, die Schwärzung von Schlüsseln ist Bestmaß, keine Garantie.
* Funde sind Hinweise, die ein Mensch bewertet; Patchdateien werden gelesen, gegen die harten Grenzen geprüft und erst dann angewendet. Das Plugin ändert nichts selbst.
* Nicht gelaufen und nicht gemessen; der Nutzen ist hier eine Vermutung.

## 6a. Gestufte Prüfung nach dem Muster von Cloudflare

Aus dem Repository `cloudflare/security-audit-skill` (MIT, Stand 11.10.2026), dem Skill, aus dem Cloudflares Werkzeug zur Schwachstellensuche hervorging. Er ist als Ablauf für ein
ganzes Repository gebaut (Aufklärung, Suche in Wellen, Gegenprüfung, strukturierter Bericht). Für eine Kundenseite ist der volle Ablauf fast immer zu groß. Übernommen sind die **Disziplin** und
die **Befundstufen**; sie gelten auch für die Prüfung von Hand und für den Tiefenscan aus Abschnitt 6. Die Übertragung auf Astro und Cloudflare Pages ist eigene Zusammenstellung.

**Zwei Betriebsarten.**

| Art | Wann | Was entsteht |
|---|---|---|
| Beratung | Normalfall: Frage zur Sicherheit, Prüfung einer Änderung, ein bestimmter Verdacht, Abschnitte 2 bis 4 | eine Antwort oder ein Absatz im Bericht, keine neuen Dateien |
| Vollprüfung | nur auf ausdrücklichen Auftrag („Sicherheitsaudit", „Pen-Test"), bei Zahlung, Anmeldung, Dashboard oder Leadsystem | Berichtsdateien außerhalb des Repositories; Ordner, den die Versionsverwaltung nicht erfasst |

Ist offen, welche der beiden gemeint ist, eine gezielte Frage stellen, bevor Dateien entstehen. Der Ordner mit den Ergebnissen liegt **außerhalb** des Projekts oder in einem
ausgeschlossenen Ordner (`.gitignore`), weil Berichte Pfade, Auszüge und Verdachtsmomente enthalten.

**Drei Befundstufen.** Ein Fund steht in genau einer.

| Stufe | Voraussetzung | Schweregrad |
|---|---|---|
| bestätigt | vollständiger Pfad im Quelltext von der Eingabe bis zur Wirkung und ein begrenzt beobachtetes Ergebnis | ja, nur hier |
| zu klären | eine **genau benannte** Tatsache, die außerhalb des Quelltexts liegt (Einstellung im Dashboard, DNS, Zugriffsregel, Zustand beim Anbieter), dazu ein sicherer Weg, sie zu klären | nein, nie |
| verworfen | der Verdacht ist widerlegt; er bleibt vermerkt, damit er nicht erneut gemeldet wird | entfällt |

Ein Fund ohne diese Angaben ist ein Härtungshinweis, kein Fund: **wer** (geringeres Vertrauen) über **welche Eingabe** an der **Kontrolle** vorbei **welche Grenze** überschreitet und **was**
dadurch passiert. Ein fehlender Header allein, ein vermutetes Verhalten des Hosters, eine Absturzstelle ohne Wirkung und Schaden, den man sich nur selbst zufügt, sind keine
bestätigten Funde. Ist eine Schicht A wirksam, ist das Fehlen von Schicht B ein Hinweis zur Härtung.

**Was nicht im Quelltext steht, wird weder angenommen noch ausgeschlossen.** Regeln im Cloudflare-Dashboard (Ratenbegrenzung, WAF, Zugriffsregeln, Header per Regel), DNS und die
Einstellungen von Resend oder Stripe sind echte Kontrollen und stehen nicht im Repository. Fehlt eine, heißt der Befund „zu klären" mit der Frage an den Inhaber („Gibt es für `/api/kontakt` eine Regel zur
Ratenbegrenzung im Dashboard?"), nicht „fehlt" und nicht „vorhanden".

**Schweregrad nach Schaden, nicht nach Gefühl.** Die Anker der Quelle, übertragen:

| Stufe | Anker der Quelle (sinngemäß) | Beispiel für eine Kundenseite (eigene Übertragung) |
|---|---|---|
| kritisch | Ohne Anmeldung Codeausführung, voller Datenzugriff oder Übernahme beliebiger Konten | Eine offene Route liefert alle Leads oder erlaubt Befehle auf dem Server |
| hoch | Eine ausdrückliche Sicherheitskontrolle fällt vollständig, mit echten Folgen | Webhook ohne Signaturprüfung meldet Bestellungen als bezahlt; gespeichertes Skript trifft andere Besucher |
| mittel | echte Grenzverletzung mit kleiner Reichweite oder ungewöhnlichen Voraussetzungen | Mail-Kopfzeile lässt sich über das Namensfeld erweitern, aber nur auf eine feste Empfängerliste |
| niedrig | Preisgabe unkritischer Interna oder dauerhafter Aufwand für wenig Gewinn | Version eines Pakets in einer Antwort sichtbar |
| Hinweis | bestätigt, aber kaum Wirkung, nützlich als Baustein eines größeren Fundes | Quellkarten ausgeliefert, ohne dass Geheimnisse darin stehen |

Die Trennfrage zwischen hoch und mittel: Hebt das gezeigte Ergebnis eine ausdrückliche Kontrolle für eine Handlung mit echten Folgen **ganz** auf, oder schwächt es sie nur? Wer den
konkreten Schaden nicht nennen kann, vergibt eine niedrigere Stufe, als es sich anfühlt.

**Regeln der Prüfung.**

1. **Wer sucht, prüft nicht.** Jeden Fund liest ein Prüfer, der ihn nicht gefunden hat, mit dem Auftrag, ihn zu widerlegen (`arbeitsdisziplin.md`, Abschnitt 8, ohne die Schlussfolgerung mitzugeben). Ein Fund ohne diese Gegenprüfung ist ein Verdacht.
2. **Bericht erst nach der Gegenprüfung**, und Text und Datensatz stimmen überein. Vorher kein Bericht.
3. **Code nur in einer Sandbox ausführen.** Gilt für Fremdcode (Relaunch, Vorlage, Fund aus dem Netz): kein Netz nach außen (höchstens ein abgeschlossenes lokales Netz), eine leere Umgebung mit ausdrücklich freigegebenen harmlosen Werten, das Ziel nur lesbar, Schreiben nur in einen zugewiesenen Arbeitsordner, feste Grenzen für Rechenzeit, Speicher, Prozesse und Laufzeit. Lässt sich eine dieser Bedingungen nicht erzwingen, **wird nicht ausgeführt**: Befund „zu klären" mit der fehlenden Sandbox als Grund und einem sicheren Prüfweg.
4. **Nie gegen Live-Systeme.** Keine Sonden gegen ausgelieferte Endpunkte Dritter, gegen gemeinsame Dienste, echte Konten, Produktionsdaten oder kostenpflichtige Kontingente; keine Belastungstests gegen eine laufende Instanz. Zu Abschnitt 4: Die **eigene Vorschau** mit Testdaten und Testschlüsseln ist die lokale Prüfumgebung der Agentur und bleibt erlaubt. Die Produktionsadresse des Kunden gehört nicht dazu.
5. **Platzhalter statt echter Daten.** Dummy-Konten, Testschlüssel, erfundene Datensätze. Echte Zugangsdaten tauchen in keinem Befehl und keinem Bericht auf (Abschnitt 5).
6. **Nicht über das Minimum hinaus.** Ein Ergebnis wird auf den kleinsten Beleg begrenzt (falscher Rückgabewert, fremder Testdatensatz, abweichende Antwort der Regel). Keine Verkettung bis zum Schadensbild, kein Material zum Dauerzugriff.
7. **Die kleinste wirksame Korrektur.** Je bestätigtem Fund: die Bedingung benennen, die der Code durchsetzen muss, die engste Änderung an der letzten vertrauenswürdigen Entscheidungsstelle und einen Test, der die Lücke künftig fängt. Die Prüfung ändert den Quelltext nicht selbst; die Korrektur ist ein eigener Schritt, den ein Mensch freigibt.
8. **Erneute Läufe sind additiv.** Frühere Befunde werden nur übernommen, wenn der betroffene Quelltext unverändert ist; ein früher „verworfener" Verdacht unterdrückt nur genau diese widerlegte Behauptung, nicht die Prüfung des Bereichs. Die Quelle berichtet, ein einzelner Lauf habe in ihren Tests etwa die Hälfte dessen gefunden, was wiederholte Läufe zusammen fanden; das ist eine Aussage der Quelle, hier nicht gemessen.
9. **Eine Deckungsaussage, nie „sicher".** Der Bericht sagt, welche Teile in welcher Tiefe geprüft sind und welche nicht, und ob ein Lauf eine Teilprüfung war. Ein Lauf ohne frühere Ergebnisse sagt das ausdrücklich.

**Prüfklassen, die für eine Kundenseite zählen.** Auswahl aus den Begleitdateien der Quelle (Gerüst, Clientseite, Cloud und Auslieferung), je mit der Grenze, die die Quelle zieht. Alles, was die
Quelle sonst behandelt (Speicherzugriff, Protokolle, RPC, Mandantentrennung, Lieferkette, Verbrauch), ist hier nicht gelesen oder für eine statische Seite unerheblich.

| Klasse | Prüfen | Kein Fund, wenn |
|---|---|---|
| Ereignisquelle nicht geprüft | Webhook oder Rückruf vertraut Feldern im Körper als Absender, ohne Signatur, Konto und Wiederholungsschutz zu prüfen | Signatur über den Rohkörper, Zeitfenster und Ereignis-ID geprüft (`zahlungen-umsetzung.md`) |
| Weitergeleitete Identität | Header wie `X-Forwarded-For` oder Identitätsfelder werden ausgewertet, obwohl sie jeder Aufrufer setzen kann | Nachweislich vom vorgeschalteten Dienst gesetzt und alle anderen Wege versperrt |
| Geheimnis offengelegt | Schlüssel in Protokoll, Antwort, Bundle, öffentlicher Variable, Vorschau-Build | Es ist nur ein **Verweis** auf ein Secret, oder der Wert ist ohnehin öffentlich (Schlüssel für die Anzeige) |
| Vorrang der Konfiguration | Entwicklungswerte, Vorschau gegen Produktion, Umgebungsvariablen schalten Schutz ab | Für jede ausgelieferte Umgebung geprüft, nicht nur für die Grunddatei |
| Zustandsänderung per Rahmen | Eine Aktion, die etwas ändert, lässt sich in einem fremden Rahmen auslösen (`frame-ancestors` fehlt) | Die Seite ist reiner Lesetext |
| Nachrichten zwischen Fenstern | `postMessage`-Empfänger (Consent, Karten, Einbettungen) führt etwas aus, ohne die Herkunft **genau** zu vergleichen | Exakter Vergleich der Herkunft, nicht Teilstring, Präfix oder Endung |
| Markup aus Eingaben | `location`, `referrer`, Speicher oder Nachrichtendaten laufen in `innerHTML` und ähnliche Senken | Das Framework maskiert, oder die Quelle ist eine eigene Konstante |
| Browserspeicher und Service Worker | Persönliche Antworten im Cache, Token oder Entwürfe bleiben nach Abmeldung lesbar (nur Dashboard) | Ein Token im Speicher allein, ohne Leser mit weniger Rechten |
| Fremder Ursprung mit Anmeldedaten | CORS spiegelt die Herkunft und erlaubt Anmeldedaten | Nur ein Platzhalter ohne Anmeldedaten |
| Offene Weiterleitung | Parameter `redirect`, `return`, `next`, `url` wird ungeprüft in eine Weiterleitung gesetzt | Nur gleiche Herkunft erlaubt |
| Basis-Checks | Schlüsselartige Zeichenketten, `TODO: auth`, Debug-Schalter, Test-Zugangsdaten, `.env` im Repository, offene Routen `/debug`, `/admin`, `/env`, Cookies ohne `HttpOnly`/`Secure`/`SameSite`, Stacktraces in Antworten | Der Treffer ist verfolgt: Ein Cookie ohne `HttpOnly` ist nur dann ein Befund, wenn es Sensibles trägt und das Skript es nicht lesen muss |

Der Satz der Quelle zum Abschluss der Basis-Checks gilt für alle Zeilen: **Ein Treffer ist kein Fund; den ganzen Pfad verfolgen, bevor man ihn meldet.**

## 7. Übergabe

* Zugänge zu Domain, DNS, Hosting, Mail, Stripe gehören dem Kunden, Zwei-Faktor-Anmeldung ist an (Authenticator-App oder Passkey, nicht per SMS); die Agentur ist Teammitglied mit der kleinsten Rolle, bis zur Übergabe, dann entfernt.
* Eine Liste der Schlüssel: wo sie liegen (Name des Secrets, nie der Wert), wer sie ausgestellt hat, wann sie erneuert werden.
* Der Rückweg: frühere Bereitstellung in Cloudflare Pages wiederherstellen, wer das darf.
* Wer Meldungen bekommt (Stripe, Cloudflare, Resend).

## 8. Bericht

Im Abschnitt „Geprüft mit Ergebnis" und „Nicht geprüft und warum" (`qa-und-abnahme.md`), hier als Beispiel mit erfundenen Zahlen, die im Projekt durch die echten ersetzt werden:

```
Sicherheit: pruefe-sicherheit.mjs vor und nach dem Build: 0 Fehler, 2 Warnungen (begründet: …).
Audit (pnpm audit) gegen das Lockfile: 0 kritisch, 1 hoch (nur im Build erreichbar, bis [Datum] zurückgestellt).
Header per curl auf der Vorschau geprüft. Missbrauchsfälle der Formularroute von Hand getestet: 8 von 8.
Nicht geprüft: Berechtigungen im Dashboard, Tiefenscan (nicht beauftragt), Zwei-Faktor-Anmeldung der Konten des Kunden.
```

Die Befundstufen aus Abschnitt 6a gehören in dieselbe Berichtszeile: „bestätigt: n, zu klären: n (je mit der genauen Frage), verworfen: n".
Nicht gelaufen: Der Ablauf nach Cloudflare ist an keinem Kundenprojekt erprobt, das Δ ist eine Vermutung; gelesen sind `SKILL.md`, `README.md`, `ATTACK-CLASSES.md`,
`CLIENT-SIDE.md`, `CLOUD-AND-DEPLOYMENT.md`, der Anfang von `VALIDATION-AND-REPORTING.md` und die Einleitung von `SUPPLY-CHAIN-AND-RELEASE.md`; nicht gelesen sind `HUNTING.md`,
`RECONNAISSANCE.md`, die übrigen Begleitdateien, `report-schema.json` und die beiden Prüfskripte (`validate-findings.cjs`, `validate-coverage-ledger.cjs`). Die Prüfskripte der Quelle sind nicht
mitgeliefert: Sie prüfen eine Berichtsdatei in einem Format, das dieses Repository nicht führt.
