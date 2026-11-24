# Token-Analyse des Plugins (24.11.2026)

Gemessen sind Zeichen und Zeilen, Token sind daraus geschätzt (rund 3 bis 3,5 Zeichen je Token im Deutschen), nicht gemessen.

| Posten | Zeichen | geschätzt |
|---|---|---|
| `webdesign-conversion/SKILL.md` | 31.169 | rund 9.500 Token |
| `agentur-website-builder/SKILL.md` | 34.523 | rund 10.500 Token |
| Referenzen Regelwerk (57) | 740.958 | rund 220.000 Token |
| Referenzen Bauablauf (24) | 294.511 | rund 88.000 Token |
| größte Datei `referenzen-und-auswahl.md` | 46.795 | rund 14.000 Token |

## Befunde

1. Beide `SKILL.md` laden bei einem Bauauftrag zusammen, rund 20.000 Token, bevor eine Zeile gebaut ist.
2. Drei Referenzen standen als „immer lesen" (Intake, Referenzen und Auswahl, QA), zusammen rund 85.000 Zeichen.
3. Phase 0 installierte sieben Zusatzskills vorab, deren Beschreibungen in jedem Kontext stehen.
4. Der Weg zum ersten Bild hatte mehrere Wartestopps (Rückfragen, Referenzrecherche mit Tor 1, Konzeptfreigabe). Jede Schleife ist ein Rundlauf mit vollem Kontext.
5. Die Branche musste der Agent aus vielen Dateien selbst ableiten. Das Ergebnis war die Voreinstellung, daher die Überarbeitungen.

## Gegenmaßnahmen (Version 4.25.0)

Kapitel 57, Branchenprofile als Daten mit Abrufskript (ein Profil rund 1.900 Zeichen), Schnellpfad im Bauablauf, Phase 0 ohne Vorinstallation, drei Dateien nicht mehr „immer".

## Ungemessen

Die Ersparnis je Entwurf und die Zahl der Überarbeitungsrunden sind nicht gemessen. Messen: dieselbe Aufgabe vor und nach 4.25.0 mit `claude plugin eval .` und Tokenzählung, mehrere Läufe.
