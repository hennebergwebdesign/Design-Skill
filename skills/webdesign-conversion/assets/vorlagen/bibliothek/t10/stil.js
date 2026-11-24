// stil.js der Vorlage "Stapelseite Beratung": Jahr, Band anhalten, Abdunkeln der überdeckten Leistungsfelder. Ohne Bibliothek.
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Band: Knopf hält die Bewegung an (WCAG 2.2.2), das Band pausiert zusätzlich bei Hover und Fokus
  const band = document.querySelector('.vorgehen .band');
  const halt = document.querySelector('[data-band-halt]');
  if (band && halt) {
    halt.addEventListener('click', () => {
      const an = halt.getAttribute('aria-pressed') !== 'true';
      halt.setAttribute('aria-pressed', String(an));
      halt.textContent = an ? 'Bewegung starten' : 'Bewegung anhalten';
      band.classList.toggle('band--halt', an);
    });
    band.addEventListener('focusin', () => band.classList.add('band--halt'));
    band.addEventListener('focusout', () => { if (halt.getAttribute('aria-pressed') !== 'true') band.classList.remove('band--halt'); });
  }

  // Leistungsfelder: je weiter das nächste Feld das aktuelle überdeckt, desto stärker wird es abgedunkelt (--abdeckung 0 bis 1)
  const felder = [...document.querySelectorAll('.dienst')];
  const stapel = matchMedia('(min-width: 56rem) and (min-height: 46rem)');
  let tick = false;
  const messen = () => {
    tick = false;
    felder.forEach((f, i) => {
      const n = felder[i + 1];
      if (!n || !stapel.matches) { f.style.removeProperty('--abdeckung'); return; }
      const t = n.getBoundingClientRect().top, h = innerHeight;
      f.style.setProperty('--abdeckung', Math.min(1, Math.max(0, 1 - t / h)).toFixed(3));
    });
  };
  if (!reduziert && felder.length) {
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }
})();
