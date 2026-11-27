/* stil.js der Vorlage "Frischfutter im Abo": Heldrahmen schrumpft beim Scrollen, Finder mit Beispielvorschlag, Filter im Sortiment,
   Querlauf der Leckerli, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript sind alle Karten, Fragen und Zusagen sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Heldrahmen: schrumpft über den ersten Scrollweg auf etwa vier Fünftel (--schrumpf 0 bis 1, nur transform)
  const rahmen = document.querySelector('[data-schrumpf]');
  if (rahmen && !reduziert) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const p = Math.min(1, Math.max(0, scrollY / Math.max(1, rahmen.offsetHeight * 0.9)));
      rahmen.style.setProperty('--schrumpf', p.toFixed(3));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    messen();
  }

  // 2. Finder: vier Angaben ergeben einen Beispielvorschlag, hebt die passende Karte hervor (keine Fütterungsberatung)
  const REZEPTE = {
    'huhn-pur': 'Huhn pur', 'huhn-gemuese': 'Huhn mit Gemüse', 'huhn-kartoffel': 'Huhn mit Kartoffel',
    'rind-kuerbis': 'Rind mit Kürbis', 'lamm-pastinake': 'Lamm mit Pastinake', 'pute-karotte': 'Pute mit Karotte'
  };
  const finder = document.querySelector('[data-finder]');
  const ergebnis = document.querySelector('[data-finder-ergebnis]');
  if (finder && ergebnis) finder.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(finder);
    let wahl = 'huhn-gemuese';
    if (d.get('sorte') === 'huhn') wahl = d.get('aktiv') === 'viel' ? 'huhn-pur' : 'huhn-kartoffel';
    else if (d.get('sorte') === 'keinrind') wahl = d.get('gewicht') === 'gross' ? 'lamm-pastinake' : 'pute-karotte';
    else if (d.get('gewicht') === 'gross') wahl = 'rind-kuerbis';
    document.querySelectorAll('.karte.ist-vorschlag').forEach((k) => k.classList.remove('ist-vorschlag'));
    const karte = document.querySelector(`[data-rezept="${wahl}"]`);
    if (karte) { karte.hidden = false; karte.classList.add('ist-vorschlag'); }
    ergebnis.hidden = false;
    ergebnis.textContent = `Beispielvorschlag für den Start: ${REZEPTE[wahl]}, Beutel mit 500 Gramm. Wie viel am Tag, hängt von Alter, Gewicht und Bewegung ab und steht auf der Packung. Das ist keine tierärztliche Beratung.`;
    if (karte) karte.scrollIntoView({ behavior: reduziert ? 'auto' : 'smooth', block: 'center' });
  });

  // 3. Filter: Karten nach Fleischsorte zeigen oder ausblenden, alle bleiben ohne JavaScript sichtbar
  const filter = document.querySelector('[data-filter]');
  const raster = document.querySelector('[data-filter-ziel]');
  if (filter && raster) {
    const knoepfe = [...filter.querySelectorAll('button')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      const w = k.dataset.wahl;
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
      raster.querySelectorAll('.karte').forEach((karte) => {
        const zeigen = w === 'alle' || karte.dataset.sorte === w;
        karte.hidden = !zeigen;
        if (zeigen) karte.classList.add('ist-da');
      });
    }));
  }

  // 4. Querlauf der Leckerli: Pfeile schieben um eine Kartenbreite, Pfeiltasten gehen auch im Fokus
  const bahn = document.querySelector('[data-bahn]');
  if (bahn) {
    const schritt = () => (bahn.querySelector('li')?.getBoundingClientRect().width || 280) + 16;
    const los = (r) => bahn.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    document.querySelector('[data-bahn-vor]')?.addEventListener('click', () => los(1));
    document.querySelector('[data-bahn-zurueck]')?.addEventListener('click', () => los(-1));
    bahn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); los(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); los(-1); }
    });
  }

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
