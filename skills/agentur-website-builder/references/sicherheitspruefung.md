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
