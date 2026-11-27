/* stil.js der Vorlage "Wertegemeinschaft App mit Manifest Scrollgeschichte": nur die Formulare ohne Versand.
   Manifest, Münzen und Satzband laufen rein über --fortschritt aus bewegung.js und CSS. Ohne JavaScript stehen alle Sätze untereinander. */
(() => {
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
