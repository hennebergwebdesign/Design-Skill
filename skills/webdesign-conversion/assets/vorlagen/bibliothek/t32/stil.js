/* stil.js der Vorlage "Dach und Bau": mitlaufender Punkt der Qualitätsliste, Formularhinweis, Jahreszahl.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Punkt: läuft an der Linie der Liste entlang, je nach Scrollweg durch die Liste (0 bis 100 %)
  const liste = document.querySelector('[data-fortschritt-liste]');
  if (liste) {
    const punkt = liste.querySelector('.qual__punkt');
    let tick = false;
    const messen = () => {
      tick = false;
      const r = liste.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h * 0.6 - r.top) / Math.max(1, r.height)));
      liste.style.setProperty('--p', (p * 100).toFixed(1) + '%');
    };
    if (punkt && !reduziert) {
      addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
      addEventListener('resize', messen);
      messen();
    }
  }

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));

  // 3. Jahreszahl im Fuß
  document.querySelectorAll('[data-jahr]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
