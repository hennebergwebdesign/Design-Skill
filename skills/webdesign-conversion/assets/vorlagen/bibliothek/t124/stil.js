/* stil.js der Vorlage "Geländerad Vorbestellung": Merkmalsliste mit Tafel, wandernder Routenpunkt, Skala der Vorbestellung,
   Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript stehen alle Merkmale mit eigener Zeichnung untereinander. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x) => Math.min(1, Math.max(0, x));

  // 1. Merkmalsliste: der Punkt in Bildschirmmitte schaltet Tafel und Hervorhebung um
  const wechsel = document.querySelector('[data-wechsel]');
  if (wechsel && 'IntersectionObserver' in window) {
    const punkte = [...wechsel.querySelectorAll('.wechsel__punkt')];
    const tafeln = [...wechsel.querySelectorAll('.wechsel__tafel')];
    const setze = (n) => {
      punkte.forEach((p) => p.classList.toggle('is-an', p.dataset.wahl === n));
      tafeln.forEach((t) => t.classList.toggle('is-an', t.dataset.wahl === n));
    };
    const io = new IntersectionObserver((e) => e.forEach((x) => { if (x.isIntersecting) setze(x.target.dataset.wahl); }), { rootMargin: '-45% 0px -45% 0px' });
    punkte.forEach((p) => io.observe(p));
  }

  // 2. Route: Punkt läuft mit dem Scrollen an der Linie entlang (transform), Kilometer als Beispielzahl
  const strecke = document.querySelector('[data-strecke]');
  if (strecke) {
    const feld = strecke.querySelector('.strecke__feld'), pfad = strecke.querySelector('.strecke__pfad'), punkt = strecke.querySelector('.strecke__punkt'), km = strecke.querySelector('[data-strecke-km]');
    const VB = { b: 1000, h: 2000 };
    const lege = (p) => {
      const laenge = pfad.getTotalLength(), pt = pfad.getPointAtLength(laenge * p), r = feld.getBoundingClientRect();
      punkt.style.transform = 'translate3d(' + (pt.x / VB.b * r.width).toFixed(1) + 'px,' + (pt.y / VB.h * r.height).toFixed(1) + 'px,0)';
      km.textContent = String(Math.round(p * 38));
    };
    let w8 = false;
    const lauf = () => { w8 = false; const r = feld.getBoundingClientRect(); lege(klemme((innerHeight * 0.6 - r.top) / r.height)); };
    if (reduziert) lege(0.45);
    else {
      addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
      addEventListener('resize', lauf);
      lauf();
    }
  }

  // 3. Vorbestellung: die Skala füllt sich über den Scrollweg (Weg von der Reservierung bis zur Lieferung)
  const finale = document.querySelector('[data-finale]');
  if (finale && !reduziert) {
    const striche = [...finale.querySelectorAll('.finale__striche i')];
    let letzte = -1, w8 = false;
    const lauf = () => {
      w8 = false;
      const r = finale.getBoundingClientRect(), s = klemme(-r.top / Math.max(1, r.height - innerHeight)), n = 1 + Math.round(s * 49);
      if (n === letzte) return;
      letzte = n;
      striche.forEach((t, i) => t.classList.toggle('an', i < n));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    lauf();
  } else if (finale) {
    finale.querySelectorAll('.finale__striche i').forEach((t) => t.classList.add('an'));
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
