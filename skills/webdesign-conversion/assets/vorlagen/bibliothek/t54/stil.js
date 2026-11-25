/* stil.js der Vorlage "Finanz Plattform": Reiter und Schieber, Kippbild im Held (Variante 1), Formularhinweis nicht nötig.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar:
   alle Tafeln stehen untereinander, die Bedienelemente sind erst mit JavaScript sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reiter und Schieber: [data-schieber] enthält [data-tafel] und optional [role=tab] und Pfeile [data-schritt]
  document.querySelectorAll('[data-schieber]').forEach((box) => {
    const tafeln = [...box.querySelectorAll('[data-tafel]')];
    const reiter = [...box.querySelectorAll('[role="tab"]')];
    const pfeile = [...box.querySelectorAll('[data-schritt]')];
    box.querySelectorAll('[data-nur-js]').forEach((e) => { e.hidden = false; });
    if (tafeln.length < 2) return;
    let aktuell = Math.max(0, tafeln.findIndex((t) => !t.hidden));
    const zeige = (i, fokus) => {
      aktuell = (i + tafeln.length) % tafeln.length;
      tafeln.forEach((t, n) => { t.hidden = n !== aktuell; });
      reiter.forEach((r, n) => { r.setAttribute('aria-selected', String(n === aktuell)); r.tabIndex = n === aktuell ? 0 : -1; });
      if (fokus && reiter[aktuell]) reiter[aktuell].focus();
    };
    reiter.forEach((r, n) => {
      r.addEventListener('click', () => zeige(n));
      r.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); zeige(aktuell + 1, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); zeige(aktuell - 1, true); }
        if (e.key === 'Home') { e.preventDefault(); zeige(0, true); }
        if (e.key === 'End') { e.preventDefault(); zeige(tafeln.length - 1, true); }
      });
    });
    pfeile.forEach((p) => p.addEventListener('click', () => zeige(aktuell + Number(p.dataset.schritt))));
    zeige(aktuell);
  });

  // 2. Kippbild (Variante 1): --k von 1 (geneigt) auf 0 (flach), sobald das Bild in die Bildschirmmitte wandert
  const kipp = document.querySelector('[data-kipp]');
  if (kipp && !reduziert) {
    let w = false;
    const lauf = () => {
      w = false;
      const r = kipp.getBoundingClientRect(), h = innerHeight;
      const k = Math.min(1, Math.max(0, (r.top - h * 0.05) / (h * 0.55)));
      kipp.style.setProperty('--k', k.toFixed(3));
    };
    addEventListener('scroll', () => { if (!w) { w = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }
})();
