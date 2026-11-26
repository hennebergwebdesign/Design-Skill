/* stil.js der Vorlage "Finanz App, Tiefgrün und Limette": Reiter, Preisumschalter, Wischspuren mit Pfeilknöpfen, seitliches Driften der Kartenreihe,
   Wortmarke im Fuß fährt ein, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar: erster Reiter, Preise monatlich, Wortmarke an ihrem Platz. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reiter: Leiste erscheint erst mit JavaScript, Pfeiltasten wechseln, Home und Ende springen
  document.querySelectorAll('[data-reiter-leiste]').forEach((leiste) => {
    const gruppe = leiste.closest('[data-reiter-gruppe]');
    if (!gruppe) return;
    const knoepfe = [...leiste.querySelectorAll('[role="tab"]')];
    const felder = [...gruppe.querySelectorAll('[data-reiter-feld]')];
    if (!knoepfe.length || knoepfe.length !== felder.length) return;
    leiste.hidden = false;
    const waehle = (i, fokus) => {
      knoepfe.forEach((k, j) => { const an = i === j; k.setAttribute('aria-selected', String(an)); k.tabIndex = an ? 0 : -1; felder[j].hidden = !an; });
      if (fokus) knoepfe[i].focus();
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => waehle(i, false));
      k.addEventListener('keydown', (e) => {
        const n = knoepfe.length, tasten = { ArrowRight: (i + 1) % n, ArrowLeft: (i + n - 1) % n, Home: 0, End: n - 1 };
        if (e.key in tasten) { e.preventDefault(); waehle(tasten[e.key], true); }
      });
    });
  });

  // 2. Preisumschalter: beide Beträge stehen im HTML, die Leiste erscheint erst mit JavaScript
  document.querySelectorAll('[data-preis-schalter]').forEach((leiste) => {
    const ziel = document.querySelector('[data-preise]');
    if (!ziel) return;
    leiste.hidden = false;
    const knoepfe = [...leiste.querySelectorAll('[data-takt]')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      ziel.dataset.takt = k.dataset.takt;
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
    }));
  });

  // 3. Wischspuren (Kartenreihe, Stimmen): Pfeilknöpfe schieben um einen Eintrag, am Rand gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]'), steuerung = gruppe.querySelector('[data-reiter-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-reiter="zurueck"]'), weiter = steuerung.querySelector('[data-reiter="weiter"]');
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

  // 4. Kartenreihe driftet: --drift (0 bis 1) wächst, während der Abschnitt durch den Bildschirm läuft
  const drift = reduziert ? [] : [...document.querySelectorAll('[data-drift]')];
  if (drift.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      drift.forEach((d) => { const r = d.getBoundingClientRect(), p = Math.min(1, Math.max(0, (h - r.top) / (h + r.height))); d.style.setProperty('--drift', p.toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 5. Wortmarke im Fuß: fährt von unten ein, sobald der Fuß ins Bild kommt. Die Klasse "vor" setzt erst dieses Skript.
  const huelle = document.querySelector('.fuss__huelle');
  if (huelle && !reduziert && 'IntersectionObserver' in window) {
    huelle.classList.add('marke-vor');
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { huelle.classList.remove('marke-vor'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(huelle);
  }

  // 6. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
