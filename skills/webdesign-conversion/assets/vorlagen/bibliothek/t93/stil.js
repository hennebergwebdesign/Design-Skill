/* stil.js der Vorlage "Kfz Werkstatt Blau und Schwarz": Scrollfortschritt für Held und Auto (--schub, --lauf), Wischspuren mit Pfeilen und Punkten,
   Pause für das Partnerband, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Held: --schub (0 bis 1) auf dem Held und den Kacheln, wächst mit dem Scrollweg über die Heldhöhe
  const held = document.querySelector('[data-schub]'), kacheln = document.querySelector('[data-schub-ziel]');
  // 2. Auto: --lauf (0 bis 1), wächst, während der Abschnitt durch den Bildschirm wandert
  const lauf = [...document.querySelectorAll('[data-lauf]')];
  if (!reduziert && (held || lauf.length)) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      if (held) {
        const p = Math.min(1, Math.max(0, scrollY / Math.max(1, held.offsetHeight))).toFixed(3);
        held.style.setProperty('--schub', p);
        if (kacheln) kacheln.style.setProperty('--schub', p);
      }
      const h = innerHeight;
      lauf.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.55 + r.height * 0.5)));
        el.style.setProperty('--lauf', p.toFixed(3));
      });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 3. Wischspuren: Pfeilknöpfe schieben um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen; optional Punkte
  document.querySelectorAll('[data-spur-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]'), steuerung = gruppe.querySelector('[data-spur-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-spur-knopf="zurueck"]'), weiter = steuerung.querySelector('[data-spur-knopf="weiter"]');
    const karten = [...spur.children];
    const punkte = gruppe.querySelector('[data-spur-punkte]');
    const knoepfe = [];
    if (punkte) {
      karten.forEach((k, i) => {
        const li = document.createElement('li'), b = document.createElement('button');
        b.type = 'button'; b.setAttribute('aria-label', `Eintrag ${i + 1} von ${karten.length}`);
        b.addEventListener('click', () => spur.scrollTo({ left: k.offsetLeft - spur.offsetLeft, behavior: reduziert ? 'auto' : 'smooth' }));
        li.appendChild(b); punkte.appendChild(li); knoepfe.push(b);
      });
    }
    const stand = () => {
      const ueberstand = spur.scrollWidth - spur.clientWidth > 4;
      steuerung.hidden = !ueberstand;
      if (punkte) punkte.hidden = !ueberstand;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
      if (knoepfe.length) {
        let nah = 0, d = Infinity;
        karten.forEach((k, i) => { const x = Math.abs(k.offsetLeft - spur.offsetLeft - spur.scrollLeft); if (x < d) { d = x; nah = i; } });
        knoepfe.forEach((b, i) => b.setAttribute('aria-current', String(i === nah)));
      }
    };
    const schritt = (r) => {
      const k = karten[0], s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 0);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 4. Partnerband: Knopf hält das Laufband an und setzt es fort (WCAG 2.2.2)
  const band = document.querySelector('[data-band]'), pause = document.querySelector('[data-band-pause]');
  if (band && pause) {
    pause.addEventListener('click', () => {
      const an = pause.getAttribute('aria-pressed') !== 'true';
      pause.setAttribute('aria-pressed', String(an));
      band.dataset.pausiert = String(an);
      pause.querySelector('span').textContent = an ? 'Laufband fortsetzen' : 'Laufband anhalten';
      pause.querySelector('use').setAttribute('href', an ? '#i-spiel' : '#i-pause');
    });
  }

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
