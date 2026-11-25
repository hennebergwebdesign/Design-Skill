/* stil.js der Vorlage "Studio Nachtschicht": Reiter mit Pfeilknöpfen (Stimmen), Preisumschalter, Formularhinweis.
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
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 0);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Preisumschalter: monatlich oder jährlich. Ohne JavaScript bleibt der Umschalter verborgen und die Monatspreise stehen im HTML.
  document.querySelectorAll('[data-umschalter]').forEach((u) => {
    u.hidden = false;
    const knoepfe = [...u.querySelectorAll('[data-takt]')];
    const setze = (takt) => {
      knoepfe.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.takt === takt)));
      document.querySelectorAll('[data-preis]').forEach((e) => { e.textContent = e.dataset[takt]; });
      document.querySelectorAll('[data-einheit]').forEach((e) => { e.textContent = e.dataset[takt]; });
    };
    knoepfe.forEach((k) => k.addEventListener('click', () => setze(k.dataset.takt)));
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
