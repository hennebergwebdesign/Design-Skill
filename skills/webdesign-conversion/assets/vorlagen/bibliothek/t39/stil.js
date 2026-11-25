/* stil.js der Vorlage "Finanzwerkzeug mit Bühnen": nur der Formularhinweis. Die Bühnen (Fenster, Bildwanderung) laufen über
   data-fortschritt aus bewegung.js und die CSS Variable --fortschritt, ohne eigenen Code. Ohne JavaScript und bei reduzierter Bewegung stehen
   die Bühnen ruhig und vollständig da. */
(() => {
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
