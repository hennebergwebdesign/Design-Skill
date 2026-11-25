/* stil.js der Vorlage "Bistro mit Bogenbildern": Pfeile für Spuren (Galerie, Stimmen), Schnellleiste schließen, Großschrift im Fuß verschiebt sich
   beim Scrollen, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Spuren: Pfeile schieben um ein Element, am Anfang und Ende gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-spur-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]'), steuerung = gruppe.querySelector('[data-spur-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-spur-knopf="zurueck"]'), weiter = steuerung.querySelector('[data-spur-knopf="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.firstElementChild, s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 20);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Schnellleiste: der Knopf schließt sie
  const schnell = document.querySelector('[data-schnell]');
  if (schnell) schnell.querySelector('[data-schnell-zu]').addEventListener('click', () => { schnell.hidden = true; });

  // 3. Großschrift im Fuß: wandert beim Scrollen langsam nach links (nur translate, bei reduzierter Bewegung ruhig)
  const gross = document.querySelector('[data-fussschrift]');
  if (gross && !reduziert) {
    let w8 = false;
    const lauf = () => {
      w8 = false;
      const r = gross.parentElement.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - r.top / innerHeight));
      gross.style.setProperty('--versatz', (6 - p * 22).toFixed(1) + '%');
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    lauf();
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.parentElement.querySelector('[data-formular-meldung]') || f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
