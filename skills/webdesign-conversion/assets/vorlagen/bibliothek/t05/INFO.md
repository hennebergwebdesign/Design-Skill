# t05, Atelier hell

**Eignung:** Portfolio und Einzelanbieter mit Projektschau (Gestaltung, Beratung, Handwerk mit Referenzen), ruhig, großzügig, hell.

**Sektionsfolge:** Kopf (fest, Burger mit Vollbildmenü) · Start (große H1, Lead, zwei Aktionen, breites Bild) · Über uns (mittige Aussage) · Ausgewählte Arbeiten (zwei Spalten, rechte versetzt, sechs Projekte) · Kundenstimmen (Schieber) · Leistungen (vier Karten plus Hinweisleiste) · Werdegang (Akkordeon, linke Spalte klebt) · Häufige Fragen (nummeriertes Akkordeon) · Kontakt (zwei Panels) · Fußleiste.

**Animationen:** Kopf blendet beim Abwärtsscrollen aus, beim Hochscrollen ein; H1 fährt zeilenweise ein; Rasterhintergrund und Heldenbild laufen mit zwei Parallaxgeschwindigkeiten; Einblenden und Staffeln aus `bewegung.js`; Vollbildmenü öffnet von oben, Einträge staffeln; beim Zeiger über einem Projekt folgt eine Kugel „Ansehen" (nur Maus), das Bild zoomt leicht; Schieber blendet seitlich über; Akkordeon mit Plus, das sich dreht; Pfeile der Knöpfe wandern. Alles ruht bei `prefers-reduced-motion`, ohne JavaScript ist alles sichtbar.

**Tokens zum Umfärben** (`marke.css`): `--flaeche`, `--flaeche-alt`, `--flaeche-dunkel`, `--text`, `--text-leise`, `--linie`, `--akzent`, `--akzent-text`, `--menue-text`, `--raster-linie`, Schriften, Radien, Platzhalterverläufe `--bild-a1` bis `--bild-f2`.

**Marke wechseln:** Tokens setzen, Kontrast prüfen (Akzenttext auf Akzent, Text auf Flächen), Schriften aus `schriften.css` wählen, Platzhalter (`.bild[data-platzhalter]`) durch echte Bilder ersetzen, Beispieltexte und alle Elemente mit `data-beispiel` durch echte, freigegebene Inhalte ersetzen, Kontaktlinks und Impressum setzen. Ersatz für ein Bild: `<img>` in das `.bild`, im Held den Verlauf in `.bild__innen` entfernen und ein Bild dort einsetzen.

**Grenzen:** Der Akzent hat gegen die Fläche nur etwa 2,5 zu 1, deshalb tragen Knöpfe dunklen Text und der Fokusring ist dunkel. Der Schieber hat keine Automatik und keine Wischgeste. Das Menü braucht JavaScript (ohne: Seitenübersicht im Kontaktbereich). Kein Formular enthalten.
