/* stil.js der Vorlage "Software Start hell": Funktionsreiter, Kippen der Preiskarten, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Funktionsreiter: auf dem Desktop eine Karte mit Liste, sonst stehen alle Karten untereinander (Liste ist dort ausgeblendet)
  document.querySelectorAll('[data-funk]').forEach((satz) => {
    const tabs = [...satz.querySelectorAll('[role="tab"]')], tafeln = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    const wahl = (n, fokus) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(j === n)); t.tabIndex = j === n ? 0 : -1; });
      tafeln.forEach((p, j) => { p.hidden = j !== n; });
      satz.style.setProperty('--funk-grund', tafeln[n].dataset.grund || '');
      if (fokus) tabs[n].focus();
    };
    tabs.forEach((t, j) => {
      t.addEventListener('click', () => wahl(j, false));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); wahl((j + 1) % tabs.length, true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); wahl((j + tabs.length - 1) % tabs.length, true); }
      });
    });
    // Im schmalen Fenster zeigen alle Karten, deshalb werden die versteckten Felder dort wieder geöffnet
    const mq = matchMedia('(min-width: 62rem)');
    const abgleich = () => { if (mq.matches) { const n = Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')); wahl(n, false); } else { tafeln.forEach((p) => { p.hidden = false; }); satz.style.removeProperty('--funk-grund'); } };
    mq.addEventListener('change', abgleich);
    abgleich();
  });

  // 2. Preiskarten: die äußeren kippen leicht und richten sich beim Scrollen auf (nur transform, --kipp von 1 nach 0)
  if (!reduziert) {
    const reihe = document.querySelector('[data-preise]');
    if (reihe) {
      let w8 = false;
      const lauf = () => {
        w8 = false;
        const r = reihe.getBoundingClientRect(), h = innerHeight;
        const p = Math.min(1, Math.max(0, (r.top + r.height / 2 - h * 0.35) / (h * 0.65)));
        reihe.querySelectorAll('.tarif').forEach((t) => t.style.setProperty('--kipp', p.toFixed(3)));
      };
      addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
      addEventListener('resize', lauf);
      lauf();
    }
  }

  // 3. Formular ohne Versand: zeigt nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.parentElement.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
