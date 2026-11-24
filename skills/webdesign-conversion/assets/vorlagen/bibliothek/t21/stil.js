/* stil.js der Vorlage "Raumfolge" (t21): Bildrahmen wächst, Held blendet aus, Blätterleisten, Laufband anhalten, Jahr, Formularhinweis.
   Festhalten und Einfahren der Karten steuert allein CSS über --fortschritt aus bewegung.js.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x) => Math.min(1, Math.max(0, x));

  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Bildrahmen wächst, Held blendet beim Scrollen aus
  const zoom = reduziert ? [] : [...document.querySelectorAll('[data-zoom]')];
  const weg = reduziert ? [] : [...document.querySelectorAll('[data-weg]')];
  let tick = false;
  const messen = () => {
    tick = false;
    const h = innerHeight;
    zoom.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--z', klemme((h * 0.98 - r.top) / (h * 0.55)).toFixed(3)); });
    weg.forEach((el) => { const hoehe = el.parentElement.offsetHeight; el.style.setProperty('--weg', klemme(scrollY / (hoehe * 0.8)).toFixed(3)); });
  };
  if (zoom.length || weg.length) {
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // Blätterleisten: Pfeile, Fortschrittsbalken, Tastatur über den fokussierbaren Bereich
  document.querySelectorAll('[data-slider]').forEach((box) => {
    const spur = box.querySelector('.slider__spur');
    const zurueck = box.querySelector('[data-zurueck]');
    const vor = box.querySelector('[data-vor]');
    const balken = box.querySelector('[data-balken]');
    const karten = [...spur.querySelectorAll('ul > li')];
    const schritt = () => { const a = karten[0].getBoundingClientRect(), b = karten[1] ? karten[1].getBoundingClientRect() : a; return Math.max(1, b.left - a.left || a.width); };
    const aktual = () => {
      const max = spur.scrollWidth - spur.clientWidth;
      if (zurueck) zurueck.disabled = spur.scrollLeft <= 2;
      if (vor) vor.disabled = spur.scrollLeft >= max - 2;
      if (balken) balken.style.setProperty('--anteil', max > 0 ? ((spur.clientWidth + spur.scrollLeft) / spur.scrollWidth).toFixed(3) : '1');
    };
    const geh = (r) => spur.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    if (zurueck) zurueck.addEventListener('click', () => geh(-1));
    if (vor) vor.addEventListener('click', () => geh(1));
    spur.addEventListener('scroll', () => requestAnimationFrame(aktual), { passive: true });
    addEventListener('resize', aktual);
    aktual();
  });

  // Laufband anhalten (WCAG 2.2.2)
  document.querySelectorAll('[data-pause]').forEach((knopf) => {
    const band = knopf.closest('section').querySelector('.band');
    const text = knopf.querySelector('span');
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      band.classList.toggle('steht', an);
      text.textContent = an ? 'Bewegung fortsetzen' : 'Bewegung anhalten';
    });
  });

  // Beispielformular: kein Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const s = f.querySelector('.newsletter__status');
    if (s) s.textContent = 'Beispielformular: Es wurde nichts gesendet.';
  }));
})();
