/* stil.js der Vorlage "Gartenbühne": Schienen mit Tasten und Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript bleiben die Schienen seitlich scrollbar (Touch, Tastatur nach Fokus, Pfeiltasten), die Tasten entfallen. */
(() => {
  // 1. Schiene: Tasten scrollen um eine Kartenbreite, an den Enden gesperrt
  document.querySelectorAll('[data-schiene]').forEach((schiene) => {
    const liste = schiene.querySelector('.schiene__liste');
    const zurueck = schiene.querySelector('[data-zurueck]');
    const vor = schiene.querySelector('[data-vor]');
    if (!liste || !zurueck || !vor) return;
    const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const schritt = () => { const k = liste.querySelector('li'); return k ? k.getBoundingClientRect().width + parseFloat(getComputedStyle(liste).columnGap || 16) : liste.clientWidth * 0.8; };
    const pruefen = () => {
      zurueck.disabled = liste.scrollLeft <= 4;
      vor.disabled = liste.scrollLeft >= liste.scrollWidth - liste.clientWidth - 4;
    };
    zurueck.addEventListener('click', () => liste.scrollBy({ left: -schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
    vor.addEventListener('click', () => liste.scrollBy({ left: schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
    liste.addEventListener('scroll', pruefen, { passive: true });
    liste.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); vor.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); zurueck.click(); }
    });
    addEventListener('resize', pruefen);
    pruefen();
  });

  // 2. Formulare ohne Versand (Beispiel): Absenden verhindern, Rückmeldung zeigen. Vor Livegang durch echten Versand ersetzen.
  document.querySelectorAll('[data-beispielform]').forEach((f) => {
    const meldung = f.querySelector('[role="status"]');
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!meldung) return;
      meldung.textContent = 'Beispielformular: Es wurde nichts gesendet.';
      meldung.hidden = false;
    });
  });
})();
