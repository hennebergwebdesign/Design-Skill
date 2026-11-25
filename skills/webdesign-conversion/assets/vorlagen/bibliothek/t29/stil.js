/* stil.js der Vorlage "Pastellkarten": Fächer der Stimmen öffnet sich beim Scrollen, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung steht der Fächer offen. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Fächer: --f läuft von 0 (Zettel liegen übereinander) bis 1 (offen), je nach Lage des Abschnitts im Fenster
  const faecher = document.querySelector('[data-faecher] .faecher');
  const breit = matchMedia('(min-width: 48rem)');
  if (faecher && !reduziert) {
    let tick = false;
    const messen = () => {
      tick = false;
      if (!breit.matches) { faecher.style.removeProperty('--f'); return; }
      const r = faecher.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h * 0.95 - r.top) / (h * 0.55)));
      faecher.style.setProperty('--f', (1 - Math.pow(1 - p, 2)).toFixed(3));
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
