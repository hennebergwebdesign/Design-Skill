/* stil.js der Vorlage "Bauunternehmen Kapsel und Waldgrün": Statuschips haken nacheinander ab, Reiter wechseln Text und Bildraster,
   Wischspur mit Pfeilknöpfen, Teamband mit Pause, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar: Chips stehen abgehakt, alle Reiterinhalte untereinander. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Statuschips: Bauabschnitte haken sich nacheinander ab, sobald das Heldbild sichtbar ist (einmal)
  const chips = [...document.querySelectorAll('[data-chip]')];
  if (chips.length && !reduziert && 'IntersectionObserver' in window) {
    chips.forEach((c) => c.classList.remove('ist-fertig'));
    const io = new IntersectionObserver((e) => {
      if (!e.some((x) => x.isIntersecting)) return;
      io.disconnect();
      chips.forEach((c, i) => setTimeout(() => c.classList.add('ist-fertig'), 500 + i * 750));
    }, { threshold: 0.35 });
    io.observe(chips[0].closest('.held__bild'));
  }

  // 2. Reiter: erscheinen erst mit JavaScript, ohne sie stehen alle Inhalte untereinander
  document.querySelectorAll('[data-reiter-leiste]').forEach((leiste) => {
    const tabs = [...leiste.querySelectorAll('[role="tab"]')];
    const felder = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    leiste.hidden = false;
    const waehle = (n, fokus) => {
      tabs.forEach((t, i) => { const an = i === n; t.setAttribute('aria-selected', String(an)); t.tabIndex = an ? 0 : -1; felder[i].hidden = !an; });
      if (fokus) tabs[n].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => waehle(i));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); waehle((i + k + tabs.length) % tabs.length, true); }
        if (e.key === 'Home') { e.preventDefault(); waehle(0, true); }
        if (e.key === 'End') { e.preventDefault(); waehle(tabs.length - 1, true); }
      });
    });
    waehle(0);
  });

  // 3. Wischspur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-spur-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]'), steuerung = gruppe.querySelector('[data-spur-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-spur-knopf="zurueck"]'), weiter = steuerung.querySelector('[data-spur-knopf="weiter"]');
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

  // 4. Teamband: Pause Knopf nach WCAG 2.2.2, Pause auch bei Fokus im Band. Bei reduzierter Bewegung steht das Band still, der Knopf entfällt
  document.querySelectorAll('[data-band-gruppe]').forEach((g) => {
    const band = g.querySelector('.band'), knopf = g.querySelector('[data-band-pause]');
    if (!band || !knopf) return;
    if (reduziert) { knopf.hidden = true; return; }
    knopf.hidden = false;
    knopf.addEventListener('click', () => {
      const aus = band.classList.toggle('pausiert');
      knopf.setAttribute('aria-pressed', String(aus));
      knopf.querySelector('span').textContent = aus ? 'Band starten' : 'Band anhalten';
    });
  });

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
