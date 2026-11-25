/* stil.js der Vorlage "Finanzdienst, Rundbänder" (beide Varianten): Reiter mit Pfeilen, Zielgruppen als Reiter, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Spur mit Pfeilknöpfen: schieben um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 20);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Reiter mit Tafeln: ohne JavaScript stehen alle Tafeln untereinander, mit JavaScript eine
  document.querySelectorAll('[data-reiter]').forEach((leiste) => {
    const tabs = [...leiste.querySelectorAll('[role="tab"]')];
    const tafeln = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    if (!tabs.length || tafeln.some((t) => !t)) return;
    const waehle = (i, fokus) => {
      tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; });
      tafeln.forEach((p, n) => { p.hidden = n !== i; });
      if (fokus) tabs[i].focus();
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => waehle(i)));
    leiste.addEventListener('keydown', (e) => {
      const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
      if (e.key === 'ArrowRight') { e.preventDefault(); waehle((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); waehle((i - 1 + tabs.length) % tabs.length, true); }
    });
    waehle(0);
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
