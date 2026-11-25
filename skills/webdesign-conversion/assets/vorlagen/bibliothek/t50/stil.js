/* stil.js der Vorlage "Produkt hell Raster": Preisumschalter, Stimmen mit Pfeilknöpfen, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Preisumschalter: Monat oder Jahr, die Beträge stehen als data-Werte im HTML, ohne JavaScript gilt der Monatspreis
  const schalter = document.querySelector('[data-umschalter]');
  if (schalter) {
    const knoepfe = [...schalter.querySelectorAll('button')];
    const setze = (art) => {
      knoepfe.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.art === art)));
      document.querySelectorAll('[data-monat]').forEach((el) => { el.textContent = el.dataset[art]; });
      document.querySelectorAll('[data-hinweis-jahr]').forEach((el) => { el.hidden = art !== 'jahr'; });
    };
    knoepfe.forEach((k) => k.addEventListener('click', () => setze(k.dataset.art)));
    setze('monat');
  }

  // 2. Beiträge: Pfeilknöpfe schieben um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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
    const m = f.parentElement.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
