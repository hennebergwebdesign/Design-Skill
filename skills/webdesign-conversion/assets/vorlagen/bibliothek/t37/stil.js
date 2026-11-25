/* stil.js der Vorlage "Akademie mit Kursen": Zeitleiste füllt sich beim Scrollen, Schritte färben sich nach.
   Ergänzt bewegung.js. Ohne JavaScript und bei reduzierter Bewegung steht die Zeitleiste voll und alles ist sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const leisten = [...document.querySelectorAll('[data-zeitleiste]')];
  if (reduziert || !leisten.length) return;
  let tick = false;
  const messen = () => {
    const mitte = innerHeight * 0.55;
    leisten.forEach((l) => {
      const r = l.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (mitte - r.top) / Math.max(1, r.height)));
      l.style.setProperty('--fuell', p.toFixed(4));
    });
    tick = false;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
  addEventListener('resize', messen);
  messen();
})();
