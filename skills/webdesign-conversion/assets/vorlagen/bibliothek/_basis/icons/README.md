# Icons der Bibliothek

Auswahl aus **Phosphor Icons** (MIT, Version 2.1.1, https://github.com/phosphor-icons/core), sechs Strichstärken: `thin`, `light`, `regular`, `bold`, `fill`, `duotone`. Lizenztext: `LICENSE-Phosphor.txt`.
Gewählt, weil ein Satz alle Stile der Vorlagen trägt (hauchdünn bis kräftig, gefüllt, zweifarbig), alles einfarbig mit `currentColor` und damit umfärbbar.

Verwendung: die SVG aus dem Ordner der passenden Strichstärke in den eingebauten `<symbol>`-Satz der Vorlage übernehmen (`viewBox="0 0 256 256"`, `fill="currentColor"`), Größe per `width` und `height`. Eine Vorlage nutzt **eine** Strichstärke durchgehend.
Weitere Icons: `npm pack @phosphor-icons/core` und aus `assets/<strichstärke>/` kopieren.
