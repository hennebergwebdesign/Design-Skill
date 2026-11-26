/* stil.js der Vorlage "Labor Eisgrün und Petrol": Paket Umschalter (Tabs, kurzes Überblenden), Wischspur mit Pfeilknöpfen, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript stehen alle Paketgruppen untereinander, die Wischspur bleibt per Wischen und Tastatur bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Tabs: Pfeiltasten, Pos1 und Ende, aktiver Tab im Tab Index, Panel blendet kurz ein (nur opacity und transform)
  document.querySelectorAll('[data-tabs]').forEach((gruppe) => {
    const tabs = [...gruppe.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    if (!tabs.length || panels.some((p) => !p)) return;
    const waehle = (i, fokus) => {
      tabs.forEach((t, k) => { const an = k === i; t.setAttribute('aria-selected', String(an)); t.tabIndex = an ? 0 : -1; });
      panels.forEach((p, k) => {
        p.hidden = k !== i;
        p.classList.remove('blendet');
        if (k === i && !reduziert) { void p.offsetWidth; p.classList.add('blendet'); }
      });
      if (fokus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => waehle(i, false));
      t.addEventListener('keydown', (e) => {
        const n = tabs.length;
        const ziel = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (ziel === undefined) return;
        e.preventDefault(); waehle(ziel, true);
      });
    });
    waehle(0, false);
  });

  // 2. Wischspur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
