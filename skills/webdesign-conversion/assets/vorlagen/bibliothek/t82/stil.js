/* stil.js der Vorlage "Sport App dunkel": Schrittkarten bauen sich auf, Telefon steigt und kippt, aktiver Punkt in der Funktionsliste,
   Stimmen Wischspur mit Pfeilen, Pause für die Bewegung im Telefon, Formulare ohne Versand.
   Ergänzt bewegung.js. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hatIO = 'IntersectionObserver' in window;

  // 1. Schrittkarten: nacheinander aufbauen, die Fortschrittslinie füllt sich mit. Ohne Bewegung stehen alle Karten sofort da.
  document.querySelectorAll('[data-schritte]').forEach((g) => {
    const karten = [...g.querySelectorAll('[data-schritt]')], balken = g.querySelector('.schritte__fortschritt span');
    const setze = (n) => g.style.setProperty('--geschafft', String(n / karten.length));
    if (reduziert || !hatIO) { karten.forEach((k) => k.classList.add('an')); setze(karten.length); return; }
    document.documentElement.classList.add('js-stil');
    setze(0);
    const io = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return; io.disconnect();
      karten.forEach((k, i) => setTimeout(() => { k.classList.add('an'); setze(i + 1); }, 260 * i));
    }, { threshold: 0.2 });
    io.observe(g);
  });

  // 2. Telefon steigt und kippt leicht beim Scrollen: --p von 0 (unten, schräg) bis 1 (gerade)
  const telefone = reduziert ? [] : [...document.querySelectorAll('[data-telefon]')];
  if (telefone.length) {
    let w8 = false;
    const lauf = () => {
      w8 = false;
      const h = innerHeight;
      telefone.forEach((t) => {
        const r = t.getBoundingClientRect();
        const roh = Math.min(1, Math.max(0, (h - r.top) / (h * 0.8)));
        t.style.setProperty('--p', (1 - Math.pow(1 - roh, 3)).toFixed(3));
      });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }

  // 3. Funktionsliste: der Punkt in der Bildschirmmitte ist aktiv, auch Überfahren und Tastaturfokus setzen ihn
  document.querySelectorAll('[data-funktionen]').forEach((liste) => {
    const punkte = [...liste.querySelectorAll('[data-funk]')];
    const setze = (p) => punkte.forEach((x) => x.classList.toggle('aktiv', x === p));
    setze(punkte[0]);
    punkte.forEach((p) => { p.addEventListener('mouseenter', () => setze(p)); p.addEventListener('focusin', () => setze(p)); p.setAttribute('tabindex', '0'); });
    if (hatIO && !reduziert) {
      const io = new IntersectionObserver((e) => e.forEach((x) => { if (x.isIntersecting) setze(x.target); }), { rootMargin: '-42% 0px -48% 0px' });
      punkte.forEach((p) => io.observe(p));
    }
  });

  // 4. Stimmen: Wischspur mit Pfeilen (ohne JavaScript bleibt sie wischbar)
  document.querySelectorAll('[data-spur]').forEach((spur) => {
    const rahmen = spur.closest('.stimmen__raster') || document, st = rahmen.querySelector('[data-spur-steuerung]');
    if (!st) return;
    st.hidden = false;
    const schritt = () => (spur.querySelector('.stimme')?.getBoundingClientRect().width || 300) + 16;
    st.querySelector('[data-spur="zurueck"]').addEventListener('click', () => spur.scrollBy({ left: -schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
    st.querySelector('[data-spur="weiter"]').addEventListener('click', () => spur.scrollBy({ left: schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
  });

  // 5. Pause für die Bewegung in den Telefonen (WCAG 2.2.2)
  document.querySelectorAll('[data-bewegung]').forEach((k) => {
    k.addEventListener('click', () => {
      const an = document.documentElement.classList.toggle('pausiert');
      k.setAttribute('aria-pressed', String(an));
      k.textContent = an ? 'Bewegung im Telefon starten' : 'Bewegung im Telefon anhalten';
    });
  });

  // 6. Formulare: Beispielmeldung statt Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (f.checkValidity()) { if (m) m.hidden = false; } else f.reportValidity();
  }));
})();
