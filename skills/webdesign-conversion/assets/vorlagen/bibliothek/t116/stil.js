/* stil.js der Vorlage "Produktfamilie im Feldversuch": Phasenmarke für die Lösungsbühne, Standortkarte, Beitragsreihe,
   Formular ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript steht alles untereinander und lesbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Lösungsbühne: Phase Frage oder Antwort, damit der unsichtbare Teil weder fokussierbar noch klickbar ist
  const loesung = document.querySelector('.loesung');
  if (loesung && !reduziert) {
    let wartet = false;
    const phase = () => {
      const r = loesung.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      loesung.dataset.phase = p > 0.4 ? 'antwort' : 'frage';
      wartet = false;
    };
    addEventListener('scroll', () => { if (!wartet) { wartet = true; requestAnimationFrame(phase); } }, { passive: true });
    phase();
  }

  // 2. Standortkarte: Eintrag und Punkt gehören zusammen (Überfahren, Fokus, Klick)
  document.querySelectorAll('[data-karte]').forEach((wurzel) => {
    const knoepfe = [...wurzel.querySelectorAll('button[data-ort]')], punkte = [...wurzel.querySelectorAll('g[data-ort]')];
    const setze = (ort) => {
      knoepfe.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.ort === ort)));
      punkte.forEach((p) => { if (p.dataset.ort === ort) p.setAttribute('data-aktiv', ''); else p.removeAttribute('data-aktiv'); });
    };
    knoepfe.forEach((k) => {
      k.setAttribute('aria-pressed', 'false');
      k.addEventListener('click', () => setze(k.dataset.ort));
      k.addEventListener('mouseenter', () => setze(k.dataset.ort));
      k.addEventListener('focus', () => setze(k.dataset.ort));
    });
    punkte.forEach((p) => p.addEventListener('click', () => setze(p.dataset.ort)));
    setze('nds');
  });

  // 3. Beitragsreihe: Knöpfe blättern um eine Kartenbreite
  document.querySelectorAll('[data-reihe]').forEach((wurzel) => {
    const liste = wurzel.querySelector('[data-reihe-liste]');
    const schritt = () => (liste.querySelector('li')?.getBoundingClientRect().width || 280) + 16;
    const blaettern = (r) => liste.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    wurzel.querySelector('[data-reihe-zurueck]')?.addEventListener('click', () => blaettern(-1));
    wurzel.querySelector('[data-reihe-weiter]')?.addEventListener('click', () => blaettern(1));
  });

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
