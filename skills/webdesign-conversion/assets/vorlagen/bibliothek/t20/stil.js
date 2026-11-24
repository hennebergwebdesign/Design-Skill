/* stil.js der Vorlage t20: Held-Aufrichten beim Scrollen und Preiswahl. Ohne Bibliothek. Ohne JavaScript bleibt alles lesbar (Held flach, Preis monatlich). */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Held: Produktansicht kippt flach, wenn sie in den Bildschirm hochgescrollt wird (--p 0 bis 1)
  const bild = document.querySelector('[data-zoom]');
  if (bild && !reduziert) {
    let w8 = false;
    const lauf = () => {
      w8 = false;
      const r = bild.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.62)));
      bild.style.setProperty('--p', p.toFixed(3));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }

  // Preiswahl: monatlich oder jährlich, Zahl wird getauscht, Zustand steht im Knopf (aria-pressed)
  document.querySelectorAll('[data-preiswahl]').forEach((gruppe) => {
    const knoepfe = [...gruppe.querySelectorAll('button')];
    const zahlen = [...document.querySelectorAll('.preis__zahl[data-monat]')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
      zahlen.forEach((z) => { z.textContent = z.dataset[k.dataset.art === "jahr" ? "jaehrlich" : "monat"]; });
    }));
  });
})();
