/* stil.js der Vorlage "Kaffeeabo mit Karten über Fotobühne": Karussell der Produktkarten (Pfeile, Fortschrittsstrich), Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleibt das Karussell per Wischen und Tastatur bedienbar, die Pfeile erscheinen nicht. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Karussell: Pfeile scrollen um eine Kartenbreite, der Strich zeigt den Weg, am Ende sind Pfeile gedimmt
  document.querySelectorAll('[data-karussell]').forEach((wurzel) => {
    const spur = wurzel.querySelector('[data-karussell-spur]');
    const zurueck = wurzel.querySelector('[data-karussell-zurueck]');
    const vor = wurzel.querySelector('[data-karussell-vor]');
    const strich = wurzel.querySelector('[data-karussell-strich]');
    const steuerung = wurzel.querySelector('.kat__steuerung');
    if (!spur) return;
    let wartet = false;
    const messen = () => {
      wartet = false;
      const max = spur.scrollWidth - spur.clientWidth;
      if (steuerung) steuerung.hidden = max <= 2;
      const sicht = spur.clientWidth / Math.max(1, spur.scrollWidth);
      const p = max > 2 ? spur.scrollLeft / max : 1;
      if (strich) strich.style.setProperty('--p', (sicht + (1 - sicht) * p).toFixed(3));
      if (zurueck) zurueck.setAttribute('aria-disabled', String(spur.scrollLeft <= 2));
      if (vor) vor.setAttribute('aria-disabled', String(spur.scrollLeft >= max - 2));
    };
    const plan = () => { if (!wartet) { wartet = true; requestAnimationFrame(messen); } };
    const schritt = (richtung) => {
      const karte = spur.querySelector('.karte');
      const breite = karte ? karte.getBoundingClientRect().width + 16 : spur.clientWidth * 0.8;
      spur.scrollBy({ left: richtung * breite, behavior: reduziert ? 'auto' : 'smooth' });
    };
    if (zurueck) zurueck.addEventListener('click', () => schritt(-1));
    if (vor) vor.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', plan, { passive: true });
    addEventListener('resize', plan);
    messen();
  });

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
