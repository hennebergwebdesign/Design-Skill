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
| `skills/webdesign-conversion/` | das Regelwerk: was gut ist und warum. 57 Referenzen (00 bis 56), 3 Playbooks, Vorlagen, Checklisten | MIT |
| `skills/agentur-website-builder/` | der Lieferablauf: Phasen 0 bis 6, fester Agenturstack, einsatzfertiger Code | Agenturstandard, siehe seine `SKILL.md` |

Die Trennung ist die zentrale Entscheidung dieses Repositories: **Wissen und Ablauf sind
zwei Dinge.** Das Regelwerk gilt auch in einem fremden Stack, der Ablauf gilt nur für
Agenturprojekte. Wer beides in eine Datei legt, bekommt eine SKILL.md, die niemand mehr
liest, und Regeln, die sich beim ersten React-Projekt widersprechen.

Daraus folgt die wichtigste Pflegeregel: **Der Bauablauf wiederholt keine Inhalte des
Regelwerks, er verweist darauf.** Verweise haben die Form
`../webdesign-conversion/references/12-copywriting.md`. Wer einen Abschnitt in beiden
Skills findet, hat einen Fehler gefunden, keine Redundanz mit Absicht.

## Befehle, Aufnahme, Offene Punkte, Verlauf (bei Bedarf lesen, nicht vorab)

Diese Teile stehen unverändert in `docs/`. Nur das passende Dokument öffnen, und darin gezielt suchen:

- Prüfskripte, Agenturwerkzeuge, Tests, Eval Suite, Quell Skills nachinstallieren: `docs/BEFEHLE.md`
- Neues Designmuster oder neue Referenz aufnehmen: `docs/AUFNAHME-MUSTER-REFERENZ.md`
- Offene Punkte und Backlog: `docs/OFFENE-PUNKTE.md`
- Änderungsverlauf, neueste Einträge oben, neue Einträge dort anfügen: `docs/AENDERUNGSVERLAUF.md`

Größenregel für diese Datei: unter 8 KB, nie über 10 KB (`node scripts/pruefe-claudemd.mjs`). Detail und Verlauf gehören nach `docs/`.

## Dateistruktur

```
.claude-plugin/       plugin.json, marketplace.json
skills/
  webdesign-conversion/     SKILL.md, references/00-54, playbooks/, assets/
                            assets/musterbibliothek/ ist das globale Musterwissen
                            assets/vorlagen/scrollvideo/ sind die Bausteine zu Kapitel 38
                            assets/vorlagen/prompts/ sind die Prompt-Vorlagen zu Kapitel 24, 38, 39, 40, 47, 48 (auch Textkritik, Design Loop, Fünf-Agenten-Prüfung, Varianten, Prüfer)
                            assets/vorlagen/motion/ und plakat/ sind die Dateien zu Kapitel 47 (Mikrobewegung, Plakat, Three.js-Szene), DESIGN.md die Markenvorlage
                            assets/vorlagen/fingerabdruecke.md (Kapitel 50) und zahlung-rechtsbausteine.md (Kapitel 53)
  agentur-website-builder/  SKILL.md, references/, assets/consent|forms|reviews|stripe|tracking (Stripe- und Tracking-Vorlagen sind ungeprüft)
scripts/              vierzehn Prüfskripte gegen Kundenprojekte, Agenturwerkzeuge, Designrecherche, ein Installer,
                      pruefe-skill.mjs prüft dieses Repository selbst, kein Kundenprojekt
  lib/abruf.mjs       die eine Abrufschicht, vier Rückfallstufen, robots.txt
  lib/browser.mjs     die eine Stelle, die Playwright sucht und Chromium startet
  tests/              node --test, lokaler Testserver statt Netzzugriff
evals/                fünfundzwanzig Fälle mit Gradern, results/ ist ausgenommen
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
- **Fremde Skills werden destilliert, nicht mitgeliefert.** Was eingeht, wird auf Deutsch,
  auf Astro und auf die harten Grenzen übertragen; wo die Quelle einer harten Grenze
  widerspricht, wird das umgedreht und mit Grund benannt (Beispiel: Abschnitt 11 in
  `26-geschmack-und-ki-tells.md`). Grund: zwei Regelwerke im Kontext, die sich an genau diesen
  Stellen widersprechen, lassen das Modell zwischen ihnen pendeln. Die Originale gibt es auf
  Wunsch über `scripts/install-quellskills.sh`. Ausnahme: Was eine proprietäre Lizenz ohne Weitergaberecht trägt (das Plugin
  `claude-security` von Anthropic), wird nicht kopiert und nicht destilliert, sondern nur als Werkzeug beschrieben, das der Nutzer selbst installiert.
- **Vorlagen dürfen Platzhalter enthalten**, deshalb nimmt `pruefe-platzhalter.mjs` Ordner
  namens `vorlagen` und `templates` aus.
- **Bei jedem neuen Hauptmodell, spätestens nach sechs Monaten, wird der Bestand geprüft**
  (`evals/modellwechsel.md`). Grund: Regeln, die ein älteres Modell brauchte, können ein neueres
  bremsen, und jede Regel kostet bei jeder Aufgabe Kontext. Rechtliche Pflichten, harte Grenzen und
  Agenturvorgaben werden **nicht** nach einem Δ von 0 gestrichen, weil das nur zeigt, dass dieses Modell
  sie bei diesem Prompt allein trifft.
- **`SKILL.md` unter 500 Zeilen, jede Referenz über 100 Zeilen mit „## Inhalt", jede Referenz in ihrer
  `SKILL.md` genannt.** Grund: Das Modell liest lange Dateien oft nur an und folgt Verweisen über zwei
  Ebenen nur teilweise; was es nicht liest, gilt nicht. Geprüft mit `node scripts/pruefe-skill.mjs`, nach
  einem neuen Abschnitt `--inhalt` laufen lassen. Die `SKILL.md` des Bauablaufs steht bei 499 Zeilen: neue
  Inhalte gehören in Referenzen.
- **Was nie brechen darf, läuft als Hook, nicht nur als Text.** Beispiel: `pruefe-striche.mjs --hook`.
- **CLAUDE.md unter 8 KB, nie über 10 KB.** Verlauf, offene Punkte und Detail liegen in `docs/`, in der CLAUDE.md steht je Dokument ein Wegweiser. Grund: Die Datei wird bei jedem Start komplett gelesen und kostet in jeder Runde Kontext. Geprüft mit `node scripts/pruefe-claudemd.mjs`. Details: `skills/agentur-website-builder/references/token-sparsamkeit.md`.
- Versionsnummer in `.claude-plugin/plugin.json` und in der `metadata` der beiden `SKILL.md`
  bei inhaltlichen Änderungen nachziehen.

