/* stil.js der Vorlage Bühne: Wort für Wort füllen, Reiter, Karussellpunkte, Aufrichten der Stimmen, Countdown, Jahr.
   Ohne JavaScript bleibt alles sichtbar. Bei reduzierter Bewegung keine Scroll-Animation. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x) => Math.min(1, Math.max(0, x));

  // Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Überschriften füllen sich Wort für Wort
  const koepfe = [...document.querySelectorAll('[data-wortfuell]')].map((el) => {
    const woerter = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    const spans = woerter.map((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; el.append(s); if (i < woerter.length - 1) el.append(' '); return s; });
    el.classList.add('wf');
    if (reduziert) spans.forEach((s) => s.classList.add('an'));
    return { el, spans };
  });
  const faecher = [...document.querySelectorAll('[data-faecher]')];
  let tick = false;
  const messen = () => {
    tick = false;
    const h = innerHeight;
    if (!reduziert) {
      koepfe.forEach(({ el, spans }) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) { if (r.bottom < 0) spans.forEach((s) => s.classList.add('an')); return; }
        const p = klemme((h * 0.9 - r.top) / (h * 0.4 + r.height));
        const n = Math.round(p * spans.length);
        spans.forEach((s, i) => s.classList.toggle('an', i < n));
      });
      faecher.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--f', klemme((h * 0.95 - r.top) / (h * 0.55)).toFixed(3)); });
    }
  };
  if (!reduziert) { addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true }); addEventListener('resize', messen); }
  messen();

  // Reiter für die Tage
  document.querySelectorAll('[data-reiter]').forEach((liste) => {
    const tabs = [...liste.querySelectorAll('[role=tab]')];
    const panel = (t) => document.getElementById(t.getAttribute('aria-controls'));
    const waehle = (t, fokus) => {
      tabs.forEach((x) => { const an = x === t; x.setAttribute('aria-selected', String(an)); x.tabIndex = an ? 0 : -1; panel(x).hidden = !an; });
      panel(t).querySelectorAll('.slot').forEach((s, i) => s.style.setProperty('--n', i));
      if (fokus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => waehle(t));
      t.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); waehle(tabs[(i + d + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); waehle(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); waehle(tabs[tabs.length - 1], true); }
      });
    });
    waehle(tabs[0]);
  });

  // Karussell mit Punkten
  document.querySelectorAll('[data-karussell]').forEach((ul) => {
    const punkte = ul.parentElement.querySelector('[data-punkte]');
    const karten = [...ul.children];
    if (!punkte) return;
    const knoepfe = karten.map((k, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'punkt'; b.setAttribute('aria-label', `Zu Eintrag ${i + 1}`);
      b.addEventListener('click', () => ul.scrollBy({ left: k.getBoundingClientRect().left - ul.getBoundingClientRect().left - parseFloat(getComputedStyle(ul).paddingLeft), behavior: reduziert ? 'auto' : 'smooth' }));
      punkte.append(b); return b;
    });
    const aktual = () => {
      const links = ul.scrollLeft, ende = ul.scrollWidth - ul.clientWidth - 2;
      const u = ul.getBoundingClientRect().left + parseFloat(getComputedStyle(ul).paddingLeft);
      let idx = karten.findIndex((k) => k.getBoundingClientRect().left - u >= -4);
      if (idx < 0) idx = karten.length - 1;
      if (links >= ende) idx = karten.length - 1;
      knoepfe.forEach((b, i) => { if (i === idx) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    };
    ul.addEventListener('scroll', () => requestAnimationFrame(aktual), { passive: true });
    aktual();
  });

  // Countdown: HTML trägt Beispielwerte, JavaScript ersetzt sie, solange das Ziel in der Zukunft liegt
  document.querySelectorAll('[data-countdown]').forEach((el) => {
    const ziel = new Date(el.dataset.ziel).getTime();
    if (!(ziel > Date.now())) return;
    const z = (s, n) => { el.querySelector(s).textContent = String(n).padStart(2, '0'); };
    const lauf = () => {
      const d = Math.max(0, ziel - Date.now()), s = Math.floor(d / 1000);
      z('[data-t]', Math.floor(s / 86400)); z('[data-h]', Math.floor(s % 86400 / 3600)); z('[data-m]', Math.floor(s % 3600 / 60)); z('[data-s]', s % 60);
      if (d > 0) setTimeout(lauf, 1000 - (Date.now() % 1000));
    };
    lauf();
  });
})();
