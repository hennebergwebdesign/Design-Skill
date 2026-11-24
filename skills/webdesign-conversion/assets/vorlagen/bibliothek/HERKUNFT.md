# Herkunft und Grenzen der Bibliothek

Stand 24.11.2026. Die zwölf Vorlagen sind **eigenständige Umsetzungen** nach dem Prinzip zwölf öffentlich erreichbarer Referenzseiten. Der Inhaber der
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

## Was übernommen ist, was nicht

* **Prinzip:** Sektionsfolge, Raster, Proportionen, Dichte, Hell oder Dunkel, Art der Bewegung (zum Beispiel Stapelkarten, Sticky, Laufband, Wortlicht).
* **Nicht übernommen:** Texte, Bilder, Videos, Icons, Logos, Namen, Schriften der Referenzen, ihr HTML, CSS und JavaScript. Farben und Schriften sind eigen
  gewählt (Schriften aus `_basis/schriften/`). Die Vorlagen sind keine Pixelkopien und sollen es nicht sein.
* **Grund:** Die Referenzen sind Templates fremder Gestalter. Eine Pixelkopie samt Code wäre eine Vervielfältigung geschützter Arbeit und gäbe dem Agenturkunden keine
  saubere Rechtslage. Eine Freigabe des Inhabers ersetzt keine Lizenz des Gestalters.
* **Webflow:** keine Klassen, Attribute oder Hinweise. Das Fehlen ist mit `grep` über alle Vorlagen geprüft.

## Was gemessen ist

* Je Vorlage im Browser (Chromium, Playwright) bei 390 und 1440 Pixel gesehen. Gemeinsamer Messlauf aller zwölf am 24.11.2026: **kein horizontales Überlaufen, keine
  Konsolenfehler**. `pruefe-striche` ohne Befund bei allen zwölf.
* Kontrast: ein gemeinsamer Lauf (Text gegen die nächste deckende Fläche) meldete Treffer, die nach Sichtprüfung Fehlalarme waren (Text über Bild, Verlauf oder Markerfläche).
  **Nicht flächendeckend nachgemessen** sind Text über Bildern und Verläufen und der Rand von Eingabefeldern. Bekannt: `t06` hat nicht gefüllte Überschriftwörter mit etwa 3,5 zu 1
  (Schätzung des Agenten), `t04` nutzt einen Verlaufstext im Großwort.

## Was nicht gemessen ist

Safari, echte Geräte, Screenreader, Leistung auf schwachen Geräten, Kontrast über Bildern, Formularversand (keiner sendet), Hover- und Tastaturläufe durch alle Elemente. Die
Platzhalterbilder sind Verläufe, die Wirkung hängt an echten Fotos. Bewegung ist teils aus Beobachtung der Referenz geschätzt (Timing, Easing).
