/* stil.js der Vorlage "Reisen und Erlebnisse": Karussell und Zitatreiter mit Pfeilknöpfen und Tastatur, aktive Karte, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar, die Spuren lassen sich wischen. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reiter: je Gruppe schieben die Pfeilknöpfe (data-reiter) um ein Element, am Rand gesperrt; Pfeiltasten wirken auf der fokussierten Spur
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]');
    const zurueck = gruppe.querySelector('[data-reiter="zurueck"]'), weiter = gruppe.querySelector('[data-reiter="weiter"]');
    if (!spur || !zurueck || !weiter) return;
    const karten = [...spur.children];
    const stand = () => {
      const max = spur.scrollWidth - spur.clientWidth;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > max - 4));
      // aktive Karte: die mit der Mitte am nächsten an der Mitte der Spur
      const mitte = spur.getBoundingClientRect().left + spur.clientWidth / 2;
      let best = null, abstand = Infinity;
      karten.forEach((k) => { const r = k.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mitte); if (d < abstand) { abstand = d; best = k; } });
      karten.forEach((k) => k.classList.toggle('ist-aktiv', k === best));
    };
    const schritt = (r) => {
      const k = karten[0], s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 0);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); schritt(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); schritt(-1); }
    });
    spur.addEventListener('scroll', () => requestAnimationFrame(stand), { passive: true });
    addEventListener('resize', stand);
    // Karussell zu Beginn auf die erste Karte mittig setzen, ohne die Seite zu bewegen
    stand();
  });

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
