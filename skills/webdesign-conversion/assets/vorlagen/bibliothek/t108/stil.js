/* stil.js der Vorlage "Marktbeobachtung": Werkzeugreiter (Tabs mit Pfeiltasten), Formular ohne Versand. Ergänzt bewegung.js.
   Ohne JavaScript stehen alle Werkzeugansichten untereinander, nichts ist verborgen. */
(() => {
  // 1. Werkzeugreiter
  const liste = document.querySelector('[data-reiter-liste]');
  if (liste) {
    const knoepfe = [...liste.querySelectorAll('[role="tab"]')];
    const tafeln = knoepfe.map((k) => document.getElementById(k.getAttribute('aria-controls')));
    document.documentElement.classList.add('reiter-an');
    const waehle = (i, fokus) => {
      knoepfe.forEach((k, n) => {
        const an = n === i;
        k.setAttribute('aria-selected', String(an));
        k.tabIndex = an ? 0 : -1;
        tafeln[n].hidden = !an;
      });
      if (fokus) knoepfe[i].focus();
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => waehle(i));
      k.addEventListener('keydown', (e) => {
        const n = knoepfe.length;
        const ziel = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (ziel !== undefined) { e.preventDefault(); waehle(ziel, true); }
      });
    });
    waehle(0);
  }
  // 2. Formular ohne Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
