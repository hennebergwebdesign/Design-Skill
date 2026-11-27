/* stil.js der Vorlage "Notizclip, Produktseite mit Bühnen": Pinnen von Held und Verben (nur ohne reduzierte Bewegung),
   Schrittwahl der Verbenbühne, Index der Bauteile, Reiter der Fragen, Formular ohne Versand. Ergänzt bewegung.js.
   Ohne JavaScript und bei reduzierter Bewegung steht alles ruhig untereinander. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rahmen = (el) => el.getBoundingClientRect();

  // 1. Pinnen: Klasse .pin schaltet die Bühnenhöhe frei
  if (!reduziert) document.querySelectorAll('.held, .verben').forEach((s) => s.classList.add('pin'));

  // 2. Verbenbühne: der Scrollweg wählt den Schritt, Chips springen an die Position des Schritts
  const verben = document.querySelector('[data-verben]');
  if (verben) {
    const stufen = [...verben.querySelectorAll('.verben__stufe')];
    const chips = [...verben.querySelectorAll('.verben__chip')];
    let aktuell = -1;
    const setze = (n) => {
      if (n === aktuell) return; aktuell = n;
      stufen.forEach((s, i) => s.classList.toggle('is-an', i === n));
      chips.forEach((c, i) => { c.classList.toggle('is-an', i === n); if (i === n) c.setAttribute('aria-current', 'step'); else c.removeAttribute('aria-current'); });
    };
    let w8 = false;
    const messen = () => {
      w8 = false;
      if (!verben.classList.contains('pin')) return;
      const r = rahmen(verben), weg = Math.max(1, r.height - innerHeight), p = Math.min(0.999, Math.max(0, -r.top / weg));
      setze(Math.floor(p * stufen.length));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
    chips.forEach((c, i) => c.addEventListener('click', (e) => {
      if (!verben.classList.contains('pin')) return;
      e.preventDefault();
      const r = rahmen(verben), weg = r.height - innerHeight;
      scrollTo({ top: scrollY + r.top + weg * ((i + 0.5) / stufen.length), behavior: 'smooth' });
    }));
  }

  // 3. Bauteile: die Tafel in der Bildschirmmitte markiert ihren Eintrag im Index
  const bauteile = document.querySelector('[data-bauteile]');
  if (bauteile && 'IntersectionObserver' in window) {
    const tafeln = [...bauteile.querySelectorAll('.bauteile__tafel')];
    const links = [...bauteile.querySelectorAll('.bauteile__index a')];
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => {
      if (!e.isIntersecting) return;
      const n = Number(e.target.dataset.teil);
      tafeln.forEach((t, i) => t.classList.toggle('is-an', i === n));
      links.forEach((l, i) => l.classList.toggle('is-an', i === n));
    }), { rootMargin: '-45% 0px -45% 0px' });
    tafeln.forEach((t) => io.observe(t));
  }

  // 4. Fragen: Reiter zeigen eine Gruppe, ohne JavaScript stehen alle Gruppen untereinander
  const faq = document.querySelector('[data-faq]');
  if (faq) {
    const knoepfe = [...faq.querySelectorAll('.faq__reiter button')];
    const gruppen = [...faq.querySelectorAll('.faq__gruppe')];
    const zeige = (name) => {
      knoepfe.forEach((k) => { const an = k.dataset.gruppe === name; k.classList.toggle('is-an', an); k.setAttribute('aria-pressed', String(an)); });
      gruppen.forEach((g) => { g.hidden = g.dataset.gruppe !== name; });
    };
    knoepfe.forEach((k) => k.addEventListener('click', () => zeige(k.dataset.gruppe)));
    zeige('geraet');
  }

  // 5. Index der Bauteile: Klick scrollt weich zur Tafel (Anker genügt, hier nur Fokus nachziehen entfällt)

  // 6. Formulare ohne Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
