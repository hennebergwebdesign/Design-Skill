/* stil.js der Vorlage "Rechnungswesen hell": Partnerliste hellt beim Scrollen auf, Stimmen mit Pfeilknöpfen, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Partnerliste: Zeilen hellen nacheinander auf, solange die Bühne (ab 64 rem) stehen bleibt. Ohne Bewegung alle voll sichtbar.
  const partner = document.querySelector('[data-partner]');
  if (partner && !reduziert) {
    const rahmen = partner.querySelector('.partner__rahmen'), zeilen = [...partner.querySelectorAll('.partner__liste li')];
    partner.classList.add('partner--aktiv');
    let w8 = false;
    const lauf = () => {
      w8 = false;
      const r = rahmen.getBoundingClientRect(), strecke = Math.max(1, r.height - innerHeight);
      const p = r.height <= innerHeight * 1.2 ? 1 : Math.min(1, Math.max(0, -r.top / strecke));
      const n = Math.max(1, Math.ceil(p * zeilen.length));
      zeilen.forEach((z, i) => z.classList.toggle('an', i < n));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }

  // 2. Stimmen: Pfeilknöpfe schieben um eine Karte, an den Enden gesperrt, ohne Überstand verborgen
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

  // 3. Formulare ohne Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
