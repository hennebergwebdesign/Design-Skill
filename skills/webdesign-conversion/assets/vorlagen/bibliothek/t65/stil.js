/* stil.js der Vorlage "Kanzlei Serifenwärme": wischbare Stimmen mit Punkten, Aussagen im festgehaltenen Abschnitt, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Stimmen: Punkte springen zur jeweiligen Karte und zeigen die erste sichtbare an
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const spur = slider.querySelector('[data-slider-spur]'), punkte = slider.querySelector('[data-slider-punkte]');
    if (!spur || !punkte) return;
    const karten = [...spur.children];
    const knoepfe = karten.map((k, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Stimme ${i + 1} von ${karten.length} zeigen`);
      b.addEventListener('click', () => spur.scrollTo({ left: k.offsetLeft - spur.offsetLeft, behavior: reduziert ? 'auto' : 'smooth' }));
      punkte.appendChild(b);
      return b;
    });
    const stand = () => {
      punkte.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      const ende = spur.scrollLeft >= spur.scrollWidth - spur.clientWidth - 4;
      let aktiv = karten.findIndex((k) => k.offsetLeft - spur.offsetLeft >= spur.scrollLeft - 4);
      if (aktiv < 0 || ende) aktiv = karten.length - 1 - (ende ? 0 : 0);
      knoepfe.forEach((b, i) => b.setAttribute('aria-current', String(i === aktiv)));
    };
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Über uns: auf breiten Bildschirmen bleibt der Abschnitt stehen, die drei Aussagen wechseln mit dem Scrollweg
  const ueber = document.querySelector('[data-ueber]');
  if (ueber && !reduziert) {
    const aussagen = [...ueber.querySelectorAll('[data-aussage]')], striche = [...ueber.querySelectorAll('.ueber__anzeige i')];
    const breit = matchMedia('(min-width: 60rem)');
    let aktiv = -1, an = false, wartet = false;
    const setze = (i) => {
      if (i === aktiv) return;
      aktiv = i;
      aussagen.forEach((a, n) => a.classList.toggle('ist-aktiv', n === i));
      striche.forEach((s, n) => s.classList.toggle('ist-aktiv', n === i));
    };
    const messen = () => {
      wartet = false;
      if (!breit.matches) { if (an) { an = false; ueber.classList.remove('ueber--stick'); aussagen.forEach((a) => a.classList.remove('ist-aktiv')); striche.forEach((s) => s.classList.remove('ist-aktiv')); aktiv = -1; } return; }
      if (!an) { an = true; ueber.classList.add('ueber--stick'); }
      const r = ueber.getBoundingClientRect(), weg = Math.max(1, r.height - innerHeight), p = Math.min(0.999, Math.max(0, -r.top / weg));
      setze(Math.floor(p * aussagen.length));
    };
    const tick = () => { if (!wartet) { wartet = true; requestAnimationFrame(messen); } };
    addEventListener('scroll', tick, { passive: true });
    addEventListener('resize', tick);
    breit.addEventListener('change', tick);
    messen();
  }

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
