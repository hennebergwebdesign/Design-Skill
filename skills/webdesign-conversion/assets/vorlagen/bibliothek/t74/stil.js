/* stil.js der Vorlage "Finanz Pastell": Balken wählen (Tooltip), Währung umschalten, Kreditkarten kippen beim Scrollen, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Balkendiagramm im Held: der gewählte Balken wird hervorgehoben und zeigt seinen Betrag (Maus, Fokus, Tipp)
  document.querySelectorAll('.diagramm--bedienbar').forEach((d) => {
    const balken = [...d.querySelectorAll('.sp')];
    const waehle = (b) => balken.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    balken.forEach((b) => {
      b.addEventListener('click', () => waehle(b));
      b.addEventListener('mouseenter', () => waehle(b));
      b.addEventListener('focus', () => waehle(b));
    });
  });

  // 2. Währung: genau ein aktiver Eintrag
  document.querySelectorAll('[data-waehrung]').forEach((g) => {
    const knoepfe = [...g.querySelectorAll('button')];
    knoepfe.forEach((k) => k.addEventListener('click', () => knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)))));
  });

  // 3. Kreditkarten: --kipp (0 bis 1) wächst, während die Karte durch den Bildschirm wandert, Kippung flacht ab
  const karten = reduziert ? [] : [...document.querySelectorAll('[data-kipp]')];
  if (karten.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      karten.forEach((k) => { const r = k.getBoundingClientRect(), p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.75 + r.height * 0.25))); k.style.setProperty('--kipp', p.toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
