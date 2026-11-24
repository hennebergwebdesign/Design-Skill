/* stil.js der Vorlage "Aufzieh-Bühne": Jahr im Fuß und Hinweis der Beispielformulare. Die Bewegung der Bühnen steckt in stil.css
   (Variable --fortschritt aus bewegung.js), hier läuft nichts Animiertes. */
(() => {
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });
  // Beispielformulare senden nichts: Hinweis statt Versand. Beim echten Formular diesen Block entfernen und action setzen.
  document.querySelectorAll('[data-vorlage-form]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = f.querySelector('[role="status"]');
      if (status) status.textContent = 'Vorlage: Es wurde nichts gesendet. Hier das echte Formular anbinden.';
    });
  });
})();
