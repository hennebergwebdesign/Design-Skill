/* stil.js der Vorlage "Beratung Pastell und Schwarz": Wischspuren mit Pfeilknöpfen (Leistungen, Stimmen), Filmplatzhalter,
   Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleiben die Spuren per Wischen und Tastatur bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Wischspur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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

  // 2. Filmplatzhalter: zeigt nur, dass hier später ein Film mit Pause Knopf steht (kein Autostart, kein Video geladen)
  document.querySelectorAll('[data-film]').forEach((f) => {
    const k = f.querySelector('button'), h = f.querySelector('.film__hinweis');
    if (!k || !h) return;
    h.setAttribute('aria-live', 'polite');
    k.addEventListener('click', () => { h.textContent = 'Platzhalter: Es ist noch kein Film hinterlegt. Im Projekt öffnet sich hier der Player, ohne Autostart und mit Pause Knopf.'; });
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
