/* stil.js der Vorlage "Reisebüro hell": Pause für das Bausteinband, Wischspur der Stimmen mit Pfeilknöpfen, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Band anhalten (WCAG 2.2.2): Knopf erscheint nur, wenn das Band läuft
  const band = document.querySelector('[data-band]'), pause = document.querySelector('[data-band-pause]');
  if (band && pause && !reduziert) {
    pause.hidden = false;
    pause.addEventListener('click', () => {
      const an = pause.getAttribute('aria-pressed') !== 'true';
      pause.setAttribute('aria-pressed', String(an));
      band.classList.toggle('ist-pause', an);
      pause.querySelector('span').textContent = an ? 'Band starten' : 'Band anhalten';
      pause.querySelector('use').setAttribute('href', an ? '#i-play' : '#i-pause');
    });
  }

  // 2. Wischspur der Stimmen: Pfeilknöpfe schieben um eine Spalte, am Anfang und Ende gesperrt
  document.querySelectorAll('[data-spurgruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]'), steuerung = gruppe.querySelector('[data-spur-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-spur-knopf="zurueck"]'), weiter = steuerung.querySelector('[data-spur-knopf="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 320) + (parseFloat(getComputedStyle(spur).columnGap) || 16);
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
