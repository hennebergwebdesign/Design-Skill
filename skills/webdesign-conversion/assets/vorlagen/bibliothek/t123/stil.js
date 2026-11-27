/* stil.js der Vorlage "Eisdiele in Vollfarbflächen": Pause für die Laufbänder, Pfeile am Inspirationsband, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript laufen die Bänder nicht und alles steht lesbar da. */
(() => {
  // 1. Laufbänder anhalten (WCAG 2.2.2): Knopf, Hover und Tastaturfokus halten an; die Wahl bleibt bis zum nächsten Klick
  document.querySelectorAll('.anlaesse').forEach((abschnitt) => {
    const knopf = abschnitt.querySelector('[data-pause]');
    if (!knopf) return;
    knopf.hidden = false;
    const text = knopf.querySelector('[data-pause-text]');
    const symbol = knopf.querySelector('use');
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      abschnitt.dataset.pausiert = String(an);
      text.textContent = an ? 'Bänder starten' : 'Bänder anhalten';
      symbol.setAttribute('href', an ? '#i-start' : '#i-pause');
    });
  });

  // 2. Inspirationsband: Pfeile scrollen um eine Kachelbreite, Zustand der Pfeile folgt der Position
  document.querySelectorAll('.inspiration').forEach((abschnitt) => {
    const spur = abschnitt.querySelector('[data-spur]');
    const pfeile = abschnitt.querySelector('[data-pfeile]');
    if (!spur || !pfeile) return;
    pfeile.hidden = false;
    const zurueck = pfeile.querySelector('[data-zurueck]');
    const weiter = pfeile.querySelector('[data-weiter]');
    const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const schritt = () => (spur.querySelector('li')?.getBoundingClientRect().width || 240) + 16;
    const gehe = (r) => spur.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    const zustand = () => {
      zurueck.disabled = spur.scrollLeft <= 2;
      weiter.disabled = spur.scrollLeft >= spur.scrollWidth - spur.clientWidth - 2;
    };
    zurueck.addEventListener('click', () => gehe(-1));
    weiter.addEventListener('click', () => gehe(1));
    spur.addEventListener('scroll', zustand, { passive: true });
    addEventListener('resize', zustand);
    zustand();
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
