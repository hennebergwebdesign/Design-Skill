/* stil.js der Vorlage "Analyse dunkel": Preisumschalter (monatlich oder jährlich), Formularhinweis. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript steht der Monatspreis, die Umschalter sind dann ohne Wirkung. */
(() => {
  document.querySelectorAll('[data-preisschalter]').forEach((gruppe) => {
    const knoepfe = [...gruppe.querySelectorAll('button')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      knoepfe.forEach((b) => b.setAttribute('aria-pressed', String(b === k)));
      const attr = k.dataset.zeitraum === 'jahr' ? 'data-jahr' : 'data-monat';
      document.querySelectorAll('[data-monat]').forEach((z) => { z.textContent = z.getAttribute(attr); });
      document.querySelectorAll('.tarif__preis small').forEach((s) => { s.textContent = k.dataset.zeitraum === 'jahr' ? 'pro Monat, jährlich bezahlt' : 'pro Monat'; });
    }));
  });
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
