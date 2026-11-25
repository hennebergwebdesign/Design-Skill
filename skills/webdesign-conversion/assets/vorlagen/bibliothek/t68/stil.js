/* stil.js der Vorlage "Gastro warm": Reiter filtern die Speisekarte, Wischspur mit Pfeilknöpfen, Galerie richtet sich beim Scrollen auf,
   Zutaten schließen mit Escape, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Speisekarte filtern: Reiter erscheinen erst mit JavaScript, ohne sie zeigt die Karte alles
  document.querySelectorAll('[data-reiter]').forEach((leiste) => {
    const karte = document.querySelector('[data-karte]');
    if (!karte) return;
    leiste.hidden = false;
    const knoepfe = [...leiste.querySelectorAll('[data-filter]')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
      karte.querySelectorAll('[data-kategorie]').forEach((li) => { li.hidden = k.dataset.filter !== 'alle' && li.dataset.kategorie !== k.dataset.filter; });
    }));
  });

  // 2. Wischspur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]'), steuerung = gruppe.querySelector('[data-reiter-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-reiter="zurueck"]'), weiter = steuerung.querySelector('[data-reiter="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 16);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 3. Galerie: --gerade (0 bis 1) wächst, bis die Mitte der Galerie in der Bildschirmmitte steht, das Raster richtet sich auf
  const galerie = reduziert ? [] : [...document.querySelectorAll('[data-gerade]')];
  if (galerie.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      galerie.forEach((g) => { const r = g.getBoundingClientRect(), p = Math.min(1, Math.max(0, (h - r.top) / (h / 2 + r.height / 2))); g.style.setProperty('--gerade', p.toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 4. Escape schließt offene Zutaten
  addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.zutaten[open]').forEach((d) => { d.open = false; }); });

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
