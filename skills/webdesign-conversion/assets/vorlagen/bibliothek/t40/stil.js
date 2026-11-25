/* stil.js der Vorlage "Finanzen hell": Stimmen als Reiter (Pfeiltasten), Formularhinweis. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript steht die erste Stimme, bei reduzierter Bewegung wechseln die Stimmen ohne Übergang. */
(() => {
  document.querySelectorAll('[data-stimmen]').forEach((gruppe) => {
    const reiter = [...gruppe.querySelectorAll('[role="tab"]')];
    const karten = [...gruppe.querySelectorAll('[role="tabpanel"]')];
    const waehle = (i, fokus) => {
      reiter.forEach((r, k) => { r.setAttribute('aria-selected', String(k === i)); r.tabIndex = k === i ? 0 : -1; });
      karten.forEach((c, k) => { c.hidden = k !== i; });
      if (fokus) reiter[i].focus();
    };
    reiter.forEach((r, i) => {
      r.addEventListener('click', () => waehle(i, false));
      r.addEventListener('keydown', (e) => {
        const vor = ['ArrowDown', 'ArrowRight'].includes(e.key), zurueck = ['ArrowUp', 'ArrowLeft'].includes(e.key);
        if (vor || zurueck) { e.preventDefault(); waehle((i + (vor ? 1 : -1) + reiter.length) % reiter.length, true); }
      });
    });
  });
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
