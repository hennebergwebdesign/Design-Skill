/* stil.js der Vorlage t05: Kopf blendet beim Scrollen aus, Hover-Kugel folgt dem Zeiger, Stimmen-Schieber. Ohne Bibliothek. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Kopf: nach unten weg, nach oben zurück, bei offenem Menü oder Fokus im Kopf bleibt er
  const kopf = document.querySelector('[data-kopf]');
  if (kopf) {
    let letzte = scrollY;
    addEventListener('scroll', () => {
      const jetzt = scrollY, offen = kopf.querySelector('[data-menue]')?.getAttribute('aria-expanded') === 'true';
      const weg = jetzt > letzte && jetzt > 160 && !offen && !kopf.contains(document.activeElement);
      kopf.classList.toggle('ist-weg', weg);
      letzte = jetzt;
    }, { passive: true });
    kopf.addEventListener('focusin', () => kopf.classList.remove('ist-weg'));
  }

  // Hover-Kugel "Ansehen" folgt dem Zeiger in der Bildfläche (nur mit Maus)
  if (!reduziert && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.arbeit__link').forEach((a) => {
      const k = a.querySelector('.ansehen');
      if (!k) return;
      a.addEventListener('pointermove', (e) => {
        const r = a.getBoundingClientRect();
        k.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        k.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  // Schieber: eine Stimme sichtbar, Pfeile und Pfeiltasten, ohne JavaScript stehen alle untereinander
  const s = document.querySelector('[data-schieber]');
  if (s) {
    const liste = [...s.querySelectorAll('.stimme')], z = s.querySelector('[data-zurueck]'), w = s.querySelector('[data-weiter]');
    let i = 0;
    const zeige = (n, zurueck) => {
      i = (n + liste.length) % liste.length;
      liste.forEach((el, j) => { el.classList.toggle('ist-aktiv', j === i); el.classList.toggle('ist-zurueck', !!zurueck); el.setAttribute('aria-hidden', String(j !== i)); });
    };
    if (liste.length > 1) { z.hidden = false; w.hidden = false; }
    zeige(0);
    z?.addEventListener('click', () => zeige(i - 1, true));
    w?.addEventListener('click', () => zeige(i + 1, false));
    s.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') zeige(i - 1, true); if (e.key === 'ArrowRight') zeige(i + 1, false); });
  }
})();
