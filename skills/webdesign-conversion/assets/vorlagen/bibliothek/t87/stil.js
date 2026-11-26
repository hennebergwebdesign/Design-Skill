/* stil.js: Spezialbewegung der Vorlage. Alles hat einen Endzustand im HTML, ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = 'IntersectionObserver' in window;

  // 1. Aktionskarte im Held schließen
  document.querySelectorAll('[data-aktion]').forEach((k) => k.querySelector('[data-aktion-zu]')?.addEventListener('click', () => { k.hidden = true; }));

  // 2. Symbolreihe: schaltet die aktive Übung durch, solange sie im Bild ist. Ein Klick übernimmt und beendet den Selbstlauf.
  document.querySelectorAll('[data-reihe]').forEach((r) => {
    const knoepfe = [...r.querySelectorAll('.reihe__knopf')], name = r.querySelector('[data-reihe-name]');
    let i = 0, timer = 0, manuell = false;
    const setze = (n) => { i = n; knoepfe.forEach((k, j) => k.setAttribute('aria-pressed', String(j === n))); if (name) name.textContent = knoepfe[n].dataset.name; };
    knoepfe.forEach((k, n) => k.addEventListener('click', () => { manuell = true; clearInterval(timer); setze(n); }));
    if (reduziert || !io) return;
    new IntersectionObserver((e) => {
      clearInterval(timer);
      if (e[0].isIntersecting && !manuell) timer = setInterval(() => setze((i + 1) % knoepfe.length), 2200);
    }, { threshold: 0.4 }).observe(r);
  });

  // 3. Trainingstage wählen
  document.querySelectorAll('[data-tage]').forEach((t) => {
    const zahl = t.querySelector('[data-tage-zahl]');
    t.querySelectorAll('.tag').forEach((b) => b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      if (zahl) zahl.textContent = String(t.querySelectorAll('.tag[aria-pressed="true"]').length);
    }));
  });

  // 4. Nacheinander: Blasen im Chat, Haken in der Liste, Wort im Fuß. Start beim Sichtbarwerden, Endzustand steht im HTML.
  const ziele = document.querySelectorAll('[data-schritt]');
  const an = (e) => e.classList.add('hakt');
  if (reduziert || !io) ziele.forEach(an);
  else {
    const o = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { an(x.target); o.unobserve(x.target); } }), { threshold: 0.35 });
    ziele.forEach((e) => o.observe(e));
  }

  // 5. Video Platzhalter: Pause für die Bewegung im Standbild (WCAG 2.2.2)
  document.querySelectorAll('[data-video]').forEach((v) => {
    const k = v.querySelector('[data-video-knopf]'), use = k.querySelector('use'), text = k.querySelector('.sr-nur');
    k.addEventListener('click', () => {
      const p = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(p)); v.classList.toggle('pausiert', p);
      use.setAttribute('href', p ? '#i-play' : '#i-pause'); text.textContent = p ? 'Animation fortsetzen' : 'Animation pausieren';
    });
  });

  // 6. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
