/* stil.js der Vorlage "Projektentwickler mit Bewegtbild Held": Sparten Filter der Projektkarten und Formular ohne Versand.
   Der Held (schrumpfende Bühne) läuft über --fortschritt aus bewegung.js und braucht hier nichts. Ohne JavaScript stehen alle Karten da. */
(() => {
  // 1. Filter: Knöpfe erscheinen erst mit JavaScript, ohne sie bleibt die Liste vollständig
  const filter = document.querySelector('[data-filter]');
  if (filter) {
    filter.hidden = false;
    const karten = [...document.querySelectorAll('.projekte__raster .karte')];
    const leer = document.querySelector('[data-filter-leer]');
    const knoepfe = [...filter.querySelectorAll('[data-sparte]')];
    const setze = (sparte) => {
      let sichtbar = 0;
      karten.forEach((k) => { const an = sparte === 'alle' || k.dataset.sparte === sparte; k.hidden = !an; if (an) sichtbar += 1; });
      knoepfe.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sparte === sparte)));
      if (leer) leer.hidden = sichtbar > 0;
    };
    knoepfe.forEach((b) => b.addEventListener('click', () => setze(b.dataset.sparte)));
  }

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
