/* stil.js der Vorlage "SaaS hell Dashboard": Reiter im Funktionsabschnitt, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript stehen alle Reiterflächen untereinander und alles bleibt lesbar. */
(() => {
  // 1. Reiter: Auswahl links, Fläche rechts, Pfeiltasten wechseln, Rollen werden erst hier gesetzt
  document.querySelectorAll('[data-reiter]').forEach((gruppe) => {
    const liste = gruppe.querySelector('[data-reiter-liste]');
    const eintraege = [...gruppe.querySelectorAll('[data-reiter-eintrag]')];
    const flaechen = [...gruppe.querySelectorAll('[data-reiter-flaeche]')];
    if (!liste || eintraege.length !== flaechen.length) return;
    liste.setAttribute('role', 'tablist');
    const zeige = (i, fokus) => {
      eintraege.forEach((e, k) => {
        const an = k === i;
        e.setAttribute('aria-selected', String(an));
        e.tabIndex = an ? 0 : -1;
        flaechen[k].hidden = !an;
      });
      if (fokus) eintraege[i].focus();
    };
    eintraege.forEach((e, i) => {
      e.setAttribute('role', 'tab');
      e.setAttribute('aria-controls', flaechen[i].id);
      flaechen[i].setAttribute('role', 'tabpanel');
      flaechen[i].setAttribute('aria-labelledby', e.id);
      e.addEventListener('click', () => zeige(i, false));
      e.addEventListener('keydown', (ev) => {
        const n = eintraege.length;
        if (['ArrowDown', 'ArrowRight'].includes(ev.key)) { ev.preventDefault(); zeige((i + 1) % n, true); }
        if (['ArrowUp', 'ArrowLeft'].includes(ev.key)) { ev.preventDefault(); zeige((i - 1 + n) % n, true); }
      });
    });
    zeige(0, false);
  });

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.parentElement.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
