/* stil.js der Vorlage "Studio mit Terminbuchung": Pfeilknöpfe für die Leistungsspur, Stimmenfolie, Reiter der Preisliste (Variante 2),
   Formularhinweis. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Spur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
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

  // 2. Stimmenfolie: eine Stimme sichtbar, Pfeile wechseln. Ohne JavaScript stehen alle Stimmen untereinander.
  document.querySelectorAll('[data-folien]').forEach((bereich) => {
    const folien = [...bereich.querySelectorAll('[data-folie]')], steuerung = bereich.querySelector('[data-folien-steuerung]');
    if (folien.length < 2 || !steuerung) return;
    let i = 0;
    const zeige = (n) => {
      i = (n + folien.length) % folien.length;
      folien.forEach((f, k) => f.classList.toggle('aktiv', k === i));
    };
    steuerung.hidden = false;
    steuerung.setAttribute('role', 'group');
    bereich.querySelector('.folien').setAttribute('aria-live', 'polite');
    steuerung.querySelector('[data-folien="zurueck"]').addEventListener('click', () => zeige(i - 1));
    steuerung.querySelector('[data-folien="weiter"]').addEventListener('click', () => zeige(i + 1));
    zeige(0);
  });

  // 3. Reiter der Preisliste (Variante 2): Pfeiltasten wechseln, ohne JavaScript stehen alle Listen untereinander
  document.querySelectorAll('[data-reiter-liste]').forEach((liste) => {
    const tabs = [...liste.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    const waehle = (n, fokus) => {
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === n)); t.tabIndex = k === n ? 0 : -1; });
      panels.forEach((p, k) => { if (p) p.hidden = k !== n; });
      if (fokus) tabs[n].focus();
    };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => waehle(k));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); waehle((k + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); waehle((k - 1 + tabs.length) % tabs.length, true); }
        if (e.key === 'Home') { e.preventDefault(); waehle(0, true); }
        if (e.key === 'End') { e.preventDefault(); waehle(tabs.length - 1, true); }
      });
    });
    liste.hidden = false;
    waehle(0);
  });

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
