/* stil.js der Vorlage "Küchenstudio dunkel und gold": Bildwechsler im Held (Pünktchen, Pause), Videoplatzhalter mit Pause,
   Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript steht das erste Heldfoto, Steuerung und Pause bleiben verborgen. Bei reduzierter Bewegung wechselt nichts von selbst. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Bildwechsler im Held: alle 6 Sekunden das nächste Foto, Pünktchen wählen, Pause hält an (WCAG 2.2.2)
  const held = document.querySelector('.held');
  const folien = held ? [...held.querySelectorAll('.held__folie')] : [];
  const steuer = held && held.querySelector('[data-wechsler-steuerung]');
  if (held && folien.length > 1 && steuer) {
    steuer.hidden = false;
    const punkte = [...steuer.querySelectorAll('.held__punkt')];
    const pause = steuer.querySelector('[data-wechsler-pause]');
    const pauseName = pause.querySelector('.sr-nur');
    let aktuell = 0, timer = null, vonHand = false, sichtbar = true;
    const zeige = (n) => {
      aktuell = (n + folien.length) % folien.length;
      folien.forEach((f, i) => f.classList.toggle('ist-aktiv', i === aktuell));
      punkte.forEach((p, i) => { if (i === aktuell) p.setAttribute('aria-current', 'true'); else p.removeAttribute('aria-current'); });
      folien[aktuell].querySelectorAll('img[loading="lazy"]').forEach((im) => { im.loading = 'eager'; });
    };
    const stopp = () => { clearInterval(timer); timer = null; };
    const start = () => { stopp(); if (!reduziert && !vonHand && sichtbar) timer = setInterval(() => zeige(aktuell + 1), 6000); };
    const setzePause = (an) => {
      vonHand = an;
      pause.setAttribute('aria-pressed', String(an));
      pauseName.textContent = an ? 'Bildwechsel fortsetzen' : 'Bildwechsel anhalten';
      held.classList.toggle('ist-pause', an || reduziert);
      an ? stopp() : start();
    };
    punkte.forEach((p) => p.addEventListener('click', () => { zeige(Number(p.dataset.nr)); start(); }));
    pause.addEventListener('click', () => setzePause(!vonHand));
    // Beim Fokus auf die Steuerung nicht unter den Fingern wechseln
    steuer.addEventListener('focusin', stopp);
    steuer.addEventListener('focusout', start);
    // Nicht wechseln, solange der Held nicht im Bild ist
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { sichtbar = e.isIntersecting; sichtbar ? start() : stopp(); }, { threshold: 0.2 }).observe(held);
    if (reduziert) { pause.hidden = true; held.classList.add('ist-pause'); } else start();
    // Mit Escape auf einem Pünktchen den Wechsel anhalten
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && steuer.contains(document.activeElement) && !vonHand) setzePause(true); });
  }

  // 2. Videoplatzhalter: Knopf schaltet "läuft" (das Poster fährt langsam), jederzeit anhaltbar
  document.querySelectorAll('[data-video]').forEach((medium) => {
    const knopf = medium.querySelector('[data-video-knopf]'), name = medium.querySelector('[data-video-name]');
    if (!knopf) return;
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      medium.classList.toggle('laeuft', an && !reduziert);
      if (name) name.textContent = an ? 'Video anhalten (Platzhalter)' : 'Video abspielen (Platzhalter)';
    });
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
