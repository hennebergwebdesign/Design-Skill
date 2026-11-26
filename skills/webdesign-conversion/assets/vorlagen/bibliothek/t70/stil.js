/* stil.js der Vorlage "Videotool Blau": Untertitel Wort für Wort, Avatarband mit Pause, Untertitelstile wechseln, Ablauflinie,
   Stimmen wählen, Preisumschalter, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung steht alles fertig: Untertitel mit einem hervorgehobenen Wort, Avatare als ruhige Reihe,
   Preise monatlich, alle Zitate untereinander, Ablauflinie ganz gefüllt. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wurzel = document.documentElement;
  const imBild = (el, fn) => {
    // ruft fn nur auf, solange el sichtbar ist und der Besucher die Bewegung nicht angehalten hat
    let sichtbar = true;
    if ('IntersectionObserver' in window) new IntersectionObserver((e) => { sichtbar = e[e.length - 1].isIntersecting; }, { threshold: 0.2 }).observe(el);
    return () => { if (sichtbar && !wurzel.classList.contains('ruhig') && !document.hidden) fn(); };
  };

  // 1. Untertitel im Telefon: das gesprochene Wort wechselt, Wort für Wort
  if (!reduziert) {
    document.querySelectorAll('[data-untertitel]').forEach((zeile) => {
      const woerter = [...zeile.querySelectorAll('.w')];
      let i = Math.max(0, woerter.findIndex((w) => w.classList.contains('an')));
      const schritt = imBild(zeile, () => {
        woerter[i].classList.remove('an');
        i = (i + 1) % woerter.length;
        woerter[i].classList.add('an');
      });
      setInterval(schritt, 520);
    });

    // 2. Untertitelstile: der hervorgehobene Stil wechselt
    document.querySelectorAll('.stile').forEach((liste) => {
      const stile = [...liste.querySelectorAll('.stil')];
      let i = 0;
      const schritt = imBild(liste, () => { stile[i].classList.remove('aktiv'); i = (i + 1) % stile.length; stile[i].classList.add('aktiv'); });
      setInterval(schritt, 1800);
    });
  }

  // 3. Avatarband: Reihe wird zum langsamen Band, die Kopie ist für Hilfstechnik verborgen, Knopf hält alles an
  const band = document.querySelector('[data-avatare]');
  const ruhe = document.querySelector('[data-ruhe]');
  if (band && !reduziert) {
    const spur = band.querySelector('.avatare__spur');
    const gleis = document.createElement('div');
    gleis.className = 'avatare__gleis';
    const kopie = spur.cloneNode(true);
    kopie.setAttribute('aria-hidden', 'true');
    kopie.querySelectorAll('img').forEach((b) => { b.alt = ''; b.removeAttribute('loading'); });
    spur.replaceWith(gleis);
    gleis.append(spur, kopie);
    band.classList.add('laeuft');
  }
  if (ruhe && !reduziert) {
    ruhe.hidden = false;
    const text = ruhe.querySelector('span');
    ruhe.addEventListener('click', () => {
      const an = wurzel.classList.toggle('ruhig');
      ruhe.setAttribute('aria-pressed', String(an));
      text.textContent = an ? 'Bewegung starten' : 'Bewegung anhalten';
    });
  }

  // 4. Ablauflinie: --lauf (0 bis 1) wächst, während der Ablauf durch das Bild läuft
  const ablauf = reduziert ? [] : [...document.querySelectorAll('[data-ablauf]')];
  if (ablauf.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      ablauf.forEach((a) => { const r = a.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / Math.max(1, r.height))); a.style.setProperty('--lauf', p.toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 5. Stimmen: Porträt wählt das Zitat. Ohne JavaScript führen die Links zum Zitat und alle stehen untereinander.
  document.querySelectorAll('[data-wand]').forEach((wand) => {
    const links = [...wand.querySelectorAll('.portraet')];
    const zitate = [...wand.querySelectorAll('.zitat')];
    const waehle = (id) => {
      links.forEach((l) => l.setAttribute('aria-current', String(l.getAttribute('href') === '#' + id)));
      zitate.forEach((z) => { z.hidden = z.id !== id; });
    };
    links.forEach((l) => l.addEventListener('click', (e) => { e.preventDefault(); waehle(l.getAttribute('href').slice(1)); }));
    waehle((zitate[2] || zitate[0]).id);
  });

  // 6. Preisumschalter: setzt nur das Attribut, beide Werte stehen im HTML
  document.querySelectorAll('[data-tarife]').forEach((t) => {
    const knoepfe = [...t.querySelectorAll('[data-wahl]')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      t.dataset.takt = k.dataset.wahl;
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
    }));
  });

  // 7. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
