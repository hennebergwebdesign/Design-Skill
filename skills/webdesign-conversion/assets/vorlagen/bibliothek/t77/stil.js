/* stil.js der Vorlage "Weiterbildung Schwarz Limette": Porträtreihe driftet beim Scrollen, Fokus der Programmkarten wechselt,
   Wischspuren mit Pfeilknöpfen, Zertifikatskarte kippt leicht, Video Platzhalter mit Pause, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const breit = matchMedia('(min-width: 48rem)');

  // 1. Porträtreihe: ab Tablet und ohne reduzierte Bewegung wandert die Reihe beim Scrollen nach links (nur transform)
  const reihe = document.querySelector('[data-reihe]');
  if (reihe && !reduziert) {
    const spur = reihe.querySelector('.reihe__spur');
    let lauf = false;
    const messen = () => {
      lauf = false;
      if (!breit.matches) { reihe.classList.remove('driftet'); spur.style.removeProperty('--drift'); return; }
      reihe.classList.add('driftet');
      const spielraum = Math.max(0, spur.scrollWidth - reihe.clientWidth);
      const p = Math.min(1, Math.max(0, scrollY / Math.max(1, innerHeight * 0.9)));
      spur.style.setProperty('--drift', (-spielraum * p).toFixed(1) + 'px');
    };
    addEventListener('scroll', () => { if (!lauf) { lauf = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 2. Fokus der Programmkarten: beim Überfahren, Fokussieren oder Antippen wechselt die hervorgehobene Karte
  document.querySelectorAll('[data-fokus]').forEach((liste) => {
    const karten = [...liste.children];
    const setze = (k) => karten.forEach((x) => x.classList.toggle('aktiv', x === k));
    karten.forEach((k) => {
      k.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') setze(k); });
      k.addEventListener('focusin', () => setze(k));
      k.addEventListener('click', () => setze(k));
    });
  });

  // 3. Wischspur mit Pfeilknöpfen: schiebt um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-spur-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]'), steuerung = gruppe.querySelector('[data-spur-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-spur="zurueck"]'), weiter = steuerung.querySelector('[data-spur="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 16);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 4. Zertifikatskarte: --kipp (0 bis 1) folgt der Lage im Bildschirm, die Karte kippt leicht
  const kipp = reduziert ? [] : [...document.querySelectorAll('[data-kipp]')];
  if (kipp.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      kipp.forEach((el) => {
        const u = el.querySelector('.urkunde'); if (!u) return;
        const r = el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
        u.style.setProperty('--kipp', p.toFixed(3));
      });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 5. Video Platzhalter: Knopf wechselt zwischen Abspielen und Pause (WCAG 2.2.2), im Projekt steuert er das echte Video
  document.querySelectorAll('[data-video]').forEach((v) => {
    const knopf = v.querySelector('[data-video-knopf]'), text = v.querySelector('[data-video-text]');
    if (!knopf) return;
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      v.dataset.laeuft = String(an && !reduziert);
      if (text) text.textContent = an ? 'Pause (Platzhalter)' : 'Video abspielen (Platzhalter)';
    });
  });

  // 6. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
