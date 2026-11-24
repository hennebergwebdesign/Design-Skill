/* stil.js der Vorlage Praxis: Auffächern, Stapel, Bildband, Reiter mit Selbstlauf, Stimmenwechsel, Team blättern, Jahr.
   Ohne JavaScript bleibt alles sichtbar. Bei reduzierter Bewegung keine Scroll-Animation und kein Selbstlauf. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x) => Math.min(1, Math.max(0, x));
  const breit = matchMedia('(min-width: 64em)');

  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Scroll-gesteuert: Bildfächer (--f), Stapel (--s), Bildband (--z)
  const faecher = [...document.querySelectorAll('[data-faecher]')];
  const stapel = [...document.querySelectorAll('[data-stapel]')];
  const baender = [...document.querySelectorAll('[data-bandzoom]')];
  let tick = false;
  const messen = () => {
    tick = false;
    const h = innerHeight;
    faecher.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--f', klemme((h * 1.0 - r.top) / (h * 0.55)).toFixed(3)); });
    if (breit.matches) {
      stapel.forEach((el, i) => {
        const next = stapel[i + 1];
        if (!next) return;
        const oben = parseFloat(getComputedStyle(next).top) || 0;
        const p = klemme((h - next.getBoundingClientRect().top) / Math.max(1, h - oben));
        el.style.setProperty('--s', (1 - 0.05 * p).toFixed(4));
      });
    }
    baender.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--z', (0.88 + 0.12 * klemme((h - r.top) / (h * 0.7))).toFixed(4)); });
  };
  if (!reduziert) {
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // Team blättern: Pfeile schieben um eine Kartenbreite
  document.querySelectorAll('[data-weiter]').forEach((b) => b.addEventListener('click', () => {
    const liste = document.getElementById(b.getAttribute('aria-controls'));
    const karte = liste.firstElementChild;
    const schritt = karte.getBoundingClientRect().width + parseFloat(getComputedStyle(liste).columnGap || 16);
    liste.scrollBy({ left: schritt * Number(b.dataset.weiter), behavior: reduziert ? 'auto' : 'smooth' });
  }));

  // Reiter mit Selbstlauf (Balken füllt sich, dann nächster Bereich). Erste Eingabe beendet den Selbstlauf.
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const kopf = gruppe.querySelector('[role=tablist]');
    const tabs = [...kopf.querySelectorAll('[role=tab]')];
    const panel = (t) => document.getElementById(t.getAttribute('aria-controls'));
    const dauer = 6;
    gruppe.style.setProperty('--auto-dauer', dauer + 's');
    const waehle = (t, fokus) => {
      tabs.forEach((x) => { const an = x === t; x.setAttribute('aria-selected', String(an)); x.tabIndex = an ? 0 : -1; panel(x).hidden = !an; });
      if (fokus) t.focus();
    };
    const naechster = () => waehle(tabs[(tabs.findIndex((x) => x.getAttribute('aria-selected') === 'true') + 1) % tabs.length]);
    const stopp = () => { kopf.classList.remove('laeuft'); };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => { stopp(); waehle(t); });
      t.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); stopp(); waehle(tabs[(i + d + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); stopp(); waehle(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); stopp(); waehle(tabs[tabs.length - 1], true); }
      });
    });
    waehle(tabs[0]);
    if (!reduziert) {
      kopf.addEventListener('animationend', (e) => { if (e.animationName === 'fuell' && kopf.classList.contains('laeuft')) naechster(); });
      // Start erst, wenn der Bereich sichtbar wird
      new IntersectionObserver((es, io) => { if (es.some((e) => e.isIntersecting)) { kopf.classList.add('laeuft'); io.disconnect(); } }, { threshold: 0.4 }).observe(gruppe);
    }
  });

  // Stimmen: Pfeile wechseln die Karte, Zähler zeigt den Stand
  document.querySelectorAll('[data-folien]').forEach((bühne) => {
    const folien = [...bühne.children];
    const stand = document.querySelector('[data-stand]');
    let i = 0;
    const zeige = (n) => {
      i = (n + folien.length) % folien.length;
      folien.forEach((f, k) => { f.classList.toggle('ist-aktiv', k === i); f.setAttribute('aria-hidden', String(k !== i)); });
      if (stand) stand.textContent = String(i + 1);
    };
    zeige(0);
    document.querySelectorAll('[data-folie]').forEach((b) => b.addEventListener('click', () => zeige(i + Number(b.dataset.folie))));
  });
})();
