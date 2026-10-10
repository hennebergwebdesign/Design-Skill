// Zählt eine Zahl einmal hoch, wenn sie in den Sichtbereich kommt. Einsatz: <span data-count="1280">1.280</span>
// Der Text im HTML ist schon die Endzahl: ohne Skript, für Suchmaschinen und bei reduzierter Bewegung
// steht sie da. Das Skript zählt nur an, wenn Bewegung erlaubt ist. Dauer unter einer Sekunde.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out
  const lauf = (el) => {
    const ziel = Number(el.dataset.count);
    if (!Number.isFinite(ziel)) return;
    const endtext = el.textContent;
    const start = performance.now();
    const dauer = 900;
    const schritt = (jetzt) => {
      const t = Math.min(1, (jetzt - start) / dauer);
      el.textContent = t < 1 ? Math.round(ziel * ease(t)).toLocaleString('de-DE') : endtext;
      if (t < 1) requestAnimationFrame(schritt);
    };
    requestAnimationFrame(schritt);
  };
  const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => {
    if (e.isIntersecting) { lauf(e.target); io.unobserve(e.target); }
  }), { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
})();
