# Prompt für die Bildsuche (Stockbilder für die Bibliothek)

Dieser Prompt ist für eine Claude Sitzung, die einen echten Browser mit deiner normalen Sitzung bedienen kann (Claude in Chrome oder Claude Code auf deinem Rechner). Aus der Cloud kommen Unsplash, Pexels und Pixabay nicht durch, sie sperren automatisierte Browser.

## Prompt zum Kopieren

```
Du arbeitest im Repository Design-Skill, Ordner skills/webdesign-conversion/assets/vorlagen/bibliothek/. Dort liegen die Vorlagen t01 bis t33 mit Verlaufsplatzhaltern (Elemente mit data-platzhalter). Deine Aufgabe: für jede Vorlage passende Stockfotos suchen, lokal ablegen und einbauen.

Suchen
1. Nur Unsplash und Pexels, im Browser über die normale Suche. Nur Fotos mit deren freier Lizenz (Unsplash License, Pexels License). Keine Bilder mit Plus oder Premium Kennzeichnung, keine Pixabay Inhalte mit Einschränkung, keine Google Bildersuche.
2. Je Platzhalter ein Foto, das das Motiv genau trifft: gleiche Szene, gleiche Perspektive, gleiche Lichtstimmung (zum Beispiel Abendlicht, Gegenlicht, Totale oder Nahaufnahme) wie in der Beschreibung des Platzhalters und der Stimmung der Vorlage. Lieber 10 Treffer ansehen als das erste nehmen.
3. Passend heißt auch: deutsche Verhältnisse, keine Fremdmarken und Logos im Bild, keine lesbaren Schilder, Gesichter nicht verzerrt, Querformat für breite Flächen, Hochformat nur wo der Platzhalter hoch ist, Motiv liegt nicht im Rand (wird zugeschnitten).
4. Bilder von Personen nur als Atmosphäre. Sie werden nie als echte Kunden, Mitarbeiter, Gutachter oder Stimmen ausgegeben, Beschriftung bleibt Beispiel.

Ablegen
5. Herunterladen in mittlerer Größe (Breite 1600 Pixel für Vollbild, 1000 für Karten, 600 für kleine Kacheln), als WebP oder JPEG, Qualität 78 bis 82. Selbst hosten, nie von Unsplash oder Pexels einbinden.
6. Ablage: tNN/bilder/ mit sprechendem Dateinamen, zum Beispiel dachdecker-arbeitet-auf-ziegeldach.webp (Kleinbuchstaben, Bindestriche, keine Umlaute).
7. Im HTML den Platzhalter durch ein img ersetzen: width und height, loading lazy außer im ersten Bildschirm, decoding async, Alt Text auf Deutsch, der zeigt was zu sehen ist, ohne Floskeln, ohne Bindestrich und Gedankenstrich. Dekorative Bilder bekommen alt="" . Die vorhandenen Größen und Zuschnitte (aspect-ratio, object-fit) bleiben, ändere nur was nötig ist.
8. Die Datei BILDER.md je Vorlage: Dateiname, Foto Titel, Fotograf, Adresse der Seite, Lizenz, Abrufdatum. Nichts aus dem Gedächtnis eintragen, nur was auf der Seite stand.

Prüfen
9. Je Vorlage bei 390 und 1440 Pixel im Browser ansehen: kein horizontaler Überlauf, keine Konsolenfehler, Text bleibt lesbar (Kontrast über dem Bild prüfen, bei Bedarf Abdunklung im CSS anpassen), Seitengewicht je Vorlage unter 2,5 MB.
10. Eine Vorlage nach der anderen, nach jeder ein Commit mit dem Namen der Vorlage. Wenn kein passendes Bild gefunden wird, den Platzhalter stehen lassen und in BILDER.md als offen eintragen. Nichts Ähnliches einsetzen, das die Stimmung bricht.

Grenzen
Keine Bilder von Marken, Fahrzeugen mit lesbarem Firmennamen, Prominenten oder erkennbaren Privatpersonen in Szenen, die sie in Verbindung mit einem Angebot bringen. Keine Bearbeitung, die die Szene verändert (kein Retuschieren von Personen, kein KI Ergänzen). Zuschneiden, Skalieren und Abdunkeln sind erlaubt.
```

## Bildbedarf je Vorlage

Aus den Beschriftungen der Platzhalter (`data-platzhalter`) erzeugt. Eine Beschriftung wie "Bild 1" sagt nichts über das Motiv, dann das Motiv aus Überschrift und Nachbartext der Stelle ableiten.

### t01 Bildbühne (t01)
* 
* Bild
* Bild: Hauptmotiv
* Bild: Leistungen

### t02 Vorlage t02: Panorama Hell Dunkel
* 
* Platzhalter: Bild 1
* Platzhalter: Bild 2
* Platzhalter: Bild 3
* Platzhalter: Bild 4
* Platzhalter: Bild 5
* Platzhalter: Bild oder Video
* Platzhalter: Heldenbild
* Platzhalter: Porträt oder Szene
* Vorschau

### t03 Vorlage t03: Vor Ort Service, hell und dunkel im Wechsel
* 
* Bild Ablauf
* Bild Basispaket
* Bild Einsatz vor Ort
* Bild Innenbereich
* Bild Komfortpaket
* Bild Schritt drei
* Bild Schritt eins
* Bild Schritt zwei
* Bild Schutzbehandlung
* Bild Team bei der Arbeit
* Bild Zusatzleistung
* Heldbild
* Hintergrundbild
* Karte
* Motiv
* Nachher
* Referenzbild
* Teambild
* Vorher

### t04 Großwort und Stapelkarten (t04)
* Abschlussbild
* Bild
* Bild 1
* Bild 2
* Bild 3
* Bild 4
* Bild 5
* Bild 6
* Heldenbild

### t05 t05, Atelier hell
* 
* Bild 1, Arbeitssituation
* Bild 2
* Bild 3
* Bild 4
* Bild 5
* Bild 6
* Bild 7

### t06 Bühne
* 
* Bild: Abschluss
* Bild: Applaus
* Bild: Austausch
* Bild: Bühne
* Bild: Empfang
* Bild: Eröffnung
* Bild: Gespräch
* Bild: Gäste
* Bild: Podium
* Bild: Praxis
* Bild: Publikum
* Bild: Rednerin
* Bild: Rückblick
* Bild: Saal
* Bild: Silhouette
* Bild: Vortrag
* Bild: Werkstatt
* Bild: Zuhörende
* Foto

### t07 t07 Beratung Dunkel
* Platzhalter Bild
* Platzhalter Bild, volle Breite
* Platzhalter Heldenbild

### t08 t08 Bühnenkarten App
* 
* Bild
* Bild Anmeldung
* Foto
* Großes Bild
* Held Bild
* Video Vorschau

### t09 Vorlage t09: Frische Dienstleistung
* 
* Bild: Ansprechpartnerin
* Bild: Freisteller
* Bild: Gewerbekunden
* Bild: Hauptmotiv
* Bild: Hintergrund
* Bild: Privatkunden
* Bild: Sonderaufträge
* Bild: Team bei der Arbeit
* Foto
* Nachher
* Vorher

### t10 Stapelseite Beratung (t10)
* Bild oder Video
* Foto

### t11 Vorlage t11: Dunkle Dienstleistungsseite mit Stapelkarten
* Bild: Ansprechpartner
* Bild: Detail
* Bild: Gemeinsam
* Bild: Hauptmotiv
* Bild: Leistung 1
* Bild: Leistung 2
* Bild: Leistung 3
* Bild: Leistung 4
* Bild: Projekt 1
* Bild: Projekt 2
* Bild: Projekt 3
* Bild: Projekt 4
* Bild: Projekt 5
* Bild: Team

### t12 Klarwerk (t12)
* 
* Bild
* Bild 1
* Bild 2
* Bild 3
* Bild 4
* Bild Kunde
* Bild Team

### t13 Abo Dunkelstart (t13)
* Bild: Baustelle mit Team
* Bild: Beraterin am Arbeitsplatz
* Bild: Beratungsgespräch am Tisch
* Bild: Kunde am Schreibtisch
* Bild: Rezeption mit Bildschirm

### t14 Aufzieh-Bühne (t14)
* 
* Bild
* Bild oder Video: Einblick
* Bild: Gespräch
* Bild: Hauptmotiv
* Bild: Porträt

### t15 Produktbühne (t15)
* Bild: Abschlussmotiv
* Bild: Am Abend
* Bild: Am Wasser
* Bild: Auf dem Dach
* Bild: Bei der Arbeit
* Bild: Großaufnahme
* Bild: Hochformat links
* Bild: Hochformat rechts
* Bild: Im Garten
* Bild: Produkt im Einsatz 1
* Bild: Produkt im Einsatz 2
* Bild: Produkt im Einsatz 3
* Bild: Produkt im Einsatz 4
* Bild: Produkt in Koralle
* Bild: Produkt in Nebel
* Bild: Produkt in Salbei
* Bild: Produkt in Sand
* Bild: Produkt in Tinte
* Bild: Szene 1
* Bild: Szene 2
* Bild: Szene 3
* Bild: Szene 4
* Bild: Szene 5
* Bild: Szene 6
* Bild: Unterwegs
* Bild: Zu Hause
* Bild: gewählte Farbe

### t16 Gartenbühne (t16)
* Bild
* Bild: Blattwerk aus der Nähe
* Bild: Formschnitt an der Kugelhecke
* Bild: Garten von oben, Liege im Rasen
* Bild: Hecke an der Grundstücksgrenze
* Bild: Heckenschere im Gras
* Bild: Kegelhecken im Beet
* Bild: Porträt Kundin oder Kunde
* Bild: Rasen mit Mähroboter
* Bild: Tautropfen auf Blättern
* Bild: Wiese mit Bank

### t17 Kontor (t17)
* 
* Bild: Beraterin im Gespräch, Vollbild
* Bild: Beraterin im Profil
* Bild: Beraterin, hochformatig
* Bild: Fall 1
* Bild: Fall 2
* Bild: Fall 3
* Bild: Gespräch
* Bild: Gespräch am Besprechungstisch
* Bild: Planung
* Bild: Straße, Stadt, Bewegung
* Bild: Unterlagen

### t18 App Bühne (t18)
* Bild: Person mit Smartphone in der Hand

### t19 Praxis (t19)
* 
* Bild: Behandlungsraum
* Bild: Beitragsbild
* Bild: Beitragsbild, Breitformat
* Bild: Bewegung im Freien, Breitformat
* Bild: Empfang
* Bild: Gespräch am Tisch
* Bild: Gesprächszimmer
* Bild: Hautuntersuchung
* Bild: Kindersprechstunde
* Bild: Porträt
* Bild: Untersuchung
* Bild: Ärztin im Gespräch

### t20 Vorlage t20: Dunkle Software
* Bild: Produktansicht der Oberfläche

### t21 Raumfolge (t21)
* Bild: Abschlussmotiv
* Bild: Ansprechpartner
* Bild: Aufmaß
* Bild: Auftrag
* Bild: Beratung
* Bild: Einbau
* Bild: Einsatz 1
* Bild: Einsatz 2
* Bild: Einsatz 3
* Bild: Einsatz 4
* Bild: Einsatz 5
* Bild: Einsatz 6
* Bild: Einsatz vor Ort
* Bild: Erstgespräch
* Bild: Erweiterung
* Bild: Kundenfoto
* Bild: Planung
* Bild: Service
* Bild: Wartung

### t22 Handwerk vor Ort (t22)
* Bild
* Bild: Fachmann bei der Arbeit
* Bild: Fallbeispiel 1
* Bild: Fallbeispiel 2
* Bild: Fallbeispiel 3
* Bild: Karte des Einsatzgebiets
* Bild: Kundengespräch vor Ort
* Bild: Mitarbeiter vor dem Servicefahrzeug
* Bild: Team bei der Arbeit

### t23 Mitgliedschaft (t23)
* Bild: Prüfprotokoll in der Hand
* Bild: Techniker bei der Arbeit
* Bild: Techniker im Gespräch mit Kundin

### t24 Jahreszeiten (t24)
* Bild: Altbau
* Bild: Außengerät
* Bild: Beratung vor Ort
* Bild: Büro
* Bild: Handschlag
* Bild: Heizraum
* Bild: Heizungsanlage im Technikraum
* Bild: Hintergrund, zwei Techniker vor einem Außengerät
* Bild: Klimagerät
* Bild: Klimagerät prüfen
* Bild: Klimagerät wird montiert
* Bild: Lüftungskanal und Wärmerückgewinnung
* Bild: Messgeräte
* Bild: Messgeräte bei der Wartung
* Bild: Monteur am Gerät
* Bild: Praxis
* Bild: Steuerung einer Heizung
* Bild: Techniker bei der Arbeit, dunkel
* Bild: Techniker lächelt
* Bild: Techniker mit Helm am Gerät
* Bild: Techniker mit Schutzhelm am Innengerät
* Bild: Werkhalle
* Bild: Wohnhaus

### t25 Teamseite (t25)
* Bild: Außengerät
* Bild: Einsatz vor Ort
* Bild: Gespräch vor Ort
* Bild: Kundenbesuch
* Bild: Monteur bei der Wartung
* Bild: Techniker
* Foto

### t26 Stapelkarten (t26)
* Bild: Beitrag
* Bild: Einbau vor Ort
* Bild: Heizung
* Bild: Klima und Lüftung
* Bild: Monteurin und Monteur an der Anlage
* Bild: Projekt
* Bild: Wartung

### t27 Lehrpfad
* Bild: Begleitung
* Bild: Lehrplan
* Bild: Lernende am Laptop
* Bild: Lernende am Schreibtisch
* Bild: Lernende bei der Arbeit
* Bild: Live-Unterricht
* Bild: Porträt der Dozentin
* Bild: Praxisprojekt
* Bild: Videostimme
* Bild: Zertifikat
* Bild: Zugang

### t28 t28 Training und Coaching
* Bild: Athlet beim Kettlebell-Schwung
* Bild: Coach 1
* Bild: Coach 2
* Bild: Coach 3
* Bild: Coach 4
* Bild: Coach 5
* Bild: Coach 6
* Bild: Frühstück nach dem Training
* Bild: Kniebeuge mit Hantel
* Bild: Langhantel-Training, Querformat
* Bild: Laufgruppe im Park
* Bild: Läufer im Sprint, Querformat
* Bild: Mitglied im Training
* Bild: Mitglied mit Hantel
* Bild: Mitglied nach dem Lauf
* Bild: Partnerübung mit Tablet, Querformat
* Bild: Sportlerin im Training, Hochformat
* Bild: Zweikampftraining, Querformat
* Bild: lächelnde Trainerin
* Bild: Übung im Studio

### t29 t29 Pastellkarten

### t30 t30 Reisen und Erlebnisse
* Bild: Altstadt am Fluss, Hochformat
* Bild: Bergdorf am See, Querformat
* Bild: Bergsee im Morgenlicht, Hochformat
* Bild: Bergsilhouette bei Nacht
* Bild: Bucht mit Booten, Hochformat
* Bild: Fluss mit Ausflugsboot, Querformat
* Bild: Küste, Querformat
* Bild: Landschaft in der Dämmerung, Querformat
* Bild: Stadtansicht, Hochformat
* Bild: Tempel auf einer Insel, Querformat
* Bild: Tempel im Abendlicht, Querformat
* Bild: Wanderin, Hochformat
* Bild: Wüstenlandschaft bei Sonnenaufgang, Hochformat

### t31 t31 Gebäudeservice
* Foto
* Foto: Detail
* Foto: Eingangsbereich
* Foto: Gerät im Einsatz
* Foto: Team bei der Arbeit, Hochformat
* Foto: Team im Einsatz, Querformat
* Foto: Team in heller Eingangshalle, Breitformat
* Porträt 1
* Porträt 2
* Porträt 3
* Porträt 4
* Porträt 5
* Porträt 6

### t32 t32 Dach und Bau
* Foto: Dachdecker bei der Arbeit auf dem Dach
* Foto: Dachfenster und Gaube
* Foto: Dachneueindeckung
* Foto: Dachprüfung
* Foto: Dachrinne und Fallrohr
* Foto: Dachsanierung
* Foto: Flachdach
* Foto: Haus mit rotem Dach
* Foto: Reparatur nach Sturm
* Foto: Team auf dem Dach
* Foto: Team auf dem Gerüst
* Foto: Ziegel werden verlegt
* Foto: fertiges Dach mit Gaube
* Foto: zufriedener Kunde

### t33 t33 Haustechnik dunkel
* Bild: Außengerät im Abendlicht
* Bild: Außengerät im Garten
* Bild: Gebäude in der Dämmerung
* Bild: Klimagerät an der Wand
* Bild: Klimagerät im Garten
* Bild: Lüftungsanlage im Keller
* Bild: Neuer Heizraum
* Bild: Techniker im Abendlicht, Querformat
* Bild: Techniker mit Kappe, Porträt
* Bild: Techniker prüft die Anlage
* Bild: Wartung im Heizraum
* Bild: Wärmepumpe an der Hauswand

