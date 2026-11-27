# Design-Skill: Neues Designmuster oder neue Referenz aufnehmen

Ausgelagert aus CLAUDE.md, Inhalt unverändert. Lesen, bevor ein Designmuster oder eine Referenz aufgenommen wird.

## Ein neues Designmuster aufnehmen

Anders als eine Referenz. Muster wachsen ausschließlich über Tor 2 der Designrecherche, nie
durch direktes Anlegen einer Datei.

1. Im Kundenprojekt entsteht ein Musterpaket (`node scripts/muster-paket.mjs --id …`).
2. Die Datei aus dem Paket nach
   `skills/webdesign-conversion/assets/musterbibliothek/muster/<id>.md` kopieren, oder bei
   einer Erweiterung in das bestehende Muster einarbeiten.
3. `node scripts/pruefe-muster.mjs --index` laufen lassen. Ohne Index ist das Muster für den
   Vergleich unsichtbar.
4. `verwandt` beidseitig pflegen, auch im verlinkten Muster.
5. Committen, mit der Herkunft aus `HERKUNFT.md` in der Nachricht.

Verfahren und Schwellen: `skills/webdesign-conversion/references/25-designmuster-bibliothek.md`.

## Eine neue Referenz aufnehmen

1. Entscheiden, in welchen Skill sie gehört: Wissen nach `webdesign-conversion`, Ablauf oder
   Agenturvorgabe nach `agentur-website-builder`.
2. Prüfen, ob der Inhalt schon irgendwo steht. Wenn ja, dort ergänzen statt neu anlegen.
3. Datei anlegen, im Regelwerk mit laufender Nummer (`23-...`), im Bauablauf mit sprechendem
   Namen.
4. In die Referenztabelle der zugehörigen `SKILL.md` eintragen, mit der Spalte „wann lesen".
5. Von den verwandten Kapiteln aus verlinken, sonst wird sie nicht gefunden.
6. `README.md` und diese Datei nachziehen.
7. `node scripts/pruefe-skill.mjs --inhalt`, danach ohne Fehler.


## Eine Referenzseite als Vorlage und Baukasten aufnehmen

Der übliche Weg bei genannten Adressen (Tor 1 durch Nennung des Inhabers). Ergebnis sind zwei Dinge: eine Vorlage in `assets/vorlagen/bibliothek/` und Muster in der Musterbibliothek.

1. Adresse abrufen (`scripts/design-scan.mjs`) und mit Playwright bei 1440 und 390 Pixel scrollend erfassen. Liefert die Seite 403 (Cloudflare, Bot Schutz) oder rendert sie erst per JavaScript, ist das ein Befund: nicht aus der Erinnerung nachbauen, Screenshots vom Inhaber anfordern.
2. Vorlage `tNNN` nach dem Format von `t111` bauen: Prinzip statt Kopie, eigene Marke, Beispielbranche, `ABSCHNITTE.json` je Vorlage (jeder Abschnitt mit `data-abschnitt`, Kategorie, Selektor, Prinzip, CSS, JS, Hinweis zum Herauslösen).
3. `node scripts/bibliothek-abschnitte.mjs --pruefen`, danach `--schreiben` (erzeugt `ABSCHNITTE.md`, den Baukasten Index).
4. Die tragenden Prinzipien als Muster nach `assets/musterbibliothek/muster/` (Pflichtfelder und Belege wie oben), `verwandt` beidseitig, `node scripts/pruefe-muster.mjs --index`.
5. Galerie, Vorschaubilder, `HERKUNFT.md`, README Zähler und Änderungsverlauf nachziehen.

Abschnitt wählen: `node scripts/bibliothek-abschnitte.mjs --kategorie faq` listet alle FAQ Abschnitte aller Vorlagen, `--seite t113 --abschnitt faq` liefert Selektor, CSS, JS und den Hinweis zum Herauslösen.
