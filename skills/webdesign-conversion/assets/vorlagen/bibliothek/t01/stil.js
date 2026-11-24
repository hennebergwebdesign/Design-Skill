/* stil.js der Vorlage "Bildbühne": Zifferrolle und wortweises Einfärben. Ergänzt bewegung.js, ersetzt nichts.
   Regeln: Endwert steht im HTML, bei reduzierter Bewegung bleibt alles unverändert. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduziert) return;

  // 1. Zifferrolle: <span data-rolle>650</span>. Jede Ziffer läuft als Spalte 0 bis 9 auf ihren Endwert.
  const rollen = [...document.querySelectorAll('[data-rolle]')];
  rollen.forEach((el) => {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    el.classList.add('rolle');
    let n = 0;
    [...text].forEach((z) => {
      const stelle = document.createElement('span');
      stelle.setAttribute('aria-hidden', 'true');
      if (/\d/.test(z)) {
        stelle.className = 'rolle__stelle';
        const spalte = document.createElement('span');
        spalte.className = 'rolle__spalte';
        spalte.style.setProperty('--ziel', z);
        spalte.style.setProperty('--n', n++);
        for (let i = 0; i < 10; i++) { const s = document.createElement('span'); s.textContent = i; spalte.appendChild(s); }
        stelle.appendChild(spalte);
      } else { stelle.className = 'rolle__zeichen'; stelle.textContent = z; }
      el.appendChild(stelle);
    });
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('laeuft'); io.unobserve(e.target); } }), { threshold: 0.5 });
    rollen.forEach((el) => io.observe(el));
  } else rollen.forEach((el) => el.classList.add('laeuft'));

  // 2. Leitsatz: Wörter färben sich beim Scrollen von blass nach Text, wie ein Lesefortschritt
  const satz = document.querySelector('[data-wortfarbe]');
  if (satz) {
    const teile = satz.textContent.trim().split(/\s+/);
    satz.textContent = '';
    const woerter = teile.map((w, i) => {
      const s = document.createElement('span');
      s.className = 'wort';
      s.textContent = w;
      satz.appendChild(s);
      if (i < teile.length - 1) satz.appendChild(document.createTextNode(' '));
      return s;
    });
    satz.classList.add('wortfarbe');
    let tick = false;
    const messen = () => {
      tick = false;
      const r = satz.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height + h * 0.3)));
      const n = Math.round(p * woerter.length);
      woerter.forEach((w, i) => w.classList.toggle('an', i < n));
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 3. Tiefe: Bild innerhalb der Tafel wandert langsam gegen die Scrollrichtung, begrenzt auf den Überstand
  const tiefen = [...document.querySelectorAll('[data-tiefe]')];
  if (tiefen.length) {
    let t = false;
    const lauf = () => {
      t = false;
      const h = innerHeight;
      tiefen.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > h + 100) return;
        const f = parseFloat(el.dataset.tiefe) || 0.06, max = r.height * 0.06 - 1;
        const d = Math.max(-max, Math.min(max, (r.top + r.height / 2 - h / 2) * -f));
        el.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`;
      });
    };
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }
})();
