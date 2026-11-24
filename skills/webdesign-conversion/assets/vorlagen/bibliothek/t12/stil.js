/* stil.js der Vorlage t12: Bilderband folgt dem Scroll, Preisumschalter, Stimmen blättern. Ohne Bibliothek. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Bilderband im Held: wandert beim Scrollen langsam nach links
  const spur = document.querySelector('[data-streifen]');
  if (spur && !reduziert) {
    let tick = false;
    const lauf = () => { const r = spur.parentElement.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - (r.top + r.height) / (innerHeight + r.height))); spur.style.setProperty('--v', (-p * 140).toFixed(1) + 'px'); tick = false; };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(lauf); } }, { passive: true });
    lauf();
  }

  // Preisumschalter: Beispielwerte je Takt aus data-preise
  const gruppe = document.querySelector('[data-umschalter]');
  if (gruppe) {
    const knoepfe = [...gruppe.querySelectorAll('button')], werte = [...document.querySelectorAll('[data-preise]')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
      werte.forEach((w) => { w.textContent = w.dataset.preise.split('|')[Number(k.dataset.takt)]; if (!reduziert) { w.classList.remove('tickt'); void w.offsetWidth; w.classList.add('tickt'); } });
    }));
  }

  // Stimmen blättern
  const box = document.querySelector('[data-stimmen]');
  if (box) {
    const liste = [...box.querySelectorAll('[data-stimme]')];
    let i = 0;
    const zeige = (n) => { i = (n + liste.length) % liste.length; liste.forEach((s, k) => { s.hidden = k !== i; }); };
    box.querySelector('[data-weiter]').addEventListener('click', () => zeige(i + 1));
    box.querySelector('[data-zurueck]').addEventListener('click', () => zeige(i - 1));
    zeige(0);
  }

  // Formulare der Vorlage senden nichts: Absender muss angebunden werden
  document.querySelectorAll('form[action="#"]').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));

  const jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = new Date().getFullYear();
})();
