/* stil.js der Vorlage "Stapelkarten": Laufband der Stimmen wandert beim Scrollen, Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Bei reduzierter Bewegung bleibt das Laufband ein normal scrollbarer Streifen. */
(() => {
  // 1. Formular dieser Vorlage sendet nichts (Anbindung beim Einsatz ergänzen)
  document.querySelectorAll('form[data-ohne-versand]').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));

  // 2. Laufband: <div data-lauf> mit einer .lauf__spur. Der Scrollweg der Seite verschiebt die Spur seitlich.
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduziert) return;
  const baender = [...document.querySelectorAll('[data-lauf]')];
  if (!baender.length) return;
  baender.forEach((b) => b.classList.add('lauf--scroll'));
  let tick = false;
  const lauf = () => {
    tick = false;
    const h = innerHeight;
    baender.forEach((b) => {
      const spur = b.querySelector('.lauf__spur');
      const weg = Math.max(0, spur.scrollWidth - b.clientWidth + parseFloat(getComputedStyle(b).paddingLeft) * 2);
      const r = b.getBoundingClientRect();
      const roh = (h - r.top) / (h + r.height);
      const p = Math.min(1, Math.max(0, (roh - 0.2) / 0.55));
      spur.style.transform = `translate3d(${(-p * weg).toFixed(1)}px,0,0)`;
    });
  };
  const an = () => { if (!tick) { tick = true; requestAnimationFrame(lauf); } };
  addEventListener('scroll', an, { passive: true });
  addEventListener('resize', an);
  lauf();
})();
