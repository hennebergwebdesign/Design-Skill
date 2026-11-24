/* stil.js der Vorlage t11: gegenläufige Stimmenreihen, Parallax der Ergebnisbilder (begrenzt), Abdunkeln überdeckter Leistungskarten, Jahr.
   Kein Framework. Bei reduzierter Bewegung läuft nichts davon, die Reihen sind dann von Hand scrollbar. */
(() => {
  const jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = new Date().getFullYear();
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduziert) return;

  const reihen = [...document.querySelectorAll('.reihe')];
  reihen.forEach((r) => r.classList.add('drift'));
  const versatz = [...document.querySelectorAll('[data-versatz]')];
  const karten = [...document.querySelectorAll('.leistung')];
  let tick = false;

  const messen = () => {
    tick = false;
    const h = innerHeight;
    reihen.forEach((r) => {
      const spur = r.firstElementChild, rect = r.getBoundingClientRect();
      const weg = Math.max(0, spur.scrollWidth - r.clientWidth);
      const p = Math.min(1, Math.max(0, (h - rect.top) / (h + rect.height)));
      const x = r.dataset.richtung === 'rechts' ? -(1 - p) * weg : -p * weg;
      spur.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    });
    versatz.forEach((el) => {
      if (innerWidth < 1024) { el.style.transform = ''; return; }
      const r = el.parentElement.getBoundingClientRect(), f = parseFloat(el.dataset.versatz) || 0.1;
      const d = (r.top + r.height / 2 - h / 2) * -f;
      el.style.transform = `translate3d(0,${Math.max(-70, Math.min(70, d)).toFixed(1)}px,0)`;
    });
    if (innerWidth >= 768) karten.forEach((k, i) => {
      const next = karten[i + 1], innen = k.firstElementChild;
      if (!next) return;
      const d = next.getBoundingClientRect().top - k.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, 1 - d / Math.max(1, k.offsetHeight)));
      innen.style.opacity = (1 - p * 0.65).toFixed(2);
    });
    else karten.forEach((k) => { k.firstElementChild.style.opacity = ''; });
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
  addEventListener('resize', messen);
  messen();
})();
