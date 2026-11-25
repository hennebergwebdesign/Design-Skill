/* stil.js der Vorlage "Studio hell": Reiter für Stimmen, Preisschalter. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript stehen alle fünf Stimmen untereinander, der Preis zeigt den Monatswert. Bei reduzierter Bewegung gibt es hier keine Animation. */
(() => {
  // 1. Stimmen als Reiter: Pfeiltasten wechseln, Pos1 und Ende springen
  document.querySelectorAll('[data-reiter-satz]').forEach((satz) => {
    const knoepfe = [...satz.querySelectorAll('[role="tab"]')], felder = [...satz.querySelectorAll('[role="tabpanel"]')];
    if (!knoepfe.length) return;
    const waehle = (i, fokus) => {
      knoepfe.forEach((k, j) => { k.setAttribute('aria-selected', String(j === i)); k.tabIndex = j === i ? 0 : -1; });
      felder.forEach((f, j) => { f.hidden = j !== i; });
      if (fokus) knoepfe[i].focus();
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => waehle(i, false));
      k.addEventListener('keydown', (e) => {
        const n = knoepfe.length;
        const ziel = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
        if (ziel >= 0) { e.preventDefault(); waehle(ziel, true); }
      });
    });
    waehle(0, false);
  });

  // 2. Preise: Jahresschalter tauscht die Beträge aller Tarife
  document.querySelectorAll('[data-preise]').forEach((gruppe) => {
    const schalter = document.querySelector('[data-jahr]'), preise = [...gruppe.querySelectorAll('[data-preis]')];
    if (!schalter) return;
    schalter.addEventListener('change', () => preise.forEach((p) => { p.textContent = (schalter.checked ? p.dataset.jahrWert : p.dataset.monat) + ' €'; }));
  });
})();
