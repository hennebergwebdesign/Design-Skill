/* stil.js der Vorlage Kontor: Fallstapel, Stimmen blättern, Zoom der Aufrufkarte, Wortmarke im Fuß, Beispielformulare, Jahr.
   Ohne JavaScript bleibt alles sichtbar. Bei reduzierter Bewegung läuft keine Scroll-Animation. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x) => Math.min(1, Math.max(0, x));

  // Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Beispielformulare senden nichts
  document.querySelectorAll('[data-beispielformular]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = f.querySelector('[data-status]');
      if (status) status.textContent = f.checkValidity() ? 'Danke, das ist ein Beispielformular: Es wurde nichts gesendet.' : 'Bitte füllen Sie die Pflichtfelder aus.';
    });
  });

  // Stimmen blättern: Pfeile scrollen eine Seite weiter, am Rand sind sie gesperrt
  document.querySelectorAll('[data-karussell]').forEach((bahn) => {
    const liste = bahn.querySelector('.stimmen__liste'), tasten = bahn.querySelector('.stimmen__tasten');
    const zurueck = bahn.querySelector('[data-zurueck]'), weiter = bahn.querySelector('[data-weiter]');
    if (!liste || !tasten) return;
    tasten.hidden = false;
    const zustand = () => {
      zurueck.disabled = liste.scrollLeft < 4;
      weiter.disabled = liste.scrollLeft + liste.clientWidth > liste.scrollWidth - 4;
    };
    const gehe = (r) => liste.scrollBy({ left: r * liste.clientWidth, behavior: reduziert ? 'auto' : 'smooth' });
    zurueck.addEventListener('click', () => gehe(-1));
    weiter.addEventListener('click', () => gehe(1));
    liste.addEventListener('scroll', zustand, { passive: true });
    liste.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); gehe(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); gehe(-1); }
    });
    addEventListener('resize', zustand);
    zustand();
  });

  if (reduziert) return;

  // Fallstapel: je Rahmen --abd (0 bis 1), wie weit der nächste Rahmen ihn schon überdeckt. Nur wenn die Rahmen kleben (ab 64 em).
  const stapel = [...document.querySelectorAll('[data-stapel]')].map((s) => [...s.querySelectorAll('.fall')]);
  const breit = matchMedia('(min-width: 64em)');
  // Zoom der Aufrufkarte und Wortmarke im Fuß: --z (0 bis 1)
  const zoom = [...document.querySelectorAll('[data-zoom]')];
  const wort = [...document.querySelectorAll('[data-enthuellen] .fuss__wort')];

  let tick = false;
  const messen = () => {
    tick = false;
    const h = innerHeight;
    stapel.forEach((faelle) => faelle.forEach((fall, i) => {
      const rahmen = fall.querySelector('.fall__rahmen');
      const naechster = faelle[i + 1];
      if (!naechster || !breit.matches) { rahmen.style.setProperty('--abd', '0'); return; }
      const kleb = parseFloat(getComputedStyle(fall).top) || 0;
      const abstand = naechster.getBoundingClientRect().top - kleb;
      rahmen.style.setProperty('--abd', klemme(1 - abstand / Math.max(1, fall.offsetHeight)).toFixed(3));
    }));
    zoom.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--z', klemme((h - r.top) / (h * 0.9)).toFixed(3)); });
    wort.forEach((el) => { const r = el.parentElement.getBoundingClientRect(); el.style.setProperty('--z', klemme((h - r.top) / Math.max(1, r.height)).toFixed(3)); });
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
  addEventListener('resize', messen);
  messen();
})();
