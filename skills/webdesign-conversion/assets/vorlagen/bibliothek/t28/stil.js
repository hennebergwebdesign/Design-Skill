/* stil.js der Vorlage "Training und Coaching": Treppe der Fortschrittskarten, Reiter mit Pfeilknöpfen, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Treppe: die Karten stehen zuerst weit gestaffelt und schieben sich beim Scrollen auf einen kleinen Versatz zusammen (--extra je Stufe, 0 bis 30 px)
  const treppe = document.querySelector('[data-treppe]');
  const breit = matchMedia('(min-width: 62rem)');
  if (treppe && !reduziert) {
    let tick = false;
    const messen = () => {
      tick = false;
      if (!breit.matches) { treppe.style.removeProperty('--extra'); return; }
      const r = treppe.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.7)));
      treppe.style.setProperty('--extra', (30 * (1 - p)).toFixed(1) + 'px');
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 2. Reiter: je Gruppe schieben die Pfeilknöpfe um eine Karte, am Anfang und Ende gesperrt; ohne Überstand bleiben sie verborgen
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]'), steuerung = gruppe.querySelector('[data-reiter-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-reiter="zurueck"]'), weiter = steuerung.querySelector('[data-reiter="weiter"]');
    const stand = () => {
      const ueber = spur.scrollWidth - spur.clientWidth > 4;
      steuerung.hidden = !ueber;
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

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
