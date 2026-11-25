/* stil.js der Vorlage "Beratung hell, Bogenblätter": Reiter mit Punkten, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleibt der Reiter wischbar, alles sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reiter: Punkte je Position, Klick springt, Scrollen setzt den aktuellen Punkt
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]'), punkte = gruppe.querySelector('[data-reiter-punkte]');
    if (!spur || !punkte) return;
    const karten = [...spur.children];
    const bau = () => {
      const breit = karten[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(spur).columnGap) || 20);
      const sichtbar = Math.max(1, Math.round(spur.clientWidth / breit));
      const anzahl = Math.max(1, karten.length - sichtbar + 1);
      punkte.hidden = anzahl < 2;
      punkte.textContent = '';
      for (let i = 0; i < anzahl; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Stimme ${i + 1} von ${anzahl}`);
        b.addEventListener('click', () => spur.scrollTo({ left: i * breit, behavior: reduziert ? 'auto' : 'smooth' }));
        punkte.appendChild(b);
      }
      stand(breit);
    };
    const stand = (breit) => {
      const b = breit || karten[0].getBoundingClientRect().width + 20;
      const i = Math.round(spur.scrollLeft / b);
      [...punkte.children].forEach((p, n) => p.setAttribute('aria-current', String(n === Math.min(i, punkte.children.length - 1))));
    };
    spur.addEventListener('scroll', () => stand(), { passive: true });
    addEventListener('resize', bau);
    bau();
  });

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = document.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
