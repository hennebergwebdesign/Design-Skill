/* stil.js der Vorlage t09: Leistungsreiter, Aussagenwechsel, Vergleichsregler, Versatz beim Scrollen. Ohne Bibliothek. Ohne JavaScript bleibt alles lesbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Leistungsreiter: Klick, Hover (nur Maus) und Pfeiltasten wechseln Bild und Preis
  document.querySelectorAll('[data-tabs]').forEach((box) => {
    const tabs = [...box.querySelectorAll('[role="tab"]')];
    const preis = box.querySelector('[data-preis]');
    const waehle = (i, fokus) => {
      tabs.forEach((t, k) => {
        const an = k === i;
        t.setAttribute('aria-selected', String(an));
        t.tabIndex = an ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).classList.toggle('ist-aktiv', an);
      });
      if (preis) { const t = tabs[i].dataset.preis || ''; const teil = t.match(/^(ab \d+ €)$/); preis.parentElement.hidden = !t; preis.textContent = t; const klein = preis.parentElement.querySelector('small'); if (klein) klein.hidden = !teil; }
      if (fokus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => waehle(i));
      t.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') waehle(i); });
      t.addEventListener('keydown', (e) => {
        const n = tabs.length;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); waehle((i + 1) % n, true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); waehle((i + n - 1) % n, true); }
      });
    });
    waehle(0);
  });

  // Aussagenwechsel mit Pfeilen
  document.querySelectorAll('[data-slider]').forEach((box) => {
    const text = box.querySelector('[data-slide]');
    const saetze = ['Zufriedenheit garantiert.', 'Feste Preise ohne Überraschung.', 'Erreichbar, wenn Sie uns brauchen.'];
    let i = 0;
    const zeige = (n) => {
      i = (n + saetze.length) % saetze.length;
      if (reduziert) { text.textContent = saetze[i]; return; }
      text.classList.add('wechselt');
      setTimeout(() => { text.textContent = saetze[i]; text.classList.remove('wechselt'); }, 220);
    };
    box.querySelector('[data-weiter]').addEventListener('click', () => zeige(i + 1));
    box.querySelector('[data-zurueck]').addEventListener('click', () => zeige(i - 1));
  });

  // Vorher und Nachher: Regler setzt die Schnittkante
  document.querySelectorAll('[data-vergleich]').forEach((v) => {
    const r = v.querySelector('input[type="range"]');
    const setze = () => v.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', setze); setze();
  });

  // Versatz beim Scrollen: Karten rund ums Bild und der Grund der Aussagefläche bewegen sich verschieden schnell (nur breit, nicht bei reduzierter Bewegung)
  const breit = matchMedia('(min-width: 56rem)');
  const teile = [...document.querySelectorAll('[data-versatz]')];
  const grund = document.querySelector('.aussage__grund .bild');
  let wartet = false;
  const messen = () => {
    wartet = false;
    const h = innerHeight;
    teile.forEach((el) => {
      if (reduziert || !breit.matches) { el.style.translate = ''; return; }
      const r = el.parentElement.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - h / 2) / h));
      el.style.translate = '0 ' + (p * parseFloat(el.dataset.versatz) * 400).toFixed(1) + 'px';
    });
    if (grund && !reduziert) {
      const r = grund.parentElement.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - h / 2) / h));
      grund.style.transform = 'translate3d(0,' + (p * -60).toFixed(1) + 'px,0)';
    }
  };
  const plane = () => { if (!wartet) { wartet = true; requestAnimationFrame(messen); } };
  addEventListener('scroll', plane, { passive: true });
  addEventListener('resize', plane);
  messen();
})();
