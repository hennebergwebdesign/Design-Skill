/* stil.js der Vorlage "Praxis Terminfokus": Reiter mit Pfeilknöpfen (Leistungen, Team), Stimmenwechsel, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reiter: Pfeilknöpfe schieben um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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

  // 2. Stimmen: eine Stimme sichtbar, Pfeile wechseln im Kreis. Ohne JavaScript stehen alle untereinander.
  document.querySelectorAll('[data-stimmen]').forEach((karte) => {
    const liste = [...karte.querySelectorAll('.stimme')], pfeile = karte.querySelectorAll('[data-stimme]');
    if (liste.length < 2) return;
    let i = 0;
    const zeige = (n) => {
      i = (n + liste.length) % liste.length;
      liste.forEach((li, k) => { if (k === i) { li.setAttribute('data-aktiv', ''); li.removeAttribute('aria-hidden'); } else { li.removeAttribute('data-aktiv'); li.setAttribute('aria-hidden', 'true'); } });
    };
    pfeile.forEach((p) => { p.hidden = false; p.addEventListener('click', () => zeige(i + (p.dataset.stimme === 'weiter' ? 1 : -1))); });
    zeige(0);
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
