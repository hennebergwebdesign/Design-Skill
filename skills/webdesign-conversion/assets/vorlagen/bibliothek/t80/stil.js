/* stil.js der Vorlage "Kreativagentur schwarz und Limette": Leistungsliste mit Bildwechsel, Schwarzweißfotos färben sich beim Scrollen auf,
   Bänder mit Pause, Wischspur der Stimmen, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Leistungen: aktive Zeile bestimmt das Foto, Beschreibung nur bei der aktiven Zeile (CSS, nur mit JavaScript)
  document.querySelectorAll('[data-leistungen]').forEach((liste) => {
    const fotos = [...document.querySelectorAll('[data-bilder] img')];
    const zeilen = [...liste.querySelectorAll('li')];
    const setze = (i) => {
      zeilen.forEach((li, n) => { li.classList.toggle('aktiv', n === i); li.querySelector('button').setAttribute('aria-pressed', String(n === i)); });
      fotos.forEach((f, n) => f.classList.toggle('aktiv', n === i));
    };
    zeilen.forEach((li, n) => {
      const b = li.querySelector('button');
      b.addEventListener('click', () => setze(n));
      b.addEventListener('mouseenter', () => { if (matchMedia('(hover: hover)').matches) setze(n); });
      b.addEventListener('focus', () => setze(n));
    });
  });

  // 2. Schwarzweißfotos: --auf (0 bis 0,5) färbt das Farbbild darüber beim Scrollen leicht auf, beim Überfahren voll (CSS)
  const sw = reduziert ? [] : [...document.querySelectorAll('[data-sw]')];
  if (sw.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      sw.forEach((el) => { const r = el.getBoundingClientRect(), mitte = r.top + r.height / 2, nah = 1 - Math.min(1, Math.abs(mitte - h * 0.5) / (h * 0.6)); el.style.setProperty('--auf', (nah * 0.5).toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 3. Bänder: Pause Knopf erscheint nur mit JavaScript und ohne reduzierte Bewegung (WCAG 2.2.2)
  document.querySelectorAll('[data-band-halt]').forEach((knopf) => {
    const band = (knopf.closest('section') || document).querySelector('[data-band]');
    if (!band || reduziert) return;
    knopf.hidden = false;
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      knopf.textContent = an ? 'Band starten' : 'Band anhalten';
      band.classList.toggle('band--halt', an);
    });
  });

  // 4. Wischspur der Stimmen mit Pfeilknöpfen (ohne JavaScript bleibt sie wischbar)
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
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 320) + (parseFloat(getComputedStyle(spur).columnGap) || 16);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 5. Formulare ohne Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
