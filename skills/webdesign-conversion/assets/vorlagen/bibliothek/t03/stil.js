/* stil.js der Vorlage t03: Wort für Wort Aufhellung, Tabs, Vorher und Nachher, Stimmen Slider.
   Ohne JavaScript bleibt alles sichtbar und bedienbar. Kein Framework, keine Abhängigkeit. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Aussage: jedes Wort wird nach Scrollstand heller (Text bleibt unverändert im DOM)
  const aussage = document.querySelector('[data-wortlicht]');
  if (aussage && !reduziert) {
    const text = aussage.textContent;
    aussage.textContent = '';
    const woerter = text.split(/\s+/).filter(Boolean).map((w, i, a) => {
      const s = document.createElement('span'); s.className = 'w'; s.textContent = w + (i < a.length - 1 ? ' ' : ''); aussage.appendChild(s); return s;
    });
    let wartet = false;
    const messen = () => {
      wartet = false;
      const r = aussage.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (h * 0.5 + r.height * 0.4)));
      woerter.forEach((s, i) => { const t = Math.min(1, Math.max(0, p * (woerter.length + 4) - i)); s.style.setProperty('--l', t.toFixed(2)); });
    };
    addEventListener('scroll', () => { if (!wartet) { wartet = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 2. Tabs der Leistungen (nur ab breitem Schirm, mobil bleiben alle Karten untereinander)
  const tabs = document.querySelector('[data-tabs]');
  if (tabs) {
    const liste = tabs.querySelector('.tabs__liste'), knoepfe = [...liste.querySelectorAll('[role="tab"]')], felder = [...tabs.querySelectorAll('[data-tab]')];
    const breit = matchMedia('(min-width: 64em)');
    felder.forEach((f, i) => { f.id = 'paket-' + i; knoepfe[i].id = 'reiter-' + i; knoepfe[i].setAttribute('aria-controls', f.id); f.setAttribute('aria-labelledby', knoepfe[i].id); f.querySelectorAll('.liste-plus li').forEach((li, k) => li.style.setProperty('--k', k)); });
    const waehle = (n, fokus) => {
      knoepfe.forEach((k, i) => { k.setAttribute('aria-selected', String(i === n)); k.tabIndex = i === n ? 0 : -1; });
      felder.forEach((f, i) => { f.hidden = i !== n; f.classList.remove('ist-da-tab'); if (i === n) { void f.offsetWidth; f.classList.add('ist-da-tab'); } });
      if (fokus) knoepfe[n].focus();
    };
    const an = () => {
      liste.hidden = !breit.matches; tabs.classList.toggle('tabs--an', breit.matches);
      if (breit.matches) waehle(Math.max(0, knoepfe.findIndex((k) => k.getAttribute('aria-selected') === 'true')));
      else felder.forEach((f) => { f.hidden = false; f.classList.remove('ist-da-tab'); });
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => waehle(i));
      k.addEventListener('keydown', (e) => {
        const z = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (z) { e.preventDefault(); waehle((i + z + knoepfe.length) % knoepfe.length, true); }
        if (e.key === 'Home') { e.preventDefault(); waehle(0, true); }
        if (e.key === 'End') { e.preventDefault(); waehle(knoepfe.length - 1, true); }
      });
    });
    breit.addEventListener('change', an); an();
  }

  // 3. Vorher und Nachher: Regler setzt --pos, Pfeile wechseln das Beispiel
  document.querySelectorAll('.folie__regler').forEach((r) => {
    const bild = r.closest('.folie__bild'), setze = () => bild.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', setze); setze();
  });
  const bu = document.querySelector('[data-vergleich]');
  if (bu) {
    const folien = [...bu.querySelectorAll('[data-folie]')], zu = bu.querySelector('[data-zurueck]'), vor = bu.querySelector('[data-vor]');
    let n = 0;
    const zeige = (k) => { n = (k + folien.length) % folien.length; folien.forEach((f, i) => { f.hidden = i !== n; }); };
    zu.hidden = vor.hidden = false;
    zu.addEventListener('click', () => zeige(n - 1)); vor.addEventListener('click', () => zeige(n + 1)); zeige(0);
  }

  // 4. Stimmen: Pfeile scrollen um eine Karte
  const spur = document.querySelector('.stimmen__spur'), pfeile = document.querySelector('.stimmen__pfeile');
  if (spur && pfeile) {
    pfeile.hidden = false;
    const schritt = () => (spur.querySelector('.stimme').getBoundingClientRect().width + 12);
    pfeile.querySelector('[data-zurueck]').addEventListener('click', () => spur.scrollBy({ left: -schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
    pfeile.querySelector('[data-vor]').addEventListener('click', () => spur.scrollBy({ left: schritt(), behavior: reduziert ? 'auto' : 'smooth' }));
  }

  const jahr = document.getElementById('jahr'); if (jahr) jahr.textContent = new Date().getFullYear();
})();
