/* stil.js der Vorlage "Quellwasser Dosen Bühne": Szenenwechsel der pinnenden Bühne, Ortswahl der Karte, Bildband mit Pfeilen,
   Formulare ohne Versand. Ergänzt bewegung.js (Fortschritt, Einblenden, Zählen, Menü), ersetzt nichts. Ohne JavaScript stehen alle Inhalte lesbar untereinander. */
(() => {
  // 1. Szenen: die Station in Bildschirmmitte schaltet die Szene der Bühne um
  document.querySelectorAll('.szenen').forEach((raum) => {
    const buehne = raum.querySelector('.szenen__buehne');
    const schritte = [...raum.querySelectorAll('.szenen__schritt')];
    const szenen = [...raum.querySelectorAll('.szenen__szene')];
    const nr = raum.querySelector('[data-szenen-nr]');
    if (!buehne || !schritte.length || !('IntersectionObserver' in window)) return;
    const setze = (name, index) => {
      szenen.forEach((s) => s.classList.toggle('is-an', s.dataset.szene === name));
      schritte.forEach((s) => s.classList.toggle('is-an', s.dataset.szene === name));
      if (nr) nr.textContent = String(index + 1).padStart(2, '0');
    };
    setze(schritte[0].dataset.szene, 0);
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) setze(e.target.dataset.szene, schritte.indexOf(e.target)); }), { rootMargin: '-45% 0px -45% 0px' });
    schritte.forEach((s) => io.observe(s));
  });

  // 2. Lage: Knöpfe wählen Ort, Pin und Text. Ohne Skript stehen alle drei Texte da.
  document.querySelectorAll('.lage').forEach((lage) => {
    const knoepfe = [...lage.querySelectorAll('.lage__knopf')];
    const texte = [...lage.querySelectorAll('.lage__texte p')];
    const pins = [...lage.querySelectorAll('.lage__pin')];
    const setze = (n) => {
      knoepfe.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.ort === n)));
      texte.forEach((t) => { t.hidden = t.dataset.ort !== n; });
      pins.forEach((p) => p.classList.toggle('is-an', p.dataset.ort === n));
    };
    knoepfe.forEach((k) => k.addEventListener('click', () => setze(k.dataset.ort)));
    setze('1');
  });

  // 3. Bildband: Pfeile scrollen um eine Kachel, Enden machen den Pfeil inaktiv
  document.querySelectorAll(".bildband").forEach((band) => {
    const spur = band.querySelector('.bildband__spur');
    const pfeile = [...band.querySelectorAll('[data-bildband]')];
    if (!spur || !pfeile.length) return;
    const schritt = () => { const k = spur.querySelector('.bildband__kachel'); return k ? k.getBoundingClientRect().width + 16 : 300; };
    const stand = () => {
      const max = spur.scrollWidth - spur.clientWidth - 2;
      pfeile.forEach((p) => p.setAttribute('aria-disabled', String(Number(p.dataset.bildband) < 0 ? spur.scrollLeft <= 2 : spur.scrollLeft >= max)));
    };
    pfeile.forEach((p) => p.addEventListener('click', () => {
      if (p.getAttribute('aria-disabled') === 'true') return;
      spur.scrollBy({ left: Number(p.dataset.bildband) * schritt(), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }));
    spur.addEventListener('scroll', () => requestAnimationFrame(stand), { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
