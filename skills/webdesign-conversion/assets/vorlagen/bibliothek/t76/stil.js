/* stil.js der Vorlage "Ladeinfrastruktur kühl": Ebenenwechsel der Säule, Einlauf (--einlauf), Schrittliste, Wortband mit Pause, Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x) => Math.min(1, Math.max(0, x));

  // 1. Held: ab der Hälfte des Wegs steht die Säule vor der Großschrift (Ebenenwechsel über Klasse), davor dahinter
  const held = document.querySelector('.held');
  // 3. Schrittliste: Schritte erscheinen nacheinander, nur wo die Bühne pinnt
  const ablauf = document.querySelector('.ablauf');
  const schritte = ablauf ? [...ablauf.querySelectorAll('.schritt')] : [];
  const pinnt = matchMedia('(min-width: 1000px) and (min-height: 700px)');
  const heldPinnt = matchMedia('(min-width: 768px)');

  // 2. Einlauf: --einlauf (0 bis 1), sobald das Element von unten in den Bildschirm kommt, bis es etwa in der Mitte steht
  const einlauf = reduziert ? [] : [...document.querySelectorAll('[data-einlauf]')];

  let w8 = false;
  const messen = () => {
    w8 = false;
    const h = innerHeight;
    if (held && !reduziert) {
      const r = held.getBoundingClientRect(), p = klemme(-r.top / Math.max(1, r.height - h));
      held.classList.toggle('vor', !heldPinnt.matches || p > 0.45);
    }
    einlauf.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--einlauf', klemme((h - r.top) / (h * 0.75 + r.height * 0.25)).toFixed(3)); });
    if (ablauf && !reduziert) {
      const an = pinnt.matches;
      ablauf.classList.toggle('stufen', an);
      if (an) {
        const r = ablauf.getBoundingClientRect(), p = klemme(-r.top / Math.max(1, r.height - h));
        const n = Math.min(schritte.length, Math.floor(p * (schritte.length + 1.5)) + 1);
        schritte.forEach((s, i) => s.classList.toggle('an', i < n));
      }
    }
  };
  if (!reduziert) {
    if (held) held.classList.remove('vor');
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  } else if (held) held.classList.add('vor');

  // 4. Wortband mit Pause (WCAG 2.2.2): Knopf erscheint erst mit JavaScript
  document.querySelectorAll('[data-band-pause]').forEach((k) => {
    const band = k.closest('.wortband');
    if (!band || reduziert) return;
    k.hidden = false;
    const text = k.querySelector('span'), icon = k.querySelector('use');
    k.addEventListener('click', () => {
      const an = band.classList.toggle('pause');
      k.setAttribute('aria-pressed', String(an));
      text.textContent = an ? 'Band starten' : 'Band anhalten';
      icon.setAttribute('href', an ? '#i-play' : '#i-pause');
    });
  });

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
