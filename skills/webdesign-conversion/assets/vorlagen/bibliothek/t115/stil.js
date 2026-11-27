/* stil.js der Vorlage "Strandgut mit Wortmarke": Streifen mit Pfeilen, Stimmenkarte, Leiste unten, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleiben Pfeile und Leiste verborgen, Streifen scrollen von Hand, alle Stimmen stehen untereinander. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Streifen: Pfeile blättern um eine Kartenbreite, Tastatur und Wischen funktionieren auch ohne sie
  document.querySelectorAll('[data-streifen]').forEach((s) => {
    const spur = s.querySelector('[data-streifen-spur]'), pfeile = s.querySelector('[data-pfeile]');
    if (!spur || !pfeile) return;
    pfeile.hidden = false;
    const schritt = () => (spur.firstElementChild ? spur.firstElementChild.getBoundingClientRect().width + 16 : 320);
    const geh = (r) => spur.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    pfeile.querySelector('[data-zurueck]').addEventListener('click', () => geh(-1));
    pfeile.querySelector('[data-weiter]').addEventListener('click', () => geh(1));
  });

  // 2. Stimmenkarte: eine Stimme sichtbar, Pfeile schalten durch, die Ansage läuft über aria-live
  document.querySelectorAll('[data-stimmen]').forEach((karte) => {
    const stimmen = [...karte.querySelectorAll('[data-stimme]')], pfeile = karte.querySelector('[data-pfeile]');
    if (stimmen.length < 2 || !pfeile) return;
    let n = 0;
    const zeige = (i) => { n = (i + stimmen.length) % stimmen.length; stimmen.forEach((s, k) => { s.hidden = k !== n; }); };
    pfeile.hidden = false;
    zeige(0);
    pfeile.querySelector('[data-zurueck]').addEventListener('click', () => zeige(n - 1));
    pfeile.querySelector('[data-weiter]').addEventListener('click', () => zeige(n + 1));
  });

  // 3. Leiste unten: sichtbar, sobald der Held verlassen ist, verborgen bei Anfrage und Fuß (nichts verdecken)
  const leiste = document.getElementById('leiste'), hero = document.getElementById('start');
  if (leiste && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => leiste.classList.toggle('ist-da', !e.isIntersecting), { threshold: 0.35 }).observe(hero);
    const sichtbar = new Set();
    const ende = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => (e.isIntersecting ? sichtbar.add(e.target) : sichtbar.delete(e.target)));
      leiste.classList.toggle('ist-weg', sichtbar.size > 0);
    }, { threshold: 0.15 });
    ['anfrage', 'fuss'].forEach((id) => { const el = document.getElementById(id); if (el) ende.observe(el); });
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
