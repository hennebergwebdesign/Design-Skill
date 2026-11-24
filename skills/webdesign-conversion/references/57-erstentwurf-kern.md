# Erstentwurf: Kern, Grundaufbau und Anti-Slop-Regelsatz

Dieses Kapitel ist der **kurze Weg zu einem ersten Entwurf, der nicht überarbeitet werden muss**. Es ersetzt kein anderes
Kapitel, es sagt, welche man für den Erstentwurf **nicht** lesen muss, und legt fest, was vor dem ersten Code entschieden
ist. Grund: Die Qualität eines Entwurfs hängt weniger davon ab, wie viele Regeln im Kontext stehen, als davon, ob die
wenigen entscheidenden vor dem Schreiben feststehen. Wer 80 Dateien liest, entscheidet nach der letzten, nicht nach der
wichtigsten. Das Vorgehen ist eine Auslegung, kein neuer Zwang: alle harten Grenzen aus der `SKILL.md` gelten unverändert.

## Inhalt

- 1\. Lesebudget
- 2\. Reihenfolge: Startseite zuerst
- 3\. Protokoll des Erstentwurfs
- 4\. Grundaufbau jeder Kundenseite
- 5\. Anti-Slop-Regelsatz (Gate)
- 6\. Auslöser: wann tiefer gelesen wird
- 7\. Branchenprofile pflegen
- Verwandte Kapitel

## 1. Lesebudget

| Aufgabe | Pflichtlektüre | Nicht lesen, bis ein Auslöser eintritt |
|---|---|---|
| Startseite oder Landingpage, erster Entwurf | dieses Kapitel, `node scripts/branchenprofil.mjs <branche>`, das Playbook (`homepage.md` oder `landingpage.md`), `marke.json` des Projekts | alles in Abschnitt 6 |
| Änderungsrunde | `aenderungsrunden-und-layoutschutz.md`, die benannte Sektion | der Rest |
| Audit, Frage, Strategie | das Kapitel, das zur Frage passt (Tabelle in der `SKILL.md`) | der Rest |

Regel: **Eine Datei wird gelesen, weil ein Auslöser sie verlangt, nicht weil sie existiert.** Verweise in Kapiteln sind
Nachschlagewege, kein Leseauftrag. Ganze Dateien nur lesen, wenn der Abschnitt nicht über die Inhaltsliste (`## Inhalt`)
oder `grep -n '^## '` gefunden werden kann.

## 2. Reihenfolge: Startseite zuerst

| Auftrag | Erste Lieferung | Danach |
|---|---|---|
| Unternehmenswebsite, Homepage | **nur die Startseite**, mit Kopf, Fuß, Impressum, Datenschutz, Consent, 404 | Unterseiten erst nach Abnahme der Startseite, jede mit den Tokens und Komponenten der Startseite |
| Landingpage | **die Landingpage direkt**, ohne Startseite davor, mit Pflichtlinks | Varianten erst nach Messdaten |
| Relaunch | die Startseite im Modus aus `27-redesign-bestand.md` | Unterseiten nach Abnahme, URLs und Weiterleitungen vorab festgehalten |

Grund: Die Startseite legt Tokens, Rhythmus, Komponenten und Ton fest. Jede Unterseite, die vorher entsteht, wird beim
ersten Feedback zur Startseite mitverändert. Die Startseite muss alle Regeln dieses Kapitels bestehen, bevor eine zweite
Seite begonnen wird. Navigationspunkte zu noch nicht gebauten Seiten stehen als Platzhalterlinks `#` mit Vermerk im
Abschlussbericht, nie als erfundene Seiten.

## 3. Protokoll des Erstentwurfs

Ein Durchlauf, ohne Wartestopp außer bei einer Sperre (fehlendes Material, das sich nicht ersetzen lässt).

1. **Material lesen:** Repo, Logo, Texte, Bilder, `marke.json`, alte Seite (nur wenn vorhanden). Daraus arbeiten.
2. **Branche bestimmen:** `node scripts/branchenprofil.mjs <suchwort>`. Das Profil liefert Richtung, Hauptaktion, Regler,
   Farbstimmung, Schriftcharakter, Bildwelt, Heldmuster, Folge und Fehlbilder. Passt keine Branche, die nächste wählen und
   die Abweichung als Annahme nennen.
3. **Annahmen aussprechen:** in der ersten Nachricht, höchstens zehn Zeilen: Branche, Richtung, Hauptaktion, Farbe, Schrift,
   Folge, was fehlt (`[[FEHLT: …]]`). Dann **weiterbauen**, nicht warten. Der Kunde korrigiert eine Annahme billiger als einen
   Entwurf. Eine einzige gebündelte Rückfrage nur bei Dingen, die sich nicht annehmen lassen (Hauptaktion unklar,
   Rechtsform, Leistungsumfang).
4. **Tokens vor Markup:** Farben, Schrift, Raum, Radius, Bewegung aus Marke und Profil in `tokens.css`, danach nichts mehr
   ohne Token (harte Grenze).
5. **Startseite in der Folge des Profils bauen**, Sektion für Sektion von oben, jede mit Zweck und einer Absicht.
6. **Gate vor dem Schreiben jeder Sektion:** Abschnitt 5 durchgehen, nicht erst am Ende. Ein Tell, der nach dem Bau
   entfernt wird, kostet eine Änderungsrunde, vor dem Schreiben kostet er nichts.
7. **Prüfen, einmal und vollständig:** Build, `pruefe-striche`, `pruefe-tokens`, `pruefe-kontrast`, `pruefe-geschmack`,
   `pruefe-seitenbasis`, `pruefe-breakpoints`, `pruefe-platzhalter --launch`. Fehler beheben, Lauf wiederholen, erst dann berichten.
8. **Übergabe:** zwei Sätze Ergebnis, die Annahmen, was offen ist, was der Kunde selbst im Browser prüfen muss.

**Die Referenzrecherche des Skills ist für den Erstentwurf im Branchenprofil festgeschrieben.** Das Profil nennt die
freigegebenen Referenzen der Branche (`../../agentur-website-builder/references/referenzen-und-auswahl.md`), die bei der Aufnahme
einmal recherchiert und freigegeben wurden. Eine neue Recherche je Entwurf läuft nur auf Wunsch oder wenn das Profil keine
passende Referenz nennt, und dann über Tor 1 (vorlegen, warten). Grund: Die Recherche war der größte Wartestopp vor dem
ersten Bild und lieferte beim zweiten Mal dieselbe Branche mit anderem Zufall.

## 4. Grundaufbau jeder Kundenseite

Gilt für jede Branche. Das Profil bestimmt Charakter und Folge, dieser Aufbau die Mechanik. Die Maße sind Ausgangswerte (nicht gemessen) aus
`15-spacing-rhythmus.md` und `tokens.css`.

| Baustein | Festlegung | Grund |
|---|---|---|
| Kopfzeile | Logo links, höchstens fünf Punkte, ein Knopf rechts (Hauptaktion), Telefon sichtbar, Höhe 64 bis 72 px, mobil Telefonknopf neben dem Menü | die Hauptaktion ist von jeder Stelle erreichbar |
| Held | `100svh`, Heldmuster aus dem Profil, Überschrift höchstens zwei Zeilen, Unterzeile bis 20 Wörter, eine primäre Aktion, genau ein Beweis | `26-…` Abschnitt 4 |
| Beleg direkt unter dem Held | echte Bewertung mit Quelle und Stand, oder echte Logos, oder entfällt | Beweis vor Argument |
| Hauptteil | Folge des Profils, höchstens vier verschiedene Layoutfamilien, keine Familie doppelt in Folge | Rhythmus statt Schablone |
| Abschlussaufruf | derselbe Text wie im Held (`sprache.cta_primaer`), Weg zum Kontakt kürzer als drei Felder | eine Absicht, ein Text |
| Fuß | Adresse, Telefon, Zeiten, Pflichtlinks, Marken der Agentur nach Agenturvorgabe | Recht und lokale Signale |
| Raum | `--raum-sektion` fließend, Seitenrand `--rand-seite`, Lesebreite `--breite-text` nur für Fließtext | `15-…`, `43-…` |
| Schrift | zwei Familien höchstens, Fließtext ab Schnitt 400 und mindestens 16 px, Skala nach `10-visuelle-richtung.md` | Lesbarkeit |
| Farbe | ein Akzent, Rollen-Tokens, Kontrast 4,5 zu 1 bei Text, 3 zu 1 bei großen Flächen und Bedienelementen | harte Grenze |
| Form | ein Radiussystem, Knöpfe und Felder gleich | `26-…` Abschnitt 3 |
| Bewegung | nach Regler des Profils, bei 1 bis 3 nur Zustände, immer `prefers-reduced-motion` | `18-…` |
| Mobil | zuerst gedacht: Hauptaktion im ersten Bildschirm, Klickflächen 44 px, kein horizontales Scrollen | `16-…` |

## 5. Anti-Slop-Regelsatz (Gate)

Jede Regel in positiver Form, damit sie beim Schreiben wirkt. Wo ein Skript prüft, steht es dabei. Ausführliche Begründung
und Beispiele in `26-geschmack-und-ki-tells.md` und `55-slop-detect-ki-muster-vermeiden.md`.

**Layout**

1. Der Held ist **kein** Text links, Bild rechts aus Gewohnheit. Das Muster kommt aus dem Profil, abweichen nur mit Grund.
2. Leistungen stehen nicht als drei gleiche Karten. Eine große und zwei kleine, zwei Spalten mit Bild oder ein Stapel mit Reihenfolge.
3. Höchstens zwei Text neben Bild hintereinander, danach bricht eine andere Familie das Muster.
4. Höchstens ein Kicker je drei Sektionen. Kein Zierstrich, keine Nummer, keine Pille über der Überschrift. (`pruefe-striche`, `pruefe-geschmack`)
5. Kein Glas, kein Glühen, kein Violett oder Indigo Verlauf, keine dunkle Insel ohne feste Rolle. (`pruefe-geschmack`)
6. Keine leere Zelle im Bento, keine Haarlinie unter jeder Zeile, keine Deko Linien ohne gliedernde Aufgabe.

**Typografie und Farbe**

7. Schrift aus Marke oder Profil. Ohne Vorgabe **nie** Inter, Roboto, Open Sans, Poppins, Montserrat, Lato, Plus Jakarta Sans. (`pruefe-geschmack`)
8. Kein kursives Akzentwort in der Überschrift, kein Verlaufstext. (`pruefe-geschmack`)
9. Kein Cremegrund mit Serife und Terrakotta und kein Neon auf Fast Schwarz als Voreinstellung. Die Farbe kommt aus dem Logo des Kunden.
10. Fließtext ab Schnitt 400, Lesebreite über `--breite-text`, nichts unter 16 px. (`pruefe-breakpoints`)

**Text**

11. Keine Gedankenstriche, keine Bindestriche mit Leerzeichen. Umformulieren. (`pruefe-striche`, auch als Hook)
12. Kein „ganzheitlich", „maßgeschneidert", „aus einer Hand", „Ihr Partner für", keine Kontrastfigur „nicht X, sondern Y", kein Stakkato. (`deslop-check`)
13. Überschrift sagt, was der Besucher bekommt, nicht wer wir sind. Konkret mit Ort, Zahl oder Leistung.
14. Ein Text für die Hauptaktion auf der ganzen Seite. Telefon und WhatsApp sichtbar. (`pruefe-geschmack`)
15. Keine poetischen Etiketten („Aus der Werkstatt", „Handverlesen"), keine Schrittnummern statt Verben.
16. Keine erfundenen Zahlen, Logos, Zitate, Bewertungen, Siegel, Meistergeschichten. Fehlendes als `[[FEHLT: …]]`. (`pruefe-platzhalter`)

**Bild**

17. Echte Bilder des Kunden, sonst echte Platzhalterflächen mit `[[FEHLT: Bild …]]`. Keine Stockbilder von Handschlag, Helm, Stethoskop, Zahnrad, Weltkugel.
18. Kein generiertes Logo, keine Oberflächenattrappe aus Kästen, keine Etiketten auf Fotos.

**Technik und Bewegung**

19. Kein `transition: all`, kein `scale(0)`, Dauer unter 300 ms bei bedienbaren Elementen, Hover nur wo es etwas anzeigt. (`pruefe-motion`)
20. Keine hochzählenden Kennzahlen mit falschem Startwert: Endwert im HTML.
21. Schrift selbst gehostet, keine Fremdserver vor Einwilligung. (`pruefe-seitenbasis`)

**Wenn ein Entwurf trotzdem „nach KI" aussieht:** nicht weitere Effekte ergänzen, sondern subtrahieren
(`48-richtung-varianten-und-subtraktion.md`, Abschnitt Subtraktionsrunde). Eine ruhige, konsequente Seite schlägt eine
Seite mit zehn Ideen.

## 6. Auslöser: wann tiefer gelesen wird

| Auslöser | Lesen |
|---|---|
| Kunde nennt Referenz oder Designsystem | `24-designsystem-vorrang.md` |
| Relaunch, alte Seite liegt vor | `27-redesign-bestand.md`, `20-markenextraktion-bestandsseite.md` |
| Landingpage mit hoher Hürde | `45-huerde-laenge-und-leserfuehrung.md` |
| Text muss geschrieben werden | `12-copywriting.md`, `51-text-entmaschinisieren.md` |
| Scroll Erlebnis, Video, 3D gewünscht | `50-…`, `38-…`, `54-…` |
| Formular, Lead, Zahlung, Tracking | Bauablauf `formulare-und-resend.md`, `zahlungen-umsetzung.md`, `tracking-einbauen.md` |
| Lokale Sichtbarkeit, Standorte | `46-lokale-sichtbarkeit.md`, `31-ki-sichtbarkeit-geo.md` |
| Fertige Seite wirkt generisch | `55-…`, `pruefe-slop.mjs` |
| Neue Branche ohne Profil | Profil in `assets/branchenprofile.json` ergänzen (Abschnitt 7) |

## 7. Branchenprofile pflegen

Datei: `assets/branchenprofile.json`. Abruf: `node scripts/branchenprofil.mjs liste` und `… <suchwort>`.

- Ein neues Profil braucht alle Pflichtfelder (der Test `branchenprofil.test.mjs` bricht sonst), Regler nach Kapitel 26,
  Referenzen nur aus den freigegebenen Einträgen.
- Farbe ist eine Stimmung, Schrift ein Charakter mit einem Vorschlag, nie ein Zwang. Die Marke des Kunden schlägt das Profil.
- **Herkunft:** Seitenmuster, Farbstimmung und Fehlbilder sind aus `ui-ux-pro-max` (MIT, `ui-reasoning.csv`) übertragen und
  gegen die freigegebenen Referenzen der Agentur gegengeprüft. Die Stilnamen der Quelle (Glassmorphism, Liquid Glass,
  Neumorphism, Dark Mode OLED, Vibrant und Block) sind nicht übernommen, weil sie als Voreinstellung Tells nach Kapitel 26 sind.
  Die Regler und Sektionsfolgen sind eigene Ausgangswerte, **nicht gemessen**.
- Die Design Systeme aus `awesome-design-skills` (MIT, 67 Stile, `npx typeui.sh pull <name>`) sind **nicht** eingebunden.
  Sie sind allgemeine Komponentenregeln ohne Branche und ohne Conversion. Nur auf Wunsch des Kunden („so wie Editorial")
  einzeln ziehen und vorher lesen, die Marke des Kunden und Kapitel 24 bleiben vorrangig.

## Verwandte Kapitel

`26-geschmack-und-ki-tells.md` (Begründung der Regeln), `55-slop-detect-ki-muster-vermeiden.md` (Messung), `37-stilrichtung-nach-kundensprache.md`
(Richtungen), `45-huerde-laenge-und-leserfuehrung.md` (Länge), `15-spacing-rhythmus.md`, `10-visuelle-richtung.md`, `24-designsystem-vorrang.md`,
Playbooks `homepage.md` und `landingpage.md`.
