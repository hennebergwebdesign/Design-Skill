/* stil.js der Vorlage "Jahreszeiten": Karussell mit Pfeilen, Beispielformular ohne Versand, Jahr im Fuß.
   Alles Weitere (Einblenden, Zählen, Wortlicht, Fortschritt, Tiefenverschiebung, Menü) kommt aus ../_basis/bewegung.js.
   Ohne JavaScript bleibt alles sichtbar, das Karussell lässt sich dann per Wischen und Tastatur bedienen. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Karussell: Pfeile blättern um eine Karte, am Rand sind sie gesperrt
  document.querySelectorAll('[data-karussell]').forEach((k) => {
    const spur = k.querySelector('[data-spur]');
    const bereich = k.closest('section') || document;
    const zurueck = bereich.querySelector('[data-zurueck]');
    const vor = bereich.querySelector('[data-vor]');
    if (!spur || !zurueck || !vor) return;
    const schritt = () => {
      const karte = spur.querySelector('li');
      const luecke = parseFloat(getComputedStyle(spur).columnGap) || 16;
      return karte ? karte.getBoundingClientRect().width + luecke : spur.clientWidth * 0.8;
    };
    const pruefen = () => {
      zurueck.disabled = spur.scrollLeft <= 2;
      vor.disabled = spur.scrollLeft + spur.clientWidth >= spur.scrollWidth - 2;
    };
    zurueck.addEventListener('click', () => spur.scrollBy({ left: -schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
    vor.addEventListener('click', () => spur.scrollBy({ left: schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
    spur.addEventListener('scroll', pruefen, { passive: true });
    addEventListener('resize', pruefen);
    pruefen();
  });

  // Beispielformular: nichts wird gesendet
  document.querySelectorAll('form[data-ohne-versand]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const m = f.querySelector('[data-meldung]');
      if (m) m.textContent = 'Beispielformular: Hier wird nichts gesendet.';
    });
  });
})();
