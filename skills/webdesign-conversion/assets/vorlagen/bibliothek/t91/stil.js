/* stil.js der Vorlage "Innenarchitektur dunkel und gold": Umschalter für Foto und Zeile, Wischspuren mit Pfeilen, Panoramaband,
   Rundblick zum Ziehen, Isometrie baut sich auf, Pause für die Bewegung im Vollbild, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Umschalter: Zeile (Knopf) und Tafel (Foto) gehören nach Reihenfolge zusammen. Ohne JavaScript steht Zeile 1.
  document.querySelectorAll('[data-umschalter]').forEach((gruppe) => {
    const zeilen = [...gruppe.querySelectorAll('[data-zeile]')], tafeln = [...gruppe.querySelectorAll('[data-tafel]')];
    const setze = (i) => {
      zeilen.forEach((z, n) => z.setAttribute('aria-pressed', String(n === i)));
      tafeln.forEach((t, n) => t.classList.toggle('aktiv', n === i));
    };
    zeilen.forEach((z, i) => {
      z.addEventListener('click', () => setze(i));
      z.addEventListener('focus', () => setze(i));
      z.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') setze(i); });
    });
  });

  // 2. Wischspur mit Pfeilknöpfen: schiebt um einen Eintrag, am Anfang und Ende gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-spur-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]');
    const steuerung = gruppe.querySelector('[data-spur-steuerung]') || gruppe.closest('section').querySelector('[data-spur-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-pfeil="zurueck"]'), weiter = steuerung.querySelector('[data-pfeil="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 0);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 3. Panoramaband: --p (0 bis 1) schiebt das breite Foto seitlich, solange das Band im Bild steht
  const pano = reduziert ? [] : [...document.querySelectorAll('[data-pano]')];
  if (pano.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      pano.forEach((el) => { const r = el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (h - r.top) / (h + r.height))); el.style.setProperty('--p', p.toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 4. Rundblick: Start in der Mitte, mit der Maus ziehen (Touch und Tastatur scrollen von selbst)
  document.querySelectorAll('[data-rund]').forEach((fenster) => {
    const mitte = () => { fenster.scrollLeft = (fenster.scrollWidth - fenster.clientWidth) / 2; };
    const bild = fenster.querySelector('img');
    if (bild && !bild.complete) bild.addEventListener('load', mitte, { once: true }); else mitte();
    let x0 = 0, s0 = 0, aktiv = false;
    fenster.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; aktiv = true; x0 = e.clientX; s0 = fenster.scrollLeft; fenster.classList.add('zieht'); fenster.setPointerCapture(e.pointerId); });
    fenster.addEventListener('pointermove', (e) => { if (aktiv) fenster.scrollLeft = s0 - (e.clientX - x0); });
    const ende = () => { aktiv = false; fenster.classList.remove('zieht'); };
    fenster.addEventListener('pointerup', ende);
    fenster.addEventListener('pointercancel', ende);
  });

  // 5. Isometrie: Schichten bauen sich beim Sichtbarwerden nacheinander auf. Der Anfangszustand (unsichtbar) wird nur gesetzt, wenn er auch aufgelöst wird.
  const iso = [...document.querySelectorAll('[data-iso]')];
  if (iso.length && !reduziert && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('gebaut'); io.unobserve(e.target); } }), { threshold: 0.3 });
    iso.forEach((el) => { el.setAttribute('data-bereit', ''); io.observe(el); });
  }

  // 6. Vollbild: Pause für die ruhige Bewegung im Bild (WCAG 2.2.2), der Knopf erscheint nur, wenn es etwas zu pausieren gibt
  document.querySelectorAll('[data-pause]').forEach((knopf) => {
    if (reduziert) return;
    const abschnitt = knopf.closest('.video'), text = knopf.querySelector('[data-pause-text]');
    knopf.hidden = false;
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      abschnitt.classList.toggle('pause', an);
      if (text) text.textContent = an ? 'Bewegung im Bild fortsetzen' : 'Bewegung im Bild pausieren';
    });
  });

  // 7. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
