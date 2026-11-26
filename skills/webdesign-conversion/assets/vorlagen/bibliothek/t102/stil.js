/* stil.js der Vorlage "Pflegedienst Pflaume und Honig": Wortmarke im Fuß fährt ein, Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Wortmarke im Fuß fährt ein, sobald sie sichtbar wird (nur transform und opacity)
  document.querySelectorAll('.fuss__marke').forEach((m) => {
    if (reduziert || !('IntersectionObserver' in window)) { m.classList.add('ist-da'); return; }
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { m.classList.add('ist-da'); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(m);
  });

  // 2. Formular ohne Versand: zeigt nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
