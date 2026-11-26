/* stil.js t97: Spezialbewegung. Ohne dieses Skript bleibt alles sichtbar: Karten stehen gekippt, Eintrag 3 ist offen, die zweite Stimme ist hervorgehoben. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Held: Porträtkarten kippen beim Scrollen weiter (--kipp, 0 bis 1)
  const held = document.querySelector('[data-held]');
  if (held && !reduziert) {
    const karten = [...held.querySelectorAll('[data-kipp]')];
    let w8 = false;
    const lauf = () => { w8 = false; const p = Math.min(1, Math.max(0, scrollY / Math.max(1, held.offsetHeight * 0.7))); karten.forEach((k) => k.style.setProperty('--kipp', p.toFixed(3))); };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    lauf();
  }

  // 2. Stimmen: Karte in der Mitte bekommt den Fokus, Pfeilknöpfe blättern
  const spur = document.querySelector('[data-stimmen-spur]');
  if (spur) {
    const karten = [...spur.children];
    const fokus = () => {
      const m = spur.getBoundingClientRect(); const mitte = m.left + m.width / 2; let best = null, d = 1e9;
      karten.forEach((k) => { const r = k.getBoundingClientRect(), x = Math.abs(r.left + r.width / 2 - mitte); if (x < d) { d = x; best = k; } });
      spur.classList.add('hat-fokus');
      karten.forEach((k) => k.classList.toggle('ist-fokus', k === best));
    };
    let w8 = false;
    spur.addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(() => { w8 = false; fokus(); }); } }, { passive: true });
    addEventListener('resize', fokus);
    // Start: zweite Karte mittig, ohne die Seite zu verschieben
    const zweite = karten[1];
    if (zweite && spur.scrollWidth > spur.clientWidth + 8) spur.scrollLeft = zweite.offsetLeft - (spur.clientWidth - zweite.offsetWidth) / 2;
    fokus();
    document.querySelectorAll('[data-stimmen]').forEach((b) => b.addEventListener('click', () => {
      const schritt = karten[0].offsetWidth + 20;
      spur.scrollBy({ left: Number(b.dataset.stimmen) * schritt, behavior: reduziert ? 'auto' : 'smooth' });
    }));
  }

  // 3. Videoplatzhalter: Knopf schaltet Wiedergabe und Pause, nichts startet von selbst
  document.querySelectorAll('[data-video]').forEach((box) => {
    const k = box.querySelector('[data-video-knopf]');
    if (!k) return;
    k.addEventListener('click', () => {
      const an = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(an));
      k.setAttribute('aria-label', an ? 'Beispielvideo pausieren (Platzhalter)' : 'Beispielvideo abspielen (Platzhalter)');
      box.classList.toggle('laeuft', an);
    });
  });

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
