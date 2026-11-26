/* stil.js der Vorlage "Reinigung Marine und Zitrone": nur das Formular ohne Versand.
   Alle Bewegung (Kreise, Karten, Kennzahlen, Glanzstreifen, Kopf) kommt aus ../_basis/bewegung.js und stil.css. */
(() => {
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
