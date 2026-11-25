/* stil.js der Vorlage "Kanzlei Dunkelknopf": Fortschrittslinie im Vorgehen, Schrägstellung der Leistungszeilen, wachsende Bildfläche,
   wischbare Stimmen, Reiter, Formularhinweis. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const breit = matchMedia('(min-width: 60rem)');
  const klemme = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // 1. Vorgehen: auf breiten Bildschirmen bleibt der Abschnitt stehen, Knopf auf der Linie und drei Schritte folgen dem Scrollweg
  const vor = document.querySelector('[data-vorgehen]');
  const zeilen = [...document.querySelectorAll('[data-zeilen] .zeile')];
  const film = document.querySelector('[data-film] .film__bild');
  let wartet = false, stick = false;
  const messen = () => {
    wartet = false;
    if (vor && !reduziert) {
      if (!breit.matches) {
        if (stick) { stick = false; vor.classList.remove('vorgehen--stick'); vor.querySelectorAll('[data-schritt]').forEach((s) => s.classList.remove('ist-da')); }
      } else {
        if (!stick) { stick = true; vor.classList.add('vorgehen--stick'); }
        const r = vor.getBoundingClientRect(), p = klemme(-r.top / Math.max(1, r.height - innerHeight));
        const spur = vor.querySelector('.vorgehen__spur'), knopf = vor.querySelector('.vorgehen__knopf');
        if (spur && knopf) knopf.style.setProperty('--x', `${(p * (spur.clientWidth - knopf.offsetWidth)).toFixed(1)}px`);
        vor.querySelectorAll('[data-schritt]').forEach((s, i) => s.classList.toggle('ist-da', p >= i * 0.42 - 0.001));
      }
    }
    // 2. Leistungszeilen: unten im Bild schräg nach hinten gekippt, mit dem Hochscrollen werden sie flach
    if (zeilen.length && !reduziert) {
      zeilen.forEach((z) => {
        const r = z.getBoundingClientRect(), mitte = r.top + r.height / 2, t = klemme((mitte - innerHeight * 0.5) / (innerHeight * 0.45));
        z.style.transform = t > 0.01 ? `rotateX(${(t * 38).toFixed(1)}deg)` : '';
      });
    }
    // 3. Bildfläche: wächst von 70 Prozent auf volle Größe, solange sie in den Bildschirm hineinläuft
    if (film && !reduziert) {
      const r = film.getBoundingClientRect(), t = klemme((innerHeight - r.top) / (innerHeight * 0.75));
      film.style.setProperty('--s', (0.7 + 0.3 * t).toFixed(3));
    }
  };
  const tick = () => { if (!wartet) { wartet = true; requestAnimationFrame(messen); } };
  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick);
  breit.addEventListener('change', tick);
  messen();

  // 4. Stimmen: Pfeile schieben um eine Stimme, am Anfang und Ende gesperrt
  document.querySelectorAll('[data-slider]').forEach((g) => {
    const spur = g.querySelector('[data-slider-spur]'), st = g.querySelector('[data-slider-steuerung]');
    if (!spur || !st) return;
    const z = st.querySelector('[data-slider-knopf="zurueck"]'), w = st.querySelector('[data-slider-knopf="weiter"]');
    const stand = () => {
      st.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      z.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      w.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => spur.scrollBy({ left: r * spur.clientWidth, behavior: reduziert ? 'auto' : 'smooth' });
    z.addEventListener('click', () => schritt(-1));
    w.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 5. Reiter: Pfeiltasten wechseln, nur die gewählte Tafel ist sichtbar. Ohne JavaScript stehen beide Pakete untereinander.
  document.querySelectorAll('[data-reiter]').forEach((g) => {
    const liste = g.querySelector('[data-reiter-liste]'), knoepfe = liste ? [...liste.querySelectorAll('[role="tab"]')] : [], tafeln = [...g.querySelectorAll('[data-reiter-tafel]')];
    if (!liste || knoepfe.length < 2) return;
    liste.hidden = false;
    const zeige = (i, fokus) => {
      knoepfe.forEach((k, n) => { k.setAttribute('aria-selected', String(n === i)); k.tabIndex = n === i ? 0 : -1; });
      tafeln.forEach((t, n) => { t.hidden = n !== i; });
      if (fokus) knoepfe[i].focus();
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => zeige(i));
      k.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); zeige((i + 1) % knoepfe.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); zeige((i - 1 + knoepfe.length) % knoepfe.length, true); }
      });
    });
    zeige(0);
  });

  // 6. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
