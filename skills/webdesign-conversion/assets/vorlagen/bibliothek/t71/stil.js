/* stil.js der Vorlage "Koch App dunkel": Schleifenvideo mit Pause, Filter Chips für Rezeptvorschläge, Reihen mit Porträts und Kursfotos,
   die beim Scrollen seitlich driften, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar: nur Poster, volle Liste, Reihen zum Wischen. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Schleifenvideo: Knopf hält die Bewegung an und startet sie wieder (WCAG 2.2.2). Bei reduzierter Bewegung bleibt nur das Poster.
  //    Mit echtem <video> im Rahmen schaltet derselbe Knopf play() und pause().
  document.querySelectorAll('[data-schleife]').forEach((s) => {
    const knopf = s.querySelector('[data-schleife-knopf]'), text = s.querySelector('[data-schleife-text]'), video = s.querySelector('video');
    if (!knopf) return;
    if (reduziert) { s.dataset.lauf = 'aus'; return; }
    knopf.hidden = false;
    const setze = (an) => {
      s.dataset.lauf = an ? 'an' : 'aus';
      knopf.setAttribute('aria-pressed', String(!an));
      if (text) text.textContent = an ? 'Bewegung anhalten' : 'Bewegung abspielen';
      if (video) { if (an) video.play().catch(() => {}); else video.pause(); }
    };
    knopf.addEventListener('click', () => setze(s.dataset.lauf !== 'an'));
    setze(true);
  });

  // 2. Filter Chips: Chips erscheinen erst mit JavaScript, ohne sie zeigt die Liste alles. Mehrere Chips gelten zusammen (und).
  document.querySelectorAll('[data-chips]').forEach((leiste) => {
    const liste = document.querySelector('[data-vorschlaege]'), zahl = document.querySelector('[data-filter-zahl]'), keine = document.querySelector('[data-filter-keine]');
    if (!liste) return;
    leiste.hidden = false;
    const knoepfe = [...leiste.querySelectorAll('[data-tag]')], zeilen = [...liste.querySelectorAll('[data-tags]')];
    const anwenden = () => {
      const aktiv = knoepfe.filter((k) => k.getAttribute('aria-pressed') === 'true').map((k) => k.dataset.tag);
      let n = 0;
      zeilen.forEach((li) => { const tags = li.dataset.tags.split(' '), ok = aktiv.every((t) => tags.includes(t)); li.hidden = !ok; if (ok) n += 1; });
      if (keine) keine.hidden = n > 0;
      if (zahl) { zahl.hidden = aktiv.length === 0; zahl.textContent = n === 1 ? '1 Vorschlag' : `${n} Vorschläge`; }
    };
    knoepfe.forEach((k) => k.addEventListener('click', () => { k.setAttribute('aria-pressed', String(k.getAttribute('aria-pressed') !== 'true')); anwenden(); }));
  });

  // 3. Reihen driften: der Scrollweg des Abschnitts schiebt die Reihe seitlich (vor: nach rechts, zurueck: nach links).
  //    Sobald jemand die Reihe selbst bedient, hört das Treiben auf. Bei reduzierter Bewegung bleibt die Reihe stehen.
  const reihen = reduziert ? [] : [...document.querySelectorAll('[data-drift]')].map((el) => ({ el, frei: true, rueck: el.dataset.drift === 'zurueck' }));
  reihen.forEach((r) => ['pointerdown', 'wheel', 'keydown', 'focusin', 'touchstart'].forEach((ev) => r.el.addEventListener(ev, () => { r.frei = false; }, { passive: true })));
  if (reihen.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      reihen.forEach((r) => {
        if (!r.frei) return;
        const b = r.el.getBoundingClientRect(), max = r.el.scrollWidth - r.el.clientWidth;
        if (max <= 4) return;
        const p = Math.min(1, Math.max(0, (h - b.top) / (h + b.height)));
        r.el.scrollLeft = (r.rueck ? 1 - p : p) * max;
      });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
