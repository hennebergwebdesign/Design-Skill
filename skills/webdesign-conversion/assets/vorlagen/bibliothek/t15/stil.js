/* stil.js der Vorlage "Produktbühne": Kopf ausblenden, Schritte (Höhepunkte, Galerie), quere Bildreihe, Stimmenpfeile.
   Ergänzt bewegung.js, ersetzt nichts. Bei reduzierter Bewegung und unter 56rem bleibt alles im normalen Fluss, ohne Sticky. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const breit = matchMedia('(min-width: 56rem)');

  // 1. Kopf: beim Hinunterscrollen ausblenden, beim Hinaufscrollen zurück (nur transform)
  const kopf = document.querySelector('.kopf');
  if (kopf && !reduziert) {
    let letzte = scrollY, w8 = false;
    addEventListener('scroll', () => {
      if (w8) return; w8 = true;
      requestAnimationFrame(() => {
        const y = scrollY, offen = document.querySelector('[data-menue-ziel][data-offen="true"]');
        if (y < 120 || y < letzte - 4 || offen || kopf.contains(document.activeElement)) kopf.classList.remove('kopf--weg');
        else if (y > letzte + 4) kopf.classList.add('kopf--weg');
        letzte = y; w8 = false;
      });
    }, { passive: true });
  }

  // 2. Modi: Klassen, die den Sticky-Ablauf in CSS einschalten
  const held = document.querySelector('.held');
  const schritte = [...document.querySelectorAll('[data-schritte]')];
  const reise = document.querySelector('.reise');
  const modus = () => {
    if (held) held.classList.toggle('held--an', !reduziert);
    schritte.forEach((s) => s.classList.toggle('schritte--an', !reduziert && breit.matches));
    if (reise) reise.classList.toggle('reise--an', !reduziert && breit.matches);
    weg();
  };
  const weg = () => {
    if (!reise) return;
    const spur = reise.querySelector('.reise__spur'), fenster = reise.querySelector('.reise__fenster');
    if (!spur || !fenster) return;
    spur.style.removeProperty('--weg');
    reise.style.setProperty('--weg', Math.max(0, spur.scrollWidth - fenster.clientWidth + 0) + 'px');
  };
  modus();
  breit.addEventListener('change', modus);
  addEventListener('resize', weg);
  addEventListener('load', weg);

  // 3. Schritte: Folie je Viertel (Höhepunkte) beziehungsweise je Sechstel (Galerie) des Scrollwegs
  schritte.forEach((s) => {
    const items = [...s.querySelectorAll('[data-schritt]')];
    const knoepfe = [...s.querySelectorAll('[data-nach]')];
    let aktuell = -1, w8 = false;
    const setze = (i) => {
      if (i === aktuell) return; aktuell = i;
      items.forEach((e, k) => e.classList.toggle('aktiv', k === i));
      knoepfe.forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    };
    const lauf = () => {
      w8 = false;
      if (!s.classList.contains('schritte--an')) { items.forEach((e) => e.classList.add('aktiv')); aktuell = -1; return; }
      const r = s.getBoundingClientRect(), p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      setze(Math.floor(p * items.length));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    breit.addEventListener('change', lauf);
    knoepfe.forEach((b, k) => b.addEventListener('click', () => {
      const r = s.getBoundingClientRect(), strecke = r.height - innerHeight;
      scrollTo({ top: scrollY + r.top + strecke * ((k + 0.5) / items.length), behavior: reduziert ? 'auto' : 'smooth' });
    }));
    lauf();
  });

  // 4. Stimmen: Pfeile verschieben die Spur um eine Karte, Zustand der Pfeile folgt der Position
  const spur = document.getElementById('stimmen-spur');
  if (spur) {
    const pfeile = [...document.querySelectorAll('[aria-controls="stimmen-spur"]')];
    const schritt = () => { const k = spur.querySelector('.stimme'); return k ? k.getBoundingClientRect().width + 16 : 320; };
    const stand = () => pfeile.forEach((p) => { const r = Number(p.dataset.richtung); p.disabled = r < 0 ? spur.scrollLeft < 4 : spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4; });
    pfeile.forEach((p) => p.addEventListener('click', () => spur.scrollBy({ left: Number(p.dataset.richtung) * schritt(), behavior: reduziert ? 'auto' : 'smooth' })));
    spur.addEventListener('scroll', () => requestAnimationFrame(stand), { passive: true });
    addEventListener('resize', stand);
    stand();
  }
})();
