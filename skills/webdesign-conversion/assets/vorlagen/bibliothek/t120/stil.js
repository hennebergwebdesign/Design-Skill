/* stil.js der Vorlage "Bodentest per Probe": Kartenband (aktive Karte scharf, Nachbarn unscharf), Zeitachse mit stehendem Bild,
   Bestellkarte ausblenden am Seitenende. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript steht alles untereinander lesbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Kartenband: nächste Karte zur Mitte der sichtbaren Spur ist aktiv, Pfeile schieben um eine Karte
  document.querySelectorAll('[data-band]').forEach((abschnitt) => {
    const spur = abschnitt.querySelector('[data-band-spur]');
    const karten = [...abschnitt.querySelectorAll('[data-band-karte]')];
    const zurueck = abschnitt.querySelector('[data-band-zurueck]');
    const weiter = abschnitt.querySelector('[data-band-weiter]');
    if (!spur || !karten.length) return;
    let aktiv = 0, w8 = false, sperre = 0;
    const setze = (n) => {
      aktiv = n;
      karten.forEach((k, i) => k.classList.toggle('is-aktiv', i === n));
      if (zurueck) zurueck.disabled = n === 0;
      if (weiter) weiter.disabled = n === karten.length - 1;
    };
    const messen = () => {
      w8 = false;
      if (Date.now() < sperre) return;
      const r = spur.getBoundingClientRect();
      const start = r.left + parseFloat(getComputedStyle(spur).scrollPaddingLeft || 0);
      let best = 0, d = Infinity;
      karten.forEach((k, i) => { const dist = Math.abs(k.getBoundingClientRect().left - start); if (dist < d) { d = dist; best = i; } });
      if (spur.scrollLeft + spur.clientWidth >= spur.scrollWidth - 4) best = karten.length - 1;
      if (best !== aktiv) setze(best);
    };
    const gehe = (n) => { const i = Math.max(0, Math.min(karten.length - 1, n)), ziel = karten[i]; sperre = Date.now() + 900; setze(i); spur.scrollTo({ left: ziel.offsetLeft - karten[0].offsetLeft, behavior: reduziert ? 'auto' : 'smooth' }); };
    spur.addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    if (zurueck) zurueck.addEventListener('click', () => gehe(aktiv - 1));
    if (weiter) weiter.addEventListener('click', () => gehe(aktiv + 1));
    spur.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); gehe(aktiv + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); gehe(aktiv - 1); } });
    setze(0);
  });

  // 2. Zeitachse: der Schritt in der Bildschirmmitte schaltet das stehende Bild um
  document.querySelectorAll('[data-ablauf]').forEach((ablauf) => {
    if (!('IntersectionObserver' in window)) return;
    const schritte = [...ablauf.querySelectorAll('.ablauf__schritt')];
    const tafeln = [...ablauf.querySelectorAll('.ablauf__tafel')];
    const setze = (n) => {
      schritte.forEach((s) => s.classList.toggle('is-an', s.dataset.schritt === n));
      tafeln.forEach((t) => t.classList.toggle('is-an', t.dataset.schritt === n));
    };
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) setze(e.target.dataset.schritt); }), { rootMargin: '-45% 0px -45% 0px' });
    schritte.forEach((s) => io.observe(s));
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));

  // 4. Bestellkarte: am Seitenende (Abschluss im Blick) ausblenden, damit sie die Fußkarte nicht überdeckt
  const karte = document.querySelector('.bestellkarte'), ende = document.querySelector('.ende');
  if (karte && ende && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { karte.hidden = e.isIntersecting && e.intersectionRatio > 0.6; }), { threshold: [0, 0.6, 1] });
    io.observe(ende);
  }
})();
