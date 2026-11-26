/* stil.js der Vorlage "Finanzautomatisierung Petrol und Koralle": Wischspuren mit Pfeilknöpfen (Funktionen, Fälle) und Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleiben die Spuren per Wischen und Tastatur bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Wischspur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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

  // 2. Säulen der Auswertung wachsen, sobald die Karte sichtbar wird (ohne Beobachter oder bei reduzierter Bewegung sofort fertig)
  document.querySelectorAll('.mini__saeulen').forEach((s) => {
    if (reduziert || !('IntersectionObserver' in window)) { s.classList.add('ist-da'); return; }
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { s.classList.add('ist-da'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(s);
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
