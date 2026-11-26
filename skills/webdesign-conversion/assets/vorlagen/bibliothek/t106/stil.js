/* stil.js der Vorlage "Finanz App Koralle und Petrol": Ziffernwalze, Filmplatzhalter, Wortmarke im Fuß, Formulare ohne Versand, Jahreszahl.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung steht jeder Wert fertig im HTML. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Ziffernwalze: jede Ziffer wird zu einem Band 0 bis 9 und läuft beim Sichtbarwerden auf ihren Endwert (nur transform)
  document.querySelectorAll('[data-walze]').forEach((zahl) => {
    if (reduziert || !('IntersectionObserver' in window)) return;
    const ziffern = [...zahl.querySelectorAll('[data-z]')];
    ziffern.forEach((z, i) => {
      const band = document.createElement('span');
      band.className = 'walze';
      band.setAttribute('aria-hidden', 'true');
      for (let k = 0; k <= 9; k++) { const s = document.createElement('span'); s.textContent = String(k); band.appendChild(s); }
      band.style.setProperty('--n', String(i));
      band.style.setProperty('--z', '0');
      z.textContent = '';
      z.appendChild(band);
    });
    const io = new IntersectionObserver((e) => {
      if (!e.some((x) => x.isIntersecting)) return;
      io.disconnect();
      requestAnimationFrame(() => requestAnimationFrame(() => ziffern.forEach((z) => z.firstChild.style.setProperty('--z', z.dataset.z))));
    }, { threshold: 0.5 });
    io.observe(zahl);
  });

  // 2. Filmplatzhalter: zeigt nur, dass hier später ein Film mit Pause Knopf steht (kein Autostart, kein Video geladen)
  document.querySelectorAll('[data-film]').forEach((f) => {
    const k = f.querySelector('button'), h = f.querySelector('.film__hinweis');
    if (!k || !h) return;
    h.setAttribute('aria-live', 'polite');
    k.addEventListener('click', () => { h.textContent = 'Platzhalter: Es ist noch kein Film hinterlegt. Im Projekt öffnet sich hier der Player, Start nur auf Knopfdruck, mit Pause Knopf.'; });
  });

  // 3. Wortmarke im Fuß fährt ein, sobald sie sichtbar wird
  document.querySelectorAll('.fuss__marke').forEach((m) => {
    if (reduziert || !('IntersectionObserver' in window)) { m.classList.add('ist-da'); return; }
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { m.classList.add('ist-da'); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(m);
  });

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));

  // 5. Jahreszahl im Fuß
  document.querySelectorAll('[data-jahr]').forEach((j) => { j.textContent = String(new Date().getFullYear()); });
})();
