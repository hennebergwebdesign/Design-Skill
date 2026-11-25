# Herkunft und Grenzen der Bibliothek

Stand 24.11.2026. Die dreiunddreißig Vorlagen sind **eigenständige Umsetzungen** nach dem Prinzip öffentlich erreichbarer Referenzseiten (t01 bis t12 am 24.11.2026, t13 bis t33 am 25.11.2026 nachgereicht). Der Inhaber der
Agentur hat die Erfassung der Seiten ausdrücklich freigegeben und Weg 1 gewählt (eigene Templates, branchenneutral). Er wünschte einen Nachbau von
Layout, Design, Prinzip und Animation; übernommen ist das Prinzip, nicht die Ausführung.

| Vorlage | Prinzip abgeleitet von | Erfasst |
|---|---|---|
| t01 | arvora.webflow.io | 24.11.2026 |
| t02 | verdentix.webflow.io | 24.11.2026 |
| t03 | gomobil.webflow.io | 24.11.2026 |
| t04 | avenora.webflow.io | 24.11.2026 |
| t05 | orange-template.webflow.io | 24.11.2026 |
| t06 | crowdix.webflow.io | 24.11.2026 |
| t07 | executra.webflow.io | 24.11.2026 |
| t08 | cardiome-template.webflow.io | 24.11.2026 |
| t09 | ecoclean-128.webflow.io | 24.11.2026 |
| t10 | perpetual-template.webflow.io | 24.11.2026 |
| t11 | hortalis.webflow.io | 24.11.2026 |
| t12 | cleanora.webflow.io | 24.11.2026 |
| t13 | marketo-agency.webflow.io | 25.11.2026 |
| t14 | sportrik.webflow.io | 25.11.2026 |
| t15 | vrtxs.webflow.io | 25.11.2026 |
| t16 | harmone.webflow.io | 25.11.2026 |
| t17 | fernvale.webflow.io | 25.11.2026 |
| t18 | ovo-confetti.webflow.io | 25.11.2026 |
| t19 | ocure.webflow.io | 25.11.2026 |
| t20 | flow-mate.webflow.io | 25.11.2026 |
| t21 | alvix.webflow.io | 25.11.2026 |
| t22 | pipewise-template.webflow.io (Startseite) | 25.11.2026 |
| t23 | pipewise-template.webflow.io/membership | 25.11.2026 |
| t24 | airvia.webflow.io/home-v3 | 25.11.2026 |
| t25 | airvia.webflow.io/about-v1 | 25.11.2026 |
| t26 | ventraflow.webflow.io | 25.11.2026 |
| t27 | ainova-template.webflow.io | 25.11.2026 |
| t28 | fitedge.webflow.io | 25.11.2026 |
| t29 | wilun.webflow.io | 25.11.2026 |
| t30 | escapora.webflow.io | 25.11.2026 |
| t31 | klener.webflow.io/home-pages/home-v1 | 25.11.2026 |
| t32 | roofex.webflow.io | 25.11.2026 |
| t33 | airstead.webflow.io | 25.11.2026 |

## Was übernommen ist, was nicht

* **Prinzip:** Sektionsfolge, Raster, Proportionen, Dichte, Hell oder Dunkel, Art der Bewegung (zum Beispiel Stapelkarten, Sticky, Laufband, Wortlicht).
* **Nicht übernommen:** Texte, Bilder, Videos, Icons, Logos, Namen, Schriften der Referenzen, ihr HTML, CSS und JavaScript. Farben und Schriften sind eigen
  gewählt (Schriften aus `_basis/schriften/`). Die Vorlagen sind keine Pixelkopien und sollen es nicht sein.
* **Grund:** Die Referenzen sind Templates fremder Gestalter. Eine Pixelkopie samt Code wäre eine Vervielfältigung geschützter Arbeit und gäbe dem Agenturkunden keine
  saubere Rechtslage. Eine Freigabe des Inhabers ersetzt keine Lizenz des Gestalters.
* **Webflow:** keine Klassen, Attribute oder Hinweise. Das Fehlen ist mit `grep` über alle Vorlagen geprüft.

## Was gemessen ist

* Je Vorlage im Browser (Chromium, Playwright) bei 390 und 1440 Pixel gesehen. Gemeinsamer Messlauf von t01 bis t28 am 24.11.2026: **kein horizontales Überlaufen, keine
  Konsolenfehler**. `pruefe-striche` ohne Befund bei allen.
* Kontrast: ein gemeinsamer Lauf (Text gegen die nächste deckende Fläche) meldete Treffer, die nach Sichtprüfung Fehlalarme waren (Text über Bild, Verlauf oder Markerfläche).
  **Nicht flächendeckend nachgemessen** sind Text über Bildern und Verläufen und der Rand von Eingabefeldern. Bekannt: `t06` hat nicht gefüllte Überschriftwörter mit etwa 3,5 zu 1
  (Schätzung des Agenten), `t04` nutzt einen Verlaufstext im Großwort.

## Was nicht gemessen ist

Safari, echte Geräte, Screenreader, Leistung auf schwachen Geräten, Kontrast über Bildern, Formularversand (keiner sendet), Hover- und Tastaturläufe durch alle Elemente. Die
Stand 25.11.2026: t01 bis t28 tragen Stockfotos von Unsplash (Unsplash Lizenz), selbst gehostet unter `tNN/bilder/`, mit Nachweis je Vorlage in `tNN/BILDER.md`. Fotograf und Beschreibung stammen von der Suchergebnisseite, nicht von der Einzelseite; Aufnahmeorte und deutsche Verhältnisse sind nicht geprüft. t20 hat bewusst keine Fotos (App Oberfläche), t29 bis t33 noch keine, dort sind es Verläufe. Die Wirkung hängt an echten Kundenfotos. Bewegung ist teils aus Beobachtung der Referenz geschätzt (Timing, Easing).

* t29 bis t33: Erfassung der Referenzen über Bildschirmaufnahmen des Inhabers und Playwright. Gemessen bei 390 und 1440 Pixel: kein Überlauf, keine Konsolenfehler, `pruefe-striche` ohne Befund. Stockbilder fehlen noch, Ablauf in `BILDSUCHE-PROMPT.md`.
