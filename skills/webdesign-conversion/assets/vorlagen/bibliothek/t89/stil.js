/* stil.js der Vorlage "App sportlich": Telefon steigt und kippt beim Scrollen, Route zeichnet sich, die Liste wechselt den Telefoninhalt,
   Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript steht Ansicht 01, die Route ist gezeichnet. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

  // 1. Route zeichnet sich, sobald das Telefon im Bild ist (Klasse "gezeichnet", CSS setzt stroke-dashoffset)
  const telefone = [...document.querySelectorAll('[data-telefon]')];
  if (reduziert || !('IntersectionObserver' in window)) telefone.forEach((t) => t.classList.add('gezeichnet'));
  else {
    const io = new IntersectionObserver((e) => e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('gezeichnet'); io.unobserve(x.target); } }), { threshold: 0.35 });
    telefone.forEach((t) => io.observe(t));
  }

  // 2. Liste wechselt den Telefoninhalt: Ansicht n gehört zum n-ten Eintrag. Ist keiner offen, bleibt die letzte Ansicht stehen.
  document.querySelectorAll('[data-akk]').forEach((akk) => {
    const telefon = document.querySelector('#funktionen [data-telefon]');
    if (!telefon) return;
    const ansichten = [...telefon.querySelectorAll('[data-screen]')];
    const eintraege = [...akk.querySelectorAll('details')];
    const zeige = (n) => {
      ansichten.forEach((a, i) => a.classList.toggle('aktiv', i === n));
      telefon.classList.remove('gezeichnet'); void telefon.offsetWidth; telefon.classList.add('gezeichnet');
    };
    eintraege.forEach((d, i) => d.addEventListener('toggle', () => { if (d.open) zeige(i); }));
  });

  // 3. Steigen (--steig) und Kippen (--kipp) beim Scrollen, nur transform, nur ohne reduzierte Bewegung
  if (!reduziert) {
    const steiger = [...document.querySelectorAll('[data-steig]')], kipper = [...document.querySelectorAll('[data-kipp]')];
    let w8 = false;
    const lauf = () => {
      w8 = false; const h = innerHeight;
      steiger.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--steig', klemme((h - r.top) / (h * 0.8)).toFixed(3)); });
      kipper.forEach((el) => { const r = el.getBoundingClientRect(), p = klemme((r.top + r.height / 2 - h / 2) / h, -1, 1); el.style.setProperty('--kipp', (p * -9).toFixed(2)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
