/* stil.js der Vorlage "SaaS Agentur Nachtgrün": Staffelung der Säulen in der Anfragekarte, Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript steht alles im Endzustand. */
(() => {
  // 1. Säulen der Karte laufen nacheinander hoch: Index als Variable, die Klasse ist-da setzt bewegung.js am Eltern Element (data-zeig)
  document.querySelectorAll('.karte__saeulen').forEach((l) => [...l.children].forEach((s, i) => s.style.setProperty('--n', i)));

  // 2. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
