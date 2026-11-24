/* stil.js der Vorlage t02: Ablauf mit Sticky und Bildstapel, Pause für Bewegung im Kopfbereich, Fußzeile, Jahr.
   Ohne JavaScript bleibt der gesamte Inhalt lesbar. Keine Abhängigkeit. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 64rem)');

  // Jahr in der Fußzeile
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = '© ' + new Date().getFullYear(); });

  // Pause für die Bewegung im Kopfbereich (Bildfahrt und Bandlauf)
  const held = document.querySelector('.held'), pause = document.querySelector('[data-pause]');
  if (held && pause) pause.addEventListener('click', () => {
    const an = pause.getAttribute('aria-pressed') !== 'true';
    pause.setAttribute('aria-pressed', String(an));
    pause.setAttribute('aria-label', an ? 'Bewegung im Kopfbereich fortsetzen' : 'Bewegung im Kopfbereich anhalten');
    held.dataset.pause = String(an);
  });

  // Ablauf: aktiver Schritt, Bildstapel, Kennzahl
  const sek = document.querySelector('[data-loesung]');
  if (sek) {
    const schritte = [...sek.querySelectorAll('[data-schritt]')];
    const bilder = [...sek.querySelectorAll('[data-bildschicht]')];
    const zahlEl = sek.querySelector('[data-loesung-zahl]'), textEl = sek.querySelector('[data-loesung-text]');
    let aktiv = -1, aktuell = parseFloat(zahlEl.textContent) || 0, lauf = 0;

    const zaehle = (ziel) => {
      cancelAnimationFrame(lauf);
      if (reduziert) { zahlEl.textContent = String(ziel); aktuell = ziel; return; }
      const start = aktuell, t0 = performance.now(), dauer = 700;
      const f = (t) => { const p = Math.min(1, (t - t0) / dauer); aktuell = start + (ziel - start) * (1 - Math.pow(1 - p, 3)); zahlEl.textContent = String(Math.round(aktuell)); if (p < 1) lauf = requestAnimationFrame(f); };
      lauf = requestAnimationFrame(f);
    };

    const setze = (i) => {
      if (i === aktiv) return;
      aktiv = i;
      schritte.forEach((s, n) => {
        const offen = n === i;
        s.classList.toggle('is-offen', offen);
        s.querySelector('button').setAttribute('aria-expanded', String(offen));
      });
      bilder.forEach((b, n) => {
        b.dataset.zustand = n < i ? 'davor' : n === i ? 'aktiv' : 'danach';
        b.style.setProperty('--tiefe', Math.max(0, i - n));
      });
      const d = schritte[i].dataset;
      textEl.textContent = d.zahltext;
      zaehle(parseFloat(d.zahl));
    };

    const messen = () => {
      if (!desktop.matches) return;
      const r = sek.getBoundingClientRect(), strecke = Math.max(1, r.height - innerHeight);
      const p = Math.min(0.9999, Math.max(0, -r.top / strecke));
      setze(Math.floor(p * schritte.length));
    };
    let tick = false;
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; messen(); }); } }, { passive: true });
    desktop.addEventListener('change', () => { if (!desktop.matches) setze(Math.max(0, aktiv)); else messen(); });

    schritte.forEach((s, i) => s.querySelector('button').addEventListener('click', () => {
      if (desktop.matches) {
        const oben = sek.getBoundingClientRect().top + scrollY, strecke = sek.offsetHeight - innerHeight;
        scrollTo({ top: oben + strecke * (i + 0.5) / schritte.length, behavior: reduziert ? 'auto' : 'smooth' });
      } else setze(i);
    }));
    setze(0);
    if (desktop.matches) messen();
  }

  // Fußzeile: Schriftzug steigt beim Erscheinen auf
  const fuss = document.querySelector('.fuss');
  if (fuss && !reduziert) {
    let tick = false;
    const lies = () => { const r = fuss.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height * 0.9))); fuss.style.setProperty('--fuss-p', p.toFixed(3)); tick = false; };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(lies); } }, { passive: true });
    lies();
  }
})();
