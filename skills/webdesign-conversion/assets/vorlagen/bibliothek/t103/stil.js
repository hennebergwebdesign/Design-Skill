/* stil.js der Vorlage "Zahnarzt Anthrazit und Salbei": Punkte der Stimmen, feste Terminleiste ausblenden, Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleiben die Stimmen wischbar (Punkte sind Anker) und die Leiste sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Stimmen: Punkte zeigen die sichtbare Karte an und schalten per Klick um
  document.querySelectorAll('[data-stimmen]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-stimmen-spur]'), punkte = [...gruppe.querySelectorAll('.punkt')], karten = [...spur.children];
    if (!spur || !punkte.length) return;
    const setze = (i) => punkte.forEach((p, n) => (n === i ? p.setAttribute('aria-current', 'true') : p.removeAttribute('aria-current')));
    punkte.forEach((p, i) => p.addEventListener('click', (e) => {
      e.preventDefault();
      spur.scrollTo({ left: karten[i].offsetLeft - spur.offsetLeft, behavior: reduziert ? 'auto' : 'smooth' });
    }));
    spur.addEventListener('scroll', () => setze(Math.round(spur.scrollLeft / Math.max(1, spur.clientWidth))), { passive: true });
  });

  // 2. Feste Terminleiste: verschwindet, sobald das Formular im Bild ist
  const leiste = document.querySelector('[data-terminleiste]'), ziel = document.querySelector('#kontakt');
  if (leiste && ziel && 'IntersectionObserver' in window) {
    new IntersectionObserver((e) => leiste.classList.toggle('terminleiste--weg', e.some((x) => x.isIntersecting)), { threshold: 0.15 }).observe(ziel);
  }

  // 3. Formular ohne Versand: zeigt nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
