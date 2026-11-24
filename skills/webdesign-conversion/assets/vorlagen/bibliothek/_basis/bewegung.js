/* bewegung.js: Einblenden, Zählen, Sticky-Fortschritt, Parallax, Menü. Reines JavaScript, ohne Bibliothek.
   Regeln: Endwert steht im HTML (data-zaehle ist nur der Weg dorthin), bei reduzierter Bewegung passiert nichts Animiertes. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Einblenden: data-zeig, Staffelung über data-staffel im Elternelement
  const zeig = [...document.querySelectorAll('[data-zeig]')];
  document.querySelectorAll('[data-staffel]').forEach((el) => [...el.querySelectorAll('[data-zeig]')].forEach((k, i) => k.style.setProperty('--i', i)));
  if (reduziert || !('IntersectionObserver' in window)) zeig.forEach((e) => e.classList.add('ist-da'));
  else {
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('ist-da'); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    zeig.forEach((e) => io.observe(e));
  }

  // 2. Zählen: <span data-zaehle>1200</span>, Endwert im Text, Start erst beim Sichtbarwerden
  if (!reduziert && 'IntersectionObserver' in window) {
    const z = new IntersectionObserver((eintraege) => eintraege.forEach((e) => {
      if (!e.isIntersecting) return; z.unobserve(e.target);
      const el = e.target, ende = parseFloat(el.dataset.zaehle || el.textContent.replace(/[^\d.,-]/g, '').replace(',', '.')), dez = (String(ende).split('.')[1] || '').length, t0 = performance.now(), dauer = 1400;
      const zeile = (t) => { const p = Math.min(1, (t - t0) / dauer), w = ende * (1 - Math.pow(1 - p, 3)); el.textContent = w.toLocaleString('de-DE', { minimumFractionDigits: dez, maximumFractionDigits: dez }); if (p < 1) requestAnimationFrame(zeile); else el.textContent = el.dataset.text || ende.toLocaleString('de-DE', { minimumFractionDigits: dez, maximumFractionDigits: dez }); };
      el.dataset.text = el.textContent; requestAnimationFrame(zeile);
    }), { threshold: 0.6 });
    document.querySelectorAll('[data-zaehle]').forEach((e) => z.observe(e));
  }

  // 3. Fortschritt im Sektionsraum: --fortschritt (0 bis 1) für Sticky-Abschnitte mit data-fortschritt
  const fort = [...document.querySelectorAll('[data-fortschritt]')];
  // 4. Parallax: data-parallax="0.15" verschiebt leicht gegen die Scrollrichtung
  const para = reduziert ? [] : [...document.querySelectorAll('[data-parallax]')];
  // 4b. Abdunkeln: data-abdunkeln setzt --dunkel (0 bis 1) je nach Scrollweg über die Höhe des Elements, für Bildabschnitte am Seitenanfang
  const abd = reduziert ? [] : [...document.querySelectorAll('[data-abdunkeln]')];
  let tick = false;
  const messen = () => {
    const h = innerHeight;
    fort.forEach((el) => { const r = el.getBoundingClientRect(), s = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - h))); el.style.setProperty('--fortschritt', s.toFixed(4)); });
    para.forEach((el) => { const r = el.getBoundingClientRect(), f = parseFloat(el.dataset.parallax) || 0.15, d = (r.top + r.height / 2 - h / 2) * -f; el.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`; });
    abd.forEach((el) => el.style.setProperty('--dunkel', Math.min(1, Math.max(0, scrollY / Math.max(1, el.offsetHeight * 0.8))).toFixed(3)));
    root.classList.toggle('gescrollt', scrollY > 24);
    tick = false;
  };
  if (fort.length || para.length || true) addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
  messen();

  // 5. Menü: Knopf [data-menue] schaltet [data-menue-ziel], Escape schließt, Fokus bleibt sichtbar
  const knopf = document.querySelector('[data-menue]'), ziel = document.querySelector('[data-menue-ziel]');
  if (knopf && ziel) {
    const setze = (offen) => { knopf.setAttribute('aria-expanded', String(offen)); ziel.dataset.offen = String(offen); document.body.style.overflow = offen ? 'hidden' : ''; };
    knopf.addEventListener('click', () => setze(knopf.getAttribute('aria-expanded') !== 'true'));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setze(false); });
    ziel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setze(false)));
  }

  // 6. Akkordeon: <details data-exklusiv> in Gruppe schließt die anderen
  document.querySelectorAll('[data-exklusiv]').forEach((g) => g.addEventListener('toggle', (e) => { if (e.target.open) g.querySelectorAll('details[open]').forEach((d) => { if (d !== e.target) d.open = false; }); }, true));

  // 7. Abschnittsanzeige im Menü: der Link des Abschnitts im Blickfeld bekommt aria-current="location".
  //    Gilt für Hauptmenü-Links auf #Anker, nicht für Knöpfe. Ohne JavaScript bleibt das Menü unverändert.
  const spyLinks = [...document.querySelectorAll('header nav a[href^="#"], nav[data-menue-ziel] a[href^="#"], nav[aria-label^="Haupt"] a[href^="#"]')]
    .filter((a) => !/knopf|btn|cta/.test(a.className) && a.getAttribute('href').length > 1 && document.querySelector(a.getAttribute('href')));
  if (spyLinks.length && 'IntersectionObserver' in window) {
    const ziele = new Map();
    spyLinks.forEach((a) => { const z = document.querySelector(a.getAttribute('href')); (ziele.get(z) || ziele.set(z, []).get(z)).push(a); });
    const sichtbar = new Set();
    const setzen = () => {
      const liste = [...ziele.keys()].filter((z) => sichtbar.has(z)).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
      const aktiv = liste[liste.length - 1];
      spyLinks.forEach((a) => { if (ziele.get(aktiv)?.includes(a)) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
    };
    const spy = new IntersectionObserver((eintraege) => { eintraege.forEach((e) => (e.isIntersecting ? sichtbar.add(e.target) : sichtbar.delete(e.target))); setzen(); }, { rootMargin: '-40% 0px -55% 0px' });
    ziele.forEach((_, z) => spy.observe(z));
  }

  // 8. Wortlicht: <h2 data-licht>Reiner Text</h2>. Wörter hellen beim Scrollen von leise auf voll auf.
  //    Der Text bleibt ein Textknoten je Wort, Endzustand und reduzierte Bewegung: alles voll sichtbar.
  if (!reduziert) {
    document.querySelectorAll('[data-licht]').forEach((satz) => {
      if (satz.children.length) return;
      const teile = satz.textContent.trim().split(/\s+/);
      satz.setAttribute('aria-label', satz.textContent.trim());
      satz.textContent = '';
      const woerter = teile.map((w, i) => { const s = document.createElement('span'); s.className = 'wort'; s.setAttribute('aria-hidden', 'true'); s.textContent = w; satz.appendChild(s); if (i < teile.length - 1) satz.appendChild(document.createTextNode(' ')); return s; });
      satz.classList.add('licht');
      let w8 = false;
      const lauf = () => { w8 = false; const r = satz.getBoundingClientRect(), h = innerHeight, p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height + h * 0.3))), n = Math.round(p * woerter.length); woerter.forEach((x, i) => x.classList.toggle('an', i < n)); };
      addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
      addEventListener('resize', lauf);
      lauf();
    });
  }

  // 9. Selbstlauf für Vorher-Nachher-Regler: <input type="range" data-selbstlauf> fährt beim Sichtbarwerden einmal
  //    von der Mitte nach links, nach rechts und zurück. Jede Eingabe des Besuchers bricht ihn ab.
  if (!reduziert && 'IntersectionObserver' in window) {
    const sl = new IntersectionObserver((eintraege) => eintraege.forEach((e) => {
      if (!e.isIntersecting) return; sl.unobserve(e.target);
      const r = e.target, mitte = Number(r.value) || 50, t0 = performance.now(), dauer = 2600; let stopp = false;
      const aus = () => { stopp = true; };
      ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => r.addEventListener(ev, aus, { once: true }));
      const lauf = (t) => { if (stopp) return; const p = Math.min(1, (t - t0) / dauer), w = mitte + Math.sin(p * Math.PI * 2) * 32 * (1 - p * 0.3); r.value = String(Math.round(w)); r.dispatchEvent(new Event('input', { bubbles: true })); if (p < 1) requestAnimationFrame(lauf); else { r.value = String(mitte); r.dispatchEvent(new Event('input', { bubbles: true })); } };
      requestAnimationFrame(lauf);
    }), { threshold: 0.6 });
    document.querySelectorAll('input[data-selbstlauf]').forEach((r) => sl.observe(r));
  }
})();
