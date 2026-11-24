/* stil.js der Vorlage t08: Video wächst beim Einscrollen, Funktionskarten sinken beim Überdecken. Ohne JS bleibt alles in Endlage. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const video = document.querySelector('[data-video] .video__rahmen');
  const karten = [...document.querySelectorAll('.stapelkarte')];
  const gross = matchMedia('(min-width: 62rem)');
  let tick = false;
  const messen = () => {
    tick = false;
    const h = innerHeight;
    if (video) {
      const r = video.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.7)));
      video.style.setProperty('--v', (0.9 + 0.1 * p).toFixed(3));
    }
    karten.forEach((k, i) => {
      const n = karten[i + 1];
      if (!n || !gross.matches) { k.style.transform = ''; return; }
      const d = n.getBoundingClientRect().top - k.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, 1 - d / k.offsetHeight));
      k.style.transform = `scale(${(1 - 0.05 * p).toFixed(4)})`;
    });
  };
  const an = () => { if (!tick) { tick = true; requestAnimationFrame(messen); } };
  addEventListener('scroll', an, { passive: true });
  addEventListener('resize', an);
  messen();
})();
