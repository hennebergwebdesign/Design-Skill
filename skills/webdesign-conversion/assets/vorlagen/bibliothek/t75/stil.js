/* stil.js der Vorlage "Logistik rot, Bildwechsler": Bildwechsler mit Pfeilen und Pause, Reiter Angebot und Sendung, Formularkarte schiebt über die Kante,
   Foto im Abschnitt wächst beim Scrollen, Partnerband und Beispielfilm mit Pause, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Bildwechsler: Pfeile, Pause, Selbstlauf alle 6 Sekunden. Bei reduzierter Bewegung startet er angehalten.
  document.querySelectorAll('[data-wechsler]').forEach((w) => {
    const folien = [...w.querySelectorAll('[data-folie]')], nr = w.querySelector('[data-nr]');
    const zurueck = w.querySelector('[data-zurueck]'), weiter = w.querySelector('[data-weiter]');
    const pause = w.querySelector('[data-pause]'), pauseText = w.querySelector('[data-pause-text]');
    let i = 0, angehalten = reduziert, ueber = false, timer = null;
    const zeige = (n) => {
      i = (n + folien.length) % folien.length;
      folien.forEach((f, k) => { f.classList.toggle('ist-aktiv', k === i); f.setAttribute('aria-hidden', String(k !== i)); });
      if (nr) nr.textContent = String(i + 1);
    };
    const stopp = () => { clearInterval(timer); timer = null; };
    const start = () => { stopp(); if (!angehalten && !ueber) timer = setInterval(() => zeige(i + 1), 6000); };
    const setzePause = (an) => {
      angehalten = an;
      w.classList.toggle('angehalten', an);
      if (pause) { pause.setAttribute('aria-pressed', String(an)); if (pauseText) pauseText.textContent = an ? 'Bildwechsel starten' : 'Bildwechsel anhalten'; }
      start();
    };
    zurueck && zurueck.addEventListener('click', () => { zeige(i - 1); start(); });
    weiter && weiter.addEventListener('click', () => { zeige(i + 1); start(); });
    pause && pause.addEventListener('click', () => setzePause(!angehalten));
    w.addEventListener('mouseenter', () => { ueber = true; stopp(); });
    w.addEventListener('mouseleave', () => { ueber = false; start(); });
    w.addEventListener('focusin', () => { ueber = true; stopp(); });
    w.addEventListener('focusout', () => { ueber = false; start(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopp(); else start(); });
    zeige(0);
    setzePause(angehalten);
  });

  // 2. Reiter Angebot und Sendung: erscheinen erst mit JavaScript, ohne sie stehen beide Formulare untereinander
  document.querySelectorAll('[data-reiter-gruppe]').forEach((g) => {
    const leiste = g.querySelector('[role="tablist"]');
    if (!leiste) return;
    const reiter = [...leiste.querySelectorAll('[role="tab"]')];
    const tafel = (r) => document.getElementById(r.getAttribute('aria-controls'));
    const waehle = (r, fokus) => {
      reiter.forEach((x) => { const an = x === r; x.setAttribute('aria-selected', String(an)); x.tabIndex = an ? 0 : -1; tafel(x).hidden = !an; });
      if (fokus) r.focus();
    };
    leiste.hidden = false;
    reiter.forEach((r, k) => {
      r.addEventListener('click', () => waehle(r));
      r.addEventListener('keydown', (e) => {
        const ziel = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: reiter.length - 1 }[e.key];
        if (ziel === undefined) return;
        e.preventDefault(); waehle(reiter[(ziel + reiter.length) % reiter.length], true);
      });
    });
    waehle(reiter[0]);
  });

  // 3. Formularkarte schiebt beim Scrollen über die Kante (--einschub 0 bis 1), Foto im Abschnitt wächst (--wachs 0 bis 1)
  const einschub = reduziert ? [] : [...document.querySelectorAll('[data-einschub]')];
  const waechst = reduziert ? [] : [...document.querySelectorAll('[data-waechst]')];
  if (einschub.length || waechst.length) {
    let w8 = false;
    const klemme = (x) => Math.min(1, Math.max(0, x));
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      einschub.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--einschub', klemme((h - r.top) / (h * 0.55)).toFixed(3)); });
      waechst.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--wachs', klemme((h - r.top) / (h / 2 + r.height / 2)).toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 4. Partnerband anhalten
  document.querySelectorAll('[data-band-pause]').forEach((k) => {
    const band = document.querySelector('.partner__band'), t = k.querySelector('[data-band-text]');
    if (!band) return;
    k.addEventListener('click', () => {
      const an = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(an)); band.classList.toggle('pausiert', an);
      if (t) t.textContent = an ? 'Band starten' : 'Band anhalten';
    });
  });

  // 5. Beispielfilm: Platzhalter ohne Datei, der Knopf zeigt nur Wiedergabe und Pause am Poster
  document.querySelectorAll('[data-film-knopf]').forEach((k) => {
    const film = k.closest('.film'), t = k.querySelector('[data-film-text]');
    k.addEventListener('click', () => {
      const an = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(an)); film.classList.toggle('laeuft', an);
      if (t) t.textContent = an ? 'Beispielfilm anhalten' : 'Beispielfilm abspielen';
    });
  });

  // 6. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
