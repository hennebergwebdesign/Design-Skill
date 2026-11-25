/* stil.js der Vorlage "Kanzlei klar": Stimmenwechsler mit Pfeilknöpfen. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript stehen alle Stimmen untereinander, bei reduzierter Bewegung wechselt der Inhalt ohne Übergang. */
(() => {
  document.querySelectorAll('[data-stimmen]').forEach((w) => {
    const folien = [...w.querySelectorAll('[data-folie]')], steuerung = w.querySelector('[data-stimmen-steuerung]');
    if (folien.length < 2 || !steuerung) return;
    let i = Math.max(0, folien.findIndex((f) => f.classList.contains('ist-aktiv')));
    const zeige = (n) => { i = (n + folien.length) % folien.length; folien.forEach((f, k) => f.classList.toggle('ist-aktiv', k === i)); };
    steuerung.hidden = false;
    w.querySelector('[data-stimmen-knopf="zurueck"]').addEventListener('click', () => zeige(i - 1));
    w.querySelector('[data-stimmen-knopf="weiter"]').addEventListener('click', () => zeige(i + 1));
    zeige(i);
  });
})();
