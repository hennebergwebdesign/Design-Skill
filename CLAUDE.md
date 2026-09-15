# Design-Skill

Repository für das Claude-Code-Plugin `webdesign-conversion` von Henneberg Webdesign und
That's it. Marketing. Hier wird kein Kundenprojekt gebaut, hier wird das Werkzeug gepflegt,
mit dem Kundenprojekte gebaut werden.

## Kunde und Ziel

Nutzer sind die Agentur selbst und alle, die das Plugin über den Marketplace installieren.
Ziel ist eine Kundenseite, die ohne Nacharbeit ausgeliefert werden kann: conversionstark,
rechtlich tragfähig, barrierearm, schnell, und nicht wie von einer Maschine gebaut.

## Aufbau: zwei Skills, ein Plugin

| Skill | Rolle | Lizenz |
|---|---|---|
| `skills/webdesign-conversion/` | das Regelwerk: was gut ist und warum. 23 Referenzen, 3 Playbooks, Vorlagen, Checklisten | MIT |
| `skills/agentur-website-builder/` | der Lieferablauf: Phasen 0 bis 6, fester Agenturstack, einsatzfertiger Code | Agenturstandard, siehe seine `SKILL.md` |

Die Trennung ist die zentrale Entscheidung dieses Repositories: **Wissen und Ablauf sind
zwei Dinge.** Das Regelwerk gilt auch in einem fremden Stack, der Ablauf gilt nur für
Agenturprojekte. Wer beides in eine Datei legt, bekommt eine SKILL.md, die niemand mehr
liest, und Regeln, die sich beim ersten React-Projekt widersprechen.

Daraus folgt die wichtigste Pflegeregel: **Der Bauablauf wiederholt keine Inhalte des
Regelwerks, er verweist darauf.** Verweise haben die Form
`../webdesign-conversion/references/12-copywriting.md`. Wer einen Abschnitt in beiden
Skills findet, hat einen Fehler gefunden, keine Redundanz mit Absicht.

## Befehle

```bash
# Prüfskripte, laufen gegen ein Kundenprojekt, nicht gegen dieses Repository
node scripts/pruefe-striche.mjs
node scripts/pruefe-tokens.mjs
node scripts/pruefe-kontrast.mjs
node scripts/pruefe-platzhalter.mjs --launch
node scripts/pruefe-breakpoints.mjs http://localhost:4321 --bilder

# Agenturwerkzeuge
node scripts/relaunch-inventory.mjs https://alte-kundenseite.de
node scripts/deslop-check.mjs --text "Wir begleiten Sie ganzheitlich."

# Eval-Suite
claude plugin eval .
claude plugin eval . --case consent-ohne-keks
claude plugin eval . --runs 1 --ablation none

# Quell-Skills in ein Kundenprojekt nachinstallieren
bash scripts/install-quellskills.sh
```

Alle Skripte laufen mit reinem Node, ohne Abhängigkeiten. Nur `pruefe-breakpoints.mjs`
braucht Playwright im Zielprojekt. Kein `package.json`, und das bleibt so: ein
Abhängigkeitsbaum in einem Skill-Repository wird beim nächsten Audit zum Problem und bringt
hier nichts ein.

## Dateistruktur

```
.claude-plugin/       plugin.json, marketplace.json
skills/
  webdesign-conversion/     SKILL.md, references/00-22, playbooks/, assets/
  agentur-website-builder/  SKILL.md, references/, assets/consent|forms|reviews
scripts/              fünf Prüfskripte, zwei Agenturwerkzeuge, ein Installer
evals/                acht Fälle mit Gradern, results/ ist ausgenommen
README.md             Außendarstellung
CREDITS.md            Herkunft jeder eingeflossenen Quelle
```

## Konventionen

Diese Punkte haben einen Grund. Wer sie ändert, ändert damit auch den Grund.

- **Alles auf Deutsch**, Referenzen, Skripte, Ausgaben, Commits. Die Zielgruppe ist der
  DACH-Raum, und ein deutschsprachiger Skill erzeugt deutschsprachige Ausgaben.
- **Keine Gedankenstriche im Fließtext.** Das ist die Regel, die der Skill selbst durchsetzt,
  und sie gilt für ihn zuerst. Ausnahme, weil bereits Konvention: die Kopfzeile der
  Prüfskripte in `scripts/` folgt dem Muster `name.mjs — was es tut`.
- **Jede Regel bekommt ihren Grund.** Eine Regel ohne Begründung wird in der dritten Sitzung
  zurückgedreht. Das gilt für die Referenzen und für diese Datei.
- **Jede harte Grenze braucht eine Prüfung.** Wird in `SKILL.md` eine neue harte Grenze
  ergänzt, gehört dazu entweder ein Prüfskript oder ein Eval-Fall. Sonst ist es eine
  Checkbox.
- **Ein Eval-Fall, der ohne Skill genauso besteht, misst nichts.** Immer mit Baseline laufen
  lassen und auf das Δ sehen, nicht auf die Punktzahl. Siehe `evals/README.md`.
- **Referenzen sind Nachschlagewerke, keine Fließtexte.** Tabelle vor Absatz, Beispiel vor
  Beschreibung, und am Ende die Verweise auf verwandte Kapitel.
- **Keine erfundenen Belege**, auch nicht in den eigenen Unterlagen. Ein noch nicht
  gemessener Eval-Wert wird als ungemessen benannt.
- **Vorlagen dürfen Platzhalter enthalten**, deshalb nimmt `pruefe-platzhalter.mjs` Ordner
  namens `vorlagen` und `templates` aus.
- Versionsnummer in `.claude-plugin/plugin.json` und in der `metadata` der beiden `SKILL.md`
  bei inhaltlichen Änderungen nachziehen.

## Eine neue Referenz aufnehmen

1. Entscheiden, in welchen Skill sie gehört: Wissen nach `webdesign-conversion`, Ablauf oder
   Agenturvorgabe nach `agentur-website-builder`.
2. Prüfen, ob der Inhalt schon irgendwo steht. Wenn ja, dort ergänzen statt neu anlegen.
3. Datei anlegen, im Regelwerk mit laufender Nummer (`23-...`), im Bauablauf mit sprechendem
   Namen.
4. In die Referenztabelle der zugehörigen `SKILL.md` eintragen, mit der Spalte „wann lesen".
5. Von den verwandten Kapiteln aus verlinken, sonst wird sie nicht gefunden.
6. `README.md` und diese Datei nachziehen.

## Offene Punkte

- `consent-ohne-keks` und `leadsystem-nur-auf-bestaetigung` sind noch nicht gelaufen. Ihr Δ
  ist eine Vermutung, kein Messwert.
- Für vier der sechs älteren Eval-Fälle fehlt weiterhin die Baseline-Messung.
- `relaunch-inventory.mjs` ist gegen einen lokalen Testserver geprüft, noch nicht gegen eine
  echte Kundenseite und noch nicht gegen die Firecrawl API.
- Die Referenzliste in `agentur-website-builder/references/referenzen-und-auswahl.md` enthält
  fremde Domains. Sie veraltet und gehört einmal jährlich durchgesehen.
- Die Lizenzlage ist gemischt: MIT für das Regelwerk, Agenturstandard für den Bauablauf.
  Falls das Plugin öffentlich bleiben soll, ist zu entscheiden, ob der Bauablauf mit
  veröffentlicht wird.

## Änderungsverlauf

- **15.09.2026, Version 3.1.0** Cloudflare Pages Astro als Standardstack ohne Rückfrage
  festgeschrieben. Bisher stand nur in der Tabelle „Feste Agenturvorgaben", was der Stack
  ist, aber nicht, was passiert, wenn Phase 1 kein bestehendes Projekt vorfindet. Neuer
  Abschnitt „Standardstack ohne Rückfrage" mit Gerüstbefehlen (`pnpm create astro@latest`,
  Cloudflare-Adapter, Sitemap, Wrangler) in `agentur-website-builder/references/stack-und-deployment.md`,
  Verweis darauf in Phase 1 der `SKILL.md` ergänzt.
- **14.09.2026, Version 3.0.0** Zweiter Skill `agentur-website-builder` aufgenommen und mit
  dem Regelwerk verzahnt: Phasenablauf, Agenturstack, neun Referenzen, fünf einsatzfertige
  Codevorlagen für Consent, Formular, Mail und Bewertungen. Doppelte Inhalte durch Verweise
  ersetzt. Neu geschrieben: `scripts/relaunch-inventory.mjs` und `scripts/deslop-check.mjs`
  (beide gegen lokale Fixtures geprüft). Im Regelwerk ergänzt: Schriftwahl mit Sperrliste in
  `10-visuelle-richtung.md` und als harte Grenze in `SKILL.md`. Zwei Eval-Fälle ergänzt.
  Drei Sicherheitskorrekturen an der übernommenen Formularvorlage, siehe `CREDITS.md`.
  Zwei Altlasten nebenbei behoben: `pruefe-platzhalter.mjs` meldete TOML-Tabellen wie
  `[[kv_namespaces]]` als offenen Platzhalter, und die `description` in
  `webdesign-conversion/SKILL.md` war wegen eines Doppelpunkts kein gültiges YAML. Ein
  toter Verweis in `19-recruiting-funnel.md` zeigt jetzt auf den richtigen Pfad.
- **Version 2.0.0** Marken- und CI-Extraktion, Premium-Designquellen, Sektionshierarchie,
  Recruiting-Funnel, Spacing- und Responsive-Kapitel, Icon-System, Motion-Handschrift,
  Prüfskripte und Eval-Suite.
