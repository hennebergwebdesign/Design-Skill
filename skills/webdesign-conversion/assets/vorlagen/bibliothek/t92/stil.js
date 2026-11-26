/* stil.js der Vorlage "Zahnarzt Marine": Pause fürs Laufband, Wischspur mit Pfeilknöpfen, Umschalter für die Pakete,
   Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Laufband: der Pause Knopf erscheint nur, wenn das Band läuft (WCAG 2.2.2). Reduziert oder ohne JavaScript steht es still.
  document.querySelectorAll('[data-band-pause]').forEach((knopf) => {
    const band = knopf.closest('section')?.querySelector('[data-laufband]');
    if (!band || reduziert) return;
    knopf.hidden = false;
    const text = knopf.querySelector('span'), icon = knopf.querySelector('use');
    knopf.addEventListener('click', () => {
      const steht = band.classList.toggle('laufband--pause');
      text.textContent = steht ? 'Laufband fortsetzen' : 'Laufband anhalten';
      icon.setAttribute('href', steht ? '#i-play' : '#i-pause');
    });
  });

  // 2. Wischspur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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

  // 3. Pakete: Umschalter monatlich oder jährlich. Beide Werte stehen im HTML, ohne JavaScript sind beide sichtbar.
  document.querySelectorAll('[data-umschalter]').forEach((gruppe) => {
    const raster = document.querySelector('[data-paket-raster]');
    if (!raster) return;
    gruppe.hidden = false;
    const knoepfe = [...gruppe.querySelectorAll('[data-modus]')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      raster.dataset.modus = k.dataset.modus;
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
    }));
  });

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
