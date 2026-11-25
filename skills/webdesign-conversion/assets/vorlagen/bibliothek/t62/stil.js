/* stil.js der Vorlage "Klinik Großschrift": Ablaufbühne mit drei Schritten, Spur mit Pfeilknöpfen (Leistungen), Formularhinweis.
   Das Vollbildmenü schaltet bewegung.js. Ohne JavaScript und bei reduzierter Bewegung stehen alle Schritte untereinander. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const breit = matchMedia('(min-width: 60rem)');

  // 1. Ablauf: bei viel Platz bleibt die Bühne stehen, der Scrollweg (--fortschritt aus bewegung.js) wählt den Schritt
  document.querySelectorAll('[data-ablauf]').forEach((sec) => {
    const schritte = [...sec.querySelectorAll('[data-schritt]')], punkte = [...sec.querySelectorAll('[data-punkt]')], stufen = sec.querySelector('.stufen');
    const kopf = document.querySelector('.kopf');
    const setze = (i) => {
      const fest = sec.classList.contains('gepinnt');
      schritte.forEach((s, k) => { s.toggleAttribute('data-aktiv', k === i); if (fest) s.setAttribute('aria-hidden', String(k !== i)); else s.removeAttribute('aria-hidden'); });
      punkte.forEach((b, k) => { b.toggleAttribute('data-aktiv', k === i); if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
    };
    const strecke = () => sec.offsetHeight - (innerHeight - (kopf ? kopf.offsetHeight : 0));
    const lauf = () => {
      if (!sec.classList.contains('gepinnt')) return;
      const r = sec.getBoundingClientRect(), p = Math.min(0.999, Math.max(0, ((kopf ? kopf.offsetHeight : 0) - r.top) / Math.max(1, strecke())));
      setze(Math.floor(p * schritte.length));
    };
    const pruefe = () => {
      const an = breit.matches && !reduziert;
      sec.classList.toggle('gepinnt', an);
      if (stufen) stufen.hidden = !an;
      if (an) lauf(); else schritte.forEach((s) => { s.setAttribute('data-aktiv', ''); s.removeAttribute('aria-hidden'); });
    };
    punkte.forEach((b, k) => b.addEventListener('click', () => {
      const r = sec.getBoundingClientRect();
      scrollTo({ top: scrollY + r.top - (kopf ? kopf.offsetHeight : 0) + ((k + 0.5) / schritte.length) * strecke(), behavior: reduziert ? 'auto' : 'smooth' });
    }));
    addEventListener('scroll', () => requestAnimationFrame(lauf), { passive: true });
    addEventListener('resize', pruefe);
    pruefe();
  });

  // 2. Spur: Pfeilknöpfe schieben um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
