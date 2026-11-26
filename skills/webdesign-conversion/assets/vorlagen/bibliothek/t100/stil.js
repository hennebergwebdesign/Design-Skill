/* stil.js der Vorlage "Ärztevertretung Marine und Korall": Verbindungslinie der drei Schritte zeichnet sich beim Scrollen,
   Regionen auf der Karte hervorheben, Formular ohne Versand. Ergänzt bewegung.js. Ohne JavaScript und bei reduzierter Bewegung
   bleibt die Linie ganz sichtbar, alle Pins stehen, die Regionenknöpfe bleiben verborgen. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Linie der drei Schritte: Länge folgt dem Scrollweg (scaleX, nur transform)
  const liste = document.querySelector('.schritte__liste'), linie = document.querySelector('.schritte__linie');
  if (liste && linie) {
    const fort = () => {
      if (reduziert) { linie.style.setProperty('--p', '1'); return; }
      const r = liste.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h * 0.8 - r.top) / Math.max(1, r.height * 0.55)));
      linie.style.setProperty('--p', p.toFixed(3));
    };
    fort();
    addEventListener('resize', fort);
    if (!reduziert) addEventListener('scroll', fort, { passive: true });
  }

  // 2. Regionen hervorheben: blendet die Punkte anderer Regionen ab (opacity), Knöpfe erscheinen nur mit JavaScript
  const karte = document.querySelector('.karte');
  if (karte) {
    const gruppe = karte.querySelector('.regionen');
    if (gruppe) {
      gruppe.hidden = false;
      gruppe.querySelectorAll('[data-region-knopf]').forEach((k) => k.addEventListener('click', () => {
        karte.dataset.region = k.dataset.regionKnopf;
        gruppe.querySelectorAll('[data-region-knopf]').forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
      }));
    }
  }

  // 3. Formular ohne Versand: zeigt nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
