/* stil.js der Vorlage "Produktagentur Graphit und Bernstein": Wischspur mit Pfeilknöpfen, Projektfilter, Wortmarke im Fuß, Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleiben alle Projekte und beide Preissätze bedienbar, die Spur ist wischbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Wischspur mit Pfeilknöpfen
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

  // 2. Projektfilter: blendet Karten aus, ohne JavaScript bleibt alles sichtbar und der Filter verborgen
  document.querySelectorAll('[data-filter]').forEach((f) => {
    f.hidden = false;
    const karten = [...document.querySelectorAll('.projektliste .projekt')];
    f.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      f.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      karten.forEach((k) => { k.hidden = !(b.dataset.art === 'alle' || k.dataset.art === b.dataset.art); });
    }));
  });

  // 3. Wortmarke im Fuß fährt ein, sobald sie sichtbar wird
  document.querySelectorAll('.fuss__marke').forEach((m) => {
    if (reduziert || !('IntersectionObserver' in window)) { m.classList.add('ist-da'); return; }
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { m.classList.add('ist-da'); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(m);
  });

  // 4. Formular ohne Versand: zeigt nur den Hinweis
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
