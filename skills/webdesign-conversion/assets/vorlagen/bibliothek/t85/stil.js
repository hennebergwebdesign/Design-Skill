/* stil.js der Vorlage "Praxis hell mit Marineblau": Stimmen als Wischspur mit Pfeilknöpfen, Ratgeber als Wechsler mit Vor und Zurück,
   Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript stehen die Stimmen als wischbare Spur und alle Beiträge untereinander, die Steuerung bleibt dann verborgen. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Stimmen: Wischspur mit Pfeilknöpfen, schiebt um eine Stimme, am Anfang und Ende gesperrt
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]'), steuerung = gruppe.querySelector('[data-reiter-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-reiter="zurueck"]'), weiter = steuerung.querySelector('[data-reiter="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 16);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Ratgeber: Wechsler zeigt einen Beitrag, Vor und Zurück laufen im Kreis, der neue Beitrag fährt sanft ein
  document.querySelectorAll('[data-wechsler]').forEach((w) => {
    const eintraege = [...w.querySelectorAll('[data-wechsler-eintrag]')], steuerung = w.querySelector('[data-wechsler-steuerung]'),
      zaehler = w.querySelector('[data-wechsler-zaehler]');
    if (eintraege.length < 2 || !steuerung) return;
    let nr = 0;
    const zeige = (n, animiert) => {
      nr = (n + eintraege.length) % eintraege.length;
      eintraege.forEach((e, i) => {
        e.hidden = i !== nr;
        e.classList.remove('neu');
        if (i === nr && animiert && !reduziert) { void e.offsetWidth; e.classList.add('neu'); }
      });
      if (zaehler) zaehler.textContent = `${nr + 1} von ${eintraege.length}`;
    };
    steuerung.hidden = false;
    w.querySelector('[data-wechsler-zurueck]').addEventListener('click', () => zeige(nr - 1, true));
    w.querySelector('[data-wechsler-weiter]').addEventListener('click', () => zeige(nr + 1, true));
    zeige(0, false);
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
