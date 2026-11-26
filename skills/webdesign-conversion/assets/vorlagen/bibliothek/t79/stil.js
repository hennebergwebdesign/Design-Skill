/* stil.js der Vorlage "Podcast hell und schwarz": Pegelanzeige anhalten, Mikrofon steigt in der Abonnierkarte, Wischspur mit Punkten,
   Parallaxe des Mikrofonbilds, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Abspielkarte: Attrappe ohne Ton. Der Knopf hält die Pegelbalken an oder startet sie (WCAG 2.2.2). Bei reduzierter Bewegung stehen sie.
  document.querySelectorAll('[data-player]').forEach((p) => {
    const knopf = p.querySelector('[data-player-knopf]');
    if (!knopf) return;
    const setze = (an) => { knopf.setAttribute('aria-pressed', String(an)); if (an) p.removeAttribute('data-steht'); else p.setAttribute('data-steht', ''); };
    if (reduziert) setze(false);
    knopf.addEventListener('click', () => setze(knopf.getAttribute('aria-pressed') !== 'true'));
  });

  // 2. Folgenkarten springen zur Abspielkarte und setzen den Titel dort
  document.querySelectorAll('.folge__link, .cover a').forEach((a) => a.addEventListener('click', () => {
    const t = document.querySelector('.player__titel');
    const titel = a.querySelector('.folge__titel, .cover__titel');
    if (t && titel) t.textContent = titel.textContent.trim();
  }));

  // 3. Abonnierkarte: --steig (0 bis 1) wächst beim Scrollen, das Mikrofon steigt auf
  const abo = reduziert ? [] : [...document.querySelectorAll('[data-abo]')];
  const para = reduziert ? [] : [...document.querySelectorAll('[data-parallax-ziel]')];
  if (abo.length || para.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      abo.forEach((s) => { const r = s.getBoundingClientRect(), p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.6 + r.height * 0.4))); s.style.setProperty('--steig', p.toFixed(3)); s.querySelectorAll('[data-steig]').forEach((m) => { m.style.setProperty('--steig', p.toFixed(3)); }); });
      para.forEach((el) => { const r = el.getBoundingClientRect(), d = (r.top + r.height / 2 - h / 2) * -0.06; el.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`; });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 4. Wischspur mit Punkten: Punkte erscheinen erst mit JavaScript, ohne sie bleibt die Spur wischbar
  document.querySelectorAll('[data-spur]').forEach((spur) => {
    const liste = spur.querySelector('[data-spur-liste]'), punkte = spur.querySelector('[data-spur-punkte]');
    if (!liste || !punkte) return;
    const karten = [...liste.children];
    punkte.hidden = false;
    const knoepfe = karten.map((k, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Stimme ${i + 1} von ${karten.length} zeigen`);
      b.addEventListener('click', () => liste.scrollTo({ left: k.offsetLeft - liste.offsetLeft, behavior: reduziert ? 'auto' : 'smooth' }));
      punkte.appendChild(b); return b;
    });
    const stand = () => {
      const mitte = liste.scrollLeft + liste.clientWidth / 2;
      let best = 0, abstand = Infinity;
      karten.forEach((k, i) => { const d = Math.abs(k.offsetLeft - liste.offsetLeft + k.offsetWidth / 2 - mitte); if (d < abstand) { abstand = d; best = i; } });
      knoepfe.forEach((b, i) => b.setAttribute('aria-current', String(i === best)));
    };
    liste.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
