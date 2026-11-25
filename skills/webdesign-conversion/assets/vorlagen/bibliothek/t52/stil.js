/* stil.js der Vorlage "Konzern, Stapelkarten": Stapelkarten schrumpfen leicht, Stimmen als Reiter, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Stapelkarten: Karte darunter schiebt sich über die obere, die obere schrumpft um bis zu vier Prozent
  const karten = [...document.querySelectorAll('.stapel__karte')];
  const breit = matchMedia('(min-width: 64rem)');
  if (karten.length && !reduziert) {
    let w8 = false;
    const lauf = () => {
      w8 = false;
      karten.forEach((k, i) => {
        const n = karten[i + 1];
        if (!breit.matches || !n) { k.style.transform = ''; return; }
        const stand = parseFloat(getComputedStyle(k).top) || 0;
        const p = Math.min(1, Math.max(0, 1 - (n.getBoundingClientRect().top - stand) / (k.offsetHeight + 32)));
        k.style.transform = `scale(${(1 - p * 0.04).toFixed(4)})`;
      });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }

  // 2. Stimmen als Reiter: ohne JavaScript stehen alle Stimmen untereinander, mit JavaScript eine
  document.querySelectorAll('[data-stimmen]').forEach((box) => {
    const tafeln = [...box.querySelectorAll('[role="tabpanel"]')];
    const reiter = box.parentElement.querySelector('[data-reiter]');
    if (!reiter) return;
    const tabs = [...reiter.querySelectorAll('[role="tab"]')];
    const waehle = (i, fokus) => {
      tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; });
      tafeln.forEach((p, n) => { p.hidden = n !== i; });
      if (fokus) tabs[i].focus();
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => waehle(i)));
    reiter.addEventListener('keydown', (e) => {
      const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
      if (e.key === 'ArrowRight') { e.preventDefault(); waehle((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); waehle((i - 1 + tabs.length) % tabs.length, true); }
    });
    waehle(0);
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = document.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
