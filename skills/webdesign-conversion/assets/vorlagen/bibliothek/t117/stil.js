/* stil.js der Vorlage "Studiobühne mit Fallstudienliste": Karussell Pfeile (Werte, Stimmen), Einwilligung und Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleiben Karussells seitlich scrollbar und Panel und Formular sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Karussell: Pfeile erscheinen erst mit JavaScript, scrollen um eine Kartenbreite (Scroll Snap fängt auf)
  const koppeln = (spur, pfeile) => {
    if (!spur || !pfeile) return;
    pfeile.hidden = false;
    const knoepfe = [...pfeile.querySelectorAll('button')];
    const schritt = () => { const k = spur.firstElementChild; return k ? k.getBoundingClientRect().width + parseFloat(getComputedStyle(spur).columnGap || 16) : 300; };
    const zustand = () => {
      const max = spur.scrollWidth - spur.clientWidth - 2;
      knoepfe[0].disabled = spur.scrollLeft <= 2;
      knoepfe[1].disabled = spur.scrollLeft >= max;
    };
    knoepfe.forEach((b) => b.addEventListener('click', () => spur.scrollBy({ left: Number(b.dataset.richtung) * schritt(), behavior: reduziert ? 'auto' : 'smooth' })));
    spur.addEventListener('scroll', () => requestAnimationFrame(zustand), { passive: true });
    addEventListener('resize', zustand);
    zustand();
  };
  koppeln(document.querySelector('[data-werte]'), document.querySelector('[data-werte-pfeile]'));
  koppeln(document.querySelector('[data-stimmen]'), document.querySelector('[data-stimmen-pfeile]'));

  // 2. Einwilligung (Demo): die drei Knöpfe stellen die Schalter, gespeichert wird nichts
  document.querySelectorAll('[data-einwilligung]').forEach((f) => {
    const optional = [...f.querySelectorAll('input[type="checkbox"]:not([disabled])')];
    f.querySelectorAll('[data-einw]').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.einw === 'ja') optional.forEach((i) => { i.checked = true; });
      if (b.dataset.einw === 'nein') optional.forEach((i) => { i.checked = false; });
    }));
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const m = f.querySelector('[data-einwilligung-meldung]');
      if (m) m.hidden = false;
    });
  });

  // 3. Formular ohne Versand: zeigt nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
