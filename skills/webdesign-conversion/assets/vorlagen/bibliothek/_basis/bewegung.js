/* bewegung.js: Einblenden, Zählen, Sticky-Fortschritt, Parallax, Menü. Reines JavaScript, ohne Bibliothek.
   Regeln: Endwert steht im HTML (data-zaehle ist nur der Weg dorthin), bei reduzierter Bewegung passiert nichts Animiertes. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Einblenden: data-zeig, Staffelung über data-staffel im Elternelement
  const zeig = [...document.querySelectorAll('[data-zeig]')];
  document.querySelectorAll('[data-staffel]').forEach((el) => [...el.querySelectorAll('[data-zeig]')].forEach((k, i) => k.style.setProperty('--i', i)));
  if (reduziert || !('IntersectionObserver' in window)) zeig.forEach((e) => e.classList.add('ist-da'));
  else {
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('ist-da'); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    zeig.forEach((e) => io.observe(e));
  }

  // 2. Zählen: <span data-zaehle>1200</span>, Endwert im Text, Start erst beim Sichtbarwerden
  if (!reduziert && 'IntersectionObserver' in window) {
    const z = new IntersectionObserver((eintraege) => eintraege.forEach((e) => {
      if (!e.isIntersecting) return; z.unobserve(e.target);
      const el = e.target, ende = parseFloat(el.dataset.zaehle || el.textContent.replace(/[^\d.,-]/g, '').replace(',', '.')), dez = (String(ende).split('.')[1] || '').length, t0 = performance.now(), dauer = 1400;
      const zeile = (t) => { const p = Math.min(1, (t - t0) / dauer), w = ende * (1 - Math.pow(1 - p, 3)); el.textContent = w.toLocaleString('de-DE', { minimumFractionDigits: dez, maximumFractionDigits: dez }); if (p < 1) requestAnimationFrame(zeile); else el.textContent = el.dataset.text || ende.toLocaleString('de-DE', { minimumFractionDigits: dez, maximumFractionDigits: dez }); };
      el.dataset.text = el.textContent; requestAnimationFrame(zeile);
    }), { threshold: 0.6 });
    document.querySelectorAll('[data-zaehle]').forEach((e) => z.observe(e));
  }

  // 3. Fortschritt im Sektionsraum: --fortschritt (0 bis 1) für Sticky-Abschnitte mit data-fortschritt
  const fort = [...document.querySelectorAll('[data-fortschritt]')];
  // 4. Parallax: data-parallax="0.15" verschiebt leicht gegen die Scrollrichtung
  const para = reduziert ? [] : [...document.querySelectorAll('[data-parallax]')];
  let tick = false;
  const messen = () => {
    const h = innerHeight;
    fort.forEach((el) => { const r = el.getBoundingClientRect(), s = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - h))); el.style.setProperty('--fortschritt', s.toFixed(4)); });
    para.forEach((el) => { const r = el.getBoundingClientRect(), f = parseFloat(el.dataset.parallax) || 0.15, d = (r.top + r.height / 2 - h / 2) * -f; el.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`; });
    root.classList.toggle('gescrollt', scrollY > 24);
    tick = false;
  };
  if (fort.length || para.length || true) addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
  messen();

  // 5. Menü: Knopf [data-menue] schaltet [data-menue-ziel], Escape schließt, Fokus bleibt sichtbar
  const knopf = document.querySelector('[data-menue]'), ziel = document.querySelector('[data-menue-ziel]');
  if (knopf && ziel) {
    const setze = (offen) => { knopf.setAttribute('aria-expanded', String(offen)); ziel.dataset.offen = String(offen); document.body.style.overflow = offen ? 'hidden' : ''; };
    knopf.addEventListener('click', () => setze(knopf.getAttribute('aria-expanded') !== 'true'));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setze(false); });
    ziel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setze(false)));
  }

  // 6. Akkordeon: <details data-exklusiv> in Gruppe schließt die anderen
  document.querySelectorAll('[data-exklusiv]').forEach((g) => g.addEventListener('toggle', (e) => { if (e.target.open) g.querySelectorAll('details[open]').forEach((d) => { if (d !== e.target) d.open = false; }); }, true));
})();
