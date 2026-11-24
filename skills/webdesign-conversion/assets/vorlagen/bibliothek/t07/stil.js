/* stil.js der Vorlage t07: Reiter, Ablauflinien, Stimmen blättern, Jahr, Menüreihenfolge. Ohne Bibliothek. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Menüeinträge nacheinander einfahren lassen
  document.querySelectorAll('.menue__liste a').forEach((a, i) => a.style.setProperty('--n', i));

  // Reiter: ARIA-Reiter mit Pfeiltasten, Tafeln werden nur mit JavaScript ausgeblendet
  const liste = document.querySelector('.reiter');
  if (liste) {
    const knoepfe = [...liste.querySelectorAll('[role="tab"]')];
    const tafeln = knoepfe.map((k) => document.getElementById(k.getAttribute('aria-controls')));
    tafeln.forEach((t) => t.setAttribute('role', 'tabpanel'));
    const waehle = (n, fokus) => {
      knoepfe.forEach((k, i) => { const an = i === n; k.setAttribute('aria-selected', String(an)); k.tabIndex = an ? 0 : -1; tafeln[i].hidden = !an; tafeln[i].classList.toggle('zeigt', an && !reduziert); });
      if (fokus) knoepfe[n].focus();
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => waehle(i));
      k.addEventListener('keydown', (e) => {
        const ende = knoepfe.length - 1; let n = null;
        if (e.key === 'ArrowRight') n = i === ende ? 0 : i + 1;
        else if (e.key === 'ArrowLeft') n = i === 0 ? ende : i - 1;
        else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = ende;
        if (n !== null) { e.preventDefault(); waehle(n, true); }
      });
    });
    waehle(0);
    tafeln[0].classList.remove('zeigt');
  }

  // Ablauf: Linien füllen sich nacheinander beim Scrollen
  const ablauf = document.querySelector('[data-ablauf]');
  if (ablauf) {
    const schritte = [...ablauf.querySelectorAll('.schritt')];
    const viele = () => getComputedStyle(ablauf).gridTemplateColumns.split(' ').length > 1;
    let tick = false;
    const messen = () => {
      tick = false;
      if (reduziert) { schritte.forEach((s) => { s.style.setProperty('--fuell', 1); s.classList.add('erreicht'); }); return; }
      const h = innerHeight, r = ablauf.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (h * 0.3 + r.height * 0.7)));
      const n = schritte.length;
      schritte.forEach((s, i) => {
        const f = Math.min(1, Math.max(0, p * n * 1.15 - i));
        s.style.setProperty('--fuell', f.toFixed(3));
        s.classList.toggle('erreicht', f > 0.02);
      });
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // Stimmen: Pfeile blättern um eine Karte
  const spur = document.querySelector('.stimmen__spur');
  if (spur) {
    const schritt = () => { const k = spur.querySelector('.stimme'); return k ? k.getBoundingClientRect().width + parseFloat(getComputedStyle(spur).columnGap || 24) : 300; };
    const ziel = (r) => spur.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    document.querySelector('[data-weiter]')?.addEventListener('click', () => ziel(1));
    document.querySelector('[data-zurueck]')?.addEventListener('click', () => ziel(-1));
  }
})();
