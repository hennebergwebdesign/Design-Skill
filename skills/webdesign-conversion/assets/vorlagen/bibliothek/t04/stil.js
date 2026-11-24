/* stil.js der Vorlage t04: Heldenwort, Wortlicht, Stapelkarten mit Fortschrittsliste, Galerie, Stimmen.
   Reines JavaScript, ohne Bibliothek. Ohne JavaScript bleibt alles sichtbar und lesbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alle = (s, r = document) => [...r.querySelectorAll(s)];
  const klemme = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  alle('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // 1. Wortlicht: Wörter färben sich beim Scrollen vom leisen zum vollen Textton
  const wl = alle('[data-wortlicht]').map((el) => {
    if (reduziert) { el.classList.add('fertig'); return null; }
    const wort = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.textContent = '';
    const spans = wort.map((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.textContent = w + (i < wort.length - 1 ? ' ' : ''); el.appendChild(s); return s; });
    return { el, spans };
  }).filter(Boolean);

  // 2. Hero: Fortschritt für das Großwort
  const held = document.querySelector('[data-held]');

  // 3. Stapelgruppen
  const gruppen = alle('[data-stapelgruppe]').map((g) => ({ g, items: alle('[data-stapel]', g), index: alle('[data-index] li', g) }));
  const obenVon = (el) => parseFloat(getComputedStyle(el).top) || 0;

  const messen = () => {
    const h = innerHeight;
    if (held && !reduziert) held.style.setProperty('--hs', klemme(scrollY / (held.offsetHeight * 0.75)).toFixed(3));
    wl.forEach(({ el, spans }) => {
      const r = el.getBoundingClientRect();
      const p = klemme((h * 0.88 - r.top) / (h * 0.45 + r.height));
      const n = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('an', i < n));
    });
    if (!reduziert) gruppen.forEach(({ items, index }) => {
      let aktuell = 0;
      const abs = items.map((it, i) => {
        const nxt = items[i + 1];
        const r = it.getBoundingClientRect();
        if (r.top <= obenVon(it) + 4) aktuell = i;
        if (!nxt) return 0;
        const nr = nxt.getBoundingClientRect();
        return klemme(1 - (nr.top - obenVon(nxt)) / Math.max(1, r.height));
      });
      items.forEach((it, i) => it.style.setProperty('--ab', abs[i].toFixed(3)));
      index.forEach((li, i) => {
        li.classList.toggle('aktiv', i === aktuell);
        li.style.setProperty('--anteil', (i < aktuell ? 1 : i === aktuell ? abs[i] : 0).toFixed(3));
      });
    });
  };
  let tick = false;
  const planen = () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; messen(); }); } };
  addEventListener('scroll', planen, { passive: true });
  addEventListener('resize', planen);
  messen();

  // 4. Galerie: Mittenvergrößerung, nur solange sichtbar; Pause per Knopf
  const band = document.querySelector('[data-galerie]');
  if (band && !reduziert) {
    const bilder = alle('.gbild', band);
    let sichtbar = false;
    const lauf = () => {
      if (!sichtbar) return;
      const m = innerWidth / 2;
      bilder.forEach((b) => { const r = b.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - m); b.style.setProperty('--nah', klemme(1 - d / (r.width * 1.1)).toFixed(3)); });
      requestAnimationFrame(lauf);
    };
    new IntersectionObserver((e) => { const war = sichtbar; sichtbar = e[0].isIntersecting; if (sichtbar && !war) lauf(); }).observe(band);
    const sektion = band.closest('.galerie'), pause = document.querySelector('[data-galerie-pause]');
    if (pause) pause.addEventListener('click', () => {
      const an = sektion.classList.toggle('laeuft-nicht');
      pause.setAttribute('aria-pressed', String(an));
      pause.textContent = an ? 'Lauf fortsetzen' : 'Lauf anhalten';
    });
  }

  // 5. Stimmen: eine Folie sichtbar, Blättern per Knopf
  const st = document.querySelector('[data-stimmen]');
  if (st) {
    const folien = alle('.stimme', st);
    let i = 0;
    const zeige = (n) => { i = (n + folien.length) % folien.length; folien.forEach((f, k) => { f.hidden = k !== i; }); };
    zeige(0);
    st.querySelector('[data-weiter]').addEventListener('click', () => zeige(i + 1));
    st.querySelector('[data-zurueck]').addEventListener('click', () => zeige(i - 1));
  }
})();
