/* stil.js der Vorlage "Mitgliedschaft": wachsende Bildtafel im Held, Reiter mit Pfeilknöpfen, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Bildtafel im Held: wächst beim Scrollen von 88 auf 100 Prozent, dunkelt dabei auf (--auf von 0 bis 1)
  const bild = document.querySelector('.held__bild');
  if (bild && !reduziert) {
    let tick = false;
    const messen = () => {
      tick = false;
      const r = bild.parentElement.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.75)));
      bild.style.setProperty('--auf', p.toFixed(3));
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 2. Reiter: Pfeilknöpfe schieben um eine Karte, am Anfang und Ende gesperrt; ohne Überstand bleiben sie verborgen
  const spur = document.querySelector('[data-reiter-spur]'), steuerung = document.querySelector('[data-reiter-steuerung]');
  if (spur && steuerung) {
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
  }

  // 3. Formular ohne Versand: zeigt nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
